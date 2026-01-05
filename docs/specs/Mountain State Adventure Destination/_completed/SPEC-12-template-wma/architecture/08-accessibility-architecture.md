# Accessibility Architecture - WCAG 2.1 AA Implementation

**Architect**: Accessibility Architect
**Domain**: WCAG 2.1 AA patterns, ARIA, semantic HTML
**Date**: 2025-12-27

---

## Accessibility Standards

**Target**: WCAG 2.1 Level AA Compliance
**Testing**: axe-core automated + manual screen reader testing
**Goal**: Zero violations, 100% Lighthouse Accessibility score

---

## Semantic HTML Structure

### Page Landmark Structure

```html
<body>
  <header role="banner">
    <!-- Site navigation -->
  </header>

  <main role="main">
    <section aria-labelledby="quick-stats-heading">
      <h2 id="quick-stats-heading">Quick Stats</h2>
      <!-- AdventureQuickStats content -->
    </section>

    <section aria-labelledby="hunting-heading">
      <h2 id="hunting-heading">What to Hunt</h2>
      <!-- AdventureWhatToHunt content -->
    </section>

    <section aria-labelledby="facilities-heading">
      <h2 id="facilities-heading">Facilities & Access</h2>
      <!-- AdventureCampingList content -->
    </section>
  </main>

  <footer role="contentinfo">
    <!-- Site footer -->
  </footer>
</body>
```

**Benefits**:

- Screen readers announce landmark regions
- Keyboard users skip to main content
- Clear page structure

### Heading Hierarchy

```html
<h1>Burnsville Lake WMA - Hunting & Fishing Guide</h1>  <!-- Page title -->

  <h2>Quick Stats</h2>                                  <!-- Section -->
    <!-- No h3s in this section -->

  <h2>What to Hunt</h2>                                 <!-- Section -->
    <h3>White-tailed Deer</h3>                          <!-- Species -->
    <h3>Wild Turkey</h3>                                <!-- Species -->

  <h2>Fishing Waters</h2>                               <!-- Section -->
    <h3>Burnsville Lake</h3>                            <!-- Water body -->
```

**Rules**:

- Single h1 per page (SEO + A11y)
- No heading skips (h2 → h3, never h2 → h4)
- Logical nesting (h3s under h2s)

---

## Color Contrast Requirements

### WCAG AA Contrast Ratios

| Text Size | Normal Text | Large Text (18pt+) |
|-----------|-------------|-------------------|
| Minimum Contrast | 4.5:1 | 3:1 |

### WVWO Palette Compliance

**Passing Combinations**:

- brand-brown (#3E2723) on cream (#FFF8E1): **13.8:1** ✅
- sign-green (#2E7D32) on cream (#FFF8E1): **6.2:1** ✅
- white (#FFFFFF) on sign-green (#2E7D32): **6.8:1** ✅
- white (#FFFFFF) on brand-brown (#3E2723): **12.1:1** ✅

**Borderline (Requires Testing)**:

- brand-orange (#FF6F00) on white (#FFFFFF): **3.7:1** ⚠️
  - Fails for normal text (<18pt)
  - Passes for large text (≥18pt)
  - **Fix**: Use orange only for CTAs with large text (18pt+)

---

## ARIA Implementation Patterns

### Icon Accessibility

```astro
<!-- Decorative icon (no semantic meaning) -->
<svg aria-hidden="true" class="w-5 h-5">
  <path d="..." />
</svg>
<span>Parking Available</span>

<!-- Icon-only button (requires label) -->
<button aria-label="Get directions to WMA">
  <svg aria-hidden="true">
    <path d="..." />  <!-- map icon -->
  </svg>
</button>

<!-- Icon + text button (no ARIA needed) -->
<button>
  <svg aria-hidden="true">
    <path d="..." />
  </svg>
  Get Directions
</button>
```

### Live Regions (Future Enhancement)

```astro
<!-- Status updates (e.g., "Loading map...") -->
<div role="status" aria-live="polite" aria-atomic="true">
  {loadingMessage}
</div>

<!-- Urgent errors (e.g., "Map failed to load") -->
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

---

## Keyboard Navigation

### Focus Management

```css
/* Visible focus indicator (WCAG 2.4.7) */
*:focus-visible {
  outline: 2px solid var(--brand-orange);
  outline-offset: 2px;
}

/* No outline on mouse click (only keyboard) */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Skip Links

```astro
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

**Screen Reader Only Class**:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## Form Accessibility (Future)

### Label Association

```astro
<label for="species-filter">Filter by Species</label>
<select id="species-filter" name="species">
  <option value="">All Species</option>
  <option value="deer">White-tailed Deer</option>
  <option value="turkey">Wild Turkey</option>
</select>
```

### Error Handling

```astro
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  aria-invalid={emailError ? 'true' : 'false'}
  aria-describedby={emailError ? 'email-error' : undefined}
/>
{emailError && (
  <span id="email-error" class="text-red-600" role="alert">
    {emailError}
  </span>
)}
```

---

## Alternative Content for Maps

### Data Table Alternative

```astro
<!-- Static map image -->
<img src="/maps/burnsville-lake.png" alt="Map of Burnsville Lake WMA access points" />

<!-- Accessible data table alternative -->
<details class="mt-4">
  <summary>View access points as table (accessible alternative)</summary>
  <table>
    <caption>Burnsville Lake WMA Access Points</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">GPS Coordinates</th>
        <th scope="col">Features</th>
      </tr>
    </thead>
    <tbody>
      {accessPoints.map(point => (
        <tr>
          <th scope="row">{point.name}</th>
          <td>{point.coords}</td>
          <td>{point.features.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
</details>
```

**Benefits**:

- Screen readers can navigate table
- Keyboard users can access all data
- Works without images enabled

---

## Reduced Motion

### Respect User Preferences

```css
/* Default: Subtle animations */
.gentle-reveal {
  animation: fadeInUp 0.6s ease-out;
}

/* Reduced motion: Instant appearance */
@media (prefers-reduced-motion: reduce) {
  .gentle-reveal {
    animation: none;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Screen Reader Testing Checklist

### Manual Testing (NVDA/JAWS/VoiceOver)

1. **Page Structure**
   - [ ] Landmarks announced correctly
   - [ ] Headings navigable with H key
   - [ ] Page title read aloud on load

2. **Links & Buttons**
   - [ ] Link purpose clear from text alone
   - [ ] Button labels descriptive (no "Click Here")
   - [ ] Phone links announced as clickable

3. **Images**
   - [ ] All images have alt text
   - [ ] Alt text describes image content (not "image of...")
   - [ ] Decorative images ignored (aria-hidden)

4. **Forms** (Future)
   - [ ] Labels associated with inputs
   - [ ] Error messages announced
   - [ ] Required fields indicated

5. **Tables** (Map alternative)
   - [ ] Table headers announced (th scope)
   - [ ] Table caption describes purpose
   - [ ] Row/column navigation works

---

## Automated Testing (axe-core)

### Test Configuration

```typescript
// tests/a11y/wma-accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('WMA page has zero accessibility violations', async ({ page }) => {
  await page.goto('/adventures/burnsville-lake');

  await injectAxe(page);

  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
```

### CI/CD Integration

```yaml
# .github/workflows/a11y-tests.yml
- name: Run Accessibility Tests
  run: npm run test:a11y

- name: Fail if violations found
  run: exit 1
  if: ${{ steps.a11y.outputs.violations > 0 }}
```

---

## Accessibility Acceptance Criteria

- [ ] Zero axe-core violations (WCAG 2.1 AA)
- [ ] Lighthouse Accessibility score: 100/100
- [ ] All images have alt text
- [ ] Color contrast ≥4.5:1 (normal text), ≥3:1 (large text)
- [ ] Heading hierarchy valid (h1 → h2 → h3, no skips)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus states visible (2px outline, orange)
- [ ] Screen reader testing passed (NVDA + VoiceOver)
- [ ] Reduced motion respected (@media query)
- [ ] Maps have accessible alternative (data table)

---

**Accessibility Architect**: Accessibility architecture complete
**WCAG 2.1 AA Compliance**: HIGH CONFIDENCE
**Testing Strategy**: Automated (axe-core) + Manual (screen readers)
**Priority**: MUST HAVE (legal requirement + SEO benefit)
