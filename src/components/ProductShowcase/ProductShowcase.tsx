import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { productsData, type Product } from '../../data/products';

gsap.registerPlugin(ScrollTrigger);

interface ProductShowcaseProps {
  onOpenModal: (productId: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Product Cards Stagger Reveal
      const cards = gridRef.current?.querySelectorAll('.product-showcase-card') || [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 70, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.12,
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

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1769AA]/10 border border-[#1769AA]/20 text-[#1769AA] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2E9B4B]" />
            <span>Exquisite Teak Wood</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
            OUR <span className="text-[#1769AA]">COLLECTION</span>
          </h2>

          <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-5" />
        </div>

        {/* 3-Column Desktop, 2-Column Tablet, 1-Column Mobile Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {productsData.map((prod: Product) => (
            <div
              key={prod.id}
              onClick={() => onOpenModal(prod.id)}
              className="product-showcase-card group cursor-pointer rounded-2xl bg-white border border-[#EEF1EF] p-5 shadow-sm hover:shadow-xl hover:border-[#1769AA]/30 transition-all duration-500 ease-out flex flex-col justify-between transform hover:-translate-y-2"
            >
              <div>
                {/* Image Box with 1 -> 1.06 Hover Zoom */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#071E34] mb-5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-106"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2E4F]/85 backdrop-blur-sm border border-[#1769AA]/30 text-white font-sans text-[10px] font-bold tracking-widest uppercase">
                    {prod.category}
                  </div>
                </div>

                {/* Category & Name */}
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#1769AA] uppercase">
                  {prod.category}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#1769AA] transition-colors leading-snug mt-1">
                  {prod.name}
                </h3>

                {/* Short Description */}
                <p className="font-sans text-xs sm:text-sm text-[#4A5568] mt-2 line-clamp-2 leading-relaxed font-normal">
                  {prod.shortDescription}
                </p>
              </div>

              {/* View Details CTA (Arrow moves 6px right) */}
              <div className="pt-5 mt-4 border-t border-[#EEF1EF] flex items-center justify-between">
                <span className="font-sans text-xs font-bold tracking-wider text-[#111111] group-hover:text-[#1769AA] transition-colors uppercase">
                  VIEW DETAILS
                </span>

                <div className="w-8 h-8 rounded-full border border-[#EEF1EF] group-hover:border-[#1769AA] group-hover:bg-[#1769AA] group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
