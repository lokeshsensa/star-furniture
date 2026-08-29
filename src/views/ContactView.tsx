import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/products';

gsap.registerPlugin(useGSAP);

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Star Furniture, my name is ${name} (${phone}). Message: ${message}`;
    window.open(getWhatsAppLink(text), '_blank');
  };

  return (
    <main ref={containerRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1E293B] mt-2">
          Let's Talk Furniture.
        </h1>
        <p className="text-[#64748B] text-base sm:text-lg font-light mt-4">
          Have a question about custom dimensions, wood finishes, or orders? Our concierges are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* LEFT COLUMN: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-[36px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-lg space-y-6">
            <h3 className="font-serif font-bold text-2xl text-[#1E293B]">
              Direct Assistance
            </h3>

            <div className="space-y-5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">WhatsApp Instant</div>
                  <div className="text-sm font-bold mt-0.5">+91 99999 99999</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-[#065BB6] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Call Concierge</div>
                  <div className="text-sm font-bold text-[#1E293B] mt-0.5">+91 99999 99999</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-[#065BB6] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Query</div>
                  <div className="text-sm font-bold text-[#1E293B] mt-0.5">contact@starfurniture.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Glass Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-[40px] bg-[rgba(255,255,255,0.8)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl">
          <h3 className="font-serif font-bold text-2xl text-[#1E293B] mb-2">
            Send an Enquiry
          </h3>
          <p className="text-xs text-slate-500 mb-8">
            Fill out your details below to connect directly with Star Furniture via WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-[#1E293B] outline-none focus:border-[#065BB6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-[#1E293B] outline-none focus:border-[#065BB6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Message / Furniture Interest
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your furniture requirement or custom sizing needs..."
                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-[#1E293B] outline-none focus:border-[#065BB6]"
              />
            </div>

            <button
              type="submit"
              className="whatsapp-ripple-btn w-full py-4 px-8 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Submit & Open WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
