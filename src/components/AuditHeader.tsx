import { Globe } from 'lucide-react';

interface AuditHeaderProps {
  siteUrl: string;
  auditDate: string;
}

export function AuditHeader({ siteUrl, auditDate }: AuditHeaderProps) {
  // Formater la date
  const formattedDate = new Date(auditDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="mb-16 text-center animate-fade-in" style={{ animationDelay: '0s' }}>
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Audit juridique de votre site internet
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
        Voici une synthèse claire et visuelle de la conformité juridique de votre site web.
        Identifiez rapidement les points à améliorer pour vous protéger légalement.
      </p>

      <div className="card-pastel p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pastel-blue flex items-center justify-center flex-shrink-0">
            <Globe className="w-6 h-6 text-pastel-blueForeground" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xl font-semibold text-foreground">{siteUrl}</p>
            <p className="text-sm text-muted-foreground">Audit réalisé le {formattedDate}</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pastel-mint text-pastel-mintForeground">
              Audit complet
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
