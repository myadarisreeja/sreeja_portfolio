import { useState } from 'react';
import { ChevronRight, Database, Globe, Layers, Server, Sparkles, Terminal } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const ICON_MAP = {
  api: Globe,
  server: Server,
  layout: Layers,
  database: Database,
  terminal: Terminal,
};

export default function SkillsSection({ skillGroups }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeGroup = skillGroups[selectedIdx] || skillGroups[0];
  const ActiveIcon = ICON_MAP[activeGroup?.iconKey] || Layers;

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">03 • Engineering Constellation</span>
          <h2 className="section-title">
            Interactive <span className="gradient-text">capability matrix</span> across the stack.
          </h2>
          <p className="section-subtitle">
            Select a domain pillar to explore tools, frameworks, and depth served dynamically from Spring Boot.
          </p>
        </div>

        <div className="constellation-layout">
          <div className="pillar-list reveal" style={{ '--reveal-delay': '60ms' }}>
            {skillGroups.map((group, idx) => {
              const Icon = ICON_MAP[group.iconKey] || Layers;
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={group.id || group.category}
                  type="button"
                  className={`pillar-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        display: 'grid',
                        placeItems: 'center',
                        background: isActive ? 'var(--accent-copper)' : 'var(--bg-elevated)',
                        color: isActive ? '#fff' : 'var(--accent-copper)',
                        transition: 'all 200ms ease',
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.02rem' }}>
                        {group.category}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {group.skills.length} capabilities • {group.proficiency}%
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{
                      color: isActive ? 'var(--accent-copper)' : 'var(--text-muted)',
                      transform: isActive ? 'translateX(3px)' : 'none',
                      transition: 'transform 200ms ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {activeGroup && (
            <SpotlightCard className="pillar-stage reveal" style={{ '--reveal-delay': '140ms' }} tilt>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'var(--accent-indigo-soft)',
                      color: 'var(--accent-indigo)',
                    }}
                  >
                    <ActiveIcon size={24} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                      SELECTED PILLAR
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem' }}>
                      {activeGroup.category}
                    </h3>
                  </div>
                </div>
                <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>
                  {activeGroup.proficiency}%
                </span>
              </div>

              <div className="progress-track" style={{ marginBottom: '1.4rem' }}>
                <div className="progress-fill" style={{ width: `${activeGroup.proficiency}%` }} />
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {activeGroup.description}
              </p>

              <div style={{ marginBottom: '0.65rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                CORE STACK &amp; TECHNIQUES
              </div>
              <div className="chip-cloud">
                {activeGroup.skills.map((skill) => (
                  <span key={skill} className="tag-chip accent">
                    <Sparkles size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          )}
        </div>
      </div>
    </section>
  );
}
