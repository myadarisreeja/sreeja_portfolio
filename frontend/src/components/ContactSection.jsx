import { useState } from 'react';
import { Check, CheckCircle2, Copy, Download, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function ContactSection({ profile, onSubmitContact, resumeUrl }) {
  const [form, setForm] = useState({ senderName: '', senderEmail: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard blocked
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setFieldErrors({});
    try {
      const response = await onSubmitContact(form);
      setForm({ senderName: '', senderEmail: '', subject: '', message: '' });
      setStatus({
        type: 'success',
        text: response?.message || 'Thank you! Your inquiry has been stored in the database.',
      });
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setStatus({ type: 'error', text: err.message || 'Unable to send message.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">07 • Let&apos;s Build Together</span>
          <h2 className="section-title">
            Ready to bring <span className="gradient-text">energy &amp; engineering craft</span> to your team.
          </h2>
          <p className="section-subtitle">
            Reach out for Software Engineer, Java Spring Boot, or Full-Stack roles. Inquiries save directly to the backend database.
          </p>
        </div>

        <div className="contact-grid">
          <SpotlightCard className="glass-panel reveal">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
              Direct Channels
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.35rem' }}>
              Based in {profile.location}. Available for interviews and full-stack collaboration.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-item-left">
                  <Mail size={18} className="contact-item-icon" />
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Email</div>
                    <a href={`mailto:${profile.email}`} style={{ fontSize: '0.92rem', fontWeight: 500 }}>
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleCopy('email', profile.email)}
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-item-left">
                  <Phone size={18} className="contact-item-icon" />
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Phone</div>
                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} style={{ fontSize: '0.92rem', fontWeight: 500 }}>
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleCopy('phone', profile.phone)}
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-item-left">
                  <MapPin size={18} className="contact-item-icon" />
                  <div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Location</div>
                    <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-cta-row" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>
              <a
                href={resumeUrl}
                download="Sreeja_Myadari_Resume_SE.pdf"
                className="btn btn-primary btn-sm"
              >
                <Download size={15} />
                <span>Download PDF</span>
              </a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="glass-panel reveal" style={{ '--reveal-delay': '120ms' }}>
            <form className="form-stack" onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                Send a Message
              </h3>

              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="form-input"
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  placeholder="Your full name"
                  required
                />
                {fieldErrors.senderName && <span className="field-error">{fieldErrors.senderName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-input"
                  value={form.senderEmail}
                  onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
                  placeholder="you@company.com"
                  required
                />
                {fieldErrors.senderEmail && <span className="field-error">{fieldErrors.senderEmail}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  className="form-input"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Software Engineer Opportunity / Collaboration"
                  required
                />
                {fieldErrors.subject && <span className="field-error">{fieldErrors.subject}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role, team, or project..."
                  required
                />
                {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
              </div>

              {status && (
                <div className={`alert-banner ${status.type}`}>
                  {status.type === 'success' && <CheckCircle2 size={17} />}
                  <span>{status.text}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Send size={17} />
                <span>{submitting ? 'Persisting Message...' : 'Send Message'}</span>
              </button>
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
