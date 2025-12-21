---
description: Bridge Antigravity to the 'Specify' multi-agent orchestration system
---

# Antigravity Specify Bridge

This workflow allows Antigravity to seamlessly integrate with the project's 'Specify' orchestration system (originally designed for Claude Code).

## Core Principles

1. **Leverage Bash Scripts**: Always use the scripts in `.specify/scripts/bash/` (located in `.specify` root or via wildcard `my*finances/.specify`).
2. **Synchronize Context**: Use `update-agent-context.sh gemini` to maintain a local `GEMINI.md`. This is CRITICAL for Antigravity to stay aligned with the project's tech stack and rules.
3. **Artifact Mapping**:
    - `specs/[feature]/spec.md` -> Requirements & User Stories
    - `specs/[feature]/plan.md` -> Technical Design & Structure
    - `implementation_plan.md` (Artifact) -> The active execution plan for this session.

## Operational Workflow

### Project-Specific Setup
The WVWO project stores specs in `docs/specs/`. A directory junction `specs` -> `docs/specs` has been created in the root to allow the standard scripts to function correctly.

### 1. Starting a New Feature
When starting a new feature, follow this flow:
1. **Branch**: `git checkout -b feat/your-feature`
2. **Setup Spec**: Create `docs/specs/[Category]/[Feature]/spec.md` using the template.
3. **Update Bridge Variable**: Always set `SPECIFY_FEATURE` environment variable when running scripts if not using standard numeric prefixes.

### 2. Planning & Sync
1. **Setup Plan**: Create `plan.md` in the spec folder.
2. **Synchronize**:
   ```bash
   bash -c "export REPO_ROOT=/mnt/c/Users/matth/Desktop/wvwo-storefront && export SPECIFY_FEATURE='Category/Feature' && bash /mnt/c/Users/matth/Desktop/my*finances/.specify/scripts/bash/update-agent-context.sh gemini"
   ```
3. **Internalize**: Read the newly updated `GEMINI.md` to ensure all rules are followed.

### 3. Execution
1. Create `implementation_plan.md` artifact.
2. Implement according to `plan.md`.

## Bridge Command List

| Shortcut | Action |
|----------|--------|
| `/specify sync` | Runs `update-agent-context.sh gemini` for the current feature. |
| `/specify status` | Displays the current `GEMINI.md` and feature branch status. |

## Hive Mind Integration
For complex specs, use the `/hive-mind` workflow to populate the `spec.md` and `plan.md` files. The Queen agent should ensure that all "NEEDS CLARIFICATION" fields are resolved before finishing.
