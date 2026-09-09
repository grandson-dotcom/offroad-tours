import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CurrencyCode,
  LanguageCode,
  BookingRecord,
  Destination,
  SafariTour,
  Hotel,
  Restaurant,
  KenyanFoodItem,
  LocalGuide
} from '../types';
import { EXCHANGE_RATES, DESTINATIONS, SAFARIS, HOTELS } from '../data/kenyaData';
import confetti from 'canvas-confetti';

export type AppTab =
  | 'home'
  | 'packages'
  | 'explore'
  | 'explore-map'
  | 'safaris'
  | 'hotels'
  | 'food'
  | 'near-me'
  | 'airport'
  | 'planner'
  | 'translator'
  | 'emergency'
  | 'currency-calc'
  | 'transport'
  | 'guides'
  | 'gallery'
  | 'events'
  | 'deals'
  | 'dashboard'
  | 'business-portal';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  isLoggedIn: boolean;
  travelStyle: string;
  interests: string[];
}

export interface DayPlan {
  day: number;
  dateStr?: string;
  title: string;
  region: string;
  morning: { activity: string; placeId?: string; costUSD: number; time: string };
  afternoon: { activity: string; placeId?: string; costUSD: number; time: string };
  evening: { activity: string; placeId?: string; costUSD: number; time: string };
  lodgeName: string;
  transportMethod: string;
  travelTimeHours: number;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  durationDays: number;
  travelStyle: string;
  budgetUSD: number;
  travellersCount: number;
  days: DayPlan[];
  createdAt: string;
}

interface AppContextType {
  tab: AppTab;
  setTab: (tab: AppTab) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  user: UserProfile;
  loginAsGuest: () => void;
  loginUser: (email: string, name: string, country: string) => void;
  logoutUser: () => void;
  formatPrice: (amountUSD: number) => string;
  convertCurrency: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  bookings: BookingRecord[];
  addBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt' | 'referenceCode' | 'status'>) => BookingRecord;
  cancelBooking: (id: string) => void;
  userLocation: { lat: number; lng: number; label: string; granted: boolean };
  requestLocation: () => void;
  searchFilter: string;
  setSearchFilter: (q: string) => void;
  activeDestinationModal: Destination | null;
  setActiveDestinationModal: (d: Destination | null) => void;
  activeSafariModal: SafariTour | null;
  setActiveSafariModal: (s: SafariTour | null) => void;
  activeHotelModal: Hotel | null;
  setActiveHotelModal: (h: Hotel | null) => void;
  activeFoodModal: KenyanFoodItem | null;
  setActiveFoodModal: (f: KenyanFoodItem | null) => void;
  bookingItem: { type: 'safari' | 'hotel' | 'guide' | 'restaurant' | 'transport'; item: any } | null;
  setBookingItem: (item: { type: 'safari' | 'hotel' | 'guide' | 'restaurant' | 'transport'; item: any } | null) => void;
  isOffline: boolean;
  downloadOfflinePack: () => void;
  offlinePackDownloaded: boolean;
  activeItinerary: ItineraryPlan | null;
  setActiveItinerary: (it: ItineraryPlan | null) => void;
  generateQuickItinerary: (days: number, style: string, budget: number) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tab, setTab] = useState<AppTab>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('explore_kenya_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 'tourist-guest-1',
      name: 'Guest Explorer',
      email: 'visitor@tourist.ke',
      country: 'International Visitor',
      isLoggedIn: false,
      travelStyle: 'Wildlife & Safari Enthusiast',
      interests: ['Big 5 Safaris', 'Beaches', 'Kenyan Food', 'Photography']
    };
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('explore_kenya_favorites');
    return saved ? JSON.parse(saved) : ['maasai-mara', 'diani-beach', 'mara-3day-classic', 'carnivore-nairobi'];
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('explore_kenya_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'bk-demo-1',
        type: 'safari',
        itemId: 'mara-3day-classic',
        itemTitle: '3-Day Maasai Mara Big 5 & Great Migration Safari',
        startDate: '2026-09-15',
        endDate: '2026-09-17',
        guests: 2,
        totalPriceUSD: 980,
        totalPriceKES: 127890,
        status: 'Confirmed',
        customerName: 'Guest Explorer',
        customerEmail: 'visitor@tourist.ke',
        customerPhone: '+254 700 123 456',
        paymentMethod: 'M-PESA',
        referenceCode: 'KE-MARA-89421',
        createdAt: '2026-08-26'
      }
    ];
  });

  const [userLocation, setUserLocation] = useState({
    lat: -1.3192,
    lng: 36.9275,
    label: 'JKIA Nairobi (Airport)',
    granted: false
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [offlinePackDownloaded, setOfflinePackDownloaded] = useState<boolean>(() => {
    return localStorage.getItem('explore_kenya_offline_pack') === 'true';
  });

  const [activeDestinationModal, setActiveDestinationModal] = useState<Destination | null>(null);
  const [activeSafariModal, setActiveSafariModal] = useState<SafariTour | null>(null);
  const [activeHotelModal, setActiveHotelModal] = useState<Hotel | null>(null);
  const [activeFoodModal, setActiveFoodModal] = useState<KenyanFoodItem | null>(null);
  const [bookingItem, setBookingItem] = useState<{ type: 'safari' | 'hotel' | 'guide' | 'restaurant' | 'transport'; item: any } | null>(null);

  const [activeItinerary, setActiveItinerary] = useState<ItineraryPlan | null>(() => {
    const saved = localStorage.getItem('explore_kenya_itinerary');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showNotification('🌐 Back Online — Synchronizing live Kenyan currency rates & updates.');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showNotification('📶 Offline Mode Active — Accessing cached offline guides & emergency resources.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('explore_kenya_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('explore_kenya_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('explore_kenya_user', JSON.stringify(user));
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const convertCurrency = (amount: number, from: CurrencyCode, to: CurrencyCode): number => {
    const amountInUSD = amount / EXCHANGE_RATES[from];
    return amountInUSD * EXCHANGE_RATES[to];
  };

  const formatPrice = (amountUSD: number): string => {
    const validAmount = typeof amountUSD === 'number' && !isNaN(amountUSD) ? amountUSD : 0;
    const rate = EXCHANGE_RATES[currency] || 1;
    const converted = Math.round(validAmount * rate);

    if (currency === 'KES') {
      return `KES ${converted.toLocaleString()}`;
    }
    if (currency === 'EUR') {
      return `€${converted.toLocaleString()}`;
    }
    if (currency === 'GBP') {
      return `£${converted.toLocaleString()}`;
    }
    if (currency === 'JPY') {
      return `¥${converted.toLocaleString()}`;
    }
    return `$${converted.toLocaleString()} ${currency}`;
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showNotification('Removed from your saved places.');
        return prev.filter((item) => item !== id);
      } else {
        showNotification('⭐ Saved to your Kenya Wishlist!');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt' | 'referenceCode' | 'status'>): BookingRecord => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    const ref = `KE-${bookingData.type.toUpperCase()}-${rand}`;
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      status: 'Confirmed',
      referenceCode: ref,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings((prev) => [newBooking, ...prev]);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showNotification(`🎉 Booking Confirmed! Ref: ${ref}. Added to your trip dashboard.`);
    return newBooking;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showNotification('Booking successfully cancelled in accordance with free cancellation policy.');
  };

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: `Current GPS: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`,
            granted: true
          });
          showNotification('📍 Live location detected! Displaying nearby Kenyan attractions, hotels & services.');
        },
        () => {
          setUserLocation({
            lat: -1.2921,
            lng: 36.8219,
            label: 'Nairobi Central (Default)',
            granted: true
          });
          showNotification('📍 Using Nairobi Central as current location.');
        }
      );
    } else {
      showNotification('Geolocation not supported, using Nairobi City default.');
    }
  };

  const loginAsGuest = () => {
    setUser({
      id: `tourist-${Date.now()}`,
      name: 'Guest Explorer',
      email: 'guest@explorekenya.org',
      country: 'Visiting Tourist',
      isLoggedIn: true,
      travelStyle: 'Wildlife & Beach Safari',
      interests: ['Safaris', 'Culture', 'Cuisine']
    });
    showNotification('👋 Welcome to Kenya! Browsing as Guest Explorer.');
  };

  const loginUser = (email: string, name: string, country: string) => {
    setUser({
      id: `user-${Date.now()}`,
      name: name || 'Tourist Explorer',
      email: email || 'traveler@gmail.com',
      country: country || 'International',
      isLoggedIn: true,
      travelStyle: 'Custom Experience',
      interests: ['Safaris', 'Luxury Lodges', 'Beaches']
    });
    showNotification(`Welcome back, ${name}! Your Kenya itinerary & bookings are synced.`);
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showNotification('Signed out.');
  };

  const downloadOfflinePack = () => {
    localStorage.setItem('explore_kenya_offline_pack', 'true');
    setOfflinePackDownloaded(true);
    showNotification('✅ Kenya Complete Travel Pack downloaded! Safe travels even with zero cell reception.');
  };

  const generateQuickItinerary = (days: number, style: string, budget: number) => {
    const sampleDays: DayPlan[] = [];

    if (days >= 1) {
      sampleDays.push({
        day: 1,
        title: 'Nairobi Urban Safari & Iconic Wildlife Sanctuaries',
        region: 'Nairobi',
        morning: { activity: 'Nairobi National Park morning predator drive', placeId: 'nairobi-city', costUSD: 43, time: '06:30 AM - 10:30 AM' },
        afternoon: { activity: 'Giraffe Centre hand-feeding & Sheldrick Elephant Orphanage', placeId: 'nairobi-city', costUSD: 30, time: '11:00 AM - 03:00 PM' },
        evening: { activity: 'Nyama Choma dinner and Dawa cocktail at Carnivore', placeId: 'carnivore-nairobi', costUSD: 35, time: '06:30 PM - 09:30 PM' },
        lodgeName: 'Villa Rosa Kempinski / Wildebeest Eco Camp',
        transportMethod: 'Uber / Private Chauffeur',
        travelTimeHours: 1.5
      });
    }

    if (days >= 2) {
      sampleDays.push({
        day: 2,
        title: 'Great Rift Valley Escarpment & Lake Naivasha Hell’s Gate',
        region: 'Rift Valley',
        morning: { activity: 'Scenic drive descending Rift Valley viewpoint to Lake Naivasha', placeId: 'great-rift-valley', costUSD: 20, time: '07:30 AM - 11:30 AM' },
        afternoon: { activity: 'Bicycle safari through Hell’s Gate volcanic canyon & gorge hike', placeId: 'great-rift-valley', costUSD: 30, time: '12:30 PM - 04:30 PM' },
        evening: { activity: 'Lake Naivasha boat ride with hippos & sunset fish dinner', placeId: 'great-rift-valley', costUSD: 25, time: '05:00 PM - 08:00 PM' },
        lodgeName: 'Lake Naivasha Sopa Resort',
        transportMethod: '4x4 Safari Land Cruiser',
        travelTimeHours: 2.0
      });
    }

    if (days >= 3) {
      sampleDays.push({
        day: 3,
        title: 'Lake Nakuru Rhino Sanctuary & Birding Paradise',
        region: 'Rift Valley',
        morning: { activity: 'Rhino tracking in Lake Nakuru yellow acacia woodlands', placeId: 'lake-nakuru', costUSD: 70, time: '07:00 AM - 11:00 AM' },
        afternoon: { activity: 'Baboon Cliff picnic lunch & Makalia Falls exploration', placeId: 'lake-nakuru', costUSD: 20, time: '12:00 PM - 03:30 PM' },
        evening: { activity: 'Campfire sundowner drinks overlooking alkaline lake', placeId: 'lake-nakuru', costUSD: 15, time: '05:30 PM - 08:30 PM' },
        lodgeName: 'Sarova Lion Hill Game Lodge',
        transportMethod: '4x4 Safari Vehicle',
        travelTimeHours: 1.8
      });
    }

    if (days >= 4) {
      sampleDays.push({
        day: 4,
        title: 'Journey to the Legendary Maasai Mara Plains',
        region: 'Rift Valley',
        morning: { activity: 'Drive through Narok town and enter Maasai Mara via Sekenani Gate', placeId: 'maasai-mara', costUSD: 100, time: '07:00 AM - 12:30 PM' },
        afternoon: { activity: 'Afternoon big cat search (Lions, Cheetahs, Leopards)', placeId: 'maasai-mara', costUSD: 0, time: '03:30 PM - 06:30 PM' },
        evening: { activity: 'Traditional Maasai cultural warrior dance by the boma fire', placeId: 'maasai-mara', costUSD: 25, time: '07:30 PM - 09:30 PM' },
        lodgeName: 'Sarova Mara Game Camp / Luxury Tented Camp',
        transportMethod: '4x4 Safari Land Cruiser',
        travelTimeHours: 4.5
      });
    }

    if (days >= 5) {
      sampleDays.push({
        day: 5,
        title: 'Full Day Maasai Mara Migration & Bush Picnic',
        region: 'Rift Valley',
        morning: { activity: 'Optional sunrise Hot Air Balloon flight over Mara or dawn game drive', placeId: 'maasai-mara', costUSD: 450, time: '05:30 AM - 10:00 AM' },
        afternoon: { activity: 'Mara River crossing surveillance & picnic under acacia trees', placeId: 'maasai-mara', costUSD: 0, time: '11:00 AM - 04:00 PM' },
        evening: { activity: 'Fine dining safari feast in the wild under the African stars', placeId: 'maasai-mara', costUSD: 40, time: '07:00 PM - 10:00 PM' },
        lodgeName: 'Sarova Mara Game Camp',
        transportMethod: 'Pop-up Roof Safari Vehicle',
        travelTimeHours: 6.0
      });
    }

    if (days >= 6) {
      sampleDays.push({
        day: 6,
        title: 'Fly to the Indian Ocean Coast — Diani White Sands',
        region: 'Coast',
        morning: { activity: 'Bush airstrip flight (Safarilink) from Mara to Ukunda Diani', placeId: 'diani-beach', costUSD: 220, time: '09:30 AM - 11:45 AM' },
        afternoon: { activity: 'Check-in to oceanfront resort & barefoot walk on powdery sands', placeId: 'diani-beach', costUSD: 0, time: '01:00 PM - 04:30 PM' },
        evening: { activity: 'Fresh grilled lobster and Swahili crab dinner with ocean breeze', placeId: 'the-sands-nomad-diani', costUSD: 45, time: '06:30 PM - 09:30 PM' },
        lodgeName: 'The Sands at Nomad Beach Resort',
        transportMethod: 'Bush Flight + Coastal Transfer',
        travelTimeHours: 2.5
      });
    }

    if (days >= 7) {
      sampleDays.push({
        day: 7,
        title: 'Wasini Island Dolphin Dhow Cruise & Coral Reef Snorkel',
        region: 'Coast',
        morning: { activity: 'Sail on traditional wooden dhow into Kisite Marine Park with dolphins', placeId: 'diani-beach', costUSD: 95, time: '07:00 AM - 12:00 PM' },
        afternoon: { activity: 'Swahili seafood feast on Wasini Island & Shimoni slave caves history', placeId: 'diani-beach', costUSD: 0, time: '12:30 PM - 04:30 PM' },
        evening: { activity: 'Sunset cocktails overlooking turquoise Indian Ocean', placeId: 'the-sands-nomad-diani', costUSD: 30, time: '06:00 PM - 09:00 PM' },
        lodgeName: 'The Sands at Nomad Beach Resort',
        transportMethod: 'Traditional Dhow & Van',
        travelTimeHours: 3.0
      });
    }

    const newPlan: ItineraryPlan = {
      id: `itin-${Date.now()}`,
      title: `${days}-Day Ultimate Kenya ${style} Itinerary`,
      durationDays: days,
      travelStyle: style,
      budgetUSD: budget,
      travellersCount: 2,
      days: sampleDays,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setActiveItinerary(newPlan);
    localStorage.setItem('explore_kenya_itinerary', JSON.stringify(newPlan));
    setTab('planner');
    showNotification(`✨ Generated custom ${days}-Day Kenya itinerary! Tailored to ${style}.`);
  };

  return (
    <AppContext.Provider
      value={{
        tab,
        setTab,
        currency,
        setCurrency,
        language,
        setLanguage,
        user,
        loginAsGuest,
        loginUser,
        logoutUser,
        formatPrice,
        convertCurrency,
        favorites,
        toggleFavorite,
        isFavorite,
        bookings,
        addBooking,
        cancelBooking,
        userLocation,
        requestLocation,
        searchFilter,
        setSearchFilter,
        activeDestinationModal,
        setActiveDestinationModal,
        activeSafariModal,
        setActiveSafariModal,
        activeHotelModal,
        setActiveHotelModal,
        activeFoodModal,
        setActiveFoodModal,
        bookingItem,
        setBookingItem,
        isOffline,
        downloadOfflinePack,
        offlinePackDownloaded,
        activeItinerary,
        setActiveItinerary,
        generateQuickItinerary,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
