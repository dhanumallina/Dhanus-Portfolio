import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Users, Mail, FileText } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('visitors');
  
  // Dummy authentication for this MVP (In real app, use NextAuth or JWT)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Very basic password
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container animate-fade-in">
        <div className="admin-login-card">
          <ShieldAlert size={40} className="admin-icon" />
          <h2>Admin Dashboard</h2>
          <p>Restricted Access</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade-in">
      <div className="admin-sidebar">
        <h2>MD. Admin</h2>
        <ul>
          <li className={activeTab === 'visitors' ? 'active' : ''} onClick={() => setActiveTab('visitors')}>
            <Users size={20} /> Visitors
          </li>
          <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
            <Mail size={20} /> Messages
          </li>
          <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
            <FileText size={20} /> Projects CMS
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {activeTab === 'visitors' && (
          <div>
            <h3>Visitor Tracking (Coming Soon)</h3>
            <p>Here you will see all email captures and resume downloads.</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div>
            <h3>Messages (Coming Soon)</h3>
            <p>Here you will see all contact form submissions.</p>
          </div>
        )}
        {activeTab === 'projects' && (
          <div>
            <h3>Projects Management (Coming Soon)</h3>
            <p>Add, edit, or remove projects from the portfolio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
