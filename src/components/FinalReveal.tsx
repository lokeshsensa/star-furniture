import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, PhoneCall, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';
import { getPublicAsset } from '../utils/assets';

gsap.registerPlugin(ScrollTrigger);

export const FinalReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const personImgRef = useRef<HTMLImageElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State for Person Image (LEFT -> RIGHT clip-path reveal)
      gsap.set(imageContainerRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 1,
      });

      gsap.set(personImgRef.current, {
        scale: 1.08,
        xPercent: -5,
      });

      // 2. Initial State for Right WhatsApp Panel
      gsap.set(rightPanelRef.current, {
        opacity: 0,
        x: 80,
        scale: 0.95,
      });

      // Timeline triggered when section enters viewport
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // PERSON IMAGE Reveal from Left -> Right (Duration 1.4s)
      mainTl.to(imageContainerRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4,
        ease: 'power3.out',
      })
      .to(personImgRef.current, {
        scale: 1,
        xPercent: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, 0.0)

      // RIGHT WHATSAPP PANEL Reveal (Starts ~0.3s after image reveal begins)
      .to(rightPanelRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
      }, 0.3);

      // Subtle parallax while scrolling
      if (personImgRef.current) {
        gsap.to(personImgRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Hi, I visited the Star Furniture website and would like to know more about your furniture collection."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-transparent via-[#F8FAF9]/80 to-[#F8FAF9]"
    >
      {/* Subtle Liquid Morphism Shapes Behind Image */}
      <div className="liquid-blob blob-blue w-[600px] h-[600px] bottom-0 left-10 opacity-40 blur-[120px]" />
      <div className="liquid-blob blob-green w-[480px] h-[480px] bottom-10 right-10 opacity-35 blur-[100px]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Approximately 55–60% (7/12 cols) — PROVIDED PERSON IMAGE */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            {/* Soft Liquid Morphism Backdrop glow behind image */}
            <div className="absolute -inset-4 rounded-[44px] bg-gradient-to-tr from-[#065BB6]/15 via-[#0D9488]/15 to-transparent blur-2xl pointer-events-none" />

            {/* Person Image Container (Soft rounded, integrated into page) */}
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/3.5] sm:aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] bg-white/40 group"
            >
              <img
                ref={personImgRef}
                src={getPublicAsset('person.png')}
                alt="Star Furniture Founder / Representative"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.4)] via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#065BB6] bg-white/85 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                  STAR FURNITURE TEAM
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2 drop-shadow-md">
                  Personalized Design Assistance
                </h4>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Approximately 40–45% (5/12 cols) — WHATSAPP CONTACT PANEL */}
          <div ref={rightPanelRef} className="lg:col-span-5">
            <div className="p-8 sm:p-12 rounded-[40px] bg-[rgba(255,255,255,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl relative overflow-hidden">
              {/* Inner ambient glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[rgba(37,211,102,0.15)] blur-3xl pointer-events-none" />

              {/* Tag Label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.3)] shadow-sm mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#128C7E]">
                  TALK TO STAR FURNITURE
                </span>
              </div>

              {/* Heading */}
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] leading-[1.15]">
                Let's Create <br />
                <span className="text-[#065BB6]">Your Perfect</span> <span className="text-[#0D9488]">Space.</span>
              </h3>

              {/* Description */}
              <p className="mt-5 text-base text-[#475569] font-light leading-relaxed">
                Looking for the perfect furniture for your home? Our team is just a message away.
              </p>

              {/* Sub-text */}
              <p className="mt-2 text-xs text-[#64748B] font-normal leading-relaxed">
                Get personalized advice, catalog updates, or custom furniture guidance instantly.
              </p>

              {/* Button */}
              <div className="mt-8 pt-6 border-t border-[rgba(6,91,182,0.08)]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-ripple-btn w-full py-5 px-8 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-base transition-all duration-300 flex items-center justify-center gap-3.5 shadow-xl shadow-[rgba(37,211,102,0.35)] hover:shadow-2xl hover:scale-[1.02] active:scale-98"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  <span className="uppercase tracking-wider font-semibold">CHAT ON WHATSAPP</span>
                  <ArrowRight className="w-5 h-5 ml-auto" />
                </a>

                {/* Extra Hint */}
                <div className="mt-4 text-center text-xs text-[#64748B] flex items-center justify-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#065BB6]" />
                  <span>Star Furniture concierges reply promptly</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
