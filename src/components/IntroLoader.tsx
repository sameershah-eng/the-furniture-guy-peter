import React, { useState, useEffect } from 'react';
import { brandConfig } from '../config/brand';
import { useStore } from '../store/useStore';

export const IntroLoader: React.FC = () => {
  const { hasSeenIntro, setHasSeenIntro } = useStore();
  const [revealed, setRevealed] = useState(false);
  const [slidingUp, setSlidingUp] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user already saw intro in current browser session
    const sessionSeen = sessionStorage.getItem('tfg_intro_seen');
    if (sessionSeen || hasSeenIntro) {
      setRevealed(true);
      return;
    }

    // Step 1: Progress line filling
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Step 2: Trigger slide up curtain
    const slideTimer = setTimeout(() => {
      setSlidingUp(true);
    }, 1800);

    // Step 3: Remove from DOM
    const finishTimer = setTimeout(() => {
      setRevealed(true);
      setHasSeenIntro(true);
      sessionStorage.setItem('tfg_intro_seen', 'true');
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(slideTimer);
      clearTimeout(finishTimer);
    };
  }, [hasSeenIntro, setHasSeenIntro]);

  if (revealed) return null;

  const brandChars = "THE FURNITURE GUY".split("");

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        slidingUp ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Monogram Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-signature text-black font-serif italic font-bold text-3xl flex items-center justify-center mb-6 shadow-2xl border-2 border-black hard-shadow-orange animate-pulse">
          {brandConfig.monogram}
        </div>

        {/* Letter-by-letter revelation */}
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-white uppercase flex items-center justify-center flex-wrap">
          {brandChars.map((char, index) => (
            <span
              key={index}
              style={{
                animationDelay: `${index * 45}ms`,
                display: char === " " ? "inline" : "inline-block",
              }}
              className="animate-in fade-in duration-500 fill-mode-forwards"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="font-serif italic text-sm text-[#FFD3A1] mt-2 tracking-wide opacity-80">
          London · Handcrafted British Living
        </p>

        {/* Thin gradient progress line */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-signature transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
