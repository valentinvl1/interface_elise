import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

interface AuditSummary {
  id: string;
  company_name: string;
  audit_date: string;
  global_score_percent: number;
  level_label: string;
}

interface UseAllAuditsResult {
  audits: AuditSummary[];
  error: string | null;
  loading: boolean;
}

export function useAllAudits(): UseAllAuditsResult {
  const [audits, setAudits] = useState<AuditSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAllAudits() {
      try {
        console.log('📡 Récupération de tous les audits...');

        const { data, error: supabaseError } = await supabase
          .from('audits_web_contract')
          .select('id, company_name, audit_date, global_score_percent, level_label')
          .order('audit_date', { ascending: false });

        if (supabaseError) {
          console.error('❌ Erreur Supabase:', supabaseError);
          setError('Impossible de récupérer les audits');
          setLoading(false);
          return;
        }

        console.log('✅ Audits récupérés:', data?.length);
        setAudits(data || []);
        setError(null);
      } catch (err) {
        console.error('💥 Erreur lors de la récupération des audits:', err);
        setError('Une erreur inattendue s\'est produite');
      } finally {
        setLoading(false);
      }
    }

    fetchAllAudits();
  }, []);

  return { audits, error, loading };
}
