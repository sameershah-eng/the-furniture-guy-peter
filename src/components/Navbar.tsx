import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Phone, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { brandConfig } from '../config/brand';
import { categories } from '../data/categories';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  const { cart, wishlistIds, toggleCart, setSearchOpen } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistIds.length;

  const isHomePage = location.pathname === '/';

  // Scroll detection: frosted glass after 80px, hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // scrolling down -> hide
        setIsVisible(false);
      } else {
        // scrolling up -> show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaCategory(null);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Living Room', href: '/collections/living-room', slug: 'living-room' },
    { label: 'Dining Room', href: '/collections/dining-room', slug: 'dining-room' },
    { label: 'Bedroom', href: '/collections/bedroom', slug: 'bedroom' },
    { label: 'Sofas', href: '/category/sofas', slug: 'sofas' },
    { label: 'Table Sets', href: '/category/table-sets', slug: 'table-sets' },
    { label: 'Bed Sets', href: '/category/bed-sets', slug: 'bed-sets' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled || !isHomePage
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Zone 1: Brand Wordmark / Monogram */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 group">
                {/* Monogram Emblem */}
                <span className="w-9 h-9 rounded-lg bg-gradient-signature text-black font-serif italic font-bold text-lg flex items-center justify-center hard-shadow shadow-sm group-hover:scale-105 transition-transform">
                  {brandConfig.monogram}
                </span>

                {/* Desktop Wordmark */}
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-serif tracking-tight text-white leading-none">
                    The <span className="font-serif italic text-gradient-orange">Furniture</span> Guy
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#FFD3A1] mt-0.5 hidden sm:block font-medium">
                    London Showroom
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: Navigation Links with Hover Mega-Menu trigger */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/80">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <div
                    key={link.label}
                    className="relative group py-2"
                    onMouseEnter={() => link.slug && setActiveMegaCategory(link.slug)}
                    onMouseLeave={() => setActiveMegaCategory(null)}
                  >
                    <Link
                      to={link.href}
                      className={`relative whitespace-nowrap transition-colors hover:text-white ${
                        isActive ? 'text-[#FF7A00] font-semibold' : ''
                      }`}
                    >
                      {link.label}
                      {/* Animated gradient underline */}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-signature transition-all duration-200 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>

                    {/* Mega-menu dropdown for category links */}
                    {activeMegaCategory === link.slug && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 p-4 bg-black/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl text-white mt-1 pointer-events-auto">
                        {(() => {
                          const cat = categories.find((c) => c.slug === link.slug);
                          if (!cat) return null;
                          return (
                            <div className="space-y-3">
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-28 object-cover rounded-lg border border-white/10"
                              />
                              <div>
                                <h4 className="font-serif text-base text-white">{cat.name}</h4>
                                <p className="text-xs text-white/50 line-clamp-2 mt-0.5">
                                  {cat.description}
                                </p>
                              </div>
                              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#FF7A00]">
                                <span>{cat.flow === 'room' ? 'Style Gallery' : 'Filtered Collection'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF7A00] text-black font-mono font-bold text-[10px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                to="/account"
                aria-label="Account"
                className="hidden sm:flex p-2 sm:p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => toggleCart(true)}
                aria-label="Open bag"
                className="relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-lg bg-gradient-signature text-black font-semibold text-xs tracking-wider uppercase hard-shadow hover:brightness-110 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-bold text-[11px] flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl text-white flex flex-col justify-between p-6 overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-signature text-black font-serif italic font-bold text-base flex items-center justify-center">
                TFG
              </span>
              <span className="font-serif text-xl tracking-tight">The Furniture Guy</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-white/70 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Links */}
          <div className="py-6 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FFD3A1]">Collections & Rooms</p>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-serif text-2xl hover:text-[#FF7A00] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
              </Link>
            ))}
          </div>

          {/* Quick Category Thumbnails Strip */}
          <div className="py-4 border-t border-b border-white/10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">Featured Departments</p>
            <div className="grid grid-cols-3 gap-2">
              {categories.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/collections/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative rounded-lg overflow-hidden aspect-[4/3] border border-white/10"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                    <span className="font-serif text-xs text-white leading-tight font-medium">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer with Direct WhatsApp & Showroom call */}
          <div className="pt-6 space-y-3">
            <a
              href={brandConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hard-shadow"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Concierge ({brandConfig.contact.whatsappDisplay})</span>
            </a>

            <div className="flex justify-between text-xs text-white/50 pt-2">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Showroom & Map
              </Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Atelier Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
