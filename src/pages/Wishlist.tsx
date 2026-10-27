import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import { Breadcrumb } from '../components/Breadcrumb';

export const Wishlist: React.FC = () => {
  const { wishlistIds, addToCart } = useStore();

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
  const totalValue = wishlistedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p);
    });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/' },
          { label: 'My Saved Pieces' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-1">
              Private Lookbook
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Saved Pieces ({wishlistedProducts.length})
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Curate your residential vision before reserving fabric memos or commissioning your set.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-4 self-start sm:self-auto">
              <div className="text-right hidden sm:block">
                <span className="text-xs text-white/40 block">Total Curated Value</span>
                <span className="font-mono text-lg font-bold text-gradient-orange">
                  {formatPrice(totalValue)}
                </span>
              </div>
              <button
                onClick={handleAddAllToCart}
                className="px-6 py-3.5 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hard-shadow hover:brightness-110 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All to Bag</span>
              </button>
            </div>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-white">Your lookbook is currently empty</h2>
            <p className="text-xs text-white/60">
              Tap the heart icon on any sofa, dining table, or bed frame to save it to your private portfolio.
            </p>
            <Link
              to="/collections/living-room"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF7A00] text-black font-semibold text-xs tracking-wider uppercase hard-shadow"
            >
              <span>Explore Arrangements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
