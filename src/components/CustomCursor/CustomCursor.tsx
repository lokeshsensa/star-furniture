import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if touch device or prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const cursorXTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const cursorYTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });
    const followerXTo = gsap.quickTo(follower, 'x', { duration: 0.45, ease: 'power2.out' });
    const followerYTo = gsap.quickTo(follower, 'y', { duration: 0.45, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      cursorXTo(e.clientX);
      cursorYTo(e.clientY);
      followerXTo(e.clientX);
      followerYTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#B88A2A] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
      {/* Outer Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B88A2A]/40 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
