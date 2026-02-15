import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { getScoreColorClasses } from '../../utils/scoreHelpers';
import { useAdmin } from '../../contexts/AdminContext';
import { AdminOnly } from '../AdminOnly';

interface ThematicAnalysisSectionProps {
  scores: {
    clauses_generales: number | null;
    creation_refonte: number | null;
    maintenance: number | null;
    hebergement: number | null;
    community_management: number | null;
    seo: number | null;
    sea: number | null;
  };
  summaries: {
    thematique: string;
    score: number;
    texte: string;
  }[];
  detailedData?: {
    general_constats?: string;
    general_recommendations?: string;
    creation_constats?: string;
    creation_recommendations?: string;
    maintenance_constats?: string;
    maintenance_recommendations?: string;
    hosting_constats?: string;
    hosting_recommendations?: string;
    cm_constats?: string;
    cm_recommendations?: string;
    seo_constats?: string;
    seo_recommendations?: string;
    sea_constats?: string;
    sea_recommendations?: string;
  };
}

export function ThematicAnalysisSection({ scores, summaries, detailedData }: ThematicAnalysisSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isAdminMode = useAdmin();

  // En mode admin, ouvrir toutes les cartes par défaut
  useEffect(() => {
    if (isAdminMode) {
      // On ne gère plus l'expansion individuelle en mode admin
      setExpandedIndex(null);
    }
  }, [isAdminMode]);

  // Mapping des clés vers les noms affichables (pour l'affichage visuel)
  const thematicDisplayNames: Record<string, string> = {
    clauses_generales: 'Clauses générales du contrat',
    creation_refonte: 'Création / Refonte',
    maintenance: 'Maintenance',
    hebergement: 'Hébergement',
    community_management: 'Community Management',
    seo: 'SEO',
    sea: 'SEA',
  };

  // Mapping des clés vers les noms dans la BDD (pour trouver le texte dans thematic_summary)
  const thematicDbNames: Record<string, string> = {
    clauses_generales: 'Clauses générales du contrat',
    creation_refonte: 'Création / Refonte',
    maintenance: 'maintenance',
    hebergement: 'hebergement',
    community_management: 'community_management',
    seo: 'seo',
    sea: 'sea',
  };

  // Mapping des clés vers les champs de constats et recommandations
  const thematicDetailFields: Record<string, { constats: string; recommendations: string }> = {
    clauses_generales: { constats: 'general_constats', recommendations: 'general_recommendations' },
    creation_refonte: { constats: 'creation_constats', recommendations: 'creation_recommendations' },
    maintenance: { constats: 'maintenance_constats', recommendations: 'maintenance_recommendations' },
    hebergement: { constats: 'hosting_constats', recommendations: 'hosting_recommendations' },
    community_management: { constats: 'cm_constats', recommendations: 'cm_recommendations' },
    seo: { constats: 'seo_constats', recommendations: 'seo_recommendations' },
    sea: { constats: 'sea_constats', recommendations: 'sea_recommendations' },
  };

  // Créer un tableau de thématiques avec leurs scores, textes et détails
  const thematicData = Object.entries(scores)
    .filter(([_, score]) => score !== null)
    .map(([key, score]) => {
      const displayName = thematicDisplayNames[key] || key;
      const dbName = thematicDbNames[key] || key;
      const summary = summaries.find(s => s.thematique === dbName);
      const detailFields = thematicDetailFields[key];

      return {
        name: displayName,
        score: score as number,
        text: summary?.texte || '',
        constats: detailedData && detailFields
          ? (detailedData as any)[detailFields.constats] || ''
          : '',
        recommendations: detailedData && detailFields
          ? (detailedData as any)[detailFields.recommendations] || ''
          : '',
      };
    });

  // Fonction pour tronquer le texte
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '0.2s' }}
    >
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Analyse par thématique
      </h2>

      <div className="space-y-4">
        {thematicData.map((thematic, index) => {
          const colors = getScoreColorClasses(thematic.score);
          // En mode admin, toujours expanded, sinon utiliser l'état normal
          const isExpanded = isAdminMode || expandedIndex === index;

          return (
            <div
              key={index}
              className="card-pastel p-6"
            >
              {/* En-tête avec nom et score */}
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-xl font-bold text-foreground flex-1">
                  {thematic.name}
                </h3>
                <span className={`text-lg font-semibold ${colors.fg}`}>
                  {thematic.score}%
                </span>
              </div>

              {/* Barre de progression */}
              <div className="progress-bar mb-4">
                <div
                  className={`h-full ${colors.progress} rounded-full transition-all duration-1000`}
                  style={{ width: `${thematic.score}%` }}
                />
              </div>

              {/* Texte de synthèse */}
              <p className="text-base text-muted-foreground leading-relaxed mb-3">
                {isExpanded ? thematic.text : truncateText(thematic.text)}
              </p>

              {/* Bouton Voir plus / Voir moins (masqué en mode admin) */}
              {!isAdminMode && thematic.text.length > 200 && (
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {isExpanded ? 'Voir moins' : 'Voir plus'}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}

              {/* Constats et Recommandations détaillés (mode admin uniquement) */}
              <AdminOnly>
                {(thematic.constats || thematic.recommendations) && (
                  <div className="mt-6 space-y-4 border-t pt-4">
                    {thematic.constats && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                          Constats détaillés
                        </h4>
                        <p className="text-sm text-blue-800 whitespace-pre-line">
                          {thematic.constats}
                        </p>
                      </div>
                    )}
                    {thematic.recommendations && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-green-900 mb-2">
                          Recommandations détaillées
                        </h4>
                        <p className="text-sm text-green-800 whitespace-pre-line">
                          {thematic.recommendations}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </AdminOnly>
            </div>
          );
        })}
      </div>
    </section>
  );
}
