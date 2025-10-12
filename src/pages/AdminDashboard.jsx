import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const data = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(data);
  };

  const updateStatus = (id, newStatus) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    if (selectedComplaint?.id === id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
  };

  const deleteComplaint = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      const updated = complaints.filter(c => c.id !== id);
      setComplaints(updated);
      localStorage.setItem('complaints', JSON.stringify(updated));
      setSelectedComplaint(null);
    }
  };

  const filteredComplaints = filter === 'All' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  return (
    <div className="page-container">
      <div className="container-wide">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Manage and update complaint statuses</p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-text">Total Complaints</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-text">Pending</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-number">{stats.inProgress}</div>
              <div className="stat-text">In Progress</div>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{stats.resolved}</div>
              <div className="stat-text">Resolved</div>
            </div>
          </div>
        </div>

        <div className="admin-content">
          <div className="complaints-panel">
            <div className="panel-header">
              <h3>Complaints</h3>
              <div className="filter-tabs">
                {['All', 'Pending', 'In Progress', 'Resolved'].map(status => (
                  <button
                    key={status}
                    className={`filter-tab ${filter === status ? 'active' : ''}`}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="complaints-table">
              {filteredComplaints.length === 0 ? (
                <div className="empty-state">No complaints found</div>
              ) : (
                filteredComplaints.map(complaint => (
                  <div
                    key={complaint.id}
                    className={`table-row ${selectedComplaint?.id === complaint.id ? 'selected' : ''}`}
                    onClick={() => setSelectedComplaint(complaint)}
                  >
                    <div className="row-main">
                      <strong>{complaint.title}</strong>
                      <span className="muted">{complaint.type}</span>
                    </div>
                    <div className="row-meta">
                      <span className="complaint-id">{complaint.id}</span>
                      <span className={`status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedComplaint && (
            <div className="detail-panel">
              <div className="panel-header">
                <h3>Complaint Details</h3>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedComplaint(null)}
                >
                  ✕
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-field">
                  <label>ID:</label>
                  <span>{selectedComplaint.id}</span>
                </div>
                <div className="detail-field">
                  <label>Type:</label>
                  <span>{selectedComplaint.type}</span>
                </div>
                <div className="detail-field">
                  <label>Date:</label>
                  <span>{new Date(selectedComplaint.date).toLocaleString()}</span>
                </div>
                <div className="detail-field">
                  <label>Location:</label>
                  <span>{selectedComplaint.location}</span>
                </div>
                <div className="detail-field">
                  <label>Title:</label>
                  <span>{selectedComplaint.title}</span>
                </div>
                <div className="detail-field">
                  <label>Description:</label>
                  <p>{selectedComplaint.description}</p>
                </div>

                <div className="status-update">
                  <label>Update Status:</label>
                  <div className="status-buttons">
                    {['Pending', 'In Progress', 'Resolved', 'Rejected'].map(status => (
                      <button
                        key={status}
                        className={`btn-status ${selectedComplaint.status === status ? 'active' : ''}`}
                        onClick={() => updateStatus(selectedComplaint.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteComplaint(selectedComplaint.id)}
                >
                  Delete Complaint
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
