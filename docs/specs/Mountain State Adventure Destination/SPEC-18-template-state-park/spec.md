# Feature: State Park Template

**Version:** 1.0.0
**Created:** 2026-01-02
**Status:** Ready for Implementation

## Overview

A comprehensive, reusable Astro template for West Virginia State Parks that handles family-friendly recreation facilities (lodging, camping, pools, visitor centers), seasonal programming (ranger-led activities, Junior Ranger), accessibility features (WCAG 2.1 Level AA compliance by April 2026), and integrated reservation systems. The template addresses 63 identified gaps between wilderness backcountry areas (SPEC-17) and developed park facilities, providing a production-ready foundation for 50+ WV state park pages.

## Problem Statement

**Who has this problem:** WVWO content team and site visitors seeking state park information.

**The problem:**
- No template exists for family-oriented, facility-rich state parks (vs wilderness backcountry)
- Current adventure templates don't support complex facility types (lodges, cabins, campgrounds, pools, visitor centers)
- No structured approach for ranger programs, educational events, or Junior Ranger activities
- Missing accessibility features required by federal law (WCAG 2.1 Level AA by April 26, 2026)
- No integration with WV State Parks reservation system
- SEO gaps prevent capturing high-volume keywords like "Blackwater Falls cabins" or "Pipestem camping"

**Impact:**
- Cannot publish content for 50+ WV state parks, losing significant organic traffic
- Legal liability for accessibility non-compliance after April 2026
- Missed SEO opportunities (19% of searches show featured snippets)
- Poor user experience for families planning state park visits

## Goals

**Primary Goal:**
- Create a production-ready State Park template that addresses all 63 identified gaps with 85%+ test coverage and Lighthouse 100 score

**Secondary Goals:**
- Achieve WCAG 2.1 Level AA compliance (federal requirement by April 2026)
- Capture featured snippet opportunities with FAQ schema (19% of searches)
- Integrate WV State Parks reservation system via deep links
- Reuse 70% of SPEC-17 Backcountry architecture for consistency
- Support multi-template hybrid pattern (combines Lake + Backcountry + Ski + Cave elements)

## Non-Goals (Out of Scope)

**What this feature will NOT do:**
- Real-time reservation API integration (WV State Parks system is third-party, no API access)
- Interactive facility map components (future SPEC)
- Online program registration/booking (defer to WV State Parks system)
- Real-time weather API integration (future enhancement)
- User reviews/ratings system (future enhancement)
- Payment processing integration (reservation system handles this)

## User Stories

### As a family planning a state park trip
- I want to see available cabins, campgrounds, and amenities
- So that I can decide if the park has facilities my family needs

### As a person with mobility needs
- I want to know which trails, facilities, and programs are wheelchair-accessible
- So that I can confidently plan my visit

### As a parent
- I want to see ranger programs, Junior Ranger activities, and educational workshops
- So that my kids can have engaging, educational experiences

### As a camping enthusiast
- I want to see campground details (hookups, bathhouses, sites) and reservation info
- So that I can book the right campsite for my RV/tent

### As a WVWO content manager (Kim)
- I want a reusable template with clear data patterns
- So that I can efficiently create pages for 50+ WV state parks

### As a search engine
- I want comprehensive Schema.org structured data (Park, TouristAttraction, Event)
- So that I can show rich results, featured snippets, and events carousels

## Functional Requirements

### Core Requirements

1. **Type System Foundation** (Priority: P0)
   - Create `state-park-types.ts` with Zod schemas for 10 facility types (lodges, cabins, campgrounds, pools, visitor centers, nature centers, picnic areas, boat launches, playgrounds, amphitheaters)
   - Define 20+ amenity types (disc golf, tennis courts, stables, equipment rentals, laundromats)
   - Support 9 activity types (swimming, boating, fishing, golf, hiking, horseback riding)
   - Include 18 accessibility features (all-terrain wheelchairs, beach wheelchairs, accessible fishing piers, sensory gardens, audio tours, ASL interpreters)
   - Follow SPEC-17 pattern: every enum includes LABELS, COLORS, SHAPES, and helper functions

2. **StateParkTemplate Component** (Priority: P0)
   - 8-section architecture: Hero → Overview → Facilities → Activities → Trails → Accessibility → Planning (includes Park Passes info section) → Safety
   - Conditional rendering for optional sections (not all parks have all facilities)
   - Park Passes static section with link to wvstateparks.com/passes (annual/senior/veteran pass info)
   - WVWO aesthetic compliance: `rounded-sm` borders, brand colors only, Kim's voice
   - Target ~1,000 lines following SPEC-17 BackcountryTemplate pattern

3. **New Section Components** (Priority: P0)
   - `FacilitiesSection.astro`: Lodging cards, campground grids, amenity lists (~300 lines)
   - `ActivitiesSection.astro`: Ranger programs, educational workshops, recreation (~250 lines)
   - `ReservationSection.astro`: Fee grids, booking CTAs (1-833-WV-PARKS), cancellation policy (~200 lines)
   - `ParkOverviewSection.astro`: Hours, fees, contact, managing agency (~150 lines)

4. **SEO Implementation** (Priority: P0)
   - `SchemaStateParkTemplate.astro`: Multi-type schema (`["Park", "TouristAttraction"]`) with @graph structure (~400 lines)
   - `SchemaFAQ.astro`: FAQPage for featured snippets (40-50 word answers) (~120 lines)
   - `SchemaEvent.astro`: Ranger programs, festivals, events carousel support (~150 lines)
   - OpeningHoursSpecification for seasonal hours
   - AmenityFeature with LocationFeatureSpecification (20+ features)

5. **Accessibility Compliance** (Priority: P0 - Legal Requirement)
   - WCAG 2.1 Level AA by April 26, 2026 federal deadline
   - Trail Access Information (TAI) with FSTAG specifications
   - ADA facility indicators (parking, restrooms, trails, programs)
   - Assistive services documentation (equipment rentals, service animal policy)
   - Color contrast ≥4.5:1, keyboard navigation, screen reader compatible

6. **Data Files** (Priority: P1)
   - `holly-river-sp.ts`: Iconic waterfall park reference (~600 lines)
   - `watoga-sp.ts`: Resort-style park with lodge (~550 lines)
   - Real WV State Parks data (verify fees, hours, facilities against official website)
   - Kim's authentic voice in descriptions

### Edge Cases

- **Missing Data:** Graceful handling when parks lack certain facilities (e.g., no lodging, only day-use)
- **Seasonal Closures:** Display seasonal hours, facility closures, winter operations
- **Reservation Availability:** No real-time availability; use static booking window info
- **Multi-Unit Parks:** Some parks have multiple units (Pipestem upper/lower); support with location field
- **Industry Color Exceptions:** Trail difficulty (green/blue/red/black) overrides WVWO brand for safety

## Non-Functional Requirements

### Performance
- Lighthouse 100 score (all metrics: Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Image optimization: WebP format, responsive srcsets, lazy loading below fold
- Bundle size: Target <1.5MB total page weight

### Accessibility
- WCAG 2.1 Level AA compliance (0 axe violations)
- Keyboard navigation 100% functional
- Screen reader compatible (NVDA/JAWS tested)
- `prefers-reduced-motion` respect for all animations
- Semantic HTML5 (landmarks, headings hierarchy)
- Skip-to-content links

### Security
- No sensitive data in client-side code
- External links (WV State Parks reservation) with `rel="noopener noreferrer"`
- No inline scripts (CSP compatibility)
- Input sanitization for user-generated content (future reviews)

### Testability
- 85%+ code coverage (match SPEC-17 standard)
- Unit tests for all type schemas and helper functions (~600 lines)
- Component tests for rendering and accessibility (~400 lines)
- Integration tests for full template (~200 lines)
- Visual regression tests for responsive layouts (~150 lines)
- SEO validation tests (schema.org, meta tags) (~100 lines)

## Data Model

### Primary Entity: StatePark

```typescript
interface StatePark {
  // Metadata
  name: string;                      // "Blackwater Falls State Park"
  slug: string;                      // "blackwater-falls"
  established: number;               // 1937
  acreage: number;                   // 2,358
  signatureFeature: string;          // "62-foot Blackwater Falls"

  // Location
  location: {
    county: string;                  // "Tucker County"
    region: string;                  // "Mountain Lakes"
    coordinates: Coordinates;        // GPS
    nearestTown: string;             // "Davis, WV"
    distanceFromCity: string;        // "2 hours from Charleston"
  };

  // Facilities (10 types with balanced detail - 10-12 fields per facility)
  facilities: {
    lodging?: LodgingFacility[];     // Cabins, lodges with bedrooms, bathrooms, kitchen, fireplace, petFriendly, seasonalAvail, priceRange
    camping?: CampingFacility[];     // Campgrounds with siteCount, hookupTypes, bathhouse, dumpStation, maxRVLength
    picnicAreas?: PicnicArea[];      // Day-use shelters with shelterCount, capacity, reservable, grills, electricity
    pools?: PoolFacility[];          // Swimming pools with type (indoor/outdoor), depth, lifeguard, season, accessibility
    visitorCenter?: VisitorCenter;   // Main info center with hours, exhibits, programs, giftShop, restrooms
    natureCenter?: NatureCenter;     // Educational exhibits with liveAnimals, interactiveDisplays, trails, programs
    boatLaunches?: BoatLaunch[];     // Water access with rampType, lanes, trailerParking, depth, fees
    playgrounds?: Playground[];      // Kids play areas with ageGroups, equipment, surfaceType, shade, accessibility
    amphitheaters?: Amphitheater[];  // Event venues with capacity, season, acoustics, accessibility, programs
    other?: OtherFacility[];         // Disc golf (holes, difficulty), tennis (courts, surface), stables (trails, lessons)
  };

  // Activities & Programs (7 types)
  activities: {
    rangerPrograms?: RangerProgram[];
    educationalWorkshops?: Workshop[];
    juniorRanger?: JuniorRangerProgram;
    seasonalEvents?: SpecialEvent[];
    recreationalActivities?: Activity[];
  };

  // Trails
  trails: Trail[];                   // Reuse from BackcountryTemplate

  // Scenic Overlooks
  overlooks: ScenicOverlook[];

  // Accessibility (18 features)
  accessibility: {
    adaCompliant: string[];          // Facilities
    accessibleTrails: Trail[];       // TAI-compliant
    assistiveServices: string[];     // Wheelchairs, ASL, etc.
    serviceAnimalPolicy: string;
    accommodationRequest: string;    // 72-hour advance notice
  };

  // Reservations
  reservations: {
    fees: Fee[];                     // Day-use, camping, cabin rates
    bookingWindow: string;           // "6 months advance"
    cancellationPolicy: string;
    contact: {
      phone: string;                 // "1-833-WV-PARKS"
      url: string;                   // reservations.wvstateparks.com
    };
  };

  // Operating Hours
  hours: OpeningHours[];             // Seasonal variations

  // Regulations
  regulations: {
    petPolicy: PetPolicy;
    alcoholPolicy: string;
    smokingPolicy: string;
    quietHours: string;
    parkingRules: string;
  };

  // Emergency & Management
  emergencyContacts: EmergencyContact[];
  managingAgency: ManagingAgency;

  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    faq: FAQItem[];                  // 6-8 questions for featured snippets
    keywords: string[];
  };

  // Media
  heroImage: ImageObject;           // With credit, license fields for attribution
  galleryImages?: ImageObject[];    // Optional additional images
  parkMapUrl?: string;               // Link to downloadable park map PDF
}
```

### Relationships
- **StatePark** → **Facilities** (1:Many)
- **StatePark** → **Activities** (1:Many)
- **StatePark** → **Trails** (1:Many)
- **ManagingAgency** (WV State Parks) → **StatePark** (1:Many)

## API/Interface Design

### Component Interface

```typescript
// StateParkTemplate.astro props
interface StateParkTemplateProps {
  park: StatePark;                   // Full park data object
  relatedParks?: StatePark[];        // Nearby parks by geographic proximity (3-5 max, sorted by distance from coordinates)
  showRelatedShop?: boolean;         // WVWO product cross-links (default: true)
}
```

### Data File Pattern

```typescript
// src/data/state-parks/blackwater-falls-sp.ts
import type { StatePark } from '@/types/state-park-types';

export const blackwaterFallsStatePark: StatePark = {
  name: "Blackwater Falls State Park",
  slug: "blackwater-falls",
  // ... complete data object
};
```

### Route Integration

```typescript
// src/pages/state-parks/[slug].astro
import { getCollection } from 'astro:content';
import StateParkTemplate from '@/components/templates/StateParkTemplate.astro';
import SchemaStateParkTemplate from '@/components/seo/SchemaStateParkTemplate.astro';

// Dynamic route for all state parks
```

## Dependencies

### Internal Dependencies
- **SPEC-17 Backcountry Template** (70% reusable architecture)
  - `AdventureHero.astro`
  - `AdventureQuickStats.astro`
  - `TrailsSection.astro`
  - `ScenicOverlooksSection.astro`
  - `AdventureCTA.astro`
  - Emergency contact patterns
  - Managing agency footer

- **SPEC-09 Adventure Shared Types**
  - `GearItemSchema`
  - `CoordinatesSchema`
  - `DifficultySchema`
  - `SeasonSchema`

- **Existing Infrastructure**
  - Astro Content Collections
  - Tailwind 4.x CSS
  - Zod validation
  - shadcn/ui components

### External Dependencies
- **WV State Parks Reservation System** (third-party)
  - URL: reservations.wvstateparks.com
  - Phone: 1-833-WV-PARKS
  - No API access; deep links only

- **Legal/Compliance**
  - WCAG 2.1 Level AA (federal requirement by April 26, 2026)
  - FSTAG trail specifications
  - Schema.org structured data standards

## Acceptance Criteria

### Code Quality
- [ ] 0 TypeScript errors in strict mode
- [ ] 85%+ test coverage (match SPEC-17)
- [ ] All builds pass (Astro, TypeScript, tests)
- [ ] 0 ESLint errors
- [ ] 0 WVWO aesthetic violations (rounded-sm only, brand colors only, no forbidden fonts)

### SEO Performance
- [ ] Lighthouse SEO score = 100
- [ ] Schema.org validation passes (Google Rich Results Test)
- [ ] 15+ featured snippet optimization opportunities (FAQ schema)
- [ ] Meta titles 50-60 characters
- [ ] Meta descriptions 150-160 characters
- [ ] OpenGraph and Twitter Card tags present

### Accessibility (Legal Requirement)
- [ ] WCAG 2.1 Level AA compliance (0 axe violations)
- [ ] Keyboard navigation 100% functional
- [ ] Screen reader compatible (NVDA/JAWS tested)
- [ ] Color contrast ≥4.5:1 for all text
- [ ] `prefers-reduced-motion` respected for all animations
- [ ] Skip-to-content links present

### Functional Completeness
- [ ] All 10 facility types supported (lodges, cabins, campgrounds, pools, etc.)
- [ ] 7 program types implemented (ranger-led, educational, Junior Ranger, etc.)
- [ ] 18 accessibility features documented
- [ ] Reservation integration complete (deep links, booking info, fees)
- [ ] 2 reference data files (Holly River, Watoga) complete and validated

### Performance
- [ ] Lighthouse Performance score ≥90
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Total page weight <1.5MB
- [ ] Images WebP format with responsive srcsets

## Clarifications

### Session 2026-01-02

**Q1: Facility Subtype Detail Level**
→ **A: Balanced Detail (Option B)** - Use 10-12 fields per facility type covering key differentiators users care about. Examples: Cabins include bedrooms, bathrooms, kitchen (full/partial/none), fireplace, petFriendly, seasonalAvail, priceRange, reservationUrl. Campgrounds include siteCount, hookupTypes (electric/water/sewer), bathhouse, dumpStation, maxRVLength. This matches SPEC-17 Backcountry pattern - enough detail for decisions, not so burdensome for content team.

**Q2: Related Parks Discovery Logic**
→ **A: Geographic Proximity** - Determine related parks by calculating distance from GPS coordinates, sorting by proximity, and displaying top 3-5 nearest parks. Automatic, requires no additional data fields, matches user mental model ("I'm visiting X, what else is nearby?"). Implementation: ~1 hour using Haversine distance formula on existing coordinates field.

**Q3: Content Update Process**
→ **A: Quarterly Manual Review** - Kim reviews and updates all state park pages every 3 months (January, April, July, October) to verify hours, fees, and program schedules against official WV State Parks website. Estimated effort: ~8 hours per quarter (~2 hours/week amortized). Balances data freshness with sustainable maintenance burden. Document quarterly review checklist in Phase 6 covering: seasonal hours verification, fee updates, program schedule changes, facility status, emergency contact validation.

**Q4: Multi-Park Pass Representation**
→ **A: Link to External Pass Page** - Do not model annual/senior/veteran passes in Fee schema. Add static "Park Passes" informational section to StateParkTemplate explaining pass benefits with external link to wvstateparks.com/passes. Zero Phase 1 impact, zero maintenance burden, delegates to authoritative source. WVWO doesn't sell passes - WV State Parks does. Users must visit official site to purchase anyway.

**Q5: Photography/Image Strategy**
→ **A: Hybrid Approach (Option C)** - Phase 4 implementation: (1) Prioritize public domain sources (Unsplash CC0, Wikimedia Commons) for hero images - legal, free, good WV landscape coverage. (2) Fall back to WV State Parks official images with proper attribution per their media guidelines. (3) Future enhancement: Commission professional photographer if budget allows ($5K-10K for 50 parks). ImageObject schema includes `credit` and `license` fields for attribution. Estimated Phase 4 impact: ~2 hours for image sourcing and attribution.

## Open Questions

1. **Reservation System Future Integration**
   - Should we monitor WV State Parks for API availability?
   - Timeline for real-time availability integration if API becomes available?

2. **User Reviews/Ratings**
   - Should we implement review collection for future phase?
   - Impact on schema.org AggregateRating?

## References

### Related Specifications
- [SPEC-17: Backcountry Template](../SPEC-17-template-backcountry/SPEC-17-FINAL.md) - 70% reusable architecture
- [SPEC-09: Adventure Card Component](../SPEC-09-adventure-card-component/PROMPT.md) - Shared types
- [SPEC-16: Cave Template](../SPEC-16-template-cave/PROMPT.md) - Visitor center patterns

### Research Documents
- [State Park Research Findings](../../state-park-research-findings.md) - 10+ facility types, 15+ amenities
- [Accessibility Compliance Research](../../accessibility-compliance-research.md) - WCAG 2.1 Level AA requirements
- [SEO Architecture](./SPEC-18-seo-architecture.md) - Schema.org multi-type approach
- [Implementation Roadmap](../../reports/spec-18-implementation-roadmap.md) - 6-phase plan, 50 hours

### External Standards
- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&levels=aaa) - Accessibility standard
- [FSTAG Guidelines](https://www.fs.usda.gov/sites/default/files/FSTAG-2013-Update.pdf) - Trail Access Information
- [Schema.org Park](https://schema.org/Park) - Structured data type
- [Schema.org TouristAttraction](https://schema.org/TouristAttraction) - Tourism properties
- [WV State Parks Official](https://wvstateparks.com/) - Data source for verification

### Design Guidelines
- [CLAUDE.md](../../../../CLAUDE.md) - WVWO aesthetic requirements, concurrent execution rules
- [WVWO Component Patterns](../../../../.agentdb/wvwo-context.json) - Brand colors, fonts, voice

---

**Next Steps:**
1. ✅ Review spec.md for completeness
2. ⏭️ `/speckit.clarify` - If spec has ambiguities (recommend reviewing Open Questions)
3. ⏭️ `/speckit.plan` - Create detailed implementation plan (6-phase roadmap ready)
4. ⏭️ Create feature branch: `git checkout -b feature/spec-18-state-park-template`
