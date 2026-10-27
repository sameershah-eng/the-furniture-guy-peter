import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Lock, ShieldCheck, AlertCircle, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';

export const PaymentGateway: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placeOrder } = useStore();

  const orderData = location.state as {
    customer: any;
    paymentMethod: string;
    deliveryOption: any;
    deliveryCost: number;
    subtotal: number;
    discountAmount: number;
    couponCode?: string;
    total: number;
  } | undefined;

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('884');
  const [stage, setStage] = useState<'card_input' | 'otp_modal' | 'failed'>('card_input');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!orderData) {
    return <Navigate to="/cart" replace />;
  }

  const { customer, paymentMethod, deliveryOption, deliveryCost, subtotal, discountAmount, couponCode, total } = orderData;

  const handleStartAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStage('otp_modal');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');

    if (otpCode.length < 4) {
      setOtpError('Please enter a 4-digit verification code.');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);

      // Simulation rule: "0000" fails; any other 4 digits succeeds!
      if (otpCode === '0000') {
        setStage('failed');
      } else {
        // Successful payment: place order in store
        const { cart } = useStore.getState();
        const orderId = placeOrder({
          customer,
          items: cart,
          subtotal,
          deliveryOption,
          deliveryCost,
          discount: discountAmount,
          couponCode,
          total,
          paymentMethod,
          paymentRef: `3DS_STRIPE_AUTH_${Math.floor(100000 + Math.random() * 900000)}`,
        });

        navigate(`/order/${orderId}`);
      }
    }, 1200);
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-28 pb-24 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full bg-[#111111] border-2 border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl hard-shadow relative">
        {/* Gateway Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">3D Secure 2.0 Gateway</span>
              <span className="text-[10px] text-white/40">Verified by Visa & Mastercard Identity Check</span>
            </div>
          </div>
          <span className="font-serif italic text-lg text-[#FF7A00]">TFG</span>
        </div>

        {/* Order amount pill */}
        <div className="p-4 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/50 block">Authorizing Charge</span>
            <span className="text-xs text-white/80">{customer.fullName}</span>
          </div>
          <span className="font-mono text-2xl font-bold text-gradient-orange tabular-nums">
            {formatPrice(total)}
          </span>
        </div>

        {/* STAGE 1: CARD OR PAYMENT DETAILS */}
        {stage === 'card_input' && (
          <form onSubmit={handleStartAuthentication} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-white/70 font-medium">Selected Payment Flow</label>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-semibold text-[#FFD3A1]">
                {paymentMethod}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/70 font-medium">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">Expires</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/70 font-medium">CVC / CVV</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl mt-4"
            >
              {processing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Connecting to Bank...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize {formatPrice(total)}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STAGE 2: 3D SECURE OTP CODE MODAL */}
        {stage === 'otp_modal' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center border border-[#FF7A00]/30 mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white">Bank Security Verification</h3>
              <p className="text-xs text-white/60">
                A 4-digit code was sent to <strong className="text-white">{customer.phone}</strong>.
              </p>
              <p className="text-[11px] text-white/40 italic">
                (Tip: Enter any 4-digit code to succeed; enter <strong className="text-[#FF7A00]">0000</strong> to test simulation failure)
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="text"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#181818] border-2 border-white/30 focus:border-[#FF7A00] rounded-2xl py-4 text-center font-mono text-3xl tracking-[0.5em] text-white focus:outline-none"
              />
              {otpError && <p className="text-xs text-rose-400 text-center">{otpError}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 px-6 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl mt-4"
            >
              {processing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Verifying with Issuer...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Payment</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STAGE 3: PAYMENT FAILED SIMULATION */}
        {stage === 'failed' && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl text-white">Payment Authorization Declined</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Your banking institution declined the transaction with code <code className="text-rose-400">0000_DECLINED</code>. No funds were debited from your account.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setStage('otp_modal');
                  setOtpCode('');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-wider hard-shadow"
              >
                Retry Verification Code
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 px-4 rounded-xl border border-white/20 hover:border-white text-xs font-semibold uppercase tracking-wider text-white"
              >
                Change Payment Method
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 text-center text-[10px] text-white/40">
          Encrypted with 256-Bit TLS · London Atelier Direct Gateway
        </div>
      </div>
    </div>
  );
};
