import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, MessageCircle, CheckCircle2, Ruler, Sparkles, Layers } from 'lucide-react';
import { getWhatsAppLink, type Product } from '../data/products';

gsap.registerPlugin(useGSAP);

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [product]);

  useGSAP(
    () => {
      if (product && overlayRef.current && modalBoxRef.current) {
        const tl = gsap.timeline();

        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' },
          0.0
        );

        tl.fromTo(
          modalBoxRef.current,
          {
            opacity: 0,
            scale: 0.94,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.45,
            ease: 'power3.out',
          },
          0.05
        );

        if (contentRef.current) {
          tl.fromTo(
            contentRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
            0.15
          );
        }
      }
    },
    { dependencies: [product] }
  );

  if (!product) return null;

  const currentFinish = selectedFinish || product.finishes[0];

  const handleClose = () => {
    if (modalBoxRef.current && overlayRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onClose();
        },
      });

      tl.to(modalBoxRef.current, {
        opacity: 0,
        scale: 0.94,
        filter: 'blur(10px)',
        duration: 0.25,
        ease: 'power2.in',
      }, 0.0);

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      }, 0.05);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop overlay with blur */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-[rgba(15,23,42,0.65)] backdrop-blur-md"
      />

      {/* Modal Window Container */}
      <div
        ref={modalBoxRef}
        className="relative z-10 w-full max-w-4xl rounded-[36px] bg-[rgba(255,255,255,0.92)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.85)] hover:bg-[#065BB6] hover:text-white text-[#1E293B] flex items-center justify-center transition-all duration-300 shadow-md border border-[rgba(255,255,255,0.9)]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Display */}
        <div className="md:w-1/2 relative bg-[#F8FAF9] min-h-[300px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.4)] via-transparent to-transparent md:hidden" />
        </div>

        {/* Right Column: Details & WhatsApp Action */}
        <div ref={contentRef} className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category & Price */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
                {product.category}
              </span>
              <span className="font-serif font-bold text-2xl text-[#1E293B]">
                {product.price}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl font-bold text-[#1E293B] mt-2">
              {product.name}
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm text-[#475569] font-light leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications Grid */}
            <div className="mt-6 space-y-4">
              {/* Material */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)]">
                <Sparkles className="w-4 h-4 text-[#065BB6] mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Material</div>
                  <div className="text-xs font-medium text-[#1E293B] mt-0.5">{product.material}</div>
                </div>
              </div>

              {/* Dimensions */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)]">
                <Ruler className="w-4 h-4 text-[#065BB6] mt-0.5" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Dimensions</div>
                  <div className="text-xs font-medium text-[#1E293B] mt-0.5">{product.dimensions}</div>
                </div>
              </div>

              {/* Available Finishes */}
              <div className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.7)] border border-[rgba(6,91,182,0.08)]">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-[#065BB6]" />
                  <span className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold">Available Finishes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
                        currentFinish === finish
                          ? 'bg-[#065BB6] text-white border-[#065BB6] shadow-sm'
                          : 'bg-white/80 text-[#475569] border-[rgba(6,91,182,0.12)] hover:bg-white'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-semibold mb-2">Highlights</div>
              <ul className="space-y-1.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#475569]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4 border-t border-[rgba(6,91,182,0.08)]">
            <a
              href={getWhatsAppLink(`${product.name} (Finish: ${currentFinish})`)}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[rgba(37,211,102,0.35)] hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
