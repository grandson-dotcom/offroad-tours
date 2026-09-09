import React, { useState } from 'react';
import { usePackageBooking } from '../context/PackageBookingContext';
import { useApp } from '../context/AppContext';
import { PackageBooking } from '../types';
import {
  Compass,
  Calendar,
  Users,
  Car,
  Hotel,
  UserCheck,
  Download,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Star,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Send,
  X,
  AlertTriangle,
  RefreshCw,
  Search,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Navigation,
  Route as RouteIcon,
  ExternalLink
} from 'lucide-react';
import {
  KENYA_GEO_LOCATIONS,
  haversineDistanceKm,
  estimateRealisticTravelTimes
} from '../data/kenyaGeoData';

export const CustomerTripDashboard: React.FC = () => {
  const {
    packageBookings,
    addReview,
    requestBookingModification,
    requestBookingCancellation,
    createSupportTicket,
    reportLostProperty,
    supportTickets,
    driverGuideUpdates,
    lostPropertyReports
  } = usePackageBooking();
  const { setTab } = useApp();

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    packageBookings.length > 0 ? packageBookings[0].id : null
  );
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showModifyModal, setShowModifyModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [showLostItemModal, setShowLostItemModal] = useState<boolean>(false);

  // Review Form
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [transportRating, setTransportRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [activityRating, setActivityRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Modify Form
  const [newArrival, setNewArrival] = useState('2026-10-20');
  const [newDeparture, setNewDeparture] = useState('2026-10-23');
  const [newAdults, setNewAdults] = useState(2);
  const [modifyNotes, setModifyNotes] = useState('');
  const [modifyStatus, setModifyStatus] = useState<'idle' | 'success'>('idle');

  // Cancel Form
  const [cancelReason, setCancelReason] = useState('Flight rescheduling or emergency');
  const [cancelStatus, setCancelStatus] = useState<'idle' | 'success'>('idle');

  // Support Ticket Form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Booking Inquiry' | 'Payment & Billing' | 'Special Request' | 'Emergency / Urgent'>('Special Request');
  const [ticketPriority, setTicketPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'success'>('idle');

  // Lost Item Form
  const [lostDescription, setLostDescription] = useState('');
  const [lostCategory, setLostCategory] = useState<'Camera / Lens' | 'Phone / Electronics' | 'Passport / Wallet' | 'Clothing / Hat' | 'Binoculars' | 'Other'>('Camera / Lens');
  const [lostLocation, setLostLocation] = useState('Toyota Safari Land Cruiser (Back Seat)');
  const [lostDate, setLostDate] = useState('2026-10-18');
  const [lostStatus, setLostStatus] = useState<'idle' | 'success'>('idle');

  const activeBooking = packageBookings.find(b => b.id === selectedBookingId) || packageBookings[0];

  // Matching driver live updates for this booking
  const activeDriverUpdate = driverGuideUpdates.find(u => u.bookingId === activeBooking?.id) || driverGuideUpdates[0];

  // Matching support tickets
  const bookingTickets = supportTickets.filter(t => t.bookingReference === (activeBooking?.bookingReference || activeBooking?.referenceCode));

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedRef(code);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !reviewComment.trim()) return;

    addReview({
      packageId: activeBooking.packageId,
      packageName: activeBooking.packageName,
      bookingReference: activeBooking.bookingReference || activeBooking.referenceCode || '',
      authorName: activeBooking.customer?.name || activeBooking.customerInfo?.fullName || 'Traveler',
      authorCountry: activeBooking.customer?.country || activeBooking.customerInfo?.country || 'Kenya',
      rating,
      comment: reviewComment,
      ratingsBreakdown: {
        transport: transportRating,
        accommodation: hotelRating,
        guide: guideRating,
        activities: activityRating,
        valueForMoney: 5
      }
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      setReviewComment('');
    }, 1500);
  };

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;

    requestBookingModification(activeBooking.id, {
      arrivalDate: newArrival,
      departureDate: newDeparture,
      adults: newAdults,
      notes: modifyNotes
    });

    setModifyStatus('success');
    setTimeout(() => {
      setShowModifyModal(false);
      setModifyStatus('idle');
      setModifyNotes('');
    }, 1500);
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;

    requestBookingCancellation(activeBooking.id, cancelReason);
    setCancelStatus('success');
    setTimeout(() => {
      setShowCancelModal(false);
      setCancelStatus('idle');
    }, 1500);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !ticketSubject.trim() || !ticketMessage.trim()) return;

    createSupportTicket({
      customerName: activeBooking.customer?.name || activeBooking.customerInfo?.fullName || 'Valued Guest',
      customerEmail: activeBooking.customer?.email || activeBooking.customerInfo?.email || 'traveler@example.com',
      bookingReference: activeBooking.bookingReference || activeBooking.referenceCode,
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority,
      initialMessage: ticketMessage
    });

    setTicketStatus('success');
    setTimeout(() => {
      setShowSupportModal(false);
      setTicketStatus('idle');
      setTicketSubject('');
      setTicketMessage('');
    }, 1500);
  };

  const handleLostItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking || !lostDescription.trim()) return;

    reportLostProperty({
      bookingReference: activeBooking.bookingReference || activeBooking.referenceCode || '',
      packageName: activeBooking.packageName,
      customerName: activeBooking.customer?.name || activeBooking.customerInfo?.fullName || 'Guest',
      customerPhone: activeBooking.customer?.phone || activeBooking.customerInfo?.phone || '+254 700 000 000',
      itemDescription: lostDescription,
      category: lostCategory,
      lastSeenLocation: lostLocation,
      dateLost: lostDate
    });

    setLostStatus('success');
    setTimeout(() => {
      setShowLostItemModal(false);
      setLostStatus('idle');
      setLostDescription('');
    }, 1500);
  };

  return (
    <div className="py-12 bg-[#f8f9fa] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tourist Travel Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              My Travel Itineraries & Vouchers
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Live updates on your assigned vehicle, safari driver, hotel vouchers, and day-by-day schedule.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('home')}
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
            >
              Browse More Packages
            </button>
          </div>
        </div>

        {packageBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto">
            <Compass className="w-14 h-14 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">No Active Package Bookings Yet</h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              You haven't booked a customized travel package yet. Select any destination to build your dream safari.
            </p>
            <button
              onClick={() => setTab('home')}
              className="px-6 py-2.5 rounded-xl bg-[#f85a5a] text-white text-xs font-bold hover:bg-[#e04848] shadow-md transition-all"
            >
              Explore Travel Packages
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Bookings Selector (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Your Booked Experiences ({packageBookings.length})
              </h3>

              <div className="space-y-3">
                {packageBookings.map((b) => {
                  const isSelected = activeBooking?.id === b.id;
                  const bookingRef = b.bookingReference || b.referenceCode || 'REF-KEN';
                  const status = b.status || b.bookingStatus || 'Confirmed';
                  const arrival = b.arrivalDate || b.customization?.arrivalDate || 'Flexible';
                  const departure = b.departureDate || b.customization?.departureDate || 'Flexible';
                  const priceKES = b.pricing?.totalCustomerPriceKES || b.pricing?.finalPriceKES || 0;

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBookingId(b.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#f85a5a] bg-white ring-2 ring-[#f85a5a]/20 shadow-md'
                          : 'border-stone-200 bg-white hover:border-stone-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            status.toLowerCase() === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {status}
                          </span>
                          <h4 className="text-sm font-bold text-stone-900 mt-1.5 font-serif">{b.packageName}</h4>
                          <p className="text-xs text-stone-500">{arrival} to {departure}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-900 block font-mono">
                            KES {priceKES.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-semibold block">Paid in Full</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="font-mono">Ref: {bookingRef}</span>
                        <span className="text-[#f85a5a] font-bold">{isSelected ? 'Active View' : 'View Details →'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 24/7 Concierge Card */}
              <div className="p-5 bg-stone-900 text-white rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#f85a5a]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f85a5a]">
                    24/7 Safari Concierge
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Need to change pickup time or connect with your driver right away?
                </p>
                <div className="space-y-2 pt-1">
                  <a
                    href="https://wa.me/254712345678"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Concierge (+254 712 345 678)</span>
                  </a>
                  <a
                    href="tel:+254700000000"
                    className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Emergency Hotline</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Selected Booking Details & Vouchers (8 cols on lg) */}
            {activeBooking && (
              <div className="lg:col-span-8 space-y-6">
                
                {/* Booking Hero Banner */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#f85a5a] uppercase tracking-wider">
                          Booking Itinerary #{activeBooking.bookingReference || activeBooking.referenceCode || 'REF-KEN'}
                        </span>
                        <button
                          onClick={() => copyCode(activeBooking.bookingReference || activeBooking.referenceCode || '')}
                          className="text-stone-400 hover:text-stone-700 p-1"
                          title="Copy reference"
                        >
                          {copiedRef === (activeBooking.bookingReference || activeBooking.referenceCode) ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                        {activeBooking.packageName}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500">
                        Lead Traveler: <strong>{activeBooking.customer?.name || activeBooking.customerInfo?.fullName || 'Valued Guest'}</strong> ({activeBooking.customer?.email || activeBooking.customerInfo?.email || 'Registered Traveler'})
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handlePrintVoucher}
                        className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Print E-Voucher</span>
                      </button>

                      <button
                        onClick={() => setShowModifyModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Modify Dates</span>
                      </button>

                      <button
                        onClick={() => setShowSupportModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Support Ticket</span>
                      </button>

                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span>Leave Review</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Dispatch & Guide Status Tracker */}
                  <div className="p-4 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Live Safari Dispatch & Driver Status
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">
                        GPS Active • Safari Fleet Comms
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Vehicle Status</span>
                        <span className="font-bold text-white block mt-0.5">
                          {activeDriverUpdate?.tripStage || 'Driver Dispatched & En Route'}
                        </span>
                        <span className="text-[11px] text-stone-300">
                          {activeDriverUpdate?.currentLocation || 'Nairobi Safari Terminal'}
                        </span>
                      </div>

                      <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Assigned Driver</span>
                        <span className="font-bold text-white block mt-0.5">
                          {activeBooking.assignedTransport?.driverName || 'Kipchoge Maina'}
                        </span>
                        <span className="text-[11px] text-stone-300 font-mono">
                          {activeBooking.assignedTransport?.plateNumber || 'KDD 482Y (4x4 Cruiser)'}
                        </span>
                      </div>

                      <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex flex-col justify-between">
                        <span className="text-[10px] text-stone-400 uppercase font-semibold block">Quick Driver Connect</span>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`https://wa.me/254722918203?text=Hi%20Kipchoge,%20this%20is%20regarding%20booking%20${activeBooking.bookingReference || activeBooking.referenceCode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-[11px] font-bold flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href="tel:+254722918203"
                            className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 rounded-lg text-white text-[11px] font-bold flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {activeDriverUpdate?.message && (
                      <p className="text-xs text-amber-300/90 italic bg-black/20 p-2.5 rounded-xl border border-white/5">
                        "{activeDriverUpdate.message}"
                      </p>
                    )}
                  </div>

                  {/* Operational Assignments Grid (The real business platform value!) */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Live Operational Assignments</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Transport Card */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-stone-400">Assigned Transport</span>
                          <Car className="w-4 h-4 text-[#f85a5a]" />
                        </div>
                        <h4 className="text-xs font-bold text-stone-900">
                          {activeBooking.assignedTransport?.vehicleModel || activeBooking.assignments?.vehicleModel || activeBooking.selectedVehicle?.name || 'Toyota Safari Land Cruiser 4x4'}
                        </h4>
                        <div className="text-xs text-stone-600 space-y-0.5">
                          <p><strong>Driver:</strong> {activeBooking.assignedTransport?.driverName || activeBooking.assignments?.driverName || 'Kipchoge Maina'}</p>
                          <p><strong>Plate:</strong> <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 font-bold">{activeBooking.assignedTransport?.plateNumber || activeBooking.assignments?.vehiclePlate || 'KDD 482Y'}</span></p>
                          <p><strong>Contact:</strong> {activeBooking.assignedTransport?.driverPhone || activeBooking.assignments?.driverPhone || '+254 722 918 203'}</p>
                        </div>
                      </div>

                      {/* Accommodation Card */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-stone-400">Assigned Lodge</span>
                          <Hotel className="w-4 h-4 text-[#f85a5a]" />
                        </div>
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {activeBooking.assignedAccommodation?.hotelName || activeBooking.assignments?.hotelConfirmation || activeBooking.selectedAccommodation?.name || 'Lake Naivasha Sopa Resort'}
                        </h4>
                        <div className="text-xs text-stone-600 space-y-0.5">
                          <p><strong>Room:</strong> {activeBooking.assignedAccommodation?.roomAssigned || activeBooking.assignments?.roomAssigned || 'Deluxe Cottage Lakeview'}</p>
                          <p><strong>Voucher Ref:</strong> <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 font-bold">{activeBooking.assignedAccommodation?.confirmationVoucher || activeBooking.assignments?.hotelConfirmation || 'VCH-NVS-8291'}</span></p>
                          <p><strong>Meal Plan:</strong> Full Board (Breakfast, Lunch, Dinner)</p>
                        </div>
                      </div>

                      {/* Guide Card */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-stone-400">Assigned Guide</span>
                          <UserCheck className="w-4 h-4 text-[#f85a5a]" />
                        </div>
                        <h4 className="text-xs font-bold text-stone-900">
                          {activeBooking.assignedGuide?.guideName || activeBooking.assignments?.guideName || activeBooking.selectedGuide?.name || 'Daniel Ole Lenku'}
                        </h4>
                        <div className="text-xs text-stone-600 space-y-0.5">
                          <p><strong>Certification:</strong> KPSGA Silver Rated</p>
                          <p><strong>Languages:</strong> {activeBooking.assignedGuide?.languages?.join(', ') || 'English, Kiswahili, German'}</p>
                          <p><strong>Direct Line:</strong> {activeBooking.assignedGuide?.contact || activeBooking.assignments?.guidePhone || '+254 733 819 021'}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Trip Details & Special Requests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">Pickup & Logistics</span>
                      <p className="text-stone-800">
                        <strong>Location:</strong> {activeBooking.specialRequests?.pickupLocation || activeBooking.customization?.specialRequests?.pickupLocation || 'Nairobi City Hotel'}
                        {(activeBooking.specialRequests?.customPickupAddress || activeBooking.customization?.specialRequests?.customPickupAddress) && ` (${activeBooking.specialRequests?.customPickupAddress || activeBooking.customization?.specialRequests?.customPickupAddress})`}
                      </p>
                      <p className="text-stone-600"><strong>Pickup Time:</strong> 06:30 AM on Day 1</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-stone-400">Guest Preferences</span>
                      <p className="text-stone-800">
                        <strong>Diet:</strong> {activeBooking.specialRequests?.dietaryRequirement || activeBooking.customization?.specialRequests?.dietaryRequirement || 'Standard Menu'}
                      </p>
                      {(activeBooking.specialRequests?.celebrationType || activeBooking.customization?.specialRequests?.celebrationType) && (activeBooking.specialRequests?.celebrationType !== 'None' && activeBooking.customization?.specialRequests?.celebrationType !== 'None') && (
                        <p className="text-stone-800">
                          <strong>Celebration:</strong> {activeBooking.specialRequests?.celebrationType || activeBooking.customization?.specialRequests?.celebrationType} (Complimentary cake arranged)
                        </p>
                      )}
                      {(activeBooking.specialRequests?.notes || activeBooking.customization?.specialRequests?.notes) && (
                        <p className="text-stone-600 italic">"{activeBooking.specialRequests?.notes || activeBooking.customization?.specialRequests?.notes}"</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Receipt Recap */}
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-900 block">Payment Successfully Processed</span>
                      <span className="text-stone-500">
                        Method: {(activeBooking.payment?.method || activeBooking.paymentMethod || 'M-PESA').toUpperCase()} • Receipt #{activeBooking.payment?.mPesaReceiptNumber || activeBooking.payment?.transactionId || activeBooking.paymentReceipt || 'CONFIRMED'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-stone-900 text-sm font-mono">
                        KES {(activeBooking.pricing?.totalCustomerPriceKES || activeBooking.pricing?.finalPriceKES || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Trip Route, Live GPS Coordinates & Navigation Hub */}
                  <div className="p-5 bg-stone-900 text-white rounded-2xl border border-stone-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                      <div className="flex items-center gap-2">
                        <RouteIcon className="w-5 h-5 text-[#f85a5a]" />
                        <div>
                          <h4 className="text-sm font-bold text-white">Trip Route & Live Navigation Hub</h4>
                          <p className="text-[11px] text-stone-400">
                            Verified coordinates for your pickup, safari lodge, and emergency medical hubs
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTab('explore-map')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f85a5a] hover:bg-[#e04848] text-white text-xs font-semibold rounded-xl shadow transition-colors self-start sm:self-auto"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Open in 47-County Map →</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {/* Pickup Hub */}
                      <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
                        <div className="text-[10px] uppercase font-bold text-[#f85a5a] flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3" /> Pickup Meeting Point
                        </div>
                        <div className="font-semibold text-white truncate">
                          {activeBooking.specialRequests?.pickupLocation || 'JKIA Airport / Nairobi City'}
                        </div>
                        <div className="text-[11px] font-mono text-stone-400 mt-1">
                          GPS: -1.3192°, 36.9275°
                        </div>
                      </div>

                      {/* Safari Destination */}
                      <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
                        <div className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1 mb-1">
                          <Compass className="w-3 h-3" /> Safari Destination
                        </div>
                        <div className="font-semibold text-white truncate">
                          {activeBooking.packageName}
                        </div>
                        <div className="text-[11px] font-mono text-stone-400 mt-1">
                          Estimated Road Time: ~4.5 - 5.5 hrs
                        </div>
                      </div>

                      {/* Nearest Emergency & TPU */}
                      <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60">
                        <div className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1 mb-1">
                          <Shield className="w-3 h-3" /> Security & TPU Hub
                        </div>
                        <div className="font-semibold text-white truncate">
                          Tourist Police Unit (24/7)
                        </div>
                        <div className="text-[11px] text-stone-300 mt-1">
                          Emergency Hotline: +254 800 720 024
                        </div>
                      </div>
                    </div>

                    {/* Navigation Action Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800 text-xs">
                      <div className="text-stone-400 text-[11px]">
                        Driver Assigned: <strong className="text-white">{activeBooking.assignedTransport?.driverName || activeBooking.assignments?.driverName || 'David Mwangi'}</strong> ({activeBooking.assignedTransport?.plateNumber || activeBooking.assignments?.vehiclePlate || 'KDD 482Y'})
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=-1.3192,36.9275&destination=-1.4390,35.2150&travelmode=driving`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f85a5a] hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Launch Google Maps Route</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* Open Concierge Support Tickets & Lost Property Tracker */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                      <span>Concierge Requests & Tickets ({bookingTickets.length})</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowLostItemModal(true)}
                        className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline"
                      >
                        Report Lost Item
                      </button>
                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>

                  {bookingTickets.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">
                      No active support tickets for this booking. If you have dietary changes, luggage questions, or flight delays, click "Support Ticket" above.
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      {bookingTickets.map((t) => (
                        <div key={t.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900">{t.subject}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                              t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {t.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-600 space-y-1">
                            {t.messages.map((m) => (
                              <p key={m.id} className={m.senderRole === 'agent' ? 'font-semibold text-blue-700' : ''}>
                                <span className="text-stone-400">[{m.senderRole.toUpperCase()}]: </span>
                                {m.message}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Safari Packing & Pre-Trip Checklist */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f85a5a]" />
                    <span>Kenya Safari Preparation Checklist</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Carry valid government ID / Passport for park entrance gates.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Pack neutral khaki/green clothing, sunhat, and UV sunglasses.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>UK 3-pin plug adapter (Type G) used throughout Kenya.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Camera with telephoto zoom (200mm+ recommended for wildlife).</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* MODIFY BOOKING MODAL */}
        {showModifyModal && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#f85a5a]" />
                  <span>Modify Safari Dates / Party</span>
                </h3>
                <button onClick={() => setShowModifyModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {modifyStatus === 'success' ? (
                <div className="py-6 text-center text-emerald-600 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <h4 className="font-bold text-sm">Modification Request Submitted</h4>
                  <p className="text-xs text-stone-600">Your reservations desk has updated the dates and notified your assigned driver.</p>
                </div>
              ) : (
                <form onSubmit={handleModifySubmit} className="space-y-3.5 text-xs">
                  <p className="text-stone-600 leading-relaxed">
                    You can reschedule your game drives up to 48 hours prior to arrival with zero penalty fees.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">New Arrival Date</label>
                      <input
                        type="date"
                        required
                        value={newArrival}
                        onChange={(e) => setNewArrival(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">New Departure Date</label>
                      <input
                        type="date"
                        required
                        value={newDeparture}
                        onChange={(e) => setNewDeparture(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Number of Travelers</label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={newAdults}
                      onChange={(e) => setNewAdults(Number(e.target.value))}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Reason / Notes for Logistics Desk</label>
                    <textarea
                      rows={2}
                      value={modifyNotes}
                      onChange={(e) => setModifyNotes(e.target.value)}
                      placeholder="e.g., Flight KQ 102 landed 4 hours late, please shift day 1 pickup to 10:00 AM."
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModifyModal(false)}
                      className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#f85a5a] hover:bg-[#e04848] text-white font-bold rounded-xl shadow"
                    >
                      Confirm Modification
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* CANCEL BOOKING MODAL */}
        {showCancelModal && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2 text-rose-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Cancel Booking & Process Refund</span>
                </h3>
                <button onClick={() => setShowCancelModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cancelStatus === 'success' ? (
                <div className="py-6 text-center text-rose-600 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <h4 className="font-bold text-sm">Booking Cancelled & Refund Initiated</h4>
                  <p className="text-xs text-stone-600">Your refund has been verified according to our TRA fair-refund policy and returned to your original payment method.</p>
                </div>
              ) : (
                <form onSubmit={handleCancelSubmit} className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                    <span className="font-bold block">Kenya TRA Verified Cancellation Policy</span>
                    <p className="text-[11px] text-rose-800">
                      • More than 72 hours prior: 100% full refund returned within 3 business days.<br/>
                      • 24–72 hours prior: 80% refund (20% covers park entry permits pre-issued).
                    </p>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Reason for cancellation</label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value="Flight rescheduling or cancellation">Flight rescheduling or cancellation</option>
                      <option value="Medical or health reason">Medical or health reason</option>
                      <option value="Personal emergency">Personal emergency</option>
                      <option value="Change of travel destination">Change of travel destination</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCancelModal(false)}
                      className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600"
                    >
                      Keep Booking
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* CONCIERGE SUPPORT TICKET MODAL */}
        {showSupportModal && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>24/7 Concierge Support Ticket</span>
                </h3>
                <button onClick={() => setShowSupportModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {ticketStatus === 'success' ? (
                <div className="py-6 text-center text-blue-600 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <h4 className="font-bold text-sm">Ticket Dispatched to Nairobi Operations</h4>
                  <p className="text-xs text-stone-600">Expected response time: Under 15 minutes. We will notify you here and via WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleCreateTicketSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value="Special Request">Special Request (Dietary / Celebration / Room)</option>
                      <option value="Booking Inquiry">Booking Inquiry / Schedule Check</option>
                      <option value="Payment & Billing">Payment & Billing / Receipt</option>
                      <option value="Emergency / Urgent">Emergency / Urgent (En Route Help)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Request vegetarian meal at Mara Serena Lodge"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Priority</label>
                    <div className="flex gap-2">
                      {(['Low', 'Medium', 'High', 'Urgent'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setTicketPriority(p)}
                          className={`flex-1 py-1.5 rounded-lg border font-bold text-[11px] ${
                            ticketPriority === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-stone-50 border-stone-200 text-stone-600'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your request in detail so our safari team can prepare immediately..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSupportModal(false)}
                      className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                    >
                      Send Ticket
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* REPORT LOST ITEM MODAL */}
        {showLostItemModal && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>Report Lost Property in Safari Fleet</span>
                </h3>
                <button onClick={() => setShowLostItemModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {lostStatus === 'success' ? (
                <div className="py-6 text-center text-amber-600 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <h4 className="font-bold text-sm">Lost Property Report Registered</h4>
                  <p className="text-xs text-stone-600">Our vehicle fleet dispatcher has alerted driver {activeBooking.assignedTransport?.driverName || 'Kipchoge Maina'} to inspect the vehicle.</p>
                </div>
              ) : (
                <form onSubmit={handleLostItemSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Item Category</label>
                    <select
                      value={lostCategory}
                      onChange={(e) => setLostCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value="Camera / Lens">Camera / Telephoto Lens</option>
                      <option value="Binoculars">Binoculars</option>
                      <option value="Phone / Electronics">Phone / Tablet / Charger</option>
                      <option value="Passport / Wallet">Passport / Wallet / Documents</option>
                      <option value="Clothing / Hat">Clothing / Safari Hat / Jacket</option>
                      <option value="Other">Other Valuable</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Item Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sony Alpha 7 IV camera with 70-200mm GM lens in black leather pouch"
                      value={lostDescription}
                      onChange={(e) => setLostDescription(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Last Seen Location</label>
                    <input
                      type="text"
                      value={lostLocation}
                      onChange={(e) => setLostLocation(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Date</label>
                    <input
                      type="date"
                      value={lostDate}
                      onChange={(e) => setLostDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowLostItemModal(false)}
                      className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow"
                    >
                      Broadcast Lost Report
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* LEAVE A REVIEW MODAL */}
        {showReviewModal && activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Rate Your Experience
                </h3>
                <button onClick={() => setShowReviewModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reviewSubmitted ? (
                <div className="py-8 text-center text-emerald-600 space-y-2">
                  <CheckCircle2 className="w-12 h-12 mx-auto" />
                  <h4 className="font-bold text-base">Asante Sana! (Thank You)</h4>
                  <p className="text-xs text-stone-600">Your verified traveler review has been posted.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Overall Trip Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${s <= rating ? 'fill-amber-400' : 'text-stone-300'}`} />
                        </button>
                      ))}
                      <span className="font-bold text-stone-700 ml-2">{rating} / 5 Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Write your review</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts on the vehicle, safari guide, meals, and park game drives..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="font-semibold text-stone-600 block">Transport Rating: {transportRating}/5</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={transportRating}
                        onChange={(e) => setTransportRating(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-600 block">Lodge Rating: {hotelRating}/5</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={hotelRating}
                        onChange={(e) => setHotelRating(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#f85a5a] hover:bg-[#e04848] text-white font-bold rounded-xl shadow-md transition-all"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
