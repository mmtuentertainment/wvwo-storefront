# SPEC-08 Adventure Card Component - Task Breakdown

**Generated from**: plan.md v1.0.0
**Total Estimated LOC**: ~150
**PR Strategy**: Single PR (under 300 LOC checkpoint)

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                         PHASE 1                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                   │
│  │ Task 1.1 │───▶│ Task 1.2 │───▶│ Task 1.3 │                   │
│  │ Schema   │    │ Types    │    │ Content  │                   │
│  └──────────┘    └──────────┘    └──────────┘                   │
│       │                               │                          │
└───────┼───────────────────────────────┼──────────────────────────┘
        │                               │
        ▼                               ▼
┌───────────────────────┐    ┌─────────────────────────────────────┐
│       PHASE 2         │    │            PHASE 3                  │
│  ┌──────────┐         │    │  ┌──────────┐    ┌──────────┐      │
│  │ Task 2.1 │         │    │  │ Task 3.1 │───▶│ Task 3.2 │      │
│  │DriveTime │         │    │  │ CSS Anim │    │ Card Prop│      │
│  └──────────┘         │    │  └──────────┘    └──────────┘      │
└───────────┬───────────┘    └──────────────────────┬──────────────┘
            │                                       │
            └───────────────────┬───────────────────┘
                                ▼
                    ┌───────────────────────┐
                    │       PHASE 4         │
                    │  ┌──────────┐         │
                    │  │ Task 4.1 │         │
                    │  │Grid Wire │         │
                    │  └──────────┘         │
                    │       │               │
                    │       ▼               │
                    │  ┌──────────┐         │
                    │  │ Task 4.2 │         │
                    │  │  Test    │         │
                    │  └──────────┘         │
                    └───────────────────────┘
```

**Legend**:
- `[S]` = Sequential (depends on previous)
- `[P]` = Parallelizable (can run alongside others)
- `<!-- PR-CHECKPOINT -->` = Consider committing here

---

## Phase 1: Schema & Type Updates

### Task 1.1: Add schema fields to content.config.ts [S]
**File**: `wv-wild-web/src/content.config.ts`
**LOC**: ~8

**Changes**:
```typescript
// Add to adventures schema (after line 48)
drive_time: z.string().optional(),      // e.g., "25 min"
kim_hook: z.string().optional(),         // Kim's personal note (future use)
```

**Acceptance**:
- [ ] `drive_time` field accepts strings like "25 min", "1 hr 15 min"
- [ ] `kim_hook` field accepts optional string
- [ ] Both fields are `.optional()` for backwards compatibility
- [ ] TypeScript compiles without errors

---

### Task 1.2: Update Adventure type in filters.config.ts [S]
**File**: `wv-wild-web/src/lib/adventures/filters.config.ts`
**LOC**: ~4
**Depends on**: Task 1.1

**Changes**:
```typescript
// Update Adventure type to include new fields
export type Adventure = {
  // ... existing fields ...
  data: {
    // ... existing data fields ...
    drive_time?: string;
    kim_hook?: string;
  }
}
```

**Acceptance**:
- [ ] Adventure type includes `drive_time?: string`
- [ ] Adventure type includes `kim_hook?: string`
- [ ] Existing filter logic unchanged
- [ ] TypeScript compiles without errors

---

### Task 1.3: Add drive_time to sample adventure content [P]
**File**: `wv-wild-web/src/content/adventures/spring-gobbler-burnsville.md`
**LOC**: ~2
**Can run parallel to**: Task 1.2 (after 1.1 complete)

**Changes**:
```yaml
# Add to frontmatter
drive_time: "25 min"
```

**Acceptance**:
- [ ] Sample adventure has `drive_time: "25 min"` in frontmatter
- [ ] Content collection still loads without errors
- [ ] `npm run build` passes

---

## Phase 2: Drive Time Display

### Task 2.1: Add drive time badge to AdventureCard [S]
**File**: `wv-wild-web/src/components/adventures/AdventureCard.tsx`
**LOC**: ~20
**Depends on**: Task 1.1, Task 1.2

**Changes**:
1. Import Car icon from Lucide React
2. Add drive time badge above location badge
3. Apply sign-green background with white text
4. Handle missing drive_time gracefully

**Code Addition** (after line 44, before Location Badge):
```tsx
import { Car } from 'lucide-react';

// In component, before Location Badge
{adventure.data.drive_time && (
  <span className="inline-flex items-center gap-1 bg-sign-green text-white text-xs font-bold px-2 py-1 rounded-sm mb-2 mr-2">
    <Car className="w-3 h-3" />
    {adventure.data.drive_time} from shop
  </span>
)}
```

**Acceptance**:
- [ ] Drive time badge displays when `drive_time` field present
- [ ] Badge hidden when `drive_time` field absent
- [ ] Badge uses sign-green background, white text
- [ ] Car icon from Lucide displays at 12x12px
- [ ] Badge text format: "25 min from shop"
- [ ] Mobile responsive (doesn't overflow on 320px)

---

<!-- PR-CHECKPOINT: Schema + Drive Time Badge (Tasks 1.1-2.1) -->
<!-- ~34 LOC - Safe to commit here if needed -->

---

## Phase 3: Stagger Animation

### Task 3.1: Add CSS keyframes for gentle-reveal animation [P]
**File**: `wv-wild-web/tailwind.config.mjs` OR `wv-wild-web/src/styles/global.css`
**LOC**: ~15
**Can run parallel to**: Phase 2

**Changes** (in Tailwind config extend.animation):
```javascript
// tailwind.config.mjs
animation: {
  'gentle-reveal': 'gentle-reveal 0.5s ease-out',
},
keyframes: {
  'gentle-reveal': {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
```

**OR** (in global CSS):
```css
@keyframes gentle-reveal {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-gentle-reveal {
  animation: gentle-reveal 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animate-gentle-reveal {
    animation: none;
  }
}
```

**Acceptance**:
- [ ] `animate-gentle-reveal` class available in Tailwind
- [ ] Animation runs 0.5s ease-out
- [ ] Cards fade in from 10px below
- [ ] Animation disabled when prefers-reduced-motion set

---

### Task 3.2: Add index prop and stagger delay to AdventureCard [S]
**File**: `wv-wild-web/src/components/adventures/AdventureCard.tsx`
**LOC**: ~15
**Depends on**: Task 3.1

**Changes**:
1. Add `index?: number` to AdventureCardProps interface
2. Calculate stagger delay from index
3. Apply inline animation-delay style
4. Add motion-safe:animate-gentle-reveal class

**Code Changes**:
```tsx
// Update interface
interface AdventureCardProps {
  adventure: Adventure;
  index?: number;  // For stagger animation
}

// In component
export const AdventureCard = React.memo(function AdventureCard({
  adventure,
  index = 0
}: AdventureCardProps) {
  const staggerDelay = `${index * 60}ms`;

  return (
    <a
      href={`/adventures/${adventure.id}/`}
      style={{
        animationDelay: staggerDelay,
        animationFillMode: 'both'
      }}
      className="... motion-safe:animate-gentle-reveal"
    >
```

**Acceptance**:
- [ ] `index` prop accepted (optional, defaults to 0)
- [ ] Animation delay = index × 60ms
- [ ] First card: 0ms delay, second: 60ms, third: 120ms, etc.
- [ ] Animation only runs with motion-safe
- [ ] animationFillMode: 'both' prevents flash before animation

---

## Phase 4: Integration & Testing

### Task 4.1: Wire up FilteredGrid to pass index prop [S]
**File**: `wv-wild-web/src/components/adventures/FilteredGrid.tsx`
**LOC**: ~5
**Depends on**: Task 3.2

**Changes**:
```tsx
// In the map function
{filteredAdventures.map((adventure, index) => (
  <AdventureCard
    key={adventure.id}
    adventure={adventure}
    index={index}  // ADD THIS
  />
))}
```

**Acceptance**:
- [ ] Index prop passed to each AdventureCard
- [ ] Grid renders with stagger animation visible
- [ ] Filtering still works correctly

---

### Task 4.2: Manual Testing & Build Verification [S]
**LOC**: 0 (testing only)
**Depends on**: All previous tasks

**Test Checklist**:
- [ ] `npm run build` passes without errors
- [ ] `npm run lint` passes without errors
- [ ] Desktop: Grid loads with visible stagger (60ms between cards)
- [ ] Desktop: Hover changes border green → orange
- [ ] Desktop: Hover scales image to 105%
- [ ] Mobile (320px): Cards fit, no horizontal overflow
- [ ] Mobile: Touch targets ≥44px
- [ ] Motion-reduce: Cards appear instantly, no animation
- [ ] Drive time badge: "25 min from shop" visible on sample card
- [ ] No drive time: Badge hidden on cards without field
- [ ] Focus: Ring visible when tabbing through cards
- [ ] Accessibility: axe DevTools shows 0 critical issues

---

<!-- PR-CHECKPOINT: Full SPEC-08 Implementation -->
<!-- ~150 LOC total - Single PR recommended -->

---

## Summary

| Phase | Tasks | LOC | Parallel? |
|-------|-------|-----|-----------|
| 1: Schema | 1.1, 1.2, 1.3 | ~14 | 1.3 can parallel 1.2 |
| 2: Drive Time | 2.1 | ~20 | Sequential after Phase 1 |
| 3: Animation | 3.1, 3.2 | ~30 | 3.1 can parallel Phase 2 |
| 4: Integration | 4.1, 4.2 | ~5 | Sequential after all |
| **Total** | **7 tasks** | **~69 LOC** | |

**Note**: Original plan estimated ~150 LOC but actual implementation is tighter at ~69 LOC. Well under 300 LOC checkpoint.

---

## Execution Order (Optimal)

```
Sequential: 1.1 → 1.2 → 2.1 → 3.2 → 4.1 → 4.2
Parallel:   1.3 (after 1.1)
            3.1 (anytime after start)
```

**Fastest Path** (with parallelization):
1. Start Task 1.1 (schema) AND Task 3.1 (CSS) in parallel
2. After 1.1: Start 1.2 AND 1.3 in parallel
3. After 1.2: Start 2.1 (drive time badge)
4. After 3.1 + 2.1: Start 3.2 (card animation)
5. After 3.2: Start 4.1 (grid wiring)
6. After 4.1: Run 4.2 (testing)

---

## Ready for Implementation

Run `/speckit.implement` or begin with Task 1.1:
```bash
# Start implementation
code wv-wild-web/src/content.config.ts
```
