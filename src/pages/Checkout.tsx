import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Lock, Check, ArrowRight, UserCheck, MapPin, Truck, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatPrice } from '../utils/formatPrice';
import { Breadcrumb } from '../components/Breadcrumb';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    deliveryOption,
    setDeliveryOption,
    couponCode,
    discountAmount,
    getCartSubtotal,
    getDeliveryCost,
    getCartTotal,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [accountType, setAccountType] = useState<'guest' | 'login'>('guest');
  const [email, setEmail] = useState('lady.spencer@kensington.co.uk');
  const [fullName, setFullName] = useState('Lady Victoria Spencer');
  const [phone, setPhone] = useState('07700 900123');
  const [addressLine1, setAddressLine1] = useState('42 Palace Gardens Terrace');
  const [addressLine2, setAddressLine2] = useState('Apt 4B');
  const [city, setCity] = useState('London');
  const [postcode, setPostcode] = useState('W8 4RP');
  const [paymentMethod, setPaymentMethod] = useState<string>('Visa / Mastercard');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = getCartSubtotal();
  const deliveryCost = getDeliveryCost();
  const total = getCartTotal();

  // Validate UK Postcode & Address fields
  const validateAddress = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Valid UK phone number is required';
    if (!addressLine1.trim()) errs.addressLine1 = 'Address line 1 is required';
    if (!city.trim()) errs.city = 'Town/City is required';

    // UK postcode regex
    const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2})$/i;
    if (!postcode.trim() || !ukPostcodeRegex.test(postcode.trim())) {
      errs.postcode = 'Please enter a valid UK postcode (e.g. SW11 4EZ or W8 4RP)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!email.trim() || !email.includes('@')) {
        setErrors({ email: 'Please enter a valid email address' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (validateAddress()) {
        setStep(3);
      }
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // Proceed to mock gateway
      navigate('/checkout/payment', {
        state: {
          customer: {
            fullName,
            email,
            phone,
            addressLine1,
            addressLine2,
            city,
            postcode: postcode.toUpperCase(),
          },
          paymentMethod,
          deliveryOption,
          deliveryCost,
          subtotal,
          discountAmount,
          couponCode,
          total,
        },
      });
    }
  };

  const stepsList = [
    { num: 1, label: 'Account', icon: UserCheck },
    { num: 2, label: 'Address', icon: MapPin },
    { num: 3, label: 'Delivery', icon: Truck },
    { num: 4, label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-24">
      <Breadcrumb
        items={[
          { label: 'Bag', href: '/cart' },
          { label: 'Secure Checkout' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Animated Stepper */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-signature -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {stepsList.map((s) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              const Icon = s.icon;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPassed
                        ? 'bg-emerald-500 text-black'
                        : isCurrent
                        ? 'bg-gradient-signature text-black ring-4 ring-[#FF7A00]/30 shadow-lg'
                        : 'bg-[#1A1A1A] text-white/50 border border-white/20'
                    }`}
                  >
                    {isPassed ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 uppercase tracking-wider ${
                    isCurrent ? 'text-[#FF7A00]' : 'text-white/50'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Step Form Area */}
          <div className="lg:col-span-8 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 hard-shadow">
            {/* Step 1: Account */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-white">Step 1: Account & Contact</h2>
                  <p className="text-xs text-white/50 mt-1">
                    We will send delivery tracking and 3D Secure verification to this email.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('guest')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      accountType === 'guest'
                        ? 'bg-[#1C1814] border-[#FF7A00] ring-1 ring-[#FF7A00]'
                        : 'bg-[#161616] border-white/10 text-white/70'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">Continue as Guest</span>
                    <span className="text-[11px] text-white/50">Fast, instant checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('login')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      accountType === 'login'
                        ? 'bg-[#1C1814] border-[#FF7A00] ring-1 ring-[#FF7A00]'
                        : 'bg-[#161616] border-white/10 text-white/70'
                    }`}
                  >
                    <span className="text-xs font-bold text-white block">Sign In to Atelier</span>
                    <span className="text-[11px] text-white/50">Access saved delivery notes</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-white/70 font-medium">Email Address for Order Updates *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@london.co.uk"
                    className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                </div>
              </div>
            )}

            {/* Step 2: UK Delivery Address */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-white">Step 2: UK Delivery Address</h2>
                  <p className="text-xs text-white/50 mt-1">
                    Please provide your residential address for 2-man white glove placement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-white/70 font-medium">Recipient Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    {errors.fullName && <p className="text-xs text-rose-400">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-white/70 font-medium">UK Mobile Phone Number (for delivery SMS) *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07700 900123"
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    {errors.phone && <p className="text-xs text-rose-400">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-white/70 font-medium">Address Line 1 *</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. 42 Palace Gardens Terrace"
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    {errors.addressLine1 && <p className="text-xs text-rose-400">{errors.addressLine1}</p>}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-white/70 font-medium">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="e.g. Apt 4B / Penthouse / Mews House"
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">Town / City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. London"
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                    {errors.city && <p className="text-xs text-rose-400">{errors.city}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-white/70 font-medium">UK Postcode *</label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="e.g. W8 4RP"
                      className="w-full bg-[#181818] border border-white/20 focus:border-[#FF7A00] rounded-xl px-4 py-3 text-sm text-white uppercase tracking-wider focus:outline-none"
                    />
                    {errors.postcode && <p className="text-xs text-rose-400">{errors.postcode}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Delivery Options */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-white">Step 3: Delivery Option</h2>
                  <p className="text-xs text-white/50 mt-1">
                    Select how you would like your handcrafted furniture delivered and assembled.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'london',
                      title: 'Complimentary Greater London Delivery',
                      cost: 'Free',
                      desc: '2-Man delivery crew inside M25. Room of choice delivery.',
                    },
                    {
                      id: 'assembly',
                      title: 'White-Glove Assembly & Packaging Removal',
                      cost: '£95',
                      desc: 'Full assembly by master joiners, leveling, and removal of all protective blankets.',
                    },
                    {
                      id: 'standard',
                      title: 'UK Mainland Standard Courier',
                      cost: '£45',
                      desc: 'Ground floor doorstep courier delivery across England, Scotland & Wales.',
                    },
                    {
                      id: 'pickup',
                      title: 'Showroom Collection (Battersea Flagship)',
                      cost: 'Free',
                      desc: 'Collect directly from our London workshop atelier at your convenience.',
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDeliveryOption(opt.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        deliveryOption === opt.id
                          ? 'bg-[#1C1814] border-[#FF7A00] ring-1 ring-[#FF7A00]'
                          : 'bg-[#161616] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-sm text-white block">{opt.title}</span>
                        <span className="text-xs text-white/50">{opt.desc}</span>
                      </div>
                      <span className={`font-mono text-sm font-bold ${
                        opt.cost === 'Free' ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {opt.cost}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Payment Method Selection */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-white">Step 4: Select Payment Method</h2>
                  <p className="text-xs text-white/50 mt-1">
                    All transactions encrypted with 256-bit bank-grade SSL and 3D Secure verification.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'Visa / Mastercard',
                      name: 'Credit or Debit Card (Visa / Mastercard)',
                      badge: '3D Secure 2.0',
                      desc: 'Pay securely using UK or International cards via Stripe gateway',
                    },
                    {
                      id: 'Apple Pay / Google Pay',
                      name: 'Apple Pay / Google Pay',
                      badge: 'Instant 1-Touch',
                      desc: 'Quick, authenticated biometric authorization',
                    },
                    {
                      id: 'Klarna',
                      name: 'Klarna — Pay in 3 Interest-Free Instalments',
                      badge: '0% APR',
                      desc: `3 payments of ${formatPrice(Math.ceil(total / 3))}. No added fees.`,
                    },
                    {
                      id: 'PayPal',
                      name: 'PayPal Express Checkout',
                      badge: 'Buyer Protection',
                      desc: 'Pay using your PayPal balance or linked bank accounts',
                    },
                    {
                      id: 'Cash on Delivery',
                      name: 'Cash on Delivery (White Glove Handover)',
                      badge: 'Pay Upon Inspection',
                      desc: 'Inspect each piece in your residence before transferring funds to the delivery lead',
                    },
                    {
                      id: 'Bank Transfer',
                      name: 'Direct BACS Bank Transfer',
                      badge: 'London Atelier Account',
                      desc: 'Invoice sent immediately with Sort Code & Account Number for wire transfer',
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                        paymentMethod === method.id
                          ? 'bg-[#1C1814] border-[#FF7A00] ring-1 ring-[#FF7A00]'
                          : 'bg-[#161616] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{method.name}</span>
                          <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-white/10 text-[#FFD3A1]">
                            {method.badge}
                          </span>
                        </div>
                        <span className="text-xs text-white/50 block">{method.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step Controls */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-4 rounded-xl bg-gradient-signature text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all hard-shadow shadow-xl"
              >
                <span>{step === 4 ? 'Continue to Secure Gateway' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-[#111111] border border-white/15 space-y-4 hard-shadow">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="font-serif text-lg text-white">Order Summary</h3>
                <span className="text-xs text-white/50 font-mono">{cart.length} items</span>
              </div>

              {/* Items Thumbnail preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-white/5">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-2.5 first:pt-0 flex gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{item.product.name}</p>
                      <p className="text-white/40 text-[11px] truncate">
                        Qty: {item.quantity} · {item.finish}
                      </p>
                    </div>
                    <span className="font-mono text-white tabular-nums shrink-0">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Line items */}
              <div className="space-y-2 text-xs text-white/70 pt-3 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FF7A00]">
                    <span>Promotional Discount</span>
                    <span className="font-mono font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({deliveryOption})</span>
                  <span className={deliveryCost === 0 ? 'text-emerald-400 font-medium' : 'font-mono text-white'}>
                    {deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-gradient-orange">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-white/5 rounded-xl text-[11px] text-white/50">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>3D Secure 2.0 encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
