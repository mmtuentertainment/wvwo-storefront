# SPEC-07: Adventures Hub with Triple-Axis Filtering - Implementation Prompt

**Phase:** Mountain State Adventure Destination
**Status:** 🚧 READY FOR IMPLEMENTATION
**Output:** `src/pages/adventures/index.astro`
**Pattern:** Foundation Pattern (Scout → Architect → Implement)

---

## 🎯 Mission

Build the Adventures Hub (`/adventures/`) with triple-axis filtering (activity + season + distance) using the proven vanilla JS pattern from `shop/index.astro`. Reuse the hub page structure from `/near/index.astro` for consistent navigation and SEO.

**User Story:** Highway travelers and locals can filter 70+ WV outdoor destinations by what they want to do, when they're visiting, and how far they'll drive - without page reloads.

---

## 🧠 AgentDB Context Loading (REQUIRED FIRST STEP)

### Load These Patterns (Parallel Execution)

```bash
# Run ALL of these in PARALLEL (Opus 4.5 strength)
npx agentdb@latest reflexion retrieve "vanilla JS filtering" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "hub pages SEO" --k 10 --synthesize-context
npx agentdb@latest reflexion retrieve "data attributes filtering" --k 10 --synthesize-context
npx agentdb@latest skill search "shop filtering vanilla JavaScript" 5
npx agentdb@latest skill search "hub page structure CollectionPage" 5
```

**Why:** Avoid reinventing filtering logic. The shop/index.astro pattern is proven, performant, and matches our no-framework constraint.

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
- **Inputs:** Scout 1 findings + triple-axis requirements
- **Design:**
  1. Filter state management (3 independent axes: activity, season, distance)
  2. Data attribute schema for adventure cards
     ```typescript
     // Example:
     data-adventure
     data-activities="hiking,fishing,camping"  // Comma-separated
     data-seasons="spring,summer,fall"         // Comma-separated
     data-distance="15-30"                     // Range bucket
     data-name="Burnsville Lake WMA"
     data-slug="burnsville-lake"
     ```
  3. Filter UI component structure (radio groups for season/distance, checkboxes for activities)
  4. URL param naming (`?activity=hiking&season=fall&distance=15-30`)
  5. Results count + empty state logic
  6. ViewTransitions cleanup strategy
- **Output:** Architecture diagram in memory + pseudocode

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

**Inputs:** Both architect outputs + scout code references

**Tasks:**
1. **Create page structure** (`src/pages/adventures/index.astro`)
   - Copy hero pattern from `/near/index.astro`
   - Add breadcrumb + CollectionPage schema
   - Set up filter controls section
   - Create adventure grid container

2. **Build filter UI (Astro components, no React)**
   - Activity checkboxes (Hiking, Fishing, Hunting, Camping, Skiing, etc.)
   - Season radio buttons (Spring, Summer, Fall, Winter, Year-Round)
   - Distance radio buttons (0-15mi, 15-30mi, 30-60mi, 60+mi)
   - "Clear All Filters" button
   - Results count display

3. **Port shop filtering logic** (vanilla JS, lines 207-330)
   - Adapt `initShopFilters()` to `initAdventureFilters()`
   - Replace category/brand/instock with activity/season/distance
   - Update data attribute selectors
   - Maintain URL param sync
   - Keep idempotency guard
   - Add ViewTransitions cleanup

4. **Create adventure cards**
   - Data attributes for filtering
   - Card design: border-left accent, type badge, distance badge
   - Activities list (icons or text)
   - Best seasons indicator
   - "Learn More" link to detail page
   - Match WVWO aesthetic (rounded-sm, brand colors)

5. **Populate with placeholder data** (10-15 destinations for testing)
   - Use real destinations from existing `/near/` data
   - Add mock activity/season data
   - Calculate distances from shop (use existing driveTime)

6. **Empty states**
   - No results: Kim's voice message + "Clear Filters" CTA
   - No adventures loaded: "We're building this list. Check back soon!"

7. **SEO & Schema**
   - CollectionPage schema listing all destinations
   - Meta description: "70+ outdoor destinations near I-79 Exit 57..."
   - Breadcrumb schema

**Code Style:**
- WVWO aesthetic (CLAUDE.md guidelines)
- Vanilla JS, no React for this page
- Data attributes for filtering
- motion-safe: prefix for animations
- Kim's voice for empty states

**Output:** `src/pages/adventures/index.astro` (complete, tested)

---

## 📐 Technical Specifications

### Triple-Axis Filter Logic

```typescript
// Pseudocode (vanilla JS)
function applyFilters() {
  const selectedActivities = getCheckedValues('[data-filter-activity]:checked');
  const selectedSeason = getCheckedValue('[data-filter-season]:checked');
  const selectedDistance = getCheckedValue('[data-filter-distance]:checked');

  adventures.forEach(adventure => {
    const activities = adventure.dataset.activities.split(',');
    const seasons = adventure.dataset.seasons.split(',');
    const distance = adventure.dataset.distance;

    let show = true;

    // Activity filter (OR logic - match ANY selected activity)
    if (selectedActivities.length > 0) {
      show = selectedActivities.some(a => activities.includes(a));
    }

    // Season filter (exact match)
    if (show && selectedSeason) {
      show = seasons.includes(selectedSeason) || seasons.includes('year-round');
    }

    // Distance filter (exact match)
    if (show && selectedDistance) {
      show = distance === selectedDistance;
    }

    adventure.style.display = show ? '' : 'none';
  });

  updateResultsCount();
  updateURL();
}
```

### Data Attribute Schema

```html
<article
  data-adventure
  data-activities="hiking,fishing,camping"
  data-seasons="spring,summer,fall"
  data-distance="15-30"
  data-type="wma"
  data-name="Burnsville Lake WMA"
  data-slug="burnsville-lake"
>
  <!-- Card content -->
</article>
```

### URL Param Strategy

```
# No filters
/adventures/

# Single filter
/adventures/?activity=hiking

# Multiple activities
/adventures/?activity=hiking,fishing

# Full combination
/adventures/?activity=hiking,fishing&season=fall&distance=15-30
```

**SEO-friendly:** Google can crawl and index filter states.

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

## ✅ Definition of Done

### Functional
- [ ] Triple-axis filtering works independently and combined
- [ ] URL params sync on filter change (shareable links)
- [ ] "Clear All Filters" resets state + URL
- [ ] Results count updates in real-time
- [ ] Empty state shows when no matches
- [ ] ViewTransitions cleanup prevents duplicate listeners
- [ ] Works with client-side navigation (no page reload)

### Content
- [ ] 10-15 placeholder adventures with real data
- [ ] Kim's voice in hero and empty states
- [ ] CollectionPage schema with all destinations
- [ ] Breadcrumb schema (Home → Adventures)

### Performance
- [ ] No React hydration (pure Astro + vanilla JS)
- [ ] Filtering feels instant (<50ms)
- [ ] No layout shift on filter apply

### Aesthetic
- [ ] WVWO design system colors
- [ ] rounded-sm corners (no rounded-md/lg)
- [ ] Border-left accent cards
- [ ] Mobile-first responsive
- [ ] motion-safe: animations

### Code Quality
- [ ] Reuses shop filtering pattern (DRY)
- [ ] Idempotent initialization
- [ ] Data attributes match naming convention
- [ ] Comments explain triple-axis logic
- [ ] ViewTransitions cleanup in place

---

## 🔗 Reference Files (Must Read)

### REQUIRED Reading
1. `wv-wild-web/src/pages/shop/index.astro` (lines 207-330)
   **Why:** Proven vanilla JS filtering pattern, URL sync, idempotency

2. `wv-wild-web/src/pages/near/index.astro`
   **Why:** Hub page structure, CollectionPage schema, card design

### Aesthetic Reference
3. `CLAUDE.md` (WVWO Frontend Aesthetics section)
   **Why:** Voice, colors, typography, design constraints

4. `docs/WVWO_FRONTEND_AESTHETICS.md`
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

## 📊 AgentDB Storage Protocol

### During Implementation

**After porting shop filter logic:**
```bash
npx agentdb@latest reflexion store "spec07-impl" "triple-axis-filtering" 1.0 true "Adapted shop pattern for activity/season/distance axes"
```

**After building filter UI:**
```bash
npx agentdb@latest reflexion store "spec07-impl" "filter-controls-astro" 1.0 true "Checkboxes (activity) + radios (season/distance) no React"
```

**After completing page:**
```bash
npx agentdb@latest reflexion store "spec07-impl" "adventures-hub-complete" 1.0 true "Triple-axis filtering, CollectionPage schema, WVWO aesthetic"
```

### If Blockers Occur

**Example: Filtering logic too complex**
```bash
npx agentdb@latest reflexion store "spec07-impl" "triple-axis-complexity" 0.0 false "Tried nested filters - too confusing. Simplified to independent axes with AND intersection."
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

## 📝 Implementation Notes

### Reuse, Don't Rewrite
- **Copy** `initShopFilters()` function skeleton
- **Adapt** filter logic for triple-axis
- **Keep** URL sync, idempotency, ViewTransitions cleanup

### Triple-Axis Logic
- **Activities:** OR logic (match ANY selected)
- **Season:** Exact match OR "year-round"
- **Distance:** Exact bucket match
- **Combined:** AND intersection across axes

### Mobile Considerations
- Filters collapse to accordion on mobile
- Grid responsive: 1-col → 2-col → 3-col
- Filter controls sticky at top on scroll

### Future-Proofing
- Data attributes allow easy addition of new filters (difficulty, amenities)
- CollectionPage schema supports dynamic destination count
- URL params backward-compatible with single-activity links

---

## 🎓 Learning Outcomes (Store in AgentDB)

After completing this spec, you will have learned:

1. **Vanilla JS filtering patterns** (no framework overhead)
2. **Triple-axis filter logic** (independent + intersection)
3. **Hub page architecture** (CollectionPage schema + grouped content)
4. **URL param state management** (shareable, SEO-friendly)
5. **WVWO aesthetic application** (voice, colors, components)

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

## 🔚 Completion Criteria

### You're done when:

1. ✅ `/adventures/` page loads with hero + filters + grid
2. ✅ All three filter axes work independently
3. ✅ Combined filters use AND intersection
4. ✅ URL params sync on every filter change
5. ✅ Empty state shows with Kim's voice
6. ✅ CollectionPage schema references 70+ destinations
7. ✅ WVWO aesthetic matches existing pages
8. ✅ Manual testing checklist complete
9. ✅ Patterns stored in AgentDB

**Final storage:**
```bash
npx agentdb@latest reflexion store "spec07-complete" "adventures-hub-triple-filtering" 1.0 true "Full implementation: vanilla JS, URL sync, WVWO aesthetic, CollectionPage schema"
npx agentdb@latest skill consolidate 3 0.8 7 true
```

---

**Ready to implement? Load context, run scouts, architect, build. Grand love ya!** 🦌🏔️
