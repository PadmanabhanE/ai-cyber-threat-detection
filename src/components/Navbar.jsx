import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuToggle, user: propsUser }) => {
  const { user: authUser, logout } = useAuth();
  const user = authUser || propsUser;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
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

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* LEFT SECTION */}
      <div className="navbar-left">
        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          title="Toggle sidebar"
          aria-label="Toggle navigation menu"
        >
          <span>☰</span>
        </button>
        <div className="breadcrumb" aria-label="Current page">
          <span>Dashboard</span>
        </div>
      </div>

      {/* CENTER SECTION (spacer) */}
      <div className="navbar-center"></div>

      {/* RIGHT SECTION */}
      <div className="navbar-right">
        {/* ACTION BUTTONS */}
        <div className="navbar-actions">
          <button
            className="navbar-icon-btn"
            title="Search"
            aria-label="Search"
          >
            🔍
          </button>
          <button
            className="navbar-icon-btn"
            title="Notifications"
            aria-label="Notifications"
          >
            🔔
            <span className="notification-badge">3</span>
          </button>
        </div>

        {/* USER MENU */}
        <div className="user-menu-wrapper">
          <button
            className="user-menu-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >
            <div
              className="user-avatar"
              style={{ backgroundColor: getRoleColor(user?.role) }}
              title={user?.name}
            >
              {user?.avatar}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">{user?.role || 'Guest'}</span>
            </div>
            <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>⌄</span>
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="user-dropdown" role="menu">
              <div className="dropdown-header">
                <span className="user-email" title={user?.email}>{user?.email}</span>
                <span
                  className="role-badge"
                  style={{ backgroundColor: getRoleColor(user?.role) }}
                >
                  {user?.role?.toUpperCase()}
                </span>
              </div>

              <ul className="dropdown-menu-list">
                <li>
                  <a href="#profile" className="dropdown-item" role="menuitem">
                    👤 Profile
                  </a>
                </li>
                <li>
                  <a href="#settings" className="dropdown-item" role="menuitem">
                    ⚙️ Settings
                  </a>
                </li>
                <li>
                  <a href="#preferences" className="dropdown-item" role="menuitem">
                    🎨 Preferences
                  </a>
                </li>
              </ul>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
                role="menuitem"
                aria-label="Sign out"
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
