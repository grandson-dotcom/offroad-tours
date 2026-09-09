import React from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Car,
  Hotel,
  Compass,
  Star,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Flame,
  Users
} from 'lucide-react';

export const PackageComparisonModal: React.FC = () => {
  const {
    packages,
    comparePackageIds,
    toggleComparePackage,
    clearComparison,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    startCustomization,
    openPackageDetails
  } = usePackageBooking();

  const { currency, formatPrice } = useApp();

  if (!isComparisonModalOpen || comparePackageIds.length === 0) {
    return null;
  }

  const comparedPackages = packages.filter(p => comparePackageIds.includes(p.id));

  const formatCost = (kes: number, usd?: number) => {
    if (currency === 'KES') {
      return `KES ${kes.toLocaleString()}`;
    }
    return `$${(usd || Math.round(kes / 130)).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f85a5a]/20 text-[#f85a5a]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Side-by-Side Package Comparison
              </h3>
              <p className="text-xs text-stone-300">
                Comparing {comparedPackages.length} selected Kenya travel packages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="text-xs text-stone-400 hover:text-white underline"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              aria-label="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content Grid */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-stone-100 items-stretch">
              
              {/* Feature Label Column */}
              <div className="col-span-1 pt-4 text-xs font-bold uppercase tracking-wider text-stone-400 flex flex-col justify-end">
                <span>Package Details</span>
              </div>

              {/* Package Header Columns */}
              {comparedPackages.map(pkg => (
                <div key={pkg.id} className="col-span-1 bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col justify-between relative group">
                  <button
                    onClick={() => toggleComparePackage(pkg.id)}
                    className="absolute top-2 right-2 p-1 text-stone-400 hover:text-rose-500 rounded-full hover:bg-white transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <img
                      src={pkg.featuredImage}
                      alt={pkg.name}
                      className="w-full h-24 object-cover rounded-xl mb-2.5 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex items-center gap-1 text-[11px] text-[#f85a5a] font-bold uppercase">
                      <MapPin className="w-3 h-3" />
                      <span>{pkg.destination}</span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-stone-900 mt-0.5 line-clamp-1">
                      {pkg.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-stone-800">{pkg.rating.toFixed(1)}</span>
                      <span>({pkg.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">From</span>
                    <span className="text-base font-bold text-stone-950 font-serif block">
                      {formatCost(pkg.basePriceKES, pkg.basePriceUSD)}
                    </span>
                    <button
                      onClick={() => {
                        setIsComparisonModalOpen(false);
                        startCustomization(pkg);
                      }}
                      className="w-full mt-2 py-2 bg-[#f85a5a] hover:bg-[#e04848] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                    >
                      <span>Customize</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec Rows */}
            <div className="divide-y divide-stone-100 text-xs">
              
              {/* Duration */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Duration</span>
                </span>
                {comparedPackages.map(pkg => (
                  <span key={pkg.id} className="font-bold text-stone-800">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </span>
                ))}
              </div>

              {/* Group / Travel Style */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>Category</span>
                </span>
                {comparedPackages.map(pkg => (
                  <span key={pkg.id} className="text-stone-700">
                    {pkg.category}
                  </span>
                ))}
              </div>

              {/* Vehicles Available */}
              <div className="grid grid-cols-4 gap-4 py-3 items-start">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5 pt-0.5">
                  <Car className="w-3.5 h-3.5 text-stone-400" />
                  <span>Transport</span>
                </span>
                {comparedPackages.map(pkg => (
                  <div key={pkg.id} className="space-y-1">
                    <span className="font-bold text-stone-900 block">
                      {pkg.vehicleOptions[0]?.name || '4x4 Safari Transport'}
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      +{pkg.vehicleOptions.length - 1} upgrade options
                    </span>
                  </div>
                ))}
              </div>

              {/* Accommodation */}
              <div className="grid grid-cols-4 gap-4 py-3 items-start">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5 pt-0.5">
                  <Hotel className="w-3.5 h-3.5 text-stone-400" />
                  <span>Lodges / Camps</span>
                </span>
                {comparedPackages.map(pkg => (
                  <div key={pkg.id} className="space-y-1">
                    <span className="font-bold text-stone-900 block">
                      {pkg.accommodationOptions[0]?.name || 'Standard Lodge'}
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      {pkg.accommodationOptions[0]?.mealPlan || 'Full Board'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Guides */}
              <div className="grid grid-cols-4 gap-4 py-3 items-start">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5 pt-0.5">
                  <Compass className="w-3.5 h-3.5 text-stone-400" />
                  <span>Guide Service</span>
                </span>
                {comparedPackages.map(pkg => (
                  <div key={pkg.id} className="text-stone-700">
                    <span className="font-bold block">
                      {pkg.guideOptions[0]?.name || 'Dedicated KPSGA Guide'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Languages: {pkg.guideOptions[0]?.languages?.join(', ') || 'English, Kiswahili'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Included Activities */}
              <div className="grid grid-cols-4 gap-4 py-3 items-start">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Included Highlights</span>
                </span>
                {comparedPackages.map(pkg => (
                  <ul key={pkg.id} className="space-y-1">
                    {pkg.activities.slice(0, 3).map((act, i) => (
                      <li key={i} className="text-[11px] text-stone-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="truncate">{act.name}</span>
                      </li>
                    ))}
                    {pkg.activities.length > 3 && (
                      <li className="text-[10px] text-stone-400 font-semibold">
                        +{pkg.activities.length - 3} more activities
                      </li>
                    )}
                  </ul>
                ))}
              </div>

              {/* Park Fees */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-semibold text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Park Permits</span>
                </span>
                {comparedPackages.map(pkg => (
                  <span key={pkg.id} className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Included</span>
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            All prices include Kenyan KWS park conservation fees, professional guide fees, and 16% VAT.
          </p>
          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
