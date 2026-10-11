import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api/client';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await dashboardApi.getIncidents();
        setIncidents(data.incidents || []);
      } catch (error) {
        console.error('Incidents load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  const getSeverityClass = (severity) => severity.toLowerCase();
  const getStatusClass = (status) => status.toLowerCase();

  if (loading) {
    return <div className="page-container"><div className="card full-width"><h3>Loading incidents…</h3></div></div>;
  }

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
