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

export const WHATSAPP_NUMBER = '919999999999';

export const collectionsData: Collection[] = [
  {
    id: 'sofas',
    name: 'Sofas & Loungers',
    description: 'Sculptural seating defined by organic contours and cloud-like comfort.',
    image: '/assets/prod_sofa.jpg',
    itemCount: 14,
  },
  {
    id: 'beds',
    name: 'Beds & Bedrooms',
    description: 'Sanctuaries of rest crafted with solid timber and ambient illumination.',
    image: '/assets/prod_bed.jpg',
    itemCount: 9,
  },
  {
    id: 'dining',
    name: 'Dining Tables',
    description: 'Handcrafted solid walnut centerpieces designed for unforgettable gatherings.',
    image: '/assets/prod_dining.jpg',
    itemCount: 12,
  },
  {
    id: 'chairs',
    name: 'Accent Chairs',
    description: 'Architectural statement chairs combining textured boucle and dark walnut.',
    image: '/assets/prod_chair.jpg',
    itemCount: 18,
  },
  {
    id: 'wardrobes',
    name: 'Luxury Wardrobes',
    description: 'Custom walk-in suites with smoked glass and integrated warm light strips.',
    image: '/assets/prod_wardrobe.jpg',
    itemCount: 8,
  },
  {
    id: 'tvunits',
    name: 'Media & TV Consoles',
    description: 'Floating consoles that bring sleek symmetry and concealed cable architecture.',
    image: '/assets/prod_tvunit.jpg',
    itemCount: 11,
  },
];

export const productsData: Product[] = [
  {
    id: 'modern-lounge-sofa',
    name: 'Modern Lounge Sofa',
    category: 'Sofas',
    shortDescription: 'Curved organic modular sofa upholstered in tactile ivory boucle.',
    fullDescription: 'Designed for fluid relaxation, the Modern Lounge Sofa balances fluid architectural curves with plush wool-blend upholstery. Grounded on an organic dark walnut hardwood base, it turns any living space into a serene luxury haven.',
    price: '$4,250',
    image: '/assets/prod_sofa.jpg',
    material: 'American Dark Walnut & Belgian Tactile Boucle',
    dimensions: '280cm (W) x 110cm (D) x 72cm (H)',
    finishes: ['Warm Ivory Boucle', 'Oatmeal Tweed', 'Smoked Espresso Leather'],
    features: ['Solid kiln-dried walnut frame', 'High-resilience foam core', 'Custom stain-resistant weave'],
    isFeatured: true,
  },
  {
    id: 'royal-king-bed',
    name: 'Royal King Bed',
    category: 'Beds',
    shortDescription: 'Monolithic wooden headboard with recessed LED mood lighting.',
    fullDescription: 'The Royal King Bed commands attention through understated grandeur. Features a padded vertical channel headboard anchored by solid walnut floating nightstands and integrated soft ambient glow strips.',
    price: '$5,800',
    image: '/assets/prod_bed.jpg',
    material: 'Natural Walnut Hardwood & Velvet Suede',
    dimensions: '220cm (W) x 215cm (L) x 140cm (H)',
    finishes: ['Natural Walnut & Sand Velvet', 'Blackened Oak & Charcoal Suede'],
    features: ['Floating side tables included', 'Integrated dimmable LED glow', 'Ergonomic lumbar headboard slope'],
    isFeatured: true,
  },
  {
    id: 'walnut-dining-table',
    name: 'Walnut Dining Table',
    category: 'Dining',
    shortDescription: 'Sculptural solid walnut dining surface seating up to 8 guests.',
    fullDescription: 'Crafted from a continuous slab of select American Black Walnut, this dining table showcases natural grain flow and chamfered soft edges. Complete with champagne brass leg connectors for subtle metallic sheen.',
    price: '$3,950',
    image: '/assets/prod_dining.jpg',
    material: 'Solid American Black Walnut & Brushed Brass Accent',
    dimensions: '240cm (L) x 100cm (W) x 75cm (H)',
    finishes: ['Raw Natural Matte', 'Smoked Espresso Finish', 'Champagne Honey Wax'],
    features: ['Chamfered soft safety edges', 'Natural oiled moisture barrier', 'Accommodates 8 dining chairs'],
    isFeatured: true,
  },
  {
    id: 'minimal-accent-chair',
    name: 'Minimal Accent Chair',
    category: 'Chairs',
    shortDescription: 'Fluid wooden skeleton armrests with plush organic seat cushion.',
    fullDescription: 'Inspired by Scandinavian mid-century mastery, the Minimal Accent Chair features a continuous flowing walnut armrest that hugs comfortable, cloud-like wool seat cushions.',
    price: '$1,850',
    image: '/assets/prod_chair.jpg',
    material: 'Steam-Bent Walnut & Organic Wool Fabric',
    dimensions: '78cm (W) x 82cm (D) x 76cm (H)',
    finishes: ['Cream Boucle & Walnut', 'Camel Leather & Walnut', 'Forest Green Velvet & Walnut'],
    features: ['Hand-carved solid wooden frame', 'Feather-down cushion layer', 'Compact ergonomic footprint'],
    isFeatured: true,
  },
  {
    id: 'luxury-wardrobe',
    name: 'Luxury Wardrobe Suite',
    category: 'Wardrobes',
    shortDescription: 'Walk-in dark walnut suite with bronze smoked glass doors.',
    fullDescription: 'An exquisite wardrobe architecture combining dark stained walnut carcass with bronze smoked tempered glass doors. Integrated smart motion lighting illuminates your apparel softly upon touch.',
    price: 'Price on Request',
    image: '/assets/prod_wardrobe.jpg',
    material: 'Dark Stained Walnut & Smoked Tempered Glass',
    dimensions: '320cm (W) x 65cm (D) x 240cm (H)',
    finishes: ['Smoked Glass & Dark Walnut', 'Frosted Bronze & Honey Oak'],
    features: ['Smart LED sensor lighting', 'Soft-close German hinges', 'Integrated suede jewelry drawers'],
    isFeatured: true,
  },
  {
    id: 'contemporary-tv-unit',
    name: 'Contemporary TV Console',
    category: 'TV Units',
    shortDescription: 'Floating media console with hidden wiring and under-glow LED.',
    fullDescription: 'Clean horizontal lines elevate your entertainment setup. Mounts effortlessly onto travertine or plastered accent walls with hidden wire channels and tactile push-to-open walnut drawer faces.',
    price: '$2,650',
    image: '/assets/prod_tvunit.jpg',
    material: 'Walnut Veneer & Travertine Marble Trim',
    dimensions: '220cm (W) x 42cm (D) x 40cm (H)',
    finishes: ['Natural Walnut', 'Charcoal Stained Oak'],
    features: ['Acoustic fabric drawer front option', 'Concealed ventilation slats', 'Wall mount steel harness included'],
    isFeatured: true,
  },
  {
    id: 'classic-recliner',
    name: 'Classic Executive Recliner',
    category: 'Chairs',
    shortDescription: 'Cognac aniline leather lounge chair with 360-degree swivel walnut base.',
    fullDescription: 'The pinnacle of ergonomic relaxation. Hand-molded molded walnut plywood shells house rich cognac full-grain leather cushions, paired with a matching ottoman stool.',
    price: '$3,400',
    image: '/assets/prod_recliner.jpg',
    material: 'Cognac Aniline Leather & Molded Walnut Shell',
    dimensions: '88cm (W) x 90cm (D) x 85cm (H)',
    finishes: ['Cognac Brown Leather', 'Obsidian Black Leather', 'Ivory Leather'],
    features: ['Matching ottoman included', 'Die-cast aluminum swivel base', 'Pneumatic recline tension lock'],
    isFeatured: false,
  },
  {
    id: 'premium-coffee-table',
    name: 'Premium Coffee Table',
    category: 'Tables',
    shortDescription: 'Organic dual-tier table featuring solid walnut wood base and clear glass top.',
    fullDescription: 'Sculptured like a fluid stream stone, the Premium Coffee Table layers a 12mm curved tempered glass floating top above a sculpted solid walnut timber pedestal base.',
    price: '$1,680',
    image: '/assets/prod_coffeetable.jpg',
    material: '12mm Tempered Glass & Sculpted Solid Walnut',
    dimensions: '140cm (L) x 85cm (W) x 38cm (H)',
    finishes: ['Clear Glass & Natural Walnut', 'Smoked Glass & Dark Walnut'],
    features: ['Heavyweight stable wood base', 'Polished bevel glass edge', 'Dual-tier storage display surface'],
    isFeatured: false,
  },
];

export const getWhatsAppLink = (productName?: string): string => {
  const message = productName
    ? `Hi, I'm interested in the ${productName} from WOOD & HOME. Could you please share the price, finish options, and availability details?`
    : `Hi, I visited your WOOD & HOME furniture website and would like to know more about your bespoke furniture collection and showroom appointment options.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
