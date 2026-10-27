import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.type.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    setSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Close bar */}
        <div className="flex justify-between items-center pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-2xl text-[#FF7A00]">TFG</span>
            <span className="text-xs uppercase tracking-widest text-white/50">Search Collection</span>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="py-8">
          <div className="relative flex items-center">
            <Search className="w-7 h-7 text-[#FF7A00] absolute left-4" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dining tables, velvet sofas, oak beds, credenzas..."
              className="w-full bg-[#111111] border-2 border-white/20 focus:border-[#FF7A00] rounded-2xl py-5 pl-16 pr-6 text-xl sm:text-2xl font-serif text-white placeholder-white/30 focus:outline-none transition-colors shadow-2xl"
            />
          </div>

          {/* Quick suggestions */}
          <div className="mt-4 flex flex-wrap gap-2 items-center text-xs text-white/50">
            <span>Popular:</span>
            {['Velvet Sofa', 'Marble Dining Table', 'King Bed Frame', 'Fluted Sideboard', 'Working Desk'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-[#FF7A00] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        <div className="space-y-4">
          {query.trim() && (
            <div className="flex justify-between items-center text-xs text-white/40 pb-2">
              <span>{filtered.length} piece{filtered.length === 1 ? '' : 's'} discovered</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="group flex gap-4 p-3 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-white/10 hover:border-[#FF7A00]/50 cursor-pointer transition-all duration-200"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-neutral-900 border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-wider text-[#FFD3A1]">
                    {product.category.replace('-', ' ')} · {product.type}
                  </span>
                  <h4 className="font-serif text-base text-white group-hover:text-[#FF7A00] truncate transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-sm font-bold text-white">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-[#FF7A00] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {query.trim() && filtered.length === 0 && (
            <div className="py-16 text-center text-white/50 space-y-2">
              <p className="font-serif text-xl text-white">No pieces match "{query}"</p>
              <p className="text-sm">Try searching for "oak", "leather", "dining", or "bed".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
