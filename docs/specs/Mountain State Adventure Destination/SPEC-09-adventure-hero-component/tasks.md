# Tasks: Adventure Hero Component

**Plan Version:** 1.0.0
**Generated:** 2025-12-26
**Status:** Ready for Implementation
**Total Estimated LOC:** ~590

---

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## PR 1: Core Component (~320 LOC)

### Phase 1.1: Foundation Setup

- [ ] [S] **T-001**: Create directory structure `src/components/adventure/`
- [ ] [P] **T-002**: Define TypeScript Props interface in `AdventureHero.astro`
  - Required: title, description, difficulty, season, image, imageAlt
  - Optional: imagePosition, loading, driveTime, coordinates, publishedDate, updatedDate, schemaType, slug, heroHeight
- [ ] [P] **T-003**: Create Appalachian Woodland camo SVG pattern (~1.2KB)
  - 4 colors: moss green, oak brown, bark gray, fern accent
  - Organic shapes (irregular ovals, flowing curves)
  - Save as `src/assets/patterns/appalachian-woodland.svg`

### Phase 1.2: Core Component Structure

- [ ] [S] **T-004**: Create `AdventureHero.astro` base structure (~80 LOC)
  - Section with aria-labelledby
  - Brand-brown gradient background
  - Camo SVG overlay with aria-hidden
  - 7/5 asymmetric grid layout
- [ ] [P] **T-005**: Implement Astro Image integration (~30 LOC)
  - Import from `astro:assets`
  - srcset [400, 800, 1200]
  - sizes="(max-width: 768px) 100vw, 50vw"
  - loading prop (default: 'eager')
  - object-position from imagePosition prop
- [ ] [P] **T-006**: Add image fallback UI (~20 LOC)
  - Conditional render when image missing/fails
  - Placeholder div with "Image unavailable" text
  - Brand-mud/20 background

### Phase 1.3: Badge System

- [ ] [S] **T-007**: Create `AdventureHeroBadge.astro` component (~40 LOC)
  - Props: type ('difficulty' | 'season' | 'drive-time'), value, difficulty?
  - Difficulty colors: easy=sign-green, moderate=brand-orange, advanced=brand-mud, rugged=red-800
  - Shape icons for color-blind: ●=easy, ▲=moderate, ■=advanced, ◆=rugged
- [ ] [P] **T-008**: Implement badge layout in hero (~20 LOC)
  - Flex wrap with gap-3
  - Order: difficulty → season → driveTime (if provided)
  - Mobile: stack vertically, Desktop: horizontal

### Phase 1.4: Typography & Layout

- [ ] [P] **T-009**: Style h1 title (~15 LOC)
  - font-display (Bitter), font-bold
  - text-4xl md:text-5xl lg:text-6xl
  - text-brand-cream, leading-tight
  - Dynamic ID: `adventure-hero-${slug || 'main'}`
- [ ] [P] **T-010**: Style description paragraph (~10 LOC)
  - font-body (Noto Sans)
  - text-lg md:text-xl
  - text-brand-cream/90, leading-relaxed
- [ ] [P] **T-011**: Create `adventure-hero.css` for component styles (~50 LOC)
  - Morning Mist Lift animation keyframes
  - Stagger delays (0/100/180/260ms)
  - prefers-reduced-motion protection
  - Print styles (hide CTAs)

### Phase 1.5: Basic Tests

- [ ] [S] **T-012**: Create test file `__tests__/AdventureHero.test.ts` (~50 LOC)
  - Test: renders with required props
  - Test: applies correct difficulty badge color
  - Test: applies correct difficulty shape icon
  - Test: generates dynamic ID for aria-labelledby
  - Test: handles missing image gracefully

<!-- PR-CHECKPOINT: Core Component (~320 LOC) -->
<!-- Deliverables: AdventureHero.astro, AdventureHeroBadge.astro, appalachian-woodland.svg, adventure-hero.css, basic tests -->
<!-- Acceptance: Hero renders with visual elements, responsive at lg breakpoint, tests pass -->

---

## PR 2: Schema & Accessibility (~150 LOC)

### Phase 2.1: Accessibility Attributes

- [ ] [S] **T-013**: Add ARIA attributes to hero section (~15 LOC)
  - aria-labelledby pointing to h1 ID
  - role="region" on section
- [ ] [P] **T-014**: Add decorative element accessibility (~10 LOC)
  - aria-hidden="true" on camo overlay div
  - role="presentation" on SVG
  - aria-hidden="true" on SVG
- [ ] [P] **T-015**: Ensure focus indicators on slot CTAs (~10 LOC)
  - focus-visible styles
  - Ring in sign-green

### Phase 2.2: Animation Safety

- [ ] [S] **T-016**: Implement reduced-motion protection (~15 LOC)
  - @media (prefers-reduced-motion: reduce) in CSS
  - Disable all animations
  - Instant opacity: 1 fallback

### Phase 2.3: Schema.org Implementation

- [ ] [S] **T-017**: Create `AdventureHeroSchema.astro` component (~60 LOC)
  - Props: title, description, image, coordinates?, publishedDate?, updatedDate?, schemaType
  - @graph array structure
  - TouristAttraction type for Place
  - Article type with datePublished/dateModified
  - GeoCoordinates when coordinates provided
  - LocalBusiness reference to WVWO shop
- [ ] [S] **T-018**: Integrate schema into hero (~10 LOC)
  - Conditional render when schemaType provided
  - Pass all relevant props
  - Place before closing </section>

### Phase 2.4: Accessibility Tests

- [ ] [S] **T-019**: Create `__tests__/AdventureHero.a11y.ts` (~30 LOC)
  - Import vitest-axe
  - Test: passes axe accessibility audit
  - Test: has proper heading hierarchy
  - Test: decorative elements have aria-hidden
  - Test: color contrast meets 4.5:1 (visual verification note)

<!-- PR-CHECKPOINT: Schema & Accessibility (~150 LOC) -->
<!-- Deliverables: AdventureHeroSchema.astro, accessibility attributes, a11y tests -->
<!-- Acceptance: axe-core returns zero violations, Google Rich Results Test passes -->

---

## PR 3: Integration & Polish (~120 LOC)

### Phase 3.1: Slot Architecture

- [ ] [S] **T-020**: Implement 5-slot system (~30 LOC)
  - `default`: Additional content below description
  - `cta`: Call-to-action buttons
  - `badge-extra`: Additional badges
  - `aside`: Sidebar content (within image column)
  - `schema-extra`: Custom schema injection
- [ ] [P] **T-021**: Add slot detection logic (~15 LOC)
  - Use `Astro.slots.has('slotName')`
  - Only render wrapper divs when slot has content
  - No empty placeholder divs

### Phase 3.2: Content Collections Integration

- [ ] [S] **T-022**: Create `hero-factory.ts` utility (~40 LOC)
  - Export `createHeroProps(adventure: Adventure)` function
  - Map Content Collection fields to hero props
  - Handle optional fields with defaults
  - Type-safe return

### Phase 3.3: Example Integration

- [ ] [S] **T-023**: Refactor summersville-lake.astro (~20 LOC)
  - Import AdventureHero component
  - Replace inline hero section with component
  - Pass props from page frontmatter
  - Use cta slot for existing buttons
- [ ] [P] **T-024**: Verify Lighthouse scores
  - Run Lighthouse CI
  - LCP < 2.5s on simulated 4G
  - CLS < 0.1
  - Document scores

### Phase 3.4: Edge Cases & Validation

- [ ] [P] **T-025**: Add runtime validation (~15 LOC)
  - Validate difficulty enum (default to 'moderate' with warning)
  - CSS truncation for long titles (3-line clamp)
  - Console.warn for invalid props (dev only)

### Phase 3.5: E2E & Documentation

- [ ] [P] **T-026**: Create E2E test `tests/e2e/adventure-hero.spec.ts` (~40 LOC)
  - Test: mobile layout at 375px viewport
  - Test: desktop layout at 1024px viewport
  - Test: reduced-motion disables animations
  - Visual regression snapshots
- [ ] [P] **T-027**: Create component README (~30 LOC)
  - Props documentation table
  - Slot usage examples
  - Schema configuration guide
  - Usage example with Content Collections

### Phase 3.6: Final Review

- [ ] [S] **T-028**: Screenshot for Kim review
  - Desktop view with real adventure data
  - Mobile view
  - Get approval: "Feels like us"
- [ ] [S] **T-029**: Final QA checklist
  - [ ] All tests passing
  - [ ] axe-core zero violations
  - [ ] Rich Results Test valid
  - [ ] Lighthouse scores green
  - [ ] Kim approval obtained

<!-- PR-CHECKPOINT: Integration & Polish (~120 LOC) -->
<!-- Deliverables: Slots, hero-factory.ts, summersville-lake refactor, E2E tests, README, Kim approval -->
<!-- Acceptance: Full integration working, all success criteria met -->

---

## PR Summary

| PR | Scope | Est. LOC | Tasks | Key Deliverables |
|----|-------|----------|-------|------------------|
| 1 | Core Component | ~320 | 12 | Hero, Badges, SVG, CSS, Unit Tests |
| 2 | Schema & A11y | ~150 | 7 | Schema.astro, ARIA, axe Tests |
| 3 | Integration | ~120 | 10 | Slots, Factory, E2E, README |

**Total Estimated LOC:** ~590
**Total Tasks:** 29
**Parallelizable:** 16 (55%)
**Sequential:** 13 (45%)

---

## Dependencies Graph

```text
PR 1: Core Component
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[T-001 Setup] ─────────────────────────────────────────────────┐
       │                                                       │
       ├──► [T-002 Props Interface] ─┐                         │
       │                             │                         │
       ├──► [T-003 Camo SVG] ────────┼──► [T-004 Base Structure]
       │                             │            │
       │                             │            ├──► [T-005 Astro Image]
       │                             │            │
       │                             │            ├──► [T-006 Fallback UI]
       │                             │            │
       │                             └────────────┼──► [T-007 Badge Component]
       │                                          │            │
       │                                          │            └──► [T-008 Badge Layout]
       │                                          │
       │                                          ├──► [T-009 Title Styles]
       │                                          │
       │                                          ├──► [T-010 Description Styles]
       │                                          │
       │                                          └──► [T-011 CSS File]
       │                                                       │
       └───────────────────────────────────────────────────────┴──► [T-012 Basic Tests]

PR 2: Schema & Accessibility
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PR 1 Complete] ──► [T-013 ARIA Attributes] ──► [T-016 Reduced Motion]
                           │
                           ├──► [T-014 Decorative A11y]
                           │
                           ├──► [T-015 Focus Indicators]
                           │
                           └──► [T-017 Schema Component] ──► [T-018 Schema Integration]
                                                                      │
                                                                      └──► [T-019 A11y Tests]

PR 3: Integration & Polish
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PR 2 Complete] ──► [T-020 Slot System] ──► [T-022 Hero Factory]
                           │                        │
                           └──► [T-021 Slot Detection]──► [T-023 Summersville Refactor]
                                                                │
                                                    ┌───────────┴───────────┐
                                                    │                       │
                                              [T-024 Lighthouse]    [T-025 Validation]
                                                    │                       │
                                                    └───────────┬───────────┘
                                                                │
                                              ┌─────────────────┼─────────────────┐
                                              │                 │                 │
                                        [T-026 E2E]    [T-027 README]    [T-028 Kim Review]
                                              │                 │                 │
                                              └─────────────────┴─────────────────┘
                                                                │
                                                        [T-029 Final QA]
```

---

## Success Criteria Mapping

| Success Criteria | Tasks |
|------------------|-------|
| SC-001: Lighthouse a11y 100 | T-014, T-015, T-016, T-019, T-024 |
| SC-002: Valid Schema.org | T-017, T-018, T-024 |
| SC-003: LCP < 2.5s | T-005, T-024 |
| SC-004: CLS < 0.1 | T-005, T-006, T-024 |
| SC-005: 100% test coverage | T-012, T-019, T-026 |
| SC-006: Zero axe violations | T-013, T-014, T-019 |
| SC-007: Kim approves | T-028 |

---

## Execution Order (Recommended)

### Day 1: PR 1 Tasks (Core)

1. T-001 → T-002, T-003 (parallel)
2. T-004 (after T-002, T-003)
3. T-005, T-006, T-007 (parallel, after T-004)
4. T-008 (after T-007)
5. T-009, T-010, T-011 (parallel)
6. T-012 (after all above)

### Day 2: PR 2 Tasks (Schema & A11y)

1. T-013 → T-014, T-015, T-016 (parallel after T-013)
2. T-017 → T-018 (sequential)
3. T-019 (after T-018)

### Day 3: PR 3 Tasks (Integration)

1. T-020 → T-021 (parallel)
2. T-022 → T-023 (sequential)
3. T-024, T-025 (parallel)
4. T-026, T-027 (parallel)
5. T-028 → T-029 (Kim approval then final QA)

---

## Notes

- **No new npm dependencies required** - Uses existing Astro, Vitest, Playwright
- **Kim approval required** before PR 3 merge (T-028)
- **Rich Results Test** should be run manually during PR 2 review
- **Lighthouse CI** configured in existing GitHub Actions
- **Content Collections** migration (SPEC-06) is a parallel effort - hero factory will integrate when ready

---

## Quick Start

Begin with Task T-001:

```bash
# Create directory structure
mkdir -p wv-wild-web/src/components/adventure/__tests__
mkdir -p wv-wild-web/src/assets/patterns
```

Then proceed to T-002 and T-003 in parallel.
