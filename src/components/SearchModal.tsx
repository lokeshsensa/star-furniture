import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productsData } from '../data/products';

gsap.registerPlugin(useGSAP);

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    navigateToProduct,
  } = useShop();

  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isSearchOpen && overlayRef.current && containerRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: -30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [isSearchOpen] }
  );

  if (!isSearchOpen) return null;

  const filteredProducts = searchQuery.trim() === ''
    ? productsData.slice(0, 4) // Show recommendations when empty
    : productsData.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleClose = () => {
    if (overlayRef.current && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setIsSearchOpen(false),
      });
    } else {
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-[rgba(15,23,42,0.6)] backdrop-blur-md"
      />

      {/* Search Window */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl rounded-[36px] bg-[rgba(255,255,255,0.92)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl overflow-hidden p-6 sm:p-8"
      >
        {/* Header Search Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-5 w-6 h-6 text-[#065BB6]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sofas, beds, dining tables, recliners..."
            className="w-full pl-14 pr-14 py-4 rounded-full bg-white/80 border border-[rgba(6,91,182,0.18)] focus:border-[#065BB6] focus:ring-2 focus:ring-[#065BB6]/20 text-base font-medium text-[#1E293B] placeholder:text-[#94A3B8] outline-none shadow-sm transition-all duration-300"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="absolute right-3 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Header */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#065BB6]">
            {searchQuery.trim() ? `Search Results (${filteredProducts.length})` : 'Popular Recommendations'}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#64748B] hover:text-[#065BB6] underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  navigateToProduct(product);
                  handleClose();
                }}
                className="group relative rounded-2xl bg-white/70 hover:bg-white border border-[rgba(255,255,255,0.9)] p-3 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#065BB6]">
                    {product.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#1E293B] truncate group-hover:text-[#065BB6] transition-colors">
                    {product.name}
                  </h4>
                  <div className="font-semibold text-xs text-[#1E293B] mt-1">
                    {product.price}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[rgba(6,91,182,0.08)] group-hover:bg-[#065BB6] text-[#065BB6] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-12 text-center text-[#64748B]">
              No furniture matching "{searchQuery}" found. Try another search term.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
