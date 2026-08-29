import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Reveal navbar when scrolling past the intro section (~250px)
      if (scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileMenuOpen(false);
      }

      // Add stronger backdrop blur & shadow when scrolling further down
      if (scrollY > 500) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Collections', href: '#collections' },
    { name: 'Products', href: '#products' },
    { name: 'Featured', href: '#featured' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto transition-all duration-500 transform ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-8 pointer-events-none'
      }`}
    >
      <div
        className={`transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-2xl ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.92)] border border-[rgba(255,255,255,0.95)] shadow-[0_15px_35px_-10px_rgba(6,91,182,0.14)]'
            : 'bg-[rgba(255,255,255,0.78)] border border-[rgba(255,255,255,0.85)] shadow-[0_10px_30px_-10px_rgba(6,91,182,0.08)]'
        }`}
      >
        {/* Star Furniture Logo Image */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Star Furniture Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#334155] hover:text-[#065BB6] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#065BB6] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action: Green Pill Button "Chat on WhatsApp" */}
        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-ripple-btn hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-medium text-xs transition-all duration-300 shadow-md shadow-[rgba(37,211,102,0.3)] hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile WhatsApp Icon Button */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[rgba(6,91,182,0.06)] border border-[rgba(255,255,255,0.7)] flex items-center justify-center text-[#1E293B]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 rounded-3xl p-6 bg-[rgba(255,255,255,0.95)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl flex flex-col gap-4 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#1E293B] py-2 border-b border-[rgba(6,91,182,0.06)] last:border-none hover:text-[#065BB6]"
            >
              {link.name}
            </a>
          ))}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 py-3 px-6 rounded-full bg-[#25D366] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-[rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};
