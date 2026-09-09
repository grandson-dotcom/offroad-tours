import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Car,
  Hotel,
  Compass,
  CheckCircle2,
  DollarSign,
  FileText,
  Send,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface CustomQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomQuotationModal: React.FC<CustomQuotationModalProps> = ({ isOpen, onClose }) => {
  const { createQuotation, convertQuotationToBooking } = usePackageBooking();
  const { currency, formatPrice, setTab } = useApp();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+254 ');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['Maasai Mara', 'Lake Naivasha']);
  const [durationDays, setDurationDays] = useState(5);
  const [travelDates, setTravelDates] = useState('2026-10-15 to 2026-10-20');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelStyle, setTravelStyle] = useState('Luxury Safari & Scenic Flight');
  const [transportChoice, setTransportChoice] = useState('Toyota Land Cruiser 4x4 (Private)');
  const [accommodationChoice, setAccommodationChoice] = useState('Luxury Tented Safari Camps (Full Board)');
  const [guideChoice, setGuideChoice] = useState('Specialist Naturalist Guide (Birding & Big Cats)');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Hot Air Balloon Safari & Champagne Breakfast',
    'Crescent Island Walking Safari'
  ]);
  const [notes, setNotes] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const destinationOptions = [
    'Maasai Mara',
    'Lake Naivasha',
    'Amboseli',
    'Diani Beach',
    'Samburu',
    'Lake Nakuru',
    'Mount Kenya',
    'Lamu Island',
    'Tsavo East / West'
  ];

  const activityOptions = [
    { name: 'Hot Air Balloon Safari & Champagne Breakfast', costKES: 55000 },
    { name: 'Crescent Island Walking Safari', costKES: 4500 },
    { name: 'Hell’s Gate Gorge Cycling & Geothermal Spa', costKES: 5000 },
    { name: 'Traditional Maasai Boma Cultural Immersion', costKES: 3500 },
    { name: 'Night Game Drive with Infrared Spotlights', costKES: 12000 },
    { name: 'Wasini Island Dolphin & Snorkel Dhow Cruise', costKES: 14000 }
  ];

  const toggleDestination = (dest: string) => {
    setSelectedDestinations(prev =>
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const toggleActivity = (actName: string) => {
    setSelectedActivities(prev =>
      prev.includes(actName) ? prev.filter(a => a !== actName) : [...prev, actName]
    );
  };

  // Real-time dynamic quotation pricing calculation
  const transportPerDayKES = transportChoice.includes('Land Cruiser') ? 22000 : 16000;
  const transportCostKES = transportPerDayKES * durationDays;

  const accommodationPerPersonPerNightKES = accommodationChoice.includes('Luxury') ? 35000 : 22000;
  const accommodationCostKES = accommodationPerPersonPerNightKES * (adults + children * 0.6) * Math.max(1, durationDays - 1);

  const guideCostKES = durationDays * 5000;

  const activitiesCostKES = selectedActivities.reduce((sum, act) => {
    const item = activityOptions.find(o => o.name === act);
    return sum + (item ? item.costKES * (adults + children) : 0);
  }, 0);

  const feesCostKES = durationDays * 12000 * adults;
  const discountsKES = 15000; // Courtesy travel package bundling discount

  const subtotalCustomerPriceKES = transportCostKES + accommodationCostKES + guideCostKES + activitiesCostKES + feesCostKES - discountsKES;
  const internalSupplierCostKES = Math.round(subtotalCustomerPriceKES * 0.72);
  const profitKES = subtotalCustomerPriceKES - internalSupplierCostKES;
  const subtotalUSD = Math.round(subtotalCustomerPriceKES / 130);

  const handleGenerateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      alert('Please fill in your name and email address to prepare your official quotation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const quote = createQuotation({
        customerName,
        customerEmail,
        customerPhone,
        destinations: selectedDestinations,
        durationDays,
        travelDates,
        adults,
        children,
        travelStyle,
        requestedServices: {
          transport: transportChoice,
          accommodation: accommodationChoice,
          guide: guideChoice,
          activities: selectedActivities,
          meals: 'Full Board All Lodges',
          parkFeesIncluded: true
        },
        itemizedCosts: {
          transportCostKES,
          accommodationCostKES,
          guideCostKES,
          activitiesCostKES,
          feesCostKES,
          discountsKES
        },
        totalPriceKES: subtotalCustomerPriceKES,
        totalPriceUSD: subtotalUSD,
        internalSupplierCostKES,
        profitKES,
        validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        notes
      });
      setGeneratedQuote(quote);
      setIsSubmitting(false);
    }, 400);
  };

  const handleBookNow = async () => {
    if (!generatedQuote) return;
    const booking = await convertQuotationToBooking(generatedQuote.id);
    if (booking) {
      onClose();
      setTab('dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Custom Kenya Safari & Trip Quotation
              </h3>
              <p className="text-xs text-stone-300">
                Tailor your destinations, 4x4 vehicles, luxury lodges, and guide naturalist
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {generatedQuote ? (
            /* Success Quotation Screen */
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-serif font-bold text-emerald-950">
                  Official Quotation Generated: {generatedQuote.quotationNumber}
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Valid for 14 days until {generatedQuote.validUntil}. A copy has been logged to your Business Portal.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-xs text-stone-500 block">Traveler:</span>
                    <strong className="text-sm text-stone-900">{generatedQuote.customerName}</strong> ({generatedQuote.customerEmail})
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">Travel Dates:</span>
                    <strong className="text-sm text-stone-900">{generatedQuote.travelDates} ({generatedQuote.durationDays} Days)</strong>
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">Party Size:</span>
                    <strong className="text-sm text-stone-900">{generatedQuote.adults} Adults, {generatedQuote.children} Children</strong>
                  </div>
                </div>

                {/* Destinations */}
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    Route & Destinations
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedQuote.destinations.map((d: string) => (
                      <span key={d} className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#f85a5a]" />
                        <span>{d}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Itemized Pricing Breakdown */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    Itemized Cost Breakdown
                  </span>
                  <div className="space-y-1.5 text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200">
                    <div className="flex justify-between">
                      <span>Private 4x4 Safari Transport ({generatedQuote.durationDays} Days):</span>
                      <strong className="text-stone-800">KES {generatedQuote.itemizedCosts.transportCostKES.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Full Board Luxury Lodges / Tented Camps:</span>
                      <strong className="text-stone-800">KES {generatedQuote.itemizedCosts.accommodationCostKES.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Dedicated Naturalist Safari Guide:</span>
                      <strong className="text-stone-800">KES {generatedQuote.itemizedCosts.guideCostKES.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Selected Safari Excursions & Activities:</span>
                      <strong className="text-stone-800">KES {generatedQuote.itemizedCosts.activitiesCostKES.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>KWS National Park & Reserve Conservation Fees:</span>
                      <strong className="text-stone-800">KES {generatedQuote.itemizedCosts.feesCostKES.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Package Wholesale Courtesy Discount:</span>
                      <strong>- KES {generatedQuote.itemizedCosts.discountsKES.toLocaleString()}</strong>
                    </div>
                    <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-stone-900">Total Customer Quotation:</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-stone-950 font-serif block">
                          KES {generatedQuote.totalPriceKES.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          Approx. ${generatedQuote.totalPriceUSD.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setGeneratedQuote(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50"
                >
                  ← Edit Requirements
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800"
                  >
                    Print Quotation Sheet
                  </button>

                  <button
                    onClick={handleBookNow}
                    className="px-6 py-2.5 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-1.5"
                  >
                    <span>Confirm & Convert to Live Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Builder Form */
            <form onSubmit={handleGenerateQuote} className="space-y-6">
              
              {/* Traveler Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. David & Claire Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="david@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
                  />
                </div>
              </div>

              {/* Destinations Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Kenyan Destinations to Include:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {destinationOptions.map(d => {
                    const isSelected = selectedDestinations.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => toggleDestination(d)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#f85a5a]/10 border-[#f85a5a] text-[#f85a5a]'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <span>{d}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#f85a5a]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dates, Duration, Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Duration (Days)
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800"
                  >
                    <option value={3}>3 Days / 2 Nights</option>
                    <option value={4}>4 Days / 3 Nights</option>
                    <option value={5}>5 Days / 4 Nights</option>
                    <option value={6}>6 Days / 5 Nights</option>
                    <option value={7}>7 Days / 6 Nights (Classic)</option>
                    <option value={10}>10 Days / 9 Nights (Grand Kenya)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Travel Dates
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="YYYY-MM-DD to YYYY-MM-DD"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Children
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={8}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Service Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#f85a5a]" />
                    <span>Safari Transport Preference</span>
                  </label>
                  <select
                    value={transportChoice}
                    onChange={(e) => setTransportChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800"
                  >
                    <option value="Toyota Land Cruiser 4x4 (Private)">Toyota Land Cruiser 4x4 (Private Safari Spec)</option>
                    <option value="Toyota Safari Mini-Van 4x4">Toyota Safari Mini-Van 4x4 (Budget-Friendly)</option>
                    <option value="Executive Luxury SUV + SGR First Class">Executive Luxury SUV + SGR First Class</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Hotel className="w-3.5 h-3.5 text-[#f85a5a]" />
                    <span>Lodge / Camp Standard</span>
                  </label>
                  <select
                    value={accommodationChoice}
                    onChange={(e) => setAccommodationChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800"
                  >
                    <option value="Luxury Tented Safari Camps (Full Board)">Luxury Tented Safari Camps (Sarova, Serena, Sopa)</option>
                    <option value="Signature Ultra-Luxury Lodges (Angama, Cottars, Elsa's Kopje)">Signature Ultra-Luxury Lodges (All-Inclusive)</option>
                    <option value="Comfort Mid-Tier Safari Lodges">Comfort Mid-Tier Safari Lodges</option>
                  </select>
                </div>
              </div>

              {/* Activities Checklist */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Requested Safari Activities:
                </label>
                <div className="space-y-2">
                  {activityOptions.map(act => {
                    const isChecked = selectedActivities.includes(act.name);
                    return (
                      <label
                        key={act.name}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleActivity(act.name)}
                            className="rounded text-[#f85a5a] focus:ring-[#f85a5a]"
                          />
                          <span className="font-semibold text-stone-800">{act.name}</span>
                        </div>
                        <span className="text-stone-500 font-mono text-[11px]">
                          +KES {act.costKES.toLocaleString()} / person
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Special Requests / Dietary / Special Occasion
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Celebrating 10th anniversary, vegetarian meals required, request photography window seats."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
                />
              </div>

              {/* Estimated Price & Submit */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-400 uppercase font-semibold block">Live Estimated Quotation</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-stone-900 font-serif">
                      KES {subtotalCustomerPriceKES.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500">
                      (~${subtotalUSD.toLocaleString()} USD)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isSubmitting ? 'Calculating...' : 'Generate Official Quotation'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
