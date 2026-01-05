# Feature: River Template Component System

**Version:** 2.0.0
**Created:** 2025-01-15
**Updated:** 2025-01-20
**Status:** Ready for Implementation
**SPEC ID:** SPEC-14

---

## Overview

A reusable Astro template component for West Virginia river adventure pages featuring whitewater rafting, fishing, seasonal flow patterns, and safety-first organization. Target ~550-660 lines with 8 comprehensive sections including rapids guide, outfitter listings, access points, and real-time USGS water level integration.

This spec incorporates findings from deep research of real WV whitewater outfitter sites (ACE Adventure Resort, Adventures on the Gorge), outdoor recreation UX best practices, WCAG AA accessibility requirements, and established WVWO component patterns from LakeTemplate (SPEC-13).

---

## Problem Statement

**Current State:**

- Existing river pages (elk-river.astro, holly-river.astro) manually compose all components inline (~17-20KB each)
- No centralized template = inconsistent structure, duplicated code, no reusability
- Original SPEC-14 PROMPT.md incomplete:
  - ❌ 3 of 8 sections missing implementations (Seasonal Flow, Access Points, Nearby Attractions)
  - ❌ No TypeScript interface file location specified
  - ❌ No Content Collections integration strategy
  - ❌ No SEO/Schema.org markup architecture
  - ❌ No real-world UX validation from WV whitewater sites

**Who Has This Problem:**

- **Developers**: Repetitive manual composition, hard to maintain consistency
- **Content Editors**: No structured data model, difficult to update river information
- **Users**: Inconsistent UX across river pages, missing critical safety information, no real-time water levels

---

## Goals

### Primary Goals

1. **Complete Missing Implementations**: Deliver production-ready code for 3 missing sections (Seasonal Flow, Access Points, Nearby Attractions)
2. **Type-Safe Data Model**: Full TypeScript interface system with Zod schemas for Content Collections validation
3. **SEO Excellence**: Comprehensive Schema.org @graph architecture enabling rich search results (TouristAttraction + LocalBusiness + Article)
4. **Safety-First UX**: Prominent hazard warnings, color-coded rapids (Class I-V), WCAG AA accessible
5. **Mobile-First Performance**: 50%+ mobile traffic, rural WV bandwidth constraints (2-5 Mbps), offline-friendly

### Secondary Goals

6. **Real-Time Data Integration**: USGS water gauge API integration for current flow conditions (CFS)
2. **Reusability**: Extend pattern to 40+ river destinations (New River, Cheat River, Elk River, etc.)
3. **WVWO Compliance**: 100% adherence to brand aesthetics (rounded-sm ONLY, font-display/hand/body, authentic voice)

---

## Non-Goals (Out of Scope)

- ❌ **Booking Integration**: Outfitter booking remains external (phone-first per rural WV patterns)
- ❌ **User Reviews**: No review submission system (Phase 6 future enhancement)
- ❌ **Interactive Maps**: No Leaflet.js/Mapbox (Phase 5 future enhancement, use static maps + GPS links)
- ❌ **Real-Time Widgets**: USGS API fetch ONLY as external link in MVP (embedded widget Phase 5)
- ❌ **Content Population**: Template only - actual river data (Gauley, New River rapids) is Phase 4
- ❌ **E2E Testing**: Playwright tests are Phase 6 post-deployment

---

## User Stories

### As a Weekend Whitewater Rafter

- I want to see rapid classifications (Class I-V) with hazard warnings upfront
- So that I can assess if the river matches my skill level before booking

### As a Fly Fisherman

- I want to know which fish species are available in different seasons and river sections
- So that I can plan my trip during peak fishing times

### As a First-Time Visitor

- I want to see outfitter comparisons (services, pricing, contact info)
- So that I can choose a guided trip provider that fits my budget and needs

### As a Trip Planner

- I want to see put-in/take-out access points with GPS coordinates and shuttle information
- So that I can plan multi-day river logistics and parking

### As a Safety-Conscious Paddler

- I want prominent safety warnings, required gear lists, and skill level requirements
- So that I understand the risks before committing to the trip

### As a Mobile User (50% of Traffic)

- I want touch-friendly navigation with sticky phone CTAs
- So that I can book trips while on-site with limited rural WV bandwidth

---

## Functional Requirements

### Core Requirements

#### 1. Hero Section (CRITICAL - Above Fold)

- **Display**: River name, total length (miles), difficulty range (Class II-V), county
- **Stats Grid**: 2-4 quick stats (length, distance from shop, access, season)
- **Quick Highlights**: Badges for key features (e.g., "Class V Rapids", "Dam Releases", "Trophy Smallmouth")
- **Real-Time Link**: If `waterLevelUrl` exists, display "Check Real-Time USGS Water Levels" CTA
- **Responsive**: `h-[70vh] min-h-[500px]` with dark overlay (`bg-brand-brown/60`)

#### 2. Rapids Guide Section (Lines ~154-208, From PROMPT.md)

- **Color-Coded Classification** (based on `class.base`):
  - Class I-III: `border-l-sign-green`, `bg-sign-green` badges
  - Class IV: `border-l-brand-orange`, `bg-brand-orange` badges
  - Class V: `border-l-red-600`, `bg-red-600` badges
- **Display**: Use `displayName` for badge text (e.g., "Class IV+" shows full precision)
- **WCAG AA Accessible**: Shape icons (●▲■) for color-blind users, 4.5:1+ contrast ratios
- **Content Per Rapid**: Name (h3), class rating, description, hazards list (if any), runnable conditions
- **Layout**: 2-3 column responsive grid (`md:grid-cols-2 lg:grid-cols-3`)

#### 3. Fishing Section (Lines ~211-293, From PROMPT.md)

- **Species**: Display as badges (`bg-sign-green text-white px-3 py-1 rounded-sm`)
- **Seasons**: Best fishing times (e.g., "Spring (April-May), Fall (September-October)")
- **Access Points**: Named locations with descriptions (e.g., "Below Summersville Dam - Tailwater access")
- **Techniques**: Bulleted list (e.g., "Crankbaits, tubes, jigs, 6-8 lb line")
- **Kim's Tip** (Optional): Render in `font-hand italic text-sm` with `bg-brand-cream` background

#### 4. Outfitters Section (Lines ~296-353, From PROMPT.md)

- **Per Outfitter Card**:
  - Business name (h3)
  - Services list (guided trips, rentals, shuttles, multi-day packages)
  - Contact: Phone (tel: link), website (external link with `rel="noopener noreferrer"`)
  - Price range (e.g., "$75-$150 per person", "$$-$$$")
  - Seasonal notes (e.g., "Upper Gauley runs September-October only")
- **Layout**: 2-column grid (`md:grid-cols-2`), cream backgrounds (`bg-brand-cream`)

#### 5. Seasonal Flow Section (NEW - Lines ~356-445, From Research Plan)

- **4-Season Grid**: Spring, Summer, Fall, Winter cards
- **Per Season**:
  - Season name with underline (`border-b-2 border-b-sign-green`)
  - Water level badge (based on `level` enum): LOW (green), MEDIUM (orange), HIGH (red)
  - Optional CFS range display: Show `cfsRange` if provided (e.g., "1000-3000 CFS") below level badge
  - Best For activities (badges): "Beginner Rafting", "Trophy Fishing", "Expert Kayaking"
  - Notes (optional): Flow patterns, dam release schedules, safety warnings
- **Real-Time USGS Link**: If `waterLevelUrl` exists, display above grid with lightning icon
- **Layout**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

#### 6. Access Points Section (NEW - Lines ~448-542, From Research Plan)

- **Per Access Point Card**:
  - Name (h3)
  - Type badge (based on `type` enum): PUT-IN (green), TAKE-OUT (brown), BOTH (orange)
  - Optional type notes: Display `typeNotes` if provided (e.g., "Emergency use only", "Seasonal")
  - Facilities list (parking, restrooms, camping, boat ramp) with checkmarks
  - GPS Coordinates (clickable Google Maps link with location icon)
  - Shuttle Info (optional, italic): Driving directions or shuttle service details
- **Layout**: 2-column grid (`md:grid-cols-2`), sign-green border-left (`border-l-sign-green`)

#### 7. Safety Section (Lines ~545-620, From PROMPT.md - CRITICAL Prominence)

- **Per Safety Category**:
  - Category name (h3): "Rescue Equipment", "First Aid", "Required Skills", "Emergency Contacts"
  - Items list with bullet points
  - Orange border for high visibility (`border-l-4 border-l-brand-orange`)
- **Important Flag**: If `important: true`, add `bg-brand-orange text-white` badge
- **Layout**: Full-width stacked sections (`space-y-6`), white backgrounds on cream section

#### 8. Nearby Attractions Section (NEW - Lines ~623-697, From Research Plan)

- **Per Attraction Card**:
  - Type icon: Standard icons for "Camping" (tent), "Hiking" (boot), "Town" (building), "State Park" (tree), "Restaurant" (utensils), "Historic Site" (landmark)
  - Fallback icon: Generic map pin for custom/unknown types
  - Name (h3)
  - Distance badge: "5 miles", "15 min drive" in sign-green
  - Type label: Small caps (CAMPING, HIKING, TOWN)
  - Description (body text)
- **Layout**: 3-column grid (`md:grid-cols-2 lg:grid-cols-3`)

#### 9. Gear Checklist (Shared Component Integration)

- **Use**: `AdventureGearChecklist.astro` (existing SPEC-10 component)
- **Props**: `items: GearItem[]` (name, optional: boolean)
- **Visual**: Required items (green checkmark), Optional items (circle icon + "(optional)" suffix)

#### 10. Related Shop (Shared Component Integration)

- **Use**: `AdventureRelatedShop.astro` (existing SPEC-11 component)
- **Props**: `categories: RelatedCategory[]` (name, description, href)
- **Layout**: Grid of shop category cards with CTA to main shop

#### 11. Call-to-Action (Shared Component Integration)

- **Use**: `AdventureCTA.astro` (existing component)
- **Props**: Primary CTA (Get Directions), Secondary CTA (Call Shop)
- **Visual**: Sign-green filled button + outlined button

### Edge Cases

1. **Empty Sections**: If `seasonalFlow.length === 0`, hide entire section (not just empty grid)
2. **Missing GPS Coords**: If `accessPoints[n].coords` undefined, hide map link (don't error)
3. **No Water Level URL**: If `waterLevelUrl` undefined, hide "Real-Time Gauge" CTA entirely
4. **Overflowing Rapids**: If `rapids.length > 12`, maintain 3-column grid (don't collapse to list)
5. **Long Outfitter Names**: Truncate at 2 lines with ellipsis (`line-clamp-2`)
6. **Mobile Touch Targets**: All interactive elements ≥ 48px height for rural WV users

---

## Non-Functional Requirements

### Performance

- **Load Time**: < 3 seconds on rural WV 2-5 Mbps connections (target: LCP < 2.5s)
- **Static Rendering**: Zero client-side JavaScript (Astro SSG only)
- **Image Optimization**: Hero images lazy-loaded except above-fold (`loading="eager"` for hero only)
- **Bundle Size**: Template component < 100KB uncompressed (no external dependencies)

### Accessibility (WCAG AA Compliance)

- **Color Contrast**: All text/bg combos ≥ 4.5:1 ratio
  - Rapids Class I-III: Green (#2E7D32) on white = 4.57:1 ✅
  - Rapids Class IV: Orange (#FF6F00) on black = 6.12:1 ✅
  - Rapids Class V: Red (#C62828) on white = 5.74:1 ✅
- **Color-Blind Support**: Shape icons (●▲■) accompany all color-coded elements
- **Screen Readers**: `aria-labelledby` on all sections, `aria-hidden="true"` on decorative SVGs
- **Keyboard Navigation**: All interactive elements focusable and operable via keyboard
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3), `<section>`, `<article>`, `<nav>` tags

### Security

- **External Links**: All outfitter websites use `target="_blank" rel="noopener noreferrer"`
- **User Input**: No form submissions in template (outfitter contact is external links only)
- **API Calls**: USGS water gauge is external link (no server-side API calls in MVP)

### WVWO Brand Compliance (CRITICAL - Instant PR Rejection if Violated)

- **Fonts**:
  - ✅ `font-display` (Bitter serif) - Headings, river/rapid names
  - ✅ `font-hand` (Permanent Marker cursive) - Kim's tips ONLY
  - ✅ `font-body` (Noto Sans) - All body text, descriptions, lists
  - ❌ FORBIDDEN: Inter, Poppins, DM Sans, system-ui, etc.

- **Colors**:
  - ✅ `--brand-brown` (#3E2723) - Headers, text, detail borders
  - ✅ `--sign-green` (#2E7D32) - Fishing, access points, safe rapids
  - ✅ `--brand-cream` (#FFF8E1) - Section backgrounds
  - ✅ `--brand-orange` (#FF6F00) - CTAs, safety warnings ONLY (<5% of screen)
  - ❌ FORBIDDEN: Purple gradients, hot pink, neon, corporate blue

- **Border Radius**:
  - ✅ `rounded-sm` (0.125rem / ~2px) - Sharp hardware store aesthetic
  - ❌ FORBIDDEN: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-3xl`

- **Voice**:
  - ✅ Kim's authentic WV voice: "The water's gin-clear, so downsize your line to 6-8 lb test"
  - ✅ Safety-first: "Class V rapids require expert skills - no shortcuts"
  - ❌ FORBIDDEN: "Unlock potential", "Seamless experience", "Revolutionize", "Transform the way you"

---

## Data Model

### TypeScript Interfaces (src/types/adventure.ts)

#### Primary Interface

```typescript
export interface RiverTemplateProps {
  // Hero section (required)
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // River metadata
  length: number;              // miles
  county: string;
  difficultyRange: string;     // e.g., "Class II-V"
  quickHighlights: string[];

  // Content sections
  rapids: Rapid[];
  fishing: RiverFishing;
  outfitters: Outfitter[];
  seasonalFlow: SeasonalFlow[];
  accessPoints: RiverAccessPoint[];
  safety: RiverSafety[];
  nearbyAttractions: NearbyAttraction[];
  gearList: GearItem[];           // Existing SPEC-10 type
  relatedShop: RelatedCategory[]; // Existing SPEC-11 type

  // Optional metadata
  difficulty?: Difficulty;         // Existing enum: 'easy' | 'moderate' | 'challenging' | 'rugged'
  bestSeason?: Season;            // Existing enum: 'spring' | 'summer' | 'fall' | 'winter'
  coordinates?: Coordinates;      // Existing type: { lat: number, lng: number }
  mapUrl?: string;
  waterLevelUrl?: string;         // Real-time USGS gauge
}
```

#### Nested Types (7 New Schemas)

```typescript
// 1. Individual rapid with classification
export interface Rapid {
  name: string;                // "Pillow Rock", "Sweet's Falls"
  class: {
    base: 'I' | 'II' | 'III' | 'IV' | 'V';  // Base class for color-coding
    modifier?: '+' | '-';      // Optional precision modifier
  };
  displayName: string;         // "Class IV+" for UI display
  description: string;
  hazards?: string[];          // ["Undercut rocks", "Keeper hydraulic"]
  runnable: string;            // "All water levels" | "1000-3000 CFS" | "Dam releases only"
}

// 2. River fishing (flow-dependent)
export interface RiverFishing {
  species: string[];           // ["Smallmouth Bass", "Rainbow Trout"]
  seasons: string;             // "Spring (April-May), Fall (September-October)"
  accessPoints: { name: string; description: string }[];
  techniques: string[];        // ["Crankbaits", "Fly fishing", "Spin casting"]
  kimsTip?: string;            // Renders in font-hand
}

// 3. Outfitter / guide service
export interface Outfitter {
  name: string;
  services: string[];          // ["Guided rafting trips", "Kayak rentals", "Shuttles"]
  contact: {
    phone?: string;            // At least one contact method required (validated via Zod)
    website?: string;
    email?: string;
  };
  priceRange?: string;         // "$75-$150 per person" | "$$-$$$"
  seasonalNotes?: string;      // "Upper Gauley runs September-October only"
}

// 4. Seasonal water flow
export interface SeasonalFlow {
  season: string;              // "Spring (March-May)"
  level: 'Low' | 'Medium' | 'High';  // Water level category for color-coding
  cfsRange?: string;           // Optional numeric precision: "1000-3000 CFS" for experts
  bestFor: string[];           // ["Beginner Rafting", "Trophy Fishing"]
  notes: string;               // Flow patterns, dam schedules
}

// 5. River access point
export interface RiverAccessPoint {
  name: string;                // "Summersville Dam Put-In"
  type: 'Put-in' | 'Take-out' | 'Both';  // Primary access type for badge color-coding
  typeNotes?: string;          // Optional: "Emergency use only", "Seasonal access (Apr-Oct)"
  facilities: string[];        // ["Parking (50 spaces)", "Vault toilets", "Boat ramp"]
  coords?: string;             // "38.2345, -80.1234" (Google Maps format)
  shuttleInfo?: string;        // "15 miles, 25 min drive. Shuttle services available."
}

// 6. Safety category checklist
export interface RiverSafety {
  category: string;            // "Rescue Equipment", "First Aid", "Required Skills"
  items: string[];             // ["Throw rope", "Knife", "Whistle", "Helmet"]
}

// 7. Nearby point of interest
export interface NearbyAttraction {
  name: string;                // "Summersville Lake"
  type: string;                // Standard: "Camping"|"Hiking"|"Town"|"State Park"|"Restaurant"|"Historic Site"
                               // Custom types supported - template uses fallback icon for unknown types
  distance: string;            // "5 miles" | "15 min drive"
  description: string;
}
```

### Zod Schemas (Content Collections Validation)

All 7 interfaces above have corresponding Zod schemas in `src/types/adventure.ts`:

- `RapidSchema`
- `RiverFishingSchema`
- `OutfitterSchema` - Contact validation requires at least one method: `z.object({ phone, website, email }).refine(c => c.phone || c.website || c.email)`
- `SeasonalFlowSchema`
- `RiverAccessPointSchema`
- `RiverSafetySchema`
- `NearbyAttractionSchema`

**Content Collections Extension** (src/content.config.ts):

```typescript
// Line 99: Update type discriminator
type: z.enum(['adventure', 'wma', 'lake', 'river']).optional(),

// After line 111: Add river-specific optional fields
riverLength: z.number().positive().optional(),
difficultyRange: z.string().optional(),
rapids: z.array(RapidSchema).optional(),
riverFishing: RiverFishingSchema.optional(),
outfitters: z.array(OutfitterSchema).optional(),
seasonalFlow: z.array(SeasonalFlowSchema).optional(),
riverAccessPoints: z.array(RiverAccessPointSchema).optional(),
riverSafety: z.array(RiverSafetySchema).optional(),
nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
waterLevelUrl: z.string().url().optional(),
```

### Data File Pattern

**Location**: `src/data/rivers/gauley.ts` (follows `src/data/lakes/` pattern)

```typescript
import type { RiverTemplateProps } from '../../types/adventure';

export const gauleyRiverData: RiverTemplateProps = {
  name: 'Gauley River',
  image: '/images/gauley-river-hero.jpg',
  imageAlt: 'Class V rapids on Upper Gauley River during fall dam releases',
  tagline: 'They call it the Beast of the East for good reason',
  description: 'West Virginia\'s most challenging whitewater...',

  // ... (see full example in src/data/rivers/_example.ts)
};
```

---

## API/Interface Design

### Component Interface

**File**: `src/components/templates/RiverTemplate.astro`

```astro
---
interface Props extends RiverTemplateProps {}

const {
  name, image, imageAlt, tagline, description, stats,
  length, county, difficultyRange, quickHighlights,
  rapids, fishing, outfitters, seasonalFlow, accessPoints, safety,
  nearbyAttractions, gearList, relatedShop,
  difficulty, bestSeason, coordinates, mapUrl, waterLevelUrl
} = Astro.props;
---

<!-- Component implementation -->
```

### SEO Component Interface

**File**: `src/components/seo/SchemaRiverTemplate.astro` (NEW)

```astro
---
interface Props {
  name: string;
  slug: string;
  description: string;
  length: number;
  difficultyRange: string;
  coordinates: Coordinates;
  outfitters?: Outfitter[];
  warnings?: string[];          // Safety warnings for schema
  amenities?: string[];         // ["Whitewater Rafting", "Fishing"]
  breadcrumbs: BreadcrumbItem[];
  publishedDate?: string;
  updatedDate?: string;
}

// Generates @graph with:
// - TouristAttraction + Place (hybrid for river)
// - Article (guide content)
// - BreadcrumbList (navigation)
// - LocalBusiness[] (outfitters as separate entities)
---
```

### Schema.org @graph Architecture

```typescript
{
  "@context": "https://schema.org",
  "@graph": [
    // 1. TouristAttraction + Place (river destination)
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#attraction",
      "additionalType": "https://schema.org/WaterBodyUsage",
      "warning": [
        "Class V rapids require expert whitewater skills",
        "Cold water hazard - wetsuits required September-May"
      ],
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Whitewater Rafting", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Fishing", "value": true }
      ],
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "difficulty", "value": "Class II-V" },
        { "@type": "PropertyValue", "name": "length", "value": "53 miles", "unitCode": "SMI" }
      ]
    },

    // 2. Article (guide content)
    {
      "@type": "Article",
      "@id": "https://wvwildoutdoors.pages.dev/near/gauley-river/#article",
      "about": { "@id": "...#attraction" },
      "author": { "@type": "Organization", "name": "WV Wild Outdoors" }
    },

    // 3. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": "Hunt Near Us", "item": "/near/" },
        { "@type": "ListItem", "position": 3, "name": "Gauley River" }
      ]
    },

    // 4. LocalBusiness (per outfitter)
    {
      "@type": "LocalBusiness",
      "@id": "...#outfitter-0",
      "name": "ACE Adventure Resort",
      "makesOffer": [{
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Guided Whitewater Rafting" },
        "priceRange": "$$$"
      }],
      "location": { "@id": "...#attraction" }
    }
  ]
}
```

**Meta Tags** (src/pages/near/{river-name}.astro):

```html
<title>Gauley River - Whitewater Rafting & Fishing Guide | WV Wild Outdoors</title>
<meta name="description" content="Complete Gauley River guide: Class II-V whitewater rafting, world-class smallmouth fishing, and expert-guided trips. 53 miles of WV's most challenging rapids. 30 minutes from our shop." />

<!-- OG Tags -->
<meta property="og:type" content="article" />
<meta property="og:latitude" content="38.1642" />
<meta property="og:longitude" content="-80.9147" />
<meta property="article:tag" content="whitewater rafting" />

<!-- Geo Tags -->
<meta name="geo.region" content="US-WV" />
<meta name="geo.placename" content="Summersville, West Virginia" />
<meta name="geo.position" content="38.1642;-80.9147" />
```

---

## Dependencies

### Internal (Existing WVWO Components)

- ✅ `AdventureGearChecklist.astro` (SPEC-10) - Gear lists
- ✅ `AdventureRelatedShop.astro` (SPEC-11) - Shop category cards
- ✅ `AdventureCTA.astro` (existing) - Dual-button call-to-action
- ✅ `Layout.astro` - Page wrapper with SEO, fonts, global styles
- ✅ `Breadcrumb.astro` - Visual breadcrumb navigation
- ✅ `SchemaBreadcrumb.astro` - JSON-LD breadcrumb schema

### Internal (Types)

- ✅ `Difficulty`, `Season`, `StatIcon`, `Coordinates` (existing enums/types)
- ✅ `StatItem`, `GearItem`, `RelatedCategory` (existing schemas)
- ✅ `LakeTemplateProps` (reference pattern for RiverTemplateProps)

### External (APIs - Future Phase)

- 🔮 USGS Water Services REST API (Phase 5):
  - Endpoint: `https://waterservices.usgs.gov/nwis/iv/`
  - Parameters: `sites`, `parameterCd` (00060 = streamflow CFS), `format=json`
  - Update frequency: 15-60 minutes
  - Cache strategy: 15-minute localStorage cache
  - **MVP**: External link only, no API calls

### Tech Stack

- ✅ Astro 5.x (Static Site Generator)
- ✅ TypeScript 5.x (Type safety)
- ✅ Tailwind CSS 4.x (Styling)
- ✅ Zod 3.x (Schema validation)
- ❌ NO external dependencies (Leaflet.js, Mapbox deferred to Phase 5)

---

## Implementation Roadmap

### Phase 1: Type System (2 hours)

**File**: `wv-wild-web/src/types/adventure.ts`

✅ **Tasks**:

1. Add 7 Zod schemas after line 394 (after Lake schemas)
2. Add `RiverTemplateProps` interface matching `LakeTemplateProps` pattern
3. Add type guard: `export function isRiverAdventure(adventure: any): boolean`
4. Validate types compile without errors
5. Document with JSDoc comments

**Deliverable**: 150 new lines of type-safe interfaces

---

### Phase 2: Missing Section Implementations (4 hours)

**File**: `wv-wild-web/src/components/templates/RiverTemplate.astro` (NEW)

✅ **Tasks**:

1. Create template file structure (frontmatter, imports, props interface)
2. Implement Hero section (from SPEC-14 PROMPT.md)
3. Implement Rapids Guide section (from PROMPT.md)
4. Implement Fishing section (from PROMPT.md)
5. Implement Outfitters section (from PROMPT.md)
6. **NEW**: Implement Seasonal Flow section (~90 lines, 4-column grid, color-coded water levels)
7. **NEW**: Implement Access Points section (~95 lines, GPS maps, shuttle info)
8. Implement Safety section (from PROMPT.md)
9. **NEW**: Implement Nearby Attractions section (~75 lines, type icons)
10. Integrate shared components (Gear, Shop, CTA)
11. Add scoped styles (rounded-sm enforcement, responsive motion)

**Deliverable**: ~660 lines matching SPEC-14 target, all 8 sections complete

---

### Phase 3: Content Collections Integration (1 hour)

**File**: `wv-wild-web/src/content.config.ts`

✅ **Tasks**:

1. Update type discriminator (line 99): Add `'river'` to enum
2. Add river-specific optional fields (after line 111)
3. Import river Zod schemas
4. Test collection query: `getCollection('adventures').filter(isRiverAdventure)`
5. Validate zero breaking changes to existing lakes/WMAs

**Deliverable**: 50 new lines, backward-compatible extension

---

### Phase 4: SEO & Schema.org Component (2 hours)

**File**: `wv-wild-web/src/components/seo/SchemaRiverTemplate.astro` (NEW)

✅ **Tasks**:

1. Create component scaffolding with Props interface
2. Implement @graph entity builder:
   - TouristAttraction + Place hybrid
   - Article for guide content
   - BreadcrumbList for navigation
   - LocalBusiness array for outfitters
3. Add conditional FAQPage schema (if safety is Q&A format)
4. Test JSON-LD output with Google Rich Results Test
5. Document meta tags pattern in component header

**Deliverable**: ~200 lines, structured data for rich search results

---

### Phase 5: Example Data Files (1 hour)

**Files**: `wv-wild-web/src/data/rivers/` (NEW directory)

✅ **Tasks**:

1. Create `_example.ts` - Complete reference implementation (~300 lines)
2. Create `gauley.ts` - Skeleton with TODO markers (~280 lines)
3. Create `README.md` - Developer documentation for river data files
4. Validate import paths resolve correctly
5. Type-check all data files

**Deliverable**: 3 files, reference pattern for Phase 4 content population

---

### Phase 6: Testing & Validation (Future - Post-Implementation)

**Scope**: E2E tests, visual regression, accessibility audit

🔮 **Deferred Tasks** (Phase 6):

1. Playwright E2E tests (mobile, tablet, desktop viewports)
2. Visual regression tests (Percy or Chromatic)
3. Accessibility audit (axe-core, WAVE, manual testing)
4. Mobile device testing (iOS Safari, Chrome Android)
5. Performance testing (Lighthouse, WebPageTest on rural WV bandwidth)

**Estimated Effort**: 4-6 hours post-implementation

---

## Acceptance Criteria

### Completeness

- [ ] All 8 sections implemented (Rapids, Fishing, Outfitters, Seasonal Flow, Access Points, Safety, Nearby Attractions, plus Gear/Shop/CTA)
- [ ] TypeScript interface system complete (7 Zod schemas + RiverTemplateProps)
- [ ] Content Collections extended with `type: 'river'` discriminator
- [ ] SEO component generates valid @graph JSON-LD
- [ ] Example data files created (_example.ts, gauley.ts, README.md)

### WVWO Compliance

- [ ] `rounded-sm` ONLY (no other border-radius values)
- [ ] Fonts: Bitter (display), Permanent Marker (hand), Noto Sans (body)
- [ ] Colors: Brown, green, cream, orange (<5% screen)
- [ ] No forbidden fonts (Inter, Poppins, DM Sans)
- [ ] No forbidden colors (purple, pink, neon)
- [ ] Kim's authentic voice (no corporate buzzwords)

### Accessibility (WCAG AA)

- [ ] Color contrast ≥ 4.5:1 on all text/bg combos
- [ ] Color-blind friendly (shape icons + colors for rapids)
- [ ] Screen reader friendly (aria-labelledby, semantic HTML)
- [ ] Keyboard accessible (all interactive elements focusable)
- [ ] Touch-friendly (48px+ tap targets for mobile)

### Performance

- [ ] Static rendering (zero client-side JS)
- [ ] Lazy-loaded images (except hero: `loading="eager"`)
- [ ] Conditional sections (hide if empty arrays)
- [ ] Bundle size < 100KB uncompressed

### SEO

- [ ] Schema.org @graph validates (Google Rich Results Test)
- [ ] Meta tags complete (title, description, OG, geo)
- [ ] Breadcrumb schema matches visual breadcrumb
- [ ] Outfitters as LocalBusiness entities (local pack eligibility)

### Testing (Phase 6 - Future)

- [ ] Responsive grids work (375px mobile, 768px tablet, 1024px+ desktop)
- [ ] Real-time gauge link opens USGS site in new tab
- [ ] GPS coords open Google Maps in new tab
- [ ] Outfitter phone numbers format as tel: links
- [ ] External links use `rel="noopener noreferrer"`

---

## Open Questions

### Resolved During Planning

1. ✅ **Q**: Should rivers use existing `adventures` collection or new `rivers` collection?
   **A**: Extend `adventures` with `type: 'river'` discriminator (consistent with WMA pattern)

2. ✅ **Q**: How to handle real-time USGS water levels?
   **A**: MVP = external link. Phase 5 = embedded widget with 15-min cache

3. ✅ **Q**: Which shared components to use vs. custom sections?
   **A**: Use `AdventureGearChecklist`, `AdventureRelatedShop`, `AdventureCTA`. Custom sections for rapids, fishing, outfitters, seasonal flow, access points, safety, nearby attractions.

4. ✅ **Q**: How to make rapids color-coding accessible?
   **A**: Shape icons (●▲■) + color, WCAG AA contrast ratios, ARIA labels

### Outstanding (Phase 4+ Decisions)

5. ❓ **Q**: Should we create a dedicated `/rivers/` top-level route or keep `/near/{river-name}/`?
   **A**: Defer to Phase 4 content population (affects breadcrumb schema)

2. ❓ **Q**: Do we need outfitter booking integration or keep phone-first?
   **A**: Defer to Phase 6 (phone-first matches rural WV user research)

3. ❓ **Q**: Should seasonal flow be 4 seasons or custom periods (e.g., "Dam Release Season")?
   **A**: Template supports both - content editors decide per river

---

## References

### Codebase Patterns

- **LakeTemplate**: `wv-wild-web/src/components/templates/LakeTemplate.astro` (558 lines) - Reference for component structure, responsive grids, WVWO compliance
- **Type System**: `wv-wild-web/src/types/adventure.ts` (433 lines) - LakeTemplateProps (lines 399-432), shared types (Difficulty, Season, StatIcon)
- **Content Collections**: `wv-wild-web/src/content.config.ts` (249 lines) - Adventures collection (line 79-112), WMA schemas (lines 37-77)
- **SEO Component**: `wv-wild-web/src/components/seo/SchemaAdventureHero.astro` - @graph pattern, TouristAttraction schema
- **Data Files**: `wv-wild-web/src/data/lakes/summersville.ts` (284 lines), `_example.ts` (283 lines)

### Research Reports

- **Plan File**: `~/.claude/plans/parsed-singing-pond.md` - Complete implementation plan with all agent research
- **WV Whitewater UX Research**: ACE Adventure Resort, Adventures on the Gorge analysis (agent a9d35b4)
- **Outdoor Recreation Best Practices**: USGS API integration, accessibility, mobile UX (agent ac74798)
- **Type System Design**: Zod schemas, Content Collections integration (agent a6c9614)
- **SEO Strategy**: Schema.org @graph, meta tags, LocalBusiness entities (agent afb1a8d)
- **Section Implementations**: Seasonal Flow, Access Points, Nearby Attractions code (agent aec9f1e)
- **LakeTemplate Analysis**: Component patterns, shared components, WVWO compliance (agent a5a9ca6)

### External Sources

- **USGS Water Data API**: <https://waterservices.usgs.gov/docs/>
- **USGS National Water Dashboard**: <https://dashboard.waterdata.usgs.gov/>
- **Schema.org TouristAttraction**: <https://schema.org/TouristAttraction>
- **Schema.org LocalBusiness**: <https://schema.org/LocalBusiness>
- **WCAG 2 Guidelines**: <https://www.w3.org/WAI/standards-guidelines/wcag/>
- **ACE Adventure Resort**: <https://aceraft.com/white-water-rafting/gauley-river-rafting/>
- **Adventures on the Gorge**: <https://www.adventuresonthegorge.com/whitewater-rafting>

### Related Specs

- **SPEC-13**: Lake Template (COMPLETED - reference pattern)
- **SPEC-10**: AdventureGearChecklist component (dependency)
- **SPEC-11**: AdventureRelatedShop component (dependency)
- **SPEC-09**: AdventureHero component (potential future enhancement)
- **SPEC-29**: Gauley River destination (Phase 4 content population)
- **SPEC-30**: New River Gorge destination (Phase 4 content population)

---

## Implementation Timeline

| Phase | Tasks | Effort | Status |
|-------|-------|--------|--------|
| 1 | Type System (Zod schemas + interface) | 2h | ⏳ Ready |
| 2 | Missing Sections (Seasonal Flow, Access Points, Nearby Attractions) | 4h | ⏳ Ready |
| 3 | Content Collections Integration | 1h | ⏳ Ready |
| 4 | SEO & Schema.org Component | 2h | ⏳ Ready |
| 5 | Example Data Files | 1h | ⏳ Ready |
| **Total** | **SPEC-14 Complete Implementation** | **10h** | **Ready** |

**Next Step**: `/speckit.plan` to generate detailed task breakdown

---

## Clarifications

### Session 2025-01-20

**Q1: Outfitter Contact Requirements**

- **Question**: Should outfitter phone be required, or support web-only/email-only outfitters?
- **Answer**: Make phone, website, and email all optional, but require at least one contact method (validated via Zod refine)
- **Rationale**: Rural WV prefers phone-first, but newer seasonal outfitters may only have online booking. Flexibility prevents dummy data.

**Q2: Rapids Classification Format**

- **Question**: Should rapid class be free-form string or structured with base + modifier?
- **Answer**: Structured format: `{ base: 'I'|'II'|'III'|'IV'|'V', modifier?: '+'|'-' }` plus `displayName: string` for UI
- **Rationale**: Enables consistent color-coding (map base class to colors) while preserving precision (IV+ vs IV). Type-safe, prevents parsing errors from variations like "Class 4" vs "IV".

**Q3: Seasonal Flow Water Level Format**

- **Question**: Should water level be free-form string or structured enum + numeric range?
- **Answer**: Separate fields: `level: 'Low'|'Medium'|'High'` for color-coding, `cfsRange?: string` for optional numeric precision
- **Rationale**: Color-coding needs consistent categories (Low/Medium/High → green/orange/red). CFS ranges provide expert-level precision without breaking UI logic.

**Q4: Access Point Type Format**

- **Question**: Should access point type be free-form string or strict enum for badge color mapping?
- **Answer**: Strict enum: `type: 'Put-in'|'Take-out'|'Both'` for badge colors, `typeNotes?: string` for edge cases
- **Rationale**: Template needs reliable badge color mapping (Put-in=green, Take-out=brown, Both=orange). Notes field handles exceptions like "Emergency Exit" or "Seasonal Access" without breaking color logic.

**Q5: Nearby Attraction Type Icons**

- **Question**: Should nearby attraction types be strict enum or support custom types with fallback icon?
- **Answer**: Free-form string with standard types ("Camping", "Hiking", "Town", "State Park", "Restaurant", "Historic Site") and fallback icon for custom types
- **Rationale**: Most attractions fit 6 standard categories. Template provides icons for common types, uses generic map pin for custom. Balances type-safety with extensibility.

---

**Specification Status**: ✅ **APPROVED - Ready for Implementation**
