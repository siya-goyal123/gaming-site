import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';

function CyberGrid() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 2) % 4;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 21 }).map((_, i) => (
        <line key={`v${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([i - 10, -2, -20, i - 10, -2, 4])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#f0047f" transparent opacity={0.3} />
        </line>
      ))}
      {Array.from({ length: 25 }).map((_, i) => (
        <line key={`h${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={new Float32Array([-10, -2, i - 20, 10, -2, i - 20])}
              count={2}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#f0047f" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const mesh = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlitchText() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 + 0.5;
    }
  });

  return (
    <group ref={ref}>
      <Text fontSize={0.9} anchorX="center" anchorY="middle" position={[0, 0, 0]} letterSpacing={0.15}>
        CYBER NEXUS
        <meshStandardMaterial color="#ffffff" emissive="#f0047f" emissiveIntensity={0.5} />
      </Text>
      <Text fontSize={0.22} anchorX="center" anchorY="middle" position={[0, -0.7, 0]} letterSpacing={0.2} color="#00ffff">
        ENTER THE FUTURE · DOMINATE THE GAME
      </Text>
    </group>
  );
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero({ onEnterGame }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.5,
        y: (e.clientY / window.innerHeight - 0.5) * 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000', position: 'relative' }}>
      <Canvas camera={{ position: [mousePos.x * 2, mousePos.y * -2, 5], fov: 70 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#f0047f" />
        <pointLight position={[-5, 5, 5]} intensity={2} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={2} fade speed={0.5} />
        <CyberGrid />
        <FloatingParticles />
        <GlitchText />
      </Canvas>

      {/* Navbar */}
      <div style={{
        position: 'absolute',
        top: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 50px',
      }}>
        <p style={{
          color: '#f0047f',
          fontSize: '18px',
          letterSpacing: '4px',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: '700',
        }}>
          CYBER<span style={{ color: '#00ffff' }}>NEXUS</span>
        </p>
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { label: 'Play', id: 'play' },
            { label: 'Story', id: 'story' },
            { label: 'Characters', id: 'characters' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <p
              key={item.label}
              onClick={() => {
                if (item.id === 'play') {
                  onEnterGame();
                } else {
                  scrollTo(item.id);
                }
              }}
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                letterSpacing: '3px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: 'Orbitron, sans-serif',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={e => e.target.style.color = '#f0047f'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >
              {item.label}
            </p>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        <button
          onClick={onEnterGame}
          style={{
            background: 'transparent',
            border: '2px solid #f0047f',
            color: '#f0047f',
            padding: '16px 50px',
            fontSize: '14px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'Orbitron, sans-serif',
            boxShadow: '0 0 20px #f0047f, inset 0 0 20px rgba(240,4,127,0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#f0047f';
            e.currentTarget.style.color = '#000000';
            e.currentTarget.style.boxShadow = '0 0 40px #f0047f';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#f0047f';
            e.currentTarget.style.boxShadow = '0 0 20px #f0047f, inset 0 0 20px rgba(240,4,127,0.1)';
          }}
        >
          ENTER THE GAME
        </button>
        <p
          onClick={() => scrollTo('story')}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '13px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          SCROLL TO EXPLORE ↓
        </p>
      </div>

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: '80px', left: '30px', borderTop: '2px solid #f0047f', borderLeft: '2px solid #f0047f', width: '30px', height: '30px' }} />
      <div style={{ position: 'absolute', top: '80px', right: '30px', borderTop: '2px solid #f0047f', borderRight: '2px solid #f0047f', width: '30px', height: '30px' }} />
      <div style={{ position: 'absolute', bottom: '40px', left: '30px', borderBottom: '2px solid #00ffff', borderLeft: '2px solid #00ffff', width: '30px', height: '30px' }} />
      <div style={{ position: 'absolute', bottom: '40px', right: '30px', borderBottom: '2px solid #00ffff', borderRight: '2px solid #00ffff', width: '30px', height: '30px' }} />
    </div>
  );
}