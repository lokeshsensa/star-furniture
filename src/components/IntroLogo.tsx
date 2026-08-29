import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getPublicAsset } from '../utils/assets';

interface IntroLogoProps {
  onComplete?: () => void;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftBlueWaveRef = useRef<HTMLDivElement>(null);
  const rightGreenWaveRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Zero-State Setup
      gsap.set(leftBlueWaveRef.current, {
        opacity: 0,
        xPercent: -8,
      });

      gsap.set(rightGreenWaveRef.current, {
        opacity: 0,
        xPercent: 8,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.82,
        y: 25,
        filter: 'blur(12px)',
      });

      // 2. Master Automatic GSAP Timeline (~3.5s Total)
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 0.1s: Blue & Green organic liquid waves reveal (1.8s, power3.out)
      const waves = [leftBlueWaveRef.current, rightGreenWaveRef.current].filter(Boolean);
      if (waves.length > 0) {
        tl.to(
          waves,
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.8,
            ease: 'power3.out',
            stagger: 0.08,
          },
          0.1
        );
      }

      // 0.35s: Star Furniture Logo emerges (1.4s, power4.out)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power4.out',
          },
          0.35
        );
      }

      // 1.75s–2.75s: Hold for 1 second cleanly visible

      // 2.75s: Automatic GSAP Exit Transition (0.7s)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1.05,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.7,
            ease: 'power2.inOut',
          },
          2.75
        );
      }

      if (waves.length > 0) {
        tl.to(
          waves,
          {
            scale: 1.08,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          2.75
        );
      }

      if (introRef.current) {
        tl.to(
          introRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          3.15
        );
      }

      // 3. Subtle Ambient Liquid Motion Loop (9s, yoyo: true)
      if (leftBlueWaveRef.current) {
        gsap.to(leftBlueWaveRef.current, {
          x: 12,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (rightGreenWaveRef.current) {
        gsap.to(rightGreenWaveRef.current, {
          x: -12,
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
      className="fixed inset-0 z-[200] w-screen h-screen overflow-hidden bg-[#FFFFFF] flex items-center justify-center select-none pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* LEFT ORGANIC BLUE LIQUID WAVE (Bottom-left corner, left: -5%, bottom: -12%) */}
      <div
        ref={leftBlueWaveRef}
        className="absolute -left-[5%] -bottom-[12%] w-[55vw] max-w-[800px] h-[50vh] sm:w-[52vw] sm:h-[52vh] w-[75vw] h-[35vh] pointer-events-none z-10 flex items-end"
      >
        <svg
          viewBox="0 0 800 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_45px_rgba(6,91,182,0.16)]"
        >
          <defs>
            <linearGradient id="blueOrganicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#065BB6" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#60A5FA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M-50,750 C120,750 200,640 320,540 C440,440 580,480 680,320 C740,180 620,60 520,-50 L-50,-50 Z"
            fill="url(#blueOrganicGrad)"
          />
          {/* Thin Soft White Highlight Edge */}
          <path
            d="M0,700 C150,700 230,590 350,500 C470,410 600,440 680,310"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3.5"
            fill="none"
            filter="blur(2px)"
          />
        </svg>
      </div>

      {/* RIGHT ORGANIC GREEN LIQUID WAVE (Bottom-right corner, right: -5%, bottom: -12%) */}
      <div
        ref={rightGreenWaveRef}
        className="absolute -right-[5%] -bottom-[12%] w-[55vw] max-w-[800px] h-[50vh] sm:w-[52vw] sm:h-[52vh] w-[75vw] h-[35vh] pointer-events-none z-10 flex items-end justify-end"
      >
        <svg
          viewBox="0 0 800 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_45px_rgba(16,185,129,0.16)]"
        >
          <defs>
            <linearGradient id="greenOrganicGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.78" />
              <stop offset="80%" stopColor="#0D9488" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M850,750 C680,750 600,640 480,540 C360,440 220,480 120,320 C60,180 180,60 280,-50 L850,-50 Z"
            fill="url(#greenOrganicGrad)"
          />
          {/* Thin Soft White Highlight Edge */}
          <path
            d="M800,700 C650,700 570,590 450,500 C330,410 200,440 120,310"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3.5"
            fill="none"
            filter="blur(2px)"
          />
        </svg>
      </div>

      {/* STAR FURNITURE LOGO (Centered at top: 48%, Desktop: 52vw max 760px; Mobile: 78vw max 500px; NO CARD, NO BOX) */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center w-[78vw] max-w-[500px] sm:w-[65vw] sm:max-w-[650px] lg:w-[52vw] lg:max-w-[760px]">
        <img
          ref={logoRef}
          src={getPublicAsset('logo.png')}
          alt="Star Furniture - Comfort • Quality • Trust"
          className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(6,91,182,0.1)]"
        />
      </div>
    </div>
  );
};
