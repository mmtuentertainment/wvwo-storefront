# WVWO Mountain State Adventure Destination - Master Sequencing Plan

**Version:** 1.3.0
**Created:** 2025-12-23
**Updated:** 2025-12-27 (SPEC-09 & SPEC-10 complete, PR #63 & #68 merged)
**Queen Coordinator:** Hierarchical Hive Mind Orchestration
**Scope:** SPEC-07B through SPEC-70 (64 remaining specs)
**Foundation:** SPEC-07 Complete (filtering infrastructure ✅)

---

## Executive Summary

**Current State (as of 2025-12-27):**
- ✅ SPEC-07: Adventures Hub Filtering (PR #1-8 complete, merged)
- ✅ SPEC-07B: Navigation Consolidation (PR #60 merged, all silent failures fixed)
- ✅ SPEC-08: Adventure Card Component (PR #61 merged, drive time badge + stagger animation)
- ✅ SPEC-09: Adventure Hero Component (PR #63 merged - full implementation)
- ✅ SPEC-10: Quick Stats Component (PR #68 merged - 12-agent swarm verified, 5/5 Greptile)
- ⏸️ SPEC-11-70: 60 specs planned but not executed

**Goal:**
Systematically execute all 64 specs using hierarchical hive mind coordination with:
- Spec-specific content ops workflows (customized per type)
- Quality gates (don't proceed until current spec validated)
- Kim review coordination (async, batched, respectful of her time)
- AgentDB pattern learning (successful workflows stored and reused)

**Timeline:** 12-14 weeks total (Jan-April 2026)
**Launch Target:** February 15-20, 2026 (first 10-20 adventures)

---

## Hierarchical Coordination Model

```
┌─────────────────────────────────────────────────────────────┐
│ QUEEN COORDINATOR                                           │
│ - Sequences all 63 specs (one at a time OR batched)        │
│ - Enforces quality gates (don't proceed until validated)   │
│ - Coordinates Kim review cycles (async Messenger batches)  │
│ - Tracks completion % (AgentDB dashboard)                  │
│ - Learns patterns (stores successful workflows)            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ├─────────────────┬──────────────────┬────────────────┐
                         │                 │                  │                │
                         ▼                 ▼                  ▼                ▼
         ┌───────────────────┐  ┌──────────────────┐  ┌─────────────┐  ┌──────────────┐
         │ SCOUT EXPLORERS   │  │ WORKER SPECIALISTS│  │ ARCHITECT   │  │ MEMORY MGR   │
         │ (Research)        │  │ (Draft Content)   │  │ (Code/Design│  │ (AgentDB)    │
         └───────────────────┘  └──────────────────┘  └─────────────┘  └──────────────┘
                         │                 │                  │                │
                         └─────────────────┴──────────────────┴────────────────┘
                                           │
                                           ▼
                         ┌─────────────────────────────────────┐
                         │ KIM (Human-in-the-Loop)             │
                         │ - Reviews via Messenger (async)     │
                         │ - Truth-checks factual accuracy     │
                         │ - Adds local knowledge              │
                         └─────────────────────────────────────┘
```

---

## Spec Categorization & Sequencing

### **Batch 0: Navigation (SPEC-07B) - 1 spec** ✅ COMPLETE

**Type:** Code-focused (navigation update, no content creation)
**Workflow:** Update header → Add cross-links → Test → Deploy
**Kim Input:** None required (technical navigation structure)

| Spec | Task | LOC Est | Kim Input | Status |
|------|------|---------|-----------|--------|
| SPEC-07B | Navigation Consolidation | 152 | None (navigation is Matt's domain) | ✅ MERGED |

**Execution Results:**
- ✅ **Completed:** 2025-12-26
- ✅ **PR #60:** Merged to main (3 commits, df398e6)
- ✅ **Implementation:** 152 LOC (6 files modified, 1 new component)
- ✅ **Testing:** 22/22 manual tests passed
- ✅ **Hive Mind Review:** 8 agents, Grade A+ (97%)
- ✅ **Silent Failures Fixed:** Case sensitivity, URL parsing, dev-mode warnings

**Deliverables:**
- ✅ Updated Header.astro with Adventures link (desktop + mobile)
- ✅ GuideBanner.tsx component (filter-specific guide links, case-insensitive)
- ✅ CTAs in buck-season and turkey-season guides linking to filtered Adventures
- ✅ Guides index explanation (Guides vs Adventures distinction)
- ✅ WCAG 2.1 AA compliant (44x44px tap targets, color contrast)
- ✅ Performance: +0.43KB gzipped (GuideBanner component)

**Key Decision:** Hybrid approach
- ✅ Keep `/guides` (seasonal prep content)
- ⏭️ Migrate `/near` to Adventures (deferred to SPEC-21-28)
- ✅ Adventures now accessible from header (was hidden, user typed URL manually)

**AgentDB Patterns Stored:**
- Episode #163: SPEC-07B navigation consolidation workflow
- Episode #164: Case-insensitive URL parameter pattern
- Episode #165: WVWO aesthetic enforcement checklist

---

### **Batch 1: Components (SPEC-08-11) - 4 specs**

**Type:** Code-focused (React components for adventure pages)
**Workflow:** Traditional software development (design → code → test)
**Kim Input:** Design review only (1-time, 15-20 min total)

| Spec | Component | LOC Est | Kim Input | Status |
|------|-----------|---------|-----------|--------|
| ✅ SPEC-08 | Adventure Card | ~110 | Design review: "Does card feel like us?" | PR #61 merged |
| ✅ SPEC-09 | Adventure Hero | ~120 | Design review: "Hero section layout OK?" | PR #63 merged |
| ✅ SPEC-10 | Quick Stats | ~80 | Structure review: "What stats matter?" | PR #68 merged |
| SPEC-11 | Shared Components | ~150 | Design review: "Breadcrumb, CTA sections?" | Pending |

**Execution Strategy:**
- **Sequential:** SPEC-08 → 09 → 10 → 11 (each builds on previous)
- **Scout Phase:** Read SPEC-XX/PROMPT.md, analyze requirements
- **Architect Phase:** Design component structure, WVWO aesthetic compliance
- **Worker Phase:** Code implementation (React + TypeScript)
- **Kim Gate:** Single design review after all 4 complete (screenshots via Messenger)
- **Quality Gate:** Components render correctly, WVWO aesthetic verified

**Timeline:** 1.5 weeks (12-14 hours per spec)

**Deliverables Per Spec:**
- `SPEC-XX/content-ops.md` (code workflow, not content workflow)
- React component file(s)
- Unit tests
- Integration with adventures collection

---

### **Batch 2: Templates (SPEC-12-20) - 9 specs**

**Type:** Structural (Astro component templates for different destination types)
**Workflow:** Design pattern → build template → validate with example → Kim structure review
**Kim Input:** Structure validation per template (20-30 min per template)

| Spec | Template Type | Example Destination | Kim Question |
|------|---------------|---------------------|--------------|
| SPEC-12 | WMA (Hunting) | Burnsville Lake WMA | "What sections matter for hunting guides?" |
| SPEC-13 | Lake (Fishing) | Summersville Lake (gold standard) | "Keep Summersville structure for all lakes?" |
| SPEC-14 | River (Paddling) | Gauley River | "What do paddlers need to know?" |
| SPEC-15 | Ski Resort | Snowshoe Mountain | "Winter sports info needed?" |
| SPEC-16 | Cave | Seneca Caverns | "Cave tour vs wild cave sections?" |
| SPEC-17 | Backcountry | Dolly Sods | "Warnings for remote spots?" |
| SPEC-18 | State Park | Blackwater Falls | "Park amenities template?" |
| SPEC-19 | Historic Site | Carnifex Ferry | "History vs outdoor activity balance?" |
| SPEC-20 | Resort Hub | Pipestem Resort | "Resort facilities vs trails?" |

**Execution Strategy:**
- **Sequential:** SPEC-12 → 13 → ... → 20 (templates build on each other)
- **Scout Phase:** Read existing examples (Summersville Lake for SPEC-13)
- **Architect Phase:** Extract reusable structure, identify variable sections
- **Worker Phase:** Build Astro template component with slots/props
- **Example Creation:** Create 1 example destination using template
- **Kim Gate:** Structure validation via Messenger (per template, not per destination)
- **Quality Gate:** Template reusable for 5+ destinations of that type

**Timeline:** 3 weeks (1.5 days per template)

**Deliverables Per Spec:**
- `SPEC-XX/content-ops.md` (template-specific workflow)
- `SPEC-XX/kim-prompt.md` (structure validation questions)
- Astro template component file
- 1 example destination using template
- Documentation of variable sections (what changes per destination)

---

### **Batch 3: Migrations (SPEC-21-28) - 8 specs**

**Type:** Content migration (existing /near/ pages → Content Collections)
**Workflow:** Extract → convert → validate → preserve Kim's voice
**Kim Input:** Preservation check (10 min per migration)

| Spec | Existing Page | Type | Migration Complexity |
|------|---------------|------|---------------------|
| SPEC-21 | Burnsville Lake | Lake | Medium (use SPEC-13 template) |
| SPEC-22 | Elk River WMA | WMA | Low (use SPEC-12 template) |
| SPEC-23 | Summersville Lake | Lake | Low (already gold standard) |
| SPEC-24 | Sutton Lake | Lake | Low (use SPEC-13 template) |
| SPEC-25 | Stonewall Jackson Lake | Lake | Medium (use SPEC-13 template) |
| SPEC-26 | Monongahela NF | Backcountry | Medium (use SPEC-17 template) |
| SPEC-27 | Burnsville Lake Recreation | Lake | Low (duplicate of SPEC-21) |
| SPEC-28 | Setup 301 Redirects | Technical | High (SEO preservation) |

**Execution Strategy:**
- **Can parallelize:** 3-4 migrations at once (independent)
- **Scout Phase:** Read existing .astro file, extract content sections
- **Worker Phase:** Convert to markdown frontmatter + body
- **Template Application:** Use appropriate template from Batch 2
- **Kim Gate:** "Does migration preserve your original meaning?" (async review)
- **Quality Gate:** All Kim's local knowledge preserved, voice authentic

**Timeline:** 1.5 weeks (2 hours per migration, can parallelize)

**Deliverables Per Spec:**
- `SPEC-XX/content-ops.md` (migration workflow)
- `SPEC-XX/kim-prompt.md` (preservation check)
- New markdown file in `src/content/adventures/`
- 301 redirect config (SPEC-28)

---

### **Batch 4: Destinations Phase 1 - Spring Seasonal (SPEC-29-38) - 10 specs**

**Type:** New destination content (research + Kim async system)
**Workflow:** YOUR async pass system (Matt research → Kim truth-check → Matt integrate)
**Kim Input:** 4 questions per destination (15-20 min each, batched)

**First 10 Destinations (Seasonal Priority - Turkey/Spring Fishing):**

| Spec | Destination | Type | Season Focus | Distance | Priority |
|------|-------------|------|--------------|----------|----------|
| SPEC-29 | Gauley River | River | Spring-Fall | 45 min | 🔴 HIGH (iconic) |
| SPEC-30 | New River Gorge NP | Multi-activity | Year-round | 60 min | 🔴 HIGH (SEO volume) |
| SPEC-31 | Snowshoe Mountain | Ski/Winter | Winter-Spring | 85 min | 🟡 MEDIUM (off-season) |
| SPEC-32 | Canaan Valley | Multi-activity | Year-round | 90 min | 🟡 MEDIUM |
| SPEC-33 | Ace Adventure Resort | Rafting | Spring-Summer | 50 min | 🔴 HIGH |
| SPEC-34 | Seneca Rocks | Climbing | Spring-Fall | 75 min | 🔴 HIGH |
| SPEC-35 | Blackwater Falls | Hiking | Year-round | 70 min | 🔴 HIGH (family) |
| SPEC-36 | Seneca Caverns | Cave | Year-round | 70 min | 🟡 MEDIUM |
| SPEC-37 | Smoke Hole Caverns | Cave | Year-round | 80 min | 🟢 LOW |
| SPEC-38 | Hawks Nest | Scenic | Year-round | 50 min | 🟡 MEDIUM |

**Execution Strategy:**
- **Batch processing:** All 10 researched → All 10 drafted → ALL 10 sent to Kim in ONE Messenger thread
- **Scout Phase:** 45 min research per destination (parallel, 10 scouts)
  - Google Maps: coordinates, drive time
  - WVDNR: regulations, seasons
  - AllTrails: reviews, difficulty reality
  - Google Search: practical tips, closures
- **Worker Phase:** 90 min draft per destination (parallel, 10 workers)
  - Fill markdown template
  - Leave "Local Tips" empty (Kim's section)
  - Generate Kim Messenger prompt
- **Kim Gate:** ONE Messenger thread with 10 destinations (4 questions each)
  - Kim reviews when convenient (1-3 hour session)
  - Answers batched (all 10 at once)
- **Integration Phase:** 30 min per destination (Matt merges Kim feedback)
- **Quality Gate:** All 10 have Kim's voice, practical details, WVWO aesthetic

**Timeline:** 3 weeks
- Week 1: Matt research + draft (20 hours)
- Week 2: Kim review + Matt integration (Kim: 2-3 hours, Matt: 5 hours)
- Week 3: Polish, test, deploy

**Deliverables Per Spec:**
- `SPEC-XX/content-ops.md` (your async system, destination-specific)
- `SPEC-XX/kim-prompt.md` (4 questions tailored to destination type)
- `SPEC-XX/research-checklist.md` (Scout output)
- `src/content/adventures/[destination].md` (published adventure)

---

### **Batch 5: Destinations Phase 2 - Summer/Multi-Season (SPEC-39-58) - 20 specs**

**Type:** Continued destination content creation
**Workflow:** Repeat Batch 4 pattern (proven successful)
**Kim Input:** 20 destinations × 15 min = 5 hours total (split into 2 batches of 10)

**Destinations 11-30** (mix of activities, distances, seasons):
- SPEC-39-48: Second batch of 10 (hiking, fishing, family spots)
- SPEC-49-58: Third batch of 10 (state parks, resorts, scenic drives)

**Execution Strategy:**
- **Sub-Batch 5A:** SPEC-39-48 (10 destinations)
  - Same workflow as Batch 4
  - Timeline: 3 weeks
- **Sub-Batch 5B:** SPEC-49-58 (10 destinations)
  - Same workflow
  - Timeline: 3 weeks

**Total Timeline:** 6 weeks (Batch 5A + 5B)

**Quality Gates:**
- After 5A: Review analytics (are first 20 adventures performing?)
- After 5B: Adjust strategy based on data (what's working?)

---

### **Batch 6: Destinations Phase 3 - Final Wrap (SPEC-59-70) - 12 specs**

**Type:** Final destination content + wrap-up
**Workflow:** Repeat proven pattern
**Kim Input:** 12 destinations × 15 min = 3 hours total (1 batch)

**Destinations 31-42:**
- SPEC-59-70: Final 12 destinations (fill gaps, cover all WV regions)

**Execution Strategy:**
- Single batch (all 12 at once)
- Timeline: 2.5 weeks
- Quality gate: All 42 destinations live, filtering works end-to-end

---

## Queen Coordinator Responsibilities

### **1. Spec Sequencing (What Order?)**

**Batch Execution Order:**
```
Batch 0: Navigation (SPEC-07B)
  → Quality Gate: Adventures accessible from header, cross-links work

Batch 1: Components (SPEC-08-11)
  → Quality Gate: Components integrate with SPEC-07 filtering

Batch 2: Templates (SPEC-12-20)
  → Quality Gate: Each template reusable for 5+ destinations

Batch 3: Migrations (SPEC-21-28)
  → Quality Gate: All existing content preserved, Kim's voice intact

Batch 4: Destinations Phase 1 (SPEC-29-38)
  → Quality Gate: 10 adventures live, filtering tested
  → LAUNCH CHECKPOINT (Feb 15-20)

🚀 SPEC-71: Monitoring & Analytics Setup (Post-Launch Infrastructure)
  → Quality Gate: GA4 tracking live, baseline metrics captured
  → Execute: Within 1 week of launch
  → Duration: 3.5 hours

Batch 5A: Destinations Phase 2a (SPEC-39-48)
  → Quality Gate: Analytics review - what's working?

Batch 5B: Destinations Phase 2b (SPEC-49-58)
  → Quality Gate: 30 total adventures, adjust strategy if needed

Batch 6: Destinations Phase 3 (SPEC-59-70)
  → Quality Gate: All 42 adventures complete, full site operational
```

**Why This Order:**
1. **Navigation first:** Users need to access Adventures (discovered manually typing URL)
2. **Components next:** Infrastructure before content (can't display adventures without components)
3. **Templates after:** Structural patterns before individual content
4. **Migrations:** Preserve existing work while templates fresh
5. **Destinations:** Seasonal batches with Kim review coordination

---

### **2. Quality Gates (What Validates "Done"?)**

**Component Batch Gates:**
- [ ] All 4 components render without errors
- [ ] TypeScript compiles (0 errors)
- [ ] WVWO aesthetic verified (rounded-sm, brand colors, 44px targets)
- [ ] Kim design review: "Does this feel like us?" (Messenger screenshot)
- [ ] Components integrate with FilterContext (PR #1)

**Template Batch Gates:**
- [ ] Template builds successfully (Astro component)
- [ ] 1 example destination created using template
- [ ] Kim structure validation: "Keep these sections for all [type]?"
- [ ] Template reusable (variables identified, hardcoded content removed)
- [ ] WVWO voice in all copy sections

**Migration Batch Gates:**
- [ ] Original content preserved (no information loss)
- [ ] Kim's voice intact (compared old vs new)
- [ ] Frontmatter valid (Zod validation passes)
- [ ] 301 redirects configured (SPEC-28)
- [ ] Kim preservation check: "Did I keep your meaning?"

**Destination Batch Gates:**
- [ ] All destinations in batch have Kim's local knowledge
- [ ] Practical details included (parking, timing, permits)
- [ ] Elevation backfilled (script run)
- [ ] Internal product links added
- [ ] SEO metadata complete (title, description, keywords)
- [ ] Build passes (Astro compiles without errors)
- [ ] Filtering works (can find destinations via filters)

---

### **3. Kim Review Coordination**

**Batching Strategy:**

**For Components (Batch 1):**
- **One Messenger review** after all 4 components complete
- **Format:** Screenshot + "Does this design feel like us?"
- **Kim time:** 15-20 minutes (1-time review)
- **Timing:** Week 2 of Batch 1

**For Templates (Batch 2):**
- **One Messenger review per template** (9 reviews total)
- **Format:** "Should [lake/river/WMA] pages all have these sections?"
- **Kim time:** 20-30 min per template (3 hours total over 3 weeks)
- **Timing:** After each template + example created

**For Migrations (Batch 3):**
- **One Messenger thread** with all 8 migrations
- **Format:** "Read old vs new - did I preserve your voice?"
- **Kim time:** 1.5 hours (check each migration)
- **Timing:** Week 2 of Batch 3

**For Destinations (Batch 4-6):**
- **One Messenger thread per 10 destinations**
- **Format:** Your async system (4 questions each)
- **Kim time:** 2-3 hours per batch of 10
- **Timing:** After Matt drafts complete, before integration

**Total Kim Time Across All 63 Specs:**
- Batch 1: 15-20 min
- Batch 2: 3 hours
- Batch 3: 1.5 hours
- Batch 4-6: 8-9 hours (42 destinations)
- **TOTAL: ~13-14 hours over 12-14 weeks** (≈1 hour/week)

**Respectful of Kim's Time:** ✅ All async, batched, no live coordination needed

---

### **4. AgentDB Pattern Learning**

**Queen Coordinator Stores Patterns:**

**After Each Batch:**
```bash
# Successful workflows
npx agentdb@latest reflexion store "batch-complete" "batch-X-[type]-workflow" 1.0 true "[what worked]"

# Failed approaches (learn from mistakes)
npx agentdb@latest reflexion store "batch-blocker" "[issue]" 0.0 false "[what to avoid]"

# Kim feedback patterns
npx agentdb@latest reflexion store "kim-review" "batch-X-kim-feedback" 1.0 true "[Kim's common edits]"
```

**Pattern Recognition:**
- Which Kim questions get best responses? (store successful prompts)
- Which research sources are most useful? (WVDNR vs AllTrails)
- Which templates Kim loves vs tolerates? (iterate on structure)
- What time estimates were accurate? (adjust future batches)

**Memory Synthesis:**
```bash
# After Batch 4 (first 10 destinations)
npx agentdb@latest skill consolidate 3 0.8 7 true

# Learn what CAUSES success (not just correlation)
npx agentdb@latest learner run 3 0.6 0.7
```

**Continuous Improvement:**
- Batch 4 workflow informs Batch 5 improvements
- Batch 5 workflow refines for Batch 6
- Faster, better, more Kim-authentic over time

---

## Master Timeline (12-14 Weeks)

```
┌──────────────────────────────────────────────────────────────┐
│ LATE DECEMBER 2025 (Current)                                 │
├──────────────────────────────────────────────────────────────┤
│ Week 0 (Dec 23-31):                                          │
│   - SPEC-07 PR #1-8 complete ✅                              │
│   - SPEC-07B: Navigation Consolidation ✅                    │
│   - SPEC-08: AdventureCard ✅ (PR #61)                       │
│   - SPEC-09: AdventureHero ✅ (PR #63)                       │
│   - SPEC-10: QuickStats ✅ (PR #68, 12-agent swarm verified) │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ JANUARY 2026                                                 │
├──────────────────────────────────────────────────────────────┤
│ Week 1-2 (Jan 1 - Jan 12):                                   │
│   - Complete SPEC-09 (AdventureHero)                         │
│   - SPEC-10: QuickStats Component                            │
│   - SPEC-11: Shared Components                               │
│   - Batch 1 complete ✅                                      │
│                                                              │
│ Week 3-5 (Jan 13 - Feb 2):                                   │
│   - Batch 2: Templates (SPEC-12-20)                          │
│   - Kim structure validation (3 hours over 3 weeks)          │
│   - Templates complete ✅                                    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ FEBRUARY 2026                                                │
├──────────────────────────────────────────────────────────────┤
│ Week 6 (Feb 3 - Feb 9):                                      │
│   - Batch 3: Migrations (SPEC-21-28)                         │
│   - Kim preservation check (1.5 hours)                       │
│   - Existing content migrated ✅                             │
│                                                              │
│ Week 7-9 (Feb 10 - Mar 2):                                   │
│   - Batch 4: First 10 Destinations (SPEC-29-38)              │
│   - Matt research + draft (20 hours)                         │
│   - Kim review (2-3 hours, async)                            │
│   - Matt integration (5 hours)                               │
│   - 🚀 LAUNCH CHECKPOINT (Feb 20) - 10 live adventures       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ MARCH 2026                                                   │
├──────────────────────────────────────────────────────────────┤
│ Week 10-12 (Mar 3 - Mar 23):                                 │
│   - Batch 5A: Next 10 Destinations (SPEC-39-48)              │
│   - Same workflow as Batch 4                                 │
│   - 20 total adventures ✅                                   │
│                                                              │
│ Week 13-15 (Mar 24 - Apr 13):                                │
│   - Batch 5B: Next 10 Destinations (SPEC-49-58)              │
│   - 30 total adventures ✅                                   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ APRIL-MAY 2026                                               │
├──────────────────────────────────────────────────────────────┤
│ Week 16-18 (Apr 14 - May 4):                                 │
│   - Batch 6: Final 12 Destinations (SPEC-59-70)              │
│   - 42 total adventures ✅                                   │
│   - All specs complete                                       │
│                                                              │
│ Week 19+ (May 5+):                                           │
│   - Monitoring, analytics review                             │
│   - Iterate based on data                                    │
│   - Add photos opportunistically                             │
└──────────────────────────────────────────────────────────────┘
```

**Launch Checkpoints:**
- **Soft Launch:** Feb 20, 2026 (10 adventures, core functionality)
- **Expand:** March-April 2026 (add 20 more)
- **Complete:** May 2026 (all 42 destinations)

---

## Hive Mind Coordination Patterns

### **Pattern 1: Scout → Worker → Kim → Integration**

**For Destination Specs (SPEC-29-70):**

```
QUEEN: "Execute SPEC-29 (Gauley River)"
  ↓
SCOUT-1: Research Gauley River (Google Maps, WVDNR, rafting sites)
  → Store findings in AgentDB
  ↓
WORKER-1: Draft markdown using Scout research
  → Generate Kim prompt (4 questions)
  → Store draft in temp file
  ↓
QUEEN: Accumulate 10 drafts, send BATCH to Kim via Messenger
  ↓
KIM (HUMAN): Reviews 10 destinations, answers questions (async, 2-3 hours)
  ↓
WORKER-2: Integrate Kim feedback into all 10 drafts
  → Run elevation script
  → Add product links
  → Commit to Git
  ↓
QUEEN: Quality gate - verify all 10 have Kim's voice
  → If PASS: Proceed to next batch
  → If FAIL: Iterate with Kim
```

---

### **Pattern 2: Parallel Scouts, Sequential Integration**

**For Migration Specs (SPEC-21-28):**

```
QUEEN: "Migrate 8 existing pages in parallel"
  ↓
SCOUT-1, 2, 3, 4, 5, 6, 7, 8: (PARALLEL)
  - Read existing .astro files
  - Extract content sections
  - Identify Kim's voice passages
  ↓
WORKER-1, 2, 3, 4, 5, 6, 7, 8: (PARALLEL)
  - Convert to markdown
  - Apply appropriate template (WMA, Lake, etc.)
  - Preserve Kim's original prose
  ↓
QUEEN: Compile 8 migrations, send to Kim for preservation check
  ↓
KIM (HUMAN): Reviews 8 migrations (1.5 hours)
  ↓
WORKER: Fix any preservation issues
  ↓
QUEEN: Quality gate - deploy all 8 migrations
```

---

### **Pattern 3: Template Design → Example → Kim Validation**

**For Template Specs (SPEC-12-20):**

```
QUEEN: "Design Lake Template (SPEC-13)"
  ↓
SCOUT: Analyze Summersville Lake (gold standard)
  → Extract sections: QuickStats, What to Fish, Campgrounds, etc.
  ↓
ARCHITECT: Design Astro template component
  → Identify variable sections (lake name, species, amenities)
  → Identify reusable sections (structure)
  ↓
WORKER: Build template + create example (Sutton Lake)
  ↓
QUEEN: Send to Kim: "Should all lake pages have these sections?"
  ↓
KIM (HUMAN): Structure validation (20 min)
  ↓
WORKER: Adjust template based on Kim feedback
  ↓
QUEEN: Quality gate - template approved, ready for 5+ lakes
```

---

## Kim Review Coordination Strategy

### **Messenger Thread Organization**

**One Thread Per Batch:**
- Batch 1 (Components): 1 thread, 4 screenshots
- Batch 2 (Templates): 9 threads (1 per template)
- Batch 3 (Migrations): 1 thread, 8 preservation checks
- Batch 4 (Destinations): 1 thread, 10 destinations × 4 questions
- Batch 5A: 1 thread, 10 destinations
- Batch 5B: 1 thread, 10 destinations
- Batch 6: 1 thread, 12 destinations

**Total Threads:** ~16 Messenger threads over 14 weeks (≈1 per week)

**Kim's Experience:**
- Gets 1 Messenger notification/week (not overwhelming)
- Reviews when convenient (async, no deadlines)
- Batched questions (not scattered across 63 separate threads)

---

### **Review Cadence**

**Week-by-Week Kim Workload:**

| Week | Batch | Kim Task | Time |
|------|-------|----------|------|
| 1 | SPEC-07 wrap | None | 0 min |
| 2-3 | Components | Design review (screenshots) | 15 min |
| 4-6 | Templates | Structure validation (9 templates) | 3 hours over 3 weeks |
| 7 | Migrations | Preservation check (8 pages) | 1.5 hours |
| 8-10 | Dest Phase 1 | Review 10 destinations | 2-3 hours |
| 11-13 | Dest Phase 2a | Review 10 destinations | 2-3 hours |
| 14-16 | Dest Phase 2b | Review 10 destinations | 2-3 hours |
| 17-19 | Dest Phase 3 | Review 12 destinations | 2-3 hours |

**Average:** ~1 hour/week for Kim (manageable with shop operations)

---

## Execution Checkpoints & Decision Points

### **Checkpoint 1: After Batch 1 (Components)**

**Decision:** Are components production-ready?
- ✅ **If YES:** Proceed to Batch 2 (Templates)
- ⚠️ **If NO:** Iterate on component design, Kim re-review

**Metrics:**
- Components render without errors
- Kim approves design
- TypeScript compiles

---

### **Checkpoint 2: After Batch 2 (Templates)**

**Decision:** Are templates reusable and Kim-approved?
- ✅ **If YES:** Proceed to Batch 3 (Migrations)
- ⚠️ **If NO:** Refine templates, create more examples

**Metrics:**
- Each template used for 1 example successfully
- Kim validates structure
- No hardcoded content (all variables extracted)

---

### **Checkpoint 3: After Batch 3 (Migrations)**

**Decision:** Is existing content preserved and migrated?
- ✅ **If YES:** Proceed to Batch 4 (Destinations)
- ⚠️ **If NO:** Fix preservation issues

**Metrics:**
- All Kim's voice passages intact
- No information loss
- 301 redirects working

---

### **🚀 LAUNCH CHECKPOINT: After Batch 4 (First 10 Destinations)**

**Decision:** Launch to public OR continue building in private?

**Criteria to Launch:**
- ✅ 10+ adventures live (enough to demonstrate value)
- ✅ Filtering works end-to-end
- ✅ WCAG 2.1 AA compliant (accessibility audit passed)
- ✅ Performance targets met (LCP <2.5s, filter <150ms)
- ✅ GA4 tracking enabled
- ✅ Kim approves content quality

**If ALL criteria met:** 🚀 **PUBLIC LAUNCH (Feb 15-20)**
**If NOT:** Delay launch, fix blockers, try again in 2 weeks

---

### **Checkpoint 5-7: After Each Destination Batch**

**Analytics Review:**
- Which adventures get most traffic?
- Which filters are used most?
- Bounce rate acceptable (<50%)?
- Conversion rate (directions, phone clicks) meeting targets?

**Adjust Strategy:**
- More of what's working (e.g., if turkey hunting performs well, prioritize more hunting content)
- Less of what's not (e.g., if cave tours get low traffic, deprioritize)

---

## Risk Management & Mitigation

### **Risk #1: Matt Bandwidth Insufficient**

**Symptoms:**
- Batch 4 takes 5 weeks instead of 3 weeks
- Quality drops (AI slop creeps in)
- Burnout signals (Matt stops enjoying work)

**Mitigation:**
- **Flexible timeline:** If Batch 4 needs 4 weeks, take 4 weeks (no hard deadlines)
- **Reduce batch size:** 10 destinations → 5 destinations per batch
- **Pause button:** If Matt needs break, pause between batches

**Queen Coordinator Action:**
- Monitor batch completion time
- If >20% over estimate, reduce next batch size
- Prioritize quality over hitting February launch

---

### **Risk #2: Kim Doesn't Respond to Messenger**

**Symptoms:**
- 7 days pass, no Kim response
- Matt blocked on integration

**Mitigation:**
- **Publish with placeholder:** "Local tips coming soon - Kim's adding her knowledge"
- **Follow-up:** Gentle Messenger nudge after 7 days ("No rush, whenever you have time!")
- **Continue:** Don't block on Kim - move to next batch

**Queen Coordinator Action:**
- Track Kim response time per batch
- If >10 days no response, publish without Local Tips
- Add Kim's voice in v2 update when she responds

---

### **Risk #3: Quality Drops at Scale (Destination #40 Feels Generic)**

**Symptoms:**
- Batch 6 adventures lack Kim's voice
- Copy-paste from previous adventures
- AI slop detected (corporate tone)

**Mitigation:**
- **Litmus tests after every 10:** Run 5 WVWO litmus tests (Neighbor, Voice, Five-Year, etc.)
- **Variety in Kim questions:** Rotate question bank (don't ask same 4 every time)
- **Break between batches:** 1 week buffer to reset, avoid fatigue

**Queen Coordinator Action:**
- Audit every 10th adventure for voice authenticity
- If slop detected, pause batch, review workflow
- Store anti-patterns in AgentDB (what NOT to do)

---

## Hive Mind Agent Assignments

### **Queen Coordinator Agent:**
- **Subagent:** `queen-coordinator`
- **Responsibilities:**
  - Sequence all 63 specs
  - Enforce quality gates
  - Coordinate Kim review cycles
  - Track completion dashboard
  - Learn and store patterns (AgentDB)

### **Scout Explorer Agents (Research):**
- **Subagent:** `scout-explorer` (spawn 1-10 in parallel)
- **Responsibilities:**
  - Research destinations (Google Maps, WVDNR, AllTrails)
  - Extract coordinates, regulations, drive times
  - Find practical details (parking, permits, closures)
  - Compile into research-checklist.md

### **Worker Specialist Agents (Content Creation):**
- **Subagent:** `worker-specialist` (spawn 1-10 in parallel)
- **Responsibilities:**
  - Write markdown drafts from Scout research
  - Apply content ops template
  - Generate Kim Messenger prompts
  - Integrate Kim feedback
  - Commit to Git

### **Architect Agents (Design Work):**
- **Subagent:** `system-architect` OR `code-architect` (for components/templates)
- **Responsibilities:**
  - Design component structure
  - Extract template patterns
  - Apply WVWO aesthetic
  - Ensure reusability

### **Memory Manager:**
- **Subagent:** `swarm-memory-manager`
- **Responsibilities:**
  - Store successful workflows in AgentDB
  - Retrieve patterns for new specs
  - Consolidate skills after each batch
  - Track Kim feedback patterns

---

## Next Action for Matt

**Immediate:** Execute SPEC-07B (Navigation Consolidation) - 2-3 hours
- Unblocks SPEC-08-11 (Components need navigation for manual testing)
- Solves user discovery issue (no link to Adventures)
- No Kim review needed (technical navigation only)

**After SPEC-07B:**

Should I **generate content-ops.md for all 63 specs now**, or **execute one batch at a time**?

### **Option A: Generate All 63 Content Ops Guides First** (~4-6 hours)
- **Pro:** Complete roadmap, know what's coming
- **Pro:** Can review all workflows before executing
- **Con:** Front-loaded work, might change strategy after Batch 1 learnings

### **Option B: Generate Just Batch 1 (SPEC-08-11), Execute, Learn, Repeat** (incremental)
- **Pro:** Learn from doing, adjust workflow based on reality
- **Pro:** Less upfront time, start executing faster
- **Con:** Less visibility into future batches

**My Recommendation:** **Option B** (incremental)

**Why:** WVWO principle "Quality > Speed" + "No artificial deadlines"
- Learn from Batch 1 execution
- Refine workflow based on Kim's actual responses
- Adjust estimates based on real timings
- Avoid over-planning for unknowns

---

**Current Status:**
- ✅ SPEC-07: Complete (filtering infrastructure)
- 📋 SPEC-07B: Spec created, ready to execute (navigation)
- ⏸️ SPEC-08-70: Awaiting sequential execution

**Shall I execute SPEC-07B now, or do you want to review the spec first?**