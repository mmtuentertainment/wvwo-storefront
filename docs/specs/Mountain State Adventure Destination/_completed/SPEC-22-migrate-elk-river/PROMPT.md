# SPEC-22: Elk River WMA Migration to Dynamic Route

**Status**: Ready for implementation
**Assigned Agent**: `coder` (simple 2-agent pattern)
**Dependencies**: SPEC-14 (WMATemplate), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (migrating to `.md` content collections) is **DEPRECATED**.

### New Pattern (Required)

1. **Create data file**: `/src/data/wma/elk-river.ts` exporting `WMATemplateProps`
2. **Dynamic route auto-discovers**: `/src/pages/near/wma/[slug].astro` uses `import.meta.glob()`
3. **Delete static page**: Remove `/src/pages/near/elk-river.astro` after migration
4. **Update index slug**: Change `slug: "elk-river"` to `slug: "wma/elk-river"` in index.astro

### Reference Implementation

See completed examples:
- `/src/pages/near/wma/[slug].astro` - Dynamic route with getStaticPaths()
- `/src/data/wma/burnsville.ts` - Data file structure (WMATemplateProps)
- `/src/types/wma.ts` - Type definitions with Zod schemas

---

## ReasoningBank Context Loading

Before starting, load relevant patterns:

```bash
# Load SPEC-21 dynamic route pattern
claude-flow memory query "template-dynamic-route-pattern" --namespace wvwo-patterns --reasoningbank

# Load WMA template pattern
claude-flow memory query "wma template" --namespace wvwo-successes --reasoningbank
```

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/elk-river.astro` to use the `getStaticPaths()` dynamic route pattern.

**Pattern**: Data file + dynamic route (not content collection)

---

## Agent Instructions

### 1. Code Explorer Agent

**Read source file completely**:

```bash
Read ./wv-wild-web/src/pages/near/elk-river.astro
```

**Extract all data for WMATemplateProps**:

- `name`, `image`, `imageAlt`, `tagline`, `description`
- `stats[]` (acreage, drive time, location)
- `species[]` (name, season, difficulty, hotspots)
- `huntingSeasons[]` (species, method, dates, notes)
- `accessInfo` (permits, parking, regulations)
- `safetyInfo` (zones, hazards, emergency)
- `gearList[]` (name, optional)
- `relatedShop[]` (name, description, href)
- `coordinates` (lat/lng for schema.org)

---

### 2. Coder Agent

**Create data file at `/src/data/wma/elk-river.ts`**:

```typescript
import type { WMATemplateProps } from '../../types/wma';

export const elkRiverWMAData: WMATemplateProps = {
  name: 'Elk River WMA',
  // ... all extracted data
};
```

**Update index.astro slug**:

Change in `/src/pages/near/index.astro`:
```javascript
// FROM:
{ name: "Elk River WMA", slug: "elk-river", ... }

// TO:
{ name: "Elk River WMA", slug: "wma/elk-river", ... }
```

**Delete static page**:

```bash
rm ./wv-wild-web/src/pages/near/elk-river.astro
```

**Verify build**:

```bash
cd wv-wild-web && npm run build
# Should see /near/wma/elk-river/ in output
```

---

## Validation Checklist

Before marking complete:

- [ ] Data file created at `/src/data/wma/elk-river.ts`
- [ ] Data exports `WMATemplateProps`-shaped object with `species` field
- [ ] Index.astro slug updated to `wma/elk-river`
- [ ] Static page `elk-river.astro` deleted
- [ ] Build passes with `/near/wma/elk-river/` generated
- [ ] Page renders correctly with WMATemplate
- [ ] Kim's voice maintained in all content

---

## Success Criteria

1. `/near/wma/elk-river/` route works via dynamic routing
2. WMATemplate renders all content correctly
3. Schema.org data preserved
4. Old static page removed
5. Build generates correct number of pages

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-22-elk-river-complete" "Elk River WMA migrated to getStaticPaths() pattern. Data file at /src/data/wma/elk-river.ts. Index slug updated to wma/elk-river." --namespace wvwo-successes --reasoningbank
```
