export interface Product {
  id: string;
  name: string;
  category: 'Living Room' | 'Bedroom' | 'Dining' | 'Storage' | 'Seating' | 'Swings';
  subcategory: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  posterImage: string;
  features: string[];
  specs: {
    material: string;
    finish: string;
    durability: string;
  };
  isFeatured?: boolean;
}

export interface CategoryData {
  id: string;
  name: string;
  categoryKey: Product['category'];
  tagline: string;
  description: string;
  image: string;
  posterImage: string;
  itemCount: number;
}

export const WHATSAPP_PRIMARY = '9445647167';
export const WHATSAPP_SECONDARY = '9445647909';
export const PHONE_PRIMARY = '9445647167';
export const PHONE_SECONDARY = '9445647909';

export const getWhatsAppUrl = (productName?: string, phone = WHATSAPP_PRIMARY) => {
  const message = productName
    ? `Hello STAR Bhuvanagiri, I viewed your "${productName}" on your website and would like to know more about the product and pricing.`
    : `Hello STAR Bhuvanagiri, I viewed your furniture collection on your website and would like to know more about the products and pricing.`;
  return `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
};

export const productsData: Product[] = [
  {
    id: 'sofa-wheel-arm',
    name: '5 Seater Teak Wood Sofa Collection',
    category: 'Living Room',
    subcategory: 'Sofa Sets',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Exquisite 100% pure teak wood 5-seater sofa suite with distinctive circular wheel arms, turned baluster legs, and deep lounge comfort.',
    fullDescription: 'Crafted with master artisan precision, this 5-seater teak wood sofa set combines traditional South Indian wooden wheel motifs with plush upholstered seat cushions. 100% pure teak ensures multi-generational longevity.',
    image: '/assets/products/product_1.jpg',
    posterImage: '/assets/posters/poster_1.jpg',
    features: [
      '100% Pure Teak Wood for lasting strength',
      'Durable & long lasting construction',
      'Signature circular wheel armrest craftsmanship',
      'Sturdy, stylish & made for everyday living'
    ],
    specs: {
      material: '100% Solid Pure Teak Wood',
      finish: 'Warm Teak Wood Polished Luster',
      durability: 'Generational Strength'
    },
    isFeatured: true
  },
  {
    id: 'three-door-bero',
    name: 'Premium Three Door Teak Wood Bero',
    category: 'Storage',
    subcategory: 'Wardrobes & Beros',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Monolithic three-door wardrobe crafted in 100% pure teak with precision slatted door panels and secure metal handles.',
    fullDescription: 'The Three Door Bero delivers expansive luxury storage with rich teak grain character. Features reinforced shelves, concealed locking mechanisms, and master-crafted timber joinery designed for a lifetime.',
    image: '/assets/products/product_2.jpg',
    posterImage: '/assets/posters/poster_2.jpg',
    features: [
      '100% Pure Teak Wood structure',
      'Three spacious lockable compartments',
      'Timeless craftsmanship that enhances any room',
      'Durable and built to last generations'
    ],
    specs: {
      material: '100% Solid Pure Teak Wood',
      finish: 'Natural Honey Teak Grain Finish',
      durability: 'Heavy-Duty Timber Construction'
    },
    isFeatured: true
  },
  {
    id: 'sofa-carved-spoke',
    name: 'Exquisite Teak Wood 5 Seater Sofa',
    category: 'Living Room',
    subcategory: 'Sofa Sets',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Sculptural teak 5-seater sofa featuring radial spoke wagon wheel armrests and high ergonomic back slat support.',
    fullDescription: 'An architectural tribute to royal Indian furniture design. This 5-seater collection features steam-curved back slats and radial wagon wheel arm accents, paired with a matching solid wood round coffee table.',
    image: '/assets/products/product_3.jpg',
    posterImage: '/assets/posters/poster_3.jpg',
    features: [
      '100% Pure Teak Wood construction',
      'High-back lumbar support slats',
      'Matching center table with under-shelf',
      'High resilience foam seating'
    ],
    specs: {
      material: 'Solid Grade-A Teak Timber',
      finish: 'Rich Amber Teak Gloss',
      durability: 'Lifetime Structural Integrity'
    },
    isFeatured: true
  },
  {
    id: 'two-door-carved-bero',
    name: 'Premium Teak Wood Two Door Bero',
    category: 'Storage',
    subcategory: 'Wardrobes & Beros',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Classic double-door storage almirah crowned with ornate hand-carved floral pediment and geometric panel relief.',
    fullDescription: 'Hand-carved pediments and geometric panel relief highlight the traditional craftsmanship of this premium double-door teak bero. Includes lower storage drawer and smooth interior organizers.',
    image: '/assets/products/product_4.jpg',
    posterImage: '/assets/posters/poster_4.jpg',
    features: [
      'Ornate crown arch hand carving',
      '100% Pure Teak Wood with natural oil finish',
      'Smooth pull drawer at base',
      'Built to last generations with superior quality'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Golden Teak Wood Polish',
      durability: 'Generational Craft'
    },
    isFeatured: true
  },
  {
    id: 'teak-6ft-cot-grid',
    name: 'Teak Wood 6ft Cot — Grid Headboard',
    category: 'Bedroom',
    subcategory: 'King & Queen Beds',
    badge: 'NOW AVAILABLE',
    shortDescription: 'Solid 6-foot teak cot featuring a geometric recessed block headboard and built-in top display shelf ledge.',
    fullDescription: 'Engineered for royal bedroom sanctuaries, this 6ft cot presents rich geometric wood carving on both headboard and footboard. Equipped with a recessed display niche for ambient accents and timeless nighttime comfort.',
    image: '/assets/products/product_5.jpg',
    posterImage: '/assets/posters/poster_5.jpg',
    features: [
      '100% Pure Teak Wood with reinforced frame',
      'Headboard niche shelf for bedtime essentials',
      'Heavy-duty solid wood foundation',
      'Crafted for comfort, built to last'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Warm Chestnut Teak Polish',
      durability: 'Zero-Sag Solid Plank Base'
    },
    isFeatured: true
  },
  {
    id: 'teak-dining-table-lattice',
    name: 'Teak Wood Lattice Grid Dining Table Set',
    category: 'Dining',
    subcategory: 'Dining Tables',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Artisan 6-seater dining table with intricate recessed geometric lattice woodwork on the tabletop and matching high-back chairs.',
    fullDescription: 'A statement of woodworking excellence. The tabletop features handcrafted geometric lattice insert panels framed by thick solid teak borders, accompanied by 6 matching chairs with lattice backrests.',
    image: '/assets/products/product_6.jpg',
    posterImage: '/assets/posters/poster_6.jpg',
    features: [
      '100% Pure Teak Wood table & 6 chairs set',
      'Hand-carved geometric lattice tabletop inserts',
      'Ergonomic high-back posture support chairs',
      'Sturdy, stylish & made for everyday use'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Moisture-Resistant Teak Sheen',
      durability: 'Heavy Solid Timber Build'
    },
    isFeatured: true
  },
  {
    id: 'teak-heavy-teapoy',
    name: 'Premium Teak Wood Heavy Teapoy',
    category: 'Living Room',
    subcategory: 'Coffee & Accent Tables',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Architectural solid teak coffee table with heavy pillar corner posts, dual-grid slatted top, and lower magazine tier.',
    fullDescription: 'A robust living room centerpiece. Designed with heavy square block corner posts and interlocking teak slats that create an open, airy dual-tier surface for magazines, tea sets, and decor.',
    image: '/assets/products/product_7.jpg',
    posterImage: '/assets/posters/poster_7.jpg',
    features: [
      '100% Pure Teak Wood heavy pillar posts',
      'Dual-tier surface with bottom storage shelf',
      'Interlocking slatted tabletop design',
      'Timeless design that enhances any space'
    ],
    specs: {
      material: '100% Solid Pure Teak',
      finish: 'Silken Satin Teak Luster',
      durability: 'Heavy-Duty Teak Joinery'
    },
    isFeatured: true
  },
  {
    id: 'teak-tufted-leather-cot',
    name: 'Royal Tufted Leather Teak Wood 6ft Cot',
    category: 'Bedroom',
    subcategory: 'King & Queen Beds',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Regal master cot with button-tufted cognac leather upholstered headboard, ornate baroque crown arch, and carved scroll footboard.',
    fullDescription: 'The pinnacle of luxury bedroom sanctuaries. Combines opulent button-tufted leather with hand-carved rococo teak scrollwork and sculpted lion-paw corner feet.',
    image: '/assets/products/product_8.jpg',
    posterImage: '/assets/posters/poster_8.jpg',
    features: [
      '100% Pure Teak Wood with hand-carved baroque crest',
      'Padded button-tufted cognac leather headboard',
      'Sculpted curved scroll footboard',
      'Built to last generations with superior quality'
    ],
    specs: {
      material: '100% Pure Teak Wood & Premium Leatherette',
      finish: 'Golden Honey Hand Polish',
      durability: 'Regal Heavy Timber Foundation'
    },
    isFeatured: true
  },
  {
    id: 'teak-bed-independence',
    name: 'Premium Teak Wood Bed & Almirah Suite',
    category: 'Bedroom',
    subcategory: 'King & Queen Beds',
    badge: 'SPECIAL LAUNCH',
    shortDescription: 'Master bedroom suite with floral inlaid star headboard cot and matching double-door teak wardrobe almirah with mirror.',
    fullDescription: 'An exclusive showroom collection featuring a solid 6ft cot with floral star inlays and a matching tall double-door teak wardrobe almirah complete with dressing mirror and lower drawer unit.',
    image: '/assets/products/product_9.jpg',
    posterImage: '/assets/posters/poster_9.jpg',
    features: [
      '100% Pure Teak Wood matching bed & wardrobe suite',
      'Floral geometric star headboard inlays',
      'Wardrobe with integrated dressing mirror and drawers',
      'Timeless beauty, unmatched durability'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Warm Amber Hand Polish',
      durability: 'Generational Strength'
    },
    isFeatured: true
  },
  {
    id: 'teak-nesting-dining-suite',
    name: 'Circular Nesting Teak Wood Dining Suite',
    category: 'Dining',
    subcategory: 'Dining Tables',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Ingenious round teak dining table with radial spoke top and curved slatted chairs that nest seamlessly into a unified cylinder.',
    fullDescription: 'A marvel of functional woodcraft engineering. When not in use, the 6 curved slatted dining chairs tuck completely underneath the radial spoke circular tabletop to form a sculptural wooden drum.',
    image: '/assets/products/product_10.jpg',
    posterImage: '/assets/posters/poster_10.jpg',
    features: [
      '100% Pure Teak Wood radial spoke tabletop',
      '6 Curved chairs that nest flush into the table base',
      'Space-saving architectural circular profile',
      'Sturdy, stylish & made for everyday use'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Protective Teak Wood Sealer',
      durability: 'Precision Nested Solid Timber'
    },
    isFeatured: true
  },
  {
    id: 'teak-chair-10-hole',
    name: 'Teak Wood 10-Hole Carved Chair',
    category: 'Seating',
    subcategory: 'Chairs & Armchairs',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Solid teak dining and accent chair with 10 circular carved perforations on the top crest rail and reinforced H-stretchers.',
    fullDescription: 'Precision crafted for everyday comfort in dining rooms, verandas, and prayer rooms. Features a distinctive 10-hole perforated crest rail, smooth vertical back slats, and cross-braced timber legs for immovable stability.',
    image: '/assets/products/product_11.jpg',
    posterImage: '/assets/posters/poster_11.jpg',
    features: [
      '100% Pure Teak Wood with 10-hole crest carving',
      'Ergonomic vertical slat lumbar support',
      'Reinforced four-way lower leg stretchers',
      'Timeless craftsmanship that enhances any room'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Natural Honey Wax Luster',
      durability: 'High-Load Solid Frame'
    },
    isFeatured: true
  },
  {
    id: 'teak-curved-wave-cot',
    name: 'Sculpted Wave Low-Slung 6ft Teak Cot',
    category: 'Bedroom',
    subcategory: 'King & Queen Beds',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Modern aerodynamic swoop curved teak bed frame with low-slung platform profile and plush navy padded headboard.',
    fullDescription: 'A dynamic fusion of modern architectural curves and solid timber craft. Features continuous side rail swoops that flow effortlessly from the curved headboard to the low-profile footboard.',
    image: '/assets/products/product_12.jpg',
    posterImage: '/assets/posters/poster_12.jpg',
    features: [
      'Continuous aerodynamic curved teak side rails',
      'Padded navy blue cushioned headboard',
      'Low-slung contemporary platform architecture',
      'Crafted for comfort, built to last'
    ],
    specs: {
      material: '100% Pure Teak Wood & Velvet Fabric',
      finish: 'Warm Amber Satin Teak',
      durability: 'Contoured Heavy Hardwood Build'
    },
    isFeatured: true
  },
  {
    id: 'teak-bunk-bed',
    name: 'Teak Wood Solid Bunk Bed',
    category: 'Bedroom',
    subcategory: 'Bunk Beds & Kids',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Heavy-duty solid teak wood bunk bed featuring integrated guardrails and reinforced safety ladder.',
    fullDescription: 'Built with the highest safety and structural standards, this teak bunk bed maximizes room space while ensuring rock-solid stability for growing families.',
    image: '/assets/products/product_13.jpg',
    posterImage: '/assets/posters/poster_13.jpg',
    features: [
      '100% Pure Teak Wood heavy safety rails',
      'Reinforced ladder steps with firm grip',
      'Zero-wobble timber post joinery',
      'Strong & reliable for lifelong use'
    ],
    specs: {
      material: '100% Solid Pure Teak Wood',
      finish: 'Smooth Child-Safe Natural Teak Polish',
      durability: 'Heavy-Duty Dual-Deck Support'
    },
    isFeatured: true
  },
  {
    id: 'teak-ivory-tufted-bed',
    name: 'Imperial Ivory Tufted Teak Bed',
    category: 'Bedroom',
    subcategory: 'King & Queen Beds',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Imperial master cot with turned finial corner pillars, ivory button-tufted arch backrest, and classic 3-panel box footboard.',
    fullDescription: 'Exudes stately elegance. Combines plush ivory diamond-tufted upholstery with turned baluster corner posts and traditional paneled teak footboards.',
    image: '/assets/products/product_14.jpg',
    posterImage: '/assets/posters/poster_14.jpg',
    features: [
      'Turned finial corner pillar posts',
      'Diamond button-tufted ivory fabric backrest',
      '3-Panel recessed geometric footboard',
      'Built to last generations with superior quality'
    ],
    specs: {
      material: '100% Pure Teak Wood & Ivory Linen Weave',
      finish: 'Deep Golden Teak Finish',
      durability: 'Lifetime Structural Integrity'
    },
    isFeatured: true
  },
  {
    id: 'teak-rosette-dining-frame',
    name: 'Royal Floral Rosette Dining Table Frame',
    category: 'Dining',
    subcategory: 'Dining Tables',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Sculpted round/oval teak dining table base with floral rosette medallions, curved perimeter frame, and center pillar base.',
    fullDescription: 'A masterwork of traditional Indian wood carving. Features hand-carved floral rosette medallions along the rounded rail frame, anchored to a turned center pillar pedestal.',
    image: '/assets/products/product_15.jpg',
    posterImage: '/assets/posters/poster_15.jpg',
    features: [
      '100% Pure Teak Wood carved rosette medallions',
      'Heavy turned center pedestal column',
      'Custom glass/wood tabletop ready base',
      'Timeless beauty, unmatched durability'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Warm Chestnut Gloss Polish',
      durability: 'Solid Timber Construction'
    },
    isFeatured: true
  },
  {
    id: 'teak-swing-collection',
    name: 'Teak Wood Swing Collection (Oonjal)',
    category: 'Swings',
    subcategory: 'Heritage Swings',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Traditional handcrafted teak wood swing with brass links, carved backrest, and smooth gliding comfort.',
    fullDescription: 'Bring the cherished heritage of traditional Indian living into your veranda or living hall. Made from heavy pure teak wood planks with reinforced hanging anchors for supreme safety.',
    image: '/assets/products/product_16.jpg',
    posterImage: '/assets/posters/poster_16.jpg',
    features: [
      '100% Pure Teak Wood solid plank swing seat',
      'Carved backrest and comfortable armrests',
      'Heavy-duty hanging hardware anchors',
      'Sturdy, stylish & made for everyday relaxation'
    ],
    specs: {
      material: '100% Solid Pure Teak Wood',
      finish: 'Heritage Royal Teak Wax Polish',
      durability: 'Heavy-Duty Weight Rating'
    },
    isFeatured: true
  },
  {
    id: 'teak-maddu-vandi',
    name: 'Teak Wood Maddu Vandi Collection',
    category: 'Living Room',
    subcategory: 'Heritage Living Suite',
    badge: 'NEWLY LAUNCHED',
    shortDescription: 'Iconic traditional Maddu Vandi chariot-style sofa set with carved teak wooden wheels and regal seating.',
    fullDescription: 'A showpiece of cultural woodworking mastery. The Maddu Vandi suite brings the legendary craftsmanship of South Indian temple chariot wheels to a luxury living room statement piece.',
    image: '/assets/products/product_17.jpg',
    posterImage: '/assets/posters/poster_17.jpg',
    features: [
      '100% Pure Teak Wood signature wheel carriage design',
      'High-relief traditional timber joinery',
      'Deep cushioned seating for modern comfort',
      'Crafted for comfort, built to last'
    ],
    specs: {
      material: '100% Pure Teak Wood',
      finish: 'Deep Teak Heritage Luster',
      durability: 'Generational Collector Grade'
    },
    isFeatured: true
  }
];

export const categoriesList: CategoryData[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    categoryKey: 'Living Room',
    tagline: 'Timeless comfort for everyday living',
    description: 'Exquisite 5-seater sofa suites, Maddu Vandi chariot sets, and heavy solid teak teapoy tables.',
    image: '/assets/products/product_1.jpg',
    posterImage: '/assets/posters/poster_1.jpg',
    itemCount: 4
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    categoryKey: 'Bedroom',
    tagline: 'Sanctuaries of rest and generational craft',
    description: 'Solid 6ft cots, royal tufted leather beds, and safe solid bunk beds engineered for peaceful slumber.',
    image: '/assets/products/product_8.jpg',
    posterImage: '/assets/posters/poster_8.jpg',
    itemCount: 6
  },
  {
    id: 'dining',
    name: 'Dining',
    categoryKey: 'Dining',
    tagline: 'Centerpieces for memorable family banquets',
    description: 'Handcrafted solid teak lattice dining sets and nesting circular dining tables with matching chairs.',
    image: '/assets/products/product_6.jpg',
    posterImage: '/assets/posters/poster_6.jpg',
    itemCount: 3
  },
  {
    id: 'storage',
    name: 'Storage',
    categoryKey: 'Storage',
    tagline: 'Monolithic security and elegant timber architecture',
    description: 'Three-door and double-door carved teak wood beros with spacious interior layouts.',
    image: '/assets/products/product_2.jpg',
    posterImage: '/assets/posters/poster_2.jpg',
    itemCount: 2
  },
  {
    id: 'seating',
    name: 'Seating',
    categoryKey: 'Seating',
    tagline: 'Posture-perfect ergonomic wooden armchairs',
    description: 'Contoured solid teak chairs with reinforced stretchers and hand-buffed finishes.',
    image: '/assets/products/product_11.jpg',
    posterImage: '/assets/posters/poster_11.jpg',
    itemCount: 1
  },
  {
    id: 'swings',
    name: 'Swings',
    categoryKey: 'Swings',
    tagline: 'Cherished heritage for peaceful afternoons',
    description: 'Solid teak wood Oonjal swings with carved backrests and heavy-duty hanging anchors.',
    image: '/assets/products/product_16.jpg',
    posterImage: '/assets/posters/poster_16.jpg',
    itemCount: 1
  }
];

export const horizontalCollection = [
  {
    number: '01 / 06',
    title: 'SOFAS & LIVING',
    subtitle: '100% Pure Teak Wood 5-Seater Sets',
    description: 'Organic wheel armrests and deep lounge comfort.',
    image: '/assets/products/product_1.jpg',
    poster: '/assets/posters/poster_1.jpg',
    category: 'Living Room'
  },
  {
    number: '02 / 06',
    title: 'BEDS & COTS',
    subtitle: 'Royal Tufted Leather & 6ft Cots',
    description: 'Carved baroque crowns and lifetime joinery.',
    image: '/assets/products/product_8.jpg',
    poster: '/assets/posters/poster_8.jpg',
    category: 'Bedroom'
  },
  {
    number: '03 / 06',
    title: 'DINING SUITES',
    subtitle: 'Lattice Grid & Nesting Dining Tables',
    description: 'Stain-resistant moisture barrier for grand feasts.',
    image: '/assets/products/product_6.jpg',
    poster: '/assets/posters/poster_6.jpg',
    category: 'Dining'
  },
  {
    number: '04 / 06',
    title: 'BEROS & STORAGE',
    subtitle: 'Three Door & Carved Two Door Beros',
    description: 'Lockable spacious compartments in golden teak.',
    image: '/assets/products/product_2.jpg',
    poster: '/assets/posters/poster_2.jpg',
    category: 'Storage'
  },
  {
    number: '05 / 06',
    title: 'SEATING & CHAIRS',
    subtitle: 'Ergonomic Solid Wood Chairs',
    description: 'Posture-contoured back slats with reinforced stretchers.',
    image: '/assets/products/product_11.jpg',
    poster: '/assets/posters/poster_11.jpg',
    category: 'Seating'
  },
  {
    number: '06 / 06',
    title: 'HERITAGE SWINGS',
    subtitle: 'Traditional Solid Teak Oonjal',
    description: 'Solid plank swing seat with hand-carved details.',
    image: '/assets/products/product_16.jpg',
    poster: '/assets/posters/poster_16.jpg',
    category: 'Swings'
  }
];
