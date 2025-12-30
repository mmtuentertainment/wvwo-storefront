# SPEC-14 River Template - Task Dependency Graph & Critical Path Analysis

**Version:** 1.0.0
**Created:** 2025-12-30
**Total Tasks:** 42 tasks across 5 phases
**Total Effort:** 10 hours
**Critical Path Duration:** 3 hours 45 minutes

---

## Executive Summary

This document provides comprehensive dependency analysis, critical path identification, and parallelization strategies for all 42 tasks in SPEC-14 River Template implementation. Based on the implementation plan, this analysis reveals optimal execution order and identifies bottlenecks.

**Key Findings:**
- **Critical Path:** 8 tasks (T-001 → T-008 → T-009 → T-010 → T-027 → T-034 → T-040 → T-041)
- **Parallelizable Tasks:** 29 tasks (69% of total)
- **Quality Gates:** 5 major gates with clear success criteria
- **Minimum Completion Time:** 3.75 hours (with unlimited parallel resources)
- **Single Developer Time:** 10 hours (sequential execution)

---

## ASCII Dependency Graph

```
═══════════════════════════════════════════════════════════════════════════════
PHASE 1: TYPE SYSTEM FOUNDATION (2 hours)
═══════════════════════════════════════════════════════════════════════════════

T-001 RapidSchema ──────────────┐
T-002 SeasonalFlowSchema ───────┤
T-003 RiverAccessPointSchema ───┤
T-004 RiverFishingSchema ───────┼──────┐
T-005 OutfitterSchema ──────────┤      │
T-006 RiverSafetySchema ────────┤      │  (ALL PARALLEL)
T-007 NearbyAttractionSchema ───┘      │
                                        ↓
                                   T-008 RiverTemplateProps
                                        │
                                        │
                        ┌───────────────┴───────────────┐
                        ↓                               ↓
              [GATE 1: Type System]            Phase 3 Dependencies
              ✓ All schemas compile             (T-027, T-028, T-029)
              ✓ typecheck passes                        ↓
              ✓ RiverTemplateProps complete      [GATE 3: Collections]
                        ↓

═══════════════════════════════════════════════════════════════════════════════
PHASE 2A: COMPONENT CORE SECTIONS (2 hours)
═══════════════════════════════════════════════════════════════════════════════

T-008 ──────┐
            ↓
       T-009 Component Scaffolding + Hero
            │
            ├──────────────────┬───────────────────┐
            ↓                  ↓                   ↓
       T-010 Rapids       T-011 Fishing      T-012 Outfitters
            │                  │                   │
            │     (ALL PARALLEL - Can run simultaneously)
            │                  │                   │
            └──────────────────┴───────────────────┘
                               ↓
                        Component Core Done
                               │

═══════════════════════════════════════════════════════════════════════════════
PHASE 2B: COMPONENT NEW SECTIONS (2 hours)
═══════════════════════════════════════════════════════════════════════════════
                               │
            ┌──────────────────┼──────────────────┬───────────────┐
            ↓                  ↓                  ↓               ↓
    T-013 Seasonal Flow  T-014 Access Points  T-015 Safety  T-016 Nearby
            │                  │                  │               │
            │        (ALL PARALLEL - Can run simultaneously)      │
            │                  │                  │               │
            └──────────────────┴──────────────────┴───────────────┘
                                        ↓
                                 T-017 Shared Components
                                        ↓
                                 T-018 Scoped Styles
                                        ↓
                            [GATE 2: Component Complete]
                            ✓ ~660 lines implemented
                            ✓ All sections render
                            ✓ WVWO compliance verified
                            ✓ npm run build succeeds
                                        │

═══════════════════════════════════════════════════════════════════════════════
PHASE 3: CONTENT COLLECTIONS INTEGRATION (1 hour)
═══════════════════════════════════════════════════════════════════════════════
                                        │
                T-008 ──────────────────┤
                                        ↓
                                 T-027 Type Discriminator
                                        ↓
                                 T-028 Import Schemas
                                        ↓
                                 T-029 Add River Fields
                                        ↓
                                 T-030 Test Collection Query
                                        ↓
                            [GATE 3: Collections]
                            ✓ River type recognized
                            ✓ Zero breaking changes
                            ✓ Type guard works
                                        │

═══════════════════════════════════════════════════════════════════════════════
PHASE 4: SEO COMPONENT (2 hours)
═══════════════════════════════════════════════════════════════════════════════
                                        │
                T-008 ──────────────────┤
                                        ↓
                                 T-034 SEO Scaffolding
                                        │
                        ┌───────────────┼───────────────┬─────────────┐
                        ↓               ↓               ↓             ↓
            T-035 TouristAttraction  T-036 Article  T-037 Breadcrumb  T-038 LocalBusiness
                        │               │               │             │
                        │  (ALL PARALLEL - Can run simultaneously)   │
                        │               │               │             │
                        └───────────────┴───────────────┴─────────────┘
                                        ↓
                                 T-039 Rich Results Test
                                        ↓
                            [GATE 4: SEO Component]
                            ✓ JSON-LD validates
                            ✓ Google Rich Results passes
                            ✓ All schema entities correct
                                        │

═══════════════════════════════════════════════════════════════════════════════
PHASE 5: EXAMPLE DATA FILES (1 hour)
═══════════════════════════════════════════════════════════════════════════════
                                        │
                T-008 ──────────────────┤
                                        ↓
                                 T-040 Directory + README
                                        │
                                ┌───────┴────────┐
                                ↓                ↓
                         T-041 _example.ts   T-042 gauley.ts skeleton
                                │                │
                                │  (PARALLEL)    │
                                │                │
                                └────────┬───────┘
                                         ↓
                            [GATE 5: Implementation Reference]
                            ✓ Example data complete
                            ✓ Skeleton with TODOs ready
                            ✓ All files typecheck
                                         ↓

                            ╔══════════════════════════════╗
                            ║  SPEC-14 IMPLEMENTATION      ║
                            ║  COMPLETE                    ║
                            ╚══════════════════════════════╝
```

---

## Critical Path Analysis

### The Critical Path (3 hours 45 minutes)

The critical path represents the longest dependency chain that cannot be parallelized. Any delay in these tasks directly impacts project completion.

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ CRITICAL PATH TASKS                                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                                         ┃
┃  T-001: RapidSchema (30 min)                                           ┃
┃    └──→ Blocks T-008 (RiverTemplateProps interface)                   ┃
┃                                                                         ┃
┃  T-008: RiverTemplateProps (30 min)                                    ┃
┃    └──→ Blocks ALL subsequent phases                                   ┃
┃                                                                         ┃
┃  T-009: Component Scaffolding + Hero (45 min)                          ┃
┃    └──→ Blocks ALL component sections                                  ┃
┃                                                                         ┃
┃  T-010: Rapids Guide Section (60 min)                                  ┃
┃    └──→ First major component section (pattern reference)              ┃
┃                                                                         ┃
┃  T-027: Type Discriminator Update (15 min)                             ┃
┃    └──→ Blocks Content Collections integration                         ┃
┃                                                                         ┃
┃  T-034: SEO Scaffolding (30 min)                                       ┃
┃    └──→ Blocks all schema entities                                     ┃
┃                                                                         ┃
┃  T-040: Directory + README (15 min)                                    ┃
┃    └──→ Blocks example data files                                      ┃
┃                                                                         ┃
┃  T-041: _example.ts Reference (30 min)                                 ┃
┃    └──→ Final deliverable (complete implementation reference)          ┃
┃                                                                         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

TOTAL CRITICAL PATH TIME: 3 hours 45 minutes (225 minutes)
```

### Tasks Blocking Multiple Others (High-Priority Bottlenecks)

These tasks have the highest number of dependencies and should receive priority attention:

1. **T-008 (RiverTemplateProps)** - BLOCKS 8 TASKS
   - Blocks: T-009, T-027, T-034, T-040, T-028, T-029, T-030, T-041
   - **Impact:** Delays every subsequent phase
   - **Mitigation:** Start immediately after T-001-T-007 complete

2. **T-009 (Component Scaffolding)** - BLOCKS 9 TASKS
   - Blocks: T-010 through T-018 (all component sections)
   - **Impact:** Delays entire Phase 2 (4 hours of work)
   - **Mitigation:** Prioritize after T-008, ensure WVWO compliance from start

3. **T-034 (SEO Scaffolding)** - BLOCKS 5 TASKS
   - Blocks: T-035, T-036, T-037, T-038, T-039
   - **Impact:** Delays entire Phase 4 (2 hours of work)
   - **Mitigation:** Can start as soon as T-008 completes (parallel to Phase 2)

4. **T-040 (Directory Setup)** - BLOCKS 2 TASKS
   - Blocks: T-041, T-042
   - **Impact:** Delays final deliverables
   - **Mitigation:** Can start as soon as T-008 completes (parallel to other phases)

---

## Parallel Execution Opportunities

### Group 1: Schema Creation (Phase 1) - 100% PARALLELIZABLE

**Duration:** 30 minutes (longest task in group)
**Team Size:** 7 developers (1 per schema) OR 1 developer (sequential 2 hours)

```
┌────────────────────────────────────────────────────────────────┐
│ PARALLEL GROUP 1: ALL SCHEMAS (NO DEPENDENCIES)               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  T-001 ─┐                                                      │
│  T-002 ─┤                                                      │
│  T-003 ─┤                                                      │
│  T-004 ─┼──→ All can run simultaneously                       │
│  T-005 ─┤                                                      │
│  T-006 ─┤                                                      │
│  T-007 ─┘                                                      │
│                                                                │
│  ✅ BENEFIT: Reduce 2h sequential work to 30 min              │
│  ⚠️ COORDINATION: All must export types consistently          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Developer Assignment Strategy:**
- **Option A (Team):** Assign 7 developers, each takes 1 schema (30 min)
- **Option B (Solo):** Single developer, batch-implement all schemas (2 hours)

### Group 2: Component Core Sections (Phase 2a) - 75% PARALLELIZABLE

**Duration:** 60 minutes (T-010 Rapids is longest)
**Dependencies:** T-009 MUST complete first
**Team Size:** 3 developers (1 per section)

```
┌────────────────────────────────────────────────────────────────┐
│ PARALLEL GROUP 2: CORE SECTIONS (After T-009)                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  T-009 (45 min, SEQUENTIAL) ──┐                               │
│                                │                               │
│                                ├──→ T-010 Rapids (60 min)      │
│                                ├──→ T-011 Fishing (45 min)     │
│                                └──→ T-012 Outfitters (45 min)  │
│                                                                │
│  ✅ BENEFIT: Reduce 2.25h to 1.75h (save 30 min)              │
│  ⚠️ COORDINATION: Shared component structure from T-009       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Group 3: Component New Sections (Phase 2b) - 85% PARALLELIZABLE

**Duration:** 60 minutes (longest task in group)
**Dependencies:** T-009 must complete first
**Team Size:** 4 developers (1 per section)

```
┌────────────────────────────────────────────────────────────────┐
│ PARALLEL GROUP 3: NEW SECTIONS (After T-009)                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  After T-009 completes:                                        │
│                                                                │
│  T-013 Seasonal Flow (60 min) ──┐                             │
│  T-014 Access Points (60 min) ──┼──→ All parallel             │
│  T-015 Safety (45 min) ─────────┤                             │
│  T-016 Nearby (45 min) ─────────┘                             │
│                                  ↓                             │
│                           T-017 Shared (30 min, SEQUENTIAL)    │
│                                  ↓                             │
│                           T-018 Styles (15 min, SEQUENTIAL)    │
│                                                                │
│  ✅ BENEFIT: Reduce 3.15h to 1.75h (save 1.4h)                │
│  ⚠️ COORDINATION: All sections use same color/font patterns   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Group 4: SEO Schema Entities (Phase 4) - 80% PARALLELIZABLE

**Duration:** 40 minutes (T-035 TouristAttraction is longest)
**Dependencies:** T-034 MUST complete first
**Team Size:** 4 developers (1 per entity)

```
┌────────────────────────────────────────────────────────────────┐
│ PARALLEL GROUP 4: SCHEMA ENTITIES (After T-034)               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  T-034 (30 min, SEQUENTIAL) ──┐                               │
│                                │                               │
│                                ├──→ T-035 TouristAttraction (40 min) │
│                                ├──→ T-036 Article (20 min)     │
│                                ├──→ T-037 Breadcrumb (15 min)  │
│                                └──→ T-038 LocalBusiness (30 min) │
│                                     ↓                           │
│                                T-039 Rich Results (15 min)      │
│                                                                │
│  ✅ BENEFIT: Reduce 2h to 1.5h (save 30 min)                  │
│  ⚠️ COORDINATION: All reference same @id patterns             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Group 5: Example Data Files (Phase 5) - 100% PARALLELIZABLE

**Duration:** 30 minutes (both tasks equal duration)
**Dependencies:** T-040 MUST complete first
**Team Size:** 2 developers (1 per file)

```
┌────────────────────────────────────────────────────────────────┐
│ PARALLEL GROUP 5: DATA FILES (After T-040)                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  T-040 (15 min, SEQUENTIAL) ──┐                               │
│                                │                               │
│                                ├──→ T-041 _example.ts (30 min) │
│                                └──→ T-042 gauley.ts (15 min)   │
│                                                                │
│  ✅ BENEFIT: Reduce 1h to 45 min (save 15 min)                │
│  ⚠️ COORDINATION: Both follow same data pattern               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Quality Gate Definitions

### Gate 1: Type System Complete (After Phase 1)

**Entry Criteria:**
- T-001 through T-008 all completed

**Validation Checklist:**
```bash
# Run these commands to validate Gate 1
npm run typecheck                    # Must pass with 0 errors
npm run build                        # Must compile without errors

# Manual checks:
✓ All 7 Zod schemas export types correctly
✓ RiverTemplateProps interface includes all nested types
✓ Type guard function isRiverAdventure() works
✓ No breaking changes to existing adventure.ts exports
✓ JSDoc comments complete for all schemas
```

**Exit Criteria:**
- All validation checks pass
- Schemas can be imported by components
- Type inference works in IDE

**Blocking:** If Gate 1 fails, ALL subsequent phases are blocked

---

### Gate 2: Component Complete (After Phase 2)

**Entry Criteria:**
- T-009 through T-018 all completed
- Gate 1 passed

**Validation Checklist:**
```bash
# Run these commands
npm run build                        # Must compile
npm run dev                          # Test component renders

# WVWO Compliance Manual Checks:
✓ Fonts: ONLY font-display, font-hand (Kim's tips), font-body
✓ Colors: brand-brown, sign-green, brand-cream, brand-orange (<5% screen)
✓ Border radius: ONLY rounded-sm (no rounded-md, rounded-lg, etc.)
✓ No forbidden fonts (Inter, Poppins, DM Sans, etc.)
✓ No glassmorphism or backdrop-blur effects
✓ No purple/pink/neon gradients

# Component Structure:
✓ File exactly ~660 lines
✓ All 8 primary sections implemented
✓ Conditional rendering works (empty arrays hide sections)
✓ Inline color-coding logic correct (rapids, flow, access)
✓ Shared components integrated (Gear, Shop, CTA)
✓ Scoped styles enforce rounded-sm
```

**Exit Criteria:**
- Component renders without errors
- WVWO compliance 100%
- All sections display correctly with test data

**Blocking:** If Gate 2 fails, content cannot be created (Gate 3 blocked)

---

### Gate 3: Content Collections Integration (After Phase 3)

**Entry Criteria:**
- T-027 through T-030 all completed
- Gate 1 passed (type system required)

**Validation Checklist:**
```bash
# Run these commands
npm run typecheck                    # Must pass
npm run build                        # Must compile

# Test collection queries
node -e "import { getCollection } from 'astro:content'; const adventures = await getCollection('adventures'); console.log(adventures.filter(a => a.data.type === 'river').length);"

# Manual checks:
✓ Type discriminator enum includes 'river'
✓ All 7 river schemas imported correctly
✓ River fields added (all optional)
✓ Type guard isRiverAdventure() filters correctly
✓ Zero breaking changes to existing lake/WMA content
✓ Existing content still validates
```

**Exit Criteria:**
- Collection queries work
- Type guard filters rivers correctly
- Zero errors on existing content

**Blocking:** If Gate 3 fails, river content cannot be created or queried

---

### Gate 4: SEO Component Complete (After Phase 4)

**Entry Criteria:**
- T-034 through T-039 all completed
- Gate 1 passed (RiverTemplateProps required)

**Validation Checklist:**
```bash
# Build and extract JSON-LD
npm run build
# Copy JSON-LD from built page

# Google Rich Results Test:
# 1. Go to https://search.google.com/test/rich-results
# 2. Paste JSON-LD
# 3. Validate

# Manual checks:
✓ SchemaRiverTemplate.astro file created (~200 lines)
✓ @graph includes 4+ entities (TouristAttraction, Article, BreadcrumbList, LocalBusiness per outfitter)
✓ TouristAttraction has @type array ["TouristAttraction", "Place"]
✓ TouristAttraction includes warning property
✓ LocalBusiness entities created per outfitter
✓ BreadcrumbList itemListElement correct
✓ All @id references resolve correctly
✓ Conditional fields work (dates, warnings, amenities)
```

**Google Rich Results Test Requirements:**
- ✅ Zero errors
- ✅ Zero warnings (or only minor/cosmetic warnings)
- ✅ TouristAttraction detected
- ✅ LocalBusiness entities detected (1 per outfitter)
- ✅ BreadcrumbList valid

**Exit Criteria:**
- Google Rich Results Test passes
- JSON-LD validates
- All schema entities detected

**Blocking:** If Gate 4 fails, SEO benefits lost (but implementation can continue)

---

### Gate 5: Implementation Reference Complete (After Phase 5)

**Entry Criteria:**
- T-040 through T-042 all completed
- Gates 1, 2, 3, 4 all passed

**Validation Checklist:**
```bash
# Run these commands
npm run typecheck                    # All data files must typecheck
ls src/data/rivers/                  # Verify files created

# Manual checks:
✓ rivers/ directory created with proper structure
✓ README.md documents usage pattern clearly
✓ _example.ts contains complete Gauley River data (~300 lines)
✓ _example.ts includes all 8 required sections
✓ gauley.ts skeleton created with TODO markers (~280 lines)
✓ All import paths resolve correctly
✓ Example data renders in component without errors
```

**Exit Criteria:**
- All files typecheck successfully
- Example data complete and serves as reference
- Skeleton provides clear TODO structure for content team

**Blocking:** If Gate 5 fails, content team lacks implementation guidance

---

## Time Optimization Recommendations

### Optimal Team Configuration by Phase

#### Configuration A: 7-Person Team (Fastest: 2.5 hours)

```
┌─────────────────────────────────────────────────────────────────┐
│ TEAM ALLOCATION (7 DEVELOPERS)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Hour 1 (30 min): Phase 1 - Type System                         │
│   • Dev 1: T-001 RapidSchema                                   │
│   • Dev 2: T-002 SeasonalFlowSchema                            │
│   • Dev 3: T-003 RiverAccessPointSchema                        │
│   • Dev 4: T-004 RiverFishingSchema                            │
│   • Dev 5: T-005 OutfitterSchema                               │
│   • Dev 6: T-006 RiverSafetySchema                             │
│   • Dev 7: T-007 NearbyAttractionSchema                        │
│   └──→ All converge to validate Gate 1                         │
│                                                                 │
│ Hour 1 (30-60 min): T-008 + T-009 Critical Path                │
│   • Dev 1: T-008 RiverTemplateProps (30 min)                   │
│   • Dev 1: T-009 Component Scaffolding (45 min)                │
│   └──→ Dev 1 on critical path                                  │
│                                                                 │
│ Hour 2 (60-120 min): Phase 2 + 4 + 5 Parallel                  │
│   • Dev 2: T-010 Rapids                    } Phase 2a          │
│   • Dev 3: T-011 Fishing                   }                   │
│   • Dev 4: T-012 Outfitters                }                   │
│   • Dev 5: T-013 Seasonal Flow             } Phase 2b          │
│   • Dev 6: T-014 Access Points             }                   │
│   • Dev 7: T-034 → T-035/36/37/38 SEO      } Phase 4           │
│   └──→ Massive parallelization                                 │
│                                                                 │
│ Hour 3 (120-150 min): Convergence + Phase 3 + 5                │
│   • Dev 1: T-017 → T-018 (Component finalization)              │
│   • Dev 2: T-027 → T-028 → T-029 → T-030 (Collections)         │
│   • Dev 3: T-039 Rich Results Test                             │
│   • Dev 4: T-040 → T-041 Example Data                          │
│   • Dev 5: T-042 Gauley Skeleton                               │
│   └──→ Final integration                                       │
│                                                                 │
│ TOTAL TIME: 2.5 hours (5.5h saved vs. 10h sequential)          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Configuration B: 3-Person Team (Balanced: 4 hours)

```
┌─────────────────────────────────────────────────────────────────┐
│ TEAM ALLOCATION (3 DEVELOPERS)                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Hour 1-2: Phase 1 Type System                                  │
│   • Dev 1: T-001, T-002, T-003 (1.25h)                         │
│   • Dev 2: T-004, T-005 (50 min) → T-008 (30 min)              │
│   • Dev 3: T-006, T-007 (30 min) → T-009 (45 min)              │
│   └──→ Gate 1 validation                                       │
│                                                                 │
│ Hour 2-3: Phase 2 Component                                    │
│   • Dev 1: T-010 Rapids + T-013 Seasonal Flow                  │
│   • Dev 2: T-011 Fishing + T-014 Access Points                 │
│   • Dev 3: T-012 Outfitters + T-015 Safety + T-016 Nearby      │
│   └──→ All converge for T-017, T-018                           │
│                                                                 │
│ Hour 3-4: Phase 3, 4, 5 Parallel                               │
│   • Dev 1: T-027 → T-030 Collections (1h)                      │
│   • Dev 2: T-034 → T-039 SEO (1.5h)                            │
│   • Dev 3: T-040 → T-042 Example Data (1h)                     │
│   └──→ Final validation                                        │
│                                                                 │
│ TOTAL TIME: 4 hours (6h saved vs. 10h sequential)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Configuration C: Solo Developer (Realistic: 8 hours)

**Note:** 10h estimate includes testing/validation overhead. Optimized flow:

```
┌─────────────────────────────────────────────────────────────────┐
│ SOLO DEVELOPER OPTIMIZED (8 hours)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Session 1 (2h): Phase 1 - Type System                          │
│   • Batch-implement all 7 schemas (90 min)                     │
│   • T-008 RiverTemplateProps (30 min)                          │
│   └──→ Gate 1 validation (npm run typecheck)                   │
│                                                                 │
│ Session 2 (2h): Phase 2a - Component Core                      │
│   • T-009 Scaffolding + Hero (45 min)                          │
│   • T-010 Rapids (60 min)                                      │
│   • T-011 Fishing (15 min carryover)                           │
│                                                                 │
│ Session 3 (2h): Phase 2b - Component Sections                  │
│   • T-011 Fishing (30 min completion)                          │
│   • T-012 Outfitters (45 min)                                  │
│   • T-013 Seasonal Flow (45 min)                               │
│                                                                 │
│ Session 4 (2h): Phase 2b + 3 + 4 + 5                           │
│   • T-014 Access Points (30 min)                               │
│   • T-015 Safety + T-016 Nearby + T-017 Shared + T-018 Styles (1h) │
│   • T-027 → T-030 Collections (30 min)                         │
│   └──→ Gate 2, Gate 3 validation                               │
│                                                                 │
│ Session 5 (2h): SEO + Example Data                             │
│   • T-034 → T-039 SEO Component (1.5h)                         │
│   • T-040 → T-042 Example Data (30 min)                        │
│   └──→ Gate 4, Gate 5 validation                               │
│                                                                 │
│ TOTAL TIME: 8 hours (2h saved by batch operations)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Bottleneck Identification & Mitigation

#### Bottleneck 1: T-008 (RiverTemplateProps) - 30 minutes

**Impact:** Blocks 8 downstream tasks across multiple phases

**Mitigation Strategies:**
1. **Pre-work:** Have all 7 schema files (T-001 through T-007) reviewed and approved before starting T-008
2. **Template Reuse:** Copy LakeTemplateProps structure and adapt (saves ~10 min)
3. **Parallel Prep:** While T-008 is in progress, prepare scaffolding for T-009, T-027, T-034
4. **Testing:** Write type guard tests immediately after T-008 completes

**Success Metric:** T-008 completes in ≤30 minutes with zero type errors

#### Bottleneck 2: T-009 (Component Scaffolding) - 45 minutes

**Impact:** Blocks 9 component section tasks (T-010 through T-018)

**Mitigation Strategies:**
1. **Template Reuse:** Copy LakeTemplate.astro structure directly (saves ~15 min)
2. **Props Validation:** Ensure all props from T-008 are destructured correctly
3. **Hero Validation:** Test hero rendering immediately (catches WVWO issues early)
4. **Parallel Prep:** While T-009 is in progress, prepare section markup patterns

**Success Metric:** T-009 completes in ≤45 minutes with hero rendering correctly

#### Bottleneck 3: T-010 (Rapids Section) - 60 minutes

**Impact:** Longest single task, holds up Phase 2a completion

**Mitigation Strategies:**
1. **Inline Logic Pre-test:** Validate color-coding logic in isolation before integration
2. **Data Prep:** Have test rapid data ready (3-5 rapids with varying classes)
3. **Accessibility:** Use shape icons (●▲■) early to catch screen reader issues
4. **Parallel Work:** Other developers work on T-011, T-012 while T-010 in progress

**Success Metric:** T-010 completes in ≤60 minutes with correct color-coding

#### Bottleneck 4: WVWO Compliance Review - 15-30 minutes

**Impact:** If component fails WVWO review, must rework all sections

**Mitigation Strategies:**
1. **Scoped Styles First:** Implement T-018 styles early (enforce rounded-sm from start)
2. **Font Checklist:** Create automated lint rule for forbidden fonts
3. **Color Validator:** Script to check brand-orange usage (<5% screen rule)
4. **PR Template:** Add WVWO checklist to PR template (catch before merge)

**Success Metric:** Zero WVWO violations in final review

---

## Parallelization Strategy Summary

### Maximum Parallelization (Unlimited Developers)

**Total Duration:** 3 hours 45 minutes (critical path time)

```
Phase 1:  30 min  (7 schemas parallel) + 30 min (T-008 sequential)
Phase 2a: 45 min  (T-009 sequential)   + 60 min (3 sections parallel)
Phase 2b: 60 min  (4 sections parallel) + 45 min (T-017, T-018 sequential)
Phase 3:  60 min  (sequential - type safety dependencies)
Phase 4:  30 min  (T-034 sequential)   + 40 min (4 entities parallel) + 15 min (T-039)
Phase 5:  15 min  (T-040 sequential)   + 30 min (2 files parallel)

CRITICAL PATH: T-001 (30) → T-008 (30) → T-009 (45) → T-010 (60) → T-027 (15) → T-034 (30) → T-040 (15) → T-041 (30) = 225 min
```

### Realistic Parallelization (3 Developers)

**Total Duration:** 4 hours

```
Hour 1-2:  Phase 1 complete (all 7 schemas + T-008)
Hour 2-3:  Phase 2 complete (T-009 → T-018 with parallel sections)
Hour 3-4:  Phase 3, 4, 5 parallel (Collections + SEO + Example Data)

BENEFIT: 6 hours saved vs. solo sequential
```

### Solo Optimized (1 Developer)

**Total Duration:** 8 hours

```
Session 1 (2h):  Phase 1 (batch schemas + interface)
Session 2 (2h):  Phase 2a (scaffolding + core sections start)
Session 3 (2h):  Phase 2b (complete component sections)
Session 4 (2h):  Phase 2b finish + Phase 3 (collections integration)
Session 5 (2h):  Phase 4 + Phase 5 (SEO + example data)

BENEFIT: 2 hours saved via batch operations
```

---

## Dependency Matrix

### Cross-Phase Dependencies

| Task | Blocks | Blocked By | Can Parallelize With |
|------|--------|------------|---------------------|
| **T-001** | T-008 | None | T-002 through T-007 |
| **T-002** | T-008 | None | T-001, T-003-T-007 |
| **T-003** | T-008 | None | T-001-T-002, T-004-T-007 |
| **T-004** | T-008 | None | T-001-T-003, T-005-T-007 |
| **T-005** | T-008 | None | T-001-T-004, T-006-T-007 |
| **T-006** | T-008 | None | T-001-T-005, T-007 |
| **T-007** | T-008 | None | T-001-T-006 |
| **T-008** | T-009, T-027, T-034, T-040 | T-001-T-007 | None (sequential) |
| **T-009** | T-010-T-018 | T-008 | None (sequential) |
| **T-010** | T-017 | T-009 | T-011, T-012 |
| **T-011** | T-017 | T-009 | T-010, T-012 |
| **T-012** | T-017 | T-009 | T-010, T-011 |
| **T-013** | T-017 | T-009 | T-014, T-015, T-016 |
| **T-014** | T-017 | T-009 | T-013, T-015, T-016 |
| **T-015** | T-017 | T-009 | T-013, T-014, T-016 |
| **T-016** | T-017 | T-009 | T-013, T-014, T-015 |
| **T-017** | T-018 | T-010-T-016 | None (sequential) |
| **T-018** | Gate 2 | T-017 | T-027 (different phase) |
| **T-027** | T-028 | T-008 | Phase 4, Phase 5 tasks |
| **T-028** | T-029 | T-027 | None (sequential) |
| **T-029** | T-030 | T-028 | None (sequential) |
| **T-030** | Gate 3 | T-029 | None (validation) |
| **T-034** | T-035-T-038 | T-008 | Phase 2b, Phase 3, Phase 5 |
| **T-035** | T-039 | T-034 | T-036, T-037, T-038 |
| **T-036** | T-039 | T-034 | T-035, T-037, T-038 |
| **T-037** | T-039 | T-034 | T-035, T-036, T-038 |
| **T-038** | T-039 | T-034 | T-035, T-036, T-037 |
| **T-039** | Gate 4 | T-035-T-038 | None (validation) |
| **T-040** | T-041, T-042 | T-008 | Phase 2, Phase 3, Phase 4 |
| **T-041** | Gate 5 | T-040 | T-042 |
| **T-042** | Gate 5 | T-040 | T-041 |

### Phase Independence Analysis

**Phases that CAN run in parallel (after T-008):**
- Phase 2 (Component) + Phase 3 (Collections) + Phase 4 (SEO) + Phase 5 (Example Data)

**Why they can parallelize:**
- All depend ONLY on T-008 (RiverTemplateProps)
- No inter-phase dependencies
- Different file targets (no merge conflicts)

**Coordination Requirements:**
- All must reference same type definitions from T-008
- WVWO compliance applies to Phase 2 only
- Phase 3 validates after Phase 2 completes (but can start earlier)

---

## Risk-Adjusted Timeline

### Pessimistic Timeline (Murphy's Law: 13 hours)

**Assumption:** Every gate fails once, requires rework

```
Phase 1:  2.5h (schema rework for type errors)
Phase 2:  5h   (WVWO compliance violations require fixes)
Phase 3:  1.5h (collection query bugs)
Phase 4:  3h   (Rich Results Test failures, schema tweaks)
Phase 5:  1h   (no issues expected)
───────────
TOTAL:    13h
```

### Realistic Timeline (Expected: 10 hours)

**Assumption:** Minor issues caught by validation, quick fixes

```
Phase 1:  2h   (as planned)
Phase 2:  4h   (as planned)
Phase 3:  1h   (as planned)
Phase 4:  2h   (as planned)
Phase 5:  1h   (as planned)
───────────
TOTAL:    10h
```

### Optimistic Timeline (Everything Works: 7 hours)

**Assumption:** Zero rework, perfect execution, parallel execution

```
Phase 1:  1h   (parallel schemas + T-008)
Phase 2:  3h   (parallel sections after T-009)
Phase 3:  0.5h (collections integration smooth)
Phase 4:  1.5h (parallel SEO entities)
Phase 5:  1h   (parallel example files)
───────────
TOTAL:    7h
```

**Recommendation:** Plan for Realistic (10h), allocate buffer for Pessimistic (13h)

---

## Success Metrics & KPIs

### Velocity Metrics

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **Phase 1 Completion** | ≤2 hours | >2.5 hours |
| **Gate 1 Pass Rate** | 100% first try | <100% (requires rework) |
| **Phase 2 Completion** | ≤4 hours | >5 hours |
| **WVWO Violations** | 0 violations | >0 (any violation) |
| **Phase 3 Breaking Changes** | 0 breaking changes | >0 (regression) |
| **Rich Results Test** | 0 errors | >0 errors |
| **Overall Completion** | ≤10 hours | >13 hours |

### Quality Metrics

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **Type Coverage** | 100% (all props typed) | <95% |
| **WVGO Compliance** | 100% (zero violations) | <100% |
| **Accessibility** | WCAG AA (all sections) | <WCAG AA |
| **SEO Validation** | Pass Rich Results Test | Fail Rich Results Test |
| **Performance** | No new performance regressions | >100ms added to page load |

### Process Metrics

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| **Parallel Efficiency** | >60% tasks parallelized | <50% |
| **Gate Pass Rate** | 100% (all 5 gates pass first try) | <80% |
| **Rework Time** | 0 hours | >2 hours |
| **Communication Overhead** | <10% of total time | >20% |

---

## Conclusion

### Key Takeaways

1. **Critical Path:** 3h 45m (8 tasks) - Any delay directly impacts delivery
2. **Parallelization Potential:** 69% of tasks (29/42) can run in parallel
3. **Bottleneck Tasks:** T-008, T-009, T-034, T-040 block multiple downstream tasks
4. **Quality Gates:** 5 gates with clear validation criteria prevent rework
5. **Optimal Team Size:** 3 developers (4 hours) balances speed and coordination

### Execution Recommendations

**For Solo Developer:**
- Follow 8-hour optimized timeline
- Batch similar tasks (all schemas in one session)
- Validate gates immediately after phase completion
- Use _example.ts as implementation reference

**For Small Team (2-3 developers):**
- Phase 1: Divide schemas (Dev 1: 3 schemas, Dev 2: 4 schemas)
- Phase 2: Divide sections (Dev 1: core, Dev 2: new, Dev 3: shared)
- Phases 3-5: Parallelize completely (Collections, SEO, Example Data)
- Daily standups to align on type definitions and WVWO compliance

**For Large Team (4-7 developers):**
- Maximize parallelization (aim for 3h 45m critical path time)
- Assign dedicated developer to critical path (T-008 → T-009 → T-010)
- Designate WVGO compliance reviewer (validates all PRs)
- Use feature branches per task, merge to integration branch frequently

### Risk Mitigation Priorities

1. **Highest Priority:** T-008 completion (blocks everything)
2. **Second Priority:** WVGO compliance validation (prevents rework)
3. **Third Priority:** Rich Results Test pass (SEO benefits)
4. **Fourth Priority:** Type safety (prevents runtime errors)

### Next Actions

1. ✅ Review this dependency analysis with stakeholders
2. ✅ Choose team configuration (solo / small team / large team)
3. ✅ Assign tasks based on chosen configuration
4. ✅ Set up feature branch: `feature/SPEC-14-river-template`
5. ✅ Begin Phase 1 (Type System) following critical path
6. ✅ Use TodoWrite to track progress in real-time

---

**Document Status:** ✅ **COMPLETE - Ready for Implementation**
**Next Step:** Begin Phase 1 (Type System) with T-001 through T-007 in parallel
