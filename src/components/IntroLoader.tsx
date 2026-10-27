import React, { useState, useEffect, useRef } from 'react';
import { brandConfig } from '../config/brand';
import { useStore } from '../store/useStore';
import { getSingleImageForType } from '../data/imageLibrary';

export const IntroLoader: React.FC = () => {
  const { hasSeenIntro, setHasSeenIntro } = useStore();
  const [isMounted, setIsMounted] = useState(true);
  const [contentFading, setContentFading] = useState(false);
  const [panelsSplitting, setPanelsSplitting] = useState(false);
  const [seamFlashing, setSeamFlashing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroImageSrc = getSingleImageForType('hero', 0);
  const heroLoadedRef = useRef(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }

    // Check if user already saw intro in current browser session
    const sessionSeen = sessionStorage.getItem('tfg_intro_seen_v3');
    if (sessionSeen || hasSeenIntro) {
      setIsMounted(false);
      return;
    }

    // Lock body scroll while loader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Preload hero image for real progress synchronization
    const img = new Image();
    img.src = heroImageSrc;
    img.onload = () => {
      heroLoadedRef.current = true;
    };
    img.onerror = () => {
      heroLoadedRef.current = true;
    };

    const startTime = performance.now();
    const minDuration = 1200; // 1.2s min display
    const maxDuration = 2400; // max display

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / maxDuration);

      let target = Math.round(timeRatio * 100);
      if (heroLoadedRef.current && elapsed >= minDuration) {
        target = 100;
      }

      setProgress((prev) => {
        const next = Math.max(prev, target);
        if (next >= 100) {
          clearInterval(interval);
          startExitSequence();
          return 100;
        }
        return next;
      });
    }, 30);

    const startExitSequence = () => {
      // 1.8s: Content lifts and fades
      setContentFading(true);

      // 2.0s: Panels split and seam line flashes
      setTimeout(() => {
        setSeamFlashing(true);
        setPanelsSplitting(true);
      }, 250);

      // 2.3s: Turn off seam flash
      setTimeout(() => {
        setSeamFlashing(false);
      }, 550);

      // 2.6s: Unmount loader and restore scroll
      setTimeout(() => {
        setIsMounted(false);
        setHasSeenIntro(true);
        sessionStorage.setItem('tfg_intro_seen_v3', 'true');
        document.body.style.overflow = originalOverflow;
      }, 850);
    };

    // Safety fallback: guaranteed exit by 2.8s
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      startExitSequence();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = originalOverflow;
    };
  }, [hasSeenIntro, setHasSeenIntro, heroImageSrc]);

  if (!isMounted) return null;

  // Reduced motion: simple fade
  if (reducedMotion) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
          contentFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center space-y-2">
          <span className="font-serif italic text-3xl text-[#FF7A00]">TFG</span>
          <h1 className="font-serif text-2xl tracking-widest uppercase">The Furniture Guy</h1>
        </div>
      </div>
    );
  }

  // Format 3-digit counter string (e.g. "000", "042", "100")
  const counterString = progress.toString().padStart(3, '0');

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-hidden pointer-events-auto select-none"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingRight: 'env(safe-area-inset-right)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
      }}
    >
      {/* Top Split Black Panel */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-black z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
        style={{
          transform: panelsSplitting ? 'translateY(-100%)' : 'translateY(0%)',
        }}
      />

      {/* Bottom Split Black Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
        style={{
          transform: panelsSplitting ? 'translateY(100%)' : 'translateY(0%)',
        }}
      />

      {/* Split Seam Flashing Gradient Line */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-signature z-30 transition-opacity duration-300 pointer-events-none -translate-y-1/2"
        style={{
          opacity: seamFlashing ? 1 : 0,
        }}
      />

      {/* Film Grain Subtle Noise Texture */}
      <div className="absolute inset-0 bg-film-grain z-20 pointer-events-none" />

      {/* ================= EDITORIAL CORNER DETAILS ================= */}
      {/* Top-Left: TFG Monogram (Desktop & Tablet) or Mobile Top-Center */}
      <div
        className={`absolute z-20 top-6 left-6 md:top-10 md:left-10 transition-all duration-500 max-md:left-1/2 max-md:-translate-x-1/2 ${
          contentFading ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="font-serif italic font-bold text-xl md:text-2xl text-white tracking-wider flex items-center gap-2">
          <span>{brandConfig.monogram}</span>
          <span className="hidden md:inline text-[9px] uppercase tracking-[0.3em] font-sans font-medium text-white/50 border-l border-white/20 pl-2">
            London
          </span>
        </span>
      </div>

      {/* Top-Right: Established Date (Desktop & Tablet only) */}
      <div
        className={`hidden md:block absolute z-20 top-10 right-10 transition-all duration-500 ${
          contentFading ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-mono text-[#FFE2C2] font-semibold">
          EST. 2010
        </span>
      </div>

      {/* Bottom-Left: Location Note (Desktop & Tablet only) */}
      <div
        className={`hidden md:block absolute z-20 bottom-10 left-10 transition-all duration-500 ${
          contentFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-sans text-white/60 font-medium">
          LONDON · SHOWROOM & ONLINE
        </span>
      </div>

      {/* Bottom-Right: Dynamic Percentage Counter */}
      <div
        className={`absolute z-20 bottom-8 right-6 md:bottom-10 md:right-10 transition-all duration-500 flex items-baseline gap-1 ${
          contentFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="font-mono text-3xl md:text-5xl lg:text-6xl font-light text-white tabular-nums tracking-tighter">
          {counterString}
        </span>
        <span className="font-mono text-lg md:text-2xl font-bold text-[#FF7A00]">
          %
        </span>
      </div>

      {/* Hairline Progress Line spanning across bottom above corner notes */}
      <div className="absolute z-20 bottom-20 md:bottom-24 left-6 right-6 md:left-10 md:right-10 h-[1px] bg-white/10 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-gradient-signature origin-left transition-transform duration-75 ease-out will-change-transform"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>

      {/* ================= CENTER HERO CONTENT ================= */}
      <div
        className={`relative z-20 w-full h-full flex flex-col items-center justify-center px-4 max-w-[90vw] mx-auto text-center transition-all duration-500 ease-out will-change-transform ${
          contentFading ? 'opacity-0 -translate-y-6' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Armchair Line-Drawn Minimal Stroke with Soft Orange Radial Glow */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          {/* Subtle Orange Glow behind armchair */}
          <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[#FF7A00]/15 blur-2xl pointer-events-none" />

          {/* Minimal Armchair Inline SVG: Single continuous outline stroke */}
          <svg
            className="w-28 h-28 sm:w-40 sm:h-40 relative z-10"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="armchairStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7A00" />
                <stop offset="100%" stopColor="#E86A00" />
              </linearGradient>
            </defs>

            {/* Continuous Architectural Armchair Outline */}
            <path
              d="M 22 75 
                 C 22 55, 26 38, 38 28 
                 C 45 23, 55 23, 62 28 
                 C 74 38, 78 55, 78 75 
                 L 86 75 
                 C 89 75, 91 78, 91 81 
                 L 88 88 
                 C 88 90, 86 91, 84 91 
                 L 16 91 
                 C 14 91, 12 90, 12 88 
                 L 9 81 
                 C 9 78, 11 75, 14 75 
                 Z 
                 M 28 75 L 72 75 
                 M 30 75 C 30 62, 33 46, 50 46 C 67 46, 70 62, 70 75 
                 M 26 91 L 22 97 
                 M 74 91 L 78 97"
              stroke="url(#armchairStrokeGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-armchair"
            />
          </svg>
        </div>

        {/* Brand Name Reveal: Word-by-word sliding up behind overflow hidden mask */}
        <div className="overflow-hidden py-1">
          {/* Desktop/Tablet (Single line) */}
          <div className="hidden sm:flex items-center justify-center gap-3 md:gap-4 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight font-semibold leading-none">
            <div className="overflow-hidden">
              <span className="inline-block animate-word-reveal-1 text-white">The</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block animate-word-reveal-2 font-serif italic text-gradient-orange">Furniture</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block animate-word-reveal-3 text-white">Guy</span>
            </div>
          </div>

          {/* Mobile (Two lines so it never wraps awkwardly or clips) */}
          <div className="sm:hidden flex flex-col items-center justify-center font-serif text-3xl tracking-tight font-semibold leading-tight">
            <div className="overflow-hidden flex items-center gap-2">
              <span className="inline-block animate-word-reveal-1 text-white">The</span>
              <span className="inline-block animate-word-reveal-2 font-serif italic text-gradient-orange">Furniture</span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block animate-word-reveal-3 text-white">Guy</span>
            </div>
          </div>
        </div>

        {/* Tagline: Small uppercase peach text with wide letter-spacing */}
        <div className="overflow-hidden mt-3 sm:mt-4">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#FFE2C2] font-semibold animate-in fade-in duration-700 delay-700">
            CRAFTED FOR THE WAY YOU LIVE
          </p>
        </div>
      </div>
    </div>
  );
};
