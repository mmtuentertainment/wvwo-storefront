/**
 * Adventure Core Type Definitions
 * Core types, Zod schemas, and quick stats system
 *
 * This module contains the foundational types used across all adventure templates:
 * - Difficulty levels with industry-standard colors
 * - Season enums
 * - Quick stats system for hero sections
 * - Display mappings and accessibility features
 *
 * Part of adventure.ts modular split (SPEC-24 compliance)
 * @module types/adventure-core
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
  'boat',  // SPEC-21: For boat access/ramps stats (lakes)
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
  boat: 'M3 18v-6a9 9 0 0118 0v6M3 18h18M3.5 18L6 22m12-4l2.5 4M12 4v6m-4 0h8', // Boat/dock icon (simplified sailboat outline)
  none: null,
};
