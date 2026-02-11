import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SPHERE_RADIUS = 1.8;
const NODES_INNER_RADIUS = SPHERE_RADIUS * 0.88;
const NODE_SIZE_BASE = 0.016;
const NODE_SIZE_RANDOM_MIN = 0.85;
const NODE_SIZE_RANDOM_MAX = 1.35;
const NUM_CLUSTERS = 12;
const NODES_PER_CLUSTER_MIN = 2;
const NODES_PER_CLUSTER_MAX = 5;
const CLUSTER_SPREAD = 0.18;
const CONNECTIONS_WITHIN_CLUSTER = 3;
const ACCENT_DARK = '#a855f7';
const ACCENT_SOFT = '#b8a0e8';

const SCALE_NEAR = 1.05;
const SCALE_FAR = 0.82;

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const PHI = (1 + Math.sqrt(5)) / 2;

/** Icosahedron vertices (12 points) – symmetric cluster centers. */
function icosahedronCenters(radius: number): Float32Array {
  const s = radius / Math.sqrt(1 + PHI * PHI);
  const t = PHI * s;
  const flat = [
    0, s, t, 0, s, -t, 0, -s, t, 0, -s, -t,
    s, t, 0, s, -t, 0, -s, t, 0, -s, -t, 0,
    t, 0, s, t, 0, -s, -t, 0, s, -t, 0, -s,
  ];
  return new Float32Array(flat);
}

/** Symmetric points around origin (small sphere) for nodes within a cluster. */
function clusterNodeOffsets(n: number, spread: number, seed: number): [number, number, number][] {
  const rnd = (): number => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const out: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    const rad = spread * (0.6 + 0.4 * rnd());
    out.push([
      rad * r * Math.cos(theta),
      rad * y,
      rad * r * Math.sin(theta),
    ]);
  }
  return out;
}

// Unused function - can be removed or used in future
// function fibonacciSphere(radius: number, n: number): Float32Array {
//   const positions = new Float32Array(n * 3);
//   for (let i = 0; i < n; i++) {
//     const y = 1 - (i / (n - 1)) * 2;
//     const r = Math.sqrt(1 - y * y);
//     const theta = GOLDEN_ANGLE * i;
//     positions[i * 3] = radius * r * Math.cos(theta);
//     positions[i * 3 + 1] = radius * y;
//     positions[i * 3 + 2] = radius * r * Math.sin(theta);
//   }
//   return positions;
// }

function distSq(positions: number[], i: number, j: number): number {
  const dx = positions[i * 3] - positions[j * 3];
  const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
  const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Clusters of nodes inside the sphere; lines only within each cluster (never leave the cluster).
 */
function buildClusteredMatrix(
  innerRadius: number,
  seed: number
): {
  positions: Float32Array;
  randomScales: Float32Array;
  lineSegments: Float32Array;
  count: number;
} {
  const rnd = (): number => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const clusterCenters = icosahedronCenters(innerRadius);
  const allPositions: number[] = [];
  const randomScales: number[] = [];
  const clusterNodeIndices: number[][] = Array.from({ length: NUM_CLUSTERS }, () => []);

  for (let c = 0; c < NUM_CLUSTERS; c++) {
    const cx = clusterCenters[c * 3];
    const cy = clusterCenters[c * 3 + 1];
    const cz = clusterCenters[c * 3 + 2];
    const nNodes =
      NODES_PER_CLUSTER_MIN + Math.floor(rnd() * (NODES_PER_CLUSTER_MAX - NODES_PER_CLUSTER_MIN + 1));
    const offsets = clusterNodeOffsets(nNodes, CLUSTER_SPREAD, seed + c * 1000);
    for (let k = 0; k < nNodes; k++) {
      const [ox, oy, oz] = offsets[k];
      let x = cx + ox;
      let y = cy + oy;
      let z = cz + oz;
      const len = Math.sqrt(x * x + y * y + z * z);
      if (len > innerRadius) {
        const s = innerRadius / len;
        x *= s;
        y *= s;
        z *= s;
      }
      const idx = allPositions.length / 3;
      allPositions.push(x, y, z);
      randomScales.push(
        NODE_SIZE_RANDOM_MIN + rnd() * (NODE_SIZE_RANDOM_MAX - NODE_SIZE_RANDOM_MIN)
      );
      clusterNodeIndices[c].push(idx);
    }
  }

  const n = allPositions.length / 3;
  for (let i = 0; i < n; i++) {
    randomScales[i] = Math.max(randomScales[i], 1);
  }

  const segments: number[] = [];
  const edgeSet = new Set<string>();
  const nodesWithLines = new Set<number>();

  for (let c = 0; c < NUM_CLUSTERS; c++) {
    const nodes = clusterNodeIndices[c];
    const numNeighbors = nodes.length - 1;
    if (numNeighbors < 1) continue;
    const k = Math.max(1, Math.min(CONNECTIONS_WITHIN_CLUSTER, numNeighbors));
    for (const i of nodes) {
      const sorted = nodes
        .filter((j) => j !== i)
        .sort((a, b) => distSq(allPositions, i, a) - distSq(allPositions, i, b))
        .slice(0, k);
      for (const j of sorted) {
        const key = i < j ? `${i},${j}` : `${j},${i}`;
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);
        nodesWithLines.add(i);
        nodesWithLines.add(j);
        segments.push(
          allPositions[i * 3], allPositions[i * 3 + 1], allPositions[i * 3 + 2],
          allPositions[j * 3], allPositions[j * 3 + 1], allPositions[j * 3 + 2]
        );
      }
    }
  }

  for (let c = 0; c < NUM_CLUSTERS; c++) {
    const nodes = clusterNodeIndices[c];
    for (const i of nodes) {
      if (nodesWithLines.has(i)) continue;
      const other = nodes.filter((j) => j !== i).sort((a, b) => distSq(allPositions, i, a) - distSq(allPositions, i, b))[0];
      if (other === undefined) continue;
      const key = i < other ? `${i},${other}` : `${other},${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      segments.push(
        allPositions[i * 3], allPositions[i * 3 + 1], allPositions[i * 3 + 2],
        allPositions[other * 3], allPositions[other * 3 + 1], allPositions[other * 3 + 2]
      );
    }
  }

  return {
    positions: new Float32Array(allPositions),
    randomScales: new Float32Array(randomScales),
    lineSegments: new Float32Array(segments),
    count: n,
  };
}

export function Particles() {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const worldPos = useRef(new THREE.Vector3());

  const { positions, instanceColorAttr, linePositions, randomScales, count } = useMemo(() => {
    const { positions: pos, randomScales: rScales, lineSegments: segs, count: n } =
      buildClusteredMatrix(NODES_INNER_RADIUS, 12345);
    const col = new Float32Array(n * 3);
    const c1 = new THREE.Color(ACCENT_SOFT);
    const c2 = new THREE.Color(ACCENT_DARK);
    for (let i = 0; i < n; i++) {
      c1.clone().lerp(c2, i / n).toArray(col, i * 3);
    }
    return {
      positions: pos,
      instanceColorAttr: new THREE.InstancedBufferAttribute(col, 3),
      linePositions: segs,
      randomScales: rScales,
      count: n,
    };
  }, []);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 32, 24), []);

  useFrame((state) => {
    const group = groupRef.current;
    const mesh = instancedRef.current;
    if (!group || !mesh) return;

    group.rotation.x = state.clock.elapsedTime * 0.015;
    group.rotation.y = state.clock.elapsedTime * 0.02;

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
      const depthScale = SCALE_FAR + (SCALE_NEAR - SCALE_FAR) * t;
      const scale = NODE_SIZE_BASE * randomScales[i] * depthScale;
      dummy.current.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.current.scale.setScalar(scale);
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Lines first so nodes render on top and clearly cap the connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={ACCENT_SOFT}
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthTest
          depthWrite={false}
        />
      </lineSegments>
      <instancedMesh ref={instancedRef} args={[sphereGeo, undefined, count]} frustumCulled={false}>
        <primitive object={instanceColorAttr} attach="instanceColor" />
        <meshStandardMaterial
          emissive={ACCENT_SOFT}
          emissiveIntensity={1.5}
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
