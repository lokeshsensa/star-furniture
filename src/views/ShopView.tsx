import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, SlidersHorizontal, Search, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { productsData, categoriesList } from '../data/products';
import { ProductCard } from '../components/ProductCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ShopView: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    navigateToProduct,
  } = useShop();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter products by category, subcategory, search term
  let filtered = productsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSubcategory = selectedSubcategory === 'All' || p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();
    const matchesSearch = searchFilter.trim() === '' ||
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.material.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, '') || '0') - parseInt(b.price.replace(/\D/g, '') || '0'));
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, '') || '0') - parseInt(a.price.replace(/\D/g, '') || '0'));
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  useGSAP(
    () => {
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.06,
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [activeCategory, selectedSubcategory, sortBy, searchFilter] }
  );

  return (
    <main ref={sectionRef} className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#065BB6]">
          COMPLETE CATALOGUE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E293B] mt-2">
          Furniture Shop
        </h1>
        <p className="text-[#64748B] text-base font-light mt-3">
          Explore our handcrafted range of solid walnut tables, luxury sofas, and architectural beds.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-8 p-4 rounded-3xl bg-[rgba(255,255,255,0.75)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search products, materials..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs text-[#1E293B] placeholder:text-slate-400 outline-none focus:border-[#065BB6]"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-semibold flex items-center gap-2"
          >
            <Filter className="w-3.5 h-3.5 text-[#065BB6]" />
            Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#1E293B] outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: Category Navigation */}
        <aside className={`md:col-span-3 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 p-6 rounded-[32px] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.9)] shadow-lg space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B] mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#065BB6]" />
                Categories
              </h3>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedSubcategory('All');
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    activeCategory === 'All'
                      ? 'bg-[#065BB6] text-white shadow-sm'
                      : 'text-[#475569] hover:bg-white/80'
                  }`}
                >
                  All Products
                </button>

                {categoriesList.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveCategory(cat.name);
                        setSelectedSubcategory('All');
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-between ${
                        activeCategory.toLowerCase() === cat.name.toLowerCase()
                          ? 'bg-[#065BB6] text-white shadow-sm'
                          : 'text-[#475569] hover:bg-white/80'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {activeCategory.toLowerCase() === cat.name.toLowerCase() && (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Subcategories */}
                    {activeCategory.toLowerCase() === cat.name.toLowerCase() && (
                      <div className="pl-4 space-y-1 pt-1">
                        <button
                          onClick={() => setSelectedSubcategory('All')}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-medium ${
                            selectedSubcategory === 'All' ? 'text-[#065BB6] font-bold' : 'text-slate-500'
                          }`}
                        >
                          All {cat.name}
                        </button>
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubcategory(sub)}
                            className={`w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-medium transition-colors ${
                              selectedSubcategory.toLowerCase() === sub.toLowerCase()
                                ? 'text-[#065BB6] font-bold bg-[#065BB6]/10'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Product Grid */}
        <section className="md:col-span-9">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing {filtered.length} items</span>
            {activeCategory !== 'All' && <span>Filter: {activeCategory}</span>}
          </div>

          {filtered.length > 0 ? (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={navigateToProduct} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 bg-white/50 rounded-3xl border border-slate-200">
              No products found for your current filter settings.
            </div>
          )}
        </section>

      </div>
    </main>
  );
};
