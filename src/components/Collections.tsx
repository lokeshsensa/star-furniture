import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { collectionsData } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export const Collections: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      // Category Cards Staggered Animation
      // Initial: opacity 0, y 100, scale 0.92 -> opacity 1, y 0, scale 1
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collections" className="section-padding relative overflow-hidden">
      {/* Ambient Liquid Blob */}
      <div className="liquid-blob blob-green w-[520px] h-[520px] top-1/3 -right-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
            CURATED SELECTION
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] mt-3">
            Explore Our Collections
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg font-light mt-4">
            Everything you need to create a beautiful home.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {collectionsData.map((item) => (
            <a
              key={item.id}
              href="#products"
              className="group relative rounded-[32px] overflow-hidden bg-[rgba(255,255,255,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.85)] shadow-lg hover:shadow-2xl hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Subtle Blue Glow on Hover */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-[#065BB6]/0 via-[#065BB6]/0 to-[#065BB6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Large Image Container with Hover Zoom (scale 1 -> 1.06) */}
              <div className="relative w-full h-56 overflow-hidden rounded-t-[32px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.45)] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Count Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.75)] backdrop-blur-md text-[11px] font-medium text-[#1E293B] border border-[rgba(255,255,255,0.9)] shadow-sm">
                  {item.itemCount} Designs
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#1E293B] group-hover:text-[#065BB6] transition-colors uppercase tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#64748B] font-light mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="mt-5 pt-4 border-t border-[rgba(6,91,182,0.08)] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#065BB6]">
                    Browse {item.name}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[rgba(6,91,182,0.08)] group-hover:bg-[#065BB6] text-[#065BB6] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-[rgba(255,255,255,0.9)]">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
