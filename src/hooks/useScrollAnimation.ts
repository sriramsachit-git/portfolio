import { useEffect, useRef, useState } from 'react';

const sectionIds = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];

export function useScrollAnimation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const dir = y > lastY.current ? 'down' : 'up';
      if (Math.abs(y - lastY.current) > 5) setScrollDirection(dir);
      lastY.current = y;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (mid <= window.innerHeight / 2 + 100) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, scrollDirection };
}
