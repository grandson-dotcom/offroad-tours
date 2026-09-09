export type CurrencyCode = 'USD' | 'KES' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'CHF' | 'JPY' | 'CNY' | 'AED' | 'ZAR';

export type LanguageCode = 'en' | 'sw' | 'de' | 'fr';

export type VerificationStatus = 'verified' | 'official' | 'recommended' | 'unverified';

export interface Review {
  id: string;
  userName: string;
  userCountry: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking?: boolean;
  avatar?: string;
}

export interface Destination {
  id: string;
  name: string;
  category: 'wildlife' | 'beach' | 'mountain' | 'nature' | 'city' | 'culture' | 'adventure' | 'family' | string;
  region: 'Rift Valley' | 'Coast' | 'Central' | 'Nairobi' | 'Northern' | 'Western' | string;
  tagline: string;
  description: string;
  image: string;
  additionalImages?: string[];
  entranceFeeUSD: number;
  entranceFeeKES: number;
  bestTimeToVisit: string;
  duration: string;
  coordinates: { lat: number; lng: number };
  coords?: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  highlights: string[];
  activities: string[];
  safetyNotes: string;
  nearbyHotelsCount: number;
  featured?: boolean;
}

export interface SafariTour {
  id: string;
  title: string;
  operator: string;
  operatorBadge: VerificationStatus;
  operatorPhone: string;
  duration: string;
  durationDays: number;
  location: string;
  priceUSD: number;
  priceKES: number;
  originalPriceUSD?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  groupSize: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; desc: string; accommodation: string }[];
  pickupLocation: string;
  departureDates: string[];
  cancellationPolicy: string;
  category: 'Big 5 Safari' | 'Migration' | 'Birding' | 'Day Trip' | 'Budget Camping' | 'Luxury Lodge' | 'Marine' | string;
}

export interface Hotel {
  id: string;
  name: string;
  type: 'Safari Lodge' | 'Beach Resort' | 'Boutique Hotel' | 'Luxury Camp' | 'Budget Hostel' | 'Serviced Apartment' | string;
  location: string;
  region: string;
  coordinates: { lat: number; lng: number };
  coords?: { lat: number; lng: number };
  pricePerNightUSD: number;
  pricePerNightKES: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages: string[];
  amenities: string[];
  roomTypes: { name: string; priceUSD: number; capacity: string; description: string }[];
  checkIn: string;
  checkOut: string;
  cancellationPolicy: string;
  contact: { phone: string; email: string };
  badge: VerificationStatus;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  type: 'Local Kenyan' | 'Swahili Seafood' | 'Fine Dining' | 'Café & Bakery' | 'Nyama Choma Joint' | 'International' | 'Street Food' | string;
  location: string;
  coordinates?: { lat: number; lng: number };
  coords?: { lat: number; lng: number };
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  reviewsCount: number;
  image: string;
  openingHours: string;
  dietary: ('Halal' | 'Vegetarian Friendly' | 'Vegan Options' | 'Gluten Free' | string)[];
  popularDishes: { name: string; priceKES: number; priceUSD: number; desc: string }[];
  address: string;
  phone: string;
  badge: VerificationStatus;
}

export interface KenyanFoodItem {
  id: string;
  name: string;
  swahiliName: string;
  pronunciation: string;
  category: 'Main Dish' | 'Snack & Breakfast' | 'Beverage' | 'Street Food' | 'Side' | string;
  description: string;
  ingredients: string[];
  tasteProfile: string;
  recommendedPlaces: string;
  image: string;
  priceEstimateKES: string;
  mustTry: boolean;
}

export interface LocalGuide {
  id: string;
  name: string;
  title: string;
  badge: VerificationStatus;
  licenseNumber: string;
  certification?: string;
  experienceYears: number;
  specialties: string[];
  languages: string[];
  dailyRateUSD: number;
  dailyRateKES: number;
  hourlyRateUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
}

export interface NearMePlace {
  id: string;
  name: string;
  category: 'hotel' | 'restaurant' | 'attraction' | 'safari' | 'atm' | 'hospital' | 'police' | 'sim' | 'transport' | 'pharmacy' | 'fuel' | 'shopping' | string;
  distanceKm: number;
  rating?: number;
  isOpen: boolean;
  address: string;
  phone?: string;
  emergencyOnly?: boolean;
  coordinates: { lat: number; lng: number };
  image?: string;
  notes?: string;
}

export type NearbyPlace = NearMePlace;

export interface EmergencyContact {
  id: string;
  name: string;
  category: 'Police' | 'Medical / Ambulance' | 'Tourist Police' | 'Wildlife Emergency' | 'Fire' | 'Embassy' | string;
  phone: string;
  tollFree?: boolean;
  availableHours?: string;
  hours?: string;
  description: string;
  address?: string;
  icon?: string;
}

export interface EmbassyItem {
  id: string;
  country: string;
  flag: string;
  name: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  email?: string;
  region: string;
}

export interface SwahiliPhrase {
  id: string;
  category: string;
  english: string;
  swahili: string;
  pronunciation: string;
  audioText?: string;
  contextNote?: string;
  context?: string;
}

export interface SIMPackage {
  provider: 'Safaricom' | 'Airtel' | 'Telkom' | 'Airalo eSIM' | 'Holafly eSIM' | string;
  type: 'Physical SIM + eSIM' | 'eSIM Only' | string;
  packageName: string;
  dataGB: number | string;
  durationDays: number;
  priceKES: number;
  priceUSD: number;
  includesMinutes: string;
  features: string[];
  airportAvailable: boolean;
  mPesaSupported: boolean;
}

export interface BookingRecord {
  id: string;
  type: 'safari' | 'hotel' | 'guide' | 'transport' | 'restaurant' | string;
  itemTitle: string;
  itemId: string;
  startDate: string;
  endDate?: string;
  guests: number;
  totalPriceUSD: number;
  totalPriceKES: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'M-PESA' | 'Card' | 'Pay on Arrival' | string;
  referenceCode: string;
  createdAt: string;
  notes?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  priceKES: number;
  priceUSD: number;
  description: string;
  image: string;
  organizer: string;
  ticketLink?: string;
}

export interface DealItem {
  id: string;
  title: string;
  category: string;
  discountPercent: number;
  originalPriceUSD: number;
  discountedPriceUSD: number;
  expiresInDays: number;
  image: string;
  description: string;
  provider: string;
  code: string;
}

export interface TripItinerary {
  id: string;
  title: string;
  durationDays: number;
  travelStyle: string;
  budgetTier?: string;
  groupType?: string;
  travelersCount?: number;
  estimatedCostUSD?: number;
  totalEstimatedCostUSD?: number;
  days: {
    day: number;
    destination: string;
    title: string;
    travelTime?: string;
    activities: string[];
    accommodation: string;
    meals?: string;
  }[];
}

// ==========================================
// TRAVEL PACKAGE BOOKING PLATFORM TYPES
// ==========================================

export interface VehicleOption {
  id: string;
  name: string;
  category: 'Standard' | 'Mid-Tier 4x4' | 'Luxury 4x4' | 'Safari Van' | 'Executive SUV';
  passengerCapacity: number;
  luggageCapacity: number;
  features: string[];
  image: string;
  priceDifferenceKES: number;
  supplierCostKES: number;
  isDefault?: boolean;
  available: boolean;
}

export interface AccommodationOption {
  id: string;
  name: string;
  type: 'Standard Lodge' | 'Premium Lodge' | 'Luxury Resort' | 'Tented Camp' | 'Boutique Villa';
  rating: number;
  reviewsCount: number;
  location: string;
  roomType: string;
  mealPlan: string;
  amenities: string[];
  image: string;
  priceDifferenceKES: number;
  supplierCostKES: number;
  isDefault?: boolean;
  available: boolean;
}

export interface GuideOption {
  id: string;
  name: string;
  type: 'Shared Professional Guide' | 'Dedicated Private Guide' | 'Specialist Wildlife & Photography Naturalist';
  languages: string[];
  experienceYears: number;
  image: string;
  priceDifferenceKES: number;
  supplierCostKES: number;
  isDefault?: boolean;
  rating: number;
  available: boolean;
}

export interface PackageActivityOption {
  id: string;
  name: string;
  category: 'Wildlife' | 'Adventure' | 'Relaxation' | 'Water' | 'Culture';
  description: string;
  duration: string;
  image: string;
  priceKES: number;
  supplierCostKES: number;
  includedInBase: boolean;
  available: boolean;
}

export interface PackageDayItinerary {
  day: number;
  title: string;
  highlight: string;
  schedule: {
    time: string;
    activity: string;
    location: string;
    transport?: string;
    notes?: string;
  }[];
  mealsIncluded: string;
  accommodationName: string;
}

export interface TravelPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  destination: 'Naivasha' | 'Maasai Mara' | 'Diani Beach' | 'Amboseli' | 'Nairobi' | 'Tsavo' | string;
  region: string;
  durationDays: number;
  durationNights: number;
  basePriceKES: number;
  basePriceUSD: number;
  featuredImage: string;
  galleryImages: string[];
  overview: string;
  badge?: string;
  category: 'Wildlife & Safari' | 'Beach & Coastal' | 'Lake & Adventure' | 'Urban & Culture' | 'Luxury' | string;
  minTravellers: number;
  maxTravellers: number;
  rating: number;
  reviewsCount: number;
  includedServices: string[];
  excludedServices: string[];
  cancellationPolicy: string;
  importantInfo: string[];
  availableDates: string[]; // e.g. dates or ranges
  itinerary: PackageDayItinerary[];
  vehicles: VehicleOption[];
  accommodations: AccommodationOption[];
  guides: GuideOption[];
  activities: PackageActivityOption[];
  supplierBaseCostKES: number; // Internal supplier cost for profit calculation
  status: 'active' | 'draft' | 'archived';
  featured?: boolean;
  videoUrl?: string;
  faqs?: { question: string; answer: string }[];
  termsAndConditions?: string[];
  verificationStatus?: 'verified' | 'official' | 'recommended';
}

export interface SpecialRequests {
  dietaryRequirement?: 'None' | 'Vegetarian' | 'Vegan' | 'Halal' | 'Gluten-Free' | 'Kosher' | string;
  accessibilityNeed?: 'None' | 'Wheelchair accessible' | 'Ground floor room required' | 'Assisted mobility' | string;
  pickupLocation: 'JKIA International Airport' | 'Wilson Airport Nairobi' | 'Nairobi City Hotel' | 'Diani / Ukunda Airstrip' | 'Custom Address';
  customPickupAddress?: string;
  celebrationType?: 'None' | 'Birthday' | 'Honeymoon' | 'Wedding Anniversary' | 'Family Reunion' | 'Graduation' | string;
  notes?: string;
}

export interface PackageCustomizationSelection {
  packageId: string;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  infants: number;
  selectedVehicleId: string;
  selectedAccommodationId: string;
  selectedGuideId: string;
  selectedActivityIds: string[];
  specialRequests: SpecialRequests;
  promoCode?: string;
}

export interface CalculatedPackagePrice {
  basePriceKES: number;
  travellersMultiplier: number;
  adultsTotalKES: number;
  childrenTotalKES: number;
  infantsTotalKES: number;
  subtotalTravellersKES: number;
  vehicleUpgradeKES: number;
  accommodationUpgradeKES: number;
  guideUpgradeKES: number;
  activitiesTotalKES: number;
  discountKES: number;
  promoCodeApplied?: string;
  totalCustomerPriceKES: number;
  totalCustomerPriceUSD: number;
  // Internal supplier calculation
  totalSupplierCostKES: number;
  grossProfitKES: number;
  profitMarginPercent: number;
}

export interface SupplierAssignment {
  transportSupplierId?: string;
  transportStatus?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
  
  hotelSupplierId?: string;
  hotelStatus?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
  hotelConfirmationNumber?: string;
  roomAssigned?: string;
  
  guideSupplierId?: string;
  guideStatus?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
  guideName?: string;
  guidePhone?: string;

  activitiesStatus?: 'Pending' | 'Assigned' | 'Confirmed' | 'In Progress' | 'Completed';
  boatOperatorName?: string;
}

export interface PackageBooking {
  id: string;
  bookingReference: string; // e.g. KEN-NVS-2026-10482
  packageId: string;
  packageName: string;
  destination: string;
  featuredImage: string;
  durationDays: number;
  durationNights: number;
  arrivalDate: string;
  departureDate: string;
  adults: number;
  children: number;
  infants: number;
  
  selectedVehicle: VehicleOption;
  selectedAccommodation: AccommodationOption;
  selectedGuide: GuideOption;
  selectedActivities: PackageActivityOption[];
  specialRequests: SpecialRequests;
  
  pricing: CalculatedPackagePrice;
  
  customer: {
    name: string;
    email: string;
    phone: string;
    country: string;
  };
  
  payment: {
    method: 'M-PESA' | 'Card' | 'PayPal' | 'Bank Transfer';
    status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
    transactionId: string;
    paidAt?: string;
    amountPaidKES: number;
    currency: string;
    mPesaReceiptNumber?: string;
  };
  
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  assignments: SupplierAssignment;
  createdAt: string;
  updatedAt: string;
  reviewId?: string;

  // Convenience aliases for cross-component access
  referenceCode?: string;
  bookingStatus?: string;
  customization?: any;
  customerInfo?: any;
  paymentMethod?: string;
  paymentReceipt?: string;
  assignedTransport?: {
    supplierId?: string;
    driverName?: string;
    driverPhone?: string;
    vehicleModel?: string;
    plateNumber?: string;
  };
  assignedAccommodation?: {
    supplierId?: string;
    hotelName?: string;
    roomAssigned?: string;
    confirmationVoucher?: string;
  };
  assignedGuide?: {
    supplierId?: string;
    guideName?: string;
    contact?: string;
    languages?: string[];
  };
}

export interface TravelSupplier {
  id: string;
  businessName: string;
  category: 'Hotel' | 'Transport' | 'Driver' | 'Guide' | 'Boat Operator' | 'Activity Provider' | 'Tour Operator';
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  services: string[];
  pricingDescription: string;
  status: 'Active' | 'Inactive';
  verificationStatus: 'Verified' | 'Official' | 'Pending Review';
  assignedBookingsCount: number;
}

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed_kes';
  discountValue: number;
  minSpendKES: number;
  active: boolean;
  expiresAt: string;
}

export interface PackageReview {
  id: string;
  packageId: string;
  packageName: string;
  bookingReference: string;
  authorName: string;
  authorCountry: string;
  rating: number; // 1 - 5
  comment: string;
  ratingsBreakdown: {
    accommodation: number;
    transport: number;
    guide: number;
    activities: number;
    valueForMoney: number;
  };
  createdAt: string;
  verified: boolean;
}

export interface PackageWaitlistEntry {
  id: string;
  packageId: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  travellers: number;
  status: 'Waiting' | 'Notified' | 'Booked';
  createdAt: string;
}

export interface CustomTripQuotation {
  id: string;
  quotationNumber: string; // e.g. QUO-2026-8921
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destinations: string[];
  durationDays: number;
  travelDates: string;
  adults: number;
  children: number;
  travelStyle: string;
  requestedServices: {
    transport: string;
    accommodation: string;
    guide: string;
    activities: string[];
    meals: string;
    parkFeesIncluded: boolean;
  };
  itemizedCosts: {
    transportCostKES: number;
    accommodationCostKES: number;
    guideCostKES: number;
    activitiesCostKES: number;
    feesCostKES: number;
    discountsKES: number;
  };
  totalPriceKES: number;
  totalPriceUSD: number;
  internalSupplierCostKES: number;
  profitKES: number;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Changes Requested' | 'Accepted' | 'Rejected' | 'Expired' | 'Converted to Booking';
  createdAt: string;
  notes?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TIK-4091
  bookingReference?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  category: 'Booking Changes' | 'Payment Issue' | 'Driver / Transport' | 'Hotel Voucher' | 'Emergency / SOS' | 'General Inquiry';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Awaiting Customer' | 'Resolved' | 'Closed';
  assignedAgent?: string;
  createdAt: string;
  replies: {
    id: string;
    sender: 'customer' | 'support';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface AppNotification {
  id: string;
  type: 'booking' | 'payment' | 'driver' | 'trip' | 'promo' | 'system';
  title: string;
  message: string;
  linkTab?: string;
  read: boolean;
  timestamp: string;
}

export interface LostPropertyReport {
  id: string;
  reportCode: string;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  itemDescription: string;
  lastSeenLocation: string; // e.g. 'Toyota Land Cruiser Prado', 'Naivasha Sopa Lobby'
  dateLost: string;
  status: 'Reported' | 'Investigating' | 'Item Recovered' | 'Closed';
  createdAt: string;
}

export interface DriverGuideTripUpdate {
  bookingId: string;
  bookingReference: string;
  role: 'driver' | 'guide';
  staffName: string;
  staffPhone: string;
  status: 'Assigned' | 'Accepted' | 'On The Way' | 'Arrived' | 'Trip Started' | 'Completed';
  locationNote?: string;
  updatedAt: string;
}

export interface KenyaTravelArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Safari Tips' | 'First Time Visitor' | 'Culture & Food' | 'Wildlife Safety' | 'Packing Guide';
  readingTimeMinutes: number;
  featuredImage: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
}

