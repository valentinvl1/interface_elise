import { ArrowRight, Shield, Check } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '1.0s' }}>
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-pastel p-8 md:p-12 bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20">
          {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Vous souhaitez sécuriser votre activité&nbsp;?
        </h2>

        {/* Sous-titre */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 text-center">
          Elise Guilhaudis propose un pack juridique complet et adapté aux Agences & Freelance WordPress.
        </p>

        {/* Grille 2 colonnes : 50/50 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Colonne 1 : Le pack juridique (50%) */}
          <div>
            <div className="card-pastel p-6 bg-white border-2 border-primary/20">
              {/* En-tête du produit */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Un Pack Conformité WordPress pour exercer en toute sérénité
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-base text-muted-foreground mr-2">à partir de</span>
                  <span className="text-4xl font-bold text-primary">790€</span>
                </div>
              </div>

              {/* Liste des features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                  </div>
                  <span className="text-foreground">vos documents juridiques</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                  </div>
                  <span className="text-foreground">des ressources pratiques</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                  </div>
                  <span className="text-foreground">1h de RDV avec votre avocate</span>
                </div>
              </div>

              {/* Bouton dans la carte */}
              <a
                href="https://www.numetik-avocats.fr/pack-conformite-agence-freelance-wordpress/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#01B2C8] text-white rounded-full font-semibold text-lg hover:bg-[#019CAF] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Découvrir le pack juridique
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Prendre rendez-vous avec Élise Guilhaudis (50%) */}
          <div>
            <div className="card-pastel p-6 bg-white border-2 border-border h-full flex flex-col items-center justify-between text-center">
              {/* Avatar */}
              <div className="flex-shrink-0 mb-4">
                <img
                  src="/photo_elise.png"
                  alt="Élise Guilhaudis, Avocate"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              {/* Texte */}
              <div className="flex-1 mb-4">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-bold text-primary">Élise Guilhaudis</span>,{' '}
                  <span className="font-semibold text-primary">Avocate</span>, reste à votre disposition pour toute assistance complémentaire dans la mise en place de ces recommandations. L'objectif final est de sécuriser juridiquement le site internet et plus largement de permettre au professionnel de poursuivre ses activités sereinement, en conformité avec la réglementation en vigueur.
                </p>
              </div>

              {/* Bouton */}
              <a
                href="https://www.numetik-avocats.fr/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-foreground border-2 border-border rounded-full font-semibold hover:bg-muted transition-all duration-300"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
