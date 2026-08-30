import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, MessageCircle, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar/Navbar';
import { productsData, getWhatsAppUrl, WHATSAPP_PRIMARY } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. HERO SLIDESHOW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SLIDES = [
  { src: '/assets/team/member_1.png', pos: '20% top' },
  { src: '/assets/team/member_2.png', pos: '20% top' },
];
const SLIDE_DURATION = 2600;
const TRANSITION_DURATION = 1.2;

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progKey, setProgKey] = useState(0);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animating = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (animating.current || next === current) return;
      animating.current = true;
      const cur = imgRefs.current[current];
      const nxt = imgRefs.current[next];
      if (!cur || !nxt) { animating.current = false; return; }

      gsap.set(nxt, { opacity: 0, scale: 1.05, x: 15 });
      gsap.to(cur, { opacity: 0, scale: 1.01, x: -10, duration: TRANSITION_DURATION, ease: 'power2.inOut' });
      gsap.to(nxt, {
        opacity: 1, scale: 1, x: 0, duration: TRANSITION_DURATION, ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(cur, { opacity: 0 });
          setCurrent(next);
          setProgKey((k) => k + 1);
          animating.current = false;
        },
      });
    },
    [current]
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, goTo]);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#071E34]" style={{ height: '100vh', minHeight: '680px' }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={(el) => { imgRefs.current[i] = el; }}
          className="absolute inset-0 will-change-transform"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={`STAR Furniture — Member ${i + 1}`}
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.pos }}
            draggable={false}
          />
        </div>
      ))}

      {/* Subtle right-side ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(7,30,52,0.65) 0%, rgba(7,30,52,0.2) 60%, transparent 100%)',
        }}
      />

      {/* Bottom subtle shadow for clean transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
      />

      {/* ── RIGHT-SIDE LUXURY SHOWCASE CARD ── */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 flex items-center justify-end px-5 sm:px-10 lg:px-16 pointer-events-none pt-24 pb-12 z-20">
        <div
          className="w-full max-w-[430px] rounded-[32px] p-6 sm:p-7 pointer-events-auto flex flex-col gap-4.5 transition-all duration-300"
          style={{
            background: 'rgba(7, 30, 52, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 self-start text-[9.5px] font-bold tracking-[0.25em] text-[#2E9B4B] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B4B] animate-pulse" />
            100% PURE SOLID TEAK WOOD
          </div>

          {/* Heading */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase leading-tight tracking-wide">
              Crafted For<br />
              <span className="text-[#A8CBF0] font-normal italic">Timeless Comfort</span>
            </h2>
            <p className="font-sans text-xs sm:text-[13px] text-white/75 mt-1.5 font-normal leading-relaxed">
              Bespoke teak wood creations crafted by master artisans in Bhuvanagiri. Built for generational legacy.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold text-white">15+ Yrs</span>
              <span className="font-sans text-[8.5px] font-bold tracking-wider text-white/50 uppercase">HERITAGE</span>
            </div>
            <div className="flex flex-col border-x border-white/10 px-2.5">
              <span className="font-display text-lg sm:text-xl font-bold text-[#2E9B4B]">Grade-A</span>
              <span className="font-sans text-[8.5px] font-bold tracking-wider text-white/50 uppercase">TEAK TIMBER</span>
            </div>
            <div className="flex flex-col pl-1.5">
              <span className="font-display text-lg sm:text-xl font-bold text-[#A8CBF0]">5,000+</span>
              <span className="font-sans text-[8.5px] font-bold tracking-wider text-white/50 uppercase">FAMILIES</span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { label: '🛋️ Living Room', href: '#collection' },
              { label: '🛏️ Royal Cots', href: '#collection' },
              { label: '🍽️ Dining Sets', href: '#collection' },
            ].map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                onClick={(e) => { e.preventDefault(); document.querySelector(chip.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="font-sans text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/90 transition-all duration-200"
              >
                {chip.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1.5">
            <a
              href="#collection"
              onClick={(e) => { e.preventDefault(); document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 font-sans font-bold text-xs tracking-wider uppercase text-white bg-[#1769AA] hover:bg-[#0B2E4F] py-3 px-4 rounded-full shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <span>VIEW COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2E9B4B] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-sans font-bold text-xs text-white bg-[#25D366] hover:bg-[#1DA851] py-3 px-4 rounded-full shadow-md transition-all duration-300 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WHATSAPP</span>
            </a>
          </div>

          {/* Slide Indicator inside Card */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
            <span className="font-sans text-[9.5px] font-bold tracking-widest text-white/40 uppercase">
              SHOWROOM SLIDESHOW
            </span>
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-xs font-bold text-white/70">
                0{current + 1} / 0{SLIDES.length}
              </span>
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="relative overflow-hidden rounded-full bg-white/20 h-1 transition-all duration-300 cursor-pointer"
                    style={{ width: i === current ? '22px' : '8px' }}
                  >
                    {i === current && (
                      <span
                        key={progKey}
                        className="absolute inset-y-0 left-0 bg-[#2E9B4B] rounded-full"
                        style={{ animation: `slidebarFill ${SLIDE_DURATION}ms linear forwards` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slidebarFill { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. SHOP BY CATEGORY (circular, matching reference)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CIRCLE_CATS = [
  { name: 'Living Room', img: '/assets/products/product_1.jpg' },
  { name: 'Bedroom', img: '/assets/products/product_5.jpg' },
  { name: 'Dining', img: '/assets/products/product_6.jpg' },
  { name: 'Office', img: '/assets/products/product_9.jpg' },
  { name: 'Outdoor', img: '/assets/products/product_10.jpg' },
  { name: 'Storage', img: '/assets/products/product_2.jpg' },
  { name: 'Decor', img: '/assets/products/product_7.jpg' },
  { name: 'Home\nFurniture', img: '/assets/products/product_4.jpg' },
];

function ShopByCategory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
      if (itemsRef.current) {
        gsap.fromTo(Array.from(itemsRef.current.children),
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: itemsRef.current, start: 'top 85%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#1769AA] uppercase mb-3">
            CATALOGUE EXPLORER
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] mb-3">
            Shop By Category
          </h2>
          <p className="font-sans text-sm text-[#777] font-normal max-w-md mx-auto">
            Explore curated furniture designed for every room in your home.
          </p>
        </div>

        {/* Circular Category Grid */}
        <div
          ref={itemsRef}
          className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8"
        >
          {CIRCLE_CATS.map((cat) => (
            <CircleCategory key={cat.name} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CircleCategory({ name, img }: { name: string; img: string }) {
  const circleRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const onEnter = () => {
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.08, duration: 0.4, ease: 'power2.out' });
    if (circleRef.current) gsap.to(circleRef.current, { borderColor: 'rgba(23,105,170,0.45)', duration: 0.3 });
    if (textRef.current) gsap.to(textRef.current, { y: -3, color: '#1769AA', duration: 0.3, ease: 'power2.out' });
  };
  const onLeave = () => {
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
    if (circleRef.current) gsap.to(circleRef.current, { borderColor: 'rgba(0,0,0,0.10)', duration: 0.3 });
    if (textRef.current) gsap.to(textRef.current, { y: 0, color: '#333333', duration: 0.3, ease: 'power2.inOut' });
  };

  return (
    <div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={circleRef}
        className="relative rounded-full overflow-hidden flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
        style={{ border: '1.5px solid rgba(0,0,0,0.10)' }}
      >
        <img
          ref={imgRef}
          src={img}
          alt={name}
          className="w-full h-full object-cover will-change-transform"
        />
      </div>
      <p
        ref={textRef}
        className="font-sans text-[11px] sm:text-xs font-semibold text-[#333] text-center leading-tight whitespace-pre-line"
      >
        {name}
      </p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. PRODUCT COLLECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FEATURED_PRODUCTS = productsData.filter((p) => p.isFeatured).slice(0, 8);

function ProductCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
      if (gridRef.current) {
        gsap.fromTo(Array.from(gridRef.current.children),
          { opacity: 0, y: 60, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 86%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collection" ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#1769AA] uppercase mb-3">
              OUR COLLECTION
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">
              Premium Teak Wood<br />Furniture
            </h2>
          </div>
          <a
            href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-[#1769AA] uppercase border-b border-[#1769AA]/30 hover:border-[#1769AA] pb-0.5 transition-all duration-200 group self-start sm:self-end"
          >
            VIEW ALL <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof productsData[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (cardRef.current) gsap.to(cardRef.current, { y: -8, boxShadow: '0 24px 52px rgba(0,0,0,0.13)', duration: 0.4, ease: 'power2.out' });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
    if (arrowRef.current) gsap.to(arrowRef.current, { x: 5, duration: 0.3, ease: 'power2.out' });
  };
  const onLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', duration: 0.4, ease: 'power2.inOut' });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.inOut' });
    if (arrowRef.current) gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F0F0EE]" style={{ aspectRatio: '4/3' }}>
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 font-sans text-[9px] font-bold tracking-widest uppercase text-white px-2.5 py-1 rounded-full bg-[#0B2E4F]">
            {product.badge}
          </span>
        )}
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover will-change-transform"
        />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="font-sans text-[9px] font-bold tracking-widest text-[#2E9B4B] uppercase mb-1">
          {product.subcategory}
        </span>
        <h3 className="font-sans text-sm font-semibold text-[#111] leading-snug mb-4 flex-1 line-clamp-2">
          {product.name}
        </h3>
        <a
          href={getWhatsAppUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-wider text-[#1769AA] uppercase hover:text-[#0B2E4F] transition-colors group/btn"
        >
          VIEW PRODUCT
          <span ref={arrowRef} className="inline-block">
            <ArrowRight className="w-3 h-3" />
          </span>
        </a>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FEATURED COLLECTION (Editorial Split)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function FeaturedCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 1.05, x: -30 }, {
        opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (textRef.current) {
        gsap.fromTo(Array.from(textRef.current.children), { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Image */}
          <div ref={imgRef} className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '4/5' }}>
            <img
              src="/assets/products/product_3.jpg"
              alt="Featured STAR Furniture Collection"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-6 left-6 p-4 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <p className="font-sans text-[9px] font-bold tracking-widest text-[#2E9B4B] uppercase mb-1">STAR CERTIFIED</p>
              <p className="font-sans text-sm font-bold text-[#0B2E4F]">100% Pure Teak Wood</p>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="flex flex-col gap-5">
            <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#1769AA] uppercase">
              FEATURED COLLECTION
            </p>
            <h2 className="font-display font-bold text-[#111] uppercase leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              PREMIUM<br />TEAK WOOD
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#666] leading-relaxed max-w-sm">
              Crafted for generations. Every piece of STAR Furniture embodies master woodworking and timeless design built to last a lifetime.
            </p>
            <div className="flex flex-col gap-2.5 my-2">
              {['100% Pure Teak Wood', 'Lifetime Structural Durability', 'Master Artisan Craftsmanship', 'Comfort-First Design'].map((pt) => (
                <div key={pt} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#2E9B4B] flex-shrink-0" />
                  <span className="font-sans text-sm font-medium text-[#333]">{pt}</span>
                </div>
              ))}
            </div>
            <a
              href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2.5 font-sans text-xs font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-[1.02] group"
              style={{ background: '#0B2E4F', padding: '13px 28px', borderRadius: '40px', boxShadow: '0 8px 24px rgba(11,46,79,0.25)' }}
            >
              VIEW COLLECTION
              <ArrowRight className="w-3.5 h-3.5 text-[#2E9B4B] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. WHY STAR FURNITURE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WHY_FEATURES = [
  { icon: '🪵', title: 'Premium Teak Wood', desc: '100% pure Grade-A teak sourced from trusted forests.' },
  { icon: '⏳', title: 'Durable & Long Lasting', desc: 'Built to withstand decades of everyday use.' },
  { icon: '✦', title: 'Elegant Design', desc: 'Timeless aesthetics that elevate any living space.' },
  { icon: '💪', title: 'Strong & Reliable', desc: 'Structurally engineered for maximum strength.' },
];

function WhyStarFurniture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(cardsRef.current!.children),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#1769AA] uppercase mb-3">OUR PROMISE</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111]">
            Why STAR Furniture?
          </h2>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2"
              style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-sans text-base font-bold text-[#0B2E4F]">{f.title}</h3>
              <p className="font-sans text-sm text-[#777] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. ABOUT SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(contentRef.current!.children),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-[#071E34] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6">
          <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#2E9B4B] uppercase">
            OUR STORY
          </p>
          <h2 className="font-display font-bold text-white uppercase leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            STAR FURNITURE<br />
            <span className="text-[#A8CBF0] font-normal italic">Bhuvanagiri</span>
          </h2>
          <p className="font-sans text-base text-white/55 leading-relaxed max-w-xl">
            Born in Bhuvanagiri, STAR Furniture has been crafting premium teak wood furniture for homes across Tamil Nadu. Every piece is a labour of love — built with care, built to last.
          </p>
          <div className="grid grid-cols-3 gap-8 sm:gap-16 mt-6 w-full max-w-lg">
            {[
              { label: 'Years of Craft', value: '15+' },
              { label: 'Happy Families', value: '5000+' },
              { label: 'Products', value: '100+' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl sm:text-4xl font-bold text-white">{s.value}</span>
                <span className="font-sans text-[10px] font-bold tracking-widest text-white/40 uppercase text-center">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-white/40 text-xs font-sans">
              <MapPin className="w-3.5 h-3.5 text-[#2E9B4B]" />
              Bhuvanagiri, Cuddalore District, Tamil Nadu
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-sans">
              <Phone className="w-3.5 h-3.5 text-[#2E9B4B]" />
              +91 {WHATSAPP_PRIMARY}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. MEET OUR TEAM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
      gsap.fromTo(leftRef.current, { opacity: 0, x: -120 }, {
        opacity: 1, x: 0, duration: 1.3, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 120 }, {
        opacity: 1, x: 0, duration: 1.3, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="text-center mb-14">
          <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#1769AA] uppercase mb-3">
            THE PEOPLE BEHIND THE BRAND
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111]">
            Meet Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 max-w-2xl mx-auto">
          {/* Member 1 — LEFT */}
          <div ref={leftRef} className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '3/4' }}>
            <img
              src="/assets/team/member_1.png"
              alt="STAR Furniture Team Member"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(7,30,52,0.78) 0%, transparent 48%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-sans text-[9px] font-bold tracking-widest text-[#2E9B4B] uppercase mb-1">DIRECTOR</p>
              <p className="font-display text-lg font-bold text-white">STAR Furniture</p>
            </div>
          </div>

          {/* Member 2 — RIGHT */}
          <div ref={rightRef} className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '3/4' }}>
            <img
              src="/assets/team/member_2.png"
              alt="STAR Furniture Team Member"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(7,30,52,0.78) 0%, transparent 48%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-sans text-[9px] font-bold tracking-widest text-[#2E9B4B] uppercase mb-1">FOUNDER</p>
              <p className="font-display text-lg font-bold text-white">STAR Furniture</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. WHATSAPP CTA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function WhatsAppCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !innerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(innerRef.current!.children),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-28 px-5 sm:px-8 lg:px-16 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto">
        <div ref={innerRef} className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
          <p className="font-sans text-[10px] font-bold tracking-[0.35em] text-[#2E9B4B] uppercase">
            READY TO TRANSFORM YOUR SPACE?
          </p>
          <h2 className="font-display font-bold text-[#111] uppercase leading-tight" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
            Find Your Perfect<br />Piece of Furniture
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#777] leading-relaxed max-w-lg">
            Talk to us about your requirements. We&apos;ll help you find the ideal teak wood furniture for your home — direct from Bhuvanagiri.
          </p>
          <a
            href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans font-bold text-sm tracking-wider text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
            style={{
              background: '#25D366',
              padding: '15px 34px',
              borderRadius: '40px',
              boxShadow: '0 10px 30px rgba(37,211,102,0.4)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            CHAT ON WHATSAPP
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <p className="font-sans text-xs text-[#999]">
            +91 {WHATSAPP_PRIMARY} &bull; Bhuvanagiri, Tamil Nadu
          </p>
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Footer() {
  const scrollTo = (href: string) => {
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="showroom" className="bg-[#071E34] text-white/60 py-16 px-5 sm:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="font-sans font-extrabold text-xl tracking-[0.22em] text-white block leading-none">STAR</span>
              <span className="font-sans font-bold text-[9px] tracking-[0.28em] text-[#2E9B4B] mt-1 block">FURNITURE</span>
            </div>

            <p className="font-sans text-sm text-white/45 leading-relaxed max-w-xs mb-4">
              Comfort &bull; Quality &bull; Trust
            </p>
            <div className="flex flex-col gap-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-white/45">
                <MapPin className="w-3.5 h-3.5 text-[#2E9B4B] flex-shrink-0" />
                Bhuvanagiri, Cuddalore District, Tamil Nadu
              </div>
              <div className="flex items-center gap-2 text-white/45">
                <Phone className="w-3.5 h-3.5 text-[#2E9B4B] flex-shrink-0" />
                +91 {WHATSAPP_PRIMARY}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-5">Navigation</p>
            {[
              { label: 'Home', href: '#home' },
              { label: 'Shop', href: '#collection' },
              { label: 'Collections', href: '#categories' },
              { label: 'About', href: '#about' },
              { label: 'Showroom', href: '#showroom' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="block font-sans text-sm text-white/45 hover:text-[#2E9B4B] transition-colors py-1.5 text-left w-full"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Connect */}
          <div>
            <p className="font-sans text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-5">Connect</p>
            <a
              href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm text-white/45 hover:text-[#25D366] transition-colors py-1.5"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" /> WhatsApp Chat
            </a>
            <a
              href={`tel:+91${WHATSAPP_PRIMARY}`}
              className="flex items-center gap-2 font-sans text-sm text-white/45 hover:text-[#2E9B4B] transition-colors py-1.5"
            >
              <Phone className="w-4 h-4 flex-shrink-0" /> Call Us
            </a>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="font-sans text-xs text-white/25">
            &copy; {new Date().getFullYear()} STAR Metals Furniture &amp; Electronics, Bhuvanagiri. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/20 tracking-widest">
            COMFORT &bull; QUALITY &bull; TRUST
          </p>
        </div>
      </div>
    </footer>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN HOME PAGE — ASSEMBLY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Fixed floating navbar */}
      <Navbar />

      {/* 1. Hero Slideshow */}
      <HeroSection />

      {/* 2. Shop By Category */}
      <ShopByCategory />

      {/* 3. Product Collection */}
      <ProductCollection />

      {/* 4. Featured Collection */}
      <FeaturedCollection />

      {/* 5. Why Star Furniture */}
      <WhyStarFurniture />

      {/* 6. About */}
      <AboutSection />

      {/* 7. Meet Our Team */}
      <TeamSection />

      {/* 8. WhatsApp CTA */}
      <WhatsAppCTA />

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
