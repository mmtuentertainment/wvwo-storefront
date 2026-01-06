# WV Wild Outdoors - Project Constitution (v2.2.0)

## I. Strategic Pivot: Mountain State Adventure Destination

**Mandatory Direction (as of Dec 2025):** The **Physical Retail Store** remains the #1 priority. The project pivot is about transforming the *digital presence* into a **Destination Hub** that supports the retail store. Online e-commerce is now secondary to the Adventure Hub and Retail experience.

1. **The Guardrail**: E-commerce UI (online sales) is disabled by the `PUBLIC_COMMERCE_ENABLED` feature flag. This is a strategic decision to prioritize in-person engagement and prevent online fraud.
2. **The Goal**: Capture traffic along the US 19 / I-79 corridor ("Highway Hunters") and convert them into **Physical Store Visitors** through high-value geographic content.
3. **The Tech**: All adventure content (WMAs, Lakes, Parks) MUST use **Astro Content Collections**. Legacy `.astro` page creation for geographic guides is deprecated (ref: SPEC-06, SPEC-12).
4. **The Synergy (Win-Win)**: The Adventure Hub is designed as a **Sustainable Income Source** for Matt (via sponsorships, affiliate, or premium content) while simultaneously serving as the primary "Top of Funnel" to drive **high-intent physical visitors** and massive visibility (eyes) to the family store along the I-79/US-19 corridor.

## II. Core Principles

### 1. Heart of West Virginia (Authentic Voice)

- **Voice**: Use Kim's authentic rural WV voice. Direct, personal, and knowledgeable about local hunting/fishing culture.
- **Cultural Accuracy**: Accurate terminology (e.g., "Buck Season", not "Deer Season"; "WMA", not "Conservation Area").
- **Anti-Corporate**: No SaaS-style marketing copy, no purple/neon gradients, no "AI slop" (Inter font, glassmorphism).
- **Historic Authenticity Exception**: SPEC-19+ historic sites may use extended Appalachian heritage color palette (heritage burgundy #93282c, aged gold #d18a00, coal-gray #424242, stone-gray #757575, heritage cream #fff8e9) to authentically tell stories of coal barons, labor struggles, moonshining heritage, and mountain defiance. These colors carry narrative meaning and evolve through sections (C→B→D→A arc: balanced truth → raw reality → defiant spirit → reverent honor).

### 2. Owner-First Simplicity

- **Maintenance**: The site must be manageable for Kim and Matt. Minimize technical overhead.
- **Independence**: Services must be modular and replaceable (e.g., using Web3Forms for contact).

### 3. Dual-Experience Design

- **Mobile First**: 80%+ of users are on mobile in the field. Mobile performance (PageSpeed 90+) is secondary to nothing.
- **Highway Waypointing**: Design for the traveler who needs directions, hours, and "in-stock" verification in 5 seconds.

### 4. Developer-Managed Infrastructure

- **Ownership**: Matt owns the tech. React/shadcn is approved because Matt manages it. Do not simplify at the cost of Matt's productivity.
- **Tools**: Use `scripts/` for common tasks. Ensure cross-platform (PS1/SH) compatibility.

### 5. Anti-MVP Bias (Quality Over Speed)

- **Completeness**: No half-baked features. If a feature is added (like the product catalog), it must be fully data-driven and polished.
- **No TODOs**: Do not leave "TODO" comments in code. Finish the thought or don't commit it.

## III. Governance & Compliance

- **Spec-Driven Development**: Every major change requires a SPEC folder in `docs/specs/`.
- **Review Protocol**: CodeRabbit and agents must verify alignment with this constitution before approval.
- **Persistence**: Refer to `PIVOT_RATIONALE.md` for historical context on why decisions were made.

---
**Version**: 2.2.0 | **Last Amended**: 2025-12-21 | **Ratified by**: Matt & Kim (Digital)
