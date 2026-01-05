# WVWO Aesthetic Compliance PR Checklist

**CRITICAL**: All checkboxes MUST be checked before merge approval for any Adventure template changes.

---

## Border Radius Compliance

- [ ] **ZERO instances** of `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-3xl` in code
- [ ] **ALL rounded corners** use `rounded-sm` (0.125rem) ONLY
- [ ] **Computed border-radius** values verified <= 2px in browser DevTools
- [ ] **Feature cards** have sharp corners (hardware store aesthetic)
- [ ] **CTA buttons** use `rounded-sm`, not `rounded-md/lg`

**How to verify**:

```bash
# Search codebase for violations
grep -r "rounded-md\|rounded-lg\|rounded-xl" wv-wild-web/src/components/adventure/
grep -r "rounded-md\|rounded-lg\|rounded-xl" wv-wild-web/src/pages/adventures/

# Run automated tests
npm run test:compliance -- border-radius.spec.ts
```

---

## Font Hierarchy Compliance

- [ ] **font-hand** (Permanent Marker) ONLY used for Kim's notes with quotes
- [ ] **ZERO forbidden fonts**: Inter, Poppins, DM Sans, system-ui, Montserrat
- [ ] **font-display** (Bitter) used for all headings
- [ ] **font-body** (Noto Sans) used for body text
- [ ] **CSS variables** correctly defined: `--font-display`, `--font-hand`, `--font-body`

**How to verify**:

```bash
# Check for forbidden fonts
grep -ri "Inter\|Poppins\|DM Sans\|system-ui" wv-wild-web/src/

# Run font compliance tests
npm run test:compliance -- fonts.spec.ts

# Inspect computed styles in DevTools:
# Open /adventures/__test-wma-integration
# Check h1/h2 font-family should be "Bitter"
# Check p font-family should be "Noto Sans"
# Check .font-hand should be "Permanent Marker"
```

---

## Color Accent Compliance

- [ ] **Green** (`border-l-sign-green`) for fish features
- [ ] **Brown** (`border-l-brand-brown`) for camping/marina/spots
- [ ] **Orange** (`brand-orange`) used <5% of screen, CTAs ONLY
- [ ] **ZERO purple**, hot pink, neon, or corporate blue colors
- [ ] **Accent colors** match semantic meaning (fish=green, camping=brown)

**How to verify**:

```bash
# Check accent color usage
grep -r "border-l-" wv-wild-web/src/components/adventure/

# Verify orange scarcity
grep -r "brand-orange\|bg-brand-orange" wv-wild-web/src/ | wc -l
# Should be < 5 instances

# Run color compliance tests
npm run test:compliance -- color-accents.spec.ts
```

---

## Style Compliance

- [ ] **ZERO glassmorphism** or `backdrop-blur` effects
- [ ] **ZERO parallax** scrolling
- [ ] **ZERO bouncy** button animations
- [ ] **ZERO confetti** effects
- [ ] **Animations**: gentle-reveal with `prefers-reduced-motion` support ONLY

**How to verify**:

```bash
# Search for forbidden styles
grep -ri "backdrop-blur\|parallax" wv-wild-web/src/

# Check animations are subtle
grep -r "@keyframes" wv-wild-web/src/components/adventure/
# Should only find "gentle-reveal" animations
```

---

## Copy/Content Compliance

- [ ] **ZERO marketing buzzwords**: "unlock potential", "seamless", "revolutionize", "next-level"
- [ ] **ZERO corporate phrases**: "transform the way you", "all-in-one platform", "cutting-edge"
- [ ] **Text sounds like Kim** (rural WV voice), NOT a marketing agency
- [ ] **Kim's notes** include quotes and authentic rural WV language

**How to verify**:

```bash
# Search for buzzwords (case-insensitive)
grep -ri "unlock\|seamless\|revolutionize\|next-level\|transform the way" wv-wild-web/src/pages/adventures/

# Read content aloud:
# Does it sound like a neighbor explaining fishing spots?
# Or does it sound like a SaaS landing page?
```

---

## Accessibility Compliance

- [ ] **aria-labels** present on sections
- [ ] **Semantic HTML**: ul/li for lists, section/h2 for sections
- [ ] **prefers-reduced-motion** support for animations
- [ ] **Keyboard navigation** functional for CTAs
- [ ] **Screen reader** friendly (icons aria-hidden, info in text)

**How to verify**:

```bash
# Run accessibility tests
npm run test:a11y

# Manual check:
# 1. Tab through page - all CTAs reachable
# 2. Enable "Reduce Motion" in OS - animations disabled
# 3. Test with screen reader (NVDA/JAWS)
```

---

## Visual Regression Compliance

- [ ] **Percy snapshots** approved (if using Percy)
- [ ] **Screenshots match** approved WMA template aesthetic
- [ ] **No unexpected visual changes** from baseline

**How to verify**:

```bash
# Run visual regression tests
npm run test:visual

# Review Percy dashboard for diffs
# Approve only if changes are intentional and compliant
```

---

## The Litmus Test

**Ask yourself**: "Would Kim's neighbors recognize this as 'their shop' online?"

- [ ] **YES**: Authentic rural WV hunting shop aesthetic
- [ ] **NO (REJECT)**: Looks like a tech startup or SaaS landing page

**If it feels like**:

- ❌ Airbnb, Stripe, Vercel, Linear → **REJECT**
- ✅ Rural hardware store, hunting magazine, WVDNR website → **APPROVE**

---

## Automated Test Results

Paste test results here:

```
# Border Radius Tests
npm run test:compliance -- border-radius.spec.ts
[Results]

# Font Tests
npm run test:compliance -- fonts.spec.ts
[Results]

# Color Accent Tests
npm run test:compliance -- color-accents.spec.ts
[Results]
```

---

## Reviewer Sign-Off

- **Reviewer Name**: ________________
- **Date**: ________________
- **Compliance Status**: ☐ APPROVED ☐ CHANGES REQUESTED

**Notes**:
<!-- Document any exceptions, edge cases, or additional findings -->

---

## Exceptions/Waivers

If any checklist items are NOT checked, document the reason here:

**Item**: _______________________
**Reason for exception**: _______________________
**Approved by**: _______________________

---

**Remember**: WVWO is a family-owned hunting shop in rural West Virginia, NOT a tech startup. Every design decision should reflect that authentic identity.
