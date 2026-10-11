import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api/client';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dashboardApi.getAnalytics();
        setAnalytics(data.analytics || null);
      } catch (error) {
        console.error('Analytics load failed', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="page-container"><div className="card full-width"><h3>Loading analytics…</h3></div></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <p>Performance metrics and security insights</p>
      </div>

      <div className="analytics-grid">
        <div className="card analytics-card">
          <h3>Detection Rate (30 Days)</h3>
          <div className="metric-large">{analytics?.detectionRate || 0}%</div>
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

        <div className="card analytics-card">
          <h3>Mean Time to Detect (MTTD)</h3>
          <div className="metric-large">{analytics?.mttd || '1.8m'}</div>
          <p>Average threat detection time</p>
          <p>↓ 0.3m improvement</p>
        </div>

        <div className="card analytics-card">
          <h3>Mean Time to Respond (MTTR)</h3>
          <div className="metric-large">{analytics?.mttr || '4.2m'}</div>
          <p>Average incident response time</p>
          <p>↓ 1.5m improvement</p>
        </div>

        <div className="card analytics-card">
          <h3>False Positive Rate</h3>
          <div className="metric-large">{analytics?.falsePositiveRate || 0}%</div>
          <p>Reduced alert fatigue</p>
          <p>↓ 8.7% from last month</p>
        </div>

        <div className="card full-width">
          <h3>Threat Type Distribution</h3>
          <div className="threat-distribution">
            {(analytics?.distribution || []).map((item) => (
              <div key={item.name} className="threat-bar">
                <div className="bar-label">{item.name}</div>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${item.percent}%` }}></div>
                </div>
                <span className="bar-value">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

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
              {(analytics?.methods || []).map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{item.successRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
