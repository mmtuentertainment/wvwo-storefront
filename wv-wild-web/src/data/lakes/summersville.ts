/**
 * Summersville Lake Data
 * SPEC-23: Enriched data from verified research sources
 *
 * Sources:
 * - U.S. Army Corps of Engineers Huntington District
 * - West Virginia Division of Natural Resources (WVDNR)
 * - Skin Diver Magazine ("Little Bahamas of the East")
 * - Official marina and campground documentation
 *
 * Data includes:
 * - Lake specifications (2,790 acres, 327ft max depth, 60 miles shoreline)
 * - Fishing species with state records and regulations
 * - Scuba diving (20-45ft visibility, Sarge's Dive Shop)
 * - Marina services (473 slips, rentals $399-439/day)
 * - Beach and swimming (Battle Run Beach, 1,000ft)
 * - Camping facilities (Battle Run 117 sites)
 * - Cross-links to related destinations
 */

import type { LakeTemplateProps } from '../../types/adventure';

/**
 * Complete lake data for Summersville Lake
 * Ready to spread into LakeTemplate component
 */
export const summersvilleLakeData: LakeTemplateProps = {
  // Basic Info
  name: 'Summersville Lake',
  slug: 'summersville',
  image: '/images/summersville-lake-hero.jpg',
  imageAlt: 'Summersville Lake crystal clear turquoise waters with sandstone cliffs rising from the shoreline',
  tagline: 'The Little Bahamas of the East - Skin Diver Magazine',
  description: 'West Virginia\'s largest lake with 2,790 acres of crystal-clear water reaching 327 feet deep. Famous for 20-45 foot visibility, world-class scuba diving, exceptional smallmouth bass fishing, and dramatic sandstone cliffs. 30 minutes from WV Wild Outdoors.',

  // Lake Specifications
  lakeSpecs: {
    surfaceAcres: 2790,
    maxDepth: 327,
    shorelineMiles: 60,
    visibility: '20-45 feet',
    summerPoolElevation: 1652,
    winterPoolElevation: 1575,
    waterType: 'Oligotrophic - low nutrients, minimal algae',
    nickname: 'Little Bahamas of the East',
  },

  // Quick Stats (Hero Section)
  stats: [
    { value: '2,790', label: 'Lake Acres', icon: 'area' as const },
    { value: '327 ft', label: 'Max Depth', icon: 'depth' as const },
    { value: '60 mi', label: 'Shoreline', icon: 'distance' as const },
    { value: '20-45 ft', label: 'Visibility', icon: 'visibility' as const },
  ],

  // Fishing Spots (Where to Fish Section)
  fishingSpots: [
    {
      name: 'Main Lake Basin',
      depth: '20-80 feet',
      structure: 'Rocky ledges, submerged points, deep channels near dam',
      species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      access: 'Boat required - launch from Battle Run, Salmon Run, or Long Point',
      tips: 'Drop shot rigs and tube jigs on 6-8 lb test for clear water conditions',
    },
    {
      name: 'North Shore Points',
      depth: '15-40 feet',
      structure: 'Rock formations, underwater shelves, scattered boulders',
      species: ['Smallmouth Bass', 'Largemouth Bass', 'Crappie'],
      access: 'Boat recommended - some shore access at select points',
      tips: 'Football jigs with Rage Craw trailers dragged slowly along rocky bottom',
    },
    {
      name: 'Dam Area',
      depth: '40-327 feet',
      structure: 'Deep water, rocky dam face, current breaks, tailwater below',
      species: ['Walleye', 'Muskie', 'Smallmouth Bass', 'Trout (tailwater)'],
      access: 'Boat only - deep water structure. Tailwater accessible from shore.',
      tips: 'Walleye on jigs with live minnow trailers. Tailwater stocked with rainbow, brown, and tiger trout.',
    },
    {
      name: 'Cove Shallows',
      depth: '5-15 feet',
      structure: 'Weed beds, brush piles, submerged timber',
      species: ['Largemouth Bass', 'Crappie', 'Bluegill', 'Yellow Perch'],
      access: 'Kayak and shore fishing available in back coves',
      tips: 'Spring crappie spawn in shallow coves - use small jigs and live minnows around brush piles',
    },
  ],

  // Fish Species with Regulations
  fishSpecies: [
    {
      name: 'Walleye',
      bestSeason: 'Fall and Winter',
      regulations: 'SLOT LIMIT: All walleye 20-30 inches must be released immediately. Daily limit 8, only 1 over 30 inches.',
      stateRecord: '17 lbs 0.82 oz, 32 inches (Kanawha River, 2003)',
      consumptionAdvisory: 'Limit to 1 meal per month due to mercury content',
    },
    {
      name: 'Smallmouth Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Daily limit 6 (combined with largemouth and spotted bass). No minimum size.',
      tips: 'Tube jigs on 1/8-ounce jig heads in watermelon color for schooling fish',
    },
    {
      name: 'Largemouth Bass',
      bestSeason: 'Spring and Summer',
      regulations: 'Daily limit 6 (combined with smallmouth and spotted bass). No minimum size.',
      tips: 'Topwater early morning and late evening. Texas-rigged worms in 4-5 inch range.',
    },
    {
      name: 'Muskie',
      bestSeason: 'Fall (September-November)',
      regulations: 'Minimum 30 inches. Daily limit 1.',
      tips: 'Large bucktails and jerkbaits. Heavy tackle for fish regularly running 40+ inches.',
    },
    {
      name: 'Channel Catfish',
      bestSeason: 'Summer',
      regulations: 'Daily limit 4. No minimum size.',
    },
    {
      name: 'Blue Catfish',
      bestSeason: 'Summer',
      regulations: 'Daily limit 2. Minimum 25 inches.',
    },
    {
      name: 'Flathead Catfish',
      bestSeason: 'Summer',
      regulations: 'Daily limit 30. No minimum size.',
      consumptionAdvisory: 'Limit to 1 meal per month due to mercury content',
    },
    {
      name: 'Common Carp',
      bestSeason: 'Spring and Summer',
      stateRecord: '45.2 lbs, 41.2 inches (Summersville Lake, 2022 - Ayden Minick)',
    },
    {
      name: 'Crappie',
      bestSeason: 'Spring',
      regulations: 'Daily limit 30 (combined black and white). No minimum size.',
    },
    {
      name: 'Trout (Tailwater)',
      bestSeason: 'Spring (stocked Feb-April)',
      regulations: 'Daily limit 6 combined species. No minimum size.',
      notes: 'Rainbow, brown, and tiger trout stocked in tailwaters below dam',
    },
  ],

  // Marina & Boat Access
  marinas: [
    {
      name: 'Summersville Lake Marina',
      type: 'Full-service marina with rentals',
      address: '1706 Summersville Airport Rd, Summersville, WV 26651',
      services: [
        '473 boat slips (WV\'s largest marina)',
        'Pontoon boat rentals (24\' x 8\', 12 passengers)',
        'Triumph fishing boats (17\', 4 passengers)',
        'Fuel dock',
        'Ship store (ice, snacks, supplies)',
        'Overnight slips ($25/night)',
      ],
      contact: '(304) 872-1331',
      website: 'summersvillelakemarina.com',
      hours: 'May 15 - Sept 14: 7:00 AM - 11:00 PM daily',
      fees: 'Pontoon rentals: $399 (Mon-Thu), $419 (Fri/Sun/Holidays), $439 (Sat) + fuel',
      rentalDetails: {
        deposit: '10% at booking, $1,000 security hold',
        checkIn: '7:00 AM - 12:00 PM',
        returnBy: '7:00 PM',
        operatorAge: 21,
        boaterSafetyCard: 'Required for operators born after Dec 31, 1986',
        restrictions: 'No alcohol, grills, rock-climbing gear, towing tubes/skiers',
      },
    },
    {
      name: 'Battle Run Boat Ramp',
      type: 'Public boat launch with beach',
      services: [
        'Paved multi-lane ramp (Ramps A and B)',
        'Kayak launch ramp',
        'Parking for trucks and trailers',
        'Adjacent to 1,000-foot swimming beach',
        'Restrooms and shower facilities nearby',
      ],
      hours: 'May 1 - Columbus Day',
      fees: '$5 day use per vehicle ($40 annual pass)',
    },
    {
      name: 'Salmon Run Boat Ramp',
      type: 'Public boat launch - YEAR-ROUND ACCESS',
      address: 'Off Airport Road, adjacent to US Route 19',
      services: [
        '2-lane paved boat ramp',
        'Kayak launch',
        '39 car spaces, 20 truck/trailer spaces',
        'Vault toilet restrooms',
        'Fishing pier',
        'Trail access to Pirates Cove',
      ],
      hours: 'YEAR-ROUND (only launch open in winter)',
      fees: '$5 day use per vehicle',
      notes: 'Day-use only - no overnight camping. Gateway to Gauley River Gorge.',
    },
    {
      name: 'Long Point Boat Ramp',
      type: 'Public boat launch at marina',
      services: [
        'Paved ramp',
        'Parking area',
        'Near scenic overlook',
        'Access to scuba diving sites',
        'Hiking trails to sandstone cliffs',
      ],
      hours: 'Seasonal',
      fees: '$5 boat launch fee',
    },
  ],

  // Scuba Diving Section (NEW)
  scubaDiving: {
    overview: 'Summersville Lake is a premier inland scuba diving destination in the eastern United States, nicknamed "the cleanest, clearest freshwater lake east of the Mississippi" by Skin Diver Magazine.',
    visibility: '20-45 feet average, up to 70 feet under optimal conditions',
    waterTemperature: '78-85°F June through September',
    bestMonths: 'June through September',
    certificationRequired: true,
    diveSites: [
      {
        name: 'Long Point Cliff',
        description: '#1 dive location - dramatic wall descents with steep sandstone cliffs descending 100+ feet below surface',
        difficulty: 'Intermediate to Advanced',
      },
      {
        name: 'The Overlook',
        description: 'Panoramic underwater vistas with excellent visibility',
        difficulty: 'Intermediate',
      },
      {
        name: 'Bubble\'s Cave',
        description: 'Popular formation offering sheltered diving with interesting rock features',
        difficulty: 'Intermediate',
      },
      {
        name: 'Submerged Town of Gad',
        description: 'Ghost town flooded in 1966 - foundations, roadways, and rock carvings visible during deep drawdowns or accessible by experienced divers',
        difficulty: 'Advanced',
      },
      {
        name: 'Thomas Patrick Wreck',
        description: 'Small boat intentionally sunk in 1990s for diver interest, approximately 30 feet deep near dam at winter boat ramp',
        difficulty: 'Beginner to Intermediate',
      },
    ],
    diveShop: {
      name: 'Sarge\'s Dive Shop',
      location: 'Long Point Marina',
      services: [
        'NAUI and SDI scuba certification classes',
        'Equipment sales and rental',
        'Visual and hydro tank inspection',
        'Scuba and snorkeling charters',
        'Over 100 years combined dive experience among staff',
      ],
      website: 'sarges.net',
    },
  },

  // Swimming & Beach (NEW)
  swimming: {
    primaryBeach: {
      name: 'Battle Run Beach',
      length: '1,000 feet',
      season: 'May 1 - Columbus Day (peak: June-September)',
      lifeguards: false,
      fees: '$5 day use per vehicle ($40 annual pass)',
      amenities: [
        'Vault toilet restrooms with changing areas',
        '3 shower houses (adjacent to campground)',
        'Picnic shelters ($70 for Damsite area shelters)',
        'Picnic tables and grills',
        'Volleyball facilities',
        'Kayak launch ramp',
      ],
      rules: [
        'NO LIFEGUARDS - swim at your own risk',
        'Pets STRICTLY PROHIBITED at beach',
        'Alcohol STRICTLY PROHIBITED at beach',
        'Always swim with a buddy',
        'Life jackets recommended',
        'Swimming prohibited on boat ramps',
      ],
      waterTemperature: '68-80°F in summer',
    },
    passInfo: 'America the Beautiful Pass, Golden Age and Golden Access Passports provide FREE day use access',
  },

  // Cliff Jumping Prohibition (CRITICAL SAFETY)
  cliffJumping: {
    status: 'PROHIBITED',
    since: 2007,
    enforcement: 'Citations and fines issued by USACE rangers',
    reason: '69 water-related deaths between 1993-2007 at Huntington District lakes',
    details: 'Entering the lake from a height greater than 6 feet is prohibited at all 19 USACE Huntington District lakes. This includes cliff jumping at Long Point and all other locations.',
    climbingNote: 'Deep water soloing (rock climbing) exists in a gray area - technically the falling part violates the regulation. Appalachian Mountain Guides operates permitted "deep water bouldering" trips with heights restricted to 10-15 feet.',
  },

  // Activities (Beyond Fishing)
  activities: [
    {
      name: 'Scuba Diving',
      description: 'World-class freshwater diving with 20-45 foot visibility. Explore sandstone walls descending 100+ feet, the submerged town of Gad, and the Thomas Patrick wreck. Certification required.',
      season: 'June through September (78-85°F water)',
      difficulty: 'Intermediate to Advanced',
      provider: 'Sarge\'s Dive Shop at Long Point Marina',
    },
    {
      name: 'Swimming',
      description: 'Battle Run Beach offers 1,000 feet of sandy beach on crystal-clear water. No lifeguards - swim at your own risk. Pets and alcohol prohibited at beach.',
      season: 'May 1 - Columbus Day (peak June-September)',
      difficulty: 'Beginner-friendly',
      fees: '$5 day use',
    },
    {
      name: 'Kayaking & Paddleboarding',
      description: 'Explore 60 miles of shoreline and dramatic sandstone cliffs. Launch from Battle Run, Salmon Run, or Long Point. Rentals available from Lakeside Outfitters and Summersville Lake Retreat.',
      season: 'May through October',
      difficulty: 'Beginner to Intermediate',
      rentalRates: 'Solo kayak $50 half-day/$75 full-day; SUP $50/$75; Guided tours $65 for 2 hours',
    },
    {
      name: 'Boating',
      description: 'West Virginia\'s largest lake with 473-slip marina. Pontoon boat rentals available. Three public boat ramps with $5 day use fee.',
      season: 'Marina: May 15 - Sept 14; Salmon Run ramp: Year-round',
      difficulty: 'All levels',
      fees: 'Pontoon rentals $399-439/day + fuel',
    },
    {
      name: 'Rock Climbing',
      description: 'Long Point features dramatic sandstone cliffs for deep water soloing. Heights range from 30-70 feet. Permitted guided trips available through Appalachian Mountain Guides.',
      season: 'Summer',
      difficulty: 'Advanced',
      note: 'Cliff jumping is PROHIBITED - climbing falls into regulatory gray area',
    },
    {
      name: 'Hiking',
      description: 'Pirates Cove Trail (0.7 mi easy-moderate) leads to iconic sandstone formations. Long Point Trail (4 mi loop) offers scenic overlooks. Summersville Lake State Park (177 acres) opened in 2023.',
      season: 'Year-round',
      difficulty: 'Easy to Moderate',
    },
  ],

  // Seasonal Fishing Guide
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Crappie', 'Smallmouth Bass', 'Largemouth Bass'],
      techniques: 'Crappie spawn in shallow coves - use small jigs and live minnows around brush piles. Bass move shallow - work spinnerbaits and soft plastics near warming banks. Finesse jigs with green pumpkin soft plastics on rocky points.',
      conditions: 'Water temperatures rising from 45°F to 65°F. Clear visibility improving. Summer pool usually achieved by mid-May.',
      kimNote: 'Stop by for crappie jigs and pre-spawn bass tackle. Water\'s still cold early on - bring layers.',
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie', 'Panfish'],
      techniques: 'Smallmouth on deep structure - drop shot rigs and tube jigs on 6-8 lb test. Walleye on points and ledges - troll crankbaits or jig with live bait. Topwater for largemouth early morning and late evening. Bomber crankbaits and Texas-rigged worms effective.',
      conditions: 'Water temps 68-80°F. Crystal clear - 20-45 feet visibility. Fish go deep midday. Peak scuba diving season.',
      kimNote: 'This is peak season - get out early before the sun gets high. Clear water means they can see you coming. Downsize your line.',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      techniques: 'Bass feed heavily pre-winter - work rocky points and ledges with bigger presentations. Muskie actively feeding - large bucktails and jerkbaits. Walleye follow baitfish schools and concentrate in tailwater areas.',
      conditions: 'Water cooling 65°F to 50°F. Visibility remains excellent. Fish feed aggressively before winter.',
      kimNote: 'Best muskie fishing of the year. Bring heavy tackle and be patient - it\'s the fish of 10,000 casts.',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Crappie'],
      techniques: 'Slow vertical jigging in deep water 40+ feet. Walleye on deep ledges near dam. Crappie suspend near submerged structure. Blade baits and finesse presentations. Fish the tailwater for stocked trout.',
      conditions: 'Water temps 38-45°F. Clear visibility. Lake lowered to 1,575 ft winter pool. Salmon Run is only year-round boat launch.',
      kimNote: 'Bundle up - it\'s cold but walleye bite is worth it. Night fishing allowed year-round. Fewer fish but bigger specimens.',
    },
  ],

  // Regulations & Safety
  regulations: [
    {
      category: 'Fishing License',
      details: 'West Virginia fishing license required for all anglers 15 and older. Resident annual $19, non-resident $54, 1-day non-resident $15. Available at WV Wild Outdoors or elicense.wv.gov.',
      important: true,
    },
    {
      category: 'Walleye Slot Limit (SPECIAL)',
      details: 'All walleye from 20 to 30 inches long MUST be returned immediately to the water. Daily creel limit: 8 walleye, only ONE may be over 30 inches. Mercury advisory: limit consumption to 1 meal per month.',
      link: 'https://www.wvdnr.gov/fishing/fishing-regulations/',
      important: true,
    },
    {
      category: 'Muskie Regulations',
      details: 'Minimum size limit 30 inches. Daily limit 1 fish. Use heavy tackle - these fish regularly run 40+ inches.',
      important: true,
    },
    {
      category: 'Bass Regulations',
      details: 'Daily limit 6 in any combination (smallmouth, largemouth, spotted bass). No minimum size. Possession limit 12. Tournament anglers with DNR permits may have exemptions.',
      important: false,
    },
    {
      category: 'Catfish Consumption Advisory',
      details: 'Flathead catfish: Limit to 1 meal per month due to mercury content. Check current WVDNR mercury advisory charts before keeping fish.',
      important: true,
    },
    {
      category: 'Boating Safety',
      details: 'Life jackets required for all persons on vessels. Children 12 and under must wear PFD at all times while underway. Boater safety card required for operators born after Dec 31, 1986. Navigation lights required after dark.',
      important: true,
    },
    {
      category: 'Cliff Jumping PROHIBITED',
      details: 'Jumping from heights greater than 6 feet is PROHIBITED at all Summersville Lake locations since 2007. Citations and fines issued. This applies to Long Point and all sandstone cliffs.',
      important: true,
    },
    {
      category: 'Beach Rules',
      details: 'Battle Run Beach: NO lifeguards provided - swim at your own risk. Pets and alcohol STRICTLY PROHIBITED at beach. Always swim with a buddy and wear a life jacket.',
      important: true,
    },
    {
      category: 'Camping Regulations',
      details: 'Battle Run Campground: 117 sites, $34/night electric, $24/night tent. NO PETS allowed at Battle Run. Quiet hours 10 PM - 8 AM. Max 14 nights per visit. No dispersed camping allowed on USACE lands.',
      important: false,
    },
    {
      category: 'Scuba Diving Safety',
      details: 'Certification required. Use dive flags when in the water. Check with Sarge\'s Dive Shop for site conditions and safety briefings. Summer water temps 78-85°F.',
      important: false,
    },
  ],

  // Campgrounds (Cross-linked)
  campgrounds: [
    {
      name: 'Battle Run Campground',
      slug: 'battle-run',
      operator: 'U.S. Army Corps of Engineers',
      sites: 117,
      siteTypes: ['110 electric (30 amp)', '7 tent-only primitive'],
      amenities: [
        'Flush toilets',
        '3 hot shower houses',
        'Laundry (coin-operated)',
        'Dump station',
        '1,000-foot swimming beach',
        'Boat ramps (A and B)',
        'Kayak launch',
        'Fishing pier',
        'Playground',
        'Basketball and volleyball courts',
      ],
      fees: '$34/night electric, $24/night tent',
      season: 'May 1 - Columbus Day',
      reservations: 'Recreation.gov or 1-877-444-6777 (6 months in advance for peak season)',
      policies: ['NO PETS (strictly enforced)', 'Quiet hours 10 PM - 8 AM', 'Max 14 nights per visit', 'Max 8 people per site'],
      contact: '304-872-3459 (campground) / 304-872-3412 (lake office)',
    },
    {
      name: 'Long Point Recreation Area',
      slug: 'long-point',
      operator: 'U.S. Army Corps of Engineers',
      sites: 8,
      siteTypes: ['Primitive sites (no hookups)'],
      amenities: ['Boat ramp', 'Hiking trails', 'Scenic overlook', 'Access to marina'],
      season: 'Year-round (primitive)',
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Light line (6-8 lb test fluorocarbon for clear water)', optional: false },
    { name: 'Tube jigs and soft plastics (watermelon color)', optional: false },
    { name: 'Drop shot rigs', optional: false },
    { name: 'Football jigs with crawdad trailers', optional: true },
    { name: 'Muskie tackle (heavy rods, 80 lb braid for 40"+ fish)', optional: true },
    { name: 'Blade baits (winter walleye)', optional: true },
    { name: 'Life jackets (required for all ages)', optional: false },
    { name: 'Sunscreen and polarized sunglasses', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Navigation lights (if boating after dark)', optional: true },
    { name: 'Scuba certification card (if diving)', optional: true },
    { name: 'Dive flag (required for scuba)', optional: true },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, line, and tackle for clear water smallmouth and walleye',
      href: '/shop/fishing',
    },
    {
      name: 'Kayaks & Paddleboards',
      description: 'Explore 60 miles of shoreline and sandstone cliffs',
      href: '/shop/kayaks',
    },
    {
      name: 'Camping Gear',
      description: 'Tents, coolers, and camp supplies for Battle Run Campground',
      href: '/shop/camping',
    },
    {
      name: 'Safety Equipment',
      description: 'Life jackets, first aid kits, and boating safety gear',
      href: '/shop/safety',
    },
  ],

  // Cross-Links to Related Destinations
  nearbyWMA: 'summersville',
  nearbyCampgrounds: ['battle-run'],
  nearbyStateParks: ['summersville-lake-state-park'],
  nearbyRivers: ['gauley'],

  // Meta Information
  difficulty: 'moderate',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.2217,
    lng: -80.9097,
  },

  // Contact Information
  contact: {
    usaceOffice: {
      name: 'USACE Summersville Lake Project Office',
      address: '2981 Summersville Lake Road, Summersville, WV 26651',
      phone: '304-872-3412',
      email: 'pa2@usace.army.mil',
      hours: '24-hour recording for lake level and stream info',
    },
    marina: {
      name: 'Summersville Lake Marina',
      phone: '(304) 872-1331',
      website: 'summersvillelakemarina.com',
    },
    diveShop: {
      name: 'Sarge\'s Dive Shop',
      website: 'sarges.net',
    },
    campground: {
      name: 'Battle Run Campground',
      phone: '304-872-3459',
      reservations: '1-877-444-6777 or Recreation.gov',
    },
  },

  // Official Links
  officialLinks: [
    {
      name: 'USACE Recreation Page',
      url: 'https://www.lrd.usace.army.mil/Missions/Recreation/Lakes/Summersville-Lake/',
    },
    {
      name: 'Real-Time Lake Levels',
      url: 'https://www.lrh-wc.usace.army.mil/wm/',
    },
    {
      name: 'Campground Reservations',
      url: 'https://www.recreation.gov/camping/campgrounds/233422',
    },
    {
      name: 'WV State Parks - Summersville Lake',
      url: 'https://wvstateparks.com/parks/summersville-lake-state-park/',
    },
    {
      name: 'WVDNR Fishing Regulations',
      url: 'https://wvdnr.gov/fishing/fishing-regulations/',
    },
  ],
};
