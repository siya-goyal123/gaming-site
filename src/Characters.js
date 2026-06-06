import React, { useState } from 'react';

const characters = [
  {
    id: '01',
    name: 'PHANTOM',
    role: 'Shadow Assassin',
    desc: 'Master of stealth and deception. Phantom moves through the cyber grid like a ghost, leaving no trace behind.',
    stats: { Speed: 95, Stealth: 100, Power: 70, Tech: 85 },
    color: '#f0047f',
  },
  {
    id: '02',
    name: 'KRONOS',
    role: 'Time Hacker',
    desc: 'Controls the flow of time itself. Kronos can rewind moments and predict enemy moves before they happen.',
    stats: { Speed: 80, Stealth: 60, Power: 90, Tech: 100 },
    color: '#00ffff',
  },
  {
    id: '03',
    name: 'VORTEX',
    role: 'Energy Warrior',
    desc: 'Channels raw cyber energy into devastating attacks. Vortex is the ultimate frontline fighter.',
    stats: { Speed: 85, Stealth: 40, Power: 100, Tech: 75 },
    color: '#a855f7',
  },
];

export default function Characters() {
  const [active, setActive] = useState(0);

  const c = characters[active];

  return (
    <div id="characters" style={{
      background: '#000000',
      padding: '120px 60px',
      borderTop: '1px solid rgba(240,4,127,0.2)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '60px',
    }}>
      {/* Heading */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#f0047f', fontSize: '13px', letterSpacing: '5px', fontFamily: 'Orbitron, sans-serif', marginBottom: '16px' }}>
          SELECT YOUR FIGHTER
        </p>
        <h2 style={{ color: '#ffffff', fontSize: '48px', fontWeight: '700', letterSpacing: '6px', fontFamily: 'Orbitron, sans-serif' }}>
          CHARACTERS
        </h2>
      </div>

      {/* Character selector */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {characters.map((ch, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: active === i ? ch.color : 'transparent',
              border: `2px solid ${ch.color}`,
              color: active === i ? '#000000' : ch.color,
              padding: '12px 30px',
              fontSize: '13px',
              letterSpacing: '3px',
              fontFamily: 'Orbitron, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: active === i ? `0 0 20px ${ch.color}` : 'none',
            }}
          >
            {ch.name}
          </button>
        ))}
      </div>

      {/* Character detail */}
      <div style={{
        display: 'flex',
        gap: '80px',
        alignItems: 'center',
        maxWidth: '900px',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {/* Left — Avatar placeholder */}
        <div style={{
          width: '260px',
          height: '320px',
          border: `2px solid ${c.color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: `0 0 40px ${c.color}40`,
          background: `radial-gradient(circle, ${c.color}15, #000000)`,
        }}>
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '80px', color: c.color, opacity: 0.8 }}>
            {c.id}
          </p>
          {/* Corner accents */}
          <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: `4px solid ${c.color}`, borderLeft: `4px solid ${c.color}` }} />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '20px', height: '20px', borderTop: `4px solid ${c.color}`, borderRight: `4px solid ${c.color}` }} />
          <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '20px', height: '20px', borderBottom: `4px solid ${c.color}`, borderLeft: `4px solid ${c.color}` }} />
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: `4px solid ${c.color}`, borderRight: `4px solid ${c.color}` }} />
        </div>

        {/* Right — Info */}
        <div style={{ flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ color: c.color, fontSize: '12px', letterSpacing: '4px', fontFamily: 'Orbitron, sans-serif', marginBottom: '8px' }}>
              {c.role}
            </p>
            <h2 style={{ color: '#ffffff', fontSize: '42px', fontFamily: 'Orbitron, sans-serif', fontWeight: '700', letterSpacing: '4px' }}>
              {c.name}
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.9', letterSpacing: '0.5px' }}>
            {c.desc}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(c.stats).map(([key, val]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', letterSpacing: '3px', fontFamily: 'Orbitron, sans-serif' }}>{key}</p>
                  <p style={{ color: c.color, fontSize: '11px', letterSpacing: '2px', fontFamily: 'Orbitron, sans-serif' }}>{val}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', height: '3px', borderRadius: '2px' }}>
                  <div style={{
                    width: `${val}%`,
                    height: '100%',
                    background: c.color,
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${c.color}`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}