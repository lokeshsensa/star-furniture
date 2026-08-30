import React, { useEffect, useState } from 'react';
import { X, MessageSquare, Check, Image as ImageIcon } from 'lucide-react';
import { productsData, type Product, getWhatsAppUrl, PHONE_PRIMARY, PHONE_SECONDARY } from '../../data/products';

interface ProductModalProps {
  productId: string | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {
  const [showPoster, setShowPoster] = useState<boolean>(false);
  const product: Product | undefined = productsData.find((p) => p.id === productId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (productId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [productId, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-[#071E34]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EEF1EF] flex flex-col md:flex-row overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0B2E4F] text-white hover:bg-[#1769AA] transition-colors flex items-center justify-center shadow-md focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Visual Area */}
        <div className="w-full md:w-1/2 bg-[#071E34] p-4 flex flex-col justify-between relative min-h-[320px] md:min-h-[500px]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-[#0B2E4F]">
            <img
              src={showPoster ? product.posterImage : product.image}
              alt={product.name}
              className="w-full h-full object-contain max-h-[65vh]"
            />

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2E4F]/90 backdrop-blur-md border border-[#1769AA]/40 text-[#2E9B4B] font-sans text-[10px] font-bold tracking-widest uppercase">
              {showPoster ? 'ORIGINAL SHOWROOM POSTER' : 'PRODUCT VISUAL'}
            </div>
          </div>

          {/* Toggle View Mode Button */}
          <div className="pt-3 flex justify-center">
            <button
              onClick={() => setShowPoster(!showPoster)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2E4F] hover:bg-[#1769AA] text-white text-xs font-semibold tracking-wider border border-[#1769AA]/30 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#2E9B4B]" />
              <span>{showPoster ? 'View Furniture Focus' : 'View Full Original Poster'}</span>
            </button>
          </div>
        </div>

        {/* Right Details Area */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#0B2E4F] text-white font-sans text-[10px] font-bold tracking-widest uppercase">
                {product.category}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#1769AA]/15 text-[#1769AA] font-sans text-[10px] font-bold tracking-wider uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] leading-tight">
              {product.name}
            </h3>

            <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications Box */}
            <div className="p-4 rounded-xl bg-[#F7F8F6] border border-[#EEF1EF] space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[#EEF1EF] pb-1.5">
                <span className="font-semibold text-[#1769AA]">Material</span>
                <span className="font-medium text-[#111111]">{product.specs.material}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#EEF1EF] pb-1.5">
                <span className="font-semibold text-[#1769AA]">Finish</span>
                <span className="font-medium text-[#111111]">{product.specs.finish}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1769AA]">Build Quality</span>
                <span className="font-medium text-[#111111]">{product.specs.durability}</span>
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-1.5 pt-1">
              <p className="font-sans text-xs font-bold tracking-wider text-[#111111] uppercase">
                KEY HIGHLIGHTS:
              </p>
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#4A5568]">
                  <Check className="w-3.5 h-3.5 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#EEF1EF]">
            <a
              href={getWhatsAppUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-full bg-[#2E9B4B] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#1E7E34] transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>ENQUIRE VIA WHATSAPP (INSTANT PRICING)</span>
            </a>

            <div className="grid grid-cols-2 gap-2 text-center">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="py-2 px-3 rounded-full border border-[#1769AA]/40 text-[#1769AA] text-xs font-semibold hover:bg-[#1769AA]/10 transition-colors"
              >
                Call {PHONE_PRIMARY}
              </a>
              <a
                href={`tel:${PHONE_SECONDARY}`}
                className="py-2 px-3 rounded-full border border-[#1769AA]/40 text-[#1769AA] text-xs font-semibold hover:bg-[#1769AA]/10 transition-colors"
              >
                Call {PHONE_SECONDARY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
