import { getPublicAsset } from '../utils/assets';

export interface Product {
  id: string;
  name: string;
  category: string; // 'Living Room' | 'Bedroom' | 'Dining' | 'Office' | 'Outdoor' | 'Storage' | 'Decor' | 'Home Furniture'
  subcategory: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  oldPrice?: string;
  discountBadge?: string;
  image: string;
  galleryImages: string[];
  material: string;
  dimensions: string;
  finishes: string[];
  colors: string[];
  features: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating?: number;
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  image: string;
  description: string;
  subcategories: string[];
}

// Single centralized WhatsApp configuration variable
export const WHATSAPP_NUMBER = '919999999999';

export const categoriesList: CategoryInfo[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: getPublicAsset('assets/prod_sofa.jpg'),
    description: 'Sculptural sofas, accent chairs, and coffee tables engineered for serene comfort.',
    subcategories: ['Sofas', 'Recliners', 'Lounge Chairs', 'Coffee Tables', 'TV Units'],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: getPublicAsset('assets/prod_bed.jpg'),
    description: 'Sanctuaries of rest crafted with solid timber and ambient illumination.',
    subcategories: ['Beds', 'Wardrobes', 'Dressing Tables', 'Bedside Tables'],
  },
  {
    id: 'dining',
    name: 'Dining',
    image: getPublicAsset('assets/prod_dining.jpg'),
    description: 'Handcrafted solid walnut centerpieces designed for unforgettable gatherings.',
    subcategories: ['Dining Tables', 'Dining Chairs', 'Dining Sets', 'Credenzas'],
  },
  {
    id: 'office',
    name: 'Office',
    image: getPublicAsset('assets/prod_chair.jpg'),
    description: 'Ergonomic wooden desks and executive armchairs for refined workspaces.',
    subcategories: ['Office Tables', 'Office Chairs', 'Office Storage'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    image: getPublicAsset('assets/prod_recliner.jpg'),
    description: 'All-weather teak and woven chairs built to withstand natural elements.',
    subcategories: ['Outdoor Chairs', 'Outdoor Tables', 'Outdoor Furniture'],
  },
  {
    id: 'storage',
    name: 'Storage',
    image: getPublicAsset('assets/prod_wardrobe.jpg'),
    description: 'Custom walk-in suites, sideboards, and floating media consoles.',
    subcategories: ['Wardrobes', 'Sideboards', 'Bookcases', 'Shoe Racks'],
  },
  {
    id: 'decor',
    name: 'Decor',
    image: getPublicAsset('assets/prod_coffeetable.jpg'),
    description: 'Curated organic lamps, floor mirrors, and architectural accents.',
    subcategories: ['Lamps', 'Mirrors', 'Sculptural Decor'],
  },
  {
    id: 'home-furniture',
    name: 'Home Furniture',
    image: getPublicAsset('assets/reveal1.jpg'),
    description: 'Bespoke accent pieces and versatile furniture for modern homes.',
    subcategories: ['Accent Tables', 'Ottomans', 'Benches'],
  },
];

export const collectionsData: Collection[] = [
  {
    id: 'sofas',
    name: 'Living Room Collection',
    subtitle: 'Organic Contours & Tactile Luxury',
    description: 'Sculptural seating defined by organic contours, deep lounge depths, and cloud-like comfort.',
    image: getPublicAsset('assets/prod_sofa.jpg'),
    itemCount: 14,
  },
  {
    id: 'beds',
    name: 'Master Sanctuary Beds',
    subtitle: 'Solid Timber & Ambient Glow',
    description: 'Sanctuaries of rest crafted with solid timber, soft velvet upholstery, and ambient illumination.',
    image: getPublicAsset('assets/prod_bed.jpg'),
    itemCount: 9,
  },
  {
    id: 'dining-tables',
    name: 'Artisan Dining Suite',
    subtitle: 'American Black Walnut & Brass',
    description: 'Handcrafted solid walnut centerpieces designed for unforgettable family gatherings.',
    image: getPublicAsset('assets/prod_dining.jpg'),
    itemCount: 12,
  },
  {
    id: 'chairs',
    name: 'Architectural Chairs',
    subtitle: 'Scandinavian Geometry',
    description: 'Architectural statement chairs combining textured boucle, full-grain leather, and dark walnut.',
    image: getPublicAsset('assets/prod_chair.jpg'),
    itemCount: 18,
  },
  {
    id: 'wardrobes',
    name: 'Smoked Glass Wardrobes',
    subtitle: 'Integrated Smart Illumination',
    description: 'Custom walk-in suites with smoked tempered glass doors and integrated warm sensor light strips.',
    image: getPublicAsset('assets/prod_wardrobe.jpg'),
    itemCount: 8,
  },
  {
    id: 'tv-units',
    name: 'Floating Consoles',
    subtitle: 'Concealed Cable Architecture',
    description: 'Floating media consoles bringing sleek symmetry, travertine stone accents, and cable management.',
    image: getPublicAsset('assets/prod_tvunit.jpg'),
    itemCount: 11,
  },
];

export const productsData: Product[] = [
  {
    id: 'modern-sofa',
    name: 'Modern Sectional Sofa',
    category: 'Living Room',
    subcategory: 'Sofas',
    shortDescription: 'Curved organic modular sofa upholstered in tactile ivory boucle fabric.',
    fullDescription: 'Designed for fluid relaxation, the Modern Sectional Sofa balances fluid architectural curves with plush wool-blend upholstery. Grounded on an organic dark walnut hardwood base, it turns any living space into a serene luxury haven.',
    price: '₹1,25,000',
    oldPrice: '₹1,60,000',
    discountBadge: '22% OFF',
    image: getPublicAsset('assets/prod_sofa.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_sofa.jpg'),
      getPublicAsset('assets/hero.jpg'),
      getPublicAsset('assets/reveal2.jpg'),
    ],
    material: 'American Dark Walnut & Belgian Tactile Boucle',
    dimensions: '280cm (W) x 110cm (D) x 72cm (H)',
    finishes: ['Warm Ivory Boucle', 'Oatmeal Tweed', 'Smoked Espresso Leather'],
    colors: ['Ivory White', 'Oatmeal', 'Espresso Brown'],
    features: ['Solid kiln-dried walnut frame', 'High-resilience foam core', 'Custom stain-resistant weave'],
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
  },
  {
    id: 'luxury-king-bed',
    name: 'Luxury King Platform Bed',
    category: 'Bedroom',
    subcategory: 'Beds',
    shortDescription: 'Monolithic wooden headboard with recessed ambient LED mood lighting.',
    fullDescription: 'The Luxury King Bed commands attention through understated grandeur. Features a padded vertical channel headboard anchored by solid walnut floating nightstands and integrated soft ambient glow strips.',
    price: '₹98,000',
    oldPrice: '₹1,20,000',
    discountBadge: '18% OFF',
    image: getPublicAsset('assets/prod_bed.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_bed.jpg'),
      getPublicAsset('assets/reveal1.jpg'),
    ],
    material: 'Natural Walnut Hardwood & Velvet Suede',
    dimensions: '220cm (W) x 215cm (L) x 140cm (H)',
    finishes: ['Natural Walnut & Sand Velvet', 'Blackened Oak & Charcoal Suede'],
    colors: ['Sand Velvet', 'Charcoal Gray'],
    features: ['Floating side tables included', 'Integrated dimmable LED glow', 'Ergonomic lumbar headboard slope'],
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
  },
  {
    id: 'wooden-dining-table',
    name: 'Artisan Solid Walnut Dining Table',
    category: 'Dining',
    subcategory: 'Dining Tables',
    shortDescription: 'Sculptural solid walnut dining surface seating up to 8 guests comfortably.',
    fullDescription: 'Crafted from a continuous slab of select American Black Walnut, this dining table showcases natural grain flow and chamfered soft edges. Complete with champagne brass leg connectors for subtle metallic sheen.',
    price: '₹1,10,000',
    oldPrice: '₹1,35,000',
    discountBadge: '18% OFF',
    image: getPublicAsset('assets/prod_dining.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_dining.jpg'),
      getPublicAsset('assets/hero.jpg'),
    ],
    material: 'Solid American Black Walnut & Brushed Brass Accent',
    dimensions: '240cm (L) x 100cm (W) x 75cm (H)',
    finishes: ['Raw Natural Matte', 'Smoked Espresso Finish', 'Champagne Honey Wax'],
    colors: ['Walnut Brown', 'Smoked Black'],
    features: ['Chamfered soft safety edges', 'Natural oiled moisture barrier', 'Accommodates 8 dining chairs'],
    isFeatured: true,
    isNewArrival: true,
    rating: 5.0,
  },
  {
    id: 'accent-chair',
    name: 'Scandinavian Accent Armchair',
    category: 'Living Room',
    subcategory: 'Lounge Chairs',
    shortDescription: 'Fluid wooden skeleton armrests with plush organic wool seat cushion.',
    fullDescription: 'Inspired by Scandinavian mid-century mastery, the Accent Chair features a continuous flowing walnut armrest that hugs comfortable, cloud-like wool seat cushions.',
    price: '₹42,000',
    oldPrice: '₹52,000',
    discountBadge: '19% OFF',
    image: getPublicAsset('assets/prod_chair.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_chair.jpg'),
    ],
    material: 'Steam-Bent Walnut & Organic Wool Fabric',
    dimensions: '78cm (W) x 82cm (D) x 76cm (H)',
    finishes: ['Cream Boucle & Walnut', 'Camel Leather & Walnut', 'Forest Green Velvet & Walnut'],
    colors: ['Cream', 'Camel', 'Forest Green'],
    features: ['Hand-carved solid wooden frame', 'Feather-down cushion layer', 'Compact ergonomic footprint'],
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
  },
  {
    id: 'premium-wardrobe',
    name: 'Smoked Glass Walk-in Wardrobe',
    category: 'Storage',
    subcategory: 'Wardrobes',
    shortDescription: 'Walk-in dark walnut wardrobe suite with bronze smoked glass doors.',
    fullDescription: 'An exquisite wardrobe architecture combining dark stained walnut carcass with bronze smoked tempered glass doors. Integrated smart motion lighting illuminates your apparel softly upon touch.',
    price: '₹1,85,000',
    oldPrice: '₹2,30,000',
    discountBadge: '20% OFF',
    image: getPublicAsset('assets/prod_wardrobe.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_wardrobe.jpg'),
    ],
    material: 'Dark Stained Walnut & Smoked Tempered Glass',
    dimensions: '320cm (W) x 65cm (D) x 240cm (H)',
    finishes: ['Smoked Glass & Dark Walnut', 'Frosted Bronze & Honey Oak'],
    colors: ['Dark Walnut', 'Honey Oak'],
    features: ['Smart LED sensor lighting', 'Soft-close German hinges', 'Integrated suede jewelry drawers'],
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
  },
  {
    id: 'tv-unit',
    name: 'Floating Media Console TV Unit',
    category: 'Living Room',
    subcategory: 'TV Units',
    shortDescription: 'Floating media console with concealed wiring channels and soft under-glow.',
    fullDescription: 'Clean horizontal lines elevate your entertainment setup. Mounts effortlessly onto travertine or plastered accent walls with hidden wire channels and tactile push-to-open walnut drawer faces.',
    price: '₹55,000',
    oldPrice: '₹68,000',
    discountBadge: '19% OFF',
    image: getPublicAsset('assets/prod_tvunit.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_tvunit.jpg'),
    ],
    material: 'Walnut Veneer & Travertine Marble Trim',
    dimensions: '220cm (W) x 42cm (D) x 40cm (H)',
    finishes: ['Natural Walnut', 'Charcoal Stained Oak'],
    colors: ['Natural Walnut', 'Charcoal'],
    features: ['Acoustic fabric drawer front option', 'Concealed ventilation slats', 'Wall mount steel harness included'],
    isFeatured: true,
    isNewArrival: true,
    rating: 4.7,
  },
  {
    id: 'recliner',
    name: 'Executive Swivel Leather Recliner',
    category: 'Living Room',
    subcategory: 'Recliners',
    shortDescription: 'Executive aniline leather lounge recliner with 360-degree swivel walnut base.',
    fullDescription: 'The pinnacle of ergonomic relaxation. Hand-molded walnut plywood shells house rich cognac full-grain leather cushions, paired with a matching ottoman stool.',
    price: '₹75,000',
    oldPrice: '₹95,000',
    discountBadge: '21% OFF',
    image: getPublicAsset('assets/prod_recliner.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_recliner.jpg'),
    ],
    material: 'Cognac Aniline Leather & Molded Walnut Shell',
    dimensions: '88cm (W) x 90cm (D) x 85cm (H)',
    finishes: ['Cognac Brown Leather', 'Obsidian Black Leather', 'Ivory Leather'],
    colors: ['Cognac Brown', 'Obsidian Black', 'Ivory'],
    features: ['Matching ottoman included', 'Die-cast aluminum swivel base', 'Pneumatic recline tension lock'],
    isFeatured: true,
    isNewArrival: true,
    rating: 4.9,
  },
  {
    id: 'coffee-table',
    name: 'Organic Dual-Tier Coffee Table',
    category: 'Living Room',
    subcategory: 'Coffee Tables',
    shortDescription: 'Organic dual-tier table featuring solid walnut wood base and clear glass top.',
    fullDescription: 'Sculptured like a fluid stream stone, the Coffee Table layers a 12mm curved tempered glass floating top above a sculpted solid walnut timber pedestal base.',
    price: '₹38,000',
    oldPrice: '₹48,000',
    discountBadge: '20% OFF',
    image: getPublicAsset('assets/prod_coffeetable.jpg'),
    galleryImages: [
      getPublicAsset('assets/prod_coffeetable.jpg'),
    ],
    material: '12mm Tempered Glass & Sculpted Solid Walnut',
    dimensions: '140cm (L) x 85cm (W) x 38cm (H)',
    finishes: ['Clear Glass & Natural Walnut', 'Smoked Glass & Dark Walnut'],
    colors: ['Natural Walnut', 'Dark Walnut'],
    features: ['Heavyweight stable wood base', 'Polished bevel glass edge', 'Dual-tier storage display surface'],
    isFeatured: true,
    isNewArrival: false,
    rating: 4.8,
  },
  {
    id: 'sectional-sofa-2',
    name: 'Modular Cloud Sectional Sofa',
    category: 'Living Room',
    subcategory: 'Sofas',
    shortDescription: 'Expansive L-shaped modular sectional sofa with deep lounge seating.',
    fullDescription: 'Crafted for grand living spaces, this Sectional Sofa features extra-deep seating cushions, cloud-like down filling, and custom stain-resistant linen-blend fabric.',
    price: '₹1,45,000',
    oldPrice: '₹1,80,000',
    discountBadge: '19% OFF',
    image: getPublicAsset('assets/hero.jpg'),
    galleryImages: [
      getPublicAsset('assets/hero.jpg'),
      getPublicAsset('assets/prod_sofa.jpg'),
    ],
    material: 'Natural Linen Blend & Oak Inner Frame',
    dimensions: '340cm (W) x 210cm (D) x 70cm (H)',
    finishes: ['Soft Charcoal', 'Warm Alabaster', 'Olive Tweed'],
    colors: ['Charcoal', 'Alabaster', 'Olive'],
    features: ['Modular arrangement flexibility', 'Feather-down blend padding', 'Removable washable covers'],
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
  },
  {
    id: 'modern-bed-2',
    name: 'Scandinavian White Oak Bed',
    category: 'Bedroom',
    subcategory: 'Beds',
    shortDescription: 'Minimalist low-profile platform bed in solid brushed oak timber.',
    fullDescription: 'Understated Scandinavian geometry defines the Modern Bed. Features an ultra-clean floating platform design with integrated bedside ledges for books and lighting.',
    price: '₹82,000',
    oldPrice: '₹1,02,000',
    discountBadge: '20% OFF',
    image: getPublicAsset('assets/reveal1.jpg'),
    galleryImages: [
      getPublicAsset('assets/reveal1.jpg'),
      getPublicAsset('assets/prod_bed.jpg'),
    ],
    material: 'Solid White Oak & Natural Matte Varnish',
    dimensions: '210cm (W) x 210cm (L) x 95cm (H)',
    finishes: ['Natural White Oak', 'Smoked Black Walnut'],
    colors: ['Natural Oak', 'Blackened Walnut'],
    features: ['Reinforced internal steel slats', 'Low profile modern aesthetic', 'Zero-squeak frame joinery'],
    isFeatured: false,
    isNewArrival: true,
    rating: 4.8,
  },
];

export const getWhatsAppLink = (productName?: string): string => {
  const message = productName
    ? `Hi Star Furniture, I'm interested in the ${productName}. Please share the price and availability.`
    : `Hi Star Furniture, I visited your website and would like to know more about your furniture collection.`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getCartWhatsAppLink = (cartItems: { name: string; quantity: number; finish?: string; price: string }[]): string => {
  if (cartItems.length === 0) return getWhatsAppLink();
  
  const itemsText = cartItems
    .map((item, idx) => `${idx + 1}. ${item.name} (Qty: ${item.quantity}${item.finish ? `, Finish: ${item.finish}` : ''})`)
    .join('\n');
    
  const message = `Hi Star Furniture, I would like to enquire about the following items from my cart:\n\n${itemsText}\n\nPlease share availability, best price, and delivery schedule.`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
