/**
 * Backcountry Template Type Definitions
 * SPEC-17: Backcountry Template props and Zod validation schemas
 *
 * Provides composition layer for backcountry wilderness templates including:
 * - Emergency contact multi-tier system
 * - Wildlife hazard tracking
 * - Wilderness area definitions
 * - Trail system with difficulty colors
 *
 * @module types/backcountry-template-types
 */

import { z } from 'astro/zod';
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  DifficultySchema,
  SeasonSchema,
  NearbyAttractionSchema,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
  type StatItem,
  type Difficulty,
  type Season,
  type NearbyAttraction,
} from './adventure';
import { BackcountryNavigationSchema, type BackcountryNavigation } from './navigation-types';
import { WaterSourceSchema, BackcountryCampingSchema, type WaterSource, type BackcountryCamping } from './water-safety';
import { WeatherHazardsSchema, SeasonalConditionsSchema, type WeatherHazards, type SeasonalConditions } from './weather-hazards';
import { BackcountryAccessibilitySchema, type BackcountryAccessibility } from './backcountry-types';

// ============================================================================
// EMERGENCY CONTACT SCHEMAS (P0 - SAFETY CRITICAL)
// ============================================================================

/**
 * Emergency contact information schema.
 * Used for all emergency service contacts in backcountry areas.
 *
 * SAFETY CRITICAL: Phone numbers must be validated to ensure users can
 * reach emergency services. Supports standard US formats and 911.
 */
export const EmergencyContactSchema = z.object({
  /** Service name (e.g., "Tucker County SAR", "Cheat Ranger District") */
  service: z.string().min(1),
  /** Phone number - supports 911, 304-xxx-xxxx, +1-xxx-xxx-xxxx */
  phone: z.string().regex(/^(911|\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/),
  /** Availability (e.g., "24/7", "9am-5pm Mon-Fri") */
  available: z.string().min(1),
  /** Optional notes */
  notes: z.string().optional(),
});

export type EmergencyContact = z.infer<typeof EmergencyContactSchema>;

// ============================================================================
// EMERGENCY TIER SCHEMA (P0 - SAFETY CRITICAL)
// ============================================================================

/**
 * Emergency tier levels for categorizing emergency contacts.
 * Allows UI to display contacts in priority order with appropriate styling.
 *
 * Tier hierarchy (highest to lowest priority):
 * 1. primary - 911 / immediate emergency response
 * 2. sar - Search and Rescue teams
 * 3. agency - Ranger districts and land management
 * 4. medical - Hospitals and medical facilities
 * 5. poison - Poison control center
 */
export const EmergencyTierSchema = z.enum(['primary', 'sar', 'agency', 'medical', 'poison']);

export type EmergencyTier = z.infer<typeof EmergencyTierSchema>;

/**
 * Extended emergency contact with tier classification.
 * Includes response time estimates and capability lists.
 */
export const TieredEmergencyContactSchema = EmergencyContactSchema.extend({
  /** Emergency tier classification */
  tier: EmergencyTierSchema,
  /** Expected response time (e.g., "4-8 hours typical") */
  responseTime: z.string().optional(),
  /** Capabilities list (e.g., ["Technical rescue", "Helicopter extraction"]) */
  capabilities: z.array(z.string()).optional(),
});

export type TieredEmergencyContact = z.infer<typeof TieredEmergencyContactSchema>;

/**
 * Emergency tier color classes for UI badges.
 * Colors follow safety/urgency conventions.
 *
 * Note: Purple for poison control is an exception to WVWO brand palette
 * as it follows the universal poison control color convention.
 */
export const EMERGENCY_TIER_COLORS: Record<EmergencyTier, string> = {
  primary: 'bg-red-700 text-white',      // 911 / most urgent
  sar: 'bg-orange-600 text-white',       // Search and rescue
  agency: 'bg-sign-green text-white',    // Ranger district
  medical: 'bg-blue-700 text-white',     // Hospital
  poison: 'bg-purple-700 text-white',    // Poison control (industry standard)
};

/**
 * Human-readable labels for emergency tiers.
 */
export const EMERGENCY_TIER_LABELS: Record<EmergencyTier, string> = {
  primary: 'Emergency (911)',
  sar: 'Search & Rescue',
  agency: 'Ranger District',
  medical: 'Medical Facility',
  poison: 'Poison Control',
};

// ============================================================================
// MANAGING AGENCY SCHEMA (P1)
// ============================================================================

/**
 * Agency types for land management.
 * Covers federal, state, and private land managers in WV.
 */
export const AgencyTypeSchema = z.enum(['usfs', 'nps', 'blm', 'wvdnr', 'private', 'county']);

export type AgencyType = z.infer<typeof AgencyTypeSchema>;

/**
 * Human-readable labels for agency types.
 */
export const AGENCY_TYPE_LABELS: Record<AgencyType, string> = {
  usfs: 'US Forest Service',
  nps: 'National Park Service',
  blm: 'Bureau of Land Management',
  wvdnr: 'WV Division of Natural Resources',
  private: 'Private Land',
  county: 'County',
};

/**
 * Contact info for managing agency.
 */
export const AgencyContactSchema = z.object({
  /** Phone number */
  phone: z.string().optional(),
  /** Email address */
  email: z.string().email().optional(),
  /** Website URL */
  website: z.string().url().optional(),
});

export type AgencyContact = z.infer<typeof AgencyContactSchema>;

/**
 * Managing agency information schema.
 * Provides contact and jurisdiction info for land managers.
 */
export const ManagingAgencySchema = z.object({
  /** Agency name (e.g., "Monongahela National Forest") */
  name: z.string().min(1),
  /** Jurisdiction description (e.g., "USDA Forest Service") */
  jurisdiction: z.string().min(1),
  /** Contact information (optional) */
  contact: AgencyContactSchema.optional(),
  /** Ranger district name (optional) */
  rangerDistrict: z.string().optional(),
  /** Agency type (optional for backward compatibility) */
  type: AgencyTypeSchema.optional(),
  /** Office location description (optional) */
  officeLocation: z.string().optional(),
});

export type ManagingAgency = z.infer<typeof ManagingAgencySchema>;

// ============================================================================
// REGULATIONS SCHEMA (P1)
// ============================================================================

/**
 * Regulations schema for backcountry areas.
 * Covers permits, fire policies, group sizes, and hunting rules.
 *
 * IMPORTANT: Hunting rules are critical for WV Wild Outdoors audience.
 * Many visitors are hunters who need to know area-specific regulations.
 */
export const RegulationsSchema = z.object({
  /** Whether a permit is required for entry/camping */
  permitRequired: z.boolean(),
  /** Permit details if required (e.g., "Free permit required from ranger station") */
  permitDetails: z.string().optional(),
  /** Permit information if required (e.g., "Free self-registration at trailhead") - alias for permitDetails */
  permitInfo: z.string().optional(),
  /** Fire policies list - at least one required for safety (e.g., ["No fires during drought conditions"]) */
  firePolicies: z.array(z.string().min(1)).min(1),
  /** Camping restrictions (e.g., ["200 feet from water sources"]) */
  campingRestrictions: z.array(z.string().min(1)).optional(),
  /** Group size limits (e.g., "Maximum 10 persons per campsite") */
  groupSizeLimits: z.string().optional(),
  /** Stay limits (e.g., "14-day limit within 30-day period") */
  stayLimits: z.string().optional(),
  /** Special restrictions list (defaults to empty array) */
  specialRestrictions: z.array(z.string()).default([]),
  /** Whether hunting is allowed (defaults to true for WV public lands) */
  huntingAllowed: z.boolean().default(true),
  /** Hunting-specific notes (e.g., "Bow-only during archery season") */
  huntingNotes: z.string().optional(),
});

export type Regulations = z.infer<typeof RegulationsSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get emergency tier color class.
 * Returns Tailwind classes for badge styling.
 *
 * @param tier - Emergency tier level
 * @returns Tailwind color classes string
 */
export function getEmergencyTierColor(tier: EmergencyTier): string {
  return EMERGENCY_TIER_COLORS[tier];
}

/**
 * Get emergency tier label.
 * Returns human-readable label for emergency tier.
 *
 * @param tier - Emergency tier level
 * @returns Human-readable label string
 */
export function getEmergencyTierLabel(tier: EmergencyTier): string {
  return EMERGENCY_TIER_LABELS[tier];
}

/**
 * Get agency type label.
 * Returns human-readable label for agency type.
 *
 * @param type - Agency type
 * @returns Human-readable label string
 */
export function getAgencyTypeLabel(type: AgencyType): string {
  return AGENCY_TYPE_LABELS[type];
}

/**
 * Sort emergency contacts by tier priority.
 * Primary (911) contacts appear first, poison control last.
 *
 * @param contacts - Array of tiered emergency contacts
 * @returns Sorted array with highest priority first
 */
export function sortEmergencyContactsByTier(
  contacts: TieredEmergencyContact[]
): TieredEmergencyContact[] {
  const tierOrder: EmergencyTier[] = ['primary', 'sar', 'agency', 'medical', 'poison'];

  return [...contacts].sort((a, b) => {
    return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
  });
}

/**
 * Filter emergency contacts by tier.
 *
 * @param contacts - Array of tiered emergency contacts
 * @param tier - Tier to filter by
 * @returns Filtered array of contacts
 */
export function filterEmergencyContactsByTier(
  contacts: TieredEmergencyContact[],
  tier: EmergencyTier
): TieredEmergencyContact[] {
  return contacts.filter((contact) => contact.tier === tier);
}

/**
 * Check if area has 24/7 emergency contact.
 * Important for trip planning in remote areas.
 *
 * @param contacts - Array of tiered emergency contacts
 * @returns True if at least one 24/7 contact exists
 */
export function has24x7EmergencyContact(contacts: TieredEmergencyContact[]): boolean {
  return contacts.some(
    (contact) =>
      contact.available.toLowerCase().includes('24/7') ||
      contact.available.toLowerCase().includes('24 hour')
  );
}

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Re-export imported schemas for composition in BackcountryTemplatePropsSchema
export {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  DifficultySchema,
  SeasonSchema,
  NearbyAttractionSchema,
  BackcountryNavigationSchema,
  WaterSourceSchema,
  BackcountryCampingSchema,
  WeatherHazardsSchema,
  SeasonalConditionsSchema,
  BackcountryAccessibilitySchema,
};

// Re-export imported types
export type {
  GearItem,
  RelatedCategory,
  Coordinates,
  StatItem,
  Difficulty,
  Season,
  NearbyAttraction,
  BackcountryNavigation,
  WaterSource,
  BackcountryCamping,
  WeatherHazards,
  SeasonalConditions,
  BackcountryAccessibility,
};

// ============================================================================
// THREAT LEVEL SCHEMA (P0 - SAFETY CRITICAL)
// ============================================================================

/**
 * Threat level for wildlife hazards.
 * Uses industry-standard safety color progression.
 */
export const ThreatLevelSchema = z.enum(['low', 'moderate', 'high', 'extreme']);

export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;

/**
 * Threat level display colors.
 * Follows industry safety standards per CLAUDE.md color exceptions.
 */
export const THREAT_LEVEL_COLORS: Record<ThreatLevel, string> = {
  low: 'bg-sign-green text-white',       // Green - low risk
  moderate: 'bg-yellow-600 text-black',  // Yellow - moderate risk
  high: 'bg-orange-600 text-white',      // Orange - high risk
  extreme: 'bg-red-700 text-white',      // Red - extreme risk
};

/**
 * Human-readable labels for threat levels.
 */
export const THREAT_LEVEL_LABELS: Record<ThreatLevel, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
  extreme: 'Extreme Risk',
};

// ============================================================================
// WILDLIFE HAZARD SCHEMA (P0 - SAFETY CRITICAL)
// ============================================================================

/**
 * Wildlife hazard schema.
 * P0 SAFETY-CRITICAL: Provides essential wildlife safety information.
 *
 * Every hazard must include:
 * - At least one avoidance behavior
 * - At least one encounter protocol
 * - Active seasons
 */
export const WildlifeHazardSchema = z.object({
  /** Species name (e.g., "Black Bear", "Timber Rattlesnake") */
  species: z.string().min(1),
  /** Threat level for this species */
  threatLevel: ThreatLevelSchema,
  /** Seasons when this hazard is active */
  seasons: z.array(z.string().min(1)).min(1),
  /** Behaviors to avoid encounters (min 1 required for safety) */
  avoidanceBehavior: z.array(z.string().min(1)).min(1),
  /** Protocol if encounter occurs (min 1 required for safety) */
  encounterProtocol: z.array(z.string().min(1)).min(1),
  /** Disease transmission risks if applicable */
  diseaseRisks: z.array(z.string().min(1)).optional(),
});

export type WildlifeHazard = z.infer<typeof WildlifeHazardSchema>;

// ============================================================================
// WILDERNESS AREA SCHEMA
// ============================================================================

/**
 * Wilderness area designation and info.
 */
export const WildernessAreaSchema = z.object({
  /** Wilderness area name */
  name: z.string().min(1),
  /** Official designation (e.g., "Designated Wilderness") */
  designation: z.string().min(1),
  /** Total acreage */
  acreage: z.number().positive().optional(),
  /** Year established */
  established: z.number().int().min(1900).max(2100).optional(),
  /** Description of the area */
  description: z.string().optional(),
});

export type WildernessArea = z.infer<typeof WildernessAreaSchema>;

// ============================================================================
// BACKCOUNTRY TRAIL SCHEMA
// ============================================================================

/**
 * Length unit for trails.
 */
export const LengthUnitSchema = z.enum(['miles', 'kilometers']);

export type LengthUnit = z.infer<typeof LengthUnitSchema>;

/**
 * Backcountry trail schema.
 * Describes individual trails within the backcountry area.
 */
export const BackcountryTrailSchema = z.object({
  /** Trail name */
  name: z.string().min(1),
  /** Trail length */
  length: z.number().positive(),
  /** Length unit */
  lengthUnit: LengthUnitSchema,
  /** Trail difficulty */
  difficulty: DifficultySchema,
  /** Elevation gain in feet */
  elevationGain: z.number().nonnegative().optional(),
  /** Estimated hiking time (e.g., "4-6 hours") */
  estimatedTime: z.string().optional(),
  /** Trail description */
  description: z.string().optional(),
  /** Trailhead name or location */
  trailhead: z.string().optional(),
  /** Current trail conditions */
  conditions: z.string().optional(),
  /** Water sources along trail */
  waterSources: z.array(z.string().min(1)).optional(),
});

export type BackcountryTrail = z.infer<typeof BackcountryTrailSchema>;

// ============================================================================
// LEAVE NO TRACE SCHEMA
// ============================================================================

/**
 * Leave No Trace principle schema.
 * Provides educational content about LNT practices.
 */
export const LeaveNoTracePrincipleSchema = z.object({
  /** Principle name (e.g., "Plan Ahead and Prepare") */
  principle: z.string().min(1),
  /** Description of the principle */
  description: z.string().min(1),
  /** Specific tips for applying this principle */
  tips: z.array(z.string().min(1)).min(1),
});

export type LeaveNoTracePrinciple = z.infer<typeof LeaveNoTracePrincipleSchema>;

// ============================================================================
// REQUIRED SKILL SCHEMA
// ============================================================================

/**
 * Skill importance level.
 */
export const SkillImportanceSchema = z.enum(['essential', 'recommended', 'helpful']);

export type SkillImportance = z.infer<typeof SkillImportanceSchema>;

/**
 * Required skill schema.
 * Describes skills needed for safe backcountry travel.
 */
export const RequiredSkillSchema = z.object({
  /** Skill name (e.g., "Map and Compass Navigation") */
  skill: z.string().min(1),
  /** How important this skill is */
  importance: SkillImportanceSchema,
  /** Description of why this skill is needed */
  description: z.string().optional(),
});

export type RequiredSkill = z.infer<typeof RequiredSkillSchema>;

// ============================================================================
// NAVIGATION SUMMARY SCHEMA (Simplified for BackcountryTemplateProps)
// ============================================================================

/**
 * Simplified coordinates for template props.
 */
export const SimpleCoordinatesSchema = z.object({
  decimal: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
});

/**
 * Cell coverage summary.
 */
export const CellCoverageSummarySchema = z.object({
  overall: z.enum(['none', 'weak', 'moderate', 'strong']),
  carriers: z.array(z.string()).optional(),
});

/**
 * Satellite communication info.
 */
export const SatelliteInfoSchema = z.object({
  importance: z.enum(['essential', 'recommended', 'optional']),
  devices: z.array(z.string().min(1)),
});

/**
 * Navigation summary for template props.
 */
export const NavigationSummarySchema = z.object({
  coordinates: SimpleCoordinatesSchema,
  cellCoverage: CellCoverageSummarySchema,
  satellite: SatelliteInfoSchema,
});

export type NavigationSummary = z.infer<typeof NavigationSummarySchema>;

// ============================================================================
// MAIN BACKCOUNTRY TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Complete BackcountryTemplateProps schema.
 * This is the main schema for the backcountry adventure template.
 *
 * REQUIRED FIELDS (P0):
 * - name: Area name
 * - heroImage: Hero image path
 * - navigation: Navigation and communication info
 * - emergencyContacts: At least one emergency contact
 * - regulations: Area regulations
 *
 * OPTIONAL FIELDS:
 * - type: Always 'backcountry'
 * - county: WV county
 * - description: Area description
 * - acreage: Total area size
 * - wildernessArea: Official wilderness designation
 * - wildlifeHazards: Wildlife safety info
 * - trails: Trail information
 * - managingAgency: Agency info
 * - leaveNoTrace: LNT principles
 * - requiredSkills: Needed skills
 */
export const BackcountryTemplatePropsSchema = z.object({
  // ---- Required Fields (P0) ----
  /** Area name */
  name: z.string().min(1),
  /** Hero image path */
  heroImage: z.string().min(1),
  /** Navigation and communication info */
  navigation: NavigationSummarySchema,
  /** Emergency contacts (P0 SAFETY-CRITICAL) - at least one required */
  emergencyContacts: z.array(TieredEmergencyContactSchema).min(1),
  /** Area regulations */
  regulations: RegulationsSchema,

  // ---- Optional Fields ----
  /** Adventure type - always 'backcountry' for this template */
  type: z.literal('backcountry').optional(),
  /** WV county */
  county: z.string().optional(),
  /** Area description */
  description: z.string().optional(),
  /** Total acreage */
  acreage: z.number().positive().optional(),
  /** Wilderness area designation info */
  wildernessArea: WildernessAreaSchema.optional(),
  /** Wildlife hazards (P0 for safety) */
  wildlifeHazards: z.array(WildlifeHazardSchema).max(30).optional(),
  /** Trail information */
  trails: z.array(BackcountryTrailSchema).max(50).optional(),
  /** Managing agency info */
  managingAgency: ManagingAgencySchema.optional(),
  /** Leave No Trace principles */
  leaveNoTrace: z.array(LeaveNoTracePrincipleSchema).max(10).optional(),
  /** Required skills for the area */
  requiredSkills: z.array(RequiredSkillSchema).max(20).optional(),
});

export type BackcountryTemplateProps = z.infer<typeof BackcountryTemplatePropsSchema>;

// ============================================================================
// ADDITIONAL HELPER FUNCTIONS
// ============================================================================

/**
 * Get threat level color classes.
 *
 * @param level - Threat level
 * @returns Tailwind color classes
 */
export function getThreatLevelColor(level: ThreatLevel): string {
  return THREAT_LEVEL_COLORS[level];
}

/**
 * Get threat level label.
 *
 * @param level - Threat level
 * @returns Human-readable label
 */
export function getThreatLevelLabel(level: ThreatLevel): string {
  return THREAT_LEVEL_LABELS[level];
}

/**
 * Check if wildlife hazards exist.
 *
 * @param hazards - Array of wildlife hazards or undefined
 * @returns true if hazards array has entries
 */
export function hasWildlifeHazards(hazards: WildlifeHazard[] | undefined | null): boolean {
  if (!hazards) return false;
  return hazards.length > 0;
}

/**
 * Get the highest threat level from an array of hazards.
 * Useful for displaying overall area threat level.
 *
 * @param hazards - Array of wildlife hazards
 * @returns Highest threat level, or 'low' if empty
 */
export function getHighestThreatLevel(hazards: WildlifeHazard[]): ThreatLevel {
  if (hazards.length === 0) return 'low';

  const priority: ThreatLevel[] = ['extreme', 'high', 'moderate', 'low'];

  for (const level of priority) {
    if (hazards.some((h) => h.threatLevel === level)) {
      return level;
    }
  }

  return 'low';
}

/**
 * Type guard to check if an adventure is a backcountry template.
 *
 * @param adventure - CollectionEntry or any object
 * @returns true if adventure.data.type === 'backcountry'
 */
export function isBackcountryTemplate(adventure: any): boolean {
  if (!adventure) return false;
  if (!adventure.data) return false;
  return adventure.data.type === 'backcountry';
}
