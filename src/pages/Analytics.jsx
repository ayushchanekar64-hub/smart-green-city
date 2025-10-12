import React, { useState, useEffect } from 'react';
import '../styles/analytics.css';

const Analytics = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(data);
  }, []);

  const getTypeStats = () => {
    const types = {};
    complaints.forEach(c => {
      types[c.type] = (types[c.type] || 0) + 1;
    });
    return Object.entries(types).map(([type, count]) => ({
      type,
      count,
      percentage: ((count / complaints.length) * 100).toFixed(1)
    }));
  };

  const getStatusStats = () => {
    const statuses = { 'Pending': 0, 'In Progress': 0, 'Resolved': 0, 'Rejected': 0 };
    complaints.forEach(c => {
      statuses[c.status] = (statuses[c.status] || 0) + 1;
    });
    return statuses;
  };

  const getMonthlyTrend = () => {
    const months = {};
    complaints.forEach(c => {
      const month = new Date(c.date).toLocaleDateString('en-US', { month: 'short' });
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months);
  };

  const typeStats = getTypeStats();
  const statusStats = getStatusStats();
  const monthlyTrend = getMonthlyTrend();
  const resolutionRate = complaints.length > 0 
    ? ((statusStats['Resolved'] / complaints.length) * 100).toFixed(1)
    : 0;

  return (
    <div className="page-container">
      <div className="container-wide">
        <div className="page-header">
          <h1>City Health Analytics</h1>
          <p>Track city issues and environmental metrics</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <h3>Total Issues</h3>
              <span className="metric-icon">📊</span>
            </div>
            <div className="metric-value">{complaints.length}</div>
            <div className="metric-trend positive">↑ 12% from last month</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Resolution Rate</h3>
              <span className="metric-icon">✅</span>
            </div>
            <div className="metric-value">{resolutionRate}%</div>
            <div className="metric-trend positive">↑ 5% improvement</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Avg Response Time</h3>
              <span className="metric-icon">⏱️</span>
            </div>
            <div className="metric-value">24h</div>
            <div className="metric-trend positive">↓ 3h faster</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Citizen Satisfaction</h3>
              <span className="metric-icon">⭐</span>
            </div>
            <div className="metric-value">4.5/5</div>
            <div className="metric-trend positive">↑ 0.3 points</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Issues by Type</h3>
            <div className="bar-chart">
              {typeStats.map((stat, idx) => (
                <div key={idx} className="bar-item">
                  <div className="bar-label">{stat.type}</div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${stat.percentage}%` }}
                    >
                      <span className="bar-value">{stat.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card">
            <h3>Status Distribution</h3>
            <div className="pie-chart">
              {Object.entries(statusStats).map(([status, count]) => (
                <div key={status} className="pie-item">
                  <div className={`pie-color status-${status.toLowerCase().replace(' ', '-')}`}></div>
                  <div className="pie-label">{status}</div>
                  <div className="pie-value">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="environmental-metrics">
          <h2>Environmental Metrics</h2>
          <div className="env-grid">
            <div className="env-card">
              <div className="env-icon">💨</div>
              <h3>Air Quality Index</h3>
              <div className="env-value good">52</div>
              <div className="env-status">Good</div>
              <div className="env-bar">
                <div className="env-bar-fill" style={{ width: '52%', background: '#4ade80' }}></div>
              </div>
            </div>

            <div className="env-card">
              <div className="env-icon">🗑️</div>
              <h3>Waste Collected</h3>
              <div className="env-value">847 tons</div>
              <div className="env-status">This Month</div>
              <div className="env-trend positive">↑ 8% from last month</div>
            </div>

            <div className="env-card">
              <div className="env-icon">♻️</div>
              <h3>Recycling Rate</h3>
              <div className="env-value">68%</div>
              <div className="env-status">Target: 75%</div>
              <div className="env-bar">
                <div className="env-bar-fill" style={{ width: '68%', background: '#60a5fa' }}></div>
              </div>
            </div>

            <div className="env-card">
              <div className="env-icon">🌳</div>
              <h3>Green Cover</h3>
              <div className="env-value">42%</div>
              <div className="env-status">City Area</div>
              <div className="env-trend positive">↑ 2% increase</div>
            </div>

            <div className="env-card">
              <div className="env-icon">💧</div>
              <h3>Water Quality</h3>
              <div className="env-value good">8.2</div>
              <div className="env-status">pH Level - Excellent</div>
            </div>

            <div className="env-card">
              <div className="env-icon">🔊</div>
              <h3>Noise Pollution</h3>
              <div className="env-value warning">65 dB</div>
              <div className="env-status">Moderate</div>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h3>Key Insights</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-icon">💡</span>
              <div>
                <strong>Peak complaint hours:</strong> Most issues are reported between 8 AM - 10 AM
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">📍</span>
              <div>
                <strong>Hotspot areas:</strong> Downtown and Industrial zones have highest complaint density
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">🎯</span>
              <div>
                <strong>Quick wins:</strong> Street light issues have fastest resolution time (avg 12h)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
