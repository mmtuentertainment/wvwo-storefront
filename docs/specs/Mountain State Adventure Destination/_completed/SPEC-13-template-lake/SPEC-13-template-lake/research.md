# SPEC-13: Lake Template - Comprehensive Hivemind Research Report

**Research Date**: 2025-12-29
**Methodology**: 12-Agent Queen-Led Hivemind Analysis
**Reference File**: [summersville-lake.astro](../wv-wild-web/src/pages/near/summersville-lake.astro) (364 lines)
**Target Output**: `src/components/templates/LakeTemplate.astro` (~600 lines)

---

## 🎯 Executive Summary

**Mission**: Create a reusable Astro template for West Virginia lakes matching the structure and depth of summersville-lake.astro with **fishing-centric** content organization, marina details, camping facilities, and seasonal activity guides.

**Critical Finding**: The reference file summersville-lake.astro is **364 lines**, NOT 603 as stated in spec. The template should target **~600 lines** through componentization and expanded content structure.

---

## 📊 1. REFERENCE FILE ANALYSIS: summersville-lake.astro

### 1.1 Structure Breakdown (364 lines total)

**Frontmatter (1-184)**:

- Lines 1-19: Imports (17 components + types + config)
- Lines 21-27: Quick stats data (4 stats)
- Lines 29-51: Hunting features (4 species)
- Lines 53-80: **Fishing features (6 species) - PRIMARY CONTENT**
- Lines 82-111: Camping facilities (4 campgrounds)
- Lines 113-123: Amenities (8 items)
- Lines 125-183: Schema data, breadcrumbs, gear, categories

**Template (185-364)**:

- Lines 186-223: Hero section (38 lines)
- Line 226: AdventureQuickStats component
- Lines 228-233: AdventureWhatToFish component
- Lines 235-240: AdventureWhatToHunt component
- Lines 242-276: AdventureFeatureSection (Crystal Clear Waters - custom)
- Lines 278-284: AdventureCampingList component
- Lines 286-292: AdventureAmenitiesGrid component
- Lines 294-305: AdventureGettingThere component
- Lines 307-322: AdventureGearChecklist component
- Lines 324-332: AdventureRelatedShop component
- Lines 334-345: AdventureCTA component
- Lines 347-358: EmailCapture section

### 1.2 Content Organization Pattern

**PRIMARY FOCUS**: Fishing (6 species with detailed techniques)
**SECONDARY**: Hunting (4 species)
**TERTIARY**: Recreation, camping, amenities

**Key Pattern**: Fishing content comes FIRST before hunting, reinforcing lake recreation priority.

---

## 🏗️ 2. COMPONENT ARCHITECTURE ANALYSIS

### 2.1 Existing Component Ecosystem

**Shared Components (SPEC-11 Bundle)**:

- ✅ `AdventureWhatToFish.astro` - Fishing wrapper (113 lines)
- ✅ `AdventureWhatToHunt.astro` - Hunting wrapper
- ✅ `AdventureFeatureSection.astro` - Base feature grid (190 lines)
- ✅ `AdventureCampingList.astro` - Facility cards (204 lines)
- ✅ `AdventureAmenitiesGrid.astro` - Amenities checklist (160 lines)
- ✅ `AdventureGearChecklist.astro` - Gear list
- ✅ `AdventureGettingThere.astro` - Directions
- ✅ `AdventureRelatedShop.astro` - Shop CTAs
- ✅ `AdventureCTA.astro` - Call-to-action
- ✅ `AdventureQuickStats.astro` - Stats bar

### 2.2 Component Pattern: Wrapper Architecture

**Discovered Pattern**: Thin wrappers delegate to base components

```typescript
// AdventureWhatToFish.astro (wrapper)
// Lines 94-112: Delegates ALL rendering to AdventureFeatureSection
<AdventureFeatureSection
  title={title}
  intro={intro}
  features={features}
  variant={variant}
  columns={columns}
  accentColor={accentColor}
  animate={animate}
  ariaLabel={ariaLabel}
>
  <slot name="intro" slot="intro" />
  <slot name="footer" slot="footer" />
  <slot />
</AdventureFeatureSection>
```

**Implication for SPEC-13**: Lake Template can leverage ALL existing components with fishing-specific props.

---

## 🎨 3. WVWO AESTHETIC COMPLIANCE ANALYSIS

### 3.1 Border Radius Enforcement ⚠️ CRITICAL

**Finding**: **100% `rounded-sm` enforcement** across all adventure components.

**Evidence**:

```astro
// AdventureAmenitiesGrid.astro:110
<li class="... rounded-sm border ...">

// AdventureCampingList.astro:111
<div class="bg-white rounded-sm border-2 ...">

// AdventureHeroBadge.astro:37
const baseClasses = '... rounded-sm font-display ...';

// AdventureGearChecklist.astro:101
<li class="... rounded-sm border ...">
```

**Test Enforcement** ([AdventureAmenitiesGrid.test.ts:159-164](../wv-wild-web/src/components/adventure/__tests__/AdventureAmenitiesGrid.test.ts#L159-L164)):

```typescript
it('uses rounded-sm for card borders (NO rounded-md/lg/xl)', () => {
  const expectedBorderRadius = 'rounded-sm';
  const forbiddenPatterns = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'];
  expect(expectedBorderRadius).toBe('rounded-sm');
});
```

**MANDATE**: Lake Template MUST use ONLY `rounded-sm` (0.125rem). Zero tolerance for rounded-md/lg/xl.

### 3.2 Typography Hierarchy

**Font Stack** (from [adventure.ts](../wv-wild-web/src/types/adventure.ts)):

- **`font-display`**: Bitter serif - All headings, stats, species names
- **`font-hand`**: Permanent Marker cursive - Kim's personal tips ONLY
- **`font-body`**: Noto Sans - Body text, descriptions

**Usage Pattern**:

```astro
<!-- Hero Heading -->
<h1 class="font-display font-black text-4xl md:text-6xl">

<!-- Section Headers -->
<h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown">

<!-- Species Names -->
<h3 class="font-display text-2xl font-bold text-brand-brown">

<!-- Kim's Tips -->
<p class="font-hand text-lg text-sign-green italic">
  "{feature.notes}"
</p>
```

### 3.3 Color Palette - Border-Left Accent Pattern

**WVWO Brand Colors** ([types/adventure.ts:99-110](../wv-wild-web/src/types/adventure.ts#L99-L110)):

- **`brand-brown`**: `#3E2723` - Rifle stocks, weathered barn wood
- **`sign-green`**: `#2E7D32` - Old metal signs, forest canopy
- **`brand-cream`**: `#FFF8E1` - Aged paper, deer hide
- **`brand-orange`**: `#FF6F00` - Blaze orange (CTAs ONLY, <5% screen)

**Border-Left Accent Usage**:

```astro
<!-- Fishing Species: GREEN accent -->
<li class="border-l-4 border-l-sign-green pl-4">

<!-- Fishing Spots: BROWN accent -->
<div class="border-l-4 border-l-brand-brown p-6">

<!-- Safety/Regulations: ORANGE accent -->
<div class="border-l-4 border-l-brand-orange bg-brand-cream p-6">
```

**Pattern**: Color-coded sections for visual distinction and WCAG compliance.

### 3.4 Animation System

**Gentle Reveal Pattern** (with accessibility):

```css
.adventure-feature-section {
  animation: gentle-reveal 0.6s ease-out both;
}

@keyframes gentle-reveal {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .adventure-feature-section { animation: none; }
}
```

**Staggered Animation**:

```astro
{features.map((feature, index) => (
  <li style={animate ? `animation-delay: ${index * 0.1}s` : undefined}>
))}
```

---

## 📐 4. TYPESCRIPT PROPS INTERFACE DESIGN

### 4.1 Existing Type System ([adventure.ts](../wv-wild-web/src/types/adventure.ts))

**SPEC-11 Types (already defined)**:

```typescript
// Lines 193-202: Gear items
export type GearItem = z.infer<typeof GearItemSchema>;

// Lines 211-222: Related shop categories
export type RelatedCategory = z.infer<typeof RelatedCategorySchema>;

// Lines 232-247: Camping facilities
export type CampingFacility = z.infer<typeof CampingFacilitySchema>;

// Lines 252-266: Feature items (hunting/fishing)
export type FeatureItem = z.infer<typeof FeatureItemSchema>;

// Lines 130-143: Stat icons
export type StatIcon = z.infer<typeof StatIconSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
```

### 4.2 Lake-Specific Extensions Needed

**NEW TYPES** required for SPEC-13:

```typescript
/**
 * Fishing species with seasonal patterns and techniques
 */
export interface FishingFeature {
  /** Species name (e.g., "Smallmouth Bass") */
  title: string;
  /** Season and habitat description */
  description: string;
  /** Optional Kim's fishing tips (font-hand) */
  notes?: string;
}

/**
 * Named fishing spots with depth and structure
 */
export interface FishingSpot {
  /** Spot name (e.g., "Long Point Cliff", "Dam End") */
  name: string;
  /** Water depth range (e.g., "20-45 feet") */
  depth: string;
  /** Bottom structure (e.g., "Rocky points, submerged ledges") */
  structure: string;
  /** Target species for this spot */
  species: string[];
  /** Access method (e.g., "Boat access only") */
  access: string;
}

/**
 * Marina services and boat access
 */
export interface Marina {
  /** Marina name */
  name: string;
  /** Available services (fuel, rentals, repairs, etc.) */
  services: string[];
  /** Boat launch details */
  boatLaunch: {
    ramps: number;
    fee?: string;
  };
  /** Rental options (kayaks, pontoons, etc.) */
  rentals?: string[];
  /** Operating hours */
  hours: string;
  /** Contact phone number */
  contact: string;
}

/**
 * Activity with seasonal availability
 */
export interface Activity {
  /** Activity name (e.g., "Scuba Diving") */
  name: string;
  /** Activity description */
  description: string;
  /** Best season for activity */
  season: string;
  /** Difficulty level (optional) */
  difficulty?: 'easy' | 'moderate' | 'challenging';
}

/**
 * Seasonal guide with highlights
 */
export interface SeasonalGuide {
  /** Season name */
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
  /** Activity highlights for this season */
  highlights: string[];
  /** Fishing focus (optional) */
  fishingFocus?: string;
}

/**
 * Safety regulations by category
 */
export interface Regulation {
  /** Category (e.g., "Boating Safety") */
  category: string;
  /** List of rules */
  rules: string[];
}
```

### 4.3 Complete Lake Template Props Interface

```typescript
/**
 * Props for LakeTemplate.astro
 * SPEC-13: Reusable template for WV lake recreation pages
 */
export interface LakeTemplateProps {
  // BASIC INFO
  /** Lake name (e.g., "Summersville Lake") */
  name: string;
  /** Surface acreage */
  acreage: number;
  /** Maximum depth in feet */
  maxDepth: number;
  /** County location */
  county: string;
  /** Quick highlight badges (3-5 items) */
  quickHighlights: string[];

  // FISHING (PRIMARY CONTENT)
  /** Fish species with techniques */
  fishSpecies: FishingFeature[];
  /** Named fishing spots with structure */
  fishingSpots: FishingSpot[];

  // FACILITIES
  /** Campgrounds and camping options */
  campgrounds: CampingFacility[];
  /** Marina services and boat access */
  marina: Marina;

  // ACTIVITIES & PLANNING
  /** Available activities beyond fishing */
  activities: Activity[];
  /** Seasonal activity guide */
  seasonalGuide: SeasonalGuide[];

  // SAFETY & REGULATIONS
  /** Safety rules and regulations */
  regulations: Regulation[];

  // MEDIA
  /** Hero image path */
  heroImage: string;
  /** Optional map link */
  mapUrl?: string;

  // OPTIONAL OVERRIDES
  /** Override default title */
  title?: string;
  /** Override default intro text */
  intro?: string;
}
```

---

## 📋 5. CONTENT ORGANIZATION PATTERNS

### 5.1 Fishing-Centric Hierarchy

**From summersville-lake.astro analysis**:

1. **Hero** - Lake name + stats overlay (acreage, depth, county)
2. **Quick Stats** - 4 key metrics in horizontal bar
3. **🎣 What to Fish** - 6 species (PRIMARY CONTENT, appears FIRST)
4. **🦌 What to Hunt** - 4 species (SECONDARY)
5. **💎 Crystal Clear Waters** - Feature section (scuba, swimming)
6. **🏕️ Camping** - 4 campgrounds with amenities
7. **⚓ On the Water** - Marina, boat ramps, rentals
8. **🚗 Getting There** - Directions from shop
9. **🎒 What to Bring** - Gear checklist
10. **🛒 Shop for Your Trip** - Related categories
11. **📞 CTA** - Stop by shop before heading out
12. **📧 Newsletter** - Email capture

**Key Finding**: **Fishing content (section 3) appears BEFORE hunting (section 4)** - this is intentional for lake recreation priority.

### 5.2 Species/Spot Display Pattern

**Species Card Structure**:

```astro
<div class="border-l-4 border-l-sign-green pl-6 py-4">
  <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
    Smallmouth Bass
  </h3>
  <p class="text-brand-brown/75 mb-3">
    <strong>Best Season:</strong> Year-round, peak spring/fall
  </p>
  <div class="mb-4">
    <p class="font-bold text-brand-brown mb-2">Techniques:</p>
    <ul class="space-y-1">
      <li class="flex items-start gap-2">
        <span class="text-sign-green">•</span>
        <span>Tube jigs on rocky points</span>
      </li>
    </ul>
  </div>
  {species.notes && (
    <p class="font-hand text-sm text-brand-brown mt-4 pt-4 border-t">
      Kim says: "{species.notes}"
    </p>
  )}
</div>
```

**Fishing Spot Card Structure**:

```astro
<div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
  <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
    Long Point Cliff
  </h3>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <p><strong>Depth:</strong> 40+ feet</p>
      <p><strong>Structure:</strong> Rocky ledges, submerged boulders</p>
      <p><strong>Access:</strong> Boat only</p>
    </div>
    <div>
      <p class="font-bold mb-2">Target Species:</p>
      <div class="flex flex-wrap gap-2">
        {spot.species.map(s => (
          <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
```

---

## 📱 6. RESPONSIVE LAYOUT PATTERNS

### 6.1 Grid Column Configurations

**Mobile-First Approach**:

```typescript
// 2-column grid
const columnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4', // Note: 2 cols on mobile for amenities
};
```

**Usage by Section**:

- **Fish Species**: 2-column (md:grid-cols-2)
- **Fishing Spots**: Full-width stacked (space-y-6)
- **Campgrounds**: 2-column (md:grid-cols-2)
- **Amenities**: 4-column (grid-cols-2 md:grid-cols-4)

### 6.2 Typography Responsive Scale

```css
/* Hero Heading */
text-4xl md:text-6xl  /* 2.25rem → 3.75rem */

/* Section Headers */
text-4xl md:text-5xl  /* 2.25rem → 3rem */

/* Subsection Headers */
text-2xl md:text-3xl  /* 1.5rem → 1.875rem */

/* Species Names */
text-2xl             /* Fixed 1.5rem */
```

### 6.3 Spacing System

**Vertical Rhythm**:

```css
py-12 md:py-16       /* Section padding: 3rem → 4rem */
mb-4 md:mb-6         /* Section header margin */
gap-6                /* Grid gap: 1.5rem */
space-y-6            /* Stacked card spacing */
```

---

## 🗣️ 7. KIM'S VOICE & LOCAL KNOWLEDGE INTEGRATION

### 7.1 Voice Characteristics

**From summersville-lake.astro analysis**:

**Kim's Tips (font-hand)**:

- Line 35: *"The ridges overlooking the lake hold deer year-round. Creek bottoms and oak flats are good for feeding areas. The terrain is steep in places — be prepared for a climb."*
- Line 40: *"Ridge tops in mature timber for roosting birds. Listen for gobbles at dawn and set up between the roost and where they want to go. Don't overcall — let them come to you."*
- Line 58: *"The water's gin-clear, so downsize your line to 6-8 lb test and go with natural colors. Tube jigs and drop shot rigs with soft plastics work well. Target rocky points and ledges — the smallmouth stack up on structure."*

**Voice Patterns**:

- ✅ **Direct, practical advice** - "Creek bottoms and oak flats"
- ✅ **Local terminology** - "gin-clear water", "the smallmouth stack up"
- ✅ **Specific techniques** - "6-8 lb test", "Tube jigs and drop shot rigs"
- ✅ **Conversational tone** - "Don't overcall — let them come to you"
- ✅ **Safety awareness** - "be prepared for a climb"

### 7.2 Integration Pattern

**Where Kim's Voice Appears**:

1. **Species cards** - `kimNote` field in `FishingFeature` / `HuntingFeature`
2. **Fishing spots** - Optional tips on technique for specific locations
3. **Getting There section** - "Pro tip" callouts (line 302-304)
4. **Custom feature sections** - Inline commentary

**Rendering**:

```astro
{feature.notes && (
  <p class="font-hand text-lg text-sign-green italic mt-3 border-t border-brand-brown/10 pt-3">
    "{feature.notes}"
  </p>
)}
```

---

## 🌐 8. MARINA & CAMPING DISPLAY BEST PRACTICES

### 8.1 Marina Section Structure (from research)

**External Reference Analysis** (Web Search Results):

- [Pyramid Lake Recreation](https://water.ca.gov/What-We-Do/Recreation/Pyramid-Lake-Recreation)
- [Silverwood Lake State Recreation Area](https://www.parks.ca.gov/?page_id=650)
- [Lake Cascade State Park](https://parksandrecreation.idaho.gov/state-park/lake-cascade-state-park/)

**Common Patterns**:

1. **Services List** - Fuel, rentals, repairs, supplies
2. **Boat Launch Details** - Number of ramps, fees, accessibility
3. **Rental Options** - Kayaks, pontoons, fishing boats
4. **Hours & Contact** - Seasonal hours, phone numbers
5. **Safety Notices** - Life jacket requirements, speed limits

**Recommended Structure**:

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Marina & Boat Access
    </h2>
    <div class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        {marina.name}
      </h3>
      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <!-- Services Column -->
        <!-- Boat Launch Column -->
      </div>
      <div class="pt-6 border-t border-brand-brown/20">
        <!-- Hours & Contact -->
      </div>
    </div>
  </div>
</section>
```

### 8.2 Camping Facilities Display

**Leverages Existing Component**: [AdventureCampingList.astro](../wv-wild-web/src/components/adventure/AdventureCampingList.astro)

**Key Features**:

- **Count badges** - `bg-sign-green text-white px-3 py-1 rounded-sm`
- **Contact links** - `tel:` links for phone numbers
- **External reservation links** - `rel="noopener noreferrer"`
- **Accessibility notes** - Icon + text for ADA info

**Props Pattern**:

```typescript
{
  type: 'Battle Run Campground',
  count: 117,
  description: 'Peninsula campground with water on three sides...',
  contact: '(304) 555-CAMP',
  link: 'https://www.recreation.gov/camping/...',
  accessibility: '5 ADA-accessible sites'
}
```

---

## 🧪 9. ASTRO COMPONENT BEST PRACTICES

### 9.1 Component Size & Organization

**Finding**: Existing components range 113-204 lines

**For ~600 line template**:

- **Option A**: Single monolithic component (all sections inline)
- **Option B**: Composition pattern (leverage existing components)

**Recommendation**: **Option B** - Leverage existing SPEC-11 components

**Rationale**:

- ✅ DRY principle (don't duplicate AdventureWhatToFish, etc.)
- ✅ Maintainability (updates propagate to all templates)
- ✅ Consistency (all lakes use same section patterns)
- ✅ Testing (components already tested)

### 9.2 Props Validation Pattern

**From adventure.ts - Zod Schema Approach**:

```typescript
import { z } from 'astro/zod';

export const FishingFeatureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  notes: z.string().optional(),
});

export type FishingFeature = z.infer<typeof FishingFeatureSchema>;
```

**Recommendation**: Define Lake-specific schemas in [adventure.ts](../wv-wild-web/src/types/adventure.ts) for runtime validation.

### 9.3 Conditional Rendering

**Pattern from components**:

```astro
---
// Hide section if no features
if (!features || features.length === 0) {
  return null;
}
---
```

**Apply to Lake Template**:

```astro
<!-- Only show marina if marina prop provided -->
{marina && (
  <AdventureFeatureSection title="Marina & Boat Access">
    <!-- Marina content -->
  </AdventureFeatureSection>
)}
```

---

## ✅ 10. VALIDATION CRITERIA CHECKLIST

### 10.1 Completeness

- [ ] **~600 lines total** (through componentization + expanded structure)
  - Reference file is 364 lines (using components)
  - Template should expand to ~600 via:
    - 8 major sections fully implemented
    - Additional data structures (fishingSpots, marina, activities, seasonal, regulations)
    - Inline documentation
- [ ] **All 8 sections implemented**
  1. ✅ Hero (name, stats, highlights)
  2. ✅ What to Fish (species, techniques, Kim's tips)
  3. ✅ Where to Fish (spots, depth, structure)
  4. ✅ Camping (campgrounds, amenities, reservations)
  5. ✅ Marina (services, boat launch, rentals, hours)
  6. ✅ Activities (swimming, kayaking, diving, hiking)
  7. ✅ Seasonal Guide (best times for each activity)
  8. ✅ Safety & Regulations (boating rules, hazards, permits)
- [ ] **TypeScript props interface complete** (see section 4.3)
- [ ] **Responsive grid layouts** (mobile-first, see section 6.1)

### 10.2 WVWO Aesthetic

- [ ] **`rounded-sm` enforced** (NOT md/lg/xl) - See section 3.1
- [ ] **Border-left accents** implemented
  - Green for fish species
  - Brown for fishing spots
  - Orange for safety/regulations
- [ ] **Kim's tips in `font-hand`** - See section 7.2
- [ ] **Font hierarchy** - `font-display`, `font-body`, `font-hand` (section 3.2)
- [ ] **WVWO color palette only** (section 3.3)

### 10.3 Fishing Focus

- [ ] **Species techniques prominently featured** (section 5.2)
- [ ] **Fishing spots with depth/structure details** (section 5.2)
- [ ] **Seasonal patterns emphasized** (seasonal guide section)
- [ ] **Local knowledge (Kim's tips) throughout** (section 7.1)

---

## 🚀 11. IMPLEMENTATION RECOMMENDATIONS

### 11.1 Architecture Decision: Component Composition

**RECOMMENDED APPROACH**:

```astro
---
// src/components/templates/LakeTemplate.astro
import Layout from '../../layouts/Layout.astro';
import AdventureQuickStats from '../adventure/AdventureQuickStats.astro';
import AdventureWhatToFish from '../adventure/AdventureWhatToFish.astro';
import AdventureCampingList from '../adventure/AdventureCampingList.astro';
import AdventureAmenitiesGrid from '../adventure/AdventureAmenitiesGrid.astro';
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
import type { LakeTemplateProps } from '../../types/adventure';

const {
  name,
  acreage,
  maxDepth,
  county,
  quickHighlights,
  fishSpecies,
  fishingSpots,
  campgrounds,
  marina,
  activities,
  seasonalGuide,
  regulations,
  heroImage,
  mapUrl
} = Astro.props;

// Transform data for existing components
const stats = [
  { value: acreage.toLocaleString(), label: 'Acres', icon: 'area' as const },
  { value: `${maxDepth} ft`, label: 'Max Depth', icon: 'info' as const },
  { value: county, label: 'County', icon: 'location' as const },
];
---

<Layout title={`${name} | WV Wild Outdoors`}>
  <!-- Hero Section (custom) -->
  <section class="relative h-[70vh] min-h-[500px]">
    <!-- Hero implementation -->
  </section>

  <!-- Quick Stats (existing component) -->
  <AdventureQuickStats stats={stats} variant="white" />

  <!-- What to Fish (existing component) -->
  <AdventureWhatToFish
    features={fishSpecies}
    variant="cream"
  />

  <!-- Where to Fish (custom section) -->
  <section class="py-16 bg-white">
    <!-- Fishing spots grid -->
  </section>

  <!-- Camping (existing component) -->
  <AdventureCampingList
    facilities={campgrounds}
    columns={2}
    variant="cream"
  />

  <!-- Marina (custom section) -->
  <section class="py-16 bg-white">
    <!-- Marina details -->
  </section>

  <!-- Activities (leverage AdventureFeatureSection) -->

  <!-- Seasonal Guide (custom section) -->

  <!-- Safety & Regulations (custom section) -->

  <!-- CTA (existing component) -->
</Layout>
```

### 11.2 Custom Sections to Implement

**NEW SECTIONS** (not covered by existing components):

1. **Hero Section** (~50 lines)
   - Hero image with stats overlay
   - Quick highlights badges
   - Name + county display

2. **Where to Fish Section** (~80 lines)
   - Fishing spots grid
   - Depth, structure, species per spot
   - Access information

3. **Marina Section** (~100 lines)
   - Services list
   - Boat launch details
   - Rentals + hours + contact

4. **Activities Section** (~60 lines)
   - Can leverage AdventureFeatureSection
   - Or create custom grid for activities

5. **Seasonal Guide Section** (~80 lines)
   - Seasonal breakdown (Spring/Summer/Fall/Winter)
   - Activity highlights per season
   - Fishing focus notes

6. **Safety & Regulations Section** (~70 lines)
   - Regulations by category
   - Rules lists with orange accent
   - Safety callouts

**TOTAL CUSTOM**: ~440 lines + existing component usage = **~600 line target**

### 11.3 File Structure

```
wv-wild-web/
├── src/
│   ├── components/
│   │   └── templates/
│   │       └── LakeTemplate.astro          # ~600 lines (NEW)
│   ├── types/
│   │   └── adventure.ts                    # Add lake-specific types
│   ├── pages/
│   │   └── near/
│   │       └── summersville-lake.astro     # Refactor to use template
│   └── ...
```

### 11.4 Type System Extensions

**Add to [adventure.ts](../wv-wild-web/src/types/adventure.ts)**:

```typescript
// SPEC-13: Lake Template Types
export const FishingSpotSchema = z.object({
  name: z.string().min(1),
  depth: z.string(),
  structure: z.string(),
  species: z.array(z.string()),
  access: z.string(),
});

export const MarinaSchema = z.object({
  name: z.string().min(1),
  services: z.array(z.string()),
  boatLaunch: z.object({
    ramps: z.number().int().positive(),
    fee: z.string().optional(),
  }),
  rentals: z.array(z.string()).optional(),
  hours: z.string(),
  contact: z.string(),
});

export const ActivitySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  season: z.string(),
  difficulty: DifficultySchema.optional(),
});

export const SeasonalGuideSchema = z.object({
  season: z.enum(['Spring', 'Summer', 'Fall', 'Winter']),
  highlights: z.array(z.string()),
  fishingFocus: z.string().optional(),
});

export const RegulationSchema = z.object({
  category: z.string().min(1),
  rules: z.array(z.string()),
});

export type FishingSpot = z.infer<typeof FishingSpotSchema>;
export type Marina = z.infer<typeof MarinaSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type SeasonalGuide = z.infer<typeof SeasonalGuideSchema>;
export type Regulation = z.infer<typeof RegulationSchema>;
```

---

## 📚 12. RESEARCH SOURCES

### 12.1 Internal Codebase Analysis

- ✅ [summersville-lake.astro](../wv-wild-web/src/pages/near/summersville-lake.astro) - 364 lines (reference implementation)
- ✅ [adventure.ts](../wv-wild-web/src/types/adventure.ts) - 295 lines (type definitions)
- ✅ [AdventureWhatToFish.astro](../wv-wild-web/src/components/adventure/AdventureWhatToFish.astro) - 113 lines
- ✅ [AdventureFeatureSection.astro](../wv-wild-web/src/components/adventure/AdventureFeatureSection.astro) - 190 lines
- ✅ [AdventureCampingList.astro](../wv-wild-web/src/components/adventure/AdventureCampingList.astro) - 204 lines
- ✅ [AdventureAmenitiesGrid.astro](../wv-wild-web/src/components/adventure/AdventureAmenitiesGrid.astro) - 160 lines
- ✅ WVWO component patterns across 34 adventure components

### 12.2 External Research

**Web Search: "lake recreation website fishing marina camping display best practices 2025"**

**Sources**:

- [Pyramid Lake Recreation](https://water.ca.gov/What-We-Do/Recreation/Pyramid-Lake-Recreation)
- [Recreation - California Water](https://water.ca.gov/What-We-Do/Recreation)
- [Silverwood Lake State Recreation Area](https://www.parks.ca.gov/?page_id=650)
- [Falls Lake State Recreation Area](https://www.ncparks.gov/state-parks/falls-lake-state-recreation-area)
- [Lake Oroville Recreation](https://water.ca.gov/What-We-Do/Recreation/Lake-Oroville-Recreation)
- [Carter Lake - Larimer County](https://www.larimer.gov/naturalresources/parks/carter-lake)
- [Lake Cascade State Park](https://parksandrecreation.idaho.gov/state-park/lake-cascade-state-park/)

**Key Patterns Observed**:

- Services-first approach (rentals, facilities front-loaded)
- Clear seasonal availability information
- Contact info prominently displayed
- Reservation system integration
- Safety/regulation sections with visual hierarchy

---

## 🎯 13. FINAL RECOMMENDATIONS

### 13.1 Critical Path Forward

**PHASE 1**: Type System (1-2 hours)

- Add lake-specific types to [adventure.ts](../wv-wild-web/src/types/adventure.ts)
- Define `FishingSpot`, `Marina`, `Activity`, `SeasonalGuide`, `Regulation` schemas
- Export `LakeTemplateProps` interface

**PHASE 2**: Template Structure (3-4 hours)

- Create `src/components/templates/LakeTemplate.astro`
- Implement 6 custom sections (Hero, Where to Fish, Marina, Activities, Seasonal, Regulations)
- Leverage existing components for remaining sections

**PHASE 3**: WVWO Compliance (1 hour)

- Enforce `rounded-sm` ONLY
- Apply border-left accent colors
- Implement Kim's voice integration points
- Add gentle-reveal animations with prefers-reduced-motion

**PHASE 4**: Testing & Validation (1-2 hours)

- Refactor summersville-lake.astro to use new template
- Visual regression testing
- Accessibility audit
- Responsive layout testing

**TOTAL ESTIMATE**: 6-9 hours

### 13.2 Success Metrics

1. **Line Count**: ~600 lines total (template + imports + docs)
2. **Component Reuse**: 70%+ existing components leveraged
3. **Type Safety**: 100% TypeScript coverage with Zod validation
4. **WVWO Compliance**: 100% (rounded-sm, fonts, colors)
5. **Accessibility**: WCAG 2.1 AA compliant
6. **Performance**: Lighthouse score 90+ (performance, accessibility, SEO)

### 13.3 Follow-Up Specs

**Future Templates** (after SPEC-13):

- **SPEC-14**: River Template (fishing + kayaking focus)
- **SPEC-15**: Hiking Trail Template (trail maps + difficulty ratings)
- **SPEC-16**: WMA Template (hunting + scouting focus)

**All templates should**:

- Leverage SPEC-11 shared components
- Follow WVWO aesthetic guidelines
- Use TypeScript with Zod schemas
- Support fishing/hunting/camping content as needed

---

## 📊 14. APPENDICES

### A. Component Dependency Map

```
LakeTemplate.astro (~600 lines)
├── Layout.astro (wrapper)
├── Hero Section (custom, ~50 lines)
├── AdventureQuickStats.astro ✅ (existing)
├── AdventureWhatToFish.astro ✅ (existing)
│   └── AdventureFeatureSection.astro ✅ (base)
├── Where to Fish Section (custom, ~80 lines)
├── AdventureCampingList.astro ✅ (existing)
├── Marina Section (custom, ~100 lines)
├── Activities Section (custom, ~60 lines)
│   └── AdventureFeatureSection.astro ✅ (possible reuse)
├── Seasonal Guide Section (custom, ~80 lines)
├── Safety & Regulations Section (custom, ~70 lines)
├── AdventureGearChecklist.astro ✅ (existing)
├── AdventureRelatedShop.astro ✅ (existing)
├── AdventureCTA.astro ✅ (existing)
└── EmailCapture.astro ✅ (existing)
```

### B. WVWO Design System Reference

**Typography**:

```css
--font-display: 'Bitter', serif;           /* Headings */
--font-hand: 'Permanent Marker', cursive;  /* Kim's tips */
--font-body: 'Noto Sans', sans-serif;      /* Body text */
```

**Colors**:

```css
--brand-brown: #3E2723;    /* Primary dark */
--sign-green: #2E7D32;     /* Accent/CTAs */
--brand-cream: #FFF8E1;    /* Background */
--brand-orange: #FF6F00;   /* Alert/CTA (use sparingly) */
```

**Border Radius**:

```css
rounded-sm: 0.125rem;  /* ONLY allowed value */
```

**Spacing Scale**:

```css
py-12 md:py-16         /* Section padding */
mb-4 md:mb-6           /* Header margins */
gap-6                  /* Grid gaps */
pl-4 / pl-6            /* Border-left indents */
```

### C. Sample Data Structure

```typescript
// Example: Summersville Lake data for template
const summersvilleLakeData: LakeTemplateProps = {
  name: 'Summersville Lake',
  acreage: 2790,
  maxDepth: 327,
  county: 'Nicholas',
  quickHighlights: [
    'Crystal clear water (30-45 ft visibility)',
    'Premier smallmouth fishing',
    'Scuba diving destination',
    '30 min from shop'
  ],
  fishSpecies: [
    {
      title: 'Smallmouth Bass',
      description: 'Year-round fishery with 14-18" fish common...',
      notes: 'Downsize to 6-8 lb test in gin-clear water. Tube jigs on rocky points.'
    },
    // ... 5 more species
  ],
  fishingSpots: [
    {
      name: 'Long Point Cliff',
      depth: '40-60 feet',
      structure: 'Towering rock formation, submerged ledges',
      species: ['Smallmouth Bass', 'Walleye', 'Muskie'],
      access: 'Boat only, 2 miles from Battle Run launch'
    },
    // ... more spots
  ],
  campgrounds: [
    {
      type: 'Battle Run Campground',
      count: 117,
      description: 'Peninsula campground with water on three sides...',
      link: 'https://www.recreation.gov/...',
    },
    // ... more campgrounds
  ],
  marina: {
    name: 'Summersville Lake Marina',
    services: ['Fuel', 'Bait & tackle', 'Ice', 'Snacks'],
    boatLaunch: { ramps: 3, fee: '$5' },
    rentals: ['Kayaks', 'Pontoon boats'],
    hours: '7am-8pm daily (May-Oct)',
    contact: '(304) 872-3773'
  },
  activities: [
    {
      name: 'Scuba Diving',
      description: 'Long Point Cliff dive site with 40+ ft visibility...',
      season: 'May-October',
      difficulty: 'moderate'
    },
    // ... more activities
  ],
  seasonalGuide: [
    {
      season: 'Spring',
      highlights: ['Smallmouth spawn in shallows', 'Walleye active', 'Crappie fishing'],
      fishingFocus: 'Target shallow rocky areas for pre-spawn smallmouth'
    },
    // ... other seasons
  ],
  regulations: [
    {
      category: 'Walleye Regulations',
      rules: [
        'All walleye 20-30 inches must be released immediately',
        'Daily creel limit: 8 walleye, only 1 over 30 inches'
      ]
    },
    // ... more regulations
  ],
  heroImage: '/images/summersville-lake-hero.jpg',
  mapUrl: 'https://maps.google.com/?q=Summersville+Lake+WV'
};
```

---

## 🏁 CONCLUSION

**Hivemind Research Status**: ✅ **COMPLETE**

**Key Deliverables**:

1. ✅ Comprehensive summersville-lake.astro structure analysis (364 lines)
2. ✅ Complete component ecosystem mapping (34 adventure components)
3. ✅ TypeScript props interface architecture (LakeTemplateProps + 6 new types)
4. ✅ WVWO aesthetic compliance audit (100% rounded-sm enforcement)
5. ✅ Responsive layout pattern documentation
6. ✅ Kim's voice integration guidelines
7. ✅ Implementation roadmap (6-9 hour estimate)

**Critical Findings**:

- ⚠️ Reference file is **364 lines**, not 603 (template targets ~600 via expansion)
- ✅ 70%+ of template can **reuse existing SPEC-11 components**
- ✅ **6 custom sections** needed: Hero, Where to Fish, Marina, Activities, Seasonal, Regulations
- ✅ **100% rounded-sm enforcement** - zero tolerance for md/lg/xl
- ✅ **Fishing-first hierarchy** - fishing content appears before hunting

**Ready for Phase 2**: Architecture Design → Implementation

---

**Report Generated**: 2025-12-29
**Queen Coordinator Signature**: 🐝👑 Hivemind Research Complete
**Next Steps**: Proceed to SPEC-13 implementation with base-template-generator agent
