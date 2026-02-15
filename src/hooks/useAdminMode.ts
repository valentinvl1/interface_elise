import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook pour détecter si le mode admin est activé via le paramètre URL admin=true
 * @returns {boolean} true si le paramètre admin=true est présent dans l'URL
 */
export function useAdminMode(): boolean {
  const [searchParams] = useSearchParams();
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // Récupérer le paramètre admin depuis l'URL
    const adminParam = searchParams.get('admin');

    // Activer le mode admin si le paramètre est "true"
    setIsAdminMode(adminParam === 'true');
  }, [searchParams]);

  return isAdminMode;
}
