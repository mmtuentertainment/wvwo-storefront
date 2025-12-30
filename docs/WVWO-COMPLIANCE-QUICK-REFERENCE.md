# WVWO Aesthetic Compliance Quick Reference

**One-page guide for developers working on Adventure templates**

---

## The Golden Rules

1. **rounded-sm ONLY** (0.125rem / 2px) - NO rounded-md/lg/xl
2. **Font hierarchy**: Bitter (headings), Permanent Marker (Kim notes ONLY), Noto Sans (body)
3. **Color accents**: Green (fish), Brown (camping/marina), Orange (<5% CTAs only)
4. **NO glassmorphism** (backdrop-blur), parallax, or bouncy animations
5. **Litmus test**: "Would Kim's neighbors recognize this as 'their shop'?"

---

## Quick Checks Before Committing

```bash
# 1. Regex scan for violations (5 seconds)
grep -r "rounded-md\|rounded-lg\|rounded-xl" wv-wild-web/src/components/adventure/
grep -ri "Inter\|Poppins\|DM Sans" wv-wild-web/src/
grep -r "backdrop-blur" wv-wild-web/src/

# 2. Run compliance tests (30 seconds)
cd wv-wild-web && npm run test:compliance

# 3. Visual inspection in browser
# - Open /adventures/__test-wma-integration
# - Inspect border-radius in DevTools (should be 2px max)
# - Check font-family (Bitter/Permanent Marker/Noto Sans)
```

---

## Component Cheat Sheet

### Border Radius
```astro
<!-- ✅ CORRECT -->
<div class="rounded-sm border">...</div>

<!-- ❌ WRONG -->
<div class="rounded-md border">...</div>
<div class="rounded-lg border">...</div>
```

### Fonts
```astro
<!-- ✅ CORRECT -->
<h2 class="font-display text-4xl">What to Hunt</h2>
<p class="text-brand-brown">Season info...</p>
<p class="font-hand text-sign-green italic">"Creek bottoms at dawn."</p>

<!-- ❌ WRONG -->
<h2 class="font-sans">What to Hunt</h2> <!-- Missing font-display -->
<p class="font-hand">Regular text</p> <!-- font-hand without quotes -->
<style>
  h1 { font-family: 'Inter', sans-serif; } /* Forbidden SaaS font */
</style>
```

### Color Accents
```astro
<!-- ✅ CORRECT -->
<ul>
  <!-- Fish features: green -->
  <li class="border-l-4 border-l-sign-green pl-4">
    <h3>Rainbow Trout</h3>
  </li>

  <!-- Camping/marina: brown -->
  <li class="border-l-4 border-l-brand-brown pl-4">
    <h3>Lakeview Campground</h3>
  </li>
</ul>

<!-- CTAs: orange (sparingly) -->
<a href="/contact" class="bg-brand-orange text-white rounded-sm">
  Get Directions
</a>

<!-- ❌ WRONG -->
<li class="border-l-4 border-l-purple-500 pl-4">...</li> <!-- Forbidden color -->
<div class="bg-brand-orange">...</div> <!-- Orange overuse (backgrounds) -->
```

### Styles
```astro
<!-- ✅ CORRECT -->
<div class="bg-brand-cream border border-brand-brown/15">
  <p class="text-brand-brown">Content...</p>
</div>

<style>
  .gentle-reveal {
    animation: reveal 0.6s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .gentle-reveal { animation: none; }
  }
</style>

<!-- ❌ WRONG -->
<div class="backdrop-blur-md bg-white/80">...</div> <!-- Glassmorphism -->
<div class="animate-bounce">...</div> <!-- Bouncy animation -->
```

---

## Color Palette Reference

```css
/* Brand Colors (WVWO Palette) */
--brand-brown: #3E2723;   /* Weathered barn wood */
--sign-green: #2E7D32;    /* Old metal signs */
--brand-cream: #FFF8E1;   /* Aged paper */
--brand-orange: #FF6F00;  /* Blaze orange (CTAs ONLY) */

/* Usage Rules */
Green (sign-green): Fish features, success states
Brown (brand-brown): Camping, marina, spots, primary text
Cream (brand-cream): Backgrounds (alternate to white)
Orange (brand-orange): Primary CTAs ONLY (<5% of screen)
```

---

## Font Stack Reference

```css
/* Required Fonts */
--font-display: 'Bitter', serif;           /* Display headings (h1-h3) */
--font-hand: 'Permanent Marker', cursive;  /* Kim's notes ONLY (with quotes) */
--font-body: 'Noto Sans', sans-serif;      /* Body text */

/* Forbidden Fonts (SaaS startup aesthetic) */
Inter, DM Sans, Poppins, Outfit, system-ui, Montserrat, Raleway, Open Sans
```

---

## Test Commands

```bash
cd wv-wild-web

# Run ALL compliance tests
npm run test:compliance

# Individual test suites
npm run test:compliance:border   # Border radius violations
npm run test:compliance:fonts    # Font hierarchy violations
npm run test:compliance:colors   # Color accent violations

# ESLint WVWO rules
npm run lint:wvwo

# Full test suite (includes compliance)
npm test
```

---

## DevTools Inspection Checklist

1. Open `/adventures/__test-wma-integration` in browser
2. Open DevTools (F12) → Elements tab
3. Select feature card element
4. Check Computed styles:
   - `border-radius`: Should be `2px` or `0px` (NOT 4px/8px/12px)
   - `font-family`: Should be `Bitter`, `Permanent Marker`, or `Noto Sans`
   - `border-left-color`: `rgb(46, 125, 50)` (green) or `rgb(62, 39, 35)` (brown)
5. Check CTA buttons:
   - `background-color`: `rgb(255, 111, 0)` (orange)
   - `border-radius`: `2px` max

---

## Common Violations and Fixes

### Violation: Using rounded-md
```diff
- <div class="rounded-md border">
+ <div class="rounded-sm border">
```

### Violation: font-hand without context
```diff
- <p class="font-hand">Regular text</p>
+ <p class="text-brand-brown">Regular text</p>
+ <p class="font-hand text-sign-green italic">"Kim's tip: Creek bottoms at dawn."</p>
```

### Violation: Wrong accent color
```diff
<!-- Fish features should be green -->
- <li class="border-l-4 border-l-brand-brown pl-4">
+ <li class="border-l-4 border-l-sign-green pl-4">
    <h3>Rainbow Trout</h3>
  </li>

<!-- Camping should be brown -->
- <li class="border-l-4 border-l-sign-green pl-4">
+ <li class="border-l-4 border-l-brand-brown pl-4">
    <h3>Lakeview Campground</h3>
  </li>
```

### Violation: Orange overuse
```diff
<!-- Orange should be CTAs only, not backgrounds -->
- <section class="bg-brand-orange py-12">
+ <section class="bg-brand-cream py-12">
    <div class="container">
-     <p class="text-white">Content...</p>
+     <p class="text-brand-brown">Content...</p>
+     <a href="/contact" class="bg-brand-orange text-white rounded-sm px-6 py-3">
+       Get Directions
+     </a>
    </div>
  </section>
```

### Violation: Glassmorphism
```diff
- <div class="backdrop-blur-md bg-white/80 rounded-lg">
+ <div class="bg-white border border-brand-brown/15 rounded-sm">
```

---

## PR Checklist (Condensed)

Before requesting review:

- [ ] Zero `rounded-md/lg/xl` classes (use `rounded-sm` only)
- [ ] font-hand ONLY for Kim notes with quotes
- [ ] Green for fish, brown for camping, orange <5% (CTAs)
- [ ] Zero forbidden fonts (Inter, Poppins, etc.)
- [ ] Zero glassmorphism or parallax
- [ ] All compliance tests passing: `npm run test:compliance`
- [ ] DevTools inspection shows correct computed values
- [ ] "Would Kim's neighbors recognize this as 'their shop'?" (YES)

Full checklist: `docs/WVWO-PR-CHECKLIST.md`

---

## When in Doubt

1. **Check WMA template**: `/adventures/__test-wma-integration` is the reference
2. **Run tests**: `npm run test:compliance`
3. **Ask yourself**: "Does this look like a rural WV hunting shop, or a tech startup?"

If it looks like Airbnb, Stripe, or Vercel → **REJECT**
If it looks like a hardware store or WVDNR website → **APPROVE**

---

## Resources

- **Full Architecture**: `docs/SPEC-13-WVWO-AESTHETIC-COMPLIANCE-ARCHITECTURE.md`
- **PR Checklist**: `docs/WVWO-PR-CHECKLIST.md`
- **Test Suites**: `tests/compliance/*.spec.ts`
- **ESLint Rules**: `config/eslint-local-rules.js`
- **CI/CD**: `.github/workflows/wvwo-compliance.yml`

---

**Remember**: WVWO is Kim's family-owned hunting shop, not a Silicon Valley startup. Every design decision should reflect authentic rural West Virginia identity.
