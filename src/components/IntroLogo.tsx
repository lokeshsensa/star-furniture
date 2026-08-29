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
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const leftWaveRef = useRef<HTMLDivElement>(null);
  const rightWaveRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Entrance Animation States
      gsap.set(leftWaveRef.current, { xPercent: -40, opacity: 0 });
      gsap.set(rightWaveRef.current, { xPercent: 40, opacity: 0 });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.65,
        filter: 'blur(15px)',
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 25 });

      // 2. Entrance Timeline (Triggered on page load)
      const entranceTl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Liquid Waves slide in
      const waveTargets = [leftWaveRef.current, rightWaveRef.current].filter(Boolean);
      if (waveTargets.length > 0) {
        entranceTl.to(waveTargets, {
          xPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.15,
        }, 0.0);
      }

      // Ambient center glow
      if (glowRef.current) {
        entranceTl.to(
          glowRef.current,
          {
            opacity: 0.9,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          0.2
        );
      }

      // Logo reveal: scale 0.65 -> 1, opacity 0 -> 1, blur 15px -> 0 (~1.3s)
      if (logoRef.current) {
        entranceTl.to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power3.out',
          },
          0.25
        );
      }

      // Scroll Indicator Reveal
      if (scrollIndicatorRef.current) {
        entranceTl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          1.0
        );
      }

      // 3. CINEMATIC LOGO EXIT TRANSITION TO HERO (ScrollTrigger Scrub)
      // When scrolling down, logo expands (scale: 1 -> 1.08) and dissolves (opacity: 1 -> 0)
      if (containerRef.current && logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.08,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '30% top',
              scrub: 0.5,
            },
          });
        }
      }

      // Subtle ambient wave floating loop
      if (leftWaveRef.current) {
        gsap.to(leftWaveRef.current, {
          y: '+=10',
          rotation: 1,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (rightWaveRef.current) {
        gsap.to(rightWaveRef.current, {
          y: '-=10',
          rotation: -1,
          duration: 7,
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
      {/* LEFT FLUID LIQUID BLUE WAVE SWOOSH (Exact match to screenshot) */}
      <div
        ref={leftWaveRef}
        className="absolute top-0 left-0 w-[58vw] max-w-[800px] h-full pointer-events-none z-0 flex items-center"
      >
        <svg
          viewBox="0 0 750 950"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_25px_60px_rgba(6,91,182,0.18)]"
        >
          <defs>
            <linearGradient id="blueWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#065BB6" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M-100,-100 L300,-100 C420,100 500,280 440,480 C380,680 470,820 220,1000 L-100,1000 Z"
            fill="url(#blueWaveGrad)"
          />
        </svg>
      </div>

      {/* RIGHT FLUID LIQUID GREEN WAVE SWOOSH (Exact match to screenshot) */}
      <div
        ref={rightWaveRef}
        className="absolute top-0 right-0 w-[58vw] max-w-[800px] h-full pointer-events-none z-0 flex items-center justify-end"
      >
        <svg
          viewBox="0 0 750 950"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover filter drop-shadow-[0_25px_60px_rgba(13,148,136,0.18)]"
        >
          <defs>
            <linearGradient id="greenWaveGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#10B981" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#0D9488" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M850,-100 L450,-100 C330,140 220,320 290,520 C360,720 250,860 520,1000 L850,1000 Z"
            fill="url(#greenWaveGrad)"
          />
        </svg>
      </div>

      {/* SOFT CENTER AMBIENT WHITE GLOW */}
      <div
        ref={glowRef}
        className="absolute w-[700px] h-[700px] rounded-full bg-radial from-[#FFFFFF] via-[rgba(255,255,255,0.95)] to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* CENTER HUGE STAR FURNITURE LOGO (Pixel-perfect match to screenshot) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-5xl w-full text-center">
        <div className="w-[85%] sm:w-[78%] md:w-[70%] lg:w-[64%] max-w-[850px] flex justify-center">
          <img
            ref={logoRef}
            src={getPublicAsset('logo.png')}
            alt="Star Furniture - Comfort • Quality • Trust"
            className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(6,91,182,0.15)] transform"
          />
        </div>
      </div>

      {/* SCROLL TO EXPLORE MOUSE INDICATOR (Exact match to reference screenshot) */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[rgba(13,148,136,0.5)] group-hover:border-[#0D9488] flex justify-center p-1.5 transition-colors duration-300 backdrop-blur-sm bg-white/60 shadow-sm">
          <div className="w-1.5 h-2.5 rounded-full bg-[#0D9488] animate-bounce" />
        </div>
        <span className="text-[11px] font-medium tracking-wider text-[#64748B] group-hover:text-[#065BB6] transition-colors uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
