/**
 * Cranberry Wilderness Backcountry Data
 * SPEC-17: Complete structured data for BackcountryTemplate
 *
 * All backcountry-specific fields that don't fit in content collections schema.
 * Imported by BackcountryTemplate.astro for rendering.
 *
 * @module data/backcountry/cranberry
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
    decimal: { lat: 38.28, lng: -80.28 },
    dms: "38°16'48\"N 80°16'48\"W",
    displayLatLong: "38.28, -80.28",
    datum: 'WGS84',
  },
  cellCoverage: {
    overall: 'none' as const,
    carriers: [],
    notes: 'No reliable cell service anywhere in the wilderness. Nearest signal is along Route 39/55 corridor near Richwood.',
    nearestSignal: 'Route 39/55 near Richwood, approximately 8-10 miles from interior trailheads',
  },
  usgsQuads: [
    { name: 'Webster Springs NE', coverage: 'primary', scale: '1:24000' },
    { name: 'Woodrow', coverage: 'primary', scale: '1:24000' },
    { name: 'Lobelia', coverage: 'partial', scale: '1:24000' },
    { name: 'Hillsboro', coverage: 'partial', scale: '1:24000' },
  ],
  compassDeclination: {
    degrees: 8.5,
    direction: 'W',
    display: '8.5° W',
    referenceYear: 2024,
    source: 'NOAA',
  },
  trailBlazing: {
    system: 'Blue paint blazes',
    color: 'blue',
    shape: 'rectangle',
    reliability: 'moderate',
    notes: 'Blazes present but faded on less-traveled trails. Some trails follow old logging grades that are obvious without blazing. Map and compass essential.',
    maintainedBy: 'USFS - Monongahela National Forest',
  },
  offlineMapApps: [
    {
      app: 'Gaia GPS',
      tier: 'paid',
      recommendedLayers: ['USGS Topo', 'Satellite hybrid'],
      downloadSize: 'Approximately 80MB for full wilderness coverage',
    },
    {
      app: 'CalTopo',
      tier: 'freemium',
      recommendedLayers: ["7.5' USGS Quads", 'Slope angle shading'],
    },
    {
      app: 'Avenza Maps',
      tier: 'freemium',
      features: ['Import USGS PDF quads', 'GPS tracking on downloaded maps'],
    },
  ],
  navigationDifficulty: 'challenging',
  gpsReliability: 'reliable',
  gpsNotes: 'GPS works well under forest canopy. Battery life is the main concern - carry backup power or spare batteries.',
  paperMapRequired: true,
  navigationTips: [
    'Download offline maps before losing signal',
    'Carry compass and know magnetic declination',
    'Some trails follow old logging roads - easy to follow but watch for overgrown sections',
    'Ridge trails can be faint - stay alert for blazes',
  ],
  satelliteRecommendation: {
    required: true,
    level: 'required',
    compatibleDevices: ['Garmin inReach', 'SPOT', 'Zoleo'],
    coverageNotes: 'Dense forest canopy can delay transmission - move to clearing for best signal',
    emergencyNotes: 'Only reliable communication method in wilderness. Response times can exceed 4 hours.',
  },
  sarJurisdiction: 'Pocahontas County Search and Rescue',
  nearestEmergencyServices: 'Pocahontas County 911 (requires satellite device)',
};

// ============================================================================
// WATER SOURCES WITH AMD WARNINGS
// ============================================================================

export const waterSources: WaterSource[] = [
  {
    name: 'Cranberry River (Lower Sections near Williams River)',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'treat-if-clear',
    sourceType: 'stream',
    warnings: [
      'Some AMD discoloration from mining outside wilderness',
      'If water shows orange tint, do not use',
      'Upper sections generally clean',
    ],
    amdDetails: {
      contaminantType: 'amd',
      visualIndicators: [
        'Slight orange tinting in lower sections',
        'Iron deposits on rocks in affected areas',
      ],
      knownSource: 'Historic mining operations outside wilderness boundary',
    },
    notes: 'Verify water color before treating. If clear, filter and chemically treat for giardia. If orange-tinted, do not use.',
  },
  {
    name: 'Cranberry River (Upper Sections)',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Clean cold water above the confluence areas. Filter and treat chemically for giardia and cryptosporidium.',
  },
  {
    name: 'Lick Branch',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Beautiful tributary stream. Reliable in spring and early summer. May run low by late August.',
  },
  {
    name: 'North Fork Cranberry River',
    status: 'treat-required',
    reliability: 'year-round',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Clean water source. Filter and treat for pathogens. Reliable flow year-round.',
  },
  {
    name: 'High Elevation Springs (various)',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'spring',
    notes: 'Several springs along ridge trails. Flow varies by season. Always treat despite clarity.',
  },
  {
    name: 'Tributary Streams',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Numerous small tributaries feed the Cranberry system. Most reliable in wet seasons. Many dry up by late summer.',
  },
];

export const hasAMDConcerns = true;
export const waterSafetyAdvisory = 'CAUTION: Lower sections of the Cranberry River near the Williams River confluence can show AMD discoloration from historic mining operations outside the wilderness. If water appears orange-tinted, do not use it. Upper tributaries and the North Fork are generally clean but all water requires filtration and chemical treatment for giardia. Plan water carries - some streams run low by late summer.';

// ============================================================================
// EMERGENCY CONTACTS
// ============================================================================

export const emergencyContacts: TieredEmergencyContact[] = [
  {
    tier: 'primary',
    service: '911 (Pocahontas County)',
    phone: '911',
    available: '24/7',
    notes: 'Requires cell signal or satellite communication. No cell service in wilderness.',
  },
  {
    tier: 'sar',
    service: 'Pocahontas County Search and Rescue',
    phone: '304-799-4567',
    available: '24/7',
    responseTime: '4-8 hours typical in wilderness interior',
    capabilities: ['Technical rescue', 'Ground search', 'Wilderness recovery'],
    notes: 'Volunteer SAR team - response depends on weather, terrain access, and volunteer availability',
  },
  {
    tier: 'agency',
    service: 'Marlinton Ranger District (USFS)',
    phone: '304-799-4334',
    available: '8am-4:30pm Mon-Fri',
    notes: 'Contact for trip planning, current trail conditions, and non-emergency assistance',
  },
  {
    tier: 'medical',
    service: 'Pocahontas Memorial Hospital',
    phone: '304-799-7400',
    available: '24/7 Emergency Services',
    notes: 'Critical Access Hospital in Buckeye, approximately 30 miles from eastern trailheads. Closer than Davis Memorial Hospital.',
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
  message: 'Cell service is UNAVAILABLE in Cranberry Wilderness. A satellite communicator (Garmin inReach, SPOT, Zoleo) is essential for emergency communication. File a trip plan with someone before entering the wilderness. Response times can exceed 4 hours given remoteness.',
};

export const nearestHospital = {
  name: 'Pocahontas Memorial Hospital',
  distance: '30 miles from eastern trailheads',
  traumaLevel: 'Critical Access Hospital',
  address: '150 Duncan Road, Buckeye, WV 24924',
  phone: '304-799-7400',
  helicopter: 'AirEvac Lifeteam available for critical emergencies',
};

// ============================================================================
// WEATHER HAZARDS
// ============================================================================

export const weatherHazards: WeatherHazards = {
  flashFloods: {
    warningTime: '30-60 minutes',
    highRiskAreas: [
      'Cranberry River valley floor',
      'Lick Branch drainage',
      'All stream crossings',
      'Low-lying campsites near water',
    ],
    safeBehavior: [
      'Camp at least 200 feet from streams',
      'Never camp in narrow valley bottoms',
      'Know escape routes to higher ground',
      'Cross streams early in the day before afternoon storms',
    ],
    peakRiskMonths: ['April', 'May', 'June', 'July', 'August'],
    gaugeUrls: ['https://waterdata.usgs.gov/monitoring-location/03187500/'],
  },
  lightning: {
    peakHours: '2pm-6pm May through September',
    protocol: [
      'Begin descent from exposed ridges by noon',
      'Avoid single tall trees',
      'Crouch low if caught in open - lightning position',
      'Wait 30 minutes after last thunder before resuming travel',
    ],
    exposedAreas: [
      'Black Mountain ridge',
      'Cranberry Ridge Trail',
      'North-South Trail ridge sections',
      'Any high ridge above 4,000ft',
    ],
    quantifiedGuidance: 'If thunder follows lightning by less than 30 seconds (6 miles), seek lower elevation immediately',
  },
  temperatureByElevation: {
    baseTemp: '75 degrees F at Richwood (2,000ft) in summer',
    dropPerThousandFeet: '3.5 degrees F per 1,000ft',
    summitEstimate: 'Expect 65-68 degrees F on Black Mountain (4,633ft) when valley is 75 degrees F',
    windChillNote: 'Ridge winds 15-25 mph common - wind chill can be 10-15 degrees F lower than actual temperature',
  },
  rapidOnsetEvents: [
    'Sudden afternoon thunderstorms',
    'Mountain fog reducing visibility',
    'Temperature drops with storm fronts',
    'Flash flooding in stream valleys',
  ],
};

// ============================================================================
// WILDLIFE HAZARDS
// ============================================================================

export const wildlifeHazards: WildlifeHazard[] = [
  {
    species: 'Black Bear',
    threatLevel: 'high',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Store food in bear canisters or hang 10+ feet high, 4 feet from trunk',
      'Cook and eat 200+ feet from sleeping area',
      'Never approach or feed bears',
      'Make noise while hiking to avoid surprise encounters',
      'Keep clean camp - no food odors in tent',
    ],
    encounterProtocol: [
      'Do NOT run - back away slowly while facing the bear',
      'Make yourself appear large, speak in calm firm voice',
      'If attacked by black bear, FIGHT BACK - do not play dead',
      'Use bear spray if available (aim for face at 20-30 feet)',
    ],
    kimNote: "Cranberry has one of the healthiest bear populations in West Virginia. I see sign every trip - tracks, scat, torn logs. They're here and they're active. Hang your food right, keep a clean camp, and you'll be fine. This is their home.",
  },
  {
    species: 'Timber Rattlesnake',
    threatLevel: 'moderate',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Watch where you step, especially on rocky areas',
      'Do not reach into rock crevices or under logs',
      'Give snakes space - they will retreat if given opportunity',
      'Wear boots and long pants',
    ],
    encounterProtocol: [
      'Freeze, locate the snake, then slowly back away',
      'If bitten, remain calm and seek medical attention immediately',
      'Do NOT cut, suck, or tourniquet the wound',
      'Note snake description for medical personnel',
    ],
    kimNote: "Rattlers are here but they're shy. Watch your step on the rocks and don't put your hands where you can't see. Give them space and they'll leave you alone.",
  },
  {
    species: 'Ticks (Lyme Disease)',
    threatLevel: 'high',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Wear long pants tucked into socks',
      'Apply permethrin to clothing before trip',
      'Use DEET on exposed skin',
      'Check for ticks every few hours and after each hike',
      'Walk center of trail - avoid brushy edges',
    ],
    encounterProtocol: [
      'Remove tick with fine-tipped tweezers, pulling straight out',
      'Save tick in sealed bag for identification',
      'Watch for bulls-eye rash for 30 days',
      'Seek medical attention if flu-like symptoms develop',
    ],
    diseaseRisks: ['Lyme disease', 'Rocky Mountain Spotted Fever', 'Alpha-gal syndrome'],
    kimNote: "Ticks are thick here, especially in spring and early summer. Do your tick checks religiously - every break, every night. I've had Lyme and you don't want it.",
  },
];

// ============================================================================
// REGULATIONS
// ============================================================================

export const regulations: Regulations = {
  permitRequired: false,
  permitInfo: 'No permit required. Self-registration encouraged at trailheads for search-and-rescue purposes.',
  firePolicies: [
    'Campfires permitted but discouraged - use camp stove',
    'Use existing fire rings only',
    'No fires during high fire danger periods',
    'Check current fire restrictions before your trip',
    'Fully extinguish fires - dead out',
  ],
  campingRestrictions: [
    'Camp at least 200 feet from trails and water sources',
    'No camping within 0.5 miles of parking areas or roads',
    'Dispersed camping only - no designated sites',
    'Use existing campsites when available to minimize impact',
  ],
  groupSizeLimits: 'Maximum 10 persons per group',
  stayLimits: '14-day stay limit within 30-day period',
  specialRestrictions: [
    'Pack out all trash - Leave No Trace',
    'No motorized vehicles or bicycles in wilderness',
    'Dogs must be under control at all times',
    'No cutting of live trees or vegetation',
  ],
  huntingAllowed: true,
  huntingNotes: 'Hunting permitted in season with valid WV license. Popular for black bear, white-tailed deer, grouse, and turkey. Wear blaze orange during fall hunting seasons (mid-October through December).',
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const accessibility: BackcountryAccessibility = {
  mobilityRating: 'rugged',
  fitnessLevel: 'active',
  companionRequirement: 'buddy_recommended',
  physicalRequirements: [
    'Ability to hike 8+ miles on steep terrain',
    'Comfortable with multiple stream crossings',
    'Can carry 30+ lb pack for multi-day trips',
    'Able to navigate with map and compass',
  ],
  limitations: [
    'No wheelchair access beyond parking areas',
    'No maintained trails suitable for mobility devices',
    'Trail surfaces are rocky, rooted, and often wet',
    'Rescue response may take 4-8 hours in interior',
  ],
  trailAccessibility: [
    {
      name: 'Cranberry Mountain Nature Center',
      wheelchairAccessible: true,
      details: 'Accessible restrooms and nature center at Route 39/55. Educational displays about the wilderness.',
      surfaceType: 'Paved',
    },
    {
      name: 'All wilderness trails',
      wheelchairAccessible: false,
      details: 'Rugged terrain, stream crossings, steep grades. No maintained accessible trails.',
      surfaceType: 'Natural - rock, roots, mud',
    },
  ],
  serviceAnimalPolicy: {
    status: 'restricted',
    description: 'Service animals are legally permitted but handlers should be aware of significant wilderness hazards including black bears, rugged terrain, and stream crossings.',
    restrictions: [
      'Must remain under control at all times',
      'Handler responsible for waste removal',
      'Not recommended during peak bear activity (June-October)',
    ],
    wildlifeConcerns: ['High black bear population', 'Venomous snakes present'],
    adaCompliance: 'Service animals accommodated per ADA requirements. Emotional support animals not permitted in wilderness.',
  },
  ageRequirements: [
    { difficulty: 'moderate', minimumAge: 10, notes: 'With experienced guardian - day hikes only' },
    { difficulty: 'challenging', minimumAge: 14, notes: 'With experienced guardian' },
    { difficulty: 'rugged', minimumAge: 16, notes: 'With experienced guardian or 18+ solo' },
  ],
  medicalConditions: [
    {
      category: 'Cardiovascular',
      conditions: ['Heart disease', 'High blood pressure', 'History of heart attack'],
      rationale: 'Steep terrain and elevation changes place significant demands on cardiovascular system',
      recommendations: ['Consult physician before visit', 'Know your limits', 'Carry emergency medication'],
    },
    {
      category: 'Respiratory',
      conditions: ['Asthma', 'COPD'],
      rationale: 'Elevation and exertion can exacerbate respiratory conditions',
      recommendations: ['Bring rescue inhaler', 'Acclimatize gradually', 'Turn back if symptoms worsen'],
    },
  ],
  evacuationNotes: 'Ground evacuation from interior can take 4-8 hours depending on location and weather. Helicopter evacuation available for life-threatening emergencies but dependent on weather, daylight, and landing zone availability.',
  nearestMedicalFacility: 'Pocahontas Memorial Hospital, Buckeye WV - approximately 30 miles from eastern trailheads',
  cellCoverage: 'No cell coverage in wilderness. Nearest signal along Route 39/55 corridor.',
  satelliteCommRequired: true,
};

// ============================================================================
// TRAIL SYSTEM
// ============================================================================

export const trails: BackcountryTrail[] = [
  {
    name: 'Cranberry Ridge Trail (TR 206)',
    trailNumber: 'TR 206',
    distance: '14.2 miles',
    elevationGain: '2,200 ft cumulative',
    difficulty: 'challenging',
    blazing: 'Blue paint blazes',
    waterSourceCount: 2,
    hazards: ['Exposed ridge sections', 'Lightning risk', 'Long water carries'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'The main artery through the wilderness. Ridge walking with good views but you earn them. Water sources are sparse - plan your carries.',
  },
  {
    name: 'Cow Pasture Trail (TR 201)',
    trailNumber: 'TR 201',
    distance: '6.8 miles',
    elevationGain: '1,400 ft',
    difficulty: 'challenging',
    blazing: 'Blue paint blazes',
    waterSourceCount: 3,
    campsites: ['Lower Cow Pasture campsite', 'Upper elevation sites'],
    hazards: [
      'Stream crossings',
      'Steep descent to Cranberry River',
    ],
    bestSeasons: ['summer', 'fall'],
    kimNote: 'Good access trail from the north. Steep in places but well-graded. Crosses several streams - nice water sources.',
  },
  {
    name: 'Lick Branch Trail (TR 267)',
    trailNumber: 'TR 267',
    distance: '5.4 miles',
    elevationGain: '800 ft',
    difficulty: 'moderate',
    blazing: 'Blue paint blazes',
    waterSourceCount: 4,
    hazards: ['Multiple stream crossings', 'Overgrown sections'],
    bestSeasons: ['summer', 'fall'],
    kimNote: 'Beautiful trail along the creek. Less traveled than the main routes. Can be overgrown in places but worth it for the solitude.',
  },
  {
    name: 'North-South Trail (TR 688)',
    trailNumber: 'TR 688',
    distance: '8.3 miles (within wilderness)',
    elevationGain: '1,600 ft',
    difficulty: 'challenging',
    blazing: 'Blue paint blazes',
    waterSourceCount: 2,
    hazards: ['Rocky terrain', 'Ridge exposure'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'Part of the longer North-South Trail system. Rugged ridge walking through here. Scenic but demanding.',
  },
];

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency: ManagingAgency = {
  name: 'Monongahela National Forest',
  jurisdiction: 'USDA Forest Service',
  type: 'usfs',
  rangerDistrict: 'Marlinton Ranger District',
  contact: {
    phone: '304-799-4334',
    website: 'https://www.fs.usda.gov/recarea/mnf/recarea/?recid=7051',
  },
};

// ============================================================================
// WILDERNESS DESIGNATION
// ============================================================================

export const wildernessArea: WildernessArea = {
  name: 'Cranberry Wilderness',
  designation: 'wilderness',
  established: 1983,
  acreage: 35864,
  managedBy: 'usfs',
  specialDesignations: ['Federal Wilderness Area', 'Cranberry River - National Wild and Scenic River'],
  highlights: ['Largest wilderness in Monongahela NF', 'Wild trout streams', 'High-elevation bogs', 'Old-growth forest remnants'],
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
      'Route-finding on faint trails',
    ],
  },
  {
    category: 'first-aid',
    importance: 'essential',
    skills: [
      'Wilderness first aid certification',
      'Tick removal and Lyme awareness',
      'Wildlife encounter response',
      'Heat and cold injury recognition',
    ],
  },
  {
    category: 'survival',
    importance: 'recommended',
    skills: [
      'Leave No Trace principles',
      'Bear-proof food storage',
      'Water filtration and treatment',
      'Stream crossing techniques',
      'Backcountry meal planning',
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
      'Know water source locations',
    ],
  },
  {
    principle: 'Travel and Camp on Durable Surfaces',
    guidelines: [
      'Camp 200 feet from trails and water',
      'Use existing campsites when possible',
      'Avoid camping on vegetation or in sensitive bog areas',
      'Stay on established trails when possible',
    ],
  },
  {
    principle: 'Dispose of Waste Properly',
    guidelines: [
      'Pack out ALL trash including food scraps and micro-trash',
      'Bury human waste 6 inches deep, 200 feet from water',
      'Pack out toilet paper or bury in cathole',
      'Strain dishwater and scatter 200 feet from water',
    ],
  },
  {
    principle: 'Leave What You Find',
    guidelines: [
      'Do not disturb old-growth forest or rare plants',
      'Leave rocks, plants, and artifacts as you find them',
      'Do not build structures or dig trenches',
      'Respect historical sites',
    ],
  },
  {
    principle: 'Minimize Campfire Impact',
    guidelines: [
      'Use camp stove instead of fires (strongly encouraged)',
      'Use existing fire rings only if fire is necessary',
      'No fires during high fire danger',
      'Burn all wood to ash and scatter cooled ashes',
    ],
  },
  {
    principle: 'Respect Wildlife',
    guidelines: [
      'Store food in bear canisters or hang properly (10ft high, 4ft from trunk)',
      'Never feed or approach wildlife, especially bears',
      'Control pets at all times',
      'Make noise on trails to avoid surprising bears',
      'Camp away from game trails and water sources',
    ],
  },
  {
    principle: 'Be Considerate of Other Visitors',
    guidelines: [
      'Keep noise levels low - preserve wilderness experience',
      'Yield to other hikers on trails',
      'Camp out of sight and sound of trails and others',
      'Let natural sounds prevail',
    ],
  },
];
