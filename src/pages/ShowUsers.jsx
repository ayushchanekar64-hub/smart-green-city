import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/forms.css';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        console.log('Users fetched:', res.data);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Make sure backend server is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="loading">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <h1>Registered Users</h1>
        <p>Total Users: {users.length}</p>
        
        {users.length === 0 ? (
          <div className="alert alert-info">
            <p>No users found. Register a new user to see them here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.phone || 'N/A'}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        backgroundColor: user.role === 'admin' ? '#ff6b6b' : '#4ecdc4',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        backgroundColor: user.isActive ? '#51cf66' : '#ff6b6b',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowUsers;
