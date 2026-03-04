import { Info } from 'lucide-react';

interface PriorityRecommendationsSectionProps {
  recommendations: string[];
}

export function PriorityRecommendationsSection({ recommendations }: PriorityRecommendationsSectionProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Section d'information */}
      <div className="mt-8 card-pastel p-6 bg-gradient-to-br from-pastel-blue to-pastel-blue/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-pastel-blueForeground/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-pastel-blueForeground" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-pastel-blueForeground mb-1">
              À savoir
            </h3>
            <p className="text-sm text-pastel-blueForeground/80 leading-relaxed">
              Ce rapport est généré par un outil d'analyse automatisé conçu par une avocate. Il constitue un pré-diagnostic indicatif et ne remplace pas une consultation juridique personnalisée. Chaque situation étant unique, nous vous conseillons de les valider avec un expert juridique spécialisé en droit du numérique avant toute action. Elise Guilhaudis peut vous accompagner dans cette démarche.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

