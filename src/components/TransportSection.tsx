import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Train,
  Plane,
  ShieldCheck,
  AlertTriangle,
  Clock,
  DollarSign,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const TransportSection: React.FC = () => {
  const { formatPrice, setBookingItem } = useApp();
  const [activeTransportTab, setActiveTransportTab] = useState<'safari-vehicles' | 'sgr-train' | 'flights' | 'city-taxis'>('safari-vehicles');

  return (
    <section id="transport-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>Getting Around Kenya</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Transportation, SGR Train & Safari 4x4s
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Everything you need to navigate Kenya: 4x4 pop-up roof safari cruisers, high-speed SGR Madaraka Express train, Wilson bush flights, and ride-hailing apps.
          </p>
        </div>

        {/* Transport Type Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {[
            { id: 'safari-vehicles', label: '🚙 4x4 Safari Land Cruisers', icon: '🚙' },
            { id: 'sgr-train', label: '🚄 SGR Madaraka Express Train', icon: '🚄' },
            { id: 'flights', label: '✈️ Domestic Bush Flights', icon: '✈️' },
            { id: 'city-taxis', label: '🚕 Nairobi Expressway & Uber', icon: '🚕' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTransportTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTransportTab === tab.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: 4x4 Safari Land Cruisers */}
        {activeTransportTab === 'safari-vehicles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80"
                alt="Toyota Land Cruiser 4x4 Safari Vehicle"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold bg-amber-500 text-stone-950 px-2.5 py-0.5 rounded">
                  Gold Standard Safari Spec
                </span>
                <h4 className="text-xl font-serif font-bold text-white mt-1">
                  Customized Toyota Land Cruiser 4x4
                </h4>
              </div>
            </div>

            <div className="space-y-4 text-xs text-stone-300">
              <h3 className="font-serif font-bold text-2xl text-white">
                Why Choose a 4x4 Land Cruiser in Kenya?
              </h3>
              <p className="leading-relaxed">
                Kenya’s national parks (especially Maasai Mara, Samburu, and Tsavo) feature rugged terrain, river crossings, and black-cotton clay. Safari Land Cruisers are custom-built with high suspension, all-terrain tires, and pop-up observation roofs for 360° wildlife photography.
              </p>

              <div className="bg-stone-800/90 p-4 rounded-2xl border border-stone-700 space-y-2">
                <h5 className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                  Vehicle Specifications:
                </h5>
                <ul className="space-y-1">
                  <li>✓ <strong>Pop-Up Roof Hatch:</strong> Stand and photograph Big 5 without window obstruction.</li>
                  <li>✓ <strong>In-Vehicle Power Inverters:</strong> 220V/USB charging for camera batteries and phones.</li>
                  <li>✓ <strong>Onboard Mini-Fridge:</strong> Cold bottled mineral water and drinks throughout the drive.</li>
                  <li>✓ <strong>VHF High-Frequency Radio:</strong> Real-time ranger network for tracking animal sightings.</li>
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase block">Daily Chauffeur Rate (incl. KWS Driver)</span>
                  <span className="text-xl font-serif font-bold text-white">{formatPrice(180)} / day</span>
                </div>
                <button
                  onClick={() => {
                    setBookingItem({
                      type: 'transport',
                      item: {
                        id: 'trans-landcruiser',
                        title: '4x4 Safari Land Cruiser with KWS Licensed Driver',
                        priceUSD: 180,
                        duration: '1 Day',
                        location: 'Nairobi / National Parks'
                      }
                    });
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-5 py-3 rounded-xl shadow cursor-pointer transition-colors"
                >
                  Book 4x4 Cruiser
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SGR Madaraka Express Train */}
        {activeTransportTab === 'sgr-train' && (
          <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-700 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                  Scenic Wildlife Journey
                </span>
                <h3 className="font-serif font-bold text-2xl text-white mt-1">
                  SGR Madaraka Express (Nairobi ⇄ Mombasa)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-stone-400 text-[10px] uppercase block">Duration</span>
                <span className="text-xl font-bold text-amber-400">4 Hours 30 Mins</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              The modern standard-gauge railway connects Nairobi (Syokimau Terminus) and Mombasa (Miritini Terminus) through Tsavo National Park. Elevated viaduct tracks allow you to watch wild elephants, giraffes, and zebras roaming beneath your train window.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-1">
                <span className="text-amber-400 font-bold text-sm block">First Class Coach</span>
                <p className="text-stone-400">Spacious reclining 2+2 seats, charging outlets, dining car access, priority boarding.</p>
                <div className="pt-2 font-bold text-white text-base">KES 4,500 (~$35 USD)</div>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-1">
                <span className="text-stone-300 font-bold text-sm block">Economy Class Coach</span>
                <p className="text-stone-400">Air-conditioned 3+2 seating, overhead luggage racks, scenic viewing.</p>
                <div className="pt-2 font-bold text-white text-base">KES 1,500 (~$12 USD)</div>
              </div>
            </div>

            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs space-y-2">
              <h5 className="font-bold text-amber-300">Daily Departure Schedule:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-300">
                <div className="bg-stone-900 p-2 rounded-lg">🌅 Morning Express: <strong>8:00 AM</strong></div>
                <div className="bg-stone-900 p-2 rounded-lg">☀️ Afternoon Inter-County: <strong>3:00 PM</strong></div>
                <div className="bg-stone-900 p-2 rounded-lg">🌙 Night Express: <strong>10:00 PM</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Domestic Bush Flights */}
        {activeTransportTab === 'flights' && (
          <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 max-w-4xl mx-auto space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white">
              Fly-In Safaris from Wilson Airport (Nairobi)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Wilson Airport (WIL) in Nairobi is Kenya’s hub for domestic scheduled bush flights (Safarilink, AirKenya, Mombasa Air Safari) directly into dirt airstrips inside national parks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-1">
                <span className="font-bold text-amber-400 block">Nairobi ⇄ Maasai Mara</span>
                <span className="text-stone-400 block">Flight Time: 45 Minutes</span>
                <span className="text-base font-bold text-white block mt-2">{formatPrice(190)} one-way</span>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-1">
                <span className="font-bold text-amber-400 block">Nairobi ⇄ Diani Beach</span>
                <span className="text-stone-400 block">Flight Time: 1 Hour 10 Mins</span>
                <span className="text-base font-bold text-white block mt-2">{formatPrice(120)} one-way</span>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-1">
                <span className="font-bold text-amber-400 block">Nairobi ⇄ Amboseli</span>
                <span className="text-stone-400 block">Flight Time: 40 Minutes</span>
                <span className="text-base font-bold text-white block mt-2">{formatPrice(165)} one-way</span>
              </div>
            </div>

            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-800/60 text-xs text-amber-300">
              <strong>⚠️ Luggage Limit:</strong> Bush flight carriers strictly enforce a 15 kg (33 lbs) soft duffle bag limit per passenger (rigid hard suitcases often do not fit in Cessna Caravan cargo pods).
            </div>
          </div>
        )}

        {/* Tab 4: City Taxis & Nairobi Expressway */}
        {activeTransportTab === 'city-taxis' && (
          <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 max-w-4xl mx-auto space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white">
              City Navigation: Uber, Bolt & Nairobi Expressway
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-2">
                <h4 className="font-bold text-white text-sm">Ride Hailing (Uber & Bolt)</h4>
                <p className="text-stone-300">
                  Uber and Bolt are widely available, safe, and reliable across Nairobi, Mombasa, Nakuru, and Kisumu.
                </p>
                <div className="text-emerald-400 font-semibold">
                  ✓ Always confirm license plate matches before boarding.
                </div>
              </div>

              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-700 space-y-2">
                <h4 className="font-bold text-white text-sm">Nairobi Elevated Expressway</h4>
                <p className="text-stone-300">
                  The 27 km tollway connects JKIA Airport directly to Westlands and Nairobi CBD in 15 minutes, skipping city congestion.
                </p>
                <div className="text-amber-400 font-semibold">
                  Toll fee: ~KES 300 - 500 (Payable via M-PESA, card or cash).
                </div>
              </div>
            </div>

            {/* Matatu Culture note */}
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs space-y-1">
              <span className="font-bold text-amber-300 block">🚌 Kenyan Matatu Culture:</span>
              <p className="text-stone-400">
                Nairobi’s customized minibuses (“Nganyas”) are world-famous for neon graffiti, booming sound systems, and onboard screens. For an authentic cultural experience, take a ride along Ngong Road or Thika Road with a local guide!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
