# PR #70 - Greptile Review Fix Checklist

**Date**: 2025-12-29
**Status**: Ready for fixes

---

## 🔴 CRITICAL - Must Fix Before Merge (3 items)

### 1. Remove Undefined `bg-camo` Class

- [ ] **File**: `wv-wild-web/src/pages/near/cranberry.astro:122`
- [ ] **Change**: Replace `bg-camo` with `bg-noise`

```diff
- <div class="absolute inset-0 opacity-5 pointer-events-none bg-camo"></div>
+ <div class="absolute inset-0 opacity-5 pointer-events-none bg-noise"></div>
```

### 2. Replace Hardcoded Acreage Values

- [ ] **File 1**: `wv-wild-web/src/pages/near/burnsville-lake.astro:62`
- [ ] **File 2**: `wv-wild-web/src/pages/near/burnsville-lake.astro:83`
- [ ] **Change**: Use dynamic schema field

```diff
- 12,579 Acres
+ {adventure.data.acreage} Acres

- <span class="block text-2xl font-bold text-brand-brown">12,579</span>
+ <span class="block text-2xl font-bold text-brand-brown">{adventure.data.acreage}</span>
```

### 3. Add Division-by-Zero Guard

- [ ] **File**: `tests/performance/lighthouse-audit.mjs:184-187`
- [ ] **Change**: Add guard clause before averaging

```diff
const validResults = results.filter(r => r !== null);
+ if (validResults.length === 0) {
+   console.log('\n❌ No valid results to calculate averages');
+   return;
+ }
const avgPerformance = validResults.reduce((sum, r) => sum + r.metrics.scores.performance, 0) / validResults.length;
```

---

## 🟡 IMPORTANT - Recommended Fixes (8 items)

### 4. Remove Unused Import

- [ ] **File**: `tests/performance/bundle-analyzer.mjs:13`
- [ ] **Change**: Remove `readFile` from imports

```diff
- import { readdir, stat, readFile } from 'fs/promises';
+ import { readdir, stat } from 'fs/promises';
```

### 5. Fix Icon Property

- [ ] **File**: `wv-wild-web/src/components/adventure/AdventureFeatureSection.astro:30-31`
- [ ] **Decision**: Either implement icon rendering OR remove prop
- [ ] **Action**: _____________________________

### 6. Dynamic Tailwind Classes

- [ ] **File**: `wv-wild-web/src/components/adventure/AdventureCTA.astro:146`
- [ ] **Change**: Add to Tailwind safelist config

```javascript
// tailwind.config.cjs
safelist: [
  'hover:text-sign-green',
  'hover:text-brand-brown',
  // ... other dynamic classes
]
```

### 7. Variant-Based Background

- [ ] **File**: `wv-wild-web/src/components/adventure/AdventureAmenitiesGrid.astro:109`
- [ ] **Change**: Use variant prop for background

```diff
- <div class="bg-white rounded-sm shadow-sm p-6">
+ <div class="${variant === 'sign-green' ? 'bg-brand-cream' : 'bg-white'} rounded-sm shadow-sm p-6">
```

### 8. Extract Test Helpers

- [ ] **File**: `wv-wild-web/src/components/adventure/__tests__/AdventureFeatureSection.test.ts:22-50`
- [ ] **Change**: Export helpers from component, import in test
- [ ] **Action**: _____________________________

### 9. Fix Playwright Throttling

- [ ] **File**: `docs/specifications/SPEC-12-TDD-STRATEGY.md:1328-1331`
- [ ] **Change**: Use proper CDP network emulation

```typescript
// Correct approach
await context.route('**/*', route => {
  route.continue();
});
await page.emulateNetworkConditions({
  offline: false,
  downloadThroughput: (1.5 * 1024 * 1024) / 8, // 1.5Mbps
  uploadThroughput: (750 * 1024) / 8,
  latency: 100
});
```

### 10. Add Missing Import

- [ ] **File**: `docs/specifications/SPEC-12-TDD-STRATEGY.md:175-177`
- [ ] **Change**: Add schema import or inline definition

```typescript
import { adventuresSchema } from '../../src/content.config';
```

### 11. Correct Import Paths

- [ ] **File**: `docs/specifications/SPEC-12-TDD-STRATEGY.md:77-79`
- [ ] **Change**: Fix relative paths for test location

```typescript
import { adventuresSchema } from '../../src/content.config';
```

---

## 🟢 MINOR - Optional Documentation Fixes (6 items)

### 12. Fix Duplicate Numbering

- [ ] **File**: `docs/architecture/SPEC-12-accessibility-architecture.md:18-19`
- [ ] **Change**: Renumber principles 3 → 4

### 13. Update Placeholder Contact Info

- [ ] **File**: `docs/architecture/SPEC-12-accessibility-architecture.md:1186-1188`
- [ ] **Change**: Add actual WVWO contact details (before production)

### 14. Reduce Motion Override Scope

- [ ] **File**: `docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/architecture/08-accessibility-architecture.md:290-295`
- [ ] **Change**: Target specific animations instead of `*`

### 15. Fix String Interpolation Syntax

- [ ] **File**: `docs/specs/Mountain State Adventure Destination/SPEC-12-template-wma/architecture/09-integration-architecture.md:115`
- [ ] **Change**: Use template literal backticks

```diff
- heading="Ready to Hunt {title.replace(' WMA', '')}?"
+ heading={`Ready to Hunt ${title.replace(' WMA', '')}?`}
```

### 16. Update Netlify URLs to Cloudflare

- [ ] **File**: `docs/specifications/SPEC-12-PERFORMANCE-ARCHITECTURE.md:678-679`
- [ ] **Change**: Replace `netlify.app` with `pages.dev`

```diff
- https://deploy-preview-${{ github.event.pull_request.number }}--wvwo.netlify.app/near/elk-river/
+ https://deploy-preview-${{ github.event.pull_request.number }}--wvwildoutdoors.pages.dev/near/elk-river/
```

### 17. Document Performance Beacon as Optional

- [ ] **File**: `docs/specifications/SPEC-12-PERFORMANCE-ARCHITECTURE.md:731-748`
- [ ] **Change**: Move to optional config or mark as Phase 2 feature

---

## 📋 Post-Fix Actions

### After Critical Fixes (Items 1-3)

- [ ] Run `npm run build` to verify no errors
- [ ] Run `npm run test` to ensure all tests pass
- [ ] Commit with message: `fix(SPEC-12): resolve Greptile critical issues (bg-camo, acreage, div-zero)`
- [ ] Push to PR branch

### After Important Fixes (Items 4-11)

- [ ] Run full test suite
- [ ] Commit with message: `chore(SPEC-12): type safety and API corrections`
- [ ] Push to PR branch

### After All Fixes

- [ ] Post response comment on PR #70 (see GREPTILE-PR70-ANALYSIS.md template)
- [ ] Add Greptile custom contexts (see GREPTILE-CUSTOM-CONTEXTS.json)
- [ ] Request new review: `@greptileai review`

---

## Greptile Custom Contexts Setup

### Manual Steps (via Greptile Dashboard)

1. Go to: <https://app.greptile.com/review/custom-context>
2. For each rule in `GREPTILE-CUSTOM-CONTEXTS.json`:
   - Click "New Custom Context"
   - Copy/paste the JSON configuration
   - Click "Create"

### Or via API (if available)

```bash
# Upload all custom contexts at once
cat docs/reviews/GREPTILE-CUSTOM-CONTEXTS.json | \
  greptile-cli custom-context create
```

---

## Quick Commands

```bash
# Fix critical issues
Edit "wv-wild-web/src/pages/near/cranberry.astro"         # bg-camo → bg-noise
Edit "wv-wild-web/src/pages/near/burnsville-lake.astro"  # acreage values
Edit "tests/performance/lighthouse-audit.mjs"             # div-zero guard

# Test changes
npm run build
npm run test

# Commit
git add .
git commit -m "fix(SPEC-12): resolve Greptile critical issues (bg-camo, acreage, div-zero)"
git push

# Request re-review
gh pr comment 70 --body "@greptileai review"
```

---

**Last Updated**: 2025-12-29
**Status**: Ready for execution
