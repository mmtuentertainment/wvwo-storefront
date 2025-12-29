# Contract: LakeTemplate Custom HTML Sections

**Purpose**: Define structure, styling, and data usage for 5 custom-built sections
**Integration Type**: Inline HTML/Astro in LakeTemplate.astro (no external components)

---

## Overview

These sections are **NOT reusable components** - they are custom HTML blocks built directly into Lake Template for lake-specific content that doesn't fit existing SPEC-11 components.

### Custom Sections

1. **Hero Section** - Lake name, stats overlay, quick highlights
2. **Where to Fish Section** - Fishing spots with depth/structure/species
3. **Marina Section** - Boat access, services, rentals, hours, contact
4. **Seasonal Guide Section** - Spring/Summer/Fall/Winter breakdown
5. **Safety & Regulations Section** - Rules by category with orange accents

**Total**: ~440 lines of custom HTML across 5 sections

---

## Section 1: Hero Section (~50 lines)

### Purpose

Display lake name, key statistics, and quick highlights in visually striking hero image with overlay.

### Props Used

```typescript
{
  name: string;              // "Summersville Lake"
  heroImage: string;         // "/images/summersville-lake-hero.jpg"
  acreage: number;           // 2790
  maxDepth: number;          // 327
  county: string;            // "Nicholas"
  quickHighlights: string[]; // ["Crystal clear water", "Premier fishing", ...]
}
```

### Structure

```astro
<!-- Hero Section -->
<section class="relative h-[70vh] min-h-[500px]">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img
      src={heroImage}
      alt={`${name} aerial view`}
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-brand-brown/40 to-transparent"></div>
  </div>

  <!-- Content Overlay -->
  <div class="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
    <!-- Lake Name -->
    <h1 class="font-display font-black text-4xl md:text-6xl text-white mb-6 drop-shadow-lg">
      {name}
    </h1>

    <!-- Stats Grid (4 columns desktop, 2 mobile) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white/90 p-4 rounded-sm">
        <div class="font-display text-3xl font-bold text-brand-brown">
          {acreage.toLocaleString()}
        </div>
        <div class="text-sm text-brand-brown/75 uppercase tracking-wide">
          Acres
        </div>
      </div>

      <div class="bg-white/90 p-4 rounded-sm">
        <div class="font-display text-3xl font-bold text-brand-brown">
          {maxDepth} ft
        </div>
        <div class="text-sm text-brand-brown/75 uppercase tracking-wide">
          Max Depth
        </div>
      </div>

      <div class="bg-white/90 backdrop-blur-sm p-4 rounded-sm col-span-2">
        <div class="font-display text-2xl font-bold text-brand-brown">
          {county} County
        </div>
        <div class="text-sm text-brand-brown/75 uppercase tracking-wide">
          Location
        </div>
      </div>
    </div>

    <!-- Quick Highlights Badges -->
    {quickHighlights.length > 0 && (
      <div class="flex flex-wrap gap-2">
        {quickHighlights.map((highlight) => (
          <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm font-semibold">
            {highlight}
          </span>
        ))}
      </div>
    )}
  </div>
</section>
```

### WVWO Compliance

- ✅ `rounded-sm` ONLY (stat cards, badges)
- ✅ `font-display` for lake name and stats
- ✅ `bg-sign-green` for highlight badges
- ✅ Responsive grid: 2-col mobile, 4-col desktop

### Validation

- `heroImage`: Must exist at path (build warning if missing)
- `quickHighlights`: Can be empty array (section hides gracefully)
- `acreage`: Formatted with comma separator (2,790)

---

## Section 2: Where to Fish (~80 lines)

### Purpose

Display named fishing spots with depth, structure, target species, and access information.

### Props Used

```typescript
{
  fishingSpots: Array<{
    name: string;          // "Long Point Cliff"
    depth: string;         // "40-60 feet"
    structure: string;     // "Rocky ledges, boulders"
    species: string[];     // ["Smallmouth Bass", "Walleye"]
    access: string;        // "Boat only, 2 miles from ramp"
  }>
}
```

### Structure

```astro
<!-- Where to Fish Section -->
{fishingSpots.length > 0 && (
  <section class="py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-4">
        Where to Fish
      </h2>
      <p class="text-lg text-brand-brown/75 mb-12 max-w-3xl">
        Prime fishing locations with detailed structure, depth, and target species information.
      </p>

      <div class="space-y-6">
        {fishingSpots.map((spot) => (
          <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
              {spot.name}
            </h3>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Location Details Column -->
              <div class="space-y-2">
                <p class="text-brand-brown">
                  <strong class="font-semibold">Depth:</strong> {spot.depth}
                </p>
                <p class="text-brand-brown">
                  <strong class="font-semibold">Structure:</strong> {spot.structure}
                </p>
                <p class="text-brand-brown">
                  <strong class="font-semibold">Access:</strong> {spot.access}
                </p>
              </div>

              <!-- Target Species Column -->
              <div>
                <p class="font-semibold text-brand-brown mb-2">Target Species:</p>
                <div class="flex flex-wrap gap-2">
                  {spot.species.map((speciesName) => (
                    <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm">
                      {speciesName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

### WVWO Compliance

- ✅ `border-l-4 border-l-brand-brown` (brown accent for spots)
- ✅ `rounded-sm` ONLY (cards, species badges)
- ✅ `font-display` for spot names
- ✅ `bg-sign-green` for species badges
- ✅ Full-width stacked cards (not grid)

### Validation

- `fishingSpots`: Max 15 items (NFR-009)
- `species` array: Min 1 species required per spot
- Empty `fishingSpots` array: Section hidden

---

## Section 3: Marina (~100 lines)

### Purpose

Display marina services, boat launch details, rentals, hours, and contact information.

### Props Used

```typescript
{
  marina: {
    name: string;              // "Summersville Lake Marina"
    services: string[];        // ["Fuel", "Bait & tackle", "Ice"]
    boatLaunch: {
      ramps: number;           // 3
      fee?: string;            // "$5"
    };
    rentals?: string[];        // ["Kayaks", "Pontoon boats"]
    hours: string;             // "7am-8pm daily (May-Oct)"
    contact: string;           // "(304) 872-3773"
  }
}
```

### Structure

```astro
<!-- Marina & Boat Access Section -->
{marina && (
  <section class="py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-12">
        Marina & Boat Access
      </h2>

      <div class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm shadow-sm">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6">
          {marina.name}
        </h3>

        <div class="grid md:grid-cols-2 gap-8 mb-6">
          <!-- Services Column -->
          <div>
            <h4 class="font-display text-xl font-bold text-brand-brown mb-4">
              Services Available
            </h4>
            <ul class="space-y-2">
              {marina.services.map((service) => (
                <li class="flex items-start gap-2">
                  <span class="text-sign-green mt-1">✓</span>
                  <span class="text-brand-brown">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <!-- Boat Launch Column -->
          <div>
            <h4 class="font-display text-xl font-bold text-brand-brown mb-4">
              Boat Launch
            </h4>
            <div class="space-y-2">
              <p class="text-brand-brown">
                <strong class="font-semibold">Ramps:</strong> {marina.boatLaunch.ramps} {marina.boatLaunch.ramps === 1 ? 'ramp' : 'ramps'}
              </p>
              {marina.boatLaunch.fee && (
                <p class="text-brand-brown">
                  <strong class="font-semibold">Fee:</strong> {marina.boatLaunch.fee}
                </p>
              )}
            </div>

            {marina.rentals && marina.rentals.length > 0 && (
              <div class="mt-4">
                <h4 class="font-display text-lg font-bold text-brand-brown mb-2">
                  Rentals
                </h4>
                <ul class="space-y-1">
                  {marina.rentals.map((rental) => (
                    <li class="text-brand-brown">• {rental}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <!-- Hours & Contact -->
        <div class="pt-6 border-t border-brand-brown/20">
          <div class="grid md:grid-cols-2 gap-4">
            <p class="text-brand-brown">
              <strong class="font-semibold">Hours:</strong> {marina.hours}
            </p>
            <p class="text-brand-brown">
              <strong class="font-semibold">Contact:</strong>
              <a
                href={`tel:${marina.contact.replace(/[^0-9]/g, '')}`}
                class="text-sign-green hover:underline"
              >
                {marina.contact}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)}
```

### WVWO Compliance

- ✅ `border-l-4 border-l-brand-brown` (brown accent for marina)
- ✅ `rounded-sm` ONLY
- ✅ `font-display` for marina name and headings
- ✅ Clickable `tel:` link for contact phone

### Validation

- `marina`: Required (every lake must have boat access)
- `services`: Min 1 service required
- `boatLaunch.ramps`: Min 1 required
- `rentals`: Optional array

---

## Section 4: Seasonal Guide (~80 lines)

### Purpose

Display season-by-season breakdown (Spring/Summer/Fall/Winter) with activity highlights and fishing focus.

### Props Used

```typescript
{
  seasonalGuide: Array<{
    season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
    highlights: string[];          // Min 1 highlight
    fishingFocus?: string;         // Optional fishing notes
  }>
}
```

### Structure

```astro
<!-- Seasonal Guide Section -->
{seasonalGuide.length > 0 && (
  <section class="py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-4">
        Seasonal Guide
      </h2>
      <p class="text-lg text-brand-brown/75 mb-12 max-w-3xl">
        Plan your visit based on the season. Each time of year offers unique opportunities.
      </p>

      <div class="grid md:grid-cols-2 gap-6">
        {seasonalGuide.map((season) => (
          <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
              {season.season}
            </h3>

            <ul class="space-y-2 mb-4">
              {season.highlights.map((highlight) => (
                <li class="flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span class="text-brand-brown">{highlight}</span>
                </li>
              ))}
            </ul>

            {season.fishingFocus && (
              <div class="pt-4 border-t border-brand-brown/10">
                <p class="font-semibold text-brand-brown mb-2">🎣 Fishing Focus:</p>
                <p class="text-brand-brown/90 text-sm">{season.fishingFocus}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

### WVWO Compliance

- ✅ `bg-brand-cream` background for season cards
- ✅ `border-l-4 border-l-sign-green` (green accent for outdoor theme)
- ✅ `rounded-sm` ONLY
- ✅ `font-display` for season names
- ✅ 2-column grid (2 seasons per row)

### Validation

- `seasonalGuide`: Can be empty (section hidden)
- Recommended: Provide all 4 seasons for completeness
- `highlights`: Min 1 highlight per season
- `fishingFocus`: Optional

---

## Section 5: Safety & Regulations (~70 lines)

### Purpose

Display safety rules and regulations organized by category with orange warning accents.

### Props Used

```typescript
{
  regulations: Array<{
    category: string;      // "Walleye Regulations"
    rules: string[];       // Min 1 rule
  }>
}
```

### Structure

```astro
<!-- Safety & Regulations Section -->
{regulations.length > 0 && (
  <section class="py-12 md:py-16 bg-brand-cream">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-4">
        Safety & Regulations
      </h2>
      <p class="text-lg text-brand-brown/75 mb-12 max-w-3xl">
        Important rules and safety information. Please review before your visit.
      </p>

      <div class="space-y-6">
        {regulations.map((reg) => (
          <div class="bg-white border-l-4 border-l-brand-orange p-6 rounded-sm">
            <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
              {reg.category}
            </h3>

            <ul class="space-y-2">
              {reg.rules.map((rule) => (
                <li class="flex items-start gap-2">
                  <span class="text-brand-orange mt-1 flex-shrink-0">⚠</span>
                  <span class="text-brand-brown">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div class="mt-8 p-6 bg-white border-l-4 border-l-brand-orange rounded-sm">
        <p class="text-brand-brown">
          <strong class="font-semibold">Note:</strong> Regulations subject to change.
          Always check with <a href="https://wvdnr.gov" target="_blank" rel="noopener noreferrer" class="text-sign-green hover:underline">WV DNR</a> for current rules before your visit.
        </p>
      </div>
    </div>
  </section>
)}
```

### WVWO Compliance

- ✅ `border-l-4 border-l-brand-orange` (ORANGE accent for warnings)
- ✅ Orange icon (⚠) for each rule
- ✅ `rounded-sm` ONLY
- ✅ `font-display` for category headings
- ✅ Orange usage <5% of screen (safety section only)

### Validation

- `regulations`: Min 1 category required
- `rules`: Min 1 rule per category
- Orange color reserved for safety/regulations ONLY

---

## Common Styling Patterns

### Responsive Padding

```css
py-12 md:py-16        /* Section vertical padding */
px-4                  /* Container horizontal padding */
mb-4 md:mb-6          /* Section header margin */
gap-6                 /* Grid gap */
space-y-6             /* Stacked card spacing */
```

### Typography Scale

```css
/* Section Headings */
text-4xl md:text-5xl  /* Section h2 */
text-2xl md:text-3xl  /* Subsection h3 */
text-xl               /* Sub-subsection h4 */

/* Body Text */
text-lg               /* Intro paragraphs */
text-base             /* Default body */
text-sm               /* Metadata, labels */
```

### Border-Left Accent System

```css
border-l-4 border-l-sign-green    /* Fishing species, seasonal guide */
border-l-4 border-l-brand-brown   /* Fishing spots, marina */
border-l-4 border-l-brand-orange  /* Safety, regulations */
```

### Color Opacity Pattern

```css
text-brand-brown       /* 100% - headings */
text-brand-brown/75    /* 75% - intro text */
text-brand-brown/60    /* 60% - metadata */
text-brand-brown/20    /* 20% - borders */
```

---

## Testing Custom Sections

### Visual Regression

```typescript
it('hero section renders with lake name and stats', async () => {
  const { container } = render(LakeTemplate, { props: lakeData });

  const lakeName = container.querySelector('h1.font-display');
  expect(lakeName).toHaveTextContent('Summersville Lake');

  const acreageStat = container.querySelector('[data-testid="acreage-stat"]');
  expect(acreageStat).toHaveTextContent('2,790');
});
```

### Responsive Layout

```typescript
it('hero stats grid uses 2 columns on mobile, 4 on desktop', async () => {
  const { container } = render(LakeTemplate, { props: lakeData });

  const statsGrid = container.querySelector('[data-section="hero-stats"]');
  expect(statsGrid).toHaveClass('grid-cols-2 md:grid-cols-4');
});
```

### WVWO Compliance

```typescript
it('custom sections use ONLY rounded-sm border radius', () => {
  const templateContent = readFileSync('./LakeTemplate.astro', 'utf-8');

  // Check custom sections (lines 200-640)
  const customSectionsContent = templateContent.substring(5000, 20000);

  expect(customSectionsContent).not.toMatch(/rounded-md/);
  expect(customSectionsContent).not.toMatch(/rounded-lg/);
  expect(customSectionsContent).not.toMatch(/rounded-xl/);
});

it('uses correct border-left accent colors', () => {
  const templateContent = readFileSync('./LakeTemplate.astro', 'utf-8');

  // Fishing spots: brown
  expect(templateContent).toMatch(/border-l-brand-brown.*Where to Fish/);

  // Marina: brown
  expect(templateContent).toMatch(/border-l-brand-brown.*Marina/);

  // Seasonal: green
  expect(templateContent).toMatch(/border-l-sign-green.*Seasonal/);

  // Regulations: orange
  expect(templateContent).toMatch(/border-l-brand-orange.*Regulations/);
});
```

---

## Change Log

**v1.0.0** (2025-12-29):
- Initial contract specification for 5 custom sections
- Hero, Where to Fish, Marina, Seasonal Guide, Safety & Regulations
- ~440 lines total custom HTML
- WVWO compliance enforced (rounded-sm, border accents, fonts)

---

## Contract Status

**Status**: ✅ **ACTIVE**
**Last Reviewed**: 2025-12-29
**Maintenance**: Custom sections owned by Lake Template (not reusable)
**Line Count**: ~440 lines (Hero: 50, Where to Fish: 80, Marina: 100, Seasonal: 80, Regulations: 70, spacing: 60)
