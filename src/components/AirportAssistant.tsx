import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  Smartphone,
  CreditCard,
  Wifi,
  Car,
  Hotel,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';

export const AirportAssistant: React.FC = () => {
  const { setTab, formatPrice, currency } = useApp();
  const [activeAirport, setActiveAirport] = useState<'JKIA' | 'Moi'>('JKIA');
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const steps = [
    {
      num: 1,
      title: 'Electronic Travel Authorisation (eTA) & Passport Control',
      badge: 'Immigration Clearance',
      icon: <Plane className="w-5 h-5 text-amber-500" />,
      desc: 'All visitors must present their approved Kenya eTA QR code (digital or printed) and passport valid for at least 6 months. Yellow fever certificate is checked if arriving from endemic countries.',
      tips: [
        'Have your eTA PDF ready on your phone before deplaning.',
        'Use the designated Fast-Track counters if traveling with infants or mobility requirements.',
        'Immigration officers are courteous; simply state your duration and safari/hotel address.'
      ],
      alert: 'Beware of unofficial websites; only official etakenya.go.ke is authorized.'
    },
    {
      num: 2,
      title: 'Baggage Claim & Customs Scanner',
      badge: 'Luggage Hall',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      desc: 'Retrieve your bags from belts 1-4. Kenya strictly enforces a total ban on single-use plastic bags (duty-free bags must remain on the aircraft or be disposed of in airport bins). Drones require prior KCAA permit.',
      tips: [
        'Free airport luggage carts are available next to each carousel.',
        'Baggage porter service is available for a standard tip of KES 200 - 500 ($2 - $4).',
        'If bags are delayed, report immediately to the Kenya Airways or your carrier lost baggage desk inside the hall.'
      ],
      alert: 'Strict Prohibition: Single-use plastic carrier bags and unpermitted commercial filming drones are illegal.'
    },
    {
      num: 3,
      title: 'Get a Kenyan SIM / eSIM & Activate M-PESA',
      badge: 'Connectivity & Cashless Payments',
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      desc: 'Safaricom has official brand counters located immediately in the Arrivals terminal exit hall (Open 24/7). Safaricom offers the most extensive 4G/5G coverage across Kenyan national parks and remote safari reserves.',
      tips: [
        'Bring your physical Passport for government mandatory SIM registration.',
        'Tourist Bundle: ~KES 1,500 - 3,000 ($12 - $23) gets you 15GB - 30GB high-speed data + local calling minutes.',
        'CRITICAL: Ask the agent to activate M-PESA on your line. M-PESA is used everywhere in Kenya from luxury lodges to street vendors.'
      ],
      alert: 'Do not buy SIM cards from unofficial sidewalk hawkers outside; use the official branded Safaricom kiosk inside the terminal.'
    },
    {
      num: 4,
      title: 'Currency Exchange, Forex Bureau & ATM Withdrawals',
      badge: 'Kenyan Shilling (KES)',
      icon: <CreditCard className="w-5 h-5 text-amber-500" />,
      desc: 'Official 24-hour Forex Bureaus and international bank ATMs (KCB, Equity Bank, Stanbic, Absa) are located right next to the Arrivals exit door.',
      tips: [
        'ATM withdrawals using Visa / Mastercard give wholesale bank exchange rates.',
        'If bringing physical US Dollars, ensure bills are dated 2013 or newer, clean, and un-torn (banks reject older notes).',
        'Exchange $50 - $100 to KES cash for immediate airport taxi, tipping, or bottled water.'
      ],
      alert: 'Current live rate is ~KES 129 per $1 USD. Avoid exchanging large amounts at uncertified street handlers.'
    },
    {
      num: 5,
      title: 'Airport Free Wi-Fi Connection Guide',
      badge: 'Free High-Speed Wi-Fi',
      icon: <Wifi className="w-5 h-5 text-blue-500" />,
      desc: 'Connect to "JKIA_FREE_WIFI" or "KAA_Public_WiFi". No password required; accept the terms of service on the browser pop-up to gain 4 hours of fast internet to contact your hotel or driver.',
      tips: [
        'If the portal does not trigger automatically, navigate to 1.1.1.1 or example.com in your browser.',
        'Use this Wi-Fi to book your Uber/Bolt or message your tour operator on WhatsApp.'
      ]
    },
    {
      num: 6,
      title: 'Airport Ground Transport & Nairobi Expressway',
      badge: 'Taxis & SGR Train',
      icon: <Car className="w-5 h-5 text-purple-500" />,
      desc: 'Getting from JKIA to Nairobi City (Westlands, CBD, Karen) or the SGR Terminus:',
      tips: [
        'Uber & Bolt: Designated pickup zone at Car Park 1. Fares to Westlands are ~KES 1,200 - 2,000 ($10 - $16).',
        'Nairobi Expressway: Always ask your driver to use the elevated Nairobi Expressway (Toll: ~KES 300 - 500 / $3) to bypass Mombasa Road traffic and reach Westlands in 15 minutes instead of 2 hours.',
        'Official Yellow Airport Taxis (Jatco / Kenatco): Fixed rate desk inside Arrivals.',
        'SGR Train Transfer: If traveling to Mombasa/Diani by train, the SGR Syokimau Terminus is only 15 mins from JKIA.'
      ],
      alert: 'Do not accept rides from aggressive unmarked touts whispering "taxi, my friend". Use app rides or official desks.'
    },
    {
      num: 7,
      title: 'Transit Hotels & Airport Lounges',
      badge: 'Rest & Refresh',
      icon: <Hotel className="w-5 h-5 text-rose-500" />,
      desc: 'If you have a layover before your domestic Wilson Airport safari flight or morning beach flight:',
      tips: [
        'Four Points by Sheraton JKIA: Located right on airport grounds with rooftop pool facing Nairobi National Park.',
        'Crowne Plaza JKIA: 5 minutes free shuttle from terminal.',
        'Mara & Simba Transit Lounges: Terminal 1A/1E (Priority Pass accepted).'
      ]
    },
    {
      num: 8,
      title: 'Tourist Police & Safety Contacts at Airport',
      badge: '24/7 Security Desk',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      desc: 'The Kenya Tourist Police Unit (TPU) maintains an active station at JKIA Terminal 1 Arrivals for any assistance.',
      tips: [
        'TPU 24/7 Toll-Free Hotline: +254 800 720 024',
        'JKIA Police Station Direct: +254 20 661 1000',
        'AMREF Flying Doctors (Emergency Evacuation): +254 20 699 2299'
      ]
    },
    {
      num: 9,
      title: 'Essential First-Day Kenya Etiquette & Rules',
      badge: 'Local Cultural Tips',
      icon: <Info className="w-5 h-5 text-amber-500" />,
      desc: 'Key pointers for a smooth start to your Kenyan holiday:',
      tips: [
        'Drinking Water: Drink bottled mineral water (e.g. Keringet, Dasani) or filtered water provided at lodges.',
        'Electricity & Plugs: Kenya uses UK Type G 3-pin plugs (240V, 50Hz). Lodges supply adapters.',
        'Tipping Culture: Tipping is customary. Safari guides: $15 - $20 per day per group; Hotel porters: KES 100 - 200; Restaurants: 10% of bill.',
        'Greetings: Saying "Jambo" (Hello) and "Asante Sana" (Thank you very much) brings instant warm smiles.'
      ]
    }
  ];

  return (
    <section id="airport-guide-section" className="py-16 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Plane className="w-3.5 h-3.5" />
            <span>Just Landed in Kenya</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Airport Arrival & Survival Guide
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Step-by-step guidance for Jomo Kenyatta International Airport (Nairobi) & Moi International Airport (Mombasa) to get connected, get transport, exchange currency, and stay safe.
          </p>

          {/* Airport Selector Switch */}
          <div className="mt-6 inline-flex bg-stone-900 p-1.5 rounded-2xl border border-stone-800">
            <button
              onClick={() => setActiveAirport('JKIA')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAirport === 'JKIA'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🛫 Nairobi (JKIA) Guide
            </button>
            <button
              onClick={() => setActiveAirport('Moi')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeAirport === 'Moi'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🛫 Mombasa (Moi Airport) Guide
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mb-10 bg-stone-900/90 rounded-2xl p-4 sm:p-6 border border-stone-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-base text-white">Your Arrival Checklist</h4>
            <p className="text-xs text-stone-400">
              Completed {completedSteps.length} of {steps.length} arrival steps
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-48 bg-stone-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-400">
              {Math.round((completedSteps.length / steps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Step-by-Step Interactive Cards */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.num);
            return (
              <div
                key={step.num}
                id={`airport-step-${step.num}`}
                className={`bg-stone-900/90 rounded-2xl p-6 border transition-all duration-300 ${
                  isCompleted
                    ? 'border-emerald-700/60 shadow-lg'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                {/* Step Top Bar */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                          Step 0{step.num} • {step.badge}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStep(step.num)}
                    className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                        : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                  {step.desc}
                </p>

                {/* Practical Tips List */}
                <div className="bg-stone-950/80 rounded-xl p-4 border border-stone-800/80 space-y-2 mb-3">
                  <h5 className="font-bold text-xs text-stone-200 uppercase tracking-wide">
                    Pro Tips for Tourists:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {step.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning Alert if any */}
                {step.alert && (
                  <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-3 text-xs text-rose-300 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{step.alert}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Bottom CTAs */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setTab('transport')}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Car className="w-4 h-4" />
            <span>Book Airport Transfer or Safari Van</span>
          </button>
          <button
            onClick={() => setTab('emergency')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs px-6 py-3.5 rounded-xl border border-stone-700 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>View 24/7 Tourist Police Contacts</span>
          </button>
        </div>
      </div>
    </section>
  );
};
