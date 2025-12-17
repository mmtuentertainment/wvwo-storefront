---
description: Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature based on available design artifacts.
allowed-tools: ["Read", "Bash", "Glob", "Grep"]
handoffs:
  - label: Start Implementation
    agent: speckit.implement
    prompt: Begin implementing the tasks
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Convert tasks.md into GitHub issues with proper labels, dependencies, and PR checkpoint markers.

### Step 1: Load Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Load tasks:**
   ```
   docs/specs/<phase>/<feature-name>/tasks.md
   ```
   If not found, instruct user to run `/speckit.tasks` first.

3. **Load spec for context:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
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

### Step 2: Parse Tasks

Extract from tasks.md:
- Task descriptions
- Parallelization markers ([P], [S])
- Phase groupings
- PR checkpoint markers
- LOC estimates

### Step 3: Create GitHub Issues

For each task or logical grouping:

```bash
gh issue create \
  --title "<Task title>" \
  --body "<Issue body>" \
  --label "<labels>"
```

#### Issue Body Template

```markdown
## Context

**Feature:** <feature-name>
**Spec:** docs/specs/<phase>/<feature>/spec.md
**Phase:** <Phase N>

## Task Description

<Description from tasks.md>

## Acceptance Criteria

- [ ] <Testable criterion from spec>

## Dependencies

- Depends on: #<issue-number> (if [S] task)
- Blocks: #<issue-number> (if applicable)

## PR Checkpoint

This task is part of PR checkpoint: **<checkpoint-name>**
Estimated LOC: ~XXX

## Labels

- `feature:<feature-name>`
- `phase:<N>`
- `type:<foundation|implementation|integration|polish>`
- `parallelizable` (if [P])
- `sequential` (if [S])
```

### Step 4: Label Strategy

Create/use these labels:

| Label | Purpose |
|-------|---------|
| `feature:<name>` | Group by feature |
| `phase:1`, `phase:2`, etc. | Group by phase |
| `type:foundation` | Setup/scaffolding tasks |
| `type:implementation` | Core feature work |
| `type:integration` | Wiring/connecting tasks |
| `type:polish` | UI/UX refinement |
| `parallelizable` | Can run concurrently |
| `sequential` | Has dependencies |
| `pr-checkpoint` | Marks checkpoint boundary |
| `loc:small` | <100 LOC |
| `loc:medium` | 100-300 LOC |
| `loc:large` | 300-500 LOC |

### Step 5: Dependency Linking

After creating all issues:

1. **Parse [S] sequential markers**
2. **Update issue bodies** with dependency links:
   ```bash
   gh issue edit <issue-number> --body "<updated body with #refs>"
   ```

### Step 6: Create Milestone (Optional)

If feature spans multiple PRs:

```bash
gh api repos/{owner}/{repo}/milestones -f title="<Feature Name>" -f description="<from spec>" -f due_on="<if applicable>"
```

Then assign issues to milestone:
```bash
gh issue edit <number> --milestone "<Feature Name>"
```

### Step 7: Create Project Board View (Optional)

If using GitHub Projects:

```bash
# Add issues to project
gh project item-add <project-number> --owner <owner> --url <issue-url>
```

### Step 8: Output Summary

```markdown
# GitHub Issues Created

**Feature:** <feature-name>
**Total Issues:** X
**Milestone:** <if created>

## Issues by Phase

### Phase 1: Foundation
- #XX: <title> [P] ~XXX LOC
- #XX: <title> [S] ~XXX LOC

### Phase 2: Implementation
- #XX: <title> [P] ~XXX LOC
...

## PR Checkpoints

| Checkpoint | Issues | Est. LOC |
|------------|--------|----------|
| Foundation | #XX, #XX | ~XXX |
| Core Feature | #XX, #XX, #XX | ~XXX |
...

## Dependency Graph

```
#XX (setup) --> #XX (component)
                     |
                     v
                #XX (integration)
```

## Labels Used
- feature:<name>
- phase:1-4
- type:foundation/implementation/integration/polish
- parallelizable/sequential
- loc:small/medium/large
```

## Behavior Rules

- One issue per atomic task (or logical grouping)
- Always include spec reference
- Always include LOC estimate
- Mark dependencies explicitly
- Use consistent labeling
- Group by PR checkpoint when possible

## Commands Reference

```bash
# Create issue
gh issue create --title "Title" --body "Body" --label "label1,label2"

# List issues for feature
gh issue list --label "feature:<name>"

# Edit issue
gh issue edit <number> --body "Updated body"

# Create milestone
gh api repos/{owner}/{repo}/milestones -f title="Name"

# Add to milestone
gh issue edit <number> --milestone "Name"
```

## Next Steps

After issue creation:
1. Review issues in GitHub
2. Adjust dependencies if needed
3. `/speckit.implement` to start working through issues
