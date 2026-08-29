import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Ruler, Layers, MessageCircle, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const FeaturedProductSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const featuredProductName = "Modern Sectional Sofa";

  return (
    <section ref={sectionRef} id="featured" className="section-padding relative overflow-hidden bg-gradient-to-b from-transparent via-[#F8FAF9] to-transparent">
      {/* Background Liquid Blob */}
      <div className="liquid-blob blob-green w-[500px] h-[500px] top-1/2 left-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
            FEATURED PIECE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
            Spotlight Design
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center rounded-[40px] bg-[rgba(255,255,255,0.65)] backdrop-blur-2xl border border-[rgba(255,255,255,0.9)] p-6 sm:p-10 shadow-2xl">
          {/* LEFT: Large Furniture Image */}
          <div ref={leftColRef} className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-[rgba(255,255,255,0.9)] bg-white/40">
            <img
              src={getPublicAsset('assets/prod_sofa.jpg')}
              alt="Modern Sectional Sofa"
              className="w-full h-full object-cover transform hover:scale-[1.04] transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.85)] backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#065BB6] border border-[rgba(255,255,255,0.9)] shadow-sm">
              Spotlight Collection
            </div>
          </div>

          {/* RIGHT: Product Information */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
                  Premium Sofa
                </span>
                <span className="font-serif font-bold text-2xl text-[#1E293B]">
                  Price on Request
                </span>
              </div>

              <h3 className="font-serif text-4xl font-bold text-[#1E293B] mt-3">
                {featuredProductName}
              </h3>

              <p className="mt-4 text-base text-[#475569] font-light leading-relaxed">
                Designed for modern living with generous comfort and timeless form. Grounded on an organic dark walnut hardwood base, it turns any living space into a serene luxury haven.
              </p>

              {/* Specifications */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)] shadow-sm">
                  <Sparkles className="w-5 h-5 text-[#065BB6] mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Material</div>
                    <div className="text-sm font-medium text-[#1E293B] mt-0.5">American Dark Walnut & Belgian Tactile Boucle</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)] shadow-sm">
                  <Ruler className="w-5 h-5 text-[#065BB6] mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Dimensions</div>
                    <div className="text-sm font-medium text-[#1E293B] mt-0.5">280cm (W) x 110cm (D) x 72cm (H)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)] shadow-sm">
                  <Layers className="w-5 h-5 text-[#065BB6] mt-0.5" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Finish Options</div>
                    <div className="text-sm font-medium text-[#1E293B] mt-0.5">Warm Ivory Boucle, Oatmeal Tweed, Smoked Espresso Leather</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-8 pt-6 border-t border-[rgba(6,91,182,0.08)] flex items-center justify-between gap-4">
              <a
                href={getWhatsAppLink(featuredProductName)}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-ripple-btn flex-1 py-4 px-8 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-base transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-[rgba(37,211,102,0.35)] hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>

              <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B]">
                <ShieldCheck className="w-4 h-4 text-[#065BB6]" />
                <span>10-Yr Structural Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
