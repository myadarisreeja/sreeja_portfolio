import { useState } from 'react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, apiStatus, resumeUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#timeline', label: 'Experience' },
    { href: '#guestbook', label: 'Guestbook' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="navbar-wrap">
      <div className="container">
        <nav className="navbar" aria-label="Primary navigation">
          <a href="#top" className="brand-mark">
            <span className="brand-badge">SM</span>
            <span>Sreeja Myadari</span>
          </a>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="api-status-pill" title="Live Java Spring Boot API connection">
              <span className={`status-dot ${apiStatus.online ? '' : 'offline'}`} />
              <span>{apiStatus.online ? `API UP • ${apiStatus.database}` : 'Preview Mode'}</span>
            </div>

            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href={resumeUrl}
              download="Sreeja_Myadari_Resume_SE.pdf"
              className="btn btn-primary btn-sm"
            >
              <Download size={15} />
              <span>Resume</span>
            </a>

            <button
              type="button"
              className="icon-btn mobile-menu-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
