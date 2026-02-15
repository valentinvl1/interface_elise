import { useState } from 'react';
import { FileText, ShoppingCart, Shield, AlertCircle, Cookie, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { RoadmapStep, IconType } from '../types/audit.types';

interface RoadmapProps {
  steps: RoadmapStep[];
}

const iconMap: Record<IconType, LucideIcon> = {
  FileText,
  ShoppingCart,
  Shield,
  AlertCircle,
  Cookie,
};

const getGrayClasses = () => {
  return { bg: 'bg-gray-200', text: 'text-gray-700' };
};

export function Roadmap({ steps }: RoadmapProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h2 className="text-3xl font-bold text-center mb-8">
        Votre roadmap de mise en conformité
      </h2>

      <div className="card-pastel p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const colors = getGrayClasses();
            const isLast = index === steps.length - 1;
            const isExpanded = expandedSteps.has(index);

            return (
              <div key={index} className="relative">
                <div className="flex items-start gap-6">
                  {/* Icône avec ligne de connexion */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center shadow-soft`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    {!isLast && (
                      <div className="absolute left-1/2 top-16 w-0.5 h-8 bg-border -translate-x-1/2" />
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 pt-3">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Étape {index + 1}
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {step.title}
                        </p>
                      </div>

                      {/* Bouton pour ouvrir les recommandations */}
                      <button
                        onClick={() => toggleStep(index)}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                        aria-label="Voir les recommandations"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-primary transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Section recommandations (expandable) */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                        <h4 className="font-semibold text-foreground mb-3">Recommandations :</h4>
                        <ul className="list-disc list-inside space-y-2">
                          {step.recommendations.map((recommendation, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground leading-relaxed">
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
