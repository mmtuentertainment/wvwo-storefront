# SPEC-17: Backcountry Template Data Flow Architecture

**Version:** 1.0.0
**Created:** 2025-12-31
**Status:** Active
**Author:** Data Flow Architecture Agent

---

## 1. Executive Summary

This document defines the complete data flow architecture for SPEC-17 Backcountry Template, tracing data from MDX content files through Astro Content Collections, Zod validation, and into rendered Astro components.

---

## 2. Data Flow Architecture

### 2.1 Content Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           CONTENT PIPELINE                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │  MDX File       │───▶│ Content         │───▶│ Zod Validation  │          │
│  │  (frontmatter)  │    │ Collections     │    │ (content.config)│          │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘          │
│          │                      │                       │                    │
│          ▼                      ▼                       ▼                    │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │ YAML            │    │ glob loader     │    │ adventures      │          │
│  │ frontmatter     │    │ (*.md pattern)  │    │ schema          │          │
│  │ parsed          │    │                 │    │                 │          │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘          │
│                                                         │                    │
│                                                         ▼                    │
│                                  ┌─────────────────────────────────────┐    │
│                                  │  Typed CollectionEntry<'adventures'>│    │
│                                  │  with type: 'backcountry'           │    │
│                                  └─────────────────────────────────────┘    │
│                                                         │                    │
│                                                         ▼                    │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐          │
│  │  [slug].astro   │───▶│ Props Mapping   │───▶│ BackcountryTemplate       │
│  │  (Page)         │    │ (validation)    │    │ .astro          │          │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘          │
│                                                         │                    │
│                                                         ▼                    │
│                                  ┌─────────────────────────────────────┐    │
│                                  │  Rendered HTML with                 │    │
│                                  │  helper functions for styling       │    │
│                                  └─────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Type Flow Diagram

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                              TYPE FLOW CHAIN                                   │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  adventure.ts (Shared Base)                                                   │
│  ├── DifficultySchema → Difficulty                                            │
│  ├── SeasonSchema → Season                                                    │
│  ├── CoordinatesSchema → Coordinates                                          │
│  ├── GearItemSchema → GearItem                                                │
│  ├── RelatedCategorySchema → RelatedCategory                                  │
│  ├── StatItemSchema → StatItem                                                │
│  └── NearbyAttractionSchema → NearbyAttraction                                │
│           │                                                                    │
│           ▼                                                                    │
│  backcountry-types.ts (Domain-Specific)                                       │
│  ├── imports shared types from adventure.ts                                   │
│  ├── MobilityRatingSchema → MobilityRating                                    │
│  ├── FitnessLevelSchema → FitnessLevel                                        │
│  ├── CompanionRequirementSchema → CompanionRequirement                        │
│  ├── TrailAccessibilitySchema → TrailAccessibility                            │
│  ├── ServiceAnimalPolicySchema → ServiceAnimalPolicy                          │
│  ├── MedicalConditionSchema → MedicalCondition                                │
│  ├── AgeRequirementSchema → AgeRequirement                                    │
│  └── BackcountryAccessibilitySchema → BackcountryAccessibility                │
│           │                                                                    │
│           ▼                                                                    │
│  content.config.ts (Content Collections)                                       │
│  ├── imports schemas from backcountry-types.ts                                │
│  ├── extends adventures schema with type: 'backcountry'                       │
│  └── adds backcountry-specific optional fields                                │
│           │                                                                    │
│           ▼                                                                    │
│  [slug].astro (Page Component)                                                │
│  ├── getEntry('adventures', 'dolly-sods-wilderness')                          │
│  ├── validates required fields exist                                          │
│  └── maps data to BackcountryTemplateProps                                    │
│           │                                                                    │
│           ▼                                                                    │
│  BackcountryTemplate.astro (Template Component)                               │
│  ├── interface Props extends BackcountryTemplateProps                         │
│  ├── destructures validated props                                             │
│  └── uses helper functions for styling (getMobilityRatingColor, etc.)         │
│                                                                                │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. File-Level Integration Points

### 3.1 Source Files and Dependencies

| File | Purpose | Imports From | Exports To |
|------|---------|--------------|------------|
| `adventure.ts` | Shared base types | `astro/zod` | `backcountry-types.ts`, `content.config.ts` |
| `backcountry-types.ts` | Domain types | `adventure.ts` | `content.config.ts`, `BackcountryTemplate.astro` |
| `content.config.ts` | Schema definitions | `backcountry-types.ts` | Astro Content Collections |
| `[slug].astro` | Page routing | `astro:content`, Template | N/A (renders HTML) |
| `BackcountryTemplate.astro` | UI rendering | `backcountry-types.ts`, adventure components | N/A (renders HTML) |

### 3.2 Import Chain

```typescript
// backcountry-types.ts
import { z } from 'astro/zod';
import {
  GearItemSchema,
  RelatedCategorySchema,
  CoordinatesSchema,
  StatItemSchema,
  DifficultySchema,
  SeasonSchema,
  type GearItem,
  type RelatedCategory,
  type Coordinates,
  type StatItem,
  type Difficulty,
  type Season,
} from './adventure';

// content.config.ts
import {
  BackcountryAccessibilitySchema,
  // ... other backcountry schemas
} from './types/backcountry-types';

// BackcountryTemplate.astro
import type {
  BackcountryTemplateProps,
  BackcountryAccessibility,
  MobilityRating,
  // ... other types
} from '../../types/backcountry-types';
import {
  getMobilityRatingColor,
  getMobilityRatingLabel,
  // ... other helpers
} from '../../types/backcountry-types';
```

---

## 4. Props Drilling vs Context Analysis

### 4.1 Prop Drilling (Recommended for Backcountry Template)

**Decision: Use Prop Drilling - No Context Required**

**Rationale:**
1. **Single-page templates**: BackcountryTemplate is a self-contained page component
2. **Shallow component tree**: Maximum 2-3 levels of nesting
3. **Explicit data flow**: All props visible in component signatures
4. **Matches existing patterns**: CaveTemplate, SkiTemplate, RiverTemplate all use props

**Prop Flow Pattern:**

```
[slug].astro
    │
    ├─── templateProps (mapped from CollectionEntry.data)
    │
    └──▶ BackcountryTemplate.astro
             │
             ├─── Hero Section (direct props)
             ├─── Wilderness Areas (wildernessAreas: WildernessArea[])
             ├─── Camping & Water (camping, waterSources)
             ├─── Trails (trails: BackcountryTrail[])
             │
             └──▶ Shared Components (explicit props)
                      │
                      ├─── AdventureGearChecklist (gearList: GearItem[])
                      ├─── AdventureRelatedShop (items: RelatedCategory[])
                      └─── AdventureCTA (bookingUrl, websiteUrl)
```

### 4.2 When Context Would Be Needed (Future Consideration)

Context would only be needed if:
- Interactive map components that need shared state across deeply nested children
- Real-time data updates (weather, trail conditions) shared across multiple sections
- User session state (saved favorites, trip planning)

None of these are in SPEC-17 scope.

---

## 5. Empty State Handling Flow

### 5.1 Safety-Critical Array Decision Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EMPTY STATE DECISION TREE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Is Array Safety-Critical?                                                  │
│       │                                                                     │
│       ├── YES (waterSources, emergencyContacts, weatherHazards, trails)    │
│       │       │                                                             │
│       │       ▼                                                             │
│       │   array.length === 0?                                               │
│       │       │                                                             │
│       │       ├── YES ──▶ SHOW WARNING with Kim's voice                    │
│       │       │           - Orange border-left                              │
│       │       │           - "We don't have data for this area yet..."      │
│       │       │           - Action item for user safety                     │
│       │       │                                                             │
│       │       └── NO ───▶ RENDER SECTION normally                          │
│       │                                                                     │
│       └── NO (nearbyAttractions, relatedShop, gearList)                    │
│               │                                                             │
│               ▼                                                             │
│           array.length === 0?                                               │
│               │                                                             │
│               ├── YES ──▶ HIDE SECTION (no warning)                        │
│               │                                                             │
│               └── NO ───▶ RENDER SECTION normally                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Safety-Critical Arrays (Show Warning When Empty)

| Array | Warning Message | Action Item |
|-------|-----------------|-------------|
| `waterSources` | "We don't have documented water sources for this area yet." | "Pack in all the water you'll need." |
| `emergencyContacts` | "Emergency contact info not yet documented." | "Contact local ranger district before trip." |
| `weatherHazards` | "Weather hazards not yet documented." | "Check current conditions with NOAA." |
| `trails` | "No documented trails available." | "Navigate with map and compass." |
| `wildlifeHazards` | "Wildlife hazard data unavailable." | "Assume bears and venomous snakes present." |

### 5.3 Non-Critical Arrays (Hide When Empty)

| Array | Behavior When Empty |
|-------|---------------------|
| `nearbyAttractions` | Section hidden |
| `relatedShop` | Section hidden |
| `gearList` | Section hidden (optional enhancement) |
| `wildernessAreas` | Section hidden (area may not have named zones) |
| `seasonalConditions` | Section hidden |

### 5.4 Implementation Pattern

```astro
{/* Safety-Critical Empty State Pattern */}
{waterSources.length > 0 ? (
  <section aria-labelledby="water-sources-heading">
    <h2 id="water-sources-heading">Water Sources</h2>
    {/* Render water source cards */}
  </section>
) : (
  <section class="border-l-4 border-l-brand-orange bg-brand-orange/10 p-4 rounded-sm">
    <h2 class="font-bold text-brand-brown">Water Source Data Unavailable</h2>
    <p class="font-hand text-brand-brown/80 mt-2">
      "We don't have documented water sources for this area yet.
      Before you head out, check with the Forest Service or pack in all the water you'll need.
      Better to carry extra than come up short." - Kim
    </p>
  </section>
)}

{/* Non-Critical Optional Section Pattern */}
{nearbyAttractions && nearbyAttractions.length > 0 && (
  <section aria-labelledby="nearby-heading">
    <h2 id="nearby-heading">Nearby Attractions</h2>
    {/* Render attraction cards */}
  </section>
)}
```

---

## 6. Integration Points with Existing Systems

### 6.1 Shared Components from adventure.ts

| Component | Source | Props Interface |
|-----------|--------|-----------------|
| `AdventureGearChecklist` | `adventure/AdventureGearChecklist.astro` | `{ items: GearItem[], columns?: 1\|2\|3 }` |
| `AdventureRelatedShop` | `adventure/AdventureRelatedShop.astro` | `{ items: RelatedCategory[] }` |
| `AdventureCTA` | `adventure/AdventureCTA.astro` | `{ bookingUrl?, websiteUrl?, mapUrl? }` |

### 6.2 Shared Types from adventure.ts

| Type | Usage in Backcountry |
|------|---------------------|
| `DifficultySchema` | Trail difficulty, wilderness area difficulty |
| `SeasonSchema` | Best seasons for trails, wildlife activity |
| `CoordinatesSchema` | Access point GPS, navigation primary coordinates |
| `GearItemSchema` | Gear checklist items |
| `RelatedCategorySchema` | Shop category links |
| `StatItemSchema` | Hero quick stat badges |
| `NearbyAttractionSchema` | Nearby points of interest |

### 6.3 Helper Functions

| Function | Source | Purpose |
|----------|--------|---------|
| `getMobilityRatingColor()` | `backcountry-types.ts` | Tailwind classes for mobility badge |
| `getMobilityRatingLabel()` | `backcountry-types.ts` | Human-readable mobility label |
| `getFitnessLevelLabel()` | `backcountry-types.ts` | Human-readable fitness label |
| `getFitnessLevelExample()` | `backcountry-types.ts` | Concrete fitness example |
| `getCompanionRequirementLabel()` | `backcountry-types.ts` | Companion requirement label |
| `DIFFICULTY_COLORS` | `adventure.ts` | Industry-standard trail colors |
| `DIFFICULTY_SHAPES` | `adventure.ts` | Colorblind-accessible shapes |

---

## 7. Content Authoring Flow

### 7.1 MDX File Structure

```
wv-wild-web/src/content/adventures/
├── dolly-sods-wilderness.md      ← type: 'backcountry'
├── cranberry-wilderness.md       ← type: 'backcountry'
└── monongahela-backcountry.md    ← type: 'backcountry'
```

### 7.2 Frontmatter to Props Mapping

```yaml
# MDX Frontmatter (validated by content.config.ts)
---
type: backcountry
title: Dolly Sods Wilderness
location: Monongahela National Forest
county: Tucker
# ... additional fields
---
```

```typescript
// [slug].astro mapping
const templateProps = {
  name: data.title,                    // title → name
  location: data.location,             // direct pass-through
  county: data.county,                 // direct pass-through
  navigation: data.navigation,         // complex object
  accessibility: data.accessibility,   // BackcountryAccessibility
  // ... etc
};
```

### 7.3 Validation Error Handling

```typescript
// [slug].astro - Fail-fast pattern (matches SkiTemplate)
const adventure = await getEntry('adventures', 'dolly-sods-wilderness');
if (!adventure) {
  throw new Error('Content not found in adventures collection');
}

const { data } = adventure;

// Validate required backcountry-specific fields
if (!data.navigation || !data.emergencyContacts || !data.regulations) {
  throw new Error('Missing required backcountry data (navigation, emergencyContacts, or regulations)');
}
```

---

## 8. Required Changes to content.config.ts

### 8.1 Type Enum Extension

```typescript
// Current (SPEC-15)
type: z.enum(['adventure', 'wma', 'lake', 'river', 'ski']).optional(),

// After SPEC-17
type: z.enum(['adventure', 'wma', 'lake', 'river', 'ski', 'cave', 'backcountry']).optional(),
```

### 8.2 Backcountry Schema Imports

```typescript
// Add to content.config.ts imports
import {
  BackcountryAccessibilitySchema,
  NavigationSchema,
  WaterSourceSchema,
  WeatherHazardSchema,
  WildlifeHazardSchema,
  EmergencyContactSchema,
  RegulationsSchema,
  BackcountryTrailSchema,
  WildernessAreaSchema,
  AccessPointSchema,
  RequiredSkillsSchema,
  GearCategorySchema,
  LeaveNoTracePrincipleSchema,
  SeasonalConditionsSchema,
} from './types/backcountry-types';
```

### 8.3 Schema Extension Fields

```typescript
// Add to adventures schema (zero breaking changes pattern)
// SPEC-17: Backcountry-specific optional fields
backcountryAccessibility: BackcountryAccessibilitySchema.optional(),
navigation: NavigationSchema.optional(),
waterSources: z.array(WaterSourceSchema).optional(),
weatherHazards: z.array(WeatherHazardSchema).optional(),
wildlifeHazards: z.array(WildlifeHazardSchema).optional(),
emergencyContacts: z.array(EmergencyContactSchema).optional(),
backcountryRegulations: RegulationsSchema.optional(),
backcountryTrails: z.array(BackcountryTrailSchema).optional(),
wildernessAreas: z.array(WildernessAreaSchema).optional(),
backcountryAccessPoints: z.array(AccessPointSchema).optional(),
requiredSkills: RequiredSkillsSchema.optional(),
requiredGear: z.array(GearCategorySchema).optional(),
leaveNoTrace: z.array(LeaveNoTracePrincipleSchema).optional(),
seasonalConditions: z.array(SeasonalConditionsSchema).optional(),
```

---

## 9. Type Safety Guarantees

### 9.1 Compile-Time Guarantees

1. **Zod validation at build time**: Content Collections validate all MDX frontmatter
2. **TypeScript inference**: `CollectionEntry<'adventures'>` provides full type information
3. **Props interface matching**: `interface Props extends BackcountryTemplateProps`

### 9.2 Runtime Guarantees

1. **getEntry returns typed data**: No `any` types in page components
2. **Explicit null checks**: Required field validation before template rendering
3. **Type guards**: `isBackcountryAdventure()` for filtering collections

### 9.3 Error Boundary Pattern

```typescript
// [slug].astro
try {
  const adventure = await getEntry('adventures', slug);
  if (!adventure || adventure.data.type !== 'backcountry') {
    return Astro.redirect('/404');
  }
  // ... render template
} catch (error) {
  console.error('Backcountry page error:', error);
  return Astro.redirect('/500');
}
```

---

## 10. Summary

The SPEC-17 Backcountry Template follows established patterns from SPEC-15 (Ski) and SPEC-16 (Cave):

1. **Prop drilling** is the correct approach - no React Context needed
2. **Type flow** is unidirectional: `adventure.ts` → `backcountry-types.ts` → `content.config.ts` → `[slug].astro` → `BackcountryTemplate.astro`
3. **Empty state handling** distinguishes safety-critical arrays (show warnings) from optional arrays (hide sections)
4. **Zero breaking changes** to existing content.config.ts through optional field extensions
5. **Helper functions** provide styling mappings (colors, labels, shapes) for UI consistency

This architecture ensures type safety from content authoring through to rendered HTML while maintaining the WVWO aesthetic guidelines.
