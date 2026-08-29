import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { productsData, type Product } from '../data/products';

export type PageView =
  | 'home'
  | 'shop'
  | 'category'
  | 'product-details'
  | 'collections'
  | 'about'
  | 'showroom'
  | 'contact';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

interface ShopContextType {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Search state
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Wishlist state
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, finish?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Navigation helpers
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (categoryName: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('star_furniture_wishlist');
      return saved ? JSON.parse(saved) : ['modern-sofa', 'wooden-dining-table'];
    } catch {
      return ['modern-sofa', 'wooden-dining-table'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('star_furniture_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Map saved product IDs back to product objects
        return parsed.map((item: any) => ({
          product: productsData.find((p) => p.id === item.productId) || productsData[0],
          quantity: item.quantity || 1,
          selectedFinish: item.selectedFinish || (productsData.find((p) => p.id === item.productId)?.finishes[0] || ''),
        }));
      }
    } catch {
      // Fallback initial cart item for demo
    }
    return [
      {
        product: productsData[0],
        quantity: 1,
        selectedFinish: productsData[0].finishes[0],
      },
    ];
  });

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('star_furniture_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      const cartToSave = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedFinish: item.selectedFinish,
      }));
      localStorage.setItem('star_furniture_cart', JSON.stringify(cartToSave));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToCart = (product: Product, quantity = 1, finish?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        if (finish) copy[existingIndex].selectedFinish = finish;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedFinish: finish || product.finishes[0] || '',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        activeCategory,
        setActiveCategory,
        selectedProduct,
        setSelectedProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isCartOpen,
        setIsCartOpen,
        navigateToProduct,
        navigateToCategory,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
