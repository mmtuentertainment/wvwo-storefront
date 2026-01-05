# Contract: LakeTemplate → AdventureWhatToFish

**Component**: `AdventureWhatToFish.astro` (SPEC-11)
**Purpose**: Display fish species with techniques, seasons, and Kim's tips
**Integration Type**: Existing wrapper component with data transformation

---

## Component Interface

### Props Required

```typescript
interface AdventureWhatToFishProps {
  features: FeatureItem[];         // Array of fish species
  variant?: 'white' | 'cream';     // Optional: section background
  columns?: number;                // Optional: 2 (default for fish)
  accentColor?: string;            // Optional: 'sign-green' (default)
}

interface FeatureItem {
  name: string;                    // Species name (title)
  description: string;             // Season, size, availability
  kimNote?: string;                // Optional: Kim's fishing tips
}
```

### Component Behavior

**Wrapper Architecture**:

- AdventureWhatToFish delegates ALL rendering to AdventureFeatureSection
- Provides fishing-specific defaults (green accent, 2 columns)
- Renders kimNote in `font-hand` (Permanent Marker) if present

**Rendering**:

- 2-column responsive grid (1-col mobile, 2-col tablet/desktop)
- Green border-left accent on species cards
- Kim's tips in cursive font with border-top separator

---

## Data Transformation

### Lake Props → FeatureItem[] Mapping

**Source Data** (from LakeTemplateProps):

```typescript
fishSpecies: Array<{
  title: string;           // "Smallmouth Bass"
  description: string;     // "Year-round fishery..."
  notes?: string;          // "Use tube jigs..." (Kim's tips)
}>
```

**Transformation Function** (in LakeTemplate.astro frontmatter):

```typescript
function transformFishSpecies(
  species: LakeTemplateProps['fishSpecies']
): FeatureItem[] {
  return species.map(fish => ({
    name: fish.title,           // title → name
    description: fish.description,
    kimNote: fish.notes,        // notes → kimNote (optional)
  }));
}
```

**Example Input**:

```typescript
fishSpecies: [
  {
    title: 'Smallmouth Bass',
    description: 'Year-round fishery with 14-18" fish common. Peak spring and fall on rocky structure.',
    notes: 'The water\'s gin-clear, so downsize your line to 6-8 lb test and go with natural colors. Tube jigs and drop shot rigs work well.'
  },
  {
    title: 'Walleye',
    description: 'Trophy walleye up to 30+ inches. Best fishing at night or low-light conditions.',
    notes: 'Vertical jig near the dam in 40-60 ft of water. Live bait or blade baits. Night fishing permitted year-round.'
  }
]
```

**Example Output**:

```typescript
const fishFeatures: FeatureItem[] = [
  {
    name: 'Smallmouth Bass',
    description: 'Year-round fishery with 14-18" fish common. Peak spring and fall on rocky structure.',
    kimNote: 'The water\'s gin-clear, so downsize your line to 6-8 lb test and go with natural colors. Tube jigs and drop shot rigs work well.'
  },
  {
    name: 'Walleye',
    description: 'Trophy walleye up to 30+ inches. Best fishing at night or low-light conditions.',
    kimNote: 'Vertical jig near the dam in 40-60 ft of water. Live bait or blade baits. Night fishing permitted year-round.'
  }
]
```

---

## Invocation Pattern

### Template Usage

```astro
<!-- LakeTemplate.astro -->
<AdventureWhatToFish
  features={transformFishSpecies(fishSpecies)}
  variant="cream"
  columns={2}
  accentColor="sign-green"
/>
```

### Recommended Props

**For Lakes**:

```astro
<AdventureWhatToFish
  features={fishFeatures}
  variant="cream"          // Alternates with white sections
  columns={2}              // 2-column for fish species
  accentColor="sign-green" // Green border-left for fishing
/>
```

### Placement

**Position**: Section #4 in template (after Quick Stats)
**Order**: PRIMARY CONTENT - fishing appears first on lake pages

**Context**:

```astro
<!-- Quick Stats -->
<AdventureQuickStats ... />

<!-- What to Fish (PRIMARY CONTENT) -->
<AdventureWhatToFish
  features={fishFeatures}
  variant="cream"
  columns={2}
  accentColor="sign-green"
/>

<!-- Where to Fish (custom section) -->
<section class="py-12 md:py-16 bg-white">
  <!-- Fishing spots -->
</section>
```

---

## Validation Rules

### Required

- ✅ `features` array must have ≥1 item
- ✅ Each `FeatureItem` requires `name` and `description`
- ✅ `name` must be non-empty string
- ✅ `description` must be non-empty string

### Optional

- `kimNote`: Optional string (renders in font-hand if present)
- `variant`: Defaults to 'white' (override to 'cream' for alternating sections)
- `columns`: Defaults to 2 (appropriate for fish species)
- `accentColor`: Defaults to 'sign-green' (fishing sections use green)

### Array Size Limits (NFR-009)

**Performance Constraint**:

- `fishSpecies` max: **20 items**
- Lighthouse performance score must remain 90+ within limit
- Typical WV lake: 6-12 species (well within limit)

### Edge Cases

**No Kim's Tips** (kimNote undefined):

```typescript
{
  name: 'Muskie',
  description: 'Trophy muskie to 50+ inches. Catch and release only.',
  kimNote: undefined  // Optional - no tip section renders
}
```

Component gracefully hides Kim's tips section if `kimNote` is undefined.

**Long Species Names**:

```typescript
{
  name: 'Chain Pickerel (Southern Subspecies)',  // Long name wraps naturally
  description: '...',
  kimNote: '...'
}
```

Component handles text wrapping with proper line-height.

**Empty fishSpecies Array**:

```typescript
fishSpecies: []  // ❌ BUILD WILL FAIL
```

**Zod validation requires ≥1 fish species** - template cannot render without fishing content.

---

## Kim's Voice Integration

### Rendering Pattern

**If kimNote Present**:

```astro
<!-- AdventureFeatureSection renders kimNote in special style -->
{feature.kimNote && (
  <p class="font-hand text-lg text-sign-green italic mt-3 border-t border-brand-brown/10 pt-3">
    "{feature.kimNote}"
  </p>
)}
```

**Visual Treatment**:

- `font-hand` (Permanent Marker): Cursive font for personal touch
- `text-sign-green`: Green text color (matches fishing theme)
- `italic`: Italicized for emphasis
- `border-t`: Top border separator from description
- Quoted: Displayed as `"Kim says: ..."`

### Kim's Voice Characteristics

**Good Kim's Tips** (specific, practical):

```
"The water's gin-clear, so downsize your line to 6-8 lb test and go with natural colors. Tube jigs and drop shot rigs with soft plastics work well. Target rocky points and ledges — the smallmouth stack up on structure."
```

**Avoid Generic Tips**:

```
"Fish are active in spring."  // Too vague, not Kim's voice
```

**Voice Patterns**:

- ✅ Direct, practical advice
- ✅ Local terminology ("gin-clear", "stack up on structure")
- ✅ Specific techniques (gear, bait, depth recommendations)
- ✅ Conversational tone
- ✅ Safety awareness when relevant

---

## Testing

### Unit Tests (LakeTemplate.test.ts)

```typescript
import { transformFishSpecies } from '../LakeTemplate.astro';

describe('transformFishSpecies', () => {
  it('transforms title to name', () => {
    const species = [{ title: 'Bass', description: 'Year-round' }];
    const features = transformFishSpecies(species);
    expect(features[0].name).toBe('Bass');
  });

  it('transforms notes to kimNote', () => {
    const species = [{ title: 'Bass', description: 'Year-round', notes: 'Use jigs' }];
    const features = transformFishSpecies(species);
    expect(features[0].kimNote).toBe('Use jigs');
  });

  it('handles missing notes gracefully', () => {
    const species = [{ title: 'Bass', description: 'Year-round' }];
    const features = transformFishSpecies(species);
    expect(features[0].kimNote).toBeUndefined();
  });

  it('preserves description as-is', () => {
    const species = [{ title: 'Bass', description: 'Year-round fishery' }];
    const features = transformFishSpecies(species);
    expect(features[0].description).toBe('Year-round fishery');
  });
});
```

### Integration Tests

```typescript
it('AdventureWhatToFish renders fish species with Kim\'s tips', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithTips });

  const speciesNames = container.querySelectorAll('h3.font-display');
  expect(speciesNames[0]).toHaveTextContent('Smallmouth Bass');

  const kimsTips = container.querySelectorAll('.font-hand');
  expect(kimsTips[0]).toHaveTextContent('"The water\'s gin-clear');
});

it('hides Kim\'s tips section when notes undefined', async () => {
  const { container } = render(LakeTemplate, { props: lakeDataWithoutTips });

  const kimsTips = container.querySelectorAll('.font-hand');
  expect(kimsTips).toHaveLength(0);
});
```

---

## Visual Specification

### Expected Rendering

**Desktop (1920px) - 2 Column Grid**:

```
┌──────────────────────────────┬──────────────────────────────┐
│ │ Smallmouth Bass            │ │ Walleye                    │
│ │ Year-round fishery...      │ │ Trophy walleye up to...    │
│ │                            │ │                            │
│ │ "Use tube jigs..." (italic)│ │ "Vertical jig near..." (italic)
└──────────────────────────────┴──────────────────────────────┘
```

Green border-left (4px) on each card

**Mobile (375px) - 1 Column Stacked**:

```
┌──────────────────────────────┐
│ │ Smallmouth Bass            │
│ │ Year-round fishery...      │
│ │ "Use tube jigs..." (italic)│
└──────────────────────────────┘
┌──────────────────────────────┐
│ │ Walleye                    │
│ │ Trophy walleye up to...    │
│ │ "Vertical jig near..." (italic)
└──────────────────────────────┘
```

Full-width cards, stacked vertically

---

## Dependencies

### Imports Required

```astro
---
import AdventureWhatToFish from '../adventure/AdventureWhatToFish.astro';
import type { FeatureItem } from '../../types/adventure';
---
```

### Type Dependencies

**From `types/adventure.ts`**:

- `FeatureItem` interface (existing SPEC-11 type)

**SPEC-11 Components**:

- AdventureWhatToFish.astro (wrapper)
- AdventureFeatureSection.astro (base component, handles rendering)

---

## WVWO Compliance

### Font Usage

- **Species Names**: `font-display` (Bitter, serif) - bold headings
- **Descriptions**: `font-body` (Noto Sans) - body text
- **Kim's Tips**: `font-hand` (Permanent Marker) - cursive personal touch

### Color Palette

- **Border-Left Accent**: `border-l-sign-green` (#2E7D32) - fishing theme
- **Text Colors**:
  - Species name: `text-brand-brown` (#3E2723)
  - Description: `text-brand-brown/75` (75% opacity)
  - Kim's tip: `text-sign-green` (green, italic)

### Border Radius

- **Cards**: `rounded-sm` (0.125rem) - ONLY allowed value
- ❌ FORBIDDEN: rounded-md, rounded-lg, rounded-xl

---

## Change Log

**v1.0.0** (2025-12-29):

- Initial contract specification
- fishSpecies → FeatureItem[] transformation
- Kim's voice integration (kimNote → font-hand)
- 2-column responsive grid
- Green accent for fishing theme

---

## Contract Status

**Status**: ✅ **ACTIVE**
**Last Reviewed**: 2025-12-29
**Breaking Changes**: None expected (SPEC-11 component stable)
