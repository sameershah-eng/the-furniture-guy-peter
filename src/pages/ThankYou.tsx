import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { brandConfig } from '../config/brand';
import { Breadcrumb } from '../components/Breadcrumb';

export const ThankYou: React.FC = () => {
  const location = useLocation();
  const state = location.state as { name?: string; productName?: string } | undefined;

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <Breadcrumb
        items={[
          { label: 'Enquiry', href: '/enquiry' },
          { label: 'Request Received' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-10">
        {/* Animated Check & Hero Confirmation */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border-2 border-emerald-500/40 text-center space-y-4 hard-shadow">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold block">
            Lead Successfully Captured
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Thank you{state?.name ? `, ${state.name}` : ''}. Your request has been received.
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            Our senior atelier team in Battersea will call you back within 2 business hours to confirm dimensions, fabric memo samples, delivery scheduling, and flexible payment terms.
          </p>

          {state?.productName && (
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/80 max-w-md mx-auto">
              Inquiry regarding: <strong className="text-[#FF7A00]">{state.productName}</strong>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections/living-room"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow"
            >
              Continue Exploring
            </Link>

            <a
              href={brandConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Line</span>
            </a>
          </div>
        </div>

        {/* Visit Showroom Card with Address and Google Map */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0F0F] border border-white/15 space-y-6 hard-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#FF7A00] font-semibold block">
                Flagship Experience
              </span>
              <h2 className="font-serif text-2xl text-white">Visit our London Atelier</h2>
            </div>
            <Link
              to="/contact"
              className="text-xs font-semibold text-[#FF7A00] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">{brandConfig.showroom.name}</strong>
                <span>{brandConfig.showroom.addressLine1}, {brandConfig.showroom.addressLine2}, {brandConfig.showroom.city} {brandConfig.showroom.postcode}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Opening Hours</strong>
                <span>{brandConfig.showroom.openingHours.weekday}</span>
                <span className="block text-white/50">{brandConfig.showroom.openingHours.sunday}</span>
              </div>
            </div>
          </div>

          <div className="h-64 rounded-xl overflow-hidden border border-white/10">
            <iframe
              title="London Showroom Map"
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
    </div>
  );
};
