<!--
SYNC IMPACT REPORT
==================
Version change: 2.1.0 (Phase 3 Strategy) → 2.2.0 (Matt Runs Tech)

MINOR VERSION BUMP - Tech ownership clarified, React/shadcn approved.

Modified sections:
- Principle IV: Clarified Matt has FULL tech autonomy (architecture, frameworks, paid services)
- Technology Stack: Added React + shadcn/ui for interactive components
- Removed "No client-side JavaScript frameworks" constraint (React approved Dec 2025)
- Removed "free tier" emphasis - Matt decides on paid services based on business value

Previous versions:
- 2.1.0: Phase 3 Strategy & Geographic Positioning
- 2.0.0: Simple Static Approach - architecture pivot from enterprise to static
- 1.1.3: December 2025 dependency updates
- 1.1.2: Added Anti-MVP exception for .env.example placeholder files
- 1.1.1: Clarified Principle V - responsive web design, not desktop apps
- 1.1.0: Added VI. Anti-MVP Bias (surprise gift quality, internal vs external shipping)
- 1.0.0: Initial ratification (5 principles)

Templates requiring updates:
- .specify/templates/plan-template.md ✅ compatible (generic Constitution Check)
- .specify/templates/spec-template.md ✅ compatible (no constitution refs)
- .specify/templates/tasks-template.md ✅ compatible (no constitution refs)
- .coderabbit.yaml ✅ compatible (no version refs)
- CLAUDE.md ✅ updated (TECH OWNER principle added)
- .agentdb/wvwo-context.json ✅ updated (MATT_RUNS_TECH principle added)
-->

# WV Wild Outdoors Storefront Constitution

## Core Principles

### I. Owner-First Simplicity

Kim MUST be able to manage all day-to-day operations from her phone without technical
knowledge. All owner-facing interfaces MUST use form fields, not code. No terminal access,
no configuration files, no database queries required for routine tasks.

**Non-negotiable rules:**
- Product updates MUST be achievable through simple form submission
- Error messages MUST be human-readable, not technical stack traces
- All admin interfaces MUST be mobile-responsive and touch-friendly
- Training time for any new feature MUST NOT exceed 15 minutes

**Rationale:** Kim runs a retail store. Her time is spent with customers, not computers.
Every minute spent fighting technology is a minute not spent growing the business.

### II. Heart of West Virginia

Braxton County sits at the geographic center of West Virginia — and WV Wild Outdoors
sits on **US 19 in Birch River** (I-79 Exit 57 access), the natural gateway for
350,000+ annual hunters traveling the corridor from PA, OH, and MD. All content MUST
celebrate this heritage: hunting, fishing, outdoor culture, and the tight-knit community
of Birch River. Authenticity over corporate polish.

**Non-negotiable rules:**
- Voice and tone MUST reflect rural West Virginia authenticity
- Stock photography MUST NOT replace real store/product/people images
- Content MUST reference local landmarks, seasons, and traditions
- Marketing MUST prioritize community trust over conversion optimization
- Homepage MUST emphasize US 19 location and I-79 Exit 57 access
- Content MUST serve both local customers AND highway travelers

**Rationale:** WV Wild Outdoors succeeds because it's a real store run by real people
who know their customers by name. The digital presence must amplify this, not replace it.
Kim sees out-of-state hunters walk in daily — the website must capture the same traffic.

### III. Modular Service Architecture

The system MUST be composed of loosely coupled components that can be replaced
independently. Each component owns its domain and integrates through well-defined patterns.

**Non-negotiable rules:**
- Components: Astro (static site), Buttondown (newsletter), Web3Forms (forms), YouTube (videos)
- Each component MUST be replaceable without rebuilding the entire system
- Component failure MUST NOT cascade to unrelated functionality
- New components MUST integrate via documented patterns (embeds, APIs, webhooks)

**Rationale:** Small business technology needs change. Vendor lock-in kills flexibility.
Any component can be swapped without rebuilding the entire system.

### IV. Matt Runs All Tech

Matt owns ALL technical decisions: architecture, frameworks, infrastructure, paid services,
and implementation choices. Kim MUST NEVER need to access servers, databases, or config files.

**Non-negotiable rules:**
- Kim's access: Website viewing, Facebook page, email review
- Matt's access: Everything else (GitHub, Cloudflare, DNS, deployments, all configs)
- All production changes MUST go through Matt
- Emergency procedures MUST have Matt as primary contact
- Documentation MUST distinguish "Kim does this" vs "Matt does this"
- Tech complexity is Matt's call - don't flag React/shadcn as "too complex"
- Paid services are Matt's call when business value justifies cost

**Rationale:** Clear ownership prevents accidents. Kim focuses on business, Matt focuses
on technology. Matt has full autonomy on tech decisions - architecture, frameworks, and
tooling choices are his domain. No second-guessing or suggesting "simpler" alternatives.

### V. Dual-Experience Design

The system MUST deliver first-class web experiences on BOTH desktop browsers and mobile
browsers. Desktop web serves power users and admin (Matt). Mobile web serves Kim and
on-the-go customers. This is a responsive web application, NOT a desktop app.

**Non-negotiable rules:**
- All public pages MUST score 90+ on mobile PageSpeed Insights
- Admin interfaces MUST be fully functional on desktop web browsers
- Kim's workflow MUST be optimized for phone-sized screens (mobile web)
- Customer-facing features MUST work identically on mobile and desktop web
- No "desktop browser-only" features for customer-facing functionality
- All interactions happen in web browsers (Chrome, Safari, Firefox, Edge)

**Rationale:** Matt manages systems from a desktop web browser. Kim manages inventory
from her phone's web browser between customers. Customers browse on whatever device they
have — all via web browsers. All experiences are first-class web, no apps to install.

### VI. Anti-MVP Bias

This is a surprise gift for Kim and Bryan. There are no second chances to make a first
impression. NO half-baked features, NO "we'll fix it later" promises, NO placeholder
content. Kim's store reputation depends on this working right the first time.

**Non-negotiable rules:**

**Internal Shipping** (Matt → Kim/Bryan testing):
- Feature MUST work correctly on Matt's development environment
- Kim MUST be able to use it from her phone without training beyond 15 minutes
- Data MUST persist correctly across page refreshes
- Error handling MUST be user-friendly (no stack traces or technical jargon)
- "Would Kim actually use this in the store?" test MUST pass

**External Shipping** (Public launch checklist):
1. All pages render correctly on mobile and desktop
2. Contact info confirmed and accurate (phone, address, hours)
3. SSL certificate working (https://)
4. Mobile PageSpeed score 90+
5. All forms submit successfully (tested with real submissions)
6. All links work (no 404s)
7. Images optimized and loading
8. SEO basics complete (meta tags, schema markup)
9. Domain connected and propagated
10. Analytics tracking operational

**Code Quality Requirements:**
- NO "TODO: add later" comments (either implement now or remove)
- NO placeholder data in UI ("lorem ipsum", "$99.99", "Test Product")
- NO missing error handling ("we'll add validation later")
- NO deferred accessibility ("we'll make it WCAG compliant in v2")
- NO partial features ("basic version works, we'll polish later")
- NO commented-out code waiting for "the right time"

**Exception**: Environment template files (`.env.example`, `.env.template`) MUST use
placeholders for security - this is intentional and required to prevent accidental secret commits.

**Anti-Speed Clause:**
- NO artificial deadlines or "ship it" pressure
- NO cutting features to meet arbitrary timelines
- NO "good enough for now" compromises
- Development proceeds at quality pace, not velocity metrics
- User explicitly stated: "I have time to do this, there is not a time constraint"

**Rationale:** This digital ecosystem represents Kim and Bryan's business to the
Birch River community and beyond. A buggy website damages their hard-earned
reputation. In a small town (population ~500), word spreads fast. There's no tech
support hotline for Kim to call — it must simply work. This project is Matt's gift
of empowerment, not a burden of maintenance. Ship it complete or don't ship it at all.

### VII. Appalachian Gateway Positioning

WV Wild Outdoors sits at the strategic heart of West Virginia's hunting economy:
- **US 19 (Old Turnpike)** between Sutton and Summersville
- **I-79 Exit 57** → south on US 19 → Birch River
- **Gateway to Elk River WMA** and central WV public hunting land
- **Central WV hub** for PA/OH/MD hunters traveling the I-79 corridor

**Non-negotiable rules:**
- Homepage MUST emphasize US 19 location and I-79 Exit 57 access
- All marketing MUST position as "gateway to central WV hunting"
- Content MUST serve both local customers AND highway travelers
- SEO MUST target out-of-state hunter searches
- Geographic positioning MUST appear in schema markup and metadata

**Rationale:** Kim sees out-of-state hunters walk in daily. The digital presence
must capture the same traffic the physical location does. The I-79 corridor is
WV's hunting highway — we position accordingly.

## Technology Stack

The following technologies are approved for this project. Matt may add tools as needed.

**Frontend:**
- Astro (static site generation)
- Tailwind CSS (styling)
- React + shadcn/ui (interactive components - approved Dec 2025)

**Services (External):**
- Buttondown (email newsletter)
- Web3Forms (contact/quote forms)
- YouTube (video hosting - embedded)
- Cloudflare Analytics (traffic tracking)
- Additional services as Matt determines business value justifies cost

**Infrastructure:**
- Cloudflare Pages (static hosting)
- Cloudflare (DNS, CDN)
- GitHub (version control, CI/CD)

**Constraints:**
- No Vue, Angular, Svelte, or other JS frameworks (React is the approved exception)
- No WordPress, Shopify, or monolithic platforms
- No services requiring Kim to manage credentials or API keys
- No databases or servers Kim needs to maintain (Matt can use as needed)

## Roles & Responsibilities

### Kim (Store Owner)
- Review website content for accuracy
- Provide photos of store, products, and events
- Respond to Facebook messages
- Collect customer emails at checkout (for newsletter)
- Review monthly newsletter drafts before send

### Matt (Developer/Administrator)
- All website updates and deployment
- Content changes (edit store.json, pages)
- Domain and hosting management
- Newsletter setup and sending (via Buttondown)
- Form configuration (Web3Forms)
- Google Business Profile management
- Monthly system health reviews
- Emergency response and incident management

### Boundary Rules
- If it requires GitHub: Matt's responsibility
- If it requires any login Kim doesn't have: Matt's responsibility
- If it involves customer-facing content accuracy: Kim's responsibility (Matt supports)
- If it involves money/transactions: E-commerce IS in scope (Phase 3C, with proper
  FFL compliance and security measures)

## Governance

This constitution supersedes all other development practices for the WV Wild Outdoors
Storefront project. All specifications, plans, and implementations MUST comply.

**Amendment Procedure:**
1. Propose change with rationale in writing
2. Assess impact on existing specifications and implementations
3. Update constitution with version increment
4. Propagate changes to dependent templates and documentation
5. Commit with clear changelog

**Versioning Policy:**
- MAJOR: Principle removal, redefinition, or backward-incompatible governance change
- MINOR: New principle added or existing principle materially expanded
- PATCH: Clarifications, typo fixes, non-semantic refinements

**Compliance Review:**
- All feature specifications MUST include Constitution Check section verifying all 7 principles
- All implementation plans MUST verify principle alignment before coding
- Anti-MVP Bias checklist (Internal + External shipping criteria) MUST be completed before merge
- Violations MUST be documented with explicit justification in Complexity Tracking

**Version**: 2.2.0 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-17
