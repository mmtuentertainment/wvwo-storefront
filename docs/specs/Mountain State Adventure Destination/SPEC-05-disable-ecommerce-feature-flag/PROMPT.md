# SPEC-05: Disable E-Commerce Feature Flag

You are Claude Opus 4.5 orchestrating hierarchical research swarm to design and implement feature flag system for commerce disabling.

## Agent Selection

Read: `C:\Users\matth\Desktop\wvwo-storefront\docs\claude-code-agents-wvwo.html`

**Selected for This Spec**:
- **Queen**: hierarchical-coordinator (orchestrates swarm, synthesizes plan)
- **Scout 1**: scout-explorer (cart dependency tree analysis)
- **Scout 2**: scout-explorer (feature flag pattern research)
- **Scout 3**: scout-explorer (product CTA analysis)
- **Architect 1**: code-architect (feature flag implementation design)
- **Architect 2**: system-architect (reversibility and rollback strategy)
- **Reviewer**: code-reviewer (validate approach, check for edge cases)

## Context Loading (PARALLEL - Execute ALL in single message)

Execute these 6 AgentDB commands in parallel:

```bash
# 1. Load full WVWO context (15 episodes)
npx agentdb@latest reflexion retrieve "WVWO" --k 15 --synthesize-context

# 2. Cart/checkout/commerce patterns
npx agentdb@latest reflexion retrieve "cart checkout commerce payment" --k 10 --synthesize-context

# 3. Feature flag and conditional rendering patterns
npx agentdb@latest reflexion retrieve "feature flags conditional rendering environment variables" --k 10 --synthesize-context

# 4. Product CTA patterns
npx agentdb@latest reflexion retrieve "product cards call-to-action" --k 10 --synthesize-context

# 5. Learn from failures (critical - avoid repeating mistakes)
npx agentdb@latest reflexion retrieve "WVWO" --k 10 --only-failures

# 6. Database stats
npx agentdb@latest db stats
```

After loading, acknowledge with brief summary:
> "Loaded WVWO context: [X] episodes, [Y] failure patterns, [Z] commerce-related approaches."

## Enter Plan Mode

**IMMEDIATELY use EnterPlanMode tool** before spawning agents.

## Hierarchical Swarm Setup

### Queen Coordinator

```
Task("Commerce disable orchestration", "Orchestrate scout research and architect design for PUBLIC_COMMERCE_ENABLED=false feature flag. Coordinate 3 scouts (dependencies, patterns, CTAs) + 2 architects (implementation, reversibility). Synthesize complete plan.md with file-by-file implementation spec.", "hierarchical-coordinator")
```

### Scout Team (3 parallel tasks)

**Scout 1 - Cart Dependency Tree**:
```
Task("Cart dependency analysis", "Map ALL cart/checkout dependencies in codebase. Execute these searches IN PARALLEL:

1. Grep 'cart' --output-mode content -n (find all cart references)
2. Grep 'checkout' --output-mode content -n
3. Grep 'PUBLIC_COMMERCE_ENABLED' --output-mode content -n (check existing flag usage)
4. Read wv-wild-web/src/components/Header.astro:33,40 COMPLETE (cart link in nav)
5. Read wv-wild-web/src/layouts/Layout.astro:203-205 COMPLETE (cart script tag)

Document dependency tree:
- Navigation (Header.astro cart link)
- Layout (cart.js script injection)
- Product cards (Add to Cart buttons)
- Shop pages (/shop/*.astro - which render products)
- Checkout pages (if exist)

Output: Complete file list with line numbers where cart/commerce appears.", "scout-explorer")
```

**Scout 2 - Feature Flag Patterns**:
```
Task("Feature flag pattern research", "Research best practices for PUBLIC_COMMERCE_ENABLED flag:

1. Read wv-wild-web/src/components/checkout/PaymentSection.tsx COMPLETE (existing PUBLIC_ env pattern)
2. Grep 'import.meta.env.PUBLIC_' --output-mode content -n (find all PUBLIC_ usage)
3. Skill search 'environment variables config Astro' 5 (find config patterns)

Document:
- Where to define flag (astro.config.mjs, .env)
- How Astro exposes PUBLIC_ vars to client
- Conditional rendering patterns ({ import.meta.env.PUBLIC_COMMERCE_ENABLED && <Cart /> })
- Build-time vs runtime implications

Output: Flag implementation pattern with Astro-specific guidance.", "scout-explorer")
```

**Scout 3 - Product CTA Analysis**:
```
Task("Product CTA transformation research", "Analyze how product cards should behave with commerce disabled:

1. Skill search 'product card component' 5
2. Grep 'Add to Cart' --output-mode content -n (find all CTA buttons)
3. WebSearch 'product catalog without e-commerce best practices' (research browse-only patterns)

When PUBLIC_COMMERCE_ENABLED=false:
- What replaces 'Add to Cart' button? (Call us, email, visit shop)
- How to maintain product information value?
- WVWO voice for browse-only CTAs

Output: CTA transformation spec with Kim's voice alternatives.", "scout-explorer")
```

### Architect Team (2 sequential tasks, after scouts complete)

**Architect 1 - Feature Flag Implementation Design**:
```
Task("Feature flag implementation architecture", "Design file-by-file implementation plan based on scout findings:

1. Environment variable setup (.env, astro.config.mjs)
2. Header.astro modifications (conditional cart link rendering)
3. Layout.astro modifications (conditional cart.js script)
4. Product card modifications (CTA transformation)
5. Shop page modifications (if needed)
6. Type safety (TypeScript for env vars)

For EACH file:
- Exact changes (line numbers if scouts provided)
- Conditional logic pattern
- Fallback content when flag=false
- WVWO aesthetic compliance

Output: Complete architecture document with code patterns.", "code-architect")
```

**Architect 2 - Reversibility Strategy**:
```
Task("Reversibility and rollback design", "Design how to safely toggle commerce back ON:

1. What happens to existing .env settings when toggling?
2. How to test both states (flag=true, flag=false)?
3. What data persists vs gets hidden? (products still exist, just cart hidden)
4. How to avoid breaking changes to product data structures?

Critical: Commerce isn't being REMOVED, just HIDDEN. Products, descriptions, images all stay. Only cart/checkout UI disappears.

Output: Rollback strategy, testing checklist, data preservation guarantees.", "system-architect")
```

### Review Team (1 final task)

**Reviewer - Validation**:
```
Task("Feature flag approach review", "Review architect designs for edge cases and risks:

1. Check: All cart entry points covered? (nav, product cards, direct /cart URL)
2. Check: Client-side vs server-side rendering implications?
3. Check: SEO impact of hiding commerce? (product pages still indexable?)
4. Check: Mobile menu cart link handled?
5. Check: WVWO aesthetic maintained with new CTAs?

Flag any gaps or risks. Suggest additions to plan.

Output: Validation report with go/no-go recommendation.", "code-reviewer")
```

## Write plan.md

**Queen synthesizes complete plan.md** after all agents report:

### Required Sections

1. **Research Summary**
   - Scout findings consolidated
   - Dependency map
   - Feature flag pattern chosen
   - CTA transformation approach

2. **Architecture**
   - File-by-file implementation spec
   - Environment variable configuration
   - Conditional rendering patterns
   - Type safety implementation

3. **Implementation Steps**
   - Step 1: Environment setup (.env.example, astro.config.mjs)
   - Step 2: Header.astro modifications (exact line changes)
   - Step 3: Layout.astro modifications (exact line changes)
   - Step 4: Product card CTA transformation (component changes)
   - Step 5: Testing checklist (both flag states)

4. **Reversibility Plan**
   - How to re-enable commerce
   - Data preservation guarantees
   - Testing strategy for both states

5. **WVWO Compliance**
   - New CTA voice examples (Kim's tone for "Call us" alternatives)
   - Aesthetic consistency (buttons, links, colors)
   - Mobile responsiveness

6. **Acceptance Criteria**
   - [ ] PUBLIC_COMMERCE_ENABLED=false hides all cart/checkout UI
   - [ ] Products remain browsable and informative
   - [ ] New CTAs match Kim's voice
   - [ ] Reversible with single env var change
   - [ ] No breaking changes to product data
   - [ ] Mobile and desktop tested

## WVWO Context

### Project Goal
Prepare for strategic pivot from e-commerce storefront to adventure destination hub. Phase 3C e-commerce will be re-enabled later with adjusted focus (shippable gear only, not firearms).

### Current State
- **Tech**: Astro 5.x + Tailwind CSS 4.x + React/shadcn components
- **Commerce**: Cart (cart.js), checkout (PaymentSection.tsx), product cards with "Add to Cart"
- **Products**: Store data (guns, ammo, gear) - keep data, hide buying UI

### Constraints
1. **Reversibility**: Must be single env var toggle (PUBLIC_COMMERCE_ENABLED=true/false)
2. **Data Preservation**: Products, images, descriptions stay intact
3. **WVWO Voice**: New CTAs must sound like Kim ("Give us a call" not "Contact us")
4. **No Breaking Changes**: Don't restructure product data, just hide commerce UI
5. **Shop Browsability**: /shop pages remain accessible, products informative

### Success Metrics
- Commerce UI completely hidden when flag=false
- Products display correctly without cart (informational value retained)
- New CTAs feel authentic (pass "Would Kim say this?" test)
- Re-enabling requires ONLY changing env var to true
- Zero errors in console with flag disabled

### Files to Research (Scout Starting Points)

**Cart Navigation**:
- `wv-wild-web/src/components/Header.astro:33` (desktop cart link)
- `wv-wild-web/src/components/Header.astro:40` (mobile cart link)

**Cart Script Injection**:
- `wv-wild-web/src/layouts/Layout.astro:203-205` (cart.js script tag)

**Existing PUBLIC_ Pattern**:
- `wv-wild-web/src/components/checkout/PaymentSection.tsx` (PUBLIC_STRIPE_KEY usage example)

**Product Display**:
- Shop pages: `wv-wild-web/src/pages/shop/*.astro`
- Product cards: Use skill search to locate

**Config**:
- `wv-wild-web/.env` (environment variables)
- `wv-wild-web/astro.config.mjs` (Astro config)

---

## Execution Protocol

1. **Context Loading**: Execute 6 parallel AgentDB commands, acknowledge results
2. **Enter Plan Mode**: Use EnterPlanMode tool
3. **Spawn Queen**: Single hierarchical-coordinator task
4. **Queen Spawns Team**: Queen spawns 3 scouts (parallel) + 2 architects (sequential) + 1 reviewer (final)
5. **Queen Synthesizes**: Complete plan.md following required sections above
6. **Exit Plan Mode**: Queen signals completion

**Timeline**: Scouts complete → Architects design → Reviewer validates → Queen writes plan.md

**Deliverable**: Complete `plan.md` with file-by-file implementation spec for PUBLIC_COMMERCE_ENABLED feature flag.
