# Feature Specification: Adventure Hero Component

**Feature Branch**: `feature/SPEC-09-adventure-hero-component`
**Created**: 2025-12-26
**Status**: Draft (Updated with Hivemind Research)
**Version**: 2.0.0
**Spec ID**: SPEC-09

## Overview

Create a reusable `AdventureHero.astro` component for adventure destination pages, following WVWO aesthetic (brand-brown camo pattern, badge system, responsive image). This hero component will be used across all WMA, lake, river, and trail destination pages to provide consistent, SEO-optimized headers.

**Research Basis**: 8-agent hivemind analysis (Dec 26, 2025) identified 72 gaps in original spec across image optimization, SEO, accessibility, and testing dimensions.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Adventure Hero (Priority: P1)

A visitor lands on an adventure destination page (e.g., Summersville Lake) and immediately sees a visually compelling hero section that communicates what the destination offers.

**Why this priority**: First impression - the hero section is the first thing visitors see. Must load fast, look authentic (WVWO aesthetic), and communicate value.

**Independent Test**: Navigate to any adventure page and verify hero renders with image, title, badges, and description within 2 seconds on 3G connection.

**Acceptance Scenarios**:

1. **Given** a visitor on an adventure page, **When** the page loads, **Then** the hero displays title, description, difficulty badge, season badge, and hero image
2. **Given** a mobile visitor, **When** viewing the hero, **Then** content stacks vertically (image first, then text) with touch-friendly badge sizing
3. **Given** a desktop visitor, **When** viewing the hero, **Then** content displays in 2-column grid (text left, image right)

---

### User Story 2 - Schema.org Geographic SEO (Priority: P1)

Search engines index the adventure page with proper structured data for "near me" searches and geographic discovery.

**Why this priority**: Phase 3 goal is geographic SEO. Without schema markup, Google can't properly surface adventures in local searches.

**Independent Test**: Run Google Rich Results Test on adventure page and verify Place/Article schema is detected.

**Acceptance Scenarios**:

1. **Given** a search engine crawler, **When** parsing the adventure page, **Then** valid Schema.org Place markup with GeoCoordinates is present
2. **Given** a user searching "fishing near Birch River WV", **When** Google indexes the page, **Then** structured data enhances search result appearance
3. **Given** coordinates prop provided, **When** schema renders, **Then** latitude and longitude are included in GeoCoordinates

---

### User Story 3 - Accessible Hero Experience (Priority: P1)

Screen reader users and keyboard navigators can understand and interact with the hero section.

**Why this priority**: WCAG 2.2 compliance required. European Accessibility Act enforcement begins June 28, 2025.

**Independent Test**: Run axe-core accessibility audit and verify zero violations in hero section.

**Acceptance Scenarios**:

1. **Given** a screen reader user, **When** navigating the hero, **Then** section is properly labeled via `aria-labelledby` pointing to h1
2. **Given** a user with vestibular disorders, **When** reduced motion is enabled, **Then** all animations are disabled
3. **Given** a keyboard user, **When** tabbing through hero, **Then** CTA buttons are focusable with visible focus indicators

---

### User Story 4 - Responsive Image Performance (Priority: P2)

Images load efficiently with appropriate sizes for the visitor's device, preventing layout shift and reducing bandwidth.

**Why this priority**: Core Web Vitals (CLS, LCP) directly impact SEO ranking and user experience.

**Independent Test**: Run Lighthouse audit and verify hero image has srcset, CLS < 0.1, LCP < 2.5s.

**Acceptance Scenarios**:

1. **Given** a mobile visitor on slow connection, **When** hero loads, **Then** appropriately-sized image (400px) is requested
2. **Given** any visitor, **When** hero renders, **Then** image has explicit dimensions preventing layout shift
3. **Given** image fails to load, **When** error occurs, **Then** graceful fallback UI displays "Image unavailable"

---

### User Story 5 - Slot-Based Content Flexibility (Priority: P2)

Content authors can customize hero content per adventure without modifying the component.

**Why this priority**: Enables reuse across 50+ adventure pages with custom CTAs, additional info, etc.

**Independent Test**: Create adventure page with custom slot content and verify it renders correctly.

**Acceptance Scenarios**:

1. **Given** an adventure page, **When** passing content to default slot, **Then** content appears below description
2. **Given** an adventure page, **When** passing CTA buttons to "cta" slot, **Then** buttons appear in CTA section
3. **Given** no slot content provided, **When** hero renders, **Then** component renders without empty placeholder divs

---

### User Story 6 - Print-Friendly Adventure Guide (Priority: P3)

Visitors can print adventure pages as reference guides for their trip.

**Why this priority**: Hunting/fishing guides are often printed. Nice-to-have but serves real user need.

**Independent Test**: Print preview adventure page and verify hero content is readable without CTA buttons.

**Acceptance Scenarios**:

1. **Given** a visitor printing the page, **When** print dialog opens, **Then** CTA buttons are hidden
2. **Given** a visitor printing, **When** page prints, **Then** hero image scales appropriately and doesn't break across pages

---

### Edge Cases

- What happens when image URL returns 404? → Fallback UI with "Image unavailable" message
- What happens with invalid difficulty value? → Runtime validation, defaults to 'moderate' with console warning
- What happens with extremely long title? → CSS truncation with ellipsis after 3 lines
- What happens with no coordinates provided? → Schema.org renders without geo, still valid
- What happens with duplicate hero IDs on page? → Use dynamic ID generation: `adventure-hero-${slug}`

---

## Requirements *(mandatory)*

### Functional Requirements

#### Core (Must Have)

- **FR-001**: Component MUST render title as h1 with `id` for aria-labelledby
- **FR-002**: Component MUST display difficulty badge with correct WVWO colors (easy=sign-green, moderate=brand-orange, advanced=brand-mud)
- **FR-003**: Component MUST display season badge with brand-cream background
- **FR-003a**: Component MUST display drive time badge when `driveTime` prop provided (e.g., "20 min drive")
- **FR-004**: Component MUST render hero image using Astro Image component with srcset
- **FR-005**: Component MUST include Schema.org structured data when schemaType prop provided
- **FR-006**: Component MUST include `aria-hidden="true"` on decorative camo overlay
- **FR-007**: Component MUST respect `prefers-reduced-motion` media query
- **FR-008**: Component MUST display fallback UI when image fails to load

#### Recommended (Should Have)

- ~~**FR-009**: Component SHOULD accept breadcrumbs prop for navigation context~~ **REMOVED** - Breadcrumbs handled in page layout, not component (see Clarifications)
- **FR-010**: Component SHOULD include publishedDate/updatedDate for content freshness signals
- **FR-011**: Component SHOULD expose loading prop ('lazy' | 'eager') for above-fold optimization
- **FR-012**: Component SHOULD include print styles hiding CTAs

#### Nice-to-Have (Could Have)

- **FR-013**: Component COULD include blur placeholder during image load
- **FR-014**: Component COULD include share button slot for social sharing

### Props Interface (Updated from Hivemind Research)

```typescript
interface Props {
  // Required - Core Display
  title: string;                                    // Adventure name (h1)
  description: string;                              // Lead paragraph
  difficulty: 'easy' | 'moderate' | 'advanced' | 'rugged';
  season: string;                                   // "Year-round", "Spring-Fall", etc.
  driveTime?: string;                               // "20 min", "1 hr" from Birch River shop

  // Required - Image
  image: ImageMetadata;                             // Astro Image compatible
  imageAlt: string;                                 // Accessibility

  // Optional - Image Control
  imagePosition?: 'center' | 'top' | 'bottom';      // object-position (default: 'center')
  loading?: 'lazy' | 'eager';                       // Image loading strategy (default: 'eager' - above-fold)

  // Optional - SEO & Content
  publishedDate?: string;                           // ISO date for schema
  updatedDate?: string;                             // ISO date for schema
  coordinates?: { lat: number; lng: number };       // For Schema.org GeoCoordinates
  schemaType?: 'Place' | 'Article' | 'Event';       // Schema.org type
}
```

### Key Entities

- **Adventure**: Core data entity from Content Collections (title, description, difficulty, season, images, coordinates)
- **AdventureHero**: Presentational component consuming Adventure data
- **Schema.org Place**: Structured data output for geographic SEO

---

## Non-Functional Requirements

### Performance

- **NFR-001**: Hero LCP (Largest Contentful Paint) MUST be < 2.5 seconds on 4G
- **NFR-002**: Hero CLS (Cumulative Layout Shift) MUST be < 0.1
- **NFR-003**: Image srcset MUST include widths [400, 800, 1200] for responsive loading
- **NFR-004**: Camo SVG pattern MUST be < 2KB

### Accessibility (WCAG 2.2 AA)

- **NFR-005**: Section MUST have `aria-labelledby` pointing to h1 id
- **NFR-006**: Decorative elements (camo overlay, SVG) MUST have `aria-hidden="true"`
- **NFR-007**: SVG MUST have `role="presentation"`
- **NFR-008**: Color contrast for text on brand-brown MUST meet 4.5:1 ratio
- **NFR-009**: Focus indicators on CTAs MUST be visible (focus-visible styles)

### SEO

- **NFR-010**: Schema.org markup MUST be valid (testable via Google Rich Results Test)
- **NFR-011**: H1 MUST be unique per page and contain primary keyword

### Browser Support

- **NFR-012**: Component MUST work in Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All adventure pages using AdventureHero pass Lighthouse accessibility audit (100 score)
- **SC-002**: All adventure pages have valid Schema.org markup (verified via Rich Results Test)
- **SC-003**: Hero LCP < 2.5s on simulated 4G (Lighthouse)
- **SC-004**: Hero CLS < 0.1 (Lighthouse)
- **SC-005**: Component has 100% test coverage for props rendering
- **SC-006**: axe-core audit returns zero violations
- **SC-007**: Kim approves visual design ("Feels like us")

---

## Test Specifications

### Unit Tests (Vitest)

File: `src/components/adventure/__tests__/AdventureHero.test.ts`

```typescript
describe('AdventureHero', () => {
  it('renders with required props');
  it('applies correct difficulty badge color');
  it('generates aria-labelledby with h1 id');
  it('handles missing image gracefully');
  it('respects prefers-reduced-motion');
  it('generates Schema.org markup when schemaType provided');
  it('includes GeoCoordinates when coordinates provided');
  it('renders slot content correctly');
});
```

### Accessibility Tests

```typescript
import { axe } from 'vitest-axe';

it('passes axe accessibility audit');
it('has proper heading hierarchy');
it('decorative elements have aria-hidden');
```

### Responsive Tests

```typescript
it('renders mobile layout at 375px viewport');
it('renders desktop layout at 1024px viewport');
it('image srcset is generated correctly');
```

---

## Dependencies

### Internal

- `src/styles/global.css` - Design tokens (brand-brown, sign-green, etc.)
- `src/components/ui/badge.tsx` - Badge variants (optional reuse)
- Content Collections schema - Adventure type definition

### External

- `astro:assets` - Image optimization
- `vitest` + `vitest-axe` - Testing

---

## Clarifications

### Session 2025-12-26
- Q: Should breadcrumbs be rendered IN the hero or above it? → A: **Above hero** - Breadcrumbs handled in page layout, hero component starts at title. Matches existing summersville-lake.astro pattern.
- Q: Do we need a "drive time from shop" badge? → A: **Yes** - Add optional `driveTime` prop that displays as third badge (e.g., "20 min drive" from Birch River shop).
- Q: Default image loading strategy? → A: **eager** - Hero is above-fold, load immediately for better LCP.
- Q: Responsive breakpoint for mobile→desktop? → A: **lg (1024px)** - Standard Tailwind breakpoint. Tablets get stacked layout.

---

## Open Questions

1. ~~Should we use Astro Image or regular img?~~ **RESOLVED**: Use Astro Image with srcset (per 2025 best practices)
2. ~~Schema.org type - Place or Article?~~ **RESOLVED**: Support both via schemaType prop
3. ~~Should breadcrumbs be rendered IN the hero or above it?~~ **RESOLVED**: Above hero, in page layout (not component responsibility)
4. ~~Do we need a "drive time from shop" badge in addition to difficulty/season?~~ **RESOLVED**: Yes, add as optional third badge with `driveTime` prop

---

## References

- [Astro Images Docs](https://docs.astro.build/en/guides/images/)
- [WCAG 2.2 Animation Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Schema.org Place](https://schema.org/Place)
- [Hivemind Research Report](../../plans/inherited-petting-origami.md)
- [WVWO Frontend Aesthetics](../../../CLAUDE.md#wvwo-frontend-aesthetics)
- [Existing Hero Pattern](../../../wv-wild-web/src/pages/near/summersville-lake.astro) (lines 67-92)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-22 | Initial spec (PROMPT.md agent execution format) |
| 2.0.0 | 2025-12-26 | Converted to speckit template, incorporated 72 gaps from 8-agent hivemind research |
| 2.1.0 | 2025-12-26 | Clarified: breadcrumbs outside component, added driveTime badge, eager loading default, lg breakpoint |
