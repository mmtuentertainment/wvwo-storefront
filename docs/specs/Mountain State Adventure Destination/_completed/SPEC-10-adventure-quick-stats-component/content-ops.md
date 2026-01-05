# SPEC-10 Content Ops: Adventure Quick Stats Component

**Type:** Code/Design (Astro component)
**Workflow:** Traditional software development (analyze → design → code)
**Timeline:** 6-8 hours (Matt), NO Kim input needed (data-display component)

---

## Matt's Workflow (Code-Focused)

### **Phase 1: Analyze Existing Stats Pattern** (1 hour)

**Scout Mission:**

```bash
# Read Summersville Lake stats section
Read wv-wild-web/src/pages/near/summersville-lake.astro (lines 95-116)

# Verify pattern in other pages
Read wv-wild-web/src/pages/near/sutton-lake.astro (stats section)
```

**Extract:**

- 4-column grid (grid-cols-2 md:grid-cols-4)
- Icon + value + label structure
- Center-aligned text
- Large font-display for values
- Small font-body for labels
- sign-green icons

---

### **Phase 2: Design Component API** (1.5 hours)

**Architect Mission:**

Design AdventureQuickStats.astro with flexible data:

```typescript
interface StatItem {
  label: string;      // "Lake Size"
  value: string;      // "2,790 acres"
  icon?: string;      // Optional SVG icon
}

interface Props {
  stats: StatItem[];  // Array of 2-6 stats
}
```

**Example Usage:**

```astro
<AdventureQuickStats
  stats={[
    { label: "Distance from Shop", value: "30 min", icon: "map-pin" },
    { label: "Difficulty", value: "Moderate", icon: "trending-up" },
    { label: "Best Season", value: "Spring", icon: "leaf" },
    { label: "Elevation Gain", value: "1,450 ft", icon: "mountain" },
  ]}
/>
```

**WVWO Compliance:**

- Responsive grid (2-col mobile, 4-col desktop)
- Typography: font-display font-bold for values, text-brand-mud/60 for labels
- Icons: sign-green color, simple inline SVG

---

### **Phase 3: Implement Component** (3 hours)

**Worker Mission:**

```bash
# Create file
Write wv-wild-web/src/components/adventures/AdventureQuickStats.astro

# Implement:
# - Responsive grid (grid-cols-2 md:grid-cols-4)
# - Map stats array to stat items
# - Optional icon rendering (if provided)
# - Typography hierarchy (large values, small labels)
# - Center-aligned text (text-center)
```

**Code Structure:**

```astro
---
const { stats } = Astro.props;
---

<section class="py-8 md:py-12 bg-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div class="text-center space-y-2">
          {stat.icon && (
            <!-- Icon SVG -->
          )}
          <p class="text-3xl md:text-4xl font-display font-bold text-brand-brown">
            {stat.value}
          </p>
          <p class="text-sm font-body text-brand-mud/60 uppercase tracking-wide">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### **Phase 4: Test & Verify** (1.5 hours)

**Test Scenarios:**

```bash
# Test with 2 stats (mobile scenario)
<AdventureQuickStats stats={[
  { label: "Distance", value: "15 min" },
  { label: "Difficulty", value: "Easy" },
]} />

# Test with 4 stats (desktop scenario)
<AdventureQuickStats stats={[...4 items]} />

# Test with 6 stats (overflow scenario)
# Should wrap to 2 rows on mobile, stay 1 row on desktop
```

**Verify:**

- [ ] Grid responsive (2-col → 4-col)
- [ ] Values large and bold
- [ ] Labels small and muted
- [ ] Icons render correctly (if provided)
- [ ] No layout shift
- [ ] Build passes

---

## Kim's Input Needed

**NONE** - This is a data display component (no design decisions needed)

**Why:**

- Stats are factual (distance, elevation, difficulty)
- Layout follows established WVWO grid pattern
- No Kim's voice content (just numbers/facts)

**IF Kim volunteers feedback:**

- Accept it graciously
- Adjust if reasonable
- But don't actively request review (saves Kim's time)

---

## Deliverables

**Code:**

- [ ] `AdventureQuickStats.astro` (~80 LOC)
- [ ] Flexible stats array API
- [ ] Responsive grid (2-col → 4-col)
- [ ] Optional icon support

**Testing:**

- [ ] Works with 2-6 stats
- [ ] Mobile + desktop verified
- [ ] Typography hierarchy correct

**Quality Gates:**

- [ ] TypeScript compiles
- [ ] Build passes
- [ ] WVWO aesthetic compliant
- [ ] Reusable across all adventure types

---

## Success Criteria

**Component is DONE when:**

- ✅ Accepts any stats array (2-6 items)
- ✅ Responsive grid works
- ✅ Typography matches WVWO design system
- ✅ Can be used in WMA, Lake, River, etc. pages
- ✅ No hardcoded stats (all via props)

**Blocked By:** Nothing

**Blocks:** Adventure detail pages (common UI element)

---

**Grand love ya!** 🦌🏔️
