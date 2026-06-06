import React, { useEffect, useRef, useState } from 'react';

export default function SoundButton() {
  const [on, setOn] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const startSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;

    // Ambient drone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.value = 60;
    osc1.type = 'sine';
    gain1.gain.value = 0.04;
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();

    // High frequency shimmer
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.value = 440;
    osc2.type = 'sine';
    gain2.gain.value = 0.01;
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();

    // Pulse effect
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.frequency.value = 120;
    osc3.type = 'square';
    gain3.gain.value = 0.008;
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start();

    nodesRef.current = [osc1, osc2, osc3];
  };

  const stopSound = () => {
    nodesRef.current.forEach(n => n.stop());
    nodesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const toggle = () => {
    if (on) {
      stopSound();
    } else {
      startSound();
    }
    setOn(!on);
  };

  useEffect(() => {
    return () => stopSound();
  }, []);

  return (
    <div
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 99999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: `1px solid ${on ? '#00ffff' : 'rgba(255,255,255,0.2)'}`,
        padding: '10px 18px',
        borderRadius: '2px',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: on ? '0 0 15px rgba(0,255,255,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ fontSize: '16px' }}>{on ? '🔊' : '🔇'}</span>
      <p style={{
        color: on ? '#00ffff' : 'rgba(255,255,255,0.4)',
        fontSize: '10px',
        letterSpacing: '3px',
        fontFamily: 'Orbitron, sans-serif',
      }}>
        {on ? 'SOUND ON' : 'SOUND OFF'}
      </p>
    </div>
  );
}