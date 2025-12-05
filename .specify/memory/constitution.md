<!--
SYNC IMPACT REPORT
==================
Version change: 1.1.2 (Anti-MVP exception) → 1.1.3 (December 2025 dependency updates)

Modified sections:
- Technology Stack: Updated all service versions to December 2025 current
  - Directus 10.x → 11.x
  - Ghost 5.x → 6.x
  - Listmonk → 5.x (pinned)
  - PostgreSQL 15 → 17
  - Redis → 8

Existing principles (unchanged):
- I. Owner-First Simplicity
- II. Heart of West Virginia
- III. Modular Service Architecture
- IV. Developer-Managed Infrastructure
- V. Dual-Experience Design (Responsive Web)
- VI. Anti-MVP Bias

Previous versions:
- 1.1.2: Added Anti-MVP exception for .env.example placeholder files
- 1.1.1: Clarified Principle V - responsive web design, not desktop apps
- 1.1.0: Added VI. Anti-MVP Bias (surprise gift quality, internal vs external shipping)
- 1.0.0: Initial ratification (5 principles)

Templates requiring updates:
- .specify/templates/plan-template.md ✅ compatible (generic Constitution Check)
- .specify/templates/spec-template.md ✅ compatible (no constitution refs)
- .specify/templates/tasks-template.md ✅ compatible (no constitution refs)
- .coderabbit.yaml ✅ compatible (no version refs)

Follow-up TODOs:
- Update existing specs to reflect new dependency versions
- Verify Docker stack works with updated images
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

Braxton County sits at the geographic center of West Virginia — a gateway to everything
the Mountain State offers. All content MUST celebrate this heritage: hunting, fishing,
outdoor culture, and the tight-knit community of Birch River. Authenticity over corporate
polish.

**Non-negotiable rules:**
- Voice and tone MUST reflect rural West Virginia authenticity
- Stock photography MUST NOT replace real store/product/people images
- Content MUST reference local landmarks, seasons, and traditions
- Marketing MUST prioritize community trust over conversion optimization

**Rationale:** WV Wild Outdoors succeeds because it's a real store run by real people
who know their customers by name. The digital presence must amplify this, not replace it.

### III. Modular Service Architecture

The system MUST be composed of loosely coupled services that can be replaced
independently. Each service owns its domain and communicates through well-defined APIs.

**Non-negotiable rules:**
- Services: Directus (CMS), Ghost (Blog), Astro (Frontend), Listmonk (Email), Mixpost (Social)
- Each service MUST be deployable and testable in isolation
- Service failure MUST NOT cascade to unrelated functionality
- Data synchronization MUST happen through explicit integration points, not shared databases
- New services MUST integrate via documented APIs, not direct database access

**Rationale:** Small business technology needs change. Vendor lock-in kills flexibility.
Any component can be swapped without rebuilding the entire system.

### IV. Developer-Managed Infrastructure

Matt owns ALL backend systems, deployment, updates, security, and configuration.
Kim MUST NEVER need to access servers, databases, or configuration files.

**Non-negotiable rules:**
- Kim's access: Directus admin panel, Ghost editor, Facebook, email review
- Matt's access: Everything else (servers, DNS, Docker, backups, monitoring)
- All production changes MUST go through Matt
- Emergency procedures MUST have Matt as primary contact
- Documentation MUST distinguish "Kim does this" vs "Matt does this"

**Rationale:** Clear ownership prevents accidents. Kim focuses on business, Matt focuses
on technology. No gray areas, no "just SSH in and fix it" situations for non-technical users.

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
- Data MUST persist correctly across service restarts (no data loss)
- Error handling MUST be user-friendly (no stack traces or technical jargon)
- "Would Kim actually use this in the store?" test MUST pass

**External Shipping** (Public launch — ALL 13 items MUST be complete):
1. All 7 services production-ready (Astro, Directus, Ghost, Listmonk, Mixpost, PostgreSQL, Redis)
2. SSL certificates working (Traefik + Let's Encrypt automated renewal)
3. Subdomain routing functional (admin.*, blog.*, mail.*, analytics.*)
4. Analytics tracking operational (Umami fully configured)
5. Newsletter system functional end-to-end (Listmonk tested with real emails)
6. Social media scheduling tested (Mixpost Facebook integration verified)
7. Directus admin fully mobile-responsive (Kim's phone workflow validated)
8. Ghost blog theme complete and branded (WVWO visual identity applied)
9. Backups automated and tested (restoration procedure verified and documented)
10. Documentation complete (Kim training guide + Matt operations runbook)
11. Performance validated (90+ mobile PageSpeed on all public pages)
12. Monitoring/alerting configured (uptime checks, error notifications to Matt)
13. DNS/Cloudflare CDN configured (domain propagated, CDN caching optimized)

**Code Quality Requirements:**
- NO "TODO: add later" comments (either implement now or remove)
- NO placeholder data in seed files, schemas, or UI ("lorem ipsum", "$99.99", "Test Product")
- NO missing error handling ("we'll add validation later")
- NO deferred accessibility ("we'll make it WCAG compliant in v2")
- NO partial features ("basic version works, we'll polish later")
- NO commented-out code waiting for "the right time"

**Exception**: Environment template files (`.env.example`, `.env.template`) MUST use
placeholders for security - this is intentional and required to prevent accidental secret commits.

**Rationale:** This digital ecosystem represents Kim and Bryan's business to the
Birch River community and beyond. A buggy website damages their hard-earned
reputation. In a small town (population ~500), word spreads fast. There's no tech
support hotline for Kim to call — it must simply work. This project is Matt's gift
of empowerment, not a burden of maintenance. Ship it complete or don't ship it at all.

## Technology Stack

The following technologies are approved for this project. Deviations require constitution
amendment.

**Frontend:**
- Astro (static site generation)
- Tailwind CSS (styling)
- Vanilla JavaScript (interactivity, minimal dependencies)

**Backend Services:**
- Directus 11.x (headless CMS for products, FAQs, store info)
- Ghost 6.x (blog and content publishing)
- Listmonk 5.x (email newsletter management)
- Mixpost (social media scheduling)

**Infrastructure:**
- Docker & Docker Compose (containerization)
- PostgreSQL 17 (database)
- Redis 8 (caching)
- Traefik (reverse proxy)
- DigitalOcean (hosting)
- Cloudflare (DNS, CDN)
- Backblaze B2 (backups, media storage)

**Constraints:**
- No client-side JavaScript frameworks (React, Vue, etc.) for public pages
- No WordPress, Shopify, or monolithic platforms
- No services requiring Kim to manage credentials or API keys

## Roles & Responsibilities

### Kim (Store Owner)
- Add/edit products via Directus forms
- Write/publish blog posts via Ghost
- Respond to Facebook messages
- Review monthly newsletter drafts
- Collect customer emails at checkout

### Matt (Developer/Administrator)
- All server administration and deployment
- Database management and backups
- Security updates and monitoring
- Integration development and maintenance
- Training and documentation for Kim
- Monthly system health reviews
- Emergency response and incident management

### Boundary Rules
- If it requires a terminal: Matt's responsibility
- If it requires a password Kim doesn't have: Matt's responsibility
- If it involves customer-facing content: Kim's responsibility (Matt supports)
- If it involves money/transactions: Discuss together, Matt implements

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
- All feature specifications MUST include Constitution Check section verifying all 6 principles
- All implementation plans MUST verify principle alignment before coding
- Anti-MVP Bias checklist (Internal + External shipping criteria) MUST be completed before merge
- Violations MUST be documented with explicit justification in Complexity Tracking

**Guidance File:** See `wv-wild-blueprint.md` for detailed implementation guidance
and phase-by-phase build instructions.

**Version**: 1.1.3 | **Ratified**: 2025-12-04 | **Last Amended**: 2025-12-05
