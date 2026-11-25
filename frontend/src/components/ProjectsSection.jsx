import { useMemo, useState } from 'react';
import { Cpu, ExternalLink, Github, Heart, Layers, X } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const CATEGORY_TABS = [
  { key: 'ALL', label: 'All Systems' },
  { key: 'FULL_STACK', label: 'Full Stack' },
  { key: 'WEB_TOOL', label: 'Web & Tools' },
  { key: 'DATABASE', label: 'SQL & Database' },
  { key: 'HARDWARE_IOT', label: 'Hardware / IoT' },
];

const CATEGORY_LABELS = {
  FULL_STACK: 'Full Stack',
  WEB_TOOL: 'Web Tool',
  DATABASE: 'Database',
  HARDWARE_IOT: 'Hardware / IoT',
};

function ProjectVisualPreview({ category }) {
  if (category === 'FULL_STACK') {
    return (
      <svg viewBox="0 0 280 86" fill="none" style={{ width: '100%', height: '82px' }} aria-hidden="true">
        <rect x="6" y="16" width="66" height="52" rx="10" stroke="var(--accent-cyan)" strokeOpacity="0.65" fill="rgba(34,211,238,0.08)" />
        <text x="39" y="46" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="JetBrains Mono">React UI</text>
        <path d="M74 42 H104" stroke="var(--accent-copper)" strokeWidth="1.8" strokeDasharray="4 3" />
        <rect x="106" y="10" width="76" height="64" rx="12" stroke="var(--accent-copper)" strokeOpacity="0.85" fill="rgba(255,138,76,0.12)" />
        <text x="144" y="39" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="JetBrains Mono">Spring Boot</text>
        <text x="144" y="54" textAnchor="middle" fill="var(--accent-copper)" fontSize="8.5" fontFamily="JetBrains Mono">REST + RBAC</text>
        <path d="M184 42 H212" stroke="var(--accent-indigo)" strokeWidth="1.8" strokeDasharray="4 3" />
        <rect x="214" y="16" width="60" height="52" rx="10" stroke="var(--accent-indigo)" strokeOpacity="0.7" fill="rgba(139,123,255,0.1)" />
        <text x="244" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontFamily="JetBrains Mono">Gemini</text>
        <text x="244" y="52" textAnchor="middle" fill="var(--accent-indigo)" fontSize="8.5" fontFamily="JetBrains Mono">+ MySQL</text>
      </svg>
    );
  }

  if (category === 'WEB_TOOL') {
    return (
      <svg viewBox="0 0 280 86" fill="none" style={{ width: '100%', height: '82px' }} aria-hidden="true">
        <circle cx="52" cy="43" r="28" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
        <circle cx="52" cy="43" r="28" stroke="var(--accent-emerald)" strokeWidth="6" strokeDasharray="140 176" strokeLinecap="round" />
        <text x="52" y="47" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">88%</text>
        <rect x="102" y="18" width="166" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="102" y="18" width="132" height="12" rx="6" fill="var(--accent-copper)" />
        <rect x="102" y="38" width="166" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="102" y="38" width="108" height="12" rx="6" fill="var(--accent-indigo)" />
        <rect x="102" y="58" width="166" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="102" y="58" width="146" height="12" rx="6" fill="var(--accent-cyan)" />
      </svg>
    );
  }

  if (category === 'DATABASE') {
    return (
      <svg viewBox="0 0 280 86" fill="none" style={{ width: '100%', height: '82px' }} aria-hidden="true">
        <rect x="12" y="16" width="70" height="52" rx="8" stroke="var(--accent-indigo)" fill="rgba(139,123,255,0.1)" />
        <text x="47" y="37" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontFamily="JetBrains Mono">BOOKS</text>
        <text x="47" y="52" textAnchor="middle" fill="var(--accent-cyan)" fontSize="8" fontFamily="JetBrains Mono">PK book_id</text>
        <path d="M84 42 H108" stroke="var(--accent-copper)" strokeWidth="1.6" />
        <rect x="108" y="12" width="76" height="60" rx="8" stroke="var(--accent-copper)" fill="rgba(255,138,76,0.12)" />
        <text x="146" y="34" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontFamily="JetBrains Mono">ISSUES</text>
        <text x="146" y="49" textAnchor="middle" fill="var(--accent-copper)" fontSize="8" fontFamily="JetBrains Mono">FK 3NF TX</text>
        <path d="M186 42 H208" stroke="var(--accent-copper)" strokeWidth="1.6" />
        <rect x="208" y="16" width="64" height="52" rx="8" stroke="var(--accent-emerald)" fill="rgba(52,211,153,0.1)" />
        <text x="240" y="37" textAnchor="middle" fill="var(--text-primary)" fontSize="9.5" fontFamily="JetBrains Mono">MEMBERS</text>
        <text x="240" y="52" textAnchor="middle" fill="var(--accent-emerald)" fontSize="8" fontFamily="JetBrains Mono">PK usr_id</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 86" fill="none" style={{ width: '100%', height: '82px' }} aria-hidden="true">
      <path
        d="M8 52 H58 L72 24 L92 66 L112 20 L132 58 L148 44 H205 L220 26 L238 60 L254 44 H272"
        stroke="var(--accent-cyan)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="112" cy="20" r="4.5" fill="var(--accent-copper)" />
      <circle cx="220" cy="26" r="4.5" fill="var(--accent-indigo)" />
    </svg>
  );
}

export default function ProjectsSection({ projects, onLikeProject, likedIds }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') {
      return projects;
    }
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">04 • Case Studies &amp; Systems</span>
          <h2 className="section-title">
            Production patterns, <span className="gradient-text">system visuals</span> &amp; embedded labs.
          </h2>
          <p className="section-subtitle">
            Each card maps the system architecture visually. Filter by domain, inspect deep design
            notes, or send a live appreciation pulse saved to the database.
          </p>
        </div>

        <div className="filter-bar reveal" role="tablist" aria-label="Filter projects by category">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeCategory === tab.key}
              className={`filter-pill ${activeCategory === tab.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => {
            const isLiked = likedIds.includes(project.id);
            return (
              <SpotlightCard
                key={project.id}
                tilt
                className="project-card reveal"
                style={{ '--reveal-delay': `${Math.min(idx * 80, 320)}ms` }}
              >
                <div className="project-visual-stage">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="category-badge">
                      {CATEGORY_LABELS[project.category] || project.category}
                    </span>
                    {project.featured && <span className="featured-badge">★ FLAGSHIP</span>}
                  </div>
                  <ProjectVisualPreview category={project.category} />
                </div>

                <div className="project-body">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-tagline">{project.tagline}</p>
                  </div>

                  <p className="project-summary">{project.summary}</p>

                  {project.highlights?.length > 0 && (
                    <ul className="project-highlights">
                      {project.highlights.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="chip-cloud" style={{ marginTop: '0.2rem' }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <button
                      type="button"
                      className={`like-btn ${isLiked ? 'liked' : ''}`}
                      onClick={() => onLikeProject(project.id)}
                      title="Appreciate this project (saved to database)"
                    >
                      <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>{project.likesCount}</span>
                    </button>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Layers size={14} />
                        <span>Case Study</span>
                      </button>

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="icon-btn"
                          aria-label={`View ${project.title} on GitHub`}
                          title="GitHub Profile"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="category-badge">
                  {CATEGORY_LABELS[selectedProject.category] || selectedProject.category}
                </span>
                <h3
                  id="project-modal-title"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.65rem', marginTop: '0.55rem' }}
                >
                  {selectedProject.title}
                </h3>
                <p style={{ color: 'var(--accent-copper)', fontSize: '0.94rem' }}>
                  {selectedProject.tagline}
                </p>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.25rem',
              }}
            >
              <ProjectVisualPreview category={selectedProject.category} />
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {selectedProject.summary}
            </p>

            {selectedProject.architectureNotes && (
              <div
                style={{
                  padding: '1rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--accent-indigo)',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.4rem',
                  }}
                >
                  <Cpu size={14} /> ARCHITECTURE &amp; DESIGN NOTES
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {selectedProject.architectureNotes}
                </p>
              </div>
            )}

            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '0.6rem' }}>
              Key Implementation Highlights
            </h4>
            <ul className="project-highlights" style={{ marginBottom: '1.25rem' }}>
              {selectedProject.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <div className="chip-cloud" style={{ marginBottom: '1.5rem' }}>
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="tag-chip accent">
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <ExternalLink size={15} />
                  <span>Open GitHub</span>
                </a>
              )}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
