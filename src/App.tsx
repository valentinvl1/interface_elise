import { useState, useEffect } from 'react';
import { AllAuditsPage } from './pages/AllAuditsPage';
import { AuditDetailPage } from './pages/AuditDetailPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'all' | 'detail'>('detail');

  useEffect(() => {
    // Déterminer quelle page afficher en fonction des paramètres URL
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');

    if (page === 'all') {
      setCurrentPage('all');
    } else {
      setCurrentPage('detail');
    }
  }, []);

  // Afficher la page appropriée
  if (currentPage === 'all') {
    return <AllAuditsPage />;
  }

  return <AuditDetailPage />;
}

export default App;
