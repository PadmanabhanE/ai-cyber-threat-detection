import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isDashboard = location.pathname !== '/';

  if (!isDashboard) return null;

  // Role-based navigation items
  const getNavItems = () => {
    const baseItems = [
      { icon: '📊', label: 'Dashboard', path: '/dashboard', roles: ['admin', 'analyst', 'viewer'] },
      { icon: '⚠️', label: 'Threat Intelligence', path: '/threats', roles: ['admin', 'analyst'] },
      { icon: '🚨', label: 'Incidents', path: '/incidents', roles: ['admin', 'analyst'] },
      { icon: '📈', label: 'Analytics', path: '/analytics', roles: ['admin', 'analyst'] },
    ];

    if (user?.role === 'admin') {
      baseItems.push(
        { icon: '⚙️', label: 'Settings', path: '/settings', roles: ['admin'] },
        { icon: '👥', label: 'Team Management', path: '/team', roles: ['admin'] },
        { icon: '📋', label: 'Audit Logs', path: '/audit', roles: ['admin'] }
      );
    }

    return baseItems.filter(item => item.roles.includes(user?.role));
  };

  const navItems = getNavItems();

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
