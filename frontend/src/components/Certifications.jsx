import React from 'react';
import { Award } from 'lucide-react';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    { title: "Python Certificate", issuer: "HackerRank" },
    { title: "Data Analytics Intern", issuer: "APSSDC" },
    { title: "NumPy & Pandas for Data Analysis", issuer: "Coursera" },
    { title: "Getting Started with AI", issuer: "IBM" },
    { title: "SQL Certificate", issuer: "HackerRank" }
  ];

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container animate-up">
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card animate-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              <Award size={30} className="cert-icon" />
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
