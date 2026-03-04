// API Helper for direct API calls with custom base URL

export const makeAPICall = async (endpoint, baseURL = null, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Use provided baseURL or fallback to environment variable
  const API_URL = baseURL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  const config = {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  // Don't add Content-Type for FormData
  if (!(options.body instanceof FormData) && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server is not responding correctly');
    }
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Example usage:
// const users = await makeAPICall('/users', 'https://your-backend-url.onrender.com/api');
// const profile = await makeAPICall('/auth/profile', null, { method: 'GET' });
