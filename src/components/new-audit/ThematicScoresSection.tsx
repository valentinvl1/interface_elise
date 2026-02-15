import { getScoreColorClasses } from '../../utils/scoreHelpers';

interface ThematicScoresSectionProps {
  scores: {
    clauses_generales: number | null;
    creation_refonte: number | null;
    maintenance: number | null;
    hebergement: number | null;
    community_management: number | null;
    seo: number | null;
    sea: number | null;
  };
  activities: string[];
}

export function ThematicScoresSection({ scores, activities }: ThematicScoresSectionProps) {
  // Mapping des clés vers les noms affichables
  const thematicMapping: Record<string, string> = {
    clauses_generales: 'Clauses générales du contrat',
    creation_refonte: 'Création / Refonte',
    maintenance: 'Maintenance',
    hebergement: 'Hébergement',
    community_management: 'Community Management',
    seo: 'SEO',
    sea: 'SEA',
  };

  // Créer un tableau de thématiques avec leurs scores (seulement celles qui ont un score non-null)
  const thematicScores = Object.entries(scores)
    .filter(([_, score]) => score !== null)
    .map(([key, score]) => ({
      name: thematicMapping[key] || key,
      score: score as number,
    }));

  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '0.2s' }}
    >
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Scores par thématique
      </h2>

      <div className="card-pastel p-6 md:p-8 space-y-6">
        {thematicScores.map((thematic, index) => {
          const colors = getScoreColorClasses(thematic.score);

          return (
            <div key={index} className="space-y-2">
              {/* Nom et score */}
              <div className="flex justify-between items-baseline">
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {thematic.name}
                </h3>
                <span className={`text-lg font-bold ${colors.fg}`}>
                  {thematic.score}%
                </span>
              </div>

              {/* Barre de progression */}
              <div className="progress-bar">
                <div
                  className={`h-full ${colors.progress} rounded-full transition-all duration-1000`}
                  style={{ width: `${thematic.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
