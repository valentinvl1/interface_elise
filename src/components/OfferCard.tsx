import { Check, X } from 'lucide-react';
import type { OfferData } from '../types/audit.types';

interface OfferCardProps {
  offer: OfferData;
  index: number;
}

const getColorClasses = (color: 'mint' | 'blue' | 'orange' | 'gray') => {
  const colorMap = {
    mint: { bg: 'from-pastel-mint to-pastel-mint/50', text: 'text-pastel-mintForeground' },
    blue: { bg: 'from-pastel-blue to-pastel-blue/50', text: 'text-pastel-blueForeground' },
    orange: { bg: 'from-pastel-orange to-pastel-orange/50', text: 'text-pastel-orangeForeground' },
    gray: { bg: 'from-gray-200 to-gray-300/50', text: 'text-gray-700' },
  };
  return colorMap[color] || colorMap.blue;
};

export function OfferCard({ offer, index }: OfferCardProps) {
  const colors = getColorClasses(offer.color);

  return (
    <div
      className="card-pastel p-6 hover-scale relative animate-fade-in"
      style={{ animationDelay: `${0.7 + index * 0.1}s` }}
    >
      {/* Badge "Populaire" */}
      {offer.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Populaire
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-foreground mb-1">{offer.title}</h3>
        <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
      </div>

      {/* Prix */}
      <div className={`bg-gradient-to-br ${colors.bg} p-6 rounded-2xl mb-6`}>
        <p className={`text-4xl font-bold ${colors.text}`}>{offer.price}</p>
      </div>

      {/* Features */}
      <div className="space-y-3">
        {offer.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {feature.included ? (
              <Check className="w-5 h-5 text-risk-lowForeground flex-shrink-0" />
            ) : (
              <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
            )}
            <span
              className={
                feature.included
                  ? 'text-foreground text-sm'
                  : 'text-muted-foreground text-sm line-through'
              }
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
