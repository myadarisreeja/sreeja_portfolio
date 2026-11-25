import { Award, Briefcase, GraduationCap } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

function TimelineCard({ item, variant = 'copper', delay = 0 }) {
  return (
    <SpotlightCard
      className={`timeline-card reveal ${variant === 'indigo' ? 'indigo' : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <div className="timeline-meta">
        <span>{item.period}</span>
        {item.badgeMetric && <span className="timeline-metric">{item.badgeMetric}</span>}
      </div>
      <h4>{item.title}</h4>
      <div className="timeline-org">{item.organization}</div>
      {item.highlights?.length > 0 && (
        <ul className="project-highlights">
          {item.highlights.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      )}
    </SpotlightCard>
  );
}

export default function TimelineSection({ experiences, education, certifications }) {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">05 • Journey &amp; Credentials</span>
          <h2 className="section-title">
            From <span className="gradient-text">academic distinction</span> to agile software delivery.
          </h2>
        </div>

        <div className="timeline-grid">
          <div className="timeline-column">
            <h3 className="timeline-heading">
              <Briefcase size={20} style={{ color: 'var(--accent-copper)' }} />
              <span>Internship &amp; Experience</span>
            </h3>
            {experiences.map((item, idx) => (
              <TimelineCard key={item.id || item.title} item={item} variant="copper" delay={idx * 90} />
            ))}

            <h3 className="timeline-heading" style={{ marginTop: '1rem' }}>
              <Award size={20} style={{ color: 'var(--accent-indigo)' }} />
              <span>Verified Certifications</span>
            </h3>
            {certifications.map((item, idx) => (
              <TimelineCard key={item.id || item.title} item={item} variant="indigo" delay={(idx + 1) * 90} />
            ))}
          </div>

          <div className="timeline-column">
            <h3 className="timeline-heading">
              <GraduationCap size={20} style={{ color: 'var(--accent-copper)' }} />
              <span>Education</span>
            </h3>
            {education.map((item, idx) => (
              <TimelineCard key={item.id || item.title} item={item} variant="copper" delay={idx * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
