import React from 'react';

const chapters = [
  {
    number: '01',
    title: 'THE COLLAPSE',
    desc: 'In 2087, the global network collapsed. Governments fell. Corporations rose. The cyber grid became the last battlefield for humanity.',
    color: '#f0047f',
  },
  {
    number: '02',
    title: 'THE RESISTANCE',
    desc: 'A group of elite hackers emerged from the shadows. Armed with neural implants and stolen tech, they fight to reclaim the grid.',
    color: '#00ffff',
  },
  {
    number: '03',
    title: 'THE RECKONING',
    desc: 'The final war begins. Only one faction will control the Cyber Nexus. Your choices determine the fate of the digital world.',
    color: '#a855f7',
  },
];

export default function Story() {
  return (
    <div id="story" style={{
      background: '#030003',
      padding: '120px 60px',
      borderTop: '1px solid rgba(240,4,127,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '80px',
    }}>
      {/* Heading */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#f0047f', fontSize: '13px', letterSpacing: '5px', fontFamily: 'Orbitron, sans-serif', marginBottom: '16px' }}>
          THE LORE
        </p>
        <h2 style={{ color: '#ffffff', fontSize: '48px', fontWeight: '700', letterSpacing: '6px', fontFamily: 'Orbitron, sans-serif' }}>
          STORY
        </h2>
      </div>

      {/* Chapters */}
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {chapters.map((ch, i) => (
          <div
            key={i}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: i === chapters.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              padding: '50px 20px',
              display: 'flex',
              gap: '60px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: ch.color, fontSize: '32px', fontFamily: 'Orbitron, sans-serif', fontWeight: '700' }}>
                {ch.number}
              </span>
              {i < chapters.length - 1 && (
                <div style={{ width: '1px', height: '60px', background: `linear-gradient(to bottom, ${ch.color}, transparent)` }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '22px',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '4px',
                marginBottom: '20px',
              }}>
                {ch.title}
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '14px',
                lineHeight: '1.9',
                letterSpacing: '0.5px',
                maxWidth: '600px',
              }}>
                {ch.desc}
              </p>
            </div>
            <span style={{ color: ch.color, fontSize: '20px', opacity: 0.6 }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}