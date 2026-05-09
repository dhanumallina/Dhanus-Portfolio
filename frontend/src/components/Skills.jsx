import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "HTML", "CSS", "JavaScript", "React Native"]
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Express", "MongoDB", "SQL", "DBMS"]
    },
    {
      title: "Data Science",
      skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"]
    },
    {
      title: "Tools & Others",
      skills: ["Power BI", "Excel", "VS Code", "Java", "C", "DSA", "OOP"]
    }
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="container animate-up">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category animate-up" style={{ transitionDelay: `${index * 0.1}s` }}>
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
