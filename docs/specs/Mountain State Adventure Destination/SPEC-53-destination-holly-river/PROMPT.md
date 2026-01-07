# SPEC-53: Holly River State Park Migration to Dynamic Route

**Status**: Ready for implementation - May use StateParkTemplate
**Assigned Agent**: `coder` (simple pattern)
**Dependencies**: SPEC-18 (StateParkTemplate if exists), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (swarm with content collections) is **DEPRECATED**.

### Template Decision

**Check if StateParkTemplate exists** from SPEC-18. If yes:
1. **Create data file**: `/src/data/parks/holly-river.ts` exporting `StateParkTemplateProps`
2. **Dynamic route auto-discovers**: `/src/pages/near/park/[slug].astro`
3. **Delete static page**: Remove `/src/pages/near/holly-river.astro`
4. **Update index slug**: Change to `slug: "park/holly-river"`

If StateParkTemplate doesn't exist, create it following WMATemplate/LakeTemplate patterns.

### Reference Implementation

See completed examples for pattern:
- `/src/pages/near/wma/[slug].astro` - Dynamic route structure
- `/src/pages/near/lake/[slug].astro` - Another dynamic route example
- `/src/components/templates/WMATemplate.astro` - Template structure
- `/src/types/wma.ts` - Type definitions with Zod schemas

---

## ReasoningBank Context Loading

Before starting, load relevant patterns:

```bash
# Load SPEC-21 dynamic route pattern
claude-flow memory query "template-dynamic-route-pattern" --namespace wvwo-patterns --reasoningbank

# Load state park template pattern (from SPEC-18)
claude-flow memory query "state park template" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/holly-river.astro` to use the `getStaticPaths()` dynamic route pattern.

**Pattern**: Data file + dynamic route (using StateParkTemplate)

**Type**: State park (camping + trails)

---

## StateParkTemplateProps (If Creating New)

```typescript
interface StateParkTemplateProps {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: QuickStat[];

  // Park info
  acres: number;
  amenities: Amenity[];

  // Trails
  trails: Trail[];
  totalTrailMiles: number;

  // Lodging
  cabins?: CabinInfo;
  campground?: CampgroundInfo;

  // Activities
  activities: Activity[];
  fishing?: FishingInfo;

  // Seasonal
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
**Destination coordinates**: `38.69, -80.40` (Holly River State Park)
**Drive time**: ~45 minutes via Route 20
**Distance**: ~35 miles (closest full-service state park)

### Park Data

- 30+ miles of hiking trails
- 1930s CCC-built rustic cabins
- Tent camping (no RV hookups)
- Restaurant (seasonal)
- Native brook trout + stocked trout fishing

### Trail Highlights

- Potato Knob Trail (3 mi round trip, overlook)
- Tecumseh Trail (7 mi, backcountry loop)
- Reverie Trail (short, easy, near cabins)

### Fishing Info

- Holly River: native brook trout + stocked rainbows/browns
- Small stream fishing - light tackle, dry flies
- Trout stocking: Spring (March-May)
- WV fishing license + trout stamp required

---

## Kim's Voice Guidelines

**Approved phrases**:
```
"Holly River is our neighborhood state park - closest one with cabins and a full trail system."
"Good for a weekend if you don't want to drive 2+ hours to the bigger parks."
"The brook trout fishing is underrated. Small stream, but native brookies are in there if you're willing to hike upstream."
"Stop by the shop before you head out - we're right on the way."
```

**Forbidden phrases**:
```
NEVER: "Escape to tranquil mountain sanctuary", "Reconnect with nature", "Ultimate getaway"
```

---

## Unique Selling Points

1. **Closest full-service state park** to the shop (35 miles, 45 min)
2. **1930s CCC cabins** - rustic charm, book early for fall foliage
3. **Native brook trout** - underrated small stream fishing
4. **Shop tie-in** - "we're right on the way"

---

## Validation Checklist

- [ ] Data file created at `/src/data/parks/holly-river.ts`
- [ ] StateParkTemplate exists or created
- [ ] /src/pages/near/park/[slug].astro dynamic route exists
- [ ] Index.astro slug updated to `park/holly-river`
- [ ] Static page `holly-river.astro` deleted
- [ ] Build passes with `/near/park/holly-river/` generated
- [ ] CCC cabin history noted (1930s rustic charm)
- [ ] Proximity to shop emphasized (closest full-service park)

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-53-holly-river-complete" "Holly River State Park migrated to getStaticPaths() pattern. Data file at /src/data/parks/holly-river.ts. Emphasized proximity (closest park), native brook trout, rustic CCC cabins." --namespace wvwo-successes --reasoningbank
```
