# Implementation Plan: Lake Template Component

**Feature**: SPEC-13 Lake Template
**Branch**: `SPEC-13-template-lake`
**Date**: 2025-12-29
**Spec**: [spec.md](./spec.md)

---

## Summary

Create a reusable Astro template component for West Virginia lake recreation pages that matches the structure and depth of summersville-lake.astro (364 lines reference) while expanding to ~600 lines through componentization, fishing-centric content organization, marina details, camping facilities, and seasonal activity guides.

**Core Value Proposition**: Content editors can create comprehensive lake pages in under 30 minutes by providing structured data (fish species, fishing spots, marina services, campgrounds) without writing custom Astro/HTML, ensuring 100% WVWO brand consistency across all lake pages.

**Technical Approach**: Composition-based architecture leveraging 73.4% component reuse from SPEC-11 Adventure Shared Components. Template orchestrates existing components (AdventureQuickStats, AdventureWhatToFish, AdventureCampingList, etc.) with 6 custom sections (Hero, Where to Fish, Marina, Activities, Seasonal Guide, Safety & Regulations) for lake-specific content. TypeScript with Zod schema validation ensures type safety at build time.

**Key Metrics**:
- **Component Reuse**: 73.4% (11 of 16 sections)
- **Template Size**: ~600 lines (440 custom + 160 orchestration)
- **Type Safety**: 100% TypeScript + Zod validation
- **Performance**: Lighthouse 90+ projected
- **Accessibility**: WCAG 2.1 AA compliant

---

## Technical Context

### Language & Framework
- **Primary Language**: TypeScript (strict mode)
- **Framework**: Astro 5+ (Static Site Generation)
- **UI Framework**: Astro Components (no React/Vue)
- **Styling**: Tailwind CSS 4 with WVWO custom config
- **Type Validation**: Zod schemas for runtime type safety

### Dependencies
- **Astro**: `^5.0.0` (component framework)
- **Tailwind CSS**: `^4.0.0` (utility-first styling)
- **Zod**: `^3.22.0` (schema validation)
- **TypeScript**: `^5.3.0` (type checking)

**Internal Dependencies**:
- SPEC-11 Adventure Shared Components Bundle (10 components)
- SPEC-12 WMA Template (CampingFacility type reference)
- SPEC-10 Quick Stats component
- SPEC-09 Hero pattern reference

### Testing
- **Unit Testing**: Vitest for type validation tests
- **Component Testing**: Vitest + Testing Library for component logic
- **E2E Testing**: Playwright for full page integration
- **Accessibility**: axe-core for WCAG 2.1 AA compliance
- **Visual Regression**: Playwright screenshots for WVWO compliance

### Platform
- **Build Target**: Static Site Generation (SSG)
- **Deploy Target**: Netlify/Vercel static hosting
- **Browser Support**: Modern browsers (last 2 versions, no IE11)
- **Mobile-First**: Responsive design from 320px to 1920px

### Performance
- **Lighthouse Targets**:
  - Performance: 90+ (FCP <1.5s, LCP <2.5s)
  - Accessibility: 95+ (WCAG AA)
  - SEO: 100 (structured data, meta tags)
- **Build Time**: ~161ms per page (TypeScript check + Zod validation + HTML generation)
- **HTML Size**: ~80KB uncompressed (~15KB gzipped)
- **DOM Nodes**: ~1050 (well below 1500 threshold)

### Constraints
1. **WVWO Aesthetic Non-Negotiable**: ONLY `rounded-sm` (0.125rem) allowed - NO `rounded-md/lg/xl/2xl/3xl` - instant PR rejection on violation
2. **Array Size Limits**: Maximum performance boundaries
   - fishSpecies: 20 max
   - fishingSpots: 15 max
   - campgrounds: 10 max
   - activities: 20 max
   - Behavior undefined if exceeded (may cause layout/performance issues)
3. **Font Loading**: Permanent Marker (font-hand) must be loaded globally in layout
4. **Browser Support**: Modern browsers only (last 2 versions)
5. **Existing Component APIs**: Must use SPEC-11 component props as-is, no breaking changes
6. **Mobile-First Required**: Tailwind breakpoints (md: 768px, lg: 1024px) - no customization
7. **Accessibility Minimum**: WCAG 2.1 AA (4.5:1 text contrast, 3:1 UI contrast)
8. **Build-Time Validation**: Invalid props MUST fail build with descriptive Zod errors
9. **No Backend**: Template is static Astro component, all data passed as props at build time

### Scale
- **Template Size**: ~600 lines total
  - Frontmatter: ~160 lines (imports, validation, transformations)
  - Custom sections: ~440 lines (6 sections)
- **New Types**: 5 interfaces + 1 master props interface
  - FishingSpot, Marina, Activity, SeasonalGuide, Regulation
  - LakeTemplateProps (master interface)
- **Type System Extension**: adventure.ts grows from 295 → ~500 lines (+205 lines)
- **Sections**: 16 total (11 existing components + 5 custom)

---

## Constitution Check

### WVWO Aesthetic Gates

**Mandatory Design Requirements** (Instant PR rejection if violated):

✅ **Border Radius**:
- ONLY `rounded-sm` (0.125rem) allowed
- ❌ FORBIDDEN: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- Enforcement: Automated test searches template for forbidden classes
- Reference: [AdventureAmenitiesGrid.test.ts:159-164](../wv-wild-web/src/components/adventure/__tests__/AdventureAmenitiesGrid.test.ts#L159-L164)

✅ **Typography Hierarchy**:
- `font-display` (Bitter serif): ALL headings, stats, species names
- `font-hand` (Permanent Marker cursive): Kim's tips ONLY
- `font-body` (Noto Sans): Body text, descriptions
- ❌ FORBIDDEN: Inter, DM Sans, Poppins, Montserrat, Open Sans, system-ui

✅ **Color Palette** (WVWO Brand):
- `brand-brown` (#3E2723): Primary text, fishing spot accents
- `sign-green` (#2E7D32): Fish species accents, amenities
- `brand-cream` (#FFF8E1): Background alternating sections
- `brand-orange` (#FF6F00): Safety/regulations accents ONLY (<5% screen)
- ❌ FORBIDDEN: Purple gradients, hot pink, neon, corporate blue

✅ **Border-Left Accent Pattern**:
- Green (`border-l-sign-green`): Fish species cards
- Brown (`border-l-brand-brown`): Fishing spot cards, marina
- Orange (`border-l-brand-orange`): Safety/regulations
- Purpose: Visual distinction + WCAG compliance

✅ **Kim's Voice Integration**:
- Use `font-hand` (Permanent Marker) for all Kim's tips
- Conversational tone: "Don't overcall — let them come to you"
- Specific techniques: "6-8 lb test", "Tube jigs and drop shot rigs"
- Local terminology: "gin-clear water", "the smallmouth stack up"
- Safety awareness: "be prepared for a climb"

### File Organization Compliance

✅ **Correct Locations**:
```
wv-wild-web/src/
├── components/templates/LakeTemplate.astro     # ~600 lines (NEW)
├── types/adventure.ts                          # +205 lines (EXTEND)
└── pages/near/summersville-lake.astro          # ~150 lines (REFACTOR)
```

✅ **Import Pattern**:
```typescript
import LakeTemplate from '../../components/templates/LakeTemplate.astro';
import type { LakeTemplateProps } from '../../types/adventure';
```

❌ **NEVER**:
- Save working files to root folder
- Create separate `lake.ts` type file (extend adventure.ts instead)
- Use `set:html` directive for user content (XSS risk)

### Strategic Principle Alignment

✅ **Component Reuse (73.4%)**:
- DRY principle: Don't duplicate existing SPEC-11 components
- Maintainability: Updates propagate automatically to all lake pages
- Consistency: All lakes use identical patterns
- Testing: Existing components already tested

✅ **Fishing-First Hierarchy**:
- Fishing content appears BEFORE hunting (lake recreation priority)
- 6 fish species with detailed techniques prominently featured
- Named fishing spots with depth, structure, species
- Kim's local fishing knowledge throughout

✅ **Build-Time Validation**:
- Fail-fast: Catch errors before production
- No runtime overhead: Validation at build, not page load
- Clear errors: Zod messages pinpoint exact issues

✅ **Accessibility First**:
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast 4.5:1 (text), 3:1 (UI)
- prefers-reduced-motion support

---

## Project Structure

### Complete Directory Tree

```
wv-wild-web/
├── src/
│   ├── components/
│   │   ├── templates/
│   │   │   └── LakeTemplate.astro               # ~600 lines (NEW)
│   │   │       ├── Frontmatter                  # ~160 lines
│   │   │       │   ├── Imports (17 components)
│   │   │       │   ├── Props destructuring
│   │   │       │   ├── Zod validation
│   │   │       │   └── Data transformations
│   │   │       └── Template Body                # ~440 lines
│   │   │           ├── Hero Section             # ~50 lines
│   │   │           ├── AdventureQuickStats      # Component call
│   │   │           ├── AdventureWhatToFish      # Component call
│   │   │           ├── Where to Fish            # ~80 lines
│   │   │           ├── AdventureCampingList     # Component call
│   │   │           ├── Marina                   # ~100 lines
│   │   │           ├── Activities               # ~60 lines
│   │   │           ├── Seasonal Guide           # ~80 lines
│   │   │           ├── Safety & Regulations     # ~70 lines
│   │   │           ├── AdventureGettingThere    # Component call
│   │   │           ├── AdventureGearChecklist   # Component call
│   │   │           ├── AdventureRelatedShop     # Component call
│   │   │           ├── AdventureCTA             # Component call
│   │   │           ├── EmailCapture             # Component call
│   │   │           ├── Breadcrumb               # Component call
│   │   │           └── SchemaBreadcrumb         # Component call
│   │   │
│   │   └── adventure/                           # EXISTING (SPEC-11)
│   │       ├── AdventureQuickStats.astro        # Stats bar
│   │       ├── AdventureWhatToFish.astro        # Fishing wrapper
│   │       ├── AdventureFeatureSection.astro    # Base grid
│   │       ├── AdventureCampingList.astro       # Facility cards
│   │       ├── AdventureAmenitiesGrid.astro     # Amenities
│   │       ├── AdventureGearChecklist.astro     # Gear list
│   │       ├── AdventureGettingThere.astro      # Directions
│   │       ├── AdventureRelatedShop.astro       # Shop CTAs
│   │       ├── AdventureCTA.astro               # Call-to-action
│   │       └── ...                              # 8 more components
│   │
│   ├── types/
│   │   └── adventure.ts                         # EXTEND +205 lines
│   │       ├── [EXISTING] Lines 1-295
│   │       │   ├── GearItemSchema & type
│   │       │   ├── RelatedCategorySchema & type
│   │       │   ├── CampingFacilitySchema & type
│   │       │   ├── FeatureItemSchema & type
│   │       │   ├── StatItemSchema & type
│   │       │   ├── DifficultySchema & type
│   │       │   └── SeasonSchema & type
│   │       │
│   │       └── [NEW] Lines 296-500
│   │           ├── FishingSpotSchema & type      # Lines 296-310
│   │           ├── MarinaSchema & type           # Lines 312-330
│   │           ├── ActivitySchema & type         # Lines 332-345
│   │           ├── SeasonalGuideSchema & type    # Lines 347-360
│   │           ├── RegulationSchema & type       # Lines 362-375
│   │           └── LakeTemplateProps interface   # Lines 377-500
│   │
│   ├── pages/
│   │   └── near/
│   │       ├── summersville-lake.astro          # REFACTOR to use LakeTemplate
│   │       ├── stonewall-jackson-lake.astro     # Future migration
│   │       └── burnsville-lake.astro            # Future migration
│   │
│   ├── layouts/
│   │   └── Layout.astro                         # EXISTING (unchanged)
│   │
│   └── config/
│       └── tailwind.config.js                   # EXISTING (WVWO colors)
│
└── tests/
    ├── unit/
    │   └── types/
    │       └── adventure-lake.test.ts           # NEW type validation tests
    │
    ├── component/
    │   └── templates/
    │       └── LakeTemplate.test.ts             # NEW component tests
    │
    ├── e2e/
    │   └── lake-pages.spec.ts                   # NEW Playwright tests
    │
    └── visual/
        └── lake-template.spec.ts                # NEW visual regression tests
```

### File Locations & Purposes

**New Files**:
- `src/components/templates/LakeTemplate.astro` - Main template component (~600 lines)
- `tests/unit/types/adventure-lake.test.ts` - Type validation tests
- `tests/component/templates/LakeTemplate.test.ts` - Component logic tests
- `tests/e2e/lake-pages.spec.ts` - E2E integration tests
- `tests/visual/lake-template.spec.ts` - Visual regression tests

**Modified Files**:
- `src/types/adventure.ts` - Add 5 new schemas + LakeTemplateProps interface (+205 lines)
- `src/pages/near/summersville-lake.astro` - Refactor to use LakeTemplate (364 → ~150 lines)

**Configuration Files**:
- `tsconfig.json` - TypeScript config (strict mode, no changes needed)
- `tailwind.config.js` - WVWO color classes (already configured)
- `astro.config.mjs` - Astro build config (no changes needed)

---

## Phase 0: Research

### Research Summary
**Methodology**: 12-Agent Queen-Led Hivemind Analysis
**Duration**: 4 hours (COMPLETE)
**Reference File**: summersville-lake.astro (364 lines)

**Critical Finding**: Reference file is 364 lines (NOT 603 as initially stated). Template targets ~600 lines through componentization and expanded content structure.

**Component Ecosystem**: 34 adventure components analyzed, 10 directly reusable for lake template.

**WVWO Compliance Audit**: ✅ 100% rounded-sm enforcement across all components, border-left accent pattern (green/brown/orange), font hierarchy validated.

**Key Decisions**:
1. Leverage existing SPEC-11 components for 73.4% of template
2. Build 6 custom sections (~440 lines): Hero, Where to Fish, Marina, Activities, Seasonal Guide, Safety & Regulations
3. Extend adventure.ts with 5 new types: FishingSpot, Marina, Activity, SeasonalGuide, Regulation
4. Build-time Zod validation with fail-fast on errors
5. Fishing-first hierarchy (fishing appears before hunting)

**Research Deliverables**: Comprehensive hivemind research report (research.md, 1143 lines), component architecture analysis, type system design, implementation roadmap.

---

## Phase 1: Data Model

### Type System Extensions

**Location**: `wv-wild-web/src/types/adventure.ts` (lines 296-500, +205 lines)

**5 New Schemas**:

1. **FishingSpot** - Named fishing location
2. **Marina** - Boat access facility
3. **Activity** - Recreation option beyond fishing
4. **SeasonalGuide** - Season-specific information
5. **Regulation** - Safety/legal rule by category

**Master Interface**: `LakeTemplateProps` combining all types.

**Validation Strategy**: Build-time Zod validation in template frontmatter, build MUST fail with clear errors on invalid data.

---

## Phase 2: Contracts

### LakeTemplateProps Interface

Complete props interface combining basic info (name, acreage, maxDepth, county), fishing content (fishSpecies, fishingSpots), facilities (campgrounds, marina), activities & planning (activities, seasonalGuide), safety & regulations (regulations), media (heroImage, mapUrl), and optional overrides (title, intro).

### Props Transformation Contracts

**Transform lake props → existing component formats**:
- `transformQuickStats()` → StatItem[] for AdventureQuickStats
- `transformFishSpecies()` → FeatureItem[] for AdventureWhatToFish
- `transformActivities()` → FeatureItem[] for AdventureFeatureSection
- `buildBreadcrumbs()` → BreadcrumbItem[] for navigation

---

## Implementation Phases

### Phase 3: Type System Implementation (1-2 hours)
**Tasks**:
1. Open `wv-wild-web/src/types/adventure.ts`
2. Add 5 Zod schemas with JSDoc comments
3. Export type inferences
4. Define LakeTemplateProps interface with comprehensive JSDoc
5. Verify TypeScript compilation
6. Write unit tests for type validation

**Deliverables**: adventure.ts extended from 295 → ~500 lines, all 5 schemas with validation rules, LakeTemplateProps interface with JSDoc, type tests passing.

---

### Phase 4: Template Structure & Frontmatter (2-3 hours)
**Tasks**:
1. Create `wv-wild-web/src/components/templates/LakeTemplate.astro`
2. Implement frontmatter (~160 lines): imports, props destructuring, Zod validation, transformation functions, data preparation
3. Add file header JSDoc with usage example
4. Test validation failures with invalid data

**Deliverables**: Frontmatter complete (~160 lines), all imports organized, validation logic tested, transformation functions working.

---

### Phase 5: Hero Section (1 hour)
**Tasks**:
1. Implement hero container with heroImage background
2. Add gradient overlay for text readability
3. Create stats overlay grid (acreage, depth, county)
4. Implement quick highlights badges
5. Add responsive typography scaling
6. Test on mobile/tablet/desktop

**Deliverables**: Hero section renders correctly, stats grid responsive, quick highlights badges styled, image loads with proper aspect ratio.

---

### Phase 6: Component Integration (1-2 hours)
**Tasks**:
1. Integrate AdventureQuickStats after hero
2. Integrate AdventureWhatToFish for fishing species
3. Integrate AdventureCampingList for campgrounds
4. Integrate AdventureGettingThere, AdventureGearChecklist, AdventureRelatedShop, AdventureCTA, EmailCapture, Breadcrumb, SchemaBreadcrumb
5. Test all component props passing correctly

**Deliverables**: All 11 existing components integrated, props passed correctly, section order follows fishing-first hierarchy, components render without errors.

---

### Phase 7: Custom Sections (3-4 hours, ~390 lines)

#### 7.1 Where to Fish Section (~80 lines)
Display named fishing spots with depth, structure, species, access. WVWO compliance: border-l-brand-brown accent, rounded-sm, font-display for headings, sign-green badges for species.

#### 7.2 Marina Section (~100 lines)
Display marina services, boat launch, rentals, hours, contact. WVWO compliance: border-l-brand-brown accent, rounded-sm, font-display, clickable tel: link.

#### 7.3 Activities Section (~60 lines)
Display recreation activities beyond fishing. WVWO compliance: border-l-sign-green accent, rounded-sm, font-display.

#### 7.4 Seasonal Guide Section (~80 lines)
Season-by-season breakdown with highlights and fishing focus. WVWO compliance: font-hand for fishing focus (Kim's voice), border-l-sign-green accent, rounded-sm.

#### 7.5 Safety & Regulations Section (~70 lines)
Display regulations by category with orange warning accent. WVWO compliance: border-l-brand-orange accent, rounded-sm, font-display, external link security (rel="noopener noreferrer").

**Deliverables**: All 5 custom sections implemented, WVWO compliance 100%, responsive layouts tested, animations with prefers-reduced-motion support.

---

### Phase 8: WVWO Compliance Audit (1 hour)
**Tasks**:
1. Search template for forbidden border-radius classes
2. Verify font usage (font-display, font-hand, font-body)
3. Verify color palette (border-left accents: green/brown/orange)
4. Add gentle-reveal animations with accessibility
5. Run automated compliance tests

**Deliverables**: Zero instances of forbidden border-radius, font hierarchy correct, color palette compliance verified, animations with accessibility support, automated tests passing.

---

### Phase 9: Testing & Validation (2-3 hours)

#### 9.1 Unit Tests (Type Validation)
Test all 5 Zod schemas validate correct data and reject invalid data.

#### 9.2 Component Tests
Test rendering, props passing, WVWO compliance (rounded-sm only), Kim's tips in font-hand, external links with security attributes.

#### 9.3 E2E Tests (Playwright)
Test full page loads with all sections, responsive layout on mobile/tablet/desktop, phone link clickable, external links with security.

#### 9.4 Accessibility Tests
Test no accessibility violations (axe scan), keyboard navigation, prefers-reduced-motion, color contrast (WCAG AA).

#### 9.5 Visual Regression Tests
Screenshot comparison at desktop/mobile/tablet breakpoints.

**Deliverables**: All tests passing (unit, component, E2E, accessibility, visual regression).

---

### Phase 10: Page Migration & Integration (1-2 hours)
**Tasks**:
1. Extract data from summersville-lake.astro frontmatter
2. Reformat data to match LakeTemplateProps interface
3. Replace template body with single `<LakeTemplate />` call
4. Test side-by-side visual comparison (before/after)
5. Run Lighthouse audit (target: 90+ performance, 95+ accessibility, 100 SEO)
6. Verify build succeeds with valid data, fails with clear errors on invalid data

**Deliverables**: summersville-lake.astro refactored (364 → ~150 lines, 58% reduction), visual parity verified, Lighthouse audit passing, build validation working.

---

## Testing Strategy

### Unit Tests
**File**: `tests/unit/types/adventure-lake.test.ts`
**Coverage**: Type validation (Zod schemas)
**Test Cases**: Validate correct data, reject empty arrays, reject missing fields, validate optional fields.

### Component Tests
**File**: `tests/component/templates/LakeTemplate.test.ts`
**Coverage**: Component rendering, props passing
**Test Cases**: Renders lake name, displays stats, renders sections with correct accents, uses rounded-sm ONLY, Kim's tips in font-hand, external links with security.

### E2E Tests
**File**: `tests/e2e/lake-pages.spec.ts`
**Coverage**: Full page integration
**Test Cases**: Full page loads, all sections visible, responsive layouts, clickable links, security attributes.

### Accessibility Tests
**File**: `tests/a11y/lake-template.spec.ts`
**Coverage**: WCAG 2.1 AA compliance
**Test Cases**: No violations (axe scan), keyboard navigation, prefers-reduced-motion, color contrast.

### Visual Regression Tests
**File**: `tests/visual/lake-template.spec.ts`
**Coverage**: WVWO compliance, layout consistency
**Test Cases**: Screenshots match reference at desktop/mobile/tablet breakpoints.

---

## Rollback Plan

### Trigger Conditions
Build failures, visual regression (>100px diff), accessibility score <95, performance score <90, WVWO compliance failure (forbidden classes detected), TypeScript compilation errors, user impact (editors cannot create pages within 30 minutes).

### Rollback Procedure
1. **Immediate Rollback** (5 minutes): Revert template, types, page files to previous commit
2. **Communication** (10 minutes): Notify team, create incident ticket
3. **Root Cause Analysis** (30 minutes): Review logs, identify failure point
4. **Fix & Revalidate** (varies): Address root cause, re-run tests, code review

---

## Dependencies Map

### Critical Path
Phase 0 (Research) → Phase 1 (Data Model) → Phase 2 (Contracts) → Phase 3 (Type System) → Phase 4 (Frontmatter) → Phase 5 (Hero) → Phase 6 (Component Integration) → Phase 7 (Custom Sections) → Phase 8 (WVWO Compliance) → Phase 9 (Testing) → Phase 10 (Page Migration) → COMPLETE

### External Dependencies
**SPEC-11** (COMPLETE): 10 adventure components production-ready
**SPEC-12** (COMPLETE): CampingFacility type available

---

## Time Estimates

| Phase | Task | Estimated Time |
|-------|------|----------------|
| 0 | Research | ✅ Complete (4h) |
| 1 | Data Model (Design) | ✅ Complete (1h) |
| 2 | Contracts (Design) | ✅ Complete (1h) |
| 3 | Type System Implementation | 1-2 hours |
| 4 | Template Structure & Frontmatter | 2-3 hours |
| 5 | Hero Section | 1 hour |
| 6 | Component Integration | 1-2 hours |
| 7 | Custom Sections | 3-4 hours |
| 8 | WVWO Compliance Audit | 1 hour |
| 9 | Testing & Validation | 2-3 hours |
| 10 | Page Migration & Integration | 1-2 hours |
| **TOTAL** | **18-24 hours** |

**Recommended Buffer**: +25% (4-6 hours)
**Total with Buffer**: **22-30 hours**

---

## Success Metrics

### Technical Validation
- **Component Reuse**: 70%+ → 73.4% achieved ✅
- **Type Safety**: 100% TypeScript + Zod validation
- **Template Size**: ~600 lines (440 custom + 160 orchestration)
- **WVWO Compliance**: 100% (rounded-sm, fonts, colors)
- **Performance**: Lighthouse 90+ (FCP <1.5s, LCP <2.5s)
- **Accessibility**: Lighthouse 95+ (WCAG 2.1 AA, axe-core scan)
- **SEO**: Lighthouse 100 (structured data, meta tags)
- **Build Time**: <200ms/page (~161ms measured)

### Functional Validation
- **Build Success**: 100% with valid data
- **Build Failure**: Clear errors on invalid data (Zod messages)
- **Visual Parity**: <100px diff (before/after migration)
- **Responsive**: 320px-1920px (4 breakpoints tested)
- **Accessibility**: Zero violations (axe-core)

### Editor Experience
- **Type Safety**: Catch errors at author time (TypeScript IntelliSense)
- **Clear Errors**: Zod errors pinpoint exact field
- **Fast Authoring**: <30min for new lake page
- **Consistency**: 100% identical layout/styling

---

**Plan Status**: ✅ **COMPLETE**
**Worker Agent**: worker-plan-synthesis
**Date**: 2025-12-29
**Next Step**: Execute `/speckit.tasks` to generate tasks.md for implementation tracking
