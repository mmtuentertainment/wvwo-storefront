# AdventureHero Component Architecture

> **Component Type**: Astro (.astro)
> **Purpose**: Unified hero section for 50+ adventure detail pages
> **Location**: `wv-wild-web/src/components/adventures/AdventureHero.astro`

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [TypeScript Interfaces](#typescript-interfaces)
3. [Slot Architecture](#slot-architecture)
4. [Prop Validation Strategy](#prop-validation-strategy)
5. [ID Generation Pattern](#id-generation-pattern)
6. [Content Collections Integration](#content-collections-integration)
7. [Usage Examples](#usage-examples)
8. [Extension Points](#extension-points)
9. [CSS Custom Properties](#css-custom-properties)
10. [Schema.org Integration](#schemaorg-integration)

---

## Design Philosophy

### Core Principles

1. **Single Component, Infinite Variations**: One component serves turkey hunting guides, lake fishing spots, kayaking adventures, and scenic hikes without branching logic
2. **Slot-Driven Customization**: Page-specific content via named slots, not prop explosion
3. **Content Collections First**: Props derive from Astro Content Collections schema - type safety flows from source
4. **Progressive Enhancement**: Works without JS, enhanced with optional interactive elements
5. **WVWO Aesthetic Enforcement**: Brand colors, rounded-sm, Kim's voice baked into defaults

### What This Component Is NOT

- NOT a Swiss Army knife with 30+ props
- NOT a React component (use Astro for static heroes)
- NOT aware of e-commerce state (SPEC-05 compliance)

---

## TypeScript Interfaces

### Primary Props Interface

```typescript
// wv-wild-web/src/components/adventures/AdventureHero.astro

import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

/**
 * Difficulty levels from content.config.ts DifficultyEnum
 * Matches: z.enum(['easy', 'moderate', 'challenging', 'rugged'])
 */
type Difficulty = 'easy' | 'moderate' | 'challenging' | 'rugged';

/**
 * Season values from content.config.ts SeasonEnum
 */
type Season = 'spring' | 'summer' | 'fall' | 'winter';

/**
 * Schema.org type for structured data
 * - Place: Geographic locations (lakes, WMAs, trailheads)
 * - Article: Written guides and how-tos
 * - Event: Seasonal activities with dates
 */
type SchemaType = 'Place' | 'Article' | 'Event';

/**
 * Hero image configuration
 * Supports both static imports and remote URLs
 */
interface HeroImage {
  /** Astro ImageMetadata for optimized images, or string URL for remote */
  src: ImageMetadata | string;
  /** Required alt text for accessibility */
  alt: string;
  /** Focal point for responsive cropping */
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

/**
 * GPS coordinates for location-based features
 */
interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Main props interface for AdventureHero
 */
interface Props {
  // ═══════════════════════════════════════════════════════════════════════════
  // REQUIRED PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Adventure title - becomes h1 */
  title: string;

  /** Kim's voice description - 1-2 sentences max */
  description: string;

  /** Difficulty level from DifficultyEnum */
  difficulty: Difficulty;

  /** Primary season(s) for this adventure */
  season: Season | Season[];

  /** Hero image with required alt text */
  image: HeroImage;

  // ═══════════════════════════════════════════════════════════════════════════
  // OPTIONAL PROPS (With Smart Defaults)
  // ═══════════════════════════════════════════════════════════════════════════

  /** Drive time from shop (e.g., "20 min", "1 hr 15 min") */
  driveTime?: string;

  /** Location name for badge (e.g., "Burnsville Lake WMA") */
  location?: string;

  /** Image loading strategy - eager for above-fold heroes */
  loading?: 'lazy' | 'eager';

  /** ISO date strings for freshness signals */
  publishedDate?: string;
  updatedDate?: string;

  /** GPS coordinates for maps and schema */
  coordinates?: Coordinates;

  /** Schema.org type for structured data */
  schemaType?: SchemaType;

  /**
   * URL-safe identifier for aria-labelledby and anchor links
   * Auto-generated from title if not provided
   */
  slug?: string;

  /** Elevation gain in feet (for hiking/hunting adventures) */
  elevationGain?: number;

  /** Array of gear items needed */
  gear?: string[];

  /**
   * Override hero height (use sparingly)
   * Default: 'standard' (50vh min-h-[400px])
   */
  heroHeight?: 'compact' | 'standard' | 'tall';
}
```

### Derived Types for Content Collections

```typescript
/**
 * Helper type to extract Props from a Content Collection entry
 * Use this when passing adventure data directly from getCollection()
 */
type AdventureHeroFromEntry = {
  entry: CollectionEntry<'adventures'>;
  /** Override any entry data with explicit props */
  overrides?: Partial<Omit<Props, 'title' | 'description'>>;
};

/**
 * Type guard for image source
 */
function isImageMetadata(src: unknown): src is ImageMetadata {
  return typeof src === 'object' && src !== null && 'src' in src;
}
```

---

## Slot Architecture

### Slot Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ AdventureHero                                                                │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ HERO IMAGE (background)                                                  │ │
│ │                                                                          │ │
│ │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│ │  │ CONTENT OVERLAY                                                   │  │ │
│ │  │                                                                   │  │ │
│ │  │  ┌─────────────────────────────────────────────────────────────┐ │  │ │
│ │  │  │ BADGE AREA                                                   │ │  │ │
│ │  │  │ [driveTime badge] [difficulty badge] <slot:badge-extra />   │ │  │ │
│ │  │  └─────────────────────────────────────────────────────────────┘ │  │ │
│ │  │                                                                   │  │ │
│ │  │  <h1>{title}</h1>                                                │  │ │
│ │  │  <p>{description}</p>                                            │  │ │
│ │  │                                                                   │  │ │
│ │  │  ┌─────────────────────────────────────────────────────────────┐ │  │ │
│ │  │  │ CTA AREA                                                     │ │  │ │
│ │  │  │ <slot:cta />  (or default "Call the Shop" if empty)         │ │  │ │
│ │  │  └─────────────────────────────────────────────────────────────┘ │  │ │
│ │  │                                                                   │  │ │
│ │  │  ┌─────────────────────────────────────────────────────────────┐ │  │ │
│ │  │  │ META STRIP (seasons, location, elevation)                   │ │  │ │
│ │  │  └─────────────────────────────────────────────────────────────┘ │  │ │
│ │  │                                                                   │  │ │
│ │  └──────────────────────────────────────────────────────────────────┘  │ │
│ │                                                                          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│ <slot /> (DEFAULT SLOT - page content flows below hero)                      │
│                                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ASIDE PANEL (optional, desktop only)                                     │ │
│ │ <slot:aside />                                                           │ │
│ │ Quick facts, weather widget, related gear                                │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Named Slots Definition

```typescript
/**
 * Slot contracts for AdventureHero
 * Each slot has clear purpose and empty-state behavior
 */
interface SlotContracts {
  /**
   * DEFAULT SLOT
   * Position: Below hero, main content area
   * Use for: Adventure body content, sections, maps
   * Empty behavior: Component still renders (hero-only mode)
   */
  default: true;

  /**
   * CTA SLOT
   * Position: Below description, inline with hero content
   * Use for: Primary action buttons (1-3 buttons max)
   * Empty behavior: Renders default "Call the Shop" CTA
   * Max recommended: 3 buttons (primary + 2 secondary)
   */
  cta: true;

  /**
   * BADGE-EXTRA SLOT
   * Position: Badge row, after difficulty badge
   * Use for: Custom badges (e.g., "FFL Required", "Season Dates")
   * Empty behavior: No wrapper rendered (clean DOM)
   * Styling: Inherits badge styling context
   */
  'badge-extra': true;

  /**
   * ASIDE SLOT
   * Position: Right sidebar on desktop, below content on mobile
   * Use for: Quick facts, weather, related gear, maps
   * Empty behavior: No aside panel rendered
   * Responsive: Hidden on mobile by default
   */
  aside: true;

  /**
   * SCHEMA-EXTRA SLOT
   * Position: <head> injection via Astro
   * Use for: Additional structured data beyond auto-generated
   * Empty behavior: Only base schema rendered
   */
  'schema-extra': true;
}
```

### Empty Slot Detection Pattern

```astro
---
// In AdventureHero.astro frontmatter
const hasCtaSlot = Astro.slots.has('cta');
const hasBadgeExtra = Astro.slots.has('badge-extra');
const hasAside = Astro.slots.has('aside');
---

<!-- CTA Section: Slot or Default -->
<div class="cta-container">
  {hasCtaSlot ? (
    <slot name="cta" />
  ) : (
    <!-- Default CTA when slot is empty -->
    <a href={SITE_CONTACT.phoneHref} class="btn-primary">
      Call the Shop
    </a>
  )}
</div>

<!-- Badge Extra: No wrapper if empty -->
{hasBadgeExtra && (
  <slot name="badge-extra" />
)}

<!-- Aside: Only render container if slot has content -->
{hasAside && (
  <aside class="adventure-aside">
    <slot name="aside" />
  </aside>
)}
```

---

## Prop Validation Strategy

### Runtime Validation (Astro Frontmatter)

```astro
---
import { SITE_CONTACT } from '../../config/siteContact';
import { Image } from 'astro:assets';

// Props with TypeScript interface
interface Props {
  title: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'rugged';
  season: string | string[];
  image: { src: ImageMetadata | string; alt: string; position?: string };
  driveTime?: string;
  location?: string;
  loading?: 'lazy' | 'eager';
  publishedDate?: string;
  updatedDate?: string;
  coordinates?: { lat: number; lng: number };
  schemaType?: 'Place' | 'Article' | 'Event';
  slug?: string;
  elevationGain?: number;
  gear?: string[];
  heroHeight?: 'compact' | 'standard' | 'tall';
}

const {
  title,
  description,
  difficulty,
  season,
  image,
  driveTime,
  location,
  loading = 'eager',  // Above-fold default
  publishedDate,
  updatedDate,
  coordinates,
  schemaType = 'Place',
  slug,
  elevationGain,
  gear,
  heroHeight = 'standard',
} = Astro.props;

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION & NORMALIZATION
// ═══════════════════════════════════════════════════════════════════════════

// Difficulty validation (TypeScript catches at build, this catches runtime)
const VALID_DIFFICULTIES = ['easy', 'moderate', 'challenging', 'rugged'] as const;
if (!VALID_DIFFICULTIES.includes(difficulty)) {
  console.warn(`[AdventureHero] Invalid difficulty "${difficulty}" for "${title}". Defaulting to "moderate".`);
}
const validDifficulty = VALID_DIFFICULTIES.includes(difficulty) ? difficulty : 'moderate';

// Season normalization (always array)
const seasons = Array.isArray(season) ? season : [season];

// DriveTime format validation and normalization
function normalizeDriveTime(raw?: string): string | undefined {
  if (!raw) return undefined;

  // Already normalized: "20 min", "1 hr 15 min"
  if (/^\d+\s*(min|hr)(\s+\d+\s*min)?$/.test(raw)) {
    return raw;
  }

  // Common variants: "20 minutes" -> "20 min"
  const normalized = raw
    .replace(/minutes?/i, 'min')
    .replace(/hours?/i, 'hr')
    .replace(/\s+/g, ' ')
    .trim();

  if (import.meta.env.DEV && normalized !== raw) {
    console.info(`[AdventureHero] Normalized driveTime: "${raw}" -> "${normalized}"`);
  }

  return normalized;
}
const normalizedDriveTime = normalizeDriveTime(driveTime);

// Image alt text enforcement (accessibility)
if (!image.alt || image.alt.trim() === '') {
  console.error(`[AdventureHero] Missing alt text for hero image in "${title}". This is an accessibility violation.`);
}

// Slug generation
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
const heroSlug = slug || generateSlug(title);

// Image position default
const imagePosition = image.position || 'center';

// Height classes mapping
const heightClasses = {
  compact: 'min-h-[300px] py-12',
  standard: 'min-h-[400px] md:min-h-[50vh] py-16 md:py-24',
  tall: 'min-h-[500px] md:min-h-[70vh] py-20 md:py-32',
};

// Difficulty badge color mapping
const difficultyColors = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-orange text-white',
  challenging: 'bg-brand-brown text-white',
  rugged: 'bg-red-700 text-white',
};

// Check for named slots
const hasCtaSlot = Astro.slots.has('cta');
const hasBadgeExtra = Astro.slots.has('badge-extra');
const hasAside = Astro.slots.has('aside');
---
```

### Build-Time Type Checking

The Content Collections schema in `content.config.ts` provides build-time validation:

```typescript
// content.config.ts (already exists)
const DifficultyEnum = z.enum(['easy', 'moderate', 'challenging', 'rugged']);

// When using with Content Collections, types flow automatically
const adventure = await getEntry('adventures', 'spring-gobbler-burnsville');
// adventure.data.difficulty is typed as 'easy' | 'moderate' | 'challenging' | 'rugged'
```

---

## ID Generation Pattern

### Dynamic ID Strategy

```astro
---
// ID generation for accessibility and deep linking
const heroId = `adventure-hero-${heroSlug}`;
const headingId = `${heroId}-heading`;
const descId = `${heroId}-description`;
const badgeGroupId = `${heroId}-badges`;

// Collision detection (for pages with multiple heroes - rare but possible)
const uniqueId = Astro.props.id || heroId;
---

<section
  id={uniqueId}
  class="adventure-hero relative overflow-hidden {heightClasses[heroHeight]}"
  aria-labelledby={headingId}
  aria-describedby={descId}
>
  <!-- Badge group for screen readers -->
  <div id={badgeGroupId} role="group" aria-label="Adventure details">
    {normalizedDriveTime && (
      <span class="badge bg-sign-green">
        {normalizedDriveTime} from shop
      </span>
    )}
    <span class={`badge ${difficultyColors[validDifficulty]}`}>
      {validDifficulty}
    </span>
    <slot name="badge-extra" />
  </div>

  <h1 id={headingId} class="font-display font-black text-4xl md:text-6xl">
    {title}
  </h1>

  <p id={descId} class="text-xl md:text-2xl text-brand-cream/80">
    {description}
  </p>
</section>
```

### Deep Link Support

```html
<!-- Generated anchors for in-page navigation -->
<nav aria-label="On this page" class="adventure-toc">
  <a href="#{uniqueId}">Jump to hero</a>
  <!-- Page can add more anchors via slots -->
</nav>
```

---

## Content Collections Integration

### Pattern 1: Direct Entry Spread

```astro
---
// In: src/pages/adventures/[...slug].astro
import { getCollection, getEntry } from 'astro:content';
import AdventureHero from '../../components/adventures/AdventureHero.astro';
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  const adventures = await getCollection('adventures');
  return adventures.map(adventure => ({
    params: { slug: adventure.id },
    props: { adventure },
  }));
}

const { adventure } = Astro.props;
const { Content } = await adventure.render();

// Map Content Collection fields to hero props
const heroProps = {
  title: adventure.data.title,
  description: adventure.data.description,
  difficulty: adventure.data.difficulty,
  season: adventure.data.season,
  driveTime: adventure.data.drive_time,
  location: adventure.data.location,
  coordinates: adventure.data.coordinates,
  elevationGain: adventure.data.elevation_gain,
  gear: adventure.data.gear,
  // Image from collection or fallback
  image: adventure.data.images?.[0]
    ? { src: adventure.data.images[0].src, alt: adventure.data.images[0].alt }
    : { src: '/images/adventures/default-hero.jpg', alt: adventure.data.title },
  slug: adventure.id,
};
---

<Layout title={`${adventure.data.title} | WV Wild Outdoors`}>
  <AdventureHero {...heroProps}>
    <Fragment slot="cta">
      <a href="/shop" class="btn-primary">Browse Related Gear</a>
      <a href={`tel:${SITE_CONTACT.phone}`} class="btn-secondary">Call for Tips</a>
    </Fragment>

    <!-- Main content from markdown -->
    <Content />
  </AdventureHero>
</Layout>
```

### Pattern 2: Factory Helper Function

```typescript
// src/lib/adventures/heroFactory.ts

import type { CollectionEntry } from 'astro:content';
import type { Props as AdventureHeroProps } from '../components/adventures/AdventureHero.astro';

/**
 * Transform a Content Collection entry to AdventureHero props
 * Provides type safety and centralized mapping logic
 */
export function createHeroProps(
  entry: CollectionEntry<'adventures'>,
  overrides?: Partial<AdventureHeroProps>
): AdventureHeroProps {
  const { data, id } = entry;

  // Default image with fallback
  const image = data.images?.[0]
    ? {
        src: data.images[0].src,
        alt: data.images[0].alt,
        position: 'center' as const,
      }
    : {
        src: '/images/adventures/default-hero.jpg',
        alt: data.title,
        position: 'center' as const,
      };

  return {
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    season: data.season,
    image,
    driveTime: data.drive_time,
    location: data.location,
    coordinates: data.coordinates,
    elevationGain: data.elevation_gain,
    gear: data.gear,
    slug: id,
    schemaType: 'Place',
    loading: 'eager',
    ...overrides,
  };
}

/**
 * Create props for a Location-based hero (lakes, WMAs)
 */
export function createLocationHeroProps(
  entry: CollectionEntry<'locations'>,
  overrides?: Partial<AdventureHeroProps>
): AdventureHeroProps {
  const { data, id } = entry;

  return {
    title: data.name,
    description: data.directions,
    difficulty: 'easy', // Locations don't have difficulty
    season: ['spring', 'summer', 'fall', 'winter'], // Year-round by default
    image: data.images?.[0]
      ? { src: data.images[0].src, alt: data.images[0].alt }
      : { src: '/images/locations/default.jpg', alt: data.name },
    driveTime: data.i79_proximity?.split(',')[1]?.trim(),
    location: data.name,
    coordinates: data.coordinates,
    slug: id,
    schemaType: 'Place',
    ...overrides,
  };
}
```

### Pattern 3: Hybrid with Overrides

```astro
---
// For pages that need to customize beyond Content Collection data
import { getEntry } from 'astro:content';
import { createHeroProps } from '../../lib/adventures/heroFactory';
import AdventureHero from '../../components/adventures/AdventureHero.astro';

const entry = await getEntry('adventures', 'spring-gobbler-burnsville');

// Base props from collection, with page-specific overrides
const heroProps = createHeroProps(entry, {
  // Override image for this specific page
  image: {
    src: import('../assets/spring-turkey-hero.jpg'),
    alt: 'Morning fog over Burnsville Lake WMA turkey roosting ridge',
    position: 'bottom', // Custom focal point
  },
  // Add dates for Article schema
  schemaType: 'Article',
  publishedDate: '2024-03-15',
  updatedDate: '2025-01-10',
});
---

<AdventureHero {...heroProps}>
  <!-- Custom CTA for turkey season -->
  <Fragment slot="cta">
    <a href="/shop?category=turkey" class="btn-primary">
      Turkey Hunting Gear
    </a>
    <a href="/guides/turkey-calls" class="btn-secondary">
      Call Selection Guide
    </a>
  </Fragment>

  <!-- Custom aside for seasonal info -->
  <aside slot="aside" class="quick-facts">
    <h3>2025 Season Dates</h3>
    <dl>
      <dt>Youth/Mobility Impaired</dt>
      <dd>April 12-13</dd>
      <dt>Spring Gobbler</dt>
      <dd>April 21 - May 23</dd>
    </dl>
  </aside>

  <!-- Page content -->
  <Content />
</AdventureHero>
```

---

## Usage Examples

### Minimal (Required Props Only)

```astro
---
import AdventureHero from '../components/adventures/AdventureHero.astro';
---

<AdventureHero
  title="Spring Gobbler Season"
  description="Turkey season's here. We've been scouting - the birds are gobbling."
  difficulty="moderate"
  season="spring"
  image={{
    src: "/images/turkey-hunt.jpg",
    alt: "Turkey decoy at dawn on Burnsville ridge"
  }}
/>
```

**Result**: Hero with title, description, difficulty badge, season tag, default CTA.

---

### Standard (Props + CTA Slot)

```astro
---
import AdventureHero from '../components/adventures/AdventureHero.astro';
import { SITE_CONTACT } from '../config/siteContact';
---

<AdventureHero
  title="Sutton Lake Bass Fishing"
  description="1,440 acres of Army Corps lake. Largemouth, smallmouth, and walleye."
  difficulty="easy"
  season={["spring", "summer", "fall"]}
  driveTime="10 min"
  location="Sutton Lake"
  image={{
    src: "/images/sutton-lake.jpg",
    alt: "Sutton Lake boat ramp at sunrise",
    position: "bottom"
  }}
  coordinates={{ lat: 38.6589, lng: -80.7000 }}
  schemaType="Place"
>
  <Fragment slot="cta">
    <a
      href="/shop?category=fishing"
      class="inline-flex items-center gap-2 bg-sign-green text-white font-bold px-6 py-3 rounded-sm hover:bg-sign-green/90"
    >
      Browse Fishing Gear
    </a>
    <a
      href={SITE_CONTACT.phoneHref}
      class="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-sm hover:bg-white/20"
    >
      What's Biting? Call Us
    </a>
  </Fragment>

  <!-- Default slot: page content -->
  <section class="py-12">
    <h2>What to Catch</h2>
    <!-- ... -->
  </section>
</AdventureHero>
```

---

### Rich (All Props + Multiple Slots + Custom Badges)

```astro
---
import AdventureHero from '../components/adventures/AdventureHero.astro';
import WeatherWidget from '../components/WeatherWidget.astro';
import { SITE_CONTACT } from '../config/siteContact';

// Import optimized image
import heroImage from '../assets/burnsville-turkey.jpg';
---

<AdventureHero
  title="Spring Gobbler at Burnsville Lake WMA"
  description="12,000 acres of prime turkey ground. The birds roost along the ridges overlooking the lake - on a quiet morning, you can hear them gobbling from across the hollow."
  difficulty="moderate"
  season={["spring"]}
  driveTime="25 min"
  location="Burnsville Lake WMA"
  image={{
    src: heroImage,
    alt: "Morning mist over Burnsville Lake WMA turkey habitat",
    position: "center"
  }}
  coordinates={{ lat: 38.8567, lng: -80.5331 }}
  elevationGain={1450}
  gear={["turkey vest", "box call", "slate call", "decoys", "shotgun"]}
  schemaType="Article"
  publishedDate="2024-03-01"
  updatedDate="2025-04-10"
  heroHeight="tall"
>
  <!-- Extra badges -->
  <Fragment slot="badge-extra">
    <span class="inline-block bg-brand-brown text-white px-4 py-1 rounded-sm font-bold text-sm">
      Class Q Required
    </span>
    <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-sm font-bold text-sm">
      April 21 - May 23
    </span>
  </Fragment>

  <!-- Custom CTAs -->
  <Fragment slot="cta">
    <a
      href="/shop?category=turkey-hunting"
      class="inline-flex items-center gap-2 bg-sign-green text-white font-bold px-6 py-3 rounded-sm hover:bg-sign-green/90"
    >
      Turkey Gear In Stock
    </a>
    <a
      href="/guides/turkey-calls"
      class="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-6 py-3 rounded-sm hover:bg-white/20"
    >
      Call Selection Guide
    </a>
    <a
      href={SITE_CONTACT.phoneHref}
      class="inline-flex items-center gap-2 text-white/80 underline hover:text-white"
    >
      Need Tips? Call Kim
    </a>
  </Fragment>

  <!-- Aside panel with quick facts and weather -->
  <aside slot="aside">
    <div class="bg-white p-6 rounded-sm border-l-4 border-sign-green">
      <h3 class="font-display font-bold text-lg mb-4">Quick Facts</h3>
      <dl class="space-y-2 text-sm">
        <dt class="font-bold text-brand-brown">Acreage</dt>
        <dd>12,000+ acres</dd>
        <dt class="font-bold text-brand-brown">Best Setup Time</dt>
        <dd>30 min before sunrise</dd>
        <dt class="font-bold text-brand-brown">Bag Limit</dt>
        <dd>2 bearded turkeys / season</dd>
      </dl>
    </div>

    <!-- Weather widget (React island) -->
    <WeatherWidget
      lat={38.8567}
      lng={-80.5331}
      client:visible
    />
  </aside>

  <!-- Main content (default slot) -->
  <article class="prose max-w-3xl mx-auto py-12">
    <h2>What to Expect</h2>
    <p>The WMA covers over 12,000 acres of mixed hardwoods...</p>

    <h2>Kim's Take</h2>
    <blockquote class="font-hand text-xl text-brand-orange">
      "I've hunted this WMA since I was a kid. The birds here aren't call-shy..."
    </blockquote>
  </article>
</AdventureHero>
```

---

## Extension Points

### Adding a Weather Widget

```astro
---
// WeatherWidget is a React component with client:visible hydration
import WeatherWidget from '../components/WeatherWidget';
---

<AdventureHero {...heroProps}>
  <aside slot="aside">
    <!-- Static content -->
    <div class="quick-facts">...</div>

    <!-- React island for weather -->
    <WeatherWidget
      lat={heroProps.coordinates?.lat}
      lng={heroProps.coordinates?.lng}
      client:visible
    />
  </aside>
</AdventureHero>
```

**Key Pattern**: React components go in slots with `client:` directives. The hero itself stays Astro (static).

---

### Video Hero Variant (Future)

```typescript
// Extended Props for video support
interface VideoHeroProps extends Props {
  /** Video source for background (MP4 preferred) */
  video?: {
    src: string;
    poster: string; // Fallback image
    loop?: boolean;
    muted?: boolean; // Default true for autoplay
  };
}
```

```astro
---
// In AdventureHero.astro, check for video prop
const hasVideo = Astro.props.video?.src;
---

{hasVideo ? (
  <video
    class="absolute inset-0 w-full h-full object-cover"
    poster={video.poster}
    autoplay
    muted={video.muted ?? true}
    loop={video.loop ?? true}
    playsinline
  >
    <source src={video.src} type="video/mp4" />
  </video>
) : (
  <Image
    src={image.src}
    alt={image.alt}
    class="absolute inset-0 w-full h-full object-cover"
    style={`object-position: ${imagePosition}`}
    loading={loading}
  />
)}
```

---

### Custom Theming via CSS Custom Properties

```astro
---
// Allow per-page theme overrides
const customTheme = Astro.props.theme;
---

<section
  class="adventure-hero"
  style={customTheme ? `
    --hero-overlay-start: ${customTheme.overlayStart ?? 'rgba(62, 39, 35, 0.9)'};
    --hero-overlay-end: ${customTheme.overlayEnd ?? 'transparent'};
    --hero-accent: ${customTheme.accent ?? 'var(--color-sign-green)'};
  ` : undefined}
>
```

---

## CSS Custom Properties

### Exposed Custom Properties

```css
/* In global.css or component <style> */
.adventure-hero {
  /* Overlay gradient */
  --hero-overlay-start: rgba(62, 39, 35, 0.9);  /* brand-brown at 90% */
  --hero-overlay-end: transparent;
  --hero-overlay-direction: to right;

  /* Text colors */
  --hero-text-primary: var(--color-white);
  --hero-text-secondary: rgba(255, 248, 225, 0.8);  /* brand-cream at 80% */

  /* Accent color (badges, links) */
  --hero-accent: var(--color-sign-green);

  /* Spacing */
  --hero-padding-x: var(--space-4);
  --hero-padding-y: var(--space-16);

  /* Animation */
  --hero-transition-duration: 0.3s;
  --hero-transition-easing: ease-out;
}

/* Allow overrides via inline style */
.adventure-hero[style*="--hero"] {
  /* Custom properties applied */
}
```

### Usage in Page

```astro
<AdventureHero
  {...heroProps}
  style="
    --hero-overlay-start: rgba(46, 125, 50, 0.85);
    --hero-accent: var(--color-brand-orange);
  "
>
```

---

## Schema.org Integration

### Auto-Generated Schema

```astro
---
// Build Schema.org structured data from props
function buildSchema(props: Props, siteUrl: string) {
  const base = {
    "@context": "https://schema.org",
    "@type": props.schemaType || "Place",
    "name": props.title,
    "description": props.description,
    "url": `${siteUrl}/adventures/${props.slug}/`,
  };

  // Add geo if coordinates provided
  if (props.coordinates) {
    base.geo = {
      "@type": "GeoCoordinates",
      "latitude": props.coordinates.lat,
      "longitude": props.coordinates.lng,
    };
  }

  // Add dates for Article type
  if (props.schemaType === 'Article') {
    if (props.publishedDate) base.datePublished = props.publishedDate;
    if (props.updatedDate) base.dateModified = props.updatedDate;
    base.author = {
      "@type": "Organization",
      "name": "WV Wild Outdoors",
    };
  }

  // Add event dates if Event type
  if (props.schemaType === 'Event') {
    // Event-specific properties would go here
  }

  return base;
}

const schema = buildSchema(Astro.props, siteUrl);
---

<!-- Inject in head via Layout's additionalSchemas prop -->
<script type="application/ld+json" set:html={JSON.stringify(schema)} />

<!-- Or use schema-extra slot for page-specific additions -->
<slot name="schema-extra" />
```

---

## Component File Structure

```text
wv-wild-web/src/components/adventures/
├── AdventureHero.astro       # Main hero component
├── AdventureCard.tsx         # Grid card (existing)
├── heroFactory.ts            # Content Collection -> Props helpers
├── types.ts                  # Shared TypeScript interfaces
└── styles/
    └── adventure-hero.css    # Scoped styles (optional)
```

---

## Checklist for Implementation

- [ ] Create `AdventureHero.astro` with full Props interface
- [ ] Implement slot detection pattern (`Astro.slots.has()`)
- [ ] Add runtime validation for difficulty enum
- [ ] Create `heroFactory.ts` for Content Collection integration
- [ ] Add CSS custom properties for theming
- [ ] Build Schema.org generator function
- [ ] Create usage examples in Storybook or test pages
- [ ] Document in component JSDoc comments
- [ ] Test with all 5 Content Collections (adventures, locations, stories, resources, products)

---

## Related Specifications

- **SPEC-06**: Astro Content Collections Schema
- **SPEC-07**: Adventures Hub + Filtering
- **SPEC-08**: Adventure Card Enhancements
- **WVWO_FRONTEND_AESTHETICS.md**: Design system constraints

---

**Architecture Document v1.0 | December 2025**
