# SPEC-14 River Template - Execution Strategy & Quick Reference

**Version:** 1.0.0
**Created:** 2025-12-30
**For:** Development teams implementing SPEC-14

---

## Quick Stats

| Metric | Value |
|--------|-------|
| **Total Tasks** | 42 tasks |
| **Total Effort** | 10 hours (sequential) |
| **Critical Path** | 3h 45m (with parallelization) |
| **Parallelizable Tasks** | 29 tasks (69%) |
| **Quality Gates** | 5 mandatory gates |
| **Files Created** | 7 new files |
| **Lines of Code** | 1,690 lines |

---

## The 8-Task Critical Path (3h 45m)

**These tasks CANNOT be parallelized and must run sequentially:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  CRITICAL PATH - DO NOT DELAY THESE TASKS          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                     ┃
┃  1️⃣ T-001: RapidSchema (30 min)                   ┃
┃     └─→ Foundation for all river-specific types    ┃
┃                                                     ┃
┃  2️⃣ T-008: RiverTemplateProps (30 min)            ┃
┃     └─→ BLOCKS ALL PHASES - Highest priority       ┃
┃                                                     ┃
┃  3️⃣ T-009: Component Scaffolding + Hero (45 min)  ┃
┃     └─→ BLOCKS 9 component sections                ┃
┃                                                     ┃
┃  4️⃣ T-010: Rapids Guide Section (60 min)          ┃
┃     └─→ Longest task, pattern reference            ┃
┃                                                     ┃
┃  5️⃣ T-027: Type Discriminator (15 min)            ┃
┃     └─→ Enables Content Collections queries        ┃
┃                                                     ┃
┃  6️⃣ T-034: SEO Scaffolding (30 min)               ┃
┃     └─→ BLOCKS all schema entities                 ┃
┃                                                     ┃
┃  7️⃣ T-040: Directory + README (15 min)            ┃
┃     └─→ BLOCKS example data files                  ┃
┃                                                     ┃
┃  8️⃣ T-041: _example.ts Reference (30 min)         ┃
┃     └─→ Final deliverable                          ┃
┃                                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

TOTAL: 225 minutes (3 hours 45 minutes)
```

**Implication:** Even with unlimited developers, minimum completion time is 3h 45m.

---

## The Big 3 Bottlenecks

### 🚨 BOTTLENECK #1: T-008 (RiverTemplateProps)

**Blocks:** 8 downstream tasks across ALL phases

```
T-008 ──┬──→ T-009 (Component)
        ├──→ T-027 (Collections)
        ├──→ T-028 (Collections)
        ├──→ T-029 (Collections)
        ├──→ T-030 (Collections)
        ├──→ T-034 (SEO)
        ├──→ T-040 (Example Data)
        └──→ T-041 (Example Data)
```

**Mitigation:**
- Complete T-001 through T-007 BEFORE starting T-008
- Use LakeTemplateProps as template (copy/adapt pattern)
- Write type guard tests immediately after completion
- Allocate most experienced TypeScript developer

---

### 🚨 BOTTLENECK #2: T-009 (Component Scaffolding)

**Blocks:** 9 component section tasks

```
T-009 ──┬──→ T-010 Rapids
        ├──→ T-011 Fishing
        ├──→ T-012 Outfitters
        ├──→ T-013 Seasonal Flow
        ├──→ T-014 Access Points
        ├──→ T-015 Safety
        ├──→ T-016 Nearby Attractions
        ├──→ T-017 Shared Components
        └──→ T-018 Scoped Styles
```

**Mitigation:**
- Copy LakeTemplate.astro structure directly (saves 15 min)
- Validate hero rendering immediately (catches WVWO issues early)
- Test all props destructuring before moving to sections
- Prepare section markup patterns while T-009 in progress

---

### 🚨 BOTTLENECK #3: T-010 (Rapids Section)

**Duration:** 60 minutes (longest single task)

**Why it matters:** Holds up entire Phase 2a

**Mitigation:**
- Pre-test color-coding logic in isolation
- Have test data ready (3-5 rapids with varying classes)
- Use shape icons (●▲■) early for accessibility
- Let other developers work on T-011, T-012 in parallel

---

## Parallelization Cheat Sheet

### ✅ THESE CAN RUN IN PARALLEL

**Phase 1 (7 tasks parallel):**
```
T-001 ─┐
T-002 ─┤
T-003 ─┤
T-004 ─┼─→ All 7 schemas can run simultaneously
T-005 ─┤
T-006 ─┤
T-007 ─┘
```
**Team:** 7 developers = 30 min total
**Solo:** 1 developer = 2 hours sequential

---

**Phase 2 Sections (7 tasks parallel after T-009):**
```
After T-009 completes:
T-010 ─┐
T-011 ─┤
T-012 ─┤
T-013 ─┼─→ All 7 sections can run simultaneously
T-014 ─┤
T-015 ─┤
T-016 ─┘
```
**Team:** 7 developers = 60 min total (longest task)
**Solo:** 1 developer = 6 hours sequential

---

**Phase 4 Entities (4 tasks parallel after T-034):**
```
After T-034 completes:
T-035 ─┐
T-036 ─┼─→ All 4 schema entities can run simultaneously
T-037 ─┤
T-038 ─┘
```
**Team:** 4 developers = 40 min total (longest task)
**Solo:** 1 developer = 1.75 hours sequential

---

**Phase 5 Data (2 tasks parallel after T-040):**
```
After T-040 completes:
T-041 ─┬─→ Both files can be created simultaneously
T-042 ─┘
```
**Team:** 2 developers = 30 min total
**Solo:** 1 developer = 45 min sequential

---

## The 5 Quality Gates (MUST PASS)

### ✅ Gate 1: Type System Complete

**After:** Phase 1 (T-001 through T-008)

**Validation:**
```bash
npm run typecheck   # MUST pass with 0 errors
npm run build       # MUST compile without errors
```

**Manual Checks:**
- [ ] All 7 Zod schemas export types correctly
- [ ] RiverTemplateProps interface includes all nested types
- [ ] Type guard function `isRiverAdventure()` works
- [ ] JSDoc comments complete

**If this fails:** ALL subsequent phases blocked

---

### ✅ Gate 2: Component Complete

**After:** Phase 2 (T-009 through T-018)

**Validation:**
```bash
npm run build       # MUST compile
npm run dev         # Component MUST render
```

**WVWO Compliance (Critical):**
- [ ] Fonts: ONLY `font-display`, `font-hand` (Kim's tips), `font-body`
- [ ] Colors: `brand-brown`, `sign-green`, `brand-cream`, `brand-orange` (<5%)
- [ ] Border radius: ONLY `rounded-sm` (no rounded-md, rounded-lg, etc.)
- [ ] Zero forbidden fonts (Inter, Poppins, DM Sans, etc.)
- [ ] Zero glassmorphism or backdrop-blur effects

**If this fails:** Content cannot be created

---

### ✅ Gate 3: Collections Integration

**After:** Phase 3 (T-027 through T-030)

**Validation:**
```bash
npm run typecheck   # MUST pass
npm run build       # MUST compile
```

**Manual Checks:**
- [ ] Type discriminator enum includes 'river'
- [ ] All 7 river schemas imported correctly
- [ ] Type guard filters rivers correctly
- [ ] ZERO breaking changes to existing lake/WMA content

**If this fails:** River content cannot be queried

---

### ✅ Gate 4: SEO Component Complete

**After:** Phase 4 (T-034 through T-039)

**Validation:**
1. Build and extract JSON-LD
2. Go to: https://search.google.com/test/rich-results
3. Paste JSON-LD and validate

**Requirements:**
- [ ] ✅ Zero errors
- [ ] ✅ TouristAttraction detected
- [ ] ✅ LocalBusiness entities detected (1 per outfitter)
- [ ] ✅ BreadcrumbList valid
- [ ] ✅ All @id references resolve

**If this fails:** SEO benefits lost (but can continue)

---

### ✅ Gate 5: Implementation Reference

**After:** Phase 5 (T-040 through T-042)

**Validation:**
```bash
npm run typecheck   # All data files MUST typecheck
ls src/data/rivers/ # Verify all files created
```

**Manual Checks:**
- [ ] README.md documents usage pattern clearly
- [ ] _example.ts contains complete Gauley River data
- [ ] gauley.ts skeleton has clear TODO markers
- [ ] Import paths resolve correctly

**If this fails:** Content team lacks implementation guidance

---

## Team Configuration Quick Pick

### Option A: Solo Developer (8 hours optimized)

**Best For:** Small projects, solo contractors

**Timeline:**
- Session 1 (2h): Phase 1 - Batch all schemas + interface
- Session 2 (2h): Phase 2a - Scaffolding + core sections
- Session 3 (2h): Phase 2b - Complete all sections
- Session 4 (2h): Phase 3 - Collections integration
- Session 5 (2h): Phase 4 + 5 - SEO + example data

**Pros:** No coordination overhead, full context
**Cons:** Longest total time, no parallelization

---

### Option B: Small Team (4 hours)

**Best For:** Most teams, balanced speed/coordination

**Team Size:** 3 developers

**Timeline:**
- Hour 1-2: Phase 1 (divide schemas 3-2-2 pattern)
- Hour 2-3: Phase 2 (parallel sections after T-009)
- Hour 3-4: Phase 3, 4, 5 parallel (Collections, SEO, Data)

**Pros:** 6 hours saved, reasonable coordination
**Cons:** Requires daily standups, merge conflicts

---

### Option C: Large Team (2.5 hours)

**Best For:** High-priority features, aggressive deadlines

**Team Size:** 7 developers

**Timeline:**
- 0:00-0:30: Phase 1 (all 7 schemas parallel)
- 0:30-1:15: T-008 + T-009 (sequential critical path)
- 1:15-2:15: Phase 2 + 4 + 5 massive parallel
- 2:15-2:30: Convergence + final validation

**Pros:** Fastest possible (5.5 hours saved)
**Cons:** High coordination overhead, complex merges

---

## Risk-Adjusted Timelines

| Scenario | Duration | Probability | Plan For |
|----------|----------|-------------|----------|
| **Optimistic** | 7 hours | 10% | Zero rework, perfect execution |
| **Realistic** | 10 hours | 70% | Minor issues, quick fixes |
| **Pessimistic** | 13 hours | 20% | Gate failures, WVWO rework |

**Recommendation:** Plan for **Realistic (10h)**, allocate buffer for **Pessimistic (13h)**

---

## Top 5 Failure Modes & Solutions

### ❌ Failure #1: T-008 Type Errors

**Symptom:** RiverTemplateProps doesn't compile

**Root Cause:** Schema exports inconsistent or missing

**Solution:**
- Review all 7 schemas export statements
- Verify `export type Rapid = z.infer<typeof RapidSchema>`
- Check import paths in T-008

**Prevention:** Validate Gate 1 before starting T-008

---

### ❌ Failure #2: WVWO Compliance Violations

**Symptom:** Component uses forbidden fonts/colors/styles

**Root Cause:** Developer unfamiliar with WVWO rules

**Solution:**
- Implement T-018 scoped styles FIRST
- Add automated lint rule for forbidden fonts
- Script to check brand-orange usage (<5% rule)

**Prevention:** PR template with WVWO checklist

---

### ❌ Failure #3: Content Collections Breaking Changes

**Symptom:** Existing lake/WMA content fails validation

**Root Cause:** River fields not marked optional

**Solution:**
- Ensure ALL river fields use `.optional()`
- Test existing content queries before merge
- Rollback to previous schema if issues found

**Prevention:** Run test suite in T-030 validation

---

### ❌ Failure #4: Rich Results Test Fails

**Symptom:** Google validator shows errors

**Root Cause:** Schema.org entities malformed

**Solution:**
- Reference SchemaAdventureHero pattern (working example)
- Validate @id references resolve correctly
- Check required properties per entity type

**Prevention:** Test each entity in isolation before T-039

---

### ❌ Failure #5: Component Sections Misalignment

**Symptom:** Sections have inconsistent styling/structure

**Root Cause:** Multiple developers not following pattern

**Solution:**
- Designate one developer as "component owner"
- Use T-010 Rapids as reference pattern for all sections
- Code review all sections together before merge

**Prevention:** Daily standup to align on structure

---

## Cheat Sheet: Task Assignment

### If You Have 7 Developers:

```
Dev 1 (Critical Path Lead):
  - T-001 → T-008 → T-009 → T-010 (3h 45m)

Dev 2 (Component Sections):
  - T-011 Fishing + T-013 Seasonal Flow (1.75h)

Dev 3 (Component Sections):
  - T-012 Outfitters + T-014 Access Points (1.75h)

Dev 4 (Component Sections):
  - T-015 Safety + T-016 Nearby + T-017 Shared + T-018 Styles (2h)

Dev 5 (Collections):
  - T-027 → T-030 (1h)

Dev 6 (SEO):
  - T-034 → T-039 (2h)

Dev 7 (Example Data):
  - T-040 → T-042 (1h)
```

**Total Time:** 2.5 hours (limited by Dev 1 critical path)

---

### If You Have 3 Developers:

```
Dev 1 (Type System + Component):
  - T-001, T-002, T-003 (1.25h)
  - T-009 → T-010 → T-013 (2.75h)

Dev 2 (Type System + Component + SEO):
  - T-004, T-005 (50m) → T-008 (30m)
  - T-011 → T-014 (1.75h)
  - T-034 → T-039 (2h)

Dev 3 (Type System + Component + Collections + Data):
  - T-006, T-007 (30m)
  - T-012 → T-015 → T-016 → T-017 → T-018 (3.25h)
  - T-027 → T-030 (1h)
  - T-040 → T-042 (1h)
```

**Total Time:** 4 hours (balanced workload)

---

### If You're Solo:

**Follow the 8-hour optimized timeline:**

1. **Session 1 (2h):** Phase 1 complete (batch schemas)
2. **Session 2 (2h):** Phase 2a start (scaffolding + core)
3. **Session 3 (2h):** Phase 2b (all sections)
4. **Session 4 (2h):** Phase 3 (collections)
5. **Session 5 (2h):** Phase 4 + 5 (SEO + data)

**Pro Tip:** Validate gates at end of each session to catch issues early

---

## Velocity Tracking

### Expected Task Completion Rate

| Session | Tasks Complete | Cumulative % | Gate |
|---------|---------------|--------------|------|
| Hour 1-2 | T-001 → T-008 | 19% (8/42) | Gate 1 ✅ |
| Hour 3-4 | T-009 → T-018 | 43% (18/42) | Gate 2 ✅ |
| Hour 5-6 | T-027 → T-030 | 52% (22/42) | Gate 3 ✅ |
| Hour 7-8 | T-034 → T-039 | 67% (28/42) | Gate 4 ✅ |
| Hour 9-10 | T-040 → T-042 | 100% (42/42) | Gate 5 ✅ |

**Warning Signs:**
- ⚠️ Hour 2: If <8 tasks complete, critical path at risk
- ⚠️ Hour 4: If <18 tasks complete, phase 2 overrunning
- ⚠️ Hour 6: If <22 tasks complete, collections issues
- ⚠️ Hour 8: If <28 tasks complete, SEO complexity higher than expected

---

## Emergency Shortcuts (Last Resort Only)

### If You're Running Out of Time:

1. **Skip Optional Sections:**
   - T-016 Nearby Attractions (45 min saved)
   - T-042 gauley.ts skeleton (15 min saved)
   - **Risk:** Reduced feature completeness

2. **Defer SEO Component:**
   - Skip T-034 → T-039 (2 hours saved)
   - **Risk:** No structured data for Google
   - **Mitigation:** Add in Phase 2 iteration

3. **Simplify Example Data:**
   - T-041 _example.ts with minimal data (15 min saved)
   - **Risk:** Weaker content team reference
   - **Mitigation:** Expand in Phase 2 iteration

**⚠️ DO NOT SKIP:**
- Phase 1 (Type System) - Blocks everything
- T-009 (Component Scaffolding) - Blocks all sections
- T-010 (Rapids Section) - Pattern reference for all sections
- Gate validations - Prevents rework

---

## Success Criteria Summary

**Project is DONE when:**
- [x] All 42 tasks completed
- [x] All 5 quality gates passed
- [x] `npm run typecheck` passes
- [x] `npm run build` succeeds
- [x] Google Rich Results Test passes
- [x] WVWO compliance verified (0 violations)
- [x] Example data complete (_example.ts)
- [x] Content team has implementation guide (README.md)

**Project is READY FOR MERGE when:**
- [x] All success criteria met
- [x] PR review checklist complete
- [x] No breaking changes to existing content
- [x] Performance targets met (no new regressions)
- [x] Accessibility verified (WCAG AA)

---

## Quick Links

- **Full Dependency Graph:** `TASK-DEPENDENCY-GRAPH.md`
- **Implementation Plan:** `plan.md`
- **Architecture:** `architecture/MASTER-ARCHITECTURE.md`
- **Specification:** `spec.md`

---

**Document Purpose:** Quick reference for development teams
**Last Updated:** 2025-12-30
**Status:** ✅ Ready for Implementation
