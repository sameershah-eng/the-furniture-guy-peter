# The Furniture Guy — Luxury British Furniture E-Commerce

A luxury furniture e-commerce website built with React 18, Vite, Tailwind CSS, Framer Motion, and Zustand with persistent local storage.

## Brand Identity & Styling
- **Brand Name**: "The Furniture Guy" (TFG) — easily renamed in `/src/config/brand.ts`
- **Location**: Battersea Design Quarter, London SW11 4EZ, United Kingdom
- **Currency**: British Pounds (GBP, formatted like `£1,849`)
- **Colour Palette**:
  - Brand Orange: `#FF7A00`
  - Deep Orange: `#E86A00`
  - Black: `#000000`
  - White: `#FFFFFF`
  - Peach: `#FFE2C2`
  - Light Apricot: `#FFD3A1`
  - Near-black: `#0D0D0D` and `#1A1A1A`
- **Typography**: Cormorant Garamond (Headings) and Manrope (UI & Body)

## Key Features & Flow Architecture
1. **Theatrical Intro Loader**: Monogram reveal, letter-by-letter brand animation, gradient line, curtain slide-up.
2. **Categories 1–3 ("Full Arrangements" Flow)**:
   - Living Room, Dining Room, Bedroom
   - Step 1: Style Gallery (`/collections/:categorySlug`) with style chips
   - Step 2: Full Room Photo (`/collections/:categorySlug/:roomSlug`)
   - Step 3: Interactive pulsing gradient hotspot dots on each item
   - Step 4: "Shop This Look" itemized product list
   - Step 5: "Add The Whole Set" button with an automatic 10% bundle discount!
3. **Categories 4–6 ("Pick A Type" Flow)**:
   - Sofas, Table Sets, Bed Sets (`/category/:categorySlug`) with live filter chips and sorting
4. **Product Detail Page (`/product/:slug`)**:
   - 4-image gallery with zoom and swipe
   - Size picker & finish swatches
   - Two clear paths: [Add to Cart] and [WhatsApp / Enquiry]
   - Mobile sticky purchase bar
5. **Enquiry Path (`/enquiry` → `/enquiry/thank-you`)**:
   - Captures bespoke leads without payment; saves directly into store & admin panel
6. **Order Path (`/cart` → `/checkout` → `/checkout/payment` → `/order/:id` → `/track/:id`)**:
   - Multi-step UK checkout (Address validation with UK postcodes)
   - Mock 3D Secure payment gateway with OTP verification (code `0000` simulates failure; any other 4 digits succeeds)
   - Printable Tax Invoice (`window.print()`)
   - Live Order Tracking timeline (updates dynamically when modified in Admin)
7. **Atelier Admin Portal (`/admin`)**:
   - Demo Login: `admin` / `admin123`
   - Real-time gross revenue, orders, and leads statistics
   - Change order statuses (Confirmed → Packed → Dispatched → Delivered) with simulated customer alerts
   - Live editable products table (edit retail price and workshop stock)
   - Interactive Room Hotspot placement tool

## Working Promotional Codes
- `WELCOME10`: 10% off entire order
- `TFG50`: £50 off orders over £500
- `OAKREPEAT5`: 5% repeat order discount (unlocked after feedback submission)

## Local Development & Deployment

### Run Locally:
```bash
npm install
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Deploy on Vercel:
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! `vercel.json` is already configured with SPA rewrites for seamless route refreshing.
