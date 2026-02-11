import { useRef, useEffect } from 'react';
import { Download, Linkedin, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/config';
import { SectionTitle } from '@components/UI/SectionTitle';
import styles from './About.module.scss';

gsap.registerPlugin(ScrollTrigger);

const bio =
  "I'm a Data Science graduate student at Drexel University (GPA: 3.8) with 2+ years of experience building machine learning models, data pipelines, and AI-powered applications across e-commerce and finance. I specialize in end-to-end ML workflows — from data preparation and model training to deployment and monitoring. My work spans computer vision, NLP, time-series forecasting, and generative AI, with hands-on experience deploying models on edge devices and cloud infrastructure. I'm passionate about turning complex data into actionable insights and building AI systems that solve real business problems. Currently seeking Data Scientist, AI/ML Engineer, and Data Analyst roles where I can drive impact at scale.";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        textRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={`${styles.section} snap-section`}>
      <div className={styles.container}>
        <SectionTitle title="About" subtitle="Background and experience" />
        <div className={styles.layout}>
          {/* Left: Photo with name overlay */}
          <div ref={photoRef} className={styles.photoSide}>
            <div className={styles.photoFrame}>
              <img
                src="/images/profile.jpg"
                alt="Sriram Sachit Chunduri"
                className={styles.photo}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className={styles.photoFallback} aria-hidden="true" />
            </div>
            <h3 className={styles.photoName}>{siteConfig.fullName}</h3>
            <p className={styles.photoRole}>{siteConfig.title}</p>
          </div>

          {/* Right: Bio + CTA */}
          <div ref={textRef} className={styles.textSide}>
            <p className={styles.bio}>{bio}</p>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>

            <a href={siteConfig.resumeUrl} download className={styles.downloadBtn}>
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
