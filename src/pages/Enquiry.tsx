import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MessageCircle, Send, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../config/brand';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { Breadcrumb } from '../components/Breadcrumb';

export const Enquiry: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addEnquiry } = useStore();

  const state = location.state as {
    productName?: string;
    productPrice?: number;
    size?: string;
    finish?: string;
  } | undefined;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState(
    state?.productName
      ? `I would like to enquire about the ${state.productName} (Size: ${state.size || 'Standard'}, Finish: ${state.finish || 'Standard'}). Please let me know regarding delivery time to my address and bespoke finish options.`
      : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addEnquiry({
      name,
      phone,
      email,
      city: city || 'London',
      message,
      productName: state?.productName,
      productPrice: state?.productPrice,
    });

    navigate('/enquiry/thank-you', {
      state: { name, productName: state?.productName },
    });
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello! My name is ${name || 'a customer'}. I would like to enquire about ${
        state?.productName ? `${state.productName} (${formatPrice(state.productPrice || 0)})` : 'your furniture collections'
      }.`
    );
    window.open(`${brandConfig.contact.whatsappUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <Breadcrumb
        items={[
          { label: 'Concierge', href: '/' },
          { label: 'Bespoke Enquiry' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FFD3A1] text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Enquiry Path · No Upfront Payment</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Consult with Our London Atelier
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Prefer to discuss dimensions, fabric swatches, access through tight London stairwells, or pay upon delivery? Send us your request or chat instantly via WhatsApp.
          </p>
        </div>

        {/* WhatsApp Fast-Lane Card */}
        <div className="p-6 rounded-2xl bg-[#0F1E14] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 hard-shadow">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
              Instant Concierge Channel
            </span>
            <h3 className="font-serif text-xl text-white">Prefer WhatsApp?</h3>
            <p className="text-xs text-white/70">
              Speak with our Battersea design showroom directly for real-time video tours, fabric photos, and lead times.
            </p>
          </div>
          <button
            onClick={handleWhatsAppDirect}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all hard-shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp ({brandConfig.contact.whatsappDisplay})</span>
          </button>
        </div>

        {/* Selected Product Banner (if prefilled) */}
        {state?.productName && (
          <div className="p-4 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#FFD3A1] block">Referencing Piece:</span>
              <span className="font-serif text-lg text-white font-semibold">{state.productName}</span>
              {state.size && <span className="text-xs text-white/50 ml-2">({state.size} · {state.finish})</span>}
            </div>
            {state.productPrice && (
              <span className="font-mono text-base font-bold text-[#FF7A00]">
                {formatPrice(state.productPrice)}
              </span>
            )}
          </div>
        )}

        {/* Main Enquiry Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-6 hard-shadow">
          <h2 className="font-serif text-2xl text-white">Your Contact Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-medium">Your Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Eleanor Vance"
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-medium">UK Telephone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 07700 900123"
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. eleanor@kensington.co.uk"
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-white/70 font-medium">Town or City (UK)</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. London, Bath, Edinburgh"
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/70 font-medium">Your Message / Bespoke Requirements</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about room dimensions, target delivery dates, or requests for fabric memo samples..."
              className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>We never share client details. Response within 2 business hours.</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
