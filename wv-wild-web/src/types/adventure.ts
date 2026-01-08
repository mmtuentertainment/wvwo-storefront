/**
 * Adventure Type Definitions
 * SPEC-09: Centralized types for AdventureHero and related components
 *
 * Single source of truth - all adventure-related types derived from
 * content collection Zod schemas where applicable.
 *
 * @module types/adventure
 */

import { z } from 'astro/zod';

// ============================================================================
// ZOD SCHEMAS (Source of Truth)
// ============================================================================

/**
 * Difficulty levels for adventures - matches content.config.ts
 * Used for runtime validation when needed.
 */
export const DifficultySchema = z.enum(['easy', 'moderate', 'challenging', 'rugged']);

/** Season enum for adventures */
export const SeasonSchema = z.enum(['spring', 'summer', 'fall', 'winter']);

/** Image position options for hero component */
export const ImagePositionSchema = z.enum(['center', 'top', 'bottom']);

/** Schema.org types for structured data */
export const SchemaTypeSchema = z.enum(['Place', 'Article', 'Event']);

/** Badge types for AdventureHeroBadge */
export const BadgeTypeSchema = z.enum(['difficulty', 'season', 'drive-time']);

/** Coordinates schema */
export const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// ============================================================================
// TYPESCRIPT TYPES (Derived from Zod)
// ============================================================================

/**
 * Difficulty level for adventures.
 * Each level has associated shape icon and color for accessibility.
 * Colors follow international hiking/trail difficulty standards.
 * Industry safety colors OVERRIDE WVWO brand palette per CLAUDE.md.
 *
 * - easy: Green badge with circle icon (●) - Industry standard
 * - moderate: Blue badge with square icon (■) - Industry standard
 * - challenging: Red badge with triangle icon (▲) - Industry standard
 * - rugged: Black badge with diamond icon (◆) - Industry standard
 */
export type Difficulty = z.infer<typeof DifficultySchema>;

/** Season type for adventures */
export type Season = z.infer<typeof SeasonSchema>;

/** Image position for hero component */
export type ImagePosition = z.infer<typeof ImagePositionSchema>;

/** Schema.org type for structured data */
export type SchemaType = z.infer<typeof SchemaTypeSchema>;

/** Badge type for AdventureHeroBadge */
export type BadgeType = z.infer<typeof BadgeTypeSchema>;

/** Geographic coordinates */
export type Coordinates = z.infer<typeof CoordinatesSchema>;

// ============================================================================
// DISPLAY MAPPINGS
// ============================================================================

/**
 * Human-readable labels for difficulty levels.
 * Used in badges and meta information.
 */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy Trail',
  moderate: 'Moderate',
  challenging: 'Challenging',
  rugged: 'Rugged Terrain',
};

/**
 * Shape icons for color-blind accessibility.
 * Each difficulty level has a unique shape that remains distinguishable
 * regardless of color perception. Follows international hiking standards.
 */
export const DIFFICULTY_SHAPES: Record<Difficulty, string> = {
  easy: '\u25CF',         // ● (circle) - Green
  moderate: '\u25A0',     // ■ (square) - Blue
  challenging: '\u25B2',  // ▲ (triangle) - Red
  rugged: '\u25C6',       // ◆ (diamond) - Black
};

/**
 * Tailwind color classes for each difficulty level.
 * Colors follow international hiking/trail difficulty standards.
 * Industry safety colors OVERRIDE WVWO brand palette per CLAUDE.md.
 *
 * @see CLAUDE.md "Color Exceptions (Industry Standards)"
 */
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-sign-green text-white',       // Industry standard: Green = Easy
  moderate: 'bg-blue-700 text-white',     // Industry standard: Blue = Moderate
  challenging: 'bg-red-900 text-white',   // Industry standard: Red = Challenging
  rugged: 'bg-black text-white',          // Industry standard: Black = Expert/Rugged
};

/**
 * Screen reader labels for badge types.
 * Provides context for assistive technology users.
 */
export const BADGE_SR_LABELS: Record<BadgeType, string> = {
  difficulty: 'Difficulty level: ',
  season: 'Best season: ',
  'drive-time': 'Drive time from shop: ',
};

// ============================================================================
// QUICK STATS TYPES (SPEC-10)
// ============================================================================

/**
 * Predefined icon names for AdventureQuickStats component.
 * Maps to SVG paths in STAT_ICON_PATHS.
 */
export const StatIconSchema = z.enum([
  'distance',
  'time',
  'calendar',
  'check',
  'info',
  'location',
  'area',
  'circle',  // SPEC-11: For optional gear items
  'elevation',  // SPEC-13: For depth stats (lakes, caves)
  'none',
]);

/** Stat icon type - predefined icon names */
export type StatIcon = z.infer<typeof StatIconSchema>;

/**
 * Individual stat item for AdventureQuickStats.
 * Represents a single statistic with value, label, and optional icon.
 */
export const StatItemSchema = z.object({
  /** Display value (e.g., "2,790", "30 min", "Year-Round") */
  value: z.string(),
  /** Label below value (e.g., "Acres", "From Shop", "Access") */
  label: z.string(),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
  /** Optional custom SVG path data (overrides predefined icon) */
  customIconPath: z.string().optional(),
});

/** Stat item type for AdventureQuickStats */
export type StatItem = z.infer<typeof StatItemSchema>;

/** Column count options for AdventureQuickStats grid */
export type StatColumns = 2 | 3 | 4;

/**
 * SVG path data for predefined stat icons.
 * Uses Heroicons-style stroke paths (24x24 viewBox).
 */
export const STAT_ICON_PATHS: Record<StatIcon, string | null> = {
  distance:
    'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  calendar:
    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  check: 'M5 13l4 4L19 7',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  location:
    'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  area: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
  circle: 'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z',
  elevation:
    'M3 17l6-6 4 4 8-8m0 0v6m0-6h-6', // Arrow trending up - represents depth/elevation
  none: null,
};

// ============================================================================
// SPEC-11: SHARED COMPONENT SCHEMAS
// ============================================================================

/**
 * Gear item for AdventureGearChecklist component.
 * Represents a single piece of recommended gear.
 */
export const GearItemSchema = z.object({
  /** Gear item name (e.g., "Fishing rod & tackle") */
  name: z.string().min(1),
  /** True if item is optional (default: false = required) */
  optional: z.boolean().default(false),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type GearItem = z.infer<typeof GearItemSchema>;

/** Column count options for AdventureGearChecklist grid */
export type GearColumns = 1 | 2 | 3;

/**
 * Related shop category for AdventureRelatedShop component.
 * Links to shop category pages.
 */
export const RelatedCategorySchema = z.object({
  /** Category name (e.g., "Fishing Gear") */
  name: z.string().min(1),
  /** Brief description (optional) */
  description: z.string().optional(),
  /** Link to category page (e.g., "/shop/fishing") */
  href: z.string().startsWith('/'),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;

// ============================================================================
// SPEC-12: WMA Template Type System Extensions
// ============================================================================

/**
 * Camping facility for AdventureCampingList component.
 * Used to render facility cards with optional count badges, contact info, and external links.
 */
export const CampingFacilitySchema = z.object({
  /** Facility type (e.g., "Camping Sites", "Shooting Ranges") */
  type: z.string().min(1),
  /** Optional count (e.g., 240 camping sites) - renders as badge */
  count: z.number().int().positive().optional(),
  /** Facility description */
  description: z.string().min(1),
  /** Optional phone number for reservations (formatted as tel: link) */
  contact: z.string().optional(),
  /** Optional external link (e.g., reservation system) */
  link: z.string().url().optional(),
  /** Optional accessibility info */
  accessibility: z.string().optional(),
});

export type CampingFacility = z.infer<typeof CampingFacilitySchema>;

/**
 * Feature item for AdventureFeatureSection component.
 * Used for "What to Hunt" and "What to Fish" sections with species/waters.
 */
export const FeatureItemSchema = z.object({
  /** Feature name (e.g., "White-tailed Deer", "Elk River") */
  name: z.string().min(1),
  /** Feature description (habitat, behavior, techniques) */
  description: z.string().min(1),
  /** Optional metadata (season dates, regulations) */
  metadata: z.string().optional(),
  /** Optional Kim's personal tip (renders in font-hand) */
  kimNote: z.string().optional(),
  /** Optional icon from STAT_ICON_PATHS */
  icon: z.enum(['distance', 'time', 'calendar', 'check', 'info', 'location', 'area', 'circle', 'none']).optional(),
});

export type FeatureItem = z.infer<typeof FeatureItemSchema>;

/**
 * Accent color options for border-left accents in components.
 * Maps to WVWO brand palette.
 */
export type AccentColor = 'green' | 'orange' | 'brown' | 'mud';

/**
 * Type guard to check if an adventure is a WMA (Wildlife Management Area).
 * Enables conditional rendering of WMA-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'wma'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isWMAAdventure } from '../types/adventure';
 *
 * const adventures = await getCollection('adventures');
 * const wmas = adventures.filter(isWMAAdventure);
 * ---
 * ```
 */
export function isWMAAdventure(adventure: unknown): boolean {
  return (
    typeof adventure === 'object' &&
    adventure !== null &&
    'data' in adventure &&
    typeof (adventure as { data: unknown }).data === 'object' &&
    (adventure as { data: unknown }).data !== null &&
    'type' in (adventure as { data: object }).data &&
    (adventure as { data: { type: unknown } }).data.type === 'wma'
  );
}

// ============================================================================
// SPEC-14: River Template Type System Extensions
// ============================================================================

/**
 * Rapid class specification for whitewater rating.
 * Includes base class and optional high/low water modifiers.
 */
export const RapidClassSchema = z.object({
  /** Base difficulty class - Roman numerals I through V with optional modifier */
  base: z.enum(['I', 'II', 'III', 'IV', 'V'], {
    errorMap: () => ({ message: "Rapid class must be Roman numerals I, II, III, IV, or V" })
  }),
  /** Optional precision modifier */
  modifier: z.enum(['+', '-']).optional(),
  /** Optional low water class (e.g., "II") */
  lowWater: z.string().optional(),
  /** Optional high water class (e.g., "V") */
  highWater: z.string().optional(),
});

export type RapidClass = z.infer<typeof RapidClassSchema>;

/**
 * Individual rapid information for river guides.
 * Represents named rapids with difficulty ratings and descriptions.
 */
export const RapidSchema = z.object({
  /** Rapid name (e.g., "Pillow Rock", "Lost Paddle") */
  name: z.string().min(1),
  /** Difficulty class with water level variations */
  class: RapidClassSchema,
  /** Display name for UI (e.g., "Class IV+") */
  displayName: z.string(),
  /** Rapid description with hazards and lines */
  description: z.string().min(1),
  /** Runnable conditions (e.g., "All levels", "Expert only") */
  runnable: z.string(),
  /** Optional Kim's personal tip for running this rapid */
  kimNote: z.string().optional(),
});

export type Rapid = z.infer<typeof RapidSchema>;

/**
 * River fishing information.
 * Covers species, techniques, seasons, and regulations.
 */
export const RiverFishingSchema = z.object({
  /** Target species available (max 15 for reasonable UI) */
  species: z.array(z.string().min(1)).min(1).max(15),
  /** Fishing techniques (e.g., "Fly fishing, spinning") */
  techniques: z.string().min(1),
  /** Best seasons for fishing */
  seasons: z.string().min(1),
  /** Fishing regulations and license requirements */
  regulations: z.string().min(1),
  /** Optional catch and release guidelines */
  catchAndRelease: z.string().optional(),
});

export type RiverFishing = z.infer<typeof RiverFishingSchema>;

/**
 * Outfitter or guide service for river trips.
 * Includes services, contact info, and pricing.
 */
export const OutfitterSchema = z.object({
  /** Outfitter name */
  name: z.string().min(1),
  /** Services offered (e.g., "Guided trips", "Equipment rental") */
  services: z.array(z.string().min(1)).min(1).max(20),
  /** Contact phone number (optional) */
  contact: z.string().optional(),
  /** Website URL (optional) */
  website: z.string().url().optional(),
  /** Pricing information (optional) */
  pricing: z.string().optional(),
});

export type Outfitter = z.infer<typeof OutfitterSchema>;

/**
 * Seasonal flow and water level information.
 * Provides guidance on water conditions throughout the year.
 */
export const SeasonalFlowSchema = z.object({
  /** Season or time period (e.g., "Spring", "Fall (Sept-Oct)") */
  season: z.string().min(1),
  /** Typical flow rate (e.g., "2,800 CFS", "Low flow") */
  flowRate: z.string(),
  /** Water conditions description */
  conditions: z.string().min(1),
  /** Accessibility for different skill levels */
  accessibility: z.string(),
});

export type SeasonalFlow = z.infer<typeof SeasonalFlowSchema>;

/**
 * River access point (put-in/take-out).
 * Includes facilities and coordinates for GPS.
 */
export const RiverAccessPointSchema = z.object({
  /** Access point name */
  name: z.string().min(1),
  /** Type (e.g., "Put-in", "Take-out", "Emergency exit") */
  type: z.string(),
  /** Available facilities (parking, restrooms, etc.) */
  facilities: z.array(z.string()).min(0).max(20),
  /** Optional GPS coordinates */
  coordinates: CoordinatesSchema.optional(),
  /** Optional access restrictions or fees */
  restrictions: z.string().optional(),
});

export type RiverAccessPoint = z.infer<typeof RiverAccessPointSchema>;

/**
 * Safety category for river hazards and equipment.
 * Groups safety items by category with importance levels.
 */
export const RiverSafetySchema = z.object({
  /** Safety category (e.g., "Required Equipment", "Hazards") */
  category: z.string().min(1),
  /** List of safety items or considerations */
  items: z.array(z.string().min(1)).min(1).max(30),
  /** Importance level */
  importance: z.enum(['critical', 'high', 'medium']),
});

export type RiverSafety = z.infer<typeof RiverSafetySchema>;

/**
 * Nearby attraction for multi-day trip planning.
 * Includes distance, description, and optional contact info.
 */
export const NearbyAttractionSchema = z.object({
  /** Attraction name */
  name: z.string().min(1),
  /** Distance from river (e.g., "5 miles", "30 min drive") */
  distance: z.string(),
  /** Brief description */
  description: z.string().min(1),
  /** Optional website or contact info */
  link: z.string().url().optional(),
});

export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;

/**
 * Zod schema for RiverTemplateProps validation.
 * Enforces all required fields and validates structure.
 */
export const RiverTemplatePropsSchema = z.object({
  // Hero section (required)
  name: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  stats: z.array(StatItemSchema).min(1).max(6),

  // River metadata
  length: z.number().positive(),
  county: z.string().min(1),
  difficultyRange: z.string().min(1),
  quickHighlights: z.array(z.string().min(1)).min(1).max(10),

  // Content sections
  rapids: z.array(RapidSchema).min(0).max(50),
  fishing: RiverFishingSchema,
  outfitters: z.array(OutfitterSchema).min(0).max(20),
  seasonalFlow: z.array(SeasonalFlowSchema).min(0).max(12),
  accessPoints: z.array(RiverAccessPointSchema).min(1).max(30),
  safety: z.array(RiverSafetySchema).min(1).max(20),
  nearbyAttractions: z.array(NearbyAttractionSchema).min(0).max(30),
  gearList: z.array(GearItemSchema).min(1).max(30),
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),

  // Optional metadata
  difficulty: DifficultySchema.optional(),
  bestSeason: SeasonSchema.optional(),
  coordinates: CoordinatesSchema.optional(),
  mapUrl: z.string().url().optional(),
  waterLevelUrl: z.string().url().optional(),
});

/**
 * River template props interface.
 * Complete type definition for RiverTemplate component used for river adventure pages.
 */
export interface RiverTemplateProps {
  // Hero section (required)
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // River metadata
  length: number;
  county: string;
  difficultyRange: string;
  quickHighlights: string[];

  // Content sections
  rapids: Rapid[];
  fishing: RiverFishing;
  outfitters: Outfitter[];
  seasonalFlow: SeasonalFlow[];
  accessPoints: RiverAccessPoint[];
  safety: RiverSafety[];
  nearbyAttractions: NearbyAttraction[];
  gearList: GearItem[];
  relatedShop: RelatedCategory[];

  // Optional metadata
  difficulty?: Difficulty;
  bestSeason?: Season;
  coordinates?: Coordinates;
  mapUrl?: string;
  waterLevelUrl?: string;
}

/**
 * Type guard to check if an adventure is a River.
 * Enables conditional rendering of River-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'river'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isRiverAdventure } from '../types/adventure';
 *
 * const adventures = await getCollection('adventures');
 * const rivers = adventures.filter(isRiverAdventure);
 * ---
 * ```
 */
export function isRiverAdventure(adventure: unknown): boolean {
  return (
    typeof adventure === 'object' &&
    adventure !== null &&
    'data' in adventure &&
    typeof (adventure as { data: unknown }).data === 'object' &&
    (adventure as { data: unknown }).data !== null &&
    'type' in (adventure as { data: object }).data &&
    (adventure as { data: { type: unknown } }).data.type === 'river'
  );
}

// ============================================================================
// SPEC-13: Lake Template Type System Extensions
// ============================================================================

/**
 * Fishing spot for lake fishing guides.
 * Represents prime fishing locations with depth, structure, and target species.
 */
export const FishingSpotSchema = z.object({
  /** Spot name (e.g., "North Shore Point", "Dam Area") */
  name: z.string().min(1),
  /** Water depth range (e.g., "8-15 feet", "20-40 feet") */
  depth: z.string(),
  /** Bottom structure type (e.g., "Rocky ledges", "Submerged timber", "Weed beds") */
  structure: z.string(),
  /** Target species available at this spot (max 15 for reasonable UI) */
  species: z.array(z.string().min(1)).min(1).max(15),
  /** Access method (e.g., "Boat only", "Shore fishing available", "Kayak recommended") */
  access: z.string(),
});

export type FishingSpot = z.infer<typeof FishingSpotSchema>;

/**
 * Marina or boat launch facility.
 * Represents access points with amenities and services.
 */
export const MarinaSchema = z.object({
  /** Marina/launch name */
  name: z.string().min(1),
  /** Facility type (e.g., "Full-service marina", "Public boat ramp", "Kayak launch") */
  type: z.string(),
  /** Available services (e.g., "Boat rental, bait shop, fuel") */
  services: z.array(z.string().min(1)).min(1).max(20),
  /** Contact phone number (optional) */
  contact: z.string().optional(),
  /** Operating hours or seasonal info */
  hours: z.string().optional(),
  /** Fee information (e.g., "Free", "$5 launch fee", "$15/day parking") */
  fees: z.string().optional(),
});

export type Marina = z.infer<typeof MarinaSchema>;

/**
 * Recreation activity available at the lake.
 * Used for activity cards showing what visitors can do.
 */
export const ActivitySchema = z.object({
  /** Activity name (e.g., "Bass Fishing", "Kayaking", "Swimming") */
  name: z.string().min(1),
  /** Activity description */
  description: z.string().min(1),
  /** Best season/time for activity */
  season: z.string().optional(),
  /** Skill level required (e.g., "Beginner-friendly", "Intermediate", "Advanced") */
  difficulty: z.string().optional(),
  /** Optional icon from STAT_ICON_PATHS */
  icon: StatIconSchema.optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;

/**
 * Seasonal fishing guide entry.
 * Provides month-by-month or season-by-season fishing advice.
 */
export const SeasonalGuideSchema = z.object({
  /** Season or time period (e.g., "Spring (March-May)", "Summer", "Early Fall") */
  period: z.string().min(1),
  /** Target species during this period */
  targetSpecies: z.array(z.string().min(1)).min(1).max(15),
  /** Recommended techniques and baits */
  techniques: z.string().min(1),
  /** Water conditions to expect */
  conditions: z.string().optional(),
  /** Kim's personal tip for this season (renders in font-hand) */
  kimNote: z.string().optional(),
});

export type SeasonalGuide = z.infer<typeof SeasonalGuideSchema>;

/**
 * Regulation or rule for lake usage.
 * Covers fishing regulations, boating rules, and usage restrictions.
 */
export const RegulationSchema = z.object({
  /** Regulation category (e.g., "Fishing License", "Boat Requirements", "Daily Limits") */
  category: z.string().min(1),
  /** Regulation details */
  details: z.string().min(1),
  /** Optional external link to official regulations */
  link: z.string().url().optional(),
  /** Emphasis level for important rules (defaults to false) */
  important: z.boolean().optional().default(false),
});

export type Regulation = z.infer<typeof RegulationSchema>;

/**
 * Lake template props interface.
 * Complete type definition for LakeTemplate component used for lake adventure pages.
 */
export interface LakeTemplateProps {
  /** Lake name (e.g., "Summersville Lake") */
  name: string;
  /** Hero image src */
  image: string;
  /** Hero image alt text */
  imageAlt: string;
  /** Brief tagline or subtitle */
  tagline: string;
  /** Full lake description (rendered as prose) */
  description: string;
  /** Quick stats for hero section */
  stats: StatItem[];
  /** Prime fishing locations */
  fishingSpots: FishingSpot[];
  /** Marina and boat launch facilities */
  marinas: Marina[];
  /** Available recreation activities */
  activities: Activity[];
  /** Seasonal fishing guide */
  seasonalGuide: SeasonalGuide[];
  /** Regulations and rules */
  regulations: Regulation[];
  /** Recommended gear checklist */
  gearList: GearItem[];
  /** Related shop categories */
  relatedShop: RelatedCategory[];
  /** Optional difficulty level (for hike-in access, etc.) */
  difficulty?: Difficulty;
  /** Optional best season to visit */
  bestSeason?: Season;
  /** Optional geographic coordinates */
  coordinates?: Coordinates;
}

// ============================================================================
// SPEC-21-A: Campground Template Type System
// ============================================================================

/**
 * Campsite category with count and amenities.
 * Represents a type of campsite (full hookup, electric, primitive).
 */
export const CampsiteCategorySchema = z.object({
  /** Category name (e.g., "Full Hookup", "Electric Only", "Primitive") */
  name: z.string().min(1),
  /** Number of sites in this category */
  count: z.number().int().nonnegative(),
  /** Hookup/amenity details (e.g., "Water, electric (50 amp), sewer") */
  amenities: z.string().min(1),
  /** Nightly fee or fee range (e.g., "$34-$46/night") */
  fee: z.string().optional(),
});

export type CampsiteCategory = z.infer<typeof CampsiteCategorySchema>;

/**
 * Campground amenity with availability status.
 * Represents facilities like restrooms, showers, laundry, etc.
 */
export const CampgroundAmenitySchema = z.object({
  /** Amenity name (e.g., "Restrooms", "Hot Showers", "Dump Station") */
  name: z.string().min(1),
  /** Description or details */
  description: z.string().min(1),
  /** Availability status */
  available: z.boolean().default(true),
  /** Accessibility features (optional) */
  accessibility: z.string().optional(),
});

export type CampgroundAmenity = z.infer<typeof CampgroundAmenitySchema>;

/**
 * Nearby activity accessible from campground.
 * Includes distance, description, and optional link.
 */
export const NearbyActivitySchema = z.object({
  /** Activity name (e.g., "Bulltown Historic Area", "Boat Ramp", "Swimming Beach") */
  name: z.string().min(1),
  /** Distance from campground (e.g., "Adjacent", "1 mile", "Walking distance") */
  distance: z.string(),
  /** Activity description */
  description: z.string().min(1),
  /** Best season or hours (optional) */
  season: z.string().optional(),
  /** External link (optional) */
  link: z.string().url().optional(),
});

export type NearbyActivity = z.infer<typeof NearbyActivitySchema>;

/**
 * Reservation policy details.
 * Covers reservation system, check-in/out, stay limits, pets, etc.
 */
export const ReservationPolicySchema = z.object({
  /** Policy category (e.g., "Reservations", "Check-In", "Pets", "Stay Limit") */
  category: z.string().min(1),
  /** Policy details */
  details: z.string().min(1),
  /** Whether this is a critical rule to highlight */
  important: z.boolean().optional().default(false),
});

export type ReservationPolicy = z.infer<typeof ReservationPolicySchema>;

/**
 * Contact information for campground.
 * Includes phone, address, and booking URLs.
 */
export const CampgroundContactSchema = z.object({
  /** Contact type (e.g., "Campground Direct", "Reservations", "Lake Office") */
  type: z.string().min(1),
  /** Phone number */
  phone: z.string().optional(),
  /** Physical address (optional) */
  address: z.string().optional(),
  /** Website or booking URL (optional) */
  url: z.string().url().optional(),
});

export type CampgroundContact = z.infer<typeof CampgroundContactSchema>;

/**
 * Seasonal operating dates.
 * Defines when campground is open and peak vs off-peak periods.
 */
export const SeasonalDatesSchema = z.object({
  /** Season period (e.g., "Peak Season", "Off-Peak Spring", "Winter Closure") */
  period: z.string().min(1),
  /** Date range (e.g., "May 25 - September 3", "April 14 - May 24") */
  dates: z.string().min(1),
  /** Booking status (e.g., "Reservations via Recreation.gov", "First-come, first-served", "CLOSED") */
  bookingStatus: z.string().min(1),
});

export type SeasonalDates = z.infer<typeof SeasonalDatesSchema>;

/**
 * Campground template props interface.
 * Complete type definition for CampgroundTemplate component.
 */
export interface CampgroundTemplateProps {
  // Hero section (required)
  /** Campground name (e.g., "Bulltown Campground") */
  name: string;
  /** Hero image src */
  image: string;
  /** Hero image alt text */
  imageAlt: string;
  /** Brief tagline or subtitle */
  tagline: string;
  /** Full campground description (rendered as prose) */
  description: string;
  /** Quick stats for hero section */
  stats: StatItem[];

  // Campground metadata
  /** Total number of campsites */
  totalSites: number;
  /** Managing agency (e.g., "U.S. Army Corps of Engineers") */
  managingAgency: string;
  /** Recreation.gov ID for booking link */
  recreationGovId: string;
  /** County location */
  county: string;
  /** Nearby lake name for cross-linking */
  nearbyLake: string;
  /** Quick highlights for badges */
  quickHighlights: string[];

  // Content sections
  /** Campsite categories with counts and fees */
  campsites: CampsiteCategory[];
  /** Available amenities */
  amenities: CampgroundAmenity[];
  /** Nearby activities and attractions */
  nearbyActivities: NearbyActivity[];
  /** Reservation policies and rules */
  policies: ReservationPolicy[];
  /** Contact information */
  contacts: CampgroundContact[];
  /** Seasonal operating dates */
  seasonalDates: SeasonalDates[];
  /** Recommended gear checklist */
  gearList: GearItem[];
  /** Related shop categories */
  relatedShop: RelatedCategory[];

  // Optional metadata
  /** Difficulty level for accessibility */
  difficulty?: Difficulty;
  /** Best season to visit */
  bestSeason?: Season;
  /** GPS coordinates for campground entrance */
  coordinates?: Coordinates;
  /** Directions from I-79 or major highway */
  directions?: string;
  /** Cell service availability note */
  cellService?: string;
  /** Maximum RV length (if applicable) */
  maxRvLength?: string;
}

/**
 * Determines whether an adventure object represents a campground.
 *
 * @param adventure - The value to test; expected to be an object with a `data.type` field.
 * @returns `true` if `adventure.data.type` is `'campground'`, `false` otherwise.
 */
export function isCampgroundAdventure(adventure: unknown): boolean {
  return (
    typeof adventure === 'object' &&
    adventure !== null &&
    'data' in adventure &&
    typeof (adventure as { data: unknown }).data === 'object' &&
    (adventure as { data: unknown }).data !== null &&
    'type' in (adventure as { data: object }).data &&
    (adventure as { data: { type: unknown } }).data.type === 'campground'
  );
}