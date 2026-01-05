# Contract: LakeTemplate → AdventureCampingList

**Component**: `AdventureCampingList.astro` (SPEC-12)
**Purpose**: Display campground facilities with amenities and reservation links
**Integration Type**: Existing component with direct pass-through (no transformation)

---

## Component Interface

### Props Required

```typescript
interface AdventureCampingListProps {
  facilities: CampingFacility[];      // Array of campgrounds
  columns?: number;                   // Optional: 2 (default for lakes)
  variant?: 'white' | 'cream';        // Optional: section background
}

interface CampingFacility {
  type: string;                       // Campground name
  count: number;                      // Number of sites
  description: string;                // Brief overview
  link?: string;                      // Optional: reservation URL
  contact?: string;                   // Optional: phone number
  accessibility?: string;             // Optional: ADA info
}
```

### Component Behavior

- Renders 2-column responsive grid (1-col mobile, 2-col tablet/desktop)
- Displays site count as green badge
- Reservation links open in new tab with security attributes
- Contact phone numbers as clickable `tel:` links
- Accessibility info with icon if present

---

## Data Transformation

### Lake Props → CampingFacility[] Mapping

**NO TRANSFORMATION REQUIRED** - Direct pass-through of existing type.

**Source Data** (from LakeTemplateProps):

```typescript
campgrounds: CampingFacility[];  // Uses existing SPEC-12 type
```

**Usage** (in LakeTemplate.astro):

```astro
<!-- Direct pass-through, no transformation needed -->
<AdventureCampingList
  facilities={props.campgrounds}  // Pass as-is
  columns={2}
  variant="cream"
/>
```

**Example Data**:

```typescript
campgrounds: [
  {
    type: 'Battle Run Campground',
    count: 117,
    description: 'Peninsula campground with water on three sides. Electric hookups, bathhouse, playground.',
    link: 'https://www.recreation.gov/camping/campgrounds/233396',
    contact: '(304) 872-3459',
    accessibility: '5 ADA-accessible sites with paved pads'
  },
  {
    type: 'Salmon Run Campground',
    count: 75,
    description: 'Wooded sites near boat ramp. Water and electric hookups available.',
    link: 'https://www.recreation.gov/camping/campgrounds/251883',
    contact: '(304) 872-3460'
  }
]
```

---

## Invocation Pattern

### Template Usage

```astro
<!-- LakeTemplate.astro -->
<AdventureCampingList
  facilities={props.campgrounds}
  columns={2}
  variant="cream"
/>
```

### Recommended Props

**For Lakes**:

```astro
<AdventureCampingList
  facilities={campgrounds}     // Direct from props
  columns={2}                  // 2-column for campgrounds
  variant="cream"              // Alternates with white sections
/>
```

### Placement

**Position**: Section #6 in template (after Where to Fish section)
**Order**: FACILITIES content - camping info after fishing details

**Context**:

```astro
<!-- Where to Fish (custom section) -->
<section class="py-12 md:py-16 bg-white">
  <!-- Fishing spots -->
</section>

<!-- Camping Facilities -->
<AdventureCampingList
  facilities={campgrounds}
  columns={2}
  variant="cream"
/>

<!-- Marina (custom section) -->
<section class="py-12 md:py-16 bg-white">
  <!-- Marina details -->
</section>
```

---

## Validation Rules

### Required

- ✅ `facilities` array CAN be empty (sections hides gracefully)
- ✅ If present, each `CampingFacility` requires:
  - `type`: Non-empty string (campground name)
  - `count`: Positive number (site count)
  - `description`: Non-empty string

### Optional

- `link`: URL to reservation system (recreation.gov, ReserveAmerica, etc.)
- `contact`: Phone number in format "(XXX) XXX-XXXX"
- `accessibility`: ADA compliance description
- `columns`: Defaults to 2 (appropriate for campgrounds)
- `variant`: Defaults to 'white' (override to 'cream')

### Array Size Limits (NFR-009)

**Performance Constraint**:

- `campgrounds` max: **10 items**
- Lighthouse performance score must remain 90+ within limit
- Typical WV lake: 3-6 campgrounds (well within limit)

### Edge Cases

**Empty Campgrounds Array**:

```typescript
campgrounds: []  // ✅ VALID - Section hides, no error
```

Component conditionally renders - if array empty, entire camping section hidden.

**No Reservation Link**:

```typescript
{
  type: 'Primitive Camping',
  count: 20,
  description: 'First-come, first-served sites. No reservations.',
  // link: undefined - no "Reserve Now" button renders
}
```

**Missing Optional Fields**:

```typescript
{
  type: 'Campground Name',
  count: 50,
  description: 'Description only, no contact/link/accessibility'
  // All optional fields undefined - component handles gracefully
}
```

---

## External Link Security

### Reservation Link Pattern

**Component Rendering**:

```astro
{facility.link && (
  <a
    href={facility.link}
    target="_blank"
    rel="noopener noreferrer"
    class="inline-block bg-sign-green text-white px-4 py-2 rounded-sm hover:bg-sign-green/90 transition-colors"
  >
    Reserve Now →
  </a>
)}
```

**Security Attributes**:

- `target="_blank"`: Opens in new tab
- `rel="noopener noreferrer"`: Prevents window.opener access (security)

**WVWO Styling**:

- `bg-sign-green`: Green button (matches fishing theme)
- `rounded-sm`: ONLY allowed border-radius
- `hover:bg-sign-green/90`: 90% opacity on hover

### Phone Link Pattern

**Component Rendering**:

```astro
{facility.contact && (
  <p class="text-brand-brown">
    <strong>Contact:</strong>
    <a href={`tel:${facility.contact.replace(/[^0-9]/g, '')}`} class="text-sign-green hover:underline">
      {facility.contact}
    </a>
  </p>
)}
```

**Processing**:

- Strips non-numeric characters for `tel:` link: `(304) 872-3459` → `tel:3048723459`
- Displays original format: `(304) 872-3459`
- Clickable on mobile devices (auto-dials)

---

## Testing

### Unit Tests (Not Needed - Pass-Through)

No transformation function, so unit tests focus on component integration:

```typescript
it('passes campgrounds array directly to AdventureCampingList', () => {
  const campgrounds = [{ type: 'Test', count: 50, description: 'Test campground' }];
  const { container } = render(LakeTemplate, { props: { campgrounds, ...otherProps } });

  expect(container).toContainElement('[data-component="AdventureCampingList"]');
});
```

### Integration Tests

```typescript
it('renders campground cards with site counts', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithCampgrounds });

  const campgroundNames = container.querySelectorAll('h3.font-display');
  expect(campgroundNames[0]).toHaveTextContent('Battle Run Campground');

  const siteCounts = container.querySelectorAll('[data-testid="site-count-badge"]');
  expect(siteCounts[0]).toHaveTextContent('117');
});

it('renders reservation links with security attributes', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithCampgrounds });

  const reserveLinks = container.querySelectorAll('a[target="_blank"]');
  expect(reserveLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  expect(reserveLinks[0]).toHaveAttribute('href', 'https://www.recreation.gov/camping/campgrounds/233396');
});

it('renders phone numbers as clickable tel: links', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithCampgrounds });

  const phoneLinks = container.querySelectorAll('a[href^="tel:"]');
  expect(phoneLinks[0]).toHaveAttribute('href', 'tel:3048723459');
  expect(phoneLinks[0]).toHaveTextContent('(304) 872-3459');
});

it('hides camping section when campgrounds array empty', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithoutCampgrounds });

  const campingSection = container.querySelector('[data-section="camping"]');
  expect(campingSection).not.toBeInTheDocument();
});
```

---

## Visual Specification

### Expected Rendering

**Desktop (1920px) - 2 Column Grid**:

```
┌──────────────────────────────┬──────────────────────────────┐
│ Battle Run Campground        │ Salmon Run Campground        │
│ [117 sites]                  │ [75 sites]                   │
│                              │                              │
│ Peninsula campground with... │ Wooded sites near boat...    │
│                              │                              │
│ Contact: (304) 872-3459      │ Contact: (304) 872-3460      │
│ 5 ADA-accessible sites       │                              │
│                              │                              │
│ [Reserve Now →]              │ [Reserve Now →]              │
└──────────────────────────────┴──────────────────────────────┘
```

White cards with subtle shadow, green badge for site count

**Mobile (375px) - 1 Column Stacked**:

```
┌──────────────────────────────┐
│ Battle Run Campground        │
│ [117 sites]                  │
│ Peninsula campground with... │
│ Contact: (304) 872-3459      │
│ 5 ADA-accessible sites       │
│ [Reserve Now →]              │
└──────────────────────────────┘
┌──────────────────────────────┐
│ Salmon Run Campground        │
│ [75 sites]                   │
│ Wooded sites near boat...    │
│ Contact: (304) 872-3460      │
│ [Reserve Now →]              │
└──────────────────────────────┘
```

Full-width cards, stacked vertically

---

## Dependencies

### Imports Required

```astro
---
import AdventureCampingList from '../adventure/AdventureCampingList.astro';
import type { CampingFacility } from '../../types/adventure';
---
```

### Type Dependencies

**From `types/adventure.ts`**:

- `CampingFacility` interface (existing SPEC-12 type)

**SPEC-12 Component**:

- AdventureCampingList.astro (lines 1-204 approx)

---

## WVWO Compliance

### Font Usage

- **Campground Names**: `font-display` (Bitter, serif) - bold headings
- **Site Count Badges**: `font-display` - numeric emphasis
- **Descriptions**: `font-body` (Noto Sans) - body text
- **Labels**: `font-body` - contact, accessibility labels

### Color Palette

- **Site Count Badge**: `bg-sign-green text-white` - green badge
- **Card Background**: `bg-white` - white cards
- **Text Colors**:
  - Campground name: `text-brand-brown` (#3E2723)
  - Description: `text-brand-brown/75` (75% opacity)
  - Contact link: `text-sign-green` (clickable phone)

### Border Radius

- **Cards**: `rounded-sm` (0.125rem) - ONLY allowed value
- **Badges**: `rounded-sm` - consistent with site
- ❌ FORBIDDEN: rounded-md, rounded-lg, rounded-xl

### Reserve Now Button

- **Background**: `bg-sign-green` (green CTA)
- **Border Radius**: `rounded-sm` (consistent)
- **Hover**: `hover:bg-sign-green/90` (90% opacity)

---

## Common Usage Patterns

### Pattern 1: Full Campground Data

```typescript
campgrounds: [
  {
    type: 'Full-Service Campground',
    count: 100,
    description: 'All amenities: electric, water, sewer, bathhouse, WiFi, camp store.',
    link: 'https://www.recreation.gov/camping/...',
    contact: '(555) 123-4567',
    accessibility: '10 ADA sites with paved pads and accessible restrooms'
  }
]
```

### Pattern 2: Primitive Camping (No Reservations)

```typescript
campgrounds: [
  {
    type: 'Primitive Camping Area',
    count: 25,
    description: 'First-come, first-served. No hookups. Vault toilets available.',
    contact: 'Contact ranger station: (555) 987-6543'
    // No link - reservations not available
  }
]
```

### Pattern 3: No Campgrounds

```typescript
campgrounds: []  // Empty array - section hidden
```

---

## Change Log

**v1.0.0** (2025-12-29):

- Initial contract specification
- Direct pass-through pattern (no transformation)
- Uses existing CampingFacility type from SPEC-12
- 2-column responsive grid
- Security attributes for external links

---

## Contract Status

**Status**: ✅ **ACTIVE**
**Last Reviewed**: 2025-12-29
**Breaking Changes**: None expected (SPEC-12 type stable)
**Simplicity**: Easiest integration - direct pass-through, no transformation
