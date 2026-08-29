import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getPublicAsset } from '../utils/assets';

interface IntroLogoProps {
  onComplete?: () => void;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftBlueWaveRef = useRef<HTMLDivElement>(null);
  const rightGreenWaveRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial State Setup
      gsap.set(bgRef.current, { opacity: 0 });

      gsap.set(leftBlueWaveRef.current, {
        opacity: 0,
        xPercent: -12,
        yPercent: 8,
        scale: 1.05,
      });

      gsap.set(rightGreenWaveRef.current, {
        opacity: 0,
        xPercent: 12,
        yPercent: 8,
        scale: 1.05,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.72,
        filter: 'blur(18px)',
        y: 20,
      });

      // 2. Master Automatic GSAP Timeline (~4.0s Total)
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 0.0s: Phase 1 — Background Appears
      if (bgRef.current) {
        tl.to(
          bgRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.0
        );
      }

      // 0.2s: Phase 2 — Blue & Green Liquid Waves Reveal (1.6s, power3.out)
      const waves = [leftBlueWaveRef.current, rightGreenWaveRef.current].filter(Boolean);
      if (waves.length > 0) {
        tl.to(
          waves,
          {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            stagger: 0.1,
          },
          0.2
        );
      }

      // 0.5s: Phase 3 — Star Furniture Logo Emerges (1.4s, power4.out)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.4,
            ease: 'power4.out',
          },
          0.5
        );
      }

      // 1.9s: Phase 4 — Logo Settle (Subtle scale 1 -> 1.01 -> 1 over 1.0s)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1.01,
            duration: 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          1.9
        );
      }

      // 2.0s–3.0s: Phase 5 — Hold cleanly visible
      // (Timeline naturally pauses slightly during hold)

      // 3.0s: Phase 6 — Cinematic Automatic Exit Transition
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1.08,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.8,
            ease: 'power2.inOut',
          },
          3.0
        );
      }

      if (waves.length > 0) {
        tl.to(
          waves,
          {
            scale: 1.12,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          3.0
        );
      }

      if (introRef.current) {
        tl.to(
          introRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          3.4
        );
      }

      // 3. Ambient Living Liquid Motion (8-10s loop)
      if (leftBlueWaveRef.current) {
        gsap.to(leftBlueWaveRef.current, {
          x: 10,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (rightGreenWaveRef.current) {
        gsap.to(rightGreenWaveRef.current, {
          x: -10,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    },
    { scope: introRef }
  );

  return (
    <div
      ref={introRef}
      id="intro-section"
      className="fixed inset-0 z-[200] w-screen h-screen overflow-hidden flex items-center justify-center select-none pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* FULL SCREEN WHITE CANVAS */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[#FFFFFF] w-full h-full"
      />

      {/* LEFT BLUE LIQUID WAVE (Bottom-left corner, left: -10%, bottom: -10%, 50vw x 50vh) */}
      <div
        ref={leftBlueWaveRef}
        className="absolute -left-[10%] -bottom-[10%] w-[50vw] max-w-[800px] h-[52vh] pointer-events-none z-10 flex items-end"
      >
        <svg
          viewBox="0 0 800 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(6,91,182,0.15)]"
        >
          <defs>
            <linearGradient id="blueWaveOrganic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#065BB6" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M-50,750 C180,750 280,640 400,560 C520,480 660,550 720,380 C780,210 610,80 480,-50 L-50,-50 Z"
            fill="url(#blueWaveOrganic)"
          />
        </svg>
      </div>

      {/* RIGHT GREEN LIQUID WAVE (Bottom-right corner, right: -10%, bottom: -10%, 50vw x 50vh) */}
      <div
        ref={rightGreenWaveRef}
        className="absolute -right-[10%] -bottom-[10%] w-[50vw] max-w-[800px] h-[52vh] pointer-events-none z-10 flex items-end justify-end"
      >
        <svg
          viewBox="0 0 800 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.15)]"
        >
          <defs>
            <linearGradient id="greenWaveOrganic" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#0D9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M850,750 C620,750 520,640 400,560 C280,480 140,550 80,380 C20,210 190,80 320,-50 L850,-50 Z"
            fill="url(#greenWaveOrganic)"
          />
        </svg>
      </div>

      {/* HUGE CENTERED STAR FURNITURE LOGO (Desktop: 55vw-65vw, Max 900px; Mobile: 78vw-88vw; NO CARD, NO BOX) */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full text-center">
        <div className="w-[82vw] sm:w-[75vw] md:w-[65vw] lg:w-[60vw] max-w-[900px] flex justify-center">
          <img
            ref={logoRef}
            src={getPublicAsset('logo.png')}
            alt="Star Furniture - Comfort • Quality • Trust"
            className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(6,91,182,0.12)]"
          />
        </div>
      </div>
    </div>
  );
};
