import { useState } from 'react';
import { Code2, Cpu, Database, Globe, Palette, Server, ShieldCheck, Sparkles } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const ARCH_STAGES = [
  {
    step: '01',
    label: 'React UI',
    icon: Globe,
    title: 'Responsive React Client & Optimistic UX',
    detail:
      'I build modular React components with bespoke CSS3 tokens, accessible semantics, and immediate state feedback so every interaction feels responsive.',
    pattern: 'fetch("/api/projects/1/like", { method: "POST" })',
  },
  {
    step: '02',
    label: 'REST Gateway',
    icon: Server,
    title: 'Clean API Contracts & Validation',
    detail:
      'Controllers stay thin and predictable using Java 21 DTO records, Jakarta Bean Validation (@Valid), and HTTP status discipline.',
    pattern: '@PostMapping("/contact") -> 201 Created | 400 ApiErrorResponse',
  },
  {
    step: '03',
    label: 'Service Layer',
    icon: Cpu,
    title: 'Transactional Business Logic',
    detail:
      'Domain rules live inside @Service boundaries with @Transactional safety and centralized @RestControllerAdvice exception mapping.',
    pattern: '@Transactional public Project incrementProjectLike(Long id)',
  },
  {
    step: '04',
    label: 'JPA / ORM',
    icon: Code2,
    title: 'Hibernate Object-Relational Mapping',
    detail:
      'Normalized entities and Spring Data JPA repositories eliminate boilerplate SQL while preserving clean schema control.',
    pattern: 'JpaRepository<Project, Long> • findByCategoryOrderByDisplayOrderAsc()',
  },
  {
    step: '05',
    label: 'SQL Database',
    icon: Database,
    title: 'Relational Data Integrity',
    detail:
      'Whether running MySQL, Oracle SQL, or embedded H2, I enforce referential constraints and clean indexing for reliable persistence.',
    pattern: 'H2 Persistent File DB  ⇄  MySQL 8 Profile',
  },
];

const MANDALA_PALETTES = [
  { name: 'Solar Copper', color: '#ff8a4c', rings: 12 },
  { name: 'Electric Violet', color: '#8b7bff', rings: 16 },
  { name: 'Aurora Cyan', color: '#22d3ee', rings: 8 },
];

export default function AboutSection({ profile }) {
  const [activeStage, setActiveStage] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(0);

  const stage = ARCH_STAGES[activeStage];
  const palette = MANDALA_PALETTES[paletteIdx];
  const petals = Array.from({ length: palette.rings }, (_, i) => (360 / palette.rings) * i);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">02 • Design Thinking &amp; Architecture</span>
          <h2 className="section-title">
            How I think through <span className="gradient-text">systems, symmetry &amp; craft</span>.
          </h2>
          <p className="section-subtitle">
            Instead of reading a static bio, click through the live architecture pipeline powering this
            very portfolio — and explore how my Mandala art discipline shapes my code structure.
          </p>
        </div>

        <div className="arch-studio-grid">
          <SpotlightCard className="arch-flow-panel reveal" style={{ '--reveal-delay': '80ms' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}>
                  Interactive Request-to-Database Pipeline
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Select any layer to inspect my engineering design pattern
                </p>
              </div>
              <span className="tag-chip accent">
                <ShieldCheck size={14} /> API-First Mindset
              </span>
            </div>

            <div className="flow-nodes" role="tablist" aria-label="Architecture pipeline layers">
              {ARCH_STAGES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.step}
                    type="button"
                    role="tab"
                    aria-selected={activeStage === idx}
                    className={`flow-node ${activeStage === idx ? 'active' : ''}`}
                    onClick={() => setActiveStage(idx)}
                  >
                    <span className="flow-node-step">{item.step}</span>
                    <Icon size={20} style={{ color: activeStage === idx ? 'var(--accent-copper)' : 'var(--text-secondary)' }} />
                    <span className="flow-node-label">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flow-detail-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.12rem' }}>
                  {stage.step}. {stage.title}
                </h4>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-cyan)' }}>
                  LIVE PATTERN
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '0.85rem' }}>
                {stage.detail}
              </p>
              <code
                style={{
                  display: 'block',
                  padding: '0.65rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0,0,0,0.28)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--accent-copper)',
                }}
              >
                {stage.pattern}
              </code>
            </div>

            <div className="chip-cloud">
              {profile.strengths.map((strength) => (
                <span key={strength} className="tag-chip">
                  <Sparkles size={13} style={{ color: 'var(--accent-copper)' }} />
                  {strength}
                </span>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="mandala-studio-card reveal" style={{ '--reveal-delay': '180ms' }}>
            <div>
              <span className="section-kicker" style={{ marginBottom: '0.35rem' }}>Creative Signature</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                Mandala Geometry Studio
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Mandala art teaches balance, modular repetition, and patience — the same traits I bring to
                UI craftsmanship and clean code. Click the canvas to morph geometry:
              </p>
            </div>

            <div
              className="mandala-interactive-box"
              onClick={() => setPaletteIdx((prev) => (prev + 1) % MANDALA_PALETTES.length)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPaletteIdx((prev) => (prev + 1) % MANDALA_PALETTES.length);
                }
              }}
              title="Click to cycle Mandala geometry and aura"
            >
              <svg
                className="mandala-interactive-svg"
                viewBox="0 0 240 240"
                fill="none"
                style={{ color: palette.color }}
              >
                <circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="120" cy="120" r="78" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="120" cy="120" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                {petals.map((angle) => (
                  <g key={angle} transform={`rotate(${angle} 120 120)`}>
                    <path
                      d="M120 18 C134 46, 134 68, 120 94 C106 68, 106 46, 120 18 Z"
                      stroke="currentColor"
                      strokeWidth="1.05"
                      fill={`${palette.color}18`}
                    />
                    <circle cx="120" cy="30" r="2.3" fill="currentColor" />
                  </g>
                ))}
                <circle cx="120" cy="120" r="12" fill={palette.color} fillOpacity="0.35" stroke="currentColor" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
              <span className="tag-chip accent">
                <Palette size={13} /> {palette.name} • {palette.rings} Petals
              </span>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                Click to morph ↻
              </span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
