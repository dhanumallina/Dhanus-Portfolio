import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert, Users, Mail, FileText, Plus, Trash2, Edit, RotateCcw, Check, X, ExternalLink, LogOut, Loader2 } from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('visitors');

  // Dashboard Data
  const [visitors, setVisitors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  // CMS Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    image: '',
    githubLink: '',
    liveDemo: '',
    status: 'Real'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Persistent login
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${password}`
      }
    };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`${apiBaseUrl}/api/visitors`, {
      headers: { Authorization: `Bearer ${password}` }
    })
      .then(() => {
        setIsAuthenticated(true);
        localStorage.setItem('adminPassword', password);
        setError('');
      })
      .catch((err) => {
        alert('Authentication failed: Incorrect password or Server error');
        localStorage.removeItem('adminPassword');
      });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    localStorage.removeItem('adminPassword');
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'visitors') {
        const res = await axios.get(`${apiBaseUrl}/api/visitors`, getHeaders());
        setVisitors(res.data.visitors || []);
      } else if (activeTab === 'messages') {
        const res = await axios.get(`${apiBaseUrl}/api/contact`, getHeaders());
        setMessages(res.data.messages || []);
      } else if (activeTab === 'projects') {
        const res = await axios.get(`${apiBaseUrl}/api/projects`);
        setProjects(res.data || []);
      }
    } catch (err) {
      setError('Failed to fetch data. Verify password or check server connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Visitor Management
  const handleDeleteVisitor = async (id) => {
    if (!window.confirm('Delete this visitor?')) return;
    try {
      await axios.delete(`${apiBaseUrl}/api/visitors/${id}`, getHeaders());
      setVisitors(visitors.filter(v => v._id !== id));
    } catch (err) {
      alert('Failed to delete visitor');
    }
  };

  // Message Management
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${apiBaseUrl}/api/contact/${id}`, getHeaders());
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  // Project CMS Operations
  const handleOpenAddForm = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      description: '',
      techStack: '',
      image: '',
      githubLink: '',
      liveDemo: '',
      status: 'Real'
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (proj) => {
    setEditingProjectId(proj._id);
    setFormData({
      title: proj.title,
      description: proj.description,
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack,
      image: proj.image || '',
      githubLink: proj.githubLink || '',
      liveDemo: proj.liveDemo || '',
      status: proj.status || 'Real'
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProjectId) {
        const res = await axios.put(`${apiBaseUrl}/api/projects/${editingProjectId}`, formData, getHeaders());
        if (res.data.success) {
          setIsFormOpen(false);
          fetchData();
        }
      } else {
        const res = await axios.post(`${apiBaseUrl}/api/projects`, formData, getHeaders());
        if (res.data.success) {
          setIsFormOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      alert('Error saving project. Verify connection and authorization.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${apiBaseUrl}/api/projects/${id}`, getHeaders());
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleSeedProjects = async () => {
    if (!window.confirm('Reset database and seed default projects? This deletes custom projects!')) return;
    try {
      setLoading(true);
      await axios.post(`${apiBaseUrl}/api/projects/seed`, {}, getHeaders());
      fetchData();
      alert('Projects seeded successfully!');
    } catch (err) {
      alert('Failed to seed projects');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container animate-fade-in">
        <div className="admin-login-card">
          <ShieldAlert size={40} className="admin-icon" />
          <h2>Admin Dashboard</h2>
          <p>Restricted Access</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade-in">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>MD. Admin</h2>
          <button className="logout-btn" onClick={handleLogout} title="Log Out"><LogOut size={18} /></button>
        </div>
        <ul>
          <li className={activeTab === 'visitors' ? 'active' : ''} onClick={() => setActiveTab('visitors')}>
            <Users size={20} /> Visitors
          </li>
          <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
            <Mail size={20} /> Messages
          </li>
          <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
            <FileText size={20} /> Projects CMS
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <div className="admin-content-header">
          <h3>
            {activeTab === 'visitors' && 'Visitor Tracking'}
            {activeTab === 'messages' && 'Messages & Inquiries'}
            {activeTab === 'projects' && 'Projects CMS'}
          </h3>
          {activeTab === 'projects' && (
            <div className="cms-actions">
              <button className="btn btn-secondary flex-center" onClick={handleSeedProjects}>
                <RotateCcw size={16} /> Reset Default Projects
              </button>
              <button className="btn btn-primary flex-center" onClick={handleOpenAddForm}>
                <Plus size={16} /> Add Project
              </button>
            </div>
          )}
        </div>

        {error && <div className="error-alert">{error}</div>}

        {loading ? (
          <div className="loading-spinner">
            <Loader2 className="spinner" size={40} />
            <p>Fetching data from server...</p>
          </div>
        ) : (
          <div className="admin-tab-content">
            {activeTab === 'visitors' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Country</th>
                      <th>Device</th>
                      <th>Resume Viewed</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.length > 0 ? visitors.map((visitor) => (
                      <tr key={visitor._id}>
                        <td className="fw-semibold">{visitor.email}</td>
                        <td>
                          <span className={`badge-type ${visitor.type.toLowerCase()}`}>
                            {visitor.type}
                          </span>
                        </td>
                        <td>{visitor.country || 'Unknown'}</td>
                        <td className="device-cell" title={visitor.device}>
                          {visitor.device ? (visitor.device.includes('Mobi') ? 'Mobile' : 'Desktop') : 'Unknown'}
                        </td>
                        <td>
                          {visitor.resumeViewed ? (
                            <span className="badge-status success"><Check size={14} /> Yes</span>
                          ) : (
                            <span className="badge-status secondary"><X size={14} /> No</span>
                          )}
                        </td>
                        <td>{new Date(visitor.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="action-icon delete" onClick={() => handleDeleteVisitor(visitor._id)} title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="text-center">No visitors tracked yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="messages-grid">
                {messages.length > 0 ? messages.map((message) => (
                  <div key={message._id} className="message-card animate-fade-in">
                    <div className="message-card-header">
                      <div>
                        <h4>{message.name}</h4>
                        <a href={`mailto:${message.email}`} className="text-highlight font-sm">{message.email}</a>
                      </div>
                      <span className="font-sm text-secondary">{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="message-body">
                      <p>"{message.message}"</p>
                    </div>
                    <div className="message-footer">
                      <a href={`mailto:${message.email}?subject=Re: Portfolio Contact Inquiry`} className="btn btn-secondary btn-sm flex-center">
                        <Mail size={14} /> Reply
                      </a>
                      <button className="btn btn-danger-outline btn-sm flex-center" onClick={() => handleDeleteMessage(message._id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center full-width text-secondary padding-lg">No contact messages received yet.</div>
                )}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Tech Stack</th>
                      <th>Status</th>
                      <th>Links</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length > 0 ? projects.map((project) => (
                      <tr key={project._id}>
                        <td>
                          {project.image ? (
                            <img src={project.image} alt={project.title} className="table-project-img" />
                          ) : (
                            <span className="text-secondary">-</span>
                          )}
                        </td>
                        <td className="fw-semibold">{project.title}</td>
                        <td>
                          <div className="tech-tags-list">
                            {project.techStack.map((tech, idx) => (
                              <span key={idx} className="tech-tag-sm">{tech}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className={`badge-status ${project.status === 'Real' ? 'success' : 'warning'}`}>
                            {project.status}
                          </span>
                        </td>
                        <td>
                          <div className="links-row">
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noreferrer" title="GitHub Code"><FileText size={16} /></a>
                            )}
                            {project.liveDemo && (
                              <a href={project.liveDemo} target="_blank" rel="noreferrer" title="Live Demo"><ExternalLink size={16} /></a>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="actions-row">
                            <button className="action-icon edit" onClick={() => handleOpenEditForm(project)} title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className="action-icon delete" onClick={() => handleDeleteProject(project._id)} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="text-center">No projects found. Try resetting default projects.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {isFormOpen && (
        <div className="modal-backdrop">
          <div className="modal-content animate-slide-up">
            <div className="modal-header">
              <h3>{editingProjectId ? 'Edit Project' : 'Add Project'}</h3>
              <button className="close-btn" onClick={() => setIsFormOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="cms-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                  placeholder="Business Analytics Dashboard"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  required 
                  placeholder="Interactive dashboard providing actionable insights..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Tech Stack (Comma-separated)</label>
                <input 
                  type="text" 
                  value={formData.techStack} 
                  onChange={(e) => setFormData({...formData, techStack: e.target.value})} 
                  placeholder="React, Node.js, Power BI"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                  placeholder="/images/sales_dashboard.png or https://..."
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>GitHub Link</label>
                  <input 
                    type="url" 
                    value={formData.githubLink} 
                    onChange={(e) => setFormData({...formData, githubLink: e.target.value})} 
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="form-group">
                  <label>Live Demo URL</label>
                  <input 
                    type="url" 
                    value={formData.liveDemo} 
                    onChange={(e) => setFormData({...formData, liveDemo: e.target.value})} 
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Real">Real / Live</option>
                  <option value="Coming Soon">Coming Soon / In Progress</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
