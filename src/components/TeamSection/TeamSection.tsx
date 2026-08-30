import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial image states
      gsap.set(img1Ref.current, { opacity: 1, scale: 1, x: 0 });
      gsap.set(img2Ref.current, { opacity: 0, scale: 1.04, x: 30 });

      // GSAP Infinite Auto-Slider Timeline
      const tl = gsap.timeline({
        repeat: -1,
        paused: false,
      });

      // 1. Hold on Image 1 for 3 seconds
      tl.to({}, { duration: 3.0, onStart: () => setActiveIdx(0) })

      // 2. Transition from Image 1 to Image 2 (1 second duration)
      // incoming: opacity 0->1, scale 1.04->1, x 30->0; outgoing: opacity 1->0, scale 1->0.98, x 0->-30
      .to(img1Ref.current, {
        opacity: 0,
        scale: 0.98,
        x: -30,
        duration: 1.0,
        ease: 'power2.inOut',
      })
      .to(img2Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        onStart: () => setActiveIdx(1),
      }, '<')

      // 3. Hold on Image 2 for 3 seconds
      .to({}, { duration: 3.0 })

      // 4. Transition back to Image 1 (1 second duration)
      .to(img2Ref.current, {
        opacity: 0,
        scale: 0.98,
        x: 30,
        duration: 1.0,
        ease: 'power2.inOut',
      })
      .to(img1Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        onStart: () => setActiveIdx(0),
      }, '<');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-14 sm:py-20 bg-[#EEF1EF]/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#1769AA]" />
              <p className="font-sans text-xs font-bold tracking-[0.25em] text-[#1769AA] uppercase">
                LEADERSHIP & SERVICE
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
              THE PEOPLE BEHIND STAR
            </h2>

            <p className="font-serif italic text-lg sm:text-2xl text-[#1769AA] font-light leading-relaxed">
              "Quality furniture begins with people who care about quality."
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              Anchored in Bhuvanagiri, our leadership brings decades of dedicated craftsmanship, personal material selection, and heartfelt service to ensure every piece of teak furniture serves your home faithfully.
            </p>

            {/* Slider Dot Indicators */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveIdx(0)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIdx === 0
                    ? 'bg-[#1769AA] scale-125'
                    : 'bg-[#111111]/20 hover:bg-[#111111]/40'
                }`}
                aria-label="Member 1"
              />
              <button
                onClick={() => setActiveIdx(1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIdx === 1
                    ? 'bg-[#2E9B4B] scale-125'
                    : 'bg-[#111111]/20 hover:bg-[#111111]/40'
                }`}
                aria-label="Member 2"
              />
              <span className="font-sans text-[11px] tracking-widest text-[#1769AA] ml-2">
                0{activeIdx + 1} / 02
              </span>
            </div>
          </div>

          {/* Right: Fixed-Size Image Container (4:3 Aspect Ratio) */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-[#FFFFFF] border border-[#EEF1EF] p-2 sm:p-3">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#071E34]">
                {/* Member Image 1 */}
                <img
                  ref={img1Ref}
                  src="/assets/team/member_1.png"
                  alt="The People Behind STAR - Member 1"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />

                {/* Member Image 2 */}
                <img
                  ref={img2Ref}
                  src="/assets/team/member_2.png"
                  alt="The People Behind STAR - Member 2"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />

                {/* Subtle bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E34]/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0B2E4F]/90 backdrop-blur-sm border border-[#1769AA]/30 flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-bold text-[#FFFFFF] leading-none">
                      STAR Leadership
                    </p>
                    <p className="font-sans text-[9px] font-semibold tracking-wider text-[#2E9B4B] uppercase mt-1">
                      Metals Furniture & Electronics, Bhuvanagiri
                    </p>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-[#071E34] border border-[#1769AA]/40 text-[#FFFFFF] font-sans text-[9px] font-bold tracking-widest uppercase">
                    AUTHENTIC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
