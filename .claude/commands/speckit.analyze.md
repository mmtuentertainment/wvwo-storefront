---
description: Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, and tasks.md after task generation.
allowed-tools: ["Read", "Glob", "Grep"]
handoffs:
  - label: Fix Issues
    agent: speckit.specify
    prompt: Update the spec to address identified issues
  - label: Clarify Requirements
    agent: speckit.clarify
    prompt: Run clarification to resolve ambiguities
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Analyze spec/plan/tasks for consistency, completeness, and quality without modifying files.

### Step 1: Load Artifacts

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Load all artifacts:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
   docs/specs/<phase>/<feature-name>/plan.md
   docs/specs/<phase>/<feature-name>/tasks.md
   ```

3. **Load constitution** (if exists):
   ```
   docs/specs/constitution.md
   ```

4. **Load CLAUDE.md (MANDATORY - ALL RULES):**
   ```
   CLAUDE.md
   ```
   **CRITICAL**: Follow the ENTIRE CLAUDE.md, not just sections. Key rules:
   - Concurrent execution (1 message = all operations)
   - File organization (never save to root)
   - WVWO strategic principles (simplicity, authentic, free-tier, quality > speed)
   - Hard rules (no Vue/Angular/Svelte, no corporate tone, no paid services)
   - Workflow rules (ask don't decide, short questions > long explanations)
   - Frontend aesthetics (for any UI work)

### Step 2: Consistency Analysis

Check cross-references between artifacts:

#### Spec → Plan Alignment
| Check | Status | Notes |
|-------|--------|-------|
| All functional requirements have plan coverage | ✅/⚠️/❌ | |
| All non-functional requirements addressed | ✅/⚠️/❌ | |
| Dependencies identified in plan | ✅/⚠️/❌ | |
| Tech stack matches approved list | ✅/⚠️/❌ | |

#### Plan → Tasks Alignment
| Check | Status | Notes |
|-------|--------|-------|
| All plan phases have task coverage | ✅/⚠️/❌ | |
| Task dependencies match plan flow | ✅/⚠️/❌ | |
| LOC estimates are reasonable | ✅/⚠️/❌ | |
| PR checkpoints at logical boundaries | ✅/⚠️/❌ | |

#### Tasks → Acceptance Criteria
| Check | Status | Notes |
|-------|--------|-------|
| All acceptance criteria have tasks | ✅/⚠️/❌ | |
| Tasks are testable | ✅/⚠️/❌ | |
| No orphan tasks (unlinked to spec) | ✅/⚠️/❌ | |

### Step 3: Quality Analysis

#### Spec Quality
| Criterion | Score | Notes |
|-----------|-------|-------|
| Clear problem statement | 1-5 | |
| Measurable goals | 1-5 | |
| Testable acceptance criteria | 1-5 | |
| Out-of-scope clarity | 1-5 | |
| Edge cases documented | 1-5 | |

#### Plan Quality
| Criterion | Score | Notes |
|-----------|-------|-------|
| Architecture clarity | 1-5 | |
| Risk assessment completeness | 1-5 | |
| PR strategy viability | 1-5 | |
| Rollback plan adequacy | 1-5 | |

#### Tasks Quality
| Criterion | Score | Notes |
|-----------|-------|-------|
| Task atomicity | 1-5 | |
| Parallelization accuracy | 1-5 | |
| Dependency ordering | 1-5 | |
| LOC estimates realism | 1-5 | |

### Step 4: Constitutional Compliance

If constitution exists, verify alignment:

#### WVWO Principles
| Principle | Status | Evidence |
|-----------|--------|----------|
| Simplicity over complexity | ✅/⚠️/❌ | |
| Authentic over corporate | ✅/⚠️/❌ | |
| Free over expensive | ✅/⚠️/❌ | |
| Local + Highway focus | ✅/⚠️/❌ | |

#### Tech Stack Compliance
| Item | Status | Notes |
|------|--------|-------|
| Astro 5.x | ✅/❌ | |
| Tailwind CSS 4.x | ✅/❌ | |
| React + shadcn/ui (if interactive) | ✅/❌ | |
| No forbidden frameworks | ✅/❌ | |

### Step 5: Risk Assessment

Identify potential issues:

#### High Risk Items
- [ ] <Issue that could block implementation>

#### Medium Risk Items
- [ ] <Issue that could cause rework>

#### Low Risk Items
- [ ] <Minor concerns>

### Step 6: Recommendations

Based on analysis:

1. **Critical fixes needed:**
   - <Must address before implementation>

2. **Suggested improvements:**
   - <Would improve quality>

3. **Optional enhancements:**
   - <Nice to have>

### Step 7: Output Report

```markdown
# Analysis Report: <Feature Name>

**Analyzed:** <YYYY-MM-DD>
**Artifacts:** spec.md, plan.md, tasks.md

## Summary

| Artifact | Consistency | Quality | Constitutional |
|----------|-------------|---------|----------------|
| spec.md | ✅/⚠️/❌ | X/5 | ✅/⚠️/❌ |
| plan.md | ✅/⚠️/❌ | X/5 | ✅/⚠️/❌ |
| tasks.md | ✅/⚠️/❌ | X/5 | N/A |

## Issues Found

### Critical (Must Fix)
- <None / List>

### Warnings (Should Fix)
- <None / List>

### Info (Optional)
- <None / List>

## Recommendation

<Ready to implement / Needs clarification / Needs spec update>

Suggested next step: <command>
```

## Behavior Rules

- This is READ-ONLY analysis - never modify files
- Be specific about issues found
- Provide actionable recommendations
- Include evidence for each finding
- Score objectively, not optimistically

## Next Steps

Based on analysis:
- If critical issues: `/speckit.specify` or `/speckit.clarify`
- If warnings only: Proceed with awareness
- If clean: `/speckit.implement`
