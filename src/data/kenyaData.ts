import {
  Destination,
  SafariTour,
  Hotel,
  Restaurant,
  KenyanFoodItem,
  LocalGuide,
  NearMePlace,
  EmergencyContact,
  SwahiliPhrase,
  SIMPackage,
  EventItem,
  DealItem,
  CurrencyCode
} from '../types';

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1.0,
  KES: 130.5,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.89,
  JPY: 154.2,
  CNY: 7.24,
  AED: 3.67,
  ZAR: 18.4
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'maasai-mara',
    name: 'Maasai Mara National Reserve',
    category: 'wildlife',
    region: 'Rift Valley',
    tagline: 'The World’s Greatest Wildlife Spectacle & Big 5 Haven',
    description: 'Renowned globally for the Great Wildebeest Migration, legendary predator densities, rolling golden savannas, and immersive Maasai cultural experiences. Home to healthy populations of lions, cheetahs, leopards, elephants, and rhinos.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 100,
    entranceFeeKES: 3000,
    bestTimeToVisit: 'July to October (Great Migration) & Dec to March',
    duration: '3 - 5 Days',
    coordinates: { lat: -1.4925, lng: 35.1439 },
    rating: 4.9,
    reviewCount: 3420,
    highlights: ['Great Wildebeest Migration crossing Mara River', 'Big 5 game drives at sunrise', 'Hot air balloon safaris over endless savanna', 'Traditional Maasai boma cultural visits'],
    activities: ['Game Drives', 'Hot Air Ballooning', 'Bush Breakfasts', 'Maasai Cultural Visits', 'Birdwatching'],
    safetyNotes: 'Always stay inside your safari vehicle during game drives. Follow armed KWS rangers in walking safaris.',
    nearbyHotelsCount: 48,
    featured: true
  },
  {
    id: 'amboseli',
    name: 'Amboseli National Park',
    category: 'wildlife',
    region: 'Rift Valley',
    tagline: 'Free-roaming Giants Under Mount Kilimanjaro',
    description: 'Famed for giant elephant herds against the snow-capped backdrop of Mount Kilimanjaro (Africa’s highest peak), rich birdlife in Enkongo Narok swamps, and panoramic vistas from Observation Hill.',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 80,
    entranceFeeKES: 1500,
    bestTimeToVisit: 'June to October & January to February',
    duration: '2 - 3 Days',
    coordinates: { lat: -2.6527, lng: 37.2606 },
    rating: 4.8,
    reviewCount: 2150,
    highlights: ['Iconic Kilimanjaro views at sunrise', 'Massive tusker elephants wading in marshlands', 'Observation Hill 360-degree overlook', 'Over 400 species of birds'],
    activities: ['Elephant Tracking', 'Photography', 'Birding', 'Cultural Tours', 'Sunset Sundowners'],
    safetyNotes: 'Observe elephant family space; keep a respectful distance during self-drive or guided drives.',
    nearbyHotelsCount: 24,
    featured: true
  },
  {
    id: 'diani-beach',
    name: 'Diani Beach & South Coast',
    category: 'beach',
    region: 'Coast',
    tagline: 'Pristine White Sands & Turquoise Indian Ocean Waters',
    description: 'Voted Africa’s leading beach destination multiple times. Featuring soft powdery white sand, coral barrier reefs for kite-surfing and scuba diving, coastal dhow excursions to Kisite Mpunguti Marine Park, and seafood dining.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 0,
    entranceFeeKES: 0,
    bestTimeToVisit: 'December to March & July to October',
    duration: '3 - 7 Days',
    coordinates: { lat: -4.2796, lng: 39.5855 },
    rating: 4.9,
    reviewCount: 2890,
    highlights: ['Pristine white sand beaches', 'Dolphin watching & snorkelling at Wasini Island', 'Kitesurfing & skydiving over the ocean', 'Fresh Swahili seafood at Nomad Beach Bar'],
    activities: ['Kitesurfing', 'Scuba Diving', 'Skydiving', 'Dhow Cruises', 'Camel Rides', 'Spa Retreats'],
    safetyNotes: 'Swim within designated reef zones. Hire registered beach tour operators with official identification.',
    nearbyHotelsCount: 65,
    featured: true
  },
  {
    id: 'mount-kenya',
    name: 'Mount Kenya National Park',
    category: 'mountain',
    region: 'Central',
    tagline: 'Africa’s Second Highest Peak & Afro-Alpine Wonder',
    description: 'An ancient extinct volcano rising to 5,199m with dramatic jagged volcanic peaks (Batian, Nelion, and Point Lenana), rare giant senecio & lobelia botanical forests, glacier-fed tarns, and scenic trekking routes (Sirimon, Chogoria, Naro Moru).',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 70,
    entranceFeeKES: 1000,
    bestTimeToVisit: 'January to March & June to October (Dry seasons)',
    duration: '4 - 6 Days for Summit Trek',
    coordinates: { lat: -0.1521, lng: 37.3084 },
    rating: 4.9,
    reviewCount: 1420,
    highlights: ['Point Lenana summit (4,985m) sunrise view', 'Enchanted giant heather and Lobelia alpine valleys', 'Lake Ellis and Gorges Valley scenery', 'Technical climbing on Batian and Nelion'],
    activities: ['Mountain Trekking', 'High Altitude Photography', 'Trout Fishing', 'Rock Climbing', 'Forest Walking'],
    safetyNotes: 'Acclimatize properly to prevent Acute Mountain Sickness (AMS). Always trek with licensed mountain guides and porters.',
    nearbyHotelsCount: 19,
    featured: true
  },
  {
    id: 'lake-nakuru',
    name: 'Lake Nakuru National Park',
    category: 'nature',
    region: 'Rift Valley',
    tagline: 'Sanctuary for Endangered Rhinos & Pink Flamingos',
    description: 'A picturesque Rift Valley alkaline lake surrounded by yellow-barked acacia woodlands and rocky cliffs. It is a premier sanctuary for both endangered Black and White Rhinos, Rothschild’s giraffes, and vibrant birdlife.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 70,
    entranceFeeKES: 1000,
    bestTimeToVisit: 'Year-round; Birding best from Nov to April',
    duration: '1 - 2 Days',
    coordinates: { lat: -0.3667, lng: 36.0833 },
    rating: 4.7,
    reviewCount: 1780,
    highlights: ['Guaranteed White and Black Rhino sightings', 'Flamingos along the alkaline shoreline', 'Baboon Cliff & Out of Africa panoramic lookout', 'Makalia Falls picturesque picnic site'],
    activities: ['Rhino Sanctuary Drives', 'Birdwatching', 'Clifftop Overlooks', 'Photography'],
    safetyNotes: 'Drive under 40km/h inside the park to protect wildlife. Maintain distance from baboons at lookout points.',
    nearbyHotelsCount: 22,
    featured: true
  },
  {
    id: 'nairobi-city',
    name: 'Nairobi City & Wildlife Haven',
    category: 'city',
    region: 'Nairobi',
    tagline: 'The World’s Only Capital with a National Park',
    description: 'A vibrant metropolitan hub blending modern skyline, world-class restaurants, and art galleries with unique wildlife sanctuaries where lions and giraffes roam against skyscraper backdrops.',
    image: 'https://images.unsplash.com/photo-1609137144822-476722d3b259?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80'
    ],
    entranceFeeUSD: 43,
    entranceFeeKES: 500,
    bestTimeToVisit: 'Year-round',
    duration: '2 - 3 Days',
    coordinates: { lat: -1.2921, lng: 36.8219 },
    rating: 4.7,
    reviewCount: 3100,
    highlights: ['Nairobi National Park game drives', 'Giraffe Centre hand-feeding endangered Rothschild giraffes', 'Sheldrick Wildlife Trust Elephant Orphanage', 'Karen Blixen Museum & Kazuri Beads'],
    activities: ['City Tours', 'Wildlife Rehabilitation', 'Art Gallery Tours', 'Nyama Choma Dining', 'Nightlife in Westlands'],
    safetyNotes: 'Use app-based taxis (Uber/Bolt) at night. Keep valuables secured when exploring busy downtown streets.',
    nearbyHotelsCount: 120,
    featured: true
  },
  {
    id: 'tsavo-national-parks',
    name: 'Tsavo East & West National Parks',
    category: 'wildlife',
    region: 'Coast',
    tagline: 'The Theatre of the Wild & Dust-Red Elephants',
    description: 'Combined, Tsavo forms one of the largest national parks on Earth. Characterized by dust-red elephants bathing in the Galana River, the Yatta Plateau (world’s longest lava flow), and Mzima Springs crystal underwater hippo pools.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    entranceFeeUSD: 75,
    entranceFeeKES: 1200,
    bestTimeToVisit: 'June to October & December to March',
    duration: '2 - 4 Days',
    coordinates: { lat: -2.7753, lng: 38.4633 },
    rating: 4.8,
    reviewCount: 1350,
    highlights: ['Dust-red elephants at Mudanda Rock', 'Mzima Springs underwater viewing chamber for hippos & fish', 'Shetani Lava flows and volcanic craters', 'Lugard Falls on Galana River'],
    activities: ['Game Drives', 'Caving at Shetani', 'Underwater Observation', 'Bird Watching'],
    safetyNotes: 'Tsavo is vast and wild; carry ample drinking water and download offline maps before traversing remote tracks.',
    nearbyHotelsCount: 28,
    featured: false
  },
  {
    id: 'lamu-island',
    name: 'Lamu Archipelago & Old Town',
    category: 'culture',
    region: 'Coast',
    tagline: 'UNESCO Swahili Heritage, Dhows & Timeless Island Life',
    description: 'The oldest and best-preserved Swahili settlement in East Africa. Built with coral rag stone and mangrove timber, Lamu features tranquil car-free streets navigated on foot or donkey, intricate carved wooden doors, and sunset dhow cruises.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    entranceFeeUSD: 10,
    entranceFeeKES: 500,
    bestTimeToVisit: 'July to March',
    duration: '3 - 5 Days',
    coordinates: { lat: -2.2696, lng: 40.9006 },
    rating: 4.9,
    reviewCount: 980,
    highlights: ['UNESCO World Heritage Old Town architecture', 'Traditional sunset sailing on wooden dhows', 'Shela village dunes and pristine beaches', 'Swahili seafood feasts & spice tea'],
    activities: ['Dhow Sailing', 'Cultural Walking Tours', 'Donkey Riding', 'Deep Sea Fishing', 'Yoga Retreats'],
    safetyNotes: 'Dress modestly respecting local cultural heritage when walking through Lamu Old Town.',
    nearbyHotelsCount: 35,
    featured: true
  },
  {
    id: 'samburu-national-reserve',
    name: 'Samburu National Reserve',
    category: 'wildlife',
    region: 'Northern',
    tagline: 'Rugged Semi-Arid Wilderness & Samburu Special 5',
    description: 'Located in rugged northern Kenya along the Ewaso Nyiro River. Celebrated for rare species known as the Samburu Special 5: Grevy’s zebra, Somali ostrich, reticulated giraffe, gerenuk (giraffe gazelle), and beisa oryx.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    entranceFeeUSD: 70,
    entranceFeeKES: 1000,
    bestTimeToVisit: 'December to March & July to October',
    duration: '2 - 3 Days',
    coordinates: { lat: 0.6277, lng: 37.5348 },
    rating: 4.8,
    reviewCount: 890,
    highlights: ['Samburu Special 5 unique endemic wildlife', 'Ewaso Nyiro riverbanks lined with doum palms', 'Authentic Samburu cultural interactions', 'High leopard sighting frequency'],
    activities: ['Game Drives', 'Cultural Boma Tours', 'Birding', 'Bush Dinners'],
    safetyNotes: 'Follow 4x4 tracks and stay hydrated in the northern warmth.',
    nearbyHotelsCount: 16,
    featured: false
  },
  {
    id: 'great-rift-valley',
    name: 'Great Rift Valley & Lake Naivasha',
    category: 'nature',
    region: 'Rift Valley',
    tagline: 'Dramatic Escarpments, Freshwater Lakes & Geothermal Gorges',
    description: 'A spectacular geological fault system featuring freshwater Lake Naivasha with boat safaris to Crescent Island, cycling among zebras in Hell’s Gate National Park, and relaxing in natural Olkaria geothermal hot springs.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [],
    entranceFeeUSD: 30,
    entranceFeeKES: 300,
    bestTimeToVisit: 'Year-round',
    duration: '1 - 2 Days',
    coordinates: { lat: -0.7172, lng: 36.4310 },
    rating: 4.8,
    reviewCount: 1950,
    highlights: ['Cycling through Hell’s Gate National Park gorges', 'Boat safari with hippos and fish eagles on Lake Naivasha', 'Walking with wildlife on Crescent Island', 'Olkaria Geothermal natural heated swimming spa'],
    activities: ['Bicycle Safaris', 'Boat Excursions', 'Rock Climbing', 'Geothermal Spa Bathing', 'Hiking'],
    safetyNotes: 'Check weather conditions before hiking Hell’s Gate gorges during rainy seasons.',
    nearbyHotelsCount: 42,
    featured: true
  }
];

export const SAFARIS: SafariTour[] = [
  {
    id: 'mara-3day-classic',
    title: '3-Day Maasai Mara Big 5 & Great Migration Safari',
    operator: 'Bush & Beyond Safaris Kenya',
    operatorBadge: 'official',
    operatorPhone: '+254 722 100 200',
    duration: '3 Days / 2 Nights',
    durationDays: 3,
    location: 'Maasai Mara National Reserve',
    priceUSD: 490,
    priceKES: 63945,
    originalPriceUSD: 650,
    rating: 4.9,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    groupSize: 'Max 6 in 4x4 Pop-up Land Cruiser',
    inclusions: [
      'Roundtrip transport from Nairobi in customized 4x4 Land Cruiser',
      '2 Nights full-board luxury tented camp accommodation',
      'Daily morning and afternoon game drives with professional KWS-certified guide',
      'All park entrance fees & government conservation levies',
      'Complimentary bottled spring water in vehicle'
    ],
    exclusions: ['Optional hot air balloon flight ($450)', 'Maasai Village visit ($20)', 'Alcoholic beverages', 'Driver guide gratuities'],
    itinerary: [
      { day: 1, title: 'Nairobi to Maasai Mara via Great Rift Valley Viewpoint', desc: 'Depart early morning from Nairobi, stop at the Great Rift Valley escarpment for photos. Arrive at Mara camp for hot lunch, followed by an afternoon game drive seeking lions and cheetahs.', accommodation: 'Mara Sopa Lodge / Luxury Tented Camp' },
      { day: 2, title: 'Full Day Game Drive across Mara Plains to Mara River', desc: 'Full day spent tracking the Big 5 with a picnic lunch under a flat-topped acacia tree. Witness crocodile-infested river crossings and massive herds.', accommodation: 'Mara Sopa Lodge / Luxury Tented Camp' },
      { day: 3, title: 'Sunrise Game Drive & Return to Nairobi', desc: 'Early morning game drive to catch predators on the hunt. Breakfast at camp, then drive back to Nairobi arriving by late afternoon.', accommodation: 'Departure' }
    ],
    pickupLocation: 'Any Nairobi Hotel / JKIA Airport',
    departureDates: ['Daily Departures Available', 'Custom Private Dates'],
    cancellationPolicy: 'Free cancellation up to 7 days before departure. 100% refund guaranteed.',
    category: 'Big 5 Safari'
  },
  {
    id: 'amboseli-2day-elephants',
    title: '2-Day Amboseli Kilimanjaro & Giant Elephants Expedition',
    operator: 'Savanna Horizons Kenya',
    operatorBadge: 'verified',
    operatorPhone: '+254 733 450 890',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    location: 'Amboseli National Park',
    priceUSD: 340,
    priceKES: 44370,
    originalPriceUSD: 420,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
    groupSize: 'Max 6 travellers',
    inclusions: ['4x4 Safari Van / Land Cruiser with pop-up roof', '1 Night at Amboseli Serena Lodge (Full Board)', 'All park fees', 'Experienced English/Swahili guide', 'Observation Hill guided tour'],
    exclusions: ['Tips & drinks', 'Personal travel insurance'],
    itinerary: [
      { day: 1, title: 'Nairobi to Amboseli & Afternoon Game Drive', desc: 'Drive through Emali to Amboseli. Enjoy lunch with views of Kilimanjaro, then head out to the swamps to watch giant elephant herds.', accommodation: 'Amboseli Serena Safari Lodge' },
      { day: 2, title: 'Sunrise over Kilimanjaro & Midday Return', desc: 'Early morning photography session with clear views of the mountain peak. Final game drive, then scenic journey back to Nairobi.', accommodation: 'Departure' }
    ],
    pickupLocation: 'Nairobi CBD / Westlands / JKIA',
    departureDates: ['Mon, Wed, Fri, Sat Departures'],
    cancellationPolicy: 'Free cancellation up to 5 days in advance.',
    category: 'Big 5 Safari'
  },
  {
    id: 'diani-marine-wasini',
    title: 'Wasini Island Dolphin Dhow Cruise & Marine Park Snorkel',
    operator: 'Coast Wave Excursions Diani',
    operatorBadge: 'official',
    operatorPhone: '+254 711 889 900',
    duration: '1 Full Day',
    durationDays: 1,
    location: 'Kisite Mpunguti Marine Park & Wasini Island',
    priceUSD: 95,
    priceKES: 12397,
    originalPriceUSD: 130,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    groupSize: 'Small Group Dhow (Max 15)',
    inclusions: ['Hotel transfers from Diani/Mombasa beach resorts', 'Traditional Arabic wooden dhow cruise', 'Snorkelling equipment & Marine Park fees', 'Swahili seafood lunch with crab & coconut rice on Wasini', 'Shimoni Slave Caves historical guided tour'],
    exclusions: ['Alcoholic drinks', 'Scuba diving upgrades ($45)'],
    itinerary: [
      { day: 1, title: 'Full Day Dhow, Snorkel & Seafood Island Feast', desc: 'Sail into Kisite Marine Park to spot dolphins swimming alongside the dhow. Snorkel amongst coral reefs, then feast on fresh crab and lobster at Wasini Island.', accommodation: 'Day Trip' }
    ],
    pickupLocation: 'All Diani Beach & Tiwi Hotels',
    departureDates: ['Departs Daily at 7:00 AM'],
    cancellationPolicy: 'Free cancellation 24 hours prior.',
    category: 'Marine'
  },
  {
    id: 'nakuru-naivasha-2day',
    title: '2-Day Lake Nakuru Rhinos & Naivasha Hell’s Gate Cycling',
    operator: 'Rift Explorer Adventures',
    operatorBadge: 'recommended',
    operatorPhone: '+254 720 334 112',
    duration: '2 Days / 1 Night',
    durationDays: 2,
    location: 'Lake Nakuru & Naivasha',
    priceUSD: 310,
    priceKES: 40455,
    originalPriceUSD: 390,
    rating: 4.8,
    reviewsCount: 275,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    groupSize: 'Max 7 guests',
    inclusions: ['4x4 Safari vehicle with pop-up roof', 'Lake Nakuru National Park fees & rhino tracking', 'Hell’s Gate bicycle rental & gorge guide', 'Naivasha boat ride for hippo watching', '1 Night lodge accommodation (Full Board)'],
    exclusions: ['Olkaria Spa entry fee ($20)', 'Tips and personal items'],
    itinerary: [
      { day: 1, title: 'Lake Nakuru Rhino Sanctuary & Baboon Cliff', desc: 'Early departure to Lake Nakuru. Track white and black rhinos, view flamingos, and enjoy lunch overlooking the rift valley.', accommodation: 'Lake Nakuru Lodge / Sarova Lion Hill' },
      { day: 2, title: 'Lake Naivasha Boat Ride & Hell’s Gate Bike Safari', desc: 'Morning boat ride on Lake Naivasha to see fish eagles. Ride bicycles through Hell’s Gate among giraffes, then return to Nairobi.', accommodation: 'Departure' }
    ],
    pickupLocation: 'Nairobi Hotels / JKIA',
    departureDates: ['Tuesdays, Thursdays, Saturdays'],
    cancellationPolicy: 'Free cancellation 48 hours prior.',
    category: 'Day Trip'
  },
  {
    id: 'chogoria-mt-kenya-4day',
    title: '4-Day Mount Kenya Chogoria Scenic Trek to Point Lenana',
    operator: 'Alpine Heights Kenya Guides',
    operatorBadge: 'official',
    operatorPhone: '+254 725 678 901',
    duration: '4 Days / 3 Nights',
    durationDays: 4,
    location: 'Mount Kenya National Park',
    priceUSD: 560,
    priceKES: 73080,
    originalPriceUSD: 680,
    rating: 4.9,
    reviewsCount: 190,
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80',
    groupSize: 'Max 8 hikers + mountain crew',
    inclusions: ['Licensed high-altitude mountain guide, cook & porters', 'All park entrance and camping fees', 'Quality mountain tents & 3 hot meals per day', 'Roundtrip transfer from Nairobi to Chogoria Gate', 'Certificate of summit achievement'],
    exclusions: ['Warm mountain sleeping bag & personal trekking gear', 'Guide and porter gratuities ($50-$80 recommended)'],
    itinerary: [
      { day: 1, title: 'Nairobi to Chogoria Bandas (2,950m)', desc: 'Drive through fertile central highlands, ascending through bamboo forests to Chogoria Bandas for acclimatization walk.', accommodation: 'Chogoria Mountain Cabins' },
      { day: 2, title: 'Trek to Lake Ellis & Mintos Camp (4,200m)', desc: 'Hike through giant heather and proteas alongside spectacular Gorges Valley waterfalls to Mintos Hut.', accommodation: 'Mintos Alpine Camp' },
      { day: 3, title: 'Summit Push to Point Lenana (4,985m) & Descend to Sirimon', desc: 'Pre-dawn 3:00 AM summit trek to catch the golden African sunrise over Mount Kilimanjaro and jagged peaks. Descend via Sirimon route.', accommodation: 'Old Moses Camp' },
      { day: 4, title: 'Final descent to Sirimon Gate & drive to Nairobi', desc: 'Gentle walk through the cedar forest to Sirimon Gate, receiving certificates before returning to Nairobi.', accommodation: 'Return' }
    ],
    pickupLocation: 'Nairobi Hotels',
    departureDates: ['Every Sunday & Custom Private Groups'],
    cancellationPolicy: 'Free cancellation up to 10 days before trek.',
    category: 'Luxury Lodge'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'sarova-mara-camp',
    name: 'Sarova Mara Game Camp',
    type: 'Luxury Camp',
    location: 'Sekenani, Maasai Mara',
    region: 'Rift Valley',
    coordinates: { lat: -1.5321, lng: 35.3214 },
    pricePerNightUSD: 320,
    pricePerNightKES: 41760,
    rating: 4.9,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Swimming Pool', 'Bush Spa', 'Free High-Speed Wi-Fi', 'Solar Power', 'Fine Dining Restaurant', 'Organic Kitchen Garden', 'Bar & Fire Pit'],
    roomTypes: [
      { name: 'Club Tented Suite', priceUSD: 320, capacity: '2 Adults, 1 Child', description: 'Luxurious canvas tent with wooden deck overlooking nature trails and private ensuite bathroom.' },
      { name: 'Family Safari Tent', priceUSD: 540, capacity: '4 Adults', description: 'Two inter-connected canvas bedrooms with spacious lounge and panoramic savanna views.' }
    ],
    checkIn: '12:00 PM',
    checkOut: '10:00 AM',
    cancellationPolicy: 'Free cancellation up to 14 days before arrival.',
    contact: { phone: '+254 709 111 000', email: 'reservations@sarovahotels.com' },
    badge: 'official'
  },
  {
    id: 'the-sands-nomad-diani',
    name: 'The Sands at Nomad Boutique Beach Resort',
    type: 'Beach Resort',
    location: 'Diani Beach, Kwale',
    region: 'Coast',
    coordinates: { lat: -4.3012, lng: 39.5812 },
    pricePerNightUSD: 240,
    pricePerNightKES: 31320,
    rating: 4.9,
    reviewsCount: 780,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    amenities: ['Private Beachfront', 'Nomad Beach Bar & Pizzeria', 'Diving & Watersports Centre', 'Forest Spa', 'Infinity Pool', 'Eco-certified'],
    roomTypes: [
      { name: 'Ocean View Superior Room', priceUSD: 240, capacity: '2 Guests', description: 'Handcrafted Swahili mahogany furniture with private terrace looking onto the white sands.' },
      { name: 'Beach Cottage Suite', priceUSD: 410, capacity: '2 Guests', description: 'Independent thatched beach cottage steps away from the turquoise ocean waters.' }
    ],
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    cancellationPolicy: 'Free cancellation up to 7 days prior.',
    contact: { phone: '+254 722 735 574', email: 'info@thesandsatnomad.com' },
    badge: 'verified'
  },
  {
    id: 'villa-rosa-kempinski',
    name: 'Villa Rosa Kempinski Nairobi',
    type: 'Boutique Hotel',
    location: 'Chiromo Road, Westlands, Nairobi',
    region: 'Nairobi',
    coordinates: { lat: -1.2689, lng: 36.8089 },
    pricePerNightUSD: 220,
    pricePerNightKES: 28710,
    rating: 4.8,
    reviewsCount: 1120,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    amenities: ['Heated Outdoor Pool', 'Kempinski The Spa', 'LUCCA Italian Restaurant', 'Tambourin Rooftop Lounge', '24/7 Concierge', 'Valet Parking', 'Airport Limo Service'],
    roomTypes: [
      { name: 'Superior City View King', priceUSD: 220, capacity: '2 Guests', description: 'Spacious 35sqm room with plush bedding, marble bath and high-speed Wi-Fi.' },
      { name: 'Executive Suite with Lounge Access', priceUSD: 450, capacity: '2 Guests', description: 'Separate living room, complimentary evening cocktails and butler service.' }
    ],
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    cancellationPolicy: 'Cancel free 24 hours before check-in.',
    contact: { phone: '+254 703 049 000', email: 'reservations.nairobi@kempinski.com' },
    badge: 'official'
  },
  {
    id: 'wildebeest-eco-camp',
    name: 'Wildebeest Eco Camp Nairobi (Karen)',
    type: 'Budget Hostel',
    location: 'Mokoyeti Road West, Karen, Nairobi',
    region: 'Nairobi',
    coordinates: { lat: -1.3325, lng: 36.7341 },
    pricePerNightUSD: 45,
    pricePerNightKES: 5872,
    rating: 4.7,
    reviewsCount: 530,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    amenities: ['Lush Tropical Garden', 'Swimming Pool', 'Tour Booking Desk', 'Restaurant & Bar', 'Free Wi-Fi', 'Communal Fire Pit', 'Solar Showers'],
    roomTypes: [
      { name: 'Garden Safari Tent (Private)', priceUSD: 45, capacity: '2 Guests', description: 'Ensuite glamping tent nestled amongst tranquil avocado and acacia trees.' },
      { name: 'Dorm Bed in Custom Cabin', priceUSD: 18, capacity: '1 Guest', description: 'Clean comfortable wooden bunk with personal locker, reading light and USB socket.' }
    ],
    checkIn: '1:00 PM',
    checkOut: '10:00 AM',
    cancellationPolicy: 'Free cancellation 48 hours in advance.',
    contact: { phone: '+254 734 770 733', email: 'info@wildebeestecocamp.com' },
    badge: 'verified'
  },
  {
    id: 'amboseli-serena-lodge',
    name: 'Amboseli Serena Safari Lodge',
    type: 'Safari Lodge',
    location: 'Amboseli National Park',
    region: 'Rift Valley',
    coordinates: { lat: -2.6712, lng: 37.2891 },
    pricePerNightUSD: 290,
    pricePerNightKES: 37845,
    rating: 4.8,
    reviewsCount: 610,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    amenities: ['View of Mt Kilimanjaro', 'Spring-fed Swimming Pool', 'Maasai Dance Arena', 'Observation Terrace', 'Gift Shop', 'Full Board Buffet'],
    roomTypes: [
      { name: 'Twin/King Mountain View Room', priceUSD: 290, capacity: '2 Guests', description: 'Maasai-inspired wall frescoes with private veranda facing the plains and Kilimanjaro.' }
    ],
    checkIn: '12:00 PM',
    checkOut: '10:00 AM',
    cancellationPolicy: 'Cancel up to 7 days before for 100% refund.',
    contact: { phone: '+254 732 123 333', email: 'amboseli@serenahotels.com' },
    badge: 'official'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'carnivore-nairobi',
    name: 'The Carnivore Restaurant Nairobi',
    type: 'Nyama Choma Joint',
    cuisine: 'Kenyan Charcoal Barbecue & Game Meats',
    location: 'Langata Road, Nairobi (Near Wilson Airport)',
    priceRange: '$$$',
    rating: 4.7,
    reviewsCount: 3890,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    openingHours: '12:00 PM - 11:00 PM Daily',
    dietary: ['Halal', 'Vegetarian Friendly'],
    popularDishes: [
      { name: 'All-You-Can-Eat Charcoal Roast Meats & Dawa', priceKES: 4500, priceUSD: 34.5, desc: 'Roasted over traditional charcoal pit on Maasai swords, served with salads and famous Dawa cocktail.' },
      { name: 'Original Kenyan Dawa Cocktail', priceKES: 750, priceUSD: 5.75, desc: 'Vodka, crushed lime, honey and ice served with a traditional wooden dowl pestle.' }
    ],
    address: 'Langata Road, Nairobi',
    phone: '+254 733 611 608',
    badge: 'official'
  },
  {
    id: 'talisman-karen',
    name: 'The Talisman Gastro-Lounge Karen',
    type: 'Fine Dining',
    cuisine: 'Pan-Asian, Mediterranean & Kenyan Fusion',
    location: 'Ngong Road, Karen, Nairobi',
    priceRange: '$$$',
    rating: 4.9,
    reviewsCount: 1450,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    openingHours: '8:00 AM - 11:00 PM (Tue - Sun)',
    dietary: ['Vegetarian Friendly', 'Vegan Options', 'Gluten Free'],
    popularDishes: [
      { name: 'Feta & Coriander Samosas with Chilli Ginger Jam', priceKES: 950, priceUSD: 7.28, desc: 'Crispy pastry parcels celebrated across Nairobi.' },
      { name: 'Wasabi Roasted Beef Fillet & Truffle Fries', priceKES: 2400, priceUSD: 18.39, desc: 'Tender prime Kenyan highland beef with wasabi butter.' }
    ],
    address: '320 Ngong Road, Karen, Nairobi',
    phone: '+254 705 999 997',
    badge: 'recommended'
  },
  {
    id: 'mama-oliech-choma',
    name: 'Mama Oliech Restaurant',
    type: 'Local Kenyan',
    cuisine: 'Authentic Luo Lake Victoria Tilapia & Ugali',
    location: 'Marcus Garvey Road, Kilimani, Nairobi',
    priceRange: '$$',
    rating: 4.8,
    reviewsCount: 2100,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    openingHours: '11:00 AM - 10:00 PM Daily',
    dietary: ['Halal'],
    popularDishes: [
      { name: 'Whole Deep-Fried Lake Victoria Tilapia', priceKES: 1200, priceUSD: 9.20, desc: 'Crispy whole golden fish served with steaming brown/white ugali, sukuma wiki & kachumbari.' },
      { name: 'Kienyeji Local Free-Range Chicken Stew', priceKES: 1400, priceUSD: 10.72, desc: 'Slow-cooked traditional village chicken in rich onion tomato gravy.' }
    ],
    address: 'Marcus Garvey Road, Kilimani, Nairobi',
    phone: '+254 722 841 832',
    badge: 'official'
  },
  {
    id: 'tamarind-dhow-mombasa',
    name: 'Tamarind Dhow Floating Restaurant',
    type: 'Swahili Seafood',
    cuisine: 'Coastal Swahili Lobster, Prawns & Oysters',
    location: 'Tudor Creek, Nyali, Mombasa',
    priceRange: '$$$$',
    rating: 4.9,
    reviewsCount: 1680,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    openingHours: 'Lunch Cruise: 12:30 PM | Dinner Cruise: 6:30 PM',
    dietary: ['Halal', 'Vegetarian Friendly'],
    popularDishes: [
      { name: 'Swahili Grilled Jumbo Tiger Prawns in Garlic Butter', priceKES: 3800, priceUSD: 29.11, desc: 'Freshly caught Indian ocean prawns served with coconut saffron rice.' },
      { name: 'Dawa Tamarind Special & Tropical Fruit Platter', priceKES: 900, priceUSD: 6.9, desc: 'Signature spiced coastal aperitif on the water.' }
    ],
    address: 'Nyali Bridge, Tudor Creek, Mombasa',
    phone: '+254 722 205 160',
    badge: 'official'
  }
];

export const KENYAN_FOODS: KenyanFoodItem[] = [
  {
    id: 'nyama-choma',
    name: 'Nyama Choma (Kenyan Roast Meat)',
    swahiliName: 'Nyama Choma na Kachumbari',
    pronunciation: 'NYAH-mah CHO-mah',
    category: 'Main Dish',
    description: 'Kenya’s undisputed national culinary obsession. Succulent goat (mbuzi) or beef slow-roasted over natural red-hot charcoal embers until tender with a smoky crust, carved right in front of you into bite-sized cuts.',
    ingredients: ['Fresh Goat / Beef', 'Sea Salt', 'Coarse Black Pepper', 'Charcoal Smoke'],
    tasteProfile: 'Smoky, savoury, tender, seasoned simply with salt and served with fresh tangy Kachumbari tomato-onion salad.',
    recommendedPlaces: 'Kenyatta Market Nairobi, Carnivore, Olepolos Country Club, Local Choma Bases',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 800 - 1,500 per half kilo',
    mustTry: true
  },
  {
    id: 'ugali-sukuma',
    name: 'Ugali & Sukuma Wiki (The Staple)',
    swahiliName: 'Ugali na Sukuma Wiki',
    pronunciation: 'oo-GAH-lee nah soo-KOO-mah WEE-kee',
    category: 'Main Dish',
    description: 'The heartbeat of Kenyan meals. Ugali is a dense, comforting polenta-like cake made by stirring white maize flour into boiling water until solid. It is traditionally eaten with the right hand, pinched into a small ball with an indentation to scoop up Sukuma Wiki (braised collard greens sautéed with onions and tomatoes).',
    ingredients: ['White Maize Meal / Millet', 'Collard Greens (Sukuma Wiki)', 'Tomatoes', 'Onions', 'Vegetable Oil'],
    tasteProfile: 'Hearty, earthy, mild and deeply satisfying when paired with rich meat gravies or grilled fish.',
    recommendedPlaces: 'Found in virtually every local Kenyan hotel, eatery, and home.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 150 - 350 per plate',
    mustTry: true
  },
  {
    id: 'chapati',
    name: 'Kenyan Layered Chapati',
    swahiliName: 'Chapati za Ngozi',
    pronunciation: 'chah-PAH-tee',
    category: 'Side',
    description: 'A beloved East African flatbread vastly different from its Indian ancestor. Rolled and layered with vegetable oil, pan-toasted on a heavy cast-iron skillet (tawa) until golden brown with flaky, buttery, tearable layers.',
    ingredients: ['Wheat Flour', 'Warm Water', 'Vegetable Oil / Ghee', 'Pinch of Sugar & Salt'],
    tasteProfile: 'Warm, soft, layered, buttery with slight crisp spots on outer edges.',
    recommendedPlaces: 'Breakfast joints, street side kiosks, and restaurants across all 47 counties.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 30 - 60 each',
    mustTry: true
  },
  {
    id: 'swahili-pilau',
    name: 'Swahili Spiced Pilau',
    swahiliName: 'Pilau ya Nyama ya Ng’ombe',
    pronunciation: 'PEE-lah-oo',
    category: 'Main Dish',
    description: 'A fragrant rice dish originating from the Swahili coast (Mombasa, Lamu, Malindi). Fragrant Basmati rice is slow-cooked in rich beef or goat broth infused with toasted whole pilau masala (cumin, cardamom, cinnamon, cloves, black peppercorn, and garlic ginger paste).',
    ingredients: ['Basmati Rice', 'Goat / Beef', 'Pilau Masala Spices', 'Caramelized Onions', 'Garlic & Ginger'],
    tasteProfile: 'Intensely aromatic, warm spices, savoury and festive.',
    recommendedPlaces: 'Swahili Plate Nairobi, Jahazi Coffee House Mombasa, Coastal Dhows',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 350 - 700 per plate',
    mustTry: true
  },
  {
    id: 'mandazi',
    name: 'Mandazi & Mahamri',
    swahiliName: 'Mandazi na Mahamri ya Nazi',
    pronunciation: 'mahn-DAH-zee / mah-HAHM-ree',
    category: 'Snack & Breakfast',
    description: 'Golden fried triangular Swahili dough pastries lightly sweetened and spiced with ground cardamom. Mahamri is made with rich coconut milk and yeast. Best enjoyed dipped into hot Kenyan ginger milk tea (Chai ya Tangawizi).',
    ingredients: ['Flour', 'Coconut Milk / Milk', 'Cardamom', 'Sugar', 'Yeast'],
    tasteProfile: 'Pillowy soft interior, subtle sweetness with warm aromatic cardamom aroma.',
    recommendedPlaces: 'Street vendors every morning from 6:00 AM, cafés across Nairobi and Mombasa.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 20 - 50 each',
    mustTry: true
  },
  {
    id: 'kenyan-chai',
    name: 'Kenyan Chai with Ginger (Chai ya Tangawizi)',
    swahiliName: 'Chai ya Maziwa na Tangawizi',
    pronunciation: 'CHAI yah tahn-gah-WEE-zee',
    category: 'Beverage',
    description: 'Kenya produces the world’s finest black tea from the lush misty hills of Kericho and Limuru. Kenyan chai is made by simmering rich CTC black tea leaves directly in whole fresh cow milk and water with freshly crushed root ginger until creamy and steaming hot.',
    ingredients: ['Kenyan Black Tea (Kericho Gold / Ketepa)', 'Fresh Milk', 'Crushed Ginger Root', 'Cardamom / Masala (Optional)', 'Cane Sugar'],
    tasteProfile: 'Rich, creamy, spicy warmth from ginger, rejuvenating.',
    recommendedPlaces: 'Available at every single café, tea room, and roadside stop.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    priceEstimateKES: 'KES 50 - 200 per cup',
    mustTry: true
  }
];

export const LOCAL_GUIDES: LocalGuide[] = [
  {
    id: 'guide-juma-maasai',
    name: 'Juma Ole Naserian',
    title: 'KWS Certified Silver Safari Guide & Maasai Tracker',
    badge: 'official',
    licenseNumber: 'KPSGA-SILVER-7821',
    experienceYears: 14,
    specialties: ['Big 5 Tracking', 'Big Cat Behavior & Migration', 'Maasai Bush Craft & Medicinal Plants', 'Wildlife Photography Guidance'],
    languages: ['English (Fluent)', 'Kiswahili (Native)', 'Maa (Native)', 'German (Conversational)'],
    dailyRateUSD: 70,
    dailyRateKES: 9135,
    hourlyRateUSD: 12,
    rating: 4.98,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Born and raised on the borders of the Maasai Mara. Having spent 14+ years in conservation and professional guiding, I love sharing the hidden secrets of the Mara plains with respectful international travelers.',
    location: 'Maasai Mara & Great Rift Valley',
    phone: '+254 722 901 345',
    email: 'juma.guide@explorekenya.org'
  },
  {
    id: 'guide-fatma-swahili',
    name: 'Fatma Bwana Mkuu',
    title: 'UNESCO Coastal Heritage & Lamu Historian',
    badge: 'verified',
    licenseNumber: 'NMK-HERITAGE-4410',
    experienceYears: 9,
    specialties: ['14th Century Swahili Architecture', 'Spice Route & Culinary Walks', 'Lamu Old Town Tours', 'Dhow Navigation'],
    languages: ['English', 'Kiswahili (Coastal Kibajuni)', 'Italian', 'French'],
    dailyRateUSD: 55,
    dailyRateKES: 7177,
    hourlyRateUSD: 10,
    rating: 4.95,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Proud Lamu native passionate about preserving the living Swahili traditions, intricate door carving stories, and guiding sunset dhow excursions.',
    location: 'Lamu Archipelago, Shela & Mombasa Old Town',
    phone: '+254 733 892 110',
    email: 'fatma.lamu@explorekenya.org'
  },
  {
    id: 'guide-eric-mount-kenya',
    name: 'Eric Mwangi Kariuki',
    title: 'Chief Alpine Trek Leader & Wilderness First Responder',
    badge: 'official',
    licenseNumber: 'KWS-ALPINIST-1092',
    experienceYears: 12,
    specialties: ['Mount Kenya Chogoria/Sirimon Summits', 'High-Altitude Acclimatization', 'Birding in Aberdares', 'Rock Climbing Safety'],
    languages: ['English', 'Kiswahili', 'Kikuyu', 'Spanish'],
    dailyRateUSD: 65,
    dailyRateKES: 8482,
    hourlyRateUSD: 12,
    rating: 4.97,
    reviewsCount: 288,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Summit leader with over 160 successful ascents of Point Lenana and Nelion. Certified in Wilderness Advanced First Aid and altitude emergency response.',
    location: 'Mount Kenya National Park & Nanyuki',
    phone: '+254 712 554 433',
    email: 'eric.alps@explorekenya.org'
  }
];

export const NEAR_ME_PLACES: NearMePlace[] = [
  {
    id: 'nm-1',
    name: 'Jomo Kenyatta International Airport (JKIA) Tourist Desk',
    category: 'sim',
    distanceKm: 0.2,
    isOpen: true,
    address: 'Terminal 1A & 1E Arrivals Hall, JKIA Nairobi',
    phone: '+254 20 661 1000',
    coordinates: { lat: -1.3192, lng: 36.9275 },
    notes: 'Safaricom & Airtel 5G Tourist SIM cards, eSIM activation, M-PESA setup'
  },
  {
    id: 'nm-2',
    name: 'Tourist Police Unit (TPU) Command Post',
    category: 'police',
    distanceKm: 0.5,
    isOpen: true,
    address: 'JKIA Airport Police Station & Old Mutual Building, Upper Hill',
    phone: '+254 800 720 024',
    emergencyOnly: true,
    coordinates: { lat: -1.3150, lng: 36.9200 },
    notes: 'Dedicated 24/7 tourist assistance, security escorts, lost travel document reports'
  },
  {
    id: 'nm-3',
    name: 'Nairobi Hospital Outpatient Centre (Airport / CBD)',
    category: 'hospital',
    distanceKm: 1.8,
    isOpen: true,
    address: 'Nairobi Hospital, Argwings Kodhek Rd, Hurlingham, Nairobi',
    phone: '+254 703 082 000',
    emergencyOnly: true,
    coordinates: { lat: -1.2974, lng: 36.8045 },
    notes: 'Premier level 6 multi-specialty hospital, travel medicine, yellow fever clinic & ICU'
  },
  {
    id: 'nm-4',
    name: 'KCB & Equity Bank 24/7 ATM & Forex Hub',
    category: 'atm',
    distanceKm: 0.1,
    isOpen: true,
    address: 'JKIA Terminal 1 Arrivals Corridor',
    coordinates: { lat: -1.3190, lng: 36.9270 },
    notes: 'Accepts Visa, Mastercard, Maestro, UnionPay, American Express. Cash dispense in KES and USD.'
  },
  {
    id: 'nm-5',
    name: 'Official Yellow Airport Taxi & Uber Staging Zone',
    category: 'transport',
    distanceKm: 0.3,
    isOpen: true,
    address: 'JKIA Terminal 1A/1E Dedicated Ride-Hailing Bay',
    phone: '+254 700 000 000',
    coordinates: { lat: -1.3200, lng: 36.9280 },
    notes: 'Direct Nairobi Expressway access to Westlands / CBD in 15 minutes flat'
  },
  {
    id: 'nm-6',
    name: 'Nairobi National Park Main Gate (KWS)',
    category: 'attraction',
    distanceKm: 7.5,
    rating: 4.8,
    isOpen: true,
    address: 'Langata Road, Nairobi',
    phone: '+254 20 242 3423',
    coordinates: { lat: -1.3667, lng: 36.8333 },
    notes: 'Lions, Black Rhinos, and Leopards with city skyscrapers in the background'
  },
  {
    id: 'nm-7',
    name: 'Carnivore Restaurant & Simba Saloon',
    category: 'restaurant',
    distanceKm: 8.2,
    rating: 4.7,
    isOpen: true,
    address: 'Langata Road, Nairobi',
    phone: '+254 733 611 608',
    coordinates: { lat: -1.3275, lng: 36.8055 },
    notes: 'Iconic open-pit charcoal roasted meats and Dawa cocktail'
  },
  {
    id: 'nm-8',
    name: 'Goodlife 24/7 Pharmacy Hub',
    category: 'pharmacy',
    distanceKm: 1.2,
    isOpen: true,
    address: 'Airport Center Mall & The Hub Karen',
    phone: '+254 711 088 000',
    coordinates: { lat: -1.3160, lng: 36.9210 },
    notes: 'Malaria prevention, insect repellents, first aid, rehydration salts'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    name: 'National Police & Emergency Hotline',
    category: 'Police',
    phone: '999 / 112 / 911',
    tollFree: true,
    availableHours: '24 Hours / 7 Days',
    description: 'National centralized emergency dispatch for Kenya Police, Fire, and Ambulance.'
  },
  {
    id: 'em-2',
    name: 'Tourist Police Unit (TPU) Kenya',
    category: 'Tourist Police',
    phone: '+254 800 720 024',
    tollFree: true,
    availableHours: '24/7 Toll-Free Tourist Helpline',
    description: 'Specialized police division dedicated strictly to tourist safety, assistance, scams, and dispute resolutions.',
    address: 'Old Mutual Building, Corner of Mara Road, Upper Hill, Nairobi'
  },
  {
    id: 'em-3',
    name: 'AMREF Flying Doctors (Emergency Air Evacuation)',
    category: 'Medical / Ambulance',
    phone: '+254 20 699 2299',
    tollFree: false,
    availableHours: '24/7 Emergency Air Response',
    description: 'Aero-medical evacuation service providing rapid response by plane or helicopter from any remote safari camp or bush airstrip.',
    address: 'Wilson Airport, Langata Road, Nairobi'
  },
  {
    id: 'em-4',
    name: 'Kenya Red Cross Emergency Dispatch',
    category: 'Medical / Ambulance',
    phone: '1199 / +254 703 037 000',
    tollFree: true,
    availableHours: '24/7 Nationwide Ambulance',
    description: 'Rapid ambulance medical dispatch across all 47 Kenyan counties.'
  },
  {
    id: 'em-5',
    name: 'Kenya Wildlife Service (KWS) 24hr Incident Desk',
    category: 'Wildlife Emergency',
    phone: '0800 597 000 / +254 726 610 508',
    tollFree: true,
    availableHours: '24/7 Ranger Dispatch',
    description: 'For wildlife emergencies, human-wildlife encounters, or park security.'
  },
  {
    id: 'em-6',
    name: 'United States Embassy in Nairobi',
    category: 'Embassy',
    phone: '+254 20 363 6000',
    availableHours: 'Emergency American Citizen Services 24/7',
    description: 'Consular and emergency passport assistance for US citizens.',
    address: 'United Nations Avenue, Gigiri, Nairobi'
  },
  {
    id: 'em-7',
    name: 'British High Commission Nairobi',
    category: 'Embassy',
    phone: '+254 20 287 3000 / +254 20 284 4000',
    availableHours: '24/7 Emergency Assistance',
    description: 'Emergency consular assistance for UK nationals.',
    address: 'Upper Hill Road, Nairobi'
  },
  {
    id: 'em-8',
    name: 'German Embassy Nairobi (Deutsche Botschaft)',
    category: 'Embassy',
    phone: '+254 20 426 2100',
    availableHours: '24/7 Emergency Consular',
    description: 'Emergency passport and consular assistance for German and EU citizens.',
    address: 'Riverside Drive 113, Nairobi'
  }
];

export const SWAHILI_PHRASES: SwahiliPhrase[] = [
  {
    id: 'ph-1',
    category: 'Greetings & Basics',
    english: 'Hello / Welcome to Kenya!',
    swahili: 'Jambo! / Karibu Kenya!',
    pronunciation: 'JAHM-boh / kah-REE-boo KEHN-yah',
    contextNote: 'Universal warm greeting used across East Africa.'
  },
  {
    id: 'ph-2',
    category: 'Greetings & Basics',
    english: 'How are you? — I am fine, no worries (Hakuna Matata).',
    swahili: 'Habari yako? — Mzuri sana, Hakuna Matata.',
    pronunciation: 'hah-BAH-ree YAH-koh? — mm-ZOO-ree SAH-nah, hah-KOO-nah mah-TAH-tah',
    contextNote: 'Standard conversational greeting.'
  },
  {
    id: 'ph-3',
    category: 'Greetings & Basics',
    english: 'Thank you very much / You are welcome.',
    swahili: 'Asante sana / Karibu.',
    pronunciation: 'ah-SAHN-teh SAH-nah / kah-REE-boo',
    contextNote: 'Politeness is highly valued in Kenyan culture.'
  },
  {
    id: 'ph-4',
    category: 'Transport & Directions',
    english: 'Where is the hotel / airport?',
    swahili: 'Hoteli / uwanja wa ndege uko wapi?',
    pronunciation: 'hoh-TEH-lee / oo-WAHN-jah wah n-DEH-geh OO-koh WAH-pee?',
    contextNote: 'Use when asking directions from drivers or locals.'
  },
  {
    id: 'ph-5',
    category: 'Transport & Directions',
    english: 'I need a taxi to Westlands / Diani.',
    swahili: 'Nahitaji teksi kwenda Westlands / Diani.',
    pronunciation: 'nah-hee-TAH-jee TEHK-see KWEHN-dah...',
    contextNote: 'Clear and direct request for transport.'
  },
  {
    id: 'ph-6',
    category: 'Bargaining & Shopping',
    english: 'How much is this? What is your final price?',
    swahili: 'Hii ni bei gani? Bei ya mwisho ni ngapi?',
    pronunciation: 'HEE-ee nee bay GAH-nee? Bay yah MWEE-shoh nee NGAH-pee?',
    contextNote: 'Friendly bargaining is normal in Maasai markets.'
  },
  {
    id: 'ph-7',
    category: 'Dining & Food',
    english: 'I would like to try Nyama Choma and Ugali.',
    swahili: 'Ningependa kujaribu Nyama Choma na Ugali.',
    pronunciation: 'neen-geh-PEHN-dah koo-jah-REE-boo NYAH-mah CHO-mah nah oo-GAH-lee.',
    contextNote: 'Ordering the national specialty dish.'
  },
  {
    id: 'ph-8',
    category: 'Dining & Food',
    english: 'Please bring drinking water / bill.',
    swahili: 'Tafadhali lete maji ya kunywa / bili.',
    pronunciation: 'tah-fah-DHAH-lee LEH-teh MAH-jee yah KOON-ywah / BEE-lee.',
    contextNote: 'Useful for restaurant service.'
  },
  {
    id: 'ph-9',
    category: 'Emergency & Health',
    english: 'Please help me! I need a doctor / police.',
    swahili: 'Tafadhali nisaidie! Nahitaji daktari / polisi.',
    pronunciation: 'tah-fah-DHAH-lee nee-sy-DEE-eh! nah-hee-TAH-jee dahk-TAH-ree / poh-LEE-see.',
    contextNote: 'Important emergency phrase.'
  },
  {
    id: 'ph-10',
    category: 'Safari & Wildlife',
    english: 'Lion (Simba), Elephant (Tembo), Rhino (Kifaru), Leopard (Chui), Giraffe (Twiga)',
    swahili: 'Simba, Tembo / Ndovu, Kifaru, Chui, Twiga',
    pronunciation: 'SEEM-bah, TEHM-boh, kee-FAH-roo, CHOO-ee, TWEE-gah',
    contextNote: 'The core Big 5 Swahili animal names for game drives!'
  }
];

export const SIM_PACKAGES: SIMPackage[] = [
  {
    provider: 'Safaricom',
    type: 'Physical SIM + eSIM',
    packageName: 'Karibu Kenya Tourist Ultra 5G',
    dataGB: '30 GB 5G/4G High Speed',
    durationDays: 30,
    priceKES: 3000,
    priceUSD: 23,
    includesMinutes: '400 Local Mins + 50 Intl Mins + 1000 SMS',
    features: [
      'Instant M-PESA mobile money wallet enabled (pay everywhere with phone)',
      'Fastest nationwide 5G/4G coverage including remote national parks',
      'Free WhatsApp messaging after data limit',
      'Official counter at JKIA arrivals hall (open 24/7)'
    ],
    airportAvailable: true,
    mPesaSupported: true
  },
  {
    provider: 'Airtel',
    type: 'Physical SIM + eSIM',
    packageName: 'Airtel Kenya Tourist Plus',
    dataGB: '25 GB 4G High Speed',
    durationDays: 30,
    priceKES: 2000,
    priceUSD: 15.3,
    includesMinutes: '300 Local Mins + 30 Intl Mins',
    features: [
      'Airtel Money enabled',
      'Affordable international calling rates to US/Europe/India',
      'Available at JKIA Terminal 1A and CBD stores'
    ],
    airportAvailable: true,
    mPesaSupported: false
  },
  {
    provider: 'Airalo eSIM',
    type: 'eSIM Only',
    packageName: 'Kenya Airalo Habari eSIM (Digital Download)',
    dataGB: '10 GB High Speed',
    durationDays: 30,
    priceKES: 3650,
    priceUSD: 28,
    includesMinutes: 'Data only (Use WhatsApp/FaceTime for calls)',
    features: [
      'Instant QR code activation before departing home country',
      'No physical SIM swap needed',
      'Connects to Safaricom network upon landing at JKIA/Moi Airport'
    ],
    airportAvailable: true,
    mPesaSupported: false
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Safari Rally Kenya (WRC Naivasha)',
    category: 'Sport & Rally',
    date: 'March 26 - 29, 2026',
    location: 'Lake Naivasha & Hell’s Gate, Rift Valley',
    priceKES: 3500,
    priceUSD: 26.8,
    description: 'The world’s most demanding World Rally Championship fixture. High-speed rally machines powering through rough volcanic dust, mud, and breathtaking wildlife savannas.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    organizer: 'WRC Safari Rally Project Kenya'
  },
  {
    id: 'ev-2',
    title: 'Blankets & Wine Nairobi Live Festival',
    category: 'Music & Festival',
    date: 'First Sunday Every Quarter',
    location: 'Laureat Gardens, Kasarani, Nairobi',
    priceKES: 4000,
    priceUSD: 30.6,
    description: 'East Africa’s premier urban music, fashion, food, and culture festival bringing together live Afro-fusion bands, culinary pop-ups, and Kenyan craft creators.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    organizer: 'House of Funk / B&W Kenya'
  },
  {
    id: 'ev-3',
    title: 'Lamu Cultural Heritage Festival',
    category: 'Cultural',
    date: 'November 19 - 22, 2026',
    location: 'Lamu Old Town UNESCO Island, Coast',
    priceKES: 0,
    priceUSD: 0,
    description: 'An enchanting multi-day celebration of ancient Swahili traditions featuring exhilarating dhow sailing races across the channel, traditional donkey races, henna art, Swahili poetry, and coastal feasts.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    organizer: 'Lamu Tourism Association'
  }
];

export const DEALS: DealItem[] = [
  {
    id: 'deal-1',
    title: 'Maasai Mara Migration Special — 25% Off 4x4 Land Cruiser Safari',
    category: 'Safari Package',
    discountPercent: 25,
    originalPriceUSD: 650,
    discountedPriceUSD: 490,
    expiresInDays: 6,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Book online this week for all-inclusive 3-day luxury tented accommodation, game drives, and park permits.',
    provider: 'Bush & Beyond Safaris',
    code: 'MARA25'
  },
  {
    id: 'deal-2',
    title: 'Diani Beach Honeymoon & Villa Retreat — 30% Off All-Inclusive',
    category: 'Beach Resort',
    discountPercent: 30,
    originalPriceUSD: 340,
    discountedPriceUSD: 238,
    expiresInDays: 9,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Oceanfront suite with private plunge pool, daily champagne breakfast, and complimentary sunset dhow cruise.',
    provider: 'The Sands at Nomad',
    code: 'DIANI30'
  }
];

export const PHOTO_GALLERY = [
  {
    id: 'pg-1',
    title: 'Kenyan Savanna Rhinos at Solio & Lake Nakuru',
    location: 'Solio Ranch / Lake Nakuru National Park',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    caption: 'Protected white and black rhinos grazing peacefully under acacia thorn trees in the Kenyan heartland.'
  },
  {
    id: 'pg-2',
    title: 'Mount Kenya Afro-Alpine Peaks & Giant Senecios',
    location: 'Mount Kenya National Park (Gorges Valley)',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80',
    caption: 'Surreal prehistoric flora (Dendrosenecio keniensis) flourishing in the high-altitude volcanic valleys of Mount Kenya.'
  },
  {
    id: 'pg-3',
    title: 'Elephants under Mount Kilimanjaro in Amboseli',
    location: 'Amboseli National Park',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
    caption: 'Matriarch herd traversing the golden grasslands with the snowfields of Kilimanjaro glowing in the morning light.'
  },
  {
    id: 'pg-4',
    title: 'Great Rift Valley Escarpment Panorama',
    location: 'Mai Mahiu / Great Rift Valley Viewpoint',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    caption: 'The vast geological rift splitting the continent, extending as far as the eye can see towards extinct volcanoes.'
  },
  {
    id: 'pg-5',
    title: 'Diani Beach Turquoise Indian Ocean Coast',
    location: 'Diani Beach, Kwale County',
    category: 'Coast',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Powder-soft white sands met by warm tropical turquoise waves and traditional wooden fishing dhows.'
  },
  {
    id: 'pg-6',
    title: 'Pride of Lions on Maasai Mara Plains',
    location: 'Maasai Mara National Reserve',
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    caption: 'A majestic male lion scanning the savanna during the height of the Great Wildebeest Migration.'
  },
  {
    id: 'pg-7',
    title: 'Nairobi Modern Skyline & Wildlife Edge',
    location: 'Nairobi National Park & CBD',
    category: 'Landscape',
    image: 'https://images.unsplash.com/photo-1609137144822-476722d3b259?auto=format&fit=crop&w=1200&q=80',
    caption: 'Endangered Rothschild giraffes grazing freely just 7 kilometers from towering capital city skyscrapers.'
  },
  {
    id: 'pg-8',
    title: 'Authentic Swahili Dhows & Lamu Archipelago',
    location: 'Lamu Old Town & Shela',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted wooden sailing dhows gliding across the Indian Ocean.'
  }
];

export const NEARBY_SERVICES = NEAR_ME_PLACES;

export const EMBASSIES = [
  {
    id: 'emb-us',
    country: 'United States of America',
    flag: '🇺🇸',
    name: 'Embassy of the United States',
    address: 'United Nations Avenue, Gigiri, Nairobi',
    phone: '+254 20 363 6000',
    emergencyPhone: '+254 20 363 6170',
    email: 'NairobiACS@state.gov',
    region: 'Gigiri / Diplomatic Blue Zone'
  },
  {
    id: 'emb-uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    name: 'British High Commission Nairobi',
    address: 'Upper Hill Road, Nairobi',
    phone: '+254 20 287 3000',
    emergencyPhone: '+254 20 287 3000',
    email: 'nairobi.enquiries@fcdo.gov.uk',
    region: 'Upper Hill'
  },
  {
    id: 'emb-de',
    country: 'Germany (Federal Republic of Germany)',
    flag: '🇩🇪',
    name: 'Deutsche Botschaft Nairobi',
    address: 'Riverside Drive 113, Nairobi',
    phone: '+254 20 426 2100',
    emergencyPhone: '+254 721 322 414',
    email: 'info@nairobi.diplo.de',
    region: 'Riverside / Westlands'
  },
  {
    id: 'emb-fr',
    country: 'France',
    flag: '🇫🇷',
    name: 'Ambassade de France à Nairobi',
    address: 'Peponi Gardens, Off Peponi Road, Westlands, Nairobi',
    phone: '+254 20 760 5555',
    emergencyPhone: '+254 733 605 555',
    email: 'admin-francais.nairobi-amba@diplomatie.gouv.fr',
    region: 'Westlands / Spring Valley'
  },
  {
    id: 'emb-ca',
    country: 'Canada',
    flag: '🇨🇦',
    name: 'High Commission of Canada in Kenya',
    address: 'Limuru Road, Gigiri, Nairobi',
    phone: '+254 20 360 8000',
    emergencyPhone: '+1 613 996 8885',
    email: 'nrobi-cs@international.gc.ca',
    region: 'Gigiri'
  },
  {
    id: 'emb-au',
    country: 'Australia',
    flag: '🇦🇺',
    name: 'Australian High Commission',
    address: 'Limuru Road, Gigiri, Nairobi',
    phone: '+254 20 427 7100',
    emergencyPhone: '+61 2 6261 3305',
    email: 'consular.nairobi@dfat.gov.au',
    region: 'Gigiri'
  },
  {
    id: 'emb-in',
    country: 'India',
    flag: '🇮🇳',
    name: 'High Commission of India Nairobi',
    address: '3, Parklands Road, Nairobi',
    phone: '+254 20 222 2566',
    emergencyPhone: '+254 733 641 234',
    email: 'cons.nairobi@mea.gov.in',
    region: 'Parklands'
  },
  {
    id: 'emb-it',
    country: 'Italy',
    flag: '🇮🇹',
    name: 'Ambasciata d\'Italia Nairobi',
    address: 'UN Crescent, Gigiri, Nairobi',
    phone: '+254 20 513 7500',
    emergencyPhone: '+254 722 514 063',
    email: 'consolare.nairobi@esteri.it',
    region: 'Gigiri'
  },
  {
    id: 'emb-cn',
    country: 'People\'s Republic of China',
    flag: '🇨🇳',
    name: 'Embassy of the People\'s Republic of China',
    address: 'Woodlands Road, Kilimani, Nairobi',
    phone: '+254 20 272 6851',
    emergencyPhone: '+254 717 070 214',
    email: 'chinaemb_ke@mfa.gov.cn',
    region: 'Kilimani'
  }
];

