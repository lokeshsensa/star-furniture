import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop, type PageView } from '../context/ShopContext';
import { getWhatsAppLink } from '../data/products';
import { getPublicAsset } from '../utils/assets';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setIsSearchOpen,
    wishlist,
    setIsWishlistOpen,
    cart,
    setIsCartOpen,
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 250);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Collections', view: 'collections' },
    { label: 'About', view: 'about' },
    { label: 'Showroom', view: 'showroom' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistCount = wishlist.length;
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-500 ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-8 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto rounded-full bg-[rgba(255,255,255,0.78)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-xl px-6 py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Star Furniture Logo Image */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
          <img
            src={getPublicAsset('logo.png')}
            alt="Star Furniture Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className={`text-xs uppercase tracking-widest font-medium transition-colors duration-200 hover:text-[#065BB6] relative ${
                activeView === link.view ? 'text-[#065BB6] font-semibold' : 'text-[#475569]'
              }`}
            >
              {link.label}
              {activeView === link.view && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#065BB6] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Action Icons & WhatsApp Pill */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white text-slate-700 flex items-center justify-center transition-colors border border-slate-200/60 shadow-sm"
            title="Search furniture"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Wishlist Icon with badge */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative w-10 h-10 rounded-full bg-white/70 hover:bg-white text-slate-700 flex items-center justify-center transition-colors border border-slate-200/60 shadow-sm"
            title="View Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#065BB6] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-full bg-white/70 hover:bg-white text-slate-700 flex items-center justify-center transition-colors border border-slate-200/60 shadow-sm"
            title="View Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp Pill */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-ripple-btn px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-md shadow-[rgba(37,211,102,0.3)] hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-full bg-white/80 text-slate-700 flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] text-white text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1E293B] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-[rgba(255,255,255,0.95)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className="text-left text-sm uppercase tracking-wider font-semibold text-[#1E293B] hover:text-[#065BB6] py-1 border-b border-slate-100"
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex-1 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="flex-1 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Wishlist ({wishlistCount})
            </button>
          </div>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
    </nav>
  );
};
