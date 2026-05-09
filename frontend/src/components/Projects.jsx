import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  
  const defaultProjects = [
    {
      title: "Business Sales Analytics Dashboard",
      description: "Interactive dashboard providing actionable insights into sales data, helping optimize business strategies and revenue generation.",
      techStack: ["Power BI", "Excel"],
      status: "Real",
      image: "/images/sales_dashboard.png"
    },
    {
      title: "Placement Prediction Model",
      description: "Machine learning model predicting student placement probabilities based on academic performance and skills.",
      techStack: ["Python", "NumPy", "Pandas"],
      status: "Real",
      image: "/images/prediction_model.png"
    },
    {
      title: "Currency Converter",
      description: "Real-time currency converter utilizing live exchange rate APIs for accurate financial conversions.",
      techStack: ["Python", "API"],
      status: "Real",
      image: "/images/currency_converter.png"
    },
    {
      title: "Real-Time Chat App",
      description: "Full-stack instant messaging application with real-time updates and secure user authentication.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io"],
      status: "Coming Soon",
      image: "/images/in_progress.png"
    },
    {
      title: "Student Placement Portal",
      description: "Comprehensive portal for managing student profiles, job postings, and application tracking.",
      techStack: ["React", "Node.js", "MongoDB"],
      status: "Coming Soon",
      image: "/images/in_progress.png"
    },
    {
      title: "AI Interview Prep App",
      description: "AI-powered application helping candidates practice interviews with real-time feedback.",
      techStack: ["React", "Node.js", "MongoDB", "AI API"],
      status: "Coming Soon",
      image: "/images/in_progress.png"
    },
    {
      title: "Music Streaming Platform",
      description: "Web-based music streaming service with custom playlists and audio playback features.",
      techStack: ["React", "Node.js", "MongoDB"],
      status: "Coming Soon",
      image: "/images/in_progress.png"
    }
  ];

  useEffect(() => {
    // Attempt to fetch from API, fallback to default
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
      })
      .catch(() => setProjects(defaultProjects));
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container animate-up">
        <h2 className="section-title">Projects Showcase</h2>
        <div className="projects-grid animate-up">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.status === 'Coming Soon' ? 'coming-soon' : ''}`}>
              {project.status === 'Coming Soon' && (
                <div className="status-badge">🔧 In Progress</div>
              )}
              {project.image && (
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.status === 'Real' ? (
                  <>
                    <a href={project.githubLink || "https://github.com/dhanumallina"} target="_blank" rel="noopener noreferrer" className="icon-link"><FaGithub size={20} /> Code</a>
                    <a href={project.liveDemo || "#"} target="_blank" rel="noopener noreferrer" className="icon-link"><ExternalLink size={20} /> Demo</a>
                  </>
                ) : (
                  <span className="coming-soon-text">Building in progress...</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
