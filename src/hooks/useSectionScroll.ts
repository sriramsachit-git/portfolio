import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SECTION_IDS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
const SCROLL_DURATION = 1.5;
const WHEEL_THRESHOLD = 40;
const COOLDOWN_MS = 1600;
const SETTLE_MS = 220;
const NAV_OFFSET = 80;

/** Ease-out that decelerates strongly at the end – feels like a weighted stop */
function easeOutWeighted(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -12 * t);
}

export function useSectionScroll() {
  const cooldownUntil = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let rafId: number;
    let lenis: any;

    const init = async () => {
      const Lenis = await import('lenis').then((m) => m.default);
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const scrollToSection = (section: HTMLElement) => {
        const now = Date.now();
        cooldownUntil.current = now + COOLDOWN_MS;
        lenis.scrollTo(section, {
          offset: -NAV_OFFSET,
          duration: SCROLL_DURATION,
          easing: easeOutWeighted,
          lock: true,
          onComplete: () => {
            cooldownUntil.current = Date.now() + SETTLE_MS;
          },
        });
      };

      const handleWheel = (e: WheelEvent) => {
        const now = Date.now();
        if (now < cooldownUntil.current) {
          e.preventDefault();
          return;
        }
        const delta = e.deltaY;
        if (Math.abs(delta) < WHEEL_THRESHOLD) return;

        const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (sections.length === 0) return;

        const scrollTop = lenis.scroll;
        const viewportMid = scrollTop + window.innerHeight / 2;
        let currentIndex = 0;
        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          const top = rect.top + scrollTop;
          const bottom = top + rect.height;
          if (viewportMid >= top && viewportMid <= bottom) {
            currentIndex = i;
            break;
          }
          if (viewportMid < top) {
            currentIndex = Math.max(0, i - 1);
            break;
          }
          currentIndex = i;
        }

        if (delta > 0 && currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(sections[currentIndex + 1]);
        } else if (delta < 0 && currentIndex > 0) {
          e.preventDefault();
          scrollToSection(sections[currentIndex - 1]);
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    };

    init().then((cleanup) => {
      cleanupRef.current = cleanup;
    });

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);
}
