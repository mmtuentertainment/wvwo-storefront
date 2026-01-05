# SPEC-07: Adventures Hub with Triple-Axis Filtering - Implementation Prompt

**Phase:** Mountain State Adventure Destination
**Status:** 🚧 READY FOR IMPLEMENTATION
**Output:** `src/pages/adventures/index.astro`
**Pattern:** Foundation Pattern (Scout → Architect → Implement)
**Dependencies:** SPEC-06 (Content Collections schema - COMPLETED ✅)

---

## 🛡️ Governance Compliance

**Constitution v2.3.0 Requirements**:

- ✅ Use Astro Content Collections (Principle II) - Adventures schema from SPEC-06
- ✅ No e-commerce UI concerns (SPEC-05: PUBLIC_COMMERCE_ENABLED=false)
- ✅ Mobile-first performance (Principle V)
- ✅ Kim's authentic voice (Principle II)

**AgentDB Status**: 125 episodes (includes SPEC-05/06 patterns in episodes 118-125)

---

## 🎯 Mission (UPDATED: Research-Validated Dec 2025)

Build the Adventures Hub (`/adventures/`) with **5-axis filtering** (Activity, Season, Difficulty, Elevation, Suitability) using **React + Context API + Astro islands** and **real adventures from SPEC-06 Content Collections**. Reuse the hub page structure from `/near/index.astro` for consistent navigation and SEO.

**User Story:** Highway travelers and locals can filter WV outdoor destinations by multiple criteria (activity type, season, difficulty level, elevation gain, suitability for families/accessibility) - without page reloads. Works offline when cell service drops (rural WV constraint).

**Data Source**: Query `getCollection('adventures')` from SPEC-06 Content Collections (not hardcoded data).

**Technology Decision (Research-Validated):**

- ✅ **React + Context API** (NOT vanilla JS - extensibility requirement)
- ✅ **Astro islands** (`client:load` for filter component)
- ✅ **Cloudflare Pages** (static deployment, NOT Workers)
- ✅ **Service Worker + IndexedDB** (offline-first filtering)
- ✅ **shadcn/ui** for filter controls (WVWO aesthetic overrides required)

**SPEC-07 Scope (5 Axes Day 1)**:

1. **Activity** (multi-select: use `gear[]` field as proxy until schema updated)
2. **Season** (multi-select: `season[]` field - spring/summer/fall/winter)
3. **Difficulty** (radio: `difficulty` field - easy/moderate/challenging/rugged)
4. **Elevation** (range slider: OPTIONAL - requires schema update with elevation_gain field)
5. **Suitability** (multi-select: OPTIONAL - requires schema update with suitability[] field)

**Minimum Viable (3 Axes)**: Activity, Season, Difficulty (schema ready TODAY)

**Deferred to Post-Launch Optimization (SPEC-08+)**:

- **Distance filtering**: Requires HERE API batch calculation + schema fields (`i79_distance_miles`, `i79_drive_minutes`)
- **Cloudflare Workers pre-rendering**: NOT worth complexity for 30-50ms imperceptible gain
- **Performance optimization**: IF analytics show filter latency >200ms AND bounce >40%

---

## ☁️ Cloudflare Architecture Decision (Research-Validated)

### ✅ APPROVED for SPEC-07

**Deployment Platform:**

- **Cloudflare Pages** (static Astro deployment)
- **React islands** for filter component (client-side filtering)
- **Service Worker + IndexedDB** for offline filtering when connection drops
- **Argo Smart Routing** ($5/month, 33% TTFB reduction for rural WV spotty connections)

**Rationale (from Research):**

- Client-side React filtering: 100-150ms (acceptable per UX standards)
- Service Worker enables offline filtering (critical for WV cell service dropouts)
- Cloudflare edge cache + Argo Smart Routing optimize initial page load
- Total cost: $20-25/month (Argo $5 + domain $20)

### ❌ DEFERRED to Post-Launch (SPEC-08+)

**Cloudflare Workers Pre-Rendering:**

- **Reason**: 30-50ms performance gain is imperceptible to users (human perception threshold >100ms)
- **Complexity cost**: +20-30 dev hours for marginal UX improvement
- **Decision criteria**: IF post-launch analytics show filter latency >200ms AND bounce rate >40%, THEN implement Workers in SPEC-08

### Performance Targets (Research-Adjusted)

- **Initial page load (LCP)**: <2.5s on 3G (Cloudflare edge cache + Argo)
- **Filter response time**: 100-150ms (acceptable, NOT <50ms - no benchmarks support <50ms at 70 items + 4-6 axes)
- **Offline filtering**: Must work when connection drops (Service Worker requirement)

---

## 📦 Deployment Configuration (NEW: Cloudflare-Specific)

### Required Files

**1. `wv-wild-web/public/_headers`** (Cloudflare Cache Rules + HTTP/2 Push)

```
# Adventures Hub - HTTP/2 Server Push (Saves 230ms on 3G)
/adventures
  Link: </_astro/FilterIsland.*.js>; rel=preload; as=script; crossorigin
  Link: </_astro/FilterIsland.*.css>; rel=preload; as=style
  Cache-Control: max-age=0, must-revalidate
  X-Content-Type-Options: nosniff

# React Island Bundles (hashed filenames - cache 1 year)
/_astro/*.js
  Cache-Control: public, max-age=31556952, immutable

/_astro/*.css
  Cache-Control: public, max-age=31556952, immutable

# Adventure Data JSON (if using separate JSON file)
/data/adventures.json
  Cache-Control: public, max-age=3600

# Note: Replace FilterIsland.*.js with actual hashed filename after build
# Find with: ls dist/_astro/ | grep -i filter
```

**2. Service Worker Registration** (Add to Layout.astro)

```javascript
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

**3. `wv-wild-web/src/service-worker.js`** (Offline-First Filtering)

```javascript
// Service Worker for offline filtering
// Caches adventures data + filter state in IndexedDB
// Enables filtering to work when connection drops

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('adventures-v1').then((cache) => {
      return cache.addAll([
        '/adventures/',
        // React island bundles auto-cached via hashed filenames
      ]);
    })
  );
});

// IndexedDB for filter state persistence
// (Full implementation in Service Worker specification)
```

**4. Deployment Steps:**

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist/

# Enable Argo Smart Routing (Cloudflare Dashboard)
# Navigate to: Traffic → Argo → Enable ($5/month)

# Verify cache headers
curl -I https://wvwildoutdoors.pages.dev/adventures/

# Monitor Core Web Vitals (Google Analytics 4)
# Track: TTFB, LCP, FID for 4 weeks post-launch

# Verify HTTP/2 Push is working
curl -I https://wvwildoutdoors.pages.dev/adventures/ | grep cf-h2-pushed

# Check bundle sizes
npm run build && du -sh dist/_astro/*.js
```

---

## 📦 Bundle Size Optimization (Research: HTTP/2 Push Gains)

### Performance Impact (Rural WV 3G Constraint)

**HTTP/2 Push Savings:**

| Connection Type | Without Push | With Push | Time Saved |
|----------------|--------------|-----------|------------|
| **3G (rural WV)** | 380ms to interactive | 150ms | **230ms (60% faster)** |
| **4G** | 150ms | 50ms | 100ms |
| **Broadband** | 30ms | 15ms | 15ms |

**Why:** HTTP/2 Push sends React bundle WHILE HTML downloads (parallel), not after (serial).

### Bundle Size Targets (Per React Island)

| Component | Size (gzipped) | Budget | Notes |
|-----------|----------------|--------|-------|
| **React + ReactDOM** | 80 KB | Unavoidable | Framework baseline |
| **shadcn/ui components** | <10 KB | Selective | Only import what you use |
| **Custom filter logic** | <5 KB | Minimal | Keep reducer lean |
| **TOTAL per island** | **<95 KB** | ✅ Target | Achievable with optimization |

**Research Evidence:** Cloudflare Brotli compression achieves 20-30% smaller than Gzip. Astro's build optimizations automatically code-split islands.

### shadcn/ui Component Size Budget

**For SPEC-07 Filter Component:**

- ✅ **Button** (+1.2 KB) - "Clear Filters", "Apply"
- ✅ **Input** (+0.8 KB) - Search box
- ✅ **Select** (+3.5 KB) - Season/Difficulty dropdowns (desktop)
- ✅ **Sheet** (+6 KB) - Mobile bottom drawer (worth the cost)
- ✅ **Accordion** (+2 KB) - Collapsible filter groups inside Sheet

**Total shadcn:** ~13.5 KB (within <10 KB budget if selective)

**Avoid for SPEC-07:**

- ❌ Dialog (use Sheet for mobile, lighter)
- ❌ Popover (use Select, simpler)
- ❌ Combobox (use Select, smaller bundle)

### Code Splitting Strategy (Parallel Loading)

**❌ DON'T: Single Large Island**

```astro
<AdventuresHub client:load /> <!-- 500 KB bundle -->
```

**✅ DO: Multiple Smaller Islands**

```astro
<!-- Desktop filters (30 KB) -->
<FilterBar client:load />

<!-- Adventure cards (25 KB, lazy load) -->
<AdventureGrid client:visible adventures={adventures} />

<!-- Mobile drawer (20 KB, lazy load) -->
<MobileFiltersSheet client:visible />
```

**Benefit:** Total same size, but loads in parallel. First meaningful paint faster.

### Vite Configuration (Build-Time Optimization)

**Add to `astro.config.mjs`:**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,  // Remove console.logs in production
          drop_debugger: true,
        },
        mangle: true,  // Shorten variable names
      },
    },
  },
});
```

### Bundle Size Monitoring (Weekly)

**After each build, check sizes:**

```bash
npm run build
du -sh dist/_astro/*.js | sort -h
```

**Alert thresholds:**

- ⚠️ Any single JS file >150 KB gzipped → investigate code bloat
- 🔴 Total island bundle >200 KB → BLOCKING issue (rural 3G can't handle)

---

## 📊 Post-Launch Performance Monitoring (Required for SPEC-08 Decision)

### Track These Metrics (4 weeks minimum)

**Google Analytics 4 - Core Web Vitals:**

- **TTFB** (Time to First Byte): Target <600ms on 3G
- **LCP** (Largest Contentful Paint): Target <2.5s
- **FID** (First Input Delay): Filter click to result update

**Cloudflare Analytics:**

- Cache hit ratio: Target >90% for static assets
- Edge response time: Monitor per region (US-East for WV)
- Bandwidth usage: Track React bundle size impact

**User Behavior:**

- Filter interaction rate: % of users who apply filters
- Bounce rate on `/adventures/`: Target <40%
- Average filter clicks per session

### Decision Criteria for Workers Pre-Rendering (SPEC-08+)

**IF** filter latency >200ms on mobile devices **AND** bounce rate >40%
**THEN** implement Cloudflare Workers pre-rendering for top 50 filter combos
**ELSE** keep client-side React filtering (simpler, maintainable)

---

## 📈 Performance Benchmarks & Success Metrics (Research: Competitor Data)

### Industry Benchmarks (Outdoor Recreation Sites)

**AllTrails (Gold Standard - 65M users):**

- Monthly visits: 17 million
- **Avg session duration: 8 min 32 sec** (exceptional, 4x industry average)
- Pages per visit: 3.29
- Bounce rate: 61.09%
- Top keywords: "trails near me" (110k volume), "hiking" (110k volume)

**REI (E-Commerce Conversion):**

- Homepage → Category: 45% conversion
- Category → Product Detail: 35%
- Detail → Cart: 12%
- Cart → Purchase: 68%
- Post-SEO audit: +200% natural search sales

**National Parks (Visitation Patterns):**

- Great Smoky Mountains: 12M annual (easy access, free entry)
- Gates of the Arctic: <12k annual (remote, difficult)
- **Pattern:** Accessibility > Difficulty for traffic volume

**State Tourism Sites:**

- Mobile traffic: 77% (2019) → likely 80-85% (2025)
- High traffic ≠ high engagement (California paradox)

### WVWO Performance Targets (Research-Validated)

| Metric | Target | AllTrails Benchmark | Industry Average |
|--------|--------|-------------------|------------------|
| **Avg Session Duration** | >3 min | 8 min 32 sec | 2-4 min |
| **Bounce Rate** | <50% | 61% | 40-55% |
| **Pages per Session** | >3 pages | 3.29 | 2-4 pages |
| **Engagement Rate** | >60% | ~50-65% | 50-65% |
| **Conversion Rate** | >3% | N/A | 3.7% (travel/leisure) |
| **Mobile Traffic** | 80-85% | ~77% | 77% |

**Evidence:** SEMrush AllTrails data (Aug 2025), Google Analytics industry benchmarks, Invesp conversion research

### High-Demand Filter Combinations (SEO Canonical Strategy)

Based on WV tourism data + WVDNR hunting outlook:

| Filter Combo | Search Intent | Canonical Strategy | Priority |
|--------------|---------------|-------------------|----------|
| **Hunting + Moderate + Fall** | "Hunting spots with good mast 2025" | ✅ Index as anchor facet | 🔴 HIGH |
| **Hiking + Easy + Waterfall** | "Easy waterfall hikes near me" | ✅ Index (Blackwater Falls capture) | 🔴 HIGH |
| **Hiking + Dog-friendly** | "Dog friendly trails New River Gorge" | ✅ Index (top trending modifier) | 🔴 HIGH |
| **Fishing + I-79 Corridor** | "Central WV fishing near I-79" | ✅ Index (geographic SEO) | 🟡 MEDIUM |
| **ATV + Easy** | "Beginner ATV trails Hatfield McCoy" | ✅ Index (fastest-growing segment) | 🟡 MEDIUM |
| **Wheelchair + Paved** | "WV accessible nature trails" | ✅ Index (accessibility priority) | 🟡 MEDIUM |

**Anchor Facet Rule:** Only index `Activity + Difficulty` OR `Activity + Location`. Don't index 3+ filter combos (canonicalize to 2-filter version).

**"Near I-79" Strategy:** Create dedicated filter/landing page for I-79 corridor adventures (Exits 57-155).

### Predicted "Power Pages" for WVWO

**Tier 1 (4+ min session, 4%+ conversion):**

- New River Gorge Whitewater Rafting (adventure activities get 2x session duration)
- Blackwater Falls Easy Trail (Great Smoky pattern - easy + iconic)
- Seneca Rocks Climbing (niche = low bounce <30%)
- Dog-Friendly Trails I-79 (AllTrails top secondary filter)

**Tier 2 (2-3 min session, 2-3% conversion):**

- Sutton Lake Fishing (central location performs well)
- Coopers Rock Overlook (wheelchair accessible = broader audience)
- Fall Foliage Scenic Drives (Oct-Nov seasonal spike)

**Tier 3 (<1 min session, <1% conversion):**

- Generic "All Adventures" hub (choice paradox, 61% bounce)
- Extreme multi-day backpacking (ultra-niche, <12k annual visitors pattern)

**Default Sorting:** "Most Popular" (NOT alphabetical) - AllTrails strategy confirmed by staff

### GA4 Conversion Events (Track from Day 1)

**Set up these Key Events:**

1. `adventure_view` - User views adventure page
2. `filter_applied` - User clicks any filter
3. `map_download` - User clicks download (highest intent signal per AllTrails)
4. `get_directions` - User clicks directions (medium intent)
5. `newsletter_signup` - Email capture (conversion goal)
6. `phone_call_click` - Tap phone number on mobile (highest commercial intent)

**Target Conversion Funnel:**

- Homepage → `/adventures`: 50% click-through
- Filter Hub → Apply filter: 40% interaction rate
- Filtered Results → Detail page: 30% click-through
- Detail Page → Download/Directions: 5% conversion

---

## 🧠 AgentDB Context Loading (REQUIRED FIRST STEP)

### Load These Patterns (Parallel Execution)

```bash
# Run ALL of these in PARALLEL (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context
npx agentdb@latest reflexion retrieve "SPEC-06 content collections" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "getCollection adventures schema" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "vanilla JS filtering" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "hub pages SEO" --k 10 --synthesize-context
npx agentdb@latest skill search "shop filtering vanilla JavaScript" 5
npx agentdb@latest skill search "adventures collection schema" 5
npx agentdb@latest skill search "hub page structure CollectionPage" 5

```

**Why:** SPEC-06 provides real Content Collections schema - query adventures, don't hardcode data. The shop/index.astro filtering pattern is proven and reusable.

**Context**: AgentDB has 125 episodes (8 new from SPEC-05/06: episodes 118-125 with pivot patterns).

---

## 👥 Agent Roles & Responsibilities

### 1️⃣ Scout Agents (2 agents, parallel)

**Scout 1: Shop Filtering Analysis**

- **Read:** `wv-wild-web/src/pages/shop/index.astro` (lines 207-330)
- **Extract:**
  - Vanilla JS filtering pattern (no React, no frameworks)
  - Data attribute naming convention (`data-product`, `data-category`, etc.)
  - URL param sync strategy (`URLSearchParams`)
  - Idempotency guard (`dataset.filtersInit`)
  - Empty state handling
  - ViewTransitions cleanup pattern
- **Store in AgentDB:**

  ```bash
  npx agentdb@latest reflexion store "spec07-scout" "shop-filtering-pattern" 1.0 true "Vanilla JS with data attrs, URL sync, idempotent init"
  ```

**Scout 2: Hub Page Structure Analysis**

- **Read:** `wv-wild-web/src/pages/near/index.astro`
- **Extract:**
  - Hero section structure (badge + title + description)
  - Section organization pattern (grouped by type)
  - Card design (border-left accent, badge, drive time)
  - CollectionPage schema setup
  - Breadcrumb integration
  - CTA section pattern ("Stop By Before You Head Out")
- **Store in AgentDB:**

  ```bash
  npx agentdb@latest reflexion store "spec07-scout" "hub-page-structure" 1.0 true "Hero + grouped sections + CollectionPage schema + CTA"
  ```

### 2️⃣ Architect Agents (2 agents, parallel)

**Architect 1: Code Architecture (code-architect agent)**

- **Inputs:** Scout 1 findings + SPEC-06 schema fields + Research findings (React + Context API)
- **Design:**
  1. **Filter state management** (React Context API - 5 independent axes with AND intersection)
  2. **Data-driven filter config** (`adventures-filters.config.ts` - extensibility requirement)
  3. **React component architecture:**

     ```typescript
     // adventures-filters.config.ts (data-driven, axis-agnostic)
     export const filterConfig = [
       {
         id: 'season',
         label: 'Season',
         type: 'multi-select',
         schemaField: 'season', // Maps to adventure.data.season[]
         options: [
           { value: 'spring', label: 'Spring' },
           { value: 'summer', label: 'Summer' },
           { value: 'fall', label: 'Fall' },
           { value: 'winter', label: 'Winter' },
         ],
       },
       {
         id: 'difficulty',
         label: 'Difficulty',
         type: 'radio',
         schemaField: 'difficulty', // Maps to adventure.data.difficulty
         options: [
           { value: 'easy', label: 'Easy' },
           { value: 'moderate', label: 'Moderate' },
           { value: 'challenging', label: 'Challenging' },
           { value: 'rugged', label: 'Rugged' },
         ],
       },
       // Axes 4-6 added here = config change, NOT code refactor
     ];
     ```

  4. **React Context Provider structure:**
     - FilterContext (filter state + setters)
     - URL state sync (bidirectional with URLSearchParams)
     - Filter reducer (generic, accepts any config)
  5. **Mobile UI** (shadcn Sheet component - bottom drawer pattern from research)
  6. **WCAG 2.1 AA requirements:**
     - `<fieldset>` + `<legend>` for each filter group
     - `role="region" aria-live="polite"` on results counter
     - 44×44px minimum touch targets (NOT Material Design 32px)
     - No nested interactive controls
  7. **URL param naming** (`?season=fall&difficulty=moderate&gear=hunting,fishing`)
  8. **ViewTransitions cleanup strategy** (React useEffect cleanup)
- **Output:** React component architecture diagram + filter config schema + pseudocode

**Architect 2: Hub Page Design (planner agent)**

- **Inputs:** Scout 2 findings + 70+ destinations requirement
- **Design:**
  1. Hero section (WVWO voice: "Your Mountain State Adventure Headquarters")
  2. Filter controls layout (sticky sidebar on desktop, collapse on mobile)
  3. Adventure grid layout (responsive, 2-col mobile → 3-col desktop)
  4. Section grouping strategy (filter results by type: WMA, Lake, River, etc.)
  5. Empty state messaging (Kim's voice: "Hmm, nothing matches. Try widening your filters.")
  6. CollectionPage schema for all 70+ destinations
  7. Breadcrumb: Home → Adventures
- **Output:** Component tree + content structure

### 3️⃣ Implementation (coder agent)

**Inputs:** Both architect outputs + scout code references + Research architecture (React + Context API)

**Tasks:**

1. **Create data-driven filter config** (`src/config/adventures-filters.config.ts`)
   - Define 5 filter axes as JSON config (extensibility requirement from research)
   - Each axis: id, label, type, schemaField, options, ariaLabel
   - Generic structure allows adding axes 6+ without code refactor

2. **Build React Filter Component** (`src/components/adventures/AdventuresFilter.tsx`)
   - React Context Provider for filter state
   - URL state sync (bidirectional with URLSearchParams)
   - Generic filter reducer (axis-agnostic, consumes config)
   - Desktop: Horizontal filter bar with dropdowns (AllTrails pattern)
   - Mobile: shadcn Sheet component (bottom drawer, non-modal)
   - WCAG 2.1 AA compliance:
     - `<fieldset>` + `<legend>` for each filter group
     - `role="region" aria-live="polite"` on results counter
     - 44×44px minimum touch targets
     - No nested interactive controls
   - ViewTransitions cleanup (React useEffect)

3. **Create page structure** (`src/pages/adventures/index.astro`)
   - Copy hero pattern from `/near/index.astro`
   - Add breadcrumb + CollectionPage schema
   - Query `getCollection('adventures')` from SPEC-06
   - Pass adventures data to React island as props
   - Render React island: `<AdventuresFilter client:load adventures={adventures} />`

4. **Create adventure cards** (Astro component, rendered by React)
   - Card design: border-left accent, type badge, season badges
   - Activities/gear list (icons or text)
   - Best seasons indicator
   - "Learn More" link to detail page
   - Match WVWO aesthetic (rounded-sm, brand colors)

5. **Empty state component** (`src/components/adventures/EmptyState.tsx`)
   - Kim's voice: "Hmm, nothing matches those filters. Try widening your search - or give us a call. We know spots that aren't on any list."
   - "Clear Filters" button
   - "Call Us: (304) 649-5765" CTA
   - "Grand love ya!" in font-hand

6. **Cloudflare deployment files**
   - Create `public/_headers` (cache rules from research)
   - Create `src/service-worker.js` (offline filtering skeleton)
   - Add Service Worker registration to Layout.astro

7. **SEO & Schema**
   - CollectionPage schema listing all 70+ destinations
   - Meta description: "70+ outdoor destinations near I-79 Exit 57..."
   - Breadcrumb schema
   - Self-referencing canonical tag

**Code Style:**

- WVWO aesthetic (CLAUDE.md guidelines)
  - rounded-sm (NEVER rounded-md/lg)
  - brand-brown, sign-green, brand-cream palette
  - font-display (Bitter), font-hand (Permanent Marker)
  - 44×44px touch targets (research requirement)
- React + TypeScript for filter component
- shadcn/ui with WVWO overrides
- motion-safe: prefix for animations
- Kim's voice for empty states

**Output:**

- `src/pages/adventures/index.astro` (page)
- `src/components/adventures/AdventuresFilter.tsx` (React island)
- `src/config/adventures-filters.config.ts` (config)
- `public/_headers` (Cloudflare cache)
- `src/service-worker.js` (offline support)

---

## 📐 Technical Specifications (UPDATED: React Architecture)

### Multi-Axis Filter Logic (React + Context API)

```typescript
// Pseudocode (React Context + generic reducer)
interface FilterState {
  season: string[];      // Multi-select: ['spring', 'fall']
  difficulty: string[];  // Radio (array for consistency): ['moderate']
  gear: string[];        // Multi-select: ['hunting', 'fishing']
  // Axes 4-6 added here = config change only
}

function filterReducer(state: FilterState, action: FilterAction) {
  // Generic reducer - consumes filterConfig, not hardcoded axes
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, [action.axisId]: action.value };
    case 'CLEAR_ALL':
      return initialState;
  }
}

function applyFilters(adventures: Adventure[], filters: FilterState) {
  return adventures.filter(adventure => {
    let show = true;

    // Season filter (OR logic within axis - match ANY selected)
    if (filters.season.length > 0) {
      show = filters.season.some(s =>
        adventure.data.season.includes(s) ||
        adventure.data.season.includes('year-round')
      );
    }

    // Difficulty filter (exact match)
    if (show && filters.difficulty.length > 0) {
      show = filters.difficulty.includes(adventure.data.difficulty);
    }

    // Gear/Activity filter (OR logic - match ANY selected)
    if (show && filters.gear.length > 0) {
      show = filters.gear.some(g => adventure.data.gear?.includes(g));
    }

    // Combined: AND intersection across axes
    return show;
  });
}

// URL sync (bidirectional)
function syncToURL(filters: FilterState) {
  const params = new URLSearchParams();
  if (filters.season.length) params.set('season', filters.season.join(','));
  if (filters.difficulty.length) params.set('difficulty', filters.difficulty.join(','));
  if (filters.gear.length) params.set('gear', filters.gear.join(','));

  const newUrl = params.toString() ? `?${params.toString()}` : '/adventures/';
  window.history.pushState({}, '', newUrl);
}

function loadFiltersFromURL(config: FilterConfig): FilterState {
  const params = new URLSearchParams(window.location.search);
  // Generic: reads any axes from config
  return config.reduce((state, axis) => {
    const value = params.get(axis.id);
    state[axis.id] = value ? value.split(',') : [];
    return state;
  }, {});
}
```

### React Component Structure

```tsx
// AdventuresFilter.tsx (React island)
<FilterProvider config={filterConfig}>
  <div className="adventures-hub">
    {/* Desktop: Horizontal filter bar */}
    <FilterBar className="hidden md:flex" />

    {/* Mobile: Bottom sheet drawer */}
    <MobileFiltersSheet />

    {/* Results */}
    <FilteredAdventureGrid />

    {/* Results counter (ARIA live region) */}
    <ResultsCount role="region" aria-live="polite" />
  </div>
</FilterProvider>
```

### URL Param Strategy (Research-Validated SEO)

```
# No filters
/adventures/

# Single filter
/adventures/?season=fall

# Multiple values in one axis
/adventures/?season=spring,summer,fall

# Multiple axes (AND intersection)
/adventures/?season=fall&difficulty=moderate&gear=hunting,fishing

# Canonical tag strategy:
# - High-demand combos: self-referencing canonical
# - Low-demand combos: noindex, follow
# - Requires search demand data from Google Analytics
```

**SEO-friendly:** Google can crawl and index filter states via query parameters (NOT hash fragments).

---

## 🎨 WVWO Aesthetic Requirements

### Voice (Kim's Tone)

```
Hero: "Your Mountain State Adventure Headquarters"
Subhead: "From calm lake mornings to steep ridge hunts, we've mapped 70+ places worth the drive."

Empty state: "Hmm, nothing matches those filters. Try widening your search - or give us a call. We know spots that aren't on any list."

```

### Design Tokens

- Hero: `bg-brand-brown text-white` with camo texture overlay
- Filter controls: `bg-brand-cream border-brand-mud/30`
- Adventure cards: `bg-white border-l-4 border-l-sign-green`
- Type badges: `bg-sign-green text-white` (WMA), `bg-brand-brown text-brand-cream` (Lake)
- Distance badges: `text-sign-green font-bold`
- Corners: `rounded-sm` (NEVER rounded-md/lg)

### Typography

- Display: `font-display font-black` (Bitter)
- Body: `font-body` (Noto Sans)
- Handwritten accents: `font-hand` (Permanent Marker) for Kim's voice

---

## ✅ Definition of Done (UPDATED: React + Cloudflare)

### Functional

- [ ] 5-axis filtering works independently and combined (Season, Difficulty, Gear, Elevation*, Suitability*)
- [ ] URL params sync on filter change (shareable links)
- [ ] "Clear All Filters" resets React state + URL
- [ ] Results count updates in real-time with ARIA live region announcement
- [ ] Empty state shows with Kim's voice when no matches
- [ ] ViewTransitions cleanup prevents duplicate listeners (React useEffect)
- [ ] Works with client-side navigation (no page reload)
- [ ] Offline filtering works when connection drops (Service Worker)

### Content

- [ ] Real adventures from `getCollection('adventures')` (SPEC-06)
- [ ] Test with `spring-gobbler-burnsville.md` (first real adventure)
- [ ] Kim's voice in hero, empty states, and filter help text
- [ ] CollectionPage schema with all 70+ destinations
- [ ] Breadcrumb schema (Home → Adventures)
- [ ] "Grand love ya!" in appropriate places (font-hand)

### Performance

- [ ] React island hydrates successfully (client:load)
- [ ] Filter response time: 100-150ms (acceptable per research)
- [ ] No layout shift on filter apply
- [ ] Service Worker caches adventures data
- [ ] Cloudflare edge cache hit ratio >90%
- [ ] Mobile bottom sheet opens/closes smoothly (<200ms animation)
- [ ] **Bundle sizes verified:** Each React island <95 KB gzipped (research target)
- [ ] **HTTP/2 Push verified:** `curl -I` shows `cf-h2-pushed` header
- [ ] **Code splitting:** Multiple islands load in parallel (not single 500KB bundle)

### Aesthetic (WVWO Compliance)

- [ ] WVWO design system colors (brand-brown, sign-green, brand-cream)
- [ ] rounded-sm corners (NEVER rounded-md/lg on shadcn overrides)
- [ ] Border-left accent cards (border-l-4 border-l-sign-green)
- [ ] Mobile-first responsive (1-col → 2-col → 3-col)
- [ ] motion-safe: animations
- [ ] 44×44px touch targets (research requirement)
- [ ] font-display (Bitter) for headings, font-hand (Permanent Marker) for Kim's voice

### Code Quality

- [ ] Data-driven filter config (adventures-filters.config.ts)
- [ ] Generic filter reducer (axis-agnostic)
- [ ] WCAG 2.1 AA compliant (fieldset+legend, ARIA live regions, 44px targets)
- [ ] No nested interactive controls (WCAG violation)
- [ ] Comments explain multi-axis logic
- [ ] ViewTransitions cleanup in React useEffect
- [ ] TypeScript types for filter config

### Deployment (Cloudflare-Specific)

- [ ] `public/_headers` file created with cache rules + HTTP/2 Push Link headers
- [ ] HTTP/2 Push configured for React island bundles (saves 230ms on 3G)
- [ ] `src/service-worker.js` created (offline filtering)
- [ ] Service Worker registered in Layout.astro
- [ ] Vite terser minification enabled (drop_console, mangle)
- [ ] Bundle sizes audited: `du -sh dist/_astro/*.js` (all <95 KB gzipped)
- [ ] Code splitting verified: Multiple islands (not single large bundle)
- [ ] Deployed to Cloudflare Pages via `wrangler pages deploy dist/`
- [ ] Argo Smart Routing enabled ($5/month, 33% TTFB improvement)
- [ ] Cache headers verified via curl
- [ ] HTTP/2 Push verified: `curl -I | grep cf-h2-pushed`
- [ ] Google Analytics 4 Core Web Vitals tracking enabled

### Post-Launch Monitoring (4 Weeks)

- [ ] TTFB tracked (target <600ms on 3G)
- [ ] LCP tracked (target <2.5s)
- [ ] Filter interaction rate monitored
- [ ] Bounce rate on /adventures/ monitored (target <40%)
- [ ] Decision logged: Keep React client-side OR add Workers (SPEC-08)

---

## 🔗 Reference Files (Must Read)

### REQUIRED Reading

1. `wv-wild-web/src/content.config.ts` (SPEC-06 schema)
   **Why:** Adventures collection schema - real fields available to query (season[], difficulty, location, coordinates, gear[])

2. `wv-wild-web/src/content/adventures/spring-gobbler-burnsville.md` (SPEC-06 example)
   **Why:** First real adventure entry - use as test case for filtering

3. `wv-wild-web/src/pages/shop/index.astro` (lines 207-330)
   **Why:** Proven vanilla JS filtering pattern, URL sync, idempotency

4. `wv-wild-web/src/pages/near/index.astro`
   **Why:** Hub page structure, CollectionPage schema, card design

### Aesthetic Reference

1. `CLAUDE.md` (WVWO Frontend Aesthetics section)
   **Why:** Voice, colors, typography, design constraints

2. `docs/WVWO_FRONTEND_AESTHETICS.md`
   **Why:** Detailed aesthetic guidelines, litmus tests

---

## 🧪 Testing Checklist

### Manual Testing

- [ ] Filter by single activity (hiking) → correct results
- [ ] Filter by multiple activities (hiking + fishing) → OR logic works
- [ ] Filter by season (fall) → respects year-round destinations
- [ ] Filter by distance (15-30mi) → correct bucket
- [ ] Combine all three axes → correct intersection
- [ ] Clear filters → all adventures visible
- [ ] URL params populate filters on page load
- [ ] Shareable link works (copy URL with filters, open in new tab)
- [ ] Mobile: filters accessible and functional
- [ ] Desktop: sticky filter sidebar (if designed)

### Edge Cases

- [ ] No adventures match filters → empty state shows
- [ ] All filters cleared → full list returns
- [ ] URL param with invalid value → gracefully ignored
- [ ] ViewTransitions navigation → no duplicate listeners
- [ ] localStorage unavailable → filtering still works (no persistence needed)

---

## 📊 AgentDB Storage Protocol (UPDATED)

### During Implementation

**After creating filter config:**

```bash
npx agentdb@latest reflexion store "spec07-impl" "data-driven-filter-config" 1.0 true "Created adventures-filters.config.ts with 5 axes as JSON. Generic structure prevents rewrites when adding axes 6+. Estimated 40+ hours saved per new axis."
```

**After building React filter component:**

```bash
npx agentdb@latest reflexion store "spec07-impl" "react-context-filtering" 1.0 true "React Context API + generic reducer + URLSearchParams sync. shadcn Sheet for mobile (bottom drawer). WCAG 2.1 AA compliant with 44px touch targets, ARIA live regions, fieldset+legend."
```

**After Cloudflare deployment:**

```bash
npx agentdb@latest reflexion store "spec07-impl" "cloudflare-pages-deployment" 1.0 true "Deployed to Cloudflare Pages with _headers cache rules, Service Worker for offline filtering, Argo Smart Routing enabled ($5/month). Total cost $20-25/month."
```

**After completing page:**

```bash
npx agentdb@latest reflexion store "spec07-impl" "adventures-hub-complete" 1.0 true "5-axis filtering (Season, Difficulty, Gear, Elevation, Suitability), React + Astro islands, CollectionPage schema, WVWO aesthetic, offline-first with Service Worker."
```

### If Blockers Occur

**Example: React island hydration issues**

```bash
npx agentdb@latest reflexion store "spec07-impl" "react-island-hydration-blocker" 0.0 false "React island not hydrating with Astro ViewTransitions. Solution: Add cleanup in useEffect with astro:before-swap listener."
```

**Example: Performance <50ms infeasible**

```bash
npx agentdb@latest reflexion store "spec07-impl" "performance-target-adjustment" 1.0 true "Research validated: <50ms not achievable at 70 items + 5 axes without pagination. Relaxed to 100-150ms (acceptable per UX standards). Added debouncing (300ms) + pagination option."
```

---

## 🚀 Execution Flow

### Step 1: Context Loading (Parallel)

```bash
# All scouts run in PARALLEL
npx agentdb@latest reflexion retrieve "vanilla JS filtering" --k 10 --synthesize-context
npx agentdb@latest skill search "shop filtering vanilla JavaScript" 5
npx agentdb@latest skill search "hub page structure CollectionPage" 5

```

### Step 2: Scout Phase (Parallel)

- Scout 1 reads `shop/index.astro` (filtering logic)
- Scout 2 reads `/near/index.astro` (hub structure)
- Both store findings in AgentDB

### Step 3: Architect Phase (Parallel)

- Architect 1 designs filter architecture
- Architect 2 designs hub page layout
- Both output design artifacts

### Step 4: Implementation (Sequential)

- Coder reads architect outputs
- Builds page following Foundation Pattern
- Tests triple-axis filtering
- Validates WVWO aesthetic
- Stores success patterns in AgentDB

### Step 5: Validation

- Manual testing checklist
- Edge case verification
- AgentDB pattern consolidation

---

## 📝 Implementation Notes (UPDATED: React Architecture)

### Data-Driven Config Pattern (Extensibility Foundation)

- **Create** `adventures-filters.config.ts` with all 5 axes defined as JSON
- **Generic reducer** that consumes config (NOT hardcoded axis logic)
- **Adding axis 6+:** Append to config array, NOT JSX refactor
- **Estimated rewrite prevention:** 40+ hours saved per new axis (from research)

### Multi-Axis Filter Logic (Research-Validated)

- **Season:** OR logic within axis (match ANY selected: spring OR summer OR fall)
- **Difficulty:** OR logic within axis (easy OR moderate OR challenging)
- **Gear/Activities:** OR logic within axis (match ANY selected)
- **Combined:** AND intersection ACROSS axes (season AND difficulty AND gear)
- **Special case:** Year-round adventures always match season filter

### Mobile UI Pattern (Research: Bottom Sheet Consensus)

- **Desktop:** Horizontal filter bar with dropdowns (AllTrails pattern)
- **Mobile:** shadcn Sheet component (bottom drawer, slides from bottom)
- **Filter groups:** Accordion-style collapsible inside drawer
- **Touch targets:** 44×44px minimum (NOT Material Design 32px)
- **Apply button:** Sticky at bottom of drawer (always visible)
- **Accessibility:** Swipe-to-dismiss + visible X button

### React Island Integration with Astro

- **Pattern:** Astro queries `getCollection('adventures')` in frontmatter
- **Pass to island:** `<AdventuresFilter client:load adventures={adventures} />`
- **Hydration:** React takes over filtering client-side
- **ViewTransitions:** React useEffect cleanup on `astro:before-swap`
- **Offline:** Service Worker caches adventure data for offline filtering

### Future-Proofing (Research: Extensibility Checklist)

- ✅ Filter config externalized (adding axis = config change, not code refactor)
- ✅ Generic filter reducer (axis-agnostic logic)
- ✅ URL state sync is config-driven (auto-generates params from config)
- ✅ ARIA labels auto-generated from config (accessibility scales)
- ✅ Mobile drawer accommodates unlimited filter groups (scrollable accordion)
- ✅ Performance metrics configurable (debounce timing, pagination size)
- ✅ Test coverage includes "adding new axis" scenario

---

## 🎓 Learning Outcomes (Store in AgentDB)

After completing this spec, you will have learned:

1. **React + Context API filtering architecture** (data-driven, extensible)
2. **Multi-axis filter logic** (5 independent axes with AND intersection)
3. **Astro + React islands integration** (server-render data, client-side interactivity)
4. **Cloudflare Pages deployment** (edge caching, Service Workers, Argo Smart Routing)
5. **WCAG 2.1 AA compliance** (ARIA live regions, 44px touch targets, focus management)
6. **Data-driven extensibility patterns** (config-driven architecture prevents rewrites)
7. **Hub page architecture** (CollectionPage schema + grouped content)
8. **URL param state management** (bidirectional sync, shareable, SEO-friendly)
9. **WVWO aesthetic application** (voice, colors, components, shadcn overrides)
10. **Offline-first web apps** (Service Worker + IndexedDB for rural connectivity)

**Consolidate patterns:**

```bash
npx agentdb@latest skill consolidate 3 0.8 7 true
```

---

## ❓ Clarification Protocol

**If uncertain, ASK before deciding:**

- "Should activity filters be AND or OR logic?" → **OR** (match ANY selected)
- "Should distance be free text or buckets?" → **Buckets** (0-15, 15-30, 30-60, 60+)
- "Do we need accessibility labels?" → **YES** (aria-label, screen reader text)
- "What if no adventures match?" → **Show empty state** (Kim's voice, Clear Filters CTA)

**Store clarifications:**

```bash
npx agentdb@latest reflexion store "spec07-clarify" "<question>" 1.0 true "<answer>"

```

---

## 🔚 Completion Criteria (UPDATED: Research-Validated)

### You're done when

1. ✅ `/adventures/` page loads with hero + React filter island + adventure grid
2. ✅ All 5 filter axes work independently (Season, Difficulty, Gear, Elevation*, Suitability*)
3. ✅ Combined filters use AND intersection across axes
4. ✅ URL params sync bidirectionally (URL → state → URL)
5. ✅ Empty state shows with Kim's voice ("Grand love ya!")
6. ✅ CollectionPage schema references 70+ destinations
7. ✅ WVWO aesthetic matches existing pages (rounded-sm, brand colors, 44px touch targets)
8. ✅ WCAG 2.1 AA compliant (ARIA live regions, no nested controls)
9. ✅ Cloudflare deployment complete (_headers, Service Worker, Argo enabled)
10. ✅ Manual testing checklist complete (including offline mode test)
11. ✅ Google Analytics 4 tracking enabled (Core Web Vitals)
12. ✅ Patterns stored in AgentDB

**Final storage:**

```bash
npx agentdb@latest reflexion store "spec07-complete" "adventures-hub-react-filtering" 1.0 true "Full specification: React + Context API, 5-axis filtering (Season/Difficulty/Gear/Elevation/Suitability), data-driven config (extensible), Cloudflare Pages deployment with Service Worker offline support, WCAG 2.1 AA compliant, WVWO aesthetic, CollectionPage schema. Performance: 100-150ms filter response (research-validated). Cost: $20-25/month."
npx agentdb@latest skill consolidate 3 0.8 7 true
```

### Post-Launch Success Criteria (4 Weeks)

**Monitor and decide:**

- ✅ Filter interaction rate >30% of visitors
- ✅ Bounce rate <40% on `/adventures/`
- ✅ TTFB <600ms on 3G (Cloudflare + Argo)
- ✅ No accessibility violations (manual screen reader audit)
- ✅ Cache hit ratio >90% (Cloudflare Analytics)

**Decision point for SPEC-08:**

- **IF** filter latency >200ms AND bounce >40% → Add Workers pre-rendering
- **ELSE** keep client-side React (simpler, maintainable)

---

**Ready to implement? Load context, run scouts, architect, build. Grand love ya!** 🦌🏔️
