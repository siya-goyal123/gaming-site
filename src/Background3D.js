import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function FloatingParticles() {
  const mesh = useRef();
  const count = 400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#f0047f" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingParticles2() {
  const mesh = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = -state.clock.elapsedTime * 0.02;
      mesh.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function RotatingRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame((state) => {
    if (r1.current) {
      r1.current.rotation.x = state.clock.elapsedTime * 0.15;
      r1.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (r2.current) {
      r2.current.rotation.x = -state.clock.elapsedTime * 0.1;
      r2.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
    if (r3.current) {
      r3.current.rotation.y = state.clock.elapsedTime * 0.2;
      r3.current.rotation.z = -state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <>
      <mesh ref={r1} position={[-6, 2, -3]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#f0047f" transparent opacity={0.4} />
      </mesh>
      <mesh ref={r2} position={[6, -2, -3]}>
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r3} position={[0, 3, -5]}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </mesh>
    </>
  );
}

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#f0047f" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#00ffff" />
        <Stars radius={150} depth={60} count={6000} factor={2} fade speed={0.3} />
        <FloatingParticles />
        <FloatingParticles2 />
        <RotatingRings />
      </Canvas>
    </div>
  );
}