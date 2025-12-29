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

// SPEC-10: Quick Stats types
export { StatIconSchema, StatItemSchema } from './adventure';
export type { StatIcon, StatItem, StatColumns } from './adventure';
export { STAT_ICON_PATHS } from './adventure';

// SPEC-11: Shared Component types
export { GearItemSchema, RelatedCategorySchema } from './adventure';
export type { GearItem, GearColumns, RelatedCategory } from './adventure';

// SPEC-12: WMA Template types
export { CampingFacilitySchema, FeatureItemSchema } from './adventure';
export type { CampingFacility, FeatureItem, AccentColor } from './adventure';
export { isWMAAdventure } from './adventure';

// SPEC-13: Lake Template types
export {
  FishingSpotSchema,
  MarinaSchema,
  ActivitySchema,
  SeasonalGuideSchema,
  RegulationSchema,
} from './adventure';
export type {
  FishingSpot,
  Marina,
  Activity,
  SeasonalGuide,
  Regulation,
  LakeTemplateProps,
} from './adventure';
