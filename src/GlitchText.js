import React, { useEffect, useState } from 'react';

export default function GlitchOverlay() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!glitch) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99998,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Red glitch layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: '3px',
        width: '100%',
        height: '100%',
        background: 'rgba(240,4,127,0.03)',
        clipPath: `inset(${Math.random() * 80}% 0 ${Math.random() * 10}% 0)`,
      }} />
      {/* Cyan glitch layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: '-3px',
        width: '100%',
        height: '100%',
        background: 'rgba(0,255,255,0.03)',
        clipPath: `inset(${Math.random() * 60}% 0 ${Math.random() * 20}% 0)`,
      }} />
      {/* Horizontal scan lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: 0,
          top: `${Math.random() * 100}%`,
          width: '100%',
          height: '2px',
          background: 'rgba(240,4,127,0.4)',
        }} />
      ))}
    </div>
  );
}