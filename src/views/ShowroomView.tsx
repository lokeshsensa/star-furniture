import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';
import { getPublicAsset } from '../utils/assets';
import { getWhatsAppLink } from '../data/products';

gsap.registerPlugin(useGSAP);

export const ShowroomView: React.FC = () => {
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

  return (
    <main ref={containerRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          FLAGSHIP DESTINATION
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1E293B] mt-2">
          Visit Star Furniture Showroom
        </h1>
        <p className="text-[#64748B] text-base sm:text-lg font-light mt-4">
          Experience our handcrafted furniture collections in person.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* LEFT COLUMN: Gallery & Map Placeholder */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-[16/10] rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,255,255,0.9)] bg-slate-900">
            <img
              src={getPublicAsset('assets/reveal2.jpg')}
              alt="Star Furniture Flagship Showroom Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                MAIN SHOWROOM FLOOR
              </span>
              <h3 className="font-serif text-2xl font-bold mt-2">Architectural Display Galleries</h3>
            </div>
          </div>

          {/* Interactive Map Placeholder Card */}
          <div className="p-8 rounded-[36px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-lg flex flex-col items-center justify-center text-center py-14">
            <div className="w-14 h-14 rounded-full bg-[rgba(6,91,182,0.1)] text-[#065BB6] flex items-center justify-center mb-4">
              <Navigation className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-xl text-[#1E293B]">Interactive Map Location</h4>
            <p className="text-xs text-slate-500 max-w-sm mt-2">
              Star Furniture Flagship Showroom, Main Furniture Hub Avenue, Metro Zone.
            </p>

            <a
              href={getWhatsAppLink("Hi Star Furniture, please share your exact Google Maps showroom location.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 rounded-full bg-[#065BB6] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#0F4B9C] transition-colors"
            >
              Get Live Location on WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Details & Hours */}
        <div className="lg:col-span-5 p-8 sm:p-10 rounded-[40px] bg-[rgba(255,255,255,0.8)] backdrop-blur-2xl border border-[rgba(255,255,255,0.95)] shadow-2xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(6,91,182,0.1)] text-xs font-semibold uppercase tracking-wider text-[#065BB6] mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>SHOWROOM INFO</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#1E293B]">
              Star Furniture Store
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#065BB6] border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Address</div>
                <div className="text-sm font-medium text-[#1E293B] mt-0.5 leading-relaxed">
                  Star Furniture Building, Main Furniture Hub Road, Metro City - 560001
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#065BB6] border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Opening Hours</div>
                <div className="text-sm font-medium text-[#1E293B] mt-0.5">
                  Monday – Sunday: 10:00 AM – 9:00 PM
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white text-[#065BB6] border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Helpline / Phone</div>
                <div className="text-sm font-medium text-[#1E293B] mt-0.5">
                  +91 99999 99999
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <a
              href={getWhatsAppLink("Hi Star Furniture, I would like to schedule a showroom visit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-ripple-btn w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Book Showroom Visit on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
