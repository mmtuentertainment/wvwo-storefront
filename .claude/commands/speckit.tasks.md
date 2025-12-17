---
description: Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Task"]
handoffs:
  - label: Start Implementation
    agent: speckit.implement
    prompt: Execute the tasks
  - label: Create GitHub Issues
    agent: speckit.taskstoissues
    prompt: Convert tasks to GitHub issues
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Generate a dependency-ordered task list with PR checkpoint markers.

### Step 1: Load Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Read spec and plan:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
   docs/specs/<phase>/<feature-name>/plan.md
   ```
   If plan doesn't exist, instruct user to run `/speckit.plan` first.

3. **Load CLAUDE.md (MANDATORY - ALL RULES):**
   ```
   CLAUDE.md
   ```
   **CRITICAL**: Follow the ENTIRE CLAUDE.md, not just sections. Key rules:
   - Concurrent execution (1 message = all operations)
   - File organization (never save to root)
   - WVWO strategic principles (simplicity, authentic, free-tier, quality > speed)
   - Hard rules (no Vue/Angular/Svelte, no corporate tone, no paid services)
   - Workflow rules (ask don't decide, short questions > long explanations)
   - Frontend aesthetics (for any UI tasks)

### Step 2: Decompose into Tasks

Break down plan phases into atomic tasks:

1. **Task granularity:**
   - Each task = 1-2 hours of work
   - Each task = testable outcome
   - Each task < 100 LOC typically

2. **Task attributes:**
   - `[P]` = Parallelizable (no dependencies blocking)
   - `[S]` = Sequential (depends on previous)
   - `[ ]` = Not started
   - `[X]` = Completed
   - `[~]` = In progress

3. **PR checkpoint markers:**
   - `<!-- PR-CHECKPOINT -->` after logical groupings
   - Target ~300 LOC between checkpoints

### Step 3: Generate tasks.md

Create `docs/specs/<phase>/<feature-name>/tasks.md`:

```markdown
# Tasks: <Feature Name>

**Plan Version:** <from plan.md>
**Generated:** <YYYY-MM-DD>
**Status:** Ready for Implementation

## Task Legend

- `[P]` Parallelizable - can run concurrently with other [P] tasks
- `[S]` Sequential - depends on previous tasks
- `[ ]` Not started
- `[X]` Completed
- `[~]` In progress

## Phase 1: Foundation

### Setup
- [ ] [S] Create feature directory structure
- [ ] [P] Add TypeScript types/interfaces
- [ ] [P] Create data schema (if applicable)

<!-- PR-CHECKPOINT: Foundation (~XXX LOC) -->

## Phase 2: Core Implementation

### Component Development
- [ ] [S] Create base component structure
- [ ] [P] Implement component logic
- [ ] [P] Add Tailwind styling
- [ ] [S] Wire up data flow

### Data Layer
- [ ] [P] Create data fetching utilities
- [ ] [P] Add data validation

<!-- PR-CHECKPOINT: Core Feature (~XXX LOC) -->

## Phase 3: Integration

### Wiring
- [ ] [S] Connect components to pages
- [ ] [S] Add navigation/routing
- [ ] [P] Implement error handling

### Testing
- [ ] [P] Write component tests
- [ ] [P] Write integration tests
- [ ] [S] Manual QA checklist

<!-- PR-CHECKPOINT: Integration (~XXX LOC) -->

## Phase 4: Polish

### UI/UX
- [ ] [P] Mobile responsiveness
- [ ] [P] Loading states
- [ ] [P] Empty states
- [ ] [P] Error states

### Documentation
- [ ] [P] Update README if needed
- [ ] [P] Add inline code comments

<!-- PR-CHECKPOINT: Polish (~XXX LOC) -->

## PR Summary

| PR | Scope | Est. LOC | Tasks |
|----|-------|----------|-------|
| 1 | Foundation | ~XXX | 3 |
| 2 | Core Feature | ~XXX | 6 |
| 3 | Integration | ~XXX | 5 |
| 4 | Polish | ~XXX | 5 |

**Total Estimated LOC:** ~XXX
**Recommended PRs:** X

## Dependencies Graph

```
[Setup] --> [Component Structure]
              |
              v
         [Component Logic] --> [Data Flow]
              |                    |
              v                    v
         [Styling]           [Integration]
                                  |
                                  v
                             [Testing]
```

## Notes

- <Any special considerations>
- <Blockers or prerequisites>
```

### Step 4: Validate Task Breakdown

1. **Check parallelization:**
   - Tasks marked [P] should truly be independent
   - Sequential [S] tasks should have clear dependencies

2. **Check LOC estimates:**
   - Sum LOC between checkpoints
   - Warn if any checkpoint > 400 LOC
   - Suggest splits if > 500 LOC

3. **Check completeness:**
   - All plan phases covered
   - All acceptance criteria have corresponding tasks

### Step 5: Output Summary

Report:
- Path to tasks.md
- Total task count
- Parallelizable vs sequential ratio
- Estimated LOC per PR
- Any concerns about task ordering

## Behavior Rules

- Every task must be atomic and testable
- Mark parallelizable tasks [P] for concurrent execution
- Include PR checkpoints at natural boundaries
- Estimate LOC for each checkpoint
- Never exceed 500 LOC between checkpoints

## Next Steps

After task generation:
1. `/speckit.implement` - Start executing tasks
2. `/speckit.taskstoissues` - Create GitHub issues from tasks
