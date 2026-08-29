import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { collectionsData } from '../data/products';
import { useShop } from '../context/ShopContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const CollectionsView: React.FC = () => {
  const { navigateToCategory } = useShop();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll('.collection-item');
      if (items && items.length > 0) {
        items.forEach((item) => {
          const imgFrame = item.querySelector('.img-reveal-frame');
          const img = item.querySelector('.img-reveal-target');
          const content = item.querySelector('.collection-content');

          if (imgFrame && img && content) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true,
              },
            });

            // GSAP clip-path Image Reveal (inset(0 100% 0 0) -> inset(0 0% 0 0))
            tl.fromTo(
              imgFrame,
              { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
              { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power3.out' },
              0.0
            );

            tl.fromTo(
              img,
              { scale: 1.08 },
              { scale: 1, duration: 1.3, ease: 'power3.out' },
              0.0
            );

            tl.fromTo(
              content,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
              0.3
            );
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <main ref={sectionRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          CURATED SUITES
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] mt-2">
          Design Collections
        </h1>
        <p className="text-[#64748B] text-base font-light mt-3">
          Explore unified architectural suites designed to harmonize your entire home.
        </p>
      </div>

      <div className="space-y-16">
        {collectionsData.map((col, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={col.id}
              className={`collection-item grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-[40px] bg-[rgba(255,255,255,0.65)] backdrop-blur-2xl border border-[rgba(255,255,255,0.9)] shadow-xl ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Column with Clip-Path Reveal */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? '' : 'lg:order-2'
                }`}
              >
                <div className="img-reveal-frame relative aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 border border-[rgba(255,255,255,0.9)]">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="img-reveal-target w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.4)] via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Text Content Column */}
              <div
                className={`collection-content lg:col-span-5 flex flex-col justify-center ${
                  isEven ? '' : 'lg:order-1'
                }`}
              >
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
                  {col.subtitle}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
                  {col.name}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-[#475569] font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="mt-8">
                  <button
                    onClick={() => navigateToCategory(col.name)}
                    className="group px-7 py-3.5 rounded-full bg-[#065BB6] hover:bg-[#0F4B9C] text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
                  >
                    <span>EXPLORE {col.name}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
