# LakeTemplate.astro Pattern Analysis

**Complete Pattern Reference for RiverTemplate Replication**

Generated: 2025-12-30
Source: `wv-wild-web/src/components/templates/LakeTemplate.astro` (558 lines)

---

## 1. IMPORT PATTERN ANALYSIS

### Import Structure (Lines 25-33)

```astro
import Layout from '../../layouts/Layout.astro';
import AdventureWhatToFish from '../adventure/AdventureWhatToFish.astro';
import AdventureCampingList from '../adventure/AdventureCampingList.astro';
import AdventureQuickStats from '../adventure/AdventureQuickStats.astro';
import AdventureAmenitiesGrid from '../adventure/AdventureAmenitiesGrid.astro';
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
import type { LakeTemplateProps, FishingSpot, Marina, Activity, SeasonalGuide, Regulation } from '../../types/adventure';
```

**Key Patterns:**

- **Layout first**, then shared components alphabetically
- All component imports are **relative paths** (`../` and `../../`)
- **Type imports on separate line** using `import type { ... }`
- Types imported: Interface + specific entity types used in `.map()` callbacks

**RiverTemplate Adaptations:**

- Replace `LakeTemplateProps` with `RiverTemplateProps`
- Import types: `RiverTemplateProps, FishingSpot, Access, Activity, SeasonalGuide, Regulation`
- Keep same shared components (AdventureGearChecklist, AdventureRelatedShop, AdventureCTA)

---

## 2. PROPS INTERFACE PATTERN

### Props Destructuring (Lines 35-54)

```astro
interface Props extends LakeTemplateProps {}

const {
  name,
  image,
  imageAlt,
  tagline,
  description,
  stats,
  fishingSpots,
  marinas,
  activities,
  seasonalGuide,
  regulations,
  gearList,
  relatedShop,
  difficulty,
  bestSeason,
  coordinates,
} = Astro.props;
```

**Key Patterns:**

- **No default values in destructuring** - defaults handled at type level or via conditional rendering
- **All-at-once destructuring** (not selective) - ensures all props are available
- **Alphabetical-ish ordering** with related fields grouped (e.g., image, imageAlt, tagline together)

**RiverTemplate Adaptations:**

- Replace `marinas` with `access: Access[]` (boat ramps, parking, public access points)
- Keep identical: `stats, fishingSpots, activities, seasonalGuide, regulations, gearList, relatedShop`

---

## 3. SECTION RENDERING PATTERN

### Conditional Section Structure

**Pattern repeated 6 times in LakeTemplate (lines 139, 154, 211, 309, 356, 429):**

```astro
{arrayData && arrayData.length > 0 && (
  <section class="section-name bg-[color] py-12" aria-labelledby="section-heading">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <h2
        id="section-heading"
        class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
      >
        Section Title
      </h2>

      <!-- Content Grid/Stack -->
      <div class="[layout classes]">
        {arrayData.map((item) => (
          <article class="[card classes]">
            <!-- Card content -->
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

**Key Patterns:**

- **Three-layer nesting**: `<section>` → `<div class="container mx-auto px-4">` → `<div class="[layout]">`
- **Consistent padding**: `py-12` on section, no vertical padding on container
- **aria-labelledby** on every section (accessibility mandatory)
- **h2 id** matches aria-labelledby value (e.g., `id="where-to-fish-heading"` + `aria-labelledby="where-to-fish-heading"`)
- **Background alternation**: `bg-white` and `bg-brand-cream` alternate between sections

### Background Alternation Strategy

```
Hero: dark overlay on image (bg-brand-brown/50)
↓
Description: white (no section, just container)
↓
What to Fish: bg-brand-cream (via component)
↓
Where to Fish: bg-white
↓
Marina: bg-brand-cream
↓
Activities: bg-white
↓
Seasonal Guide: bg-brand-cream
↓
Regulations: bg-white
↓
Gear Checklist: bg-white (via component)
↓
Related Shop: bg-brand-cream
```

**RiverTemplate Strategy:**

- Alternate white/cream between major sections
- Keep same pattern: description (white) → what to fish (cream) → where to fish (white) → access (cream)

---

## 4. GRID LAYOUT PATTERNS

### Hero Stats Grid (Line 94)

```astro
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-brand-cream mb-6">
```

**Usage:** 4 stats → 2 columns mobile, 4 columns desktop

### Fishing Spots (Line 166)

```astro
<div class="space-y-6">
  {fishingSpots.map((spot: FishingSpot) => (
    <article class="bg-white border-l-4 border-l-brand-brown p-6 md:p-8 rounded-sm shadow-sm">
```

**Usage:** Full-width stacking with vertical spacing, no grid

### Marina Cards (Line 223)

```astro
<div class="space-y-6">
  {marinas.map((marina: Marina) => (
    <article class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm shadow-sm">
```

**Usage:** Full-width stacking (same as fishing spots)

### Activities Grid (Line 321)

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {activities.map((activity: Activity) => (
    <article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm shadow-sm">
```

**Usage:** 1 → 2 → 3 column progression

### Seasonal Guide Grid (Line 368)

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {seasonalGuide.map((season: SeasonalGuide) => (
    <article class="bg-white p-6 rounded-sm shadow-sm">
```

**Usage:** 4-season layout: 1 → 2 → 4 column progression

### Regulations Stack (Line 441)

```astro
<div class="space-y-6">
  {regulations.map((reg: Regulation) => (
    <article class="bg-brand-cream border-l-4 border-l-brand-orange p-6 rounded-sm shadow-sm">
```

**Usage:** Full-width stacking (like fishing spots/marina)

### Related Shop Grid (Line 504)

```astro
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {relatedShop.map((category) => (
    <a href={category.href} class="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-sign-green">
```

**Usage:** 1 → 3 column progression (no `lg:` breakpoint)

---

## 5. CARD COMPONENT PATTERN

### Full-Width Stacked Cards

**Used for: Fishing Spots, Marina, Regulations**

```astro
<article class="bg-[color] border-l-4 border-l-[accent] p-6 md:p-8 rounded-sm shadow-sm">
  <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
    {cardTitle}
  </h3>

  <!-- 2-Column Grid Interior -->
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Left Column -->
    <div class="space-y-2 font-body text-gray-800">
      <!-- Content -->
    </div>

    <!-- Right Column -->
    <div>
      <!-- Content -->
    </div>
  </div>
</article>
```

**Key Patterns:**

- **Padding**: `p-6` on smaller cards (activities), `p-6 md:p-8` on larger cards (fishing spots, marina)
- **Border accent**: Always `border-l-4`, color varies by section (brown for spots/marina, orange for regulations, green for activities)
- **Interior 2-column grid**: `md:grid-cols-2` with `gap-6` for detail sections

### Grid-Based Cards

**Used for: Activities, Seasonal Guide**

```astro
<article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm shadow-sm">
  <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
    {activity.name}
  </h3>
  <p class="font-body text-gray-700 mb-3">
    {activity.description}
  </p>
  <!-- Optional metadata -->
</article>
```

**Key Patterns:**

- **Consistent padding**: `p-6` for all grid-based cards
- **Smaller h3**: `text-xl` (vs. `text-2xl` for full-width cards)
- **Spacing progression**: `mb-2` after heading, `mb-3` after main text, `mb-4` between sections

---

## 6. TYPOGRAPHY HIERARCHY

### Headings

```astro
<!-- h1: Hero -->
<h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">

<!-- h2: Section Headers -->
<h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8">

<!-- h3: Full-Width Card Titles -->
<h3 class="font-display text-2xl font-bold text-brand-brown mb-4">

<!-- h3: Grid Card Titles -->
<h3 class="font-display text-xl font-bold text-brand-brown mb-2">

<!-- h4: Sub-headings in Cards -->
<h4 class="font-bold text-brand-brown mb-3 uppercase tracking-wide text-sm">
```

**Margin-Bottom Strategy:**

- **h1**: `mb-6` (hero context)
- **h2**: `mb-8` (section separation)
- **h3 (large)**: `mb-4` (full-width cards)
- **h3 (small)**: `mb-2` (grid cards)
- **h4**: `mb-3` (sub-sections)

### Body Text

```astro
<!-- Large Prose (Description) -->
<p class="font-body text-lg leading-relaxed text-gray-800">

<!-- Regular Body -->
<p class="font-body text-gray-700 mb-3">

<!-- Small Labels -->
<p class="font-body text-sm text-gray-600 mb-2">

<!-- Uppercase Labels -->
<p class="font-bold text-sm uppercase tracking-wide text-brand-brown mb-2">
```

**When to Use:**

- **text-lg**: Only for main description prose (line 132)
- **text-base** (default): Not explicitly set - used for most body text
- **text-sm**: Labels, metadata, Kim's notes

---

## 7. KIM'S NOTES PATTERN (font-hand)

### Usage (Lines 414-419)

```astro
{season.kimNote && (
  <div class="mt-4 pt-4 border-t border-gray-200">
    <p class="font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm">
      {season.kimNote}
    </p>
  </div>
)}
```

**Key Patterns:**

- **ONLY used in seasonal guide** - not in fishing spots, marina, or activities
- **Always preceded by border-t** separator (`border-t border-gray-200`)
- **Padding hierarchy**: `mt-4 pt-4` on container, `p-3` on text element
- **Styling**: `font-hand text-sm italic text-brand-brown bg-brand-cream rounded-sm`

**RiverTemplate Usage:**

- Use `font-hand` ONLY for `fishing.kimsTip` (per data structure)
- Do NOT use in access points or activities
- Keep identical visual treatment

---

## 8. SCOPED STYLES PATTERN

### Complete Scoped Styles (Lines 538-557)

```astro
<style>
  /* WVWO Compliance: Only rounded-sm allowed */
  .rounded-sm {
    border-radius: 0.125rem;
  }

  /* WVWO Compliance: Scoped to lake-template class */
  .lake-template .rounded-sm {
    border-radius: 0.125rem !important;
  }

  /* Motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

**Key Patterns:**

- **No animations or transitions** in LakeTemplate
- **Only accessibility scoping** (reduced motion)
- **Border-radius enforcement** via scoped styles

**RiverTemplate Adaptations:**

- Replace `.lake-template` with `.river-template`
- Keep identical motion reduction handling

---

## 9. ACCESSIBILITY PATTERNS

### aria-labelledby (Used 6 times)

```astro
<section aria-labelledby="where-to-fish-heading">
  <h2 id="where-to-fish-heading">Where to Fish</h2>
```

**Pattern:**

- Every major section has aria-labelledby
- ID format: `{section-slug}-heading` (lowercase, hyphenated)
- Hero section: `aria-label` instead of `aria-labelledby` (no heading visible)

### Phone Links (Line 279)

```astro
<a
  href={`tel:${marina.contact.replace(/\D/g, '')}`}
  class="text-sign-green hover:underline"
>
  {marina.contact}
</a>
```

**Pattern:**

- Strip non-digits: `.replace(/\D/g, '')` for tel: href
- Display formatted: `{marina.contact}` (original formatting)

### External Links (Line 459)

```astro
<a
  href={reg.link}
  target="_blank"
  rel="noopener noreferrer"
  class="text-sign-green hover:underline font-body text-sm font-medium"
>
  View Official Regulations →
</a>
```

**Pattern:**

- Always `target="_blank" rel="noopener noreferrer"` for external links
- Arrow indicator: `→` at end
- Color: `text-sign-green hover:underline`

---

## 10. INTEGRATION WITH SHARED COMPONENTS

### AdventureWhatToFish (Lines 140-150)

```astro
<AdventureWhatToFish
  features={fishingSpots.map(spot => ({
    title: spot.species.join(', '),
    description: `Depth: ${spot.depth} | Structure: ${spot.structure}`,
    notes: `Access: ${spot.access}`,
  }))}
  title="What to Fish"
  variant="cream"
  columns={2}
  accentColor="sign-green"
/>
```

**Key Patterns:**

- **Transform data** with `.map()` to match component interface
- **Variant**: `"cream"` (background color)
- **Columns**: `2` (2-column grid)
- **Accent color**: `"sign-green"` for fishing

**RiverTemplate Adaptations:**

- Keep identical - this section is shared between lake/river

### AdventureCampingList (Lines 297-305)

```astro
<AdventureCampingList
  title="Camping Facilities"
  facilities={gearList.map(gear => ({
    type: gear.name,
    description: gear.optional ? 'Optional' : 'Recommended',
  }))}
  columns={2}
  variant="cream"
/>
```

**Key Patterns:**

- **Reuses gearList** (not ideal - should use separate camping data)
- **Columns**: `2`
- **Variant**: `"cream"`

**RiverTemplate Adaptations:**

- **Do NOT use** - rivers likely don't have camping facilities sections
- If needed, use dedicated camping data, not gearList

### AdventureGearChecklist (Lines 485-491)

```astro
<AdventureGearChecklist
  title="What to Bring"
  intro="Make sure you have everything you need for a great day on the water!"
  items={gearList}
  columns={3}
  variant="white"
/>
```

**Key Patterns:**

- **Direct prop pass**: `items={gearList}` (no transformation)
- **Columns**: `3` (3-column grid)
- **Variant**: `"white"`

**RiverTemplate Adaptations:**

- Keep identical - intro text can be "...great day on the river!"

### AdventureRelatedShop (Lines 496-522)

```astro
<section class="related-shop bg-brand-cream py-12">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-4">
      Shop Before You Go
    </h2>
    <p class="font-body text-gray-700 mb-8 max-w-2xl">
      Stock up on everything you need at WV Wild Outdoors!
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedShop.map((category) => (
        <a
          href={category.href}
          class="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-sign-green"
        >
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {category.name}
          </h3>
          {category.description && (
            <p class="font-body text-gray-600 text-sm">
              {category.description}
            </p>
          )}
        </a>
      ))}
    </div>
  </div>
</section>
```

**Key Patterns:**

- **Manual section** (not component) - allows custom heading/intro
- **Link cards**: Entire card is clickable `<a>` element
- **Hover effect**: `hover:shadow-md transition-shadow`

**RiverTemplate Adaptations:**

- Keep identical section structure

### AdventureCTA (Lines 526-533)

```astro
<AdventureCTA
  heading="Stop By Before You Head Out"
  description="Get the latest fishing reports, pick up your license, and grab everything you need for a successful day on the water."
  primaryText="Visit Our Shop"
  primaryHref="/shop/fishing"
  secondaryText="Call Us"
  secondaryHref="tel:+13046134570"
/>
```

**Key Patterns:**

- **Two CTAs**: Primary (button) + Secondary (link)
- **Phone link**: `tel:` protocol
- **Copy**: Fishing-specific

**RiverTemplate Adaptations:**

- Update description: "...successful day on the river."

---

## 11. DEVIATION RECOMMENDATIONS

### Where RiverTemplate SHOULD Differ

1. **Access Section Structure:**
   - Lakes: `marinas: Marina[]` (full-service facilities)
   - Rivers: `access: Access[]` (parking, boat ramps, wading entry points)
   - **Keep same visual pattern** (full-width stacked cards with 2-column interior)

2. **Fishing Spot Details:**
   - Lakes: `depth` + `structure` (underwater features)
   - Rivers: `wadeability` + `currentSpeed` (flow characteristics)
   - **Keep same card layout**, just different metadata fields

3. **Seasonal Guide Focus:**
   - Lakes: Water temperature + visibility conditions
   - Rivers: Flow rates + water clarity after rain
   - **Keep identical visual treatment** (4-season grid)

4. **Hero Stats:**
   - Lakes: "Acres" + "Max Depth"
   - Rivers: "Miles" + "Access Points"
   - **Keep same grid pattern** (2 → 4 columns)

5. **Kim's Notes Placement:**
   - Lakes: Only in seasonal guide
   - Rivers: Only in fishing.kimsTip (per data structure)
   - **Same visual treatment**, different content source

---

## 12. LINE-BY-LINE STRUCTURE BREAKDOWN

```
Lines 1-24:   File header comment (SPEC compliance)
Lines 25-33:  Imports (Layout → Shared Components → Types)
Lines 35-54:  Props interface + destructuring
Lines 60-124: HERO SECTION (h1, tagline, stats grid, badges)
Lines 127:    Main content wrapper (<main class="container mx-auto px-4 py-12 space-y-16">)
Lines 130-136: Description prose
Lines 139-150: AdventureWhatToFish component integration
Lines 154-207: WHERE TO FISH section (full-width cards, 2-col interior)
Lines 211-292: MARINA section (full-width cards, services list)
Lines 296-305: AdventureCampingList component (questionable - uses gearList)
Lines 309-352: ACTIVITIES section (grid-based cards, 1 → 2 → 3 columns)
Lines 356-425: SEASONAL GUIDE section (4-season grid, Kim's notes)
Lines 429-478: REGULATIONS section (full-width cards, orange accent)
Lines 484-491: AdventureGearChecklist component (3 columns)
Lines 496-522: Related Shop section (manual, link cards)
Lines 526-533: AdventureCTA component
Lines 538-557: Scoped styles (rounded-sm enforcement, motion reduction)
```

---

## 13. EXACT TAILWIND CLASS PATTERNS

### Section Wrappers

```
<section class="bg-white py-12">                           ← White background
<section class="bg-brand-cream py-12">                     ← Cream background
<section aria-labelledby="[id]">                           ← Always add aria
```

### Containers

```
<div class="container mx-auto px-4">                       ← Standard container
<div class="container mx-auto px-4 py-12 space-y-16">     ← Main content wrapper
```

### Card Patterns

```
<!-- Full-Width Card (Fishing Spots, Marina, Regulations) -->
<article class="bg-white border-l-4 border-l-brand-brown p-6 md:p-8 rounded-sm shadow-sm">

<!-- Grid Card (Activities) -->
<article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm shadow-sm">

<!-- Regulation Card (Orange Accent) -->
<article class="bg-brand-cream border-l-4 border-l-brand-orange p-6 rounded-sm shadow-sm">
```

### Typography Classes

```
font-display text-4xl md:text-5xl lg:text-6xl font-bold   ← h1 (hero)
font-display text-3xl md:text-4xl font-bold               ← h2 (sections)
font-display text-2xl font-bold                            ← h3 (large cards)
font-display text-xl font-bold                             ← h3 (grid cards)
font-bold text-sm uppercase tracking-wide                  ← h4 (labels)
font-body text-lg leading-relaxed                          ← Large prose
font-body text-gray-700 mb-3                               ← Body text
font-hand text-sm italic text-brand-brown bg-brand-cream p-3 rounded-sm  ← Kim's notes
```

### Grid Breakpoints

```
grid grid-cols-2 md:grid-cols-4 gap-4                      ← Hero stats (4 items)
grid md:grid-cols-2 gap-6                                  ← 2-col interior layout
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6      ← Activities (3-6 items)
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6      ← Seasonal (4 items)
grid grid-cols-1 md:grid-cols-3 gap-6                      ← Related shop (3 items)
space-y-6                                                  ← Full-width stacking
```

### Spacing Patterns

```
mb-2    ← After small headings (h3 in grid cards)
mb-3    ← After body text in cards
mb-4    ← After large headings (h3 in full-width cards)
mb-6    ← After hero h1
mb-8    ← After section h2
py-12   ← Section vertical padding (all sections)
gap-4   ← Small grid gaps (hero stats)
gap-6   ← Standard grid/stack gaps (most sections)
space-y-6   ← Vertical stacking (fishing spots, marina)
space-y-16  ← Main content section separation
```

---

## SUMMARY: PATTERNS TO REPLICATE IN RiverTemplate

1. ✅ **Import structure**: Layout → Components → Types (line 25-33)
2. ✅ **Props destructuring**: All-at-once, no defaults (line 37-54)
3. ✅ **Section structure**: 3-layer nesting with aria-labelledby (6 sections)
4. ✅ **Background alternation**: white/cream pattern
5. ✅ **Grid breakpoints**: 2→4 (stats), 1→2→3 (activities), 1→2→4 (seasonal), space-y-6 (cards)
6. ✅ **Card padding**: p-6 (grid), p-6 md:p-8 (full-width)
7. ✅ **Border accents**: border-l-4 with semantic colors (brown spots, green activities, orange regulations)
8. ✅ **Typography scale**: h1 (4xl→6xl), h2 (3xl→4xl), h3 (xl or 2xl), h4 (sm uppercase)
9. ✅ **Kim's notes**: font-hand ONLY for seasonal guide kimNote
10. ✅ **Scoped styles**: rounded-sm enforcement + motion reduction
11. ✅ **Accessibility**: aria-labelledby, semantic HTML, tel: phone links, external link rels
12. ✅ **Component integration**: Direct props (GearChecklist) vs. transformed props (WhatToFish)

**Critical for RiverTemplate:**

- Replace `marinas` with `access` (same card layout, different content)
- Keep identical spacing, typography, and grid patterns
- Maintain 6-section structure with white/cream alternation
- Use font-hand ONLY for fishing.kimsTip, not in access section
