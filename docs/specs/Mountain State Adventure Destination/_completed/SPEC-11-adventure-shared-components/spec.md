# Feature Specification: Adventure Shared Components Bundle

**Feature Branch**: `feature/spec-11-adventure-shared-components`
**Created**: 2025-12-27
**Status**: Clarified
**Version**: 1.0.0

## Overview

3 reusable Astro components for consistent adventure page sections:

- **AdventureGettingThere**: Directions with drive stats and Google Maps link
- **AdventureGearChecklist**: Required/optional gear with responsive grid
- **AdventureRelatedShop**: Category cards linking to shop with CTA

## Problem Statement

Adventure pages need consistent "Getting There", "Gear Checklist", and "Shop Related" sections. Currently these are hand-coded in summersville-lake.astro with no reusable components. Each new adventure page requires duplicating this code, leading to inconsistency and maintenance burden.

## Goals

- Reusable components matching AdventureHero/QuickStats patterns (SPEC-09/10)
- Consistent WVWO styling (font-display/body, brand colors, rounded-sm)
- Slot-based composition for page-specific customization
- Zod schema validation for type safety

## Non-Goals (Out of Scope)

- Interactive React components (keep as static Astro)
- E-commerce cart integration (shop links only)
- Embedded maps (external Google Maps link only)
- Content Collections integration (manual props only for now)

---

## User Scenarios & Testing

### User Story 1 - Visitor Gets Directions (Priority: P1)

A highway hunter visiting the adventure page wants clear directions from the WVWO shop to the destination so they can plan their trip.

**Why this priority**: Core value proposition - getting visitors from shop to adventure destinations drives foot traffic and affiliate revenue.

**Independent Test**: Can be fully tested by rendering AdventureGettingThere with directions prop and verifying output displays correctly with map link.

**Acceptance Scenarios**:

1. **Given** an adventure page with directions, **When** the page loads, **Then** visitor sees formatted directions with drive time and distance
2. **Given** a Google Maps link is provided, **When** visitor clicks "Open in Google Maps", **Then** a new tab opens with the correct destination
3. **Given** additional notes exist in the slot, **When** the page loads, **Then** visitor sees the pro-tips below the directions

---

### User Story 2 - Visitor Checks Gear Requirements (Priority: P1)

A first-time visitor wants to know what gear they need for the adventure so they can prepare properly or visit the shop to purchase missing items.

**Why this priority**: Drives shop sales by highlighting gear needs; safety/preparedness value for visitors.

**Independent Test**: Can be fully tested by rendering AdventureGearChecklist with items array and verifying required vs optional visual distinction.

**Acceptance Scenarios**:

1. **Given** a gear list with required items, **When** the page loads, **Then** visitor sees checkmark icons (sign-green) for required items
2. **Given** a gear list with optional items, **When** the page loads, **Then** visitor sees circle icons with "(optional)" text
3. **Given** a footer slot with shop CTA, **When** visitor doesn't have gear, **Then** they can click through to the shop

---

### User Story 3 - Visitor Discovers Related Shop Categories (Priority: P2)

A visitor planning their trip wants to browse related shop categories to purchase gear before their adventure.

**Why this priority**: Revenue conversion - connects adventure content to shop categories.

**Independent Test**: Can be fully tested by rendering AdventureRelatedShop with categories array and verifying links navigate correctly.

**Acceptance Scenarios**:

1. **Given** related categories are defined, **When** the page loads, **Then** visitor sees category cards with descriptions
2. **Given** a category card, **When** visitor hovers, **Then** the card shows hover effect (border color change, slight lift)
3. **Given** the main CTA, **When** visitor clicks, **Then** they navigate to the shop page

---

### Edge Cases

- What happens when no mapLink is provided? → Map button hidden, directions still display
- What happens when items array is empty? → Section renders with intro text only, no grid
- What happens when directions contain HTML? → Fragment set:html renders safely
- What happens when category has no description? → Card displays name only, no description text

---

## Requirements

### Functional Requirements

**AdventureGettingThere**:

- **FR-001**: Component MUST display directions content with HTML support (bold, lists)
- **FR-002**: Component MUST show drive time with clock icon when driveTime prop provided
- **FR-003**: Component MUST show distance with map icon when distance prop provided
- **FR-004**: Component MUST render Google Maps button when mapLink provided (new tab, rel="noopener noreferrer")
- **FR-005**: Component MUST support default slot for additional transportation notes
- **FR-006**: Component MUST use default fromLocation text: "From our shop (121 WV-82, Birch River)"

**AdventureGearChecklist**:

- **FR-007**: Component MUST display gear items in responsive grid (1 col mobile, 2-3 desktop)
- **FR-008**: Component MUST show checkmark icon (sign-green) for required items
- **FR-009**: Component MUST show circle icon with "(optional)" text for optional items
- **FR-010**: Component MUST support "footer" named slot for shop CTA
- **FR-011**: Component MUST support configurable columns prop (1, 2, or 3)
- **FR-012**: Component MUST display optional intro text above gear grid

**AdventureRelatedShop**:

- **FR-013**: Component MUST display category cards in responsive grid (1 col mobile, 2-3 desktop)
- **FR-014**: Component MUST apply border-left-4 sign-green pattern to cards
- **FR-015**: Component MUST show hover effect (border-l-brand-orange, translateY(-2px))
- **FR-016**: Component MUST display main CTA button at bottom
- **FR-017**: Component MUST use default intro text: "Planning a trip? We've got you covered."
- **FR-018**: Component MUST link category cards to internal shop pages (href starts with "/")

### Key Entities

- **GearItem**: Represents a single gear recommendation with name, optional flag, and optional icon
- **RelatedCategory**: Represents a shop category link with name, description, and href

---

## Data Model

### Types to Add to adventure.ts

```typescript
import { z } from 'astro/zod';

// ============================================================================
// SPEC-11: SHARED COMPONENT SCHEMAS
// ============================================================================

/**
 * Gear item for AdventureGearChecklist component.
 * Represents a single piece of recommended gear.
 */
export const GearItemSchema = z.object({
  /** Gear item name (e.g., "Fishing rod & tackle") */
  name: z.string().min(1),
  /** True if item is optional (default: false = required) */
  optional: z.boolean().default(false),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type GearItem = z.infer<typeof GearItemSchema>;

/** Column count options for AdventureGearChecklist grid */
export type GearColumns = 1 | 2 | 3;

/**
 * Related shop category for AdventureRelatedShop component.
 * Links to shop category pages.
 */
export const RelatedCategorySchema = z.object({
  /** Category name (e.g., "Fishing Gear") */
  name: z.string().min(1),
  /** Brief description (optional) */
  description: z.string().optional(),
  /** Link to category page (e.g., "/shop/fishing") */
  href: z.string().startsWith('/'),
  /** Optional predefined icon name */
  icon: StatIconSchema.optional(),
});

export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;
```

---

## API/Interface Design

### AdventureGettingThere Props

```typescript
interface Props {
  /** Section heading (default: "Getting There") */
  title?: string;
  /** Starting location text (default: "From our shop (121 WV-82, Birch River)") */
  fromLocation?: string;
  /** HTML directions content (supports bold, lists) */
  directions: string;
  /** Google Maps URL (optional) */
  mapLink?: string;
  /** Drive time display (e.g., "25 minutes") */
  driveTime?: string;
  /** Distance display (e.g., "18 miles") */
  distance?: string;
}
// Slot: default (additional transportation notes)
```

### AdventureGearChecklist Props

```typescript
interface Props {
  /** Section heading (default: "Gear Checklist") */
  title?: string;
  /** Intro text in Kim's voice (optional) */
  intro?: string;
  /** Array of gear items to display */
  items: GearItem[];
  /** Grid columns on desktop (default: 2) */
  columns?: GearColumns;
}
// Slot: "footer" (shop CTA)
```

### AdventureRelatedShop Props

```typescript
interface Props {
  /** Section heading (default: "Shop Related Items") */
  title?: string;
  /** Intro text (default: "Planning a trip? We've got you covered.") */
  intro?: string;
  /** Array of shop categories to display */
  categories: RelatedCategory[];
  /** CTA button text (default: "Visit Our Shop") */
  ctaText?: string;
  /** CTA button href (default: "/shop") */
  ctaHref?: string;
}
```

---

## Usage Examples

### AdventureGettingThere

```astro
<AdventureGettingThere
  directions="<p>Head south on <strong>US-19 South</strong> from our shop for 18 miles. Turn right onto <strong>Summersville Lake Road</strong>.</p>"
  mapLink="https://maps.google.com/?q=Summersville+Lake+Marina+WV"
  driveTime="25 minutes"
  distance="18 miles"
>
  <p class="text-brand-mud/80 mt-4 italic">
    <strong>Pro tip:</strong> Get there early on summer weekends.
  </p>
</AdventureGettingThere>
```

### AdventureGearChecklist

```astro
---
const gearList = [
  { name: 'Fishing rod & tackle', optional: false },
  { name: 'Life jackets', optional: false },
  { name: 'Sunscreen', optional: false },
  { name: 'Cooler', optional: true },
];
---

<AdventureGearChecklist
  intro="Don't forget these essentials for a safe, fun day."
  items={gearList}
  columns={2}
>
  <a slot="footer" href="/shop/fishing" class="btn-primary">
    Shop Fishing Gear
  </a>
</AdventureGearChecklist>
```

### AdventureRelatedShop

```astro
---
const categories = [
  { name: 'Fishing Gear', description: 'Rods, reels, tackle', href: '/shop/fishing' },
  { name: 'Camping', description: 'Tents, coolers', href: '/shop/camping' },
];
---

<AdventureRelatedShop
  intro="Everything you need for your adventure."
  categories={categories}
  ctaText="Browse All Gear"
/>
```

---

## Non-Functional Requirements

### Performance

- Static Astro components (0KB client JS)
- Inline SVG icons (no external icon library)
- CSS animations with prefers-reduced-motion support

### Accessibility

- Semantic HTML: section, h2, dl/dt/dd or ul/li
- External links: target="_blank" rel="noopener noreferrer"
- Icon-only elements: aria-hidden="true"
- Focus-visible states on interactive elements
- aria-labelledby on sections

### Security

- HTML directions sanitized via Astro Fragment set:html
- External URLs validated (Google Maps domain only)
- Shop links are internal relative paths (start with "/")

### WVWO Styling Compliance

- rounded-sm ONLY (no rounded-md/lg)
- Brand colors only (brand-brown, sign-green, brand-cream, brand-mud)
- font-display for headings, font-body for content
- Transitions: transition-colors duration-300

---

## Dependencies

- **Existing Components**: AdventureHero (SPEC-09), AdventureQuickStats (SPEC-10)
- **Type System**: wv-wild-web/src/types/adventure.ts
- **Icon System**: STAT_ICON_PATHS from adventure.ts (reuse existing)
- **Content Collections**: Adventure schema (SPEC-06) - future integration

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 3 components render correctly on adventure pages without errors
- **SC-002**: Components pass WVWO aesthetic review (rounded-sm, brand colors, correct fonts)
- **SC-003**: Responsive behavior works across breakpoints (mobile 1 col, desktop 2-3 col)
- **SC-004**: All acceptance scenarios pass manual testing
- **SC-005**: Accessibility audit shows no violations (WCAG 2.1 AA)
- **SC-006**: prefers-reduced-motion respected for all animations

### Acceptance Criteria Checklist

- [ ] 3 components created in wv-wild-web/src/components/adventure/
  - [ ] AdventureGettingThere.astro
  - [ ] AdventureGearChecklist.astro
  - [ ] AdventureRelatedShop.astro
- [ ] Types added to wv-wild-web/src/types/adventure.ts
  - [ ] GearItemSchema + GearItem type
  - [ ] RelatedCategorySchema + RelatedCategory type
  - [ ] GearColumns type
- [ ] Slot composition working
  - [ ] GettingThere: default slot for notes
  - [ ] GearChecklist: "footer" named slot for CTA
- [ ] Integration example documented

---

## Clarifications (Resolved)

1. **Q1**: Should AdventureGettingThere support multiple routes (e.g., from shop vs from I-79)?
   - **RESOLVED**: Single route only (from shop). Extend later if multi-route needed.

2. **Q2**: Should gear items link directly to shop products?
   - **RESOLVED**: No links for now. Schema can be extended with optional `href` later.

3. **Q3**: Should icons use STAT_ICON_PATHS or new GEAR_ICON_PATHS?
   - **RESOLVED**: Reuse existing `STAT_ICON_PATHS` from adventure.ts. Add new icons to that map if needed.

---

## References

- [PROMPT.md](./PROMPT.md) - Full implementation specification
- [content-ops.md](./content-ops.md) - Workflow and content operations context
- [AdventureQuickStats.astro](../../../wv-wild-web/src/components/adventure/AdventureQuickStats.astro) - Pattern reference
- [adventure.ts](../../../wv-wild-web/src/types/adventure.ts) - Type definitions
