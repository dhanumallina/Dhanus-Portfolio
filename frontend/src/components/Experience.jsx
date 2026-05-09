import React from 'react';
import { Briefcase } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="container animate-up">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          <div className="timeline-item animate-up">
            <div className="timeline-dot">
              <Briefcase size={20} />
            </div>
            <div className="timeline-content">
              <h3>Data Analysis Intern</h3>
              <h4>APSSDC</h4>
              <span className="timeline-date">May 2025 - July 2025</span>
              <p>
                Collaborated with the data team to clean, process, and analyze large datasets. Developed interactive dashboards using Power BI to visualize key performance indicators and present actionable insights to stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
