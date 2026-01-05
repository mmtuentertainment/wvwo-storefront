# Implementation Plan: SPEC-17 Backcountry Template

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2025-12-31
**Architecture Swarm:** 7 agents
**Planning Swarm:** 4 agents

---

## Architecture Overview

The Backcountry Template is a comprehensive adventure template for wilderness areas in West Virginia. It follows the established CaveTemplate/SkiTemplate pattern with inline sections (~550 lines) while adding WV-specific safety features:

- **AMD (Acid Mine Drainage) Water Warnings** - P0 safety-critical feature
- **Multi-tier Emergency Contacts** - 911, SAR, Ranger, Hospital, Poison Control
- **Cell Coverage Warnings** - Satellite messenger recommendations
- **Industry-Standard Difficulty Colors** - Green/Blue/Red/Black system

The implementation leverages existing type infrastructure (~2,440 lines across 4 domain files) and creates a composition file for template props.

---

## Component Structure

```
wv-wild-web/src/
├── types/
│   ├── backcountry-types.ts        # EXISTS (560 lines) - Accessibility
│   ├── navigation-types.ts          # EXISTS (593 lines) - GPS/Cell/Maps
│   ├── water-safety.ts              # EXISTS (559 lines) - AMD/Sources
│   ├── weather-hazards.ts           # EXISTS (728 lines) - Quantified hazards
│   ├── backcountry-template-types.ts # NEW (~200 lines) - Composition
│   └── __tests__/
│       └── backcountry-template-types.test.ts # NEW (~200 lines)
├── components/
│   └── templates/
│       ├── BackcountryTemplate.astro    # NEW (~550 lines)
│       └── __tests__/
│           └── BackcountryTemplate.test.ts # NEW (~150 lines)
├── components/seo/
│   └── SchemaBackcountryTemplate.astro  # NEW (~180 lines)
├── content/
│   └── adventures/
│       └── dolly-sods-wilderness.mdx    # NEW (~350 lines)
└── content.config.ts                     # MODIFY (~30 lines added)
```

---

## Implementation Phases

### Phase 1: Type System Foundation (~250 LOC)

**PR #1: Type Composition Layer**

Create `backcountry-template-types.ts` with 8 new Zod schemas:

| Schema | Purpose | ~Lines |
|--------|---------|--------|
| `EmergencyContactSchema` | Individual contact (name, phone, type, hours) | 15 |
| `EmergencyTierSchema` | Priority groupings (primary, secondary, tertiary) | 20 |
| `RegulationsSchema` | Permits, fires, group size, LNT | 25 |
| `ManagingAgencySchema` | USFS, NPS, WVDNR info | 15 |
| `WildlifeHazardSchema` | Species, danger level, seasons | 25 |
| `WildernessAreaSchema` | Zones with difficulty, regulations | 30 |
| `BackcountryTrailSchema` | Trail with distance, difficulty, blazes | 25 |
| `BackcountryTemplatePropsSchema` | Main composition (~45 fields) | 80 |

**Dependencies:**

- Import from `adventure.ts` (shared base)
- Import from `navigation-types.ts` (GPS, cell)
- Import from `water-safety.ts` (AMD warnings)
- Import from `weather-hazards.ts` (quantified hazards)

**Tests:** ~200 LOC covering schema validation, edge cases

---

### Phase 2: Core Template (~550 LOC)

**PR #2: BackcountryTemplate.astro**

All sections inline (matching CaveTemplate/SkiTemplate pattern):

| Section | ~Lines | Key Features |
|---------|--------|--------------|
| Hero | 65 | Name, stats grid, cell warning badge |
| Navigation & Cell | 55 | USGS quads, declination, coverage map |
| Wilderness Areas | 70 | Zone cards with difficulty badges |
| Camping & Water | 80 | AMD warnings (P0), regulations |
| Trail System | 60 | Industry-standard difficulty colors |
| Skills & Gear | 80 | Navigation, survival, first aid checklists |
| Safety & Hazards | 100 | Weather, wildlife, emergency contacts |
| Leave No Trace | 45 | 7 principles with Kim's voice |
| Access Points | 50 | Trailhead cards with facilities |
| Seasonal | 40 | Best times grid |

**Shared Components Reused:**

- `AdventureGearChecklist.astro`
- `AdventureRelatedShop.astro`
- `AdventureCTA.astro`

**Empty State Handling:**

- Safety-critical fields → Kim's voice warnings
- Optional fields → Hide section

---

### Phase 3: SEO & Integration (~330 LOC)

**PR #3: SEO Schema + Content Config**

**SchemaBackcountryTemplate.astro (~180 LOC):**

| Schema.org Type | Purpose |
|-----------------|---------|
| `TouristAttraction` | Main entity with geo coordinates |
| `NaturalFeature` | Wilderness area classification |
| `Article` | Author (Kim), publisher (WVWO) |
| `BreadcrumbList` | Home → Adventures → Backcountry → {name} |
| `FAQPage` | AMD safety, permits, cell coverage |
| `SpecialAnnouncement` | AMD water warnings (P0 safety) |

**Meta Tags:**

- Title: `{name} Backcountry Guide | WV Wild Outdoors` (50-60 chars)
- Description: `{name} backcountry guide: {acreage} acres...` (150-160 chars)
- Open Graph: Image, type=article, locale

**content.config.ts Changes (~30 LOC):**

```typescript
// Add to type enum
type: z.enum([..., 'backcountry']).optional(),

// Import schema
import { BackcountryTemplatePropsSchema } from './types/backcountry-template-types';
```

**Route Structure:**

- Static pages at `/near/{wilderness-name}`
- Each imports BackcountryTemplate
- Uses `getEntry()` for content

---

### Phase 4: Testing & Content (~950 LOC)

**PR #4: Tests + Dolly Sods Content**

**Test Files:**

| File | ~Lines | Coverage Target |
|------|--------|-----------------|
| `backcountry-template-types.test.ts` | 200 | 90% schemas |
| `BackcountryTemplate.test.ts` | 150 | 80% template |
| `water-safety.test.ts` | EXISTS | 95% AMD |
| `navigation-types.test.ts` | EXISTS | 85% coords |
| `weather-hazards.test.ts` | EXISTS | 85% quantified |

**Priority Test Cases (P0 Safety-Critical):**

- AMD water source detection (do-not-use status)
- Emergency contact tier validation
- Cell coverage → satellite recommendation
- Industry difficulty color mapping

**Dolly Sods Content (~350 LOC):**

```yaml
---
name: "Dolly Sods Wilderness"
type: "backcountry"
heroImage: "/images/adventures/dolly-sods-hero.jpg"
acreage: 17371
county: "Tucker"
designation: "wilderness"
difficulty: "challenging"
# ... 40+ fields
---
```

**Content Sources:**

- USFS Monongahela National Forest data
- NOAA historical weather patterns
- WVDEP AMD contamination reports

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Template structure | Inline sections | Matches Cave/Ski pattern, reduces component overhead |
| Type organization | Multi-file composition | Domain separation, single import for template |
| Empty states | Kim's voice warnings | Safety-first UX, authentic brand voice |
| Difficulty colors | Industry standard | User safety > brand consistency |
| SEO approach | Multiple Schema.org types | Maximize SERP features, target AMD searches |
| Content format | MDX + YAML frontmatter | Astro Content Collections native |
| Prop drilling | No Context API | Static content, SSG-friendly |

---

## Dependencies

### External

- USGS GNIS for quad names
- NOAA for weather data patterns
- WVDEP for AMD contamination sources

### Internal

- `adventure.ts` - Shared base types
- `navigation-types.ts` - GPS, cell coverage schemas
- `water-safety.ts` - AMD detection schemas
- `weather-hazards.ts` - Quantified hazard schemas
- Existing shared components (GearChecklist, RelatedShop, CTA)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| AMD data accuracy | Medium | High | Require sourceUrl, manual verification |
| Emergency contact staleness | Medium | High | Add lastVerified date, quarterly review |
| Difficulty color accessibility | Low | Medium | WCAG contrast ratios, shape+color |
| Content collection conflicts | Low | Medium | Additive schema changes only |
| Template size creep | Medium | Low | Section line budgets, review at 600 LOC |

---

## PR Strategy

**Estimated Total LOC:** ~2,080 new lines

| PR | Scope | ~LOC | Dependencies |
|----|-------|------|--------------|
| **PR #1** | Type System Foundation | 450 | None |
| **PR #2** | BackcountryTemplate.astro | 550 | PR #1 merged |
| **PR #3** | SEO Schema + Integration | 330 | PR #2 merged |
| **PR #4** | Tests + Dolly Sods Content | 750 | PR #3 merged |

**Checkpoint Triggers:**

- ⚠️ Warn at 300 LOC per file
- 🛑 Split required at 500 LOC per file

**Review Focus per PR:**

1. **PR #1:** Schema correctness, type imports, Zod validation
2. **PR #2:** WVWO aesthetics, industry colors, empty states
3. **PR #3:** Schema.org validity, meta tag patterns, route config
4. **PR #4:** Test coverage, AMD detection, content accuracy

---

## Testing Strategy

### Unit Tests

- All Zod schemas with valid/invalid fixtures
- Helper functions (formatters, validators)
- Empty state logic branches

### Component Tests

- Template rendering with full props
- Template rendering with minimum required props
- Section visibility based on data presence
- Accessibility compliance (headings, ARIA)

### Integration Tests

- Content Collection → Template data flow
- MDX frontmatter → Zod validation
- Route generation and 404 handling

### Manual Testing Checklist

- [ ] AMD warning displays prominently
- [ ] Emergency contacts render in tier order
- [ ] Difficulty colors match industry standard
- [ ] Mobile layout stacks correctly
- [ ] Schema.org validates (Google Rich Results Test)
- [ ] Core Web Vitals pass (LCP < 2.5s)

---

## Rollback Plan

### Per-PR Rollback

Each PR is self-contained and can be reverted independently:

1. **PR #1 (Types):** Revert, no runtime impact (types only)
2. **PR #2 (Template):** Revert, remove from pages
3. **PR #3 (SEO/Config):** Revert, remove enum value
4. **PR #4 (Content):** Delete MDX file, no schema changes

### Full Feature Rollback

```bash
git revert --no-commit PR#4..PR#1
git commit -m "Revert: SPEC-17 Backcountry Template"
```

### Data Preservation

- All content in MDX files (version controlled)
- No database dependencies
- No external service integrations

---

## Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Hero image optimization, lazy sections |
| FID | < 100ms | Minimal JS, static rendering |
| CLS | < 0.1 | Fixed image dimensions, no layout shifts |
| INP | < 200ms | No client-side interactivity |

---

## Constitutional Compliance

✅ **Simplicity:** Inline sections, no unnecessary abstractions
✅ **Tech Stack:** Astro + Tailwind only, no new dependencies
✅ **Free-Tier:** No paid services, manual AMD data entry
✅ **Voice:** Kim's authentic WV voice in warnings
✅ **Industry Colors:** Override brand for safety-critical display
✅ **Aesthetics:** rounded-sm only, Bitter/Permanent Marker/Noto Sans

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Type coverage | 100% | TypeScript strict mode |
| Test coverage | 85%+ | Vitest coverage report |
| Lighthouse SEO | 95+ | Lighthouse audit |
| Schema.org valid | 0 errors | Google Rich Results Test |
| WCAG compliance | AA | axe-core audit |

---

## Next Steps

1. ✅ **Review this plan** - Approve or request changes
2. ⏳ **Run `/speckit.tasks`** - Generate task breakdown with [P] markers
3. ⏳ **Create feature branch** - `feature/spec-17-backcountry-template`
4. ⏳ **Implement PR #1** - Type System Foundation

---

*Generated by 4-agent planning swarm | Architecture by 7-agent swarm*
