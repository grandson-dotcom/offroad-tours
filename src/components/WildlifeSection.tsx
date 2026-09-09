import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Info, Sparkles, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

export const WildlifeSection: React.FC = () => {
  const { setTab, formatPrice, currency } = useApp();
  const [activeBigFive, setActiveBigFive] = useState<'rhino' | 'lion' | 'elephant' | 'leopard' | 'buffalo'>('rhino');
  const [showFeeCalculator, setShowFeeCalculator] = useState(false);
  const [visitorType, setVisitorType] = useState<'non-resident' | 'resident' | 'citizen'>('non-resident');
  const [parkChoice, setParkChoice] = useState<'mara' | 'amboseli' | 'nakuru' | 'tsavo' | 'nairobi'>('mara');

  const bigFiveData = {
    rhino: {
      name: 'Black & White Rhinos (Kifaru)',
      title: 'Solio & Lake Nakuru Sanctuaries',
      swahili: 'Kifaru Mweusi na Mweupe',
      image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      desc: 'Kenya is home to the largest protected sanctuaries for both Southern White Rhinos and critically endangered Eastern Black Rhinos. Through tireless KWS anti-poaching ranger units and community conservancies (Ol Pejeta, Solio, Lewa), Kenya’s rhino population is experiencing historic growth.',
      hotspots: 'Lake Nakuru National Park, Ol Pejeta Conservancy, Solio Ranch, Nairobi National Park',
      safariTip: 'Morning game drives around 6:30 AM offering the highest sighting probability as rhinos graze in open acacia clearings.'
    },
    lion: {
      name: 'African Lion (Simba)',
      title: 'Maasai Mara & Amboseli Prides',
      swahili: 'Simba',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      desc: 'The Mara-Serengeti ecosystem hosts the densest wild lion population on Earth. Witness legendary marsh prides patrolling the plains and coordinating tactical ambush hunts during the Great Migration.',
      hotspots: 'Maasai Mara, Tsavo, Nairobi National Park, Amboseli',
      safariTip: 'Look under shaded acacia trees or atop granite kopjes during the heat of midday.'
    },
    elephant: {
      name: 'African Bush Elephant (Tembo / Ndovu)',
      title: 'Amboseli Big Tuskers',
      swahili: 'Tembo / Ndovu',
      image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      desc: 'Amboseli is world-renowned for hosting the longest continuously studied wild elephant population led by iconic super-tuskers with ivory reaching near the ground, framed by Mount Kilimanjaro.',
      hotspots: 'Amboseli, Tsavo East (Dust-Red Elephants), Samburu, Maasai Mara',
      safariTip: 'Visit Enkongo Narok marsh in Amboseli between 10 AM and 2 PM to watch families bathe and playfully mud-wallow.'
    },
    leopard: {
      name: 'African Leopard (Chui)',
      title: 'Samburu & Mara Riverine Forests',
      swahili: 'Chui',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
      desc: 'The master of stealth and camouflage. Known for hauling heavy prey up into sausage trees (Kigelia africana) away from hyenas and lions.',
      hotspots: 'Samburu National Reserve, Talek River in Maasai Mara, Lake Nakuru',
      safariTip: 'Scan horizontal tree branches along riverbanks during late afternoon game drives.'
    },
    buffalo: {
      name: 'Cape Buffalo (Nyati / Mbogo)',
      title: 'Hell’s Gate & Aberdares Herds',
      swahili: 'Nyati / Mbogo',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      desc: 'Revered for their formidable curved boss horns and unbreakable herd loyalty. Capable of defending their calves against full prides of lions.',
      hotspots: 'Nairobi National Park, Maasai Mara, Aberdare Forest, Tsavo',
      safariTip: 'Large herds gather near waterholes and mud-wallows at dawn and dusk.'
    }
  };

  const parkFeeTable = {
    mara: { name: 'Maasai Mara National Reserve', nonResidentUSD: 100, residentKES: 1500, citizenKES: 1000 },
    amboseli: { name: 'Amboseli National Park (KWS)', nonResidentUSD: 80, residentKES: 1000, citizenKES: 800 },
    nakuru: { name: 'Lake Nakuru Rhino Sanctuary (KWS)', nonResidentUSD: 70, residentKES: 1000, citizenKES: 800 },
    tsavo: { name: 'Tsavo East / West Parks (KWS)', nonResidentUSD: 75, residentKES: 1000, citizenKES: 500 },
    nairobi: { name: 'Nairobi National Park (KWS)', nonResidentUSD: 43, residentKES: 1000, citizenKES: 400 }
  };

  const currentParkFee = parkFeeTable[parkChoice] || parkFeeTable.amboseli;
  const computedFee =
    visitorType === 'non-resident'
      ? formatPrice(currentParkFee?.nonResidentUSD || 0)
      : visitorType === 'resident'
      ? `KES ${(currentParkFee?.residentKES || 0).toLocaleString()}`
      : `KES ${(currentParkFee?.citizenKES || 0).toLocaleString()}`;

  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Background Subtle Safari Texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Untamed Natural Wonders</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Wild Kenya Awaits
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            From magnificent wildlife to breathtaking landscapes, Kenya offers some of the world's most unforgettable safari experiences.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              id="btn-wildlife-explore-safaris"
              onClick={() => setTab('safaris')}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-amber-950/40 flex items-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Safaris</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="btn-wildlife-discover-parks"
              onClick={() => setTab('explore')}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-sm px-6 py-3 rounded-xl border border-stone-700 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Discover National Parks</span>
            </button>
            <button
              onClick={() => setShowFeeCalculator(!showFeeCalculator)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 px-2 py-1"
            >
              {showFeeCalculator ? 'Hide Park Fee Calculator' : '⚡ Official KWS Park Fee Calculator'}
            </button>
          </div>
        </div>

        {/* Optional Interactive KWS Park Fee Calculator */}
        {showFeeCalculator && (
          <div className="mb-12 bg-stone-800/90 border border-stone-700/80 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-stone-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm text-stone-100">Official Kenya Wildlife Service (KWS) Conservation Fee Estimator</h4>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">Direct via eCitizen / KWS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Select National Park / Reserve:</label>
                <select
                  value={parkChoice}
                  onChange={(e) => setParkChoice(e.target.value as any)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-100 font-semibold"
                >
                  <option value="mara">Maasai Mara National Reserve</option>
                  <option value="amboseli">Amboseli National Park</option>
                  <option value="nakuru">Lake Nakuru Rhino Sanctuary</option>
                  <option value="tsavo">Tsavo East & West National Parks</option>
                  <option value="nairobi">Nairobi National Park</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Visitor Category:</label>
                <select
                  value={visitorType}
                  onChange={(e) => setVisitorType(e.target.value as any)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-stone-100 font-semibold"
                >
                  <option value="non-resident">International Tourist (Non-Resident)</option>
                  <option value="resident">East African Resident (Work Permit/Alien Card)</option>
                  <option value="citizen">Kenyan Citizen (National ID / Passport)</option>
                </select>
              </div>

              <div className="bg-stone-900/80 rounded-xl p-3 border border-amber-500/30 flex flex-col justify-center">
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">Conservation Entry Fee (24hrs):</span>
                <span className="text-xl font-bold text-amber-400">{computedFee}</span>
                <span className="text-[10px] text-stone-400">Cashless payment required (Credit Card or M-PESA via eCitizen)</span>
              </div>
            </div>
          </div>
        )}

        {/* Primary Wildlife Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Primary Image Container (Featuring the Rhinos / Big 5) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-700/60 aspect-[16/10] bg-stone-950">
              <img
                src={bigFiveData[activeBigFive].image}
                alt={bigFiveData[activeBigFive].name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

              {/* In-Image Caption Pill */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-stone-950">
                    {bigFiveData[activeBigFive].swahili}
                  </span>
                  <span className="text-xs text-stone-300 font-medium bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-stone-700/50">
                    📍 {bigFiveData[activeBigFive].title}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mb-1">
                  {bigFiveData[activeBigFive].name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 sm:line-clamp-none">
                  {bigFiveData[activeBigFive].safariTip}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Species Switcher & Conservation Insights */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Select Big 5 Icon to Learn More:
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: 'rhino', label: 'Rhino', icon: '🦏' },
                  { id: 'lion', label: 'Lion', icon: '🦁' },
                  { id: 'elephant', label: 'Elephant', icon: '🐘' },
                  { id: 'leopard', label: 'Leopard', icon: '🐆' },
                  { id: 'buffalo', label: 'Buffalo', icon: '🐃' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveBigFive(item.id as any)}
                    className={`py-2 px-1 rounded-xl text-center transition-all ${
                      activeBigFive === item.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-lg scale-105'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <span className="text-lg block mb-0.5">{item.icon}</span>
                    <span className="text-[10px] block leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Information Card for selected animal */}
            <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700/80 shadow-lg space-y-3">
              <h4 className="font-serif font-bold text-lg text-white">
                {bigFiveData[activeBigFive].name}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {bigFiveData[activeBigFive].desc}
              </p>

              <div className="pt-2 border-t border-stone-700/60 space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">📍 Premier Hotspots:</span>
                  <span className="text-stone-300">{bigFiveData[activeBigFive].hotspots}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">💡 Safari Guidance:</span>
                  <span className="text-stone-300">{bigFiveData[activeBigFive].safariTip}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setTab('safaris')}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs py-3 px-4 rounded-xl text-center shadow-md transition-all"
              >
                Book Game Drive Safari
              </button>
              <button
                onClick={() => setTab('guides')}
                className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs py-3 px-4 rounded-xl text-center border border-stone-700 transition-all"
              >
                Hire Licensed KWS Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
