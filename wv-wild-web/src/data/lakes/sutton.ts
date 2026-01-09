/**
 * Sutton Lake Data
 * SPEC-24: Enriched data from verified research sources
 *
 * Sources:
 * - U.S. Army Corps of Engineers Huntington District
 * - West Virginia Division of Natural Resources (WVDNR)
 * - Official marina and campground documentation
 *
 * Data includes:
 * - Lake specifications (1,440 acres, 125ft max depth, 40 miles shoreline)
 * - Fishing species with regulations (walleye slot limit 20-30 inches)
 * - Marina services (230 slips, rentals available)
 * - Swimming beaches (Bee Run, South Abutment)
 * - Camping facilities (Gerald R. Freeman 156 sites, Bakers Run 77 sites, Bee Run 12 sites)
 * - Cross-links to related destinations
 */

import type { LakeTemplatePropsEnriched } from '../../types/lake-enrichment';

/**
 * Complete lake data for Sutton Lake
 * Uses LakeTemplatePropsEnriched for SPEC-24 enrichment fields.
 * Ready to spread into LakeTemplate component.
 */
export const suttonLakeData: LakeTemplatePropsEnriched = {
  // Basic Info
  name: 'Sutton Lake',
  slug: 'sutton',
  image: '/images/sutton-lake-hero.jpg',
  imageAlt: 'Sutton Lake calm waters winding through the Elk River valley with forested hillsides',
  tagline: 'Central West Virginia\'s Hidden Gem',
  description: 'A laid-back 1,440-acre reservoir on the Elk River with excellent walleye and bass fishing, three USACE campgrounds, and 40 miles of peaceful shoreline. Less crowded than other WV lakes, Sutton offers a quiet escape for families, anglers, and outdoor enthusiasts. 45 minutes from WV Wild Outdoors.',

  // Lake Specifications
  lakeSpecs: {
    surfaceAcres: 1440,
    maxDepth: 125,
    shorelineMiles: 40,
    visibility: '8-15 feet',
    summerPoolElevation: 922,
    winterPoolElevation: 895,
    waterType: 'Mesotrophic - moderate nutrients, good fish habitat',
    nickname: 'Central West Virginia\'s Hidden Gem',
  },

  // Quick Stats (Hero Section)
  stats: [
    { value: '1,440', label: 'Lake Acres', icon: 'area' as const },
    { value: '125 ft', label: 'Max Depth', icon: 'elevation' as const },
    { value: '40 mi', label: 'Shoreline', icon: 'distance' as const },
    { value: '27 ft', label: 'Seasonal Drawdown', icon: 'none' as const },
  ],

  // Fishing Spots (Where to Fish Section)
  fishingSpots: [
    {
      name: 'Main Lake Basin',
      depth: '20-100 feet',
      structure: 'Deep channels, submerged points, rocky ledges near dam',
      species: ['Walleye', 'Smallmouth Bass', 'Largemouth Bass'],
      access: 'Boat required - launch from Bee Run, Bakers Run, or Gerald Freeman',
      tips: 'Walleye on jigs with live minnow trailers. Work the 40-60 foot depth during summer.',
    },
    {
      name: 'Upper Lake Coves',
      depth: '5-20 feet',
      structure: 'Laydowns, brush piles, submerged timber along 14-mile stretch',
      species: ['Largemouth Bass', 'Crappie', 'Bluegill'],
      access: 'Boat or kayak - numerous coves along Elk River arm',
      tips: 'Spring bass hit laydowns hard. Spinnerbaits and soft plastics around warming banks.',
    },
    {
      name: 'Dam Tailwaters (Elk River)',
      depth: '3-15 feet',
      structure: 'Current breaks, deep pools, rocky runs below 210-foot dam',
      species: ['Trout (Rainbow, Golden, Brook, Brown, Tiger)', 'Muskie', 'Walleye', 'Smallmouth Bass'],
      access: 'Shore fishing from South Abutment Day Use Area',
      tips: 'Trout stocked bi-weekly Feb-April. Muskie and walleye year-round. Heavy tackle for muskie.',
    },
    {
      name: 'Bakers Run Area',
      depth: '10-40 feet',
      structure: 'Extended no-wake zone, rocky points, gradual drop-offs',
      species: ['Crappie', 'Catfish', 'Bass'],
      access: 'Boat ramp at campground - no-wake zone ideal for kayak fishing',
      tips: 'Crappie suspend near brush piles in spring. Jigs and live minnows work best.',
    },
  ],

  // Fish Species with Regulations
  fishSpecies: [
    {
      name: 'Walleye',
      bestSeason: 'Fall and Winter',
      regulations: 'SLOT LIMIT: All walleye 20-30 inches must be released immediately. Daily limit 2, only walleye under 20" OR one over 30" may be kept.',
      tips: 'Deep jigging on points and ledges 40-60 feet. Blade baits in winter. Best fishing at dawn and dusk.',
    },
    {
      name: 'Smallmouth Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Daily limit 6 (combined with largemouth and spotted bass). No minimum size.',
      tips: 'Tube jigs on rocky structure. Finesse presentations in clear water conditions.',
    },
    {
      name: 'Largemouth Bass',
      bestSeason: 'Spring and Summer',
      regulations: 'Daily limit 6 (combined with smallmouth and spotted bass). No minimum size.',
      consumptionAdvisory: 'Limit to 1 meal per month for bass over 12 inches due to mercury content',
      tips: 'Target laydowns and brush piles in upper lake coves. Texas-rigged worms effective.',
    },
    {
      name: 'Spotted Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Daily limit 6 (combined with other bass species). No minimum size.',
    },
    {
      name: 'Muskie',
      bestSeason: 'Fall (September-November)',
      regulations: 'Minimum 30 inches. Daily limit 1.',
      tips: 'Tailwaters below dam. Large bucktails and jerkbaits. Heavy tackle required.',
    },
    {
      name: 'Channel Catfish',
      bestSeason: 'Summer',
      regulations: 'Daily limit 30 (USACE lakes). No minimum size.',
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
    },
    {
      name: 'Crappie',
      bestSeason: 'Spring',
      regulations: 'Daily limit 30 (combined black and white). No minimum size.',
      tips: 'Spawn in shallow coves around brush piles. Small jigs and live minnows.',
    },
    {
      name: 'Trout (Tailwaters)',
      bestSeason: 'Spring (stocked Feb-April) and Fall (October)',
      regulations: 'Daily limit 6 combined species. No minimum size.',
      notes: 'Rainbow, golden rainbow, brook, brown, and tiger trout stocked in Elk River tailwaters below dam',
    },
  ],

  // Marina & Boat Access
  marinas: [
    {
      name: 'Sutton Lake Marina',
      type: 'Full-service marina with rentals',
      address: '1734 Bee Run Road, Sutton, WV 26601',
      services: [
        '230 boat slips (100 with water and electric)',
        'Pontoon boat rentals (full/half day)',
        'Jet ski rentals (Yamaha VX Waverunner)',
        'Kayak and paddleboard rentals',
        'Houseboat rentals (3, 4, or 7 days)',
        'Pedal boats and Craig Cats',
        'Four grades of ethanol-free marine gas',
        'Pump-out station',
        'Ship\'s store (pizza, ice cream, bait, supplies)',
        'Marine mechanic and winterization services',
        'Winter and summer boat storage',
      ],
      contact: '(304) 765-2120',
      website: 'suttonlakemarina.com',
      hours: 'Mid-April to mid-October: 9:00 AM - 6:00 PM Mon-Sat, Closed Sunday',
      fees: 'Slip rentals: $25-$40 daily, $95-$150 weekly, $295-$490 monthly',
      rentalDetails: {
        deposit: '$300 refundable damage deposit for jet skis',
        checkIn: '9:00 AM',
        returnBy: '7:00 PM',
        operatorAge: 21,
        boaterSafetyCard: 'Required for operators born after Dec 31, 1986',
        restrictions: 'No towing tubes/skiers behind rentals',
      },
    },
    {
      name: 'Bee Run Day Use Area Boat Ramp',
      type: 'Public boat launch with beach',
      address: '1734 Bee Run Road, Sutton, WV 26601',
      services: [
        'Wide concrete boat ramp',
        'Large parking for trucks and trailers',
        'Adjacent to Sutton Lake Marina',
        'Swimming beach',
        'Restrooms and showers',
        'Picnic shelters',
      ],
      hours: 'Seasonal - closes when lake drops below 917 feet',
      fees: '$3.00 day use per vehicle ($40 annual pass)',
    },
    {
      name: 'South Abutment Boat Ramp',
      type: 'Public boat launch behind dam',
      services: [
        'Boat ramp access',
        'Swimming beach',
        'Picnic shelter',
        'Fishing pier',
        'Access to tailwater fishing',
      ],
      hours: 'Seasonal',
      fees: '$3.00 day use per vehicle',
    },
    {
      name: 'Bakers Run Campground Boat Ramp',
      type: 'Campground boat launch',
      address: '441 Bakers Run Road, Sutton, WV 26601',
      services: [
        'Boat ramp with small dock',
        'Parking for boat trailers',
        'Extended no-wake zone nearby',
      ],
      hours: 'May 1 - September 30 (ramp closes below 910 feet)',
      fees: '$3.00 day use or included with campground stay',
    },
    {
      name: 'Gerald R. Freeman Campground Boat Ramp',
      type: 'Campground boat launch with marina',
      services: [
        'Accessible boat ramps',
        'Small marina with snack bar',
        'Parking area',
      ],
      hours: 'April 18 - November 29 (ramp closes below 912 feet)',
      fees: '$3.00 day use or included with campground stay',
    },
  ],

  // Swimming Section
  swimming: {
    primaryBeach: {
      name: 'Bee Run Beach',
      length: 'Large beach area',
      season: 'Mid-April to mid-October',
      lifeguards: false,
      fees: '$3.00 day use per vehicle ($40 annual pass)',
      amenities: [
        'Large sandy beach',
        'Flush toilet restrooms',
        'Shower facilities',
        'Picnic shelters nearby',
        'Playground',
        'Adjacent to marina for rentals',
      ],
      rules: [
        'NO LIFEGUARDS - swim at your own risk',
        'Life jackets recommended',
        'Always swim with a buddy',
      ],
      waterTemperature: '68-78°F in summer',
    },
    passInfo: 'America the Beautiful Pass, Golden Age and Golden Access Passports provide 50% discount on day use fees',
  },

  // Activities (Beyond Fishing)
  activities: [
    {
      name: 'Swimming',
      description: 'Two designated beaches at Bee Run and South Abutment day use areas. No lifeguards - swim at your own risk.',
      season: 'Mid-April to mid-October',
      difficulty: 'Beginner-friendly',
      fees: '$3.00 day use per vehicle',
    },
    {
      name: 'Kayaking & Paddleboarding',
      description: 'Explore 40 miles of shoreline and 14 miles of Elk River arm. Calmer water than many WV lakes. Rentals available at Sutton Lake Marina.',
      season: 'Mid-April to mid-October',
      difficulty: 'Beginner to Intermediate',
      rentalRates: 'Kayaks and SUPs: 2, 4, or 8-hour rentals available',
      provider: 'Sutton Lake Marina',
    },
    {
      name: 'Boating',
      description: 'Four public boat ramps with $3 launch fee. Marina offers 230 slips and pontoon/jet ski rentals. Less boat traffic than busier WV lakes.',
      season: 'Mid-April to mid-October (varies by water level)',
      difficulty: 'All levels',
      fees: 'Launch $3/day, Slip rentals $25-$40/day',
    },
    {
      name: 'Hiking',
      description: '31 trail systems with over 30 miles of trails. Jeremiah Carpenter Trail (4.5 mi), Happy Camper\'s Trail (1.4 mi), South Abutment Trail (0.24 mi). Native pollinator garden near dam.',
      season: 'Year-round',
      difficulty: 'Easy to Moderate',
    },
    {
      name: 'Wildlife Viewing',
      description: 'Adjacent to 18,225-acre Elk River WMA. White-tailed deer, wild turkey, waterfowl, and furbearers. Elk River has highest species diversity of any river in West Virginia.',
      season: 'Year-round (best spring and fall)',
      difficulty: 'Easy',
    },
    {
      name: 'Camping',
      description: 'Three USACE campgrounds: Gerald R. Freeman (156 sites), Bakers Run (77 sites), and Bee Run (12 primitive sites). Electric, full hookup, and tent sites available.',
      season: 'April through November (varies by campground)',
      difficulty: 'Beginner-friendly',
      fees: '$16-$46/night depending on site type',
    },
  ],

  // Seasonal Fishing Guide
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Bass', 'Crappie', 'Trout (tailwaters)'],
      techniques: 'Bass hit laydowns and structure hard as water warms. Crappie spawn in shallow coves - small jigs and live minnows around brush piles. Tailwater trout stocked bi-weekly Feb-April.',
      conditions: 'Water temps rising from 50°F to 65°F. Lake fills to summer pool (922 ft) by mid-April. Campgrounds opening mid-April to early May.',
      kimNote: 'Stop by for crappie jigs and bass tackle. Water\'s still cold early on - bring layers and expect muddy conditions after spring rains.',
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Walleye', 'Bass', 'Catfish', 'Crappie'],
      techniques: 'Walleye on deep structure 40-60 feet - jigs with live bait at dawn and dusk. Bass go deep midday - work shaded cover early and late. Night fishing excellent for catfish.',
      conditions: 'Water temps 68-78°F. Lake at summer pool (922 ft). Peak recreation season but less crowded than Summersville.',
      kimNote: 'Sutton stays quieter than the big lakes - great for families wanting peace and quiet. Get out early before the afternoon heat.',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Walleye', 'Bass', 'Muskie (tailwaters)', 'Trout (tailwaters)'],
      techniques: 'Bass and walleye feed heavily pre-winter. Work rocky points and drop-offs. Muskie active in tailwaters - large bucktails and jerkbaits. Trout stocked in October.',
      conditions: 'Water cooling 65°F to 50°F. Peak fall foliage early to mid-October. Lake remains at summer pool through November 30.',
      kimNote: 'Best fishing of the year. Fall colors along the shoreline are beautiful. Gerald Freeman Campground stays open until November 29.',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Trout (tailwaters)', 'Muskie (tailwaters)'],
      techniques: 'Slow vertical jigging for walleye in deep water. Blade baits and finesse presentations. Tailwater fishing for trout and muskie can be excellent.',
      conditions: 'Water temps 38-50°F. Lake drawn down to 895 ft winter pool (27 ft lower). Most facilities closed. Boat ramps inaccessible at winter pool.',
      kimNote: 'Bundle up for tailwater fishing - that\'s where the action is in winter. Fewer anglers but fish still bite.',
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
      details: 'All walleye from 20 to 30 inches long MUST be returned immediately to the water. Daily creel limit: 2 walleye. Only walleye under 20 inches OR one over 30 inches may be kept.',
      link: 'https://www.wvdnr.gov/fishing/fishing-regulations/',
      important: true,
    },
    {
      category: 'Muskie Regulations',
      details: 'Minimum size limit 30 inches. Daily limit 1 fish. Use heavy tackle for these fish.',
      important: true,
    },
    {
      category: 'Bass Regulations',
      details: 'Daily limit 6 in any combination (smallmouth, largemouth, spotted bass). No minimum size. Possession limit 12.',
      important: false,
    },
    {
      category: 'Bass Consumption Advisory',
      details: 'Black bass over 12 inches: Limit to 1 meal per month due to mercury content. Check current WVDNR mercury advisory charts.',
      important: true,
    },
    {
      category: 'Boating Safety',
      details: 'Life jackets required for all persons on vessels. Children 12 and under must wear PFD at all times while underway. Boater safety card required for operators born after Dec 31, 1986.',
      important: true,
    },
    {
      category: 'Day Use Fees',
      details: 'USACE charges $3.00 per vehicle for boat launching or beach access. Annual pass $40. America the Beautiful, Golden Age, and Golden Access passes receive 50% discount.',
      important: false,
    },
    {
      category: 'Camping Regulations',
      details: '14-day limit per 30-day period at all USACE campgrounds. Quiet hours 10 PM - 6 AM. Pets allowed on leash. Don\'t Move Firewood policy in effect.',
      important: false,
    },
    {
      category: 'Tailwater Restrictions',
      details: 'Spearfishing prohibited on Elk River from Sutton Dam downstream to US Route 19 bridge. Droplines prohibited on Elk River.',
      important: false,
    },
  ],

  // Campgrounds (Cross-linked)
  // NOTE: Site counts match authoritative standalone campground data files
  // See: src/data/campgrounds/gerald-r-freeman.ts, bakers-run.ts, bee-run.ts
  campgrounds: [
    {
      name: 'Gerald R. Freeman Campground',
      slug: 'gerald-r-freeman',
      operator: 'U.S. Army Corps of Engineers',
      sites: 156,
      siteTypes: [
        '40 full hookup (50 amp)',
        '30 full hookup (30 amp)',
        '46 electric only (50 amp)',
        '40 electric only (30 amp)',
      ],
      amenities: [
        'Bathhouses with hot showers',
        'Flush toilets',
        'Dump stations',
        'Playgrounds',
        'Basketball courts',
        'Boat ramp',
        'Accessible facilities',
      ],
      fees: '$28-$46/night depending on site type',
      season: 'April - November (varies by year)',
      reservations: 'Recreation.gov or 1-877-444-6777',
      policies: ['14-day limit per 30-day period', 'Quiet hours 10 PM - 6 AM', 'Limited cell service', 'Pets on leash'],
      contact: '(304) 765-2816',
    },
    {
      name: 'Bakers Run Campground',
      slug: 'bakers-run',
      operator: 'U.S. Army Corps of Engineers',
      sites: 77,
      siteTypes: [
        '30 electric waterfront (30/50 amp)',
        '35 electric standard (30/50 amp)',
        '12 non-electric',
      ],
      amenities: [
        'Bathhouses with hot showers',
        'Flush toilets',
        'Dump station',
        'Playground',
        'Boat ramp',
        'Basketball and volleyball courts',
        'Fire rings and picnic tables',
      ],
      fees: '$18-$34/night depending on site type',
      season: 'May - September (varies by year)',
      reservations: 'Recreation.gov',
      policies: ['14-day limit per 30-day period', 'Pets on leash'],
      contact: '(304) 765-2816',
    },
    {
      name: 'Bee Run Campground',
      slug: 'bee-run',
      operator: 'U.S. Army Corps of Engineers',
      sites: 12,
      siteTypes: ['12 primitive sites (no hookups)'],
      amenities: [
        'Vault toilets',
        'Fire rings',
        'Picnic tables',
        'NO electric hookups',
        'NO potable water',
        'NO showers',
      ],
      fees: '$10-$14/night',
      season: 'Late May - Early December',
      reservations: 'First-come, first-served (no reservations)',
      policies: ['14-day limit per 30-day period', 'Bring your own drinking water'],
      contact: '(304) 765-2816',
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Jigs with live minnow trailers (walleye)', optional: false },
    { name: 'Tube jigs and soft plastics (bass)', optional: false },
    { name: 'Spinnerbaits for laydowns', optional: false },
    { name: 'Small jigs (crappie)', optional: false },
    { name: 'Blade baits (winter walleye)', optional: true },
    { name: 'Heavy muskie tackle for tailwaters', optional: true },
    { name: 'Life jackets (required for all ages)', optional: false },
    { name: 'Sunscreen and polarized sunglasses', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Navigation lights (if boating after dark)', optional: true },
    { name: 'Layers (cool mornings even in summer)', optional: false },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, line, and tackle for walleye, bass, and crappie',
      href: '/shop/fishing',
    },
    {
      name: 'Kayaks & Paddleboards',
      description: 'Explore 40 miles of peaceful shoreline and coves',
      href: '/shop/kayaks',
    },
    {
      name: 'Camping Gear',
      description: 'Tents, coolers, and camp supplies for USACE campgrounds',
      href: '/shop/camping',
    },
    {
      name: 'Safety Equipment',
      description: 'Life jackets, first aid kits, and boating safety gear',
      href: '/shop/safety',
    },
  ],

  // Cross-Links to Related Destinations
  nearbyWMA: 'elk-river',
  nearbyCampgrounds: ['gerald-r-freeman', 'bakers-run', 'bee-run'],
  nearbyStateParks: ['holly-river'],
  nearbyRivers: ['elk'],

  // Meta Information
  difficulty: 'moderate',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.66099900000000,
    lng: -80.69534700000000,
  },

  // Contact Information
  contact: {
    usaceOffice: {
      name: 'USACE Sutton Lake Project Office',
      address: 'PO Box 426, Sutton, WV 26601',
      phone: '(304) 765-2267',
      email: 'suttonlake@usace.army.mil',
      hours: '24-hour recording for lake and stream info: (304) 765-2705',
    },
    marina: {
      name: 'Sutton Lake Marina',
      phone: '(304) 765-2120',
      website: 'suttonlakemarina.com',
    },
    campground: {
      name: 'Gerald R. Freeman Campground',
      phone: '(304) 765-7756',
      reservations: '1-877-444-6777 or Recreation.gov',
    },
  },

  // Official Links
  officialLinks: [
    {
      name: 'USACE Recreation Page',
      url: 'https://www.lrd.usace.army.mil/Missions/Recreation/Display/Article/3632925/sutton-lake/',
    },
    {
      name: 'Real-Time Lake Levels',
      url: 'https://www.lrh-wc.usace.army.mil/wm/?basin/kan/sue',
    },
    {
      name: 'Gerald R. Freeman Campground Reservations',
      url: 'https://www.recreation.gov/camping/campgrounds/233678',
    },
    {
      name: 'Bakers Run Campground Reservations',
      url: 'https://www.recreation.gov/camping/campgrounds/10122583',
    },
    {
      name: 'WVDNR Fishing Regulations',
      url: 'https://wvdnr.gov/fishing/fishing-regulations/',
    },
    {
      name: 'Elk River Wildlife Management Area',
      url: 'https://wvdnr.gov/lands-waters/wildlife-management-areas/district-3-wildlife-management-areas/',
    },
  ],
};
