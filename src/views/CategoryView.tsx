import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop } from '../context/ShopContext';
import { categoriesList, productsData } from '../data/products';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const CategoryView: React.FC = () => {
  const { activeCategory, navigateToProduct } = useShop();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoryMeta = categoriesList.find(
    (c) => c.name.toLowerCase() === activeCategory.toLowerCase()
  ) || categoriesList[0];

  const categoryProducts = productsData.filter(
    (p) => p.category.toLowerCase() === categoryMeta.name.toLowerCase()
  );

  useGSAP(
    () => {
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeCategory] }
  );

  return (
    <main ref={sectionRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative rounded-[36px] overflow-hidden aspect-[21/9] min-h-[260px] bg-slate-900 shadow-2xl mb-12 flex items-center p-8 sm:p-14 text-white">
        <img
          src={categoryMeta.image}
          alt={categoryMeta.name}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-0" />

        <div className="relative z-10 max-w-xl">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">
            CATEGORY SHOWCASE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-4">
            {categoryMeta.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-[#1E293B]">
          {categoryMeta.name} Catalogue ({categoryProducts.length})
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={navigateToProduct} />
        ))}
      </div>
    </main>
  );
};
