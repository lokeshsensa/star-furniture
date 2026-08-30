import React, { useEffect, useState } from 'react';
import { Search, Heart, ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_PRIMARY } from '../../data/products';

const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'SHOP', href: '#collection' },
  { name: 'COLLECTIONS', href: '#categories' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SHOWROOM', href: '#showroom' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('HOME');
  const [wishlistCount] = useState(0);
  const [cartCount] = useState(1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, name: string, href: string) => {
    e.preventDefault();
    setActive(name);
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <>
      {/* Floating Pill Navbar matching reference screenshot exactly */}
      <header
        className="fixed z-[9999] transition-all duration-500"
        style={{
          top: scrolled ? '12px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 80px)',
          maxWidth: '1400px',
        }}
      >
        <div
          className="flex items-center justify-between px-6 sm:px-8 transition-all duration-500"
          style={{
            height: '70px',
            borderRadius: '40px',
            background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: scrolled
              ? '0 20px 45px rgba(0, 0, 0, 0.12)'
              : '0 12px 35px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* ── LEFT: Official STAR Furniture Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'HOME', '#home')}
            className="flex items-center flex-shrink-0 select-none cursor-pointer group py-1"
          >
            <img
              src="/assets/branding/star_logo_navbar.png"
              alt="STAR Furniture"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* ── CENTER: Nav Links ── */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8">
            {NAV_LINKS.map(({ name, href }) => {
              const isActive = active === name;
              return (
                <a
                  key={name}
                  href={href}
                  onClick={(e) => handleLinkClick(e, name, href)}
                  className={`relative font-sans text-xs font-semibold tracking-wider py-1.5 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#1769AA]'
                      : 'text-[#4B5563] hover:text-[#1769AA]'
                  }`}
                >
                  {name}
                  {/* Active Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1769AA] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── RIGHT: Search, Wishlist, Cart & WhatsApp Button ── */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search (Circular Pill) */}
            <button
              aria-label="Search"
              onClick={() => scrollTo('#collection')}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200/80 bg-white text-gray-700 hover:text-[#1769AA] hover:border-[#1769AA] hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist (Circular Pill) */}
            <button
              aria-label="Wishlist"
              onClick={() => scrollTo('#collection')}
              className="relative hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200/80 bg-white text-gray-700 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50/50 transition-all cursor-pointer shadow-2xs"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with Green Badge 1 (Circular Pill) */}
            <button
              aria-label="Cart"
              onClick={() => scrollTo('#collection')}
              className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-200/80 bg-white text-gray-700 hover:text-[#1769AA] hover:border-[#1769AA] hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2E9B4B] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Green Pill Button */}
            <a
              href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans font-bold text-xs tracking-wider text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
              style={{
                background: '#25D366',
                padding: '9px 18px',
                borderRadius: '40px',
                whiteSpace: 'nowrap',
              }}
            >
              <MessageCircle className="w-4 h-4 fill-white text-white flex-shrink-0" />
              <span className="hidden sm:inline">CHAT ON WHATSAPP</span>
              <span className="sm:hidden">WHATSAPP</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              aria-label="Toggle Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-700 hover:bg-gray-100 transition-colors ml-1 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            className="md:hidden mt-2 rounded-[28px] p-5 flex flex-col gap-2 shadow-2xl border border-black/6"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                onClick={(e) => handleLinkClick(e, name, href)}
                className={`font-sans text-sm font-semibold tracking-wider py-2.5 border-b border-black/5 transition-colors ${
                  active === name ? 'text-[#1769AA]' : 'text-gray-700 hover:text-[#1769AA]'
                }`}
              >
                {name}
              </a>
            ))}

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setMobileOpen(false); scrollTo('#collection'); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-pink-500"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => { setMobileOpen(false); scrollTo('#collection'); }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#1769AA]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart ({cartCount})</span>
                </button>
              </div>

              <a
                href={getWhatsAppUrl(undefined, WHATSAPP_PRIMARY)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans font-bold text-xs text-white px-3.5 py-2 rounded-full shadow-sm"
                style={{ background: '#25D366' }}
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                CHAT
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
