export function ExpertSection() {
  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="card-pastel p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Image en rond */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-soft bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src="/images/elise-guilhaudis.png"
                alt="Élise Guilhaudis, Avocate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-base text-foreground leading-relaxed">
              <span className="font-bold text-primary">Élise Guilhaudis, Avocate</span>, reste à votre disposition pour toute assistance complémentaire dans la mise en place de ces recommandations. L'objectif final est de sécuriser juridiquement le site internet et plus largement de permettre au professionnel de poursuivre ses activités sereinement, en conformité avec la réglementation en vigueur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
