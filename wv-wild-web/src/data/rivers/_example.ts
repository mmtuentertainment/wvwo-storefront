/**
 * SPEC-14: Example River Data File
 * Complete reference implementation showing all available fields
 *
 * USE THIS AS A TEMPLATE for creating new river pages.
 * Copy this file, rename it, and fill in your river's data.
 *
 * @example
 * ```bash
 * cp _example.ts gauley-river.ts
 * # Edit gauley-river.ts with actual data
 * ```
 */

import type { RiverTemplateProps } from '../../types/adventure';

/**
 * Complete river data example demonstrating all available fields.
 * Fields marked "REQUIRED" must be provided for every river.
 * Fields marked "OPTIONAL" can be omitted if data is unavailable.
 */
export const exampleRiverData: RiverTemplateProps = {
  // ============================================================================
  // HERO SECTION DATA
  // ============================================================================

  /** River name (REQUIRED) */
  name: 'Gauley River',

  /** Hero image path (REQUIRED) */
  image: '/images/rivers/gauley-hero.jpg',

  /** Hero image alt text for accessibility (REQUIRED) */
  imageAlt: 'Whitewater kayaker navigating Class V rapids on the Gauley River in fall colors',

  /** Brief tagline or subtitle (REQUIRED) */
  tagline: 'World-Class Whitewater in the Heart of West Virginia',

  /** Full river description - renders as prose (REQUIRED) */
  description:
    'The Gauley River delivers 25 miles of continuous Class III-V whitewater through a remote canyon ' +
    'in southern West Virginia. With over 100 named rapids and legendary fall release flows, the Gauley ' +
    'is considered one of the best whitewater rivers in the world. Expert kayakers and commercial rafting ' +
    'trips tackle this wilderness gem from September through October during dam releases.',

  /** Quick stats for hero overlay (REQUIRED - min 3-4 stats) */
  stats: [
    {
      value: '25',
      label: 'Miles',
      icon: 'distance',
    },
    {
      value: 'Class III-V',
      label: 'Difficulty',
      icon: 'info',
    },
    {
      value: '45 min',
      label: 'From Shop',
      icon: 'time',
    },
    {
      value: 'Sep-Oct',
      label: 'Season',
      icon: 'calendar',
    },
  ],

  // ============================================================================
  // RIVER METADATA
  // ============================================================================

  /** River length in miles (REQUIRED) */
  length: 25,

  /** Primary county (REQUIRED) */
  county: 'Fayette & Nicholas Counties',

  /** Difficulty range (REQUIRED) */
  difficultyRange: 'Class III-V',

  /** Quick highlights for tag display (REQUIRED - 3-6 items) */
  quickHighlights: [
    '100+ Rapids',
    'Dam-Release Flows',
    'Expert Guides Available',
    'Trophy Smallmouth Bass',
  ],

  // ============================================================================
  // RAPIDS SECTION
  // ============================================================================

  /** Named rapids with difficulty ratings (OPTIONAL - 3-5 showcase examples) */
  rapids: [
    {
      name: 'Pillow Rock',
      class: { base: 'V', modifier: '+' },
      displayName: 'Class V+',
      description:
        'The Gauley\'s most notorious rapid. A 14-foot drop over a massive undercut boulder creates ' +
        'a powerful keeper hole. Expert kayakers thread the needle on river right or portage.',
      runnable: 'Expert kayakers only at high water (2000+ CFS). Commercial rafts portage.',
      kimNote: 'I watched my brother flip here in \'98 - that rock earned its name! Respect this one.',
    },
    {
      name: 'Lost Paddle',
      class: { base: 'V' },
      displayName: 'Class V',
      description:
        'Long, complex boulder garden with multiple lines and consequences. Named for the paddles ' +
        'left behind by swimmers. Requires precise boat control through 200 yards of technical moves.',
      runnable: 'Experienced Class IV+ kayakers. Commercial rafts run center-right line.',
      kimNote: 'Scout from the left. The river does NOT give back your gear here - strap it down tight!',
    },
    {
      name: 'Sweet\'s Falls',
      class: { base: 'III', modifier: '+', highWater: 'V-' },
      displayName: 'Class III+ (V- at high water)',
      description:
        'A beautiful 12-foot vertical drop with a clean entry and massive hole at bottom. At high water ' +
        '(3000+ CFS), the hole becomes a legendary keeper that has humbled world champions.',
      runnable: 'All levels at moderate flows. Expert only above 2500 CFS.',
      kimNote: 'Gorgeous spot - take the picture BEFORE you drop in. The hole gets hungry when the water rises!',
    },
  ],

  // ============================================================================
  // FISHING INFORMATION
  // ============================================================================

  /** Fishing details for river (REQUIRED if river has fishing opportunities) */
  fishing: {
    species: ['Smallmouth Bass', 'Rainbow Trout', 'Rock Bass', 'Muskie'],
    techniques:
      'Fly fishing in tailwater below dam. Spinning tackle with crankbaits and soft plastics in eddies. ' +
      'Topwater action at dawn and dusk.',
    seasons:
      'Spring (April-May) for pre-spawn bass. Fall (September-October) for aggressive feeding. ' +
      'Tailwater trout fishing year-round below Summersville Dam.',
    regulations:
      'WV fishing license required. Smallmouth bass: 15" minimum, 5 fish daily limit. ' +
      'Trout: Special regulations in tailwater - check WVDNR website.',
    catchAndRelease: 'Catch and release encouraged for all bass to preserve trophy fishery.',
    kimNote:
      'The water\'s gin-clear, so downsize your line to 6-8 lb test. These fish see EVERYTHING. ' +
      'Try a 3" tube jig in smoke or pumpkin - deadly on Gauley smallmouth!',
  },

  // ============================================================================
  // OUTFITTERS & GUIDE SERVICES
  // ============================================================================

  /** Commercial outfitters and guide services (OPTIONAL - 2-3 examples) */
  outfitters: [
    {
      name: 'ACE Adventure Resort',
      services: [
        'Guided rafting trips (Upper & Lower Gauley)',
        'Kayak instruction and rentals',
        'Shuttle services',
        'Lodging and camping',
      ],
      contact: '(304) 469-2651',
      website: 'https://aceraft.com',
      pricing: '$75-$150 per person depending on section and day',
    },
    {
      name: 'Rivers Whitewater Rafting',
      services: ['Commercial raft trips', 'Private trips', 'Photo packages', 'Equipment rental'],
      contact: '(800) 879-7483',
      website: 'https://www.riversresort.com',
      pricing: '$89-$139 per person',
    },
    {
      name: 'Class VI River Runners',
      services: ['Expert kayak trips', 'Private guide service', 'Custom expeditions'],
      contact: '(304) 574-0704',
      website: 'https://www.classsix.com',
      pricing: 'Custom pricing for private trips',
    },
  ],

  // ============================================================================
  // SEASONAL FLOW & CONDITIONS
  // ============================================================================

  /** Month-by-month or seasonal water conditions (OPTIONAL - 4 seasons recommended) */
  seasonalFlow: [
    {
      season: 'Spring (March-May)',
      flowRate: 'Natural flows 500-2000 CFS',
      conditions:
        'Snowmelt and spring rains create variable water levels. Lower sections runnable at most flows. ' +
        'Upper Gauley requires 1200+ CFS for safe passage.',
      accessibility: 'Expert kayakers only. No commercial rafting during spring.',
    },
    {
      season: 'Summer (June-August)',
      flowRate: 'Low flows 100-400 CFS',
      conditions:
        'River barely runnable except after heavy rains. Exposed rocks and shallow sections. ' +
        'Excellent time for scouting rapids and fishing.',
      accessibility: 'Not recommended for whitewater - focus on fishing and scouting.',
    },
    {
      season: 'Fall (September-October)',
      flowRate: 'Dam releases 2000-3000 CFS',
      conditions:
        'Summersville Dam releases create 6 weeks of world-class whitewater. Peak fall foliage adds ' +
        'stunning scenery. High water makes every rapid more challenging.',
      accessibility:
        'All levels welcome with commercial outfitters. Expert kayakers thrive at these flows.',
    },
    {
      season: 'Winter (November-February)',
      flowRate: 'Low flows 150-500 CFS',
      conditions:
        'River drops back to base flows after dam releases end. Cold water temps (35-45°F). ' +
        'Ice formations on canyon walls.',
      accessibility: 'Expert kayakers only. Dry suit required. No commercial trips.',
    },
  ],

  // ============================================================================
  // ACCESS POINTS
  // ============================================================================

  /** Put-ins, take-outs, and emergency exits (REQUIRED - min 2 points) */
  accessPoints: [
    {
      name: 'Summersville Dam Put-In',
      type: 'Put-in (Upper Gauley)',
      facilities: ['Paved parking (100 spaces)', 'Vault toilets', 'Boat ramp', 'Outfitter staging area'],
      coordinates: { lat: 38.2347, lng: -80.8653 },
      restrictions:
        'Gate closes at dusk. $3 daily parking fee or $25 annual pass. Outfitters have reserved areas.',
    },
    {
      name: 'Mason\'s Branch',
      type: 'Take-out (Upper Gauley) / Put-in (Lower Gauley)',
      facilities: ['Gravel parking (50 spaces)', 'Portable toilets', 'River access trail'],
      coordinates: { lat: 38.1523, lng: -80.9234 },
      restrictions: 'Steep river access - use caution carrying boats. No overnight parking.',
    },
    {
      name: 'Swiss (Takeout)',
      type: 'Take-out (Lower Gauley)',
      facilities: [
        'Large paved lot (200 spaces)',
        'Restrooms',
        'Picnic area',
        'Outfitter facilities',
      ],
      coordinates: { lat: 38.0923, lng: -81.0156 },
      restrictions: 'Commercial outfitters have priority 9am-5pm during release season.',
    },
  ],

  // ============================================================================
  // SAFETY INFORMATION
  // ============================================================================

  /** River safety by category (REQUIRED - min 3 categories) */
  safety: [
    {
      category: 'Required Equipment',
      items: [
        'Type V whitewater PFD',
        'Whitewater helmet',
        'Throw rope (50+ feet)',
        'Whistle',
        'River knife',
        'First aid kit',
      ],
      importance: 'critical',
    },
    {
      category: 'Skill Requirements',
      items: [
        'Class IV+ kayaking skills minimum',
        'Combat roll in heavy water',
        'Swift water rescue training',
        'Ability to read and scout rapids',
        'Experience with remote wilderness rivers',
      ],
      importance: 'critical',
    },
    {
      category: 'Known Hazards',
      items: [
        'Pillow Rock undercut',
        'Lost Paddle sieves',
        'Iron Ring keeper hole',
        'Remote canyon - evacuation difficult',
        'Cold water (50-65°F even in fall)',
        'Rapidly changing water levels during releases',
      ],
      importance: 'critical',
    },
    {
      category: 'Emergency Contacts',
      items: [
        'Emergency: 911',
        'Fayette County Rescue: (304) 574-3530',
        'Summersville Dam: (304) 872-5809',
        'Nearest hospital: Plateau Medical Center, Oak Hill (25 miles)',
      ],
      importance: 'high',
    },
  ],

  // ============================================================================
  // NEARBY ATTRACTIONS
  // ============================================================================

  /** Points of interest for trip planning (OPTIONAL - 3-5 examples) */
  nearbyAttractions: [
    {
      name: 'Summersville Lake',
      distance: '5 miles upstream',
      description:
        'Crystal-clear lake with camping, swimming, scuba diving, and excellent smallmouth bass fishing.',
      link: 'https://www.summersville-lake.com',
    },
    {
      name: 'New River Gorge National Park',
      distance: '15 miles',
      description:
        'World-class rock climbing, hiking, and whitewater on the New River. Iconic steel arch bridge.',
      link: 'https://www.nps.gov/neri',
    },
    {
      name: 'Carnifex Ferry Battlefield State Park',
      distance: '8 miles',
      description: 'Civil War battlefield with hiking trails, museum, and riverside camping.',
      link: 'https://wvstateparks.com/park/carnifex-ferry-battlefield-state-park/',
    },
    {
      name: 'Babcock State Park',
      distance: '20 miles',
      description:
        'Historic Glade Creek Grist Mill, camping, and hiking trails through old-growth forest.',
      link: 'https://wvstateparks.com/park/babcock-state-park/',
    },
  ],

  // ============================================================================
  // GEAR RECOMMENDATIONS
  // ============================================================================

  /** Recommended gear checklist (REQUIRED - min 5 items) */
  gearList: [
    { name: 'Whitewater kayak or raft', optional: false },
    { name: 'Type V whitewater PFD', optional: false },
    { name: 'Whitewater helmet', optional: false },
    { name: 'Wetsuit or drysuit', optional: false },
    { name: 'Throw rope (50+ feet)', optional: false },
    { name: 'River knife', optional: false },
    { name: 'Whistle', optional: false },
    { name: 'Dry bags for gear', optional: true },
    { name: 'First aid kit', optional: false },
    { name: 'Spare paddle', optional: true },
    { name: 'River shoes', optional: false },
    { name: 'Sunscreen & sunglasses', optional: true },
  ],

  // ============================================================================
  // SHOP INTEGRATION
  // ============================================================================

  /** Related shop categories to promote (OPTIONAL) */
  relatedShop: [
    {
      name: 'Kayaking & Rafting Gear',
      description: 'PFDs, helmets, paddles, and safety equipment',
      href: '/shop/kayaking',
    },
    {
      name: 'Fishing Equipment',
      description: 'Rods, reels, and tackle for river fishing',
      href: '/shop/fishing',
    },
    {
      name: 'Camping Supplies',
      description: 'Tents, sleeping bags, and camp gear',
      href: '/shop/camping',
    },
  ],

  // ============================================================================
  // OPTIONAL METADATA
  // ============================================================================

  /** Overall difficulty rating (OPTIONAL) */
  difficulty: 'challenging', // 'easy' | 'moderate' | 'challenging' | 'rugged'

  /** Best season overall (OPTIONAL) */
  bestSeason: 'fall', // 'spring' | 'summer' | 'fall' | 'winter'

  /** Put-in coordinates for mapping (OPTIONAL) */
  coordinates: {
    lat: 38.2347,
    lng: -80.8653,
  },

  /** Link to Google Maps (OPTIONAL) */
  mapUrl: 'https://maps.google.com/?q=38.2347,-80.8653',

  /** Link to real-time water level gauge (OPTIONAL) */
  waterLevelUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=03189100',
};

/**
 * MINIMAL EXAMPLE - Absolute minimum data needed for a river page.
 * Use this if you have limited information and want to start simple.
 */
export const minimalRiverData: RiverTemplateProps = {
  name: 'Simple Creek',
  image: '/images/rivers/simple-creek.jpg',
  imageAlt: 'Kayaker on Simple Creek',
  tagline: 'Local whitewater run close to home',
  description: 'A fun Class II-III creek with good fishing, located just 20 minutes from our shop.',

  stats: [
    { value: '5', label: 'Miles' },
    { value: 'Class II-III', label: 'Difficulty' },
  ],

  // Required metadata
  length: 5,
  county: 'Local County',
  difficultyRange: 'Class II-III',
  quickHighlights: ['Beginner-friendly', 'Good fishing'],

  // Minimal content sections
  rapids: [],
  fishing: {
    species: ['Smallmouth Bass'],
    techniques: 'Spinning tackle with crankbaits',
    seasons: 'Spring and Fall',
    regulations: 'WV fishing license required',
  },
  outfitters: [],
  seasonalFlow: [],
  accessPoints: [
    {
      name: 'Main Access',
      type: 'Put-in/Take-out',
      facilities: ['Parking', 'River access'],
    },
  ],
  safety: [
    {
      category: 'Required Equipment',
      items: ['PFD', 'Helmet'],
      importance: 'critical',
    },
  ],
  nearbyAttractions: [],
  gearList: [
    { name: 'Kayak or canoe', optional: false },
    { name: 'PFD', optional: false },
    { name: 'Paddle', optional: false },
  ],
  relatedShop: [],
};

export default exampleRiverData;
