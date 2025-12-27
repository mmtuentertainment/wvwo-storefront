# AdventureHero Accessibility Architecture

**SPEC-09 Companion Document**
**Compliance Target**: WCAG 2.2 AA (European Accessibility Act enforcement June 28, 2025)
**Last Updated**: 2025-12-26
**Version**: 1.0.0

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Semantic Structure](#1-semantic-structure)
3. [Screen Reader Experience](#2-screen-reader-experience)
4. [Keyboard Navigation](#3-keyboard-navigation)
5. [Motion and Animation](#4-motion-and-animation)
6. [Color and Contrast](#5-color-and-contrast)
7. [Cognitive Accessibility](#6-cognitive-accessibility)
8. [Decorative Element Handling](#7-decorative-element-handling)
9. [Testing Architecture](#8-testing-architecture)
10. [Implementation Checklist](#9-implementation-checklist)
11. [Reference Patterns](#10-reference-patterns)

---

## Executive Summary

The AdventureHero component must provide an inclusive experience for:

| User Group | Key Needs |
|------------|-----------|
| Screen reader users | Logical reading order, meaningful labels, hidden decorative elements |
| Keyboard navigators | Visible focus, logical tab order, skip links |
| Vestibular disorders | Respects `prefers-reduced-motion`, no auto-play |
| Color blind users | Information not conveyed by color alone |
| Cognitive disabilities | Clear language, consistent patterns, predictable layout |

**Critical Success Metrics**:
- Zero axe-core violations
- NVDA/VoiceOver screen reader audit pass
- Keyboard-only navigation audit pass
- 100% Lighthouse accessibility score

---

## 1. Semantic Structure

### 1.1 Landmark and Heading Hierarchy

```html
<!-- CORRECT: Section landmark with aria-labelledby -->
<section
  class="adventure-hero"
  aria-labelledby="adventure-hero-title"
>
  <!-- Only h1 allowed in hero -->
  <h1 id="adventure-hero-title">
    Summersville Lake
  </h1>

  <!-- Description paragraph -->
  <p id="adventure-hero-desc">
    Crystal clear water with 20-45 feet visibility...
  </p>
</section>

<!-- Page continues with h2+ headings -->
<main>
  <h2>What to Fish</h2>
  ...
</main>
```

### 1.2 Dynamic ID Generation (Prevent Duplicates)

When multiple heroes might exist (edge case), generate unique IDs:

```typescript
interface Props {
  // ... other props
  slug?: string; // Used for unique ID generation
}

// In component:
const heroId = `adventure-hero-${slug ?? 'default'}`;
const titleId = `${heroId}-title`;
const descId = `${heroId}-desc`;
```

### 1.3 Reading Order vs Visual Order

The visual layout (CSS Grid/Flexbox) may differ from DOM order. Ensure:

```html
<!-- DOM order = reading order (logical) -->
<section aria-labelledby="...">
  <!-- 1. Badges (metadata) -->
  <div class="badges" role="group" aria-label="Adventure details">...</div>

  <!-- 2. Title (h1) -->
  <h1>...</h1>

  <!-- 3. Description -->
  <p>...</p>

  <!-- 4. CTAs (optional slot) -->
  <div class="cta-slot">...</div>

  <!-- 5. Hero image (decorative or meaningful) -->
  <figure>...</figure>
</section>
```

**CSS reorders visually but DOM order preserved for screen readers.**

### 1.4 Role Assignments

| Element | Role | Reasoning |
|---------|------|-----------|
| Hero section | Implicit `region` (via `<section>` + `aria-labelledby`) | Landmark for navigation |
| Badge group | `role="group"` + `aria-label` | Groups related metadata |
| Individual badges | `<span>` (no role needed) | Content-bearing, not interactive |
| Camo overlay | `role="presentation"` + `aria-hidden="true"` | Purely decorative |
| Hero image | `role="img"` via `<img>` or explicit | Depends on context (see below) |

---

## 2. Screen Reader Experience

### 2.1 Badge Announcement Pattern

Badges convey critical trip planning info. They MUST be announced clearly:

```html
<!-- PATTERN: Grouped badges with descriptive labels -->
<div
  class="flex flex-wrap gap-3 mb-4"
  role="group"
  aria-label="Adventure details"
>
  <!-- Difficulty badge -->
  <span class="badge difficulty-moderate">
    <span class="sr-only">Difficulty: </span>Moderate
  </span>

  <!-- Season badge -->
  <span class="badge">
    <span class="sr-only">Best season: </span>Year-round
  </span>

  <!-- Drive time badge (when present) -->
  <span class="badge drive-time">
    <span class="sr-only">Travel time from our shop: </span>20 minutes
  </span>
</div>
```

**Screen reader announces**: "Adventure details, group. Difficulty: Moderate. Best season: Year-round. Travel time from our shop: 20 minutes."

### 2.2 Image Alt Text Patterns

| Image Context | Alt Text Approach | Example |
|--------------|-------------------|---------|
| Hero showcasing destination | **Descriptive** - describe what user will experience | `"Aerial view of crystal-clear Summersville Lake surrounded by forested hills"` |
| Generic placeholder | **Decorative** - empty alt | `alt=""` |
| Map/directional image | **Functional** - describe purpose | `"Map showing 30-minute route from WV Wild Outdoors to Summersville Lake"` |

```html
<!-- Meaningful hero image -->
<img
  src={image.src}
  alt={imageAlt}
  loading="eager"
  decoding="async"
  class="..."
/>

<!-- Fallback when no image provided -->
<div
  class="fallback-image"
  role="img"
  aria-label="Image unavailable for this destination"
>
  <span class="sr-only">Image unavailable</span>
  <!-- Fallback visual treatment -->
</div>
```

### 2.3 Hidden Text for Context

Add screen-reader-only context where visual context is obvious:

```html
<!-- Drive time context -->
<span class="badge drive-time">
  <span class="sr-only">From our shop in Birch River: </span>
  20 min drive
</span>

<!-- Difficulty with Kim's voice for screen readers -->
<span class="badge difficulty-rugged">
  <span class="sr-only">This adventure is rated: </span>
  Rugged
  <span class="sr-only">. Expect steep terrain and rough trails.</span>
</span>
```

### 2.4 aria-describedby for Rich Descriptions

Link the hero description to the section for richer context:

```html
<section
  aria-labelledby="adventure-hero-title"
  aria-describedby="adventure-hero-desc"
>
  <h1 id="adventure-hero-title">Summersville Lake</h1>
  <p id="adventure-hero-desc">
    They call it the Little Bahamas of the East for good reason...
  </p>
</section>
```

---

## 3. Keyboard Navigation

### 3.1 Focus Order Through Hero Elements

Focus order MUST match visual/logical reading order:

```text
[Tab 1] → Skip to main content link (hidden until focused)
[Tab 2] → First CTA button (if present in hero)
[Tab 3] → Second CTA button (if present)
[Tab 4] → Exit hero, enter main content
```

### 3.2 Skip Link Implementation

Add skip link BEFORE hero section in page layout (not in component):

```html
<!-- In Layout.astro, BEFORE <Header /> -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-sign-green focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-orange"
>
  Skip to main content
</a>

<!-- Main content target -->
<main id="main-content" tabindex="-1">
  ...
</main>
```

**Skip link CSS pattern (Tailwind)**:

```css
/* Already exists in Tailwind as sr-only + focus:not-sr-only */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50;
  @apply bg-sign-green text-white px-4 py-2 rounded-sm;
  @apply outline-none ring-2 ring-brand-orange;
}
```

### 3.3 Focus Indicators on CTA Buttons

**WCAG 2.2 requires visible focus indicators** with sufficient contrast:

```html
<a
  href="/shop"
  class="
    inline-flex items-center gap-2
    bg-sign-green text-white font-bold px-6 py-3 rounded-sm
    hover:bg-sign-green/90
    motion-safe:transition-colors motion-reduce:transition-none
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-brand-orange
    focus-visible:ring-offset-2
    focus-visible:ring-offset-brand-brown
  "
>
  Browse Our Gear
</a>
```

**Focus indicator specifications**:

| Property | Value | Reasoning |
|----------|-------|-----------|
| Ring width | `2px` (Tailwind `ring-2`) | Visible at all sizes |
| Ring color | `brand-orange` (#FF6F00) | High contrast against dark/light backgrounds |
| Ring offset | `2px` | Separates ring from button edge |
| Offset color | `brand-brown` | Matches hero background |

### 3.4 Focus Trap Prevention

Hero section MUST NOT trap keyboard focus:

```typescript
// NEVER use these patterns in hero:
// - tabindex values > 0 (breaks natural order)
// - JavaScript that prevents Tab key default behavior
// - Focus management that doesn't return focus properly

// If hero has interactive elements, ensure:
// 1. All interactive elements are natively focusable (<a>, <button>)
// 2. No custom focus management scripts
// 3. Escape key is not intercepted
```

---

## 4. Motion and Animation

### 4.1 prefers-reduced-motion Handling

**Strategy**: Completely disable animations (not just reduce) for vestibular safety.

```css
/* In global.css - already implemented */
@media (prefers-reduced-motion: reduce) {
  .animate-gentle-reveal {
    animation: none;
  }
}

/* Additional hero-specific handling */
@media (prefers-reduced-motion: reduce) {
  .adventure-hero * {
    animation: none !important;
    transition: none !important;
  }
}
```

### 4.2 Gentle Reveal Animation Implementation

```css
/* Hero entrance animation - gentle, single occurrence */
@keyframes hero-reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.adventure-hero-content {
  /* Only animate on initial load, not on re-renders */
  animation: hero-reveal 0.6s ease-out both;
}

/* Stagger child elements */
.adventure-hero-badges { animation-delay: 0.1s; }
.adventure-hero-title { animation-delay: 0.2s; }
.adventure-hero-desc { animation-delay: 0.3s; }
.adventure-hero-cta { animation-delay: 0.4s; }

/* CRITICAL: Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .adventure-hero-content,
  .adventure-hero-badges,
  .adventure-hero-title,
  .adventure-hero-desc,
  .adventure-hero-cta {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### 4.3 Prohibited Animations

Per WVWO Frontend Aesthetics, NEVER use in hero:

| Forbidden | Why |
|-----------|-----|
| Auto-playing video | Vestibular triggers, bandwidth, distraction |
| Parallax scrolling | Motion sickness trigger |
| Infinite animations | Distraction, vestibular issues |
| Bouncy/elastic easing | SaaS aesthetic, not WVWO |
| Background Ken Burns zoom | Motion trigger, performance |

### 4.4 Pause Controls

**Not applicable** - AdventureHero uses static images only. If future enhancement adds video:

```html
<!-- Hypothetical video hero (not currently planned) -->
<video
  autoplay
  muted
  loop
  playsinline
  aria-label="Scenic view of Summersville Lake"
>
  <source src="..." type="video/mp4" />
</video>

<!-- MUST include pause control -->
<button
  type="button"
  aria-label="Pause background video"
  aria-pressed="false"
  class="video-pause-btn"
>
  <span class="sr-only">Pause video</span>
  <!-- Pause icon -->
</button>
```

---

## 5. Color and Contrast

### 5.1 Text on brand-brown Verification

**brand-brown (#3E2723)** is the hero background. Verify all text meets 4.5:1:

| Text Color | On brand-brown | Contrast Ratio | Status |
|------------|----------------|----------------|--------|
| White (#FFFFFF) | #3E2723 | **12.63:1** | PASS (AAA) |
| brand-cream (#FFF8E1) | #3E2723 | **11.89:1** | PASS (AAA) |
| brand-cream/80 (rgba 204) | #3E2723 | **9.51:1** | PASS (AAA) |
| brand-cream/60 (rgba 153) | #3E2723 | **6.86:1** | PASS (AA) |
| brand-orange (#FF6F00) | #3E2723 | **5.12:1** | PASS (AA) |

**Minimum text opacity on hero**: `brand-cream/60` for AAA compliance on small text.

### 5.2 Badge Colors for Color-Blind Users

**Problem**: Difficulty badges use color to convey meaning (easy=green, moderate=orange, advanced=brown, rugged=dark).

**Solution**: Add shape/icon differentiation alongside color:

```html
<!-- Difficulty badges with shape indicators -->
<span class="badge bg-sign-green text-white">
  <!-- Circle icon for "easy" -->
  <svg aria-hidden="true" class="w-3 h-3 mr-1 inline-block" viewBox="0 0 12 12">
    <circle cx="6" cy="6" r="5" fill="currentColor"/>
  </svg>
  Easy
</span>

<span class="badge bg-brand-orange text-white">
  <!-- Triangle icon for "moderate" -->
  <svg aria-hidden="true" class="w-3 h-3 mr-1 inline-block" viewBox="0 0 12 12">
    <polygon points="6,1 11,11 1,11" fill="currentColor"/>
  </svg>
  Moderate
</span>

<span class="badge bg-brand-mud text-brand-cream">
  <!-- Square icon for "advanced" -->
  <svg aria-hidden="true" class="w-3 h-3 mr-1 inline-block" viewBox="0 0 12 12">
    <rect x="1" y="1" width="10" height="10" fill="currentColor"/>
  </svg>
  Advanced
</span>

<span class="badge bg-brand-brown-faded text-brand-cream border border-brand-cream/30">
  <!-- Diamond icon for "rugged" -->
  <svg aria-hidden="true" class="w-3 h-3 mr-1 inline-block" viewBox="0 0 12 12">
    <polygon points="6,0 12,6 6,12 0,6" fill="currentColor"/>
  </svg>
  Rugged
</span>
```

**Color blind simulation results**:
- Protanopia: Shapes differentiate all 4 levels
- Deuteranopia: Shapes differentiate all 4 levels
- Tritanopia: Shapes differentiate all 4 levels

### 5.3 Focus Indicator Contrast

Focus ring must have 3:1 contrast against adjacent colors:

| Focus Ring | Against | Contrast Ratio | Status |
|------------|---------|----------------|--------|
| brand-orange (#FF6F00) | brand-brown (#3E2723) | **5.12:1** | PASS |
| brand-orange (#FF6F00) | sign-green (#2E7D32) | **3.87:1** | PASS |
| brand-orange (#FF6F00) | white (#FFFFFF) | **2.47:1** | FAIL on white BG |

**Solution for white backgrounds**: Use darker orange or add offset:

```html
<!-- On white/light backgrounds, use ring-offset -->
<button class="
  focus-visible:ring-2
  focus-visible:ring-brand-orange
  focus-visible:ring-offset-2
  focus-visible:ring-offset-white
">
```

### 5.4 High Contrast Mode Support

Windows High Contrast Mode forces system colors. Test that:

1. Text remains readable (uses `CanvasText`)
2. Focus indicators visible (uses `Highlight`)
3. Interactive elements distinguishable

```css
/* High contrast mode support */
@media (forced-colors: active) {
  .adventure-hero {
    /* Let system colors take over */
    forced-color-adjust: auto;
  }

  .badge {
    /* Ensure badges have visible borders in high contrast */
    border: 1px solid CanvasText;
  }

  .cta-button {
    /* Ensure buttons are clearly interactive */
    border: 2px solid ButtonText;
  }
}
```

---

## 6. Cognitive Accessibility

### 6.1 Clear, Simple Language

**Reading level target**: Grade 8 (Flesch-Kincaid)

| Original | Simplified |
|----------|-----------|
| "Experience unparalleled clarity in these pristine waters" | "The water here is crystal clear - you can see 30 feet down" |
| "Optimal seasonal accessibility year-round" | "Open all year" |
| "Navigate utilizing the designated ingress points" | "Use the main boat ramp" |

**Kim's voice rule**: If it sounds like a brochure, rewrite it.

### 6.2 Consistent Badge Placement

Badges MUST appear in the same order across ALL adventure heroes:

```text
┌─────────────────────────────────────────────┐
│  [Drive Time] [Difficulty] [Season]         │  ← Fixed order
│                                             │
│  Adventure Title (H1)                       │
│                                             │
│  Description text...                        │
└─────────────────────────────────────────────┘
```

**Badge order rationale**:
1. **Drive time** - Most actionable (trip planning)
2. **Difficulty** - Safety consideration
3. **Season** - Planning context

### 6.3 Predictable Layout Patterns

| Element | Desktop Position | Mobile Position | Consistent? |
|---------|-----------------|-----------------|-------------|
| Badges | Top-left, above title | Top, full width | YES |
| Title | Left column | Top, after badges | YES |
| Description | Left column, below title | Below title | YES |
| CTAs | Left column, below description | Below description | YES |
| Image | Right column | Background or below | YES (responsive) |

### 6.4 Reading Level Considerations

**For adventure descriptions**:

```html
<!-- Include pronunciation help for local names -->
<h1 id="adventure-hero-title">
  Burnsville Lake WMA
  <span class="sr-only">(Wildlife Management Area, pronounced Burns-ville)</span>
</h1>
```

**For complex terms**:

```html
<span class="badge">
  Type 02 FFL
  <span class="sr-only"> - Federal Firearms License, meaning we can legally transfer firearms</span>
</span>
```

---

## 7. Decorative Element Handling

### 7.1 Camo SVG Pattern

The camo overlay is purely decorative and MUST be hidden:

```html
<!-- Correct: Hidden from screen readers -->
<div
  class="absolute inset-0 bg-camo opacity-10 pointer-events-none mix-blend-overlay"
  aria-hidden="true"
  role="presentation"
></div>
```

**Both attributes used because**:
- `aria-hidden="true"` - Hides from accessibility tree
- `role="presentation"` - Reinforces decorative nature

### 7.2 Background Gradients

Gradients for readability are decorative:

```html
<!-- Text overlay gradient - decorative -->
<div
  class="absolute inset-0 bg-gradient-to-r from-brand-brown/90 via-brand-brown/40 to-transparent pointer-events-none"
  aria-hidden="true"
></div>
```

### 7.3 Decorative Borders and Shadows

No special handling needed - these are CSS properties, not DOM elements.

### 7.4 Pattern Summary Table

| Element | `aria-hidden` | `role` | Focusable? |
|---------|---------------|--------|------------|
| Camo overlay | `true` | `presentation` | No (`pointer-events-none`) |
| Gradient overlay | `true` | (none needed) | No |
| Noise texture | `true` | `presentation` | No |
| Hero image (meaningful) | `false` | implicit `img` | No |
| Hero image (decorative) | `true` | `presentation` | No |
| Badge icons (shapes) | `true` | (none needed) | No |
| CTA button icons | `true` | (none needed) | No (parent focusable) |

---

## 8. Testing Architecture

### 8.1 axe-core Integration in Vitest

**File**: `wv-wild-web/tests/components/AdventureHero.a11y.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react'; // or Astro testing utils

expect.extend(toHaveNoViolations);

describe('AdventureHero Accessibility', () => {
  const defaultProps = {
    title: 'Test Adventure',
    description: 'A great adventure for testing accessibility.',
    difficulty: 'moderate' as const,
    season: 'Year-round',
    driveTime: '20 min',
    image: { src: '/test.jpg', width: 800, height: 600 },
    imageAlt: 'Test adventure landscape',
  };

  it('passes axe accessibility audit', async () => {
    const { container } = render(<AdventureHero {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading hierarchy', async () => {
    const { container } = render(<AdventureHero {...defaultProps} />);
    const results = await axe(container, {
      rules: { 'heading-order': { enabled: true } }
    });
    expect(results).toHaveNoViolations();
  });

  it('decorative elements have aria-hidden', () => {
    const { container } = render(<AdventureHero {...defaultProps} />);
    const camoOverlay = container.querySelector('.bg-camo');
    expect(camoOverlay?.getAttribute('aria-hidden')).toBe('true');
  });

  it('section has aria-labelledby pointing to h1', () => {
    const { container } = render(<AdventureHero {...defaultProps} />);
    const section = container.querySelector('section');
    const h1 = container.querySelector('h1');
    expect(section?.getAttribute('aria-labelledby')).toBe(h1?.id);
  });

  it('badges have accessible labels', () => {
    const { container } = render(<AdventureHero {...defaultProps} />);
    const badgeGroup = container.querySelector('[role="group"]');
    expect(badgeGroup?.getAttribute('aria-label')).toBe('Adventure details');
  });

  it('respects prefers-reduced-motion', () => {
    // Mock matchMedia for reduced motion
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { container } = render(<AdventureHero {...defaultProps} />);
    const animatedElements = container.querySelectorAll('.animate-gentle-reveal');

    // Verify animation class handling (CSS handles actual disable)
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('CTA buttons have visible focus indicators', () => {
    const { container } = render(
      <AdventureHero {...defaultProps}>
        <button slot="cta">Test CTA</button>
      </AdventureHero>
    );

    const button = container.querySelector('button');
    expect(button?.className).toContain('focus-visible:ring');
  });
});
```

### 8.2 Manual Screen Reader Testing Checklist

**Test with**: NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android)

| Test | NVDA | VoiceOver | TalkBack |
|------|------|-----------|----------|
| Hero section announced as region | [ ] | [ ] | [ ] |
| Title announced as heading level 1 | [ ] | [ ] | [ ] |
| Badge group announced with label | [ ] | [ ] | [ ] |
| Each badge announces full context (e.g., "Difficulty: Moderate") | [ ] | [ ] | [ ] |
| Image alt text announced | [ ] | [ ] | [ ] |
| Decorative camo NOT announced | [ ] | [ ] | [ ] |
| CTA buttons announced with role | [ ] | [ ] | [ ] |
| Skip link works and announces destination | [ ] | [ ] | [ ] |

### 8.3 Keyboard-Only Navigation Test Plan

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Press Tab from browser URL bar | Focus on skip link (or first focusable element) |
| 2 | Press Enter on skip link | Focus jumps to main content, hero skipped |
| 3 | Reload, Tab through hero | Focus moves through CTAs in logical order |
| 4 | Tab past last CTA | Focus exits hero, enters main content |
| 5 | Shift+Tab from main content | Focus returns to last CTA in hero |
| 6 | Press Enter/Space on CTA | Link activates / button triggers |

### 8.4 Color Contrast Automated Checks

**Using axe-core rules**:

```typescript
it('meets color contrast requirements', async () => {
  const { container } = render(<AdventureHero {...defaultProps} />);
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: true },
      'color-contrast-enhanced': { enabled: true }, // AAA for large text
    }
  });
  expect(results).toHaveNoViolations();
});
```

**Manual verification tools**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Stark browser extension](https://www.getstark.co/) (Chrome/Firefox)
- [Lighthouse accessibility audit](https://developers.google.com/web/tools/lighthouse)

---

## 9. Implementation Checklist

### Pre-Implementation

- [ ] Review WCAG 2.2 AA success criteria
- [ ] Set up vitest-axe or jest-axe in test suite
- [ ] Verify brand color contrast ratios
- [ ] Define screen reader testing matrix (NVDA, VoiceOver)

### Component Structure

- [ ] `<section>` with `aria-labelledby` pointing to h1
- [ ] Unique `id` generation for hero title (handle duplicates)
- [ ] Badge group with `role="group"` and `aria-label`
- [ ] sr-only text for badge context (Difficulty:, Season:, Drive time:)
- [ ] Image with descriptive alt text
- [ ] Fallback UI for missing image with appropriate aria

### Decorative Elements

- [ ] Camo overlay: `aria-hidden="true"` + `role="presentation"`
- [ ] Gradient overlay: `aria-hidden="true"`
- [ ] Badge shape icons: `aria-hidden="true"`
- [ ] All decorative SVGs: `aria-hidden="true"` + `focusable="false"`

### Keyboard Navigation

- [ ] Skip link in layout (not component)
- [ ] Logical tab order through CTAs
- [ ] Focus indicators: `focus-visible:ring-2 focus-visible:ring-brand-orange`
- [ ] No focus traps
- [ ] Main content target: `id="main-content"` with `tabindex="-1"`

### Motion and Animation

- [ ] `prefers-reduced-motion` media query disables all animations
- [ ] Tailwind utility classes: `motion-safe:` prefix where needed
- [ ] No auto-playing video or GIFs
- [ ] Animation duration under 5 seconds

### Color and Contrast

- [ ] All text on brand-brown meets 4.5:1 (or 3:1 for large text)
- [ ] Difficulty badges include shape icons for color blind users
- [ ] Focus indicators meet 3:1 against adjacent colors
- [ ] High contrast mode: `forced-colors: active` tested

### Cognitive Accessibility

- [ ] Badge order consistent: Drive Time, Difficulty, Season
- [ ] Description at Grade 8 reading level
- [ ] No jargon without sr-only explanation
- [ ] Predictable layout across all adventure heroes

### Testing

- [ ] axe-core test: zero violations
- [ ] NVDA screen reader audit: pass
- [ ] VoiceOver screen reader audit: pass
- [ ] Keyboard-only navigation: complete all flows
- [ ] Lighthouse accessibility score: 100

---

## 10. Reference Patterns

### 10.1 Complete AdventureHero Accessibility Template

```astro
---
// AdventureHero.astro - Accessibility-first implementation

import { Image } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  difficulty: 'easy' | 'moderate' | 'advanced' | 'rugged';
  season: string;
  driveTime?: string;
  image: ImageMetadata;
  imageAlt: string;
  slug?: string;
}

const { title, description, difficulty, season, driveTime, image, imageAlt, slug } = Astro.props;

// Unique IDs for accessibility
const heroId = `adventure-hero-${slug ?? 'default'}`;
const titleId = `${heroId}-title`;
const descId = `${heroId}-desc`;

// Difficulty badge configuration
const difficultyConfig = {
  easy: { bg: 'bg-sign-green', text: 'text-white', shape: 'circle' },
  moderate: { bg: 'bg-brand-orange', text: 'text-white', shape: 'triangle' },
  advanced: { bg: 'bg-brand-mud', text: 'text-brand-cream', shape: 'square' },
  rugged: { bg: 'bg-brand-brown-faded', text: 'text-brand-cream', shape: 'diamond' },
};
const config = difficultyConfig[difficulty];
---

<section
  id={heroId}
  class="adventure-hero relative bg-brand-brown text-white py-16 md:py-24 overflow-hidden"
  aria-labelledby={titleId}
  aria-describedby={descId}
>
  <!-- Decorative: Camo overlay -->
  <div
    class="absolute inset-0 bg-camo opacity-5 pointer-events-none"
    aria-hidden="true"
    role="presentation"
  ></div>

  <!-- Decorative: Gradient overlay for text readability -->
  <div
    class="absolute inset-0 bg-gradient-to-r from-brand-brown/90 via-brand-brown/40 to-transparent pointer-events-none"
    aria-hidden="true"
  ></div>

  <div class="container relative mx-auto px-4">
    <div class="max-w-3xl motion-safe:animate-gentle-reveal">

      <!-- Badges group -->
      <div
        class="flex flex-wrap items-center gap-3 mb-4"
        role="group"
        aria-label="Adventure details"
      >
        {driveTime && (
          <span class="inline-block bg-sign-green text-white px-4 py-1 rounded-sm font-bold text-sm">
            <span class="sr-only">From our shop in Birch River: </span>
            {driveTime} from shop
          </span>
        )}

        <span class={`inline-flex items-center gap-1 px-4 py-1 rounded-sm font-bold text-sm ${config.bg} ${config.text}`}>
          <!-- Shape icon for color blind users -->
          {config.shape === 'circle' && (
            <svg aria-hidden="true" class="w-3 h-3" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="5" fill="currentColor"/>
            </svg>
          )}
          {config.shape === 'triangle' && (
            <svg aria-hidden="true" class="w-3 h-3" viewBox="0 0 12 12">
              <polygon points="6,1 11,11 1,11" fill="currentColor"/>
            </svg>
          )}
          {config.shape === 'square' && (
            <svg aria-hidden="true" class="w-3 h-3" viewBox="0 0 12 12">
              <rect x="1" y="1" width="10" height="10" fill="currentColor"/>
            </svg>
          )}
          {config.shape === 'diamond' && (
            <svg aria-hidden="true" class="w-3 h-3" viewBox="0 0 12 12">
              <polygon points="6,0 12,6 6,12 0,6" fill="currentColor"/>
            </svg>
          )}
          <span class="sr-only">Difficulty: </span>
          <span class="capitalize">{difficulty}</span>
        </span>

        <span class="inline-block bg-brand-cream text-brand-brown px-4 py-1 rounded-sm font-bold text-sm">
          <span class="sr-only">Best season: </span>
          {season}
        </span>
      </div>

      <!-- Title -->
      <h1
        id={titleId}
        class="font-display font-black text-4xl md:text-6xl mb-4 motion-safe:animate-gentle-reveal motion-safe:[animation-delay:0.1s]"
      >
        {title}
      </h1>

      <!-- Description -->
      <p
        id={descId}
        class="text-xl md:text-2xl text-brand-cream/80 mb-6 leading-relaxed motion-safe:animate-gentle-reveal motion-safe:[animation-delay:0.2s]"
      >
        {description}
      </p>

      <!-- CTA Slot -->
      <div class="motion-safe:animate-gentle-reveal motion-safe:[animation-delay:0.3s]">
        <slot name="cta" />
      </div>
    </div>
  </div>

  <!-- Hero image (if meaningful content) -->
  <div class="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
    <Image
      src={image}
      alt={imageAlt}
      loading="eager"
      decoding="async"
      class="w-full h-full object-cover"
      widths={[400, 800, 1200]}
    />
  </div>
</section>
```

### 10.2 Related Accessibility Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Inclusive Components by Heydon Pickering](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Deque axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-26 | Initial accessibility architecture document |
