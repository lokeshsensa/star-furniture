import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface IntroLogoProps {
  onComplete?: () => void;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftBlueShapeRef = useRef<HTMLDivElement>(null);
  const rightGreenShapeRef = useRef<HTMLDivElement>(null);
  const topBlueGlowRef = useRef<HTMLDivElement>(null);
  const topGreenGlowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Set Initial States (Pure zero-state setup)
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.72,
        filter: 'blur(18px)',
        y: 20,
      });

      gsap.set(leftBlueShapeRef.current, {
        xPercent: -12,
        yPercent: 8,
        opacity: 0,
      });

      gsap.set(rightGreenShapeRef.current, {
        xPercent: 12,
        yPercent: 8,
        opacity: 0,
      });

      gsap.set([topBlueGlowRef.current, topGreenGlowRef.current], {
        opacity: 0,
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
      });

      // 2. Master Opening Sequence Timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Liquid Shapes reveal (Duration 1.8s)
      masterTl.to(
        [leftBlueShapeRef.current, rightGreenShapeRef.current],
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        0.0
      );

      // Top corner ambient glows
      masterTl.to(
        [topBlueGlowRef.current, topGreenGlowRef.current],
        {
          opacity: 0.35,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.2
      );

      // HUGE STAR FURNITURE LOGO Reveal (Duration 1.4s, power3.out)
      if (logoRef.current) {
        masterTl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
          },
          0.3
        );
      }

      // Minimal Scroll Indicator Reveal
      if (scrollIndicatorRef.current) {
        masterTl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          1.2
        );

        // Continuous subtle vertical pulse for scroll icon
        gsap.to(scrollIndicatorRef.current.querySelector('.scroll-dot'), {
          y: 6,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 3. Slow Ambient Floating Motion for Liquid Waves (6-10s, yoyo: true)
      if (leftBlueShapeRef.current) {
        gsap.to(leftBlueShapeRef.current, {
          x: '+=15',
          y: '-=10',
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (rightGreenShapeRef.current) {
        gsap.to(rightGreenShapeRef.current, {
          x: '-=15',
          y: '+=10',
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 4. PINNED CINEMATIC INTRO EXIT TRANSITION TO HERO
      // When scrolling down, the logo scales 1 -> 1.08 and dissolves, while background expands
      if (introRef.current && logoRef.current) {
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top top',
            end: '+=80%',
            pin: true,
            scrub: 1,
          },
        });

        exitTl.to(logoRef.current, {
          scale: 1.08,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'power1.in',
        }, 0.0);

        if (scrollIndicatorRef.current) {
          exitTl.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 25,
            ease: 'power1.in',
          }, 0.0);
        }

        exitTl.to(
          [leftBlueShapeRef.current, rightGreenShapeRef.current],
          {
            scale: 1.15,
            opacity: 0.2,
            ease: 'none',
          },
          0.0
        );
      }
    },
    { scope: introRef }
  );

  const handleScrollClick = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={introRef}
      id="intro-section"
      className="relative w-screen h-screen min-h-screen overflow-hidden bg-[#FAFCFB] flex items-center justify-center select-none z-40"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* TOP LEFT SUBTLE AMBIENT GLOW */}
      <div
        ref={topBlueGlowRef}
        className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#065BB6]/15 to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* TOP RIGHT SUBTLE AMBIENT GLOW */}
      <div
        ref={topGreenGlowRef}
        className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#10B981]/15 to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* LEFT LIQUID BLUE WAVE/BLOB (Positioned left: -15% to -25%, bottom: -10%, extending into lower-left 30%) */}
      <div
        ref={leftBlueShapeRef}
        className="absolute -left-[18%] -bottom-[12%] w-[58vw] max-w-[850px] h-[65vh] pointer-events-none z-0 flex items-end"
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(6,91,182,0.14)]"
        >
          <defs>
            <linearGradient id="blueLiquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#065BB6" stopOpacity="0.7" />
              <stop offset="90%" stopColor="#60A5FA" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M-50,850 C150,850 250,750 380,680 C510,610 650,680 720,500 C790,320 620,150 500,-50 L-50,-50 Z"
            fill="url(#blueLiquidGrad)"
          />
        </svg>
      </div>

      {/* RIGHT LIQUID GREEN WAVE/BLOB (Positioned right: -15% to -25%, bottom: -10%, extending into lower-right 30%) */}
      <div
        ref={rightGreenShapeRef}
        className="absolute -right-[18%] -bottom-[12%] w-[58vw] max-w-[850px] h-[65vh] pointer-events-none z-0 flex items-end justify-end"
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.14)]"
        >
          <defs>
            <linearGradient id="greenLiquidGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="90%" stopColor="#0D9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M850,850 C650,850 550,750 420,680 C290,610 150,680 80,500 C10,320 180,150 300,-50 L850,-50 Z"
            fill="url(#greenLiquidGrad)"
          />
        </svg>
      </div>

      {/* HUGE STAR FURNITURE LOGO (55vw-65vw Desktop, 75vw-85vw Mobile, Max width 900px, Directly on White background, NO CARD, NO BOX) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full text-center">
        <div className="w-[78vw] sm:w-[72vw] md:w-[62vw] lg:w-[58vw] max-w-[900px] flex justify-center">
          <img
            ref={logoRef}
            src={getPublicAsset('logo.png')}
            alt="Star Furniture - Comfort • Quality • Trust"
            className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(6,91,182,0.12)]"
          />
        </div>
      </div>

      {/* MINIMAL SCROLL INDICATOR (Bottom: 35px, Centered) */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-[35px] z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
      >
        <div className="w-5 h-9 rounded-full border border-slate-300 group-hover:border-[#065BB6] flex justify-center p-1 backdrop-blur-sm bg-white/70 transition-colors shadow-sm">
          <div className="scroll-dot w-1.5 h-2 rounded-full bg-[#065BB6]" />
        </div>
        <span className="text-[10px] font-medium tracking-widest text-slate-400 group-hover:text-[#065BB6] uppercase transition-colors">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
