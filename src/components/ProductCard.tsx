import React from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { getWhatsAppLink, type Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div className="product-card group relative rounded-[32px] bg-[rgba(255,255,255,0.6)] backdrop-blur-xl border border-[rgba(255,255,255,0.85)] shadow-lg hover:shadow-2xl hover:bg-[rgba(255,255,255,0.9)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between">
      {/* Large Image Container with Transform-Only Hover Zoom (scale: 1 -> 1.04) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[32px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[rgba(255,255,255,0.75)] backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#065BB6] border border-[rgba(255,255,255,0.9)] shadow-sm">
          {product.category}
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[rgba(15,23,42,0.85)] backdrop-blur-md text-xs font-semibold text-white border border-[rgba(255,255,255,0.2)] shadow-md">
          {product.price}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-7 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif font-bold text-2xl text-[#1E293B] group-hover:text-[#065BB6] transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-[#64748B] font-light leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Actions Row */}
        <div className="mt-6 pt-5 border-t border-[rgba(6,91,182,0.08)] flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect(product)}
            className="flex-1 py-3 px-5 rounded-full bg-[rgba(6,91,182,0.08)] hover:bg-[#065BB6] text-[#065BB6] hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-[rgba(6,91,182,0.12)]"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          <a
            href={getWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            title={`Enquire about ${product.name} on WhatsApp`}
            className="whatsapp-ripple-btn w-11 h-11 rounded-full bg-[rgba(37,211,102,0.12)] border border-[rgba(37,211,102,0.35)] hover:bg-[#25D366] text-[#128C7E] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
};
