import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FinalMemberReveal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftMemberRef = useRef<HTMLDivElement>(null);
  const rightMemberRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Simultaneous Reveal: Left from -120px, Right from 120px in 1.3s (power4.out)
      gsap.fromTo(
        leftMemberRef.current,
        { opacity: 0, x: -120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        rightMemberRef.current,
        { opacity: 0, x: 120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // 2. Center Text Reveal
      gsap.fromTo(
        centerTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Center Text Header */}
        <div ref={centerTextRef} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] text-[#1769AA] uppercase">
            STAR FURNITURE
          </p>

          <h2 className="font-serif italic text-2xl sm:text-4xl font-semibold text-[#111111] mt-1.5 leading-snug">
            COMFORT • QUALITY • TRUST
          </h2>

          <div className="w-10 h-[2px] bg-[#2E9B4B] mx-auto mt-4" />
        </div>

        {/* Dual Member Portraits (Left Member 1, Right Member 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* LEFT: Member 1 */}
          <div
            ref={leftMemberRef}
            className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EEF1EF] bg-[#071E34] p-4 sm:p-6 flex items-center justify-center will-change-transform"
          >
            <div className="relative aspect-[4/5] w-full max-w-md flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src="/assets/team/member_1.png"
                alt="Star Furniture Leadership"
                className="w-full h-full object-contain select-none drop-shadow-md"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT: Member 2 */}
          <div
            ref={rightMemberRef}
            className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EEF1EF] bg-[#071E34] p-4 sm:p-6 flex items-center justify-center will-change-transform"
          >
            <div className="relative aspect-[4/5] w-full max-w-md flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src="/assets/team/member_2.png"
                alt="Star Furniture Leadership"
                className="w-full h-full object-contain select-none drop-shadow-md"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalMemberReveal;
