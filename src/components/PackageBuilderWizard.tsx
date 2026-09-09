import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar,
  Users,
  Car,
  Hotel,
  Compass,
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Info,
  Tag,
  ShieldCheck,
  Plus,
  Minus,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const PackageBuilderWizard: React.FC = () => {
  const {
    activePackage: pkg,
    customization,
    calculatedPrice,
    isBuilderOpen,
    closeBuilder,
    updateCustomization,
    applyPromoCode,
    removePromoCode,
    proceedToCheckout
  } = usePackageBooking();

  const { currency, formatPrice } = useApp();

  // Wizard Step: 1 to 8
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isBuilderOpen || !pkg || !customization || !calculatedPrice) return null;

  const totalSteps = 8;

  const stepsList = [
    { num: 1, label: 'Dates' },
    { num: 2, label: 'Travellers' },
    { num: 3, label: 'Transport' },
    { num: 4, label: 'Lodging' },
    { num: 5, label: 'Guide' },
    { num: 6, label: 'Activities' },
    { num: 7, label: 'Special Needs' },
    { num: 8, label: 'Summary' }
  ];

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput.trim());
    setPromoFeedback({ success: res.success, message: res.message });
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoInput('');
    setPromoFeedback(null);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      proceedToCheckout();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Activity toggle
  const toggleActivity = (activityId: string) => {
    const act = pkg.activities.find(a => a.id === activityId);
    if (act?.includedInBase) {
      // Included activities cannot be unselected
      return;
    }
    const current = customization.selectedActivityIds;
    if (current.includes(activityId)) {
      updateCustomization({ selectedActivityIds: current.filter(id => id !== activityId) });
    } else {
      updateCustomization({ selectedActivityIds: [...current, activityId] });
    }
  };

  const formatCurrency = (kesAmount: number) => {
    const val = typeof kesAmount === 'number' && !isNaN(kesAmount) ? kesAmount : 0;
    if (currency === 'KES') {
      return `KES ${val.toLocaleString()}`;
    }
    return `$${Math.round(val / 130).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div
        id="modal-package-builder-container"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
      >
        {/* Top Sticky Bar: Base Package Info & Close */}
        <div className="bg-stone-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-800 flex-shrink-0 hidden sm:block">
              <img src={pkg.featuredImage} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#f85a5a] text-white">
                  Package Customizer
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  {pkg.durationDays} Days / {pkg.durationNights} Nights
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-white leading-tight">
                {pkg.name}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-package-builder"
            onClick={closeBuilder}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Package Customizer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            {stepsList.map((st) => {
              const isPassed = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <button
                  key={st.num}
                  onClick={() => setCurrentStep(st.num)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#f85a5a] text-white shadow-sm'
                      : isPassed
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isCurrent ? 'bg-white text-[#f85a5a]' : isPassed ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {isPassed ? '✓' : st.num}
                  </span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area (Two Columns on Desktop: Step Config + Sticky Price Sidebar) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Active Step Controls (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: SELECT TRAVEL DATES */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 1 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Select Your Travel Dates
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Choose when you want to experience {pkg.destination}. Packages operate on guaranteed daily slots.
                  </p>
                </div>

                {/* Available Date Chips */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <span className="text-xs font-bold text-stone-700 block">
                    Quick Pick Guaranteed Departure Dates:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pkg.availableDates.map((d, i) => {
                      const isSelected = customization.arrivalDate === d;
                      const arr = new Date(d);
                      const dep = new Date(arr);
                      dep.setDate(dep.getDate() + pkg.durationDays);

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            updateCustomization({
                              arrivalDate: d,
                              departureDate: dep.toISOString().split('T')[0]
                            });
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? 'bg-[#f85a5a] text-white border-[#f85a5a] shadow-sm font-bold'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          {arr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {dep.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Arrival & Departure Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                      Arrival / Start Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={customization.arrivalDate}
                      onChange={(e) => {
                        const newArr = e.target.value;
                        const dep = new Date(newArr);
                        dep.setDate(dep.getDate() + pkg.durationDays);
                        updateCustomization({
                          arrivalDate: newArr,
                          departureDate: dep.toISOString().split('T')[0]
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-[#f85a5a] focus:bg-white"
                    />
                    <span className="text-[11px] text-stone-400 block">Morning VIP pickup from your hotel or airport</span>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                      Departure / End Date
                    </label>
                    <input
                      type="date"
                      value={customization.departureDate}
                      onChange={(e) => updateCustomization({ departureDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-[#f85a5a] focus:bg-white"
                    />
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      ✓ Automatically aligned with {pkg.durationDays}-day package schedule
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: NUMBER OF TRAVELLERS */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 2 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    How Many Travellers?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Live pricing rules: Adults pay standard rate, children (3-12 yrs) receive a 40% discount, and infants travel free.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Adults Counter */}
                  <div className="flex items-center justify-between p-4 sm:p-5 bg-white border border-stone-200 rounded-2xl shadow-2xs">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">Adults (Age 13+)</h4>
                      <p className="text-xs text-stone-500">Full package price ({formatCurrency(pkg.basePriceKES)} / person)</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCustomization({ adults: Math.max(1, customization.adults - 1) })}
                        disabled={customization.adults <= 1}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-base text-stone-900">
                        {customization.adults}
                      </span>
                      <button
                        onClick={() => updateCustomization({ adults: customization.adults + 1 })}
                        disabled={customization.adults >= pkg.maxTravellers}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between p-4 sm:p-5 bg-white border border-stone-200 rounded-2xl shadow-2xs">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">Children (Age 3–12)</h4>
                      <p className="text-xs text-emerald-600 font-semibold">
                        40% Family Discount ({formatCurrency(pkg.basePriceKES * 0.6)} / child)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCustomization({ children: Math.max(0, customization.children - 1) })}
                        disabled={customization.children <= 0}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-base text-stone-900">
                        {customization.children}
                      </span>
                      <button
                        onClick={() => updateCustomization({ children: customization.children + 1 })}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Infants Counter */}
                  <div className="flex items-center justify-between p-4 sm:p-5 bg-white border border-stone-200 rounded-2xl shadow-2xs">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">Infants (Under 3 yrs)</h4>
                      <p className="text-xs text-stone-500">Free of charge (baby car seat provided on request)</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCustomization({ infants: Math.max(0, customization.infants - 1) })}
                        disabled={customization.infants <= 0}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-base text-stone-900">
                        {customization.infants}
                      </span>
                      <button
                        onClick={() => updateCustomization({ infants: customization.infants + 1 })}
                        className="w-9 h-9 rounded-xl border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: TRANSPORTATION (VEHICLE) */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 3 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Select Your Preferred Vehicle
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Every package includes round-trip transfers and private driver-guide. Choose your comfort level:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.vehicles.map((v) => {
                    const isSelected = customization.selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => updateCustomization({ selectedVehicleId: v.id })}
                        className={`border rounded-2xl overflow-hidden cursor-pointer transition-all p-4 space-y-3 ${
                          isSelected
                            ? 'border-[#f85a5a] ring-2 ring-[#f85a5a]/20 bg-stone-50 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 relative">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#f85a5a] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {v.category}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-stone-900">{v.name}</h4>
                            <span className={`text-xs font-bold ${v.priceDifferenceKES === 0 ? 'text-emerald-600' : 'text-[#f85a5a]'}`}>
                              {v.priceDifferenceKES === 0 ? 'Included' : `+ ${formatCurrency(v.priceDifferenceKES)}`}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5">
                            Capacity: {v.passengerCapacity} Passengers • {v.luggageCapacity} Bags
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-1 border-t border-stone-100">
                          {v.features.map((f, i) => (
                            <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: ACCOMMODATION */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 4 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Select Your Accommodation
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Choose from standard safari lodges to world-class luxury resorts. All include full board meals.
                  </p>
                </div>

                <div className="space-y-4">
                  {pkg.accommodations.map((acc) => {
                    const isSelected = customization.selectedAccommodationId === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => updateCustomization({ selectedAccommodationId: acc.id })}
                        className={`border rounded-2xl overflow-hidden cursor-pointer transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-4 ${
                          isSelected
                            ? 'border-[#f85a5a] ring-2 ring-[#f85a5a]/20 bg-stone-50 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="sm:w-48 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                          <img src={acc.image} alt={acc.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {acc.type}
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-between space-y-2">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-base font-serif font-bold text-stone-900 leading-snug">
                                  {acc.name}
                                </h4>
                                <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    {acc.rating} ({acc.reviewsCount})
                                  </span>
                                  <span>•</span>
                                  <span>{acc.location}</span>
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <span className={`text-sm font-bold ${acc.priceDifferenceKES === 0 ? 'text-emerald-600' : 'text-[#f85a5a]'}`}>
                                  {acc.priceDifferenceKES === 0 ? 'Included' : `+ ${formatCurrency(acc.priceDifferenceKES)}`}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-stone-600 mt-2">
                              <strong>Room:</strong> {acc.roomType} • <strong>Meal Plan:</strong> {acc.mealPlan}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                            {acc.amenities.map((am, i) => (
                              <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                                {am}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: GUIDE */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 5 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Select Tour Guide Service
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Certified professional guides certified by the Kenya Professional Safari Guides Association (KPSGA).
                  </p>
                </div>

                <div className="space-y-4">
                  {pkg.guides.map((g) => {
                    const isSelected = customization.selectedGuideId === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => updateCustomization({ selectedGuideId: g.id })}
                        className={`border rounded-2xl overflow-hidden cursor-pointer transition-all p-4 sm:p-5 flex items-center gap-4 ${
                          isSelected
                            ? 'border-[#f85a5a] ring-2 ring-[#f85a5a]/20 bg-stone-50 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                          <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm sm:text-base font-bold text-stone-900">{g.name}</h4>
                            <span className={`text-xs sm:text-sm font-bold ${g.priceDifferenceKES === 0 ? 'text-emerald-600' : 'text-[#f85a5a]'}`}>
                              {g.priceDifferenceKES === 0 ? 'Included' : `+ ${formatCurrency(g.priceDifferenceKES)}`}
                            </span>
                          </div>
                          <span className="text-xs text-[#f85a5a] font-semibold block">{g.type}</span>
                          <div className="flex flex-wrap gap-2 text-xs text-stone-500 mt-1">
                            <span>Experience: {g.experienceYears}+ years</span>
                            <span>•</span>
                            <span>Languages: {g.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: ACTIVITIES */}
            {currentStep === 6 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 6 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Customize Activities & Experiences
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Select extra adventures to add to your itinerary. Base activities are already included!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.activities.map((act) => {
                    const isSelected = customization.selectedActivityIds.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        onClick={() => toggleActivity(act.id)}
                        className={`border rounded-2xl overflow-hidden cursor-pointer transition-all p-4 space-y-3 ${
                          isSelected
                            ? 'border-[#f85a5a] ring-2 ring-[#f85a5a]/20 bg-stone-50 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 relative">
                          <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {act.category} • {act.duration}
                          </span>
                          {isSelected && (
                            <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#f85a5a] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">{act.name}</h4>
                            <span className={`text-xs font-bold ${act.includedInBase ? 'text-emerald-600' : 'text-[#f85a5a]'}`}>
                              {act.includedInBase ? 'Included' : `+ ${formatCurrency(act.priceKES)}`}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                            {act.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 7: SPECIAL REQUESTS */}
            {currentStep === 7 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 7 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Special Requests & Preferences
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Help our logistics team and lodge chefs tailor your trip to perfection.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Pickup Location */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Preferred Pickup Location
                    </label>
                    <select
                      value={customization.specialRequests.pickupLocation}
                      onChange={(e) => updateCustomization({
                        specialRequests: { ...customization.specialRequests, pickupLocation: e.target.value as any }
                      })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-stone-800"
                    >
                      <option value="JKIA International Airport">JKIA International Airport, Nairobi</option>
                      <option value="Wilson Airport Nairobi">Wilson Airport, Nairobi (Domestic Safaris)</option>
                      <option value="Nairobi City Hotel">Nairobi City Hotel (Westlands / CBD / Karen)</option>
                      <option value="Diani / Ukunda Airstrip">Diani / Ukunda Airstrip</option>
                      <option value="Custom Address">Custom Residential or Hotel Address</option>
                    </select>

                    {customization.specialRequests.pickupLocation === 'Custom Address' && (
                      <input
                        type="text"
                        placeholder="Enter hotel name or street address..."
                        value={customization.specialRequests.customPickupAddress || ''}
                        onChange={(e) => updateCustomization({
                          specialRequests: { ...customization.specialRequests, customPickupAddress: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 mt-2"
                      />
                    )}
                  </div>

                  {/* Dietary Requirements */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Dietary Requirements
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Kosher'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => updateCustomization({
                            specialRequests: { ...customization.specialRequests, dietaryRequirement: d }
                          })}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            customization.specialRequests.dietaryRequirement === d
                              ? 'bg-[#f85a5a] text-white border-[#f85a5a]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Occasion */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Celebrating a Special Occasion?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['None', 'Honeymoon', 'Birthday', 'Wedding Anniversary', 'Family Reunion'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => updateCustomization({
                            specialRequests: { ...customization.specialRequests, celebrationType: c }
                          })}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            customization.specialRequests.celebrationType === c
                              ? 'bg-[#f85a5a] text-white border-[#f85a5a]'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Any other special requests or questions?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Ground floor room preferred, early morning tea, photographer gear assistance..."
                      value={customization.specialRequests.notes || ''}
                      onChange={(e) => updateCustomization({
                        specialRequests: { ...customization.specialRequests, notes: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: SUMMARY & PROMO CODE */}
            {currentStep === 8 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">Step 8 of 8</span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                    Your Complete Customized Itinerary
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Review your tailored travel package selections before securing your booking.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                  {/* Trip Header */}
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#f85a5a] uppercase">Destination Package</span>
                      <h4 className="text-lg font-serif font-bold text-stone-900">{pkg.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-500 font-medium">Dates:</span>
                      <div className="text-xs font-bold text-stone-800">
                        {customization.arrivalDate} to {customization.departureDate}
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-400 font-bold uppercase text-[10px]">Travellers</span>
                      <div className="font-bold text-stone-800 mt-0.5">
                        {customization.adults} Adults {customization.children > 0 && `• ${customization.children} Children`} {customization.infants > 0 && `• ${customization.infants} Infants`}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-400 font-bold uppercase text-[10px]">Vehicle</span>
                      <div className="font-bold text-stone-800 mt-0.5">
                        {pkg.vehicles.find(v => v.id === customization.selectedVehicleId)?.name}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-400 font-bold uppercase text-[10px]">Accommodation</span>
                      <div className="font-bold text-stone-800 mt-0.5">
                        {pkg.accommodations.find(a => a.id === customization.selectedAccommodationId)?.name}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <span className="text-stone-400 font-bold uppercase text-[10px]">Guide</span>
                      <div className="font-bold text-stone-800 mt-0.5">
                        {pkg.guides.find(g => g.id === customization.selectedGuideId)?.name}
                      </div>
                    </div>
                  </div>

                  {/* Included & Added Activities */}
                  <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                    <span className="text-stone-400 font-bold uppercase text-[10px]">Activities Included ({customization.selectedActivityIds.length})</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {customization.selectedActivityIds.map((actId) => {
                        const act = pkg.activities.find(a => a.id === actId);
                        if (!act) return null;
                        return (
                          <span key={actId} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                            ✓ {act.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-2 border-t border-stone-200">
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">
                      Have a Promo or Referral Code?
                    </label>
                    <div className="flex items-center gap-2 max-w-md">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          placeholder="e.g. KARIBU10, SAFARI2026"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 uppercase"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {promoFeedback && (
                      <p className={`text-xs mt-1.5 font-medium ${promoFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {promoFeedback.message}
                      </p>
                    )}

                    {calculatedPrice.promoCodeApplied && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                          Code: {calculatedPrice.promoCodeApplied} (- {formatCurrency(calculatedPrice.discountKES)})
                        </span>
                        <button onClick={handleRemovePromo} className="text-xs text-stone-400 hover:text-stone-600 underline">
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Price Calculator & Breakdown (4 cols on lg) */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 bg-stone-900 text-white rounded-2xl p-5 shadow-xl border border-stone-800 space-y-4">
              
              <div className="border-b border-stone-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f85a5a] block">
                  Live Price Calculator
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {formatCurrency(calculatedPrice.totalCustomerPriceKES)}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    (Total Package)
                  </span>
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  ≈ ${(calculatedPrice.totalCustomerPriceUSD || Math.round((calculatedPrice.totalCustomerPriceKES || 0) / 130)).toLocaleString()} USD • All taxes included
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Base ({customization.adults} Adults):</span>
                  <span className="font-semibold text-white">{formatCurrency(calculatedPrice.adultsTotalKES)}</span>
                </div>

                {customization.children > 0 && (
                  <div className="flex justify-between">
                    <span>Children ({customization.children} x 60%):</span>
                    <span className="font-semibold text-emerald-400">+{formatCurrency(calculatedPrice.childrenTotalKES)}</span>
                  </div>
                )}

                {calculatedPrice.vehicleUpgradeKES > 0 && (
                  <div className="flex justify-between">
                    <span>Vehicle Upgrade:</span>
                    <span className="font-semibold text-white">+{formatCurrency(calculatedPrice.vehicleUpgradeKES)}</span>
                  </div>
                )}

                {calculatedPrice.accommodationUpgradeKES > 0 && (
                  <div className="flex justify-between">
                    <span>Lodge Upgrade:</span>
                    <span className="font-semibold text-white">+{formatCurrency(calculatedPrice.accommodationUpgradeKES)}</span>
                  </div>
                )}

                {calculatedPrice.guideUpgradeKES > 0 && (
                  <div className="flex justify-between">
                    <span>Guide Upgrade:</span>
                    <span className="font-semibold text-white">+{formatCurrency(calculatedPrice.guideUpgradeKES)}</span>
                  </div>
                )}

                {calculatedPrice.activitiesTotalKES > 0 && (
                  <div className="flex justify-between">
                    <span>Extra Activities:</span>
                    <span className="font-semibold text-white">+{formatCurrency(calculatedPrice.activitiesTotalKES)}</span>
                  </div>
                )}

                {calculatedPrice.discountKES > 0 && (
                  <div className="flex justify-between text-emerald-400 pt-1 border-t border-stone-800">
                    <span>Promo Discount:</span>
                    <span className="font-bold">-{formatCurrency(calculatedPrice.discountKES)}</span>
                  </div>
                )}
              </div>

              {/* Guarantee badges */}
              <div className="pt-3 border-t border-stone-800 space-y-1.5 text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No hidden fees or surprises at hotel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free cancellation up to 72 hours before</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant M-PESA or Card verification</span>
                </div>
              </div>

              {/* Step Navigation Action in Sidebar */}
              <div className="pt-2">
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="w-full py-3 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Next: {stepsList[currentStep]?.label || 'Proceed'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={proceedToCheckout}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>PROCEED TO BOOKING</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Modal Bottom Bar: Back / Next Navigation */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs text-stone-400 font-medium">
            Step {currentStep} of {totalSteps}
          </span>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-5 py-2.5 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={proceedToCheckout}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Book This Package</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
