import React from 'react';
import '../styles/tips.css';

const GreenTips = () => {
  const tips = [
    {
      category: 'Waste Management',
      icon: '🗑️',
      items: [
        'Separate waste into dry, wet, and hazardous categories',
        'Use reusable bags instead of plastic bags',
        'Compost organic waste at home',
        'Donate or recycle old items instead of throwing them away',
        'Avoid single-use plastics and disposables'
      ]
    },
    {
      category: 'Water Conservation',
      icon: '💧',
      items: [
        'Fix leaking taps and pipes immediately',
        'Harvest rainwater for gardening and cleaning',
        'Use water-efficient appliances',
        'Take shorter showers and turn off taps while brushing',
        'Reuse water from washing vegetables for plants'
      ]
    },
    {
      category: 'Energy Saving',
      icon: '💡',
      items: [
        'Switch to LED bulbs for better efficiency',
        'Unplug devices when not in use',
        'Use natural light during daytime',
        'Install solar panels if possible',
        'Use energy-efficient appliances with high star ratings'
      ]
    },
    {
      category: 'Green Transportation',
      icon: '🚲',
      items: [
        'Use public transport, carpool, or bike for short distances',
        'Walk whenever possible for nearby destinations',
        'Maintain your vehicle for better fuel efficiency',
        'Consider electric or hybrid vehicles',
        'Plan trips to reduce unnecessary travel'
      ]
    },
    {
      category: 'Air Quality',
      icon: '💨',
      items: [
        'Plant more trees and maintain green spaces',
        'Avoid burning waste or leaves',
        'Use eco-friendly cleaning products',
        'Reduce vehicle idling time',
        'Support smoke-free zones'
      ]
    },
    {
      category: 'Community Action',
      icon: '🤝',
      items: [
        'Participate in local cleanup drives',
        'Report environmental violations promptly',
        'Educate others about sustainable practices',
        'Support local eco-friendly businesses',
        'Join or start community green initiatives'
      ]
    }
  ];

  const challenges = [
    {
      title: '30-Day Plastic Free Challenge',
      desc: 'Eliminate single-use plastics from your daily routine',
      participants: 0,
      icon: '🌍'
    },
    {
      title: 'Plant a Tree Campaign',
      desc: 'Plant and nurture a tree in your neighborhood',
      participants: 0,
      icon: '🌳'
    },
    {
      title: 'Zero Waste Week',
      desc: 'Minimize waste generation for one week',
      participants: 0,
      icon: '♻️'
    }
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Green Tips & Best Practices</h1>
          <p>Learn how to keep your city clean, green, and healthy</p>
        </div>

        <div className="tips-grid">
          {tips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              <div className="tip-header">
                <span className="tip-icon">{tip.icon}</span>
                <h3>{tip.category}</h3>
              </div>
              <ul className="tip-list">
                {tip.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="challenges-section">
          <h2>Join Our Green Challenges</h2>
          <p className="section-desc">Take part in community challenges and make a difference</p>
          <div className="challenges-grid">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="challenge-card">
                <div className="challenge-icon">{challenge.icon}</div>
                <h3>{challenge.title}</h3>
                <p>{challenge.desc}</p>
                <div className="challenge-meta">
                  <span className="participants">👥 {challenge.participants} participants</span>
                  <button className="btn btn-primary">Join Challenge</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-section">
          <h2>Educational Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <span className="resource-icon">📚</span>
              <h4>Waste Segregation Guide</h4>
              <p>Learn proper waste separation techniques</p>
              <a href="#" className="resource-link">Download PDF →</a>
            </div>
            <div className="resource-card">
              <span className="resource-icon">🎥</span>
              <h4>Video Tutorials</h4>
              <p>Watch practical eco-friendly tips</p>
              <a href="#" className="resource-link">Watch Videos →</a>
            </div>
            <div className="resource-card">
              <span className="resource-icon">📱</span>
              <h4>Mobile App</h4>
              <p>Track your green footprint</p>
              <a href="#" className="resource-link">Download App →</a>
            </div>
          </div>
        </div>

        <div className="impact-section">
          <h2>Your Impact Matters</h2>
          <div className="impact-stats">
            <div className="impact-item">
              <div className="impact-number">2.4M</div>
              <div className="impact-label">Plastic bags saved</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">15K</div>
              <div className="impact-label">Trees planted</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">890</div>
              <div className="impact-label">Tons waste recycled</div>
            </div>
            <div className="impact-item">
              <div className="impact-number">34%</div>
              <div className="impact-label">Carbon reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenTips;
