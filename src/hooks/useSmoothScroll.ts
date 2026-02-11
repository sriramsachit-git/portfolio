import { useEffect, useRef } from 'react';

export function useSmoothScroll() {
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let raf: number;
    const init = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      function rafCallback(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(rafCallback);
      }
      raf = requestAnimationFrame(rafCallback);
    };
    init();
    return () => {
      cancelAnimationFrame(raf);
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
}
