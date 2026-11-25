import { useCallback, useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import Navbar from './components/Navbar';
import CinematicCanvas from './components/CinematicCanvas';
import ChapterRail from './components/ChapterRail';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TimelineSection from './components/TimelineSection';
import GuestbookSection from './components/GuestbookSection';
import ContactSection from './components/ContactSection';
import AdminInboxModal from './components/AdminInboxModal';
import { useScrollChoreography } from './hooks/useScrollReveal';
import { portfolioApi } from './services/portfolioApi';
import { fallbackPortfolio } from './data/fallbackPortfolio';

const SECTION_IDS = ['top', 'about', 'skills', 'projects', 'timeline', 'guestbook', 'contact'];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio_theme') || 'dark');
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [apiStatus, setApiStatus] = useState({ online: false, database: 'Preview' });
  const [apiHealth, setApiHealth] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);

  const { scrollProgress, activeSection } = useScrollChoreography(SECTION_IDS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const loadPortfolio = useCallback(async () => {
    if (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL) {
      setApiStatus({ online: false, database: 'Static Preview' });
      return;
    }
    try {
      const [data, health] = await Promise.all([
        portfolioApi.getPortfolio(),
        portfolioApi.getHealth(),
      ]);
      if (data?.profile && Array.isArray(data?.projects)) {
        setPortfolio(data);
        setApiHealth(health);
        setApiStatus({
          online: true,
          database: health?.database || 'H2',
        });
      }
    } catch {
      setApiStatus({ online: false, database: 'Offline' });
    }
  }, []);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const handleLikeProject = async (projectId) => {
    if (apiStatus.online) {
      try {
        const updated = await portfolioApi.likeProject(projectId);
        setPortfolio((prev) => ({
          ...prev,
          projects: prev.projects.map((p) => (p.id === projectId ? updated : p)),
        }));
        setLikedIds((prev) => (prev.includes(projectId) ? prev : [...prev, projectId]));
        return;
      } catch {
        // Fallback to optimistic UI below if request fails
      }
    }

    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, likesCount: p.likesCount + 1 } : p
      ),
    }));
    setLikedIds((prev) => (prev.includes(projectId) ? prev : [...prev, projectId]));
  };

  const handlePostEndorsement = async (payload) => {
    if (!apiStatus.online) {
      throw new Error('Start the Java Spring Boot backend on port 8080 to persist guestbook notes.');
    }
    const created = await portfolioApi.postEndorsement(payload);
    setPortfolio((prev) => ({
      ...prev,
      endorsements: [created, ...prev.endorsements],
    }));
    return created;
  };

  const handleSubmitContact = async (payload) => {
    if (!apiStatus.online) {
      throw new Error('Start the Java Spring Boot backend on port 8080 to submit contact inquiries.');
    }
    return portfolioApi.submitContact(payload);
  };

  const resumeUrl = apiStatus.online
    ? portfolioApi.resumeDownloadUrl
    : '/Sreeja_Myadari_Resume_SE.pdf';

  return (
    <div className="app-shell">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="aurora-stage" aria-hidden="true">
        <div className="aurora-orb one" />
        <div className="aurora-orb two" />
        <div className="aurora-orb three" />
      </div>

      <CinematicCanvas theme={theme} />
      <ChapterRail activeSection={activeSection} />

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        apiStatus={apiStatus}
        resumeUrl={resumeUrl}
      />

      <main>
        <HeroSection
          profile={portfolio.profile}
          apiHealth={apiHealth}
          projectsCount={portfolio.projects.length}
          online={apiStatus.online}
        />

        <AboutSection profile={portfolio.profile} />

        <SkillsSection skillGroups={portfolio.skillGroups} />

        <ProjectsSection
          projects={portfolio.projects}
          onLikeProject={handleLikeProject}
          likedIds={likedIds}
        />

        <TimelineSection
          experiences={portfolio.experiences}
          education={portfolio.education}
          certifications={portfolio.certifications}
        />

        <GuestbookSection
          endorsements={portfolio.endorsements}
          onPostEndorsement={handlePostEndorsement}
        />

        <ContactSection
          profile={portfolio.profile}
          onSubmitContact={handleSubmitContact}
          resumeUrl={resumeUrl}
        />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            &copy; {new Date().getFullYear()} {portfolio.profile.fullName}. Crafted with React, CSS3, Java 21 &amp; Spring Boot.
          </span>
          <button
            type="button"
            className="social-pill"
            onClick={() => setAdminOpen(true)}
            title="Open Owner Inbox & Project Manager"
          >
            <Lock size={14} />
            <span>Owner Console</span>
          </button>
        </div>
      </footer>

      <AdminInboxModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onPortfolioChanged={loadPortfolio}
      />
    </div>
  );
}
