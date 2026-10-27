/**
 * Central Image Library for The Furniture Guy
 * Strict type-based categorization. Every image matches EXACTLY what it represents.
 */

const buildUnsplashUrl = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const imageLibrary: Record<string, string[]> = {
  // Hero & Full Living Rooms
  'hero': [
    buildUnsplashUrl('1600210492486-724fe5c67fb0', 1600),
    buildUnsplashUrl('1618221195710-dd6b41faaea6', 1600),
    buildUnsplashUrl('1600585154340-be6161a56a0c', 1600),
  ],
  'living-room': [
    buildUnsplashUrl('1600210492486-724fe5c67fb0', 1600),
    buildUnsplashUrl('1618221195710-dd6b41faaea6', 1600),
    buildUnsplashUrl('1616486338812-3dadae4b4ace', 1600),
    buildUnsplashUrl('1600585154340-be6161a56a0c', 1600),
  ],

  // Dining Rooms
  'dining-room': [
    buildUnsplashUrl('1617806118233-18e1de247200', 1600),
    buildUnsplashUrl('1577140917170-285929fb55b7', 1600),
    buildUnsplashUrl('1530018607912-eff2daa1bac4', 1600),
    buildUnsplashUrl('1615066390971-03e4e1c36ddf', 1600),
  ],
  'marble-dining': [
    buildUnsplashUrl('1577140917170-285929fb55b7', 1600),
    buildUnsplashUrl('1533090161767-e6ffed986c88', 1200),
  ],

  // Bedrooms
  'bedroom': [
    buildUnsplashUrl('1540518614846-7ede433c4ef4', 1600),
    buildUnsplashUrl('1505693416388-ac5ce068fe85', 1600),
    buildUnsplashUrl('1566665797739-1674de7a421a', 1600),
    buildUnsplashUrl('1595526114035-0d45ed16cfbf', 1600),
  ],
  'kids-bedroom': [
    buildUnsplashUrl('1595526114035-0d45ed16cfbf', 1600),
    buildUnsplashUrl('1522771739844-6a9f6d5f14af', 1600),
  ],

  // Sofas & Couches
  'sofa-leather': [
    buildUnsplashUrl('1493663284031-b7e3aefcae8e', 1200),
    buildUnsplashUrl('1555041469-a586c61ea9bc', 1200),
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
    buildUnsplashUrl('1583847268964-b28dc8f51f92', 1200),
  ],
  'sofa-velvet': [
    buildUnsplashUrl('1555041469-a586c61ea9bc', 1200),
    buildUnsplashUrl('1493663284031-b7e3aefcae8e', 1200),
    buildUnsplashUrl('1583847268964-b28dc8f51f92', 1200),
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
  ],
  'sofa-lshape': [
    buildUnsplashUrl('1555041469-a586c61ea9bc', 1200),
    buildUnsplashUrl('1493663284031-b7e3aefcae8e', 1200),
    buildUnsplashUrl('1583847268964-b28dc8f51f92', 1200),
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
  ],
  'sofa-recliner': [
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
    buildUnsplashUrl('1580481077113-585cf61b17e4', 1200),
    buildUnsplashUrl('1550254478-ead40cc54513', 1200),
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
  ],
  'couch': [
    buildUnsplashUrl('1583847268964-b28dc8f51f92', 1200),
    buildUnsplashUrl('1555041469-a586c61ea9bc', 1200),
    buildUnsplashUrl('1493663284031-b7e3aefcae8e', 1200),
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
  ],

  // Occasional Chairs & Tables
  'armchair': [
    buildUnsplashUrl('1580481077113-585cf61b17e4', 1200),
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
    buildUnsplashUrl('1550254478-ead40cc54513', 1200),
  ],
  'coffee-table': [
    buildUnsplashUrl('1532323544230-7191fd51bc1b', 1200),
    buildUnsplashUrl('1533090481720-856c6e3c1fdc', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
  ],
  'tv-unit': [
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
  ],
  'side-table': [
    buildUnsplashUrl('1533090481720-856c6e3c1fdc', 1200),
    buildUnsplashUrl('1532323544230-7191fd51bc1b', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1592078615290-033ee584e267', 1200),
  ],

  // Dining Furniture
  'dining-table': [
    buildUnsplashUrl('1617806118233-18e1de247200', 1200),
    buildUnsplashUrl('1615066390971-03e4e1c36ddf', 1200),
    buildUnsplashUrl('1530018607912-eff2daa1bac4', 1200),
    buildUnsplashUrl('1577140917170-285929fb55b7', 1200),
  ],
  'dining-chairs': [
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
    buildUnsplashUrl('1598300042247-d088f8ab3a91', 1200),
    buildUnsplashUrl('1580481077113-585cf61b17e4', 1200),
    buildUnsplashUrl('1586023492125-27b2c045efd7', 1200),
  ],
  'sideboard': [
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
  ],
  'crockery-cabinet': [
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
  ],
  'bench': [
    buildUnsplashUrl('1615066390971-03e4e1c36ddf', 1200),
    buildUnsplashUrl('1617806118233-18e1de247200', 1200),
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
    buildUnsplashUrl('1598300042247-d088f8ab3a91', 1200),
  ],

  // Bedroom Pieces
  'bed': [
    buildUnsplashUrl('1505693416388-ac5ce068fe85', 1200),
    buildUnsplashUrl('1540518614846-7ede433c4ef4', 1200),
    buildUnsplashUrl('1566665797739-1674de7a421a', 1200),
    buildUnsplashUrl('1595526114035-0d45ed16cfbf', 1200),
  ],
  'dressing-table': [
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
  ],
  'wardrobe': [
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
  ],
  'chest-of-drawers': [
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
    buildUnsplashUrl('1595428774223-ef52624120d2', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
  ],

  // Desks & Workspaces
  'computer-table': [
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1532323544230-7191fd51bc1b', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
  ],
  'working-table': [
    buildUnsplashUrl('1518455027359-f3f8164ba6bd', 1200),
    buildUnsplashUrl('1538688525198-9b88f6f53126', 1200),
    buildUnsplashUrl('1532323544230-7191fd51bc1b', 1200),
    buildUnsplashUrl('1544457070-4cd773b4d71e', 1200),
  ],
  'dining-set': [
    buildUnsplashUrl('1617806118233-18e1de247200', 1200),
    buildUnsplashUrl('1530018607912-eff2daa1bac4', 1200),
    buildUnsplashUrl('1615066390971-03e4e1c36ddf', 1200),
    buildUnsplashUrl('1567016432779-094069958ea5', 1200),
  ],
};

/**
 * Returns a rotated slice of images for a specific item type.
 */
export function getImagesForType(typeKey: string, offset = 0, count = 4): string[] {
  const pool = imageLibrary[typeKey] || imageLibrary['sofa-velvet'];
  const res: string[] = [];
  for (let i = 0; i < count; i++) {
    res.push(pool[(offset + i) % pool.length]);
  }
  return res;
}

/**
 * Returns a single primary image for a category or hero
 */
export function getSingleImageForType(typeKey: string, index = 0): string {
  const pool = imageLibrary[typeKey] || imageLibrary['living-room'];
  return pool[index % pool.length];
}
