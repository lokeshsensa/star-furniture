import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP Animation Helpers for Star Furniture
 */

// Staggered reveal for grid elements
export const animateStaggerReveal = (
  targets: Element[] | NodeListOf<Element>,
  triggerElement: Element | string,
  options?: { y?: number; stagger?: number; duration?: number }
) => {
  if (!targets || targets.length === 0) return;
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: options?.y || 60,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: options?.duration || 0.85,
      ease: 'power3.out',
      stagger: options?.stagger || 0.1,
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        once: true,
      },
    }
  );
};

// Cinematic Clip-Path Image Reveal (inset(0 100% 0 0) -> inset(0 0 0 0))
export const animateClipPathReveal = (
  container: Element,
  image: Element,
  triggerElement: Element | string,
  options?: { duration?: number; delay?: number }
) => {
  if (!container || !image) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top 80%',
      once: true,
    },
  });

  tl.fromTo(
    container,
    { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: options?.duration || 1.4,
      ease: 'power3.out',
    },
    options?.delay || 0.0
  );

  tl.fromTo(
    image,
    { scale: 1.08, xPercent: -5 },
    {
      scale: 1,
      xPercent: 0,
      duration: options?.duration || 1.4,
      ease: 'power3.out',
    },
    options?.delay || 0.0
  );

  return tl;
};
