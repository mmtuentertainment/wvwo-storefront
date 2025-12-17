---
description: Execute the implementation plan by processing and executing all tasks defined in tasks.md
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Task"]
handoffs:
  - label: Create PR
    agent: pr-manager
    prompt: Create PR with CodeRabbit-optimized format
  - label: Run Analysis
    agent: speckit.analyze
    prompt: Analyze spec/plan/tasks consistency
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Execute tasks from tasks.md with PR checkpoint enforcement.

### Step 1: Load Implementation Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Load all artifacts:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md    # Requirements
   docs/specs/<phase>/<feature-name>/plan.md    # Architecture
   docs/specs/<phase>/<feature-name>/tasks.md   # Task breakdown
   ```

3. **Load WVWO context:**
   ```
   .agentdb/wvwo-context.json
   ```

4. **Load CLAUDE.md (MANDATORY - ALL RULES):**
   ```
   CLAUDE.md  # Contains ALL project rules - not just frontend
   ```
   **CRITICAL**: Read and follow the ENTIRE CLAUDE.md file, including:
   - Concurrent execution rules (1 message = all operations)
   - File organization (never save to root)
   - AgentDB session protocol
   - WVWO strategic principles
   - Hard rules (tech stack, voice, etc.)
   - Workflow rules (ask don't decide, PR awareness)
   - Frontend aesthetics

5. **Load any checklists:**
   ```
   docs/specs/<phase>/<feature-name>/checklist.md (if exists)
   ```

### Step 2: Parse Tasks

1. **Extract task list** from tasks.md
2. **Identify next tasks:**
   - Find all `[ ]` (not started) tasks
   - Prioritize `[P]` (parallelizable) tasks for concurrent execution
   - Respect `[S]` (sequential) dependencies

3. **Track LOC budget:**
   - Start with 0 LOC
   - Track additions as you implement
   - Watch for checkpoint markers

### Step 3: Execute Tasks

For each task:

1. **Mark as in-progress:**
   Update tasks.md: `[ ]` → `[~]`

2. **Implement the task:**
   - Follow plan.md architecture
   - Use spec.md requirements
   - Apply WVWO aesthetic guidelines
   - Use approved tech stack only

3. **Track LOC:**
   ```bash
   git diff --stat
   ```

4. **Mark as complete:**
   Update tasks.md: `[~]` → `[X]`

5. **Check PR checkpoint:**
   - If at `<!-- PR-CHECKPOINT -->` marker
   - If LOC > 300: Suggest PR creation
   - If LOC > 500: REQUIRE PR creation before continuing

### Step 4: PR Checkpoint Enforcement

When checkpoint reached:

1. **Check current LOC:**
   ```bash
   git diff --stat | tail -1
   ```

2. **If LOC >= 300:**
   ```
   ⚠️ Good checkpoint approaching (~XXX LOC)
   Consider creating a PR for completed work.
   ```

3. **If LOC >= 500:**
   ```
   🛑 PR checkpoint required (~XXX LOC)
   Must create PR before continuing implementation.
   Use handoff: "Create PR"
   ```

4. **PR creation format:**
   Use CodeRabbit-optimized template:
   ```markdown
   ## @coderabbit wvwo-summary

   ## Summary
   **What:** <1-line description>
   **Why:** <Business value>
   **Spec:** docs/specs/<phase>/<feature>/spec.md

   ## Changes
   - <bullet points>

   ## Test Plan
   - [ ] Mobile render check
   - [ ] `npm run build` passes
   - [ ] Schema.org validates (if applicable)

   ## PR Metrics
   - **LOC:** ~XXX lines
   - **Checkpoint:** X of Y
   ```

### Step 5: CLAUDE.md Compliance (MANDATORY - ALL RULES)

**Before writing ANY code**, verify against ALL CLAUDE.md rules:

---

#### 1. Concurrent Execution Rules
- ✅ Batch ALL todos in ONE TodoWrite call (5-10+ todos minimum)
- ✅ Spawn ALL agents in ONE message with Task tool
- ✅ Batch ALL file operations in ONE message
- ✅ Batch ALL Bash commands in ONE message
- ❌ NEVER send multiple messages for related operations

#### 2. File Organization Rules
- ✅ Source code → `/src`
- ✅ Tests → `/tests`
- ✅ Documentation → `/docs`
- ✅ Config files → `/config`
- ❌ NEVER save working files, text/mds, tests to root folder

#### 3. AgentDB Session Protocol
**At session start:**
```bash
# Load context
Read .agentdb/wvwo-context.json

# Recall learned patterns
npx agentdb@latest reflexion retrieve "WVWO" --k 5 --synthesize-context
```

**After each task, ask user:** "Task complete. Did this work correctly? (y/n)"
- If YES: `npx agentdb@latest reflexion store "wvwo-session" "<task>" 1.0 true "<what_worked>"`
- If NO: `npx agentdb@latest reflexion store "wvwo-session" "<task>" 0.0 false "<what_to_avoid>"`

#### 4. WVWO Strategic Principles
| Principle | Meaning |
|-----------|---------|
| **SIMPLICITY > COMPLEXITY** | No over-engineering, no unnecessary features |
| **AUTHENTIC > CORPORATE** | Kim's real voice, not marketing speak |
| **FREE > EXPENSIVE** | Minimize monthly costs, prefer free-tier |
| **LOCAL + HIGHWAY** | Serve both neighbors and I-79 hunters |
| **QUALITY > SPEED** | Do it right, not fast. No artificial deadlines |

#### 5. Hard Rules (NEVER VIOLATE)
- ✅ APPROVED: React + shadcn/ui for interactive components
- ❌ NEVER suggest Vue, Angular, Svelte, or other JS frameworks
- ❌ NEVER use corporate marketing tone
- ❌ NEVER over-engineer - keep it simple
- ❌ NEVER suggest paid services without explicit user request
- ✅ ALWAYS use Astro components with frontmatter
- ✅ ALWAYS use Tailwind design system classes
- ✅ ALWAYS match Kim's authentic voice
- ✅ ALWAYS prefer free-tier solutions

#### 6. Workflow Rules
- **ASK, DON'T DECIDE**: When uncertain, ask "Should I test this?" instead of deciding
- **PR AWARENESS**: After fixing code review feedback, ask "Commit to PR?" instead of summarizing
- **SHORT QUESTIONS > LONG EXPLANATIONS**: Ask first, explain only if asked

---

#### 7. Frontend Aesthetics (UI Work Only)

**Typography:**
- ✅ USE: Bitter (display), Permanent Marker (hand), Noto Sans (body)
- ❌ NEVER: Inter, Poppins, Space Grotesk, DM Sans, system-ui
- Bold weights 700-900 for headings, size jumps 2.5x+

**Colors:**
- ✅ brand-brown (#3E2723), sign-green (#2E7D32), brand-cream (#FFF8E1)
- ✅ brand-orange (#FF6F00) - **<5% of screen only** (CTAs, safety)
- ❌ NEVER: Purple gradients, hot pink, neon, corporate blue

**Design Patterns:**
- ✅ USE: rounded-sm (sharp corners), border-left accents, textured backgrounds
- ❌ NEVER: rounded-md/lg/xl, glassmorphism, neumorphism, bouncy animations
- ❌ NEVER: Parallax, floating shadows, gradient overlays

**Voice:**
- ✅ USE: Kim's authentic voice ("Grand love ya", "We handle the paperwork")
- ❌ NEVER: "Unlock potential", "Seamless experience", "Next-level", corporate speak

**shadcn/ui:**
- Override all rounded-md/lg/xl → rounded-sm
- Use WVWO variants: wvwo, cta, blaze (buttons); stock, ffl, blaze (badges)
- Harder shadows (0.15-0.2 opacity), not soft SaaS shadows

**Tech Stack:**
- ✅ Astro 5.x, Tailwind CSS 4.x, React + shadcn/ui (interactive only)
- ❌ Vue, Angular, Svelte, Next.js

---

**🛑 Flag violations immediately. Do not proceed if code violates ANY CLAUDE.md rule.**

### Step 6: Progress Reporting

After each phase:
- Tasks completed in this session
- Tasks remaining
- Current LOC since last PR
- Next recommended action

### Step 7: Completion

When all tasks complete:
1. Final LOC check
2. Create final PR if work uncommitted
3. Update spec status to "Implemented"
4. Suggest `/speckit.analyze` for final validation

## Behavior Rules

- NEVER exceed 500 LOC without creating a PR
- ALWAYS update tasks.md as you work
- ALWAYS use approved tech stack
- ALWAYS follow WVWO aesthetic guidelines
- Mark parallelizable [P] tasks and execute concurrently when possible

## LOC Tracking Commands

```bash
# Check current changes
git diff --stat

# Check staged changes
git diff --cached --stat

# Total since last commit
git diff HEAD --stat
```

## Next Steps

During implementation:
- At checkpoints: Create PR via handoff
- If blocked: `/speckit.clarify` for requirements
- After completion: `/speckit.analyze` for validation
