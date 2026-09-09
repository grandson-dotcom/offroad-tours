import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Check,
  CheckCircle2,
  Calendar,
  Users,
  Car,
  Hotel,
  Compass,
  ArrowRight,
  Info,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  AlertCircle
} from 'lucide-react';

export const PackageDetailsModal: React.FC = () => {
  const {
    selectedPackageForModal: pkg,
    isDetailsModalOpen,
    closePackageDetails,
    startCustomization,
    reviews
  } = usePackageBooking();

  const { currency, formatPrice } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'options' | 'included' | 'reviews'>('itinerary');

  if (!isDetailsModalOpen || !pkg) return null;

  const packageReviews = reviews.filter(r => r.packageId === pkg.id);
  const gallery = pkg.galleryImages && pkg.galleryImages.length > 0 ? pkg.galleryImages : [pkg.featuredImage];

  const displayPrice = () => {
    if (currency === 'KES') {
      return `KES ${(pkg.basePriceKES || 0).toLocaleString()}`;
    }
    return `$${(pkg.basePriceUSD || Math.round((pkg.basePriceKES || 0) / 130)).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        id="modal-package-details-container"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Close Button */}
        <button
          id="btn-close-package-details"
          onClick={closePackageDetails}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
          
          {/* Header Image Gallery Section */}
          <div className="relative bg-stone-900">
            <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full max-h-[380px] overflow-hidden">
              <img
                src={gallery[activeImageIndex] || pkg.featuredImage}
                alt={pkg.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-black/20" />
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-4 sm:left-8 flex items-center gap-2 z-10 overflow-x-auto max-w-[80%] pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx ? 'border-[#f85a5a] scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Hero Metadata */}
            <div className="absolute top-4 left-4 sm:left-8 flex flex-wrap gap-2 z-10">
              {pkg.badge && (
                <span className="px-3 py-1 rounded-full bg-[#f85a5a] text-white text-xs font-bold shadow-md">
                  {pkg.badge}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                {pkg.category}
              </span>
            </div>

            {/* Title & Location Banner */}
            <div className="p-6 sm:p-8 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4 text-[#f85a5a]" />
                  <span>{pkg.destination}, {pkg.region}</span>
                  <span>•</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {pkg.name}
                </h1>
                <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                  {pkg.tagline}
                </p>
              </div>

              {/* Price & CTA in Header */}
              <div className="sm:text-right flex-shrink-0 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] uppercase text-stone-300 font-semibold block">All-inclusive from</span>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  {displayPrice()}
                </div>
                <span className="text-[11px] text-stone-300">per person • fully customizable</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="sticky top-0 z-10 bg-white border-b border-stone-200 px-6 sm:px-8 flex items-center gap-6 overflow-x-auto text-xs font-bold tracking-wide text-stone-600 no-scrollbar">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'itinerary' ? 'border-[#f85a5a] text-[#f85a5a]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Full Day-by-Day Itinerary</span>
            </button>
            <button
              onClick={() => setActiveTab('options')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'options' ? 'border-[#f85a5a] text-[#f85a5a]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Vehicles & Lodges</span>
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'included' ? 'border-[#f85a5a] text-[#f85a5a]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Inclusions & Policies</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews' ? 'border-[#f85a5a] text-[#f85a5a]' : 'border-transparent hover:text-stone-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Traveler Reviews ({pkg.reviewsCount})</span>
            </button>
          </div>

          {/* Tab 1: Itinerary & Overview */}
          {activeTab === 'itinerary' && (
            <div className="p-6 sm:p-8 space-y-8">
              {/* Overview text */}
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Trip Overview
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {pkg.overview}
                </p>
              </div>

              {/* Day-by-day Itinerary */}
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Detailed Day-by-Day Schedule</span>
                  <span className="text-xs text-stone-500 font-normal">Click any day to expand</span>
                </h3>

                <div className="space-y-4">
                  {pkg.itinerary.map((dayItem) => {
                    const isExpanded = expandedDay === dayItem.day;
                    return (
                      <div
                        key={dayItem.day}
                        className={`border rounded-2xl transition-all overflow-hidden ${
                          isExpanded ? 'border-[#f85a5a]/40 bg-stone-50/50 shadow-sm' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {/* Day Header Trigger */}
                        <button
                          onClick={() => setExpandedDay(isExpanded ? null : dayItem.day)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-stone-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-[#f85a5a] text-white font-serif font-bold text-sm flex items-center justify-center shadow-sm">
                              D{dayItem.day}
                            </span>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900">
                                {dayItem.title}
                              </h4>
                              <p className="text-xs text-[#f85a5a] font-medium">
                                {dayItem.highlight}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="hidden sm:inline-block text-xs text-stone-500 font-medium bg-white px-2.5 py-1 rounded-full border border-stone-200">
                              {dayItem.mealsIncluded}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-stone-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-stone-400" />
                            )}
                          </div>
                        </button>

                        {/* Day Timeline Details */}
                        {isExpanded && (
                          <div className="px-5 pb-5 pt-2 border-t border-stone-200/60 bg-white">
                            <div className="relative pl-6 space-y-4 border-l-2 border-[#f85a5a]/30 ml-4 mt-2">
                              {dayItem.schedule.map((item, idx) => (
                                <div key={idx} className="relative">
                                  {/* Dot */}
                                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#f85a5a] border-2 border-white shadow-sm" />
                                  <div className="text-xs font-bold text-stone-500">{item.time}</div>
                                  <div className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                                    {item.activity}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-stone-400" />
                                      {item.location}
                                    </span>
                                    {item.transport && (
                                      <span className="flex items-center gap-1">
                                        <Car className="w-3 h-3 text-stone-400" />
                                        {item.transport}
                                      </span>
                                    )}
                                  </div>
                                  {item.notes && (
                                    <p className="text-xs text-stone-600 bg-amber-50/80 border border-amber-100 rounded-lg p-2 mt-1.5 font-light">
                                      💡 {item.notes}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Accommodation & Meals banner for the day */}
                            <div className="mt-5 p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                              <div className="flex items-center gap-1.5 font-medium">
                                <Hotel className="w-4 h-4 text-[#f85a5a]" />
                                <span>Night Accommodation: <strong>{dayItem.accommodationName}</strong></span>
                              </div>
                              <div className="text-stone-500">
                                Meals: <strong>{dayItem.mealsIncluded}</strong>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Departure Dates */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#f85a5a]" />
                  <span>Upcoming Available Departures (Daily Bookings Open)</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pkg.availableDates.slice(0, 7).map((d, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 shadow-2xs">
                      {new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold">
                    + Custom dates available on builder
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vehicles & Lodges Options Preview */}
          {activeTab === 'options' && (
            <div className="p-6 sm:p-8 space-y-8">
              {/* Vehicles */}
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#f85a5a]" />
                  <span>Transportation Fleet Options</span>
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  Select your preferred vehicle during customization. All vehicles are chauffeur-driven by licensed safari guides.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pkg.vehicles.map((v) => (
                    <div key={v.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 p-4 space-y-3">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-200">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-800">{v.name}</span>
                          <span className="text-[11px] font-semibold text-[#f85a5a]">
                            {(v.priceDifferenceKES || 0) === 0 ? 'Included' : `+ KES ${(v.priceDifferenceKES || 0).toLocaleString()}`}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 block">Up to {v.passengerCapacity} passengers</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {v.features.map((f, i) => (
                          <span key={i} className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded-full text-stone-600">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodations */}
              <div>
                <h3 className="text-base font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-[#f85a5a]" />
                  <span>Accommodation Tiers Available</span>
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  From standard comfort to world-renowned ultra-luxury retreats.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pkg.accommodations.map((acc) => (
                    <div key={acc.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 p-4 space-y-3">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-200">
                        <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-800">{acc.type}</span>
                          <span className="text-[11px] font-semibold text-[#f85a5a]">
                            {(acc.priceDifferenceKES || 0) === 0 ? 'Included' : `+ KES ${(acc.priceDifferenceKES || 0).toLocaleString()}`}
                          </span>
                        </div>
                        <h5 className="text-xs font-serif font-bold text-stone-900 truncate">{acc.name}</h5>
                        <p className="text-[11px] text-stone-500">{acc.roomType} • {acc.mealPlan}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{acc.rating} ({acc.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Inclusions, Exclusions & Policies */}
          {activeTab === 'included' && (
            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Inclusions */}
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What's 100% Included</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                    {pkg.includedServices.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-stone-400" />
                    <span>Excluded From Base Price</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                    {pkg.excludedServices.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-stone-400 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f85a5a]" />
                  <span>Cancellation & Refund Policy</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pkg.cancellationPolicy}
                </p>
              </div>

              {/* Important Info */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#f85a5a]" />
                  <span>Important Safari & Travel Information</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                  {pkg.importantInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#f85a5a] font-bold">✓</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-serif font-bold text-stone-900">
                    {pkg.rating.toFixed(2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500 mt-0.5 block">
                      Based on {pkg.reviewsCount} verified traveler reviews
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 bg-white px-3 py-2 rounded-xl border border-stone-200">
                  🛡️ 100% Verified Customer Feedback
                </div>
              </div>

              <div className="space-y-4">
                {packageReviews.length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-6">No direct reviews submitted for this specific package yet.</p>
                ) : (
                  packageReviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white border border-stone-200 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-stone-900">{rev.authorName}</span>
                          <span className="text-[11px] text-stone-500 block">{rev.authorCountry} • Booking #{rev.bookingReference}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-stone-400 pt-2 border-t border-stone-100">
                        <span>Transport: {rev.ratingsBreakdown.transport}/5</span>
                        <span>Lodging: {rev.ratingsBreakdown.accommodation}/5</span>
                        <span>Guide: {rev.ratingsBreakdown.guide}/5</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-stone-500 uppercase font-bold">Package Price:</span>
            <span className="text-2xl font-serif font-bold text-stone-900">
              {displayPrice()}
            </span>
            <span className="text-xs text-stone-500">/ person (base)</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={closePackageDetails}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
            >
              Back to Packages
            </button>
            
            <button
              id="btn-modal-build-package-cta"
              onClick={() => startCustomization(pkg)}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>BUILD YOUR PACKAGE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
