---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Task"]
handoffs:
  - label: Generate Tasks
    agent: speckit.tasks
    prompt: Break down the plan into implementable tasks
  - label: Clarify Requirements
    agent: speckit.clarify
    prompt: Clarify ambiguities in the spec before planning
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Generate an implementation plan from the feature specification.

### Step 1: Locate Feature Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```
   Extract feature name from `feature/<name>` branch.

2. **Locate spec file:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
   ```
   If not found, instruct user to run `/speckit.specify` first.

3. **Read the spec** to understand requirements.

### Step 2: Analyze Architecture

1. **Identify affected areas:**
   - Components to create/modify
   - Data models to update
   - API endpoints needed
   - Third-party integrations

2. **Check existing patterns:**
   ```bash
   # Find similar implementations
   ls src/components/
   ls src/pages/
   ```

3. **Load WVWO context** for tech stack constraints:
   ```
   .agentdb/wvwo-context.json
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
   - Frontend aesthetics (for any UI components)

### Step 3: Generate Implementation Plan

Create `docs/specs/<phase>/<feature-name>/plan.md`:

```markdown
# Implementation Plan: <Feature Name>

**Spec Version:** <from spec.md>
**Plan Version:** 1.0.0
**Created:** <YYYY-MM-DD>

## Architecture Overview

<High-level description of how this feature fits into the system>

## Component Structure

```
src/
├── components/
│   └── <new-component>.astro
├── pages/
│   └── <new-page>.astro
└── data/
    └── <data-file>.json (if needed)
```

## Implementation Phases

### Phase 1: Foundation
- <Setup tasks>
- <Data model creation>

### Phase 2: Core Implementation
- <Main feature development>

### Phase 3: Integration
- <Connecting pieces>
- <Testing>

### Phase 4: Polish
- <UI refinement>
- <Performance optimization>

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| <Decision 1> | <Choice> | <Why> |

## Dependencies

### External
- <Third-party services>

### Internal
- <Other features/components>

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| <Risk 1> | Low/Med/High | Low/Med/High | <Strategy> |

## PR Strategy

**Estimated Total LOC:** <estimate>

Recommended PR breakdown:
1. PR 1: <scope> (~XXX LOC)
2. PR 2: <scope> (~XXX LOC)

**Checkpoint triggers:**
- Warn at 300 LOC
- Split required at 500 LOC

## Testing Strategy

- Unit tests for: <components>
- Integration tests for: <flows>
- Manual testing: <checklist items>

## Rollback Plan

<How to safely revert if issues arise>
```

### Step 4: Constitutional Compliance

Verify plan adheres to:
- **Simplicity**: No unnecessary complexity
- **Tech Stack**: Astro, Tailwind, React/shadcn only
- **Free-Tier**: No paid services without approval
- **Voice**: UI text matches Kim's voice

### Step 5: PR Size Planning

Analyze estimated LOC:
- If > 400 LOC total, plan multiple PRs
- Each PR should be one logical change
- Mark natural checkpoint boundaries

### Step 6: Output Summary

Report:
- Path to plan.md
- Number of implementation phases
- Estimated total LOC
- Recommended PR count
- Any concerns or risks

## Behavior Rules

- Never plan for technologies outside approved stack
- Always estimate LOC and plan PR checkpoints
- Include rollback strategy for non-trivial changes
- Flag any spec ambiguities that need `/speckit.clarify`

## Next Steps

After plan generation:
1. `/speckit.tasks` - Generate task breakdown with [P] markers
2. `/speckit.clarify` - If plan reveals spec gaps
