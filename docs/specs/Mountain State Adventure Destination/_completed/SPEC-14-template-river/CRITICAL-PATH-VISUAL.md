# SPEC-14 River Template - Critical Path Visual Guide

**Version:** 1.0.0
**Created:** 2025-12-30
**For:** Quick reference and planning

---

## The Big Picture

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  SPEC-14 RIVER TEMPLATE IMPLEMENTATION                                ┃
┃  96 Tasks | 12 Hours Sequential | 4.5 Hours Parallel (Max Team)      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

             START
               │
               ├──────────────────────────────────────────┐
               │                                          │
        ┌──────▼──────┐                           ┌──────▼──────┐
        │  PHASE 1    │                           │  PARALLEL   │
        │  Type       │ 2h                        │  Schema     │ 30m
        │  System     │                           │  Creation   │
        │  (15 tasks) │                           │  (T-001-007)│
        └──────┬──────┘                           └──────┬──────┘
               │                                          │
               │     ┌──────────────────────────────────┘
               │     │
        ┌──────▼─────▼────┐
        │  GATE 1 ✓       │
        │  Type System OK │
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │  PHASE 2    │
        │  Component  │ 4h
        │  (16 tasks) │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  GATE 2 ✓       │
        │  Component OK   │
        │  WVWO Compliant │
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │  PHASE 3    │
        │  Collections│ 1h
        │  (5 tasks)  │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  GATE 3 ✓       │
        │  Collections OK │
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │  PHASE 4    │
        │  SEO Schema │ 2h
        │  (8 tasks)  │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  GATE 4 ✓       │
        │  Rich Results OK│
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │  PHASE 5    │
        │  Examples   │ 1h
        │  (6 tasks)  │
        └──────┬──────┘
               │
        ┌──────▼──────────┐
        │  GATE 5 ✓       │
        │  Examples Ready │
        └──────┬──────────┘
               │
        ┌──────▼──────┐
        │  PHASE 6    │
        │  Testing    │ 2h
        │  (15 tasks) │
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │  PHASE 7    │
        │  Migration  │ 4h
        │  (31 tasks) │
        └──────┬──────┘
               │
            COMPLETE
```

---

## Critical Path Waterfall (5 Hours)

**These 8 milestones CANNOT be skipped or parallelized:**

```
Hour 1 ──────────────────────────────────────────────────────
│
├─ T-001: RapidSchema (30m) ◄─ START HERE
│  └─ Foundation for all river types
│
├─ T-008: RiverTemplateProps (30m) ◄─ BLOCKS EVERYTHING
│  └─ 8 downstream dependencies
│
└─ [End Hour 1: Gate 1 Validation]


Hour 2 ──────────────────────────────────────────────────────
│
├─ T-016: Component Scaffolding (45m) ◄─ BLOCKS 9 SECTIONS
│  └─ Setup component structure
│
└─ T-017: Hero Section (45m) ◄─ PATTERN REFERENCE
   └─ Template for all sections


Hour 3 ──────────────────────────────────────────────────────
│
├─ T-019: Rapids Section (60m) ◄─ LONGEST TASK
│  └─ Complex color-coding logic
│
└─ [End Hour 3: Phase 2 Progress Check]


Hour 4 ──────────────────────────────────────────────────────
│
├─ T-032: Type Discriminator (15m) ◄─ COLLECTIONS ENTRY
│  └─ Enable river type queries
│
├─ T-037: SEO Scaffolding (30m) ◄─ BLOCKS 4 ENTITIES
│  └─ Schema.org foundation
│
└─ [End Hour 4: Gate 3 Validation]


Hour 5 ──────────────────────────────────────────────────────
│
├─ T-045: Directory Setup (15m) ◄─ BLOCKS EXAMPLES
│  └─ Create rivers/ structure
│
├─ T-047: _example.ts (30m) ◄─ REFERENCE IMPLEMENTATION
│  └─ Complete Gauley River data
│
└─ [End Hour 5: All Phases Complete]
```

**Total Critical Path Time: 5 hours**

---

## Parallelization Map (Reduce to 2.5 Hours with 7 Devs)

### Wave 1: Schema Blitz (30 minutes)

```
┌─────────────────────────────────────────────────────────┐
│  ALL 7 SCHEMAS RUN IN PARALLEL                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Dev 1: T-001 RapidSchema (30m)         ████████        │
│  Dev 2: T-002 SeasonalFlowSchema (20m)  ██████          │
│  Dev 3: T-003 AccessPointSchema (25m)   ███████         │
│  Dev 4: T-004 FishingSchema (20m)       ██████          │
│  Dev 5: T-005 OutfitterSchema (30m)     ████████        │
│  Dev 6: T-006 SafetySchema (15m)        ████            │
│  Dev 7: T-007 AttractionSchema (15m)    ████            │
│                                                          │
│  ┌────────────────────────────────────┐                │
│  │ TOTAL TIME: 30 minutes             │                │
│  │ (longest task in group)            │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

**Coordination:** All schemas must export types consistently

---

### Wave 2: Component Sections (60 minutes)

```
┌─────────────────────────────────────────────────────────┐
│  AFTER T-016 SCAFFOLDING, 7 SECTIONS PARALLEL          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Dev 1: T-019 Rapids (60m)              ████████████    │
│  Dev 2: T-020 Fishing (45m)             █████████       │
│  Dev 3: T-021 Outfitters (45m)          █████████       │
│  Dev 4: T-022 Seasonal Flow (60m)       ████████████    │
│  Dev 5: T-023 Access Points (60m)       ████████████    │
│  Dev 6: T-024 Safety (45m)              █████████       │
│  Dev 7: T-025 Nearby (45m)              █████████       │
│                                                          │
│  ┌────────────────────────────────────┐                │
│  │ TOTAL TIME: 60 minutes             │                │
│  │ (3 tasks tie for longest)          │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

**Coordination:** All sections use T-019 Rapids as pattern reference

---

### Wave 3: SEO Entities (40 minutes)

```
┌─────────────────────────────────────────────────────────┐
│  AFTER T-037 SCAFFOLDING, 4 ENTITIES PARALLEL          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Dev 1: T-038 TouristAttraction (40m)   ████████        │
│  Dev 2: T-039 Article (20m)             ████            │
│  Dev 3: T-040 Breadcrumb (15m)          ███             │
│  Dev 4: T-041 LocalBusiness (30m)       ██████          │
│                                                          │
│  ┌────────────────────────────────────┐                │
│  │ TOTAL TIME: 40 minutes             │                │
│  │ (T-038 TouristAttraction longest)  │                │
│  └────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

**Coordination:** All entities reference same @id patterns

---

## The 3 Killer Bottlenecks

### 🔴 BOTTLENECK #1: T-008 (RiverTemplateProps)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  T-008: RiverTemplateProps Interface        ┃
┃  Duration: 30 minutes                        ┃
┃  Impact: BLOCKS 8 DOWNSTREAM TASKS           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                              ┃
┃  BLOCKS:                                     ┃
┃  • T-016 → Component implementation          ┃
┃  • T-032 → Collections integration           ┃
┃  • T-037 → SEO component                     ┃
┃  • T-045 → Example data                      ┃
┃  • T-028/029/030 → Collection fields         ┃
┃                                              ┃
┃  MITIGATION:                                 ┃
┃  ✓ Complete ALL 7 schemas before starting   ┃
┃  ✓ Copy LakeTemplateProps structure         ┃
┃  ✓ Write type guard tests immediately       ┃
┃  ✓ Assign most experienced TS developer     ┃
┃                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Warning:** If T-008 fails, ENTIRE project stalls

---

### 🟠 BOTTLENECK #2: T-016 (Component Scaffolding)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  T-016: Component Scaffolding + Hero        ┃
┃  Duration: 45 minutes                        ┃
┃  Impact: BLOCKS 9 COMPONENT SECTIONS         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                              ┃
┃  BLOCKS:                                     ┃
┃  • T-017 → Hero section                      ┃
┃  • T-019-025 → All 7 sections                ┃
┃  • T-026 → Shared components                 ┃
┃                                              ┃
┃  MITIGATION:                                 ┃
┃  ✓ Copy LakeTemplate.astro structure        ┃
┃  ✓ Validate hero rendering early            ┃
┃  ✓ Test all props destructuring             ┃
┃  ✓ Prepare section markup patterns          ┃
┃                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Warning:** Delays here cascade to 4 hours of work

---

### 🟡 BOTTLENECK #3: T-019 (Rapids Section)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  T-019: Rapids Guide Section                ┃
┃  Duration: 60 minutes (LONGEST TASK)         ┃
┃  Impact: Holds up Phase 2a completion        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                              ┃
┃  COMPLEXITY:                                 ┃
┃  • Inline color-coding logic (I-V classes)   ┃
┃  • Shape icons for accessibility (●▲■)       ┃
┃  • Hazards warnings with icons               ┃
┃  • Conditional rendering                     ┃
┃                                              ┃
┃  MITIGATION:                                 ┃
┃  ✓ Pre-test color logic in isolation        ┃
┃  ✓ Have test data ready (5 rapids)          ┃
┃  ✓ Use shape icons early                    ┃
┃  ✓ Let others work on T-020/021 parallel    ┃
┃                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Warning:** This is the single longest task in project

---

## Quality Gates Flowchart

```
START
  │
  ▼
┌────────────────┐
│  PHASE 1       │
│  Type System   │
│  (15 tasks)    │
└────────┬───────┘
         │
         ▼
    ┌─────────────────────────────────────┐
    │  GATE 1: Type System Complete       │
    │  ────────────────────────────────   │
    │  ✓ npm run typecheck passes         │
    │  ✓ npm run build succeeds           │
    │  ✓ All 7 schemas export types       │
    │  ✓ Type guard works                 │
    │  ✓ JSDoc complete                   │
    │  ✓ No breaking changes              │
    └─────┬───────────────────────────────┘
          │
          │ PASS ✓
          │
          ▼
    ┌────────────────┐
    │  PHASE 2       │
    │  Component     │
    │  (16 tasks)    │
    └────────┬───────┘
             │
             ▼
    ┌─────────────────────────────────────┐
    │  GATE 2: Component Complete         │
    │  ────────────────────────────────   │
    │  ✓ Component renders without errors │
    │  ✓ WVWO compliance 100%             │
    │    • Fonts: display/hand/body only  │
    │    • Colors: brand palette only     │
    │    • Borders: rounded-sm ONLY       │
    │    • Orange <5% screen              │
    │  ✓ All sections display correctly   │
    │  ✓ Conditional rendering works      │
    │  ✓ npm run build succeeds           │
    └─────┬───────────────────────────────┘
          │
          │ PASS ✓
          │
          ▼
    ┌────────────────┐
    │  PHASE 3       │
    │  Collections   │
    │  (5 tasks)     │
    └────────┬───────┘
             │
             ▼
    ┌─────────────────────────────────────┐
    │  GATE 3: Collections Integration    │
    │  ────────────────────────────────   │
    │  ✓ Type discriminator has 'river'   │
    │  ✓ All schemas imported correctly   │
    │  ✓ Collection queries work          │
    │  ✓ Type guard filters correctly     │
    │  ✓ ZERO breaking changes            │
    │  ✓ Existing content validates       │
    └─────┬───────────────────────────────┘
          │
          │ PASS ✓
          │
          ▼
    ┌────────────────┐
    │  PHASE 4       │
    │  SEO Schema    │
    │  (8 tasks)     │
    └────────┬───────┘
             │
             ▼
    ┌─────────────────────────────────────┐
    │  GATE 4: SEO Component Complete     │
    │  ────────────────────────────────   │
    │  ✓ Google Rich Results Test passes  │
    │  ✓ Zero errors/warnings             │
    │  ✓ TouristAttraction detected       │
    │  ✓ LocalBusiness entities detected  │
    │  ✓ BreadcrumbList valid             │
    │  ✓ All @id references resolve       │
    └─────┬───────────────────────────────┘
          │
          │ PASS ✓
          │
          ▼
    ┌────────────────┐
    │  PHASE 5       │
    │  Examples      │
    │  (6 tasks)     │
    └────────┬───────┘
             │
             ▼
    ┌─────────────────────────────────────┐
    │  GATE 5: Implementation Reference   │
    │  ────────────────────────────────   │
    │  ✓ All data files typecheck         │
    │  ✓ README documents pattern         │
    │  ✓ _example.ts complete             │
    │  ✓ gauley.ts has clear TODOs        │
    │  ✓ Import paths resolve             │
    └─────┬───────────────────────────────┘
          │
          │ PASS ✓
          │
          ▼
    ┌────────────────┐
    │  PHASE 6       │
    │  Testing       │
    │  (15 tasks)    │
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │  PHASE 7       │
    │  Migration     │
    │  (31 tasks)    │
    └────────┬───────┘
             │
             ▼
        COMPLETE ✓
```

---

## Time Budget by Phase

```
┌──────────────────────────────────────────────────────────┐
│  PHASE BREAKDOWN (12 Hours Sequential)                   │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Phase 1: Type System                2h  ████████        │
│  Phase 2: Component                  4h  ████████████████│
│  Phase 3: Collections                1h  ████            │
│  Phase 4: SEO Schema                 2h  ████████        │
│  Phase 5: Examples                   1h  ████            │
│  Phase 6: Testing                    2h  ████████        │
│  Phase 7: Migration (Future)         4h  ████████████    │
│                                      ─────────────────    │
│                              TOTAL:  16h                  │
│                                                           │
│  With Parallelization (7 devs):   4.5h  ████████████    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**Note:** Phase 7 (Migration) is future work after core implementation

---

## WVWO Compliance Quick Check

**Run this checklist on EVERY component task:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  WVWO COMPLIANCE CHECKLIST                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                       ┃
┃  FONTS ✓                                             ┃
┃  ────────                                            ┃
┃  ☑ font-display (headings ONLY)                     ┃
┃  ☑ font-hand (Kim's tips ONLY)                      ┃
┃  ☑ font-body (all other text)                       ┃
┃  ☑ NO Inter, Poppins, DM Sans, system-ui            ┃
┃                                                       ┃
┃  COLORS ✓                                            ┃
┃  ────────                                            ┃
┃  ☑ brand-brown (primary brown)                      ┃
┃  ☑ sign-green (forest green)                        ┃
┃  ☑ brand-cream (aged paper)                         ┃
┃  ☑ brand-orange (<5% screen, CTAs only)             ┃
┃  ☑ NO purple, pink, neon gradients                  ┃
┃                                                       ┃
┃  BORDERS ✓                                           ┃
┃  ────────                                            ┃
┃  ☑ rounded-sm ONLY (0.125rem)                       ┃
┃  ☑ NO rounded-md, rounded-lg, rounded-xl            ┃
┃                                                       ┃
┃  EFFECTS ✓                                           ┃
┃  ────────                                            ┃
┃  ☑ NO glassmorphism                                  ┃
┃  ☑ NO backdrop-blur                                  ┃
┃  ☑ NO parallax scrolling                             ┃
┃                                                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Orange Budget:** Safety borders (4%) + CTAs (2%) = 6% ✓

---

## Team Size Recommendations

### Solo Developer: 10 Hours

```
Day 1 (4h):  Phase 1 + Phase 2a
Day 2 (4h):  Phase 2b + Phase 3
Day 3 (2h):  Phase 4 + Phase 5
Testing:     Separate sprint (2h)
Migration:   Separate sprint (4h)
```

**Pros:** No coordination overhead
**Cons:** Longest total time

---

### Small Team (3 devs): 5 Hours

```
Hour 1-2:  Phase 1 (divide schemas 3-2-2)
Hour 2-3:  Phase 2 (parallel sections)
Hour 3-4:  Phase 3, 4, 5 (parallel)
Hour 4-5:  Testing + validation
```

**Pros:** 5 hours saved, manageable coordination
**Cons:** Requires daily standups

---

### Large Team (7 devs): 2.5 Hours

```
0:00-0:30:  Phase 1 (all 7 schemas parallel)
0:30-1:15:  T-008 + T-016 (sequential critical path)
1:15-2:15:  Phase 2 + 4 + 5 (massive parallel)
2:15-2:30:  Convergence + validation
```

**Pros:** Fastest possible (9.5 hours saved)
**Cons:** High coordination overhead

---

## Emergency Shortcuts (Last Resort)

**If running out of time, skip in this order:**

```
1. T-025: Nearby Attractions (45 min saved)
   Risk: Reduced feature completeness

2. T-048: gauley.ts skeleton (15 min saved)
   Risk: Weaker content reference

3. Phase 4: SEO Component (2h saved)
   Risk: No structured data for Google
   Add in Phase 2 iteration
```

**DO NOT SKIP:**

- Phase 1 (blocks everything)
- T-016 (component scaffolding)
- T-019 (rapids pattern reference)
- Any quality gate validations

---

## Success Criteria (All Must Pass)

```
✓ All 96 tasks completed (or Phase 1-6: 65 tasks)
✓ All 5 quality gates passed
✓ npm run typecheck passes
✓ npm run build succeeds
✓ Google Rich Results Test passes
✓ WVWO compliance: 0 violations
✓ Example data complete (_example.ts)
✓ Content team has implementation guide
✓ No breaking changes to existing content
✓ Performance: No new regressions
✓ Accessibility: WCAG AA verified
```

---

## Quick Links

| Document | Purpose |
|----------|---------|
| TASK-DEPENDENCY-GRAPH.md | Full dependency analysis with ASCII graphs |
| EXECUTION-STRATEGY.md | Team configurations and time optimization |
| tasks.md | Detailed 96-task breakdown with code snippets |
| plan.md | Original 42-task implementation plan |
| architecture/MASTER-ARCHITECTURE.md | Architecture decisions |
| spec.md | Original specification |

---

## Next Step

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                  ┃
┃  🚀 START HERE:                                 ┃
┃                                                  ┃
┃  Task: T-001 (Create RapidSchema)               ┃
┃  File: wv-wild-web/src/types/adventure.ts       ┃
┃  Line: 433                                       ┃
┃  Time: 30 minutes                                ┃
┃                                                  ┃
┃  Dependencies: None                              ┃
┃  Blocks: T-008 (RiverTemplateProps)             ┃
┃                                                  ┃
┃  Command:                                        ┃
┃  cd wv-wild-web                                  ┃
┃  npm run dev                                     ┃
┃                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Document Status:** ✅ Ready for Implementation
**Last Updated:** 2025-12-30
