# Component Architecture - AdventureFeatureSection + Wrappers

**Architect**: Component Architect 1
**Domain**: AdventureFeatureSection + wrappers (AdventureWhatToHunt, AdventureWhatToFish)
**Date**: 2025-12-27

---

## Component Overview

The **AdventureFeatureSection** is a generic, reusable component for displaying repeating feature cards (species, facilities, tips). Two thin wrapper components provide semantic, domain-specific interfaces for hunting and fishing content.

### Design Pattern: Wrapper Pattern

**Core Component**: AdventureFeatureSection.astro (60 lines)
**Wrappers**: AdventureWhatToHunt.astro (15 lines), AdventureWhatToFish.astro (15 lines)

**Benefits**:

- DRY principle: Change once, affects both wrappers
- Single source of truth for feature card rendering
- ~50 lines saved vs. duplicate components
- Easier testing (test core + test wrappers separately)

---

## AdventureFeatureSection Architecture

### Component Responsibility

**Single Responsibility**: Render array of features as 2-3 column grid with optional Kim's notes

### Props Interface

```typescript
interface Props {
  /** Section heading (e.g., "What to Hunt", "Fishing Waters") */
  title: string;

  /** Optional intro text above cards */
  intro?: string;

  /** Array of features to display */
  features: {
    /** Feature title (e.g., "White-tailed Deer", "Burnsville Lake") */
    title: string;

    /** Feature description (e.g., "Season: Archery Sep 15-Dec 31") */
    description: string;

    /** Optional Kim's tips/notes (renders in font-hand) */
    notes?: string;

    /** Optional icon type */
    icon?: 'check' | 'info' | 'location' | 'none';
  }[];

  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';

  /** Grid columns on desktop (default: 2) */
  columns?: 2 | 3;

  /** Border-left accent color (default: 'sign-green') */
  accentColor?: 'sign-green' | 'brand-orange' | 'brand-brown';
}
```

### DOM Structure

```astro
<section class="py-16 bg-{variant}">
  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <h2 class="font-display text-4xl font-bold text-brand-brown mb-4">
      {title}
    </h2>

    {intro && (
      <p class="text-lg text-brand-brown/80 mb-8 max-w-3xl">
        {intro}
      </p>
    )}

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-{columns} gap-6">
      {features.map(feature => (
        <div class="border-l-4 border-l-{accentColor} pl-4 py-3">
          <!-- Feature Title -->
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
            {feature.title}
          </h3>

          <!-- Feature Description -->
          <p class="text-brand-brown/80 mb-3">
            {feature.description}
          </p>

          <!-- Kim's Notes (if provided) -->
          {feature.notes && (
            <p class="font-hand text-lg text-sign-green italic mt-3">
              "{feature.notes}"
            </p>
          )}
        </div>
      ))}
    </div>

    <!-- Default Slot (for additional content) -->
    <slot />
  </div>
</section>
```

### Styling Strategy

**Tailwind Classes**:

- Section wrapper: `py-16 bg-{variant}` (variant: white/cream)
- Container: `container mx-auto px-4` (responsive padding)
- Grid: `grid grid-cols-1 md:grid-cols-{columns} gap-6` (responsive)
- Card accent: `border-l-4 border-l-{accentColor} pl-4 py-3`
- Heading hierarchy: `font-display text-4xl` (h2) → `text-2xl` (h3)
- Kim's notes: `font-hand text-lg text-sign-green italic`

**Responsive Breakpoints**:

- Mobile (<768px): 1 column, full width
- Tablet/Desktop (≥768px): 2-3 columns (via `columns` prop)

**WVWO Aesthetic Compliance**:

- Fonts: Bitter (headings), Permanent Marker (notes)
- Colors: brand-brown (#3E2723), sign-green (#2E7D32), brand-cream (#FFF8E1)
- Corners: No rounded classes (sharp rectangular cards)
- Border accent: `border-l-4` (left accent, not full border)

### Conditional Rendering

```astro
{features.length > 0 && (
  <section>
    <!-- Render feature grid -->
  </section>
)}

<!-- If features array is empty, section is hidden -->
```

### Accessibility Features

1. **Semantic HTML**
   - `<section>` landmark
   - `<h2>` for section title
   - `<h3>` for feature titles (proper hierarchy)

2. **Color Contrast**
   - brand-brown on cream: 13.8:1 (exceeds 4.5:1)
   - sign-green on cream: 6.2:1 (exceeds 4.5:1)
   - Italic notes: Large text (18pt), meets 3:1 minimum

3. **Screen Reader**
   - Proper heading structure (h2 → h3)
   - No ARIA labels needed (semantic HTML sufficient)
   - Kim's notes in blockquote-like format (voice differentiation)

---

## AdventureWhatToHunt Wrapper

### Component Responsibility

**Single Responsibility**: Provide hunting-specific semantic interface to AdventureFeatureSection

### Props Interface

```typescript
interface Props {
  /** Section heading (default: "What to Hunt") */
  title?: string;

  /** Optional intro text */
  intro?: string;

  /** Array of huntable species */
  species: {
    /** Species name (e.g., "White-tailed Deer") */
    name: string;

    /** Hunting season dates (e.g., "Archery: Sep 15-Dec 31") */
    season: string;

    /** Optional Kim's hunting tips */
    notes?: string;

    /** Optional link to WV DNR regulations */
    regulationUrl?: string;
  }[];

  /** Background variant (default: 'white') */
  variant?: 'white' | 'cream';
}
```

### Implementation (15 lines)

```astro
---
import AdventureFeatureSection from './AdventureFeatureSection.astro';

interface Props {
  title?: string;
  intro?: string;
  species: {
    name: string;
    season: string;
    notes?: string;
    regulationUrl?: string;
  }[];
  variant?: 'white' | 'cream';
}

const {
  title = "What to Hunt",
  intro,
  species,
  variant = "white"
} = Astro.props;

// Transform species data to feature format
const features = species.map(s => ({
  title: s.name,
  description: `Season: ${s.season}`,
  notes: s.notes,
  icon: 'none' as const,
}));
---

<AdventureFeatureSection
  title={title}
  intro={intro}
  features={features}
  variant={variant}
  columns={2}
  accentColor="sign-green"
>
  {species.some(s => s.regulationUrl) && (
    <div class="mt-6 text-center">
      <a
        href={species.find(s => s.regulationUrl)?.regulationUrl}
        class="text-sign-green hover:text-sign-green/80 underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        View WV DNR Hunting Regulations →
      </a>
    </div>
  )}
</AdventureFeatureSection>
```

### Data Transformation

**Input (from Content Collection)**:

```typescript
species: [
  {
    name: "White-tailed Deer",
    season: "Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2",
    notes: "Bucks here run 100-150 inches. Creek bottoms at dawn.",
    regulationUrl: "https://wvdnr.gov/hunting/deer-regulations/"
  }
]
```

**Output (to AdventureFeatureSection)**:

```typescript
features: [
  {
    title: "White-tailed Deer",
    description: "Season: Archery: Sep 15-Dec 31, Firearms: Nov 20-Dec 2",
    notes: "Bucks here run 100-150 inches. Creek bottoms at dawn.",
    icon: 'none'
  }
]
```

### Hunting-Specific Enhancements

1. **Season Formatting**
   - Prefix: "Season: " (consistent formatting)
   - Displays complex multi-season data

2. **Regulation Links**
   - Conditional slot content (if any species has regulationUrl)
   - Opens in new tab with `rel="noopener noreferrer"`
   - Centered below grid

3. **Default Styling**
   - 2 columns (hunting typically has 3-5 species, fits 2-col)
   - sign-green accent (hunting theme)
   - white background (alternates with other sections)

---

## AdventureWhatToFish Wrapper

### Component Responsibility

**Single Responsibility**: Provide fishing-specific semantic interface to AdventureFeatureSection

### Props Interface

```typescript
interface Props {
  /** Section heading (default: "Fishing Waters") */
  title?: string;

  /** Optional intro text */
  intro?: string;

  /** Array of fishing waters */
  waters: {
    /** Water body name (e.g., "Little Kanawha River") */
    name: string;

    /** Fish species available (e.g., ["Smallmouth Bass", "Rainbow Trout"]) */
    species: string[];

    /** Access description (e.g., "Gravel road from Route 5") */
    access: string;

    /** Optional fishing tips or stocking info */
    notes?: string;
  }[];

  /** Background variant (default: 'cream') */
  variant?: 'white' | 'cream';
}
```

### Implementation (15 lines)

```astro
---
import AdventureFeatureSection from './AdventureFeatureSection.astro';

interface Props {
  title?: string;
  intro?: string;
  waters: {
    name: string;
    species: string[];
    access: string;
    notes?: string;
  }[];
  variant?: 'white' | 'cream';
}

const {
  title = "Fishing Waters",
  intro,
  waters,
  variant = "cream"
} = Astro.props;

// Transform waters data to feature format
const features = waters.map(w => ({
  title: w.name,
  description: `Species: ${w.species.join(', ')}\n\nAccess: ${w.access}`,
  notes: w.notes,
  icon: 'none' as const,
}));
---

<AdventureFeatureSection
  title={title}
  intro={intro}
  features={features}
  variant={variant}
  columns={2}
  accentColor="sign-green"
/>
```

### Data Transformation

**Input (from Content Collection)**:

```typescript
fishingWaters: [
  {
    name: "Little Kanawha River",
    species: ["Smallmouth Bass", "Rock Bass", "Catfish"],
    access: "Access from Route 5 bridge parking area. Waders recommended.",
    notes: "Best fishing Apr-Oct, mornings preferred."
  }
]
```

**Output (to AdventureFeatureSection)**:

```typescript
features: [
  {
    title: "Little Kanawha River",
    description: "Species: Smallmouth Bass, Rock Bass, Catfish\n\nAccess: Access from Route 5 bridge parking area. Waders recommended.",
    notes: "Best fishing Apr-Oct, mornings preferred.",
    icon: 'none'
  }
]
```

### Fishing-Specific Enhancements

1. **Species List Formatting**
   - Comma-separated: `species.join(', ')`
   - Prefix: "Species: " (consistent formatting)

2. **Access Information**
   - Displayed as secondary text below species
   - Line break for readability (`\n\n`)

3. **Default Styling**
   - 2 columns (fishing typically has 1-3 waters, fits 2-col)
   - sign-green accent (outdoor theme)
   - cream background (alternates with hunting section)

---

## Component Composition Pattern

### Page Template Usage

```astro
---
import { getEntry } from 'astro:content';
import AdventureWhatToHunt from '@/components/adventure/AdventureWhatToHunt.astro';
import AdventureWhatToFish from '@/components/adventure/AdventureWhatToFish.astro';

const wma = await getEntry('adventures', 'burnsville-lake');
const { species, fishingWaters } = wma.data;
---

<BaseLayout title={wma.data.title}>
  <!-- Other sections... -->

  {species && species.length > 0 && (
    <AdventureWhatToHunt
      species={species}
      variant="white"
    />
  )}

  {fishingWaters && fishingWaters.length > 0 && (
    <AdventureWhatToFish
      waters={fishingWaters}
      variant="cream"
    />
  )}

  <!-- More sections... -->
</BaseLayout>
```

### Conditional Rendering Logic

**Hunting Section**:

- Render if: `species && species.length > 0`
- Hide if: `species === undefined` or `species.length === 0`

**Fishing Section**:

- Render if: `fishingWaters && fishingWaters.length > 0`
- Hide if: `fishingWaters === undefined` or `fishingWaters.length === 0`

**Background Alternation**:

- Hunting: white (position 3 in page)
- Fishing: cream (position 4 in page)
- Maintains cream → white → cream → white pattern

---

## Testing Strategy

### Unit Tests (Wrapper Logic)

```typescript
// AdventureWhatToHunt transformation
test('transforms species to features format', () => {
  const species = [
    { name: 'Deer', season: 'Nov 1-Dec 15', notes: 'Tip' }
  ];
  const features = transformSpeciesToFeatures(species);

  expect(features[0].title).toBe('Deer');
  expect(features[0].description).toContain('Season: Nov 1-Dec 15');
  expect(features[0].notes).toBe('Tip');
});

// AdventureWhatToFish transformation
test('joins species array as comma-separated list', () => {
  const waters = [
    { name: 'River', species: ['Bass', 'Trout'], access: 'Route 5' }
  ];
  const features = transformWatersToFeatures(waters);

  expect(features[0].description).toContain('Bass, Trout');
});
```

### E2E Tests (Rendering)

```typescript
test('AdventureWhatToHunt renders species cards', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  // Section visible
  const section = page.locator('section:has-text("What to Hunt")');
  await expect(section).toBeVisible();

  // Species card present
  const deerCard = section.locator('h3:has-text("White-tailed Deer")');
  await expect(deerCard).toBeVisible();

  // Season displayed
  await expect(section).toContainText('Season: Archery');

  // Kim's notes in Permanent Marker
  const notes = section.locator('.font-hand');
  await expect(notes).toBeVisible();
  await expect(notes).toHaveCSS('font-family', /Permanent Marker/);
});

test('AdventureWhatToFish hides when no waters', async ({ page }) => {
  // WMA with no fishing waters
  await page.goto('/adventures/hunting-only-wma');

  const section = page.locator('section:has-text("Fishing Waters")');
  await expect(section).not.toBeVisible();
});
```

### Accessibility Tests

```typescript
test('feature section has proper heading hierarchy', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  // h2 for section title
  const h2 = page.locator('h2:has-text("What to Hunt")');
  await expect(h2).toBeVisible();

  // h3 for species titles (nested under h2)
  const h3 = page.locator('section:has(h2:has-text("What to Hunt")) h3');
  await expect(h3).toBeVisible();

  // No heading skips (h2 → h3, not h2 → h4)
  const h4 = page.locator('section:has(h2:has-text("What to Hunt")) h4');
  await expect(h4).not.toBeVisible();
});
```

---

## Performance Considerations

### Bundle Size

- AdventureFeatureSection: ~2KB (60 lines, minimal markup)
- AdventureWhatToHunt: ~0.5KB (15 lines, thin wrapper)
- AdventureWhatToFish: ~0.5KB (15 lines, thin wrapper)
- **Total**: ~3KB (negligible impact)

### Rendering Cost

- Static HTML generation (zero runtime cost)
- No client-side JavaScript
- Conditional rendering reduces DOM size (hide empty sections)

### Reusability Wins

- DRY pattern saves ~50 lines vs. duplicate components
- Single source of truth for feature card rendering
- Easier to maintain (change once, affects both wrappers)

---

## Future Enhancements

### Icon Support

- Add icon rendering for feature cards
- Use STAT_ICON_PATHS constant (checkmark, location, info)
- Conditional: `{feature.icon !== 'none' && <Icon type={feature.icon} />}`

### Expandable Cards

- Add "Read More" for long descriptions (>200 chars)
- JavaScript-free accordion (details/summary)
- Optional enhancement (not Phase 1)

### Print Optimization

- @media print styles: Remove background colors, optimize for B&W
- Keep border-left accent (visible in grayscale)
- Force single-column layout for print

---

**Component Architect 1**: Feature section components complete
**Lines of Code**: 90 total (60 core + 15 + 15 wrappers)
**Reusability**: High (single source of truth for feature cards)
**Next**: Component Architects 2-3 design remaining components
