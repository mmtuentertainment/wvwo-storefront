# Implementation Plan: Adventure Hero Component

**Spec Version:** 2.1.0
**Plan Version:** 1.0.0
**Created:** 2025-12-26
**Architecture Source:** 6-Agent Hivemind Synthesis (Visual, Component, Performance, SEO, Accessibility, Motion)

---

## Architecture Overview

The AdventureHero.astro component is a **zero-JS static hero** for adventure destination pages, serving as the visual and SEO anchor for WVWO's Mountain State Adventure Destination pivot. It combines:

1. **WVWO Aesthetic Identity**: Brand-brown gradient with Appalachian Woodland camo SVG overlay
2. **Geographic SEO**: Schema.org @graph markup for "near me" search capture
3. **Core Web Vitals Excellence**: LCP < 2.5s, CLS < 0.1, 79KB first paint budget
4. **WCAG 2.2 AA Compliance**: Full accessibility for European Accessibility Act (June 2025)
5. **Slot-Based Flexibility**: 5 slots for content customization across 50+ adventure pages

### Key Innovations (From 6-Agent Architecture)

| Innovation | Source Agent | Description |
|------------|--------------|-------------|
| Appalachian Woodland Camo | Visual | 4-color SVG pattern with moss, oak, bark, fern (~1.2KB) |
| Shape + Color Badges | Visual/A11y | Geometric icons for color-blind users (●▲■◆) |
| Morning Mist Lift Animation | Motion | Staggered reveal (0/100/180/260ms) respecting reduced-motion |
| 7/5 Asymmetric Grid | Visual | Content-heavy left, image right (not equal columns) |
| @graph Schema Architecture | SEO | TouristAttraction + Article + LocalBusiness + BreadcrumbList |
| Content Collections Factory | Component | Type-safe props generation from adventure frontmatter |

---

## Component Structure

```text
wv-wild-web/
├── src/
│   ├── components/
│   │   └── adventure/
│   │       ├── AdventureHero.astro          # Main component (~180 LOC)
│   │       ├── AdventureHeroBadge.astro     # Difficulty/Season/DriveTime badge (~40 LOC)
│   │       ├── AdventureHeroSchema.astro    # Schema.org JSON-LD generator (~60 LOC)
│   │       └── __tests__/
│   │           ├── AdventureHero.test.ts    # Unit tests (~120 LOC)
│   │           └── AdventureHero.a11y.ts    # Accessibility tests (~60 LOC)
│   │
│   ├── styles/
│   │   └── adventure-hero.css               # Component-specific styles (~50 LOC)
│   │
│   ├── lib/
│   │   └── adventures/
│   │       └── hero-factory.ts              # Props factory from Content Collections (~40 LOC)
│   │
│   └── assets/
│       └── patterns/
│           └── appalachian-woodland.svg     # Camo pattern (~1.2KB)
│
├── public/
│   └── images/
│       └── adventures/                      # Hero images (existing)
│
└── tests/
    └── e2e/
        └── adventure-hero.spec.ts           # Playwright visual regression (~40 LOC)
```

**Total Estimated LOC:** ~590 LOC (component + tests)

---

## Implementation Phases

### Phase 1: Foundation (P1 - Core Display)

**Goal**: Render hero with title, description, image, and badges

**Tasks**:
1. Create `AdventureHero.astro` with TypeScript props interface
2. Implement brand-brown gradient background
3. Create Appalachian Woodland camo SVG pattern
4. Implement 7/5 asymmetric grid layout (lg breakpoint)
5. Add Astro Image component with srcset [400, 800, 1200]
6. Create `AdventureHeroBadge.astro` with difficulty colors + shape icons
7. Add driveTime badge (optional third badge)

**Files**:
- `src/components/adventure/AdventureHero.astro`
- `src/components/adventure/AdventureHeroBadge.astro`
- `src/assets/patterns/appalachian-woodland.svg`

**Acceptance**: Hero renders with all visual elements, responsive at lg breakpoint

---

### Phase 2: Accessibility & Motion (P1 - WCAG Compliance)

**Goal**: Full WCAG 2.2 AA compliance with motion safety

**Tasks**:
1. Add `aria-labelledby` pointing to h1 with dynamic ID (`adventure-hero-${slug}`)
2. Add `aria-hidden="true"` and `role="presentation"` to camo SVG
3. Implement Morning Mist Lift animation with stagger
4. Add `@media (prefers-reduced-motion: reduce)` protection
5. Ensure 4.5:1 color contrast for text on brand-brown
6. Add visible focus indicators on CTA slots

**Files**:
- `src/components/adventure/AdventureHero.astro` (updates)
- `src/styles/adventure-hero.css`

**Acceptance**: axe-core returns zero violations, animations disabled with reduced-motion

---

### Phase 3: Schema.org & SEO (P1 - Geographic SEO)

**Goal**: Valid structured data for "near me" search capture

**Tasks**:
1. Create `AdventureHeroSchema.astro` for JSON-LD generation
2. Implement @graph with TouristAttraction + Article
3. Add GeoCoordinates when coordinates prop provided
4. Add LocalBusiness reference to WVWO shop
5. Include publishedDate/updatedDate for content freshness
6. Validate with Google Rich Results Test

**Files**:
- `src/components/adventure/AdventureHeroSchema.astro`
- `src/components/adventure/AdventureHero.astro` (integration)

**Acceptance**: Google Rich Results Test passes, Place schema detected

---

### Phase 4: Slots & Content Flexibility (P2)

**Goal**: Enable content customization without component modification

**Tasks**:
1. Implement 5-slot architecture:
   - `default`: Additional content below description
   - `cta`: Call-to-action buttons
   - `badge-extra`: Additional badges
   - `aside`: Sidebar content (within image column)
   - `schema-extra`: Custom schema injection
2. Add slot detection (only render wrappers when slot has content)
3. Create Content Collections factory helper for props generation
4. Add print styles hiding CTAs

**Files**:
- `src/components/adventure/AdventureHero.astro` (updates)
- `src/lib/adventures/hero-factory.ts`
- `src/styles/adventure-hero.css` (print media query)

**Acceptance**: Slot content renders correctly, no empty wrapper divs

---

### Phase 5: Error States & Edge Cases (P2)
**Goal**: Graceful degradation for missing/invalid data

**Tasks**:
1. Add image fallback UI ("Image unavailable" placeholder)
2. Add runtime validation for difficulty enum (default to 'moderate')
3. Add CSS truncation for long titles (3-line clamp with ellipsis)
4. Handle missing coordinates (render schema without geo)
5. Add console warnings for invalid props (dev only)

**Files**:
- `src/components/adventure/AdventureHero.astro` (updates)

**Acceptance**: Component doesn't crash with edge case inputs

---

### Phase 6: Testing & Validation (P1)
**Goal**: Comprehensive test coverage

**Tasks**:
1. Unit tests with Vitest:
   - Required props rendering
   - Difficulty badge color mapping
   - aria-labelledby generation
   - Schema.org markup generation
   - Slot content rendering
2. Accessibility tests with vitest-axe:
   - Zero violations audit
   - Heading hierarchy check
   - Decorative elements aria-hidden
3. Visual regression with Playwright:
   - Mobile layout (375px)
   - Desktop layout (1024px)
   - Reduced-motion behavior

**Files**:
- `src/components/adventure/__tests__/AdventureHero.test.ts`
- `src/components/adventure/__tests__/AdventureHero.a11y.ts`
- `tests/e2e/adventure-hero.spec.ts`

**Acceptance**: 100% test coverage for props, zero axe violations

---

### Phase 7: Integration & Example Page (P2)
**Goal**: Working example with real adventure data

**Tasks**:
1. Update summersville-lake.astro to use AdventureHero
2. Verify Content Collections integration
3. Test with Lighthouse CI (LCP < 2.5s, CLS < 0.1)
4. Screenshot for Kim review
5. Document component usage in README

**Files**:
- `src/pages/near/summersville-lake.astro` (refactor)
- `src/components/adventure/README.md`

**Acceptance**: Lighthouse scores green, Kim approves visual ("Feels like us")

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Image Component** | Astro Image with srcset | 2025 best practice, auto-optimization, responsive |
| **Schema Architecture** | @graph array | Multiple types (Place + Article) in single block |
| **Grid Ratio** | 7/5 asymmetric | Content-heavy for SEO, matches existing patterns |
| **Animation Strategy** | CSS-only with stagger | Zero JS, respects prefers-reduced-motion |
| **Badge Icons** | Shape + color | Color-blind accessibility without icon library |
| **Camo Pattern** | Inline SVG data URI | Single request, no extra fetch, cacheable |
| **Slot Detection** | `Astro.slots.has()` | Conditional wrapper rendering |
| **ID Generation** | `adventure-hero-${slug}` | Unique IDs for aria-labelledby |

---

## Dependencies

### Internal
- `src/styles/global.css` - Design tokens (brand-brown, sign-green, etc.)
- `src/components/ui/badge.tsx` - Badge variant patterns (reference only)
- Content Collections schema - Adventure type definition
- `src/pages/near/summersville-lake.astro` - Gold standard pattern

### External
- `astro:assets` - Image optimization (built-in)
- `vitest` + `vitest-axe` - Testing
- `playwright` - E2E visual regression (existing)

### None Required
- Zero new npm dependencies
- Zero third-party services
- Zero runtime JS (pure Astro static)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Astro Image experimental features change | Low | Medium | Pin Astro version, use stable srcset API |
| Schema.org validation fails | Medium | High | Test early with Rich Results Test, iterate |
| Performance budget exceeded (79KB) | Low | High | Monitor with Lighthouse CI, optimize SVG |
| Kim rejects visual design | Medium | Medium | Early screenshot review before full implementation |
| axe-core false positives | Low | Low | Manual verification, document exceptions |

---

## PR Strategy

**Estimated Total LOC:** ~590 LOC

Since this exceeds the 500 LOC threshold for single PRs, recommend splitting:

### PR 1: Core Component (~320 LOC)
- `AdventureHero.astro` (~180 LOC)
- `AdventureHeroBadge.astro` (~40 LOC)
- `appalachian-woodland.svg` (~1.2KB)
- `adventure-hero.css` (~50 LOC)
- Basic unit tests (~50 LOC)

**Checkpoint**: Hero renders with visual elements, basic tests pass

### PR 2: Schema & Accessibility (~150 LOC)

- `AdventureHeroSchema.astro` (~60 LOC)
- Accessibility attributes + animation
- axe-core tests (~60 LOC)
- Rich Results Test validation

**Checkpoint**: Schema valid, axe returns zero violations

### PR 3: Integration & Polish (~120 LOC)

- `hero-factory.ts` (~40 LOC)
- summersville-lake.astro refactor
- E2E tests (~40 LOC)
- Documentation

**Checkpoint**: Full integration working, Lighthouse scores green

---

## Testing Strategy

### Unit Tests (Vitest)
```typescript
describe('AdventureHero', () => {
  it('renders with required props');
  it('applies correct difficulty badge color');
  it('applies correct difficulty shape icon');
  it('generates aria-labelledby with dynamic id');
  it('handles missing image gracefully');
  it('respects prefers-reduced-motion');
  it('generates Schema.org markup when schemaType provided');
  it('includes GeoCoordinates when coordinates provided');
  it('renders slot content correctly');
  it('omits empty slot wrappers');
  it('truncates long titles');
});
```

### Accessibility Tests
```typescript
import { axe } from 'vitest-axe';

it('passes axe accessibility audit');
it('has proper heading hierarchy');
it('decorative elements have aria-hidden');
it('color contrast meets 4.5:1');
```

### Visual Regression (Playwright)
```typescript
test('mobile layout at 375px');
test('desktop layout at 1024px');
test('reduced-motion disables animations');
```

### Performance Validation
- Lighthouse CI in GitHub Actions
- LCP < 2.5s on simulated 4G
- CLS < 0.1
- First paint < 79KB

---

## Rollback Plan

**If issues arise post-merge:**

1. **Revert PR**: Standard git revert of merge commit
2. **Feature Flag**: Not needed (static component, no runtime behavior)
3. **Content Fallback**: Existing summersville-lake.astro hero section remains intact until PR 3 refactor

**Low Risk**: This is a new component, not modifying existing critical paths. Existing pages continue to work during development.

---

## Success Criteria Mapping

| Spec Success Criteria | Plan Phase | Validation Method |
|-----------------------|------------|-------------------|
| SC-001: Lighthouse a11y 100 | Phase 2 | Lighthouse CI |
| SC-002: Valid Schema.org | Phase 3 | Rich Results Test |
| SC-003: LCP < 2.5s | Phase 7 | Lighthouse CI |
| SC-004: CLS < 0.1 | Phase 1 | Lighthouse CI |
| SC-005: 100% test coverage | Phase 6 | Vitest coverage report |
| SC-006: Zero axe violations | Phase 6 | vitest-axe |
| SC-007: Kim approves | Phase 7 | Screenshot review |

---

## Next Steps

1. **User approval** of this plan
2. `/speckit.tasks` - Generate detailed task breakdown with [P] markers
3. Begin PR 1 implementation (Core Component)

---

**Plan generated from 6-agent hivemind architecture synthesis. Ready for implementation.**
