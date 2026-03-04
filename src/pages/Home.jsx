import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const features = [
    { icon: '📝', title: 'Report Issues', desc: 'Report city problems with photos and location', link: '/report' },
    { icon: '📊', title: 'Track Complaints', desc: 'Monitor your complaint status in real-time', link: '/track' },
    { icon: '🎯', title: 'Admin Dashboard', desc: 'Manage and update complaint statuses', link: '/admin' },
    { icon: '📈', title: 'City Analytics', desc: 'View city health metrics and trends', link: '/analytics' },
    { icon: '🌱', title: 'Green Tips', desc: 'Learn how to keep your city clean', link: '/tips' },
    { icon: '💨', title: 'Air Quality', desc: 'Monitor real-time air quality data', link: '/air-quality' },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Smart Green City</h1>
            <p className="hero-subtitle">Building a cleaner, healthier city together</p>
            <p className="hero-desc">
              Report issues, track progress, and contribute to making our city more sustainable
            </p>
            <div className="hero-actions">
              <Link to="/report" className="btn btn-primary">Report an Issue</Link>
              <Link to="/track" className="btn btn-secondary">Track Complaints</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Issues Resolved</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">89%</div>
              <div className="stat-label">Resolution Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">24h</div>
              <div className="stat-label">Avg Response Time</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <Link to={feature.link} key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="issues-section">
        <div className="container">
          <h2 className="section-title">Common Issues We Handle</h2>
          <p className="issues-subtitle">
            Click on any category to report related issues in your area
          </p>
          <div className="issues-grid">
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">🗑️</span>
                <div className="issue-badge">High Priority</div>
              </div>
              <h3 className="issue-title">Garbage & Waste</h3>
              <p className="issue-desc">Illegal dumping, overflowing bins, waste collection issues</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">🌊</span>
                <div className="issue-badge">Urgent</div>
              </div>
              <h3 className="issue-title">Flooding</h3>
              <p className="issue-desc">Blocked drains, water accumulation, flood risks</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">🏭</span>
                <div className="issue-badge">Monitor</div>
              </div>
              <h3 className="issue-title">Pollution</h3>
              <p className="issue-desc">Air quality, noise pollution, environmental hazards</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">🛣️</span>
                <div className="issue-badge">Daily</div>
              </div>
              <h3 className="issue-title">Road Damage</h3>
              <p className="issue-desc">Potholes, cracked surfaces, road maintenance</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">💡</span>
                <div className="issue-badge">Safety</div>
              </div>
              <h3 className="issue-title">Street Lights</h3>
              <p className="issue-desc">Broken lights, dark areas, lighting failures</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
            <div className="issue-type">
              <div className="issue-icon-wrapper">
                <span className="issue-icon">🌳</span>
                <div className="issue-badge">Green</div>
              </div>
              <h3 className="issue-title">Green Spaces</h3>
              <p className="issue-desc">Park maintenance, tree care, landscape issues</p>
              <div className="issue-stats">
                <span className="stat-item">0 reports</span>
                <span className="stat-item">0% resolved</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
