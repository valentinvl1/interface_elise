import { AlertTriangle } from 'lucide-react';

interface MajorWeaknessesSectionProps {
  weaknesses: string[];
}

export function MajorWeaknessesSection({ weaknesses }: MajorWeaknessesSectionProps) {
  if (!weaknesses || weaknesses.length === 0) {
    return null;
  }

  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '0.6s' }}
    >
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Faiblesses majeures identifiées
      </h2>

      <div className="card-pastel p-6 md:p-8 border-2 border-risk-high/30 bg-risk-high/5">
        <div className="space-y-4">
          {weaknesses.map((weakness, index) => (
            <div key={index} className="flex gap-3 items-start">
              {/* Icône d'avertissement */}
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-risk-highForeground" />
              </div>

              {/* Texte de la faiblesse */}
              <p className="text-base text-foreground leading-relaxed flex-1">
                {weakness}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
