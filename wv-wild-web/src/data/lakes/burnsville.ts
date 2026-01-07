/**
 * Burnsville Lake Data
 * SPEC-21: Lake fishing data for LakeTemplate migration
 *
 * Extracted from research: ~1,760 lines of Perplexity Pro deep research
 * Key highlights:
 * - STATE RECORD MUSKIE: 51 lbs, 55.06" (Lucas King, March 2022)
 * - 15-inch walleye minimum (Burnsville-specific regulation)
 * - Excellent crappie (40-60 fish evenings)
 * - 3 boat ramps, marina with pontoon rentals
 * - 200+ campsites between Bulltown and Riffle Run
 */

import type { LakeTemplateProps } from '../../types/adventure';

/**
 * Complete lake data for Burnsville Lake
 * Ready to spread into LakeTemplate component
 */
export const burnsvilleLakeData: LakeTemplateProps = {
  // Basic Info
  name: 'Burnsville Lake',
  image: '/images/lakes/burnsville-lake-hero.webp',
  imageAlt: 'Burnsville Lake with forested shoreline in Braxton County, WV',
  tagline: 'State record muskie waters. 15-inch walleye minimum. Crappie that stack up.',
  description: "Burnsville Lake is where West Virginia's state-record muskie came from. 51 pounds, 55.06 inches. Lucas King pulled it from the tailwater in March 2022 on a 6-inch glide bait cast from shore. But Burnsville was producing long before that record. Crappie anglers have been filling coolers here for decades - 40 to 60 fish evenings around the brush piles.",

  // Quick Stats (Hero Section)
  stats: [
    { value: '968', label: 'Surface Acres', icon: 'area' as const },
    { value: '25 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: '3 Ramps', label: 'Boat Access', icon: 'calendar' as const },
  ],

  // Fishing Spots (Where to Fish Section)
  fishingSpots: [
    {
      name: 'Riffle Run / Dam Area (State Record Location)',
      depth: '15-30+ feet',
      structure: 'Deep water near dam, tailwater current breaks, rocky shoreline',
      species: ['Muskellunge', 'Walleye', 'Trout (tailwater only)', 'Channel Catfish'],
      access: 'Exit 79, I-79 to Old Route 5 East. 3 miles. Concrete boat ramp, ADA fishing pier.',
    },
    {
      name: 'Bulltown Area (Upper Lake)',
      depth: '6-20 feet',
      structure: 'Standing timber, brush piles, creek channels, old farm ponds',
      species: ['Largemouth Bass', 'Crappie', 'Bluegill', 'Channel Catfish'],
      access: 'Exit 67, I-79 to Route 19 North. 13 miles. Boat ramp at campground and day-use.',
    },
    {
      name: 'Mid-Lake Points and Channel',
      depth: '10-25 feet',
      structure: 'Rocky points, channel edges, submerged brush piles',
      species: ['Walleye', 'Largemouth Bass', 'Spotted Bass', 'Crappie'],
      access: 'Boat access from either ramp. Work channel edges and points.',
    },
  ],

  // Marina & Boat Access
  marinas: [
    {
      name: 'Burnsville Docks (Bulltown Marina)',
      type: 'Marina with pontoon rentals',
      services: [
        'Pontoon rentals ($350/day, $200/half-day + fuel)',
        '10% multi-day discount',
        'Seasonal slip rentals (April 15 - October 1)',
        'Boat storage',
        'Limited tackle and fuel',
      ],
      contact: 'burnsvilledock.com',
      hours: 'Seasonal - April through October',
      fees: '$25 pet cleaning fee',
    },
    {
      name: 'Riffle Run Day Use Area',
      type: 'Public boat launch with ADA access',
      services: [
        'Concrete ramp (dredged March 2023)',
        'ADA-accessible fishing pier',
        'Parking for trucks and trailers',
        'Restrooms',
        'Near dam and tailwater access',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
    {
      name: 'Bulltown Campground Ramp',
      type: 'Public boat launch',
      services: [
        'Concrete ramp',
        'Full campground amenities nearby',
        'Near marina',
        'Swimming beach nearby',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
    {
      name: 'Bulltown Day Use Area',
      type: 'Public boat launch',
      services: [
        'Concrete ramp',
        'Parking',
        'Picnic area',
        'Swimming beach',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
  ],

  // Activities (Beyond Fishing)
  activities: [
    {
      name: 'Muskie Fishing',
      description: 'State record fishery - 51 lbs, 55.06" caught March 2022 from tailwater. WV DNR actively stocks muskellunge. Target deep points, channel edges, and tailwater current breaks.',
      season: 'Year-round (Fall prime - September-November)',
      difficulty: 'Advanced - heavy tackle required',
    },
    {
      name: 'Crappie Fishing',
      description: '40-60 fish evenings around brush piles. Use side-imaging sonar to mark structure in 8-20 feet. Vertical jig with 1/16 to 1/8 oz jigs tipped with minnows.',
      season: 'Year-round (Spring/Fall peak)',
      difficulty: 'Beginner-friendly',
    },
    {
      name: 'Walleye Fishing',
      description: '15-inch minimum specific to Burnsville Lake. Night trolling shallow cranks over 8-12 ft flats. Daytime trolling deep-diving crankbaits along channel edges.',
      season: 'Year-round (Night fishing best)',
      difficulty: 'Moderate',
    },
    {
      name: 'Tailwater Trout',
      description: 'Rainbow and brown trout stocked twice monthly February-April in tailwater below dam ONLY. Not in lake proper. Spinners, small crankbaits, PowerBait.',
      season: 'February through May (tailwater only)',
      difficulty: 'Beginner-friendly',
    },
    {
      name: 'Catfishing',
      description: 'Channel cats consistent on cut bait. Flatheads offer trophy potential - 58-lb documented. Night fishing in deep channel bends with large live baits.',
      season: 'Year-round (Summer nights best)',
      difficulty: 'Beginner to Moderate',
    },
    {
      name: 'Camping',
      description: 'Bulltown Campground: 200+ sites (134 full hookup, 70 electric). Riffle Run: 60 sites, first-come first-served. Swimming beach at Bulltown.',
      season: 'Mid-April through November',
      difficulty: 'Easy - family friendly',
    },
  ],

  // Seasonal Fishing Guide
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Crappie', 'Bass (spawn)', 'Trout (tailwater)'],
      techniques: 'Crappie move shallow (4-8 ft) around brush as water hits 58-65°F. Bass spawn late April-May in protected coves. Trout stocking peaks Feb-April in tailwater.',
      conditions: 'Water temperatures 45-70°F. Crappie concentrate. Bass aggressive pre-spawn.',
      kimNote: 'Prime time for crappie. Jigs with minnows around brush piles. Stop by for jig colors that are working.',
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Bass (early/late)', 'Catfish (night)', 'Walleye (night)'],
      techniques: 'Thermocline forms 15-25 ft. Fish early morning topwater, evening, or night. Catfish feeding peaks after dark. Night trolling shallow cranks for walleye.',
      conditions: 'Water temps 70-85°F. Fish go deep midday. Night bite is best.',
      kimNote: 'Night fishing with cut bait is hard to beat for channel cats. Walleye hit topwater after dark.',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Muskellunge', 'Walleye', 'Bass'],
      techniques: 'Turnover mid-Sept to Oct. Muskie feed heavily on larger baits - 8-12 inch swimbaits and glide baits. Walleye follow baitfish to shoreline points.',
      conditions: 'Water temps 70-45°F (declining). Muskie prime time. Bass aggressive on shad.',
      kimNote: 'Best muskie fishing of the year. The state record came on a 6-inch glide bait. Bring heavy tackle.',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Tailwater Trout'],
      techniques: 'Lake drawn down to winter pool (776 ft). Fish concentrate in main channel and deep holes. Trout stocking resumes February. Slow vertical jigging for walleye.',
      conditions: 'Water temps 35-45°F. Fish metabolisms slow. Work baits slowly.',
      kimNote: 'Bundle up - it\'s cold but walleye concentrate in predictable spots. Tailwater trout stocking starts February.',
    },
  ],

  // Regulations & Safety
  regulations: [
    {
      category: 'Fishing License',
      details: 'West Virginia fishing license required for all anglers 15 and older. Trout stamp required for tailwater fishing. Available at WV Wild Outdoors.',
      important: true,
    },
    {
      category: 'Walleye Special Regulations',
      details: '15-INCH MINIMUM SIZE LIMIT specific to Burnsville Lake. This is stricter than statewide regulations. Daily limit 8 walleye/saugeye.',
      link: 'https://wvdnr.gov/wp-content/uploads/2025/12/Pub_Regs_Fishing_2026_DNR_WILD_pp.pdf',
      important: true,
    },
    {
      category: 'Muskellunge Regulations',
      details: '30-inch minimum size limit. Daily limit 1 fish. Catch-and-release strongly encouraged - these fish take years to reach trophy size. State record fishery.',
      important: true,
    },
    {
      category: 'Tailwater Trout',
      details: 'Trout stocking occurs ONLY in tailwater (Little Kanawha River below dam). Lake proper is NOT stocked with trout. Trout stamp required. Daily limit 6.',
      link: 'https://wvdnr.gov/fishing/fish-stocking/',
      important: true,
    },
    {
      category: 'Hand-Fishing (Noodling)',
      details: 'Allowed June 15 - August 31 for catfish. Sunrise to sunset only. Limit 4 total catfish.',
      important: false,
    },
    {
      category: 'Boating Safety',
      details: 'No horsepower restrictions. No-wake zones near ramps and swimming areas. Life jackets required. Night fishing permitted.',
      important: false,
    },
    {
      category: 'Camping Reservations',
      details: 'Bulltown Campground reservations at Recreation.gov or 1-877-444-6777. Riffle Run is first-come, first-served only - no reservations. Call (304) 853-2583.',
      important: false,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Trout stamp (for tailwater)', optional: true },
    { name: 'Light tackle for crappie (6-8 lb test)', optional: false },
    { name: 'Heavy muskie gear (80-100 lb braid, steel leader)', optional: true },
    { name: 'Electronics with GPS', optional: false },
    { name: 'Landing net (36+ inch for muskie)', optional: true },
    { name: 'Life jackets (required)', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'Sunscreen', optional: false },
    { name: 'Offline maps (limited cell coverage)', optional: false },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Crappie jigs, muskie tackle, walleye rigs',
      href: '/shop/fishing',
    },
    {
      name: 'Live Bait',
      description: 'Minnows, nightcrawlers, cut bait',
      href: '/shop/fishing',
    },
    {
      name: 'Camping Gear',
      description: 'For Bulltown and Riffle Run campgrounds',
      href: '/shop/camping',
    },
  ],

  // Optional Fields
  difficulty: 'easy',
  bestSeason: 'fall',
  coordinates: {
    lat: 38.845430,
    lng: -80.617343,
  },
};
