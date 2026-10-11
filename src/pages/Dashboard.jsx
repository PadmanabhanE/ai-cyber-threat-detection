import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardApi } from '../context/AuthContext';

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

  if (loading) return <div className="dashboard"><p>Loading dashboard...</p></div>;
  if (error) return <div className="dashboard error"><p>Error: {error}</p></div>;
  if (!dashboardData) return <div className="dashboard"><p>No data available</p></div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || 'User'}! ({user?.role || 'Unknown'})</p>

      <section className="overview">
        <h2>Overview Stats</h2>
        <div className="stats-grid">
          {dashboardData.overviewStats?.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-delta ${stat.tone}`}>{stat.delta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="threat-level">
        <h2>Threat Level: {dashboardData.threatLevel}</h2>
        <p>Active Threats: {dashboardData.activeThreats}</p>
        <p>Mitigated: {dashboardData.mitigated}</p>
      </section>

      <section className="alerts">
        <h2>Alert Queue</h2>
        <ul>
          {dashboardData.alertQueue?.map((alert, idx) => (
            <li key={idx}>{alert}</li>
          ))}
        </ul>
      </section>

      <section className="recent-incidents">
        <h2>Recent Incidents</h2>
        {dashboardData.incidents?.map((incident, idx) => (
          <div key={idx} className="incident-card">
            <h3>{incident.type}</h3>
            <p>Severity: <strong>{incident.severity}</strong> | Status: <strong>{incident.status}</strong></p>
            <p>Detected: {incident.detected}</p>
          </div>
        ))}
      </section>

      <section className="top-threats">
        <h2>Top Threats</h2>
        <ul>
          {dashboardData.topThreats?.map((threat, idx) => (
            <li key={idx}>{threat.name} - {threat.count} occurrences</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
