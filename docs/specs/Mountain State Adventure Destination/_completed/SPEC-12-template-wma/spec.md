# Feature Specification: WMA (Wildlife Management Area) Template

**Feature Branch**: `feature/spec-12-wma-template`
**Created**: 2025-12-27
**Status**: Draft - Under Review
**Version**: 1.0.0

---

## QUEEN COORDINATOR STATUS

**Orchestration**: Hierarchical Swarm (9 Worker Agents)
**Research Input**: [peppy-dancing-dewdrop.md](~/.claude/plans/peppy-dancing-dewdrop.md) - 10 research agents
**Reference**: elk-river.astro (463 lines), SPEC-10/11 components (94/100 PR score)

**Worker Agent Assignments**:
1. ✅ Overview Agent - Overview & problem statement
2. ⏳ Goals Agent - Goals & non-goals
3. ⏳ User Stories Agent - User stories (Kim, editors, developers)
4. ⏳ Core Requirements Agent - Functional requirements (core)
5. ⏳ Edge Cases Agent - Functional requirements (edge cases)
6. ⏳ NFR Agent - Non-functional requirements
7. ⏳ Data Model Agent - Content Collections schema extension
8. ⏳ Interface Agent - Component props & slots
9. ⏳ Acceptance Agent - Dependencies & acceptance criteria

---

## Overview

**SPEC-12 creates modular Astro components for West Virginia Wildlife Management Area (WMA) adventure pages**, following the proven success pattern from SPEC-10/11 (94/100 PR review score).

**Approach**: Instead of a monolithic 463-line template, we'll build **4 new section components** that compose together, plus reuse 4 existing components from SPEC-10/11. This achieves **73% line reduction per page** (533 → 150 lines) while maintaining elk-river.astro depth.

**Components to Create** (Session 2025-12-27: Wrapper pattern approved):
1. `AdventureFeatureSection.astro` - Generic feature display (replaces What to Hunt/Fish sections)
2. `AdventureCampingList.astro` - Complex facility display with badges & contact info
3. `AdventureAmenitiesGrid.astro` - Utility grid for checkmark-style amenities
4. `AdventureCTA.astro` - Universal CTA section (green bg, dual buttons)

**Wrapper Components** (thin wrappers around AdventureFeatureSection):
- `AdventureWhatToFish.astro` - Sets fishing-specific defaults (~15 lines)
- `AdventureWhatToHunt.astro` - Sets hunting-specific defaults (~15 lines)

**Components to Reuse** (from SPEC-10/11):
- `AdventureQuickStats.astro` - Stats grid (acreage, drive time, county, access)
- `AdventureGettingThere.astro` - Directions with map link
- `AdventureGearChecklist.astro` - Required/optional gear lists
- `AdventureRelatedShop.astro` - Category links with CTAs

---

## Problem Statement

**Current State**: The elk-river.astro WMA page is 463 lines of inline, non-reusable code. Creating 96 WV WMA pages would require duplicating this structure 96 times, leading to:
- **45,000+ lines of duplicated code** (463 × 96 + maintenance overhead)
- **Inconsistent styling** as patterns drift across pages
- **High maintenance burden** - fixing a bug means updating 96 files
- **No type safety** - content errors discovered at runtime, not build time

**Impact**: Without reusable components, scaling from 1 WMA to 96 WMAs is impractical. Content editors face steep learning curve, developers risk introducing WVWO aesthetic violations, and Kim's authentic voice gets diluted through inconsistent copy patterns.

**Risk**: The pivot to "Mountain State Adventure Destination" requires 60+ new destination pages (SPEC-12 through SPEC-70). Without componentization, this expansion becomes a maintenance nightmare instead of a growth opportunity.

---

## Goals

### Primary Goals

**G1: Modular Component System** (MUST HAVE)
- 6 new section components + 4 reused components = complete WMA page toolkit
- Each component <100 lines, single responsibility, props-driven
- Zero breaking changes to existing SPEC-10/11 components

**G2: Line Reduction & Maintainability** (MUST HAVE)
- Target: 150-line page templates (73% reduction from 463 lines)
- Single source of truth for each section pattern
- Bug fixes propagate to all WMA pages instantly

**G3: Type Safety via Zod Schemas** (MUST HAVE)
- Extend existing `adventures` Content Collection with 8 optional WMA fields
- Build-time validation catches missing acreage, malformed GPS, invalid seasons
- Full TypeScript autocomplete for all component props

**G4: WVWO Aesthetic Enforcement** (MUST HAVE)
- 100% compliance: `rounded-sm` only, brand palette, font hierarchy
- Zero forbidden patterns: No glassmorphism, purple gradients, corporate fonts
- Passes "Kim's neighbors would recognize this" litmus test

**G5: Accessibility (WCAG 2.1 AA)** (MUST HAVE)
- Color contrast 4.5:1 normal, 3:1 large text
- Never color-only indicators (add icons + text)
- Maps with accessible data table alternatives
- Screen reader friendly (semantic HTML, proper ARIA)

### Secondary Goals

**G6: Content Phasing** (SHOULD HAVE) - **APPROVED Session 2025-12-27**
- Phase 1: 5 closest WMAs to shop (Elk River, Burnsville Lake, Summersville Lake, Holly River, Cranberry) - all <45 min drive
- Phase 2: 10 regional WMAs expanding coverage (Northern, Southern, Eastern WV)
- Phase 3: Complete 96 WV WMAs catalog

**G7: Performance** (SHOULD HAVE)
- Static HTML generation (zero runtime JS penalty)
- <2s load time on 3G (rural WV cellular)
- Lighthouse 100/100/100/100 scores

**G8: Geographic Features** (NICE TO HAVE)
- Static-first maps (Mapbox Static API or OpenStreetMap tiles)
- Multi-format GPS (decimal degrees + DMS for older units)
- Printable PDF maps (8.5"×11" portrait, QR code)

---

## Non-Goals (Out of Scope)

**NG1: Interactive Maps** (Future Enhancement)
- Out of scope: Leaflet.js client-side interactivity, layer toggles, pan/zoom
- In scope: Static map images with data table alternatives
- Rationale: 50-70% less battery, <1s load on 3G, works offline/print
- Future: Progressive enhancement for WMAs with 3+ access points

**NG2: Separate WMAs Collection** (Architecture Decision)
- Out of scope: New `wmas` Content Collection separate from `adventures`
- In scope: Extend existing `adventures` with 8 optional WMA fields
- Rationale: Zero breaking changes, simpler mental model, existing cross-references work

**NG3: Real-Time Regulation Integration** (External API)
- Out of scope: Live WV DNR API integration for hunting seasons/limits
- In scope: Static regulations field with manual updates + link to WV DNR
- Rationale: DNR has no public API, regulations change slowly (annual), manual is reliable

**NG4: E-Commerce Integration** (Disabled per SPEC-05)
- Out of scope: Shopping cart, inventory checks, gear purchase flow
- In scope: Shop category links only (AdventureRelatedShop component)
- Rationale: E-commerce disabled per PIVOT_RATIONALE.md, focus on content

**NG5: Content Management UI** (Editor Tools)
- Out of scope: Visual CMS, WYSIWYG editors for WMA pages
- In scope: Markdown frontmatter editing only
- Rationale: Content Collections are Git-based, Kim uses VS Code

---

## User Scenarios & Testing

### User Story 1 - Kim Adds New WMA Page (Priority: P0)

**As** Kim (shop owner/content creator),
**I want** to add a new WMA page by copying a template and filling in 15 fields,
**So that** I can publish Burnsville Lake WMA in <30 minutes without developer help.

**Why P0**: Kim is the primary content author. If she can't self-serve, the system fails its core purpose.

**Acceptance Scenarios**:

1. **Given** Kim has Burnsville Lake WMA data (acreage, species, facilities),
   **When** she copies `elk-river.md` to `burnsville-lake.md` in `src/content/adventures/`,
   **Then** she sees clear frontmatter structure with comments explaining each field.

2. **Given** Kim enters `acreage: 1000` instead of a number,
   **When** she runs `npm run build`,
   **Then** Zod schema throws build error: "adventures/burnsville-lake.md: acreage must be a number".

3. **Given** Kim populates all required fields correctly,
   **When** she runs `npm run dev` and visits `/adventures/burnsville-lake`,
   **Then** she sees formatted WMA page with all sections rendering from her frontmatter data.

**Independent Test**: Unit test WMA frontmatter schema validation with valid/invalid inputs.

---

### User Story 2 - Highway Hunter Plans WMA Trip (Priority: P1)

**As** a highway hunter from Parkersburg,
**I want** to see what game I can hunt at Burnsville Lake WMA this season,
**So that** I can decide if it's worth the 90-minute drive.

**Why P1**: Core value proposition. Hunters need species info + seasons to plan trips.

**Acceptance Scenarios**:

1. **Given** Burnsville Lake has 5 huntable species,
   **When** hunter visits the WMA page,
   **Then** they see "What to Hunt" section with 5 cards showing species name, season, and Kim's tips.

2. **Given** deer season is "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2",
   **When** hunter reads the deer card,
   **Then** they see formatted season dates with regulatory link to WV DNR.

3. **Given** Kim added tip: "Bucks here run 100-150 inches. Steep terrain—play wind carefully.",
   **When** hunter reads the card,
   **Then** they see Kim's tip in `font-hand` (Permanent Marker) with humble, specific voice.

**Independent Test**: E2E test rendering AdventureWhatToHunt with mock species array.

---

### User Story 3 - Fly Fisherman Finds Fishing Waters (Priority: P1)

**As** a fly fisherman planning a weekend trip,
**I want** to see what waters are available at the WMA and what species I can catch,
**So that** I know if I should bring my trout or bass gear.

**Why P1**: Fishing is secondary to hunting but still major WMA use case.

**Acceptance Scenarios**:

1. **Given** Burnsville Lake has 3 fishing waters (Little Kanawha River, Slippery Creek, Main Lake),
   **When** fisherman visits the page,
   **Then** they see "Fishing Waters" section with 3 cards showing water name, species list, and access notes.

2. **Given** Slippery Creek is stocked trout,
   **When** fisherman reads that card,
   **Then** they see "Species: Rainbow trout, Brown trout" and "Access: Gravel road from Route 5, bring waders".

3. **Given** no fishing waters exist (hunting-only WMA),
   **When** page loads,
   **Then** "Fishing Waters" section is hidden (conditional rendering).

**Independent Test**: Unit test AdventureWhatToFish with 0, 1, and 3 fishing waters.

---

### User Story 4 - First-Timer Checks Facilities (Priority: P2)

**As** a first-time WMA visitor,
**I want** to see what facilities are available (parking, boat ramps, camping),
**So that** I know what to expect and can plan accordingly.

**Why P2**: Facilities info reduces trip friction, improves visitor experience.

**Acceptance Scenarios**:

1. **Given** Burnsville has 240 camping sites, 2 boat ramps, 1 shooting range,
   **When** visitor scrolls to facilities,
   **Then** they see 3-column grid with facility type, count badges, and descriptions.

2. **Given** shooting range has contact phone (304) 555-1234,
   **When** visitor views that card,
   **Then** they see "Shooting Range (1)" with description and clickable phone link.

3. **Given** ADA-accessible facilities exist,
   **When** page loads,
   **Then** visitor sees accessibility icons and notes per WCAG 2.1 AA.

**Independent Test**: E2E test AdventureCampingList with complex facility objects.

---

### User Story 5 - Developer Adds New Component (Priority: P3)

**As** a developer extending the system,
**I want** clear TypeScript interfaces and Zod schemas,
**So that** I can add new WMA fields without breaking existing pages.

**Why P3**: Developer experience determines system maintainability.

**Acceptance Scenarios**:

1. **Given** developer wants to add `boatRampCount` field,
   **When** they extend `adventures` schema in `content.config.ts`,
   **Then** TypeScript autocomplete shows the new field in all WMA page frontmatter.

2. **Given** developer creates new component `AdventureBoatRamps.astro`,
   **When** they import it in a WMA page template,
   **Then** props interface enforces correct data shape at build time.

3. **Given** existing WMA pages don't have `boatRampCount`,
   **When** developer runs `npm run build`,
   **Then** build succeeds (field is optional, backward compatible).

**Independent Test**: Unit test schema extension with optional fields.

---

### Edge Cases

**EC1: Missing Optional Data**
- **What happens when** `fishingWaters` array is empty?
  → "Fishing Waters" section is hidden via conditional `{fishingWaters.length > 0 && ...}`

**EC2: Malformed GPS Coordinates**
- **What happens when** coordinates are `"invalid"` instead of `{lat: 39.5, lng: -80.2}`?
  → Zod schema throws build error: "coordinates must be object with lat/lng numbers"

**EC3: Zero Facilities**
- **What happens when** `facilities` array is `[]`?
  → "Facilities & Access" section shows intro text only, no grid (graceful degradation)

**EC4: Kim's Tips Too Long**
- **What happens when** a tip is 500 characters?
  → Component renders full text but may need `line-clamp-3` for visual consistency (design decision)

**EC5: Special Characters in Species Names**
- **What happens when** species name contains `<script>alert('xss')</script>`?
  → Astro auto-escapes HTML in text interpolation; XSS not possible

**EC6: Missing Hero Image**
- **What happens when** `heroImage` is undefined?
  → Zod schema marks it required; build fails with clear error message

**EC7: Regulations Array Too Long**
- **What happens when** 20+ regulations exist?
  → All render in scrollable list; no pagination needed (state regs are finite)

---

## Requirements

### Functional Requirements - Core Features

**Component: AdventureFeatureSection.astro**

- **FR-001**: Component MUST accept `features` array of objects with `{title, description, notes?, icon?}`
- **FR-002**: Component MUST render 2-column grid on desktop (md:grid-cols-2), 1-column mobile
- **FR-003**: Component MUST apply `border-l-4 border-l-sign-green` to feature cards
- **FR-004**: Component MUST display Kim's notes in `font-hand` (Permanent Marker) when provided
- **FR-005**: Component MUST support `variant` prop for background: `'white' | 'cream'`
- **FR-006**: Component MUST support default slot for additional content below grid

**Component: AdventureCampingList.astro**

- **FR-007**: Component MUST accept `facilities` array with `{type, count?, description, contact?, link?}`
- **FR-008**: Component MUST display count badges when provided (e.g., "Camping Sites (240)")
- **FR-009**: Component MUST render phone numbers as clickable `tel:` links
- **FR-010**: Component MUST render external links with `rel="noopener noreferrer" target="_blank"`
- **FR-011**: Component MUST use 3-column grid on desktop (md:grid-cols-3), 1-column mobile
- **FR-012**: Component MUST support `title` and `intro` props with defaults

**Component: AdventureAmenitiesGrid.astro**

- **FR-013**: Component MUST accept `amenities` string array
- **FR-014**: Component MUST display checkmark icon (`text-sign-green`) before each amenity
- **FR-015**: Component MUST support `columns` prop: `2 | 3 | 4` (default: 3)
- **FR-016**: Component MUST apply responsive grid classes: `grid-cols-2 md:grid-cols-{columns}`
- **FR-017**: Component MUST support `variant` prop for background: `'white' | 'cream'`

**Component: AdventureCTA.astro**

- **FR-018**: Component MUST display 2 buttons in flex row (gap-4)
- **FR-019**: Primary button MUST use `bg-sign-green` with hover `bg-sign-green/90`
- **FR-020**: Secondary button MUST use `border-2 border-sign-green text-sign-green` with hover fill
- **FR-021**: Component MUST support `primaryHref`, `primaryText`, `secondaryHref`, `secondaryText` props
- **FR-022**: Component MUST apply `container mx-auto px-4 py-12` section wrapper
- **FR-023**: Component MUST center content with `max-w-2xl mx-auto text-center`

**Component: AdventureWhatToHunt.astro**

- **FR-024**: Component MUST wrap AdventureFeatureSection with hunting-specific defaults
- **FR-025**: Component MUST use default title: "What to Hunt"
- **FR-026**: Component MUST accept `species` array with `{name, season, notes?}`
- **FR-027**: Component MUST format season as subtitle: "Season: {season}"
- **FR-028**: Component MUST link to WV DNR regulations when `regulationUrl` provided

**Component: AdventureWhatToFish.astro**

- **FR-029**: Component MUST wrap AdventureFeatureSection with fishing-specific defaults
- **FR-030**: Component MUST use default title: "Fishing Waters"
- **FR-031**: Component MUST accept `waters` array with `{name, species[], access}`
- **FR-032**: Component MUST format species as comma-separated list
- **FR-033**: Component MUST display access notes as secondary text

**Schema Extension: adventures Collection**

- **FR-034**: Schema MUST add optional `acreage: number` field
- **FR-035**: Schema MUST add optional `county: string` field
- **FR-036**: Schema MUST add optional `species` array with nested `{name, season, notes?}`
- **FR-037**: Schema MUST add optional `fishingWaters` array with nested `{name, species[], access}`
- **FR-038**: Schema MUST add optional `facilities` array with nested `{type, count?, description, contact?, link?}`
- **FR-039**: Schema MUST add optional `accessPoints` array with nested `{name, coords?, features[]}`
- **FR-040**: Schema MUST add optional `regulations` object with `{zone?, restrictions[]}`
- **FR-041**: Schema MUST add optional `seasonHighlights` array with `{season, target, tips}`

**Page Template: WMAPageTemplate Pattern**

- **FR-042**: Template MUST orchestrate 10 section components in semantic order
- **FR-043**: Template MUST apply section background alternation: cream → white → cream → white
- **FR-044**: Template MUST conditionally render sections based on data availability
- **FR-045**: Template MUST target ~150 lines (composition, not inline code)

### Functional Requirements - Edge Cases & Error Handling

**Data Validation**

- **FR-046**: Build MUST fail if `heroImage` is missing or invalid path
- **FR-047**: Build MUST fail if `coordinates` object lacks `lat` or `lng` properties
- **FR-048**: Build MUST fail if `acreage` is negative number
- **FR-049**: Build MUST fail if `species` array has objects without `name` or `season` fields
- **FR-050**: Build MUST warn if `description` exceeds 500 characters (SEO best practice)

**Graceful Degradation**

- **FR-051**: If `fishingWaters` is empty array, "Fishing Waters" section MUST be hidden
- **FR-052**: If `facilities` is empty array, section MUST show intro text with "No facilities listed" message
- **FR-053**: If `mapUrl` is undefined, "Open in Google Maps" button MUST be hidden
- **FR-054**: If `regulations.restrictions` is empty, section MUST show "Check WV DNR for current regulations" fallback
- **FR-055**: If `seasonHighlights` is empty, section MUST be omitted entirely (no placeholder)

**Content Safety**

- **FR-056**: All text props MUST be HTML-escaped by Astro (prevent XSS)
- **FR-057**: External links (mapUrl, regulationUrl) MUST include `rel="noopener noreferrer"`
- **FR-058**: Phone numbers MUST be formatted as `tel:` links with valid format validation
- **FR-059**: Image alt text MUST be required (WCAG 2.1 AA compliance)
- **FR-060**: GPS coordinates MUST be validated as numeric within WV bounds (37.2-40.6°N, 77.7-82.6°W)

---

### Non-Functional Requirements

**Performance**

- **NFR-001**: Static HTML generation MUST produce zero runtime JavaScript (islands architecture exception for future enhancements)
- **NFR-002**: Page load time MUST be <2 seconds on 3G connection (tested with Chrome DevTools throttling)
- **NFR-003**: Lighthouse Performance score MUST be ≥95/100
- **NFR-004**: Total page weight MUST be <500KB uncompressed (HTML + CSS + images)
- **NFR-005**: Critical CSS MUST be inlined in `<head>` for above-the-fold rendering

**Accessibility (WCAG 2.1 AA)**

- **NFR-006**: Color contrast MUST meet 4.5:1 for normal text, 3:1 for large text (18pt+)
- **NFR-007**: All images MUST have descriptive alt text (target: 125 characters)
- **NFR-008**: Semantic HTML MUST be used (proper heading hierarchy h1→h2→h3)
- **NFR-009**: Focus states MUST be visible (`focus-visible:ring-2 ring-brand-orange`)
- **NFR-010**: Maps MUST have accessible data table alternative (location, amenities, directions)
- **NFR-011**: Icon-only buttons MUST have ARIA labels
- **NFR-012**: Decorative icons MUST use `aria-hidden="true"`
- **NFR-013**: Animations MUST respect `prefers-reduced-motion` media query

**SEO**

- **NFR-014**: Each WMA page MUST have unique `<title>` tag: "{WMA Name} - Hunting & Fishing Guide | WV Wild Outdoors"
- **NFR-015**: Meta description MUST be 150-160 characters, include county and primary species
- **NFR-016**: Structured data MUST include LocalBusiness + Place schema (per SPEC-06)
- **NFR-017**: Headings MUST follow semantic hierarchy (single h1, h2 for sections, h3 for subsections)
- **NFR-018**: Images MUST be lazy-loaded below the fold

**WVWO Aesthetic Compliance**

- **NFR-019**: Typography MUST use only approved fonts: Bitter (headings), Noto Sans (body), Permanent Marker (accents)
- **NFR-020**: Colors MUST use only brand palette: #3E2723 (brown), #2E7D32 (green), #FFF8E1 (cream), #FF6F00 (orange <5% screen)
- **NFR-021**: Border radius MUST be `rounded-sm` (0.125rem) ONLY - zero md/lg/xl/2xl/3xl
- **NFR-022**: Transitions MUST use `transition-colors duration-300` (no bouncy/parallax effects)
- **NFR-023**: Animations MUST use `gentle-reveal` (0.6s ease-out opacity + translateY)
- **NFR-024**: Orange MUST be used for CTAs only, never backgrounds (<5% of screen area)
- **NFR-025**: Forbidden patterns MUST be enforced: No glassmorphism, backdrop-blur, purple gradients, Inter/Poppins fonts

**Maintainability**

- **NFR-026**: Each component MUST be <100 lines (excluding comments/whitespace)
- **NFR-027**: Props interfaces MUST use TypeScript with JSDoc comments
- **NFR-028**: Zod schemas MUST have descriptive error messages for validation failures
- **NFR-029**: Code MUST pass Prettier formatting checks (enforced via pre-commit hook)
- **NFR-030**: Components MUST follow single responsibility principle (one job per component)

**Testing**

- **NFR-031**: Unit test coverage MUST be ≥40 tests for schema validation
- **NFR-032**: E2E test coverage MUST be ≥30 scenarios for component rendering
- **NFR-033**: Accessibility tests MUST use axe-core with zero violations
- **NFR-034**: Visual regression tests MUST capture mobile + desktop viewports
- **NFR-035**: PR review score target: ≥90/100 (matching SPEC-10/11 quality bar)

---

## Data Model

### Content Collections Schema Extension

**File**: `wv-wild-web/src/content.config.ts`

**Strategy**: Extend existing `adventures` collection with 8 optional WMA fields (zero breaking changes).

```typescript
import { defineCollection, z } from 'astro:content';

// ============================================================================
// SPEC-12: WMA TEMPLATE SCHEMA EXTENSIONS
// ============================================================================

/**
 * Huntable species for WMA pages.
 * Represents game animals/birds with seasonal info.
 */
const SpeciesSchema = z.object({
  /** Species name (e.g., "White-tailed Deer") */
  name: z.string().min(1),
  /** Hunting season dates (e.g., "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2") */
  season: z.string().min(1),
  /** Optional Kim's tips or habitat notes */
  notes: z.string().optional(),
  /** Optional link to WV DNR regulations for this species */
  regulationUrl: z.string().url().optional(),
});

/**
 * Fishing water body for WMA pages.
 * Represents streams, ponds, lakes within WMA.
 */
const FishingWaterSchema = z.object({
  /** Water body name (e.g., "Little Kanawha River") */
  name: z.string().min(1),
  /** Fish species available (e.g., ["Smallmouth Bass", "Rainbow Trout"]) */
  species: z.array(z.string().min(1)).min(1),
  /** Access description (e.g., "Gravel road from Route 5, bring waders") */
  access: z.string().min(1),
  /** Optional stocking info or seasonal notes */
  notes: z.string().optional(),
});

/**
 * WMA facility (parking, boat ramps, camping, ranges).
 */
const FacilitySchema = z.object({
  /** Facility type (e.g., "Camping Sites", "Boat Ramp") */
  type: z.string().min(1),
  /** Optional count (e.g., 240 campsites) */
  count: z.number().int().positive().optional(),
  /** Description/amenities (e.g., "Electric hookups, restrooms, showers") */
  description: z.string().min(1),
  /** Optional contact phone (e.g., "(304) 555-1234") */
  contact: z.string().optional(),
  /** Optional external link (e.g., reservation system) */
  link: z.string().url().optional(),
  /** Optional ADA accessibility notes */
  accessibility: z.string().optional(),
});

/**
 * WMA access point (gates, trailheads, parking areas).
 */
const AccessPointSchema = z.object({
  /** Access point name (e.g., "Main Gate", "North Trailhead") */
  name: z.string().min(1),
  /** Optional GPS coordinates (e.g., "39.6419° N, 79.9561° W") */
  coords: z.string().optional(),
  /** Features (e.g., ["Paved parking (20 vehicles)", "Restrooms", "Boat launch"]) */
  features: z.array(z.string().min(1)),
  /** Optional Google Maps link */
  mapLink: z.string().url().optional(),
});

/**
 * WMA regulations and restrictions.
 */
const RegulationsSchema = z.object({
  /** Optional hunting zone designation (e.g., "Zone 3") */
  zone: z.string().optional(),
  /** List of restrictions (e.g., ["Blaze orange required", "No baiting"]) */
  restrictions: z.array(z.string().min(1)),
  /** Optional link to full WV DNR regulations PDF */
  regulationsUrl: z.string().url().optional(),
});

/**
 * Seasonal hunting/fishing highlight.
 */
const SeasonHighlightSchema = z.object({
  /** Season name (e.g., "Spring Gobbler", "Fall Deer") */
  season: z.string().min(1),
  /** Target species (e.g., "White-tailed Deer (Bucks)") */
  target: z.string().min(1),
  /** Kim's tips for this season (e.g., "Ridge tops at dawn for gobbler calls") */
  tips: z.string().min(1),
});

// ============================================================================
// EXTEND EXISTING ADVENTURES COLLECTION
// ============================================================================

const adventuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === EXISTING FIELDS (from SPEC-06) ===
    title: z.string(),
    description: z.string(),
    season: z.array(z.string()).optional(),
    difficulty: z.string().optional(),
    location: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
    gear: z.array(z.string()).optional(),
    elevation_gain: z.number().optional(),
    drive_time: z.string().optional(),
    kim_hook: z.string().optional(),
    suitability: z.array(z.string()).optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(), // REQUIRED for WCAG
      caption: z.string().optional(),
    })).optional(),

    // === SPEC-12: EXPLICIT TYPE FIELD (Session 2025-12-27) ===
    /** Adventure type for differentiation (default: 'adventure' if omitted) */
    type: z.enum(['adventure', 'wma']).optional(),

    // === NEW WMA FIELDS (SPEC-12) - ALL OPTIONAL ===

    /** WMA acreage (e.g., 16000 for Elk River WMA) */
    acreage: z.number().int().positive().optional(),

    /** County name (e.g., "Braxton") */
    county: z.string().optional(),

    /** Huntable species with seasons and notes */
    species: z.array(SpeciesSchema).optional(),

    /** Fishing waters within WMA */
    fishingWaters: z.array(FishingWaterSchema).optional(),

    /** Facilities (camping, boat ramps, ranges) */
    facilities: z.array(FacilitySchema).optional(),

    /** Access points (gates, trailheads) */
    accessPoints: z.array(AccessPointSchema).optional(),

    /** Regulations and restrictions */
    regulations: RegulationsSchema.optional(),

    /** Seasonal hunting/fishing highlights */
    seasonHighlights: z.array(SeasonHighlightSchema).optional(),

    /** Optional static map URL (Mapbox Static API or WV DNR PDF) */
    mapUrl: z.string().url().optional(),
  }),
});

export const collections = {
  adventures: adventuresCollection,
  // ... other collections (stories, resources, locations, products)
};
```

**Migration Path**:
1. ✅ Add optional fields above (no breaking changes)
2. ✅ Existing WMA adventures (elk-river) continue working
3. ✅ New WMAs populate WMA-specific fields incrementally
4. ✅ Non-WMA adventures ignore WMA fields (type safety via optional)

---

## API/Interface Design

### AdventureFeatureSection Props

**Purpose**: Generic section for repeating feature cards (species, facilities, etc.)

```typescript
interface Props {
  /** Section heading (e.g., "What to Hunt") */
  title: string;

  /** Optional intro text above cards */
  intro?: string;

  /** Array of features to display */
  features: {
    title: string;
    description: string;
    notes?: string; // Kim's tips (renders in font-hand)
    icon?: 'check' | 'info' | 'location' | 'none';
  }[];

  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';

  /** Grid columns on desktop (default: 2) */
  columns?: 2 | 3;

  /** Optional border-left color (default: 'sign-green') */
  accentColor?: 'sign-green' | 'brand-orange' | 'brand-mud';
}

// Slot: default (additional content below cards)
```

**Usage Example**:

```astro
<AdventureFeatureSection
  title="What to Hunt"
  intro="Elk River WMA offers diverse game species across 16,000 acres."
  features={[
    {
      title: "White-tailed Deer",
      description: "Season: Archery Sep 15-Dec 31, Firearms Nov 20-Dec 2",
      notes: "Bucks here run 100-150 inches. Steep terrain—play wind carefully.",
    },
    {
      title: "Wild Turkey",
      description: "Season: Spring gobbler Apr 15-May 15, Fall either-sex Oct 1-Nov 15",
      notes: "Ridge tops at dawn for gobbler calls. Bring decoys.",
    },
  ]}
  variant="white"
  columns={2}
/>
```

---

### AdventureCampingList Props

**Purpose**: Complex facility display with counts, contact info, external links.

```typescript
interface Props {
  /** Section heading (default: "Facilities & Access") */
  title?: string;

  /** Optional intro text */
  intro?: string;

  /** Array of facilities */
  facilities: {
    type: string;        // "Camping Sites", "Boat Ramp", "Shooting Range"
    count?: number;      // 240 (displays as badge)
    description: string; // "Electric hookups, restrooms, showers"
    contact?: string;    // "(304) 555-1234" (renders as tel: link)
    link?: string;       // External reservation link
    accessibility?: string; // ADA notes
  }[];

  /** Grid columns on desktop (default: 3) */
  columns?: 2 | 3 | 4;

  /** Background variant (default: 'cream') */
  variant?: 'white' | 'cream';
}
```

**Usage Example**:

```astro
<AdventureCampingList
  title="Facilities & Access"
  intro="Elk River WMA provides extensive facilities for multi-day trips."
  facilities={[
    {
      type: "Camping Sites",
      count: 240,
      description: "Electric hookups, restrooms, showers. Sites $15-25/night.",
      contact: "(304) 555-CAMP",
      link: "https://reservations.example.com/elk-river",
      accessibility: "5 ADA-accessible sites near restrooms",
    },
    {
      type: "Boat Ramp",
      count: 2,
      description: "Concrete ramps with courtesy docks. Parking for 30 vehicles.",
    },
    {
      type: "Shooting Range",
      count: 1,
      description: "100-yard rifle range, pistol bays. Open dawn-dusk.",
      contact: "(304) 555-RANGE",
    },
  ]}
  columns={3}
  variant="cream"
/>
```

---

### AdventureAmenitiesGrid Props

**Purpose**: Simple checkmark grid for amenities/features.

```typescript
interface Props {
  /** Section heading (default: "Amenities") */
  title?: string;

  /** Array of amenity strings */
  amenities: string[];

  /** Grid columns on desktop (default: 3) */
  columns?: 2 | 3 | 4;

  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';

  /** Icon color (default: 'sign-green') */
  iconColor?: 'sign-green' | 'brand-orange';
}
```

**Usage Example**:

```astro
<AdventureAmenitiesGrid
  title="What's Available"
  amenities={[
    "Parking (30+ vehicles)",
    "Restrooms (seasonal)",
    "Picnic areas",
    "ADA-accessible trails",
    "Cell service (limited)",
    "Potable water",
  ]}
  columns={3}
  variant="white"
/>
```

---

### AdventureCTA Props

**Purpose**: Universal CTA section with dual buttons.

```typescript
interface Props {
  /** Primary button text (default: "Get Directions") */
  primaryText?: string;

  /** Primary button href */
  primaryHref: string;

  /** Secondary button text (default: "Call the Shop") */
  secondaryText?: string;

  /** Secondary button href */
  secondaryHref: string;

  /** Optional heading above buttons */
  heading?: string;

  /** Optional description text */
  description?: string;

  /** Background variant (default: 'sign-green') */
  variant?: 'sign-green' | 'brand-brown';
}
```

**Usage Example**:

```astro
<AdventureCTA
  heading="Ready to Hunt Elk River?"
  description="Stop by the shop for licenses, ammo, and local tips before you head out."
  primaryText="Get Directions"
  primaryHref="https://maps.google.com/?q=Elk+River+WMA"
  secondaryText="Call the Shop"
  secondaryHref="tel:+13045551234"
  variant="sign-green"
/>
```

---

### AdventureWhatToHunt Props

**Purpose**: Semantic wrapper for hunting-specific feature section.

```typescript
interface Props {
  /** Section heading (default: "What to Hunt") */
  title?: string;

  /** Array of huntable species */
  species: {
    name: string;        // "White-tailed Deer"
    season: string;      // "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2"
    notes?: string;      // Kim's tips
    regulationUrl?: string; // Link to WV DNR regs
  }[];

  /** Optional intro text */
  intro?: string;

  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';
}
```

**Usage Example**:

```astro
<AdventureWhatToHunt
  species={[
    {
      name: "White-tailed Deer",
      season: "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2",
      notes: "Bucks here run 100-150 inches. Steep terrain—play wind carefully.",
      regulationUrl: "https://wvdnr.gov/hunting/deer-regulations/",
    },
  ]}
/>
```

---

### AdventureWhatToFish Props

**Purpose**: Semantic wrapper for fishing-specific feature section.

```typescript
interface Props {
  /** Section heading (default: "Fishing Waters") */
  title?: string;

  /** Array of fishing waters */
  waters: {
    name: string;        // "Little Kanawha River"
    species: string[];   // ["Smallmouth Bass", "Rainbow Trout"]
    access: string;      // "Gravel road from Route 5, bring waders"
    notes?: string;      // Kim's tips or stocking info
  }[];

  /** Optional intro text */
  intro?: string;

  /** Background variant (default: 'cream') */
  variant?: 'white' | 'cream';
}
```

**Usage Example**:

```astro
<AdventureWhatToFish
  waters={[
    {
      name: "Little Kanawha River",
      species: ["Smallmouth Bass", "Rock Bass", "Catfish"],
      access: "Access from Route 5 bridge parking area. Waders recommended.",
      notes: "Best fishing Apr-Oct, mornings preferred. Stocked trout in spring.",
    },
  ]}
/>
```

---

## Testing Strategy

### Unit Tests (Zod Schema Validation)

**File**: `wv-wild-web/src/content/adventures/adventures.test.ts`

**Target**: 43+ tests (matching SPEC-11 coverage)

**Test Categories**:

1. **Schema Validation** (15 tests)
   - Valid WMA frontmatter passes all fields
   - Missing required fields fail (title, description, heroImage)
   - Invalid types fail (acreage as string, coordinates as number)
   - Negative acreage fails
   - Empty species array passes (optional field)
   - Species without name/season fails
   - Fishing waters with empty species array fails
   - Facilities with negative count fails
   - Malformed GPS coordinates fail
   - External URLs without protocol fail
   - Phone numbers in invalid format fail (future validation)
   - Regulations with empty restrictions array passes
   - Season highlights without tips fail
   - Hero image with missing alt text fails
   - Valid optional fields (all WMA fields) pass

2. **Backward Compatibility** (8 tests)
   - Existing elk-river.md parses without errors
   - Non-WMA adventures ignore WMA fields
   - Partial WMA data (only acreage + county) valid
   - Mixing old + new fields valid
   - Optional fields can be undefined
   - Empty arrays for optional fields valid
   - Null values for optional objects valid
   - Type inference works for Content Collections API

3. **Edge Cases** (10 tests)
   - 500-character description triggers warning
   - GPS coordinates outside WV bounds fail
   - XSS attempt in species name fails (HTML escaped)
   - Unicode characters in Kim's notes pass
   - Very long regulations array (20+ items) passes
   - Zero facilities renders gracefully
   - Empty fishing waters array hides section
   - Missing mapUrl hides map button
   - Contact phone with extensions valid
   - External facility links require https://

4. **Type Safety** (10 tests)
   - TypeScript autocomplete for WMA fields works
   - Imported types match Zod inferred types
   - Optional fields are `| undefined` in types
   - Array types are `T[]` not `Array<T>`
   - Nested object types flatten correctly
   - Discriminated unions for variant props
   - Enum types for icon names
   - Generic component props accept WMA data
   - Content Collections getEntry() types correct
   - Props interfaces match schema exactly

---

### E2E Tests (Component Rendering)

**File**: `wv-wild-web/tests/e2e/wma-components.spec.ts`

**Target**: 35+ scenarios (matching SPEC-11 coverage)

**Test Categories**:

1. **AdventureFeatureSection** (7 tests)
   - Renders 2-column grid on desktop
   - Renders 1-column on mobile (viewport 375px)
   - Applies border-l-4 border-l-sign-green
   - Displays Kim's notes in font-hand
   - Hides notes when not provided
   - Supports 3-column variant
   - Applies cream background variant

2. **AdventureCampingList** (7 tests)
   - Renders 3-column grid on desktop
   - Displays count badges correctly
   - Renders phone as clickable tel: link
   - External links open in new tab
   - Hides contact when not provided
   - ADA notes display correctly
   - Empty facilities array shows fallback

3. **AdventureAmenitiesGrid** (5 tests)
   - Renders checkmark icons (sign-green)
   - Applies responsive grid (2/3/4 columns)
   - Handles long amenity text gracefully
   - Empty array hides section
   - Icon color prop changes checkmark color

4. **AdventureCTA** (5 tests)
   - Renders 2 buttons in flex row
   - Primary button has sign-green bg
   - Secondary button has border + hover fill
   - Links navigate correctly
   - Heading/description render when provided

5. **AdventureWhatToHunt** (5 tests)
   - Renders species cards from array
   - Formats season as subtitle
   - Kim's notes in Permanent Marker font
   - Regulation URL links to WV DNR
   - Empty species array hides section

6. **AdventureWhatToFish** (6 tests)
   - Renders water body cards
   - Species list comma-separated
   - Access notes display below species
   - Notes in font-hand when provided
   - Empty waters array hides section
   - Handles 5+ species gracefully

---

### Accessibility Tests (axe-core)

**File**: `wv-wild-web/tests/a11y/wma-accessibility.spec.ts`

**Target**: Zero violations (WCAG 2.1 AA)

**Test Scenarios**:

1. **Color Contrast** (5 tests)
   - Brown on cream: ≥4.5:1 (expected: 13.8:1)
   - Green on cream: ≥4.5:1 (expected: 6.2:1)
   - Orange on white: ≥4.5:1 (expected: 3.7:1) - may need darkening
   - White on green: ≥4.5:1 (CTA buttons)
   - Large text (18pt+): ≥3:1

2. **Semantic HTML** (8 tests)
   - Single h1 per page
   - Heading hierarchy (h1 → h2 → h3, no skips)
   - Landmark regions (header, nav, main, footer)
   - Lists use ul/ol (not div)
   - Links have descriptive text (no "click here")
   - Buttons use <button> not <div role="button">
   - Images have alt text
   - Form labels associated with inputs

3. **Keyboard Navigation** (6 tests)
   - All interactive elements reachable via Tab
   - Focus order follows visual order
   - Focus visible (ring-2 ring-brand-orange)
   - Skip to main content link works
   - Modal traps focus correctly
   - Escape key closes modals

4. **Screen Reader** (8 tests)
   - ARIA labels on icon-only buttons
   - aria-hidden="true" on decorative icons
   - role="region" on major sections
   - Live regions for dynamic content
   - Table headers for data tables
   - Alternative text for maps
   - Link purpose clear from text alone
   - Form error messages announced

5. **Reduced Motion** (3 tests)
   - Animations disabled with prefers-reduced-motion
   - Transitions respect user preference
   - Scroll behavior: smooth → auto

---

### Visual Regression Tests (Percy/Playwright)

**File**: `wv-wild-web/tests/visual/wma-snapshots.spec.ts`

**Target**: 20+ snapshots (mobile + desktop)

**Viewports**:
- Mobile: 375×667 (iPhone SE)
- Tablet: 768×1024 (iPad)
- Desktop: 1280×720 (laptop)
- Wide: 1920×1080 (desktop)

**Snapshot Scenarios**:

1. **Full WMA Page** (4 snapshots)
   - Mobile full page scroll
   - Tablet full page
   - Desktop above fold
   - Desktop full page

2. **Individual Components** (16 snapshots)
   - AdventureFeatureSection (2-col, 3-col)
   - AdventureCampingList (empty, populated)
   - AdventureAmenitiesGrid (2/3/4 columns)
   - AdventureCTA (green, brown variants)
   - AdventureWhatToHunt (1 species, 5 species)
   - AdventureWhatToFish (1 water, 3 waters)
   - All components on mobile
   - All components on desktop

3. **State Variations** (6 snapshots)
   - Hover states (CTA buttons, category cards)
   - Focus states (keyboard navigation)
   - Empty states (no facilities, no fishing)
   - Long content (20+ regulations, 500-char descriptions)
   - Error states (build failures shown as placeholders)
   - Print styles (@media print)

---

## Dependencies

### Internal Dependencies

**Required Components** (from SPEC-10/11):
- ✅ `AdventureQuickStats.astro` - Stats grid (acreage, drive time, county)
- ✅ `AdventureGettingThere.astro` - Directions with map link
- ✅ `AdventureGearChecklist.astro` - Required/optional gear lists
- ✅ `AdventureRelatedShop.astro` - Category links with CTAs

**Required Schemas** (from SPEC-06):
- ✅ `adventures` Content Collection - Base schema to extend
- ✅ `ImageSchema` - Reuse for heroImage validation
- ✅ `StatIconSchema` - Reuse for icon types

**Shared Utilities**:
- ✅ `STAT_ICON_PATHS` constant - Reuse checkmark, location, info icons
- ✅ Tailwind config - Brand colors, font families
- ✅ Layout components - BaseLayout, EmailCapture

### External Dependencies

**Runtime Dependencies** (no changes required):
- ✅ Astro 4.x - Static site generation
- ✅ Tailwind CSS 3.x - Utility-first CSS
- ✅ Zod 3.x - Schema validation

**Development Dependencies**:
- ✅ Vitest - Unit testing (already installed)
- ✅ Playwright - E2E testing (already installed)
- ✅ @axe-core/playwright - Accessibility testing (need to install)
- ✅ Prettier - Code formatting (already installed)

**Optional Dependencies** (future enhancements):
- ⏳ Leaflet.js - Interactive maps (progressive enhancement)
- ⏳ Mapbox Static API - Static map images (Phase 2)

### Data Dependencies

**WV DNR Data Sources**:
- WMA boundaries GeoJSON (96 WMAs, 1.4M acres)
- Species hunting seasons (annual updates)
- Facility listings (parking, boat ramps, camping)
- GPS coordinates (NAD 1983 standard)

**Content Requirements** (per WMA page):
- ✅ Hero image (1920×1080, <500KB WebP)
- ✅ 3-5 huntable species with seasons
- ✅ 1-3 fishing waters with species lists
- ✅ Facility descriptions (parking, boat ramps, camping)
- ✅ 2-4 access points with GPS
- ✅ Regulations (zone, restrictions)
- ✅ 2-3 season highlights with Kim's tips

---

## Acceptance Criteria

### Phase 1: Component Development

**AC-001**: 6 new components created in `wv-wild-web/src/components/adventure/`
- ✅ AdventureFeatureSection.astro
- ✅ AdventureCampingList.astro
- ✅ AdventureAmenitiesGrid.astro
- ✅ AdventureCTA.astro
- ✅ AdventureWhatToHunt.astro
- ✅ AdventureWhatToFish.astro

**AC-002**: Each component <100 lines (excluding comments)

**AC-003**: TypeScript props interfaces with JSDoc comments

**AC-004**: Zod schemas for all complex prop types

**AC-005**: Components pass Prettier formatting checks

---

### Phase 2: Schema Extension

**AC-006**: `adventures` collection extended with 8 optional WMA fields

**AC-007**: Zero breaking changes to existing adventures (elk-river.md still builds)

**AC-008**: Build fails with clear error messages for invalid WMA data

**AC-009**: TypeScript autocomplete works for all new fields

**AC-010**: Migration guide added to `content.config.ts` comments

---

### Phase 3: Testing

**AC-011**: 43+ unit tests for schema validation (all passing)

**AC-012**: 35+ E2E tests for component rendering (all passing)

**AC-013**: Zero axe-core accessibility violations (WCAG 2.1 AA)

**AC-014**: 20+ visual regression snapshots (mobile + desktop)

**AC-015**: Test coverage report shows ≥85% line coverage

---

### Phase 4: WVWO Aesthetic Compliance

**AC-016**: Zero instances of `rounded-md/lg/xl/2xl/3xl` (only `rounded-sm`)

**AC-017**: All colors from brand palette (#3E2723, #2E7D32, #FFF8E1, #FF6F00)

**AC-018**: Orange usage <5% of screen area (CTAs only)

**AC-019**: Typography uses only Bitter, Noto Sans, Permanent Marker

**AC-020**: No glassmorphism, backdrop-blur, purple gradients

**AC-021**: Transitions use `transition-colors duration-300` only

**AC-022**: Animations use `gentle-reveal` pattern with prefers-reduced-motion

---

### Phase 5: Content Population

**AC-023**: 5 WMA pages published (Elk River + 4 new: Burnsville, Cranberry, Tygart, Stonewall)

**AC-024**: Each WMA page has 15+ frontmatter fields populated

**AC-025**: Kim's tips present in ≥50% of species cards

**AC-026**: All hero images optimized (WebP, <500KB, 1920×1080)

**AC-027**: All external links (DNR, Google Maps) functional

---

### Phase 6: Performance & SEO

**AC-028**: Lighthouse Performance score ≥95/100

**AC-029**: Lighthouse Accessibility score 100/100

**AC-030**: Lighthouse Best Practices score 100/100

**AC-031**: Lighthouse SEO score 100/100

**AC-032**: Page load time <2s on 3G (Chrome DevTools throttling)

**AC-033**: Critical CSS inlined in `<head>`

**AC-034**: Images lazy-loaded below fold

**AC-035**: Unique meta descriptions for each WMA (150-160 chars)

---

### Phase 7: PR Quality

**AC-036**: PR review score ≥90/100 (matching SPEC-10/11 quality bar)

**AC-037**: Zero CodeRabbit "must fix" issues

**AC-038**: All PR checklist items completed

**AC-039**: Documentation updated (README, component API docs)

**AC-040**: Changelog entry added to `SPEC-12-template-wma/CHANGELOG.md`

---

## Clarifications

### Session 2025-12-27
- **Q1: WMA vs Regular Adventure Differentiation** → **A: Add explicit `type: 'wma'` field to adventures schema (Option C)**
  - Rationale: Self-documenting, future-proof (can add 'trail', 'campground' types), excellent type safety
  - Implementation: Add `type: z.enum(['adventure', 'wma']).optional()` to schema
  - Backward compatibility: Requires one-time update to elk-river.md (add `type: 'wma'`)
  - PR Safety: Add Greptile custom context to flag missing `type` when WMA fields present

- **Q2: Component Architecture (Wrappers vs Standalone)** → **A: Use wrapper pattern (Option A)**
  - Rationale: DRY principle, easier maintenance, change once affects both hunting/fishing components
  - Implementation: Build AdventureFeatureSection (generic), then thin wrappers for AdventureWhatToHunt and AdventureWhatToFish
  - Component count: 4 new components (not 6), ~50 fewer lines of code
  - Trade-off: Slightly more complex to understand wrapper pattern vs standalone

- **Q3: Map Implementation Strategy** → **A: Static-first with progressive enhancement (Option A)**
  - Rationale: <1s load on 3G, works offline/print, 50-70% less battery than interactive
  - Phase 1: Mapbox Static API or OpenStreetMap tiles (zero JavaScript)
  - Phase 2: Add Leaflet.js for WMAs with 3+ access points (progressive enhancement)
  - Free tier: Mapbox Static API 50k requests/month (sufficient for WVWO traffic)
  - Fallback: Accessible data table with locations, GPS, directions for screen readers

- **Q4: Kim's Tips Placement** → **A: Inline in species/facility cards (Option A)**
  - Rationale: More authentic scattered local knowledge, feels personal not structured
  - Implementation: Use `notes` field in species/fishingWaters schemas, render in `font-hand` (Permanent Marker)
  - Coverage target: ≥50% of species cards have Kim's tips
  - Voice: Specific, humble expertise ("Bucks here run 100-150 inches" not "trophy bucks")

- **Q5: Phase 1 WMA Selection** → **A: Closest 4 to shop (Option C)**
  - WMAs: Burnsville Lake, Summersville Lake, Holly River, Cranberry
  - Rationale: High shop traffic areas, customers already hunt/fish here, Kim has deep local knowledge
  - Regional focus: Central WV (shop service area)
  - Business value: Direct gear recommendations, "stop by on your way" messaging authentic
  - Drive times: All <45 min from shop (Burnsville 25min, Summersville 30min, Holly River 35min, Cranberry 40min)

---

## Open Questions

### Architecture Decisions

~~**Q1: Component Granularity**~~ **RESOLVED (Session 2025-12-27)**
- ✅ Decision: Wrapper pattern (Option A)
- Components: AdventureWhatToHunt and AdventureWhatToFish are thin wrappers around AdventureFeatureSection
- Impact: 4 new components + 2 wrappers (not 6 standalone)

~~**Q2: Map Implementation**~~ **RESOLVED (Session 2025-12-27)**
- ✅ Decision: Static-first with progressive enhancement (Option A)
- Phase 1: Static images (Mapbox Static API), zero JavaScript
- Phase 2: Add Leaflet.js for complex WMAs (3+ access points)
- Benefits: <1s load on 3G, works offline/print, 50-70% battery savings

~~**Q3: Kim's Tips Placement**~~ **RESOLVED (Session 2025-12-27)**
- ✅ Decision: Inline in species/facility cards (Option A)
- Implementation: Use `notes` field in species/fishingWaters, render in `font-hand`
- Coverage: ≥50% of species cards have Kim's tips
- Voice: Specific humble expertise, no marketing buzzwords

~~**Q4: Phase 1 WMA Selection**~~ **RESOLVED (Session 2025-12-27)**
- ✅ Decision: Closest 4 to shop (Option C)
- WMAs: Burnsville Lake (25min), Summersville Lake (30min), Holly River (35min), Cranberry (40min)
- Rationale: High shop traffic, Kim's deep local knowledge, authentic "stop by on your way" messaging
- Business value: Direct gear recommendations for areas customers already hunt/fish

---

### Content Strategy

**Q5: GPS Format**
- **Question**: Decimal degrees only, or include DMS (degrees/minutes/seconds)?
- **Proposed Answer**: Both (primary: decimal for copy-paste, secondary: DMS for older GPS units)
- **Impact**: Wider device compatibility, better UX for older hunters
- **Decision Needed By**: Before schema finalization
- **Assigned To**: GIS Specialist

**Q6: Regulations Update Frequency**
- **Question**: How often do WMA regulations change?
- **Answer Needed**: Research WV DNR update cycles
- **Impact**: Determines manual update schedule vs. API integration need
- **Decision Needed By**: Before Phase 3 (96 WMAs)
- **Assigned To**: Content Operations

---

### Technical Decisions

**Q7: Image Optimization**
- **Question**: WebP only, or fallback formats (JPEG, PNG)?
- **Proposed Answer**: WebP with `<picture>` fallback for older browsers
- **Impact**: 25-30% smaller files, 98% browser support
- **Decision Needed By**: Before content population
- **Assigned To**: Performance Engineer

**Q8: Print Styles**
- **Question**: Should WMA pages be print-optimized?
- **Proposed Answer**: Yes (hunters print maps for offline use)
- **Impact**: @media print styles, PDF-friendly layout
- **Decision Needed By**: Before Phase 2
- **Assigned To**: Frontend Developer

**Q9: Schema Validation Warnings**
- **Question**: Should 500-char description trigger build error or warning?
- **Proposed Answer**: Warning only (SEO best practice, not hard requirement)
- **Impact**: Better SEO guidance without blocking builds
- **Decision Needed By**: Before schema implementation
- **Assigned To**: SEO Specialist

---

### Accessibility & Compliance

**Q10: Map Alternatives**
- **Question**: What level of detail required for accessible data table alternative?
- **Proposed Answer**: Location name, GPS, amenities, directions (structured table)
- **Impact**: Meets WCAG 2.1 AA, screen reader friendly
- **Decision Needed By**: Before Phase 1
- **Assigned To**: Accessibility Engineer

**Q11: Icon-Only Buttons**
- **Question**: ARIA labels or visible text for map/phone buttons?
- **Proposed Answer**: Visible text + icons (better UX, no ARIA needed)
- **Impact**: Clearer CTAs, simpler markup
- **Decision Needed By**: Before component development
- **Assigned To**: UX Designer

---

### Future Enhancements

**Q12: Multi-Language Support**
- **Question**: Should components support i18n (Spanish, etc.)?
- **Proposed Answer**: Out of scope for SPEC-12, revisit in Phase 3
- **Impact**: Future-proofing vs. complexity tradeoff
- **Decision Needed By**: Before 96 WMA expansion
- **Assigned To**: Product Manager

**Q13: User-Generated Content**
- **Question**: Should hunters submit trip reports/photos?
- **Proposed Answer**: Out of scope (requires auth, moderation, storage)
- **Impact**: Community engagement vs. scope creep
- **Decision Needed By**: After Phase 2
- **Assigned To**: Product Roadmap

**Q14: Geolocation Features**
- **Question**: Should site detect user location for "Near Me" sorting?
- **Proposed Answer**: Out of scope (privacy concerns, complexity)
- **Impact**: Better UX vs. technical debt
- **Decision Needed By**: After Phase 3
- **Assigned To**: Privacy/Legal Review

---

## Timeline & Milestones

### Phase 1: Component Development (Week 1)
- **Day 1-2**: Schema extension + Zod validation
- **Day 3-4**: 6 new components + props interfaces
- **Day 5-7**: Unit tests (43+ tests)

### Phase 2: Integration & Testing (Week 2)
- **Day 1-2**: E2E tests (35+ scenarios)
- **Day 3-4**: Accessibility tests (axe-core)
- **Day 5-7**: Visual regression snapshots

### Phase 3: Content Population (Week 3)
- **Day 1-3**: Burnsville Lake + Cranberry WMA pages
- **Day 4-6**: Tygart Lake + Stonewall Jackson Lake pages
- **Day 7**: Review, polish, Kim's tips refinement

### Phase 4: Performance & QA (Week 4)
- **Day 1-2**: Lighthouse audits + optimization
- **Day 3-4**: Cross-browser testing (Chrome, Firefox, Safari)
- **Day 5-6**: WVWO aesthetic audit (100% compliance)
- **Day 7**: PR preparation + documentation

### Phase 5: PR Review & Merge (Week 5)
- **Day 1-3**: Address CodeRabbit feedback
- **Day 4-5**: Final QA + regression testing
- **Day 6-7**: Merge + production deployment

---

## Success Metrics

### Quality Metrics

- **PR Review Score**: ≥90/100 (target: 94+ like SPEC-10/11)
- **Unit Test Coverage**: ≥43 tests passing
- **E2E Test Coverage**: ≥35 scenarios passing
- **Accessibility Score**: 100/100 (zero violations)
- **Visual Regression**: Zero unexpected changes

### Performance Metrics

- **Lighthouse Performance**: ≥95/100
- **Page Load Time**: <2s on 3G
- **Total Page Weight**: <500KB uncompressed
- **Time to Interactive**: <3s
- **Largest Contentful Paint**: <2.5s

### Aesthetic Compliance Metrics

- **Forbidden Patterns**: 0 instances (rounded-md/lg, purple, glassmorphism)
- **Brand Palette Compliance**: 100% (only approved colors)
- **Font Hierarchy**: 100% (Bitter/Noto Sans/Permanent Marker)
- **Orange Usage**: <5% screen area
- **Sharp Corners**: 100% (rounded-sm only)

### Content Metrics

- **WMAs Published**: 5 (Phase 1 target)
- **Frontmatter Fields Populated**: 15+ per WMA
- **Kim's Tips Coverage**: ≥50% of species cards
- **External Link Validity**: 100% functional
- **Image Optimization**: 100% WebP, <500KB

### Maintainability Metrics

- **Line Reduction**: 73% (533 → 150 lines per page)
- **Component Reuse**: ≥80% of page is composed components
- **Build Time**: <30s for 5 WMA pages
- **Developer Onboarding**: Kim can add WMA in <30 min

---

## Risks & Mitigation

### Risk 1: WVWO Aesthetic Violations (HIGH)

**Risk**: Components drift from brand guidelines during development.

**Impact**: PR rejection, rework delays, brand inconsistency.

**Mitigation**:
1. ✅ Pre-commit hooks enforce Prettier formatting
2. ✅ Visual regression tests catch styling drift
3. ✅ CodeRabbit reviews flag forbidden patterns
4. ✅ Aesthetic checklist in PR template

**Owner**: Frontend Developer + Design Reviewer

---

### Risk 2: Content Collection Breaking Changes (MEDIUM)

**Risk**: Extending `adventures` schema breaks existing pages.

**Impact**: Build failures, production downtime, rollback required.

**Mitigation**:
1. ✅ All WMA fields marked optional (zero breaking changes)
2. ✅ Backward compatibility tests (elk-river.md still builds)
3. ✅ Gradual rollout (1 WMA → 5 WMAs → 96 WMAs)
4. ✅ Rollback plan (revert schema extension)

**Owner**: Backend Architect + QA Engineer

---

### Risk 3: Performance Regression (MEDIUM)

**Risk**: Heavy component composition slows build/load times.

**Impact**: Poor UX on 3G, lower SEO rankings, frustrated users.

**Mitigation**:
1. ✅ Lighthouse audits in CI/CD (fail build if <95/100)
2. ✅ Image optimization (WebP, lazy loading, srcset)
3. ✅ Critical CSS inlining
4. ✅ Static HTML (zero runtime JS)

**Owner**: Performance Engineer

---

### Risk 4: Accessibility Failures (LOW)

**Risk**: Components fail WCAG 2.1 AA, blocking government compliance.

**Impact**: Legal risk, poor UX for disabled users, SEO penalties.

**Mitigation**:
1. ✅ axe-core tests in CI (zero violations required)
2. ✅ Manual screen reader testing (NVDA, JAWS)
3. ✅ Keyboard navigation tests
4. ✅ Color contrast validation (automated)

**Owner**: Accessibility Specialist

---

### Risk 5: Content Scalability (MEDIUM)

**Risk**: Manual content entry for 96 WMAs is unsustainable.

**Impact**: Phase 3 delays, Kim burnout, inconsistent quality.

**Mitigation**:
1. ✅ Content templates with defaults
2. ✅ WV DNR data scraping (acreage, GPS, species)
3. ✅ Bulk import tools (CSV → frontmatter)
4. ✅ Content review workflows

**Owner**: Content Operations + DevOps

---

## Appendix

### Research Artifacts

**Research Plan**: [peppy-dancing-dewdrop.md](~/.claude/plans/peppy-dancing-dewdrop.md)

**10 Research Agents**:
1. elk-river.astro analysis (463 lines, 9 sections)
2. SPEC-10/11 component patterns (94/100 PR score)
3. SPEC-06 Content Collections schema
4. WMA website best practices (8 state agencies)
5. Astro component architecture
6. Hunting/fishing content patterns (5 family businesses)
7. Geographic/mapping integration
8. WCAG accessibility (ADA.gov, W3C)
9. Rural WV voice patterns (Appalachian culture)
10. Content Collections extension strategy

**Key Files Analyzed**:
- `wv-wild-web/src/pages/near/elk-river.astro` (canonical reference)
- `wv-wild-web/src/components/adventure/` (4 existing components)
- `wv-wild-web/src/content.config.ts` (schema to extend)
- `docs/specs/_completed/SPEC-10/` (proven patterns)
- `docs/specs/_completed/SPEC-11/` (component bundle)

---

### WVWO Aesthetic Reference

**Approved Fonts**:
- `font-display`: Bitter (serif, display headings)
- `font-body`: Noto Sans (sans-serif, body text)
- `font-hand`: Permanent Marker (cursive, Kim's personal touches)

**Approved Colors**:
- `--brand-brown`: #3E2723 (rifle stocks, barn wood)
- `--sign-green`: #2E7D32 (old metal signs, forest canopy)
- `--brand-cream`: #FFF8E1 (aged paper, deer hide)
- `--brand-orange`: #FF6F00 (blaze orange, CTAs only <5%)

**Approved Patterns**:
- Border radius: `rounded-sm` (0.125rem) ONLY
- Transitions: `transition-colors duration-300`
- Animations: `gentle-reveal` (0.6s ease-out, opacity + translateY)
- Border accents: `border-l-4 border-l-{color}`

**Forbidden Patterns**:
- ❌ Fonts: Inter, Poppins, DM Sans, system-ui
- ❌ Colors: Purple, hot pink, neon, corporate blue
- ❌ Effects: Glassmorphism, backdrop-blur, parallax
- ❌ Corners: rounded-md/lg/xl/2xl/3xl
- ❌ Copy: "Unlock potential," "Seamless," "Revolutionize"

---

### Example WMA Frontmatter

```yaml
---
# === REQUIRED FIELDS (from SPEC-06) ===
title: "Burnsville Lake WMA - Hunting & Fishing Guide"
description: "1,000 acres of premier hunting and fishing on Burnsville Lake. Deer, turkey, bass, and more. 25 minutes from WVWO shop."
heroImage: "/images/wma/burnsville-lake-hero.webp"
coordinates:
  lat: 38.8419
  lng: -80.6561

# === EXPLICIT TYPE (SPEC-12 Session 2025-12-27) ===
type: "wma"

# === OPTIONAL WMA FIELDS (SPEC-12) ===
acreage: 1000
county: "Braxton"

species:
  - name: "White-tailed Deer"
    season: "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2"
    notes: "Bucks here run 100-150 inches. Creek bottoms at dawn."
    regulationUrl: "https://wvdnr.gov/hunting/deer-regulations/"

  - name: "Wild Turkey"
    season: "Spring: Apr 15-May 15, Fall: Oct 1-Nov 15"
    notes: "Ridge tops for gobbler calls. Bring decoys."
    regulationUrl: "https://wvdnr.gov/hunting/turkey-regulations/"

fishingWaters:
  - name: "Burnsville Lake"
    species: ["Smallmouth Bass", "Largemouth Bass", "Crappie", "Catfish"]
    access: "Boat ramps at Bulltown and Riffle Run. Bank fishing allowed."
    notes: "Bass best Apr-Jun mornings. Crappie spawn in April."

  - name: "Little Kanawha River"
    species: ["Smallmouth Bass", "Rock Bass"]
    access: "Wader access from Route 5 bridge parking."

facilities:
  - type: "Boat Ramps"
    count: 2
    description: "Concrete ramps with courtesy docks at Bulltown and Riffle Run."

  - type: "Parking"
    description: "Multiple lots with 50+ vehicle capacity."
    accessibility: "ADA-accessible parking at Bulltown ramp."

  - type: "Restrooms"
    count: 3
    description: "Seasonal restrooms at boat ramps and picnic areas."

accessPoints:
  - name: "Bulltown Boat Ramp"
    coords: "38.8419° N, 80.6561° W"
    features: ["Concrete ramp", "Parking (30 vehicles)", "Restrooms", "ADA access"]
    mapLink: "https://maps.google.com/?q=38.8419,-80.6561"

regulations:
  zone: "Zone 3"
  restrictions:
    - "Blaze orange required during firearms season (500 sq in)"
    - "No hunting within 100 yards of boat ramps or picnic areas"
    - "Check daily limits at wvdnr.gov"
  regulationsUrl: "https://wvdnr.gov/hunting/regulations.pdf"

seasonHighlights:
  - season: "Fall Deer (Archery)"
    target: "White-tailed Bucks"
    tips: "Creek bottoms at dawn. Wind swirls in hollows—play it carefully. We've got tree stands in stock."

  - season: "Spring Gobbler"
    target: "Wild Turkey"
    tips: "Ridge tops for morning calls. Set up near oak flats. Stop by for decoys and calls."

mapUrl: "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/-80.6561,38.8419,12,0/600x400?access_token=YOUR_TOKEN"

# === OPTIONAL EXISTING FIELDS ===
drive_time: "25 minutes"
kim_hook: "Stop by the shop before you head out — we'll get you set up with licenses, ammo, and local tips."
gear: ["Hunting license", "Blaze orange", "Tree stand", "Waders", "Fishing rod"]
---
```

---

**END OF SPECIFICATION**

---

**Next Steps**:
1. ✅ SPEC-12 specification complete
2. ⏳ User approval required
3. ⏳ Implementation (6 components + schema)
4. ⏳ Testing (43 unit + 35 E2E + accessibility)
5. ⏳ Content population (5 WMAs)
6. ⏳ PR review + merge

**Estimated Effort**: 5 weeks (1 week per phase)

**Risk Level**: MEDIUM (proven patterns from SPEC-10/11 reduce risk)

**Success Probability**: HIGH (94/100 PR score precedent, clear requirements, research-backed decisions)