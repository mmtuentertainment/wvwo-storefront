# SPEC-31: Snowshoe Mountain Migration to Dynamic Route

**Status**: Ready for implementation - NEEDS NEW TEMPLATE
**Assigned Agent**: `coder` + `architect` (new template required)
**Dependencies**: SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (swarm with content collections) is **DEPRECATED**.

### Special Case: Ski Resort Template

**No SkiTemplate exists yet.** This SPEC requires:

1. **Create new template**: `/src/components/templates/SkiTemplate.astro`
2. **Create type definitions**: `/src/types/ski-resort.ts` with `SkiTemplateProps`
3. **Create dynamic route**: `/src/pages/near/ski/[slug].astro`
4. **Create data file**: `/src/data/ski/snowshoe.ts`
5. **Delete static page**: Remove `/src/pages/near/snowshoe-mountain.astro`
6. **Update index slug**: Change to `slug: "ski/snowshoe"`

### Reference Implementation

See completed examples for pattern:
- `/src/pages/near/wma/[slug].astro` - Dynamic route structure
- `/src/components/templates/WMATemplate.astro` - Template structure
- `/src/types/wma.ts` - Type definitions with Zod schemas

---

## ReasoningBank Context Loading

Before starting, load relevant patterns:

```bash
# Load SPEC-21 dynamic route pattern
claude-flow memory query "template-dynamic-route-pattern" --namespace wvwo-patterns --reasoningbank

# Load template creation patterns
claude-flow memory query "template creation" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

1. **Create SkiTemplate** following existing template patterns
2. Migrate `/wv-wild-web/src/pages/near/snowshoe-mountain.astro` to dynamic route

**Pattern**: New template + data file + dynamic route

---

## SkiTemplateProps (Suggested Structure)

```typescript
interface SkiTemplateProps {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: QuickStat[];

  // Resort info
  elevation: { base: number; summit: number };
  terrain: {
    acres: number;
    trails: number;
    lifts: number;
    difficulty: { beginner: number; intermediate: number; advanced: number; expert: number };
  };
  snowfall: { average: number; snowmaking: string };
  season: { open: string; close: string };

  // Notable trails
  trails: Trail[];

  // Summer activities (seasonal toggle)
  summerActivities: SummerActivity[];

  // Seasonal patterns
  seasonalGuide: SeasonalGuide[];

  // Access
  accessInfo: AccessInfo;

  // Standard
  gearList: GearItem[];
  relatedShop: ShopCategory[];
  coordinates: { lat: number; lng: number };
}
```

---

## Data Requirements (From Original SPEC)

### Geographic Data

**Shop coordinates**: `38.5858, -80.8581` (Birch River, WV)
**Destination coordinates**: `38.4098, -79.9937` (Snowshoe, WV)
**Drive time**: ~90 minutes via US-219 S
**Distance**: ~60 miles

### Resort Data

- 244 acres, 60 trails, 14 lifts
- Difficulty: 20% beginner, 40% intermediate, 30% advanced, 10% expert
- Average snowfall: 180 inches/year
- Snowmaking: 100% coverage
- Base elevation: 4,848 ft (highest in Mid-Atlantic)

### Notable Trails

- Cupp Run (1.5 miles, advanced, longest trail)
- Shay's Revenge (1 mile, expert, steepest in Mid-Atlantic)
- Sawmill Slope (0.5 miles, beginner, wide open)

### Summer Activities

- Mountain biking (lift-accessed bike park)
- Hiking & scenic chairlift
- Disc golf
- Festivals & events

---

## Kim's Voice Guidelines

**Approved phrases**:

```plaintext
"Snowshoe's a haul from the shop (90 minutes), but it's worth it. Highest skiing in the Mid-Atlantic."
"Cupp Run is legit - 1.5 miles of thigh-burning intermediate terrain. Don't skip leg day."
"If you're learning to ski, Snowshoe's beginner area is forgiving. Wide slopes, patient instructors."
"Summer biking at Snowshoe is underrated. Lift-accessed downhill without the Colorado prices."
```

**Forbidden phrases**:

```plaintext
NEVER: "Premier destination", "World-class slopes", "Luxury mountain experience", "Ultimate winter getaway"
```

---

## Validation Checklist

- [ ] SkiTemplate.astro created
- [ ] ski-resort.ts types created with Zod schemas
- [ ] /src/pages/near/ski/[slug].astro dynamic route created
- [ ] /src/data/ski/snowshoe.ts data file created
- [ ] Index.astro slug updated to `ski/snowshoe`
- [ ] Static page `snowshoe-mountain.astro` deleted
- [ ] Build passes with `/near/ski/snowshoe/` generated
- [ ] SeasonalToggle component works (winter/summer)

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-31-snowshoe-complete" "Snowshoe Mountain migrated to getStaticPaths() pattern. Created new SkiTemplate with terrain breakdown, seasonal toggle (winter/summer), lift info, trail highlights. Data file at /src/data/ski/snowshoe.ts." --namespace wvwo-successes --reasoningbank
```
