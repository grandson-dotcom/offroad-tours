import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Sparkles, Tag, ArrowRight, Clock } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { setTab } = useApp();

  const events = [
    {
      id: 'ev-migration',
      title: 'The Great Wildebeest Migration Peak',
      dates: 'July – October 2026',
      location: 'Maasai Mara National Reserve',
      category: 'Wildlife Spectacle',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      description: 'Over 1.5 million wildebeest and zebras make perilous Mara River crossings braving giant Nile crocodiles.'
    },
    {
      id: 'ev-lamu',
      title: 'Lamu Cultural & Dhow Festival',
      dates: 'November 2026',
      location: 'Lamu Old Town UNESCO Heritage',
      category: 'Swahili Culture',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      description: 'Annual Swahili dhow races, donkey racing through ancient coral stone alleyways, traditional taarab music and poetry.'
    },
    {
      id: 'ev-safari-rally',
      title: 'WRC Safari Rally Kenya',
      dates: 'March / April 2026',
      location: 'Naivasha Great Rift Valley',
      category: 'Motorsport & Adventure',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description: 'The world’s toughest World Rally Championship race tearing through dust, mud, and volcanic tracks.'
    },
    {
      id: 'ev-marathon',
      title: 'Lewa Wildlife Safari Marathon',
      dates: 'June 2026',
      location: 'Lewa Wildlife Conservancy',
      category: 'Eco-Sport & Conservation',
      image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
      description: 'Run 42 km through an open wildlife sanctuary alongside wild rhinos and giraffes to raise funds for anti-poaching rangers.'
    }
  ];

  return (
    <section id="events-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Festivals & Seasonal Wonders</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Kenya Events & Highlights
          </h2>
          <p className="text-sm sm:text-base text-stone-300">
            Plan your safari around Kenya’s most iconic world-class events, cultural festivals, and natural migrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-stone-800/80 rounded-3xl overflow-hidden border border-stone-700/80 shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-stone-950">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                  {ev.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                <div>
                  <span className="text-amber-400 font-bold block mb-1">🗓️ {ev.dates}</span>
                  <h4 className="font-serif font-bold text-base text-white mb-1">{ev.title}</h4>
                  <p className="text-stone-400 text-[11px] mb-2">📍 {ev.location}</p>
                  <p className="text-stone-300 leading-relaxed line-clamp-3">{ev.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-700">
                  <button
                    onClick={() => setTab('safaris')}
                    className="w-full bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    View Packages for this Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
