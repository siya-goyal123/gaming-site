import React, { useState } from 'react';
import Hero from './Hero';
import Characters from './Characters';
import Story from './Story';
import Game from './Game';
import Loader from './Loader';
import Contact from './Contact';
import Background3D from './Background3D';
import ScrollBar from './ScrollBar';
import GlitchOverlay from './GlitchText';
import SoundButton from './SoundButton';
import './index.css';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [showGame, setShowGame] = useState(false);

    if (loading) return <Loader onComplete={() => setLoading(false)} />;
    return (
        <div style={{ position: 'realtive' }}>
            <ScrollBar />
            <GlitchOverlay />
            <SoundButton />
            <Background3D />
            <div dtyle={{ position: 'relative', zIndex: 1, pointerEvents: 'all' }}>
            {showGame && <Game onExit={() => setShowGame(false)} />}
            <Hero onEnterGame={() => setShowGame(true)} />
            <Characters />
            <Story />
            <Contact />
        </div>
        </div>
    );
}