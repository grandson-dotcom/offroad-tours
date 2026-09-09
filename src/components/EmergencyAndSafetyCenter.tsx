import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_CONTACTS, EMBASSIES } from '../data/kenyaData';
import {
  ShieldAlert,
  Phone,
  PhoneCall,
  MapPin,
  Share2,
  Copy,
  Check,
  Building,
  HeartHandshake,
  AlertTriangle,
  Send,
  Navigation
} from 'lucide-react';

export const EmergencyAndSafetyCenter: React.FC = () => {
  const { userLocation, requestLocation, isOffline, downloadOfflinePack, offlinePackDownloaded } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedEmbassyCategory, setSelectedEmbassyCategory] = useState<string>('all');

  const userLat = userLocation?.lat ?? -1.286389;
  const userLng = userLocation?.lng ?? 36.817223;

  const googleMapsShareLink = `https://www.google.com/maps?q=${userLat},${userLng}`;
  const emergencySmsBody = `EMERGENCY ALERT: I am a tourist in Kenya and need immediate assistance. My current GPS coordinates are: ${userLat.toFixed(5)}, ${userLng.toFixed(5)}. Location link: ${googleMapsShareLink}`;

  const copyShareLocation = () => {
    navigator.clipboard.writeText(emergencySmsBody);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section id="emergency-section" className="py-16 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 mb-3 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>24/7 Tourist Support & Safety</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Emergency & Safety Hub
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            One-touch emergency dialers for Tourist Police, AMREF Air Ambulance, national hotlines, embassy consular offices, and live GPS location sharing.
          </p>
        </div>

        {/* Live GPS Emergency Share Banner */}
        <div className="bg-gradient-to-r from-red-950/80 via-stone-900 to-red-950/80 rounded-3xl p-6 sm:p-8 border border-red-800/60 shadow-2xl mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-red-400 animate-bounce" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Share Your Real-Time GPS Location
                </h3>
              </div>
              <p className="text-xs text-stone-300 max-w-lg">
                Instantly transmit your exact latitude and longitude to police, tour operators, safari lodges, or emergency contacts.
              </p>
              <div className="inline-block bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 text-xs font-mono text-amber-400">
                GPS: {userLat.toFixed(5)}°, {userLng.toFixed(5)}°
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={copyShareLocation}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Copied Alert Message!' : 'Copy Location & SMS Alert'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(emergencySmsBody)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Primary 24/7 Hotlines Grid */}
        <div className="mb-16">
          <h3 className="font-serif font-bold text-xl text-white mb-6 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-amber-500" />
            <span>Essential Emergency Contacts & Evacuation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMERGENCY_CONTACTS.map((item) => (
              <div
                key={item.id}
                id={`emergency-card-${item.id}`}
                className="bg-stone-900 rounded-2xl p-6 border border-stone-800 hover:border-red-500/50 shadow-xl flex flex-col justify-between space-y-4 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-800 text-amber-400">
                      {item.hours}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-white">{item.name}</h4>
                  <p className="text-xs text-stone-400 mt-1">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">{item.phone}</span>
                  <a
                    href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foreign Embassies & High Commissions in Nairobi */}
        <div className="border-t border-stone-800 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-500" />
                <span>Embassies & Consulates in Nairobi (Gigiri / Muthaiga)</span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                For lost passports, emergency travel documents, and consular assistance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMBASSIES.map((embassy) => (
              <div
                key={embassy.id}
                className="bg-stone-900 rounded-2xl p-5 border border-stone-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{embassy.flag}</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">{embassy.country}</h4>
                    <p className="text-[11px] text-stone-400 line-clamp-1">{embassy.name}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <div>📍 <strong>Address:</strong> {embassy.address}</div>
                  <div>📞 <strong>Phone:</strong> {embassy.phone}</div>
                  {embassy.emergencyPhone && (
                    <div className="text-red-400 font-bold">
                      🚨 <strong>24/7 Consular Duty:</strong> {embassy.emergencyPhone}
                    </div>
                  )}
                  {embassy.email && (
                    <div className="text-stone-400 truncate">✉️ {embassy.email}</div>
                  )}
                </div>

                <a
                  href={`tel:${embassy.emergencyPhone || embassy.phone}`}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs py-2 rounded-xl text-center block"
                >
                  Call Embassy Consular Desk
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Tourist Safety Guidelines */}
        <div className="mt-16 bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800">
          <h3 className="font-serif font-bold text-lg text-white mb-4 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-500" />
            <span>Essential Tourist Safety Pointers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-stone-300">
            <div className="space-y-1 bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <h5 className="font-bold text-white text-sm">Safari & Wildlife Safety</h5>
              <p>• Never alight from your safari vehicle inside national parks unless at designated KWS observation picnic sites.</p>
              <p>• Do not feed baboons, monkeys or wild animals; keep tent zippers closed in lodges.</p>
            </div>

            <div className="space-y-1 bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <h5 className="font-bold text-white text-sm">City & Cash Safety</h5>
              <p>• In Nairobi CBD, avoid displaying expensive jewelry, high-end cameras or open wallets on crowded streets.</p>
              <p>• Pay with M-PESA or cards whenever possible to avoid carrying large bundles of cash.</p>
            </div>

            <div className="space-y-1 bg-stone-950 p-4 rounded-2xl border border-stone-800">
              <h5 className="font-bold text-white text-sm">Lost Passport Protocol</h5>
              <p>• Step 1: Obtain an official Police Abstract from the nearest Tourist Police / National Police station.</p>
              <p>• Step 2: Contact your embassy in Gigiri for an Emergency Travel Certificate (ETC).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
