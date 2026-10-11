import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Unauthorized.css';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="unauthorized-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        {user && (
          <div className="user-role-info">
            <span>Your role:</span>
            <strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</strong>
          </div>
        )}
        <a href="/dashboard" className="back-btn">Back to Dashboard</a>
      </div>
    </div>
  );
};

export default Unauthorized;
