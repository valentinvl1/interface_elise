import { Routes, Route, Navigate } from 'react-router-dom';
import { AllAuditsPage } from './pages/AllAuditsPage';
import { AuditDetailPage } from './pages/AuditDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/all" replace />} />
      <Route path="/all" element={<AllAuditsPage />} />
      <Route path="/audit/:id" element={<AuditDetailPage />} />
      <Route path="*" element={<Navigate to="/all" replace />} />
    </Routes>
  );
}

export default App;
