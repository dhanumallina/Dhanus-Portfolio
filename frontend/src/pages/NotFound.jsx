import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found animate-fade-in">
      <div className="glitch-wrapper">
        <h1 className="glitch" data-text="404">404</h1>
      </div>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
    </div>
  );
};

export default NotFound;
