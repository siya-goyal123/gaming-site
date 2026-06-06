import React, { useEffect, useRef, useState } from 'react';

export default function Game({ onExit }) {
  const canvasRef = useRef();
  const animRef = useRef();
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const levelRef = useRef(1);
  const gameOverRef = useRef(false);
  const keysRef = useRef({});
  const gdRef = useRef(null);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    gdRef.current = {
      player: { x: W / 2, y: H - 80, speed: 6 },
      bullets: [],
      enemies: [],
      explosions: [],
      stars: Array.from({ length: 100 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 1.5 + 0.5,
      })),
      frame: 0,
      shootCooldown: 0,
    };

    const gd = gdRef.current;

    const handleKey = (e) => {
      keysRef.current[e.code] = e.type === 'keydown';
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);

    const drawPlayer = (x, y) => {
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00ffff';
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.moveTo(x, y - 20);
      ctx.lineTo(x - 14, y + 15);
      ctx.lineTo(x - 6, y + 8);
      ctx.lineTo(x, y + 12);
      ctx.lineTo(x + 6, y + 8);
      ctx.lineTo(x + 14, y + 15);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f0047f';
      ctx.shadowColor = '#f0047f';
      ctx.beginPath();
      ctx.ellipse(x, y + 14, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawEnemy = (e) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = e.color;
      ctx.fillStyle = e.color;
      if (e.type === 1) {
        ctx.beginPath();
        ctx.moveTo(e.x, e.y - 14);
        ctx.lineTo(e.x + 10, e.y);
        ctx.lineTo(e.x, e.y + 14);
        ctx.lineTo(e.x - 10, e.y);
        ctx.closePath();
        ctx.fill();
      } else if (e.type === 2) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          i === 0
            ? ctx.moveTo(e.x + Math.cos(angle) * 12, e.y + Math.sin(angle) * 12)
            : ctx.lineTo(e.x + Math.cos(angle) * 12, e.y + Math.sin(angle) * 12);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const spawnEnemy = () => {
      const types = [1, 2, 3];
      const colors = ['#f0047f', '#a855f7', '#ff6600'];
      const t = types[Math.floor(Math.random() * types.length)];
      gd.enemies.push({
        x: Math.random() * (W - 60) + 30,
        y: -20,
        speed: 1.5 + Math.random() * levelRef.current * 0.5,
        type: t,
        color: colors[Math.floor(Math.random() * colors.length)],
        hp: t === 2 ? 2 : 1,
      });
    };

    const loop = () => {
      if (gameOverRef.current) return;
      gd.frame++;
      const p = gd.player;
      const keys = keysRef.current;

      if (keys['ArrowLeft'] && p.x > 30) p.x -= p.speed;
      if (keys['ArrowRight'] && p.x < W - 30) p.x += p.speed;
      if (keys['ArrowUp'] && p.y > 30) p.y -= p.speed;
      if (keys['ArrowDown'] && p.y < H - 30) p.y += p.speed;

      if (gd.shootCooldown > 0) gd.shootCooldown--;
      if (keys['Space'] && gd.shootCooldown === 0) {
        gd.bullets.push({ x: p.x, y: p.y - 20, speed: 10 });
        gd.shootCooldown = 12;
      }

      const spawnRate = Math.max(30, 80 - levelRef.current * 8);
      if (gd.frame % spawnRate === 0) spawnEnemy();

      if (scoreRef.current > levelRef.current * 100) {
        levelRef.current++;
        setLevel(levelRef.current);
      }

      gd.bullets = gd.bullets.filter(b => b.y > -10);
      gd.bullets.forEach(b => b.y -= b.speed);

      gd.enemies = gd.enemies.filter(e => e.y < H + 20);
      gd.enemies.forEach(e => {
        e.y += e.speed;
        e.x += Math.sin(gd.frame * 0.05 + e.y * 0.01) * 0.8;
      });

      // Bullet vs enemy
      for (let bi = gd.bullets.length - 1; bi >= 0; bi--) {
        const b = gd.bullets[bi];
        let hit = false;
        for (let ei = gd.enemies.length - 1; ei >= 0; ei--) {
          const e = gd.enemies[ei];
          if (Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2) < 28) {
            hit = true;
            e.hp--;
            if (e.hp <= 0) {
              gd.explosions.push({ x: e.x, y: e.y, frame: 0, color: e.color });
              gd.enemies.splice(ei, 1);
              scoreRef.current += 10 * levelRef.current;
              setScore(scoreRef.current);
            }
            break;
          }
        }
        if (hit) gd.bullets.splice(bi, 1);
      }

      // Player vs enemy
      for (let ei = gd.enemies.length - 1; ei >= 0; ei--) {
        const e = gd.enemies[ei];
        if (Math.sqrt((p.x - e.x) ** 2 + (p.y - e.y) ** 2) < 22) {
          gd.enemies.splice(ei, 1);
          gd.explosions.push({ x: e.x, y: e.y, frame: 0, color: '#ffffff' });
          livesRef.current--;
          setLives(livesRef.current);
          if (livesRef.current <= 0) {
            gameOverRef.current = true;
            setGameOver(true);
            return;
          }
        }
      }

      gd.explosions = gd.explosions.filter(ex => ex.frame < 20);
      gd.explosions.forEach(ex => ex.frame++);

      // Draw
      ctx.fillStyle = '#000008';
      ctx.fillRect(0, 0, W, H);

      gd.stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      ctx.strokeStyle = 'rgba(240,4,127,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      gd.bullets.forEach(b => {
        ctx.shadowBlur = 12; ctx.shadowColor = '#00ffff'; ctx.fillStyle = '#00ffff';
        ctx.fillRect(b.x - 2, b.y - 8, 4, 16);
        ctx.shadowBlur = 0;
      });

      gd.enemies.forEach(e => drawEnemy(e));

      gd.explosions.forEach(ex => {
        const progress = ex.frame / 20;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.shadowBlur = 10; ctx.shadowColor = ex.color;
          ctx.fillStyle = ex.color + Math.floor((1 - progress) * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(ex.x + Math.cos(angle) * progress * 30, ex.y + Math.sin(angle) * progress * 30, 3 * (1 - progress), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      });

      drawPlayer(p.x, p.y);

      // HUD on canvas
      ctx.fillStyle = '#f0047f';
      ctx.font = '14px Orbitron, sans-serif';
      ctx.fillText(`SCORE  ${scoreRef.current}`, 30, 35);
      ctx.fillStyle = '#00ffff';
      ctx.fillText(`LVL ${levelRef.current}   ${'▲'.repeat(Math.max(0, livesRef.current))}`, W - 160, 35);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 16px Orbitron, sans-serif';
      ctx.fillText('CYBERNEXUS', W / 2 - 65, 35);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKey);
    };
  }, [started]);

  const restart = () => {
    scoreRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    gameOverRef.current = false;
    keysRef.current = {};
    setScore(0); setLives(3); setLevel(1);
    setGameOver(false); setStarted(false);
    setTimeout(() => setStarted(true), 100);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: '#000008', zIndex: 9999,
    }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: 'block' }}
      />

      {/* Start screen */}
      {!started && !gameOver && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'rgba(0,0,8,0.92)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '24px',
        }}>
          <h1 style={{ color: '#f0047f', fontSize: '52px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '8px', textShadow: '0 0 40px #f0047f' }}>
            CYBER<span style={{ color: '#00ffff' }}>NEXUS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Orbitron, sans-serif', fontSize: '12px', letterSpacing: '4px' }}>
            ← → ↑ ↓ MOVE &nbsp;|&nbsp; SPACE SHOOT
          </p>
          <button onClick={() => setStarted(true)} style={{
            background: 'transparent', border: '2px solid #f0047f',
            color: '#f0047f', padding: '16px 52px',
            fontSize: '14px', letterSpacing: '5px',
            fontFamily: 'Orbitron, sans-serif', cursor: 'pointer',
            boxShadow: '0 0 25px #f0047f', marginTop: '10px',
          }}>
            START GAME
          </button>
          <button onClick={onExit} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.3)', fontSize: '12px',
            letterSpacing: '3px', fontFamily: 'Orbitron, sans-serif', cursor: 'pointer',
          }}>
            ← BACK TO SITE
          </button>
        </div>
      )}

      {/* Game Over */}
      {gameOver && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'rgba(0,0,8,0.92)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '20px',
        }}>
          <h1 style={{ color: '#f0047f', fontSize: '56px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '8px', textShadow: '0 0 40px #f0047f' }}>
            GAME OVER
          </h1>
          <p style={{ color: '#fff', fontFamily: 'Orbitron, sans-serif', fontSize: '20px', letterSpacing: '4px' }}>
            SCORE: {score}
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <button onClick={restart} style={{
              background: 'transparent', border: '2px solid #f0047f',
              color: '#f0047f', padding: '14px 40px',
              fontSize: '13px', letterSpacing: '4px',
              fontFamily: 'Orbitron, sans-serif', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(240,4,127,0.4)',
            }}>RETRY</button>
            <button onClick={onExit} style={{
              background: 'transparent', border: '2px solid #00ffff',
              color: '#00ffff', padding: '14px 40px',
              fontSize: '13px', letterSpacing: '4px',
              fontFamily: 'Orbitron, sans-serif', cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,255,255,0.4)',
            }}>EXIT</button>
          </div>
        </div>
      )}
    </div>
  );
}