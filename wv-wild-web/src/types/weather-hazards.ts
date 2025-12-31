/**
 * Weather Hazards Type Definitions
 * SPEC-17: Quantified Weather Hazards Schema for WV Backcountry Safety
 *
 * CRITICAL: This schema provides QUANTIFIED safety data, not just descriptions.
 * Backcountry users need specific numbers and timeframes for life-safety decisions.
 *
 * WV-specific considerations:
 * - Rapid weather changes in mountain terrain
 * - Flash flood risk in narrow hollows
 * - Elevation-dependent temperature drops
 * - Unpredictable thunderstorm development
 * - Cold water immersion risks (rivers/lakes)
 *
 * @module types/weather-hazards
 */

import { z } from 'astro/zod';

// ============================================================================
// CORE WEATHER HAZARD ENUMS
// ============================================================================

/**
 * WV seasons for seasonal conditions tracking.
 * Matches traditional meteorological seasons.
 */
export const WVSeasonSchema = z.enum(['spring', 'summer', 'fall', 'winter']);

export type WVSeason = z.infer<typeof WVSeasonSchema>;

/**
 * Hazard severity levels for categorizing risks.
 * Used for visual indicators and sorting.
 */
export const HazardSeveritySchema = z.enum(['low', 'moderate', 'high', 'extreme']);

export type HazardSeverity = z.infer<typeof HazardSeveritySchema>;

/**
 * Severity color classes following industry safety standards.
 * Uses green/yellow/orange/red progression per CLAUDE.md color exceptions.
 */
export const HAZARD_SEVERITY_COLORS: Record<HazardSeverity, string> = {
  low: 'bg-sign-green text-white',
  moderate: 'bg-yellow-600 text-black',
  high: 'bg-orange-600 text-white',
  extreme: 'bg-red-700 text-white',
};

/**
 * Human-readable labels for hazard severity.
 */
export const HAZARD_SEVERITY_LABELS: Record<HazardSeverity, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
  extreme: 'Extreme Risk',
};

// ============================================================================
// FLASH FLOOD HAZARDS (Critical for WV hollows and gorges)
// ============================================================================

/**
 * Flash flood hazard information.
 * CRITICAL: warningTime is the most important field for backcountry safety.
 * WV's narrow hollows and steep terrain create extremely short warning windows.
 */
export const FlashFloodHazardSchema = z.object({
  /**
   * Warning time before flash flood arrival.
   * CRITICAL SAFETY DATA - must be specific (e.g., "15-30 minutes").
   * Represents time from first rain to dangerous water levels.
   */
  warningTime: z.string().min(1),

  /**
   * High-risk areas for flash flooding.
   * Include specific geographic features (hollows, creek crossings, etc.)
   */
  highRiskAreas: z.array(z.string().min(1)).min(1).max(20),

  /**
   * Safe behaviors during flash flood conditions.
   * Actionable guidance, not vague warnings.
   */
  safeBehavior: z.array(z.string().min(1)).min(1).max(15),

  /**
   * Months with highest flash flood risk.
   * WV typically sees highest risk April-August.
   */
  peakRiskMonths: z.array(z.string().min(1)).min(1).max(12).optional(),

  /**
   * Specific stream gauge URLs for real-time monitoring.
   * USGS gauge links for user reference.
   */
  gaugeUrls: z.array(z.string().url()).optional(),

  /**
   * Optional severity rating for current conditions.
   */
  currentSeverity: HazardSeveritySchema.optional(),
});

export type FlashFloodHazard = z.infer<typeof FlashFloodHazardSchema>;

// ============================================================================
// LIGHTNING HAZARDS (Critical for exposed ridgelines and summits)
// ============================================================================

/**
 * Lightning hazard information.
 * WV's mountain ridgelines are particularly exposed during summer storms.
 */
export const LightningHazardSchema = z.object({
  /**
   * Peak hours for thunderstorm development.
   * Format: "2pm-6pm May-September"
   */
  peakHours: z.string().min(1),

  /**
   * Lightning safety protocol steps.
   * Ordered from most to least important.
   */
  protocol: z.array(z.string().min(1)).min(1).max(15),

  /**
   * Exposed areas with high lightning risk.
   * Include specific ridgelines, summits, open meadows.
   */
  exposedAreas: z.array(z.string().min(1)).min(1).max(20),

  /**
   * 30/30 rule or similar quantified guidance.
   * "If thunder follows lightning by less than 30 seconds, seek shelter immediately."
   */
  quantifiedGuidance: z.string().optional(),

  /**
   * Nearby shelter locations if available.
   */
  shelterLocations: z.array(z.string().min(1)).optional(),
});

export type LightningHazard = z.infer<typeof LightningHazardSchema>;

// ============================================================================
// TEMPERATURE BY ELEVATION (Critical for layering decisions)
// ============================================================================

/**
 * Temperature variation by elevation.
 * WV's 4,000+ ft elevation changes create significant temp differences.
 * Standard lapse rate is approximately 3.5°F per 1000ft.
 */
export const TemperatureByElevationSchema = z.object({
  /**
   * Reference base temperature.
   * Usually valley floor or trailhead temperature.
   * Format: "65°F at 2,000ft trailhead"
   */
  baseTemp: z.string().min(1),

  /**
   * Temperature drop per 1000 feet of elevation gain.
   * Standard atmospheric lapse rate: "3.5°F per 1000ft"
   * Can vary with weather conditions.
   */
  dropPerThousandFeet: z.string().min(1),

  /**
   * Specific summit or high point temperature estimate.
   * Format: "Expect 50°F at Spruce Knob (4,863ft)"
   */
  summitEstimate: z.string().optional(),

  /**
   * Wind chill factor at exposed elevations.
   * Summit winds can reduce felt temperature significantly.
   */
  windChillNote: z.string().optional(),
});

export type TemperatureByElevation = z.infer<typeof TemperatureByElevationSchema>;

// ============================================================================
// WIND CHILL HAZARDS
// ============================================================================

/**
 * Wind chill hazard information.
 * Critical for winter backcountry and exposed ridgeline hiking.
 */
export const WindChillHazardSchema = z.object({
  /**
   * Frostbite threshold temperature.
   * Format: "-10°F wind chill" or "Below 0°F"
   */
  threshold: z.string().min(1),

  /**
   * Specific guidance for wind chill conditions.
   * Include exposure time limits, clothing requirements.
   */
  guidance: z.string().min(1),

  /**
   * Expected wind speeds at exposed locations.
   * Format: "Summit winds 20-40 mph common"
   */
  typicalWindSpeeds: z.string().optional(),

  /**
   * Frostbite onset time at dangerous temperatures.
   * Format: "Frostbite possible in 30 minutes below -10°F wind chill"
   */
  frostbiteOnset: z.string().optional(),
});

export type WindChillHazard = z.infer<typeof WindChillHazardSchema>;

// ============================================================================
// HYPOTHERMIA RISK
// ============================================================================

/**
 * Hypothermia risk information.
 * Critical for cold water immersion (rivers, lakes) and wet conditions.
 */
export const HypothermiaRiskSchema = z.object({
  /**
   * Seasons with elevated hypothermia risk.
   * WV rivers remain cold even in summer.
   */
  seasons: z.array(z.string().min(1)).min(1).max(4),

  /**
   * Wet condition warning - hypothermia can occur even in mild temps.
   * Format: "Hypothermia possible at 50°F with wet clothing and wind."
   */
  wetConditionWarning: z.string().min(1),

  /**
   * Water temperature information for immersion risk.
   * Format: "Water temp 45-55°F spring through fall"
   */
  waterTemperature: z.string().optional(),

  /**
   * Cold water immersion survival time.
   * Format: "10-15 minutes functional time in 50°F water"
   */
  immersionTime: z.string().optional(),

  /**
   * Recognition signs for field identification.
   */
  recognitionSigns: z.array(z.string().min(1)).optional(),
});

export type HypothermiaRisk = z.infer<typeof HypothermiaRiskSchema>;

// ============================================================================
// RAPID ONSET WEATHER EVENTS (WV-Specific)
// ============================================================================

/**
 * Rapid onset weather event.
 * WV-specific weather patterns that develop quickly and pose safety risks.
 */
export const RapidOnsetEventSchema = z.object({
  /**
   * Event type name.
   * Examples: "Mountain fog", "Microbursts", "Ice storms"
   */
  name: z.string().min(1),

  /**
   * Warning signs before onset.
   * What users should watch for.
   */
  warningSigns: z.array(z.string().min(1)).min(1).max(10),

  /**
   * Typical onset speed.
   * Format: "Can develop in 15-30 minutes"
   */
  onsetSpeed: z.string().min(1),

  /**
   * Recommended response actions.
   */
  responseActions: z.array(z.string().min(1)).min(1).max(10),

  /**
   * Seasons when this event is most common.
   */
  peakSeasons: z.array(WVSeasonSchema).optional(),
});

export type RapidOnsetEvent = z.infer<typeof RapidOnsetEventSchema>;

// ============================================================================
// MAIN WEATHER HAZARDS SCHEMA
// ============================================================================

/**
 * Complete weather hazards schema.
 * Provides quantified safety data for backcountry decision-making.
 *
 * CRITICAL: All time-sensitive fields (warningTime, peakHours, etc.)
 * must contain specific, quantified information - not vague guidance.
 */
export const WeatherHazardsSchema = z.object({
  /**
   * Flash flood hazards.
   * REQUIRED for any adventure near streams, hollows, or gorges.
   */
  flashFloods: FlashFloodHazardSchema,

  /**
   * Lightning hazards.
   * REQUIRED for any adventure with exposed terrain.
   */
  lightning: LightningHazardSchema,

  /**
   * Temperature by elevation guidance.
   * REQUIRED for any adventure with significant elevation change.
   */
  temperatureByElevation: TemperatureByElevationSchema,

  /**
   * WV-specific rapid onset weather events.
   * List of events common to this area.
   */
  rapidOnsetEvents: z.array(z.string().min(1)).min(1).max(15),

  /**
   * Wind chill hazards.
   * Optional - primarily relevant for winter/exposed locations.
   */
  windChill: WindChillHazardSchema.optional(),

  /**
   * Hypothermia risk information.
   * Optional - primarily relevant for water activities and cold seasons.
   */
  hypothermiaRisk: HypothermiaRiskSchema.optional(),

  /**
   * Detailed rapid onset events.
   * Optional - provides expanded info on rapidOnsetEvents list.
   */
  rapidOnsetEventDetails: z.array(RapidOnsetEventSchema).optional(),

  /**
   * Emergency weather information sources.
   * NWS offices, NOAA weather radio frequencies, etc.
   */
  emergencyInfoSources: z.array(z.object({
    name: z.string().min(1),
    url: z.string().url().optional(),
    phone: z.string().optional(),
    notes: z.string().optional(),
  })).optional(),
});

export type WeatherHazards = z.infer<typeof WeatherHazardsSchema>;

// ============================================================================
// SEASONAL CONDITIONS SCHEMA
// ============================================================================

/**
 * Seasonal conditions for a specific adventure location.
 * Provides month-by-month or season-by-season guidance.
 */
export const SeasonalConditionsSchema = z.object({
  /**
   * Season name.
   * Can be meteorological (Spring, Summer, Fall, Winter) or
   * more specific (Early Spring, Late Fall, etc.)
   */
  season: z.string().min(1),

  /**
   * Average high temperature for season.
   * Format: "65-75°F" or "Mid 70s"
   */
  avgHighTemp: z.string().min(1),

  /**
   * Average low temperature for season.
   * Format: "45-55°F" or "Low 50s"
   */
  avgLowTemp: z.string().min(1),

  /**
   * Average precipitation days per month during this season.
   * Important for trip planning.
   */
  precipitationDays: z.number().int().nonnegative().max(31),

  /**
   * Snow depth range for winter/spring seasons.
   * Format: "6-24 inches at higher elevations"
   */
  snowDepthRange: z.string().optional(),

  /**
   * Primary hazards active during this season.
   * References hazards from WeatherHazardsSchema.
   */
  primaryHazards: z.array(z.string().min(1)).min(1).max(10),

  /**
   * Activities best suited for this season.
   * What the location excels at during this time.
   */
  bestActivities: z.array(z.string().min(1)).min(1).max(15),

  /**
   * Activities NOT recommended for this season.
   * Important for safety and expectation setting.
   */
  notRecommended: z.array(z.string().min(1)).optional(),

  /**
   * Daylight hours range.
   * Format: "14-15 hours" or "10-11 hours"
   */
  daylightHours: z.string().optional(),

  /**
   * Trail/road conditions during this season.
   * Access information for trip planning.
   */
  accessConditions: z.string().optional(),

  /**
   * Wildlife activity notes relevant to safety or viewing.
   */
  wildlifeNotes: z.string().optional(),

  /**
   * Kim's personal seasonal tip.
   * Renders in font-hand styling.
   */
  kimNote: z.string().optional(),
});

export type SeasonalConditions = z.infer<typeof SeasonalConditionsSchema>;

// ============================================================================
// COMPLETE ADVENTURE WEATHER SCHEMA
// ============================================================================

/**
 * Complete adventure weather schema.
 * Combines hazards with seasonal conditions for comprehensive planning.
 */
export const AdventureWeatherSchema = z.object({
  /**
   * Weather hazards for this adventure location.
   */
  weatherHazards: WeatherHazardsSchema,

  /**
   * Seasonal conditions array.
   * Typically 4 entries (one per season) but can be more granular.
   */
  seasonalConditions: z.array(SeasonalConditionsSchema).min(1).max(12),

  /**
   * General climate description for the area.
   * Overview context for users unfamiliar with WV weather.
   */
  climateOverview: z.string().optional(),

  /**
   * Best overall time to visit.
   * Format: "Late September through mid-October"
   */
  bestTimeToVisit: z.string().optional(),

  /**
   * Weather station or data source for current conditions.
   */
  weatherStationUrl: z.string().url().optional(),

  /**
   * Elevation range affecting weather.
   * Format: "2,000ft - 4,800ft"
   */
  elevationRange: z.string().optional(),

  /**
   * Last updated date for weather information.
   * Format: "December 2025"
   */
  lastUpdated: z.string().optional(),
});

export type AdventureWeather = z.infer<typeof AdventureWeatherSchema>;

// ============================================================================
// AVALANCHE DANGER SCHEMA (For high-elevation winter adventures)
// ============================================================================

/**
 * Avalanche danger level following North American Public Avalanche Danger Scale.
 * Industry standard colors OVERRIDE WVWO brand palette per CLAUDE.md.
 */
export const AvalancheDangerLevelSchema = z.enum(['low', 'moderate', 'considerable', 'high', 'extreme']);

export type AvalancheDangerLevel = z.infer<typeof AvalancheDangerLevelSchema>;

/**
 * Avalanche danger color classes per North American standard.
 * @see CLAUDE.md "Color Exceptions (Industry Standards)"
 */
export const AVALANCHE_DANGER_COLORS: Record<AvalancheDangerLevel, string> = {
  low: 'bg-sign-green text-white',           // Level 1 - Green
  moderate: 'bg-yellow-600 text-black',       // Level 2 - Yellow
  considerable: 'bg-orange-600 text-white',   // Level 3 - Orange
  high: 'bg-red-700 text-white',              // Level 4 - Red
  extreme: 'bg-black text-white',             // Level 5 - Black
};

/**
 * Human-readable labels for avalanche danger levels.
 */
export const AVALANCHE_DANGER_LABELS: Record<AvalancheDangerLevel, string> = {
  low: 'Low (Level 1)',
  moderate: 'Moderate (Level 2)',
  considerable: 'Considerable (Level 3)',
  high: 'High (Level 4)',
  extreme: 'Extreme (Level 5)',
};

/**
 * Avalanche hazard information.
 * For high-elevation winter backcountry areas.
 */
export const AvalancheHazardSchema = z.object({
  /**
   * Applicable elevation range.
   * Format: "Above 4,000ft during winter"
   */
  applicableElevation: z.string().min(1),

  /**
   * Typical danger season.
   * Format: "December through March"
   */
  dangerSeason: z.string().min(1),

  /**
   * Problem types common to the area.
   * Examples: "Wind slab", "Persistent slab", "Loose dry"
   */
  commonProblems: z.array(z.string().min(1)).min(1).max(10),

  /**
   * Avalanche center or forecast source.
   */
  forecastSource: z.object({
    name: z.string().min(1),
    url: z.string().url(),
  }).optional(),

  /**
   * Required avalanche safety equipment.
   */
  requiredEquipment: z.array(z.string().min(1)).optional(),

  /**
   * Safe travel guidelines.
   */
  safetyGuidelines: z.array(z.string().min(1)).min(1).max(15),
});

export type AvalancheHazard = z.infer<typeof AvalancheHazardSchema>;

// ============================================================================
// FIRE DANGER SCHEMA (For dry season backcountry)
// ============================================================================

/**
 * Fire danger level following USFS National Fire Danger Rating System.
 * Industry standard colors OVERRIDE WVWO brand palette per CLAUDE.md.
 */
export const FireDangerLevelSchema = z.enum(['low', 'moderate', 'high', 'very_high', 'extreme']);

export type FireDangerLevel = z.infer<typeof FireDangerLevelSchema>;

/**
 * Fire danger color classes per USFS NFDRS standard.
 * @see CLAUDE.md "Color Exceptions (Industry Standards)"
 */
export const FIRE_DANGER_COLORS: Record<FireDangerLevel, string> = {
  low: 'bg-sign-green text-white',      // Green
  moderate: 'bg-blue-700 text-white',   // Blue (NFDRS uses blue for moderate)
  high: 'bg-yellow-600 text-black',     // Yellow
  very_high: 'bg-orange-600 text-white', // Orange
  extreme: 'bg-red-700 text-white',     // Red
};

/**
 * Human-readable labels for fire danger levels.
 */
export const FIRE_DANGER_LABELS: Record<FireDangerLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  very_high: 'Very High',
  extreme: 'Extreme',
};

/**
 * Fire danger information for backcountry areas.
 */
export const FireDangerHazardSchema = z.object({
  /**
   * Fire restriction information.
   * Format: "No open fires during high danger periods"
   */
  restrictions: z.string().min(1),

  /**
   * Peak fire danger season.
   * Format: "Late summer through fall (August-October)"
   */
  peakSeason: z.string().min(1),

  /**
   * Current restriction information source.
   */
  restrictionInfoUrl: z.string().url().optional(),

  /**
   * Campfire regulations.
   */
  campfireRegulations: z.array(z.string().min(1)).min(1).max(10),

  /**
   * Reporting information for wildfires.
   */
  reportingInfo: z.string().optional(),
});

export type FireDangerHazard = z.infer<typeof FireDangerHazardSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to get hazard severity color class.
 * Returns Tailwind classes for badge styling.
 *
 * @param severity - Hazard severity level
 * @returns Tailwind color classes string
 */
export function getHazardSeverityColor(severity: HazardSeverity): string {
  return HAZARD_SEVERITY_COLORS[severity];
}

/**
 * Helper function to get hazard severity label.
 * Returns human-readable severity label.
 *
 * @param severity - Hazard severity level
 * @returns Human-readable label string
 */
export function getHazardSeverityLabel(severity: HazardSeverity): string {
  return HAZARD_SEVERITY_LABELS[severity];
}

/**
 * Helper function to get avalanche danger color class.
 * Returns Tailwind classes for badge styling.
 *
 * @param level - Avalanche danger level
 * @returns Tailwind color classes string
 */
export function getAvalancheDangerColor(level: AvalancheDangerLevel): string {
  return AVALANCHE_DANGER_COLORS[level];
}

/**
 * Helper function to get fire danger color class.
 * Returns Tailwind classes for badge styling.
 *
 * @param level - Fire danger level
 * @returns Tailwind color classes string
 */
export function getFireDangerColor(level: FireDangerLevel): string {
  return FIRE_DANGER_COLORS[level];
}

/**
 * Validates that a weather hazards object has quantified data.
 * Use to ensure safety-critical fields contain specific, not vague, information.
 *
 * @param hazards - Weather hazards object to validate
 * @returns true if quantified fields contain specific data
 */
export function validateQuantifiedData(hazards: WeatherHazards): boolean {
  // Check that warning times include specific numbers
  const hasQuantifiedWarningTime = /\d+/.test(hazards.flashFloods.warningTime);

  // Check that peak hours include specific times
  const hasQuantifiedPeakHours = /\d+/.test(hazards.lightning.peakHours);

  // Check that temp drop includes specific rate
  const hasQuantifiedTempDrop = /\d+(\.\d+)?/.test(
    hazards.temperatureByElevation.dropPerThousandFeet
  );

  return hasQuantifiedWarningTime && hasQuantifiedPeakHours && hasQuantifiedTempDrop;
}
