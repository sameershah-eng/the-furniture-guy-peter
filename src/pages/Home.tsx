import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Truck, Wrench, Star, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { brandConfig } from '../config/brand';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { rooms } from '../data/rooms';
import { reviews } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

export const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const spotlightProduct = products[0]; // Aurelia Sofa
  const featuredRoom = rooms[0]; // Modern Haven

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 1. ELITE HERO SECTION: Full-viewport (100svh) Cinematic Luxury */}
      <section className="relative w-full h-[100svh] min-h-[680px] flex items-center justify-center overflow-hidden">
        {/* Background Image with slow cinematic zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
            alt="The Furniture Guy London Living Room"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-dark-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-8 space-y-6">
              {/* Clean Editorial Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD3A1] text-xs uppercase tracking-[0.2em] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>London Atelier & Flagship Showroom</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
                Spaces that feel like{' '}
                <span className="font-serif italic font-normal text-gradient-orange">
                  home
                </span>
                .
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-white/80 max-w-xl font-light leading-relaxed">
                Handcrafted solid British oak, Italian full-aniline hides, and tactile bouclés. Designed for architectural residences across the United Kingdom.
              </p>

              {/* Two Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/collections/living-room"
                  className="px-8 py-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all hard-shadow shadow-xl group"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl border border-white/30 hover:border-[#FF7A00] bg-black/40 backdrop-blur-md text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                >
                  <span>Visit Showroom</span>
                </Link>
              </div>
            </div>

            {/* Right Floating Featured Product Glass Card */}
            <div className="hidden lg:block lg:col-span-4">
              <Link
                to={`/product/${spotlightProduct.slug}`}
                className="block p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 hover:border-[#FF7A00] transition-all group shadow-2xl hover:translate-y-[-4px]"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <img
                    src={spotlightProduct.images[0]}
                    alt={spotlightProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-black/80 text-[#FF7A00] rounded">
                    Featured Piece
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#FFD3A1]">
                      {spotlightProduct.type}
                    </span>
                    <h3 className="font-serif text-lg text-white group-hover:text-[#FF7A00] transition-colors leading-tight">
                      {spotlightProduct.name}
                    </h3>
                  </div>
                  <span className="font-mono text-base font-bold text-white tabular-nums">
                    {formatPrice(spotlightProduct.price)}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Stats Bar at Hero Foot */}
          <div className="mt-12 sm:mt-16 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-white/80">
            {brandConfig.stats.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-white/50 mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 6 CATEGORY TILES: Main Editorial Entry Point */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-2">
              Browse by Department
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Curated Living Spaces
            </h2>
          </div>
          <p className="text-sm text-white/60 max-w-md">
            Whether you are furnishing a complete Victorian terrace or selecting a singular statement dining table.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.flow === 'room' ? `/collections/${cat.slug}` : `/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-[#FF7A00] transition-all duration-300 bg-[#0D0D0D] hard-shadow"
            >
              {/* Category Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Number Badge */}
                <span className="absolute top-4 left-4 font-serif text-sm tracking-widest text-white/70 font-mono">
                  {cat.number}
                </span>

                {/* Flow type indicator */}
                <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#FFD3A1] rounded border border-white/10">
                  {cat.flow === 'room' ? 'Style Gallery' : 'Configurator'}
                </span>
              </div>

              {/* Title & Info */}
              <div className="p-6 bg-[#0D0D0D] flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white group-hover:text-[#FF7A00] transition-colors mb-1.5 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#FF7A00] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#FFD3A1]">
                  <span>{cat.itemCount}</span>
                  <span className="text-[11px] font-medium text-[#FF7A00] group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "SHOP THE LOOK" TEASER SECTION */}
      <section className="py-20 bg-gradient-to-b from-black via-[#141414] to-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Tagged Room Preview */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl">
              <img
                src={featuredRoom.fullRoomImage}
                alt={featuredRoom.title}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Hotspot indicator samples */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#FF7A00] text-xs text-white shadow-xl animate-bounce">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00]" />
                <span>Interactive Hotspots Active</span>
              </div>
            </div>

            {/* Description & Bundle CTA */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold">
                Shop The Entire Room
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {featuredRoom.title}
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Take the guesswork out of interior design. Our master stylists coordinate timber grains, fabric rub-counts, and proportion so your home looks effortlessly editorial.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Complete 5-Piece Suite</span>
                  <span className="text-[#FF7A00] font-bold uppercase tracking-wider font-mono">10% Bundle Discount</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-white">Full Room Package</span>
                  <span className="font-mono text-2xl font-bold text-gradient-orange">
                    {formatPrice(3699)}
                  </span>
                </div>
              </div>

              <Link
                to={`/collections/living-room/${featuredRoom.slug}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all hard-shadow"
              >
                <span>View Full Room & Hotspots</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block mb-2">
              Curated Icons
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              London Atelier Bestsellers
            </h2>
          </div>
          <Link
            to="/category/sofas"
            className="text-xs font-semibold text-[#FF7A00] hover:underline flex items-center gap-1.5"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP & WHY CHOOSE US */}
      <section className="py-20 bg-[#0E0E0E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold">
              The Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Why London Chooses The Furniture Guy
            </h2>
            <p className="text-sm text-white/60">
              Heirloom longevity built on honest British craft, sustainable timber, and thoughtful customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 hard-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white">Solid Slow-Grown Timber</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                We craft using FSC-certified European white oak and ash with zero synthetic paper veneers or hollow cores.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 hard-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white">10-Year Guarantee</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Every frame and joint is backed by our comprehensive 10-year structural warranty, honoring generations of use.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 hard-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white">White-Glove Delivery</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Complimentary across Greater London. Our two-man team carries each piece to your chosen room and removes packaging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 hard-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/10 border border-[#FF7A00]/30 flex items-center justify-center text-[#FF7A00]">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white">Bespoke Adjustments</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Need an extra 20cm on a dining table or custom fabric swatches? Our atelier team accommodates bespoke specifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REAL CUSTOMER REVIEWS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Loved by Homes Across Britain
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-[#FF7A00] pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FF7A00]" />
            ))}
            <span className="text-xs text-white/70 ml-2 font-mono">4.9/5 from over 1,200 verified homeowners</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col justify-between space-y-4 hard-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#FF7A00]">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF7A00]" />
                  ))}
                </div>
                <h3 className="font-serif text-lg text-white font-semibold">
                  "{r.title}"
                </h3>
                <p className="text-xs text-white/70 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="font-serif text-sm text-white font-medium">{r.name}</p>
                <div className="flex items-center justify-between text-[11px] text-white/50 mt-0.5">
                  <span>{r.location}</span>
                  <span className="text-emerald-400">Verified Client ✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LONDON SHOWROOM & MAP SECTION */}
      <section className="py-20 bg-[#0B0B0B] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Showroom Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold">
                Private Viewings & Flagship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Visit our Battersea Atelier
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Experience the weight of our solid oak tables, test the comfort of our cloud couches, and review custom leather memo swatches with our in-house designers.
              </p>

              <div className="space-y-3 text-xs text-white/80 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-medium">{brandConfig.showroom.name}</strong>
                    <span>{brandConfig.showroom.addressLine1}, {brandConfig.showroom.addressLine2}, {brandConfig.showroom.city} {brandConfig.showroom.postcode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-white font-medium">Opening Hours</span>
                    <span>{brandConfig.showroom.openingHours.weekday}</span>
                    <span className="block text-white/50">{brandConfig.showroom.openingHours.sunday}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF7A00] shrink-0" />
                  <a href={`tel:${brandConfig.contact.phone}`} className="hover:text-white transition-colors">
                    {brandConfig.contact.phoneDisplay} (Showroom reception)
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider text-center hard-shadow hover:brightness-110"
                >
                  Book Private Viewing
                </Link>
                <a
                  href={brandConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#FF7A00] text-white font-semibold text-xs uppercase tracking-wider text-center hover:bg-white/5 transition-colors"
                >
                  Chat with Concierge
                </a>
              </div>
            </div>

            {/* Google Map Embedded Iframe */}
            <div className="lg:col-span-7 h-96 rounded-2xl overflow-hidden border-2 border-white/15 hard-shadow">
              <iframe
                title="The Furniture Guy London Showroom Location"
                src={brandConfig.showroom.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
