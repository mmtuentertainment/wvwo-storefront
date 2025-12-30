# Contract: LakeTemplate → AdventureFeatureSection (Activities)

**Component**: `AdventureFeatureSection.astro` (SPEC-11)
**Purpose**: Display lake activities beyond fishing (diving, swimming, kayaking)
**Integration Type**: Reusable base component with data transformation

---

## Component Interface

### Props Required

```typescript
interface AdventureFeatureSectionProps {
  title: string;                       // Section heading
  intro?: string;                      // Optional intro paragraph
  features: FeatureItem[];             // Array of activities
  variant?: 'white' | 'cream';         // Optional: section background
  columns?: number;                    // Optional: 3 (default for activities)
  accentColor?: string;                // Optional: 'sign-green' (default)
  animate?: boolean;                   // Optional: true (gentle-reveal)
  ariaLabel?: string;                  // Optional: accessibility label
}

interface FeatureItem {
  name: string;                        // Activity name
  description: string;                 // Activity details
  metadata?: string;                   // Optional: season + difficulty
  icon?: string;                       // Optional: icon identifier
}
```

### Component Behavior

**Base Component**:
- AdventureFeatureSection is the **foundation component** for ALL feature grids
- Used by AdventureWhatToFish, AdventureWhatToHunt, and custom sections
- Highly configurable with 9+ props for flexible rendering

**Rendering**:
- Responsive grid (1-col mobile, 2-col tablet, 3-col desktop for activities)
- Green border-left accent (configurable via accentColor)
- Gentle-reveal animations with stagger (0.1s delay per item)
- Metadata displayed below description (season + difficulty)

---

## Data Transformation

### Lake Props → FeatureItem[] Mapping

**Source Data** (from LakeTemplateProps):
```typescript
activities: Array<{
  name: string;                        // "Scuba Diving"
  description: string;                 // "Long Point Cliff dive site..."
  season: string;                      // "May-October"
  difficulty?: 'easy' | 'moderate' | 'challenging';  // Optional
}>
```

**Transformation Function** (in LakeTemplate.astro frontmatter):
```typescript
function transformActivities(activities: Activity[]): FeatureItem[] {
  return activities.map(act => ({
    name: act.name,
    description: act.description,
    metadata: `${act.season}${act.difficulty ? ` • ${act.difficulty}` : ''}`,  // Combine season + difficulty
  }));
}
```

**Example Input**:
```typescript
activities: [
  {
    name: 'Scuba Diving',
    description: 'Long Point Cliff is the signature dive site with 40+ foot visibility. Towering rock formation plunges underwater. Sarge\'s Dive Shop offers rentals and certification.',
    season: 'May-October (water temps 68-80°F)',
    difficulty: 'moderate'
  },
  {
    name: 'Swimming',
    description: 'Battle Run Beach offers designated swimming area with lifeguards. Crystal clear water with excellent visibility.',
    season: 'Memorial Day - Labor Day',
    difficulty: 'easy'
  },
  {
    name: 'Cliff Jumping',
    description: 'Pyramid-shaped rock formation at Long Point is popular for jumping. Several safe spots around the point. WARNING: Jumping from surrounding sandstone cliffs is prohibited.',
    season: 'Summer (June-August)',
    difficulty: 'challenging'
  }
]
```

**Example Output**:
```typescript
const activityFeatures: FeatureItem[] = [
  {
    name: 'Scuba Diving',
    description: 'Long Point Cliff is the signature dive site with 40+ foot visibility. Towering rock formation plunges underwater. Sarge\'s Dive Shop offers rentals and certification.',
    metadata: 'May-October (water temps 68-80°F) • moderate'
  },
  {
    name: 'Swimming',
    description: 'Battle Run Beach offers designated swimming area with lifeguards. Crystal clear water with excellent visibility.',
    metadata: 'Memorial Day - Labor Day • easy'
  },
  {
    name: 'Cliff Jumping',
    description: 'Pyramid-shaped rock formation at Long Point is popular for jumping. Several safe spots around the point. WARNING: Jumping from surrounding sandstone cliffs is prohibited.',
    metadata: 'Summer (June-August) • challenging'
  }
]
```

---

## Invocation Pattern

### Template Usage

```astro
<!-- LakeTemplate.astro -->
<AdventureFeatureSection
  title="Year-Round Activities"
  intro="Beyond fishing, the lake offers diverse recreation opportunities for all skill levels."
  features={transformActivities(activities)}
  variant="cream"
  columns={3}
  accentColor="sign-green"
  animate={true}
/>
```

### Recommended Props

**For Lake Activities**:
```astro
<AdventureFeatureSection
  title="Year-Round Activities"
  intro="Beyond fishing, the lake offers diverse recreation opportunities."
  features={activityFeatures}
  variant="cream"              // Alternates with white sections
  columns={3}                  // 3-column for activities
  accentColor="sign-green"     // Green accent matches fishing theme
  animate={true}               // Gentle-reveal on scroll
/>
```

### Placement

**Position**: Section #8 in template (after Marina section)
**Order**: RECREATION content - additional activities beyond fishing/camping

**Context**:
```astro
<!-- Marina (custom section) -->
<section class="py-12 md:py-16 bg-white">
  <!-- Marina details -->
</section>

<!-- Activities (reuses AdventureFeatureSection) -->
<AdventureFeatureSection
  title="Year-Round Activities"
  intro="Beyond fishing, the lake offers diverse recreation opportunities."
  features={activityFeatures}
  variant="cream"
  columns={3}
  accentColor="sign-green"
/>

<!-- Seasonal Guide (custom section) -->
<section class="py-12 md:py-16 bg-white">
  <!-- Seasonal breakdown -->
</section>
```

---

## Validation Rules

### Required

- ✅ `title`: Non-empty string (section heading)
- ✅ `features` array CAN be empty (section hides gracefully)
- ✅ If present, each `FeatureItem` requires `name` and `description`

### Optional

- `intro`: Section introduction paragraph (recommended for context)
- `metadata`: Combined season + difficulty string
- `variant`: Defaults to 'white' (override to 'cream' for alternating)
- `columns`: Defaults to 3 (appropriate for activities)
- `accentColor`: Defaults to 'sign-green' (matches fishing/outdoor theme)
- `animate`: Defaults to true (gentle-reveal on scroll)
- `ariaLabel`: Accessibility label for screen readers

### Array Size Limits (NFR-009)

**Performance Constraint**:
- `activities` max: **20 items**
- Lighthouse performance score must remain 90+ within limit
- Typical WV lake: 4-8 activities (well within limit)

### Edge Cases

**Empty Activities Array**:
```typescript
activities: []  // ✅ VALID - Section hides, no error
```
Template conditionally renders - if array empty, entire activities section hidden.

**No Difficulty Level**:
```typescript
{
  name: 'Kayaking',
  description: '...',
  season: 'May-October'
  // difficulty: undefined - metadata shows only season
}
```
Metadata: `"May-October"` (no bullet point, no difficulty)

**Long Metadata String**:
```typescript
metadata: 'May-October (water temps 68-80°F) • moderate'
```
Component handles text wrapping naturally.

---

## Metadata Formatting

### Season + Difficulty Combination

**With Difficulty**:
```typescript
metadata: `${season} • ${difficulty}`
// "May-October • moderate"
```

**Without Difficulty**:
```typescript
metadata: season
// "May-October" (no bullet, no difficulty)
```

**Rendering**:
```astro
{feature.metadata && (
  <p class="text-sm text-brand-brown/60 mt-2">
    {feature.metadata}
  </p>
)}
```

**Visual Treatment**:
- Small text (`text-sm`)
- Muted color (`text-brand-brown/60` - 60% opacity)
- Top margin separator (`mt-2`)

### Difficulty Levels

**Values**: `easy` | `moderate` | `challenging`

**Display**:
- Lowercase in metadata
- No emoji or icons (text only)
- Optional (can be omitted)

---

## Testing

### Unit Tests (LakeTemplate.test.ts)

```typescript
import { transformActivities } from '../LakeTemplate.astro';

describe('transformActivities', () => {
  it('combines season and difficulty into metadata', () => {
    const activities = [{ name: 'Diving', description: 'Test', season: 'Summer', difficulty: 'moderate' as const }];
    const features = transformActivities(activities);
    expect(features[0].metadata).toBe('Summer • moderate');
  });

  it('handles missing difficulty gracefully', () => {
    const activities = [{ name: 'Swimming', description: 'Test', season: 'Summer' }];
    const features = transformActivities(activities);
    expect(features[0].metadata).toBe('Summer');
  });

  it('preserves name and description', () => {
    const activities = [{ name: 'Kayaking', description: 'Calm waters', season: 'May-Oct' }];
    const features = transformActivities(activities);
    expect(features[0].name).toBe('Kayaking');
    expect(features[0].description).toBe('Calm waters');
  });
});
```

### Integration Tests

```typescript
it('AdventureFeatureSection renders activities with metadata', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithActivities });

  const activityNames = container.querySelectorAll('h3.font-display');
  expect(activityNames[0]).toHaveTextContent('Scuba Diving');

  const metadata = container.querySelectorAll('[data-testid="activity-metadata"]');
  expect(metadata[0]).toHaveTextContent('May-October • moderate');
});

it('hides activities section when activities array empty', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithoutActivities });

  const activitiesSection = container.querySelector('[data-section="activities"]');
  expect(activitiesSection).not.toBeInTheDocument();
});

it('renders 3-column grid on desktop', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithActivities });

  const activityGrid = container.querySelector('[data-component="AdventureFeatureSection"]');
  expect(activityGrid).toHaveClass('lg:grid-cols-3');
});
```

---

## Visual Specification

### Expected Rendering

**Desktop (1920px) - 3 Column Grid**:
```
┌─────────────────┬─────────────────┬─────────────────┐
│ │ Scuba Diving  │ │ Swimming      │ │ Cliff Jumping │
│ │               │ │               │ │               │
│ │ Long Point... │ │ Battle Run... │ │ Pyramid rock..│
│ │               │ │               │ │               │
│ │ May-Oct       │ │ Memorial Day  │ │ Summer        │
│ │ • moderate    │ │ - Labor Day   │ │ • challenging │
│ │               │ │ • easy        │ │               │
└─────────────────┴─────────────────┴─────────────────┘
```
Green border-left (4px) on each card, metadata below description

**Tablet (768px) - 2 Column Grid**:
```
┌─────────────────────────────┬─────────────────────────────┐
│ │ Scuba Diving              │ │ Swimming                  │
│ │ Long Point Cliff dive...  │ │ Battle Run Beach...       │
│ │ May-October • moderate    │ │ Memorial Day • easy       │
├─────────────────────────────┴─────────────────────────────┤
│ │ Cliff Jumping                                           │
│ │ Pyramid rock formation...                               │
│ │ Summer (June-August) • challenging                      │
└─────────────────────────────────────────────────────────────
```
2-column grid, third activity spans full width on second row

**Mobile (375px) - 1 Column Stacked**:
```
┌──────────────────────────────┐
│ │ Scuba Diving               │
│ │ Long Point Cliff dive...   │
│ │ May-October • moderate     │
└──────────────────────────────┘
┌──────────────────────────────┐
│ │ Swimming                   │
│ │ Battle Run Beach...        │
│ │ Memorial Day • easy        │
└──────────────────────────────┘
┌──────────────────────────────┐
│ │ Cliff Jumping              │
│ │ Pyramid rock formation...  │
│ │ Summer • challenging       │
└──────────────────────────────┘
```
Full-width cards, stacked vertically

---

## Dependencies

### Imports Required

```astro
---
import AdventureFeatureSection from '../adventure/AdventureFeatureSection.astro';
import type { FeatureItem, Activity } from '../../types/adventure';
---
```

### Type Dependencies

**From `types/adventure.ts`**:
- `FeatureItem` interface (existing SPEC-11 type)
- `Activity` interface (NEW SPEC-13 type)

**SPEC-11 Component**:
- AdventureFeatureSection.astro (base component, ~190 lines)

---

## WVWO Compliance

### Font Usage

- **Activity Names**: `font-display` (Bitter, serif) - bold headings
- **Descriptions**: `font-body` (Noto Sans) - body text
- **Metadata**: `font-body` - season + difficulty info

### Color Palette

- **Border-Left Accent**: `border-l-sign-green` (#2E7D32) - outdoor theme
- **Text Colors**:
  - Activity name: `text-brand-brown` (#3E2723)
  - Description: `text-brand-brown/75` (75% opacity)
  - Metadata: `text-brand-brown/60` (60% opacity, muted)

### Border Radius

- **Cards**: `rounded-sm` (0.125rem) - ONLY allowed value
- ❌ FORBIDDEN: rounded-md, rounded-lg, rounded-xl

### Animations

**Gentle Reveal** (if `animate={true}`):
```css
@keyframes gentle-reveal {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Accessibility**:
```css
@media (prefers-reduced-motion: reduce) {
  .adventure-feature-section { animation: none; }
}
```

**Stagger**: 0.1s delay per activity card

---

## Common Usage Patterns

### Pattern 1: Full Activity Data

```typescript
activities: [
  {
    name: 'Scuba Diving',
    description: 'Detailed description with rentals, certification info, dive sites.',
    season: 'May-October (water temps 68-80°F)',
    difficulty: 'moderate'
  }
]
```

### Pattern 2: Simple Activity (No Difficulty)

```typescript
activities: [
  {
    name: 'Kayaking',
    description: 'Calm waters ideal for beginners. Rentals available at marina.',
    season: 'May-October'
    // No difficulty - metadata shows only season
  }
]
```

### Pattern 3: No Activities

```typescript
activities: []  // Empty array - section hidden
```

---

## Change Log

**v1.0.0** (2025-12-29):
- Initial contract specification
- activities → FeatureItem[] transformation
- Metadata combines season + difficulty
- 3-column responsive grid
- Reuses AdventureFeatureSection base component

---

## Contract Status

**Status**: ✅ **ACTIVE**
**Last Reviewed**: 2025-12-29
**Breaking Changes**: None expected (SPEC-11 base component stable)
**Reusability**: High - AdventureFeatureSection reused across multiple sections
