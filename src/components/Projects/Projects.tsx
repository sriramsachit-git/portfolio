import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { SectionTitle } from '@components/UI/SectionTitle';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.scss';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

export function Projects() {
  const [filter, setFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children ?? [], {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className={`${styles.section} snap-section`}>
      <div className={styles.container}>
        <SectionTitle title="Projects" subtitle="Selected work and side projects" />
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={filter === cat ? styles.filterActive : styles.filter}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div ref={gridRef} className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
