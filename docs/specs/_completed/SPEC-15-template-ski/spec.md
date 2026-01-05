# Feature: Ski Resort Template

**Version:** 1.0.0
**Created:** 2025-12-30
**Status:** Implemented
**Spec ID:** SPEC-15

## Overview

A reusable Astro template component for West Virginia ski resorts (Snowshoe Mountain, Canaan Valley Resort) focused on trail information, vertical drop stats, season pass details, and lodging options. Target ~550-600 lines with winter sports emphasis, lift ticket pricing, and snow conditions integration.

## Problem Statement

WVWO's adventure destination hub needs a standardized way to present ski resort information that serves both destination resorts (Snowshoe - 257 acres, 60 trails) and smaller family resorts (Canaan Valley - 95 acres, 47 trails). Current templates (RiverTemplate, LakeTemplate) don't support ski-specific content like trail difficulty ratings, lift systems, snow conditions, or terrain parks.

**Who has this problem:**

- Adventure seekers researching WV ski destinations
- Families planning winter trips on a budget
- WVWO wanting to drive affiliate revenue from ski content

## Goals

- Create a flexible template supporting both destination and boutique ski resorts
- Display trail difficulty with standard color-coding (green/blue/black/double-black)
- Integrate snow conditions and lift status information
- Support seasonal content (winter skiing + summer activities like bike parks)
- Achieve 80%+ code reuse from existing RiverTemplate/LakeTemplate patterns
- Maintain full WVWO aesthetic compliance (rounded-sm, brand colors, Kim's voice)

## Non-Goals (Out of Scope)

- Real-time snow condition API integration (link to resort APIs instead)
- Interactive trail maps (embed resort-provided maps)
- Booking/reservation system (link to resort booking)
- Ski equipment e-commerce (handled by existing shop components)
- Multi-resort comparison features

## User Stories

### As a winter trip planner

- I want to see trail counts by difficulty at a glance
- So that I can pick a resort matching my family's skill levels

### As a budget-conscious family

- I want clear pricing for lift tickets, rentals, and lodging
- So that I can compare Canaan Valley vs Snowshoe costs

### As a ski enthusiast

- I want vertical drop, lift capacity, and terrain park info
- So that I can find challenging terrain worth the drive

### As a summer visitor

- I want to see what activities are available off-season
- So that I can plan a mountain biking or hiking trip

### As Kim (shop owner)

- I want to add personal tips about each resort
- So that visitors get insider local knowledge

## Functional Requirements

### Core Requirements

1. **Hero Section** - Resort name, elevation stats, quick badges, season dates
2. **Trail Breakdown** - Counts by difficulty with color-coded visual indicators
3. **Lift System** - Number of lifts, types, capacity
4. **Snow Conditions** - Link to real-time conditions, average snowfall, snowmaking info
5. **Pricing Section** - Lift tickets (day/multi-day), season passes, rentals grid
6. **Terrain Parks** - Optional section for parks with difficulty ratings
7. **Lodging Grid** - On-mountain and nearby options with amenities, booking links
8. **Dining & Amenities** - Restaurants, rentals, lessons, childcare
9. **Summer Activities** - Optional section for bike park, golf, hiking
10. **Kim's Tips** - Optional callout boxes with local insider knowledge

### Edge Cases

- **No terrain parks**: Section hidden via conditional rendering
- **No summer activities**: Section hidden (e.g., smaller resorts)
- **State park resorts**: Optional `parkAffiliation` prop for Canaan Valley
- **Nordic skiing**: Optional `nordicSkiing` prop for cross-country tie-ins
- **Multi-mountain passes**: Support Indy Pass, Epic, Ikon affiliations

## Non-Functional Requirements

### Performance

- Hero image lazy loading with blur placeholder
- Template renders in <100ms (Astro static generation)
- All images have explicit width/height to prevent CLS

### Accessibility

- Trail difficulty uses color + shape + text (green circle, blue square, black diamond)
- All sections have proper heading hierarchy (h2 → h3 → h4)
- Kim's Tips use ARIA role="note"
- `@media (prefers-reduced-motion: reduce)` on all animations

### Security

- All external URLs (booking, conditions) open in new tab with `rel="noopener noreferrer"`
- No user input handling (static content only)

## Data Model

### SkiTemplateProps Interface

```typescript
interface SkiTemplateProps {
  // Core identification
  name: string;
  slug: string;
  location: string;
  county: string;

  // Hero content
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;

  // Mountain stats
  elevation: {
    base: number;      // feet
    summit: number;    // feet
    vertical: number;  // feet
  };
  season: {
    open: string;      // "Late November"
    close: string;     // "Late March"
  };
  quickStats: string[]; // Badge labels

  // Trails
  trails: {
    total: number;
    beginner: number;      // Green circle
    intermediate: number;  // Blue square
    advanced: number;      // Black diamond
    expert: number;        // Double black
    acreage: number;
    longestRun?: string;   // "1.5 miles"
  };

  // Lifts
  lifts: {
    total: number;
    types: { type: string; count: number }[];
    capacity?: string;  // "12,000 skiers/hour"
  };

  // Snow conditions
  snowConditions: {
    averageSnowfall: string;  // "180 inches"
    snowmaking: string;       // "100% coverage"
    conditionsUrl?: string;   // Link to live report
    widgetEmbed?: string;     // OnTheSnow/MountainNews iframe embed code
  };

  // Pricing
  pricing: {
    isDynamic?: boolean;        // true = show "From $XX" pattern
    pricingUrl?: string;        // Link to resort's pricing page
    lastUpdated?: string;       // "December 2025" for freshness
    liftTickets: {
      type: string;             // "Adult Day", "Child Day"
      price: string;            // "$89" or "From $65"
      notes?: string;
    }[];
    seasonPass: {
      type: string;
      price: string;
      benefits?: string[];
    }[];
    rentals?: {
      package: string;
      price: string;
    }[];
  };

  // Optional sections
  terrainParks?: {
    name: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    features: string[];
  }[];

  lodging: {                    // REQUIRED - min 1 entry
    name: string;
    type: string;       // "Resort", "Cabin", "Hotel"
    distance?: string;  // "On-mountain", "5 miles"
    amenities: string[];
    priceRange?: string;
    bookingUrl?: string;
  }[];

  dining?: {                    // OPTIONAL - section hidden if empty
    name: string;
    type: string;       // "Cafeteria", "Sit-Down", "Bar"
    location: string;
    notes?: string;
  }[];

  amenities: {
    category: string;   // "Rentals", "Lessons", "Childcare"
    services: string[];
  }[];

  summerActivities?: {
    name: string;
    description: string;
    season: string;
  }[];

  // State park / wilderness integration
  parkAffiliation?: {
    type: 'state_park' | 'national_forest' | 'private';
    name?: string;
    nearbyWilderness?: string[];
  };

  // Nordic skiing
  nordicSkiing?: {
    onSite: boolean;
    nearbyFacilities?: {
      name: string;
      distance?: string;
      url?: string;
    }[];
  };

  // Multi-mountain pass
  passAffiliations?: {
    name: string;       // "Indy Pass", "Ikon"
    tier?: string;
    daysIncluded?: number;
  }[];

  // Shared components (reuse from adventure.ts)
  gearList: GearItem[];
  relatedShop: RelatedCategory[];
  safety: SafetyInfo[];

  // Hero elements
  heroImage: string;
  trailMapUrl?: string;
}
```

### Trail Difficulty Color Mapping

**Note:** Blue (bg-blue-700) is an approved exception for ski trail difficulty per industry standard (NASAA/NSAA trail rating system).

```typescript
function getTrailDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-sign-green text-white';        // Green circle - WVWO sign-green
    case 'intermediate':
      return 'bg-blue-700 text-white';          // Blue square - EXCEPTION: Industry standard
    case 'advanced':
      return 'bg-brand-brown text-brand-cream'; // Black diamond - WVWO brand-brown
    case 'expert':
      return 'bg-red-900 text-white';           // Double black - Dark red for danger
    default:
      return 'bg-brand-mud text-brand-cream';
  }
}
```

## Component Architecture

### File Structure

```
src/components/templates/
  SkiTemplate.astro           # Main template (~550-600 lines)

src/types/
  ski-types.ts                # Zod schemas for ski-specific types

src/content/adventures/
  snowshoe-mountain.md        # Example content (Phase 4)
  canaan-valley.md            # Example content (Phase 4)
```

### Section Backgrounds (Alternating)

| Section | Background |
|---------|------------|
| Hero | Full-bleed image + overlay |
| Description | bg-brand-cream |
| Trails | bg-white |
| Lifts & Conditions | bg-brand-cream |
| Pricing | bg-white |
| Terrain Parks | bg-brand-cream |
| Lodging | bg-white |
| Dining | bg-brand-cream |
| Summer Activities | bg-white |
| Gear Checklist | bg-brand-cream |
| Related Shop | bg-white |
| CTA | bg-sign-green |

### Reusable Components (from existing codebase)

| Component | Source | Usage |
|-----------|--------|-------|
| AdventureQuickStats | `components/adventure/` | Hero stats grid |
| AdventureGearChecklist | `components/adventure/` | Winter gear list |
| AdventureRelatedShop | `components/adventure/` | Ski equipment shop links |
| AdventureCTA | `components/adventure/` | Footer call-to-action |

## Dependencies

### External

- Resort snow condition APIs (linked, not integrated)
- Resort booking systems (linked via bookingUrl)
- Trail map images/PDFs (embedded or linked)

### Internal

- `src/types/adventure.ts` - Base types (StatItem, GearItem, etc.)
- `src/components/adventure/*` - Shared adventure components
- `src/styles/global.css` - WVWO brand tokens

## Acceptance Criteria

### Template Structure

- [x] ~550-600 lines total *(Accepted deviation: 770 lines - includes Kim's Tips section)*
- [x] All 9+ sections implemented *(10 sections: Hero, Description, Kim's Tips, Trails, Lifts, Pricing, Terrain Parks, Lodging, Dining, Amenities, Summer Activities, Gear, Shop, CTA)*
- [x] TypeScript props interface complete with Zod validation
- [x] Responsive grid layouts (mobile-first)

### WVWO Aesthetic Compliance

- [x] `rounded-sm` enforced throughout (zero rounded-md/lg/xl)
- [x] Trail difficulty color-coded with shapes for accessibility
- [x] Border-left accents on cards (border-l-4) *(Kim's Tips uses border-l-4)*
- [x] Pricing clearly displayed in grid format
- [x] Kim's Tips use font-hand (Permanent Marker)
- [x] Zero forbidden fonts (Inter, Poppins, etc.)
- [x] Zero purple/pink/neon colors

### Functionality

- [x] Conditional rendering for optional sections (terrain parks, summer activities, Kim's Tips)
- [x] Snow conditions link integration *(includes OnTheSnow widget embed support)*
- [x] Booking URL support for lodging cards
- [x] Trail map link prominent in header
- [x] Pass affiliations displayed (Indy Pass, etc.)

### Accessibility

- [x] Trail difficulty uses color + shape + text label
- [x] All images have alt text
- [x] Heading hierarchy maintained (h1 → h2 → h3)
- [x] prefers-reduced-motion respected *(motion-safe:/motion-reduce: prefixes on all transitions)*

### Testing

- [x] Example content file validates against schema *(Build: 62 pages)*
- [x] Component renders without errors *(Build passed)*
- [ ] Mobile responsive (320px - 768px) *(Pending visual testing)*
- [ ] Desktop layout (1024px+) *(Pending visual testing)*

## Open Questions

1. ~~**Snow condition widget**: Should we embed third-party widgets (OnTheSnow, MountainNews) or just link to resort pages?~~
   - **RESOLVED**: Embed OnTheSnow/MountainNews iframe widget for richer real-time data

2. **Multi-resort comparison**: Should template support side-by-side comparison?
   - **Recommendation**: Out of scope for v1, consider for future enhancement

3. ~~**Seasonal homepage switching**: How should winter vs summer content be managed?~~
   - **RESOLVED**: Conditional sections - single template, summer sections render when `summerActivities` populated

## Clarifications

### Session 2025-12-30

- Q: Intermediate trail color uses blue-700, but blue is forbidden in WVWO palette. How to handle?
- A: **Allow blue exception** - Trail difficulty colors are industry standard (green/blue/black). Blue (#1976D2 or blue-700) is approved as an exception specifically for ski trail difficulty indicators only.

- Q: Snow condition widget - embed third-party or link only?
- A: **Embed widget** - Use OnTheSnow or MountainNews iframe widget for richer real-time data. Accept slower load tradeoff for better UX.

- Q: Seasonal homepage switching - how to manage winter vs summer content?
- A: **Conditional sections** - Single SkiTemplate.astro renders summer sections when `summerActivities` array is populated. No separate templates needed. Matches existing LakeTemplate pattern.

- Q: What's the minimum required content for lodging and dining arrays?
- A: **Dining optional** - `lodging` required (min 1 entry), `dining?` optional. If dining empty, section hidden. Lodging must always have at least one option for trip planning.

- Q: How to display pricing for resorts with dynamic/variable rates (like Snowshoe)?
- A: **"Starting at" pattern** - Display "From $XX" with `isDynamic: true` flag. Show note about early booking savings. Links to resort pricing page for current rates.

## References

- [SPEC-14 River Template](../SPEC-14-template-river/) - Pattern reference
- [Snowshoe Mountain](https://www.snowshoemtn.com/) - Destination resort example
- [Canaan Valley Resort](https://www.canaanresort.com/) - State park resort example
- [OnTheSnow Widget](https://www.onthesnow.com/widget) - Conditions widget option
- Research findings: Swarm agents a127233, a2e0d4d, a33fe7e, a525ce4

---

## Implementation Phases

### Phase 1: Research (COMPLETED)

- Snowshoe Mountain content patterns
- Canaan Valley positioning analysis
- Ski website UX best practices
- Codebase pattern analysis

### Phase 2: Architecture Design (COMPLETED)

- Finalize props interface ✓
- Create Zod schemas ✓
- Design section layouts ✓

### Phase 3: Template Generation (COMPLETED)

- Build SkiTemplate.astro (~590 lines) ✓
- Implement all sections ✓
- Add conditional rendering ✓

### Phase 4: Content Population (COMPLETED)

- Create Snowshoe Mountain content file ✓
- Create Canaan Valley content file ✓
- Validate against schema ✓

### Phase 5: Page Routes & Build Verification (COMPLETED)

- Create snowshoe-mountain.astro page route ✓
- Create canaan-valley.astro page route ✓
- Build verification: 62 pages built successfully ✓
- Fixed AdventureCTA prop mapping ✓

### Phase 6: Testing & Refinement (FUTURE)

- Visual regression testing
- Accessibility audit (trail colors use shape + text + color)
- Mobile responsiveness check
