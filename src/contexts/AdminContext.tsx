import { createContext, useContext, ReactNode } from 'react';
import { useAdminMode } from '../hooks/useAdminMode';

interface AdminContextType {
  isAdminMode: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const isAdminMode = useAdminMode();

  return (
    <AdminContext.Provider value={{ isAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
}

/**
 * Hook pour accéder au mode admin depuis n'importe quel composant
 * @returns {boolean} true si le mode admin est activé
 */
export function useAdmin(): boolean {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context.isAdminMode;
}
