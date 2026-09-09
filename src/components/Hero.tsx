import React, { useState } from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { Search, ChevronDown, Utensils, Hotel, MapPin, ShoppingBag, Compass } from 'lucide-react';
import { FloatingFeatureCards } from './FloatingFeatureCards';

export const Hero: React.FC = () => {
  const { setTab, setSearchFilter, requestLocation } = useApp();
  const [query, setQuery] = useState('');
  const [locationSelect, setLocationSelect] = useState('Where');

  // Exact tropical turquoise beach with wooden canoe/boat matching site 1.jpg
  const heroImage = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2400&q=90';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSearch = `${query} ${locationSelect !== 'Where' && locationSelect !== 'All Kenya' ? locationSelect : ''}`.trim();
    setSearchFilter(finalSearch);

    const q = query.toLowerCase();
    if (q.includes('package') || q.includes('naivasha')) {
      setTab('packages');
    } else if (q.includes('safari') || q.includes('mara') || q.includes('tour')) {
      setTab('safaris');
    } else if (q.includes('hotel') || q.includes('stay') || q.includes('resort') || q.includes('camp')) {
      setTab('hotels');
    } else if (q.includes('food') || q.includes('restaurant') || q.includes('nyama') || q.includes('eat')) {
      setTab('food');
    } else {
      setTab('explore');
    }
  };

  const highlightPills: { label: string; tab: AppTab; icon: React.ReactNode }[] = [
    { label: 'Travel Packages', tab: 'packages', icon: <Compass className="w-4 h-4 text-stone-500" /> },
    { label: 'Restaurant', tab: 'food', icon: <Utensils className="w-4 h-4 text-stone-500" /> },
    { label: 'Hotel', tab: 'hotels', icon: <Hotel className="w-4 h-4 text-stone-500" /> },
    { label: 'Places', tab: 'explore', icon: <MapPin className="w-4 h-4 text-stone-500" /> },
    { label: 'Shopping', tab: 'deals', icon: <ShoppingBag className="w-4 h-4 text-stone-500" /> }
  ];

  return (
    <div className="relative w-full text-white">
      {/* Hero Header Area with Background Image from site 1.jpg */}
      <div className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between pb-28 sm:pb-36 lg:pb-44 overflow-hidden">
        {/* Background Image: Tropical turquoise ocean, palm island, bright blue sky, wooden outrigger boat */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: 'center 40%'
          }}
        >
          {/* Subtle gentle overlay to ensure perfect readability while retaining bright vivid turquoise vibrancy */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
          <div className="absolute inset-0 bg-sky-950/15 mix-blend-multiply" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 w-full">
          {/* Main Title: "Explore / your amazing city (Kenya)" */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-3xl mb-4 font-sans drop-shadow-md">
            Explore <br />
            your amazing Kenya
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-white/95 font-medium max-w-2xl leading-relaxed mb-8 sm:mb-10 drop-shadow">
            Find great places to stay, eat, shop, or visit from local experts
          </p>

          {/* Kenya Discovery Search Bar */}
          <div className="w-full max-w-3xl bg-white text-stone-900 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-2xl">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              {/* Input 1: Text query */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-transparent">
                <input
                  id="hero-input-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: food, service, hotel, safari"
                  className="w-full bg-transparent text-sm sm:text-base text-stone-800 font-medium focus:outline-none placeholder:text-stone-400"
                />
              </div>

              {/* Vertical divider on desktop */}
              <div className="hidden sm:block w-[1px] h-8 bg-stone-200" />

              {/* Input 2: Location selector */}
              <div className="w-full sm:w-52 relative flex items-center px-4 py-3 bg-transparent cursor-pointer">
                <select
                  id="hero-select-region"
                  value={locationSelect}
                  onChange={(e) => setLocationSelect(e.target.value)}
                  aria-label="Filter location"
                  className="w-full bg-transparent text-sm sm:text-base text-stone-700 font-medium focus:outline-none appearance-none cursor-pointer pr-6"
                >
                  <option value="Where">Where</option>
                  <option value="All Kenya">All Kenya</option>
                  <option value="Maasai Mara">Maasai Mara</option>
                  <option value="Diani Beach">Diani Beach & Coast</option>
                  <option value="Nairobi">Nairobi City</option>
                  <option value="Amboseli">Amboseli</option>
                  <option value="Lake Nakuru">Lake Nakuru & Naivasha</option>
                  <option value="Mount Kenya">Mount Kenya</option>
                  <option value="Lamu Island">Lamu Island</option>
                  <option value="Samburu">Samburu</option>
                </select>
                <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 pointer-events-none" />
              </div>

              {/* Search Submit Button: Bright Coral Red #f85a5a */}
              <button
                id="hero-btn-search"
                type="submit"
                className="w-full sm:w-36 bg-[#f85a5a] hover:bg-[#e04848] text-white font-bold text-base py-3 px-6 rounded-lg sm:rounded-xl shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 active:scale-98"
              >
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* "Or browse the highlights" + White Pill Cards */}
          <div className="mt-8">
            <p className="text-sm font-medium text-white/90 mb-3 drop-shadow">
              Or browse the highlights
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {highlightPills.map((pill) => (
                <button
                  key={pill.label}
                  id={`pill-highlight-${pill.label.toLowerCase()}`}
                  onClick={() => setTab(pill.tab)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/95 hover:bg-white text-stone-800 hover:text-[#f85a5a] text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  {pill.icon}
                  <span>{pill.label}</span>
                </button>
              ))}

              {/* Safari / Wildlife Quick Highlight */}
              <button
                id="pill-highlight-safari"
                onClick={() => setTab('safaris')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/95 hover:bg-white text-stone-800 hover:text-[#f85a5a] text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>🦁</span>
                <span>Safari</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Overlapping Feature Cards Resting between Hero & Body */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 lg:-mt-28 mb-12">
        <FloatingFeatureCards />
      </div>
    </div>
  );
};

