import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TravelPackage,
  TravelSupplier,
  PromoCode,
  PackageReview,
  PackageBooking,
  PackageCustomizationSelection,
  CalculatedPackagePrice,
  VehicleOption,
  AccommodationOption,
  GuideOption,
  PackageActivityOption,
  PackageWaitlistEntry,
  CustomTripQuotation,
  SupportTicket,
  AppNotification,
  LostPropertyReport,
  DriverGuideTripUpdate
} from '../types';
import {
  INITIAL_TRAVEL_PACKAGES,
  INITIAL_SUPPLIERS,
  INITIAL_PROMO_CODES,
  INITIAL_PACKAGE_REVIEWS
} from '../data/packagesData';

export interface AdminMetrics {
  totalRevenueKES: number;
  totalRevenueUSD: number;
  totalSupplierCostKES: number;
  totalSupplierCostsKES: number;
  grossProfitKES: number;
  profitMarginPercent: number;
  totalBookings: number;
  activeTripsCount: number;
  pendingAssignmentsCount: number;
  pendingOperationsCount: number;
  destinationStats: { destination: string; bookings: number; revenueKES: number }[];
  packagePerformance: { name: string; bookings: number; revenueKES: number; profitKES: number }[];
  monthlyRevenue: { month: string; revenueKES: number; profitKES: number }[];
}

interface PackageBookingContextType {
  packages: TravelPackage[];
  suppliers: TravelSupplier[];
  promoCodes: PromoCode[];
  packageBookings: PackageBooking[];
  reviews: PackageReview[];
  
  // Customization & builder flow
  activePackage: TravelPackage | null;
  customization: PackageCustomizationSelection | null;
  calculatedPrice: CalculatedPackagePrice | null;
  selectedPackageForModal: TravelPackage | null;
  isDetailsModalOpen: boolean;
  isBuilderOpen: boolean;
  isCheckoutOpen: boolean;
  currentBookingConfirmation: PackageBooking | null;
  
  // Package Comparison
  comparePackageIds: string[];
  toggleComparePackage: (packageId: string) => void;
  clearComparison: () => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;
  
  // Waitlist
  waitlist: PackageWaitlistEntry[];
  joinWaitlist: (entry: Omit<PackageWaitlistEntry, 'id' | 'createdAt' | 'status'>) => void;
  
  // Custom Quotations
  quotations: CustomTripQuotation[];
  createQuotation: (quote: Omit<CustomTripQuotation, 'id' | 'quotationNumber' | 'createdAt' | 'status'>) => CustomTripQuotation;
  updateQuotationStatus: (id: string, status: CustomTripQuotation['status']) => void;
  convertQuotationToBooking: (id: string) => Promise<PackageBooking | null>;
  
  // Support Tickets
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'replies'>) => SupportTicket;
  addTicketReply: (ticketId: string, message: string, sender: 'customer' | 'support', senderName: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  
  // In-App Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  
  // Lost Property Reports
  lostPropertyReports: LostPropertyReport[];
  reportLostProperty: (report: Omit<LostPropertyReport, 'id' | 'reportCode' | 'createdAt' | 'status'>) => LostPropertyReport;
  
  // Driver & Guide Execution Updates
  driverGuideUpdates: Record<string, DriverGuideTripUpdate>;
  updateTripExecutionStatus: (bookingId: string, role: 'driver' | 'guide', newStatus: DriverGuideTripUpdate['status'], notes?: string) => void;
  
  // Booking Modification & Cancellation
  requestBookingModification: (bookingId: string, updates: { arrivalDate?: string; departureDate?: string; adults?: number; notes?: string }) => void;
  requestBookingCancellation: (bookingId: string, reason: string) => { refundKES: number; message: string };
  
  // Actions
  openPackageDetails: (pkg: TravelPackage) => void;
  closePackageDetails: () => void;
  startCustomization: (pkg: TravelPackage) => void;
  closeBuilder: () => void;
  updateCustomization: (updates: Partial<PackageCustomizationSelection>) => void;
  proceedToCheckout: () => void;
  closeCheckout: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string; discountKES: number };
  removePromoCode: () => void;
  
  // Booking creation & management
  createBooking: (customer: {
    name: string;
    email: string;
    phone: string;
    country: string;
  }, paymentMethod: 'M-PESA' | 'Card' | 'PayPal' | 'Bank Transfer', mpesaReceipt?: string) => Promise<{ success: boolean; booking: PackageBooking; error?: string }>;
  
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: PackageBooking['status']) => void;
  
  // Operations & Supplier Assignment
  assignSupplier: (
    bookingId: string,
    assignmentType: 'transport' | 'hotel' | 'guide' | 'activities',
    supplierId: string,
    details?: {
      driverName?: string;
      driverPhone?: string;
      vehiclePlate?: string;
      hotelConfirmation?: string;
      roomAssigned?: string;
      guideName?: string;
      guidePhone?: string;
      boatOperatorName?: string;
      status?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
    }
  ) => void;
  
  // Admin Package CRUD
  savePackage: (pkg: TravelPackage) => void;
  deletePackage: (packageId: string) => void;
  
  // Supplier CRUD
  saveSupplier: (supplier: TravelSupplier) => void;
  deleteSupplier: (supplierId: string) => void;
  
  // Promo CRUD
  savePromoCode: (promo: PromoCode) => void;
  deletePromoCode: (promoId: string) => void;
  
  // Reviews
  addReview: (reviewData: Omit<PackageReview, 'id' | 'createdAt' | 'verified'>) => void;
  
  // Price computation helper
  computePrice: (pkg: TravelPackage, selection: PackageCustomizationSelection) => CalculatedPackagePrice;
  
  // Admin Analytics
  adminMetrics: AdminMetrics;
}

const PackageBookingContext = createContext<PackageBookingContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PACKAGES: 'explore_kenya_travel_packages_v2',
  SUPPLIERS: 'explore_kenya_suppliers_v2',
  PROMOS: 'explore_kenya_promos_v2',
  BOOKINGS: 'explore_kenya_package_bookings_v2',
  REVIEWS: 'explore_kenya_package_reviews_v2',
  WAITLIST: 'explore_kenya_package_waitlist_v2',
  QUOTATIONS: 'explore_kenya_custom_quotations_v2',
  TICKETS: 'explore_kenya_support_tickets_v2',
  NOTIFICATIONS: 'explore_kenya_notifications_v2',
  LOST_PROPERTY: 'explore_kenya_lost_property_v2',
  DRIVER_UPDATES: 'explore_kenya_driver_updates_v2'
};

export const PackageBookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Packages State (auto-merges new initial packages)
  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PACKAGES);
      if (saved) {
        const parsed: TravelPackage[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map(p => p.id));
        const missing = INITIAL_TRAVEL_PACKAGES.filter(p => !existingIds.has(p.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem(LOCAL_STORAGE_KEYS.PACKAGES, JSON.stringify(merged));
          return merged;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load packages from localStorage', e);
    }
    return INITIAL_TRAVEL_PACKAGES;
  });

  // 2. Suppliers State
  const [suppliers, setSuppliers] = useState<TravelSupplier[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SUPPLIERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load suppliers from localStorage', e);
    }
    return INITIAL_SUPPLIERS;
  });

  // 3. Promo Codes State
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PROMOS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load promos from localStorage', e);
    }
    return INITIAL_PROMO_CODES;
  });

  // 4. Initial Seed Bookings (Realistic default bookings for customer dashboard & admin analytics)
  const [packageBookings, setPackageBookings] = useState<PackageBooking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load bookings from localStorage', e);
    }
    
    // Default seed bookings
    const naivashaPkg = INITIAL_TRAVEL_PACKAGES[0];
    const maraPkg = INITIAL_TRAVEL_PACKAGES[1];
    
    const seedBookings: PackageBooking[] = [
      {
        id: 'book-seed-naivasha',
        bookingReference: 'KEN-NVS-2026-10482',
        packageId: naivashaPkg.id,
        packageName: naivashaPkg.name,
        destination: naivashaPkg.destination,
        featuredImage: naivashaPkg.featuredImage,
        durationDays: naivashaPkg.durationDays,
        durationNights: naivashaPkg.durationNights,
        arrivalDate: '2026-09-18',
        departureDate: '2026-09-20',
        adults: 2,
        children: 1,
        infants: 0,
        selectedVehicle: naivashaPkg.vehicles[1] || naivashaPkg.vehicles[0], // Prado TX
        selectedAccommodation: naivashaPkg.accommodations[1] || naivashaPkg.accommodations[0], // Sopa Resort
        selectedGuide: naivashaPkg.guides[1] || naivashaPkg.guides[0], // Private guide
        selectedActivities: [
          naivashaPkg.activities[0], // boat ride
          naivashaPkg.activities[1], // hell's gate
          naivashaPkg.activities[2], // crescent island
          naivashaPkg.activities[3]  // cycling
        ],
        specialRequests: {
          dietaryRequirement: 'Vegetarian',
          accessibilityNeed: 'None',
          pickupLocation: 'Nairobi City Hotel',
          customPickupAddress: 'Villa Rosa Kempinski, Nairobi Room 402',
          celebrationType: 'Wedding Anniversary',
          notes: 'Please arrange a bottle of wine at the lodge for our anniversary.'
        },
        pricing: {
          basePriceKES: 50000,
          travellersMultiplier: 2.6,
          adultsTotalKES: 100000,
          childrenTotalKES: 30000,
          infantsTotalKES: 0,
          subtotalTravellersKES: 130000,
          vehicleUpgradeKES: 5000,
          accommodationUpgradeKES: 7000,
          guideUpgradeKES: 5000,
          activitiesTotalKES: 5000,
          discountKES: 10000,
          promoCodeApplied: 'KARIBU10',
          totalCustomerPriceKES: 142000,
          totalCustomerPriceUSD: 1092,
          totalSupplierCostKES: 98000,
          grossProfitKES: 44000,
          profitMarginPercent: 31
        },
        customer: {
          name: 'Sarah Jenkins',
          email: 'sarah.jenkins@example.com',
          phone: '+254 712 345 678',
          country: 'United Kingdom'
        },
        payment: {
          method: 'M-PESA',
          status: 'Completed',
          transactionId: 'MPESA-QHJ928301L',
          paidAt: '2026-09-02T10:15:00Z',
          amountPaidKES: 142000,
          currency: 'KES',
          mPesaReceiptNumber: 'QHJ928301L'
        },
        status: 'Confirmed',
        assignments: {
          transportSupplierId: 'sup-trans-rift-fleet',
          transportStatus: 'Confirmed',
          driverName: 'David Kimani',
          driverPhone: '+254 720 918 344',
          vehiclePlate: 'KDG 492T (Toyota Prado TX White)',
          hotelSupplierId: 'sup-hotel-sopa',
          hotelStatus: 'Confirmed',
          hotelConfirmationNumber: 'SOPA-NVS-88219',
          roomAssigned: 'Chalet 14 (Lakefront)',
          guideSupplierId: 'sup-gd-samson-mara',
          guideStatus: 'Confirmed',
          guideName: 'Peter Waweru (Lead Naturalist)',
          guidePhone: '+254 723 445 109',
          activitiesStatus: 'Confirmed',
          boatOperatorName: 'Capt. Peter (Lake Naivasha Boatmen)'
        },
        createdAt: '2026-09-02T10:10:00Z',
        updatedAt: '2026-09-03T14:30:00Z'
      },
      {
        id: 'book-seed-mara',
        bookingReference: 'KEN-MAR-2026-92813',
        packageId: maraPkg.id,
        packageName: maraPkg.name,
        destination: maraPkg.destination,
        featuredImage: maraPkg.featuredImage,
        durationDays: maraPkg.durationDays,
        durationNights: maraPkg.durationNights,
        arrivalDate: '2026-09-22',
        departureDate: '2026-09-24',
        adults: 2,
        children: 0,
        infants: 0,
        selectedVehicle: maraPkg.vehicles[1] || maraPkg.vehicles[0],
        selectedAccommodation: maraPkg.accommodations[1] || maraPkg.accommodations[0],
        selectedGuide: maraPkg.guides[0],
        selectedActivities: [maraPkg.activities[0], maraPkg.activities[1]],
        specialRequests: {
          dietaryRequirement: 'None',
          accessibilityNeed: 'None',
          pickupLocation: 'JKIA International Airport',
          customPickupAddress: 'Flight KQ 102 Arrival Hall',
          celebrationType: 'None'
        },
        pricing: {
          basePriceKES: 85000,
          travellersMultiplier: 2,
          adultsTotalKES: 170000,
          childrenTotalKES: 0,
          infantsTotalKES: 0,
          subtotalTravellersKES: 170000,
          vehicleUpgradeKES: 15000,
          accommodationUpgradeKES: 22000,
          guideUpgradeKES: 0,
          activitiesTotalKES: 3000,
          discountKES: 5000,
          promoCodeApplied: 'SAFARI2026',
          totalCustomerPriceKES: 205000,
          totalCustomerPriceUSD: 1576,
          totalSupplierCostKES: 152000,
          grossProfitKES: 53000,
          profitMarginPercent: 25.8
        },
        customer: {
          name: 'Jean-Pierre Dupont',
          email: 'jp.dupont@voyage.fr',
          phone: '+33 6 12 34 56 78',
          country: 'France'
        },
        payment: {
          method: 'Card',
          status: 'Completed',
          transactionId: 'STRIPE-CH_3NP291048',
          paidAt: '2026-09-01T15:20:00Z',
          amountPaidKES: 205000,
          currency: 'KES'
        },
        status: 'Confirmed',
        assignments: {
          transportSupplierId: 'sup-trans-rift-fleet',
          transportStatus: 'Assigned',
          driverName: 'Juma Mwangi',
          driverPhone: '+254 722 554 321',
          vehiclePlate: 'KDF 810Z (4x4 Safari Land Cruiser)',
          hotelSupplierId: 'sup-hotel-sarova-mara',
          hotelStatus: 'Assigned',
          hotelConfirmationNumber: 'SAROVA-MAR-5412',
          roomAssigned: 'Club Tent 07',
          guideSupplierId: 'sup-gd-samson-mara',
          guideStatus: 'Assigned',
          guideName: 'Samson Ole Lenku',
          guidePhone: '+254 711 632 890'
        },
        createdAt: '2026-09-01T15:15:00Z',
        updatedAt: '2026-09-02T09:00:00Z'
      }
    ];

    return seedBookings;
  });

  // 5. Reviews State
  const [reviews, setReviews] = useState<PackageReview[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load reviews from localStorage', e);
    }
    return INITIAL_PACKAGE_REVIEWS;
  });

  // 6. Active Customization UI state
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<TravelPackage | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<TravelPackage | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentBookingConfirmation, setCurrentBookingConfirmation] = useState<PackageBooking | null>(null);
  const [customization, setCustomization] = useState<PackageCustomizationSelection | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<CalculatedPackagePrice | null>(null);

  // 7. Package Comparison State
  const [comparePackageIds, setComparePackageIds] = useState<string[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // 8. Waitlist State
  const [waitlist, setWaitlist] = useState<PackageWaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WAITLIST);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load waitlist', e);
    }
    return [
      {
        id: 'wait-1',
        packageId: 'pkg-maasai-mara-safari',
        packageName: 'MAASAI MARA BIG 5 SAFARI',
        customerName: 'Sarah Jenkins',
        customerEmail: 'sarah.j@travelworld.co.uk',
        customerPhone: '+44 7700 900123',
        preferredDate: '2026-10-15',
        travellers: 2,
        status: 'Waiting',
        createdAt: '2026-09-02'
      }
    ];
  });

  // 9. Custom Quotations State
  const [quotations, setQuotations] = useState<CustomTripQuotation[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.QUOTATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load quotations', e);
    }
    return [
      {
        id: 'quo-seed-1',
        quotationNumber: 'QUO-2026-8921',
        customerName: 'David & Claire Miller',
        customerEmail: 'david.miller@californiatravel.com',
        customerPhone: '+1 415 892 3341',
        destinations: ['Nairobi', 'Lake Naivasha', 'Maasai Mara'],
        durationDays: 6,
        travelDates: '2026-10-10 to 2026-10-16',
        adults: 2,
        children: 2,
        travelStyle: 'Luxury Family Expedition',
        requestedServices: {
          transport: 'Toyota Land Cruiser 4x4 (Private)',
          accommodation: 'Luxury Tented Camps (Sarova & Sopa)',
          guide: 'Specialist Naturalist Guide (Birding & Big Cats)',
          activities: ['Hot Air Balloon Safari', 'Hell’s Gate Biking', 'Crescent Island Walk'],
          meals: 'Full Board All Lodges',
          parkFeesIncluded: true
        },
        itemizedCosts: {
          transportCostKES: 75000,
          accommodationCostKES: 190000,
          guideCostKES: 24000,
          activitiesCostKES: 65000,
          feesCostKES: 32000,
          discountsKES: 10000
        },
        totalPriceKES: 376000,
        totalPriceUSD: 2892,
        internalSupplierCostKES: 280000,
        profitKES: 96000,
        validUntil: '2026-09-25',
        status: 'Sent',
        createdAt: '2026-09-03',
        notes: 'Family with two teenagers. Requested connecting luxury tents and photography window seats.'
      }
    ];
  });

  // 10. Support Tickets State
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TICKETS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load tickets', e);
    }
    return [
      {
        id: 'tik-seed-1',
        ticketNumber: 'TIK-4091',
        bookingReference: 'KEN-NVS-2026-10482',
        customerName: 'Dr. Michael Chen',
        customerEmail: 'm.chen@stanford.edu',
        customerPhone: '+1 650 329 1100',
        category: 'Driver / Transport',
        priority: 'High',
        subject: 'Request pickup from Crowne Plaza Airport Hotel instead of JKIA terminal',
        message: 'Hello team, our flight lands at 11:30 PM so we are spending the first night at Crowne Plaza Airport. Can the driver pick us up at 8:00 AM directly from Crowne Plaza lobby?',
        status: 'In Progress',
        assignedAgent: 'Faith Muthoni (Head of Logistics)',
        createdAt: '2026-09-04T10:15:00Z',
        replies: [
          {
            id: 'rep-1',
            sender: 'support',
            senderName: 'Faith Muthoni',
            message: 'Hello Dr. Chen! Absolutely. We have updated your pickup notes to Crowne Plaza Airport Lobby at 08:00 AM. Driver Juma Mwangi (+254 722 554 321) has received the dispatch confirmation.',
            timestamp: '2026-09-04T11:20:00Z'
          }
        ]
      }
    ];
  });

  // 11. In-App Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load notifications', e);
    }
    return [
      {
        id: 'notif-1',
        type: 'booking',
        title: 'Booking Confirmed!',
        message: 'Your Naivasha Escape trip (Ref: KEN-NVS-2026-10482) is fully confirmed. Safari Land Cruiser and driver assigned.',
        linkTab: 'dashboard',
        read: false,
        timestamp: 'Just now'
      },
      {
        id: 'notif-2',
        type: 'driver',
        title: 'Driver Contact Details Available',
        message: 'Your safari guide Juma Mwangi (+254 722 554 321) has confirmed pickup readiness.',
        linkTab: 'dashboard',
        read: false,
        timestamp: '2 hours ago'
      },
      {
        id: 'notif-3',
        type: 'promo',
        title: 'Madaraka Season 10% Discount',
        message: 'Use code MAGICALKENYA for 10% off any coastal or wildlife safari package.',
        linkTab: 'packages',
        read: true,
        timestamp: 'Yesterday'
      }
    ];
  });

  // 12. Lost Property Reports
  const [lostPropertyReports, setLostPropertyReports] = useState<LostPropertyReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LOST_PROPERTY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load lost property', e);
    }
    return [];
  });

  // 13. Driver Guide Live Updates Map (bookingId -> update)
  const [driverGuideUpdates, setDriverGuideUpdates] = useState<Record<string, DriverGuideTripUpdate>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DRIVER_UPDATES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load driver updates', e);
    }
    return {
      'book-seed-naivasha': {
        bookingId: 'book-seed-naivasha',
        bookingReference: 'KEN-NVS-2026-10482',
        role: 'driver',
        staffName: 'Juma Mwangi',
        staffPhone: '+254 722 554 321',
        status: 'Assigned',
        locationNote: 'Vehicle prepped and fueled in Nairobi depot.',
        updatedAt: '2026-09-05T08:00:00Z'
      }
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROMOS, JSON.stringify(promoCodes));
  }, [promoCodes]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(packageBookings));
  }, [packageBookings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WAITLIST, JSON.stringify(waitlist));
  }, [waitlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.QUOTATIONS, JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TICKETS, JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOST_PROPERTY, JSON.stringify(lostPropertyReports));
  }, [lostPropertyReports]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DRIVER_UPDATES, JSON.stringify(driverGuideUpdates));
  }, [driverGuideUpdates]);

  // Pricing Rule Calculation Engine
  const computePrice = (pkg: TravelPackage, sel: PackageCustomizationSelection): CalculatedPackagePrice => {
    // Base rules:
    // Adults = full base price
    // Children (age 3-12) = 60% of base price
    // Infants (< 3 yrs) = Free (0 KES)
    const baseKES = pkg.basePriceKES;
    const adults = Math.max(1, sel.adults);
    const children = Math.max(0, sel.children);
    const infants = Math.max(0, sel.infants);

    const adultsTotalKES = adults * baseKES;
    const childrenTotalKES = children * (baseKES * 0.6);
    const infantsTotalKES = 0;
    const subtotalTravellersKES = adultsTotalKES + childrenTotalKES + infantsTotalKES;
    const travellersMultiplier = adults + (children * 0.6);

    // Vehicle upgrade
    const selectedVeh = pkg.vehicles.find(v => v.id === sel.selectedVehicleId) || pkg.vehicles[0];
    const vehicleUpgradeKES = selectedVeh ? selectedVeh.priceDifferenceKES : 0;
    const vehicleCostKES = selectedVeh ? selectedVeh.supplierCostKES : 12000;

    // Accommodation upgrade
    const selectedAcc = pkg.accommodations.find(a => a.id === sel.selectedAccommodationId) || pkg.accommodations[0];
    const accommodationUpgradeKES = selectedAcc ? selectedAcc.priceDifferenceKES : 0;
    const accommodationCostKES = selectedAcc ? selectedAcc.supplierCostKES : 15000;

    // Guide upgrade
    const selectedGd = pkg.guides.find(g => g.id === sel.selectedGuideId) || pkg.guides[0];
    const guideUpgradeKES = selectedGd ? selectedGd.priceDifferenceKES : 0;
    const guideCostKES = selectedGd ? selectedGd.supplierCostKES : 5000;

    // Activities added
    let activitiesTotalKES = 0;
    let activitiesCostKES = 0;
    sel.selectedActivityIds.forEach(actId => {
      const act = pkg.activities.find(a => a.id === actId);
      if (act && !act.includedInBase) {
        activitiesTotalKES += act.priceKES;
        activitiesCostKES += act.supplierCostKES;
      } else if (act && act.includedInBase) {
        activitiesCostKES += act.supplierCostKES;
      }
    });

    const preDiscountTotalKES = subtotalTravellersKES + vehicleUpgradeKES + accommodationUpgradeKES + guideUpgradeKES + activitiesTotalKES;

    // Apply promo discount
    let discountKES = 0;
    let promoCodeApplied = undefined;
    if (sel.promoCode) {
      const promo = promoCodes.find(p => p.code.toUpperCase() === sel.promoCode?.toUpperCase() && p.active);
      if (promo && preDiscountTotalKES >= promo.minSpendKES) {
        promoCodeApplied = promo.code;
        if (promo.discountType === 'percentage') {
          discountKES = Math.round(preDiscountTotalKES * (promo.discountValue / 100));
        } else {
          discountKES = Math.min(promo.discountValue, preDiscountTotalKES);
        }
      }
    }

    const totalCustomerPriceKES = Math.max(0, preDiscountTotalKES - discountKES);
    const totalCustomerPriceUSD = Math.round(totalCustomerPriceKES / 130);

    // Supplier & Profit calculation (internal)
    const baseSupplierCostPerTraveler = (pkg.supplierBaseCostKES / (pkg.durationDays || 3)) * (adults + (children * 0.5));
    const totalSupplierCostKES = Math.round(baseSupplierCostPerTraveler + vehicleCostKES + accommodationCostKES + guideCostKES + activitiesCostKES);
    const grossProfitKES = Math.max(0, totalCustomerPriceKES - totalSupplierCostKES);
    const profitMarginPercent = totalCustomerPriceKES > 0 ? Math.round((grossProfitKES / totalCustomerPriceKES) * 1000) / 10 : 0;

    return {
      basePriceKES: baseKES,
      travellersMultiplier,
      adultsTotalKES,
      childrenTotalKES,
      infantsTotalKES,
      subtotalTravellersKES,
      vehicleUpgradeKES,
      accommodationUpgradeKES,
      guideUpgradeKES,
      activitiesTotalKES,
      discountKES,
      promoCodeApplied,
      totalCustomerPriceKES,
      totalCustomerPriceUSD,
      totalSupplierCostKES,
      grossProfitKES,
      profitMarginPercent
    };
  };

  // Open Details Modal
  const openPackageDetails = (pkg: TravelPackage) => {
    setSelectedPackageForModal(pkg);
    setIsDetailsModalOpen(true);
  };

  const closePackageDetails = () => {
    setIsDetailsModalOpen(false);
  };

  // Start Customization Flow
  const startCustomization = (pkg: TravelPackage) => {
    setActivePackage(pkg);
    setIsDetailsModalOpen(false);

    // Default dates: next available date
    const defaultArrival = pkg.availableDates[0] || '2026-09-15';
    const arrDate = new Date(defaultArrival);
    arrDate.setDate(arrDate.getDate() + (pkg.durationDays || 3));
    const defaultDeparture = arrDate.toISOString().split('T')[0];

    // Default choices
    const defaultVehicle = pkg.vehicles.find(v => v.isDefault)?.id || pkg.vehicles[0]?.id || '';
    const defaultAcc = pkg.accommodations.find(a => a.isDefault)?.id || pkg.accommodations[0]?.id || '';
    const defaultGuide = pkg.guides.find(g => g.isDefault)?.id || pkg.guides[0]?.id || '';
    const defaultActivities = pkg.activities.filter(a => a.includedInBase).map(a => a.id);

    const initialSelection: PackageCustomizationSelection = {
      packageId: pkg.id,
      arrivalDate: defaultArrival,
      departureDate: defaultDeparture,
      adults: 2,
      children: 0,
      infants: 0,
      selectedVehicleId: defaultVehicle,
      selectedAccommodationId: defaultAcc,
      selectedGuideId: defaultGuide,
      selectedActivityIds: defaultActivities,
      specialRequests: {
        pickupLocation: 'JKIA International Airport',
        dietaryRequirement: 'None',
        accessibilityNeed: 'None',
        celebrationType: 'None'
      }
    };

    setCustomization(initialSelection);
    setCalculatedPrice(computePrice(pkg, initialSelection));
    setIsBuilderOpen(true);
  };

  const closeBuilder = () => {
    setIsBuilderOpen(false);
  };

  // Update Customization & Recalculate Live
  const updateCustomization = (updates: Partial<PackageCustomizationSelection>) => {
    if (!activePackage || !customization) return;
    const updated: PackageCustomizationSelection = {
      ...customization,
      ...updates
    };
    setCustomization(updated);
    setCalculatedPrice(computePrice(activePackage, updated));
  };

  // Promo Code Handling
  const applyPromoCode = (code: string) => {
    if (!activePackage || !customization) {
      return { success: false, message: 'No active package customization', discountKES: 0 };
    }
    const cleanCode = code.trim().toUpperCase();
    const promo = promoCodes.find(p => p.code.toUpperCase() === cleanCode);

    if (!promo) {
      return { success: false, message: `Promo code "${code}" is invalid.`, discountKES: 0 };
    }
    if (!promo.active) {
      return { success: false, message: `Promo code "${code}" has expired.`, discountKES: 0 };
    }

    const testSelection = { ...customization, promoCode: cleanCode };
    const price = computePrice(activePackage, testSelection);

    if (price.discountKES === 0) {
      return {
        success: false,
        message: `Requires a minimum spend of KES ${(promo.minSpendKES || 0).toLocaleString()}.`,
        discountKES: 0
      };
    }

    setCustomization(testSelection);
    setCalculatedPrice(price);

    return {
      success: true,
      message: `Promo code applied! You saved KES ${(price.discountKES || 0).toLocaleString()}.`,
      discountKES: price.discountKES
    };
  };

  const removePromoCode = () => {
    if (!activePackage || !customization) return;
    const updated = { ...customization, promoCode: undefined };
    setCustomization(updated);
    setCalculatedPrice(computePrice(activePackage, updated));
  };

  // Proceed to Checkout
  const proceedToCheckout = () => {
    setIsBuilderOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Create Booking
  const createBooking = async (
    customer: { name: string; email: string; phone: string; country: string },
    paymentMethod: 'M-PESA' | 'Card' | 'PayPal' | 'Bank Transfer',
    mpesaReceipt?: string
  ): Promise<{ success: boolean; booking: PackageBooking; error?: string }> => {
    if (!activePackage || !customization || !calculatedPrice) {
      return { success: false, booking: {} as PackageBooking, error: 'Customization session expired.' };
    }

    // 1. Prevent overbooking / availability check
    if (!activePackage.availableDates.includes(customization.arrivalDate)) {
      // Check if general date is fine or validate
    }

    // 2. Generate unique reference code: KEN-XXX-YEAR-RANDOM
    const destPrefix = activePackage.destination.substring(0, 3).toUpperCase();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `KEN-${destPrefix}-2026-${randomSuffix}`;

    // 3. Resolve selected components
    const vehicle = activePackage.vehicles.find(v => v.id === customization.selectedVehicleId) || activePackage.vehicles[0];
    const accommodation = activePackage.accommodations.find(a => a.id === customization.selectedAccommodationId) || activePackage.accommodations[0];
    const guide = activePackage.guides.find(g => g.id === customization.selectedGuideId) || activePackage.guides[0];
    const activities = activePackage.activities.filter(a => customization.selectedActivityIds.includes(a.id));

    // 4. Initial Supplier Auto-Matching
    // Auto-match default transport and hotel supplier for frictionless operations
    const matchedHotel = suppliers.find(s => s.category === 'Hotel' && s.businessName.toLowerCase().includes(activePackage.destination.toLowerCase()));
    const matchedTransport = suppliers.find(s => s.category === 'Transport');
    const matchedGuide = suppliers.find(s => s.category === 'Guide');

    const newBooking: PackageBooking = {
      id: `book-${Date.now()}-${randomSuffix}`,
      bookingReference,
      packageId: activePackage.id,
      packageName: activePackage.name,
      destination: activePackage.destination,
      featuredImage: activePackage.featuredImage,
      durationDays: activePackage.durationDays,
      durationNights: activePackage.durationNights,
      arrivalDate: customization.arrivalDate,
      departureDate: customization.departureDate,
      adults: customization.adults,
      children: customization.children,
      infants: customization.infants,
      selectedVehicle: vehicle,
      selectedAccommodation: accommodation,
      selectedGuide: guide,
      selectedActivities: activities,
      specialRequests: customization.specialRequests,
      pricing: calculatedPrice,
      customer,
      payment: {
        method: paymentMethod,
        status: 'Completed',
        transactionId: mpesaReceipt || `TXN-${Date.now()}`,
        paidAt: new Date().toISOString(),
        amountPaidKES: calculatedPrice.totalCustomerPriceKES,
        currency: 'KES',
        mPesaReceiptNumber: mpesaReceipt
      },
      status: 'Confirmed',
      assignments: {
        transportSupplierId: matchedTransport?.id,
        transportStatus: 'Pending',
        hotelSupplierId: matchedHotel?.id,
        hotelStatus: 'Pending',
        guideSupplierId: matchedGuide?.id,
        guideStatus: 'Pending',
        activitiesStatus: 'Pending'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPackageBookings(prev => [newBooking, ...prev]);
    setCurrentBookingConfirmation(newBooking);
    setIsCheckoutOpen(false);

    return { success: true, booking: newBooking };
  };

  // Cancel Booking
  const cancelBooking = (bookingId: string) => {
    setPackageBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled', updatedAt: new Date().toISOString() } : b))
    );
  };

  // Update Booking Status
  const updateBookingStatus = (bookingId: string, status: PackageBooking['status']) => {
    setPackageBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b))
    );
  };

  // Operations Supplier Assignment
  const assignSupplier = (
    bookingId: string,
    assignmentType: 'transport' | 'hotel' | 'guide' | 'activities',
    supplierId: string,
    details?: {
      driverName?: string;
      driverPhone?: string;
      vehiclePlate?: string;
      hotelConfirmation?: string;
      roomAssigned?: string;
      guideName?: string;
      guidePhone?: string;
      boatOperatorName?: string;
      status?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
    }
  ) => {
    setPackageBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;

        const currentAssignments = { ...b.assignments };

        if (assignmentType === 'transport') {
          currentAssignments.transportSupplierId = supplierId;
          currentAssignments.transportStatus = details?.status || 'Assigned';
          if (details?.driverName) currentAssignments.driverName = details.driverName;
          if (details?.driverPhone) currentAssignments.driverPhone = details.driverPhone;
          if (details?.vehiclePlate) currentAssignments.vehiclePlate = details.vehiclePlate;
        } else if (assignmentType === 'hotel') {
          currentAssignments.hotelSupplierId = supplierId;
          currentAssignments.hotelStatus = details?.status || 'Assigned';
          if (details?.hotelConfirmation) currentAssignments.hotelConfirmationNumber = details.hotelConfirmation;
          if (details?.roomAssigned) currentAssignments.roomAssigned = details.roomAssigned;
        } else if (assignmentType === 'guide') {
          currentAssignments.guideSupplierId = supplierId;
          currentAssignments.guideStatus = details?.status || 'Assigned';
          if (details?.guideName) currentAssignments.guideName = details.guideName;
          if (details?.guidePhone) currentAssignments.guidePhone = details.guidePhone;
        } else if (assignmentType === 'activities') {
          currentAssignments.activitiesStatus = details?.status || 'Assigned';
          if (details?.boatOperatorName) currentAssignments.boatOperatorName = details.boatOperatorName;
        }

        return {
          ...b,
          assignments: currentAssignments,
          updatedAt: new Date().toISOString()
        };
      })
    );

    // Increment supplier booking count
    setSuppliers(prev =>
      prev.map(s => (s.id === supplierId ? { ...s, assignedBookingsCount: s.assignedBookingsCount + 1 } : s))
    );
  };

  // Package Management (Admin CRUD)
  const savePackage = (pkg: TravelPackage) => {
    setPackages(prev => {
      const exists = prev.some(p => p.id === pkg.id);
      if (exists) {
        return prev.map(p => (p.id === pkg.id ? pkg : p));
      } else {
        return [pkg, ...prev];
      }
    });
  };

  const deletePackage = (packageId: string) => {
    setPackages(prev => prev.filter(p => p.id !== packageId));
  };

  // Supplier Management (Admin CRUD)
  const saveSupplier = (supplier: TravelSupplier) => {
    setSuppliers(prev => {
      const exists = prev.some(s => s.id === supplier.id);
      if (exists) {
        return prev.map(s => (s.id === supplier.id ? supplier : s));
      } else {
        return [supplier, ...prev];
      }
    });
  };

  const deleteSupplier = (supplierId: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== supplierId));
  };

  // Promo Code Management (Admin CRUD)
  const savePromoCode = (promo: PromoCode) => {
    setPromoCodes(prev => {
      const exists = prev.some(p => p.id === promo.id);
      if (exists) {
        return prev.map(p => (p.id === promo.id ? promo : p));
      } else {
        return [promo, ...prev];
      }
    });
  };

  const deletePromoCode = (promoId: string) => {
    setPromoCodes(prev => prev.filter(p => p.id !== promoId));
  };

  // Add Review
  const addReview = (reviewData: Omit<PackageReview, 'id' | 'createdAt' | 'verified'>) => {
    const newReview: PackageReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      verified: true
    };
    setReviews(prev => [newReview, ...prev]);
  };

  // Package Comparison
  const toggleComparePackage = (pkgId: string) => {
    setComparePackageIds(prev => {
      if (prev.includes(pkgId)) {
        return prev.filter(id => id !== pkgId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), pkgId]; // Keep max 3
      }
      return [...prev, pkgId];
    });
  };

  const clearComparison = () => {
    setComparePackageIds([]);
  };

  // Waitlist
  const joinWaitlist = (entry: Omit<PackageWaitlistEntry, 'id' | 'createdAt' | 'status'>) => {
    const newEntry: PackageWaitlistEntry = {
      ...entry,
      id: `wait-${Date.now()}`,
      status: 'Waiting',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setWaitlist(prev => [newEntry, ...prev]);
    addNotification({
      type: 'system',
      title: 'Joined Package Waitlist',
      message: `You are on the priority waitlist for ${entry.packageName} on ${entry.preferredDate}. We will notify you once slots open!`,
      linkTab: 'packages'
    });
  };

  // Custom Quotation Flow
  const createQuotation = (quote: Omit<CustomTripQuotation, 'id' | 'quotationNumber' | 'createdAt' | 'status'>): CustomTripQuotation => {
    const quoteNum = `QUO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuo: CustomTripQuotation = {
      ...quote,
      id: `quo-${Date.now()}`,
      quotationNumber: quoteNum,
      status: 'Sent',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuotations(prev => [newQuo, ...prev]);
    addNotification({
      type: 'system',
      title: `Quotation Generated (${quoteNum})`,
      message: `Custom itinerary quotation prepared for ${quote.customerName} (KES ${quote.totalPriceKES.toLocaleString()}).`,
      linkTab: 'business-portal'
    });
    return newQuo;
  };

  const updateQuotationStatus = (id: string, status: CustomTripQuotation['status']) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const convertQuotationToBooking = async (id: string): Promise<PackageBooking | null> => {
    const quote = quotations.find(q => q.id === id);
    if (!quote) return null;
    const bookingRef = `KEN-QUO-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: PackageBooking = {
      id: `book-quo-${Date.now()}`,
      bookingReference: bookingRef,
      packageId: 'custom-package',
      packageName: `Custom Itinerary (${quote.destinations.join(' & ')})`,
      destination: quote.destinations[0] || 'Kenya',
      featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      durationDays: quote.durationDays,
      durationNights: Math.max(1, quote.durationDays - 1),
      arrivalDate: quote.travelDates.split(' to ')[0] || '2026-10-10',
      departureDate: quote.travelDates.split(' to ')[1] || '2026-10-16',
      adults: quote.adults,
      children: quote.children,
      infants: 0,
      selectedVehicle: {
        id: 'veh-custom',
        name: quote.requestedServices.transport,
        category: 'Luxury 4x4',
        passengerCapacity: quote.adults + quote.children,
        luggageCapacity: 8,
        features: ['4x4 Safari Transport', 'Pop-up Roof', 'Chilled Water'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: quote.itemizedCosts.transportCostKES,
        available: true
      },
      selectedAccommodation: {
        id: 'acc-custom',
        name: quote.requestedServices.accommodation,
        type: 'Luxury Resort',
        rating: 4.9,
        reviewsCount: 15,
        location: quote.destinations.join(', '),
        roomType: 'Family Suites',
        mealPlan: quote.requestedServices.meals,
        amenities: ['Full Board', 'Wi-Fi', 'En-suite Safari Bath'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: quote.itemizedCosts.accommodationCostKES,
        available: true
      },
      selectedGuide: {
        id: 'guide-custom',
        name: quote.requestedServices.guide,
        type: 'Specialist Wildlife & Photography Naturalist',
        languages: ['English', 'Kiswahili'],
        experienceYears: 12,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: quote.itemizedCosts.guideCostKES,
        rating: 5.0,
        available: true
      },
      selectedActivities: quote.requestedServices.activities.map((actName, idx) => ({
        id: `act-custom-${idx}`,
        name: actName,
        category: 'Adventure',
        description: 'Customized safari activity',
        duration: 'Half Day',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: Math.round(quote.itemizedCosts.activitiesCostKES / Math.max(1, quote.requestedServices.activities.length))
      })),
      specialRequests: {
        dietaryRequirement: 'None',
        accessibilityNeed: 'None',
        pickupLocation: 'Custom Address',
        customPickupAddress: 'Direct Nairobi Hotel / Airport',
        celebrationType: 'None',
        notes: 'Custom quotation booking'
      },
      pricing: {
        basePriceKES: quote.totalPriceKES,
        travellersMultiplier: quote.adults + quote.children * 0.6,
        adultsTotalKES: quote.totalPriceKES,
        childrenTotalKES: 0,
        infantsTotalKES: 0,
        subtotalTravellersKES: quote.totalPriceKES,
        vehicleUpgradeKES: 0,
        accommodationUpgradeKES: 0,
        guideUpgradeKES: 0,
        activitiesTotalKES: 0,
        discountKES: quote.itemizedCosts.discountsKES,
        totalCustomerPriceKES: quote.totalPriceKES,
        totalCustomerPriceUSD: quote.totalPriceUSD,
        totalSupplierCostKES: quote.internalSupplierCostKES,
        grossProfitKES: quote.profitKES,
        profitMarginPercent: Math.round((quote.profitKES / quote.totalPriceKES) * 1000) / 10
      },
      customer: {
        name: quote.customerName,
        email: quote.customerEmail,
        phone: quote.customerPhone,
        country: 'Kenya'
      },
      payment: {
        method: 'Card',
        status: 'Completed',
        transactionId: `TX-QUO-${Date.now()}`,
        paidAt: new Date().toISOString(),
        amountPaidKES: quote.totalPriceKES,
        currency: 'KES'
      },
      status: 'Confirmed',
      assignments: {
        transportStatus: 'Pending',
        hotelStatus: 'Pending',
        guideStatus: 'Pending',
        activitiesStatus: 'Pending'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPackageBookings(prev => [newBooking, ...prev]);
    updateQuotationStatus(id, 'Converted to Booking');
    return newBooking;
  };

  // Support Tickets
  const createSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'ticketNumber' | 'createdAt' | 'status' | 'replies'>): SupportTicket => {
    const ticketNum = `TIK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tik-${Date.now()}`,
      ticketNumber: ticketNum,
      status: 'Open',
      createdAt: new Date().toISOString(),
      replies: []
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    addNotification({
      type: 'system',
      title: `Support Ticket Opened (${ticketNum})`,
      message: `Our 24/7 concierge has received your request: "${ticketData.subject}". Response within 30 minutes.`,
      linkTab: 'dashboard'
    });
    return newTicket;
  };

  const addTicketReply = (ticketId: string, message: string, sender: 'customer' | 'support', senderName: string) => {
    setSupportTickets(prev =>
      prev.map(t => {
        if (t.id !== ticketId) return t;
        const newReply = {
          id: `rep-${Date.now()}`,
          sender,
          senderName,
          message,
          timestamp: new Date().toISOString()
        };
        return {
          ...t,
          status: sender === 'customer' ? 'In Progress' : 'Awaiting Customer',
          replies: [...t.replies, newReply]
        };
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Lost Property
  const reportLostProperty = (report: Omit<LostPropertyReport, 'id' | 'reportCode' | 'createdAt' | 'status'>): LostPropertyReport => {
    const code = `LP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: LostPropertyReport = {
      ...report,
      id: `lp-${Date.now()}`,
      reportCode: code,
      status: 'Reported',
      createdAt: new Date().toISOString()
    };
    setLostPropertyReports(prev => [newReport, ...prev]);
    addNotification({
      type: 'system',
      title: `Lost Property Logged (${code})`,
      message: `Investigation opened for "${report.itemDescription}". Driver & hotel staff alerted.`,
      linkTab: 'dashboard'
    });
    return newReport;
  };

  // Driver / Guide execution status updates
  const updateTripExecutionStatus = (
    bookingId: string,
    role: 'driver' | 'guide',
    newStatus: DriverGuideTripUpdate['status'],
    notes?: string
  ) => {
    setDriverGuideUpdates(prev => {
      const current = prev[bookingId] || {
        bookingId,
        bookingReference: '',
        role,
        staffName: role === 'driver' ? 'Assigned Driver' : 'Assigned Guide',
        staffPhone: '+254 722 554 321',
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      return {
        ...prev,
        [bookingId]: {
          ...current,
          status: newStatus,
          locationNote: notes || current.locationNote,
          updatedAt: new Date().toISOString()
        }
      };
    });

    addNotification({
      type: 'driver',
      title: `Trip Status: ${newStatus}`,
      message: notes ? `${role.toUpperCase()}: ${notes}` : `Your ${role} updated status to "${newStatus}".`,
      linkTab: 'dashboard'
    });
  };

  // Booking modification & cancellation
  const requestBookingModification = (
    bookingId: string,
    updates: { arrivalDate?: string; departureDate?: string; adults?: number; notes?: string }
  ) => {
    setPackageBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          arrivalDate: updates.arrivalDate || b.arrivalDate,
          departureDate: updates.departureDate || b.departureDate,
          adults: updates.adults !== undefined ? updates.adults : b.adults,
          updatedAt: new Date().toISOString()
        };
      })
    );
    addNotification({
      type: 'booking',
      title: 'Booking Modified',
      message: `Your booking modification request for dates (${updates.arrivalDate || 'same'}) has been updated.`,
      linkTab: 'dashboard'
    });
  };

  const requestBookingCancellation = (bookingId: string, reason: string): { refundKES: number; message: string } => {
    const booking = packageBookings.find(b => b.id === bookingId);
    if (!booking) return { refundKES: 0, message: 'Booking not found' };

    const arrivalTime = new Date(booking.arrivalDate).getTime();
    const now = Date.now();
    const hoursDiff = (arrivalTime - now) / (1000 * 60 * 60);

    const isFullRefund = hoursDiff >= 72 || isNaN(hoursDiff);
    const refundPercent = isFullRefund ? 1.0 : 0.7;
    const refundKES = Math.round(booking.pricing.totalCustomerPriceKES * refundPercent);

    setPackageBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'Cancelled', updatedAt: new Date().toISOString() } : b))
    );

    addNotification({
      type: 'booking',
      title: 'Booking Cancelled',
      message: `Booking ${booking.bookingReference} cancelled. Refund of KES ${refundKES.toLocaleString()} initiated (${isFullRefund ? '100% full refund' : '70% short notice refund'}).`,
      linkTab: 'dashboard'
    });

    return {
      refundKES,
      message: isFullRefund
        ? `Cancellation verified: 100% full refund of KES ${refundKES.toLocaleString()} credited to original payment method within 24-48 business hours.`
        : `Cancellation verified under 72h notice window: 70% refund of KES ${refundKES.toLocaleString()} processed.`
    };
  };

  // Admin Metrics Calculation
  const totalRevenueKES = packageBookings.reduce((sum, b) => (b.payment.status === 'Completed' ? sum + b.pricing.totalCustomerPriceKES : sum), 0);
  const totalSupplierCostsKES = packageBookings.reduce((sum, b) => (b.payment.status === 'Completed' ? sum + b.pricing.totalSupplierCostKES : sum), 0);
  const grossProfitKES = Math.max(0, totalRevenueKES - totalSupplierCostsKES);
  const profitMarginPercent = totalRevenueKES > 0 ? Math.round((grossProfitKES / totalRevenueKES) * 1000) / 10 : 0;
  const totalBookings = packageBookings.length;
  const activeTripsCount = packageBookings.filter(b => b.status === 'Confirmed' || b.status === 'In Progress').length;
  const pendingAssignmentsCount = packageBookings.filter(b =>
    b.status === 'Confirmed' &&
    (!b.assignments.transportSupplierId || !b.assignments.hotelSupplierId || !b.assignments.guideSupplierId)
  ).length;

  // Destination Stats
  const destinationMap = new Map<string, { bookings: number; revenueKES: number }>();
  packageBookings.forEach(b => {
    const dest = b.destination || 'Other';
    const current = destinationMap.get(dest) || { bookings: 0, revenueKES: 0 };
    destinationMap.set(dest, {
      bookings: current.bookings + 1,
      revenueKES: current.revenueKES + (b.payment.status === 'Completed' ? b.pricing.totalCustomerPriceKES : 0)
    });
  });
  const destinationStats = Array.from(destinationMap.entries()).map(([destination, data]) => ({
    destination,
    bookings: data.bookings,
    revenueKES: data.revenueKES
  }));

  // Package Performance
  const packageMap = new Map<string, { bookings: number; revenueKES: number; profitKES: number }>();
  packageBookings.forEach(b => {
    const name = b.packageName || 'Package';
    const current = packageMap.get(name) || { bookings: 0, revenueKES: 0, profitKES: 0 };
    packageMap.set(name, {
      bookings: current.bookings + 1,
      revenueKES: current.revenueKES + (b.payment.status === 'Completed' ? b.pricing.totalCustomerPriceKES : 0),
      profitKES: current.profitKES + (b.payment.status === 'Completed' ? b.pricing.grossProfitKES : 0)
    });
  });
  const packagePerformance = Array.from(packageMap.entries()).map(([name, data]) => ({
    name,
    bookings: data.bookings,
    revenueKES: data.revenueKES,
    profitKES: data.profitKES
  }));

  // Monthly Revenue Trend (simulated & actual)
  const monthlyRevenue = [
    { month: 'Jun', revenueKES: 340000, profitKES: 88000 },
    { month: 'Jul', revenueKES: 520000, profitKES: 145000 },
    { month: 'Aug', revenueKES: 680000, profitKES: 198000 },
    { month: 'Sep', revenueKES: Math.max(347000, totalRevenueKES), profitKES: Math.max(97000, grossProfitKES) }
  ];

  const totalRevenueUSD = Math.round(totalRevenueKES / 130);
  const adminMetrics: AdminMetrics = {
    totalRevenueKES,
    totalRevenueUSD,
    totalSupplierCostKES: totalSupplierCostsKES,
    totalSupplierCostsKES,
    grossProfitKES,
    profitMarginPercent,
    totalBookings,
    activeTripsCount,
    pendingAssignmentsCount,
    pendingOperationsCount: pendingAssignmentsCount,
    destinationStats,
    packagePerformance,
    monthlyRevenue
  };

  return (
    <PackageBookingContext.Provider
      value={{
        packages,
        suppliers,
        promoCodes,
        packageBookings,
        reviews,
        activePackage,
        customization,
        calculatedPrice,
        selectedPackageForModal,
        isDetailsModalOpen,
        isBuilderOpen,
        isCheckoutOpen,
        currentBookingConfirmation,
        comparePackageIds,
        toggleComparePackage,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        waitlist,
        joinWaitlist,
        quotations,
        createQuotation,
        updateQuotationStatus,
        convertQuotationToBooking,
        supportTickets,
        createSupportTicket,
        addTicketReply,
        updateTicketStatus,
        notifications,
        markNotificationAsRead,
        addNotification,
        lostPropertyReports,
        reportLostProperty,
        driverGuideUpdates,
        updateTripExecutionStatus,
        requestBookingModification,
        requestBookingCancellation,
        openPackageDetails,
        closePackageDetails,
        startCustomization,
        closeBuilder,
        updateCustomization,
        proceedToCheckout,
        closeCheckout,
        applyPromoCode,
        removePromoCode,
        createBooking,
        cancelBooking,
        updateBookingStatus,
        assignSupplier,
        savePackage,
        deletePackage,
        saveSupplier,
        deleteSupplier,
        savePromoCode,
        deletePromoCode,
        addReview,
        computePrice,
        adminMetrics
      }}
    >
      {children}
    </PackageBookingContext.Provider>
  );
};

export const usePackageBooking = () => {
  const context = useContext(PackageBookingContext);
  if (!context) {
    throw new Error('usePackageBooking must be used within a PackageBookingProvider');
  }
  return context;
};
