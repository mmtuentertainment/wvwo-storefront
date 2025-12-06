# Feature Specification: Directus CMS Setup

**Feature Branch**: `002-directus-cms-setup`
**Created**: 2025-12-05
**Status**: Draft
**Input**: User description: "Directus CMS container with Products, Categories, FAQs, StoreInfo collections and API permissions for WV Wild Outdoors"

## Clarifications

### Session 2025-12-05

- Q: What is the maximum allowed image upload size? (SC-008 said 5MB, edge case mentioned 10MB) → A: 5MB maximum (optimized for mobile uploads, lower storage)

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Kim Manages Products from Phone (Priority: P1)

Kim needs to add, edit, and organize products in the store catalog from her phone while working the counter. This is her primary daily interaction with the CMS.

**Why this priority**: Product management is the core CMS function. Kim adds new inventory weekly and updates prices/availability daily. Without this, the website can't show current stock.

**Independent Test**: Kim can log into Directus on her phone, create a new product with name/price/category/description/image, publish it, and see it appear in the API response.

**Acceptance Scenarios**:

1. **Given** Kim is logged into Directus on her phone, **When** she taps "Add Product" and fills in name, price, category, and description, **Then** the product is saved as draft and she can publish it with one tap.
2. **Given** a product exists in the system, **When** Kim searches for it by name, **Then** she finds it within 3 taps and can edit any field.
3. **Given** Kim uploads a product photo from her phone camera, **When** she saves the product, **Then** the image is stored and associated with the product.
4. **Given** a product is out of stock, **When** Kim marks it as discontinued or updates inventory to 0, **Then** the product status reflects this change.

---

### User Story 2 - Astro Frontend Fetches Product Data (Priority: P1)

The Astro storefront needs to retrieve product, category, and store information through Directus API without authentication for public pages.

**Why this priority**: Without public API access, the website cannot display any content. This is the bridge between CMS content and customer-facing pages.

**Independent Test**: An unauthenticated HTTP request to the Directus API returns published products with all public fields (name, price, description, images, categories).

**Acceptance Scenarios**:

1. **Given** published products exist in Directus, **When** an unauthenticated request is made to `/items/products?filter[status][_eq]=published`, **Then** the API returns all published products with their public fields.
2. **Given** categories exist with products assigned, **When** the frontend requests categories with related products, **Then** the API returns the hierarchical category structure with product counts.
3. **Given** store_info singleton is configured, **When** the frontend requests `/items/store_info`, **Then** the API returns store name, address, hours, phone, and social links.
4. **Given** a product has draft status, **When** an unauthenticated API request is made, **Then** draft products are NOT included in the response.

---

### User Story 3 - Kim Updates Store Information (Priority: P2)

Kim needs to update store hours, contact info, and the "about" story when things change (holiday hours, phone number updates, etc.).

**Why this priority**: Store info changes less frequently than products but must be accurate. Wrong hours damage customer trust. This is a singleton record Kim edits occasionally.

**Independent Test**: Kim can navigate to store_info in Directus, update the weekday hours field, save, and verify the change via API response.

**Acceptance Scenarios**:

1. **Given** Kim opens the Store Info section, **When** she updates holiday hours, **Then** the changes save immediately and appear in API responses.
2. **Given** Kim needs to update the store phone number, **When** she edits the phone field and saves, **Then** the new number is reflected on the website contact page.
3. **Given** Kim wants to update the "About" story, **When** she edits the flood_story field using the rich text editor, **Then** formatted text (bold, paragraphs, line breaks) is preserved.

---

### User Story 4 - Kim Manages Announcements Ticker (Priority: P2)

Kim posts quick updates about stock arrivals, seasonal promotions, and timely messages that appear in the homepage ticker ("Bait & Bullet" style).

**Why this priority**: Announcements drive engagement with time-sensitive content like "Live bait in stock!" or "Buck season opens Monday". This is a frequent task during hunting/fishing seasons.

**Independent Test**: Kim creates a new announcement, sets it to "published", and it appears in the API response for active announcements.

**Acceptance Scenarios**:

1. **Given** Kim wants to announce "Live bait just arrived!", **When** she creates an announcement with type "info" and publishes it, **Then** it appears in the announcements API endpoint.
2. **Given** an announcement has start_date and end_date set, **When** the current date is outside that range, **Then** the announcement is excluded from public API responses.
3. **Given** multiple announcements exist, **When** Kim reorders them via sort_order, **Then** the API returns announcements in the specified order.

---

### User Story 5 - Kim Manages Service Pages (Priority: P3)

Kim occasionally updates information about store services (FFL transfers, license sales, scope mounting) when prices or processes change.

**Why this priority**: Service info changes infrequently but must be accurate for compliance (FFL) and customer expectations. Lower priority than products and announcements.

**Independent Test**: Kim edits the FFL Transfers service description, saves, and the updated text appears in API responses.

**Acceptance Scenarios**:

1. **Given** Kim needs to update the FFL transfer fee, **When** she edits the price_info field from "$25" to "$30", **Then** the change is saved and reflected in API responses.
2. **Given** Kim adds a new service offering, **When** she creates a new service record with all required fields, **Then** it appears in the services list after publishing.

---

### User Story 6 - Matt Configures Collections and Permissions (Priority: P1-Setup)

Matt needs to create the Directus schema with all collections, fields, and relationships, then configure API permissions so public data is accessible without authentication while sensitive data requires admin login.

**Why this priority**: This is the foundational setup work that enables all other user stories. Must be completed first before Kim can manage any content.

**Independent Test**: After Matt runs the schema setup, all 8 collections exist with correct fields, and public role has read access to published content only.

**Acceptance Scenarios**:

1. **Given** a fresh Directus installation, **When** Matt applies the schema configuration, **Then** all 8 collections are created with correct field types and relationships.
2. **Given** schema is configured, **When** Matt sets public role permissions, **Then** unauthenticated users can read published products, categories, store_info, announcements, services, and pages.
3. **Given** public permissions are set, **When** an unauthenticated request tries to create/update/delete content, **Then** the request is rejected with 403 Forbidden.
4. **Given** Kim logs in as admin, **When** she accesses any collection, **Then** she has full CRUD permissions on all records.

---

### Edge Cases

- What happens when Kim uploads an image larger than 5MB? System should show a clear error message indicating the 5MB limit.
- How does system handle duplicate slugs? Validation should prevent duplicate slugs within a collection.
- What happens if Kim accidentally deletes a published product? Soft delete or confirmation dialog should prevent data loss.
- How does system behave when Directus container restarts? Data persists in PostgreSQL volume; session may require re-login.
- What happens when a category is deleted that has products assigned? Products should retain category reference or fall back to "uncategorized".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide 8 content collections: categories, brands, products, store_info, homepage_features, announcements, services, pages
- **FR-002**: System MUST support hierarchical categories (parent-child relationships)
- **FR-003**: System MUST enforce required fields: product name, product price, product category, category name, category slug
- **FR-004**: System MUST support draft/published status for products, announcements, services, and pages
- **FR-005**: System MUST store and serve images for products, brands, homepage features, and services
- **FR-006**: System MUST provide public (unauthenticated) read access to published content via REST API
- **FR-007**: System MUST require authentication for all create, update, and delete operations
- **FR-008**: System MUST support filtering API responses by status (published vs draft)
- **FR-009**: System MUST provide a mobile-responsive admin interface for content management
- **FR-010**: System MUST persist all data in PostgreSQL with volume backup capability
- **FR-011**: System MUST auto-generate slugs from names for URL-friendly identifiers
- **FR-012**: System MUST support date-based filtering for announcements (start_date, end_date)
- **FR-013**: System MUST treat store_info as a singleton (only one record allowed)
- **FR-014**: System MUST support sort_order field for manual ordering of categories, announcements, and services

### Key Entities

- **Categories**: Hierarchical product taxonomy (Firearms > Rifles, Ammunition > Handgun Ammo). Has parent reference for nesting.
- **Brands**: Product manufacturers/brands (Remington, Vortex, Danner). Referenced by products.
- **Products**: Sellable items with pricing, inventory, images, and category assignment. Core content type.
- **Store Info**: Singleton containing business details (address, hours, phone, social links, about story).
- **Homepage Features**: Promotional banners for hero section with images, CTAs, and display order.
- **Announcements**: Time-sensitive ticker messages with type classification (info, alert, promo).
- **Services**: Store offerings (FFL transfers, license sales) with descriptions and pricing.
- **Pages**: Static content pages (About, FAQ) with SEO metadata.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Kim can add a new product with all required fields in under 3 minutes from her phone
- **SC-002**: Public API returns product list in under 500ms for typical catalog size (50-200 products)
- **SC-003**: 100% of published content is accessible via unauthenticated API requests
- **SC-004**: 0% of draft content is exposed via unauthenticated API requests
- **SC-005**: All admin forms render correctly and are usable on screens 375px wide (iPhone SE)
- **SC-006**: Kim requires no technical support to complete routine content updates after 15-minute training
- **SC-007**: System correctly persists and retrieves all 8 collection types with their relationships
- **SC-008**: Image uploads complete successfully for files up to 5MB from mobile devices

## Assumptions

- Directus 11.x container is already running from Feature 001 (Docker Local Stack)
- PostgreSQL 17 database is available and healthy
- Kim will use Chrome or Safari on her phone for admin access
- Initial product catalog will be under 500 items
- Schema defined in `directus-schema/schema.json` represents the approved data model
- Seed data in `directus-schema/seed-data.json` will be loaded for initial content

## Out of Scope

- E-commerce/checkout functionality (this is a showroom, not a shopping cart)
- Customer accounts or user registration (public browsing only)
- Inventory management integration with POS systems
- Multi-language content support
- Advanced search/filtering UI in Directus (default search is sufficient)
- Custom Directus extensions or hooks
- Automated content workflows or approval chains

## Dependencies

- **Feature 001**: Docker Local Development Stack (Directus container, PostgreSQL, Redis)
- **Directus Schema**: `directus-schema/schema.json` defines all collection structures
- **Seed Data**: `directus-schema/seed-data.json` provides initial categories, brands, store info
