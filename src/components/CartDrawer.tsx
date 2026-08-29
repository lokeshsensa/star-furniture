import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getCartWhatsAppLink } from '../data/products';

gsap.registerPlugin(useGSAP);

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
  } = useShop();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isCartOpen && overlayRef.current && drawerRef.current) {
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
    { dependencies: [isCartOpen] }
  );

  if (!isCartOpen) return null;

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
        onComplete: () => setIsCartOpen(false),
      });
    } else {
      setIsCartOpen(false);
    }
  };

  const cartSummaryItems = cart.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    finish: item.selectedFinish,
    price: item.product.price,
  }));

  const whatsappCartUrl = getCartWhatsAppLink(cartSummaryItems);

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
            <ShoppingBag className="w-5 h-5 text-[#065BB6]" />
            <h3 className="font-serif font-bold text-xl text-[#1E293B]">
              Enquiry Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
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
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-white border border-[rgba(6,91,182,0.08)] shadow-sm flex items-center gap-4 relative"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-[#065BB6]">
                    {item.product.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#1E293B] truncate">
                    {item.product.name}
                  </h4>
                  {item.selectedFinish && (
                    <div className="text-[11px] text-[#64748B] mt-0.5">
                      Finish: {item.selectedFinish}
                    </div>
                  )}
                  <div className="font-semibold text-xs text-[#1E293B] mt-1">
                    {item.product.price}
                  </div>

                  {/* Quantity controls */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-full bg-slate-100 p-1 border border-slate-200">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-[#64748B] flex flex-col items-center">
              <ShoppingBag className="w-12 h-12 text-slate-300 stroke-1 mb-3" />
              <p className="text-sm font-medium">Your enquiry cart is empty.</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Add products to your cart to send a combined price enquiry to Star Furniture on WhatsApp.
              </p>
            </div>
          )}
        </div>

        {/* Footer WhatsApp Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[rgba(6,91,182,0.1)] bg-slate-50/50">
            <div className="text-xs text-[#64748B] mb-3 flex items-center justify-between">
              <span>Selected Items:</span>
              <span className="font-semibold text-[#1E293B]">{cart.reduce((s, i) => s + i.quantity, 0)} Units</span>
            </div>

            <a
              href={whatsappCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[rgba(37,211,102,0.35)]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Enquire Cart on WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
