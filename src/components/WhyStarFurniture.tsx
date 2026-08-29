import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Heart, Clock, Award } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const WhyStarFurniture: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardsRef.current && cardsRef.current.children.length > 0) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const pillars = [
    {
      title: 'Premium Quality',
      description: 'Hand-selected American hardwoods, Belgian weaves, and precision German hardware joinery.',
      icon: Award,
    },
    {
      title: 'Comfort First',
      description: 'Ergonomically contoured seat depths and high-density memory foam for relaxing moments.',
      icon: Heart,
    },
    {
      title: 'Trusted Service',
      description: 'Direct WhatsApp assistance, transparent pricing, and 10-year structural warranty on timber.',
      icon: ShieldCheck,
    },
    {
      title: 'Wide Selection',
      description: 'Over 500+ bespoke furniture designs curated for living rooms, bedrooms, and dining spaces.',
      icon: Clock,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          OUR COMMITMENT
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
          Why Choose Star Furniture?
        </h2>
        <p className="text-[#64748B] text-base font-light mt-2">
          Crafting trust, comfort, and enduring elegance since 2011.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="p-8 rounded-[32px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[rgba(6,91,182,0.08)] text-[#065BB6] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#1E293B]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#64748B] font-light leading-relaxed mt-3">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
