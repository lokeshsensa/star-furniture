import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart, MessageCircle, ShoppingBag, Ruler, Sparkles, Layers, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppLink } from '../data/products';

gsap.registerPlugin(useGSAP);

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setActiveView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const product = selectedProduct;
  const [activeImage, setActiveImage] = useState<string>(product?.image || '');
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finishes[0] || '');
  const [quantity] = useState<number>(1);

  const mainImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { opacity: 0.4, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    },
    { dependencies: [activeImage] }
  );

  if (!product) {
    return (
      <main className="pt-32 pb-20 text-center text-slate-500">
        <p>No product selected.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 px-6 py-2 rounded-full bg-[#065BB6] text-white text-xs uppercase"
        >
          Back to Shop
        </button>
      </main>
    );
  }

  const currentMainImg = activeImage || product.image;
  const inWishlist = isInWishlist(product.id);
  const currentFinish = selectedFinish || product.finishes[0];

  const galleryList = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  return (
    <main ref={containerRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('shop')}
        className="mb-8 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#065BB6] flex items-center gap-2 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Main Image & Thumbnails Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Large Image Display */}
          <div className="relative w-full aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] bg-white/40 group">
            <img
              ref={mainImageRef}
              src={currentMainImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountBadge && (
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#D97706] text-white text-xs font-bold shadow-md">
                {product.discountBadge}
              </div>
            )}
          </div>

          {/* Thumbnails Gallery */}
          {galleryList.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    currentMainImg === img
                      ? 'border-[#065BB6] shadow-md scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Specs & Action Options */}
        <div className="lg:col-span-5 p-8 rounded-[40px] bg-[rgba(255,255,255,0.75)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
              {product.category}
            </span>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2.5 rounded-full border transition-all ${
                inWishlist
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-slate-600 hover:text-red-500 border-slate-200'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
            {product.name}
          </h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-serif font-bold text-3xl text-[#1E293B]">
              {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-slate-400 line-through">
                {product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm text-[#475569] font-light leading-relaxed">
            {product.fullDescription}
          </p>

          {/* Specifications Grid */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 border border-[rgba(6,91,182,0.08)]">
              <Sparkles className="w-5 h-5 text-[#065BB6] mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Material</div>
                <div className="text-sm font-medium text-[#1E293B] mt-0.5">{product.material}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 border border-[rgba(6,91,182,0.08)]">
              <Ruler className="w-5 h-5 text-[#065BB6] mt-0.5" />
              <div>
                <div className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Dimensions</div>
                <div className="text-sm font-medium text-[#1E293B] mt-0.5">{product.dimensions}</div>
              </div>
            </div>

            {/* Finish Selection */}
            <div className="p-4 rounded-2xl bg-white/80 border border-[rgba(6,91,182,0.08)]">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#065BB6]" />
                <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold">Finish Selection</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      currentFinish === finish
                        ? 'bg-[#065BB6] text-white border-[#065BB6] shadow-sm'
                        : 'bg-white text-[#475569] border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3">
            <button
              onClick={() => addToCart(product, quantity, currentFinish)}
              className="w-full py-4 px-6 rounded-full bg-[#065BB6] hover:bg-[#0F4B9C] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2.5"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              Add to Enquiry Cart
            </button>

            <a
              href={getWhatsAppLink(`${product.name} (Finish: ${currentFinish})`)}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[rgba(37,211,102,0.3)] flex items-center justify-center gap-2.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Enquire Directly on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};
