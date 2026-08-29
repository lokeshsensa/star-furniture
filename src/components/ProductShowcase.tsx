import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData, type Product } from '../data/products';
import { ProductCard } from './ProductCard';

gsap.registerPlugin(ScrollTrigger);

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Sofas', 'Beds', 'Dining Tables', 'Chairs', 'Wardrobes', 'TV Units', 'Coffee Tables', 'Home Furniture'];

  const filteredProducts = activeCategory === 'All'
    ? productsData
    : productsData.filter((p) => p.category === activeCategory);

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

      // Product Cards GSAP ScrollTrigger Reveal: y 100, opacity 0, scale 0.95 -> y 0, opacity 1, scale 1
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.product-card');
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
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
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="products" className="section-padding relative overflow-hidden">
      {/* Liquid Blob */}
      <div className="liquid-blob blob-blue w-[500px] h-[500px] top-1/4 -left-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
              BESPOKE CRAFTSMANSHIP
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] mt-2">
              Featured Furniture
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg font-light mt-2">
              Crafted to make every space feel like home.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === cat
                    ? 'bg-[#065BB6] text-white border-[#065BB6] shadow-md'
                    : 'bg-[rgba(255,255,255,0.6)] text-[#475569] border-[rgba(255,255,255,0.8)] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};
