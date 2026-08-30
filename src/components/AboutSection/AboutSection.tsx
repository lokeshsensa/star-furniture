import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, HeartHandshake, Hammer, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STANDARDS = [
  {
    icon: Shield,
    title: 'QUALITY',
    desc: 'Pure solid teak wood, rigorously verified for grain density and structural strength.',
  },
  {
    icon: Hammer,
    title: 'CRAFTSMANSHIP',
    desc: 'Master carpenters combining ancestral woodworking methods with precision joinery.',
  },
  {
    icon: HeartHandshake,
    title: 'COMFORT',
    desc: 'Contoured ergonomics and proportions tailored for effortless everyday living.',
  },
  {
    icon: CheckCircle,
    title: 'DURABILITY',
    desc: 'Multi-season resilience against humidity, wear, and time for lifelong peace of mind.',
  },
  {
    icon: Sparkles,
    title: 'TRUST',
    desc: 'Four decades of honest pricing, transparent sourcing, and thousands of happy homes.',
  },
];

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const items = cardsRef.current?.querySelectorAll('.standard-card-item') || [];
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#071E34] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#2E9B4B] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNCOMPROMISING PILLARS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            THE STAR <span className="text-[#2E9B4B]">STANDARD</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#EEF1EF]/80 mt-4 max-w-xl mx-auto font-normal leading-relaxed">
            The guiding principles that define every piece of furniture entering your home.
          </p>

          <div className="w-12 h-[2px] bg-[#2E9B4B] mx-auto mt-6" />
        </div>

        {/* 5 Standards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {STANDARDS.map((std, i) => {
            const Icon = std.icon;
            return (
              <div
                key={i}
                className="standard-card-item rounded-2xl bg-[#0B2E4F] border border-white/10 p-6 shadow-md hover:shadow-xl hover:border-[#2E9B4B]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#2E9B4B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wider uppercase">
                    {std.title}
                  </h3>
                  <p className="font-sans text-xs text-[#EEF1EF]/80 leading-relaxed">
                    {std.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold text-[#2E9B4B] tracking-widest uppercase">
                    CERTIFIED
                  </span>
                  <span className="font-sans text-[10px] text-white/40 font-bold">
                    0{i + 1}
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

export default AboutSection;
