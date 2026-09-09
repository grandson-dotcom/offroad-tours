import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';

export const DealsSection: React.FC = () => {
  const { formatPrice, setBookingItem, setTab } = useApp();

  const deals = [
    {
      id: 'deal-mara-earlybird',
      title: 'Maasai Mara Great Migration Early Bird Special',
      discount: '30% OFF',
      operator: 'Mara Bush Explorers',
      originalUSD: 650,
      discountedUSD: 455,
      validUntil: 'Ends this Friday',
      inclusions: ['4x4 Land Cruiser', 'Full Board Tented Lodge', 'All Park Fees Included']
    },
    {
      id: 'deal-diani-couples',
      title: 'Diani Beachfront Ocean Suite 4-Night Escape',
      discount: '25% OFF',
      operator: 'The Sands at Nomad',
      originalUSD: 880,
      discountedUSD: 660,
      validUntil: 'Limited 6 Slots',
      inclusions: ['Breakfast & Candlelight Dinner', 'Wasini Marine Dhow Cruise', 'Airport Shuttle']
    },
    {
      id: 'deal-amboseli-combo',
      title: 'Amboseli Elephants & Kilimanjaro 2-Day Weekender',
      discount: '20% OFF',
      operator: 'Kibo Safari Tours',
      originalUSD: 390,
      discountedUSD: 312,
      validUntil: 'Next Departure Sat',
      inclusions: ['Luxury Tent with Mt. Kilimanjaro View', 'Game Drives', 'KWS Guides']
    }
  ];

  return (
    <section id="deals-section" className="py-16 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Limited Tourist Discounts</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Exclusive Kenya Travel Deals
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Hand-negotiated deals with licensed safari operators and coastal beach resorts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-stone-900 rounded-3xl p-6 border border-stone-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                    {deal.discount}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">⏳ {deal.validUntil}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-white mb-1">{deal.title}</h3>
                <p className="text-xs text-amber-400 font-semibold mb-3">Operator: {deal.operator}</p>

                <div className="space-y-1.5 text-xs text-stone-300 bg-stone-950 p-3.5 rounded-2xl border border-stone-800">
                  {deal.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 line-through block">
                    {formatPrice(deal.originalUSD)}
                  </span>
                  <span className="font-serif font-bold text-xl text-amber-400">
                    {formatPrice(deal.discountedUSD)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setBookingItem({
                      type: 'safari',
                      item: {
                        id: deal.id,
                        title: deal.title,
                        priceUSD: deal.discountedUSD,
                        duration: 'Special Deal',
                        operator: deal.operator,
                        location: 'Kenya'
                      }
                    });
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow cursor-pointer transition-colors"
                >
                  Claim Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
