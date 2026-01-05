# SPEC-08 Content Ops: Adventure Card Component

**Type:** Code/Design (React component)
**Workflow:** Traditional software development (design → code → Kim design review)
**Timeline:** 8-10 hours (Matt), 15 min (Kim)

---

## Matt's Workflow (Code-Focused)

### **Phase 1: Research Existing Patterns** (1 hour)

**Scout Mission:**

```bash
# Analyze ProductCard pattern
Read wv-wild-web/src/components/ProductCard.astro

# Check grid layouts
Read wv-wild-web/src/pages/shop/index.astro (product grid)

# Verify WVWO aesthetic patterns
Read CLAUDE.md (Frontend Aesthetics section)
```

**Extract:**

- Border-left accent pattern (border-l-4 border-l-sign-green)
- Hover animation (translateY(-2px), border-orange)
- Grid stagger timing (60ms delay per card)
- Typography (font-display for titles)

---

### **Phase 2: Design Component API** (2 hours)

**Architect Mission:**

Design AdventureCard component with these props:

```typescript
interface AdventureCardProps {
  adventure: CollectionEntry<'adventures'>;
  // Displays: title, description, season, difficulty, location, elevation
  // Links to: /adventures/[slug]/
}
```

**Layout Structure:**

- Image (aspect-[4/3], lazy loading)
- Type badge (WMA/Lake/River, bg-sign-green/10)
- Title (font-display, line-clamp-2)
- Description (text-sm, line-clamp-2)
- Metadata row (difficulty + elevation)
- Season tags (pill chips)

**WVWO Aesthetic Compliance:**

- rounded-sm (NOT rounded-md/lg)
- border-l-4 border-l-sign-green
- hover:border-brand-orange
- 44×44px touch target (entire card clickable)

---

### **Phase 3: Implement Component** (4 hours)

**Worker Mission:**

```bash
# Create file
Write wv-wild-web/src/components/adventures/AdventureCard.tsx

# Implement with:
# - TypeScript types from adventures collection
# - WVWO aesthetic (rounded-sm, brand colors)
# - Hover animation (scale-105 on image, border-orange)
# - motion-safe/motion-reduce prefixes
# - Accessibility (alt text, aria-labels)
```

**Code Quality:**

- TypeScript strict mode
- No hardcoded values (use props)
- WVWO litmus tests pass (Neighbor, Voice, Five-Year)

---

### **Phase 4: Test with Real Data** (1 hour)

**Test Checklist:**

```bash
# Build site
npm run build

# Verify:
# - Component renders with spring-gobbler-burnsville adventure
# - Image lazy loads
# - Hover states work
# - Responsive (mobile, tablet, desktop)
# - No TypeScript errors
```

---

## Kim's Input Needed

**Type:** Design review (1-time, 15 minutes)

**When:** After Matt completes component

**Messenger Prompt (Matt sends):**

```
Hi Kim! I built the adventure cards that show on the hub page.

Can you look at this screenshot and tell me:

1️⃣ FEEL: Does this design feel like us? (not too slick/corporate?)

2️⃣ INFO HIERARCHY: What should be bigger/more prominent?
   - Season tags?
   - Difficulty badge?
   - Distance from shop?
   - Elevation gain?

3️⃣ MISSING: Anything you'd want to see on the card that's not there?

[Attach screenshot of card with real adventure data]

No rush - just want your eye on this before I use it for all 70 adventures.

Thanks!
```

**Kim's Response Time:** Within 3-7 days (async, no deadline)

**Matt's Action After Kim Responds:**

- Adjust design based on feedback (1-2 hours)
- Re-screenshot if major changes
- Get Kim's approval
- Lock design, use for all future adventures

---

## Deliverables

**Code:**

- [ ] `wv-wild-web/src/components/adventures/AdventureCard.tsx` (~110 LOC)
- [ ] TypeScript types integrated with adventures collection
- [ ] WVWO aesthetic verified (rounded-sm, brand colors, 44px clickable)

**Documentation:**

- [ ] Component API documented (props, slots, usage examples)
- [ ] Screenshot for Kim review
- [ ] Kim's design approval (via Messenger)

**Quality Gates:**

- [ ] Renders with real adventure data (spring-gobbler-burnsville)
- [ ] Responsive (1-col → 2-col → 3-col grid)
- [ ] Hover states work (border-orange, image scale)
- [ ] Accessibility (alt text, semantic HTML)
- [ ] Kim approves design: "Yeah, that's us"

---

## Success Criteria

**Component is DONE when:**

- ✅ Renders adventures from SPEC-06 collection
- ✅ WVWO aesthetic compliance (all 5 litmus tests pass)
- ✅ Kim design approval ("Feels like us, not corporate")
- ✅ Reusable for all 70 adventures (no hardcoded content)
- ✅ TypeScript compiles with 0 errors
- ✅ Build passes

**Blocked By:** Nothing (SPEC-06 schema complete, SPEC-07 PR #1 has types)

**Blocks:** SPEC-12-20 (templates need AdventureCard to display adventures)

---

**Grand love ya!** 🦌🏔️
