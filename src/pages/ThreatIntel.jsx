import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api/client';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await dashboardApi.getDashboard();
        setDashboard(data);
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <div className="page-container"><div className="card full-width"><h3>Loading threat intelligence…</h3></div></div>;
  }

  if (error) {
    return <div className="page-container"><div className="card full-width"><h3>{error}</h3></div></div>;
  }

  const threatLevel = dashboard.threatLevel || 'HIGH';
  const overviewStats = dashboard.overviewStats || [];
  const threatDistribution = dashboard.threatDistribution || [];
  const automationActions = dashboard.alertQueue || [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Security Dashboard</h1>
        <p>Real-time threat monitoring and incident overview</p>
      </div>

      <div className="widget-grid">
        {overviewStats.map((item) => (
          <div key={item.label} className="mini-widget">
            <div className="widget-label">{item.label}</div>
            <div className="widget-value">{item.value}</div>
            <div className={`widget-delta ${item.tone}`}>{item.delta}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card threat-score">
          <h3>Threat Level</h3>
          <div className="large-metric">
            <div className={`threat-badge ${threatLevel.toLowerCase()}`}>{threatLevel}</div>
          </div>
          <p>Current system threat posture</p>
        </div>

        <div className="card stat-card">
          <h3>Active Threats</h3>
          <div className="large-number">{dashboard.activeThreats}</div>
          <p>Ongoing investigations</p>
          <div className="trend-down">↓ 3 since yesterday</div>
        </div>

        <div className="card stat-card">
          <h3>Mitigated This Month</h3>
          <div className="large-number">{dashboard.mitigated}</div>
          <p>Threats contained</p>
          <div className="trend-up">↑ 48 today</div>
        </div>

        <div className="card stat-card">
          <h3>System Health</h3>
          <div className="health-bar">
            <div className="health-fill" style={{ width: '94%' }}></div>
          </div>
          <p>94% - All systems operational</p>
        </div>

        <div className="card full-width chart-card">
          <div className="card-header">
            <h3>Threat Distribution</h3>
            <span className="muted-pill">Live feed</span>
          </div>

          <div className="distribution-layout">
            <div className="donut-wrap">
              <div className="donut-chart">
                <div className="donut-center">
                  <strong>68%</strong>
                  <span>AI detected</span>
                </div>
              </div>
            </div>

            <div className="legend-list">
              {threatDistribution.map((entry) => (
                <div key={entry.name} className="legend-row">
                  <span className="legend-color" style={{ background: entry.color }}></span>
                  <span className="legend-name">{entry.name}</span>
                  <span className="legend-percent">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card full-width chart-card">
          <div className="card-header">
            <h3>Automated Response Queue</h3>
            <span className="muted-pill">8 actions</span>
          </div>

          <div className="playbook-list">
            {automationActions.map((action, index) => (
              <div key={`${action}-${index}`} className="playbook-item">
                <span className="playbook-icon">✓</span>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card incidents-card full-width">
          <div className="card-header">
            <h3>Recent Incidents</h3>
            <a href="#incidents">View All</a>
          </div>
          <table className="incidents-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Detected</th>
              </tr>
            </thead>
            <tbody>
              {(dashboard.incidents || []).map((item) => (
                <tr key={`${item.type}-${item.detected}`}>
                  <td>{item.type}</td>
                  <td><span className={`severity ${item.severity.toLowerCase() === 'high' ? 'high' : 'medium'}`}>{item.severity}</span></td>
                  <td><span className={`status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></td>
                  <td>{item.detected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card threat-timeline full-width">
          <div className="card-header">
            <h3>Threat Timeline (Last 24 Hours)</h3>
          </div>
          <div className="timeline-chart">
            {(dashboard.timeline || []).map((value, index) => (
              <div key={`${value}-${index}`} className="chart-bar" style={{ height: `${value}%` }}></div>
            ))}
          </div>
        </div>

        <div className="card threats-card full-width">
          <div className="card-header">
            <h3>Top Detected Threats</h3>
          </div>
          <ul className="threat-list">
            {(dashboard.topThreats || []).map((item) => (
              <li key={item.name}>
                <span className="threat-name">{item.name}</span>
                <span className="threat-count">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
