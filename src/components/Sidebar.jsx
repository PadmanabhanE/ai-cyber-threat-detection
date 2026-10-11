import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isDashboard = location.pathname !== '/';

  if (!isDashboard) return null;

  const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '⚠️', label: 'Threat Intelligence', path: '/threats' },
    { icon: '🚨', label: 'Incidents', path: '/incidents' },
    { icon: '📈', label: 'Analytics', path: '/analytics' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <div className="brand-mark">T</div>
        {isOpen && (
          <div className="brand-text">
            <span>ThreatVerse</span>
            <small>AI Platform</small>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          <div className="status-indicator">
            <span className="dot green"></span>
            <span>All Systems Operational</span>
          </div>
          <small>Last sync: 2 min ago</small>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
