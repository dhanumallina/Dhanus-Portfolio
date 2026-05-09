import React, { useState, useEffect } from 'react';
import './GithubStats.css';

const GithubStats = () => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://api.github.com/users/dhanumallina').then(res => res.json()),
      fetch('https://api.github.com/users/dhanumallina/repos?sort=updated&per_page=4').then(res => res.json())
    ])
      .then(([userData, reposData]) => {
        setStats(userData);
        if (Array.isArray(reposData)) {
          setRepos(reposData);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="github-stats" className="section github-section">
      <div className="container animate-up">
        <h2 className="section-title">GitHub Stats</h2>
        
        {loading ? (
          <div className="skeleton-container">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        ) : stats && stats.login ? (
          <div className="github-content">
            <div className="github-profile-card">
              <img src={stats.avatar_url} alt="GitHub Avatar" className="github-avatar" />
              <h3>{stats.name || stats.login}</h3>
              <p>@{stats.login}</p>
              <div className="github-metrics">
                <div className="metric">
                  <span className="metric-value">{stats.public_repos}</span>
                  <span className="metric-label">Repositories</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{stats.followers}</span>
                  <span className="metric-label">Followers</span>
                </div>
              </div>
              <a href={stats.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-4">View Profile</a>
            </div>
            
            <div className="github-repos-container">
               <h3 className="repos-title">Recent Repositories</h3>
               <div className="repos-grid">
                 {repos.length > 0 ? repos.map(repo => (
                   <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-card">
                     <h4>{repo.name}</h4>
                     <p>{repo.description || "No description provided."}</p>
                     <div className="repo-meta">
                       {repo.language && <span className="repo-lang"><span className="lang-dot"></span>{repo.language}</span>}
                       <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                     </div>
                   </a>
                 )) : (
                   <p className="text-secondary">No public repositories found.</p>
                 )}
               </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Could not load GitHub stats.</p>
        )}
      </div>
    </section>
  );
};

export default GithubStats;
