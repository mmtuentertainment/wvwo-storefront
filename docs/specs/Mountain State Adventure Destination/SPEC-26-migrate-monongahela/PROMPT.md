# SPEC-26: Monongahela National Forest Migration to Dynamic Route

**Status**: Ready for implementation - NEEDS NEW TEMPLATE
**Assigned Agent**: `coder` + `architect` (new template required)
**Dependencies**: SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (migrating to `.md` content collections) is **DEPRECATED**.

### Special Case: National Forest Template

**No NationalForestTemplate exists yet.** This SPEC requires:

1. **Create new template**: `/src/components/templates/NationalForestTemplate.astro`
2. **Create type definitions**: `/src/types/national-forest.ts` with `NationalForestTemplateProps`
3. **Create dynamic route**: `/src/pages/near/forest/[slug].astro`
4. **Create data file**: `/src/data/forests/monongahela.ts`
5. **Delete static page**: Remove `/src/pages/near/monongahela.astro`
6. **Update index slug**: Change to `slug: "forest/monongahela"`

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

1. **Create NationalForestTemplate** following existing template patterns
2. Migrate `/wv-wild-web/src/pages/near/monongahela.astro` to dynamic route

**Pattern**: New template + data file + dynamic route

---

## NationalForestTemplateProps (Suggested Structure)

```typescript
interface NationalForestTemplateProps {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: QuickStat[];

  // Forest-specific
  totalAcres: number;
  rangerDistricts: RangerDistrict[];
  wildernesses: Wilderness[];

  // Activities
  huntingInfo: HuntingInfo;
  fishingInfo: FishingInfo;
  hikingTrails: Trail[];
  campgrounds: Campground[];

  // Seasonal
  seasonalGuide: SeasonalGuide[];

  // Access
  accessPoints: AccessPoint[];
  regulations: Regulation[];

  // Standard
  gearList: GearItem[];
  relatedShop: ShopCategory[];
  coordinates: { lat: number; lng: number };
}
```

---

## Validation Checklist

- [ ] NationalForestTemplate.astro created
- [ ] national-forest.ts types created with Zod schemas
- [ ] /src/pages/near/forest/[slug].astro dynamic route created
- [ ] /src/data/forests/monongahela.ts data file created
- [ ] Index.astro slug updated to `forest/monongahela`
- [ ] Static page `monongahela.astro` deleted
- [ ] Build passes with `/near/forest/monongahela/` generated

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-26-monongahela-complete" "Monongahela National Forest migrated to getStaticPaths() pattern. Created new NationalForestTemplate with ranger districts, wildernesses, hunting/fishing/hiking info. Data file at /src/data/forests/monongahela.ts." --namespace wvwo-successes --reasoningbank
```
