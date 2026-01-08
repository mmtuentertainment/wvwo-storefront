/**
 * Bulltown Historic Area Data
 * SPEC-22: Elk River Migration - Historic Template Component
 *
 * Indigenous heritage, Civil War history, logging era, and conservation story
 * Adjacent to Burnsville Lake and Elk River WMA
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
    name: 'Elk River Heritage Trail',
    description:
      'Explore the connection between Bulltown Historic Area, Burnsville Lake, and Elk River WMA. ' +
      'Interpretive materials available at campground facilities and WMA parking areas.',
    cost: 'Free',
  },
  {
    type: 'Self-Guided',
    name: 'Conservation Story Walk',
    description:
      'Follow the story of Appalachian forest recovery from logging devastation to protected wildlife ' +
      'management area. Best experienced along the WMA trails where second-growth forest dominates.',
    cost: 'Free',
  },
  {
    type: 'Seasonal',
    name: 'Elk Viewing Tours',
    description:
      'WVDNR occasionally offers guided elk viewing opportunities as part of the restoration program. ' +
      'Check wvdnr.gov/elk for current tour availability and locations.',
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
      'name itself - from "river of plenty fat elk" - honors Shawnee stewardship.',
    interactive: false,
  },
  {
    title: 'Logging Era Evidence',
    location: 'WMA Trails',
    description:
      'Old logging roads, railroad grades, and second-growth forest composition tell the story of ' +
      'industrial extraction. Visible throughout Elk River WMA hiking trails.',
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
        'river its name. WVDNR manages the program with viewing opportunities at designated areas.',
      contactForInquiry: 'DNR.Wildlife@wv.gov',
    },
    {
      name: 'Appalachian Forest Recovery',
      type: 'Nature Study',
      audience: 'All Ages',
      description:
        'Understand how second-growth forest recovered from the logging era devastation. The mature ' +
        'hardwoods visible today are roughly 80-120 years old - testament to forest resilience.',
    },
    {
      name: 'Indigenous Place Names',
      type: 'Cultural Heritage',
      audience: 'Families',
      description:
        'Discover how Indigenous peoples named the landscape and what those names reveal about pre-colonial ' +
        'ecology. Many West Virginia place names preserve Shawnee, Delaware, and Cherokee heritage.',
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
    'Handicapped-accessible piers at Burnsville Lake',
    'Accessible campground facilities',
    'Paved parking at developed areas',
    'Class Q hunting access for qualified disabled hunters',
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
// ============================================================================

export const nationalRegister = false; // Verify with official sources
