import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import starLogo from "../../assets/star-furniture-logo.png";

type StarLogoIntroProps = {
  onComplete?: () => void;
};

const RINGS = [
  { r: 196, duration: 1.5, at: 0.7, opacity: 0.42, width: 1 },
  { r: 224, duration: 1.7, at: 1.0, opacity: 0.32, width: 0.9 },
  { r: 252, duration: 1.9, at: 1.2, opacity: 0.26, width: 0.8 },
  { r: 282, duration: 2.1, at: 1.7, opacity: 0.2, width: 0.7 },
  { r: 314, duration: 2.3, at: 2.0, opacity: 0.14, width: 0.6 },
];

const PARTICLES = [
  { x: 22, y: 30, s: 2.2, d: 0.0 },
  { x: 78, y: 26, s: 1.6, d: 0.2 },
  { x: 34, y: 70, s: 1.9, d: 0.35 },
  { x: 66, y: 76, s: 1.4, d: 0.5 },
  { x: 14, y: 52, s: 1.5, d: 0.15 },
  { x: 88, y: 58, s: 2.0, d: 0.4 },
  { x: 44, y: 18, s: 1.3, d: 0.6 },
  { x: 58, y: 88, s: 1.7, d: 0.25 },
  { x: 28, y: 44, s: 1.2, d: 0.7 },
  { x: 72, y: 44, s: 1.8, d: 0.1 },
  { x: 50, y: 8, s: 1.3, d: 0.55 },
  { x: 8, y: 78, s: 1.4, d: 0.65 },
  { x: 92, y: 82, s: 1.5, d: 0.3 },
  { x: 38, y: 92, s: 1.2, d: 0.45 },
  { x: 82, y: 14, s: 1.6, d: 0.75 },
  { x: 18, y: 12, s: 1.3, d: 0.85 },
];

export const StarLogoIntro: React.FC<StarLogoIntroProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = (self.selector as (s: string) => Element[]) || ((s: string) => rootRef.current?.querySelectorAll(s));
      const ringPaths = (q(".sli-ring") as unknown as SVGCircleElement[]) || [];

      gsap.set(q(".sli-atmosphere"), { opacity: 0, scale: 0.8 });
      gsap.set(q(".sli-core"), { opacity: 0, scale: 0.6 });
      gsap.set(q(".sli-particle"), { opacity: 0, scale: 0.4 });
      gsap.set(q(".sli-logo"), {
        opacity: 0,
        scale: 0.90,
        filter: "blur(14px)",
      });
      gsap.set(q(".sli-sweep"), { opacity: 0, xPercent: -160, rotate: 8 });
      gsap.set(q(".sli-rings-wrap"), { scale: 0.94, opacity: 1 });

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

      tl.to(q(".sli-atmosphere"), { opacity: 1, scale: 1, duration: 1.4 }, 0.4)
        .to(q(".sli-core"), { opacity: 1, scale: 1, duration: 1.2 }, 0.5);

      PARTICLES.forEach((p, i) => {
        const el = q(".sli-particle")[i];
        if (!el) return;
        tl.to(
          el,
          {
            opacity: gsap.utils.random(0.25, 0.6, 0.01),
            scale: 1,
            y: gsap.utils.random(-18, -6),
            duration: 1.2,
            ease: "sine.out",
          },
          0.65 + p.d * 0.4
        ).to(el, { opacity: 0, duration: 1.1, ease: "sine.inOut" }, 2.3 + p.d * 0.3);
      });

      RINGS.forEach((cfg, i) => {
        const ring = ringPaths[i];
        if (!ring) return;
        tl.to(ring, { opacity: cfg.opacity, duration: 0.5, ease: "sine.out" }, cfg.at)
          .to(
            ring,
            { strokeDashoffset: 0, duration: cfg.duration, ease: "power2.inOut" },
            cfg.at
          );
      });

      tl.to(
        q(".sli-logo"),
        {
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        },
        1.2
      )
        .to(
          q(".sli-logo"),
          { filter: "blur(0px)", scale: 1, duration: 0.9, ease: "power2.out" },
          1.3
        )
        .to(q(".sli-sweep"), { opacity: 1, duration: 0.25, ease: "sine.out" }, 2.3)
        .to(q(".sli-sweep"), { xPercent: 160, duration: 1.0, ease: "power1.inOut" }, 2.3)
        .to(q(".sli-sweep"), { opacity: 0, duration: 0.35, ease: "sine.in" }, 3.0)
        .to(q(".sli-rings-wrap"), { scale: 1, duration: 1.0, ease: "power2.out" }, 2.8)
        .to(q(".sli-atmosphere"), { opacity: 0.55, duration: 0.9 }, 2.8)
        .to(q(".sli-core"), { opacity: 0.4, duration: 0.9 }, 2.8)
        .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 3.6);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex min-h-screen w-screen items-center justify-center overflow-hidden bg-white select-none pointer-events-auto"
    >
      {/* atmospheric blue glow */}
      <div className="sli-atmosphere pointer-events-none absolute h-[110vmin] w-[110vmin] rounded-full bg-intro-atmosphere blur-[60px]" />
      <div className="sli-core pointer-events-none absolute h-[40vmin] w-[40vmin] rounded-full bg-intro-core blur-[40px]" />

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
              boxShadow: "0 0 6px var(--intro-particle-glow)",
            }}
          />
        ))}
      </div>

      {/* rings + logo */}
      <div className="relative aspect-square w-[min(86vw,86vh,760px)] flex items-center justify-center">
        <svg
          className="sli-rings-wrap absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 700 700"
          fill="none"
          aria-hidden="true"
        >
          {RINGS.map((cfg, i) => (
            <circle
              key={i}
              className="sli-ring stroke-intro-ring"
              cx="350"
              cy="350"
              r={cfg.r}
              strokeWidth={cfg.width}
              strokeLinecap="round"
              transform={`rotate(${-90 + i * 18} 350 350)`}
              style={{ filter: "drop-shadow(0 0 4px var(--intro-ring-glow))" }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative aspect-square w-[56%] sm:w-[52%] max-w-[440px] overflow-hidden rounded-3xl flex items-center justify-center">
            <img
              src={starLogo}
              alt="Star Furniture — Comfort, Quality, Trust"
              className="sli-logo block h-full w-full select-none object-contain will-change-transform drop-shadow-[0_10px_25px_rgba(23,105,170,0.12)]"
              draggable={false}
            />
            <div className="sli-sweep pointer-events-none absolute inset-y-[-20%] left-0 w-1/3 bg-intro-sweep blur-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarLogoIntro;
