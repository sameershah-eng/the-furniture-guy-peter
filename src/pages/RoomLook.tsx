import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ShoppingBag, ArrowDown, Sparkles, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { rooms } from '../data/rooms';
import { categories } from '../data/categories';
import { products, Product } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { HotspotDot } from '../components/HotspotDot';
import { ProductCard } from '../components/ProductCard';
import { formatPrice, calculateBundleSavings } from '../utils/formatPrice';
import { useStore } from '../store/useStore';

export const RoomLook: React.FC = () => {
  const { categorySlug, roomSlug } = useParams<{ categorySlug: string; roomSlug: string }>();
  const [showProductList, setShowProductList] = useState(true);
  const [wholeSetAdded, setWholeSetAdded] = useState(false);

  const { addMultipleToCart } = useStore();

  const room = rooms.find((r) => r.slug === roomSlug && r.categorySlug === categorySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!room || !category) {
    return <Navigate to="/collections/living-room" replace />;
  }

  // Resolve products in this room
  const roomProducts: Product[] = room.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  // Calculate bundle pricing with 10% discount
  const originalTotal = roomProducts.reduce((sum, p) => sum + p.price, 0);
  const { discounted, savings } = calculateBundleSavings(originalTotal, 10);

  const handleAddWholeSet = () => {
    const itemsToAdd = roomProducts.map((p) => ({
      product: p,
      size: p.sizes[0],
      finish: p.finishes[0]?.name,
      quantity: 1,
      // Apply 10% discount on individual items in bundle
      unitPrice: Math.round(p.price * 0.9),
    }));

    addMultipleToCart(itemsToAdd);
    setWholeSetAdded(true);
    setTimeout(() => setWholeSetAdded(false), 2500);
  };

  const scrollToProducts = () => {
    setShowProductList(true);
    const element = document.getElementById('shop-this-look-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <Breadcrumb
        items={[
          { label: 'Collections', href: '/' },
          { label: category.name, href: `/collections/${category.slug}` },
          { label: room.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-8">
        {/* Step Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#FF7A00] text-black rounded font-mono">
                {room.style} Style
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#FFD3A1]">
                Full Arrangement · Step 2 of 2
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {room.title}
            </h1>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Quick CTA to jump to list */}
          <button
            onClick={scrollToProducts}
            className="self-start md:self-end px-5 py-3 rounded-xl border border-white/20 hover:border-[#FF7A00] bg-white/5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-colors shrink-0"
          >
            <span>Shop This Look ({roomProducts.length} Items)</span>
            <ArrowDown className="w-4 h-4 text-[#FF7A00]" />
          </button>
        </div>

        {/* ================= STEP 3: FULL ROOM PHOTO WITH TAGGED HOTSPOTS ================= */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-neutral-900 hard-shadow">
          <img
            src={room.fullRoomImage}
            alt={room.title}
            className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover"
          />

          {/* Overlay Gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Pulsing Hotspot Dots on EVERY item in the room */}
          {room.hotspots.map((hs) => {
            const product = products.find((p) => p.id === hs.productId);
            return <HotspotDot key={hs.id} hotspot={hs} product={product} />;
          })}

          {/* Bottom Floating Hint on Photo */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto flex items-center gap-2 p-3 bg-black/85 backdrop-blur-md rounded-xl border border-white/15 text-xs text-white max-w-md shadow-2xl">
            <Sparkles className="w-4 h-4 text-[#FF7A00] shrink-0" />
            <span>
              Tap any <strong className="text-[#FF7A00]">+ pulsing dot</strong> on the photo to preview individual furniture pieces.
            </span>
          </div>
        </div>

        {/* ================= STEP 4 & 5: BUNDLE CARD & SHOP THIS LOOK LIST ================= */}
        <div id="shop-this-look-products" className="pt-8 space-y-8">
          {/* Bundle Summary Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-[#0A0A0A] border-2 border-[#FF7A00]/40 hard-shadow flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FFD3A1] text-xs uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Complete Room Suite Bundle</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Acquire The Entire {room.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 max-w-xl">
                Includes all {roomProducts.length} pieces shown above: sofa, occasional seating, central tables, and storage cabinetry. Receive an instant 10% bundle discount plus free white glove delivery & assembly.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-white/60 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> 10-Year Guarantee
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Truck className="w-4 h-4" /> Free White-Glove Setup
                </span>
              </div>
            </div>

            {/* Price calculation and Add the whole set button */}
            <div className="flex flex-col items-center lg:items-end gap-3 bg-black/60 p-5 rounded-xl border border-white/10 shrink-0 w-full sm:w-auto">
              <div className="text-right">
                <span className="text-xs text-white/50 block">Individual Total: <span className="line-through font-mono">{formatPrice(originalTotal)}</span></span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-gradient-orange">
                    {formatPrice(discounted)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    Save {formatPrice(savings)}
                  </span>
                </div>
              </div>

              {/* ADD THE WHOLE SET Gradient Button */}
              <button
                onClick={handleAddWholeSet}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hard-shadow shadow-xl ${
                  wholeSetAdded
                    ? 'bg-emerald-500 font-bold'
                    : 'bg-gradient-signature hover:brightness-110 active:scale-95'
                }`}
              >
                {wholeSetAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Entire Room Added to Bag ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add The Whole Set (Save 10%)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section: Individual Products in this Look */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-serif text-2xl text-white">
                Individual Pieces in This Arrangement ({roomProducts.length})
              </h3>
              <span className="text-xs text-white/50">
                Click any piece to configure custom sizes & wood swatches
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {roomProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
