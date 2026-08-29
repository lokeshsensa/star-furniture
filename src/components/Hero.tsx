import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Sparkles, Award } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial State Setup
      gsap.set(headingRef.current, { y: 60, opacity: 0 });
      gsap.set(descriptionRef.current, { y: 35, opacity: 0 });
      gsap.set(buttonsRef.current, { y: 25, opacity: 0 });
      gsap.set(imageFrameRef.current, { scale: 1.08, opacity: 0 });
      gsap.set(glassCardRef.current, { y: 30, opacity: 0 });

      // 2. Hero Reveal Sequence Timeline
      const tl = gsap.timeline({ delay: 0.2 });

      if (headingRef.current) {
        tl.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        });
      }

      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.7'
        );
      }

      if (buttonsRef.current) {
        tl.to(
          buttonsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      if (imageFrameRef.current) {
        tl.to(
          imageFrameRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
          },
          '-=0.9'
        );
      }

      if (glassCardRef.current) {
        tl.to(
          glassCardRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        );
      }

      // 3. Responsive Parallax Constraints using gsap.matchMedia()
      const mm = gsap.matchMedia();

      // Desktop Only: Parallax scroll
      mm.add('(min-width: 768px)', () => {
        if (heroImgRef.current && sectionRef.current) {
          gsap.to(heroImgRef.current, {
            yPercent: 8,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Liquid Gradient Blobs */}
      <div className="liquid-blob blob-blue w-[500px] h-[500px] -top-20 -left-20" />
      <div className="liquid-blob blob-green w-[450px] h-[450px] top-1/2 right-10" />

      {/* Hero Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center min-h-[80vh]">
        
        {/* LEFT COLUMN: Text & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.75)] backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-[#065BB6]" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
              PREMIUM FURNITURE
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1E293B] leading-[1.1] tracking-tight"
          >
            Designed for <br />
            <span className="text-[#065BB6]">Comfort.</span> Built for <span className="text-[#0D9488]">Life.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={descriptionRef}
            className="mt-6 text-base sm:text-lg text-[#475569] font-light leading-relaxed max-w-xl"
          >
            Discover furniture that combines elegance, durability and unmatched comfort to elevate your space.
          </p>

          {/* Buttons */}
          <div ref={buttonsRef} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#collections"
              className="group px-8 py-4 rounded-full bg-[#065BB6] hover:bg-[#0F4B9C] text-white font-medium text-sm transition-all duration-300 shadow-xl shadow-[rgba(6,91,182,0.25)] hover:shadow-2xl hover:scale-[1.02] flex items-center gap-3"
            >
              EXPLORE COLLECTION
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn px-7 py-4 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.35)] hover:bg-[#25D366] text-[#128C7E] hover:text-white font-medium text-sm transition-all duration-300 flex items-center gap-2.5 shadow-sm hover:shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:scale-[1.02]"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-current" />
              WHATSAPP US
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="mt-12 pt-8 border-t border-[rgba(6,91,182,0.1)] flex items-center gap-8">
            <div>
              <div className="font-serif font-bold text-2xl text-[#1E293B]">100%</div>
              <div className="text-xs text-[#64748B] uppercase tracking-wider mt-0.5">Solid Timber</div>
            </div>
            <div className="h-8 w-[1px] bg-[rgba(6,91,182,0.15)]" />
            <div>
              <div className="font-serif font-bold text-2xl text-[#1E293B]">15+ Yrs</div>
              <div className="text-xs text-[#64748B] uppercase tracking-wider mt-0.5">Heritage Quality</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Hero Furniture Image + Overlapping Glass Card */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div
            ref={imageFrameRef}
            className="relative w-full aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] bg-white/40"
          >
            <img
              ref={heroImgRef}
              src={getPublicAsset('assets/hero.jpg')}
              alt="Star Furniture Living Room Showcase"
              className="w-full h-full object-cover transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.3)] via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Subtly Overlapping Glass Information Card */}
          <div
            ref={glassCardRef}
            className="absolute -bottom-6 -left-4 sm:left-6 max-w-sm p-6 rounded-3xl bg-[rgba(255,255,255,0.75)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl z-20 hidden sm:block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(6,91,182,0.1)] border border-[rgba(6,91,182,0.2)] flex items-center justify-center text-[#065BB6]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#64748B] font-medium">Star Furniture</div>
                <div className="font-serif font-bold text-lg text-[#1E293B] mt-0.5">Architectural Living</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
              Every curve contoured for ergonomic comfort. Hand-finished with natural organic oils.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
