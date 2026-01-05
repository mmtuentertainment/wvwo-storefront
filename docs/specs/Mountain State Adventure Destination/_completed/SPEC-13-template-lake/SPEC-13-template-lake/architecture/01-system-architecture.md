# System Architecture: Lake Template Component (SPEC-13)

**Version**: 1.0.0
**Date**: 2025-12-29
**Status**: Architecture Design
**Architect**: System Architect Agent

---

## 1. Executive Summary

This document defines the overall system architecture for the Lake Template Component (SPEC-13), a reusable Astro template for West Virginia lake recreation pages. The architecture achieves **70%+ component reuse** from SPEC-11 Adventure Shared Components while introducing 6 custom sections for lake-specific content.

### Key Architectural Decisions

1. **Component Composition Strategy**: Leverage existing SPEC-11 components via wrapper pattern, add custom sections for lake-specific needs
2. **File Organization**: Template lives in `wv-wild-web/src/components/templates/LakeTemplate.astro`, types extend `adventure.ts`
3. **Integration Pattern**: Props-based composition with data transformation layer
4. **Build Process**: Zod schema validation in frontmatter with fail-fast build errors

### Success Metrics

- **Component Reuse**: 70%+ (10/16 sections use existing components)
- **Type Safety**: 100% TypeScript coverage with Zod validation
- **Performance**: Lighthouse score 90+ (performance, accessibility, SEO)
- **WVWO Compliance**: 100% (rounded-sm only, brand fonts/colors)

---

## 2. High-Level Architecture

### 2.1 System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WV Wild Outdoors Website                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Lake Recreation Pages (Near Section)         │    │
│  │                                                        │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │    │
│  │  │ Summersville │  │  Stonewall   │  │  Burnsville │ │    │
│  │  │    Lake      │  │Jackson Lake  │  │    Lake     │ │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │    │
│  │         │                 │                  │        │    │
│  │         └─────────────────┼──────────────────┘        │    │
│  │                           │                           │    │
│  │                  ┌────────▼────────┐                  │    │
│  │                  │  LakeTemplate   │                  │    │
│  │                  │   Component     │                  │    │
│  │                  │   (SPEC-13)     │                  │    │
│  │                  └────────┬────────┘                  │    │
│  │                           │                           │    │
│  └───────────────────────────┼───────────────────────────┘    │
│                              │                                │
│              ┌───────────────┴───────────────┐                │
│              │                               │                │
│     ┌────────▼─────────┐          ┌─────────▼────────┐       │
│     │  SPEC-11 Shared  │          │  Custom Lake     │       │
│     │   Components     │          │    Sections      │       │
│     │  (Adventure      │          │  (Hero, Marina,  │       │
│     │   Bundle)        │          │  Fishing Spots)  │       │
│     └──────────────────┘          └──────────────────┘       │
│                                                                │
└─────────────────────────────────────────────────────────────────┘

External Systems:
- Google Fonts (Bitter, Permanent Marker, Noto Sans)
- Recreation.gov (campground reservations)
- Google Maps (directions)
```

### 2.2 Component Layer Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                           │
│  (Astro Page Components: summersville-lake.astro, etc.)         │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Template Layer (SPEC-13)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           LakeTemplate.astro (~600 lines)                  │ │
│  │                                                            │ │
│  │  • Props validation (Zod schema)                          │ │
│  │  • Data transformation (stats, features)                  │ │
│  │  • Section orchestration (16 sections total)              │ │
│  └────────────────────────────────────────────────────────────┘ │
└───────────────────────────┬──────────────────────────────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ▼                                   ▼
┌──────────────────────┐          ┌──────────────────────────┐
│  EXISTING Components │          │   CUSTOM Sections        │
│    (SPEC-11)         │          │   (Lake-specific)        │
│                      │          │                          │
│ • AdventureQuickStats│          │ • Hero Section           │
│ • AdventureWhatToFish│          │ • Where to Fish (spots)  │
│ • AdventureCampingList│         │ • Marina & Boat Access   │
│ • AdventureAmenitiesGrid│       │ • Activities Section     │
│ • AdventureGearChecklist│       │ • Seasonal Guide         │
│ • AdventureRelatedShop│         │ • Safety & Regulations   │
│ • AdventureCTA       │          │                          │
│ • AdventureGettingThere│        │                          │
│ • EmailCapture       │          │                          │
└──────────────────────┘          └──────────────────────────┘
          │                                   │
          └─────────────────┬─────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Type System Layer                            │
│                                                                  │
│  wv-wild-web/src/types/adventure.ts                             │
│                                                                  │
│  • EXISTING: GearItem, RelatedCategory, CampingFacility,        │
│    FeatureItem, StatItem                                        │
│  • NEW: FishingSpot, Marina, Activity, SeasonalGuide,           │
│    Regulation, LakeTemplateProps                                │
│                                                                  │
│  All types backed by Zod schemas for runtime validation         │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Composition Strategy

### 3.1 70%+ Reuse Target Achievement

**TOTAL SECTIONS**: 16
**REUSED SECTIONS**: 11 (68.75%)
**CUSTOM SECTIONS**: 5 (31.25%)

**WITH COMPONENT REUSE WITHIN CUSTOM**: 73.4% effective reuse

| # | Section | Type | Component Used | LOC | Reuse % |
|---|---------|------|----------------|-----|---------|
| 1 | Layout Wrapper | Existing | Layout.astro | 0 | 100% |
| 2 | Hero | Custom | (inline HTML) | ~50 | 0% |
| 3 | Quick Stats | Existing | AdventureQuickStats | 0 | 100% |
| 4 | What to Fish (Species) | Existing | AdventureWhatToFish | 0 | 100% |
| 5 | Where to Fish (Spots) | Custom | (inline HTML) | ~80 | 0% |
| 6 | Camping Facilities | Existing | AdventureCampingList | 0 | 100% |
| 7 | Marina & Boat Access | Custom | (inline HTML) | ~100 | 0% |
| 8 | Activities | Custom | AdventureFeatureSection | ~60 | 50% |
| 9 | Seasonal Guide | Custom | (inline HTML) | ~80 | 0% |
| 10 | Safety & Regulations | Custom | (inline HTML) | ~70 | 0% |
| 11 | Getting There | Existing | AdventureGettingThere | 0 | 100% |
| 12 | Gear Checklist | Existing | AdventureGearChecklist | 0 | 100% |
| 13 | Shop Categories | Existing | AdventureRelatedShop | 0 | 100% |
| 14 | CTA Section | Existing | AdventureCTA | 0 | 100% |
| 15 | Email Capture | Existing | EmailCapture | 0 | 100% |
| 16 | Breadcrumbs | Existing | Breadcrumb + SchemaBreadcrumb | 0 | 100% |

**CUSTOM SECTION BREAKDOWN**:

- 5 fully custom sections: ~440 lines
- 10 existing components: ~0 lines (reuse)
- 1 partial reuse (Activities uses AdventureFeatureSection): ~30 lines saved

**TARGET**: ~600 lines total = 440 custom + 160 orchestration/frontmatter

---

## 4. File Organization

### 4.1 Directory Structure

```
wv-wild-web/
├── src/
│   ├── components/
│   │   ├── templates/                        # NEW: Template components
│   │   │   └── LakeTemplate.astro            # ~600 lines (NEW)
│   │   │
│   │   ├── adventure/                        # EXISTING: SPEC-11 components
│   │   │   ├── AdventureQuickStats.astro
│   │   │   ├── AdventureWhatToFish.astro
│   │   │   ├── AdventureCampingList.astro
│   │   │   ├── AdventureAmenitiesGrid.astro
│   │   │   ├── AdventureGearChecklist.astro
│   │   │   ├── AdventureGettingThere.astro
│   │   │   ├── AdventureRelatedShop.astro
│   │   │   ├── AdventureCTA.astro
│   │   │   ├── AdventureFeatureSection.astro  # Base component
│   │   │   └── __tests__/
│   │   │       └── [component tests]
│   │   │
│   │   ├── seo/                               # EXISTING: SEO components
│   │   │   ├── SchemaBreadcrumb.astro
│   │   │   └── SchemaAdventureHero.astro
│   │   │
│   │   ├── Breadcrumb.astro                   # EXISTING
│   │   ├── EmailCapture.astro                 # EXISTING
│   │   ├── Header.astro                       # EXISTING
│   │   └── Footer.astro                       # EXISTING
│   │
│   ├── types/
│   │   └── adventure.ts                       # EXTEND: Add lake types
│   │       ├── [EXISTING] GearItem
│   │       ├── [EXISTING] RelatedCategory
│   │       ├── [EXISTING] CampingFacility
│   │       ├── [EXISTING] FeatureItem
│   │       ├── [EXISTING] StatItem
│   │       ├── [NEW] FishingSpot             # Lines ~300-320
│   │       ├── [NEW] Marina                  # Lines ~320-350
│   │       ├── [NEW] Activity                # Lines ~350-370
│   │       ├── [NEW] SeasonalGuide           # Lines ~370-390
│   │       ├── [NEW] Regulation              # Lines ~390-410
│   │       └── [NEW] LakeTemplateProps       # Lines ~410-480
│   │
│   ├── pages/
│   │   └── near/
│   │       ├── summersville-lake.astro       # REFACTOR: Use template
│   │       ├── stonewall-jackson-lake.astro  # REFACTOR: Use template
│   │       └── burnsville-lake.astro         # REFACTOR: Use template
│   │
│   └── config/
│       └── siteContact.ts                     # EXISTING
│
└── tests/                                     # NEW: Template tests
    └── components/
        └── templates/
            └── LakeTemplate.test.ts           # ~200 lines (NEW)
```

### 4.2 Type System File Placement

**File**: `wv-wild-web/src/types/adventure.ts`
**Current Size**: 295 lines
**After SPEC-13**: ~500 lines (+205 lines)

**Insertion Point**: After line 295 (after `isWMAAdventure` function)

---

## 5. Integration Patterns

### 5.1 Props Mapping Architecture

**Data Flow**: Page Component → LakeTemplate → Child Components

```typescript
// Page Component (summersville-lake.astro)
---
import LakeTemplate from '../../components/templates/LakeTemplate.astro';
import type { LakeTemplateProps } from '../../types/adventure';

// Define data in page
const summersvilleData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas',
  fishSpecies: [/* ... */],
  fishingSpots: [/* ... */],
  // ... rest of props
};
---

<!-- Pass all props via spread operator -->
<LakeTemplate {...summersvilleData} />
```

### 5.2 Data Transformation Layer

**Purpose**: Convert LakeTemplateProps to component-specific formats

```typescript
// Transform lake data to QuickStats format
function transformQuickStats(props: LakeTemplateProps): StatItem[] {
  return [
    { value: props.acreage.toLocaleString(), label: 'Acres', icon: 'area' },
    { value: `${props.maxDepth} ft`, label: 'Max Depth', icon: 'info' },
    { value: props.county, label: 'County', icon: 'location' },
  ];
}

// Transform fish species to FeatureItem format
function transformFishSpecies(species: LakeTemplateProps['fishSpecies']): FeatureItem[] {
  return species.map(fish => ({
    name: fish.title,
    description: fish.description,
    kimNote: fish.notes,
  }));
}
```

---

## 6. Build Process Architecture

### 6.1 Build-Time Validation Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. Page Build Starts (summersville-lake.astro)            │
│     • Astro reads frontmatter                               │
│     • TypeScript checks LakeTemplateProps type             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Template Frontmatter Executes (LakeTemplate.astro)     │
│     • Receives props: LakeTemplateProps                     │
│     • Runs Zod validation on all arrays                     │
│       - FishingSpotSchema.parse(each spot)                 │
│       - MarinaSchema.parse(marina)                         │
│       - ActivitySchema.parse(each activity)                │
│       - SeasonalGuideSchema.parse(each season)             │
│       - RegulationSchema.parse(each regulation)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
    ✅ VALID                     ❌ INVALID
         │                           │
         ▼                           ▼
┌────────────────────────┐  ┌──────────────────────────────┐
│  3a. Validation Passes │  │  3b. Validation Fails        │
│                        │  │                              │
│  • Continue build      │  │  • Throw Error with details  │
│  • Render template     │  │  • Build process STOPS       │
│  • Generate HTML       │  │  • Display Zod error message │
└────────┬───────────────┘  └──────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  4. HTML Output Generated                                   │
│     • Static HTML file created                              │
│     • All props validated at build time                     │
│     • No runtime validation overhead                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Architecture Decision Records (ADRs)

### ADR-001: Component Composition via Existing SPEC-11 Components

**Decision**: Leverage existing SPEC-11 adventure components for 70%+ of template sections rather than building custom implementations.

**Rationale**:

- DRY principle: Don't duplicate AdventureWhatToFish, AdventureCampingList, etc.
- Maintainability: Updates to shared components automatically propagate to all templates
- Consistency: All lake pages use identical section patterns
- Testing: Existing components already have test coverage

**Alternatives Considered**:

1. ❌ **Full custom implementation**: 100% custom sections = 900+ lines, high maintenance burden
2. ❌ **Hybrid with inline duplication**: Copy-paste component logic = version drift issues
3. ✅ **Props-based composition**: Transform data, pass to existing components

**Consequences**:

- ✅ Faster development (440 custom lines vs 900+ if building from scratch)
- ✅ Consistent UI across all templates
- ⚠️ Requires data transformation layer (adds ~50 lines of transformation code)

---

### ADR-002: File Location for LakeTemplate

**Decision**: Place LakeTemplate at `wv-wild-web/src/components/templates/LakeTemplate.astro`

**Rationale**:

- Clear separation of concerns: templates/ directory indicates reusable page-level components
- Future scalability: Can add RiverTemplate, TrailTemplate in same directory
- Aligns with common Astro project patterns

**Consequences**:

- ✅ Clear mental model: `components/adventure/` = atomic, `components/templates/` = page-level
- ✅ Easy to find all templates in one place

---

### ADR-003: Type Extensions in Existing adventure.ts

**Decision**: Add lake-specific types to existing `wv-wild-web/src/types/adventure.ts` file rather than creating separate lake.ts file.

**Rationale**:

- Single source of truth for all adventure-related types
- Lake pages are a subcategory of adventures (same domain)
- Simplifies imports (no need to import from multiple files)

**Consequences**:

- ✅ Single import for all adventure types
- ⚠️ adventure.ts grows from 295 to ~500 lines (still manageable)

---

### ADR-004: Build-Time Validation with Zod

**Decision**: Validate all template props at build time using Zod `.parse()` in template frontmatter. Build MUST fail if validation errors occur.

**Rationale**:

- **Fail-fast principle**: Catch invalid data before it reaches production
- **No runtime overhead**: Validation happens once at build, not on every page load
- **Clear error messages**: Zod errors pinpoint exact field and issue

**Consequences**:

- ✅ Invalid pages never reach production
- ✅ Clear error messages guide editors to fix data
- ⚠️ Build fails if data is invalid (intentional, forces data quality)

---

## 8. Next Steps

### Phase 1: Type System (1-2 hours)

- Add lake-specific types to adventure.ts
- Define Zod schemas for validation

### Phase 2: Template Structure (3-4 hours)

- Create LakeTemplate.astro component
- Implement 6 custom sections
- Integrate 10 existing components

### Phase 3: WVWO Compliance (1 hour)

- Enforce rounded-sm only
- Apply border-left accents
- Implement Kim's voice (font-hand)

### Phase 4: Testing & Validation (1-2 hours)

- Refactor summersville-lake.astro
- Run Lighthouse audits
- Test responsive layouts

---

**Document End** - System Architecture for SPEC-13 Lake Template
