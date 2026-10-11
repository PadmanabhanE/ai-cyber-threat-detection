import React, { useState } from 'react';

const Incidents = () => {
  const [incidents] = useState([
    {
      id: 'INC-2024-001',
      title: 'Credential Stuffing Attack - Marketing Dept',
      severity: 'high',
      status: 'investigating',
      created: '2 hours ago',
      updated: '12 minutes ago',
      affected: 34,
      assets: ['Email System', 'VPN Gateway', 'Identity Provider'],
    },
    {
      id: 'INC-2024-002',
      title: 'Malware Detected on Endpoint',
      severity: 'critical',
      status: 'contained',
      created: '5 hours ago',
      updated: '1 hour ago',
      affected: 2,
      assets: ['Workstation-142', 'Backup Server'],
    },
    {
      id: 'INC-2024-003',
      title: 'Suspicious Cloud Activity',
      severity: 'medium',
      status: 'monitoring',
      created: '1 day ago',
      updated: '2 hours ago',
      affected: 8,
      assets: ['AWS Account', 'S3 Bucket'],
    },
    {
      id: 'INC-2024-004',
      title: 'Phishing Email Campaign',
      severity: 'high',
      status: 'resolved',
      created: '3 days ago',
      updated: '2 days ago',
      affected: 156,
      assets: ['Email Gateway', 'User Accounts'],
    },
  ]);

  const getSeverityClass = (severity) => severity.toLowerCase();
  const getStatusClass = (status) => status.toLowerCase();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Incidents</h1>
        <p>Manage and investigate security incidents</p>
      </div>

      <div className="filters-bar">
        <input type="text" placeholder="Search incidents..." className="search-input" />
        <select className="filter-select">
          <option>All Status</option>
          <option>Investigating</option>
          <option>Contained</option>
          <option>Monitoring</option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="incidents-list">
        {incidents.map((incident) => (
          <div key={incident.id} className="incident-item">
            <div className="incident-header">
              <div className="incident-title-block">
                <h3>{incident.title}</h3>
                <span className="incident-id">{incident.id}</span>
              </div>
              <div className="incident-badges">
                <span className={`severity ${getSeverityClass(incident.severity)}`}>
                  {incident.severity.toUpperCase()}
                </span>
                <span className={`status ${getStatusClass(incident.status)}`}>
                  {incident.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="incident-details">
              <div className="detail">
                <span className="label">Created:</span>
                <span className="value">{incident.created}</span>
              </div>
              <div className="detail">
                <span className="label">Updated:</span>
                <span className="value">{incident.updated}</span>
              </div>
              <div className="detail">
                <span className="label">Affected:</span>
                <span className="value">{incident.affected} users/systems</span>
              </div>
            </div>

            <div className="incident-assets">
              <span className="assets-label">Affected Assets:</span>
              <div className="assets-list">
                {incident.assets.map((asset) => (
                  <span key={asset} className="asset-tag">
                    {asset}
                  </span>
                ))}
              </div>
            </div>

            <button className="view-btn">View Full Incident</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Incidents;
