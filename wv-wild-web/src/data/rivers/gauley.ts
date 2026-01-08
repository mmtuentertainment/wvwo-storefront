/**
 * SPEC-14: Gauley River Data File
 * World-class whitewater destination in West Virginia
 *
 * TODO: Replace placeholder data with actual information
 * TODO: Add hero image to /public/images/rivers/gauley-hero.jpg
 * TODO: Verify rapid names and difficulty ratings with local guides
 * TODO: Update outfitter contact information and pricing
 * TODO: Add GPS coordinates for all access points
 * TODO: Verify fishing regulations with WVDNR
 * TODO: Add real-time water level gauge URL
 */

import type { RiverTemplateProps } from '../../types/adventure';

export const gauleyRiverData: RiverTemplateProps = {
  // ============================================================================
  // HERO SECTION DATA
  // ============================================================================

  name: 'Gauley River',
  image: '/images/rivers/gauley-hero.jpg', // TODO: Add actual image
  imageAlt: 'Whitewater kayaker navigating Class V rapids on the Gauley River in fall colors',
  tagline: 'World-Class Whitewater in the Heart of West Virginia',
  description:
    'The Gauley River delivers 25 miles of continuous Class III-V whitewater through a remote canyon ' +
    'in southern West Virginia. With over 100 named rapids and legendary fall release flows, the Gauley ' +
    'is considered one of the best whitewater rivers in the world.',

  stats: [
    { value: '25', label: 'Miles', icon: 'distance' },
    { value: 'Class III-V', label: 'Difficulty', icon: 'info' },
    { value: '45 min', label: 'From Shop', icon: 'time' }, // TODO: Verify drive time
    { value: 'Sep-Oct', label: 'Season', icon: 'calendar' },
  ],

  // ============================================================================
  // RIVER METADATA
  // ============================================================================

  length: 25,
  county: 'Fayette & Nicholas Counties',
  difficultyRange: 'Class III-V',
  quickHighlights: [
    '100+ Rapids',
    'Dam-Release Flows',
    'Expert Guides Available',
    'Trophy Smallmouth Bass',
  ],

  // ============================================================================
  // RAPIDS SECTION - TODO: Expand with more rapids
  // ============================================================================

  rapids: [
    {
      name: 'Pillow Rock',
      class: { base: 'V', modifier: '+' },
      displayName: 'Class V+',
      description:
        // TODO: Verify technical description with expert kayakers
        'The Gauley\'s most notorious rapid. A 14-foot drop over a massive undercut boulder creates ' +
        'a powerful keeper hole.',
      runnable: 'Expert kayakers only at high water (2000+ CFS). Commercial rafts portage.',
      kimNote: 'TODO: Add Kim\'s personal story about this rapid',
    },
    {
      name: 'Lost Paddle',
      class: { base: 'V' },
      displayName: 'Class V',
      description:
        'Long, complex boulder garden with multiple lines and consequences. Named for the paddles ' +
        'left behind by swimmers.',
      runnable: 'Experienced Class IV+ kayakers. Commercial rafts run center-right line.',
      // TODO: Add Kim's tip for this rapid
    },
    // TODO: Add Sweet's Falls, Iron Ring, Heaven's Gate, Pure Screaming Hell, and other major rapids
  ],

  // ============================================================================
  // FISHING INFORMATION - TODO: Verify with local anglers
  // ============================================================================

  fishing: {
    species: ['Smallmouth Bass', 'Rainbow Trout', 'Rock Bass', 'Muskie'],
    techniques: [
      'Fly fishing in tailwater below dam',
      'Spinning tackle with crankbaits in eddies',
      'Soft plastics for bass in slack water',
      'Topwater action during early morning/evening',
    ],
    accessPoints: [
      {
        name: 'Summersville Dam Tailwater',
        description: 'Below-dam fishing with rainbow trout stocking. Best access for wade fishing.',
      },
      {
        name: 'Swiss Access',
        description: 'Lower Gauley access point. Good smallmouth bass in rocky pools.',
      },
    ],
    seasons: 'Spring (April-May) for pre-spawn bass. Fall (September-October) for aggressive feeding.',
    regulations:
      'WV fishing license required. Smallmouth bass: 15" minimum, 5 fish daily limit.',
    catchAndRelease: 'Catch and release encouraged for all bass to preserve trophy fishery.',
    kimsTip: 'The bass fishing here is often overlooked because everyone focuses on the whitewater. Fish the eddies and pools between runs.',
  },

  // TODO: Add kimsTip at top-level for Kim's fishing tips

  // ============================================================================
  // OUTFITTERS - TODO: Update contact info and pricing
  // ============================================================================

  outfitters: [
    {
      name: 'ACE Adventure Resort',
      services: [
        'Guided rafting trips (Upper & Lower Gauley)',
        'Kayak instruction and rentals',
        'Shuttle services',
        'Lodging and camping',
      ],
      contact: {
        phone: '(304) 469-2651',
        website: 'https://aceraft.com',
      },
      priceRange: '$75-$150 per person',
      seasonalNotes: 'Open year-round. Peak season September-October for Gauley Season.',
    },
  ],

  // ============================================================================
  // SEASONAL FLOW - TODO: Verify flow data with dam operator
  // ============================================================================

  seasonalFlow: [
    {
      season: 'Fall (September-October)',
      level: 'High',
      cfsRange: '2000-3000 CFS (dam releases)',
      bestFor: ['World-class whitewater', 'Commercial rafting', 'Expert kayaking', 'Fall foliage viewing'],
      notes: 'Gauley Season - Summersville Dam releases create 6 weeks of world-class whitewater. Book guides well in advance.',
    },
    {
      season: 'Summer (June-August)',
      level: 'Low',
      cfsRange: '200-500 CFS (natural flow)',
      bestFor: ['Fishing', 'Swimming holes', 'Scenic float (Upper only)'],
      notes: 'Low water - mostly unsuitable for whitewater. Great for fishing and relaxed exploration.',
    },
  ],

  // ============================================================================
  // ACCESS POINTS - TODO: Add GPS coordinates for all points
  // ============================================================================

  accessPoints: [
    {
      name: 'Summersville Dam Put-In',
      type: 'Put-in (Upper Gauley)',
      facilities: ['Paved parking', 'Vault toilets', 'Boat ramp'],
      coordinates: { lat: 38.2347, lng: -80.8653 }, // TODO: Verify coordinates
      restrictions: 'Gate closes at dusk. $3 daily parking fee.',
    },
    // TODO: Add Mason's Branch and Swiss take-out points
  ],

  // ============================================================================
  // SAFETY INFORMATION - TODO: Verify emergency contacts
  // ============================================================================

  safety: [
    {
      category: 'Required Equipment',
      items: [
        'Type V whitewater PFD',
        'Whitewater helmet',
        'Throw rope (50+ feet)',
        'Whistle',
        'River knife',
      ],
      important: true,
    },
    {
      category: 'Skill Requirements',
      items: [
        'Class IV+ kayaking skills minimum',
        'Combat roll in heavy water',
        'Swift water rescue training',
      ],
      important: true,
    },
    {
      category: 'Emergency Contacts',
      items: [
        'Emergency: 911',
        'Nicholas County EMS: (304) 872-7845',
        'Summersville Dam (water info): (304) 872-3459',
      ],
      important: false,
    },
  ],

  // ============================================================================
  // NEARBY ATTRACTIONS - TODO: Verify distances and links
  // ============================================================================

  nearbyAttractions: [
    {
      name: 'Summersville Lake',
      distance: '5 miles upstream', // TODO: Verify distance
      description: 'Crystal-clear lake with camping, swimming, and excellent fishing.',
      link: 'https://www.summersville-lake.com',
    },
    // TODO: Add New River Gorge, Carnifex Ferry, Babcock State Park
  ],

  // ============================================================================
  // GEAR RECOMMENDATIONS
  // ============================================================================

  gearList: [
    { name: 'Whitewater kayak or raft', optional: false },
    { name: 'Type V whitewater PFD', optional: false },
    { name: 'Whitewater helmet', optional: false },
    { name: 'Wetsuit or drysuit', optional: false },
    { name: 'Throw rope', optional: false },
    { name: 'River knife', optional: false },
    { name: 'Dry bags', optional: true },
    { name: 'First aid kit', optional: false },
  ],

  // ============================================================================
  // SHOP INTEGRATION
  // ============================================================================

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
  ],

  // ============================================================================
  // OPTIONAL METADATA - TODO: Add real-time gauge URL
  // ============================================================================

  difficulty: 'challenging',
  bestSeason: 'fall',
  coordinates: { lat: 38.2347, lng: -80.8653 }, // TODO: Verify put-in coordinates
  mapUrl: 'https://maps.google.com/?q=38.2347,-80.8653',
  waterLevelUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=03189100', // TODO: Verify USGS gauge number
};

export default gauleyRiverData;
