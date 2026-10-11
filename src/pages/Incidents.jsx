import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api/client';

const ThreatIntel = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dashboardApi.getThreats();
        setThreats(data.threats || []);
      } catch (error) {
        console.error('Threat intelligence load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#ff5d73';
      case 'high':
        return '#ffa500';
      case 'medium':
        return '#ffeb3b';
      default:
        return '#4caf50';
    }
  };

  if (loading) {
    return <div className="page-container"><div className="card full-width"><h3>Loading threat intelligence…</h3></div></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Threat Intelligence</h1>
        <p>Global threat landscape and predictive intelligence</p>
      </div>

      <div className="filters-bar">
        <input type="text" placeholder="Search threats..." className="search-input" />
        <select className="filter-select">
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
        </select>
        <select className="filter-select">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last 24 Hours</option>
        </select>
      </div>

      <div className="threats-grid">
        {threats.map((threat) => (
          <div key={threat.id} className="threat-card">
            <div className="threat-header">
              <div>
                <h3>{threat.name}</h3>
                <span className="severity-badge" style={{ backgroundColor: getSeverityColor(threat.severity) }}>
                  {threat.severity.toUpperCase()}
                </span>
              </div>
              <div className="threat-meta">
                <span>{threat.confidence}% confidence</span>
              </div>
            </div>

            <div className="threat-stats">
              <div className="stat">
                <span className="stat-label">Intelligence Sources</span>
                <span className="stat-value">{threat.sources}</span>
              </div>
              <div className="stat">
                <span className="stat-label">IOCs</span>
                <span className="stat-value">{threat.indicators}</span>
              </div>
            </div>

            <div className="threat-targets">
              <span className="label">Targeted Sectors:</span>
              <div className="tags">
                {threat.targets.map((target) => (
                  <span key={target} className="tag">
                    {target}
                  </span>
                ))}
              </div>
            </div>

            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatIntel;
