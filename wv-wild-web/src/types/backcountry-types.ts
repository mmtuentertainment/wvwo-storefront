/**
 * Backcountry Template Type Definitions
 * SPEC-17: Backcountry Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV backcountry areas including:
 * - Accessibility with mobility ratings and per-trail wheelchair access
 * - Service animal policies for wilderness settings
 * - Fitness level requirements with concrete examples
 * - Companion and age requirements by difficulty
 * - Medical disclosure requirements
 *
 * Follows CaveAccessibilitySchema pattern from cave-types.ts
 *
 * @module types/backcountry-types
 */

import { z } from 'astro/zod';
import {
  DifficultySchema,
  ThreatLevelSchema,
  type ThreatLevel,
} from './backcountry-template-types';
import {
  SeasonSchema,
} from './adventure';

// ============================================================================
// MOBILITY RATING (4 levels)
// ============================================================================

/**
 * Mobility rating levels for backcountry areas.
 * Describes overall terrain accessibility from wheelchair-accessible to extreme.
 */
export const MobilityRatingSchema = z.enum(['accessible', 'limited', 'rugged', 'extreme']);

export type MobilityRating = z.infer<typeof MobilityRatingSchema>;

/**
 * Human-readable labels for mobility ratings.
 */
export const MOBILITY_RATING_LABELS: Record<MobilityRating, string> = {
  accessible: 'Wheelchair Accessible',
  limited: 'Limited Mobility',
  rugged: 'Rugged Terrain',
  extreme: 'Extreme Terrain',
};

/**
 * Descriptions for each mobility rating level.
 * Helps users understand what to expect.
 */
export const MOBILITY_RATING_DESCRIPTIONS: Record<MobilityRating, string> = {
  accessible: 'Paved or hardened surfaces suitable for wheelchairs and mobility devices. Minimal grade changes.',
  limited: 'Some paved areas but includes uneven surfaces, moderate grades, or obstacles. May require assistance.',
  rugged: 'Unpaved trails with roots, rocks, stream crossings, and significant elevation changes. Not suitable for mobility devices.',
  extreme: 'Challenging terrain requiring scrambling, climbing, or technical navigation. High physical demands.',
};

/**
 * Color classes for mobility rating badges.
 * Uses industry hiking/trail difficulty standards per CLAUDE.md.
 */
export const MOBILITY_RATING_COLORS: Record<MobilityRating, string> = {
  accessible: 'bg-sign-green text-white',   // Green = Easy/Accessible
  limited: 'bg-blue-700 text-white',        // Blue = Moderate/Limited
  rugged: 'bg-red-900 text-white',          // Red = Challenging/Rugged
  extreme: 'bg-black text-white',           // Black = Expert/Extreme
};

/**
 * Shape icons for color-blind accessibility.
 * Follows international hiking trail difficulty standards.
 */
export const MOBILITY_RATING_SHAPES: Record<MobilityRating, string> = {
  accessible: '\u25CF',   // ● (circle) - Green
  limited: '\u25A0',      // ■ (square) - Blue
  rugged: '\u25B2',       // ▲ (triangle) - Red
  extreme: '\u25C6',      // ◆ (diamond) - Black
};

// ============================================================================
// FITNESS LEVEL (5 levels)
// ============================================================================

/**
 * Fitness level requirements for backcountry activities.
 * Each level includes concrete examples to help users self-assess.
 */
export const FitnessLevelSchema = z.enum([
  'sedentary',
  'light',
  'moderate',
  'active',
  'athletic',
]);

export type FitnessLevel = z.infer<typeof FitnessLevelSchema>;

/**
 * Human-readable labels for fitness levels.
 */
export const FITNESS_LEVEL_LABELS: Record<FitnessLevel, string> = {
  sedentary: 'Sedentary',
  light: 'Light Activity',
  moderate: 'Moderate Fitness',
  active: 'Active Lifestyle',
  athletic: 'Athletic/Trained',
};

/**
 * Concrete examples for each fitness level.
 * Helps users self-assess their capability.
 */
export const FITNESS_LEVEL_EXAMPLES: Record<FitnessLevel, string> = {
  sedentary: 'Can walk 1 mile on flat ground without difficulty. No regular exercise routine.',
  light: 'Walks 2-3 miles regularly. Can climb 1-2 flights of stairs without stopping.',
  moderate: 'Exercises 2-3 times weekly. Can hike 5+ miles with moderate elevation gain.',
  active: 'Regular cardiovascular exercise. Can hike 8+ miles with 2,000+ ft elevation gain.',
  athletic: 'Trains regularly for endurance activities. Comfortable with all-day mountain efforts.',
};

// ============================================================================
// COMPANION REQUIREMENT
// ============================================================================

/**
 * Companion requirement types for backcountry travel.
 * Specifies whether solo travel is permitted.
 */
export const CompanionRequirementSchema = z.enum([
  'solo_ok',
  'buddy_recommended',
  'buddy_required',
  'group_required',
]);

export type CompanionRequirement = z.infer<typeof CompanionRequirementSchema>;

/**
 * Human-readable labels for companion requirements.
 */
export const COMPANION_REQUIREMENT_LABELS: Record<CompanionRequirement, string> = {
  solo_ok: 'Solo Travel Permitted',
  buddy_recommended: 'Buddy Recommended',
  buddy_required: 'Buddy Required',
  group_required: 'Group Required (3+)',
};

/**
 * Descriptions explaining companion requirements.
 */
export const COMPANION_REQUIREMENT_DESCRIPTIONS: Record<CompanionRequirement, string> = {
  solo_ok: 'Experienced backcountry travelers may go solo. Always file a trip plan.',
  buddy_recommended: 'Travel with a partner is strongly recommended for safety.',
  buddy_required: 'Must travel with at least one partner. Solo travel not permitted.',
  group_required: 'Must travel in groups of 3 or more. Required for emergency response capability.',
};

// ============================================================================
// AGE REQUIREMENT SCHEMA
// ============================================================================

/**
 * Age requirement by difficulty level.
 * Allows different minimum ages for different trail/activity difficulties.
 */
export const AgeRequirementSchema = z.object({
  /** Difficulty level this age requirement applies to */
  difficulty: DifficultySchema,
  /** Minimum age in years */
  minimumAge: z.number().int().nonnegative().max(21),
  /** Optional notes (e.g., "With guardian" or "Must show ID") */
  notes: z.string().optional(),
});

export type AgeRequirement = z.infer<typeof AgeRequirementSchema>;

// ============================================================================
// TRAIL/ACCESS POINT ACCESSIBILITY
// ============================================================================

/**
 * Per-trail or per-access-point wheelchair accessibility.
 * More granular than overall area accessibility rating.
 */
export const TrailAccessibilitySchema = z.object({
  /** Trail or access point name */
  name: z.string().min(1),
  /** Is this trail/access point wheelchair accessible? */
  wheelchairAccessible: z.boolean(),
  /** Accessibility details (e.g., "First 0.5 miles paved") */
  details: z.string().min(1),
  /** Surface type (e.g., "Paved", "Gravel", "Natural") */
  surfaceType: z.string().optional(),
  /** Maximum grade percentage if known */
  maxGrade: z.string().optional(),
  /** Available accessibility features */
  features: z.array(z.string().min(1)).max(10).optional(),
});

export type TrailAccessibility = z.infer<typeof TrailAccessibilitySchema>;

// ============================================================================
// SERVICE ANIMAL POLICY
// ============================================================================

/**
 * Service animal policy status.
 */
export const ServiceAnimalStatusSchema = z.enum([
  'permitted',
  'restricted',
  'not_permitted',
]);

export type ServiceAnimalStatus = z.infer<typeof ServiceAnimalStatusSchema>;

/**
 * Service animal policy for wilderness areas.
 * Addresses working dogs in backcountry settings.
 */
export const ServiceAnimalPolicySchema = z.object({
  /** Policy status */
  status: ServiceAnimalStatusSchema,
  /** Policy description */
  description: z.string().min(1),
  /** Specific restrictions or requirements (1-10 items) */
  restrictions: z.array(z.string().min(1)).max(10).optional(),
  /** Wildlife concerns (e.g., "Bears active in area", "Sensitive habitat") */
  wildlifeConcerns: z.array(z.string().min(1)).max(10).optional(),
  /** Required documentation */
  requiredDocumentation: z.array(z.string().min(1)).max(5).optional(),
  /** ADA compliance statement */
  adaCompliance: z.string().optional(),
});

export type ServiceAnimalPolicy = z.infer<typeof ServiceAnimalPolicySchema>;

// ============================================================================
// MEDICAL CONDITION DISCLOSURE
// ============================================================================

/**
 * Medical condition requiring disclosure.
 * Lists conditions that users should disclose before backcountry travel.
 */
export const MedicalConditionSchema = z.object({
  /** Condition category (e.g., "Cardiovascular", "Respiratory") */
  category: z.string().min(1),
  /** Specific conditions in this category (1-15 items) */
  conditions: z.array(z.string().min(1)).min(1).max(15),
  /** Why disclosure is important */
  rationale: z.string().min(1),
  /** Recommended actions (e.g., "Consult physician before visit") */
  recommendations: z.array(z.string().min(1)).max(10).optional(),
});

export type MedicalCondition = z.infer<typeof MedicalConditionSchema>;

// ============================================================================
// MAIN BACKCOUNTRY ACCESSIBILITY SCHEMA
// ============================================================================

/**
 * Backcountry accessibility information.
 * Comprehensive accessibility schema for wilderness areas.
 *
 * Follows CaveAccessibilitySchema pattern with backcountry-specific extensions:
 * - Mobility rating (accessible/limited/rugged/extreme)
 * - Per-trail wheelchair access
 * - Service animal policy for wilderness
 * - Fitness level with examples
 * - Companion requirements
 * - Age requirements by difficulty
 * - Medical condition disclosures
 */
export const BackcountryAccessibilitySchema = z.object({
  // ------------------------------------------------------------------------
  // Core accessibility (matches CaveAccessibilitySchema pattern)
  // ------------------------------------------------------------------------

  /** Overall mobility rating for the area */
  mobilityRating: MobilityRatingSchema,

  /** Physical requirements list (1-15 items) */
  physicalRequirements: z.array(z.string().min(1)).min(1).max(15),

  /** Limitations list (1-15 items) */
  limitations: z.array(z.string().min(1)).min(1).max(15),

  /** Optional accommodations available (0-15 items) */
  accommodations: z.array(z.string().min(1)).max(15).optional(),

  /** Optional medical disclaimer text */
  medicalDisclaimer: z.string().optional(),

  /** Optional ADA statement */
  adaStatement: z.string().optional(),

  /** Whether waiver is required */
  waiverRequired: z.boolean().optional(),

  // ------------------------------------------------------------------------
  // Backcountry-specific extensions
  // ------------------------------------------------------------------------

  /** Per-trail/access-point wheelchair accessibility (1-30 items) */
  trailAccessibility: z.array(TrailAccessibilitySchema).min(1).max(30),

  /** Service animal policy */
  serviceAnimalPolicy: ServiceAnimalPolicySchema,

  /** Minimum fitness level required */
  fitnessLevel: FitnessLevelSchema,

  /** Optional custom fitness level description */
  fitnessDescription: z.string().optional(),

  /** Companion requirement */
  companionRequirement: CompanionRequirementSchema,

  /** Age requirements by difficulty level (1-4 items) */
  ageRequirements: z.array(AgeRequirementSchema).min(1).max(4),

  /** Medical conditions requiring disclosure (1-10 categories) */
  medicalConditions: z.array(MedicalConditionSchema).min(1).max(10),

  /** Emergency evacuation notes */
  evacuationNotes: z.string().optional(),

  /** Nearest medical facility */
  nearestMedicalFacility: z.string().optional(),

  /** Cell coverage information */
  cellCoverage: z.string().optional(),

  /** Satellite communication recommended/required */
  satelliteCommRequired: z.boolean().optional(),
});

export type BackcountryAccessibility = z.infer<typeof BackcountryAccessibilitySchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to get mobility rating label.
 * Returns human-readable label for mobility rating.
 *
 * @param rating - Mobility rating level
 * @returns Human-readable label string
 */
export function getMobilityRatingLabel(rating: MobilityRating): string {
  return MOBILITY_RATING_LABELS[rating];
}

/**
 * Helper function to get mobility rating description.
 * Returns detailed description of what to expect.
 *
 * @param rating - Mobility rating level
 * @returns Description string
 */
export function getMobilityRatingDescription(rating: MobilityRating): string {
  return MOBILITY_RATING_DESCRIPTIONS[rating];
}

/**
 * Helper function to get mobility rating color classes.
 * Returns Tailwind classes for badge styling.
 *
 * @param rating - Mobility rating level
 * @returns Tailwind color classes string
 */
export function getMobilityRatingColor(rating: MobilityRating): string {
  return MOBILITY_RATING_COLORS[rating];
}

/**
 * Helper function to get mobility rating shape icon.
 * Returns Unicode shape character for accessibility.
 *
 * @param rating - Mobility rating level
 * @returns Unicode shape character
 */
export function getMobilityRatingShape(rating: MobilityRating): string {
  return MOBILITY_RATING_SHAPES[rating];
}

/**
 * Helper function to get fitness level label.
 * Returns human-readable label for fitness level.
 *
 * @param level - Fitness level
 * @returns Human-readable label string
 */
export function getFitnessLevelLabel(level: FitnessLevel): string {
  return FITNESS_LEVEL_LABELS[level];
}

/**
 * Helper function to get fitness level examples.
 * Returns concrete examples for self-assessment.
 *
 * @param level - Fitness level
 * @returns Example description string
 */
export function getFitnessLevelExample(level: FitnessLevel): string {
  return FITNESS_LEVEL_EXAMPLES[level];
}

/**
 * Helper function to get companion requirement label.
 * Returns human-readable label for companion requirement.
 *
 * @param requirement - Companion requirement type
 * @returns Human-readable label string
 */
export function getCompanionRequirementLabel(requirement: CompanionRequirement): string {
  return COMPANION_REQUIREMENT_LABELS[requirement];
}

/**
 * Helper function to get companion requirement description.
 * Returns detailed description of the requirement.
 *
 * @param requirement - Companion requirement type
 * @returns Description string
 */
export function getCompanionRequirementDescription(requirement: CompanionRequirement): string {
  return COMPANION_REQUIREMENT_DESCRIPTIONS[requirement];
}

/**
 * Type guard to check if an adventure is a Backcountry area.
 * Enables conditional rendering of backcountry-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'backcountry'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isBackcountryAdventure } from '../types/backcountry-types';
 *
 * const adventures = await getCollection('adventures');
 * const backcountry = adventures.filter(isBackcountryAdventure);
 * ---
 * ```
 */
export function isBackcountryAdventure(adventure: any): boolean {
  return adventure?.data?.type === 'backcountry';
}

// ============================================================================
// MANAGING AGENCY (P1 - Required by WildernessAreaSchema)
// ============================================================================

/**
 * Managing agency types for wilderness areas.
 */
export const ManagingAgencySchema = z.enum(['usfs', 'nps', 'wvdnr', 'blm', 'private', 'state-park']);

export type ManagingAgency = z.infer<typeof ManagingAgencySchema>;

/**
 * Human-readable labels for managing agencies.
 */
export const MANAGING_AGENCY_LABELS: Record<ManagingAgency, string> = {
  'usfs': 'U.S. Forest Service',
  'nps': 'National Park Service',
  'wvdnr': 'WV Division of Natural Resources',
  'blm': 'Bureau of Land Management',
  'private': 'Private Land',
  'state-park': 'WV State Parks',
};

/**
 * Helper function to get managing agency label.
 * Returns human-readable label for managing agency.
 *
 * @param agency - Managing agency type
 * @returns Human-readable label string
 */
export function getManagingAgencyLabel(agency: ManagingAgency): string {
  return MANAGING_AGENCY_LABELS[agency];
}

// ============================================================================
// WILDLIFE HAZARDS (P0 - Safety Critical)
// ============================================================================

// ThreatLevelSchema imported from backcountry-template-types.ts (canonical source)

/**
 * Wildlife hazard information.
 * P0 Safety-Critical: Provides essential safety information about wildlife in the area.
 */
export const WildlifeHazardSchema = z.object({
  /** Species name (e.g., "Black Bear", "Timber Rattlesnake") */
  species: z.string().min(1),
  /** Threat level */
  threatLevel: ThreatLevelSchema,
  /** Active seasons */
  seasons: z.array(SeasonSchema).min(1),
  /** How to avoid encounters */
  avoidanceBehavior: z.array(z.string()).min(1),
  /** What to do if encountered */
  encounterProtocol: z.array(z.string()).min(1),
  /** Visual signs to watch for */
  visualIndicators: z.array(z.string()).optional(),
  /** Disease risks (e.g., "Lyme disease", "Giardia") */
  diseaseRisks: z.array(z.string()).optional(),
  /** Kim's personal note */
  kimNote: z.string().optional(),
});

export type WildlifeHazard = z.infer<typeof WildlifeHazardSchema>;

/**
 * Threat level colors following danger color standards.
 * Industry safety colors per CLAUDE.md.
 */
export const THREAT_LEVEL_COLORS: Record<ThreatLevel, string> = {
  low: 'bg-sign-green text-white',
  moderate: 'bg-yellow-600 text-black',
  high: 'bg-orange-600 text-white',
  extreme: 'bg-red-700 text-white',
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

/**
 * Shape icons for threat levels (color-blind accessibility).
 */
export const THREAT_LEVEL_SHAPES: Record<ThreatLevel, string> = {
  low: '\u25CB',        // ○ Open circle
  moderate: '\u25D0',   // ◐ Half circle
  high: '\u25CF',       // ● Filled circle
  extreme: '\u26A0',    // ⚠ Warning triangle
};

// ============================================================================
// WILDERNESS AREAS (P1)
// ============================================================================

/**
 * Federal designation types for wilderness areas.
 */
export const DesignationSchema = z.enum(['wilderness', 'primitive', 'backcountry', 'roadless']);

export type Designation = z.infer<typeof DesignationSchema>;

/**
 * Wilderness area information.
 * Represents federally designated wilderness or primitive areas.
 */
export const WildernessAreaSchema = z.object({
  /** Area name */
  name: z.string().min(1),
  /** Federal designation type */
  designation: DesignationSchema,
  /** Total acreage */
  acreage: z.number().positive(),
  /** Year established */
  established: z.number().int().min(1900).max(2100).optional(),
  /** Managing agency */
  managedBy: ManagingAgencySchema,
  /** Special designations (e.g., "Research Natural Area") */
  specialDesignations: z.array(z.string()).default([]),
  /** Boundary description */
  boundaryDescription: z.string().optional(),
  /** Key highlights */
  highlights: z.array(z.string()).optional(),
});

export type WildernessArea = z.infer<typeof WildernessAreaSchema>;

/**
 * Human-readable labels for designation types.
 */
export const DESIGNATION_LABELS: Record<Designation, string> = {
  wilderness: 'Federally Designated Wilderness',
  primitive: 'Primitive Area',
  backcountry: 'Backcountry Zone',
  roadless: 'Roadless Area',
};

// ============================================================================
// BACKCOUNTRY TRAILS (P1)
// ============================================================================

/**
 * Backcountry trail information.
 * Represents trails in wilderness or primitive areas.
 */
export const BackcountryTrailSchema = z.object({
  /** Trail name */
  name: z.string().min(1),
  /** Official trail number if any */
  trailNumber: z.string().optional(),
  /** Distance (e.g., "4.5 miles") */
  distance: z.string(),
  /** Elevation gain (e.g., "1,200 ft") */
  elevationGain: z.string().optional(),
  /** Difficulty using industry-standard colors */
  difficulty: DifficultySchema,
  /** Trail blazing info */
  blazing: z.string().optional(),
  /** Water sources along trail */
  waterSourceCount: z.number().int().nonnegative().optional(),
  /** Campsite locations */
  campsites: z.array(z.string()).optional(),
  /** Trail-specific hazards */
  hazards: z.array(z.string()).optional(),
  /** Best seasons */
  bestSeasons: z.array(SeasonSchema).optional(),
  /** Kim's trail notes */
  kimNote: z.string().optional(),
});

export type BackcountryTrail = z.infer<typeof BackcountryTrailSchema>;

// ============================================================================
// WILDLIFE HAZARD HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to get threat level color classes.
 * Returns Tailwind classes for badge styling.
 *
 * @param level - Threat level
 * @returns Tailwind color classes string
 */
export function getThreatLevelColor(level: ThreatLevel): string {
  return THREAT_LEVEL_COLORS[level];
}

/**
 * Helper function to get threat level label.
 * Returns human-readable label for threat level.
 *
 * @param level - Threat level
 * @returns Human-readable label string
 */
export function getThreatLevelLabel(level: ThreatLevel): string {
  return THREAT_LEVEL_LABELS[level];
}

/**
 * Helper function to get threat level shape icon.
 * Returns Unicode shape character for accessibility.
 *
 * @param level - Threat level
 * @returns Unicode shape character
 */
export function getThreatLevelShape(level: ThreatLevel): string {
  return THREAT_LEVEL_SHAPES[level];
}

/**
 * Helper function to check if wildlife hazards exist.
 * Returns true if hazards array is non-empty.
 *
 * @param hazards - Wildlife hazards array
 * @returns true if hazards exist
 */
export function hasWildlifeHazards(hazards: WildlifeHazard[] | undefined): boolean {
  return Array.isArray(hazards) && hazards.length > 0;
}

/**
 * Helper function to get highest threat level from hazards.
 * Returns the most severe threat level among all hazards.
 *
 * @param hazards - Wildlife hazards array
 * @returns Highest threat level
 */
export function getHighestThreatLevel(hazards: WildlifeHazard[]): ThreatLevel {
  const levels: ThreatLevel[] = ['low', 'moderate', 'high', 'extreme'];
  let highest = 0;
  for (const hazard of hazards) {
    const idx = levels.indexOf(hazard.threatLevel);
    if (idx > highest) highest = idx;
  }
  return levels[highest];
}

/**
 * Helper function to get designation label.
 * Returns human-readable label for designation type.
 *
 * @param designation - Designation type
 * @returns Human-readable label string
 */
export function getDesignationLabel(designation: Designation): string {
  return DESIGNATION_LABELS[designation];
}

// ============================================================================
// EXAMPLE USAGE / DEFAULT VALUES
// ============================================================================

/**
 * Example BackcountryAccessibility object for reference.
 * Demonstrates expected data structure.
 */
export const BACKCOUNTRY_ACCESSIBILITY_EXAMPLE: BackcountryAccessibility = {
  mobilityRating: 'rugged',
  physicalRequirements: [
    'Ability to hike 5+ miles on uneven terrain',
    'Comfortable with stream crossings',
    'Can carry 20+ lb pack for extended periods',
    'Able to navigate without marked trails',
  ],
  limitations: [
    'No wheelchair access beyond trailheads',
    'Limited cell phone coverage',
    'No restroom facilities on trails',
    'Rescue response may take 4+ hours',
  ],
  accommodations: [
    'Accessible parking at main trailhead',
    'Paved viewing area at visitor center',
    'Accessible restrooms at trailhead',
  ],
  medicalDisclaimer: 'Backcountry travel involves inherent risks. Consult your physician before attempting strenuous activities.',
  adaStatement: 'We strive to provide accessibility information to help visitors plan their experience. Contact us for specific accommodation requests.',
  waiverRequired: true,
  trailAccessibility: [
    {
      name: 'Visitor Center Trail',
      wheelchairAccessible: true,
      details: '0.5 mile paved loop with interpretive signs. Grade under 5%.',
      surfaceType: 'Paved asphalt',
      maxGrade: '4.8%',
      features: ['Benches every 0.1 miles', 'Accessible restroom at trailhead'],
    },
    {
      name: 'Ridge Trail',
      wheelchairAccessible: false,
      details: 'Rocky, steep trail with 2,000 ft elevation gain. Multiple stream crossings.',
      surfaceType: 'Natural - rock and dirt',
    },
  ],
  serviceAnimalPolicy: {
    status: 'restricted',
    description: 'Service animals are permitted but handlers should be aware of wildlife encounters.',
    restrictions: [
      'Must remain on leash at all times',
      'Handler responsible for waste removal',
      'Not recommended during bear activity season (April-November)',
    ],
    wildlifeConcerns: [
      'Black bears active in area',
      'Venomous snakes present',
      'Sensitive ground-nesting bird habitat',
    ],
    adaCompliance: 'Service animals are accommodated per ADA requirements. Emotional support animals are not permitted.',
  },
  fitnessLevel: 'active',
  fitnessDescription: 'Most trails require sustained uphill hiking with full pack. Expect 4-8 hours of physical activity.',
  companionRequirement: 'buddy_recommended',
  ageRequirements: [
    { difficulty: 'easy', minimumAge: 6, notes: 'With guardian' },
    { difficulty: 'moderate', minimumAge: 10, notes: 'With guardian' },
    { difficulty: 'challenging', minimumAge: 14, notes: 'With guardian under 16' },
    { difficulty: 'rugged', minimumAge: 16, notes: 'Must show ID' },
  ],
  medicalConditions: [
    {
      category: 'Cardiovascular',
      conditions: ['Heart disease', 'High blood pressure', 'History of heart attack', 'Pacemaker'],
      rationale: 'High altitude and strenuous activity place significant demands on the cardiovascular system.',
      recommendations: ['Consult cardiologist before visit', 'Carry prescribed medications', 'Know your limits'],
    },
    {
      category: 'Respiratory',
      conditions: ['Asthma', 'COPD', 'Sleep apnea', 'Recent respiratory infection'],
      rationale: 'Reduced oxygen at elevation can exacerbate respiratory conditions.',
      recommendations: ['Bring rescue inhaler', 'Acclimatize gradually', 'Consider pulse oximeter'],
    },
    {
      category: 'Mobility/Orthopedic',
      conditions: ['Knee/hip replacement', 'Chronic back pain', 'Arthritis', 'Recent surgery'],
      rationale: 'Uneven terrain and steep grades stress joints and can worsen existing conditions.',
      recommendations: ['Use trekking poles', 'Choose appropriate trail difficulty', 'Build up gradually'],
    },
  ],
  evacuationNotes: 'Ground evacuation from remote areas may take 4-8 hours. Helicopter evacuation available for life-threatening emergencies only.',
  nearestMedicalFacility: 'Davis Memorial Hospital, Elkins WV - 45 minutes from trailhead',
  cellCoverage: 'No cell coverage on most trails. Limited coverage at ridgetops.',
  satelliteCommRequired: false,
};

// ============================================================================
// TIERED EMERGENCY CONTACT SCHEMA [P0 Safety]
// NOTE: Canonical TieredEmergencyContactSchema is exported from backcountry-template-types.ts
// with extended tier types: 'primary'|'sar'|'agency'|'medical'|'poison'
// ============================================================================

// ============================================================================
// REGULATIONS SCHEMA
// NOTE: Canonical RegulationsSchema is exported from backcountry-template-types.ts
// ============================================================================

// ============================================================================
// SIMPLIFIED BACKCOUNTRY NAVIGATION SCHEMA (for template props)
// ============================================================================

/**
 * Cell carrier coverage info.
 */
export const CarrierCoverageSchema = z.object({
  /** Carrier name (e.g., "Verizon", "AT&T") */
  carrier: z.string().min(1),
  /** Coverage status */
  status: z.enum(['none', 'weak', 'moderate', 'strong']),
  /** Notes about coverage */
  notes: z.string().optional(),
});

export type CarrierCoverage = z.infer<typeof CarrierCoverageSchema>;

/**
 * Simplified cell coverage for template props.
 * Focuses on safety-critical information.
 */
export const SimplifiedCellCoverageSchema = z.object({
  /** Overall coverage status */
  overall: z.enum(['none', 'weak', 'moderate', 'strong']),
  /** Per-carrier breakdown */
  carriers: z.array(CarrierCoverageSchema).optional(),
  /** Nearest location with signal */
  nearestSignal: z.string().optional(),
  /** Notes about coverage */
  notes: z.string().optional(),
});

export type SimplifiedCellCoverage = z.infer<typeof SimplifiedCellCoverageSchema>;

/**
 * Satellite communication info for template props.
 */
export const SatelliteInfoSchema = z.object({
  /** How important is satellite comm for this area */
  importance: z.enum(['essential', 'strongly-recommended', 'recommended', 'optional']),
  /** Recommended devices */
  devices: z.array(z.string().min(1)).optional(),
  /** Coverage notes */
  notes: z.string().optional(),
});

export type SatelliteInfo = z.infer<typeof SatelliteInfoSchema>;

/**
 * Simplified coordinates for template props.
 * Uses the decimal format from navigation-types.
 */
export const TemplateCoordinatesSchema = z.object({
  /** Decimal coordinates */
  decimal: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  /** Optional DMS display string */
  dms: z.string().optional(),
  /** Optional UTM display string */
  utm: z.string().optional(),
});

export type TemplateCoordinates = z.infer<typeof TemplateCoordinatesSchema>;

/**
 * Simplified backcountry navigation schema for BackcountryTemplateProps.
 * Focuses on essential safety info: coordinates, cell coverage, satellite needs.
 *
 * For full navigation data, use BackcountryNavigationSchema from navigation-types.ts.
 */
export const BackcountryNavigationPropsSchema = z.object({
  /** Primary coordinates */
  coordinates: TemplateCoordinatesSchema,
  /** Cell coverage status [P0 Safety] */
  cellCoverage: SimplifiedCellCoverageSchema,
  /** Satellite communication info [P0 Safety] */
  satellite: SatelliteInfoSchema.optional(),
  /** USGS quad map name(s) for paper navigation */
  usgsQuads: z.array(z.string().min(1)).optional(),
  /** Magnetic declination for compass use */
  declination: z.string().optional(),
  /** GPS reliability note */
  gpsNotes: z.string().optional(),
});

export type BackcountryNavigationProps = z.infer<typeof BackcountryNavigationPropsSchema>;

// ============================================================================
// LEAVE NO TRACE PRINCIPLES
// ============================================================================

/**
 * Leave No Trace principle with specific guidelines.
 * Provides area-specific LNT guidance beyond the 7 standard principles.
 */
export const LeaveNoTracePrincipleSchema = z.object({
  /** Principle name (e.g., "Plan Ahead and Prepare") */
  principle: z.string().min(1),
  /** Specific guidelines for this wilderness area */
  guidelines: z.array(z.string().min(1)).min(1).max(15),
});

export type LeaveNoTracePrinciple = z.infer<typeof LeaveNoTracePrincipleSchema>;

// ============================================================================
// REQUIRED SKILLS & GEAR CATEGORIES
// ============================================================================

/**
 * Skill categories for backcountry travel.
 */
export const SkillCategorySchema = z.enum(['navigation', 'survival', 'first-aid', 'weather', 'wildlife']);

export type SkillCategory = z.infer<typeof SkillCategorySchema>;

/**
 * Required skill with importance level.
 */
export const RequiredSkillSchema = z.object({
  /** Skill category */
  category: SkillCategorySchema,
  /** Specific skills needed (e.g., ["Map & compass use", "GPS navigation"]) */
  skills: z.array(z.string().min(1)).min(1).max(15),
  /** How important is this skill category */
  importance: z.enum(['essential', 'recommended', 'helpful']),
});

export type RequiredSkill = z.infer<typeof RequiredSkillSchema>;

// ============================================================================
// NEARBY ATTRACTION SCHEMA (for template props)
// ============================================================================

/**
 * Nearby attraction for multi-day trip planning.
 * Provides local context and multi-destination trip support.
 */
export const NearbyAttractionSchema = z.object({
  /** Attraction name */
  name: z.string().min(1),
  /** Distance from backcountry area (e.g., "5 miles", "30 min drive") */
  distance: z.string(),
  /** Brief description */
  description: z.string().min(1),
  /** Optional website or contact info */
  link: z.string().url().optional(),
});

export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;

// ============================================================================
// BACKCOUNTRY TEMPLATE PROPS SCHEMA (Main Composition)
// NOTE: Canonical BackcountryTemplatePropsSchema is exported from backcountry-template-types.ts
// Uses NavigationSummarySchema and extended TieredEmergencyContactSchema with tier types:
// 'primary'|'sar'|'agency'|'medical'|'poison'
// ============================================================================

// ============================================================================
// TYPE GUARD FUNCTIONS
// ============================================================================

/**
 * Type guard to check if an adventure entry is a backcountry template.
 * Enables conditional rendering of backcountry-specific components.
 *
 * @param adventure - Unknown adventure entry
 * @returns true if adventure.data.type === 'backcountry'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isBackcountryTemplate } from '../types/backcountry-types';
 *
 * const adventures = await getCollection('adventures');
 * const backcountry = adventures.filter(isBackcountryTemplate);
 * ---
 * ```
 */
export function isBackcountryTemplate(adventure: unknown): adventure is { data: BackcountryTemplateProps } {
  if (!adventure || typeof adventure !== 'object') return false;
  const entry = adventure as { data?: { type?: string } };
  return entry.data?.type === 'backcountry';
}

// ============================================================================
// EXAMPLE CONSTANTS FOR DOCUMENTATION/TESTING
// NOTE: BackcountryTemplateProps and TieredEmergencyContact examples are in
// backcountry-template-types.ts which has the canonical schema definitions.
// ============================================================================

/**
 * Example wildlife hazard for black bear (common in WV).
 */
export const WILDLIFE_HAZARD_EXAMPLE: WildlifeHazard = {
  species: 'Black Bear',
  threatLevel: 'moderate',
  seasons: ['spring', 'summer', 'fall'],
  avoidanceBehavior: [
    'Store food in bear canisters or hang at least 10ft high, 4ft from trunk',
    'Cook and eat 200+ feet from sleeping area',
    'Never approach or feed bears',
    'Make noise while hiking to avoid surprise encounters',
  ],
  encounterProtocol: [
    'Do not run - back away slowly while facing the bear',
    'Make yourself appear large, speak in calm, firm voice',
    'If attacked, fight back - do NOT play dead with black bears',
    'Use bear spray if available (aim for face at 20-30 feet)',
  ],
  kimNote: 'I see bears out here every season. They want your food, not you. Keep a clean camp and make noise - never had a problem in 30 years.',
};
