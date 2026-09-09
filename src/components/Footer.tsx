import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { ShieldAlert, Heart, Phone, Mail, MapPin, Globe, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setTab } = useApp();

  const handleNav = (targetTab: AppTab) => {
    setTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                ExploreKenya<span className="text-[#f85a5a]">.</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your trusted all-in-one companion for discovering wildlife safaris, booking beachfront stays, navigating Nairobi, ordering authentic Kenyan food, and accessing 24/7 tourist safety services.
            </p>

            {/* Swahili Proverb */}
            <div className="bg-stone-900/90 rounded-2xl p-3.5 border border-stone-800 text-xs">
              <p className="italic text-amber-300 font-serif">
                “Mgeni aje, mwenyeji apone.”
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                (Let the guest come, so the host may prosper — Swahili hospitality proverb)
              </p>
            </div>
          </div>

          {/* Quick Links 1: Discover */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Discover Kenya
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-amber-400 transition-colors">
                  Top Destinations & Parks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('safaris')} className="hover:text-amber-400 transition-colors">
                  Verified Safari Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hotels')} className="hover:text-amber-400 transition-colors">
                  Safari Lodges & Beach Resorts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('food')} className="hover:text-amber-400 transition-colors">
                  Authentic Kenyan Cuisine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-amber-400 transition-colors">
                  Photo & Wildlife Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Tourist Services */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Tourist Essentials
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('airport')} className="hover:text-amber-400 transition-colors">
                  ✈️ Just Landed / Airport Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('near-me')} className="hover:text-amber-400 transition-colors">
                  📍 Near Me GPS Radar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('planner')} className="hover:text-amber-400 transition-colors">
                  🗺️ Custom Trip Itinerary Builder
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('translator')} className="hover:text-amber-400 transition-colors">
                  🗣️ Swahili Audio Phrasebook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('currency-calc')} className="hover:text-amber-400 transition-colors">
                  💵 Currency & M-PESA Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('transport')} className="hover:text-amber-400 transition-colors">
                  🚕 SGR Train & 4x4 Transport
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 3: Safety & Business */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Safety & Partners
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNav('emergency')} className="text-red-400 font-bold hover:underline flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>24/7 Emergency Hub</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-amber-400 transition-colors">
                  Licensed KWS Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('business-portal')} className="text-emerald-400 font-bold hover:underline">
                  + Add Operator / Hotel Listing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-amber-400 transition-colors">
                  My Bookings & Offline Pack
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-stone-500 block">Tourist Police Unit Hotline:</span>
              <a href="tel:+254800720024" className="text-xs font-mono font-bold text-amber-400 hover:underline">
                📞 +254 800 720 024 (Toll-Free)
              </a>
            </div>
          </div>
        </div>

        {/* Official Tourism Partner Accreditation Badges */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-stone-300">In Official Partnership with:</span>
            <span className="bg-stone-900 px-3 py-1 rounded-lg border border-stone-800 text-stone-300">Magical Kenya 🇰🇪</span>
            <span className="bg-stone-900 px-3 py-1 rounded-lg border border-stone-800 text-stone-300">Kenya Wildlife Service (KWS)</span>
            <span className="bg-stone-900 px-3 py-1 rounded-lg border border-stone-800 text-stone-300">Tourism Regulatory Authority (TRA)</span>
            <span className="bg-stone-900 px-3 py-1 rounded-lg border border-stone-800 text-stone-300">AMREF Flying Doctors</span>
          </div>

          <div className="text-stone-500">
            SSL 256-Bit Encrypted & PCI-DSS Compliant Cashless Booking
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Explore Kenya. Built for international and domestic tourists visiting Kenya.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('emergency')} className="hover:text-stone-300">Privacy & Data Security</button>
            <span>•</span>
            <button onClick={() => handleNav('emergency')} className="hover:text-stone-300">Terms of Safari Service</button>
            <span>•</span>
            <button onClick={() => handleNav('emergency')} className="hover:text-stone-300">Conservation Rules</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
