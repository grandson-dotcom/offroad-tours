import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NEARBY_SERVICES, DESTINATIONS, HOTELS, RESTAURANTS } from '../data/kenyaData';
import { NearbyPlace } from '../types';
import {
  MapPin,
  Compass,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Search,
  Sliders,
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';

export const NearMeRadar: React.FC = () => {
  const { userLocation, requestLocation, setBookingItem, setTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(25);
  const [activePlace, setActivePlace] = useState<NearbyPlace | null>(null);
  const [emergencyOnly, setEmergencyOnly] = useState<boolean>(false);

  // Manual city simulation presets if GPS is off or in test environment
  const cityPresets = [
    { name: 'Nairobi (CBD/Westlands)', lat: -1.286389, lng: 36.817223 },
    { name: 'Nairobi (Karen/Langata)', lat: -1.332, lng: 36.705 },
    { name: 'Diani Beach (South Coast)', lat: -4.279, lng: 39.593 },
    { name: 'Mombasa Old Town', lat: -4.043, lng: 39.668 },
    { name: 'Maasai Mara (Talek)', lat: -1.439, lng: 35.215 }
  ];

  // Helper distance calculation using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const userLat = userLocation?.lat ?? -1.286389;
  const userLng = userLocation?.lng ?? 36.817223;

  // Compute live distance for all places
  const allPlacesWithDistance = useMemo(() => {
    const list: any[] = [
      ...NEARBY_SERVICES.map((s) => ({
        ...s,
        distanceKm: calculateDistance(userLat, userLng, s.coordinates?.lat ?? -1.286389, s.coordinates?.lng ?? 36.817223),
        openStatus: 'Open Now',
        icon: '📍'
      })),
      ...DESTINATIONS.map((d) => ({
        id: `dest-${d.id}`,
        name: d.name,
        category: 'attraction' as const,
        description: d.description,
        distanceKm: calculateDistance(userLat, userLng, d.coordinates?.lat ?? -1.286389, d.coordinates?.lng ?? 36.817223),
        coordinates: d.coordinates ?? { lat: -1.286389, lng: 36.817223 },
        address: `${d.region}, Kenya`,
        openStatus: '8:00 AM - 6:00 PM',
        phone: '+254 800 720 024',
        icon: '🦁'
      })),
      ...HOTELS.map((h) => ({
        id: `hotel-${h.id}`,
        name: h.name,
        category: 'hotel' as const,
        description: `${h.type} in ${h.location}`,
        distanceKm: calculateDistance(userLat, userLng, h.coordinates?.lat ?? -1.286389, h.coordinates?.lng ?? 36.817223),
        coordinates: h.coordinates ?? { lat: -1.286389, lng: 36.817223 },
        address: h.location,
        openStatus: '24 Hours Open',
        phone: h.contact?.phone || '+254 20 272 4000',
        icon: '🏨'
      })),
      ...RESTAURANTS.map((r) => ({
        id: `rest-${r.id}`,
        name: r.name,
        category: 'restaurant' as const,
        description: `${r.cuisine} - ${r.priceRange}`,
        distanceKm: calculateDistance(userLat, userLng, r.coordinates?.lat || -1.286389, r.coordinates?.lng || 36.817223),
        coordinates: r.coordinates || { lat: -1.286389, lng: 36.817223 },
        address: r.location,
        openStatus: r.openingHours,
        phone: r.phone,
        icon: '🍽️'
      }))
    ];

    return list.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [userLat, userLng]);

  const categories = [
    { id: 'all', label: 'All Places', icon: '📍' },
    { id: 'hospital', label: 'Hospitals & Medical', icon: '🏥' },
    { id: 'police', label: 'Tourist Police & Safety', icon: '👮' },
    { id: 'atm', label: 'ATMs & Forex M-PESA', icon: '🏧' },
    { id: 'restaurant', label: 'Restaurants & Food', icon: '🍽️' },
    { id: 'hotel', label: 'Hotels & Lodges', icon: '🏨' },
    { id: 'sim', label: 'Safaricom SIM / eSIM', icon: '📶' },
    { id: 'transport', label: 'Transport & Taxis', icon: '🚕' },
    { id: 'attraction', label: 'Attractions & Parks', icon: '🦁' }
  ];

  const filteredPlaces = allPlacesWithDistance.filter((p) => {
    if (emergencyOnly) {
      return (p.category === 'hospital' || p.category === 'police') && (p.distanceKm || 0) <= maxDistanceKm;
    }
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesDistance = (p.distanceKm || 0) <= maxDistanceKm;
    return matchesCategory && matchesDistance;
  });

  return (
    <section id="near-me-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Navigation className="w-3.5 h-3.5" />
                <span>Live GPS Radar</span>
              </span>
              {userLocation?.granted && (
                <span className="text-xs text-stone-400 font-mono">
                  GPS: {userLat.toFixed(3)}°, {userLng.toFixed(3)}°
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Explore Around You
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
              Locate nearby tourist police units, level 5 hospitals, ATMs, Safaricom SIM centers, dining, and scenic hotspots.
            </p>
          </div>

          {/* Location Trigger & Quick Emergency Toggle */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
            <button
              id="btn-detect-gps"
              onClick={requestLocation}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>{userLocation?.granted ? 'Update GPS' : 'Detect My Location'}</span>
            </button>

            <button
              id="btn-emergency-radar-filter"
              onClick={() => setEmergencyOnly(!emergencyOnly)}
              className={`text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all ${
                emergencyOnly
                  ? 'bg-red-600 text-white shadow-lg shadow-red-950/60 ring-2 ring-red-400'
                  : 'bg-stone-800 text-red-400 hover:bg-stone-700 border border-red-900/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{emergencyOnly ? 'Showing Emergency Only' : 'Emergency Fast Filter'}</span>
            </button>

            <button
              id="btn-open-full-map-from-radar"
              onClick={() => setTab('explore-map')}
              className="bg-[#f85a5a] hover:bg-[#e04848] text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Full 47-County Map & Route Planner →</span>
            </button>
          </div>
        </div>

        {/* City Switcher Presets */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <span className="text-stone-400 text-[11px] uppercase font-bold shrink-0">Simulate Area:</span>
          {cityPresets.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                // Manually trigger location coordinates
                window.dispatchEvent(
                  new CustomEvent('set-custom-location', { detail: city })
                );
              }}
              className="bg-stone-800/80 hover:bg-stone-700 text-stone-300 px-3 py-1 rounded-lg border border-stone-700 whitespace-nowrap text-[11px]"
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Filter Controls & Distance Slider */}
        <div className="bg-stone-800/60 rounded-2xl p-4 border border-stone-700/60 mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCategory(c.id);
                  setEmergencyOnly(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === c.id && !emergencyOnly
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'bg-stone-900/80 text-stone-300 hover:bg-stone-700 border border-stone-700/50'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Radius Slider */}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-700/50">
            <div className="flex items-center gap-3">
              <span className="text-stone-400 font-medium">Search Radius:</span>
              <input
                type="range"
                min="1"
                max="100"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                aria-label="Adjust nearby search radius in kilometers"
                className="w-36 accent-amber-500 cursor-pointer"
              />
              <span className="font-bold text-amber-400">{maxDistanceKm} km</span>
            </div>

            <span className="text-stone-400 font-medium">
              Found <strong className="text-white">{filteredPlaces.length}</strong> services nearby
            </span>
          </div>
        </div>

        {/* Interactive Layout: Radar Map on Left + Place List on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Radar Visualization / Interactive SVG Map (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-3xl p-6 border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
            {/* Background Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-80 h-80 rounded-full border border-emerald-500/40 animate-ping duration-1000" />
              <div className="w-64 h-64 rounded-full border border-amber-500/40 absolute" />
              <div className="w-44 h-44 rounded-full border border-amber-500/30 absolute" />
              <div className="w-24 h-24 rounded-full border border-amber-500/20 absolute" />
            </div>

            {/* User Center Pin */}
            <div className="relative z-10 flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shadow-lg shadow-emerald-500/50 animate-pulse">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="mt-2 text-xs font-bold text-emerald-400 bg-stone-900/90 px-2.5 py-0.5 rounded-full border border-emerald-800">
                You Are Here
              </span>
            </div>

            {/* Surrounding Nearby Pins */}
            <div className="relative z-10 w-full grid grid-cols-2 gap-2 text-xs">
              {filteredPlaces.slice(0, 4).map((place) => (
                <div
                  key={place.id}
                  onClick={() => setActivePlace(place)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    activePlace?.id === place.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{place.icon || '📍'}</span>
                    <span className="text-[10px] font-bold text-amber-400">
                      {place.distanceKm} km
                    </span>
                  </div>
                  <p className="font-bold text-xs truncate text-white">{place.name}</p>
                  <p className="text-[10px] text-stone-400 truncate">{place.category}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[10px] text-stone-500 text-center">
              Real-time proximity matrix calibrated for Kenyan roads & coordinates
            </p>
          </div>

          {/* Place List Results (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredPlaces.length === 0 ? (
              <div className="bg-stone-800/40 rounded-2xl p-8 text-center border border-stone-700/60">
                <p className="text-stone-400 text-sm">
                  No places found within {maxDistanceKm} km. Try increasing the search radius slider above.
                </p>
              </div>
            ) : (
              filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  id={`near-place-${place.id}`}
                  onClick={() => setActivePlace(place)}
                  className="group bg-stone-800/70 hover:bg-stone-800 rounded-2xl p-4 border border-stone-700/70 hover:border-amber-500/50 transition-all flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                      {place.icon || '📍'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {place.name}
                        </h4>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-900 text-stone-400">
                          {place.category}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 line-clamp-1">{place.description}</p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                        <span>📍 {place.address}</span>
                        {place.openStatus && <span>🕒 {place.openStatus}</span>}
                        {place.phone && (
                          <span className="text-emerald-400 font-mono font-semibold">
                            📞 {place.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex flex-col items-end justify-between">
                    <div className="bg-amber-500/20 text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-500/30 mb-2">
                      {place.distanceKm} km away
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates?.lat ?? place.coords?.lat ?? -1.286389},${place.coordinates?.lng ?? place.coords?.lng ?? 36.817223}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-bold text-stone-300 hover:text-amber-400 flex items-center gap-1 bg-stone-900 px-3 py-1 rounded-lg border border-stone-700"
                    >
                      <span>Get Route</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Place Details Quick Popup */}
      {activePlace && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-3xl max-w-md w-full p-6 border border-stone-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activePlace.icon || '📍'}</span>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">{activePlace.name}</h3>
                  <span className="text-[10px] text-amber-400 uppercase">{activePlace.category}</span>
                </div>
              </div>
              <button onClick={() => setActivePlace(null)} className="text-stone-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <p>{activePlace.description}</p>
              <div className="bg-stone-800 p-3 rounded-xl space-y-1">
                <div><strong>Address:</strong> {activePlace.address}</div>
                <div><strong>Distance:</strong> {activePlace.distanceKm} km from current GPS point</div>
                {activePlace.phone && <div><strong>Phone / Hotline:</strong> {activePlace.phone}</div>}
                {activePlace.openStatus && <div><strong>Hours:</strong> {activePlace.openStatus}</div>}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={`tel:${activePlace.phone}`}
                className="flex-1 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs py-2.5 rounded-xl text-center border border-stone-700"
              >
                Call Hotline
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activePlace.coordinates?.lat ?? activePlace.coords?.lat ?? -1.286389},${activePlace.coordinates?.lng ?? activePlace.coords?.lng ?? 36.817223}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs py-2.5 rounded-xl text-center"
              >
                Start Navigation
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
