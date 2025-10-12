import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, setToken, removeToken, isAuthenticated, getUserFromToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    if (isAuthenticated()) {
      try {
        const response = await authAPI.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to load user:', error);
        removeToken();
        setUser(null);
      }
    }
    setLoading(false);
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      setToken(response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: isAuthenticated(),
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
