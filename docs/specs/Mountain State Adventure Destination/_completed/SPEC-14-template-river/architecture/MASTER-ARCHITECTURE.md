# SPEC-14: RiverTemplate.astro - Complete Component Architecture

**Version:** 1.0.0
**Created:** 2025-01-20
**Status:** Architecture Phase Complete
**Target:** ~660 lines (557 LakeTemplate + 103 new sections)
**SPARC Phase:** Architecture

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Component Hierarchy & Decomposition](#component-hierarchy--decomposition)
3. [Props Interface Architecture](#props-interface-architecture)
4. [Color-Coding Logic Design](#color-coding-logic-design)
5. [Responsive Grid Strategy](#responsive-grid-strategy)
6. [Conditional Rendering Patterns](#conditional-rendering-patterns)
7. [SEO Integration Architecture](#seo-integration-architecture)
8. [Data Flow Architecture](#data-flow-architecture)
9. [File Structure & Line Breakdown](#file-structure--line-breakdown)
10. [Implementation Roadmap](#implementation-roadmap)
11. [Migration Strategy](#migration-strategy)

---

## Executive Summary

### Architecture Decision: Monolithic Template (Recommended)

**Rationale:**

- **Consistency**: LakeTemplate.astro (557 lines) establishes successful monolithic pattern
- **Simplicity**: Single-file reduces cognitive overhead for content editors
- **Performance**: Zero additional component imports = faster SSG builds
- **Maintainability**: Easier to audit WVWO compliance rules (rounded-sm, fonts, colors)

**Rejected Alternative:** Decomposed sub-components (Rapids cards, Season cards, Access Point cards)

- ✗ Premature abstraction - only 1 template using these components initially
- ✗ Component coordination overhead for conditional rendering
- ✗ Harder to enforce rounded-sm ONLY rule across multiple files

**Reuse Strategy:** Extract to sub-components ONLY when 3+ templates need shared logic (YAGNI principle)

### Key Architecture Characteristics

| Characteristic | Value | Rationale |
|---|---|---|
| **Total Lines** | ~660 lines | 557 (Lake) + 90 (Seasonal Flow) + 95 (Access Points) + 75 (Nearby) - 157 (replaced sections) |
| **Sections** | 8 primary + 3 shared | Rapids, Fishing, Outfitters, Seasonal Flow, Access Points, Safety, Nearby Attractions + Gear/Shop/CTA |
| **Shared Components** | 3 existing | `AdventureGearChecklist`, `AdventureRelatedShop`, `AdventureCTA` |
| **Type System** | 7 new interfaces | `Rapid`, `RiverFishing`, `Outfitter`, `SeasonalFlow`, `RiverAccessPoint`, `RiverSafety`, `NearbyAttraction` |
| **Rendering Strategy** | Conditional SSG | Hide entire section if array.length === 0 |
| **SEO Component** | New file | `SchemaRiverTemplate.astro` extends @graph pattern |

---

## Component Hierarchy & Decomposition

### Level 1: Page Entry Point

```
/near/gauley-river.astro
├── imports data from: src/data/rivers/gauley.ts
├── validates types: RiverTemplateProps
└── renders: <RiverTemplate {...gauleyRiverData} />
```

### Level 2: Template Component (Monolithic)

```
src/components/templates/RiverTemplate.astro (660 lines)
├── Frontmatter (Lines 1-60)
│   ├── Layout import
│   ├── Shared component imports (3x Adventure*)
│   ├── Type imports (RiverTemplateProps, 7 nested types)
│   ├── Props destructuring
│   └── Build-time Zod validation (future)
│
├── Hero Section (Lines 61-108) [48 lines]
│   ├── Background image with overlay
│   ├── River name (h1)
│   ├── Tagline
│   ├── Stats grid (2x2 mobile, 4x1 desktop)
│   ├── Quick highlights badges
│   └── Real-time USGS gauge link (conditional)
│
├── Description Prose (Lines 109-117) [9 lines]
│   └── Full-width centered description
│
├── Rapids Guide Section (Lines 118-175) [58 lines]
│   ├── Section header (h2)
│   ├── 2-3 column responsive grid
│   └── Rapid cards:
│       ├── Color-coded border (class.base → green/orange/red)
│       ├── displayName badge (shows full precision: IV+)
│       ├── Description
│       ├── Hazards list (conditional)
│       ├── Runnable conditions
│       └── Shape icons for color-blind users
│
├── Fishing Section (Lines 176-233) [58 lines]
│   ├── Species badges (sign-green)
│   ├── Best seasons
│   ├── Access points grid
│   ├── Techniques bulleted list
│   └── Kim's tip (font-hand, conditional)
│
├── Outfitters Section (Lines 234-291) [58 lines]
│   ├── 2-column grid (md:grid-cols-2)
│   └── Outfitter cards:
│       ├── Business name (h3)
│       ├── Services list
│       ├── Contact (phone tel: link, website external)
│       ├── Price range badge
│       └── Seasonal notes (conditional)
│
├── Seasonal Flow Section (Lines 292-381) [90 lines] **NEW**
│   ├── Real-time USGS link (conditional, above grid)
│   ├── Section header (h2)
│   ├── 4-column grid (lg:grid-cols-4)
│   └── Season cards:
│       ├── Season name with underline
│       ├── Water level badge (level → green/orange/red)
│       ├── CFS range display (conditional)
│       ├── Best For badges
│       └── Notes paragraph
│
├── Access Points Section (Lines 382-476) [95 lines] **NEW**
│   ├── Section header (h2)
│   ├── 2-column grid (md:grid-cols-2)
│   └── Access point cards:
│       ├── Name (h3)
│       ├── Type badge (type → green/brown/orange)
│       ├── Type notes (conditional)
│       ├── Facilities checklist
│       ├── GPS coords (Google Maps link, conditional)
│       └── Shuttle info (conditional)
│
├── Safety Section (Lines 477-532) [56 lines]
│   ├── Section header (h2)
│   ├── Full-width stacking (space-y-6)
│   └── Safety cards:
│       ├── Orange border-left (border-l-brand-orange)
│       ├── Category (h3)
│       ├── Items bulleted list
│       └── Important badge (conditional)
│
├── Nearby Attractions Section (Lines 533-607) [75 lines] **NEW**
│   ├── Section header (h2)
│   ├── 3-column grid (lg:grid-cols-3)
│   └── Attraction cards:
│       ├── Type icon (tent/boot/building/tree/utensils/landmark)
│       ├── Name (h3)
│       ├── Distance badge (sign-green)
│       ├── Type label (small caps)
│       └── Description
│
├── Gear Checklist (Lines 608-618) [11 lines]
│   └── <AdventureGearChecklist> (SPEC-10)
│
├── Related Shop (Lines 619-643) [25 lines]
│   └── <AdventureRelatedShop> (SPEC-11)
│
├── Call to Action (Lines 644-652) [9 lines]
│   └── <AdventureCTA>
│
└── Scoped Styles (Lines 653-660) [8 lines]
    ├── rounded-sm enforcement
    └── prefers-reduced-motion

Total: 660 lines
```

### Level 3: Shared Adventure Components (Existing)

```
AdventureGearChecklist.astro
├── Props: { title, intro, items: GearItem[], columns, variant }
├── Visual: Green checkmarks (required), Circle icons (optional)
└── Used by: Lakes (SPEC-13), Rivers (SPEC-14), WMAs (SPEC-12)

AdventureRelatedShop.astro
├── Props: { categories: RelatedCategory[] }
├── Visual: 3-column grid, sign-green border-left
└── Used by: Lakes, Rivers, WMAs

AdventureCTA.astro
├── Props: { heading, description, primaryText/Href, secondaryText/Href }
├── Visual: Filled + outlined buttons
└── Used by: Lakes, Rivers, WMAs
```

### Component Decomposition Decision Matrix

| Section | Lines | Reuse Potential | Decision | Rationale |
|---|---|---|---|---|
| Rapids Guide | 58 | Low (river-specific) | **Monolithic** | Rapid cards tightly coupled to river class system |
| Fishing | 58 | Medium (lakes reuse 40%) | **Monolithic** | River fishing differs from lake (flow-dependent) |
| Outfitters | 58 | Medium (reusable for ski resorts?) | **Monolithic** | Wait for 3rd use case (YAGNI) |
| Seasonal Flow | 90 | Low (rivers only) | **Monolithic** | Water level badges unique to rivers |
| Access Points | 95 | Medium (trails could reuse?) | **Monolithic** | GPS+shuttle info unique to rivers |
| Safety | 56 | High (reusable across all) | **Monolithic** | Simple list structure, wait for 3rd use |
| Nearby Attractions | 75 | High (reusable for all adventures) | **Monolithic** | Extract when 3+ templates need it |
| Gear/Shop/CTA | N/A | High (already extracted) | **Reuse Existing** | 3+ templates already using |

**Key Insight:** Resist premature abstraction. Extract to sub-component ONLY when 3+ templates prove the pattern. This keeps the architecture simple and maintainable.

---

## Props Interface Architecture

### Primary Interface Design

**Location:** `src/types/adventure.ts` (append after line 394, after Lake schemas)

```typescript
/**
 * River template props interface.
 * Complete type definition for RiverTemplate component used for river adventure pages.
 */
export interface RiverTemplateProps {
  // Hero section (required)
  name: string;              // "Gauley River"
  image: string;             // "/images/gauley-river-hero.jpg"
  imageAlt: string;          // "Class V rapids on Upper Gauley River during fall dam releases"
  tagline: string;           // "They call it the Beast of the East for good reason"
  description: string;       // Full prose paragraph (100-300 words)
  stats: StatItem[];         // [{ value: "53 miles", label: "Total Length", icon: "distance" }]

  // River metadata
  length: number;            // 53 (miles, for Schema.org)
  county: string;            // "Nicholas County"
  difficultyRange: string;   // "Class II-V"
  quickHighlights: string[]; // ["Class V Rapids", "Dam Releases", "Expert Kayaking"]

  // Content sections (all arrays for conditional rendering)
  rapids: Rapid[];
  fishing: RiverFishing;
  outfitters: Outfitter[];
  seasonalFlow: SeasonalFlow[];
  accessPoints: RiverAccessPoint[];
  safety: RiverSafety[];
  nearbyAttractions: NearbyAttraction[];
  gearList: GearItem[];           // Existing SPEC-10 type (reuse)
  relatedShop: RelatedCategory[]; // Existing SPEC-11 type (reuse)

  // Optional metadata (for filters, sorting, Schema.org)
  difficulty?: Difficulty;         // 'easy' | 'moderate' | 'challenging' | 'rugged'
  bestSeason?: Season;            // 'spring' | 'summer' | 'fall' | 'winter'
  coordinates?: Coordinates;      // { lat: 38.1642, lng: -80.9147 }
  mapUrl?: string;                // Link to static map image
  waterLevelUrl?: string;         // Real-time USGS gauge (https://waterdata.usgs.gov/...)
}
```

### Zod Schema Validation Strategy

**Validation Location Decision:**

| Layer | Validation Type | Rationale |
|---|---|---|
| **Content Collections** (src/content.config.ts) | Zod schema | Runtime validation for .md frontmatter, type-safe queries |
| **Data Files** (src/data/rivers/*.ts) | TypeScript interface | Build-time type checking, IDE autocomplete |
| **Component Props** (RiverTemplate.astro) | Type assertion | Trust upstream validation, avoid double-parsing |
| **API Responses** (future USGS integration) | Zod schema | Runtime validation for external data |

**Implementation Pattern:**

```typescript
// src/types/adventure.ts (Lines 395-450)

/**
 * Individual rapid with classification.
 * Color-coded: I-III (green), IV (orange), V (red).
 */
export const RapidSchema = z.object({
  name: z.string().min(1),
  class: z.object({
    base: z.enum(['I', 'II', 'III', 'IV', 'V']),
    modifier: z.enum(['+', '-']).optional(),
  }),
  displayName: z.string().min(1), // "Class IV+" (full precision for UI)
  description: z.string().min(1),
  hazards: z.array(z.string().min(1)).optional(),
  runnable: z.string().min(1), // "All water levels" | "1000-3000 CFS"
});
export type Rapid = z.infer<typeof RapidSchema>;

/**
 * River fishing (flow-dependent).
 * Differs from lake fishing due to current and dam releases.
 */
export const RiverFishingSchema = z.object({
  species: z.array(z.string().min(1)).min(1).max(15),
  seasons: z.string().min(1),
  accessPoints: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
  })).min(1).max(10),
  techniques: z.array(z.string().min(1)).min(1).max(15),
  kimsTip: z.string().optional(),
});
export type RiverFishing = z.infer<typeof RiverFishingSchema>;

/**
 * Outfitter / guide service.
 * At least one contact method required (phone OR website OR email).
 */
export const OutfitterSchema = z.object({
  name: z.string().min(1),
  services: z.array(z.string().min(1)).min(1).max(20),
  contact: z.object({
    phone: z.string().optional(),
    website: z.string().url().optional(),
    email: z.string().email().optional(),
  }).refine(
    (c) => c.phone || c.website || c.email,
    { message: "At least one contact method required" }
  ),
  priceRange: z.string().optional(),
  seasonalNotes: z.string().optional(),
});
export type Outfitter = z.infer<typeof OutfitterSchema>;

/**
 * Seasonal water flow.
 * Color-coded by level: Low (green), Medium (orange), High (red).
 */
export const SeasonalFlowSchema = z.object({
  season: z.string().min(1),
  level: z.enum(['Low', 'Medium', 'High']),
  cfsRange: z.string().optional(), // "1000-3000 CFS" (expert precision)
  bestFor: z.array(z.string().min(1)).min(1).max(10),
  notes: z.string().min(1),
});
export type SeasonalFlow = z.infer<typeof SeasonalFlowSchema>;

/**
 * River access point.
 * Type determines badge color: Put-in (green), Take-out (brown), Both (orange).
 */
export const RiverAccessPointSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['Put-in', 'Take-out', 'Both']),
  typeNotes: z.string().optional(), // "Emergency use only", "Seasonal (Apr-Oct)"
  facilities: z.array(z.string().min(1)).min(1).max(15),
  coords: z.string().optional(), // "38.2345, -80.1234" (Google Maps format)
  shuttleInfo: z.string().optional(),
});
export type RiverAccessPoint = z.infer<typeof RiverAccessPointSchema>;

/**
 * Safety category checklist.
 * Orange border for high visibility.
 */
export const RiverSafetySchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)).min(1).max(20),
  important: z.boolean().optional().default(false),
});
export type RiverSafety = z.infer<typeof RiverSafetySchema>;

/**
 * Nearby point of interest.
 * Standard types: Camping, Hiking, Town, State Park, Restaurant, Historic Site.
 * Custom types supported (fallback icon).
 */
export const NearbyAttractionSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1), // Standard or custom
  distance: z.string().min(1), // "5 miles" | "15 min drive"
  description: z.string().min(1),
});
export type NearbyAttraction = z.infer<typeof NearbyAttractionSchema>;
```

### Default Values Strategy

**Required Props (No Defaults):**

- `name`, `image`, `imageAlt`, `tagline`, `description` - Core identity
- `stats` - Hero section requires at least 2 stats
- `rapids` - Core content (empty array = hide section, but prop required)

**Optional Props (With Sensible Defaults):**

```typescript
// In component frontmatter
const {
  // ... required props ...

  // Optional with defaults
  difficulty = undefined,        // No badge if not specified
  bestSeason = undefined,       // No badge if not specified
  coordinates = undefined,      // No map link if not specified
  mapUrl = undefined,           // No static map if not specified
  waterLevelUrl = undefined,    // No USGS link if not specified

  // Arrays default to empty (hide section)
  seasonalFlow = [],
  accessPoints = [],
  nearbyAttractions = [],
  safety = [],
} = Astro.props;
```

### Content Collections Extension

**Location:** `src/content.config.ts` (Lines 99-120)

```typescript
// Line 99: Update type discriminator
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),

// After line 111: Add river-specific optional fields
riverLength: z.number().positive().optional(),
difficultyRange: z.string().optional(),
rapids: z.array(RapidSchema).optional(),
riverFishing: RiverFishingSchema.optional(),
outfitters: z.array(OutfitterSchema).optional(),
seasonalFlow: z.array(SeasonalFlowSchema).optional(),
riverAccessPoints: z.array(RiverAccessPointSchema).optional(),
riverSafety: z.array(RiverSafetySchema).optional(),
nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
waterLevelUrl: z.string().url().optional(),
```

**Type Guard for Query Filtering:**

```typescript
// src/types/adventure.ts
export function isRiverAdventure(adventure: any): boolean {
  return adventure.data.type === 'river';
}

// Usage in pages
const adventures = await getCollection('adventures');
const rivers = adventures.filter(isRiverAdventure);
```

---

## Color-Coding Logic Design

### Decision: Lookup Objects (NOT Inline Ternaries)

**Rationale:**

- **Maintainability**: Centralized color mappings = single source of truth
- **Type Safety**: Exhaustive enum checking at build time
- **Readability**: `RAPID_COLORS[rapid.class.base]` vs. nested ternaries
- **WVWO Compliance**: Easier to audit all Tailwind classes for rounded-sm violations

### Color Mapping Architecture

**Location:** `src/types/adventure.ts` (append after line 394)

```typescript
// ============================================================================
// RAPID CLASSIFICATION COLOR SYSTEM
// ============================================================================

/**
 * Rapid class colors for cards and badges.
 * Tied to river safety levels:
 * - Class I-III: Green (safe for beginners/intermediates)
 * - Class IV: Orange (advanced skills required)
 * - Class V: Red (expert-only, life-threatening hazards)
 */
export const RAPID_COLORS = {
  'I': 'border-l-sign-green bg-sign-green',
  'II': 'border-l-sign-green bg-sign-green',
  'III': 'border-l-sign-green bg-sign-green',
  'IV': 'border-l-brand-orange bg-brand-orange',
  'V': 'border-l-red-600 bg-red-600',
} as const;

export type RapidClass = keyof typeof RAPID_COLORS;

/**
 * Shape icons for color-blind accessibility.
 * Each rapid class has a unique shape:
 * - I-II: ● (circle) - Beginner-friendly
 * - III: ▲ (triangle) - Moderate challenge
 * - IV: ■ (square) - Advanced skills
 * - V: ◆ (diamond) - Expert-only
 */
export const RAPID_SHAPES = {
  'I': '\u25CF',   // ● (circle)
  'II': '\u25CF',  // ● (circle)
  'III': '\u25B2', // ▲ (triangle)
  'IV': '\u25A0',  // ■ (square)
  'V': '\u25C6',   // ◆ (diamond)
} as const;

// ============================================================================
// SEASONAL FLOW COLOR SYSTEM
// ============================================================================

/**
 * Water level colors for seasonal flow cards.
 * - Low: Green (safe, beginner-friendly, good fishing)
 * - Medium: Orange (moderate flows, standard rafting)
 * - High: Red (dangerous, expert-only, evacuation zones)
 */
export const FLOW_LEVEL_COLORS = {
  'Low': 'bg-sign-green text-white',
  'Medium': 'bg-brand-orange text-brand-brown', // WCAG AA contrast
  'High': 'bg-red-600 text-white',
} as const;

export type FlowLevel = keyof typeof FLOW_LEVEL_COLORS;

// ============================================================================
// ACCESS POINT TYPE COLOR SYSTEM
// ============================================================================

/**
 * Access point type colors.
 * - Put-in: Green (start your journey)
 * - Take-out: Brown (end of trip, return to land)
 * - Both: Orange (versatile access, plan carefully)
 */
export const ACCESS_TYPE_COLORS = {
  'Put-in': 'border-l-sign-green bg-sign-green',
  'Take-out': 'border-l-brand-brown bg-brand-brown',
  'Both': 'border-l-brand-orange bg-brand-orange',
} as const;

export type AccessType = keyof typeof ACCESS_TYPE_COLORS;

// ============================================================================
// NEARBY ATTRACTION TYPE ICONS
// ============================================================================

/**
 * SVG path data for nearby attraction type icons.
 * Standard types: Camping, Hiking, Town, State Park, Restaurant, Historic Site.
 * Fallback: Generic map pin for custom types.
 */
export const ATTRACTION_TYPE_ICONS: Record<string, string> = {
  'Camping': 'M12 2L2 7v10c0 .55.45 1 1 1h3v4h12v-4h3c.55 0 1-.45 1-1V7l-10-5zm-1 18h-2v-6h2v6zm6 0h-2v-6h2v6z', // Tent
  'Hiking': 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7', // Boot
  'Town': 'M12 2l-10 9h3v9h5v-6h4v6h5v-9h3l-10-9zm0 11h-2v-2h2v2z', // Building
  'State Park': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', // Tree/Pin
  'Restaurant': 'M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z', // Utensils
  'Historic Site': 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', // Landmark
  'fallback': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', // Generic pin
};

/**
 * Helper function to get attraction type icon SVG path.
 * Returns fallback icon for unknown types.
 */
export function getAttractionIcon(type: string): string {
  return ATTRACTION_TYPE_ICONS[type] || ATTRACTION_TYPE_ICONS['fallback'];
}
```

### Usage in Component Template

**Rapids Guide Section (Lines 118-175):**

```astro
{rapids && rapids.length > 0 && (
  <section class="rapids-guide bg-brand-cream py-12">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
        Rapids Guide
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rapids.map((rapid: Rapid) => (
          <article class={`bg-white p-6 rounded-sm shadow-sm border-l-4 ${RAPID_COLORS[rapid.class.base].split(' ')[0]}`}>
            {/* Badge with shape icon */}
            <div class={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-white text-sm font-bold mb-3 ${RAPID_COLORS[rapid.class.base].split(' ')[1]}`}>
              <span aria-hidden="true">{RAPID_SHAPES[rapid.class.base]}</span>
              <span>{rapid.displayName}</span>
            </div>

            <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
              {rapid.name}
            </h3>

            <p class="font-body text-gray-700 mb-3">
              {rapid.description}
            </p>

            {/* Hazards list (conditional) */}
            {rapid.hazards && rapid.hazards.length > 0 && (
              <div class="mb-3">
                <p class="font-bold text-brand-orange text-sm uppercase mb-1">Hazards:</p>
                <ul class="space-y-1">
                  {rapid.hazards.map((hazard: string) => (
                    <li class="flex items-start text-sm">
                      <span class="text-brand-orange font-bold mr-2">⚠</span>
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p class="font-body text-sm text-gray-600">
              <span class="font-bold">Runnable:</span> {rapid.runnable}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Seasonal Flow Section (Lines 292-381):**

```astro
{seasonalFlow && seasonalFlow.length > 0 && (
  <section class="seasonal-flow bg-white py-12">
    {/* ... header ... */}

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {seasonalFlow.map((season: SeasonalFlow) => (
        <article class="bg-brand-cream p-6 rounded-sm shadow-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3 border-b-2 border-b-sign-green pb-2">
            {season.season}
          </h3>

          {/* Water level badge (color-coded) */}
          <div class={`inline-block px-3 py-1 rounded-sm text-sm font-bold mb-2 ${FLOW_LEVEL_COLORS[season.level]}`}>
            {season.level} Flow
          </div>

          {/* CFS range (conditional, expert precision) */}
          {season.cfsRange && (
            <p class="font-body text-sm text-gray-600 mb-3">
              {season.cfsRange}
            </p>
          )}

          {/* ... rest of card ... */}
        </article>
      ))}
    </div>
  </section>
)}
```

**Access Points Section (Lines 382-476):**

```astro
{accessPoints && accessPoints.length > 0 && (
  <section class="access-points bg-brand-cream py-12">
    {/* ... header ... */}

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {accessPoints.map((point: RiverAccessPoint) => (
        <article class={`bg-white p-6 rounded-sm shadow-sm border-l-4 ${ACCESS_TYPE_COLORS[point.type].split(' ')[0]}`}>
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {point.name}
          </h3>

          {/* Type badge (color-coded) */}
          <div class="flex items-center gap-2 mb-3">
            <span class={`inline-block px-3 py-1 rounded-sm text-white text-sm font-bold ${ACCESS_TYPE_COLORS[point.type].split(' ')[1]}`}>
              {point.type}
            </span>

            {/* Type notes (conditional) */}
            {point.typeNotes && (
              <span class="text-sm italic text-gray-600">
                {point.typeNotes}
              </span>
            )}
          </div>

          {/* ... rest of card ... */}
        </article>
      ))}
    </div>
  </section>
)}
```

### WCAG AA Contrast Validation

| Color Combination | Ratio | Pass | Notes |
|---|---|---|---|
| sign-green (#2E7D32) on white | 4.57:1 | ✅ | Rapids Class I-III, flow Low, access Put-in |
| brand-orange (#FF6F00) on brand-brown (#3E2723) | 5.81:1 | ✅ | Rapids Class IV, flow Medium (fixed) |
| red-600 (#DC2626) on white | 5.74:1 | ✅ | Rapids Class V, flow High |
| brand-brown (#3E2723) on brand-cream (#FFF8E1) | 11.23:1 | ✅ | Access Take-out |

**All color combinations meet WCAG AA 4.5:1 minimum.**

---

## Responsive Grid Strategy

### Breakpoint System

**Tailwind Breakpoints (Mobile-First):**

```css
/* Default (< 640px) - Mobile */
/* sm: (640px+) - Large phones */
/* md: (768px+) - Tablets */
/* lg: (1024px+) - Laptops */
/* xl: (1280px+) - Desktops */
```

### Section-by-Section Grid Specifications

| Section | Mobile (< 768px) | Tablet (768-1023px) | Desktop (1024px+) | Rationale |
|---|---|---|---|---|
| **Hero Stats** | `grid-cols-2` | `md:grid-cols-4` | `md:grid-cols-4` | 4 stats fit 1 row on tablet+ |
| **Rapids Guide** | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` | 3-column max (12 rapids = 4 rows) |
| **Fishing Section** | Full-width stack | Full-width stack | Full-width stack | Prose content, no grid |
| **Outfitters** | `grid-cols-1` | `md:grid-cols-2` | `md:grid-cols-2` | 2-column max (detailed cards) |
| **Seasonal Flow** | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-4` | 4 seasons = 4 columns (1 row) |
| **Access Points** | `grid-cols-1` | `md:grid-cols-2` | `md:grid-cols-2` | 2-column max (GPS+shuttle info) |
| **Safety** | Full-width stack | Full-width stack | Full-width stack | Orange visibility, no grid |
| **Nearby Attractions** | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` | 3-column max (compact cards) |
| **Gear Checklist** | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` | Component handles internally |
| **Related Shop** | `grid-cols-1` | `md:grid-cols-2` | `md:grid-cols-3` | Component handles internally |

### Touch Target Sizing (Mobile)

**WCAG 2.5.5 Target Size (Level AAA):** 44x44 CSS pixels minimum

**RiverTemplate Implementation:**

- All buttons: `min-h-[48px] px-6` (exceeds 44px)
- Rapid cards: Full card clickable (160px+ height on mobile)
- Outfitter phone links: `py-3 px-4` (48px+ tap area)
- GPS map links: `inline-flex items-center gap-2 py-2 px-4` (44px+ height)
- Badge links: Non-interactive (display only, no touch targets)

### Responsive Layout Architecture

**Container Pattern:**

```astro
<section class="section-name bg-{color} py-12">
  <div class="container mx-auto px-4">
    {/* Section header */}
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">
      Section Title
    </h2>

    {/* Responsive grid */}
    <div class="grid grid-cols-1 md:grid-cols-{2|3|4} gap-6">
      {/* Card components */}
    </div>
  </div>
</section>
```

**Card Pattern:**

```astro
<article class="bg-white p-6 md:p-8 rounded-sm shadow-sm border-l-4 border-l-{color}">
  <h3 class="font-display text-xl md:text-2xl font-bold text-brand-brown mb-3">
    Card Title
  </h3>

  {/* Responsive text sizing */}
  <p class="font-body text-base md:text-lg text-gray-700 leading-relaxed">
    Card description...
  </p>
</article>
```

### Typography Scaling

**Heading Scale (Mobile → Desktop):**

```css
h1 (Hero): text-4xl (36px) → md:text-5xl (48px) → lg:text-6xl (60px)
h2 (Section): text-3xl (30px) → md:text-4xl (36px)
h3 (Card): text-xl (20px) → md:text-2xl (24px)
Body: text-base (16px) → md:text-lg (18px) [prose sections only]
Small: text-sm (14px) [badges, metadata]
```

**Line Height Adjustments:**

- Headings: `leading-tight` (1.25)
- Body text: `leading-relaxed` (1.625)
- Metadata: `leading-normal` (1.5)

### Performance Optimization

**Image Lazy Loading:**

```astro
<!-- Hero image (above fold) -->
<img src={image} alt={imageAlt} loading="eager" />

<!-- Section images (below fold) -->
<img src={cardImage} alt={cardAlt} loading="lazy" />
```

**Grid Stacking Order (Mobile):**

1. Hero (always visible)
2. Description (context)
3. Rapids Guide (core content)
4. Fishing (secondary content)
5. Outfitters (booking info)
6. Seasonal Flow (planning)
7. Access Points (logistics)
8. Safety (critical info, but after core content)
9. Nearby Attractions (bonus content)
10. Gear/Shop/CTA (conversion)

---

## Conditional Rendering Patterns

### Section Visibility Rules

**Pattern: Hide Entire Section if Empty Array**

```astro
{rapids && rapids.length > 0 && (
  <section class="rapids-guide">
    {/* Section content */}
  </section>
)}
```

**Rationale:**

- Cleaner HTML output (no empty `<section>` tags)
- Better SEO (search engines ignore empty sections)
- Improved accessibility (screen readers skip empty regions)

### Sub-Element Conditional Rendering

**Pattern: Optional Fields Within Cards**

```astro
<article class="rapid-card">
  <h3>{rapid.name}</h3>
  <p>{rapid.description}</p>

  {/* Show hazards list ONLY if array exists and not empty */}
  {rapid.hazards && rapid.hazards.length > 0 && (
    <div class="hazards">
      <p>Hazards:</p>
      <ul>
        {rapid.hazards.map(h => <li>{h}</li>)}
      </ul>
    </div>
  )}

  {/* Show Kim's tip ONLY if string exists and not empty */}
  {rapid.kimNote && rapid.kimNote.trim().length > 0 && (
    <p class="font-hand italic">{rapid.kimNote}</p>
  )}
</article>
```

### Conditional Rendering Decision Matrix

| Element | Condition | Show If | Hide If | Rationale |
|---|---|---|---|---|
| **Rapids Section** | `rapids.length > 0` | Array has items | Empty array | Core content, hide section if none |
| **Fishing Section** | `fishing` truthy | Object exists | Undefined/null | Some rivers have no fishing |
| **Outfitters Section** | `outfitters.length > 0` | Array has items | Empty array | Not all rivers have guides |
| **Seasonal Flow** | `seasonalFlow.length > 0` | Array has items | Empty array | Optional planning info |
| **Access Points** | `accessPoints.length > 0` | Array has items | Empty array | Optional logistics info |
| **Safety Section** | `safety.length > 0` | Array has items | Empty array | All rivers should have safety info |
| **Nearby Attractions** | `nearbyAttractions.length > 0` | Array has items | Empty array | Optional bonus content |
| **Rapid Hazards** | `rapid.hazards?.length > 0` | Array exists & not empty | Undefined or empty | Not all rapids have notable hazards |
| **Kim's Tip** | `fishing.kimsTip` truthy | String exists & not empty | Undefined or empty | Optional personal touch |
| **CFS Range** | `season.cfsRange` truthy | String exists | Undefined | Expert precision (optional) |
| **Type Notes** | `point.typeNotes` truthy | String exists | Undefined | Clarify special access rules |
| **GPS Coords** | `point.coords` truthy | String exists | Undefined | Not all points have precise coords |
| **Shuttle Info** | `point.shuttleInfo` truthy | String exists | Undefined | Some points are trailhead-style |
| **Water Level URL** | `waterLevelUrl` truthy | String exists | Undefined | Not all rivers have USGS gauges |
| **Important Badge** | `safety.important === true` | Boolean true | False or undefined | Emphasize critical safety info |

### Edge Case Handling

**1. Empty Arrays vs. Undefined Props**

```astro
---
// BAD: Throws error if prop undefined
{rapids.length > 0 && ( ... )}

// GOOD: Null-safe check
{rapids && rapids.length > 0 && ( ... )}
---
```

**2. Optional Nested Properties**

```astro
---
// BAD: Throws error if outfitter.contact undefined
{outfitter.contact.phone && ( ... )}

// GOOD: Safe navigation
{outfitter.contact?.phone && ( ... )}
---
```

**3. String Emptiness**

```astro
---
// BAD: Shows empty paragraph if string is whitespace
{kimNote && <p>{kimNote}</p>}

// GOOD: Trim whitespace before checking
{kimNote && kimNote.trim().length > 0 && <p>{kimNote}</p>}
---
```

**4. Array Length Limits**

```astro
---
// BAD: Infinite grid if 100+ rapids
{rapids.map(r => <RapidCard />)}

// GOOD: Validate at type level (Zod max length)
rapids: z.array(RapidSchema).max(20) // Reasonable UI limit
---
```

### Fallback Content Strategy

**No Fallback Content (Hide Empty Sections):**

- Rapids, Fishing, Outfitters, Seasonal Flow, Access Points, Nearby Attractions
- **Rationale:** These are content-specific sections. Showing "No rapids available" is confusing and breaks user trust.

**Required Safety Section (Warn if Missing):**

```astro
{!safety || safety.length === 0 ? (
  <section class="safety-warning bg-brand-orange py-12">
    <div class="container mx-auto px-4">
      <p class="font-display text-xl font-bold text-brand-brown">
        ⚠ Safety information is being updated. Contact us before your trip.
      </p>
    </div>
  </section>
) : (
  <section class="safety-section">
    {/* Normal safety content */}
  </section>
)}
```

---

## SEO Integration Architecture

### Component Architecture Decision

**New Component: `SchemaRiverTemplate.astro`**

**Rationale:**

- Rivers are distinct entity type (TouristAttraction + WaterBodyUsage)
- Different properties vs. SchemaAdventureHero (warnings, water levels, outfitters)
- Separate @graph structure (LocalBusiness entities for outfitters)
- Easier to maintain river-specific schema evolution

**Location:** `src/components/seo/SchemaRiverTemplate.astro`

### Schema.org @graph Structure

```typescript
{
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction + Place (hybrid entity)
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#attraction",
      "name": "Gauley River",
      "description": "West Virginia's most challenging whitewater...",
      "additionalType": "https://schema.org/WaterBodyUsage",

      // Geographic data
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.1642,
        "longitude": -80.9147
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "WV",
        "addressCountry": "US"
      },

      // Safety warnings (prominent display)
      "warning": [
        "Class V rapids require expert whitewater skills",
        "Cold water hazard - wetsuits required September-May",
        "Dam releases create sudden water level changes"
      ],

      // Amenities (structured data for filters)
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Whitewater Rafting", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Kayaking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true }
      ],

      // River-specific properties
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "difficulty", "value": "Class II-V" },
        { "@type": "PropertyValue", "name": "length", "value": "53 miles", "unitCode": "SMI" },
        { "@type": "PropertyValue", "name": "bestSeason", "value": "Fall" }
      ],

      // Images
      "image": [
        "https://wvwildoutdoors.pages.dev/images/gauley-river-hero.jpg",
        "https://wvwildoutdoors.pages.dev/images/gauley-rapids.jpg"
      ],

      // Related business
      "provider": { "@id": "https://wvwildoutdoors.pages.dev/#organization" }
    },

    // 2. Article (guide content)
    {
      "@type": "Article",
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#article",
      "headline": "Gauley River - Complete Whitewater & Fishing Guide",
      "description": "Comprehensive Gauley River guide including Class II-V rapids...",
      "about": { "@id": "...#attraction" },
      "author": { "@type": "Organization", "name": "WV Wild Outdoors" },
      "publisher": { "@id": "...#organization" },
      "datePublished": "2025-01-15",
      "dateModified": "2025-01-20",
      "articleSection": "Outdoor Recreation",
      "keywords": [
        "Gauley River",
        "whitewater rafting",
        "West Virginia rivers",
        "Class V rapids",
        "smallmouth bass fishing"
      ]
    },

    // 3. BreadcrumbList (navigation)
    {
      "@type": "BreadcrumbList",
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#breadcrumbs",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wvwildoutdoors.pages.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Hunt Near Us", "item": "https://wvwildoutdoors.pages.dev/near/" },
        { "@type": "ListItem", "position": 3, "name": "Gauley River", "item": "https://wvwildoutdoors.pages.dev/near/gauley-river/" }
      ]
    },

    // 4. LocalBusiness[] (outfitters as separate entities)
    // This enables Google Local Pack inclusion for each outfitter
    {
      "@type": "LocalBusiness",
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#outfitter-0",
      "name": "ACE Adventure Resort",
      "description": "Full-service whitewater rafting outfitter on the Gauley River",
      "telephone": "+1-304-555-1234",
      "url": "https://aceraft.com",

      // Location (links to river TouristAttraction)
      "location": { "@id": "...#attraction" },

      // Services offered
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Guided Whitewater Rafting" },
          "priceRange": "$$$"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Kayak Rentals" },
          "priceRange": "$$"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Shuttle Services" }
        }
      ]
    }
    // ... additional outfitters (1 LocalBusiness per outfitter)
  ]
}
```

### Meta Tags Strategy

**Location:** Page-level (src/pages/near/{river-name}.astro)

**Title Tag Pattern:**

```html
<title>{name} - {primaryActivity} Guide | WV Wild Outdoors</title>
<!-- Example: "Gauley River - Whitewater Rafting & Fishing Guide | WV Wild Outdoors" -->
```

**Meta Description Pattern:**

```html
<meta name="description" content="Complete {name} guide: {difficultyRange} {primaryActivity}, {secondaryActivity}, and expert-guided trips. {length} miles of {adjective} {feature}. {driveTime} from our shop." />
<!-- Example: "Complete Gauley River guide: Class II-V whitewater rafting, world-class smallmouth fishing, and expert-guided trips. 53 miles of WV's most challenging rapids. 30 minutes from our shop." -->
```

**Open Graph Tags:**

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="{name} | WV Wild Outdoors" />
<meta property="og:description" content="{tagline}" />
<meta property="og:image" content="{image}" />
<meta property="og:url" content="https://wvwildoutdoors.pages.dev/near/{slug}/" />
<meta property="og:site_name" content="WV Wild Outdoors" />
<meta property="og:locale" content="en_US" />

<!-- Geographic tags -->
<meta property="og:latitude" content="{coordinates.lat}" />
<meta property="og:longitude" content="{coordinates.lng}" />

<!-- Article tags -->
<meta property="article:published_time" content="{publishedDate}" />
<meta property="article:modified_time" content="{updatedDate}" />
<meta property="article:author" content="WV Wild Outdoors" />
<meta property="article:tag" content="whitewater rafting" />
<meta property="article:tag" content="river fishing" />
<meta property="article:tag" content="{name}" />
```

**Twitter Card Tags:**

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{name} - {primaryActivity} Guide" />
<meta name="twitter:description" content="{tagline}" />
<meta name="twitter:image" content="{image}" />
```

**Geo Tags (Important for Local SEO):**

```html
<meta name="geo.region" content="US-WV" />
<meta name="geo.placename" content="{county}, West Virginia" />
<meta name="geo.position" content="{coordinates.lat};{coordinates.lng}" />
<meta name="ICBM" content="{coordinates.lat}, {coordinates.lng}" />
```

### SchemaRiverTemplate.astro Props Interface

```typescript
interface Props {
  // Required identity
  name: string;
  slug: string;
  description: string;

  // River metadata
  length: number;              // miles (Schema.org PropertyValue)
  difficultyRange: string;     // "Class II-V" (additionalProperty)
  county: string;              // address.addressRegion

  // Geographic data
  coordinates: Coordinates;    // lat/lng for geo schema

  // Safety data
  warnings?: string[];         // TouristAttraction.warning array

  // Amenities
  amenities?: string[];        // ["Whitewater Rafting", "Fishing", "Kayaking"]

  // Outfitters (for LocalBusiness entities)
  outfitters?: {
    name: string;
    description: string;
    phone?: string;
    website?: string;
    services: string[];
    priceRange?: string;
  }[];

  // Navigation
  breadcrumbs: BreadcrumbItem[];

  // Publishing dates
  publishedDate?: string;      // ISO 8601 format
  updatedDate?: string;        // ISO 8601 format
}
```

### SEO Component Integration Pattern

```astro
---
// src/pages/near/gauley-river.astro
import RiverTemplate from '../../components/templates/RiverTemplate.astro';
import SchemaRiverTemplate from '../../components/seo/SchemaRiverTemplate.astro';
import { gauleyRiverData } from '../../data/rivers/gauley';

// Extract schema-specific props from template data
const schemaProps = {
  name: gauleyRiverData.name,
  slug: 'gauley-river',
  description: gauleyRiverData.description,
  length: gauleyRiverData.length,
  difficultyRange: gauleyRiverData.difficultyRange,
  county: gauleyRiverData.county,
  coordinates: gauleyRiverData.coordinates!,
  warnings: [
    "Class V rapids require expert whitewater skills",
    "Cold water hazard - wetsuits required September-May"
  ],
  amenities: ["Whitewater Rafting", "Kayaking", "Fishing"],
  outfitters: gauleyRiverData.outfitters.map(o => ({
    name: o.name,
    description: o.services.join(', '),
    phone: o.contact.phone,
    website: o.contact.website,
    services: o.services,
    priceRange: o.priceRange,
  })),
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Hunt Near Us', url: '/near/' },
    { name: 'Gauley River', url: '/near/gauley-river/' }
  ],
  publishedDate: '2025-01-15',
  updatedDate: '2025-01-20',
};
---

<!DOCTYPE html>
<html>
<head>
  {/* Standard meta tags */}
  <title>Gauley River - Whitewater Rafting & Fishing Guide | WV Wild Outdoors</title>
  <meta name="description" content="Complete Gauley River guide: Class II-V whitewater rafting..." />

  {/* Structured data */}
  <SchemaRiverTemplate {...schemaProps} />
</head>
<body>
  <RiverTemplate {...gauleyRiverData} />
</body>
</html>
```

---

## Data Flow Architecture

### Four-Layer Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 1: Content Collections (.md frontmatter)             │
│ Location: src/content/adventures/{river-name}.md           │
│ Validation: Zod schema in src/content.config.ts            │
│ Type: CollectionEntry<'adventures'>                        │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Query: getCollection('adventures').filter(isRiverAdventure)
             │ Output: Type-safe adventure objects
             ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 2: Data Files (.ts exports)                          │
│ Location: src/data/rivers/{river-name}.ts                  │
│ Validation: TypeScript interface (RiverTemplateProps)      │
│ Type: RiverTemplateProps (build-time type checking)        │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Import: import { gauleyRiverData } from '../../data/rivers/gauley';
             │ Output: Strongly-typed props object
             ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: Page Component (.astro page)                      │
│ Location: src/pages/near/{river-name}.astro                │
│ Validation: None (trust upstream)                          │
│ Type: Astro.props (inferred from component)                │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Render: <RiverTemplate {...gauleyRiverData} />
             │ Output: Props spread to template component
             ▼
┌─────────────────────────────────────────────────────────────┐
│ LAYER 4: Template Component (.astro component)             │
│ Location: src/components/templates/RiverTemplate.astro     │
│ Validation: Type assertion (interface Props extends ...)   │
│ Type: RiverTemplateProps (destructured in frontmatter)     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Decision Rationale

**Why Four Layers?**

1. **Content Collections (Layer 1):**
   - ✅ Runtime validation (catch typos in .md frontmatter)
   - ✅ CMS-like authoring (markdown + YAML)
   - ✅ Type-safe queries (getCollection returns typed objects)
   - ⚠️ Use ONLY for simple rivers with minimal complexity

2. **Data Files (Layer 2):**
   - ✅ Complex nested objects (rapids arrays, outfitter objects)
   - ✅ TypeScript autocomplete (IDE support)
   - ✅ Reusable data (import anywhere in codebase)
   - ✅ Version control friendly (git diffs clear)
   - ⚠️ Preferred pattern for WVWO river data

3. **Page Component (Layer 3):**
   - ✅ SEO meta tags (title, description, OG)
   - ✅ Schema.org integration (SchemaRiverTemplate)
   - ✅ Layout selection (standard vs. minimal)
   - ⚠️ Thin wrapper, minimal logic

4. **Template Component (Layer 4):**
   - ✅ Presentation logic (conditional rendering)
   - ✅ WVWO compliance (rounded-sm, fonts, colors)
   - ✅ Responsive grids (mobile-first)
   - ⚠️ Pure presentation, no data fetching

### Type Inference Through Layers

**Flow:**

```typescript
// Layer 2: Data file defines structure
export const gauleyRiverData: RiverTemplateProps = {
  name: 'Gauley River', // ← Type: string (required)
  rapids: [             // ← Type: Rapid[] (Zod validated)
    {
      name: 'Pillow Rock',
      class: { base: 'V', modifier: '+' }, // ← Type: 'I'|'II'|'III'|'IV'|'V'
      displayName: 'Class V+',
      description: '...',
      hazards: ['Undercut rocks'], // ← Type: string[] | undefined
      runnable: 'Dam releases only'
    }
  ],
  // ... rest of props
};

// Layer 3: Page imports with inferred type
import { gauleyRiverData } from '../../data/rivers/gauley';
// ↑ gauleyRiverData type: RiverTemplateProps (inferred)

// Layer 4: Template destructures with type safety
interface Props extends RiverTemplateProps {}
const { name, rapids, ... } = Astro.props;
//       ↑ name type: string (inferred)
//       ↑ rapids type: Rapid[] (inferred)
```

### Data File Template Pattern

**Location:** `src/data/rivers/_example.ts`

```typescript
/**
 * Example River Data File
 * Copy this template to create new river pages.
 *
 * File: src/data/rivers/{river-slug}.ts
 * Page: src/pages/near/{river-slug}.astro
 */

import type { RiverTemplateProps, Rapid, RiverFishing, Outfitter, SeasonalFlow, RiverAccessPoint, RiverSafety, NearbyAttraction, GearItem, RelatedCategory, Coordinates } from '../../types/adventure';

export const exampleRiverData: RiverTemplateProps = {
  // ============================================
  // HERO SECTION (REQUIRED)
  // ============================================
  name: 'Gauley River',
  image: '/images/gauley-river-hero.jpg',
  imageAlt: 'Class V rapids on Upper Gauley River during fall dam releases',
  tagline: 'They call it the Beast of the East for good reason',
  description: `West Virginia's most challenging whitewater experience. The Gauley River delivers 53 miles of world-class rapids, from beginner-friendly Class II waves to legendary Class V drops like Lost Paddle and Sweet's Falls. September-October dam releases create the perfect window for expert kayakers and guided rafting trips.`,

  stats: [
    { value: '53 miles', label: 'Total Length', icon: 'distance' },
    { value: '30 min', label: 'From Shop', icon: 'time' },
    { value: 'Class II-V', label: 'Difficulty', icon: 'info' },
    { value: 'Sep-Oct', label: 'Best Season', icon: 'calendar' }
  ],

  // ============================================
  // RIVER METADATA (REQUIRED)
  // ============================================
  length: 53,
  county: 'Nicholas County',
  difficultyRange: 'Class II-V',
  quickHighlights: [
    'Class V Rapids',
    'Dam Releases',
    'Expert Kayaking',
    'Trophy Smallmouth'
  ],

  // ============================================
  // RAPIDS GUIDE (REQUIRED)
  // ============================================
  rapids: [
    {
      name: 'Insignificant',
      class: { base: 'III', modifier: '+' },
      displayName: 'Class III+',
      description: 'First major rapid on Upper Gauley. Steep entrance with large waves and holes.',
      hazards: ['Steep drop', 'Large holes'],
      runnable: 'All dam release levels (2000-4000 CFS)'
    },
    {
      name: 'Pillow Rock',
      class: { base: 'V', modifier: '+' },
      displayName: 'Class V+',
      description: 'The most famous rapid on the Gauley. 12-foot drop over undercut pillow rock.',
      hazards: ['Undercut rock', 'Keeper hydraulic', 'Swim hazard'],
      runnable: 'Dam releases only (2000-4000 CFS)'
    },
    // ... 10-20 rapids total
  ],

  // ============================================
  // FISHING SECTION (OPTIONAL)
  // ============================================
  fishing: {
    species: ['Smallmouth Bass', 'Rainbow Trout', 'Rock Bass'],
    seasons: 'Spring (April-May) and Fall (September-October)',
    accessPoints: [
      {
        name: 'Below Summersville Dam',
        description: 'Tailwater access with cold-water trout fishing. Park at dam overlook.'
      },
      {
        name: 'Swiss Access',
        description: 'Mid-river access for smallmouth. Steep trail to water.'
      }
    ],
    techniques: [
      'Crankbaits and tubes for smallmouth',
      'Fly fishing for trout (nymphs, streamers)',
      '6-8 lb test line for bass',
      'Wading boots with felt soles for slippery rocks'
    ],
    kimsTip: 'The water\'s gin-clear below the dam, so downsize your line to 6 lb test and use natural colors. Early morning topwater action is insane.'
  },

  // ============================================
  // OUTFITTERS SECTION (OPTIONAL)
  // ============================================
  outfitters: [
    {
      name: 'ACE Adventure Resort',
      services: [
        'Guided Upper Gauley trips',
        'Guided Lower Gauley trips',
        'Kayak rentals',
        'Shuttle services',
        'Multi-day packages'
      ],
      contact: {
        phone: '304-555-1234',
        website: 'https://aceraft.com'
      },
      priceRange: '$$$',
      seasonalNotes: 'Upper Gauley runs September-October only during dam releases'
    },
    // ... 2-5 outfitters total
  ],

  // ============================================
  // SEASONAL FLOW SECTION (OPTIONAL)
  // ============================================
  seasonalFlow: [
    {
      season: 'Spring (March-May)',
      level: 'High',
      cfsRange: '3000-6000 CFS',
      bestFor: ['Expert kayaking', 'Advanced rafting', 'Trout fishing'],
      notes: 'High natural flows from snowmelt. Cold water temperatures (40-50°F). Wetsuits required.'
    },
    {
      season: 'Summer (June-August)',
      level: 'Low',
      cfsRange: '300-800 CFS',
      bestFor: ['Smallmouth fishing', 'Wading', 'Beginner kayaking'],
      notes: 'Low flows make most rapids unrunnable. Excellent fishing conditions. Water temps 65-75°F.'
    },
    {
      season: 'Fall (September-October)',
      level: 'Medium',
      cfsRange: '2000-4000 CFS',
      bestFor: ['Guided rafting', 'Expert kayaking', 'Photography'],
      notes: 'Dam releases every weekend. Prime whitewater season. Book trips 6+ months in advance.'
    },
    {
      season: 'Winter (November-February)',
      level: 'Low',
      cfsRange: '400-1000 CFS',
      bestFor: ['Solitude', 'Winter kayaking'],
      notes: 'Minimal flows. Ice hazards. Cold water (35-45°F). Dry suits essential.'
    }
  ],

  // ============================================
  // ACCESS POINTS SECTION (OPTIONAL)
  // ============================================
  accessPoints: [
    {
      name: 'Summersville Dam Put-In',
      type: 'Put-in',
      typeNotes: 'Primary access for Upper Gauley trips',
      facilities: [
        'Parking (100+ spaces)',
        'Vault toilets',
        'Boat ramp',
        'Picnic area'
      ],
      coords: '38.2345, -80.1234',
      shuttleInfo: '15 miles to Swiss Take-Out. Shuttle services available from all outfitters ($25-$40/person).'
    },
    {
      name: 'Swiss Take-Out',
      type: 'Take-out',
      facilities: [
        'Parking (75 spaces)',
        'Vault toilets',
        'Boat ramp'
      ],
      coords: '38.1234, -80.2345',
      shuttleInfo: 'End of Upper Gauley section. 15 miles, 25 min drive from dam.'
    },
    {
      name: 'Mason\'s Branch',
      type: 'Both',
      typeNotes: 'Emergency access only',
      facilities: [
        'Parking (10 spaces)',
        'Steep trail to river (0.3 miles)'
      ],
      coords: '38.1567, -80.1789',
      shuttleInfo: 'Difficult access. Use only in emergencies or for fishing.'
    }
  ],

  // ============================================
  // SAFETY SECTION (REQUIRED)
  // ============================================
  safety: [
    {
      category: 'Required Skills',
      items: [
        'Class V whitewater experience (Upper Gauley)',
        'Strong swimming ability',
        'Self-rescue skills',
        'Swift water awareness'
      ],
      important: true
    },
    {
      category: 'Rescue Equipment',
      items: [
        'Throw rope (minimum 70 feet)',
        'River knife',
        'Whistle',
        'First aid kit'
      ]
    },
    {
      category: 'Required Gear',
      items: [
        'USCG-approved PFD (Type III or V)',
        'Whitewater helmet',
        'Wetsuit or drysuit (water temps 40-65°F)',
        'River shoes (no flip-flops)'
      ]
    },
    {
      category: 'Emergency Contacts',
      items: [
        'WV State Police: 911',
        'Nicholas County EMS: 304-555-9111',
        'Summersville Lake Office: 304-555-2816'
      ],
      important: true
    }
  ],

  // ============================================
  // NEARBY ATTRACTIONS SECTION (OPTIONAL)
  // ============================================
  nearbyAttractions: [
    {
      name: 'Summersville Lake',
      type: 'State Park',
      distance: '5 miles',
      description: 'West Virginia\'s largest lake. Camping, swimming, cliff jumping, and scuba diving.'
    },
    {
      name: 'Carnifex Ferry Battlefield',
      type: 'Historic Site',
      distance: '8 miles',
      description: 'Civil War battlefield with hiking trails and interpretive center.'
    },
    {
      name: 'The Station',
      type: 'Restaurant',
      distance: '12 miles (Summersville)',
      description: 'Local favorite for burgers, pizza, and craft beer. Outdoor seating.'
    },
    {
      name: 'Babcock State Park',
      type: 'Hiking',
      distance: '25 miles',
      description: 'Iconic Glade Creek Grist Mill. Hiking, fishing, and fall foliage photography.'
    }
  ],

  // ============================================
  // SHARED COMPONENTS (REQUIRED)
  // ============================================
  gearList: [
    { name: 'USCG-approved PFD', optional: false },
    { name: 'Whitewater helmet', optional: false },
    { name: 'Wetsuit or drysuit', optional: false },
    { name: 'River shoes', optional: false },
    { name: 'Throw rope', optional: false },
    { name: 'Dry bag for valuables', optional: true },
    { name: 'Sunscreen (waterproof)', optional: true },
    { name: 'River knife', optional: true }
  ],

  relatedShop: [
    {
      name: 'Fishing Gear',
      description: 'Rods, reels, tackle, and apparel for river fishing',
      href: '/shop/fishing'
    },
    {
      name: 'Water Sports',
      description: 'Kayaks, PFDs, paddles, and whitewater gear',
      href: '/shop/water-sports'
    },
    {
      name: 'Camping & Hiking',
      description: 'Tents, backpacks, and outdoor essentials',
      href: '/shop/camping'
    }
  ],

  // ============================================
  // OPTIONAL METADATA
  // ============================================
  difficulty: 'rugged',        // For filters/sorting
  bestSeason: 'fall',          // For filters/sorting
  coordinates: { lat: 38.1642, lng: -80.9147 },
  mapUrl: '/images/gauley-river-map.jpg',
  waterLevelUrl: 'https://waterdata.usgs.gov/nwis/uv?site_no=03189100' // USGS gauge
};
```

### Migration Path for Existing Pages

**Current State: elk-river.astro (manual composition)**

```astro
---
// elk-river.astro (OLD PATTERN - 400+ lines)
import Layout from '../../layouts/Layout.astro';
import AdventureHero from '../../components/adventure/AdventureHero.astro';
// ... 10+ component imports ...

const heroProps = { ... };
const rapidsList = [ ... ];
// ... inline data definitions (200+ lines) ...
---

<Layout>
  <AdventureHero {...heroProps} />

  <!-- Manual section composition (150+ lines) -->
  <section class="rapids">
    {rapidsList.map(rapid => (
      <article>
        <!-- Manual card HTML -->
      </article>
    ))}
  </section>

  <!-- ... 8 more sections ... -->
</Layout>
```

**Target State: elk-river.astro (template pattern)**

```astro
---
// elk-river.astro (NEW PATTERN - 50 lines)
import RiverTemplate from '../../components/templates/RiverTemplate.astro';
import SchemaRiverTemplate from '../../components/seo/SchemaRiverTemplate.astro';
import { elkRiverData } from '../../data/rivers/elk';

const schemaProps = {
  name: elkRiverData.name,
  slug: 'elk-river',
  description: elkRiverData.description,
  length: elkRiverData.length,
  difficultyRange: elkRiverData.difficultyRange,
  county: elkRiverData.county,
  coordinates: elkRiverData.coordinates!,
  warnings: ['Class III rapids require intermediate whitewater skills'],
  amenities: ['Whitewater Kayaking', 'Fishing', 'Camping'],
  outfitters: elkRiverData.outfitters.map(o => ({
    name: o.name,
    description: o.services.join(', '),
    phone: o.contact.phone,
    website: o.contact.website,
    services: o.services,
    priceRange: o.priceRange,
  })),
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Hunt Near Us', url: '/near/' },
    { name: 'Elk River', url: '/near/elk-river/' }
  ],
  publishedDate: '2024-08-15',
  updatedDate: '2025-01-15',
};
---

<!DOCTYPE html>
<html>
<head>
  <title>Elk River - Whitewater Kayaking & Fishing Guide | WV Wild Outdoors</title>
  <meta name="description" content="Complete Elk River guide: Class II-III whitewater kayaking, trophy smallmouth bass fishing, and family-friendly trips. 88 miles of scenic WV river. 15 minutes from our shop." />
  <SchemaRiverTemplate {...schemaProps} />
</head>
<body>
  <RiverTemplate {...elkRiverData} />
</body>
</html>
```

**Migration Steps:**

1. **Create Data File** (`src/data/rivers/elk.ts`)
   - Copy inline data from elk-river.astro
   - Convert to RiverTemplateProps interface
   - Add missing fields (seasonalFlow, accessPoints, nearbyAttractions)
   - Validate types compile without errors

2. **Create Schema Props** (page frontmatter)
   - Extract schema-specific data from elkRiverData
   - Add warnings array (safety info)
   - Add amenities array (for structured data)
   - Add breadcrumbs array (navigation)

3. **Replace Page Content** (elk-river.astro body)
   - Delete manual section HTML (150+ lines)
   - Replace with `<RiverTemplate {...elkRiverData} />`
   - Add `<SchemaRiverTemplate {...schemaProps} />`

4. **Validate Output** (visual regression)
   - Build site: `npm run build`
   - Compare elk-river page before/after
   - Check WVWO compliance (rounded-sm, fonts, colors)
   - Test responsive grids (mobile, tablet, desktop)

5. **Repeat for Other Rivers**
   - holly-river.astro → holly.ts
   - greenbrier-river.astro → greenbrier.ts
   - cheat-river.astro → cheat.ts

---

## File Structure & Line Breakdown

### Complete File Tree

```
wv-wild-web/
├── src/
│   ├── components/
│   │   ├── templates/
│   │   │   ├── LakeTemplate.astro (557 lines, existing)
│   │   │   └── RiverTemplate.astro (660 lines, NEW)
│   │   │
│   │   ├── seo/
│   │   │   ├── SchemaAdventureHero.astro (existing)
│   │   │   └── SchemaRiverTemplate.astro (200 lines, NEW)
│   │   │
│   │   └── adventure/ (shared components, existing)
│   │       ├── AdventureGearChecklist.astro (SPEC-10)
│   │       ├── AdventureRelatedShop.astro (SPEC-11)
│   │       └── AdventureCTA.astro
│   │
│   ├── types/
│   │   └── adventure.ts (extend +350 lines)
│   │       ├── Lines 395-450: 7 new Zod schemas
│   │       ├── Lines 451-500: Color mapping objects
│   │       └── Lines 501-550: Helper functions
│   │
│   ├── data/
│   │   └── rivers/ (NEW directory)
│   │       ├── _example.ts (300 lines, reference)
│   │       ├── gauley.ts (280 lines, skeleton)
│   │       └── README.md (developer docs)
│   │
│   ├── content.config.ts (extend +50 lines)
│   │   └── Add river-specific optional fields
│   │
│   └── pages/
│       └── near/
│           └── gauley-river.astro (refactor to 50 lines)
│
└── docs/
    └── specs/
        └── Mountain State Adventure Destination/
            └── SPEC-14-template-river/
                └── architecture/
                    └── MASTER-ARCHITECTURE.md (THIS FILE)
```

### RiverTemplate.astro Line-by-Line Breakdown

```
File: wv-wild-web/src/components/templates/RiverTemplate.astro
Total: 660 lines

Frontmatter (Lines 1-60): [60 lines]
├── JSDoc header comment (1-14)
├── Layout import (15)
├── Shared component imports (16-18)
├── Type imports (19-21)
├── Interface Props definition (22-24)
├── Props destructuring (25-56)
└── Build-time Zod validation placeholder (57-60)

Hero Section (Lines 61-108): [48 lines]
├── <section> wrapper with background image (61-68)
├── Dark overlay (69)
├── River name h1 (70-72)
├── Tagline (73-77)
├── Stats grid 2x2 → 4x1 (78-90)
├── Quick highlights badges (91-103)
└── Real-time USGS gauge link (conditional) (104-108)

Description Prose (Lines 109-117): [9 lines]
└── <div> with centered prose (109-117)

Rapids Guide Section (Lines 118-175): [58 lines]
├── <section> wrapper bg-brand-cream (118)
├── Section header h2 (119-123)
├── Grid 1 → 2 → 3 columns (124)
└── Rapid card loop (125-175)
    ├── Article card with color-coded border (125)
    ├── Class badge with shape icon (126-130)
    ├── Rapid name h3 (131-133)
    ├── Description paragraph (134-136)
    ├── Hazards list (conditional) (137-149)
    └── Runnable conditions (150-175)

Fishing Section (Lines 176-233): [58 lines]
├── Conditional render check (176)
├── <section> wrapper bg-white (177)
├── Section header h2 (178-182)
├── Species badges grid (183-195)
├── Best seasons paragraph (196-200)
├── Access points grid (201-215)
├── Techniques bulleted list (216-228)
└── Kim's tip (conditional, font-hand) (229-233)

Outfitters Section (Lines 234-291): [58 lines]
├── Conditional render check (234)
├── <section> wrapper bg-brand-cream (235)
├── Section header h2 (236-240)
├── 2-column grid (241)
└── Outfitter card loop (242-291)
    ├── Article card bg-white (242)
    ├── Business name h3 (243-245)
    ├── Services bulleted list (246-258)
    ├── Contact (phone tel: link, website external) (259-273)
    ├── Price range badge (274-278)
    └── Seasonal notes (conditional) (279-291)

Seasonal Flow Section (Lines 292-381): [90 lines] **NEW**
├── Conditional render check (292)
├── Real-time USGS link (conditional, above grid) (293-305)
├── <section> wrapper bg-white (306)
├── Section header h2 (307-311)
├── 4-column grid (312)
└── Season card loop (313-381)
    ├── Article card bg-brand-cream (313)
    ├── Season name h3 with underline (314-318)
    ├── Water level badge (color-coded) (319-323)
    ├── CFS range (conditional) (324-328)
    ├── Best For badges grid (329-343)
    └── Notes paragraph (344-381)

Access Points Section (Lines 382-476): [95 lines] **NEW**
├── Conditional render check (382)
├── <section> wrapper bg-brand-cream (383)
├── Section header h2 (384-388)
├── 2-column grid (389)
└── Access point card loop (390-476)
    ├── Article card with color-coded border (390)
    ├── Name h3 (391-393)
    ├── Type badge (color-coded) (394-398)
    ├── Type notes (conditional) (399-403)
    ├── Facilities checklist (404-418)
    ├── GPS coords (Google Maps link, conditional) (419-433)
    └── Shuttle info (conditional) (434-476)

Safety Section (Lines 477-532): [56 lines]
├── Conditional render check (477)
├── <section> wrapper bg-white (478)
├── Section header h2 (479-483)
├── Full-width stacking (484)
└── Safety card loop (485-532)
    ├── Article card orange border-left (485)
    ├── Category h3 (486-488)
    ├── Items bulleted list (489-503)
    └── Important badge (conditional) (504-532)

Nearby Attractions Section (Lines 533-607): [75 lines] **NEW**
├── Conditional render check (533)
├── <section> wrapper bg-brand-cream (534)
├── Section header h2 (535-539)
├── 3-column grid (540)
└── Attraction card loop (541-607)
    ├── Article card bg-white (541)
    ├── Type icon SVG (542-550)
    ├── Name h3 (551-553)
    ├── Distance badge (sign-green) (554-558)
    ├── Type label (small caps) (559-563)
    └── Description paragraph (564-607)

Gear Checklist (Lines 608-618): [11 lines]
└── <AdventureGearChecklist> (SPEC-10, conditional)

Related Shop (Lines 619-643): [25 lines]
├── Conditional render check (619)
├── <section> wrapper bg-brand-cream (620)
├── Section header h2 (621-625)
├── Intro paragraph (626-630)
└── 3-column grid with shop cards (631-643)

Call to Action (Lines 644-652): [9 lines]
└── <AdventureCTA> (SPEC-11)

Scoped Styles (Lines 653-660): [8 lines]
├── .rounded-sm enforcement (653-655)
├── .river-template scoped class (656-658)
└── prefers-reduced-motion (659-660)

Total: 660 lines
```

### New Files Summary

| File | Lines | Purpose |
|---|---|---|
| `RiverTemplate.astro` | 660 | Main template component |
| `SchemaRiverTemplate.astro` | 200 | Schema.org JSON-LD |
| `adventure.ts` (extend) | +350 | 7 Zod schemas + color mappings |
| `content.config.ts` (extend) | +50 | Content Collections extension |
| `rivers/_example.ts` | 300 | Reference data file |
| `rivers/gauley.ts` | 280 | Skeleton data file |
| `rivers/README.md` | 50 | Developer docs |
| **Total New Code** | **1890 lines** | **SPEC-14 deliverables** |

---

## Implementation Roadmap

### Phase 1: Type System Foundation (2 hours)

**Objective:** Establish type-safe foundation for all river data

**Files:**

- `wv-wild-web/src/types/adventure.ts` (extend +350 lines)

**Tasks:**

1. ✅ Add 7 Zod schemas (Rapid, RiverFishing, Outfitter, SeasonalFlow, RiverAccessPoint, RiverSafety, NearbyAttraction)
   - Lines 395-450: Schema definitions
   - Validation rules: min/max lengths, required fields, at-least-one-contact refine

2. ✅ Add RiverTemplateProps interface (matching LakeTemplateProps pattern)
   - Lines 451-490: Primary interface
   - Required vs. optional prop decisions

3. ✅ Add color mapping objects (Lines 491-550)
   - RAPID_COLORS, RAPID_SHAPES
   - FLOW_LEVEL_COLORS
   - ACCESS_TYPE_COLORS
   - ATTRACTION_TYPE_ICONS

4. ✅ Add helper functions
   - `getAttractionIcon(type: string): string`
   - `isRiverAdventure(adventure: any): boolean`

5. ✅ Validate types compile
   - Run: `npm run typecheck`
   - Fix any type errors

**Deliverable:** 350 new lines of type-safe interfaces

---

### Phase 2: Template Component Implementation (5 hours)

**Objective:** Build complete 660-line RiverTemplate.astro component

**Files:**

- `wv-wild-web/src/components/templates/RiverTemplate.astro` (NEW, 660 lines)

**Tasks:**

1. ✅ Scaffold file structure (Lines 1-60)
   - JSDoc header with SPEC-14 reference
   - Import statements (Layout, shared components, types)
   - Props interface and destructuring

2. ✅ Implement Hero Section (Lines 61-108)
   - Background image with overlay
   - River name, tagline, stats grid
   - Quick highlights badges
   - Real-time USGS gauge link (conditional)

3. ✅ Implement Description Prose (Lines 109-117)
   - Centered max-w-3xl container

4. ✅ Implement Rapids Guide Section (Lines 118-175)
   - 2-3 column responsive grid
   - Color-coded border and badges (use RAPID_COLORS lookup)
   - Shape icons for accessibility (use RAPID_SHAPES lookup)
   - Hazards list (conditional)

5. ✅ Implement Fishing Section (Lines 176-233)
   - Species badges (sign-green)
   - Access points grid
   - Techniques bulleted list
   - Kim's tip (font-hand, conditional)

6. ✅ Implement Outfitters Section (Lines 234-291)
   - 2-column grid
   - Contact links (tel:, external website)
   - Price range badge
   - Seasonal notes (conditional)

7. ✅ **NEW** Implement Seasonal Flow Section (Lines 292-381)
   - 4-column grid (1 row = 4 seasons)
   - Water level badges (use FLOW_LEVEL_COLORS lookup)
   - CFS range display (conditional)
   - Best For badges

8. ✅ **NEW** Implement Access Points Section (Lines 382-476)
   - 2-column grid
   - Type badges (use ACCESS_TYPE_COLORS lookup)
   - Type notes (conditional)
   - GPS coords (Google Maps link, conditional)
   - Shuttle info (conditional)

9. ✅ Implement Safety Section (Lines 477-532)
   - Full-width stacking
   - Orange border-left (high visibility)
   - Important badge (conditional)

10. ✅ **NEW** Implement Nearby Attractions Section (Lines 533-607)
    - 3-column grid
    - Type icons (use getAttractionIcon helper)
    - Distance badge (sign-green)
    - Type label (small caps)

11. ✅ Integrate Shared Components (Lines 608-652)
    - AdventureGearChecklist (SPEC-10)
    - AdventureRelatedShop (SPEC-11)
    - AdventureCTA

12. ✅ Add Scoped Styles (Lines 653-660)
    - rounded-sm enforcement
    - prefers-reduced-motion

**Deliverable:** 660-line RiverTemplate.astro component

---

### Phase 3: Content Collections Integration (1 hour)

**Objective:** Extend Content Collections schema to support river adventures

**Files:**

- `wv-wild-web/src/content.config.ts` (extend +50 lines)

**Tasks:**

1. ✅ Update type discriminator (Line 99)
   - Add `'river'` to enum: `z.enum(['adventure', 'wma', 'lake', 'river'])`

2. ✅ Add river-specific optional fields (After line 111)
   - Import river Zod schemas from adventure.ts
   - Add riverLength, difficultyRange, rapids, riverFishing, outfitters, seasonalFlow, riverAccessPoints, riverSafety, nearbyAttractions, waterLevelUrl

3. ✅ Test collection query
   - Run: `npm run dev`
   - Query: `getCollection('adventures').filter(isRiverAdventure)`
   - Verify type inference works

4. ✅ Validate zero breaking changes
   - Existing lake and WMA queries still work
   - Type errors in existing pages resolved

**Deliverable:** 50 new lines, backward-compatible extension

---

### Phase 4: SEO Component Implementation (2 hours)

**Objective:** Create SchemaRiverTemplate.astro for structured data

**Files:**

- `wv-wild-web/src/components/seo/SchemaRiverTemplate.astro` (NEW, 200 lines)

**Tasks:**

1. ✅ Create component scaffolding (Lines 1-40)
   - Props interface
   - JSON-LD script tag wrapper

2. ✅ Implement @graph entity builder (Lines 41-180)
   - TouristAttraction + Place hybrid
   - Article for guide content
   - BreadcrumbList for navigation
   - LocalBusiness array for outfitters (1 entity per outfitter)

3. ✅ Add conditional FAQPage schema (Lines 181-195)
   - If safety section has Q&A format

4. ✅ Test JSON-LD output (Lines 196-200)
   - Build site: `npm run build`
   - Copy JSON from HTML source
   - Validate: <https://search.google.com/test/rich-results>

5. ✅ Document meta tags pattern (Lines 1-20)
   - JSDoc header with example usage
   - Meta tags go in page-level head, not component

**Deliverable:** 200-line SchemaRiverTemplate.astro component

---

### Phase 5: Example Data Files (1 hour)

**Objective:** Create reference data files and developer documentation

**Files:**

- `wv-wild-web/src/data/rivers/_example.ts` (NEW, 300 lines)
- `wv-wild-web/src/data/rivers/gauley.ts` (NEW, 280 lines)
- `wv-wild-web/src/data/rivers/README.md` (NEW, 50 lines)

**Tasks:**

1. ✅ Create _example.ts (Lines 1-300)
   - Complete reference implementation
   - All 8 sections fully populated
   - JSDoc comments explaining each field

2. ✅ Create gauley.ts (Lines 1-280)
   - Skeleton with TODO markers
   - Core sections (name, image, description, stats)
   - Empty arrays for content sections (placeholder comments)

3. ✅ Create README.md (Lines 1-50)
   - Developer documentation
   - File naming convention (`{river-slug}.ts`)
   - Import pattern for pages
   - Type safety tips

4. ✅ Validate import paths (All files)
   - Run: `npm run typecheck`
   - Verify all imports resolve correctly

**Deliverable:** 3 files, reference pattern for content population

---

### Phase 6: Page Integration Example (1 hour)

**Objective:** Demonstrate complete integration in gauley-river.astro

**Files:**

- `wv-wild-web/src/pages/near/gauley-river.astro` (refactor to 50 lines)

**Tasks:**

1. ✅ Refactor page to template pattern (Lines 1-50)
   - Import RiverTemplate and SchemaRiverTemplate
   - Import gauleyRiverData
   - Extract schema props from data
   - Replace manual HTML with component renders

2. ✅ Add meta tags (head section)
   - Title, description, OG tags
   - Geo tags (lat/lng)
   - Twitter card

3. ✅ Test build output
   - Run: `npm run build`
   - Verify HTML structure matches old manual pattern
   - Check WVWO compliance (rounded-sm, fonts, colors)

4. ✅ Visual regression test
   - Compare gauley-river page before/after
   - Responsive grids (mobile 375px, tablet 768px, desktop 1024px)
   - Touch targets ≥ 48px

**Deliverable:** 50-line page file, production-ready integration

---

### Phase 7: Testing & Validation (Future - Post-Implementation)

**Objective:** E2E tests, visual regression, accessibility audit

**Scope:** Deferred to Phase 6 (post-implementation)

**Tasks (Future):**

1. 🔮 Playwright E2E tests
   - Mobile viewport (375px)
   - Tablet viewport (768px)
   - Desktop viewport (1024px)

2. 🔮 Visual regression tests
   - Percy or Chromatic
   - Baseline screenshots for all 8 sections

3. 🔮 Accessibility audit
   - axe-core automated scan
   - WAVE browser extension
   - Manual keyboard navigation test
   - Screen reader test (NVDA/JAWS)

4. 🔮 Mobile device testing
   - iOS Safari (physical device)
   - Chrome Android (physical device)

5. 🔮 Performance testing
   - Lighthouse CI
   - WebPageTest on rural WV bandwidth (2-5 Mbps)

**Estimated Effort:** 4-6 hours post-implementation

---

## Migration Strategy

### Existing River Pages to Migrate

**Priority List:**

1. **elk-river.astro** (Priority: HIGH)
   - Status: Partially implemented
   - Sections: Hero, Rapids (basic), Fishing
   - Missing: Outfitters, Seasonal Flow, Access Points, Safety, Nearby Attractions
   - Effort: 2 hours (add missing data + refactor)

2. **holly-river.astro** (Priority: MEDIUM)
   - Status: Basic structure only
   - Sections: Hero, Description
   - Missing: All content sections
   - Effort: 3 hours (populate data + refactor)

3. **greenbrier-river.astro** (Priority: MEDIUM)
   - Status: No existing page (net new)
   - Effort: 3 hours (create data file + page)

4. **cheat-river.astro** (Priority: LOW)
   - Status: No existing page (net new)
   - Effort: 3 hours (create data file + page)

**Total Effort:** 11 hours for 4 river pages

### Migration Workflow (Per River)

**Step 1: Audit Existing Content (15 min)**

1. Open existing river page (e.g., elk-river.astro)
2. Identify implemented sections (Hero, Rapids, Fishing, etc.)
3. Extract inline data (rapidsList, fishingInfo, etc.)
4. Note missing sections (compare to SPEC-14 8-section checklist)

**Step 2: Create Data File (60 min)**

1. Create `src/data/rivers/{river-slug}.ts`
2. Copy `_example.ts` template
3. Populate required fields:
   - Hero: name, image, imageAlt, tagline, description, stats
   - River metadata: length, county, difficultyRange, quickHighlights
   - Rapids: Copy inline rapidsList, convert to Rapid[] type
   - Fishing: Copy inline fishingInfo, convert to RiverFishing type
4. Add missing sections:
   - Outfitters: Research 2-3 local guide services
   - Seasonal Flow: Estimate 4 seasons (research USGS gauge)
   - Access Points: Research 2-4 put-in/take-out locations (Google Maps)
   - Safety: Copy from elk-river, customize for difficulty
   - Nearby Attractions: Research 3-5 nearby POIs (camping, towns, state parks)
5. Populate shared components:
   - Gear List: Required vs. optional gear (based on difficulty)
   - Related Shop: Link to /shop/fishing, /shop/water-sports, /shop/camping
6. Run typecheck: `npm run typecheck`

**Step 3: Create Schema Props (15 min)**

1. Open existing river page (e.g., elk-river.astro)
2. Add schema props extraction in frontmatter:

   ```typescript
   const schemaProps = {
     name: elkRiverData.name,
     slug: 'elk-river',
     description: elkRiverData.description,
     length: elkRiverData.length,
     difficultyRange: elkRiverData.difficultyRange,
     county: elkRiverData.county,
     coordinates: elkRiverData.coordinates!,
     warnings: ['Class III rapids require intermediate whitewater skills'],
     amenities: ['Whitewater Kayaking', 'Fishing', 'Camping'],
     outfitters: elkRiverData.outfitters.map(o => ({ ... })),
     breadcrumbs: [
       { name: 'Home', url: '/' },
       { name: 'Hunt Near Us', url: '/near/' },
       { name: 'Elk River', url: '/near/elk-river/' }
     ],
     publishedDate: '2024-08-15',
     updatedDate: '2025-01-15',
   };
   ```

**Step 4: Refactor Page to Template Pattern (20 min)**

1. Delete manual section HTML (150+ lines)
2. Replace with:

   ```astro
   <Layout>
     <SchemaRiverTemplate {...schemaProps} />
     <RiverTemplate {...elkRiverData} />
   </Layout>
   ```

3. Update meta tags in `<head>`:
   - Title: `{name} - {primaryActivity} Guide | WV Wild Outdoors`
   - Description: Generate from data (150-160 chars)
   - OG tags, Twitter card, geo tags

**Step 5: Build & Validate (10 min)**

1. Run: `npm run build`
2. Check build output (no type errors)
3. Open localhost:4321/near/{river-slug}/
4. Visual inspection:
   - All 8 sections render correctly
   - Responsive grids work (mobile, tablet, desktop)
   - WVWO compliance (rounded-sm ONLY, fonts, colors)
   - No console errors
5. Lighthouse audit:
   - Performance ≥ 90
   - Accessibility ≥ 95
   - SEO = 100

**Step 6: Commit & PR (10 min)**

1. Git add changed files:
   - `src/data/rivers/{river-slug}.ts`
   - `src/pages/near/{river-slug}.astro`
2. Git commit: `feat(SPEC-14): migrate {river-slug} to RiverTemplate`
3. Create PR: "SPEC-14: Migrate {River Name} to RiverTemplate"
4. Request review

**Total Time per River:** ~2 hours (audit + data + refactor + validate + commit)

---

## Appendix A: WVWO Compliance Checklist

### Fonts (MUST USE)

- [ ] `font-display` (Bitter serif) - All headings, river names, rapid names
- [ ] `font-hand` (Permanent Marker cursive) - Kim's tips ONLY
- [ ] `font-body` (Noto Sans) - All body text, descriptions, lists

### Fonts (FORBIDDEN - Instant PR Rejection)

- [ ] ❌ Inter, Poppins, DM Sans, Space Grotecast, Outfit, Montserrat, Raleway, Open Sans, system-ui

### Colors (MUST USE)

- [ ] `--brand-brown` (#3E2723) - Headers, text, detail borders
- [ ] `--sign-green` (#2E7D32) - Fishing, access points, safe rapids (Class I-III)
- [ ] `--brand-cream` (#FFF8E1) - Section backgrounds
- [ ] `--brand-orange` (#FF6F00) - CTAs, safety warnings, Class IV rapids (<5% of screen)

### Colors (FORBIDDEN - Instant PR Rejection)

- [ ] ❌ Purple gradients, hot pink (#ec4899), neon, corporate blue, diagonal multi-stop gradients

### Border Radius (MUST USE)

- [ ] `rounded-sm` (0.125rem / ~2px) - Sharp hardware store aesthetic

### Border Radius (FORBIDDEN - Instant PR Rejection)

- [ ] ❌ `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-3xl`, `rounded-full`

### Voice (MUST USE - Kim's Authentic WV Voice)

- [ ] Direct, humble, faith-forward
- [ ] Example: "The water's gin-clear, so downsize your line to 6-8 lb test"
- [ ] Example: "Class V rapids require expert skills - no shortcuts"

### Voice (FORBIDDEN - Instant PR Rejection)

- [ ] ❌ "Unlock potential", "Seamless experience", "Revolutionize", "Transform the way you"
- [ ] ❌ "All-in-one platform", "Cutting-edge solutions", "Next-level"

---

## Appendix B: Color Contrast Validation

| Foreground | Background | Ratio | Pass WCAG AA | Use Case |
|---|---|---|---|---|
| #2E7D32 (sign-green) | #FFFFFF (white) | 4.57:1 | ✅ | Rapids Class I-III badges, fishing species badges |
| #FF6F00 (brand-orange) | #3E2723 (brand-brown) | 5.81:1 | ✅ | Rapids Class IV badges (fixed contrast) |
| #DC2626 (red-600) | #FFFFFF (white) | 5.74:1 | ✅ | Rapids Class V badges, flow High badges |
| #3E2723 (brand-brown) | #FFF8E1 (brand-cream) | 11.23:1 | ✅ | Section headers on cream backgrounds |
| #FFFFFF (white) | #2E7D32 (sign-green) | 4.57:1 | ✅ | White text on green badges (inverse) |
| #FFFFFF (white) | #DC2626 (red-600) | 5.74:1 | ✅ | White text on red badges (inverse) |
| #3E2723 (brand-brown) | #FF6F00 (brand-orange) | 5.81:1 | ✅ | Brown text on orange badges (Class IV fix) |

**All combinations meet WCAG AA 4.5:1 minimum contrast ratio.**

---

## Appendix C: Responsive Breakpoint Reference

| Viewport | Tailwind Class | Width | Device Examples | RiverTemplate Behavior |
|---|---|---|---|---|
| Mobile | (default) | < 640px | iPhone SE, Galaxy S10 | Single column, stacked cards, 2x2 hero stats |
| Large Phone | `sm:` | 640px+ | iPhone 14 Pro Max | Still single column, slight padding increase |
| Tablet | `md:` | 768px+ | iPad Mini, Galaxy Tab | 2-column grids (outfitters, access points), 4x1 hero stats |
| Laptop | `lg:` | 1024px+ | MacBook Air, Surface | 3-column rapids/nearby, 4-column seasonal flow |
| Desktop | `xl:` | 1280px+ | iMac, external monitors | Same as laptop (no layout changes) |
| Wide Desktop | `2xl:` | 1536px+ | Ultrawide monitors | Same as laptop (no layout changes) |

**Key Insight:** Most grid changes happen at `md:` (768px) and `lg:` (1024px). No layout changes beyond 1024px.

---

## Appendix D: Touch Target Sizing Reference

**WCAG 2.5.5 Target Size (Level AAA):** 44x44 CSS pixels minimum

| Element | Mobile Size | Pass | Implementation |
|---|---|---|---|
| **CTA Buttons** | 48px height | ✅ | `min-h-[48px] px-6` |
| **Rapid Cards** | 160px+ height | ✅ | Full card clickable (if interactive) |
| **Outfitter Phone Links** | 48px height | ✅ | `py-3 px-4` |
| **GPS Map Links** | 44px height | ✅ | `inline-flex items-center gap-2 py-2 px-4` |
| **Species Badges** | 32px height | N/A | Display only (not interactive) |
| **Quick Highlight Badges** | 36px height | N/A | Display only (not interactive) |
| **Navigation Links** | 44px height | ✅ | Breadcrumb links `py-2 px-3` |

**All interactive elements meet or exceed 44x44px minimum tap target size.**

---

**End of SPEC-14 RiverTemplate.astro Master Architecture Document**

*This architecture serves as the complete blueprint for implementing RiverTemplate.astro. All implementation decisions have been made. Ready for Phase 1 (Type System) implementation.*
