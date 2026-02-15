import { Building2, Calendar } from 'lucide-react';
import { AdminOnly } from '../AdminOnly';

interface AuditPageHeaderProps {
  companyName: string;
  auditDate: string;
  usesAi?: boolean;
  hasReferenceDocument?: boolean;
}

export function AuditPageHeader({ companyName, auditDate, usesAi, hasReferenceDocument }: AuditPageHeaderProps) {
  // Formater la date en français
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <header className="mb-16 text-center">
      {/* Titre principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Audit juridique de vos documents contractuels
      </h1>

      {/* Sous-titre */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
        Voici une synthèse claire et visuelle de la conformité juridique de vos documents.
        Identifiez rapidement les points à améliorer pour vous protéger légalement.
      </p>

      {/* Carte entreprise */}
      <div className="flex items-center justify-between gap-4 card-pastel px-8 py-6 hover-scale">
        {/* Partie gauche : Icône + Informations */}
        <div className="flex items-center gap-4">
          {/* Icône entreprise */}
          <div className="w-12 h-12 rounded-full bg-pastel-blue flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-pastel-blueForeground" />
          </div>

          {/* Informations */}
          <div className="text-left">
            <p className="font-bold text-foreground text-xl">
              {companyName}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Audit réalisé le {formatDate(auditDate)}</span>
            </div>
          </div>
        </div>

        {/* Tags à droite - visible uniquement en mode admin */}
        <AdminOnly>
          <div className="flex-shrink-0 flex flex-col gap-2">
            {usesAi !== undefined && (
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                usesAi
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Utilise l'IA : {usesAi ? 'Oui' : 'Non'}
              </span>
            )}
            {hasReferenceDocument !== undefined && (
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                hasReferenceDocument
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Document de référence : {hasReferenceDocument ? 'Oui' : 'Non'}
              </span>
            )}
          </div>
        </AdminOnly>
      </div>
    </header>
  );
}
