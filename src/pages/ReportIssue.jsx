import React, { useState } from 'react';
import '../styles/forms.css';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');

  const issueTypes = [
    'Garbage & Waste',
    'Flooding',
    'Pollution',
    'Road Damage',
    'Street Lights',
    'Green Spaces',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a random complaint ID
    const id = 'CMP' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setComplaintId(id);
    
    // Store in localStorage (in real app, this would be an API call)
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const newComplaint = {
      id,
      ...formData,
      image: formData.image ? formData.image.name : null,
      status: 'Pending',
      date: new Date().toISOString(),
    };
    complaints.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Complaint Submitted Successfully!</h2>
            <p>Your complaint has been registered and our team will review it shortly.</p>
            <div className="complaint-id-box">
              <strong>Complaint ID:</strong>
              <span className="complaint-id">{complaintId}</span>
            </div>
            <p className="note">Please save this ID to track your complaint status.</p>
            <div className="success-actions">
              <button onClick={() => {
                setSubmitted(false);
                setFormData({ type: '', title: '', description: '', location: '', image: null });
              }} className="btn btn-secondary">
                Report Another Issue
              </button>
              <a href="/track" className="btn btn-primary">Track Complaint</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Report an Issue</h1>
          <p>Help us keep the city clean and healthy by reporting issues</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Issue Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select issue type</option>
              {issueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about the issue"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <div className="location-input">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or coordinates"
                required
              />
              <button type="button" onClick={getCurrentLocation} className="btn btn-icon">
                📍 Get Current Location
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            {formData.image && (
              <div className="file-preview">
                Selected: {formData.image.name}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
