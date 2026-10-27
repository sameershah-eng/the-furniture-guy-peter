import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/categories';
import { products, Product } from '../data/products';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';

export const FilterCategory: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const category = categories.find((c) => c.slug === categorySlug);

  if (!category || category.flow !== 'filter') {
    return <Navigate to="/category/sofas" replace />;
  }

  const categoryProducts = products.filter((p) => p.category === categorySlug);
  const filterChips = ['All', ...(category.filterOptions || [])];

  const filteredAndSortedProducts = useMemo(() => {
    let result = selectedType === 'All'
      ? [...categoryProducts]
      : categoryProducts.filter((p) => p.type.toLowerCase() === selectedType.toLowerCase());

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryProducts, selectedType, sortBy]);

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/' },
          { label: category.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF7A00] font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Pick a Type & Specifier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {category.name} Collection
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {category.description} Filter by silhouette, upholstery, or dimensions to tailor the perfect addition to your London residence.
          </p>
        </div>

        {/* Filter Chips Bar & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#111111] border border-white/10">
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {filterChips.map((chip) => {
              const active = selectedType === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setSelectedType(chip)}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border-2 ${
                    active
                      ? 'bg-[#FF7A00] text-black border-black hard-shadow'
                      : 'bg-[#181818] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0 text-xs text-white/70 self-end md:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FF7A00]"
            >
              <option value="featured">Featured Atelier Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Count Note */}
        <div className="flex justify-between items-center text-xs text-white/50">
          <span>
            Showing <strong>{filteredAndSortedProducts.length}</strong> {filteredAndSortedProducts.length === 1 ? 'piece' : 'pieces'} in {category.name} {selectedType !== 'All' ? `(${selectedType})` : ''}
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-2xl text-white">No pieces found matching this filter</p>
            <p className="text-sm text-white/50">Try selecting "All" to view the complete collection.</p>
            <button
              onClick={() => setSelectedType('All')}
              className="mt-2 px-5 py-2.5 rounded-lg bg-[#FF7A00] text-black font-semibold text-xs tracking-wider uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
