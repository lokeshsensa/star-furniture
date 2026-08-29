import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with Star Furniture on WhatsApp"
      className="whatsapp-ripple-btn fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/80"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      {/* Pulse Notification Dot */}
      <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
      </span>
    </a>
  );
};
