import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Craftsmanship: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale: 1.08 -> 1
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1.0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Text reveal: opacity 0 -> 1, x 50 -> 0
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDiscover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Furniture Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#EEF1EF] bg-[#071E34]">
              <img
                ref={imageRef}
                src="/assets/products/product_5.jpg"
                alt="Crafted With Purpose — Star Teak Wood Furniture"
                className="w-full h-full object-cover select-none will-change-transform"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#0B2E4F]/90 backdrop-blur-md border border-[#1769AA]/40 text-[#2E9B4B] font-sans text-[10px] font-bold tracking-widest uppercase">
                100% PURE TEAK
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Content */}
          <div ref={textRef} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-[11px] font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#2E9B4B]" />
              <span>THE ART OF WOODWORKING</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight uppercase">
              CRAFTED WITH <span className="text-[#1769AA]">PURPOSE</span>
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed font-normal">
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#111111]">Premium teak wood.</strong> Sourced and seasoned to prevent warping, moisture damage, and termites.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#111111]">Thoughtful design.</strong> Engineered for everyday relaxation, natural posture, and timeless living spaces.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#111111]">Exceptional craftsmanship.</strong> Hand-finished joinery built with master carpentry precision.</span>
              </p>
              <p className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#111111]">Built for everyday comfort.</strong> Enduring solid wood creations made to last across generations.</span>
              </p>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleDiscover}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0B2E4F] text-white text-xs font-bold tracking-wider hover:bg-[#1769AA] transition-all duration-300 shadow-md group cursor-pointer"
              >
                <span>DISCOVER MORE</span>
                <ArrowRight className="w-4 h-4 text-[#2E9B4B] transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
