import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmergencyProvider } from './context/EmergencyContext';
import EmergencyPage from './pages/EmergencyPage';

function App() {
  return (
    <Router>
      <EmergencyProvider>
        <Routes>
          <Route path="/" element={<div className="p-8 text-center text-white bg-slate-900 min-h-screen"><h1>The Anchor Protocol</h1><p>Navigate to /help/123 to see the emergency view.</p></div>} />
          <Route path="/help/:userId" element={<EmergencyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </EmergencyProvider>
    </Router>
  );
}

export default App;
