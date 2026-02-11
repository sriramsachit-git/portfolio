export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#2d2640" />
      <directionalLight position={[3, 2, 5]} intensity={1} color="#e8e0f5" />
      <directionalLight position={[-2, 1, -3]} intensity={0.5} color="#c4b5e0" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#b8a0e8" distance={14} />
      <pointLight position={[-1.5, -1.5, -2]} intensity={0.4} color="#a78bfa" distance={12} />
      {/* Rim light – behind sphere so edges catch light */}
      <pointLight position={[0, 0, -3]} intensity={0.6} color="#e0d4f7" distance={10} />
    </>
  );
}
