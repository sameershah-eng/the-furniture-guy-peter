import { getSingleImageForType } from './imageLibrary';

export interface RoomHotspot {
  id: string;
  productId: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  label: string;
}

export interface RoomLook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categorySlug: 'living-room' | 'dining-room' | 'bedroom';
  style: string;
  fullRoomImage: string;
  description: string;
  hotspots: RoomHotspot[];
  productIds: string[];
}

export const rooms: RoomLook[] = [
  // ================= LIVING ROOM STYLES =================
  {
    id: "room-lr-1",
    slug: "modern-haven",
    title: "The Modern Haven Drawing Room",
    subtitle: "Sunlit architectural proportion with warm tactile textures",
    categorySlug: "living-room",
    style: "Modern",
    fullRoomImage: getSingleImageForType("living-room", 0),
    description: "Curated for light-filled townhouses and contemporary loft extensions. Anchored by the Aurelia 3-Seater in burnt amber velvet and balanced by the sculptural Battersea solid oak coffee table and fluted Mayfair credenza.",
    productIds: ["prod-lr-1", "prod-lr-2", "prod-lr-3", "prod-lr-4", "prod-lr-5"],
    hotspots: [
      { id: "hs-lr-1-1", productId: "prod-lr-1", x: 48, y: 56, label: "Aurelia 3-Seater Velvet Sofa" },
      { id: "hs-lr-1-2", productId: "prod-lr-2", x: 22, y: 65, label: "Richmond Cocoon Swivel Armchair" },
      { id: "hs-lr-1-3", productId: "prod-lr-3", x: 50, y: 75, label: "Battersea Sculptural Coffee Table" },
      { id: "hs-lr-1-4", productId: "prod-lr-4", x: 80, y: 50, label: "Mayfair Fluted Media Credenza" },
      { id: "hs-lr-1-5", productId: "prod-lr-5", x: 14, y: 75, label: "Chelsea Cantilever Accent Table" },
    ],
  },
  {
    id: "room-lr-2",
    slug: "kensington-classic",
    title: "Kensington Heritage Library & Lounge",
    subtitle: "Regal proportions, hand-tufted aniline leather, and timeless warmth",
    categorySlug: "living-room",
    style: "Classic",
    fullRoomImage: getSingleImageForType("living-room", 1),
    description: "Evoking the quiet grandeur of London's royal borough. Anchored by the Kensington Chesterfield with its deep buttoning, flanked by fireside wingback seating and smoked oak accent cabinetry.",
    productIds: ["prod-lr-6", "prod-lr-7", "prod-lr-3", "prod-lr-4", "prod-lr-5"],
    hotspots: [
      { id: "hs-lr-2-1", productId: "prod-lr-6", x: 46, y: 58, label: "Kensington Hand-Tufted Chesterfield" },
      { id: "hs-lr-2-2", productId: "prod-lr-7", x: 18, y: 62, label: "Belgravia Fireside Wingback Chair" },
      { id: "hs-lr-2-3", productId: "prod-lr-3", x: 50, y: 78, label: "Battersea Sculptural Coffee Table" },
      { id: "hs-lr-2-4", productId: "prod-lr-4", x: 82, y: 45, label: "Mayfair Fluted Media Credenza" },
      { id: "hs-lr-2-5", productId: "prod-lr-5", x: 86, y: 68, label: "Chelsea Cantilever Accent Table" },
    ],
  },
  {
    id: "room-lr-3",
    slug: "nordic-minimalist",
    title: "Nordic Minimalist Loft",
    subtitle: "Pure forms, serene Belgian linens, and zero visual clutter",
    categorySlug: "living-room",
    style: "Minimal",
    fullRoomImage: getSingleImageForType("living-room", 2),
    description: "A calming study in tonal harmony and soft shadows. Washed flax slipcovers blend seamlessly with blonde oak surfaces and floating low-profile cabinetry.",
    productIds: ["prod-lr-8", "prod-lr-2", "prod-lr-3", "prod-lr-4", "prod-lr-5"],
    hotspots: [
      { id: "hs-lr-3-1", productId: "prod-lr-8", x: 48, y: 56, label: "Nordic Minimalist Modular Sofa" },
      { id: "hs-lr-3-2", productId: "prod-lr-2", x: 20, y: 65, label: "Richmond Cocoon Swivel Armchair" },
      { id: "hs-lr-3-3", productId: "prod-lr-3", x: 52, y: 75, label: "Battersea Sculptural Coffee Table" },
      { id: "hs-lr-3-4", productId: "prod-lr-4", x: 82, y: 50, label: "Mayfair Fluted Media Credenza" },
      { id: "hs-lr-3-5", productId: "prod-lr-5", x: 15, y: 74, label: "Chelsea Cantilever Accent Table" },
    ],
  },
  {
    id: "room-lr-4",
    slug: "mayfair-penthouse",
    title: "Mayfair Penthouse Salon",
    subtitle: "Dramatic marble plinths, rich velvet contours, and sculptural brass",
    categorySlug: "living-room",
    style: "Luxury",
    fullRoomImage: getSingleImageForType("living-room", 3),
    description: "High-contrast drama designed for twilight cocktail receptions and sophisticated evening salons. The Calacatta marble plinth reflects warm mood lighting across the space.",
    productIds: ["prod-lr-1", "prod-lr-9", "prod-lr-2", "prod-lr-4", "prod-lr-5"],
    hotspots: [
      { id: "hs-lr-4-1", productId: "prod-lr-1", x: 45, y: 54, label: "Aurelia 3-Seater Velvet Sofa" },
      { id: "hs-lr-4-2", productId: "prod-lr-9", x: 54, y: 74, label: "Calacatta Marble Plinth Coffee Table" },
      { id: "hs-lr-4-3", productId: "prod-lr-2", x: 20, y: 64, label: "Richmond Cocoon Swivel Armchair" },
      { id: "hs-lr-4-4", productId: "prod-lr-4", x: 82, y: 48, label: "Mayfair Fluted Media Credenza" },
      { id: "hs-lr-4-5", productId: "prod-lr-5", x: 85, y: 66, label: "Chelsea Cantilever Accent Table" },
    ],
  },

  // ================= DINING ROOM STYLES =================
  {
    id: "room-dr-1",
    slug: "chelsea-oak-6-seater",
    title: "Chelsea Architectural 6-Seater Setting",
    subtitle: "Organic British oak dining paired with sculpted bouclé seating",
    categorySlug: "dining-room",
    style: "6-Seater",
    fullRoomImage: getSingleImageForType("dining-room", 0),
    description: "The complete dining ensemble for contemporary entertaining. A 200cm solid character oak slab table is accompanied by 4 curved Notting Hill chairs, a space-saving bench, and the Kensington fluted credenza.",
    productIds: ["prod-dr-1", "prod-dr-2", "prod-dr-5", "prod-dr-3", "prod-dr-4"],
    hotspots: [
      { id: "hs-dr-1-1", productId: "prod-dr-1", x: 50, y: 58, label: "Chelsea Architectural Dining Table" },
      { id: "hs-dr-1-2", productId: "prod-dr-2", x: 28, y: 54, label: "Notting Hill Curved Dining Chairs" },
      { id: "hs-dr-1-3", productId: "prod-dr-5", x: 68, y: 72, label: "Chelsea Upholstered Dining Bench" },
      { id: "hs-dr-1-4", productId: "prod-dr-3", x: 82, y: 45, label: "Kensington 4-Door Oak Sideboard" },
      { id: "hs-dr-1-5", productId: "prod-dr-4", x: 15, y: 40, label: "Belgravia Glazed Tall Vitrine" },
    ],
  },
  {
    id: "room-dr-2",
    slug: "calacatta-grand-marble",
    title: "Calacatta Grand Marble Banquet",
    subtitle: "Italian stone grandeur with fluted pedestal bases and amber velvet",
    categorySlug: "dining-room",
    style: "Marble",
    fullRoomImage: getSingleImageForType("marble-dining", 0),
    description: "Sculpted Italian marble paired with warm amber velvet seating. An unashamedly lavish centerpiece made for celebratory dinner parties.",
    productIds: ["prod-dr-6", "prod-dr-2", "prod-dr-3", "prod-dr-4", "prod-dr-5"],
    hotspots: [
      { id: "hs-dr-2-1", productId: "prod-dr-6", x: 52, y: 58, label: "Calacatta Grand Oval Marble Dining Table" },
      { id: "hs-dr-2-2", productId: "prod-dr-2", x: 28, y: 56, label: "Notting Hill Curved Dining Chairs" },
      { id: "hs-dr-2-3", productId: "prod-dr-3", x: 80, y: 42, label: "Kensington 4-Door Oak Sideboard" },
      { id: "hs-dr-2-4", productId: "prod-dr-4", x: 15, y: 38, label: "Belgravia Glazed Tall Vitrine" },
      { id: "hs-dr-2-5", productId: "prod-dr-5", x: 70, y: 72, label: "Chelsea Upholstered Dining Bench" },
    ],
  },
  {
    id: "room-dr-3",
    slug: "belgravia-8-seater-feast",
    title: "Belgravia 8-Seater Extensible Feast",
    subtitle: "Solid American walnut with precision butterfly extension",
    categorySlug: "dining-room",
    style: "8-Seater",
    fullRoomImage: getSingleImageForType("dining-room", 2),
    description: "For expansive holiday celebrations and generous family dinners. Expands smoothly to 320cm to accommodate up to 14 guests.",
    productIds: ["prod-dr-7", "prod-dr-2", "prod-dr-3", "prod-dr-4", "prod-dr-5"],
    hotspots: [
      { id: "hs-dr-3-1", productId: "prod-dr-7", x: 50, y: 60, label: "Belgravia 8-Seater Extensible Feast Table" },
      { id: "hs-dr-3-2", productId: "prod-dr-2", x: 25, y: 54, label: "Notting Hill Curved Dining Chairs" },
      { id: "hs-dr-3-3", productId: "prod-dr-3", x: 84, y: 45, label: "Kensington 4-Door Oak Sideboard" },
      { id: "hs-dr-3-4", productId: "prod-dr-4", x: 12, y: 38, label: "Belgravia Glazed Tall Vitrine" },
      { id: "hs-dr-3-5", productId: "prod-dr-5", x: 74, y: 70, label: "Chelsea Upholstered Dining Bench" },
    ],
  },
  {
    id: "room-dr-4",
    slug: "notting-hill-4-seater-nook",
    title: "Notting Hill 4-Seater Breakfast Salon",
    subtitle: "Warm, circular intimacy with turned oak pedestal architecture",
    categorySlug: "dining-room",
    style: "4-Seater",
    fullRoomImage: getSingleImageForType("dining-room", 3),
    description: "Tailored for London dining kitchens and garden room breakfast nooks. The round top encourages convivial eye contact and effortless conversation.",
    productIds: ["prod-dr-8", "prod-dr-2", "prod-dr-3", "prod-dr-4", "prod-dr-5"],
    hotspots: [
      { id: "hs-dr-4-1", productId: "prod-dr-8", x: 50, y: 62, label: "Notting Hill Round Bistro Dining Table" },
      { id: "hs-dr-4-2", productId: "prod-dr-2", x: 28, y: 58, label: "Notting Hill Curved Dining Chairs" },
      { id: "hs-dr-4-3", productId: "prod-dr-3", x: 82, y: 44, label: "Kensington 4-Door Oak Sideboard" },
      { id: "hs-dr-4-4", productId: "prod-dr-4", x: 16, y: 42, label: "Belgravia Glazed Tall Vitrine" },
      { id: "hs-dr-4-5", productId: "prod-dr-5", x: 68, y: 74, label: "Chelsea Upholstered Dining Bench" },
    ],
  },

  // ================= BEDROOM STYLES =================
  {
    id: "room-br-1",
    slug: "cotswolds-oak-sanctuary",
    title: "Cotswolds Oak Master Sanctuary",
    subtitle: "Floating solid oak joinery with fluted bedside storage and cedar wardrobe",
    categorySlug: "bedroom",
    style: "Modern Oak",
    fullRoomImage: getSingleImageForType("bedroom", 0),
    description: "A restorative haven crafted entirely from slow-grown British oak. Features the floating king bedstead, matching pair of fluted nightstands, louvred wardrobe, and vanity dressing table.",
    productIds: ["prod-br-1", "prod-br-2", "prod-br-3", "prod-br-4", "prod-br-5"],
    hotspots: [
      { id: "hs-br-1-1", productId: "prod-br-1", x: 52, y: 55, label: "Cotswolds Solid Oak Floating Bed Frame" },
      { id: "hs-br-1-2", productId: "prod-br-2", x: 20, y: 64, label: "Cotswolds Fluted Bedside Tables" },
      { id: "hs-br-1-3", productId: "prod-br-3", x: 82, y: 60, label: "Marylebone 3-Drawer Dressing Table" },
      { id: "hs-br-1-4", productId: "prod-br-4", x: 88, y: 42, label: "Hampstead Triple-Door Wardrobe" },
      { id: "hs-br-1-5", productId: "prod-br-5", x: 14, y: 58, label: "Chiswick Fluted 6-Drawer Chest" },
    ],
  },
  {
    id: "room-br-2",
    slug: "richmond-velvet-suite",
    title: "Richmond Grand Winged Velvet Suite",
    subtitle: "Cocooning hotel-grade comfort upholstered in signature amber velvet",
    categorySlug: "bedroom",
    style: "Luxury",
    fullRoomImage: getSingleImageForType("bedroom", 1),
    description: "Step into the sanctuary of a five-star London boutique suite. The winged upholstered headboard blocks peripheral distractions for deep restorative sleep.",
    productIds: ["prod-br-6", "prod-br-2", "prod-br-3", "prod-br-4", "prod-br-5"],
    hotspots: [
      { id: "hs-br-2-1", productId: "prod-br-6", x: 50, y: 54, label: "Richmond Grand Winged Velvet Bed" },
      { id: "hs-br-2-2", productId: "prod-br-2", x: 22, y: 66, label: "Cotswolds Fluted Bedside Tables" },
      { id: "hs-br-2-3", productId: "prod-br-3", x: 82, y: 58, label: "Marylebone 3-Drawer Dressing Table" },
      { id: "hs-br-2-4", productId: "prod-br-4", x: 88, y: 40, label: "Hampstead Triple-Door Wardrobe" },
      { id: "hs-br-2-5", productId: "prod-br-5", x: 14, y: 58, label: "Chiswick Fluted 6-Drawer Chest" },
    ],
  },
  {
    id: "room-br-3",
    slug: "marylebone-classic-master",
    title: "Marylebone Classic Canopy Master",
    subtitle: "Architectural four-poster height with refined British craftsmanship",
    categorySlug: "bedroom",
    style: "Classic",
    fullRoomImage: getSingleImageForType("bedroom", 2),
    description: "Soaring ceiling proportions celebrated by clean vertical timber posts. Blends heritage canopy tradition with clean contemporary lines.",
    productIds: ["prod-br-7", "prod-br-2", "prod-br-3", "prod-br-4", "prod-br-5"],
    hotspots: [
      { id: "hs-br-3-1", productId: "prod-br-7", x: 48, y: 52, label: "Marylebone Contemporary Canopy Bed" },
      { id: "hs-br-3-2", productId: "prod-br-2", x: 18, y: 68, label: "Cotswolds Fluted Bedside Tables" },
      { id: "hs-br-3-3", productId: "prod-br-3", x: 84, y: 62, label: "Marylebone 3-Drawer Dressing Table" },
      { id: "hs-br-3-4", productId: "prod-br-4", x: 92, y: 40, label: "Hampstead Triple-Door Wardrobe" },
      { id: "hs-br-3-5", productId: "prod-br-5", x: 12, y: 56, label: "Chiswick Fluted 6-Drawer Chest" },
    ],
  },
  {
    id: "room-br-4",
    slug: "knightsbridge-junior-haven",
    title: "Knightsbridge Guest & Junior Daybed Haven",
    subtitle: "Daytime lounge sofa, evening luxury bedstead with pop-up trundle",
    categorySlug: "bedroom",
    style: "Kids",
    fullRoomImage: getSingleImageForType("kids-bedroom", 0),
    description: "Ingenious dual-purpose living. High-resilience daybed for daytime relaxation, expanding into twin guest beds with solid oak drawers for toys and linens.",
    productIds: ["prod-bs-5", "prod-br-2", "prod-br-3", "prod-br-5", "prod-br-4"],
    hotspots: [
      { id: "hs-br-4-1", productId: "prod-bs-5", x: 48, y: 58, label: "Primrose Solid Oak Single Trundle Bed" },
      { id: "hs-br-4-2", productId: "prod-br-2", x: 22, y: 66, label: "Cotswolds Fluted Bedside Tables" },
      { id: "hs-br-4-3", productId: "prod-br-3", x: 80, y: 58, label: "Marylebone 3-Drawer Dressing Table" },
      { id: "hs-br-4-4", productId: "prod-br-5", x: 14, y: 56, label: "Chiswick Fluted 6-Drawer Chest" },
      { id: "hs-br-4-5", productId: "prod-br-4", x: 88, y: 40, label: "Hampstead Triple-Door Wardrobe" },
    ],
  },
];
