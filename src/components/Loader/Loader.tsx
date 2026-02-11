import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Marquee from 'react-fast-marquee';
import styles from './Loader.module.scss';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const welcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 2200;
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        setShowWelcome(true);
        raf = requestAnimationFrame(tick);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!showWelcome || !welcomeRef.current) return;
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
    );
    gsap.delayedCall(1.2, () => {
      gsap.to('.loader-wrap', { opacity: 0, duration: 0.6, onComplete });
    });
  }, [showWelcome, onComplete]);

  return (
    <div className={`${styles.wrapper} loader-wrap`} aria-hidden="true">
      <div className={styles.marqueeStrip}>
        <Marquee speed={30} gradient={false} className={styles.marquee}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={styles.marqueeText}>
              Creative Developer · AI Engineer · Creative Developer · AI Engineer
            </span>
          ))}
        </Marquee>
      </div>
      <div className={styles.center}>
        {!showWelcome ? (
          <>
            <div className={styles.bar}>
              <div className={styles.fill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.percent}>Loading {Math.round(progress)}%</span>
          </>
        ) : (
          <div ref={welcomeRef} className={styles.welcome}>
            Welcome
          </div>
        )}
      </div>
    </div>
  );
}
