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
      // 1. Initial State Setup
      gsap.set(leftBlueWaveRef.current, {
        opacity: 0,
        x: -40,
        y: 30,
      });

      gsap.set(rightGreenWaveRef.current, {
        opacity: 0,
        x: 40,
        y: 30,
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

      // 0.1s: Blue & Green Liquid Waves flow in (1.6-1.8s, power3.out)
      const waves = [leftBlueWaveRef.current, rightGreenWaveRef.current].filter(Boolean);
      if (waves.length > 0) {
        tl.to(
          waves,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.7,
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

      // 1.7s–2.7s: Hold for 1 second cleanly visible

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
            scale: 1.06,
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

      // 3. Subtle Living Liquid Ambient Motion Loop (8-10s, yoyo: true)
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
      className="fixed inset-0 z-[200] w-screen h-screen overflow-hidden bg-[#FFFFFF] flex items-center justify-center select-none pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* LAYER 0: PURE WHITE CANVAS BACKGROUND */}
      <div className="absolute inset-0 bg-[#FFFFFF] w-full h-full z-0" />

      {/* LAYER 1: ORGANIC BLUE LIQUID WAVE SVG (Bottom-left corner, left: -5vw, bottom: -10vh, width: 48vw, height: 42vh) */}
      <div
        ref={leftBlueWaveRef}
        className="absolute -left-[5vw] -bottom-[10vh] w-[50vw] sm:w-[48vw] h-[40vh] sm:h-[45vh] w-[75vw] h-[35vh] pointer-events-none z-[1] flex items-end"
      >
        <svg
          viewBox="0 0 900 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_15px_35px_rgba(6,91,182,0.12)]"
        >
          <defs>
            <linearGradient id="blueLiquidFlow" x1="0%" y1="100%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#065BB6" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#60A5FA" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Organic Liquid Wave Path with Bézier Curves */}
          <path
            d="M-50,700 C150,700 240,580 380,480 C520,380 660,420 780,260 C840,140 720,40 580,-50 L-50,-50 Z"
            fill="url(#blueLiquidFlow)"
          />
          {/* LAYER 2: Subtle White Glass Highlight Curve along Upper Edge */}
          <path
            d="M-10,650 C170,650 250,540 390,450 C520,360 650,390 760,240"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="3.5"
            fill="none"
            filter="blur(1.5px)"
          />
        </svg>
      </div>

      {/* LAYER 1: ORGANIC GREEN LIQUID WAVE SVG (Bottom-right corner, right: -5vw, bottom: -10vh, width: 48vw, height: 42vh) */}
      <div
        ref={rightGreenWaveRef}
        className="absolute -right-[5vw] -bottom-[10vh] w-[50vw] sm:w-[48vw] h-[40vh] sm:h-[45vh] w-[75vw] h-[35vh] pointer-events-none z-[1] flex items-end justify-end"
      >
        <svg
          viewBox="0 0 900 650"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_15px_35px_rgba(16,185,129,0.12)]"
        >
          <defs>
            <linearGradient id="greenLiquidFlow" x1="100%" y1="100%" x2="20%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.72" />
              <stop offset="80%" stopColor="#0D9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Organic Liquid Wave Path with Bézier Curves */}
          <path
            d="M950,700 C750,700 660,580 520,480 C380,380 240,420 120,260 C60,140 180,40 320,-50 L950,-50 Z"
            fill="url(#greenLiquidFlow)"
          />
          {/* LAYER 2: Subtle White Glass Highlight Curve along Upper Edge */}
          <path
            d="M910,650 C730,650 650,540 510,450 C380,360 250,390 140,240"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="3.5"
            fill="none"
            filter="blur(1.5px)"
          />
        </svg>
      </div>

      {/* LAYER 10: STAR FURNITURE LOGO (Centered at top: 47%, left: 50%, Desktop: 48vw–52vw max 720px; Mobile: 78vw–84vw max 500px; NO CARD, NO BOX) */}
      <div className="absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] flex justify-center items-center w-[80vw] max-w-[500px] sm:w-[65vw] sm:max-w-[620px] lg:w-[50vw] lg:max-w-[720px]">
        <img
          ref={logoRef}
          src={getPublicAsset('logo.png')}
          alt="Star Furniture - Comfort • Quality • Trust"
          className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(6,91,182,0.08)]"
        />
      </div>
    </div>
  );
};
