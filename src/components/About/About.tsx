import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, ShieldCheck } from 'lucide-react';
import { PHONE_PRIMARY, PHONE_SECONDARY } from '../../data/products';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-32 bg-[#F7F3EA] relative border-t border-[#D6B76A]/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef} className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1.5px] bg-[#B88A2A]" />
            <p className="font-sans text-xs font-bold tracking-[0.25em] text-[#7A431F] uppercase">
              ROOTED IN EXCELLENCE
            </p>
            <span className="w-6 h-[1.5px] bg-[#B88A2A]" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#21140D]">
            ABOUT STAR
          </h2>

          <p className="font-serif text-lg sm:text-2xl text-[#3A2114]/90 font-normal leading-relaxed max-w-3xl mx-auto">
            "STAR Metals Furniture & Electronics, Bhuvanagiri brings together quality furniture, timeless teak wood craftsmanship and dependable service for homes that value comfort and lasting design."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#D6B76A]/25">
            <div className="p-4 rounded-xl bg-[#EFE6D5]/40 border border-[#D6B76A]/20">
              <MapPin className="w-5 h-5 text-[#B88A2A] mx-auto mb-2" />
              <h4 className="font-sans text-xs font-bold tracking-wider text-[#21140D] uppercase">
                LOCATION
              </h4>
              <p className="font-sans text-xs text-[#3A2114]/75 mt-1">
                Bhuvanagiri Showroom
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EFE6D5]/40 border border-[#D6B76A]/20">
              <ShieldCheck className="w-5 h-5 text-[#B88A2A] mx-auto mb-2" />
              <h4 className="font-sans text-xs font-bold tracking-wider text-[#21140D] uppercase">
                AUTHENTICITY
              </h4>
              <p className="font-sans text-xs text-[#3A2114]/75 mt-1">
                100% Solid Teak Wood
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EFE6D5]/40 border border-[#D6B76A]/20">
              <Phone className="w-5 h-5 text-[#B88A2A] mx-auto mb-2" />
              <h4 className="font-sans text-xs font-bold tracking-wider text-[#21140D] uppercase">
                DIRECT CONTACT
              </h4>
              <p className="font-sans text-xs text-[#3A2114]/75 mt-1">
                {PHONE_PRIMARY} / {PHONE_SECONDARY}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
