import { ArrowUp } from 'lucide-react';
import { siteConfig } from '@/data/config';
import styles from './Footer.module.scss';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.links}>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button type="button" className={styles.backTop} onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={24} />
        </button>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
