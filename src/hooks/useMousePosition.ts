import { useState, useEffect } from 'react';
import { lerp } from '@/utils/math';

export function useMousePosition(smoothing = 0.1) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothed, setSmoothed] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let raf: number;
    let current = { x: smoothed.x, y: smoothed.y };
    const update = () => {
      current.x = lerp(current.x, position.x, smoothing);
      current.y = lerp(current.y, position.y, smoothing);
      setSmoothed({ x: current.x, y: current.y });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [position.x, position.y, smoothing]);

  return smoothed;
}
