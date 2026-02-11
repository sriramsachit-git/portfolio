import { useFrame } from '@react-three/fiber';

const Z_OUTSIDE = 4;
const Z_INSIDE = 2.4;
const CYCLE_SPEED = 0.35;

/**
 * Gently moves the camera in and out through the sphere surface.
 */
export function CameraMotion() {
  useFrame((state) => {
    if (!state.camera) return;
    const t = state.clock.elapsedTime * CYCLE_SPEED;
    const z = Z_OUTSIDE + (Z_INSIDE - Z_OUTSIDE) * (0.5 + 0.5 * Math.sin(t));
    state.camera.position.set(0, 0, z);
  });
  return null;
}
