import React from 'react';
import { horizontalCollection, getWhatsAppUrl } from '../../data/products';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

export const HorizontalGallery: React.FC = () => {
  return (
    <section
      id="horizontal-gallery"
      className="py-14 sm:py-20 bg-[#0B2E4F] text-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-end justify-between border-b border-[#1769AA]/30 pb-4">
          <div>
            <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#2E9B4B] uppercase">
              SHOWROOM HIGHLIGHTS
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] mt-1">
              THE SIGNATURE SUITES
            </h2>
          </div>
          <span className="hidden sm:inline font-sans text-xs tracking-widest text-[#EEF1EF]/70 uppercase">
            SCROLL HORIZONTALLY →
          </span>
        </div>
      </div>

      {/* Horizontal Overflow Track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
          {horizontalCollection.map((item) => (
            <div
              key={item.number}
              className="snap-center flex-shrink-0 w-[85vw] sm:w-[480px] lg:w-[420px] rounded-2xl bg-[#071E34] border border-[#1769AA]/30 p-5 flex flex-col justify-between shadow-lg hover:border-[#2E9B4B]/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-bold text-xl text-[#2E9B4B]">
                    {item.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1769AA] text-[#FFFFFF] font-sans text-[9px] font-bold tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>

                {/* 4:3 Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0B2E4F] mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#071E34]/85 text-[#2E9B4B] font-sans text-[9px] font-bold tracking-widest uppercase">
                    100% TEAK
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFFFFF] leading-snug">
                  {item.title}
                </h3>

                <p className="font-serif italic text-xs sm:text-sm text-[#2E9B4B] mt-1">
                  "{item.subtitle}"
                </p>

                <p className="font-sans text-xs text-[#EEF1EF]/80 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#1769AA]/20">
                <a
                  href={getWhatsAppUrl(item.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2E9B4B] text-[#FFFFFF] text-xs font-bold tracking-wider hover:bg-[#1E7E34] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ENQUIRE ITEM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
