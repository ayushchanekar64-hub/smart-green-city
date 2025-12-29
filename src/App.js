import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportIssue from './pages/ReportIssue';
import TrackComplaint from './pages/TrackComplaint';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import GreenTips from './pages/GreenTips';
import AirQuality from './pages/AirQuality';
import ShowUsers from './pages/ShowUsers';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tips" element={<GreenTips />} />
            <Route path="/air-quality" element={<AirQuality />} />
            <Route path="/show-users" element={<ShowUsers />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
