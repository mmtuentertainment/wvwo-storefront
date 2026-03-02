/**
 * Stonewall Jackson Lake WMA Data
 * SPEC: WMA Template Data Extraction
 *
 * Research Source: AGENT-05-WMA-HUNTING.md
 * Purpose: Centralize Stonewall Jackson WMA data for WMATemplate component
 *
 * Data includes:
 * - Quick stats (acreage, drive time, county, access type)
 * - Hunting species (deer, turkey, waterfowl, bear, grouse)
 * - Facilities (shooting range, parking, nearby campgrounds)
 * - Seasonal hunting guide
 * - Regulations and requirements
 * - Gear checklist
 * - Related shop categories
 */

import type { WMATemplateProps } from '../../types/wma';

/**
 * Complete WMA data for Stonewall Jackson Lake WMA
 * Ready to spread into WMATemplate component
 */
export const stonewallJacksonWMAData: WMATemplateProps = {
  // Basic Info
  name: 'Stonewall Jackson Lake WMA',
  image: '/images/adventures/stonewall-jackson-wma-hero.webp',
  imageAlt: 'Stonewall Jackson Lake WMA shoreline and mature forest in Clay County',
  tagline: '18,289 acres of central WV hunting - deer, turkey, bear, grouse, and waterfowl.',
  description:
    "Stonewall Jackson Lake Wildlife Management Area surrounds a major USACE lake in Clay County with extensive public hunting opportunities. Mature hardwood forest, lakeside habitat, and forest edges that hold deer, turkeys, bears, and waterfowl year-round. Class-Q hunting designation provides expanded access. Nearby Stonewall Resort State Park offers lodging and camping alternatives.",

  // Quick Stats (Hero Section)
  stats: [
    { value: '18,289', label: 'Acres', icon: 'area' as const },
    { value: '~45 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Clay Co.', label: 'Location', icon: 'location' as const },
    { value: 'Class Q', label: 'Accessible', icon: 'check' as const },
  ],

  // WMA Metadata
  acreage: 18289,
  county: 'Clay County',
  driveTime: '~45 min',
  accessType: 'Year-Round',
  quickHighlights: [
    'Public Land Hunting',
    'Class Q Accessible',
    '2,650-acre Lake',
    '300-yard Rifle Range',
  ],

  // Hunting Species (What to Hunt)
  species: [
    {
      name: 'White-tailed Deer',
      season: 'Archery: Sept 27 - Dec 31 | Buck Firearms: Nov 24 - Dec 7 | Muzzleloader: Dec 15-21',
      notes:
        'Primary game species. Hunt the ridges overlooking lake edges and forest openings. Lake shoreline habitat creates productive edges.',
      bagLimit: '1 antlered buck per year; must have minimum 14-inch outside antler spread',
    },
    {
      name: 'Wild Turkey',
      season: 'Spring: April 20 - May 24 | Fall: Oct 11-19',
      notes:
        'Lake bottomlands hold roosting birds. Position yourself on the same elevation contour and call aggressively across the drainage.',
      bagLimit: 'Spring: 2 bearded birds',
    },
    {
      name: 'Black Bear',
      season: 'Fall (check county dates)',
      notes:
        'Present in the area and expanding population. Mast production in oak-hickory forest. Requires Class BG and Bear Damage stamps.',
      bagLimit: 'Varies by season',
    },
    {
      name: 'Waterfowl',
      season: 'Check WV DNR duck and geese seasons',
      notes:
        '2,650-acre lake provides excellent waterfowl habitat. Multiple put-ins available through USACE facilities.',
      bagLimit: 'Follow state daily limits',
    },
    {
      name: 'Ruffed Grouse',
      season: 'October 18 - February 28',
      notes:
        'Regenerating timber cuts and dense young growth. Population declining statewide but huntable here.',
      bagLimit: 'Daily limit: 4',
    },
  ],

  // Hunting Areas (Where to Hunt)
  huntingAreas: [
    {
      name: 'Lakeside Forest (Northern Shoreline)',
      access: 'I-79 Exit 67, Route 19 North',
      terrain: 'Mature forest, forest edges, lake shoreline habitat',
      targetSpecies: [
        'Turkey (lakeside roosts)',
        'Deer (forest edges)',
        'Waterfowl',
      ],
      notes:
        '82 miles of shoreline provide extensive hunting opportunities. Edge habitat between forest and water holds both deer and turkey.',
      coordinates: { lat: 38.45, lng: -80.92 },
    },
    {
      name: 'Interior Forest',
      access: 'Multiple parking areas and trail access points',
      terrain: 'Oak-hickory forest, ridges, benches',
      targetSpecies: [
        'Deer (ridges)',
        'Grouse (dense growth)',
        'Squirrel (mast areas)',
      ],
      notes: 'Older growth timber interspersed throughout. Good trail network for exploring interior areas.',
    },
    {
      name: 'Lake Outlet and Watershed Areas',
      access: 'USACE boat ramps and parking areas',
      terrain: 'Drainage areas, forest corridors, water access',
      targetSpecies: [
        'Bear (mast production)',
        'Waterfowl (water access)',
        'Deer (travel corridors)',
      ],
      notes: '102 square miles of watershed habitat feeds the lake. Excellent for bear and waterfowl.',
    },
  ],

  // Facilities
  facilities: [
    {
      type: 'Rifle Range',
      count: 1,
      description:
        '300-yard rifle range within the WMA for sighting-in rifles and target practice. Verify hours and any fees with WV DNR District 3.',
      contact: '(304) 924-6211',
    },
    {
      type: 'Parking Areas',
      description:
        'Multiple parking lots at lake access points and trail trailheads throughout the WMA.',
    },
    {
      type: 'Stonewall Resort State Park',
      description:
        'Adjacent state park offers lodging, camping, dining, and recreational facilities. NO CAMPING allowed in the WMA itself - use resort or nearby USACE facilities.',
      link: 'https://www.stonewallresort.com/',
      contact: '(888) 4STONEWALL',
    },
    {
      type: 'USACE Lake Facilities',
      description:
        'Boat ramps, day-use areas, and parking managed by US Army Corps of Engineers. Check recreation.gov for detailed facility information.',
      link: 'https://www.recreation.gov/camping/campgrounds',
    },
    {
      type: 'Class Q Access',
      description:
        'One of 14 WV WMAs with expanded vehicle access for disabled hunters. Apply through District 3 Office.',
      contact: '(304) 924-6211',
    },
  ],

  // Access Points with GPS
  accessPoints: [
    {
      name: 'Main WMA Parking Area',
      coordinates: { lat: 38.45, lng: -80.92 },
      features: [
        'Primary parking for northern shoreline access',
        'Trail system access',
        'Restroom facilities',
        'Near rifle range',
      ],
    },
    {
      name: 'Lake Outlet Access',
      coordinates: { lat: 38.40, lng: -80.90 },
      features: [
        'USACE boat ramp',
        'Day-use parking',
        'Waterfowl access',
        'Fishing pier',
      ],
    },
    {
      name: 'Stonewall Resort State Park',
      features: [
        'Full resort amenities',
        'Camping and lodging',
        'Dining facilities',
        'Marina and boat rentals',
        'Swimming and water sports',
      ],
    },
  ],

  // Seasonal Hunting Guide
  seasonalGuide: [
    {
      season: 'Fall',
      target: 'Deer (archery, firearms), Grouse, Waterfowl',
      tips: 'Peak rut Nov 10-18. Hunt forest edges overlooking open water and clearings. Waterfowl migrate through in late fall.',
    },
    {
      season: 'Spring',
      target: 'Turkey (gobblers), Waterfowl migration',
      tips: 'Set up near lakeside bottomlands before dawn. Gobblers roost in big timber near water. Listen for 6:15 AM sound-off.',
    },
    {
      season: 'Winter',
      target: 'Late deer, Small game, Rabbit',
      tips: 'Less pressure. Hunt thick cover away from frozen lake. January-February best for grouse. Waterfowl concentrate at open water.',
    },
  ],

  // Regulations
  regulations: [
    {
      category: 'Hunting License',
      details:
        'WV hunting license required. Class BG stamp for deer/turkey/bear. Bear Damage Stamp required for bear hunting.',
      link: 'https://wvdnr.gov/hunting/hunting-regulations/',
      important: true,
    },
    {
      category: 'Electronic Game Check',
      details:
        'Required within 24 hours via WVhunt.com or 1-844-WVCHECK. Cell service at resort areas.',
      link: 'https://wvhunt.com',
      important: true,
    },
    {
      category: 'Blaze Orange',
      details:
        '400+ square inches during firearms deer season. Required for safety.',
      important: true,
    },
    {
      category: 'No Camping in WMA',
      details:
        'Camping is prohibited in the WMA. Use Stonewall Resort State Park, nearby USACE campgrounds, or Briar Point Campground for overnight trips.',
      important: true,
    },
    {
      category: 'Rifle Range',
      details: 'Sighting-in allowed at the 300-yard rifle range. No target shooting on WMA land.',
      important: false,
    },
    {
      category: 'Tree Stands',
      details:
        'Portable stands only - must be non-bark penetrating and removed after each hunt.',
      important: false,
    },
    {
      category: 'ATVs',
      details: 'No ATVs except where posted or Class Q access approved.',
      important: false,
    },
    {
      category: 'USACE Safety Zones',
      details:
        'Respect USACE property restrictions and safety zones around dam, spillway, and developed facilities.',
      important: true,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV hunting license', optional: false },
    { name: 'Class BG stamp (big game)', optional: false },
    { name: 'Bear Damage stamp (if bear hunting)', optional: true },
    { name: 'Blaze orange (400+ sq inches firearms season)', optional: false },
    { name: 'Rifle range sighting-in appointment', optional: false },
    { name: 'GPS/offline maps (lake area cell service varies)', optional: false },
    { name: 'Water and snacks', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Binoculars', optional: true },
    { name: 'Turkey calls (spring)', optional: true },
    { name: 'Portable tree stand', optional: true },
    { name: 'Flotation device (waterfowl hunting)', optional: true },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Hunting Licenses & Stamps',
      description: 'Get your license and required stamps before you head out',
      href: '/shop/licenses',
    },
    {
      name: 'Ammunition',
      description: 'Rifle, shotgun, and muzzleloader ammo in stock',
      href: '/shop/ammo',
    },
    {
      name: 'Hunting Gear',
      description: 'Stands, blinds, calls, and camo',
      href: '/shop/hunting',
    },
  ],

  // Optional Fields
  difficulty: 'moderate',
  bestSeason: 'fall',
  coordinates: {
    lat: 38.45,
    lng: -80.92,
  },
  mapUrl: 'https://www.mapwv.gov/huntfish/map/?v=hunt',
  regulationsUrl: 'https://wvdnr.gov/hunting/hunting-regulations/',

  // Cross-Links to Related Destinations
  nearbyLake: 'stonewall-jackson',
  nearbyCampgrounds: ['briar-point'],
  nearbyStateParks: ['stonewall-resort'],

  // Kim's Take
  kimsTake: "Class-Q hunting for deer and turkey - rifle range for practice shots before the season starts. Remember: no camping in the WMA itself, but Stonewall Resort is right there with everything you need. One of the better-developed WMAs with all that lake shoreline - bring a boat if you've got one for waterfowl.",
};
