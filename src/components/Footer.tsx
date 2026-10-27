import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { brandConfig } from '../config/brand';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to our private lookbook.');
  };

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/10 relative overflow-hidden">
      {/* Top Newsletter & Atelier Strip */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold">
              The Atelier Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Invitations to private showroom previews & interior lookbooks
            </h3>
            <p className="text-sm text-white/50 max-w-lg">
              Receive seasonal lookbooks, wood finish releases, and architectural styling notes from our London design studio.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 bg-[#141414] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 hard-shadow"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>You are subscribed. We look forward to sharing our latest pieces with you.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info & Showroom */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-signature text-black font-serif italic font-bold text-base flex items-center justify-center">
                {brandConfig.monogram}
              </span>
              <span className="font-serif text-2xl tracking-tight">The Furniture Guy</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed pr-6">
              {brandConfig.tagline}. Handcrafted in the UK using slow-grown solid European oak, Italian aniline hides, and heirloom joinery for homes across Great Britain.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <span>{brandConfig.showroom.addressLine1}, {brandConfig.showroom.addressLine2}, {brandConfig.showroom.city} {brandConfig.showroom.postcode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <a href={`tel:${brandConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {brandConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>{brandConfig.showroom.openingHours.weekday}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Room Collections */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#FFD3A1] font-semibold">
              Curated Rooms
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link to="/collections/living-room" className="hover:text-white transition-colors">
                  Living Room Gallery
                </Link>
              </li>
              <li>
                <Link to="/collections/dining-room" className="hover:text-white transition-colors">
                  Dining Room Gallery
                </Link>
              </li>
              <li>
                <Link to="/collections/bedroom" className="hover:text-white transition-colors">
                  Bedroom Gallery
                </Link>
              </li>
              <li>
                <Link to="/collections/living-room/modern-haven" className="hover:text-white transition-colors">
                  Modern Haven Set
                </Link>
              </li>
              <li>
                <Link to="/collections/dining-room/chelsea-oak-6-seater" className="hover:text-white transition-colors">
                  Chelsea 6-Seater Feast
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#FFD3A1] font-semibold">
              Departments
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link to="/category/sofas" className="hover:text-white transition-colors">
                  Bespoke Sofas & Couches
                </Link>
              </li>
              <li>
                <Link to="/category/table-sets" className="hover:text-white transition-colors">
                  Executive Table Sets
                </Link>
              </li>
              <li>
                <Link to="/category/bed-sets" className="hover:text-white transition-colors">
                  Platform Bed Suites
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  My Saved Pieces
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge & Atelier */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#FFD3A1] font-semibold">
              Client Care
            </p>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Book London Showroom Visit
                </Link>
              </li>
              <li>
                <a
                  href={brandConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  WhatsApp Bespoke Enquiries
                </a>
              </li>
              <li>
                <Link to="/enquiry" className="hover:text-white transition-colors">
                  Request Trade Pricing
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#FF7A00] transition-colors font-medium">
                  Atelier Admin Portal
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>10-Year Structural Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment strip */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>
          © {new Date().getFullYear()} {brandConfig.name}. Registered in England & Wales. All rights reserved.
        </p>

        {/* Payment badges */}
        <div className="flex items-center flex-wrap gap-2 text-[11px] font-mono">
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white/70">Visa</span>
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white/70">Mastercard</span>
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white/70">Apple Pay</span>
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-white/70">PayPal</span>
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[#FFD3A1]">Klarna (Pay in 3)</span>
          <span className="px-2 py-1 bg-white/5 rounded border border-white/10 text-[#FF7A00]">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
