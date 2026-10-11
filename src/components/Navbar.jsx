import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuToggle, user: propsUser }) => {
  const { user: authUser, logout } = useAuth();
  const user = authUser || propsUser;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#ff5d73';
      case 'analyst':
        return '#6fe7ff';
      case 'viewer':
        return '#62ffb5';
      default:
        return '#7a7dff';
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuToggle} title="Toggle sidebar">
          ☰
        </button>
        <div className="breadcrumb">
          <span>Dashboard</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Search">
          🔍
        </button>
        <button className="icon-btn" title="Notifications">
          🔔
          <span className="badge">3</span>
        </button>
        <div className="user-menu-wrapper">
          <button
            className="user-menu-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="user-avatar" style={{ backgroundColor: getRoleColor(user.role) }}>
              {user.avatar}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <span className="dropdown-arrow">⌄</span>
          </button>

          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <span className="user-email">{user.email}</span>
                <span className="role-badge" style={{ backgroundColor: getRoleColor(user.role) }}>
                  {user.role.toUpperCase()}
                </span>
              </div>
              <a href="#profile" className="dropdown-item">👤 Profile</a>
              <a href="#settings" className="dropdown-item">⚙️ Settings</a>
              <a href="#preferences" className="dropdown-item">🎨 Preferences</a>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item logout-btn"
                onClick={() => {
                  logout();
                  window.location.href = '/login';
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
