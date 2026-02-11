import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 1.6;
const NODE_COUNT = 50;
const NODE_RADIUS = 0.018;
const SEGMENTS = 32;
const RINGS = 24;
const COLOR_SOFT = '#b8a0e8';
const COLOR_DARK = '#a855f7';
const SCALE_NEAR = 1.08;
const SCALE_FAR = 0.85;

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Evenly distributed points on a sphere (Fibonacci spiral). Same node count as Particles.
 */
function fibonacciSphere(radius: number, n: number): Float32Array {
  const positions = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * i;
    positions[i * 3] = radius * r * Math.cos(theta);
    positions[i * 3 + 1] = radius * y;
    positions[i * 3 + 2] = radius * r * Math.sin(theta);
  }
  return positions;
}

/**
 * NODE_COUNT vertices on a sphere. Spheres only.
 */
function buildBuckyball(radius: number, n: number): { positions: Float32Array } {
  return { positions: fibonacciSphere(radius, n) };
}

export function Buckyball() {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const worldPos = useRef(new THREE.Vector3());

  const { positions, colors, count } = useMemo(() => {
    const { positions: pos } = buildBuckyball(RADIUS, NODE_COUNT);
    const n = pos.length / 3;
    const col = new Float32Array(n * 3);
    const c1 = new THREE.Color(COLOR_SOFT);
    const c2 = new THREE.Color(COLOR_DARK);
    for (let i = 0; i < n; i++) {
      c1.clone().lerp(c2, i / n).toArray(col, i * 3);
    }
    return {
      positions: pos,
      colors: new THREE.InstancedBufferAttribute(col, 3),
      count: n,
    };
  }, []);

  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(1, SEGMENTS, RINGS),
    []
  );

  useFrame((state) => {
    const group = groupRef.current;
    const mesh = instancedRef.current;
    if (!group || !mesh) return;

    group.rotation.x = state.clock.elapsedTime * 0.012;
    group.rotation.y = state.clock.elapsedTime * 0.018;

    const camera = state.camera;
    let depthMin = Infinity;
    let depthMax = -Infinity;
    for (let i = 0; i < count; i++) {
      worldPos.current.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      group.localToWorld(worldPos.current);
      const viewZ = worldPos.current.applyMatrix4(camera.matrixWorldInverse).z;
      if (viewZ < depthMin) depthMin = viewZ;
      if (viewZ > depthMax) depthMax = viewZ;
    }
    const depthRange = depthMax - depthMin || 1;

    for (let i = 0; i < count; i++) {
      worldPos.current.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      group.localToWorld(worldPos.current);
      const viewZ = worldPos.current.applyMatrix4(camera.matrixWorldInverse).z;
      const t = (viewZ - depthMin) / depthRange;
      const scale = NODE_RADIUS * (SCALE_FAR + (SCALE_NEAR - SCALE_FAR) * t);
      dummy.current.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={instancedRef} args={[sphereGeometry, undefined, count]} frustumCulled={false}>
        <primitive object={colors} attach="instanceColor" />
        <meshStandardMaterial
          emissive={COLOR_SOFT}
          emissiveIntensity={1.4}
          vertexColors
          roughness={0.2}
          metalness={0.05}
          transparent
          opacity={0.98}
        />
      </instancedMesh>
    </group>
  );
}
