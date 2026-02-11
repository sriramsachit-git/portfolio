import { useEffect } from 'react';
import { siteConfig } from '@/data/config';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Menu">
      <nav className={styles.menu}>
        {siteConfig.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={() => handleClick(link.href)}
          >
            {link.label}
          </a>
        ))}
        <a href={siteConfig.resumeUrl} download className={styles.resume} onClick={onClose}>
          Resume
        </a>
      </nav>
    </div>
  );
}
