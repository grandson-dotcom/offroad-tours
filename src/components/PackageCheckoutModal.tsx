import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building2,
  ArrowRight,
  AlertCircle,
  Copy,
  Check,
  Download,
  Calendar,
  Users,
  Car,
  Hotel,
  Compass,
  Phone,
  Mail,
  User,
  Globe,
  Loader2,
  Sparkles
} from 'lucide-react';

export const PackageCheckoutModal: React.FC = () => {
  const {
    activePackage: pkg,
    customization,
    calculatedPrice,
    isCheckoutOpen,
    closeCheckout,
    createBooking
  } = usePackageBooking();

  const { currency, setTab } = useApp();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [country, setCountry] = useState('Kenya');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa');

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('412');
  const [cardName, setCardName] = useState('');

  // M-PESA STK Push Simulation State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  const [mpesaPin, setMpesaPin] = useState('');
  const [stkStatus, setStkStatus] = useState<'idle' | 'prompting' | 'verifying' | 'success'>('idle');

  // Success State
  const [bookingSuccessReference, setBookingSuccessReference] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen || !pkg || !customization || !calculatedPrice) return null;

  const totalKES = calculatedPrice?.totalCustomerPriceKES || calculatedPrice?.finalPriceKES || 0;
  const totalUSD = calculatedPrice?.totalCustomerPriceUSD || Math.round((totalKES || 0) / 130);

  // Handle M-PESA STK Push flow
  const handleInitiateMpesa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }
    setErrorMessage('');
    setIsProcessingPayment(true);
    setStkStatus('prompting');

    // Simulate STK push trigger to phone
    setTimeout(() => {
      setShowMpesaPrompt(true);
      setStkStatus('prompting');
      setIsProcessingPayment(false);
    }, 1200);
  };

  // Confirm M-PESA PIN in the simulated smartphone prompt
  const handleConfirmMpesaPin = () => {
    if (!mpesaPin || mpesaPin.length < 4) {
      alert('Please enter a 4-digit M-PESA PIN');
      return;
    }
    setStkStatus('verifying');

    setTimeout(() => {
      setStkStatus('success');
      const fakeReceipt = 'QHJ' + Math.floor(1000000 + Math.random() * 9000000) + 'L';

      const booking = createBooking({
        fullName,
        email,
        phoneNumber,
        country
      }, 'mpesa', fakeReceipt);

      setTimeout(() => {
        setShowMpesaPrompt(false);
        setBookingSuccessReference(booking.referenceCode);
      }, 1000);
    }, 1800);
  };

  // Handle Card Payment flow
  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim()) {
      setErrorMessage('Please fill in your contact information.');
      return;
    }
    setErrorMessage('');
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const fakeCardAuth = 'AUTH-' + Math.floor(100000 + Math.random() * 900000);
      const booking = createBooking({
        fullName,
        email,
        phoneNumber,
        country
      }, 'card', fakeCardAuth);

      setBookingSuccessReference(booking.referenceCode);
    }, 2000);
  };

  const copyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div
        id="modal-package-checkout-container"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#f85a5a]">
              Secure Booking & Payment Portal
            </span>
            <h2 className="text-base sm:text-lg font-serif font-bold text-white">
              {bookingSuccessReference ? 'Booking Confirmed!' : `Checkout: ${pkg.name}`}
            </h2>
          </div>

          <button
            id="btn-close-package-checkout"
            onClick={closeCheckout}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* SUCCESS SCREEN */}
          {bookingSuccessReference ? (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 inline-block mb-2">
                  Payment Verified & Itinerary Reserved
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Safari Booking Confirmed!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Congratulations <strong>{fullName}</strong>! Your customized trip to <strong>{pkg.destination}</strong> is fully confirmed. We have emailed your travel voucher and emergency contacts to <strong>{email}</strong>.
                </p>
              </div>

              {/* Reference Code Box */}
              <div className="max-w-md mx-auto p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Your Booking Reference Code
                </span>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-mono font-bold text-base sm:text-lg text-stone-900">
                    {bookingSuccessReference}
                  </span>
                  <button
                    onClick={() => copyReference(bookingSuccessReference)}
                    className="flex items-center gap-1 text-xs text-[#f85a5a] font-bold hover:underline"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Keep this code for airport pickup identification and WhatsApp concierge assistance.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  id="btn-view-customer-dashboard"
                  onClick={() => {
                    closeCheckout();
                    setTab('dashboard');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Trip in Customer Dashboard</span>
                </button>

                <button
                  onClick={closeCheckout}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <div className="space-y-6">
              
              {/* Order Mini-Recap */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#f85a5a]">Package:</span>
                  <div className="font-bold text-stone-900 text-sm">{pkg.name} ({pkg.durationDays}D/{pkg.durationNights}N)</div>
                  <div className="text-stone-500 mt-0.5">
                    Dates: {customization.arrivalDate} to {customization.departureDate} • {customization.adults} Adults
                  </div>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Total Due Now:</span>
                  <div className="text-xl font-serif font-bold text-stone-900">
                    KES {totalKES.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500">≈ ${totalUSD.toLocaleString()} USD</div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Customer Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#f85a5a]" />
                  <span>Lead Traveller Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wanjiku Kimani / John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:ring-2 focus:ring-[#f85a5a]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Email Address * (For E-Voucher)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. traveler@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:ring-2 focus:ring-[#f85a5a]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Phone Number * (WhatsApp / STK Push)</label>
                    <input
                      type="tel"
                      required
                      placeholder="0712345678 or +254712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:ring-2 focus:ring-[#f85a5a]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Country of Residence *</label>
                    <input
                      type="text"
                      required
                      placeholder="Kenya / United States / United Kingdom"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:bg-white focus:ring-2 focus:ring-[#f85a5a]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method Choice */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#f85a5a]" />
                  <span>Select Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      M
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">M-PESA</div>
                      <div className="text-[10px] text-stone-500">Safaricom STK Push</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#f85a5a] bg-rose-50/40 ring-2 ring-[#f85a5a]/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">Card (Visa/MC)</div>
                      <div className="text-[10px] text-stone-500">Instant 3D Secure</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">Bank Wire / EFT</div>
                      <div className="text-[10px] text-stone-500">KCB / Equity Bank</div>
                    </div>
                  </button>
                </div>

                {/* Sub-form for M-PESA */}
                {paymentMethod === 'mpesa' && (
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-3">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-emerald-900">
                        Safaricom M-PESA Express Checkout
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      A prompt will be sent directly to your phone. Enter your M-PESA PIN on your device to approve <strong>KES {totalKES.toLocaleString()}</strong> to Paybill <strong>892010</strong>.
                    </p>

                    <div>
                      <label className="text-[11px] font-bold text-stone-700 block mb-1">
                        Safaricom Phone Number for STK Prompt
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0712345678"
                        className="w-full max-w-sm px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleInitiateMpesa}
                      disabled={isProcessingPayment}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Connecting to Safaricom Daraja API...</span>
                        </>
                      ) : (
                        <>
                          <span>Send M-PESA Prompt (KES {totalKES.toLocaleString()})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Sub-form for Credit Cards */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleCardPayment} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <span className="text-xs font-bold text-stone-800">
                        Credit / Debit Card Checkout (Stripe & 3D Secure)
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-stone-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-stone-700 block mb-1">Expiry Date (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-stone-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-stone-700 block mb-1">CVV Security Code</label>
                          <input
                            type="text"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-mono text-stone-900"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-3 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying with 3D Secure...</span>
                        </>
                      ) : (
                        <span>Pay KES {totalKES.toLocaleString()} / ${totalUSD} USD</span>
                      )}
                    </button>
                  </form>
                )}

                {/* Sub-form for Bank Wire */}
                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200 space-y-2 text-xs text-stone-700">
                    <h4 className="font-bold text-indigo-950">Bank Transfer / EFT Details:</h4>
                    <p><strong>Bank:</strong> KCB Bank Kenya (Riverside Branch, Nairobi)</p>
                    <p><strong>Account Name:</strong> ExploreKenya Travel Limited</p>
                    <p><strong>Account Number:</strong> 1289038291</p>
                    <p><strong>SWIFT Code:</strong> KCBLKENX</p>
                    <button
                      type="button"
                      onClick={() => {
                        const booking = createBooking({
                          fullName: fullName || 'Guest Traveler',
                          email: email || 'guest@example.com',
                          phoneNumber: phoneNumber || '+254700000000',
                          country: country || 'Kenya'
                        }, 'bank', 'WIRE-PENDING');
                        setBookingSuccessReference(booking.referenceCode);
                      }}
                      className="mt-3 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                      Generate Wire Voucher & Reserve Dates
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* INTERACTIVE SIMULATED SMARTPHONE M-PESA STK DIALOG */}
        {showMpesaPrompt && (
          <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-xs bg-stone-900 text-white rounded-3xl p-5 shadow-2xl border border-stone-700 text-center space-y-4 animate-scaleUp">
              
              {/* Phone speaker & camera notch */}
              <div className="w-16 h-1.5 bg-stone-700 rounded-full mx-auto" />

              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto text-xl font-bold shadow-md">
                M
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Safaricom M-PESA</h4>
                <p className="text-[11px] text-stone-300 mt-1">
                  Paybill: <strong>892010</strong> (ExploreKenya)
                </p>
                <p className="text-base font-bold text-emerald-400 mt-0.5 font-mono">
                  KES {totalKES.toLocaleString()}
                </p>
              </div>

              {stkStatus === 'verifying' ? (
                <div className="py-4 space-y-2">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-xs text-stone-300">Validating M-PESA PIN & reserving booking...</p>
                </div>
              ) : stkStatus === 'success' ? (
                <div className="py-4 space-y-2 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <p className="text-xs font-bold">M-PESA Payment Approved!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-stone-300">
                    Enter M-PESA PIN on your mobile screen:
                  </p>
                  <input
                    type="password"
                    maxLength={4}
                    autoFocus
                    placeholder="••••"
                    value={mpesaPin}
                    onChange={(e) => setMpesaPin(e.target.value)}
                    className="w-32 mx-auto text-center py-2 bg-stone-800 border border-stone-600 rounded-xl text-lg tracking-widest font-mono text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowMpesaPrompt(false)}
                      className="flex-1 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmMpesaPin}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md"
                    >
                      Send PIN
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
