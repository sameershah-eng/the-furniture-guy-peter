import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { brandConfig } from '../config/brand';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    getCartSubtotal,
    getCartTotal,
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
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

  const handleProceedToCheckout = () => {
    toggleCart(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => toggleCart(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-white/10 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-tight">Shopping Bag</span>
              <span className="w-6 h-6 rounded-full bg-[#FF7A00] text-black text-xs font-bold flex items-center justify-center font-mono">
                {itemCount}
              </span>
            </div>
            <button
              onClick={() => toggleCart(false)}
              aria-label="Close bag"
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Note */}
          <div className="bg-[#1A1A1A] px-5 py-2.5 text-xs text-[#FFD3A1] flex items-center gap-2 border-b border-white/5">
            <Truck className="w-4 h-4 text-[#FF7A00] shrink-0" />
            <span>Complimentary white glove delivery in Greater London</span>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-white/10">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-white/40">
                  <span className="font-serif italic text-2xl">TFG</span>
                </div>
                <h3 className="font-serif text-xl text-white">Your bag is currently empty</h3>
                <p className="text-sm text-white/50 max-w-xs mx-auto">
                  Explore our living, dining, and bedroom arrangements crafted for refined British homes.
                </p>
                <button
                  onClick={() => {
                    toggleCart(false);
                    navigate('/collections/living-room');
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-signature text-black font-semibold text-xs tracking-wider uppercase rounded-lg hover:brightness-110"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-neutral-900 border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={() => toggleCart(false)}
                          className="font-serif text-sm font-semibold hover:text-[#FF7A00] transition-colors truncate block"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label="Remove item"
                          className="text-white/40 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-white/50 space-y-0.5 mt-0.5">
                        <p className="truncate">Finish: {item.finish}</p>
                        <p className="truncate">Size: {item.size}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-black">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 px-2 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          aria-label="Increase quantity"
                          className="p-1 px-2 text-white/70 hover:bg-white/10 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-white tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-black/90 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. WELCOME10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-white/20 rounded-lg px-3 py-2 text-xs uppercase tracking-wider text-white placeholder-white/40 focus:outline-none focus:border-[#FF7A00]"
                    />
                    <Tag className="w-3.5 h-3.5 text-white/40 absolute right-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
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

              {/* Subtotals */}
              <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-3">
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
                  <span>London Delivery</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="font-mono text-lg text-gradient-orange">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-lg bg-gradient-signature text-black font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-lg hard-shadow"
              >
                <span>Checkout Securely</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>10-Year Guarantee · Free London Assembly · 3D Secure</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
