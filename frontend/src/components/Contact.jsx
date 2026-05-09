import React, { useState } from 'react';
import axios from 'axios';
import { Mail, MapPin, Phone, Copy, CheckCircle2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const myEmail = 'mallinadhanu@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container animate-up">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">Let's talk about everything!</h3>
            <p className="contact-desc">
              Feel free to reach out for collaborations, freelance projects, or just a friendly chat.
            </p>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div className="info-text">
                  <span>Email</span>
                  <p>{myEmail}</p>
                </div>
                <button className="copy-btn" onClick={handleCopy} title="Copy Email">
                  {copied ? <CheckCircle2 size={16} color="#4ade80" /> : <Copy size={16} />}
                </button>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div className="info-text">
                  <span>Phone</span>
                  <p>+91-9493470988</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div className="info-text">
                  <span>Location</span>
                  <p>Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
            
            <div className="badge mt-4">
              <span className="dot-green"></span> Available for work
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <textarea 
                  name="message" 
                  rows="5" 
                  placeholder="Your Message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              
              {status === 'success' && <p className="status-msg success">Message sent successfully!</p>}
              {status === 'error' && <p className="status-msg error">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
