import { ArrowRight } from 'lucide-react';
import { OfferCard } from './OfferCard';
import type { OfferData } from '../types/audit.types';

const offers: OfferData[] = [
  {
    title: 'Do It Yourself',
    subtitle: 'Pour les autonomes',
    price: '90 €',
    color: 'gray',
    features: [
      { text: 'Checklist complète de conformité', included: true },
      { text: 'Support par email', included: true },
      { text: 'Templates de documents juridiques', included: false },
      { text: 'Documents personnalisés', included: false },
      { text: 'Garantie avocat', included: false },
      { text: 'Rendez-vous personnalisé', included: false },
    ],
  },
  {
    title: 'Do It With NumElise',
    subtitle: 'Accompagnement optimal',
    price: '690 €',
    color: 'blue',
    popular: true,
    features: [
      { text: 'Checklist complète de conformité', included: true },
      { text: 'Support par email', included: true },
      { text: 'Templates de documents juridiques', included: true },
      { text: 'Documents personnalisés', included: true },
      { text: 'Garantie avocat', included: true },
      { text: 'Rendez-vous personnalisé', included: false },
    ],
  },
  {
    title: 'Do It With Me Elise',
    subtitle: 'Service premium',
    price: 'Sur devis',
    color: 'orange',
    features: [
      { text: 'Checklist complète de conformité', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Templates de documents juridiques', included: true },
      { text: 'Documents personnalisés', included: true },
      { text: 'Garantie avocat', included: true },
      { text: 'Rendez-vous personnalisé', included: true },
    ],
  },
];

export function OffersSection() {
  const [diyOffer, ...premiumOffers] = offers;

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Passez à l'action dès maintenant
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choisissez la formule qui correspond à vos besoins et sécurisez votre site rapidement.
          Notre équipe d'experts est là pour vous accompagner à chaque étape.
        </p>
      </div>

      {/* Offre DIY - Bannière pleine largeur */}
      <div className="card-pastel p-8 mb-12 animate-fade-in">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Info principale */}
          <div className="flex-1">
            <div className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold mb-4">
              {diyOffer.subtitle}
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">
              {diyOffer.title}
            </h3>
            <p className="text-4xl font-bold text-primary mb-6">
              {diyOffer.price}
            </p>
            <button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-scale inline-flex items-center gap-2">
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Features en grille */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diyOffer.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      feature.included
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {feature.included ? (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      feature.included
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground line-through'
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Pour aller plus loin */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-2">
          Pour aller plus loin
        </h3>
        <p className="text-center text-muted-foreground mb-8">
          Bénéficiez d'un accompagnement personnalisé pour une conformité garantie
        </p>

        {/* Grid des offres premium */}
        <div className="grid md:grid-cols-2 gap-6">
          {premiumOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} index={index + 1} />
          ))}
        </div>
      </div>

      {/* CTA Button final */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-6 rounded-full text-lg font-semibold shadow-[0_8px_30px_-8px_hsl(var(--primary)_/_0.4)] hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)_/_0.5)] transition-all duration-300 hover-scale inline-flex items-center gap-2">
          Je veux sécuriser mon site maintenant
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
