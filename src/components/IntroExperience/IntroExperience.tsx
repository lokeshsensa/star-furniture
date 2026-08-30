import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroExperienceProps {
  onComplete: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const starEmblemRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // 0.0s: Initial States (Deep Navy background, hidden elements)
      gsap.set(glowRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(particlesRef.current?.children ? Array.from(particlesRef.current.children) : [], {
        opacity: 0,
        scale: 0,
      });
      gsap.set(logoBoxRef.current, {
        opacity: 0,
        scale: 1.15,
        y: 30,
        filter: 'blur(8px)',
      });
      gsap.set(starEmblemRef.current, {
        opacity: 0,
        scale: 0.7,
      });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 25,
      });
      gsap.set(plaqueRef.current, {
        opacity: 0,
        scaleX: 0.5,
      });
      gsap.set(lightSweepRef.current, {
        x: '-150%',
        opacity: 0,
      });

      // 0.4s: Subtle blue atmospheric glow appears behind the center
      tl.to(glowRef.current, {
        opacity: 0.45,
        scale: 1.1,
        duration: 1.2,
        ease: 'power2.out',
      }, 0.4);

      // 0.7s: Small star particles / tiny points of light
      tl.to(particlesRef.current?.children ? Array.from(particlesRef.current.children) : [], {
        opacity: 0.6,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
      }, 0.7);

      // 1.0s: STAR logo begins revealing with blur to focus
      tl.to(logoBoxRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
      }, 1.0);

      // 1.5s: The star emblem receives a subtle scale reveal
      tl.to(starEmblemRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)',
      }, 1.5);

      // 1.8s: "METALS FURNITURE & ELECTRONICS" reveals upward
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 1.8);

      // 2.1s: "BHUVANAGIRI" with subtle horizontal line reveal
      tl.to(plaqueRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.1);

      // 2.8s: Subtle light sweep across the logo using STAR blue/green identity
      tl.to(lightSweepRef.current, {
        opacity: 0.8,
        duration: 0.1,
      }, 2.8)
      .to(lightSweepRef.current, {
        x: '250%',
        duration: 0.8,
        ease: 'power2.inOut',
      }, 2.8)
      .to(lightSweepRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 3.4);

      // 3.2s: Cinematic transition into the actual website
      tl.to(logoBoxRef.current, {
        scale: 0.94,
        opacity: 0.85,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 3.2);

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      }, 3.4);

    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-screen h-screen z-[9999] bg-[#0B2E4F] text-[#FFFFFF] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 0.4s Subtle atmospheric blue glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(23, 105, 170, 0.35) 0%, rgba(46, 155, 75, 0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* 0.7s Minimal subtle light points */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute -top-24 -left-20 w-1.5 h-1.5 rounded-full bg-[#1769AA]/60" />
        <div className="absolute -top-16 right-24 w-2 h-2 rounded-full bg-[#2E9B4B]/50" />
        <div className="absolute top-28 -left-32 w-1.5 h-1.5 rounded-full bg-[#FFFFFF]/40" />
        <div className="absolute bottom-20 right-28 w-2 h-2 rounded-full bg-[#1769AA]/50" />
      </div>

      {/* Main Center Logo Composition */}
      <div
        ref={logoBoxRef}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto"
      >
        {/* Star Emblem with Blue Star & Green Arc Swoosh */}
        <div ref={starEmblemRef} className="mb-3 flex items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* SVG STAR Emblem matching brand identity */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
              {/* Star shape in STAR Blue */}
              <polygon
                points="50,5 64,36 98,36 70,57 81,90 50,70 19,90 30,57 2,36 36,36"
                fill="#1769AA"
              />
              {/* Dynamic Swoosh Arc in STAR Green */}
              <path
                d="M 15,65 Q 50,15 85,45 Q 50,30 15,65 Z"
                fill="#2E9B4B"
              />
            </svg>
          </div>
        </div>

        {/* STAR Wordmark with Light Sweep */}
        <div className="relative overflow-hidden px-6 py-1">
          <h1
            ref={wordmarkRef}
            className="font-sans font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-widest text-[#FFFFFF] leading-none"
          >
            STAR
          </h1>

          {/* STAR Blue/Green Light Sweep Reflection */}
          <div
            ref={lightSweepRef}
            className="absolute inset-0 w-1/3 h-full pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 0%, rgba(23, 105, 170, 0.4) 30%, rgba(46, 155, 75, 0.6) 60%, transparent 100%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Subtitle: METALS FURNITURE & ELECTRONICS */}
        <div ref={subtitleRef} className="mt-3">
          <p className="font-sans text-xs sm:text-sm md:text-base font-semibold tracking-[0.28em] text-[#EEF1EF] uppercase">
            Metals Furniture & Electronics
          </p>
        </div>

        {/* Plaque: BHUVANAGIRI */}
        <div
          ref={plaqueRef}
          className="mt-4 px-6 py-1.5 rounded-full border border-[#1769AA]/40 bg-[#071E34]/80 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B4B]" />
            <p className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#1769AA] text-star-green uppercase">
              <span className="text-[#FFFFFF]">BHUVANAGIRI</span>
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B4B]" />
          </div>
        </div>
      </div>
    </div>
  );
};
