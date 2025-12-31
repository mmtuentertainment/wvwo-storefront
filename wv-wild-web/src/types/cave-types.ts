/**
 * Cave Template Type Definitions
 * SPEC-16: Cave/Cavern Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV caves including:
 * - Formation types with educational labels and descriptions
 * - Tour difficulty with WCAG-compliant color coding
 * - Accessibility requirements and accommodations
 * - Safety guidelines and emergency contacts
 * - Pricing and seasonal hours
 *
 * @module types/cave-types
 */

import { z } from 'astro/zod';
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  NearbyAttractionSchema,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
  type StatItem,
  type NearbyAttraction,
} from './adventure';

// ============================================================================
// FORMATION TYPE TAXONOMY (14 types)
// ============================================================================

/**
 * Geological formation types found in WV caves.
 * Comprehensive taxonomy covering stalactites to large chambers.
 */
export const FormationTypeSchema = z.enum([
  'stalactite',
  'stalagmite',
  'column',
  'flowstone',
  'soda_straw',
  'drapery',
  'helictite',
  'rimstone_pool',
  'cave_coral',
  'cave_ribbon',
  'fossil',
  'underground_pool',
  'large_chamber',
  'other',
]);

export type FormationType = z.infer<typeof FormationTypeSchema>;

/**
 * Human-readable labels for formation types.
 * Used in formation cards and badges.
 */
export const FORMATION_TYPE_LABELS: Record<FormationType, string> = {
  stalactite: 'Stalactite',
  stalagmite: 'Stalagmite',
  column: 'Column',
  flowstone: 'Flowstone',
  soda_straw: 'Soda Straw',
  drapery: 'Drapery / Bacon Strip',
  helictite: 'Helictite',
  rimstone_pool: 'Rimstone Pool',
  cave_coral: 'Cave Coral / Popcorn',
  cave_ribbon: 'Cave Ribbon',
  fossil: 'Fossil',
  underground_pool: 'Underground Pool',
  large_chamber: 'Large Chamber',
  other: 'Other Formation',
};

/**
 * Educational descriptions for formation types.
 * Accessible language explaining how each formation develops.
 */
export const FORMATION_TYPE_DESCRIPTIONS: Record<FormationType, string> = {
  stalactite: 'Icicle-shaped formations hanging from cave ceilings, formed by dripping mineral-rich water.',
  stalagmite: 'Cone-shaped formations rising from cave floors, built up from dripping water over millennia.',
  column: 'Formed when a stalactite and stalagmite meet and fuse together over thousands of years.',
  flowstone: 'Sheet-like deposits formed by water flowing over cave surfaces, often resembling frozen waterfalls.',
  soda_straw: 'Thin, hollow tubes that are the earliest stage of stalactite formation.',
  drapery: 'Thin, wavy sheets of calcite resembling curtains or bacon strips, formed by water running down sloped ceilings.',
  helictite: 'Twisted, curving formations that seem to defy gravity, formed by capillary forces.',
  rimstone_pool: 'Dam-like formations surrounding shallow pools, built up by mineral precipitation.',
  cave_coral: 'Knobby, popcorn-like formations covering cave surfaces, formed by seeping water.',
  cave_ribbon: 'Rare, ribbon-like formations with distinctive wave patterns, unique to certain caves.',
  fossil: 'Preserved remains of ancient marine life embedded in cave walls, evidence of prehistoric seas.',
  underground_pool: 'Still bodies of water within caves, often crystal clear and containing unique ecosystems.',
  large_chamber: 'Spacious underground rooms carved by water over millions of years.',
  other: 'Unique geological feature not fitting standard categories.',
};

// ============================================================================
// TOUR DIFFICULTY (4 levels)
// ============================================================================

/**
 * Tour difficulty levels for cave tours.
 * Ranges from easy walking tours to wild cave adventures.
 */
export const TourDifficultySchema = z.enum(['easy', 'moderate', 'strenuous', 'wild_cave']);

export type TourDifficulty = z.infer<typeof TourDifficultySchema>;

/**
 * Border-left color classes for tour cards.
 * Used to visually distinguish difficulty levels.
 */
export const TOUR_DIFFICULTY_COLORS: Record<TourDifficulty, string> = {
  easy: 'border-l-sign-green',
  moderate: 'border-l-brand-brown',
  strenuous: 'border-l-brand-orange',
  wild_cave: 'border-l-red-800',
};

/**
 * Badge background/text color classes for tour difficulty.
 * CRITICAL: strenuous uses text-brand-brown on orange for WCAG 4.5:1 contrast.
 */
export const TOUR_DIFFICULTY_BADGES: Record<TourDifficulty, string> = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-brown text-brand-cream',
  strenuous: 'bg-brand-orange text-brand-brown', // Fixed contrast: 5.81:1
  wild_cave: 'bg-red-800 text-white',
};

/**
 * Human-readable labels for tour difficulty levels.
 */
export const TOUR_DIFFICULTY_LABELS: Record<TourDifficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  strenuous: 'Strenuous',
  wild_cave: 'Wild Cave',
};

// ============================================================================
// CAVE TOUR SCHEMA
// ============================================================================

/**
 * Cave tour information.
 * Represents a single tour option with duration, difficulty, and highlights.
 */
export const CaveTourSchema = z.object({
  /** Tour name (e.g., "Walking Tour", "Wild Cave Adventure") */
  name: z.string().min(1),
  /** Duration (e.g., "60 minutes", "2-3 hours") */
  duration: z.string().min(1),
  /** Tour difficulty level */
  difficulty: TourDifficultySchema,
  /** Optional tour distance (e.g., "0.5 miles") */
  distance: z.string().optional(),
  /** Optional stair count (e.g., 250) */
  stairs: z.number().int().nonnegative().optional(),
  /** Optional group size (e.g., "Up to 15") */
  groupSize: z.string().optional(),
  /** Tour highlights (required, 1-10 items) */
  highlights: z.array(z.string().min(1)).min(1).max(10),
  /** Optional seasonal notes */
  seasonalNotes: z.string().optional(),
  /** Optional minimum age requirement */
  ageMinimum: z.number().int().nonnegative().optional(),
  /** Whether reservation is required */
  reservationRequired: z.boolean().optional(),
});

export type CaveTour = z.infer<typeof CaveTourSchema>;

// ============================================================================
// CAVE FORMATION SCHEMA
// ============================================================================

/**
 * Cave formation information.
 * Represents a notable geological feature with educational content.
 */
export const CaveFormationSchema = z.object({
  /** Formation name (e.g., "Mirror Lake", "War Club Stalactite") */
  name: z.string().min(1),
  /** Formation type from taxonomy */
  type: FormationTypeSchema,
  /** Display name for type (e.g., "Stalactite", "Underground Pool") */
  typeDisplay: z.string().min(1),
  /** Formation description (10-500 chars) */
  description: z.string().min(10).max(500),
  /** Optional age estimate (e.g., "300 million years old") */
  ageEstimate: z.string().optional(),
  /** Optional dimensions (e.g., "37 feet tall") */
  dimensions: z.string().optional(),
  /** Optional educational fun fact in neutral voice */
  funFact: z.string().optional(),
  /** Whether this is a featured/highlight formation */
  highlight: z.boolean().default(false),
  /** Optional Kim's personal tip in her voice */
  kimNote: z.string().optional(),
});

export type CaveFormation = z.infer<typeof CaveFormationSchema>;

// ============================================================================
// CAVE CONDITIONS SCHEMA
// ============================================================================

/**
 * Cave conditions information.
 * Temperature, humidity, and preparation guidance.
 */
export const CaveConditionsSchema = z.object({
  /** Temperature (e.g., "54°F year-round") */
  temperature: z.string().min(1),
  /** Optional humidity (e.g., "High (90-100%)") */
  humidity: z.string().optional(),
  /** What to wear list (1-10 items) */
  whatToWear: z.array(z.string().min(1)).min(1).max(10),
  /** What to bring list (1-10 items) */
  whatToBring: z.array(z.string().min(1)).min(1).max(10),
});

export type CaveConditions = z.infer<typeof CaveConditionsSchema>;

// ============================================================================
// CAVE ACCESSIBILITY SCHEMA
// ============================================================================

/**
 * Cave accessibility information.
 * Physical requirements, limitations, and accommodations.
 */
export const CaveAccessibilitySchema = z.object({
  /** Physical requirements list (1-15 items) */
  physicalRequirements: z.array(z.string().min(1)).min(1).max(15),
  /** Limitations list (1-15 items) */
  limitations: z.array(z.string().min(1)).min(1).max(15),
  /** Optional accommodations available */
  accommodations: z.array(z.string().min(1)).max(15).optional(),
  /** Optional medical disclaimer text */
  medicalDisclaimer: z.string().optional(),
  /** Optional ADA statement */
  adaStatement: z.string().optional(),
  /** Whether waiver is required */
  waiverRequired: z.boolean().optional(),
});

export type CaveAccessibility = z.infer<typeof CaveAccessibilitySchema>;

// ============================================================================
// CAVE PRICING SCHEMA
// ============================================================================

/**
 * Cave pricing entry.
 * Ticket type with price and optional notes.
 */
export const CavePricingSchema = z.object({
  /** Ticket tier (e.g., "Adult", "Child (6-12)", "Senior") */
  tier: z.string().min(1),
  /** Price (e.g., "$18", "See website") */
  price: z.string().min(1),
  /** Optional notes (e.g., "Ages 6-12") */
  notes: z.string().optional(),
});

export type CavePricing = z.infer<typeof CavePricingSchema>;

// ============================================================================
// CAVE HOURS SCHEMA
// ============================================================================

/**
 * Cave operating hours.
 * Seasonal schedule with days and times.
 */
export const CaveHoursSchema = z.object({
  /** Season (e.g., "Summer (June-August)", "Winter") */
  season: z.string().min(1),
  /** Days open (e.g., "Daily", "Fri-Sun") */
  days: z.string().min(1),
  /** Hours (e.g., "9am - 5pm") */
  hours: z.string().min(1),
  /** Optional notes (e.g., "Last tour at 4pm") */
  notes: z.string().optional(),
});

export type CaveHours = z.infer<typeof CaveHoursSchema>;

// ============================================================================
// CAVE SAFETY SCHEMA
// ============================================================================

/**
 * Cave safety information.
 * Rules, prohibited items, and emergency contact.
 */
export const CaveSafetySchema = z.object({
  /** Safety rules list (1-20 items) */
  rules: z.array(z.string().min(1)).min(1).max(20),
  /** Prohibited items list (1-15 items) */
  prohibited: z.array(z.string().min(1)).min(1).max(15),
  /** Optional emergency contact (e.g., "911" or "(304) 567-8900") */
  emergencyContact: z.string().optional(),
});

export type CaveSafety = z.infer<typeof CaveSafetySchema>;

// ============================================================================
// CAVE HISTORY SCHEMA
// ============================================================================

/**
 * Cave history information.
 * Discovery story, geological age, and notable events.
 */
export const CaveHistorySchema = z.object({
  /** Discovery story prose */
  discoveryStory: z.string().min(1),
  /** Geological age context (e.g., "Formed 300 million years ago") */
  geologicalAge: z.string().min(1),
  /** Optional notable events list */
  notableEvents: z.array(z.string().min(1)).max(10).optional(),
  /** Optional local legends list */
  localLegends: z.array(z.string().min(1)).max(5).optional(),
});

export type CaveHistory = z.infer<typeof CaveHistorySchema>;

// ============================================================================
// MAIN CAVE TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Complete Cave Template Props Schema.
 * Validates all required and optional fields for cave destination pages.
 */
export const CaveTemplatePropsSchema = z.object({
  // Hero Section (Required)
  /** Cave name */
  name: z.string().min(1),
  /** Hero image source */
  image: z.string().min(1),
  /** Hero image alt text */
  imageAlt: z.string().min(1),
  /** Cave tagline */
  tagline: z.string().min(1),
  /** Full description (rendered as prose) */
  description: z.string().min(1),
  /** Quick stat badges for hero */
  stats: z.array(StatItemSchema).min(1).max(6),

  // Cave Metadata (Required)
  /** Location description (e.g., "Riverton, West Virginia") */
  location: z.string().min(1),
  /** WV county */
  county: z.string().min(1),
  /** Depth in feet below surface */
  depth: z.number().positive(),
  /** Temperature (e.g., "54°F year-round") */
  temperature: z.string().min(1),
  /** Optional discovery year */
  discoveryYear: z.number().int().positive().optional(),
  /** Quick highlights (1-10 items) */
  quickHighlights: z.array(z.string().min(1)).min(1).max(10),

  // Content Sections
  /** Tour options (required, 1-10 tours) */
  tours: z.array(CaveTourSchema).min(1).max(10),
  /** Notable formations (optional, 0-30 formations) */
  formations: z.array(CaveFormationSchema).min(0).max(30),
  /** Cave conditions (required) */
  conditions: CaveConditionsSchema,
  /** Accessibility information (required) */
  accessibility: CaveAccessibilitySchema,
  /** Pricing tiers (required, 1-10 tiers) */
  pricing: z.array(CavePricingSchema).min(1).max(10),
  /** Operating hours (required, 1-10 seasons) */
  hours: z.array(CaveHoursSchema).min(1).max(10),
  /** Safety information (required) */
  safety: CaveSafetySchema,
  /** Cave history (required) */
  history: CaveHistorySchema,

  // Shared Components (Reused from adventure.ts)
  /** Recommended gear checklist */
  gearList: z.array(GearItemSchema).min(1).max(30),
  /** Related shop categories */
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),
  /** Optional nearby attractions */
  nearbyAttractions: z.array(NearbyAttractionSchema).max(30).optional(),

  // Optional Metadata
  /** Geographic coordinates */
  coordinates: CoordinatesSchema.optional(),
  /** External booking URL */
  bookingUrl: z.string().url().optional(),
  /** Cave's official website URL */
  websiteUrl: z.string().url().optional(),
  /** Map/directions URL */
  mapUrl: z.string().url().optional(),
});

/**
 * Cave Template Props interface.
 * Complete type definition for CaveTemplate component.
 */
export interface CaveTemplateProps {
  // Hero Section
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // Cave Metadata
  location: string;
  county: string;
  depth: number;
  temperature: string;
  discoveryYear?: number;
  quickHighlights: string[];

  // Content Sections
  tours: CaveTour[];
  formations: CaveFormation[];
  conditions: CaveConditions;
  accessibility: CaveAccessibility;
  pricing: CavePricing[];
  hours: CaveHours[];
  safety: CaveSafety;
  history: CaveHistory;

  // Shared Components
  gearList: GearItem[];
  relatedShop: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional Metadata
  coordinates?: Coordinates;
  bookingUrl?: string;
  websiteUrl?: string;
  mapUrl?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Helper function to get tour difficulty border color class.
 * Returns Tailwind border-left class for tour card styling.
 *
 * @param difficulty - Tour difficulty level
 * @returns Tailwind border color class string
 */
export function getTourDifficultyColor(difficulty: TourDifficulty): string {
  return TOUR_DIFFICULTY_COLORS[difficulty];
}

/**
 * Helper function to get tour difficulty badge classes.
 * Returns Tailwind bg/text classes for badge styling.
 * CRITICAL: strenuous uses text-brand-brown (not white) for contrast.
 *
 * @param difficulty - Tour difficulty level
 * @returns Tailwind color classes string
 */
export function getTourDifficultyBadge(difficulty: TourDifficulty): string {
  return TOUR_DIFFICULTY_BADGES[difficulty];
}

/**
 * Helper function to get formation type label.
 * Returns human-readable label for formation type.
 *
 * @param type - Formation type
 * @returns Human-readable label string
 */
export function getFormationTypeLabel(type: FormationType): string {
  return FORMATION_TYPE_LABELS[type];
}

/**
 * Helper function to get formation type description.
 * Returns educational description explaining the formation.
 *
 * @param type - Formation type
 * @returns Educational description string
 */
export function getFormationTypeDescription(type: FormationType): string {
  return FORMATION_TYPE_DESCRIPTIONS[type];
}

/**
 * Type guard to check if an adventure is a Cave.
 * Enables conditional rendering of cave-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'cave'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isCaveAdventure } from '../types/cave-types';
 *
 * const adventures = await getCollection('adventures');
 * const caves = adventures.filter(isCaveAdventure);
 * ---
 * ```
 */
export function isCaveAdventure(adventure: any): boolean {
  return adventure?.data?.type === 'cave';
}
