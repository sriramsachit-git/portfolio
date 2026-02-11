import { useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './Cursor.module.scss';

export function Cursor() {
  const pos = useMousePosition(0.1);
  const isTouch = useMediaQuery('(hover: none)');
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) setHover(true);
    };
    const onMouseOut = () => setHover(false);
    const onMouseDown = () => setClick(true);
    const onMouseUp = () => setClick(false);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      className={styles.cursor}
      data-hover={hover}
      data-click={click}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      aria-hidden="true"
    />
  );
}
