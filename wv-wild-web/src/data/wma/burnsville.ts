/**
 * Burnsville Lake WMA Data
 * SPEC: WMA Template Data Extraction
 *
 * Extracted from: wv-wild-web/src/content/adventures/burnsville-lake-wma.md
 * Purpose: Centralize Burnsville Lake WMA data for WMATemplate component
 *
 * Data includes:
 * - Quick stats (acreage, drive time, county, access type)
 * - Hunting species (deer, turkey, grouse, small game)
 * - Hunting areas (Bulltown, Riffle Run, Interior)
 * - Facilities (campgrounds, parking, restrooms, Class Q)
 * - Seasonal hunting guide
 * - Regulations and requirements
 * - Gear checklist
 * - Related shop categories
 */

import type { WMATemplateProps } from '../../types/wma';

/**
 * Complete WMA data for Burnsville Lake WMA
 * Ready to spread into WMATemplate component
 */
export const burnsvilleLakeWMAData: WMATemplateProps = {
  // Basic Info
  name: 'Burnsville Lake WMA',
  image: '/images/adventures/burnsville-lake-wma-hero.webp',
  imageAlt: 'Burnsville Lake WMA rolling hills and mixed hardwood forest in Braxton County',
  tagline: '12,579 acres of central WV hunting - deer, turkey, grouse, and small game.',
  description:
    "Burnsville Lake Wildlife Management Area wraps around a 968-acre Corps of Engineers lake in the heart of Braxton County. Old farm fields growing into young forest, mature hardwood ridges, and Little Kanawha River bottomlands. The kind of terrain that holds deer, turkeys, grouse, and small game year-round. 25 minutes from WV Wild Outdoors.",

  // Quick Stats (Hero Section)
  stats: [
    { value: '12,579', label: 'Acres', icon: 'area' as const },
    { value: '25 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: 'Class Q', label: 'Accessible', icon: 'check' as const },
  ],

  // WMA Metadata
  acreage: 12579,
  county: 'Braxton County',
  driveTime: '25 min',
  accessType: 'Year-Round',
  quickHighlights: [
    'Public Land Hunting',
    'Class Q Accessible',
    '57+ Miles of Trails',
    '2 Campgrounds',
  ],

  // Hunting Species (What to Hunt)
  species: [
    {
      name: 'White-tailed Deer',
      season: 'Archery: Sept 27 - Dec 31 | Buck Firearms: Nov 24 - Dec 7 | Muzzleloader: Dec 15-21',
      notes:
        'One antlered buck per year with minimum 14-inch outside antler spread requirement. Old farm fields and early successional forest make prime habitat. Bucks bed in thick young growth during rifle season and move to field edges at dawn and dusk.',
      bagLimit: '1 antlered buck per year; must have minimum 14-inch outside antler spread',
    },
    {
      name: 'Wild Turkey',
      season: 'Spring: April 20 - May 24 | Fall: Oct 11-19 statewide; additional segments in selected counties',
      notes:
        'Little Kanawha bottomlands hold roosting birds. Ridge tops for strutting zones. Position on the same contour elevation and call aggressively to pull birds across the drainage.',
      bagLimit: 'Spring: 2 bearded',
    },
    {
      name: 'Ruffed Grouse',
      season: 'October 18 - February 28',
      notes:
        'Young forest equals grouse. Target regenerating timber cuts 5-15 years old with dense stems. Trail edges with young growth. Population declining statewide but huntable here.',
      bagLimit: 'Daily limit: 4',
    },
    {
      name: 'Eastern Cottontail',
      season: 'November 2 - February 28',
      notes:
        'Field edges and briar patches. Good for training young dogs. Thick cover throughout the WMA.',
      bagLimit: 'Daily limit: 5',
    },
    {
      name: 'Gray Squirrel',
      season: 'September 10 - February 28',
      notes:
        'Oak-hickory ridges with mast production. Youth season Sept 6-7 gets kids into the woods early. October mornings on the ridge tops are prime.',
      bagLimit: 'Daily limit: 6',
    },
    {
      name: 'Black Bear',
      season: 'Fall (check county dates)',
      notes:
        'Present but uncommon in this WMA. Requires Class BG and Class DS stamps. Check current season dates with WVDNR.',
    },
    {
      name: 'Raccoon',
      season: 'October 15 - February 28',
      notes:
        'Night hunting with hounds popular in forested terrain. Forested ridges and bottomlands.',
      bagLimit: 'Daily limit: 4',
    },
  ],

  // Hunting Areas (Where to Hunt)
  huntingAreas: [
    {
      name: 'Bulltown Area (Upstream/North)',
      access: 'I-79 Exit 67, Route 19 North 13 miles',
      terrain: 'Old farm fields, bottomlands, Civil War battlefield',
      targetSpecies: [
        'Turkey (bottomland roosts)',
        'Deer (field edges)',
        'Small game',
      ],
      notes:
        'Confederate Overlook access point. Bulltown Historic Area nearby. Gentler terrain - good for hunters of any ability level.',
      coordinates: { lat: 38.84543, lng: -80.61734 },
    },
    {
      name: 'Riffle Run Area (Downstream/Dam)',
      access: 'I-79 Exit 79, Old Route 5 East 3 miles',
      terrain: 'Steep ridges, mature hardwoods, river corridor',
      targetSpecies: [
        'Deer (ridge tops)',
        'Grouse (regeneration areas)',
        'Squirrel (oak flats)',
      ],
      notes: 'Closer to dam. Steeper terrain. 60-site campground nearby.',
      coordinates: { lat: 38.8373, lng: -80.6175 },
    },
    {
      name: 'Interior Ridges and Hollows',
      access: '57+ miles of trails from multiple parking areas',
      terrain: '1,600 ft elevation change, oak-hickory forest, young regeneration',
      targetSpecies: [
        'Deer (saddles and travel corridors)',
        'Turkey (ridge roosting)',
        'Grouse (thick edges)',
      ],
      notes:
        'No cell coverage. Download offline maps. Class Q vehicle access available for qualifying disabled hunters.',
    },
  ],

  // Facilities
  facilities: [
    {
      type: 'Bulltown Campground',
      count: 204,
      description:
        '204 sites (134 full hookup with water/electric/sewer, 70 electric-only). 30/50 amp service. Showers, dump station, boat ramp, playground. Waterfront sites have boat mooring posts. Adjacent to Bulltown Historic Area (Civil War battlefield). Season: April-November. Fees: $20-40/night.',
      link: 'https://www.recreation.gov/camping/campgrounds/233443',
      contact: '1-877-444-6777',
    },
    {
      type: 'Riffle Run Campground',
      count: 60,
      description:
        '60 sites (54 full hookup, 6 primitive tent sites). Near dam side of lake. Restrooms, dump station, boat ramp nearby. ADA-accessible fishing pier. Lower prices than Bulltown. Season: April-November. Fees: $12-28/night (primitive $12, full hookup $28).',
      link: 'https://www.recreation.gov/camping/campgrounds/10234906',
      contact: '1-877-444-6777',
    },
    {
      type: 'Parking Areas',
      description:
        'Multiple lots at Bulltown, Riffle Run, Confederate Overlook, dam area, and trail access points.',
    },
    {
      type: 'Restrooms',
      description: 'At campgrounds and day-use areas. Accessible facilities available.',
      accessibility: 'ADA compliant restrooms at main facilities',
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
      name: 'Bulltown Campground',
      coordinates: { lat: 38.84543, lng: -80.61734 },
      features: [
        '204 campsites (134 full hookup, 70 electric)',
        '30/50 amp service available',
        'Boat ramp with mooring posts',
        'Showers, restrooms, dump station',
        'Playground in each loop',
        'Adjacent to Bulltown Historic Area',
        'Swimming beach 1 mile away',
      ],
    },
    {
      name: 'Riffle Run Campground',
      coordinates: { lat: 38.8373, lng: -80.6175 },
      features: [
        '60 sites (54 full hookup, 6 primitive)',
        'Lower fees ($12-28/night)',
        'Boat ramp nearby',
        'ADA-accessible fishing pier',
        'Near dam and tailwater access',
      ],
    },
    {
      name: 'Confederate Overlook',
      features: ['Parking', 'Historic markers', 'Trail access to uplands'],
    },
  ],

  // Seasonal Hunting Guide
  seasonalGuide: [
    {
      season: 'Fall',
      target: 'Deer (archery, firearms), Grouse, Squirrel',
      tips: 'Peak rut Nov 10-18. Hunt ridges overlooking old fields. Fog clears from ridges 30-60 min before valleys. SW-W winds prevail.',
    },
    {
      season: 'Spring',
      target: 'Turkey (gobblers), Small game',
      tips: 'Set up near Little Kanawha bottomlands before dawn. Gobblers roost in big timber along water. Listen for 6:15 AM sound-off.',
    },
    {
      season: 'Winter',
      target: 'Late deer, Small game, Rabbit',
      tips: 'Less pressure. Hunt thick cover. January-February best for grouse. Cold but productive.',
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
        'Required within 24 hours via WVhunt.com or 1-844-WVCHECK. Bulltown Campground has WiFi.',
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
        '400+ square inches during firearms deer season. Required for safety.',
      important: true,
    },
    {
      category: 'Tree Stands',
      details:
        'Portable stands only - must be non-bark penetrating and removed after each hunt.',
      important: false,
    },
    {
      category: 'Target Shooting',
      details: 'No target shooting or sighting-in on WMA land. Sight in at home before you come.',
      important: false,
    },
    {
      category: 'ATVs',
      details: 'No ATVs except where posted or Class Q access approved.',
      important: false,
    },
    {
      category: 'Safety Zones',
      details:
        'Corps of Engineers 600-ft safety zones around dam, spillway, and developed facilities.',
      important: true,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV hunting license', optional: false },
    { name: 'Class BG stamp (big game)', optional: false },
    { name: 'Blaze orange (400+ sq inches firearms season)', optional: false },
    { name: 'Turkey calls (spring)', optional: true },
    { name: 'Portable tree stand', optional: true },
    { name: 'GPS/offline maps (no cell service)', optional: false },
    { name: 'Water and snacks', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Binoculars', optional: true },
    { name: 'Grunt call / rattling antlers (rut)', optional: true },
    { name: 'Paper map and compass (backup)', optional: true },
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
  difficulty: 'easy',
  bestSeason: 'fall',
  coordinates: {
    lat: 38.8348196,
    lng: -80.5789812,
  },
  mapUrl: 'https://wvdnr.gov/wmamapproj/pdf/pdf300/BurnsvilleLake11x17_300dpi.pdf',
  regulationsUrl: 'https://wvdnr.gov/hunting/hunting-regulations/',

};
