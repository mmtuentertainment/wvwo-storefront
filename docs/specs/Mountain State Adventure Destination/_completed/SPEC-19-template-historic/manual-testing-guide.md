# SPEC-19 Manual Testing Guide

**Template:** Historic Site Template
**Test Sites:** Carnifex Ferry Battlefield, Bulltown Historic Area
**Purpose:** Visual validation of Appalachian heritage aesthetics

---

## Pre-Test Setup

### Build and Serve

```bash
cd wv-wild-web
npm run build
npm run preview
```

### Browser DevTools Ready

- Open Chrome/Firefox DevTools (F12)
- Device toolbar for responsive testing
- Accessibility panel enabled
- Network tab for performance

---

## Section 1: Hero Visual Authenticity

### 1.1 Aged Photo Filter

**Location:** Hero section background image

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Sepia tint visible | Warm brownish cast (sepia 0.3) | |
| Slight desaturation | Not full color, not full grayscale | |
| Contrast boost | Details sharper than raw photo | |
| Dark overlay | 14% black overlay dims image | |

**How to verify:** Compare hero image to original source photo - should look "aged" not modern.

### 1.2 Era Badge

**Location:** Gold badge below site name

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Background color | Heritage gold (#d18a00 light variant) | |
| Font | Permanent Marker (handwritten style) | |
| Text shadow | Stone-carved inset effect visible | |
| Text case | UPPERCASE with letter-spacing | |
| Corner radius | Sharp (rounded-sm only, 2px) | |

**How to verify:** Badge should look hand-painted on weathered wood, not glossy/modern.

### 1.3 Typography Stack

**Location:** All hero text

| Element | Font | Weight | Pass/Fail |
|---------|------|--------|-----------|
| Site name (h1) | Bitter | 900 (Black) | |
| Location text | Noto Sans | 400 | |
| Era badge | Permanent Marker | 400 | |
| Significance | Noto Sans | 400 | |

**Forbidden fonts:** If you see Inter, Poppins, Roboto, system-ui - **FAIL IMMEDIATELY**

---

## Section 2: Historical Context (Timeline)

### 2.1 Coal-Gray Timeline Markers

**Location:** Left column vertical borders

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Border color | Coal-gray (#424242) | |
| Border width | 4px left border | |
| Visual weight | Heavy, industrial feel | |

**Narrative meaning:** Coal-gray represents mining heritage control - should feel "company town" serious.

### 2.2 Heritage Burgundy Event Cards

**Location:** Right column event cards

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Border color | Heritage burgundy (#93282c) | |
| Border position | Left edge only (4px) | |
| Background | Heritage cream (#fff8e9 or #efebe2) | |
| Corner radius | rounded-sm only (2px) | |

**Narrative meaning:** Burgundy = museum respect, blood of labor struggles.

### 2.3 Asymmetric Grid

**Location:** Desktop layout (1024px+)

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Column ratio | 2fr : 5fr (not 1:1) | |
| Feel | Hand-built, not corporate grid | |

---

## Section 3: Preserved Structures

### 3.1 Riveted Border Treatment

**Location:** Structure cards corners

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Corner dots visible | Pseudo-element rivets at corners | |
| Dot color | Coal-gray or copper patina | |
| Dot size | Small, subtle (4-6px) | |
| Overall effect | Hand-hammered copper still aesthetic | |

**How to verify:** Look at card corners - should see small circular "rivets" like old copper tanks.

### 3.2 Copper Patina Green

**Location:** Accent elements on structure cards

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Green shade | Layered with WVWO sign-green (#2E7D32) | |
| Appearance | Aged copper, not bright mint | |

### 3.3 Asymmetric Grid

**Location:** Desktop layout (1024px+)

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Column ratio | 3fr : 2fr : 4fr (irregular) | |
| Card sizes | Varying, not uniform | |

---

## Section 4: Tours & Interpretation

### 4.1 Hand-Painted Trail Marker Aesthetic

**Location:** Tour type badges

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Font | Noto Sans (bold) | |
| Background | Sign-green (#2E7D32) | |
| Shadow | Painted-wood shadow effect | |
| Corners | Sharp (rounded-sm) | |

### 4.2 Reserve Tour CTA

**Location:** Tour card buttons

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Background | Brand orange (#FF6F00) | |
| Text | "Reserve Tour" with arrow | |
| Orange coverage | Less than 5% of section | |
| External link | Opens in new tab (rel="noopener") | |

---

## Section 5: Exhibits (Museum Cards)

### 5.1 Lumber Border Treatment

**Location:** Exhibit card borders

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Border widths | Asymmetric (3px 2px 4px 3px) | |
| Border color | Heritage burgundy | |
| Overall effect | Hand-cut lumber, not machine-perfect | |

### 5.2 Aged Paper Background

**Location:** Exhibit card backgrounds

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Background color | Heritage cream (#efebe2) | |
| Texture feel | Old museum exhibit card | |

---

## Section 6: Educational Programs

### 6.1 Heritage Burgundy Borders

**Location:** Program cards

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Border color | Heritage burgundy (#93282c) | |
| Border style | Solid, 2-4px | |

### 6.2 Gold Accent Badges

**Location:** Program type badges (School Groups, Adults, etc.)

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Background | Heritage gold (#d18a00) | |
| Text | Dark (black or brand-brown) for contrast | |
| Usage | Large text only (WCAG compliance) | |

---

## Section 7: Visitor Information

### 7.1 Coal Town Utilitarian Aesthetic

**Location:** Info grid

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Border color | Coal-gray (#424242) | |
| Decoration | NONE - pure function | |
| Layout | 4-column desktop, 2x2 mobile | |
| Feel | Mining town bulletin board | |

---

## Section 8: Nearby History

### 8.1 Trail Blaze Markers

**Location:** Related site cards

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Font | Noto Sans (bold) for site types | |
| Border color | Sign-green (#2E7D32) | |
| Connection feel | Trail system linking sites | |

---

## Responsive Testing Matrix

### Breakpoint Checklist

| Viewport | Textures | Grid | Asymmetry | Pass/Fail |
|----------|----------|------|-----------|-----------|
| 320px (Mobile S) | NONE | 1 column | None | |
| 375px (Mobile M) | NONE | 1 column | None | |
| 768px (Tablet) | NONE | 2 columns | Moderate | |
| 1024px (Desktop) | Full | 3-5 columns | Full | |
| 1920px (Desktop XL) | Full | Max-width contained | Full | |

### Mobile Performance Check

**At 320px-767px:**

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| `.aged-section` textures | Disabled (background: none) | |
| Grid stacking | Single column | |
| Typography | Readable without zoom | |
| Touch targets | Minimum 44x44px | |

---

## Accessibility Testing

### Color Contrast (WCAG 2.1 AA)

| Element | Contrast Ratio | Minimum | Pass/Fail |
|---------|---------------|---------|-----------|
| Brand-brown on cream | 8.2:1 | 4.5:1 | |
| White on burgundy | 5.8:1 | 4.5:1 | |
| White on coal-gray | 9.7:1 | 4.5:1 | |
| Heritage gold text | 3.8:1 | 3:1 (large only) | |

**Gold text rule:** Only on text 18px+ or 14px+ bold

### Focus States

**Tab through all interactive elements:**

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Outline visible | 2px solid brand-orange (#FF6F00) | |
| Outline offset | 2px gap from element | |
| All CTAs reachable | Tab reaches every button/link | |
| No keyboard traps | Can tab away from any element | |

### Screen Reader Test (NVDA/VoiceOver)

| Element | Expected Announcement | Pass/Fail |
|---------|----------------------|-----------|
| Emoji icons | Hidden (aria-hidden="true") OR labeled | |
| Decorative dividers | Hidden (aria-hidden="true") | |
| Image credits | "Image credit: Photo: [source]" | |
| CTAs | Button text + destination | |

### High Contrast Mode

**Enable Windows High Contrast or `prefers-contrast: high`:**

| Element | Normal | High Contrast | Pass/Fail |
|---------|--------|---------------|-----------|
| Burgundy borders | #93282c | Black (#000) | |
| Gold text | #d18a00 | Black (#000) | |
| Coal-gray | #424242 | Black or White | |
| All text | Various | Black on white | |

### Reduced Motion

**Enable `prefers-reduced-motion: reduce`:**

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Skeleton shimmer | Disabled or static | |
| Texture overlays | Disabled | |
| Transitions | Instant or disabled | |

---

## Performance Testing

### Font Loading

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| Preconnect tags | fonts.googleapis.com, fonts.gstatic.com | |
| display=swap | In Google Fonts URL | |
| No FOIT | Text visible immediately (fallback font) | |
| CLS | Minimal shift when fonts load | |

### Image Loading

| Image | Loading Strategy | Pass/Fail |
|-------|-----------------|-----------|
| Hero image | `loading="eager"` | |
| Structure images | `loading="lazy"` | |
| Below-fold images | `loading="lazy" decoding="async"` | |

### Lighthouse Audit

**Run Lighthouse (Chrome DevTools > Lighthouse tab):**

| Category | Target | Actual | Pass/Fail |
|----------|--------|--------|-----------|
| Performance | ≥90 | | |
| Accessibility | 100 | | |
| Best Practices | 100 | | |
| SEO | 100 | | |

---

## Kim's Voice Test (The Litmus Test)

### Would Kim's Neighbors Recognize This?

**Read all visible text aloud. Check for:**

| Check | Expected | Pass/Fail |
|-------|----------|-----------|
| No marketing buzzwords | Zero "unlock", "seamless", "revolutionary" | |
| Respectful tone | "244 casualties" not "exciting battle" | |
| Educational voice | Facts with interpretive depth | |
| Local authenticity | Sounds like WV, not NYC agency | |

### Appalachian Soul Checklist

| Feature | Present | Pass/Fail |
|---------|---------|-----------|
| Riveted corners visible | Structures section | |
| Lumber borders (asymmetric) | Event cards | |
| Metal seam dividers | Between sections | |
| Stone-carved text shadows | Historical dates | |
| Coal-gray timeline | Historical context | |
| Aged photo filter | Hero image | |
| Hand-built grid feel | Not corporate symmetry | |

---

## Forbidden Elements Checklist

**If ANY of these are present, the test FAILS:**

### Fonts

- [ ] Inter
- [ ] Poppins
- [ ] Roboto (regular)
- [ ] DM Sans
- [ ] Montserrat
- [ ] system-ui (as visible fallback)

### Colors

- [ ] Purple gradients
- [ ] Hot pink (#ec4899)
- [ ] Neon anything
- [ ] Corporate blue (#0066cc)

### Styles

- [ ] Glassmorphism / backdrop-blur
- [ ] rounded-md, rounded-lg, rounded-xl
- [ ] Parallax scrolling
- [ ] Bouncy animations
- [ ] Neumorphic designs

### Copy

- [ ] "Unlock potential"
- [ ] "Seamless experience"
- [ ] "Revolutionize"
- [ ] "Next-level"
- [ ] "Curated"

---

## Test Sign-Off

**Tester Name:** _________________

**Date:** _________________

**Test Environment:**
- Browser: _________________
- OS: _________________
- Screen Size: _________________

**Overall Result:** PASS / FAIL

**Notes:**

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

---

## Quick Reference: SPEC-19 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Heritage Burgundy | #93282c | Museum borders, blood of labor |
| Heritage Gold | #d18a00 | Era badges (large text only) |
| Coal-Gray | #424242 | Timelines, company town control |
| Stone-Gray | #757575 | CCC markers, carved monuments |
| Heritage Cream | #fff8e9 | Aged paper backgrounds |
| Heritage Cream Alt | #efebe2 | Museum exhibit cards |
| Sign-Green | #2E7D32 | Trail markers, copper patina |
| Brand Orange | #FF6F00 | CTAs only (<5% coverage) |
| Brand Brown | #3E2723 | Text, borders |
| Brand Cream | #FFF8E1 | Primary backgrounds |

---

**End of Manual Testing Guide**
