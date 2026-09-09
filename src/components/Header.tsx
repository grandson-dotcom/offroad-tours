import React, { useState } from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { usePackageBooking } from '../context/PackageBookingContext';
import { CurrencyCode, LanguageCode } from '../types';
import {
  Compass,
  Search,
  MapPin,
  Heart,
  User,
  ShieldAlert,
  Menu,
  X,
  Globe,
  DollarSign,
  Briefcase,
  Plane,
  Sparkles,
  ChevronDown,
  PlusCircle,
  PackageCheck,
  Bell,
  Layers,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    tab,
    setTab,
    currency,
    setCurrency,
    language,
    setLanguage,
    favorites,
    bookings,
    user,
    loginAsGuest,
    logoutUser,
    isOffline,
    downloadOfflinePack,
    offlinePackDownloaded
  } = useApp();

  const {
    packageBookings,
    notifications,
    markNotificationAsRead,
    comparePackageIds,
    setIsComparisonModalOpen
  } = usePackageBooking();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const unreadNotifications = (notifications || []).filter(n => !n.read);

  // Nav items: Home, Travel Packages, Explore Map, Destinations, Tour, Hotels, Blog, Admin Portal, Contact
  const navItems: { id: AppTab; label: string; tab: AppTab }[] = [
    { id: 'home', label: 'Home', tab: 'home' },
    { id: 'packages', label: 'Travel Packages', tab: 'packages' },
    { id: 'explore-map', label: 'Explore Map', tab: 'explore-map' },
    { id: 'explore', label: 'Destinations', tab: 'explore' },
    { id: 'safaris', label: 'Tour & Safari', tab: 'safaris' },
    { id: 'hotels', label: 'Hotels', tab: 'hotels' },
    { id: 'business-portal', label: 'Business Admin', tab: 'business-portal' },
    { id: 'emergency', label: 'Contact & SOS', tab: 'emergency' }
  ];

  const moreItems: { id: AppTab; label: string; icon: string }[] = [
    { id: 'explore-map', label: 'Kenya Map & 47 Counties', icon: '🗺️' },
    { id: 'near-me', label: 'Near Me Live Radar', icon: '📍' },
    { id: 'airport', label: 'Just Landed Assistant', icon: '✈️' },
    { id: 'planner', label: 'Trip Planner Wizard', icon: '🧭' },
    { id: 'translator', label: 'Kiswahili Audio Phrasebook', icon: '🗣️' },
    { id: 'currency-calc', label: 'Currency & Cost Calculator', icon: '💱' },
    { id: 'transport', label: 'SGR Train & Taxis', icon: '🚕' },
    { id: 'gallery', label: 'Kenya Photo Gallery', icon: '📸' },
    { id: 'deals', label: 'Special Safari Deals', icon: '🏷️' }
  ];

  const currencies: CurrencyCode[] = ['USD', 'KES', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY', 'AED', 'ZAR'];
  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English (EN)' },
    { code: 'sw', label: 'Kiswahili (SW)' },
    { code: 'de', label: 'Deutsch (DE)' },
    { code: 'fr', label: 'Français (FR)' }
  ];

  const handleNav = (targetTab: AppTab) => {
    setTab(targetTab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-900/90 backdrop-blur-md border-b border-white/10 text-white transition-all shadow-md">
      {/* Offline Mode Alert Bar */}
      {isOffline && (
        <div className="bg-amber-500 text-stone-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-stone-950 animate-pulse"></span>
            <span>Offline Mode Active — You can still access cached itineraries and emergency numbers.</span>
          </div>
          {!offlinePackDownloaded && (
            <button
              onClick={downloadOfflinePack}
              className="underline font-bold text-xs hover:text-white"
            >
              Download Offline Pack
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ExploreKenya brand logo */}
          <div
            id="brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              ExploreKenya<span className="text-[#f85a5a]">.</span>
            </span>
          </div>

          {/* Center/Desktop Navigation (Home, About, Tour, Hotels, Blog, Contact, More) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNav(item.tab)}
                className={`transition-colors py-1 relative hover:text-white ${
                  tab === item.tab
                    ? 'text-white font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#f85a5a]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* More features dropdown */}
            <div className="relative group">
              <button
                className="py-1 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-stone-900/95 backdrop-blur-lg border border-stone-800 rounded-2xl shadow-2xl py-2 hidden group-hover:block transition-all z-50">
                {moreItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-stone-200 hover:bg-white/10 hover:text-[#f85a5a] flex items-center gap-2.5 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
                <div className="border-t border-stone-800 my-1"></div>
                <button
                  onClick={() => handleNav('business-portal')}
                  className="w-full text-left px-4 py-2.5 text-xs text-emerald-400 hover:bg-white/10 flex items-center gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Business / Admin Portal</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Right Action: Add Listing Button + Utility Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                id="btn-currency-selector"
                onClick={() => {
                  setCurrencyDropdown(!currencyDropdown);
                  setLangDropdown(false);
                  setUserDropdown(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {currencyDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl py-1 z-50 max-h-56 overflow-y-auto">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs ${
                        currency === c
                          ? 'bg-[#f85a5a]/20 text-[#f85a5a] font-bold'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                id="btn-language-selector"
                onClick={() => {
                  setLangDropdown(!langDropdown);
                  setCurrencyDropdown(false);
                  setUserDropdown(false);
                }}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 opacity-80" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs ${
                        language === l.code
                          ? 'bg-[#f85a5a]/20 text-[#f85a5a] font-bold'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Packages Quick Button */}
            {comparePackageIds.length > 0 && (
              <button
                id="btn-header-compare"
                onClick={() => setIsComparisonModalOpen(true)}
                className="relative flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-[#f85a5a] text-white shadow-md hover:bg-[#e04848] transition-all"
                title="Compare Selected Packages"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Compare</span>
                <span className="w-4 h-4 rounded-full bg-white text-[#f85a5a] text-[10px] flex items-center justify-center font-black">
                  {comparePackageIds.length}
                </span>
              </button>
            )}

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                id="btn-notification-bell"
                onClick={() => {
                  setNotificationDropdown(!notificationDropdown);
                  setCurrencyDropdown(false);
                  setLangDropdown(false);
                  setUserDropdown(false);
                }}
                className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Trip Updates & Notifications"
              >
                <Bell className="w-4 h-4 text-amber-300" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black flex items-center justify-center animate-pulse">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {notificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <div className="flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Trip Alerts ({unreadNotifications.length} Unread)
                      </span>
                    </div>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={() => {
                          unreadNotifications.forEach(n => markNotificationAsRead(n.id));
                        }}
                        className="text-[10px] text-amber-400 hover:text-amber-300 underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-stone-800/60 max-h-72 overflow-y-auto mt-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-stone-400">
                        No notifications yet. Trip updates will appear here.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.actionUrl === 'dashboard') {
                              handleNav('dashboard');
                              setNotificationDropdown(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                            !n.read ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-white/5 opacity-70'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-white leading-tight">{n.title}</h5>
                            <span className="text-[10px] text-stone-500 shrink-0 font-mono">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-800 text-center">
                    <button
                      onClick={() => {
                        setNotificationDropdown(false);
                        handleNav('dashboard');
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Open Travel Command Center →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist / Cart Button */}
            <button
              id="btn-wishlist-dashboard"
              onClick={() => handleNav('dashboard')}
              className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              title="My Trip Dashboard & Bookings"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              {(favorites.length > 0 || bookings.length > 0 || packageBookings.length > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f85a5a] text-white text-[10px] font-bold flex items-center justify-center">
                  {packageBookings.length + bookings.length || favorites.length}
                </span>
              )}
            </button>

            {/* Template Outline Pill Button: Add listing */}
            <button
              id="btn-add-listing-header"
              onClick={() => handleNav('business-portal')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/70 hover:border-white text-white text-xs font-semibold hover:bg-white hover:text-stone-950 transition-all duration-200 tracking-wide"
            >
              <span>Add listing</span>
            </button>

            {/* Emergency SOS Badge */}
            <button
              id="btn-emergency-header"
              onClick={() => handleNav('emergency')}
              className="flex items-center gap-1 bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md active:scale-95 transition-all"
              title="24/7 Tourist Emergency Services"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.tab)}
                className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                  tab === item.tab
                    ? 'bg-[#f85a5a] text-white font-bold'
                    : 'bg-stone-800/80 text-stone-200 hover:bg-stone-700'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-stone-800 pt-2 grid grid-cols-2 gap-2">
            {moreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left px-3 py-2 rounded-lg text-[11px] font-medium bg-stone-800/50 text-stone-300 hover:text-white flex items-center gap-1.5"
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
            <button
              onClick={() => handleNav('planner')}
              className="flex-1 bg-[#f85a5a] hover:bg-[#e04848] text-white font-bold text-xs py-2.5 px-3 rounded-xl text-center shadow"
            >
              ✨ Plan Trip
            </button>
            <button
              onClick={() => handleNav('business-portal')}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-3 rounded-xl text-center border border-white/20"
            >
              + Add listing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
