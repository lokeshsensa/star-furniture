import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP);

interface IntroLogoProps {
  onComplete?: () => void;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const leftWaveRef = useRef<HTMLDivElement>(null);
  const rightWaveRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial State Setup
      gsap.set(leftWaveRef.current, { xPercent: -35, opacity: 0 });
      gsap.set(rightWaveRef.current, { xPercent: 35, opacity: 0 });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.65,
        filter: 'blur(15px)',
      });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 });

      // 2. Master Opening Sequence Timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 0.0s: Liquid Waves slide in
      const waveTargets = [leftWaveRef.current, rightWaveRef.current].filter(Boolean);
      if (waveTargets.length > 0) {
        masterTl.to(waveTargets, {
          xPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.15,
        }, 0.0);
      }

      // 0.2s - 1.4s: Logo scale 0.65 -> 1, opacity 0 -> 1, blur 15px -> 0
      if (logoRef.current) {
        masterTl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power3.out',
          },
          0.2
        );
      }

      // Ambient center glow
      if (glowRef.current) {
        masterTl.to(
          glowRef.current,
          {
            opacity: 0.85,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          0.3
        );
      }

      // Tagline Reveal: COMFORT • QUALITY • TRUST (overlaps end of logo animation)
      if (taglineRef.current) {
        masterTl.to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.95
        );
      }

      // Mouse Scroll Indicator Reveal
      if (scrollIndicatorRef.current) {
        masterTl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          1.2
        );
      }

      // Subtle slow floating movement for background waves
      if (leftWaveRef.current) {
        gsap.to(leftWaveRef.current, {
          y: '+=12',
          rotation: 1.2,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (rightWaveRef.current) {
        gsap.to(rightWaveRef.current, {
          y: '-=12',
          rotation: -1.2,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    },
    { scope: containerRef }
  );

  const handleScrollClick = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="intro-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#FAFBFD] overflow-hidden select-none"
    >
      {/* LEFT FLUID LIQUID BLUE WAVE */}
      <div
        ref={leftWaveRef}
        className="absolute top-0 left-0 w-[55vw] max-w-[750px] h-full pointer-events-none z-0 flex items-center"
      >
        <svg
          viewBox="0 0 700 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(6,91,182,0.15)]"
        >
          <defs>
            <linearGradient id="blueWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#065BB6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M-100,-100 L250,-100 C380,120 480,280 420,460 C360,640 450,780 200,950 L-100,950 Z"
            fill="url(#blueWaveGrad)"
          />
        </svg>
      </div>

      {/* RIGHT FLUID LIQUID GREEN WAVE */}
      <div
        ref={rightWaveRef}
        className="absolute top-0 right-0 w-[55vw] max-w-[750px] h-full pointer-events-none z-0 flex items-center justify-end"
      >
        <svg
          viewBox="0 0 700 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(13,148,136,0.15)]"
        >
          <defs>
            <linearGradient id="greenWaveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M800,-100 L450,-100 C320,150 220,320 280,500 C340,680 240,820 500,950 L800,950 Z"
            fill="url(#greenWaveGrad)"
          />
        </svg>
      </div>

      {/* SOFT CENTER AMBIENT GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[650px] h-[650px] rounded-full bg-radial from-[#FFFFFF] via-[rgba(255,255,255,0.9)] to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* CENTER HUGE STAR FURNITURE LOGO (60-75% Desktop, 70-85% Mobile, NOT inside a card) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-5xl w-full text-center">
        <div className="w-[80%] sm:w-[75%] md:w-[68%] lg:w-[62%] max-w-[850px] flex justify-center">
          <img
            ref={logoRef}
            src={getPublicAsset('logo.png')}
            alt="Star Furniture - Comfort • Quality • Trust"
            className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(6,91,182,0.14)]"
          />
        </div>

        {/* TAGLINE: COMFORT • QUALITY • TRUST */}
        <div
          ref={taglineRef}
          className="mt-8 sm:mt-10 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[rgba(255,255,255,0.75)] backdrop-blur-xl border border-[rgba(6,91,182,0.15)] shadow-md"
        >
          <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-[#065BB6] font-semibold">
            COMFORT • QUALITY • TRUST
          </span>
        </div>
      </div>

      {/* SCROLL TO EXPLORE MOUSE INDICATOR */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[rgba(6,91,182,0.4)] group-hover:border-[#065BB6] flex justify-center p-1.5 transition-colors duration-300 backdrop-blur-sm bg-white/40">
          <div className="w-1.5 h-2.5 rounded-full bg-[#065BB6] animate-bounce" />
        </div>
        <span className="text-[11px] font-medium tracking-wider text-[#64748B] group-hover:text-[#065BB6] transition-colors uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
