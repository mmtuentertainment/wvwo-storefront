# SPEC-25: Stonewall Jackson Lake Migration to Dynamic Route

**Status**: Ready for implementation
**Assigned Agent**: `coder` (simple 2-agent pattern)
**Dependencies**: SPEC-13 (LakeTemplate), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

The original approach (migrating to `.md` content collections) is **DEPRECATED**.

### New Pattern (Required)

1. **Create data file**: `/src/data/lakes/stonewall-jackson.ts` exporting `LakeTemplateProps`
2. **Dynamic route auto-discovers**: `/src/pages/near/lake/[slug].astro` uses `import.meta.glob()`
3. **Delete static page**: Remove `/src/pages/near/stonewall-jackson-lake.astro` after migration
4. **Update index slug**: Change `slug: "stonewall-jackson-lake"` to `slug: "lake/stonewall-jackson"` in index.astro

### Reference Implementation

See completed examples:
- `/src/pages/near/lake/[slug].astro` - Dynamic route with getStaticPaths()
- `/src/data/lakes/burnsville.ts` - Data file structure (LakeTemplateProps)
- `/src/data/lakes/summersville.ts` - Another lake data file example

---

## Task Overview

Migrate `/wv-wild-web/src/pages/near/stonewall-jackson-lake.astro` to use the `getStaticPaths()` dynamic route pattern.

**Pattern**: Data file + dynamic route (not content collection)

---

## Agent Instructions

### 1. Code Explorer Agent

**Read source file completely**:

```bash
Read ./wv-wild-web/src/pages/near/stonewall-jackson-lake.astro
```

**Extract all data for LakeTemplateProps** (see SPEC-24 for full list).

---

### 2. Coder Agent

**Create data file at `/src/data/lakes/stonewall-jackson.ts`**:

```typescript
import type { LakeTemplateProps } from '../../types/adventure';

export const stonewallJacksonLakeData: LakeTemplateProps = {
  name: 'Stonewall Jackson Lake',
  // ... all extracted data
};
```

**Update index.astro slug**:

```javascript
// FROM:
{ name: "Stonewall Jackson Lake", slug: "stonewall-jackson-lake", ... }

// TO:
{ name: "Stonewall Jackson Lake", slug: "lake/stonewall-jackson", ... }
```

**Delete static page and verify build**.

---

## Validation Checklist

- [ ] Data file created at `/src/data/lakes/stonewall-jackson.ts`
- [ ] Index.astro slug updated to `lake/stonewall-jackson`
- [ ] Static page deleted
- [ ] Build passes with `/near/lake/stonewall-jackson/` generated
- [ ] Page renders correctly with LakeTemplate

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-25-stonewall-complete" "Stonewall Jackson Lake migrated to getStaticPaths() pattern. Data file at /src/data/lakes/stonewall-jackson.ts." --namespace wvwo-successes --reasoningbank
```
