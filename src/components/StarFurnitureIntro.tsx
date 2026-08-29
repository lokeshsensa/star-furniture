import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getPublicAsset } from '../utils/assets';
import '../styles/star-furniture-intro.css';

interface StarFurnitureIntroProps {
  onComplete?: () => void;
}

export const StarFurnitureIntro: React.FC<StarFurnitureIntroProps> = ({ onComplete }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftBlueWaveRef = useRef<SVGSVGElement>(null);
  const rightGreenWaveRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // 1. Initial State Setup
      gsap.set(leftBlueWaveRef.current, {
        opacity: 0,
        x: -60,
        y: 30,
      });

      gsap.set(rightGreenWaveRef.current, {
        opacity: 0,
        x: 60,
        y: 30,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.82,
        y: 25,
        filter: 'blur(10px)',
      });

      // 2. Master Automatic GSAP Timeline (~3.25s Total)
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 0.1s: Blue & Green Liquid SVG Waves Entrance (1.5s, power3.out)
      const waves = [leftBlueWaveRef.current, rightGreenWaveRef.current].filter(Boolean);
      if (waves.length > 0) {
        tl.to(
          waves,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.08,
          },
          0.1
        );
      }

      // 0.35s: Logo Entrance (1.35s, power4.out)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.35,
            ease: 'power4.out',
          },
          0.35
        );
      }

      // 1.6s–2.6s: Hold cleanly visible for 1 second

      // 2.6s: Automatic GSAP Exit Transition (0.65s)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1.04,
            opacity: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          2.6
        );
      }

      if (waves.length > 0) {
        tl.to(
          waves,
          {
            scale: 1.05,
            opacity: 0,
            duration: 0.65,
            ease: 'power2.inOut',
          },
          2.6
        );
      }

      if (introRef.current) {
        tl.to(
          introRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          2.95
        );
      }

      // 3. Subtle Living Liquid Ambient Motion Loop (9s, yoyo: true)
      if (leftBlueWaveRef.current) {
        gsap.to(leftBlueWaveRef.current, {
          x: 8,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (rightGreenWaveRef.current) {
        gsap.to(rightGreenWaveRef.current, {
          x: -8,
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
    <div ref={introRef} className="star-intro">
      {/* 01. PURE WHITE BACKGROUND CANVAS */}
      <div className="intro-background" />

      {/* 02. BLUE ORGANIC LIQUID SVG WAVE */}
      <svg
        ref={leftBlueWaveRef}
        className="intro-liquid intro-liquid-blue"
        viewBox="0 0 900 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueLiquidGrad" x1="0%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#065BB6" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#60A5FA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Curved Organic Bézier Path */}
        <path
          d="M-50,700 C150,700 240,580 380,480 C520,380 660,420 780,260 C840,140 720,40 580,-50 L-50,-50 Z"
          fill="url(#blueLiquidGrad)"
        />
        {/* Soft Glass Edge Highlight Curve */}
        <path
          d="M-10,650 C170,650 250,540 390,450 C520,360 650,390 760,240"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="3"
          fill="none"
          filter="blur(1px)"
        />
      </svg>

      {/* 03. GREEN ORGANIC LIQUID SVG WAVE */}
      <svg
        ref={rightGreenWaveRef}
        className="intro-liquid intro-liquid-green"
        viewBox="0 0 900 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="greenLiquidGrad" x1="100%" y1="100%" x2="20%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.88" />
            <stop offset="45%" stopColor="#10B981" stopOpacity="0.72" />
            <stop offset="80%" stopColor="#0D9488" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Curved Organic Bézier Path */}
        <path
          d="M950,700 C750,700 660,580 520,480 C380,380 240,420 120,260 C60,140 180,40 320,-50 L950,-50 Z"
          fill="url(#greenLiquidGrad)"
        />
        {/* Soft Glass Edge Highlight Curve */}
        <path
          d="M910,650 C730,650 650,540 510,450 C380,360 250,390 140,240"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="3"
          fill="none"
          filter="blur(1.5px)"
        />
      </svg>

      {/* 04. UNBOXED STAR FURNITURE LOGO (Centered at top: 46%, 48vw max 720px) */}
      <img
        ref={logoRef}
        className="star-intro-logo"
        src={getPublicAsset('logo.png')}
        alt="Star Furniture - Comfort • Quality • Trust"
      />
    </div>
  );
};
