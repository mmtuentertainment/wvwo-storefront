# Tasks: Directus CMS Setup

**Input**: Design documents from `/specs/002-directus-cms-setup/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/directus-api.md

**Tests**: Not explicitly requested. Manual API validation via curl/quickstart.md.

**Organization**: Tasks organized by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different collections, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US6)
- All configuration done via Directus Admin UI at http://localhost:8055/admin

## Path Conventions

- **Configuration**: Directus Admin UI (Settings > Data Model)
- **Scripts**: `scripts/directus-setup.sh`, `scripts/directus-setup.ps1`
- **Schema reference**: `directus-schema/schema.json`
- **Seed data**: `directus-schema/seed-data.json`

---

## Phase 1: Setup (Prerequisites Verification)

**Purpose**: Verify Docker stack is running and Directus is accessible

- [x] T001 Verify Docker services are running via `docker compose ps`
- [x] T002 Verify Directus is accessible at http://localhost:8055/admin
- [x] T003 Verify admin login works with credentials from `.env`
- [x] T004 [P] Verify PostgreSQL connectivity via `docker exec wvwo-directus-dev wget -q -O - http://127.0.0.1:8055/server/health`

---

## Phase 2: Foundational - Matt Configures Collections (US6 P1-Setup)

**Purpose**: Create all 8 collections and configure schema - BLOCKS all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Schema Creation (per directus-schema/schema.json)

> **Note**: Collections created via `scripts/directus-schema-setup.sh` automation script

- [x] T005 [US6] Create `categories` collection with fields: id, name, slug, description, sort_order in Directus Admin
- [x] T006 [US6] Add `parent` M2O self-reference field to `categories` collection
- [x] T007 [P] [US6] Create `brands` collection with fields: id, name, slug, logo, description in Directus Admin
- [x] T008 [P] [US6] Create `store_info` singleton collection with all 17 fields per schema.json in Directus Admin
- [x] T009 [P] [US6] Create `homepage_features` collection with fields: id, title, subtitle, image, cta_label, cta_link, active, sort_order in Directus Admin
- [x] T010 [P] [US6] Create `announcements` collection with fields: id, status, message, type, link, start_date, end_date, sort_order in Directus Admin
- [x] T011 [P] [US6] Create `services` collection with fields: id, status, name, slug, short_description, description, image, price_info, sort_order in Directus Admin
- [x] T012 [P] [US6] Create `pages` collection with fields: id, status, title, slug, content, meta_title, meta_description in Directus Admin
- [x] T013 [US6] Create `products` collection with all 20 fields per schema.json in Directus Admin
- [x] T014 [US6] Configure `products.category` M2O relationship to `categories` collection
- [x] T015 [US6] Configure `products.brand` M2O relationship to `brands` collection
- [x] T016 [US6] Verify all 8 collections appear in Directus Admin sidebar

### Public Role Permissions (per data-model.md permissions matrix)

> **Note**: Permissions configured via Directus API using policy-based approach (Directus 11.x)

- [x] T017 [US6] Navigate to Settings > Roles & Permissions > Public role
- [x] T018 [P] [US6] Configure Public READ permission for `categories` collection (all fields, no filter)
- [x] T019 [P] [US6] Configure Public READ permission for `brands` collection (all fields, no filter)
- [x] T020 [P] [US6] Configure Public READ permission for `store_info` singleton (all fields, no filter)
- [x] T021 [P] [US6] Configure Public READ permission for `homepage_features` collection (all fields, filter: active=true)
- [x] T022 [P] [US6] Configure Public READ permission for `announcements` collection (all fields, filter: status=published)
- [x] T023 [P] [US6] Configure Public READ permission for `services` collection (all fields, filter: status=published)
- [x] T024 [P] [US6] Configure Public READ permission for `pages` collection (all fields, filter: status=published)
- [x] T025 [US6] Configure Public READ permission for `products` collection (all fields, filter: status=published)
- [x] T026 [US6] Configure Public READ permission for `directus_files` (id, filename_download, type, filesize only)
- [x] T027 [US6] Verify Public role has NO create/update/delete permissions on any collection

**Checkpoint**: All 8 collections exist with correct permissions. User story implementation can begin.

---

## Phase 3: User Story 1 - Kim Manages Products from Phone (Priority: P1) 🎯 Core

**Goal**: Kim can add, edit, and organize products via Directus Admin on her phone

**Independent Test**: Log into Directus on mobile browser, create product with name/price/category/image, publish, verify via API

### Implementation for User Story 1

> **Note**: Seed data loaded via `scripts/directus-seed-data.sh` automation script

- [x] T028 [US6] Load seed data for `categories` collection from directus-schema/seed-data.json via Directus Admin
- [x] T029 [US6] Load seed data for `brands` collection from directus-schema/seed-data.json via Directus Admin
- [x] T030 [US1] Create test product with all required fields (name, price, category) to verify workflow
- [ ] T031 [US1] Test product image upload from desktop browser (verify 5MB limit works)
- [x] T032 [US1] Test product status toggle (draft → published → draft) - verified via API
- [ ] T033 [US1] Test product search functionality in Directus Admin
- [ ] T034 [US1] Test mobile responsiveness of product edit form at 375px width (iPhone SE simulation)
- [x] T035 [US1] Verify product appears in API response when status=published via `curl http://localhost:8055/items/products?filter[status][_eq]=published`

**Checkpoint**: Kim can manage products from phone. US1 is independently testable.

---

## Phase 4: User Story 2 - Astro Frontend Fetches Product Data (Priority: P1)

**Goal**: Public API returns all published content without authentication

**Independent Test**: Unauthenticated curl requests return expected data for all public endpoints

### Implementation for User Story 2

> **Note**: For store_info singleton, use `?limit=1` or `/items/store_info/1` for public access

- [x] T036 [US2] Test public API: `curl http://localhost:8055/items/categories` returns categories
- [x] T037 [US2] Test public API: `curl http://localhost:8055/items/brands` returns brands
- [x] T038 [US2] Test public API: `curl "http://localhost:8055/items/products?filter[status][_eq]=published"` returns published products only
- [x] T039 [US2] Test public API: `curl http://localhost:8055/items/store_info` returns singleton object
- [x] T040 [US2] Verify draft products are NOT returned: Create draft product, confirm excluded from public API
- [x] T041 [US2] Test unauthorized write rejected: `curl -X POST http://localhost:8055/items/products -H "Content-Type: application/json" -d '{"name":"Test"}'` returns 403
- [ ] T042 [US2] Test file asset access: `curl http://localhost:8055/assets/{file_id}` returns image (requires uploaded files - tested with US1)
- [x] T043 [US2] Verify CORS headers present in API responses for localhost:3000

**Checkpoint**: All public API endpoints work correctly. US2 is independently testable.

---

## Phase 5: User Story 3 - Kim Updates Store Information (Priority: P2)

**Goal**: Kim can update store hours, contact info, and about story via singleton record

**Independent Test**: Edit store_info fields, save, verify changes via API response

### Implementation for User Story 3

- [x] T044 [US3] Load seed data for `store_info` singleton from directus-schema/seed-data.json
- [ ] T045 [US3] Test editing store hours fields (hours_weekday, hours_weekend, holiday_hours)
- [ ] T046 [US3] Test editing contact info (phone, email, google_maps_link)
- [ ] T047 [US3] Test editing flood_story field with rich text formatting (bold, paragraphs)
- [x] T048 [US3] Verify store_info changes appear in API response immediately
- [ ] T049 [US3] Test mobile responsiveness of store_info edit form

**Checkpoint**: Kim can update store info. US3 is independently testable.

---

## Phase 6: User Story 4 - Kim Manages Announcements Ticker (Priority: P2)

**Goal**: Kim can create time-sensitive ticker messages that appear on homepage

**Independent Test**: Create announcement with start/end dates, verify date filtering in API

### Implementation for User Story 4

- [x] T050 [US4] Load seed data for `announcements` collection from directus-schema/seed-data.json
- [ ] T051 [US4] Create test announcement with type="info", status="published"
- [ ] T052 [US4] Test announcement with start_date in future - verify excluded from public API
- [ ] T053 [US4] Test announcement with end_date in past - verify excluded from public API
- [ ] T054 [US4] Test announcement reordering via sort_order field
- [ ] T055 [US4] Verify announcement type options work (info, alert, promo)
- [ ] T056 [US4] Test mobile responsiveness of announcements list and edit form

**Checkpoint**: Kim can manage announcements. US4 is independently testable.

---

## Phase 7: User Story 5 - Kim Manages Service Pages (Priority: P3)

**Goal**: Kim can update service offerings (FFL, licenses, etc.)

**Independent Test**: Edit service description and price_info, verify via API

### Implementation for User Story 5

- [x] T057 [US5] Load seed data for `services` collection from directus-schema/seed-data.json
- [ ] T058 [US5] Create test service with all fields (name, slug, description, price_info)
- [ ] T059 [US5] Test service status toggle (draft → published)
- [ ] T060 [US5] Test service reordering via sort_order field
- [ ] T061 [US5] Verify service appears in public API when published
- [ ] T062 [US5] Test mobile responsiveness of services edit form

**Checkpoint**: Kim can manage services. US5 is independently testable.

---

## Phase 8: Automation Scripts & Validation

**Purpose**: Create reproducible setup scripts and validate complete configuration

### Automation Scripts

> **Note**: Scripts updated for Directus 11.x policy-based permissions

- [x] T063 [P] Create `scripts/directus-schema-setup.sh` for automated schema creation
- [x] T064 [P] Create `scripts/directus-schema-setup.ps1` for Windows schema creation
- [x] T063b [P] Create `scripts/directus-seed-data.sh` for seed data loading
- [x] T065 Export Directus schema snapshot to `directus-schema/snapshot.yaml` via `docker exec wvwo-directus-dev npx directus schema snapshot --yes /directus/snapshot.yaml`
- [x] T066 Copy snapshot to host: `docker cp wvwo-directus-dev:/directus/snapshot.yaml ./directus-schema/snapshot.yaml`
- [x] T067 Seed data script uses Directus API for data insertion (directus-seed-data.sh)
- [x] T068 Singleton update uses Node.js PATCH (busybox wget limitation workaround)

### Final Validation

- [x] T069 Run quickstart.md validation checklist (all 10 items)
- [x] T070 Verify all 8 collections have correct field counts per schema.json
- [x] T071 Verify public API returns correct data for all contracts in contracts/directus-api.md
- [ ] T072 Test Directus container restart - verify data persists
- [x] T073 Document any deviations from spec in plan.md (noted: Directus 11.x policy-based permissions)

---

## Phase 9: Polish & Documentation

**Purpose**: Finalize documentation and configuration

- [ ] T074 [P] Update spec.md status from "Draft" to "Complete"
- [x] T075 [P] Add implementation notes to quickstart.md if any workarounds were needed
- [ ] T076 Verify CLAUDE.md has correct technology entries for this feature
- [ ] T077 Create PR for 002-directus-cms-setup branch

### Browser Tests (Require Manual Verification)

The following tasks require manual browser testing in Directus Admin UI:
- T031 [US1] Test product image upload (5MB limit)
- T033 [US1] Test product search functionality
- T034 [US1] Test mobile responsiveness (375px width)
- T042 [US2] Test file asset access (requires uploaded files)
- T045-T047 [US3] Test store_info editing workflows
- T049 [US3] Test mobile responsiveness of store_info form
- T051-T056 [US4] Test announcement CRUD and date filtering
- T058-T062 [US5] Test services CRUD workflows

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - verify prerequisites
- **Phase 2 (Foundational)**: Depends on Phase 1 - BLOCKS all user stories
- **Phase 3-7 (User Stories)**: All depend on Phase 2 completion
  - US1 (Products) depends on categories/brands being created
  - US2 (API) depends on permissions being configured
  - US3-5 can proceed in parallel after Phase 2
- **Phase 8 (Automation)**: Depends on all user stories complete
- **Phase 9 (Polish)**: Depends on Phase 8 complete

### User Story Dependencies

- **US6 (P1-Setup)**: Phase 2 - Must complete before all others
- **US1 (P1)**: Depends on US6 (collections exist) and categories/brands seed data
- **US2 (P1)**: Depends on US6 (permissions configured) and US1 (products exist to test)
- **US3 (P2)**: Depends on US6 only - can run parallel with US1
- **US4 (P2)**: Depends on US6 only - can run parallel with US1
- **US5 (P3)**: Depends on US6 only - can run parallel with US1

### Parallel Opportunities

Within Phase 2:
- T007, T008, T009, T010, T011, T012 can run in parallel (independent collections)
- T018-T024 can run in parallel (independent permission configurations)

Across User Stories (after Phase 2):
- US3, US4, US5 can all proceed in parallel
- US1 and US2 have a soft dependency (US2 tests US1's products)

---

## Parallel Example: Phase 2 Collection Creation

```bash
# These collection creations can happen simultaneously:
Task: T007 - Create brands collection
Task: T008 - Create store_info singleton
Task: T009 - Create homepage_features collection
Task: T010 - Create announcements collection
Task: T011 - Create services collection
Task: T012 - Create pages collection

# After above complete, create products (depends on categories/brands):
Task: T013 - Create products collection
Task: T014 - Configure products.category relationship
Task: T015 - Configure products.brand relationship
```

---

## Implementation Strategy

### Core Functionality First (MVP)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: All collections + permissions (US6)
3. Complete Phase 3: Product management (US1)
4. Complete Phase 4: API validation (US2)
5. **STOP and VALIDATE**: Core CMS is functional

### Incremental Delivery

1. Phase 2 → Schema ready
2. + Phase 3 (US1) → Kim can manage products
3. + Phase 4 (US2) → Astro can fetch data
4. + Phase 5-7 → Additional content types
5. + Phase 8-9 → Automation and polish

---

## Notes

- All configuration done via Directus Admin UI (no custom code)
- [P] tasks = different collections, can be done in parallel browser tabs
- Seed data loaded via Admin UI or scripts
- Schema snapshot enables reproducible setup
- Verify on mobile browser for Kim's workflow
- Commit schema snapshot after Phase 2 complete
