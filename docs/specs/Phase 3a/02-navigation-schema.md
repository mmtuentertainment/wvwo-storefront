# Feature Specification: Navigation & Structure Schema

**Feature Branch**: `phase3a-navigation-schema`
**Created**: 2025-12-16
**Status**: Draft
**Input**: Phase 3A Geographic SEO Foundation - Site Structure Schema

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Breadcrumb Rich Results (Priority: P1)

When a hunter searches "Elk River WMA hunting", Google shows the result with breadcrumb trail: `wvwildoutdoors.com > Hunt Near Us > Elk River WMA` instead of just the URL.

**Why this priority**: Breadcrumbs increase click-through rate by 15-20%. All 8 /near/ pages are missing this.

**Independent Test**: Google Rich Results Test shows valid BreadcrumbList for any /near/ page.

**Acceptance Scenarios**:

1. **Given** Google Rich Results Test tool, **When** analyzing /near/elk-river, **Then** BreadcrumbList shows 3 items: Home, Hunt Near Us, Elk River WMA
2. **Given** a search result for "Sutton Lake fishing WV", **When** WVWO appears, **Then** breadcrumb trail is visible below the title (after Google indexes)
3. **Given** any /near/ detail page, **When** schema is validated, **Then** BreadcrumbList positions are sequential (1, 2, 3)

---

### User Story 2 - Hub Page as Collection (Priority: P2)

When someone searches "hunting spots near I-79 WV", Google understands /near/ is a collection page listing multiple destinations, not a single location.

**Why this priority**: CollectionPage signals that /near/ is a hub, improving its ranking for aggregate queries.

**Independent Test**: Schema validator shows CollectionPage type on /near/index.astro.

**Acceptance Scenarios**:

1. **Given** schema validation tool, **When** analyzing /near/, **Then** @type includes "CollectionPage"
2. **Given** /near/ hub page, **When** schema is extracted, **Then** it references the 7 child location pages

---

### User Story 3 - Service Area Coverage (Priority: P2)

When Google evaluates WVWO for "hunting store near Summersville", it knows WVWO explicitly serves that area even though the shop is 30 miles away.

**Why this priority**: ServiceArea schema expands the geographic reach beyond the physical address.

**Independent Test**: Schema validator shows areaServed with multiple Place references.

**Acceptance Scenarios**:

1. **Given** schema validation tool, **When** analyzing homepage, **Then** areaServed contains at least 5 geographic areas
2. **Given** areaServed in schema, **When** examining entries, **Then** each area has name and geo coordinates
3. **Given** a search for "gun shop near Sutton Lake WV", **When** results load, **Then** WVWO appears despite 15-mile distance (after indexing)

---

### Edge Cases

- What if a /near/ page has no Place schema? → Add Place schema inline (only hub is missing)
- What if breadcrumb URL is wrong? → Use absolute URLs with https://wvwildoutdoors.com base
- What if hub page already has ItemList? → CollectionPage can coexist; don't remove existing schema

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST add BreadcrumbList schema to /near/index.astro (2 levels: Home → Hunt Near Us)
- **FR-002**: System MUST add BreadcrumbList schema to all 7 /near/ detail pages (3 levels each)
- **FR-003**: BreadcrumbList items MUST use absolute URLs (https://wvwildoutdoors.com/...)
- **FR-004**: BreadcrumbList positions MUST be sequential integers starting at 1
- **FR-005**: System MUST add CollectionPage schema to /near/index.astro hub page
- **FR-006**: CollectionPage SHOULD reference child pages via hasPart or mainEntity
- **FR-007**: System MUST include areaServed in LocalBusiness schema
- **FR-008**: areaServed MUST include at least: Sutton Lake, Elk River WMA, Summersville Lake, Burnsville Lake, Stonewall Jackson Lake

### Key Entities

- **BreadcrumbList**: Navigation path schema for each /near/ page
- **ListItem**: Individual breadcrumb with position, name, and item URL
- **CollectionPage**: Hub page type indicating collection of related content
- **Place**: Geographic areas served (lakes, WMAs, national forest)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 8 /near/ pages pass Google Rich Results Test for BreadcrumbList
- **SC-002**: Breadcrumb positions are correct (1, 2, 3) with no gaps or duplicates
- **SC-003**: Hub page (/near/) validates as CollectionPage
- **SC-004**: areaServed contains minimum 5 Place entries with coordinates
- **SC-005**: No schema validation errors on any /near/ page
- **SC-006**: `npm run build` completes without errors after changes
- **SC-007**: SchemaBreadcrumb.astro component created and reusable across pages
