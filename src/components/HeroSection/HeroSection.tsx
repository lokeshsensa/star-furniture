import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const MEMBER_SLIDES = [
  {
    id: 1,
    src: '/assets/team/member_1.png',
    alt: 'Star Furniture Leadership — Member 1',
  },
  {
    id: 2,
    src: '/assets/team/member_2.png',
    alt: 'Star Furniture Leadership — Member 2',
  },
];

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [imagesReady, setImagesReady] = useState<boolean>(false);

  // Preload images
  useEffect(() => {
    let count = 0;
    MEMBER_SLIDES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        count += 1;
        if (count === MEMBER_SLIDES.length) setImagesReady(true);
      };
      img.onerror = () => {
        count += 1;
        if (count === MEMBER_SLIDES.length) setImagesReady(true);
      };
    });
  }, []);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(slide1Ref.current, { opacity: 1, zIndex: 2 });
      gsap.set(slide2Ref.current, { opacity: 0, zIndex: 1 });
      gsap.set(img1Ref.current, { scale: 1.0 });
      gsap.set(img2Ref.current, { scale: 1.08 });

      // Animate Hero text in with GSAP (opacity 0 -> 1, y 30 -> 0)
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Master 2-Second Infinite Slideshow Timeline
      // Slide 1 (2.0s hold) -> 1.3s cinematic transition -> Slide 2 (2.0s hold) -> 1.3s transition -> repeat
      const tl = gsap.timeline({
        repeat: -1,
      });

      tl
        // Hold Slide 1 for 2.0s
        .to({}, {
          duration: 2.0,
          onStart: () => setActiveSlide(0),
        })

        // Transition Slide 1 -> Slide 2 (1.3s duration, power3.inOut)
        // Outgoing: opacity 1 -> 0, scale 1.05 -> 1.0
        // Incoming: opacity 0 -> 1, scale 1.08 -> 1.0
        .add(() => {
          if (slide2Ref.current) slide2Ref.current.style.zIndex = '3';
          if (slide1Ref.current) slide1Ref.current.style.zIndex = '2';
        })
        .to(slide1Ref.current, {
          opacity: 0,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't1')
        .to(img1Ref.current, {
          scale: 1.05,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't1')
        .fromTo(slide2Ref.current, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't1')
        .fromTo(img2Ref.current, {
          scale: 1.08,
        }, {
          scale: 1.0,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't1')
        .set({}, {
          onComplete: () => {
            setActiveSlide(1);
            if (slide1Ref.current) slide1Ref.current.style.zIndex = '1';
            if (slide2Ref.current) slide2Ref.current.style.zIndex = '2';
            gsap.set(img1Ref.current, { scale: 1.0 });
          },
        })

        // Hold Slide 2 for 2.0s
        .to({}, { duration: 2.0 })

        // Transition Slide 2 -> Slide 1 (1.3s duration, power3.inOut)
        .add(() => {
          if (slide1Ref.current) slide1Ref.current.style.zIndex = '3';
          if (slide2Ref.current) slide2Ref.current.style.zIndex = '2';
        })
        .to(slide2Ref.current, {
          opacity: 0,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't2')
        .to(img2Ref.current, {
          scale: 1.05,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't2')
        .fromTo(slide1Ref.current, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't2')
        .fromTo(img1Ref.current, {
          scale: 1.08,
        }, {
          scale: 1.0,
          duration: 1.3,
          ease: 'power3.inOut',
        }, 't2')
        .set({}, {
          onComplete: () => {
            setActiveSlide(0);
            if (slide2Ref.current) slide2Ref.current.style.zIndex = '1';
            if (slide1Ref.current) slide1Ref.current.style.zIndex = '2';
            gsap.set(img2Ref.current, { scale: 1.0 });
          },
        });

    }, heroRef);

    return () => ctx.revert();
  }, [imagesReady]);

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="hero relative w-full h-[100vh] min-h-[100vh] bg-[#071E34] overflow-hidden select-none m-0 p-0"
    >
      {/* ========================================================
          SLIDE 1 (Member 1) — Fullscreen Cover Image
          ======================================================== */}
      <div
        ref={slide1Ref}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity]"
      >
        <img
          ref={img1Ref}
          src={MEMBER_SLIDES[0].src}
          alt={MEMBER_SLIDES[0].alt}
          className="w-full h-full object-cover object-center select-none will-change-transform"
          draggable={false}
        />
      </div>

      {/* ========================================================
          SLIDE 2 (Member 2) — Fullscreen Cover Image
          ======================================================== */}
      <div
        ref={slide2Ref}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity]"
      >
        <img
          ref={img2Ref}
          src={MEMBER_SLIDES[1].src}
          alt={MEMBER_SLIDES[1].alt}
          className="w-full h-full object-cover object-center select-none will-change-transform"
          draggable={false}
        />
      </div>

      {/* Subtle Overlay for Contrast & Navbar Readability */}
      <div className="absolute inset-0 pointer-events-none z-[5] bg-gradient-to-t from-black/60 via-black/15 to-black/40" />

      {/* Minimal Elegant Hero Text (Safe bottom-left area away from face) */}
      <div
        ref={textRef}
        className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8 md:left-12 z-[10] max-w-lg pointer-events-auto"
      >
        <p className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#2E9B4B] uppercase">
          STAR FURNITURE
        </p>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mt-1 leading-tight uppercase">
          CRAFTED FOR <span className="text-[#1769AA]">COMFORT</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm text-[#EEF1EF]/90 mt-2 font-normal leading-relaxed max-w-sm">
          Premium Teak Wood Furniture
        </p>

        <div className="mt-5">
          <a
            href="#collection"
            onClick={handleExplore}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1769AA] text-white text-xs font-bold tracking-wider hover:bg-[#0B2E4F] transition-all duration-300 shadow-lg group cursor-pointer"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#2E9B4B] transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Minimal Slide Indicator (Bottom-Right: 01 / 02) */}
      <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-8 md:right-12 z-[10] flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white pointer-events-none">
        <span className="font-sans text-xs font-extrabold tracking-wider text-white">
          0{activeSlide + 1}
        </span>
        <span className="font-sans text-xs text-white/40">/</span>
        <span className="font-sans text-xs font-semibold tracking-wider text-white/60">
          02
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
