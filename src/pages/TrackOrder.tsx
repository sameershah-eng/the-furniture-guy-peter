import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Truck, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Box } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { brandConfig } from '../config/brand';
import { Breadcrumb } from '../components/Breadcrumb';

export const TrackOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useStore();

  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return <Navigate to="/account" replace />;
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500 text-black';
      case 'Dispatched':
        return 'bg-[#FF7A00] text-black';
      case 'Packed':
        return 'bg-amber-400 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'My Account', href: '/account' },
          { label: `Tracking #${order.id}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        {/* Status Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border-2 border-white/15 hard-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-mono font-bold uppercase rounded ${getStatusBadgeColor(order.status)}`}>
                {order.status}
              </span>
              <span className="text-xs text-white/50">Tracking: MO-UK-{order.id.slice(-5)}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Order #{order.id}
            </h1>
            <p className="text-xs text-white/60">
              Placed on {order.date} · Scheduled for {order.customer.city}
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-white/10 sm:pl-6 self-start sm:self-auto">
            <span className="text-xs text-white/50 block">White Glove Delivery</span>
            <span className="font-mono text-2xl font-bold text-gradient-orange">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Animated Timeline */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-8 hard-shadow">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white">Delivery Progression</h2>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Atelier Updates
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/15">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <span
                  className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                    event.done
                      ? 'bg-gradient-signature border-black text-black'
                      : 'bg-black border-white/30 text-white/30'
                  }`}
                >
                  {event.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className={`font-serif text-lg font-semibold ${event.done ? 'text-white' : 'text-white/40'}`}>
                      {event.label}
                    </h3>
                    <span className="font-mono text-xs text-[#FFD3A1]">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed max-w-xl">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Assembly Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3 hard-shadow">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4 text-[#FF7A00]" />
              <h3 className="font-serif text-lg">Delivery Destination</h3>
            </div>
            <div className="text-xs text-white/70 space-y-1">
              <p className="text-white font-medium">{order.customer.fullName}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
              <p>{order.customer.city}, {order.customer.postcode}</p>
              <p className="pt-1 text-white/40">Tel: {order.customer.phone}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3 hard-shadow">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-[#FF7A00]" />
              <h3 className="font-serif text-lg">Our Crew Delivers & Assembles</h3>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Your bespoke commission is handled exclusively by our London delivery specialists. We assemble all joints, level on floor surfaces, and remove all protective moving blankets for zero waste.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Need access adjustment? Call driver via concierge.</span>
            </div>
          </div>
        </div>

        {/* Commission Items */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hard-shadow">
          <h3 className="font-serif text-xl text-white">Items in this Delivery</h3>
          <div className="divide-y divide-white/10">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="py-3 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-base text-white">{item.product.name}</h4>
                    <p className="text-xs text-white/50">{item.finish} · {item.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/50 font-mono">Qty: {item.quantity}</span>
                  <p className="font-mono text-sm font-bold text-white">{formatPrice(item.unitPrice * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
