/**
 * Example Weather Hazards Data File
 * SPEC-17: Demonstrates quantified weather hazards schema usage
 *
 * This example shows weather hazard data for the Dolly Sods Wilderness,
 * one of WV's most challenging backcountry areas with extreme weather variability.
 *
 * USE THIS AS A TEMPLATE for creating weather hazard data for other adventure locations.
 *
 * CRITICAL: All time-sensitive fields MUST contain quantified data (numbers, specific times).
 * Vague descriptions like "short notice" or "afternoon" are insufficient for safety decisions.
 *
 * @module data/weather/_example
 */

import type { AdventureWeather, WeatherHazards, SeasonalConditions } from '../../types/weather-hazards';

/**
 * Weather hazards for Dolly Sods Wilderness area.
 * Elevation: 3,800-4,200 ft - significantly higher than surrounding areas.
 */
export const dollySodsWeatherHazards: WeatherHazards = {
  // ============================================================================
  // FLASH FLOOD HAZARDS
  // CRITICAL: warningTime must be quantified - this is life-safety information
  // ============================================================================
  flashFloods: {
    warningTime: '15-30 minutes',
    highRiskAreas: [
      'Red Creek drainage and crossings',
      'Narrow hollows below Bear Rocks',
      'Drainage channels near camping areas',
      'Stream crossings on Blackbird Knob Trail',
      'Low areas in Roaring Plains',
    ],
    safeBehavior: [
      'Move to high ground immediately when rain begins',
      'Never attempt to cross rising water - it rises faster than you expect',
      'Camp at least 50 feet above creek level on elevated ground',
      'Know your exit routes before storms develop',
      'Carry a weather radio tuned to NOAA frequencies',
    ],
    peakRiskMonths: ['April', 'May', 'June', 'July', 'August'],
    gaugeUrls: ['https://waterdata.usgs.gov/nwis/uv?site_no=03066000'],
    currentSeverity: 'moderate',
  },

  // ============================================================================
  // LIGHTNING HAZARDS
  // Dolly Sods is particularly exposed - mostly open terrain above treeline
  // ============================================================================
  lightning: {
    peakHours: '2pm-6pm May-September',
    protocol: [
      'Plan to be below ridgelines by 1pm during summer months',
      'Descend from Bear Rocks and exposed areas at first sign of storm development',
      'Avoid isolated trees - find low areas with uniform vegetation',
      'Crouch on the balls of your feet if caught in the open - do not lie flat',
      'Wait 30 minutes after last thunder before returning to exposed areas',
    ],
    exposedAreas: [
      'Bear Rocks Preserve (no shelter)',
      'Cabin Mountain ridgeline',
      'Open heath barrens throughout wilderness',
      'Rocky outcrops on plateau',
      'Roaring Plains North open areas',
    ],
    quantifiedGuidance:
      'If thunder follows lightning by less than 30 seconds (6 miles), descend immediately.',
    shelterLocations: [
      'Dense spruce thickets (crouch away from individual tall trees)',
      'Lower portions of Red Creek drainage',
    ],
  },

  // ============================================================================
  // TEMPERATURE BY ELEVATION
  // Dolly Sods is ~4,000ft - significantly colder than valley towns
  // ============================================================================
  temperatureByElevation: {
    baseTemp: '65°F at Harman (2,000ft) or Elkins (1,900ft)',
    dropPerThousandFeet: '3.5°F per 1000ft of elevation gain',
    summitEstimate: 'Expect temperatures 8-10°F cooler at Bear Rocks (4,200ft) than valley floor',
    windChillNote: 'Sustained winds of 15-25 mph common on plateau - can add 10-15°F wind chill.',
  },

  // ============================================================================
  // RAPID ONSET EVENTS - WV Mountain Specific
  // ============================================================================
  rapidOnsetEvents: [
    'Mountain fog (can reduce visibility to <50 feet in 15 minutes)',
    'Microbursts with 60+ mph wind gusts',
    'Rapid temperature drops (20°F in 2 hours possible)',
    'Ice storms in spring/fall (April and October especially)',
    'Whiteout conditions during winter storms',
    'Freezing rain at elevation when valley has rain',
  ],

  // ============================================================================
  // WIND CHILL HAZARDS
  // Dolly Sods is notoriously windy due to exposed plateau terrain
  // ============================================================================
  windChill: {
    threshold: '0°F wind chill',
    guidance:
      'Cover all exposed skin. Limit continuous exposure to 30 minutes or less. ' +
      'Carry extra insulating layers even in summer - weather changes rapidly.',
    typicalWindSpeeds: 'Sustained 15-25 mph with gusts to 40 mph common on the plateau',
    frostbiteOnset: 'Frostbite possible in 30 minutes at 0°F wind chill; 10 minutes at -20°F',
  },

  // ============================================================================
  // HYPOTHERMIA RISK
  // Even summer nights can drop into the 40s at Dolly Sods
  // ============================================================================
  hypothermiaRisk: {
    seasons: ['Spring', 'Fall', 'Winter', 'Summer nights'],
    wetConditionWarning:
      'Hypothermia possible year-round at Dolly Sods. Rain + wind at 50°F can cause hypothermia ' +
      'in 30-60 minutes without proper rain gear.',
    waterTemperature: 'Red Creek water temperature 45-58°F even in summer',
    immersionTime: 'Cold water immersion: 10-15 minutes functional time before incapacitation',
    recognitionSigns: [
      'Uncontrollable shivering',
      'Slurred speech or mumbling',
      'Slow, shallow breathing',
      'Confusion or poor judgment',
      'Loss of coordination',
    ],
  },

  // ============================================================================
  // DETAILED RAPID ONSET EVENTS
  // Expanded information on WV-specific weather phenomena
  // ============================================================================
  rapidOnsetEventDetails: [
    {
      name: 'Mountain Fog',
      warningSigns: [
        'Clouds descending to ridgeline level',
        'Increasing moisture on equipment/clothing',
        'Temperature dropping rapidly',
      ],
      onsetSpeed: 'Can develop in 10-20 minutes, especially late afternoon',
      responseActions: [
        'Stop and mark your current location with GPS',
        'Do not attempt to navigate unknown terrain in fog',
        'Wait for clearing if possible (usually 30-60 minutes)',
        'Use compass/GPS only on known trails',
      ],
      peakSeasons: ['spring', 'summer', 'fall'],
    },
    {
      name: 'Microbursts',
      warningSigns: [
        'Rapidly darkening sky',
        'Sudden stillness before storm',
        'Visible wall of rain approaching',
      ],
      onsetSpeed: 'Can hit with full force in under 5 minutes',
      responseActions: [
        'Seek low ground away from isolated trees',
        'Secure or abandon lightweight gear',
        'Crouch with feet together to minimize ground current exposure',
        'Face away from the wind',
      ],
      peakSeasons: ['summer'],
    },
  ],

  // ============================================================================
  // EMERGENCY INFORMATION SOURCES
  // ============================================================================
  emergencyInfoSources: [
    {
      name: 'NOAA Weather Radio (Charleston)',
      phone: '162.550 MHz',
      notes: 'Covers most of eastern WV',
    },
    {
      name: 'NWS Charleston, WV',
      url: 'https://www.weather.gov/rlx/',
      notes: 'Forecast office covering Dolly Sods area',
    },
    {
      name: 'Randolph County 911',
      phone: '911',
      notes: 'For emergencies - cell coverage limited in wilderness',
    },
  ],
};

/**
 * Seasonal conditions for Dolly Sods Wilderness.
 * Provides month-by-month guidance for trip planning.
 */
export const dollySodsSeasonalConditions: SeasonalConditions[] = [
  {
    season: 'Spring (March-May)',
    avgHighTemp: '45-65°F',
    avgLowTemp: '25-45°F',
    precipitationDays: 14,
    snowDepthRange: '0-24 inches possible through April',
    primaryHazards: [
      'Late season snowstorms (through mid-April)',
      'Flash floods during spring rains',
      'Hypothermia from wet and cold conditions',
      'Ice on trails in early spring',
    ],
    bestActivities: [
      'Wildflower viewing (May)',
      'Bird watching during migration',
      'Photography (especially foggy mornings)',
    ],
    notRecommended: [
      'Backcountry camping without cold weather gear',
      'Extended trips in early March',
    ],
    daylightHours: '12-14 hours',
    accessConditions: 'Forest Road 75 may be gated until late April. Check with Monongahela NF.',
    wildlifeNotes: 'Black bears emerging from hibernation - secure all food.',
    kimNote: 'May wildflowers at Dolly Sods are worth the muddy trails. Bring waterproof boots!',
  },
  {
    season: 'Summer (June-August)',
    avgHighTemp: '65-78°F',
    avgLowTemp: '48-58°F',
    precipitationDays: 12,
    primaryHazards: [
      'Lightning - afternoon thunderstorms very common',
      'Flash floods in Red Creek drainage',
      'Hypothermia from rain/wind even in summer',
      'Biting insects (June especially)',
    ],
    bestActivities: [
      'Day hiking',
      'Backpacking (but plan for weather)',
      'Blueberry picking (late July-August)',
      'Stargazing (minimal light pollution)',
    ],
    notRecommended: [
      'Extended ridge walks after 1pm',
      'Camping in low drainages',
    ],
    daylightHours: '14-15 hours',
    accessConditions: 'All roads and trails typically open. Parking areas can fill by 9am on weekends.',
    wildlifeNotes: 'Timber rattlesnakes active. Watch where you step on rocky areas.',
    kimNote:
      'Even in July I pack a fleece and rain jacket. Seen 45°F nights up there when it was 80° in Elkins.',
  },
  {
    season: 'Fall (September-November)',
    avgHighTemp: '50-70°F',
    avgLowTemp: '32-50°F',
    precipitationDays: 10,
    snowDepthRange: '0-6 inches possible by late October',
    primaryHazards: [
      'Rapid temperature drops',
      'Early season snow (late October onward)',
      'Fog reducing visibility',
      'Shorter daylight hours - plan accordingly',
    ],
    bestActivities: [
      'Fall foliage viewing (peak late September)',
      'Hiking with fewer crowds',
      'Photography (golden hour stunning)',
      'Bird watching during migration',
    ],
    notRecommended: [
      'Multi-day trips after Halloween without winter gear',
    ],
    daylightHours: '10-12 hours',
    accessConditions: 'Roads open but may close after early snow. Check conditions before going.',
    kimNote: 'Peak fall color usually last week of September. Beat the crowd by going midweek.',
  },
  {
    season: 'Winter (December-February)',
    avgHighTemp: '30-40°F',
    avgLowTemp: '10-25°F',
    precipitationDays: 14,
    snowDepthRange: '12-48 inches typical; drifts to 6+ feet',
    primaryHazards: [
      'Extreme wind chill (can reach -20°F or colder)',
      'Whiteout conditions during storms',
      'Hypothermia - exposure risk very high',
      'Limited daylight (9 hours or less)',
      'Avalanche risk on steep slopes after heavy snow',
    ],
    bestActivities: [
      'Snowshoeing (when conditions allow)',
      'Cross-country skiing',
      'Winter photography',
    ],
    notRecommended: [
      'Any backcountry travel without winter mountaineering skills',
      'Solo trips',
      'Overnight camping without extreme cold weather experience',
    ],
    daylightHours: '9-10 hours',
    accessConditions: 'Forest Road 75 typically closed December-April. Access via snowshoe/ski only.',
    wildlifeNotes: 'Minimal wildlife activity. Do not approach any animals - they are stressed by cold.',
    kimNote:
      'Winter at Dolly Sods is for experienced winter campers only. Beautiful but unforgiving. ' +
      'Tell someone your plans and expected return.',
  },
];

/**
 * Complete adventure weather data for Dolly Sods.
 * Combines hazards with seasonal conditions for comprehensive planning.
 */
export const dollySodsWeather: AdventureWeather = {
  weatherHazards: dollySodsWeatherHazards,
  seasonalConditions: dollySodsSeasonalConditions,
  climateOverview:
    'Dolly Sods features a subarctic climate more similar to Canada than the surrounding WV lowlands. ' +
    'The exposed plateau at 4,000+ feet receives heavy precipitation, high winds, and dramatic ' +
    'temperature swings. Weather can change from sunny to life-threatening in under an hour.',
  bestTimeToVisit: 'Late September through mid-October for fall color with moderate weather risk',
  weatherStationUrl: 'https://www.weather.gov/rlx/',
  elevationRange: '3,800ft - 4,200ft',
  lastUpdated: 'December 2025',
};

export default dollySodsWeather;
