import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ThreatIntel from './pages/ThreatIntel';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './styles.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser] = useState({ name: 'Security Team', role: 'Admin' });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/*"
          element={
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar
                  onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                  user={currentUser}
                />
                <div className="page-wrapper">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/threats" element={<ThreatIntel />} />
                    <Route path="/incidents" element={<Incidents />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
