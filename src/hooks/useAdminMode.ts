import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si le mode admin est activé via le paramètre URL admin=true
 * @returns {boolean} true si le paramètre admin=true est présent dans l'URL
 */
export function useAdminMode(): boolean {
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const adminParam = searchParams.get('admin');

    // Activer le mode admin si le paramètre est "true"
    setIsAdminMode(adminParam === 'true');
  }, []);

  return isAdminMode;
}
