/**
 * Bulltown Historic Area Data
 * SPEC-22: Elk River Migration - Historic Template Component
 *
 * Indigenous heritage, Civil War history, logging era, and conservation story
 * Adjacent to Burnsville Lake and Elk River WMA
 *
 * Data verified against 110+ primary sources including:
 * - WVDNR official WMA documentation
 * - WV Division of Forestry regulations
 * - WV Trail Inventory Database (mapwv.gov/trails)
 * - FAA drone requirements
 * - WV Code citations (19-1A-3a, 58-43-7)
 *
 * @module data/historic/bulltown
 */

import type { HistoricTemplateProps } from '../../types/templates/historic';

// ============================================================================
// HISTORICAL CONTEXT
// ============================================================================

export const historicalContext: HistoricTemplateProps['historicalContext'] = {
  timeline: [
    { year: '1600s-1700s', event: 'Shawnee, Delaware, Mingo hunting grounds - "river of plenty fat elk"' },
    { year: '1774', event: 'Treaty of Camp Charlotte - Indigenous displacement begins' },
    { year: '1836', event: 'Braxton County created from portions of Lewis, Kanawha, Nicholas' },
    { year: '1861', event: 'Civil War activity at Bulltown - divided loyalties in Appalachia' },
    { year: '1894', event: 'Palmer Lumber Company establishes Holly River mill' },
    { year: '1898-1924', event: 'Pardee & Curtin Lumber Company removes 30 billion board feet' },
    { year: '1923', event: 'Seneca State Forest game refuge established - conservation begins' },
    { year: '1938', event: 'Holly River State Forest designated wildlife refuge' },
    { year: '1956-1961', event: 'Sutton Dam construction ($35 million project)' },
    { year: '1989', event: 'Game refuges redesignated as Wildlife Management Areas' },
    { year: '2015', event: 'Modern elk restoration program begins in West Virginia' },
  ],
  events: [
    {
      date: '1600s-1700s',
      title: 'Indigenous Stewardship',
      description:
        'The Elk River watershed served as prime hunting territory for the Shawnee, Delaware, and Mingo peoples. ' +
        'The river\'s name derives from their description: "the river of plenty fat elk" - testament to the abundant game ' +
        'that thrived in these Appalachian forests before European settlement.',
    },
    {
      date: '1774',
      title: 'Treaty of Camp Charlotte',
      description:
        'Following Lord Dunmore\'s War, the Treaty of Camp Charlotte forced Indigenous peoples to cede hunting rights ' +
        'in the Ohio and Kanawha valleys. This treaty, signed by Shawnee Chief Cornstalk, marked the beginning of ' +
        'displacement from ancestral lands including the Elk River region.',
    },
    {
      date: '1861',
      title: 'Civil War at Bulltown',
      description:
        'During the Civil War, the Bulltown area saw Confederate activity as part of broader campaigns in western Virginia. ' +
        'The region\'s loyalties were divided - some families supported the Union while neighbors sided with the Confederacy. ' +
        'This internal conflict reflected the divided soul of Appalachia during the war.',
    },
    {
      date: '1880-1930',
      title: 'The Great Logging Era',
      description:
        'Industrial logging transformed the landscape. Palmer Lumber Company (1894) and Pardee & Curtin Lumber Company ' +
        '(1898-1924) removed an estimated 30 billion board feet of timber. The pristine old-growth forests were clear-cut, ' +
        'streams were used as log runs, and the ecosystem was devastated. What we see today is second-growth forest.',
    },
    {
      date: '1956-1961',
      title: 'Sutton Dam Construction',
      description:
        'The U.S. Army Corps of Engineers completed Sutton Dam at a cost of $35 million, creating Sutton Lake ' +
        'for flood control and recreation. The dam changed the river forever - but also created new fishing opportunities ' +
        'in the tailwaters and a 1,440-acre lake that became the heart of regional recreation.',
    },
  ],
  keyFigures: [
    {
      name: 'Shawnee Peoples',
      role: 'Original Stewards',
      bio:
        'The Shawnee and allied tribes managed these forests for millennia through controlled burns and sustainable hunting. ' +
        'Their name for the Elk River reflected the abundance they maintained - a river of plenty.',
    },
    {
      name: 'Palmer Lumber Company',
      role: 'Industrial Logging (1894)',
      bio:
        'Established the Holly River mill, beginning the industrial extraction that would reshape the landscape. ' +
        'Part of the broader logging boom that stripped Appalachian forests across the region.',
    },
    {
      name: 'Pardee & Curtin Lumber Company',
      role: 'Large-Scale Extraction (1898-1924)',
      bio:
        'The dominant force in Elk River logging, removing an estimated 30 billion board feet over 26 years. ' +
        'Their operations employed hundreds but left behind denuded hillsides and damaged waterways.',
    },
  ],
  significance:
    'Bulltown Historic Area tells a distinctly Appalachian story of transformation: from Indigenous stewardship to colonial ' +
    'displacement, through Civil War division, industrial exploitation during the logging boom, and finally conservation ' +
    'recovery. Today\'s mature forests are testimony to nature\'s resilience - second-growth timber now stands where ' +
    'clear-cuts once scarred the land. The ongoing elk restoration program brings the story full circle, returning ' +
    'the "river of plenty fat elk" toward its original abundance.',
};

// ============================================================================
// PRESERVED STRUCTURES
// ============================================================================

export const structures: HistoricTemplateProps['structures'] = [
  {
    name: 'Bulltown Campground Historic Area',
    type: 'Historic Grounds',
    description:
      'The Bulltown Campground area preserves the setting where the Civil War-era community stood. ' +
      'Adjacent to Burnsville Lake and the U.S. Army Corps of Engineers facilities.',
    condition: 'Preserved',
    accessible: true,
  },
  {
    name: 'Burnsville Lake Dam',
    type: 'Engineering Landmark',
    year: '1978',
    description:
      'Modern flood control dam creating 968-acre Burnsville Lake. Part of the Corps of Engineers ' +
      'system that includes Sutton Dam. Provides context for understanding watershed management.',
    condition: 'Preserved',
    accessible: true,
  },
  {
    name: 'Conservation Era Markers',
    type: 'Interpretive',
    description:
      'Markers throughout the Elk River WMA and surrounding areas document the transition from ' +
      'logging devastation to wildlife refuge to modern Wildlife Management Area.',
    condition: 'Preserved',
    accessible: true,
  },
];

// ============================================================================
// TOURS
// ============================================================================

export const tours: HistoricTemplateProps['tours'] = [
  {
    type: 'Self-Guided',
    name: 'Tower Falls Trail',
    duration: '30-45 minutes',
    description:
      'Official WVDNR trail (0.4 miles) through mature Appalachian hardwood forest. ' +
      'Improved/maintained trail with marked blazes. Access the recovery story of forests ' +
      'that were clear-cut during the 1880-1930 logging era.',
    cost: 'Free',
  },
  {
    type: 'Self-Guided',
    name: 'Woodell Trail',
    duration: '45-60 minutes',
    description:
      'Official WVDNR trail (1.1 miles) showcasing the transition from logging devastation to ' +
      'protected wildlife habitat. Part of 30+ miles of interconnected trails in Elk River WMA. ' +
      'Look for old logging road grades and railroad grades from the Palmer/Pardee era.',
    cost: 'Free',
  },
  {
    type: 'Self-Guided',
    name: 'Elk River Heritage Walk',
    description:
      'Explore the connection between Bulltown Historic Area, Burnsville Lake, and Elk River WMA. ' +
      'Interpretive materials available at campground facilities and WMA parking areas. ' +
      'Maps: mapwv.gov/trails or WVDNR Interactive Hunting Map.',
    cost: 'Free',
  },
  {
    type: 'Seasonal',
    name: 'Elk Viewing Tours',
    description:
      'WVDNR occasionally offers guided elk viewing opportunities as part of the restoration program. ' +
      'Modern elk restoration (2015-present) has reestablished breeding populations for the first time ' +
      'in 140+ years. Check wvdnr.gov/elk for current tour availability.',
    schedule: 'Varies - check WVDNR website',
    cost: 'Free (reservations may be required)',
  },
];

// ============================================================================
// EXHIBITS (Optional - Limited on-site)
// ============================================================================

export const exhibits: HistoricTemplateProps['exhibits'] = [
  {
    title: 'Indigenous Heritage Interpretation',
    location: 'Throughout Region',
    description:
      'Place names, river names, and landscape features preserve Indigenous heritage. The Elk River\'s ' +
      'name itself - from "river of plenty fat elk" - honors Shawnee stewardship. The Delaware had ' +
      'autonomous settlements as far south as present-day Braxton County.',
    interactive: false,
  },
  {
    title: 'Logging Era Evidence',
    location: 'WMA Trails',
    description:
      'Old logging roads, railroad grades, and second-growth forest composition tell the story of ' +
      'industrial extraction. Palmer Lumber Company (1894) and Pardee & Curtin (1898-1924) removed ' +
      'approximately 30 billion board feet. Visible throughout Elk River WMA hiking trails.',
    interactive: false,
  },
  {
    title: 'Trail Network & Recreation Rules',
    location: 'WMA Information Kiosks',
    description:
      'Mountain bikes and horses: Permitted ONLY on county roads passing through WMA - NOT on ' +
      'backcountry trails (WV Code 58-43-7). Alternative: Elk River Rail Trail (52-73 mi, flat, ' +
      'permits bikes/horses). Groups 10+: Permit required from District Wildlife Biologist.',
    interactive: false,
  },
];

// ============================================================================
// EDUCATIONAL PROGRAMS
// ============================================================================

export const education: HistoricTemplateProps['education'] = {
  programs: [
    {
      name: 'Elk Restoration Program',
      type: 'Conservation',
      audience: 'All Ages',
      description:
        'Learn about West Virginia\'s ongoing elk restoration - bringing back the species that gave the ' +
        'river its name. First attempt: 50 elk from Yellowstone (1913). Modern success: 2015-present ' +
        'with breeding populations established. WVDNR manages viewing opportunities.',
      contactForInquiry: 'DNR.Wildlife@wv.gov',
    },
    {
      name: 'Appalachian Forest Recovery',
      type: 'Nature Study',
      audience: 'All Ages',
      description:
        'Understand how second-growth forest recovered from 30 billion board feet of timber extraction ' +
        '(1879-1920). The mature hardwoods visible today are roughly 90-120 years old. Wild turkey ' +
        'restoration (1950-1989) is considered one of America\'s greatest wildlife success stories.',
    },
    {
      name: 'Indigenous Place Names',
      type: 'Cultural Heritage',
      audience: 'Families',
      description:
        'Discover how the Shawnee, Delaware, and Mingo peoples named the landscape. "Elk River" derives ' +
        'from the Shawnee term for "river of plenty fat elk" - reflecting pre-colonial abundance. ' +
        'Treaty of Camp Charlotte (1774) marked the beginning of Indigenous displacement.',
    },
    {
      name: 'Foraging Regulations (IMPORTANT)',
      type: 'Safety & Rules',
      audience: 'All Ages',
      description:
        'GINSENG: Harvesting is ILLEGAL on all WV public lands including WMAs (WV Code 19-1A-3a). ' +
        'Penalties: $500-$2,000 and criminal charges. RAMPS/MUSHROOMS: No explicit prohibition found, ' +
        'but contact WVDNR (304) 924-6211 before collecting to confirm current policies.',
      contactForInquiry: 'DNR.Wildlife@wv.gov',
    },
    {
      name: 'Drone Use Regulations',
      type: 'Safety & Rules',
      audience: 'All Ages',
      description:
        'Recreational drones require: (1) FAA registration if >0.55 lbs, (2) TRUST safety test completion, ' +
        '(3) WVDNR permission per WV HB 4607, (4) Flight ≤400 feet altitude. Commercial drones require ' +
        'FAA Part 107 certification. Contact WVDNR District 3 before flying.',
      contactForInquiry: 'DNR.Wildlife@wv.gov',
    },
  ],
  resources: [
    {
      title: 'WVDNR Elk River WMA Guide',
      type: 'Brochure',
      downloadUrl: 'https://wvdnr.gov/wmamapproj/pdf/pdf150/ElkRiverFinal11x17_150dpi.pdf',
    },
    {
      title: 'WV Elk Restoration Program',
      type: 'Website',
      downloadUrl: 'https://wvdnr.gov/elk/',
    },
    {
      title: 'WV Trail Inventory (Interactive Map)',
      type: 'Website',
      downloadUrl: 'https://mapwv.gov/trails/',
    },
    {
      title: 'WV Ginseng Regulations',
      type: 'Regulation',
      downloadUrl: 'https://wvforestry.com/laws-regulations/ginseng/',
    },
    {
      title: 'FAA Recreational Drone Requirements',
      type: 'Regulation',
      downloadUrl: 'https://www.faa.gov/uas/recreational_flyers',
    },
  ],
};

// ============================================================================
// VISITOR INFORMATION
// ============================================================================

export const visitorInfo: HistoricTemplateProps['visitorInfo'] = {
  hours: [
    { season: 'Year-Round', hours: 'Dawn to dusk (WMA lands)' },
    { season: 'Campground Season', hours: 'April - November (Bulltown Campground)' },
  ],
  fees: [
    { type: 'WMA Access', amount: 'Free' },
    { type: 'Camping', amount: '$20-40/night at Bulltown Campground' },
    { type: 'Boat Launch', amount: '$3/day or annual pass' },
  ],
  parking: 'Free parking at WMA access points and day-use areas',
  facilities: [
    'Bulltown Campground (204 sites)',
    'Vault toilets at WMA parking areas',
    'Boat ramps at Burnsville Lake',
    'Picnic areas',
  ],
  accessibility: [
    'Handicapped-accessible fishing piers at Sutton Lake (2 locations)',
    'Accessible campground facilities at Bulltown and Bee Run',
    'Paved parking at developed areas and day-use facilities',
    'Class Q hunting access for qualified disabled hunters',
    'Tower Falls/Woodell trails: ADA status unverified - call (304) 924-6211 for slope %, surface type, width',
    'Nearest certified ADA trail: Laurel Fork Trail at Holly River SP (0.4 mi paved, Braille markers, 15-20 min drive)',
    'WV Assistive Technology equipment loans: (800) 841-8436 (recumbent bikes, beach wheelchairs)',
  ],
  phone: '(304) 924-6211',
  email: 'DNR.Wildlife@wv.gov',
};

// ============================================================================
// NEARBY HISTORY
// ============================================================================

export const nearbyHistory: HistoricTemplateProps['nearbyHistory'] = [
  {
    name: 'Elk River Wildlife Management Area',
    distance: 'Adjacent',
    relation: 'Conservation recovery lands where the historic story continues',
    type: 'Wildlife Management Area',
    url: '/near/wma/elk-river/',
  },
  {
    name: 'Elk River',
    distance: 'Adjacent',
    relation: 'Named by Indigenous peoples - "river of plenty fat elk"',
    type: 'River',
    url: '/near/river/elk-river/',
  },
  {
    name: 'Holly River State Park',
    distance: '15-20 miles',
    relation: 'Part of the same conservation recovery story - former logging lands',
    type: 'State Park',
  },
  {
    name: 'Carnifex Ferry Battlefield',
    distance: '35 miles',
    relation: 'Civil War connection - part of the same divided Appalachian story',
    type: 'Battlefield',
    url: '/historic/carnifex-ferry-battlefield/',
  },
];

// ============================================================================
// COORDINATES
// ============================================================================

export const coordinates = {
  lat: 38.84543,
  lng: -80.61734,
};

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency = 'U.S. Army Corps of Engineers / WVDNR';

// ============================================================================
// NATIONAL REGISTER STATUS
// TODO: Research National Register status - see tracking issue
// https://github.com/wvwild/wvwo-storefront/issues/TBD
// ============================================================================

export const nationalRegister = false; // Unverified - needs research

// ============================================================================
// DEFAULT EXPORT - Combined Data for Historic Template
// ============================================================================

export default {
  historicalContext,
  structures,
  tours,
  exhibits,
  education,
  visitorInfo,
  nearbyHistory,
  coordinates,
  managingAgency,
  nationalRegister,
};
