import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Heart } from 'lucide-react';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const AboutView: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        );
      }

      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <main ref={sectionRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div ref={heroRef} className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          HERITAGE & CRAFTSMANSHIP
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1E293B] mt-2">
          About Star Furniture
        </h1>
        <p className="text-[#64748B] text-base sm:text-lg font-light mt-4 leading-relaxed">
          Creating comfortable, timeless furniture engineered to elevate your daily life.
        </p>
      </div>

      {/* Main Story Grid */}
      <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] bg-white/40">
          <img
            src={getPublicAsset('assets/reveal2.jpg')}
            alt="Star Furniture Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.3)] via-transparent to-transparent" />
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2 leading-tight">
            Furniture Made for Living
          </h2>
          <p className="mt-5 text-base text-[#475569] font-light leading-relaxed">
            At Star Furniture, we believe furniture should be more than beautiful. It should be comfortable, durable, and designed to become an enduring backdrop to family memories.
          </p>
          <p className="mt-3 text-sm text-[#64748B] font-light leading-relaxed">
            Every dining table slab, sofa frame, and headboard is built from select kiln-dried timber, finished with organic moisture barriers and hand-turned joinery.
          </p>
        </div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-[32px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-md">
          <Award className="w-8 h-8 text-[#065BB6] mb-4" />
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">Quality First</h3>
          <p className="text-xs text-[#64748B] font-light mt-3 leading-relaxed">
            Solid American walnut, Belgian boucle, and German hardware ensure lasting structural integrity.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-md">
          <Heart className="w-8 h-8 text-[#0D9488] mb-4" />
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">Ergonomic Comfort</h3>
          <p className="text-xs text-[#64748B] font-light mt-3 leading-relaxed">
            Contoured lumbar angles and high-resilience down padding engineered for daily relaxation.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-md">
          <ShieldCheck className="w-8 h-8 text-[#065BB6] mb-4" />
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">10-Year Warranty</h3>
          <p className="text-xs text-[#64748B] font-light mt-3 leading-relaxed">
            Every timber frame is backed by a 10-year structural warranty and dedicated customer service.
          </p>
        </div>
      </div>
    </main>
  );
};
