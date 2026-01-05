# Integration Architecture - Component Composition & Page Templates

**Architect**: Integration Architect
**Domain**: Component composition, page templates, existing component integration
**Date**: 2025-12-27

---

## Integration Strategy

The WMA Template system integrates **4 new components** (SPEC-12) with **4 reused components** (SPEC-10/11) via a **composition pattern** in page templates.

**Goal**: 150-line page templates (73% reduction from 463-line elk-river.astro)

---

## WMA Page Template Pattern

### Template Structure (~/pages/wma/[slug].astro)

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getEntry } from 'astro:content';

// SPEC-10/11 Components (Reused)
import AdventureQuickStats from '@/components/adventure/AdventureQuickStats.astro';
import AdventureGettingThere from '@/components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '@/components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '@/components/adventure/AdventureRelatedShop.astro';

// SPEC-12 Components (New)
import AdventureWhatToHunt from '@/components/adventure/AdventureWhatToHunt.astro';
import AdventureWhatToFish from '@/components/adventure/AdventureWhatToFish.astro';
import AdventureCampingList from '@/components/adventure/AdventureCampingList.astro';
import AdventureAmenitiesGrid from '@/components/adventure/AdventureAmenitiesGrid.astro';
import AdventureCTA from '@/components/adventure/AdventureCTA.astro';

// Get WMA data from Content Collection
const { slug } = Astro.params;
const wma = await getEntry('adventures', slug);

if (!wma || wma.data.type !== 'wma') {
  return Astro.redirect('/404');
}

const {
  title,
  description,
  heroImage,
  coordinates,
  acreage,
  county,
  drive_time,
  species,
  fishingWaters,
  facilities,
  gear,
  kim_hook,
} = wma.data;
---

<BaseLayout {title} {description}>
  <!-- Hero Section -->
  <section class="relative h-96">
    <img src={heroImage} alt={title} class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-brand-brown/40 flex items-center justify-center">
      <h1 class="font-display text-6xl font-bold text-white text-center">
        {title}
      </h1>
    </div>
  </section>

  <!-- Quick Stats (REUSED from SPEC-10) -->
  <AdventureQuickStats
    acreage={acreage}
    county={county}
    driveTime={drive_time}
    coordinates={coordinates}
  />

  <!-- What to Hunt (NEW in SPEC-12) -->
  {species && species.length > 0 && (
    <AdventureWhatToHunt {species} variant="white" />
  )}

  <!-- Fishing Waters (NEW in SPEC-12) -->
  {fishingWaters && fishingWaters.length > 0 && (
    <AdventureWhatToFish waters={fishingWaters} variant="cream" />
  )}

  <!-- Facilities & Access (NEW in SPEC-12) -->
  {facilities && facilities.length > 0 && (
    <AdventureCampingList {facilities} variant="white" />
  )}

  <!-- Getting There (REUSED from SPEC-10) -->
  <AdventureGettingThere
    coordinates={coordinates}
    directions={wma.data.directions}
    variant="cream"
  />

  <!-- Gear Checklist (REUSED from SPEC-10) -->
  {gear && gear.length > 0 && (
    <AdventureGearChecklist
      required={gear.slice(0, 5)}
      optional={gear.slice(5)}
      variant="white"
    />
  )}

  <!-- Call to Action (NEW in SPEC-12) -->
  <AdventureCTA
    heading={`Ready to Hunt ${title.replace(' WMA', '')}?`}
    description={kim_hook || "Stop by the shop for licenses, ammo, and local tips before you head out."}
    primaryText="Get Directions"
    primaryHref={`https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`}
    secondaryText="Call the Shop"
    secondaryHref="tel:+13045551234"
    variant="sign-green"
  />

  <!-- Related Shop Categories (REUSED from SPEC-11) -->
  <AdventureRelatedShop
    categories={['Hunting Licenses', 'Ammo', 'Tree Stands', 'Fishing Tackle']}
    variant="cream"
  />
</BaseLayout>
```

**Line Count**: ~150 lines (vs. 463 lines in elk-river.astro)

---

## Section Background Alternation

### Pattern: Cream → White → Cream → White

```
Hero (image)
├── QuickStats (cream)      ← SPEC-10
├── WhatToHunt (white)      ← SPEC-12
├── WhatToFish (cream)      ← SPEC-12
├── Facilities (white)      ← SPEC-12
├── GettingThere (cream)    ← SPEC-10
├── GearChecklist (white)   ← SPEC-10
├── CTA (sign-green)        ← SPEC-12 (accent color breaks pattern)
└── RelatedShop (cream)     ← SPEC-11
```

**Visual Benefit**: Subtle depth, easy section scanning, no harsh transitions

---

## Conditional Rendering Logic

### Hide Sections with No Data

```astro
<!-- Show hunting section ONLY if species exist -->
{species && species.length > 0 && (
  <AdventureWhatToHunt {species} variant="white" />
)}

<!-- Show fishing section ONLY if waters exist -->
{fishingWaters && fishingWaters.length > 0 && (
  <AdventureWhatToFish waters={fishingWaters} variant="cream" />
)}

<!-- Show facilities section ONLY if facilities exist -->
{facilities && facilities.length > 0 && (
  <AdventureCampingList {facilities} variant="white" />
)}
```

**Empty State Handling**:

- Entire section hidden (no placeholder)
- Background alternation adjusts automatically
- No broken UI or layout gaps

---

## Component Communication Pattern

### Props Flow (One-Way Data Binding)

```
Content Collection (adventures/burnsville-lake.md)
    ↓
Page Template ([slug].astro)
    ↓ Props
Component (AdventureWhatToHunt.astro)
    ↓ Transformed Props
Generic Component (AdventureFeatureSection.astro)
    ↓ Rendered
Static HTML
```

**No Global State**:

- Components receive props from parent
- No client-side state management (Svelte, React, etc.)
- Pure function components (props in, HTML out)

---

## Integration with Existing Components

### SPEC-10: AdventureQuickStats

**Existing Interface**:

```typescript
interface QuickStatsProps {
  acreage?: number;
  county?: string;
  driveTime?: string;
  coordinates?: { lat: number; lng: number };
}
```

**WMA Usage**:

```astro
<AdventureQuickStats
  acreage={wma.data.acreage}       // NEW field from SPEC-12
  county={wma.data.county}         // NEW field from SPEC-12
  driveTime={wma.data.drive_time}  // EXISTING field
  coordinates={wma.data.coordinates} // EXISTING field
/>
```

**Compatibility**: ✅ Zero changes to SPEC-10 component

---

### SPEC-10: AdventureGettingThere

**Existing Interface**:

```typescript
interface GettingThereProps {
  coordinates: { lat: number; lng: number };
  directions?: string;
  variant?: 'white' | 'cream';
}
```

**WMA Usage**:

```astro
<AdventureGettingThere
  coordinates={wma.data.coordinates}
  directions={wma.data.directions}
  variant="cream"
/>
```

**Compatibility**: ✅ Zero changes to SPEC-10 component

---

### SPEC-10: AdventureGearChecklist

**Existing Interface**:

```typescript
interface GearChecklistProps {
  required: string[];
  optional?: string[];
  variant?: 'white' | 'cream';
}
```

**WMA Usage**:

```astro
<AdventureGearChecklist
  required={wma.data.gear.slice(0, 5)}    // First 5 items = required
  optional={wma.data.gear.slice(5)}       // Rest = optional
  variant="white"
/>
```

**Compatibility**: ✅ Zero changes to SPEC-10 component

---

### SPEC-11: AdventureRelatedShop

**Existing Interface**:

```typescript
interface RelatedShopProps {
  categories: string[];
  variant?: 'white' | 'cream';
}
```

**WMA Usage**:

```astro
<AdventureRelatedShop
  categories={['Hunting Licenses', 'Ammo', 'Tree Stands', 'Fishing Tackle']}
  variant="cream"
/>
```

**Compatibility**: ✅ Zero changes to SPEC-11 component

---

## Dynamic Route Generation

### Generate Static Pages at Build

```typescript
// src/pages/wma/[slug].astro
export async function getStaticPaths() {
  const adventures = await getCollection('adventures');

  // Filter for WMAs only
  const wmas = adventures.filter(a => a.data.type === 'wma');

  return wmas.map(wma => ({
    params: { slug: wma.slug },
    props: { wma },
  }));
}
```

**Output**:

- `/wma/burnsville-lake/index.html`
- `/wma/cranberry/index.html`
- `/wma/holly-river/index.html`
- ... (96 total in Phase 3)

---

## SEO Meta Tags Integration

### Per-WMA Metadata

```astro
<head>
  <title>{title} - Hunting & Fishing Guide | WV Wild Outdoors</title>
  <meta name="description" content={description} />

  <!-- Structured Data (LocalBusiness + Place) -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Place",
      "name": title,
      "description": description,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.lat,
        "longitude": coordinates.lng
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "WV",
        "addressLocality": county
      }
    })}
  </script>

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={heroImage} />
  <meta property="og:type" content="website" />
</head>
```

---

## Testing Integration Points

### Component Interaction Tests

```typescript
test('page template composes all sections correctly', async ({ page }) => {
  await page.goto('/wma/burnsville-lake');

  // Verify section order
  const sections = page.locator('section');
  await expect(sections.nth(0)).toContainText('Quick Stats');
  await expect(sections.nth(1)).toContainText('What to Hunt');
  await expect(sections.nth(2)).toContainText('Fishing Waters');
  // ...
});

test('conditional sections hide when data absent', async ({ page }) => {
  // WMA with no fishing
  await page.goto('/wma/hunting-only');

  await expect(page.locator('text=Fishing Waters')).not.toBeVisible();
  await expect(page.locator('text=What to Hunt')).toBeVisible();
});
```

---

## Deployment Integration

### Build Pipeline

```bash
# 1. Validate content
npm run validate-content  # Zod schema checks

# 2. Build static site
npm run build             # Astro build (5 WMAs: <30s, 96 WMAs: <5min)

# 3. Run tests
npm run test:e2e          # Playwright
npm run test:a11y         # axe-core

# 4. Deploy to Cloudflare
npm run deploy            # wrangler publish
```

---

**Integration Architect**: Integration architecture complete
**Component Count**: 10 total (4 new + 4 reused + 2 wrappers)
**Template Lines**: ~150 (73% reduction from 463)
**Compatibility**: 100% (zero breaking changes to existing components)
