/**
 * Adventure Shared Component Types
 * Shared components used across multiple adventure templates
 *
 * This module contains types for components that are reused across
 * different adventure types (WMA, Lake, River, Campground, etc.):
 * - Gear checklist items
 * - Related shop categories
 * - Camping facilities
 * - Feature items
 *
 * Part of adventure.ts modular split (SPEC-24 compliance)
 * @module types/adventure-shared
 */

import { z } from 'astro/zod';
import { StatIconSchema } from './adventure-core';

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
  icon: StatIconSchema.optional(),
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
