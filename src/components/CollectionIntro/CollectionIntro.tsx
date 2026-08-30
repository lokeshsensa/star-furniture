import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CollectionIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F8F6] text-center relative overflow-hidden">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-[11px] font-bold tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#2E9B4B]" />
          <span>THE STAR COLLECTION</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
          TIMELESS FURNITURE. <span className="text-[#1769AA]">CRAFTED TO LAST.</span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#4A5568] max-w-2xl mx-auto font-normal leading-relaxed">
          Discover premium teak wood furniture designed with comfort, craftsmanship and lasting quality in mind.
        </p>

        <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-6" />
      </div>
    </section>
  );
};

export default CollectionIntro;
