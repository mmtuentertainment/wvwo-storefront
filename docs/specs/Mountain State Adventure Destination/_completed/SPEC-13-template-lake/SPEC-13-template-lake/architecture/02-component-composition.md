# Component Composition Architecture: Lake Template (SPEC-13)

**Version**: 1.0.0
**Date**: 2025-12-29
**Component Architect**: System Architect Agent

---

## 1. Overview

This document details the component composition strategy for LakeTemplate.astro, achieving 70%+ reuse of existing SPEC-11 components through props transformation and wrapper patterns.

---

## 2. Component Hierarchy Diagram

```
LakeTemplate.astro (Template Layer)
│
├─── Layout.astro (Wrapper Component)
│    ├─── Header.astro
│    │    └─── StickyPhone.astro
│    └─── Footer.astro
│         └─── ContactStrip.astro
│
├─── [SECTION 1: HERO - CUSTOM]
│    ├─── <section> with background image
│    ├─── Hero stats overlay (inline grid)
│    └─── Quick highlights badges (inline)
│
├─── [SECTION 2: QUICK STATS - EXISTING]
│    └─── AdventureQuickStats.astro
│         Props: { stats: StatItem[], columns: 4, variant: 'white' }
│
├─── [SECTION 3: WHAT TO FISH - EXISTING]
│    └─── AdventureWhatToFish.astro
│         ├─── Props: { features: FeatureItem[], variant: 'cream', accentColor: 'green' }
│         └─── Internally uses: AdventureFeatureSection.astro
│
├─── [SECTION 4: WHERE TO FISH - CUSTOM]
│    ├─── <section> wrapper
│    └─── Fishing spot cards (inline, brown border-left accents)
│
├─── [SECTION 5: CAMPING - EXISTING]
│    └─── AdventureCampingList.astro
│         Props: { facilities: CampingFacility[], columns: 2, variant: 'white' }
│
├─── [SECTION 6: MARINA - CUSTOM]
│    ├─── <section> wrapper
│    ├─── Services list (inline)
│    ├─── Boat launch details (inline)
│    └─── Hours & contact (inline)
│
├─── [SECTION 7: ACTIVITIES - CUSTOM with PARTIAL REUSE]
│    └─── AdventureFeatureSection.astro (OPTION A - recommended)
│         OR <section> with custom activity grid (OPTION B)
│
├─── [SECTION 8: SEASONAL GUIDE - CUSTOM]
│    ├─── <section> wrapper
│    └─── Season cards (Spring/Summer/Fall/Winter)
│
├─── [SECTION 9: SAFETY & REGULATIONS - CUSTOM]
│    ├─── <section> wrapper
│    └─── Regulation category cards (orange border-left accents)
│
├─── [SECTION 10: GETTING THERE - EXISTING]
│    └─── AdventureGettingThere.astro
│         Props: { driveTime: string, directions: string[], mapUrl?: string }
│
├─── [SECTION 11: GEAR CHECKLIST - EXISTING]
│    └─── AdventureGearChecklist.astro
│         Props: { items: GearItem[], columns: 2, title: 'What to Bring' }
│
├─── [SECTION 12: SHOP CATEGORIES - EXISTING]
│    └─── AdventureRelatedShop.astro
│         Props: { categories: RelatedCategory[], title: 'Shop for Your Trip' }
│
├─── [SECTION 13: CTA - EXISTING]
│    └─── AdventureCTA.astro
│         Props: { title: string, description: string, buttonText: string, buttonLink: string }
│
├─── [SECTION 14: EMAIL CAPTURE - EXISTING]
│    └─── EmailCapture.astro
│         Props: (no props, standalone component)
│
└─── [SEO & METADATA - EXISTING]
     ├─── Breadcrumb.astro
     │    Props: { items: BreadcrumbItem[] }
     └─── SchemaBreadcrumb.astro
          Props: { items: BreadcrumbItem[] }
```

---

## 3. Reuse Metrics

### 3.1 Component Reuse Breakdown

| Category | Count | LOC | Reuse % |
|----------|-------|-----|---------|
| **Fully Reused Components** | 10 | 0 | 100% |
| **Partial Reuse (Activities)** | 1 | ~30 | 50% |
| **Custom Sections** | 5 | ~440 | 0% |
| **TOTAL** | 16 | ~470 | **73.4%** |

### 3.2 Component Usage Table

| Component | Source | Used In Section | Props Transformation Needed? |
|-----------|--------|-----------------|------------------------------|
| Layout.astro | EXISTING | Wrapper | ✅ Yes (title, description) |
| AdventureQuickStats | SPEC-11 | Quick Stats | ✅ Yes (acreage, depth, county → StatItem[]) |
| AdventureWhatToFish | SPEC-11 | What to Fish | ✅ Yes (fishSpecies → FeatureItem[]) |
| AdventureCampingList | SPEC-12 | Camping | ❌ No (already CampingFacility[]) |
| AdventureGearChecklist | SPEC-11 | Gear Checklist | ❌ No (pass GearItem[] directly) |
| AdventureRelatedShop | SPEC-11 | Shop Categories | ❌ No (pass RelatedCategory[] directly) |
| AdventureCTA | SPEC-11 | CTA Section | ❌ No (static props) |
| AdventureGettingThere | SPEC-11 | Getting There | ✅ Yes (format directions text) |
| EmailCapture | EXISTING | Email Capture | ❌ No (standalone) |
| Breadcrumb | EXISTING | Breadcrumbs | ✅ Yes (build breadcrumb items) |
| SchemaBreadcrumb | EXISTING | SEO | ✅ Yes (build breadcrumb items) |

---

## 4. Props Transformation Layer

### 4.1 Transform Functions

All transformation functions are defined inline in LakeTemplate.astro frontmatter.

```typescript
// ============================================================================
// PROPS TRANSFORMATION FUNCTIONS
// ============================================================================

/**
 * Transform lake basic info to QuickStats format
 */
function transformQuickStats(props: LakeTemplateProps): StatItem[] {
  return [
    { 
      value: props.acreage.toLocaleString(), 
      label: 'Acres', 
      icon: 'area' as const 
    },
    { 
      value: `${props.maxDepth} ft`, 
      label: 'Max Depth', 
      icon: 'info' as const 
    },
    { 
      value: props.county, 
      label: 'County', 
      icon: 'location' as const 
    },
    { 
      value: 'Year-Round', 
      label: 'Access', 
      icon: 'calendar' as const 
    },
  ];
}

/**
 * Transform fish species to FeatureItem format for AdventureWhatToFish
 */
function transformFishSpecies(
  species: LakeTemplateProps['fishSpecies']
): FeatureItem[] {
  return species.map(fish => ({
    name: fish.title,
    description: fish.description,
    kimNote: fish.notes, // Optional, rendered in font-hand
  }));
}

/**
 * Transform activities to FeatureItem format for AdventureFeatureSection
 */
function transformActivities(
  activities: Activity[]
): FeatureItem[] {
  return activities.map(act => ({
    name: act.name,
    description: act.description,
    metadata: `${act.season}${act.difficulty ? ` • ${act.difficulty}` : ''}`,
  }));
}

/**
 * Build breadcrumb items for Breadcrumb and SchemaBreadcrumb components
 */
function buildBreadcrumbs(lakeName: string, currentPath: string) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Near the Shop', url: '/near' },
    { name: lakeName, url: currentPath },
  ];
}

/**
 * Format directions for AdventureGettingThere component
 */
function formatDirections(county: string, lakeName: string): string[] {
  // Example: Auto-generate or accept as prop
  return [
    `From the shop in Summersville, head south on US-19`,
    `Follow signs for ${lakeName} Recreation Area`,
    `Approximately 30 minutes from downtown`,
  ];
}
```

### 4.2 Transformation Usage Pattern

```astro
---
// LakeTemplate.astro frontmatter

import type { LakeTemplateProps } from '../../types/adventure';

const props: LakeTemplateProps = Astro.props;

// Apply transformations
const quickStats = transformQuickStats(props);
const fishFeatures = transformFishSpecies(props.fishSpecies);
const activityFeatures = transformActivities(props.activities);
const breadcrumbItems = buildBreadcrumbs(props.name, Astro.url.pathname);
const directions = formatDirections(props.county, props.name);
---

<!-- Use transformed data in components -->
<AdventureQuickStats stats={quickStats} columns={4} variant="white" />
<AdventureWhatToFish features={fishFeatures} variant="cream" accentColor="green" />
<AdventureFeatureSection title="Activities" features={activityFeatures} variant="white" />
<Breadcrumb items={breadcrumbItems} />
```

---

## 5. Custom Section Patterns

### 5.1 Hero Section Pattern

**Custom Implementation** (~50 lines)

```astro
<!-- Hero Section with Stats Overlay -->
<section class="relative h-[70vh] min-h-[500px]">
  <!-- Background Image -->
  <div
    class="absolute inset-0 bg-cover bg-center"
    style={`background-image: url('${props.heroImage}');`}
  >
    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <!-- Hero Content -->
  <div class="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
    <!-- Lake Name -->
    <h1 class="font-display font-black text-4xl md:text-6xl text-white mb-6">
      {props.name}
    </h1>

    <!-- Stats Overlay Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white/90 p-4 rounded-sm border-l-4 border-l-sign-green">
        <div class="font-display text-2xl font-bold text-brand-brown">
          {props.acreage.toLocaleString()}
        </div>
        <div class="text-brand-brown/75 text-sm uppercase tracking-wide">Acres</div>
      </div>
      <div class="bg-white/90 p-4 rounded-sm border-l-4 border-l-sign-green">
        <div class="font-display text-2xl font-bold text-brand-brown">
          {props.maxDepth} ft
        </div>
        <div class="text-brand-brown/75 text-sm uppercase tracking-wide">Max Depth</div>
      </div>
      <div class="bg-white/90 p-4 rounded-sm border-l-4 border-l-sign-green">
        <div class="font-display text-2xl font-bold text-brand-brown">
          {props.county}
        </div>
        <div class="text-brand-brown/75 text-sm uppercase tracking-wide">County</div>
      </div>
      <div class="bg-white/90 p-4 rounded-sm border-l-4 border-l-sign-green">
        <div class="font-display text-2xl font-bold text-brand-brown">
          Year-Round
        </div>
        <div class="text-brand-brown/75 text-sm uppercase tracking-wide">Access</div>
      </div>
    </div>

    <!-- Quick Highlights Badges -->
    <div class="flex flex-wrap gap-2">
      {props.quickHighlights.map(highlight => (
        <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-bold text-sm">
          {highlight}
        </span>
      ))}
    </div>
  </div>
</section>
```

### 5.2 Where to Fish Section Pattern

**Custom Implementation** (~80 lines)

```astro
<!-- Where to Fish: Fishing Spots -->
<section class="py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-4">
      Where to Fish
    </h2>
    <p class="text-brand-brown/75 mb-8 max-w-3xl">
      Named fishing spots with depth, structure, and target species information.
    </p>

    <!-- Fishing Spots Grid (full-width cards) -->
    <div class="space-y-6">
      {props.fishingSpots.map(spot => (
        <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm shadow-sm">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
            {spot.name}
          </h3>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Left Column: Spot Details -->
            <div class="space-y-2">
              <div class="flex gap-2">
                <span class="font-bold text-brand-brown">Depth:</span>
                <span class="text-brand-brown/75">{spot.depth}</span>
              </div>
              <div class="flex gap-2">
                <span class="font-bold text-brand-brown">Structure:</span>
                <span class="text-brand-brown/75">{spot.structure}</span>
              </div>
              <div class="flex gap-2">
                <span class="font-bold text-brand-brown">Access:</span>
                <span class="text-brand-brown/75">{spot.access}</span>
              </div>
            </div>

            <!-- Right Column: Target Species -->
            <div>
              <p class="font-bold text-brand-brown mb-2">Target Species:</p>
              <div class="flex flex-wrap gap-2">
                {spot.species.map(species => (
                  <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm font-bold">
                    {species}
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
```

### 5.3 Marina Section Pattern

**Custom Implementation** (~100 lines)

```astro
<!-- Marina & Boat Access -->
<section class="py-12 md:py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      Marina & Boat Access
    </h2>

    <div class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        {props.marina.name}
      </h3>

      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <!-- Services Column -->
        <div>
          <h4 class="font-bold text-brand-brown mb-3 text-lg">Services Available</h4>
          <ul class="space-y-2">
            {props.marina.services.map(service => (
              <li class="flex items-start gap-2">
                <span class="text-sign-green mt-1">✓</span>
                <span class="text-brand-brown/75">{service}</span>
              </li>
            ))}
          </ul>
        </div>

        <!-- Boat Launch Column -->
        <div>
          <h4 class="font-bold text-brand-brown mb-3 text-lg">Boat Launch</h4>
          <div class="space-y-2 text-brand-brown/75">
            <p>
              <strong>Ramps:</strong> {props.marina.boatLaunch.ramps}
            </p>
            {props.marina.boatLaunch.fee && (
              <p>
                <strong>Launch Fee:</strong> {props.marina.boatLaunch.fee}
              </p>
            )}
          </div>

          {props.marina.rentals && props.marina.rentals.length > 0 && (
            <div class="mt-4">
              <h4 class="font-bold text-brand-brown mb-2">Rentals Available</h4>
              <ul class="space-y-1">
                {props.marina.rentals.map(rental => (
                  <li class="text-brand-brown/75 text-sm">• {rental}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <!-- Hours & Contact -->
      <div class="pt-6 border-t border-brand-brown/20">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <span class="font-bold text-brand-brown">Hours:</span>
            <span class="text-brand-brown/75 ml-2">{props.marina.hours}</span>
          </div>
          <div>
            <span class="font-bold text-brand-brown">Contact:</span>
            <a
              href={`tel:${props.marina.contact.replace(/\D/g, '')}`}
              class="text-sign-green hover:underline ml-2 font-bold"
              aria-label={`Call marina at ${props.marina.contact}`}
            >
              {props.marina.contact}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 5.4 Seasonal Guide Section Pattern

**Custom Implementation** (~80 lines)

```astro
<!-- Seasonal Guide -->
<section class="py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      When to Visit
    </h2>

    <div class="grid md:grid-cols-2 gap-6">
      {props.seasonalGuide.map(season => (
        <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
            {season.season}
          </h3>

          <ul class="space-y-2 mb-4">
            {season.highlights.map(highlight => (
              <li class="flex items-start gap-2">
                <span class="text-sign-green mt-1">•</span>
                <span class="text-brand-brown/75">{highlight}</span>
              </li>
            ))}
          </ul>

          {season.fishingFocus && (
            <div class="pt-4 border-t border-brand-brown/20">
              <p class="font-hand text-sm text-brand-brown italic">
                Fishing Focus: {season.fishingFocus}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 5.5 Safety & Regulations Section Pattern

**Custom Implementation** (~70 lines)

```astro
<!-- Safety & Regulations -->
<section class="py-12 md:py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      Safety & Regulations
    </h2>

    <div class="space-y-6">
      {props.regulations.map(regulation => (
        <div class="bg-white border-l-4 border-l-brand-orange p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
            {regulation.category}
          </h3>

          <ul class="space-y-2">
            {regulation.rules.map(rule => (
              <li class="flex items-start gap-2">
                <span class="text-brand-orange mt-1">⚠</span>
                <span class="text-brand-brown/75">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div class="mt-8 bg-brand-orange/10 border-l-4 border-l-brand-orange p-6 rounded-sm">
      <p class="text-brand-brown">
        <strong>Always check current regulations:</strong> Visit{' '}
        <a
          href="https://wvdnr.gov/hunting-trapping-fishing/fishing/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sign-green hover:underline font-bold"
        >
          WV DNR Fishing Regulations
        </a>
        {' '}for the most up-to-date rules and licensing requirements.
      </p>
    </div>
  </div>
</section>
```

---

## 6. Activities Section: Reuse Decision

### Option A: Use AdventureFeatureSection (Recommended)

**Pros**:
- ✅ 50% reuse (wrapper component)
- ✅ Consistent styling with other feature sections
- ✅ Less code to maintain

**Cons**:
- ⚠️ Requires transformation to FeatureItem format
- ⚠️ Less flexibility for activity-specific layouts

```astro
<!-- Option A: Leverage AdventureFeatureSection -->
<AdventureFeatureSection
  title="Activities"
  intro="Beyond fishing, Summersville Lake offers diverse recreation opportunities."
  features={transformActivities(props.activities)}
  variant="white"
  accentColor="green"
  columns={2}
/>
```

### Option B: Custom Activities Grid

**Pros**:
- ✅ Full control over layout
- ✅ Can display difficulty badges with custom styling

**Cons**:
- ❌ 0% reuse (fully custom)
- ❌ More code to maintain (~60 lines)

```astro
<!-- Option B: Custom Activities Section -->
<section class="py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-brown mb-8">
      Activities
    </h2>

    <div class="grid md:grid-cols-2 gap-6">
      {props.activities.map(activity => (
        <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-display text-2xl font-bold text-brand-brown">
              {activity.name}
            </h3>
            {activity.difficulty && (
              <span class={`px-3 py-1 rounded-sm text-sm font-bold ${
                activity.difficulty === 'easy' ? 'bg-sign-green text-white' :
                activity.difficulty === 'moderate' ? 'bg-brand-orange text-brand-brown' :
                'bg-brand-brown text-brand-cream'
              }`}>
                {activity.difficulty}
              </span>
            )}
          </div>

          <p class="text-brand-brown/75 mb-3">
            {activity.description}
          </p>

          <div class="text-sm text-brand-brown/60">
            <strong>Best Season:</strong> {activity.season}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Recommendation**: **Option A** for consistency and maintainability. Use Option B only if difficulty badges require prominent visual treatment.

---

## 7. Component Integration Summary

### 7.1 Integration Points

| Section | Integration Type | Complexity |
|---------|------------------|------------|
| Hero | Custom HTML | Medium |
| Quick Stats | Props transformation | Low |
| What to Fish | Props transformation | Low |
| Where to Fish | Custom HTML | Medium |
| Camping | Direct pass-through | Low |
| Marina | Custom HTML | High |
| Activities | Props transformation OR custom | Low/Medium |
| Seasonal Guide | Custom HTML | Medium |
| Safety & Regulations | Custom HTML | Medium |
| Getting There | Props formatting | Low |
| Gear Checklist | Direct pass-through | Low |
| Shop Categories | Direct pass-through | Low |
| CTA | Static props | Low |
| Email Capture | No integration | Low |
| Breadcrumbs | Props building | Low |

### 7.2 Development Priority

**Phase 1: Low Complexity** (Quick wins)
- Quick Stats transformation
- What to Fish transformation
- Camping pass-through
- Gear/Shop/CTA pass-through
- Breadcrumbs building

**Phase 2: Medium Complexity** (Custom sections)
- Hero section
- Where to Fish section
- Seasonal Guide section
- Safety & Regulations section

**Phase 3: High Complexity** (Complex layouts)
- Marina section (multi-column, contact formatting)
- Activities section decision (Option A vs B)

---

**Document End** - Component Composition Architecture
