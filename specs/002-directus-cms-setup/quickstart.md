# Quickstart: Directus CMS Setup

**Feature**: 002-directus-cms-setup | **Date**: 2025-12-05
**Audience**: Developers (Matt) - Schema configuration and validation

## Prerequisites

Before starting, ensure:

- [x] Feature 001 (Docker Local Stack) is complete
- [x] Docker services are running: `docker compose ps` shows all healthy
- [x] Directus is accessible at http://localhost:8055
- [x] Admin credentials are set in `.env`

---

## Step 1: Access Directus Admin

1. Open http://localhost:8055/admin
2. Log in with credentials from `.env`:
   - Email: `DIRECTUS_ADMIN_EMAIL`
   - Password: `DIRECTUS_ADMIN_PASSWORD`
3. You should see the default Directus dashboard

---

## Step 2: Create Collections

Create each collection following the schema in `directus-schema/schema.json`.

### Order of Creation (respects relationships):

1. **categories** - Create first (self-referencing parent comes later)
2. **brands** - No dependencies
3. **products** - References categories and brands
4. **store_info** - Singleton, no dependencies
5. **homepage_features** - No dependencies
6. **announcements** - No dependencies
7. **services** - No dependencies
8. **pages** - No dependencies

### For Each Collection:

1. Navigate to **Settings** > **Data Model**
2. Click **Create Collection**
3. Enter collection name (lowercase, underscore for multi-word)
4. Add fields per `schema.json` specification
5. Configure field interfaces and validation
6. Save collection

### Collection-Specific Notes:

**categories**:
- Add `parent` field as M2O relationship to self after initial creation
- Enable sorting by `sort_order`

**store_info**:
- Check "Treat as Singleton" in collection settings
- Only one record will be allowed

**products**:
- `category` is required M2O to categories
- `brand` is optional M2O to brands
- `status` default should be "draft"

---

## Step 3: Configure Public Permissions

> **Note (Directus 11.x)**: Permissions are now attached to **policies**, not roles directly.
> The Public role has an associated policy that grants access to unauthenticated users.

1. Navigate to **Settings** > **Roles & Permissions**
2. Click on **Public** role (or use `scripts/directus-schema-setup.sh` for automation)
3. For each collection, configure READ permission:

| Collection | Read Access | Filter |
|------------|-------------|--------|
| categories | All fields | None |
| brands | All fields | None |
| products | All fields | `status = 'published'` |
| store_info | All fields | None |
| homepage_features | All fields | `active = true` |
| announcements | All fields | `status = 'published'` |
| services | All fields | `status = 'published'` |
| pages | All fields | `status = 'published'` |
| directus_files | id, filename_download, type, filesize | None |

4. Ensure CREATE, UPDATE, DELETE are **disabled** for Public role

---

## Step 4: Automation Scripts (Recommended)

Use the provided automation scripts for reproducible setup:

```bash
# Unix/macOS/Linux - Create schema and permissions
./scripts/directus-schema-setup.sh

# Load seed data
./scripts/directus-seed-data.sh
```

```powershell
# Windows PowerShell - Create schema and permissions
./scripts/directus-schema-setup.ps1

# Load seed data (use bash via Git Bash or WSL)
bash ./scripts/directus-seed-data.sh
```

### Manual Alternative

For manual setup via Admin UI, use `directus-schema/seed-data.json` as reference.

---

## Step 5: Verify Setup

### Test Public API Access

```bash
# Health check
curl http://localhost:8055/server/health
# Expected: {"status":"ok"}

# List categories (public)
curl http://localhost:8055/items/categories
# Expected: {"data":[...]}

# List published products (public)
curl "http://localhost:8055/items/products?filter[status][_eq]=published"
# Expected: {"data":[...]}

# Get store info (singleton)
# Note: Use ?limit=1 or /items/store_info/1 for reliable public access
curl "http://localhost:8055/items/store_info?limit=1"
# Expected: {"data":{...}}

# Test unauthorized write (should fail)
curl -X POST http://localhost:8055/items/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
# Expected: 403 Forbidden
```

### Verify Admin Access

1. Log into Directus Admin
2. Navigate to each collection
3. Verify you can create, edit, and delete records
4. Test image upload (should accept files up to 5MB)

---

## Step 6: Export Schema Snapshot

After setup is complete, export for reproducibility:

```bash
# Export snapshot
docker exec wvwo-directus-dev npx directus schema snapshot --yes /directus/snapshot.yaml

# Copy to host
docker cp wvwo-directus-dev:/directus/snapshot.yaml ./directus-schema/snapshot.yaml
```

This snapshot can be applied to fresh installations:

```bash
docker exec wvwo-directus-dev npx directus schema apply /directus/snapshot.yaml
```

---

## Validation Checklist

- [ ] All 8 collections created
- [ ] Relationships configured (categories→parent, products→category, products→brand)
- [ ] store_info is singleton (only one record allowed)
- [ ] Public role has read-only access to published content
- [ ] Public role cannot create/update/delete
- [ ] Admin can perform all CRUD operations
- [ ] Seed data loaded successfully
- [ ] API endpoints return expected data
- [ ] Image uploads work (up to 5MB)

---

## Troubleshooting

### "Collection not found" error
- Verify collection name matches exactly (case-sensitive)
- Check Directus logs: `docker compose logs directus`

### Public API returns empty array
- Verify records have `status: published`
- Check Public role permissions include READ
- Verify filter conditions in permissions

### Image upload fails
- Check file size (max 5MB)
- Verify `directus-uploads` volume is mounted
- Check Directus logs for storage errors

### Relationships not working
- Ensure related collection exists before creating relationship
- Verify M2O field type and related collection setting

---

## Next Steps

After completing this setup:

1. Run `/speckit.tasks` to generate implementation tasks
2. Execute tasks via `/speckit.implement`
3. Proceed to Feature 003 (Ghost Blog Setup) or Feature 004 (Astro Scaffold)
