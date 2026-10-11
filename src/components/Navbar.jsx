import React from 'react';

const Navbar = ({ onMenuToggle, user }) => {
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
        <div className="user-menu">
          <div className="user-avatar">{user.name.charAt(0)}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button className="icon-btn">⋯</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
