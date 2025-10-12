import React, { useState } from 'react';
import '../styles/tracking.css';
import '../styles/forms.css';

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const found = complaints.find(c => c.id === complaintId.toUpperCase());
    
    if (found) {
      setComplaint(found);
      setNotFound(false);
    } else {
      setComplaint(null);
      setNotFound(true);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Resolved': return 'status-resolved';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getStatusSteps = (status) => {
    const steps = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
    const currentIndex = {
      'Pending': 0,
      'In Progress': 2,
      'Resolved': 3,
      'Rejected': -1
    }[status] || 0;

    return steps.map((step, idx) => ({
      label: step,
      active: idx <= currentIndex,
      current: idx === currentIndex
    }));
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Track Your Complaint</h1>
          <p>Enter your complaint ID to check the status</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="Enter Complaint ID (e.g., CMP123ABC)"
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Track
            </button>
          </div>
        </form>

        {notFound && (
          <div className="alert alert-error">
            <strong>Not Found:</strong> No complaint found with ID "{complaintId}". Please check and try again.
          </div>
        )}

        {complaint && (
          <div className="complaint-details">
            <div className="detail-card">
              <div className="detail-header">
                <h2>Complaint Details</h2>
                <span className={`status-badge ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Complaint ID:</strong>
                  <span>{complaint.id}</span>
                </div>
                <div className="detail-item">
                  <strong>Date Submitted:</strong>
                  <span>{new Date(complaint.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <strong>Issue Type:</strong>
                  <span>{complaint.type}</span>
                </div>
                <div className="detail-item">
                  <strong>Location:</strong>
                  <span>{complaint.location}</span>
                </div>
              </div>

              <div className="detail-section">
                <strong>Title:</strong>
                <p>{complaint.title}</p>
              </div>

              <div className="detail-section">
                <strong>Description:</strong>
                <p>{complaint.description}</p>
              </div>

              {complaint.image && (
                <div className="detail-section">
                  <strong>Attached Image:</strong>
                  <p className="muted">{complaint.image}</p>
                </div>
              )}
            </div>

            <div className="progress-card">
              <h3>Progress Timeline</h3>
              <div className="progress-steps">
                {getStatusSteps(complaint.status).map((step, idx) => (
                  <div key={idx} className={`progress-step ${step.active ? 'active' : ''} ${step.current ? 'current' : ''}`}>
                    <div className="step-marker">
                      {step.active ? '✓' : idx + 1}
                    </div>
                    <div className="step-label">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="recent-complaints">
          <h3>Recent Complaints</h3>
          <div className="complaints-list">
            {JSON.parse(localStorage.getItem('complaints') || '[]')
              .slice(-5)
              .reverse()
              .map((c) => (
                <div key={c.id} className="complaint-item" onClick={() => {
                  setComplaintId(c.id);
                  setComplaint(c);
                  setNotFound(false);
                }}>
                  <div className="complaint-info">
                    <strong>{c.title}</strong>
                    <span className="muted">{c.id}</span>
                  </div>
                  <span className={`status-badge ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaint;
