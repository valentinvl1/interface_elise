import { AlertTriangle, Scale, Search } from 'lucide-react';
import type { LegalRisks } from '../types/audit.types';

interface RiskWarningProps {
  risks: LegalRisks;
}

export function RiskWarning({ risks }: RiskWarningProps) {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="card-pastel max-w-6xl mx-auto p-8 bg-gradient-to-br from-risk-high/20 to-risk-high/5 border-2 border-risk-high/30">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-risk-high flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-risk-highForeground" />
          </div>
          <h2 className="text-2xl font-bold text-risk-highForeground">
            Risques juridiques potentiels
          </h2>
        </div>

        {/* Grid des risques */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Amende */}
          <div className="bg-card rounded-2xl p-6 text-center">
            <Scale className="w-10 h-10 text-risk-highForeground mx-auto mb-3" />
            <p className="text-4xl font-bold text-risk-highForeground mb-1">
              {risks.fine.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {risks.fine.description}
            </p>
          </div>

          {/* Emprisonnement */}
          <div className="bg-card rounded-2xl p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-risk-highForeground mx-auto mb-3" />
            <p className="text-4xl font-bold text-risk-highForeground mb-1">
              {risks.imprisonment.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {risks.imprisonment.description}
            </p>
          </div>

          {/* Déréférencement */}
          <div className="bg-card rounded-2xl p-6 text-center">
            <Search className="w-10 h-10 text-risk-highForeground mx-auto mb-3" />
            <p className="text-3xl font-bold text-risk-highForeground mb-1">
              {risks.seoLoss.value}
            </p>
            <p className="text-sm text-muted-foreground">
              {risks.seoLoss.description}
            </p>
          </div>
        </div>

        {/* Footer explicatif */}
        <div className="bg-card rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center">
            Certaines non-conformités peuvent entraîner des sanctions lourdes selon le Code de la consommation
            et le RGPD. Il est essentiel de régulariser votre situation rapidement pour protéger votre activité.
          </p>
        </div>
      </div>
    </section>
  );
}
