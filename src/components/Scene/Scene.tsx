import { Particles } from './Particles';
import { Lighting } from './Lighting';
import { CameraMotion } from './CameraMotion';

export function Scene() {
  return (
    <>
      <CameraMotion />
      <Lighting />
      <Particles />
    </>
  );
}
