# SPEC-42: Cranberry Wilderness Migration to Dynamic Route

**Status**: Ready for implementation - May use BackcountryTemplate
**Assigned Agent**: `coder` (simple pattern)
**Dependencies**: SPEC-17 (BackcountryTemplate if exists), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (swarm with content collections) is **DEPRECATED**.

### Template Decision

**Check if BackcountryTemplate exists** from SPEC-17. If yes:
1. **Create data file**: `/src/data/backcountry/cranberry.ts` exporting `BackcountryTemplateProps`
2. **Dynamic route auto-discovers**: `/src/pages/near/backcountry/[slug].astro`
3. **Delete static page**: Remove `/src/pages/near/cranberry.astro`
4. **Update index slug**: Change to `slug: "backcountry/cranberry"`

If BackcountryTemplate doesn't exist, create it following WMATemplate/LakeTemplate patterns.

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

# Load backcountry template pattern (from SPEC-17)
claude-flow memory query "backcountry template" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/cranberry.astro` to use the `getStaticPaths()` dynamic route pattern.

**Pattern**: Data file + dynamic route (using BackcountryTemplate)

**Type**: Backcountry wilderness (bear hunting + backpacking)

---

## BackcountryTemplateProps (If Creating New)

```typescript
interface BackcountryTemplateProps {
  name: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  stats: QuickStat[];

  // Wilderness-specific
  totalAcres: number;
  trailMiles: number;
  trailheads: Trailhead[];

  // Hunting info
  huntingInfo: {
    species: string[];
    seasons: HuntingSeason[];
    regulations: string[];
    baitingAllowed: boolean;
  };

  // Safety (critical for backcountry)
  safetyInfo: {
    cellService: boolean;
    nearestHospital: string;
    emergencyInfo: string;
    hazards: string[];
  };

  // Camping
  campingInfo: {
    type: 'dispersed' | 'designated';
    regulations: string[];
    bearStorage: boolean;
  };

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
**Destination coordinates**: `38.20, -80.30` (Cranberry Mountain Nature Center)
**Drive time**: ~2 hours via I-79 to Richwood
**Distance**: ~90 miles

### Wilderness Data

- 47,815 acres of roadless Monongahela National Forest
- 75+ miles of trails
- Trailheads: Cranberry Mountain Nature Center, Big Beechy, North-South Trail

### Hunting Info

- Bear hunting: Archery (Sept), Gun (Nov-Dec)
- **CRITICAL**: Bear baiting PROHIBITED (federal wilderness)
- WV hunting license + Class XS bear stamp required
- No dog hunting allowed

### Safety Info

- **NO cell service** - offline maps mandatory
- Bear-proof food storage required
- Topographic maps and compass/GPS essential
- Nearest hospital: Richwood (30+ minutes from trailheads)

---

## Kim's Voice Guidelines

**Approved phrases**:
```
"Cranberry Wilderness isn't a weekend beginner trip. This is 47,000 acres with no roads, no cell service, and no easy way out if things go wrong."
"If you're bear hunting here, you're packing in and packing out everything. Plan for 3-5 days minimum."
"Stop by the shop before you head in - we can help with maps and bear bag setups."
"This is real backcountry. If you're not comfortable navigating with map and compass, start somewhere else."
```

**Forbidden phrases**:
```
NEVER: "Immerse yourself in pristine wilderness", "Reconnect with nature", "Ultimate backcountry adventure", "Crown jewel"
```

---

## Validation Checklist

- [ ] Data file created at `/src/data/backcountry/cranberry.ts`
- [ ] BackcountryTemplate exists or created
- [ ] /src/pages/near/backcountry/[slug].astro dynamic route exists
- [ ] Index.astro slug updated to `backcountry/cranberry`
- [ ] Static page `cranberry.astro` deleted
- [ ] Build passes with `/near/backcountry/cranberry/` generated
- [ ] Safety warnings prominent (backcountry danger)
- [ ] Bear baiting prohibition clearly stated

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-42-cranberry-complete" "Cranberry Wilderness migrated to getStaticPaths() pattern. Data file at /src/data/backcountry/cranberry.ts. Bear hunting content with DNR compliance, safety protocols, baiting prohibition clearly stated." --namespace wvwo-successes --reasoningbank
```
