import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import WhatIDo from '../components/WhatIDo';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Projects from '../components/Projects';
import GithubStats from '../components/GithubStats';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-up');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="home">
      <Hero />
      <WhatIDo />
      <About />
      <Skills />
      <Experience />
      <Certifications />
      <Projects />
      <GithubStats />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
