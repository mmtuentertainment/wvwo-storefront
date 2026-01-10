/**
 * River Template Type System
 * Complete type definitions for RiverTemplate component
 *
 * This module contains all types specific to river adventure pages:
 * - Rapid classification and whitewater ratings
 * - River fishing access points and species
 * - Outfitters and guide services
 * - Seasonal flow conditions
 * - Safety categories
 *
 * Part of adventure.ts modular split (SPEC-24 compliance)
 * @module types/river-template
 */

import { z } from 'astro/zod';
import {
  DifficultySchema,
  SeasonSchema,
  CoordinatesSchema,
  StatItemSchema,
  type Difficulty,
  type Season,
  type Coordinates,
  type StatItem,
} from './adventure-core';
import { GearItemSchema, RelatedCategorySchema, type GearItem, type RelatedCategory } from './adventure-shared';

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
 * Fishing access point for river fishing.
 * Represents locations where anglers can access the water.
 */
export const FishingAccessPointSchema = z.object({
  /** Access point name (e.g., "Sutton Dam Tailwater") */
  name: z.string().min(1),
  /** Description of access and fishing conditions */
  description: z.string().min(1),
});

export type FishingAccessPoint = z.infer<typeof FishingAccessPointSchema>;

/**
 * River fishing information.
 * Covers species, techniques, seasons, and regulations.
 */
export const RiverFishingSchema = z.object({
  /** Target species available (max 15 for reasonable UI) */
  species: z.array(z.string().min(1)).min(1).max(15),
  /** Fishing techniques as array (e.g., ["Fly fishing with nymphs", "Spin cast with spinners"]) */
  techniques: z.array(z.string().min(1)).min(1).max(20),
  /** Fishing access points with descriptions */
  accessPoints: z.array(FishingAccessPointSchema).min(0).max(20).optional(),
  /** Best seasons for fishing */
  seasons: z.string().min(1),
  /** Fishing regulations and license requirements */
  regulations: z.string().min(1),
  /** Optional catch and release guidelines */
  catchAndRelease: z.string().optional(),
  /** Optional Kim's personal tip for fishing this river */
  kimsTip: z.string().optional(),
});

export type RiverFishing = z.infer<typeof RiverFishingSchema>;

/**
 * Contact information for outfitter.
 * Object structure with phone, website, and email fields.
 * At least one contact method is required.
 */
export const OutfitterContactSchema = z
  .object({
    /** Phone number (optional) */
    phone: z.string().optional(),
    /** Website URL (optional) */
    website: z.string().url().optional(),
    /** Email address (optional) */
    email: z.string().email().optional(),
  })
  .refine((data) => data.phone || data.website || data.email, {
    message: 'At least one contact method (phone, website, or email) is required',
  });

export type OutfitterContact = z.infer<typeof OutfitterContactSchema>;

/**
 * Outfitter or guide service for river trips.
 * Includes services, contact info, and pricing.
 */
export const OutfitterSchema = z.object({
  /** Outfitter name */
  name: z.string().min(1),
  /** Services offered (e.g., "Guided trips", "Equipment rental") */
  services: z.array(z.string().min(1)).min(1).max(20),
  /** Contact information as object with phone/website/email */
  contact: OutfitterContactSchema.optional(),
  /** Price range (e.g., "$75-$150 per person") */
  priceRange: z.string().optional(),
  /** Seasonal notes about availability */
  seasonalNotes: z.string().optional(),
});

export type Outfitter = z.infer<typeof OutfitterSchema>;

/**
 * Seasonal flow and water level information.
 * Provides guidance on water conditions throughout the year.
 */
export const SeasonalFlowSchema = z.object({
  /** Season or time period (e.g., "Spring (February-May)", "Fall (Sept-Oct)") */
  season: z.string().min(1),
  /** Water level indicator (e.g., "High", "Medium", "Low") */
  level: z.string().min(1),
  /**
   * CFS = Cubic Feet per Second (water flow measurement).
   * Range or description (e.g., "2000-3000 CFS", "Varies with dam releases")
   */
  cfsRange: z.string().min(1),
  /** Activities this flow level is best for */
  bestFor: z.array(z.string().min(1)).min(1).max(10),
  /** Additional notes about conditions, hazards, or recommendations */
  notes: z.string().min(1),
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
 * Groups safety items by category with importance flag.
 */
export const RiverSafetySchema = z.object({
  /** Safety category (e.g., "Required Equipment", "Hazards", "Emergency Contacts") */
  category: z.string().min(1),
  /** List of safety items or considerations */
  items: z.array(z.string().min(1)).min(1).max(30),
  /** Whether this category contains critical safety information (renders with emphasis) */
  important: z.boolean().default(false),
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
