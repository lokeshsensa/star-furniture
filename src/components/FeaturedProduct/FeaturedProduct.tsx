import React from 'react';
import { ShieldCheck, Gem, Armchair, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl } from '../../data/products';

export const FeaturedProduct: React.FC = () => {
  const features = [
    {
      icon: Gem,
      title: 'PREMIUM TEAK WOOD',
      desc: '100% Pure Teak Wood for lasting strength & natural resistance.',
    },
    {
      icon: ShieldCheck,
      title: 'DURABLE & LONG LASTING',
      desc: 'Built to last generations with superior joinery quality.',
    },
    {
      icon: Sparkles,
      title: 'ELEGANT DESIGN',
      desc: 'Timeless craftsmanship that enhances any living space.',
    },
    {
      icon: Armchair,
      title: 'STRONG & RELIABLE',
      desc: 'Sturdy, stylish & crafted for everyday family comfort.',
    },
  ];

  return (
    <section id="featured-product" className="py-14 sm:py-20 bg-[#EEF1EF]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Large Image (50/50 Desktop) */}
          <div className="lg:col-span-6 order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#FFFFFF] border border-[#EEF1EF] p-2 sm:p-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#071E34]">
                <img
                  src="/assets/products/product_3.jpg"
                  alt="The Art of Teak - STAR 5 Seater Sofa"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#0B2E4F]/85 backdrop-blur-md text-[#FFFFFF] font-sans text-[10px] font-bold tracking-widest uppercase">
                  MASTERPIECE SPOTLIGHT
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE ART OF TEAK, description, features, ENQUIRE */}
          <div className="lg:col-span-6 order-2 space-y-6">
            <div>
              <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#1769AA] uppercase">
                MATERIAL INTEGRITY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight mt-1">
                THE ART OF TEAK
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[#1769AA] mt-1.5">
                "Natural warmth. Exceptional strength. Timeless character."
              </p>
            </div>

            {/* 4 Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EEF1EF] shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0B2E4F] text-[#2E9B4B] flex items-center justify-center mb-2.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-sans text-xs font-bold tracking-wider text-[#111111] uppercase">
                      {feat.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#4A5568] mt-1 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl('5 Seater Teak Wood Sofa')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1769AA] text-[#FFFFFF] text-xs sm:text-sm font-bold tracking-wider hover:bg-[#0B2E4F] transition-all duration-300 shadow-sm group"
              >
                <MessageSquare className="w-4 h-4 text-[#FFFFFF]" />
                <span>ENQUIRE ABOUT THIS PIECE</span>
                <ArrowUpRight className="w-4 h-4 text-[#2E9B4B] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
