import { useEffect, useRef } from 'react';
import styles from './ScrollIndicator.module.scss';

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      el.style.opacity = window.scrollY > 100 ? '0' : '1';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={styles.wrapper} aria-hidden="true">
      <span className={styles.mouse}>
        <span className={styles.wheel} />
      </span>
      <span className={styles.text}>Scroll</span>
    </div>
  );
}
