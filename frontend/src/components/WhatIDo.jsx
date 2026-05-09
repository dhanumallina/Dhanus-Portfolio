import React from 'react';
import { MonitorPlay, Database, Code2 } from 'lucide-react';
import './WhatIDo.css';

const WhatIDo = () => {
  const services = [
    {
      icon: <MonitorPlay size={40} className="service-icon cyan" />,
      title: "Full Stack Development",
      description: "Building responsive, modern, and high-performance web applications using React, Node.js, and Express."
    },
    {
      icon: <Database size={40} className="service-icon purple" />,
      title: "Data Analysis",
      description: "Extracting insights from complex datasets, building predictive models, and creating interactive dashboards."
    },
    {
      icon: <Code2 size={40} className="service-icon blue" />,
      title: "API Integration",
      description: "Developing robust RESTful APIs and connecting third-party services for seamless data flow."
    }
  ];

  return (
    <section id="what-i-do" className="section whatido-section">
      <div className="container animate-up">
        <h2 className="section-title">What I Do</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card animate-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
