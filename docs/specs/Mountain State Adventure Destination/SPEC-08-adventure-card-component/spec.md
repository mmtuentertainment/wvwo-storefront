# Feature Specification: Adventure Card Component

**Feature Branch**: `SPEC-08-adventure-card-component`
**Created**: 2025-12-26
**Status**: Implementation Gaps Identified
**Input**: Create a reusable AdventureCard component following ProductCard aesthetic patterns (border-l-4 accent, hover lift, animation stagger) for displaying WMA/Lake/River adventures

---

## Overview

The AdventureCard component displays adventure destinations (WMAs, Lakes, Rivers, Parks) in a filterable grid on the Adventures Hub. It follows WVWO aesthetic patterns established by CategoryGrid.astro (border-l-4 accent, hover lift, rounded-sm corners) while integrating with the Astro Content Collections data model.

**Current State**: Implementation exists at `src/components/adventures/AdventureCard.tsx` as a React component (for client-side filtering). This spec documents the existing implementation and identifies any gaps.

---

## User Scenarios & Testing

### User Story 1 - Browse Adventures Grid (Priority: P1)

A highway hunter visiting the Adventures Hub sees a grid of adventure cards and can quickly scan destinations to find relevant hunting/fishing spots.

**Why this priority**: Core experience - without cards, there's no content discovery.

**Independent Test**: Navigate to `/adventures/`, verify grid renders with adventure cards showing images, titles, locations, and metadata.

**Acceptance Scenarios**:

1. **Given** I am on the Adventures Hub, **When** the page loads, **Then** I see a responsive grid of adventure cards (2-col mobile, 3-col tablet, 4-col desktop)
2. **Given** an adventure has an image, **When** I view the card, **Then** I see a 4:3 aspect ratio image with lazy loading
3. **Given** I am on mobile, **When** I view the card, **Then** touch targets are minimum 44x44px

---

### User Story 2 - Visual Hierarchy Scanning (Priority: P1)

A user quickly scanning the grid can identify key information: location, difficulty, and season at a glance without reading full descriptions.

**Why this priority**: Users decide in <3 seconds whether to click. Visual hierarchy drives engagement.

**Independent Test**: Show 5 adventure cards to a user, time how quickly they can identify "easy spring fishing spots."

**Acceptance Scenarios**:

1. **Given** I view a card, **When** I scan it, **Then** the location badge is immediately visible (top of content area)
2. **Given** I view a card, **When** I scan it, **Then** difficulty is visible in the metadata row
3. **Given** I view a card, **When** I scan it, **Then** season tags are pill-styled chips at bottom

---

### User Story 3 - Hover Interaction Feedback (Priority: P2)

A desktop user hovering over a card receives visual feedback indicating it's clickable and interactive.

**Why this priority**: Reduces friction, increases click-through.

**Independent Test**: Hover over card on desktop, verify border color change and image scale.

**Acceptance Scenarios**:

1. **Given** I hover over a card, **When** the hover begins, **Then** the left border changes from sign-green to brand-orange
2. **Given** I hover over a card, **When** the hover begins, **Then** the image scales to 105%
3. **Given** I have motion preferences set to reduce, **When** I hover, **Then** no animations occur

---

### User Story 4 - Grid Load Animation (Priority: P3)

Cards reveal with a gentle stagger animation on initial load for visual polish.

**Why this priority**: Nice-to-have polish, not critical for function.

**Independent Test**: Load Adventures Hub, verify cards fade in with 60ms stagger delay.

**Acceptance Scenarios**:

1. **Given** the grid loads, **When** cards render, **Then** each card fades in with 60ms delay per index
2. **Given** motion-reduce is set, **When** the grid loads, **Then** cards appear instantly without animation

---

### Edge Cases

- What happens when adventure has no image? → Show placeholder with brand-mud/10 background
- What happens when title is very long? → Truncate with `line-clamp-2`
- What happens when suitability array is empty? → Hide suitability section entirely
- What happens on slow connection? → Images lazy load, cards render with content first

---

## Requirements

### Functional Requirements

- **FR-001**: Component MUST render adventure data from Astro Content Collections (`Adventure` type)
- **FR-002**: Component MUST display: image (4:3), location badge, title, description, difficulty, elevation (if present), season tags, drive time from shop
- **FR-003**: Component MUST display suitability icons when present (dog-friendly, kid-friendly, wheelchair-accessible, paved)
- **FR-004**: Entire card MUST be a single clickable link to `/adventures/[slug]/`
- **FR-005**: Component MUST support `index` prop for stagger animation delay calculation
- **FR-006**: Component MUST be wrapped in `React.memo` to prevent unnecessary re-renders during filtering

### Visual Requirements (WVWO Aesthetic)

- **VR-001**: Card MUST use `border-l-4 border-l-sign-green` left accent
- **VR-002**: Card MUST use `rounded-sm` corners (NOT rounded-md/lg)
- **VR-003**: Hover state MUST change border to `border-l-brand-orange`
- **VR-004**: Image hover MUST scale to 105% with 500ms duration
- **VR-005**: Typography MUST use `font-display` for titles, `font-body` for descriptions
- **VR-006**: Colors MUST use brand-brown (text), sign-green (accents), brand-cream (backgrounds)

### Accessibility Requirements

- **AR-001**: Image MUST have descriptive alt text
- **AR-002**: Suitability icons MUST have aria-label and title attributes
- **AR-003**: Card MUST have visible focus ring (`focus:ring-2 focus:ring-sign-green`)
- **AR-004**: Animations MUST respect `prefers-reduced-motion`

### Key Entities

- **Adventure**: Content collection entry with title, description, season[], difficulty, location, gear[], elevation_gain, suitability[], images[]
- **FilterState**: Current filter selections that determine which cards display

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Cards render within 100ms of data availability
- **SC-002**: Grid achieves Lighthouse Performance score of 90+ on mobile
- **SC-003**: All cards pass axe-core accessibility audit with 0 critical/serious issues
- **SC-004**: Kim approves design ("Feels like us, not corporate") - see content-ops.md

---

## Current Implementation Analysis

### What Exists (AdventureCard.tsx)

| Requirement | Status | Notes |
|-------------|--------|-------|
| FR-001: Adventure data | ✅ Complete | Uses `Adventure` type from filters.config |
| FR-002: Core fields | ⚠️ Gap | Missing drive time from shop |
| FR-003: Suitability icons | ✅ Complete | Emoji-based icons with labels |
| FR-004: Clickable link | ✅ Complete | Wraps entire card |
| FR-005: Index prop | ⚠️ Gap | Stagger animation required - add 60ms delay per index |
| FR-006: React.memo | ✅ Complete | Wrapped for performance |
| VR-001: Border-l-4 | ✅ Complete | `border-l-4 border-l-sign-green` |
| VR-002: Rounded-sm | ✅ Complete | `rounded-sm` applied |
| VR-003: Hover border | ✅ Complete | `hover:border-l-brand-orange` |
| VR-004: Image scale | ✅ Complete | `group-hover:scale-105` |
| VR-005: Typography | ✅ Complete | font-display/font-body |
| VR-006: Colors | ✅ Complete | brand-brown, sign-green |
| AR-001: Alt text | ✅ Complete | From images[].alt |
| AR-002: Suitability a11y | ✅ Complete | aria-label, title, role |
| AR-003: Focus ring | ✅ Complete | `focus:ring-2 focus:ring-sign-green` |
| AR-004: Motion respect | ✅ Complete | `motion-safe:` prefix used |

### Implementation Gaps Summary

| Gap | Priority | Implementation |
|-----|----------|----------------|
| **FR-002: Drive Time** | High | Add `drive_time` field to Adventure schema, display in metadata row |
| **FR-005: Stagger Animation** | Medium | Add CSS animation with `animation-delay: calc(var(--index) * 60ms)` |

**Drive Time Implementation**:
1. Add `drive_time: string` to Adventure content schema (e.g., "45 min")
2. Calculate from shop coordinates (38.8106, -80.6492) to adventure coordinates
3. Display in metadata row with car icon

**Stagger Animation Implementation**:
1. Accept `index` prop (already in interface)
2. Apply inline style: `style={{ animationDelay: \`${index * 60}ms\` }}`
3. Add `@keyframes gentle-reveal` with opacity + translateY
4. Wrap in `motion-safe:` media query

---

## Dependencies

### Internal

- `src/lib/adventures/filters.config.ts` - Adventure type definition
- `src/content/adventures/*.md` - Adventure content entries
- `src/components/adventures/FilteredGrid.tsx` - Parent grid component

### External

- Astro Content Collections (data source)
- Tailwind CSS (styling)
- React (client-side interactivity)

---

## Open Questions

1. ~~**Stagger Animation**: Should we implement the 60ms stagger, or is current implementation sufficient?~~ → Resolved
2. ~~**Distance from Shop**: Original content-ops.md mentioned "distance from shop" - should this be added to cards?~~ → Resolved
3. ~~**Type Badge**: Original spec mentioned WMA/Lake/River type badge - currently using location as badge. Should type be separate?~~ → Resolved

---

## Clarifications

### Session 2025-12-26

- Q: Should cards display distance from shop? → A: Yes, show drive time (e.g., "45 min from store") - Reinforces shop as home base for highway travelers
- Q: Should there be a separate type badge (WMA/Lake/River)? → A: No, location name already includes type (e.g., "Burnsville Lake WMA") - avoids clutter
- Q: Implement 60ms stagger animation on grid load? → A: Yes, add 60ms delay per card index for polished reveal effect

---

## References

- [PROMPT.md](./PROMPT.md) - Original task prompt with agent selection
- [content-ops.md](./content-ops.md) - Content operations workflow
- [ProductCard.astro](../../wv-wild-web/src/components/shop/ProductCard.astro) - Reference pattern
- [CategoryGrid.astro](../../wv-wild-web/src/components/CategoryGrid.astro) - Border-l-4 pattern source
- [filters.config.ts](../../wv-wild-web/src/lib/adventures/filters.config.ts) - Adventure type definition
