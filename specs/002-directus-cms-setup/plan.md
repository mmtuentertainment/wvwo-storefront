# Implementation Plan: Directus CMS Setup

**Branch**: `002-directus-cms-setup` | **Date**: 2025-12-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-directus-cms-setup/spec.md`

## Summary

Configure Directus 11.x CMS with 8 content collections (categories, brands, products, store_info, homepage_features, announcements, services, pages), establish public API permissions for published content, and set up admin role for Kim's phone-based content management. Schema already defined in `directus-schema/schema.json`.

## Technical Context

**Language/Version**: Directus 11.x (JavaScript/Node.js runtime), PostgreSQL 17
**Primary Dependencies**: Directus Admin SDK, Directus REST API
**Storage**: PostgreSQL 17 (via Docker from Feature 001), local file uploads to `/directus/uploads` volume
**Testing**: Manual API testing via curl/httpie, Directus Admin UI validation
**Target Platform**: Docker container (wvwo-directus-dev), accessible at localhost:8055
**Project Type**: Configuration/Schema setup (no custom code)
**Performance Goals**: API responses < 500ms for product list (50-200 items)
**Constraints**: 5MB max image upload, mobile-responsive admin required, public read-only API
**Size/Scope**: 8 collections, ~50-200 products, 5-10 categories, singleton store_info

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| **I. Owner-First Simplicity** | PASS | Kim manages content via Directus forms on phone; no terminal/code required |
| **II. Heart of West Virginia** | PASS | Schema supports WV-themed content (products, store story, local services) |
| **III. Modular Service Architecture** | PASS | Directus operates independently via REST API; replaceable |
| **IV. Developer-Managed Infrastructure** | PASS | Matt configures schema/permissions; Kim only uses admin UI |
| **V. Dual-Experience Design** | PASS | Directus admin is mobile-responsive; API serves both web experiences |
| **VI. Anti-MVP Bias** | PASS | Schema is complete (8 collections), no placeholder fields, real seed data exists |

**Gate Result**: ALL PASS - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/002-directus-cms-setup/
├── plan.md              # This file
├── research.md          # Phase 0: Schema application approach
├── data-model.md        # Phase 1: Entity documentation
├── quickstart.md        # Phase 1: Setup validation guide
├── contracts/           # Phase 1: API endpoint documentation
│   └── directus-api.md  # Public API contract
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
# Configuration-focused structure (no custom application code)
directus-schema/
├── schema.json          # Collection definitions (EXISTS)
└── seed-data.json       # Initial content (EXISTS)

scripts/
├── directus-setup.sh    # Schema application script (TO CREATE)
└── directus-setup.ps1   # Windows equivalent (TO CREATE)
```

**Structure Decision**: This feature is configuration-only. No `src/` directory needed. Schema already exists in `directus-schema/`. Scripts directory extends existing dev scripts from Feature 001.

## Complexity Tracking

> No violations detected. Schema complexity justified by spec requirements (8 distinct content types).

| Aspect | Complexity | Justification |
|--------|------------|---------------|
| 8 Collections | Appropriate | Each serves distinct content purpose per spec |
| Hierarchical categories | Appropriate | Product taxonomy requires parent-child relationships |
| Singleton store_info | Appropriate | Business info is naturally single-record |
