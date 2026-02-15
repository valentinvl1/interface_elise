import { Info } from 'lucide-react';

export function LegalDisclaimer() {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="card-pastel p-6 max-w-3xl mx-auto bg-gradient-to-br from-pastel-blue to-pastel-blue/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pastel-blueForeground/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-pastel-blueForeground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-pastel-blueForeground mb-2">
              Note importante
            </h3>
            <p className="text-sm text-pastel-blueForeground/80 leading-relaxed">
              Ce diagnostic est un pré-audit automatisé qui identifie les principales zones de risque juridique.
              Pour une analyse complète et des conseils personnalisés, nous vous recommandons de consulter
              un avocat spécialisé en droit du numérique. NumElise peut vous accompagner dans cette démarche.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
