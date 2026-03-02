/**
 * Stonewall Jackson Lake Data
 * SPEC-25: Lake Physical Specifications & Fishing Research
 *
 * Sources:
 * - U.S. Army Corps of Engineers (USACE) Pittsburgh District
 * - West Virginia Division of Natural Resources (WVDNR)
 * - Stonewall Resort Marina documentation
 * - WVDNR Fishing Database
 *
 * Data includes:
 * - Lake specifications (2,650 acres, 82-mile shoreline, 26-mile length)
 * - Fishing species (bass, walleye, muskie, catfish, crappie)
 * - Marina services (374-slip Stonewall Resort Marina)
 * - Boat access (5 public ramps)
 * - Cross-links to related destinations
 */

import type { LakeTemplatePropsEnriched } from '../../types/lake-enrichment';

/**
 * Complete lake data for Stonewall Jackson Lake
 * Uses LakeTemplatePropsEnriched for enriched fishing and access data.
 * Ready to spread into LakeTemplate component.
 */
export const stonewallJacksonLakeData: LakeTemplatePropsEnriched = {
  // Basic Info
  name: 'Stonewall Jackson Lake',
  slug: 'stonewall-jackson',
  image: '/images/lakes/stonewall-jackson-hero.jpg',
  imageAlt: 'Stonewall Jackson Lake with West Fork River channel and irregular shoreline',
  tagline: '#1 Bass Fishing Lake in West Virginia',
  description: 'West Virginia\'s premier bass fishing destination with 2,650 acres and 82 miles of shoreline. Nationally recognized for largemouth and smallmouth bass, plus walleye, muskie, and crappie. Located just 10 miles from Weston with 5 public boat ramps and a 374-slip resort marina.',

  // Lake Specifications
  lakeSpecs: {
    surfaceAcres: 2650,
    maxDepth: 40,
    shorelineMiles: 82,
    lengthMiles: 26,
    drainageAreaSquareMiles: 102,
    waterType: 'West Fork River impoundment',
    damHeight: 95,
    damLength: 620,
    yearOperational: 1988,
  },

  // Quick Stats (Hero Section)
  stats: [
    { value: '2,650', label: 'Lake Acres', icon: 'area' as const },
    { value: '82 mi', label: 'Shoreline', icon: 'distance' as const },
    { value: '40 ft', label: 'Max Depth', icon: 'elevation' as const },
    { value: '#1', label: 'Bass Lake in WV', icon: 'none' as const },
  ],

  // Fishing Spots (Where to Fish Section)
  fishingSpots: [
    {
      name: 'West Fork River Channel',
      depth: '15-40 feet',
      structure: 'Main river channel with ledges, submerged points, current breaks',
      species: ['Largemouth Bass', 'Smallmouth Bass', 'Walleye'],
      access: 'Boat access - launch from any of 5 public ramps',
      tips: 'Cast along channel ledges and submerged points. Early morning and late evening peak activity.',
    },
    {
      name: 'Skin Creek Drainage (V-Arm)',
      depth: '8-25 feet',
      structure: 'Irregular V-shaped arm with brush piles, timber, shallow flats',
      species: ['Largemouth Bass', 'Crappie', 'Bluegill'],
      access: 'Boat and kayak access - scenic upper reaches',
      tips: 'Excellent crappie spawn location in spring. Work brush piles with small jigs and live minnows.',
    },
    {
      name: 'Dam Area Deep Structure',
      depth: '25-40 feet',
      structure: 'Deep water near dam, rocky bottom, drop-offs',
      species: ['Walleye', 'Muskie', 'Smallmouth Bass'],
      access: 'Boat only - deep water structure',
      tips: 'Walleye on vertical jigs with live bait. Muskie on large bucktails and jerkbaits.',
    },
    {
      name: 'Shoreline Coves & Points',
      depth: '3-20 feet',
      structure: 'Rocky points, shallow coves, submerged timber',
      species: ['Largemouth Bass', 'Smallmouth Bass', 'Catfish'],
      access: 'Kayak and shore fishing available',
      tips: 'Texas-rigged worms along shoreline. Catfish night fishing with chicken liver or stink bait.',
    },
  ],

  // Fish Species with Regulations
  fishSpecies: [
    {
      name: 'Largemouth Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Daily limit 6 (combined with smallmouth and spotted bass). No minimum size.',
      tips: 'Topwater early morning and late evening. Texas-rigged worms in 4-5 inch range.',
    },
    {
      name: 'Smallmouth Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Daily limit 6 (combined with largemouth and spotted bass). No minimum size.',
      tips: 'Tube jigs and soft plastics on rocky structure. Drop shot rigs effective in spring.',
    },
    {
      name: 'Walleye',
      bestSeason: 'Fall and Winter',
      regulations: 'Check WV DNR current regulations. Call 304-924-6211 (District 3).',
      tips: 'Vertical jigging near dam. Live minnow trailers on jig heads.',
    },
    {
      name: 'Muskellunge (Muskie)',
      bestSeason: 'Fall (September-November)',
      regulations: 'Minimum 52 inches to keep. Daily limit 1. Special regulations - check WVDNR.',
      tips: 'Large bucktails and jerkbaits. Heavy tackle for fish regularly running 40+ inches. "Fish of 10,000 casts."',
    },
    {
      name: 'Crappie',
      bestSeason: 'Spring',
      regulations: 'Daily limit 30 (combined black and white). No minimum size.',
      tips: 'Spring spawn in shallow coves - use small jigs and live minnows around brush piles.',
    },
    {
      name: 'Channel Catfish',
      bestSeason: 'Summer and Fall',
      regulations: 'Daily limit 4. No minimum size. Year-round fishing.',
      tips: 'Night fishing with chicken liver, cut shad, or stink bait. Anchor near deeper structure.',
    },
    {
      name: 'White Bass',
      bestSeason: 'Spring and Fall',
      regulations: 'Check current WVDNR regulations.',
      tips: 'Schooling fish - look for baitfish disturbances on surface. Small jigs and spinners.',
    },
    {
      name: 'Bluegill & Panfish',
      bestSeason: 'Spring and Summer',
      regulations: 'No minimum size. Excellent panfish lake.',
      tips: 'Shallow water near vegetation and timber. Small jigs and live crickets/worms.',
    },
  ],

  // Marina & Boat Access
  marinas: [
    {
      name: 'Stonewall Resort Marina',
      type: 'Full-service resort marina with rentals and lodging',
      address: 'Stonewall Resort, Roanoke, WV 26447',
      services: [
        '374 boat slips (modern facility)',
        'Fishing boat and pontoon rentals',
        'Fuel dock',
        'Bait and tackle shop',
        'Restaurant and lounge',
        'Resort lodging (hotel rooms, cottages)',
        'Swimming pool and hot tub',
        'Golf course (18-hole championship)',
      ],
      contact: '(877) 878-6966 or (304) 269-7600',
      website: 'stonewallresort.com',
      hours: 'Year-round access to marina slip holders',
      notes: 'Premier destination resort with full amenities. Call for daily rental rates and availability.',
    },
    {
      name: 'Public Boat Ramps',
      type: 'Five public launch locations',
      services: [
        'Multiple public boat ramps around lake perimeter',
        'Access to all lake areas',
        'Parking for trailers and vehicles',
      ],
      notes: 'Five ramps provide access to all fishing areas. Day use fees typically $5 per vehicle (verify current rates).',
    },
  ],

  // Activities (Beyond Fishing)
  activities: [
    {
      name: 'Bass Fishing',
      description: 'Nationally recognized #1 bass fishing lake in West Virginia. Largemouth and smallmouth bass fishing throughout the year. Clear water and varied structure make this ideal for all skill levels.',
      season: 'Year-round (peak spring and fall)',
      difficulty: 'Beginner to Advanced',
      provider: 'Public access via 5 boat ramps',
    },
    {
      name: 'Muskie Fishing',
      description: 'Premium muskie fishing in fall with 52-inch minimum size requirement. Trophy potential for serious anglers. Heavy tackle and patience required.',
      season: 'Fall (September-November)',
      difficulty: 'Advanced',
      tips: 'Bring heavy rods and be ready for a long day of casting',
    },
    {
      name: 'Walleye Fishing',
      description: 'Walleye populations support year-round fishing with excellent fall and winter action. Vertical jigging and live bait techniques most effective.',
      season: 'Fall and Winter',
      difficulty: 'Intermediate to Advanced',
    },
    {
      name: 'Crappie Spawn',
      description: 'Spring crappie fishing in shallow coves and brush piles. Skin Creek drainage arm excellent for spawning crappie.',
      season: 'Spring (March-May)',
      difficulty: 'Beginner-friendly',
    },
    {
      name: 'Boating & Water Sports',
      description: 'Scenic lake with 82 miles of shoreline. Water skiing, jet skiing, and general recreation boating available.',
      season: 'May through October',
      difficulty: 'All levels',
      fees: 'Marina slips and rentals available',
    },
    {
      name: 'Kayaking & Paddleboarding',
      description: 'Explore 82 miles of shoreline and scenic coves. Irregular V-shaped lake provides protected paddling in Skin Creek arm.',
      season: 'May through October',
      difficulty: 'Beginner to Intermediate',
    },
    {
      name: 'Hiking & Visitor Center',
      description: 'USACE visitor center with dam overlook and hiking trail. Learn about lake history and water management.',
      season: 'Year-round',
      difficulty: 'Easy',
    },
  ],

  // Seasonal Fishing Guide
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Crappie', 'Largemouth Bass', 'Smallmouth Bass'],
      techniques: 'Crappie spawn in shallow coves - use small jigs and live minnows around brush piles. Bass move shallow - work spinnerbaits and soft plastics near warming banks. Finesse jigs with green pumpkin on rocky points.',
      conditions: 'Water temperatures rising from 45°F to 65°F. Improving visibility. Summer pool achieved by mid-May.',
      kimNote: 'Spring is peak crappie season. Stop by for spawn jigs and live minnows. Water\'s still cold early - bring layers.',
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Largemouth Bass', 'Smallmouth Bass', 'Walleye', 'Panfish'],
      techniques: 'Bass move to deeper structure - drop shot rigs and tube jigs. Topwater early morning and late evening. Walleye on points and ledges - troll crankbaits or jig with live bait. Catfish night fishing.',
      conditions: 'Water temps 68-80°F. Fish go deep midday. 82 miles of shoreline to explore.',
      kimNote: 'Get out early before the sun gets high. Late afternoon topwater can be fantastic.',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie', 'Largemouth Bass'],
      techniques: 'Bass feed heavily pre-winter - work rocky points with bigger presentations. Muskie actively feeding - large bucktails and jerkbaits. Walleye concentrate in deeper areas.',
      conditions: 'Water cooling 65°F to 50°F. Fish feed aggressively before winter. Excellent muskie season.',
      kimNote: 'Best muskie fishing of the year. Bring heavy tackle and be patient - it\'s the fish of 10,000 casts.',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Crappie', 'Largemouth Bass'],
      techniques: 'Slow vertical jigging in deep water 40+ feet. Walleye on deep ledges. Crappie suspend near structure. Blade baits and finesse presentations.',
      conditions: 'Water temps 38-45°F. Clear visibility. Lake drawdown 5 feet (minimal impact).',
      kimNote: 'Bundle up - it\'s cold but walleye bite is strong. Winter fishing often produces bigger fish.',
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
      category: 'Muskie Regulations (SPECIAL)',
      details: 'Minimum 52 inches to keep (not the standard 30 inches at other WV lakes). Daily limit 1. Special modified regulations since 2013 - check WVDNR for current requirements.',
      link: 'https://wvdnr.gov/fishing/fishing-regulations/',
      important: true,
    },
    {
      category: 'Bass Regulations',
      details: 'Daily limit 6 in any combination (smallmouth, largemouth, spotted bass). No minimum size. Possession limit 12.',
      important: false,
    },
    {
      category: 'Walleye Regulations',
      details: 'Check with WV DNR District 3 for current regulations. Contact 304-924-6211.',
      important: true,
    },
    {
      category: 'Boating Safety',
      details: 'Life jackets required for all persons on vessels. Children 12 and under must wear PFD at all times while underway. Boater safety card required for operators born after Dec 31, 1986.',
      important: true,
    },
    {
      category: 'Lake Drawdown',
      details: 'Winter drawdown only 5 feet - minimal impact on fishing access and camping. Year-round fishing opportunity.',
      important: false,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Bass tackle (tube jigs, soft plastics, spinnerbaits)', optional: false },
    { name: 'Muskie tackle (heavy rods, large bucktails, jerkbaits)', optional: true },
    { name: 'Drop shot rigs for smallmouth', optional: true },
    { name: 'Crappie jigs (small, 1/32 oz)', optional: true },
    { name: 'Walleye live minnows and jigs', optional: true },
    { name: 'Catfish bait (chicken liver, cut shad, stink bait)', optional: true },
    { name: 'Life jackets (required for all ages)', optional: false },
    { name: 'Sunscreen and polarized sunglasses', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Navigation lights (if boating after dark)', optional: true },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Bass Fishing Gear',
      description: 'Rods, reels, and tackle for #1 bass lake in WV',
      href: '/shop/fishing',
    },
    {
      name: 'Muskie Tackle',
      description: 'Heavy tackle for trophy muskie (52" minimum)',
      href: '/shop/fishing',
    },
    {
      name: 'Boating Safety',
      description: 'Life jackets and boater safety equipment',
      href: '/shop/safety',
    },
    {
      name: 'Live Bait',
      description: 'Minnows and shiners for walleye and crappie',
      href: '/shop/bait',
    },
  ],

  // Cross-Links to Related Destinations
  nearbyWMA: ['stonewall-jackson'],
  nearbyCampgrounds: ['briar-point'],
  nearbyStateParks: ['stonewall-resort'],

  // Meta Information
  difficulty: 'easy',
  bestSeason: 'spring',
  coordinates: {
    lat: 39.0036,
    lng: -80.4742,
  },

  // Contact Information
  contact: {
    usaceOffice: {
      name: 'Stonewall Jackson Lake Project Office',
      address: 'USACE Pittsburgh District',
      phone: '304-269-0100',
      email: 'pa2@usace.army.mil',
    },
    marina: {
      name: 'Stonewall Resort Marina',
      phone: '(877) 878-6966 or (304) 269-7600',
      website: 'stonewallresort.com',
    },
    wvdnr: {
      name: 'WV DNR District 3',
      phone: '304-924-6211',
      email: 'wvdnr@wvdnr.gov',
    },
  },

  // Official Links
  officialLinks: [
    {
      name: 'USACE Stonewall Jackson Lake',
      url: 'https://www.lrd.usace.army.mil/Recreation/Lakes/Stonewall-Jackson-Lake/',
    },
    {
      name: 'Stonewall Resort',
      url: 'https://www.stonewallresort.com/',
    },
    {
      name: 'WVDNR Fishing Regulations',
      url: 'https://wvdnr.gov/fishing/fishing-regulations/',
    },
  ],
};
