import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer & Data Analyst";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 100);
    }
  }, [index, fullText, text]);

  const handleResumeView = async () => {
    // API call to track resume view
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/visitors/track-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localStorage.getItem('visitorEmail') || 'anonymous' })
      });
    } catch (err) {
      console.error(err);
    }
    // Open resume in new tab (assuming resume is in public folder)
    window.open('/Resume.pdf', '_blank');
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content container animate-up">
        <div className="badge">
          <span className="dot-green"></span> Available for work
        </div>
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Mallina Dhanusivaramakrishna</span>
        </h1>
        <h2 className="hero-subtitle">
          I'm a <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </h2>
        <p className="hero-description">
          Building professional web applications and extracting meaningful insights from data.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={handleResumeView}>View Resume</button>
          <a href="#contact" className="btn btn-secondary">Contact Me</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
