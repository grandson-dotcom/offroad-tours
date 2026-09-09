import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ALL_KENYA_COUNTIES,
  KENYA_GEO_LOCATIONS,
  KenyaCounty,
  GeoLocationRecord,
  searchKenyaLocations,
  haversineDistanceKm,
  estimateRealisticTravelTimes
} from '../data/kenyaGeoData';
import { GoogleMapCanvas } from './maps/GoogleMapCanvas';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Compass,
  Navigation,
  Search,
  SlidersHorizontal,
  Route as RouteIcon,
  Shield,
  Phone,
  Clock,
  Car,
  Footprints,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  Layers,
  Sparkles,
  AlertTriangle,
  Info,
  X,
  Plus,
  Trash2,
  Share2,
  Download,
  Wifi,
  WifiOff,
  Plane,
  Eye,
  Filter
} from 'lucide-react';

export const ExploreKenyaMap: React.FC = () => {
  const { setTab } = useApp();

  // Active view: 'map' | 'list' | 'planner' | 'calculator'
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'list' | 'planner' | 'calculator'>('map');

  // Filters state
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Map state
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number }>({
    lat: 0.1769,
    lng: 37.9083 // Kenya Geographic Center
  });
  const [zoomLevel, setZoomLevel] = useState<number>(7);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  // Selected Location for details drawer/modal
  const [selectedLocation, setSelectedLocation] = useState<GeoLocationRecord | null>(null);
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);

  // GPS User Location state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [nearMeRadiusKm, setNearMeRadiusKm] = useState<number>(25);
  const [isNearMeActive, setIsNearMeActive] = useState<boolean>(false);

  // Privacy & Sharing
  const [shareLocationOptIn, setShareLocationOptIn] = useState<boolean>(false);
  const [shareLinkCopied, setShareLinkCopied] = useState<boolean>(false);

  // Offline Caching State
  const [isOfflineCached, setIsOfflineCached] = useState<boolean>(() => {
    return localStorage.getItem('kenya_offline_locations_cached') === 'true';
  });
  const [cacheNotice, setCacheNotice] = useState<string | null>(null);

  // Multi-Stop Route Planner State
  const [routeWaypoints, setRouteWaypoints] = useState<GeoLocationRecord[]>([
    KENYA_GEO_LOCATIONS.find((l) => l.id === 'nbi-jkia') || KENYA_GEO_LOCATIONS[0],
    KENYA_GEO_LOCATIONS.find((l) => l.id === 'nak-lake-naivasha') || KENYA_GEO_LOCATIONS[1],
    KENYA_GEO_LOCATIONS.find((l) => l.id === 'nar-maasai-mara') || KENYA_GEO_LOCATIONS[2]
  ]);

  // "How Far?" Calculator State
  const [calcOriginId, setCalcOriginId] = useState<string>('nbi-jkia');
  const [calcDestId, setCalcDestId] = useState<string>('nar-maasai-mara');

  // County Inspector Drawer State
  const [inspectingCounty, setInspectingCounty] = useState<KenyaCounty | null>(null);

  // Detect GPS on demand
  const handleRequestGps = () => {
    setGpsLoading(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserCoords(coords);
        setGpsLoading(false);
        setIsNearMeActive(true);
        // Center map on user
        setCenterCoords(coords);
        setZoomLevel(11);
      },
      (error) => {
        setGpsLoading(false);
        // If simulated or permission denied, set graceful fallback (Nairobi CBD) with prompt
        console.warn('Geolocation error:', error);
        setGpsError('Unable to retrieve your current location. Please check browser permissions.');
        // Set fallback to Nairobi CBD so user can test "Near Me" features
        const nairobiFallback = { lat: -1.286389, lng: 36.817223 };
        setUserCoords(nairobiFallback);
        setIsNearMeActive(true);
        setCenterCoords(nairobiFallback);
        setZoomLevel(11);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleClearGps = () => {
    setUserCoords(null);
    setIsNearMeActive(false);
    setGpsError(null);
    setCenterCoords({ lat: 0.1769, lng: 37.9083 });
    setZoomLevel(7);
  };

  // Offline Caching Handler
  const handleToggleOfflineCache = () => {
    if (isOfflineCached) {
      localStorage.removeItem('kenya_offline_locations_cached');
      localStorage.removeItem('kenya_cached_pois');
      setIsOfflineCached(false);
      setCacheNotice('Offline cache cleared.');
    } else {
      try {
        localStorage.setItem('kenya_offline_locations_cached', 'true');
        localStorage.setItem(
          'kenya_cached_pois',
          JSON.stringify(KENYA_GEO_LOCATIONS.slice(0, 50))
        );
        setIsOfflineCached(true);
        setCacheNotice('Saved key locations & emergency hubs for offline use.');
      } catch (e) {
        setCacheNotice('Storage quota exceeded.');
      }
    }
    setTimeout(() => setCacheNotice(null), 3500);
  };

  // Filter Locations
  const filteredLocations = useMemo(() => {
    let list = KENYA_GEO_LOCATIONS;

    // Search query takes precedence
    if (searchQuery.trim().length > 0) {
      list = searchKenyaLocations(searchQuery);
    }

    // County filter
    if (selectedCounty !== 'all') {
      list = list.filter(
        (loc) => loc.county.toLowerCase() === selectedCounty.toLowerCase()
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((loc) => loc.category === selectedCategory);
    }

    // Near Me Radius filter
    if (isNearMeActive && userCoords) {
      list = list.filter((loc) => {
        const dist = haversineDistanceKm(
          userCoords.lat,
          userCoords.lng,
          loc.coordinates.lat,
          loc.coordinates.lng
        );
        return dist <= nearMeRadiusKm;
      });
      // Sort nearest first
      list.sort((a, b) => {
        const distA = haversineDistanceKm(
          userCoords.lat,
          userCoords.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distB = haversineDistanceKm(
          userCoords.lat,
          userCoords.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distA - distB;
      });
    }

    return list;
  }, [selectedCounty, selectedCategory, searchQuery, isNearMeActive, userCoords, nearMeRadiusKm]);

  // Handle County Selection
  const handleSelectCounty = (countyName: string) => {
    setSelectedCounty(countyName);
    if (countyName === 'all') {
      setCenterCoords({ lat: 0.1769, lng: 37.9083 });
      setZoomLevel(7);
      setInspectingCounty(null);
    } else {
      const county = ALL_KENYA_COUNTIES.find(
        (c) => c.name.toLowerCase() === countyName.toLowerCase()
      );
      if (county) {
        setCenterCoords(county.center);
        setZoomLevel(county.zoom || 9);
        setInspectingCounty(county);
      }
    }
  };

  // Handle Selecting a Location
  const handleSelectLocation = (loc: GeoLocationRecord) => {
    setSelectedLocation(loc);
    setCenterCoords(loc.coordinates);
    setZoomLevel(12);
  };

  // Copy Coordinates to Clipboard
  const handleCopyCoords = (lat: number, lng: number) => {
    navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Share Live Location Link
  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/#map-share?lat=${userCoords?.lat || 0}&lng=${userCoords?.lng || 0}&t=${Date.now()}`;
    navigator.clipboard.writeText(shareUrl);
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 2500);
  };

  // Route Planning Calculations
  const routeCalculations = useMemo(() => {
    if (routeWaypoints.length < 2) {
      return { totalDistKm: 0, totalHours: 0, legs: [], feasibilityNotice: null };
    }

    let totalDistKm = 0;
    const legs = [];

    for (let i = 0; i < routeWaypoints.length - 1; i++) {
      const start = routeWaypoints[i];
      const end = routeWaypoints[i + 1];
      const dist = haversineDistanceKm(
        start.coordinates.lat,
        start.coordinates.lng,
        end.coordinates.lat,
        end.coordinates.lng
      );
      const times = estimateRealisticTravelTimes(dist);
      totalDistKm += dist;
      legs.push({
        from: start.name,
        to: end.name,
        distanceKm: dist,
        drivingTime: times.drivingFormatted,
        roughRoadNotice: dist > 150 ? 'Corrugated or unpaved bush tracks may apply. 4x4 recommended.' : null
      });
    }

    const totalTimes = estimateRealisticTravelTimes(totalDistKm);
    const drivingHours = totalTimes.drivingTimeMinutes / 60;

    // Schedule feasibility analysis
    let feasibilityNotice = null;
    if (drivingHours > 8) {
      feasibilityNotice = {
        level: 'warning',
        title: 'Long Driving Schedule Detected',
        text: `Total estimated road time is ${totalTimes.drivingFormatted} (${Math.round(totalDistKm)} km). In Kenya, long highway drives can cause safari fatigue. We recommend breaking this journey with an overnight stopover or considering a domestic safari flight.`
      };
    } else if (drivingHours <= 4) {
      feasibilityNotice = {
        level: 'optimal',
        title: 'Optimal Day Excursion Schedule',
        text: `Total travel time is ${totalTimes.drivingFormatted} (${Math.round(totalDistKm)} km). This route leaves ample daylight for game drives, scenery stops, and meals.`
      };
    } else {
      feasibilityNotice = {
        level: 'moderate',
        title: 'Full Day Safari Itinerary',
        text: `Total travel time is ${totalTimes.drivingFormatted} (${Math.round(totalDistKm)} km). Plan for a mid-route rest stop (such as Narok, Mtito Andei, or Nanyuki) for refreshments.`
      };
    }

    return { totalDistKm, totalHours: drivingHours, legs, feasibilityNotice };
  }, [routeWaypoints]);

  // "How Far?" Calculation Results
  const calcOrigin = useMemo(
    () => KENYA_GEO_LOCATIONS.find((l) => l.id === calcOriginId) || KENYA_GEO_LOCATIONS[0],
    [calcOriginId]
  );
  const calcDest = useMemo(
    () => KENYA_GEO_LOCATIONS.find((l) => l.id === calcDestId) || KENYA_GEO_LOCATIONS[2],
    [calcDestId]
  );
  const howFarResult = useMemo(() => {
    if (!calcOrigin || !calcDest) return null;
    const dist = haversineDistanceKm(
      calcOrigin.coordinates.lat,
      calcOrigin.coordinates.lng,
      calcDest.coordinates.lat,
      calcDest.coordinates.lng
    );
    const times = estimateRealisticTravelTimes(dist);
    return {
      distanceKm: Math.round(dist * 10) / 10,
      roadEstimateKm: Math.round(dist * 1.25),
      drivingTime: times.drivingFormatted,
      walkingTime: times.walkingFormatted,
      isWalkable: dist <= 5,
      roughRoadNotice: dist > 180 ? 'Terrain may feature corrugated marram tracks. Heavy duty 4x4 or flight recommended.' : null,
      flightSuggested: times.isFlyRecommended
    };
  }, [calcOrigin, calcDest]);

  // Categories list with counts
  const categoriesList = [
    { id: 'all', label: 'All Places', icon: '📍' },
    { id: 'park', label: 'Safaris & Parks', icon: '🦁' },
    { id: 'beach', label: 'Beaches & Coast', icon: '🏖️' },
    { id: 'mountain', label: 'Mountains & Hiking', icon: '⛰️' },
    { id: 'hotel', label: 'Hotels & Lodges', icon: '🏨' },
    { id: 'restaurant', label: 'Restaurants & Dining', icon: '🍽️' },
    { id: 'town', label: 'Cities & Towns', icon: '🏙️' },
    { id: 'airport', label: 'Airports & Airstrips', icon: '✈️' },
    { id: 'transport', label: 'SGR & Transport', icon: '🚆' },
    { id: 'hospital', label: 'Hospitals & Medical', icon: '🏥' },
    { id: 'police', label: 'Tourist Police', icon: '🛡️' },
    { id: 'fuel', label: 'Fuel & 24/7 Stops', icon: '⛽' },
    { id: 'viewpoint', label: 'Viewpoints & Lakes', icon: '🌅' },
    { id: 'culture', label: 'Culture & Heritage', icon: '🏛️' }
  ];

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen text-stone-900 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-[#1e2a38] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f85a5a]/20 text-[#f85a5a] text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="w-3.5 h-3.5" />
                <span>Geographic Knowledge Base • 47 Counties of Kenya</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Explore Kenya Map & Navigation
              </h1>
              <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Complete interactive map covering every county, national park, beach, town, hotel,
                hospital, police post, and transport hub with GPS distance and realistic travel times.
              </p>
            </div>

            {/* Quick GPS & Cache Tools */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="btn-gps-near-me"
                onClick={handleRequestGps}
                disabled={gpsLoading}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
                  isNearMeActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Navigation className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
                <span>{gpsLoading ? 'Locating...' : isNearMeActive ? 'GPS Active (Near Me)' : 'Find My Location'}</span>
              </button>

              <button
                id="btn-offline-cache-toggle"
                onClick={handleToggleOfflineCache}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md ${
                  isOfflineCached
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                title="Save critical travel coordinates to local storage for offline use"
              >
                {isOfflineCached ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span>{isOfflineCached ? 'Offline Cache Ready' : 'Cache For Offline'}</span>
              </button>
            </div>
          </div>

          {/* Alert / Notice Bar */}
          {cacheNotice && (
            <div className="mt-4 p-3 bg-emerald-900/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{cacheNotice}</span>
            </div>
          )}

          {gpsError && (
            <div className="mt-4 p-3 bg-amber-900/80 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{gpsError} (Defaulted to Nairobi CBD for demonstration).</span>
              </div>
              <button
                onClick={() => setGpsError(null)}
                className="text-amber-300 hover:text-white text-xs underline"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Sub-Nav & Mode Switcher */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                id="tab-sub-map"
                onClick={() => setActiveSubTab('map')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSubTab === 'map'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Interactive Map
              </button>
              <button
                id="tab-sub-list"
                onClick={() => setActiveSubTab('list')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSubTab === 'list'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Directory List ({filteredLocations.length})
              </button>
              <button
                id="tab-sub-planner"
                onClick={() => setActiveSubTab('planner')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'planner'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <RouteIcon className="w-3.5 h-3.5 text-[#f85a5a]" />
                <span>Trip Route Planner</span>
              </button>
              <button
                id="tab-sub-calculator"
                onClick={() => setActiveSubTab('calculator')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'calculator'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>"How Far?" Calculator</span>
              </button>
            </div>

            {/* County Quick Filter Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
                <span>County:</span>
                <select
                  id="select-kenya-county"
                  value={selectedCounty}
                  onChange={(e) => handleSelectCounty(e.target.value)}
                  className="bg-stone-50 border border-stone-300 text-stone-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#f85a5a]"
                >
                  <option value="all">All 47 Counties of Kenya</option>
                  {ALL_KENYA_COUNTIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.code}. {c.name} ({c.capital})
                    </option>
                  ))}
                </select>
              </div>

              {/* Map Style Toggle */}
              {activeSubTab === 'map' && (
                <div className="hidden sm:flex items-center gap-1 border-l border-stone-200 pl-3">
                  <button
                    onClick={() => setMapType('roadmap')}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
                      mapType === 'roadmap'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Map
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium ${
                      mapType === 'satellite'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar & Near-Me Controls */}
          <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="input-explore-search"
                type="text"
                placeholder="Search any place in Kenya (e.g. Maasai Mara, Diani, Hell's Gate, Wilson Airport, Naivasha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f85a5a] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {isSearchFocused && searchQuery.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-2xl z-40 max-h-64 overflow-y-auto divide-y divide-stone-100">
                  {filteredLocations.slice(0, 8).map((loc) => (
                    <div
                      key={loc.id}
                      onMouseDown={() => {
                        handleSelectLocation(loc);
                        setSearchQuery(loc.name);
                      }}
                      className="p-2.5 hover:bg-stone-50 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#f85a5a]" />
                        <div>
                          <div className="text-xs font-semibold text-stone-800">{loc.name}</div>
                          <div className="text-[11px] text-stone-500">
                            {loc.town}, {loc.county} County
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 px-2 py-0.5 bg-stone-100 rounded">
                        {loc.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Near Me Radius Selector when GPS Active */}
            {isNearMeActive && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 shrink-0">
                <span className="font-semibold">Radius:</span>
                <select
                  value={nearMeRadiusKm}
                  onChange={(e) => setNearMeRadiusKm(Number(e.target.value))}
                  className="bg-white border border-blue-300 text-blue-900 rounded px-1.5 py-0.5 text-xs font-medium focus:outline-none"
                >
                  <option value={5}>5 km</option>
                  <option value={15}>15 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                  <option value={100}>100 km</option>
                </select>
                <button
                  onClick={handleClearGps}
                  className="ml-1 text-stone-500 hover:text-stone-800 text-[11px] underline"
                >
                  Clear GPS
                </button>
              </div>
            )}
          </div>

          {/* Categories Pill Bar */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* SUBTAB 1: Interactive Map View */}
        {activeSubTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Canvas Column (8 cols on lg) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="h-[580px] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                <GoogleMapCanvas
                  locations={filteredLocations}
                  selectedLocation={selectedLocation}
                  onSelectLocation={handleSelectLocation}
                  userCoords={userCoords}
                  centerCoords={centerCoords}
                  zoomLevel={zoomLevel}
                  mapType={mapType}
                />
              </div>

              {/* County Information Card if a specific county is active */}
              {inspectingCounty && (
                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 bg-stone-100 text-stone-700 rounded">
                        County #{inspectingCounty.code}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900">
                        {inspectingCounty.name} County
                      </h3>
                      <span className="text-xs text-stone-500">
                        Capital: {inspectingCounty.capital}
                      </span>
                    </div>
                    <button
                      onClick={() => setInspectingCounty(null)}
                      className="text-xs text-stone-400 hover:text-stone-700"
                    >
                      Close Card
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <div className="font-semibold text-stone-800 mb-1">🦁 Wildlife & Safari:</div>
                      <p>{inspectingCounty.signatureWildlife.join(', ')}</p>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <div className="font-semibold text-stone-800 mb-1">🏞️ Highlights:</div>
                      <p>{inspectingCounty.highlights.join(' • ')}</p>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <div className="font-semibold text-stone-800 mb-1">🛡️ Safety & Travel Tips:</div>
                      <p>{inspectingCounty.safetyAdvice}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Details Inspector Sidebar (4 cols on lg) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {selectedLocation ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm sticky top-24">
                  {/* Photo & Category Badge */}
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <img
                      src={selectedLocation.photoUrl}
                      alt={selectedLocation.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-lg">
                      {selectedLocation.category}
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & County */}
                  <h3 className="text-xl font-bold text-stone-900 leading-tight">
                    {selectedLocation.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#f85a5a]" />
                    <span>
                      {selectedLocation.town}, {selectedLocation.county} County
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                    {selectedLocation.description}
                  </p>

                  {/* Distance & Travel Time from User if GPS active */}
                  {userCoords && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="text-xs font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-blue-600" />
                        <span>Distance From Your Location:</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-blue-800">
                        <span>
                          {haversineDistanceKm(
                            userCoords.lat,
                            userCoords.lng,
                            selectedLocation.coordinates.lat,
                            selectedLocation.coordinates.lng
                          ).toFixed(1)}{' '}
                          km direct
                        </span>
                        <div className="flex items-center gap-2 font-medium">
                          <span className="flex items-center gap-1">
                            <Car className="w-3 h-3" />
                            {
                              estimateRealisticTravelTimes(
                                haversineDistanceKm(
                                  userCoords.lat,
                                  userCoords.lng,
                                  selectedLocation.coordinates.lat,
                                  selectedLocation.coordinates.lng
                                )
                              ).drivingFormatted
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Coordinates & Copy */}
                  <div className="mt-3 flex items-center justify-between p-2.5 bg-stone-50 rounded-xl text-xs text-stone-600">
                    <div className="font-mono text-[11px]">
                      {selectedLocation.coordinates.lat.toFixed(4)},{' '}
                      {selectedLocation.coordinates.lng.toFixed(4)}
                    </div>
                    <button
                      onClick={() =>
                        handleCopyCoords(
                          selectedLocation.coordinates.lat,
                          selectedLocation.coordinates.lng
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#f85a5a] hover:underline"
                    >
                      {copiedCoords ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCoords ? 'Copied' : 'Copy Coords'}</span>
                    </button>
                  </div>

                  {/* Operational Details Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {selectedLocation.entryFeeUsd !== undefined && (
                      <div className="p-2 bg-stone-50 rounded-lg">
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Entry Fee</div>
                        <div className="font-semibold text-stone-800">
                          {selectedLocation.entryFeeUsd === 0
                            ? 'Free'
                            : `$${selectedLocation.entryFeeUsd} (KES ${selectedLocation.entryFeeKes?.toLocaleString()})`}
                        </div>
                      </div>
                    )}
                    {selectedLocation.openingHours && (
                      <div className="p-2 bg-stone-50 rounded-lg">
                        <div className="text-[10px] text-stone-400 font-bold uppercase">Hours</div>
                        <div className="font-semibold text-stone-800 truncate">
                          {selectedLocation.openingHours}
                        </div>
                      </div>
                    )}
                    {selectedLocation.phone && (
                      <div className="p-2 bg-stone-50 rounded-lg col-span-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-stone-700">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{selectedLocation.phone}</span>
                        </div>
                        <a
                          href={`tel:${selectedLocation.phone}`}
                          className="text-[11px] font-medium text-emerald-600 hover:underline"
                        >
                          Call Now
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Safety Advice */}
                  {selectedLocation.safetyAdvice && (
                    <div className="mt-3 p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">{selectedLocation.safetyAdvice}</p>
                    </div>
                  )}

                  {/* Navigation Action Buttons */}
                  <div className="mt-5 flex flex-col gap-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#f85a5a] hover:bg-[#e04848] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Navigate via Google Maps App</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>

                    <button
                      onClick={() => {
                        // Add to route planner
                        if (!routeWaypoints.find((w) => w.id === selectedLocation.id)) {
                          setRouteWaypoints([...routeWaypoints, selectedLocation]);
                        }
                        setActiveSubTab('planner');
                      }}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Trip Route Planner</span>
                    </button>

                    {/* Linked Travel Package shortcut */}
                    {selectedLocation.linkedPackageId && (
                      <button
                        onClick={() => setTab('packages')}
                        className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Book Safari Package for this Location</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-[#f85a5a]" />
                  </div>
                  <h4 className="font-bold text-stone-800 text-sm">Select Any Location Pin</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Click any marker on the map to inspect coordinates, opening hours, entry fees,
                    safety guidelines, realistic driving times, and direct navigation links.
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                      Popular Quick Hubs:
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {KENYA_GEO_LOCATIONS.slice(0, 6).map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => handleSelectLocation(loc)}
                          className="px-2.5 py-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700"
                        >
                          {loc.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy & Location Sharing Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Location Privacy & Emergency Sharing</span>
                  </div>
                </div>
                <p className="text-stone-500 leading-relaxed text-[11px]">
                  Your device GPS coordinates are processed purely client-side to calculate
                  distance and driving times. We never share your live coordinates unless you
                  explicitly generate a trusted contact share link.
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shareLocationOptIn}
                      onChange={(e) => setShareLocationOptIn(e.target.checked)}
                      className="rounded text-[#f85a5a] focus:ring-[#f85a5a]"
                    />
                    <span className="text-[11px] text-stone-700">Enable Trip Location Sharing</span>
                  </label>
                  {shareLocationOptIn && (
                    <button
                      onClick={handleCopyShareLink}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded-lg text-[11px]"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{shareLinkCopied ? 'Link Copied' : 'Copy Link'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: Directory List View */}
        {activeSubTab === 'list' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Kenya Points of Interest Directory
                </h3>
                <p className="text-xs text-stone-500">
                  Showing {filteredLocations.length} locations across Kenya with verified coordinates
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-stone-100 text-stone-700 rounded-lg">
                {selectedCounty === 'all' ? 'All Counties' : `${selectedCounty} County`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLocations.map((loc) => {
                const distFromUser =
                  userCoords &&
                  haversineDistanceKm(
                    userCoords.lat,
                    userCoords.lng,
                    loc.coordinates.lat,
                    loc.coordinates.lng
                  );

                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      handleSelectLocation(loc);
                      setActiveSubTab('map');
                    }}
                    className="p-4 rounded-xl border border-stone-200 hover:border-[#f85a5a] hover:shadow-md transition-all cursor-pointer bg-white group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                          {loc.category}
                        </span>
                        {distFromUser !== null && distFromUser !== undefined && (
                          <span className="text-xs font-semibold text-blue-600">
                            {distFromUser.toFixed(1)} km away
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-stone-900 group-hover:text-[#f85a5a] transition-colors line-clamp-1">
                        {loc.name}
                      </h4>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-[#f85a5a]" />
                        <span>
                          {loc.town}, {loc.county} County
                        </span>
                      </p>
                      <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {loc.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-stone-400">
                        {loc.coordinates.lat.toFixed(2)}, {loc.coordinates.lng.toFixed(2)}
                      </span>
                      <span className="text-xs font-semibold text-[#f85a5a] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View on Map</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBTAB 3: Multi-Stop Route Planner */}
        {activeSubTab === 'planner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Route Map Visualizer (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="h-[520px] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                <GoogleMapCanvas
                  locations={routeWaypoints}
                  selectedLocation={selectedLocation}
                  onSelectLocation={handleSelectLocation}
                  userCoords={userCoords}
                  centerCoords={routeWaypoints[0]?.coordinates || centerCoords}
                  zoomLevel={8}
                  routeWaypoints={routeWaypoints}
                />
              </div>

              {/* Feasibility Alert Card */}
              {routeCalculations.feasibilityNotice && (
                <div
                  className={`p-4 rounded-2xl border ${
                    routeCalculations.feasibilityNotice.level === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1">
                    {routeCalculations.feasibilityNotice.level === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{routeCalculations.feasibilityNotice.title}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {routeCalculations.feasibilityNotice.text}
                  </p>
                </div>
              )}
            </div>

            {/* Stops Configuration & Breakdown (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">Multi-Stop Route Builder</h3>
                    <p className="text-xs text-stone-500">
                      Assemble stops across Kenya and check schedule realism
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Add a suggested next stop
                      const unused = KENYA_GEO_LOCATIONS.find(
                        (l) => !routeWaypoints.some((w) => w.id === l.id)
                      );
                      if (unused) setRouteWaypoints([...routeWaypoints, unused]);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold shadow transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stop</span>
                  </button>
                </div>

                {/* Waypoints Sequence List */}
                <div className="mt-4 flex flex-col gap-2">
                  {routeWaypoints.map((stop, idx) => (
                    <div
                      key={`${stop.id}-${idx}`}
                      className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#f85a5a] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">{stop.name}</div>
                          <div className="text-[11px] text-stone-500">
                            {stop.town}, {stop.county}
                          </div>
                        </div>
                      </div>

                      {routeWaypoints.length > 2 && (
                        <button
                          onClick={() => {
                            setRouteWaypoints(routeWaypoints.filter((_, i) => i !== idx));
                          }}
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                          title="Remove stop"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Leg-by-Leg Details */}
                <div className="mt-5 border-t border-stone-100 pt-4">
                  <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Leg Distances & Driving Estimates:
                  </div>
                  <div className="flex flex-col gap-2 text-xs">
                    {routeCalculations.legs.map((leg, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-stone-50 rounded-lg border border-stone-100 flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between font-semibold text-stone-800">
                          <span>
                            Stop {i + 1} → Stop {i + 2}
                          </span>
                          <span className="text-[#f85a5a]">{leg.drivingTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-500 text-[11px]">
                          <span>
                            {leg.from} to {leg.to}
                          </span>
                          <span>{Math.round(leg.distanceKm)} km</span>
                        </div>
                        {leg.roughRoadNotice && (
                          <div className="text-[10px] text-amber-700 bg-amber-50 p-1 rounded font-medium">
                            ⚠️ {leg.roughRoadNotice}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total Summary */}
                <div className="mt-5 p-3.5 bg-stone-900 text-white rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs text-stone-400">Total Route Distance</div>
                    <div className="text-lg font-extrabold">
                      {Math.round(routeCalculations.totalDistKm)} km
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-stone-400">Estimated Driving</div>
                    <div className="text-lg font-extrabold text-[#f85a5a]">
                      {routeCalculations.totalHours.toFixed(1)} hrs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: "How Far?" Calculator */}
        {activeSubTab === 'calculator' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                Kenya Distance & Travel Time Calculator
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-lg mx-auto">
                Select any two points in Kenya to compute direct distance, estimated road mileage,
                realistic driving time, and travel recommendations.
              </p>
            </div>

            {/* Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Point of Origin (From):
                </label>
                <select
                  id="select-calc-origin"
                  value={calcOriginId}
                  onChange={(e) => setCalcOriginId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                >
                  {KENYA_GEO_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.county} County)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Destination (To):
                </label>
                <select
                  id="select-calc-dest"
                  value={calcDestId}
                  onChange={(e) => setCalcDestId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm text-stone-800 focus:ring-2 focus:ring-[#f85a5a] focus:outline-none"
                >
                  {KENYA_GEO_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.county} County)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Display */}
            {howFarResult && (
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-xs text-stone-500 font-medium">Direct Distance</div>
                    <div className="text-2xl font-extrabold text-stone-900 mt-1">
                      {howFarResult.distanceKm} km
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      ~{howFarResult.roadEstimateKm} km driving
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-xs text-stone-500 font-medium">Driving Time</div>
                    <div className="text-2xl font-extrabold text-[#f85a5a] mt-1">
                      {howFarResult.drivingTime}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      Realistic highway & safari speed
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-xs text-stone-500 font-medium">Recommended Mode</div>
                    <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center justify-center gap-1">
                      {howFarResult.flightSuggested ? (
                        <>
                          <Plane className="w-4 h-4" /> Safari Flight / 4x4
                        </>
                      ) : (
                        <>
                          <Car className="w-4 h-4" /> Safari Van / Cruiser
                        </>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {howFarResult.flightSuggested ? 'Distance > 240km' : 'Comfortable road trip'}
                    </div>
                  </div>
                </div>

                {howFarResult.roughRoadNotice && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{howFarResult.roughRoadNotice}</span>
                  </div>
                )}

                {/* Direct Google Directions Link */}
                <div className="mt-5 flex justify-center">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${calcOrigin?.coordinates.lat},${calcOrigin?.coordinates.lng}&destination=${calcDest?.coordinates.lat},${calcDest?.coordinates.lng}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#f85a5a]" />
                    <span>Get Live Turn-by-Turn Directions in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
