import { useAllAudits } from '../hooks/useAllAudits';
import { AuditCard } from '../components/all-audits/AuditCard';
import { ErrorScreen } from '../components/ErrorScreen';
import { AdminBadge } from '../components/AdminBadge';
import { useAdmin } from '../contexts/AdminContext';
import { FolderOpen } from 'lucide-react';

export function AllAuditsPage() {
  const { audits, error, loading } = useAllAudits();
  const isAdminMode = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Chargement des audits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminBadge />
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isAdminMode ? 'pt-20' : ''}`}>
        {/* En-tête de la page */}
        <header className="mb-12 text-center">
          {/* Icône */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-pastel-blue flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-pastel-blueForeground" />
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tous les audits juridiques
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Retrouvez l'ensemble des audits réalisés. Cliquez sur une carte pour consulter le détail d'un audit.
          </p>

          {/* Compteur */}
          <div className="mt-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-pastel-mint text-pastel-mintForeground">
              {audits.length} audit{audits.length > 1 ? 's' : ''} disponible{audits.length > 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Liste des audits */}
        {audits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Aucun audit disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {audits.map((audit) => (
              <AuditCard
                key={audit.id}
                id={audit.id}
                companyName={audit.company_name}
                auditDate={audit.audit_date}
                score={audit.global_score_percent}
                levelLabel={audit.level_label}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
