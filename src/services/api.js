// API Service for Smart Green City
import { getAPIBaseURL } from '../config/api';

// Use environment-specific API URL
const API_URL = getAPIBaseURL();

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Set token in localStorage
export const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
export const removeToken = () => localStorage.removeItem('token');

// API helper function
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  // Don't add Content-Type for FormData (browser sets it automatically with boundary)
  if (!(options.body instanceof FormData) && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server is not responding. Please make sure the backend server is running on port 5000.');
    }
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    // If it's a network error or proxy error
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      throw new Error('Cannot connect to server. Please make sure the backend is running.');
    }
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  getProfile: () => apiCall('/auth/me'),
  
  updateProfile: (userData) => apiCall('/auth/updateprofile', {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
  
  changePassword: (passwords) => apiCall('/auth/changepassword', {
    method: 'PUT',
    body: JSON.stringify(passwords)
  })
};

// Complaint API
export const complaintAPI = {
  create: (formData) => apiCall('/complaints', {
    method: 'POST',
    body: formData // FormData for file upload
  }),
  
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/complaints${query ? '?' + query : ''}`);
  },
  
  getById: (id) => apiCall(`/complaints/${id}`),
  
  update: (id, data) => apiCall(`/complaints/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  updateStatus: (id, status, comment) => apiCall(`/complaints/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, comment })
  }),
  
  delete: (id) => apiCall(`/complaints/${id}`, {
    method: 'DELETE'
  }),
  
  getStats: () => apiCall('/complaints/stats/overview')
};

// User API (Admin only)
export const userAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/users${query ? '?' + query : ''}`);
  },
  
  getById: (id) => apiCall(`/users/${id}`),
  
  updateRole: (id, role) => apiCall(`/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role })
  }),
  
  updateStatus: (id, isActive) => apiCall(`/users/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ isActive })
  }),
  
  delete: (id) => apiCall(`/users/${id}`, {
    method: 'DELETE'
  })
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Get user from token (decode JWT)
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export default {
  authAPI,
  complaintAPI,
  userAPI,
  setToken,
  removeToken,
  isAuthenticated,
  getUserFromToken
};
