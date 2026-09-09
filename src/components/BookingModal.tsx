import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  Printer,
  Share2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { bookingItem, setBookingItem, addBooking, formatPrice, currency, user } = useApp();

  const [guests, setGuests] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState<string>('0712345678');
  const [processing, setProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  if (!bookingItem) return null;

  const item = bookingItem.item;
  const isSafari = bookingItem.type === 'safari';
  const isHotel = bookingItem.type === 'hotel';

  const basePriceUSD =
    isSafari ? item.priceUSD : isHotel ? (item.customPriceUSD || item.pricePerNightUSD) : 100;
  const totalPriceUSD = basePriceUSD * (isHotel ? 2 : guests); // e.g. 2 nights for hotel, guests for safari

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      const newBooking = addBooking({
        type: bookingItem.type,
        itemId: item.id,
        itemTitle: isSafari ? item.title : item.name,
        date: startDate,
        guests,
        totalPriceUSD,
        paymentMethod: paymentMethod === 'mpesa' ? 'M-PESA' : 'Credit Card',
        details: {
          operatorOrLocation: isSafari ? item.operator : item.location,
          notes: isHotel ? `Room: ${item.selectedRoom || 'Standard'}` : undefined
        }
      });

      setProcessing(false);
      setConfirmedBooking(newBooking);
    }, 1800);
  };

  const handleClose = () => {
    setBookingItem(null);
    setConfirmedBooking(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-stone-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
              {confirmedBooking ? 'Booking Confirmed' : 'Instant Secure Checkout'}
            </span>
            <h3 className="font-serif font-bold text-lg text-white mt-0.5">
              {isSafari ? item.title : item.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Boarding Pass / Voucher View */
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-serif font-bold text-2xl text-stone-900">
                Karibu! Your Booking is Confirmed
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                A confirmation voucher and receipt has been sent to <strong>{user.email}</strong>.
              </p>
            </div>

            {/* Digital Boarding Pass Ticket */}
            <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-5 text-left text-xs space-y-3 relative">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Booking Reference</span>
                  <span className="font-mono font-black text-amber-700 text-base">{confirmedBooking.referenceCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Payment Status</span>
                  <span className="text-emerald-700 font-bold">PAID ({confirmedBooking.paymentMethod})</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[10px]">Service:</span>
                  <strong>{confirmedBooking.itemTitle}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Date:</span>
                  <strong>{confirmedBooking.date}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Travelers:</span>
                  <strong>{confirmedBooking.guests} Person(s)</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Total Paid:</span>
                  <strong>{formatPrice(confirmedBooking.totalPriceUSD)}</strong>
                </div>
              </div>

              {/* QR Code Placeholder for Boarding Pass */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[10px] text-stone-500">Scan at departure gate or hotel reception</span>
                <div className="w-12 h-12 bg-stone-900 text-white flex items-center justify-center text-[9px] font-mono rounded">
                  [QR PASS]
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 rounded-xl shadow cursor-pointer"
              >
                Done / View My Trips
              </button>
            </div>
          </div>
        ) : (
          /* Booking & Payment Form */
          <form onSubmit={handleConfirmPayment} className="p-6 space-y-5 text-xs">
            {/* Travel Details Selection */}
            <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
              <div>
                <label className="block text-stone-600 font-bold text-[10px] uppercase mb-1">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2 font-semibold text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-600 font-bold text-[10px] uppercase mb-1">
                  {isHotel ? 'Room Count / Nights' : 'Number of Guests'}:
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2 font-semibold text-stone-900"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Person' : 'Persons'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="block text-stone-700 font-bold text-[11px] uppercase tracking-wider mb-2">
                Select Payment Method:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'mpesa'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs">M-PESA Kenya</span>
                    <span className="block text-[10px] text-stone-500">STK Push prompt</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs">Card / Visa / MC</span>
                    <span className="block text-[10px] text-stone-500">International checkout</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Specific Payment Input Fields */}
            {paymentMethod === 'mpesa' ? (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-950 font-bold mb-1">
                  <span>M-PESA Express STK Push</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Till No: 889211
                  </span>
                </div>
                <label className="block text-stone-600 text-[10px] uppercase font-bold">
                  Safaricom / Airtel Phone Number:
                </label>
                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="07XX XXX XXX or 2547XXXXXXXX"
                  className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 font-mono text-sm text-stone-900 font-bold"
                  required
                />
                <p className="text-[10px] text-emerald-800">
                  You will receive a prompt on your phone to enter your M-PESA PIN.
                </p>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3">
                <div>
                  <label className="block text-stone-600 text-[10px] uppercase font-bold mb-1">
                    Cardholder Name:
                  </label>
                  <input
                    type="text"
                    defaultValue="Tourist Explorer"
                    className="w-full bg-white border border-stone-300 rounded-xl p-2 font-semibold text-stone-900"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-stone-600 text-[10px] uppercase font-bold mb-1">
                      Card Number:
                    </label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full bg-white border border-stone-300 rounded-xl p-2 font-mono text-stone-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 text-[10px] uppercase font-bold mb-1">
                      CVV:
                    </label>
                    <input
                      type="password"
                      defaultValue="•••"
                      maxLength={4}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2 font-mono text-stone-900"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Price Total Summary Bar */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Total Amount Due</span>
                <span className="font-serif font-bold text-xl text-stone-900">
                  {formatPrice(totalPriceUSD)}
                </span>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="bg-amber-600 hover:bg-amber-500 disabled:bg-stone-400 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{processing ? 'Processing Payment...' : 'Pay & Confirm Booking'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
