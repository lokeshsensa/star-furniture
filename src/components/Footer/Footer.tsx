import React from 'react';
import { MapPin, Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { getWhatsAppUrl, PHONE_PRIMARY, PHONE_SECONDARY } from '../../data/products';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071E34] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/branding/star_logo_transparent.png"
                  alt="Star Furniture"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-base tracking-wider text-white leading-none">
                  STAR
                </span>
                <span className="font-sans text-[8px] font-bold tracking-widest text-[#2E9B4B] uppercase mt-0.5 leading-none">
                  FURNITURE
                </span>
              </div>
            </div>

            <p className="font-serif italic text-sm text-[#EEF1EF]/80 font-medium">
              Comfort • Quality • Trust
            </p>

            <p className="font-sans text-xs text-[#EEF1EF]/70 leading-relaxed max-w-xs">
              Handcrafted solid pure teak wood furniture designed for comfort, beauty, and lasting family heritage.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.2em] text-[#2E9B4B] uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2 font-sans text-xs text-[#EEF1EF]/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  COLLECTION
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.2em] text-[#2E9B4B] uppercase">
              SHOWROOM CONTACT
            </h4>
            <div className="space-y-2.5 font-sans text-xs text-[#EEF1EF]/80">
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="flex items-center gap-2 hover:text-[#2E9B4B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2E9B4B]" />
                <span>+91 {PHONE_PRIMARY}</span>
              </a>
              <a
                href={`tel:${PHONE_SECONDARY}`}
                className="flex items-center gap-2 hover:text-[#2E9B4B] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2E9B4B]" />
                <span>+91 {PHONE_SECONDARY}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#2E9B4B] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2E9B4B]" />
                <span>WhatsApp Direct Chat</span>
              </a>
            </div>
          </div>

          {/* Showroom Location */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold tracking-[0.2em] text-[#2E9B4B] uppercase">
              LOCATION
            </h4>
            <div className="flex items-start gap-2 text-xs text-[#EEF1EF]/80">
              <MapPin className="w-4 h-4 text-[#2E9B4B] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                STAR Metals Furniture & Electronics,
                <br />
                Main Road, Bhuvanagiri,
                <br />
                Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEF1EF]/60 font-sans">
          <p>© {new Date().getFullYear()} STAR FURNITURE. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
