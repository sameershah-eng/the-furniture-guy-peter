import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { RoomHotspot } from '../data/rooms';
import { Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { useStore } from '../store/useStore';

interface HotspotDotProps {
  hotspot: RoomHotspot;
  product?: Product;
}

export const HotspotDot: React.FC<HotspotDotProps> = ({ hotspot, product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useStore();

  if (!product) return null;

  // Smart placement for tooltip card so it doesn't clip screen edges
  const isRightSide = hotspot.x > 60;
  const isBottomSide = hotspot.y > 65;

  return (
    <div
      className="absolute z-20"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Interactive Pulsing Hotspot Marker */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`View ${product.name}`}
        className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full focus:outline-none group"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#FF7A00] opacity-75 animate-ping duration-1000" />
        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-signature text-black font-bold text-xs shadow-lg border-2 border-black group-hover:scale-110 transition-transform">
          +
        </span>
      </button>

      {/* Floating Glass Product Card */}
      {isOpen && (
        <div
          className={`absolute z-30 w-64 p-3 bg-black/95 backdrop-blur-xl border border-[#FF7A00]/50 rounded-xl shadow-2xl text-white transition-all duration-200 ${
            isRightSide ? 'right-4' : 'left-4'
          } ${isBottomSide ? 'bottom-4' : 'top-4'}`}
        >
          <div className="flex gap-3 items-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#FFD3A1] block truncate">
                {product.type}
              </span>
              <h4 className="font-serif text-sm font-semibold truncate leading-tight">
                {product.name}
              </h4>
              <p className="font-mono text-xs font-bold text-[#FF7A00] mt-0.5">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-xs text-white/80 hover:text-[#FF7A00] flex items-center gap-1 font-medium transition-colors"
            >
              <span>View Piece</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="px-2.5 py-1 rounded bg-[#FF7A00] text-black text-[11px] font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
