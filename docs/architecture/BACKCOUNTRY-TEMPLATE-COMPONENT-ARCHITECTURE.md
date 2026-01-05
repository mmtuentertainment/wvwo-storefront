# Backcountry Template Component Architecture

## SPEC-17: BackcountryTemplate.astro (~500-550 lines)

**Status**: Draft
**Created**: 2025-12-31
**Author**: SPARC Architecture Agent

---

## 1. Component Hierarchy

```
BackcountryTemplate.astro (~500-550 lines)
├── Hero Section (~65 lines)
│   ├── Hero Image with Dark Overlay
│   ├── Title, Location, County
│   ├── Quick Stats Grid (acreage, remoteness, cell coverage)
│   └── Quick Highlights Badges
│
├── Description Prose (~15 lines)
│
├── Navigation & Cell Coverage (~55 lines)
│   ├── USGS Quads List
│   ├── Cell Coverage Warning Badge (prominent)
│   ├── Compass Declination
│   └── Offline Map Link
│
├── Wilderness Areas (~70 lines)
│   └── WildernessAreaCard (difficulty badge, terrain, highlights)
│
├── Camping & Water Sources (~80 lines)
│   ├── Camping Regulations
│   ├── Permitted Sites
│   └── WaterSourceCard (AMD warnings - P0 CRITICAL)
│
├── Trail System (~60 lines)
│   └── BackcountryTrailCard (difficulty badge, distance, elevation)
│
├── Required Skills & Gear (~80 lines)
│   ├── Navigation Skills List
│   ├── Survival Skills List
│   ├── First Aid Skills List
│   └── Gear Categories Grid
│
├── Safety & Hazards (~100 lines)
│   ├── Emergency Contacts (multi-tier)
│   ├── Weather Hazards (with peak months)
│   └── Wildlife Hazards (with disease vectors)
│
├── Leave No Trace (~45 lines)
│   └── LNT Principle Cards
│
├── Access Points (~50 lines)
│   └── AccessPointCard (facilities, seasonal access)
│
├── Seasonal Conditions (~40 lines)
│   └── SeasonCard (best for, challenges)
│
├── Accessibility (~55 lines)
│   ├── Mobility Rating Badge
│   ├── Physical Requirements
│   ├── Trail Accessibility List
│   └── Service Animal Policy
│
├── [SHARED] AdventureGearChecklist (~15 lines)
├── [SHARED] AdventureRelatedShop (~15 lines - conditional)
├── [SHARED] AdventureCTA (~10 lines)
└── Third-Party Disclaimer Footer (~15 lines)
```

---

## 2. Main Template Props Interface

```typescript
// From BackcountryTemplatePropsSchema in backcountry-types.ts
interface BackcountryTemplateProps {
  // Hero Section (Required)
  name: string;
  heroImage: string;
  imageAlt: string;
  acreage: number;
  designation: string;
  location: string;
  county: string;
  remoteness: string;
  quickHighlights: string[];
  description: string;
  stats?: StatItem[];

  // Navigation Data (P1 - Required)
  navigation: Navigation;

  // Wilderness Areas
  wildernessAreas: WildernessArea[];

  // Camping & Water
  camping: {
    regulations: string[];
    permittedSites: string;
    restrictions: string[];
  };
  waterSources: WaterSource[];

  // Trails
  trails: BackcountryTrail[];

  // Skills & Gear
  requiredSkills: RequiredSkills;
  requiredGear: GearCategory[];

  // Safety (P0/P1)
  weatherHazards: WeatherHazard[];
  wildlifeHazards: WildlifeHazard[];
  emergencyContacts: EmergencyContact[];

  // Leave No Trace
  leaveNoTrace: LeaveNoTracePrinciple[];

  // Access & Regulations (P2)
  accessPoints: AccessPoint[];
  regulations: Regulations;

  // Seasonal Conditions
  seasonalConditions: SeasonalConditions[];

  // Accessibility (P1)
  accessibility: BackcountryAccessibility;

  // Shared Components
  gearList?: GearItem[];
  relatedShop?: RelatedCategory[];
  nearbyAttractions?: NearbyAttraction[];

  // Optional Metadata
  mapUrl?: string;
  websiteUrl?: string;
}
```

---

## 3. Sub-Components (with Line Estimates)

### 3.1 Inline Template Sections (No Separate Files)

Following the CaveTemplate and SkiTemplate patterns, these sections are rendered inline within BackcountryTemplate.astro:

| Section | Lines | Purpose |
|---------|-------|---------|
| Hero Section | ~65 | Full-bleed hero with name, stats grid, cell coverage warning |
| Description Prose | ~15 | Full description text |
| Navigation & Cell Coverage | ~55 | USGS quads, declination, cell coverage (prominent warning) |
| Wilderness Areas | ~70 | Grid of named wilderness zones with difficulty badges |
| Camping & Water Sources | ~80 | Camping regs + water source cards with AMD warnings |
| Trail System | ~60 | Trail cards with industry-standard difficulty colors |
| Required Skills & Gear | ~80 | Skills categories + gear category lists |
| Safety & Hazards | ~100 | Emergency contacts, weather hazards, wildlife hazards |
| Leave No Trace | ~45 | 7 LNT principles with guidelines |
| Access Points | ~50 | Trailhead cards with facilities |
| Seasonal Conditions | ~40 | Season cards with best-for/challenges |
| Accessibility | ~55 | Mobility rating, requirements, service animal policy |
| Third-Party Disclaimer | ~15 | Footer disclaimer for external managing agencies |

**Inline Section Total: ~730 lines** (trimmed to ~470 with shared components)

### 3.2 Shared Components (Existing - Reuse)

| Component | Import | Purpose |
|-----------|--------|---------|
| `AdventureGearChecklist.astro` | `../adventure/AdventureGearChecklist.astro` | Displays gear items with required/optional indicators |
| `AdventureRelatedShop.astro` | `../adventure/AdventureRelatedShop.astro` | Shop category cards with CTA |
| `AdventureCTA.astro` | `../adventure/AdventureCTA.astro` | Dual-button CTA section |

### 3.3 Potential New Shared Components (Optional Future Extraction)

These patterns repeat across CaveTemplate, SkiTemplate, and BackcountryTemplate. Consider extracting if pattern stabilizes:

| Potential Component | Lines Saved | Rationale |
|---------------------|-------------|-----------|
| `EmergencyContactsSection.astro` | ~40 | Multi-tier emergency contacts used in backcountry, cave rescue, ski patrol |
| `SafetyHazardsGrid.astro` | ~50 | Weather/wildlife hazard cards with probability badges |
| `DifficultyBadge.astro` | ~15 | Industry-standard difficulty badge with shape + color |
| `SeasonalConditionsSection.astro` | ~35 | Season cards with best-for/challenges arrays |

**Note**: For SPEC-17, implement inline first. Extract only after third template uses same pattern.

---

## 4. Shared Components to Reuse

### 4.1 From `components/adventure/`

```typescript
// REQUIRED IMPORTS for BackcountryTemplate.astro
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
```

**AdventureGearChecklist** (SPEC-11)

- Props: `{ items: GearItem[], title?: string, columns?: 1|2|3, variant?: 'white'|'cream' }`
- Use for: `gearList` array from props
- WVWO Compliant: Yes (rounded-sm, brand colors)

**AdventureRelatedShop** (SPEC-11)

- Props: `{ categories: RelatedCategory[], title?: string, intro?: string }`
- Use for: `relatedShop` array from props (conditional render if length > 0)
- WVWO Compliant: Yes (rounded-sm, border-l-4 accents)

**AdventureCTA** (SPEC-12)

- Props: `{ heading, description, primaryText, primaryHref, secondaryText, secondaryHref, variant }`
- Use for: Bottom CTA directing to shop/contact
- WVWO Compliant: Yes (sign-green/brand-brown variants, rounded-sm)

### 4.2 Type Imports from `types/`

```typescript
// Type imports for BackcountryTemplate.astro
import type {
  BackcountryTemplateProps,
  WaterSource,
  WildernessArea,
  BackcountryTrail,
  WeatherHazard,
  WildlifeHazard,
  EmergencyContact,
  LeaveNoTracePrinciple,
  AccessPoint,
  SeasonalConditions,
  BackcountryAccessibility,
  Navigation,
  Regulations,
  RequiredSkills,
  GearCategory,
} from '../../types/backcountry-types';

import {
  getWaterSourceStatusColor,
  getWaterSourceStatusLabel,
  getDangerLevelColor,
  getManagingAgencyLabel,
  formatPeakMonths,
  WATER_SOURCE_STATUS_COLORS,
  EMERGENCY_TIER_COLORS,
  MONTH_NAMES,
} from '../../types/backcountry-types';

import {
  DIFFICULTY_COLORS,
  DIFFICULTY_SHAPES,
  DIFFICULTY_LABELS,
} from '../../types/adventure';
```

---

## 5. New Components Needed

### 5.1 No New Shared Components Required

Following CaveTemplate and SkiTemplate patterns, all sections are rendered inline within the main template. This approach:

1. **Reduces complexity** - Single file to maintain
2. **Improves discoverability** - All template code in one place
3. **Matches existing patterns** - Consistent with CaveTemplate (917 lines) and SkiTemplate (774 lines)
4. **Enables future extraction** - If patterns stabilize, extract later

### 5.2 Helper Functions (Inline in Template Frontmatter)

```typescript
// In BackcountryTemplate.astro frontmatter

/**
 * Get border color class for emergency contact tier.
 */
function getEmergencyBorderColor(tier: EmergencyTier): string {
  return EMERGENCY_TIER_COLORS[tier];
}

/**
 * Get difficulty badge color and shape for trails.
 */
function getTrailDifficultyBadge(difficulty: Difficulty): {
  color: string;
  shape: string;
  label: string;
} {
  return {
    color: DIFFICULTY_COLORS[difficulty],
    shape: DIFFICULTY_SHAPES[difficulty],
    label: DIFFICULTY_LABELS[difficulty],
  };
}

/**
 * Check if a link is external.
 */
function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}
```

---

## 6. Section-by-Section Implementation Notes

### 6.1 Hero Section (~65 lines)

**Pattern**: Match CaveTemplate/SkiTemplate hero structure

```astro
<section class="relative h-[70vh] min-h-[500px] overflow-hidden">
  <!-- Hero Image -->
  <img src={heroImage} alt={imageAlt} class="absolute inset-0 w-full h-full object-cover" loading="eager" />

  <!-- Dark Overlay -->
  <div class="absolute inset-0 bg-brand-brown/50"></div>

  <!-- Content -->
  <div class="relative h-full container mx-auto px-4">
    <div class="h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{name}</h1>
      <p class="font-body text-lg text-brand-cream mb-4">{location} - {county} County</p>

      <!-- Stats Grid (acreage, remoteness, cell coverage) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-xl">
        <!-- Cell coverage gets ORANGE border for visibility -->
        <div class="bg-white/95 p-4 rounded-sm text-center border-l-4 border-brand-orange">
          <p class="font-display text-lg font-bold text-brand-brown">{navigation.cellCoverage}</p>
          <p class="font-body text-xs text-brand-mud uppercase">Cell Service</p>
        </div>
        <!-- ... other stats -->
      </div>

      <!-- Quick Highlights Badges -->
      <div class="flex flex-wrap gap-2">
        {quickHighlights.map((h) => (
          <span class="bg-sign-green text-white px-3 py-1 rounded-sm font-body text-sm">{h}</span>
        ))}
      </div>
    </div>
  </div>
</section>
```

### 6.2 Water Sources Section - AMD Warnings (P0 CRITICAL)

**Critical Safety Feature**: AMD contamination warnings must be prominently displayed.

```astro
{waterSources.map((source) => (
  <div class={`p-4 rounded-sm border-l-4 ${getWaterSourceStatusColor(source.status)}`}>
    <div class="flex justify-between items-start mb-2">
      <h4 class="font-display font-bold text-brand-brown">{source.name}</h4>
      <span class={`px-2 py-1 rounded-sm text-xs font-bold ${
        source.status === 'do-not-use' ? 'bg-brand-orange text-white' : 'bg-brand-cream text-brand-brown'
      }`}>
        {getWaterSourceStatusLabel(source.status)}
      </span>
    </div>

    {source.status === 'do-not-use' && source.contamination === 'amd' && (
      <aside class="mt-3 p-3 bg-brand-orange/10 rounded-sm" role="alert">
        <p class="font-hand text-sm text-brand-brown">
          "That orange water ain't rust - it's acid mine drainage. Don't drink it, don't filter it, find another source." - Kim
        </p>
      </aside>
    )}
  </div>
))}
```

### 6.3 Emergency Contacts - Multi-Tier (P1)

```astro
<section class="py-16 bg-brand-cream border-l-4 border-brand-orange">
  <h2 class="font-display text-3xl font-bold text-brand-brown mb-8">Emergency Contacts</h2>

  <div class="grid md:grid-cols-2 gap-4">
    {emergencyContacts.map((contact) => (
      <div class={`p-4 rounded-sm border-l-4 ${getEmergencyBorderColor(contact.tier)}`}>
        <p class="font-body text-xs text-brand-mud uppercase mb-1">{contact.tier.toUpperCase()}</p>
        <h4 class="font-display font-bold text-brand-brown">{contact.name}</h4>
        <a href={`tel:${contact.phone}`} class="font-display text-xl font-bold text-brand-orange hover:underline">
          {contact.phone}
        </a>
        {contact.coverage && <p class="font-body text-sm text-brand-mud mt-1">{contact.coverage}</p>}
        {contact.responseTime && <p class="font-body text-xs text-brand-mud">{contact.responseTime}</p>}
      </div>
    ))}
  </div>
</section>
```

### 6.4 Trail Difficulty Badges - Industry Colors

```astro
{trails.map((trail) => {
  const badge = getTrailDifficultyBadge(trail.difficulty);
  return (
    <div class="p-6 rounded-sm border-l-4 border-sign-green bg-white">
      <div class="flex justify-between items-start mb-3">
        <h4 class="font-display font-bold text-brand-brown">{trail.name}</h4>
        <span class={`${badge.color} px-2 py-1 rounded-sm font-body text-sm flex items-center gap-1`}>
          <span aria-hidden="true">{badge.shape}</span>
          {badge.label}
        </span>
      </div>
      <!-- distance, elevation, highlights -->
    </div>
  );
})}
```

---

## 7. WVWO Aesthetic Compliance Checklist

### 7.1 Required (MUST Use)

- [x] `rounded-sm` ONLY - enforced throughout
- [x] `font-display` (Bitter) for headings
- [x] `font-hand` (Permanent Marker) for Kim's notes ONLY
- [x] `font-body` (Noto Sans) for body text
- [x] `border-l-4` accents (sign-green for wilderness, brand-orange for safety)
- [x] Industry-standard difficulty colors (green/blue/red/black)
- [x] Shape icons for colorblind accessibility

### 7.2 Forbidden (NEVER Use)

- [ ] Inter, Poppins, DM Sans, or other startup fonts
- [ ] `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-3xl`
- [ ] Purple, pink, neon colors
- [ ] Glassmorphism, backdrop-blur
- [ ] Marketing buzzwords in copy

### 7.3 Color Exceptions (Industry Safety Standards)

Per CLAUDE.md, these industry-standard colors OVERRIDE brand palette:

| Context | Colors |
|---------|--------|
| Trail Difficulty | Green (easy), Blue (moderate), Red (challenging), Black (rugged) |
| Emergency/Danger | Red-700, Brand-Orange for visibility |
| Water Status (do-not-use) | Brand-Orange for high visibility warning |

---

## 8. Line Count Estimate

| Section | Lines |
|---------|-------|
| Frontmatter (imports, props, helpers) | ~50 |
| Hero Section | ~65 |
| Description Prose | ~15 |
| Navigation & Cell Coverage | ~55 |
| Wilderness Areas | ~70 |
| Camping & Water Sources | ~80 |
| Trail System | ~60 |
| Required Skills & Gear | ~80 |
| Safety & Hazards | ~100 |
| Leave No Trace | ~45 |
| Access Points | ~50 |
| Seasonal Conditions | ~40 |
| Accessibility | ~55 |
| Shared Component Calls | ~40 |
| Third-Party Disclaimer | ~15 |
| Style Block | ~10 |
| **TOTAL** | **~830** |

### 8.1 Line Reduction Strategies

To meet 500-550 target:

1. **Combine similar sections** (~100 lines saved)
   - Merge "Navigation & Cell Coverage" into Hero stats
   - Combine "Access Points" with "Navigation"

2. **Use shared components more** (~80 lines saved)
   - Use AdventureGearChecklist for requiredGear
   - Condense skills into simpler list format

3. **Reduce repetition** (~50 lines saved)
   - Create reusable card patterns
   - Simplify conditional renders

4. **Tighten formatting** (~50 lines saved)
   - Reduce whitespace
   - Combine single-line elements

**Revised Estimate: ~550 lines** (within target)

---

## 9. File Location

```
wv-wild-web/src/components/templates/BackcountryTemplate.astro
```

---

## 10. Related Files

| File | Purpose |
|------|---------|
| `types/backcountry-types.ts` | Zod schemas and TypeScript types |
| `types/adventure.ts` | Shared types (Difficulty, Coordinates, GearItem) |
| `components/adventure/AdventureGearChecklist.astro` | Gear list component |
| `components/adventure/AdventureRelatedShop.astro` | Shop categories component |
| `components/adventure/AdventureCTA.astro` | CTA section component |

---

## 11. Testing Strategy

Test file: `wv-wild-web/src/components/templates/__tests__/BackcountryTemplate.test.ts`

### 11.1 Unit Tests

1. **Props Validation** - All required props render without errors
2. **AMD Warning Display** - `do-not-use` water sources show warning
3. **Difficulty Colors** - Industry-standard colors applied correctly
4. **Emergency Contacts** - Multi-tier rendering with correct colors
5. **Empty State Handling** - Safety-critical sections show warnings when empty

### 11.2 Accessibility Tests

1. **WCAG 2.1 AA** - Color contrast ratios
2. **Screen Reader** - aria-labels on all sections
3. **Keyboard Navigation** - All interactive elements focusable
4. **Colorblind** - Shape icons accompany all color-coded elements

### 11.3 Visual Regression

1. **WVWO Compliance** - No forbidden fonts, colors, or border-radius
2. **Mobile Responsiveness** - Grid layouts collapse correctly
3. **Hero Section** - Full-bleed with proper overlay

---

## Appendix A: Empty State Warnings

Per SPEC-17, safety-critical arrays display warnings when empty:

```astro
{waterSources.length === 0 && (
  <div class="border-l-4 border-l-brand-orange bg-brand-orange/10 p-4 rounded-sm">
    <p class="font-bold text-brand-brown">Water Source Data Unavailable</p>
    <p class="font-hand text-sm text-brand-brown/80 mt-2">
      "We don't have documented water sources for this area yet.
      Before you head out, check with the Forest Service or pack in all the water you'll need.
      Better to carry extra than come up short." - Kim
    </p>
  </div>
)}
```

Safety-critical sections requiring warnings:

- `waterSources` - "Pack all water needed"
- `emergencyContacts` - "Contact local ranger district"
- `weatherHazards` - "Check NOAA conditions"
- `trails` - "Navigate with map/compass"

---

## Appendix B: Kim's Voice Examples

Per WVWO aesthetics, Kim's voice is direct, humble, and practical:

| Section | Kim's Voice Example |
|---------|---------------------|
| AMD Water | "That orange water ain't rust - it's acid mine drainage. Don't drink it, don't filter it, find another source." |
| Emergency | "Write these numbers down before you lose signal. Your phone won't help you 10 miles from the road." |
| Gear | "Stop by the shop before you head out - we'll make sure you're prepared." |
| Weather | "WV weather changes fast. What starts sunny can turn to freezing rain in an hour." |
