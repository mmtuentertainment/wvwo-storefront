# WVWO Storefront Architecture Audit Report

**Audit Date:** 2026-01-17
**Auditor:** System Architecture Designer
**Codebase:** wv-wild-web (Astro 5 + TypeScript + React + Tailwind 4)
**Location:** `C:\Users\matth\Desktop\wvwo-storefront\wv-wild-web\`

---

## Executive Summary

The WVWO (WV Wild Outdoors) storefront implements a sophisticated **Adventure Hub Database** architecture - a network of interconnected outdoor destinations across West Virginia. The codebase demonstrates mature architectural patterns with strong type safety, well-organized templates, and a dual data system for content discovery.

### Overall Assessment: **Strong** (8.5/10)

| Category | Score | Status |
|----------|-------|--------|
| Template System | 9/10 | Excellent |
| Type Safety | 9/10 | Excellent |
| Routing Architecture | 8/10 | Good |
| Cross-Linking | 8/10 | Good |
| State Management | 9/10 | Excellent |
| Build Configuration | 8/10 | Good |
| Content Collections | 8/10 | Good |
| Documentation | 7/10 | Adequate |

---

## 1. Template System Architecture

### 1.1 Template Inventory (9 Templates)

| Template | Location | Lines | SPEC | Purpose |
|----------|----------|-------|------|---------|
| `StateParkTemplate.astro` | `components/templates/` | 780 | SPEC-18 | State parks with 8-section layout |
| `LakeTemplate.astro` | `components/templates/` | 558 | SPEC-13 | Lake fishing destinations |
| `WMATemplate.astro` | `components/templates/` | 568 | SPEC-12 | Wildlife Management Areas |
| `BackcountryTemplate.astro` | `components/templates/` | 500+ | SPEC-17 | Wilderness backcountry areas |
| `CampgroundTemplate.astro` | `components/templates/` | 400+ | SPEC-21-A | Campground facilities |
| `HistoricTemplate.astro` | `components/templates/` | 110+ | SPEC-19 | Historic sites & museums |
| `RiverTemplate.astro` | `components/templates/` | - | SPEC-14 | Rivers and paddling |
| `SkiTemplate.astro` | `components/templates/` | - | SPEC-15 | Ski resorts |
| `CaveTemplate.astro` | `components/templates/` | - | - | Cave systems |

### 1.2 Template Architecture Patterns

**Strengths:**

1. **Consistent Section Architecture**: Templates follow a standardized multi-section layout:
   - Hero section with stats/highlights
   - Overview/context sections
   - Facility/amenity sections
   - Activity/trails sections
   - Safety/regulations sections
   - Related destinations sections

2. **WVWO Aesthetic Compliance**: All templates enforce brand guidelines:
   ```css
   /* Enforced in all templates */
   rounded-sm ONLY (2px corners)
   font-display: Bitter, serif
   font-hand: Permanent Marker, cursive
   font-body: Noto Sans, sans-serif
   brand-brown: #3E2723
   sign-green: #2E7D32
   brand-cream: #FFF8E1
   brand-orange: #FF6F00 (<5% screen usage)
   ```

3. **Conditional Rendering**: Templates intelligently hide sections when data is missing:
   ```typescript
   const hasFacilities = Boolean(park.facilities?.lodging || ...);
   {hasFacilities && <FacilitiesSection />}
   ```

4. **Accessibility Features**:
   - Skip-to-content links (WCAG 2.1 AA)
   - `aria-labelledby` on all sections
   - `prefers-reduced-motion` support
   - Focus states with brand colors

5. **Industry Color Standards**: Templates correctly override brand colors for safety-critical information:
   - Trail difficulty: green/blue/red/black
   - Fire danger: standard USFS colors
   - Avalanche scale: standard 5-level colors

**Concerns:**

1. **Template Size**: `StateParkTemplate.astro` at 780 lines approaches the 500-line guideline. Consider extracting more sections into dedicated components.

2. **Code Duplication**: Hero sections share similar patterns across templates but are not abstracted into a shared component (except `AdventureHero.astro` used by some).

### 1.3 Component Reuse

Shared components used across templates:
- `AdventureHero.astro` - Hero sections
- `AdventureGearChecklist.astro` - Gear lists
- `AdventureCTA.astro` - Call-to-action sections
- `AdventureRelatedShop.astro` - Shop cross-links

---

## 2. Dynamic Routing Architecture

### 2.1 Route Inventory

| Route Pattern | Location | Data Source | Status |
|---------------|----------|-------------|--------|
| `/near/lake/[slug].astro` | `pages/near/lake/` | `data/lakes/*.ts` | Active |
| `/near/wma/[slug].astro` | `pages/near/wma/` | `data/wma/*.ts` | Active |
| `/near/campground/[slug].astro` | `pages/near/campground/` | `data/campgrounds/*.ts` | Active |
| `/near/river/[slug].astro` | `pages/near/river/` | `data/rivers/*.ts` | Active |
| `/near/state-park/[slug].astro` | `pages/near/state-park/` | `data/state-parks/*.ts` | Active |
| `/backcountry/[slug].astro` | `pages/backcountry/` | `data/backcountry/*.ts` | Active |
| `/historic/[slug].astro` | `pages/historic/` | `data/historic/*.ts` | Active |
| `/near/index.astro` | `pages/near/` | Hardcoded array | Active |

### 2.2 Route Pattern Analysis

**Strengths:**

1. **Auto-Discovery Pattern**: Routes use Vite's `import.meta.glob()` for automatic data file discovery:
   ```typescript
   const dataModules = import.meta.glob<LakeDataModule>(
     '../../../data/lakes/*.ts',
     { eager: true }
   );
   ```

2. **Cross-Link Discovery**: Routes discover related content at build time:
   ```typescript
   // Lake route discovers related WMAs and campgrounds
   const wmaModules = import.meta.glob('../../../data/wma/*.ts', { eager: true });
   const wmaSlugSet = new Set(Object.keys(wmaModules)...);
   ```

3. **Build-Time Validation**: Routes log warnings for missing required fields:
   ```typescript
   const missingFields = requiredFields.filter(field => !(field in exportedData));
   if (missingFields.length > 0) {
     console.warn(`[Lake ${slug}] Missing required fields: ${missingFields.join(', ')}`);
   }
   ```

**Concerns:**

1. **Pending Routes**: Three destination types have schema entries but no routes:
   - `mountain-biking` (route pending)
   - `scenic-byway` (route pending)
   - `outfitter` (route pending)

2. **Legacy Static Pages**: Several static `.astro` pages exist in `/near/`:
   - `monongahela.astro`
   - `stonewall-jackson-lake.astro`
   - `cranberry.astro`
   - `holly-river.astro`
   - `canaan-valley.astro`
   - `snowshoe-mountain.astro`
   - `burnsville-lake.astro`

   **Recommendation:** Migrate these to dynamic routes with data files.

3. **Route/Type Mapping**: `AdventureCard.tsx` has a complex switch statement for URL generation that must be kept in sync with route files.

---

## 3. Cross-Linking Architecture

### 3.1 Utility Functions

**Location:** `src/utils/cross-links.ts` (378 lines)

**Capabilities:**

| Function | Purpose | Performance |
|----------|---------|-------------|
| `haversineDistance()` | Great-circle distance calculation | Turf.js powered |
| `findNearbyDestinations()` | Radius-based destination discovery | O(n) with early termination |
| `findNearbyByType()` | Type-filtered nearby search | Set-based O(1) type check |
| `groupNearbyByType()` | Multi-type grouped results | Single-pass grouping |
| `getCrossLinkUrl()` | Safe URL generation | Guards pending routes |

**Strengths:**

1. **Turf.js Integration**: Production-grade geospatial library with proper GeoJSON support:
   ```typescript
   import { distance, point, booleanValid } from '@turf/turf';
   ```

2. **Coordinate Format Flexibility**: Supports both formats:
   - `{lat, lng}` - backward compatible with existing data
   - `[lng, lat]` - GeoJSON standard (satellite GPS)

3. **Safe Cross-Link Generation**: `getCrossLinkUrl()` returns `null` for types without routes to prevent broken links.

4. **Type Guards**: Proper TypeScript type guards for coordinate validation:
   ```typescript
   export function hasCoordinates<T extends DestinationRef>(
     dest: T
   ): dest is T & { coordinates: Coordinates } { ... }
   ```

**Concerns:**

1. **Cross-Linking Integration**: While the utilities exist, cross-linking is only partially implemented in templates. Full integration is planned for SPEC-24+.

---

## 4. State Management

### 4.1 Cart Store Architecture

**Location:** `src/stores/cartStore.ts` (511 lines)

**Technology:** nanostores (framework-agnostic state management)

**Store Structure:**

| Store | Type | Purpose |
|-------|------|---------|
| `$cartState` | `map<CartState>` | Core cart data (items, timestamps) |
| `$isCartOpen` | `atom<boolean>` | Drawer visibility |
| `$persistenceMode` | `atom<PersistenceMode>` | localStorage/session fallback |
| `$cartRestoreError` | `atom<boolean>` | Error state for cart restore |
| `$itemCount` | `computed` | Total item count |
| `$subtotal` | `computed` | Total price in cents |
| `$summary` | `computed` | Fulfillment analysis |

**Strengths:**

1. **Three-Tier Product Support**:
   - Tier 1: Shippable items (`ship_or_pickup`)
   - Tier 2: Pickup-only items (`pickup_only`)
   - Tier 3: FFL firearms (`reserve_hold`)

2. **Robust Validation**:
   ```typescript
   // Firearms: max 1 per SKU, max 3 total
   if (item.fulfillmentType === 'reserve_hold') {
     const firearmCount = Object.values(state.items).filter(...).length;
     if (firearmCount >= 3) {
       return { success: false, message: 'Maximum 3 firearms per order' };
     }
   }
   ```

3. **localStorage Persistence** with schema versioning and migration support:
   ```typescript
   const CART_SCHEMA_VERSION = 1;
   function migrateCart(oldVersion: number, data: CartState): CartState | null { ... }
   ```

4. **Race Condition Protection**:
   ```typescript
   let isAddingItem = false;
   export function addItem(item: CartItem): { success: boolean; message: string } {
     if (isAddingItem) return { success: false, message: 'Please wait...' };
     isAddingItem = true;
     // ...
   }
   ```

5. **Error Recovery**: Graceful degradation to session mode when localStorage fails.

### 4.2 React Hook

**Location:** `src/hooks/useCart.ts` (96 lines)

Provides a familiar `useCart()` interface for React components wrapping nanostores.

---

## 5. Build Configuration

### 5.1 Astro Configuration

**Location:** `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://wvwildoutdoors.pages.dev',
  vite: {
    plugins: [tailwind()],
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
  integrations: [react(), sitemap()],
});
```

**Strengths:**
- Vendor chunk splitting for React (better caching)
- esbuild minification (fast builds)
- Sitemap integration for SEO

### 5.2 Tailwind Configuration

**Location:** `tailwind.config.mjs`

**Custom Extensions:**

| Extension | Purpose |
|-----------|---------|
| `borderRadius.sm` | WVWO 2px corners (override default 4px) |
| Heritage colors | Historic site palette (SPEC-19) |
| Custom fonts | display/hand/body/marker/trail |
| Box shadows | carved/painted-wood/lumber effects |
| Text shadow plugin | Custom utility for carved text |

### 5.3 TypeScript Configuration

**Location:** `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**Strengths:**
- Strict mode enabled
- Path aliases for clean imports (`@/`)
- React JSX transform

### 5.4 Vitest Configuration

**Location:** `vitest.config.ts`

- jsdom environment for browser API testing
- v8 coverage provider
- Coverage thresholds: 80% statements, 75% branches, 80% functions/lines
- Path alias support matching tsconfig

---

## 6. Content Collections

### 6.1 Schema Definition

**Location:** `src/content.config.ts` (353 lines)

**Collections:**

| Collection | Base Path | Schema Complexity | Status |
|------------|-----------|-------------------|--------|
| `adventures` | `content/adventures/` | High (17 types, 50+ fields) | Active |
| `stories` | `content/stories/` | Medium | Active |
| `resources` | `content/resources/` | Medium | Active |
| `locations` | `content/locations/` | Medium | Active |
| `products` | `content/products/` | High (commerce-ready) | Active |

### 6.2 Adventures Schema Analysis

**Supported Types (17):**
```typescript
z.enum([
  'adventure', 'wma', 'lake', 'river', 'ski', 'campground',
  'historic', 'state-park', 'backcountry', 'cave', 'trail',
  'climbing', 'national-park', 'resort', 'mountain-biking',
  'scenic-byway', 'outfitter'
])
```

**Type-Specific Fields:**
- **WMA**: `species`, `huntingAreas`, `facilities`, `accessPoints`, `regulations`
- **River**: `rapids`, `riverFishing`, `outfitters`, `seasonalFlow`, `riverSafety`
- **Ski**: `elevation`, `trails`, `lifts`, `snowConditions`, `pricing`, `terrainParks`

**Strengths:**
1. Zero-breaking-change evolution (optional fields for type-specific data)
2. Comprehensive Zod schemas imported from separate type files
3. Reference validation with `reference('adventures')`

**Concerns:**
1. Schema complexity may impact build times as content grows
2. Some type-specific fields have no validation beyond `z.optional()`

---

## 7. Type System Architecture

### 7.1 Type File Inventory

| Type File | Lines | Purpose |
|-----------|-------|---------|
| `state-park-template-types.ts` | 500+ | Complete StatePark composition |
| `state-park-types.ts` | 400+ | State park domain types |
| `state-park-seo-types.ts` | - | SEO/Schema.org types |
| `backcountry-template-types.ts` | - | Backcountry composition |
| `backcountry-types.ts` | - | Backcountry domain types |
| `river-types.ts` | - | River/paddling types |
| `ski-types.ts` | - | Ski resort types |
| `adventure.ts` | - | Core adventure types |
| `adventure-core.ts` | - | Shared adventure primitives |
| `wma.ts` | - | WMA-specific types |
| `cave-types.ts` | - | Cave system types |
| `water-safety.ts` | - | AMD warnings, water sources |
| `weather-hazards.ts` | - | Weather/hazard types |
| `navigation-types.ts` | - | Cell coverage, GPS types |

**Total Type Files:** 34 (including tests)

### 7.2 Type Pattern Strengths

1. **Zod Schema + TypeScript Type Dual Export**:
   ```typescript
   export const StateParkManagingAgencySchema = z.object({ ... });
   export type StateParkManagingAgency = z.infer<typeof StateParkManagingAgencySchema>;
   ```

2. **Schema Composition**: Complex types built from smaller, reusable schemas:
   ```typescript
   export const StateParkTemplatePropsSchema = z.object({
     hero: StateParkHeroSchema,
     overview: StateParkOverviewSchema,
     facilities: StateParkFacilitiesSchema.optional(),
     // ...
   });
   ```

3. **Helper Functions**: Types export companion utility functions:
   ```typescript
   export function getMobilityRatingLabel(rating: MobilityRating): string { ... }
   export function getThreatLevelColor(level: ThreatLevel): string { ... }
   ```

---

## 8. Data Layer Architecture

### 8.1 Data File Organization

```
src/data/
├── backcountry/     # 3 files (dolly-sods, cranberry, otter-creek)
├── campgrounds/     # 7 files
├── historic/        # 4 files (carnifex-ferry, bulltown, gad)
├── lakes/           # 6 files + examples
├── rivers/          # 2 files
├── state-parks/     # 4 files + watoga/ subdirectory
├── wma/             # 4 files
└── weather/         # Example files
```

**Total Data Files:** ~40

### 8.2 Data File Patterns

**Strengths:**

1. **Modular State Park Data**: Complex parks use subdirectories:
   ```
   state-parks/watoga/
   ├── activities.ts
   ├── facilities.ts
   ├── metadata.ts
   ├── overview.ts
   ├── regulations.ts
   ├── reservations.ts
   └── trails.ts
   ```

2. **Shared Constants**: `state-parks/shared-constants.ts` for reusable values

3. **Example Templates**: `_example.ts` files guide new data creation

---

## 9. Issues and Recommendations

### 9.1 Critical Issues

| Issue | Impact | Recommendation |
|-------|--------|----------------|
| Pending route types | 404 errors if content uses these types | Create placeholder routes or remove from schema |
| Legacy static pages | Inconsistent routing patterns | Migrate to dynamic routes |

### 9.2 Improvement Opportunities

| Area | Current State | Recommendation | Priority |
|------|---------------|----------------|----------|
| Template size | StateParkTemplate 780 lines | Extract more sections | Medium |
| Cross-linking | Utilities exist, partial use | Complete SPEC-24 integration | High |
| Test coverage | Good for types, sparse for components | Add component tests | Medium |
| Documentation | CLAUDE.md comprehensive | Add inline JSDoc | Low |
| Error boundaries | None visible | Add React error boundaries | Medium |

### 9.3 Architecture Debt

1. **AdventureCard URL mapping** - Complex switch statement needs automated sync with routes
2. **Dual data system** - `data/` files + `content/adventures/` requires dual maintenance
3. **Image handling** - No standardized image optimization pipeline visible

---

## 10. File Statistics

### 10.1 Template Components
- Total templates: **9**
- Total template lines: ~3,500+
- Average template size: ~390 lines

### 10.2 Type Definitions
- Total type files: **34**
- Total schemas: ~100+
- Zod validation: **Comprehensive**

### 10.3 Data Files
- Total data files: **~40**
- Destination types covered: **14 active**
- Geographic coverage: Central/Eastern WV focus

### 10.4 Route Files
- Dynamic routes: **7** (`[slug].astro`)
- Static pages in `/near/`: **7** (legacy)
- Index pages: **2** (near, backcountry)

### 10.5 Utility Files
- Utils: **8** files in `src/utils/`
- Stores: **1** (`cartStore.ts` - 511 lines)
- Hooks: **1** (`useCart.ts` - 96 lines)
- Test files: **15+** across codebase

---

## 11. Conclusion

The WVWO storefront demonstrates **mature, production-ready architecture** with:

1. **Strong type safety** through comprehensive Zod schemas
2. **Consistent template patterns** following WVWO brand guidelines
3. **Scalable routing** with auto-discovery patterns
4. **Robust state management** with graceful degradation
5. **Forward-thinking cross-linking** infrastructure

The primary areas for improvement are:
- Completing cross-link integration (SPEC-24+)
- Migrating legacy static pages to dynamic routes
- Template extraction for better maintainability

The codebase is well-positioned for continued expansion of the Adventure Hub Database concept.

---

**Report Generated:** 2026-01-17
**Audit Scope:** Full architecture review
**Next Review:** Recommended after SPEC-25 completion
