import React, { useState, useEffect } from 'react';
import '../styles/airquality.css';

const AirQuality = () => {
  const [currentAQI, setCurrentAQI] = useState(52);

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: '#4ade80', desc: 'Air quality is satisfactory' };
    if (aqi <= 100) return { level: 'Moderate', color: '#fbbf24', desc: 'Air quality is acceptable' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: '#fb923c', desc: 'Sensitive groups may experience health effects' };
    if (aqi <= 200) return { level: 'Unhealthy', color: '#f87171', desc: 'Everyone may begin to experience health effects' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: '#dc2626', desc: 'Health alert: everyone may experience serious effects' };
    return { level: 'Hazardous', color: '#991b1b', desc: 'Health warnings of emergency conditions' };
  };

  const status = getAQIStatus(currentAQI);

  const locations = [
    { name: 'Downtown', aqi: 68, trend: 'up' },
    { name: 'Industrial Area', aqi: 142, trend: 'down' },
    { name: 'Residential Zone', aqi: 45, trend: 'stable' },
    { name: 'Park Area', aqi: 32, trend: 'down' },
    { name: 'Highway Junction', aqi: 89, trend: 'up' },
    { name: 'Suburban Area', aqi: 41, trend: 'stable' }
  ];

  const pollutants = [
    { name: 'PM2.5', value: 28, unit: 'µg/m³', status: 'Good' },
    { name: 'PM10', value: 45, unit: 'µg/m³', status: 'Good' },
    { name: 'O3', value: 62, unit: 'ppb', status: 'Moderate' },
    { name: 'NO2', value: 34, unit: 'ppb', status: 'Good' },
    { name: 'SO2', value: 12, unit: 'ppb', status: 'Good' },
    { name: 'CO', value: 0.8, unit: 'ppm', status: 'Good' }
  ];

  const recommendations = [
    { icon: '🏃', text: 'Good time for outdoor activities', applicable: currentAQI <= 50 },
    { icon: '😷', text: 'Consider wearing a mask outdoors', applicable: currentAQI > 100 },
    { icon: '🏠', text: 'Keep windows closed', applicable: currentAQI > 150 },
    { icon: '🚗', text: 'Limit vehicle usage', applicable: currentAQI > 100 },
    { icon: '🌳', text: 'Plant more trees in your area', applicable: true },
    { icon: '💨', text: 'Use air purifiers indoors', applicable: currentAQI > 100 }
  ];

  return (
    <div className="page-container">
      <div className="container-wide">
        <div className="page-header">
          <h1>Air Quality Monitor</h1>
          <p>Real-time air quality data for your city</p>
        </div>

        <div className="aqi-hero">
          <div className="aqi-main">
            <div className="aqi-label">Current Air Quality Index</div>
            <div className="aqi-value" style={{ color: status.color }}>
              {currentAQI}
            </div>
            <div className="aqi-status" style={{ color: status.color }}>
              {status.level}
            </div>
            <div className="aqi-desc">{status.desc}</div>
            <div className="aqi-gauge">
              <div className="gauge-bar">
                <div 
                  className="gauge-fill" 
                  style={{ 
                    width: `${Math.min((currentAQI / 300) * 100, 100)}%`,
                    background: status.color 
                  }}
                ></div>
              </div>
              <div className="gauge-labels">
                <span>0</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200</span>
                <span>300+</span>
              </div>
            </div>
          </div>

          <div className="aqi-info">
            <h3>What does this mean?</h3>
            <div className="aqi-scale">
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#4ade80' }}></div>
                <span>0-50: Good</span>
              </div>
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#fbbf24' }}></div>
                <span>51-100: Moderate</span>
              </div>
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#fb923c' }}></div>
                <span>101-150: Unhealthy for Sensitive</span>
              </div>
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#f87171' }}></div>
                <span>151-200: Unhealthy</span>
              </div>
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#dc2626' }}></div>
                <span>201-300: Very Unhealthy</span>
              </div>
              <div className="scale-item">
                <div className="scale-color" style={{ background: '#991b1b' }}></div>
                <span>300+: Hazardous</span>
              </div>
            </div>
          </div>
        </div>

        <div className="locations-section">
          <h2>AQI by Location</h2>
          <div className="locations-grid">
            {locations.map((loc, idx) => {
              const locStatus = getAQIStatus(loc.aqi);
              return (
                <div key={idx} className="location-card">
                  <div className="location-name">{loc.name}</div>
                  <div className="location-aqi" style={{ color: locStatus.color }}>
                    {loc.aqi}
                  </div>
                  <div className="location-status">{locStatus.level}</div>
                  <div className={`location-trend trend-${loc.trend}`}>
                    {loc.trend === 'up' && '↑ Increasing'}
                    {loc.trend === 'down' && '↓ Decreasing'}
                    {loc.trend === 'stable' && '→ Stable'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pollutants-section">
          <h2>Pollutant Levels</h2>
          <div className="pollutants-grid">
            {pollutants.map((pollutant, idx) => (
              <div key={idx} className="pollutant-card">
                <div className="pollutant-header">
                  <h4>{pollutant.name}</h4>
                  <span className={`status-badge status-${pollutant.status.toLowerCase()}`}>
                    {pollutant.status}
                  </span>
                </div>
                <div className="pollutant-value">
                  {pollutant.value} <span className="pollutant-unit">{pollutant.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendations-section">
          <h2>Health Recommendations</h2>
          <div className="recommendations-grid">
            {recommendations
              .filter(rec => rec.applicable)
              .map((rec, idx) => (
                <div key={idx} className="recommendation-card">
                  <span className="rec-icon">{rec.icon}</span>
                  <span>{rec.text}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="forecast-section">
          <h2>7-Day Forecast</h2>
          <div className="forecast-chart">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const forecastAQI = 45 + Math.random() * 60;
              const forecastStatus = getAQIStatus(forecastAQI);
              return (
                <div key={idx} className="forecast-day">
                  <div className="forecast-label">{day}</div>
                  <div 
                    className="forecast-bar" 
                    style={{ 
                      height: `${(forecastAQI / 150) * 100}%`,
                      background: forecastStatus.color 
                    }}
                  ></div>
                  <div className="forecast-value">{Math.round(forecastAQI)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
