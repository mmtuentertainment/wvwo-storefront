# SPEC-12: Component Integration Architecture

**Created**: 2025-12-27
**Author**: System Architecture Designer
**Epic**: WMA Template System
**Dependencies**: SPEC-09, SPEC-10, SPEC-11

---

## Overview

This document defines the complete integration architecture showing how 10 adventure components compose into Wildlife Management Area (WMA) pages. The architecture reduces page complexity from 533 lines to ~150 lines through systematic component orchestration, background alternation, conditional rendering, and slot-based customization.

---

## 1. Page Template Pattern

### 1.1 Architecture: Layout Component Strategy

**Decision**: Use **layout component pattern** over dynamic routing for maximum flexibility.

```typescript
// Pattern: WMATemplate.astro acts as composable layout
// Individual WMA pages import and orchestrate components

// ✅ CHOSEN APPROACH: Layout Component
import WMATemplate from '../../layouts/WMATemplate.astro';

<WMATemplate adventure={adventure}>
  <slot name="custom-sections" />  // Kim's custom content injection
</WMATemplate>

// ❌ REJECTED: Dynamic Route Pattern
// pages/adventures/[...slug].astro
// Too rigid - prevents per-page customization
```

**Rationale**:

- Kim needs ability to customize specific WMA pages (e.g., add special events to Elk River)
- Layout component pattern preserves flexibility while enforcing consistency
- Easier migration path: convert pages incrementally vs. all-at-once

### 1.2 Component Orchestration Flow

```astro
---
// elk-river.astro (AFTER refactor - 150 lines)
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';

// SPEC-09/10/11 Components
import AdventureHero from '../../components/adventure/AdventureHero.astro';
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';
import AdventureGettingThere from '../../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../../components/adventure/AdventureRelatedShop.astro';

// SPEC-12 WMA-Specific Components
import WMASpeciesGrid from '../../components/wma/WMASpeciesGrid.astro';
import WMAFacilitiesGrid from '../../components/wma/WMAFacilitiesGrid.astro';
import WMAFishingWaters from '../../components/wma/WMAFishingWaters.astro';
import WMARegulations from '../../components/wma/WMARegulations.astro';
import WMACampingList from '../../components/wma/WMACampingList.astro';

// Content configuration (pure data - no layout logic)
const wmaData = {
  hero: { /* ... */ },
  stats: [/* ... */],
  hunting: { species: [/* ... */] },
  fishing: { waters: [/* ... */] },
  facilities: [/* ... */],
  camping: [/* ... */],
  regulations: { restrictions: [/* ... */] },
  gettingThere: { routes: [/* ... */] },
  gear: { items: [/* ... */] },
  relatedShop: { categories: [/* ... */] }
};
---

<Layout {...seoProps}>
  <Header />

  <main class="bg-brand-cream min-h-screen">
    <!-- Section orchestration with alternating backgrounds -->
    <AdventureHero {...wmaData.hero} />              <!-- bg-brand-brown -->
    <AdventureQuickStats {...wmaData.stats} variant="white" />
    <WMASpeciesGrid {...wmaData.hunting} variant="cream" />
    <WMAFishingWaters {...wmaData.fishing} variant="white" />
    <AdventureGettingThere {...wmaData.gettingThere} variant="cream" />
    <WMAFacilitiesGrid {...wmaData.facilities} variant="white" />
    <WMACampingList {...wmaData.camping} variant="cream" />
    <AdventureGearChecklist {...wmaData.gear} variant="white" />
    <WMARegulations {...wmaData.regulations} variant="cream" />
    <AdventureRelatedShop {...wmaData.relatedShop} variant="white" />
  </main>

  <Footer />
</Layout>
```

**Key Principles**:

1. **Pure Data Configuration**: WMA pages contain only content, zero layout logic
2. **Component Orchestration**: Template composes 10 components in canonical order
3. **Variant System**: Alternating `variant="cream"` and `variant="white"` for visual rhythm
4. **Conditional Rendering**: Components self-hide when data is undefined

---

## 2. Canonical Section Order

### 2.1 Component Sequence with Rationale

```typescript
// Canonical order based on user journey and visual hierarchy
const CANONICAL_SECTION_ORDER = [
  { component: 'AdventureHero',           variant: 'brown',  priority: 'critical' },
  { component: 'AdventureQuickStats',     variant: 'white',  priority: 'high' },
  { component: 'WMASpeciesGrid',          variant: 'cream',  priority: 'high' },
  { component: 'WMAFishingWaters',        variant: 'white',  priority: 'medium' },
  { component: 'AdventureGettingThere',   variant: 'cream',  priority: 'high' },
  { component: 'WMAFacilitiesGrid',       variant: 'white',  priority: 'medium' },
  { component: 'WMACampingList',          variant: 'cream',  priority: 'low' },
  { component: 'AdventureGearChecklist',  variant: 'white',  priority: 'high' },
  { component: 'WMARegulations',          variant: 'cream',  priority: 'critical' },
  { component: 'AdventureRelatedShop',    variant: 'white',  priority: 'medium' }
] as const;
```

### 2.2 Order Rationale

**1. AdventureHero** (SPEC-09)

- **Why First**: Immediate visual impact, sets context, LCP optimization
- **User Need**: "What is this place? Where is it? How hard is the terrain?"
- **Variant**: Dark brown (`bg-brand-brown`) with camo pattern overlay
- **Data**: Title, description, difficulty, season, drive time, hero image

**2. AdventureQuickStats** (SPEC-10)

- **Why Second**: Fast facts above fold - acreage, location, access, drive time
- **User Need**: "How big? How far? Can I access year-round?"
- **Variant**: `white` (clean break from dark hero)
- **Data**: 4-column grid of key metrics

**3. WMASpeciesGrid** (SPEC-12)

- **Why Third**: Primary user intent for WMA pages = "What can I hunt?"
- **User Need**: "Deer season dates? Turkey tips? Bear regulations?"
- **Variant**: `cream` (warm, inviting for Kim's hunting tips)
- **Data**: Species array with seasons, descriptions, Kim's notes

**4. WMAFishingWaters** (SPEC-12)

- **Why Fourth**: Secondary opportunity after hunting info
- **User Need**: "Can I fish here? What species? Where are access points?"
- **Variant**: `white` (clean separation from hunting content)
- **Data**: Named waters with species, access descriptions

**5. AdventureGettingThere** (SPEC-11)

- **Why Fifth**: User now knows WHAT to do, needs to know HOW to get there
- **User Need**: "Directions from shop? GPS coordinates? Parking?"
- **Variant**: `cream` (softer background for route instructions)
- **Data**: Step-by-step routes, map links, parking notes

**6. WMAFacilitiesGrid** (SPEC-12)

- **Why Sixth**: Planning logistics after knowing destination
- **User Need**: "Parking count? Boat ramps? Shooting ranges? Restrooms?"
- **Variant**: `white` (grid content benefits from clean background)
- **Data**: Facilities array with types, counts, descriptions

**7. WMACampingList** (SPEC-12)

- **Why Seventh**: Optional overnight planning
- **User Need**: "Campsites available? Primitive or RV? Reservations needed?"
- **Variant**: `cream` (warm, inviting for overnight info)
- **Data**: Campsite types, amenities, availability notes

**8. AdventureGearChecklist** (SPEC-11)

- **Why Eighth**: Final prep before trip (shop cross-sell opportunity)
- **User Need**: "What should I pack? What gear do I need for this terrain?"
- **Variant**: `white` (clean grid for checklists)
- **Data**: Gear items by category with shop links

**9. WMARegulations** (SPEC-12)

- **Why Ninth**: Legal requirements before hunt (CRITICAL but not first priority)
- **User Need**: "Zone restrictions? Blaze orange required? Closure dates?"
- **Variant**: `cream` with `border-l-brand-orange` (safety emphasis)
- **Data**: DNR zone, restrictions array, contact info

**10. AdventureRelatedShop** (SPEC-11)

- **Why Last**: Conversion opportunity after informational content
- **User Need**: "What categories in shop match this terrain/season?"
- **Variant**: `white` (clean finish, shop CTA)
- **Data**: Related shop categories with links

### 2.3 Enforcement vs. Flexibility

**Template Enforces**:

- Hero ALWAYS first (SEO, LCP, visual hierarchy)
- QuickStats ALWAYS second (above-fold fast facts)
- Regulations ALWAYS near end (legal info after planning)
- RelatedShop ALWAYS last (conversion funnel)

**Template Allows Flexibility**:

- Middle sections (3-8) can reorder based on WMA-specific priorities
- Sections can be omitted via conditional rendering (see Section 4)
- Custom sections can inject via slot composition (see Section 5)

**Example Custom Order** (Fishing-Heavy WMA like Sutton Lake):

```astro
<!-- Fishing-first variant for Sutton Lake WMA -->
<AdventureHero {...hero} />
<AdventureQuickStats {...stats} variant="white" />
<WMAFishingWaters {...fishing} variant="cream" />      <!-- Promoted -->
<WMASpeciesGrid {...hunting} variant="white" />        <!-- Demoted -->
<AdventureGettingThere {...routes} variant="cream" />
<!-- ... rest of sections ... -->
```

---

## 3. Background Rhythm Algorithm

### 3.1 Variant Alternation Pattern

```typescript
// Automated variant assignment based on position
type Variant = 'white' | 'cream';

function calculateVariant(index: number, heroIsFirst: boolean): Variant {
  // Hero is ALWAYS dark (bg-brand-brown), not counted in alternation
  if (index === 0 && heroIsFirst) return 'brown'; // Special case

  // Start with white after dark hero for maximum contrast
  const adjustedIndex = heroIsFirst ? index - 1 : index;

  // Alternate: white → cream → white → cream
  return adjustedIndex % 2 === 0 ? 'white' : 'cream';
}

// Usage in template
const sections = [
  { component: 'AdventureHero',       variant: 'brown' }, // index 0
  { component: 'AdventureQuickStats', variant: calculateVariant(1, true) }, // → 'white'
  { component: 'WMASpeciesGrid',      variant: calculateVariant(2, true) }, // → 'cream'
  { component: 'WMAFishingWaters',    variant: calculateVariant(3, true) }, // → 'white'
  // ... continues alternating
];
```

### 3.2 Visual Rhythm Goals

**1. Prevent Monotony**

- Without alternation: All-cream or all-white creates visual fatigue
- With alternation: Eye naturally segments content into digestible chunks

**2. Section Delineation**

- Background change acts as visual separator (reduces need for heavy borders)
- Improves scanability: "Where does hunting info end and fishing begin?"

**3. WVWO Aesthetic Compliance**

- Cream (`#FFF8E1`): Warm, aged paper, deer hide texture
- White (`#FFFFFF`): Clean, utilitarian, hardware store shelving
- Alternation creates "rustic modern" balance per CLAUDE.md

**4. Accessibility Enhancement**

- High contrast maintained: Text is `brand-brown` (#3E2723) on both backgrounds
- WCAG AA compliant: 4.5:1+ contrast ratio on cream and white
- No cognitive load from color-coded sections (patterns, not hues)

### 3.3 Edge Cases

**Case 1: Section Omitted via Conditional Rendering**

```astro
<!-- If fishing data is undefined, skip WMAFishingWaters -->
<AdventureHero variant="brown" />
<AdventureQuickStats variant="white" />
<WMASpeciesGrid variant="cream" />
<!-- WMAFishingWaters SKIPPED - variant="white" unused -->
<AdventureGettingThere variant="white" />  <!-- ❌ WRONG: Two whites adjacent -->
<WMAFacilitiesGrid variant="cream" />

<!-- SOLUTION: Automatic variant recalculation -->
{visibleSections.map((section, index) => (
  <section.component variant={calculateVariant(index, true)} {...section.props} />
))}
```

**Case 2: Custom Section Injection**

```astro
<!-- Kim adds custom "Special Events" section -->
<WMASpeciesGrid variant="cream" />
<slot name="custom-section" variant="white" />  <!-- Maintains rhythm -->
<WMAFishingWaters variant="cream" />            <!-- Continues alternation -->
```

**Case 3: Mobile Stacking Considerations**

- All sections stack vertically on mobile (<768px)
- Background alternation MORE important on mobile (helps scanning)
- No horizontal scrolling, so color changes mark section boundaries clearly

---

## 4. Conditional Rendering Logic

### 4.1 Data Presence Checks

```typescript
// Component-level conditional rendering
// Each component self-hides when required data is undefined

interface ConditionalRenderProps {
  data: unknown;
  minItems?: number;        // For arrays: minimum count to render
  requiredFields?: string[]; // For objects: required keys
}

function shouldRender({ data, minItems = 1, requiredFields = [] }: ConditionalRenderProps): boolean {
  if (!data) return false;

  // Array check: must have minimum items
  if (Array.isArray(data)) {
    return data.length >= minItems;
  }

  // Object check: must have all required fields
  if (typeof data === 'object' && requiredFields.length > 0) {
    return requiredFields.every(field => field in data && data[field]);
  }

  return true;
}
```

### 4.2 Per-Component Conditional Logic

**WMASpeciesGrid** (SPEC-12)

```astro
---
const { species } = Astro.props;
const shouldRender = species && species.length > 0;
---

{shouldRender && (
  <section class="wma-species-grid" variant="cream">
    <!-- Render species cards -->
  </section>
)}
```

**Conditional**: Hide if `species` array is empty or undefined
**Rationale**: WMAs without hunting data (e.g., fishing-only areas) skip this section
**Impact**: Prevents "No data available" placeholder text

---

**WMAFishingWaters** (SPEC-12)

```astro
---
const { waters } = Astro.props;
const hasWaters = waters && waters.length > 0;
---

{hasWaters && (
  <section class="wma-fishing-waters" variant="white">
    <!-- Render water bodies -->
  </section>
)}
```

**Conditional**: Hide if `waters` array is empty
**Rationale**: Mountainous WMAs without significant water bodies skip fishing section
**Impact**: Keeps pages focused on available opportunities

---

**WMACampingList** (SPEC-12)

```astro
---
const { camping } = Astro.props;
const hasCamping = camping && (camping.sites > 0 || camping.primitiveAllowed);
---

{hasCamping && (
  <section class="wma-camping-list" variant="cream">
    <!-- Render campsite details -->
  </section>
)}
```

**Conditional**: Hide if no campsites AND primitive camping prohibited
**Rationale**: Day-use-only WMAs skip camping logistics
**Impact**: Reduces content bloat for non-camping areas

---

**AdventureGearChecklist** (SPEC-11)

```astro
---
const { gear } = Astro.props;
const hasGear = gear && gear.length >= 3; // Minimum 3 items to justify checklist
---

{hasGear && (
  <section class="adventure-gear-checklist" variant="white">
    <!-- Render gear grid -->
  </section>
)}
```

**Conditional**: Hide if fewer than 3 gear items
**Rationale**: Short gear lists look sparse in grid layout
**Impact**: Maintains visual density standards

---

**WMAFacilitiesGrid** (SPEC-12)

```astro
---
const { facilities } = Astro.props;
const hasFacilities = facilities && facilities.some(f => f.count > 0);
---

{hasFacilities && (
  <section class="wma-facilities-grid" variant="white">
    <!-- Render facility cards -->
  </section>
)}
```

**Conditional**: Hide if all facility counts are zero
**Rationale**: Undeveloped WMAs with no infrastructure skip facilities
**Impact**: Prevents "0 parking areas, 0 boat ramps" empty state

---

### 4.3 Graceful Degradation Strategy

**Principle**: Pages with minimal data still render useful, non-broken layout

**Minimum Viable WMA Page**:

```astro
<!-- Even with ONLY hero + stats, page is functional -->
<AdventureHero title="New WMA" description="..." difficulty="moderate" season="Fall" />
<AdventureQuickStats stats={[{ value: '5,000', label: 'Acres' }]} variant="white" />

<!-- All other sections conditionally hidden -->
<!-- NO broken layout, NO empty placeholders -->
```

**Progressive Enhancement**:

1. **Level 1**: Hero + Stats (bare minimum)
2. **Level 2**: + Species Grid + Getting There (hunting basics)
3. **Level 3**: + Facilities + Gear (full trip planning)
4. **Level 4**: + Fishing + Camping + Regulations (comprehensive)

---

## 5. Slot Architecture

### 5.1 Slot Taxonomy

```typescript
// Slot types with usage patterns
type SlotType =
  | 'default'        // Unstructured content injection
  | 'named'          // Specific positioned content
  | 'conditional'    // Renders only when slot has content
  | 'typed';         // Expects specific component types

interface SlotDefinition {
  name: string;
  type: SlotType;
  purpose: string;
  allowedContent: string[];
  position: 'before' | 'after' | 'replace' | 'overlay';
}
```

### 5.2 Per-Component Slot Inventory

**AdventureHero** (SPEC-09)

```astro
<AdventureHero {...props}>
  <!-- Slot 1: Default (below description) -->
  <p class="font-hand italic text-brand-cream/80">
    Kim's personal WMA story or special note
  </p>

  <!-- Slot 2: badge-extra (additional badges) -->
  <div slot="badge-extra">
    <span class="bg-brand-orange px-4 py-1 rounded-sm">NEW</span>
  </div>

  <!-- Slot 3: cta (call-to-action buttons) -->
  <div slot="cta">
    <a href="/map" class="btn-primary">View Interactive Map</a>
  </div>

  <!-- Slot 4: aside (image overlay content) -->
  <div slot="aside">
    <span class="bg-black/50 text-white px-3 py-1 rounded-sm">
      Photo: Elk River Valley
    </span>
  </div>
</AdventureHero>
```

**Usage Scenarios**:

- **Default**: Kim's firsthand WMA experiences ("I've hunted here 20+ years...")
- **badge-extra**: Seasonal promotions ("Opening Week Special!")
- **cta**: WMA-specific actions (download map, view webcam, check closures)
- **aside**: Photo credits, safety warnings overlaid on hero image

---

**WMASpeciesGrid** (SPEC-12)

```astro
<WMASpeciesGrid species={species} variant="cream">
  <!-- Slot: intro (before species cards) -->
  <p slot="intro">
    Elk River WMA is in Zone 3. Check DNR regulations for current season dates.
  </p>

  <!-- Slot: footer (after species cards) -->
  <div slot="footer">
    <a href="https://wvdnr.gov/..." class="text-sign-green underline">
      Download Full Hunting Regulations (PDF) →
    </a>
  </div>
</WMASpeciesGrid>
```

**Usage Scenarios**:

- **intro**: Zone context, licensing reminders, general hunting tips
- **footer**: External regulation links, season closure notices

---

**WMAFacilitiesGrid** (SPEC-12)

```astro
<WMAFacilitiesGrid facilities={facilities} variant="white">
  <!-- Slot: accessibility-note (footer slot) -->
  <div slot="footer">
    <p class="text-sm text-brand-mud/75 italic">
      ♿ ADA-accessible parking and restrooms at main entrance.
      Contact DNR for mobility assistance: (304) 924-6211
    </p>
  </div>
</WMAFacilitiesGrid>
```

**Usage Scenarios**:

- **footer**: Accessibility details, facility hours, contact info for reservations

---

**WMARegulations** (SPEC-12)

```astro
<WMARegulations restrictions={restrictions} zone="Zone 3" variant="cream">
  <!-- Slot: footer (external links to DNR resources) -->
  <div slot="footer">
    <a href="https://wvdnr.gov/hunting/regulations/"
       target="_blank"
       rel="noopener noreferrer"
       class="text-sign-green hover:underline">
      WV DNR Hunting Regulations (opens in new tab) →
    </a>
  </div>
</WMARegulations>
```

**Usage Scenarios**:

- **footer**: Links to DNR regulation PDFs, zone maps, closure calendar

---

**AdventureGearChecklist** (SPEC-11)

```astro
<AdventureGearChecklist gear={gear} columns={3} variant="white">
  <!-- Slot: header-extra (above gear grid) -->
  <div slot="header-extra">
    <p class="text-brand-brown/75 mb-4">
      ⚠️ Cell service is spotty in the backcountry. Download offline maps before you go.
    </p>
  </div>

  <!-- Slot: cta (below gear grid) -->
  <div slot="cta">
    <a href="/shop/hunting" class="btn-primary">
      Shop All Hunting Gear →
    </a>
  </div>
</AdventureGearChecklist>
```

**Usage Scenarios**:

- **header-extra**: Terrain-specific warnings (cell coverage, water sources)
- **cta**: Shop cross-sell buttons

---

### 5.3 Slot Composition Patterns

**Pattern 1: Progressive Disclosure**

```astro
<!-- Base content ALWAYS visible -->
<WMASpeciesGrid species={species}>
  <!-- OPTIONAL: Advanced details for hunters who expand -->
  <details slot="footer" class="mt-4">
    <summary class="cursor-pointer text-sign-green font-bold">
      📊 Harvest Statistics (2023 Season)
    </summary>
    <div class="mt-2 text-sm text-brand-mud">
      <p>Total deer harvested: 1,247 (42% bucks, 58% does)</p>
      <p>Turkey harvest: 89 gobblers</p>
      <p>Success rate: 18% (deer), 12% (turkey)</p>
    </div>
  </details>
</WMASpeciesGrid>
```

**Pattern 2: Conditional Slot Content**

```astro
<!-- Show slot content ONLY during specific seasons -->
{season === 'fall' && (
  <div slot="intro">
    <p class="bg-brand-orange/10 border-l-4 border-brand-orange p-4 mb-4">
      🍂 <strong>Fall Alert:</strong> Acorn mast is excellent this year.
      Focus on oak ridges for deer activity.
    </p>
  </div>
)}
```

**Pattern 3: Nested Component Slots**

```astro
<!-- Use slot to inject another component -->
<WMAFacilitiesGrid facilities={facilities}>
  <div slot="footer">
    <!-- Inject weather widget component -->
    <WeatherWidget location="Elk River WMA" compact={true} />
  </div>
</WMAFacilitiesGrid>
```

---

## 6. Existing Component Integration

### 6.1 SPEC-09: AdventureHero Integration

**Current Implementation** (elk-river.astro lines 52-77):

```astro
<!-- BEFORE: Hardcoded hero section (26 lines of layout code) -->
<section class="bg-brand-brown text-white py-16 md:py-24 relative overflow-hidden">
  <div class="absolute inset-0 bg-camo opacity-5 pointer-events-none"></div>
  <div class="container mx-auto px-4 relative">
    <div class="max-w-3xl">
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="inline-block bg-sign-green text-white px-4 py-1 rounded-sm font-bold text-sm">
          15 min from shop
        </span>
        <span class="inline-block bg-brand-orange text-white px-4 py-1 rounded-sm font-bold text-sm">
          19,646 Acres
        </span>
      </div>
      <h1 class="font-display font-black text-4xl md:text-6xl mb-4">
        Elk River WMA
      </h1>
      <p class="text-xl md:text-2xl text-brand-cream/80 mb-6">
        West Virginia's oldest wildlife management area...
      </p>
    </div>
  </div>
</section>
```

**AFTER Integration** (2 lines of component usage):

```astro
<AdventureHero
  title="Elk River WMA"
  description="West Virginia's oldest wildlife management area. Nearly 20,000 acres of mature hardwoods, steep ridges, and plenty of deer and turkey."
  difficulty="moderate"
  season="Fall, Spring"
  driveTime="15 min from shop"
  image={heroImage}
  imageAlt="Aerial view of Elk River WMA mature hardwood forests"
  coordinates={{ lat: 38.6833, lng: -80.5833 }}
/>
```

**Reduction**: 26 lines → 2 lines (92% reduction)
**Benefits**:

- Automatic SEO schema injection via `schema-extra` slot
- Consistent badge styling across all WMAs
- Accessible heading hierarchy (h1 with proper aria-labelledby)
- Responsive image optimization (Astro Image component)

---

### 6.2 SPEC-10: AdventureQuickStats Integration

**Current Implementation** (elk-river.astro lines 80-101):

```astro
<!-- BEFORE: Hardcoded stats grid (22 lines of layout code) -->
<section class="py-8 bg-white border-b border-brand-brown/15">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <span class="block text-2xl font-bold text-brand-brown">19,646</span>
        <span class="text-sm text-brand-brown/60">Acres</span>
      </div>
      <div>
        <span class="block text-2xl font-bold text-brand-brown">15 min</span>
        <span class="text-sm text-brand-brown/60">From Shop</span>
      </div>
      <!-- ... 2 more stat blocks ... -->
    </div>
  </div>
</section>
```

**AFTER Integration** (1 line of component usage):

```astro
<AdventureQuickStats
  stats={[
    { value: '19,646', label: 'Acres', icon: 'area' },
    { value: '15 min', label: 'From Shop', icon: 'time' },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' },
    { value: 'Year-Round', label: 'Access', icon: 'calendar' }
  ]}
  columns={4}
  variant="white"
/>
```

**Reduction**: 22 lines → 1 line (95% reduction)
**Benefits**:

- Semantic `<dl>` markup for screen readers
- Icon system integration (STAT_ICON_PATHS from adventure.ts)
- Configurable column counts (2/3/4) for responsive grids
- Consistent spacing and typography across WMAs

---

### 6.3 SPEC-11: Shared Components Integration

**AdventureGettingThere** (replaces lines 212-245):

```astro
<!-- BEFORE: 34 lines of hardcoded directions -->
<section class="py-12 md:py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto">
      <h2 class="font-display font-bold text-2xl md:text-3xl text-brand-brown mb-8">
        Getting There
      </h2>
      <div class="bg-white p-6 rounded-sm border-l-4 border-sign-green mb-6">
        <h3 class="font-bold text-brand-brown mb-2">From Our Shop</h3>
        <ol class="text-brand-brown/75 space-y-2 list-decimal list-inside">
          <li>Head north on US-19 toward Sutton</li>
          <!-- ... more steps ... -->
        </ol>
      </div>
      <!-- ... more route blocks ... -->
    </div>
  </div>
</section>

<!-- AFTER: Component usage -->
<AdventureGettingThere
  routes={[
    {
      name: 'From Our Shop',
      steps: [
        'Head north on US-19 toward Sutton',
        'Turn east on WV-17 (about 3.7 miles southeast of Sutton)',
        'Follow DNR signs to Elk River section',
        'About 15 minutes total drive time'
      ],
      variant: 'green'
    },
    {
      name: 'From I-79',
      steps: [
        'Take Exit 67 (Flatwoods)',
        'Follow WV-4 south about 2 miles to WV-19/40',
        'Turn east on WV-17, follow DNR signs',
        'Stop by our shop on your way — we\'re at Exit 57 on US-19'
      ],
      variant: 'orange'
    }
  ]}
  variant="cream"
/>
```

**Reduction**: 34 lines → 1 component call
**Benefits**:

- Route variant colors (green/orange) for visual distinction
- Automatic numbered list semantics (`<ol>`)
- Slot for additional notes/parking info

---

**AdventureGearChecklist** (replaces lines 330-411):

```astro
<!-- BEFORE: 82 lines of hardcoded gear lists -->
<!-- AFTER: Component usage -->
<AdventureGearChecklist
  gear={[
    {
      category: 'Deer Hunting',
      items: [
        'Rifle and appropriate ammo',
        'Blaze orange (500 sq in required)',
        'WV hunting license + deer stamp',
        'Knife and game bags'
      ]
    },
    {
      category: 'Turkey Hunting',
      items: [
        'Shotgun + turkey loads',
        'Full camo (head to toe)',
        'Turkey calls (box/slate/diaphragm)',
        'WV license + turkey stamp'
      ]
    }
  ]}
  columns={2}
  variant="white"
>
  <p slot="intro" class="text-brand-brown/75 mb-8">
    We've got most of this in stock. Stop by before you head out.
  </p>
  <div slot="cta" class="text-center">
    <a href="/shop" class="btn-primary">Browse Our Gear</a>
  </div>
</AdventureGearChecklist>
```

**Reduction**: 82 lines → 1 component call
**Benefits**:

- Responsive grid layout (1-4 columns)
- Checkmark icons for visual scanning
- Shop cross-sell integration via CTA slot

---

**AdventureRelatedShop** (new bottom section):

```astro
<AdventureRelatedShop
  categories={[
    {
      name: 'Hunting Gear',
      slug: '/shop/hunting',
      description: 'Rifles, ammo, blaze orange, game bags'
    },
    {
      name: 'Fishing Tackle',
      slug: '/shop/fishing',
      description: 'Smallmouth bass lures, trout flies, waders'
    },
    {
      name: 'Camping Equipment',
      slug: '/shop/camping',
      description: 'Tents, sleeping bags, camp stoves'
    }
  ]}
  variant="white"
/>
```

**Benefits**:

- Automatic category card layout
- Shop link integration
- Conversion funnel optimization (placed at page bottom)

---

### 6.4 Integration Summary Table

| Component | SPEC | Lines Before | Lines After | Reduction | Key Benefit |
|-----------|------|--------------|-------------|-----------|-------------|
| AdventureHero | 09 | 26 | 2 | 92% | SEO schema, responsive images |
| AdventureQuickStats | 10 | 22 | 1 | 95% | Semantic markup, icon system |
| AdventureGettingThere | 11 | 34 | 1 | 97% | Route variants, slots |
| AdventureGearChecklist | 11 | 82 | 1 | 99% | Grid layout, shop cross-sell |
| AdventureRelatedShop | 11 | 0 | 1 | NEW | Conversion funnel |
| **TOTAL** | | **164** | **6** | **96%** | Systematic reduction |

**Additional WMA-Specific Components** (SPEC-12):

- WMASpeciesGrid (replaces lines 104-172: 68 lines → 1 component)
- WMAFishingWaters (replaces lines 175-209: 34 lines → 1 component)
- WMAFacilitiesGrid (replaces lines 248-327: 79 lines → 1 component)
- WMARegulations (new section for safety/legal)
- WMACampingList (new section for overnight info)

**Grand Total Reduction**:

- **Before**: 533 lines (layout + content mixed)
- **After**: ~150 lines (pure content configuration)
- **Reduction**: 73% fewer lines per WMA page

---

## 7. Complete WMA Template Example

### 7.1 Minimal Template (Bare Bones)

```astro
---
// elk-river.astro (MINIMAL - 50 lines)
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import AdventureHero from '../../components/adventure/AdventureHero.astro';
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';

const heroImage = await import('../../assets/wma/elk-river-hero.jpg');
---

<Layout title="Elk River WMA | WV Wild Outdoors" description="...">
  <Header />
  <main class="bg-brand-cream min-h-screen">
    <AdventureHero
      title="Elk River WMA"
      description="West Virginia's oldest wildlife management area."
      difficulty="moderate"
      season="Fall, Spring"
      driveTime="15 min"
      image={heroImage}
      imageAlt="Elk River WMA mature hardwoods"
    />
    <AdventureQuickStats
      stats={[
        { value: '19,646', label: 'Acres', icon: 'area' },
        { value: '15 min', label: 'From Shop', icon: 'time' }
      ]}
      variant="white"
    />
  </main>
  <Footer />
</Layout>
```

**Use Case**: Rapid prototyping new WMA pages with minimal data
**Line Count**: ~50 lines (vs. 533 in current elk-river.astro)

---

### 7.2 Complete Template (Full-Featured)

```astro
---
// elk-river.astro (COMPLETE - 150 lines)
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';

// SPEC-09/10/11 Components
import AdventureHero from '../../components/adventure/AdventureHero.astro';
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';
import AdventureGettingThere from '../../components/adventure/AdventureGettingThere.astro';
import AdventureGearChecklist from '../../components/adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../../components/adventure/AdventureRelatedShop.astro';

// SPEC-12 WMA Components
import WMASpeciesGrid from '../../components/wma/WMASpeciesGrid.astro';
import WMAFishingWaters from '../../components/wma/WMAFishingWaters.astro';
import WMAFacilitiesGrid from '../../components/wma/WMAFacilitiesGrid.astro';
import WMACampingList from '../../components/wma/WMACampingList.astro';
import WMARegulations from '../../components/wma/WMARegulations.astro';

const heroImage = await import('../../assets/wma/elk-river-hero.jpg');

// Content configuration (pure data)
const wmaData = {
  hero: {
    title: "Elk River WMA",
    description: "West Virginia's oldest wildlife management area. Nearly 20,000 acres of mature hardwoods, steep ridges, and plenty of deer and turkey.",
    difficulty: "moderate",
    season: "Fall, Spring",
    driveTime: "15 min from shop",
    image: heroImage,
    imageAlt: "Aerial view of Elk River WMA mature hardwood forests",
    coordinates: { lat: 38.6833, lng: -80.5833 }
  },

  stats: [
    { value: '19,646', label: 'Acres', icon: 'area' },
    { value: '15 min', label: 'From Shop', icon: 'time' },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' },
    { value: 'Year-Round', label: 'Access', icon: 'calendar' }
  ],

  hunting: {
    species: [
      {
        name: 'White-tailed Deer',
        category: 'big-game',
        season: 'Nov - Dec (firearms), Sep - Jan (archery)',
        description: 'Brushlands and mixed timber provide excellent deer hunting...',
        tips: 'Brushland edges and regenerating cuts. Creek bottoms when the rut kicks in.',
        kimNote: 'Wind can be tricky in the steep terrain — play it carefully.'
      },
      {
        name: 'Wild Turkey',
        category: 'turkey',
        season: 'Apr - May (spring gobbler)',
        description: 'The mature hardwood forests make turkey hunting particularly good here.',
        tips: 'Ridge tops in mature timber for roosting birds. Old logging roads for strutting.'
      },
      // ... more species
    ]
  },

  fishing: {
    waters: [
      {
        name: 'Elk River & Holly River',
        type: 'river',
        species: ['Smallmouth Bass', 'Largemouth Bass', 'Spotted Bass', 'Channel Catfish', 'Trout'],
        access: 'Multiple bank access points along Airport Rd',
        regulations: 'Standard WV fishing regulations apply'
      },
      {
        name: 'Sutton Lake & Tailwaters',
        type: 'lake',
        species: ['Largemouth Bass', 'Crappie', 'Bluegill', 'Walleye', 'Muskellunge'],
        access: 'WMA borders lake with multiple access points',
        regulations: 'Trout stocking Feb-May in tailwaters'
      }
    ]
  },

  facilities: [
    { type: 'Parking Areas', count: 6, description: 'Gravel lots at major access points', icon: 'parking' },
    { type: 'Shooting Ranges', count: 2, description: '100-yard and 175-yard ranges', icon: 'target' },
    { type: 'Boat Ramps', count: 2, description: 'Concrete ramps on Sutton Lake', icon: 'boat' },
    { type: 'Class-Q Areas', description: 'Accessible hunting areas', icon: 'accessibility' }
  ],

  camping: {
    sites: 252,
    types: [
      { name: 'Tent & Trailer Sites', count: 240, amenities: ['Electric', 'Water'] },
      { name: 'Primitive Sites', count: 12, amenities: ['Fire Ring', 'Picnic Table'] }
    ],
    season: 'Open year-round'
  },

  regulations: {
    zone: 'Zone 3',
    restrictions: [
      'WMA closed during controlled deer hunts - check DNR calendar',
      'Blaze orange required during firearms seasons (500 sq in)',
      'Check zone boundaries before you set up - DNR enforces strictly',
      'No hunting within 200 yards of boat ramps or shooting ranges',
      'Bear Damage Stamp required for bear hunting'
    ],
    additionalInfo: 'Contact DNR District 4 office: (304) 924-6211'
  },

  gettingThere: {
    routes: [
      {
        name: 'From Our Shop',
        steps: [
          'Head north on US-19 toward Sutton',
          'Turn east on WV-17 (about 3.7 miles southeast of Sutton)',
          'Follow DNR signs to Elk River section',
          'About 15 minutes total drive time'
        ],
        variant: 'green'
      },
      {
        name: 'From I-79',
        steps: [
          'Take Exit 67 (Flatwoods)',
          'Follow WV-4 south about 2 miles to WV-19/40',
          'Turn east on WV-17, follow DNR signs',
          'Stop by our shop on your way — we\'re at Exit 57 on US-19'
        ],
        variant: 'orange'
      }
    ]
  },

  gear: [
    {
      category: 'Deer Hunting',
      items: [
        'Rifle and appropriate ammo',
        'Blaze orange (500 sq in required)',
        'WV hunting license + deer stamp',
        'Knife and game bags'
      ]
    },
    {
      category: 'Turkey Hunting',
      items: [
        'Shotgun + turkey loads',
        'Full camo (head to toe)',
        'Turkey calls (box/slate/diaphragm)',
        'WV license + turkey stamp'
      ]
    }
  ],

  relatedShop: {
    categories: [
      { name: 'Hunting Gear', slug: '/shop/hunting', description: 'Rifles, ammo, blaze orange, game bags' },
      { name: 'Fishing Tackle', slug: '/shop/fishing', description: 'Smallmouth bass lures, trout flies, waders' },
      { name: 'Camping Equipment', slug: '/shop/camping', description: 'Tents, sleeping bags, camp stoves' }
    ]
  }
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Hunt Near Us', url: '/near/' },
  { name: 'Elk River WMA', url: '/near/elk-river/' }
];
---

<Layout
  title="Elk River WMA Hunting & Fishing Guide | WV Wild Outdoors"
  description="Hunting and fishing guide for Elk River Wildlife Management Area. Nearly 20,000 acres of public land, 15 minutes from our shop."
>
  <Header />
  <Breadcrumb items={breadcrumbItems} />

  <main class="bg-brand-cream min-h-screen">
    <!-- Canonical section order with background alternation -->
    <AdventureHero {...wmaData.hero} />

    <AdventureQuickStats
      stats={wmaData.stats}
      columns={4}
      variant="white"
    />

    <WMASpeciesGrid
      species={wmaData.hunting.species}
      variant="cream"
    />

    <WMAFishingWaters
      waters={wmaData.fishing.waters}
      variant="white"
    />

    <AdventureGettingThere
      routes={wmaData.gettingThere.routes}
      variant="cream"
    />

    <WMAFacilitiesGrid
      facilities={wmaData.facilities}
      variant="white"
    >
      <div slot="footer">
        <p class="text-sm text-brand-mud/75 italic">
          ♿ ADA-accessible parking and restrooms at main entrance
        </p>
      </div>
    </WMAFacilitiesGrid>

    <WMACampingList
      sites={wmaData.camping.sites}
      types={wmaData.camping.types}
      season={wmaData.camping.season}
      variant="cream"
    />

    <AdventureGearChecklist
      gear={wmaData.gear}
      columns={2}
      variant="white"
    >
      <p slot="intro" class="text-brand-brown/75 mb-8">
        We've got most of this in stock. Stop by before you head out.
      </p>
      <div slot="cta" class="text-center">
        <a href="/shop" class="btn-primary">Browse Our Gear</a>
      </div>
    </AdventureGearChecklist>

    <WMARegulations
      zone={wmaData.regulations.zone}
      restrictions={wmaData.regulations.restrictions}
      additionalInfo={wmaData.regulations.additionalInfo}
      variant="cream"
    >
      <div slot="footer">
        <a
          href="https://wvdnr.gov/hunting/regulations/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sign-green hover:underline"
        >
          WV DNR Hunting Regulations (opens in new tab) →
        </a>
      </div>
    </WMARegulations>

    <AdventureRelatedShop
      categories={wmaData.relatedShop.categories}
      variant="white"
    />
  </main>

  <Footer />
</Layout>
```

**Line Count**: ~150 lines (vs. 533 in current implementation)
**Reduction**: 73% fewer lines
**Maintainability**: Change navigation once → updates all 8 WMAs automatically

---

## 8. Architecture Decision Records (ADRs)

### ADR-001: Layout Component over Dynamic Route

**Status**: Accepted
**Date**: 2025-12-27

**Context**:
Need to standardize 8+ WMA pages while allowing per-page customization (e.g., special events, seasonal promotions).

**Decision**:
Use layout component pattern (`WMATemplate.astro` imported by individual pages) instead of dynamic route pattern (`[...slug].astro` fetching Content Collections).

**Consequences**:

- ✅ Kim can customize specific WMA pages via slot injection
- ✅ Incremental migration: convert pages one-by-one vs. all-at-once
- ✅ Easier debugging: each page is explicit file vs. dynamic lookup
- ❌ Slight code duplication: each page imports template manually
- ❌ Must manually propagate template updates (mitigated by component reuse)

---

### ADR-002: Variant System for Background Alternation

**Status**: Accepted
**Date**: 2025-12-27

**Context**:
Visual monotony from all-cream or all-white backgrounds makes content hard to scan.

**Decision**:
Implement `variant` prop on all section components supporting `'white' | 'cream'` values. Template enforces alternation pattern: white → cream → white → cream.

**Consequences**:

- ✅ Improved scanability: background changes mark section boundaries
- ✅ WVWO aesthetic compliance: cream/white palette matches brand
- ✅ Accessibility: maintains 4.5:1+ contrast ratio on both backgrounds
- ❌ Requires manual variant assignment (no automatic calculation in template)
- ❌ Edge case complexity when sections conditionally render (variant gaps)

---

### ADR-003: Conditional Rendering at Component Level

**Status**: Accepted
**Date**: 2025-12-27

**Context**:
Not all WMAs have fishing waters, camping, or all facilities. Need to hide sections when data is missing without breaking layout.

**Decision**:
Each component implements internal conditional rendering. Template always calls all components; components self-hide when data is undefined/empty.

**Consequences**:

- ✅ Template remains simple: no complex `{#if}` blocks
- ✅ Graceful degradation: minimal-data WMAs still render functional pages
- ✅ DRY principle: conditional logic lives in component, not duplicated across 8 WMA pages
- ❌ Components must handle null/undefined props safely
- ❌ Slightly slower rendering (components evaluate conditionals even when hidden)

---

### ADR-004: Slot-Based Customization over Prop Explosion

**Status**: Accepted
**Date**: 2025-12-27

**Context**:
Need to support custom content (Kim's notes, seasonal alerts, external links) without adding 20+ optional props to each component.

**Decision**:
Use Astro named slots (`intro`, `footer`, `cta`, `aside`) for content injection points instead of props for every possible custom field.

**Consequences**:

- ✅ Unlimited flexibility: Kim can inject any HTML/components via slots
- ✅ No prop explosion: components stay focused with 5-8 props max
- ✅ Type safety maintained: TypeScript enforces required props, slots are optional
- ❌ Slot content not validated: Kim could inject invalid HTML
- ❌ Slightly more verbose: `<div slot="footer">` vs. `footer={text}`

---

## 9. Summary

### 9.1 Architecture Principles

1. **Separation of Concerns**: Content (WMA pages) separated from structure (components)
2. **DRY Principle**: Layout logic lives in components, not duplicated across 8 pages
3. **Progressive Enhancement**: Pages work with minimal data, improve with full content
4. **Graceful Degradation**: Missing sections hide cleanly, no broken layouts
5. **WVWO Aesthetic Compliance**: All components enforce brand palette, typography, spacing

### 9.2 Integration Checklist

**For Each New WMA Page**:

- [ ] Hero section uses `AdventureHero` component (SPEC-09)
- [ ] Stats grid uses `AdventureQuickStats` component (SPEC-10)
- [ ] Getting There uses `AdventureGettingThere` component (SPEC-11)
- [ ] Gear checklist uses `AdventureGearChecklist` component (SPEC-11)
- [ ] Shop cross-sell uses `AdventureRelatedShop` component (SPEC-11)
- [ ] Hunting info uses `WMASpeciesGrid` component (SPEC-12)
- [ ] Fishing info uses `WMAFishingWaters` component (SPEC-12)
- [ ] Facilities use `WMAFacilitiesGrid` component (SPEC-12)
- [ ] Camping uses `WMACampingList` component (SPEC-12)
- [ ] Regulations use `WMARegulations` component (SPEC-12)
- [ ] Background variants alternate: white → cream → white → cream
- [ ] Sections conditionally render based on data presence
- [ ] Slot usage documented for custom content injection

### 9.3 Success Metrics

**Code Reduction**:

- **Before**: 533 lines per WMA page (4,264 total across 8 pages)
- **After**: 150 lines per WMA page (1,200 total)
- **Savings**: 3,064 lines removed (73% reduction)

**Maintainability**:

- Navigation changes: 1 commit → 8 pages updated automatically
- Component improvements: Propagate to all WMAs instantly
- New WMA addition: 30 minutes vs. 2+ hours (87% time savings)

**User Experience**:

- Consistent layout across all WMA pages
- Predictable navigation patterns
- Accessible WCAG 2.1 AA compliant structure
- Fast load times (<2s on 3G per NFR requirements)

---

## Appendices

### A. Component Props Reference

See SPEC-12-API-INTERFACE-DESIGN.md for complete TypeScript interfaces.

### B. Background Variant Matrix

| Section | Position | Variant | Color | Use Case |
|---------|----------|---------|-------|----------|
| AdventureHero | 1 | brown | #3E2723 | Hero (always dark) |
| AdventureQuickStats | 2 | white | #FFFFFF | Clean stats grid |
| WMASpeciesGrid | 3 | cream | #FFF8E1 | Warm hunting content |
| WMAFishingWaters | 4 | white | #FFFFFF | Clean water body cards |
| AdventureGettingThere | 5 | cream | #FFF8E1 | Soft route instructions |
| WMAFacilitiesGrid | 6 | white | #FFFFFF | Clean facility grid |
| WMACampingList | 7 | cream | #FFF8E1 | Warm overnight info |
| AdventureGearChecklist | 8 | white | #FFFFFF | Clean checklist grid |
| WMARegulations | 9 | cream | #FFF8E1 | Orange accent for safety |
| AdventureRelatedShop | 10 | white | #FFFFFF | Clean shop CTA |

### C. Migration Roadmap

**Phase 1** (SPEC-12 Implementation):

- Create 5 new WMA-specific components
- Extend adventures schema with 8 optional fields
- Build integration tests for component composition

**Phase 2** (SPEC-21+):

- Migrate elk-river.astro to template (reference implementation)
- Test with real production data
- Document any template adjustments needed

**Phase 3** (Future):

- Migrate remaining 7 WMA pages
- Archive old hardcoded sections
- Celebrate 73% codebase reduction 🎉
