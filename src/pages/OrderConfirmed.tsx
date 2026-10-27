import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  Truck,
  MessageSquare,
  Mail,
  Smartphone,
  Star,
  ArrowRight,
  Upload,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { brandConfig } from '../config/brand';
import { Breadcrumb } from '../components/Breadcrumb';

export const OrderConfirmed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder, showToast } = useStore();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const order = id ? getOrder(id) : undefined;

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7A00', '#FFD3A1', '#FFFFFF', '#E86A00'],
      });
    } catch (e) {
      // safe fallback if canvas not available
    }
  }, []);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    showToast('Thank you! Your repeat-order code "OAKREPEAT5" has been unlocked.');
  };

  const handleFakePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedPhoto(url);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: 'Orders', href: '/account' },
            { label: `Order Confirmed #${order.id}` },
          ]}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        {/* ================= HEADER CELEBRATION BLOCK ================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111111] border-2 border-[#FF7A00]/50 text-center space-y-4 hard-shadow no-print">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FF7A00]/20 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/50">
            <CheckCircle2 className="w-10 h-10 animate-pulse" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#FFD3A1] font-bold block">
            Payment Authorized & Production Verified
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Order #{order.id} Confirmed
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            Thank you, {order.customer.fullName}. Your bespoke British furniture commission has been logged at our Battersea Atelier.
          </p>

          {/* Alerts Sent Badges (SMS, WhatsApp, Email) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-white/80">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>SMS Dispatched</span>
              <span className="text-emerald-400 font-bold">✓</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Confirmed</span>
              <span className="text-emerald-400 font-bold">✓</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Invoice Emailed</span>
              <span className="text-emerald-400 font-bold">✓</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/track/${order.id}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hard-shadow shadow-lg hover:brightness-110"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </Link>

            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print Invoice</span>
            </button>
          </div>
        </div>

        {/* ================= PRINTABLE OFFICIAL INVOICE BLOCK ================= */}
        <div
          id="printable-invoice"
          className="p-8 sm:p-10 rounded-2xl bg-[#0D0D0D] border border-white/15 space-y-8 hard-shadow"
        >
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-signature text-black font-serif italic font-bold text-base flex items-center justify-center">
                  {brandConfig.monogram}
                </span>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  The Furniture Guy
                </span>
              </div>
              <p className="text-xs text-white/50 mt-1">
                {brandConfig.showroom.addressLine1}, {brandConfig.showroom.city} {brandConfig.showroom.postcode}
              </p>
              <p className="text-xs text-white/50">VAT Reg: GB 982 4102 88 · {brandConfig.contact.email}</p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <span className="px-2.5 py-1 rounded bg-[#FF7A00] text-black font-mono font-bold uppercase inline-block">
                Tax Invoice / Receipt
              </span>
              <p className="font-mono text-white font-semibold pt-1">Invoice #{order.id}</p>
              <p className="text-white/50">Issued: {order.date}</p>
              <p className="text-emerald-400">Status: Paid in Full</p>
            </div>
          </div>

          {/* Delivery & Billing Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/70">
            <div>
              <strong className="text-white uppercase tracking-wider text-[10px] block mb-1">
                Deliver & Assemble At:
              </strong>
              <p className="text-white font-medium">{order.customer.fullName}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
              <p>{order.customer.city}, {order.customer.postcode}</p>
              <p className="pt-1 text-white/40">Tel: {order.customer.phone}</p>
            </div>

            <div>
              <strong className="text-white uppercase tracking-wider text-[10px] block mb-1">
                Payment & Fulfillment:
              </strong>
              <p className="text-white font-medium">{order.paymentMethod}</p>
              <p className="font-mono text-white/50">{order.paymentRef}</p>
              <p className="capitalize">Delivery Level: {order.deliveryOption} Delivery</p>
              <p className="text-emerald-400 pt-1">Includes 10-Year Structural Guarantee</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-white/50 uppercase tracking-wider text-[10px]">
                  <th className="py-3">Piece & Specification</th>
                  <th className="py-3 text-center">Qty</th>
                  <th className="py-3 text-right">Unit Price</th>
                  <th className="py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {order.items.map((item) => (
                  <tr key={item.cartItemId}>
                    <td className="py-3 pr-4">
                      <p className="font-serif text-sm font-semibold text-white">{item.product.name}</p>
                      <p className="text-[11px] text-white/50">
                        {item.finish} · {item.size}
                      </p>
                    </td>
                    <td className="py-3 text-center font-mono">{item.quantity}</td>
                    <td className="py-3 text-right font-mono">{formatPrice(item.unitPrice)}</td>
                    <td className="py-3 text-right font-mono font-medium text-white">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="border-t border-white/10 pt-4 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#FF7A00]">
                  <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <span className="font-mono font-medium">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White Glove Delivery</span>
                <span className={order.deliveryCost === 0 ? 'text-emerald-400 font-medium' : 'font-mono text-white'}>
                  {order.deliveryCost === 0 ? 'Free' : formatPrice(order.deliveryCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total Paid (GBP)</span>
                <span className="font-mono text-xl text-gradient-orange">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= REVIEW & REPEAT ORDER INCENTIVE ================= */}
        <div className="p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-6 hard-shadow no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF7A00]" />
            <h3 className="font-serif text-2xl text-white">Share Your Feedback & Save</h3>
          </div>
          <p className="text-xs text-white/60">
            Tell our master craftsmen how your new pieces look in your home. Submit your rating or snap a photo of your space to unlock an instant 5% voucher for your next order.
          </p>

          {!reviewSubmitted ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/70 font-medium block mb-1.5">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= rating ? 'fill-[#FF7A00] text-[#FF7A00]' : 'text-white/20'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#FFD3A1] ml-2 font-mono">{rating} Stars</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">Your Thoughts</label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="The craftsmanship, delivery experience, wood grain..."
                  className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none"
                />
              </div>

              {/* Photo Upload preview */}
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium block">Upload Room Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer py-2 px-4 rounded-xl border border-white/20 hover:border-[#FF7A00] bg-white/5 text-xs text-white/80 hover:text-white flex items-center gap-2 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Photo</span>
                    <input type="file" accept="image/*" onChange={handleFakePhotoUpload} className="hidden" />
                  </label>
                  {uploadedPhoto && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-400">
                      <img src={uploadedPhoto} alt="Uploaded room preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow hover:brightness-110"
              >
                Submit Review & Unlock 5% Discount
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs space-y-1">
              <p className="font-semibold text-sm">Thank you for your feedback!</p>
              <p className="text-white/70">
                Use code <strong className="font-mono text-[#FF7A00] font-bold">OAKREPEAT5</strong> at checkout for 5% off your next commission.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
