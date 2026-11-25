const CHAPTERS = [
  { id: 'top', code: '01', label: 'Intro' },
  { id: 'about', code: '02', label: 'Thinking' },
  { id: 'skills', code: '03', label: 'Craft' },
  { id: 'projects', code: '04', label: 'Systems' },
  { id: 'timeline', code: '05', label: 'Journey' },
  { id: 'contact', code: '06', label: 'Connect' },
];

export default function ChapterRail({ activeSection }) {
  return (
    <aside className="chapter-rail" aria-label="Portfolio story chapters">
      {CHAPTERS.map((ch) => {
        const isActive = activeSection === ch.id || (ch.id === 'contact' && activeSection === 'guestbook');
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            className={`chapter-dot ${isActive ? 'active' : ''}`}
            title={`${ch.code} — ${ch.label}`}
          >
            <span className="dot-pip" />
            <span>{ch.code}</span>
          </a>
        );
      })}
    </aside>
  );
}
