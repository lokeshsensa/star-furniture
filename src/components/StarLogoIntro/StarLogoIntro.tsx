import { useEffect, useRef } from "react";
import gsap from "gsap";
import starLogo from "../../assets/star-furniture-logo.png";

type StarLogoIntroProps = {
  onComplete?: () => void;
};

const RINGS = [
  { r: 196, duration: 1.5, at: 0.5, opacity: 0.45, width: 1.2 },
  { r: 224, duration: 1.7, at: 0.7, opacity: 0.35, width: 1.0 },
  { r: 252, duration: 1.9, at: 0.9, opacity: 0.28, width: 0.9 },
  { r: 282, duration: 2.1, at: 1.2, opacity: 0.20, width: 0.8 },
  { r: 314, duration: 2.3, at: 1.5, opacity: 0.14, width: 0.7 },
];

const PARTICLES = [
  { x: 22, y: 30, s: 3.0, d: 0.0 },
  { x: 78, y: 26, s: 2.2, d: 0.2 },
  { x: 34, y: 70, s: 2.5, d: 0.35 },
  { x: 66, y: 76, s: 2.0, d: 0.5 },
  { x: 14, y: 52, s: 2.2, d: 0.15 },
  { x: 88, y: 58, s: 2.8, d: 0.4 },
  { x: 44, y: 18, s: 1.8, d: 0.6 },
  { x: 58, y: 88, s: 2.4, d: 0.25 },
  { x: 28, y: 44, s: 1.8, d: 0.7 },
  { x: 72, y: 44, s: 2.6, d: 0.1 },
  { x: 50, y: 8, s: 1.8, d: 0.55 },
  { x: 8, y: 78, s: 2.0, d: 0.65 },
  { x: 92, y: 82, s: 2.2, d: 0.3 },
  { x: 38, y: 92, s: 1.8, d: 0.45 },
  { x: 82, y: 14, s: 2.2, d: 0.75 },
  { x: 18, y: 12, s: 1.8, d: 0.85 },
];

export default function StarLogoIntro({ onComplete }: StarLogoIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    // Guaranteed fallback timer to redirect after 4.2 seconds
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 4200);

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(".sli-atmosphere", { opacity: 0, scale: 0.75 });
      gsap.set(".sli-core", { opacity: 0, scale: 0.5 });
      gsap.set(".sli-particle", { opacity: 0, scale: 0.3 });
      gsap.set(".sli-logo", {
        opacity: 0,
        scale: 0.84,
        y: 15,
        filter: "blur(16px)",
      });
      gsap.set(".sli-sweep", { opacity: 0, xPercent: -170, rotate: 10 });
      gsap.set(".sli-rings-wrap", { scale: 0.94, opacity: 1 });

      // Initialize ring stroke dash offsets safely
      RINGS.forEach((cfg, i) => {
        const circum = 2 * Math.PI * cfg.r;
        gsap.set(`.sli-ring-${i}`, {
          strokeDasharray: circum,
          strokeDashoffset: circum,
          opacity: 0,
        });
      });

      // 2. Master Timeline Sequence
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          handleFinish();
        },
      });

      // Step 1: Atmosphere & Core Glow Fade-in
      tl.to(".sli-atmosphere", { opacity: 1, scale: 1, duration: 1.2 }, 0.2)
        .to(".sli-core", { opacity: 1, scale: 1, duration: 1.0 }, 0.3);

      // Step 2: Particles Shimmer
      PARTICLES.forEach((p, i) => {
        tl.to(
          `.sli-particle-${i}`,
          {
            opacity: gsap.utils.random(0.35, 0.75, 0.01),
            scale: 1,
            y: gsap.utils.random(-16, -4),
            duration: 1.2,
            ease: "sine.out",
          },
          0.3 + p.d * 0.4
        ).to(`.sli-particle-${i}`, { opacity: 0, duration: 1.0, ease: "sine.inOut" }, 2.4 + p.d * 0.3);
      });

      // Step 3: Draw Concentric Orbital Rings
      RINGS.forEach((cfg, i) => {
        tl.to(`.sli-ring-${i}`, { opacity: cfg.opacity, duration: 0.5, ease: "sine.out" }, cfg.at)
          .to(
            `.sli-ring-${i}`,
            { strokeDashoffset: 0, duration: cfg.duration, ease: "power2.inOut" },
            cfg.at
          );
      });

      // Step 4: Star Furniture Logo Emergence (Crisp & Fully Visible)
      tl.to(
        ".sli-logo",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
        },
        0.7
      );

      // Step 5: Diagonal Shimmer Sweep across the Logo
      tl.to(".sli-sweep", { opacity: 1, duration: 0.25, ease: "sine.out" }, 1.9)
        .to(".sli-sweep", { xPercent: 170, duration: 1.1, ease: "power1.inOut" }, 1.9)
        .to(".sli-sweep", { opacity: 0, duration: 0.35, ease: "sine.in" }, 2.8);

      // Step 6: Rings breathing settle
      tl.to(".sli-rings-wrap", { scale: 1.02, duration: 1.0, ease: "power2.out" }, 2.5)
        .to(".sli-atmosphere", { opacity: 0.55, duration: 0.8 }, 2.7)
        .to(".sli-core", { opacity: 0.35, duration: 0.8 }, 2.7);

      // Step 7: Smooth Fade Out to Showroom / Next Page
      tl.to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 3.4);
    }, rootRef);

    return () => {
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] flex min-h-screen w-screen items-center justify-center overflow-hidden bg-white select-none pointer-events-auto"
    >
      {/* Atmospheric blue glow */}
      <div className="sli-atmosphere pointer-events-none absolute h-[110vmin] w-[110vmin] rounded-full bg-intro-atmosphere blur-[60px]" />
      <div className="sli-core pointer-events-none absolute h-[45vmin] w-[45vmin] rounded-full bg-intro-core blur-[40px]" />

      {/* Constellation particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`sli-particle sli-particle-${i} absolute rounded-full bg-intro-particle`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}px`,
              height: `${p.s}px`,
              boxShadow: "0 0 8px var(--intro-particle-glow)",
            }}
          />
        ))}
      </div>

      {/* Orbital Rings + Logo Frame */}
      <div className="relative aspect-square w-[min(88vw,88vh,740px)] flex items-center justify-center">
        <svg
          className="sli-rings-wrap absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 700 700"
          fill="none"
          aria-hidden="true"
        >
          {RINGS.map((cfg, i) => (
            <circle
              key={i}
              className={`sli-ring sli-ring-${i} stroke-intro-ring`}
              cx="350"
              cy="350"
              r={cfg.r}
              strokeWidth={cfg.width}
              strokeLinecap="round"
              transform={`rotate(${-90 + i * 18} 350 350)`}
              style={{ filter: "drop-shadow(0 0 5px var(--intro-ring-glow))" }}
            />
          ))}
        </svg>

        {/* Logo Container (Uncropped, crisp, perfectly sized) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[58%] sm:w-[52%] max-w-[440px] aspect-square overflow-hidden flex items-center justify-center">
            <img
              src={starLogo}
              alt="Star Furniture — Comfort, Quality, Trust"
              className="sli-logo block w-full h-full object-contain select-none will-change-transform drop-shadow-[0_12px_30px_rgba(23,105,170,0.14)]"
              draggable={false}
            />
            {/* Shimmer Light Sweep */}
            <div className="sli-sweep pointer-events-none absolute inset-y-[-20%] left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[14px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export { StarLogoIntro };
