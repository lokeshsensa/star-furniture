import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const PromoBanner: React.FC = () => {
  const bannerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (imgRef.current && contentRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        tl.fromTo(
          imgRef.current,
          { scale: 1.12, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
          0.0
        );

        tl.fromTo(
          contentRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
          0.3
        );
      }
    },
    { scope: bannerRef }
  );

  return (
    <section ref={bannerRef} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-[36px] overflow-hidden bg-slate-900 text-white min-h-[420px] flex items-center shadow-2xl border border-white/20">
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <img
            ref={imgRef}
            src={getPublicAsset('assets/hero.jpg')}
            alt="Transform Your Space - Star Furniture"
            className="w-full h-full object-cover transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent" />
        </div>

        {/* Content Box */}
        <div ref={contentRef} className="relative z-10 p-8 sm:p-14 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEASONAL HIGHLIGHT</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Transform Your Space
          </h2>

          <p className="mt-4 text-base text-slate-200 font-light leading-relaxed">
            Furniture made for modern living. Elevate your home with timeless craftsmanship, organic walnut timbers, and ergonomic luxury cushions.
          </p>

          <div className="mt-8">
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#20B84B] hover:bg-[#19943C] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[rgba(32,184,75,0.3)] hover:scale-[1.02]"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
