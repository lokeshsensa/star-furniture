import React from 'react';
import { MessageSquare, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, PHONE_PRIMARY, PHONE_SECONDARY } from '../../data/products';

export const ContactCTA: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#F7F8F6] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0B2E4F] text-white p-8 sm:p-14 text-center shadow-xl border border-[#1769AA]/30">
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#071E34] border border-[#1769AA]/40 text-[#2E9B4B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">
                DIRECT SHOWROOM ENQUIRY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight uppercase">
              READY TO FIND YOUR PERFECT PIECE?
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#EEF1EF]/90 font-normal leading-relaxed">
              Connect with STAR Furniture for your next piece.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* WhatsApp Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2E9B4B] text-white text-xs sm:text-sm font-bold tracking-wider hover:bg-[#1E7E34] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 group cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>CHAT ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4 text-white transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>

              {/* Call Primary */}
              <a
                href={`tel:${PHONE_PRIMARY}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full border border-[#1769AA]/40 text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#1769AA]/20 hover:border-[#1769AA] transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#2E9B4B]" />
                <span>CALL {PHONE_PRIMARY}</span>
              </a>

              {/* Call Secondary */}
              <a
                href={`tel:${PHONE_SECONDARY}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full border border-[#1769AA]/40 text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#1769AA]/20 hover:border-[#1769AA] transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-[#2E9B4B]" />
                <span>CALL {PHONE_SECONDARY}</span>
              </a>
            </div>

            <p className="font-sans text-[10px] tracking-widest text-[#2E9B4B] uppercase pt-2">
              STAR METALS FURNITURE & ELECTRONICS • BHUVANAGIRI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
