export interface Category {
  id: string;
  number: string;
  name: string;
  slug: string;
  flow: 'room' | 'filter';
  description: string;
  itemCount: string;
  image: string;
  filterOptions?: string[];
}

export const categories: Category[] = [
  {
    id: "cat-1",
    number: "01",
    name: "Living Room",
    slug: "living-room",
    flow: "room",
    description: "Curated architectural living arrangements crafted with English solid oak, soft bouclé, and solid brass accents.",
    itemCount: "4 Curated Arrangements · 18 Pieces",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["Modern", "Classic", "Minimal", "Luxury"],
  },
  {
    id: "cat-2",
    number: "02",
    name: "Dining Room",
    slug: "dining-room",
    flow: "room",
    description: "Sculptural dining tables in hand-finished oak and Italian marble paired with bespoke upholstered dining chairs.",
    itemCount: "4 Curated Arrangements · 16 Pieces",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["4-Seater", "6-Seater", "8-Seater", "Marble"],
  },
  {
    id: "cat-3",
    number: "03",
    name: "Bedroom",
    slug: "bedroom",
    flow: "room",
    description: "Serene bedroom sanctuaries featuring floating platform beds, fluted dressing tables, and tailored wardrobes.",
    itemCount: "4 Curated Arrangements · 16 Pieces",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["Modern Oak", "Classic", "Luxury", "Kids"],
  },
  {
    id: "cat-4",
    number: "04",
    name: "Sofas",
    slug: "sofas",
    flow: "filter",
    description: "Deep, feather-wrapped seating handcrafted by master upholsterers in Nottinghamshire and London.",
    itemCount: "10 Luxury Models",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["Leather", "Velvet", "Couch", "L-Shape", "Recliner"],
  },
  {
    id: "cat-5",
    number: "05",
    name: "Table Sets",
    slug: "table-sets",
    flow: "filter",
    description: "Architectural desks, executive work tables, and matched dining ensembles for modern British living.",
    itemCount: "8 Masterpiece Sets",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["Computer Table", "Working Table", "Dining Sets", "Side Tables"],
  },
  {
    id: "cat-6",
    number: "06",
    name: "Bed Sets",
    slug: "bed-sets",
    flow: "filter",
    description: "Heritage-crafted bed frames and modular storage suites designed for restorative, quiet luxury.",
    itemCount: "9 Sized Suites",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    filterOptions: ["Single", "Double", "Queen", "King", "Super King", "Wardrobe"],
  },
];
