import { ReactNode } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface AdminOnlyProps {
  children: ReactNode;
}

/**
 * Composant wrapper pour afficher du contenu uniquement en mode admin
 * Usage: <AdminOnly>contenu visible uniquement si admin=true dans l'URL</AdminOnly>
 */
export function AdminOnly({ children }: AdminOnlyProps) {
  const isAdminMode = useAdmin();

  if (!isAdminMode) {
    return null;
  }

  return <>{children}</>;
}
