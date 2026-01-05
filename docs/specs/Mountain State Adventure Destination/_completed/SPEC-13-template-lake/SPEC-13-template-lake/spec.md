# Feature Specification: Lake Template Component

**Feature Branch**: `SPEC-13-template-lake`
**Created**: 2025-12-29
**Status**: Active Development
**Input**: "Create a reusable Astro template for West Virginia lakes that matches the structure and depth of summersville-lake.astro with fishing-centric content organization, marina details, camping facilities, and seasonal activity guides."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fishing Information Display (Priority: P1) 🎯 MVP

Content editors can create comprehensive fishing-focused lake pages that display species information, seasonal patterns, and fishing techniques in a visually consistent format matching WVWO's brand identity.

**Why this priority**: Fishing is the PRIMARY recreational activity for WV lakes. This delivers immediate value by allowing editors to publish rich fishing content without writing custom layouts for each lake.

**Independent Test**: Can be fully tested by creating a lake page with fish species data (name, season, techniques, Kim's tips) and verifying it renders with:

- Green border-left accents on species cards
- 2-3 column responsive grid layout
- font-display for species names
- font-hand for Kim's tips
- rounded-sm borders only

**Acceptance Scenarios**:

1. **Given** editor has fish species data with techniques and seasonal info, **When** they use LakeTemplate with fishSpecies prop, **Then** species appear in 2-3 column grid with green accents, techniques as bulleted lists, and Kim's tips in cursive font
2. **Given** editor includes Kim's fishing tips for species, **When** page renders, **Then** tips appear in Permanent Marker font (font-hand) below species info with subtle border-top separator
3. **Given** editor provides 6 fish species (like Summersville Lake), **When** page loads on mobile, **Then** cards stack full-width with readable spacing
4. **Given** lake has named fishing spots with depth/structure data, **When** editor provides fishingSpots array, **Then** spots display in full-width cards with brown accents showing depth, structure, target species, and access method

---

### User Story 2 - Marina & Camping Facilities (Priority: P2)

Content editors can display marina services, boat access, and campground information in a structured, easy-to-scan format that helps visitors plan their trip.

**Why this priority**: After fishing, visitors need practical information about boat access and overnight stays. This is critical for trip planning but secondary to fishing content.

**Independent Test**: Create a lake page with marina and campground data, verify it displays:

- Marina section with services list, boat launch ramps, rental options
- Campground cards with site counts, amenities checklist, reservation links
- Contact phone numbers as clickable tel: links
- External reservation links with security attributes

**Acceptance Scenarios**:

1. **Given** editor provides marina data (services, boat launch, rentals, hours, contact), **When** template renders marina section, **Then** information displays in 2-column grid with brown border-left accent, boat launch shows ramp count, and contact is a clickable phone link
2. **Given** campgrounds have reservation URLs, **When** editor includes reservationUrl, **Then** "Reserve Now" button appears with sign-green background and rounded-sm corners
3. **Given** campground lists amenities, **When** rendered, **Then** amenities appear as 2-column checklist with green checkmarks

---

### User Story 3 - Hero Section with Lake Stats (Priority: P1) 🎯 MVP

Visitors immediately see key lake information (name, acreage, depth, location) in a visually striking hero section with overlay statistics.

**Why this priority**: First impression matters. Hero section sets tone and provides essential facts visitors need. Critical for MVP.

**Independent Test**: Create lake page with hero data (name, acreage, maxDepth, county, heroImage), verify:

- Hero image fills viewport height (70vh min)
- Stats overlay displays in 2-4 column grid on hero
- Quick highlight badges render below stats
- All text uses brand fonts (font-display for stats, font-body for labels)

**Acceptance Scenarios**:

1. **Given** editor provides lake name, acreage, maxDepth, county, **When** hero renders, **Then** name appears in white font-display text (4xl-6xl responsive), stats show in 4-column grid overlay with uppercase labels
2. **Given** editor includes quickHighlights array, **When** hero renders, **Then** highlights appear as sign-green rounded-sm badges below stats
3. **Given** visitor views on mobile, **When** hero loads, **Then** stats switch to 2-column grid for readability

---

### User Story 4 - Activities & Seasonal Guide (Priority: P3)

Visitors can browse available activities beyond fishing (diving, swimming, kayaking) and understand the best seasons for each activity.

**Why this priority**: Enhances visitor experience but not critical for initial lake pages. Can be added incrementally.

**Independent Test**: Create lake page with activities and seasonalGuide arrays, verify sections display with proper formatting and seasonal breakdown.

**Acceptance Scenarios**:

1. **Given** editor provides activities array (name, description, season, difficulty), **When** activities section renders, **Then** activities display in grid with season and difficulty info
2. **Given** editor includes seasonalGuide (Spring/Summer/Fall/Winter with highlights), **When** seasonal section renders, **Then** each season shows with highlights list and optional fishing focus notes

---

### User Story 5 - Safety & Regulations Display (Priority: P2)

Visitors can quickly find important safety rules and regulations organized by category (boating, fishing, permits) with orange warning accents.

**Why this priority**: Legal compliance and visitor safety. Important for every lake but can be added after core content is working.

**Independent Test**: Create lake page with regulations array, verify categories display with orange border-left accents and rules as bulleted lists.

**Acceptance Scenarios**:

1. **Given** editor provides regulations by category (e.g., "Walleye Regulations", "Boating Safety"), **When** regulations section renders, **Then** each category shows with orange border-left accent and rules as bulleted list
2. **Given** regulation includes specific measurements/limits, **When** rendered, **Then** text remains readable with proper font sizing and spacing

---

### Edge Cases

- **Empty Arrays**: What happens when editor provides empty fishSpecies[], campgrounds[], or other arrays? (Answer: Sections should hide gracefully or show "Check WV DNR for information" message)
- **Missing Optional Fields**: How does template handle missing kimsTip, mapUrl, or reservationUrl? (Answer: Optional content doesn't render, no broken UI)
- **Long Species Names**: What if fish species name is very long (e.g., "Chain Pickerel (Southern Subspecies)")? (Answer: Text wraps naturally within card, font-display handles with proper line-height)
- **Mobile Rendering**: How do 3-column grids behave on small screens? (Answer: All grids stack to 1-column on mobile, 2-column on tablet, full columns on desktop)
- **Special Characters in Text**: How does template handle quotes, apostrophes in Kim's tips? (Answer: Proper escaping in Astro template, test with contractions like "don't" and quotes)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Template MUST accept props for lake name, acreage, maximum depth, county, and hero image
- **FR-002**: Template MUST display fish species in 2-3 column responsive grid with green border-left accents
- **FR-003**: Template MUST render Kim's fishing tips in Permanent Marker font (font-hand) when provided
- **FR-004**: Template MUST show fishing spots in full-width cards with brown border-left accents including depth, structure, species list, and access information
- **FR-005**: Template MUST display campground facilities with site counts, amenities checklists, and optional reservation links
- **FR-006**: Template MUST render marina information including services, boat launch details (ramp count, fees), rental options, hours, and contact phone
- **FR-007**: Template MUST use ONLY rounded-sm border radius (0.125rem) for all cards, buttons, and badges - NO rounded-md/lg/xl allowed
- **FR-008**: Template MUST enforce WVWO font hierarchy: font-display (Bitter) for headings, font-hand (Permanent Marker) for Kim's tips only, font-body (Noto Sans) for content
- **FR-009**: Template MUST use brand color accents: sign-green for fish/amenities, brand-brown for spots/marina, brand-orange for safety/regulations
- **FR-010**: Template MUST implement mobile-first responsive layout: 1-column mobile, 2-column tablet, 2-4 column desktop based on content type
- **FR-011**: Template MUST handle empty data arrays gracefully by hiding sections or showing appropriate fallback messages
- **FR-012**: Template MUST render activities section with season and optional difficulty indicators
- **FR-013**: Template MUST display seasonal guide broken down by Spring/Summer/Fall/Winter with activity highlights
- **FR-014**: Template MUST show regulations organized by category with orange border-left accents and bulleted rules lists
- **FR-015**: Template MUST render contact phone numbers as clickable tel: links in marina section
- **FR-016**: Template MUST include rel="noopener noreferrer" security attributes on external reservation links
- **FR-017**: Template MUST apply gentle-reveal animations (0.6s ease-out) with prefers-reduced-motion support

### Key Entities *(feature involves structured data)*

- **Lake**: Core entity representing a WV lake with basic stats (name, acreage, depth, county, location)
- **Fish Species**: Species available in lake with seasonal patterns, techniques, hot spots, and Kim's tips
- **Fishing Spot**: Named location within lake with depth, structure type, target species, and access method
- **Campground**: Camping facility with name, site count, amenities list, season, and optional reservation URL
- **Marina**: Boat access facility with services, launch details, rentals, hours, and contact information
- **Activity**: Recreation option beyond fishing with name, description, season, and difficulty level
- **Seasonal Guide**: Season-specific information (Spring/Summer/Fall/Winter) with activity highlights and fishing focus
- **Regulation**: Safety/legal rule organized by category with list of specific rules

### Non-Functional Requirements

- **NFR-001**: Template MUST maintain WVWO brand consistency (fonts, colors, border-radius) with existing adventure components
- **NFR-002**: Template MUST achieve target length of ~600 lines (matching reference implementation depth)
- **NFR-003**: Template MUST reuse existing SPEC-11 adventure components where applicable (AdventureQuickStats, AdventureWhatToFish, AdventureCampingList, etc.)
- **NFR-004**: Template MUST support TypeScript with Zod schema validation for all props - validation runs at build time in template frontmatter, build MUST fail with descriptive error if props don't match schema (no runtime validation)
- **NFR-005**: Template MUST render consistently across modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR-006**: Template MUST be accessible (WCAG 2.1 AA compliant) with semantic HTML, ARIA labels, keyboard navigation
- **NFR-007**: Template MUST perform efficiently (Lighthouse score 90+ for performance, accessibility, SEO)
- **NFR-008**: Template MUST use Astro's default text interpolation (`{variable}`) for all user-provided content to prevent XSS injection - NO use of `set:html` directive for untrusted content
- **NFR-009**: Template MUST handle array sizes up to documented limits (20 species, 15 spots, 10 campgrounds, 20 activities) without performance degradation - Lighthouse performance score must remain 90+ within these limits

## Success Criteria *(mandatory)*

Content editors can:

1. **Create new lake pages in under 30 minutes** by providing structured data (fish species, spots, facilities) without writing custom Astro/HTML
2. **Maintain brand consistency** across all lake pages with 100% WVWO aesthetic compliance (rounded-sm only, correct fonts, brand colors)
3. **Display rich fishing content** with 6+ species, seasonal patterns, techniques, and Kim's local knowledge in scannable format
4. **Render complex facility information** (marina services, campgrounds, boat launches) in organized, easy-to-read layouts
5. **Support mobile visitors** with responsive layouts that work across all device sizes without horizontal scroll or broken grids

Visitors to lake pages can:

1. **Find fishing information immediately** within 3 seconds of page load (hero + fish species section appears above fold)
2. **Understand lake characteristics** from hero stats (acreage, depth, location) before scrolling
3. **Plan their trip** using marina/campground details with clickable phone numbers and reservation links
4. **Navigate content easily** with clear visual hierarchy (font sizes, border accents, spacing)
5. **Access pages on any device** with readable text, tappable buttons, and properly stacked mobile layouts

Technical validation:

1. **TypeScript type safety** with 100% coverage of props interface and Zod schema validation
2. **Component reuse** of 70%+ existing SPEC-11 components (measured by shared section usage)
3. **WVWO compliance** passes automated tests: zero instances of rounded-md/lg/xl, all fonts from approved list
4. **Accessibility score** of 95+ in Lighthouse audit (semantic HTML, ARIA, keyboard nav, color contrast)
5. **Performance metrics** meet targets: First Contentful Paint <1.5s, Largest Contentful Paint <2.5s

## Assumptions & Constraints *(mandatory)*

### Assumptions

1. **Content editors have fishing knowledge**: Editors can provide accurate fish species, seasonal patterns, and techniques (no validation for correctness of fishing data)
2. **Images are provided externally**: Hero images exist at provided paths, template does not handle image upload/optimization
3. **WV DNR data is current**: Regulation text provided by editors reflects current WV DNR rules (template displays as-is, no validation)
4. **Existing component stability**: SPEC-11 adventure components (AdventureWhatToFish, AdventureCampingList, etc.) are production-ready and API-stable
5. **TypeScript environment**: Project uses Astro 5+ with TypeScript support configured
6. **Tailwind 4 availability**: Brand color classes (brand-brown, sign-green, etc.) and font classes (font-display, font-hand, font-body) exist in Tailwind config
7. **Build-time validation acceptable**: Editors understand that invalid prop data will cause build failures and can fix data based on Zod error messages

### Constraints

1. **WVWO Aesthetic Non-Negotiable**: ONLY rounded-sm allowed, all other border-radius values rejected in code review - this is a hard constraint for brand identity
2. **No Backend Dependencies**: Template is static Astro component, all data passed as props at build time (no API calls, no database)
3. **Font Loading**: Permanent Marker (font-hand) must be loaded globally, template assumes font availability
4. **Browser Support**: Modern browsers only (last 2 versions), no IE11 support required
5. **Existing Component APIs**: Template must use existing component prop interfaces as-is, cannot request breaking changes to SPEC-11 components
6. **Mobile-First Required**: Responsive breakpoints follow Tailwind defaults (md: 768px, lg: 1024px), cannot customize
7. **Accessibility Minimum**: WCAG 2.1 AA compliance required (color contrast 4.5:1 for text, 3:1 for UI elements)
8. **Array Size Limits**: Maximum array sizes for performance - fishSpecies: 20, fishingSpots: 15, campgrounds: 10, activities: 20. Template behavior with arrays exceeding limits is undefined (may cause layout/performance issues)

## Dependencies *(optional - only if applicable)*

### External Dependencies

- **Astro 5+**: Template requires Astro 5 for component API and TypeScript support
- **Tailwind CSS 4**: Brand color classes and responsive utilities depend on Tailwind config
- **Google Fonts**: Bitter (font-display), Permanent Marker (font-hand), Noto Sans (font-body) must be loaded in layout

### Internal Dependencies

- **SPEC-11 Adventure Components** (completed):
  - AdventureWhatToFish.astro - Fishing species wrapper
  - AdventureFeatureSection.astro - Generic feature grid base
  - AdventureCampingList.astro - Campground facility cards
  - AdventureAmenitiesGrid.astro - Amenities checklist
  - AdventureQuickStats.astro - Stats bar component

- **Type System** (types/adventure.ts):
  - Existing types: GearItem, RelatedCategory, CampingFacility, FeatureItem, StatItem
  - **NEW types needed**: FishingSpot, Marina, Activity, SeasonalGuide, Regulation, LakeTemplateProps (see data-model.md)

### Blockers

- **SPEC-11 completion**: Lake Template cannot be implemented until SPEC-11 adventure components are production-ready and tested (STATUS: ✅ COMPLETE per research)
- **Type definitions**: LakeTemplateProps interface must be added to types/adventure.ts before template implementation can begin

## Out of Scope *(optional - clarify boundaries)*

### Explicitly NOT Included

1. **Dynamic Content Updates**: Template does not support runtime data fetching or CMS integration - all content is static at build time
2. **Map Integration**: While mapUrl prop exists for external Google Maps links, no embedded interactive maps in template
3. **Photo Galleries**: Template displays single hero image only, no lightbox/gallery UI for multiple lake photos
4. **Booking Systems**: Reservation links are external only, no embedded booking forms or availability calendars
5. **Weather Integration**: No current weather conditions or forecasts displayed on lake pages
6. **User Reviews**: No rating system, comments, or user-generated content support
7. **Print Stylesheet**: Template optimized for screen only, no printer-friendly CSS
8. **River/Stream Support**: Template designed specifically for lakes (named spots, depth data), not compatible with flowing water bodies without modification
9. **WMA Hunting Content**: While template can coexist with hunting info on combination WMA+lake pages, it doesn't handle hunting-specific layouts (use WMA Template for that)
10. **Multi-Language**: Template renders in English only, no i18n support

### Future Considerations

- **SPEC-14: River Template**: Separate template for flowing water (fishing focus shifts to current patterns, wading access)
- **SPEC-15: Hiking Trail Template**: Different content model (trail maps, difficulty ratings, elevation)
- **Enhanced Marina Sections**: Could add real-time boat launch status, fuel prices, equipment rental inventory in future iteration

## Related Specifications

- **SPEC-09**: Adventure Hero Component - Hero section pattern reference
- **SPEC-10**: Adventure Quick Stats - Stats bar component integration
- **SPEC-11**: Adventure Shared Components Bundle - Component dependency source
- **SPEC-12**: WMA Template Component System - Parallel template showing structure patterns

## Clarifications

### Session 2025-12-29

- **Q: How should user-provided text be sanitized to prevent XSS injection?** → A: Rely on Astro's built-in auto-escaping for all text interpolations (`{variable}`). No additional manual sanitization required. All user-provided content (Kim's tips, species names, regulations) is rendered via Astro's default escaping mechanism which prevents script injection.

- **Q: Should there be maximum array size limits to ensure acceptable page performance?** → A: Yes. Maximum limits: 20 fish species, 15 fishing spots, 10 campgrounds, 20 activities. These provide 2-3x headroom over typical WV lake data (6-12 species, 5-10 spots, 3-6 campgrounds) while preventing performance degradation on mobile devices.

- **Q: When should Zod schema validation run and what should happen if validation fails?** → A: Validate at build time in template frontmatter using Zod `.parse()`. Build MUST fail with clear error message if prop data doesn't match schema. This prevents invalid/broken pages from reaching production and gives editors immediate feedback on data errors.

## Validation Checklist Reference

See `checklists/requirements.md` for specification quality validation (generated during specification review).
