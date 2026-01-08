# SPEC-32: Canaan Valley Migration to Dynamic Route

**Status**: Ready for implementation - NEEDS HYBRID TEMPLATE
**Assigned Agent**: `coder` + `architect` (hybrid template required)
**Dependencies**: SPEC-21 (getStaticPaths pattern), SPEC-31 (SkiTemplate reference)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (swarm with content collections) is **DEPRECATED**.

### Special Case: Hybrid Ski/State Park Template

**No HybridTemplate exists yet.** Canaan Valley is unique - it combines a ski resort with a state park. Options:

**Option A**: Create dedicated `/src/pages/near/resort/[slug].astro` for hybrid destinations
**Option B**: Use SkiTemplate with extended `stateParkInfo` fields
**Option C**: Create separate ski and park pages linking to each other

### Recommended Approach (Option A)

1. **Create new template**: `/src/components/templates/ResortTemplate.astro`
2. **Create type definitions**: `/src/types/resort.ts` with `ResortTemplateProps`
3. **Create dynamic route**: `/src/pages/near/resort/[slug].astro`
4. **Create data file**: `/src/data/resorts/canaan-valley.ts`
5. **Delete static page**: Remove `/src/pages/near/canaan-valley.astro`
6. **Update index slug**: Change to `slug: "resort/canaan-valley"`

### Reference Implementation

See completed examples for pattern:
- `/src/pages/near/wma/[slug].astro` - Dynamic route structure
- `/src/components/templates/WMATemplate.astro` - Template structure
- `/src/types/wma.ts` - Type definitions with Zod schemas
- SPEC-31 (SkiTemplate) - For ski-specific fields

---

## ReasoningBank Context Loading

Before starting, load relevant patterns:

```bash
# Load SPEC-21 dynamic route pattern
claude-flow memory query "template-dynamic-route-pattern" --namespace wvwo-patterns --reasoningbank

# Load ski template pattern (from SPEC-31)
claude-flow memory query "ski template" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

1. **Create ResortTemplate** combining ski resort + state park patterns
2. Migrate `/wv-wild-web/src/pages/near/canaan-valley.astro` to dynamic route

**Pattern**: New hybrid template + data file + dynamic route

---

## ResortTemplateProps (Suggested Structure)

```typescript
interface ResortTemplateProps {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: QuickStat[];

  // Ski Resort Info (winter)
  skiResort: {
    trails: number;
    lifts: number;
    difficulty: { beginner: number; intermediate: number; advanced: number };
    features: string[];
    season: { open: string; close: string };
  };

  // State Park Info (year-round)
  statePark: {
    acres: number;
    amenities: string[];
    trails: Trail[];
    wildlife: string[];
  };

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
**Destination coordinates**: `39.1213, -79.4354` (Canaan Valley, WV)
**Drive time**: ~2 hours via US-219 N
**Distance**: ~85 miles

### Ski Resort Data

- 47 trails, 4 lifts
- Difficulty: 40% beginner, 40% intermediate, 20% advanced
- Features: Tubing park, terrain park, night skiing, 100% snowmaking
- Season: Dec-Mar typically
- More affordable than Snowshoe

### State Park Data

- 6,015 acres
- Amenities: Campground (34 sites), Lodge (250 rooms), Golf course, Nature center
- Trails: Bald Knob (2.8 mi, moderate), Blackwater River (1 mi, easy), Club Run (3 mi, moderate)
- Wildlife: 200+ bird species, snowshoe hare, black bear, rare wetland plants
- Unique ecology: High-elevation valley, rare wetlands

---

## Kim's Voice Guidelines

**Approved phrases**:

```plaintext
"Canaan Valley is our go-to for families. Smaller than Snowshoe, way less crowded, easier on the wallet."
"The valley's a birding hotspot. 200+ species, rare wetland plants. Bring binoculars."
"Winter skiing's solid - not extreme, but perfect for learning or cruising with the kids."
"Canaan's lift tickets are cheaper than Snowshoe. Same WV snow, less sticker shock."
```

**Forbidden phrases**:

```plaintext
NEVER: "Premier destination", "Luxury resort", "World-class slopes", "Ultimate escape"
```

---

## Schema.org Markup (Dual Types)

```typescript
const canaanValleySchema = {
  "@context": "https://schema.org",
  "@type": ["SkiResort", "StateOrProvincialPark"],
  "name": "Canaan Valley State Park & Resort",
  // ...
};
```

---

## Validation Checklist

- [ ] ResortTemplate.astro created
- [ ] resort.ts types created with Zod schemas
- [ ] /src/pages/near/resort/[slug].astro dynamic route created
- [ ] /src/data/resorts/canaan-valley.ts data file created
- [ ] Index.astro slug updated to `resort/canaan-valley`
- [ ] Static page `canaan-valley.astro` deleted
- [ ] Build passes with `/near/resort/canaan-valley/` generated
- [ ] SeasonalToggle component works (Winter Ski / Summer Nature)
- [ ] Dual schema.org types validated

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-32-canaan-valley-complete" "Canaan Valley migrated to getStaticPaths() pattern. Created new ResortTemplate (hybrid ski+park) with seasonal toggle, dual schema.org types, wildlife/ecology messaging. Data file at /src/data/resorts/canaan-valley.ts." --namespace wvwo-successes --reasoningbank
```
