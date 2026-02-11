import { Suspense, useState, useEffect } from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Scene } from '@components/Scene/Scene';
import { checkWebGL } from '@/utils/three-utils';
import styles from './Canvas.module.scss';

export function Canvas() {
  const [hasWebGL, setHasWebGL] = useState(true);
  useEffect(() => {
    setHasWebGL(checkWebGL());
  }, []);

  if (!hasWebGL) {
    return <div className={`${styles.wrapper} ${styles.fallback}`} aria-hidden="true" />;
  }

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <R3FCanvas
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </R3FCanvas>
    </div>
  );
}
