# SPEC-12: WMA Template System

**Status**: Draft
**Created**: 2025-12-27
**Author**: Claude (Code Implementation Agent)
**Epic**: Frontend Component Architecture
**Dependencies**: SPEC-11 (Adventure Shared Components)

---

## Overview

WMA (Wildlife Management Area) pages share identical structure with only varying content - area name, acreage, terrain descriptions, and hunting opportunities. Currently each WMA page duplicates 533 lines of layout code, making updates error-prone when Kim needs to change navigation, add features, or fix styling. This template system extracts the reusable structure into a single source of truth, reducing each WMA page to 150 lines of content-only configuration while maintaining the existing visual design.

## Problem Statement

### Current State

- **elk-river.astro**: 463 lines (canonical reference)
- **Other WMA pages**: 533+ lines each (8 pages × 533 = 4,264 total lines)
- **Duplication rate**: 62% of each page is duplicated layout code
- **Components ratio**: Only 38% uses shared components from SPEC-11

### Pain Points

1. **Navigation changes**: Requires editing 8+ files manually
2. **Style updates**: Risk of inconsistent implementation across pages
3. **New features**: Must replicate to every WMA page individually
4. **Bug fixes**: Easy to miss pages or introduce new bugs
5. **Maintenance burden**: Kim can't easily update WMA content without touching layout code

### Opportunity

Extract the 62% duplicated structure into a reusable template:

- **Before**: 533 lines per page (layout + content mixed)
- **After**: 150 lines per page (content configuration only)
- **Reduction**: 73% fewer lines per WMA page
- **Benefit**: Change navigation once, updates all 8 pages automatically

The template will separate structure (DRY, maintained once) from content (what makes each WMA unique).

---

## Non-Functional Requirements

### Performance

**Load Time & Bundle Size**

- **Target**: < 2 seconds on 3G connections (rural WV baseline)
- **Initial HTML**: < 50KB gzipped per WMA page
- **Total page weight**: < 150KB including all assets (CSS, fonts, images)
- **Static generation**: All WMA pages pre-rendered at build time (zero server-side processing)
- **Font loading**: System font fallbacks prevent FOIT (Flash of Invisible Text)
- **Critical CSS**: Inline above-fold styles to eliminate render-blocking requests

**Lighthouse Targets**

- **Performance**: 100/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

**Rationale**: Many hunters access WMA info from remote areas with poor cellular coverage. Pages must load reliably on 3G (0.4 Mbps) and degrade gracefully on 2G.

### Accessibility

**WCAG 2.1 AA Compliance** (mandatory by April 2026 West Virginia policy)

**Screen Reader Support**

- Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- ARIA labels for all interactive elements
- Proper heading hierarchy (h1 → h2 → h3, no skipped levels)
- Alt text for all informational images (maps, terrain photos)
- Descriptive link text (avoid "click here" or "read more")

**Keyboard Navigation**

- All interactive elements reachable via Tab key
- Visible focus indicators (2px solid outline, 3:1 contrast minimum)
- Skip-to-content link for bypassing repetitive navigation
- No keyboard traps in modals or expandable sections

**Color Contrast**

- **Text**: 4.5:1 minimum for body text (WCAG AA)
- **Large text** (18pt+): 3:1 minimum
- **Interactive elements**: 3:1 minimum against adjacent colors
- **Brand palette compliance**: All WVWO colors (#3E2723, #2E7D32, #FFF8E1, #FF6F00) tested against backgrounds

**Print Accessibility**

- 8.5" × 11" portrait layout optimized for printing regulations/maps
- High contrast black text on white background
- Page breaks prevent awkward content splits
- Print-only styles hide navigation and decorative elements

**Testing Requirements**

- Automated: axe DevTools, Lighthouse Accessibility
- Manual: NVDA/JAWS screen reader verification
- Keyboard-only navigation audit per WMA page

### Security

**Zero Client-Side Secrets**

- No API keys, tokens, or credentials in HTML/CSS/JS
- Static pages eliminate authentication attack surface
- All external data (e.g., weather APIs) fetched server-side during build

**Safe External Links**

- `rel="noopener noreferrer"` on all external links (prevents `window.opener` attacks)
- HTTPS-only links to West Virginia DNR, weather services, regulations
- Content Security Policy (CSP) headers prevent inline script injection

**Privacy**

- No third-party tracking scripts (Google Analytics, etc.)
- No cookies or local storage (eliminates GDPR/CCPA compliance burden)
- No external fonts from CDNs (privacy + performance)

**Build-Time Validation**

- Automated checks for hardcoded secrets in CI/CD
- Link checker ensures no broken or insecure (HTTP) links
- Dependency scanning for vulnerable packages (npm audit)

**Rationale**: Static HTML eliminates 90% of web attack vectors (SQL injection, XSS, CSRF). Remaining risks mitigated through CSP headers and secure link policies.

---

## User Stories

### Kim (Shop Owner)

**Story 1: Showcase WMA Knowledge**
> "As Kim, I want each WMA page to show my personal hunting tips and favorite spots, so hunters trust me as their local expert who actually hunts these areas."

- **Acceptance Criteria**:
  - WMA pages display "Kim's Local Tips" section with hunting advice
  - Tips reference specific terrain features (ridges, creek bottoms, oak stands)
  - Each tip sounds like face-to-face advice, not generic content

**Story 2: Link WMAs to Relevant Gear**
> "As Kim, I want to recommend specific products for each WMA's terrain, so hunters buy the right gear for steep laurel thickets versus open ridges."

- **Acceptance Criteria**:
  - WMA pages show "Recommended Gear" section
  - Gear recommendations match terrain type (steep, flat, thick cover, open woods)
  - Products link directly to shop inventory
  - Each WMA has 3-5 tailored product recommendations

**Story 3: Share Seasonal Hunting Strategies**
> "As Kim, I want to explain what hunts best when at each WMA, so customers know whether to come for spring gobbler, fall archery, or rifle buck season."

- **Acceptance Criteria**:
  - WMA pages show hunting calendar with seasonal opportunities
  - Each season lists target species and hunting methods
  - Tips reference WV hunting regulations and seasons
  - Content reflects actual WV DNR season dates

**Story 4: Update All WMAs at Once**
> "As Kim, I want to add a new navigation link or feature once and have it show on all WMA pages, so I'm not editing 8+ files every time I improve the site."

- **Acceptance Criteria**:
  - Navigation changes apply to all WMA pages automatically
  - Adding new sections (like "Trail Cameras Allowed?") updates all WMAs
  - Bug fixes in layout don't require touching each WMA file individually

---

### Content Editor

**Story 1: Populate New WMA Quickly**
> "As a content editor, I want to add a new WMA by filling out a simple content file, so I'm not copying 533 lines of code and risking layout bugs."

- **Acceptance Criteria**:
  - New WMA requires only content fields (name, acreage, description, tips)
  - No HTML or component code in WMA content files
  - Adding WMA takes <30 minutes instead of 2+ hours
  - Template handles all layout/structure automatically

**Story 2: Reuse Components Consistently**
> "As a content editor, I want to know components work the same across all WMAs, so I'm not debugging why AdventureHero looks different on Lewis Wetzel versus Beech Fork."

- **Acceptance Criteria**:
  - All WMAs use identical component structure
  - Components render predictably with same props
  - Visual consistency across all 8+ WMA pages
  - No one-off layout tweaks per WMA

**Story 3: Update Content Without Breaking Layout**
> "As a content editor, I want to change hunting tips or acreage without touching navigation or components, so I don't accidentally break the page structure."

- **Acceptance Criteria**:
  - Content changes isolated from layout code
  - Editing tips/descriptions doesn't affect components
  - Can't accidentally delete navigation or footer
  - Content validation prevents breaking changes

---

### Developer

**Story 1: Maintain Template Centrally**
> "As a developer, I want one template file controlling all WMA layouts, so navigation improvements deploy to 8 pages with one commit instead of eight."

- **Acceptance Criteria**:
  - Single `WMATemplate.astro` file defines structure
  - Changes to template propagate to all WMAs instantly
  - No duplicated layout code across WMA pages
  - Template uses SPEC-11 components (AdventureHero, QuickStats, etc.)

**Story 2: Add New WMAs Without Copying Code**
> "As a developer, I want to create new WMA pages by writing content configuration only, so I'm not maintaining 533-line files that are 62% duplicate code."

- **Acceptance Criteria**:
  - New WMA = 150 lines of content config (not 533 lines)
  - No copy-pasting layout code
  - Template automatically handles routing, navigation, components
  - Can add WMA in single PR with just content file

**Story 3: Refactor Template Without Touching Content**
> "As a developer, I want to improve the template's component structure without editing 8+ WMA content files, so I can iterate on design without risking content bugs."

- **Acceptance Criteria**:
  - Template changes don't require WMA content file edits
  - Can swap components in template without content migrations
  - Content schema validated separately from template logic
  - Regression tests catch template changes breaking WMA pages

---

### Hunter/Angler

**Story 1: Find WMA Information Fast**
> "As a hunter, I want to quickly see what game is available and how hard the terrain is, so I know if this WMA fits my physical ability and target species."

- **Acceptance Criteria**:
  - WMA pages show acreage, terrain type, species list above fold
  - Quick stats (elevation gain, difficulty, access) immediately visible
  - No scrolling to find basic facts
  - Information matches WV DNR official data

**Story 2: Get Local Hunting Advice**
> "As a hunter, I want Kim's honest opinion about where to hunt and what gear to bring, so I'm not guessing what 'steep terrain' means or which boots handle mud."

- **Acceptance Criteria**:
  - WMA pages show Kim's firsthand hunting tips
  - Tips reference specific terrain challenges (laurel, creek crossings, elevation)
  - Gear recommendations explain why (e.g., "gaiters for briars")
  - Advice sounds like talking to a local, not reading a brochure

**Story 3: Plan Hunting Trips by Season**
> "As a hunter, I want to see what hunts are legal when at each WMA, so I don't plan a turkey hunt during closed season or miss the best rut dates."

- **Acceptance Criteria**:
  - WMA pages show seasonal hunting calendar
  - Each season lists legal species and methods
  - Dates align with current WV DNR regulations
  - Best hunting times noted (e.g., "early October for acorns")

**Story 4: Access WMA Pages on Mobile**
> "As a hunter, I want WMA pages to load fast on my phone in the truck, so I can double-check tips and directions before hiking in."

- **Acceptance Criteria**:
  - WMA pages load in <3 seconds on 4G
  - Navigation and stats readable on mobile screens
  - Maps and images optimized for mobile bandwidth
  - No horizontal scrolling or broken layouts on small screens

---

## Goals & Non-Goals

### Goals

**Primary Objectives:**

1. **Component Creation** (6 new WMA-specific components)
   - `AdventureFeatureSection` - Reusable feature highlight blocks
   - `AdventureCampingList` - Camping facility listings with accessibility info
   - `AdventureSeasonalInfo` - Seasonal hunting/access schedules
   - `AdventureRegulations` - WMA-specific rules and restrictions
   - `AdventureAccessibilityInfo` - Disability access details
   - `AdventureSafetyGuidelines` - Area-specific safety information

2. **Schema Extension** (8 optional WMA fields)
   - Extend `adventures` collection with WMA-specific metadata
   - Acreage, terrain type, camping facilities, accessibility features
   - Wildlife species, hunting seasons, regulations, safety notes
   - Maintain backward compatibility with existing adventure pages

3. **Code Reduction Target: 73% per WMA page**
   - **Before**: 533 lines per page (4,264 total across 8 WMAs)
   - **After**: 150 lines per page (1,200 total)
   - **Savings**: 3,064 lines removed from production codebase
   - **Maintenance**: Change template once → updates 8 pages automatically

4. **WCAG 2.1 AA Compliance**
   - Semantic HTML structure with proper heading hierarchy
   - ARIA labels for interactive elements
   - Keyboard navigation support
   - Color contrast ratios ≥ 4.5:1 for body text
   - Focus indicators for all focusable elements

5. **WVWO Aesthetic Enforcement**
   - `rounded-sm` only (no rounded-md/lg/xl)
   - Brand palette: `--brand-brown`, `--sign-green`, `--brand-cream`, `--brand-orange`
   - Typography: `Bitter` (display), `Permanent Marker` (hand), `Noto Sans` (body)
   - Orange usage <5% of screen (CTAs only)
   - Rural WV voice in all copy (no marketing buzzwords)

6. **Phase 1 Deployment: 5 High-Value WMAs**
   - Elk River WMA (reference implementation)
   - Beech Fork WMA
   - Stonewall Jackson Lake WMA
   - Chief Cornstalk WMA
   - McClintic WMA
   - Target: 85%+ of WV hunting traffic

### Non-Goals

**Explicitly Out of Scope:**

1. **Interactive Mapping Features**
   - NOT implementing clickable area maps (future Phase 2)
   - NOT adding GPS coordinate overlays
   - NOT building trail navigation tools
   - Rationale: Requires GIS data integration beyond current scope

2. **Complete WMA Coverage in Phase 1**
   - NOT covering all 96 West Virginia WMAs initially
   - Phase 1 targets 5 high-traffic WMAs (85% coverage)
   - Remaining 91 WMAs deferred to Phase 2+ based on analytics

3. **Real-Time Data Integration**
   - NOT fetching live hunting harvest reports
   - NOT displaying current weather conditions
   - NOT showing real-time facility availability
   - Static content only (updated manually by Kim)

4. **E-Commerce Features**
   - NOT adding permit purchase functionality
   - NOT implementing license verification
   - NOT building reservation systems
   - WVWO is a physical storefront; transactions remain in-person

5. **User-Generated Content**
   - NOT accepting user reviews or ratings
   - NOT allowing photo uploads from hunters
   - NOT building discussion forums
   - Content remains curated by Kim/WVDNR sources only

6. **Mobile-Specific Apps**
   - NOT building native iOS/Android apps
   - NOT implementing offline-first PWA features
   - NOT creating app store listings
   - Responsive web design sufficient for mobile hunters

7. **SEO Schema Beyond Basics**
   - NOT implementing complex LocalBusiness schema
   - NOT adding ReviewAggregation markup
   - NOT building dynamic FAQ schema
   - Basic Organization schema only (per existing site pattern)

---

## Functional Requirements (Core)

### Component Creation (6 New WMA Components)

**FR-001**: System MUST provide `AdventureFeatureSection` component that displays reusable feature blocks with title, description, and optional icon in WVWO styling (brand-brown headings, font-display, rounded-sm).

**FR-002**: System MUST provide `AdventureCampingList` component that renders camping facilities in responsive grid (1 column mobile, 2-3 columns desktop at md/lg breakpoints) with facility name, amenities array, and availability status.

**FR-003**: System MUST provide `AdventureAmenitiesGrid` component that displays WMA amenities (parking areas, restrooms, boat ramps, trails) in card-based responsive grid with icon support using existing STAT_ICON_PATHS from adventure.ts.

**FR-004**: System MUST provide `AdventureCTA` component for call-to-action sections with configurable button text, href, background color (defaults to brand-cream), and optional icon (brand-orange for primary CTAs, <5% screen usage).

**FR-005**: System MUST provide `AdventureWhatToFish` component that displays fishable species and named waters with seasonal information, structured as responsive grid cards showing species names, best seasons, and Kim's fishing tips.

**FR-006**: System MUST provide `AdventureWhatToHunt` component that displays huntable species with season dates (string format "Nov 13 - Dec 31"), bag limits (optional), and licensing requirements in responsive grid format with species-specific icons.

### Schema Extensions (8 Optional WMA Fields)

**FR-007**: System MUST extend adventures collection schema with `wma_acreage` field (z.number().optional()) for displaying WMA land size with comma formatting (e.g., "104,000 acres") in AdventureQuickStats or dedicated acreage display.

**FR-008**: System MUST extend adventures collection schema with `wma_county` field (z.string().optional()) for displaying WMA county location (e.g., "Braxton County") in location context sections.

**FR-009**: System MUST extend adventures collection schema with `wma_species` array field (z.array().optional()) where each species object includes name (string), season (string), and optional notes (string) for Kim's hunting tips.

**FR-010**: System MUST extend adventures collection schema with `wma_fishing_waters` array field (z.array().optional()) where each water body object includes name (string), species array (z.array(z.string())), and access description (string).

**FR-011**: System MUST extend adventures collection schema with `wma_facilities` array field (z.array().optional()) where each facility object includes type (string), optional count (number), and description (string) for parking, boat ramps, restrooms, trails.

**FR-012**: System MUST extend adventures collection schema with `wma_access_points` array field (z.array().optional()) where each access point object includes name (string), optional coords (string for GPS coordinates), and features array (z.array(z.string())).

**FR-013**: System MUST extend adventures collection schema with `wma_regulations` object field (z.object().optional()) containing zone (string, optional) for DNR zone designation and restrictions array (z.array(z.string())) for WMA-specific rules.

**FR-014**: System MUST extend adventures collection schema with `wma_season_highlights` array field (z.array().optional()) where each highlight object includes season (string), target (string for species), and tips (string) for Kim's seasonal advice.

### Template System & Code Reduction

**FR-015**: System MUST provide WMATemplate.astro layout component that consumes adventure collection entry with all 8 WMA fields, rendering structure once and reducing individual WMA pages from 533 lines to 150 lines (73% reduction).

**FR-016**: WMATemplate MUST support slot-based composition for page-specific content sections while maintaining consistent navigation, header, footer, and sidebar layout across all WMA pages.

**FR-017**: WMATemplate MUST conditionally render WMA-specific sections only when corresponding schema fields are defined (e.g., hide AdventureWhatToFish if wma_fishing_waters is undefined), allowing template reuse for non-WMA adventure pages.

### Responsive Design & WVWO Aesthetic Compliance

**FR-018**: All 6 WMA components MUST use `rounded-sm` corners ONLY (no rounded-md/lg/xl) per WVWO aesthetic requirements documented in CLAUDE.md.

**FR-019**: All 6 WMA components MUST implement mobile-first responsive grids using Tailwind breakpoints (base: 1 column, md: 2 columns, lg: 3 columns where applicable) with proper gap spacing (gap-4 mobile, gap-6 desktop).

**FR-020**: All WMA components MUST use WVWO brand color palette exclusively: `--brand-brown` (#3E2723) for headings, `--sign-green` (#2E7D32) for accents/icons, `--brand-cream` (#FFF8E1) for backgrounds, `--brand-orange` (#FF6F00) for CTAs only (<5% screen usage).

### Content Organization & Accessibility

**FR-021**: AdventureFeatureSection MUST support default slot for rich content (Kim's tips, safety warnings, historical notes) with HTML rendering via Astro Fragment set:html for safe HTML in markdown-sourced content.

**FR-022**: All WMA components MUST ensure external links (Google Maps, DNR regulations) use `target="_blank"` and `rel="noopener noreferrer"` for security compliance per NFR Security requirements.

**FR-023**: All WMA components MUST implement proper semantic HTML structure (section, h2/h3 hierarchy, ul/li for lists, dl/dt/dd for key-value pairs) to support screen reader navigation and WCAG 2.1 AA compliance.

---

## Technical Design

### Data Model

#### Schema Extension Strategy

The WMA template leverages the existing `adventures` collection with **8 optional fields** added to the schema. This zero-breaking-changes approach allows existing adventure entries to continue working while WMA-specific content uses additional fields.

**Design Principles**:

1. All WMA fields are optional (`.optional()`)
2. Existing adventures remain valid without changes
3. TypeScript type inference works automatically via Zod
4. Content migration happens incrementally per WMA page

#### Schema Extension (content.config.ts)

```typescript
// Existing adventures schema (lines 35-54)
const adventures = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
    schema: z.object({
        // === EXISTING FIELDS (unchanged) ===
        title: z.string(),
        description: z.string(),
        season: z.array(SeasonEnum),
        difficulty: DifficultyEnum,
        location: z.string(),
        coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
        }).optional(),
        gear: z.array(z.string()).optional(),
        elevation_gain: z.number().optional(),
        drive_time: z.string().optional(),
        kim_hook: z.string().optional(),
        suitability: z.array(SuitabilityEnum).optional(),
        images: z.array(ImageSchema).optional(),

        // === NEW WMA-SPECIFIC FIELDS (SPEC-12) ===
        // All optional - zero breaking changes
        wma_acreage: z.number().optional(),              // WMA size in acres
        wma_county: z.string().optional(),               // County location
        wma_species: z.array(z.object({                  // Huntable species
            name: z.string(),                             // e.g., "White-tailed Deer"
            season: z.string(),                           // e.g., "Nov 13 - Dec 31"
            notes: z.string().optional(),                 // Kim's tips
        })).optional(),
        wma_fishing_waters: z.array(z.object({           // Named fishing spots
            name: z.string(),                             // e.g., "Elk River"
            species: z.array(z.string()),                 // e.g., ["Bass", "Trout"]
            access: z.string(),                           // Access description
        })).optional(),
        wma_facilities: z.array(z.object({               // Amenities
            type: z.string(),                             // e.g., "Parking"
            count: z.number().optional(),                 // e.g., 3 parking areas
            description: z.string(),                      // Details
        })).optional(),
        wma_access_points: z.array(z.object({            // Entry points
            name: z.string(),                             // e.g., "Main Gate"
            coords: z.string().optional(),                // GPS if available
            features: z.array(z.string()),                // e.g., ["Parking", "Trail"]
        })).optional(),
        wma_regulations: z.object({                      // Rules & restrictions
            zone: z.string().optional(),                  // DNR zone designation
            restrictions: z.array(z.string()),            // Rule list
        }).optional(),
        wma_season_highlights: z.array(z.object({        // Best times to visit
            season: z.string(),                           // e.g., "Fall"
            target: z.string(),                           // e.g., "Turkey"
            tips: z.string(),                             // Kim's advice
        })).optional(),
    }),
});
```

#### Type Definitions

TypeScript automatically infers types from the Zod schema via Astro Content Collections:

```typescript
import type { CollectionEntry } from 'astro:content';

// Full adventure type (includes WMA fields when present)
type AdventureEntry = CollectionEntry<'adventures'>;

// Extract just the data portion for components
type AdventureData = AdventureEntry['data'];

// Example type usage in components
interface WMATemplateProps {
  adventure: AdventureEntry; // Contains all fields, WMA fields optional
}

// Type guards for WMA-specific pages
function isWMAAdventure(adventure: AdventureEntry): boolean {
  return adventure.data.wma_acreage !== undefined;
}
```

#### Migration Strategy

**Phase 1: Schema Extension** (This SPEC)

- Add 8 optional WMA fields to `content.config.ts`
- No changes required to existing adventure entries
- TypeScript types auto-update via Zod inference

**Phase 2: Content Population** (SPEC-21 onwards)

- Migrate elk-river.md frontmatter to use new fields
- Test WMATemplate with real data
- Repeat for remaining 7 WMA pages

**Phase 3: Template Integration**

- WMATemplate.astro consumes `adventure.data.wma_*` fields
- Falls back gracefully if fields are undefined
- Conditional rendering for optional sections

**Example Migration** (elk-river.md):

```markdown
---
title: "Elk River Wildlife Management Area"
description: "Elk River WMA"
season: ["fall", "spring"]
difficulty: "moderate"
location: "Elk River WMA"

# NEW WMA FIELDS (SPEC-12)
wma_acreage: 104000
wma_county: "Braxton"
wma_species:
  - name: "White-tailed Deer"
    season: "Nov 13 - Dec 31"
    notes: "Prime ridge hunting"
  - name: "Wild Turkey"
    season: "Apr 15 - May 15"
    notes: "Gobblers love the hollows"
wma_fishing_waters:
  - name: "Elk River"
    species: ["Smallmouth Bass", "Muskie", "Trout"]
    access: "Multiple boat ramps, wade-friendly"
wma_facilities:
  - type: "Parking"
    count: 3
    description: "Main gate, north access, south trailhead"
  - type: "Boat Ramps"
    count: 2
    description: "Upper and lower river access"
wma_regulations:
  zone: "Zone 3"
  restrictions:
    - "No hunting within 200 yards of boat ramps"
    - "Check daily harvest limits before field dressing"
---

# Elk River WMA Content...
```

**Backwards Compatibility Guarantee**:

- Existing adventures without WMA fields continue working
- No runtime errors from undefined fields
- TypeScript enforces optional checks at compile time

## Implementation Plan

[To be written]

## Testing Strategy

[To be written]

## Success Metrics

[To be written]
