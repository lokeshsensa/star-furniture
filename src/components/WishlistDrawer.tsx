import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Heart, X, Trash2, MessageCircle, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productsData, getWhatsAppLink } from '../data/products';

gsap.registerPlugin(useGSAP);

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    navigateToProduct,
  } = useShop();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isWishlistOpen && overlayRef.current && drawerRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        gsap.fromTo(
          drawerRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.45, ease: 'power3.out' }
        );
      }
    },
    { dependencies: [isWishlistOpen] }
  );

  if (!isWishlistOpen) return null;

  const wishlistProducts = productsData.filter((p) => wishlist.includes(p.id));

  const handleClose = () => {
    if (overlayRef.current && drawerRef.current) {
      gsap.to(drawerRef.current, {
        xPercent: 100,
        duration: 0.35,
        ease: 'power2.in',
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setIsWishlistOpen(false),
      });
    } else {
      setIsWishlistOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex justify-end">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-[rgba(15,23,42,0.55)] backdrop-blur-md"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md h-full bg-[rgba(255,255,255,0.95)] backdrop-blur-2xl border-l border-[rgba(255,255,255,0.9)] shadow-2xl flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(6,91,182,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#065BB6] fill-current" />
            <h3 className="font-serif font-bold text-xl text-[#1E293B]">
              Your Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-white border border-[rgba(6,91,182,0.08)] shadow-sm flex items-center gap-4 relative group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#065BB6]">
                    {product.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#1E293B] truncate">
                    {product.name}
                  </h4>
                  <div className="font-semibold text-xs text-[#1E293B] mt-1">
                    {product.price}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(product);
                        handleClose();
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#065BB6] text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm hover:bg-[#0F4B9C] transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => {
                        navigateToProduct(product);
                        handleClose();
                      }}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium flex items-center gap-1 hover:bg-slate-200 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors self-start"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-[#64748B] flex flex-col items-center">
              <Heart className="w-12 h-12 text-slate-300 stroke-1 mb-3" />
              <p className="text-sm font-medium">Your wishlist is empty.</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Save your favorite furniture designs to view or enquire about them anytime.
              </p>
            </div>
          )}
        </div>

        {/* Footer WhatsApp Action */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-[rgba(6,91,182,0.1)] bg-slate-50/50">
            <a
              href={getWhatsAppLink(`Wishlist items: ${wishlistProducts.map((p) => p.name).join(', ')}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Enquire Wishlist on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
