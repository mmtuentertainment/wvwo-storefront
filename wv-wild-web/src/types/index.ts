/**
 * Type Barrel Export
 * Central re-export point for all shared types
 *
 * @module types
 */

// Breadcrumb types
export type { BreadcrumbItem } from './breadcrumb';

// Adventure types - Zod schemas
export {
  DifficultySchema,
  SeasonSchema,
  ImagePositionSchema,
  SchemaTypeSchema,
  BadgeTypeSchema,
  CoordinatesSchema,
} from './adventure';

// Adventure types - TypeScript types
export type {
  Difficulty,
  Season,
  ImagePosition,
  SchemaType,
  BadgeType,
  Coordinates,
} from './adventure';

// Adventure types - Display constants
export {
  DIFFICULTY_LABELS,
  DIFFICULTY_SHAPES,
  DIFFICULTY_COLORS,
  BADGE_SR_LABELS,
} from './adventure';
