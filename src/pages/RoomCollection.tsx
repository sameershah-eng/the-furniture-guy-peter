import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { categories } from '../data/categories';
import { rooms } from '../data/rooms';
import { Breadcrumb } from '../components/Breadcrumb';

export const RoomCollection: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [selectedStyle, setSelectedStyle] = useState<string>('All');

  const category = categories.find((c) => c.slug === categorySlug);

  // If category doesn't exist or doesn't use room flow, redirect
  if (!category || category.flow !== 'room') {
    return <Navigate to="/collections/living-room" replace />;
  }

  // Filter styles
  const allCategoryRooms = rooms.filter((r) => r.categorySlug === categorySlug);
  const filterChips = ['All', ...(category.filterOptions || [])];

  const displayedRooms = selectedStyle === 'All'
    ? allCategoryRooms
    : allCategoryRooms.filter((r) => r.style.toLowerCase() === selectedStyle.toLowerCase());

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <Breadcrumb
        items={[
          { label: 'Collections', href: '/' },
          { label: category.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FF7A00] font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Style Gallery · Step 1 of 2</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {category.name} Arrangements
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {category.description} Select a room style below to explore interactive hotspots, inspect individual pieces, or acquire the complete coordinated room suite.
          </p>
        </div>

        {/* Style Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterChips.map((chip) => {
            const active = selectedStyle === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedStyle(chip)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border-2 ${
                  active
                    ? 'bg-[#FF7A00] text-black border-black hard-shadow'
                    : 'bg-[#141414] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Style Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedRooms.map((room) => (
            <Link
              key={room.id}
              to={`/collections/${category.slug}/${room.slug}`}
              className="group relative rounded-2xl overflow-hidden border-2 border-white/15 hover:border-[#FF7A00] transition-all duration-300 bg-[#0D0D0D] hard-shadow flex flex-col"
            >
              {/* Full Room Image preview */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.fullRoomImage}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Style Chip & Hotspot badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#FF7A00] border border-[#FF7A00]/40 rounded-lg">
                    {room.style} Style
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-black/80 backdrop-blur-md text-white/90 rounded-lg border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FF7A00]" />
                    <span>{room.hotspots.length} Tagged Pieces</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-[#0D0D0D]">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl text-white group-hover:text-[#FF7A00] transition-colors leading-snug flex items-center justify-between">
                    <span>{room.title}</span>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-[#FFD3A1] font-medium">
                    {room.subtitle}
                  </p>
                  <p className="text-xs text-white/60 line-clamp-2 pt-1 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/60">Complete Room Suite</span>
                  <span className="font-semibold text-[#FF7A00] group-hover:underline flex items-center gap-1">
                    <span>Shop Look & Hotspots</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
