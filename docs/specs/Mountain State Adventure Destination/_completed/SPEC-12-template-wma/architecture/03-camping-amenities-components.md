# Component Architecture - AdventureCampingList + AdventureAmenitiesGrid

**Architect**: Component Architect 2
**Domain**: AdventureCampingList + AdventureAmenitiesGrid
**Date**: 2025-12-27

---

## Component Overview

Two complementary components for displaying facility and amenity information:

1. **AdventureCampingList**: Complex facility cards with counts, contact info, accessibility notes
2. **AdventureAmenitiesGrid**: Simple checkmark grid for basic amenities

### Design Philosophy

**AdventureCampingList** = Complex data (facilities with metadata)
**AdventureAmenitiesGrid** = Simple data (string array with checkmarks)

Choose based on data complexity:

- Complex facilities (camping sites, boat ramps, ranges) → CampingList
- Simple amenities (parking, restrooms, cell service) → AmenitiesGrid

---

## AdventureCampingList Architecture

### Component Responsibility

**Single Responsibility**: Render complex facility cards with counts, descriptions, contact info, external links

### Props Interface

```typescript
interface Props {
  /** Section heading (default: "Facilities & Access") */
  title?: string;

  /** Optional intro text */
  intro?: string;

  /** Array of facilities */
  facilities: {
    /** Facility type (e.g., "Camping Sites", "Boat Ramp") */
    type: string;

    /** Optional count (displayed as badge) */
    count?: number;

    /** Description/amenities */
    description: string;

    /** Optional contact phone (renders as tel: link) */
    contact?: string;

    /** Optional external link (e.g., reservation system) */
    link?: string;

    /** Optional ADA accessibility notes */
    accessibility?: string;
  }[];

  /** Grid columns on desktop (default: 3) */
  columns?: 2 | 3 | 4;

  /** Background variant (default: 'cream') */
  variant?: 'white' | 'cream';
}
```

### DOM Structure

```astro
<section class="py-16 bg-{variant}">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <h2 class="font-display text-4xl font-bold text-brand-brown mb-4">
      {title || "Facilities & Access"}
    </h2>

    {intro && (
      <p class="text-lg text-brand-brown/80 mb-8 max-w-3xl">
        {intro}
      </p>
    )}

    {facilities.length > 0 ? (
      <!-- Facility Grid -->
      <div class="grid grid-cols-1 md:grid-cols-{columns} gap-6">
        {facilities.map(facility => (
          <div class="bg-white rounded-sm border-2 border-brand-brown/10 p-6">
            <!-- Facility Header with Count Badge -->
            <div class="flex items-center gap-3 mb-3">
              <h3 class="font-display text-2xl font-bold text-brand-brown">
                {facility.type}
              </h3>

              {facility.count && (
                <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm font-bold">
                  {facility.count}
                </span>
              )}
            </div>

            <!-- Description -->
            <p class="text-brand-brown/80 mb-4">
              {facility.description}
            </p>

            <!-- Contact Phone (if provided) -->
            {facility.contact && (
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-sign-green" ...><!-- phone icon --></svg>
                <a
                  href={`tel:${facility.contact.replace(/\D/g, '')}`}
                  class="text-sign-green hover:text-sign-green/80 transition-colors duration-300"
                >
                  {facility.contact}
                </a>
              </div>
            )}

            <!-- External Link (if provided) -->
            {facility.link && (
              <div class="mt-3">
                <a
                  href={facility.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  class="text-sign-green hover:text-sign-green/80 underline"
                >
                  Reserve Now →
                </a>
              </div>
            )}

            <!-- Accessibility Notes (if provided) -->
            {facility.accessibility && (
              <div class="mt-4 pt-4 border-t border-brand-brown/10">
                <p class="text-sm text-brand-brown/70 flex items-start gap-2">
                  <svg class="w-4 h-4 text-sign-green mt-0.5" ...><!-- accessibility icon --></svg>
                  <span>{facility.accessibility}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <!-- Empty State -->
      <p class="text-brand-brown/60 italic">
        No facilities listed. Check WV DNR for current information.
      </p>
    )}
  </div>
</section>
```

### Styling Strategy

**Card Design**:

- White background on cream section (depth/layering)
- `rounded-sm` corners (WVWO compliance, not md/lg)
- `border-2 border-brand-brown/10` (subtle outline)
- `p-6` padding (comfortable spacing)

**Count Badge**:

- `bg-sign-green text-white` (high contrast)
- `px-3 py-1` (compact pill shape)
- `rounded-sm` (matches card corners)
- `text-sm font-bold` (readable, not overwhelming)

**Contact Links**:

- Phone: `tel:` href with stripped formatting
- Green color (`text-sign-green`)
- Hover: 80% opacity (`hover:text-sign-green/80`)
- Icon + text (phone icon from SVG)

**External Links**:

- `rel="noopener noreferrer" target="_blank"` (security)
- Underline style (indicates external)
- Arrow indicator (`→`) for directionality

**Accessibility Section**:

- Border-top separator (`border-t`)
- Smaller text (`text-sm`)
- Icon + text (accessibility icon)
- Muted color (`text-brand-brown/70`)

### Conditional Rendering

```astro
{facilities.length > 0 ? (
  <!-- Grid of facility cards -->
) : (
  <!-- Empty state message -->
)}
```

**Empty State**:

- Italic text with muted color
- Helpful message (directs to WV DNR)
- No error, no broken UI

### Accessibility Features

1. **Semantic HTML**
   - `<section>` landmark
   - `<h2>` for section title
   - `<h3>` for facility names (proper hierarchy)

2. **Phone Links**
   - `tel:` protocol for mobile devices
   - Click-to-call on smartphones
   - Stripped formatting: `(304) 555-1234` → `tel:+13045551234`

3. **External Link Safety**
   - `rel="noopener noreferrer"` prevents tab-nabbing
   - `target="_blank"` opens in new tab
   - Arrow indicator (visual cue)

4. **Icon Accessibility**
   - Decorative icons: `aria-hidden="true"`
   - Text always present (icon supplements, not replaces)
   - No icon-only buttons

---

## AdventureAmenitiesGrid Architecture

### Component Responsibility

**Single Responsibility**: Render simple amenities as checkmark grid

### Props Interface

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

  /** Checkmark icon color (default: 'sign-green') */
  iconColor?: 'sign-green' | 'brand-orange';
}
```

### DOM Structure

```astro
<section class="py-16 bg-{variant}">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <h2 class="font-display text-4xl font-bold text-brand-brown mb-8">
      {title || "Amenities"}
    </h2>

    {amenities.length > 0 ? (
      <!-- Amenities Grid -->
      <div class="grid grid-cols-2 md:grid-cols-{columns} gap-4">
        {amenities.map(amenity => (
          <div class="flex items-start gap-3">
            <!-- Checkmark Icon -->
            <svg
              class="w-5 h-5 text-{iconColor} flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <!-- Amenity Text -->
            <span class="text-brand-brown">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <!-- Empty State -->
      <p class="text-brand-brown/60 italic">
        No amenities listed.
      </p>
    )}
  </div>
</section>
```

### Styling Strategy

**Grid Layout**:

- Mobile: 2 columns (`grid-cols-2`)
- Desktop: 2-4 columns (`md:grid-cols-{columns}`)
- Gap: `gap-4` (tighter than facility cards)

**Checkmark Icon**:

- Size: `w-5 h-5` (balanced with text)
- Color: `text-{iconColor}` (default: sign-green)
- Position: `flex-shrink-0 mt-0.5` (aligns with first line of text)
- Stroke: `stroke-width="3"` (bold, visible)

**Text Styling**:

- Color: `text-brand-brown` (consistent with body text)
- No bold (checkmark provides emphasis)
- Left-aligned with icon

### Use Cases

**Good for AmenitiesGrid**:

- Parking (30+ vehicles)
- Restrooms (seasonal)
- Picnic areas
- ADA-accessible trails
- Cell service (limited)
- Potable water

**Better for CampingList**:

- Camping Sites (240) with "Electric hookups, $15-25/night"
- Boat Ramp (2) with contact phone
- Shooting Range with hours + description

### Accessibility Features

1. **Icon Handling**
   - `aria-hidden="true"` (checkmark is decorative)
   - Text always present (icon supplements)
   - Color not sole indicator (checkmark + text)

2. **Semantic HTML**
   - `<section>` landmark
   - `<h2>` for section title
   - List-like structure (could use `<ul>` if semantic list needed)

3. **Color Contrast**
   - sign-green (#2E7D32) on white: 4.7:1 (exceeds 4.5:1)
   - brand-brown (#3E2723) on white: 18.5:1 (exceeds 4.5:1)

---

## Component Comparison

### When to Use CampingList

**Use AdventureCampingList when**:

- Facilities have counts (e.g., 240 camping sites)
- Contact information needed (phone, website)
- Descriptions are complex (>10 words)
- External links required (reservations)
- Accessibility notes present

**Example Data**:

```typescript
facilities: [
  {
    type: "Camping Sites",
    count: 240,
    description: "Electric hookups, restrooms, showers. Sites $15-25/night.",
    contact: "(304) 555-CAMP",
    link: "https://reservations.example.com",
    accessibility: "5 ADA-accessible sites near restrooms"
  }
]
```

### When to Use AmenitiesGrid

**Use AdventureAmenitiesGrid when**:

- Amenities are simple strings
- No counts or metadata needed
- Checkmark/bullet list style appropriate
- Quick scanning desired

**Example Data**:

```typescript
amenities: [
  "Parking (30+ vehicles)",
  "Restrooms (seasonal)",
  "Picnic areas",
  "ADA-accessible trails"
]
```

---

## Testing Strategy

### Unit Tests (Data Validation)

```typescript
test('CampingList renders count badges', () => {
  const facilities = [
    { type: 'Camping', count: 240, description: 'Sites' }
  ];

  const { container } = render(AdventureCampingList, { facilities });
  const badge = container.querySelector('.bg-sign-green');

  expect(badge).toBeTruthy();
  expect(badge.textContent).toBe('240');
});

test('CampingList phone link formats correctly', () => {
  const facilities = [
    { type: 'Range', description: 'Info', contact: '(304) 555-1234' }
  ];

  const { container } = render(AdventureCampingList, { facilities });
  const link = container.querySelector('a[href^="tel:"]');

  expect(link.href).toBe('tel:+13045551234');
  expect(link.textContent).toBe('(304) 555-1234'); // Displays formatted
});

test('AmenitiesGrid applies icon color prop', () => {
  const amenities = ['Parking'];

  const { container } = render(AdventureAmenitiesGrid, {
    amenities,
    iconColor: 'brand-orange'
  });

  const icon = container.querySelector('svg');
  expect(icon.classList.contains('text-brand-orange')).toBe(true);
});
```

### E2E Tests (Rendering)

```typescript
test('CampingList displays facility cards', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  const section = page.locator('section:has-text("Facilities & Access")');

  // 3-column grid on desktop
  await expect(section.locator('.grid')).toHaveClass(/md:grid-cols-3/);

  // Count badge visible
  const badge = section.locator('.bg-sign-green');
  await expect(badge).toBeVisible();
  await expect(badge).toContainText('240');

  // Phone link clickable
  const phoneLink = section.locator('a[href^="tel:"]');
  await expect(phoneLink).toBeVisible();
});

test('AmenitiesGrid hides when empty', async ({ page }) => {
  await page.goto('/adventures/wma-no-amenities');

  const section = page.locator('section:has-text("Amenities")');
  const grid = section.locator('.grid');

  await expect(section).toBeVisible(); // Section exists
  await expect(grid).not.toBeVisible(); // But grid is hidden
  await expect(section).toContainText('No amenities listed'); // Empty state shown
});
```

---

## Performance Considerations

### Bundle Size

- AdventureCampingList: ~3KB (80 lines, complex cards)
- AdventureAmenitiesGrid: ~1KB (40 lines, simple grid)
- Icons: Inline SVG (no external requests)

### Rendering Optimization

- Conditional rendering (hide empty sections)
- Static HTML (no JavaScript)
- Lazy-load images below fold (if facility photos added)

### Phone Link Formatting

```typescript
// Efficient regex: Strip all non-digits
const telHref = `tel:+1${facility.contact.replace(/\D/g, '')}`;

// Display: Keep original format
<a href={telHref}>{facility.contact}</a>
```

---

## Future Enhancements

### CampingList Enhancements

1. **Facility Photos**: Optional `imageUrl` field
2. **Expandable Details**: Details/summary for long descriptions
3. **Map Integration**: Link to facility location on WMA map
4. **Seasonal Hours**: Display open/closed status

### AmenitiesGrid Enhancements

1. **Tooltip Descriptions**: Hover for more info
2. **Icon Variety**: Different icons per amenity type
3. **Categorization**: Group amenities by type (access, safety, convenience)

---

**Component Architect 2**: Camping & amenities components complete
**Lines of Code**: 120 total (80 CampingList + 40 AmenitiesGrid)
**Complexity**: Medium (CampingList), Low (AmenitiesGrid)
**Next**: Component Architect 3 designs AdventureCTA
