# SPEC-23: Summersville Lake Migration to Dynamic Route

**Status**: PARTIALLY COMPLETE - Data file exists, needs cleanup
**Assigned Agent**: `coder` (simple pattern)
**Dependencies**: SPEC-13 (LakeTemplate), SPEC-21 (getStaticPaths pattern)

---

## ⚠️ IMPORTANT: Updated Migration Pattern (SPEC-21)

**This spec has been updated to use the `getStaticPaths()` dynamic route pattern.**

### Current State

- ✅ Data file EXISTS: `/src/data/lakes/summersville.ts`
- ✅ Dynamic route EXISTS: `/src/pages/near/lake/[slug].astro`
- ❌ Static page still exists: `/src/pages/near/summersville-lake.astro` (DELETE)
- ❌ Index slug needs update: Change to `lake/summersville`

### Remaining Work

1. **Delete static page**: Remove `/src/pages/near/summersville-lake.astro`
2. **Update index slug**: Change `slug: "summersville-lake"` to `slug: "lake/summersville"`
3. **Verify build**: Confirm `/near/lake/summersville/` generates correctly

---

## Reference Implementation

See completed examples:
- `/src/pages/near/lake/[slug].astro` - Dynamic route with getStaticPaths()
- `/src/data/lakes/summersville.ts` - Data file (already exists!)
- `/src/data/lakes/burnsville.ts` - Another lake data file example

---

## Agent Instructions

### Coder Agent

**1. Delete static page**:

```bash
rm ./wv-wild-web/src/pages/near/summersville-lake.astro
```

**2. Update index.astro slug**:

Change in `/src/pages/near/index.astro`:
```javascript
// FROM:
{ name: "Summersville Lake", slug: "summersville-lake", ... }

// TO:
{ name: "Summersville Lake", slug: "lake/summersville", ... }
```

**3. Verify build**:

```bash
cd wv-wild-web && npm run build
# Should see /near/lake/summersville/ in output
```

---

## Validation Checklist

Before marking complete:

- [ ] Data file exists at `/src/data/lakes/summersville.ts` ✅ (already done)
- [ ] Static page `summersville-lake.astro` deleted
- [ ] Index.astro slug updated to `lake/summersville`
- [ ] Build passes with `/near/lake/summersville/` generated
- [ ] Page renders correctly with LakeTemplate

---

## Success Criteria

1. `/near/lake/summersville/` route works via dynamic routing
2. LakeTemplate renders all content correctly
3. Old static page removed
4. Build generates correct number of pages

---

## Store Pattern (After Completion)

```bash
claude-flow memory store "spec-23-summersville-complete" "Summersville Lake migrated to getStaticPaths() pattern. Data file was already at /src/data/lakes/summersville.ts. Deleted static page, updated index slug to lake/summersville." --namespace wvwo-successes --reasoningbank
```
