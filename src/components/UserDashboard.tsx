import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS, HOTELS, SAFARIS } from '../data/kenyaData';
import {
  Heart,
  Calendar,
  Ticket,
  MapPin,
  Download,
  Trash2,
  Share2,
  Printer,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    user,
    bookings,
    favorites,
    toggleFavorite,
    formatPrice,
    setTab,
    activeItinerary,
    isOffline,
    downloadOfflinePack,
    offlinePackDownloaded
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'itinerary' | 'offline'>('bookings');

  // Look up favorite items
  const favoriteDestinations = DESTINATIONS.filter((d) => favorites.includes(d.id));

  return (
    <section id="user-dashboard-section" className="py-16 bg-stone-50 text-stone-900 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Banner */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-stone-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-stone-950 shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-2xl text-white">{user.name}</h2>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-800">
                  {user.isLoggedIn ? 'Verified Tourist' : 'Guest Account'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadOfflinePack}
              className={`text-xs font-bold px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                offlinePackDownloaded
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{offlinePackDownloaded ? 'Offline Pack Saved' : 'Download Offline Pack'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'bookings', label: `My Bookings (${bookings.length})`, icon: <Ticket className="w-4 h-4" /> },
            { id: 'wishlist', label: `Saved Wishlist (${favorites.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'itinerary', label: 'Active Itinerary', icon: <Calendar className="w-4 h-4" /> },
            { id: 'offline', label: 'Offline Guides', icon: <Download className="w-4 h-4" /> }
          ].map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setActiveTab(tabItem.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tabItem.id
                  ? 'bg-stone-900 text-white shadow'
                  : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tabItem.icon}
              <span>{tabItem.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: My Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
                  🧳
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">No active bookings yet</h3>
                <p className="text-xs text-stone-500">
                  Ready to explore? Book a luxury safari camp, beachfront villa, or game drive with instant confirmation and digital voucher pass.
                </p>
                <button
                  onClick={() => setTab('safaris')}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow cursor-pointer transition-colors inline-block"
                >
                  Browse Safaris & Lodges
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-lg space-y-4 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded">
                          {b.type.toUpperCase()} VOUCHER
                        </span>
                        <h4 className="font-serif font-bold text-lg text-stone-900 mt-1">
                          {b.itemTitle}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-stone-900 block">
                          {b.referenceCode}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          Confirmed & Paid
                        </span>
                      </div>
                    </div>

                    <div className="bg-stone-50 rounded-2xl p-4 grid grid-cols-2 gap-2 text-xs text-stone-700 border border-stone-100">
                      <div><strong>Date:</strong> {b.date}</div>
                      <div><strong>Guests:</strong> {b.guests} Person(s)</div>
                      <div><strong>Payment:</strong> {b.paymentMethod}</div>
                      <div><strong>Total Amount:</strong> {formatPrice(b.totalPriceUSD)}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                      <button
                        onClick={() => window.print()}
                        className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Voucher</span>
                      </button>

                      <span className="text-[10px] text-stone-400">
                        Booked on {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {favoriteDestinations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                  ❤️
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500">
                  Tap the heart icon on any destination, hotel, or safari to bookmark it for your upcoming Kenya journey.
                </p>
                <button
                  onClick={() => setTab('explore')}
                  className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow inline-block"
                >
                  Explore Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-md flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10]">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => toggleFavorite(dest.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-rose-500 flex items-center justify-center"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-serif font-bold text-base text-stone-900">{dest.name}</h4>
                      <p className="text-xs text-stone-600 line-clamp-2">{dest.description}</p>
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-stone-400">Entry: {formatPrice(dest.entranceFeeUSD)}</span>
                        <button
                          onClick={() => setTab('safaris')}
                          className="text-amber-700 font-bold hover:underline"
                        >
                          Book Safari
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Active Itinerary */}
        {activeTab === 'itinerary' && (
          <div>
            {activeItinerary ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-stone-900">{activeItinerary.title}</h3>
                    <p className="text-xs text-stone-500">{activeItinerary.durationDays} Days • {activeItinerary.travelStyle}</p>
                  </div>
                  <button
                    onClick={() => setTab('planner')}
                    className="bg-stone-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Edit in Wizard
                  </button>
                </div>

                <div className="space-y-4">
                  {activeItinerary.days.map((d) => (
                    <div key={d.day} className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                      <h4 className="font-bold text-sm text-stone-900">Day {d.day}: {d.title} ({d.destination})</h4>
                      <ul className="mt-2 space-y-1 text-xs text-stone-600 pl-2">
                        {d.activities.map((a, i) => (
                          <li key={i}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl">
                  🗺️
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">No saved itinerary</h3>
                <p className="text-xs text-stone-500">
                  Use our intelligent Trip Planner Wizard to design a day-by-day customized schedule for your trip.
                </p>
                <button
                  onClick={() => setTab('planner')}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow inline-block"
                >
                  Open Trip Planner
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Offline Pack */}
        {activeTab === 'offline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                💾
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Kenya Offline Survival Guide Pack</h3>
                <p className="text-xs text-stone-500">Cache all phone hotlines, Swahili audio phrases, maps, and safety rules.</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 space-y-2 text-xs text-stone-700">
              <div className="flex items-center justify-between">
                <span>24/7 Tourist Police & AMREF Emergency Numbers:</span>
                <span className="font-bold text-emerald-600">✓ Cached</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Top Swahili Phrases & Audio:</span>
                <span className="font-bold text-emerald-600">✓ Cached</span>
              </div>
              <div className="flex items-center justify-between">
                <span>KWS Park Rules & Wildlife Safety:</span>
                <span className="font-bold text-emerald-600">✓ Cached</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Currency Exchange Reference Matrix:</span>
                <span className="font-bold text-emerald-600">✓ Cached</span>
              </div>
            </div>

            <button
              onClick={downloadOfflinePack}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3.5 rounded-2xl shadow transition-colors"
            >
              {offlinePackDownloaded ? '✓ Offline Survival Pack is Ready' : 'Download Offline Pack Now (4.2 MB)'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
