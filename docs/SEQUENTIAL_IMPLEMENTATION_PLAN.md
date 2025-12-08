# WV Wild Outdoors Design System: Sequential Implementation Plan

**Project**: wvwo-storefront  
**Branch**: 002-directus-cms-setup  
**Date**: December 8, 2025  
**Philosophy**: Quality-first, production-ready from day one  
**Approach**: Sequential implementation based on logical dependencies and design excellence

---

## Design Philosophy

This plan follows the **"Anti-MVP Bias"** principle from the project constitution:

> "Production-ready quality from day one, no half-baked features."

Tasks are organized **sequentially** based on:
1. **Logical dependencies** (what must come first)
2. **Design system coherence** (building a complete visual language)
3. **User experience impact** (what creates the most authentic experience)

**Not** based on:
- ❌ What's easiest or fastest
- ❌ Quick wins or MVP thinking
- ❌ Arbitrary effort estimates

---

## Sequential Implementation Structure

### Foundation → Visual Language → Storytelling → Refinement

```
PHASE 1: Design System Foundation
└─ Establish core tokens and patterns

PHASE 2: Visual Identity & Texture
└─ Create authentic outdoor aesthetic

PHASE 3: Storytelling & Content Flow
└─ Build narrative experience

PHASE 4: Trust & Credibility
└─ Establish authority and legitimacy

PHASE 5: Component Consistency
└─ Ensure system-wide excellence
```

---

## PHASE 1: Design System Foundation

**Goal**: Establish the complete design token system and typography hierarchy  
**Why First**: Everything else depends on these foundational elements  
**Duration**: 2-3 hours

### 1.1 Define Complete Color Token System

**Includes**:
- Define `brand-orange` (#FF6F00 - blaze orange)
- Document all color tokens with usage guidelines
- Create color contrast validation matrix
- Define hover/active state shades for all tokens

**Implementation**:

```javascript
// tailwind.config.cjs
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-brown': {
          DEFAULT: '#8E7231',
          50: '#F5F2ED',
          100: '#E8E0D1',
          500: '#8E7231',
          600: '#6F5A27',
          700: '#5A491F',
        },
        'sign-green': {
          DEFAULT: '#2E7D32',
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#2E7D32',
          600: '#1B5E20',
          700: '#145214',
        },
        'brand-cream': {
          DEFAULT: '#FFF8E1',
          50: '#FFFEF7',
          100: '#FFF8E1',
        },
        'brand-mud': {
          DEFAULT: '#5D4037',
          50: '#EFEBE9',
          100: '#D7CCC8',
          500: '#5D4037',
          600: '#4E342E',
          700: '#3E2723',
        },
        'brand-orange': {
          DEFAULT: '#FF6F00',
          50: '#FFF3E0',
          100: '#FFE0B2',
          500: '#FF6F00',
          600: '#E65100',
          700: '#BF360C',
        },
      },
    },
  },
}
```

```css
/* src/styles/global.css */
:root {
  /* Primary Brand Colors */
  --color-brand-brown: #8E7231;
  --color-sign-green: #2E7D32;
  --color-brand-cream: #FFF8E1;
  --color-brand-mud: #5D4037;
  --color-brand-orange: #FF6F00;
  
  /* Semantic Color Usage */
  --color-cta-primary: var(--color-sign-green);
  --color-cta-secondary: var(--color-brand-orange);
  --color-text-primary: #3E2723;
  --color-text-secondary: #5D4037;
  --color-background-primary: var(--color-brand-cream);
}
```

**Color Usage Guidelines**:

| Token | Usage | Accessibility |
|-------|-------|---------------|
| `brand-brown` | Headings, borders, accents | 4.5:1 on cream |
| `sign-green` | Primary CTAs, success states | 4.5:1 on white |
| `brand-cream` | Backgrounds, cards | Base color |
| `brand-mud` | Secondary text, flood narrative | 7:1 on cream |
| `brand-orange` | High-priority CTAs, safety elements | 3:1 on white |

**Why This Matters**:
Blaze orange is not just a color—it's a **cultural signifier** in hunting. By formalizing it with proper shades and usage guidelines, we create a complete visual language that speaks authentically to the outdoor community.

---

### 1.2 Establish Complete Typography System

**Includes**:
- Swap Inter → Archivo for body text
- Define complete type scale (h1 → h6, body, small)
- Create typography usage guidelines
- Set up font loading optimization

**Implementation**:

```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&family=Caveat:wght@400;700&family=Archivo:wght@400;500;600;700&display=swap');

@theme {
  --font-display: 'Roboto Slab', serif;
  --font-hand: 'Caveat', cursive;
  --font-body: 'Archivo', sans-serif;
}

/* Type Scale */
.text-display-xl { 
  font-family: var(--font-display); 
  font-size: 4.5rem; 
  line-height: 1.1; 
  font-weight: 900; 
}

.text-display-lg { 
  font-family: var(--font-display); 
  font-size: 3rem; 
  line-height: 1.2; 
  font-weight: 700; 
}

.text-heading-1 { 
  font-family: var(--font-display); 
  font-size: 2.25rem; 
  line-height: 1.3; 
  font-weight: 700; 
}

.text-heading-2 { 
  font-family: var(--font-display); 
  font-size: 1.875rem; 
  line-height: 1.3; 
  font-weight: 700; 
}

.text-heading-3 { 
  font-family: var(--font-display); 
  font-size: 1.5rem; 
  line-height: 1.4; 
  font-weight: 600; 
}

.text-body-lg { 
  font-family: var(--font-body); 
  font-size: 1.125rem; 
  line-height: 1.7; 
  font-weight: 400; 
}

.text-body { 
  font-family: var(--font-body); 
  font-size: 1rem; 
  line-height: 1.6; 
  font-weight: 400; 
}

.text-handwritten { 
  font-family: var(--font-hand); 
  font-size: 1.25rem; 
  line-height: 1.5; 
  font-weight: 400; 
}
```

**Typography Usage Guidelines**:

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| Hero Heading | Roboto Slab | 4.5rem | 900 | Homepage only |
| Page Title (h1) | Roboto Slab | 2.25rem | 700 | All pages |
| Section Heading (h2) | Roboto Slab | 1.875rem | 700 | Major sections |
| Subsection (h3) | Roboto Slab | 1.5rem | 600 | Minor sections |
| Body Text | Archivo | 1rem | 400 | All content |
| Large Body | Archivo | 1.125rem | 400 | Story pages |
| Handwritten Accent | Caveat | 1.25rem | 400 | "Since 2008", quotes |

**Why Archivo**:
Archivo has a **technical, utilitarian character** that evokes field guides, topographic maps, and government forms (like hunting licenses). It's more rugged than Inter while maintaining excellent readability.

---

## PHASE 2: Visual Identity & Texture

**Goal**: Create the authentic outdoor aesthetic through texture and pattern  
**Why Second**: Visual texture depends on color tokens and typography being defined  
**Duration**: 4-6 hours

### 2.1 Add Subtle Noise Texture to Body Background

**Implementation**:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgLTIgMCIvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz4KPC9zdmc+\")",
      },
    },
  },
}
```

```astro
<!-- src/layouts/Layout.astro -->
<body class="bg-brand-cream bg-noise bg-repeat">
  <slot />
</body>
```

**Why This Matters**:
Subtle texture transforms the site from "digital storefront" to "field journal." It's the difference between a website and an **experience**.

---

### 2.2 Create Camo Pattern SVG for Subtle Background Accents

**Implementation**:

```svg
<!-- public/patterns/camo-subtle.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <pattern id="camo" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
      <!-- Organic shapes using brand colors at very low opacity -->
      <path d="M50,30 Q70,50 90,40 T130,50 Q150,60 140,80 T120,100 Q100,110 80,100 T50,80 Q40,60 50,40 Z" 
            fill="#8E7231" opacity="0.03"/>
      <path d="M200,80 Q220,100 240,90 T280,100 Q300,110 290,130 T270,150 Q250,160 230,150 T200,130 Q190,110 200,90 Z" 
            fill="#5D4037" opacity="0.04"/>
      <path d="M320,150 Q340,170 360,160 T380,170 Q390,180 385,195 T370,210 Q355,215 340,210 T320,195 Q315,180 320,165 Z" 
            fill="#2E7D32" opacity="0.02"/>
      <!-- More organic shapes... -->
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#camo)"/>
</svg>
```

```javascript
// tailwind.config.js
backgroundImage: {
  'camo': "url('/patterns/camo-subtle.svg')",
}
```

**Usage Guidelines**:
- Hero section overlays (opacity 0.05)
- Section backgrounds (alternating with solid cream)
- Never on text-heavy content areas

**Why This Matters**:
Camo is **culturally significant** in hunting. Using it subtly (not as wallpaper) shows respect for the culture while creating visual interest.

---

### 2.3 Create Pencil Sketch Product Category Icons

**Why Now**: These extend the pencil sketch pattern established in the story page

**Categories**:
1. **Hunting** - Deer in forest clearing
2. **Fishing** - Creek with fly rod casting
3. **Firearms** - Rifle on workbench with cleaning kit
4. **Feed** - Deer at feeder at dawn

**Implementation**:

```astro
<!-- src/components/CategoryCard.astro -->
---
interface Props {
  category: 'hunting' | 'fishing' | 'firearms' | 'feed';
  title: string;
  description: string;
}

const { category, title, description } = Astro.props;
---

<article class="group relative bg-brand-cream rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
  <div class="relative h-64 overflow-hidden">
    <img
      src={`/sketches/category-${category}.jpg`}
      alt={`${title} - Hand-drawn illustration`}
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-brand-mud/30 to-transparent"></div>
  </div>
  
  <div class="p-6">
    <h3 class="text-brand-brown font-display text-2xl font-bold mb-2">
      {title}
    </h3>
    <p class="text-stone-700 font-body leading-relaxed">
      {description}
    </p>
    <a 
      href={`/inventory/${category}`}
      class="inline-block mt-4 text-sign-green font-body font-semibold hover:text-sign-green-600 transition-colors"
    >
      View Inventory →
    </a>
  </div>
</article>
```

**Why This Matters**:
Product categories aren't just navigation—they're **invitations into a world**. Pencil sketches make each category feel like a chapter in a field guide.

---

### 2.4 Develop Reusable Sketch Gallery Component

**Why Now**: With multiple sketches created, we need a consistent display pattern

**Implementation**:

```astro
<!-- src/components/SketchGallery.astro -->
---
interface SketchImage {
  src: string;
  alt: string;
  caption?: string;
  position?: 'left' | 'right' | 'full';
}

interface Props {
  images: SketchImage[];
  layout?: 'narrative' | 'grid' | 'masonry';
}

const { images, layout = 'narrative' } = Astro.props;
---

{layout === 'narrative' && (
  <div class="space-y-12">
    {images.map((img, index) => (
      <figure class:list={[
        "relative",
        img.position === 'full' && "my-12 -mx-4 md:-mx-12",
        img.position === 'left' && "md:float-left md:mr-8 md:mb-4 md:w-1/2",
        img.position === 'right' && "md:float-right md:ml-8 md:mb-4 md:w-1/2",
      ]}>
        <div class="relative group">
          <img
            src={img.src}
            alt={img.alt}
            class:list={[
              "w-full rounded-sm shadow-md transition-shadow duration-300 group-hover:shadow-xl",
              img.position === 'full' && "shadow-lg",
            ]}
            loading="lazy"
          />
          <!-- Paper texture overlay -->
          <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-sm"></div>
        </div>
        {img.caption && (
          <figcaption class="mt-3 text-sm text-brand-mud font-hand text-center md:text-left">
            {img.caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
)}

{layout === 'grid' && (
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {images.map((img) => (
      <figure class="relative group">
        <img
          src={img.src}
          alt={img.alt}
          class="w-full h-64 object-cover rounded-sm shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          loading="lazy"
        />
        {img.caption && (
          <figcaption class="mt-3 text-sm text-brand-mud font-hand">
            {img.caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
)}

{layout === 'masonry' && (
  <div class="columns-1 md:columns-2 lg:columns-3 gap-8">
    {images.map((img) => (
      <figure class="break-inside-avoid mb-8">
        <img
          src={img.src}
          alt={img.alt}
          class="w-full rounded-sm shadow-md"
          loading="lazy"
        />
        {img.caption && (
          <figcaption class="mt-3 text-sm text-brand-mud font-hand">
            {img.caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
)}
```

**Why This Matters**:
A reusable component ensures **consistency** across all storytelling pages while allowing flexibility for different narrative structures.

---

## PHASE 3: Storytelling & Content Flow

**Goal**: Transform the story page into a flowing narrative experience  
**Why Third**: Depends on complete visual language (texture, sketches, typography)  
**Duration**: 3-4 hours

### 3.1 Implement Flowing Narrative Layout for Story Page

**Why Now**: With all visual elements in place, we can create the complete narrative experience

**Implementation**:

```astro
<!-- src/pages/story.astro -->
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import SketchGallery from '../components/SketchGallery.astro';

const storyImages = [
  {
    src: '/story-bridge-beginning.jpg',
    alt: 'A small car driving across a high bridge over a forested gorge, heading toward the hills.',
    position: 'left',
    caption: 'The journey to Birch River'
  },
  {
    src: '/story-old-shop-flood.jpg',
    alt: 'Old sporting goods storefront with mud, puddles, and flood marks along the porch and walls.',
    position: 'right',
    caption: 'June 2016: The flood that changed everything'
  },
  {
    src: '/story-new-shop-family.jpg',
    alt: 'The new WV Wild Outdoors shop with a welcoming porch and family silhouettes standing in front.',
    position: 'full',
    caption: 'A new beginning on the corner lot'
  },
];
---

<Layout 
  title="Our Story | WV Wild Outdoors" 
  description="From a small shop on the back roads to a new corner lot. The story of WV Wild Outdoors through flood, resilience, and community."
>
  <Header />

  <main class="relative">
    <!-- Hero Section with Camo Overlay -->
    <section class="relative bg-brand-mud py-20 md:py-32">
      <div class="absolute inset-0 bg-camo opacity-5"></div>
      <div class="relative max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-display-xl text-brand-cream mb-6">
          Our Story
        </h1>
        <p class="text-body-lg text-brand-cream/90 max-w-2xl mx-auto">
          From a small shop on the back roads to a new corner lot. 
          The story of WV Wild Outdoors through flood, resilience, and community.
        </p>
      </div>
    </section>

    <!-- Narrative Content -->
    <article class="max-w-5xl mx-auto px-4 py-16 md:py-24">
      
      <!-- Section 1: Beginning -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
        <figure class="relative group">
          <img
            src="/story-bridge-beginning.jpg"
            alt="A small car driving across a high bridge over a forested gorge, heading toward the hills."
            class="w-full rounded-sm shadow-md transition-shadow duration-300 group-hover:shadow-xl"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-sm"></div>
          <figcaption class="mt-3 text-sm text-brand-mud font-hand">
            The journey to Birch River
          </figcaption>
        </figure>
        
        <div class="flex flex-col justify-center">
          <h2 class="text-heading-1 text-brand-brown mb-6">
            From a small shop on the back roads to a new corner lot
          </h2>
          <div class="space-y-4 text-body-lg text-stone-700 leading-relaxed">
            <p>
              WV Wild Outdoors is a small, family-run hunting and outdoor shop
              serving Birch River, Little Birch, and the back roads in between.
              Over the years, the shop has become a practical waypoint where locals
              pick up firearms, ammo, hunting gear, and the everyday odds and ends
              that keep farms, camps, and seasons running.
            </p>
            <p>
              This isn't a story about expansion or growth for growth's sake. 
              It's about staying put, staying useful, and staying connected to 
              the people who depend on having a local shop that understands 
              their needs.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 2: The Flood -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
        <div class="flex flex-col justify-center order-2 md:order-1">
          <h2 class="text-heading-1 text-brand-brown mb-6">
            Through the 2016 flood and a move down the road
          </h2>
          <div class="space-y-4 text-body-lg text-stone-700 leading-relaxed">
            <p>
              In June 2016, severe flooding hit this part of West Virginia,
              including communities in and around Birch River and Nicholas County.
              The family's original Little Birch shop building next door took on
              damage in that flood.
            </p>
            <p>
              Rather than close the doors for good, they bought the corner lot 
              just down the road and moved WV Wild Outdoors there, keeping the 
              shop close to the same neighbors, hunters, and families who had 
              always depended on it.
            </p>
            <p class="text-brand-mud font-semibold">
              The mud settled. The shop stayed.
            </p>
          </div>
        </div>

        <figure class="relative group order-1 md:order-2">
          <img
            src="/story-old-shop-flood.jpg"
            alt="Old sporting goods storefront with mud, puddles, and flood marks along the porch and walls."
            class="w-full rounded-sm shadow-md transition-shadow duration-300 group-hover:shadow-xl"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-sm"></div>
          <figcaption class="mt-3 text-sm text-brand-mud font-hand">
            June 2016: The flood that changed everything
          </figcaption>
        </figure>
      </div>

      <!-- Section 3: Full-width Dramatic Image -->
      <figure class="relative my-16 md:my-24 -mx-4 md:-mx-12">
        <img
          src="/story-new-shop-family.jpg"
          alt="The new WV Wild Outdoors shop with a welcoming porch and family silhouettes standing in front."
          class="w-full rounded-sm shadow-2xl"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none rounded-sm"></div>
        <figcaption class="mt-4 text-center text-sm text-brand-mud font-hand">
          A new beginning on the corner lot
        </figcaption>
      </figure>

      <!-- Section 4: Present Day -->
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-heading-1 text-brand-brown mb-6">
          Still here for the next season
        </h2>
        <div class="space-y-4 text-body-lg text-stone-700 leading-relaxed">
          <p>
            Today, WV Wild Outdoors continues in that newer corner-lot location
            as a straightforward, local shop run by people who know the area they
            serve. Whether it's getting sighted in for buck season, stocking up on
            feed, or grabbing gear before a fishing trip, the goal is the same:
            make it easy for locals to get what they need without leaving the
            hills and hollows they call home.
          </p>
          <p class="text-brand-brown font-display font-bold text-xl mt-8">
            From the back roads to the corner lot. Still here.
          </p>
        </div>
      </div>

    </article>
  </main>

  <Footer />
</Layout>
```

**Why This Matters**:
This isn't just a layout change—it's a **narrative transformation**. The story flows like a Field & Stream article, not a blog post. Images and text are interwoven, creating emotional resonance.

---

### 3.2 Develop Flood Story Visual Motif

**Why Now**: The story page establishes the flood narrative; now we create a reusable motif

**Implementation**:

```astro
<!-- src/components/FloodTimeline.astro -->
---
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'challenge' | 'triumph';
}

const events: TimelineEvent[] = [
  {
    year: '2008',
    title: 'Shop Opens',
    description: 'WV Wild Outdoors opens in Little Birch, serving local hunters and outdoor enthusiasts.',
    type: 'milestone'
  },
  {
    year: '2016',
    title: 'The Flood',
    description: 'June flooding damages the original building. Rather than close, the family moves forward.',
    type: 'challenge'
  },
  {
    year: '2016',
    title: 'New Location',
    description: 'Reopens at the corner lot just down the road, staying close to the community.',
    type: 'triumph'
  },
  {
    year: 'Today',
    title: 'Still Here',
    description: 'Continuing to serve Birch River and Nicholas County with the same commitment.',
    type: 'milestone'
  },
];

const typeColors = {
  milestone: 'brand-brown',
  challenge: 'brand-mud',
  triumph: 'sign-green',
};
---

<div class="relative py-12">
  <!-- Vertical Timeline Line -->
  <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-mud/30 transform md:-translate-x-1/2"></div>

  {events.map((event, index) => (
    <div class:list={[
      "relative mb-12 last:mb-0",
      index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto md:text-left"
    ]}>
      <!-- Timeline Dot -->
      <div class:list={[
        "absolute left-8 md:left-1/2 w-6 h-6 rounded-full border-4 border-brand-cream transform -translate-x-1/2",
        `bg-${typeColors[event.type]}`
      ]}></div>

      <!-- Content Card -->
      <div class="ml-16 md:ml-0 md:w-5/12 bg-brand-cream rounded-lg p-6 shadow-md">
        <div class="flex items-baseline gap-3 mb-2">
          <span class="text-brand-brown font-display font-bold text-2xl">
            {event.year}
          </span>
          <h3 class="text-brand-brown font-display font-bold text-xl">
            {event.title}
          </h3>
        </div>
        <p class="text-stone-700 font-body leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

**Usage**:
- About page
- Story page (alternative layout)
- Footer "Our Journey" section

**Why This Matters**:
The flood isn't just a historical fact—it's a **defining moment** that proves resilience. The timeline makes this tangible and visual.

---

## PHASE 4: Trust & Credibility

**Goal**: Establish authority and legitimacy through official badges and markers  
**Why Fourth**: Trust signals are most effective when the visual identity is complete  
**Duration**: 2-3 hours

### 4.1 Add FFL/WVDNR Trust Badges

**Implementation**:

```astro
<!-- src/components/TrustBadges.astro -->
---
interface Props {
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

const { size = 'md', layout = 'horizontal', showLabels = true } = Astro.props;

const sizes = {
  sm: 'h-10 w-auto',
  md: 'h-14 w-auto',
  lg: 'h-20 w-auto',
};
---

<div class:list={[
  "flex items-center",
  layout === 'horizontal' ? "flex-row space-x-6" : "flex-col space-y-4"
]}>
  <!-- FFL Badge -->
  <div class="flex items-center space-x-3">
    <a 
      href="/verification/ffl" 
      aria-label="Federal Firearms License Verification"
      class="group relative"
    >
      <img
        src="/assets/badges/ffl-badge.svg"
        alt="Authorized Federal Firearms License Holder"
        class:list={[sizes[size], "object-contain transition-transform duration-200 group-hover:scale-110"]}
        loading="lazy"
        width="56"
        height="56"
      />
      <div class="absolute inset-0 rounded-full border-2 border-brand-orange opacity-0 group-focus:opacity-100 transition-opacity"></div>
    </a>
    {showLabels && (
      <div class="flex flex-col">
        <span class="text-brand-brown font-display font-bold text-sm">
          Licensed FFL Dealer
        </span>
        <span class="text-stone-600 font-body text-xs">
          Federal Firearms License
        </span>
      </div>
    )}
  </div>

  <!-- WVDNR Badge -->
  <div class="flex items-center space-x-3">
    <a 
      href="/verification/wvdnr" 
      aria-label="WV DNR License Agent Verification"
      class="group relative"
    >
      <img
        src="/assets/badges/wvdnr-badge.svg"
        alt="Authorized WV DNR License Agent"
        class:list={[sizes[size], "object-contain transition-transform duration-200 group-hover:scale-110"]}
        loading="lazy"
        width="56"
        height="56"
      />
      <div class="absolute inset-0 rounded-full border-2 border-sign-green opacity-0 group-focus:opacity-100 transition-opacity"></div>
    </a>
    {showLabels && (
      <div class="flex flex-col">
        <span class="text-brand-brown font-display font-bold text-sm">
          WVDNR License Agent
        </span>
        <span class="text-stone-600 font-body text-xs">
          Hunting & Fishing Licenses
        </span>
      </div>
    )}
  </div>
</div>
```

**Placement**:
- Header (small, no labels)
- Hero section (medium, with labels)
- Footer (small, with labels)

**Why This Matters**:
In the firearms and outdoor community, **legitimacy is everything**. These badges aren't decoration—they're **proof of authority**.

---

### 4.2 Add "Since 2008" Resilience Marker

**Implementation**:

```astro
<!-- src/components/Header.astro -->
<header class="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-brown/10">
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-4">
        <img 
          src="/logo.svg" 
          alt="WV Wild Outdoors" 
          class="h-12 w-auto"
        />
        <div class="hidden md:flex flex-col">
          <span class="text-brand-brown font-display font-bold text-xl">
            WV Wild Outdoors
          </span>
          <span class="text-brand-mud font-hand text-sm -mt-1">
            Since 2008
          </span>
        </div>
      </a>

      <!-- Navigation -->
      <nav class="flex items-center space-x-6">
        <!-- ... nav items ... -->
      </nav>

      <!-- Trust Badges (Desktop) -->
      <div class="hidden lg:block">
        <TrustBadges size="sm" showLabels={false} />
      </div>
    </div>
  </div>
</header>
```

**Alternative Placement (Hero)**:

```astro
<div class="absolute top-8 right-8 flex items-center space-x-2 text-brand-cream">
  <span class="font-hand text-lg">Est.</span>
  <span class="font-display font-bold text-2xl">2008</span>
</div>
```

**Why This Matters**:
"Since 2008" isn't just a date—it's a **survival story**. It says: "We were here before the flood, and we're still here after."

---

## PHASE 5: Component Consistency & Excellence

**Goal**: Ensure system-wide consistency and accessibility  
**Why Last**: With all patterns established, we audit for consistency  
**Duration**: 6-8 hours

### 5.1 Audit All Components for Design System Consistency

**Components to Audit** (9 total):
1. Header.astro
2. Footer.astro
3. CategoryGrid.astro
4. InventoryGrid.astro
5. ContactStrip.astro
6. Services.astro
7. StorySection.astro
8. Ticker.astro
9. Visit.astro

**Audit Methodology**:

For each component, create a detailed audit report using this template:

```markdown
# Component Audit: [ComponentName].astro

## Color Token Usage
- [ ] All colors use defined tokens (no hardcoded hex)
- [ ] Hover states use defined shades
- [ ] Focus states use appropriate colors
- [ ] Contrast ratios meet WCAG 2.1 AA (4.5:1 minimum)

**Findings**:
- ✅ All background colors use `bg-brand-cream`
- ⚠️ Line 47 uses hardcoded `#8E7231` instead of `text-brand-brown`
- ❌ Button hover state missing (should be `hover:bg-sign-green-600`)

**Action Items**:
1. Replace hardcoded color on line 47
2. Add hover state to CTA button

---

## Typography
- [ ] Headings use `font-display` (Roboto Slab)
- [ ] Body text uses `font-body` (Archivo)
- [ ] Handwritten accents use `font-hand` (Caveat)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Font weights are consistent with type scale

**Findings**:
- ✅ All headings use `font-display`
- ✅ Body text uses `font-body`
- ⚠️ Subheading uses h3 but should be h2 (no h2 present)

**Action Items**:
1. Change subheading from h3 to h2

---

## Spacing & Layout
- [ ] Uses Tailwind spacing scale (no arbitrary values)
- [ ] Responsive breakpoints follow system (sm:, md:, lg:)
- [ ] Padding/margin patterns consistent with other components
- [ ] Grid/flex layouts use standard patterns

**Findings**:
- ✅ All spacing uses Tailwind scale
- ✅ Responsive breakpoints consistent
- ✅ Layout patterns match design system

**Action Items**:
None

---

## Accessibility
- [ ] All interactive elements have proper ARIA labels
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible (3:1 contrast)
- [ ] Screen reader tested
- [ ] Images have descriptive alt text
- [ ] Color is not sole means of conveying information

**Findings**:
- ✅ ARIA labels present
- ✅ Keyboard navigation works
- ❌ Focus indicator not visible on mobile menu button
- ⚠️ Alt text on logo image is generic ("logo")

**Action Items**:
1. Add focus:ring-2 focus:ring-brand-orange to mobile menu button
2. Update logo alt text to "WV Wild Outdoors - Hunting and Outdoor Supplies"

---

## Performance
- [ ] Images use `loading="lazy"`
- [ ] Images have explicit width/height
- [ ] No unnecessary re-renders
- [ ] Assets optimized (WebP, SVG)
- [ ] No layout shift (CLS)

**Findings**:
- ✅ All images lazy loaded
- ⚠️ Hero image missing width/height (causes CLS)
- ✅ Assets optimized

**Action Items**:
1. Add width="1920" height="1080" to hero image

---

## Component-Specific Checks
[Any additional checks specific to this component]

---

## Summary

**Status**: ⚠️ Needs Revision

**Critical Issues**: 1
- Missing focus indicator on mobile menu button

**High Priority Issues**: 2
- Hardcoded color value
- Missing button hover state

**Medium Priority Issues**: 2
- Incorrect heading hierarchy
- Generic alt text

**Low Priority Issues**: 1
- Missing image dimensions

**Estimated Fix Time**: 30 minutes
```

---

### 5.2 Create Local Landmarks Icon Set

**Why Now**: With all components audited, we can add final polish with custom iconography

**Icons to Create**:
1. **Birch River** - Flowing creek with birch trees
2. **Sutton Lake** - Lake with mountain silhouette
3. **Nicholas County Hills** - Rolling hills
4. **Covered Bridge** - Historic local landmark
5. **Deer Crossing** - Wildlife icon
6. **Fishing Spot** - Creek with rocks
7. **Hunting Ground** - Forest clearing
8. **Feed Station** - Deer feeder

**Implementation**:

```astro
<!-- src/components/LandmarkIcon.astro -->
---
interface Props {
  name: 'birch-river' | 'sutton-lake' | 'nicholas-hills' | 'covered-bridge' | 'deer-crossing' | 'fishing-spot' | 'hunting-ground' | 'feed-station';
  size?: 'sm' | 'md' | 'lg';
  color?: 'brown' | 'green' | 'mud';
}

const { name, size = 'md', color = 'brown' } = Astro.props;

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const colors = {
  brown: 'text-brand-brown',
  green: 'text-sign-green',
  mud: 'text-brand-mud',
};
---

<svg
  class:list={[sizes[size], colors[color], "inline-block"]}
  viewBox="0 0 64 64"
  fill="currentColor"
  aria-hidden="true"
>
  {name === 'birch-river' && (
    <path d="M8,48 Q16,44 24,46 T40,48 Q48,50 56,48 L56,56 L8,56 Z M12,32 L12,48 M20,28 L20,48 M28,30 L28,48 M36,26 L36,48 M44,32 L44,48 M52,28 L52,48" stroke="currentColor" stroke-width="2" fill="none"/>
  )}
  {name === 'sutton-lake' && (
    <path d="M4,40 Q10,38 16,40 T28,40 Q34,42 40,40 T52,40 Q58,38 60,40 L60,56 L4,56 Z M8,20 L16,28 L24,24 L32,30 L40,26 L48,32 L56,28 L56,40" fill="currentColor" opacity="0.3"/>
  )}
  <!-- More landmark paths... -->
</svg>
```

**Usage**:
- Visit page (directions section)
- Footer (location information)
- About page (local area section)

---

### 5.3 Commission Local Landmark Sketches

**Why Last**: This is ongoing work that extends the brand over time

**Landmarks to Commission**:
1. **Sutton Lake at dawn** - Popular fishing destination
2. **Birch River covered bridge** - Historic landmark
3. **Nicholas County hills in autumn** - Hunting season backdrop
4. **Little Birch general store** - Community context
5. **Local hunting cabin** - Authentic setting

**Integration Strategy**:

Create a dedicated "Our Area" page:

```astro
<!-- src/pages/area.astro -->
---
import Layout from '../layouts/Layout.astro';
import SketchGallery from '../components/SketchGallery.astro';

const landmarks = [
  {
    src: '/sketches/sutton-lake-dawn.jpg',
    alt: 'Sutton Lake at dawn with morning mist rising over the water',
    caption: 'Sutton Lake - Prime fishing from spring through fall'
  },
  {
    src: '/sketches/birch-river-bridge.jpg',
    alt: 'Historic covered bridge over Birch River',
    caption: 'Birch River - The heart of our community'
  },
  // ... more landmarks
];
---

<Layout title="Our Area | WV Wild Outdoors">
  <main>
    <section class="max-w-6xl mx-auto px-4 py-16">
      <h1 class="text-display-lg text-brand-brown mb-8">
        The Hills and Hollows We Call Home
      </h1>
      <p class="text-body-lg text-stone-700 max-w-3xl mb-12">
        Birch River, Little Birch, and Nicholas County. These aren't just names on a map—
        they're the woods we hunt, the creeks we fish, and the roads we know by heart.
      </p>
      
      <SketchGallery images={landmarks} layout="masonry" />
    </section>
  </main>
</Layout>
```

**Why This Matters**:
These sketches transform the site from "a store website" into **a love letter to West Virginia**. They show that WV Wild Outdoors isn't just in this place—it's **of** this place.

---

## PHASE 6: Accessibility & Performance Validation

**Goal**: Ensure WCAG 2.1 AA compliance and optimal performance  
**Why Last**: Final validation after all implementation is complete  
**Duration**: 2-3 hours

### 6.1 Comprehensive Accessibility Audit

**Testing Methodology**:

1. **Automated Testing**
   - Run axe DevTools on all pages
   - Run Lighthouse accessibility audit
   - Run WAVE accessibility checker

2. **Manual Testing**
   - **Keyboard Navigation**: Tab through entire site
   - **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
   - **Color Contrast**: Use WebAIM Contrast Checker on all text
   - **Focus Indicators**: Verify visibility on all interactive elements
   - **Zoom**: Test at 200% zoom (WCAG requirement)

3. **Checklist**

```markdown
## Accessibility Validation Checklist

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Tab order is logical
- [ ] Enter key activates buttons/links
- [ ] Escape key closes modals/menus
- [ ] Arrow keys work in carousels/galleries
- [ ] No keyboard traps

### Screen Reader
- [ ] All images have descriptive alt text
- [ ] All buttons have accessible names
- [ ] All links have descriptive text (no "click here")
- [ ] Headings create logical document outline
- [ ] ARIA labels present where needed
- [ ] Live regions announce dynamic content

### Visual
- [ ] Text contrast ≥ 4.5:1 (normal text)
- [ ] Text contrast ≥ 3:1 (large text, 18pt+)
- [ ] Non-text contrast ≥ 3:1 (icons, borders)
- [ ] Focus indicators visible (3:1 contrast)
- [ ] Color not sole means of conveying information
- [ ] Text resizable to 200% without loss of function

### Forms & Interactions
- [ ] All form fields have labels
- [ ] Error messages are descriptive
- [ ] Required fields clearly marked
- [ ] Success/error states use more than color
- [ ] Time limits can be extended
- [ ] No flashing content (seizure risk)

### Mobile
- [ ] Touch targets ≥ 44x44px
- [ ] Pinch zoom enabled
- [ ] Orientation not locked
- [ ] Content reflows at 320px width
```

---

### 6.2 Performance Optimization & Validation

**Performance Targets**:
- Lighthouse Performance Score: ≥ 90
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms

**Optimization Checklist**:

```markdown
## Performance Optimization

### Images
- [ ] All images optimized (WebP with fallback)
- [ ] All images have explicit width/height
- [ ] All images use loading="lazy" (except above fold)
- [ ] Hero images preloaded
- [ ] Responsive images use srcset
- [ ] No images larger than viewport

### Fonts
- [ ] Fonts preloaded in <head>
- [ ] font-display: swap used
- [ ] Only necessary font weights loaded
- [ ] Fonts subset if possible

### CSS
- [ ] Tailwind purged (unused classes removed)
- [ ] Critical CSS inlined
- [ ] CSS minified
- [ ] No unused CSS frameworks

### JavaScript
- [ ] Scripts deferred or async
- [ ] No render-blocking JS
- [ ] Third-party scripts lazy loaded
- [ ] Bundle size < 200KB

### Caching
- [ ] Static assets cached (1 year)
- [ ] HTML cached (1 hour)
- [ ] Service worker implemented (optional)

### Rendering
- [ ] No layout shift (CLS)
- [ ] Skeleton screens for loading states
- [ ] Lazy load below-fold content
- [ ] Intersection Observer for animations
```

---

## Implementation Timeline

### Sequential Execution (Not Parallel)

**Week 1: Foundation**
- **Days 1-2**: Phase 1 (Design System Foundation)
  - Complete color token system
  - Establish typography system

**Week 2: Visual Identity**
- **Days 3-5**: Phase 2 (Visual Identity & Texture)
  - Add noise texture
  - Create camo pattern
  - Create pencil sketch category icons
  - Develop sketch gallery component

**Week 3: Storytelling**
- **Days 6-8**: Phase 3 (Storytelling & Content Flow)
  - Implement flowing narrative layout
  - Develop flood story visual motif

**Week 4: Trust & Consistency**
- **Days 9-10**: Phase 4 (Trust & Credibility)
  - Add FFL/WVDNR badges
  - Add "Since 2008" marker

- **Days 11-14**: Phase 5 (Component Consistency)
  - Audit all 9 components
  - Create local landmarks icon set
  - Commission landmark sketches (ongoing)

**Week 5: Validation**
- **Days 15-16**: Phase 6 (Accessibility & Performance)
  - Comprehensive accessibility audit
  - Performance optimization
  - Final validation

---

## Success Criteria

### Design System Health
✅ **Complete color token system** with all shades defined  
✅ **Typography hierarchy** used consistently across all components  
✅ **Zero hardcoded values** in production code  
✅ **Visual patterns documented** and reusable

### User Experience
✅ **Flowing narrative** on story page (magazine-style)  
✅ **Authentic outdoor aesthetic** (texture, sketches, camo)  
✅ **Trust signals prominently displayed** (badges, "Since 2008")  
✅ **Emotional resonance** (flood story, local landmarks)

### Technical Excellence
✅ **WCAG 2.1 AA compliance** (4.5:1 contrast, keyboard nav, screen reader)  
✅ **Performance targets met** (LCP < 2.5s, CLS < 0.1)  
✅ **Component consistency** (all audited and validated)  
✅ **Production-ready code** (no technical debt)

### Brand Alignment
✅ **"Hunting & Fishing First" identity** reinforced throughout  
✅ **Cinematic, authentic aesthetic** maintained  
✅ **Resilience narrative** visualized and integrated  
✅ **Local connection** emphasized (landmarks, area page)

---

## Documentation Deliverables

At the end of implementation, create:

1. **Design System Documentation** (`/docs/design-system.md`)
   - Complete color token reference
   - Typography scale and usage
   - Component patterns and examples
   - Accessibility guidelines

2. **Component Audit Report** (`/docs/component-audit-report.md`)
   - Individual audit for each of 9 components
   - Issues found and resolved
   - Before/after comparisons

3. **Performance Report** (`/docs/performance-report.md`)
   - Lighthouse scores (before/after)
   - Optimization strategies applied
   - Ongoing monitoring recommendations

4. **Accessibility Statement** (`/docs/accessibility-statement.md`)
   - WCAG 2.1 AA compliance details
   - Testing methodology
   - Known issues and remediation plan

---

## Final Notes

This plan prioritizes **quality and coherence** over speed. Each phase builds logically on the previous one, creating a complete, production-ready design system that authentically represents the "Hunting & Fishing First" identity.

The sequential approach ensures:
- No rework (everything built on solid foundation)
- No technical debt (quality from day one)
- No compromises (anti-MVP bias honored)
- Complete system (not a collection of features)

**This is not a quick win strategy. This is a build-it-right-the-first-time strategy.**

---

**End of Sequential Implementation Plan**
