interface DocumentExtractSectionProps {
  documentExtract?: string;
}

export function DocumentExtractSection({ documentExtract }: DocumentExtractSectionProps) {
  if (!documentExtract) {
    return null;
  }

  return (
    <section className="mb-16 animate-fade-in" style={{ animationDelay: '1.2s' }}>
      {/* En-tête de la section */}
      <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
        Document extrait et anonymisé
      </h2>

      {/* Carte avec textarea */}
      <div className="card-pastel p-6 md:p-8">
        <p className="text-sm text-muted-foreground mb-4">
          Contenu du document original extrait et anonymisé pour analyse
        </p>

        <textarea
          readOnly
          value={documentExtract}
          className="w-full min-h-[400px] rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y font-mono"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    </section>
  );
}
