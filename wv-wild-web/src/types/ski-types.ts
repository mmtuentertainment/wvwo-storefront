/**
 * Ski Resort Type Definitions
 * SPEC-15: Ski Resort Template types and Zod validation schemas
 *
 * Provides comprehensive type system for WV ski resorts including:
 * - Trail difficulty with industry-standard color coding
 * - Lift systems and snow conditions
 * - Pricing with dynamic rate support
 * - Lodging, dining, and amenities
 * - Summer activities and pass affiliations
 *
 * @module types/ski-types
 */

import { z } from 'astro/zod';
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
  type StatItem,
} from './adventure';

// ============================================================================
// TRAIL DIFFICULTY (Industry Standard Colors)
// ============================================================================

/**
 * Trail difficulty levels following NASAA/NSAA industry standards.
 * Color mapping includes blue as approved exception per CLAUDE.md.
 */
export const TrailDifficultySchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);

export type TrailDifficulty = z.infer<typeof TrailDifficultySchema>;

/**
 * Trail difficulty color classes.
 * NOTE: Blue (bg-blue-700) is an approved exception for ski trail difficulty
 * per NASAA/NSAA industry standard (green circle, blue square, black diamond).
 */
export const TRAIL_DIFFICULTY_COLORS: Record<TrailDifficulty, string> = {
  beginner: 'bg-sign-green text-white',
  intermediate: 'bg-blue-700 text-white', // EXCEPTION: Industry standard
  advanced: 'bg-brand-brown text-brand-cream',
  expert: 'bg-red-900 text-white',
};

/**
 * Trail difficulty shape icons for accessibility.
 * Each difficulty has unique shape distinguishable regardless of color.
 */
export const TRAIL_DIFFICULTY_SHAPES: Record<TrailDifficulty, string> = {
  beginner: '●',      // Green circle
  intermediate: '■',  // Blue square
  advanced: '◆',      // Black diamond
  expert: '◆◆',       // Double black diamond
};

/**
 * Human-readable labels for trail difficulty.
 */
export const TRAIL_DIFFICULTY_LABELS: Record<TrailDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

// ============================================================================
// ELEVATION & SEASON SCHEMAS
// ============================================================================

/**
 * Mountain elevation statistics.
 * All measurements in feet.
 */
export const ElevationSchema = z.object({
  /** Base elevation in feet */
  base: z.number().int().positive(),
  /** Summit elevation in feet */
  summit: z.number().int().positive(),
  /** Vertical drop in feet */
  vertical: z.number().int().positive(),
});

export type Elevation = z.infer<typeof ElevationSchema>;

/**
 * Ski season dates.
 * Uses approximate month strings (e.g., "Late November").
 */
export const SkiSeasonSchema = z.object({
  /** Season opening (e.g., "Late November") */
  open: z.string().min(1),
  /** Season closing (e.g., "Late March") */
  close: z.string().min(1),
});

export type SkiSeason = z.infer<typeof SkiSeasonSchema>;

// ============================================================================
// TRAILS SCHEMA
// ============================================================================

/**
 * Trail breakdown by difficulty level.
 * Includes total count, acreage, and optional longest run.
 */
export const TrailsSchema = z.object({
  /** Total number of trails */
  total: z.number().int().positive(),
  /** Green circle - beginner trails */
  beginner: z.number().int().nonnegative(),
  /** Blue square - intermediate trails */
  intermediate: z.number().int().nonnegative(),
  /** Black diamond - advanced trails */
  advanced: z.number().int().nonnegative(),
  /** Double black - expert trails */
  expert: z.number().int().nonnegative(),
  /** Skiable acreage */
  acreage: z.number().positive(),
  /** Optional longest run (e.g., "1.5 miles") */
  longestRun: z.string().optional(),
});

export type Trails = z.infer<typeof TrailsSchema>;

// ============================================================================
// LIFTS SCHEMA
// ============================================================================

/**
 * Lift type with count.
 * Used for detailed lift breakdown.
 */
export const LiftTypeSchema = z.object({
  /** Lift type (e.g., "High-speed quad", "Triple chair") */
  type: z.string().min(1),
  /** Number of this lift type */
  count: z.number().int().positive(),
});

export type LiftType = z.infer<typeof LiftTypeSchema>;

/**
 * Lift system information.
 * Total count, types breakdown, and optional capacity.
 */
export const LiftsSchema = z.object({
  /** Total number of lifts */
  total: z.number().int().positive(),
  /** Breakdown by lift type */
  types: z.array(LiftTypeSchema).min(1).max(10),
  /** Optional hourly capacity (e.g., "12,000 skiers/hour") */
  capacity: z.string().optional(),
});

export type Lifts = z.infer<typeof LiftsSchema>;

// ============================================================================
// SNOW CONDITIONS SCHEMA
// ============================================================================

/**
 * Snow conditions information.
 * Includes snowfall stats, snowmaking coverage, and optional widget embed.
 */
export const SnowConditionsSchema = z.object({
  /** Average annual snowfall (e.g., "180 inches") */
  averageSnowfall: z.string().min(1),
  /** Snowmaking coverage (e.g., "100% coverage") */
  snowmaking: z.string().min(1),
  /** Optional link to live conditions page */
  conditionsUrl: z.string().url().optional(),
  /** Optional OnTheSnow/MountainNews iframe embed code */
  widgetEmbed: z.string().optional(),
});

export type SnowConditions = z.infer<typeof SnowConditionsSchema>;

// ============================================================================
// PRICING SCHEMAS
// ============================================================================

/**
 * Lift ticket pricing entry.
 * Supports dynamic pricing with "From $XX" pattern.
 */
export const LiftTicketSchema = z.object({
  /** Ticket type (e.g., "Adult Day", "Child Day", "Senior Day") */
  type: z.string().min(1),
  /** Price display (e.g., "$89" or "From $65") */
  price: z.string().min(1),
  /** Optional notes (e.g., "Ages 6-12", "Book 7+ days ahead") */
  notes: z.string().optional(),
});

export type LiftTicket = z.infer<typeof LiftTicketSchema>;

/**
 * Season pass option.
 * Includes type, price, and optional benefits list.
 */
export const SeasonPassSchema = z.object({
  /** Pass type (e.g., "Adult Unlimited", "Family 4-Pack") */
  type: z.string().min(1),
  /** Price (e.g., "$899", "From $599") */
  price: z.string().min(1),
  /** Optional benefits list */
  benefits: z.array(z.string().min(1)).optional(),
});

export type SeasonPass = z.infer<typeof SeasonPassSchema>;

/**
 * Rental package pricing.
 * Equipment rental options with package name and price.
 */
export const RentalPackageSchema = z.object({
  /** Package name (e.g., "Adult Ski Package", "Snowboard Package") */
  package: z.string().min(1),
  /** Price (e.g., "$45/day") */
  price: z.string().min(1),
});

export type RentalPackage = z.infer<typeof RentalPackageSchema>;

/**
 * Complete pricing information.
 * Supports dynamic pricing with isDynamic flag and freshness date.
 */
export const PricingSchema = z.object({
  /** True if resort uses dynamic/variable pricing */
  isDynamic: z.boolean().optional().default(false),
  /** Link to resort's official pricing page */
  pricingUrl: z.string().url().optional(),
  /** Last updated date for pricing info (e.g., "December 2025") */
  lastUpdated: z.string().optional(),
  /** Lift ticket options (required, at least 1) */
  liftTickets: z.array(LiftTicketSchema).min(1).max(15),
  /** Season pass options (required, at least 1) */
  seasonPass: z.array(SeasonPassSchema).min(1).max(10),
  /** Optional rental packages */
  rentals: z.array(RentalPackageSchema).optional(),
});

export type Pricing = z.infer<typeof PricingSchema>;

// ============================================================================
// TERRAIN PARKS SCHEMA
// ============================================================================

/**
 * Terrain park difficulty levels.
 */
export const TerrainParkDifficultySchema = z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']);

export type TerrainParkDifficulty = z.infer<typeof TerrainParkDifficultySchema>;

/**
 * Terrain park information.
 * Includes name, difficulty, and feature list.
 */
export const TerrainParkSchema = z.object({
  /** Park name (e.g., "Progression Park", "Main Terrain Park") */
  name: z.string().min(1),
  /** Park difficulty level */
  difficulty: TerrainParkDifficultySchema,
  /** Features list (e.g., "Boxes", "Rails", "Jumps") */
  features: z.array(z.string().min(1)).min(1).max(20),
});

export type TerrainPark = z.infer<typeof TerrainParkSchema>;

// ============================================================================
// LODGING SCHEMA
// ============================================================================

/**
 * Lodging option near or at the resort.
 * REQUIRED section - must have at least 1 entry.
 */
export const LodgingSchema = z.object({
  /** Property name */
  name: z.string().min(1),
  /** Property type (e.g., "Resort", "Cabin", "Hotel", "Condo") */
  type: z.string().min(1),
  /** Distance from slopes (e.g., "On-mountain", "5 miles", "Slope-side") */
  distance: z.string().optional(),
  /** Amenities list (e.g., "Hot tub", "Kitchen", "Ski-in/ski-out") */
  amenities: z.array(z.string().min(1)).min(1).max(20),
  /** Price range (e.g., "$150-300/night", "$$$$") */
  priceRange: z.string().optional(),
  /** Booking URL */
  bookingUrl: z.string().url().optional(),
});

export type Lodging = z.infer<typeof LodgingSchema>;

// ============================================================================
// DINING SCHEMA (OPTIONAL)
// ============================================================================

/**
 * Dining option at or near resort.
 * OPTIONAL section - hidden if empty.
 */
export const DiningSchema = z.object({
  /** Restaurant name */
  name: z.string().min(1),
  /** Type (e.g., "Cafeteria", "Sit-Down", "Bar", "Coffee Shop") */
  type: z.string().min(1),
  /** Location (e.g., "Base Lodge", "Mid-Mountain", "Village") */
  location: z.string().min(1),
  /** Optional notes (e.g., "Reservations recommended", "Aprés-ski specials") */
  notes: z.string().optional(),
});

export type Dining = z.infer<typeof DiningSchema>;

// ============================================================================
// AMENITIES SCHEMA
// ============================================================================

/**
 * Amenity category with services list.
 * Groups related services together.
 */
export const AmenitySchema = z.object({
  /** Category name (e.g., "Rentals", "Lessons", "Childcare") */
  category: z.string().min(1),
  /** Services in this category */
  services: z.array(z.string().min(1)).min(1).max(20),
});

export type Amenity = z.infer<typeof AmenitySchema>;

// ============================================================================
// SUMMER ACTIVITIES SCHEMA (OPTIONAL)
// ============================================================================

/**
 * Summer activity available at the resort.
 * OPTIONAL section - hidden if empty.
 */
export const SummerActivitySchema = z.object({
  /** Activity name (e.g., "Mountain Biking", "Zip Line Tour") */
  name: z.string().min(1),
  /** Activity description */
  description: z.string().min(1),
  /** Season available (e.g., "June-September", "Summer weekends") */
  season: z.string().min(1),
});

export type SummerActivity = z.infer<typeof SummerActivitySchema>;

// ============================================================================
// PARK AFFILIATION SCHEMA (OPTIONAL)
// ============================================================================

/**
 * Park or wilderness affiliation type.
 */
export const ParkTypeSchema = z.enum(['state_park', 'national_forest', 'private']);

export type ParkType = z.infer<typeof ParkTypeSchema>;

/**
 * State park or wilderness area affiliation.
 * Used for resorts like Canaan Valley (state park) or Snowshoe (Monongahela NF).
 */
export const ParkAffiliationSchema = z.object({
  /** Affiliation type */
  type: ParkTypeSchema,
  /** Park/forest name (e.g., "Canaan Valley Resort State Park") */
  name: z.string().optional(),
  /** Nearby wilderness areas */
  nearbyWilderness: z.array(z.string().min(1)).optional(),
});

export type ParkAffiliation = z.infer<typeof ParkAffiliationSchema>;

// ============================================================================
// NORDIC SKIING SCHEMA (OPTIONAL)
// ============================================================================

/**
 * Nearby nordic/cross-country skiing facility.
 */
export const NordicFacilitySchema = z.object({
  /** Facility name (e.g., "Whitegrass Ski Touring Center") */
  name: z.string().min(1),
  /** Distance from resort (e.g., "5 miles") */
  distance: z.string().optional(),
  /** Website URL */
  url: z.string().url().optional(),
});

export type NordicFacility = z.infer<typeof NordicFacilitySchema>;

/**
 * Nordic skiing options.
 * On-site availability and nearby facilities.
 */
export const NordicSkiingSchema = z.object({
  /** True if nordic skiing available on-site */
  onSite: z.boolean(),
  /** Nearby nordic facilities */
  nearbyFacilities: z.array(NordicFacilitySchema).optional(),
});

export type NordicSkiing = z.infer<typeof NordicSkiingSchema>;

// ============================================================================
// PASS AFFILIATIONS SCHEMA (OPTIONAL)
// ============================================================================

/**
 * Multi-mountain pass affiliation.
 * For Indy Pass, Ikon, Epic, etc.
 */
export const PassAffiliationSchema = z.object({
  /** Pass name (e.g., "Indy Pass", "Ikon Pass", "Epic Pass") */
  name: z.string().min(1),
  /** Tier level if applicable (e.g., "Base", "Plus") */
  tier: z.string().optional(),
  /** Number of days included */
  daysIncluded: z.number().int().positive().optional(),
});

export type PassAffiliation = z.infer<typeof PassAffiliationSchema>;

// ============================================================================
// SAFETY INFO SCHEMA
// ============================================================================

/**
 * Kim's Tip schema.
 * Personal insider tips from Kim with font-hand styling and role="note".
 * Per SPEC-15 Core Requirement #10.
 */
export const KimTipSchema = z.object({
  /** Tip content in Kim's voice */
  content: z.string().min(10).max(500),
  /** Optional highlight type for styling variation */
  type: z.enum(['tip', 'warning', 'insider']).optional().default('tip'),
});

export type KimTip = z.infer<typeof KimTipSchema>;

/**
 * Safety information category.
 * Groups safety items by category with importance level.
 */
export const SafetyInfoSchema = z.object({
  /** Safety category (e.g., "Required Equipment", "Weather Hazards") */
  category: z.string().min(1),
  /** Safety items or considerations */
  items: z.array(z.string().min(1)).min(1).max(30),
  /** Importance level */
  importance: z.enum(['critical', 'high', 'medium']),
});

export type SafetyInfo = z.infer<typeof SafetyInfoSchema>;

// ============================================================================
// MAIN SKI TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Complete Ski Template Props Schema.
 * Validates all required and optional fields for ski resort pages.
 */
export const SkiTemplatePropsSchema = z.object({
  // Core identification
  /** Resort name */
  name: z.string().min(1),
  /** URL slug */
  slug: z.string().min(1),
  /** Location description */
  location: z.string().min(1),
  /** WV county */
  county: z.string().min(1),

  // Hero content
  /** Hero image source */
  image: z.string().min(1),
  /** Hero image alt text */
  imageAlt: z.string().min(1),
  /** Resort tagline */
  tagline: z.string().min(1),
  /** Full description (rendered as prose) */
  description: z.string().min(1),

  // Mountain stats
  /** Elevation data (base, summit, vertical) */
  elevation: ElevationSchema,
  /** Season dates (open, close) */
  season: SkiSeasonSchema,
  /** Quick stat badges for hero */
  quickStats: z.array(z.string().min(1)).min(1).max(6),

  // Trails
  /** Trail breakdown by difficulty */
  trails: TrailsSchema,

  // Lifts
  /** Lift system information */
  lifts: LiftsSchema,

  // Snow conditions
  /** Snow conditions and widget */
  snowConditions: SnowConditionsSchema,

  // Pricing
  /** Pricing information */
  pricing: PricingSchema,

  // Optional sections
  /** Terrain parks (optional - section hidden if empty) */
  terrainParks: z.array(TerrainParkSchema).optional(),

  /** Lodging options (REQUIRED - min 1 entry) */
  lodging: z.array(LodgingSchema).min(1).max(20),

  /** Dining options (optional - section hidden if empty) */
  dining: z.array(DiningSchema).optional(),

  /** Amenities by category */
  amenities: z.array(AmenitySchema).min(1).max(20),

  /** Summer activities (optional - section hidden if empty) */
  summerActivities: z.array(SummerActivitySchema).optional(),

  /** State park / wilderness affiliation (optional) */
  parkAffiliation: ParkAffiliationSchema.optional(),

  /** Nordic skiing options (optional) */
  nordicSkiing: NordicSkiingSchema.optional(),

  /** Multi-mountain pass affiliations (optional) */
  passAffiliations: z.array(PassAffiliationSchema).optional(),

  /** Kim's personal tips (optional - section hidden if empty) */
  kimTips: z.array(KimTipSchema).optional(),

  // Shared components (reuse from adventure.ts)
  /** Recommended gear checklist */
  gearList: z.array(GearItemSchema).min(1).max(30),
  /** Related shop categories */
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),
  /** Safety information */
  safety: z.array(SafetyInfoSchema).min(1).max(20),

  // Hero elements
  /** Hero image (alias for image for compatibility) */
  heroImage: z.string().min(1),
  /** Optional trail map URL */
  trailMapUrl: z.string().url().optional(),

  // Optional metadata
  /** Geographic coordinates */
  coordinates: CoordinatesSchema.optional(),
});

/**
 * Ski Template Props interface.
 * Complete type definition for SkiTemplate component.
 */
export interface SkiTemplateProps {
  // Core identification
  name: string;
  slug: string;
  location: string;
  county: string;

  // Hero content
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;

  // Mountain stats
  elevation: Elevation;
  season: SkiSeason;
  quickStats: string[];

  // Trails
  trails: Trails;

  // Lifts
  lifts: Lifts;

  // Snow conditions
  snowConditions: SnowConditions;

  // Pricing
  pricing: Pricing;

  // Optional sections
  terrainParks?: TerrainPark[];
  lodging: Lodging[];
  dining?: Dining[];
  amenities: Amenity[];
  summerActivities?: SummerActivity[];
  parkAffiliation?: ParkAffiliation;
  nordicSkiing?: NordicSkiing;
  passAffiliations?: PassAffiliation[];
  kimTips?: KimTip[];

  // Shared components
  gearList: GearItem[];
  relatedShop: RelatedCategory[];
  safety: SafetyInfo[];

  // Hero elements
  heroImage: string;
  trailMapUrl?: string;

  // Optional metadata
  coordinates?: Coordinates;
}

/**
 * Type guard to check if an adventure is a Ski Resort.
 * Enables conditional rendering of ski-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'ski'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isSkiAdventure } from '../types/ski-types';
 *
 * const adventures = await getCollection('adventures');
 * const skiResorts = adventures.filter(isSkiAdventure);
 * ---
 * ```
 */
export function isSkiAdventure(adventure: any): boolean {
  return adventure?.data?.type === 'ski';
}

/**
 * Helper function to get trail difficulty color class.
 * Returns Tailwind classes for badge styling.
 *
 * @param difficulty - Trail difficulty level
 * @returns Tailwind color classes string
 */
export function getTrailDifficultyColor(difficulty: TrailDifficulty): string {
  return TRAIL_DIFFICULTY_COLORS[difficulty];
}

/**
 * Helper function to get trail difficulty shape icon.
 * Returns Unicode shape character for accessibility.
 *
 * @param difficulty - Trail difficulty level
 * @returns Unicode shape character
 */
export function getTrailDifficultyShape(difficulty: TrailDifficulty): string {
  return TRAIL_DIFFICULTY_SHAPES[difficulty];
}

/**
 * Helper function to get trail difficulty label.
 * Returns human-readable difficulty label.
 *
 * @param difficulty - Trail difficulty level
 * @returns Human-readable label string
 */
export function getTrailDifficultyLabel(difficulty: TrailDifficulty): string {
  return TRAIL_DIFFICULTY_LABELS[difficulty];
}
