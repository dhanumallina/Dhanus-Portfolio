import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container animate-up">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a passionate Full Stack Developer and Data Analyst currently pursuing my B.Tech in CSE specializing in Data Science at Aditya College of Engineering & Technology (CGPA: 7.1).
            </p>
            <p>
              With a strong foundation in both frontend and backend technologies, I specialize in building end-to-end web applications that are responsive, performant, and scalable. My data science background empowers me to extract valuable insights from data, integrating analytical intelligence directly into the applications I build.
            </p>
            <p>
              I am actively looking for opportunities where I can leverage my diverse tech stack—including React, Node.js, Python, and MongoDB—to solve complex problems and deliver robust digital solutions.
            </p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">Mallina Dhanusivaramakrishna</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">mallinadhanu@gmail.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Education:</span>
                <span className="detail-value">B.Tech CSE - Data Science (2023–2027)</span>
              </div>
            </div>
            <button className="btn btn-primary mt-4" onClick={() => window.open('/Resume.pdf', '_blank')}>View Resume</button>
          </div>
          <div className="about-visual">
            <div className="tech-sphere">
              {/* Abstract visual representation instead of a photo */}
              <div className="sphere-core"></div>
              <div className="orbit orbit-1"></div>
              <div className="orbit orbit-2"></div>
              <div className="orbit orbit-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
