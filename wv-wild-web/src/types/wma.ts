/**
 * WMA (Wildlife Management Area) Type Definitions
 * SPEC: WMA Template Type System
 *
 * Complete type definitions for WMATemplate component used for WV hunting areas.
 * Follows patterns established in adventure.ts for LakeTemplate and RiverTemplate.
 *
 * @module types/wma
 */

import { z } from 'astro/zod';
import {
  DifficultySchema,
  SeasonSchema,
  StatItemSchema,
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  type Difficulty,
  type Season,
  type StatItem,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
} from './adventure';

// ============================================================================
// WMA-SPECIFIC ZOD SCHEMAS
// ============================================================================

/**
 * Game species available for hunting at a WMA.
 * Includes season dates, bag limits, and hunting notes.
 */
export const HuntingSpeciesSchema = z.object({
  /** Species name (e.g., "White-tailed Deer", "Wild Turkey") */
  name: z.string().min(1),
  /** Season dates formatted string (e.g., "Archery: Sept 27 - Dec 31 | Buck Firearms: Nov 24 - Dec 7") */
  season: z.string().min(1),
  /** Hunting notes, habitat info, and tips */
  notes: z.string().min(1),
  /** Daily or seasonal bag limit (optional) */
  bagLimit: z.string().optional(),
  /** Optional Kim's personal hunting tip (renders in font-hand) */
  kimNote: z.string().optional(),
});

export type HuntingSpecies = z.infer<typeof HuntingSpeciesSchema>;

/**
 * Designated hunting area within a WMA.
 * Named locations with terrain, access info, and target species.
 */
export const HuntingAreaSchema = z.object({
  /** Area name (e.g., "Bulltown Area", "Riffle Run Area") */
  name: z.string().min(1),
  /** Access directions (e.g., "I-79 Exit 67, Route 19 North 13 miles") */
  access: z.string().min(1),
  /** Terrain description (e.g., "Old farm fields, bottomlands, Civil War battlefield") */
  terrain: z.string().min(1),
  /** Target species with habitat context (max 10) */
  targetSpecies: z.array(z.string().min(1)).min(1).max(10),
  /** Additional notes about the area */
  notes: z.string().optional(),
  /** GPS coordinates for parking/access point (optional) */
  coordinates: CoordinatesSchema.optional(),
});

export type HuntingArea = z.infer<typeof HuntingAreaSchema>;

/**
 * WMA facility (campground, parking, restroom, Class Q access).
 * Used for trip planning and accessibility information.
 */
export const WMAFacilitySchema = z.object({
  /** Facility type (e.g., "Campground", "Parking Areas", "Class Q Access") */
  type: z.string().min(1),
  /** Number of sites/units (optional, e.g., 133 for campsites) */
  count: z.number().int().positive().optional(),
  /** Facility description with details */
  description: z.string().min(1),
  /** Contact phone for reservations (optional) */
  contact: z.string().optional(),
  /** External link (e.g., Recreation.gov) */
  link: z.string().url().optional(),
  /** Accessibility features (optional) */
  accessibility: z.string().optional(),
});

export type WMAFacility = z.infer<typeof WMAFacilitySchema>;

/**
 * Access point to the WMA with GPS coordinates and features.
 * Used for navigation and trip planning.
 */
export const WMAAccessPointSchema = z.object({
  /** Access point name (e.g., "Bulltown Campground") */
  name: z.string().min(1),
  /** GPS coordinates (optional) */
  coordinates: CoordinatesSchema.optional(),
  /** Features available at this access point (max 10) */
  features: z.array(z.string().min(1)).min(0).max(10),
});

export type WMAAccessPoint = z.infer<typeof WMAAccessPointSchema>;

/**
 * Seasonal hunting guide entry.
 * Provides season-specific hunting advice and target species.
 */
export const SeasonalHuntingGuideSchema = z.object({
  /** Season name (e.g., "Fall", "Spring", "Winter") */
  season: z.string().min(1),
  /** Target species for this season */
  target: z.string().min(1),
  /** Hunting tips and strategies */
  tips: z.string().min(1),
  /** Kim's personal note for this season (renders in font-hand) */
  kimNote: z.string().optional(),
});

export type SeasonalHuntingGuide = z.infer<typeof SeasonalHuntingGuideSchema>;

/**
 * WMA hunting regulation.
 * Covers licenses, limits, safety requirements, and restrictions.
 */
export const WMARegulationSchema = z.object({
  /** Regulation category (e.g., "Licenses", "Bag Limits", "Safety") */
  category: z.string().min(1),
  /** Regulation details */
  details: z.string().min(1),
  /** External link to official regulations (optional) */
  link: z.string().url().optional(),
  /** Whether this is a critical safety/legal requirement */
  important: z.boolean().optional().default(false),
});

export type WMARegulation = z.infer<typeof WMARegulationSchema>;

// ============================================================================
// WMA TEMPLATE PROPS SCHEMA
// ============================================================================

/**
 * Zod schema for WMATemplateProps validation.
 * Enforces all required fields and validates structure.
 */
export const WMATemplatePropsSchema = z.object({
  // Hero section (required)
  name: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  stats: z.array(StatItemSchema).min(1).max(6),

  // WMA metadata
  acreage: z.number().positive(),
  county: z.string().min(1),
  driveTime: z.string().min(1),
  accessType: z.string().min(1), // e.g., "Year-Round", "Seasonal"
  quickHighlights: z.array(z.string().min(1)).min(1).max(10),

  // Content sections
  species: z.array(HuntingSpeciesSchema).min(1).max(20),
  huntingAreas: z.array(HuntingAreaSchema).min(1).max(15),
  facilities: z.array(WMAFacilitySchema).min(0).max(20),
  accessPoints: z.array(WMAAccessPointSchema).min(0).max(20),
  seasonalGuide: z.array(SeasonalHuntingGuideSchema).min(0).max(4),
  regulations: z.array(WMARegulationSchema).min(1).max(20),
  gearList: z.array(GearItemSchema).min(1).max(30),
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),

  // Optional metadata
  difficulty: DifficultySchema.optional(),
  bestSeason: SeasonSchema.optional(),
  coordinates: CoordinatesSchema.optional(),
  mapUrl: z.string().url().optional(),
  regulationsUrl: z.string().url().optional(),

  // Kim's personal message (renders in font-hand)
  kimsTake: z.string().optional(),
});

// ============================================================================
// WMA TEMPLATE PROPS INTERFACE
// ============================================================================

/**
 * WMA template props interface.
 * Complete type definition for WMATemplate component used for WMA adventure pages.
 */
export interface WMATemplateProps {
  // Hero section (required)
  /** WMA name (e.g., "Burnsville Lake WMA") */
  name: string;
  /** Hero image src */
  image: string;
  /** Hero image alt text */
  imageAlt: string;
  /** Brief tagline or subtitle */
  tagline: string;
  /** Full WMA description (rendered as prose) */
  description: string;
  /** Quick stats for hero section */
  stats: StatItem[];

  // WMA metadata
  /** Total acreage (e.g., 12579) */
  acreage: number;
  /** County name (e.g., "Braxton County") */
  county: string;
  /** Drive time from shop (e.g., "25 min") */
  driveTime: string;
  /** Access type (e.g., "Year-Round", "Class Q") */
  accessType: string;
  /** Quick highlight badges for hero */
  quickHighlights: string[];

  // Content sections
  /** Game species with seasons and notes */
  species: HuntingSpecies[];
  /** Named hunting areas with terrain and access */
  huntingAreas: HuntingArea[];
  /** Campgrounds, parking, restrooms, Class Q access */
  facilities: WMAFacility[];
  /** GPS access points with features */
  accessPoints: WMAAccessPoint[];
  /** Seasonal hunting guide */
  seasonalGuide: SeasonalHuntingGuide[];
  /** Regulations and requirements */
  regulations: WMARegulation[];
  /** Recommended gear checklist */
  gearList: GearItem[];
  /** Related shop categories */
  relatedShop: RelatedCategory[];

  // Optional metadata
  /** Optional difficulty level */
  difficulty?: Difficulty;
  /** Optional best season to visit */
  bestSeason?: Season;
  /** Optional geographic coordinates */
  coordinates?: Coordinates;
  /** Optional PDF map URL */
  mapUrl?: string;
  /** Optional regulations URL */
  regulationsUrl?: string;
  /** Kim's personal take on the WMA */
  kimsTake?: string;
}

/**
 * Type guard to check if an adventure is a WMA.
 * Enables conditional rendering of WMA-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'wma'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isWMA } from '../types/wma';
 *
 * const adventures = await getCollection('adventures');
 * const wmas = adventures.filter(isWMA);
 * ---
 * ```
 */
export function isWMA(adventure: any): boolean {
  return adventure?.data?.type === 'wma';
}
