import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Heart, UserCheck, Headset, ShieldCheck, MapPin } from 'lucide-react';

export const FloatingFeatureCards: React.FC = () => {
  const { setTab, requestLocation } = useApp();

  const cards = [
    {
      id: 'card-best-price',
      title: 'Best Price Guarantee',
      desc: 'Verified direct rates for national parks, luxury safari lodges, and transfers with zero hidden booking surcharges.',
      action: () => setTab('safaris'),
      icon: (
        <div className="w-16 h-16 rounded-full border-2 border-[#f85a5a]/80 flex items-center justify-center text-[#f85a5a] bg-rose-50/50">
          {/* Circular Guarantee Seal SVG */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>
      )
    },
    {
      id: 'card-travellers-love-us',
      title: 'Travellers Love Us',
      desc: 'Over 50,000+ happy international tourists exploring Kenya’s Big 5 wildlife and pristine beaches with 4.9/5 satisfaction.',
      action: () => setTab('explore'),
      icon: (
        <div className="w-16 h-16 rounded-full border-2 border-[#f85a5a]/80 flex items-center justify-center text-[#f85a5a] bg-rose-50/50">
          {/* Heart Outline SVG */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      )
    },
    {
      id: 'card-best-travel-agent',
      title: 'Best Travel Agent',
      desc: 'KWS certified expert wildlife trackers, tailored safari planning, and verified local Swahili hospitality coordinators.',
      action: () => setTab('planner'),
      icon: (
        <div className="w-16 h-16 rounded-full border-2 border-[#f85a5a]/80 flex items-center justify-center text-[#f85a5a] bg-rose-50/50">
          {/* Guide / Explorer Hat SVG */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 18h20" />
            <path d="M5 18v-2a7 7 0 0 1 14 0v2" />
            <path d="M9 10a3 3 0 0 1 6 0v2H9z" />
            <circle cx="12" cy="7" r="1" />
          </svg>
        </div>
      )
    },
    {
      id: 'card-dedicated-support',
      title: 'Our Dedicated Support',
      desc: 'Direct 24/7 access to Kenya Tourist Police hotline, AMREF Flying Doctors emergency medical rescue, and WhatsApp help.',
      action: () => setTab('emergency'),
      icon: (
        <div className="w-16 h-16 rounded-full border-2 border-[#f85a5a]/80 flex items-center justify-center text-[#f85a5a] bg-rose-50/50">
          {/* 24/7 Headset Support SVG */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            <path d="M12 17v4" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          onClick={card.action}
          className="group bg-white text-stone-900 rounded-xl p-8 shadow-xl hover:shadow-2xl border border-stone-100/80 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col items-center text-center"
        >
          {/* Top Red Outlined Icon */}
          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {card.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-[#f85a5a] transition-colors">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-stone-500 leading-relaxed">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

