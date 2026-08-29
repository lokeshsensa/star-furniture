import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, Eye, MessageCircle, Heart } from 'lucide-react';
import { productsData, getWhatsAppLink } from '../data/products';
import { useShop } from '../context/ShopContext';

gsap.registerPlugin(useGSAP);

export const NewArrivalsCarousel: React.FC = () => {
  const { navigateToProduct, toggleWishlist, isInWishlist } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const newArrivals = productsData.filter((p) => p.isNewArrival || p.isFeatured);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header with Next/Prev Controls */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
            ONLINE EXCLUSIVES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E293B] mt-2">
            New Arrivals & Exclusives
          </h2>
        </div>

        {/* Prev / Next Carousel Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-[#065BB6] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-[#065BB6] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-300"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
      >
        {newArrivals.map((product) => {
          const inWishlist = isInWishlist(product.id);
          return (
            <div
              key={product.id}
              className="flex-none w-72 sm:w-80 snap-start group rounded-[28px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-[28px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Discount Badge */}
                {product.discountBadge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#D97706] text-white text-[11px] font-bold shadow-sm">
                    {product.discountBadge}
                  </div>
                )}

                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md border border-white/80 flex items-center justify-center transition-all ${
                    inWishlist
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white/80 text-slate-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#065BB6]">
                    {product.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#1E293B] group-hover:text-[#065BB6] transition-colors truncate mt-0.5">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-serif font-bold text-lg text-[#1E293B]">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigateToProduct(product)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-[rgba(6,91,182,0.08)] hover:bg-[#065BB6] text-[#065BB6] hover:text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>

                  <a
                    href={getWhatsAppLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
