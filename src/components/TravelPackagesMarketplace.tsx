import React, { useState, useMemo } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import { TravelPackage } from '../types';
import { CustomQuotationModal } from './CustomQuotationModal';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Car,
  Hotel,
  Compass,
  ArrowRight,
  Filter,
  Search,
  ChevronRight,
  Check,
  Star,
  SlidersHorizontal,
  Flame,
  Award,
  Layers,
  FileText,
  Bell,
  X
} from 'lucide-react';

export const TravelPackagesMarketplace: React.FC = () => {
  const {
    packages,
    openPackageDetails,
    startCustomization,
    comparePackageIds,
    toggleComparePackage,
    clearComparison,
    setIsComparisonModalOpen,
    joinWaitlist
  } = usePackageBooking();
  const { currency, formatPrice, setTab } = useApp();

  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [activeWaitlistPackage, setActiveWaitlistPackage] = useState<TravelPackage | null>(null);

  // Waitlist form
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('+254 ');
  const [waitlistDate, setWaitlistDate] = useState('2026-10-15');
  const [waitlistTravellers, setWaitlistTravellers] = useState(2);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const destinations = [
    { id: 'all', label: 'All Kenya Packages' },
    { id: 'Naivasha', label: 'Naivasha Escape', badge: 'Rift Valley' },
    { id: 'Maasai Mara', label: 'Maasai Mara Safari', badge: 'Big 5' },
    { id: 'Diani Beach', label: 'Diani Beach', badge: 'Ocean' },
    { id: 'Amboseli', label: 'Amboseli Adventure', badge: 'Kilimanjaro' },
    { id: 'Nairobi', label: 'Nairobi Experience', badge: 'Wildlife City' },
    { id: 'Tsavo', label: 'Tsavo Safari', badge: 'Red Elephants' }
  ];

  const naturalQueryPills = [
    { label: 'Naivasha packages', query: 'naivasha' },
    { label: '3-day safari', query: '3-day' },
    { label: 'Family holiday', query: 'family' },
    { label: 'Luxury Kenya trip', query: 'luxury' },
    { label: 'Beach holiday', query: 'beach' },
    { label: 'Lamu cultural', query: 'lamu' },
    { label: 'Mount Kenya trekking', query: 'mount kenya' }
  ];

  const handleJoinWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWaitlistPackage || !waitlistName.trim() || !waitlistEmail.trim()) return;

    joinWaitlist({
      packageId: activeWaitlistPackage.id,
      packageName: activeWaitlistPackage.name,
      customerName: waitlistName,
      customerEmail: waitlistEmail,
      customerPhone: waitlistPhone,
      preferredDate: waitlistDate,
      travellers: waitlistTravellers
    });

    setWaitlistSuccess(true);
    setTimeout(() => {
      setActiveWaitlistPackage(null);
      setWaitlistSuccess(false);
      setWaitlistName('');
      setWaitlistEmail('');
    }, 1600);
  };

  // Filtering Logic
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      // Destination filter
      if (selectedDestination !== 'all' && pkg.destination !== selectedDestination) {
        return false;
      }

      // Duration filter
      if (selectedDuration === '2days' && pkg.durationDays !== 2) return false;
      if (selectedDuration === '3days' && pkg.durationDays !== 3) return false;
      if (selectedDuration === '4days' && pkg.durationDays < 4) return false;

      // Search query (matches name, destination, overview, tagline, activities)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesDest = pkg.destination.toLowerCase().includes(query);
        const matchesTagline = pkg.tagline.toLowerCase().includes(query);
        const matchesOverview = pkg.overview.toLowerCase().includes(query);
        const matchesCategory = pkg.category.toLowerCase().includes(query);
        const matchesActivity = pkg.activities.some(a => a.name.toLowerCase().includes(query));

        if (!matchesName && !matchesDest && !matchesTagline && !matchesOverview && !matchesCategory && !matchesActivity) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (priceSort === 'low-high') return a.basePriceKES - b.basePriceKES;
      if (priceSort === 'high-low') return b.basePriceKES - a.basePriceKES;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [packages, selectedDestination, selectedDuration, searchQuery, priceSort]);

  const displayPrice = (pkg: TravelPackage) => {
    if (currency === 'KES') {
      return `KES ${(pkg.basePriceKES || 0).toLocaleString()}`;
    }
    return `$${(pkg.basePriceUSD || Math.round((pkg.basePriceKES || 0) / 130)).toLocaleString()}`;
  };

  return (
    <section id="travel-packages-section" className="py-16 bg-[#fcfbf9] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f85a5a]/10 text-[#f85a5a] text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Complete All-Inclusive Travel Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Curated Kenyan Travel Experiences
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Instead of booking hotel, transport, guides, and activities separately, choose a complete destination package. 
            Customize every detail to your travel style with our interactive package builder.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="input-search-packages"
                type="text"
                placeholder="Search packages (e.g. Naivasha, 3-day, Mara, beach...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f85a5a] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start sm:justify-end">
              {/* Duration filter */}
              <select
                id="select-duration-filter"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
              >
                <option value="all">Any Duration</option>
                <option value="2days">2 Days / 1 Night</option>
                <option value="3days">3 Days / 2 Nights</option>
                <option value="4days">4+ Days / Beach</option>
              </select>

              {/* Sort by Price */}
              <select
                id="select-price-sort"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>

              {/* Reset Filters */}
              {(selectedDestination !== 'all' || selectedDuration !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDestination('all');
                    setSelectedDuration('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#f85a5a] font-bold hover:underline px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Quick Query Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex-shrink-0 mr-1">
              Popular:
            </span>
            {naturalQueryPills.map(pill => (
              <button
                key={pill.label}
                onClick={() => setSearchQuery(pill.query)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  searchQuery.toLowerCase() === pill.query.toLowerCase()
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Destination Filter Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pt-4 mt-3 border-t border-stone-100 no-scrollbar">
            <div className="flex items-center gap-2">
              {destinations.map(d => (
                <button
                  key={d.id}
                  id={`btn-filter-destination-${d.id}`}
                  onClick={() => setSelectedDestination(d.id)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    selectedDestination === d.id
                      ? 'bg-[#f85a5a] text-white shadow-sm font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{d.label}</span>
                  {d.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedDestination === d.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {d.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowQuotationModal(true)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Request Custom Quotation</span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-800 mb-1">No matching travel packages found</h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Try adjusting your search terms or clearing the destination filters.
            </p>
            <button
              onClick={() => {
                setSelectedDestination('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl bg-[#f85a5a] text-white text-xs font-bold hover:bg-[#e04848] transition-colors"
            >
              Show All Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                id={`card-package-${pkg.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Header with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer" onClick={() => openPackageDetails(pkg)}>
                  <img
                    src={pkg.featuredImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                    {pkg.badge && (
                      <span className="px-3 py-1 rounded-full bg-[#f85a5a] text-white text-[11px] font-bold shadow-md tracking-wide">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 border border-white/20">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                    </span>
                  </div>

                  {/* Top Right Actions */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparePackage(pkg.id);
                      }}
                      className={`px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 backdrop-blur-md border transition-all ${
                        comparePackageIds.includes(pkg.id)
                          ? 'bg-[#f85a5a] text-white border-[#f85a5a] shadow-md'
                          : 'bg-black/60 text-white/90 border-white/20 hover:bg-black/80'
                      }`}
                      title="Compare side-by-side with other packages"
                    >
                      <Layers className="w-3 h-3" />
                      <span>{comparePackageIds.includes(pkg.id) ? 'Comparing' : 'Compare'}</span>
                    </button>

                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1 border border-white/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Destination & Region overlay at bottom */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <div className="flex items-center gap-1 text-white/80 text-xs font-semibold uppercase tracking-wider mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f85a5a]" />
                      <span>{pkg.destination}, {pkg.region}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Tagline & Short Overview */}
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      {pkg.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {pkg.overview}
                    </p>
                  </div>

                  {/* Key Inclusions Pills */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase text-stone-400 tracking-wider">
                      Included in Package:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">Full Board Lodging</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">Dedicated Transport</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">Park / Reserve Permits</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">Professional Guide</span>
                      </div>
                    </div>
                  </div>

                  {/* Available Upgrades preview */}
                  <div className="bg-stone-50 rounded-xl p-2.5 flex items-center justify-between text-xs text-stone-600 border border-stone-150">
                    <span className="text-[11px] text-stone-500 font-medium">Customizable options:</span>
                    <div className="flex items-center gap-2 font-semibold text-[11px] text-stone-800">
                      <span className="flex items-center gap-0.5"><Car className="w-3 h-3 text-[#f85a5a]" /> 5 Vehicles</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><Hotel className="w-3 h-3 text-[#f85a5a]" /> 3 Lodges</span>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-stone-400 uppercase font-semibold">Starting from</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-bold text-stone-950 font-serif">
                          {displayPrice(pkg)}
                        </span>
                        <span className="text-[11px] text-stone-500">/ person</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-view-details-${pkg.id}`}
                        onClick={() => openPackageDetails(pkg)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                        title="View Full Day-by-Day Itinerary"
                      >
                        Details
                      </button>

                      <button
                        id={`btn-waitlist-${pkg.id}`}
                        onClick={() => setActiveWaitlistPackage(pkg)}
                        className="px-2.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors"
                        title="Join Priority Waitlist"
                      >
                        <Bell className="w-3.5 h-3.5" />
                      </button>

                      <button
                        id={`btn-customize-package-${pkg.id}`}
                        onClick={() => startCustomization(pkg)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#f85a5a] hover:bg-[#e04848] shadow-sm hover:shadow-md transition-all flex items-center gap-1 group/btn cursor-pointer"
                      >
                        <span>Customize & Book</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Comparison Action Bar */}
        {comparePackageIds.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#f85a5a] text-white">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">
                  {comparePackageIds.length} Packages Selected
                </span>
                <span className="text-[10px] text-stone-400">
                  Compare side-by-side
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsComparisonModalOpen(true)}
                className="px-4 py-1.5 bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <span>View Comparison</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={clearComparison}
                className="text-xs text-stone-400 hover:text-white underline px-2 py-1"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Waitlist Modal */}
        {activeWaitlistPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setActiveWaitlistPackage(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Join Priority Safari Waitlist
                  </h3>
                  <p className="text-xs text-stone-500">
                    {activeWaitlistPackage.name}
                  </p>
                </div>
              </div>

              {waitlistSuccess ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-stone-900">You're on the Priority List!</h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Our reservations desk will alert you via WhatsApp/Email as soon as a slot opens.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlistSubmit} className="space-y-3.5 mt-4">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    This safari sells out quickly due to high seasonal demand. Submit your contact details to receive instant notification if slots or dates become available.
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={waitlistPhone}
                        onChange={(e) => setWaitlistPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={waitlistDate}
                        onChange={(e) => setWaitlistDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveWaitlistPackage(null)}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold shadow transition-all"
                    >
                      Join Waitlist
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Custom Quotation Modal */}
        <CustomQuotationModal
          isOpen={showQuotationModal}
          onClose={() => setShowQuotationModal(false)}
        />

        {/* Bottom Trust Guarantee Bar */}
        <div className="mt-14 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-stone-700">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-0.5">Licensed & Verified</h4>
              <p className="text-xs text-stone-500">Official TRA Kenyan Tour Operator & AMREF Flying Doctors coverage included.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-[#f85a5a] flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-0.5">Total Customization</h4>
              <p className="text-xs text-stone-500">Upgrade vehicles to 4x4 Land Cruisers, luxury lodges, or add private guides instantly.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-0.5">Instant M-PESA & Cards</h4>
              <p className="text-xs text-stone-500">Secure checkout with instant Safaricom STK Push and international Visa/Mastercard.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-0.5">Best Value Guarantee</h4>
              <p className="text-xs text-stone-500">Bundled wholesale rates save up to 35% compared to booking separately.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
