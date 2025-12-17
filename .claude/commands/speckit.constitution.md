---
description: Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
handoffs:
  - label: Create New Spec
    agent: speckit.specify
    prompt: Create a new feature spec aligned with constitution
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Create or update the project constitution that governs all feature development.

### Step 1: Check Existing Constitution

1. **Look for existing constitution:**
   ```
   docs/specs/constitution.md
   .specify/constitution.md
   ```

2. **If exists:** Load for update mode
3. **If not exists:** Create new in `docs/specs/constitution.md`

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
   - Frontend aesthetics (for any UI content)

   **Note:** The constitution should align with and reinforce CLAUDE.md rules.

### Step 2: Gather Principles (Interactive or Provided)

If user provided principles in $ARGUMENTS, use those.

Otherwise, ask about each category:

#### Core Identity
```
What is this project? Who is it for?
Example: "WV Wild Outdoors - Kim & Bryan's hunting shop for local neighbors and I-79 highway hunters"
```

#### Tech Stack Constraints
```
What technologies are approved?
What is explicitly forbidden?
```

#### Voice & Tone
```
How should content sound?
What phrases/styles to avoid?
```

#### Design Principles
```
What aesthetic applies?
What visual patterns to avoid?
```

#### Business Constraints
```
Budget considerations?
Free-tier requirements?
Compliance needs?
```

### Step 3: Generate Constitution

Create `docs/specs/constitution.md`:

```markdown
# Project Constitution

**Version:** X.Y.Z
**Created:** <YYYY-MM-DD>
**Last Updated:** <YYYY-MM-DD>

## Purpose

This constitution defines the guiding principles for all development on this project. Every feature spec, implementation plan, and code change must align with these principles.

## Core Identity

**Project:** <Name>
**Description:** <What it is, who it serves>
**Mission:** <Core purpose>

## Guiding Principles

### Principle I: <Name>
**Statement:** <One sentence principle>
**Meaning:** <What this means in practice>
**Check:** <Question to verify compliance>
**Examples to avoid:** <Anti-patterns>

### Principle II: <Name>
...

### Principle III: <Name>
...

## Tech Stack

### Approved Technologies
| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| Framework | <e.g., Astro> | <e.g., 5.x> | <Primary> |
| Styling | <e.g., Tailwind CSS> | <e.g., 4.x> | |
| Interactive | <e.g., React + shadcn> | | <When needed> |
| Hosting | <e.g., Cloudflare Pages> | | <Free tier> |

### Forbidden Technologies
| Technology | Reason |
|------------|--------|
| <e.g., Vue, Angular, Svelte> | <Not approved for this project> |
| <e.g., Next.js> | <Unnecessary complexity> |

## Voice & Tone

### Do Use
- <Example phrase/style>
- <Example phrase/style>

### Never Use
- <Forbidden phrase/style>
- <Forbidden phrase/style>

### Voice Examples
```
WRONG: "<Corporate example>"
RIGHT: "<Authentic example>"
```

## Design System

### Colors
| Name | Value | Use |
|------|-------|-----|
| <e.g., brand-brown> | <e.g., #3E2723> | <Primary text> |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Display | <e.g., Bitter> | 700-900 |
| Body | <e.g., Noto Sans> | 400-500 |

### Forbidden Patterns
- <e.g., Glassmorphism>
- <e.g., Purple gradients>
- <e.g., Bouncy animations>

## Business Constraints

### Budget
- <e.g., Prefer free-tier services>
- <e.g., No monthly costs without approval>

### Compliance
- <e.g., FFL requirements for firearms>
- <e.g., Accessibility standards>

## Enforcement

### Pre-Merge Checks
Every PR must pass:
- [ ] Constitutional compliance review
- [ ] Tech stack verification
- [ ] Voice/tone check
- [ ] Design system adherence

### Violation Handling
- **Critical:** Block merge, must fix
- **Warning:** Note in review, should fix
- **Info:** Suggestion, optional fix

## Changelog

### Version X.Y.Z (<YYYY-MM-DD>)
- <Change description>

### Version X.Y.Z (<YYYY-MM-DD>)
- <Change description>
```

### Step 4: WVWO-Specific Content

For WVWO project, include these established principles:

```markdown
### Principle I: Simplicity Over Complexity
**Statement:** Simpler is better for small business.
**Meaning:** We pivoted from Docker/Directus to static Astro. Don't over-engineer.
**Check:** Does this add unnecessary complexity?
**Examples to avoid:** Databases, CMS systems, microservices

### Principle II: Authentic Over Corporate
**Statement:** Kim's real voice, not marketing speak.
**Meaning:** Rural WV culture, not Silicon Valley.
**Check:** Does this sound like corporate marketing?
**Examples to avoid:** Buzzwords, "solutions provider", "synergy"

### Principle III: Free Over Expensive
**Statement:** Minimize monthly costs for Kim.
**Meaning:** Cloudflare Pages free tier. Web3Forms free tier.
**Check:** Does this cost money monthly?
**Examples to avoid:** Paid APIs, premium services, subscriptions

### Principle IV: Local + Highway
**Statement:** Serve both local neighbors AND out-of-state hunters.
**Meaning:** SEO and e-commerce are in scope for Phase 3.
**Check:** Does this serve both audiences?

### Principle V: Quality Over Speed
**Statement:** Do it RIGHT, not fast.
**Meaning:** No artificial deadlines. This is not an MVP.
**Check:** Am I rushing or cutting corners?
```

### Step 5: Sync Dependent Files

After constitution update:

1. **Update CLAUDE.md** if constitutional principles changed
2. **Update .agentdb/wvwo-context.json** if core context changed
3. **Notify** about any specs that may need review

### Step 6: Output Summary

Report:
- Path to constitution.md
- Version number
- Number of principles defined
- Tech stack summary
- Any files that need sync

## Behavior Rules

- Constitution is the source of truth for project principles
- All specs must reference and comply with constitution
- Version the constitution (semantic versioning)
- Keep changelog updated
- Sync dependent files when constitution changes

## Next Steps

After constitution creation/update:
1. Review and approve changes
2. Update any out-of-sync files
3. `/speckit.specify` to create compliant specs
