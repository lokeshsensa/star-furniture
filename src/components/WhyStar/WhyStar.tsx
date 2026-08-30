import React from 'react';
import { Gem, ShieldCheck, Sparkles, Armchair } from 'lucide-react';

export const WhyStar: React.FC = () => {
  const pillars = [
    {
      icon: Gem,
      title: 'PREMIUM TEAK WOOD',
      desc: '100% Pure Teak Wood for lasting strength',
    },
    {
      icon: ShieldCheck,
      title: 'DURABLE & LONG LASTING',
      desc: 'Built to last generations with superior quality',
    },
    {
      icon: Sparkles,
      title: 'ELEGANT DESIGN',
      desc: 'Timeless craftsmanship that enhances any space',
    },
    {
      icon: Armchair,
      title: 'STRONG & RELIABLE',
      desc: 'Sturdy, stylish & made for everyday use',
    },
  ];

  return (
    <section id="why-star" className="py-14 sm:py-20 bg-[#F7F8F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#1769AA] uppercase">
            DISTINCTION & QUALITY
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mt-1">
            WHY CHOOSE STAR?
          </h2>
          <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-3" />
        </div>

        {/* 4-column desktop, 2-column tablet, 1-column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EEF1EF] hover:border-[#1769AA]/40 transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B2E4F] text-[#2E9B4B] flex items-center justify-center shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-display font-bold text-base text-[#1769AA]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-sans text-xs sm:text-sm font-bold tracking-wider text-[#111111] uppercase mb-1.5">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-[#4A5568] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#EEF1EF] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B4B]" />
                  <span className="font-sans text-[9px] font-bold tracking-widest text-[#1769AA] uppercase">
                    STAR STANDARD
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
