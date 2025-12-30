# RiverTemplate Type System Architecture

**Document ID**: ARCH-RIVER-001
**Version**: 1.0
**Last Updated**: 2025-12-30
**Status**: Architecture Design Record (ADR)

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Decisions](#architecture-decisions)
3. [Type System Design](#type-system-design)
4. [Zod Schema Specifications](#zod-schema-specifications)
5. [Content Collections Integration](#content-collections-integration)
6. [Type Inference Flow](#type-inference-flow)
7. [Data File Patterns](#data-file-patterns)
8. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

This document defines the complete type system architecture for RiverTemplate, establishing Zod schemas, TypeScript interfaces, validation strategies, and Content Collections integration patterns. The design ensures:

- **Type Safety**: Schema-first validation with runtime checking
- **Consistency**: Follows LakeTemplate patterns established in SPEC-13
- **Extensibility**: Supports future whitewater features without breaking changes
- **WVWO Compliance**: Matches aesthetic guidelines and Kim's voice

### Key Architectural Principles

1. **Schema-First Pattern**: Zod schemas are source of truth
2. **Backward Compatibility**: All river fields optional in adventures collection
3. **Structured Data**: No free-form strings where structured enums exist
4. **Validation Clarity**: Custom error messages guide developers
5. **Type Guards**: Enable safe conditional rendering

---

## Architecture Decisions

### ADR-001: Schema-First Type Inference

**Decision**: Use Pattern A (schema-first with `z.infer`) throughout RiverTemplate type system.

**Rationale**:
- **Consistency**: Matches existing LakeTemplate approach in `adventure.ts` lines 304-432
- **Runtime Safety**: Zod provides validation error messages out of the box
- **Better DX**: Error messages are clearer than compile-time-only TypeScript errors
- **Proven Pattern**: Already used successfully for LakeTemplateProps

**Pattern**:
```typescript
export const RapidSchema = z.object({ ... });
export type Rapid = z.infer<typeof RapidSchema>;
```

**Alternative Rejected**: Type-first with `z.ZodType<T>` wrapper adds complexity without benefit.

---

### ADR-002: Contact Validation Strategy

**Decision**: Use simple `.refine()` for "at least one contact method" validation.

**Rationale**:
- **Simplicity**: Single error message sufficient for this use case
- **DX**: Developers see clear message: "Outfitter must provide at least one contact method"
- **No Path-Specific Errors Needed**: All fields (phone/website/email) equally valid
- **Consistency**: Matches other validation patterns in codebase

**Pattern**:
```typescript
export const OutfitterContactSchema = z.object({
  phone: z.string().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
}).refine(
  contact => contact.phone || contact.website || contact.email,
  { message: "Outfitter must provide at least one contact method (phone, website, or email)" }
);
```

**Alternative Rejected**: `.superrefine()` with path-specific errors over-engineers for this scenario.

---

### ADR-003: Content Collections Extension Strategy

**Decision**: Extend existing `adventures` collection with optional river fields, maintain single collection.

**Rationale**:
- **Zero Breaking Changes**: All river fields optional maintains backward compatibility
- **Type Discrimination**: `type: z.enum(['adventure', 'wma', 'lake', 'river'])` enables conditional rendering
- **Simplicity**: No need for separate `rivers` collection
- **Proven Pattern**: WMA and Lake already use this approach (lines 98-112 in content.config.ts)

**Field Naming Convention**:
- Use **specific prefixes** to avoid collisions: `riverRapids`, `riverFishing`, `riverOutfitters`
- Lake uses `fishingSpots`, `marinas` - River uses `riverFishing`, `riverOutfitters`
- No ambiguity in template code: `adventure.data.fishingSpots` vs `adventure.data.riverFishing`

---

### ADR-004: Validation Strictness Levels

**Decision**: Apply pragmatic validation limits based on reasonable data volumes.

**Strictness Matrix**:

| Schema | Min Items | Max Items | String Min | Rationale |
|--------|-----------|-----------|------------|-----------|
| Rapids | 1 | 50 | 2 chars | Major rivers have 10-30 rapids |
| Fishing Species | 1 | 20 | 2 chars | WV rivers have 5-15 game fish |
| Outfitters | 1 | 30 | 2 chars | Major rivers have 5-15 outfitters |
| Access Points | 1 | 40 | 2 chars | Major rivers have 10-25 access points |
| Flow Levels | 3 | 6 | N/A | Low/Medium/High + optional seasonal |
| Attractions | 1 | 30 | 2 chars | Major rivers have 5-20 attractions |

**Error Message Pattern**:
```typescript
.min(1, "At least one rapid classification required")
.max(50, "Maximum 50 rapids per river (consider splitting into sections)")
```

---

## Type System Design

### Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                Content Collections (Zod Schema)              │
│  adventures: z.object({                                      │
│    type: z.enum(['adventure', 'wma', 'lake', 'river']),     │
│    riverRapids?: z.array(RapidSchema),                      │
│    riverFishing?: z.array(RiverFishingSchema),              │
│    riverOutfitters?: z.array(OutfitterSchema),              │
│    riverAccessPoints?: z.array(AccessPointSchema),          │
│    riverFlowLevels?: z.array(SeasonalFlowSchema),           │
│    riverAttractions?: z.array(RiverAttractionSchema),       │
│  })                                                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Type Inference
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Data Files (Typed Objects)                      │
│  export const gauleyRiverData: RiverTemplateProps = {       │
│    name: "Gauley River",                                     │
│    rapids: [{ base: "class-iv", modifier: "plus", ... }],   │
│    fishing: [{ species: "Smallmouth Bass", ... }],          │
│    outfitters: [{ name: "ACE Adventure", ... }],            │
│  }                                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Props Spreading
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Page Components                             │
│  <RiverTemplate {...gauleyRiverData} />                     │
│  - Type checking at compile time                            │
│  - IntelliSense autocomplete                                │
│  - Zod validation at runtime (optional)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Zod Schema Specifications

### Location: `src/types/adventure.ts` (After line 432)

### 1. Rapid Classification Schema

**Purpose**: Structured rapid difficulty using AWA International Scale of River Difficulty.

**Design**:
- **Structured**: `{ base, modifier }` instead of free-form string "Class IV+"
- **Display Name**: Separate field for human-readable format
- **Validation**: Base class I-VI, optional modifier (plus/minus)

```typescript
/**
 * Rapid classification following AWA International Scale.
 * Uses structured base + modifier instead of free-form string.
 *
 * @example
 * { base: "class-iv", modifier: "plus", displayName: "Class IV+" }
 */
export const RapidClassSchema = z.enum([
  'class-i',    // Easy - Small waves, few obstructions
  'class-ii',   // Novice - Straightforward rapids with wide channels
  'class-iii',  // Intermediate - Rapids with moderate, irregular waves
  'class-iv',   // Advanced - Intense, powerful rapids requiring precise maneuvering
  'class-v',    // Expert - Extremely long, obstructed, or violent rapids
  'class-vi',   // Extreme - Nearly impossible and very dangerous
]);

export const RapidModifierSchema = z.enum(['plus', 'minus']).optional();

export const RapidSchema = z.object({
  /** Structured base class (e.g., "class-iv") */
  base: RapidClassSchema,
  /** Optional +/- modifier */
  modifier: RapidModifierSchema,
  /** Human-readable display (e.g., "Class IV+") */
  displayName: z.string().min(2, "Display name required for rapid classification"),
  /** Rapid name (e.g., "Pure Screaming Hell", "Heaven's Gate") */
  name: z.string().min(2, "Rapid name required"),
  /** Brief description of hazards and characteristics */
  description: z.string().min(10, "Rapid description must be at least 10 characters"),
  /** Optional hazard callouts (e.g., "Undercut rocks", "Powerful hydraulic") */
  hazards: z.array(z.string()).max(10, "Maximum 10 hazards per rapid").optional(),
  /** Optional Kim's tip for running this rapid */
  kimNote: z.string().optional(),
});

export type RapidClass = z.infer<typeof RapidClassSchema>;
export type RapidModifier = z.infer<typeof RapidModifierSchema>;
export type Rapid = z.infer<typeof RapidSchema>;
```

**Validation Messages**:
- Base class required: "Rapid must have base classification (class-i through class-vi)"
- Display name too short: "Display name required for rapid classification"
- Name too short: "Rapid name required"
- Description too short: "Rapid description must be at least 10 characters"
- Too many hazards: "Maximum 10 hazards per rapid"

---

### 2. Seasonal Flow Level Schema

**Purpose**: Separate flow level enum from optional CFS data to avoid mixed-type strings.

**Design**:
- **Flow Level**: Strict enum (low/medium/high/flood)
- **CFS Range**: Optional structured object with min/max
- **Season**: String for flexibility ("Early Spring", "Summer", "Fall drawdown")

```typescript
/**
 * Flow level enum for river conditions.
 * Separated from CFS data to avoid mixed-type strings.
 */
export const FlowLevelSchema = z.enum([
  'low',      // Below normal - rocks exposed, technical navigation
  'medium',   // Optimal flow - classic whitewater experience
  'high',     // Above normal - increased power and speed
  'flood',    // Dangerous - river unrunnable or expert-only
]);

/**
 * Seasonal flow conditions for river planning.
 * Uses structured level + optional CFS instead of mixed strings.
 *
 * @example
 * {
 *   season: "Spring Runoff (March-May)",
 *   level: "high",
 *   cfsRange: { min: 2500, max: 8000 },
 *   description: "...",
 *   kimNote: "..."
 * }
 */
export const SeasonalFlowSchema = z.object({
  /** Season or time period (e.g., "Spring Runoff (March-May)") */
  season: z.string().min(3, "Season description required"),
  /** Flow level enum */
  level: FlowLevelSchema,
  /** Optional CFS range for gauge context */
  cfsRange: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }).optional(),
  /** Conditions and characteristics at this flow level */
  description: z.string().min(20, "Flow description must be at least 20 characters"),
  /** Optional Kim's tip for this flow level */
  kimNote: z.string().optional(),
});

export type FlowLevel = z.infer<typeof FlowLevelSchema>;
export type SeasonalFlow = z.infer<typeof SeasonalFlowSchema>;
```

---

### 3. River Fishing Schema

**Purpose**: Fish species available in river with season and techniques.

```typescript
/**
 * Fish species available in river.
 * Similar to lake fishing but tailored for moving water.
 */
export const RiverFishingSchema = z.object({
  /** Species name (e.g., "Smallmouth Bass", "Muskie", "Brook Trout") */
  species: z.string().min(2, "Species name required"),
  /** Best season for this species */
  season: z.string().min(3, "Season description required"),
  /** Recommended techniques (e.g., "Tube jigs on rocky shoals") */
  techniques: z.string().min(10, "Techniques must be at least 10 characters"),
  /** Typical size range (e.g., "8-14 inches", "12-18 pounds") */
  sizeRange: z.string().optional(),
  /** Optional regulations (e.g., "Catch and release only") */
  regulations: z.string().optional(),
  /** Optional Kim's tip */
  kimNote: z.string().optional(),
});

export type RiverFishing = z.infer<typeof RiverFishingSchema>;
```

---

### 4. Outfitter Schema with Contact Validation

**Purpose**: Commercial outfitters for guided trips, rentals, and shuttle services.

**Design**:
- All contact fields optional
- `.refine()` ensures at least one contact method exists
- Simple validation pattern for good DX

```typescript
/**
 * Outfitter contact information.
 * All fields optional but at least one required via refine.
 */
export const OutfitterContactSchema = z.object({
  phone: z.string().optional(),
  website: z.string().url("Invalid website URL format").optional(),
  email: z.string().email("Invalid email format").optional(),
}).refine(
  contact => contact.phone || contact.website || contact.email,
  { message: "Outfitter must provide at least one contact method (phone, website, or email)" }
);

/**
 * Commercial outfitter for river trips.
 * Includes services, pricing, and validated contact info.
 */
export const OutfitterSchema = z.object({
  /** Outfitter name (e.g., "ACE Adventure Resort") */
  name: z.string().min(2, "Outfitter name required"),
  /** Services offered (e.g., "Guided rafting trips, kayak rentals, shuttle service") */
  services: z.array(z.string().min(5, "Service description too short"))
    .min(1, "At least one service required")
    .max(15, "Maximum 15 services per outfitter"),
  /** Contact information (validated for at least one method) */
  contact: OutfitterContactSchema,
  /** Optional pricing info (e.g., "From $89/person") */
  pricing: z.string().optional(),
  /** Optional seasonal operation info */
  seasonalInfo: z.string().optional(),
  /** Optional certifications (e.g., "Licensed WV Outfitter", "ACA Certified") */
  certifications: z.array(z.string()).max(10, "Maximum 10 certifications").optional(),
});

export type OutfitterContact = z.infer<typeof OutfitterContactSchema>;
export type Outfitter = z.infer<typeof OutfitterSchema>;
```

**Validation Error Example**:
```typescript
// ❌ This will fail validation:
const badOutfitter = {
  name: "Example Outfitter",
  services: ["Rafting"],
  contact: {} // No contact method provided
};

// ✅ This will pass:
const goodOutfitter = {
  name: "Example Outfitter",
  services: ["Rafting"],
  contact: { website: "https://example.com" }
};
```

---

### 5. Access Point Schema

**Purpose**: Public access points with parking, facilities, and features.

**Design**:
- Strict type enum to avoid free-form chaos
- Optional `typeNotes` for edge cases (e.g., "4WD required")

```typescript
/**
 * Access point type enum.
 * Covers common WV river access scenarios.
 */
export const AccessPointTypeSchema = z.enum([
  'boat-ramp',      // Paved or gravel boat launch
  'put-in',         // Whitewater put-in (may be primitive)
  'take-out',       // Whitewater take-out
  'roadside',       // Parking along roadway
  'trailhead',      // Hike-in access
  'bridge',         // Access under/near bridge
  'private-fee',    // Private access with fee
  'outfitter-only', // Outfitter-managed access
]);

/**
 * Public access point for river.
 * Uses structured type enum + optional notes for flexibility.
 */
export const AccessPointSchema = z.object({
  /** Access point name (e.g., "Route 60 Bridge Take-Out") */
  name: z.string().min(2, "Access point name required"),
  /** Structured type enum */
  type: AccessPointTypeSchema,
  /** Optional notes for special conditions (e.g., "4WD required", "Steep carry") */
  typeNotes: z.string().optional(),
  /** Available features (e.g., "Parking", "Restrooms", "Picnic area") */
  features: z.array(z.string().min(3, "Feature description too short"))
    .max(20, "Maximum 20 features per access point"),
  /** Optional GPS coordinates (formatted string) */
  coordinates: z.string().optional(),
  /** Optional fee info (e.g., "Free", "$5 parking", "$10 launch fee") */
  fees: z.string().optional(),
  /** Optional external map link */
  mapLink: z.string().url("Invalid map link URL").optional(),
});

export type AccessPointType = z.infer<typeof AccessPointTypeSchema>;
export type AccessPoint = z.infer<typeof AccessPointSchema>;
```

---

### 6. River Attraction Schema

**Purpose**: Scenic overlooks, historical sites, local dining/lodging near river.

**Design**:
- **Free-form icons**: No strict enum (too many possibilities)
- **Standard set**: 6 recommended icons for consistency
- **Fallback**: Generic icon if custom icon fails

```typescript
/**
 * Nearby attraction or point of interest.
 * Uses free-form icon with standard recommendations.
 */
export const RiverAttractionSchema = z.object({
  /** Attraction name (e.g., "New River Gorge Bridge", "Hawks Nest Overlook") */
  name: z.string().min(2, "Attraction name required"),
  /** Attraction type for categorization (e.g., "Scenic Overlook", "Historic Site") */
  type: z.string().min(3, "Attraction type required"),
  /** Brief description */
  description: z.string().min(10, "Description must be at least 10 characters"),
  /** Distance from river (e.g., "0.5 miles", "10 min drive") */
  distance: z.string().optional(),
  /** Optional external website or info link */
  link: z.string().url("Invalid link URL").optional(),
  /**
   * Optional icon name (free-form but recommend standard set).
   * Standard icons: "overlook", "historic", "dining", "lodging", "adventure", "family"
   * Falls back to generic icon if not recognized.
   */
  icon: z.string().optional(),
});

export type RiverAttraction = z.infer<typeof RiverAttractionSchema>;

/**
 * Standard attraction icon recommendations.
 * Templates can fallback to 'info' icon if custom icon not found.
 */
export const STANDARD_ATTRACTION_ICONS = [
  'overlook',   // Scenic viewpoints
  'historic',   // Museums, landmarks
  'dining',     // Restaurants, cafes
  'lodging',    // Hotels, cabins
  'adventure',  // Zip lines, rock climbing
  'family',     // Kid-friendly activities
] as const;
```

---

## Content Collections Integration

### Location: `src/content.config.ts` (After line 111)

### Extension Strategy

**Approach**: Add optional river fields to existing `adventures` collection.

**Benefits**:
- Zero breaking changes (all fields optional)
- Single query for all adventures: `getCollection('adventures')`
- Type discrimination via `type` field enables conditional rendering

### Schema Extension Code

```typescript
// Add to line 99 (existing type enum):
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),

// Add after line 111 (after mapUrl field):

// ========================================================================
// RIVER-SPECIFIC OPTIONAL FIELDS (RiverTemplate Support)
// All fields optional for backward compatibility.
// Use type guard isRiverAdventure() to check before rendering.
// ========================================================================

/** Rapid classifications for whitewater sections */
riverRapids: z.array(RapidSchema)
  .min(1, "At least one rapid classification required")
  .max(50, "Maximum 50 rapids per river")
  .optional(),

/** Fish species available in river */
riverFishing: z.array(RiverFishingSchema)
  .min(1, "At least one fish species required")
  .max(20, "Maximum 20 species per river")
  .optional(),

/** Commercial outfitters offering trips and services */
riverOutfitters: z.array(OutfitterSchema)
  .min(1, "At least one outfitter required")
  .max(30, "Maximum 30 outfitters per river")
  .optional(),

/** Public access points (put-ins, take-outs, boat ramps) */
riverAccessPoints: z.array(AccessPointSchema)
  .min(1, "At least one access point required")
  .max(40, "Maximum 40 access points per river")
  .optional(),

/** Seasonal flow levels and water conditions */
riverFlowLevels: z.array(SeasonalFlowSchema)
  .min(3, "At least 3 flow levels required (low/medium/high)")
  .max(6, "Maximum 6 flow levels per river")
  .optional(),

/** Nearby attractions, scenic overlooks, and POIs */
riverAttractions: z.array(RiverAttractionSchema)
  .min(1, "At least one attraction required")
  .max(30, "Maximum 30 attractions per river")
  .optional(),

/** Optional river length in miles */
riverLength: z.number().positive("River length must be positive").optional(),

/** Optional average gradient (feet per mile) */
riverGradient: z.number().positive("Gradient must be positive").optional(),

/** Optional USGS gauge ID for flow monitoring */
riverGaugeId: z.string().optional(),
```

### Field Naming Rationale

**Prefixed with `river`** to avoid collisions:

| Lake Field | River Field | Why Different? |
|------------|-------------|----------------|
| `fishingSpots` | `riverFishing` | Lake = locations, River = species |
| `marinas` | `riverOutfitters` | Lake = facilities, River = commercial services |
| N/A | `riverRapids` | River-specific (no lake equivalent) |
| N/A | `riverFlowLevels` | River-specific (lakes don't have flow) |

---

## Type Inference Flow

### Complete Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 1: Content Collections Schema (src/content.config.ts)          │
│                                                                       │
│ adventures: defineCollection({                                       │
│   schema: z.object({                                                 │
│     type: z.enum(['adventure', 'wma', 'lake', 'river']),            │
│     riverRapids?: z.array(RapidSchema),     // ◄─ Runtime validation│
│     riverFishing?: z.array(RiverFishingSchema),                     │
│     ...                                                              │
│   })                                                                 │
│ })                                                                   │
│                                                                       │
│ Type Generated: CollectionEntry<'adventures'>                       │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         │ Astro Content Collections API
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 2: Query Collection in Page (src/pages/near/gauley-river.astro)│
│                                                                       │
│ import { getCollection } from 'astro:content';                       │
│ const rivers = await getCollection('adventures',                     │
│   entry => entry.data.type === 'river'  // ◄─ Type discrimination   │
│ );                                                                   │
│                                                                       │
│ Type: CollectionEntry<'adventures'>[]                               │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         │ Extract .data property
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 3: Data Files (src/data/rivers/gauley.ts)                      │
│                                                                       │
│ export const gauleyRiverData: RiverTemplateProps = {                │
│   name: "Gauley River",                                              │
│   rapids: [                                // ◄─ Compile-time check │
│     {                                                                │
│       base: "class-iv",                                              │
│       modifier: "plus",                                              │
│       displayName: "Class IV+",                                      │
│       name: "Pure Screaming Hell",                                   │
│       description: "...",                                            │
│     }                                                                │
│   ],                                                                 │
│   fishing: [...],                                                    │
│   outfitters: [...],                                                 │
│ }                                                                    │
│                                                                       │
│ Type: RiverTemplateProps (from adventure.ts)                        │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         │ Props spreading
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 4: Page Component (src/pages/near/gauley-river.astro)          │
│                                                                       │
│ import { gauleyRiverData } from '../../data/rivers/gauley';          │
│ import RiverTemplate from '../../components/templates/RiverTemplate';│
│                                                                       │
│ <RiverTemplate {...gauleyRiverData} />   // ◄─ TypeScript validates │
│                                                                       │
│ Props validated: name, rapids, fishing, outfitters, etc.             │
└────────────────────────┬─────────────────────────────────────────────┘
                         │
                         │ Template rendering
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 5: Template Component (RiverTemplate.astro)                    │
│                                                                       │
│ interface Props extends RiverTemplateProps {}                        │
│ const { rapids, fishing, outfitters } = Astro.props;                │
│                                                                       │
│ {rapids.map(rapid => (                   // ◄─ Type-safe iteration  │
│   <div>{rapid.displayName}: {rapid.name}</div>                      │
│ ))}                                                                  │
│                                                                       │
│ IntelliSense: rapid.displayName, rapid.base, rapid.modifier         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Type Guard Architecture

### Location: `src/types/riverGuards.ts` (NEW FILE)

### Purpose
Enable safe conditional rendering in templates and pages.

### Pattern

```typescript
/**
 * Type Guards for River Adventures
 * Enables safe conditional rendering in Astro components.
 *
 * @module types/riverGuards
 */

import type { CollectionEntry } from 'astro:content';

/**
 * Type guard to check if adventure is a river.
 * Enables conditional rendering of river-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections
 * @returns true if adventure.data.type === 'river'
 *
 * @example
 * ```astro
 * ---
 * import { getCollection } from 'astro:content';
 * import { isRiverAdventure } from '../types/riverGuards';
 *
 * const adventures = await getCollection('adventures');
 * const rivers = adventures.filter(isRiverAdventure);
 * ---
 * ```
 */
export function isRiverAdventure(
  adventure: CollectionEntry<'adventures'>
): boolean {
  return adventure.data.type === 'river';
}

/**
 * Type guard to check if adventure has rapids data.
 * Useful for conditional rendering of whitewater sections.
 */
export function hasRapids(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { riverRapids: NonNullable<CollectionEntry<'adventures'>['data']['riverRapids']> }
} {
  return Array.isArray(adventure.data.riverRapids) && adventure.data.riverRapids.length > 0;
}

/**
 * Type guard to check if adventure has seasonal flow data.
 */
export function hasSeasonalFlow(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { riverFlowLevels: NonNullable<CollectionEntry<'adventures'>['data']['riverFlowLevels']> }
} {
  return Array.isArray(adventure.data.riverFlowLevels) && adventure.data.riverFlowLevels.length > 0;
}

/**
 * Type guard to check if adventure has outfitters data.
 */
export function hasOutfitters(
  adventure: CollectionEntry<'adventures'>
): adventure is CollectionEntry<'adventures'> & {
  data: { riverOutfitters: NonNullable<CollectionEntry<'adventures'>['data']['riverOutfitters']> }
} {
  return Array.isArray(adventure.data.riverOutfitters) && adventure.data.riverOutfitters.length > 0;
}
```

### Usage Example in Template

```astro
---
import { getEntry } from 'astro:content';
import { hasRapids, hasSeasonalFlow } from '../../types/riverGuards';

const gauley = await getEntry('adventures', 'gauley-river');
---

{hasRapids(gauley) && (
  <section class="rapids-section">
    <h2>Whitewater Rapids</h2>
    {gauley.data.riverRapids.map(rapid => (
      <div>{rapid.displayName}: {rapid.name}</div>
    ))}
  </section>
)}

{hasSeasonalFlow(gauley) && (
  <section class="flow-section">
    <h2>Seasonal Flow Levels</h2>
    {gauley.data.riverFlowLevels.map(flow => (
      <div>{flow.season}: {flow.level}</div>
    ))}
  </section>
)}
```

---

## RiverTemplateProps Interface

### Location: `src/types/adventure.ts` (After line 432)

### Complete Interface

```typescript
/**
 * River template props interface.
 * Complete type definition for RiverTemplate component used for river adventure pages.
 *
 * Extends base adventure fields with river-specific sections:
 * - Rapids classification (whitewater)
 * - Fishing species and techniques
 * - Outfitters and guide services
 * - Access points (put-ins, take-outs)
 * - Seasonal flow levels
 * - Nearby attractions
 */
export interface RiverTemplateProps {
  // ============================================
  // BASIC INFO (from AdventureHero pattern)
  // ============================================

  /** River name (e.g., "Gauley River", "New River") */
  name: string;

  /** Hero image src */
  image: string;

  /** Hero image alt text (WCAG 2.1 Level AA required) */
  imageAlt: string;

  /** Brief tagline or subtitle (Kim's voice) */
  tagline: string;

  /** Full river description (rendered as prose) */
  description: string;

  /** Quick stats for hero section (typically 4 items for desktop grid) */
  stats: StatItem[];

  // ============================================
  // RIVER-SPECIFIC SECTIONS
  // ============================================

  /** Rapid classifications for whitewater sections */
  rapids: Rapid[];

  /** Fish species available in river */
  fishing: RiverFishing[];

  /** Commercial outfitters offering trips and services */
  outfitters: Outfitter[];

  /** Public access points (put-ins, take-outs, boat ramps) */
  accessPoints: AccessPoint[];

  /** Seasonal flow levels and water conditions */
  flowLevels: SeasonalFlow[];

  /** Nearby attractions, scenic overlooks, and POIs */
  attractions: RiverAttraction[];

  // ============================================
  // SHARED SECTIONS (from LakeTemplate pattern)
  // ============================================

  /** Recommended gear checklist */
  gearList: GearItem[];

  /** Related shop categories */
  relatedShop: RelatedCategory[];

  // ============================================
  // OPTIONAL METADATA
  // ============================================

  /** Optional difficulty level (for overall river rating) */
  difficulty?: Difficulty;

  /** Optional best season to visit */
  bestSeason?: Season;

  /** Optional geographic coordinates (for map integration) */
  coordinates?: Coordinates;

  /** Optional river length in miles */
  riverLength?: number;

  /** Optional average gradient (feet per mile) */
  riverGradient?: number;

  /** Optional USGS gauge ID for flow monitoring */
  gaugeId?: string;
}
```

### Design Notes

**Field Naming in Props vs. Collections**:
- Props use **clean names**: `rapids`, `fishing`, `outfitters`
- Collections use **prefixed names**: `riverRapids`, `riverFishing`, `riverOutfitters`
- Rationale: Props are already namespaced by component context (RiverTemplate), collections need disambiguation

**Missing from Original PROMPT.md**:
All core fields were present in PROMPT.md. This interface adds:
- `riverLength`, `riverGradient`, `gaugeId` (optional metadata)
- Explicit `stats`, `gearList`, `relatedShop` (inherited from LakeTemplate pattern)
- `coordinates`, `difficulty`, `bestSeason` (optional metadata)

---

## Data File Patterns

### Location: `src/data/rivers/` (NEW DIRECTORY)

### File Naming Convention

**Pattern**: `{river-name-slug}.ts`

**Examples**:
- `gauley.ts` → Gauley River
- `new.ts` → New River
- `cheat.ts` → Cheat River
- `tygart.ts` → Tygart Valley River

### Template Structure

```typescript
/**
 * Gauley River Data
 * RiverTemplate data extraction for Gauley River adventure page
 *
 * Purpose: Centralize Gauley River adventure data for RiverTemplate component
 *
 * Data includes:
 * - Quick stats (length, distance from shop, location, access)
 * - Rapid classifications (Upper Gauley Class IV-V, Lower Gauley Class III-IV)
 * - Fishing species (smallmouth bass, muskie, trout)
 * - Outfitters and guide services
 * - Access points (put-ins, take-outs, boat ramps)
 * - Seasonal flow levels (spring release, summer low, fall drawdown)
 * - Nearby attractions (New River Gorge Bridge, Hawks Nest)
 * - Gear checklist
 * - Related shop categories
 */

import type { RiverTemplateProps, Rapid, RiverFishing, Outfitter, AccessPoint, SeasonalFlow, RiverAttraction, GearItem, RelatedCategory, StatItem } from '../../types/adventure';

/**
 * Complete river data for Gauley River
 * Ready to spread into RiverTemplate component
 */
export const gauleyRiverData: RiverTemplateProps = {
  // ============================================
  // BASIC INFO
  // ============================================

  name: 'Gauley River',
  image: '/images/gauley-river-hero.jpg', // TODO: Update with actual image path
  imageAlt: 'Gauley River whitewater rapids with kayakers navigating Class V rapids',
  tagline: 'Big Water. Big Drops. West Virginia\'s Crown Jewel of Whitewater.',
  description: 'The Gauley River offers some of the most intense whitewater in the Eastern United States. With over 100 rapids in 28 miles, the Upper Gauley (Class IV-V) challenges expert paddlers, while the Lower Gauley (Class III-IV) provides thrilling runs for intermediates. Controlled dam releases in fall create legendary whitewater conditions.',

  // Quick Stats (Hero Section)
  stats: [
    { value: '28', label: 'Miles', icon: 'distance' as const },
    { value: '45 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Nicholas Co.', label: 'Location', icon: 'location' as const },
    { value: 'Sep-Oct', label: 'Best Season', icon: 'calendar' as const },
  ],

  // ============================================
  // RAPIDS (Whitewater Classification)
  // ============================================

  rapids: [
    {
      base: 'class-v',
      modifier: undefined,
      displayName: 'Class V',
      name: 'Pure Screaming Hell',
      description: 'Mile-long rapid with continuous technical moves, powerful holes, and undercut rocks. Scouts from river left. Run down the center avoiding the massive hole river right.',
      hazards: ['Undercut rocks', 'Powerful hydraulics', 'Long swim potential'],
      kimNote: 'This is expert-only territory. Scout it, respect it, and have a solid roll.',
    },
    {
      base: 'class-v',
      modifier: undefined,
      displayName: 'Class V',
      name: 'Lost Paddle',
      description: 'Series of large holes and waves with limited recovery pools. Technical entrance requires precise line. Named for obvious reasons.',
      hazards: ['Multiple holes', 'Limited eddies', 'High consequence'],
    },
    {
      base: 'class-iv',
      modifier: 'plus',
      displayName: 'Class IV+',
      name: 'Pillow Rock',
      description: 'Massive undercut boulder creating complex currents. Multiple routes possible - scout from river right to choose your line.',
      hazards: ['Undercut rock', 'Recirculating currents', 'Pinning potential'],
      kimNote: 'Most folks run far right. Left is cleaner but committing.',
    },
    // ... more rapids
  ],

  // ============================================
  // FISHING (Species & Techniques)
  // ============================================

  fishing: [
    {
      species: 'Smallmouth Bass',
      season: 'May through October',
      techniques: 'Target rocky pools below rapids with tube jigs, in-line spinners, and topwater poppers. Early morning and late evening are prime. Use 6-8 lb test for clear water.',
      sizeRange: '10-16 inches',
      kimNote: 'Smallmouth love the current breaks. Look for slack water behind boulders.',
    },
    {
      species: 'Muskie',
      season: 'Summer and Fall',
      techniques: 'Troll large bucktails and crankbaits in deep pools. Fish slow in the heat, aggressive in fall. Heavy tackle required for 40"+ fish.',
      sizeRange: '30-48 inches',
      regulations: 'Minimum 30 inches, daily limit 1 fish',
    },
    // ... more species
  ],

  // ============================================
  // OUTFITTERS (Commercial Services)
  // ============================================

  outfitters: [
    {
      name: 'ACE Adventure Resort',
      services: [
        'Guided Upper Gauley trips',
        'Lower Gauley rafting',
        'Private kayak trips',
        'Shuttle service',
        'Gear rentals',
      ],
      contact: {
        phone: '(800) 787-3982',
        website: 'https://aceraft.com',
        email: 'info@aceraft.com',
      },
      pricing: 'From $189/person (Upper Gauley)',
      seasonalInfo: 'September-October dam release season',
      certifications: ['Licensed WV Outfitter', 'Leave No Trace certified'],
    },
    // ... more outfitters
  ],

  // ============================================
  // ACCESS POINTS (Put-ins, Take-outs)
  // ============================================

  accessPoints: [
    {
      name: 'Summersville Dam Put-In',
      type: 'put-in',
      features: [
        'Paved parking',
        'Restrooms',
        'Gear staging area',
        'ADA accessible',
      ],
      coordinates: '38.2347, -80.8456',
      fees: 'Free',
    },
    {
      name: 'Mason\'s Branch Take-Out',
      type: 'take-out',
      typeNotes: 'Steep carry from river - use caution',
      features: [
        'Gravel parking',
        'Limited facilities',
      ],
      coordinates: '38.1456, -80.9123',
      fees: 'Free',
    },
    // ... more access points
  ],

  // ============================================
  // SEASONAL FLOW LEVELS
  // ============================================

  flowLevels: [
    {
      season: 'Spring Runoff (March-April)',
      level: 'high',
      cfsRange: { min: 3000, max: 8000 },
      description: 'Natural spring runoff creates high water conditions. Rapids become more powerful and pushy. Limited visibility due to runoff. Upper Gauley recommended for expert paddlers only.',
      kimNote: 'This is heavy water - make sure your roll is solid before committing.',
    },
    {
      season: 'Dam Release Season (September-October)',
      level: 'medium',
      cfsRange: { min: 2500, max: 3500 },
      description: 'Legendary Gauley Season - controlled dam releases create optimal whitewater conditions. This is peak season for commercial trips and private boaters. Water is clear and flows are consistent.',
      kimNote: 'Best whitewater in the East. Book guides early - this season fills up fast.',
    },
    {
      season: 'Summer Low Water (June-August)',
      level: 'low',
      cfsRange: { min: 200, max: 800 },
      description: 'Very low flows expose rocks and create technical navigation. Upper Gauley mostly unrunnable. Lower Gauley can be scrapy but fishable. Prime time for angling.',
    },
    // ... more flow levels
  ],

  // ============================================
  // ATTRACTIONS (Nearby POIs)
  // ============================================

  attractions: [
    {
      name: 'New River Gorge Bridge',
      type: 'Scenic Overlook',
      description: 'Iconic single-span arch bridge spanning 3,030 feet across New River Gorge. Stunning views from multiple overlooks. Bridge Walk tours available.',
      distance: '25 miles',
      link: 'https://www.nps.gov/neri/planyourvisit/bridge.htm',
      icon: 'overlook',
    },
    {
      name: 'Hawks Nest State Park',
      type: 'State Park',
      description: 'Aerial tramway, museum, and scenic overlook of New River Gorge. Hiking trails and lodge accommodations available.',
      distance: '20 miles',
      icon: 'adventure',
    },
    // ... more attractions
  ],

  // ============================================
  // GEAR CHECKLIST
  // ============================================

  gearList: [
    { name: 'WV fishing license', optional: false },
    { name: 'Whitewater helmet (for paddling)', optional: false },
    { name: 'Type III or V PFD', optional: false },
    { name: 'Wetsuit or drysuit (fall season)', optional: false },
    { name: 'Throw rope', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'VHF radio or whistle', optional: true },
    { name: 'Dry bag for valuables', optional: true },
    { name: 'Fishing rod & tackle (6-8 lb line)', optional: true },
    { name: 'Sunscreen and bug spray', optional: false },
  ],

  // ============================================
  // RELATED SHOP CATEGORIES
  // ============================================

  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, line, and tackle for moving water',
      href: '/shop/fishing',
    },
    {
      name: 'Paddling Gear',
      description: 'Kayaks, paddles, PFDs, and whitewater safety equipment',
      href: '/shop/paddling',
    },
    {
      name: 'Camping Gear',
      description: 'Tents, coolers, and camp supplies for multi-day trips',
      href: '/shop/camping',
    },
  ],

  // ============================================
  // OPTIONAL METADATA
  // ============================================

  difficulty: 'rugged', // Overall river rating
  bestSeason: 'fall', // Dam release season
  coordinates: {
    lat: 38.2217,
    lng: -80.9097,
  },
  riverLength: 28, // Miles
  riverGradient: 26, // Feet per mile average
  gaugeId: '03189600', // USGS gauge for Summersville Dam
};
```

### Export Pattern

**Naming Convention**: `{riverName}RiverData`

```typescript
// ✅ CORRECT
export const gauleyRiverData: RiverTemplateProps = { ... };
export const newRiverData: RiverTemplateProps = { ... };
export const cheatRiverData: RiverTemplateProps = { ... };

// ❌ INCORRECT
export const gauley = { ... }; // Missing type annotation
export const GauleyRiver: RiverTemplateProps = { ... }; // Wrong casing
```

---

## Implementation Checklist

### Phase 1: Type System Foundation

- [ ] **T001**: Create `src/types/riverGuards.ts` with type guard functions
- [ ] **T002**: Add Zod schemas to `src/types/adventure.ts` (after line 432):
  - [ ] RapidSchema
  - [ ] SeasonalFlowSchema
  - [ ] RiverFishingSchema
  - [ ] OutfitterSchema + OutfitterContactSchema
  - [ ] AccessPointSchema
  - [ ] RiverAttractionSchema
- [ ] **T003**: Add RiverTemplateProps interface to `src/types/adventure.ts`
- [ ] **T004**: Export all types and schemas from adventure.ts

### Phase 2: Content Collections Extension

- [ ] **T005**: Update `src/content.config.ts`:
  - [ ] Add 'river' to type enum (line 99)
  - [ ] Add river field schemas (after line 111)
  - [ ] Add validation error messages
- [ ] **T006**: Test Zod validation with sample data:
  - [ ] Valid rapid classification
  - [ ] Invalid contact (missing all methods)
  - [ ] Invalid access point type

### Phase 3: Data Files

- [ ] **T007**: Create `src/data/rivers/` directory
- [ ] **T008**: Create `src/data/rivers/_example.ts` template
- [ ] **T009**: Create `src/data/rivers/gauley.ts` (full Gauley River data)
- [ ] **T010**: Verify TypeScript validation catches errors:
  - [ ] Missing required field
  - [ ] Invalid enum value
  - [ ] Incorrect nested object structure

### Phase 4: Documentation

- [ ] **T011**: Update CONTRIBUTING.md with river data file pattern
- [ ] **T012**: Create RIVER-DATA-GUIDE.md with examples
- [ ] **T013**: Add JSDoc comments to all exported types
- [ ] **T014**: Generate type diagram (this document serves as ADR)

### Phase 5: Testing

- [ ] **T015**: Write unit tests for type guards (riverGuards.test.ts)
- [ ] **T016**: Write Zod validation tests (riverSchemas.test.ts)
- [ ] **T017**: Test Content Collections query with river type filter
- [ ] **T018**: Verify IntelliSense autocomplete in VS Code

---

## Validation Error Message Design

### Strategy

**Goal**: Provide clear, actionable error messages that guide developers to fix issues quickly.

### Error Message Patterns

#### 1. Required Field Missing

```typescript
// Schema
name: z.string().min(2, "Rapid name required")

// Error Output
"Rapid name required"
```

#### 2. Length Validation

```typescript
// Schema
services: z.array(z.string().min(5, "Service description too short"))
  .min(1, "At least one service required")
  .max(15, "Maximum 15 services per outfitter")

// Error Output
"Service description too short" (on item level)
"At least one service required" (on array level)
"Maximum 15 services per outfitter" (on array level)
```

#### 3. Custom Refinement

```typescript
// Schema
OutfitterContactSchema.refine(
  contact => contact.phone || contact.website || contact.email,
  { message: "Outfitter must provide at least one contact method (phone, website, or email)" }
)

// Error Output
"Outfitter must provide at least one contact method (phone, website, or email)"
```

#### 4. URL Validation

```typescript
// Schema
website: z.string().url("Invalid website URL format")

// Error Output
"Invalid website URL format"
```

### Error Message Guidelines

1. **Be Specific**: "Rapid name required" > "Required"
2. **Provide Context**: "Maximum 15 services per outfitter" > "Too many items"
3. **Suggest Solutions**: "Outfitter must provide at least one contact method (phone, website, or email)"
4. **Use Domain Language**: "Rapid" not "Item", "Outfitter" not "Object"
5. **Maintain Consistency**: All min length errors use "{Field} required" pattern

---

## Type Inference Flow Diagram (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CONTENT LAYER                                 │
│  src/content.config.ts                                               │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ adventures: defineCollection({                                 │ │
│  │   schema: z.object({                                           │ │
│  │     type: z.enum(['adventure', 'wma', 'lake', 'river']),      │ │
│  │     riverRapids?: z.array(RapidSchema),                       │ │
│  │     riverFishing?: z.array(RiverFishingSchema),               │ │
│  │     riverOutfitters?: z.array(OutfitterSchema),               │ │
│  │   })                                                           │ │
│  │ })                                                             │ │
│  └────────────────────────────────────────────────────────────────┘ │
│  Type Generated: CollectionEntry<'adventures'>                      │
└────────────────────────┬─────────────────────────────────────────────┘
                         │ getCollection() API
                         │ Runtime: Zod validation
                         │ Compile: TypeScript inference
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        QUERY LAYER                                   │
│  src/pages/near/gauley-river.astro                                   │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ const rivers = await getCollection('adventures',               │ │
│  │   entry => entry.data.type === 'river'                        │ │
│  │ );                                                             │ │
│  │                                                                │ │
│  │ // Type: CollectionEntry<'adventures'>[]                      │ │
│  │ // IntelliSense: entry.data.riverRapids, .riverFishing, etc.  │ │
│  └────────────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────────────┘
                         │ Extract .data property
                         │ Map to RiverTemplateProps
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                    │
│  src/data/rivers/gauley.ts                                           │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ export const gauleyRiverData: RiverTemplateProps = {           │ │
│  │   name: "Gauley River",                                        │ │
│  │   rapids: [                                                    │ │
│  │     {                                                          │ │
│  │       base: "class-iv",  // ◄─ Validated by TypeScript       │ │
│  │       modifier: "plus",                                        │ │
│  │       displayName: "Class IV+",                                │ │
│  │       name: "Pure Screaming Hell",                             │ │
│  │       description: "...",                                      │ │
│  │     }                                                          │ │
│  │   ],                                                           │ │
│  │   fishing: [...],                                              │ │
│  │   outfitters: [...],                                           │ │
│  │ }                                                              │ │
│  │                                                                │ │
│  │ // IntelliSense: rapids, fishing, outfitters, accessPoints    │ │
│  └────────────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────────────┘
                         │ Props spreading
                         │ Compile-time validation
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        PAGE LAYER                                    │
│  src/pages/near/gauley-river.astro                                   │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ import { gauleyRiverData } from '../../data/rivers/gauley';    │ │
│  │ import RiverTemplate from '../../components/templates/River';  │ │
│  │                                                                │ │
│  │ <RiverTemplate {...gauleyRiverData} />                        │ │
│  │ // ▲ TypeScript validates all props match RiverTemplateProps  │ │
│  └────────────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────────────┘
                         │ Template rendering
                         │ Type-safe iteration
                         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        TEMPLATE LAYER                                │
│  src/components/templates/RiverTemplate.astro                        │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │ interface Props extends RiverTemplateProps {}                  │ │
│  │ const { rapids, fishing, outfitters } = Astro.props;           │ │
│  │                                                                │ │
│  │ {rapids.map(rapid => (                                         │ │
│  │   <div>                                                        │ │
│  │     {rapid.displayName}: {rapid.name}                          │ │
│  │     {rapid.modifier && `(${rapid.modifier})`}                  │ │
│  │   </div>                                                       │ │
│  │ ))}                                                            │ │
│  │ // ▲ IntelliSense: rapid.base, .modifier, .displayName, etc.  │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## References

### Related Documents

- **SPEC-13**: Lake Template Component System (establishes patterns)
- **SPEC-14**: River Template Component System (implementation spec)
- **PROMPT.md**: Original design requirements for RiverTemplate
- **CLAUDE.md**: SPARC methodology and project guidelines

### Related Files

- `src/types/adventure.ts` - Core type definitions
- `src/content.config.ts` - Content Collections schema
- `src/data/lakes/summersville.ts` - LakeTemplate data file pattern
- `src/components/templates/LakeTemplate.astro` - Template component pattern

### External References

- [Zod Documentation](https://zod.dev)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [AWA River Difficulty Scale](https://www.americanwhitewater.org/content/Wiki/safety:internationalscale)

---

**End of Document**

*This architecture design record establishes the complete type system for RiverTemplate, ensuring type safety, consistency with existing patterns, and extensibility for future whitewater features.*
