import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: 'sofas',
    name: 'SOFAS',
    count: '3 Seater, 5 Seater, L-Shape',
    image: '/assets/products/product_1.jpg',
  },
  {
    id: 'beds',
    name: 'BEDS',
    count: 'King & Queen Solid Teak Cots',
    image: '/assets/products/product_5.jpg',
  },
  {
    id: 'dining',
    name: 'DINING',
    count: '4, 6 & 8-Seater Sets',
    image: '/assets/products/product_8.jpg',
  },
  {
    id: 'wardrobes',
    name: 'WARDROBES',
    count: '2, 3 & 4 Door Solid Wood Beros',
    image: '/assets/products/product_11.jpg',
  },
  {
    id: 'chairs',
    name: 'CHAIRS',
    count: 'Carved Armchairs & Easy Chairs',
    image: '/assets/products/product_14.jpg',
  },
  {
    id: 'tables',
    name: 'TABLES',
    count: 'Center Tables & Teapoys',
    image: '/assets/products/product_16.jpg',
  },
  {
    id: 'swings',
    name: 'SWINGS',
    count: 'Traditional Living Room Swings',
    image: '/assets/products/product_15.jpg',
  },
];

export const CategorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Category Cards Reveal
      const cards = gridRef.current?.querySelectorAll('.category-card-box') || [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = () => {
    const target = document.querySelector('#collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#F7F8F6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2E9B4B]" />
            <span>CURATED SANCTUARIES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
            EXPLORE THE <span className="text-[#1769AA]">COLLECTION</span>
          </h2>

          <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-5" />
        </div>

        {/* Categories Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={handleCategoryClick}
              className="category-card-box group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-[#071E34]"
            >
              {/* Image with zoom on hover */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E4F]/95 via-[#0B2E4F]/40 to-transparent group-hover:from-[#0B2E4F]/98 transition-colors duration-300" />

              {/* Top Index */}
              <div className="absolute top-4 left-4 z-10 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-sans text-[10px] font-bold tracking-widest uppercase">
                0{idx + 1}
              </div>

              {/* Title shifts upward, arrow appears */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end transform transition-transform duration-300 group-hover:-translate-y-1">
                <span className="font-sans text-[9px] font-bold tracking-widest text-[#2E9B4B] uppercase">
                  TEAK SUITE
                </span>

                <h3 className="font-display text-2xl font-bold text-white tracking-wide mt-1">
                  {cat.name}
                </h3>

                <p className="font-sans text-xs text-[#EEF1EF]/80 mt-1 leading-snug">
                  {cat.count}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-white font-sans text-[11px] font-bold tracking-wider">
                  <span className="group-hover:text-[#2E9B4B] transition-colors uppercase">
                    VIEW RANGE
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/15 group-hover:bg-[#2E9B4B] flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
