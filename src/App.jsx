import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmergencyPage from './pages/EmergencyPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import './i18n';

import { EmergencyProvider } from './context/EmergencyContext';

function App() {
  return (
    <EmergencyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/help/:userId" element={<EmergencyPage />} />
        </Routes>
      </Router>
    </EmergencyProvider>
  );
}

export default App;
