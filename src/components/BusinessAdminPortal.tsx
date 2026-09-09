import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import { TravelPackage, TravelSupplier, PackageBooking, PromoCode } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  Car,
  Hotel,
  UserCheck,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Check,
  X,
  Search,
  Building2,
  Tag,
  FileText,
  HelpCircle,
  Bell,
  MessageSquare,
  Send,
  Radio,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const BusinessAdminPortal: React.FC = () => {
  const {
    packages,
    packageBookings,
    suppliers,
    promoCodes,
    adminMetrics,
    assignSupplier,
    savePackage,
    deletePackage,
    saveSupplier,
    deleteSupplier,
    savePromoCode,
    deletePromoCode,
    updateBookingStatus,
    quotations,
    updateQuotationStatus,
    supportTickets,
    replySupportTicket,
    resolveSupportTicket,
    waitlist,
    updateWaitlistStatus,
    lostPropertyReports,
    updateLostPropertyStatus,
    driverGuideUpdates,
    sendDriverGuideUpdate
  } = usePackageBooking();

  const { currency } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'analytics' | 'bookings' | 'packages' | 'suppliers' | 'promos' | 'quotations' | 'support' | 'waitlist' | 'lost-found'
  >('analytics');

  // Support Reply State
  const [activeSupportTicketId, setActiveSupportTicketId] = useState<string | null>(null);
  const [supportReplyText, setSupportReplyText] = useState('');

  // Fleet Dispatch Update State
  const [dispatchBookingId, setDispatchBookingId] = useState(packageBookings[0]?.id || '');
  const [dispatchStage, setDispatchStage] = useState('Game Drive in Progress');
  const [dispatchLocation, setDispatchLocation] = useState('Maasai Mara National Reserve (Talek Gate)');
  const [dispatchNote, setDispatchNote] = useState('Morning game drive completed. Sighted lion pride near Mara river.');

  // Modal States
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [activeAssignBooking, setActiveAssignBooking] = useState<PackageBooking | null>(null);

  // New Package Form State
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgDestination, setNewPkgDestination] = useState('Naivasha');
  const [newPkgRegion, setNewPkgRegion] = useState('Rift Valley');
  const [newPkgDurationDays, setNewPkgDurationDays] = useState(3);
  const [newPkgDurationNights, setNewPkgDurationNights] = useState(2);
  const [newPkgPriceKES, setNewPkgPriceKES] = useState(55000);
  const [newPkgTagline, setNewPkgTagline] = useState('');
  const [newPkgOverview, setNewPkgOverview] = useState('');
  const [newPkgImage, setNewPkgImage] = useState('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80');
  const [newPkgCategory, setNewPkgCategory] = useState<'Wildlife' | 'Lake & Adventure' | 'Beach & Coastal' | 'Culture & City'>('Lake & Adventure');

  // Supplier Form State
  const [supName, setSupName] = useState('');
  const [supCategory, setSupCategory] = useState<'Hotel' | 'Transport' | 'Driver' | 'Guide' | 'Boat Operator' | 'Activity Provider'>('Transport');
  const [supContact, setSupContact] = useState('');
  const [supEmail, setSupEmail] = useState('');
  const [supPhone, setSupPhone] = useState('+254 ');
  const [supLocation, setSupLocation] = useState('Nairobi');

  // Promo Form State
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountType, setPromoDiscountType] = useState<'percentage' | 'fixed_kes'>('percentage');
  const [promoValue, setPromoValue] = useState(10);
  const [promoMinSpend, setPromoMinSpend] = useState(30000);

  // Assignment Modal State
  const [assignDriverName, setAssignDriverName] = useState('');
  const [assignDriverPhone, setAssignDriverPhone] = useState('+254 722 ');
  const [assignVehicleModel, setAssignVehicleModel] = useState('Safari 4x4 Land Cruiser');
  const [assignPlateNumber, setAssignPlateNumber] = useState('KDD 781X');
  const [assignHotelName, setAssignHotelName] = useState('');
  const [assignRoom, setAssignRoom] = useState('Deluxe Chalet');
  const [assignVoucher, setAssignVoucher] = useState('');
  const [assignGuideName, setAssignGuideName] = useState('');
  const [assignGuidePhone, setAssignGuidePhone] = useState('+254 733 ');

  // Filter Bookings
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [searchBookingQuery, setSearchBookingQuery] = useState('');

  const filteredBookings = packageBookings.filter(b => {
    const currentStatus = (b.status || b.bookingStatus || '').toLowerCase();
    if (bookingFilterStatus !== 'all' && currentStatus !== bookingFilterStatus.toLowerCase()) return false;
    if (searchBookingQuery.trim()) {
      const q = searchBookingQuery.toLowerCase();
      const ref = (b.bookingReference || b.referenceCode || '').toLowerCase();
      const customerName = (b.customer?.name || b.customerInfo?.fullName || '').toLowerCase();
      const pkg = (b.packageName || '').toLowerCase();
      return ref.includes(q) || customerName.includes(q) || pkg.includes(q);
    }
    return true;
  });

  // Analytics Chart Data
  const destinationChartData = (adminMetrics.destinationStats || []).map(d => ({
    name: d.destination,
    Bookings: d.bookings,
    Revenue: Math.round(d.revenueKES / 1000)
  }));

  const COLORS = ['#f85a5a', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  // Handle Add Package
  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName.trim()) return;

    savePackage({
      id: `pkg-${Date.now()}`,
      name: newPkgName,
      slug: newPkgName.toLowerCase().replace(/\s+/g, '-'),
      destination: newPkgDestination,
      region: newPkgRegion,
      category: newPkgCategory,
      badge: 'New Package',
      featured: true,
      tagline: newPkgTagline || 'Exclusive guided Kenya experience',
      overview: newPkgOverview || 'Experience magical Kenya with all-inclusive private transport, luxury stays, and certified local guides.',
      durationDays: Number(newPkgDurationDays),
      durationNights: Number(newPkgDurationNights),
      basePriceKES: Number(newPkgPriceKES),
      basePriceUSD: Math.round(Number(newPkgPriceKES) / 130),
      supplierCostKES: Math.round(Number(newPkgPriceKES) * 0.7),
      featuredImage: newPkgImage,
      galleryImages: [newPkgImage],
      rating: 5.0,
      reviewsCount: 1,
      minTravellers: 1,
      maxTravellers: 14,
      includedServices: [
        'Round-trip transport with chauffeur',
        'All park entrance fees & conservation levies',
        'Full board accommodation',
        'Certified KPSGA professional tour guide'
      ],
      excludedServices: [
        'International airfares',
        'Personal travel insurance',
        'Tips and gratuities'
      ],
      importantInfo: ['Passport required for park gate clearance'],
      cancellationPolicy: '100% refund up to 72 hours before departure',
      availableDates: [
        new Date().toISOString().split('T')[0],
        new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]
      ],
      vehicles: [
        {
          id: 'v-standard',
          name: 'Toyota Noah Tourer',
          category: 'Standard Van',
          passengerCapacity: 6,
          luggageCapacity: 4,
          priceDifferenceKES: 0,
          features: ['AC', 'Window seating', 'Phone chargers'],
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
        }
      ],
      accommodations: [
        {
          id: 'acc-standard',
          name: `${newPkgDestination} Safari Lodge`,
          type: 'Standard Lodge',
          rating: 4.8,
          reviewsCount: 24,
          location: newPkgDestination,
          roomType: 'Standard Garden Cottage',
          mealPlan: 'Full Board',
          priceDifferenceKES: 0,
          amenities: ['Swimming pool', 'WiFi', 'Ensuite bath'],
          image: newPkgImage
        }
      ],
      guides: [
        {
          id: 'g-silver',
          name: 'Certified Professional Guide',
          type: 'KPSGA Silver Rated',
          experienceYears: 8,
          languages: ['English', 'Kiswahili'],
          priceDifferenceKES: 0,
          bio: 'Expert safari spotter and Kenya naturalist.',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        }
      ],
      activities: [
        {
          id: 'act-base',
          name: `${newPkgDestination} Discovery Tour`,
          category: 'Game Drive',
          duration: '3 hours',
          priceKES: 0,
          priceUSD: 0,
          includedInBase: true,
          description: 'Comprehensive guided game drive and scenic stops.',
          image: newPkgImage
        }
      ],
      itinerary: [
        {
          day: 1,
          title: `Arrival in ${newPkgDestination}`,
          highlight: 'VIP Welcome & Afternoon Excursion',
          mealsIncluded: 'Lunch & Dinner',
          accommodationName: `${newPkgDestination} Safari Lodge`,
          schedule: [
            { time: '08:00 AM', activity: 'Hotel/Airport Pickup in Nairobi', location: 'Nairobi' },
            { time: '12:30 PM', activity: 'Check-in & Gourmet Lunch', location: newPkgDestination },
            { time: '03:30 PM', activity: 'Afternoon Sunset Safari Tour', location: newPkgDestination }
          ]
        }
      ]
    });

    setShowAddPackageModal(false);
    setNewPkgName('');
  };

  // Handle Add Supplier
  const handleCreateSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supName.trim()) return;

    saveSupplier({
      id: `sup-${Date.now()}`,
      businessName: supName,
      category: supCategory,
      contactPerson: supContact || 'Manager',
      email: supEmail || 'contact@supplier.co.ke',
      phone: supPhone,
      location: supLocation,
      services: [`Standard ${supCategory} service`],
      pricingDescription: 'Contracted wholesale rates negotiated',
      status: 'Active',
      verificationStatus: 'Verified',
      assignedBookingsCount: 0
    });

    setShowAddSupplierModal(false);
    setSupName('');
  };

  // Handle Add Promo Code
  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    savePromoCode({
      id: `promo-${Date.now()}`,
      code: promoCode.trim().toUpperCase(),
      description: `${promoValue}${promoDiscountType === 'percentage' ? '%' : ' KES'} Discount Code`,
      discountType: promoDiscountType,
      discountValue: Number(promoValue),
      minSpendKES: Number(promoMinSpend),
      active: true,
      expiresAt: '2026-12-31'
    });

    setShowAddPromoModal(false);
    setPromoCode('');
  };

  // Open assignment dialog
  const openAssignModal = (booking: PackageBooking) => {
    setActiveAssignBooking(booking);
    setAssignDriverName(booking.assignments?.driverName || 'Kipchoge Maina');
    setAssignDriverPhone(booking.assignments?.driverPhone || '+254 722 918 203');
    setAssignVehicleModel(booking.selectedVehicle?.name || 'Safari 4x4 Land Cruiser');
    setAssignPlateNumber(booking.assignments?.vehiclePlate || 'KDD 482Y');

    setAssignHotelName(booking.selectedAccommodation?.name || 'Lake Naivasha Sopa Resort');
    setAssignRoom(booking.assignments?.roomAssigned || 'Lakeview Chalet #12');
    setAssignVoucher(booking.assignments?.hotelConfirmationNumber || 'VCH-NVS-8291');

    setAssignGuideName(booking.assignments?.guideName || booking.selectedGuide?.name || 'Daniel Ole Lenku');
    setAssignGuidePhone(booking.assignments?.guidePhone || '+254 733 819 021');
  };

  const handleSaveAssignments = () => {
    if (!activeAssignBooking) return;

    assignSupplier(activeAssignBooking.id, 'transport', 'sup-trans-1', {
      driverName: assignDriverName,
      driverPhone: assignDriverPhone,
      vehiclePlate: assignPlateNumber,
      status: 'Assigned'
    });

    assignSupplier(activeAssignBooking.id, 'hotel', 'sup-acc-1', {
      hotelConfirmation: assignVoucher,
      roomAssigned: assignRoom,
      status: 'Confirmed'
    });

    assignSupplier(activeAssignBooking.id, 'guide', 'sup-guide-1', {
      guideName: assignGuideName,
      guidePhone: assignGuidePhone,
      status: 'Confirmed'
    });

    setActiveAssignBooking(null);
  };

  return (
    <section id="business-admin-portal" className="py-12 bg-stone-900 text-white min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Platform Operations & Business Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Tour Operator Business Command Center
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Manage travel packages, live bookings, driver & lodge assignments, supplier costs, and revenue margins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAddPackageModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Travel Package</span>
            </button>

            <button
              onClick={() => setShowAddSupplierModal(true)}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4" />
              <span>Add Supplier</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-stone-800 pb-3 mb-8 no-scrollbar">
          {[
            { id: 'analytics', label: 'Financial Analytics', icon: TrendingUp },
            { id: 'bookings', label: `Bookings (${packageBookings.length})`, icon: Calendar },
            { id: 'packages', label: `Packages (${packages.length})`, icon: Layers },
            { id: 'quotations', label: `Custom Quotes (${quotations.length})`, icon: FileText },
            { id: 'support', label: `Concierge Tickets (${supportTickets.length})`, icon: HelpCircle },
            { id: 'waitlist', label: `Waitlist (${waitlist.length})`, icon: Bell },
            { id: 'lost-found', label: `Lost & Found (${lostPropertyReports.length})`, icon: Search },
            { id: 'suppliers', label: `Suppliers & Fleet (${suppliers.length})`, icon: Car },
            { id: 'promos', label: `Discounts (${promoCodes.length})`, icon: Tag }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-stone-800 text-white border border-stone-700 shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#f85a5a]' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FINANCIAL & REVENUE ANALYTICS */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 4 Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Gross Booking Revenue</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  KES {(adminMetrics?.totalRevenueKES || 0).toLocaleString()}
                </div>
                <span className="text-xs text-stone-400">≈ ${(adminMetrics?.totalRevenueUSD || Math.round((adminMetrics?.totalRevenueKES || 0) / 130)).toLocaleString()} USD</span>
              </div>

              <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Supplier Costs</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-400">
                  KES {(adminMetrics?.totalSupplierCostKES || adminMetrics?.totalSupplierCostsKES || 0).toLocaleString()}
                </div>
                <span className="text-xs text-stone-400">Hotels, Transport & Park fees</span>
              </div>

              <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Net Gross Profit</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">
                  KES {(adminMetrics?.grossProfitKES || 0).toLocaleString()}
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Margin: {(adminMetrics?.profitMarginPercent || 0).toFixed(1)}%
                </span>
              </div>

              <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Active Operations</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                  {adminMetrics?.totalBookings || 0} Bookings
                </div>
                <span className="text-xs text-amber-300">
                  {adminMetrics?.pendingOperationsCount || adminMetrics?.pendingAssignmentsCount || 0} pending supplier assignments
                </span>
              </div>
            </div>

            {/* Recharts Data Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: Revenue by Destination */}
              <div className="bg-stone-800/80 rounded-3xl p-6 border border-stone-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Revenue by Destination (KES '000s)
                  </h3>
                  <span className="text-xs text-stone-400">Current Season</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={destinationChartData}>
                      <XAxis dataKey="name" stroke="#a8a29e" fontSize={11} />
                      <YAxis stroke="#a8a29e" fontSize={11} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: 12 }}
                        formatter={(val: any) => [`KES ${(Number(val || 0) * 1000).toLocaleString()}`, 'Revenue']}
                      />
                      <Bar dataKey="Revenue" fill="#f85a5a" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Bookings Volume Distribution */}
              <div className="bg-stone-800/80 rounded-3xl p-6 border border-stone-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Bookings by Kenya Destination
                  </h3>
                  <span className="text-xs text-stone-400">Total volume</span>
                </div>

                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={adminMetrics.destinationStats}
                        dataKey="bookings"
                        nameKey="destination"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }: any) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                      >
                        {adminMetrics.destinationStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: BOOKINGS & SUPPLIER ASSIGNMENT HUB */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-stone-800/80 p-4 rounded-2xl border border-stone-700">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search ref #, customer, destination..."
                  value={searchBookingQuery}
                  onChange={(e) => setSearchBookingQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={bookingFilterStatus}
                  onChange={(e) => setBookingFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-semibold"
                >
                  <option value="all">All Booking Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-stone-800/80 rounded-3xl border border-stone-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/60 border-b border-stone-700 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Ref Code</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Package & Dates</th>
                      <th className="px-5 py-3.5">Total & Payment</th>
                      <th className="px-5 py-3.5">Assigned Suppliers</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-700/30 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-[#f85a5a]">
                          {b.bookingReference || b.referenceCode}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-white">{b.customer?.name || b.customerInfo?.fullName}</div>
                          <div className="text-stone-400 text-[11px]">{b.customer?.phone || b.customerInfo?.phoneNumber}</div>
                          <div className="text-stone-500 text-[10px]">{b.customer?.country || b.customerInfo?.country}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-white">{b.packageName}</div>
                          <div className="text-stone-400 text-[11px]">{b.arrivalDate} to {b.departureDate}</div>
                          <div className="text-stone-500 text-[10px]">{b.adults} Adults, {b.children} Children</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-white font-mono">
                            KES {(b.pricing?.finalPriceKES || b.pricing?.totalCustomerPriceKES || 0).toLocaleString()}
                          </div>
                          <div className="text-emerald-400 text-[10px] font-semibold">
                            {(b.payment?.method || b.paymentMethod || 'M-PESA').toUpperCase()} • {b.payment?.mPesaReceiptNumber || b.payment?.transactionId || b.paymentReceipt || 'PAID'}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex items-center gap-1 text-stone-300">
                              <Car className="w-3 h-3 text-[#f85a5a]" />
                              <span>{b.assignments?.driverName || <span className="text-amber-400">Unassigned driver</span>}</span>
                            </div>
                            <div className="flex items-center gap-1 text-stone-300">
                              <Hotel className="w-3 h-3 text-[#f85a5a]" />
                              <span className="truncate max-w-[140px]">{b.selectedAccommodation?.name || <span className="text-amber-400">Unassigned lodge</span>}</span>
                            </div>
                            <div className="flex items-center gap-1 text-stone-300">
                              <UserCheck className="w-3 h-3 text-[#f85a5a]" />
                              <span>{b.assignments?.guideName || <span className="text-amber-400">Unassigned guide</span>}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={b.status || b.bookingStatus || 'Confirmed'}
                            onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-stone-800 text-stone-200 border-stone-600"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => openAssignModal(b)}
                            className="px-3 py-1.5 rounded-lg bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold transition-all cursor-pointer"
                          >
                            Assign Suppliers
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: TRAVEL PACKAGES MANAGEMENT */}
        {activeAdminTab === 'packages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Current Package Inventory ({packages.length})
              </h3>
              <button
                onClick={() => setShowAddPackageModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-stone-800/80 rounded-2xl border border-stone-700 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] relative overflow-hidden bg-stone-900">
                      <img src={pkg.featuredImage} alt={pkg.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                        {pkg.durationDays}D / {pkg.durationNights}N
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#f85a5a] text-[10px] font-bold text-white">
                        KES {(pkg.basePriceKES || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#f85a5a] font-bold uppercase">{pkg.destination}</span>
                        <span className="text-[10px] text-stone-400">{pkg.category}</span>
                      </div>
                      <h4 className="font-serif font-bold text-white text-base leading-snug">{pkg.name}</h4>
                      <p className="text-xs text-stone-400 line-clamp-2">{pkg.overview}</p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-stone-700/80 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">
                      Profit Margin: ~{Math.round(((pkg.basePriceKES - pkg.supplierCostKES) / pkg.basePriceKES) * 100)}%
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete package "${pkg.name}"?`)) {
                          deletePackage(pkg.id);
                        }
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SUPPLIERS & FLEET */}
        {activeAdminTab === 'suppliers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Contracted Suppliers & Fleet ({suppliers.length})
              </h3>
              <button
                onClick={() => setShowAddSupplierModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Contracted Supplier</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((sup) => (
                <div key={sup.id} className="bg-stone-800/80 rounded-2xl border border-stone-700 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-stone-700 text-[10px] font-bold text-stone-300 uppercase">
                      {sup.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {sup.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{sup.businessName}</h4>
                    <p className="text-xs text-stone-400">{sup.location} • {sup.contactPerson}</p>
                  </div>

                  <div className="text-xs text-stone-400 space-y-0.5 border-t border-stone-700 pt-2">
                    <p>Phone: {sup.phone}</p>
                    <p>Email: {sup.email}</p>
                    <p className="text-stone-500 text-[11px]">Assigned Trips: {sup.assignedBookingsCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROMO CODES */}
        {activeAdminTab === 'promos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Promo & Referral Codes ({promoCodes.length})
              </h3>
              <button
                onClick={() => setShowAddPromoModal(true)}
                className="px-4 py-2 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Promo Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {promoCodes.map((p) => (
                <div key={p.id || p.code} className="bg-stone-800/80 rounded-2xl border border-stone-700 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#f85a5a] bg-stone-900 px-2.5 py-1 rounded-lg">
                      {p.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {p.discountType === 'percentage' ? `${p.discountValue}% OFF` : `KES ${(p.discountValue || 0).toLocaleString()} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Min spend: KES {(p.minSpendKES || 0).toLocaleString()} • Expires: {p.expiresAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOM QUOTATIONS */}
        {activeAdminTab === 'quotations' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Bespoke Safari Quotation Inquiries ({quotations.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Direct tailor-made safari requests calculated by the platform's pricing engine.
                </p>
              </div>
            </div>

            {quotations.length === 0 ? (
              <div className="bg-stone-800/60 rounded-3xl p-12 text-center border border-stone-700 space-y-2">
                <FileText className="w-10 h-10 text-stone-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Custom Quotations Yet</h4>
                <p className="text-xs text-stone-400">Inquiries submitted through the Custom Safari Builder will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quotations.map((q) => (
                  <div key={q.id} className="bg-stone-800/80 rounded-3xl border border-stone-700 p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#f85a5a] uppercase tracking-wider">
                          Quote #{q.id.slice(0, 8)}
                        </span>
                        <h4 className="text-base font-serif font-bold text-white">{q.customerName}</h4>
                        <div className="text-xs text-stone-400">
                          <span>{q.customerEmail}</span> • <span>{q.customerPhone}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        q.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        q.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {q.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs">
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">TRAVEL DATES</span>
                        <span className="text-stone-200">{q.travelDates?.start || 'Flexible'} ({q.durationDays || 4} Days)</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">PARTY SIZE</span>
                        <span className="text-stone-200">{q.travelers?.adults || 2} Adults, {q.travelers?.children || 0} Kids</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">CALCULATED PRICE</span>
                        <span className="text-emerald-400 font-mono font-bold">KES {(q.calculatedPriceKES || 0).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">VEHICLE CLASS</span>
                        <span className="text-stone-200">{q.vehicleType}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">ACCOMMODATION</span>
                        <span className="text-stone-200">{q.accommodationTier}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] font-bold">CLIENT BUDGET</span>
                        <span className="text-stone-200">{q.budgetPreference || 'Standard'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Destinations Requested</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(q.destinations || []).map((d: string) => (
                          <span key={d} className="px-2 py-0.5 rounded-md bg-stone-700/60 text-stone-200 text-[11px] font-medium">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {q.specialRequests && (
                      <div className="text-xs text-stone-400 bg-stone-900/40 p-3 rounded-xl italic">
                        "{q.specialRequests}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-stone-700/60">
                      <a
                        href={`https://wa.me/${q.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <div className="flex items-center gap-2">
                        {q.status !== 'Approved' && (
                          <button
                            onClick={() => updateQuotationStatus(q.id, 'Approved')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Send Quote</span>
                          </button>
                        )}
                        {q.status !== 'Rejected' && (
                          <button
                            onClick={() => updateQuotationStatus(q.id, 'Rejected')}
                            className="px-3 py-1.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-300 font-semibold text-xs cursor-pointer transition-colors"
                          >
                            Decline
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: CONCIERGE & SUPPORT TICKETS */}
        {activeAdminTab === 'support' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Customer Concierge & Support Tickets ({supportTickets.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Live traveler requests during planning and on-trip execution.
                </p>
              </div>
            </div>

            {supportTickets.length === 0 ? (
              <div className="bg-stone-800/60 rounded-3xl p-12 text-center border border-stone-700 space-y-2">
                <HelpCircle className="w-10 h-10 text-stone-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Support Tickets</h4>
                <p className="text-xs text-stone-400">Requests opened by travelers will appear in this feed.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Tickets List */}
                <div className="lg:col-span-1 space-y-3">
                  {supportTickets.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setActiveSupportTicketId(t.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        activeSupportTicketId === t.id
                          ? 'bg-stone-800 border-[#f85a5a] shadow-lg'
                          : 'bg-stone-800/60 border-stone-700 hover:bg-stone-800/90'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          t.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {t.priority}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                          t.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{t.subject}</h4>
                      <div className="text-[11px] text-stone-400 flex items-center justify-between">
                        <span>{t.customerName}</span>
                        <span className="font-mono text-[10px]">#{t.bookingReference}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket Conversation & Response Desk */}
                <div className="lg:col-span-2">
                  {(() => {
                    const ticket = supportTickets.find((t) => t.id === activeSupportTicketId) || supportTickets[0];
                    if (!ticket) return null;

                    return (
                      <div className="bg-stone-800/90 rounded-3xl border border-stone-700 p-6 space-y-6">
                        <div className="flex items-start justify-between border-b border-stone-700 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold text-[#f85a5a]">{ticket.category}</span>
                              <span className="text-stone-500">•</span>
                              <span className="text-xs text-stone-400">Ref: #{ticket.bookingReference}</span>
                            </div>
                            <h3 className="text-base font-serif font-bold text-white mt-1">{ticket.subject}</h3>
                            <p className="text-xs text-stone-400">{ticket.customerName} ({ticket.customerEmail})</p>
                          </div>

                          {ticket.status !== 'Resolved' && (
                            <button
                              onClick={() => resolveSupportTicket(ticket.id)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Resolve Ticket</span>
                            </button>
                          )}
                        </div>

                        {/* Messages Thread */}
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                          {ticket.messages.map((m) => {
                            const isAgent = m.senderRole === 'agent';
                            return (
                              <div
                                key={m.id}
                                className={`p-3.5 rounded-2xl text-xs max-w-[85%] ${
                                  isAgent
                                    ? 'ml-auto bg-stone-700 text-white rounded-tr-none'
                                    : 'mr-auto bg-stone-900/80 text-stone-200 rounded-tl-none border border-stone-700/60'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-stone-400">
                                  <span className="font-bold">{m.senderName} ({m.senderRole.toUpperCase()})</span>
                                  <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="leading-relaxed">{m.message}</p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply Input Form */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!supportReplyText.trim()) return;
                            replySupportTicket(ticket.id, supportReplyText, 'Nairobi Dispatch Desk');
                            setSupportReplyText('');
                          }}
                          className="space-y-3 pt-4 border-t border-stone-700"
                        >
                          <textarea
                            rows={3}
                            required
                            placeholder="Type official response to traveler (e.g., 'Driver Kipchoge has been notified and will meet you at the terminal with your nameboard...')"
                            value={supportReplyText}
                            onChange={(e) => setSupportReplyText(e.target.value)}
                            className="w-full p-3 bg-stone-900 border border-stone-700 rounded-2xl text-white text-xs"
                          />
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-[#f85a5a] hover:bg-[#e04848] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch Reply</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    );
                  })()}
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 8: SAFARI PRIORITY WAITLIST */}
        {activeAdminTab === 'waitlist' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Peak-Season Safari Waitlist ({waitlist.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Prospective travelers requesting notifications when sold-out lodges or vehicle slots reopen.
                </p>
              </div>
            </div>

            {waitlist.length === 0 ? (
              <div className="bg-stone-800/60 rounded-3xl p-12 text-center border border-stone-700 space-y-2">
                <Bell className="w-10 h-10 text-stone-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">Waitlist is Clear</h4>
                <p className="text-xs text-stone-400">No travelers are currently queued for fully booked departure dates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {waitlist.map((w) => (
                  <div key={w.id} className="bg-stone-800/80 rounded-2xl border border-stone-700 p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#f85a5a] uppercase tracking-wider block">
                          {w.packageName}
                        </span>
                        <h4 className="text-sm font-bold text-white">{w.customerName}</h4>
                        <span className="text-xs text-stone-400 block">{w.customerEmail}</span>
                        <span className="text-xs text-stone-400 block">{w.customerPhone}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        w.status === 'Notified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {w.status}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-stone-900/60 text-xs text-stone-300 space-y-1">
                      <p><strong>Desired Dates:</strong> {w.desiredStartDate} to {w.desiredEndDate}</p>
                      <p><strong>Party Size:</strong> {w.partySize} travelers</p>
                      {w.notes && <p className="italic text-stone-400 text-[11px]">"{w.notes}"</p>}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`https://wa.me/${w.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {w.status !== 'Notified' && (
                        <button
                          onClick={() => updateWaitlistStatus(w.id, 'Notified')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors"
                        >
                          Mark Notified
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 9: LOST & FOUND FLEET LOG */}
        {activeAdminTab === 'lost-found' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Safari Fleet Lost & Found Tracker ({lostPropertyReports.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Valuables reported missing inside game-drive Land Cruisers, vans, or partner lodges.
                </p>
              </div>
            </div>

            {lostPropertyReports.length === 0 ? (
              <div className="bg-stone-800/60 rounded-3xl p-12 text-center border border-stone-700 space-y-2">
                <Search className="w-10 h-10 text-stone-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Lost Property Reports</h4>
                <p className="text-xs text-stone-400">All guest valuables have been safely returned.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lostPropertyReports.map((item) => (
                  <div key={item.id} className="bg-stone-800/80 rounded-3xl border border-stone-700 p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#f85a5a]">{item.itemCategory}</span>
                        <h4 className="text-base font-bold text-white">{item.itemDescription}</h4>
                        <p className="text-xs text-stone-400">Reported by: {item.customerName} (Ref: #{item.bookingReference})</p>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        item.status === 'Returned' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.status === 'Found' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-stone-900/60 text-stone-300">
                      <div>
                        <span className="text-stone-500 block text-[10px]">LAST SEEN</span>
                        <span>{item.lastSeenLocation}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">DATE</span>
                        <span>{item.dateLost}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-700/60">
                      {item.status !== 'Found' && item.status !== 'Returned' && (
                        <button
                          onClick={() => updateLostPropertyStatus(item.id, 'Found', 'Secured at Nairobi Operations Safe')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                        >
                          Mark Found & Secured
                        </button>
                      )}
                      {item.status !== 'Returned' && (
                        <button
                          onClick={() => updateLostPropertyStatus(item.id, 'Returned', 'Handed over to guest at JKIA Airport')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                        >
                          Confirm Returned to Guest
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL: ASSIGN SUPPLIERS TO BOOKING */}
        {activeAssignBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-stone-900 text-white rounded-3xl p-6 max-w-xl w-full border border-stone-700 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] text-[#f85a5a] uppercase font-bold">Operations Hub</span>
                  <h3 className="text-base font-serif font-bold text-white">
                    Assign Suppliers to #{activeAssignBooking.bookingReference || activeAssignBooking.referenceCode}
                  </h3>
                  <p className="text-xs text-stone-400">{activeAssignBooking.packageName} ({activeAssignBooking.customer?.name || activeAssignBooking.customerInfo?.fullName})</p>
                </div>
                <button onClick={() => setActiveAssignBooking(null)} className="text-stone-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Driver & Vehicle */}
              <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                <h4 className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#f85a5a]" />
                  <span>Assign Transportation & Driver</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-400 mb-1">Driver Full Name</label>
                    <input
                      type="text"
                      value={assignDriverName}
                      onChange={(e) => setAssignDriverName(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Driver Phone</label>
                    <input
                      type="text"
                      value={assignDriverPhone}
                      onChange={(e) => setAssignDriverPhone(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Vehicle Model</label>
                    <input
                      type="text"
                      value={assignVehicleModel}
                      onChange={(e) => setAssignVehicleModel(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Plate Number</label>
                    <input
                      type="text"
                      value={assignPlateNumber}
                      onChange={(e) => setAssignPlateNumber(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Accommodation & Voucher */}
              <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                <h4 className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                  <Hotel className="w-4 h-4 text-[#f85a5a]" />
                  <span>Assign Lodge / Hotel Voucher</span>
                </h4>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="col-span-2">
                    <label className="block text-stone-400 mb-1">Hotel / Lodge Name</label>
                    <input
                      type="text"
                      value={assignHotelName}
                      onChange={(e) => setAssignHotelName(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Room Assigned</label>
                    <input
                      type="text"
                      value={assignRoom}
                      onChange={(e) => setAssignRoom(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-stone-400 mb-1">Lodge Confirmation Voucher Code</label>
                    <input
                      type="text"
                      value={assignVoucher}
                      onChange={(e) => setAssignVoucher(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Guide */}
              <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/60">
                <h4 className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#f85a5a]" />
                  <span>Assign Certified Safari Guide</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-400 mb-1">Guide Name</label>
                    <input
                      type="text"
                      value={assignGuideName}
                      onChange={(e) => setAssignGuideName(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Guide Contact</label>
                    <input
                      type="text"
                      value={assignGuidePhone}
                      onChange={(e) => setAssignGuidePhone(e.target.value)}
                      className="w-full p-2 bg-stone-900 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveAssignBooking(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignments}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md cursor-pointer"
                >
                  Save & Push to Customer Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD PACKAGE */}
        {showAddPackageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <form onSubmit={handleCreatePackage} className="bg-stone-900 text-white rounded-3xl p-6 max-w-xl w-full border border-stone-700 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="text-base font-serif font-bold text-white">Create New Travel Package</h3>
                <button type="button" onClick={() => setShowAddPackageModal(false)} className="text-stone-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samburu Wilderness Explorer"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                    className="w-full p-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-400 mb-1">Destination</label>
                    <input
                      type="text"
                      required
                      value={newPkgDestination}
                      onChange={(e) => setNewPkgDestination(e.target.value)}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Region</label>
                    <input
                      type="text"
                      required
                      value={newPkgRegion}
                      onChange={(e) => setNewPkgRegion(e.target.value)}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-400 mb-1">Days</label>
                    <input
                      type="number"
                      min={1}
                      value={newPkgDurationDays}
                      onChange={(e) => setNewPkgDurationDays(Number(e.target.value))}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Nights</label>
                    <input
                      type="number"
                      min={0}
                      value={newPkgDurationNights}
                      onChange={(e) => setNewPkgDurationNights(Number(e.target.value))}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Base Price (KES)</label>
                    <input
                      type="number"
                      step={1000}
                      value={newPkgPriceKES}
                      onChange={(e) => setNewPkgPriceKES(Number(e.target.value))}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="Short punchy summary"
                    value={newPkgTagline}
                    onChange={(e) => setNewPkgTagline(e.target.value)}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Overview</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the journey..."
                    value={newPkgOverview}
                    onChange={(e) => setNewPkgOverview(e.target.value)}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newPkgImage}
                    onChange={(e) => setNewPkgImage(e.target.value)}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPackageModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#f85a5a] text-white text-xs font-bold cursor-pointer"
                >
                  Publish Package
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL: ADD SUPPLIER */}
        {showAddSupplierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <form onSubmit={handleCreateSupplier} className="bg-stone-900 text-white rounded-3xl p-6 max-w-md w-full border border-stone-700 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="text-base font-serif font-bold text-white">Add Contracted Supplier</h3>
                <button type="button" onClick={() => setShowAddSupplierModal(false)} className="text-stone-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Company / Provider Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rift Valley Cruiser Fleet"
                    value={supName}
                    onChange={(e) => setSupName(e.target.value)}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Category</label>
                  <select
                    value={supCategory}
                    onChange={(e) => setSupCategory(e.target.value as any)}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                  >
                    <option value="Transport">Transportation / 4x4 Fleet</option>
                    <option value="Hotel">Lodge / Resort / Camp</option>
                    <option value="Guide">Tour Guides / Naturalists</option>
                    <option value="Activity Provider">Boating / Park Excursions</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-400 mb-1">Phone</label>
                    <input
                      type="text"
                      value={supPhone}
                      onChange={(e) => setSupPhone(e.target.value)}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={supLocation}
                      onChange={(e) => setSupLocation(e.target.value)}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSupplierModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL: ADD PROMO */}
        {showAddPromoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <form onSubmit={handleCreatePromo} className="bg-stone-900 text-white rounded-3xl p-6 max-w-md w-full border border-stone-700 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="text-base font-serif font-bold text-white">Create Promo Code</h3>
                <button type="button" onClick={() => setShowAddPromoModal(false)} className="text-stone-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Promo Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JAMHURI15"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white font-mono uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-400 mb-1">Type</label>
                    <select
                      value={promoDiscountType}
                      onChange={(e) => setPromoDiscountType(e.target.value as any)}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed_kes">Fixed KES Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Discount Value</label>
                    <input
                      type="number"
                      required
                      value={promoValue}
                      onChange={(e) => setPromoValue(Number(e.target.value))}
                      className="w-full p-2 bg-stone-800 border border-stone-700 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPromoModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#f85a5a] text-white text-xs font-bold cursor-pointer"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
};
