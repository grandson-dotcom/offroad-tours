import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PackageBookingProvider } from './context/PackageBookingContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TravelPackagesMarketplace } from './components/TravelPackagesMarketplace';
import { PackageDetailsModal } from './components/PackageDetailsModal';
import { PackageBuilderWizard } from './components/PackageBuilderWizard';
import { PackageCheckoutModal } from './components/PackageCheckoutModal';
import { PackageComparisonModal } from './components/PackageComparisonModal';
import { CustomerTripDashboard } from './components/CustomerTripDashboard';
import { WildlifeSection } from './components/WildlifeSection';
import { DestinationsGrid } from './components/DestinationsGrid';
import { SafariMarketplace } from './components/SafariMarketplace';
import { AccommodationFinder } from './components/AccommodationFinder';
import { RestaurantDiscovery } from './components/RestaurantDiscovery';
import { NearMeRadar } from './components/NearMeRadar';
import { AirportAssistant } from './components/AirportAssistant';
import { TripPlannerWizard } from './components/TripPlannerWizard';
import { KiswahiliTranslator } from './components/KiswahiliTranslator';
import { CurrencyAndCostCalculator } from './components/CurrencyAndCostCalculator';
import { EmergencyAndSafetyCenter } from './components/EmergencyAndSafetyCenter';
import { TransportSection } from './components/TransportSection';
import { LocalGuidesSection } from './components/LocalGuidesSection';
import { BusinessAdminPortal } from './components/BusinessAdminPortal';
import { PhotoGallery } from './components/PhotoGallery';
import { EventsSection } from './components/EventsSection';
import { DealsSection } from './components/DealsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { UserDashboard } from './components/UserDashboard';
import { ExploreKenyaMap } from './components/ExploreKenyaMap';
import { ShieldAlert, MapPin, Compass, Phone } from 'lucide-react';

const AppContent: React.FC = () => {
  const { tab, setTab } = useApp();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-900 flex flex-col font-sans selection:bg-[#f85a5a] selection:text-white">
      {/* Universal Top Header */}
      <Header />

      {/* Main Content Body with rich photography and clean travel template styling */}
      <main className="flex-1">
        {tab === 'home' && (
          <div>
            <Hero />
            <TravelPackagesMarketplace />
            <DestinationsGrid />
            <SafariMarketplace />
            <WildlifeSection />
            <AccommodationFinder />
            <RestaurantDiscovery />
            <NearMeRadar />
            <AirportAssistant />
            <TripPlannerWizard />
            <EventsSection />
            <DealsSection />
          </div>
        )}

        {tab === 'packages' && <TravelPackagesMarketplace />}
        {tab === 'explore-map' && <ExploreKenyaMap />}
        {tab === 'explore' && (
          <div>
            <div className="bg-stone-900 text-white py-4 px-4 border-b border-stone-800">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <Compass className="w-4 h-4 text-[#f85a5a]" />
                  <span>Looking for the interactive GPS map covering all 47 counties of Kenya?</span>
                </div>
                <button
                  onClick={() => setTab('explore-map')}
                  className="px-3.5 py-1.5 bg-[#f85a5a] hover:bg-[#e04848] text-white rounded-lg text-xs font-semibold self-start sm:self-auto transition-colors shadow"
                >
                  Open Full Kenya Interactive Map & Navigation →
                </button>
              </div>
            </div>
            <DestinationsGrid />
          </div>
        )}
        {tab === 'safaris' && (
          <div>
            <TravelPackagesMarketplace />
            <SafariMarketplace />
          </div>
        )}
        {tab === 'hotels' && <AccommodationFinder />}
        {tab === 'food' && <RestaurantDiscovery />}
        {tab === 'near-me' && <NearMeRadar />}
        {tab === 'airport' && <AirportAssistant />}
        {tab === 'planner' && <TripPlannerWizard />}
        {tab === 'translator' && <KiswahiliTranslator />}
        {tab === 'currency-calc' && <CurrencyAndCostCalculator />}
        {tab === 'emergency' && <EmergencyAndSafetyCenter />}
        {tab === 'transport' && <TransportSection />}
        {tab === 'guides' && <LocalGuidesSection />}
        {tab === 'dashboard' && (
          <div>
            <CustomerTripDashboard />
            <UserDashboard />
          </div>
        )}
        {tab === 'business-portal' && <BusinessAdminPortal />}
        {tab === 'gallery' && <PhotoGallery />}
        {tab === 'events' && <EventsSection />}
        {tab === 'deals' && <DealsSection />}
      </main>

      {/* Floating Fast SOS Safety Action Button */}
      {tab !== 'emergency' && (
        <button
          id="floating-sos-button"
          onClick={() => setTab('emergency')}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl shadow-red-950/80 border border-red-400/40 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95 group"
          title="Tourist 24/7 Emergency Hub & Live GPS Sharing"
        >
          <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
          <span className="hidden sm:inline font-bold text-xs tracking-wider">
            24/7 SOS / TPU
          </span>
        </button>
      )}

      {/* Travel Package Interactive Customization, Checkout & Comparison Modals */}
      <PackageDetailsModal />
      <PackageBuilderWizard />
      <PackageCheckoutModal />
      <PackageComparisonModal />

      {/* General Safari Booking Modal (triggered globally via bookingItem in AppContext) */}
      <BookingModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <PackageBookingProvider>
        <AppContent />
      </PackageBookingProvider>
    </AppProvider>
  );
}

export default App;
