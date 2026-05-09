import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import './EmailPopup.css';

const EmailPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Show after 5 seconds if not seen before
    const hasSeenPopup = localStorage.getItem('hasSeenEmailPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenEmailPopup', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/visitors`, {
        email,
        device: navigator.userAgent,
        country: 'Unknown' // Ideally use a GeoIP API here
      });
      setStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay animate-fade-in">
      <div className="popup-content animate-slide-up">
        <button className="close-btn" onClick={handleClose}><X size={20} /></button>
        <h2>Welcome to my Portfolio</h2>
        <p>Want project updates and resources? Drop your email below.</p>
        
        {status === 'success' ? (
          <div className="success-msg">Thanks! Check your inbox soon.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Continue'}
            </button>
          </form>
        )}
        
        <button className="skip-btn" onClick={handleClose}>
          Skip & Enter Portfolio
        </button>
      </div>
    </div>
  );
};

export default EmailPopup;
