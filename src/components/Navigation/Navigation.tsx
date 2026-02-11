import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/contexts/ThemeContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { siteConfig } from '@/data/config';
import { MobileMenu } from './MobileMenu';
import styles from './Navigation.module.scss';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollDirection, activeSection } = useScrollAnimation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideNav = scrolled && scrollDirection === 'down' && window.scrollY > 80;

  function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={styles.nav}
        data-scrolled={scrolled}
        data-hidden={hideNav}
      >
        <div className={styles.inner}>
          <a href="#" className={styles.logo} onClick={(e) => handleNavClick(e, '#')}>
            {siteConfig.name}
          </a>
          {!isMobile && (
            <nav className={styles.links}>
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={activeSection === link.href.slice(1) ? styles.active : ''}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          <div className={styles.actions}>
            {!isMobile && (
              <>
                <ThemeToggle />
                <a href={siteConfig.resumeUrl} download className={styles.resumeLink}>
                  Resume
                </a>
              </>
            )}
            {isMobile && (
              <button
                type="button"
                className={styles.hamburger}
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
