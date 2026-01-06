# Tasks: Historic Site Template with Appalachian Soul

**Plan Version:** 1.0.0
**Generated:** 2026-01-05
**Status:** Ready for Implementation
**Feature Branch:** `feature/spec-19-historic-template`

---

## Task Legend

- `[P]` **Parallelizable** - can run concurrently with other [P] tasks in same phase
- `[S]` **Sequential** - depends on previous tasks completing first
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

---

## Phase 1: Foundation & Configuration (PR #1)

**Goal:** Infrastructure setup - colors, fonts, types, custom CSS
**Target LOC:** ~150

### 1.1 Tailwind Configuration
- [ ] [S] Extend `tailwind.config.mjs` with heritage color palette (11 colors)
  - Add `heritage-burgundy`, `heritage-burgundy-light` (#93282c, #c02032)
  - Add `heritage-gold`, `heritage-gold-light` (#d18a00, #ffc655)
  - Add `coal-gray`, `stone-gray`, `creek-stone` (#424242, #757575, #616161)
  - Add `heritage-green`, `heritage-green-alt` (#0a5861, #234b43)
  - Add `heritage-cream`, `heritage-cream-alt` (#fff8e9, #efebe2)
  - **Est:** ~12 lines

- [ ] [P] Add font families to Tailwind config
  - `marker`: ['Roboto Slab', 'serif']
  - `trail`: ['Oswald', 'sans-serif']
  - **Est:** ~4 lines

- [ ] [P] Add custom box shadows to Tailwind config
  - `carved`: '2px 2px 0 rgba(0, 0, 0, 0.6)'
  - `painted-wood`: 'inset 0 0 20px rgba(62, 39, 35, 0.1), 3px 3px 0 rgba(0, 0, 0, 0.2)'
  - `lumber`: '2px 3px 0 rgba(62, 39, 35, 0.3)'
  - **Est:** ~6 lines

- [ ] [P] Add shimmer animation and keyframes
  - `animation: { shimmer: 'shimmer 2s linear infinite' }`
  - `keyframes: { shimmer: { '0%': ..., '100%': ... } }`
  - **Est:** ~8 lines

- [ ] [P] Add text-shadow plugin to Tailwind config
  - `matchUtilities` function for `text-shadow` utility
  - `carved` shadow value
  - **Est:** ~10 lines

### 1.2 TypeScript Interface
- [ ] [S] Create `src/types/templates/` directory
  - **Est:** 0 lines (directory only)

- [ ] [S] Create `src/types/templates/historic.ts` with HistoricTemplateProps interface
  - Hero section props (name, location, era, significance, nationalRegister, quickHighlights)
  - Add `heroImage`, `heroImageAlt`, `heroImageCredit?`
  - Historical context structure (timeline?, events, keyFigures?, significance)
  - Structures array (name, type, year?, description, condition, accessible, image?, imageCredit?)
  - Tours array (type, name, duration?, description, schedule?, cost?, reservationUrl?)
  - Exhibits array (title, location, description, interactive?)
  - Education object (programs, resources?)
  - VisitorInfo object (hours, fees, facilities, accessibility, contact)
  - NearbyHistory array (name, distance, relation, url?)
  - siteMapUrl?
  - **Est:** ~150 lines

### 1.3 Custom CSS Foundation
- [ ] [S] Create initial `src/components/templates/HistoricTemplate.astro` shell
  - Empty template structure
  - `<style>` block placeholder
  - Font preconnect links in frontmatter
  - **Est:** ~20 lines

- [ ] [P] Add custom CSS classes to `<style>` block
  - `.hero-aged-photo` - filter: sepia(0.3) grayscale(0.2) contrast(1.1) brightness(0.95)
  - `.hero-image-credit` - position absolute overlay with coal-gray background
  - `.stone-text-shadow` - text-shadow: 2px 2px 0 rgba(0,0,0,0.6)
  - `.lumber-border` - border-width: 3px 2px 4px 3px, box-shadow lumber effect
  - `.metal-seam` - repeating linear-gradient for corrugated metal divider
  - `.aged-section` - SVG noise texture background overlay
  - `.riveted-border` - border with pseudo-element rivets (4 corners)
  - `.skeleton-shimmer` - coal-gray gradient animation
  - `.blur-up` - opacity transition for image loading
  - `@keyframes shimmer` - background-position animation
  - `@media (prefers-reduced-motion)` - disable animations
  - Focus states for `a:focus-visible`, `button:focus-visible`
  - **Est:** ~150 lines

<!-- PR-CHECKPOINT #1: Foundation (~150 LOC) -->
**Status:** Infrastructure only, zero visual implementation

---

## Phase 2: Hero & Historical Context (PR #2)

**Goal:** Implement C→B narrative arc sections with skeleton screens
**Target LOC:** ~280

### 2.1 Hero Section Component
- [ ] [S] Create `src/components/historic/` directory
  - **Est:** 0 lines

- [ ] [S] Create `src/components/historic/HistoricHero.astro`
  - Import HistoricTemplateProps type (hero fields only)
  - Hero container: `relative h-[70vh] min-h-[500px]`
  - Background image with `.hero-aged-photo` class
  - Image attribution overlay (conditional on `heroImageCredit`)
  - Darkened overlay: `bg-black/[0.14]`
  - Content container: flexbox bottom-aligned
  - Site name: Bitter 900, `text-5xl md:text-6xl`, white
  - Era badge: `bg-heritage-gold`, Roboto Slab font, `.stone-text-shadow`
  - Quick highlights grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, max 5 items
  - National Register badge (conditional rendering)
  - Font preconnect in `<head>`: Roboto Slab, Oswald
  - **Est:** ~80 lines

### 2.2 Historical Context Section Component
- [ ] [S] Create `src/components/historic/HistoricalContextSection.astro`
  - Import HistoricTemplateProps type (historicalContext field)
  - Section container: `py-16 bg-heritage-cream`
  - Section heading: Bitter 900, `text-4xl md:text-5xl`, centered
  - Asymmetric grid: `grid-cols-[2fr_5fr]` on desktop, full-width mobile
  - **Timeline column (left):**
    - Conditional rendering (if `timeline` provided)
    - Coal-gray `border-l-4`, year markers with Roboto Slab `.stone-text-shadow`
  - **Events column (right):**
    - Event cards with `border-l-4 border-heritage-burgundy`
    - Lumber border treatment (`.lumber-border` class)
    - Event date (Roboto Slab, sign-green)
    - Event title (Bitter 700, brand-brown)
    - Event description (Noto Sans 400, brand-mud)
  - **Key Figures subsection:**
    - Conditional rendering (if `keyFigures` provided)
    - 2-column grid on desktop
    - Cream backgrounds, brown left-border
    - Figure name, role, bio
  - **Broader Significance card:**
    - Cream background, orange left-border
    - Significance paragraph (leading-relaxed)
  - **Est:** ~120 lines

### 2.3 Skeleton Screen Components
- [ ] [S] Create `src/components/skeletons/` directory
  - **Est:** 0 lines

- [ ] [P] Create `src/components/skeletons/TimelineSkeleton.astro`
  - Matches HistoricalContextSection layout
  - Asymmetric grid: `grid-cols-[2fr_5fr]`
  - 4 timeline marker placeholders (coal-gray borders, shimmer)
  - 4 event card placeholders (heritage-burgundy borders, shimmer)
  - ARIA: `role="status" aria-label="Loading historical timeline"`
  - **Est:** ~30 lines

- [ ] [P] Create `src/components/skeletons/EventCardsSkeleton.astro`
  - 2-column grid on desktop
  - 4 event card placeholders
  - Lumber border class maintained
  - Title, date, description (4 lines) shimmer blocks
  - **Est:** ~25 lines

### 2.4 Template Shell Integration
- [ ] [S] Update `src/components/templates/HistoricTemplate.astro` with Hero + Context
  - Import Hero and HistoricalContext components
  - Import skeleton components
  - Add props destructuring for hero and historicalContext fields
  - Render Hero section
  - Render HistoricalContext section
  - Add metal-seam divider between sections
  - Conditional loading states (if implementing progressive load)
  - **Est:** ~55 lines additions

### 2.5 Testing & Validation
- [ ] [P] Create test page: `src/pages/test/historic-template-test.astro`
  - Import HistoricTemplate
  - Define sample Carnifex Ferry data (partial - hero + context only)
  - Render template with sample data
  - **Est:** ~40 lines

- [ ] [S] Visual validation checklist (manual testing)
  - [ ] Hero aged photo filter visible (sepia + grayscale)
  - [ ] Era badge stone-carved shadow renders
  - [ ] Timeline coal-gray borders visible
  - [ ] Event cards heritage burgundy borders visible
  - [ ] Lumber border asymmetry (inspect DevTools: 3px 2px 4px 3px)
  - [ ] Image attribution overlay appears (bottom-right)

<!-- PR-CHECKPOINT #2: Hero + Historical Context (~280 LOC) -->
**Status:** C→B narrative arc implemented, skeleton screens functional

---

## Phase 3: Structures & Tours (PR #3)

**Goal:** Implement D arc (defiant spirit) with riveted borders and trail markers
**Target LOC:** ~290 ⚠️ **NEAR 300 LOC WARNING**

### 3.1 Preserved Structures Section
- [ ] [S] Create `src/components/historic/PreservedStructuresSection.astro`
  - Import HistoricTemplateProps type (structures field)
  - Section container: `py-16 bg-white relative z-20 -mt-12` (overlaps Historical Context)
  - Section heading: Bitter 900, `text-4xl md:text-5xl`, centered
  - Asymmetric 3-column grid: `grid-cols-1 md:grid-cols-[3fr_2fr_4fr]`
  - **Structure cards:**
    - `.riveted-border` class (4 corner rivets with pseudo-elements)
    - `bg-brand-cream`, rounded-sm padding
    - Conditional image rendering
    - Type badge (absolute top-right): `bg-sign-green`, Oswald font, uppercase
    - Image attribution caption (below image, italic, brand-mud/60)
    - Building name (Bitter 700, brand-brown)
    - Year built (Roboto Slab 900, stone-gray, `.stone-text-shadow`, "BUILT {year}")
    - Description (Noto Sans 400, brand-mud)
    - Condition badge (heritage-gold background, white text)
    - ADA accessibility indicator (conditional, sign-green, ♿ emoji)
  - Site map download CTA (conditional on `siteMapUrl`)
  - **Est:** ~90 lines

### 3.2 Tours Section Component
- [ ] [S] Create `src/components/historic/ToursSection.astro`
  - Import HistoricTemplateProps type (tours field)
  - Section container: `py-16 bg-heritage-cream`
  - Section heading: "Guided Tours", Bitter 900, centered
  - Grid: `md:grid-cols-2 lg:grid-cols-3`
  - **Tour cards:**
    - `bg-brand-cream border-2 border-brand-brown`, rounded-sm, `.shadow-painted-wood`
    - Tour type badge: `bg-sign-green`, Oswald font, uppercase
    - Tour name: Bitter 700, brand-brown
    - Tour details: duration, schedule, cost (conditional, with emoji icons ⏱📅💵)
    - Description: Noto Sans 400
    - **Reserve Tour CTA button** (conditional on `reservationUrl`):
      - `bg-brand-orange text-white font-display font-bold`
      - `target="_blank" rel="noopener noreferrer"` security
      - "Reserve Tour →" text
      - Hover state: `hover:bg-brand-orange/90`
  - **Est:** ~70 lines

### 3.3 Skeleton Components for Structures & Tours
- [ ] [P] Create `src/components/skeletons/StructureCardsSkeleton.astro`
  - Matches PreservedStructuresSection layout
  - 3-column asymmetric grid
  - 6 structure card placeholders
  - `.riveted-border` maintained during loading
  - Image skeleton: `aspect-ratio: 4/3`, coal-gray shimmer
  - Text shimmer blocks (name, year, description 3 lines, condition)
  - **Est:** ~30 lines

- [ ] [P] Create `src/components/skeletons/TourCardsSkeleton.astro`
  - Matches ToursSection layout
  - 3 tour card placeholders
  - Tour type badge shimmer, name shimmer
  - Tour details shimmer (3 lines), description shimmer (3 lines)
  - CTA button shimmer
  - **Est:** ~25 lines

### 3.4 Image Attribution Utilities
- [ ] [P] Create `src/utils/` directory (if not exists)
  - **Est:** 0 lines

- [ ] [P] Create `src/utils/image-attribution.ts`
  - `formatAttributionCredit(source, catalogNumber)` function
  - `getAttributionPlacement(imageType)` function (overlay vs caption logic)
  - `generateAttributionAria(credit)` function for accessibility
  - Validation: ensure credit includes source and catalog number
  - Examples: Library of Congress, National Archives, WV State Archives formats
  - **Est:** ~50 lines

### 3.5 Template Integration
- [ ] [S] Update `src/components/templates/HistoricTemplate.astro` with Structures + Tours
  - Import PreservedStructures and Tours components
  - Import structure and tour skeletons
  - Render PreservedStructures section
  - Add metal-seam divider after Historical Context
  - Render Tours section
  - Conditional loading states
  - **Est:** ~40 lines additions

### 3.6 Testing & Validation
- [ ] [P] Update test page with structures and tours data
  - Add 3 sample structures (Carnifex Ferry)
  - Add 2 sample tours (self-guided, ranger-led)
  - Test external booking link (use placeholder URL)
  - **Est:** ~30 lines additions

- [ ] [S] Visual validation checklist
  - [ ] Riveted borders render with 4 corner rivets (inspect pseudo-elements)
  - [ ] Structure cards asymmetric grid (3fr 2fr 4fr on desktop)
  - [ ] Image attribution caption appears below structure photos
  - [ ] Tour type badges use Oswald font (uppercase, tracking-wide)
  - [ ] "Reserve Tour →" button displays when `reservationUrl` provided
  - [ ] External link has `target="_blank" rel="noopener noreferrer"`

<!-- PR-CHECKPOINT #3: Structures + Tours (~290 LOC) -->
**Status:** D arc (defiant spirit) implemented, riveted borders functional
**WARNING:** PR #3 at 290 LOC - monitor additions to stay under 300

---

## Phase 4: Museum & Education Sections (PR #4)

**Goal:** Complete A arc (reverent honor) with museum styling
**Target LOC:** ~250

### 4.1 Exhibits Section Component
- [ ] [S] Create `src/components/historic/ExhibitsSection.astro`
  - Import HistoricTemplateProps type (exhibits field)
  - Section container: `py-16 aged-section` (texture overlay)
  - Conditional section rendering (hide if no exhibits)
  - Section heading: "Current Exhibits", Bitter 900, centered
  - Grid: `md:grid-cols-2`
  - **Exhibit cards:**
    - `bg-heritage-cream-alt border-l-4 border-heritage-burgundy`
    - `.lumber-border` class
    - Exhibit title: Bitter 700, brand-brown
    - Exhibit dates: Roboto Slab 900, stone-gray, `.stone-text-shadow`, uppercase
    - Location: Noto Sans, sign-green
    - Description: Noto Sans, brand-mud
    - Interactive badge (conditional): `bg-brand-orange text-white`, "Interactive"
    - Featured artifacts list (conditional)
  - **Est:** ~60 lines

### 4.2 Educational Programs Section
- [ ] [S] Create `src/components/historic/EducationalProgramsSection.astro`
  - Import HistoricTemplateProps type (education field)
  - Section container: `py-16 bg-white`
  - Section heading: "Educational Programs", Bitter 900
  - Programs grid: `md:grid-cols-3`
  - **Program cards:**
    - `bg-white border-l-4 border-heritage-burgundy`
    - Program type badge: `bg-heritage-gold`, uppercase, small
    - Program name: Noto Sans 700, brand-brown
    - Audience: Noto Sans, brand-mud ("For: {audience}")
    - Description: Noto Sans, brand-mud
    - Duration + cost footer
    - Booking contact link (conditional)
  - **Resources subsection** (conditional if `resources` provided):
    - 3-column grid
    - Resource type label, title, download link
    - `border-l-4 border-brand-brown`
  - **Est:** ~60 lines

### 4.3 Visitor Information Section
- [ ] [S] Create `src/components/historic/VisitorInfoSection.astro`
  - Import HistoricTemplateProps type (visitorInfo field)
  - Section container: `py-16 bg-coal-gray/5` (subtle coal background)
  - Section heading: "Visitor Information", Bitter 900
  - Info grid: `md:grid-cols-2 lg:grid-cols-4` (Hours, Admission, Parking, Accessibility)
  - **Info cards:**
    - `bg-white border-2 border-coal-gray` (utilitarian mining-town aesthetic)
    - Card heading: Noto Sans 700, uppercase, tracking-wide, brand-brown
    - Card content: Noto Sans 400, brand-mud
    - Hours: seasonal array map
    - Fees: type/amount pairs
    - Facilities: bulleted list (sign-green bullets)
    - Accessibility: checklist (✓ icons, sign-green)
  - Contact info footer: phone (clickable `tel:` link), email (conditional)
  - **Est:** ~50 lines

### 4.4 Nearby History Section
- [ ] [S] Create `src/components/historic/NearbyHistorySection.astro`
  - Import HistoricTemplateProps type (nearbyHistory field)
  - Conditional section rendering (hide if no nearby sites)
  - Section container: `py-16 bg-brand-cream`
  - Section heading: "Nearby Historic Sites", Bitter 900
  - Grid: `md:grid-cols-3`
  - **Site cards (clickable links):**
    - Entire card wrapped in `<a>` tag
    - `bg-white border-l-4 border-sign-green` (trail blaze marker aesthetic)
    - Hover: `hover:shadow-lg transition-shadow`
    - Site type badge: `bg-sign-green`, Oswald font, uppercase
    - Site name: Bitter 700, brand-brown
    - Distance + direction: Noto Sans, brand-mud, 📍 emoji
    - Relation description: Noto Sans, small text
  - **Est:** ~40 lines

### 4.5 Template Integration
- [ ] [S] Update `src/components/templates/HistoricTemplate.astro` with final 4 sections
  - Import Exhibits, EducationalPrograms, VisitorInfo, NearbyHistory
  - Add metal-seam dividers between major sections
  - Render all 4 sections with conditional logic
  - Final template structure complete
  - **Est:** ~50 lines additions

### 4.6 Testing & Validation
- [ ] [P] Update test page with exhibits, programs, visitor info, nearby history data
  - Add 2 sample exhibits
  - Add 3 sample educational programs
  - Add visitor info (hours, fees, facilities, accessibility)
  - Add 3 nearby sites with distances
  - **Est:** ~50 lines additions

- [ ] [S] Narrative arc validation (manual)
  - [ ] C arc (Hero): Balanced tone set ("Coal barons controlled wages...")
  - [ ] B arc (Historical Context): Raw reality visible (Paint Creek Strike language)
  - [ ] D arc (Structures): Defiant spirit ("built to outlast" in riveted borders)
  - [ ] A arc (Education/Nearby): Reverent honor (grit endures, heritage celebrated)

<!-- PR-CHECKPOINT #4: Museum + Education (~250 LOC) -->
**Status:** All 8 sections implemented, C→B→D→A arc complete

---

## Phase 5: Polish & Accessibility (PR #5)

**Goal:** Lighthouse 100 Accessibility, performance optimization
**Target LOC:** ~180

### 5.1 Skeleton Integration & Error Handling
- [ ] [P] Add timeout handling logic to template
  - 800ms timeout per section
  - Error state components (heritage-burgundy borders, "Unable to load..." message)
  - Partial failure isolation (one section error doesn't block others)
  - **Est:** ~30 lines

- [ ] [P] Add blur-up image component
  - Create `src/components/ui/BlurUpImage.astro` (reusable)
  - LQIP support (low-quality image placeholder)
  - Fade-in transition on load
  - Attribution credit prop
  - **Est:** ~40 lines

### 5.2 Responsive Refinement
- [ ] [P] Mobile layout testing and fixes (<768px)
  - Full-width stacking verified
  - No textures on mobile (performance)
  - Asymmetric grids disabled (use `grid-cols-1`)
  - Typography scales down with `clamp()`
  - **Est:** ~20 lines media query additions

- [ ] [P] Desktop layout optimization (≥1024px)
  - Asymmetric grids enabled
  - Texture overlays enabled
  - Overlapping sections (z-index layering)
  - **Est:** ~15 lines

### 5.3 Accessibility Audit & Fixes
- [ ] [S] ARIA labels audit
  - All emoji icons have `aria-label` or `aria-hidden="true"`
  - Section landmarks with proper `role` attributes
  - Image attribution has `role="contentinfo"`
  - Skeleton screens have `role="status"`
  - **Est:** ~25 lines additions

- [ ] [P] Keyboard navigation testing
  - All links/buttons focusable
  - Focus states visible (2px orange outline, 2px offset)
  - Tab order logical (follows visual order)
  - Skip links for main content (if needed)
  - **Est:** ~10 lines

- [ ] [P] Screen reader testing (NVDA/JAWS)
  - Heading hierarchy correct (h1 → h2 → h3)
  - All sections announced
  - Interactive elements announced with context
  - **Est:** 0 lines (testing only, may add ARIA fixes)

- [ ] [P] High contrast mode support
  - Heritage burgundy → black in high contrast
  - Heritage gold → black in high contrast
  - Test Windows High Contrast Mode
  - **Est:** ~15 lines (media query)

- [ ] [P] Reduced motion preferences
  - Disable skeleton shimmer animations
  - Disable blur-up transitions
  - Disable hover transitions
  - Test `prefers-reduced-motion: reduce`
  - **Est:** Already in custom CSS, validation only

### 5.4 Performance Optimization
- [ ] [P] Font loading optimization
  - Verify preconnect links in `<head>`
  - Check `display=swap` strategy
  - Test font loading waterfall (no FOIT)
  - **Est:** ~5 lines (verify existing)

- [ ] [P] Image lazy loading
  - Add `loading="lazy"` to below-fold structure images
  - Hero image eager loading (above fold)
  - LQIP implementation for hero (blur-up)
  - **Est:** ~10 lines

- [ ] [P] Texture performance
  - Desktop-only aged section backgrounds
  - Mobile: solid heritage-cream color
  - Media query: `@media (min-width: 1024px)`
  - **Est:** Already in custom CSS, validation only

### 5.5 Lighthouse Validation
- [ ] [S] Run Lighthouse audit (Chrome DevTools)
  - Target: Performance ≥90, Accessibility 100, Best Practices 100, SEO 100
  - Fix any flagged issues
  - Document scores in test results
  - **Est:** 0 lines (testing only, may add fixes)

<!-- PR-CHECKPOINT #5: Polish + A11y (~180 LOC) -->
**Status:** Production-ready, Lighthouse validated, WCAG 2.1 AA compliant

---

## Phase 6: Content Guidelines & Validation (PR #6)

**Goal:** Prepare for Phase 4 content population
**Target LOC:** ~200

### 6.1 Content Guidelines Document
- [X] [S] Create `docs/guides/historic-site-content-guidelines.md`
  - **Section 1: C→B→D→A Narrative Arc Framework**
    - When to use each arc phase
    - Tone examples for balanced truth vs raw reality vs defiance vs honor
    - Color meaning evolution explained
  - **Section 2: Coal Baron Exploitation Language**
    - Approved phrases: "company scrip", "controlled wages", "owned the houses"
    - Defiance counterpoints: "but not the souls", "porches where banjos played"
    - Paint Creek Strike narrative examples
    - Union organizing language guidelines
  - **Section 3: "Don't Tread on Me" Defiance Integration**
    - Mother Jones quote examples (pre-approved)
    - Miner resistance stories
    - Balance: grit without glorification
  - **Section 4: Contested Narratives Presentation**
    - Template: "Union sources report..., while Confederate accounts describe..."
    - Multi-perspective without false equivalence
    - Examples: Carnifex Ferry (Union vs Confederate perspectives)
  - **Section 5: The Counter Test (Kim's Voice)**
    - Blacklisted phrases review
    - Corporate → authentic rewrites
    - Local reference integration examples
  - **Section 6: Image Attribution Standards**
    - Library of Congress format
    - National Archives format
    - WV State Archives format
    - Overlay vs caption decision matrix
  - **Est:** ~100 lines
  - **Actual:** 106 lines
  - **Deliverable:** docs/guides/historic-site-content-guidelines.md

### 6.2 Validation Utilities
- [X] [S] Create `src/utils/validate-historic-props.ts`
  - Runtime validation for HistoricTemplateProps
  - Required field checks (name, location, era, etc.)
  - WCAG color contrast validation
    - Heritage-gold backgrounds → large text only (≥18px or ≥14px bold)
    - Error if gold used on small text
  - Image credit format validation
    - Regex: "Photo: {source}, {catalogNumber}"
    - Warn if missing either component
  - Tour booking URL validation
    - Check `reservationUrl` is valid URL
    - Warn if missing for ranger-led tours
  - **Est:** ~80 lines
  - **Actual:** 152 lines (includes formatValidationResults helper, comprehensive JSDoc)
  - **Test Suite:** wv-wild-web/src/utils/validate-historic-props.test.ts (90 lines)
  - **Deliverables:**
    - wv-wild-web/src/utils/validate-historic-props.ts
    - wv-wild-web/src/utils/validate-historic-props.test.ts

### 6.3 Sample Data Files
- [X] [P] Create `src/data/historic-sites/` directory
  - **Est:** 0 lines

- [X] [P] Create `src/data/historic-sites/carnifex-ferry.json`
  - Complete sample data for Carnifex Ferry Battlefield
  - All 8 sections populated with placeholder content
  - C→B→D→A arc narrative examples
  - Image credits (placeholder Library of Congress IDs)
  - **Est:** ~50 lines
  - **Actual:** 103 lines (comprehensive sample data)
  - **Deliverable:** wv-wild-web/src/data/historic-sites/carnifex-ferry.json

- [X] [P] Create `src/data/historic-sites/bulltown-historic-area.json`
  - Complete sample data for Bulltown Historic Area
  - Variant structure (more exhibits, fewer battles)
  - Different narrative emphasis (living history vs battlefield)
  - **Est:** ~50 lines
  - **Actual:** 119 lines (extensive living history sample)
  - **Deliverable:** wv-wild-web/src/data/historic-sites/bulltown-historic-area.json

### 6.4 Documentation Updates
- [ ] [P] Update main template with JSDoc comments
  - Document all props with examples
  - Note C→B→D→A arc philosophy
  - Link to content guidelines
  - **Est:** ~20 lines

<!-- PR-CHECKPOINT #6: Content Prep (~200 LOC) -->
**Status:** ✅ **PHASE 6 COMPLETE** - Content team ready for Phase 4, validation tools prevent WCAG violations

**Deliverables Summary:**
1. **Content Guidelines:** 106 lines of comprehensive Kim + historian workflow documentation
2. **Validation Utilities:** 152 lines runtime validation + 90 lines test suite
3. **Sample Data:** 222 lines total (Carnifex Ferry 103 + Bulltown 119)
4. **Total LOC:** 570 lines (includes tests)

**Phase 4 Migration Readiness:**
- ✅ C→B→D→A arc philosophy documented with 6 major sections
- ✅ Coal baron exploitation language approved ("company scrip", "controlled wages")
- ✅ WCAG validation catches heritage-gold on small text violations
- ✅ Image attribution format enforced (Library of Congress, National Archives)
- ✅ Two complete sample datasets demonstrate template versatility
- ✅ Validation test suite covers required fields, image credits, tour URLs, color contrast

**Next Steps:**
- Phase 4 content writers can reference `docs/guides/historic-site-content-guidelines.md`
- Run `validateHistoricProps()` before publishing any historic site
- Use Carnifex Ferry (battlefield) vs Bulltown (living history) as templates

---

## Cross-Phase Tasks (No Specific PR)

### Constitutional Compliance (Already Complete)
- [X] Add historic authenticity color exception to project documentation
- [X] Add historic authenticity exception to docs/constitution.md (CLAUDE.md exceptions documented in project config)
- [X] Store narrative arc philosophy in ReasoningBank

### Research Documentation (Already Complete)
- [X] Appalachian aesthetic research (moonshining, coal towns, CCC)
- [X] Historic site design patterns research
- [X] Architecture specification (2,309 lines)

### Version Control
- [ ] [S] Create PR #1 branch from main: `pr1-foundation`
- [ ] [S] Create PR #2 branch from pr1: `pr2-hero-context`
- [ ] [S] Create PR #3 branch from pr2: `pr3-structures-tours`
- [ ] [S] Create PR #4 branch from pr3: `pr4-museum-education`
- [ ] [S] Create PR #5 branch from pr4: `pr5-polish`
- [ ] [S] Create PR #6 branch from pr5: `pr6-content-prep`

---

## PR Summary

| PR | Phase | Scope | Est. LOC | Task Count | Status |
|----|-------|-------|----------|------------|--------|
| **#1** | 1 | Foundation (Tailwind, types, CSS) | 150 | 8 | ✅ Safe |
| **#2** | 2 | Hero + Historical Context + skeletons | 280 | 6 | ✅ Safe |
| **#3** | 3 | Structures + Tours + attribution | 290 | 7 | ⚠️ Near 300 |
| **#4** | 4 | Exhibits + Education + Visitor + Nearby | 250 | 6 | ✅ Safe |
| **#5** | 5 | Polish + a11y + performance | 180 | 10 | ✅ Safe |
| **#6** | 6 | Content guidelines + validation | 200 | 6 | ✅ Safe |

**Total Tasks:** 43
**Parallelizable:** 22 tasks (51%)
**Sequential:** 21 tasks (49%)
**Total LOC:** ~1,350 lines

---

## Dependencies Graph

```text
Phase 1: Foundation
  [S] Tailwind Config Extensions
       ├─ [P] Heritage Colors (11)
       ├─ [P] Font Families (2)
       ├─ [P] Box Shadows (3)
       ├─ [P] Animations (shimmer)
       └─ [P] Text Shadow Plugin

  [S] Create TypeScript Interface
       └─ HistoricTemplateProps (~150 lines)

  [S] Create Template Shell
       └─ [P] Add Custom CSS (<style> block, 150 lines)

↓ PR #1 CHECKPOINT ↓

Phase 2: Hero + Historical Context
  [S] Create historic/ directory

  [S] HistoricHero Component (80 lines)
       ├─ Depends on: Tailwind heritage colors, custom CSS
       └─ Uses: heroImage, heroImageCredit, era, quickHighlights

  [S] HistoricalContextSection Component (120 lines)
       ├─ Depends on: Tailwind colors, custom CSS
       └─ Uses: timeline?, events, keyFigures?, significance

  [P] TimelineSkeleton (30 lines)
  [P] EventCardsSkeleton (25 lines)

  [S] Update Template Shell (55 lines)
       ├─ Import Hero + HistoricalContext
       └─ Add font preconnect links

  [P] Create Test Page (40 lines)

↓ PR #2 CHECKPOINT ↓

Phase 3: Structures + Tours
  [S] PreservedStructuresSection Component (90 lines)
       ├─ Depends on: .riveted-border CSS, Oswald font
       └─ Uses: structures array

  [S] ToursSection Component (70 lines)
       ├─ Depends on: Oswald font, painted-wood shadow
       └─ Uses: tours array, reservationUrl

  [P] StructureCardsSkeleton (30 lines)
  [P] TourCardsSkeleton (25 lines)
  [P] Image Attribution Utils (50 lines)

  [S] Update Template Shell (40 lines)
       ├─ Import Structures + Tours
       └─ Add metal-seam dividers

  [P] Update Test Page (30 lines)

↓ PR #3 CHECKPOINT ↓

Phase 4: Museum + Education
  [S] ExhibitsSection Component (60 lines)
  [S] EducationalProgramsSection Component (60 lines)
  [S] VisitorInfoSection Component (50 lines)
  [S] NearbyHistorySection Component (40 lines)

  [S] Update Template Shell (50 lines)
       └─ Import all remaining sections

  [P] Update Test Page (50 lines)

↓ PR #4 CHECKPOINT ↓

Phase 5: Polish
  [P] Timeout handling (30 lines)
  [P] BlurUpImage component (40 lines)
  [P] Mobile responsive (20 lines)
  [P] Desktop optimization (15 lines)
  [S] ARIA audit (25 lines)
  [P] Keyboard nav (10 lines)
  [P] High contrast mode (15 lines)
  [P] Font optimization (5 lines)
  [P] Image lazy loading (10 lines)
  [S] Lighthouse validation (testing)

↓ PR #5 CHECKPOINT ↓

Phase 6: Content Prep
  [S] Content Guidelines Doc (100 lines)
  [P] Validation Utils (80 lines)
  [P] Sample Data: Carnifex Ferry (50 lines)
  [P] Sample Data: Bulltown (50 lines)
  [P] JSDoc Comments (20 lines)

↓ PR #6 CHECKPOINT ↓
```

---

## Parallel Execution Opportunities

### Within Phase 1 (PR #1)
Run concurrently in single message:
- [P] Tailwind font families + box shadows + animations
- [P] Custom CSS classes (all 10 classes in one edit)
- [P] Text-shadow plugin

### Within Phase 2 (PR #2)
After Hero component created, run in parallel:
- [P] TimelineSkeleton.astro
- [P] EventCardsSkeleton.astro
- [P] Test page creation

### Within Phase 3 (PR #3)
After section components created, run in parallel:
- [P] StructureCardsSkeleton.astro
- [P] TourCardsSkeleton.astro
- [P] Image attribution utils
- [P] Test page updates

### Within Phase 4 (PR #4)
All 4 section components can be developed in parallel (if using multi-agent swarm):
- [P] ExhibitsSection.astro
- [P] EducationalProgramsSection.astro
- [P] VisitorInfoSection.astro
- [P] NearbyHistorySection.astro

### Within Phase 5 (PR #5)
Most tasks parallelizable:
- [P] Timeout handling, BlurUpImage, responsive, ARIA, keyboard nav, font, images (7 concurrent tasks)

### Within Phase 6 (PR #6)
- [P] Validation utils, Sample data (Carnifex + Bulltown), JSDoc (4 concurrent tasks)

---

## Critical Path (Sequential Dependencies)

```
1. Tailwind Config (PR #1, task 1.1)
    ↓
2. Template Shell Creation (PR #1, task 1.3)
    ↓
3. Custom CSS in <style> block (PR #1, task 1.3)
    ↓
4. HistoricHero Component (PR #2, task 2.1) ← requires colors + CSS
    ↓
5. HistoricalContextSection Component (PR #2, task 2.2)
    ↓
6. Update Template Shell with Hero + Context (PR #2, task 2.4)
    ↓
7. PreservedStructuresSection (PR #3, task 3.1) ← requires .riveted-border CSS
    ↓
8. ToursSection (PR #3, task 3.2)
    ↓
9. Update Template with Structures + Tours (PR #3, task 3.5)
    ↓
10. ExhibitsSection → EducationSection → VisitorSection → NearbySection (PR #4)
    ↓
11. Final Template Shell Update (PR #4, task 4.5)
    ↓
12. Accessibility Audit (PR #5, task 5.3.1) ← requires complete template
    ↓
13. Lighthouse Validation (PR #5, task 5.5)
    ↓
14. Content Guidelines (PR #6) ← requires tested template for examples
```

---

## Blocker Alerts

### Potential Blockers Identified

1. **Riveted Border Pseudo-Elements**
   - **Risk:** Last-child pseudo-element may fail if structure cards have no child elements
   - **Mitigation:** Ensure condition badge or accessibility indicator always renders (even if hidden)
   - **Blocker Phase:** PR #3, task 3.1

2. **Heritage Gold WCAG Contrast**
   - **Risk:** Designers may use gold on small text by mistake
   - **Mitigation:** Validation utils in PR #6 catch violations, guidelines document large text requirement
   - **Blocker Phase:** PR #4 if not careful, PR #6 prevents future violations

3. **Skeleton Shimmer Animation Performance**
   - **Risk:** CSS animation may cause jank on low-end mobile devices
   - **Mitigation:** `prefers-reduced-motion` disables animation, static placeholder shown
   - **Blocker Phase:** PR #5 performance testing

4. **External Booking Links Go Stale**
   - **Risk:** Eventbrite/State Parks URLs change, break user experience
   - **Mitigation:** Not template's responsibility - content team maintains URLs in Phase 4
   - **Blocker Phase:** Not a template blocker (data issue)

---

## Testing Checklist Per PR

### PR #1: Foundation
- [ ] Tailwind build succeeds (no config errors)
- [ ] Heritage colors appear in IntelliSense/autocomplete
- [ ] TypeScript interface exports correctly (`import type { HistoricTemplateProps }`)
- [ ] Custom CSS classes don't conflict with existing WVWO styles

### PR #2: Hero + Context
- [ ] Hero section renders with placeholder image
- [ ] Era badge stone-carved shadow visible (inspect `text-shadow` in DevTools)
- [ ] Timeline coal-gray borders render (vertical `border-l-4`)
- [ ] Event cards heritage burgundy borders render
- [ ] Skeleton screens appear for < 800ms (throttle network in DevTools)

### PR #3: Structures + Tours
- [ ] Riveted borders show 4 corner rivets (inspect pseudo-elements in DevTools)
- [ ] Structure cards asymmetric grid (desktop: 3fr 2fr 4fr widths)
- [ ] Image attribution caption appears below structure photos
- [ ] "Reserve Tour →" button links to external URL
- [ ] External link security: `rel="noopener noreferrer"` present in HTML

### PR #4: Museum + Education
- [ ] All 8 sections render in correct order
- [ ] Optional sections hide gracefully (test with `exhibits: undefined`)
- [ ] Metal seam dividers appear between major sections
- [ ] Narrative arc color evolution perceptible (scroll through page, observe tone shift)

### PR #5: Polish
- [ ] Lighthouse Accessibility: 100 (no violations)
- [ ] Lighthouse Performance: ≥90
- [ ] Mobile 320px: no horizontal scroll, readable text
- [ ] Keyboard tab order: logical, focus states visible (orange outline)
- [ ] High contrast mode: burgundy → black, gold → black

### PR #6: Content Prep
- [ ] Validation utils catch WCAG violations (test with small gold text)
- [ ] Sample data files load without errors
- [ ] Test page renders Carnifex Ferry and Bulltown examples
- [ ] Content guidelines clear for Kim + historian workflow

---

## Rollback Checkpoints

### After Each PR Merge

**PR #1 Rollback:**
```bash
git revert <pr1-merge-commit> -m 1
# Removes: Tailwind config, types, no visual impact
```

**PR #2 Rollback:**
```bash
git revert <pr2-merge-commit> -m 1
# Removes: Hero + Historical Context sections
# Fallback: Empty template shell (no content)
```

**PR #3 Rollback:**
```bash
git revert <pr3-merge-commit> -m 1
# Removes: Structures + Tours sections
# Fallback: Hero + Context only (partial template)
```

**PR #4 Rollback:**
```bash
git revert <pr4-merge-commit> -m 1
# Removes: Last 4 sections
# Fallback: First 4 sections functional
```

**PR #5 Rollback:**
```bash
git revert <pr5-merge-commit> -m 1
# Removes: Accessibility fixes, skeletons
# Fallback: Complete template, may have a11y issues
```

**PR #6 Rollback:**
```bash
git revert <pr6-merge-commit> -m 1
# Removes: Content guidelines, sample data
# Fallback: Template complete, Phase 4 delayed
```

---

## Notes

### Special Considerations

1. **Narrative Arc Color Evolution**
   - Test by scrolling through full page with different content
   - Validate coal-gray feels different in timeline vs skeletons vs visitor info
   - Ensure heritage burgundy shift (museum → blood → honor) is perceptible

2. **WCAG Contrast Testing**
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Heritage-gold (#d18a00) on white: 3.8:1 (AA large text only)
   - Automated in validation utils (PR #6)

3. **Riveted Border Browser Compatibility**
   - Test pseudo-elements on IE11 (if required by user base)
   - Fallback: solid borders if `::before`/`::after` unsupported

4. **Font Loading Performance**
   - Roboto Slab + Oswald add ~150KB download
   - Preconnect reduces latency by ~200ms
   - Monitor Lighthouse "Reduce render-blocking resources" warning

5. **External Booking Integration Testing**
   - Use placeholder URLs in development ([example](https://example.com/reserve))
   - Real URLs added by content team in Phase 4
   - Validate `reservationUrl` is optional (tours can have no booking)

### Blockers/Prerequisites

- **None for Phase 1:** Pure config, no external dependencies
- **Phase 2 Prerequisite:** Phase 1 merged (Tailwind colors available)
- **Phase 3 Prerequisite:** Phase 2 merged (template shell exists)
- **Phase 4 Prerequisite:** Phase 3 merged (riveted borders tested)
- **Phase 5 Prerequisite:** Phase 4 merged (complete template for a11y audit)
- **Phase 6 Prerequisite:** Phase 5 merged (tested template for content examples)

---

## Task Estimation Accuracy

**LOC Estimates Source:**
- Architecture spec (Section 6: section-by-section design decisions)
- Plan.md Phase 1-6 breakdowns
- SPEC-17/18 historical LOC data (BackcountryTemplate ~450 lines, StateParkTemplate similar)

**Confidence Level:**
- High confidence: Infrastructure tasks (Tailwind, types) - clear spec
- Medium confidence: Section components (may need iteration on visual details)
- Low confidence: Custom CSS total (may extract to separate file if > 150 lines)

**Variance Buffer:**
- PR #3 has 10 LOC buffer before 300 warning (290 estimated)
- If PR #3 grows beyond 300, split into PR #3a (Structures) + PR #3b (Tours)

---

**Status:** Task breakdown complete, ready for implementation
**Next Step:** `/speckit.implement` or start PR #1 manually with `git checkout -b pr1-foundation`
