import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/kenyaData';
import { Destination } from '../types';
import {
  MapPin,
  Star,
  Clock,
  DollarSign,
  Heart,
  Eye,
  Filter,
  ShieldAlert,
  ArrowRight,
  X,
  Compass,
  Check
} from 'lucide-react';

export const DestinationsGrid: React.FC = () => {
  const {
    formatPrice,
    toggleFavorite,
    isFavorite,
    setActiveDestinationModal,
    activeDestinationModal,
    setTab,
    setBookingItem
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Destinations', icon: '🇰🇪' },
    { id: 'wildlife', label: 'Wildlife & Safaris', icon: '🦁' },
    { id: 'beach', label: 'Beaches & Coast', icon: '🏖️' },
    { id: 'mountain', label: 'Mountains & Peaks', icon: '🏔️' },
    { id: 'nature', label: 'Nature & Rift Valley', icon: '🌳' },
    { id: 'city', label: 'Nairobi & Cities', icon: '🏙️' },
    { id: 'culture', label: 'Culture & Heritage', icon: '🏛️' }
  ];

  const regions = ['all', 'Rift Valley', 'Coast', 'Central', 'Nairobi', 'Northern'];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
    const matchesRegion = regionFilter === 'all' || d.region === regionFilter;
    const matchesSearch =
      searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <section id="destinations-section" className="py-16 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Explore Kenya
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              Iconic Kenyan Destinations
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              From the endless savannas of Maasai Mara to the coral reefs of Diani and ancient Swahili alleyways of Lamu.
            </p>
          </div>

          {/* Quick Search inside section */}
          <div className="mt-4 md:mt-0 w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, park or beach..."
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills & Region Filters */}
        <div className="space-y-3 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  categoryFilter === c.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 text-xs font-medium overflow-x-auto pb-1">
            <span className="text-stone-400 text-[11px] uppercase tracking-wider">Region:</span>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  regionFilter === r
                    ? 'bg-stone-900 text-white font-bold'
                    : 'text-stone-600 hover:text-stone-900 bg-stone-200/60'
                }`}
              >
                {r === 'all' ? 'All Regions' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              id={`dest-card-${dest.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Container with Zoom and Wishlist */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                {/* Region & Tag Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-stone-700/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{dest.region}</span>
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  id={`btn-fav-${dest.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(dest.id);
                  }}
                  aria-label="Add to favorites"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(dest.id) ? 'fill-rose-500 text-rose-500' : 'text-white'
                    }`}
                  />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-0.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{dest.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="text-stone-300">{dest.reviewCount} reviews</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white leading-snug drop-shadow-md">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights / Activities tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dest.activities.slice(0, 3).map((act, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta Bar & CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Entry (24hr):</span>
                    <span className="font-bold text-stone-900">
                      {dest.entranceFeeUSD === 0 ? 'Free Entry' : formatPrice(dest.entranceFeeUSD)}
                    </span>
                  </div>

                  <button
                    id={`btn-explore-${dest.id}`}
                    onClick={() => setActiveDestinationModal(dest)}
                    className="bg-stone-900 hover:bg-amber-600 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Safaris / Beach Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setTab('safaris')}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <span>View All Safari Packages & Tours</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Destination Details Modal */}
      {activeDestinationModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-stone-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] bg-stone-900">
              <img
                src={activeDestinationModal.image}
                alt={activeDestinationModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

              <button
                onClick={() => setActiveDestinationModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-stone-900/80 px-2.5 py-1 rounded-md">
                  📍 {activeDestinationModal.region}, Kenya
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1.5">
                  {activeDestinationModal.name}
                </h3>
                <p className="text-xs text-stone-300 font-medium">{activeDestinationModal.tagline}</p>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-sm text-stone-900 mb-1">About this Destination</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {activeDestinationModal.description}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Entrance Fee</span>
                  <span className="font-bold text-stone-900">
                    {activeDestinationModal.entranceFeeUSD === 0 ? 'Free' : formatPrice(activeDestinationModal.entranceFeeUSD)}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Ideal Duration</span>
                  <span className="font-bold text-stone-900">{activeDestinationModal.duration}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Best Season</span>
                  <span className="font-bold text-stone-900">{activeDestinationModal.bestTimeToVisit}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Nearby Lodges</span>
                  <span className="font-bold text-stone-900">{activeDestinationModal.nearbyHotelsCount}+ Available</span>
                </div>
              </div>

              {/* Highlights List */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 mb-2">Key Highlights & Experiences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDestinationModal.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                      <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety & Ranger Notes */}
              <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-xs">Visitor Safety & Wildlife Rules</h5>
                  <p className="mt-0.5 text-rose-800 leading-relaxed">
                    {activeDestinationModal.safetyNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  toggleFavorite(activeDestinationModal.id);
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5"
              >
                <Heart className={`w-4 h-4 ${isFavorite(activeDestinationModal.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFavorite(activeDestinationModal.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveDestinationModal(null);
                    setTab('safaris');
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors"
                >
                  Book Safari Tour Here
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
