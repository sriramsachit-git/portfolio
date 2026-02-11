import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '@components/UI/SectionTitle';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={`${styles.section} snap-section`}>
      <div className={styles.container}>
        <SectionTitle title="Get in Touch" subtitle="Let's connect — I'm open to Data Scientist, AI/ML Engineer, and Analyst opportunities." />
        <div ref={formRef}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
