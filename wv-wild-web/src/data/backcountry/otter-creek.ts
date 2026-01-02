/**
 * Otter Creek Wilderness Backcountry Data
 * SPEC-17: Complete structured data for BackcountryTemplate
 *
 * All backcountry-specific fields that don't fit in content collections schema.
 * Imported by BackcountryTemplate.astro for rendering.
 *
 * @module data/backcountry/otter-creek
 */

import type {
  BackcountryNavigation,
} from '../../types/navigation-types';
import type { WaterSource } from '../../types/water-safety';
import type { WeatherHazards } from '../../types/weather-hazards';
import type {
  WildlifeHazard,
  BackcountryTrail,
  LeaveNoTracePrinciple,
  RequiredSkill,
  BackcountryAccessibility,
  WildernessArea,
} from '../../types/backcountry-types';
import type {
  TieredEmergencyContact,
  ManagingAgency,
  Regulations,
} from '../../types/backcountry-template-types';

// ============================================================================
// NAVIGATION & COMMUNICATION
// ============================================================================

export const navigation: BackcountryNavigation = {
  coordinates: {
    decimal: { lat: 38.74, lng: -79.71 },
    dms: "38°44'24\"N 79°42'36\"W",
    displayLatLong: "38.74, -79.71",
    datum: 'WGS84',
  },
  cellCoverage: {
    overall: 'weak' as const,
    carriers: [],
    notes: 'Weak and unreliable cell service throughout wilderness. May get signal on higher ridges like Shavers Mountain. Satellite device strongly recommended.',
    nearestSignal: 'Route 72 near Parsons, approximately 8 miles from trailheads',
  },
  usgsQuads: [
    { name: 'Parsons', coverage: 'primary', scale: '1:24000' },
    { name: 'Bowden', coverage: 'primary', scale: '1:24000' },
    { name: 'Harman', coverage: 'partial', scale: '1:24000' },
  ],
  compassDeclination: {
    degrees: 8.5,
    direction: 'W',
    display: '8.5° W',
    referenceYear: 2024,
    source: 'NOAA',
  },
  trailBlazing: {
    system: 'Yellow and orange diamond blazes',
    color: 'yellow',
    shape: 'diamond',
    reliability: 'moderate',
    notes: 'Blazing is inconsistent - yellow on some trails, orange on others. Faded or missing in sections. Carry map and compass.',
    maintainedBy: 'USFS - Monongahela National Forest',
  },
  offlineMapApps: [
    {
      app: 'Gaia GPS',
      tier: 'paid',
      recommendedLayers: ['USGS Topo', 'Satellite hybrid'],
      downloadSize: 'Approximately 45MB for full wilderness coverage',
    },
    {
      app: 'CalTopo',
      tier: 'freemium',
      recommendedLayers: ["7.5' USGS Quads", 'Forest Service trails'],
    },
    {
      app: 'Avenza Maps',
      tier: 'freemium',
      features: ['Import USGS PDF quads', 'GPS tracking on downloaded maps'],
    },
  ],
  navigationDifficulty: 'challenging',
  gpsReliability: 'moderate',
  gpsNotes: 'Forest canopy can block GPS signal in valleys. Paper map and compass essential for backup.',
  paperMapRequired: true,
  navigationTips: [
    'Download offline maps before losing signal',
    'Carry compass and know magnetic declination',
    'Pay attention to trail intersections - not always obvious',
    'Track your mileage to confirm position',
  ],
  satelliteRecommendation: {
    required: true,
    level: 'strongly-recommended',
    compatibleDevices: ['Garmin inReach', 'SPOT', 'Zoleo'],
    coverageNotes: 'Forest canopy may delay satellite transmission - move to clearing for best signal',
    emergencyNotes: 'Most reliable communication method in remote areas of wilderness',
  },
  sarJurisdiction: 'Randolph County Search and Rescue',
  nearestEmergencyServices: 'Randolph County 911 (requires cell signal or satellite device)',
};

// ============================================================================
// WATER SOURCES WITH AMD WARNINGS
// ============================================================================

export const waterSources: WaterSource[] = [
  {
    name: 'Coal Run',
    status: 'do-not-use',
    reliability: 'year-round',
    treatment: 'not-applicable',
    sourceType: 'stream',
    warnings: [
      'AMD contamination from historic coal mining',
      'Orange/rust-colored water visible',
      'Heavy metal contamination cannot be filtered',
    ],
    amdDetails: {
      contaminantType: 'amd',
      visualIndicators: [
        'Orange-colored water',
        'Iron deposits on rocks',
        'Lack of aquatic life',
      ],
      knownSource: 'Historic coal mining operations in Coal Run watershed',
    },
    notes: 'NEVER drink from orange-tinted sections regardless of treatment method',
  },
  {
    name: 'Otter Creek (Main Stem)',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Generally clear and safe when treated. Verify color before collecting - if orange, find different source. Filter and chemically treat for giardia.',
  },
  {
    name: 'Moore Run',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Clear tributary stream. Filter and treat chemically. Reliable water source.',
  },
  {
    name: 'Green Mountain Trail Tributaries',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Small tributary streams along Green Mountain Trail. Flow year-round but reduced in late summer. Filter and treat.',
  },
  {
    name: 'Shavers Mountain Springs',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'spring',
    elevation: 3600,
    notes: 'Springs on eastern slopes of Shavers Mountain. Generally reliable but still recommend treatment.',
    distanceFromTrailhead: '4.5 miles from Condon Run trailhead',
  },
];

export const hasAMDConcerns = true;
export const waterSafetyAdvisory = 'IMPORTANT: Coal Run contains Acid Mine Drainage (AMD) from historic coal mining. Orange-tinted water CANNOT be made safe by any backcountry treatment method. Main stem of Otter Creek and tributary streams are generally clear and safe when treated. Always verify water color before collecting. Carry 4+ liters per person per day.';

// ============================================================================
// EMERGENCY CONTACTS
// ============================================================================

export const emergencyContacts: TieredEmergencyContact[] = [
  {
    tier: 'primary',
    service: '911 (Randolph County)',
    phone: '911',
    available: '24/7',
    notes: 'Requires cell signal (weak in wilderness) or satellite communication',
  },
  {
    tier: 'sar',
    service: 'Randolph County Search and Rescue',
    phone: '304-636-1911',
    available: '24/7',
    responseTime: '4-8 hours typical in wilderness',
    capabilities: ['Ground search', 'Technical rescue', 'Swift water rescue'],
    notes: 'Volunteer SAR team - response depends on weather and access conditions',
  },
  {
    tier: 'agency',
    service: 'Greenbrier Ranger District (USFS)',
    phone: '304-456-3335',
    available: '8am-4:30pm Mon-Fri',
    notes: 'Contact for trip planning, current conditions, and non-emergency assistance',
  },
  {
    tier: 'medical',
    service: 'Davis Memorial Hospital',
    phone: '304-636-3300',
    available: '24/7 Emergency Room',
    notes: 'Level III trauma center in Elkins, approximately 30 minutes from trailheads',
  },
  {
    tier: 'poison',
    service: 'WV Poison Center',
    phone: '1-800-222-1222',
    available: '24/7',
    notes: 'For poisoning emergencies including plant/mushroom ingestion',
  },
];

export const satelliteSOS = {
  importance: 'essential' as const,
  message: 'Cell service is WEAK/UNRELIABLE in Otter Creek Wilderness. A satellite communicator (Garmin inReach, SPOT, Zoleo) is strongly recommended for emergency communication. File a trip plan with someone before entering the wilderness.',
};

export const nearestHospital = {
  name: 'Davis Memorial Hospital',
  distance: '30 minutes',
  traumaLevel: 'Level III',
  address: '812 Gorman Avenue, Elkins, WV 26241',
  phone: '304-636-3300',
  helicopter: 'AirEvac Lifeteam available for critical emergencies',
};

// ============================================================================
// WEATHER HAZARDS
// ============================================================================

export const weatherHazards: WeatherHazards = {
  flashFloods: {
    warningTime: '15-30 minutes',
    highRiskAreas: [
      'Otter Creek valley floor',
      'Stream crossings throughout wilderness',
      'Low-lying camping areas near water',
    ],
    safeBehavior: [
      'Camp at least 200 feet from streams',
      'Never camp in creek bottoms or floodplains',
      'Know multiple escape routes from low areas',
      'Cross streams early in day before afternoon storms',
      'If water turns brown and rises, move to high ground immediately',
    ],
    peakRiskMonths: ['April', 'May', 'June', 'July'],
    gaugeUrls: [],
  },
  lightning: {
    peakHours: '2pm-6pm May through September',
    protocol: [
      'Avoid exposed ridges during thunderstorms',
      'Seek lower elevation if storm approaches',
      'Crouch low in forest if caught in open',
      'Do NOT shelter under isolated tall trees',
    ],
    exposedAreas: [
      'Shavers Mountain ridge',
      'McGowan Mountain ridge',
      'Open areas along ridge trails',
    ],
    quantifiedGuidance: 'If thunder follows lightning by less than 30 seconds, seek dense forest cover immediately',
  },
  temperatureByElevation: {
    baseTemp: '75 degrees F at Parsons (1,700ft) in summer',
    dropPerThousandFeet: '3.5 degrees F per 1,000ft',
    summitEstimate: 'Expect 68-70 degrees F on ridges (3,800ft) when valley is 75 degrees F',
    windChillNote: 'Valleys are sheltered but ridges can have sustained winds - wind chill factor applies',
  },
  rapidOnsetEvents: [
    'Sudden thunderstorms in summer afternoons',
    'Flash flooding after heavy rain',
    'Fog in creek valleys',
    'Temperature drops after cold fronts',
  ],
};

// ============================================================================
// WILDLIFE HAZARDS
// ============================================================================

export const wildlifeHazards: WildlifeHazard[] = [
  {
    species: 'Black Bear',
    threatLevel: 'moderate',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Store food in bear canisters or hang 10+ feet high, 4 feet from trunk',
      'Cook and eat 200+ feet from sleeping area',
      'Never approach or feed bears',
      'Make noise while hiking to avoid surprise encounters',
    ],
    encounterProtocol: [
      'Do NOT run - back away slowly while facing the bear',
      'Make yourself appear large, speak in calm firm voice',
      'If attacked by black bear, FIGHT BACK - do not play dead',
      'Use bear spray if available (aim for face at 20-30 feet)',
    ],
    kimNote: "Bears are more common here than Dolly Sods because of the dense forest. They're around - you just don't see them unless you're careless with food. Keep it clean and you'll be fine.",
  },
  {
    species: 'Timber Rattlesnake',
    threatLevel: 'low',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Watch where you step, especially on rocky areas',
      'Do not reach into rock crevices or under logs',
      'Give snakes space - they will retreat if given opportunity',
    ],
    encounterProtocol: [
      'Freeze, locate the snake, then slowly back away',
      'If bitten, remain calm and seek medical attention immediately',
      'Do NOT cut, suck, or tourniquet the wound',
    ],
    kimNote: "Rattlers are around but you're more likely to see them on sunny rock outcrops than in the deep forest. Watch your step and you'll be fine.",
  },
  {
    species: 'Ticks (Lyme Disease)',
    threatLevel: 'high',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Wear long pants tucked into socks',
      'Apply permethrin to clothing',
      'Use DEET on exposed skin',
      'Check for ticks every few hours and after each hike',
    ],
    encounterProtocol: [
      'Remove tick with fine-tipped tweezers, pulling straight out',
      'Save tick in sealed bag for identification',
      'Watch for bulls-eye rash for 30 days',
      'Seek medical attention if flu-like symptoms develop',
    ],
    diseaseRisks: ['Lyme disease', 'Rocky Mountain Spotted Fever'],
    kimNote: "Ticks are thick here in spring and early summer. Do your checks religiously - morning, midday, and night. I've pulled dozens off after a day in Otter Creek.",
  },
];

// ============================================================================
// REGULATIONS
// ============================================================================

export const regulations: Regulations = {
  permitRequired: false,
  permitInfo: 'No permit required. Self-registration encouraged at trailheads.',
  firePolicies: [
    'Campfires permitted in established fire rings only',
    'Check current fire restrictions before your trip',
    'Campstoves preferred over open fires',
    'Fully extinguish fires before leaving camp',
  ],
  campingRestrictions: [
    'Camp at least 200 feet from trails and water sources',
    'No camping within 0.5 miles of parking areas',
    'Dispersed camping only - no designated sites',
  ],
  groupSizeLimits: 'Maximum 10 persons per group',
  stayLimits: '14-day stay limit within 30-day period',
  specialRestrictions: [
    'Pack out all trash - Leave No Trace',
    'No motorized vehicles or bicycles',
    'Dogs must be under control at all times',
  ],
  huntingAllowed: true,
  huntingNotes: 'Hunting permitted in season with valid WV license. Popular for bear, deer, turkey. Wear blaze orange during hunting seasons (mid-October through December).',
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const accessibility: BackcountryAccessibility = {
  mobilityRating: 'challenging',
  fitnessLevel: 'active',
  companionRequirement: 'buddy_recommended',
  physicalRequirements: [
    'Ability to hike 5+ miles on uneven terrain',
    'Comfortable with stream crossings (knee-deep possible)',
    'Can carry 30+ lb pack for multi-day trips',
    'Able to navigate with map and compass',
  ],
  limitations: [
    'No wheelchair access beyond parking areas',
    'No maintained trails suitable for mobility devices',
    'Trail surfaces are rocky, rooted, and often wet',
    'Multiple stream crossings required',
    'Rescue response may take 4+ hours',
  ],
  trailAccessibility: [
    {
      name: 'Condon Run Trailhead Parking',
      wheelchairAccessible: false,
      details: 'Gravel parking area, no accessible facilities.',
      surfaceType: 'Gravel',
    },
    {
      name: 'All wilderness trails',
      wheelchairAccessible: false,
      details: 'Rocky, rooted terrain with stream crossings. No maintained accessible trails.',
      surfaceType: 'Natural - rock, roots, streams',
    },
  ],
  serviceAnimalPolicy: {
    status: 'restricted',
    description: 'Service animals are legally permitted but handlers should be aware of wilderness hazards including wildlife encounters, stream crossings, and difficult terrain.',
    restrictions: [
      'Must remain under control at all times',
      'Handler responsible for waste removal',
      'Not recommended during bear activity season',
      'Stream crossings may be hazardous for service animals',
    ],
    wildlifeConcerns: ['Black bears active in area', 'Venomous snakes present'],
    adaCompliance: 'Service animals accommodated per ADA requirements. Emotional support animals not permitted in wilderness.',
  },
  ageRequirements: [
    { difficulty: 'easy', minimumAge: 10, notes: 'With guardian - short day hikes only' },
    { difficulty: 'moderate', minimumAge: 14, notes: 'With guardian' },
    { difficulty: 'challenging', minimumAge: 16, notes: 'With experienced guardian or 18+ solo' },
  ],
  medicalConditions: [
    {
      category: 'Cardiovascular',
      conditions: ['Heart disease', 'High blood pressure', 'History of heart attack'],
      rationale: 'Strenuous terrain and remote location place demands on cardiovascular system',
      recommendations: ['Consult physician before visit', 'Know your limits', 'Carry emergency medication'],
    },
    {
      category: 'Respiratory',
      conditions: ['Asthma', 'COPD'],
      rationale: 'Exertion on steep terrain can exacerbate respiratory conditions',
      recommendations: ['Bring rescue inhaler', 'Monitor symptoms closely'],
    },
  ],
  evacuationNotes: 'Ground evacuation from remote areas may take 4-8 hours. Helicopter evacuation available for life-threatening emergencies only and dependent on weather/terrain.',
  nearestMedicalFacility: 'Davis Memorial Hospital, Elkins WV - approximately 30 minutes from trailheads',
  cellCoverage: 'Weak and unreliable in wilderness. Satellite communicator strongly recommended.',
  satelliteCommRequired: true,
};

// ============================================================================
// TRAIL SYSTEM
// ============================================================================

export const trails: BackcountryTrail[] = [
  {
    name: 'Otter Creek Trail (TR 131)',
    trailNumber: 'TR 131',
    distance: '11 miles',
    elevationGain: '600 ft',
    difficulty: 'challenging',
    blazing: 'Yellow diamonds',
    waterSourceCount: 5,
    hazards: ['Multiple stream crossings', 'Flash flood risk', 'Some AMD-contaminated tributaries'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'This is the main artery through the wilderness. Expect to get your feet wet - the stream crossings are part of the experience. Beautiful in any season.',
  },
  {
    name: 'Moore Run Trail (TR 139)',
    trailNumber: 'TR 139',
    distance: '3.5 miles',
    elevationGain: '1,200 ft',
    difficulty: 'challenging',
    blazing: 'Orange diamonds',
    waterSourceCount: 2,
    hazards: ['Steep climbs', 'Rocky terrain'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'Good connector to Shavers Mountain. The climb is a workout but the ridge views are worth it.',
  },
  {
    name: 'Green Mountain Trail (TR 132)',
    trailNumber: 'TR 132',
    distance: '5.8 miles',
    elevationGain: '800 ft',
    difficulty: 'moderate',
    blazing: 'Yellow diamonds',
    waterSourceCount: 3,
    hazards: ['Faded blazes in sections', 'Some overgrown areas'],
    bestSeasons: ['summer', 'fall'],
    kimNote: 'Less traveled than Otter Creek Trail. Good for solitude but watch your navigation - blazes can be hard to follow.',
  },
  {
    name: 'Mylius Trail (TR 135)',
    trailNumber: 'TR 135',
    distance: '2.3 miles',
    elevationGain: '400 ft',
    difficulty: 'moderate',
    blazing: 'Orange diamonds',
    waterSourceCount: 1,
    hazards: ['Rocky sections'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'Short connector trail. Useful for loop trips.',
  },
];

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency: ManagingAgency = {
  name: 'Monongahela National Forest',
  jurisdiction: 'USDA Forest Service',
  type: 'usfs',
  rangerDistrict: 'Greenbrier Ranger District',
  contact: {
    phone: '304-456-3335',
    website: 'https://www.fs.usda.gov/recarea/mnf/recarea/?recid=12364',
  },
};

// ============================================================================
// WILDERNESS DESIGNATION
// ============================================================================

export const wildernessArea: WildernessArea = {
  name: 'Otter Creek Wilderness',
  designation: 'wilderness',
  established: 1975,
  acreage: 20000,
  managedBy: 'usfs',
  specialDesignations: ['Federal Wilderness Area'],
  highlights: ['Old-growth forest', 'Remote backcountry', 'Stream valley wilderness'],
};

// ============================================================================
// REQUIRED SKILLS
// ============================================================================

export const requiredSkills: RequiredSkill[] = [
  {
    category: 'navigation',
    importance: 'essential',
    skills: [
      'Topographic map reading',
      'Compass navigation',
      'GPS operation',
      'Route-finding with inconsistent blazes',
    ],
  },
  {
    category: 'first-aid',
    importance: 'essential',
    skills: [
      'First aid certification',
      'Hypothermia recognition',
      'Tick removal',
      'Wildlife encounter response',
    ],
  },
  {
    category: 'survival',
    importance: 'recommended',
    skills: [
      'Leave No Trace principles',
      'Bear-proof food storage',
      'Water filtration',
      'Stream crossing techniques',
    ],
  },
];

// ============================================================================
// LEAVE NO TRACE PRINCIPLES
// ============================================================================

export const leaveNoTrace: LeaveNoTracePrinciple[] = [
  {
    principle: 'Plan Ahead and Prepare',
    guidelines: [
      'Download offline maps before losing signal',
      'File trip plan with emergency contact',
      'Check weather forecast and fire restrictions',
      'Carry satellite communicator',
    ],
  },
  {
    principle: 'Travel and Camp on Durable Surfaces',
    guidelines: [
      'Camp 200 feet from trails and water',
      'Use existing campsites when possible',
      'Avoid creating new trails or campsites',
      'Stay on designated trails when possible',
    ],
  },
  {
    principle: 'Dispose of Waste Properly',
    guidelines: [
      'Pack out ALL trash including food scraps',
      'Bury human waste 200 feet from water',
      'Pack out toilet paper or bury in cathole',
      'Strain dishwater and scatter 200 feet from water',
    ],
  },
  {
    principle: 'Leave What You Find',
    guidelines: [
      'Do not disturb old-growth trees or vegetation',
      'Leave rocks, plants, and artifacts as you find them',
      'Do not build structures or dig trenches',
      'Respect historical and natural features',
    ],
  },
  {
    principle: 'Minimize Campfire Impact',
    guidelines: [
      'Use camp stove instead of fires when possible',
      'Use existing fire rings only',
      'Burn all wood to ash and scatter cooled ashes',
      'Check fire restrictions before building fires',
    ],
  },
  {
    principle: 'Respect Wildlife',
    guidelines: [
      'Store food in bear canisters or hang properly',
      'Never feed or approach wildlife',
      'Control pets at all times',
      'Avoid wildlife during sensitive times (nesting, mating)',
    ],
  },
  {
    principle: 'Be Considerate of Other Visitors',
    guidelines: [
      'Keep noise levels low',
      'Yield to other hikers on trails',
      'Camp out of sight/sound of trails and others',
      'Let nature sounds prevail - avoid loud voices and music',
    ],
  },
];
