import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Truck, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { Breadcrumb } from '../components/Breadcrumb';

export const Account: React.FC = () => {
  const { orders } = useStore();

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Client Care', href: '/' },
          { label: 'My Account & Orders' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-10">
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 hard-shadow">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-signature text-black font-serif italic font-bold text-2xl flex items-center justify-center hard-shadow shrink-0">
              VS
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#FFD3A1]">Atelier Private Client</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">Lady Victoria Spencer</h1>
              <p className="text-xs text-white/50">victoria.spencer@kensington.co.uk · London W8</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4" />
            <span>Complimentary London Delivery Active</span>
          </div>
        </div>

        {/* Saved Addresses & Concierge notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3 hard-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF7A00]" />
                <h3 className="font-serif text-lg text-white">Primary Residence Address</h3>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Default</span>
            </div>
            <div className="text-xs text-white/70 space-y-1">
              <p className="text-white font-medium">Lady Victoria Spencer</p>
              <p>42 Palace Gardens Terrace, Apt 4B</p>
              <p>Kensington, London, W8 4RP</p>
              <p className="text-white/40 pt-1">Access notes: Service lift available via rear garden mews</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3 hard-shadow">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF7A00]" />
              <h3 className="font-serif text-lg text-white">Dedicated London Concierge</h3>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Your account is managed by senior stylist Marcus at our Battersea showroom. Contact your concierge directly for priority workshop scheduling or fabric memo dispatch.
            </p>
            <div className="pt-1">
              <Link to="/contact" className="text-xs font-semibold text-[#FF7A00] hover:underline">
                Contact Atelier Reception →
              </Link>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h2 className="font-serif text-2xl text-white">Commission & Order History</h2>
              <p className="text-xs text-white/50">Track live transit or print receipts</p>
            </div>
            <span className="text-xs font-mono text-white/50">{orders.length} order(s)</span>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#111111] border border-white/10 space-y-2">
              <Package className="w-8 h-8 text-white/40 mx-auto" />
              <p className="font-serif text-lg text-white">No commissions logged yet</p>
              <p className="text-xs text-white/50">Your completed purchases will appear here with live tracking.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all space-y-4 hard-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">Order #{ord.id}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#FF7A00] text-black">
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-xs text-white/50">{ord.date}</span>
                    </div>

                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      <span className="font-mono text-lg font-bold text-gradient-orange">
                        {formatPrice(ord.total)}
                      </span>
                      <Link
                        to={`/track/${ord.id}`}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-[#FF7A00] hover:text-black transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Delivery</span>
                      </Link>
                    </div>
                  </div>

                  {/* Order items summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items.map((item) => (
                      <div key={item.cartItemId} className="flex gap-3 items-center p-2 rounded-xl bg-black/40 border border-white/5">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-neutral-900 border border-white/10 shrink-0"
                        />
                        <div className="min-w-0 flex-1 text-xs">
                          <p className="font-medium text-white truncate">{item.product.name}</p>
                          <p className="text-[11px] text-white/50 truncate">Qty: {item.quantity} · {item.finish}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
