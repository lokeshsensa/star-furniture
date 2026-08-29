import { useState } from 'react';
import { IntroLogo } from './components/IntroLogo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Collections } from './components/Collections';
import { ProductShowcase } from './components/ProductShowcase';
import { FeaturedProductSection } from './components/FeaturedProductSection';
import { ProductModal } from './components/ProductModal';
import { About } from './components/About';
import { FinalReveal } from './components/FinalReveal';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import type { Product } from './data/products';
import './styles/liquid-morphism.css';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FAFBFD] text-[#1E293B] font-sans antialiased selection:bg-[#065BB6]/20 selection:text-[#065BB6]">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* PAGE 01 — STAR FURNITURE LOGO INTRO SECTION (Exact match to reference screenshot) */}
      <IntroLogo />

      {/* Floating Liquid Morphism Navbar */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* PAGE 02 — HOME / HERO */}
        <Hero />

        {/* PAGE 03 — COLLECTIONS */}
        <Collections />

        {/* PAGE 04 — PRODUCT SHOWCASE */}
        <ProductShowcase onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* PAGE 05 — FEATURED PRODUCT DETAILS */}
        <FeaturedProductSection />

        {/* PAGE 06 — ABOUT STAR FURNITURE */}
        <About />

        {/* PAGE 07 — FINAL CONTACT SECTION WITH PERSON ASSET & WHATSAPP */}
        <FinalReveal />
      </main>

      {/* Product Quick-View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
