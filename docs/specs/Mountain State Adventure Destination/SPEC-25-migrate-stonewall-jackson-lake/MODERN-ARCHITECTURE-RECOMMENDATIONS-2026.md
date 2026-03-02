# Modern Architecture Recommendations for WVWO (2026)

**Research Date**: January 13, 2026
**Sources**: Context7 (Astro 5.0, Zod v3.24.2), Official Astro Docs, TypeScript Handbook
**Purpose**: Identify BETTER approaches beyond fixing the current flatMap bug

---

## Current Architecture (Legacy Pattern)

**What WVWO Uses Now**:
```typescript
// Data: TypeScript files in src/data/{type}/*.ts
export const stonewallResort: StateParkTemplateProps = { ... };

// Discovery: import.meta.glob() in dynamic routes
const dataModules = import.meta.glob<StateParkDataModule>('../../../data/state-parks/*.ts', { eager: true });

// Validation: Manual type guards in getStaticPaths()
const exportedData = Object.values(module).find(
  (value): value is StateParkTemplateProps =>
    typeof value === 'object' && value !== null && 'hero' in value
);
```

**Problems with This Approach**:
1. ❌ No build-time validation of data structure
2. ❌ Manual type guards prone to errors (like our flatMap bug)
3. ❌ No automatic TypeScript interface generation
4. ❌ Runtime errors instead of compile-time catches
5. ❌ Performance overhead (Object.values() + find())

---

## MODERN APPROACH: Content Layer API (Astro 5.0 - 2026)

### What Changed in Astro 5.0

**Content Layer API** (introduced v5.0) replaces the legacy content collections system with:
- ✅ Explicit `loader` patterns (no automatic scanning)
- ✅ Performance improvements (caching, optimized queries)
- ✅ Support for remote data (CMSs, databases, APIs)
- ✅ Zod validation at LOAD TIME (not runtime)

### Content Collections with Glob Loader

**NEW PATTERN** (Astro 5.0):
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stateParks = defineCollection({
  loader: glob({
    pattern: "**/*.{md,json}",
    base: "./src/data/state-parks"
  }),
  schema: z.object({
    hero: z.object({
      name: z.string(),
      heroImage: z.string(),
      acreage: z.number().optional(),
      quickHighlights: z.array(z.string()).max(6)
    }),
    facilities: z.object({
      lodging: z.object({
        cabins: z.array(z.object({
          cabinNumber: z.string(),
          bedrooms: z.number()
        })).optional()
      }).optional()
    }).optional(),
    // ... rest of schema
  })
});

export const collections = { stateParks };
```

**Then query with type safety**:
```typescript
import { getCollection } from 'astro:content';

const parks = await getCollection('stateParks');
// ✅ Full TypeScript autocomplete
// ✅ Validated at build time
// ✅ No manual type guards needed
```

### Advantages Over Current Approach

| Feature | import.meta.glob (Current) | Content Collections (Modern) |
|---------|---------------------------|------------------------------|
| **Type Safety** | Manual assertions | Automatic from Zod schema |
| **Validation** | Runtime (throws errors) | Build-time (fails early) |
| **Performance** | Re-scan every build | Cached between builds |
| **Editor Support** | Limited | Full IntelliSense |
| **Querying** | Object.values().find() | getCollection() |
| **Filtering** | Manual array methods | Built-in filter params |
| **References** | Manual cross-linking | Type-safe reference() |
| **Error Messages** | Generic TypeScript | Detailed Zod errors |
| **File Formats** | .ts only | .md, .json, .yaml, .ts* |

*TypeScript requires custom loader

---

## HYBRID APPROACH: Custom TypeScript Loader

Since content collections don't natively support `.ts` files, we can create a custom loader:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Custom loader for TypeScript data files
function typescriptLoader() {
  return glob({
    pattern: "**/*.ts",
    base: "./src/data/state-parks",
    // Parser extracts default export
    parser: async (text) => {
      const module = await import(text);
      return Object.values(module)[0]; // First export
    }
  });
}

const stateParks = defineCollection({
  loader: typescriptLoader(),
  schema: StateParkTemplatePropsSchema // Zod schema
});
```

**Sources**:
- [Astro 5.0 Upgrade Guide](https://docs.astro.build/en/guides/upgrade-to/v5/)
- [GitHub - astro-content-loader](https://github.com/dnlzro/astro-content-loader)

---

## ADVANCED ZOD PATTERNS for Better Validation

### 1. .transform() for Data Normalization

```typescript
const StateParkSchema = z.object({
  hero: z.object({
    acreage: z.string().transform((val) => parseInt(val, 10)), // "1736" → 1736
    established: z.coerce.date() // Flexible date parsing
  })
});
```

### 2. .superRefine() for Complex Validation

```typescript
const FacilitiesSchema = z.object({
  lodging: z.object({
    cabins: z.array(CabinSchema).optional()
  }).optional()
}).superRefine((data, ctx) => {
  // Custom validation: If lodging exists, must have at least 1 cabin OR 1 lodge room
  if (data.lodging &&
      !data.lodging.cabins?.length &&
      !data.lodging.lodgeRooms?.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Lodging must include cabins or lodge rooms",
      path: ['lodging']
    });
  }
});
```

### 3. .refine() for Cross-Field Validation

```typescript
const StateParkSchema = z.object({
  facilities: FacilitiesSchema,
  reservations: ReservationsSchema
}).refine(
  (data) => {
    // If has cabins, must have cabin reservation info
    const hasCabins = data.facilities?.lodging?.cabins?.length > 0;
    const hasCabinReservations = Boolean(data.reservations?.cabins);
    return !hasCabins || hasCabinReservations;
  },
  {
    message: "State parks with cabins must provide cabin reservation details",
    path: ['reservations', 'cabins']
  }
);
```

**Sources**:
- [Zod v3.24.2 - transform()](https://github.com/colinhacks/zod/blob/v3.24.2/README.md)
- [Zod v3.24.2 - superRefine()](https://github.com/colinhacks/zod/blob/v3.24.2/deno/lib/README.md)

---

## IMMEDIATE FIX vs. LONG-TERM MIGRATION

### Option A: Quick Fix (This Week)

**Fix the flatMap bug** using nullish coalescing:
```typescript
const allCabins = (park.facilities?.lodging?.cabins ?? []).flatMap(...)
```

**Pros**: Works immediately, minimal changes
**Cons**: Doesn't address underlying architecture issues

### Option B: Migrate to Content Collections (SPEC-26+)

**Create new spec** to migrate state parks to Content Layer API:
- Convert .ts files → .json or .md with frontmatter
- Define Zod schemas in src/content.config.ts
- Use getCollection() instead of import.meta.glob()
- Gain build-time validation, better performance

**Pros**: Modern architecture, better type safety, faster builds
**Cons**: Significant refactor (~40 hours for all destination types)

### Option C: Hybrid Approach (Recommended)

**Phase 1** (SPEC-25 completion):
- Fix flatMap bug with nullish coalescing ← **DO THIS NOW**
- Add Zod safeParse() validation in getStaticPaths()
- Document technical debt

**Phase 2** (SPEC-26 - State Park Content Layer):
- Migrate ONLY state parks to Content Layer API as proof of concept
- Measure performance gains
- Document migration pattern

**Phase 3** (SPEC-27-30):
- Migrate other types (lakes, WMAs, campgrounds) if Phase 2 shows benefits
- Unified content architecture

---

## SPECIFIC RECOMMENDATIONS for WVWO

### Immediate Actions (This Sprint)

1. **Fix flatMap Bug** (30 minutes):
   ```typescript
   // Find all facilities?.flatMap() calls in templates
   // Replace with: (facilities?.property ?? []).flatMap()
   ```

2. **Add Runtime Validation** (2 hours):
   ```typescript
   // In getStaticPaths(), add safeParse check
   import { StateParkTemplatePropsSchema } from '../../types/state-park-template-types';

   const validation = StateParkTemplatePropsSchema.safeParse(exportedData);
   if (!validation.success) {
     console.warn(`[${slug}] Validation failed:`, validation.error.issues);
     return; // Skip invalid data file
   }
   ```

3. **Document Pattern** (1 hour):
   - Store fix in ReasoningBank
   - Update CLAUDE.md with validation pattern
   - Create reusable validation utility

### Medium-Term (Next Quarter)

1. **Proof of Concept Migration** (SPEC-26):
   - Migrate 1-2 state parks to Content Layer
   - A/B test performance (build time, query speed)
   - Document learnings

2. **Decision Point**:
   - If Content Layer shows 20%+ performance gain → migrate all
   - If marginal benefit → stay with current + improved validation

### Long-Term (2026 Roadmap)

**Consider**: Full migration to Content Layer API when hitting 50+ destinations

**Why**:
- Collections handle "tens of thousands of entries" efficiently
- Build-time validation prevents runtime errors
- Better developer experience (IntelliSense, error messages)
- Future-proof for Astro 6.0+ direction

---

## TECHNICAL DEBT ASSESSMENT

### Current System Health: 🟡 MODERATE

**Strengths**:
- ✅ Auto-discovery works (import.meta.glob)
- ✅ TypeScript interfaces exist
- ✅ 3/4 route types working

**Weaknesses**:
- ❌ No build-time validation (flatMap bug proves this)
- ❌ Manual type guards fragile
- ❌ No data consistency checks across files

**Technical Debt Load**: ~40 hours to fully modernize

**Priority**: MEDIUM (fix bug now, modernize when scaling to 50+ destinations)

---

## RECOMMENDATION SUMMARY

**For SPEC-25 (This Week)**:
1. ✅ Fix flatMap bug (nullish coalescing pattern)
2. ✅ Add safeParse validation in getStaticPaths()
3. ✅ Complete 3/4 routes (acceptable for launch)
4. 🔶 Document state-park route as "TODO: Fix template bug"

**For SPEC-26 (Next Sprint)**:
1. 🎯 Investigate Content Layer migration for state parks
2. 🎯 Create custom TypeScript loader proof of concept
3. 🎯 Measure performance benefits

**For 2026 Roadmap**:
1. 📊 Migrate all destination types to Content Layer if POC successful
2. 📊 Unified Zod schema architecture
3. 📊 Build-time validation for all data files

---

## Sources

### Astro 5.0 Documentation
- [Upgrade to Astro v5](https://docs.astro.build/en/guides/upgrade-to/v5/)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
- [Imports Reference](https://docs.astro.build/en/guides/imports/)

### Context7 Documentation
- [Astro (18,023 code snippets)](https://context7.com/llmstxt/astro_build_llms-full_txt)
- [Zod v3.24.2 Official](https://context7.com/colinhacks/zod)

### Community Resources
- [astro-content-loader (GitHub)](https://github.com/dnlzro/astro-content-loader)
- [What's New in Astro - August 2024](https://astro.build/blog/whats-new-august-2024/)

### TypeScript Official
- [TypeScript 3.7 - Optional Chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)

### Best Practices
- [Understanding flatMap() - LogRocket](https://blog.logrocket.com/understanding-flatmap-other-typescript-arrays/)
- [TypeScript flatMap Guide](https://www.xjavascript.com/blog/typescript-flatmap/)
