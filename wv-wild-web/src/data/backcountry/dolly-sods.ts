/**
 * Dolly Sods Wilderness Backcountry Data
 * SPEC-17: Complete structured data for BackcountryTemplate
 *
 * All backcountry-specific fields that don't fit in content collections schema.
 * Imported by BackcountryTemplate.astro for rendering.
 *
 * @module data/backcountry/dolly-sods
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
    decimal: { lat: 39.03, lng: -79.35 },
    dms: "39°01'48\"N 79°21'00\"W",
    displayLatLong: "39.03, -79.35",
    datum: 'WGS84',
  },
  usgsQuads: [
    { name: 'Hopeville', coverage: 'primary', scale: '1:24000' },
    { name: 'Blackbird Knob', coverage: 'primary', scale: '1:24000' },
    { name: 'Laneville', coverage: 'partial', scale: '1:24000' },
    { name: 'Petersburg West', coverage: 'partial', scale: '1:24000' },
  ],
  compassDeclination: {
    degrees: 8.2,
    direction: 'W',
    display: '8.2° W',
    referenceYear: 2024,
    source: 'NOAA',
  },
  trailBlazing: {
    system: 'Blue diamond blazes',
    color: 'blue',
    shape: 'diamond',
    reliability: 'moderate',
    notes: 'Blazes faded in some areas, especially in dense fog. Carry compass and map at all times.',
    maintainedBy: 'USFS - Monongahela National Forest',
  },
  offlineMapApps: [
    {
      app: 'Gaia GPS',
      tier: 'paid',
      recommendedLayers: ['USGS Topo', 'Satellite hybrid'],
      downloadSize: 'Approximately 50MB for full wilderness coverage',
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
  navigationDifficulty: 'expert',
  gpsReliability: 'unreliable',
  gpsNotes: 'Dense fog and forest canopy can block GPS signal. Paper map and compass essential.',
  paperMapRequired: true,
  navigationTips: [
    'Download offline maps before losing signal',
    'Carry compass and know magnetic declination',
    'Trail blazes fade in fog - follow compass bearing',
  ],
  satelliteRecommendation: {
    required: true,
    level: 'required',
    compatibleDevices: ['Garmin inReach', 'SPOT', 'Zoleo'],
    coverageNotes: 'Clear sky view required - heavy fog can delay transmission',
    emergencyNotes: 'Only reliable communication method in wilderness',
  },
  sarJurisdiction: 'Tucker County Search and Rescue',
  nearestEmergencyServices: 'Tucker County 911 (requires satellite device)',
};

// ============================================================================
// WATER SOURCES WITH AMD WARNINGS
// ============================================================================

export const waterSources: WaterSource[] = [
  {
    name: 'Red Creek (Lower Sections)',
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
        'Absence of aquatic life',
      ],
      knownSource: 'Historic coal mining operations in Red Creek watershed',
    },
    notes: 'NEVER drink from orange-tinted sections regardless of treatment method',
  },
  {
    name: 'Red Creek (Upper Sections above Blackbird Knob)',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Cleaner above the mining impacts but still requires treatment. Verify color before treating - if orange, do not use.',
  },
  {
    name: 'Stonecoal Run',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Flows from North Fork Mountain. Filter and treat chemically for giardia.',
  },
  {
    name: 'Cabin Mountain Spring',
    status: 'safe',
    reliability: 'year-round',
    treatment: 'none-required',
    sourceType: 'spring',
    elevation: 4200,
    notes: 'Reliable year-round spring. One of the few potable sources without treatment, but recommended to treat anyway.',
    distanceFromTrailhead: '3.2 miles from Bear Rocks',
  },
  {
    name: 'Fisher Spring Run',
    status: 'treat-required',
    reliability: 'seasonal',
    treatment: 'filter',
    sourceType: 'stream',
    notes: 'Good water source in wet seasons. May be dry by late August.',
  },
];

export const hasAMDConcerns = true;
export const waterSafetyAdvisory = 'CRITICAL: Dolly Sods contains streams contaminated with Acid Mine Drainage (AMD) from historic coal mining. Orange-tinted water CANNOT be made safe by any backcountry treatment method. Always verify water color before collecting. Carry extra water - plan on 4+ liters per person per day.';

// ============================================================================
// EMERGENCY CONTACTS
// ============================================================================

export const emergencyContacts: TieredEmergencyContact[] = [
  {
    tier: 'primary',
    service: '911 (Tucker County)',
    phone: '911',
    available: '24/7',
    notes: 'Requires cell signal or satellite communication',
  },
  {
    tier: 'sar',
    service: 'Tucker County Search and Rescue',
    phone: '304-478-2431',
    available: '24/7',
    responseTime: '4-8 hours typical in wilderness',
    capabilities: ['Technical rescue', 'Ground search', 'K9 units'],
    notes: 'Volunteer SAR team - response depends on weather and access conditions',
  },
  {
    tier: 'agency',
    service: 'Cheat Ranger District (USFS)',
    phone: '304-478-3251',
    available: '8am-4:30pm Mon-Fri',
    notes: 'Contact for trip planning, current conditions, and non-emergency assistance',
  },
  {
    tier: 'medical',
    service: 'Davis Memorial Hospital',
    phone: '304-636-3300',
    available: '24/7 Emergency Room',
    notes: 'Level III trauma center in Elkins, approximately 45 minutes from trailheads',
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
  message: 'Cell service is UNAVAILABLE in Dolly Sods. A satellite communicator (Garmin inReach, SPOT, Zoleo) is essential for emergency communication. File a trip plan with someone before entering the wilderness.',
};

export const nearestHospital = {
  name: 'Davis Memorial Hospital',
  distance: '45 minutes',
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
      'Red Creek canyon floor',
      'Stream crossings throughout wilderness',
      'Low-lying bog areas',
    ],
    safeBehavior: [
      'Camp at least 200 feet from streams',
      'Never camp in the Red Creek gorge',
      'Know multiple escape routes from low areas',
      'Cross streams early in the day before afternoon storms',
    ],
    peakRiskMonths: ['May', 'June', 'July', 'August'],
    gaugeUrls: ['https://waterdata.usgs.gov/monitoring-location/03066000/'],
  },
  lightning: {
    peakHours: '2pm-6pm May through September',
    protocol: [
      'Begin descent from exposed areas by noon',
      'Avoid single trees and open meadows',
      'Crouch low if caught in open - lightning position',
      'Do NOT shelter under rock overhangs',
    ],
    exposedAreas: [
      'Bear Rocks area',
      'Breathed Mountain ridge',
      'All heath barrens above 4,000ft',
      'Red Creek Plains',
    ],
    quantifiedGuidance: 'If thunder follows lightning by less than 30 seconds, seek lower elevation immediately',
  },
  temperatureByElevation: {
    baseTemp: '70 degrees F at Laneville (2,000ft) in summer',
    dropPerThousandFeet: '3.5 degrees F per 1,000ft',
    summitEstimate: 'Expect 55-60 degrees F at Bear Rocks (4,800ft) when valley is 75 degrees F',
    windChillNote: 'Summit winds 20-40 mph common - wind chill can be 20 degrees F lower than actual temperature',
  },
  rapidOnsetEvents: [
    'Dense mountain fog (visibility under 50 feet)',
    'Sudden thunderstorms',
    'Wind gusts exceeding 60 mph on exposed ridges',
    'Flash freezing in spring/fall',
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
    kimNote: "Black bears are common up here - I've seen them every season. They want your food, not you. Keep a clean camp and make noise on the trail. Never had a problem in 30 years of hiking these mountains.",
  },
  {
    species: 'Timber Rattlesnake',
    threatLevel: 'moderate',
    seasons: ['spring', 'summer', 'fall'],
    avoidanceBehavior: [
      'Watch where you step, especially on rocky outcrops',
      'Do not reach into rock crevices or under logs',
      'Give snakes space - they will retreat if given opportunity',
    ],
    encounterProtocol: [
      'Freeze, locate the snake, then slowly back away',
      'If bitten, remain calm and seek medical attention immediately',
      'Do NOT cut, suck, or tourniquet the wound',
    ],
    kimNote: "Rattlers are more scared of you than you are of them. Watch your step on the rocks and they'll leave you alone.",
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
    kimNote: "Ticks are the real threat out here. Do your tick checks every night - I find them even with all my precautions. Lyme disease is no joke.",
  },
];

// ============================================================================
// REGULATIONS
// ============================================================================

export const regulations: Regulations = {
  permitRequired: false,
  permitInfo: 'No permit required. Self-registration encouraged at trailheads.',
  firePolicies: [
    'No campfires above 4,000 feet during high fire danger',
    'Use existing fire rings only when fires are permitted',
    'Campstoves always preferred over open fires',
    'Check current fire restrictions before your trip',
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
  huntingNotes: 'Hunting permitted in season with valid WV license. Popular for bear, deer, and grouse. Wear blaze orange during hunting seasons.',
};

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const accessibility: BackcountryAccessibility = {
  mobilityRating: 'rugged',
  fitnessLevel: 'active',
  companionRequirement: 'buddy_recommended',
  physicalRequirements: [
    'Ability to hike 5+ miles on uneven terrain',
    'Comfortable with stream crossings (may be knee-deep)',
    'Can carry 30+ lb pack for multi-day trips',
    'Able to navigate in dense fog with compass',
  ],
  limitations: [
    'No wheelchair access beyond parking areas',
    'No maintained trails suitable for mobility devices',
    'Trail surfaces are rocky, rooted, and often boggy',
    'Rescue response may take 4+ hours',
  ],
  trailAccessibility: [
    {
      name: 'Bear Rocks Trailhead Parking',
      wheelchairAccessible: true,
      details: 'Paved parking lot with accessible restroom. Views possible from parking area.',
      surfaceType: 'Paved',
    },
    {
      name: 'All wilderness trails',
      wheelchairAccessible: false,
      details: 'Rocky, rooted, boggy terrain. No maintained accessible trails.',
      surfaceType: 'Natural - rock, roots, bog',
    },
  ],
  serviceAnimalPolicy: {
    status: 'restricted',
    description: 'Service animals are legally permitted but handlers should be aware of wilderness hazards including wildlife encounters and difficult terrain.',
    restrictions: [
      'Must remain under control at all times',
      'Handler responsible for waste removal',
      'Not recommended during bear activity season',
    ],
    wildlifeConcerns: ['Black bears active in area', 'Venomous snakes present'],
    adaCompliance: 'Service animals accommodated per ADA requirements. Emotional support animals not permitted in wilderness.',
  },
  ageRequirements: [
    { difficulty: 'easy', minimumAge: 8, notes: 'With guardian - short day hikes only' },
    { difficulty: 'moderate', minimumAge: 12, notes: 'With guardian' },
    { difficulty: 'rugged', minimumAge: 16, notes: 'With experienced guardian or 18+ solo' },
  ],
  medicalConditions: [
    {
      category: 'Cardiovascular',
      conditions: ['Heart disease', 'High blood pressure', 'History of heart attack'],
      rationale: 'High altitude and strenuous terrain place significant demands on cardiovascular system',
      recommendations: ['Consult physician before visit', 'Acclimatize gradually', 'Know your limits'],
    },
    {
      category: 'Respiratory',
      conditions: ['Asthma', 'COPD'],
      rationale: 'Reduced oxygen at elevation can exacerbate respiratory conditions',
      recommendations: ['Bring rescue inhaler', 'Consider pulse oximeter'],
    },
  ],
  evacuationNotes: 'Ground evacuation from remote areas may take 4-8 hours. Helicopter evacuation available for life-threatening emergencies only and dependent on weather/visibility.',
  nearestMedicalFacility: 'Davis Memorial Hospital, Elkins WV - approximately 45 minutes from trailheads',
  cellCoverage: 'No cell coverage in wilderness. Satellite communicator essential.',
  satelliteCommRequired: true,
};

// ============================================================================
// TRAIL SYSTEM
// ============================================================================

export const trails: BackcountryTrail[] = [
  {
    name: 'Bear Rocks Trail (TR 514)',
    trailNumber: 'TR 514',
    distance: '2.5 miles',
    elevationGain: '400 ft',
    difficulty: 'moderate',
    blazing: 'Blue diamonds',
    waterSourceCount: 0,
    hazards: ['Exposed to lightning', 'Rocky terrain'],
    bestSeasons: ['spring', 'summer', 'fall'],
    kimNote: 'Start here for the classic Dolly Sods experience. The views from Bear Rocks at sunrise are worth the early start.',
  },
  {
    name: 'Red Creek Trail (TR 514)',
    trailNumber: 'TR 514',
    distance: '9.2 miles',
    elevationGain: '1,800 ft',
    difficulty: 'rugged',
    blazing: 'Blue diamonds - faded in sections',
    waterSourceCount: 3,
    campsites: ['Red Creek campsite (Mile 2.3)', 'Forks campsite (Mile 5.1)'],
    hazards: [
      'AMD-contaminated water in lower sections',
      'Numerous stream crossings',
      'Flash flood risk',
    ],
    bestSeasons: ['summer', 'fall'],
    kimNote: 'The full Red Creek loop is what Dolly Sods is all about. Plan 2-3 days and bring more water than you think you need.',
  },
  {
    name: 'Blackbird Knob Trail (TR 511)',
    trailNumber: 'TR 511',
    distance: '3.8 miles',
    elevationGain: '600 ft',
    difficulty: 'challenging',
    blazing: 'Blue diamonds',
    waterSourceCount: 1,
    hazards: ['Boggy sections', 'Difficult navigation in fog'],
    bestSeasons: ['summer', 'fall'],
    kimNote: 'Good connector trail but it can get soggy. Gaiters help.',
  },
];

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency: ManagingAgency = {
  name: 'Monongahela National Forest',
  jurisdiction: 'USDA Forest Service',
  type: 'usfs',
  rangerDistrict: 'Cheat-Potomac Ranger District',
  contact: {
    phone: '304-478-3251',
    website: 'https://www.fs.usda.gov/recarea/mnf/recarea/?recid=12366',
  },
};

// ============================================================================
// WILDERNESS DESIGNATION
// ============================================================================

export const wildernessArea: WildernessArea = {
  name: 'Dolly Sods Wilderness',
  designation: 'wilderness',
  established: 1975,
  acreage: 17371,
  managedBy: 'usfs',
  specialDesignations: ['Federal Wilderness Area'],
  highlights: ['Sub-arctic character', 'Heath barrens', 'Sphagnum bogs'],
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
      'Route-finding in fog',
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
    ],
  },
  {
    principle: 'Travel and Camp on Durable Surfaces',
    guidelines: [
      'Camp 200 feet from trails and water',
      'Use existing campsites when possible',
      'Avoid camping on vegetation or in bogs',
      'Spread out when hiking off-trail to avoid creating new paths',
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
      'Do not disturb sphagnum bogs or rare plants',
      'Leave rocks, plants, and artifacts as you find them',
      'Do not build structures or dig trenches',
      'Respect historical and cultural sites',
    ],
  },
  {
    principle: 'Minimize Campfire Impact',
    guidelines: [
      'Use camp stove instead of fires when possible',
      'No fires above 4,000 feet during fire danger',
      'Use existing fire rings only',
      'Burn all wood to ash and scatter cooled ashes',
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
