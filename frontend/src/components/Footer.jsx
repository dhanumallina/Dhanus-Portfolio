import React from 'react';
import { ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Mallina Dhanusivaramakrishna</h3>
            <p>Full Stack Developer & Data Analyst</p>
          </div>
          
          <div className="footer-socials">
            <a href="https://github.com/dhanumallina" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mallina-dhanu-sivaramakrishna-189448291" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={20} />
            </a>
            {/* Instagram placeholder as requested */}
            <a href="#" className="social-link">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mallina Dhanusivaramakrishna. All rights reserved.</p>
          <button className="back-to-top" onClick={scrollToTop} title="Back to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
