import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HOTELS } from '../data/kenyaData';
import { Hotel } from '../types';
import {
  MapPin,
  Star,
  ShieldCheck,
  Check,
  X,
  Wifi,
  Sparkles,
  ArrowRight,
  Filter,
  Phone,
  Mail
} from 'lucide-react';

export const AccommodationFinder: React.FC = () => {
  const {
    formatPrice,
    setBookingItem,
    setActiveHotelModal,
    activeHotelModal,
    toggleFavorite,
    isFavorite
  } = useApp();

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const types = [
    { id: 'all', label: 'All Stays' },
    { id: 'Luxury Camp', label: '🏕️ Safari Tented Camps' },
    { id: 'Beach Resort', label: '🏖️ Beachfront Resorts' },
    { id: 'Boutique Hotel', label: '🏨 City Boutique Hotels' },
    { id: 'Safari Lodge', label: '🐘 Safari Lodges' },
    { id: 'Budget Hostel', label: '🎒 Budget & Eco Camps' }
  ];

  const filteredHotels = HOTELS.filter((h) => {
    const matchesType = typeFilter === 'all' || h.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || h.region === regionFilter;
    return matchesType && matchesRegion;
  });

  return (
    <section id="hotels-section" className="py-16 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Kenya Accommodation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2">
              Hotels, Safari Camps & Beach Lodges
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              From luxury canvas tented suites in the Maasai Mara to boutique Swahili oceanfront villas in Diani.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                typeFilter === t.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-stone-700/60">
                    {hotel.type}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating} ({hotel.reviewsCount} reviews)</span>
                    </span>
                    <span className="text-stone-300">{hotel.region}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-white line-clamp-1">
                    {hotel.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate font-medium">{hotel.location}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {hotel.amenities.slice(0, 4).map((am, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {am}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-emerald-700 font-semibold">
                    ✓ {hotel.cancellationPolicy}
                  </p>
                </div>

                {/* Price & Booking Button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Per Night</span>
                    <span className="font-serif font-bold text-lg text-stone-900">
                      {formatPrice(hotel.pricePerNightUSD)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-view-hotel-${hotel.id}`}
                      onClick={() => setActiveHotelModal(hotel)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 cursor-pointer"
                    >
                      Rooms
                    </button>
                    <button
                      id={`btn-book-hotel-${hotel.id}`}
                      onClick={() => {
                        setBookingItem({ type: 'hotel', item: hotel });
                      }}
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow cursor-pointer transition-colors"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Rooms Details Modal */}
      {activeHotelModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-stone-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative aspect-[16/9] bg-stone-900">
              <img
                src={activeHotelModal.image}
                alt={activeHotelModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

              <button
                onClick={() => setActiveHotelModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-900 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-bold bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md">
                  {activeHotelModal.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {activeHotelModal.name}
                </h3>
                <p className="text-xs text-stone-300">📍 {activeHotelModal.location}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Room Categories */}
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 mb-3">
                  Available Room Types
                </h4>
                <div className="space-y-3">
                  {activeHotelModal.roomTypes.map((room, idx) => (
                    <div key={idx} className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h5 className="font-bold text-sm text-stone-900">{room.name}</h5>
                        <p className="text-xs text-stone-500 mt-0.5">Capacity: {room.capacity}</p>
                        <p className="text-xs text-stone-600 mt-1">{room.description}</p>
                      </div>

                      <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-bold text-base text-stone-900">{formatPrice(room.priceUSD)} <span className="text-[10px] text-stone-500 font-normal">/ night</span></span>
                        <button
                          onClick={() => {
                            const hotelCopy = { ...activeHotelModal, selectedRoom: room.name, customPriceUSD: room.priceUSD };
                            setActiveHotelModal(null);
                            setBookingItem({ type: 'hotel', item: hotelCopy });
                          }}
                          className="bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-bold text-sm text-stone-900 mb-2">Amenities & Services</h4>
                <div className="flex flex-wrap gap-2">
                  {activeHotelModal.amenities.map((am, i) => (
                    <span key={i} className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-lg border border-stone-200 font-medium">
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Checkin / Checkout info */}
              <div className="bg-amber-50 p-3.5 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                <span>🕒 Check-in: <strong>{activeHotelModal.checkIn}</strong> • Check-out: <strong>{activeHotelModal.checkOut}</strong></span>
                <span className="text-[11px] text-amber-800 font-semibold">Contact: {activeHotelModal.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
