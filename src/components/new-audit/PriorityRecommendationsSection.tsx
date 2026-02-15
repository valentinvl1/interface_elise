interface PriorityRecommendationsSectionProps {
  recommendations: string[];
}

export function PriorityRecommendationsSection({ recommendations }: PriorityRecommendationsSectionProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '0.8s' }}
    >
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Recommandations prioritaires
      </h2>

      <div className="card-pastel p-6 md:p-8 bg-pastel-blue/10">
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* Numéro de priorité */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Texte de la recommandation */}
              <p className="text-base text-foreground leading-relaxed flex-1 pt-1">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
