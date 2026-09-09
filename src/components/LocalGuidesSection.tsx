import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LOCAL_GUIDES } from '../data/kenyaData';
import { LocalGuide } from '../types';
import {
  ShieldCheck,
  Star,
  Globe,
  Award,
  Calendar,
  Check,
  X,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

export const LocalGuidesSection: React.FC = () => {
  const { formatPrice, setBookingItem } = useApp();
  const [selectedGuide, setSelectedGuide] = useState<LocalGuide | null>(null);
  const [hireSuccess, setHireSuccess] = useState(false);

  return (
    <section id="guides-section" className="py-16 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>KPSGA & KWS Certified</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            Certified Kenyan Safari & Local Guides
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Hire licensed wildlife trackers, Mount Kenya mountaineering leaders, and Swahili coastal historians for unforgettable bespoke excursions.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOCAL_GUIDES.map((guide) => (
            <div
              key={guide.id}
              id={`guide-card-${guide.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Photo & Badge */}
              <div className="relative aspect-[4/3] bg-stone-900">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-700/50 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{guide.certification}</span>
                </span>

                <div className="absolute bottom-2 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{guide.rating} ({guide.reviewsCount} reviews)</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">{guide.name}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <p className="text-[11px] text-amber-700 font-semibold mb-1">
                    📍 {guide.location} • {guide.experienceYears} Yrs Experience
                  </p>
                  <p className="text-stone-600 line-clamp-2 leading-relaxed">
                    {guide.bio}
                  </p>

                  <div className="mt-3 space-y-1 text-[11px] text-stone-500">
                    <div>
                      <strong className="text-stone-700">Specialties:</strong> {guide.specialties.join(', ')}
                    </div>
                    <div>
                      <strong className="text-stone-700">Languages:</strong> {guide.languages.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block font-semibold">Daily Rate</span>
                    <span className="font-serif font-bold text-base text-stone-900">
                      {formatPrice(guide.dailyRateUSD)} / day
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Hire Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hire Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Hire {selectedGuide.name}
                </h3>
                <span className="text-xs text-amber-700 font-medium">{selectedGuide.certification}</span>
              </div>
              <button onClick={() => setSelectedGuide(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {hireSuccess ? (
              <div className="text-center py-6 space-y-2">
                <span className="text-4xl block">🎉</span>
                <h4 className="font-bold text-emerald-600 text-base">Booking Request Sent to Guide!</h4>
                <p className="text-xs text-stone-600">
                  {selectedGuide.name} has received your itinerary request and will contact you on WhatsApp/Phone.
                </p>
                <button
                  onClick={() => {
                    setHireSuccess(false);
                    setSelectedGuide(null);
                  }}
                  className="mt-4 bg-stone-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setHireSuccess(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-stone-600 font-bold mb-1">Target Safari Dates & Location:</label>
                  <input
                    type="text"
                    defaultValue="Maasai Mara Game Drives (3 Days)"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">Your Name & WhatsApp Contact:</label>
                  <input
                    type="text"
                    placeholder="e.g. David Ross (+1 555 123 4567)"
                    defaultValue="Tourist Guest (+254 700 000 000)"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">Special Interests / Group Size:</label>
                  <input
                    type="text"
                    placeholder="e.g. Big cat photography, 2 guests, need English commentary"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Booking Request ({formatPrice(selectedGuide.dailyRateUSD)} / day)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
