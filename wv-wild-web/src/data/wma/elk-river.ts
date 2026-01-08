/**
 * Elk River WMA Data
 * SPEC-22: Elk River Migration to Dynamic Routes
 *
 * Extracted from: Research dossier with 70+ verified sources
 * Purpose: Centralize Elk River WMA data for WMATemplate component
 *
 * Data includes:
 * - Quick stats (acreage, drive time, county, access type)
 * - Hunting species (deer, turkey, bear, grouse, small game)
 * - Hunting areas (Elk River Section, Holly River Section, Interior)
 * - Facilities (shooting ranges, parking, restrooms, Class Q)
 * - Seasonal hunting guide
 * - Regulations and requirements
 * - Gear checklist
 * - Related shop categories
 */

import type { WMATemplateProps } from '../../types/wma';

/**
 * Complete WMA data for Elk River WMA
 * Ready to spread into WMATemplate component
 */
export const elkRiverWMAData: WMATemplateProps = {
  // Basic Info
  name: 'Elk River Wildlife Management Area',
  image: '/images/adventures/elk-river-wma-hero.webp',
  imageAlt: 'Elk River Wildlife Management Area mature hardwood forest and rolling ridges in Braxton County',
  tagline: '18,396 acres of central WV hunting - deer, turkey, bear, grouse, and small game.',
  description:
    "Elk River Wildlife Management Area spans nearly 19,000 acres of mature hardwood forest in the heart of Braxton County. Steep hills, ridges, and benches dominated by oak-hickory forest with old-growth timber interspersed throughout. Two major rivers - the Elk and Holly - flow through, with Sutton Lake at the heart. One of West Virginia's oldest and most accessible WMAs. About an hour from WV Wild Outdoors.",

  // Quick Stats (Hero Section)
  stats: [
    { value: '18,396', label: 'Acres', icon: 'area' as const },
    { value: '60 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: 'Class Q', label: 'Accessible', icon: 'check' as const },
  ],

  // WMA Metadata
  acreage: 18396,
  county: 'Braxton County',
  driveTime: '60 min',
  accessType: 'Year-Round',
  quickHighlights: [
    'Public Land Hunting',
    'Class Q Accessible',
    '30+ Miles of Trails',
    '2 Shooting Ranges',
    'Sutton Lake Access',
  ],

  // Hunting Species (What to Hunt)
  // SEASON DATES: Based on 2024-2025 WVDNR hunting regulations.
  // Update annually from https://wvdnr.gov/hunting/hunting-regulations/
  species: [
    {
      name: 'White-tailed Deer',
      season: 'Archery: Sept 27 - Dec 31 | Buck Firearms: Nov 24 - Dec 7 | Muzzleloader: Dec 15-21',
      notes:
        'Abundant population in mature hardwood forest. Hunt ridge tops overlooking old fields and stream bottoms. Bucks bed in thick young growth during rifle season. Peak rut activity mid-November.',
      bagLimit: '1 antlered buck per year; must have minimum 14-inch outside antler spread',
    },
    {
      name: 'Wild Turkey',
      season: 'Spring: April 20 - May 24 | Fall: Oct 11-19 statewide',
      notes:
        'Holly River and Elk River bottomlands hold roosting birds. Ridge tops make excellent strutting zones. Position on the same contour elevation and call aggressively. Dawn sound-off around 6:15 AM.',
      bagLimit: 'Spring: 2 bearded',
    },
    {
      name: 'Black Bear',
      season: 'Archery: Sept 27 - Dec 31 | Firearms: Sept-Oct (check county dates)',
      notes:
        'Common and expanding population. Requires Class BG and Class DS stamps. Check current season dates with WVDNR District 3. Maintain 100+ yards distance from any bear.',
      bagLimit: 'Check current WVDNR regulations',
    },
    {
      name: 'Ruffed Grouse',
      season: 'October 18 - February 28',
      notes:
        'Target regenerating timber cuts 5-15 years old with dense stems. Trail edges with young growth are productive. Population declining statewide but huntable here.',
      bagLimit: 'Daily limit: 4',
    },
    {
      name: 'Gray Squirrel',
      season: 'September 10 - February 28',
      notes:
        'Oak-hickory ridges with good mast production. Youth season Sept 6-7 gets kids into the woods early. October mornings on the ridge tops are prime time.',
      bagLimit: 'Daily limit: 6',
    },
    {
      name: 'Eastern Cottontail',
      season: 'November 2 - February 28',
      notes:
        'Field edges and briar patches throughout the WMA. Good for training young dogs. Thick cover in regeneration areas.',
      bagLimit: 'Daily limit: 5',
    },
    {
      name: 'Raccoon',
      season: 'October 15 - February 28',
      notes:
        'Night hunting with hounds popular in forested terrain. Forested ridges and bottomlands along both rivers.',
      bagLimit: 'Daily limit: 4',
    },
  ],

  // Hunting Areas (Where to Hunt)
  huntingAreas: [
    {
      name: 'Elk River Section (Primary)',
      access: 'From I-79 Exit 67 (Flatwoods), WV Route 19/40 south, turn onto Route 15',
      terrain: 'Mature hardwood ridges, river bottomlands, steep hills',
      targetSpecies: [
        'Deer (ridge tops, stream bottoms)',
        'Turkey (bottomland roosts)',
        'Bear (oak-hickory forests)',
        'Squirrel (mast-producing ridges)',
      ],
      notes:
        'Primary access point for most hunters. Multiple WVDNR parking areas. Bee Run Day Use Area provides good staging. Vault toilets available.',
      coordinates: { lat: 38.6297, lng: -80.5658 },
    },
    {
      name: 'Holly River Section',
      access: 'From I-79 Exit 67 (Flatwoods), WV Route 4/19 south to Route 15 east',
      terrain: 'Stream corridors, young regeneration, mixed hardwoods',
      targetSpecies: [
        'Grouse (regeneration areas)',
        'Turkey (stream corridor roosts)',
        'Deer (saddles and travel corridors)',
        'Small game',
      ],
      notes: 'Less pressure than Elk River section. Stream access for wading and fishing. WVDNR parking pull-offs.',
    },
    {
      name: 'Interior Ridges and Hollows',
      access: '30+ miles of trails from multiple parking areas',
      terrain: '1,000-3,400 ft elevation, steep ridge/valley terrain, old-growth interspersed',
      targetSpecies: [
        'Deer (saddles and travel corridors)',
        'Turkey (ridge roosting)',
        'Grouse (thick edges)',
        'Bear (remote areas)',
      ],
      notes:
        'No cell coverage in most areas. Download offline maps before heading out. Class Q vehicle access available for qualifying disabled hunters.',
    },
  ],

  // Facilities
  facilities: [
    {
      type: 'Shooting Ranges',
      count: 2,
      description:
        '100-yard and 175-yard ranges available for sighting in. One of 14 WV WMAs with expanded vehicle access for disabled hunters.',
    },
    {
      type: 'Parking Areas',
      description:
        'Multiple WVDNR parking lots throughout WMA. Bee Run Day Use Area, Baker\'s Run, Gerald R. Freeman, South Abutment - all with ample parking.',
    },
    {
      type: 'Restrooms',
      description: 'Vault toilets at Bee Run and other developed access points. No facilities on backcountry trails.',
      accessibility: 'Accessible facilities at major access points',
    },
    {
      type: 'Class Q Access',
      description:
        'One of 14 WV WMAs with expanded vehicle access for disabled hunters. Apply through WVDNR District 3 Office.',
      contact: '(304) 924-6211',
    },
    {
      type: 'Camping',
      description:
        'Camping NOT permitted on WMA lands. Nearby options: Sutton Lake campgrounds (U.S. Army Corps), Holly River State Park, Watoga State Park.',
    },
  ],

  // Access Points with GPS
  accessPoints: [
    {
      name: 'Bee Run Day Use Area',
      coordinates: { lat: 38.6297, lng: -80.5658 },
      features: [
        'Ample parking',
        'Vault toilets',
        'Picnic areas',
        'Boat ramp access to Sutton Lake',
        'Handicapped-accessible facilities',
      ],
    },
    {
      name: 'Holly River Access',
      features: [
        'WVDNR parking pull-offs',
        'Stream access for hiking and fishing',
        'Trail network entry',
      ],
    },
    {
      name: 'Gerald R. Freeman Campground Area',
      coordinates: { lat: 38.84, lng: -80.62 },
      features: [
        'Marina access',
        'Boat ramp',
        'Nearby camping (USACE)',
        'Phone: (304) 765-2120',
      ],
    },
  ],

  // Seasonal Hunting Guide
  seasonalGuide: [
    {
      season: 'Fall',
      target: 'Deer (archery, firearms), Bear, Grouse, Squirrel',
      tips: 'Peak rut mid-November. Hunt ridges overlooking old fields. Acorn drop critical for deer and bear movement. SW-W winds prevail. Expect other hunters during peak weekends.',
    },
    {
      season: 'Spring',
      target: 'Turkey (gobblers)',
      tips: 'Set up near Holly River or Elk River bottomlands before dawn. Gobblers roost in big timber along water. Listen for 6:15 AM sound-off. Position on same contour and call aggressively.',
    },
    {
      season: 'Winter',
      target: 'Late deer, Small game, Rabbit, Raccoon',
      tips: 'Less pressure, quieter woods. Hunt thick cover. January-February excellent for grouse in regeneration areas. Cold but productive for those willing to get out.',
    },
  ],

  // Regulations
  regulations: [
    {
      category: 'Hunting License',
      details:
        'WV hunting license required. Class BG stamp for deer/turkey/bear. Bear Damage Stamp required for bear hunting. Hunter education certificate required for first-time purchasers.',
      link: 'https://wvdnr.gov/hunting/hunting-regulations/',
      important: true,
    },
    {
      category: 'Electronic Game Check',
      details:
        'Required within 24 hours via WVhunt.com or 1-844-WVCHECK. Cell service spotty on WMA - check in when you reach town.',
      link: 'https://wvhunt.com',
      important: true,
    },
    {
      category: 'Bag Limits',
      details:
        'One antlered buck per year with minimum 14-inch outside antler spread requirement. Antler spread measured from outside edge to outside edge.',
      important: true,
    },
    {
      category: 'Blaze Orange',
      details:
        '400+ square inches during firearms deer season. Required for safety - mature forest limits visibility.',
      important: true,
    },
    {
      category: 'Sunday Hunting',
      details: 'No hunting on Sunday in West Virginia (state law).',
      important: true,
    },
    {
      category: 'Ginseng Harvesting',
      details:
        'ILLEGAL to harvest ginseng on WMA lands. Penalty: $500-$2,000 and criminal charges. Private land only with landowner permission during Sept 1 - Nov 30 season.',
      important: true,
    },
    {
      category: 'Tree Stands',
      details:
        'Portable stands only - must be non-bark penetrating and removed after each hunt.',
      important: false,
    },
    {
      category: 'Firearms Safety',
      details: 'Uncased firearms prohibited except during open hunting season. Firearms must be unloaded in vehicles. Never shoot across public roads.',
      important: true,
    },
    {
      category: 'ATVs',
      details: 'No ATVs except where posted or Class Q access approved.',
      important: false,
    },
    {
      category: 'Drones',
      details: 'Drones prohibited for hunting or wildlife harassment. Limited exception for licensed thermal drone recovery of wounded deer (requires state outfitter license + FAA Part 107).',
      important: false,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV hunting license', optional: false },
    { name: 'Class BG stamp (big game)', optional: false },
    { name: 'Hunter education certificate', optional: false },
    { name: 'Blaze orange (400+ sq inches firearms season)', optional: false },
    { name: 'GPS/offline maps (no cell service)', optional: false },
    { name: 'Compass and paper map (backup)', optional: false },
    { name: 'Water (2+ liters)', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Insect repellent (DEET 20%+ for ticks)', optional: false },
    { name: 'Turkey calls (spring)', optional: true },
    { name: 'Portable tree stand', optional: true },
    { name: 'Grunt call / rattling antlers (rut)', optional: true },
    { name: 'Rain gear', optional: false },
    { name: 'Binoculars', optional: true },
    { name: 'Headlamp or flashlight', optional: false },
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
    lat: 38.6297,
    lng: -80.5658,
  },
  mapUrl: 'https://wvdnr.gov/wmamapproj/pdf/pdf150/ElkRiverFinal11x17_150dpi.pdf',
  regulationsUrl: 'https://wvdnr.gov/hunting/hunting-regulations/',

  // Kim's Take
  kimsTake: "One of the most accessible WMAs in our area - good trail network, Class Q access, and Sutton Lake right there for camping. Just remember: no camping on WMA land itself, but the Corps campgrounds at Sutton Lake are first-rate. And please - no ginseng hunting here. It's illegal on public land.",
};
