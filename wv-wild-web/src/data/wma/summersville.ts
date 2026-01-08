/**
 * Summersville Lake WMA Data
 * SPEC-23: Summersville Lake Migration to Dynamic Routes
 *
 * Extracted from: Research dossier with WVDNR and USACE verified sources
 * Purpose: Centralize Summersville Lake WMA data for WMATemplate component
 *
 * Data includes:
 * - Quick stats (acreage, drive time, county, access type)
 * - Hunting species (deer, turkey, grouse, small game, waterfowl)
 * - CRITICAL: NO BEAR HUNTING 2025 - Nicholas County removed from bear season
 * - Hunting areas (Battle Run, Salmon Run, Long Point, Damsite, Archery Trail)
 * - Facilities (boat ramps, parking, restrooms)
 * - Seasonal hunting guide
 * - Regulations and requirements
 * - Gear checklist
 * - Related shop categories
 */

import type { WMATemplateProps } from '../../types/wma';

/**
 * Complete WMA data for Summersville Lake WMA
 * Ready to spread into WMATemplate component
 */
export const summersvilleLakeWMAData: WMATemplateProps = {
  // Basic Info
  name: 'Summersville Lake Wildlife Management Area',
  image: '/images/adventures/summersville-lake-wma-hero.webp',
  imageAlt: 'Summersville Lake Wildlife Management Area with oak-hickory forests and dramatic rock cliffs in Nicholas County',
  tagline: "5,982 acres surrounding West Virginia's largest lake - deer, turkey, grouse, waterfowl, and small game.",
  description:
    "Summersville Lake Wildlife Management Area encompasses nearly 6,000 acres of public hunting land surrounding West Virginia's largest lake. The terrain ranges from forested rolling hills to dramatic vertical rock cliffs, dominated by oak-hickory forests with mixed hardwood coverage. Located just three miles south of Summersville on U.S. Route 19. Owned by the U.S. Army Corps of Engineers and leased to WV DNR for wildlife management. About 30 minutes from WV Wild Outdoors.",

  // Quick Stats (Hero Section)
  stats: [
    { value: '5,982', label: 'Acres', icon: 'area' as const },
    { value: '30 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Nicholas Co.', label: 'Location', icon: 'location' as const },
    { value: 'Year-Round', label: 'Access', icon: 'check' as const },
  ],

  // WMA Metadata
  acreage: 5982,
  county: 'Nicholas County',
  driveTime: '30 min',
  accessType: 'Year-Round',
  quickHighlights: [
    'Public Land Hunting',
    'Lake Access (2,790 acres)',
    'Waterfowl Hunting',
    'Archery Trail (Reopened July 2024)',
    'Multiple Boat Ramps',
  ],

  // Hunting Species (What to Hunt)
  // SEASON DATES: Based on 2025-2026 WVDNR hunting regulations.
  // Update annually from https://wvdnr.gov/hunting/hunting-regulations/
  species: [
    {
      name: 'White-tailed Deer',
      season: 'Archery: Sept 27 - Dec 31 | Buck Firearms: Nov 24 - Dec 7 | Muzzleloader: Dec 15-21',
      notes:
        'Abundant population in oak-hickory forests. Nicholas County is open to antlerless deer for both base license and Class N/NN stamps. Hunt ridge tops and transition zones between forest and lake clearings. Peak rut activity mid-November. Mountaineer Heritage Season Jan 8-11 for traditional weapons.',
      bagLimit: 'Nicholas County: Antlerless open (base license + Class N/NN stamps)',
    },
    {
      name: 'Wild Turkey',
      season: 'Spring: April 20 - May 24 | Fall: Oct 11-19',
      notes:
        'Mixed hardwood ridges hold excellent turkey populations. Spring gobblers respond well to calls in the oak-hickory timber. Fall hunting focuses on breaking up flocks and calling scattered birds back.',
      bagLimit: 'Spring: 2 bearded turkeys',
    },
    {
      name: 'Black Bear',
      season: 'NOT AVAILABLE 2025',
      notes:
        'CRITICAL: Nicholas County was REMOVED from the 2025 bear hunting season. NO bear hunting is permitted on Summersville Lake WMA in 2025. Check WVDNR for future season updates.',
      bagLimit: 'N/A - Not available in Nicholas County 2025',
    },
    {
      name: 'Ruffed Grouse',
      season: 'October 18 - February 28',
      notes:
        'Hunt regenerating timber and edge habitat. Population present but declining statewide. Focus on thick cover along ridges and old logging roads.',
      bagLimit: 'Daily limit: 4',
    },
    {
      name: 'Squirrel (Gray, Black, Fox)',
      season: 'September 13 - February 28',
      notes:
        'Oak-hickory forests provide excellent squirrel habitat when mast production is good. Morning hunts on ridge tops are most productive. Youth season available early September.',
      bagLimit: 'Daily limit: 6',
    },
    {
      name: 'Eastern Cottontail',
      season: 'November 1 - February 28',
      notes:
        'Field edges, briar patches, and regenerating clearcuts. Good population in transition zones between forest and open areas.',
      bagLimit: 'Daily limit: 5',
    },
    {
      name: 'Snowshoe Hare',
      season: 'November 1 - February 28',
      notes:
        'Present in higher elevation areas with dense cover. Less common than cottontail but huntable.',
      bagLimit: 'Daily limit: 2',
    },
    {
      name: 'Waterfowl (Duck/Geese)',
      season: 'Split: Oct 4-12 | Nov 8-16 | Dec 21-Jan 31',
      notes:
        'Summersville Lake and surrounding wetlands provide waterfowl hunting opportunities. Scout coves and creek mouths. Federal duck stamp required in addition to state license.',
      bagLimit: 'Check current federal migratory bird regulations',
    },
    {
      name: 'Mourning Dove',
      season: 'Split: Sept 1-Oct 12 | Nov 3-16 | Dec 8-Jan 10',
      notes:
        'Hunt field edges and power line clearings. Morning flights most productive. Bring plenty of shells.',
      bagLimit: 'Daily limit: 15',
    },
    {
      name: 'Woodcock',
      season: 'Split: Oct 18-Nov 22 | Dec 1-9',
      notes:
        'Moist bottomlands and alder thickets near streams. Hunt with pointing dogs for best results.',
      bagLimit: 'Daily limit: 3',
    },
    {
      name: 'Raccoon',
      season: 'October 15 - February 28',
      notes:
        'Night hunting with hounds popular. Wooded ridges and bottomlands along the lake provide excellent habitat.',
      bagLimit: 'No daily limit',
    },
    {
      name: 'Red/Gray Fox',
      season: 'November 1 - February 28',
      notes:
        'Present throughout the WMA. Can be hunted with hounds or called.',
      bagLimit: 'No daily limit',
    },
    {
      name: 'Bobcat',
      season: 'November 1 - February 28',
      notes:
        'Present in remote areas. Calling and trapping effective. Check current WVDNR regulations for specific requirements.',
      bagLimit: 'Statewide limit: 3',
    },
    {
      name: 'Coyote',
      season: 'Year-round (no closed season)',
      notes:
        'No closed season, no bag limit. Can be taken while hunting other species or targeted specifically.',
      bagLimit: 'No limit',
    },
  ],

  // Hunting Areas (Where to Hunt)
  huntingAreas: [
    {
      name: 'Battle Run Area',
      access: 'From US-19 south of Summersville, take Battle Run Road to boat ramp and parking',
      terrain: 'Mixed hardwood forest, lake shoreline, rolling terrain',
      targetSpecies: [
        'Deer (forest edges, travel corridors)',
        'Turkey (hardwood ridges)',
        'Waterfowl (lake coves)',
        'Squirrel (oak-hickory stands)',
      ],
      notes: 'Primary access point on the lake. Battle Run Campground nearby for extended stays. Good boat ramp access for waterfowl hunting.',
      coordinates: { lat: 38.2197, lng: -80.8792 },
    },
    {
      name: 'Salmon Run Area',
      access: 'Salmon Run Road off US-19, follow signs to lake access',
      terrain: 'Steep terrain, rock outcrops, mixed hardwoods',
      targetSpecies: [
        'Deer (ridge saddles)',
        'Turkey (roosting areas)',
        'Grouse (regenerating timber)',
      ],
      notes: 'More rugged terrain with less hunting pressure. Steep access requires good physical condition.',
    },
    {
      name: 'Long Point Area',
      access: 'Long Point Road to WMA access',
      terrain: 'Peninsula jutting into lake, diverse habitat',
      targetSpecies: [
        'Deer (pinch points)',
        'Turkey (strutting areas)',
        'Waterfowl (surrounding water)',
      ],
      notes: 'Excellent for waterfowl hunting with water on three sides. Natural pinch point concentrates deer movement.',
    },
    {
      name: 'Damsite Area',
      access: 'US-19 to dam access road, USACE day use area',
      terrain: 'Lake shoreline, maintained areas, forest transition',
      targetSpecies: [
        'Waterfowl (tailwater area)',
        'Deer (forest edges)',
        'Small game',
      ],
      notes: 'USACE managed area - check specific regulations. Tailwater below dam can hold waterfowl. Some areas restricted.',
    },
    {
      name: 'Archery Trail Area',
      access: 'Reopened July 2024 - access via designated parking areas',
      terrain: 'Wooded ridges, trail network, oak-hickory forest',
      targetSpecies: [
        'Deer (archery focus)',
        'Turkey (spring)',
        'Squirrel',
      ],
      notes: 'REOPENED JULY 2024 after temporary closure. Designated for archery hunting. Walk-in access only. Excellent deer hunting during early archery season.',
    },
  ],

  // Facilities
  facilities: [
    {
      type: 'Boat Ramps',
      count: 5,
      description:
        'Multiple boat ramps provide lake access: Battle Run, Salmon Run, Long Point, and others. Essential for waterfowl hunting and accessing remote shoreline areas.',
    },
    {
      type: 'Parking Areas',
      description:
        'Designated parking at all major access points. Battle Run and Salmon Run have the largest lots. Seasonal closures may apply - check USACE notices.',
    },
    {
      type: 'Restrooms',
      description: 'Vault toilets at major developed areas including Battle Run. Portable facilities at some access points seasonally.',
    },
    {
      type: 'Camping',
      description:
        'Battle Run Campground operated by USACE provides camping near WMA. Reservations recommended during peak seasons. No camping on WMA land itself.',
      contact: '(304) 872-3412',
      link: 'https://www.recreation.gov/camping/campgrounds/232560',
    },
    {
      type: 'Marina Services',
      description:
        'Summersville Lake Marina provides fuel, supplies, and boat rentals. Located on the lake with easy WMA access.',
    },
  ],

  // Access Points with GPS
  accessPoints: [
    {
      name: 'Battle Run Boat Ramp & Parking',
      coordinates: { lat: 38.2197, lng: -80.8792 },
      features: [
        'Large parking area',
        'Concrete boat ramp',
        'Vault toilets',
        'Near Battle Run Campground',
        'Primary waterfowl staging',
      ],
    },
    {
      name: 'Salmon Run Access',
      features: [
        'WVDNR parking area',
        'Boat ramp',
        'Walk-in hunting access',
        'Less crowded option',
      ],
    },
    {
      name: 'Long Point Access',
      features: [
        'Peninsula access',
        'Parking available',
        'Excellent waterfowl position',
        'Walk-in only past parking',
      ],
    },
    {
      name: 'Archery Trail Parking',
      features: [
        'Reopened July 2024',
        'Walk-in archery access',
        'Limited parking',
        'Early season priority',
      ],
    },
    {
      name: 'Damsite Day Use Area',
      features: [
        'USACE managed',
        'Tailwater access',
        'Check specific regulations',
        'Seasonal restrictions may apply',
      ],
    },
  ],

  // Seasonal Hunting Guide
  seasonalGuide: [
    {
      season: 'Fall',
      target: 'Deer (archery, firearms), Turkey, Grouse, Squirrel, Waterfowl',
      tips: 'Peak activity from September through December. Archery season opens Sept 27 - scout summer patterns. Buck firearms Nov 24 - expect pressure, hunt early/late. Waterfowl splits start Oct 4. Oak mast crop determines squirrel and deer movement patterns.',
    },
    {
      season: 'Spring',
      target: 'Turkey (gobblers)',
      tips: 'April 20 - May 24 spring gobbler season. Set up on hardwood ridges overlooking hollows. Gobblers often roost near lake coves with large trees. Listen for dawn gobbling to pattern birds. Call aggressively but be patient.',
    },
    {
      season: 'Winter',
      target: 'Late deer (muzzleloader), Small game, Rabbit, Raccoon',
      tips: 'Muzzleloader Dec 15-21. Mountaineer Heritage Jan 8-11 for traditional weapons only. Winter squirrel and rabbit hunting productive with less pressure. Night raccoon hunting with hounds popular.',
    },
    {
      season: 'Summer',
      target: 'Scouting, Shooting practice',
      tips: 'Non-hunting season but excellent for scouting deer sign, locating turkey roosts, and identifying access points. Lake recreation popular - be aware of increased foot traffic.',
    },
  ],

  // Regulations
  regulations: [
    {
      category: 'Hunting License',
      details:
        'WV hunting license required. Class BG stamp for deer/turkey. Federal duck stamp required for waterfowl. Hunter education certificate required for first-time purchasers.',
      link: 'https://wvdnr.gov/hunting/hunting-regulations/',
      important: true,
    },
    {
      category: 'NO BEAR HUNTING 2025',
      details:
        'CRITICAL: Nicholas County has been REMOVED from bear hunting for 2025. No bear hunting is permitted on Summersville Lake WMA during the 2025 season. Check WVDNR for future updates.',
      link: 'https://wvdnr.gov/hunting/hunting-regulations/',
      important: true,
    },
    {
      category: 'Electronic Game Check',
      details:
        'Required within 24 hours via WVhunt.com or 1-844-WVCHECK. Cell service available in most areas but may be spotty in remote sections.',
      link: 'https://wvhunt.com',
      important: true,
    },
    {
      category: 'Antlerless Deer',
      details:
        'Nicholas County is OPEN for antlerless deer harvest with both base license and Class N/NN stamps. Multiple antlerless-only periods throughout fall.',
      important: true,
    },
    {
      category: 'Blaze Orange',
      details:
        '400+ square inches during firearms deer season. Required for safety - terrain varies from open to dense forest.',
      important: true,
    },
    {
      category: 'Sunday Hunting',
      details: 'No hunting on Sunday in West Virginia (state law).',
      important: true,
    },
    {
      category: 'Waterfowl Requirements',
      details:
        'Federal duck stamp required in addition to WV hunting license and HIP registration. Steel shot or approved non-toxic shot only.',
      important: true,
    },
    {
      category: 'USACE Regulations',
      details:
        'Summersville Lake WMA is on USACE land. Additional USACE regulations may apply in certain areas. Check posted signs at access points.',
      important: true,
    },
    {
      category: 'Tree Stands',
      details:
        'Portable stands only - must be non-bark penetrating and removed after each hunt. No permanent stands allowed.',
      important: false,
    },
    {
      category: 'Firearms Safety',
      details: 'Uncased firearms prohibited except during open hunting season. Firearms must be unloaded in vehicles. Never shoot across public roads or toward the lake when recreationists present.',
      important: true,
    },
    {
      category: 'ATVs',
      details: 'No ATVs except on designated roads/trails. Walk-in access only to most hunting areas.',
      important: false,
    },
    {
      category: 'Boats',
      details: 'Boats may be used to access hunting areas but hunting from a moving boat is prohibited. Waterfowl hunting from anchored boats allowed.',
      important: false,
    },
  ],

  // Gear Checklist
  gearList: [
    { name: 'WV hunting license', optional: false },
    { name: 'Class BG stamp (big game)', optional: false },
    { name: 'Federal duck stamp (waterfowl)', optional: true },
    { name: 'Hunter education certificate', optional: false },
    { name: 'Blaze orange (400+ sq inches firearms season)', optional: false },
    { name: 'GPS/offline maps', optional: false },
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
    { name: 'Decoys (waterfowl)', optional: true },
    { name: 'Waders (waterfowl)', optional: true },
    { name: 'Boat/kayak for lake access', optional: true },
  ],

  // Related Shop Categories
  relatedShop: [
    {
      name: 'Hunting Licenses & Stamps',
      description: 'Get your license, stamps, and federal duck stamp before you head out',
      href: '/shop/licenses',
    },
    {
      name: 'Ammunition',
      description: 'Rifle, shotgun, muzzleloader, and non-toxic waterfowl loads in stock',
      href: '/shop/ammo',
    },
    {
      name: 'Hunting Gear',
      description: 'Stands, blinds, calls, decoys, and camo',
      href: '/shop/hunting',
    },
  ],

  // Optional Fields
  difficulty: 'moderate',
  bestSeason: 'fall',
  coordinates: {
    lat: 38.2197,
    lng: -80.8792,
  },
  mapUrl: 'https://wvdnr.gov/wmamapproj/pdf/pdf150/SummersvilleLake.pdf',
  regulationsUrl: 'https://wvdnr.gov/hunting/hunting-regulations/',

  // Cross-links for Adventure Hub integration
  // nearbyLake: 'summersville',
  // nearbyCampgrounds: ['battle-run'],

  // Kim's Take
  kimsTake: "Summersville Lake WMA is one of our closest hunting spots - just 30 minutes from the shop. Good deer population, excellent waterfowl opportunities with all that lake access, and the Archery Trail just reopened in July 2024. Big heads up though: NO BEAR HUNTING here in 2025. Nicholas County got removed from the bear season. If you're after bear, head up to Braxton or Webster County instead. The Battle Run area is your best bet for a home base - campground right there and easy lake access.",
};
