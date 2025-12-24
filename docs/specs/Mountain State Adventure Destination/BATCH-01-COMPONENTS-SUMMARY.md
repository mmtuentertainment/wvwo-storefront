# Batch 1: Components (SPEC-08-11) - Execution Summary

**Specs:** 4 component specs (code-focused)
**Timeline:** 1.5 weeks (36-44 hours Matt, 30-40 min Kim)
**Kim Input:** Design review ONLY (screenshots, not content)

---

## Components Overview

| Spec | Component | Purpose | Matt Time | Kim Input |
|------|-----------|---------|-----------|-----------|
| SPEC-08 | AdventureCard | Grid item for hub | 8-10 hrs | 15 min design review |
| SPEC-09 | AdventureHero | Page header section | 10-12 hrs | 15 min layout review |
| SPEC-10 | QuickStats | Key facts grid | 6-8 hrs | NONE (data display) |
| SPEC-11 | Shared Bundle | GettingThere + GearChecklist + RelatedShop | 12-14 hrs | 10 min (GettingThere only) |

**Total:** 36-44 hours (Matt), 30-40 min (Kim)

---

## Execution Sequence

### **Week 1: Matt Builds All 4 Components**

**Day 1-2: SPEC-08 (AdventureCard)**
- Research ProductCard patterns
- Design component API
- Implement with WVWO aesthetic
- Test with real adventure data

**Day 3-4: SPEC-09 (AdventureHero)**
- Analyze Summersville Lake hero
- Design slot-based API
- Implement camo pattern + badges
- Create example page

**Day 5: SPEC-10 (QuickStats)**
- Analyze existing stats grids
- Design flexible stats array API
- Implement responsive grid

**Day 6-7: SPEC-11 (Shared Components)**
- Build GettingThere (dual-route pattern)
- Build GearChecklist (gear array → bullets)
- Build RelatedShop (product query)

---

### **Week 2: Kim Review + Matt Polish**

**Monday:** Matt compiles screenshots of all 4 components
**Tuesday:** Matt sends ONE Messenger thread with all screenshots
**Wed-Fri:** Kim reviews when convenient (30-40 min total)
**Next Monday:** Matt integrates Kim feedback (2-3 hours)
**Tuesday:** Batch 1 COMPLETE ✅

---

## Kim's Messenger Review (Batched)

**Matt sends ONE thread with 4 screenshots:**

```text
Hi Kim! I finished all 4 adventure page components.
Can you look at these screenshots and give quick feedback?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ ADVENTURE CARD (shows on hub page grid)

[Screenshot of AdventureCard with Burnsville Turkey]

Question: Does this card feel like us? Too slick? Info priority right?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2️⃣ HERO SECTION (big header at top of each page)

[Screenshot of AdventureHero with camo background]

Question: Layout OK (text left, image right)? Camo pattern too busy?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3️⃣ QUICK STATS (key facts grid)

[Screenshot of QuickStats: Distance, Difficulty, Season, Elevation]

(No questions - just showing you what it looks like)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4️⃣ GETTING THERE (directions section)

[Screenshot showing "From Shop" vs "From I-79" routes]

Question: Showing both routes helpful? Or just "From Shop"?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NO RUSH - whenever you have 20-30 min to look through.
Just want your eye on these before I use them for all pages.

Thanks!
```

**Kim's Expected Response:**
- "Card looks good, maybe make season tags bigger"
- "Hero: flip image to left side"
- "Stats: fine"
- "Directions: both routes is good"

**Matt integrates feedback** (2-3 hours)

---

## Quality Gates

**Batch 1 is COMPLETE when:**

### **Code Quality:**
- [ ] All 4 components render without errors
- [ ] TypeScript compiles (0 errors)
- [ ] Build passes (Astro builds successfully)
- [ ] WVWO aesthetic verified (rounded-sm, brand colors, 44px touch targets)

### **Functionality:**
- [ ] AdventureCard: Renders adventures from collection, links to detail pages
- [ ] AdventureHero: Slot-based composition works, camo pattern renders
- [ ] QuickStats: Accepts any stats array (2-6 items), responsive grid
- [ ] Shared Components: All 3 work with real adventure data

### **Design Review:**
- [ ] Kim reviews all 4 screenshots (via Messenger)
- [ ] Kim approves: "Yeah, these feel like us"
- [ ] OR Kim requests changes: Matt iterates (1 round max)
- [ ] Final approval before using components for all adventures

---

## Deliverables (Batch 1 Complete)

**Components Created (4 total, ~360 LOC):**
1. AdventureCard.tsx (~110 LOC) - Hub grid item
2. AdventureHero.astro (~120 LOC) - Page header with camo
3. AdventureQuickStats.astro (~80 LOC) - Key facts grid
4. AdventureGettingThere.astro (~60 LOC) - Directions (dual-route)
5. AdventureGearChecklist.astro (~50 LOC) - Gear list
6. AdventureRelatedShop.astro (~80 LOC) - Product recommendations

**Wait, that's 6 components** - SPEC-11 is a bundle of 3.

**Documentation:**
- Component usage examples
- Screenshot compilation for Kim
- Kim's design approval (Messenger thread)

**Integration:**
- Components import into adventure detail pages
- Work with SPEC-06 adventures collection
- Ready for Batch 2 (templates can use these components)

---

## Next: Batch 2 (Templates)

**After Batch 1 Complete:**
- ✅ All UI components built
- ✅ Kim design approved
- ✅ Ready to build adventure page templates (SPEC-12-20)

**Batch 2 will USE these components:**
- Lake template: AdventureHero + QuickStats + GettingThere
- WMA template: AdventureHero + GearChecklist + RelatedShop
- River template: AdventureCard (for related adventures sidebar)

**Pattern learned, stored in AgentDB, reused for Batch 2.**

---

**Grand love ya!** 🦌🏔️

**Batch 1 content ops complete. Execute when ready.**
