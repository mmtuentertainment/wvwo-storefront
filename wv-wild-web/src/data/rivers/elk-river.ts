/**
 * Elk River Data File
 * SPEC-22: Elk River Migration to Dynamic Routes
 *
 * Paddling and fishing destination in Central West Virginia
 * 100+ fish species including endangered crystal and diamond darters
 * Sutton Lake (1,440 acres) and tailwater trout fishing
 *
 * Historical Context (verified against 110+ primary sources):
 * - Indigenous: Shawnee, Delaware, Mingo hunting grounds ("river of plenty fat elk")
 * - Logging Era: 1880-1930 devastation (30 billion board feet removed)
 * - Conservation: 1923 Seneca State Forest, 1938 Holly River refuge
 * - Sutton Dam: 1956-1961 ($35M, prevented $375M flood damages)
 * - Elk Restoration: 1913 initial attempt, 2015 modern program success
 *
 * Trails at Elk River WMA:
 * - Tower Falls Trail: 0.4 mi (day hike, improved/maintained)
 * - Woodell Trail: 1.1 mi (day hike, improved/maintained)
 * - 30+ miles interconnected trails total
 *
 * @module data/rivers/elk-river
 */

import type { RiverTemplateProps } from '../../types/adventure';

export const elkRiverData: RiverTemplateProps = {
  // ============================================================================
  // HERO SECTION DATA
  // ============================================================================

  name: 'Elk River',
  image: '/images/rivers/elk-river-hero.webp',
  imageAlt: 'Kayaker on Elk River below Sutton Dam with forested hills in fall colors',
  tagline: 'Central West Virginia\'s Most Biodiverse River',
  description:
    'Named by the Shawnee as "the river of plenty fat elk," the Elk River flows through the heart ' +
    'of West Virginia, supporting over 100 fish species and 30 mussel species - making it one of ' +
    'the most ecologically diverse rivers in the state. From trophy trout in the cold tailwaters ' +
    'below Sutton Dam (completed 1961) to warm-water bass and muskie in Sutton Lake (1,440 acres), ' +
    'plus easy Class I-II paddling through scenic Appalachian forests that recovered from the ' +
    '1880-1930 logging boom.',

  stats: [
    { value: '100+', label: 'Fish Species', icon: 'info' },
    { value: 'I-II', label: 'Difficulty', icon: 'info' },
    { value: '60 min', label: 'From Shop', icon: 'time' },
    { value: 'Year-Round', label: 'Access', icon: 'calendar' },
  ],

  // ============================================================================
  // RIVER METADATA
  // ============================================================================

  length: 100,
  county: 'Braxton County',
  difficultyRange: 'Class I-II',
  quickHighlights: [
    '100+ Fish Species',
    'Tailwater Trout',
    'Sutton Lake (1,440 acres)',
    'Beginner-Friendly Paddling',
    'Endangered Species Habitat',
  ],

  // ============================================================================
  // RAPIDS SECTION - Elk River is mellow, not whitewater
  // ============================================================================

  rapids: [
    {
      name: 'Sutton Dam Tailwater Run',
      class: { base: 'I' },
      displayName: 'Class I',
      description:
        'Easy float below Sutton Dam through scenic forest. Cold, clear water year-round. ' +
        'Excellent trout fishing opportunity while floating.',
      runnable: 'All skill levels. PFD required. Cold water - dress appropriately.',
    },
    {
      name: 'Elk River Rail Trail Section',
      class: { base: 'I', modifier: '+' },
      displayName: 'Class I+',
      description:
        'Gentle river float paralleling the Elk River Rail Trail. Easy put-ins and take-outs. ' +
        'Some riffles and small waves at higher water.',
      runnable: 'Beginners welcome with basic paddle skills. Great for families.',
    },
  ],

  // ============================================================================
  // FISHING INFORMATION - Major focus for this river
  // ============================================================================

  fishing: {
    species: [
      // Cold-water (tailwaters)
      'Brown Trout',
      'Rainbow Trout',
      'Golden Rainbow Trout',
      'Brook Trout',
      'Tiger Trout',
      // Warm-water (Sutton Lake)
      'Largemouth Bass',
      'Smallmouth Bass',
      'Spotted Bass',
      'Muskellunge',
      'Walleye',
      'Bluegill',
      'Channel Catfish',
      'Crappie',
      'Carp',
    ],
    techniques: [
      'Fly fishing with nymphs and streamers (tailwater trout)',
      'Spin cast with small Rooster Tails and inline spinners',
      'Crankbaits and soft plastics for bass',
      'Trolling for muskie and walleye',
      'Live bait (worms, minnows) for catfish and panfish',
      'Bank fishing at designated access points',
    ],
    accessPoints: [
      {
        name: 'Sutton Dam Tailwater',
        description: 'Premier trout fishing spot with year-round cold water. Bank access and wading. Cold water hazard - dress appropriately.',
      },
      {
        name: 'Bee Run Day Use Area',
        description: 'Handicapped-accessible fishing piers on Sutton Lake. Paved parking, vault toilets. $3 daily launch fee.',
      },
      {
        name: 'Gerald R. Freeman Campground',
        description: 'Marina with boat rentals, camping nearby. Full lake access for bass, muskie, and walleye.',
      },
    ],
    seasons:
      'Trout stocking: bi-weekly Feb-April, final May stocking. Best tailwater fishing Feb-May. ' +
      'Warm-water bass: April-October. Muskie: Fall (September-November) for aggressive feeding.',
    regulations:
      'WV fishing license required (age 15+). Check current creel limits and size restrictions at wvdnr.gov. ' +
      'Catch-and-release encouraged for trophy bass to preserve quality fishery.',
    catchAndRelease:
      'CRITICAL: Crystal darter and diamond darter are ENDANGERED - found only in Elk River. ' +
      'If you catch any small, unusual darter species, photograph and release immediately. Report sightings to WVDNR.',
    kimsTip: 'The tailwater below Sutton Dam holds trout year-round - coldest water in summer when everywhere else is too warm. Bring waders and watch for dam releases.',
  },

  // ============================================================================
  // OUTFITTERS
  // ============================================================================

  outfitters: [
    {
      name: 'Gerald R. Freeman Campground Marina',
      services: [
        'Boat rentals',
        'Boat ramp access',
        'Camping nearby',
        'Lake conditions info',
      ],
      contact: {
        phone: '(304) 765-2120',
      },
      seasonalNotes: 'Open April through November. Call for current hours and boat availability.',
    },
    {
      name: 'Sutton Lake Project Office (USACE)',
      services: [
        'Lake level information',
        'Dam release schedules',
        'Recreation information',
        'Accessibility assistance',
      ],
      contact: {
        phone: '(304) 765-2816',
        website: 'https://www.lrh.usace.army.mil/Missions/Civil-Works/Recreation/Lakes/Sutton-Lake/',
      },
      seasonalNotes: 'USACE office hours. Call for dam release schedules affecting tailwater fishing.',
    },
  ],

  // ============================================================================
  // SEASONAL FLOW
  // ============================================================================

  seasonalFlow: [
    {
      season: 'Spring (February-May)',
      level: 'Medium',
      cfsRange: 'Varies with dam releases',
      bestFor: ['Trout fishing (stocking season)', 'Fly fishing', 'Lake paddling'],
      notes:
        'Bi-weekly trout stocking in tailwaters. Cold water (42-52°F). Lake levels rising. Some tributaries may be high after rain.',
    },
    {
      season: 'Summer (June-August)',
      level: 'Low',
      cfsRange: 'Lake at full pool',
      bestFor: ['Family paddling', 'Bass fishing (early AM/evening)', 'Swimming', 'Camping'],
      notes:
        'Warm weather, pleasant lake paddling. Tailwaters remain cold year-round. Sutton Lake swimming beaches open.',
    },
    {
      season: 'Fall (September-November)',
      level: 'Medium',
      cfsRange: 'Lake drawdown begins',
      bestFor: ['Muskie fishing', 'Walleye fishing', 'Scenic paddling', 'Fall foliage viewing'],
      notes:
        'Peak foliage scenery. Muskie and walleye feeding aggressively. Less boat traffic. Best season for photography.',
    },
    {
      season: 'Winter (December-January)',
      level: 'Low',
      cfsRange: 'Lower lake levels',
      bestFor: ['Cold-water trout (experienced anglers)', 'Solitude seekers'],
      notes:
        'Very cold water - dress appropriately. Ice hazard on lake and streams. Trout holding in deep pools. Not recommended for beginners.',
    },
  ],

  // ============================================================================
  // ACCESS POINTS
  // ============================================================================

  accessPoints: [
    {
      name: 'Sutton Dam Tailwater Access',
      type: 'Put-in (Trout Fishing)',
      facilities: ['Parking', 'Access to tailwater', 'Bank fishing'],
      coordinates: { lat: 38.67, lng: -80.59 },
      restrictions: 'Stay clear of dam. Cold water year-round - use caution.',
    },
    {
      name: 'Bee Run Day Use Area',
      type: 'Put-in/Take-out (Sutton Lake)',
      facilities: ['Paved parking', 'Vault toilets', 'Boat ramp', 'Picnic area', 'Handicapped-accessible piers'],
      coordinates: { lat: 38.6297, lng: -80.5658 },
      restrictions: '$3 daily launch fee or annual pass.',
    },
    {
      name: "Baker's Run Boat Ramp",
      type: 'Put-in/Take-out (Sutton Lake)',
      facilities: ['Boat ramp', 'Parking', 'Campground nearby'],
    },
    {
      name: 'Gerald R. Freeman Campground Marina',
      type: 'Full-Service (Sutton Lake)',
      facilities: ['Marina', 'Boat rentals', 'Boat ramp', 'Camping', 'Restrooms'],
      coordinates: { lat: 38.84, lng: -80.62 },
      restrictions: 'Marina hours apply. Call (304) 765-2120.',
    },
    {
      name: 'South Abutment',
      type: 'Put-in/Take-out (Sutton Lake)',
      facilities: ['Boat ramp', 'Parking', 'Day-use area'],
    },
  ],

  // ============================================================================
  // SAFETY INFORMATION
  // ============================================================================

  safety: [
    {
      category: 'Required Equipment',
      items: [
        'Personal flotation device (PFD) - REQUIRED',
        'Whistle or signaling device',
        'Water and snacks',
        'Sun protection',
        'First aid kit',
      ],
      important: true,
    },
    {
      category: 'Cold Water Hazards',
      items: [
        'Tailwater is COLD year-round (42-55°F) - hypothermia risk',
        'Wetsuit or drysuit recommended for tailwater fishing/wading',
        'Never wade alone',
        'Strong swimmers only in tailwater sections',
        'Water levels can change quickly from dam releases',
      ],
      important: true,
    },
    {
      category: 'Endangered Species Protection',
      items: [
        'Crystal darter (Crystallaria asprella) - EXTREMELY RARE (only 8 specimens ever found)',
        'Diamond darter (Etheostoma mooneyi) - found ONLY in Elk River worldwide',
        'Multiple endangered freshwater mussels below Sutton Dam',
        'Handle all darters carefully - photograph and release',
        'Report unusual catches to WVDNR',
      ],
      important: false,
    },
    {
      category: 'Emergency Contacts',
      items: [
        'Emergency: 911',
        'Braxton County Medical Center: ~20-30 min from remote areas',
        'Lake Conditions: (304) 765-2705',
        'Sutton Lake Resource Manager: (304) 765-2816',
        'WVDNR District 3: (304) 924-6211',
      ],
      important: false,
    },
  ],

  // ============================================================================
  // NEARBY ATTRACTIONS
  // ============================================================================

  nearbyAttractions: [
    {
      name: 'Sutton Lake',
      distance: 'Within watershed',
      description: '1,440-acre lake with 5 boat ramps, camping, swimming beaches, and excellent fishing.',
      link: '/near/lake/sutton/',
    },
    {
      name: 'Elk River Wildlife Management Area',
      distance: 'Adjacent',
      description: '18,396 acres of public hunting land. Deer, turkey, bear, grouse, and small game.',
      link: '/near/wma/elk-river/',
    },
    {
      name: 'Bulltown Historic Area',
      distance: '5 miles',
      description: 'Civil War history, Indigenous heritage, and connection to Burnsville Lake recreation.',
      link: '/historic/bulltown/',
    },
    {
      name: 'Holly River State Park',
      distance: '15-20 miles',
      description: '8,294 acres with 42+ miles of trails, camping, cabins, and swimming pool.',
    },
    {
      name: 'Elk River Rail Trail',
      distance: 'Adjacent/overlaps',
      description: '52-73 mile rail-to-trail from Clendenin to beyond Gassaway. Crushed stone/packed gravel, ' +
        '0.5% grade (very flat). Permits mountain bikes, Class 1/Class 3 e-bikes, and horseback riding. ' +
        'Multiple trailheads (Duck, Ivydale, Dundon, Hartland). Ideal for families and bikers - WMA trails do NOT allow bikes.',
    },
  ],

  // ============================================================================
  // GEAR RECOMMENDATIONS
  // ============================================================================

  gearList: [
    { name: 'Personal flotation device (PFD)', optional: false },
    { name: 'WV fishing license', optional: false },
    { name: 'Kayak or canoe', optional: false },
    { name: 'Paddle', optional: false },
    { name: 'Dry bag for gear', optional: false },
    { name: 'Water and snacks', optional: false },
    { name: 'Sun protection (hat, sunscreen)', optional: false },
    { name: 'Fishing rod and tackle', optional: true },
    { name: 'Wetsuit (tailwater)', optional: true },
    { name: 'Binoculars (wildlife viewing)', optional: true },
    { name: 'Camera (waterproof)', optional: true },
    { name: 'First aid kit', optional: false },
  ],

  // ============================================================================
  // SHOP INTEGRATION
  // ============================================================================

  relatedShop: [
    {
      name: 'Fishing Equipment',
      description: 'Rods, reels, tackle for bass, trout, and muskie',
      href: '/shop/fishing',
    },
    {
      name: 'Kayaking Gear',
      description: 'PFDs, paddles, dry bags, and accessories',
      href: '/shop/kayaking',
    },
  ],

  // ============================================================================
  // OPTIONAL METADATA
  // ============================================================================

  difficulty: 'easy',
  bestSeason: 'fall',
  coordinates: { lat: 38.6297, lng: -80.5658 },
  mapUrl: 'https://maps.google.com/?q=38.6297,-80.5658',
  waterLevelUrl: 'https://waterdata.usgs.gov/monitoring-location/03194700/',
};

export default elkRiverData;
