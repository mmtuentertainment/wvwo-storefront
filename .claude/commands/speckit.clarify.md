---
description: Identify underspecified areas in the current feature spec by asking up to 5 highly targeted clarification questions and encoding answers back into the spec.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
handoffs:
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

Goal: Detect and reduce ambiguity in the active feature specification through targeted questions.

### Step 1: Load Feature Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Load spec file:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
   ```
   If not found, instruct user to run `/speckit.specify` first.

3. **Load constitution** (if exists) for context:
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
   - Frontend aesthetics (for any UI requirements)

### Step 2: Ambiguity Scan

Analyze spec against this taxonomy. Mark each: **Clear** / **Partial** / **Missing**

#### Functional Scope & Behavior
- Core user goals & success criteria
- Explicit out-of-scope declarations
- User roles/personas differentiation

#### Domain & Data Model
- Entities, attributes, relationships
- Identity & uniqueness rules
- Lifecycle/state transitions
- Data volume/scale assumptions

#### Interaction & UX Flow
- Critical user journeys/sequences
- Error/empty/loading states
- Accessibility or localization notes

#### Non-Functional Quality Attributes
- Performance (latency, throughput targets)
- Scalability (horizontal/vertical, limits)
- Reliability & availability
- Observability (logging, metrics)
- Security & privacy
- Compliance/regulatory constraints

#### Integration & External Dependencies
- External services/APIs and failure modes
- Data import/export formats
- Protocol/versioning assumptions

#### Edge Cases & Failure Handling
- Negative scenarios
- Rate limiting/throttling
- Conflict resolution

#### Constraints & Tradeoffs
- Technical constraints
- Explicit tradeoffs or rejected alternatives

#### Terminology & Consistency
- Canonical glossary terms
- Avoided synonyms/deprecated terms

#### Completion Signals
- Acceptance criteria testability
- Measurable Definition of Done

### Step 3: Generate Questions

Create prioritized queue (max 5 questions) based on:
- **Impact**: Would answer materially affect implementation?
- **Uncertainty**: How ambiguous is current state?
- **Coverage balance**: Don't ask 2 low-impact when high-impact unresolved

Question format requirements:
- Multiple-choice (2-5 options) OR short-answer (≤5 words)
- Each question must be answerable concisely

### Step 4: Interactive Questioning

Present ONE question at a time:

**For multiple-choice:**
```
**Recommended:** Option [X] - <reasoning>

| Option | Description |
|--------|-------------|
| A | <Option A> |
| B | <Option B> |
| C | <Option C> |

Reply with letter, "yes" for recommended, or short answer.
```

**For short-answer:**
```
**Suggested:** <proposed answer> - <reasoning>

Format: Short answer (≤5 words)
Reply "yes" for suggested, or your answer.
```

**Stop asking when:**
- All critical ambiguities resolved
- User signals done ("done", "good", "no more")
- 5 questions asked

### Step 5: Update Spec

After each accepted answer:

1. **Add to Clarifications section:**
   ```markdown
   ## Clarifications

   ### Session YYYY-MM-DD
   - Q: <question> → A: <answer>
   ```

2. **Update relevant spec section:**
   - Functional → Functional Requirements
   - Data shape → Data Model
   - Non-functional → Non-Functional Requirements
   - Edge case → Edge Cases
   - Terminology → Normalize across doc

3. **Remove contradictions:**
   - Replace ambiguous statements
   - Don't duplicate information

4. **Save immediately** after each integration

### Step 6: Validation

After each write:
- One bullet per accepted answer in Clarifications
- No duplicate information
- No lingering vague placeholders
- Terminology consistent throughout
- Markdown structure valid

### Step 7: Completion Report

```markdown
# Clarification Complete

**Questions asked:** X
**Spec updated:** docs/specs/<phase>/<feature>/spec.md

## Sections Updated
- <Section 1>
- <Section 2>

## Coverage Summary

| Category | Status |
|----------|--------|
| Functional Scope | Resolved/Deferred/Clear/Outstanding |
| Data Model | Resolved/Deferred/Clear/Outstanding |
| UX Flow | Resolved/Deferred/Clear/Outstanding |
| Non-Functional | Resolved/Deferred/Clear/Outstanding |
| Integration | Resolved/Deferred/Clear/Outstanding |
| Edge Cases | Resolved/Deferred/Clear/Outstanding |
| Constraints | Resolved/Deferred/Clear/Outstanding |
| Terminology | Resolved/Deferred/Clear/Outstanding |

## Recommendation

<Proceed to /speckit.plan OR run /speckit.clarify again>
```

## Behavior Rules

- Maximum 5 questions total
- One question at a time
- Always provide recommendation/suggestion
- Save spec after EACH accepted answer
- Never reveal future questions
- Respect early termination signals
- If no ambiguities found, say so and suggest proceeding

## Next Steps

After clarification:
1. `/speckit.plan` - Generate implementation plan
2. `/speckit.clarify` - Run again if deferred items remain
