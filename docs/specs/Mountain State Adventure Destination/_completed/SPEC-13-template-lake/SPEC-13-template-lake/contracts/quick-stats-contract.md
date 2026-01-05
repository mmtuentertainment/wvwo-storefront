# Contract: LakeTemplate → AdventureQuickStats

**Component**: `AdventureQuickStats.astro` (SPEC-10)
**Purpose**: Display key lake statistics in horizontal bar above fold
**Integration Type**: Existing component with data transformation

---

## Component Interface

### Props Required

```typescript
interface AdventureQuickStatsProps {
  stats: StatItem[];        // Array of 3-4 stat items
  columns?: number;         // Optional: 4 (default for lakes)
  variant?: 'white' | 'cream';  // Optional: 'white' (default)
}

interface StatItem {
  value: string;            // Display value (e.g., "2,790", "327 ft")
  label: string;            // Stat label (e.g., "Acres", "Max Depth")
  icon: StatIcon;           // Icon identifier
}

type StatIcon = 'area' | 'info' | 'location' | 'difficulty' | 'duration' | 'season';
```

### Component Behavior

- Renders horizontal stats bar
- Responsive: 4 columns desktop, 2 columns tablet, 2 columns mobile
- White background variant (matches lake template design)
- Icons render as SVG or emoji based on StatIcon value

---

## Data Transformation

### Lake Props → StatItem[] Mapping

**Source Data** (from LakeTemplateProps):

```typescript
{
  acreage: number;      // 2790
  maxDepth: number;     // 327
  county: string;       // "Nicholas"
}
```

**Transformation Function** (in LakeTemplate.astro frontmatter):

```typescript
function transformQuickStats(props: LakeTemplateProps): StatItem[] {
  return [
    {
      value: props.acreage.toLocaleString(),  // "2,790" with comma separator
      label: 'Acres',
      icon: 'area' as const
    },
    {
      value: `${props.maxDepth} ft`,          // "327 ft" with unit
      label: 'Max Depth',
      icon: 'info' as const
    },
    {
      value: props.county,                    // "Nicholas" as-is
      label: 'County',
      icon: 'location' as const
    },
  ];
}
```

**Computed Value**:

```typescript
const quickStats = transformQuickStats({ name, acreage, maxDepth, county } as LakeTemplateProps);
```

---

## Invocation Pattern

### Template Usage

```astro
<!-- LakeTemplate.astro -->
<AdventureQuickStats
  stats={quickStats}
  columns={4}
  variant="white"
/>
```

### Placement

**Position**: Immediately after Hero section
**Order**: Section #3 in template body (after Layout wrapper and Hero)

**Context**:

```astro
<!-- Hero Section -->
<section class="relative h-[70vh]">
  <!-- Hero content -->
</section>

<!-- Quick Stats Component -->
<AdventureQuickStats
  stats={quickStats}
  columns={4}
  variant="white"
/>

<!-- What to Fish Section -->
<AdventureWhatToFish ... />
```

---

## Validation Rules

### Required

- ✅ `stats` array MUST have 3-4 items
- ✅ Each `StatItem` requires `value`, `label`, `icon`
- ✅ `value` must be non-empty string
- ✅ `label` must be non-empty string
- ✅ `icon` must be valid StatIcon type

### Optional

- `columns`: Defaults to 4 if not provided (recommended for lakes)
- `variant`: Defaults to 'white' if not provided

### Constraints

- **Acreage**: Must be positive number, formatted with comma separator for readability (e.g., 2,790 not 2790)
- **MaxDepth**: Must include unit " ft" (space + "ft")
- **County**: Must be non-empty string (county name only, no "County" suffix)

### Edge Cases

**Large Acreage** (>10,000 acres):

```typescript
value: props.acreage.toLocaleString()  // "12,450" (comma separator required)
```

**Shallow Lakes** (<50 ft max depth):

```typescript
value: `${props.maxDepth} ft`  // "35 ft" (still include unit)
```

**Multi-Word Counties** (e.g., "Nicholas County"):

```typescript
value: props.county  // Pass full county name, component handles wrapping
```

---

## Testing

### Unit Tests (LakeTemplate.test.ts)

```typescript
import { transformQuickStats } from '../LakeTemplate.astro';

describe('transformQuickStats', () => {
  it('formats acreage with comma separator', () => {
    const stats = transformQuickStats({ acreage: 2790, maxDepth: 327, county: 'Nicholas' });
    expect(stats[0].value).toBe('2,790');
  });

  it('appends " ft" unit to maxDepth', () => {
    const stats = transformQuickStats({ acreage: 2790, maxDepth: 327, county: 'Nicholas' });
    expect(stats[1].value).toBe('327 ft');
  });

  it('returns exactly 3 stat items', () => {
    const stats = transformQuickStats({ acreage: 2790, maxDepth: 327, county: 'Nicholas' });
    expect(stats).toHaveLength(3);
  });

  it('uses correct icons for each stat', () => {
    const stats = transformQuickStats({ acreage: 2790, maxDepth: 327, county: 'Nicholas' });
    expect(stats[0].icon).toBe('area');
    expect(stats[1].icon).toBe('info');
    expect(stats[2].icon).toBe('location');
  });
});
```

### Integration Tests

```typescript
it('AdventureQuickStats renders with lake stats', async () => {
  const { container } = render(LakeTemplate, { props: lakeData });

  const statValues = container.querySelectorAll('[data-testid="stat-value"]');
  expect(statValues[0]).toHaveTextContent('2,790');
  expect(statValues[1]).toHaveTextContent('327 ft');
  expect(statValues[2]).toHaveTextContent('Nicholas');
});
```

---

## Visual Specification

### Expected Rendering

**Desktop (1920px)**:

```
┌─────────────────────────────────────────────────────────────┐
│  [Icon] 2,790    [Icon] 327 ft    [Icon] Nicholas           │
│        Acres             Max Depth        County             │
└─────────────────────────────────────────────────────────────┘
```

4-column grid, centered icons above values

**Tablet (768px)**:

```
┌──────────────────────┬──────────────────────┐
│  [Icon] 2,790        │  [Icon] 327 ft       │
│        Acres         │        Max Depth     │
├──────────────────────┴──────────────────────┤
│  [Icon] Nicholas                            │
│        County                               │
└─────────────────────────────────────────────┘
```

2-column grid, county spans full width on second row

**Mobile (375px)**:

```
┌──────────────────────┬──────────────────────┐
│  [Icon] 2,790        │  [Icon] 327 ft       │
│        Acres         │        Max Depth     │
├──────────────────────┴──────────────────────┤
│  [Icon] Nicholas                            │
│        County                               │
└─────────────────────────────────────────────┘
```

2-column grid maintained on mobile

---

## Dependencies

### Imports Required

```astro
---
import AdventureQuickStats from '../adventure/AdventureQuickStats.astro';
import type { StatItem } from '../../types/adventure';
---
```

### Type Dependencies

**From `types/adventure.ts`**:

- `StatItem` interface
- `StatIcon` type

**SPEC-11 Component**:

- AdventureQuickStats.astro (lines 1-150 approx)

---

## Change Log

**v1.0.0** (2025-12-29):

- Initial contract specification
- 3-stat transformation (acreage, maxDepth, county)
- 4-column layout for lake stats
- White variant specified

---

## Contract Status

**Status**: ✅ **ACTIVE**
**Last Reviewed**: 2025-12-29
**Breaking Changes**: None expected (SPEC-10 component stable)
