import React, { useState } from 'react';

const Dashboard = () => {
  const [threatLevel] = useState('HIGH');
  const [activeThreats] = useState(12);
  const [mitigated] = useState(847);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Security Dashboard</h1>
        <p>Real-time threat monitoring and incident overview</p>
      </div>

      <div className="dashboard-grid">
        {/* Threat Score */}
        <div className="card threat-score">
          <h3>Threat Level</h3>
          <div className="large-metric">
            <div className={`threat-badge ${threatLevel.toLowerCase()}`}>{threatLevel}</div>
          </div>
          <p>Current system threat posture</p>
        </div>

        {/* Active Threats */}
        <div className="card stat-card">
          <h3>Active Threats</h3>
          <div className="large-number">{activeThreats}</div>
          <p>Ongoing investigations</p>
          <div className="trend-down">↓ 3 since yesterday</div>
        </div>

        {/* Mitigated */}
        <div className="card stat-card">
          <h3>Mitigated This Month</h3>
          <div className="large-number">{mitigated}</div>
          <p>Threats contained</p>
          <div className="trend-up">↑ 48 today</div>
        </div>

        {/* System Health */}
        <div className="card stat-card">
          <h3>System Health</h3>
          <div className="health-bar">
            <div className="health-fill" style={{ width: '94%' }}></div>
          </div>
          <p>94% - All systems operational</p>
        </div>

        {/* Recent Incidents */}
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
              <tr>
                <td>Phishing Email Campaign</td>
                <td><span className="severity high">High</span></td>
                <td><span className="status contained">Contained</span></td>
                <td>2 hours ago</td>
              </tr>
              <tr>
                <td>Suspicious Login Pattern</td>
                <td><span className="severity medium">Medium</span></td>
                <td><span className="status investigating">Investigating</span></td>
                <td>4 hours ago</td>
              </tr>
              <tr>
                <td>Ransomware Detection</td>
                <td><span className="severity high">High</span></td>
                <td><span className="status resolved">Resolved</span></td>
                <td>1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Threat Timeline */}
        <div className="card threat-timeline full-width">
          <div className="card-header">
            <h3>Threat Timeline (Last 24 Hours)</h3>
          </div>
          <div className="timeline-chart">
            <div className="chart-bar" style={{ height: '40%' }}></div>
            <div className="chart-bar" style={{ height: '65%' }}></div>
            <div className="chart-bar" style={{ height: '30%' }}></div>
            <div className="chart-bar" style={{ height: '85%' }}></div>
            <div className="chart-bar" style={{ height: '50%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '45%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
          </div>
        </div>

        {/* Top Threats */}
        <div className="card threats-card full-width">
          <div className="card-header">
            <h3>Top Detected Threats</h3>
          </div>
          <ul className="threat-list">
            <li>
              <span className="threat-name">Brute Force Attacks</span>
              <span className="threat-count">234</span>
            </li>
            <li>
              <span className="threat-name">Malware Variants</span>
              <span className="threat-count">127</span>
            </li>
            <li>
              <span className="threat-name">SQL Injection Attempts</span>
              <span className="threat-count">89</span>
            </li>
            <li>
              <span className="threat-name">Data Exfiltration Attempts</span>
              <span className="threat-count">45</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
