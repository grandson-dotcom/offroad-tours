import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAFARIS } from '../data/kenyaData';
import { SafariTour } from '../types';
import {
  Clock,
  Users,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  ArrowUpDown,
  Filter,
  Calendar,
  Layers,
  PhoneCall
} from 'lucide-react';

export const SafariMarketplace: React.FC = () => {
  const {
    formatPrice,
    setBookingItem,
    setActiveSafariModal,
    activeSafariModal
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [maxPriceUSD, setMaxPriceUSD] = useState<number>(1000);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Safaris' },
    { id: 'Big 5 Safari', label: '🦁 Big 5 Safaris' },
    { id: 'Marine', label: '🐬 Marine & Dhows' },
    { id: 'Day Trip', label: '🚴 Adventure & Day Trips' },
    { id: 'Luxury Lodge', label: '🏔️ Mountain Treks & Lodges' }
  ];

  const filteredSafaris = SAFARIS.filter((s) => {
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    const matchesPrice = s.priceUSD <= maxPriceUSD;
    return matchesCategory && matchesPrice;
  });

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 safaris at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const comparedTours = SAFARIS.filter((s) => compareList.includes(s.id));

  return (
    <section id="safaris-section" className="py-16 bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Verified Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              Find Your Perfect Safari
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Curated, government-licensed tour operators with guaranteed departures in 4x4 pop-up roof Land Cruisers and professional KWS guides.
            </p>
          </div>

          {/* Comparison Bar Indicator */}
          {compareList.length > 0 && (
            <div className="mt-4 md:mt-0 flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-amber-900">
                {compareList.length} Selected for Comparison
              </span>
              <button
                id="btn-open-safari-comparison"
                onClick={() => setShowComparisonModal(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow cursor-pointer"
              >
                Compare Now
              </button>
              <button
                onClick={() => setCompareList([])}
                className="text-stone-400 hover:text-stone-700 text-xs"
                title="Clear comparison"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-stone-50 p-4 rounded-2xl border border-stone-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === c.id
                    ? 'bg-stone-900 text-white shadow'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Price Slider */}
          <div className="flex items-center gap-3 text-xs w-full sm:w-auto">
            <span className="text-stone-500 font-medium whitespace-nowrap">Max Price:</span>
            <input
              type="range"
              min="80"
              max="1000"
              step="20"
              value={maxPriceUSD}
              onChange={(e) => setMaxPriceUSD(Number(e.target.value))}
              aria-label="Filter safari maximum price"
              className="w-32 accent-amber-600"
            />
            <span className="font-bold text-stone-900 whitespace-nowrap">
              {formatPrice(maxPriceUSD)}
            </span>
          </div>
        </div>

        {/* Safari Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSafaris.map((safari) => (
            <div
              key={safari.id}
              id={`safari-card-${safari.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Operator Verification Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-700/60 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Operator</span>
                  </span>
                </div>

                {/* Compare Checkbox */}
                <button
                  id={`btn-compare-${safari.id}`}
                  onClick={() => toggleCompare(safari.id)}
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border transition-all ${
                    compareList.includes(safari.id)
                      ? 'bg-amber-500 text-stone-950 border-amber-400'
                      : 'bg-stone-900/70 text-stone-200 border-stone-700 hover:bg-stone-900'
                  }`}
                >
                  {compareList.includes(safari.id) ? '✓ Compared' : '+ Compare'}
                </button>

                {/* Bottom Overlay Title & Duration */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{safari.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{safari.rating} ({safari.reviewsCount})</span>
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-white line-clamp-1 drop-shadow">
                    {safari.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-medium truncate">{safari.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                    <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{safari.groupSize}</span>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1 text-xs text-stone-600">
                    {safari.inclusions.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Starting from</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif font-bold text-lg text-stone-900">
                        {formatPrice(safari.priceUSD)}
                      </span>
                      {safari.originalPriceUSD && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(safari.originalPriceUSD)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-view-safari-${safari.id}`}
                      onClick={() => setActiveSafariModal(safari)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      id={`btn-book-safari-${safari.id}`}
                      onClick={() => {
                        setBookingItem({ type: 'safari', item: safari });
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow cursor-pointer transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safari Details Modal */}
      {activeSafariModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-stone-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Header Image */}
            <div className="relative aspect-[16/9] bg-stone-900">
              <img
                src={activeSafariModal.image}
                alt={activeSafariModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

              <button
                onClick={() => setActiveSafariModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md">
                    {activeSafariModal.duration}
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    Operator: {activeSafariModal.operator}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {activeSafariModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Body: Itinerary & Details */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Day-by-Day Itinerary */}
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Day-by-Day Safari Itinerary</span>
                </h4>
                <div className="space-y-3">
                  {activeSafariModal.itinerary.map((step) => (
                    <div key={step.day} className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                      <div className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1">
                        <span className="text-amber-700">Day {step.day}: {step.title}</span>
                        <span className="text-stone-500 font-normal text-[11px]">🏨 {step.accommodation}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                  <h5 className="font-bold text-emerald-900 mb-2">What is Included:</h5>
                  <div className="space-y-1 text-emerald-800">
                    {activeSafariModal.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200">
                  <h5 className="font-bold text-rose-900 mb-2">What is Excluded:</h5>
                  <div className="space-y-1 text-rose-800">
                    {activeSafariModal.exclusions.map((exc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Free Cancellation Banner */}
              <div className="bg-stone-100 p-3 rounded-xl text-xs text-stone-700 flex items-center justify-between">
                <span>🛡️ <strong>Cancellation Policy:</strong> {activeSafariModal.cancellationPolicy}</span>
                <span className="text-stone-500 text-[11px]">Direct Support: {activeSafariModal.operatorPhone}</span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Total Price per Person</span>
                <span className="text-xl font-serif font-bold text-stone-900">
                  {formatPrice(activeSafariModal.priceUSD)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const item = activeSafariModal;
                    setActiveSafariModal(null);
                    setBookingItem({ type: 'safari', item });
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg cursor-pointer transition-colors"
                >
                  Proceed to Instant Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-stone-900 rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Side-by-Side Safari Comparison
              </h3>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {comparedTours.map((tour) => (
                <div key={tour.id} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <img src={tour.image} alt={tour.title} className="w-full h-28 object-cover rounded-xl mb-2" />
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{tour.title}</h4>
                    <p className="text-[11px] text-amber-700 font-semibold">{tour.duration} • {tour.location}</p>
                    <p className="text-stone-600 mt-2 font-medium">Group: {tour.groupSize}</p>
                    <div className="mt-2 text-base font-bold text-stone-900">
                      {formatPrice(tour.priceUSD)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowComparisonModal(false);
                      setBookingItem({ type: 'safari', item: tour });
                    }}
                    className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl"
                  >
                    Select This Tour
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
