# SPEC-09 AdventureHero: Comprehensive 60-Issue Fix Plan

**Generated**: December 27, 2025
**PR**: #63 - AdventureHero Component
**Research Sources**: WCAG 2.2 (ISO/IEC 40500:2025), Astro 5.10 Docs, Schema.org 2025, MDN Web Docs

---

## Executive Summary

This plan addresses all 60 issues identified by the 10-agent swarm review, organized into **5 priority tiers** with specific code fixes, testing strategies, and dependencies.

**Issue Breakdown:**
- 🔴 **CRITICAL (5)**: Must fix before merge - accessibility/performance blockers
- 🟠 **HIGH (8)**: Should fix before merge - significant UX/SEO impact
- 🟡 **MEDIUM (15)**: Fix in follow-up PR - code quality improvements
- 🟢 **LOW (22)**: Nice to have - documentation/polish
- ⚪ **TRIVIAL (10)**: Already fixed or non-issues

---

## Phase 1: CRITICAL Fixes (5 Issues)

### 🔴 CRITICAL-1: Missing `sr-only` Context for Difficulty Badges
**File**: `AdventureHeroBadge.astro:72`
**WCAG**: 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value

**Problem**: Shape icons (●▲■◆) have `aria-hidden="true"` but no screen reader context explaining what difficulty level the shape represents.

**Fix**:
```astro
<!-- BEFORE -->
<span class="..." aria-hidden="true">{difficultyShapes[difficulty]}</span>
<span>{difficultyLabels[difficulty]}</span>

<!-- AFTER -->
<span class="..." aria-hidden="true">{difficultyShapes[difficulty]}</span>
<span class="sr-only">Difficulty level: </span>
<span>{difficultyLabels[difficulty]}</span>
```

**Testing**:
- VoiceOver/NVDA should announce "Difficulty level: Challenging"
- Run axe-core accessibility audit

---

### 🔴 CRITICAL-2: External Link Missing "(opens in new tab)"
**File**: `AdventureHero.astro:209-216`
**WCAG**: G200 Technique, 2.4.4 Link Purpose

**Problem**: Google Maps link uses `target="_blank"` without warning users it opens externally.

**Fix**:
```astro
<!-- BEFORE -->
<a
  href={mapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="..."
>
  View on Google Maps
</a>

<!-- AFTER -->
<a
  href={mapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="..."
  aria-describedby={`${componentId}-external-link-notice`}
>
  View on Google Maps
  <span class="sr-only"> (opens in new tab)</span>
  <svg aria-hidden="true" class="inline-block w-3 h-3 ml-1">
    <use href="#icon-external-link" />
  </svg>
</a>
<span id={`${componentId}-external-link-notice`} class="sr-only">
  External link opens in a new browser tab
</span>
```

**Testing**:
- Screen reader announces "opens in new tab"
- Visual icon indicates external link

---

### 🔴 CRITICAL-3: Badge Container Missing `role="group"`
**File**: `AdventureHero.astro:133`
**WCAG**: 1.3.1 Info and Relationships

**Problem**: Badge container lacks semantic grouping for assistive technologies.

**Fix**:
```astro
<!-- BEFORE -->
<div class="adventure-hero__badges ...">

<!-- AFTER -->
<div
  class="adventure-hero__badges ..."
  role="group"
  aria-label="Adventure information badges"
>
```

**Testing**:
- Screen reader announces "Adventure information badges, group"

---

### 🔴 CRITICAL-4: Hero Image Missing `fetchpriority="high"`
**File**: `AdventureHero.astro:102-109`
**Core Web Vitals**: LCP optimization

**Problem**: Hero image is LCP element but doesn't use Astro 5.10's `priority` attribute.

**Fix** (per Astro 5.10 - June 2025):
```astro
<!-- BEFORE -->
<Image
  src={image}
  alt={imageAlt}
  class="..."
  loading={loading}
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

<!-- AFTER -->
<Image
  src={image}
  alt={imageAlt}
  class="..."
  priority
  widths={[400, 800, 1200, 1600]}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Note**: `priority` automatically sets:
- `loading="eager"`
- `decoding="sync"`
- `fetchpriority="high"`

**Testing**:
- Lighthouse LCP score improvement
- Network waterfall shows image loaded first

---

### 🔴 CRITICAL-5: Missing Focus Indicators (WCAG 2.2)
**File**: `adventure-hero.css`
**WCAG 2.2**: 2.4.13 Focus Appearance (Enhanced)

**Problem**: Interactive elements may not have visible focus indicators meeting 2.2 requirements.

**Fix**:
```css
/* Add to adventure-hero.css */
.adventure-hero__cta:focus-visible,
.adventure-hero__maps-link:focus-visible {
  outline: 3px solid var(--brand-orange);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Ensure minimum 2px thickness, 3:1 contrast */
@media (forced-colors: active) {
  .adventure-hero__cta:focus-visible,
  .adventure-hero__maps-link:focus-visible {
    outline: 3px solid CanvasText;
  }
}
```

**Testing**:
- Tab through component, verify visible focus ring
- Windows High Contrast mode test

---

## Phase 2: HIGH Priority Fixes (8 Issues)

### 🟠 HIGH-1: Add JSON-LD Schema for TouristAttraction
**File**: New `AdventureHeroSchema.astro` component

**Fix**: Create reusable schema component using Multi-Type Entity pattern:
```astro
---
interface Props {
  name: string;
  description: string;
  image: string;
  coordinates?: { lat: number; lng: number };
  difficulty: string;
}
const { name, description, image, coordinates, difficulty } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TouristAttraction", "Place"],
      "@id": `${Astro.url}#attraction`,
      "name": name,
      "description": description,
      "image": image,
      ...(coordinates && {
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": coordinates.lat,
          "longitude": coordinates.lng
        }
      }),
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "difficulty",
        "value": difficulty
      }
    }
  ]
})} />
```

---

### 🟠 HIGH-2: Centralize Difficulty Type Definition
**File**: New `types/adventure.ts`

**Fix**:
```typescript
// src/types/adventure.ts
export type DifficultyLevel = 'easy' | 'moderate' | 'challenging' | 'rugged';

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: 'Easy Trail',
  moderate: 'Moderate',
  challenging: 'Challenging',
  rugged: 'Rugged Terrain',
};

export const DIFFICULTY_SHAPES: Record<DifficultyLevel, string> = {
  easy: '\u25CF',      // ●
  moderate: '\u25B2',  // ▲
  challenging: '\u25A0', // ■
  rugged: '\u25C6',    // ◆
};

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  easy: 'bg-sign-green text-white',
  moderate: 'bg-brand-orange text-white',
  challenging: 'bg-brand-mud text-brand-cream',
  rugged: 'bg-red-800 text-white',
};
```

---

### 🟠 HIGH-3: Add Reduced Motion Support
**File**: `adventure-hero.css`

**Fix**:
```css
/* Ensure all animations respect user preference */
@media (prefers-reduced-motion: reduce) {
  .adventure-hero__title,
  .adventure-hero__description,
  .adventure-hero__badges,
  .adventure-hero__cta,
  [class*="hero-stagger"] {
    animation: none !important;
    transition: none !important;
  }

  /* Keep opacity visible */
  .adventure-hero__title,
  .adventure-hero__description {
    opacity: 1;
  }
}
```

---

### 🟠 HIGH-4: Optimize `sizes` Attribute
**File**: `AdventureHero.astro:102-109`

**Current**: `sizes="(max-width: 768px) 100vw, 50vw"`
**Issue**: Doesn't account for actual rendered size in layout

**Fix**:
```astro
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
```

---

### 🟠 HIGH-5: Add `decoding="async"` for Non-LCP Images
**File**: Any secondary images in slots

**Fix**: Ensure slot images use lazy loading:
```astro
<!-- In documentation/usage examples -->
<Image src={secondaryImage} alt="..." loading="lazy" decoding="async" />
```

---

### 🟠 HIGH-6: Improve Color Contrast for `challenging` Badge
**File**: `AdventureHeroBadge.astro`

**Current**: `bg-brand-mud text-brand-cream` (may not meet 4.5:1)

**Fix**: Verify contrast ratio, adjust if needed:
```typescript
challenging: 'bg-brand-mud text-white', // Higher contrast
```

---

### 🟠 HIGH-7: Add Storybook Stories
**File**: New `AdventureHero.stories.ts`

**Fix**: Create comprehensive Storybook documentation (see Phase 4)

---

### 🟠 HIGH-8: Add Print Stylesheet
**File**: `adventure-hero.css`

**Fix**:
```css
@media print {
  .adventure-hero {
    break-inside: avoid;
  }

  .adventure-hero__camo-overlay,
  .adventure-hero__gradient {
    display: none;
  }

  .adventure-hero__title {
    color: #000;
    font-size: 24pt;
  }
}
```

---

## Phase 3: MEDIUM Priority Fixes (15 Issues)

| # | Issue | File | Fix Summary |
|---|-------|------|-------------|
| M-1 | Add Zod runtime validation | `AdventureHero.astro` | Wrap Props interface with z.object() |
| M-2 | Add JSDoc comments | `AdventureHero.astro` | Document all props with @param/@example |
| M-3 | Add will-change hints | `adventure-hero.css` | Add `will-change: transform` before animations |
| M-4 | Remove will-change after animation | JS/CSS | Use animation events to cleanup |
| M-5 | Add container queries | `adventure-hero.css` | Use @container for component-level responsive |
| M-6 | Add visual regression tests | `tests/visual/` | Playwright screenshots at breakpoints |
| M-7 | Add axe-core to E2E tests | `adventure-hero.spec.ts` | Import @axe-core/playwright |
| M-8 | Add error boundary | `AdventureHero.astro` | Graceful fallback for missing image |
| M-9 | Add loading skeleton | `adventure-hero.css` | Placeholder while image loads |
| M-10 | Improve slug sanitization | Test file | Validate edge cases (special chars) |
| M-11 | Add BreadcrumbList schema | Layout integration | JSON-LD breadcrumb in page layout |
| M-12 | Add OpenGraph image | `AdventureHero.astro` | Pass image URL to head meta |
| M-13 | Add analytics events | `AdventureHero.astro` | Track CTA clicks via data attributes |
| M-14 | Improve TypeScript strictness | `tsconfig.json` | Enable strictNullChecks if not already |
| M-15 | Add integration test | `tests/integration/` | Test with real content collection data |

---

## Phase 4: LOW Priority Fixes (22 Issues)

### Documentation & Polish
- L-1: Add CHANGELOG.md entry for SPEC-09
- L-2: Create usage examples in UNIFIED-ARCHITECTURE.md
- L-3: Add migration guide from old hero components
- L-4: Document slot patterns with examples
- L-5: Add ADR for component architecture decisions
- L-6: Create TypeDoc API documentation
- L-7: Add component diagram to docs
- L-8: Document color palette decisions
- L-9: Add animation timing documentation
- L-10: Document responsive breakpoints
- L-11: Add performance benchmarks to docs

### Code Quality
- L-12: Extract animation classes to constants
- L-13: Add CSS custom properties for colors
- L-14: Consider dark mode support (future)
- L-15: Add component ID prefix option
- L-16: Support custom aria-labels
- L-17: Add slot fallback content
- L-18: Consider header/footer slots
- L-19: Add view transition support
- L-20: Consider Server Islands pattern
- L-21: Add preload hints for fonts
- L-22: Optimize SVG icons

---

## Phase 5: Implementation Roadmap

### PR 1: Critical Accessibility (5 fixes)
**Scope**: CRITICAL-1 through CRITICAL-5
**Estimate**: Single PR, ready to merge
**Dependencies**: None

```
Files to modify:
├── AdventureHeroBadge.astro (sr-only context)
├── AdventureHero.astro (external link, role="group", priority)
└── adventure-hero.css (focus indicators)
```

### PR 2: High Priority (8 fixes)
**Scope**: HIGH-1 through HIGH-8
**Dependencies**: PR 1 merged

```
Files to create:
├── types/adventure.ts
├── AdventureHeroSchema.astro
└── AdventureHero.stories.ts

Files to modify:
├── AdventureHero.astro (import types)
├── AdventureHeroBadge.astro (import types)
└── adventure-hero.css (reduced motion, print)
```

### PR 3: Testing & Quality (15 fixes)
**Scope**: MEDIUM-1 through MEDIUM-15
**Dependencies**: PR 2 merged

### PR 4: Documentation (22 fixes)
**Scope**: LOW-1 through LOW-22
**Dependencies**: Can run parallel to PR 3

---

## Testing Strategy

### Automated Tests
```bash
# Unit tests (existing)
npm run test:unit

# E2E with accessibility
npm run test:e2e -- --grep "AdventureHero"

# Visual regression
npm run test:visual

# Accessibility audit
npx playwright test --project=a11y
```

### Manual Testing Checklist
- [ ] VoiceOver (macOS) navigation test
- [ ] NVDA (Windows) navigation test
- [ ] Keyboard-only navigation (Tab, Enter, Escape)
- [ ] 200% zoom test
- [ ] Windows High Contrast mode
- [ ] Reduced motion preference
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score = 100

---

## Research Sources

1. **WCAG 2.2** - ISO/IEC 40500:2025 (Published December 2024)
   - https://www.w3.org/WAI/standards-guidelines/wcag/

2. **Astro 5.10** - Image Priority Attribute (June 2025)
   - https://docs.astro.build/en/reference/modules/astro-assets/

3. **Schema.org 2025** - TouristAttraction + Multi-Type Entities
   - https://schema.org/TouristAttraction
   - https://www.w3.org/community/tourismdata/

4. **CSS GPU Acceleration** - will-change Best Practices
   - https://www.lexo.ch/blog/2025/01/boost-css-performance-with-will-change/

5. **External Link Accessibility** - WCAG G200 Technique
   - https://www.w3.org/WAI/GL/wiki/Using_aria-label_for_link_purpose

---

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| 🔴 CRITICAL | 5 | Ready to implement |
| 🟠 HIGH | 8 | Ready to implement |
| 🟡 MEDIUM | 15 | Planned for follow-up |
| 🟢 LOW | 22 | Backlog |
| ⚪ TRIVIAL | 10 | Already fixed/non-issues |
| **TOTAL** | **60** | |

**Recommended Next Step**: Implement Phase 1 (5 CRITICAL fixes) immediately.
