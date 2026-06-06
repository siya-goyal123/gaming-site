import React, { useState } from 'react';

export default function Contact() {
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle = (name) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? '#f0047f' : 'rgba(255,255,255,0.2)'}`,
    color: '#ffffff',
    fontSize: '14px',
    padding: '14px 0',
    outline: 'none',
    width: '100%',
    letterSpacing: '1px',
    fontFamily: 'Share Tech Mono, monospace',
    transition: 'border-color 0.3s ease',
  });

  return (
    <div id="contact" style={{
      background: '#000000',
      padding: '120px 60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '60px',
      borderTop: '1px solid rgba(240,4,127,0.2)',
    }}>
      {/* Heading */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          color: '#f0047f',
          fontSize: '13px',
          letterSpacing: '5px',
          fontFamily: 'Orbitron, sans-serif',
          marginBottom: '16px',
        }}>
          INITIATE CONTACT
        </p>
        <h2 style={{
          color: '#ffffff',
          fontSize: '48px',
          fontWeight: '700',
          letterSpacing: '6px',
          fontFamily: 'Orbitron, sans-serif',
        }}>
          REACH US
        </h2>
      </div>

      {/* Form */}
      <div style={{
        width: '100%',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        gap: '36px',
      }}>
        <input
          type="text"
          name="name"
          placeholder="YOUR NAME"
          value={form.name}
          onChange={handleChange}
          style={inputStyle('name')}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused(null)}
        />
        <input
          type="email"
          name="email"
          placeholder="YOUR EMAIL"
          value={form.email}
          onChange={handleChange}
          style={inputStyle('email')}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused(null)}
        />
        <textarea
          name="message"
          placeholder="YOUR MESSAGE..."
          rows={4}
          value={form.message}
          onChange={handleChange}
          style={{
            background: 'transparent',
            border: `1px solid ${focused === 'message' ? '#f0047f' : 'rgba(255,255,255,0.2)'}`,
            color: '#ffffff',
            fontSize: '14px',
            padding: '14px',
            outline: 'none',
            width: '100%',
            resize: 'none',
            letterSpacing: '1px',
            fontFamily: 'Share Tech Mono, monospace',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused(null)}
        />

        <button
          onClick={handleSend}
          style={{
            background: sent ? '#f0047f' : 'transparent',
            border: '2px solid #f0047f',
            color: sent ? '#000000' : '#f0047f',
            padding: '16px',
            fontSize: '13px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'Orbitron, sans-serif',
            transition: 'all 0.3s ease',
            boxShadow: sent ? '0 0 30px #f0047f' : '0 0 10px rgba(240,4,127,0.2)',
          }}
          onMouseEnter={e => {
            if (!sent) {
              e.currentTarget.style.background = '#f0047f';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.boxShadow = '0 0 30px #f0047f';
            }
          }}
          onMouseLeave={e => {
            if (!sent) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#f0047f';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(240,4,127,0.2)';
            }
          }}
        >
          {sent ? '✓ TRANSMISSION SENT' : 'SEND TRANSMISSION'}
        </button>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        borderTop: '1px solid rgba(240,4,127,0.15)',
        paddingTop: '30px',
        width: '100%',
        maxWidth: '560px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <p style={{ color: 'rgba(240,4,127,0.5)', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Orbitron, sans-serif' }}>
          © 2026 CYBERNEXUS
        </p>
        <p style={{ color: 'rgba(0,255,255,0.5)', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Orbitron, sans-serif' }}>
          ENTER · THE · FUTURE
        </p>
      </div>
    </div>
  );
}