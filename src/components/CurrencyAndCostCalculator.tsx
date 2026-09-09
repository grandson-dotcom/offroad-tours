import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EXCHANGE_RATES } from '../data/kenyaData';
import { CurrencyCode } from '../types';
import {
  DollarSign,
  ArrowRightLeft,
  Smartphone,
  TrendingUp,
  HelpCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CurrencyAndCostCalculator: React.FC = () => {
  const { currency, setCurrency, formatPrice } = useApp();
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('KES');
  const [tripDays, setTripDays] = useState<number>(7);
  const [travelerCount, setTravelerCount] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<'budget' | 'mid' | 'luxury'>('mid');

  const currencies: CurrencyCode[] = ['USD', 'KES', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY', 'AED', 'ZAR'];

  // Conversion math: Convert fromCurrency -> USD -> toCurrency
  const convertCurrency = (val: number, from: CurrencyCode, to: CurrencyCode): number => {
    const fromRate = EXCHANGE_RATES[from] || 1;
    const toRate = EXCHANGE_RATES[to] || 1;
    // val in USD
    const inUSD = val / fromRate;
    return Math.round(inUSD * toRate * 100) / 100;
  };

  const convertedResult = convertCurrency(amount, fromCurrency, toCurrency);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Cost estimates per person per day
  const dailyCosts = {
    budget: { lodging: 35, food: 20, transport: 25, parkFees: 40, totalUSD: 120 },
    mid: { lodging: 140, food: 45, transport: 60, parkFees: 80, totalUSD: 325 },
    luxury: { lodging: 450, food: 100, transport: 150, parkFees: 120, totalUSD: 820 }
  };

  const currentDaily = dailyCosts[travelStyle];
  const totalEstimatedTripUSD = currentDaily.totalUSD * tripDays * travelerCount;

  return (
    <section id="currency-calc-section" className="py-16 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Money & Budgeting</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Kenyan Shilling Converter & Trip Budget Calculator
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Real-time exchange rates, M-PESA tariff guides, and realistic daily expense calculations for traveling in Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Multi-Currency Converter (6 Cols) */}
          <div className="lg:col-span-6 bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-700 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Live Currency Exchange</h3>
              <span className="text-[11px] text-amber-400 font-mono">1 USD ≈ KES 129.50</span>
            </div>

            <div className="space-y-4 text-xs">
              {/* From Input */}
              <div>
                <label className="block text-stone-400 mb-1 font-bold uppercase text-[10px]">You Send / Convert:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-xl p-3 text-lg font-bold text-white"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                    className="w-28 bg-stone-900 border border-stone-700 rounded-xl p-3 font-bold text-amber-400"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-2.5 rounded-full bg-stone-700 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-colors shadow"
                  title="Swap Currencies"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* To Output */}
              <div>
                <label className="block text-stone-400 mb-1 font-bold uppercase text-[10px]">You Receive (Estimated):</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-stone-950 border border-stone-700 rounded-xl p-3 text-xl font-serif font-bold text-amber-400">
                    {(convertedResult || 0).toLocaleString()}
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                    className="w-28 bg-stone-900 border border-stone-700 rounded-xl p-3 font-bold text-amber-400"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Common Benchmark Values */}
              <div className="pt-3 border-t border-stone-700 space-y-2 text-stone-400 text-[11px]">
                <span className="font-bold text-stone-300 block">Typical Kenyan Price Reference:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-stone-900 p-2 rounded-lg">☕ Kenyan Tea/Chai: <strong>KES 50 - 150</strong> ($0.40 - $1.20)</div>
                  <div className="bg-stone-900 p-2 rounded-lg">🥩 1kg Nyama Choma: <strong>KES 900 - 1,400</strong> ($7 - $11)</div>
                  <div className="bg-stone-900 p-2 rounded-lg">🚕 Uber Nairobi CBD to Westlands: <strong>KES 450</strong> ($3.50)</div>
                  <div className="bg-stone-900 p-2 rounded-lg">🚄 SGR First Class (Nairobi to Mombasa): <strong>KES 4,500</strong> ($35)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Daily Trip Cost Estimator (6 Cols) */}
          <div className="lg:col-span-6 bg-stone-800/80 rounded-3xl p-6 sm:p-8 border border-stone-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-700 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Kenya Vacation Cost Estimator</h3>
              <span className="text-xs bg-amber-500 text-stone-950 font-bold px-2.5 py-0.5 rounded-md">
                Realistic Estimates
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Style Selector */}
              <div>
                <label className="block text-stone-400 mb-1 font-bold uppercase text-[10px]">Travel Style:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['budget', 'mid', 'luxury'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setTravelStyle(st)}
                      className={`p-2.5 rounded-xl font-bold capitalize transition-all ${
                        travelStyle === st
                          ? 'bg-amber-500 text-stone-950 shadow'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders for Days and Travelers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-bold">Number of Days: <strong className="text-white">{tripDays}</strong></label>
                  <input
                    type="range"
                    min="1"
                    max="21"
                    value={tripDays}
                    onChange={(e) => setTripDays(Number(e.target.value))}
                    aria-label="Number of trip days"
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-bold">Travelers: <strong className="text-white">{travelerCount}</strong></label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={travelerCount}
                    onChange={(e) => setTravelerCount(Number(e.target.value))}
                    aria-label="Number of travelers"
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Breakdown List */}
              <div className="bg-stone-900 rounded-2xl p-4 space-y-2 border border-stone-700 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>🏨 Accommodation ({travelerCount} guests):</span>
                  <span className="font-bold text-white">{formatPrice(currentDaily.lodging * tripDays * travelerCount)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>🍽️ Food, Water & Dining:</span>
                  <span className="font-bold text-white">{formatPrice(currentDaily.food * tripDays * travelerCount)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>🦁 Park Entry & KWS Fees:</span>
                  <span className="font-bold text-white">{formatPrice(currentDaily.parkFees * tripDays * travelerCount)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>🚕 Safari Vehicle & Transfers:</span>
                  <span className="font-bold text-white">{formatPrice(currentDaily.transport * tripDays * travelerCount)}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-amber-400">
                  <span>Total Estimated Trip Cost:</span>
                  <span className="text-lg font-serif">{formatPrice(totalEstimatedTripUSD)}</span>
                </div>
              </div>

              {/* Tipping Guidelines Box */}
              <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-300 space-y-1">
                <span className="font-bold text-emerald-200 block">💡 Standard Kenya Tipping Norms:</span>
                <p>• Safari Driver/Guide: $15 - $25 per day total per vehicle</p>
                <p>• Lodge Staff General Tip Box: $5 - $10 per day</p>
                <p>• City Waiters & Bellhops: KES 100 - 300 ($1 - $2)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
