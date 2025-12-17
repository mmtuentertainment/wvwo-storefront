---
description: Generate a custom checklist for the current feature based on user requirements.
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep"]
handoffs:
  - label: Start Implementation
    agent: speckit.implement
    prompt: Begin implementing with checklist guidance
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

Goal: Generate a feature-specific checklist combining standard quality gates with custom requirements.

### Step 1: Load Context

1. **Find active feature:**
   ```bash
   git branch --show-current
   ```

2. **Load artifacts:**
   ```
   docs/specs/<phase>/<feature-name>/spec.md
   docs/specs/<phase>/<feature-name>/plan.md (if exists)
   ```

3. **Load constitution** for compliance checks:
   ```
   docs/specs/constitution.md
   ```

4. **Load WVWO context:**
   ```
   .agentdb/wvwo-context.json
   ```

5. **Load CLAUDE.md (MANDATORY - ALL RULES):**
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

### Step 2: Analyze Feature Type

Determine checklist categories based on feature:

| Feature Type | Extra Checks |
|--------------|--------------|
| UI Component | Accessibility, responsive, WVWO aesthetic |
| Data/API | Validation, error handling, types |
| E-commerce | FFL compliance, Stripe integration, checkout flow |
| Content | Voice/tone, SEO, schema.org |
| Form | Validation, error messages, success states |

### Step 3: Generate Checklist

Create `docs/specs/<phase>/<feature-name>/checklist.md`:

```markdown
# Implementation Checklist: <Feature Name>

**Generated:** <YYYY-MM-DD>
**Spec Version:** <from spec.md>

## Pre-Implementation

### Context Loaded
- [ ] Read spec.md completely
- [ ] Read plan.md (if exists)
- [ ] Understand acceptance criteria
- [ ] Identify dependencies

### Environment Ready
- [ ] On correct feature branch
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)

## During Implementation

### Code Quality
- [ ] TypeScript types defined (no `any`)
- [ ] No hardcoded values (use constants/config)
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] Empty states implemented

### WVWO Aesthetic Compliance
- [ ] Uses approved fonts (Bitter, Permanent Marker, Noto Sans)
- [ ] Uses brand colors (brand-brown, sign-green, brand-cream, brand-orange)
- [ ] Orange used sparingly (<5% of screen)
- [ ] Sharp corners (rounded-sm, not rounded-xl)
- [ ] No glassmorphism or neumorphism
- [ ] No bouncy/parallax animations
- [ ] Voice matches Kim's tone

### Accessibility
- [ ] Semantic HTML elements
- [ ] Alt text for images
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Screen reader friendly

### Responsive Design
- [ ] Mobile (375px) renders correctly
- [ ] Tablet (768px) renders correctly
- [ ] Desktop (1280px) renders correctly
- [ ] No horizontal scroll on mobile

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] No blocking scripts
- [ ] Lazy loading where appropriate

## Pre-Commit

### Build Verification
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] No ESLint warnings

### Testing
- [ ] Unit tests pass (if applicable)
- [ ] Manual testing complete
- [ ] Edge cases tested

### Documentation
- [ ] Code comments where non-obvious
- [ ] README updated (if needed)

## Pre-PR

### PR Size
- [ ] Total LOC < 400 (ideal)
- [ ] Total LOC < 500 (maximum)
- [ ] Single logical change
- [ ] PR description complete

### CodeRabbit Ready
- [ ] `@coderabbit wvwo-summary` placeholder included
- [ ] Spec reference in description
- [ ] Test plan documented
- [ ] Files changed listed

### Constitutional Compliance
- [ ] No forbidden frameworks (Vue, Angular, Svelte)
- [ ] No paid services without approval
- [ ] No corporate marketing tone
- [ ] Simplicity maintained

## Feature-Specific Checks

<Generated based on feature type - see Step 2>

### <Category 1>
- [ ] <Custom check 1>
- [ ] <Custom check 2>

### <Category 2>
- [ ] <Custom check 1>
- [ ] <Custom check 2>

## Sign-Off

| Check | Status | Notes |
|-------|--------|-------|
| Code Quality | ⬜ | |
| WVWO Aesthetic | ⬜ | |
| Accessibility | ⬜ | |
| Responsive | ⬜ | |
| Performance | ⬜ | |
| Build | ⬜ | |
| Tests | ⬜ | |
| PR Ready | ⬜ | |
| Constitutional | ⬜ | |

**Ready for PR:** ⬜ Yes / ⬜ No - needs work
```

### Step 4: Add Feature-Specific Checks

Based on feature analysis, add relevant sections:

#### For UI Components
```markdown
### Component-Specific
- [ ] Astro component (not React unless interactive)
- [ ] Props typed with TypeScript
- [ ] Default props provided
- [ ] Slot support (if applicable)
- [ ] Tailwind classes (no inline styles)
```

#### For E-commerce Features
```markdown
### E-commerce Compliance
- [ ] Stripe integration tested
- [ ] FFL compliance checked (for firearms)
- [ ] Price formatting correct
- [ ] Cart state management works
- [ ] Checkout flow complete
- [ ] Error handling for payment failures
```

#### For Forms
```markdown
### Form Quality
- [ ] Validation on submit
- [ ] Real-time validation (if appropriate)
- [ ] Error messages in Kim's voice
- [ ] Success confirmation
- [ ] Web3Forms integration (if contact form)
- [ ] Required fields marked with orange asterisk
```

#### For Content Pages
```markdown
### Content Quality
- [ ] Kim's voice throughout
- [ ] No corporate buzzwords
- [ ] SEO meta tags
- [ ] Schema.org markup (if applicable)
- [ ] Internal links work
- [ ] Images have alt text
```

### Step 5: Output Summary

Report:
- Path to checklist.md
- Feature type detected
- Number of check items
- Feature-specific sections added

## Behavior Rules

- Always include standard quality gates
- Add feature-specific checks based on feature type
- Keep checks actionable and verifiable
- Use checkbox format for easy tracking
- Include sign-off section for final review

## Next Steps

After checklist generation:
1. `/speckit.implement` - Start implementation with checklist
2. Review checklist during implementation
3. Complete sign-off before PR
