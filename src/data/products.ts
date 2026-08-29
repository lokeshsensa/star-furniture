import { getPublicAsset } from '../utils/assets';

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  image: string;
  material: string;
  dimensions: string;
  finishes: string[];
  features: string[];
  isFeatured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

// Single centralized WhatsApp configuration variable for easy client replacement
export const WHATSAPP_NUMBER = '919999999999';

export const collectionsData: Collection[] = [
  {
    id: 'sofas',
    name: 'Sofas',
    description: 'Sculptural seating defined by organic contours and cloud-like comfort.',
    image: getPublicAsset('assets/prod_sofa.jpg'),
    itemCount: 14,
  },
  {
    id: 'beds',
    name: 'Beds',
    description: 'Sanctuaries of rest crafted with solid timber and ambient illumination.',
    image: getPublicAsset('assets/prod_bed.jpg'),
    itemCount: 9,
  },
  {
    id: 'dining-tables',
    name: 'Dining Tables',
    description: 'Handcrafted solid walnut centerpieces designed for unforgettable gatherings.',
    image: getPublicAsset('assets/prod_dining.jpg'),
    itemCount: 12,
  },
  {
    id: 'chairs',
    name: 'Chairs',
    description: 'Architectural statement chairs combining textured boucle and dark walnut.',
    image: getPublicAsset('assets/prod_chair.jpg'),
    itemCount: 18,
  },
  {
    id: 'wardrobes',
    name: 'Wardrobes',
    description: 'Custom walk-in suites with smoked glass and integrated warm light strips.',
    image: getPublicAsset('assets/prod_wardrobe.jpg'),
    itemCount: 8,
  },
  {
    id: 'tv-units',
    name: 'TV Units',
    description: 'Floating consoles that bring sleek symmetry and concealed cable architecture.',
    image: getPublicAsset('assets/prod_tvunit.jpg'),
    itemCount: 11,
  },
  {
    id: 'coffee-tables',
    name: 'Coffee Tables',
    description: 'Sculpted organic coffee tables crafted from glass, marble, and hardwood.',
    image: getPublicAsset('assets/prod_coffeetable.jpg'),
    itemCount: 10,
  },
  {
    id: 'home-furniture',
    name: 'Home Furniture',
    description: 'Curated lounge recliners, credenzas, and statement pieces for modern homes.',
    image: getPublicAsset('assets/prod_recliner.jpg'),
    itemCount: 15,
  },
];

export const productsData: Product[] = [
  {
    id: 'modern-sofa',
    name: 'Modern Sofa',
    category: 'Sofas',
    shortDescription: 'Curved organic modular sofa upholstered in tactile ivory boucle fabric.',
    fullDescription: 'Designed for fluid relaxation, the Modern Sofa balances fluid architectural curves with plush wool-blend upholstery. Grounded on an organic dark walnut hardwood base, it turns any living space into a serene luxury haven.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_sofa.jpg'),
    material: 'American Dark Walnut & Belgian Tactile Boucle',
    dimensions: '280cm (W) x 110cm (D) x 72cm (H)',
    finishes: ['Warm Ivory Boucle', 'Oatmeal Tweed', 'Smoked Espresso Leather'],
    features: ['Solid kiln-dried walnut frame', 'High-resilience foam core', 'Custom stain-resistant weave'],
    isFeatured: true,
  },
  {
    id: 'luxury-king-bed',
    name: 'Luxury King Bed',
    category: 'Beds',
    shortDescription: 'Monolithic wooden headboard with recessed ambient LED mood lighting.',
    fullDescription: 'The Luxury King Bed commands attention through understated grandeur. Features a padded vertical channel headboard anchored by solid walnut floating nightstands and integrated soft ambient glow strips.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_bed.jpg'),
    material: 'Natural Walnut Hardwood & Velvet Suede',
    dimensions: '220cm (W) x 215cm (L) x 140cm (H)',
    finishes: ['Natural Walnut & Sand Velvet', 'Blackened Oak & Charcoal Suede'],
    features: ['Floating side tables included', 'Integrated dimmable LED glow', 'Ergonomic lumbar headboard slope'],
    isFeatured: true,
  },
  {
    id: 'wooden-dining-table',
    name: 'Wooden Dining Table',
    category: 'Dining Tables',
    shortDescription: 'Sculptural solid walnut dining surface seating up to 8 guests comfortably.',
    fullDescription: 'Crafted from a continuous slab of select American Black Walnut, this dining table showcases natural grain flow and chamfered soft edges. Complete with champagne brass leg connectors for subtle metallic sheen.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_dining.jpg'),
    material: 'Solid American Black Walnut & Brushed Brass Accent',
    dimensions: '240cm (L) x 100cm (W) x 75cm (H)',
    finishes: ['Raw Natural Matte', 'Smoked Espresso Finish', 'Champagne Honey Wax'],
    features: ['Chamfered soft safety edges', 'Natural oiled moisture barrier', 'Accommodates 8 dining chairs'],
    isFeatured: true,
  },
  {
    id: 'accent-chair',
    name: 'Accent Chair',
    category: 'Chairs',
    shortDescription: 'Fluid wooden skeleton armrests with plush organic wool seat cushion.',
    fullDescription: 'Inspired by Scandinavian mid-century mastery, the Accent Chair features a continuous flowing walnut armrest that hugs comfortable, cloud-like wool seat cushions.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_chair.jpg'),
    material: 'Steam-Bent Walnut & Organic Wool Fabric',
    dimensions: '78cm (W) x 82cm (D) x 76cm (H)',
    finishes: ['Cream Boucle & Walnut', 'Camel Leather & Walnut', 'Forest Green Velvet & Walnut'],
    features: ['Hand-carved solid wooden frame', 'Feather-down cushion layer', 'Compact ergonomic footprint'],
    isFeatured: true,
  },
  {
    id: 'premium-wardrobe',
    name: 'Premium Wardrobe',
    category: 'Wardrobes',
    shortDescription: 'Walk-in dark walnut wardrobe suite with bronze smoked glass doors.',
    fullDescription: 'An exquisite wardrobe architecture combining dark stained walnut carcass with bronze smoked tempered glass doors. Integrated smart motion lighting illuminates your apparel softly upon touch.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_wardrobe.jpg'),
    material: 'Dark Stained Walnut & Smoked Tempered Glass',
    dimensions: '320cm (W) x 65cm (D) x 240cm (H)',
    finishes: ['Smoked Glass & Dark Walnut', 'Frosted Bronze & Honey Oak'],
    features: ['Smart LED sensor lighting', 'Soft-close German hinges', 'Integrated suede jewelry drawers'],
    isFeatured: true,
  },
  {
    id: 'tv-unit',
    name: 'TV Unit',
    category: 'TV Units',
    shortDescription: 'Floating media console with concealed wiring channels and soft under-glow.',
    fullDescription: 'Clean horizontal lines elevate your entertainment setup. Mounts effortlessly onto travertine or plastered accent walls with hidden wire channels and tactile push-to-open walnut drawer faces.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_tvunit.jpg'),
    material: 'Walnut Veneer & Travertine Marble Trim',
    dimensions: '220cm (W) x 42cm (D) x 40cm (H)',
    finishes: ['Natural Walnut', 'Charcoal Stained Oak'],
    features: ['Acoustic fabric drawer front option', 'Concealed ventilation slats', 'Wall mount steel harness included'],
    isFeatured: true,
  },
  {
    id: 'recliner',
    name: 'Recliner Chair',
    category: 'Home Furniture',
    shortDescription: 'Executive aniline leather lounge recliner with 360-degree swivel walnut base.',
    fullDescription: 'The pinnacle of ergonomic relaxation. Hand-molded walnut plywood shells house rich cognac full-grain leather cushions, paired with a matching ottoman stool.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_recliner.jpg'),
    material: 'Cognac Aniline Leather & Molded Walnut Shell',
    dimensions: '88cm (W) x 90cm (D) x 85cm (H)',
    finishes: ['Cognac Brown Leather', 'Obsidian Black Leather', 'Ivory Leather'],
    features: ['Matching ottoman included', 'Die-cast aluminum swivel base', 'Pneumatic recline tension lock'],
    isFeatured: true,
  },
  {
    id: 'coffee-table',
    name: 'Coffee Table',
    category: 'Coffee Tables',
    shortDescription: 'Organic dual-tier table featuring solid walnut wood base and clear glass top.',
    fullDescription: 'Sculptured like a fluid stream stone, the Coffee Table layers a 12mm curved tempered glass floating top above a sculpted solid walnut timber pedestal base.',
    price: 'Price on Request',
    image: getPublicAsset('assets/prod_coffeetable.jpg'),
    material: '12mm Tempered Glass & Sculpted Solid Walnut',
    dimensions: '140cm (L) x 85cm (W) x 38cm (H)',
    finishes: ['Clear Glass & Natural Walnut', 'Smoked Glass & Dark Walnut'],
    features: ['Heavyweight stable wood base', 'Polished bevel glass edge', 'Dual-tier storage display surface'],
    isFeatured: true,
  },
  {
    id: 'sectional-sofa',
    name: 'Sectional Sofa',
    category: 'Sofas',
    shortDescription: 'Expansive L-shaped modular sectional sofa with deep lounge seating.',
    fullDescription: 'Crafted for grand living spaces, this Sectional Sofa features extra-deep seating cushions, cloud-like down filling, and custom stain-resistant linen-blend fabric.',
    price: 'Price on Request',
    image: getPublicAsset('assets/hero.jpg'),
    material: 'Natural Linen Blend & Oak Inner Frame',
    dimensions: '340cm (W) x 210cm (D) x 70cm (H)',
    finishes: ['Soft Charcoal', 'Warm Alabaster', 'Olive Tweed'],
    features: ['Modular arrangement flexibility', 'Feather-down blend padding', 'Removable washable covers'],
    isFeatured: false,
  },
  {
    id: 'modern-bed',
    name: 'Modern Bed',
    category: 'Beds',
    shortDescription: 'Minimalist low-profile platform bed in solid brushed oak timber.',
    fullDescription: 'Understated Scandinavian geometry defines the Modern Bed. Features an ultra-clean floating platform design with integrated bedside ledges for books and lighting.',
    price: 'Price on Request',
    image: getPublicAsset('assets/reveal1.jpg'),
    material: 'Solid White Oak & Natural Matte Varnish',
    dimensions: '210cm (W) x 210cm (L) x 95cm (H)',
    finishes: ['Natural White Oak', 'Smoked Black Walnut'],
    features: ['Reinforced internal steel slats', 'Low profile modern aesthetic', 'Zero-squeak frame joinery'],
    isFeatured: false,
  },
];

export const getWhatsAppLink = (productName?: string): string => {
  const message = productName
    ? `Hi, I'm interested in the ${productName}. Please share the price and details.`
    : `Hi, I visited the Star Furniture website and would like to know more about your furniture collection.`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
