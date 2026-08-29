import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { getPublicAsset } from '../utils/assets';
import { getWhatsAppLink } from '../data/products';
import { useShop } from '../context/ShopContext';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ShowroomBanner: React.FC = () => {
  const { setActiveView } = useShop();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
    <section ref={sectionRef} className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div
        ref={cardRef}
        className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-2xl p-8 sm:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10"
      >
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={getPublicAsset('assets/reveal2.jpg')}
            alt="Star Furniture Showroom Interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Left */}
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>VISIT IN PERSON</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Visit Our Flagship Showroom
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Experience our handcrafted furniture collections in person. Touch tactile Belgian boucle, inspect solid walnut graining, and test cloud-like lounge comfort.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setActiveView('showroom');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-[#065BB6] hover:bg-[#0F4B9C] text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
            >
              <span>GET DIRECTIONS & HOURS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getWhatsAppLink("Hi Star Furniture, I would like to visit your showroom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
              <span>WHATSAPP CONCIERGE</span>
            </a>
          </div>
        </div>

        {/* Image Right Badge */}
        <div className="relative z-10 w-full lg:w-96 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex-shrink-0">
          <img
            src={getPublicAsset('assets/reveal2.jpg')}
            alt="Star Furniture Showroom Display"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
