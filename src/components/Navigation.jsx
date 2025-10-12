import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const publicLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/track', label: 'Track', icon: '📊' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/tips', label: 'Green Tips', icon: '🌱' },
    { path: '/air-quality', label: 'Air Quality', icon: '💨' },
  ];

  const authLinks = [
    { path: '/report', label: 'Report Issue', icon: '📝' },
  ];

  const adminLinks = [
    { path: '/admin', label: 'Admin', icon: '🎯' },
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <img src="/smart-green-city-logo.svg" alt="Smart Green City Logo" style={{ height: 36, marginRight: 8 }} />
          <span className="brand-text">Smart Green City</span>
        </Link>

        <button 
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
          {publicLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {isAuthenticated && authLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {isAdmin() && adminLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <div className="nav-user">
                <span className="user-icon">👤</span>
                <span>{user?.name}</span>
              </div>
              <button className="nav-link nav-logout" onClick={handleLogout}>
                <span className="nav-icon">🚪</span>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">🔑</span>
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className={`nav-link nav-register ${location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon">✨</span>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
