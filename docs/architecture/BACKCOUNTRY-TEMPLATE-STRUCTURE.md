# Template Structure Architecture: BackcountryTemplate.astro

```yaml
spec: SPEC-17
created: 2025-12-31
status: Architecture Draft
target: wv-wild-web/src/components/templates/BackcountryTemplate.astro
target_lines: 500-550
reference_templates:
  - CaveTemplate.astro (917 lines, 13 sections)
  - SkiTemplate.astro (774 lines, 15 sections)
```

---

## Section Flow

The BackcountryTemplate follows a logical user journey from discovery to trip planning, with safety-critical information prominently placed early.

### Ordered Section List with Transitions

| Order | Section | Target Lines | Purpose | Transition From Previous |
|-------|---------|--------------|---------|-------------------------|
| 1 | **Hero** | ~60 | Identity, location, cell coverage warning, quick stats | Entry point |
| 2 | **Wilderness Areas** | ~80 | Named zones with difficulty, terrain, access | Hero reveals exploration options |
| 3 | **Backcountry Camping** | ~60 | Regulations, permitted sites, water sources (AMD warnings) | Where to stay after choosing area |
| 4 | **Trail System** | ~70 | Trails with industry difficulty colors, distance, elevation | How to navigate the area |
| 5 | **Required Skills & Gear** | ~80 | Navigation, survival, first aid skills; categorized gear | What you need before heading out |
| 6 | **Safety & Hazards** | ~100 | Weather hazards, wildlife with disease vectors, emergency contacts | Critical info before departure |
| 7 | **Leave No Trace** | ~50 | 7 principles with implementation guidelines | Responsible recreation context |
| 8 | **Access Points** | ~50 | Trailheads with facilities, seasonal access, cell coverage | How to get there |
| 9 | **Seasonal Considerations** | ~50 | Best times, conditions, challenges by season | When to visit |

**Total Target: ~600 lines** (including imports, helpers, styles)

---

## Layout Patterns

### Desktop vs Mobile Grid Breakdown

| Section | Desktop Layout | Mobile Layout | Tailwind Pattern |
|---------|---------------|---------------|------------------|
| **Hero** | Full-width image, stats grid 2x2 in corner | Stacked, stats 2x2 | `h-[70vh] min-h-[500px]`, `grid-cols-2 md:grid-cols-4` |
| **Wilderness Areas** | 2-col card grid | Single column stack | `md:grid-cols-2` |
| **Camping** | 2-col: regulations + water sources | Stacked sections | `md:grid-cols-2 gap-8` |
| **Trail System** | 3-col card grid | Single column | `lg:grid-cols-3 md:grid-cols-2` |
| **Skills & Gear** | 2-col: skills left, gear categories right | Stacked sections | `md:grid-cols-2 gap-8` |
| **Safety & Hazards** | Full-width with nested 2-col for hazards | Single column | `max-w-4xl mx-auto` |
| **Leave No Trace** | Accordion or stacked cards | Same | Single column, `max-w-3xl mx-auto` |
| **Access Points** | 3-col card grid | Single column | `lg:grid-cols-3 md:grid-cols-2` |
| **Seasonal Conditions** | 4-col for seasons, 2-col for details | 2-col, then stack | `md:grid-cols-2 lg:grid-cols-4` |

### Common Layout Patterns from CaveTemplate/SkiTemplate

```astro
<!-- Container Pattern (consistent across sections) -->
<section class="py-16 bg-white" aria-labelledby="section-heading">
  <div class="container mx-auto px-4">
    <h2 id="section-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Section Title
    </h2>
    <div class="max-w-5xl mx-auto">
      <!-- Content -->
    </div>
  </div>
</section>

<!-- Card Pattern (border-left accent) -->
<div class="bg-brand-cream p-6 rounded-sm border-l-4 border-sign-green">
  <!-- Card content -->
</div>

<!-- Warning Card Pattern (safety-critical) -->
<div class="bg-brand-orange/10 p-6 rounded-sm border-l-4 border-brand-orange">
  <!-- Warning content -->
</div>
```

---

## Conditional Rendering Rules

### Decision Tree for Empty State Handling

```
                       Is Array Empty?
                            |
              +-------------+-------------+
              |                           |
             YES                          NO
              |                           |
    Is Safety-Critical?            Render Section
              |                     Normally
    +---------+---------+
    |                   |
   YES                  NO
    |                   |
 Show Warning         Hide Section
 with Kim's Voice     Completely
```

### Safety-Critical Arrays (Show Warning When Empty)

Per SPEC-17 Section 8, these arrays require warning messages when empty:

| Array | Warning Message (Kim's Voice) | Visual Treatment |
|-------|------------------------------|------------------|
| `waterSources` | "We don't have documented water sources for this area yet. Before you head out, check with the Forest Service or pack in all the water you'll need. Better to carry extra than come up short." | `border-l-brand-orange bg-brand-orange/10` |
| `emergencyContacts` | "We're still gathering emergency contact info for this area. Call your local ranger district before heading out - they can tell you who to call if something goes wrong." | `border-l-brand-orange bg-brand-orange/10` |
| `weatherHazards` | "Weather data for this area isn't documented yet. Check NOAA before your trip - WV mountain weather can turn on you fast." | `border-l-brand-orange bg-brand-orange/10` |
| `trails` | "No documented trails here - this is true wilderness. You'll need map, compass, and navigation skills. Not the place for your first backcountry trip." | `border-l-brand-orange bg-brand-orange/10` |

### Non-Critical Arrays (Hide When Empty)

| Array | Behavior |
|-------|----------|
| `nearbyAttractions` | Hide section entirely |
| `relatedShop` | Hide section entirely |
| `gearList` | Show minimal default checklist |
| `wildernessAreas` | Show single "General Area" card |
| `leaveNoTrace` | Show link to LNT.org instead |

### Implementation Pattern

```astro
<!-- Safety-Critical Empty State Pattern -->
{waterSources.length === 0 ? (
  <aside
    class="border-l-4 border-l-brand-orange bg-brand-orange/10 p-6 rounded-sm"
    role="alert"
    aria-label="Water source data unavailable"
  >
    <p class="font-display text-lg font-bold text-brand-brown mb-2">
      Water Source Data Unavailable
    </p>
    <p class="font-body text-brand-mud">
      "We don't have documented water sources for this area yet.
      Before you head out, check with the Forest Service or pack in all the water you'll need.
      Better to carry extra than come up short."
    </p>
    <p class="font-hand text-brand-mud mt-2">- Kim</p>
  </aside>
) : (
  <div class="grid md:grid-cols-2 gap-6">
    {waterSources.map((source) => (
      <WaterSourceCard source={source} />
    ))}
  </div>
)}

<!-- Non-Critical Hidden Pattern -->
{nearbyAttractions && nearbyAttractions.length > 0 && (
  <section class="py-16 bg-brand-cream" aria-labelledby="nearby-heading">
    <!-- Section content -->
  </section>
)}
```

---

## Accessibility Checklist

### Heading Hierarchy

- [ ] Single `<h1>` in Hero section (area name)
- [ ] Each section has `<h2>` with unique `id` for skip links
- [ ] Subsections use `<h3>` (e.g., "Navigation Skills" under "Required Skills")
- [ ] No skipped heading levels (h1 > h2 > h3, never h1 > h3)

### ARIA Labels

| Element | ARIA Requirement | Example |
|---------|------------------|---------|
| Hero section | `aria-label` | `aria-label="${name} hero section"` |
| Each main section | `aria-labelledby` | `aria-labelledby="trails-heading"` |
| Warning asides | `role="alert"` + `aria-label` | `role="alert" aria-label="Water source warning"` |
| Kim's notes | `role="note"` | `role="note"` |
| External links | `target="_blank" rel="noopener noreferrer"` | N/A |
| Emergency phone | Clickable `tel:` link | `href="tel:+13046361800"` |
| Difficulty badges | Screen reader text | `.sr-only` explanation |

### Skip Links Structure

```astro
<!-- Skip links at top of template (inside Layout) -->
<nav class="sr-only focus-within:not-sr-only" aria-label="Skip navigation">
  <ul class="fixed top-0 left-0 z-50 bg-brand-cream p-4">
    <li><a href="#main-content" class="text-sign-green">Skip to main content</a></li>
    <li><a href="#emergency-contacts" class="text-brand-orange">Skip to emergency contacts</a></li>
    <li><a href="#trails-section" class="text-sign-green">Skip to trails</a></li>
  </ul>
</nav>
```

### Color-Blind Accessibility for Difficulty Ratings

| Difficulty | Color | Shape | Pattern |
|------------|-------|-------|---------|
| Easy | Green (`sign-green`) | Circle (●) | `bg-sign-green text-white` |
| Moderate | Blue (`blue-700`) | Square (■) | `bg-blue-700 text-white` |
| Challenging | Red (`red-900`) | Triangle (▲) | `bg-red-900 text-white` |
| Rugged | Black | Diamond (◆) | `bg-black text-white` |

**Implementation:**

```astro
<span class={`${getDifficultyColor(trail.difficulty)} px-3 py-1 rounded-sm font-body text-sm font-bold`}>
  <span aria-hidden="true">{getDifficultyShape(trail.difficulty)}</span>
  <span class="ml-1">{getDifficultyLabel(trail.difficulty)}</span>
</span>
```

### Motion & Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .backcountry-template *,
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```astro
<!-- Button focus pattern -->
<a
  href={bookingUrl}
  class="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-sm font-body font-bold
         hover:bg-brand-orange/90
         motion-safe:transition-colors motion-reduce:transition-none
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
>
  View Official Website
</a>
```

---

## Section-by-Section Architecture

### Section 1: Hero (~60 lines)

**Purpose:** First impression, identity, critical safety stats (cell coverage)

**Layout:**

```
+------------------------------------------------------+
|  [Hero Image - full width, 70vh]                     |
|                                                       |
|  +------------------+                                 |
|  | Area Name (h1)   |                                 |
|  | Location | County|                                 |
|  | Designation      |                                 |
|  +------------------+                                 |
|                                                       |
|  +--------+ +--------+ +--------+ +--------+         |
|  | Acreage| | Cell   | | Miles  | | Elev   |         |
|  |        | | Coverage| | Remote | | Gain   |         |
|  +--------+ +--------+ +--------+ +--------+         |
|                                                       |
|  [Badge: Wilderness] [Badge: National Forest]         |
+------------------------------------------------------+
```

**Key Elements:**

- Cell coverage badge with warning icon if `none` or `spotty`
- Remoteness stat (miles from nearest road)
- Managing agency badge

### Section 2: Wilderness Areas (~80 lines)

**Purpose:** Named zones within the backcountry area

**Layout:**

```
+---------------------------+  +---------------------------+
| Zone Name         [Diff]  |  | Zone Name         [Diff]  |
| Acreage: 5,000 acres      |  | Acreage: 3,200 acres      |
| Terrain: Rocky ridges     |  | Terrain: Dense forest     |
| Access: From Rt 32        |  | Access: Bear Rocks TH     |
| Highlights:               |  | Highlights:               |
|   - Vista point           |  |   - Old growth hemlock    |
|   - Rock formations       |  |   - Creek crossings       |
+---------------------------+  +---------------------------+
```

**Conditional:** Hide if `wildernessAreas.length === 0`

### Section 3: Backcountry Camping (~60 lines)

**Purpose:** Camping rules and water source safety

**Layout:**

```
+---------------------------+  +---------------------------+
| Camping Regulations       |  | Water Sources             |
| +------------------------+|  | +-----------------------+ |
| | [rule 1]               ||  | | [Source] - SAFE       | |
| | [rule 2]               ||  | | Treat before drinking | |
| | [rule 3]               ||  | +-----------------------+ |
| +------------------------+|  | +-----------------------+ |
|                           |  | | [Source] - DO NOT USE | |
| Permitted Sites:          |  | | AMD Contamination!    | |
| [description]             |  | | Kim's warning...      | |
+---------------------------+  +-----------------------+--+
```

**Safety-Critical:** Show AMD warning for `do-not-use` water sources

### Section 4: Trail System (~70 lines)

**Purpose:** Trail information with industry-standard difficulty colors

**Layout:**

```
+----------------+  +----------------+  +----------------+
| Trail Name     |  | Trail Name     |  | Trail Name     |
| [●] Easy       |  | [■] Moderate   |  | [◆] Rugged     |
| 4.2 mi loop    |  | 8.1 mi out/bk  |  | 12 mi thru     |
| +1,200 ft      |  | +2,800 ft      |  | +4,500 ft      |
| Highlights:    |  | Highlights:    |  | Highlights:    |
|   - Waterfall  |  |   - Views      |  |   - Remote     |
+----------------+  +----------------+  +----------------+
```

**Colorblind Support:** Shape icons (●, ■, ▲, ◆) alongside colors

### Section 5: Required Skills & Gear (~80 lines)

**Purpose:** Self-sufficiency requirements

**Layout:**

```
+---------------------------+  +---------------------------+
| Required Skills           |  | Required Gear             |
| +------------------------+|  | +------------------------+|
| | Navigation:            ||  | | Ten Essentials:        ||
| |   - Map/compass        ||  | |   [ ] Map & compass    ||
| |   - GPS basics         ||  | |   [ ] First aid kit    ||
| +------------------------+|  | |   [ ] Headlamp         ||
| | Survival:              ||  | +------------------------+|
| |   - Fire starting      ||  | | Overnight:             ||
| |   - Shelter building   ||  | |   [ ] Tent/tarp        ||
| +------------------------+|  | |   [ ] Sleeping bag     ||
+---------------------------+  +---------------------------+
```

### Section 6: Safety & Hazards (~100 lines)

**Purpose:** Critical safety information

**Layout:**

```
+------------------------------------------------------+
| EMERGENCY CONTACTS (border-l-4 border-brand-orange)   |
| +--------------------------------------------------+ |
| | 911 - General Emergency                          | |
| | SAR - Randolph County Search & Rescue            | |
| | Ranger - Mon NF Ranger District                  | |
| +--------------------------------------------------+ |
+------------------------------------------------------+

+---------------------------+  +---------------------------+
| Weather Hazards           |  | Wildlife Hazards          |
| +------------------------+|  | +------------------------+|
| | Flash Floods           ||  | | Black Bear             ||
| | Peak: May-September    ||  | | Danger: Moderate       ||
| | Mitigation:            ||  | | Disease: None          ||
| |   - Check weather      ||  | | Avoidance tips...      ||
| +------------------------+|  | +------------------------+|
| | Hypothermia            ||  | | Timber Rattlesnake     ||
| | Peak: Nov-March        ||  | | Danger: High           ||
+---------------------------+  +---------------------------+
```

**Safety-Critical:** Show warning if any of these arrays are empty

### Section 7: Leave No Trace (~50 lines)

**Purpose:** Responsible recreation principles

**Layout:**

```
+------------------------------------------------------+
| 1. Plan Ahead and Prepare                             |
|    - Check conditions before departure                |
|    - Carry map/compass, know your route               |
+------------------------------------------------------+
| 2. Travel and Camp on Durable Surfaces                |
|    - Stay on established trails                       |
|    - Camp 200 feet from water sources                 |
+------------------------------------------------------+
| ... (7 principles total)                              |
+------------------------------------------------------+
```

### Section 8: Access Points (~50 lines)

**Purpose:** How to get to trailheads

**Layout:**

```
+----------------+  +----------------+  +----------------+
| Trailhead Name |  | Trailhead Name |  | Trailhead Name |
| Cell: None     |  | Cell: Ridge    |  | Cell: Moderate |
| Facilities:    |  | Facilities:    |  | Facilities:    |
|   - Parking    |  |   - Parking    |  |   - Parking    |
|   - Vault toilet|  |   - None      |  |   - Restrooms  |
| Permit: No     |  | Permit: Yes    |  | Permit: No     |
+----------------+  +----------------+  +----------------+
```

### Section 9: Seasonal Considerations (~50 lines)

**Purpose:** When to visit

**Layout:**

```
+----------+  +----------+  +----------+  +----------+
| Spring   |  | Summer   |  | Fall     |  | Winter   |
| Mar-May  |  | Jun-Aug  |  | Sep-Nov  |  | Dec-Feb  |
| Best For:|  | Best For:|  | Best For:|  | Best For:|
|  Flowers |  |  Hiking  |  |  Foliage |  |  Solitude|
| Challenges|  | Challenges|  | Challenges|  | Challenges|
|  Mud     |  |  Heat    |  |  Hunters |  |  Snow    |
+----------+  +----------+  +----------+  +----------+
```

---

## WVWO Aesthetic Compliance Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Fonts: Bitter (display) | `font-display` class on headings | [ ] |
| Fonts: Permanent Marker (hand) | `font-hand` on Kim's notes ONLY | [ ] |
| Fonts: Noto Sans (body) | `font-body` class on content | [ ] |
| Colors: brand-brown | Primary text, borders | [ ] |
| Colors: sign-green | Wilderness, trails, nature | [ ] |
| Colors: brand-cream | Backgrounds, cards | [ ] |
| Colors: brand-orange | CTAs, warnings (<5% screen) | [ ] |
| Borders: rounded-sm ONLY | No rounded-md/lg/xl | [ ] |
| Border accents: border-l-4 | All cards have left border | [ ] |
| Industry colors for difficulty | Green/Blue/Red/Black | [ ] |
| Shape icons for colorblind | ●, ■, ▲, ◆ | [ ] |
| No purple/pink/neon | Forbidden palette avoided | [ ] |
| No glassmorphism/blur | No backdrop-blur | [ ] |
| Kim's voice for warnings | Authentic rural WV tone | [ ] |

---

## Import Dependencies

```typescript
// Type imports
import type {
  BackcountryTemplateProps,
  WildernessArea,
  WaterSource,
  BackcountryTrail,
  WeatherHazard,
  WildlifeHazard,
  EmergencyContact,
  LeaveNoTracePrinciple,
  AccessPoint,
  SeasonalConditions,
  RequiredSkills,
  GearCategory,
} from '../../types/backcountry-types';

// Helper imports
import {
  getDifficultyColor,
  getDifficultyLabel,
  getWaterSourceStatusColor,
  getWaterSourceStatusLabel,
  getDangerLevelColor,
  DIFFICULTY_SHAPES,
  MOBILITY_RATING_COLORS,
  EMERGENCY_TIER_COLORS,
} from '../../types/backcountry-types';

import { DIFFICULTY_COLORS, DIFFICULTY_SHAPES } from '../../types/adventure';

// Shared component imports
import AdventureGearChecklist from '../adventure/AdventureGearChecklist.astro';
import AdventureRelatedShop from '../adventure/AdventureRelatedShop.astro';
import AdventureCTA from '../adventure/AdventureCTA.astro';
```

---

## Helper Functions Required

```typescript
/**
 * Get cell coverage warning class.
 * Returns orange border for none/spotty coverage.
 */
function getCellCoverageClass(coverage: CellCoverage): string {
  return coverage === 'none' || coverage === 'spotty'
    ? 'border-brand-orange bg-brand-orange/10'
    : 'border-sign-green bg-brand-cream';
}

/**
 * Format peak months for weather hazard display.
 * Returns human-readable month range.
 */
function formatPeakMonths(months: number[]): string {
  // Implementation from backcountry-types.ts
}

/**
 * Check if URL is external for link handling.
 */
function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}
```

---

## Testing Requirements

| Test Category | Coverage Target |
|---------------|-----------------|
| Empty state rendering | 100% of safety-critical arrays |
| Difficulty color mapping | All 4 levels with shapes |
| Water source status colors | All 3 statuses |
| Responsive breakpoints | sm, md, lg, xl |
| ARIA labels present | All sections |
| Skip links functional | 3 key sections |
| Reduced motion respected | All animations |
| External link attributes | `target` and `rel` |

---

## File Location

```
wv-wild-web/src/components/templates/BackcountryTemplate.astro
```

## Related Files

| File | Purpose |
|------|---------|
| `wv-wild-web/src/types/backcountry-types.ts` | Type definitions and Zod schemas |
| `wv-wild-web/src/content.config.ts` | Content collection config (add 'backcountry' type) |
| `wv-wild-web/src/content/adventures/dolly-sods-wilderness.mdx` | First content file |
| `wv-wild-web/src/components/templates/__tests__/BackcountryTemplate.test.ts` | Unit tests |
