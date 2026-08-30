import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { getPublicAsset } from "../../utils/assets";

type StarLogoIntroProps = {
  onComplete?: () => void;
};

const RINGS = [
  { r: 210, duration: 1.6, at: 0.5, opacity: 0.45, width: 1.2 },
  { r: 245, duration: 1.8, at: 0.8, opacity: 0.35, width: 1.0 },
  { r: 280, duration: 2.0, at: 1.1, opacity: 0.28, width: 0.9 },
  { r: 318, duration: 2.2, at: 1.4, opacity: 0.20, width: 0.8 },
  { r: 358, duration: 2.4, at: 1.7, opacity: 0.14, width: 0.7 },
];

const PARTICLES = [
  { x: 20, y: 28, s: 2.4, d: 0.0 },
  { x: 80, y: 24, s: 1.8, d: 0.2 },
  { x: 32, y: 72, s: 2.0, d: 0.35 },
  { x: 68, y: 78, s: 1.5, d: 0.5 },
  { x: 12, y: 50, s: 1.6, d: 0.15 },
  { x: 90, y: 56, s: 2.2, d: 0.4 },
  { x: 42, y: 16, s: 1.4, d: 0.6 },
  { x: 60, y: 90, s: 1.8, d: 0.25 },
  { x: 26, y: 42, s: 1.3, d: 0.7 },
  { x: 74, y: 42, s: 1.9, d: 0.1 },
  { x: 50, y: 6, s: 1.4, d: 0.55 },
  { x: 6, y: 80, s: 1.5, d: 0.65 },
  { x: 94, y: 84, s: 1.6, d: 0.3 },
  { x: 36, y: 94, s: 1.3, d: 0.45 },
  { x: 84, y: 12, s: 1.7, d: 0.75 },
  { x: 16, y: 10, s: 1.4, d: 0.85 },
];

export const StarLogoIntro: React.FC<StarLogoIntroProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = (self.selector as (s: string) => Element[]) || ((s: string) => rootRef.current?.querySelectorAll(s));
      const ringPaths = (q(".sli-ring") as unknown as SVGCircleElement[]) || [];

      // Initial States
      gsap.set(q(".sli-atmosphere"), { opacity: 0, scale: 0.8 });
      gsap.set(q(".sli-core"), { opacity: 0, scale: 0.6 });
      gsap.set(q(".sli-particle"), { opacity: 0, scale: 0.4 });
      gsap.set(q(".sli-logo"), {
        opacity: 0,
        scale: 0.82,
        y: 20,
        filter: "blur(18px)",
      });
      gsap.set(q(".sli-sweep"), { opacity: 0, xPercent: -180, rotate: 12 });
      gsap.set(q(".sli-rings-wrap"), { scale: 0.95, opacity: 1 });

      ringPaths.forEach((ring) => {
        if (ring && typeof ring.getTotalLength === "function") {
          const len = ring.getTotalLength();
          gsap.set(ring, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 0,
          });
        }
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => onComplete?.(),
      });

      // 1. Atmosphere & Core Glow Fade-in
      tl.to(q(".sli-atmosphere"), { opacity: 1, scale: 1, duration: 1.4 }, 0.2)
        .to(q(".sli-core"), { opacity: 1, scale: 1, duration: 1.2 }, 0.3);

      // 2. Ambient Particles Reveal
      PARTICLES.forEach((p, i) => {
        const el = q(".sli-particle")[i];
        if (!el) return;
        tl.to(
          el,
          {
            opacity: gsap.utils.random(0.35, 0.75, 0.01),
            scale: 1,
            y: gsap.utils.random(-16, -4),
            duration: 1.3,
            ease: "sine.out",
          },
          0.4 + p.d * 0.4
        ).to(el, { opacity: 0, duration: 1.1, ease: "sine.inOut" }, 2.4 + p.d * 0.3);
      });

      // 3. Orbital SVG Rings Stroke Drawing
      RINGS.forEach((cfg, i) => {
        const ring = ringPaths[i];
        if (!ring) return;
        tl.to(ring, { opacity: cfg.opacity, duration: 0.6, ease: "sine.out" }, cfg.at)
          .to(
            ring,
            { strokeDashoffset: 0, duration: cfg.duration, ease: "power2.inOut" },
            cfg.at
          );
      });

      // 4. Logo Cinematic Emergence (Crystal Clear & Crisp)
      tl.to(
        q(".sli-logo"),
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        },
        0.8
      );

      // 5. Shimmer Light Sweep across the Logo
      tl.to(q(".sli-sweep"), { opacity: 1, duration: 0.25, ease: "sine.out" }, 2.0)
        .to(q(".sli-sweep"), { xPercent: 180, duration: 1.1, ease: "power1.inOut" }, 2.0)
        .to(q(".sli-sweep"), { opacity: 0, duration: 0.35, ease: "sine.in" }, 2.8);

      // 6. Rings breathing settle
      tl.to(q(".sli-rings-wrap"), { scale: 1.02, duration: 1.0, ease: "power2.out" }, 2.6)
        .to(q(".sli-atmosphere"), { opacity: 0.6, duration: 0.8 }, 2.8)
        .to(q(".sli-core"), { opacity: 0.4, duration: 0.8 }, 2.8);

      // 7. Fade-out transition into homepage
      tl.to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 3.5);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center overflow-hidden bg-white pointer-events-auto select-none"
    >
      {/* atmospheric blue glow */}
      <div className="sli-atmosphere pointer-events-none absolute h-[115vmin] w-[115vmin] rounded-full bg-intro-atmosphere blur-[65px]" />
      <div className="sli-core pointer-events-none absolute h-[45vmin] w-[45vmin] rounded-full bg-intro-core blur-[45px]" />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="sli-particle absolute rounded-full bg-intro-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              boxShadow: "0 0 8px var(--intro-particle-glow)",
            }}
          />
        ))}
      </div>

      {/* rings + logo */}
      <div className="relative aspect-square w-[min(90vw,90vh,800px)] flex items-center justify-center">
        <svg
          className="sli-rings-wrap absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 800 800"
          fill="none"
          aria-hidden="true"
        >
          {RINGS.map((cfg, i) => (
            <circle
              key={i}
              className="sli-ring stroke-intro-ring"
              cx="400"
              cy="400"
              r={cfg.r}
              strokeWidth={cfg.width}
              strokeLinecap="round"
              transform={`rotate(${-90 + i * 18} 400 400)`}
              style={{ filter: "drop-shadow(0 0 5px var(--intro-ring-glow))" }}
            />
          ))}
        </svg>

        {/* Crisp, Completely Uncropped Logo Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[65%] sm:w-[58%] max-w-[500px] aspect-square flex items-center justify-center overflow-hidden">
            <img
              src={getPublicAsset("assets/branding/star_logo_transparent.png")}
              alt="Star Furniture — Comfort, Quality, Trust"
              className="sli-logo block w-full h-full object-contain select-none will-change-transform drop-shadow-[0_10px_25px_rgba(23,105,170,0.12)]"
              draggable={false}
            />
            {/* Shimmer Light Sweep */}
            <div className="sli-sweep pointer-events-none absolute inset-y-[-20%] left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[12px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarLogoIntro;
