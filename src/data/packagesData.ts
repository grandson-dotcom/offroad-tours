import { TravelPackage, TravelSupplier, PromoCode, PackageReview } from '../types';

export const INITIAL_TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-naivasha-escape',
    slug: 'naivasha-escape-3day',
    name: 'NAIVASHA ESCAPE',
    tagline: 'Lakeside Wildlife, Volcanic Canyons & Crescent Island Walking Safari',
    destination: 'Naivasha',
    region: 'Great Rift Valley',
    durationDays: 3,
    durationNights: 2,
    basePriceKES: 50000,
    basePriceUSD: 385,
    supplierBaseCostKES: 38000,
    featuredImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    category: 'Lake & Adventure',
    overview: 'Experience the magic of the Great Rift Valley with our signature 3-day Naivasha complete escape. Glide past pods of hippos and African fish eagles on Lake Naivasha, bicycle through the towering gorges of Hell’s Gate National Park (inspiration for The Lion King), and walk alongside free-roaming giraffes and zebras on Crescent Island. This package combines scenic private transfers, full board accommodation, park permits, and top-tier guides into one seamless journey.',
    minTravellers: 1,
    maxTravellers: 12,
    rating: 4.95,
    reviewsCount: 142,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip transfer from Nairobi in your selected vehicle with fuel & driver-guide allowance',
      '2 Nights accommodation in Naivasha with all meals (Full Board)',
      'Scenic motorized boat excursion on Lake Naivasha for hippo & bird watching',
      'Hell’s Gate National Park entry fees, mountain bicycle rental & gorge trek',
      'Complimentary bottled spring water throughout game drives',
      'All government tourism taxes, levies and KWS environmental fees',
      '24/7 dedicated local concierge and Flying Doctors emergency evacuation cover'
    ],
    excludedServices: [
      'International flights & visa fees',
      'Alcoholic beverages and personal lodge incidentals',
      'Optional premium activity add-ons (spa, horseback, private boat upgrades)',
      'Driver-guide tips and gratuities (recommended $10-$20/day)'
    ],
    cancellationPolicy: '100% full refund up to 72 hours prior to arrival date. 50% refund within 48-72 hours. Date changes are free of charge subject to hotel availability.',
    importantInfo: [
      'Departure from Nairobi at 07:30 AM allows you to reach the Rift Valley escarpment for panoramic photos by 08:30 AM.',
      'Pack comfortable hiking shoes, sunglasses, a light warm fleece for breezy lake evenings, and a sunhat.',
      'Hell’s Gate biking route is flat to gently undulating and suitable for all fitness levels.'
    ],
    availableDates: [
      '2026-09-08', '2026-09-12', '2026-09-15', '2026-09-18', '2026-09-22', '2026-09-25', '2026-09-29',
      '2026-10-02', '2026-10-06', '2026-10-10', '2026-10-14', '2026-10-18', '2026-10-22', '2026-10-26'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Lake Naivasha & Sunset Hippo Boat Safari',
        highlight: 'Great Rift Valley Escarpment Lookout & Lake Naivasha Waters',
        schedule: [
          { time: '07:30 AM', activity: 'VIP pickup from your Nairobi hotel or JKIA airport in your dedicated vehicle', location: 'Nairobi', transport: 'Private Vehicle' },
          { time: '08:45 AM', activity: 'Scenic photo stop at the Great Rift Valley Viewpoint overlooking Mount Longonot', location: 'Rift Valley Escarpment', notes: 'Enjoy fresh Kenyan tea and volcanic canyon panoramas' },
          { time: '11:30 AM', activity: 'Arrive at your Naivasha lodge, welcome cocktail & swift check-in', location: 'Lake Naivasha', notes: 'Free time to admire roaming zebras on the lawn' },
          { time: '01:00 PM', activity: 'Chef’s lunch buffet overlooking the lake gardens', location: 'Lodge Dining' },
          { time: '04:00 PM', activity: 'Motorized boat ride tracking hippos and fish eagles', location: 'Lake Naivasha', notes: 'Life jackets provided, expert boat captain' },
          { time: '07:30 PM', activity: 'Multi-course dinner and lakeside campfire relaxation', location: 'Lodge' }
        ],
        mealsIncluded: 'Lunch, Dinner',
        accommodationName: 'Lake Naivasha Lodge'
      },
      {
        day: 2,
        title: 'Hell’s Gate Volcanic Canyon & Crescent Island Walk',
        highlight: 'Bicycle Safari through towering cliffs and walking among wild animals',
        schedule: [
          { time: '07:00 AM', activity: 'Full English / Swahili breakfast at lodge', location: 'Lodge Dining' },
          { time: '08:15 AM', activity: 'Enter Hell’s Gate National Park; pick up mountain bikes', location: 'Hell’s Gate Elsa Gate', notes: 'Ride alongside warthogs, elands and giraffes' },
          { time: '10:00 AM', activity: 'Guided exploration hike through the Ol Njorowa Lower Gorge', location: 'Hell’s Gate Canyon', notes: 'Natural hot springs and dramatic carved basalt rock' },
          { time: '01:00 PM', activity: 'Picnic lunch under yellow fever acacia trees', location: 'Ranger Station Picnic Point' },
          { time: '03:00 PM', activity: 'Boat transfer to Crescent Island Game Sanctuary walking safari', location: 'Crescent Island', notes: 'Get within meters of harmless wildlife on foot' },
          { time: '07:30 PM', activity: 'Lakeside BBQ dinner under the African stars', location: 'Lodge' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Lake Naivasha Lodge'
      },
      {
        day: 3,
        title: 'Geothermal Spa Relaxation & Scenic Return to Nairobi',
        highlight: 'Olkaria Hot Natural Geothermal Pool & Curio Markets',
        schedule: [
          { time: '08:00 AM', activity: 'Leisurely champagne breakfast with lake views', location: 'Lodge Dining' },
          { time: '10:00 AM', activity: 'Optional swim in Olkaria Geothermal Spa minerals pool or lodge spa', location: 'Olkaria Spa' },
          { time: '12:00 PM', activity: 'Check out and depart towards Nairobi with local curio stops', location: 'Naivasha Highway' },
          { time: '03:30 PM', activity: 'Drop-off at your Nairobi residence, hotel or JKIA airport', location: 'Nairobi', transport: 'Private Vehicle' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure Day'
      }
    ],
    vehicles: [
      {
        id: 'veh-toyota-noah',
        name: 'Toyota Noah / Voxy',
        category: 'Standard',
        passengerCapacity: 5,
        luggageCapacity: 4,
        features: ['Air Conditioning', 'High Ground Clearance', 'USB Charging Ports', 'Tinted Windows'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 12000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-toyota-prado',
        name: 'Toyota Land Cruiser Prado TX',
        category: 'Mid-Tier 4x4',
        passengerCapacity: 5,
        luggageCapacity: 5,
        features: ['4x4 All-Wheel Drive', 'Premium Leather Interior', 'Sunroof', 'High Ride Comfort', 'Off-road capability'],
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 5000,
        supplierCostKES: 16000,
        available: true
      },
      {
        id: 'veh-private-van',
        name: 'Private Safari Tour Van (HiAce)',
        category: 'Safari Van',
        passengerCapacity: 7,
        luggageCapacity: 7,
        features: ['Pop-up Roof for 360° Viewing', 'Window Seats Guaranteed', 'Inverter Charging Sockets', 'Cooler Box'],
        image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 10000,
        supplierCostKES: 20000,
        available: true
      },
      {
        id: 'veh-luxury-suv',
        name: 'Luxury Executive SUV (Land Cruiser V8 / Range Rover)',
        category: 'Executive SUV',
        passengerCapacity: 4,
        luggageCapacity: 4,
        features: ['Executive Plush Reclining Seats', 'Panoramic Sunroof', 'On-board Chilled Refreshments', 'Quiet Cabin', 'WiFi Onboard'],
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 15000,
        supplierCostKES: 25000,
        available: true
      },
      {
        id: 'veh-safari-4x4',
        name: 'Custom Safari 4x4 Land Cruiser',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Heavy Duty Pop-up Photography Hatch', 'Individual Window Seats', 'High Lift Suspension', 'Dual Spare Tires', 'Binocular Sets'],
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e91f?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 20000,
        supplierCostKES: 28000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-standard-lodge',
        name: 'Standard Safari Lodge (Lake Naivasha Country Club / Sawela Standard)',
        type: 'Standard Lodge',
        rating: 4.5,
        reviewsCount: 88,
        location: 'Moi South Lake Road, Naivasha',
        roomType: 'Deluxe Garden Cottage',
        mealPlan: 'Full Board (Breakfast, Lunch, Dinner)',
        amenities: ['Lush Green Lawns', 'Swimming Pool', 'Lakefront Access', 'Free Wi-Fi', 'En-suite Bathroom', 'Private Verandah'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 15000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-premium-lodge',
        name: 'Premium Lake Lodge (Lake Naivasha Sopa Resort)',
        type: 'Premium Lodge',
        rating: 4.8,
        reviewsCount: 164,
        location: 'South Lake Road, Lake Naivasha',
        roomType: 'Signature Lake-facing Stone Chalet',
        mealPlan: 'Full Board with Bush Dining',
        amenities: ['Giraffes & Zebras Grazing on Lawns', 'Olympic Size Pool', 'Direct Jetty Access', 'Bathtub & Rain Shower', 'Balcony overlooking Lake'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 7000,
        supplierCostKES: 20000,
        available: true
      },
      {
        id: 'acc-luxury-resort',
        name: 'Luxury Resort & Spa (Enashipai Resort & Spa)',
        type: 'Luxury Resort',
        rating: 4.9,
        reviewsCount: 210,
        location: 'Moi South Lake Rd, Naivasha',
        roomType: 'Executive Villa Suite with Jacuzzi',
        mealPlan: 'Ultra All-Inclusive Gourmet Dining',
        amenities: ['Siyara African Wellness Spa', 'Private Boat Launch', 'Heated Pool', 'Tennis Courts', 'Fine Wine Cellar', 'Turndown Service with Chocolates'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 15000,
        supplierCostKES: 27000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-standard-shared',
        name: 'Standard Licensed Guide',
        type: 'Shared Professional Guide',
        languages: ['English', 'Kiswahili'],
        experienceYears: 6,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 5000,
        isDefault: true,
        rating: 4.7,
        available: true
      },
      {
        id: 'gd-private-guide',
        name: 'Dedicated Private Tour Guide (KPSGA Bronze/Silver)',
        type: 'Dedicated Private Guide',
        languages: ['English', 'Kiswahili', 'French', 'German (on request)'],
        experienceYears: 12,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 5000,
        supplierCostKES: 9000,
        rating: 4.95,
        available: true
      },
      {
        id: 'gd-specialist-guide',
        name: 'Specialized Wildlife Photographer & Ornithologist Guide',
        type: 'Specialist Wildlife & Photography Naturalist',
        languages: ['English', 'Kiswahili', 'German'],
        experienceYears: 18,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 12000,
        supplierCostKES: 15000,
        rating: 5.0,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-boat-ride',
        name: 'Lake Naivasha Motorized Boat Safari',
        category: 'Water',
        description: 'Glide past pods of hippos and African fish eagles on the lake.',
        duration: '1.5 Hours',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 3000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-hells-gate',
        name: 'Hell’s Gate National Park Entry & Gorge Trek',
        category: 'Adventure',
        description: 'Explore dramatic canyon scenery, basalt Fischer’s Tower and volcanic steam geysers.',
        duration: '3.5 Hours',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 3500,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-crescent-island',
        name: 'Crescent Island Walking Safari',
        category: 'Wildlife',
        description: 'Walk on foot alongside gentle wild giraffes, waterbucks, wildebeests, and gazelles.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
        priceKES: 3000,
        supplierCostKES: 2200,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-cycling',
        name: 'Hell’s Gate Canyon Mountain Cycling',
        category: 'Adventure',
        description: 'High quality geared mountain bicycle with helmet for riding through the national park wildlife plains.',
        duration: '3 Hours',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80',
        priceKES: 2000,
        supplierCostKES: 1400,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-horse-riding',
        name: 'Lakeside Horse Riding Safari',
        category: 'Adventure',
        description: 'Gentle escorted horseback riding along the shores of Lake Naivasha amidst acacia woodlands.',
        duration: '1.5 Hours',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        priceKES: 4000,
        supplierCostKES: 2800,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-spa-experience',
        name: 'Olkaria Natural Geothermal Mineral Spa Soak',
        category: 'Relaxation',
        description: 'Bathe in the natural turquoise warm geothermal mineral waters of Africa’s largest thermal pool.',
        duration: '2.5 Hours',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
        priceKES: 5000,
        supplierCostKES: 3200,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-private-boat',
        name: 'Exclusive Sunset Private Boat with Sparkling Wine',
        category: 'Water',
        description: 'Charter an entire private boat for sunset with chilled sparkling wine, fruit skewers and wildlife binoculars.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        priceKES: 6000,
        supplierCostKES: 4200,
        includedInBase: false,
        available: true
      }
    ]
  },
  {
    id: 'pkg-maasai-mara-safari',
    slug: 'maasai-mara-safari-3day',
    name: 'MAASAI MARA SAFARI',
    tagline: 'World-Famous Big 5 Encounters, River Crossing & Endless Savannahs',
    destination: 'Maasai Mara',
    region: 'Rift Valley / Narok',
    durationDays: 3,
    durationNights: 2,
    basePriceKES: 85000,
    basePriceUSD: 650,
    supplierBaseCostKES: 66000,
    featuredImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Iconic Safari',
    category: 'Wildlife & Safari',
    overview: 'Witness the eighth wonder of the natural world. Experience three days of adrenaline-charged game drives in Kenya’s legendary Maasai Mara National Reserve, home to the densest wild lion prides, migrating wildebeests, and majestic cheetah coalitions. Full board tented camp luxury, professional driver-guide, and park conservancy permits included.',
    minTravellers: 1,
    maxTravellers: 12,
    rating: 4.98,
    reviewsCount: 278,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip 4x4 transport from Nairobi in high-spec safari vehicle with pop-up roof',
      '2 Nights luxury tented camp accommodation with all meals included',
      'Comprehensive morning and afternoon game drives in prime wildlife sectors',
      'Maasai Mara National Reserve entrance and conservation fees ($100-$200/day value)',
      'Authentic Maasai warrior cultural village immersion visit with traditional dance',
      'Mineral water and binoculars in vehicle',
      'AMREF Flying Doctors 24/7 air medical evacuation coverage'
    ],
    excludedServices: [
      'International flights',
      'Optional Sunrise Hot Air Balloon Safari with bush champagne breakfast (+KES 58,000)',
      'Personal bar purchases, premium spirits & tips'
    ],
    cancellationPolicy: '100% full refund up to 7 days before departure. 50% refund within 3-6 days.',
    importantInfo: [
      'Early morning game drives start at 06:15 AM for prime predator action.',
      'Pack neutral khaki/green clothing, fleece jacket for crisp morning drives, and powerbanks.'
    ],
    availableDates: [
      '2026-09-10', '2026-09-14', '2026-09-18', '2026-09-22', '2026-09-26', '2026-09-30',
      '2026-10-04', '2026-10-08', '2026-10-12', '2026-10-16', '2026-10-20'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara & Sunset Predator Drive',
        highlight: 'Descending the Rift Valley and entering the wild Mara savannah',
        schedule: [
          { time: '06:30 AM', activity: 'Departure from Nairobi via the scenic Great Rift Valley floor', location: 'Nairobi to Narok', transport: 'Safari 4x4' },
          { time: '12:30 PM', activity: 'Arrive at luxury safari tented camp; welcome towels & lunch', location: 'Maasai Mara', notes: 'Listen to hippos grunting in the nearby river' },
          { time: '03:30 PM', activity: 'First thrilling afternoon game drive hunting for the Big 5', location: 'Mara Reserve', notes: 'Look for lion prides stalking plains game' },
          { time: '07:30 PM', activity: 'Bush dinner by the campfire with Maasai storytelling', location: 'Camp Dining' }
        ],
        mealsIncluded: 'Lunch, Dinner',
        accommodationName: 'Mara Luxury Tented Camp'
      },
      {
        day: 2,
        title: 'Full Day Deep Plains Game Drive & Mara River',
        highlight: 'Mara River hippo pools, Nile crocodiles & endless migrating herds',
        schedule: [
          { time: '06:15 AM', activity: 'Dawn game drive tracking big cats on the hunt (or balloon safari)', location: 'Mara Plains' },
          { time: '08:30 AM', activity: 'Bush breakfast in the wild under an acacia tree', location: 'Savannah' },
          { time: '11:00 AM', activity: 'Arrive at the famous Mara River crossing site with giant Nile crocodiles', location: 'Mara River' },
          { time: '01:00 PM', activity: 'Packed chef picnic lunch at the Kenya-Tanzania border marker', location: 'Border Point' },
          { time: '04:30 PM', activity: 'Visit traditional Maasai Manyatta village for fire-making & warrior jumping dance', location: 'Maasai Village' },
          { time: '07:30 PM', activity: 'Celebration dinner under the stars', location: 'Camp' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Mara Luxury Tented Camp'
      },
      {
        day: 3,
        title: 'Sunrise Game Drive & Return to Nairobi',
        highlight: 'Golden sunrise photography and scenic return journey',
        schedule: [
          { time: '06:30 AM', activity: 'Short morning farewell game drive as the sun lights up the plains', location: 'Mara Reserve' },
          { time: '09:00 AM', activity: 'Camp breakfast and departure back to Nairobi', location: 'Narok Route' },
          { time: '04:00 PM', activity: 'Arrive in Nairobi with airport or hotel drop-off', location: 'Nairobi', transport: 'Safari 4x4' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure'
      }
    ],
    vehicles: [
      {
        id: 'veh-mara-van',
        name: 'Custom Safari Tour Van with Pop-up Roof',
        category: 'Safari Van',
        passengerCapacity: 7,
        luggageCapacity: 7,
        features: ['Pop-up Roof', 'Window Seat Guaranteed', 'Cooler Box', 'UHF Radio'],
        image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 24000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-mara-cruiser',
        name: 'High-Spec 4x4 Safari Land Cruiser Extended',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Heavy Duty Suspension', 'Individual Window View', 'Inverter Plugs', 'Fridge', 'Pop-up Canvas Roof'],
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e91f?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 15000,
        supplierCostKES: 34000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-mara-standard',
        name: 'Standard Safari Camp (Enkorok / Sentrim Mara)',
        type: 'Tented Camp',
        rating: 4.6,
        reviewsCount: 95,
        location: 'Oloolaimutia / Sekenani Gate',
        roomType: 'Luxury Safari Tent with En-suite Bathroom',
        mealPlan: 'Full Board',
        amenities: ['Hot Showers', 'Swimming Pool', 'Campfire', 'Scenic Savannah Views'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 26000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-mara-premium',
        name: 'Premium Camp (Sarova Mara Game Camp)',
        type: 'Premium Lodge',
        rating: 4.9,
        reviewsCount: 220,
        location: 'Inside Maasai Mara Reserve',
        roomType: 'Club Safari Tented Chalet',
        mealPlan: 'Full Board with Bush Dinners',
        amenities: ['Located INSIDE the Reserve', 'Heated Pool', 'Organic Garden', 'Cultural Center', 'Mini Bar'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 22000,
        supplierCostKES: 42000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-mara-silver',
        name: 'Certified KPSGA Silver Safari Guide',
        type: 'Shared Professional Guide',
        languages: ['English', 'Kiswahili', 'Maa'],
        experienceYears: 11,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 7000,
        isDefault: true,
        rating: 4.9,
        available: true
      },
      {
        id: 'gd-mara-private',
        name: 'Gold Naturalist & Maasai Elder Private Tracker',
        type: 'Dedicated Private Guide',
        languages: ['English', 'Kiswahili', 'French', 'German'],
        experienceYears: 20,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 10000,
        supplierCostKES: 15000,
        rating: 5.0,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-mara-game-drives',
        name: 'Unlimited Big 5 Safari Game Drives',
        category: 'Wildlife',
        description: 'Morning and afternoon game drives with expert tracking.',
        duration: 'Multiple Drives',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 5000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-mara-village',
        name: 'Authentic Maasai Boma Village Cultural Visit',
        category: 'Culture',
        description: 'Meet local Maasai elders, witness traditional dances and medicinal plants.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
        priceKES: 3000,
        supplierCostKES: 2000,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-mara-balloon',
        name: 'Sunrise Hot Air Balloon Flight with Bush Champagne Breakfast',
        category: 'Adventure',
        description: 'Float quietly above the Mara plains at dawn, followed by a hot champagne breakfast in the wild.',
        duration: '3.5 Hours',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        priceKES: 58000,
        supplierCostKES: 48000,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-mara-night-drive',
        name: 'Night Safari Drive (Conservancy Border)',
        category: 'Wildlife',
        description: 'Infrared spot tracking for leopards, hyenas, aardvarks and nocturnal predators.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80',
        priceKES: 6500,
        supplierCostKES: 4500,
        includedInBase: false,
        available: true
      }
    ]
  },
  {
    id: 'pkg-diani-beach-escape',
    slug: 'diani-beach-escape-4day',
    name: 'DIANI BEACH ESCAPE',
    tagline: 'Voted Africa’s Leading Beach Destination: Powder Sands & Coral Reefs',
    destination: 'Diani Beach',
    region: 'South Coast / Kwale',
    durationDays: 4,
    durationNights: 3,
    basePriceKES: 75000,
    basePriceUSD: 575,
    supplierBaseCostKES: 56000,
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Beach Paradise',
    category: 'Beach & Coastal',
    overview: 'Unwind along miles of turquoise Indian Ocean waters and silky white powdery sand in Diani Beach. From traditional Swahili dhow cruises searching for wild dolphins to snorkeling the pristine coral gardens of Kisite Mpunguti Marine Park and sunset seafood dinners, this 4-day tropical retreat is the ultimate Kenyan coastal experience.',
    minTravellers: 1,
    maxTravellers: 10,
    rating: 4.93,
    reviewsCount: 165,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip airport transfers between Diani (Ukunda) Airstrip or Mombasa SGR station',
      '3 Nights accommodation in beachfront resort with daily breakfast & dinner (Half Board)',
      'Full day Wasini Island Dhow Cruise with dolphin spotting & Kisite Marine Park snorkeling',
      'Fresh Swahili seafood buffet lunch on Wasini Island with crab & coconut rice',
      'Shimoni historical slave caves guided tour with community guide',
      'All marine conservation taxes and boat crew service'
    ],
    excludedServices: [
      'Domestic flight to Diani/Mombasa (can be arranged on request)',
      'Water sports equipment rental (kitesurfing, jet-skis)',
      'Alcoholic drinks at resort'
    ],
    cancellationPolicy: '100% full refund up to 5 days prior to arrival. 50% within 48-96 hours.',
    importantInfo: [
      'Snorkeling gear (masks, snorkels, fins, lifejackets) is provided on the dhow.',
      'Remember coral-safe sunscreen, waterproof phone pouches, and beach footwear.'
    ],
    availableDates: [
      '2026-09-09', '2026-09-13', '2026-09-17', '2026-09-21', '2026-09-25', '2026-09-29',
      '2026-10-03', '2026-10-07', '2026-10-11', '2026-10-15', '2026-10-19'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Diani Beach & Sunset Cocktails',
        highlight: 'Check-in to oceanfront resort & barefoot beach stroll',
        schedule: [
          { time: '01:00 PM', activity: 'Private transfer from Ukunda Airstrip or Mombasa SGR', location: 'Diani Beach', transport: 'Air-conditioned Van' },
          { time: '02:30 PM', activity: 'Check-in to beachfront resort with fresh madafu (coconut water)', location: 'Resort' },
          { time: '05:30 PM', activity: 'Sunset barefoot walk along powdery sands', location: 'Diani Beach' },
          { time: '07:30 PM', activity: 'Swahili coastal seafood dinner at resort', location: 'Restaurant' }
        ],
        mealsIncluded: 'Dinner',
        accommodationName: 'Diani Beach Resort'
      },
      {
        day: 2,
        title: 'Wasini Island Dolphin Dhow Safari & Kisite Reef Snorkel',
        highlight: 'Sailing with wild dolphins and swimming in turquoise coral gardens',
        schedule: [
          { time: '07:00 AM', activity: 'Depart resort to Shimoni jetty', location: 'Shimoni' },
          { time: '08:30 AM', activity: 'Board traditional wooden dhow into Kisite Mpunguti Marine Park', location: 'Kisite Marine Park' },
          { time: '10:30 AM', activity: 'Guided snorkeling over vibrant coral reefs with tropical fish and sea turtles', location: 'Coral Reef' },
          { time: '01:00 PM', activity: 'Swahili crab feast and coconut fish on Wasini Island', location: 'Wasini Island' },
          { time: '03:30 PM', activity: 'Shimoni Slave Caves historical walk', location: 'Shimoni Caves' },
          { time: '06:00 PM', activity: 'Return to resort', location: 'Diani' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Diani Beach Resort'
      },
      {
        day: 3,
        title: 'Kongo River Sunset Canoe & Leisure Beach Day',
        highlight: 'Ancient baobabs, tidal river canoeing & Swahili culture',
        schedule: [
          { time: '08:30 AM', activity: 'Relaxed tropical breakfast overlooking the waves', location: 'Resort' },
          { time: '11:00 AM', activity: 'Free beach time, swimming, or optional deep sea diving', location: 'Diani Beach' },
          { time: '04:30 PM', activity: 'Traditional wooden dugout canoe trip on Kongo River at golden hour', location: 'Kongo River' },
          { time: '07:30 PM', activity: 'Candlelit beach dinner under palm trees', location: 'Resort' }
        ],
        mealsIncluded: 'Breakfast, Dinner',
        accommodationName: 'Diani Beach Resort'
      },
      {
        day: 4,
        title: 'Farewell Swim & Departure',
        highlight: 'Morning ocean swim and airport transfer',
        schedule: [
          { time: '08:00 AM', activity: 'Final morning dip in the turquoise Indian Ocean', location: 'Diani' },
          { time: '11:00 AM', activity: 'Checkout and transfer to Ukunda Airstrip or Mombasa SGR', location: 'Departure' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure'
      }
    ],
    vehicles: [
      {
        id: 'veh-diani-van',
        name: 'Executive Air-Conditioned Coastal Shuttle Van',
        category: 'Standard',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Dual Air Conditioning', 'Spacious Seating', 'Tinted Windows', 'Luggage Compartment'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 10000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-diani-prado',
        name: 'Private Luxury 4x4 Prado',
        category: 'Mid-Tier 4x4',
        passengerCapacity: 4,
        luggageCapacity: 4,
        features: ['Leather Seating', 'Chilled Water Onboard', 'Private Chauffeur at disposal'],
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 12000,
        supplierCostKES: 18000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-diani-standard',
        name: 'Standard Beachfront Resort (Baobab Beach Resort Standard / Diani Sea Resort)',
        type: 'Standard Lodge',
        rating: 4.6,
        reviewsCount: 110,
        location: 'Diani Beach Road',
        roomType: 'Garden View Room with Balcony',
        mealPlan: 'Half Board (Breakfast & Dinner)',
        amenities: ['Direct Beach Access', 'Two Swimming Pools', 'Free Wi-Fi', 'Nightly Swahili Entertainment'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 32000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-diani-luxury',
        name: 'Luxury Boutique Resort (The Sands at Nomad / Swahili Beach)',
        type: 'Luxury Resort',
        rating: 4.95,
        reviewsCount: 195,
        location: 'Central Diani Beachfront',
        roomType: 'Oceanfront Deluxe Suite',
        mealPlan: 'Gourmet Half Board & Spa Credits',
        amenities: ['Private Beach Loungers', 'Award-winning Seafood Cellar', 'Cascade Waterfall Pools', 'Water Sports Center'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 25000,
        supplierCostKES: 50000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-diani-marine',
        name: 'Certified Marine & Wildlife Guide (Ali Hassan)',
        type: 'Dedicated Private Guide',
        languages: ['English', 'Kiswahili', 'Italian'],
        experienceYears: 14,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 6000,
        isDefault: true,
        rating: 4.95,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-diani-wasini',
        name: 'Wasini Dolphin Safari & Marine Park Snorkel',
        category: 'Water',
        description: 'Complete dhow excursion with dolphins and coral reef exploration.',
        duration: 'Full Day',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 8000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-diani-kitesurf',
        name: 'Kite Surfing or Paddleboarding Lesson',
        category: 'Adventure',
        description: 'Two-hour private coaching on Diani’s calm warm turquoise shallows.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
        priceKES: 8500,
        supplierCostKES: 6000,
        includedInBase: false,
        available: true
      },
      {
        id: 'act-diani-sunset-dhow',
        name: 'Private Romantic Sunset Dhow with Canapés',
        category: 'Relaxation',
        description: 'Sail the coastal waters as the golden sun dips behind coconut palms.',
        duration: '2.5 Hours',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80',
        priceKES: 9500,
        supplierCostKES: 6800,
        includedInBase: false,
        available: true
      }
    ]
  },
  {
    id: 'pkg-amboseli-adventure',
    slug: 'amboseli-adventure-3day',
    name: 'AMBOSELI ADVENTURE',
    tagline: 'Land of Giant African Super-Tuskers in the Shadow of Kilimanjaro',
    destination: 'Amboseli',
    region: 'Southern Rift / Kajiado',
    durationDays: 3,
    durationNights: 2,
    basePriceKES: 70000,
    basePriceUSD: 535,
    supplierBaseCostKES: 52000,
    featuredImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Kilimanjaro Views',
    category: 'Wildlife & Safari',
    overview: 'Nowhere else in Africa can you photograph massive herds of wild elephants with the snow-capped peak of Mount Kilimanjaro soaring into the azure sky. Amboseli National Park offers legendary close encounters with big tuskers, vast papyrus swamps alive with hippos and pelicans, and panoramic views from Observation Hill.',
    minTravellers: 1,
    maxTravellers: 10,
    rating: 4.92,
    reviewsCount: 118,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip 4x4 safari transportation from Nairobi with pop-up roof',
      '2 Nights accommodation in Amboseli Safari Lodge with all meals (Full Board)',
      'Extensive morning and evening game drives across Enkongo Narok swamps',
      'Amboseli National Park KWS entrance permits',
      'Climb to Observation Hill lookout with binoculars',
      'All government taxes and emergency air evacuation insurance'
    ],
    excludedServices: [
      'Tips for driver-guide and hotel staff',
      'Alcoholic drinks at lodge'
    ],
    cancellationPolicy: '100% full refund up to 72 hours before trip starts.',
    importantInfo: [
      'Best Mount Kilimanjaro views occur between 06:00 AM and 09:30 AM before clouds gather.',
      'High ground clearance 4x4 is essential during seasonal rains around the lake bed.'
    ],
    availableDates: [
      '2026-09-11', '2026-09-16', '2026-09-20', '2026-09-24', '2026-09-28',
      '2026-10-02', '2026-10-07', '2026-10-12', '2026-10-17'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Amboseli National Park',
        highlight: 'First sighting of Mount Kilimanjaro and elephant herds',
        schedule: [
          { time: '07:00 AM', activity: 'Pickup from Nairobi and drive south via Namanga Highway', location: 'Nairobi' },
          { time: '12:30 PM', activity: 'Arrive at Amboseli lodge in time for lunch and views of Kili', location: 'Amboseli Lodge' },
          { time: '03:45 PM', activity: 'Afternoon game drive tracking tuskers in the acacia forests', location: 'Amboseli Swamps' },
          { time: '07:30 PM', activity: 'Safari dinner overlooking illuminated watering hole', location: 'Lodge Dining' }
        ],
        mealsIncluded: 'Lunch, Dinner',
        accommodationName: 'Amboseli Safari Lodge'
      },
      {
        day: 2,
        title: 'Full Day Amboseli Wildlife & Observation Hill',
        highlight: 'Mud-wallowing elephants, hippos and 360° summit views',
        schedule: [
          { time: '06:15 AM', activity: 'Dawn game drive while Kilimanjaro is clear of clouds', location: 'Amboseli Plains' },
          { time: '09:00 AM', activity: 'Observation Hill hike for birds-eye view of elephant herds in swamps', location: 'Observation Hill' },
          { time: '01:00 PM', activity: 'Lunch and pool relaxation at lodge', location: 'Lodge' },
          { time: '03:30 PM', activity: 'Sunset drive searching for cheetahs, lions and serval cats', location: 'Amboseli Swamps' },
          { time: '07:30 PM', activity: 'Bush campfire dinner with Maasai songs', location: 'Lodge' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Amboseli Safari Lodge'
      },
      {
        day: 3,
        title: 'Morning Game Drive & Return to Nairobi',
        highlight: 'Farewell sunrise drive and scenic trip back to capital',
        schedule: [
          { time: '06:30 AM', activity: 'Short sunrise game drive', location: 'Amboseli' },
          { time: '09:00 AM', activity: 'Breakfast and departure to Nairobi', location: 'Highway' },
          { time: '02:30 PM', activity: 'Drop-off at JKIA or Nairobi hotel', location: 'Nairobi' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure'
      }
    ],
    vehicles: [
      {
        id: 'veh-amboseli-van',
        name: 'Safari Tour Van 4x4 with Pop-up Roof',
        category: 'Safari Van',
        passengerCapacity: 7,
        luggageCapacity: 7,
        features: ['Pop-up Roof', 'Window View', 'Radio Comm', 'Charging Ports'],
        image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 20000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-amboseli-cruiser',
        name: 'Heavy Duty 4x4 Safari Land Cruiser',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Superior Offroad Capability', 'Cooler Fridge', 'Panoramic Pop-up Hatch'],
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e91f?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 16000,
        supplierCostKES: 30000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-amboseli-standard',
        name: 'Amboseli Serena Safari Lodge / Kibo Safari Camp',
        type: 'Standard Lodge',
        rating: 4.7,
        reviewsCount: 84,
        location: 'Amboseli National Park Center',
        roomType: 'Maasai Inspired Cottage',
        mealPlan: 'Full Board',
        amenities: ['View of Kilimanjaro', 'Swimming Pool', 'Watering Hole Hide', 'Free Wi-Fi'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 24000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-amboseli-premium',
        name: 'Ol Tukai Lodge Amboseli (Ultra-Luxury)',
        type: 'Luxury Resort',
        rating: 4.95,
        reviewsCount: 140,
        location: 'Inside Prime Amboseli Wetlands',
        roomType: 'Twin Timber Chalet with Kili Verandah',
        mealPlan: 'Full Board Gourmet Dining',
        amenities: ['Front Row Kilimanjaro Panoramic Deck', 'Elephant Watering Pool at 30 meters', 'Curated Art Collection'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 18000,
        supplierCostKES: 38000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-amboseli-local',
        name: 'Professional Amboseli Specialist Guide',
        type: 'Shared Professional Guide',
        languages: ['English', 'Kiswahili', 'Maa'],
        experienceYears: 10,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 6000,
        isDefault: true,
        rating: 4.88,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-amboseli-drives',
        name: 'Comprehensive Swamp & Lake Game Drives',
        category: 'Wildlife',
        description: 'Morning and afternoon tracking of iconic big tuskers.',
        duration: 'Multiple Drives',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 4000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-amboseli-maasai',
        name: 'Cultural Maasai Manyatta Immersion',
        category: 'Culture',
        description: 'Authentic village encounter with Maasai families.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
        priceKES: 3000,
        supplierCostKES: 2000,
        includedInBase: false,
        available: true
      }
    ]
  },
  {
    id: 'pkg-nairobi-experience',
    slug: 'nairobi-experience-2day',
    name: 'NAIROBI EXPERIENCE',
    tagline: 'Urban Wildlife Capital: Rhino Sanctuaries, Baby Elephants & Giraffes',
    destination: 'Nairobi',
    region: 'Nairobi Capital',
    durationDays: 2,
    durationNights: 1,
    basePriceKES: 30000,
    basePriceUSD: 230,
    supplierBaseCostKES: 22000,
    featuredImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Short Getaway',
    category: 'Urban & Culture',
    overview: 'Nairobi is the only capital city on planet Earth with a wild national park in its backyard. This action-packed 2-day experience features sunrise lions with skyscrapers on the horizon, feeding endangered Rothschild giraffes by hand at Giraffe Centre, visiting the orphaned baby elephants at Sheldrick Wildlife Trust, and an evening meat-lovers feast at the world-famous Carnivore Restaurant.',
    minTravellers: 1,
    maxTravellers: 8,
    rating: 4.89,
    reviewsCount: 94,
    featured: false,
    status: 'active',
    includedServices: [
      'Private air-conditioned chauffeur vehicle and guide at disposal for 2 full days',
      '1 Night boutique hotel accommodation in Nairobi with breakfast included',
      'Nairobi National Park morning game drive (rhinos, lions, buffalos, giraffes)',
      'Pre-booked entry to Sheldrick Elephant Orphanage public feeding hour (11 AM)',
      'Giraffe Centre entrance and hand-feeding pellets',
      'VIP table reservation and full dinner at Carnivore Restaurant Nairobi',
      'All government entrance fees and bottled spring water'
    ],
    excludedServices: [
      'Personal bar expenses',
      'Tips for chauffeur'
    ],
    cancellationPolicy: '100% full refund up to 48 hours prior to arrival.',
    importantInfo: [
      'Sheldrick Elephant Orphanage strictly limits visitors to 11:00 AM - 12:00 PM; pre-booking is guaranteed with this package.'
    ],
    availableDates: [
      '2026-09-08', '2026-09-10', '2026-09-12', '2026-09-14', '2026-09-16', '2026-09-18', '2026-09-20',
      '2026-09-22', '2026-09-24', '2026-09-26', '2026-09-28', '2026-09-30'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi National Park Safari & Baby Elephants',
        highlight: 'Wild black rhinos against city skyline & Sheldrick nursery',
        schedule: [
          { time: '06:00 AM', activity: 'Early morning game drive in Nairobi National Park tracking lions and rhinos', location: 'Nairobi National Park' },
          { time: '10:30 AM', activity: 'Transfer to Sheldrick Wildlife Trust to watch orphaned baby elephants bottle-feed', location: 'Sheldrick Trust' },
          { time: '01:00 PM', activity: 'Lunch at Karen Blixen Coffee Garden', location: 'Karen' },
          { time: '02:30 PM', activity: 'Hand-feed Rothschild giraffes at Giraffe Centre from raised wooden platform', location: 'Giraffe Centre' },
          { time: '07:00 PM', activity: 'Legendary all-you-can-eat Nyama Choma feast at Carnivore Restaurant', location: 'Carnivore Nairobi' }
        ],
        mealsIncluded: 'Dinner',
        accommodationName: 'Nairobi Boutique Hotel'
      },
      {
        day: 2,
        title: 'Bomas of Kenya Cultural Show & City Departure',
        highlight: 'Traditional tribal homesteads, acrobatic dances & artisan markets',
        schedule: [
          { time: '08:30 AM', activity: 'Hotel breakfast and checkout', location: 'Hotel' },
          { time: '10:00 AM', activity: 'Visit Kazuri Beads women pottery cooperative and Maasai Market for curios', location: 'Karen / City' },
          { time: '02:00 PM', activity: 'Bomas of Kenya live traditional music and acrobatics performance', location: 'Bomas of Kenya' },
          { time: '05:00 PM', activity: 'Airport drop-off at JKIA for departing flight', location: 'JKIA Airport' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure'
      }
    ],
    vehicles: [
      {
        id: 'veh-nairobi-sedan',
        name: 'Comfort Air-Conditioned Sedan / Minivan',
        category: 'Standard',
        passengerCapacity: 4,
        luggageCapacity: 3,
        features: ['Air Conditioning', 'Clean Modern Interior', 'Wi-Fi Hotspot', 'City Driver'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 7000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-nairobi-cruiser',
        name: 'Custom Safari 4x4 Land Cruiser with Pop-up Roof',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Pop-up Roof for Nairobi Park Game Drive', 'High Ground Clearance', 'Charging Sockets'],
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e91f?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 10000,
        supplierCostKES: 14000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-nairobi-standard',
        name: 'Boutique Hotel (Tamarind Tree Hotel / Wildebeest Eco Camp)',
        type: 'Standard Lodge',
        rating: 4.6,
        reviewsCount: 75,
        location: 'Lang’ata / Karen, Nairobi',
        roomType: 'Deluxe Room with Breakfast',
        mealPlan: 'Bed & Breakfast',
        amenities: ['Swimming Pool', 'Lush Tropical Gardens', 'Free Wi-Fi', 'Close to Attractions'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 10000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-nairobi-luxury',
        name: '5-Star Luxury (Villa Rosa Kempinski Nairobi / Hemingways)',
        type: 'Luxury Resort',
        rating: 4.95,
        reviewsCount: 160,
        location: 'Westlands / Karen',
        roomType: 'Superior Executive Suite with Butler Service',
        mealPlan: 'Bed & Breakfast with Spa Access',
        amenities: ['Heated Rooftop Pool', 'Luxury Spa', 'Fine Dining Restaurants', 'Private Limousine Transfer'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 18000,
        supplierCostKES: 26000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-nairobi-guide',
        name: 'Nairobi City & Wildlife Professional Chauffeur-Guide',
        type: 'Dedicated Private Guide',
        languages: ['English', 'Kiswahili'],
        experienceYears: 9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 4000,
        isDefault: true,
        rating: 4.9,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-nairobi-park',
        name: 'Nairobi National Park Sunrise Game Drive',
        category: 'Wildlife',
        description: 'Morning drive for lions, leopards and endangered black rhinos.',
        duration: '4 Hours',
        image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 4500,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-nairobi-elephants',
        name: 'Sheldrick Elephant Orphanage Visit',
        category: 'Wildlife',
        description: 'Witness orphaned infant elephants drinking giant milk bottles and playing in red mud.',
        duration: '1.5 Hours',
        image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 2000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-nairobi-giraffes',
        name: 'Giraffe Centre Hand-Feeding Encounter',
        category: 'Wildlife',
        description: 'Stand on a raised platform and hand-feed endangered Rothschild giraffes.',
        duration: '1 Hour',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 1500,
        includedInBase: true,
        available: true
      }
    ]
  },
  {
    id: 'pkg-tsavo-safari',
    slug: 'tsavo-safari-3day',
    name: 'TSAVO SAFARI',
    tagline: 'Kenya’s Vast Wild Frontier: Dust-Red Elephants & Mzima Springs',
    destination: 'Tsavo',
    region: 'Coast / Taita Taveta',
    durationDays: 3,
    durationNights: 2,
    basePriceKES: 80000,
    basePriceUSD: 615,
    supplierBaseCostKES: 61000,
    featuredImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Vast Wilderness',
    category: 'Wildlife & Safari',
    overview: 'Spanning nearly 22,000 square kilometers, Tsavo East and West form one of the largest national parks in the entire world. Famed for its legendary "Man-eater" lions of 1898, herds of dust-red elephants rolling in volcanic red soils, the Yatta plateau lava flow, and the crystal-clear waters of Mzima Springs where underwater glass chambers reveal submerged hippos.',
    minTravellers: 1,
    maxTravellers: 10,
    rating: 4.9,
    reviewsCount: 88,
    featured: false,
    status: 'active',
    includedServices: [
      'Round-trip 4x4 safari transportation from Mombasa, Diani, or Nairobi',
      '2 Nights accommodation in Kilaguni Serena Lodge or Ashnil Aruba with full board',
      'Extensive game drives through Tsavo East & Tsavo West sectors',
      'Guided walk at Mzima Springs with KWS armed ranger',
      'Visit to Shetani lava flows and volcanic caves',
      'All national park conservation permits and taxes'
    ],
    excludedServices: [
      'Personal beverages and lodge souvenirs',
      'Driver-guide tips'
    ],
    cancellationPolicy: '100% full refund up to 72 hours before trip starts.',
    importantInfo: [
      'Mzima Springs offers an underwater glass observation hide to view hippos and fish.',
      'Tsavo is easily accessed via the Madaraka Express SGR train at Voi or Mtito Andei stations.'
    ],
    availableDates: [
      '2026-09-12', '2026-09-17', '2026-09-22', '2026-09-27',
      '2026-10-02', '2026-10-08', '2026-10-14', '2026-10-20'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Enter Tsavo East & Red Elephant Tracking',
        highlight: 'Aruba Dam and mud-red elephants',
        schedule: [
          { time: '07:30 AM', activity: 'Pickup and drive to Tsavo East Bachuma Gate', location: 'Tsavo East' },
          { time: '11:00 AM', activity: 'First game drive en route to Aruba Dam viewing red elephants', location: 'Tsavo East' },
          { time: '01:00 PM', activity: 'Lodge check-in and lunch buffet', location: 'Lodge' },
          { time: '04:00 PM', activity: 'Afternoon game drive along Galana River and Lugard Falls', location: 'Galana River' },
          { time: '07:30 PM', activity: 'Dinner overlooking illuminated waterhole', location: 'Lodge' }
        ],
        mealsIncluded: 'Lunch, Dinner',
        accommodationName: 'Tsavo Safari Lodge'
      },
      {
        day: 2,
        title: 'Tsavo West Volcanic Wonders & Mzima Springs',
        highlight: 'Underwater hippo viewing chamber & Shetani lava flows',
        schedule: [
          { time: '06:30 AM', activity: 'Morning drive transferring from Tsavo East to Tsavo West', location: 'Tsavo West' },
          { time: '10:00 AM', activity: 'Guided walk with ranger at Mzima Springs underwater observatory', location: 'Mzima Springs' },
          { time: '01:00 PM', activity: 'Lunch at Kilaguni Serena overlooking Mount Kilimanjaro', location: 'Kilaguni' },
          { time: '04:00 PM', activity: 'Explore Shetani Black Lava Flow and Poacher’s Lookout', location: 'Shetani Flows' },
          { time: '07:30 PM', activity: 'Safari banquet dinner', location: 'Lodge' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Tsavo Safari Lodge'
      },
      {
        day: 3,
        title: 'Morning Game Drive & Drop-off',
        highlight: 'Final sunrise drive and transfer to SGR or coast',
        schedule: [
          { time: '06:30 AM', activity: 'Sunrise game drive searching for leopards and giraffes', location: 'Tsavo West' },
          { time: '09:00 AM', activity: 'Breakfast and departure', location: 'Highway' },
          { time: '02:00 PM', activity: 'Drop-off at Mombasa, Diani, or SGR train terminal', location: 'Drop-off' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure'
      }
    ],
    vehicles: [
      {
        id: 'veh-tsavo-van',
        name: 'Safari Tour Van 4x4 with Pop-up Roof',
        category: 'Safari Van',
        passengerCapacity: 7,
        luggageCapacity: 7,
        features: ['Pop-up Roof', 'Window View', 'Radio Comm', 'Charging Ports'],
        image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 22000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-tsavo-cruiser',
        name: 'Custom 4x4 Safari Land Cruiser Extended',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Heavy Duty Suspension', 'Panoramic Pop-up Roof', 'Fridge Onboard'],
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e91f?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 18000,
        supplierCostKES: 32000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-tsavo-standard',
        name: 'Ashnil Aruba Lodge (Tsavo East)',
        type: 'Standard Lodge',
        rating: 4.7,
        reviewsCount: 78,
        location: 'Tsavo East National Park',
        roomType: 'Deluxe Savanna Chalet',
        mealPlan: 'Full Board',
        amenities: ['Overlooking Aruba Dam', 'Swimming Pool', 'Free Wi-Fi', 'Lounge Bar'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 25000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-tsavo-luxury',
        name: 'Kilaguni Serena Safari Lodge (Tsavo West)',
        type: 'Luxury Resort',
        rating: 4.95,
        reviewsCount: 135,
        location: 'Tsavo West National Park',
        roomType: 'Waterhole-Facing Deluxe Suite',
        mealPlan: 'Full Board with Bush Breakfast',
        amenities: ['Premier Waterhole View from every room', 'Kilimanjaro Panoramic Sundowner', 'Pool with Sun Loungers'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 19000,
        supplierCostKES: 39000,
        available: true
      }
    ],
    guides: [
      {
        id: 'gd-tsavo-local',
        name: 'Experienced Tsavo Wildlife Tracker',
        type: 'Shared Professional Guide',
        languages: ['English', 'Kiswahili'],
        experienceYears: 12,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 6500,
        isDefault: true,
        rating: 4.9,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-tsavo-drives',
        name: 'Extensive Tsavo East & West Game Drives',
        category: 'Wildlife',
        description: 'Tracking red elephants, lions, leopards and oryx.',
        duration: 'Multiple Drives',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 4500,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-tsavo-mzima',
        name: 'Mzima Springs Underwater Observation Walk',
        category: 'Wildlife',
        description: 'Ranger-guided walk along crystal clear streams and underwater glass viewing tank.',
        duration: '2 Hours',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 2500,
        includedInBase: true,
        available: true
      }
    ]
  },
  {
    id: 'pkg-lamu-cultural-escape',
    slug: 'lamu-cultural-escape-4day',
    name: 'LAMU CULTURAL ESCAPE',
    tagline: 'Timeless UNESCO Swahili Archipelago, Sunset Dhow Sailing & Shela Sands',
    destination: 'Lamu',
    region: 'Coast / Indian Ocean',
    durationDays: 4,
    durationNights: 3,
    basePriceKES: 65000,
    basePriceUSD: 500,
    supplierBaseCostKES: 48000,
    featuredImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'UNESCO Heritage',
    category: 'Beach & Coastal',
    overview: 'Step back into the 14th century in Lamu Old Town, the oldest and best-preserved Swahili settlement in East Africa. With no motorized cars on the island, travel by traditional wooden dhow or on foot through labyrinthine coral-stone alleyways. Relax on the endless golden sands of Shela Beach, cruise along mangrove channels at sunset, and savor fragrant Swahili coconut curries and fresh grilled Indian Ocean lobster.',
    minTravellers: 1,
    maxTravellers: 8,
    rating: 4.96,
    reviewsCount: 76,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip airport boat transfers from Manda Airport (MKU) to your Lamu/Shela residence',
      '3 Nights accommodation in a restored Swahili coastal hotel with daily breakfast',
      'Private sunset dhow sailing excursion with Swahili spiced tea & bitings',
      'Guided historical architectural walk of UNESCO Lamu Old Town & Lamu Fort',
      'Half-day dhow expedition to the ancient 9th-century Takwa ruins on Manda Island',
      'Traditional Swahili seafood dinner under palm trees',
      'All local marine conservation fees and 24/7 dedicated local island host'
    ],
    excludedServices: [
      'Domestic flights to Manda Airport Lamu (can be added upon request)',
      'Alcoholic drinks & personal bar tabs',
      'Lamu Donkey sanctuary voluntary donation',
      'Tips for dhow crew and local guide'
    ],
    cancellationPolicy: '100% full refund up to 72 hours prior to scheduled arrival. Date modifications permitted free of charge subject to hotel room availability.',
    importantInfo: [
      'Dress modestly when walking through Lamu Old Town out of cultural respect for local Swahili Muslim traditions (shoulders and knees covered).',
      'Shela Beach is safe for casual beachwear and swimming.',
      'Flights operate daily from Wilson Airport (Nairobi) directly to Manda Airport Lamu.'
    ],
    availableDates: [
      '2026-09-10', '2026-09-14', '2026-09-18', '2026-09-22', '2026-09-26', '2026-09-30',
      '2026-10-04', '2026-10-08', '2026-10-12', '2026-10-16', '2026-10-20', '2026-10-24'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Manda Island Arrival & Sunset Dhow Sailing',
        highlight: 'Arrive at Manda Airport, wooden boat transfer to Shela village, sunset sailing',
        schedule: [
          { time: '11:00 AM', activity: 'Arrival at Manda Airport (MKU); met by private island host', location: 'Manda Airport', transport: 'Private Boat' },
          { time: '11:45 AM', activity: 'Scenic speed boat transfer across the channel to Shela Beach', location: 'Shela Village' },
          { time: '12:30 PM', activity: 'Check-in to your Swahili boutique lodge; welcome fresh coconut madafu drink', location: 'Shela' },
          { time: '04:30 PM', activity: 'Board a handcrafted wooden Swahili dhow for a sunset sail around Ras Kitau point', location: 'Indian Ocean', notes: 'Fresh samosas and spiced tea served on board' },
          { time: '07:30 PM', activity: 'Welcome Swahili dinner overlooking the moonlit ocean', location: 'Peponi Restaurant' }
        ],
        mealsIncluded: 'Dinner',
        accommodationName: 'Shela Heritage Lodge'
      },
      {
        day: 2,
        title: 'Lamu Old Town UNESCO Walk & Fort History',
        highlight: 'Carved wooden doors, Donkey Sanctuary, Lamu Museum and bustling alleyways',
        schedule: [
          { time: '08:00 AM', activity: 'Swahili breakfast with tropical fruits and mahamri', location: 'Lodge' },
          { time: '09:30 AM', activity: 'Boat transfer to Lamu Old Town; meet your Swahili elder historian guide', location: 'Lamu Town Jetty' },
          { time: '10:00 AM', activity: 'Guided walking tour through narrow coral-stone streets and ornate carved doors', location: 'Lamu Old Town' },
          { time: '12:30 PM', activity: 'Lunch at Whispers Garden Cafe enjoying spiced tamarind juice and fish biryani', location: 'Lamu' },
          { time: '03:00 PM', activity: 'Visit the Lamu Museum, German Post Office & Donkey Sanctuary', location: 'Lamu Waterfront' },
          { time: '05:30 PM', activity: 'Return boat to Shela; evening stroll along the 12km white sand dune beach', location: 'Shela Sands' }
        ],
        mealsIncluded: 'Breakfast, Lunch',
        accommodationName: 'Shela Heritage Lodge'
      },
      {
        day: 3,
        title: 'Takwa Ruins Expedition & Snorkeling at Manda Toto',
        highlight: 'Explore 16th-century ruins and snorkel over vibrant coral reefs',
        schedule: [
          { time: '08:30 AM', activity: 'Breakfast on the terrace', location: 'Lodge' },
          { time: '09:30 AM', activity: 'Dhow cruise through mangrove creeks to Takwa settlement ruins', location: 'Manda Island' },
          { time: '11:30 AM', activity: 'Snorkeling over untouched reefs near Manda Toto island', location: 'Manda Toto', notes: 'Snorkel gear provided' },
          { time: '01:00 PM', activity: 'Seafood beach barbecue prepared over open coals by the boat crew', location: 'Deserted Beach' },
          { time: '04:00 PM', activity: 'Sail back with the afternoon trade winds', location: 'Shela' },
          { time: '08:00 PM', activity: 'Farewell coastal dinner under the stars', location: 'Lodge Dining' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Shela Heritage Lodge'
      },
      {
        day: 4,
        title: 'Morning Beach Walk & Departure',
        highlight: 'Sunrise over the Indian Ocean & departure via Manda',
        schedule: [
          { time: '07:30 AM', activity: 'Sunrise swim in the calm tropical ocean', location: 'Shela Beach' },
          { time: '09:00 AM', activity: 'Farewell breakfast and souvenir shopping for Lamu kikoys & silver jewelry', location: 'Shela Village' },
          { time: '11:00 AM', activity: 'Boat transfer across channel to Manda Airport for your flight to Nairobi', location: 'Manda Airport', transport: 'Private Boat' }
        ],
        mealsIncluded: 'Breakfast',
        accommodationName: 'Departure Day'
      }
    ],
    vehicles: [
      {
        id: 'veh-lamu-dhow',
        name: 'Traditional Handcrafted Dhow + Island Transfers',
        category: 'Standard',
        passengerCapacity: 8,
        luggageCapacity: 8,
        features: ['Wooden Sail Dhow', 'Twin Outboard Engine', 'Life Jackets', 'Cushioned Seating'],
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 14000,
        isDefault: true,
        available: true
      },
      {
        id: 'veh-lamu-speedboat',
        name: 'Private Twin-Engine Speedboat (VIP Transfers)',
        category: 'Luxury 4x4',
        passengerCapacity: 6,
        luggageCapacity: 6,
        features: ['Twin Yamaha 115HP', 'Sun Canopy', 'High Speed Navigation', 'Chilled Refreshments'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 12000,
        supplierCostKES: 22000,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-lamu-heritage',
        name: 'Shela Heritage & Dune House',
        type: 'Standard Lodge',
        rating: 4.88,
        reviewsCount: 42,
        location: 'Shela Village, Lamu',
        roomType: 'Swahili Garden Room',
        mealPlan: 'Bed & Breakfast (B&B)',
        amenities: ['Ocean Breeze Balcony', 'Mosquito Netting', 'Ceiling Fan', 'Free Wi-Fi', 'Tropical Courtyard'],
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 22000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-lamu-peponi',
        name: 'Peponi Hotel Shela',
        type: 'Premium Lodge',
        rating: 4.96,
        reviewsCount: 88,
        location: 'Shela Waterfront, Lamu',
        roomType: 'Deluxe Oceanfront Suite',
        mealPlan: 'Half Board (Breakfast & Dinner)',
        amenities: ['Direct Beach Access', 'Air Conditioning', 'Infinity Pool', 'World-Class Restaurant', 'Private Veranda'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 28000,
        supplierCostKES: 45000,
        available: true
      }
    ],
    guides: [
      {
        id: 'guide-lamu-local',
        name: 'Captain Ali Skanda & Mwalimu Said',
        type: 'Dedicated Private Guide',
        languages: ['English', 'Kiswahili', 'Arabic'],
        experienceYears: 16,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 6000,
        isDefault: true,
        rating: 4.98,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-lamu-dhow-sunset',
        name: 'Sunset Dhow Cruise with Swahili Tea',
        category: 'Water',
        description: 'Glide quietly through the calm coastal channels as the sun sets over Lamu island.',
        duration: '2.5 Hours',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 3500,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-lamu-unesco-walk',
        name: 'UNESCO Lamu Old Town Guided Walk',
        category: 'Culture',
        description: 'Explore ancient coral alleys, historic mosques, and master woodcarvers.',
        duration: '3 Hours',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 2500,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-lamu-takwa-ruins',
        name: 'Takwa Ruins & Snorkeling Expedition',
        category: 'Adventure',
        description: 'Sail to Manda Island ruins and snorkel in crystal waters teeming with tropical fish.',
        duration: '4 Hours',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        priceKES: 4500,
        supplierCostKES: 3000,
        includedInBase: false,
        available: true
      }
    ]
  },
  {
    id: 'pkg-mount-kenya-adventure',
    slug: 'mount-kenya-adventure-4day',
    name: 'MOUNT KENYA ADVENTURE',
    tagline: 'Africa’s Second Highest Peak: Alpine Moorlands, Giant Lobelias & High Tarns',
    destination: 'Mount Kenya',
    region: 'Central Highlands',
    durationDays: 4,
    durationNights: 3,
    basePriceKES: 58000,
    basePriceUSD: 445,
    supplierBaseCostKES: 43000,
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Alpine Expedition',
    category: 'Lake & Adventure',
    overview: 'Climb through dramatic ecological zones from dense bamboo forests and giant heather moorlands to high glacial valleys on the legendary Mount Kenya Sirimon route. Experience stunning vistas of jagged peaks Nelion and Batian, pristine alpine tarns, unique afro-alpine flora like giant groundsels and lobelias, and cozy nights in mountain chalets with roaring log fires.',
    minTravellers: 1,
    maxTravellers: 12,
    rating: 4.92,
    reviewsCount: 64,
    featured: true,
    status: 'active',
    includedServices: [
      'Round-trip 4x4 transport from Nairobi to Mount Kenya National Park gates and return',
      '3 Nights accommodation in mountain chalets & lodges with full board meals',
      'KWS licensed alpine mountain guide, professional cook, and luggage porters',
      'All Mount Kenya National Park entry fees, camping fees & rescue insurance',
      'High-altitude purified drinking water & hot herbal teas',
      'Trout fishing permit and rod rental at mountain tarns'
    ],
    excludedServices: [
      'Personal trekking gear (hiking boots, warm sleeping bag, down jacket)',
      'Alpine technical climbing gear for Batian rock summit (optional technical add-on)',
      'Tips for guide, cook and porters'
    ],
    cancellationPolicy: '100% full refund up to 72 hours prior to trek start. Free rescheduling for weather or flight changes.',
    importantInfo: [
      'High elevation trek (up to 4,200m). Acclimatization walks are paced gently ("pole pole").',
      'Thermal base layers, waterproof rain jacket, and sturdy worn-in hiking boots are essential.',
      'Daily temperatures range from 15°C at midday down to -2°C at high altitude camps overnight.'
    ],
    availableDates: [
      '2026-09-09', '2026-09-13', '2026-09-17', '2026-09-21', '2026-09-25', '2026-09-29',
      '2026-10-03', '2026-10-07', '2026-10-11', '2026-10-15', '2026-10-19', '2026-10-23'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Mount Kenya & Sirimon Gate Trek',
        highlight: 'Drive across equator to Sirimon Gate (2,650m) and hike to Judmaier Camp (3,300m)',
        schedule: [
          { time: '07:00 AM', activity: 'Pickup from Nairobi hotel and drive through scenic coffee and pineapple plantations', location: 'Nairobi', transport: 'Safari 4x4' },
          { time: '11:00 AM', activity: 'Equator crossing photo marker and park formalities at Sirimon Gate', location: 'Sirimon Gate' },
          { time: '12:30 PM', activity: 'Picnic lunch followed by gentle 3-hour trek through dense montane forest', location: 'Sirimon Track' },
          { time: '04:30 PM', activity: 'Arrive at Old Moses Camp (Judmaier 3,300m); hot mountain tea', location: 'Old Moses Camp' },
          { time: '07:00 PM', activity: 'Warm hearty 3-course dinner prepared by mountain cook', location: 'Camp Dining' }
        ],
        mealsIncluded: 'Lunch, Dinner',
        accommodationName: 'Old Moses Mountain Chalet'
      },
      {
        day: 2,
        title: 'Mackinder’s Valley & Shipton’s Camp (4,200m)',
        highlight: 'Cross Ontulili & Liki North streams into the dramatic Moorland valley',
        schedule: [
          { time: '07:00 AM', activity: 'Hearty breakfast with hot porridge and eggs', location: 'Old Moses' },
          { time: '08:00 AM', activity: 'Ascend through Mackinder’s Valley dotted with giant Senecio trees', location: 'Mackinder Valley' },
          { time: '01:00 PM', activity: 'Rest and hot lunch near Likii North river', location: 'Valley' },
          { time: '03:30 PM', activity: 'Reach Shipton’s Camp (4,200m) directly beneath the towering twin peaks', location: 'Shipton Camp' },
          { time: '06:30 PM', activity: 'Dinner in the heated common room with panoramic views of snow-dusted ridges', location: 'Shipton Dining' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Shipton’s High Mountain Camp'
      },
      {
        day: 3,
        title: 'Alpine Tarns Exploration & Kami Camp Views',
        highlight: 'Explore high alpine turquoise tarns and spectacular sunrise views',
        schedule: [
          { time: '06:00 AM', activity: 'Golden hour sunrise illumination of Batian and Nelion peaks', location: 'Shipton Viewpoint' },
          { time: '08:00 AM', activity: 'Alpine breakfast with hot cocoa', location: 'Shipton Camp' },
          { time: '09:30 AM', activity: 'Acclimatization trek to Hausberg Col and emerald mountain tarns', location: 'Alpine Tarns' },
          { time: '01:00 PM', activity: 'Lunch at high camp', location: 'Shipton' },
          { time: '03:00 PM', activity: 'Gentle scenic descent to Old Moses Camp for lower altitude comfort', location: 'Old Moses Track' },
          { time: '07:00 PM', activity: 'Celebration dinner with team porters & guides', location: 'Old Moses' }
        ],
        mealsIncluded: 'Breakfast, Lunch, Dinner',
        accommodationName: 'Old Moses Mountain Chalet'
      },
      {
        day: 4,
        title: 'Sirimon Gate Descent & Serena Mountain Lodge Lunch',
        highlight: 'Descent through bamboo zone & gourmet lunch at Serena Mountain Lodge',
        schedule: [
          { time: '07:30 AM', activity: 'Final mountain breakfast', location: 'Camp' },
          { time: '08:30 AM', activity: 'Gentle 2-hour descent to Sirimon Gate', location: 'Sirimon Gate' },
          { time: '11:00 AM', activity: 'Meet 4x4 vehicle; transfer to Serena Mountain Lodge for celebration lunch', location: 'Serena Mountain Lodge' },
          { time: '02:00 PM', activity: 'Scenic drive back to Nairobi; drop-off at your hotel or JKIA airport', location: 'Nairobi', transport: 'Safari 4x4' }
        ],
        mealsIncluded: 'Breakfast, Lunch',
        accommodationName: 'Departure Day'
      }
    ],
    vehicles: [
      {
        id: 'veh-mtkenya-cruiser',
        name: 'Overland 4x4 Mountain Cruiser',
        category: 'Mid-Tier 4x4',
        passengerCapacity: 6,
        luggageCapacity: 8,
        features: ['High Clearance 4WD', 'Diff Lock', 'Roof Luggage Rack', 'Heated Cabin'],
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 16000,
        isDefault: true,
        available: true
      }
    ],
    accommodations: [
      {
        id: 'acc-mtkenya-chalet',
        name: 'Mount Kenya National Park High Chalets',
        type: 'Standard Lodge',
        rating: 4.84,
        reviewsCount: 38,
        location: 'Mount Kenya National Park',
        roomType: 'Heated Bunkroom & Alpine Chalet',
        mealPlan: 'Full Board (All mountain meals)',
        amenities: ['Fireplace Dining Hall', 'Purified Mountain Water', 'Bunk Beds with Mattresses', 'Hot Showers at Base Gate'],
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 18000,
        isDefault: true,
        available: true
      },
      {
        id: 'acc-mtkenya-serena',
        name: 'Serena Mountain Lodge (Tree Hotel)',
        type: 'Premium Lodge',
        rating: 4.94,
        reviewsCount: 62,
        location: 'Mount Kenya Forest Reserve',
        roomType: 'Luxury Forest View Room',
        mealPlan: 'Full Board & Game Viewing Deck',
        amenities: ['Floodlit Waterhole View', 'Balcony Overlooking Wildlife Salt Lick', 'Wood Fireplace', 'Fine Dining'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        priceDifferenceKES: 24000,
        supplierCostKES: 38000,
        available: true
      }
    ],
    guides: [
      {
        id: 'guide-mtkenya-kws',
        name: 'Maina Kariuki (KWS Senior Alpine Guide)',
        type: 'Specialist Wildlife & Photography Naturalist',
        languages: ['English', 'Kiswahili', 'French'],
        experienceYears: 18,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        priceDifferenceKES: 0,
        supplierCostKES: 7000,
        isDefault: true,
        rating: 4.97,
        available: true
      }
    ],
    activities: [
      {
        id: 'act-mtkenya-hike',
        name: 'Mackinder Valley & High Moorland Trek',
        category: 'Adventure',
        description: 'Guided trek through high alpine valleys beneath Batian and Nelion peaks.',
        duration: 'Full Day',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
        priceKES: 0,
        supplierCostKES: 3000,
        includedInBase: true,
        available: true
      },
      {
        id: 'act-mtkenya-trout',
        name: 'Alpine River Trout Fishing',
        category: 'Relaxation',
        description: 'Cast for rainbow and brown trout in crystal glacier-fed mountain streams.',
        duration: '3 Hours',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        priceKES: 3500,
        supplierCostKES: 2000,
        includedInBase: false,
        available: true
      }
    ]
  }
];

export const INITIAL_SUPPLIERS: TravelSupplier[] = [
  {
    id: 'sup-hotel-sopa',
    businessName: 'Lake Naivasha Sopa Resort',
    category: 'Hotel',
    contactPerson: 'Mary Wanjiku (Reservations Manager)',
    email: 'reservations@sopalodges.co.ke',
    phone: '+254 722 206 328',
    location: 'Moi South Lake Rd, Naivasha',
    services: ['Luxury Lodging', 'Buffet Catering', 'Bush Dinners', 'Conferencing'],
    pricingDescription: 'Contracted wholesale rate KES 15,000 - 20,000 per room FB',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 14
  },
  {
    id: 'sup-hotel-enashipai',
    businessName: 'Enashipai Resort & Spa',
    category: 'Hotel',
    contactPerson: 'David Kilonzo (Corporate Sales)',
    email: 'sales@enashipai.com',
    phone: '+254 51 213 0000',
    location: 'Naivasha, Kenya',
    services: ['Executive Suites', 'Siyara Wellness Spa', 'Private Boat Launch'],
    pricingDescription: 'Wholesale B2B rate KES 25,000 - 32,000 per night',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 8
  },
  {
    id: 'sup-hotel-sarova-mara',
    businessName: 'Sarova Mara Game Camp',
    category: 'Hotel',
    contactPerson: 'Beatrice Ndinda',
    email: 'sarovamara@sarovahotels.com',
    phone: '+254 709 111 000',
    location: 'Maasai Mara National Reserve',
    services: ['Luxury Tented Chalets', 'Bush Dining', 'Cultural Performances'],
    pricingDescription: 'Full board safari operator contract KES 35,000 - 45,000 per tent',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 22
  },
  {
    id: 'sup-hotel-nomad-diani',
    businessName: 'The Sands at Nomad Beach Resort',
    category: 'Hotel',
    contactPerson: 'Hassan Omar (Guest Experience Director)',
    email: 'info@thesandsatnomad.com',
    phone: '+254 725 373 888',
    location: 'Diani Beach Road, Kwale',
    services: ['Boutique Beachfront Suites', 'Diving Center', 'Red Pepper Restaurant'],
    pricingDescription: 'Half board B2B tariff KES 30,000 - 48,000 per suite',
    status: 'Active',
    verificationStatus: 'Verified',
    assignedBookingsCount: 19
  },
  {
    id: 'sup-trans-rift-fleet',
    businessName: 'Rift Valley 4x4 Safari Transport Ltd',
    category: 'Transport',
    contactPerson: 'Captain John Gitau',
    email: 'dispatch@rift4x4fleet.co.ke',
    phone: '+254 722 849 102',
    location: 'Nairobi & Naivasha Depot',
    services: ['Toyota Noah', 'Prado TX', 'Extended 4x4 Land Cruisers', 'HiAce Vans'],
    pricingDescription: 'Daily dry/wet vehicle rates KES 10,000 - 24,000 with driver',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 35
  },
  {
    id: 'sup-drv-kimani',
    businessName: 'Chauffeur David Kimani',
    category: 'Driver',
    contactPerson: 'David Kimani (Senior VIP Driver)',
    email: 'david.kimani.safaris@gmail.com',
    phone: '+254 720 918 344',
    location: 'Nairobi & JKIA',
    services: ['VIP Airport Pickup', 'English/Swahili Guide', 'Defensive Driving Certified'],
    pricingDescription: 'Daily allowance KES 3,500 + vehicle fueling',
    status: 'Active',
    verificationStatus: 'Verified',
    assignedBookingsCount: 16
  },
  {
    id: 'sup-gd-samson-mara',
    businessName: 'Samson Ole Lenku (Silver Naturalist Guide)',
    category: 'Guide',
    contactPerson: 'Samson Ole Lenku',
    email: 'samson.lenku@kpsga-guides.org',
    phone: '+254 711 632 890',
    location: 'Maasai Mara / Narok',
    services: ['Big 5 Tracking', 'Birding', 'Cultural Translation', 'Photography Advice'],
    pricingDescription: 'Daily field fee KES 5,000 - 7,000',
    status: 'Active',
    verificationStatus: 'Verified',
    assignedBookingsCount: 28
  },
  {
    id: 'sup-boat-naivasha',
    businessName: 'Lake Naivasha Boatmen Association & Captain Peter',
    category: 'Boat Operator',
    contactPerson: 'Peter Waweru',
    email: 'naivashaboats@gmail.com',
    phone: '+254 723 445 109',
    location: 'Karatina Jetty, Lake Naivasha',
    services: ['Motorized Hippo Cruises', 'Crescent Island Ferry', 'Sunset Charters'],
    pricingDescription: 'Per boat charter KES 3,000 - 6,000 / trip',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 42
  },
  {
    id: 'sup-act-hellsgate-bikes',
    businessName: 'Hell’s Gate Cycle & Gorge Guides Cooperative',
    category: 'Activity Provider',
    contactPerson: 'Joseph Mwangi (Lead Ranger)',
    email: 'hellsgatecycles@gmail.com',
    phone: '+254 734 912 888',
    location: 'Elsa Gate, Hell’s Gate National Park',
    services: ['Mountain Bike Rentals', 'Lower Gorge Guided Hikes', 'Geothermal Spa Transfers'],
    pricingDescription: 'KES 1,200 per bike + KES 1,800 gorge guide fee',
    status: 'Active',
    verificationStatus: 'Official',
    assignedBookingsCount: 31
  }
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo-karibu10',
    code: 'KARIBU10',
    description: '10% Welcome Discount for First-Time Kenyan Explorers',
    discountType: 'percentage',
    discountValue: 10,
    minSpendKES: 30000,
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    id: 'promo-safari5000',
    code: 'SAFARI2026',
    description: 'Flat KES 5,000 Off Any Maasai Mara or Amboseli Wildlife Safari',
    discountType: 'fixed_kes',
    discountValue: 5000,
    minSpendKES: 50000,
    active: true,
    expiresAt: '2026-11-30'
  },
  {
    id: 'promo-diani8000',
    code: 'DIANIESCAPE',
    description: 'Special KES 8,000 Coastal Holiday Discount',
    discountType: 'fixed_kes',
    discountValue: 8000,
    minSpendKES: 60000,
    active: true,
    expiresAt: '2026-12-15'
  },
  {
    id: 'promo-magical15',
    code: 'MAGICALKENYA',
    description: '15% Group Safari Special for 3+ Travellers',
    discountType: 'percentage',
    discountValue: 15,
    minSpendKES: 70000,
    active: true,
    expiresAt: '2026-12-31'
  }
];

export const INITIAL_PACKAGE_REVIEWS: PackageReview[] = [
  {
    id: 'rev-1',
    packageId: 'pkg-naivasha-escape',
    packageName: 'NAIVASHA ESCAPE',
    bookingReference: 'KEN-NVS-2026-10482',
    authorName: 'Sarah Jenkins',
    authorCountry: 'United Kingdom',
    rating: 5,
    comment: 'The Naivasha 3-day package exceeded every expectation! Cycling through Hell’s Gate with zebras trotting beside us felt like being in The Lion King. Upgrading to the Toyota Prado was totally worth it, and our driver David made sure we were comfortable the entire time. Crescent Island walk was pure magic.',
    ratingsBreakdown: {
      accommodation: 5,
      transport: 5,
      guide: 5,
      activities: 5,
      valueForMoney: 5
    },
    createdAt: '2026-08-20',
    verified: true
  },
  {
    id: 'rev-2',
    packageId: 'pkg-naivasha-escape',
    packageName: 'NAIVASHA ESCAPE',
    bookingReference: 'KEN-NVS-2026-09821',
    authorName: 'Jean-Pierre Dupont',
    authorCountry: 'France',
    rating: 5,
    comment: 'Spectacular package. The Lake Naivasha boat ride was mesmerizing with hundreds of bird species and close-up hippo families. Booking through this platform was seamless, M-Pesa payment confirmed instantly, and the day-by-day itinerary in our dashboard kept everything organized.',
    ratingsBreakdown: {
      accommodation: 4,
      transport: 5,
      guide: 5,
      activities: 5,
      valueForMoney: 5
    },
    createdAt: '2026-08-14',
    verified: true
  },
  {
    id: 'rev-3',
    packageId: 'pkg-maasai-mara-safari',
    packageName: 'MAASAI MARA SAFARI',
    bookingReference: 'KEN-MAR-2026-11204',
    authorName: 'Klaus & Helga Schmidt',
    authorCountry: 'Germany',
    rating: 5,
    comment: 'We saw all Big 5 within 24 hours in the Mara! Our guide Samson was astonishing at tracking leopards and cheetahs. The tented camp food and campfire dinners under the African Milky Way were unforgettable. 10/10 Kenyan hospitality.',
    ratingsBreakdown: {
      accommodation: 5,
      transport: 5,
      guide: 5,
      activities: 5,
      valueForMoney: 5
    },
    createdAt: '2026-08-25',
    verified: true
  },
  {
    id: 'rev-4',
    packageId: 'pkg-diani-beach-escape',
    packageName: 'DIANI BEACH ESCAPE',
    bookingReference: 'KEN-DIA-2026-08412',
    authorName: 'Amanda Collins',
    authorCountry: 'United States',
    rating: 5,
    comment: 'The Wasini Island dolphin dhow cruise was the highlight of our 2-week Kenya vacation. Swimming with wild sea turtles and dolphins in turquoise warm water, followed by fresh Swahili crab curry. Pure paradise!',
    ratingsBreakdown: {
      accommodation: 5,
      transport: 5,
      guide: 5,
      activities: 5,
      valueForMoney: 5
    },
    createdAt: '2026-08-18',
    verified: true
  }
];
