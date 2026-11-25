import { useState } from 'react';
import { Check, Lock, Plus, Trash2, X } from 'lucide-react';
import { portfolioApi } from '../services/portfolioApi';

export default function AdminInboxModal({ isOpen, onClose, onPortfolioChanged }) {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    tagline: '',
    category: 'FULL_STACK',
    summary: '',
    techStackText: 'Java, Spring Boot, React',
    featured: false,
  });

  if (!isOpen) {
    return null;
  }

  const handleUnlock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await portfolioApi.getAdminMessages(adminKey);
      setMessages(data);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Invalid admin passkey');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const updated = await portfolioApi.markMessageRead(id, adminKey);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await portfolioApi.deleteMessage(id, adminKey);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const techStack = newProject.techStackText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await portfolioApi.createProject(
        {
          title: newProject.title,
          tagline: newProject.tagline,
          category: newProject.category,
          summary: newProject.summary,
          architectureNotes: 'Added dynamically through the Spring Boot Owner Console.',
          highlights: [newProject.tagline],
          techStack,
          repoUrl: 'https://github.com/myadarisreeja',
          liveUrl: null,
          featured: newProject.featured,
        },
        adminKey
      );

      setNewProject({
        title: '',
        tagline: '',
        category: 'FULL_STACK',
        summary: '',
        techStackText: 'Java, Spring Boot, React',
        featured: false,
      });
      await onPortfolioChanged();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="category-badge">Owner Admin Console</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginTop: '0.45rem' }}>
              Database Inbox &amp; Project Manager
            </h3>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close admin modal">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="alert-banner error" style={{ marginBottom: '1rem' }}>
            <span>{error}</span>
          </div>
        )}

        {!authenticated ? (
          <form className="form-stack" onSubmit={handleUnlock}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Enter your Spring Boot <code>portfolio.admin.key</code> (default dev key:{' '}
              <code>sreeja-admin-2026</code>) to view saved inquiries and add projects.
            </p>
            <div className="form-field">
              <label htmlFor="admin-key-input">Admin Passkey</label>
              <input
                id="admin-key-input"
                type="password"
                className="form-input"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin passkey"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Lock size={16} />
              <span>{loading ? 'Verifying...' : 'Unlock Inbox'}</span>
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                Contact Messages ({messages.length})
              </h4>
              {messages.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No contact messages stored yet.
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '0.85rem' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <strong>{msg.subject}</strong>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: msg.readStatus ? 'var(--accent-emerald)' : 'var(--accent-copper)' }}>
                          {msg.readStatus ? 'READ' : 'NEW'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        From {msg.senderName} ({msg.senderEmail})
                      </div>
                      <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{msg.message}</p>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {!msg.readStatus && (
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleMarkRead(msg.id)}>
                            <Check size={14} /> Mark Read
                          </button>
                        )}
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDeleteMessage(msg.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form className="form-stack" onSubmit={handleCreateProject} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)' }}>Add Project to Database</h4>
              <div className="form-field">
                <label htmlFor="proj-title">Title</label>
                <input
                  id="proj-title"
                  className="form-input"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="proj-tagline">Tagline</label>
                <input
                  id="proj-tagline"
                  className="form-input"
                  value={newProject.tagline}
                  onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="proj-cat">Category</label>
                <select
                  id="proj-cat"
                  className="form-select"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                >
                  <option value="FULL_STACK">Full Stack</option>
                  <option value="WEB_TOOL">Web Tool</option>
                  <option value="DATABASE">Database</option>
                  <option value="HARDWARE_IOT">Hardware / IoT</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="proj-tech">Tech Stack (comma-separated)</label>
                <input
                  id="proj-tech"
                  className="form-input"
                  value={newProject.techStackText}
                  onChange={(e) => setNewProject({ ...newProject, techStackText: e.target.value })}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="proj-summary">Summary</label>
                <textarea
                  id="proj-summary"
                  className="form-textarea"
                  style={{ minHeight: '85px' }}
                  value={newProject.summary}
                  onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={15} />
                <span>Save New Project</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
