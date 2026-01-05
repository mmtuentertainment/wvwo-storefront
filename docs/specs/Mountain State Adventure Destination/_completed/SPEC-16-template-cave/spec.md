# Feature: Cave Template Component

**Version:** 1.0.0
**Created:** 2025-12-30
**Status:** Draft
**SPEC-ID:** SPEC-16

## Overview

Create a reusable `CaveTemplate.astro` component (~475 lines) for displaying West Virginia cave and cavern destination pages. The template focuses on tour information, geological formations, temperature/accessibility details, and visitor safety - serving as the foundation for cave destination pages (SPEC-36 Seneca Caverns, SPEC-37 Smoke Hole Caverns, SPEC-49 Lost World Caverns).

## Problem Statement

WV Wild Outdoors needs cave destination pages to support the Mountain State Adventure Destination initiative. Currently:

- No template exists for cave/cavern content
- Cave tourism represents a weather-independent attraction (constant 54-56°F year-round)
- Three major WV caves need destination pages: Seneca Caverns, Smoke Hole Caverns, Lost World Caverns
- Cave content requires unique sections not present in existing templates (formations, accessibility, safety)

## Goals

- Create a cave-specific template following established patterns from SkiTemplate, LakeTemplate, RiverTemplate
- Support educational content about geological formations with accessible language
- Provide clear accessibility and physical requirements information (ADA-relevant)
- Enable external booking integration with appropriate third-party disclaimers
- Maintain WVWO aesthetic (rounded-sm, brand colors, Kim's authentic voice)

## Non-Goals (Out of Scope)

- Not creating actual cave destination pages (handled by SPEC-36, 37, 49)
- Not implementing wild cave tour booking functionality
- Not creating cave-specific SEO components (use existing adventure SEO patterns)
- Not integrating real-time cave availability systems

## User Stories

### As a Highway Hunter (I-79/US-19 traveler)

- I want to see cave tour options with clear duration, difficulty, and pricing
- So that I can plan a cave visit as part of my WV outdoor trip

### As a Family Planner

- I want to understand physical requirements and accessibility limitations upfront
- So that I can determine if the cave tour is suitable for my family members

### As an Education-Focused Visitor

- I want to learn about geological formations and cave history
- So that I can appreciate the science and history during my visit

### As Kim (Store Owner)

- I want to recommend nearby caves to customers seeking rainy-day activities
- So that I can provide value and build relationships with visitors

## Functional Requirements

### Core Requirements

1. **Hero Section**
   - Display cave name, depth (feet), discovery year, location
   - Quick stats grid (2-4 items)
   - Quick highlights badges (bg-sign-green)
   - Hero image with brand-brown overlay

2. **Tour Information Section**
   - Support multiple tour types per cave
   - Display: name, duration, difficulty, distance, group size, highlights
   - Difficulty color coding: Easy (green), Moderate (brown), Strenuous (orange), Wild (red)
   - External booking CTA with third-party disclaimer

3. **Formations Section**
   - Grid layout (3-col desktop, 2-col tablet, 1-col mobile)
   - Formation cards with: name, type, description, age estimate, fun fact
   - Type taxonomy: stalactite, stalagmite, column, flowstone, soda_straw, drapery, helictite, rimstone_pool, cave_coral, cave_ribbon, fossil, underground_pool, large_chamber
   - Fun facts in font-hand (Kim's touch)

4. **Conditions Section**
   - Temperature and humidity display
   - What to wear checklist (checkmarks)
   - What to bring checklist (bullets)

5. **Accessibility Section** (CRITICAL - orange accents for visibility)
   - Physical requirements list
   - Limitations list (wheelchair, claustrophobia, etc.)
   - Accommodations available
   - Medical disclaimer text

6. **Pricing & Hours Section**
   - Two-column layout (pricing | hours)
   - Seasonal hours support
   - External pricing disclaimer (link to official site)

7. **Safety Section** (orange accents)
   - Rules list (bullet points)
   - Prohibited items list (X icons)
   - Emergency contact

8. **History Section**
   - Discovery story prose
   - Geological age context
   - Notable events (optional)
   - Local legends (optional, italicized)

9. **Shared Components Integration**
   - AdventureGearChecklist (columns={2})
   - AdventureRelatedShop
   - AdventureCTA (custom cave-specific props)

### Edge Cases

- **No tours defined**: Hide tours section, show "Contact for tour information"
- **No formations**: Hide formations section (valid for minimal cave pages)
- **Missing discovery year**: Omit from stats grid
- **No booking URL**: Hide booking CTA, show phone contact instead
- **Empty accommodations**: Hide accommodations subsection

## Non-Functional Requirements

### Performance

- Template renders in < 100ms server-side
- Images use loading="lazy" for below-fold content
- Hero image uses loading="eager"

### Accessibility

- All sections have aria-labelledby with unique IDs
- Color contrast meets WCAG AA (4.5:1 minimum)
- Orange badges use brown text (not white) for contrast
- Focus states visible on all interactive elements
- Motion-safe/motion-reduce supported

### Security

- External links use rel="noopener noreferrer"
- No user input accepted (static template)
- Third-party disclaimers clearly displayed

## Data Model

### CaveTemplateProps Interface

```typescript
interface CaveTemplateProps {
  // Hero (required)
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: StatItem[];

  // Metadata (required)
  location: string;
  county: string;
  depth: number;
  temperature: string;
  discoveryYear?: number;
  quickHighlights: string[];

  // Content sections
  tours: CaveTour[];
  formations: CaveFormation[];
  conditions: CaveConditions;
  accessibility: CaveAccessibility;
  pricing: CavePricing[];
  hours: CaveHours[];
  safety: CaveSafety;
  history: CaveHistory;

  // Shared components
  gearList: GearItem[];
  relatedShop: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional
  coordinates?: Coordinates;
  bookingUrl?: string;
  websiteUrl?: string;
  mapUrl?: string;
}
```

### Key Sub-Types

```typescript
interface CaveTour {
  name: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'strenuous' | 'wild_cave';
  distance?: string;
  stairs?: number;
  groupSize?: string;
  highlights: string[];
  seasonalNotes?: string;
  ageMinimum?: number;
  reservationRequired?: boolean;
}

interface CaveFormation {
  name: string;
  type: FormationType;
  typeDisplay: string;
  description: string;
  ageEstimate?: string;
  dimensions?: string;
  funFact?: string;      // Educational neutral voice: "Takes 100 years to grow 1 inch"
  highlight?: boolean;
  kimNote?: string;      // Kim's personal voice: "This one's my favorite..."
}

interface CaveAccessibility {
  physicalRequirements: string[];
  limitations: string[];
  accommodations?: string[];
  medicalDisclaimer?: string;
  adaStatement?: string;
  waiverRequired?: boolean;
}

interface CaveSafety {
  rules: string[];
  prohibited: string[];
  emergencyContact?: string;
}
```

## API/Interface Design

### Component Usage

```astro
---
import CaveTemplate from '../components/templates/CaveTemplate.astro';
import { senecaCavernsData } from '../data/caves/seneca-caverns';
---

<CaveTemplate {...senecaCavernsData} />
```

### Props Validation

```typescript
// cave-types.ts exports Zod schemas
import { CaveTemplatePropsSchema } from '../types/cave-types';

const validated = CaveTemplatePropsSchema.parse(caveData);
```

## Dependencies

### Internal Dependencies

- `src/types/adventure.ts` - StatItem, GearItem, RelatedCategory, NearbyAttraction, Coordinates
- `src/components/adventure/AdventureGearChecklist.astro`
- `src/components/adventure/AdventureRelatedShop.astro`
- `src/components/adventure/AdventureCTA.astro`

### External Dependencies

- None (pure Astro/TypeScript component)

### Downstream Dependencies (will use this template)

- SPEC-36: Seneca Caverns destination page
- SPEC-37: Smoke Hole Caverns destination page
- SPEC-49: Lost World Caverns destination page

## Acceptance Criteria

### Template Structure

- [ ] ~475 lines (acceptable range: 450-500)
- [ ] All 8 required sections implemented
- [ ] TypeScript props interface complete with Zod validation
- [ ] Responsive grid layouts (mobile-first)

### WVWO Aesthetic Compliance

- [ ] `rounded-sm` ONLY enforced (no rounded-md/lg/xl)
- [ ] Border-left accents: sign-green (tours), brand-orange (accessibility/safety)
- [ ] Fun facts in font-hand
- [ ] Font usage: font-display (headings), font-body (content), font-hand (Kim's tips only)
- [ ] Colors from WVWO palette only

### Educational Focus

- [ ] Formations display with geological context
- [ ] Formation type taxonomy implemented
- [ ] Accessible language (no scientific jargon)
- [ ] Fun facts with educational hooks

### Accessibility Requirements

- [ ] Physical requirements clearly listed
- [ ] Limitations prominently displayed (orange accent)
- [ ] Accommodations section present
- [ ] Third-party booking disclaimer displayed

### Safety Information

- [ ] Rules section with bullet points
- [ ] Prohibited items with X icons
- [ ] Emergency contact displayed (if provided)
- [ ] Orange accent for visibility

### Integration

- [ ] AdventureGearChecklist renders correctly
- [ ] AdventureRelatedShop renders correctly
- [ ] AdventureCTA renders with cave-specific props
- [ ] External links have proper rel attributes

## Clarifications

### Session 2025-12-30

- Q: How should `funFact` and `kimNote` fields differ in voice and usage? → A: **funFact** = Educational facts in neutral voice ("Takes 100 years to grow 1 inch"). **kimNote** = Kim's personal tips in her voice ("This one's my favorite - reminds me of the icicles on grandpa's barn")

## Open Questions

1. **Resolved**: Should pricing link to external site or show inline prices?
   - **Decision**: Link to external site with disclaimer. Commercial caves are separate businesses.

2. **Resolved**: How to handle wild cave tours vs standard tours?
   - **Decision**: Use difficulty enum with 'wild_cave' level, show additional warnings.

3. **For future consideration**: Should we add a photo gallery section?
   - **Deferred**: Text-only for v1.0, consider for future enhancement.

## References

### Related SPECs

- SPEC-15: SkiTemplate (reference pattern, 774 lines)
- SPEC-36: Seneca Caverns destination (will use this template)
- SPEC-37: Smoke Hole Caverns destination (will use this template)
- SPEC-49: Lost World Caverns destination (will use this template)

### Research Sources (completed)

- Seneca Caverns website analysis (165ft depth, 54°F, ~250 stairs, Mirror Lake)
- Smoke Hole Caverns features (Cave Ribbon, coral reef fossils, easier tour)
- Lost World Caverns features (War Club stalactite, self-guided, wild cave option)
- Cave tour UX best practices (section hierarchy, accessibility prominence)
- Geological formation taxonomy (12 formation types identified)
- Cave accessibility patterns (physicalRequirements[], limitations[], accommodations[])
- Cave safety guidelines (rules[], prohibited[], emergencyContact)

### Existing Templates (reference)

- `wv-wild-web/src/components/templates/SkiTemplate.astro`
- `wv-wild-web/src/components/templates/LakeTemplate.astro`
- `wv-wild-web/src/components/templates/RiverTemplate.astro`
- `wv-wild-web/src/types/ski-types.ts`

---

## Constitutional Compliance Check

| Principle | Status | Notes |
|-----------|--------|-------|
| Mountain State Adventure Destination | ✅ Pass | Supports cave tourism as weather-independent attraction |
| Authentic Voice | ✅ Pass | Kim's voice for fun facts, no AI slop |
| Owner-First Simplicity | ✅ Pass | Template-based, easy to maintain |
| Mobile First | ✅ Pass | Responsive grids, mobile-first breakpoints |
| Quality Over Speed | ✅ Pass | Complete spec, no TODOs |
| Tech Stack | ✅ Pass | Astro + TypeScript + Tailwind |
| WVWO Aesthetic | ✅ Pass | Brand colors, rounded-sm, proper fonts |
