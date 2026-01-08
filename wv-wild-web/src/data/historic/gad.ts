/**
 * Submerged Town of Gad Historic Data
 * SPEC-23: Summersville Lake Migration - Historic Template Component
 *
 * Ghost town flooded in 1966 during Summersville Dam completion
 * Premier scuba diving destination - "Little Bahamas of the East"
 *
 * Data verified against primary sources including:
 * - U.S. Army Corps of Engineers Huntington District documentation
 * - West Virginia Encyclopedia
 * - Sarge's Dive Shop historical information
 * - Nicholas County historical records
 *
 * @module data/historic/gad
 */

import type { HistoricTemplateProps } from '../../types/templates/historic';

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const name = 'Submerged Town of Gad';
export const location = 'Summersville Lake, Nicholas County, WV';
export const era = 'Early Settlement Era (1800s-1966)';
export const heroImage = '/images/historic/gad-underwater.webp';
export const heroImageAlt = 'Underwater view of submerged foundations at the ghost town of Gad in Summersville Lake';
export const heroImageCredit = 'West Virginia Tourism';

export const quickHighlights = [
  'Ghost town submerged since 1966',
  'Visible during 10-year maintenance drawdowns',
  'Premier freshwater scuba diving site',
  '"Little Bahamas of the East" - exceptional water clarity',
  'Dam dedicated by President LBJ on September 3, 1966',
];

// ============================================================================
// HISTORICAL CONTEXT
// ============================================================================

export const historicalContext: HistoricTemplateProps['historicalContext'] = {
  timeline: [
    { year: 'Early 1800s', event: 'Town of Gad established along the Gauley River' },
    { year: '1860', event: 'Post office established serving the Gad community' },
    { year: '1938', event: 'Flood Control Act authorizes Summersville Dam construction' },
    { year: '1960', event: 'Post office closes - residents begin relocating' },
    { year: '1960-1966', event: 'Summersville Dam construction ($48 million project)' },
    { year: 'September 3, 1966', event: 'President Lyndon B. Johnson dedicates Summersville Dam' },
    { year: '1966', event: 'Gauley River impounded - Town of Gad submerged beneath 327 feet of water' },
    { year: '1990s', event: 'Thomas Patrick boat intentionally sunk for diver interest' },
    { year: '2024-2025', event: 'Major maintenance drawdown reveals submerged remnants (1,520 ft elevation)' },
  ],
  events: [
    {
      date: 'Early 1800s',
      title: 'Settlement Along the Gauley',
      description:
        'The town of Gad grew along the Gauley River in Nicholas County, serving as a small community ' +
        'of homes, farms, and a post office. The settlement thrived in the narrow river valley, ' +
        'with residents making their living from the fertile bottomland and surrounding forests.',
    },
    {
      date: '1938',
      title: 'Flood Control Act Authorization',
      description:
        'Section 4 of the Flood Control Act of 1938 authorized construction of Summersville Dam as part ' +
        'of a comprehensive flood control system for the Gauley and Kanawha River basins. The project ' +
        'would take over two decades to begin, sealing the fate of communities in the flood pool.',
    },
    {
      date: '1960-1966',
      title: 'Dam Construction and Displacement',
      description:
        'The U.S. Army Corps of Engineers purchased the town of Gad and surrounding properties in the early 1960s. ' +
        'Residents relocated as the $48 million dam rose across the Gauley River. When the gates closed in 1966, ' +
        'the rising waters consumed homes, roads, and the community that had stood for over 150 years.',
    },
    {
      date: 'September 3, 1966',
      title: 'Presidential Dedication',
      description:
        'President Lyndon B. Johnson dedicated Summersville Dam, marking the completion of West Virginia\'s ' +
        'largest lake project. The ceremony celebrated flood control achievements while the waters continued ' +
        'rising over the abandoned town sites. What was lost beneath the surface would become legend.',
    },
    {
      date: 'Present Day',
      title: 'Ghost Town Revealed',
      description:
        'Approximately every 10 years, USACE conducts major maintenance drawdowns that lower the lake ' +
        '55+ feet below normal summer pool. During these events, the foundations of Gad emerge from ' +
        'the depths - stone walls, roadways, and even rock carvings carved by residents long ago. ' +
        'The 2024-2025 drawdown to 1,520 feet elevation offers rare access to this underwater ghost town.',
    },
  ],
  keyFigures: [
    {
      name: 'Gad Community Residents',
      role: 'Original Settlers (1800s-1960)',
      bio:
        'The families of Gad built lives along the Gauley River for over 150 years. ' +
        'When the dam came, they were bought out and relocated. Their homes, churches, ' +
        'and farms now rest beneath 327 feet of clear blue water.',
    },
    {
      name: 'U.S. Army Corps of Engineers',
      role: 'Dam Builders (Huntington District)',
      bio:
        'The USACE Huntington District constructed Summersville Dam between 1960-1966 at a cost of ' +
        '$48 million. The 390-foot-high dam created West Virginia\'s largest lake, providing flood ' +
        'control for the Kanawha Valley and recreation for future generations.',
    },
    {
      name: 'President Lyndon B. Johnson',
      role: 'Dam Dedication (September 3, 1966)',
      bio:
        'The 36th President dedicated Summersville Dam in a ceremony marking the completion of this ' +
        'massive flood control project. His presence underscored the federal investment in Appalachian ' +
        'infrastructure during his Great Society era.',
    },
  ],
  significance:
    'The Submerged Town of Gad represents a uniquely Appalachian story of sacrifice and transformation. ' +
    'Communities throughout the region were displaced by mid-20th century dam projects built for flood control. ' +
    'Yet from this loss emerged something unexpected - Summersville Lake\'s exceptional water clarity, created by ' +
    'the sandstone geology of the flooded gorge, earned it the title "Little Bahamas of the East." Today, scuba ' +
    'divers from across the eastern United States explore the ghost town\'s remnants, finding history preserved ' +
    'beneath waters so clear they rival tropical destinations. The periodic drawdowns that reveal Gad\'s foundations ' +
    'offer haunting reminders of the communities that made way for progress.',
};

// ============================================================================
// PRESERVED STRUCTURES (Underwater)
// ============================================================================

export const structures: HistoricTemplateProps['structures'] = [
  {
    name: 'Town of Gad Foundations',
    type: 'Submerged Ruins',
    description:
      'Stone foundations of homes and buildings from the original town of Gad. Visible during ' +
      'major maintenance drawdowns (approximately every 10 years) or accessible to certified scuba ' +
      'divers year-round. Sediment coverage varies by location and time since last drawdown.',
    condition: 'Ruins',
    accessible: false,
  },
  {
    name: 'Submerged Roadways',
    type: 'Historic Infrastructure',
    description:
      'Original road grades that once connected Gad to surrounding communities. These underwater ' +
      'roadways provide orientation for divers exploring the ghost town site near the present-day marina.',
    condition: 'Ruins',
    accessible: false,
  },
  {
    name: 'Rock Carvings',
    type: 'Historic Artifacts',
    description:
      'Carvings made by residents in the rock formations around Gad prior to flooding. ' +
      'These personal marks - initials, dates, and simple designs - survived the submersion ' +
      'and can be seen during drawdown events.',
    condition: 'Preserved',
    accessible: false,
  },
  {
    name: 'Thomas Patrick Wreck',
    type: 'Artificial Reef',
    year: '1990s',
    description:
      'A small boat intentionally sunk near the dam at the winter boat ramp specifically for diver ' +
      'interest. Located approximately 30 feet deep, this artificial reef provides a focal point ' +
      'for training dives and underwater navigation exercises.',
    condition: 'Preserved',
    accessible: false,
  },
  {
    name: 'Summersville Dam',
    type: 'Engineering Landmark',
    year: '1966',
    description:
      'The 390-foot-high dam that created Summersville Lake and flooded the town of Gad. ' +
      'This massive concrete structure provides flood control for the Kanawha Valley while ' +
      'creating West Virginia\'s largest lake with 60+ miles of shoreline.',
    condition: 'Preserved',
    accessible: true,
  },
];

// ============================================================================
// TOURS (Diving Access)
// ============================================================================

export const tours: HistoricTemplateProps['tours'] = [
  {
    type: 'Scuba Charter',
    name: 'Ghost Town Dive - Gad Exploration',
    duration: '2-3 hours',
    description:
      'Certified scuba divers can explore the submerged town of Gad through charter services from ' +
      'Sarge\'s Dive Shop at Long Point Marina. Visibility averages 20-45 feet during summer months. ' +
      'Divers may see foundations, roadways, and rock formations from the drowned community. ' +
      'SCUBA CERTIFICATION REQUIRED.',
    cost: 'Contact Sarge\'s Dive Shop for rates',
    schedule: 'June-September (optimal visibility)',
  },
  {
    type: 'Self-Guided',
    name: 'Drawdown Walking Tour',
    description:
      'During major maintenance drawdowns (approximately every 10 years), the Town of Gad becomes ' +
      'accessible by foot. The 2024-2025 drawdown lowered the lake to 1,520 feet elevation - ' +
      '55 feet below normal summer pool of 1,575 feet. Check USACE announcements for next drawdown schedule. ' +
      'WARNING: Muddy conditions, steep terrain, and unstable footing during drawdown access.',
    cost: 'Free',
  },
  {
    type: 'Boat Tour',
    name: 'Ghost Town Overlook',
    description:
      'Boat over the submerged town of Gad near the marina. The exceptional water clarity (20-45 feet ' +
      'visibility) allows viewing of underwater features from the surface on calm, sunny days. ' +
      'Kayak, paddleboard, and boat rentals available at Summersville Lake Marina.',
    cost: 'Boat rental rates vary',
    schedule: 'May-October',
  },
  {
    type: 'Certification Course',
    name: 'Open Water Scuba Certification',
    duration: 'Multiple sessions',
    description:
      'Sarge\'s Dive Shop at Long Point Marina offers NAUI and SDI scuba certification courses. ' +
      'Complete your open-water training dives in the same crystal-clear waters where you\'ll explore ' +
      'the ghost town. Training includes self-study, pool sessions, and five open-water dives.',
    cost: 'Contact Sarge\'s for pricing',
    schedule: 'Year-round courses available',
  },
];

// ============================================================================
// EXHIBITS (Natural Underwater Features)
// ============================================================================

export const exhibits: HistoricTemplateProps['exhibits'] = [
  {
    title: 'Long Point Cliff - Premier Dive Site',
    location: 'Underwater (Long Point)',
    description:
      'The #1 dive location at Summersville Lake. Dramatic sandstone walls descend approximately 100 feet ' +
      'below the surface. Divers explore overhangs, swim-throughs, and rock gardens formed by the flooded ' +
      'Gauley River gorge. The same geology that created this underwater wonderland earned the lake its ' +
      '"Little Bahamas of the East" reputation.',
    interactive: false,
  },
  {
    title: 'The Wall',
    location: 'Underwater',
    description:
      'Sheer sandstone cliffs descending deep into the lake. This dive site showcases the geological ' +
      'foundation that creates Summersville Lake\'s exceptional clarity - the sandstone minimizes sediment ' +
      'suspension and nutrient loading that causes turbidity in other lakes.',
    interactive: false,
  },
  {
    title: 'Gad Historical Marker',
    location: 'Near Long Point Marina',
    description:
      'Interpretive signage near the marina area commemorates the town of Gad and other communities ' +
      'displaced by Summersville Dam construction. Visitors can learn about the people who lived in ' +
      'the Gauley River valley before the waters rose.',
    interactive: false,
  },
  {
    title: 'Dam Overlook',
    location: 'Summersville Dam',
    description:
      'View the massive 390-foot dam that created Summersville Lake and submerged the town of Gad. ' +
      'Interpretive displays explain the dam\'s flood control mission, construction history, and the ' +
      'transformation of the Gauley River valley.',
    interactive: false,
  },
];

// ============================================================================
// EDUCATIONAL PROGRAMS
// ============================================================================

export const education: HistoricTemplateProps['education'] = {
  programs: [
    {
      name: 'Discover Scuba Diving',
      type: 'Introductory Course',
      audience: 'Adults (10+)',
      description:
        'Try scuba diving in the crystal-clear waters of Summersville Lake. Sarge\'s Dive Shop offers ' +
        'introductory experiences for those curious about exploring the underwater ghost town. ' +
        'No certification required for supervised intro dives.',
      contactForInquiry: 'sarges@sarges.net',
    },
    {
      name: 'Submerged Heritage Interpretation',
      type: 'Historical Education',
      audience: 'All Ages',
      description:
        'Learn about the communities displaced by mid-20th century dam construction throughout Appalachia. ' +
        'The Town of Gad represents one of many settlements sacrificed for flood control. Historical ' +
        'societies and diving groups occasionally offer interpretive programs during drawdown events.',
    },
    {
      name: 'Underwater Photography Workshop',
      type: 'Skills Workshop',
      audience: 'Certified Divers',
      description:
        'Capture images of the submerged town remnants and the stunning underwater landscape. ' +
        'The exceptional visibility (20-45 feet) and dramatic topography make Summersville Lake ' +
        'ideal for underwater photography. Contact Sarge\'s Dive Shop for workshop availability.',
      contactForInquiry: 'sarges@sarges.net',
    },
    {
      name: 'Lake Ecology and Geology',
      type: 'Nature Study',
      audience: 'All Ages',
      description:
        'Understand why Summersville Lake is classified as oligotrophic - low in nutrients with exceptional ' +
        'clarity. The sandstone geology that created the "Little Bahamas of the East" also preserved the ' +
        'ghost town below. Learn how geology shapes both landscape and aquatic ecosystems.',
    },
  ],
  resources: [
    {
      title: 'Summersville Lake Diving Guide',
      type: 'Website',
      downloadUrl: 'https://www.sarges.net/about-summersville-lake.html',
    },
    {
      title: 'USACE Summersville Lake Water Data',
      type: 'Website',
      downloadUrl: 'https://water.usace.army.mil/overview/lrh/locations/summersville',
    },
    {
      title: 'WV Encyclopedia - Summersville Lake',
      type: 'Article',
      downloadUrl: 'https://www.wvencyclopedia.org/entries/598',
    },
    {
      title: 'USGS Lake Level Monitoring (Real-Time)',
      type: 'Website',
      downloadUrl: 'https://waterdata.usgs.gov/monitoring-location/USGS-03189590/',
    },
  ],
};

// ============================================================================
// VISITOR INFORMATION
// ============================================================================

export const visitorInfo: HistoricTemplateProps['visitorInfo'] = {
  hours: [
    { season: 'Year-Round', hours: 'Lake accessible dawn to dusk' },
    { season: 'Dive Shop Hours', hours: 'Contact Sarge\'s Dive Shop for seasonal hours' },
    { season: 'Drawdown Events', hours: 'Variable - check USACE announcements' },
  ],
  fees: [
    { type: 'Day Use (Battle Run, Long Point)', amount: '$5.00 per vehicle' },
    { type: 'Annual Pass', amount: '$40' },
    { type: 'Boat Launch', amount: '$5.00 per launch' },
    { type: 'Scuba Charters', amount: 'Contact Sarge\'s Dive Shop' },
    { type: 'Drawdown Walking Access', amount: 'Free' },
  ],
  parking: 'Multiple parking areas at Long Point Recreation Area and Salmon Run. $5 day use fee applies.',
  facilities: [
    'Sarge\'s Dive Shop at Long Point Marina',
    'Boat ramps (Long Point, Salmon Run)',
    'Summersville Lake Marina (473 slips, fuel)',
    'Vault toilet restrooms',
    'Battle Run Beach (1,000-foot sandy beach)',
    'Picnic shelters',
  ],
  accessibility: [
    'Shore-based viewing accessible at overlook areas',
    'Underwater exploration requires scuba certification',
    'Drawdown walking access involves steep terrain and unstable footing',
    'Marina and day-use areas have paved parking',
    'Contact Sarge\'s Dive Shop for adaptive diving programs',
  ],
  phone: '304-872-3412',
  email: 'pa2@usace.army.mil',
};

// ============================================================================
// NEARBY HISTORY
// ============================================================================

export const nearbyHistory: HistoricTemplateProps['nearbyHistory'] = [
  {
    name: 'Summersville Lake',
    distance: 'On-site',
    relation: 'The lake that covers the Town of Gad - 2,700 acres of crystal-clear water',
    type: 'Lake',
    url: '/near/lake/summersville/',
  },
  {
    name: 'Summersville Lake Wildlife Management Area',
    distance: 'Adjacent',
    relation: '5,390 acres of WVDNR-managed lands surrounding the lake',
    type: 'Wildlife Management Area',
    url: '/near/wma/summersville/',
  },
  {
    name: 'Battle Run Campground',
    distance: 'Adjacent',
    relation: 'Primary lakeside camping - gateway to ghost town diving',
    type: 'Campground',
    url: '/near/campground/battle-run/',
  },
  {
    name: 'Carnifex Ferry Battlefield',
    distance: '10 miles',
    relation: 'Civil War battlefield where the Gauley River saw military action',
    type: 'Historic Site',
    url: '/historic/carnifex-ferry-battlefield/',
  },
  {
    name: 'Gauley River',
    distance: 'Below dam',
    relation: 'The river that once flowed through Gad - now world-class whitewater',
    type: 'River',
    url: '/near/river/gauley/',
  },
];

// ============================================================================
// COORDINATES
// ============================================================================

export const coordinates = {
  lat: 38.22,
  lng: -80.91,
};

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency = 'U.S. Army Corps of Engineers, Huntington District';

// ============================================================================
// NATIONAL REGISTER STATUS
// ============================================================================

export const nationalRegister = false;

// ============================================================================
// CROSS-LINKS (for template discovery)
// ============================================================================

export const crossLinks = {
  nearbyLake: 'summersville',
  nearbyWMA: 'summersville',
  nearbyCampgrounds: ['battle-run'],
};

// ============================================================================
// DEFAULT EXPORT - Combined Data for Historic Template
// ============================================================================

const gadHistoricData: HistoricTemplateProps = {
  name,
  location,
  era,
  significance: historicalContext.significance,
  nationalRegister,
  quickHighlights,
  heroImage,
  heroImageAlt,
  heroImageCredit,
  historicalContext,
  structures,
  tours,
  exhibits,
  education,
  visitorInfo,
  nearbyHistory,
};

export default gadHistoricData;
