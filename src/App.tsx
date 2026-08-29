import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { IntroLogo } from './components/IntroLogo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { ProductShowcase } from './components/ProductShowcase';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { FeaturedProductSection } from './components/FeaturedProductSection';
import { WhyStarFurniture } from './components/WhyStarFurniture';
import { ShowroomBanner } from './components/ShowroomBanner';
import { About } from './components/About';
import { FinalReveal } from './components/FinalReveal';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { ShopView } from './views/ShopView';
import { CategoryView } from './views/CategoryView';
import { ProductDetailView } from './views/ProductDetailView';
import { CollectionsView } from './views/CollectionsView';
import { AboutView } from './views/AboutView';
import { ShowroomView } from './views/ShowroomView';
import { ContactView } from './views/ContactView';
import { type Product } from './data/products';

const AppContent: React.FC = () => {
  const { activeView } = useShop();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'shop':
        return <ShopView />;
      case 'category':
        return <CategoryView />;
      case 'product-details':
        return <ProductDetailView />;
      case 'collections':
        return <CollectionsView />;
      case 'about':
        return <AboutView />;
      case 'showroom':
        return <ShowroomView />;
      case 'contact':
        return <ContactView />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <ShopByCategory />
            <ProductShowcase onSelectProduct={setModalProduct} />
            <NewArrivalsCarousel />
            <FeaturedProductSection />
            <WhyStarFurniture />
            <ShowroomBanner />
            <About />
            <FinalReveal />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFBFD] text-[#1E293B] overflow-x-hidden select-none">
      <CustomCursor />
      
      {/* Page 01: Full Screen Star Furniture Logo Intro */}
      {activeView === 'home' && <IntroLogo />}

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Dynamic View Content */}
      {renderCurrentView()}

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal />
      <WishlistDrawer />
      <CartDrawer />
      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
