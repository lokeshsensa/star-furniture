import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getPublicAsset } from '../utils/assets';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial animation states
      gsap.set(leftWaveRef.current, { xPercent: -30, opacity: 0 });
      gsap.set(rightWaveRef.current, { xPercent: 30, opacity: 0 });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(16px)',
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 });

      // GSAP Entrance Timeline matching the user's reference screenshot
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Fluid Liquid Waves slide in
      tl.to([leftWaveRef.current, rightWaveRef.current], {
        xPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.15,
      })
      // 2. Soft Ambient Center Glow
      .to(
        glowRef.current,
        {
          opacity: 0.8,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=1.1'
      )
      // 3. Logo Reveal (blur: 16px -> 0px, scale 0.8 -> 1.0, opacity: 0 -> 1)
      .to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power3.out',
        },
        '-=1.0'
      )
      // 4. "Scroll to explore" Mouse Indicator Reveal
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Subtle slow floating liquid wave motion after entrance
      gsap.to(leftWaveRef.current, {
        y: '+=15',
        rotation: 1.5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(rightWaveRef.current, {
        y: '-=15',
        rotation: -1.5,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

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
      {/* LEFT FLUID LIQUID BLUE WAVE (Exact match to reference screenshot) */}
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

      {/* RIGHT FLUID LIQUID GREEN WAVE (Exact match to reference screenshot) */}
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
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-[#FFFFFF] via-[rgba(255,255,255,0.9)] to-transparent blur-3xl pointer-events-none z-0"
      />

      {/* CENTER STAR FURNITURE LOGO (Pixel-perfect match to screenshot) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-4xl w-full text-center">
        <img
          ref={logoRef}
          src={getPublicAsset('logo.png')}
          alt="Star Furniture - Comfort • Quality • Trust"
          className="w-[80%] sm:w-[70%] md:w-[62%] max-w-[680px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(6,91,182,0.12)]"
        />
      </div>

      {/* SCROLL TO EXPLORE MOUSE INDICATOR (Exact match to screenshot bottom indicator) */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        {/* Mouse Pill Icon */}
        <div className="w-6 h-10 rounded-full border-2 border-[rgba(6,91,182,0.4)] group-hover:border-[#065BB6] flex justify-center p-1.5 transition-colors duration-300 backdrop-blur-sm bg-white/40">
          <div className="w-1.5 h-2.5 rounded-full bg-[#065BB6] animate-bounce" />
        </div>
        {/* Text Label */}
        <span className="text-[11px] font-medium tracking-wider text-[#64748B] group-hover:text-[#065BB6] transition-colors uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};
