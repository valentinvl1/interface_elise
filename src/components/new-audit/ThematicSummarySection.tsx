interface ThematicSummarySectionProps {
  summaries: {
    thematique: string;
    score: number;
    texte: string;
  }[];
}

export function ThematicSummarySection({ summaries }: ThematicSummarySectionProps) {
  if (!summaries || summaries.length === 0) {
    return null;
  }

  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '0.4s' }}
    >
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Synthèse par thématique
      </h2>

      <div className="space-y-6">
        {summaries.map((summary, index) => (
          <div
            key={index}
            className="card-pastel p-6 md:p-8"
          >
            {/* En-tête avec icône, nom et score */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl">🔷</span>
              <h3 className="text-xl font-bold text-foreground">
                {summary.thematique}
              </h3>
              <span className="text-lg font-semibold text-primary ml-auto">
                ({summary.score}%)
              </span>
            </div>

            {/* Texte de synthèse */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {summary.texte}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
