import { useEffect, useState } from 'react';

export function useScrollChoreography(sectionIds) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'top');

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    const observeAllReveals = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        revealObserver.observe(el);
      });
    };

    observeAllReveals();

    // Watch for dynamically mounted .reveal elements (e.g. project filter changes or new guestbook notes)
    const mutationObserver = new MutationObserver(() => {
      observeAllReveals();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
      setScrollProgress(progress);

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.42) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return { scrollProgress, activeSection };
}
