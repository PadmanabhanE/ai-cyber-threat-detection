import React, { useState } from 'react';

const Analytics = () => {
  const [timeRange] = useState('30d');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <p>Performance metrics and security insights</p>
      </div>

      <div className="analytics-grid">
        {/* Detection Rate */}
        <div className="card analytics-card">
          <h3>Detection Rate (30 Days)</h3>
          <div className="metric-large">99.2%</div>
          <div className="spark-chart">
            <div className="spark-bar" style={{ height: '60%' }}></div>
            <div className="spark-bar" style={{ height: '75%' }}></div>
            <div className="spark-bar" style={{ height: '65%' }}></div>
            <div className="spark-bar" style={{ height: '85%' }}></div>
            <div className="spark-bar" style={{ height: '72%' }}></div>
            <div className="spark-bar" style={{ height: '88%' }}></div>
          </div>
          <p>↑ 2.1% from previous period</p>
        </div>

        {/* Mean Time to Detect */}
        <div className="card analytics-card">
          <h3>Mean Time to Detect (MTTD)</h3>
          <div className="metric-large">1.8m</div>
          <p>Average threat detection time</p>
          <p>↓ 0.3m improvement</p>
        </div>

        {/* Mean Time to Respond */}
        <div className="card analytics-card">
          <h3>Mean Time to Respond (MTTR)</h3>
          <div className="metric-large">4.2m</div>
          <p>Average incident response time</p>
          <p>↓ 1.5m improvement</p>
        </div>

        {/* False Positive Rate */}
        <div className="card analytics-card">
          <h3>False Positive Rate</h3>
          <div className="metric-large">3.2%</div>
          <p>Reduced alert fatigue</p>
          <p>↓ 8.7% from last month</p>
        </div>

        {/* Threat Distribution */}
        <div className="card full-width">
          <h3>Threat Type Distribution</h3>
          <div className="threat-distribution">
            <div className="threat-bar">
              <div className="bar-label">Malware</div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: '35%' }}></div>
              </div>
              <span className="bar-value">345</span>
            </div>
            <div className="threat-bar">
              <div className="bar-label">Phishing</div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: '28%' }}></div>
              </div>
              <span className="bar-value">276</span>
            </div>
            <div className="threat-bar">
              <div className="bar-label">Ransomware</div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: '22%' }}></div>
              </div>
              <span className="bar-value">218</span>
            </div>
            <div className="threat-bar">
              <div className="bar-label">Credential Abuse</div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: '15%' }}></div>
              </div>
              <span className="bar-value">152</span>
            </div>
          </div>
        </div>

        {/* Top Detections */}
        <div className="card full-width">
          <h3>Top Detection Methods This Month</h3>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Detection Method</th>
                <th>Count</th>
                <th>Success Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Behavioral Analysis</td>
                <td>2,847</td>
                <td>98.3%</td>
              </tr>
              <tr>
                <td>Threat Intelligence Feed</td>
                <td>1,923</td>
                <td>96.1%</td>
              </tr>
              <tr>
                <td>Anomaly Detection</td>
                <td>1,456</td>
                <td>94.7%</td>
              </tr>
              <tr>
                <td>Signature-Based Detection</td>
                <td>987</td>
                <td>91.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
