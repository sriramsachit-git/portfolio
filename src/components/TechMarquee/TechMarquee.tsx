import Marquee from 'react-fast-marquee';
import { skills } from '@/data/skills';
import styles from './TechMarquee.module.scss';

const techNames = skills.map((s) => s.name);

export function TechMarquee() {
  return (
    <section className={styles.section} aria-label="Technologies">
      <h2 className={styles.title}>Tech Stack</h2>
      <div className={styles.marqueeWrap}>
        <Marquee speed={40} gradient={false} className={styles.marquee}>
          {[...techNames, ...techNames].map((name) => (
            <span key={name} className={styles.pill}>
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
