import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ThreatIntel from './pages/ThreatIntel';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import './styles.css';

function AppContent() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes - Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'analyst', 'viewer']}>
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />
                <div className="page-wrapper">
                  <Dashboard />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/threats"
        element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />
                <div className="page-wrapper">
                  <ThreatIntel />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/incidents"
        element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />
                <div className="page-wrapper">
                  <Incidents />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />
                <div className="page-wrapper">
                  <Analytics />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="dashboard-shell">
              <Sidebar isOpen={sidebarOpen} />
              <div className="main-content">
                <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />
                <div className="page-wrapper">
                  <Settings />
                </div>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
