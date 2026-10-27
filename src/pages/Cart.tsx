import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice, calculateKlarna3 } from '../utils/formatPrice';
import { brandConfig } from '../config/brand';
import { Breadcrumb } from '../components/Breadcrumb';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    deliveryOption,
    setDeliveryOption,
    getCartSubtotal,
    getDeliveryCost,
    getCartTotal,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = getCartSubtotal();
  const delivery = getDeliveryCost();
  const total = getCartTotal();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="font-serif italic text-3xl text-[#FF7A00]">TFG</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Your shopping bag is empty</h1>
          <p className="text-sm text-white/60">
            Explore our handcrafted living, dining, and bedroom furniture collections.
          </p>
          <Link
            to="/collections/living-room"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest hard-shadow hover:brightness-110"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/' },
          { label: `Shopping Bag (${itemCount})` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Your Shopping Bag</h1>
            <p className="text-xs text-white/50 mt-1">
              {itemCount} {itemCount === 1 ? 'handcrafted piece' : 'handcrafted pieces'} selected
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-white/40 hover:text-rose-400 transition-colors"
          >
            Clear Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#111111] border border-white/10 rounded-2xl divide-y divide-white/10 overflow-hidden hard-shadow">
              {cart.map((item) => (
                <div key={item.cartItemId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl bg-neutral-900 border border-white/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#FFD3A1]">
                      {item.product.category.replace('-', ' ')}
                    </span>
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="font-serif text-lg font-semibold text-white hover:text-[#FF7A00] transition-colors block leading-tight truncate"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                      <span>Finish: <strong className="text-white/80">{item.finish}</strong></span>
                      <span>Size: <strong className="text-white/80">{item.size}</strong></span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/20 rounded-lg bg-black overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="px-2 py-1 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Remove item"
                        className="p-1 text-white/40 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Option Selector */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hard-shadow">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FF7A00]" />
                <h3 className="font-serif text-lg text-white">Select Delivery Preference</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'london',
                    label: 'Greater London Delivery',
                    cost: 'Free',
                    desc: '2-Man delivery inside M25 (3–5 working days)',
                  },
                  {
                    id: 'assembly',
                    label: 'White-Glove In-Room Assembly',
                    cost: '£95',
                    desc: 'Full assembly, leveling, and packaging removal',
                  },
                  {
                    id: 'standard',
                    label: 'UK Mainland Standard Delivery',
                    cost: '£45',
                    desc: 'Ground floor courier delivery outside London',
                  },
                  {
                    id: 'pickup',
                    label: 'Showroom Collection (Battersea)',
                    cost: 'Free',
                    desc: 'Collect directly from our London Atelier',
                  },
                ].map((opt) => {
                  const active = deliveryOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDeliveryOption(opt.id as any)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        active
                          ? 'bg-[#1C1814] border-[#FF7A00] ring-1 ring-[#FF7A00]'
                          : 'bg-[#141414] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-white">{opt.label}</span>
                        <span className={opt.cost === 'Free' ? 'text-emerald-400' : 'text-white font-mono'}>
                          {opt.cost}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 mt-1">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-[#111111] border-2 border-white/15 space-y-5 hard-shadow">
              <h3 className="font-serif text-xl text-white">Order Summary</h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (WELCOME10, TFG50)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-3.5 py-2.5 text-xs uppercase tracking-wider text-white placeholder-white/40 focus:outline-none"
                    />
                    <Tag className="w-3.5 h-3.5 text-white/40 absolute right-3 top-3" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                    <span>Code <strong className="font-mono">{couponCode}</strong> applied</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-white/60 hover:text-white underline text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Line Items */}
              <div className="space-y-2.5 text-xs text-white/70 border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FF7A00]">
                    <span>Promotional Discount</span>
                    <span className="font-mono font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliveryOption})</span>
                  <span className={delivery === 0 ? 'text-emerald-400 font-medium' : 'font-mono text-white'}>
                    {delivery === 0 ? 'Free' : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="font-mono text-2xl text-gradient-orange">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Klarna breakdown */}
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/70">
                <span>Or pay in 3 monthly instalments of </span>
                <strong className="text-white font-mono">{calculateKlarna3(total)}</strong>
                <span> with </span>
                <span className="text-[#FFD3A1] font-semibold">Klarna</span>.
              </div>

              {/* Proceed to Checkout button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>10-Year Guarantee · Free London Setup · 3D Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
