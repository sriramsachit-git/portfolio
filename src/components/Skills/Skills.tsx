import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/data/skills';
import styles from './Skills.module.scss';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll(`.${styles.category}`) ?? [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.grid}>
        {skillCategories.map((cat) => (
          <div key={cat.category} className={styles.category}>
            <h4 className={styles.categoryTitle}>{cat.category}</h4>
            <div className={styles.tags}>
              {cat.items.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
