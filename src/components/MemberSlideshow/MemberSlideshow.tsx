import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SLIDES = [
  {
    id: 1,
    src: '/assets/team/member_1.png',
    alt: 'Star Furniture Leadership — Member 1',
    objectPosition: 'center center',
  },
  {
    id: 2,
    src: '/assets/team/member_2.png',
    alt: 'Star Furniture Leadership — Member 2',
    objectPosition: 'center center',
  },
];

export const MemberSlideshow: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const fgImg1Ref = useRef<HTMLImageElement>(null);
  const fgImg2Ref = useRef<HTMLImageElement>(null);
  const bgImg1Ref = useRef<HTMLImageElement>(null);
  const bgImg2Ref = useRef<HTMLImageElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  // Preload both images to prevent any flashes or layout shifting
  useEffect(() => {
    let loaded = 0;
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
      img.onload = () => {
        loaded += 1;
        if (loaded === SLIDES.length) setImagesPreloaded(true);
      };
      img.onerror = () => {
        loaded += 1;
        if (loaded === SLIDES.length) setImagesPreloaded(true);
      };
    });
  }, []);

  useLayoutEffect(() => {
    if (!imagesPreloaded) return;

    const ctx = gsap.context(() => {
      // Initial visual states
      gsap.set(slide1Ref.current, { opacity: 1, zIndex: 2 });
      gsap.set(slide2Ref.current, { opacity: 0, zIndex: 1 });
      gsap.set([fgImg1Ref.current, fgImg2Ref.current], { scale: 1.0 });

      // Create Master Infinite Slideshow Timeline
      // 0.0s: Member 1 visible (slow zoom 1.00 -> 1.025 over 2.0s)
      // 2.0s -> 3.0s: Cinematic transition into Member 2
      // 3.0s: Member 2 visible (slow zoom 1.00 -> 1.025 over 2.0s)
      // 5.0s -> 6.0s: Cinematic transition into Member 1
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power3.inOut' },
      });

      tlRef.current = tl;

      tl
        // SLIDE 1 (0.0s - 2.0s): Slow Cinematic Zoom
        .to(fgImg1Ref.current, {
          scale: 1.025,
          duration: 2.0,
          ease: 'sine.out',
          onStart: () => setActiveSlide(0),
        })

        // TRANSITION 1 (2.0s - 3.0s): Slide 1 -> Slide 2
        .add(() => {
          if (slide2Ref.current) slide2Ref.current.style.zIndex = '3';
          if (slide1Ref.current) slide1Ref.current.style.zIndex = '2';
        })
        .to(slide1Ref.current, { opacity: 0, duration: 1.0 }, 'trans1')
        .fromTo(
          slide2Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0 },
          'trans1'
        )
        .fromTo(
          fgImg2Ref.current,
          { scale: 1.04 },
          { scale: 1.0, duration: 1.0 },
          'trans1'
        )
        .set({}, {
          onComplete: () => {
            setActiveSlide(1);
            if (slide1Ref.current) slide1Ref.current.style.zIndex = '1';
            if (slide2Ref.current) slide2Ref.current.style.zIndex = '2';
            gsap.set(fgImg1Ref.current, { scale: 1.0 });
          },
        })

        // SLIDE 2 (3.0s - 5.0s): Slow Cinematic Zoom
        .to(fgImg2Ref.current, {
          scale: 1.025,
          duration: 2.0,
          ease: 'sine.out',
        })

        // TRANSITION 2 (5.0s - 6.0s): Slide 2 -> Slide 1
        .add(() => {
          if (slide1Ref.current) slide1Ref.current.style.zIndex = '3';
          if (slide2Ref.current) slide2Ref.current.style.zIndex = '2';
        })
        .to(slide2Ref.current, { opacity: 0, duration: 1.0 }, 'trans2')
        .fromTo(
          slide1Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0 },
          'trans2'
        )
        .fromTo(
          fgImg1Ref.current,
          { scale: 1.04 },
          { scale: 1.0, duration: 1.0 },
          'trans2'
        )
        .set({}, {
          onComplete: () => {
            setActiveSlide(0);
            if (slide2Ref.current) slide2Ref.current.style.zIndex = '1';
            if (slide1Ref.current) slide1Ref.current.style.zIndex = '2';
            gsap.set(fgImg2Ref.current, { scale: 1.0 });
          },
        });

    }, containerRef);

    return () => ctx.revert();
  }, [imagesPreloaded]);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768 && tlRef.current) {
      tlRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768 && tlRef.current) {
      tlRef.current.play();
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100svh] min-h-[100svh] bg-[#FFFFFF] overflow-hidden select-none"
    >
      {/* ========================================================
          SLIDE 1 (Member 1)
          ======================================================== */}
      <div
        ref={slide1Ref}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity]"
      >
        {/* Layer A: Blurred Enlarged Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            ref={bgImg1Ref}
            src={SLIDES[0].src}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-[24px] scale-110 opacity-30 select-none"
          />
        </div>

        {/* Layer B: Crisp Full Foreground Portrait (object-contain = 100% visible, no crop) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-10 pt-16 sm:pt-20">
          <img
            ref={fgImg1Ref}
            src={SLIDES[0].src}
            alt={SLIDES[0].alt}
            className="w-full h-full max-h-[90vh] object-contain select-none will-change-transform drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
            style={{ objectPosition: SLIDES[0].objectPosition }}
            draggable={false}
          />
        </div>
      </div>

      {/* ========================================================
          SLIDE 2 (Member 2)
          ======================================================== */}
      <div
        ref={slide2Ref}
        className="absolute inset-0 w-full h-full overflow-hidden will-change-[opacity]"
      >
        {/* Layer A: Blurred Enlarged Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            ref={bgImg2Ref}
            src={SLIDES[1].src}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-[24px] scale-110 opacity-30 select-none"
          />
        </div>

        {/* Layer B: Crisp Full Foreground Portrait (object-contain = 100% visible, no crop) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-10 pt-16 sm:pt-20">
          <img
            ref={fgImg2Ref}
            src={SLIDES[1].src}
            alt={SLIDES[1].alt}
            className="w-full h-full max-h-[90vh] object-contain select-none will-change-transform drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)]"
            style={{ objectPosition: SLIDES[1].objectPosition }}
            draggable={false}
          />
        </div>
      </div>

      {/* Subtle Top & Bottom Cinematic Vignette for Text Readability */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

      {/* Minimal Slide Indicator (Bottom Right / Center) */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#EEF1EF] shadow-sm">
        <span className="font-sans text-[11px] font-extrabold tracking-widest text-[#0B2E4F]">
          0{activeSlide + 1}
        </span>
        <span className="w-4 h-[1.5px] bg-[#1769AA]/40" />
        <span className="font-sans text-[11px] font-semibold tracking-widest text-[#111111]/50">
          02
        </span>
        <div className="flex items-center gap-1.5 ml-1">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === 0 ? 'bg-[#1769AA] scale-125' : 'bg-[#111111]/25'
            }`}
          />
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === 1 ? 'bg-[#2E9B4B] scale-125' : 'bg-[#111111]/25'
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default MemberSlideshow;
