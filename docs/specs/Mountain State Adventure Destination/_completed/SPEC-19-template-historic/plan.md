# Implementation Plan: Historic Site Template with Appalachian Soul

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2026-01-05
**Feature Branch:** `feature/spec-19-historic-template`

---

## Architecture Overview

SPEC-19 implements a reusable Astro template for WV historic sites and battlefields with authentic Appalachian heritage aesthetics. The template tells the C→B→D→A narrative arc (Balanced Truth → Raw Reality → Defiant Spirit → Reverent Honor) through visual design evolution, where color meanings transform as users scroll: coal-gray shifts from oppression to strength, heritage burgundy evolves from museum respect to blood metaphor to honor.

**Core Innovation:** Design elements aren't decorative - they're narrative tools. Riveted borders mean "built from barons' scraps, built to outlast." Asymmetric grids reflect company town chaos transforming into organic community. Coal-gray loading skeletons reclaim oppression color as heritage aesthetic.

**Target:** ~475-line HistoricTemplate.astro with 8 modular section components, extended heritage color palette (11 new colors), progressive loading, image attribution system, and WCAG 2.1 AA compliance.

---

## Component Structure

```text
src/
├── components/
│   ├── templates/
│   │   └── HistoricTemplate.astro              (~475 lines - main orchestrator)
│   ├── historic/                                (NEW directory)
│   │   ├── HistoricHero.astro                  (~80 lines - aged photo filter, era badge)
│   │   ├── HistoricalContextSection.astro      (~120 lines - timeline, events, key figures)
│   │   ├── PreservedStructuresSection.astro    (~90 lines - riveted borders, building cards)
│   │   ├── ToursSection.astro                  (~70 lines - trail markers, booking CTAs)
│   │   ├── ExhibitsSection.astro               (~60 lines - museum styling)
│   │   ├── EducationalProgramsSection.astro    (~60 lines - burgundy borders)
│   │   ├── VisitorInfoSection.astro            (~50 lines - utilitarian coal-gray)
│   │   └── NearbyHistorySection.astro          (~40 lines - trail blaze markers)
│   └── skeletons/                               (NEW directory - progressive loading)
│       ├── TimelineSkeleton.astro              (~30 lines)
│       ├── EventCardsSkeleton.astro            (~25 lines)
│       ├── StructureCardsSkeleton.astro        (~30 lines)
│       └── TourCardsSkeleton.astro             (~25 lines)
├── types/
│   └── templates/
│       └── historic.ts                          (NEW - HistoricTemplateProps interface, ~150 lines)
├── styles/
│   └── historic-custom.css                      (OPTIONAL - if custom CSS exceeds <style> block limits)
└── utils/
    └── image-attribution.ts                     (NEW - attribution helpers, ~50 lines)

tailwind.config.mjs                              (Extend with 11 heritage colors, 2 fonts, 3 shadows)
```

**Estimated Total LOC:** ~1,380 lines
- Main template: 475 lines
- Section components: 570 lines
- Skeleton components: 110 lines
- TypeScript types: 150 lines
- Utilities: 50 lines
- Tailwind config: 25 lines additions

---

## Implementation Phases

### Phase 1: Foundation & Configuration (PR #1 - ~150 LOC)

**Goal:** Set up color palette, typography, and custom CSS infrastructure.

#### Tasks:

1. **Extend Tailwind Config** (tailwind.config.mjs)
   - Add 11 heritage colors to `theme.extend.colors`
   - Add 2 font families (`marker`, `trail`)
   - Add 3 custom box shadows (`carved`, `painted-wood`, `lumber`)
   - Add shimmer animation and keyframes
   - Add text-shadow plugin
   - **LOC:** ~25 lines

2. **Create TypeScript Interface** (src/types/templates/historic.ts)
   - Define complete `HistoricTemplateProps` interface
   - 64-137 field structure from spec
   - Include new fields: `heroImageCredit`, `tours.name`, `tours.reservationUrl`, `structure.imageCredit`
   - Export type for import in components
   - **LOC:** ~150 lines

3. **Create Custom CSS Utilities** (Option A: in <style> block, Option B: separate file)
   - `.hero-aged-photo` filter
   - `.hero-image-credit` attribution overlay
   - `.stone-text-shadow` carved effect
   - `.lumber-border` asymmetric borders
   - `.metal-seam` divider
   - `.aged-section` texture overlay
   - `.riveted-border` pseudo-elements
   - `.skeleton-shimmer` animation
   - `.blur-up` image fade-in
   - Reduced motion support
   - Focus states
   - **Decision:** Start in `<style>` block, extract to separate file if > 100 lines
   - **LOC:** ~150 lines (in HistoricTemplate.astro or separate CSS file)

#### PR #1 Deliverables:
- ✅ Tailwind config extended
- ✅ TypeScript interface complete
- ✅ Custom CSS foundation ready
- ✅ Zero implementation - just infrastructure

**PR #1 Checkpoint:** ~150 LOC (safe, no split needed)

---

### Phase 2: Core Sections - Hero & Historical Context (PR #2 - ~280 LOC)

**Goal:** Implement the two most complex sections with narrative arc storytelling.

#### Tasks:
1. **HistoricHero.astro Component**
   - Aged photo background with sepia/grayscale filter
   - 14% darkened overlay
   - Era badge (heritage-gold background, Roboto Slab font, stone-carved shadow)
   - Quick highlights grid (3-5 facts, asymmetric layout)
   - Image attribution overlay (bottom-right, coal-gray background)
   - National Register status badge
   - **LOC:** ~80 lines

2. **HistoricalContextSection.astro Component**
   - Asymmetric 2-column grid (`grid-cols-[2fr_5fr]`)
   - Timeline column: coal-gray vertical borders, year markers with stone-carved shadow
   - Events column: heritage burgundy borders (C→B arc: museum respect → blood metaphor)
   - Key Figures grid: 2-column, cream backgrounds, brown borders
   - Broader Significance card: orange border, aged paper background
   - **LOC:** ~120 lines

3. **TimelineSkeleton.astro Component**
   - Coal-gray shimmer placeholders
   - Matches HistoricalContextSection layout
   - 800ms timeout handling
   - **LOC:** ~30 lines

4. **EventCardsSkeleton.astro Component**
   - Lumber border shimmer placeholders
   - Heritage burgundy border previews
   - **LOC:** ~25 lines

5. **Update HistoricTemplate.astro Shell**
   - Import Hero and HistoricalContext sections
   - Font preconnect links in `<head>`
   - Custom CSS `<style>` block
   - Conditionally render sections
   - **LOC:** ~55 lines (partial, will grow)

#### PR #2 Deliverables:
- ✅ Hero section with C→B narrative tone (balanced introduction)
- ✅ Historical Context section (B arc: raw reality timeline)
- ✅ Skeleton screens for loading states
- ✅ Main template shell structure

**PR #2 Checkpoint:** ~280 LOC (safe, under 300 LOC warning threshold)

---

### Phase 3: Structures & Tours (PR #3 - ~290 LOC)

**Goal:** Implement hand-built aesthetic (riveted borders, trail markers) with D arc defiance theme.

#### Tasks:
1. **PreservedStructuresSection.astro Component**
   - Asymmetric 3-column grid (`grid-cols-[3fr_2fr_4fr]`)
   - Riveted pseudo-element borders (hand-hammered copper)
   - Building type badges (Oswald font, trail marker aesthetic)
   - Copper patina green accents (layered sign-green)
   - Image attribution captions (below photos)
   - Condition badges (heritage-gold)
   - ADA accessibility icons
   - Site map download CTA
   - **LOC:** ~90 lines

2. **ToursSection.astro Component**
   - Hand-painted trail marker cards
   - Oswald font for tour types
   - Painted-wood shadow effects
   - Tour details (duration, schedule, cost with emoji icons)
   - **"Reserve Tour →" CTA button** (brand-orange, external booking link)
   - Security: `rel="noopener noreferrer"`
   - **LOC:** ~70 lines

3. **StructureCardsSkeleton.astro Component**
   - Riveted border shimmer (maintains aesthetic during load)
   - 4:3 aspect ratio image placeholder
   - **LOC:** ~30 lines

4. **TourCardsSkeleton.astro Component**
   - Trail marker badge shimmer
   - CTA button placeholder
   - **LOC:** ~25 lines

5. **Image Attribution Utilities** (src/utils/image-attribution.ts)
   - Helper functions for credit line formatting
   - Placement logic (overlay vs caption)
   - ARIA label generation
   - **LOC:** ~50 lines

6. **Update HistoricTemplate.astro**
   - Import Structures and Tours sections
   - Metal seam dividers between sections
   - Progressive loading conditional rendering
   - **LOC:** ~25 lines additions

#### PR #3 Deliverables:
- ✅ Preserved Structures (D arc: defiant spirit - "built to outlast")
- ✅ Tours with external booking integration
- ✅ Riveted borders, trail markers implemented
- ✅ Image attribution system functional

**PR #3 Checkpoint:** ~290 LOC (safe, under 300 LOC warning threshold)

---

### Phase 4: Museum & Education (PR #4 - ~250 LOC)

**Goal:** Complete narrative arc with museum styling and educational programs.

#### Tasks:
1. **ExhibitsSection.astro Component**
   - Museum card styling (aged paper cream backgrounds)
   - Lumber border treatment (asymmetric 3px 2px 4px 3px)
   - Artifact labels (Roboto Slab font)
   - Interactive exhibit badges (brand-orange)
   - Featured artifacts list
   - **LOC:** ~60 lines

2. **EducationalProgramsSection.astro Component**
   - Heritage burgundy borders (museum aesthetic)
   - Gold accent badges for program types
   - 3-column grid on desktop
   - Program details (type, audience, description, booking)
   - Contact/inquiry links
   - **LOC:** ~60 lines

3. **VisitorInfoSection.astro Component**
   - Coal-gray utilitarian aesthetic (factual mining-town style)
   - 4-column grid: Hours, Admission, Parking, Accessibility
   - No decorative elements - function over form
   - Contact information (phone, email)
   - **LOC:** ~50 lines

4. **NearbyHistorySection.astro Component**
   - Trail blaze marker cards
   - Oswald font for site types
   - Geographic proximity display (distance, direction)
   - Related site connections
   - **LOC:** ~40 lines

5. **Update HistoricTemplate.astro**
   - Import remaining 4 sections
   - Add conditional rendering for optional sections
   - Final structure complete
   - **LOC:** ~40 lines additions

#### PR #4 Deliverables:
- ✅ All 8 sections implemented
- ✅ A arc complete (reverent honor - grit endures)
- ✅ Template functionally complete
- ✅ Ready for content population testing

**PR #4 Checkpoint:** ~250 LOC (safe)

---

### Phase 5: Polish & Optimization (PR #5 - ~180 LOC)

**Goal:** Skeleton screens, performance optimization, accessibility testing, documentation.

#### Tasks:
1. **Skeleton Components Finalization**
   - Verify all 4 skeleton components integrate correctly
   - Test 800ms timeout behavior
   - Error state styling (heritage burgundy borders)
   - **LOC:** Already created in Phases 2-3, ~20 lines of integration code

2. **Responsive Testing & Refinement**
   - Mobile layout validation (320px-768px)
   - Tablet breakpoints (768px-1024px)
   - Desktop asymmetric grids (1024px+)
   - Texture performance (desktop-only aged sections)
   - **LOC:** ~30 lines of media query refinements

3. **Accessibility Enhancements**
   - ARIA labels audit (all icons, sections)
   - Focus state testing (keyboard navigation)
   - High contrast mode support
   - Reduced motion testing
   - Screen reader landmark structure
   - **LOC:** ~40 lines (ARIA attributes, roles)

4. **Performance Optimization**
   - Font preconnect verification
   - Image lazy loading (below-fold structures)
   - Blur-up LQIP implementation
   - Texture SVG optimization (data URIs)
   - **LOC:** ~20 lines

5. **Documentation & Testing**
   - Create example usage in `src/pages/test/historic-template-test.astro`
   - Populate with Carnifex Ferry placeholder content
   - Test all 8 sections with real-ish data
   - Verify narrative arc color evolution visually
   - Document Phase 4 content guidelines
   - **LOC:** ~70 lines (test page + docs)

#### PR #5 Deliverables:
- ✅ Lighthouse 100 Accessibility, ≥90 Performance
- ✅ WCAG 2.1 AA compliance verified
- ✅ Mobile responsive tested
- ✅ Example page with Carnifex Ferry content
- ✅ Ready for Phase 4 real content migration

**PR #5 Checkpoint:** ~180 LOC (safe)

---

### Phase 6: Content Guidelines & Migration Prep (PR #6 - ~200 LOC)

**Goal:** Prepare for Phase 4 content population with guidelines and schemas.

#### Tasks:
1. **Content Guidelines Document** (docs/guides/historic-site-content-guidelines.md)
   - C→B→D→A narrative arc examples
   - Voice guidelines for each section
   - "Balanced truth" vs "raw reality" threshold examples
   - Coal baron exploitation language patterns
   - "Don't Tread on Me" defiance phrasing
   - Mother Jones quote integration
   - Contested narrative presentation rules
   - **LOC:** ~100 lines

2. **Schema Validation Utilities** (src/utils/validate-historic-props.ts)
   - Runtime validation for HistoricTemplateProps
   - Required field checks
   - WCAG color contrast validation (heritage-gold large text only)
   - Image credit format verification
   - **LOC:** ~80 lines

3. **Sample Data Files** (src/data/historic-sites/)
   - carnifex-ferry.json (complete example)
   - bulltown-historic-area.json (complete example)
   - **LOC:** ~20 lines per file (40 total)

#### PR #6 Deliverables:
- ✅ Content team has clear guidelines for Phase 4
- ✅ Validation prevents WCAG violations
- ✅ 2 complete sample datasets for testing
- ✅ Ready for Kim + historian hybrid workflow

**PR #6 Checkpoint:** ~200 LOC (safe)

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Color Palette Extension** | Heritage burgundy, aged gold, coal-gray, stone-gray, heritage cream (11 new colors) | Narrative arc requires color meaning evolution (C→B→D→A). Constitutional exception approved for historic authenticity. |
| **Typography Additions** | Roboto Slab (700/900) for historical markers, Oswald (600/700) for trail signage | Hand-carved stone aesthetic (CCC markers) and hand-painted trail markers research-validated. |
| **Component Architecture** | 8 modular section components imported by main template | Follows SPEC-17/18 patterns, enables independent testing, under 500 lines per file rule. |
| **Border Treatments** | Riveted pseudo-elements, asymmetric lumber borders (3px 2px 4px 3px), metal seam dividers | Moonshining heritage (copper rivets), coal town architecture (hand-sawn lumber), visual metaphors for power struggle. |
| **Loading Strategy** | Progressive rendering with coal-gray skeleton screens, 800ms timeout | Modern UX, heritage aesthetic maintained during load, partial failure isolation, SSG optimization. |
| **Image Attribution** | Overlay (hero) vs caption (structures), required even for public domain | Legal safety, ethical credit, overlay doesn't obscure hero content, captions allow longer credit lines. |
| **Tour Booking** | External links (Eventbrite, WV State Parks) with `rel="noopener noreferrer"` | No embedded forms (scope creep), delegates to specialized platforms, security best practice. |
| **Narrative Arc** | C→B→D→A (Balanced → Raw → Defiant → Honor) color/design evolution | Authentic Appalachian storytelling: coal barons, labor struggles, mountain resilience. Design serves history. |

---

## Dependencies

### External Dependencies
- **Google Fonts API**
  - Roboto Slab: 700, 900 weights
  - Oswald: 600, 700 weights
  - Preconnect required: `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - Display strategy: `display=swap` (prevents FOIT)

- **Public Domain Image Sources** (Phase 4)
  - Library of Congress (LC-DIG-\* catalog numbers)
  - National Archives (NARA-\* identifiers)
  - WV State Archives (Collection A&M \*)
  - No API calls - manual download and attribution

### Internal Dependencies
- **SPEC-17 Patterns** (Backcountry Template)
  - Industry safety colors (trail difficulty) - may apply to historic trail networks
  - Reusable grid patterns

- **SPEC-18 Patterns** (State Park Template)
  - Geographic proximity Haversine formula (for Nearby History section)
  - Quarterly manual review process (historic sites less dynamic than state parks)
  - Hybrid image strategy (public domain + attribution)

- **WVWO Base Styles**
  - Bitter, Permanent Marker, Noto Sans fonts (already loaded)
  - Brand-brown, sign-green, brand-cream, brand-orange colors
  - `rounded-sm` only (2px border-radius)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Heritage colors fail WCAG AA contrast** | Low | High (accessibility blocker) | Pre-validated in spec (Section 9.1). Gold backgrounds large text only (≥18px). Test with WebAIM during PR #1. |
| **Custom CSS > 150 lines bloats template** | Medium | Low (maintainability) | Extract to `src/styles/historic-custom.css` if `<style>` block exceeds 100 lines. Import via `<link>` tag. |
| **Riveted border pseudo-elements break on mobile** | Low | Medium (visual bug) | Test on iOS Safari 14+, Android Chrome 90+. Fallback: solid borders if `::before`/`::after` unsupported (unlikely). |
| **Coal baron narrative too dark/depressing** | Medium | High (brand mismatch) | C→B→D→A arc balances raw truth with defiant hope. Kim + historian review in Phase 4. Voice examples in guidelines (PR #6). |
| **External booking links go stale** | High | Low (user frustration) | Not in template scope - content team responsibility. Validation utils warn on missing `reservationUrl` in PR #6. |
| **Skeleton screens don't match final layout** | Medium | Low (jarring transition) | Design skeletons to match exact grid structure. Coal-gray color continuity reduces visual jump. |
| **Asymmetric grids break on narrow viewports** | Low | Medium | Mobile stacks full-width (<768px). Asymmetry only on desktop (≥1024px). Test 320px viewport. |

---

## PR Strategy

### Total Estimated LOC: ~1,380 lines

**Recommended PR Breakdown (6 PRs):**

| PR | Scope | LOC | Checkpoint Status |
|----|-------|-----|-------------------|
| **PR #1** | Foundation (Tailwind, types, custom CSS) | ~150 | ✅ Safe (under 300) |
| **PR #2** | Hero + Historical Context + skeletons | ~280 | ✅ Safe (under 300) |
| **PR #3** | Structures + Tours + attribution utils | ~290 | ⚠️ Near warning (290/300) |
| **PR #4** | Exhibits + Education + Visitor + Nearby | ~250 | ✅ Safe |
| **PR #5** | Polish + performance + accessibility | ~180 | ✅ Safe |
| **PR #6** | Content guidelines + validation + samples | ~200 | ✅ Safe |

### Cascade-Forward Strategy (Learned from SPEC-18)

```text
main → pr1-foundation → pr2-hero-context → pr3-structures-tours → pr4-museum-education → pr5-polish → pr6-content-prep
```

**Benefits:**
- Each PR builds on previous (zero merge conflicts - SPEC-18 pattern)
- Narrative arc implemented in order (C→B in PR2, D in PR3, A in PR4)
- Early PRs unblock testing while later PRs in development

### Checkpoint Triggers
- **Warn at 300 LOC:** PR #3 is 290 LOC - monitor additions carefully
- **Split required at 500 LOC:** No PR exceeds this threshold
- **Recommend split:** If any PR grows beyond 350 LOC during implementation

---

## Testing Strategy

### Unit Tests (Vitest + Testing Library)

**Phase 2 Tests:** `__tests__/components/historic/HistoricHero.test.ts`
- Renders hero section with all props
- Era badge displays correctly
- Image attribution overlay appears when credit provided
- Quick highlights grid renders 3-5 items
- National Register badge conditional rendering

**Phase 3 Tests:** `__tests__/components/historic/PreservedStructures.test.ts`
- Riveted borders render with pseudo-elements
- ADA icons show when `accessible: true`
- Image attribution captions display below structure photos
- Condition badges render with correct heritage-gold background

**Phase 4 Tests:** `__tests__/components/historic/ToursSection.test.ts`
- Reserve Tour CTA appears when `reservationUrl` provided
- External link has `rel="noopener noreferrer"`
- Tour details (duration, schedule, cost) render conditionally

**Phase 5 Tests:** Accessibility audit
- Color contrast ratios (automated axe-core)
- Focus states keyboard navigation
- Screen reader landmark structure (ARIA)

### Integration Tests

**Full Template Rendering:**
```typescript
// __tests__/templates/HistoricTemplate.integration.test.ts
describe('HistoricTemplate C→B→D→A Narrative Arc', () => {
  it('renders all 8 sections in correct order', () => {
    // Verify Hero → Historical → Structures → Tours → Exhibits → Education → Visitor → Nearby
  });

  it('hides optional sections when data missing', () => {
    // No timeline → hides timeline subsection
    // No exhibits → hides entire Exhibits section
  });

  it('progressive loading shows skeletons for < 800ms', async () => {
    // Skeleton visible → data loads → skeleton replaced
  });
});
```

### Manual Testing Checklist

**Visual Authenticity:**
- [ ] Coal-gray timeline markers visible (not corporate blue)
- [ ] Heritage burgundy borders on Historical Context cards
- [ ] Riveted corners on Preserved Structures cards (4 rivets per card)
- [ ] Lumber borders asymmetric (inspect DevTools - should be 3px 2px 4px 3px)
- [ ] Metal seam dividers between sections (horizontal striped pattern)
- [ ] Aged photo filter on hero (subtle sepia + grayscale)
- [ ] Era badge stone-carved shadow (inspect - should have `text-shadow: 2px 2px`)

**WCAG 2.1 AA Compliance:**
- [ ] Run axe DevTools (0 violations)
- [ ] Test keyboard navigation (all links/buttons focusable, orange outline visible)
- [ ] Screen reader testing (NVDA/JAWS: all sections announced, icons have labels)
- [ ] High contrast mode (Windows High Contrast: burgundy → black, gold → black)

**Responsive Breakpoints:**
- [ ] Mobile 320px: Full-width stacked, no textures
- [ ] Tablet 768px: 2-column grids, some asymmetry
- [ ] Desktop 1024px+: Full asymmetric grids (2fr 3fr, 3fr 2fr 4fr), textures enabled

**Loading States:**
- [ ] Skeleton shimmer animates smoothly (coal-gray gradient)
- [ ] 800ms timeout triggers error state (simulate slow network)
- [ ] Partial failure isolated (break Tours API, other sections render)

**Cross-Browser:**
- [ ] Chrome/Edge 90+ (riveted borders, sepia filter)
- [ ] Firefox 88+ (lumber border asymmetry)
- [ ] Safari 14+ (iOS mobile layout)

---

## Rollback Plan

### If Issues Arise in Production

**Minor Visual Bugs (rivets, borders):**
1. Disable custom CSS classes via feature flag
2. Fallback to standard WVWO borders (`border-l-4 border-brand-brown`)
3. Fix in patch PR, re-enable

**WCAG Contrast Failures:**
1. Immediate: Replace heritage-gold text with brand-brown (8.2:1 AAA)
2. Temporary: Disable aged section backgrounds (use solid heritage-cream)
3. Root cause: Audit color usage, fix contrast ratios, redeploy

**Loading Performance Issues:**
1. Disable skeleton screens (render sections immediately)
2. Remove blur-up image transitions (instant load)
3. Investigate: Font loading blocking? Texture SVG too large?

**Complete Template Failure:**
1. Revert to SPEC-18 State Park Template temporarily
2. Add disclaimer: "Full historic site experience coming soon"
3. Fix SPEC-19 issues in hotfix branch
4. Redeploy when stable

**Git Revert Command:**
```bash
# Revert last PR if critical failure
git revert <commit-hash> -m 1
git push origin main

# Or reset to before SPEC-19 merge
git reset --hard <commit-before-spec-19>
git push --force origin main  # WARN USER FIRST
```

---

## Stacked PR Cascade-Forward Plan

**Branch Strategy (SPEC-18 Zero-Conflict Pattern):**

```text
main
 └─ pr1-foundation (Tailwind, types, CSS)
     └─ pr2-hero-context (Hero, Historical Context, skeletons)
         └─ pr3-structures-tours (Structures, Tours, attribution)
             └─ pr4-museum-education (Exhibits, Programs, Visitor, Nearby)
                 └─ pr5-polish (Performance, a11y, testing)
                     └─ pr6-content-prep (Guidelines, validation, samples)
```

**Merge Sequence:**
1. Merge PR #1 → main
2. Rebase pr2-hero-context onto main
3. Merge PR #2 → main
4. Rebase pr3-structures-tours onto main
5. (Continue cascade...)

**Benefits:**
- Early PRs unblock later work (no waiting for 6-PR mega-PR approval)
- Reviewers see logical progression (narrative arc in order)
- Zero merge conflicts (each PR builds on previous, like SPEC-18)

---

## Timeline Estimates

**IMPORTANT:** Per CLAUDE.md constitutional rules, no timeline commitments. This section provides task sequencing only, not duration estimates.

### Sequencing Order (Not Time-Based)

**Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6**

Each phase depends on previous completion:
- Phase 2 requires Phase 1 Tailwind colors
- Phase 3 requires Phase 2 template shell
- Phase 5 requires Phase 4 complete implementation
- Phase 6 requires Phase 5 tested template

**Parallel Work Opportunities:**
- While PR #1 in review: Start Phase 2 section components
- While PR #2 in review: Build Phase 3 structures/tours
- Phase 6 content guidelines can start anytime (independent)

---

## Success Metrics

### Completion Criteria

**Architecture Compliance:**
- [ ] All 16 sections of architecture spec implemented
- [ ] Heritage color palette (11 colors) in Tailwind config
- [ ] Custom CSS < 200 lines (extracted to separate file if needed)
- [ ] Props interface matches spec (64-137 fields)

**Visual Authenticity (The Litmus Test):**
- [ ] "Would Kim's neighbors recognize this as 'their heritage' online?"
- [ ] Riveted borders, lumber asymmetry, coal-gray timelines visible
- [ ] Narrative arc color evolution perceptible (coal-gray oppression → strength)
- [ ] Zero Pinterest rustic farmhouse aesthetic
- [ ] Zero SaaS landing page feel

**Technical Excellence:**
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility 100
- [ ] WCAG 2.1 AA compliance (axe DevTools 0 violations)
- [ ] Mobile responsive 320px-1920px
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

**Narrative Arc Validation:**
- [ ] Hero section (C - Balanced Truth): "Coal barons controlled wages, but not souls"
- [ ] Historical Context (B - Raw Reality): Paint Creek Strike, unflinching details
- [ ] Preserved Structures (D - Defiant Spirit): "Built to outlast" visible in riveted borders
- [ ] Educational Programs (A - Reverent Honor): Grit endures, heritage celebrated

**Phase 4 Readiness:**
- [ ] Content guidelines document complete
- [ ] Kim + historian hybrid workflow defined
- [ ] Sample data (Carnifex Ferry, Bulltown) validates template
- [ ] Contested narrative presentation rules clear

---

## Phase-Specific Implementation Notes

### Phase 1: Tailwind Config Strategy

**File:** `tailwind.config.mjs`

**Extend existing config, don't replace:**
```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // EXISTING: brand-brown, sign-green, brand-cream, brand-orange, brand-mud
      colors: {
        // ADD SPEC-19 heritage palette
        'heritage-burgundy': '#93282c',
        'heritage-burgundy-light': '#c02032',
        'heritage-gold': '#d18a00',
        'heritage-gold-light': '#ffc655',
        'coal-gray': '#424242',
        'stone-gray': '#757575',
        'creek-stone': '#616161',
        'heritage-green': '#0a5861',
        'heritage-green-alt': '#234b43',
        'heritage-cream': '#fff8e9',
        'heritage-cream-alt': '#efebe2',
      },
      // ADD font families
      fontFamily: {
        // EXISTING: display, hand, body
        'marker': ['Roboto Slab', 'serif'],
        'trail': ['Oswald', 'sans-serif'],
      },
      // ADD custom shadows
      boxShadow: {
        'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)',
        'painted-wood': 'inset 0 0 20px rgba(62, 39, 35, 0.1), 3px 3px 0 rgba(0, 0, 0, 0.2)',
        'lumber': '2px 3px 0 rgba(62, 39, 35, 0.3)',
      },
      // ADD skeleton animations
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [
    // ADD text-shadow utility
    function({ matchUtilities, theme }) {
      matchUtilities(
        { 'text-shadow': (value) => ({ textShadow: value }) },
        { values: { 'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)' } }
      )
    },
  ],
}
```

---

### Phase 2: Custom CSS Organization

**Decision Point:** In `<style>` block vs separate file?

**Option A: In HistoricTemplate.astro `<style>` block**
- ✅ All styles co-located with component
- ✅ Scoped to template (no global pollution)
- ❌ Large `<style>` block (150+ lines) makes template harder to read

**Option B: Separate src/styles/historic-custom.css**
- ✅ Cleaner template code
- ✅ Reusable across other historic components (if SPEC-20+ also use heritage palette)
- ❌ Extra HTTP request (minimal impact)

**Recommendation:** Start with Option A (in `<style>` block). If block exceeds 100 lines during PR #2, extract to Option B in PR #3.

**Custom CSS Classes Required:**
```css
.hero-aged-photo { filter: sepia(0.3) grayscale(0.2) contrast(1.1) brightness(0.95); }
.hero-image-credit { position: absolute; bottom: 8px; right: 8px; background: rgba(66,66,66,0.8); ... }
.stone-text-shadow { text-shadow: 2px 2px 0 rgba(0,0,0,0.6); }
.lumber-border { border-width: 3px 2px 4px 3px; box-shadow: 2px 3px 0 rgba(62,39,35,0.3); }
.metal-seam { border-top: 2px solid #424242; background: repeating-linear-gradient(...); }
.aged-section { background-image: ...(SVG noise texture); }
.riveted-border { position: relative; border: 2px solid #3E2723; /* + pseudo-elements */ }
.skeleton-shimmer { background: linear-gradient(90deg, ...); animation: shimmer 2s linear infinite; }
.blur-up { opacity: 0; transition: opacity 0.3s ease-in; }
```

---

### Phase 3: Riveted Border Pseudo-Element Implementation

**Technical Challenge:** Bottom rivets require last-child pseudo-elements.

**Solution (from architecture spec Section 3.1):**
```css
.riveted-border > *:last-child {
  position: relative;
}

.riveted-border > *:last-child::before,
.riveted-border > *:last-child::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--brand-brown, #3E2723);
  border-radius: 50%;
  bottom: -4px;
}

.riveted-border > *:last-child::before { left: -4px; }
.riveted-border > *:last-child::after { right: -4px; }
```

**Testing:** Ensure last child element exists (e.g., condition badge or accessibility indicator).

---

### Phase 4: Narrative Arc Content Examples

**Guide for Phase 4 content writers (PR #6 deliverable):**

**Section-by-Section Tone Evolution:**

| Section | Arc Phase | Tone Example | Color Meaning |
|---------|-----------|--------------|---------------|
| **Hero** | C (Balanced) | "Paint Creek Strike Site - Where miners stood their ground" | Coal-gray as historical marker (neutral) |
| **Historical Context** | B (Raw Reality) | "1912: Company guards opened fire on unarmed miners. 16 died. The strike lasted 12 months." | Heritage burgundy becomes blood metaphor |
| **Preserved Structures** | D (Defiant Spirit) | "Miner's cabin, built 1915 from salvaged lumber. Still standing 110 years later." | Riveted borders = built to outlast oppression |
| **Educational Programs** | A (Reverent Honor) | "Living history programs celebrate the resilience that built these mountains." | Heritage colors as celebration |

---

### Phase 5: Performance Optimization Targets

**Lighthouse Score Breakdown:**

| Category | Target | Strategy |
|----------|--------|----------|
| **Performance** | ≥90 | Font preconnect, lazy images, desktop-only textures, shimmer CSS (no JS) |
| **Accessibility** | 100 | WCAG 2.1 AA colors, ARIA labels, focus states, reduced motion |
| **Best Practices** | 100 | `rel="noopener noreferrer"`, HTTPS images, no console errors |
| **SEO** | 100 | Semantic HTML, heading hierarchy (h1 → h2 → h3), alt text |

**Optimization Techniques:**
1. **Font Loading:** `display=swap`, preconnect, weights limited (700/900 only)
2. **Image Lazy Loading:** Below-fold structures use `loading="lazy"`
3. **Texture Conditionals:** Aged section backgrounds desktop-only (`@media (min-width: 1024px)`)
4. **Skeleton Animation:** Pure CSS (no JS overhead), `prefers-reduced-motion` support
5. **Blur-Up:** Single CSS class toggle (`.blur-up.loaded`), minimal JS

---

### Phase 6: Content Guidelines Key Sections

**Document:** `docs/guides/historic-site-content-guidelines.md`

**Required Sections:**
1. **C→B→D→A Narrative Arc Framework**
   - When to use balanced tone vs raw unflinching
   - How to transition from truth to defiance to honor
   - Voice examples for each arc phase

2. **Coal Baron Exploitation Language**
   - Approved phrases: "company scrip", "controlled wages", "owned the houses"
   - Defiance counterpoints: "but not the souls", "porches where banjos played"
   - Avoid: Overly academic jargon, sanitized history, heroic glorification

3. **"Don't Tread on Me" Defiance Integration**
   - Mother Jones quotes (pre-approved for authenticity)
   - Paint Creek Strike narrative examples
   - Union organizing language (respectful, factual)

4. **Contested Narratives Presentation**
   - Template: "Union sources report..., while Confederate accounts describe..."
   - Example: "Northern newspapers called it a rout. Southern historians emphasize strategic retreat."
   - Goal: Multi-perspective without false equivalence

5. **The Counter Test (Kim's Voice)**
   - Blacklisted phrases review
   - Example rewrites (corporate → authentic)
   - Local reference integration

---

## Constitutional Compliance Checklist

**WVWO Principles Verified:**
- ✅ **Simplicity:** No CMS integration, no embedded booking forms, static props
- ✅ **Authenticity:** Heritage colors tell Appalachian story, not decorative
- ✅ **Free-Tier:** Google Fonts (free), public domain images (free), no paid services
- ✅ **Quality Over Speed:** 6 PRs for thoroughness, not rushed mega-PR

**Tech Stack Compliance:**
- ✅ **Astro:** Template component (.astro), no Vue/Angular/Svelte
- ✅ **Tailwind:** Extended config, utility-first CSS
- ✅ **React/shadcn:** Not needed for static template (Phase 5 future consideration)
- ✅ **TypeScript:** Props interface in src/types/templates/historic.ts

**Hard Rules:**
- ✅ No forbidden fonts (Inter, Poppins, system-ui)
- ✅ No forbidden colors (purple, pink, neon) - heritage palette approved
- ✅ No forbidden styles (glassmorphism, parallax, bouncy animations)
- ✅ `rounded-sm` only (2px border-radius maintained)

**Voice Compliance:**
- ✅ Kim's authentic Appalachian voice in all examples
- ✅ Zero marketing buzzwords in content guidelines
- ✅ Narrative arc philosophy reviewed and approved

---

## Open Questions for Implementation

**Resolved During Planning:**
1. ✅ Tour booking: External links (no embedded forms)
2. ✅ Image rights: Public domain + attribution required
3. ✅ Loading states: Progressive with skeletons (800ms timeout)
4. ✅ Content sourcing: Kim + historian hybrid (Phase 4)
5. ✅ Enhanced accessibility: Defer to Phase 5

**New Questions (Non-Blocking):**
1. **Tailwind Plugin Location:** Add text-shadow plugin inline or extract to separate file?
   - **Recommendation:** Inline (keeps config simple)

2. **Skeleton Component Reusability:** Create generic `<Skeleton>` component or section-specific?
   - **Recommendation:** Section-specific (TimelineSkeleton, StructureSkeleton) - maintains heritage aesthetic

3. **Test Coverage Target:** Aim for 90% or 80%?
   - **Recommendation:** 85% (matches SPEC-17/18 pattern)

---

## Next Steps After Plan Approval

1. **`/speckit.tasks`** - Generate detailed task breakdown with [P] markers for parallel execution
2. **Create PR #1 branch:** `git checkout -b pr1-foundation`
3. **Start Phase 1 implementation:** Tailwind config extensions
4. **Concurrent work:** While coding PR #1, prepare PR #2 section components in separate branch

---

**Plan Status:** Ready for Review
**Estimated Implementation:** 6 PRs, ~1,380 LOC total, stacked cascade-forward strategy
**Risk Level:** Low (validated patterns from SPEC-17/18, constitutional compliance verified)
