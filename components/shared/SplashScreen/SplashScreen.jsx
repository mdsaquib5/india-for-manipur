'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen({ onEnter }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Pulse animation on the button after 1s
    const t = setTimeout(() => setPulse(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setFadeOut(true);
    // Call parent callback to start music
    if (onEnter) onEnter();
    // Unmount after transition completes
    setTimeout(() => setVisible(false), 900);
  };

  if (!visible) return null;

  return (
    <div className={`splash ${fadeOut ? 'splash--exit' : ''}`} aria-modal="true" role="dialog" aria-label="Enter the India For Manipur experience">
      {/* Animated background particles */}
      <div className="splash__bg" aria-hidden="true">
        <div className="splash__glow splash__glow--1" />
        <div className="splash__glow splash__glow--2" />
        <div className="splash__glow splash__glow--3" />
        <div className="splash__particles">
          {[...Array(12)].map((_, i) => (
            <span key={i} className={`splash__particle splash__particle--${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="splash__content">
        {/* Tricolor line at top */}
        <div className="splash__flag-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="splash__pre-title">India For Manipur</p>

        <h1 className="splash__headline">
          A Story That<br />
          <em>Must Be Heard</em>
        </h1>

        <p className="splash__sub">
          This experience includes ambient music.<br />
          Press enter to begin.
        </p>

        <button
          className={`splash__enter-btn ${pulse ? 'splash__enter-btn--pulse' : ''}`}
          onClick={handleEnter}
          aria-label="Enter the India For Manipur experience and start music"
        >
          <span className="splash__enter-btn-text">Enter the Story</span>
          <svg className="splash__enter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
          </svg>
        </button>

        <p className="splash__hint" aria-hidden="true">
          ♪ Background music will begin
        </p>
      </div>
    </div>
  );
}
