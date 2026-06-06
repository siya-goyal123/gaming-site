import React, { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING');

  useEffect(() => {
    const texts = [
      'INITIALIZING',
      'LOADING ASSETS',
      'BUILDING WORLD',
      'ENTER THE NEXUS',
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        setText(texts[Math.floor((next / 100) * texts.length)] || texts[texts.length - 1]);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      gap: '40px',
    }}>
      <div style={{ position: 'absolute', top: '30px', left: '30px', borderTop: '2px solid #f0047f', borderLeft: '2px solid #f0047f', width: '40px', height: '40px' }} />
      <div style={{ position: 'absolute', top: '30px', right: '30px', borderTop: '2px solid #f0047f', borderRight: '2px solid #f0047f', width: '40px', height: '40px' }} />
      <div style={{ position: 'absolute', bottom: '30px', left: '30px', borderBottom: '2px solid #00ffff', borderLeft: '2px solid #00ffff', width: '40px', height: '40px' }} />
      <div style={{ position: 'absolute', bottom: '30px', right: '30px', borderBottom: '2px solid #00ffff', borderRight: '2px solid #00ffff', width: '40px', height: '40px' }} />

      <h1 style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '64px',
        fontWeight: '900',
        letterSpacing: '12px',
        color: '#ffffff',
        textShadow: '0 0 40px #f0047f, 0 0 80px #f0047f',
      }}>
        CYBER<span style={{ color: '#00ffff', textShadow: '0 0 40px #00ffff' }}>NEXUS</span>
      </h1>

      <p style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '12px',
        letterSpacing: '6px',
        color: '#f0047f',
      }}>
        {text}...
      </p>

      <div style={{
        width: '300px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(to right, #f0047f, #00ffff)',
          boxShadow: '0 0 10px #f0047f',
          transition: 'width 0.1s ease',
        }} />
      </div>

      <p style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '11px',
        letterSpacing: '4px',
        color: 'rgba(255,255,255,0.3)',
      }}>
        {progress}%
      </p>
    </div>
  );
}