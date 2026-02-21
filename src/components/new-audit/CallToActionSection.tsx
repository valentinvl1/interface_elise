import { ArrowRight, Shield, Check, User } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section
      className="mb-16 animate-fade-in"
      style={{ animationDelay: '1.0s' }}
    >
      <div className="card-pastel p-8 md:p-12 bg-gradient-to-br from-pastel-blue/20 to-pastel-mint/20">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Vous souhaitez sécuriser votre contrat&nbsp;?
        </h2>

        {/* Sous-titre */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 text-center">
          Numelise propose un pack juridique adapté aux agences web : contrats conformes, CGV, DPA, clauses optimisées pour votre activité.
        </p>

        {/* Grille 2 colonnes : 60/40 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Colonne 1 : Le pack juridique (60%) */}
          <div className="md:col-span-3">
            <div className="card-pastel p-6 bg-white border-2 border-primary/20">
              {/* En-tête du produit */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Le pack juridique de l'agence Web
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">790€</span>
                </div>
              </div>

              {/* Liste des features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                  </div>
                  <span className="text-foreground">Checklist complète de conformité</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-pastel-mintForeground" />
                  </div>
                  <span className="text-foreground">Support par email</span>
                </div>
              </div>

              {/* Bouton dans la carte */}
              <a
                href="https://www.numetik-avocats.fr/agence-com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Découvrir le pack juridique
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Prendre rendez-vous avec Élise Guilhaudis (40%) */}
          <div className="md:col-span-2">
            <div className="card-pastel p-6 bg-white border-2 border-border h-full flex flex-col items-center justify-between text-center">
              {/* Avatar */}
              <div className="flex-shrink-0 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pastel-blue to-pastel-mint flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
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
                href="https://www.numetik-avocats.fr/avocat-rgpd/rdv-avocat-protection-donnees-personnelles/"
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
    </section>
  );
}
