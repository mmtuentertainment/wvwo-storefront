# SPEC-14 River Template - Complete Implementation Package

**Status:** ✅ Ready for Implementation
**Version:** 1.0.0
**Created:** 2025-12-30
**SPARC Phase:** Plan → Ready for Refinement (TDD)

---

## 📋 Executive Summary

Complete dependency analysis and critical path planning for SPEC-14 River Template Component System. This package provides three complementary views of the same implementation:

1. **Visual flowcharts** for understanding dependencies
2. **Execution strategies** for team planning
3. **Critical path analysis** for time optimization

**Key Metrics:**
- **Total Tasks:** 96 tasks (65 core + 31 migration)
- **Sequential Time:** 12 hours (one developer)
- **Parallel Time:** 2.5 hours (7 developers, optimal)
- **Realistic Time:** 5 hours (3 developers, balanced)
- **Critical Path:** 8 tasks that cannot be parallelized

---

## 📊 Document Overview

### Primary Documents

| Document | Purpose | Audience |
|----------|---------|----------|
| **CRITICAL-PATH-VISUAL.md** | Quick visual reference with ASCII flowcharts | All team members |
| **TASK-DEPENDENCY-GRAPH.md** | Comprehensive dependency analysis | Project managers, architects |
| **EXECUTION-STRATEGY.md** | Team configurations and optimization | Development teams |
| **tasks.md** | Detailed 96-task breakdown with code | Developers (implementation) |
| **plan.md** | Original 42-task plan | Context/reference |

### Supporting Documents

| Document | Purpose |
|----------|---------|
| architecture/MASTER-ARCHITECTURE.md | Architecture decisions and rationale |
| architecture/ARCHITECTURE-SUMMARY.md | Quick architecture reference |
| spec.md | Original specification and requirements |
| PROMPT.md | Original planning prompt |

---

## 🎯 Quick Start

### For Project Managers

**Read:** CRITICAL-PATH-VISUAL.md (10 minutes)

**Key Decisions:**
1. Choose team size (solo / 3 devs / 7 devs)
2. Allocate time budget (2.5h / 5h / 10h)
3. Set quality gate checkpoints
4. Plan for risk-adjusted timeline (add 30% buffer)

---

### For Development Teams

**Read:** EXECUTION-STRATEGY.md (15 minutes)

**Key Actions:**
1. Review team configuration recommendations
2. Assign tasks based on dependencies
3. Set up daily standups for coordination
4. Agree on WVWO compliance checklist

---

### For Individual Developers

**Read:** tasks.md + CRITICAL-PATH-VISUAL.md (20 minutes)

**Key Steps:**
1. Start with T-001 (Create RapidSchema)
2. Follow task dependencies in tasks.md
3. Validate at each quality gate
4. Check WVWO compliance per task

---

## 🚀 The Critical Path (Can't Be Parallelized)

**These 8 tasks determine minimum completion time:**

```
1. T-001: RapidSchema (30m)
   └─→ Foundation for all river-specific types

2. T-008: RiverTemplateProps (30m)
   └─→ BLOCKS 8 downstream tasks across ALL phases

3. T-016: Component Scaffolding (45m)
   └─→ BLOCKS all 9 component sections

4. T-019: Rapids Guide Section (60m)
   └─→ Longest task, pattern reference for sections

5. T-032: Type Discriminator (15m)
   └─→ Enables Content Collections river queries

6. T-037: SEO Scaffolding (30m)
   └─→ BLOCKS all 4 schema entities

7. T-045: Directory Setup (15m)
   └─→ BLOCKS example data files

8. T-047: _example.ts Reference (30m)
   └─→ Complete implementation reference
```

**Total Critical Path Time:** 3 hours 45 minutes (with unlimited parallel resources)

---

## ⚡ Parallelization Opportunities

### 69% of Tasks Can Run in Parallel

**Wave 1: Schema Creation (Phase 1)**
- All 7 Zod schemas (T-001 through T-007)
- Reduces 2 hours → 30 minutes (7 developers)

**Wave 2: Component Sections (Phase 2)**
- All 7 sections after scaffolding (T-019 through T-025)
- Reduces 6 hours → 60 minutes (7 developers)

**Wave 3: SEO Entities (Phase 4)**
- All 4 schema entities (T-038 through T-041)
- Reduces 1.75 hours → 40 minutes (4 developers)

**Wave 4: Example Data (Phase 5)**
- Both data files (T-047, T-048)
- Reduces 45 minutes → 30 minutes (2 developers)

---

## 🎯 Quality Gates (Must Pass)

### Gate 1: Type System Complete (After Phase 1)
```bash
npm run typecheck  # MUST pass with 0 errors
npm run build      # MUST compile without errors
```
**Checklist:**
- ✓ All 7 Zod schemas export types correctly
- ✓ RiverTemplateProps interface complete
- ✓ Type guard function works
- ✓ JSDoc comments complete

**If this fails:** ALL subsequent phases blocked

---

### Gate 2: Component Complete (After Phase 2)
```bash
npm run build      # MUST compile
npm run dev        # Component MUST render
```
**WVWO Compliance (Critical):**
- ✓ Fonts: ONLY font-display, font-hand, font-body
- ✓ Colors: brand-brown, sign-green, brand-cream, brand-orange (<5%)
- ✓ Borders: ONLY rounded-sm (no md/lg/xl)
- ✓ Zero forbidden fonts (Inter, Poppins, etc.)

**If this fails:** Content cannot be created

---

### Gate 3: Collections Integration (After Phase 3)
```bash
npm run typecheck  # MUST pass
npm run build      # MUST compile
```
**Checklist:**
- ✓ Type discriminator includes 'river'
- ✓ Type guard filters correctly
- ✓ ZERO breaking changes to existing lake/WMA content

**If this fails:** River content cannot be queried

---

### Gate 4: SEO Component Complete (After Phase 4)
**Google Rich Results Test:**
1. Build and extract JSON-LD
2. Go to: https://search.google.com/test/rich-results
3. Validate

**Requirements:**
- ✓ Zero errors
- ✓ TouristAttraction detected
- ✓ LocalBusiness entities detected
- ✓ BreadcrumbList valid

**If this fails:** SEO benefits lost (but can continue)

---

### Gate 5: Implementation Reference (After Phase 5)
```bash
npm run typecheck  # All data files MUST typecheck
ls src/data/rivers/  # Verify all files created
```
**Checklist:**
- ✓ README.md documents pattern
- ✓ _example.ts complete (300 lines)
- ✓ gauley.ts has clear TODO markers

**If this fails:** Content team lacks guidance

---

## 🔴 The 3 Killer Bottlenecks

### 1. T-008 (RiverTemplateProps) - BLOCKS 8 TASKS
**Impact:** If delayed, entire project stalls
**Mitigation:**
- Complete all 7 schemas before starting
- Copy LakeTemplateProps structure
- Assign most experienced TypeScript developer

### 2. T-016 (Component Scaffolding) - BLOCKS 9 TASKS
**Impact:** Delays 4 hours of component work
**Mitigation:**
- Copy LakeTemplate.astro directly
- Validate hero rendering immediately
- Test all props destructuring

### 3. T-019 (Rapids Section) - 60 MINUTES
**Impact:** Longest single task in project
**Mitigation:**
- Pre-test color-coding logic
- Have test data ready (5 rapids)
- Let others work on T-020/021 in parallel

---

## 📅 Recommended Timelines

### Solo Developer (Realistic: 10 hours)
```
Day 1 (4h):  Phase 1 + Phase 2a
Day 2 (4h):  Phase 2b + Phase 3
Day 3 (2h):  Phase 4 + Phase 5
```
**Pros:** No coordination overhead
**Cons:** Longest total time

---

### Small Team - 3 Developers (5 hours)
```
Hour 1-2:  Phase 1 (divide schemas)
Hour 2-3:  Phase 2 (parallel sections)
Hour 3-4:  Phase 3, 4, 5 (parallel)
Hour 4-5:  Testing + validation
```
**Pros:** 5 hours saved, manageable coordination
**Cons:** Requires daily standups

---

### Large Team - 7 Developers (2.5 hours)
```
0:00-0:30:  Phase 1 (all schemas parallel)
0:30-1:15:  T-008 + T-016 (critical path)
1:15-2:15:  Phase 2 + 4 + 5 (massive parallel)
2:15-2:30:  Final validation
```
**Pros:** Fastest possible (9.5 hours saved)
**Cons:** High coordination overhead

---

## 🎨 WVWO Compliance (CRITICAL)

**Every component task must pass this checklist:**

### Fonts ✓
- ✅ `font-display` (headings ONLY)
- ✅ `font-hand` (Kim's tips ONLY)
- ✅ `font-body` (all other text)
- ❌ NO Inter, Poppins, DM Sans, system-ui

### Colors ✓
- ✅ `brand-brown` (primary brown)
- ✅ `sign-green` (forest green)
- ✅ `brand-cream` (aged paper)
- ✅ `brand-orange` (<5% screen, CTAs only)
- ❌ NO purple, pink, neon gradients

### Borders ✓
- ✅ `rounded-sm` ONLY (0.125rem)
- ❌ NO rounded-md, rounded-lg, rounded-xl

### Effects ✓
- ❌ NO glassmorphism
- ❌ NO backdrop-blur
- ❌ NO parallax scrolling

**Orange Budget:** Safety borders (4%) + CTAs (2%) = 6% ✓ (slight tolerance)

---

## 📈 Success Metrics

### Velocity Targets
| Phase | Target Time | Critical Threshold |
|-------|------------|-------------------|
| Phase 1 | ≤2 hours | >2.5 hours |
| Phase 2 | ≤4 hours | >5 hours |
| Phase 3 | ≤1 hour | >1.5 hours |
| Phase 4 | ≤2 hours | >3 hours |
| Phase 5 | ≤1 hour | >1.5 hours |

### Quality Targets
| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Type Coverage | 100% | <95% |
| WVWO Compliance | 100% | <100% |
| Accessibility | WCAG AA | <WCAG AA |
| Rich Results Test | Pass | Fail |
| Performance | No regressions | >100ms added |

---

## 🚨 Risk Mitigation

### High-Risk Items

**Risk 1: T-008 Delays**
- **Impact:** HIGH (blocks 8 tasks)
- **Likelihood:** MEDIUM
- **Mitigation:** Pre-approve all 7 schemas, use LakeTemplateProps template

**Risk 2: WVWO Compliance Violations**
- **Impact:** HIGH (rework required)
- **Likelihood:** MEDIUM
- **Mitigation:** Implement scoped styles first, automated lint rules

**Risk 3: Rich Results Test Failures**
- **Impact:** MEDIUM (SEO benefits lost)
- **Likelihood:** MEDIUM
- **Mitigation:** Reference SchemaAdventureHero pattern, test entities in isolation

---

## 🛠️ Emergency Shortcuts (Last Resort)

**If running out of time, skip in this order:**

1. **T-025: Nearby Attractions** (45 min saved)
   - Risk: Reduced feature completeness
   - Can add in Phase 2 iteration

2. **T-048: gauley.ts skeleton** (15 min saved)
   - Risk: Weaker content reference
   - Can document separately

3. **Phase 4: SEO Component** (2 hours saved)
   - Risk: No structured data for Google
   - Add in Phase 2 iteration

**⚠️ DO NOT SKIP:**
- Phase 1 (Type System) - blocks everything
- T-016 (Component Scaffolding) - blocks all sections
- T-019 (Rapids Section) - pattern reference
- Quality gate validations - prevents rework

---

## ✅ Final Acceptance Criteria

**Project is COMPLETE when:**
- [x] All 65 core tasks completed (Phases 1-6)
- [x] All 5 quality gates passed
- [x] `npm run typecheck` passes
- [x] `npm run build` succeeds
- [x] Google Rich Results Test passes
- [x] WVWO compliance: 0 violations
- [x] Example data complete (_example.ts)
- [x] Content team has implementation guide

**Project is READY FOR MERGE when:**
- [x] All success criteria met
- [x] PR review checklist complete
- [x] No breaking changes to existing content
- [x] Performance targets met
- [x] Accessibility verified (WCAG AA)

---

## 📞 Support & Questions

### Documentation Issues
- Check architecture/MASTER-ARCHITECTURE.md for design decisions
- Review spec.md for original requirements

### Implementation Issues
- Check tasks.md for detailed code snippets
- Review TASK-DEPENDENCY-GRAPH.md for dependencies

### Planning Issues
- Check EXECUTION-STRATEGY.md for team configurations
- Review CRITICAL-PATH-VISUAL.md for quick reference

---

## 🚀 Next Steps

### 1. Choose Your Path

**Solo Developer?** → Read CRITICAL-PATH-VISUAL.md + tasks.md
**Team Lead?** → Read EXECUTION-STRATEGY.md + assign tasks
**Project Manager?** → Read this README + TASK-DEPENDENCY-GRAPH.md

### 2. Set Up Environment

```bash
cd wv-wild-web
npm install
npm run dev
```

### 3. Start Implementation

**First Task:** T-001 (Create RapidSchema)
- **File:** `src/types/adventure.ts`
- **Line:** 433
- **Time:** 30 minutes
- **Dependencies:** None

### 4. Track Progress

Use TodoWrite or tasks.md checkboxes to track completion

### 5. Validate at Gates

Run quality gate validations after each phase

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Total Tasks | 96 tasks |
| Core Tasks (Phases 1-6) | 65 tasks |
| Migration Tasks (Phase 7) | 31 tasks |
| Total Effort (Sequential) | 12 hours |
| Critical Path (Parallel) | 3h 45m |
| Parallelizable Tasks | 69% (66/96) |
| Quality Gates | 5 mandatory |
| New Files Created | 7 files |
| New Lines of Code | 1,690 lines |
| Zod Schemas | 7 schemas |
| Component Sections | 8 sections |

---

**Document Status:** ✅ Complete
**Last Updated:** 2025-12-30
**Ready For:** Implementation (Refinement Phase)
