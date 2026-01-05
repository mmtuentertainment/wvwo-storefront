# SPEC-17 Backcountry Template - Architecture Summary

**Generated**: 2025-12-31
**Swarm**: 7 specialized architecture agents
**Status**: Ready for Review

---

## Executive Summary

This architecture design covers all aspects of implementing the SPEC-17 Backcountry/Wilderness Template. The design leverages existing codebase patterns while adding WV-specific safety features (AMD water warnings, multi-tier emergency contacts).

---

## 1. Component Architecture

### Main Template Structure

**`BackcountryTemplate.astro`** (~500-550 lines)

All sections rendered inline (following CaveTemplate/SkiTemplate pattern):

| Section | Lines | Purpose |
|---------|-------|---------|
| Hero | ~65 | Name, stats, cell coverage warning |
| Navigation & Cell | ~55 | USGS quads, declination, coverage |
| Wilderness Areas | ~70 | Zones with difficulty badges |
| Camping & Water | ~80 | AMD warnings (P0 CRITICAL) |
| Trail System | ~60 | Industry-standard difficulty colors |
| Skills & Gear | ~80 | Navigation, survival, first aid |
| Safety & Hazards | ~100 | Emergency, weather, wildlife |
| Leave No Trace | ~45 | 7 principles |
| Access Points | ~50 | Trailheads with facilities |
| Seasonal | ~40 | Best times by season |

### Shared Components to Reuse

- `AdventureGearChecklist.astro`
- `AdventureRelatedShop.astro`
- `AdventureCTA.astro`

### New Components Needed

- `SchemaBackcountryTemplate.astro` (SEO structured data)

---

## 2. Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Content Pipeline                          │
├─────────────────────────────────────────────────────────────────┤
│  [MDX file]                                                      │
│      ↓                                                           │
│  [Content Collections]                                           │
│      ↓                                                           │
│  [Zod Validation] ← BackcountryTemplatePropsSchema              │
│      ↓                                                           │
│  [Template Props]                                                │
│      ↓                                                           │
│  [BackcountryTemplate.astro]                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State Decision Tree

**Show Warning (Kim's voice):**

- `waterSources` → "Pack all water needed"
- `emergencyContacts` → "Contact ranger district"
- `weatherHazards` → "Check NOAA"
- `trails` → "Navigate with map/compass"

**Hide Section:**

- `nearbyAttractions`, `relatedShop`, `gearList`

---

## 3. Type System Architecture

### Current Implementation Status

| File | Lines | Status |
|------|-------|--------|
| `backcountry-types.ts` | ~560 | EXISTS - Accessibility domain |
| `navigation-types.ts` | ~593 | EXISTS - GPS, cell, maps |
| `water-safety.ts` | ~559 | EXISTS - AMD, water sources |
| `weather-hazards.ts` | ~728 | EXISTS - Quantified hazards |
| `backcountry-template-types.ts` | ~200 | **NEEDED** - Template props |

### Schemas Still Needed

- `EmergencyContactSchema` / `EmergencyTierSchema`
- `RegulationsSchema` / `ManagingAgencySchema`
- `WildlifeHazardSchema` / `DangerLevelSchema`
- `WildernessAreaSchema`
- `BackcountryTrailSchema`
- `RequiredSkillsSchema` / `GearCategorySchema`
- `LeaveNoTracePrincipleSchema`
- `BackcountryTemplatePropsSchema` (main composition)

### Dependency Graph

```
adventure.ts (shared)
    ↓
├── backcountry-types.ts (accessibility)
├── navigation-types.ts (GPS/cell)
├── water-safety.ts (AMD)
└── weather-hazards.ts (quantified)
    ↓
backcountry-template-types.ts (composition)
```

---

## 4. Template Structure Architecture

### Section Flow with Accessibility

```
H1: {name}
├── H2: About This Wilderness Area
├── H2: Wilderness Zones
│   └── H3: {zone.name} (each zone)
├── H2: Backcountry Camping
│   ├── H3: Camping Regulations
│   └── H3: Water Sources & Safety
├── H2: Trail System
│   └── H3: {trail.name} (each trail)
├── H2: Required Skills & Gear
├── H2: Safety & Hazards
│   ├── H3: Weather Hazards
│   ├── H3: Wildlife Hazards
│   └── H3: Emergency Contacts
├── H2: Leave No Trace
├── H2: Access Points
└── H2: Seasonal Conditions
```

### Layout Patterns

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | Full-width, stats 2x2 | Stacked |
| Wilderness | 2-col grid | Stack |
| Trails | 3-col grid | Stack |
| Safety | Full-width nested | Stack |

---

## 5. Integration Architecture

### content.config.ts Changes

```typescript
// Extend type enum
type: z.enum([
  'adventure', 'wma', 'lake', 'river',
  'ski', 'cave', 'backcountry'  // ← ADD
]).optional(),

// Import backcountry schemas
import { BackcountryTemplatePropsSchema } from './types/backcountry-template-types';
```

### Route Handling

- Static pages in `/pages/near/*.astro`
- Each imports `BackcountryTemplate`
- Uses `getEntry()` to fetch content

### Backward Compatibility

- All changes additive
- Zero breaking changes
- New enum value + optional fields

---

## 6. Testing Architecture

### Test File Structure

```
wv-wild-web/src/
├── types/__tests__/
│   ├── backcountry-types.test.ts     # NEW
│   ├── water-safety.test.ts          # EXISTS (610 lines)
│   ├── weather-hazards.test.ts       # EXISTS (603 lines)
│   └── navigation-types.test.ts      # EXISTS (751 lines)
├── components/templates/__tests__/
│   └── BackcountryTemplate.test.ts   # NEW
└── integration/__tests__/
    └── backcountry-content.test.ts   # NEW
```

### Coverage Targets

| File | Target | Focus |
|------|--------|-------|
| backcountry-types.ts | 90% | Schemas, helpers |
| water-safety.ts | 95% | AMD detection |
| weather-hazards.ts | 85% | Quantification |
| navigation-types.ts | 85% | Coordinates, cell |
| BackcountryTemplate.astro | 80% | Props, logic |

### Priority Test Cases

**P0 (Safety-Critical):**

- AMD water source detection
- Emergency contact tiers
- Cell coverage → satellite recommendation
- Industry difficulty colors

**P1 (Template Rendering):**

- Empty state warnings
- Section visibility logic
- Accessibility compliance

---

## 7. SEO Architecture

### Schema.org Structured Data

- `TouristAttraction` + `NaturalFeature` + `Place`
- `Article` with author/publisher
- `BreadcrumbList` (Home → Adventures → Backcountry → {name})
- `FAQPage` for water safety, permits, cell coverage
- `SpecialAnnouncement` for AMD water warnings

### Meta Tag Patterns

**Title** (50-60 chars):

```
{name} Backcountry Guide | WV Wild Outdoors
```

**Description** (150-160 chars):

```
{name} backcountry guide: {acreage} acres of {designation} in {county}, WV.
{difficulty} trails, AMD water warnings. Cell coverage: {cellCoverage}.
```

### Core Web Vitals Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| INP | < 200ms |

### SEO Target Keywords

| Keyword | Volume | Intent |
|---------|--------|--------|
| Dolly Sods hiking | 2,400 | Informational |
| Dolly Sods camping | 1,600 | Informational |
| WV backcountry | 320 | Informational |
| AMD contaminated water WV | - | Safety |

---

## 8. Implementation File Locations

| File | Path |
|------|------|
| Type definitions | `wv-wild-web/src/types/backcountry-template-types.ts` |
| Template | `wv-wild-web/src/components/templates/BackcountryTemplate.astro` |
| SEO Schema | `wv-wild-web/src/components/seo/SchemaBackcountryTemplate.astro` |
| Content config | `wv-wild-web/src/content.config.ts` |
| First content | `wv-wild-web/src/content/adventures/dolly-sods-wilderness.mdx` |
| Tests | `wv-wild-web/src/types/__tests__/backcountry-types.test.ts` |

---

## 9. WVWO Aesthetic Compliance

| Element | Specification |
|---------|---------------|
| Fonts | Bitter (display), Permanent Marker (Kim's notes), Noto Sans (body) |
| Colors | brand-brown, sign-green, brand-cream, brand-orange (<5%) |
| Corners | `rounded-sm` ONLY |
| Borders | `border-l-4` accents |
| Industry Colors | Green/Blue/Red/Black for difficulty (OVERRIDE brand) |

---

## 10. Key Architecture Decisions

1. **Inline sections** (no sub-components) - Matches CaveTemplate/SkiTemplate pattern
2. **Multi-file type system** - Domain separation with composition file
3. **Prop drilling** (no Context) - Static content, no state management
4. **Safety-first empty states** - Kim's voice warnings, not hidden sections
5. **Industry color override** - Difficulty colors must use international standards
6. **FAQPage schema** - Targets AMD water safety searches for user protection

---

## Next Steps

1. **Review this architecture** - Approve or request changes
2. **Run `/speckit.plan`** - Generate implementation plan
3. **Run `/speckit.tasks`** - Create task breakdown
4. **Implement** - Follow the plan

---

*Generated by 7-agent architecture swarm*
