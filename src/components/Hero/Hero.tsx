import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '@/data/config';
import { ScrollIndicator } from '@components/UI/ScrollIndicator';
import { Canvas } from '@components/Canvas/Canvas';
import { ErrorBoundary } from '@components/UI/ErrorBoundary';
import styles from './Hero.module.scss';

export function Hero() {
  const helloRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        helloRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        nameRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={`${styles.hero} snap-section`}>
      <div className={styles.orb} aria-hidden="true" />
      <ErrorBoundary
        fallback={
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              background:
                'radial-gradient(ellipse at 40% 20%, rgba(194, 164, 255, 0.2) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
        }
      >
        <Canvas />
      </ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.intro}>
          <p ref={helloRef} className={styles.hello}>
            Hello! I'm
          </p>
          <h1 ref={nameRef} className={styles.name}>
            {siteConfig.name}
          </h1>
          <p ref={titleRef} className={styles.title}>
            {siteConfig.title}
          </p>
          <p className={styles.tagline}>
            Building intelligent systems — from edge AI to production ML pipelines.
          </p>
          <div ref={ctaRef} className={styles.ctaGroup}>
            <button type="button" className={styles.ctaPrimary} onClick={scrollToProjects}>
              View Work
            </button>
            <span className={styles.ctaConnector} aria-hidden="true" />
            <button type="button" className={styles.ctaSecondary} onClick={scrollToContact}>
              Contact
            </button>
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
