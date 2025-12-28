# SPEC-12 WMA Template - Dependencies, Acceptance Criteria, and Open Questions

**Created**: 2025-12-27
**Purpose**: Sections to be integrated into SPEC-12-wma-template.md

---

## Dependencies

### Internal Dependencies

- **SPEC-06** (Astro Content Collections): WMA schema definition with frontmatter validation
- **SPEC-09** (AdventureHero): Hero component for page headers
- **SPEC-10** (AdventureQuickStats): Stats grid component for area metrics
- **SPEC-11** (Adventure Shared Components):
  - AdventureGettingThere (directions)
  - AdventureGearChecklist (recommended gear)
  - AdventureRelatedShop (shop category links)
- **Type System**: `wv-wild-web/src/types/adventure.ts` for Zod schemas and TypeScript types
- **Icon System**: `STAT_ICON_PATHS` constant for reusable SVG icons
- **Design Tokens**: `src/styles/global.css` for brand colors and fonts

### External Dependencies

- **Astro**: v4.0+ for content collections and component islands
- **Zod**: v3.22+ for runtime schema validation and type inference
- **Tailwind CSS**: v3.4+ for styling utilities
- **TypeScript**: v5.0+ for type safety

### Reference Implementation

- **elk-river.astro** (463 lines): Canonical WMA page structure to extract into template
- **Other WMA pages** (533+ lines each): Target pages for migration to template system

---

## Acceptance Criteria

### Component Architecture
- [ ] WMATemplate.astro created in `wv-wild-web/src/layouts/`
- [ ] Template extracts 62% of duplicated layout code from WMA pages
- [ ] Template uses all SPEC-09/10/11 adventure components correctly
- [ ] Template reduces WMA page length from 533 lines to <150 lines (content-only)
- [ ] 6 new WMA-specific components created in `src/components/adventure/`:
  - [ ] AdventureFeatureSection.astro
  - [ ] AdventureCampingList.astro
  - [ ] AdventureAmenitiesGrid.astro
  - [ ] AdventureCTA.astro
  - [ ] AdventureWhatToFish.astro
  - [ ] AdventureWhatToHunt.astro

### Schema & Type Safety
- [ ] 8 WMA fields added to adventures schema in `content.config.ts`:
  - [ ] wma_acreage (number, optional)
  - [ ] wma_county (string, optional)
  - [ ] wma_species (array, optional)
  - [ ] wma_fishing_waters (array, optional)
  - [ ] wma_facilities (array, optional)
  - [ ] wma_access_points (array, optional)
  - [ ] wma_regulations (object, optional)
  - [ ] wma_season_highlights (array, optional)
- [ ] Schema integrates with existing Content Collections (SPEC-06)
- [ ] TypeScript types inferred correctly from Zod schemas
- [ ] Backwards compatibility verified: existing adventures work without WMA fields

### Testing - Unit Tests (>40 total)
- [ ] Template props validation (15+ tests)
- [ ] WMA schema field validation (10+ tests)
- [ ] Component slot rendering (5+ tests)
- [ ] Missing props graceful degradation (5+ tests)
- [ ] Type inference tests (5+ tests)

### Testing - E2E Tests (>30 total)
- [ ] Visual regression: Hero section renders correctly (5+ tests)
- [ ] Visual regression: Stats grid matches existing layout (5+ tests)
- [ ] Visual regression: Getting There section formatting (5+ tests)
- [ ] Visual regression: Gear checklist grid responsive (5+ tests)
- [ ] Navigation: All internal links functional (5+ tests)
- [ ] Accessibility: WCAG 2.1 AA compliance verified (5+ tests)

### Accessibility (WCAG 2.1 AA - 100%)
- [ ] All sections have `aria-labelledby` with unique IDs
- [ ] Heading hierarchy valid (h1 → h2 → h3, no skips)
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast ratios meet 4.5:1 minimum
- [ ] `prefers-reduced-motion` respected for animations
- [ ] Screen reader testing passes with NVDA/JAWS

### WVWO Aesthetic Compliance
- [ ] ZERO forbidden fonts (Inter, Poppins, DM Sans, etc.)
- [ ] ZERO rounded-md/lg/xl corners (rounded-sm ONLY)
- [ ] ZERO purple/pink/neon colors (brand palette only)
- [ ] ZERO glassmorphism or backdrop-blur effects
- [ ] Brand colors used correctly: sign-green, brand-brown, brand-cream, brand-orange
- [ ] Typography: font-display for headings, font-body for content
- [ ] Orange usage <5% of screen (primary CTAs only)

### Code Quality
- [ ] PR score >90/100 from 10-agent queen-led review
- [ ] No TypeScript errors or warnings
- [ ] ESLint passes with zero violations
- [ ] Prettier formatting applied consistently

### Documentation
- [ ] Migration guide: How to convert existing WMA pages to template
- [ ] Usage examples: Minimal WMA page using template
- [ ] Props documentation: All template props explained with defaults
- [ ] Content authoring guide: What content Kim needs to provide per WMA

---

## Open Questions

### 1. Template Layout Strategy
**Question**: Should the WMA template be a Layout component (`src/layouts/WMATemplate.astro`) or a page template pattern (`src/pages/adventures/[...slug].astro`)?

**Options**:
- **Layout approach**: WMA pages import `<WMATemplate>` and pass frontmatter as props
- **Dynamic route approach**: Single `[...slug].astro` file fetches Content Collection entry

**Decision needed**: Layout approach gives Kim more control per page; dynamic route enforces consistency but less flexibility.

---

### 2. Content Collections Migration
**Question**: Should SPEC-12 include migrating all 8+ WMA pages to Content Collections, or just create the template with manual frontmatter?

**Context**: SPEC-06 established Content Collections schema, but current WMA pages use inline frontmatter.

**Decision needed**: Full migration adds scope but improves long-term maintainability. Manual frontmatter is faster but technical debt.

---

### 3. Schema Extensibility
**Question**: Should the WMAFrontmatterSchema be strict (reject unknown properties) or permissive (allow extra fields for future features)?

**Trade-offs**:
- **Strict**: Type safety, catches typos, enforces consistency
- **Permissive**: Future-proof, allows Kim to add custom fields without code changes

**Decision needed**: Strict schema with `.strict()` or flexible with `.passthrough()`?

---

### 4. Component Composition Order
**Question**: What is the canonical section order for WMA pages?

**Current elk-river.astro order**:
1. Hero (AdventureHero)
2. Quick Stats (AdventureQuickStats)
3. Area Description (prose)
4. Hunting Opportunities (prose)
5. Getting There (AdventureGettingThere)
6. Gear Checklist (AdventureGearChecklist)
7. Shop Related (AdventureRelatedShop)

**Decision needed**: Enforce this order in template, or allow reordering via slot composition?

---

### 5. Navigation Integration
**Question**: Should the template include WMA-specific navigation (breadcrumbs, previous/next WMA links), or delegate to global layout?

**Context**: SPEC-07B consolidated navigation. WMA pages might need "Next WMA: Elk River →" links.

**Decision needed**: Template responsibility vs global layout responsibility for WMA-specific navigation.

---

## Integration Notes

These sections are ready to be integrated into `SPEC-12-wma-template.md` in the appropriate locations:

1. **Dependencies** section goes after Technical Design
2. **Acceptance Criteria** section replaces the placeholder
3. **Open Questions** section goes near the end before Implementation Plan

All criteria are specific, measurable, and testable per requirements.
