import { ArrowRight, Shield, Check, User } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '1.0s' }}
    >
      <div className="card-pastel p-8 md:p-12 text-center bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Vous souhaitez sécuriser votre contrat&nbsp;?
        </h2>

        {/* Sous-titre */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          Numelise propose un pack juridique adapté aux agences web : contrats conformes, CGV, DPA, clauses optimisées pour votre activité.
        </p>

        {/* Carte produit */}
        <div className="max-w-md mx-auto mb-8">
          <div className="card-pastel p-6 bg-white border-2 border-primary/20">
            {/* En-tête du produit */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Le pack juridique de l'agence Web
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">790€</span>
              </div>
            </div>

            {/* Liste des features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                </div>
                <span className="text-foreground">Checklist complète de conformité</span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                </div>
                <span className="text-foreground">Support par email</span>
              </div>
            </div>

            {/* Bouton dans la carte */}
            <a
              href="https://numelise.fr/pack-juridique"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir le pack juridique
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Carte Expert - Élise Guilhaudis */}
      <div className="card-pastel p-6 md:p-8 mt-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Image/Avatar sur la gauche */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pastel-blue to-pastel-mint flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Texte sur la droite */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
              <span className="font-bold text-primary">Élise Guilhaudis</span>,{' '}
              <span className="font-semibold text-primary">Avocate</span>, reste à votre disposition pour toute assistance complémentaire dans la mise en place de ces recommandations. L'objectif final est de sécuriser juridiquement le site internet et plus largement de permettre au professionnel de poursuivre ses activités sereinement, en conformité avec la réglementation en vigueur.
            </p>

            {/* Bouton Prendre rendez-vous */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://calendly.com/numelise"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground border-2 border-border rounded-full font-semibold text-lg hover:bg-muted transition-all duration-300"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
