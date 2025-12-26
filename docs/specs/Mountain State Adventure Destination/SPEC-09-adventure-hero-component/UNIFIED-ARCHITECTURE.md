# SPEC-09: AdventureHero.astro Unified Architecture

**Version**: 1.0.0
**Date**: 2025-12-26
**Synthesized From**: 6-Agent Hivemind Architecture Swarm
**Status**: Ready for Implementation

---

## Executive Summary

This document synthesizes findings from a 6-agent architecture swarm into a unified design for the `AdventureHero.astro` component. The component serves as the hero section for 50+ adventure destination pages, delivering WVWO's authentic Appalachian aesthetic while meeting 2025 performance, accessibility, and SEO standards.

### Agent Contributions

| Agent | Focus Area | Key Innovation |
|-------|------------|----------------|
| Visual Architecture | Camo pattern, badges, typography | "Appalachian Woodland" organic camo SVG |
| Component Composition | Slots, props, Content Collections | 5-slot architecture with factory helpers |
| Performance | Core Web Vitals, image optimization | Zero-JS with 79KB first paint budget |
| SEO/Schema | Schema.org, geographic targeting | @graph approach with TouristAttraction |
| Accessibility | WCAG 2.2, screen readers | Shape icons for color-blind users |
| Animation/Motion | Reveals, reduced-motion | "Morning Mist Lift" staggered animation |

---

## 1. Visual Design System

### 1.1 Appalachian Woodland Camo Pattern

A new organic camo SVG designed specifically for WVWO:

```svg
<!-- ~1.2KB compressed, inline as data URI -->
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
    </filter>
  </defs>
  <!-- Organic blobs inspired by Appalachian forest floor -->
  <path d="M20,20 Q50,5 80,40 T120,60 T160,30" fill="#2E7D32" opacity="0.4" filter="url(#blur)"/>
  <path d="M10,100 Q40,80 70,120 T110,150 T180,110" fill="#3E2723" opacity="0.4" filter="url(#blur)"/>
  <path d="M120,10 Q150,50 180,20" fill="#5D4037" opacity="0.4" filter="url(#blur)"/>
  <path d="M50,160 Q90,140 130,180 T190,150" fill="#2E7D32" opacity="0.3" filter="url(#blur)"/>
</svg>
```

**CSS Implementation** (data URI for zero HTTP requests):

```css
.adventure-hero__camo {
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,...');
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: 0.05;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

### 1.2 Staggered Badge System

Badges with subtle rotation for "bulletin board" feel:

| Difficulty | Background | Text | Rotation | Shape Icon |
|------------|------------|------|----------|------------|
| Easy | sign-green | white | -1deg | Circle |
| Moderate | brand-orange | white | 0.5deg | Triangle |
| Advanced | brand-mud | brand-cream | -0.5deg | Square |
| Rugged | brand-brown-faded | brand-cream | 1deg | Diamond |

```css
.badge-easy { transform: rotate(-1deg); }
.badge-moderate { transform: rotate(0.5deg); }
.badge-advanced { transform: rotate(-0.5deg); }
.badge-rugged { transform: rotate(1deg); }
```

### 1.3 Image Frame Treatment

Rustic wood frame effect with hard shadows:

```css
.adventure-hero__image-frame {
  aspect-ratio: 4/3;
  border-radius: 2px; /* rounded-sm */
  box-shadow:
    8px 8px 0 0 rgba(62, 39, 35, 0.8),   /* Hard offset shadow */
    0 0 0 3px #5D4037;                     /* Inner border */
  overflow: hidden;
}

@media (min-width: 768px) {
  .adventure-hero__image-frame {
    aspect-ratio: 3/2;
  }
}
```

### 1.4 Typography Hierarchy

| Element | Font | Weight | Size (Mobile) | Size (Desktop) |
|---------|------|--------|---------------|----------------|
| Title (h1) | Bitter | 800-900 | 2.5rem | 4rem |
| Description | Noto Sans | 400 | 1.125rem | 1.25rem |
| Badges | Bitter | 700 | 0.875rem | 0.875rem |
| Kim's Take | Permanent Marker | 400 | 1.25rem | 1.5rem |

---

## 2. Component Architecture

### 2.1 TypeScript Props Interface

```typescript
import type { ImageMetadata } from 'astro';

type Difficulty = 'easy' | 'moderate' | 'advanced' | 'rugged';
type Season = 'spring' | 'summer' | 'fall' | 'winter';
type SchemaType = 'Place' | 'Article' | 'Event';

interface Props {
  // Required - Core Display
  title: string;
  description: string;
  difficulty: Difficulty;
  season: Season | Season[];

  // Required - Image
  image: ImageMetadata;
  imageAlt: string;

  // Optional - Image Control
  imagePosition?: 'center' | 'top' | 'bottom';
  loading?: 'lazy' | 'eager';           // Default: 'eager' (above-fold)

  // Optional - Location
  driveTime?: string;                    // "20 min", "1 hr 15 min"
  location?: string;                     // "Burnsville Lake WMA"
  coordinates?: { lat: number; lng: number };

  // Optional - SEO & Content
  publishedDate?: string;
  updatedDate?: string;
  schemaType?: SchemaType;
  slug?: string;                         // For unique IDs and URLs

  // Optional - Enhanced
  elevationGain?: number;
  gear?: string[];
  heroHeight?: 'compact' | 'standard' | 'tall';
}
```

### 2.2 Slot Architecture

```
+------------------------------------------------------------------+
| AdventureHero                                                     |
| +--------------------------------------------------------------+ |
| | CAMO OVERLAY (aria-hidden)                                    | |
| +--------------------------------------------------------------+ |
| | CONTENT                                                       | |
| |   +----------------------------------------------------------+| |
| |   | BADGE ROW                                                 || |
| |   | [driveTime] [difficulty] [season] <slot:badge-extra />   || |
| |   +----------------------------------------------------------+| |
| |   | <h1>{title}</h1>                                         || |
| |   | <p>{description}</p>                                     || |
| |   +----------------------------------------------------------+| |
| |   | CTA AREA                                                  || |
| |   | <slot:cta /> (or default "Call the Shop")                || |
| |   +----------------------------------------------------------+| |
| +--------------------------------------------------------------+ |
| | IMAGE COLUMN (desktop right)                                   | |
| +--------------------------------------------------------------+ |
| | <slot /> (DEFAULT - content below hero)                        | |
| +--------------------------------------------------------------+ |
| | <slot:aside /> (desktop sidebar, mobile collapsed)             | |
| +--------------------------------------------------------------+ |
| | <slot:schema-extra /> (additional JSON-LD)                     | |
+------------------------------------------------------------------+
```

**5 Named Slots**:

| Slot | Purpose | Empty Behavior |
|------|---------|----------------|
| `default` | Page content below hero | Renders hero-only |
| `cta` | Action buttons (1-3) | Default "Call the Shop" |
| `badge-extra` | Custom badges (FFL, dates) | No wrapper rendered |
| `aside` | Quick facts, weather | Panel hidden |
| `schema-extra` | Additional structured data | Only base schema |

### 2.3 Content Collections Factory

```typescript
// src/lib/adventures/heroFactory.ts

import type { CollectionEntry } from 'astro:content';
import type { Props as AdventureHeroProps } from '../components/adventures/AdventureHero.astro';

export function createHeroProps(
  entry: CollectionEntry<'adventures'>,
  overrides?: Partial<AdventureHeroProps>
): AdventureHeroProps {
  const { data, id } = entry;

  return {
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    season: data.season,
    image: data.images?.[0]?.src ?? '/images/default-hero.jpg',
    imageAlt: data.images?.[0]?.alt ?? data.title,
    driveTime: data.drive_time,
    location: data.location,
    coordinates: data.coordinates,
    slug: id,
    schemaType: 'Place',
    loading: 'eager',
    ...overrides,
  };
}
```

---

## 3. Performance Architecture

### 3.1 Byte Budgets

| Asset | Budget | Target | Strategy |
|-------|--------|--------|----------|
| Hero HTML | 2KB | 1.8KB | Minimal DOM |
| Critical CSS (inline) | 4KB | 3.3KB | Scoped styles |
| Camo SVG (data URI) | 1KB | 0.52KB | SVGO optimized |
| Hero Image (AVIF 1200w) | 80KB | 45KB | Astro Image |
| Hero Image (WebP 800w) | 40KB | 28KB | Mobile fallback |
| Schema.org JSON-LD | 1KB | 0.6KB | Minified |
| **Total First Paint** | **128KB** | **~79KB** | **PASS** |

### 3.2 Image Optimization

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={image}
  alt={imageAlt}
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
  loading={loading}
  decoding="async"
  fetchpriority={loading === 'eager' ? 'high' : 'auto'}
  class="w-full h-full object-cover"
/>
```

**Format Negotiation** (automatic):
1. AVIF (50% smaller than WebP)
2. WebP (30% smaller than JPEG)
3. JPEG (fallback)

### 3.3 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s (4G) | `fetchpriority="high"`, eager loading |
| CLS | < 0.1 | Aspect ratio containers, font-size-adjust |
| FID | < 100ms | Zero JavaScript |

### 3.4 Zero JavaScript Strategy

| Feature | Implementation | JS Required? |
|---------|----------------|--------------|
| Layout | CSS Grid/Flexbox | No |
| Responsive images | `<picture>` via Astro | No |
| Badges | Static HTML | No |
| Camo overlay | CSS background | No |
| Reduced motion | CSS `@media` query | No |
| Schema.org | Server-rendered JSON-LD | No |
| Animations | CSS keyframes | No |

---

## 4. SEO & Schema.org Architecture

### 4.1 @graph Approach

Combine multiple schemas in single script block:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "TouristAttraction", "@id": "#adventure" },
    { "@type": "Article", "@id": "#guide" },
    { "@type": "BreadcrumbList", "@id": "#breadcrumb" },
    { "@type": "SportingGoodsStore", "@id": "#wvwo-shop" }
  ]
}
```

### 4.2 Adventure Type Mapping

| Adventure Type | Primary Schema | Secondary |
|----------------|----------------|-----------|
| Lake | TouristAttraction | LakeBodyOfWater |
| WMA | NaturalFeature | Park |
| River | TouristAttraction | RiverBodyOfWater |
| Trail | TouristAttraction | - |
| State Park | Park | TouristAttraction |

### 4.3 GeoCoordinates Precision

| Location Type | Decimal Places | Example |
|---------------|----------------|---------|
| Point (trailhead) | 5 | 38.66200, -80.69320 |
| Area (lake, WMA) | 4 | 38.6620, -80.6932 |
| WVWO Shop | 5 | 38.49910, -80.75460 |

### 4.4 Local Business Integration

Every adventure links to WVWO shop via `isRelatedTo`:

```json
{
  "@type": "TouristAttraction",
  "name": "Sutton Lake",
  "isRelatedTo": {
    "@type": "SportingGoodsStore",
    "@id": "https://wvwildoutdoors.pages.dev/#wvwo-shop",
    "name": "WV Wild Outdoors",
    "telephone": "(304) 649-5765"
  }
}
```

---

## 5. Accessibility Architecture

### 5.1 WCAG 2.2 AA Compliance

**Target**: Zero axe-core violations, European Accessibility Act ready (June 2025)

### 5.2 Semantic Structure

```html
<section
  id="adventure-hero-{slug}"
  class="adventure-hero"
  aria-labelledby="adventure-hero-{slug}-title"
  aria-describedby="adventure-hero-{slug}-desc"
>
  <!-- Decorative overlay: hidden from screen readers -->
  <div aria-hidden="true" role="presentation" class="camo-overlay"></div>

  <!-- Badge group with label -->
  <div role="group" aria-label="Adventure details">
    <span class="badge">
      <span class="sr-only">Difficulty: </span>Moderate
    </span>
  </div>

  <!-- Title with ID for aria-labelledby -->
  <h1 id="adventure-hero-{slug}-title">{title}</h1>

  <!-- Description with ID for aria-describedby -->
  <p id="adventure-hero-{slug}-desc">{description}</p>
</section>
```

### 5.3 Color Blind Support

Shape icons differentiate difficulty levels without relying on color:

| Difficulty | Color | Shape | SVG |
|------------|-------|-------|-----|
| Easy | sign-green | Circle | `<circle cx="6" cy="6" r="5"/>` |
| Moderate | brand-orange | Triangle | `<polygon points="6,1 11,11 1,11"/>` |
| Advanced | brand-mud | Square | `<rect x="1" y="1" width="10" height="10"/>` |
| Rugged | brand-brown | Diamond | `<polygon points="6,0 12,6 6,12 0,6"/>` |

### 5.4 Focus Indicators

```css
.cta-button:focus-visible {
  outline: none;
  ring: 2px solid var(--color-brand-orange);
  ring-offset: 2px;
  ring-offset-color: var(--color-brand-brown);
}
```

### 5.5 Screen Reader Experience

**Badge Announcement Pattern**:
```
"Adventure details, group.
 From our shop: 20 minutes.
 Difficulty: Moderate.
 Best season: Year-round."
```

---

## 6. Animation Architecture

### 6.1 "Morning Mist Lift" Motion System

Inspired by West Virginia morning fog lifting from hollows:

```css
@keyframes hero-mist-lift {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-reveal {
  animation: hero-mist-lift 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
```

### 6.2 Staggered Reveal Timing

| Element | Delay | Duration |
|---------|-------|----------|
| Badges | 0ms | 0.7s |
| Title | 100ms | 0.7s |
| Description | 180ms | 0.7s |
| CTAs | 260ms | 0.7s |
| Image | 0ms | 0.9s |

### 6.3 Reduced Motion Handling

**Complete disable**, not just reduced:

```css
@media (prefers-reduced-motion: reduce) {
  .adventure-hero * {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### 6.4 Hover Micro-interactions

```css
/* Badge hover - subtle lift */
.badge {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.badge:hover {
  transform: translateY(-2px) rotate(0deg);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* Image hover - subtle zoom */
.adventure-hero__image img {
  transition: transform 0.4s ease-out;
}

.adventure-hero__image:hover img {
  transform: scale(1.02);
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .badge:hover,
  .adventure-hero__image:hover img {
    transform: none;
  }
}
```

---

## 7. Implementation Blueprint

### 7.1 File Structure

```
wv-wild-web/src/
├── components/
│   └── adventures/
│       ├── AdventureHero.astro      # Main component
│       ├── AdventureSchema.astro    # Schema.org generator
│       ├── AdventureBadge.astro     # Badge with shape icons
│       └── types.ts                 # Shared TypeScript interfaces
├── lib/
│   └── adventures/
│       └── heroFactory.ts           # Content Collections helpers
├── styles/
│   └── adventures/
│       └── hero.css                 # Component-specific styles
└── tests/
    └── components/
        └── AdventureHero.test.ts    # Unit + a11y tests
```

### 7.2 Complete Component Template

```astro
---
// AdventureHero.astro - Unified Implementation

import { Image } from 'astro:assets';
import AdventureSchema from './AdventureSchema.astro';
import AdventureBadge from './AdventureBadge.astro';
import type { Props } from './types';

const {
  title,
  description,
  difficulty,
  season,
  image,
  imageAlt,
  imagePosition = 'center',
  loading = 'eager',
  driveTime,
  location,
  coordinates,
  publishedDate,
  updatedDate,
  schemaType = 'Place',
  slug,
  heroHeight = 'standard',
} = Astro.props;

// Generate unique IDs
const heroId = `adventure-hero-${slug ?? 'default'}`;
const titleId = `${heroId}-title`;
const descId = `${heroId}-desc`;

// Normalize seasons to array
const seasons = Array.isArray(season) ? season : [season];

// Check for slots
const hasCtaSlot = Astro.slots.has('cta');
const hasBadgeExtra = Astro.slots.has('badge-extra');
const hasAside = Astro.slots.has('aside');

// Height classes
const heightClasses = {
  compact: 'min-h-[300px] py-12',
  standard: 'min-h-[400px] md:min-h-[50vh] py-16 md:py-24',
  tall: 'min-h-[500px] md:min-h-[70vh] py-20 md:py-32',
};

// Image position mapping
const positionClasses = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
};
---

<section
  id={heroId}
  class:list={[
    'adventure-hero relative overflow-hidden bg-brand-brown text-white',
    heightClasses[heroHeight],
  ]}
  aria-labelledby={titleId}
  aria-describedby={descId}
>
  <!-- Decorative: Camo overlay -->
  <div
    class="absolute inset-0 bg-camo opacity-5 pointer-events-none mix-blend-overlay"
    aria-hidden="true"
    role="presentation"
  />

  <!-- Decorative: Gradient overlay for text readability -->
  <div
    class="absolute inset-0 bg-gradient-to-r from-brand-brown via-brand-brown/60 to-transparent pointer-events-none lg:via-brand-brown/40"
    aria-hidden="true"
  />

  <div class="container relative mx-auto px-4">
    <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

      <!-- Content Column (7/12 on desktop) -->
      <div class="lg:col-span-7 order-2 lg:order-1 space-y-6">

        <!-- Badge Row -->
        <div
          class="flex flex-wrap items-center gap-3 hero-reveal"
          role="group"
          aria-label="Adventure details"
          style="--delay: 0ms"
        >
          {driveTime && (
            <AdventureBadge variant="drive-time">
              <span class="sr-only">From our shop: </span>
              {driveTime}
            </AdventureBadge>
          )}

          <AdventureBadge variant={difficulty}>
            <span class="sr-only">Difficulty: </span>
            {difficulty}
          </AdventureBadge>

          <AdventureBadge variant="season">
            <span class="sr-only">Best season: </span>
            {seasons.join(', ')}
          </AdventureBadge>

          {hasBadgeExtra && <slot name="badge-extra" />}
        </div>

        <!-- Title -->
        <h1
          id={titleId}
          class="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-tight hero-reveal"
          style="--delay: 100ms"
        >
          {title}
        </h1>

        <!-- Description -->
        <p
          id={descId}
          class="text-lg md:text-xl lg:text-2xl text-brand-cream/80 leading-relaxed hero-reveal"
          style="--delay: 180ms"
        >
          {description}
        </p>

        <!-- CTA Area -->
        <div class="flex flex-wrap gap-4 hero-reveal" style="--delay: 260ms">
          {hasCtaSlot ? (
            <slot name="cta" />
          ) : (
            <a
              href="tel:+13046495765"
              class="inline-flex items-center gap-2 bg-sign-green text-white font-display font-bold px-6 py-3 rounded-sm hover:bg-sign-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-brown motion-safe:transition-colors"
            >
              Call the Shop
            </a>
          )}
        </div>
      </div>

      <!-- Image Column (5/12 on desktop) -->
      <div class="lg:col-span-5 order-1 lg:order-2 hero-reveal-image">
        <div class="relative aspect-[4/3] md:aspect-[3/2] rounded-sm overflow-hidden shadow-hard">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              widths={[400, 800, 1200]}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              loading={loading}
              decoding="async"
              fetchpriority={loading === 'eager' ? 'high' : 'auto'}
              class:list={[
                'w-full h-full object-cover',
                positionClasses[imagePosition],
              ]}
            />
          ) : (
            <div
              class="w-full h-full bg-brand-mud/20 flex items-center justify-center"
              role="img"
              aria-label="Image unavailable"
            >
              <span class="text-brand-cream/60 font-body">Image unavailable</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  <!-- Aside Panel (desktop only) -->
  {hasAside && (
    <aside class="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-64">
      <slot name="aside" />
    </aside>
  )}
</section>

<!-- Default slot: content below hero -->
<slot />

<!-- Schema.org structured data -->
<AdventureSchema
  type={schemaType === 'Place' ? 'lake' : schemaType.toLowerCase()}
  name={title}
  description={description}
  latitude={coordinates?.lat}
  longitude={coordinates?.lng}
  difficulty={difficulty}
  season={seasons[0]}
  driveTime={driveTime}
  heroImage={image?.src}
  heroImageAlt={imageAlt}
  datePublished={publishedDate}
  dateModified={updatedDate}
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Adventures', url: '/adventures/' },
    { name: title, url: `/adventures/${slug}/` },
  ]}
/>

<!-- Additional schema from page -->
<slot name="schema-extra" />

<style>
  /* Camo pattern - inline data URI */
  .bg-camo {
    background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='b'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='2'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M20,20 Q50,5 80,40 T120,60 T160,30' fill='%232E7D32' opacity='.4' filter='url(%23b)'/%3E%3Cpath d='M10,100 Q40,80 70,120 T110,150 T180,110' fill='%233E2723' opacity='.4' filter='url(%23b)'/%3E%3Cpath d='M120,10 Q150,50 180,20' fill='%235D4037' opacity='.4' filter='url(%23b)'/%3E%3Cpath d='M50,160 Q90,140 130,180 T190,150' fill='%232E7D32' opacity='.3' filter='url(%23b)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    background-repeat: repeat;
  }

  /* Hard shadow for image frame */
  .shadow-hard {
    box-shadow:
      8px 8px 0 0 rgba(62, 39, 35, 0.8),
      0 0 0 3px #5D4037;
  }

  /* Morning Mist Lift animation */
  @keyframes hero-mist-lift {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-reveal {
    animation: hero-mist-lift 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation-delay: var(--delay, 0ms);
  }

  .hero-reveal-image {
    animation: hero-mist-lift 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .hero-reveal,
    .hero-reveal-image {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  /* Image hover effect */
  .adventure-hero .shadow-hard img {
    transition: transform 0.4s ease-out;
  }

  .adventure-hero .shadow-hard:hover img {
    transform: scale(1.02);
  }

  @media (prefers-reduced-motion: reduce) {
    .adventure-hero .shadow-hard:hover img {
      transform: none;
    }
  }
</style>
```

---

## 8. Testing Strategy

### 8.1 Unit Tests (Vitest)

```typescript
describe('AdventureHero', () => {
  it('renders with required props');
  it('applies correct difficulty badge color');
  it('generates aria-labelledby with h1 id');
  it('handles missing image gracefully');
  it('generates Schema.org markup when schemaType provided');
  it('includes GeoCoordinates when coordinates provided');
  it('renders slot content correctly');
  it('respects prefers-reduced-motion');
});
```

### 8.2 Accessibility Tests (axe-core)

```typescript
import { axe } from 'vitest-axe';

it('passes axe accessibility audit');
it('has proper heading hierarchy');
it('decorative elements have aria-hidden');
it('badges include sr-only context labels');
it('CTA buttons have visible focus indicators');
```

### 8.3 Performance Validation

```bash
# Lighthouse CI in GitHub Actions
lighthouse --url=https://example.com/adventures/sutton-lake \
  --budget-path=.lighthouserc.json
```

**Budget assertions**:
- LCP < 2500ms
- CLS < 0.1
- Performance score >= 90

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | >= 90 | CI pipeline |
| Lighthouse Accessibility | 100 | CI pipeline |
| LCP | < 2.5s (4G) | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| axe-core violations | 0 | Vitest |
| Schema.org validation | Pass | Google Rich Results Test |
| Kim approval | "Feels like us" | Human review |

---

## 10. Related Specifications

- [SPEC-06](../../SPEC-06-content-collections/spec.md): Astro Content Collections Schema
- [SPEC-07](../../SPEC-07-adventures-hub/spec.md): Adventures Hub + Filtering
- [SPEC-08](../../SPEC-08-adventure-card/spec.md): Adventure Card Enhancements
- [WVWO Frontend Aesthetics](../../../../CLAUDE.md#wvwo-frontend-aesthetics): Design system constraints

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-26 | Initial unified architecture from 6-agent hivemind |

---

*Synthesized from Visual, Component, Performance, SEO, Accessibility, and Animation architecture agents.*
