import React, { useState } from 'react';
import { Search, Clock, Eye } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Power BI for Sales Analytics",
      category: "Data Analysis",
      readTime: "5 min read",
      views: 120,
      date: "May 5, 2026",
      excerpt: "Learn how to build interactive dashboards that provide actionable insights for business sales."
    },
    {
      id: 2,
      title: "Building RESTful APIs with Node & Express",
      category: "Backend",
      readTime: "7 min read",
      views: 85,
      date: "May 1, 2026",
      excerpt: "A comprehensive guide to structuring your Express applications and connecting to MongoDB."
    },
    {
      id: 3,
      title: "Machine Learning: Predicting Student Placements",
      category: "Data Science",
      readTime: "6 min read",
      views: 200,
      date: "Apr 20, 2026",
      excerpt: "How I built a predictive model using Python, NumPy, and Pandas to forecast placement probabilities."
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="blog" className="section blog-section">
      <div className="container animate-up">
        <h2 className="section-title">Blog & Articles</h2>
        
        <div className="blog-search-container">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles by title or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={post.id} className="blog-card animate-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="blog-category">{post.category}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span className="meta-item"><Clock size={16} /> {post.readTime}</span>
                  <span className="meta-item"><Eye size={16} /> {post.views} views</span>
                  <span className="meta-item date">{post.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No articles found matching "{searchTerm}"</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
