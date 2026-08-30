import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categoriesList, type CategoryData } from '../../data/products';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (cat: CategoryData) => {
    onSelectCategory(cat.categoryKey);
    const target = document.querySelector('#product-collection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="category-showcase" className="py-14 sm:py-20 bg-[#EEF1EF]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-xs font-bold tracking-[0.25em] text-[#1769AA] uppercase mb-2">
            CURATED CATEGORIES
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
            TEAK SANCTUARIES
          </h2>
          <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-3" />
        </div>

        {/* Clean 2-column grid on desktop, 1-column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {categoriesList.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              className="group rounded-2xl bg-[#FFFFFF] border border-[#EEF1EF] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#1769AA]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Contained 4:3 Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0B2E4F] mb-5">
                  <img
                    src={cat.image}
                    alt={`STAR Furniture ${cat.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2E4F]/85 backdrop-blur-sm border border-[#1769AA]/40 text-[#FFFFFF] font-sans text-[10px] font-bold tracking-widest uppercase">
                    0{idx + 1} • {cat.itemCount} DESIGNS
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#1769AA] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2E9B4B]" />
                  <span className="font-sans text-[11px] font-bold tracking-widest uppercase">
                    COLLECTION
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] group-hover:text-[#1769AA] transition-colors leading-snug">
                  {cat.name}
                </h3>

                <p className="font-serif italic text-sm sm:text-base text-[#1769AA] mt-1">
                  "{cat.tagline}"
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#4A5568] mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#EEF1EF] flex items-center justify-between">
                <span className="font-sans text-xs font-bold tracking-wider text-[#111111] group-hover:text-[#1769AA] uppercase transition-colors">
                  EXPLORE {cat.name}
                </span>
                <div className="w-8 h-8 rounded-full border border-[#111111]/20 group-hover:border-[#1769AA] group-hover:bg-[#1769AA] group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
