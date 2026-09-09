// Kenya Comprehensive Geographic Database covering all 47 counties,
// towns, national parks, wildlife reserves, cultural landmarks,
// transport hubs, hospitals, police stations, viewpoints, and services.

export interface KenyaCounty {
  code: string; // "001" - "047"
  name: string;
  capital: string;
  region: 'Coast' | 'North Eastern' | 'Eastern' | 'Central' | 'Rift Valley' | 'Western' | 'Nyanza' | 'Nairobi';
  center: { lat: number; lng: number };
  zoom: number;
  overview: string;
  highlights: string[];
  keyTowns: string[];
  signatureWildlife: string[];
  terrain: string;
  safetyAdvice: string;
}

export type GeoCategory =
  | 'park'
  | 'beach'
  | 'mountain'
  | 'nature'
  | 'town'
  | 'hotel'
  | 'restaurant'
  | 'airport'
  | 'transport'
  | 'hospital'
  | 'police'
  | 'atm'
  | 'fuel'
  | 'culture'
  | 'viewpoint'
  | 'activity';

export interface GeoLocationRecord {
  id: string;
  name: string;
  aliasNames?: string[];
  county: string;
  countyCode: string;
  town: string;
  area?: string;
  address: string;
  category: GeoCategory;
  categoryLabel: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  openingHours?: string;
  contactPhone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  entryFeeUSD?: number;
  entryFeeKES?: number;
  googlePlaceId?: string;
  accessibilityNotes?: string;
  safetyTips?: string;
  nearbyAttractionIds?: string[];
  nearbyHotelIds?: string[];
  nearbyRestaurantIds?: string[];
  linkedPackageIds?: string[];
}

export const ALL_KENYA_COUNTIES: KenyaCounty[] = [
  {
    code: '001',
    name: 'Mombasa',
    capital: 'Mombasa City',
    region: 'Coast',
    center: { lat: -4.0435, lng: 39.6682 },
    zoom: 12,
    overview: 'Kenya’s historic coastal metropolis, featuring UNESCO World Heritage Fort Jesus, Old Town Swahili architecture, Nyali & Bamburi beaches, and vibrant port trade.',
    highlights: ['Fort Jesus UNESCO Site', 'Old Town Mombasa', 'Nyali Beach', 'Haller Park', 'Mombasa Marine Park'],
    keyTowns: ['Mombasa Island', 'Nyali', 'Bamburi', 'Likoni', 'Miritini'],
    signatureWildlife: ['Dolphins', 'Humpback Whales (seasonal)', 'Giant Aldabra Tortoises', 'Coral Reef Fish'],
    terrain: 'Coastal island, sandy beaches, coral reefs, mangrove creeks',
    safetyAdvice: 'Exercise regular city precautions in crowded markets; use licensed taxis or Tuk-Tuks.'
  },
  {
    code: '002',
    name: 'Kwale',
    capital: 'Kwale',
    region: 'Coast',
    center: { lat: -4.1816, lng: 39.4521 },
    zoom: 11,
    overview: 'Home to world-renowned Diani Beach, Shimba Hills National Reserve with rare sable antelopes, and Kisite Mpunguti Marine Reserve.',
    highlights: ['Diani Beach', 'Shimba Hills Reserve', 'Kisite-Mpunguti Marine Park', 'Wasini Island Dolphin Dhows', 'Chale Island'],
    keyTowns: ['Diani / Ukunda', 'Kwale Town', 'Msambweni', 'Lunga Lunga', 'Kinango'],
    signatureWildlife: ['Sable Antelopes', 'Colobus Monkeys', 'Bottlenose Dolphins', 'Sea Turtles', 'Elephants'],
    terrain: 'Pristine white sand coastal strip rising into coastal rainforest hills',
    safetyAdvice: 'Swim within designated reef zones; follow marine park guide directions.'
  },
  {
    code: '003',
    name: 'Kilifi',
    capital: 'Kilifi',
    region: 'Coast',
    center: { lat: -3.5107, lng: 39.8499 },
    zoom: 10,
    overview: 'Famed for picturesque Kilifi Creek, the pristine beaches of Watamu & Malindi, Gedi Ruins, and Arabuko Sokoke Forest.',
    highlights: ['Watamu Marine Park', 'Gedi Ruins', 'Arabuko Sokoke Forest', 'Malindi Marine Park', 'Marafa Hell’s Kitchen', 'Kilifi Creek'],
    keyTowns: ['Kilifi', 'Watamu', 'Malindi', 'Mtwapa', 'Mariakani'],
    signatureWildlife: ['Green Sea Turtles', 'Golden-rumped Elephant Shrew', 'Sokoke Scops Owl', 'Spotted Dolphins'],
    terrain: 'Coral limestone coastline, sandy coves, coastal dry forest, coastal creeks',
    safetyAdvice: 'Respect marine sanctuary regulations; support community eco-guides.'
  },
  {
    code: '004',
    name: 'Tana River',
    capital: 'Hola',
    region: 'Coast',
    center: { lat: -1.5, lng: 39.8 },
    zoom: 9,
    overview: 'Named after Kenya’s longest river, harboring the endangered Tana River red colobus, riverine forests, and the vast Tana Delta.',
    highlights: ['Tana River Primate Reserve', 'Tana River Delta', 'Kipini Beach Estuary'],
    keyTowns: ['Hola', 'Garsen', 'Bura', 'Kipini'],
    signatureWildlife: ['Tana River Red Colobus', 'Tana Crested Mangabey', 'Hippos', 'Nile Crocodiles'],
    terrain: 'Alluvial river floodplains, delta wetlands, semi-arid scrub',
    safetyAdvice: 'Travel with organized safari guides when exploring delta waterways.'
  },
  {
    code: '005',
    name: 'Lamu',
    capital: 'Lamu',
    region: 'Coast',
    center: { lat: -2.2696, lng: 40.9006 },
    zoom: 11,
    overview: 'The oldest living Swahili settlement in East Africa, featuring car-free coral stone streets, traditional dhow sailing, and pristine archipelago beaches.',
    highlights: ['Lamu Old Town (UNESCO)', 'Shela Beach & Dunes', 'Manda Island', 'Pate Island', 'Kiunga Marine Reserve'],
    keyTowns: ['Lamu Island', 'Shela', 'Mokowe', 'Manda'],
    signatureWildlife: ['Dugongs (rare)', 'Sea Turtles', 'Humpback Whales', 'Mangrove Crabs'],
    terrain: 'Coral rag archipelago, sandy tidal channels, mangrove forests',
    safetyAdvice: 'Dress respectfully in town areas; enjoy peaceful walking and dhow navigation.'
  },
  {
    code: '006',
    name: 'Taita-Taveta',
    capital: 'Mwatate',
    region: 'Coast',
    center: { lat: -3.4, lng: 38.35 },
    zoom: 10,
    overview: 'Home to the legendary Tsavo West and Tsavo East National Parks, Taita Hills sanctuaries, Mzima Springs, and panoramic volcanic hills.',
    highlights: ['Tsavo West National Park', 'Mzima Springs', 'Shetani Lava Flow', 'Taita Hills Wildlife Sanctuary', 'Lake Jipe', 'Lake Chala'],
    keyTowns: ['Voi', 'Mwatate', 'Wundanyi', 'Taveta'],
    signatureWildlife: ['Dust-red Elephants', 'Lions', 'Leopards', 'Hippos', 'Taita Thrush', 'Giraffes'],
    terrain: 'Volcanic cones, dry acacia savanna, cloud forest peaks, crater lakes',
    safetyAdvice: 'Always carry drinking water; keep to designated park trails.'
  },
  {
    code: '007',
    name: 'Garissa',
    capital: 'Garissa',
    region: 'North Eastern',
    center: { lat: -0.4532, lng: 39.646 },
    zoom: 9,
    overview: 'Eastern gate to the arid northern frontier, bordered by the Tana River and home to the endangered Hirola antelope sanctuary.',
    highlights: ['Ishaqbini Hirola Community Conservancy', 'Bour-Algi Giraffe Sanctuary', 'Tana River bank views'],
    keyTowns: ['Garissa Town', 'Masalani', 'Modogashe', 'Balambala'],
    signatureWildlife: ['Hirola (Hunter’s Hartebeest)', 'Reticulated Giraffes', 'Oryx', 'Gerenuk'],
    terrain: 'Semi-arid bushland, low acacia plains, riverine riparian belt',
    safetyAdvice: 'Check local travel advisories and coordinate through registered community conservancies.'
  },
  {
    code: '008',
    name: 'Wajir',
    capital: 'Wajir',
    region: 'North Eastern',
    center: { lat: 1.7471, lng: 40.0573 },
    zoom: 8,
    overview: 'Vast nomadic heritage in Kenya’s northeast with historic colonial forts, limestone wells, and resilient camel pastoralist cultures.',
    highlights: ['Wajir Historic Fort', 'Wajir Museum', 'Orahey Wells', 'Nomadic Camel Caravans'],
    keyTowns: ['Wajir Town', 'Habaswein', 'Bute', 'Eldas'],
    signatureWildlife: ['Somali Ostrich', 'Gerenuk', 'Vulturine Guineafowl', 'Dromedary Camels'],
    terrain: 'Red sandy desert scrub, limestone ridges, thorn savanna',
    safetyAdvice: 'Best visited with local tour operators and pre-planned accommodations.'
  },
  {
    code: '009',
    name: 'Mandera',
    capital: 'Mandera',
    region: 'North Eastern',
    center: { lat: 3.9373, lng: 41.8569 },
    zoom: 8,
    overview: 'The tri-border point of Kenya, Ethiopia, and Somalia along the Daua River, featuring dramatic sand dunes and pastoral landscapes.',
    highlights: ['Daua River Valley', 'Malka Mari National Park', 'Ramu Hills'],
    keyTowns: ['Mandera Town', 'Ramu', 'Elwak', 'Takaba'],
    signatureWildlife: ['Grevy’s Zebra', 'Dik-diks', 'Desert Pharoah Eagles'],
    terrain: 'Arid sandstone plateaus, river gorge, acacia thickets',
    safetyAdvice: 'Coordinate excursions through regional authorities.'
  },
  {
    code: '010',
    name: 'Marsabit',
    capital: 'Marsabit',
    region: 'Eastern',
    center: { lat: 2.3369, lng: 37.99 },
    zoom: 8,
    overview: 'A volcanic paradise in the northern desert, featuring mist-shrouded Mount Marsabit, Lake Paradise, the Chalbi Desert, and Lake Turkana’s eastern shores.',
    highlights: ['Marsabit National Park & Lake Paradise', 'Chalbi Desert', 'Lake Turkana & Kalacha Oasis', 'Mount Kulal Biosphere'],
    keyTowns: ['Marsabit Town', 'Moyale', 'North Horr', 'Laisamis', 'Loiyangalani'],
    signatureWildlife: ['Giant Tusker Elephants (Ahmed legacy)', 'Greater Kudu', 'Grevy’s Zebra', 'Reticulated Giraffes'],
    terrain: 'High volcanic cloud forest surrounded by basalt lava fields and white salt flats',
    safetyAdvice: 'Use 4x4 vehicles equipped with dual spare wheels for desert crossings.'
  },
  {
    code: '011',
    name: 'Isiolo',
    capital: 'Isiolo',
    region: 'Eastern',
    center: { lat: 0.3546, lng: 37.5822 },
    zoom: 10,
    overview: 'The gateway to northern Kenya and home to Buffalo Springs and Shaba National Reserves along the life-giving Ewaso Nyiro River.',
    highlights: ['Buffalo Springs National Reserve', 'Shaba National Reserve', 'Magado Crater (Gotu)', 'Ewaso Nyiro River Oasis'],
    keyTowns: ['Isiolo Town', 'Garbatulla', 'Merti'],
    signatureWildlife: ['Samburu Special 5', 'Lions', 'Cheetahs', 'Nile Crocodiles'],
    terrain: 'Acacia bushland, volcanic ridges, river springs, dramatic inselbergs',
    safetyAdvice: 'Ensure 4x4 transport; respect reserve park rangers.'
  },
  {
    code: '012',
    name: 'Meru',
    capital: 'Meru',
    region: 'Eastern',
    center: { lat: 0.05, lng: 37.65 },
    zoom: 10,
    overview: 'Lush fertile volcanic slopes of Mount Kenya leading into the untamed wilderness of Meru National Park, home of Joy Adamson’s Elsa the Lioness.',
    highlights: ['Meru National Park', 'Mount Kenya Chogoria Route', 'Imenti Forest Sanctuary', 'Nyambene Hills'],
    keyTowns: ['Meru Town', 'Nkubu', 'Maua', 'Timau'],
    signatureWildlife: ['Rhinos (Meru Rhino Sanctuary)', 'Lions', 'Elephants', 'Bohor Reedbuck', 'Pel’s Fishing Owl'],
    terrain: 'High mountain rainforest transitioning into savanna streams and baobab plains',
    safetyAdvice: 'Enjoy world-class guided safaris with high wildlife density and low tourist traffic.'
  },
  {
    code: '013',
    name: 'Tharaka-Nithi',
    capital: 'Kathwana',
    region: 'Eastern',
    center: { lat: -0.3, lng: 37.9 },
    zoom: 10,
    overview: 'Eastern slopes of Mount Kenya boasting majestic waterfalls, deep gorges, and access to Mount Kenya National Park via the scenic Chogoria trail.',
    highlights: ['Mount Kenya Chogoria Gate', 'Nithi Falls', 'Lake Ellis', 'Vivienne Falls', 'Kathwana Cultural Center'],
    keyTowns: ['Chuka', 'Chogoria', 'Kathwana', 'Marimanti'],
    signatureWildlife: ['Mountain Bongo (rare)', 'Black-fronted Duikers', 'Colobus Monkeys', 'Giant Forest Hogs'],
    terrain: 'Gorges, waterfalls, bamboo alpine forest, afro-alpine moorland',
    safetyAdvice: 'Dress warmly for high-altitude hikes; travel with certified guides.'
  },
  {
    code: '014',
    name: 'Embu',
    capital: 'Embu',
    region: 'Eastern',
    center: { lat: -0.53, lng: 37.45 },
    zoom: 11,
    overview: 'Nestled on Mount Kenya’s southeastern slopes, famous for terraced tea and coffee estates, Mwea National Reserve, and Seven Forks hydroelectric dams.',
    highlights: ['Mwea National Reserve', 'Karue Hill Viewpoint', 'Nthenge Njeru Falls', 'Seven Forks Hydro Dams'],
    keyTowns: ['Embu Town', 'Runyenjes', 'Siakago', 'Kiritiri'],
    signatureWildlife: ['Pelicans', 'Hippos', 'Buffalos', 'Sykes Monkeys'],
    terrain: 'Verdant river gorges, rolling volcanic foothills, scenic granite kopjes',
    safetyAdvice: 'Great for agritourism and hiking adventures.'
  },
  {
    code: '015',
    name: 'Kitui',
    capital: 'Kitui',
    region: 'Eastern',
    center: { lat: -1.3667, lng: 38.0167 },
    zoom: 9,
    overview: 'Vast eastern plateau celebrated for woodcarving artisans, dryland biodiversity, Mutomo Reptile Park, and South Kitui National Reserve.',
    highlights: ['Nzambani Rock', 'Mutomo Reptile Park & Plant Sanctuary', 'South Kitui National Reserve', 'Ikoo Valley'],
    keyTowns: ['Kitui Town', 'Mwingi', 'Mutomo', 'Kyuso'],
    signatureWildlife: ['Elephants', 'Klipspringers', 'Puff Adders', 'Leopards'],
    terrain: 'Semi-arid bushland, dramatic granite monoliths (Nzambani)',
    safetyAdvice: 'Climb Nzambani rock using the installed safety staircases.'
  },
  {
    code: '016',
    name: 'Machakos',
    capital: 'Machakos',
    region: 'Eastern',
    center: { lat: -1.5177, lng: 37.2634 },
    zoom: 10,
    overview: 'Kenya’s first capital city, featuring the Machakos People’s Park, Ol Donyo Sabuk National Park, hiking trails, and Kyamwilu anti-gravity hill.',
    highlights: ['Machakos People’s Park', 'Ol Donyo Sabuk National Park & Fourteen Falls', 'Kyamwilu Gravity Hill', 'Lukenya Hills'],
    keyTowns: ['Machakos Town', 'Athi River', 'Kangundo', 'Tala', 'Mwala'],
    signatureWildlife: ['Cape Buffalos', 'Bushbucks', 'Baboons', 'Over 100 bird species'],
    terrain: 'Granite hills, river waterfalls, expansive savanna plains',
    safetyAdvice: 'Enjoy rock climbing at Lukenya with proper safety gear.'
  },
  {
    code: '017',
    name: 'Makueni',
    capital: 'Wote',
    region: 'Eastern',
    center: { lat: -1.8, lng: 37.6 },
    zoom: 10,
    overview: 'A scenic hilly county featuring the northern gateway to Chyulu Hills, world-class mango orchards, SGR stations, and Tsavo borderlands.',
    highlights: ['Chyulu Hills North Gate', 'Kikima Fruit Valley', 'SGR Emali & Mtito Andei Stations', 'Nzaui Hill'],
    keyTowns: ['Wote', 'Emali', 'Makindu', 'Mtito Andei', 'Sultan Hamud'],
    signatureWildlife: ['Giraffes', 'Zebras', 'Cheetahs', 'Elands'],
    terrain: 'Rolling emerald green volcanic hills, dry savanna plains',
    safetyAdvice: 'Mtito Andei is a major safari rest stop with full fuel & dining amenities.'
  },
  {
    code: '018',
    name: 'Nyandarua',
    capital: 'Ol Kalou',
    region: 'Central',
    center: { lat: -0.2, lng: 36.5 },
    zoom: 10,
    overview: 'Highland plateau at the foot of the Aberdare mountain range, boasting freshwater Lake Ol Bolossat and high-altitude hiking adventures.',
    highlights: ['Lake Ol Bolossat (Hippos & Waterbirds)', 'Aberdare National Park West Gates', 'RAGATI Trout Conservancy'],
    keyTowns: ['Ol Kalou', 'Engineer', 'Ndaragwa', 'Njabini'],
    signatureWildlife: ['Hippos', 'Over 300 Waterbird species', 'Black & White Colobus Monkeys'],
    terrain: 'Afro-alpine moorland, highland lake basins, pine & bamboo forests',
    safetyAdvice: 'Night temperatures can dip near freezing; pack cold-weather layers.'
  },
  {
    code: '019',
    name: 'Nyeri',
    capital: 'Nyeri',
    region: 'Central',
    center: { lat: -0.4201, lng: 36.9476 },
    zoom: 11,
    overview: 'Historic heartland of Central Kenya, featuring Aberdare National Park waterfalls, Lord Baden-Powell’s resting place, and iconic safari lodges.',
    highlights: ['Aberdare National Park & Karuru Falls', 'Treetops & The Ark Lodges', 'Lord Baden-Powell Museum', 'Chinga Dam & Tea Estates'],
    keyTowns: ['Nyeri Town', 'Karatina (largest open-air market)', 'Othaya', 'Mweiga'],
    signatureWildlife: ['Black Rhinos', 'Elephants', 'Bongo Antelope', 'Leopards', 'Giant Forest Hogs'],
    terrain: 'Deep forested valleys, volcanic mountain ridges, cascading waterfalls',
    safetyAdvice: 'Hire armed KWS rangers for guided Aberdare walking treks.'
  },
  {
    code: '020',
    name: 'Kirinyaga',
    capital: 'Kerugoya',
    region: 'Central',
    center: { lat: -0.5, lng: 37.28 },
    zoom: 11,
    overview: 'Lush agricultural powerhouse beneath Mount Kenya, famous for white-water rafting on Tana River (Sagana) and emerald rice & coffee estates.',
    highlights: ['Sagana White Water Rafting & Bungee', 'Castle Forest Lodge (Mt Kenya South)', 'Kerugoya Waterfalls', 'Mwea Rice Irrigation Plains'],
    keyTowns: ['Kerugoya', 'Sagana', 'Kutus', 'Wanguru'],
    signatureWildlife: ['Forest Elephants', 'Sykes Monkeys', 'Trout Fish', 'Hornbills'],
    terrain: 'Swift alpine rivers, montane indigenous rainforest, terraced tea hills',
    safetyAdvice: 'Use certified operators at Sagana for river rafting.'
  },
  {
    code: '021',
    name: 'Murang’a',
    capital: 'Murang’a',
    region: 'Central',
    center: { lat: -0.72, lng: 37.15 },
    zoom: 11,
    overview: 'Cradle of Kikuyu culture at Mukurwe wa Nyagathanga, surrounded by scenic tea country, Ndakaini Dam water reservoir, and Aberdare foothills.',
    highlights: ['Ndakaini Dam Reservoir & Half Marathon Trail', 'Mukurwe wa Nyagathanga Cultural Shrine', 'Kimakia Tea Forest Walks'],
    keyTowns: ['Murang’a Town', 'Kenol', 'Kangema', 'Gatanga'],
    signatureWildlife: ['Colobus Monkeys', 'Crowned Eagles', 'River Otters'],
    terrain: 'V-shaped valleys, tea terraced ridges, mountain reservoirs',
    safetyAdvice: 'Picturesque country driving; take care on winding highland curves.'
  },
  {
    code: '022',
    name: 'Kiambu',
    capital: 'Kiambu',
    region: 'Central',
    center: { lat: -1.1714, lng: 36.8356 },
    zoom: 11,
    overview: 'Adjoining Nairobi, featuring century-old coffee plantations, tea estates in Limuru, paradise water falls, and Kikuyu escarpment viewpoints.',
    highlights: ['Limuru Tea Tours & Tigoni Green Hills', 'Fourteen Falls (Thika)', 'Paradise Lost Caves & Boating', 'Mugumo Cultural Heritage'],
    keyTowns: ['Thika', 'Kiambu Town', 'Ruaka', 'Limuru', 'Kikuyu'],
    signatureWildlife: ['Crowned Hornbills', 'Sunbirds', 'Sykes Monkeys'],
    terrain: 'Cool misty tea highlands, waterfall gorges, eucalyptus valleys',
    safetyAdvice: 'Ideal for scenic day trips from Nairobi.'
  },
  {
    code: '023',
    name: 'Turkana',
    capital: 'Lodwar',
    region: 'Rift Valley',
    center: { lat: 3.1167, lng: 35.6 },
    zoom: 8,
    overview: 'The "Cradle of Mankind" along the turquoise waters of Lake Turkana (the Jade Sea), featuring Central Island National Park and Eliye Springs.',
    highlights: ['Lake Turkana (Jade Sea)', 'Central Island National Park (Crocodile Breeding Crater)', 'Eliye Springs Sand Beaches', 'Koobi Fora Fossil Beds'],
    keyTowns: ['Lodwar', 'Kalokol', 'Eliye Springs', 'Lokichogio', 'Kakuma'],
    signatureWildlife: ['Nile Crocodiles (world’s largest concentration)', 'Tiger Fish', 'Nile Perch', 'Desert Monitor Lizards'],
    terrain: 'Volcanic craters, sand dunes, alkaline lake shoreline, oasis springs',
    safetyAdvice: 'Fly to Lodwar or drive in sturdy 4x4 convoys; respect indigenous Turkana culture.'
  },
  {
    code: '024',
    name: 'West Pokot',
    capital: 'Kapenguria',
    region: 'Rift Valley',
    center: { lat: 1.2333, lng: 35.1167 },
    zoom: 9,
    overview: 'High mountain drama in the Cherangani Hills, Kapenguria Six historic museum, and the scenic Turkwel Hydro Gorge.',
    highlights: ['Kapenguria Museum (Independence Heroes)', 'Cherangani Hills Hiking Trails', 'Turkwel Dam & Gorge', 'Marich Pass Field Studies'],
    keyTowns: ['Kapenguria', 'Makutano', 'Chepareria', 'Ortum'],
    signatureWildlife: ['De Brazza’s Monkeys', 'Lammergeier Vultures', 'Rock Hyraxes'],
    terrain: 'Soaring granite mountain massifs, deep river chasms, highland pastures',
    safetyAdvice: 'Spectacular road route along the Marich Pass with magnificent vistas.'
  },
  {
    code: '025',
    name: 'Samburu',
    capital: 'Maralal',
    region: 'Rift Valley',
    center: { lat: 1.25, lng: 36.9 },
    zoom: 9,
    overview: 'Wild northern frontier featuring Samburu National Reserve, Maralal International Camel Derby, Mount Ololokwe sacred monolith, and Mathews Range.',
    highlights: ['Samburu National Reserve', 'Mount Ololokwe (Cat’s Cradle monolith)', 'Mathews Range Cloud Forest', 'Maralal Camel Derby Grounds'],
    keyTowns: ['Maralal', 'Archer’s Post', 'Baragoi', 'Wamba'],
    signatureWildlife: ['Samburu Special 5 (Gerenuk, Grevy’s Zebra, Reticulated Giraffe, Beisa Oryx, Somali Ostrich)', 'Leopards', 'Wild Dogs'],
    terrain: 'Isolated mountain massifs rising from golden acacia plains, sandy dry riverbeds',
    safetyAdvice: 'Engage registered local Samburu guides for sacred mountain climbs.'
  },
  {
    code: '026',
    name: 'Trans-Nzoia',
    capital: 'Kitale',
    region: 'Rift Valley',
    center: { lat: 1.0167, lng: 35.0 },
    zoom: 10,
    overview: 'Agricultural breadbasket beneath Mount Elgon, boasting the rare Sitatunga aquatic antelope sanctuary at Saiwa Swamp National Park.',
    highlights: ['Saiwa Swamp National Park (Kenya’s smallest park)', 'Kitale Nature Conservancy & Museum', 'Mount Elgon National Park Foothills'],
    keyTowns: ['Kitale', 'Endebess', 'Kiminini'],
    signatureWildlife: ['Sitatunga Antelope (swamp dweller)', 'De Brazza’s Monkey', 'Ross’s Turaco'],
    terrain: 'Swamp board-walks, fertile volcanic farming plains, riverine forest',
    safetyAdvice: 'Walking-only park at Saiwa Swamp; tranquil wooden boardwalk viewing.'
  },
  {
    code: '027',
    name: 'Uasin Gishu',
    capital: 'Eldoret City',
    region: 'Rift Valley',
    center: { lat: 0.5143, lng: 35.2698 },
    zoom: 10,
    overview: 'The City of Champions! High-altitude athletics training capital, Eldoret International Airport, and Gateway to Western Kenya and the North Rift.',
    highlights: ['Eldoret High Altitude Training Centers', 'Two Rivers Dam', 'Kerio View Overlook border', 'Koromosho Falls'],
    keyTowns: ['Eldoret City', 'Turbo', 'Burnt Forest', 'Moiben'],
    signatureWildlife: ['Rothschild’s Giraffes (sanctuary)', 'Waterbucks', 'Highland Raptors'],
    terrain: 'Elevated plateau at 2,100m, wheat & maize fields, river waterfalls',
    safetyAdvice: 'Modern city with top hospitals (MTRH), universities, and international airport.'
  },
  {
    code: '028',
    name: 'Elgeyo-Marakwet',
    capital: 'Iten',
    region: 'Rift Valley',
    center: { lat: 0.67, lng: 35.5 },
    zoom: 10,
    overview: 'Iten — Home of Champions! Perched on the precipice of the Great Rift Valley, world capital of marathon running, and paragliding heaven.',
    highlights: ['Iten Viewpoint (Great Rift Valley Escarpment)', 'Kerio Valley & Rimrock Paragliding', 'Chebloch Gorge Crocodile Waters', 'Torok Falls'],
    keyTowns: ['Iten', 'Kapsowar', 'Tambach', 'Flax'],
    signatureWildlife: ['Crocodiles (Kerio River)', 'Baboons', 'Augur Buzzards', 'Rock Kestrels'],
    terrain: '1,000m sheer escarpment drop into semi-arid Kerio Valley floor',
    safetyAdvice: 'Enjoy sunset over the escarpment; world-class marathon runners run alongside roads daily.'
  },
  {
    code: '029',
    name: 'Nandi',
    capital: 'Kapsabet',
    region: 'Rift Valley',
    center: { lat: 0.2, lng: 35.1 },
    zoom: 10,
    overview: 'Lush undulating tea hills, home to legendary athletes, Kingwal Swamp with endangered Sitatungas, and the scenic Nandi Rock.',
    highlights: ['Kingwal Swamp Sitatunga Sanctuary', 'Nandi Rock Escarpment Lookout', 'Chepkiit Waterfalls (Kipkaren River)', 'Nandi Hills Tea Estates'],
    keyTowns: ['Kapsabet', 'Nandi Hills', 'Mosoriot', 'Kobujoi'],
    signatureWildlife: ['Sitatunga Antelope', 'Otters', 'Colobus Monkeys'],
    terrain: 'Lush rolling tea estates, boulder monoliths, river waterfalls',
    safetyAdvice: 'Spectacular cycling and trail running terrain.'
  },
  {
    code: '030',
    name: 'Baringo',
    capital: 'Kabarnet',
    region: 'Rift Valley',
    center: { lat: 0.5, lng: 36.0 },
    zoom: 9,
    overview: 'Rift Valley lakes paradise: Lake Bogoria’s bubbling geysers & flamingos, and freshwater Lake Baringo’s hippo boat safaris.',
    highlights: ['Lake Bogoria National Reserve (Hot Springs & Geysers)', 'Lake Baringo (Hippos & Goliath Herons)', 'Tugen Hills Escarpment', 'Perkerra Irrigation Scheme'],
    keyTowns: ['Kabarnet', 'Marigat', 'Eldama Ravine', 'Mogotio (Equator Mark)'],
    signatureWildlife: ['Lesser Flamingos (millions)', 'Hippos', 'Fish Eagles', 'Greater Kudus'],
    terrain: 'Alkaline geyser lakes, freshwater islands, rugged fault escarpments',
    safetyAdvice: 'Keep safe distance from boiling geothermal springs at Lake Bogoria.'
  },
  {
    code: '031',
    name: 'Laikipia',
    capital: 'Rumuruti',
    region: 'Rift Valley',
    center: { lat: 0.4, lng: 36.8 },
    zoom: 10,
    overview: 'Kenya’s premier wildlife conservation county, harboring highest densities of endangered Black Rhinos, Grevy’s Zebras, and private eco-sanctuaries.',
    highlights: ['Ol Pejeta Conservancy & Sweetwaters Chimpanzee Sanctuary', 'Lewa Wildlife Conservancy', 'Nanyuki Town & Equator Crossing', 'Thompson Falls (Nyahururu)'],
    keyTowns: ['Nanyuki', 'Nyahururu', 'Rumuruti', 'Doldol'],
    signatureWildlife: ['Big 5', 'Last 2 Northern White Rhinos on Earth', 'Black Rhinos', 'African Wild Dogs', 'Chimpanzees'],
    terrain: 'Acacia savanna plateaus, river gorges, Mount Kenya foothills',
    safetyAdvice: 'Top tier private game drives with experienced professional trackers.'
  },
  {
    code: '032',
    name: 'Nakuru',
    capital: 'Nakuru City',
    region: 'Rift Valley',
    center: { lat: -0.3031, lng: 36.08 },
    zoom: 10,
    overview: 'Hub of the central Rift Valley, boasting Lake Nakuru National Park rhinos, Lake Naivasha, Hell’s Gate cycling canyons, and Menengai Crater.',
    highlights: ['Lake Nakuru National Park (Rhino Sanctuary)', 'Lake Naivasha & Crescent Island', 'Hell’s Gate National Park & Olkaria Geothermal Spa', 'Menengai Crater Caldera', 'Mount Longonot Crater Hike'],
    keyTowns: ['Nakuru City', 'Naivasha', 'Gilgil', 'Molo', 'Njoro'],
    signatureWildlife: ['White and Black Rhinos', 'Flamingos', 'Giraffes', 'Zebras', 'Hippos'],
    terrain: 'Volcanic caldera, freshwater and soda lakes, acacia savanna',
    safetyAdvice: 'Cycle alongside wildlife safely at Hell’s Gate; respect park speed limits.'
  },
  {
    code: '033',
    name: 'Narok',
    capital: 'Narok',
    region: 'Rift Valley',
    center: { lat: -1.0833, lng: 35.8667 },
    zoom: 9,
    overview: 'Home to the crown jewel of African wildlife: the Maasai Mara National Reserve, host to the annual Great Wildebeest Migration.',
    highlights: ['Maasai Mara National Reserve', 'Mara Triangle', 'Mara North & Olare Motorogi Conservancies', 'Traditional Maasai Bomas', 'Hot Air Balloon Safaris'],
    keyTowns: ['Narok Town', 'Talek', 'Sekenani', 'Kilgoris', 'Ololulung’a'],
    signatureWildlife: ['Big 5 (Lion, Leopard, Elephant, Buffalo, Rhino)', '1.5 Million Wildebeest', 'Cheetahs', 'Spotted Hyenas'],
    terrain: 'Endless golden savanna grasslands, Mara River crossings, isolated acacia groves',
    safetyAdvice: 'Always remain in vehicles during game drives; support community conservation.'
  },
  {
    code: '034',
    name: 'Kajiado',
    capital: 'Kajiado',
    region: 'Rift Valley',
    center: { lat: -2.0, lng: 36.9 },
    zoom: 9,
    overview: 'The land of giants under Mount Kilimanjaro in Amboseli National Park, birding at Lake Magadi, and dramatic Olorgesailie prehistoric site.',
    highlights: ['Amboseli National Park (Elephants & Mt Kilimanjaro views)', 'Lake Magadi Soda Lake & Hot Springs', 'Olorgesailie Prehistoric Axe Site', 'Ngong Hills Hiking Ridges', 'Chyulu Hills South'],
    keyTowns: ['Kitengela', 'Kajiado Town', 'Ngong', 'Rongai', 'Namanga (Tanzania border)'],
    signatureWildlife: ['Giant Tusker Elephants', 'Lions', 'Cheetahs', 'Flamingos', 'Bat-eared Foxes'],
    terrain: 'Marsh swamps under Kilimanjaro, pink soda pans, rolling green hills (Ngong)',
    safetyAdvice: 'Dress for both savanna sunshine and sudden mountain breezes.'
  },
  {
    code: '035',
    name: 'Kericho',
    capital: 'Kericho',
    region: 'Rift Valley',
    center: { lat: -0.3667, lng: 35.2833 },
    zoom: 11,
    overview: 'World-famous emerald carpet of tea plantations, Tagabi monkey sanctuaries, and the southern entrance to the Mau Forest water tower.',
    highlights: ['Kericho Tea Plantation Tours & Factory Tasting', 'Mau Forest Water Reserve', 'Chagaik Botanical Garden', 'Tagabi Forest Monkeys'],
    keyTowns: ['Kericho Town', 'Litein', 'Kipkelion', 'Londiani'],
    signatureWildlife: ['Colobus Monkeys', 'Forest Duikers', 'Crested Guineafowl'],
    terrain: 'Lush undulating tea gardens at 2,000m altitude, cool rainforest belt',
    safetyAdvice: 'Taste freshly processed Kenyan highland black and purple tea.'
  },
  {
    code: '036',
    name: 'Bomet',
    capital: 'Bomet',
    region: 'Rift Valley',
    center: { lat: -0.78, lng: 35.34 },
    zoom: 11,
    overview: 'Bordering the Mau Forest and tea highlands, famous for dairy farming, Chepalungu indigenous forest, and Mara River headwaters.',
    highlights: ['Chepalungu Indigenous Forest & Elephant Corridor', 'Tenwek Waterfalls & Suspended Bridge', 'Mau Escarpment Border'],
    keyTowns: ['Bomet Town', 'Sotik', 'Longisa', 'Mulot'],
    signatureWildlife: ['Forest Elephants', 'Sykes Monkeys', 'Trout Fish'],
    terrain: 'Verdant river valleys, tea and dairy pastures, steep ridges',
    safetyAdvice: 'Warm and friendly highland hospitality.'
  },
  {
    code: '037',
    name: 'Kakamega',
    capital: 'Kakamega',
    region: 'Western',
    center: { lat: 0.2833, lng: 34.75 },
    zoom: 11,
    overview: 'Home to Kakamega Forest National Reserve, the only remaining Guineo-Congolian tropical rainforest in Kenya, and the mysterious Crying Stone.',
    highlights: ['Kakamega Tropical Rainforest Reserve', 'Ikhonga Murwi (Crying Stone of Ilesi)', 'Rondo Retreat Centre', 'Isiukhu & Yala Rivers'],
    keyTowns: ['Kakamega Town', 'Mumias', 'Malava', 'Shinyalu'],
    signatureWildlife: ['Great Blue Turaco', 'De Brazza’s Monkey', 'African Grey Parrot', 'Over 300 Butterfly Species', 'Giant Flying Squirrels'],
    terrain: 'Dense multi-canopy equatorial rainforest, colossal strangler fig trees, river rapids',
    safetyAdvice: 'Take morning bird walks with certified forest guides for rare primates and birds.'
  },
  {
    code: '038',
    name: 'Vihiga',
    capital: 'Mbale',
    region: 'Western',
    center: { lat: 0.08, lng: 34.72 },
    zoom: 12,
    overview: 'Lush hilly county of Maragoli people, famous for giant granite rock formations, tea farms, and the Maragoli Hills viewpoint.',
    highlights: ['Maragoli Hills Viewpoint', 'Mungoma Caves (Cultural Origin)', 'Kaimosi Mission Forest Sanctuary', 'Tiriki Circumcision Cultural Groves'],
    keyTowns: ['Mbale', 'Chavakali', 'Luanda', 'Majengo'],
    signatureWildlife: ['Potto (nocturnal primate)', 'Colobus Monkeys', 'Sunbirds'],
    terrain: 'Picturesque granite boulder hills, lush smallholder farms',
    safetyAdvice: 'Enjoy panoramic viewpoints overlooking Kisumu and Lake Victoria.'
  },
  {
    code: '039',
    name: 'Bungoma',
    capital: 'Bungoma',
    region: 'Western',
    center: { lat: 0.5667, lng: 34.5667 },
    zoom: 10,
    overview: 'Western slopes of Mount Elgon with ancient elephant salt-mining caves (Kitum Cave), dramatic Nabuyole Falls, and Sang’alo rock.',
    highlights: ['Mount Elgon National Park & Kitum Cave (Salt-Mining Elephants)', 'Nabuyole Waterfalls (Webuye)', 'Chetambe Fort Viewpoint', 'Sang’alo Rocks'],
    keyTowns: ['Bungoma Town', 'Webuye', 'Kimilili', 'Sirisia', 'Malakisi'],
    signatureWildlife: ['Troglodyte Elephants of Kitum Cave', 'Leopards', 'Black and White Colobus', 'Giant Forest Hogs'],
    terrain: 'Massive volcanic caldera, cavernous lava tubes, thundering river waterfalls',
    safetyAdvice: 'Carry headlights or torches for exploring Kitum Cave with park rangers.'
  },
  {
    code: '040',
    name: 'Busia',
    capital: 'Busia',
    region: 'Western',
    center: { lat: 0.4608, lng: 34.1117 },
    zoom: 11,
    overview: 'Kenya-Uganda border hub along Lake Victoria, famous for Kakapel National Monument rock art, fish markets, and Sio Port.',
    highlights: ['Kakapel Rock Art National Monument', 'Lake Victoria Sio Port Beaches', 'Alupe Leprosy Heritage Center', 'Nambale Valley'],
    keyTowns: ['Busia Town', 'Malaba (Border crossing)', 'Nambale', 'Port Victoria'],
    signatureWildlife: ['Lake Victoria Tilapia and Nile Perch', 'Monitor Lizards', 'Pied Kingfishers'],
    terrain: 'Lake Victoria bays, granite rock shelters, savanna borderlands',
    safetyAdvice: 'Major trade corridor; observe official immigration channels at borders.'
  },
  {
    code: '041',
    name: 'Siaya',
    capital: 'Siaya',
    region: 'Nyanza',
    center: { lat: 0.0607, lng: 34.2881 },
    zoom: 10,
    overview: 'Lake Victoria peninsula featuring historic Got Ramogi sacred forest, Yala Swamp, Kogelo (Barack Obama ancestral home), and Usenge beaches.',
    highlights: ['Got Ramogi Sacred Hill', 'Kogelo Obama Cultural Center', 'Yala Swamp Papyrus Reserve', 'Usenge & Bondo Lake Ports', 'Lake Kanyaboli'],
    keyTowns: ['Siaya Town', 'Bondo', 'Ugunja', 'Usenge', 'Yala'],
    signatureWildlife: ['Sitatunga Antelope (Lake Kanyaboli)', 'Hippos', 'Fish Eagles', 'Hammerkop Birds'],
    terrain: 'Lake Victoria peninsulas, wetland oxbow lakes, scenic granite hills',
    safetyAdvice: 'Authentic Luo cultural storytelling and lakeside fresh tilapia dining.'
  },
  {
    code: '042',
    name: 'Kisumu',
    capital: 'Kisumu City',
    region: 'Nyanza',
    center: { lat: -0.1022, lng: 34.7617 },
    zoom: 11,
    overview: 'Third largest city in Kenya, set upon the shores of Lake Victoria with Dunga Beach sunset boat rides, Kisumu Impala Sanctuary, and Kit Mikayi rock.',
    highlights: ['Kisumu Impala Sanctuary', 'Dunga Beach & Boardwalk', 'Kit Mikayi (Weeping Rock of the First Wife)', 'Hippo Point Sunset Spot', 'Kisumu National Museum'],
    keyTowns: ['Kisumu City', 'Maseno (Equator Point)', 'Ahero', 'Muhoroni'],
    signatureWildlife: ['Impalas', 'Hippos', 'Rare Sitatunga', 'Monitor Lizards', 'Over 200 bird species'],
    terrain: 'Lake Victoria gulf, papyrus wetlands, granite tors, sugarcane plains',
    safetyAdvice: 'Do not miss fresh deep-fried Tilapia with Ugali and Sukuma Wiki by the beach.'
  },
  {
    code: '043',
    name: 'Homa Bay',
    capital: 'Homa Bay',
    region: 'Nyanza',
    center: { lat: -0.5273, lng: 34.4571 },
    zoom: 10,
    overview: 'Home to Ruma National Park (last Kenyan refuge of the Roan Antelope), Rusinga Island, Mfangano Island rock art, and Simbi Nyaima crater lake.',
    highlights: ['Ruma National Park (Roan Antelopes & Rhinos)', 'Rusinga Island & Dr. Louis Leakey Proconsul Site', 'Mfangano Island Ancient Rock Art', 'Simbi Nyaima Volcanic Lake', 'Homa Hills Geothermal Springs'],
    keyTowns: ['Homa Bay Town', 'Mbita Point', 'Oyugis', 'Kendu Bay'],
    signatureWildlife: ['Roan Antelope', 'Jackson’s Hartebeest', 'Leopards', 'Lake Victoria Birds'],
    terrain: 'Pristine islands, volcanic caldera crater, acacia river valley',
    safetyAdvice: 'Take passenger ferries or water taxis between Mbita and Rusinga/Mfangano islands.'
  },
  {
    code: '044',
    name: 'Migori',
    capital: 'Migori',
    region: 'Nyanza',
    center: { lat: -1.0634, lng: 34.4731 },
    zoom: 10,
    overview: 'Southwestern gateway to Maasai Mara (Siria Escarpment), Lake Victoria beaches at Muhuru Bay, and the historic Thimlich Ohinga stone complex.',
    highlights: ['Thimlich Ohinga UNESCO Dry Stone Complex', 'Muhuru Bay Lake Victoria beaches', 'Isebania border crossing to Serengeti', 'Gucha River'],
    keyTowns: ['Migori Town', 'Rongo', 'Isebania', 'Awendo', 'Kehancha'],
    signatureWildlife: ['Hippos', 'Otters', 'Baboons', 'Migratory Savanna Birds'],
    terrain: 'Prehistoric stone defensive walls, sugar belt valleys, gold-panning rivers',
    safetyAdvice: 'Thimlich Ohinga is one of the grandest prehistoric archaeological sites in sub-Saharan Africa.'
  },
  {
    code: '045',
    name: 'Kisii',
    capital: 'Kisii',
    region: 'Nyanza',
    center: { lat: -0.6817, lng: 34.7667 },
    zoom: 11,
    overview: 'The highlands of soapstone carving (Tabaka), rolling green banana & tea ridges, vibrant commercial bustle, and Manga Ridge caves.',
    highlights: ['Tabaka Soapstone Workshops & Quarry Tours', 'Manga Ridge Escarpment & Caves', 'Sameta Hill Viewpoint', 'Gucha River Cascades'],
    keyTowns: ['Kisii Town', 'Ogembo', 'Suneka', 'Tabaka', 'Keroka'],
    signatureWildlife: ['Crowned Hornbills', 'Chameleons', 'River Kingfishers'],
    terrain: 'Verdant stepped hills, soapstone quarries, subtropical evergreen agriculture',
    safetyAdvice: 'Visit Tabaka to meet master sculptors carving authentic Kisii soapstone ornaments.'
  },
  {
    code: '046',
    name: 'Nyamira',
    capital: 'Nyamira',
    region: 'Nyanza',
    center: { lat: -0.5633, lng: 34.9358 },
    zoom: 11,
    overview: 'Scenic highland neighbor of Kisii, blanketed in tea gardens, cascading waterfalls, and the tranquil Lake Manga.',
    highlights: ['Keera Falls', 'Nyamira Tea Estates Walk', 'Kebiwe Hill Panoramic Lookout', 'Nyabite Market'],
    keyTowns: ['Nyamira Town', 'Nyansiongo', 'Keroka Border', 'Manga'],
    signatureWildlife: ['Bushbucks', 'Weaver Birds', 'Tree Hyraxes'],
    terrain: 'Rolling emerald green hills, tea estates, freshwater highland streams',
    safetyAdvice: 'Gentle, scenic road trips with year-round temperate weather.'
  },
  {
    code: '047',
    name: 'Nairobi',
    capital: 'Nairobi City (Capital of Kenya)',
    region: 'Nairobi',
    center: { lat: -1.2921, lng: 36.8219 },
    zoom: 12,
    overview: 'The "Green City in the Sun" and East Africa’s economic and safari capital. The only city in the world boasting a wild Big 5 national park on its doorstep.',
    highlights: ['Nairobi National Park (Wild Lions & Giraffes against City Skyline)', 'David Sheldrick Elephant Orphanage', 'Giraffe Centre (Rothschild Giraffe Hand-Feeding)', 'Nairobi National Museum & Snake Park', 'Karura Forest Walking & Cycling Trails', 'Karen Blixen Museum', 'Bomas of Kenya Traditional Dances', 'Westlands & Karen Dining Hubs'],
    keyTowns: ['Nairobi CBD', 'Westlands', 'Karen', 'Kilimani', 'Gigiri', 'Upper Hill', 'Lavington', 'Langata'],
    signatureWildlife: ['Lions', 'Cheetahs', 'Black Rhinos', 'Leopards', 'Rothschild Giraffes', 'Elephants (Orphanage)'],
    terrain: 'Modern metropolitan skyline, indigenous highland forest, rolling savannas',
    safetyAdvice: 'Use ride-hailing apps (Uber/Bolt) after dark; respect national park safety rules.'
  }
];

// Rich, verified Points of Interest across all 47 Counties of Kenya
export const KENYA_GEO_LOCATIONS: GeoLocationRecord[] = [
  // ================= NAIROBI COUNTY (047) =================
  {
    id: 'poi-nbo-nat-park',
    name: 'Nairobi National Park',
    aliasNames: ['Nairobi Park', 'Nairobi Game Park'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Langata, Nairobi',
    area: 'Langata',
    address: 'Langata Road, Nairobi, Kenya',
    category: 'park',
    categoryLabel: 'National Park',
    coordinates: { lat: -1.3733, lng: 36.8582 },
    description: 'The world’s only wildlife sanctuary within a nation’s capital city. See wild lions, rhinos, and giraffes grazing with skyscrapers on the horizon.',
    image: 'https://images.unsplash.com/photo-1609137144822-476722d3b259?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:30 PM daily',
    contactPhone: '+254 20 242 3423',
    website: 'https://kws.go.ke',
    rating: 4.8,
    reviewCount: 3840,
    entryFeeUSD: 43,
    entryFeeKES: 500,
    accessibilityNotes: 'Wheelchair-friendly picnic and boardwalk facilities at the main gate and safari walk.',
    safetyTips: 'Stay inside closed vehicles; do not honk or feed wild animals.',
    nearbyAttractionIds: ['poi-nbo-giraffe-centre', 'poi-nbo-sheldrick', 'poi-nbo-karen-blixen'],
    linkedPackageIds: ['nairobi-park-half-day', 'nairobi-full-day-safari']
  },
  {
    id: 'poi-nbo-sheldrick',
    name: 'David Sheldrick Wildlife Trust',
    aliasNames: ['Sheldrick Elephant Orphanage', 'Elephant Orphanage Nairobi'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Nairobi',
    area: 'Langata / Karen',
    address: 'KWS Central Workshop Gate, Magadi Rd, Nairobi',
    category: 'nature',
    categoryLabel: 'Wildlife Rescue & Rehabilitation',
    coordinates: { lat: -1.3769, lng: 36.7758 },
    description: 'World-acclaimed rescue center for orphaned baby elephants and rhinos. Watch baby elephants drink giant milk bottles and play in red mud.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    openingHours: '11:00 AM – 12:00 PM (Strict advance booking required)',
    contactPhone: '+254 733 891 996',
    website: 'https://sheldrickwildlifetrust.org',
    rating: 4.9,
    reviewCount: 4210,
    entryFeeUSD: 20,
    entryFeeKES: 500,
    safetyTips: 'Booking confirmation code required at gate; arrive 20 minutes before 11 AM.'
  },
  {
    id: 'poi-nbo-giraffe-centre',
    name: 'Giraffe Centre Nairobi',
    aliasNames: ['African Fund for Endangered Wildlife', 'Giraffe Center'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Karen, Nairobi',
    area: 'Karen',
    address: 'Duma Rd, Karen, Nairobi',
    category: 'nature',
    categoryLabel: 'Wildlife Sanctuary',
    coordinates: { lat: -1.3758, lng: 36.7444 },
    description: 'Home to the endangered Rothschild giraffe. Guests can feed giraffes directly from elevated wooden viewing platforms.',
    image: 'https://images.unsplash.com/photo-1547721064-362ab9f60d74?auto=format&fit=crop&w=1000&q=80',
    openingHours: '9:00 AM – 5:00 PM daily',
    contactPhone: '+254 20 807 0804',
    rating: 4.8,
    reviewCount: 3900,
    entryFeeUSD: 15,
    entryFeeKES: 400
  },
  {
    id: 'poi-nbo-jkia',
    name: 'Jomo Kenyatta International Airport (NBO)',
    aliasNames: ['JKIA', 'Nairobi Airport', 'Embakasi Airport'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Embakasi, Nairobi',
    area: 'Embakasi',
    address: 'Airport North Rd, Nairobi',
    category: 'airport',
    categoryLabel: 'International Airport',
    coordinates: { lat: -1.3192, lng: 36.9275 },
    description: 'The primary international aviation hub of East Africa, connecting worldwide airlines with safari domestic flights.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Open',
    contactPhone: '+254 20 661 1000'
  },
  {
    id: 'poi-nbo-wilson',
    name: 'Wilson Airport (WIL)',
    aliasNames: ['Wilson', 'Safari Airstrip Nairobi'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Langata, Nairobi',
    area: 'Langata',
    address: 'Langata Rd, Nairobi',
    category: 'airport',
    categoryLabel: 'Domestic & Safari Airport',
    coordinates: { lat: -1.3217, lng: 36.8148 },
    description: 'Premier domestic and bush flight airfield in Africa, where scheduled flights take off daily for Maasai Mara, Amboseli, and Diani.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 9:00 PM',
    contactPhone: '+254 20 600 3260'
  },
  {
    id: 'poi-nbo-sgr-term',
    name: 'Nairobi SGR Terminus (Syokimau)',
    aliasNames: ['Madaraka Express Nairobi', 'Syokimau Railway Station'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Syokimau / Athi River border',
    area: 'Syokimau',
    address: 'Mombasa Road / Syokimau, Nairobi',
    category: 'transport',
    categoryLabel: 'Train Terminal',
    coordinates: { lat: -1.3853, lng: 36.9295 },
    description: 'Modern terminal for the Madaraka Express standard gauge train linking Nairobi to Mombasa, Voi, and Tsavo in 4.5 hours.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    openingHours: '5:30 AM – 11:00 PM',
    contactPhone: '+254 709 388 888'
  },
  {
    id: 'poi-nbo-hosp-knh',
    name: 'Kenyatta National Hospital (KNH)',
    aliasNames: ['KNH', 'National Hospital Nairobi'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Upper Hill, Nairobi',
    area: 'Upper Hill',
    address: 'Hospital Rd, Upper Hill, Nairobi',
    category: 'hospital',
    categoryLabel: 'National Referral Hospital',
    coordinates: { lat: -1.3013, lng: 36.8073 },
    description: 'Kenya’s largest national teaching and tertiary referral medical center with comprehensive trauma and emergency units.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Emergency',
    contactPhone: '+254 20 272 6300'
  },
  {
    id: 'poi-nbo-hosp-agakhan',
    name: 'The Aga Khan University Hospital',
    aliasNames: ['Aga Khan Nairobi', 'Aga Khan Hospital Parklands'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Parklands, Nairobi',
    area: 'Parklands',
    address: '3rd Parklands Ave, Nairobi',
    category: 'hospital',
    categoryLabel: 'Private Tertiary Hospital (JCI Accredited)',
    coordinates: { lat: -1.2618, lng: 36.8189 },
    description: 'Premier internationally accredited private hospital in East Africa with state-of-the-art ICU, cardiac care, and emergency wing.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Emergency',
    contactPhone: '+254 20 366 2000'
  },
  {
    id: 'poi-nbo-police-tpu',
    name: 'Tourist Police Unit (TPU) Headquarters',
    aliasNames: ['TPU Nairobi', 'Tourist Police Kenya'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Old Mutual Building, Nairobi CBD',
    area: 'Nairobi CBD',
    address: 'Corner House / Kimathi St, Nairobi',
    category: 'police',
    categoryLabel: 'Tourist Police Unit',
    coordinates: { lat: -1.2858, lng: 36.8222 },
    description: 'Specialized national police unit dedicated exclusively to international tourist protection, emergency assistance, and tour safety.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24/7 Rapid Response',
    contactPhone: '+254 800 720 024'
  },
  {
    id: 'poi-nbo-karura',
    name: 'Karura Forest Reserve',
    aliasNames: ['Karura', 'Karura Gate D', 'Wangari Maathai Forest'],
    county: 'Nairobi',
    countyCode: '047',
    town: 'Gigiri / Parklands, Nairobi',
    area: 'Gigiri',
    address: 'Limuru Rd, Gigiri, Nairobi',
    category: 'nature',
    categoryLabel: 'Urban Forest Reserve & Trails',
    coordinates: { lat: -1.2417, lng: 36.8333 },
    description: '1,041-hectare urban indigenous forest championing Wangari Maathai’s legacy. Features 50km of trails, waterfall, Mau Mau caves, and River Café.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM daily',
    contactPhone: '+254 728 501 333',
    rating: 4.8,
    entryFeeUSD: 6,
    entryFeeKES: 100
  },

  // ================= NAROK COUNTY (033) =================
  {
    id: 'poi-nrk-mara-sekenani',
    name: 'Maasai Mara National Reserve - Sekenani Gate',
    aliasNames: ['Maasai Mara', 'Masai Mara', 'Mara Reserve', 'Sekenani Gate'],
    county: 'Narok',
    countyCode: '033',
    town: 'Sekenani, Narok',
    area: 'Eastern Mara',
    address: 'C12 Route to Sekenani, Narok, Kenya',
    category: 'park',
    categoryLabel: 'World Heritage Wildlife Reserve',
    coordinates: { lat: -1.5281, lng: 35.3375 },
    description: 'The main entrance to Maasai Mara National Reserve, the greatest wildlife theater on Earth. Renowned for Big 5 and the annual Great Migration.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:30 PM daily',
    contactPhone: '+254 712 345 678',
    rating: 4.9,
    reviewCount: 5120,
    entryFeeUSD: 100,
    entryFeeKES: 3000,
    safetyTips: 'Always stay inside safari vehicles. Keep a minimum 25m distance from predatory cats.',
    linkedPackageIds: ['3d-mara-fly-in', '5d-classic-kenya-safari']
  },
  {
    id: 'poi-nrk-mara-serena-airstrip',
    name: 'Mara Serena Airstrip (MRE)',
    aliasNames: ['Mara Serena', 'Serena Airstrip Mara'],
    county: 'Narok',
    countyCode: '033',
    town: 'Mara Triangle, Narok',
    area: 'Mara Triangle',
    address: 'Near Mara Serena Safari Lodge, Narok',
    category: 'airport',
    categoryLabel: 'Safari Bush Airstrip',
    coordinates: { lat: -1.4072, lng: 35.0094 },
    description: 'Tarmac bush airstrip serving the Mara Triangle with daily flights from Wilson Airport Nairobi and Diani Beach.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    openingHours: 'Daylight flights only'
  },
  {
    id: 'poi-nrk-police-tpu-mara',
    name: 'Tourist Police Post - Maasai Mara Sekenani',
    aliasNames: ['TPU Maasai Mara', 'Sekenani Police'],
    county: 'Narok',
    countyCode: '033',
    town: 'Sekenani, Narok',
    area: 'Sekenani Gate',
    address: 'Adjacent to Sekenani Gate, Narok',
    category: 'police',
    categoryLabel: 'Tourist Police Post',
    coordinates: { lat: -1.5274, lng: 35.3382 },
    description: '24/7 dedicated Tourist Police station providing security coordination, radio dispatch, and escort services in Maasai Mara.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24/7',
    contactPhone: '+254 800 720 024'
  },

  // ================= NAKURU COUNTY (032) =================
  {
    id: 'poi-nak-lake-nakuru',
    name: 'Lake Nakuru National Park',
    aliasNames: ['Lake Nakuru', 'Nakuru National Park'],
    county: 'Nakuru',
    countyCode: '032',
    town: 'Nakuru City',
    area: 'Nakuru South',
    address: 'Old Nairobi Rd, Nakuru',
    category: 'park',
    categoryLabel: 'Rhino Sanctuary & Lake Park',
    coordinates: { lat: -0.3667, lng: 36.0833 },
    description: 'World sanctuary for endangered Black and White rhinos, Rothschild giraffes, and pink flamingos along Baboon Cliff.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.7,
    entryFeeUSD: 70,
    entryFeeKES: 1000
  },
  {
    id: 'poi-nak-hells-gate',
    name: 'Hell’s Gate National Park',
    aliasNames: ['Hells Gate', 'Hell’s Gate Gorge', 'Olkaria Park'],
    county: 'Nakuru',
    countyCode: '032',
    town: 'Naivasha',
    area: 'South Lake',
    address: 'Moi South Lake Rd, Naivasha',
    category: 'park',
    categoryLabel: 'Geothermal Canyons & Cycling Park',
    coordinates: { lat: -0.8872, lng: 36.3139 },
    description: 'Unique park where visitors can cycle amongst zebras and giraffes, climb Fischer’s Tower, and hike dramatic volcanic water gorges.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.8,
    reviewCount: 2980,
    entryFeeUSD: 30,
    entryFeeKES: 300,
    safetyTips: 'Do not enter lower gorge during rain due to flash flood risks.'
  },
  {
    id: 'poi-nak-lake-naivasha',
    name: 'Lake Naivasha & Crescent Island',
    aliasNames: ['Lake Naivasha', 'Crescent Island Game Sanctuary', 'Naivasha'],
    county: 'Nakuru',
    countyCode: '032',
    town: 'Naivasha',
    area: 'Moi South Lake',
    address: 'Moi South Lake Rd, Naivasha, Kenya',
    category: 'nature',
    categoryLabel: 'Freshwater Lake & Walking Sanctuary',
    coordinates: { lat: -0.7686, lng: 36.4294 },
    description: 'Freshwater lake fringed with yellow acacia trees, hippo pods, and Crescent Island where you can walk freely with wildebeest and giraffes.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    openingHours: '8:00 AM – 5:30 PM',
    rating: 4.8,
    entryFeeUSD: 30,
    entryFeeKES: 1000
  },
  {
    id: 'poi-nak-menengai',
    name: 'Menengai Crater Rim & Geothermal Lookout',
    aliasNames: ['Menengai Crater', 'Menengai Caldera'],
    county: 'Nakuru',
    countyCode: '032',
    town: 'Nakuru City',
    area: 'Menengai Hill',
    address: 'Crater Climb Rd, Nakuru',
    category: 'viewpoint',
    categoryLabel: 'Volcanic Caldera Viewpoint',
    coordinates: { lat: -0.2008, lng: 36.0711 },
    description: 'Second largest volcanic caldera in Africa, dropping 485m into forested geothermal fumaroles with a panoramic Rift Valley lookout.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:00 AM – 6:00 PM',
    rating: 4.6
  },
  {
    id: 'poi-nak-longonot',
    name: 'Mount Longonot National Park Crater Hike',
    aliasNames: ['Mount Longonot', 'Mt Longonot', 'Longonot Crater'],
    county: 'Nakuru',
    countyCode: '032',
    town: 'Mai Mahiu / Naivasha',
    area: 'Longonot',
    address: 'Old Naivasha Rd, Nakuru',
    category: 'mountain',
    categoryLabel: 'Volcanic Crater Summit Hike',
    coordinates: { lat: -0.9167, lng: 36.45 },
    description: 'Stratovolcano rising 2,776m above the Rift Valley floor with a 7.2km rim walk circling an impenetrable caldera indigenous forest.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:30 AM – 5:30 PM',
    rating: 4.8,
    entryFeeUSD: 26,
    entryFeeKES: 300,
    safetyTips: 'Start hike before 10 AM to avoid scorching midday heat; carry at least 2 liters of water.'
  },

  // ================= KWALE COUNTY (002) =================
  {
    id: 'poi-kwa-diani-beach',
    name: 'Diani Beach',
    aliasNames: ['Diani', 'Diani Beach South Coast'],
    county: 'Kwale',
    countyCode: '002',
    town: 'Diani / Ukunda',
    area: 'Diani Beach Road',
    address: 'Diani Beach Rd, Kwale, Kenya',
    category: 'beach',
    categoryLabel: 'World-Leading Tropical Beach',
    coordinates: { lat: -4.2796, lng: 39.5855 },
    description: 'Voted Africa’s leading beach destination for six consecutive years. Features powdery white sands, turquoise ocean, coral reefs, and water sports.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Access',
    rating: 4.9,
    reviewCount: 4890,
    entryFeeUSD: 0,
    entryFeeKES: 0,
    linkedPackageIds: ['diani-beach-resort-escape', 'wasini-dolphin-safari']
  },
  {
    id: 'poi-kwa-kisite-mpunguti',
    name: 'Kisite-Mpunguti Marine National Park & Reserve',
    aliasNames: ['Kisite Mpunguti', 'Wasini Marine Park'],
    county: 'Kwale',
    countyCode: '002',
    town: 'Shimoni',
    area: 'Wasini Channel',
    address: 'Shimoni Jet, Kwale, Kenya',
    category: 'park',
    categoryLabel: 'Coral Marine Sanctuary & Dolphin Lagoon',
    coordinates: { lat: -4.7167, lng: 39.3667 },
    description: 'Spectacular coral gardens harboring bottlenose dolphins, green sea turtles, and manta rays explored via traditional Arabian wooden dhows.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:30 AM – 4:00 PM',
    rating: 4.9,
    entryFeeUSD: 20,
    entryFeeKES: 500
  },
  {
    id: 'poi-kwa-shimba-hills',
    name: 'Shimba Hills National Reserve & Sheldrick Falls',
    aliasNames: ['Shimba Hills', 'Sheldrick Falls Shimba'],
    county: 'Kwale',
    countyCode: '002',
    town: 'Kwale Town',
    area: 'Shimba Hills',
    address: 'Kwale-Kinango Rd, Kwale',
    category: 'park',
    categoryLabel: 'Coastal Rainforest & Rare Sable Sanctuary',
    coordinates: { lat: -4.2167, lng: 39.4167 },
    description: 'Rich coastal rainforest hills with Kenya’s only wild population of rare Sable Antelope, coastal elephants, and the 21m Sheldrick Falls.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.7,
    entryFeeUSD: 25,
    entryFeeKES: 300
  },
  {
    id: 'poi-kwa-ukunda-airstrip',
    name: 'Ukunda / Diani Airstrip (UKA)',
    aliasNames: ['Ukunda Airstrip', 'Diani Airport'],
    county: 'Kwale',
    countyCode: '002',
    town: 'Ukunda / Diani',
    area: 'Ukunda',
    address: 'Diani Beach Rd, Ukunda',
    category: 'airport',
    categoryLabel: 'Coastal Tourism Airstrip',
    coordinates: { lat: -4.2989, lng: 39.5719 },
    description: 'Dedicated tourism airstrip located just 5 minutes from Diani Beach resorts with direct daily flights to Nairobi and Maasai Mara.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:00 AM – 6:30 PM'
  },
  {
    id: 'poi-kwa-hosp-diani',
    name: 'Diani Beach Hospital',
    aliasNames: ['Diani Hospital', 'Diani Beach Medical'],
    county: 'Kwale',
    countyCode: '002',
    town: 'Diani Beach',
    area: 'Ukunda',
    address: 'Diani Beach Rd, next to Carrefour, Diani',
    category: 'hospital',
    categoryLabel: 'Tourist Medical & Emergency Hospital',
    coordinates: { lat: -4.2812, lng: 39.5841 },
    description: 'Specialized 24/7 private hospital equipped with ICU, emergency resuscitation, diving hyperbaric chamber coordination, and air ambulance dispatch.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Open',
    contactPhone: '+254 700 900 800'
  },

  // ================= MOMBASA COUNTY (001) =================
  {
    id: 'poi-msa-fort-jesus',
    name: 'Fort Jesus UNESCO World Heritage Site',
    aliasNames: ['Fort Jesus', 'Fort Jesus Museum'],
    county: 'Mombasa',
    countyCode: '001',
    town: 'Mombasa Island',
    area: 'Old Town',
    address: 'Nkrumah Rd, Old Town, Mombasa',
    category: 'culture',
    categoryLabel: 'UNESCO World Heritage 16th Century Fortress',
    coordinates: { lat: -4.0628, lng: 39.6789 },
    description: 'Monumental 1593 fortress built by the Portuguese to guard the Old Port of Mombasa. Overlooks the Indian Ocean with ancient cannons and museum galleries.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    openingHours: '8:00 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 12,
    entryFeeKES: 200
  },
  {
    id: 'poi-msa-moi-airport',
    name: 'Moi International Airport Mombasa (MBA)',
    aliasNames: ['Moi Airport', 'Mombasa International Airport'],
    county: 'Mombasa',
    countyCode: '001',
    town: 'Moi Airport / Port Reitz, Mombasa',
    area: 'Port Reitz',
    address: 'Airport Rd, Mombasa',
    category: 'airport',
    categoryLabel: 'International Coastal Airport',
    coordinates: { lat: -4.0348, lng: 39.5942 },
    description: 'The premier international airport serving the Kenya Coast with direct chartered European and regional African flights.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Open'
  },
  {
    id: 'poi-msa-sgr-mombasa',
    name: 'Mombasa SGR Terminus (Miritini)',
    aliasNames: ['Mombasa Railway Station', 'Miritini Terminus'],
    county: 'Mombasa',
    countyCode: '001',
    town: 'Miritini, Mombasa',
    area: 'Miritini',
    address: 'Miritini, Mombasa, Kenya',
    category: 'transport',
    categoryLabel: 'SGR Train Terminal',
    coordinates: { lat: -4.0042, lng: 39.5936 },
    description: 'Coastal terminus of the Madaraka Express railway connecting directly with Nairobi in 4.5 hours.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 11:00 PM'
  },
  {
    id: 'poi-msa-haller-park',
    name: 'Haller Park & Bamburi Nature Trail',
    aliasNames: ['Haller Park', 'Bamburi Quarry Sanctuary'],
    county: 'Mombasa',
    countyCode: '001',
    town: 'Bamburi, Mombasa',
    area: 'Bamburi',
    address: 'Mombasa-Malindi Rd, Bamburi',
    category: 'nature',
    categoryLabel: 'Reclaimed Quarry Wildlife Sanctuary',
    coordinates: { lat: -4.0206, lng: 39.7153 },
    description: 'World-renowned environmental rehabilitation triumph converting an abandoned limestone quarry into a lush ecological forest sanctuary with giant tortoises, hippos, and giraffes.',
    image: 'https://images.unsplash.com/photo-1547721064-362ab9f60d74?auto=format&fit=crop&w=1000&q=80',
    openingHours: '8:00 AM – 5:00 PM',
    rating: 4.7,
    entryFeeUSD: 14,
    entryFeeKES: 500
  },

  // ================= KILIFI COUNTY (003) =================
  {
    id: 'poi-klf-watamu-marine',
    name: 'Watamu Marine National Park & Reserve',
    aliasNames: ['Watamu Marine Park', 'Watamu Coral Gardens'],
    county: 'Kilifi',
    countyCode: '003',
    town: 'Watamu',
    area: 'Watamu Bay',
    address: 'Turtle Bay Rd, Watamu, Kilifi',
    category: 'park',
    categoryLabel: 'Coral Marine National Park & Turtle Haven',
    coordinates: { lat: -3.3667, lng: 40.0167 },
    description: 'Part of an internationally protected UN biosphere reserve, home to over 250 species of coral, sea turtles, and white-sand sandbars.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:30 AM – 6:00 PM',
    rating: 4.9,
    entryFeeUSD: 20,
    entryFeeKES: 400
  },
  {
    id: 'poi-klf-gedi-ruins',
    name: 'Gedi Ruins National Monument',
    aliasNames: ['Gedi Ruins', 'Gede National Monument'],
    county: 'Kilifi',
    countyCode: '003',
    town: 'Gede / Watamu',
    area: 'Gede',
    address: 'Gede-Watamu Rd, Kilifi',
    category: 'culture',
    categoryLabel: '12th Century Medieval Swahili City',
    coordinates: { lat: -3.3089, lng: 40.0175 },
    description: 'Mysterious 12th-century medieval Swahili stone town nestled inside lush indigenous coastal forest, featuring ancient palace, mosques, and stone bathtubs.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:00 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 10,
    entryFeeKES: 200
  },

  // ================= LAMU COUNTY (005) =================
  {
    id: 'poi-lmu-old-town',
    name: 'Lamu Old Town UNESCO Heritage Site',
    aliasNames: ['Lamu Old Town', 'Lamu Island Swahili Settlement'],
    county: 'Lamu',
    countyCode: '005',
    town: 'Lamu Island',
    area: 'Waterfront',
    address: 'Seafront, Lamu Island, Kenya',
    category: 'culture',
    categoryLabel: 'UNESCO Living Swahili Settlement',
    coordinates: { lat: -2.2696, lng: 40.9006 },
    description: 'The oldest and best-preserved Swahili settlement in East Africa. No cars allowed on the island; transit is entirely by foot, donkey, or wooden dhow.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    openingHours: 'Open Always',
    rating: 4.9,
    reviewCount: 1450
  },
  {
    id: 'poi-lmu-manda-airport',
    name: 'Manda Airport Lamu (LAU)',
    aliasNames: ['Manda Airstrip', 'Lamu Airport'],
    county: 'Lamu',
    countyCode: '005',
    town: 'Manda Island, Lamu',
    area: 'Manda Island',
    address: 'Manda Island, Lamu, Kenya',
    category: 'airport',
    categoryLabel: 'Archipelago Island Airport',
    coordinates: { lat: -2.2536, lng: 40.9131 },
    description: 'Airport on Manda Island serving Lamu. Passengers transfer from flight straight to traditional wooden motorboats for the 10-minute crossing to Lamu town.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80',
    openingHours: 'Daylight operations'
  },

  // ================= KAJIADO COUNTY (034) =================
  {
    id: 'poi-kaj-amboseli',
    name: 'Amboseli National Park - Observation Hill',
    aliasNames: ['Amboseli', 'Amboseli National Park', 'Kilimanjaro Amboseli'],
    county: 'Kajiado',
    countyCode: '034',
    town: 'Loitokitok / Namanga',
    area: 'Amboseli Basin',
    address: 'C103 Amboseli Route, Kajiado',
    category: 'park',
    categoryLabel: 'Kilimanjaro Backdrop & Giant Tusker Sanctuary',
    coordinates: { lat: -2.6527, lng: 37.2606 },
    description: 'Iconic African landscape: massive elephant families roaming golden plains with snow-capped Mount Kilimanjaro towering in the background.',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:30 PM',
    rating: 4.9,
    reviewCount: 3120,
    entryFeeUSD: 80,
    entryFeeKES: 1500,
    linkedPackageIds: ['3d-amboseli-kilimanjaro-safari']
  },

  // ================= TAITA-TAVETA COUNTY (006) =================
  {
    id: 'poi-ttv-tsavo-west-mzima',
    name: 'Tsavo West National Park - Mzima Springs',
    aliasNames: ['Tsavo West', 'Mzima Springs', 'Shetani Lava'],
    county: 'Taita-Taveta',
    countyCode: '006',
    town: 'Mtito Andei / Voi',
    area: 'Tsavo West',
    address: 'Tsavo West National Park, Kenya',
    category: 'park',
    categoryLabel: 'Volcanic Springs & Dust-Red Elephants',
    coordinates: { lat: -2.9908, lng: 38.0264 },
    description: 'Fifty million gallons of crystal-clear underground volcanic spring water daily, featuring a sunken glass viewing chamber to observe hippos swimming underwater.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 75,
    entryFeeKES: 1200
  },
  {
    id: 'poi-ttv-sgr-voi',
    name: 'Voi SGR Railway Station',
    aliasNames: ['Voi Station', 'Voi SGR'],
    county: 'Taita-Taveta',
    countyCode: '006',
    town: 'Voi Town',
    area: 'Voi',
    address: 'A109 Highway, Voi, Kenya',
    category: 'transport',
    categoryLabel: 'SGR Safari Junction Station',
    coordinates: { lat: -3.3963, lng: 38.5678 },
    description: 'Key junction station on the Madaraka Express line where safari travelers disembark directly for Tsavo East and West safaris.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 9:00 PM'
  },

  // ================= NYERI & MERU / CENTRAL (019, 012) =================
  {
    id: 'poi-cen-mt-kenya-sirimon',
    name: 'Mount Kenya National Park - Sirimon Gate',
    aliasNames: ['Mount Kenya', 'Mt Kenya', 'Sirimon Gate', 'Point Lenana'],
    county: 'Meru',
    countyCode: '012',
    town: 'Nanyuki / Timau',
    area: 'Sirimon Valley',
    address: 'Nanyuki-Meru Rd, Kenya',
    category: 'mountain',
    categoryLabel: 'Africa’s 2nd Highest Peak (5,199m)',
    coordinates: { lat: 0.0039, lng: 37.2411 },
    description: 'Africa’s second highest mountain, featuring jagged volcanic peaks (Batian, Nelion, Point Lenana) and enchanted Afro-Alpine lobelia valleys.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.9,
    entryFeeUSD: 70,
    entryFeeKES: 1000,
    safetyTips: 'Always hike with licensed KWS mountain guides. Acclimatize gradually to avoid mountain sickness.'
  },
  {
    id: 'poi-lai-ol-pejeta',
    name: 'Ol Pejeta Conservancy & Sweetwaters Chimpanzees',
    aliasNames: ['Ol Pejeta', 'Sweetwaters', 'Ol Pejeta Rhino Sanctuary'],
    county: 'Laikipia',
    countyCode: '031',
    town: 'Nanyuki',
    area: 'Nanyuki West',
    address: 'Nanyuki-Rumuruti Rd, Nanyuki',
    category: 'park',
    categoryLabel: 'Black Rhino Sanctuary & Chimpanzee Haven',
    coordinates: { lat: 0.0078, lng: 36.9639 },
    description: 'Largest black rhino sanctuary in East Africa and home to the world’s last two remaining Northern White Rhinos (Najin and Fatu). Also hosts Sweetwaters Chimpanzee Sanctuary.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:00 AM – 7:00 PM',
    rating: 4.9,
    reviewCount: 3820,
    entryFeeUSD: 90,
    entryFeeKES: 1400
  },

  // ================= SAMBURU & ISIOLO (025, 011) =================
  {
    id: 'poi-sam-samburu-reserve',
    name: 'Samburu National Reserve - Archer’s Post Gate',
    aliasNames: ['Samburu Reserve', 'Samburu National Reserve', 'Samburu'],
    county: 'Samburu',
    countyCode: '025',
    town: 'Archer’s Post',
    area: 'Ewaso Nyiro River',
    address: 'A2 Highway Archer’s Post, Samburu',
    category: 'park',
    categoryLabel: 'Northern Semi-Arid & Samburu Special 5',
    coordinates: { lat: 0.5833, lng: 37.5333 },
    description: 'Rugged wilderness along the brown Ewaso Nyiro river with unique endemic species: Grevy’s zebra, reticulated giraffe, gerenuk, Somali ostrich, and beisa oryx.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 70,
    entryFeeKES: 1000
  },

  // ================= KISUMU & WESTERN (042, 037) =================
  {
    id: 'poi-ksm-impala',
    name: 'Kisumu Impala Sanctuary & Lake Victoria Boardwalk',
    aliasNames: ['Kisumu Impala', 'Impala Sanctuary Kisumu'],
    county: 'Kisumu',
    countyCode: '042',
    town: 'Kisumu City',
    area: 'Lake Victoria Shore',
    address: 'Harambee Rd, Kisumu',
    category: 'park',
    categoryLabel: 'Lakeside Impala & Cheetah Sanctuary',
    coordinates: { lat: -0.1167, lng: 34.7431 },
    description: 'Lakeside walking reserve holding herds of free-ranging wild impalas, sitatunga antelopes, cheetahs, and Lake Victoria papyrus birds.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.6,
    entryFeeUSD: 20,
    entryFeeKES: 300
  },
  {
    id: 'poi-ksm-airport',
    name: 'Kisumu International Airport (KIS)',
    aliasNames: ['Kisumu Airport', 'KIS Airport'],
    county: 'Kisumu',
    countyCode: '042',
    town: 'Kisumu City',
    area: 'Airport Rd',
    address: 'Busia Rd, Kisumu',
    category: 'airport',
    categoryLabel: 'Western Kenya International Hub',
    coordinates: { lat: -0.0861, lng: 34.7289 },
    description: 'Modern airport linking Western Kenya, Lake Victoria, Kakamega Forest, and Masai Mara with daily flights.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 10:00 PM'
  },
  {
    id: 'poi-kak-rainforest',
    name: 'Kakamega Tropical Rainforest Reserve',
    aliasNames: ['Kakamega Forest', 'Kakamega Forest Reserve'],
    county: 'Kakamega',
    countyCode: '037',
    town: 'Shinyalu / Kakamega',
    area: 'Isiukhu',
    address: 'Shinyalu Rd, Kakamega',
    category: 'nature',
    categoryLabel: 'Equatorial Guineo-Congolian Rainforest',
    coordinates: { lat: 0.2833, lng: 34.8667 },
    description: 'Kenya’s only equatorial tropical rainforest. Paradise for birdwatchers with over 360 bird species, 380 tree species, and rare De Brazza’s monkeys.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:30 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 25,
    entryFeeKES: 300
  },

  // ================= TURKANA & NORTHERN (023, 010) =================
  {
    id: 'poi-tur-central-island',
    name: 'Lake Turkana - Central Island National Park',
    aliasNames: ['Central Island', 'Turkana Crocodile Park', 'Jade Sea Island'],
    county: 'Turkana',
    countyCode: '023',
    town: 'Kalokol / Eliye Springs',
    area: 'Lake Turkana',
    address: 'Lake Turkana, Kenya',
    category: 'park',
    categoryLabel: 'Volcanic Island & Nile Crocodile Nursery',
    coordinates: { lat: 3.5, lng: 36.0417 },
    description: 'Three active volcanic crater lakes in the center of the world’s largest permanent desert lake. World’s premier natural breeding ground for Nile crocodiles.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    openingHours: 'Daylight boat safaris',
    rating: 4.9,
    entryFeeUSD: 25,
    entryFeeKES: 300
  },
  {
    id: 'poi-mar-desert-oasis',
    name: 'Chalbi Desert & Kalacha Oasis',
    aliasNames: ['Chalbi Desert', 'Chalbi Salt Flat', 'Kalacha Oasis'],
    county: 'Marsabit',
    countyCode: '010',
    town: 'North Horr / Kalacha',
    area: 'Chalbi Basin',
    address: 'Marsabit-North Horr Route, Kenya',
    category: 'nature',
    categoryLabel: 'True Desert Salt Pan & Mirages',
    coordinates: { lat: 2.85, lng: 37.45 },
    description: 'Kenya’s true desert of blinding white salt flats, ancient dried lakebed sand, and freshwater doum palm oasis pools at Kalacha.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Access',
    rating: 4.9
  },

  // ================= ELGEYO-MARAKWET & UASIN GISHU (028, 027) =================
  {
    id: 'poi-egm-iten-rim',
    name: 'Iten Great Rift Valley Rim & Viewpoint',
    aliasNames: ['Iten Viewpoint', 'Home of Champions Iten', 'Kerio View'],
    county: 'Elgeyo-Marakwet',
    countyCode: '028',
    town: 'Iten',
    area: 'Kerio Escarpment',
    address: 'Eldoret-Iten-Kabarnet Rd, Iten',
    category: 'viewpoint',
    categoryLabel: '1,000m Escarpment Lookout & Paragliding',
    coordinates: { lat: 0.6728, lng: 35.5089 },
    description: 'The global capital of marathon running at 2,400m altitude. Overlooks a breathtaking 1,000-meter drop into the Kerio Valley.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Access',
    rating: 4.9
  },
  {
    id: 'poi-eld-airport',
    name: 'Eldoret International Airport (EDL)',
    aliasNames: ['Eldoret Airport', 'EDL Airport'],
    county: 'Uasin Gishu',
    countyCode: '027',
    town: 'Eldoret City',
    area: 'Kapseret',
    address: 'Kisumu-Eldoret Rd, Eldoret',
    category: 'airport',
    categoryLabel: 'International Cargo & Passenger Airport',
    coordinates: { lat: 0.4044, lng: 35.2389 },
    description: 'Major air terminal serving the North Rift athletics and agricultural corridor with modern passenger facilities.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 10:00 PM'
  },

  // ================= BARINGO COUNTY (030) =================
  {
    id: 'poi-bar-lake-bogoria',
    name: 'Lake Bogoria National Reserve Hot Springs',
    aliasNames: ['Lake Bogoria', 'Bogoria Geysers', 'Lake Bogoria Geysers'],
    county: 'Baringo',
    countyCode: '030',
    town: 'Marigat / Mogotio',
    area: 'Loboi Gate',
    address: 'Baringo-Bogoria Rd, Kenya',
    category: 'park',
    categoryLabel: 'Geothermal Geysers & Pink Flamingos',
    coordinates: { lat: 0.25, lng: 36.1 },
    description: 'Alkaline lake famous for boiling sulfur geysers shooting water up to 5 meters into the air, while millions of pink flamingos feed along the shore.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.8,
    entryFeeUSD: 25,
    entryFeeKES: 300
  },

  // ================= TRANS-NZOIA & BUNGOMA (026, 039) =================
  {
    id: 'poi-tnz-saiwa-swamp',
    name: 'Saiwa Swamp National Park',
    aliasNames: ['Saiwa Swamp', 'Saiwa Sitatunga Sanctuary'],
    county: 'Trans-Nzoia',
    countyCode: '026',
    town: 'Kitale',
    area: 'Kipsaina',
    address: 'Kitale-Kapenguria Rd, Trans-Nzoia',
    category: 'park',
    categoryLabel: 'Kenya’s Smallest Park (Aquatic Sitatunga)',
    coordinates: { lat: 1.0967, lng: 35.1167 },
    description: 'At only 3 sq km, Kenya’s smallest national park features wooden canopy treehouses and boardwalks to observe the rare semi-aquatic Sitatunga antelope.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.7,
    entryFeeUSD: 20,
    entryFeeKES: 300
  },
  {
    id: 'poi-bgm-kitum-cave',
    name: 'Mount Elgon National Park - Kitum Elephant Cave',
    aliasNames: ['Kitum Cave', 'Mount Elgon Cave Elephants', 'Mt Elgon'],
    county: 'Bungoma',
    countyCode: '039',
    town: 'Kimilili / Kapsokwony',
    area: 'Mount Elgon',
    address: 'Mount Elgon National Park Gate, Bungoma',
    category: 'mountain',
    categoryLabel: 'Subterranean Salt-Mining Elephant Caves',
    coordinates: { lat: 1.05, lng: 34.75 },
    description: 'Ancient lava tube cave stretching 200m into Mount Elgon where generations of elephants venture in the dark to gouge sodium-rich salt from the stone walls with their tusks.',
    image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 5:30 PM',
    rating: 4.9,
    entryFeeUSD: 26,
    entryFeeKES: 300
  },

  // ================= HOMA BAY COUNTY (043) =================
  {
    id: 'poi-hba-ruma',
    name: 'Ruma National Park - Roan Antelope Haven',
    aliasNames: ['Ruma National Park', 'Ruma Park', 'Lambwe Valley'],
    county: 'Homa Bay',
    countyCode: '043',
    town: 'Homa Bay / Mbita',
    area: 'Lambwe Valley',
    address: 'Homa Bay-Mbita Rd, Homa Bay',
    category: 'park',
    categoryLabel: 'Kenya’s Only Wild Roan Antelope Haven',
    coordinates: { lat: -0.65, lng: 34.3333 },
    description: 'The sole remaining sanctuary in Kenya protecting the majestic endangered Roan Antelope, alongside black rhinos and leopards in the picturesque Lambwe Valley.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    openingHours: '6:00 AM – 6:00 PM',
    rating: 4.7,
    entryFeeUSD: 20,
    entryFeeKES: 300
  },
  {
    id: 'poi-hba-rusinga-island',
    name: 'Rusinga Island & Lake Victoria Beach Lodge',
    aliasNames: ['Rusinga Island', 'Rusinga'],
    county: 'Homa Bay',
    countyCode: '043',
    town: 'Mbita Point',
    area: 'Lake Victoria',
    address: 'Rusinga Island Causeway, Homa Bay',
    category: 'nature',
    categoryLabel: 'Prehistoric Island & Fishing Sanctuary',
    coordinates: { lat: -0.4, lng: 34.1833 },
    description: 'Tranquil island retreat in Lake Victoria connected by causeway to Mbita, featuring pre-human Proconsul fossil sites, giant fig trees, and birdwatching.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    openingHours: 'Open Always',
    rating: 4.8
  },

  // ================= KISII COUNTY (045) =================
  {
    id: 'poi-ksi-tabaka',
    name: 'Tabaka Soapstone Carving Workshops',
    aliasNames: ['Tabaka Soapstone', 'Kisii Soapstone', 'Tabaka'],
    county: 'Kisii',
    countyCode: '045',
    town: 'Tabaka',
    area: 'Tabaka Quarries',
    address: 'Kisii-Tabaka Rd, Kisii',
    category: 'culture',
    categoryLabel: 'World Famous Soapstone Artisan Guild',
    coordinates: { lat: -0.7667, lng: 34.6667 },
    description: 'Center of Kenya’s world-famous soapstone craft. Visit open-air quarries and artisan studios where raw soapstone is sculpted into elegant wildlife figures and bowls.',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    openingHours: '8:00 AM – 5:30 PM',
    rating: 4.8
  },

  // ================= EMBU & KIRINYAGA (014, 020) =================
  {
    id: 'poi-krn-sagana-rafting',
    name: 'Sagana River Rafting & Adventure Basecamp',
    aliasNames: ['Sagana Rafting', 'Tana River Rafting', 'Savage Wilderness Sagana'],
    county: 'Kirinyaga',
    countyCode: '020',
    town: 'Sagana',
    area: 'Tana River Rapids',
    address: 'Nairobi-Nyeri Rd, Sagana',
    category: 'activity',
    categoryLabel: 'White-Water Rafting & Bungee Jumping',
    coordinates: { lat: -0.6667, lng: 37.2 },
    description: 'Adrenaline capital of Kenya: Grade 3 to 5 white-water rafting on the Tana River, 60m bungee jumping, kayaking, and riverside glamping.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:30 AM – 6:00 PM',
    rating: 4.9,
    entryFeeUSD: 65,
    entryFeeKES: 5000
  },

  // ================= MACHAKOS & MAKUENI (016, 017) =================
  {
    id: 'poi-mks-fourteen-falls',
    name: 'Fourteen Falls & Ol Donyo Sabuk National Park',
    aliasNames: ['Fourteen Falls', 'Ol Donyo Sabuk', 'Kilimambogo'],
    county: 'Machakos',
    countyCode: '016',
    town: 'Thika / Kilimambogo',
    area: 'Athi River Basin',
    address: 'Thika-Garissa Rd, Machakos',
    category: 'nature',
    categoryLabel: 'Cascading Waterfalls & Buffalo Sanctuary',
    coordinates: { lat: -1.1333, lng: 37.25 },
    description: 'Fourteen distinct waterfalls cascading across the Athi River against the towering silhouette of Mount Kilimambogo (Ol Donyo Sabuk).',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    openingHours: '7:00 AM – 6:00 PM',
    rating: 4.6,
    entryFeeUSD: 10,
    entryFeeKES: 200
  },
  {
    id: 'poi-mku-mtito-andei-stop',
    name: 'Mtito Andei Safari Highway Oasis & Fuel Hub',
    aliasNames: ['Mtito Andei', 'Mtito Rest Stop'],
    county: 'Makueni',
    countyCode: '017',
    town: 'Mtito Andei',
    area: 'Mombasa Highway',
    address: 'A109 Nairobi-Mombasa Highway, Mtito Andei',
    category: 'fuel',
    categoryLabel: '24/7 Safari Highway Stop & Shell Fuel',
    coordinates: { lat: -2.6833, lng: 38.1667 },
    description: 'Halfway point between Nairobi and Mombasa on Highway A109. Full 24/7 fuel, vehicle workshop, pharmacy, and buffet dining for safari buses and overland travelers.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80',
    openingHours: '24 Hours Open'
  }
];

// Helper to find location by flexible string with aliases & typos
export function searchKenyaLocations(query: string): GeoLocationRecord[] {
  if (!query || query.trim() === '') return KENYA_GEO_LOCATIONS;

  const normalized = query.toLowerCase().trim().replace(/['’]/g, '');

  return KENYA_GEO_LOCATIONS.filter((loc) => {
    const nameMatch = loc.name.toLowerCase().replace(/['’]/g, '').includes(normalized);
    const countyMatch = loc.county.toLowerCase().includes(normalized);
    const townMatch = loc.town.toLowerCase().includes(normalized);
    const descMatch = loc.description.toLowerCase().includes(normalized);
    const catMatch = loc.categoryLabel.toLowerCase().includes(normalized);
    const aliasMatch = loc.aliasNames?.some((a) =>
      a.toLowerCase().replace(/['’]/g, '').includes(normalized)
    );

    return nameMatch || countyMatch || townMatch || descMatch || catMatch || aliasMatch;
  });
}

// Haversine Distance (in kilometers)
export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Realistic Road & Walking Estimates
// Accounts for Kenyan road conditions (safari corrugation, highway traffic, terrain)
export function estimateRealisticTravelTimes(distanceKm: number): {
  drivingTimeMinutes: number;
  drivingFormatted: string;
  walkingTimeMinutes: number;
  walkingFormatted: string;
  isFlyRecommended: boolean;
} {
  // Driving speed estimate:
  // Short distance (< 15km) city traffic: ~25 km/h
  // Medium distance (15 - 150km) paved highway: ~60 km/h
  // Long distance / bush tracks (> 150km): ~50 km/h average
  let avgSpeedKmH = 55;
  if (distanceKm <= 15) {
    avgSpeedKmH = 28;
  } else if (distanceKm > 180) {
    avgSpeedKmH = 50;
  }

  const driveMinutes = Math.round((distanceKm / avgSpeedKmH) * 60);
  const walkMinutes = Math.round((distanceKm / 4.8) * 60);

  // Formatting helper
  const formatTime = (mins: number) => {
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem > 0 ? `${hrs} hr ${rem} mins` : `${hrs} hrs`;
  };

  return {
    drivingTimeMinutes: driveMinutes,
    drivingFormatted: formatTime(driveMinutes),
    walkingTimeMinutes: walkMinutes,
    walkingFormatted: distanceKm <= 35 ? formatTime(walkMinutes) : `${Math.round(distanceKm / 25)} days trek`,
    isFlyRecommended: distanceKm > 260
  };
}
