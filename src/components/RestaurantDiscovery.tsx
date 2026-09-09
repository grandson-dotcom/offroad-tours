import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANTS, KENYAN_FOODS } from '../data/kenyaData';
import { KenyanFoodItem, Restaurant } from '../types';
import {
  UtensilsCrossed,
  Sparkles,
  MapPin,
  Star,
  Clock,
  Check,
  X,
  Volume2,
  Calendar,
  Flame,
  Coffee,
  ArrowRight
} from 'lucide-react';

export const RestaurantDiscovery: React.FC = () => {
  const { formatPrice, setBookingItem } = useApp();
  const [selectedFood, setSelectedFood] = useState<KenyanFoodItem | null>(null);
  const [foodCategory, setFoodCategory] = useState<string>('all');
  const [reserveModalRestaurant, setReserveModalRestaurant] = useState<Restaurant | null>(null);
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      utter.lang = 'sw-KE';
      window.speechSynthesis.speak(utter);
    }
  };

  const filteredFoods = KENYAN_FOODS.filter(
    (f) => foodCategory === 'all' || f.category === foodCategory
  );

  return (
    <section id="food-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Kenyan Culinary Culture</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Try Authentic Kenyan Food
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            From sizzling charcoal Nyama Choma to Swahili spiced Pilau and steaming ginger Chai — an essential guide to Kenyan flavors.
          </p>
        </div>

        {/* Food Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {['all', 'Main Dish', 'Snack & Breakfast', 'Beverage', 'Side'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFoodCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                foodCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat === 'all' ? 'All Authentic Dishes' : cat}
            </button>
          ))}
        </div>

        {/* Kenyan Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              id={`food-card-${food.id}`}
              onClick={() => setSelectedFood(food)}
              className="group bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 hover:border-amber-500/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {food.mustTry && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow">
                    <Flame className="w-3 h-3 fill-stone-950" />
                    <span>Must Try</span>
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(food.swahiliName);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-white flex items-center justify-center transition-colors"
                  title="Pronounce in Swahili"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] text-amber-400 font-mono block">
                    /{food.pronunciation}/
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {food.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {food.description}
                </p>

                <div className="pt-2 border-t border-stone-700/60 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px]">{food.priceEstimateKES}</span>
                  <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Top Kenyan Restaurants */}
        <div className="border-t border-stone-800 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Dining Out</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Top Rated Restaurants & Nyama Choma Joints
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                id={`restaurant-card-${rest.id}`}
                className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 hover:border-stone-600 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-stone-950">
                  <img
                    src={rest.image}
                    alt={rest.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-amber-300 font-semibold">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rest.rating}</span>
                    </span>
                    <span>{rest.priceRange}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white mb-0.5 line-clamp-1">{rest.name}</h4>
                    <p className="text-[11px] text-amber-400 font-medium">{rest.cuisine}</p>
                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">📍 {rest.location}</p>
                  </div>

                  <div className="pt-2 border-t border-stone-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-semibold">✓ {rest.dietary[0]}</span>
                    <button
                      id={`btn-reserve-table-${rest.id}`}
                      onClick={() => setReserveModalRestaurant(rest)}
                      className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Book Table
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Food Details Modal */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 text-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-700 animate-in fade-in zoom-in-95">
            <div className="relative aspect-[16/9] bg-stone-950">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedFood(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded-md">
                    {selectedFood.category}
                  </span>
                  <button
                    onClick={() => speakText(selectedFood.swahiliName)}
                    className="flex items-center gap-1 text-xs bg-stone-800/90 px-2.5 py-0.5 rounded-md text-amber-300 border border-stone-700 hover:bg-stone-700"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce</span>
                  </button>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">{selectedFood.name}</h3>
                <p className="text-xs text-amber-400 font-mono">Swahili: {selectedFood.swahiliName}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto text-xs">
              <div>
                <h4 className="font-bold text-stone-200 uppercase text-[10px] tracking-wider mb-1">How it is Prepared & Eaten</h4>
                <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">{selectedFood.description}</p>
              </div>

              <div className="bg-stone-800 p-3.5 rounded-xl border border-stone-700 space-y-1.5">
                <div>
                  <span className="text-amber-400 font-bold">Key Ingredients:</span>{' '}
                  <span className="text-stone-300">{selectedFood.ingredients.join(', ')}</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold">Taste Profile:</span>{' '}
                  <span className="text-stone-300">{selectedFood.tasteProfile}</span>
                </div>
                <div>
                  <span className="text-rose-400 font-bold">Where to Order:</span>{' '}
                  <span className="text-stone-300">{selectedFood.recommendedPlaces}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Reservation Modal */}
      {reserveModalRestaurant && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 text-white rounded-3xl max-w-md w-full p-6 border border-stone-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">
                Reserve Table at {reserveModalRestaurant.name}
              </h3>
              <button onClick={() => setReserveModalRestaurant(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reserveSuccess ? (
              <div className="text-center py-6 space-y-2">
                <span className="text-4xl block">🎉</span>
                <h4 className="font-bold text-emerald-400 text-base">Table Reservation Confirmed!</h4>
                <p className="text-xs text-stone-300">
                  Your table request at {reserveModalRestaurant.name} has been placed. You will receive an SMS confirmation.
                </p>
                <button
                  onClick={() => {
                    setReserveSuccess(false);
                    setReserveModalRestaurant(null);
                  }}
                  className="mt-4 bg-amber-500 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReserveSuccess(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-stone-400 mb-1">Reservation Date & Time:</label>
                  <input
                    type="text"
                    defaultValue="Tonight at 7:30 PM (2 Guests)"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-stone-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Your Name & Phone (or WhatsApp):</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Jenkins (+254 700 123456)"
                    defaultValue="Tourist Guest (+254 700 000 000)"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-stone-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Dietary / Seating Preference:</label>
                  <input
                    type="text"
                    placeholder="e.g. Outdoor garden table, Halal, Nyama Choma goat ribs"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-stone-100"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Confirm Table Reservation
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
