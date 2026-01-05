# SPEC-12: WMA Template System - API/Interface Design

**Related Spec**: SPEC-12-wma-template.md
**Created**: 2025-12-27
**Author**: Claude (Code Implementation Agent)

---

## Overview

The WMA template system consists of 6 new components that work together to create a standardized page structure. Each component accepts props for content while handling its own layout, styling, and accessibility requirements.

---

## Component Interfaces

### 1. WMAHero Component

Full-bleed hero section with WMA name, location, acreage, and visual impact.

```typescript
/**
 * WMAHero.astro
 * Hero section for Wildlife Management Area pages
 *
 * @example
 * <WMAHero
 *   name="Elk River WMA"
 *   acreage={19646}
 *   county="Braxton"
 *   driveTime="15 min"
 *   description="West Virginia's oldest wildlife management area..."
 *   image={heroImage}
 *   imageAlt="Aerial view of Elk River WMA mature hardwood forests"
 * />
 */
interface WMAHeroProps {
  // Required - Core Display
  /** WMA name displayed as h1 (e.g., "Elk River WMA") */
  name: string;
  /** Total acreage as integer (auto-formatted with commas) */
  acreage: number;
  /** County name without "County" suffix (e.g., "Braxton") */
  county: string;
  /** Lead paragraph describing the WMA's character and terrain */
  description: string;

  // Optional - Location & Access
  /** Drive time from WVWO shop (e.g., "15 min", "30 min") */
  driveTime?: string;
  /** Year-round access or seasonal restrictions */
  access?: string; // Default: "Year-Round"

  // Optional - Image
  /** Hero image metadata from Astro's image imports */
  image?: ImageMetadata;
  /** Alt text for hero image (required if image provided) */
  imageAlt?: string;
  /** Focal point for image cropping */
  imagePosition?: 'center' | 'top' | 'bottom'; // Default: 'center'

  // Optional - Additional Info Badges
  /** Custom badges to display alongside acreage/drive time */
  badges?: Array<{
    label: string;
    value: string;
    variant?: 'green' | 'orange' | 'brown'; // Default: 'green'
  }>;
}

/**
 * Slots:
 * - [default]: Additional content below description (e.g., Kim's personal note)
 * - badge-extra: Custom badge components to display alongside default badges
 */
```

**Visual Design**:

- Background: `bg-brand-brown` with camo pattern overlay at 5% opacity
- Typography: `font-display text-4xl md:text-6xl font-black` (h1)
- Badges: Inline badges for acreage, drive time, access using `bg-sign-green` and `bg-brand-orange`
- Layout: 7/5 asymmetric grid (content/image) on desktop, stacked on mobile

---

### 2. WMAQuickStats Component

Reuses `AdventureQuickStats` from SPEC-10 with WMA-specific stat configurations.

```typescript
/**
 * WMA pages use the existing AdventureQuickStats component
 * from SPEC-10 with standardized stat configurations.
 *
 * @example
 * <AdventureQuickStats
 *   stats={[
 *     { value: '19,646', label: 'Acres', icon: 'area' },
 *     { value: '15 min', label: 'From Shop', icon: 'time' },
 *     { value: 'Braxton Co.', label: 'Location', icon: 'location' },
 *     { value: 'Year-Round', label: 'Access', icon: 'calendar' }
 *   ]}
 *   columns={4}
 *   variant="white"
 * />
 */

// Recommended stat configurations for WMAs:
type WMAStatPreset =
  | { type: 'acreage'; value: number } // Auto-formats with commas
  | { type: 'driveTime'; value: string } // e.g., "15 min"
  | { type: 'location'; county: string } // Displays "County Name Co."
  | { type: 'access'; value: string }; // e.g., "Year-Round"
```

**Implementation Note**: This component already exists from SPEC-10. No new component creation needed—just standardized usage pattern for WMA pages.

---

### 3. WMASpeciesGrid Component

Displays huntable species organized by category with season information.

```typescript
/**
 * WMASpeciesGrid.astro
 * Grid layout for huntable species with season dates and hunting tips
 *
 * @example
 * <WMASpeciesGrid
 *   title="What to Hunt"
 *   species={[
 *     {
 *       name: 'White-tailed Deer',
 *       category: 'big-game',
 *       season: 'Nov - Dec (firearms), Sep - Jan (archery)',
 *       description: 'Brushlands and mixed timber provide excellent deer hunting...',
 *       tips: 'Brushland edges and regenerating cuts. Creek bottoms when the rut kicks in.',
 *       kimNote: 'Wind can be tricky in the steep terrain — play it carefully.'
 *     }
 *   ]}
 *   columns={2}
 *   variant="cream"
 * />
 */
interface WMASpeciesGridProps {
  /** Section heading (default: "What to Hunt") */
  title?: string;
  /** Optional intro paragraph below heading */
  intro?: string;
  /** Array of huntable species */
  species: SpeciesItem[];
  /** Number of columns on desktop (default: 2) */
  columns?: 1 | 2;
  /** Background style (default: 'cream') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

interface SpeciesItem {
  /** Species common name (e.g., "White-tailed Deer") */
  name: string;
  /** Species category for visual distinction */
  category: 'big-game' | 'small-game' | 'turkey' | 'waterfowl';
  /** Season dates and method (e.g., "Nov - Dec (firearms)") */
  season: string;
  /** 2-3 sentence description of hunting opportunities */
  description: string;
  /** Best hunting areas or terrain features (optional) */
  tips?: string;
  /** Kim's personal hunting advice in her voice (optional) */
  kimNote?: string;
}

/**
 * Visual treatment by category:
 * - big-game: border-l-4 border-l-sign-green
 * - small-game: border-l-4 border-l-brand-mud
 * - turkey: border-l-4 border-l-brand-brown
 * - waterfowl: border-l-4 border-l-[#4A90E2] (blue accent)
 */
```

**Layout Pattern**:

- 2-column grid on desktop (768px+)
- Single column on mobile
- Cards use `bg-white` with left border accent based on category
- `kimNote` displayed in `font-hand` italic style for personal touch

---

### 4. WMAFacilitiesGrid Component

Displays available facilities and access points with counts and descriptions.

```typescript
/**
 * WMAFacilitiesGrid.astro
 * Grid layout for WMA facilities (parking, boat ramps, camping, etc.)
 *
 * @example
 * <WMAFacilitiesGrid
 *   title="Facilities & Access"
 *   facilities={[
 *     {
 *       type: 'Parking Areas',
 *       count: 6,
 *       description: 'Gravel lots at major access points',
 *       icon: 'parking'
 *     },
 *     {
 *       type: 'Boat Ramps',
 *       count: 2,
 *       description: 'Concrete ramps on Sutton Lake',
 *       icon: 'boat'
 *     }
 *   ]}
 *   columns={3}
 *   variant="white"
 * />
 */
interface WMAFacilitiesGridProps {
  /** Section heading (default: "Facilities & Access") */
  title?: string;
  /** Optional intro paragraph below heading */
  intro?: string;
  /** Array of facility items */
  facilities: FacilityItem[];
  /** Number of columns on desktop (default: 3) */
  columns?: 2 | 3 | 4;
  /** Background style (default: 'white') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

interface FacilityItem {
  /** Facility type (e.g., "Parking Areas", "Boat Ramps") */
  type: string;
  /** Number of facilities if applicable (displays as "(count)" badge) */
  count?: number;
  /** Brief description of the facility */
  description: string;
  /** Icon identifier from STAT_ICON_PATHS */
  icon?: StatIcon;
  /** Custom SVG path if predefined icon doesn't fit */
  customIconPath?: string;
}

/**
 * Slots:
 * - footer: Optional content below the grid (e.g., accessibility notes)
 */
```

**Icon System Integration**:

- Reuses `STAT_ICON_PATHS` from `src/types/adventure.ts`
- Supports custom SVG paths via `customIconPath` prop
- Icons displayed with `text-sign-green` color at 24px size

---

### 5. WMAFishingWaters Component

Displays named fishing waters with species lists and access information.

```typescript
/**
 * WMAFishingWaters.astro
 * Card layout for fishing water bodies
 *
 * @example
 * <WMAFishingWaters
 *   title="Fishing Waters"
 *   waters={[
 *     {
 *       name: 'Elk River',
 *       type: 'river',
 *       species: ['Smallmouth Bass', 'Rock Bass', 'Catfish'],
 *       access: 'Multiple bank access points along Airport Rd',
 *       regulations: 'Standard WV fishing regulations apply'
 *     }
 *   ]}
 *   variant="cream"
 * />
 */
interface WMAFishingWatersProps {
  /** Section heading (default: "Fishing Waters") */
  title?: string;
  /** Optional intro paragraph below heading */
  intro?: string;
  /** Array of fishing water bodies */
  waters: FishingWaterItem[];
  /** Background style (default: 'cream') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

interface FishingWaterItem {
  /** Water body name (e.g., "Elk River", "Sutton Lake") */
  name: string;
  /** Water body type for icon selection */
  type: 'river' | 'lake' | 'pond' | 'stream';
  /** Array of fish species available */
  species: string[];
  /** Access point description */
  access: string;
  /** Special regulations if applicable (optional) */
  regulations?: string;
  /** GPS coordinates for primary access (optional) */
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Visual treatment:
 * - Each water body is a card with border-l-4 border-l-sign-green
 * - Species displayed as comma-separated list
 * - Type icon displayed in top-right corner
 * - Coordinates link to Google Maps if provided
 */
```

**Water Type Icons**:

- `river`: Wavy horizontal lines
- `lake`: Circular water droplet
- `pond`: Small circle
- `stream`: Single wavy line

---

### 6. WMARegulations Component

Displays hunting regulations, zone boundaries, and safety requirements.

```typescript
/**
 * WMARegulations.astro
 * Prominent display of regulations with safety-orange accent
 *
 * @example
 * <WMARegulations
 *   title="Regulations & Safety"
 *   zone="Zone 3"
 *   restrictions={[
 *     'WMA closed during controlled deer hunts - check DNR calendar',
 *     'Blaze orange required during firearms seasons',
 *     'Check zone boundaries before you set up - DNR enforces strictly'
 *   ]}
 *   additionalInfo="Contact DNR District 4 office for current closure dates"
 *   variant="cream"
 * />
 */
interface WMARegulationsProps {
  /** Section heading (default: "Regulations & Safety") */
  title?: string;
  /** Optional intro paragraph below heading */
  intro?: string;
  /** WV DNR hunting zone identifier (optional) */
  zone?: string;
  /** Array of regulation statements and safety requirements */
  restrictions: string[];
  /** Additional contact or reference info (optional) */
  additionalInfo?: string;
  /** Background style (default: 'cream') */
  variant?: 'white' | 'cream';
  /** Enable gentle reveal animation (default: true) */
  animate?: boolean;
}

/**
 * Visual treatment:
 * - Border-left accent: border-l-4 border-l-brand-orange (safety emphasis)
 * - Restrictions as bulleted list with orange bullet points
 * - Zone displayed as bold header if provided
 * - additionalInfo displayed in italic below list
 *
 * Slots:
 * - footer: Optional slot for links to DNR resources
 */
```

**Safety-First Design**:

- Uses `border-l-brand-orange` to draw attention (blaze orange = hunting safety)
- Restrictions presented as clear bulleted list
- Optional zone badge for DNR zone identification
- Footer slot for external DNR regulation links

---

## Integration Pattern

All 6 components work together on WMA pages following this structure:

```astro
---
// wv-wild-web/src/pages/near/elk-river.astro (AFTER refactor)
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';

// NEW: WMA-specific components
import WMAHero from '../../components/wma/WMAHero.astro';
import AdventureQuickStats from '../../components/adventure/AdventureQuickStats.astro';
import WMASpeciesGrid from '../../components/wma/WMASpeciesGrid.astro';
import WMAFacilitiesGrid from '../../components/wma/WMAFacilitiesGrid.astro';
import WMAFishingWaters from '../../components/wma/WMAFishingWaters.astro';
import WMARegulations from '../../components/wma/WMARegulations.astro';

// Content configuration (150 lines instead of 533)
const heroImage = await import('../../assets/wma/elk-river-hero.jpg');
const wmaData = {
  name: 'Elk River WMA',
  acreage: 19646,
  county: 'Braxton',
  driveTime: '15 min',
  description: "West Virginia's oldest wildlife management area...",

  stats: [...],
  species: [...],
  facilities: [...],
  waters: [...],
  regulations: [...]
};
---

<Layout title="..." description="...">
  <Header />
  <Breadcrumb items={breadcrumbItems} />

  <main class="bg-brand-cream min-h-screen">
    <WMAHero {...wmaData} image={heroImage} imageAlt="..." />
    <AdventureQuickStats stats={wmaData.stats} columns={4} variant="white" />
    <WMASpeciesGrid species={wmaData.species} variant="cream" />
    <WMAFacilitiesGrid facilities={wmaData.facilities} variant="white" />
    <WMAFishingWaters waters={wmaData.waters} variant="cream" />
    <WMARegulations {...wmaData.regulations} variant="cream" />
  </main>

  <Footer />
</Layout>
```

---

## Slot Usage Patterns

### Named Slots for Customization

Each component supports slots for flexible content injection:

#### WMAHero Slots

```astro
<WMAHero {...props}>
  <!-- Default slot: Additional content below description -->
  <p class="font-hand text-brand-cream/80">
    Kim's personal note about this WMA
  </p>

  <!-- badge-extra slot: Custom badges -->
  <div slot="badge-extra">
    <span class="bg-brand-orange px-4 py-1">New Trail!</span>
  </div>
</WMAHero>
```

#### WMAFacilitiesGrid Slots

```astro
<WMAFacilitiesGrid facilities={facilities}>
  <!-- footer slot: Accessibility notes -->
  <div slot="footer">
    <p class="text-sm text-brand-mud/75 italic">
      ADA-accessible parking available at main entrance
    </p>
  </div>
</WMAFacilitiesGrid>
```

#### WMARegulations Slots

```astro
<WMARegulations restrictions={restrictions}>
  <!-- footer slot: External regulation links -->
  <div slot="footer">
    <a href="..." class="text-sign-green underline">
      View full DNR regulations
    </a>
  </div>
</WMARegulations>
```

---

## Variant System

Components use a consistent variant system for alternating backgrounds:

```typescript
type ComponentVariant = 'white' | 'cream';

// Mapped to Tailwind classes:
const bgClass = variant === 'white' ? 'bg-white' : 'bg-brand-cream';
```

**Recommended Page Flow** (prevents visual monotony):

1. WMAHero - `bg-brand-brown` (hero always dark)
2. WMAQuickStats - `variant="white"`
3. WMASpeciesGrid - `variant="cream"`
4. WMAFacilitiesGrid - `variant="white"`
5. WMAFishingWaters - `variant="cream"`
6. WMARegulations - `variant="cream"`

---

## Responsive Grid Patterns

All grid components follow mobile-first responsive patterns:

```typescript
// Column mapping (example from WMASpeciesGrid)
const columnClasses: Record<1 | 2, string> = {
  1: 'grid-cols-1',                    // Full width all screens
  2: 'grid-cols-1 md:grid-cols-2',    // 1 col mobile, 2 col desktop
};

// Facilities grid supports more columns
const facilityColumnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};
```

**Breakpoints**:

- Mobile: `< 768px` (single column)
- Tablet: `768px - 1024px` (2 columns)
- Desktop: `> 1024px` (3-4 columns for facilities)

---

## Icon System Integration

Components integrate with the existing icon system from SPEC-10/11:

```typescript
// From src/types/adventure.ts
export const STAT_ICON_PATHS: Record<StatIcon, string> = {
  area: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10...',
  time: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  location: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244...',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2...',
  // ... more icons
};

// Usage in components
<svg class="w-6 h-6 text-sign-green" viewBox="0 0 24 24">
  <path d={STAT_ICON_PATHS[icon]} />
</svg>
```

**Custom Icon Support**:

- All components accept `customIconPath` prop for non-standard icons
- Falls back to predefined paths via icon identifier
- Supports `icon="none"` to omit icon entirely

---

## Type Safety Benefits

TypeScript interfaces provide compile-time safety:

```typescript
// ✅ Valid - all required props provided
<WMAHero
  name="Elk River WMA"
  acreage={19646}
  county="Braxton"
  description="..."
/>

// ❌ Type error - missing required prop
<WMAHero
  name="Elk River WMA"
  acreage={19646}
  // Missing: county, description
/>

// ✅ Valid - optional props can be omitted
<WMASpeciesGrid
  species={speciesArray}
  // columns defaults to 2
  // variant defaults to 'cream'
/>

// ❌ Type error - invalid category value
const invalidSpecies: SpeciesItem = {
  name: 'Deer',
  category: 'invalid-category', // Error: not in union type
  season: '...',
  description: '...'
};
```

---

## Summary

**Key Design Principles**:

1. **Content-only pages**: WMA pages become pure data configuration (150 lines vs 533)
2. **Reusable structure**: All 8 WMAs share identical component architecture
3. **Type safety**: TypeScript interfaces catch missing or invalid props at build time
4. **Slot flexibility**: Custom content injection without breaking layout
5. **Variant system**: Alternating white/cream backgrounds prevent visual monotony
6. **Icon integration**: Reuses existing STAT_ICON_PATHS system from SPEC-10/11
7. **Responsive grids**: Mobile-first patterns with configurable columns
8. **Accessibility**: WCAG 2.1 AA compliance enforced at component level

**Line Count Reduction**:

- Before: 533 lines per WMA page (8 pages = 4,264 total)
- After: 150 lines per WMA page (8 pages = 1,200 total)
- **Savings**: 3,064 lines (73% reduction)
