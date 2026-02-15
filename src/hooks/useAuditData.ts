import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AuditData } from '../types/audit.types';
import type { SupabaseAuditData } from '../types/supabase.types';
import { validateAuditData } from '../utils/validateAuditData';
import { mapSupabaseToAuditData } from '../utils/mapSupabaseData';
import { supabase } from '../config/supabase';

interface UseAuditDataResult {
  data: AuditData | null;
  supabaseData: SupabaseAuditData | null;
  error: string | null;
  loading: boolean;
}

export function useAuditData(): UseAuditDataResult {
  const { id: auditId } = useParams<{ id: string }>();
  const [data, setData] = useState<AuditData | null>(null);
  const [supabaseData, setSupabaseData] = useState<SupabaseAuditData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAuditData() {
      try {
        console.log('🔍 Audit ID récupéré:', auditId);

        if (!auditId) {
          console.error('❌ Pas d\'ID dans l\'URL');
          setError('URL invalide ou paramètre "id" manquant. Veuillez utiliser le lien reçu par email.');
          setLoading(false);
          return;
        }

        console.log('📡 Requête Supabase pour l\'ID:', auditId);

        // Récupérer les données depuis Supabase
        const { data: supabaseData, error: supabaseError } = await supabase
          .from('audits_web_contract')
          .select('*')
          .eq('id', auditId)
          .single();

        console.log('📦 Données Supabase reçues:', supabaseData);
        console.log('❌ Erreur Supabase:', supabaseError);

        if (supabaseError) {
          console.error('❌ Erreur Supabase détaillée:', supabaseError);
          setError('Impossible de récupérer les données de l\'audit. Veuillez contacter le support.');
          setLoading(false);
          return;
        }

        if (!supabaseData) {
          console.error('❌ Aucune donnée retournée par Supabase');
          setError('Aucun audit trouvé avec cet identifiant.');
          setLoading(false);
          return;
        }

        console.log('🔄 Mapping des données...');
        // Mapper les données Supabase vers le format AuditData
        const mappedData = mapSupabaseToAuditData(supabaseData as SupabaseAuditData);
        console.log('✅ Données mappées:', mappedData);

        console.log('✔️ Validation des données...');
        // Valider les données mappées
        if (!validateAuditData(mappedData)) {
          console.error('❌ Validation échouée');
          setError('Les données de l\'audit sont corrompues ou invalides. Veuillez contacter le support.');
          setLoading(false);
          return;
        }

        console.log('✅ Données validées avec succès !');
        setData(mappedData);
        setSupabaseData(supabaseData as SupabaseAuditData);
        setError(null);
      } catch (err) {
        console.error('💥 Erreur lors de la récupération des données:', err);
        setError('Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    }

    fetchAuditData();
  }, [auditId]);

  return { data, supabaseData, error, loading };
}
