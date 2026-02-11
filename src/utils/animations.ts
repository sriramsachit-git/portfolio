import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeUp(selector: string | HTMLElement, options?: { y?: number; duration?: number; stagger?: number }) {
  const { y = 60, duration = 1, stagger = 0 } = options ?? {};
  gsap.from(selector, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
    },
  });
}

export function textReveal(selector: string | HTMLElement, options?: { duration?: number; stagger?: number }) {
  const { duration = 0.8, stagger = 0.02 } = options ?? {};
  gsap.from(`${selector} .char, ${selector} .word`, {
    y: 50,
    opacity: 0,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
    },
  });
}

export { gsap, ScrollTrigger };
