/**
 * SPEC-13: Example Lake Data File
 * Complete reference implementation showing all available fields
 *
 * USE THIS AS A TEMPLATE for creating new lake pages.
 * Copy this file, rename it, and fill in your lake's data.
 *
 * @example
 * ```bash
 * cp _example.ts summersville-lake.ts
 * # Edit summersville-lake.ts with actual data
 * ```
 */

import type { LakeTemplateProps } from '../../types/adventure';

/**
 * Complete lake data example demonstrating all available fields.
 * Fields marked "REQUIRED" must be provided for every lake.
 * Fields marked "OPTIONAL" can be omitted if data is unavailable.
 */
export const exampleLakeData: LakeTemplateProps = {
  // ============================================================================
  // HERO SECTION DATA (US3)
  // ============================================================================

  /** Lake name (REQUIRED) */
  name: 'Summersville Lake',

  /** Hero image path (REQUIRED) */
  image: '/images/lakes/summersville-hero.jpg',

  /** Hero image alt text for accessibility (REQUIRED) */
  imageAlt: 'Aerial view of Summersville Lake with crystal clear emerald waters and forested shoreline',

  /** Brief tagline or subtitle (REQUIRED) */
  tagline: "West Virginia's Premier Bass Fishing Destination",

  /** Full lake description - renders as prose (REQUIRED) */
  description:
    'Summersville Lake is known for its crystal-clear emerald waters and world-class smallmouth bass fishing. ' +
    'With 2,790 surface acres and a maximum depth of 327 feet, this lake offers exceptional fishing, scuba diving, ' +
    'and water recreation just 30 minutes from our shop.',

  /** Quick stats for hero overlay (REQUIRED - min 3-4 stats) */
  stats: [
    {
      value: '2,790',
      label: 'Acres',
      icon: 'area', // Optional: from STAT_ICON_PATHS
    },
    {
      value: '327 ft',
      label: 'Max Depth',
      icon: 'elevation',
    },
    {
      value: '30 min',
      label: 'From Shop',
      icon: 'time',
    },
    {
      value: 'Nicholas',
      label: 'County',
      icon: 'location',
    },
  ],

  // ============================================================================
  // FISHING INFORMATION (US1)
  // ============================================================================

  /** Prime fishing locations with depth, structure, and target species (REQUIRED for fishing lakes) */
  fishingSpots: [
    {
      name: 'Long Point Cliff',
      depth: '40-80 feet',
      structure: 'Vertical rock walls with submerged ledges and deep water access',
      species: ['Smallmouth Bass', 'Walleye', 'Rock Bass'],
      access: 'Boat only - no shore access',
    },
    {
      name: 'Dam End',
      depth: '100-327 feet',
      structure: 'Deep water basin with scattered boulders and drop-offs',
      species: ['Walleye', 'Muskie', 'Crappie'],
      access: 'Boat only - deepest area of lake',
    },
    {
      name: 'Battle Run Cove',
      depth: '15-40 feet',
      structure: 'Rocky points with timber and weed beds in cove',
      species: ['Largemouth Bass', 'Smallmouth Bass', 'Bluegill'],
      access: 'Boat or kayak - protected from wind',
    },
  ],

  // ============================================================================
  // MARINA & BOAT ACCESS (US2)
  // ============================================================================

  /** Marina and boat launch facilities (REQUIRED if lake has boat access) */
  marinas: [
    {
      name: 'Summersville Lake Marina',
      type: 'Full-service marina',
      services: [
        'Boat rentals (pontoons, fishing boats, kayaks)',
        'Bait and tackle shop',
        'Fuel dock',
        'Ice and drinks',
        'Restrooms and showers',
        'Boat slip rentals',
      ],
      contact: '(304) 872-5809',
      hours: 'Daily 6am-8pm (May-October), Weekend only (Nov-Apr)',
      fees: '$15 launch fee, $10 parking, $5 kayak launch',
    },
    {
      name: 'Battle Run Public Ramp',
      type: 'Public boat ramp',
      services: ['Free concrete ramp', 'Parking for 30 trailers', 'Portable restrooms'],
      hours: 'Dawn to dusk, year-round',
      fees: 'Free',
    },
  ],

  // ============================================================================
  // ACTIVITIES BEYOND FISHING (US4)
  // ============================================================================

  /** Recreation activities available at the lake (OPTIONAL) */
  activities: [
    {
      name: 'Scuba Diving',
      description:
        'Crystal-clear waters with 50+ foot visibility. Explore submerged cliffs, timber, and underwater rock formations.',
      season: 'Best May-October when water is warmest',
      difficulty: 'Intermediate to Advanced',
      icon: 'distance',
    },
    {
      name: 'Swimming',
      description: 'Designated swimming areas near campgrounds with sandy beaches and shallow entry.',
      season: 'June-September',
      difficulty: 'Beginner-friendly',
      icon: 'area',
    },
    {
      name: 'Cliff Jumping',
      description: 'Popular cliff jumping spots at Long Point (15-40 foot jumps). Jump at your own risk.',
      season: 'Summer months (high water levels)',
      difficulty: 'Advanced - experienced swimmers only',
    },
  ],

  // ============================================================================
  // SEASONAL FISHING GUIDE (US4)
  // ============================================================================

  /** Month-by-month or seasonal fishing breakdown (OPTIONAL but highly recommended) */
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Smallmouth Bass', 'Largemouth Bass', 'Crappie'],
      techniques:
        'Shallow water crankbaits, spinnerbaits, and jigs near spawning areas. Focus on rocky points and coves.',
      conditions: 'Water temps 50-65°F. Fish moving shallow for spawn.',
      kimNote:
        "Spring bass are hungry after winter - don't overthink it, just get your bait near cover!",
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Rock Bass'],
      techniques:
        'Deep diving crankbaits, drop shot rigs on ledges and cliffs. Fish early morning and evening for bass.',
      conditions: 'Water temps 70-80°F. Fish deep during day, shallow at dawn/dusk.',
      kimNote: 'Summer smallmouth love those deep cliff faces - 40-60 feet is the sweet spot!',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      techniques:
        'Jerkbaits, swimbaits, and topwater near rocky points. Walleye bite picks up as water cools.',
      conditions: 'Water temps 55-70°F. Fish feeding heavily before winter.',
      kimNote: 'Fall fishing is PRIME time here - fish are aggressive and the scenery is stunning!',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Crappie'],
      techniques: 'Slow jigging deep water with minnows or blade baits. Target 80-150 foot depths for walleye.',
      conditions: 'Water temps 35-45°F. Fish very deep and slow.',
    },
  ],

  // ============================================================================
  // SAFETY & REGULATIONS (US5)
  // ============================================================================

  /** Lake-specific regulations and safety rules (REQUIRED) */
  regulations: [
    {
      category: 'Walleye & Muskie Regulations',
      details: 'Walleye: Daily limit 5, minimum 18". Muskie: Catch and release ONLY, no harvest permitted.',
      link: 'https://wvdnr.gov/fishing/fishing-regulations/',
      important: true,
    },
    {
      category: 'Boating Safety',
      details:
        'No-wake zones within 100 feet of shore, swimmers, and docks. Life jackets required for all passengers under 13.',
      important: true,
    },
    {
      category: 'Scuba Diving',
      details:
        'Divers must display dive flag when underwater. Boats must stay 100 feet from dive flags.',
      link: 'https://www.summersville-lake.com/diving-rules',
      important: false,
    },
    {
      category: 'Fishing License',
      details: 'Valid West Virginia fishing license required for all anglers 15+. Available at our shop!',
      link: 'https://wvdnr.gov/hunting-trapping-fishing/fishing/buy-a-fishing-license/',
      important: true,
    },
  ],

  // ============================================================================
  // GEAR RECOMMENDATIONS (Integration - T095)
  // ============================================================================

  /** Recommended gear checklist for visitors (OPTIONAL) */
  gearList: [
    { name: 'Fishing Rod & Reel', optional: false },
    { name: 'Deep Diving Crankbaits', optional: false },
    { name: 'Drop Shot Rigs', optional: false },
    { name: 'Life Jackets', optional: false },
    { name: 'Fish Finder / Depth Finder', optional: true },
    { name: 'Scuba Gear (if diving)', optional: true },
    { name: 'Polarized Sunglasses', optional: false },
    { name: 'Sunscreen & Hat', optional: false },
  ],

  // ============================================================================
  // SHOP INTEGRATION (T097)
  // ============================================================================

  /** Related shop categories to promote (OPTIONAL) */
  relatedShop: [
    {
      name: 'Fishing Gear',
      href: '/shop/fishing',
      description: 'Rods, reels, and tackle for lake fishing',
    },
    {
      name: 'Camping Equipment',
      href: '/shop/camping',
      description: 'Tents, sleeping bags, and camp essentials',
    },
    {
      name: 'Boating Accessories',
      href: '/shop/boating',
      description: 'Life jackets, anchors, and safety gear',
    },
  ],

  // ============================================================================
  // OPTIONAL METADATA
  // ============================================================================

  /** Difficulty rating for accessing the lake (OPTIONAL) */
  difficulty: 'easy', // 'easy' | 'moderate' | 'challenging' | 'rugged'

  /** Best season to visit overall (OPTIONAL) */
  bestSeason: 'spring', // 'spring' | 'summer' | 'fall' | 'winter'

  /** Geographic coordinates for mapping (OPTIONAL) */
  coordinates: {
    lat: 38.2345,
    lng: -80.8567,
  },
};

/**
 * MINIMAL EXAMPLE - Absolute minimum data needed for a lake page.
 * Use this if you have limited information and want to start simple.
 */
export const minimalLakeData: LakeTemplateProps = {
  name: 'Simple Lake',
  image: '/images/lakes/simple-lake.jpg',
  imageAlt: 'View of Simple Lake',
  tagline: 'Great fishing close to home',
  description: 'A peaceful lake with good bass fishing, located just 15 minutes from our shop.',

  stats: [
    { value: '100', label: 'Acres' },
    { value: '15 min', label: 'From Shop' },
  ],

  // Empty arrays for sections with no data yet
  fishingSpots: [],
  marinas: [],
  activities: [],
  seasonalGuide: [],
  regulations: [
    {
      category: 'Fishing License',
      details: 'Valid WV fishing license required',
      important: false,
    },
  ],

  gearList: [],
  relatedShop: [],
};
