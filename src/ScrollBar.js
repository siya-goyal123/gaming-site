import React, { useEffect, useState } from 'react';

export default function ScrollBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress((current / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 99999,
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'linear-gradient(to right, #f0047f, #00ffff)',
        boxShadow: '0 0 10px #f0047f',
        transition: 'width 0.1s ease',
      }} />
    </div>
  );
}