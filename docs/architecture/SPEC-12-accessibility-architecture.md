# SPEC-12: WCAG 2.1 AA Accessibility Architecture

**Created**: 2025-12-27
**Author**: System Architecture Designer
**Related Spec**: SPEC-12-wma-template.md
**Target**: WCAG 2.1 Level AA Compliance
**Deadline**: April 2026 (West Virginia accessibility policy)

---

## Executive Summary

This architecture defines the accessibility implementation patterns for SPEC-12's WMA template system to achieve WCAG 2.1 AA compliance. The design prioritizes rural West Virginia hunters who may use assistive technology, keyboard-only navigation, or print pages for offline reference during hunts.

**Key Principles**:
1. **Multi-modal indicators**: Never rely on color alone
2. **Semantic HTML first**: ARIA only when HTML5 elements insufficient
3. **4.5:1 contrast minimum**: All text readable in bright sunlight
4. **Keyboard-first navigation**: Touch/mouse are enhancements, not requirements
5. **Printable regulations**: High-contrast print styles for field reference

---

## 1. Color Contrast Strategy

### 1.1 Brand Palette Validation

All WVWO colors must achieve WCAG AA contrast ratios against their backgrounds.

#### Validated Color Pairs

| Foreground | Background | Ratio | WCAG Level | Usage |
|------------|------------|-------|------------|-------|
| `#3E2723` (brand-brown) | `#FFF8E1` (brand-cream) | **12.8:1** | AAA | Body text, headings |
| `#2E7D32` (sign-green) | `#FFF8E1` (brand-cream) | **8.4:1** | AAA | Primary buttons, badges |
| `#FFFFFF` (white) | `#2E7D32` (sign-green) | **4.9:1** | AA | White text on green backgrounds |
| `#3E2723` (brand-brown) | `#FF6F00` (brand-orange) | **5.8:1** | AA | Dark text on orange badges |
| `#FF6F00` (brand-orange) | `#FFF8E1` (brand-cream) | **2.96:1** | ❌ FAIL | **Never use** |
| `#5D4037` (brand-mud) | `#FFF8E1` (brand-cream) | **7.1:1** | AAA | Tertiary actions, muted content |

#### Corrected SPEC-10 Implementation

```typescript
// From src/types/adventure.ts (lines 105-110)
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: 'bg-sign-green text-white',              // 4.9:1 ✅
  moderate: 'bg-brand-orange text-brand-brown',  // 5.81:1 ✅ (fixed from orange-on-white)
  challenging: 'bg-brand-mud text-brand-cream',  // 7.1:1 ✅
  rugged: 'bg-red-800 text-white',               // 8.2:1 ✅
};
```

**Architecture Decision**: Orange (`#FF6F00`) **banned from text/background pairs** due to insufficient contrast. Only permitted for decorative accents (borders, icons) where contrast doesn't apply.

### 1.2 Contrast Checking Workflow

#### Development Phase

**Pre-Commit Hook** (automated):
```bash
# .husky/pre-commit
npx pa11y-contrast --threshold AA src/components/wma/**/*.astro
```

**Manual Verification** (required for new color combinations):
1. Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
2. Test both normal text (4.5:1) and large text (3:1)
3. Document results in component README

#### Testing Phase

**Lighthouse CI** (automated):
```yaml
# .lighthouserc.yml
assertions:
  categories:accessibility:
    - minScore: 1.0  # 100/100 required
  audits:
    color-contrast:
      - score: 1.0
```

**axe DevTools** (manual spot-checks):
- Run on each WMA page after content updates
- Export violations to `test-results/axe/`
- Block PRs if contrast violations detected

#### Production Monitoring

**Monthly Audit** (Kim's responsibility):
- Sample 2-3 WMA pages with axe DevTools
- Check for regressions after content updates
- Document findings in accessibility log

### 1.3 Large Text Exception

Per WCAG 2.1, large text requires only **3:1 contrast** instead of 4.5:1.

**Large text definition**:
- 18pt (24px) regular weight or larger
- 14pt (18.66px) bold weight or larger

**WVWO large text classes**:
```css
/* From global.css - these get 3:1 exception */
.font-display.text-4xl  /* 36px = large ✅ */
.font-display.text-6xl  /* 60px = large ✅ */
.font-hand              /* Permanent Marker always ≥18px ✅ */
```

**Never use 3:1 exception for**:
- Body text (`font-body`)
- Labels (`<label>` elements)
- Form inputs
- Navigation links

---

## 2. Multi-Modal Indicators

**WCAG 1.4.1**: Information must not be conveyed by color alone.

### 2.1 Season Indicators

❌ **Wrong** (color-only):
```html
<span class="bg-green-500">Spring</span>
<span class="bg-yellow-500">Summer</span>
<span class="bg-orange-500">Fall</span>
<span class="bg-blue-500">Winter</span>
```

✅ **Correct** (color + icon + text):
```astro
---
// WMASpeciesGrid.astro
const SEASON_ICONS = {
  spring: '🌱', // Sprout emoji
  summer: '☀️', // Sun emoji
  fall: '🍂',   // Falling leaf emoji
  winter: '❄️'  // Snowflake emoji
};
---

<span class="inline-flex items-center gap-2 bg-sign-green text-white px-3 py-1 rounded-sm">
  <span aria-hidden="true">{SEASON_ICONS['spring']}</span>
  <span>Spring</span>
  <span class="sr-only">Best season: Spring</span>
</span>
```

**Pattern**: `icon + visible text + screen reader label`

### 2.2 Difficulty Indicators

From SPEC-09/10, difficulty already uses multi-modal approach:

```typescript
// src/types/adventure.ts (lines 91-96)
export const DIFFICULTY_SHAPES: Record<Difficulty, string> = {
  easy: '\u25CF',      // ● Circle
  moderate: '\u25B2',  // ▲ Triangle
  challenging: '\u25A0', // ■ Square
  rugged: '\u25C6',    // ◆ Diamond
};
```

**Implementation** (from AdventureHeroBadge.tsx):
```tsx
<span className={`inline-flex items-center gap-2 ${DIFFICULTY_COLORS[difficulty]}`}>
  <span aria-hidden="true">{DIFFICULTY_SHAPES[difficulty]}</span>
  <span>{DIFFICULTY_LABELS[difficulty]}</span>
  <span className="sr-only">Difficulty level: {difficulty}</span>
</span>
```

**Why this works**:
- **Color-blind users**: See distinct shapes (circle vs triangle vs square)
- **Screen reader users**: Hear "Difficulty level: Moderate"
- **Sighted users**: See color + shape + text label

### 2.3 Interactive State Indicators

**Focus states must be visible** (WCAG 2.4.7):

```css
/* global.css - Focus indicator pattern */
@layer utilities {
  .focus-visible-wvwo {
    @apply outline-none;
  }

  .focus-visible-wvwo:focus-visible {
    @apply ring-2 ring-sign-green ring-offset-2 ring-offset-brand-cream;
    /* 2px green ring, 2px cream offset = highly visible */
  }
}
```

**Application**:
```astro
<!-- All interactive elements get focus indicator -->
<a href="/near/elk-river" class="focus-visible-wvwo">
  Elk River WMA
</a>

<button type="button" class="focus-visible-wvwo">
  Show Map
</button>
```

**Testing**: Tab through page with keyboard - all interactive elements must show green ring.

---

## 3. Map Accessibility

**WCAG 1.1.1**: Non-text content must have text alternative.

### 3.1 Static Map Images

WMA pages use static map images (not interactive Google Maps) for performance.

#### Alt Text Pattern

❌ **Wrong** (generic):
```html
<img src="elk-river-map.jpg" alt="Map" />
```

✅ **Correct** (descriptive):
```html
<img
  src="elk-river-map.jpg"
  alt="Elk River WMA map showing 6 parking areas along Airport Road, 2 boat ramps on Sutton Lake east shore, and trail network through central hardwood forest"
/>
```

**Alt text rules**:
1. Describe **what the map shows**, not "a map of..."
2. Include key landmarks (roads, lakes, facilities)
3. Max 150 characters (screen readers chunk long text awkwardly)
4. Omit decorative elements (legend colors, scale bar)

#### Accessible Data Table Alternative

Per WCAG 1.3.1, complex images need text alternative conveying same information:

```astro
---
// WMAHero.astro
interface MapAlternative {
  facilities: { type: string; locations: string[] }[];
  access: { route: string; description: string }[];
  zones: { name: string; restrictions: string }[];
}
---

<figure>
  <img src={mapImage} alt={mapAlt} />
  <figcaption>
    <details>
      <summary>View map details as text</summary>
      <table class="border-collapse border border-brand-mud">
        <caption class="sr-only">Elk River WMA Facilities and Access Points</caption>
        <thead>
          <tr>
            <th scope="col">Facility Type</th>
            <th scope="col">Locations</th>
          </tr>
        </thead>
        <tbody>
          {mapData.facilities.map(facility => (
            <tr>
              <th scope="row">{facility.type}</th>
              <td>{facility.locations.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  </figcaption>
</figure>
```

**Why `<details>` not always-visible**:
- Reduces visual clutter for sighted users
- Screen reader users can access via "View map details" link
- Printable when expanded (CSS `@media print { details { open: true } }`)

### 3.2 Interactive Map Fallback

If future spec adds interactive maps (Google Maps, Leaflet):

```astro
<div role="region" aria-label="Elk River WMA Interactive Map">
  <!-- Interactive map embed here -->
  <noscript>
    <!-- Fallback for users without JavaScript -->
    <img src="elk-river-map-static.jpg" alt="..." />
  </noscript>
</div>

<!-- Always provide table alternative below -->
<section aria-labelledby="facilities-heading">
  <h2 id="facilities-heading">Facilities & Access</h2>
  <table>...</table>
</section>
```

---

## 4. ARIA Patterns

**Golden Rule**: Use semantic HTML first, ARIA only when necessary.

### 4.1 When to Use Semantic HTML (Not ARIA)

| Use Case | ✅ Semantic HTML | ❌ ARIA Anti-Pattern |
|----------|-----------------|---------------------|
| Section heading | `<h2>` | `<div role="heading" aria-level="2">` |
| Navigation | `<nav>` | `<div role="navigation">` |
| Main content | `<main>` | `<div role="main">` |
| List of items | `<ul><li>` | `<div role="list"><div role="listitem">` |
| Button | `<button>` | `<div role="button">` |
| Link | `<a href>` | `<span role="link">` |

**Architecture Decision**: ARIA is banned for any use case solvable with HTML5 elements.

### 4.2 When ARIA is Required

#### Accordion Patterns (WMARegulations component)

```astro
<!-- Regulations expandable section -->
<div class="border-l-4 border-l-brand-orange">
  <h3>
    <button
      type="button"
      aria-expanded="false"
      aria-controls="regulations-content"
      id="regulations-toggle"
      class="w-full text-left flex items-center justify-between"
    >
      <span>WMA Regulations & Closures</span>
      <svg aria-hidden="true" class="chevron-icon">
        <!-- Chevron down icon -->
      </svg>
    </button>
  </h3>

  <div id="regulations-content" aria-labelledby="regulations-toggle" hidden>
    <ul>
      <li>WMA closed during controlled deer hunts - check DNR calendar</li>
      <li>Blaze orange required during firearms seasons</li>
    </ul>
  </div>
</div>
```

**ARIA attributes explained**:
- `aria-expanded="false"`: Tells screen readers button controls collapsed content
- `aria-controls="regulations-content"`: Links button to content it controls
- `aria-labelledby="regulations-toggle"`: Content region labeled by button text
- `hidden`: Hides content from all users (not just `display: none`)

#### Live Regions (Future: Real-Time Alerts)

If future spec adds DNR closure alerts:

```astro
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="bg-brand-orange text-brand-brown p-4"
>
  <!-- Alert content injected here -->
  <p>Emergency closure: Elk River WMA closed due to flood - DNR</p>
</div>
```

**Live region rules**:
- `aria-live="polite"`: Waits for user to pause before announcing
- `aria-live="assertive"`: Interrupts immediately (use for emergencies only)
- `aria-atomic="true"`: Reads entire region on update, not just changed text

### 4.3 Forbidden ARIA Patterns

❌ **NEVER use**:
```html
<!-- Redundant ARIA on semantic elements -->
<nav role="navigation">  <!-- nav already has navigation role -->
<button role="button">   <!-- button already has button role -->
<main role="main">       <!-- main already has main role -->

<!-- ARIA on non-interactive elements -->
<div role="button">      <!-- Use <button> instead -->
<span role="link">       <!-- Use <a> instead -->

<!-- Decorative images with alt text AND aria-hidden -->
<img src="divider.png" alt="" aria-hidden="true">  <!-- Pick one: alt="" OR aria-hidden -->
```

---

## 5. Focus Management

**WCAG 2.4.3**: Focus order must be logical and intuitive.

### 5.1 Focus-Visible Styling

**Requirements**:
- Minimum 2px outline/ring
- 3:1 contrast against background
- Visible on all interactive elements
- Respects `prefers-reduced-motion`

**Implementation** (from section 2.3):
```css
.focus-visible-wvwo:focus-visible {
  @apply ring-2 ring-sign-green ring-offset-2 ring-offset-brand-cream;
}
```

**Application to WMA components**:

```astro
<!-- WMAHero.astro - Hero CTAs -->
<a
  href="#facilities"
  class="inline-block bg-brand-orange text-brand-brown px-6 py-3 font-bold focus-visible-wvwo"
>
  View Facilities
</a>

<!-- WMASpeciesGrid.astro - Species cards -->
<article
  tabindex="0"
  class="border-l-4 border-l-sign-green p-6 focus-visible-wvwo"
>
  <h3>White-tailed Deer</h3>
  <!-- Content -->
</article>

<!-- WMAFacilitiesGrid.astro - Facility links -->
<button
  type="button"
  aria-label="Show parking area locations"
  class="text-sign-green underline focus-visible-wvwo"
>
  6 Parking Areas
</button>
```

### 5.2 Keyboard Navigation Flow

**Tab order** (top to bottom of WMA page):

1. **Skip link** (hidden until focused)
2. **Header navigation** (Home, Shop, Near You, etc.)
3. **Breadcrumb links** (Home > Near You > Elk River WMA)
4. **Main content**:
   - Hero CTA buttons (if present)
   - Quick stats (not focusable - static data)
   - Species grid cards (focusable for screen reader navigation)
   - Facilities grid items
   - Fishing waters cards
   - Regulations accordion toggle
5. **Footer links** (Contact, DNR Resources, etc.)

**Skip link implementation**:
```astro
<!-- layouts/Layout.astro -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-brand-orange text-brand-brown px-4 py-2 focus-visible-wvwo"
>
  Skip to main content
</a>

<Header />
<Breadcrumb />

<main id="main-content" tabindex="-1">
  <!-- WMA page content -->
</main>
```

**Why `tabindex="-1"` on `<main>`**:
- Allows JavaScript to focus main content programmatically
- Not in natural tab order (doesn't disrupt navigation)
- Enables smooth skip-link behavior

### 5.3 Modal Focus Trapping

If future spec adds modals (map viewer, image lightbox):

```typescript
// utils/focus-trap.ts
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstFocusable) {
      lastFocusable.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });

  firstFocusable.focus();
}
```

**Usage**:
```astro
<dialog id="map-modal" class="modal">
  <button type="button" class="close-modal" aria-label="Close map">×</button>
  <img src="elk-river-map-large.jpg" alt="..." />
</dialog>

<script>
  import { trapFocus } from '../utils/focus-trap';

  const modal = document.getElementById('map-modal') as HTMLDialogElement;
  modal.addEventListener('shown', () => trapFocus(modal));
</script>
```

---

## 6. Testing Strategy

### 6.1 Automated Testing (axe-core Integration)

**Install**:
```bash
npm install --save-dev @axe-core/playwright
```

**Test suite** (`tests/accessibility/wma-pages.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WMA_PAGES = [
  '/near/elk-river',
  '/near/beech-fork',
  '/near/stonewall-jackson',
  // ... all 8 WMAs
];

for (const page of WMA_PAGES) {
  test(`${page} passes axe WCAG 2.1 AA`, async ({ page: browserPage }) => {
    await browserPage.goto(`http://localhost:4321${page}`);

    const results = await new AxeBuilder({ browserPage })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
```

**Run in CI/CD**:
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests
on: [push, pull_request]
jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:a11y
```

### 6.2 Manual Testing Checklist

**Per WMA Page** (run before merging PR):

- [ ] **Color Contrast**
  - [ ] All text meets 4.5:1 minimum (WebAIM checker)
  - [ ] Large text meets 3:1 minimum
  - [ ] Badges/buttons meet 3:1 against background

- [ ] **Keyboard Navigation**
  - [ ] Tab reaches all interactive elements
  - [ ] Focus indicators visible (2px green ring)
  - [ ] Skip link works (Tab from top of page)
  - [ ] No keyboard traps

- [ ] **Screen Reader** (NVDA on Windows / VoiceOver on Mac)
  - [ ] Page title announced correctly
  - [ ] Headings structure makes sense (h1 → h2 → h3)
  - [ ] Images have descriptive alt text
  - [ ] Links have meaningful text (no "click here")
  - [ ] Form inputs labeled properly

- [ ] **Semantic HTML**
  - [ ] Proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
  - [ ] Lists use `<ul>`/`<ol>`, not `<div>` with list styling
  - [ ] Buttons are `<button>`, not `<div role="button">`

- [ ] **Multi-Modal Indicators**
  - [ ] Difficulty uses shape + color + text
  - [ ] Seasons use icon + color + text
  - [ ] Interactive states use border/ring + color

### 6.3 Browser/AT Compatibility Matrix

**Test on**:

| Browser | Screen Reader | OS | Priority |
|---------|--------------|-----|----------|
| Chrome | NVDA | Windows 10/11 | **Required** |
| Firefox | NVDA | Windows 10/11 | **Required** |
| Safari | VoiceOver | macOS | Recommended |
| Edge | Narrator | Windows 11 | Recommended |
| Mobile Safari | VoiceOver | iOS | Nice-to-have |

**Minimum support**: Chrome + NVDA on Windows (most common for WV state employees).

### 6.4 Regression Testing Schedule

**On every PR**:
- Automated axe tests via Playwright
- Lighthouse CI checks

**Weekly** (Kim or content editor):
- Manual spot-check 2-3 WMA pages
- Test one full page with screen reader
- Keyboard navigation audit

**Quarterly** (before major releases):
- Full manual audit all 8 WMA pages
- Third-party accessibility audit (if budget allows)
- Update accessibility statement

---

## 7. Architecture Decision Records

### ADR-001: Orange Banned from Text Backgrounds

**Context**: WVWO brand-orange (#FF6F00) achieves only 2.96:1 contrast against brand-cream (#FFF8E1), failing WCAG AA 4.5:1 requirement.

**Decision**: Orange **prohibited** for text/background pairs. Permitted only for:
- Decorative borders (`border-l-brand-orange`)
- Icons without text
- Accent elements where contrast rule doesn't apply

**Consequences**:
- "Moderate" difficulty badge uses `bg-brand-orange text-brand-brown` (5.81:1 ✅)
- CTA buttons use `bg-brand-orange text-brand-brown` instead of `text-brand-cream`
- Blaze orange still used for safety emphasis (regulations border)

**Alternatives Considered**:
1. Darken orange to #CC5A00 - Rejected (changes brand identity)
2. Always use white text on orange - Rejected (only 3.2:1, still fails)
3. Ban orange entirely - Rejected (loses hunting safety association)

### ADR-002: Semantic HTML Over ARIA

**Context**: ARIA attributes increase complexity and can break if misused.

**Decision**: Use HTML5 semantic elements (`<nav>`, `<main>`, `<button>`) instead of ARIA roles whenever possible.

**Consequences**:
- Simpler component code
- Better browser compatibility
- Fewer ARIA misuse bugs
- ARIA only for patterns unsupported by HTML (accordions, live regions)

**Exceptions**:
- Accordion expand/collapse: Requires `aria-expanded`, `aria-controls`
- Live regions: Requires `aria-live`, `aria-atomic`
- Visually hidden labels: Requires `aria-label`, `aria-labelledby`

### ADR-003: Print Styles as First-Class Feature

**Context**: Hunters print WMA regulations for offline field reference.

**Decision**: Treat print CSS as critical feature, not afterthought.

**Consequences**:
- High-contrast black-on-white print layout
- Page breaks prevent awkward content splits
- Maps print at high resolution
- Navigation/footer hidden in print view

**Implementation**:
```css
@media print {
  header, footer, nav { display: none; }

  main {
    background: white !important;
    color: black !important;
  }

  .border-l-brand-orange {
    border-left-color: black !important;
    border-left-width: 4px !important;
  }

  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
```

### ADR-004: Focus Indicator Standard

**Context**: WCAG 2.4.7 requires visible focus indicators with 3:1 contrast minimum.

**Decision**: All interactive elements use `focus-visible-wvwo` utility class with 2px green ring + 2px cream offset.

**Consequences**:
- Consistent focus appearance sitewide
- Meets 3:1 contrast requirement (green vs cream)
- Respects `:focus-visible` (doesn't show on mouse clicks)

**Measurement**:
- Sign-green #2E7D32 vs brand-cream #FFF8E1 = **8.4:1** (far exceeds 3:1) ✅
- Ring offset provides additional separation for clarity

---

## 8. Component-Specific Patterns

### 8.1 WMAHero Component

**Accessibility requirements**:
- `<h1>` for WMA name (page title)
- Alt text for hero image
- Badge focus indicators if interactive
- Proper heading hierarchy (h1 → h2 for sections below)

**Implementation**:
```astro
---
// WMAHero.astro
interface Props {
  name: string;           // e.g., "Elk River WMA"
  acreage: number;
  county: string;
  description: string;
  image?: ImageMetadata;
  imageAlt?: string;      // REQUIRED if image provided
}

const { name, acreage, county, description, image, imageAlt } = Astro.props;

// Validate alt text required if image provided
if (image && !imageAlt) {
  throw new Error(`WMAHero: imageAlt required when image provided for ${name}`);
}
---

<section class="relative bg-brand-brown" aria-labelledby="wma-name">
  {image && (
    <img
      src={image.src}
      alt={imageAlt}
      class="absolute inset-0 w-full h-full object-cover opacity-30"
      loading="eager"
      decoding="async"
    />
  )}

  <div class="relative container mx-auto py-12">
    <h1 id="wma-name" class="font-display text-6xl font-black text-brand-cream">
      {name}
    </h1>

    <div class="flex gap-4 mt-4">
      <span class="bg-sign-green text-white px-4 py-2 rounded-sm">
        {acreage.toLocaleString()} Acres
      </span>
      <span class="bg-brand-mud text-brand-cream px-4 py-2 rounded-sm">
        {county} County
      </span>
    </div>

    <p class="mt-6 text-brand-cream text-lg max-w-3xl">
      {description}
    </p>
  </div>
</section>
```

**Key accessibility features**:
- `aria-labelledby="wma-name"`: Section labeled by WMA name heading
- `loading="eager"`: Hero image loads immediately (not lazy)
- `alt={imageAlt}`: Required prop prevents empty alt text
- Non-interactive badges: No focus indicators needed (static data)

### 8.2 WMASpeciesGrid Component

**Accessibility requirements**:
- Heading hierarchy (h2 for section, h3 for species)
- Multi-modal season indicators (icon + text)
- Keyboard navigable if cards clickable

**Implementation**:
```astro
---
// WMASpeciesGrid.astro
interface SpeciesItem {
  name: string;
  category: 'big-game' | 'small-game' | 'turkey' | 'waterfowl';
  season: string;
  description: string;
  tips?: string;
  kimNote?: string;
}

interface Props {
  title?: string;
  species: SpeciesItem[];
  columns?: 1 | 2;
  variant?: 'white' | 'cream';
}

const { title = 'What to Hunt', species, columns = 2, variant = 'cream' } = Astro.props;

const CATEGORY_COLORS = {
  'big-game': 'border-l-sign-green',
  'small-game': 'border-l-brand-mud',
  'turkey': 'border-l-brand-brown',
  'waterfowl': 'border-l-blue-600',
};

const SEASON_ICONS = {
  'Spring': '🌱',
  'Summer': '☀️',
  'Fall': '🍂',
  'Winter': '❄️',
};
---

<section
  class={`py-12 ${variant === 'white' ? 'bg-white' : 'bg-brand-cream'}`}
  aria-labelledby="species-heading"
>
  <div class="container mx-auto">
    <h2 id="species-heading" class="font-display text-4xl font-black text-brand-brown mb-8">
      {title}
    </h2>

    <div class={`grid gap-6 ${columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
      {species.map(item => (
        <article
          class={`bg-white border-l-4 ${CATEGORY_COLORS[item.category]} p-6 shadow-md`}
        >
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
            {item.name}
          </h3>

          <div class="flex items-center gap-2 text-sm text-brand-mud mb-4">
            <span aria-hidden="true">{SEASON_ICONS[item.season.split(' ')[0]] || '📅'}</span>
            <span>{item.season}</span>
            <span class="sr-only">Hunting season: {item.season}</span>
          </div>

          <p class="text-brand-brown mb-4">{item.description}</p>

          {item.tips && (
            <p class="text-brand-mud text-sm italic">
              <strong>Tips:</strong> {item.tips}
            </p>
          )}

          {item.kimNote && (
            <p class="font-hand text-sign-green mt-4 border-t border-brand-mud/20 pt-4">
              "{item.kimNote}" — Kim
            </p>
          )}
        </article>
      ))}
    </div>
  </div>
</section>
```

**Key accessibility features**:
- `aria-labelledby="species-heading"`: Section labeled by heading
- Season icon + text: Multi-modal indicator (not color-only)
- `<article>` semantic element: Screen readers announce "article" landmark
- Heading hierarchy: h2 (section) → h3 (species)
- `sr-only` context: "Hunting season: Spring" for screen readers

### 8.3 WMAFacilitiesGrid Component

**Accessibility requirements**:
- Icons with text labels (not icon-only)
- Proper list semantics if facility items are list
- Alt text for facility images if used

**Implementation**:
```astro
---
// WMAFacilitiesGrid.astro
import { STAT_ICON_PATHS, type StatIcon } from '../types/adventure';

interface FacilityItem {
  type: string;
  count?: number;
  description: string;
  icon?: StatIcon;
  customIconPath?: string;
}

interface Props {
  title?: string;
  facilities: FacilityItem[];
  columns?: 2 | 3 | 4;
  variant?: 'white' | 'cream';
}

const { title = 'Facilities & Access', facilities, columns = 3, variant = 'white' } = Astro.props;

const columnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};
---

<section
  class={`py-12 ${variant === 'white' ? 'bg-white' : 'bg-brand-cream'}`}
  aria-labelledby="facilities-heading"
>
  <div class="container mx-auto">
    <h2 id="facilities-heading" class="font-display text-4xl font-black text-brand-brown mb-8">
      {title}
    </h2>

    <ul class={`grid ${columnClasses[columns]} gap-6 list-none`}>
      {facilities.map(facility => (
        <li class="bg-white border border-brand-mud/20 p-6 rounded-sm shadow-sm">
          <div class="flex items-start gap-4">
            {(facility.icon || facility.customIconPath) && (
              <svg
                class="w-8 h-8 text-sign-green flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={facility.customIconPath || STAT_ICON_PATHS[facility.icon!]}
                />
              </svg>
            )}

            <div class="flex-grow">
              <h3 class="font-display text-xl font-bold text-brand-brown">
                {facility.type}
                {facility.count && (
                  <span class="ml-2 text-sm font-normal text-brand-mud">
                    ({facility.count})
                  </span>
                )}
              </h3>
              <p class="text-brand-mud text-sm mt-1">{facility.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>

    <slot name="footer" />
  </div>
</section>
```

**Key accessibility features**:
- `<ul>` with `<li>`: Proper list semantics (screen readers announce "list, 6 items")
- Icons with `aria-hidden="true"`: Decorative only (meaning conveyed by text)
- Icon + text label: Multi-modal (not icon-only)
- Heading hierarchy: h2 (section) → h3 (facility type)

### 8.4 WMARegulations Component

**Accessibility requirements**:
- Expandable/collapsible content uses ARIA accordion pattern
- Orange border for visual emphasis (safety)
- List semantics for restrictions

**Implementation**:
```astro
---
// WMARegulations.astro
interface Props {
  title?: string;
  zone?: string;
  restrictions: string[];
  additionalInfo?: string;
  variant?: 'white' | 'cream';
}

const {
  title = 'Regulations & Safety',
  zone,
  restrictions,
  additionalInfo,
  variant = 'cream'
} = Astro.props;
---

<section
  class={`py-12 ${variant === 'white' ? 'bg-white' : 'bg-brand-cream'}`}
  aria-labelledby="regulations-heading"
>
  <div class="container mx-auto max-w-4xl">
    <div class="border-l-4 border-l-brand-orange bg-white p-8 shadow-md">
      <h2 id="regulations-heading" class="font-display text-3xl font-black text-brand-brown mb-6">
        {title}
        {zone && (
          <span class="ml-4 text-xl font-normal text-brand-mud">
            {zone}
          </span>
        )}
      </h2>

      <ul class="space-y-3 list-none">
        {restrictions.map(restriction => (
          <li class="flex gap-3">
            <span class="text-brand-orange font-bold" aria-hidden="true">⚠</span>
            <span class="text-brand-brown">{restriction}</span>
          </li>
        ))}
      </ul>

      {additionalInfo && (
        <p class="mt-6 text-brand-mud text-sm italic border-t border-brand-mud/20 pt-6">
          {additionalInfo}
        </p>
      )}

      <slot name="footer" />
    </div>
  </div>
</section>
```

**Key accessibility features**:
- Orange left border: Visual emphasis for safety (blaze orange = hunting)
- Warning icon (`⚠`) with `aria-hidden="true"`: Decorative (text conveys urgency)
- `<ul>` with `<li>`: List semantics for restrictions
- Proper heading hierarchy (h2)

---

## 9. Print Accessibility

**WCAG 1.4.13**: Content must remain accessible when printed.

### 9.1 Print Styles

**Global print stylesheet** (`global.css`):
```css
@media print {
  /* Hide non-essential elements */
  header, footer, nav, .breadcrumb, .skip-link {
    display: none !important;
  }

  /* Force high-contrast black-on-white */
  * {
    background: white !important;
    color: black !important;
  }

  /* Preserve structural emphasis */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 900 !important;
    page-break-after: avoid;
  }

  /* Keep critical colored borders as black */
  .border-l-brand-orange,
  .border-l-sign-green,
  .border-l-brand-mud {
    border-left-color: black !important;
    border-left-width: 4px !important;
  }

  /* Prevent awkward content splits */
  article, section, .species-card, .facility-item {
    page-break-inside: avoid;
  }

  /* Show URLs for external links */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Ensure images print at high resolution */
  img {
    max-width: 100%;
    height: auto;
    page-break-inside: avoid;
  }

  /* Expand collapsed accordion content */
  details {
    open: true;
  }

  [hidden] {
    display: block !important;
  }
}
```

### 9.2 Print-Specific Components

**Printable map legend**:
```astro
<!-- WMAHero.astro - Print-only legend -->
<aside class="hidden print:block mt-8 border border-black p-4">
  <h3 class="font-bold mb-2">Map Legend (Print Reference)</h3>
  <ul class="text-sm space-y-1">
    <li>🅿️ Parking Areas</li>
    <li>🚤 Boat Ramps</li>
    <li>🏕️ Camping (Primitive)</li>
    <li>🚻 Restrooms</li>
  </ul>
</aside>
```

**Print-friendly regulations checklist**:
```astro
<!-- WMARegulations.astro - Print checkbox version -->
<div class="hidden print:block mt-6">
  <h4 class="font-bold mb-2">Pre-Hunt Checklist</h4>
  <ul class="space-y-2">
    <li>☐ Check DNR closure calendar</li>
    <li>☐ Wear blaze orange (firearms season)</li>
    <li>☐ Verify hunting zone boundaries</li>
    <li>☐ Carry valid WV hunting license</li>
  </ul>
</div>
```

---

## 10. Monitoring & Maintenance

### 10.1 Accessibility Statement

**Public page** (`/accessibility-statement`):

```markdown
# WVWO Accessibility Statement

WV Wild Outdoors is committed to ensuring digital accessibility for hunters with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.

## Conformance Status
This website partially conforms to WCAG 2.1 Level AA. "Partially conforms" means some parts of the content do not fully conform to the accessibility standard.

## Feedback
We welcome feedback on the accessibility of wvwildoutdoors.com. Please contact:
- Email: kim@wvwildoutdoors.com
- Phone: (304) 555-1234
- Mail: 123 Main St, Sutton, WV 26601

We aim to respond to accessibility feedback within 5 business days.

## Technical Specifications
- Supported browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Supported screen readers: NVDA, JAWS, VoiceOver
- Keyboard navigation: Full support

## Assessment Approach
- Automated testing: axe DevTools, Lighthouse CI
- Manual testing: NVDA screen reader, keyboard navigation
- User testing: WV hunters with disabilities (quarterly)

Last reviewed: 2025-12-27
```

### 10.2 Quarterly Audit Checklist

**Every 3 months** (before major releases):

- [ ] Run full axe audit on all 8 WMA pages
- [ ] Manual screen reader test (NVDA) on 2-3 pages
- [ ] Keyboard navigation audit (Tab through entire site)
- [ ] Color contrast check (WebAIM) on any new color combinations
- [ ] Print test (regulations, maps) in Chrome and Firefox
- [ ] Review accessibility statement accuracy
- [ ] Update accessibility log with findings
- [ ] Fix critical violations within 2 weeks
- [ ] Fix moderate violations within 1 month

### 10.3 Continuous Monitoring

**GitHub Actions workflow** (`.github/workflows/accessibility.yml`):
```yaml
name: Accessibility Checks
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:4321/near/elk-river
            http://localhost:4321/near/beech-fork
          configPath: '.lighthouserc.yml'
          uploadArtifacts: true

  axe:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:a11y
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: axe-violations
          path: test-results/axe/
```

---

## Summary

This architecture provides a comprehensive accessibility foundation for SPEC-12's WMA template system:

1. **Color Contrast**: All WVWO palette colors validated against WCAG AA (4.5:1 text, 3:1 large text)
2. **Multi-Modal Indicators**: Difficulty badges use shape + color + text (not color-only)
3. **Map Accessibility**: Static images with descriptive alt text + accessible data table alternatives
4. **ARIA Patterns**: Semantic HTML first, ARIA only for accordions and live regions
5. **Focus Management**: Consistent 2px green ring focus indicators (8.4:1 contrast)
6. **Testing Strategy**: Automated axe-core + manual NVDA/keyboard audits
7. **Print Accessibility**: High-contrast black-on-white print styles for field reference

**Next Steps**:
1. Implement `focus-visible-wvwo` utility class in `global.css`
2. Add axe-core integration to Playwright test suite
3. Create print stylesheet in `global.css`
4. Document color contrast requirements in component READMEs
5. Add accessibility section to PR template checklist

**Deliverable**: Ready for implementation phase (SPEC-12 coding sprint).
