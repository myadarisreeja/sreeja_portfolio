import { useEffect, useState } from 'react';
import { ArrowRight, Check, Copy, Database, Github, Linkedin, Mail, Play, Server, Sparkles, Terminal } from 'lucide-react';
import MandalaEmblem from './MandalaEmblem';
import { portfolioApi } from '../services/portfolioApi';

const KINETIC_PHRASES = [
  'Architecting Java 21 & Spring Boot REST APIs',
  'Crafting Fast, Responsive React Interfaces',
  'Modeling Normalized MySQL & Oracle SQL Schemas',
  'Connecting AI Workflows with Gemini & Microservices',
];

const MARQUEE_ITEMS = [
  'Java 21',
  'Spring Boot 3',
  'RESTful API Design',
  'Hibernate / JPA',
  'React.js',
  'MySQL',
  'Oracle SQL',
  'Servlets & JDBC',
  'Postman Testing',
  'JavaScript ES6+',
  'HTML5 & CSS3',
  'Selenium QA',
  'Git & GitHub',
];

export default function HeroSection({ profile, apiHealth, projectsCount, online }) {
  const [activeTab, setActiveTab] = useState('health');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [latencyMs, setLatencyMs] = useState(online ? 14 : null);
  const [runningPing, setRunningPing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % KINETIC_PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      // Clipboard blocked in restricted browser contexts
    }
  };

  const handleLivePing = async () => {
    setRunningPing(true);
    const start = performance.now();
    try {
      await portfolioApi.getHealth();
      setLatencyMs(Math.max(1, Math.round(performance.now() - start)));
    } catch {
      setLatencyMs(null);
    } finally {
      setRunningPing(false);
    }
  };

  const endpointPayloads = {
    health: {
      endpoint: 'GET /api/health',
      json: JSON.stringify(
        {
          status: apiHealth?.status || 'UP',
          service: 'sreeja-portfolio-api',
          javaVersion: apiHealth?.javaVersion || '21.0.10',
          database: apiHealth?.database || 'H2 / MySQL Ready',
          projectsSeeded: apiHealth?.projectsCount ?? projectsCount,
          responseTime: latencyMs ? `${latencyMs} ms` : 'Preview Mode',
        },
        null,
        2
      ),
    },
    profile: {
      endpoint: 'GET /api/portfolio',
      json: JSON.stringify(
        {
          engineer: profile.fullName,
          craft: ['API-First Architecture', 'Spring Boot', 'React 19', 'CSS3 Motion'],
          location: profile.location,
          highlights: ['B.Tech 8.85 CGPA', 'JSpiders Full Stack Intern', 'AI Mock Interview Platform'],
        },
        null,
        2
      ),
    },
  };

  const currentPayload = endpointPayloads[activeTab];

  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="availability-chip">
              <Sparkles size={14} />
              <span>Software Engineer • Available for Full-Stack &amp; Backend Roles</span>
            </div>

            <div className="hero-eyebrow">// SREEJA MYADARI — SOFTWARE ENGINEER</div>

            <h1 className="hero-title">
              Building <span className="gradient-text">Scalable APIs</span> &amp;{' '}
              <span className="gradient-text">Full-Stack Systems</span>.
            </h1>

            <div key={phraseIndex} className="kinetic-phrase">
              <Terminal size={15} />
              <span>{KINETIC_PHRASES[phraseIndex]}</span>
            </div>

            <p className="hero-lead">
              I design and build end-to-end applications where resilient{' '}
              <strong>Java Spring Boot</strong> services, clean <strong>SQL</strong> schemas, and
              responsive <strong>React</strong> interfaces work seamlessly together.
            </p>

            <div className="hero-cta-row">
              <a href="#projects" className="btn btn-primary">
                <span>Launch Case Studies</span>
                <ArrowRight size={17} />
              </a>
              <a href="#about" className="btn btn-secondary">
                <span>See How I Think</span>
              </a>
            </div>

            <div className="hero-socials">
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="social-pill">
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="social-pill">
                <Github size={15} />
                <span>GitHub</span>
              </a>
              <button type="button" className="social-pill" onClick={handleCopyEmail}>
                {copiedEmail ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedEmail ? 'Copied to Clipboard!' : profile.email}</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <MandalaEmblem />
            <div className="api-console-card">
              <div className="console-header">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="console-endpoint">{currentPayload.endpoint}</span>
              </div>

              <div className="console-controls">
                <div className="console-tabs" role="tablist" aria-label="API Inspector Tabs">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'health'}
                    className={`console-tab ${activeTab === 'health' ? 'active' : ''}`}
                    onClick={() => setActiveTab('health')}
                  >
                    /api/health
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'profile'}
                    className={`console-tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    /api/portfolio
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleLivePing}
                  disabled={runningPing}
                  title="Ping Spring Boot backend live"
                >
                  <Play size={12} />
                  <span>{runningPing ? 'Pinging...' : 'Run Live'}</span>
                </button>
              </div>

              <div className="console-body">
                <pre>{currentPayload.json}</pre>
              </div>

              <div className="console-footer">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Server size={13} /> Spring Boot 3.4
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-emerald)' }}>
                  <Database size={13} /> {latencyMs ? `200 OK • ${latencyMs}ms` : 'JPA + H2 / MySQL'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="marquee-wrap" aria-label="Core engineering stack">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span key={idx} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
