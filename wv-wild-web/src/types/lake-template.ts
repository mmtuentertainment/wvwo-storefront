/**
 * Lake Template Type System
 * Complete type definitions for LakeTemplate component
 *
 * This module contains all types specific to lake adventure pages:
 * - Fishing spots with depth and structure
 * - Marina and boat launch facilities
 * - Recreation activities
 * - Seasonal fishing guides
 * - Lake regulations
 *
 * Part of adventure.ts modular split (SPEC-24 compliance)
 * @module types/lake-template
 */

import { z } from 'astro/zod';
import {
  DifficultySchema,
  SeasonSchema,
  CoordinatesSchema,
  StatItemSchema,
  StatIconSchema,
  type Difficulty,
  type Season,
  type Coordinates,
  type StatItem,
} from './adventure-core';
import { GearItemSchema, RelatedCategorySchema, type GearItem, type RelatedCategory } from './adventure-shared';

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

/**
 * Zod schema for LakeTemplateProps validation.
 * Enables runtime validation of lake data files.
 */
export const LakeTemplatePropsSchema = z.object({
  // Hero section (required)
  name: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  stats: z.array(StatItemSchema).min(1).max(6),

  // Content sections
  fishingSpots: z.array(FishingSpotSchema).min(0).max(30),
  marinas: z.array(MarinaSchema).min(0).max(20),
  activities: z.array(ActivitySchema).min(0).max(30),
  seasonalGuide: z.array(SeasonalGuideSchema).min(0).max(12),
  regulations: z.array(RegulationSchema).min(0).max(30),
  gearList: z.array(GearItemSchema).min(1).max(30),
  relatedShop: z.array(RelatedCategorySchema).min(0).max(10),

  // Optional metadata
  difficulty: DifficultySchema.optional(),
  bestSeason: SeasonSchema.optional(),
  coordinates: CoordinatesSchema.optional(),
});
