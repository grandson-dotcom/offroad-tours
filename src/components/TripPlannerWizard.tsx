import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TripItinerary } from '../types';
import {
  Compass,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Car,
  Plane,
  Save,
  Share2,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  Heart
} from 'lucide-react';

export const TripPlannerWizard: React.FC = () => {
  const { formatPrice, setTab, setActiveItinerary, activeItinerary } = useApp();

  const [days, setDays] = useState<number>(7);
  const [style, setStyle] = useState<string>('Safari + Beach Combo');
  const [budget, setBudget] = useState<'Budget' | 'Mid-Range' | 'Luxury'>('Mid-Range');
  const [group, setGroup] = useState<string>('Couple / 2 Adults');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Pre-configured intelligent itinerary generator logic
  const generateItinerary = (): TripItinerary => {
    let title = `${days}-Day Ultimate Kenya ${style}`;
    let dailyCost = budget === 'Budget' ? 120 : budget === 'Mid-Range' ? 280 : 650;
    let totalCostUSD = dailyCost * days;

    const daysArray: TripItinerary['days'] = [];

    if (days <= 3) {
      daysArray.push(
        {
          day: 1,
          destination: 'Nairobi City & Giraffe Centre',
          title: 'Arrival & Nairobi Highlights',
          activities: [
            'Land at JKIA & transfer via Expressway',
            'Visit Giraffe Centre to hand-feed endangered Rothchild giraffes',
            'Dinner at Carnivore Restaurant for traditional Nyama Choma'
          ],
          accommodation: budget === 'Luxury' ? 'Villa Rosa Kempinski' : 'Tamarind Tree Hotel',
          travelTime: '30 mins via Expressway'
        },
        {
          day: 2,
          destination: 'Nairobi National Park & Sheldrick Trust',
          title: 'Urban Wildlife & Elephant Nursery',
          activities: [
            '6:00 AM Game drive in Nairobi National Park with city skyline backdrop',
            '11:00 AM Sheldrick Wildlife Trust orphan baby elephant mud-bath',
            'Karen Blixen Museum and Kazuri Beads crafts workshop'
          ],
          accommodation: budget === 'Luxury' ? 'Hemingways Nairobi' : 'Wildebeest Eco Camp',
          travelTime: 'Local transfers (20-40 mins)'
        },
        {
          day: 3,
          destination: 'Great Rift Valley / Lake Naivasha',
          title: 'Boat Safari & Crescent Island Walking Safari',
          activities: [
            'Scenic drive down Rift Valley Escarpment',
            'Freshwater boat cruise among hippos and African fish eagles',
            'Walking safari on Crescent Island among wild zebras and giraffes'
          ],
          accommodation: 'Enashipai Resort & Spa or Camp Carnelley’s',
          travelTime: '2 hrs drive from Nairobi'
        }
      );
    } else if (days <= 7) {
      daysArray.push(
        {
          day: 1,
          destination: 'Nairobi',
          title: 'Arrival in Nairobi & Acclimatization',
          activities: ['Check-in, SIM registration, relax at hotel', 'Dinner at Talisman Restaurant Karen'],
          accommodation: 'Villa Rosa Kempinski / Fairview Hotel',
          travelTime: '45 mins from JKIA'
        },
        {
          day: 2,
          destination: 'Maasai Mara National Reserve',
          title: 'Flight to the Great Savannas',
          activities: [
            'Morning flight from Wilson Airport to Keekorok/Musiara Airstrip (45 mins)',
            'Afternoon Big 5 safari game drive in open Land Cruiser',
            'Sunset drinks overlooking the Mara River'
          ],
          accommodation: budget === 'Luxury' ? 'Angama Mara / Governor’s Camp' : 'Sarova Mara Game Camp',
          travelTime: '45 mins flight or 5.5 hrs scenic drive'
        },
        {
          day: 3,
          destination: 'Maasai Mara',
          title: 'Full Day Migration & Predator Tracking',
          activities: [
            'Optional 5:30 AM Sunrise Hot Air Balloon Safari with champagne bush breakfast',
            'Full-day game drive tracking lion prides, cheetahs, and rhinos',
            'Visit an authentic Maasai cultural Manyatta village'
          ],
          accommodation: 'Sarova Mara Game Camp',
          travelTime: 'Game drive inside reserve'
        },
        {
          day: 4,
          destination: 'Lake Nakuru National Park',
          title: 'Rhino Sanctuary & Flamingos',
          activities: [
            'Drive to Lake Nakuru',
            'Game drive around the lake shore for endangered black and white rhinos and leopards',
            'Hike to Baboon Cliff scenic viewpoint'
          ],
          accommodation: 'Lake Nakuru Sopa Lodge / The Cliff',
          travelTime: '4.5 hrs transfer'
        },
        {
          day: 5,
          destination: 'Amboseli National Park',
          title: 'Foot of Mount Kilimanjaro',
          activities: [
            'Transfer to Amboseli',
            'Late afternoon game drive with iconic views of elephant herds before Mount Kilimanjaro'
          ],
          accommodation: 'Ol Tukai Lodge / Tortilis Camp',
          travelTime: '5 hrs drive or scheduled safari flight'
        },
        {
          day: 6,
          destination: 'Diani Beach (South Coast)',
          title: 'Fly to the Indian Ocean',
          activities: [
            'Scheduled flight from Amboseli/Nairobi to Ukunda Diani Airstrip',
            'Check-in at beachfront resort and relax on soft white sands',
            'Swahili seafood dinner at Ali Barbour’s Cave Restaurant'
          ],
          accommodation: budget === 'Luxury' ? 'The Sands at Nomad' : 'Diani Sea Resort',
          travelTime: '1 hr direct coastal flight'
        },
        {
          day: 7,
          destination: 'Diani Beach & Wasini Island',
          title: 'Wasini Dolphin Dhow Safari & Departure',
          activities: [
            'Traditional Arabic wooden dhow cruise in Kisite-Mpunguti Marine Park',
            'Snorkeling with wild dolphins and sea turtles on coral reefs',
            'Transfer to Mombasa Moi Airport or SGR train back to Nairobi'
          ],
          accommodation: 'Departure Flight / Overnight Stay',
          travelTime: 'Airport transfer'
        }
      );
    } else {
      // 10+ days comprehensive Kenya
      daysArray.push(
        {
          day: 1,
          destination: 'Nairobi',
          title: 'Arrival & City Culture',
          activities: ['Giraffe Centre, Sheldrick Elephant Orphanage, National Museum'],
          accommodation: 'Fairview Hotel Nairobi',
          travelTime: 'Airport transfer'
        },
        {
          day: 2,
          destination: 'Samburu National Reserve',
          title: 'Rugged Northern Wilderness & Special 5',
          activities: ['Spot Grevy’s zebra, Somali ostrich, Reticulated giraffe, Beisa oryx, Gerenuk'],
          accommodation: 'Elephant Bedroom Camp / Samburu Intrepids',
          travelTime: '1 hr flight from Wilson'
        },
        {
          day: 3,
          destination: 'Samburu & Ewaso Nyiro River',
          title: 'Riverine Leopard & Elephant Tracking',
          activities: ['Full-day safari along the palm-fringed river', 'Samburu warrior cultural dance'],
          accommodation: 'Samburu Intrepids',
          travelTime: 'Game drives'
        },
        {
          day: 4,
          destination: 'Ol Pejeta Conservancy (Laikipia)',
          title: 'Last Northern White Rhinos & Chimps',
          activities: ['Visit Najin and Fatu (last two northern white rhinos)', 'Sweetwaters Chimpanzee Sanctuary'],
          accommodation: 'Sweetwaters Serena Camp',
          travelTime: '3 hrs drive'
        },
        {
          day: 5,
          destination: 'Maasai Mara',
          title: 'Endless Savanna Safari',
          activities: ['Transfer to Mara', 'Big 5 afternoon game drive'],
          accommodation: 'Sarova Mara Game Camp',
          travelTime: '45 mins flight'
        },
        {
          day: 6,
          destination: 'Maasai Mara',
          title: 'Hot Air Balloon & River Crossings',
          activities: ['Hot air balloon at dawn, full-day Mara triangle exploration'],
          accommodation: 'Sarova Mara Game Camp',
          travelTime: 'Safari drives'
        },
        {
          day: 7,
          destination: 'Amboseli National Park',
          title: 'Elephants & Kilimanjaro Sunsets',
          activities: ['Observation Hill picnic lunch, Amboseli swamp elephants'],
          accommodation: 'Ol Tukai Lodge Amboseli',
          travelTime: 'Safari flight'
        },
        {
          day: 8,
          destination: 'Tsavo West National Park',
          title: 'Mzima Springs & Shetani Lava Flow',
          activities: ['Underwater hippo viewing chamber at Mzima Springs', 'Black rhino sanctuary'],
          accommodation: 'Kilaguni Serena Safari Lodge',
          travelTime: '2.5 hrs drive'
        },
        {
          day: 9,
          destination: 'Diani Beach & Indian Ocean',
          title: 'Tropical Beach Relaxation',
          activities: ['SGR Madaraka Express Train to Coast or coastal flight', 'Sunset cocktails on Diani beach'],
          accommodation: 'The Sands at Nomad',
          travelTime: '3 hrs via SGR Train'
        },
        {
          day: 10,
          destination: 'Wasini Marine Park & Lamu / Departure',
          title: 'Dhow Sailing, Coral Reefs & Farewell',
          activities: ['Kisite-Mpunguti marine reserve snorkeling, fresh Swahili crab lunch'],
          accommodation: 'Departure',
          travelTime: 'Transfer to Mombasa Airport'
        }
      );
    }

    return {
      id: `itinerary-${Date.now()}`,
      title,
      durationDays: days,
      travelStyle: style,
      budgetTier: budget,
      groupType: group,
      totalEstimatedCostUSD: totalCostUSD,
      days: daysArray
    };
  };

  const currentItinerary = activeItinerary || generateItinerary();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newItin = generateItinerary();
    setActiveItinerary(newItin);
    setSavedSuccess(false);
  };

  const handleSaveToDashboard = () => {
    setActiveItinerary(currentItinerary);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <section id="trip-planner-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>AI Trip Planner</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Custom Kenya Itinerary Builder
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Generate an optimized, realistic day-by-day Kenya journey with verified driving routes, bush flights, accommodations, and estimated budgets.
          </p>
        </div>

        {/* Wizard Form */}
        <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 max-w-4xl mx-auto shadow-2xl mb-12">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Field 1: Duration */}
            <div>
              <label className="block text-stone-300 font-bold uppercase text-[10px] tracking-wider mb-2">
                Trip Duration:
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 font-semibold"
              >
                <option value={3}>3 Days (Nairobi & Express Safari)</option>
                <option value={5}>5 Days (Mara & Rift Valley)</option>
                <option value={7}>7 Days (Classic Safari + Diani Beach)</option>
                <option value={10}>10 Days (Comprehensive Kenya Explorer)</option>
                <option value={14}>14 Days (Grand Kenya Safari & Lamu)</option>
              </select>
            </div>

            {/* Field 2: Style */}
            <div>
              <label className="block text-stone-300 font-bold uppercase text-[10px] tracking-wider mb-2">
                Travel Style:
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 font-semibold"
              >
                <option value="Safari + Beach Combo">Safari + Beach Combo</option>
                <option value="Big 5 Wildlife Specialist">Big 5 Wildlife Specialist</option>
                <option value="Tropical Beach & Marine">Tropical Beach & Marine</option>
                <option value="Adventure & Mountain Trekking">Adventure & Mountain Trekking</option>
                <option value="Culture & Food Journey">Culture & Food Journey</option>
              </select>
            </div>

            {/* Field 3: Budget Tier */}
            <div>
              <label className="block text-stone-300 font-bold uppercase text-[10px] tracking-wider mb-2">
                Budget Level:
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value as any)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 font-semibold"
              >
                <option value="Budget">Budget / Eco Camping ($120/day)</option>
                <option value="Mid-Range">Mid-Range Safari Lodge ($280/day)</option>
                <option value="Luxury">Ultra Luxury Tented Suite ($650/day)</option>
              </select>
            </div>

            {/* Field 4: Group */}
            <div>
              <label className="block text-stone-300 font-bold uppercase text-[10px] tracking-wider mb-2">
                Travel Party:
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 text-stone-100 font-semibold"
              >
                <option value="Solo Traveler">Solo Traveler</option>
                <option value="Couple / 2 Adults">Couple / 2 Adults</option>
                <option value="Family with Kids">Family with Kids</option>
                <option value="Group of Friends">Group of Friends (4+)</option>
              </select>
            </div>

            {/* Submit Button spanning across */}
            <div className="sm:col-span-2 lg:col-span-4 pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm py-3.5 rounded-2xl shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build Personalized Kenya Itinerary</span>
              </button>
            </div>
          </form>
        </div>

        {/* Generated Itinerary Display */}
        <div className="max-w-4xl mx-auto bg-stone-950 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl">
          {/* Summary Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {currentItinerary.durationDays} Days • {currentItinerary.travelStyle} • {currentItinerary.budgetTier}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                {currentItinerary.title}
              </h3>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] text-stone-400 uppercase block font-semibold">Estimated Budget</span>
              <span className="text-2xl font-serif font-bold text-amber-400">
                {formatPrice(currentItinerary.totalEstimatedCostUSD)}
              </span>
              <span className="text-[10px] text-stone-400 block">per person (excl. flights)</span>
            </div>
          </div>

          {/* Day by Day Cards */}
          <div className="mt-8 space-y-6">
            {currentItinerary.days.map((d) => (
              <div
                key={d.day}
                className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800/80 hover:border-stone-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0">
                      D{d.day}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-base text-white">{d.title}</h4>
                      <p className="text-xs text-amber-400 font-medium">📍 {d.destination}</p>
                    </div>
                  </div>

                  {d.travelTime && (
                    <span className="text-[11px] text-stone-400 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
                      🚗 {d.travelTime}
                    </span>
                  )}
                </div>

                {/* Activities List */}
                <div className="space-y-1.5 text-xs text-stone-300 mb-3 pl-1">
                  {d.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">✓</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                {/* Suggested Hotel */}
                <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-xs text-stone-400">
                  <span>🏨 Recommended Stay: <strong className="text-stone-200">{d.accommodation}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <button
              id="btn-save-itinerary"
              onClick={handleSaveToDashboard}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved to My Dashboard!' : 'Save Itinerary to My Trip'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab('safaris')}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-5 py-3 rounded-xl transition-all"
              >
                Book Guided Tours for this Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
