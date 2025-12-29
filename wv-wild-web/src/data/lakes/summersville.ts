/**
 * Summersville Lake Data
 * SPEC-13 T127: Data extraction for LakeTemplate migration
 *
 * Extracted from: wv-wild-web/src/pages/near/summersville-lake.astro
 * Purpose: Centralize Summersville Lake adventure data for LakeTemplate component
 *
 * Data includes:
 * - Quick stats (acreage, distance, location, access)
 * - Fishing species with detailed descriptions
 * - Hunting opportunities (deer, turkey, bear, small game)
 * - Camping facilities (4 campgrounds)
 * - Amenities and marina services
 * - Gear checklist
 * - Related shop categories
 */

import type { LakeTemplateProps, FishingSpot, GearItem, RelatedCategory } from '../../types/adventure';

/**
 * Complete lake data for Summersville Lake WMA
 * Ready to spread into LakeTemplate component
 */
export const summersvilleLakeData: LakeTemplateProps = {
  // Basic Info
  name: 'Summersville Lake WMA',
  image: '/images/summersville-lake-hero.jpg', // TODO: Update with actual image path
  imageAlt: 'Summersville Lake crystal clear waters with forested shoreline',
  tagline: 'They call it the Little Bahamas of the East for good reason.',
  description: 'West Virginia\'s largest lake with crystal clear water, world-class smallmouth fishing, scuba diving, and hunting for deer, turkey, and bear in nearly 6,000 acres of forest. 30 minutes from WV Wild Outdoors.',

  // Quick Stats (Hero Section)
  stats: [
    { value: '5,974', label: 'WMA Acres', icon: 'area' as const },
    { value: '30 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Nicholas Co.', label: 'Location', icon: 'location' as const },
    { value: 'Year-Round', label: 'Access', icon: 'calendar' as const },
  ],

  // Fishing Spots (Where to Fish Section)
  fishingSpots: [
    {
      name: 'Main Lake Basin',
      depth: '20-60 feet',
      structure: 'Rocky ledges, submerged points, deep channels',
      species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      access: 'Boat required - launch from Battle Run, Salmon Run, or Long Point',
    },
    {
      name: 'North Shore Points',
      depth: '15-40 feet',
      structure: 'Rock formations, underwater shelves, scattered boulders',
      species: ['Smallmouth Bass', 'Largemouth Bass', 'Crappie'],
      access: 'Boat recommended - some shore access at select points',
    },
    {
      name: 'Dam Area',
      depth: '40-80 feet',
      structure: 'Deep water, rocky dam face, current breaks',
      species: ['Walleye', 'Muskie', 'Smallmouth Bass'],
      access: 'Boat only - deep water structure',
    },
    {
      name: 'Cove Shallows',
      depth: '5-15 feet',
      structure: 'Weed beds, brush piles, submerged timber',
      species: ['Largemouth Bass', 'Crappie', 'Bluegill', 'Yellow Perch'],
      access: 'Kayak and shore fishing available in back coves',
    },
  ],

  // Marina & Boat Access
  marinas: [
    {
      name: 'Summersville Lake Marina',
      type: 'Full-service marina with rentals',
      services: [
        'Kayak rentals',
        'Pontoon boat rentals',
        'Fishing boat rentals',
        'Bait and tackle shop',
        'Fuel dock',
        'Ice and supplies',
      ],
      contact: '(304) 872-5809',
      hours: 'Seasonal - April through October',
      fees: 'Varies by rental',
    },
    {
      name: 'Battle Run Boat Ramp',
      type: 'Public boat launch with facilities',
      services: [
        'Paved multi-lane ramp',
        'ADA accessible',
        'Courtesy dock',
        'Parking for trucks and trailers',
        'Restrooms nearby',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
    {
      name: 'Salmon Run Boat Ramp',
      type: 'Public boat launch',
      services: [
        'Paved ramp',
        'Parking area',
        'Picnic facilities',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
    {
      name: 'Long Point Boat Ramp',
      type: 'Public boat launch',
      services: [
        'Paved ramp',
        'Parking area',
        'Near overlook and diving sites',
      ],
      hours: '24/7 access',
      fees: 'Free',
    },
  ],

  // Activities (Beyond Fishing)
  activities: [
    {
      name: 'Scuba Diving',
      description: 'Skin Diver Magazine called it the cleanest, clearest freshwater lake east of the Mississippi. Visibility 30-45 feet on good days. Long Point Cliff and Overlook site are signature dives.',
      season: 'May through October',
      difficulty: 'Intermediate to Advanced',
    },
    {
      name: 'Swimming',
      description: 'Battle Run Beach offers designated swimming area. Crystal clear water with summer temps 68-80°F. Long Point has pyramid rock formation for cliff jumping.',
      season: 'Summer',
      difficulty: 'Beginner-friendly',
    },
    {
      name: 'Deer Hunting',
      description: 'Mature hardwoods and mixed forest provide excellent deer habitat. Buck firearms season November-December, archery opens late September. 5,974 acres of WMA land.',
      season: 'September through December',
      difficulty: 'Moderate - steep terrain',
    },
    {
      name: 'Turkey Hunting',
      description: 'Spring gobbler season brings birds working the ridges at dawn. Mature hardwoods ideal for turkey. Fall season also available.',
      season: 'Spring and Fall',
      difficulty: 'Moderate',
    },
    {
      name: 'Bear Hunting',
      description: 'Nicholas County is in WV bear zone. Multiple seasons mid-September through December. Bear Damage Stamp required. Thick cover and oak mast make excellent habitat.',
      season: 'September through December',
      difficulty: 'Challenging - remote terrain',
    },
    {
      name: 'Small Game',
      description: 'Ruffed grouse in younger timber and regenerating cuts. Excellent squirrel hunting in mature hardwoods with oak and hickory mast.',
      season: 'Fall and Winter',
      difficulty: 'Easy to Moderate',
    },
  ],

  // Seasonal Fishing Guide
  seasonalGuide: [
    {
      period: 'Spring (March-May)',
      targetSpecies: ['Crappie', 'Smallmouth Bass', 'Largemouth Bass'],
      techniques: 'Crappie spawn in shallow coves - use small jigs and live minnows around brush piles. Bass move shallow - work spinnerbaits and soft plastics near warming banks.',
      conditions: 'Water temperatures rising from 45°F to 65°F. Clear visibility improving.',
      kimNote: 'Stop by for crappie jigs and pre-spawn bass tackle. Water\'s still cold early on - bring layers.',
    },
    {
      period: 'Summer (June-August)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie', 'Panfish'],
      techniques: 'Smallmouth on deep structure - drop shot rigs and tube jigs on 6-8 lb test. Walleye on points and ledges - troll crankbaits or jig with live bait. Early morning and late evening are prime.',
      conditions: 'Water temps 68-80°F. Crystal clear - 30-45 feet visibility. Fish go deep midday.',
      kimNote: 'This is peak season - get out early before the sun gets high. Clear water means they can see you coming.',
    },
    {
      period: 'Fall (September-November)',
      targetSpecies: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      techniques: 'Bass feed heavily pre-winter - work rocky points and ledges. Muskie actively feeding - large bucktails and jerkbaits. Walleye follow baitfish schools.',
      conditions: 'Water cooling 65°F to 50°F. Visibility remains excellent. Fish feed aggressively.',
      kimNote: 'Best muskie fishing of the year. Bring heavy tackle and be patient - it\'s the fish of 10,000 casts.',
    },
    {
      period: 'Winter (December-February)',
      targetSpecies: ['Walleye', 'Crappie'],
      techniques: 'Slow vertical jigging in deep water 40+ feet. Walleye on deep ledges near dam. Crappie suspend near submerged structure. Use live bait and fish slow.',
      conditions: 'Water temps 38-45°F. Clear visibility. Fish metabolisms slow - work baits slowly.',
      kimNote: 'Bundle up - it\'s cold but walleye bite is worth it. Night fishing allowed year-round.',
    },
  ],

  // Regulations & Safety
  regulations: [
    {
      category: 'Fishing License',
      details: 'West Virginia fishing license required for all anglers 15 and older. Available at WV Wild Outdoors. Trout stamps not required (no trout stocking).',
      important: true,
    },
    {
      category: 'Walleye Special Regulations',
      details: 'All walleye from 20 to 30 inches long must be returned immediately to the water. Daily creel limit: 8 walleye, only one may be over 30 inches.',
      link: 'https://www.wvdnr.gov/fishing/fishing-regulations/',
      important: true,
    },
    {
      category: 'Muskie Regulations',
      details: 'Minimum size limit 30 inches. Daily limit 1 fish. Use heavy tackle - these fish regularly run 40+ inches.',
      important: true,
    },
    {
      category: 'Boating Safety',
      details: 'Life jackets required for all persons on vessels. Children 12 and under must wear PFD at all times while underway. Navigation lights required after dark.',
      important: true,
    },
    {
      category: 'Cliff Jumping Prohibited',
      details: 'Jumping from the surrounding sandstone cliffs is prohibited due to past accidents. Use designated swimming areas only. Long Point pyramid rock is permitted jumping location.',
      important: true,
    },
    {
      category: 'Hunting Regulations',
      details: 'WV hunting license required. Deer, turkey, and bear stamps as applicable. Bear Damage Stamp required for bear hunting. Blaze orange required during deer firearms season. Check WV DNR for current season dates.',
      link: 'https://www.wvdnr.gov/hunting/hunting-regulations/',
      important: true,
    },
    {
      category: 'Camping Regulations',
      details: 'Developed campgrounds have specific rules and fees. Dispersed camping may be allowed on WMA land - check current regulations. Pack out all trash. No pets at Battle Run Campground.',
    },
    {
      category: 'Scuba Diving Safety',
      details: 'Certification required. Use dive flags when in the water. Check with Sarge\'s Dive Shop for site conditions and safety briefings. Summer water temps 68-80°F.',
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Light line (6-8 lb test for clear water)', optional: false },
    { name: 'Tube jigs and soft plastics', optional: false },
    { name: 'Drop shot rigs', optional: false },
    { name: 'Muskie tackle (heavy for 40"+ fish)', optional: true },
    { name: 'Hunting license + deer/turkey/bear stamps', optional: true },
    { name: 'Blaze orange (deer season)', optional: true },
    { name: 'Sunscreen and towels', optional: false },
    { name: 'Life jackets (required for all ages)', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Navigation lights (if boating after dark)', optional: true },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, line, and tackle for clear water',
      href: '/shop/fishing',
    },
    {
      name: 'Hunting Supplies',
      description: 'Licenses, ammo, and game processing',
      href: '/shop/hunting',
    },
    {
      name: 'Camping Gear',
      description: 'Tents, coolers, and camp supplies',
      href: '/shop/camping',
    },
  ],

  // Optional Fields
  difficulty: 'moderate', // For lake access and terrain
  bestSeason: 'summer', // Peak fishing and activities
  coordinates: {
    lat: 38.2217,
    lng: -80.9097,
  },
};
