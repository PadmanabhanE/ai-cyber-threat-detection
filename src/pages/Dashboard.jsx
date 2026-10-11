import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardApi } from '../api/client';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardApi.getDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>⚠️ Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <p className="header-subtitle">
            Welcome, <strong>{user?.name || 'User'}</strong> • <span className="role-badge">{user?.role?.toUpperCase()}</span>
          </p>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Overview Stats</h2>
        </div>
        <div className="stats-grid">
          {dashboardData.overviewStats?.map((stat, idx) => (
            <article key={idx} className="stat-card">
              <div className="stat-content">
                <label className="stat-label">{stat.label}</label>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-delta delta-${stat.tone}`}>{stat.delta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* THREAT LEVEL */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Current Threat Posture</h2>
        </div>
        <div className="threat-grid">
          <article className="card threat-card">
            <div className="threat-indicator">
              <span className={`threat-level level-${dashboardData.threatLevel?.toLowerCase()}`}>
                {dashboardData.threatLevel}
              </span>
            </div>
            <div className="threat-stats">
              <div className="stat">
                <span className="stat-label">Active Threats</span>
                <span className="stat-number">{dashboardData.activeThreats}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Mitigated This Month</span>
                <span className="stat-number">{dashboardData.mitigated}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ALERT QUEUE */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Alert Queue</h2>
          <span className="badge-count">{dashboardData.alertQueue?.length || 0} Alerts</span>
        </div>
        <article className="card">
          <ul className="alert-list">
            {dashboardData.alertQueue?.map((alert, idx) => (
              <li key={idx} className="alert-item">
                <span className="alert-icon">•</span>
                <span className="alert-text">{alert}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* RECENT INCIDENTS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Incidents</h2>
        </div>
        <div className="incidents-grid">
          {dashboardData.incidents?.map((incident, idx) => (
            <article key={idx} className="card incident-card">
              <div className="incident-header">
                <h3 className="incident-type">{incident.type}</h3>
              </div>
              <div className="incident-content">
                <div className="incident-meta">
                  <span className={`severity-badge severity-${incident.severity?.toLowerCase()}`}>
                    {incident.severity?.toUpperCase()}
                  </span>
                  <span className={`status-badge status-${incident.status?.toLowerCase()}`}>
                    {incident.status?.toUpperCase()}
                  </span>
                </div>
                <p className="incident-time">🕐 {incident.detected}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TOP THREATS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Top Detected Threats</h2>
        </div>
        <article className="card">
          <ul className="threat-list">
            {dashboardData.topThreats?.map((threat, idx) => (
              <li key={idx} className="threat-item">
                <span className="threat-name">{threat.name}</span>
                <span className="threat-count">{threat.count}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
