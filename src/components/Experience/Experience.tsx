import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '@/data/skills';
import { SectionTitle } from '@components/UI/SectionTitle';
import styles from './Experience.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timelineRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={`${styles.section} snap-section`}>
      <div className={styles.container}>
        <SectionTitle title="Experience" subtitle="Work and education" />
        <div ref={timelineRef} className={styles.timeline}>
          <h3 className={styles.timelineTitle}>Experience</h3>
          {experience.map((exp) => (
            <div key={exp.role + exp.company} className={styles.timelineItem}>
              <h4 className={styles.role}>{exp.role}</h4>
              <p className={styles.company}>{exp.company} · {exp.period}</p>
              <ul className={styles.highlights}>
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
          <h3 className={styles.timelineTitle}>Education</h3>
          {education.map((ed) => (
            <div key={ed.degree} className={styles.timelineItem}>
              <h4 className={styles.role}>{ed.degree}</h4>
              <p className={styles.company}>{ed.school} · {ed.year}{ed.gpa ? ` · GPA: ${ed.gpa}` : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
