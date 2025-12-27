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
 *
 * - easy: Green badge with circle icon (●)
 * - moderate: Orange badge with triangle icon (▲)
 * - challenging: Mud-brown badge with square icon (■)
 * - rugged: Red badge with diamond icon (◆)
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
 * regardless of color perception.
 */
export const DIFFICULTY_SHAPES: Record<Difficulty, string> = {
  easy: '\u25CF',      // ● (circle)
  moderate: '\u25B2',  // ▲ (triangle)
  challenging: '\u25A0',  // ■ (square)
  rugged: '\u25C6',    // ◆ (diamond)
};

/**
 * Tailwind color classes for each difficulty level.
 * Colors tied to physical WV objects per WVWO aesthetic guidelines.
 *
 * Note: moderate uses text-brand-brown for WCAG 4.5:1 contrast ratio
 * (orange #FF6F00 on white only achieves 2.96:1 - fails WCAG AA)
 */
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-orange text-brand-brown', // Fixed contrast: 5.81:1
  challenging: 'bg-brand-mud text-brand-cream',
  rugged: 'bg-red-800 text-white',
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
