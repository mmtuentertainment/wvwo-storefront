# Architectural Pivot Rationale: E-Commerce to Adventure Destination

## Context
As of December 2025, WV Wild Outdoors (WVWO) is strategically pivoting from a pure e-commerce storefront to a comprehensive West Virginia outdoor adventure destination hub.

## Key Decisions

### 1. Disabling E-Commerce (Phase 3B/C Halt)
- **Rationale**: Concerns regarding online transaction fraud and the desire to focus on in-person engagement at the Birch River flagship store.
- **Implementation**: Controlled via `PUBLIC_COMMERCE_ENABLED` feature flag.
- **User Impact**: "Add to Cart" is replaced with "Call to Order".
- **Reversibility**: The e-commerce code remains in the codebase (Cart components, Checkout logic) but is hidden and deactivated. It can be re-enabled by toggling the flag.

### 2. Content Collections for Adventures
- **Rationale**: Scalability and SEO. Moving from hardcoded `.astro` pages in `src/pages/near/*` to a structured data model in `src/content/adventures/`.
- **Relationship**: The new approach *replaces* the old pattern. New destination pages (State Parks, WMAs, Lakes) must use the Content Collection schema defined in SPEC-06.
- **Legacy Support**: Existing pages in `src/pages/near/` will be migrated to the new schema over time.

### 3. Voice & Tone (Kim's Authentic Voice)
- All new destination and adventure content must adhere to the "Rural/Direct" voice markers (direct, honest, personal, mentions specific local knowledge).
- Avoid "Corporate/Marketing" fluff (excessive exclamation marks, generic adjectives like "endless adventure").

## Compliance
All agents and swarms MUST refer to this document when making architectural or content decisions.
