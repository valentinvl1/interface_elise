import { useAdmin } from '../contexts/AdminContext';
import { ShieldCheck } from 'lucide-react';

/**
 * Bandeau qui s'affiche en haut de la page en mode admin
 * Indique visuellement que le mode admin est activé
 */
export function AdminBadge() {
  const isAdminMode = useAdmin();

  if (!isAdminMode) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-purple-300 text-purple-900 px-4 py-3 shadow-md flex items-center justify-center gap-2 text-sm font-semibold">
      <ShieldCheck className="w-5 h-5" />
      Mode Admin
    </div>
  );
}
