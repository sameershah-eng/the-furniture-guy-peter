import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Calendar } from 'lucide-react';
import { brandConfig } from '../config/brand';
import { useStore } from '../store/useStore';
import { Breadcrumb } from '../components/Breadcrumb';

export const Contact: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [interest, setInterest] = useState('Living Room Suite');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your private showroom viewing has been requested.');
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Atelier', href: '/' },
          { label: 'Showroom & Private Viewings' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block">
            London Atelier & Flagship
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Visit Our Battersea Showroom
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Located in London's design quarter. We welcome homeowners, architects, and interior designers to explore full room layouts, test feather-filled seating, and review solid oak timbers in natural light.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hard-shadow">
              <h3 className="font-serif text-xl text-white">Flagship Coordinates</h3>

              <div className="space-y-3.5 text-xs text-white/70">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">{brandConfig.showroom.name}</strong>
                    <span>{brandConfig.showroom.addressLine1}, {brandConfig.showroom.addressLine2}</span>
                    <span className="block">{brandConfig.showroom.city}, {brandConfig.showroom.postcode}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Opening Hours</strong>
                    <span>{brandConfig.showroom.openingHours.weekday}</span>
                    <span className="block">{brandConfig.showroom.openingHours.saturday}</span>
                    <span className="block text-white/50">{brandConfig.showroom.openingHours.sunday}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF7A00] shrink-0" />
                  <a href={`tel:${brandConfig.contact.phone}`} className="hover:text-white transition-colors">
                    {brandConfig.contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF7A00] shrink-0" />
                  <a href={`mailto:${brandConfig.contact.email}`} className="hover:text-white transition-colors">
                    {brandConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={brandConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hard-shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({brandConfig.contact.whatsappDisplay})</span>
                </a>
              </div>
            </div>

            {/* Parking and tube note */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1">
              <strong className="text-white block">Getting Here:</strong>
              <p>5 minutes walk from Battersea Park Station and Queenstown Road Station. Dedicated client parking bays available in private mews courtyard.</p>
            </div>
          </div>

          {/* Right Column: Book Appointment Form */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 hard-shadow">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#FFD3A1] font-semibold block">
                Personalized Design Session
              </span>
              <h2 className="font-serif text-2xl text-white">Book a Private Viewing</h2>
              <p className="text-xs text-white/50 mt-1">
                One of our senior stylists will prepare dedicated space, bespoke wood swatches, and coffee.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alistair Finch"
                      className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alistair@london.com"
                      className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Preferred Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Primary Focus</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="Living Room Suite">Living Room Suite</option>
                      <option value="Dining Room Feasting Table">Dining Room Feasting Table</option>
                      <option value="Master Bedroom Sanctuary">Master Bedroom Sanctuary</option>
                      <option value="Full Residence Commission">Full Residence Commission</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-white/70 font-medium">Any Specific Requirements or Blueprints</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Floorplan dimensions, ceiling height, target move-in dates..."
                    className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl p-3 text-sm text-white placeholder-white/30 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Appointment Request</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2 text-center">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                <h3 className="font-serif text-xl text-white">Viewing Requested Successfully</h3>
                <p className="text-xs text-white/70">
                  Our reception team will call {email} to confirm your appointment time and reserve parking.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="h-96 rounded-3xl overflow-hidden border-2 border-white/15 hard-shadow">
          <iframe
            title="London Showroom Map Location"
            src={brandConfig.showroom.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale contrast-125"
          />
        </div>
      </div>
    </div>
  );
};
