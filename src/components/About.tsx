import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Compass, ShieldCheck } from 'lucide-react';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // 1. Heading Reveal: y 50 -> 0, opacity 0 -> 1
      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          0.0
        );
      }

      // 2. Image Reveal: scale 1.06 -> 1, opacity 0 -> 1
      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.15
        );
      }

      // 3. Statistics Cards Reveal: y 30 -> 0, opacity 0 -> 1 with stagger
      if (statsContainerRef.current && statsContainerRef.current.children.length > 0) {
        tl.fromTo(
          statsContainerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
          },
          0.35
        );
      }
    },
    { scope: sectionRef }
  );

  const stats = [
    { value: '15+', label: 'YEARS OF EXPERIENCE', icon: Award },
    { value: '500+', label: 'DESIGNS', icon: Compass },
    { value: '1000+', label: 'HAPPY CUSTOMERS', icon: Users },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      {/* Background Liquid Blob */}
      <div className="liquid-blob blob-blue w-[550px] h-[550px] top-1/2 left-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Store / Furniture Imagery */}
          <div ref={leftColRef} className="lg:col-span-6 relative">
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] aspect-[4/3] bg-white/40">
              <img
                src={getPublicAsset('assets/reveal2.jpg')}
                alt="Star Furniture Store Atmosphere"
                className="w-full h-full object-cover transform hover:scale-[1.04] transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.35)] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 p-6 rounded-3xl bg-[rgba(255,255,255,0.8)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#065BB6] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1E293B]">Star Quality Promise</div>
                  <div className="text-xs text-[#64748B]">Comfort • Quality • Trust</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Copy & Statistics Glass Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div ref={headingRef}>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
                ABOUT STAR FURNITURE
              </span>
              
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] mt-3 leading-tight">
                Comfort. Quality. Trust.
              </h2>

              <h3 className="font-serif text-2xl text-[#065BB6] mt-4 font-semibold">
                Furniture Made for Living
              </h3>

              <p className="mt-4 text-base sm:text-lg text-[#475569] font-light leading-relaxed">
                At Star Furniture, we believe furniture should be more than beautiful. It should be comfortable, durable and designed to become part of your everyday life.
              </p>
            </div>

            {/* Statistics Cards Grid */}
            <div ref={statsContainerRef} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-[rgba(255,255,255,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
                  >
                    <IconComponent className="w-5 h-5 text-[#065BB6] mb-2" />
                    <div className="font-serif font-bold text-3xl text-[#1E293B]">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
