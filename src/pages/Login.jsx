import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      login(email, password);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const demoCreds = [
    { email: 'admin@threatverse.io', role: 'Admin', desc: 'Full platform access' },
    { email: 'analyst@threatverse.io', role: 'Analyst', desc: 'View and investigate threats' },
    { email: 'viewer@threatverse.io', role: 'Viewer', desc: 'Read-only access' },
  ];

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-mark">T</div>
            <div className="brand-text">
              <span>ThreatVerse</span>
              <small>AI Defense Platform</small>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign In to ThreatVerse</h1>
            <p>AI-Powered Cyber Threat Detection</p>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="login-footer">
              <a href="#">Forgot password?</a>
              <span>•</span>
              <a href="#">Contact support</a>
            </div>
          </form>
        </div>

        <div className="login-right">
          <div className="demo-section">
            <h2>Demo Credentials</h2>
            <p>Try different roles to explore features:</p>

            {demoCreds.map((cred) => (
              <div key={cred.email} className="demo-card">
                <div className="demo-badge">{cred.role}</div>
                <div className="demo-email">{cred.email}</div>
                <div className="demo-desc">{cred.desc}</div>
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword('demo');
                  }}
                >
                  Try this role
                </button>
              </div>
            ))}
          </div>

          <div className="security-features">
            <h3>Enterprise Security</h3>
            <ul>
              <li>✓ End-to-end encryption</li>
              <li>✓ Multi-factor authentication</li>
              <li>✓ Role-based access control</li>
              <li>✓ Comprehensive audit logs</li>
              <li>✓ SOC 2 Type II certified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
