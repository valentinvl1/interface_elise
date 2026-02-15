import { FileText, ShoppingCart, Shield, AlertCircle, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CategoryData, RiskLevel, IconType, ColorType } from '../types/audit.types';

interface CategoryCardProps {
  category: CategoryData;
  name: string;
  icon: IconType;
  color: ColorType;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const iconMap: Record<IconType, LucideIcon> = {
  FileText,
  ShoppingCart,
  Shield,
  AlertCircle,
  Cookie: AlertCircle, // Fallback for Cookie
};

const getRiskBadgeClass = (risk: RiskLevel): string => {
  switch (risk) {
    case 'low':
      return 'badge-risk-low';
    case 'medium':
      return 'badge-risk-medium';
    case 'high':
      return 'badge-risk-high';
    default:
      return 'badge-risk-medium';
  }
};

const getRiskLabel = (risk: RiskLevel): string => {
  switch (risk) {
    case 'low':
      return 'Risque faible';
    case 'medium':
      return 'Risque modéré';
    case 'high':
      return 'Risque élevé';
    default:
      return 'Risque modéré';
  }
};

const getRiskColorClasses = (risk: RiskLevel) => {
  const riskColorMap = {
    low: {
      bg: 'bg-risk-low',
      icon: 'text-risk-lowForeground',
      progress: 'bg-risk-lowForeground',
    },
    medium: {
      bg: 'bg-risk-medium',
      icon: 'text-risk-mediumForeground',
      progress: 'bg-risk-mediumForeground',
    },
    high: {
      bg: 'bg-risk-high',
      icon: 'text-risk-highForeground',
      progress: 'bg-risk-highForeground',
    },
  };
  return riskColorMap[risk] || riskColorMap.medium;
};

export function CategoryCard({ category, name, icon, index, isExpanded, onToggle }: CategoryCardProps) {
  const Icon = iconMap[icon];
  const percentage = (category.score / 5) * 100;
  const colors = getRiskColorClasses(category.risk);

  return (
    <div
      className="card-pastel p-6 hover-scale animate-fade-in"
      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${colors.icon}`} />
        </div>
        <span className={getRiskBadgeClass(category.risk)}>
          {getRiskLabel(category.risk)}
        </span>
      </div>

      {/* Titre */}
      <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>

      {/* Score */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-foreground">{category.score}</span>
        <span className="text-sm text-muted-foreground">/ 5</span>
      </div>

      {/* Barre de progression */}
      <div className="progress-bar mb-4">
        <div
          className={`h-full ${colors.progress} rounded-full transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {category.description}
      </p>

      {/* Bouton En savoir plus */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        En savoir plus
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Section détails (expandable) */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
          <h4 className="font-semibold text-foreground mb-3">Constats :</h4>
          <ul className="list-disc list-inside space-y-2 mb-4">
            {category.details.constats.map((constat, idx) => (
              <li key={idx} className="text-sm text-muted-foreground leading-relaxed">
                {constat}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {category.details.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
