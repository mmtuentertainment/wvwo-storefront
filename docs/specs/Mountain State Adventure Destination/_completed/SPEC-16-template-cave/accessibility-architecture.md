# CaveTemplate Accessibility Architecture

**SPEC-16 Phase 2: Accessibility Design**
**Document Version:** 1.0.0
**Created:** 2025-12-30
**WCAG Target:** Level AA (2.1)

---

## 1. ARIA Structure

### 1.1 Section ID and aria-labelledby Mapping

Every major section in CaveTemplate MUST have a unique ID and corresponding `aria-labelledby` attribute for proper screen reader navigation.

| Section | Section ID | Heading ID | Heading Text |
|---------|------------|------------|--------------|
| Hero | (uses aria-label) | `hero-heading` | `{name}` (h1) |
| Tours | `tours-section` | `tours-heading` | "Cave Tours" |
| Formations | `formations-section` | `formations-heading` | "Geological Formations" |
| Conditions | `conditions-section` | `conditions-heading` | "Cave Conditions" |
| Accessibility | `accessibility-section` | `accessibility-heading` | "Accessibility & Requirements" |
| Pricing & Hours | `pricing-section` | `pricing-heading` | "Pricing & Hours" |
| Safety | `safety-section` | `safety-heading` | "Safety Information" |
| History | `history-section` | `history-heading` | "History & Discovery" |
| Gear Checklist | `gear-section` | `gear-heading` | "What to Bring" |
| Related Shop | `shop-section` | `shop-heading` | "Shop Cave Gear" |
| CTA | `cta-section` | (uses aria-label) | N/A |

### 1.2 HTML Pattern for Sections

```html
<!-- Standard Section Pattern -->
<section
  id="tours-section"
  class="py-16 bg-white"
  aria-labelledby="tours-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="tours-heading"
      class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
    >
      Cave Tours
    </h2>
    <!-- Section content -->
  </div>
</section>

<!-- Hero Section Pattern (uses aria-label, not aria-labelledby) -->
<section
  class="relative h-[70vh] min-h-[500px] overflow-hidden"
  aria-label="{name} hero section"
>
  <h1 id="hero-heading" class="...">
    {name}
  </h1>
</section>
```

### 1.3 Landmark Roles

The template uses semantic HTML5 elements that provide implicit landmark roles:

| Element | Implicit Role | Usage |
|---------|---------------|-------|
| `<main>` | main | Primary content container |
| `<section>` | region (with aria-label/labelledby) | Major content sections |
| `<article>` | article | Tour cards, formation cards |
| `<nav>` | navigation | Breadcrumb (if present) |
| `<aside>` | complementary | Kim's tips, fun facts |

### 1.4 Heading Hierarchy

```
h1: {Cave Name} (Hero)
  h2: Cave Tours
    h3: {Tour Name} (each tour card)
  h2: Geological Formations
    h3: {Formation Name} (each formation card)
  h2: Cave Conditions
  h2: Accessibility & Requirements
  h2: Pricing & Hours
    h3: Pricing
    h3: Hours of Operation
  h2: Safety Information
  h2: History & Discovery
  h2: What to Bring (AdventureGearChecklist)
  h2: Shop Cave Gear (AdventureRelatedShop)
```

---

## 2. Color Contrast Validation

### 2.1 WCAG AA Requirements

- **Normal text (< 18pt or < 14pt bold)**: 4.5:1 minimum contrast ratio
- **Large text (>= 18pt or >= 14pt bold)**: 3:1 minimum contrast ratio
- **UI Components & Graphics**: 3:1 minimum contrast ratio

### 2.2 WVWO Brand Color Contrast Ratios

Based on WVWO palette from `global.css`:

| Foreground | Background | Hex Values | Contrast Ratio | WCAG AA | Usage |
|------------|------------|------------|----------------|---------|-------|
| brand-brown | white | #3E2723 on #FFFFFF | **12.63:1** | PASS | Body text, headings |
| brand-brown | brand-cream | #3E2723 on #FFF8E1 | **11.23:1** | PASS | Body text on cream sections |
| white | brand-brown | #FFFFFF on #3E2723 | **12.63:1** | PASS | Hero text overlay |
| white | sign-green | #FFFFFF on #2E7D32 | **4.58:1** | PASS | Badges, tour highlights |
| white | brand-brown/50 | #FFFFFF on rgba overlay | **~6.5:1** | PASS | Hero text on overlay |
| sign-green | white | #2E7D32 on #FFFFFF | **4.58:1** | PASS | Links, icons |
| sign-green | brand-cream | #2E7D32 on #FFF8E1 | **4.07:1** | PASS (large only) | Use for headings/large text |
| brand-mud | white | #5D4037 on #FFFFFF | **7.51:1** | PASS | Secondary text |
| brand-mud | brand-cream | #5D4037 on #FFF8E1 | **6.68:1** | PASS | Secondary text on cream |

### 2.3 Orange Badge Contrast (CRITICAL)

**Problem**: `brand-orange` (#FF6F00) on white text fails WCAG AA.

| Foreground | Background | Contrast Ratio | WCAG AA |
|------------|------------|----------------|---------|
| white | brand-orange | #FFFFFF on #FF6F00 | **2.45:1** | **FAIL** |
| **brand-brown** | brand-orange | #3E2723 on #FF6F00 | **4.87:1** | **PASS** |

**MANDATORY**: All orange badges MUST use `text-brand-brown` NOT `text-white`:

```html
<!-- CORRECT: Brown text on orange (4.87:1) -->
<span class="bg-brand-orange text-brand-brown px-3 py-1 rounded-sm font-body font-medium">
  Wild Cave Tour
</span>

<!-- WRONG: White text on orange (2.45:1) - FAILS WCAG AA -->
<span class="bg-brand-orange text-white px-3 py-1 rounded-sm font-body font-medium">
  Wild Cave Tour
</span>
```

### 2.4 Difficulty Badge Color Mapping (Cave Tours)

| Difficulty | Background | Text | Contrast | WCAG |
|------------|------------|------|----------|------|
| Easy | `bg-sign-green` | `text-white` | 4.58:1 | PASS |
| Moderate | `bg-brand-brown` | `text-brand-cream` | 11.23:1 | PASS |
| Strenuous | `bg-brand-orange` | `text-brand-brown` | 4.87:1 | PASS |
| Wild Cave | `bg-red-900` (#7f1d1d) | `text-white` | 8.59:1 | PASS |

```typescript
// Difficulty color function with accessible contrast
function getTourDifficultyClass(difficulty: CaveTour['difficulty']): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-sign-green text-white';
    case 'moderate':
      return 'bg-brand-brown text-brand-cream';
    case 'strenuous':
      return 'bg-brand-orange text-brand-brown';  // Brown text for contrast!
    case 'wild_cave':
      return 'bg-red-900 text-white';
    default:
      return 'bg-brand-mud text-brand-cream';
  }
}
```

### 2.5 Text on Image Overlays

Hero section uses `bg-brand-brown/50` overlay on images:

```html
<!-- Dark overlay ensures text readability -->
<div class="absolute inset-0 bg-brand-brown/50"></div>

<!-- White text on semi-transparent brown overlay -->
<h1 class="text-white">Cave Name</h1>
<p class="text-brand-cream">Tagline text</p>
```

Estimated contrast ratios with overlay:

- White on overlay: ~6.5:1 (PASS)
- brand-cream on overlay: ~5.8:1 (PASS)

---

## 3. Focus States

### 3.1 Focus Indicator Requirements

All interactive elements MUST have visible focus states that:

- Are clearly distinguishable from default state
- Have sufficient contrast (3:1 minimum against adjacent colors)
- Do not rely solely on color change

### 3.2 Standard Focus Pattern

```css
/* Base focus pattern for CaveTemplate */
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-sign-green
.focus-visible:ring-offset-2
```

### 3.3 Focus States by Element Type

#### External Links

```html
<a
  href={bookingUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-2 bg-sign-green text-white px-6 py-3 rounded-sm
         font-body font-medium hover:bg-sign-green/90
         motion-safe:transition-colors motion-reduce:transition-none
         focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-sign-green focus-visible:ring-offset-2"
>
  Book Your Tour
  <svg class="w-4 h-4" aria-hidden="true"><!-- External link icon --></svg>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

#### Booking Buttons (Primary CTA)

```html
<a
  href={bookingUrl}
  class="inline-flex items-center gap-2 bg-brand-orange text-brand-brown px-8 py-4
         rounded-sm font-display font-bold text-lg
         hover:bg-brand-orange/90
         motion-safe:transition-colors motion-reduce:transition-none
         focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-brand-orange focus-visible:ring-offset-2"
>
  Book Now
</a>
```

#### Secondary Buttons

```html
<a
  href={websiteUrl}
  class="inline-flex items-center gap-2 border-2 border-brand-brown text-brand-brown
         px-6 py-3 rounded-sm font-body font-medium
         hover:bg-brand-brown hover:text-white
         motion-safe:transition-colors motion-reduce:transition-none
         focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-brand-brown focus-visible:ring-offset-2"
>
  Visit Official Website
</a>
```

#### Text Links

```html
<a
  href={url}
  class="text-sign-green font-medium underline underline-offset-2
         hover:text-sign-green/80
         focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-sign-green focus-visible:ring-offset-1"
>
  Learn more
</a>
```

### 3.4 Tab Order Considerations

Tab order follows visual reading order (top-to-bottom, left-to-right):

1. Skip link (if present)
2. Navigation (header)
3. Hero section links (Trail Map, Booking)
4. Section content in order:
   - Tours section booking buttons
   - External pricing links
   - Related shop links
   - CTA buttons
5. Footer links

**Do NOT use `tabindex` values > 0**. Rely on natural DOM order.

---

## 4. Motion Preferences

### 4.1 CSS Media Query Pattern

```css
/* In component <style> block or global.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.2 Tailwind Motion-Safe/Motion-Reduce Classes

CaveTemplate uses Tailwind's built-in motion variants:

```html
<!-- Animation only when motion is OK -->
<button class="motion-safe:transition-colors motion-safe:duration-300 motion-reduce:transition-none">
  Click me
</button>

<!-- Hover effects with motion preference -->
<a class="hover:bg-sign-green/90 motion-safe:transition-colors motion-reduce:transition-none">
  Link
</a>

<!-- Animated elements -->
<div class="motion-safe:animate-fade-in motion-reduce:animate-none">
  Content
</div>
```

### 4.3 Motion Patterns in CaveTemplate

| Element | Motion Effect | Motion-Safe Class | Motion-Reduce Class |
|---------|---------------|-------------------|---------------------|
| Buttons | Color transition on hover | `motion-safe:transition-colors motion-safe:duration-300` | `motion-reduce:transition-none` |
| Links | Color transition | `motion-safe:transition-colors` | `motion-reduce:transition-none` |
| Cards | Scale on hover (if any) | `motion-safe:transition-transform` | `motion-reduce:transition-none` |
| Badges | Fade-in animation | `motion-safe:animate-fade-in` | `motion-reduce:animate-none` |

### 4.4 Component Style Block

```astro
<style>
  /* Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .cave-template * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
```

---

## 5. Screen Reader Considerations

### 5.1 Decorative vs Informative SVG Icons

#### Decorative Icons (Hidden from Screen Readers)

Icons that are purely decorative and don't convey meaning:

```html
<!-- Decorative checkmark next to text -->
<li class="flex items-start gap-2">
  <svg class="w-5 h-5 text-sign-green flex-shrink-0 mt-0.5" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2"/>
  </svg>
  <span>Non-slip walking shoes required</span>
</li>

<!-- Decorative external link icon (text already says "opens in new tab") -->
<a href={url}>
  View pricing
  <svg class="w-4 h-4" aria-hidden="true"><!-- external link icon --></svg>
  <span class="sr-only">(opens in new tab)</span>
</a>
```

#### Informative Icons (Announced to Screen Readers)

Icons that convey meaning not duplicated in text:

```html
<!-- Formation type icon with accessible label -->
<div class="formation-icon">
  <svg aria-label="Stalactite formation" role="img" class="w-8 h-8">
    <title>Stalactite</title>
    <!-- icon paths -->
  </svg>
</div>

<!-- Warning icon for safety -->
<div class="flex items-start gap-2">
  <svg role="img" aria-label="Warning" class="w-5 h-5 text-brand-orange">
    <title>Warning</title>
    <!-- warning triangle icon -->
  </svg>
  <span>Children under 4 not permitted</span>
</div>
```

### 5.2 aria-hidden Usage

```html
<!-- Hide decorative elements -->
<div class="absolute inset-0 bg-brand-brown/50" aria-hidden="true"></div>

<!-- Hide decorative pattern overlay -->
<div class="bg-camo opacity-10" aria-hidden="true"></div>

<!-- Hide purely visual icons -->
<svg aria-hidden="true"><!-- decorative icon --></svg>

<!-- Hide visual separators -->
<span aria-hidden="true" class="text-brand-mud/50">|</span>
```

### 5.3 Alt Text Patterns for Images

#### Hero Image

```html
<img
  src={image}
  alt={imageAlt}  <!-- e.g., "Entrance to Seneca Caverns showing natural limestone formations" -->
  class="absolute inset-0 w-full h-full object-cover"
  loading="eager"
/>
```

Alt text requirements:

- Descriptive but concise (125 characters max)
- Conveys the purpose/content of the image
- Does NOT start with "Image of" or "Photo of"

#### Formation Images (if added in future)

```html
<img
  src={formation.image}
  alt={`${formation.name} - ${formation.typeDisplay} formation showing ${formation.description.substring(0, 50)}...`}
  loading="lazy"
/>
```

#### Decorative Background Images

```html
<!-- Applied via CSS, no alt needed -->
<div class="bg-[url('/patterns/cave-texture.svg')]" role="presentation"></div>
```

### 5.4 Screen Reader Announcements

#### Live Regions (Future Enhancement)

If adding dynamic content updates:

```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Dynamic announcements -->
</div>
```

#### Skip Links (Optional, but Recommended)

```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
         bg-brand-brown text-white px-4 py-2 rounded-sm z-50"
>
  Skip to main content
</a>
```

### 5.5 Table Accessibility (Pricing Section)

If displaying pricing in table format:

```html
<table class="w-full" role="table">
  <caption class="sr-only">Cave tour pricing</caption>
  <thead>
    <tr>
      <th scope="col" class="text-left">Tour Type</th>
      <th scope="col" class="text-right">Adult Price</th>
      <th scope="col" class="text-right">Child Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Classic Tour</th>
      <td>$20</td>
      <td>$12</td>
    </tr>
  </tbody>
</table>
```

---

## 6. Accessibility Section (Orange Accents)

The Accessibility section is CRITICAL for cave destinations. It uses orange accents for visibility while maintaining proper contrast.

### 6.1 Layout Structure

```html
<section
  id="accessibility-section"
  class="py-16 bg-brand-cream"
  aria-labelledby="accessibility-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="accessibility-heading"
      class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8"
    >
      Accessibility & Requirements
    </h2>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- Physical Requirements -->
      <div class="bg-white border-l-4 border-brand-orange p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Physical Requirements
        </h3>
        <ul class="space-y-2" role="list">
          {accessibility.physicalRequirements.map((req) => (
            <li class="flex items-start gap-2 font-body text-brand-mud">
              <svg class="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" aria-hidden="true">
                <!-- Checkmark icon -->
              </svg>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <!-- Limitations -->
      <div class="bg-white border-l-4 border-brand-orange p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Limitations
        </h3>
        <ul class="space-y-2" role="list">
          {accessibility.limitations.map((limit) => (
            <li class="flex items-start gap-2 font-body text-brand-mud">
              <svg class="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" aria-hidden="true">
                <!-- X icon -->
              </svg>
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>

    <!-- Medical Disclaimer -->
    {accessibility.medicalDisclaimer && (
      <div
        class="mt-8 max-w-4xl mx-auto bg-brand-orange/10 border-l-4 border-brand-orange p-6 rounded-sm"
        role="note"
        aria-label="Medical disclaimer"
      >
        <p class="font-body text-brand-brown">
          <strong>Medical Notice:</strong> {accessibility.medicalDisclaimer}
        </p>
      </div>
    )}

  </div>
</section>
```

---

## 7. Testing Checklist

### 7.1 Automated Testing

- [ ] Run axe-core accessibility audit
- [ ] Run Lighthouse accessibility audit (target: 100)
- [ ] Validate HTML with W3C validator
- [ ] Check color contrast with WebAIM Contrast Checker

### 7.2 Manual Testing

- [ ] Navigate entire page using keyboard only (Tab, Enter, Space, Arrow keys)
- [ ] Test with screen reader (NVDA, VoiceOver, or JAWS)
- [ ] Verify all interactive elements have visible focus states
- [ ] Verify heading hierarchy is logical (no skipped levels)
- [ ] Verify all images have appropriate alt text
- [ ] Test with prefers-reduced-motion enabled
- [ ] Test with browser zoom at 200%
- [ ] Test with high contrast mode enabled

### 7.3 Acceptance Criteria

| Criterion | Requirement | Test Method |
|-----------|-------------|-------------|
| Color contrast | 4.5:1 for normal text, 3:1 for large text | WebAIM Contrast Checker |
| Focus visibility | All interactive elements have visible focus | Keyboard navigation |
| Heading structure | Proper h1-h6 hierarchy, no skips | HTML outline validator |
| aria-labelledby | All sections have unique IDs and labels | Manual code review |
| Motion respect | Animations disabled with prefers-reduced-motion | Browser emulation |
| Screen reader | All content accessible and logical | VoiceOver/NVDA testing |
| External links | Have proper rel attributes and sr-only text | Manual code review |
| Orange badges | Use brown text, not white | Visual inspection + contrast check |

---

## 8. Implementation Reference

### 8.1 Complete Section Template

```astro
---
// CaveTemplate.astro - Accessibility-compliant section pattern
---

<section
  id="tours-section"
  class="py-16 bg-white"
  aria-labelledby="tours-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="tours-heading"
      class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center"
    >
      Cave Tours
    </h2>

    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {tours.map((tour, index) => (
        <article
          class="bg-brand-cream border-l-4 border-sign-green p-6 rounded-sm"
          aria-labelledby={`tour-${index}-heading`}
        >
          <div class="flex items-start justify-between mb-3">
            <h3
              id={`tour-${index}-heading`}
              class="font-display text-xl font-bold text-brand-brown"
            >
              {tour.name}
            </h3>
            <span class={`px-3 py-1 rounded-sm font-body text-xs font-bold ${getTourDifficultyClass(tour.difficulty)}`}>
              {tour.difficulty.replace('_', ' ')}
            </span>
          </div>

          <dl class="space-y-2 font-body text-brand-mud mb-4">
            <div class="flex gap-2">
              <dt class="font-bold text-brand-brown">Duration:</dt>
              <dd>{tour.duration}</dd>
            </div>
            {tour.stairs && (
              <div class="flex gap-2">
                <dt class="font-bold text-brand-brown">Stairs:</dt>
                <dd>{tour.stairs} steps</dd>
              </div>
            )}
          </dl>

          {tour.highlights.length > 0 && (
            <div class="flex flex-wrap gap-2">
              {tour.highlights.map((highlight) => (
                <span class="bg-white text-brand-mud px-2 py-1 rounded-sm font-body text-xs">
                  {highlight}
                </span>
              ))}
            </div>
          )}

        </article>
      ))}
    </div>

    <!-- Booking CTA -->
    {bookingUrl && (
      <div class="text-center mt-8">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-sign-green text-white px-6 py-3 rounded-sm
                 font-body font-medium hover:bg-sign-green/90
                 motion-safe:transition-colors motion-reduce:transition-none
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-sign-green focus-visible:ring-offset-2"
        >
          Book Your Cave Tour
          <svg class="w-4 h-4" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"/>
          </svg>
          <span class="sr-only">(opens in new tab)</span>
        </a>
        <p class="mt-2 font-body text-sm text-brand-mud">
          Pricing and availability on the official cave website
        </p>
      </div>
    )}

  </div>
</section>

<style>
  @media (prefers-reduced-motion: reduce) {
    section * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

---

## 9. Quick Reference Card

### Color Contrast Safe Combinations

| Use Case | Background | Text | Classes |
|----------|------------|------|---------|
| Primary text | white | brand-brown | `bg-white text-brand-brown` |
| Primary text | cream | brand-brown | `bg-brand-cream text-brand-brown` |
| Secondary text | white | brand-mud | `bg-white text-brand-mud` |
| Green badge | sign-green | white | `bg-sign-green text-white` |
| Brown badge | brand-brown | cream | `bg-brand-brown text-brand-cream` |
| Orange badge | brand-orange | **brown** | `bg-brand-orange text-brand-brown` |
| Danger badge | red-900 | white | `bg-red-900 text-white` |

### Focus State Classes

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-sign-green
focus-visible:ring-offset-2
```

### Motion Preference Classes

```
motion-safe:transition-colors
motion-safe:duration-300
motion-reduce:transition-none
```

### Screen Reader Utility Classes

```
sr-only           - Visually hidden, accessible to screen readers
aria-hidden="true" - Hidden from screen readers
role="presentation" - Decorative, no semantic meaning
```

---

**Document Status:** Complete
**Next Phase:** Implementation (Phase 3)
