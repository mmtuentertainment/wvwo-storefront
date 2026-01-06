# Feature: Historic Site Template with Appalachian Soul

**Version:** 1.0.0
**Created:** 2026-01-05
**Status:** Draft
**Phase:** Mountain State Adventure Destination
**Research Completed:** Appalachian aesthetic patterns, historic site design excellence

---

## Overview

Create a reusable Astro template component (`HistoricTemplate.astro`) for West Virginia historic sites and battlefields that captures authentic Appalachian heritage through visual design. Unlike previous templates (State Parks = family-friendly recreation, Backcountry = remote wilderness), Historic Sites demand **gravitas, restraint, and living memory connection** with design elements that evoke moonshining heritage, hand-built coal town structures, and CCC-era rustic craftsmanship.

Target: ~475 lines with storytelling emphasis, interpretive information, and **mountain soul baked into every design decision**.

---

## Problem Statement

**Current State:** No template exists for WV historic sites (Carnifex Ferry Battlefield, Bulltown Historic Area, etc.). Without a dedicated template, historic sites would be forced into State Park or Backcountry templates that don't match their solemn, educational tone.

**Who Has This Problem:**
- Content team creating historic site pages (10+ WV battlefields/heritage sites planned)
- Users seeking authentic historical education (not generic museum websites)
- Kim's neighbors who need to recognize "their heritage" online (not corporate/Pinterest rustic)

**Why It Matters:**
Historic sites tell the story of Appalachian grit, divided families during the Civil War, and mountain communities built with limited resources but maximum heart. The design MUST reflect this authenticity - weathered materials, hand-built imperfection, respectful tone.

---

## Goals

### Primary Goal

Build a reusable Astro template that captures authentic Appalachian heritage aesthetics through:
- **Moonshining heritage visual language**: Aged copper patina (matches WVWO sign-green #2E7D32), hand-hammered textures, riveted borders
- **Coal mining town architecture**: Utilitarian simplicity, asymmetric layouts, imperfect spacing, coal-gray #424242 for timeline markers
- **CCC Park Rustic philosophy**: "Accessories to nature, not competitors" - native materials, no ornamentation, stone-carved text effects

### Secondary Goals

- 8 complete sections: Hero, Historical Context (timeline), Preserved Structures, Tours, Exhibits, Educational Programs, Visitor Info, Nearby History
- Educational storytelling emphasis (not just facts - interpretive depth)
- WCAG 2.1 AA compliance with heritage color palette extensions
- Mobile-responsive with organic asymmetry (hand-built feel, not corporate grids)

---

## Non-Goals (Out of Scope)

- ❌ Historical content research (SPEC-19 focuses on template structure; content comes in Phase 4)
- ❌ CMS integration for historical timeline data (use static props for now)
- ❌ Interactive 3D battlefield maps (static site map downloads only)
- ❌ Audio tour integration (list tour types; external links acceptable)
- ❌ Generic "museum website" styling (avoid sterile National Park Service aesthetic)

---

## User Stories

### As a history enthusiast visiting Carnifex Ferry Battlefield page

- I want to see a respectful, gravitas-filled presentation with aged photo treatments
- So that I feel the weight of "244 casualties in a single afternoon" and understand this is sacred ground

### As Kim (site owner)

- I want the historic site pages to feel like authentic Appalachian heritage (not Pinterest rustic farmhouse)
- So that my neighbors recognize this as "their history" online, not some outsider's interpretation

### As a teacher planning a field trip

- I want clear educational program information with booking details
- So that I can easily arrange living history experiences for my students

### As a mobile user on-site at Bulltown Historic Area

- I want tour information and preserved structure details to load quickly on my phone
- So that I can self-guide through the site using my device as a companion

---

## Functional Requirements

### Core Requirements

#### 1. Hero Section

- **Visual Identity:**
  - Grayscale + sepia filter (`sepia(0.3) grayscale(0.2) contrast(1.1) brightness(0.95)`)
  - Darkened overlay: 14% opacity (`bg-black/[0.14]`) - Daniel Lady Farm research pattern
  - Era badge with aged gold background (#d18a00), Roboto Slab font, stone-carved text-shadow
- **Content Fields:**
  - Site name (Bitter 900, 4xl-5xl)
  - Era/date range (e.g., "Civil War Era (1861-1865)")
  - National Register status badge
  - Quick highlights (3-5 key facts)
  - Significance statement (2-3 sentences)

#### 2. Historical Context Section

- **Research-Informed Design:**
  - Timeline with coal-gray (#424242) vertical borders (mining heritage)
  - Event cards with heritage burgundy (#93282c) borders (museum aesthetic)
  - Historical dates in Roboto Slab with stone-carved inset shadow (CCC markers)
- **Content Structure:**
  - Optional timeline (year + event pairs)
  - Major events (date, title, description)
  - Key figures (name, role, bio) in 2-column grid
  - Broader significance statement (aged paper cream background)

#### 3. Preserved Structures Section

- **Appalachian Soul Features:**
  - Riveted pseudo-element corners (hand-hammered copper still aesthetic)
  - Building type labels in Oswald font (hand-painted trail signage)
  - Copper patina green accents layered with WVWO sign-green
- **Content Fields:**
  - Structure name, type, year built, condition (Restored/Ruins/Preserved/Reconstructed)
  - Description, accessibility indicator (ADA icon)
  - Optional site map download link

#### 4. Tours & Interpretation Section

- **Visual Pattern:**
  - Hand-painted trail marker aesthetic (Oswald font, painted-wood shadow)
  - Tour type badges with sign-green backgrounds
- **Tour Types:**
  - Self-Guided, Ranger-Led, Audio Tour, etc.
  - Duration, description, schedule, cost
- **Booking Integration:**
  - External booking system links (Eventbrite, WV State Parks reservation, future affiliations)
  - Component displays "Reserve Tour →" CTA button linking to external URL
  - No embedded booking forms (keeps implementation simple, delegates to specialized platforms)

#### 5. Exhibits Section

- **Museum Card Styling:**
  - Aged paper cream backgrounds (#efebe2)
  - Lumber border treatment (asymmetric: 3px 2px 4px 3px)
  - Artifact labels in Roboto Slab
- **Content:**
  - Exhibit name, dates, description
  - Featured artifacts list
  - Interactive exhibit badges

#### 6. Educational Programs Section

- **Heritage Palette:**
  - Heritage burgundy borders (#93282c)
  - Gold accent badges (#d18a00) for program types
- **Program Details:**
  - Type (School Groups, Adults, Families), name, audience, description
  - Duration, cost, booking contact

#### 7. Visitor Information Section

- **Coal Town Utilitarian Aesthetic:**
  - Coal-gray borders, factual mining-town style
  - No decorative elements - function over form
- **Info Categories:**
  - Hours, admission fees, parking, accessibility
  - 4-column grid on desktop, 2x2 on mobile

#### 8. Nearby History Section

- **Trail Blaze Markers:**
  - Oswald font for site types
  - Sign-green borders connecting related sites
- **Content:**
  - Site name, type, distance/direction, brief description

### Edge Cases

#### Image Handling

- **Missing hero image:** Use solid coal-gray background with era badge prominent
- **Missing structure photos:** Display building name/type only, no placeholder images
- **Texture performance:** Disable aged section backgrounds on mobile (<768px) for performance
- **Image attribution:** All images display source credit (e.g., "Photo: Library of Congress, LC-DIG-cwpb-12345") in small text overlay (bottom-right corner) or caption below

#### Empty Sections

- **No timeline data:** Hide timeline subsection, show events only
- **No exhibits:** Hide entire Exhibits section (don't show "No exhibits available")
- **No educational programs:** Display "Programs available upon request" with contact info

#### Loading States

- **Initial page load:** Progressive loading with skeleton screens - each section renders as data becomes available
- **Skeleton appearance:** Coal-gray animated shimmer placeholders matching section layouts (timeline bars, event cards, structure cards)
- **Image loading:** Blur-up technique - low-res placeholder (LQIP) → full image fade-in
- **Partial failures:** If one section fails to load (e.g., tours API timeout), show error message only in that section, other sections render normally
- **Build-time generation:** For static site generation (SSG), no loading states needed - all data available at build time

#### Accessibility Edge Cases

- **Heritage gold text:** ONLY use on large text (≥18px or ≥14px bold) - WCAG 3.8:1 ratio
- **Textured backgrounds:** Icons get white background boxes (95% opacity) for contrast
- **High contrast mode:** Burgundy borders become black, gold text becomes black

---

## Non-Functional Requirements

### Performance

- **Lighthouse Score:** ≥90 Performance, 100 Accessibility, 100 SEO
- **Texture Optimization:** Aged section backgrounds desktop-only (mobile: solid colors)
- **Font Loading:** Preconnect to Google Fonts, swap strategy for custom fonts (Roboto Slab, Oswald)
- **Image Lazy Loading:** Below-fold structure images use `loading="lazy"`
- **Progressive Rendering:** Sections render independently as data arrives (no blocking waterfall)
- **Skeleton Screen Duration:** Max 800ms before timeout/error state

### Accessibility (WCAG 2.1 AA)

- **Color Contrast Requirements:**
  - Brand-brown on brand-cream: 8.2:1 (✅ AAA)
  - White on heritage-burgundy: 5.8:1 (✅ AA)
  - White on heritage-gold: 3.8:1 (⚠️ AA Large Text Only)
  - White on coal-gray: 9.7:1 (✅ AAA)
- **Focus States:** 2px solid brand-orange outline with 2px offset
- **Reduced Motion:** Disable all texture overlays, transitions
- **Screen Readers:** All icons have `aria-label`, decorative dividers have `aria-hidden="true"`

### Security

- **External Links:** All tour booking/external site links use `rel="noopener noreferrer"`
- **Image Sources:** Validate image URLs, fallback to placeholder for invalid paths
- **XSS Prevention:** Sanitize all user-provided content (if CMS integration added later)

### Image Rights & Attribution

- **Allowed Sources:** Public domain images only (Library of Congress, National Archives, WV State Archives)
- **Required Attribution:** All images must include source credit line, even if public domain (example: "Photo: Library of Congress, LC-DIG-cwpb-12345")
- **Attribution Display:** Small text overlay on image bottom-right corner, or caption below image
- **Future User Submissions:** Not in scope for Phase 3; requires legal review for rights transfer forms

### Browser Support

- **Modern Browsers:** Chrome/Edge 90+, Firefox 88+, Safari 14+
- **Mobile:** iOS Safari 14+, Chrome Android 90+
- **Progressive Enhancement:** Core content accessible without CSS (text-only fallback)

---

## Data Model

### HistoricTemplateProps Interface

```typescript
interface HistoricTemplateProps {
  // Hero Section
  name: string;
  location: string;
  era: string; // e.g., "Civil War Era (1861-1865)"
  significance: string; // Brief summary (2-3 sentences)
  nationalRegister: boolean;
  quickHighlights: string[]; // 3-5 key facts
  heroImage: string;
  heroImageAlt: string;
  heroImageCredit?: string; // "Library of Congress, LC-DIG-cwpb-12345"

  // Historical Context
  historicalContext: {
    timeline?: { year: string; event: string }[]; // Optional
    events: {
      date: string; // "September 10, 1861"
      title: string;
      description: string;
    }[];
    keyFigures?: {
      name: string;
      role: string; // "Confederate General"
      bio: string; // 2-3 sentences
    }[];
    significance: string; // Deeper context paragraph
  };

  // Preserved Structures
  structures: {
    name: string;
    type: string; // "Original Structure", "Reconstruction", "Monument"
    year?: string; // "1862"
    description: string;
    condition: "Restored" | "Ruins" | "Preserved" | "Reconstructed";
    accessible: boolean; // ADA wheelchair icon
    image?: string;
    imageCredit?: string; // Attribution for structure photo
  }[];
  siteMapUrl?: string;

  // Tours & Interpretation
  tours: {
    type: string; // "Self-Guided", "Ranger-Led", "Audio Tour"
    name: string; // "Civil War Walking Tour"
    duration?: string; // "45 minutes"
    description: string;
    schedule?: string; // "Daily 10am-4pm"
    cost?: string; // "Free" or "$5 per person"
    reservationUrl?: string; // External booking link (Eventbrite, State Parks, etc.)
  }[];

  // Exhibits
  exhibits?: {
    title: string;
    location: string; // "Visitor Center", "On-Site"
    description: string;
    interactive?: boolean; // Shows "Interactive" badge
  }[];

  // Educational Programs
  education: {
    programs: {
      name: string;
      audience: string; // "School Groups", "Adults", "Families"
      description: string;
      booking?: string; // Contact info
    }[];
    resources?: {
      title: string;
      type: string; // "Brochure", "Lesson Plan", "Video"
      url?: string;
    }[];
  };

  // Visitor Information
  visitorInfo: {
    hours: { season: string; times: string }[]; // "Summer: 9am-5pm"
    fees: { type: string; amount: string }[]; // "Adults: $5", "Children: Free"
    facilities: string[]; // ["Restrooms", "Parking", "Picnic Area"]
    accessibility: string[]; // ["Wheelchair accessible paths", "Audio guides available"]
    contact: { phone: string; email?: string };
  };

  // Nearby History
  nearbyHistory?: {
    name: string;
    distance: string; // "5 miles north"
    relation: string; // "Part of the same campaign"
    url?: string;
  }[];
}
```

---

## API/Interface Design

### Component Import

```astro
---
import HistoricTemplate from '@/components/templates/HistoricTemplate.astro';
import type { HistoricTemplateProps } from '@/types/templates';

const carnifexFerry: HistoricTemplateProps = {
  name: "Carnifex Ferry Battlefield",
  era: "Civil War Era (1861)",
  // ... rest of props
};
---

<HistoricTemplate {...carnifexFerry} />
```

### Section Components (Modular)

```text
src/components/historic/
├── HistoricHero.astro
├── HistoricalContextSection.astro
├── PreservedStructuresSection.astro
├── ToursSection.astro
├── ExhibitsSection.astro
├── EducationalProgramsSection.astro
├── VisitorInfoSection.astro
└── NearbyHistorySection.astro
```

---

## Dependencies

### External Dependencies

- **Fonts:** Google Fonts API (Roboto Slab 700/900, Oswald 600/700) - preconnect required
- **Icons:** Unicode emoji (♿ for ADA, 📍 for distance) - no icon library needed
- **None:** No external APIs, no CMS integration (static data for Phase 3)

### Internal Dependencies

- **WVWO Tailwind Config:** Extends with heritage color palette (11 new colors)
- **SPEC-17 Patterns:** Industry safety colors (trail difficulty if applicable)
- **SPEC-18 Patterns:** Geographic proximity (Haversine formula for nearby sites)

### Tailwind Config Extensions Required

```js
// tailwind.config.mjs additions
theme: {
  extend: {
    colors: {
      // Heritage palette (SPEC-19)
      'heritage-burgundy': '#93282c',
      'heritage-gold': '#d18a00',
      'coal-gray': '#424242',
      'stone-gray': '#757575',
      'creek-stone': '#616161',
      'heritage-green': '#0a5861',
      'heritage-cream': '#fff8e9',
      'heritage-cream-alt': '#efebe2',
    },
    fontFamily: {
      'marker': ['Roboto Slab', 'serif'],
      'trail': ['Oswald', 'sans-serif'],
    },
    boxShadow: {
      'carved': '2px 2px 0 rgba(0, 0, 0, 0.6)',
      'painted-wood': 'inset 0 0 20px rgba(62, 39, 35, 0.1), 3px 3px 0 rgba(0, 0, 0, 0.2)',
      'lumber': '2px 3px 0 rgba(62, 39, 35, 0.3)',
    },
  }
}
```

---

## Acceptance Criteria

### Visual Authenticity

- [ ] Zero forbidden fonts (Inter, Poppins, system-ui, Roboto Slab, Oswald) - only WVWO fonts (Bitter, Permanent Marker, Noto Sans)
- [ ] Zero purple/pink/neon colors - only WVWO brand + heritage palette
- [ ] Zero glassmorphic effects or backdrop-blur
- [ ] Zero rounded-md/lg/xl corners - only rounded-sm (2px)
- [ ] Hero image has aged photo filter (sepia 0.3, grayscale 0.2)
- [ ] Asymmetric grids feel hand-built (2fr 3fr, not 1fr 1fr)

### Appalachian Soul

- [ ] Riveted border treatment visible on Preserved Structures cards
- [ ] Lumber border (asymmetric 3px 2px 4px 3px) on event cards
- [ ] Metal seam dividers between major sections
- [ ] Stone-carved text-shadow on historical dates
- [ ] Coal-gray timeline markers (not corporate colors)
- [ ] Heritage burgundy borders on museum sections
- [ ] Aged gold era badge with Roboto Slab font

### Technical Excellence

- [ ] Lighthouse Performance ≥90, Accessibility 100
- [ ] All heritage colors pass WCAG 2.1 AA contrast (large gold text only)
- [ ] Mobile responsive 320px-1920px viewport widths
- [ ] Reduced motion preferences honored (no textures/transitions)
- [ ] Focus states visible (2px orange outline)
- [ ] All icons have proper aria-labels

### Content Completeness

- [ ] All 8 sections implemented (Hero through Nearby History)
- [ ] Props interface matches architecture spec (64-137 fields)
- [ ] Optional sections hide gracefully (no "No data" messages)
- [ ] Empty timeline hides subsection, shows events only

### Kim's Voice Test

- [ ] **The Litmus Test:** "Would Kim's neighbors recognize this as 'their heritage' online?"
- [ ] Voice examples: "This battlefield saw 244 casualties in a single afternoon" (respectful)
- [ ] Voice examples: "The Civil War divided West Virginia families - neighbor against neighbor" (educational)
- [ ] Zero marketing buzzwords ("unlock potential", "seamless experience", "curated")

---

## Clarifications

### Session 2026-01-05

- **Q:** Tour booking integration approach - external systems vs simple contact links?
- **A:** External booking system links (Option A). Use `reservationUrl` prop field to link to Eventbrite, WV State Parks reservations, or future affiliate booking platforms. Display "Reserve Tour →" CTA button. No embedded forms - delegate to specialized platforms.

- **Q:** Image rights and attribution strategy for historical photos?
- **A:** Public domain + required attribution (Option B). Use Library of Congress, National Archives, WV State Archives public domain images. All images require source credit line (e.g., "Photo: Library of Congress, LC-DIG-cwpb-12345") displayed as small text overlay (bottom-right) or caption. Props include `heroImageCredit` and `structure.imageCredit` fields. User submissions not in scope for Phase 3.

- **Q:** Loading states and empty state display strategy?
- **A:** Progressive loading with skeleton screens (Option A). Sections render independently as data arrives. Coal-gray animated shimmer placeholders match section layouts. Blur-up technique for images (LQIP → full image fade-in). Partial failures isolated per section. For SSG builds, no loading states needed (all data at build time). Max skeleton duration: 800ms.

- **Q:** Historical content sourcing workflow for Phase 4?
- **A:** Hybrid approach (Option C). Kim drafts initial content using local knowledge and authentic Appalachian voice. Professional historian consultant reviews/fact-checks for accuracy, especially for complex battles and contested narratives. This balances Kim's authentic local perspective with historical rigor. Contested narratives presented with multiple perspectives noted (e.g., "Union sources report..., while Confederate accounts describe...").

- **Q:** Accessibility beyond WCAG 2.1 AA - audio descriptions, virtual tours?
- **A:** Defer to Phase 5 (Option D). Focus Phase 3 on achieving perfect WCAG 2.1 AA compliance (Lighthouse 100 Accessibility score). Gather user feedback post-launch to identify which AAA enhancements provide most value. Candidates for Phase 5: audio timeline narration, screen reader virtual tours with detailed exhibit descriptions. This prevents scope creep and ensures solid AA foundation first.

---

## References

### Research Documentation

- **Appalachian Aesthetic Research:** `docs/spec-19-appalachian-aesthetic-research.md`
  - Moonshining heritage visual language (copper patina, rivets)
  - Coal mining town architecture (utilitarian, asymmetric)
  - CCC Park Rustic philosophy (native materials, stone-carved)
  - Typography additions: Roboto Slab, Oswald

- **Historic Site Design Patterns:** `docs/research-historic-site-design-patterns.md`
  - Daniel Lady Farm (restraint, darkened overlays)
  - Museum of Appalachia (living memory, humanity-centered)
  - American Battlefield Trust (named individuals, animated maps)

- **Architecture Specification:** `docs/spec-19-architecture-appalachian.md`
  - Section-by-section design decisions
  - Custom CSS for borders/textures
  - Responsive strategy, accessibility compliance

### Related Specs

- **SPEC-17 (Backcountry):** Trail difficulty color standards, industry safety colors
- **SPEC-18 (State Parks):** Geographic proximity patterns, quarterly review process, hybrid image strategy

### External Resources

- [Museum of Appalachia](https://www.museumofappalachia.org/)
- [National Coal Heritage Area](https://coalheritage.wv.gov/)
- [CCC Legacy Projects](https://www.ccclegacy.org/)
- [Appalachian Trail Conservancy](https://appalachiantrail.org/)

---

**Next Steps After Approval:**
1. `/speckit.plan` - Break down into implementation tasks
2. Create feature branch: `feature/spec-19-historic-template`
3. Extend Tailwind config with heritage colors
4. Build section components incrementally
5. Test with real Carnifex Ferry content
