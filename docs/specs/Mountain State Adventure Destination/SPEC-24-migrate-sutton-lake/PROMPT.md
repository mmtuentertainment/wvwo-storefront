# SPEC-24: Sutton Lake Migration to Dynamic Route

**Status**: Ready for implementation
**Assigned Agent**: `coder` (simple 2-agent pattern)
**Dependencies**: SPEC-13 (LakeTemplate), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (migrating to `.md` content collections) is **DEPRECATED**.

### New Pattern (Required)

1. **Create data file**: `/src/data/lakes/sutton.ts` exporting `LakeTemplateProps`
2. **Dynamic route auto-discovers**: `/src/pages/near/lake/[slug].astro` uses `import.meta.glob()`
3. **Delete static page**: Remove `/src/pages/near/sutton-lake.astro` after migration
4. **Update index slug**: Change `slug: "sutton-lake"` to `slug: "lake/sutton"` in index.astro

### Reference Implementation

See completed examples:
- `/src/pages/near/lake/[slug].astro` - Dynamic route with getStaticPaths()
- `/src/data/lakes/burnsville.ts` - Data file structure (LakeTemplateProps)
- `/src/data/lakes/summersville.ts` - Another lake data file example

---

## ReasoningBank Context Loading

Before starting, load relevant patterns:

```bash
# Load SPEC-21 dynamic route pattern
claude-flow memory query "template-dynamic-route-pattern" --namespace wvwo-patterns --reasoningbank

# Load lake template pattern
claude-flow memory query "lake template" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/sutton-lake.astro` to use the `getStaticPaths()` dynamic route pattern.

**Pattern**: Data file + dynamic route (not content collection)

---

## Agent Instructions

### 1. Code Explorer Agent

**Read source file completely**:

```bash
Read ./wv-wild-web/src/pages/near/sutton-lake.astro
```

**Extract all data for LakeTemplateProps**:

- `name`, `image`, `imageAlt`, `tagline`, `description`
- `stats[]` (acreage, drive time, location, access)
- `fishingSpots[]` (name, depth, structure, species, access)
- `marinas[]` (name, type, services, contact, hours, fees)
- `activities[]` (name, description, season, difficulty)
- `seasonalGuide[]` (period, targetSpecies, techniques, conditions, kimNote)
- `regulations[]` (category, details, link, important)
- `gearList[]` (name, optional)
- `relatedShop[]` (name, description, href)
- `coordinates` (lat/lng for schema.org)

---

### 2. Coder Agent

**Create data file at `/src/data/lakes/sutton.ts`**:

```typescript
import type { LakeTemplateProps } from '../../types/adventure';

export const suttonLakeData: LakeTemplateProps = {
  name: 'Sutton Lake',
  // ... all extracted data
};
```

**Update index.astro slug**:

Change in `/src/pages/near/index.astro`:
```javascript
// FROM:
{ name: "Sutton Lake", slug: "sutton-lake", ... }

// TO:
{ name: "Sutton Lake", slug: "lake/sutton", ... }
```

**Delete static page**:

```bash
rm ./wv-wild-web/src/pages/near/sutton-lake.astro
```

**Verify build**:

```bash
cd wv-wild-web && npm run build
# Should see /near/lake/sutton/ in output
```

---

## Validation Checklist

Before marking complete:

- [ ] Data file created at `/src/data/lakes/sutton.ts`
- [ ] Data exports `LakeTemplateProps`-shaped object with `fishingSpots` field
- [ ] Index.astro slug updated to `lake/sutton`
- [ ] Static page `sutton-lake.astro` deleted
- [ ] Build passes with `/near/lake/sutton/` generated
- [ ] Page renders correctly with LakeTemplate
- [ ] Kim's voice maintained in all content

---

## Success Criteria

1. `/near/lake/sutton/` route works via dynamic routing
2. LakeTemplate renders all content correctly
3. Schema.org data preserved
4. Old static page removed
5. Build generates correct number of pages

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-24-sutton-complete" "Sutton Lake migrated to getStaticPaths() pattern. Data file at /src/data/lakes/sutton.ts. Index slug updated to lake/sutton." --namespace wvwo-successes --reasoningbank
```
