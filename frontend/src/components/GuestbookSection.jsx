import { useState } from 'react';
import { CheckCircle2, MessageSquarePlus } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function GuestbookSection({ endorsements, onPostEndorsement }) {
  const [form, setForm] = useState({ authorName: '', authorRole: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setFieldErrors({});
    try {
      await onPostEndorsement(form);
      setForm({ authorName: '', authorRole: '', comment: '' });
      setStatus({ type: 'success', text: 'Guestbook note saved to the Spring Boot database!' });
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
      setStatus({ type: 'error', text: err.message || 'Could not post note.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-kicker">06 • Live Database Guestbook</span>
          <h2 className="section-title">
            Visitor <span className="gradient-text">Notes &amp; Feedback</span> — persisted via Spring Boot JPA.
          </h2>
        </div>

        <div className="guestbook-layout">
          <SpotlightCard className="glass-panel reveal">
            <form className="form-stack" onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                Sign the Guestbook
              </h3>

              <div className="form-field">
                <label htmlFor="gb-name">Your Name</label>
                <input
                  id="gb-name"
                  className="form-input"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  placeholder="e.g., Priya Sharma"
                  required
                />
                {fieldErrors.authorName && <span className="field-error">{fieldErrors.authorName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="gb-role">Role / Company</label>
                <input
                  id="gb-role"
                  className="form-input"
                  value={form.authorRole}
                  onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                  placeholder="e.g., Technical Recruiter"
                  required
                />
                {fieldErrors.authorRole && <span className="field-error">{fieldErrors.authorRole}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="gb-comment">Note</label>
                <textarea
                  id="gb-comment"
                  className="form-textarea"
                  style={{ minHeight: '95px' }}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Share feedback on the portfolio or architecture..."
                  required
                />
                {fieldErrors.comment && <span className="field-error">{fieldErrors.comment}</span>}
              </div>

              {status && (
                <div className={`alert-banner ${status.type}`}>
                  {status.type === 'success' && <CheckCircle2 size={17} />}
                  <span>{status.text}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <MessageSquarePlus size={17} />
                <span>{submitting ? 'Saving to DB...' : 'Post Guestbook Note'}</span>
              </button>
            </form>
          </SpotlightCard>

          <div className="endorsement-list">
            {endorsements.map((item, idx) => (
              <SpotlightCard
                key={item.id}
                className="endorsement-card reveal"
                style={{ '--reveal-delay': `${idx * 80}ms` }}
              >
                <p className="endorsement-quote">&ldquo;{item.comment}&rdquo;</p>
                <div className="endorsement-author">
                  <div>
                    <strong>{item.authorName}</strong> • {item.authorRole}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today'}
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
