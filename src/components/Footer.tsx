export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://www.numetik-avocats.fr/wp-content/uploads/2026/03/Mentions-legales-V04.03.26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline"
          >
            Mentions légales
          </a>
          <span className="hidden sm:inline text-muted-foreground/50">•</span>
          <a
            href="https://www.numetik-avocats.fr/wp-content/uploads/2026/03/CGU-Politique-confidentialite-V04.03.26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline"
          >
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
