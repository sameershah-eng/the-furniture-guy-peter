import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { useStore } from '../store/useStore';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const { addToCart, isInWishlist, toggleWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.finishes[0]?.name, 1);
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const fallbackList = product.images.slice(1);

  return (
    <div
      className="group relative flex flex-col bg-[#111111] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#FF7A00]/50 hover:shadow-[0_12px_32px_rgba(255,122,0,0.12)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Fixed 4:5 Aspect Ratio */}
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden aspect-[4/5] bg-neutral-900">
        {/* Primary Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <SmartImage
            src={primaryImage}
            alt={product.name}
            priority={priority}
            fallbackUrls={fallbackList}
            itemTypeKeyword={product.itemTypeKey || 'furniture'}
            aspectRatioClass="h-full w-full"
            fallbackTitle={product.name}
          />
        </div>

        {/* Secondary Image crossfade */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        >
          <SmartImage
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fallbackUrls={fallbackList}
            itemTypeKeyword={product.itemTypeKey || 'furniture'}
            aspectRatioClass="h-full w-full"
            fallbackTitle={product.name}
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.badges?.slice(0, 1).map((b) => (
            <span
              key={b}
              className="px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[#FF7A00] border border-[#FF7A00]/40 rounded"
            >
              {b}
            </span>
          ))}
          {product.oldPrice && (
            <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase bg-[#FF7A00] text-black rounded font-mono">
              Save {formatPrice(product.oldPrice - product.price)}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md ${
            wishlisted
              ? 'bg-[#FF7A00] text-black shadow-md'
              : 'bg-black/60 text-white hover:bg-black hover:text-[#FF7A00]'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick Add Slide-up Action (visible on hover or tap) */}
        <div className="absolute inset-x-3 bottom-3 z-10 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 ${
              quickAdded
                ? 'bg-emerald-500 text-black font-bold'
                : 'bg-gradient-signature text-black font-semibold hover:brightness-110 active:scale-95 shadow-lg'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {quickAdded ? 'Added to Bag ✓' : 'Quick Add'}
          </button>
        </div>
      </Link>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-2 bg-[#0D0D0D]">
        <div>
          <div className="flex items-center justify-between text-xs text-white/50 mb-1">
            <span className="uppercase tracking-widest text-[11px] text-[#FFD3A1]">
              {product.type}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[#FF7A00]">★</span>
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-white/40">({product.reviewCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#FF7A00] transition-colors">
            <h3 className="font-serif text-lg leading-snug line-clamp-1 text-white group-hover:text-[#FF7A00] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Finish Swatches preview */}
        <div className="flex items-center gap-1.5 py-1">
          {product.finishes.slice(0, 4).map((f) => (
            <span
              key={f.name}
              title={f.name}
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: f.color }}
            />
          ))}
          {product.finishes.length > 4 && (
            <span className="text-[10px] text-white/40 ml-1">+{product.finishes.length - 4}</span>
          )}
        </div>

        {/* Pricing and Action Link */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="font-mono text-xs text-white/40 line-through tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="text-xs text-white/60 hover:text-[#FF7A00] flex items-center gap-1 transition-colors group/link"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
