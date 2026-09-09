import React, { useState } from 'react';
import { SWAHILI_PHRASES } from '../data/kenyaData';
import { SwahiliPhrase } from '../types';
import {
  Volume2,
  Search,
  BookOpen,
  MessageSquare,
  Sparkles,
  Check,
  Globe
} from 'lucide-react';

export const KiswahiliTranslator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [customTranslation, setCustomTranslation] = useState<string>('');
  const [recentlyPlayed, setRecentlyPlayed] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Phrases', icon: '🗣️' },
    { id: 'greetings', label: 'Greetings', icon: '👋' },
    { id: 'safari', label: 'Safari & Wildlife', icon: '🦁' },
    { id: 'dining', label: 'Food & Dining', icon: '🍽️' },
    { id: 'shopping', label: 'Bargaining & Markets', icon: '🛍️' },
    { id: 'direction', label: 'Taxis & Directions', icon: '🚕' },
    { id: 'emergency', label: 'Emergency & Help', icon: '🚨' }
  ];

  const playAudio = (text: string) => {
    setRecentlyPlayed(text);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'sw-KE';
      utterance.rate = 0.85; // slightly slower for easy comprehension
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setRecentlyPlayed(null), 2000);
  };

  // Instant dictionary mapping for common custom queries
  const commonDictionary: Record<string, string> = {
    hello: 'Jambo / Hujambo',
    hi: 'Mambo / Habari',
    'how are you': 'Habari gani? (Response: Nzuri sana)',
    'thank you': 'Asante sana',
    please: 'Tafadhali',
    water: 'Maji ya kunywa',
    coffee: 'Kahawa',
    tea: 'Chai ya maziwa / Chai ya tangawizi',
    beer: 'Bia baridi (Tusker)',
    meat: 'Nyama choma',
    lion: 'Simba',
    elephant: 'Tembo / Ndovu',
    rhino: 'Kifaru',
    leopard: 'Chui',
    cheetah: 'Duma',
    giraffe: 'Twiga',
    zebra: 'Punda milia',
    hippo: 'Kiboko',
    buffalo: 'Nyati / Mbogo',
    money: 'Pesa',
    'how much': 'Ni pesa ngapi?',
    expensive: 'Ghali sana! Punguza kidogo (Reduce a bit)',
    hospital: 'Hospitali',
    police: 'Polisi',
    help: 'Nisaidie tafadhali',
    goodbye: 'Kwaheri ya kuonana',
    welcome: 'Karibu Kenya!',
    'no problem': 'Hakuna Matata / Hakuna shida'
  };

  const handleCustomTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const lower = customInput.trim().toLowerCase();
    const matched = Object.keys(commonDictionary).find((k) => lower.includes(k));

    if (matched) {
      setCustomTranslation(commonDictionary[matched]);
    } else {
      setCustomTranslation(
        `Swahili translation for "${customInput}": ${
          customInput.split(' ').length === 1 ? customInput + ' (Karibu)' : 'Tafadhali sema kwa Kiswahili'
        }`
      );
    }
  };

  const filteredPhrases = SWAHILI_PHRASES.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      searchTerm === '' ||
      p.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.swahili.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pronunciation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="translator-section" className="py-16 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Swahili Phrasebook & Pronunciation</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Learn & Speak Kiswahili
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Connect with locals instantly. Click the speaker icon to listen to native audio pronunciations for greetings, safari animals, market bargaining, and directions.
          </p>
        </div>

        {/* Quick Translation Search & Custom Tool */}
        <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 shadow-2xl max-w-3xl mx-auto mb-10">
          <form onSubmit={handleCustomTranslate} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type an English word or phrase (e.g. hello, beer, thank you, lion)..."
                className="w-full bg-stone-950 border border-stone-700 rounded-2xl px-4 py-3 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-6 py-3 rounded-2xl shadow transition-colors cursor-pointer"
            >
              Translate
            </button>
          </form>

          {customTranslation && (
            <div className="mt-4 p-4 rounded-2xl bg-stone-950 border border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Kiswahili Result:</span>
                <span className="text-lg font-serif font-bold text-amber-400">{customTranslation}</span>
              </div>
              <button
                onClick={() => playAudio(customTranslation)}
                className="p-2.5 rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 shadow"
                title="Pronounce"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-lg'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Phrasebook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPhrases.map((phrase) => {
            const isPlaying = recentlyPlayed === phrase.swahili;
            return (
              <div
                key={phrase.id}
                id={`phrase-card-${phrase.id}`}
                className="bg-stone-900/90 rounded-2xl p-5 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-800 text-stone-400 mb-2 inline-block">
                      {phrase.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white">
                      {phrase.swahili}
                    </h3>
                    <p className="text-xs font-mono text-amber-400 mt-0.5">
                      /{phrase.pronunciation}/
                    </p>
                  </div>

                  <button
                    onClick={() => playAudio(phrase.swahili)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-500 text-stone-950 scale-110 shadow-lg'
                        : 'bg-stone-800 text-stone-300 hover:bg-amber-500 hover:text-stone-950'
                    }`}
                    title="Play Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="pt-3 border-t border-stone-800 space-y-1 text-xs">
                  <div className="text-stone-300">
                    <strong className="text-stone-400">Meaning:</strong> {phrase.english}
                  </div>
                  {phrase.context && (
                    <div className="text-[11px] text-stone-500 italic">
                      Usage: {phrase.context}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
