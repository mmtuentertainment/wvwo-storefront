# Research: Directus CMS Setup

**Feature**: 002-directus-cms-setup | **Date**: 2025-12-05

## Research Topics

### 1. Schema Application Approach for Directus 11.x

**Decision**: Use Directus Admin UI for initial schema creation, then export snapshot for reproducibility.

**Rationale**:
- Directus 11.x supports schema snapshots via `npx directus schema snapshot`
- Admin UI provides immediate visual feedback and validation
- JSON schema file (`directus-schema/schema.json`) serves as reference, not direct import
- Snapshot approach allows version-controlled schema changes

**Alternatives Considered**:
| Approach | Pros | Cons | Rejected Because |
|----------|------|------|------------------|
| Direct API calls | Scriptable | Complex, error-prone for relations | Too brittle for 8 collections |
| Schema migration files | Version controlled | Directus doesn't use traditional migrations | Not native to Directus |
| Admin UI only | Simple | Not reproducible | Need automation for clean installs |
| **Snapshot + Apply** | Reproducible, simple | Requires running Directus | Best balance of simplicity and automation |

**Implementation**:
1. Create collections via Admin UI using `schema.json` as reference
2. Export snapshot: `docker exec wvwo-directus-dev npx directus schema snapshot --yes ./snapshot.yaml`
3. Store snapshot in `directus-schema/snapshot.yaml`
4. Apply on fresh install: `docker exec wvwo-directus-dev npx directus schema apply ./snapshot.yaml`

---

### 2. Public Role Permissions Configuration

**Decision**: Configure public role with read-only access to published content via Admin UI Settings > Roles & Permissions.

**Rationale**:
- Directus has built-in "Public" role for unauthenticated access
- Permissions are granular per collection and per action (CRUD)
- Status-based filtering (published only) via item permissions rules
- No custom code required

**Configuration Steps**:
1. Navigate to Settings > Roles & Permissions > Public
2. For each public collection (products, categories, brands, store_info, announcements, services, pages, homepage_features):
   - Enable READ permission
   - Add filter: `status = 'published'` (where applicable)
   - Disable CREATE, UPDATE, DELETE
3. For directus_files: Enable READ for public file access

**API Access Pattern**:
```
GET /items/products?filter[status][_eq]=published
GET /items/categories
GET /items/store_info  (singleton)
GET /items/announcements?filter[status][_eq]=published&filter[start_date][_lte]=$NOW&filter[end_date][_gte]=$NOW
```

---

### 3. Singleton Collection Configuration

**Decision**: Use Directus singleton feature for `store_info` collection.

**Rationale**:
- Directus 11.x supports `singleton: true` in collection meta
- Singleton displays as direct edit form (no list view)
- Prevents accidental creation of duplicate store records
- API returns object directly, not array

**Implementation**:
- Already defined in `schema.json`: `"singleton": true` in store_info meta
- Verify in Admin UI: Settings > Data Model > store_info > Singleton toggle

**API Behavior**:
```
# Regular collection returns array:
GET /items/products → [{ id: 1, ... }, { id: 2, ... }]

# Singleton returns object:
GET /items/store_info → { id: 1, store_name: "WV Wild Outdoors", ... }
```

---

### 4. File Upload Configuration (5MB Limit)

**Decision**: Configure file upload limits via Directus environment variables.

**Rationale**:
- Directus respects `FILE_MAX_SIZE` environment variable
- 5MB aligns with mobile upload constraints and storage efficiency
- Directus handles image transformation for thumbnails

**Implementation**:
Add to `docker-compose.yml` Directus environment:
```yaml
FILE_MAX_SIZE: "5mb"
```

**Current docker-compose.yml Check**:
- Not currently set - defaults to Directus internal limit
- Will add during implementation

**Error Handling**:
- Directus returns 400 Bad Request with clear message when limit exceeded
- Admin UI shows user-friendly error before upload completes

---

### 5. Seed Data Loading Approach

**Decision**: Use Directus API for seed data insertion after schema is applied.

**Rationale**:
- `directus-schema/seed-data.json` contains initial categories, brands, store_info
- API insertion ensures validation rules are applied
- Can be scripted for reproducibility

**Implementation**:
1. Wait for Directus healthy status
2. Authenticate as admin
3. POST seed data to each collection endpoint
4. Verify via API responses

**Script Location**: `scripts/directus-seed.sh` / `scripts/directus-seed.ps1`

---

## Summary: No Unknowns Remaining

All technical decisions resolved:

| Topic | Decision | Confidence |
|-------|----------|------------|
| Schema application | Snapshot approach | High |
| Public permissions | Admin UI + status filter | High |
| Singleton setup | Native Directus feature | High |
| File upload limit | Environment variable | High |
| Seed data | API insertion | High |

**Phase 0 Complete** - Ready for Phase 1 design artifacts.
