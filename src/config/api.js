// API Configuration for different environments

const API_CONFIG = {
  // Local development
  development: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
  },
  
  // Production (Vercel)
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com/api'
  },
  
  // Test environment
  test: {
    baseURL: 'http://localhost:5000/api'
  }
};

// Get current environment
const getEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

// Get API base URL for current environment
export const getAPIBaseURL = () => {
  const env = getEnvironment();
  return API_CONFIG[env]?.baseURL || API_CONFIG.development.baseURL;
};

// Export API configuration
export default API_CONFIG;
