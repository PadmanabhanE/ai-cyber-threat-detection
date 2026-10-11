import React, { useState } from 'react';

const ThreatIntel = () => {
  const [threats] = useState([
    {
      id: 1,
      name: 'APT28 Campaign',
      severity: 'critical',
      sources: 342,
      confidence: 98,
      targets: ['Government', 'Defense', 'Aerospace'],
      indicators: 2847,
    },
    {
      id: 2,
      name: 'Emotet Botnet Resurgence',
      severity: 'high',
      sources: 218,
      confidence: 94,
      targets: ['Finance', 'Healthcare'],
      indicators: 1923,
    },
    {
      id: 3,
      name: 'LockBit Ransomware Variant',
      severity: 'high',
      sources: 165,
      confidence: 91,
      targets: ['Manufacturing', 'Retail'],
      indicators: 1456,
    },
    {
      id: 4,
      name: 'Supply Chain Compromise',
      severity: 'medium',
      sources: 89,
      confidence: 78,
      targets: ['Technology', 'Enterprise'],
      indicators: 654,
    },
  ]);

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
