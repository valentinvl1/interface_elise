import { Building2, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getScoreColorClasses } from '../../utils/scoreHelpers';
import { useAdmin } from '../../contexts/AdminContext';

interface AuditCardProps {
  id: string;
  companyName: string;
  auditDate: string;
  score: number;
  levelLabel: string;
}

export function AuditCard({ id, companyName, auditDate, score, levelLabel }: AuditCardProps) {
  const isAdminMode = useAdmin();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const colors = getScoreColorClasses(score);

  return (
    <Link
      to={`/audit/${id}${isAdminMode ? '?admin=true' : ''}`}
      className="block card-pastel px-6 py-5 hover-scale cursor-pointer transition-all duration-300 hover:shadow-lg group"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Partie gauche : Icône + Informations */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icône entreprise */}
          <div className="w-12 h-12 rounded-full bg-pastel-blue flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-pastel-blueForeground" />
          </div>

          {/* Informations */}
          <div className="text-left flex-1 min-w-0">
            <p className="font-bold text-foreground text-lg truncate">
              {companyName}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Audit du {formatDate(auditDate)}</span>
            </div>
          </div>
        </div>

        {/* Partie droite : Score + Flèche */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Score */}
          <div className="text-right">
            <div className={`text-2xl font-bold ${colors.fg}`}>
              {score}%
            </div>
            <div className="text-xs text-muted-foreground">
              {levelLabel}
            </div>
          </div>

          {/* Flèche */}
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
