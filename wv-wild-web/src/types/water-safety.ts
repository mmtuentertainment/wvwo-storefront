/**
 * Water Source Safety Type Definitions
 * SPEC-17 Extension: Critical water safety schemas for WV backcountry
 *
 * CRITICAL SAFETY CONTEXT:
 * West Virginia has extensive coal mining history dating back to the 1800s.
 * Acid Mine Drainage (AMD) can contaminate water sources with toxic heavy metals
 * (iron, aluminum, manganese, sulfates) that CANNOT be removed by standard
 * backcountry water treatment methods (filters, chemicals, boiling).
 *
 * A "do-not-use" designation is LIFE SAFETY CRITICAL.
 *
 * @module types/water-safety
 */

import { z } from 'astro/zod';
import { CoordinatesSchema } from './adventure';

// ============================================================================
// WATER SOURCE STATUS (LIFE SAFETY CRITICAL)
// ============================================================================

/**
 * Water source safety status - THE MOST CRITICAL FIELD.
 *
 * SAFETY HIERARCHY (in order of precedence):
 * 1. do-not-use - NEVER consume, even after treatment. AMD/toxic contamination.
 * 2. treat-required - Safe after proper treatment. Standard backcountry source.
 * 3. safe - Potable without treatment (rare - verified spring sources only).
 *
 * Colors follow danger/safety conventions:
 * - Red = Danger (do-not-use)
 * - Yellow/Amber = Caution (treat-required)
 * - Green = Safe
 */
export const WaterStatusSchema = z.enum(['safe', 'treat-required', 'do-not-use']);

export type WaterStatus = z.infer<typeof WaterStatusSchema>;

/**
 * Water status display configuration.
 * Colors intentionally use danger/warning conventions that override brand palette.
 *
 * @see CLAUDE.md "Industry safety colors OVERRIDE WVWO brand palette"
 */
export const WATER_STATUS_CONFIG: Record<
  WaterStatus,
  {
    label: string;
    icon: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    description: string;
  }
> = {
  safe: {
    label: 'Safe to Drink',
    icon: '\u2713', // Check mark
    colorClass: 'text-sign-green',
    bgClass: 'bg-sign-green/10',
    borderClass: 'border-sign-green',
    description: 'Verified potable source. No treatment required.',
  },
  'treat-required': {
    label: 'Treatment Required',
    icon: '\u26A0', // Warning triangle
    colorClass: 'text-yellow-600',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-500',
    description: 'Standard backcountry source. Filter, boil, or chemically treat before drinking.',
  },
  'do-not-use': {
    label: 'DO NOT USE',
    icon: '\u2620', // Skull and crossbones
    colorClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-700',
    description: 'TOXIC - Cannot be made safe by any field treatment. AMD or industrial contamination.',
  },
};

// ============================================================================
// WATER SOURCE RELIABILITY
// ============================================================================

/**
 * Water source reliability throughout the year.
 * Critical for trip planning in WV where seasonal droughts occur.
 */
export const WaterReliabilitySchema = z.enum([
  'year-round',  // Flows consistently, even in drought
  'seasonal',    // Flows during wet seasons, may dry up in late summer
  'unreliable',  // Cannot be depended upon, backup source required
]);

export type WaterReliability = z.infer<typeof WaterReliabilitySchema>;

export const WATER_RELIABILITY_LABELS: Record<WaterReliability, string> = {
  'year-round': 'Year-Round',
  'seasonal': 'Seasonal',
  'unreliable': 'Unreliable',
};

// ============================================================================
// WATER TREATMENT METHODS
// ============================================================================

/**
 * Recommended treatment method for safe sources.
 * Note: These DO NOT apply to "do-not-use" sources.
 */
export const WaterTreatmentSchema = z.enum([
  'filter',          // Mechanical filtration (0.2 micron or better)
  'chemical',        // Iodine, chlorine dioxide, or similar
  'boil',            // Rolling boil for 1+ minutes
  'uv',              // UV light treatment (SteriPEN, etc.)
  'none-required',   // Already potable (verified spring)
  'not-applicable',  // For do-not-use sources
]);

export type WaterTreatment = z.infer<typeof WaterTreatmentSchema>;

export const WATER_TREATMENT_LABELS: Record<WaterTreatment, string> = {
  filter: 'Mechanical Filtration',
  chemical: 'Chemical Treatment',
  boil: 'Boiling Required',
  uv: 'UV Treatment',
  'none-required': 'No Treatment Needed',
  'not-applicable': 'N/A - Do Not Use',
};

// ============================================================================
// AMD (ACID MINE DRAINAGE) WARNING TYPES
// ============================================================================

/**
 * Known contaminant types in WV backcountry water.
 * AMD is the primary concern, but other contamination sources exist.
 */
export const ContaminantTypeSchema = z.enum([
  'amd',                    // Acid Mine Drainage - most common in WV
  'coal-runoff',            // Coal processing contamination
  'agricultural',           // Farm runoff, pesticides
  'bacterial',              // E. coli, giardia (treatable)
  'industrial',             // Non-mining industrial pollution
  'natural-mineral',        // High natural mineral content
  'unknown',                // Suspected contamination, unconfirmed
]);

export type ContaminantType = z.infer<typeof ContaminantTypeSchema>;

/**
 * Contaminant display information.
 * Provides educational context for visitors unfamiliar with WV hazards.
 */
export const CONTAMINANT_INFO: Record<
  ContaminantType,
  {
    name: string;
    shortDescription: string;
    treatable: boolean;
    severity: 'critical' | 'high' | 'moderate';
  }
> = {
  amd: {
    name: 'Acid Mine Drainage',
    shortDescription: 'Heavy metals from historic coal mining. Cannot be filtered or treated in the field.',
    treatable: false,
    severity: 'critical',
  },
  'coal-runoff': {
    name: 'Coal Processing Runoff',
    shortDescription: 'Contamination from coal washing and processing. Contains heavy metals and chemicals.',
    treatable: false,
    severity: 'critical',
  },
  agricultural: {
    name: 'Agricultural Runoff',
    shortDescription: 'Farm chemicals, fertilizers, and animal waste. Avoid during/after rain.',
    treatable: false,
    severity: 'high',
  },
  bacterial: {
    name: 'Bacterial Contamination',
    shortDescription: 'Standard pathogens (giardia, crypto). Treatable with proper filtration or boiling.',
    treatable: true,
    severity: 'moderate',
  },
  industrial: {
    name: 'Industrial Contamination',
    shortDescription: 'Non-mining industrial pollution. Unknown chemicals present.',
    treatable: false,
    severity: 'critical',
  },
  'natural-mineral': {
    name: 'High Natural Minerals',
    shortDescription: 'Naturally occurring minerals. May have metallic taste but generally safe.',
    treatable: true,
    severity: 'moderate',
  },
  unknown: {
    name: 'Unknown Contamination',
    shortDescription: 'Source appears contaminated but specific contaminant not confirmed. Treat as unsafe.',
    treatable: false,
    severity: 'high',
  },
};

// ============================================================================
// AMD WARNING SCHEMA
// ============================================================================

/**
 * AMD (Acid Mine Drainage) warning details.
 * Provides context for why a source is marked do-not-use.
 */
export const AMDWarningSchema = z.object({
  /** Type of contamination present */
  contaminantType: ContaminantTypeSchema,

  /** Visual indicators that may be present */
  visualIndicators: z.array(z.string()).optional(),

  /** Source of contamination if known (e.g., "Abandoned Elk Run Mine") */
  knownSource: z.string().optional(),

  /** Distance from contamination source if known */
  distanceFromSource: z.string().optional(),

  /** Last water quality test date (ISO 8601) */
  lastTested: z.string().optional(),

  /** Authority that tested/designated (e.g., "WV DEP", "USFS") */
  testedBy: z.string().optional(),
});

export type AMDWarning = z.infer<typeof AMDWarningSchema>;

// ============================================================================
// COMPLETE WATER SOURCE SCHEMA
// ============================================================================

/**
 * Complete water source schema for SPEC-17 BackcountryTemplate.
 * Replaces the insufficient { name, reliability, treatment } structure.
 *
 * CRITICAL FIELDS (required for all sources):
 * - name: Human-readable identifier
 * - status: LIFE SAFETY designation (safe/treat-required/do-not-use)
 * - reliability: Seasonal availability
 *
 * CONDITIONAL FIELDS:
 * - treatment: Required if status is "treat-required" or "safe"
 * - warnings: Strongly recommended if status is "do-not-use"
 * - amdDetails: Detailed contamination info for AMD sources
 */
export const WaterSourceSchema = z.object({
  /** Human-readable water source name (e.g., "Otter Creek", "Spruce Knob Spring") */
  name: z.string().min(1),

  /**
   * CRITICAL: Safety status of water source.
   * "do-not-use" sources are TOXIC and cannot be treated.
   */
  status: WaterStatusSchema,

  /** Seasonal reliability for trip planning */
  reliability: WaterReliabilitySchema,

  /**
   * Recommended treatment method.
   * Must be "not-applicable" for do-not-use sources.
   */
  treatment: WaterTreatmentSchema,

  /**
   * Warning messages displayed to users.
   * Required for do-not-use sources.
   * @example ["AMD contamination", "Orange/rust-colored water", "Historic mining area"]
   */
  warnings: z.array(z.string().min(1)).optional(),

  /** Detailed AMD/contamination information */
  amdDetails: AMDWarningSchema.optional(),

  /**
   * Last verified test date (ISO 8601 format).
   * Important for liability and user trust.
   */
  testDate: z.string().optional(),

  /** GPS coordinates for mapping */
  location: CoordinatesSchema.optional(),

  /**
   * Type of water source for context.
   * Helps users understand what to expect.
   */
  sourceType: z.enum([
    'stream',
    'river',
    'spring',
    'lake',
    'pond',
    'seep',
    'well',
  ]).optional(),

  /**
   * Additional notes (Kim's wisdom, access notes, etc.)
   * @example "Best accessed from North Fork trailhead. Runs clear even after rain."
   */
  notes: z.string().optional(),

  /**
   * Elevation in feet (useful for planning water carries)
   */
  elevation: z.number().positive().optional(),

  /**
   * Trail mile marker if applicable (e.g., "Mile 4.2")
   */
  trailMile: z.string().optional(),

  /**
   * Distance from nearest trailhead or landmark
   */
  distanceFromTrailhead: z.string().optional(),
}).refine(
  (data) => {
    // Enforce: do-not-use sources must have treatment as not-applicable
    if (data.status === 'do-not-use' && data.treatment !== 'not-applicable') {
      return false;
    }
    return true;
  },
  {
    message: 'Sources with status "do-not-use" must have treatment set to "not-applicable"',
  }
).refine(
  (data) => {
    // Strongly encourage: do-not-use sources should have warnings
    // (This is a warning, not a hard fail)
    if (data.status === 'do-not-use' && (!data.warnings || data.warnings.length === 0)) {
      console.warn(`Water source "${data.name}" is do-not-use but has no warnings. Add warnings for user safety.`);
    }
    return true;
  },
  {
    message: 'do-not-use sources should include warning messages',
  }
);

export type WaterSource = z.infer<typeof WaterSourceSchema>;

// ============================================================================
// BACKCOUNTRY CAMPING SCHEMA (UPDATED)
// ============================================================================

/**
 * Updated camping schema with comprehensive water safety.
 * Replaces SPEC-17's insufficient waterSources structure.
 */
export const BackcountryCampingSchema = z.object({
  /** Camping regulations list */
  regulations: z.array(z.string().min(1)).min(1),

  /** Permitted camping types (e.g., "Dispersed camping allowed") */
  permittedSites: z.string().min(1),

  /**
   * UPDATED: Comprehensive water sources with AMD safety.
   * Uses full WaterSourceSchema instead of simple { name, reliability, treatment }.
   */
  waterSources: z.array(WaterSourceSchema).min(0).max(50),

  /** Camping restrictions */
  restrictions: z.array(z.string().min(1)).min(0),

  /**
   * General water safety advisory for the area.
   * Displayed at the top of water sources section.
   */
  waterSafetyAdvisory: z.string().optional(),

  /**
   * True if area has known AMD issues.
   * Triggers enhanced AMD education section in UI.
   */
  hasAMDConcerns: z.boolean().optional().default(false),
});

export type BackcountryCamping = z.infer<typeof BackcountryCampingSchema>;

// ============================================================================
// UI HELPER FUNCTIONS
// ============================================================================

/**
 * Get display configuration for a water source status.
 *
 * @param status - Water source status
 * @returns Display configuration with colors, icons, and labels
 */
export function getWaterStatusConfig(status: WaterStatus) {
  return WATER_STATUS_CONFIG[status];
}

/**
 * Get contaminant information for educational display.
 *
 * @param type - Contaminant type
 * @returns Contaminant info with name, description, and severity
 */
export function getContaminantInfo(type: ContaminantType) {
  return CONTAMINANT_INFO[type];
}

/**
 * Check if a water source should display AMD warning section.
 *
 * @param source - Water source object
 * @returns True if AMD-specific warnings should be shown
 */
export function hasAMDWarning(source: WaterSource): boolean {
  if (source.amdDetails?.contaminantType === 'amd') return true;
  if (source.amdDetails?.contaminantType === 'coal-runoff') return true;
  if (source.warnings?.some(w =>
    w.toLowerCase().includes('amd') ||
    w.toLowerCase().includes('acid mine') ||
    w.toLowerCase().includes('mining')
  )) return true;
  return false;
}

/**
 * Filter water sources by status for section rendering.
 *
 * @param sources - Array of water sources
 * @param status - Status to filter by
 * @returns Filtered array of water sources
 */
export function filterWaterSourcesByStatus(
  sources: WaterSource[],
  status: WaterStatus
): WaterSource[] {
  return sources.filter(s => s.status === status);
}

/**
 * Get count of water sources by status.
 * Useful for displaying summary badges.
 *
 * @param sources - Array of water sources
 * @returns Object with counts by status
 */
export function getWaterSourceCounts(sources: WaterSource[]): Record<WaterStatus, number> {
  return {
    safe: sources.filter(s => s.status === 'safe').length,
    'treat-required': sources.filter(s => s.status === 'treat-required').length,
    'do-not-use': sources.filter(s => s.status === 'do-not-use').length,
  };
}

/**
 * Check if any water sources in a list have do-not-use status.
 * Used to determine if danger warning should be prominently displayed.
 *
 * @param sources - Array of water sources
 * @returns True if any source is marked do-not-use
 */
export function hasDoNotUseSources(sources: WaterSource[]): boolean {
  return sources.some(s => s.status === 'do-not-use');
}

// ============================================================================
// AMD EDUCATIONAL CONTENT
// ============================================================================

/**
 * Educational content about AMD for visitors unfamiliar with WV hazards.
 * Rendered when hasAMDConcerns is true or do-not-use sources exist.
 */
export const AMD_EDUCATION = {
  title: 'Understanding Acid Mine Drainage (AMD)',

  introduction: `West Virginia's coal mining history spans over 150 years, leaving behind
thousands of abandoned mines. When exposed to air and water, minerals in these mines
create acidic runoff laden with heavy metals. This "Acid Mine Drainage" (AMD) is a
serious hazard that cannot be treated with standard backcountry water purification methods.`,

  visualIndicators: [
    'Orange, red, or rust-colored water or streambed',
    'White, gray, or yellow mineral deposits on rocks',
    'Lack of aquatic life in otherwise healthy-looking streams',
    'Metallic or sulfur smell',
    'Oily sheen on water surface',
    'Dead vegetation along stream banks',
  ],

  whyItsDangerous: `AMD contains dissolved heavy metals including iron, aluminum, manganese,
zinc, and sometimes arsenic or lead. These metals are dissolved at the molecular level
and CANNOT be removed by:
- Water filters (even 0.2 micron)
- Boiling
- Chemical treatment (iodine, chlorine)
- UV purification

Consuming AMD-contaminated water can cause gastrointestinal illness, heavy metal
poisoning, and long-term health effects.`,

  safetyGuidelines: [
    'Never drink from orange-tinted water sources',
    'Carry extra water when hiking in former mining areas',
    'Check this guide for verified water source status before your trip',
    'When in doubt, do not drink',
    'Report suspected contaminated sources to WV DEP',
  ],

  kimNote: `"I grew up around these mountains and the old mines. My daddy taught me to never
drink from orange creeks, no matter how thirsty you get. Carry your water in, folks.
Better to be thirsty than sick." - Kim`,
};

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if a water source is safe to use (with or without treatment).
 *
 * @param source - Water source to check
 * @returns True if source is safe or treat-required
 */
export function isUsableWaterSource(source: WaterSource): boolean {
  return source.status === 'safe' || source.status === 'treat-required';
}

/**
 * Type guard to check if a water source requires no treatment.
 *
 * @param source - Water source to check
 * @returns True only if source is verified safe without treatment
 */
export function isPotableWaterSource(source: WaterSource): boolean {
  return source.status === 'safe' && source.treatment === 'none-required';
}

/**
 * Type guard to check if a water source is toxic/unusable.
 *
 * @param source - Water source to check
 * @returns True if source should never be consumed
 */
export function isToxicWaterSource(source: WaterSource): boolean {
  return source.status === 'do-not-use';
}
