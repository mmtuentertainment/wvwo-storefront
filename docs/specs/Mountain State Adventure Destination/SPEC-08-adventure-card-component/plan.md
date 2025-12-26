# Implementation Plan: Adventure Card Component

**Spec Version:** 1.0.0
**Plan Version:** 1.0.0
**Created:** 2025-12-26
**Architect Input:** 5-Agent Swarm (Conversion, Mobile, Storytelling, InfoArch, Differentiation)

---

## Architecture Overview

SPEC-08 enhances the existing `AdventureCard.tsx` component with two core gaps identified in the spec, plus three "soul enhancements" identified by the architect swarm. The component already exists and is ~90% complete - this plan addresses the remaining gaps.

**Current State**: Functional card with WVWO aesthetic (border-l-4, hover effects, accessibility)
**Target State**: "Kim's Field Guide Card" with proximity anchor, personal voice, and stagger animation

---

## Component Structure

```
wv-wild-web/src/
├── content.config.ts          # [MODIFY] Add kim_hook, drive_time fields
├── content/adventures/
│   └── spring-gobbler-burnsville.md  # [MODIFY] Add new fields
├── lib/adventures/
│   ├── filters.config.ts      # [MODIFY] Update Adventure type
│   └── drive-time.ts          # [CREATE] Utility for calculating drive time
├── components/adventures/
│   └── AdventureCard.tsx      # [MODIFY] Add drive time, stagger animation
└── styles/
    └── adventure-card.css     # [CREATE] Stagger animation keyframes
```

---

## Implementation Phases

### Phase 1: Schema & Type Updates (~60 LOC)

**Goal**: Extend the Adventure content schema with new fields from swarm synthesis.

**Tasks**:
1. Add `drive_time` field to adventures schema in `content.config.ts`
2. Add `kim_hook` field to adventures schema (optional, for future differentiation)
3. Update `Adventure` type in `filters.config.ts` to include new fields
4. Update existing adventure content file with drive_time

**Files Changed**:
- `src/content.config.ts` (+8 LOC)
- `src/lib/adventures/filters.config.ts` (+4 LOC)
- `src/content/adventures/spring-gobbler-burnsville.md` (+2 LOC)

**Schema Addition**:
```typescript
// content.config.ts - Add to adventures schema
drive_time: z.string().optional(),      // e.g., "25 min"
kim_hook: z.string().optional(),         // Kim's personal note (future use)
```

---

### Phase 2: Drive Time Display (~30 LOC)

**Goal**: Display proximity badge on card to reinforce shop as home base.

**Tasks**:
1. Add drive time badge to AdventureCard.tsx (top of content zone)
2. Style with sign-green background matching WVWO aesthetic
3. Include car icon from Lucide
4. Handle missing drive_time gracefully (hide badge)

**Files Changed**:
- `src/components/adventures/AdventureCard.tsx` (+20 LOC)

**UI Addition**:
```tsx
{adventure.data.drive_time && (
  <span className="inline-flex items-center gap-1 bg-sign-green text-white text-xs font-bold px-2 py-1 rounded-sm mb-2 mr-2">
    <Car className="w-3 h-3" />
    {adventure.data.drive_time} from shop
  </span>
)}
```

---

### Phase 3: Stagger Animation (~40 LOC)

**Goal**: Cards fade in with 60ms stagger delay for polished grid reveal.

**Tasks**:
1. Accept `index` prop in AdventureCard (already in spec)
2. Add CSS keyframes for `gentle-reveal` animation
3. Apply inline style with calculated animation delay
4. Wrap in motion-safe media query

**Files Changed**:
- `src/components/adventures/AdventureCard.tsx` (+15 LOC)
- `src/components/adventures/FilteredGrid.tsx` (+5 LOC) - Pass index to card

**Animation Addition**:
```tsx
// AdventureCard.tsx
interface AdventureCardProps {
  adventure: Adventure;
  index?: number;  // For stagger animation
}

// In component
const staggerDelay = index !== undefined ? `${index * 60}ms` : '0ms';

<a
  style={{
    animationDelay: staggerDelay,
    animationFillMode: 'both'
  }}
  className="... motion-safe:animate-gentle-reveal"
>
```

**CSS Addition**:
```css
/* In Tailwind config or global CSS */
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

---

### Phase 4: Integration & Testing (~20 LOC)

**Goal**: Wire up changes and verify functionality.

**Tasks**:
1. Update FilteredGrid.tsx to pass index prop to AdventureCard
2. Test grid renders with stagger animation
3. Verify drive time displays correctly
4. Check motion-reduce respects user preference
5. Build and verify no TypeScript errors

**Files Changed**:
- `src/components/adventures/FilteredGrid.tsx` (+5 LOC)

**Test Checklist**:
- [ ] Grid loads with stagger animation visible
- [ ] motion-reduce disables animation
- [ ] Drive time badge shows when field present
- [ ] Drive time badge hidden when field absent
- [ ] Hover effects still work (border, image scale)
- [ ] Mobile responsive (2-col / 3-col / 4-col)

---

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Drive time storage | String in frontmatter | Simple, human-readable ("25 min"), no runtime calculation needed |
| Animation approach | CSS keyframes | GPU-accelerated, respects prefers-reduced-motion, no JS overhead |
| Index prop | Optional | Maintains backwards compatibility, animation degrades gracefully |
| Kim's Hook field | Add to schema, don't implement UI | Future-ready, low cost, major differentiation opportunity later |

---

## Dependencies

### External
- Lucide React (already installed) - Car icon for drive time badge

### Internal
- `filters.config.ts` - Adventure type must be updated first
- `FilteredGrid.tsx` - Must pass index to cards

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Animation jank on slow devices | Low | Low | GPU-accelerated CSS, motion-reduce fallback |
| Schema change breaks existing content | Low | Medium | All new fields are optional with `.optional()` |
| Drive time badge clutters mobile | Low | Medium | Test at 320px, badge is compact (8 chars) |

---

## PR Strategy

**Estimated Total LOC:** ~150 LOC (well under 300 checkpoint)

**Recommended: Single PR**

Since total is ~150 LOC, a single PR is appropriate:

**PR #1: SPEC-08 Adventure Card Enhancements**
- Schema updates (drive_time, kim_hook fields)
- Type updates (Adventure interface)
- UI: Drive time badge display
- UI: Stagger animation on grid load
- Content: Update sample adventure with drive_time

**Checkpoint triggers:**
- ✅ Under 300 LOC - no warning
- ✅ Single logical change - no split needed

---

## Testing Strategy

### Unit Tests
- N/A (component is simple, tested via integration)

### Integration Tests
- Load `/adventures/` page, verify grid renders
- Check animation runs with stagger
- Check motion-reduce disabled animation
- Verify drive time badge visible

### Manual Testing Checklist
- [ ] Desktop: Grid loads with stagger (60ms visible)
- [ ] Mobile (320px): Cards fit, no overflow
- [ ] Motion-reduce: Cards appear instantly
- [ ] Drive time: "25 min from shop" visible on sample card
- [ ] No drive time: Badge hidden gracefully
- [ ] Hover: Border changes green → orange
- [ ] Hover: Image scales 105%
- [ ] Focus: Ring visible around card
- [ ] Build: `npm run build` passes
- [ ] Lint: `npm run lint` passes

---

## Rollback Plan

**Low Risk**: All changes are additive and optional.

If issues arise:
1. Schema fields are optional - existing content unaffected
2. Animation is CSS-only - remove class to disable
3. Drive time badge has null check - won't break if field missing

**Rollback Steps**:
```bash
# Revert single PR
git revert <commit-hash>
npm run build
```

---

## Future Enhancements (Swarm Recommendations - Not in Scope)

These were identified by the architect swarm for future consideration:

| Enhancement | Effort | Impact | When |
|-------------|--------|--------|------|
| Kim's Hook UI | Low | High | After Kim provides content |
| Hunter terminology seasons | Low | Medium | Phase 2 content sprint |
| Field-first load order | Medium | Medium | If mobile metrics show issues |
| "Kim's Favorites" filter | Medium | Medium | After 10+ favorites tagged |

---

## Summary

| Metric | Value |
|--------|-------|
| Total estimated LOC | ~150 |
| PRs needed | 1 |
| Implementation phases | 4 |
| Risk level | Low |
| Schema changes | 2 new optional fields |
| Component changes | 1 file (AdventureCard.tsx) |

**Ready for**: `/speckit.tasks` to generate task breakdown
