# SPEC-12: WMA Template System - TypeScript Type System Architecture

**Status**: Architecture Design
**Created**: 2025-12-27
**Author**: System Architecture Designer
**Related Specs**: SPEC-12-wma-template.md, SPEC-12-API-INTERFACE-DESIGN.md
**Epic**: Frontend Component Architecture

---

## Overview

This document defines the complete TypeScript type system for SPEC-12 WMA components, establishing type safety boundaries, inference patterns, discriminated unions, and utility types. The type system ensures compile-time safety while maintaining flexibility for both WMA-specific pages and generic adventure pages.

**Key Objectives**:

1. Type guards to distinguish WMA adventures from regular adventures
2. Zod schema inference for automatic TypeScript types
3. Component prop interfaces with proper inheritance hierarchy
4. Wrapper pattern type safety for WMA-specific components
5. Utility types for grid columns, variants, and accent colors

---

## Architecture Principles

### 1. Schema-First Design

**Zod schemas are the single source of truth**. All TypeScript types derive from Zod schemas using `z.infer<>`, ensuring runtime validation matches compile-time types.

```typescript
// ✅ CORRECT: Zod schema → TypeScript type
const SpeciesItemSchema = z.object({
  name: z.string(),
  category: z.enum(['big-game', 'small-game', 'turkey', 'waterfowl']),
  season: z.string(),
  description: z.string(),
  tips: z.string().optional(),
  kimNote: z.string().optional(),
});

export type SpeciesItem = z.infer<typeof SpeciesItemSchema>;

// ❌ WRONG: Manual type definitions duplicate validation logic
// type SpeciesItem = { name: string; category: string; ... }
```

### 2. Optional Fields for Backward Compatibility

All WMA-specific schema fields use `.optional()` to ensure existing adventure entries remain valid without migration.

```typescript
// Existing adventures work without WMA fields
const basicAdventure = {
  title: "Trail Hike",
  description: "...",
  season: ["fall"],
  difficulty: "easy",
  location: "State Park",
};

// WMA adventures extend with optional fields
const wmaAdventure = {
  ...basicAdventure,
  wma_acreage: 19646,
  wma_county: "Braxton",
  wma_species: [...],
};
```

### 3. Discriminated Unions for Variants

Component variants use TypeScript's discriminated unions for exhaustive type checking.

```typescript
type ComponentVariant = 'white' | 'cream';
type AccentColor = 'green' | 'orange' | 'brown' | 'mud';

// Type-safe mapping with exhaustive checks
const bgClasses: Record<ComponentVariant, string> = {
  white: 'bg-white',
  cream: 'bg-brand-cream',
};
```

### 4. Wrapper Pattern Type Safety

WMA wrapper components inherit base types from generic components, ensuring consistent prop interfaces.

```typescript
// Base component (AdventureQuickStats)
interface AdventureQuickStatsProps {
  stats: StatItem[];
  columns?: StatColumns;
  variant?: ComponentVariant;
}

// Wrapper component (WMAQuickStats) - no new props needed
// Uses base component with standardized stat configurations
```

---

## Type System Architecture

### Layer 1: Zod Schemas (Runtime Validation)

Located in: `wv-wild-web/src/types/wma.ts`

```typescript
import { z } from 'astro/zod';
import { StatIconSchema, ComponentVariantSchema } from './adventure.js';

// ============================================================================
// SPECIES SCHEMAS
// ============================================================================

/**
 * Species category for visual distinction in WMASpeciesGrid.
 * Maps to border colors and hunting context.
 */
export const SpeciesCategorySchema = z.enum([
  'big-game',      // Deer, elk → border-l-sign-green
  'small-game',    // Squirrel, rabbit → border-l-brand-mud
  'turkey',        // Wild turkey → border-l-brand-brown
  'waterfowl',     // Ducks, geese → border-l-[#4A90E2] (blue)
]);

/**
 * Individual species entry for WMASpeciesGrid component.
 * Represents a single huntable species with season and hunting tips.
 */
export const SpeciesItemSchema = z.object({
  /** Species common name (e.g., "White-tailed Deer") */
  name: z.string().min(1, 'Species name required'),

  /** Category for visual distinction and border color */
  category: SpeciesCategorySchema,

  /** Season dates and hunting method (e.g., "Nov - Dec (firearms)") */
  season: z.string().min(1, 'Season information required'),

  /** 2-3 sentence description of hunting opportunities */
  description: z.string().min(10, 'Description too short'),

  /** Best hunting areas or terrain features (optional) */
  tips: z.string().optional(),

  /** Kim's personal hunting advice in her voice (optional) */
  kimNote: z.string().optional(),
});

// ============================================================================
// FACILITIES SCHEMAS
// ============================================================================

/**
 * Individual facility entry for WMAFacilitiesGrid component.
 * Represents amenities like parking, boat ramps, restrooms.
 */
export const FacilityItemSchema = z.object({
  /** Facility type (e.g., "Parking Areas", "Boat Ramps") */
  type: z.string().min(1, 'Facility type required'),

  /** Number of facilities if applicable (displays as count badge) */
  count: z.number().int().positive().optional(),

  /** Brief description of the facility */
  description: z.string().min(1, 'Description required'),

  /** Optional predefined icon from STAT_ICON_PATHS */
  icon: StatIconSchema.optional(),

  /** Custom SVG path if predefined icon doesn't fit */
  customIconPath: z.string().optional(),
});

// ============================================================================
// FISHING WATERS SCHEMAS
// ============================================================================

/**
 * Water body type for icon selection in WMAFishingWaters.
 */
export const WaterTypeSchema = z.enum([
  'river',   // Wavy horizontal lines icon
  'lake',    // Circular water droplet icon
  'pond',    // Small circle icon
  'stream',  // Single wavy line icon
]);

/**
 * Coordinates schema for GPS-based access points.
 */
export const CoordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

/**
 * Individual fishing water entry for WMAFishingWaters component.
 * Represents a named water body with species and access information.
 */
export const FishingWaterItemSchema = z.object({
  /** Water body name (e.g., "Elk River", "Sutton Lake") */
  name: z.string().min(1, 'Water body name required'),

  /** Water body type for icon selection */
  type: WaterTypeSchema,

  /** Array of fish species available */
  species: z.array(z.string()).min(1, 'At least one species required'),

  /** Access point description */
  access: z.string().min(1, 'Access information required'),

  /** Special regulations if applicable (optional) */
  regulations: z.string().optional(),

  /** GPS coordinates for primary access (optional) */
  coordinates: CoordinatesSchema.optional(),
});

// ============================================================================
// REGULATIONS SCHEMAS
// ============================================================================

/**
 * WMA regulations and safety information.
 * Used by WMARegulations component for prominent safety display.
 */
export const WMARegulationsSchema = z.object({
  /** WV DNR hunting zone identifier (optional) */
  zone: z.string().optional(),

  /** Array of regulation statements and safety requirements */
  restrictions: z.array(z.string()).min(1, 'At least one restriction required'),

  /** Additional contact or reference info (optional) */
  additionalInfo: z.string().optional(),
});

// ============================================================================
// HERO SCHEMAS
// ============================================================================

/**
 * Badge variant for WMAHero component.
 * Maps to WVWO brand colors.
 */
export const BadgeVariantSchema = z.enum([
  'green',   // bg-sign-green
  'orange',  // bg-brand-orange
  'brown',   // bg-brand-brown
]);

/**
 * Image position for hero component focal point.
 */
export const ImagePositionSchema = z.enum([
  'center',
  'top',
  'bottom',
]);

/**
 * Custom badge for WMAHero component.
 * Displayed alongside default acreage/drive time badges.
 */
export const CustomBadgeSchema = z.object({
  /** Badge label text */
  label: z.string().min(1, 'Badge label required'),

  /** Badge value text */
  value: z.string().min(1, 'Badge value required'),

  /** Badge color variant (default: 'green') */
  variant: BadgeVariantSchema.default('green'),
});

// ============================================================================
// GRID CONFIGURATION SCHEMAS
// ============================================================================

/**
 * Column count options for responsive grids.
 * Different components support different column ranges.
 */
export const SpeciesColumnsSchema = z.union([z.literal(1), z.literal(2)]);
export const FacilityColumnsSchema = z.union([
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);
export const ComponentVariantSchema = z.enum(['white', 'cream']);
```

### Layer 2: TypeScript Type Inference

All TypeScript types derive from Zod schemas via `z.infer<>`.

```typescript
import { z } from 'astro/zod';
import {
  SpeciesCategorySchema,
  SpeciesItemSchema,
  FacilityItemSchema,
  WaterTypeSchema,
  FishingWaterItemSchema,
  WMARegulationsSchema,
  BadgeVariantSchema,
  ImagePositionSchema,
  CustomBadgeSchema,
  SpeciesColumnsSchema,
  FacilityColumnsSchema,
  ComponentVariantSchema,
} from './wma.schemas.js';

// ============================================================================
// INFERRED TYPES
// ============================================================================

/** Species category for visual distinction */
export type SpeciesCategory = z.infer<typeof SpeciesCategorySchema>;

/** Individual species entry */
export type SpeciesItem = z.infer<typeof SpeciesItemSchema>;

/** Individual facility entry */
export type FacilityItem = z.infer<typeof FacilityItemSchema>;

/** Water body type */
export type WaterType = z.infer<typeof WaterTypeSchema>;

/** Individual fishing water entry */
export type FishingWaterItem = z.infer<typeof FishingWaterItemSchema>;

/** WMA regulations object */
export type WMARegulations = z.infer<typeof WMARegulationsSchema>;

/** Badge color variant */
export type BadgeVariant = z.infer<typeof BadgeVariantSchema>;

/** Image focal point position */
export type ImagePosition = z.infer<typeof ImagePositionSchema>;

/** Custom badge configuration */
export type CustomBadge = z.infer<typeof CustomBadgeSchema>;

/** Column count for species grid (1-2) */
export type SpeciesColumns = z.infer<typeof SpeciesColumnsSchema>;

/** Column count for facilities grid (2-4) */
export type FacilityColumns = z.infer<typeof FacilityColumnsSchema>;

/** Component background variant */
export type ComponentVariant = z.infer<typeof ComponentVariantSchema>;

/** GPS coordinates */
export type Coordinates = z.infer<typeof CoordinatesSchema>;
```

### Layer 3: Component Prop Interfaces

Component props use inferred types from Layer 2.

```typescript
import type { ImageMetadata } from 'astro';
import type {
  SpeciesItem,
  SpeciesColumns,
  FacilityItem,
  FacilityColumns,
  FishingWaterItem,
  WMARegulations,
  CustomBadge,
  ImagePosition,
  ComponentVariant,
} from './wma.types.js';

// ============================================================================
// COMPONENT PROP INTERFACES
// ============================================================================

/**
 * WMAHero Component Props
 * Full-bleed hero section with WMA name, location, acreage, and visual impact.
 */
export interface WMAHeroProps {
  // === Required Core Display ===

  /** WMA name displayed as h1 (e.g., "Elk River WMA") */
  name: string;

  /** Total acreage as integer (auto-formatted with commas) */
  acreage: number;

  /** County name without "County" suffix (e.g., "Braxton") */
  county: string;

  /** Lead paragraph describing the WMA's character and terrain */
  description: string;

  // === Optional Location & Access ===

  /** Drive time from WVWO shop (e.g., "15 min", "30 min") */
  driveTime?: string;

  /** Year-round access or seasonal restrictions (default: "Year-Round") */
  access?: string;

  // === Optional Image ===

  /** Hero image metadata from Astro's image imports */
  image?: ImageMetadata;

  /** Alt text for hero image (required if image provided) */
  imageAlt?: string;

  /** Focal point for image cropping (default: 'center') */
  imagePosition?: ImagePosition;

  // === Optional Additional Info Badges ===

  /** Custom badges displayed alongside acreage/drive time */
  badges?: CustomBadge[];
}

/**
 * WMASpeciesGrid Component Props
 * Displays huntable species organized by category with season information.
 */
export interface WMASpeciesGridProps {
  /** Section heading (default: "What to Hunt") */
  title?: string;

  /** Optional intro paragraph below heading */
  intro?: string;

  /** Array of huntable species */
  species: SpeciesItem[];

  /** Number of columns on desktop (default: 2) */
  columns?: SpeciesColumns;

  /** Background style (default: 'cream') */
  variant?: ComponentVariant;

  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

/**
 * WMAFacilitiesGrid Component Props
 * Displays available facilities and access points with counts and descriptions.
 */
export interface WMAFacilitiesGridProps {
  /** Section heading (default: "Facilities & Access") */
  title?: string;

  /** Optional intro paragraph below heading */
  intro?: string;

  /** Array of facility items */
  facilities: FacilityItem[];

  /** Number of columns on desktop (default: 3) */
  columns?: FacilityColumns;

  /** Background style (default: 'white') */
  variant?: ComponentVariant;

  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

/**
 * WMAFishingWaters Component Props
 * Displays named fishing waters with species lists and access information.
 */
export interface WMAFishingWatersProps {
  /** Section heading (default: "Fishing Waters") */
  title?: string;

  /** Optional intro paragraph below heading */
  intro?: string;

  /** Array of fishing water bodies */
  waters: FishingWaterItem[];

  /** Background style (default: 'cream') */
  variant?: ComponentVariant;

  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

/**
 * WMARegulations Component Props
 * Displays hunting regulations, zone boundaries, and safety requirements.
 */
export interface WMARegulationsProps {
  /** Section heading (default: "Regulations & Safety") */
  title?: string;

  /** Optional intro paragraph below heading */
  intro?: string;

  /** WV DNR hunting zone identifier (optional) */
  zone?: string;

  /** Array of regulation statements and safety requirements */
  restrictions: string[];

  /** Additional contact or reference info (optional) */
  additionalInfo?: string;

  /** Background style (default: 'cream') */
  variant?: ComponentVariant;

  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}
```

### Layer 4: Type Guards

Type guards distinguish WMA adventures from regular adventures at runtime.

```typescript
import type { CollectionEntry } from 'astro:content';

/**
 * Type guard to check if an adventure entry has WMA-specific fields.
 *
 * @param adventure - Adventure entry from content collection
 * @returns True if adventure has WMA acreage field (primary WMA indicator)
 *
 * @example
 * ```typescript
 * const adventure = await getEntry('adventures', 'elk-river');
 *
 * if (isWMAAdventure(adventure)) {
 *   // TypeScript knows wma_acreage exists
 *   console.log(`Acreage: ${adventure.data.wma_acreage}`);
 * }
 * ```
 */
export function isWMAAdventure(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { wma_acreage: number };
} {
  return adventure.data.wma_acreage !== undefined;
}

/**
 * Type guard to check if adventure has fishing waters data.
 *
 * @param adventure - Adventure entry from content collection
 * @returns True if adventure has wma_fishing_waters field
 */
export function hasWMAFishingWaters(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { wma_fishing_waters: FishingWaterItem[] };
} {
  return (
    adventure.data.wma_fishing_waters !== undefined &&
    adventure.data.wma_fishing_waters.length > 0
  );
}

/**
 * Type guard to check if adventure has huntable species data.
 *
 * @param adventure - Adventure entry from content collection
 * @returns True if adventure has wma_species field
 */
export function hasWMASpecies(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { wma_species: SpeciesItem[] };
} {
  return (
    adventure.data.wma_species !== undefined &&
    adventure.data.wma_species.length > 0
  );
}

/**
 * Type guard to check if adventure has facilities data.
 *
 * @param adventure - Adventure entry from content collection
 * @returns True if adventure has wma_facilities field
 */
export function hasWMAFacilities(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { wma_facilities: FacilityItem[] };
} {
  return (
    adventure.data.wma_facilities !== undefined &&
    adventure.data.wma_facilities.length > 0
  );
}

/**
 * Type guard to check if adventure has regulations data.
 *
 * @param adventure - Adventure entry from content collection
 * @returns True if adventure has wma_regulations field
 */
export function hasWMARegulations(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { wma_regulations: WMARegulations };
} {
  return adventure.data.wma_regulations !== undefined;
}
```

### Layer 5: Utility Types

Helper types for common patterns.

```typescript
/**
 * Extract props type from Astro component.
 * Useful for wrapper components that extend base component props.
 */
export type PropsOf<T> = T extends { Props: infer P } ? P : never;

/**
 * Make specific properties required in an interface.
 *
 * @example
 * ```typescript
 * type OptionalImage = { image?: ImageMetadata; imageAlt?: string };
 * type RequiredImage = RequireProps<OptionalImage, 'image' | 'imageAlt'>;
 * // { image: ImageMetadata; imageAlt: string }
 * ```
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make all properties optional except specified ones.
 *
 * @example
 * ```typescript
 * type Species = { name: string; category: string; season: string; tips?: string };
 * type MinimalSpecies = RequireOnly<Species, 'name' | 'category'>;
 * // { name: string; category: string; season?: string; tips?: string }
 * ```
 */
export type RequireOnly<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Grid column configuration types for responsive layouts.
 * Maps component-specific column counts to Tailwind grid classes.
 */
export type GridColumnsConfig<T extends number> = Record<T, string>;

/**
 * Accent color mapping for category-based visual distinctions.
 * Used in species grid, facilities grid, etc.
 */
export type AccentColorMap<T extends string> = Record<T, {
  border: string;
  bg: string;
  text: string;
}>;

/**
 * Example usage: Species category colors
 */
export const SPECIES_ACCENT_COLORS: AccentColorMap<SpeciesCategory> = {
  'big-game': {
    border: 'border-l-sign-green',
    bg: 'bg-sign-green/5',
    text: 'text-sign-green',
  },
  'small-game': {
    border: 'border-l-brand-mud',
    bg: 'bg-brand-mud/5',
    text: 'text-brand-mud',
  },
  turkey: {
    border: 'border-l-brand-brown',
    bg: 'bg-brand-brown/5',
    text: 'text-brand-brown',
  },
  waterfowl: {
    border: 'border-l-[#4A90E2]',
    bg: 'bg-[#4A90E2]/5',
    text: 'text-[#4A90E2]',
  },
};

/**
 * Column class mapping for species grid (1-2 columns).
 */
export const SPECIES_GRID_COLUMNS: GridColumnsConfig<SpeciesColumns> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
};

/**
 * Column class mapping for facilities grid (2-4 columns).
 */
export const FACILITY_GRID_COLUMNS: GridColumnsConfig<FacilityColumns> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

/**
 * Variant background class mapping.
 */
export const VARIANT_BG_CLASSES: Record<ComponentVariant, string> = {
  white: 'bg-white',
  cream: 'bg-brand-cream',
};
```

---

## Usage Examples

### Example 1: Type Guard in WMA Page Template

```typescript
---
// wv-wild-web/src/pages/near/[slug].astro
import { getCollection, type CollectionEntry } from 'astro:content';
import { isWMAAdventure, hasWMAFishingWaters } from '../../types/wma.guards.js';
import WMAHero from '../../components/wma/WMAHero.astro';
import WMAFishingWaters from '../../components/wma/WMAFishingWaters.astro';

export async function getStaticPaths() {
  const adventures = await getCollection('adventures');
  return adventures.map((adventure) => ({
    params: { slug: adventure.id },
    props: { adventure },
  }));
}

const { adventure } = Astro.props;
---

{isWMAAdventure(adventure) ? (
  <!-- WMA-specific layout -->
  <WMAHero
    name={adventure.data.title}
    acreage={adventure.data.wma_acreage}
    county={adventure.data.wma_county || ''}
    description={adventure.data.description}
  />

  {hasWMAFishingWaters(adventure) && (
    <WMAFishingWaters waters={adventure.data.wma_fishing_waters} />
  )}
) : (
  <!-- Generic adventure layout -->
  <AdventureHero {...adventure.data} />
)}
```

### Example 2: Type-Safe Component Props

```typescript
---
// wv-wild-web/src/components/wma/WMASpeciesGrid.astro
import type { WMASpeciesGridProps } from '../../types/wma.props.js';
import { SPECIES_ACCENT_COLORS, SPECIES_GRID_COLUMNS } from '../../types/wma.utils.js';

interface Props extends WMASpeciesGridProps {}

const {
  title = 'What to Hunt',
  intro,
  species,
  columns = 2,
  variant = 'cream',
  animate = true,
} = Astro.props;

const gridClass = SPECIES_GRID_COLUMNS[columns];
const bgClass = variant === 'white' ? 'bg-white' : 'bg-brand-cream';
---

<section class={bgClass}>
  <h2 class="font-display text-3xl font-black">{title}</h2>
  {intro && <p class="text-brand-mud/80">{intro}</p>}

  <div class={`grid ${gridClass} gap-6`}>
    {species.map((item) => {
      const colors = SPECIES_ACCENT_COLORS[item.category];
      return (
        <article class={`bg-white ${colors.border} border-l-4 rounded-sm p-6`}>
          <h3 class="font-display text-xl font-bold">{item.name}</h3>
          <p class="text-sm text-brand-mud/60">{item.season}</p>
          <p class="mt-2">{item.description}</p>

          {item.tips && (
            <div class="mt-3 bg-brand-cream/30 rounded-sm p-3">
              <p class="text-sm font-semibold text-sign-green">Hunting Tips:</p>
              <p class="text-sm">{item.tips}</p>
            </div>
          )}

          {item.kimNote && (
            <p class="mt-3 font-hand italic text-brand-brown/90">
              "{item.kimNote}" —Kim
            </p>
          )}
        </article>
      );
    })}
  </div>
</section>
```

### Example 3: Zod Schema Validation

```typescript
// wv-wild-web/src/content/adventures/elk-river.md frontmatter validation
import { SpeciesItemSchema } from '../../types/wma.schemas.js';

// Runtime validation of species data
const elkRiverSpecies = [
  {
    name: 'White-tailed Deer',
    category: 'big-game',
    season: 'Nov - Dec (firearms), Sep - Jan (archery)',
    description: 'Brushlands and mixed timber provide excellent deer hunting...',
    tips: 'Brushland edges and regenerating cuts. Creek bottoms when the rut kicks in.',
    kimNote: 'Wind can be tricky in the steep terrain — play it carefully.',
  },
];

// Zod validates at build time via content.config.ts
const validated = SpeciesItemSchema.array().parse(elkRiverSpecies);
// ✅ Passes: All required fields present, correct types

// ❌ Would fail: Missing required field
const invalid = [{ name: 'Deer' }]; // Error: category, season, description required
```

### Example 4: Wrapper Pattern Type Safety

```typescript
---
// WMAQuickStats.astro - Wrapper around AdventureQuickStats
import AdventureQuickStats from '../adventure/AdventureQuickStats.astro';
import type { StatItem } from '../../types/adventure.js';

interface Props {
  acreage: number;
  driveTime?: string;
  county: string;
  access?: string;
}

const { acreage, driveTime, county, access = 'Year-Round' } = Astro.props;

// Type-safe stat configuration
const stats: StatItem[] = [
  {
    value: acreage.toLocaleString(),
    label: 'Acres',
    icon: 'area',
  },
  driveTime && {
    value: driveTime,
    label: 'From Shop',
    icon: 'time',
  },
  {
    value: `${county} Co.`,
    label: 'Location',
    icon: 'location',
  },
  {
    value: access,
    label: 'Access',
    icon: 'calendar',
  },
].filter(Boolean) as StatItem[]; // Remove undefined entries
---

<!-- Wrapper delegates to base component with type-safe props -->
<AdventureQuickStats stats={stats} columns={4} variant="white" />
```

---

## Type Safety Benefits

### 1. Compile-Time Error Detection

```typescript
// ❌ Type error: Missing required prop
<WMAHero
  name="Elk River WMA"
  acreage={19646}
  // Missing: county, description
/>
// Error: Property 'county' is missing in type

// ✅ Correct: All required props provided
<WMAHero
  name="Elk River WMA"
  acreage={19646}
  county="Braxton"
  description="West Virginia's oldest WMA..."
/>
```

### 2. Exhaustive Union Checks

```typescript
// TypeScript ensures all variants are handled
function getBackgroundClass(variant: ComponentVariant): string {
  switch (variant) {
    case 'white':
      return 'bg-white';
    case 'cream':
      return 'bg-brand-cream';
    // ✅ No default needed - all cases covered
  }
}

// ❌ Would fail: Adding new variant without handling
// type ComponentVariant = 'white' | 'cream' | 'tan';
// Error: Switch not exhaustive, missing case 'tan'
```

### 3. Discriminated Union Narrowing

```typescript
function renderSpeciesCard(species: SpeciesItem) {
  const colors = SPECIES_ACCENT_COLORS[species.category];
  // TypeScript knows category is one of 4 valid values
  // Auto-complete suggests: 'big-game' | 'small-game' | 'turkey' | 'waterfowl'

  return `<div class="${colors.border}">...</div>`;
}
```

### 4. Optional Property Safety

```typescript
interface WMAHeroProps {
  image?: ImageMetadata;
  imageAlt?: string;
}

function WMAHero(props: WMAHeroProps) {
  // ❌ Error: imageAlt might be undefined
  const alt = props.imageAlt.toUpperCase();

  // ✅ Correct: Optional chaining
  const alt = props.imageAlt?.toUpperCase();

  // ✅ Correct: Type guard
  if (props.image && props.imageAlt) {
    // TypeScript knows both are defined in this block
    renderImage(props.image, props.imageAlt);
  }
}
```

---

## Migration Path

### Phase 1: Schema Extension (Current)

1. Add Zod schemas to `wv-wild-web/src/types/wma.schemas.ts`
2. Export inferred types from `wv-wild-web/src/types/wma.types.ts`
3. Create component prop interfaces in `wv-wild-web/src/types/wma.props.ts`
4. Add type guards to `wv-wild-web/src/types/wma.guards.ts`
5. Export utility types from `wv-wild-web/src/types/wma.utils.ts`

### Phase 2: Content Collection Integration

1. Extend `content.config.ts` with WMA schema fields
2. Test type inference with existing adventures
3. Validate backward compatibility (no breaking changes)

### Phase 3: Component Implementation

1. Implement WMA components using typed props
2. Add JSDoc comments for prop documentation
3. Test type safety in component usage

### Phase 4: Template Integration

1. Create `WMATemplate.astro` with type guards
2. Refactor WMA pages to use template
3. Verify type safety across all WMA pages

---

## Testing Strategy

### Type-Level Tests

```typescript
// wv-wild-web/src/types/__tests__/wma.types.test.ts
import { describe, it, expectTypeOf } from 'vitest';
import type { SpeciesItem, FacilityItem } from '../wma.types.js';

describe('WMA Types', () => {
  it('SpeciesItem should have correct structure', () => {
    type Expected = {
      name: string;
      category: 'big-game' | 'small-game' | 'turkey' | 'waterfowl';
      season: string;
      description: string;
      tips?: string;
      kimNote?: string;
    };

    expectTypeOf<SpeciesItem>().toEqualTypeOf<Expected>();
  });

  it('FacilityItem should allow optional count', () => {
    const facility: FacilityItem = {
      type: 'Parking',
      description: 'Main lot',
      // count is optional
    };

    expectTypeOf(facility.count).toEqualTypeOf<number | undefined>();
  });
});
```

### Runtime Validation Tests

```typescript
// wv-wild-web/src/types/__tests__/wma.schemas.test.ts
import { describe, it, expect } from 'vitest';
import { SpeciesItemSchema } from '../wma.schemas.js';

describe('WMA Schemas', () => {
  it('should validate correct species item', () => {
    const validSpecies = {
      name: 'White-tailed Deer',
      category: 'big-game',
      season: 'Nov - Dec',
      description: 'Excellent hunting opportunities',
    };

    expect(() => SpeciesItemSchema.parse(validSpecies)).not.toThrow();
  });

  it('should reject invalid category', () => {
    const invalidSpecies = {
      name: 'Deer',
      category: 'invalid-category',
      season: 'Nov',
      description: 'Test',
    };

    expect(() => SpeciesItemSchema.parse(invalidSpecies)).toThrow();
  });
});
```

---

## File Organization

```
wv-wild-web/src/types/
├── adventure.ts           # Existing adventure types (SPEC-09, SPEC-10, SPEC-11)
├── wma.schemas.ts         # NEW: Zod schemas for WMA components
├── wma.types.ts           # NEW: Inferred TypeScript types
├── wma.props.ts           # NEW: Component prop interfaces
├── wma.guards.ts          # NEW: Type guard functions
├── wma.utils.ts           # NEW: Utility types and constants
└── __tests__/
    ├── adventure.test.ts  # Existing tests
    ├── wma.types.test.ts  # NEW: Type-level tests
    └── wma.schemas.test.ts # NEW: Runtime validation tests
```

---

## Architecture Decision Records

### ADR-001: Zod Schemas as Source of Truth

**Decision**: Use Zod schemas as single source of truth for types, deriving TypeScript types via `z.infer<>`.

**Rationale**:

- Runtime validation matches compile-time types
- Single definition prevents schema/type drift
- Astro Content Collections use Zod natively
- Automatic type inference reduces maintenance

**Alternatives Considered**:

- Manual TypeScript interfaces (rejected: duplication risk)
- JSON Schema (rejected: not TypeScript-native)

### ADR-002: Optional WMA Fields for Backward Compatibility

**Decision**: All WMA schema fields use `.optional()` modifier.

**Rationale**:

- Existing adventures remain valid without migration
- Zero breaking changes during schema extension
- Incremental adoption of WMA features
- Template can conditionally render sections

**Alternatives Considered**:

- Required fields (rejected: forces immediate migration)
- Separate WMA collection (rejected: fragments content)

### ADR-003: Type Guards Instead of Runtime Checks

**Decision**: Use TypeScript type guards (`is` predicates) for WMA detection.

**Rationale**:

- Type-safe narrowing in template logic
- Explicit intent at call sites
- Better IDE autocomplete
- Compile-time verification

**Alternatives Considered**:

- Boolean checks (rejected: no type narrowing)
- Duck typing (rejected: unsafe)

### ADR-004: Discriminated Unions for Variants

**Decision**: Use string literal unions for component variants.

**Rationale**:

- Exhaustive switch checks
- Autocomplete suggestions
- Type-safe mapping to CSS classes
- Prevents invalid variant strings

**Alternatives Considered**:

- Enums (rejected: runtime overhead)
- String constants (rejected: no union narrowing)

---

## Summary

**Type System Components**:

1. **Layer 1**: Zod schemas for runtime validation
2. **Layer 2**: Inferred TypeScript types via `z.infer<>`
3. **Layer 3**: Component prop interfaces
4. **Layer 4**: Type guards for WMA detection
5. **Layer 5**: Utility types and helpers

**Key Benefits**:

- Compile-time error detection
- Exhaustive variant handling
- Optional field safety
- Wrapper pattern type safety
- Schema-type consistency

**Files Created**:

- `wv-wild-web/src/types/wma.schemas.ts` (Zod schemas)
- `wv-wild-web/src/types/wma.types.ts` (Inferred types)
- `wv-wild-web/src/types/wma.props.ts` (Component props)
- `wv-wild-web/src/types/wma.guards.ts` (Type guards)
- `wv-wild-web/src/types/wma.utils.ts` (Utility types)

**Testing**:

- Type-level tests via Vitest `expectTypeOf`
- Runtime validation tests for Zod schemas
- Integration tests in component usage
