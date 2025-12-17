---
description: Create or update the feature specification from a natural language feature description.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Task"]
handoffs:
  - label: Clarify Spec
    agent: speckit.clarify
    prompt: Run clarification questions on the spec
  - label: Build Technical Plan
    agent: speckit.plan
    prompt: Create a plan for the spec
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Create or update a feature specification from natural language description using native Claude Code tooling.

### Step 1: Determine Feature Context

1. **Parse user input** to extract:
   - Feature name (kebab-case slug)
   - Feature description
   - Any constraints or requirements mentioned

2. **Check for existing feature branch:**
   ```bash
   git branch --show-current
   ```
   - If on a `feature/*` branch, use that feature name
   - If on `main`/`master`, create new feature from input

3. **Set up feature directory:**
   ```
   docs/specs/<phase>/<feature-name>/
   ├── spec.md          # Feature specification
   ├── plan.md          # Implementation plan (created by /speckit.plan)
   └── tasks.md         # Task breakdown (created by /speckit.tasks)
   ```

   **Phase folders:** `phase 3c/` (e-commerce), `phase 5/` (newsletter), etc.

### Step 2: Load Templates and Context

1. **Read spec template:**
   ```
   ${CLAUDE_PLUGIN_ROOT}/resources/templates/spec-template.md
   ```
   If template doesn't exist, use built-in structure below.

2. **Load project constitution** (if exists):
   ```
   docs/specs/constitution.md OR .specify/constitution.md
   ```

3. **Load WVWO context:**
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
   - Frontend aesthetics (for any UI specs)

### Step 3: Generate Specification

Create `docs/specs/<phase>/<feature-name>/spec.md` with this structure:

```markdown
# Feature: <Feature Name>

**Version:** 1.0.0
**Created:** <YYYY-MM-DD>
**Status:** Draft

## Overview

<2-3 sentence summary of what this feature does and why>

## Problem Statement

<What problem does this solve? Who has this problem?>

## Goals

- <Primary goal>
- <Secondary goals>

## Non-Goals (Out of Scope)

- <What this feature will NOT do>

## User Stories

### As a <persona>
- I want to <action>
- So that <benefit>

## Functional Requirements

### Core Requirements
1. <Requirement 1>
2. <Requirement 2>

### Edge Cases
- <Edge case handling>

## Non-Functional Requirements

### Performance
- <Latency/throughput targets if applicable>

### Accessibility
- <A11y requirements>

### Security
- <Security considerations>

## Data Model

<Entities, attributes, relationships if applicable>

## API/Interface Design

<API endpoints, component interfaces if applicable>

## Dependencies

- <External services>
- <Internal dependencies>

## Acceptance Criteria

- [ ] <Testable criterion 1>
- [ ] <Testable criterion 2>

## Open Questions

- <Unresolved decisions>

## References

- <Links to related docs, designs, etc.>
```

### Step 4: Constitutional Compliance Check

If constitution exists, verify spec aligns with:
- WVWO principles (simplicity, authenticity, free-tier)
- Tech stack constraints (Astro, Tailwind, React/shadcn)
- Voice guidelines (Kim's authentic voice)

Flag any violations in the spec.

### Step 5: Create Feature Branch (if needed)

If not already on a feature branch:
```bash
git checkout -b feature/<feature-name>
```

### Step 6: Output Summary

Report:
- Path to created/updated spec
- Feature branch name
- Any constitutional concerns
- Suggested next step: `/speckit.clarify` or `/speckit.plan`

## PR Checkpoint Awareness

This command typically produces < 50 LOC (just the spec file). No PR checkpoint needed yet.

## Behavior Rules

- If user provides vague input, ask ONE clarifying question before proceeding
- Always use kebab-case for feature names
- Never overwrite existing spec without confirmation
- Include placeholder sections even if empty (for completeness)
- Flag any tech stack violations immediately

## Next Steps

After spec creation, recommend:
1. `/speckit.clarify` - If spec has ambiguities or open questions
2. `/speckit.plan` - If spec is complete and ready for implementation planning
