'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const interactedRef = useRef(false); // track if user has interacted

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = true;  // start muted — browsers always allow muted autoplay

    // Start playing immediately (muted)
    const startMutedPlayback = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Muted autoplay failed:', err);
        });
    };

    // If audio is ready, play immediately; otherwise wait for canplay
    if (audio.readyState >= 2) {
      startMutedPlayback();
    } else {
      audio.addEventListener('canplay', startMutedPlayback, { once: true });
    }

    // On first user interaction: unmute and ensure audio is actually playing
    const handleFirstInteraction = () => {
      if (interactedRef.current) return;
      interactedRef.current = true;

      const a = audioRef.current;
      if (!a) return;

      a.muted = false;
      setIsMuted(false);

      // If autoplay was blocked and audio never started, start it now
      if (a.paused) {
        a.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.warn('Play after interaction failed:', err));
      }

      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('touchstart', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
    };

    // Use capture phase so it fires before any other click handler
    window.addEventListener('click', handleFirstInteraction, true);
    window.addEventListener('touchstart', handleFirstInteraction, true);
    window.addEventListener('keydown', handleFirstInteraction, true);

    return () => {
      window.removeEventListener('click', handleFirstInteraction, true);
      window.removeEventListener('touchstart', handleFirstInteraction, true);
      window.removeEventListener('keydown', handleFirstInteraction, true);
    };
  }, []);


  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Failed to play audio:', err));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  return (
    <div className={`bg-music-widget ${isExpanded ? 'expanded' : ''}`} aria-label="Background music control">
      <audio
        ref={audioRef}
        src="/audio/videoplayback.m4a"
        loop
        autoPlay
        preload="auto"
      />

      {/* Floating Button / Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-music-toggle-btn"
        aria-expanded={isExpanded}
        aria-label="Toggle background music settings"
        title="Background Music Settings"
      >
        {isPlaying ? (
          <div className="music-bars" aria-hidden="true">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
          </div>
        ) : (
          <svg className="music-icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        )}
      </button>


      {/* Control Panel */}
      <div className="bg-music-panel">
        <div className="bg-music-panel__header">
          <span className="bg-music-title">Atmospheric Soundscape</span>
          <span className="bg-music-subtitle">Ambient Loop</span>
        </div>
        
        <div className="bg-music-controls">
          {/* Play / Pause */}
          <button 
            className="bg-music-btn" 
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Mute / Unmute */}
          <button 
            className="bg-music-btn" 
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          >
            {isMuted || volume === 0 ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            )}
          </button>

          {/* Volume Slider */}
          <div className="bg-music-volume-container">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="bg-music-volume-slider"
              aria-label="Volume slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
