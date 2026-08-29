import React from 'react';
import { Eye, MessageCircle, Heart } from 'lucide-react';
import { getWhatsAppLink, type Product } from '../data/products';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card group relative rounded-[28px] bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between">
      {/* Product Image Container (Occupies ~70% of card height) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[28px] bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-[#065BB6] border border-slate-200/80 shadow-sm">
          {product.category}
        </div>

        {/* Discount Badge */}
        {product.discountBadge && (
          <div className="absolute top-3.5 left-28 px-2.5 py-1 rounded-full bg-[#D97706] text-white text-[10px] font-bold shadow-sm">
            {product.discountBadge}
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md border border-white/80 flex items-center justify-center transition-all ${
            inWishlist
              ? 'bg-red-500 text-white border-red-500 shadow-md'
              : 'bg-white/80 text-slate-500 hover:text-red-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content Footer */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#1E293B] group-hover:text-[#065BB6] transition-colors truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions Row */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="font-serif font-bold text-base text-[#1E293B]">
              {product.price}
            </div>
            {product.oldPrice && (
              <div className="text-[11px] text-slate-400 line-through">
                {product.oldPrice}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(product)}
              className="py-2.5 px-4 rounded-full bg-[#065BB6]/10 hover:bg-[#065BB6] text-[#065BB6] hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Enquire about ${product.name} on WhatsApp`}
              className="whatsapp-ripple-btn w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366] text-[#128C7E] hover:text-white flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
