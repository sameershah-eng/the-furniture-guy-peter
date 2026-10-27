import React, { useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronDown,
  Check,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { products, Product as ProductType } from '../data/products';
import { reviews } from '../data/reviews';
import { brandConfig } from '../config/brand';
import { formatPrice, calculateKlarna3 } from '../utils/formatPrice';
import { useStore } from '../store/useStore';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';

export const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === slug);

  const { addToCart, isInWishlist, toggleWishlist, showToast } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'Standard');
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finishes[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'dim' | 'mat' | 'del' | 'war'>('desc');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedFinish, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello! I am inquiring about the ${product.name} in size "${selectedSize}" with "${selectedFinish}" finish (${formatPrice(product.price)}). Is this available for delivery in London?`
    );
    window.open(`${brandConfig.contact.whatsappUrl}?text=${text}`, '_blank');
  };

  const handleFormEnquiry = () => {
    navigate('/enquiry', {
      state: {
        productName: product.name,
        productPrice: product.price,
        size: selectedSize,
        finish: selectedFinish,
      },
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard');
  };

  // Related products
  const completeTheLook = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const youMayAlsoLike = products
    .filter((p) => p.id !== product.id && !completeTheLook.some((c) => c.id === p.id))
    .slice(0, 4);

  const productReviews = reviews.slice(0, 3);

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/' },
          { label: product.category.replace('-', ' '), href: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 space-y-16">
        {/* ================= MAIN PURCHASE MODULE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            {/* Primary Main Image with Zoom Effect */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border-2 border-white/10 group shadow-2xl">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  wishlisted
                    ? 'bg-[#FF7A00] text-black shadow-lg scale-105'
                    : 'bg-black/60 text-white hover:bg-black hover:text-[#FF7A00]'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-black' : ''}`} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badges?.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#FF7A00] border border-[#FF7A00]/40 rounded-md"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#FF7A00] ring-2 ring-[#FF7A00]/40 scale-102'
                      : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                <span className="uppercase tracking-[0.2em] text-[#FFD3A1] font-semibold">
                  {product.category.replace('-', ' ')} · {product.type}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#FF7A00]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF7A00]" />
                  ))}
                </div>
                <span className="font-mono text-sm text-white font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-white/40 text-xs">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-xl bg-[#111111] border border-white/10 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-gradient-orange tabular-nums">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="font-mono text-base text-white/40 line-through tabular-nums">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/60">
                Or 3 interest-free payments of <strong className="text-white font-mono">{calculateKlarna3(product.price)}</strong> with{' '}
                <span className="text-[#FFD3A1] font-semibold">Klarna</span>.
              </p>
            </div>

            {/* Finish / Wood Swatch Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70 font-medium">Selected Finish:</span>
                <span className="text-[#FFD3A1] font-semibold">{selectedFinish}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.finishes.map((f) => {
                  const active = selectedFinish === f.name;
                  return (
                    <button
                      key={f.name}
                      onClick={() => setSelectedFinish(f.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-all ${
                        active
                          ? 'bg-[#1E1E1E] border-[#FF7A00] ring-1 ring-[#FF7A00] text-white font-medium'
                          : 'bg-[#121212] border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: f.color }}
                      />
                      <span>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70 font-medium">Dimensions & Size:</span>
                <span className="text-[#FFD3A1] font-semibold">{selectedSize}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`p-2.5 rounded-xl text-xs text-center border transition-all truncate ${
                        active
                          ? 'bg-[#FF7A00] text-black font-bold border-black hard-shadow'
                          : 'bg-[#121212] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs text-white/70 font-medium">Quantity:</span>
              <div className="flex items-center border border-white/20 rounded-xl bg-[#111111] overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/10"
                >
                  -
                </button>
                <span className="px-4 text-xs font-mono font-bold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-white/70 hover:text-white hover:bg-white/10"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-400">
                In Stock ({product.stock} units at London Atelier)
              </span>
            </div>

            {/* ================= DECISION BLOCK: TWO CLEAR PATHS ================= */}
            <div className="p-5 rounded-2xl bg-[#0D0D0D] border-2 border-white/15 space-y-3 hard-shadow">
              <p className="text-xs uppercase tracking-widest text-[#FFD3A1] font-semibold text-center">
                How would you like to continue?
              </p>

              {/* Path 1: Add to Cart (Order Path) */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hard-shadow shadow-xl ${
                  addedAnimation
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-signature text-black hover:brightness-110 active:scale-95'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag ({formatPrice(product.price * quantity)})</span>
                  </>
                )}
              </button>

              {/* Path 2: Enquiry Path */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="py-3 px-3 rounded-xl border border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </button>

                <button
                  onClick={handleFormEnquiry}
                  className="py-3 px-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Send Enquiry Form</span>
                </button>
              </div>
            </div>

            {/* Trust markers */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-white/60">
              <div className="p-2 rounded-lg bg-white/5 space-y-1">
                <Truck className="w-4 h-4 text-[#FF7A00] mx-auto" />
                <span>Free London Delivery</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#FF7A00] mx-auto" />
                <span>10-Yr Guarantee</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 space-y-1">
                <RotateCcw className="w-4 h-4 text-[#FF7A00] mx-auto" />
                <span>30-Day Home Trial</span>
              </div>
            </div>

            {/* Accordion Specification Tabs */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              {[
                { id: 'desc', label: 'Architectural Description', content: product.description },
                { id: 'dim', label: 'Dimensions & Proportions', content: product.dimensions },
                { id: 'mat', label: 'Materials & Joinery', content: product.material },
                { id: 'del', label: 'Delivery & White Glove Assembly', content: product.deliveryTime || brandConfig.delivery.freeThreshold ? "Complimentary 2-man white glove placement and packaging recycling in London." : "" },
                { id: 'war', label: '10-Year British Guarantee', content: product.warranty || "Comprehensive 10-year coverage on all timber frames, springs, and mechanical components." },
              ].map((tab) => (
                <div key={tab.id} className="border border-white/10 rounded-xl overflow-hidden bg-[#0F0F0F]">
                  <button
                    onClick={() => setActiveTab(activeTab === tab.id ? ('' as any) : (tab.id as any))}
                    className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wider text-white hover:text-[#FF7A00] transition-colors"
                  >
                    <span>{tab.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeTab === tab.id ? 'rotate-180 text-[#FF7A00]' : 'text-white/40'
                      }`}
                    />
                  </button>
                  {activeTab === tab.id && (
                    <div className="p-4 pt-0 text-xs text-white/70 leading-relaxed border-t border-white/5">
                      {tab.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= COMPLETE THE LOOK ================= */}
        {completeTheLook.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-1">
                  Stylist Pairing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Complete The Look
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {completeTheLook.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ================= YOU MAY ALSO LIKE ================= */}
        {youMayAlsoLike.length > 0 && (
          <div className="pt-8 border-t border-white/10 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-1">
                  Atelier Recommendations
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  You May Also Like
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {youMayAlsoLike.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ================= CUSTOMER REVIEWS ================= */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-1">
                Client Testimonials
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Homeowner Reviews for {product.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[#FF7A00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FF7A00]" />
              ))}
              <span className="text-xs text-white/70 font-mono ml-2">5.0 / 5.0 (All Verified Purchases)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productReviews.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[#FF7A00]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF7A00]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base text-white font-semibold">"{r.title}"</h4>
                  <p className="text-xs text-white/70 leading-relaxed italic">"{r.comment}"</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[11px]">
                  <span className="text-white font-medium">{r.name}</span>
                  <span className="text-white/40">{r.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-black/95 backdrop-blur-md border-t border-white/15 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="font-mono text-lg font-bold text-gradient-orange block leading-tight">
            {formatPrice(product.price * quantity)}
          </span>
          <span className="text-[10px] text-white/50 block truncate max-w-[140px]">
            {selectedSize} · {selectedFinish}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
