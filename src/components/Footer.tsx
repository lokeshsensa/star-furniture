import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';
import { getPublicAsset } from '../utils/assets';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0F172A] text-white pt-20 pb-12 px-4 md:px-8 border-t border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-radial from-[rgba(6,91,182,0.15)] via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(255,255,255,0.1)]">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#hero" className="flex items-center gap-3">
              <img
                src={getPublicAsset('logo.png')}
                alt="Star Furniture Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="mt-4 text-sm text-[rgba(255,255,255,0.7)] font-light leading-relaxed max-w-sm">
              Premium furniture showroom. Comfort, Quality, and Trust in every design. Crafting timeless spaces for modern living.
            </p>
            
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 rounded-full bg-[rgba(37,211,102,0.15)] border border-[rgba(37,211,102,0.3)] hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Instant WhatsApp Inquiry
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h5 className="font-serif font-bold text-base text-white mb-1">
              Explore
            </h5>
            <a href="#hero" className="text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors">Home</a>
            <a href="#collections" className="text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors">Collections</a>
            <a href="#products" className="text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors">Products Showcase</a>
            <a href="#about" className="text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="text-sm text-[rgba(255,255,255,0.65)] hover:text-white transition-colors">Contact</a>
          </div>

          {/* Showroom & Contact */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h5 className="font-serif font-bold text-base text-white mb-1">
              Star Furniture Showroom
            </h5>
            <p className="text-sm text-[rgba(255,255,255,0.65)] font-light leading-relaxed">
              Main Avenue, Furniture Hub District<br />
              Open Daily: 10:00 AM – 8:30 PM
            </p>
            <div className="mt-2 text-xs text-[#38BDF8]">
              WhatsApp: +91 99999 99999
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[rgba(255,255,255,0.5)]">
          <div>
            © {new Date().getFullYear()} Star Furniture. All rights reserved. Premium Furniture Showroom.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
