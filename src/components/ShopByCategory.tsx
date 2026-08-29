import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { categoriesList } from '../data/products';
import { useShop } from '../context/ShopContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ShopByCategory: React.FC = () => {
  const { navigateToCategory } = useShop();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          CATALOGUE EXPLORER
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
          Shop By Category
        </h2>
        <p className="text-[#64748B] text-sm sm:text-base font-light mt-2">
          Explore curated furniture designed for every room in your home.
        </p>
      </div>

      {/* Rounded Circular Category Images Grid (Exact layout inspiration from reference screenshots) */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 justify-items-center"
      >
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateToCategory(cat.name)}
            className="group flex flex-col items-center cursor-pointer text-center"
          >
            {/* Circular Image Container with Liquid Morphism Ring */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#065BB6]/20 via-[#0D9488]/20 to-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden border border-[rgba(255,255,255,0.9)]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Category Name */}
            <h4 className="mt-3 font-serif font-semibold text-xs sm:text-sm text-[#1E293B] group-hover:text-[#065BB6] transition-colors flex items-center gap-1">
              <span>{cat.name}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" />
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};
