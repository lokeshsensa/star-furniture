import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/products';

interface HeroProps {
  introFinished: boolean;
}

export const Hero: React.FC<HeroProps> = ({ introFinished }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Hero image reveal: opacity 0, scale 1.08 -> opacity 1, scale 1
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0.1
      );

      // 2. Eyebrow reveal
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );

      // 3. Heading line by line
      tl.fromTo(
        headingRef.current?.children ? Array.from(headingRef.current.children) : [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0, stagger: 0.12 },
        0.45
      );

      // 4. Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // 5. Buttons
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.95
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [introFinished]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#collection-intro');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-[100svh] pt-[90px] pb-12 sm:pb-16 flex items-center bg-[#F7F8F6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Eyebrow, Heading, Description, Buttons */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1769AA]" />
              <p className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#1769AA] uppercase">
                STAR METALS FURNITURE & ELECTRONICS • BHUVANAGIRI
              </p>
            </div>

            {/* Line by line Heading */}
            <h1
              ref={headingRef}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08]"
            >
              <span className="block">CRAFTED FOR</span>
              <span className="block text-[#1769AA]">COMFORT.</span>
              <span className="block text-[#2E9B4B]">BUILT TO LAST.</span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="font-sans text-base sm:text-lg text-[#4A5568] max-w-lg font-normal leading-relaxed"
            >
              Discover timeless furniture crafted to bring warmth, character and lasting elegance to every home.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection-intro"
                onClick={handleExploreClick}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#0B2E4F] text-[#FFFFFF] text-xs sm:text-sm font-bold tracking-widest hover:bg-[#1769AA] transition-all duration-300 shadow-md group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight className="w-4 h-4 text-[#2E9B4B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#1769AA]/40 text-[#0B2E4F] text-xs sm:text-sm font-bold tracking-widest hover:bg-[#1769AA] hover:text-[#FFFFFF] transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#1769AA] group-hover:text-white" />
                <span>CONTACT US</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Large Teak Furniture Image */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-lg bg-[#FFFFFF] border border-[#EEF1EF] p-2 sm:p-3">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#071E34]">
                <img
                  ref={imageRef}
                  src="/assets/products/product_1.jpg"
                  alt="STAR 5 Seater Teak Wood Sofa Collection"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute top-3 left-3 z-10 px-3.5 py-1 rounded-full bg-[#0B2E4F]/85 backdrop-blur-md border border-[#1769AA]/40 text-[#FFFFFF] font-sans text-[10px] font-bold tracking-widest uppercase">
                  100% PURE TEAK WOOD
                </div>

                <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-md bg-[#071E34]/85 backdrop-blur-sm text-[#EEF1EF] font-sans text-[11px] font-medium tracking-wide">
                  5 Seater Sofa Collection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
