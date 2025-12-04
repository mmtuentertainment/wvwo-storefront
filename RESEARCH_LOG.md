# WVWO Digital Infrastructure - Research Log

## Session: December 4, 2025
## Objective: Map complete open-source self-hosted stack for digital storefront

---

## CONFIRMED STACK

| Layer | Tool | Database | RAM | Purpose |
|-------|------|----------|-----|---------|
| Storefront | Astro | N/A (static) | 0 runtime | Product pages, Stripe checkout |
| Blog/Content | Ghost | SQLite | 100-150 MB | SEO, hunting tips, newsletter |
| Admin + Products | Directus | PostgreSQL | 120-150 MB | Back-office, inventory, CMS |
| Email | Listmonk | PostgreSQL | 80-100 MB | Newsletter campaigns |
| Social | Mixpost Lite | PostgreSQL | 200-256 MB | Facebook scheduling |
| Reverse Proxy | Traefik | N/A | 50 MB | Routing, auto SSL |
| Database | PostgreSQL 16 | — | 100 MB | Shared by Directus, Listmonk, Mixpost |

**Total RAM: ~700-800 MB active (fits 2GB VPS)**

---

## ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                         TRAEFIK                             │
│              (Reverse Proxy + Auto SSL)                     │
└─────────────┬──────────────┬──────────────┬────────────────┘
              │              │              │
              ▼              ▼              ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   GHOST (Blog)  │ │ ASTRO (Static)  │ │   DIRECTUS      │
│   SQLite        │ │ Product Store   │ │   Admin UI      │
│                 │ │ + Stripe        │ │   + Flows       │
└─────────────────┘ └────────┬────────┘ └────────┬────────┘
                             │                    │
                             │ Build-time fetch   │
                             └────────────────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │   POSTGRESQL    │
                             │ (Directus,      │
                             │  Listmonk,      │
                             │  Mixpost)       │
                             └─────────────────┘
```

---

## DOMAIN STRUCTURE

| Subdomain | Service | Purpose |
|-----------|---------|---------|
| wvwildoutdoors.com | Astro (nginx) | Storefront (root) |
| blog.wvwildoutdoors.com | Ghost | Content/SEO |
| admin.wvwildoutdoors.com | Directus | Back office |
| email.wvwildoutdoors.com | Listmonk | Email admin |
| social.wvwildoutdoors.com | Mixpost | Facebook scheduling |

---

## STRIPE INTEGRATION (Two-Tier)

### Phase 1: MVP (No Code)
- Create Stripe Payment Links in Stripe dashboard
- Store URLs in Directus `stripe_link` field per product
- Astro renders `<a href="{payment_link}">Buy Now</a>`
- Kim updates prices in Stripe dashboard directly

### Phase 2: Future (When Needed)
- Astro `/api/create-checkout-session` endpoint
- Dynamic cart, variable quantities
- Only build if Phase 1 proves online sales demand

---

## AUTO-REBUILD STRATEGY

| Method | Trigger | Reliability |
|--------|---------|-------------|
| Primary | Directus Flow → webhook → build script | Real-time |
| Fallback | Nightly cron job | Guaranteed |

**Recommendation:** Start with cron only. Add webhook later if real-time matters.

---

## BACKUP STRATEGY

| Data | Method | Target |
|------|--------|--------|
| PostgreSQL | pg_dumpall → gzip | Backblaze B2 |
| Ghost (SQLite) | tar content dir | Backblaze B2 |
| Directus uploads | tar uploads dir | Backblaze B2 |
| Schedule | Daily cron | rclone sync |

---

## BUILD SEQUENCE (6 Phases)

### Phase 1: Infrastructure
- Use existing repo
- Add infra/, astro/, directus-schema/ directories
- Claude Code → docker-compose.yml + .env.example
- docker compose up (Postgres + Traefik)
- Verify: databases created, proxy responding

### Phase 2: Back-Office
- Start Directus, Listmonk, Mixpost
- Claude Code → Directus schema
- Apply schema via API/CLI
- Verify: all admin UIs reachable

### Phase 3: Content
- Start Ghost (SQLite)
- Manual: create admin, basic nav
- Verify: blog.localhost works

### Phase 4: Storefront
- Claude Code → scaffold Astro project
- Claude Code → Directus fetch + product pages
- Claude Code → Stripe Payment Link integration
- Build to static, point nginx at dist/
- Verify: store.localhost shows products

### Phase 5: Glue
- Directus Flows → rebuild webhook (or cron)
- Listmonk SMTP config (Mailgun free tier)
- Mixpost Facebook OAuth (manual)
- Backup scripts + cron

### Phase 6: Deploy
- Provision VPS (Docker + Compose + git)
- git clone + docker compose up -d
- DNS → VPS IP
- Traefik auto-provisions SSL
- Final manual config in each UI

---

## CLAUDE CODE TASK SPLIT

### Claude Code Generates:
- Docker Compose + .env template
- Directus schema (collections, fields, relationships)
- Astro storefront (full site)
- Traefik routing rules
- Deploy + backup scripts

### Manual Steps (Matthew):
- Secrets (.env population)
- DNS configuration
- First admin users (Directus, Ghost, Listmonk)
- Mixpost Facebook OAuth
- Stripe Payment Link creation in dashboard

---

## PLAYWRIGHT MCP USE CASES

| Task | Use Playwright? | Reason |
|------|-----------------|--------|
| Seed demo products in Directus | ✅ Yes | Repetitive data entry |
| Take screenshots for docs | ✅ Yes | Documentation |
| Mixpost Facebook OAuth | ❌ No | Fragile, account risk |
| Core setup | ❌ No | API/CLI is better |

---

## LOCAL DEV SETUP

```bash
# Add to /etc/hosts
127.0.0.1 wvwildoutdoors.local
127.0.0.1 blog.wvwildoutdoors.local
127.0.0.1 admin.wvwildoutdoors.local
127.0.0.1 email.wvwildoutdoors.local
127.0.0.1 social.wvwildoutdoors.local
```

- Use HTTP only locally (skip SSL)
- `stripe listen --forward-to localhost:PORT/webhook` for testing

---

## COST ESTIMATE

| Item | Monthly Cost |
|------|--------------|
| VPS (2GB, Hetzner/DigitalOcean) | $10-12 |
| Domain | ~$1 (amortized) |
| Backblaze B2 (10GB) | ~$0.05 |
| Mailgun (free tier) | $0 |
| **TOTAL** | **~$12/month** |

---

## TOOLS SELECTED (with alternatives rejected)

| Need | Selected | Rejected | Why |
|------|----------|----------|-----|
| CMS | Directus | Strapi, Payload | Best non-technical UI, Flows built-in |
| Blog | Ghost | WordPress | Lighter, native newsletter |
| Email | Listmonk | Mailchimp | Self-hosted, Go-based, lightweight |
| Social | Mixpost Lite | Postiz, Buffer | Simpler UI, lower RAM |
| Storefront | Astro | Next.js, plain HTML | Static output, official Directus support |
| Database | PostgreSQL | MySQL | Shared across services |
| Ghost DB | SQLite | MySQL | Saves ~200-300 MB RAM |

---

## FACEBOOK INTEGRATION CONFIRMED

- Mixpost Lite supports Facebook Pages (2025)
- Graph API v20.0 compatible
- Requires: Meta Developer App + OAuth
- Scopes: `pages_manage_posts`, `business_management`
- One-time manual setup, then schedule posts in Mixpost UI

---

## SOURCES

All research conducted via Perplexity Pro/Research on December 4, 2025.

Key references:
- Directus docs: directus.io/docs
- Ghost SQLite Docker: andyyang.co.uk/ghost-with-sqlite-in-docker
- Astro + Directus: docs.astro.build/en/guides/cms/directus
- Mixpost releases: mixpost.app/releases/lite
- Listmonk: listmonk.app

---

## DIRECTUS SCHEMA SPECIFICATION

### Collections Overview

| Collection | Purpose | Records |
|------------|---------|---------|
| categories | Product taxonomy (hierarchical) | ~15-20 |
| products | All sellable items | ~200 |
| brands | Manufacturer/brand names | ~20-30 |
| store_info | Store meta (hours, address, story) | 1 |
| homepage_features | Hero banners, promos | 3-5 |

### categories

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| name | string | yes | "Rifles", "Boots" |
| slug | string | yes | URL-safe, unique |
| parent | relation (self) | no | Allows hierarchy |
| description | text | no | Category page blurb |
| sort_order | integer | no | Manual nav ordering |

### products

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| status | status | yes | published/draft |
| name | string | yes | Product name |
| slug | string | yes | URL-safe, unique |
| sku | string | no | Internal code |
| category | relation | yes | → categories |
| brand | relation | no | → brands |
| short_description | text | no | 1-2 sentences for cards |
| description | rich text | no | Full detail page |
| price | decimal | yes | Two decimals |
| on_sale | boolean | no | Default false |
| sale_price | decimal | no | If on_sale = true |
| stripe_payment_link | string | no | Stripe URL for checkout |
| image_main | file | no | Main photo |
| image_gallery | files | no | Extra angles |
| is_featured | boolean | no | Homepage section |
| just_arrived | boolean | no | "New" badge |
| inventory_quantity | integer | no | Default 0 |
| low_stock_threshold | integer | no | Default 5 |
| location_in_store | string | no | "Gun wall, rack 3" |
| discontinued | boolean | no | Hide from store |

### brands

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| name | string | yes | "Remington", "Muck" |
| slug | string | yes | URL-safe, unique |
| logo | file | no | Brand logo |
| description | text | no | Optional |

### store_info (singleton)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Only 1 record |
| store_name | string | yes | "WV Wild Outdoors" |
| address_line1 | string | yes | Street address |
| address_line2 | string | no | Suite, etc. |
| city | string | yes | "Birch River" |
| state | string | yes | "WV" |
| postal_code | string | yes | "26610" |
| phone | string | yes | "(304) 649-2607" |
| email | string | no | Public contact |
| google_maps_link | string | no | Maps URL |
| hours_weekday | string | yes | "Mon-Sat: 10am-5pm" |
| hours_weekend | string | no | If different |
| holiday_hours | text | no | Special notices |
| about_short | text | no | Homepage tagline |
| flood_story | rich text | no | 2016 narrative |
| facebook_url | string | no | Social link |
| instagram_url | string | no | Social link |

### homepage_features

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | integer | auto | Primary key |
| title | string | yes | "Deer Season Ammo In Stock" |
| subtitle | string | no | Supporting text |
| image | file | no | Banner image |
| cta_label | string | no | "Shop Ammo" |
| cta_link | string | no | URL to category/product |
| active | boolean | no | Default true |
| sort_order | integer | no | Display order |

---

## OWNER WEEKLY WORKFLOW

### Daily / Monday Routine
**Goal:** Sync website with physical inventory

**Tool: Directus**
1. Open `products` collection
2. Use saved view filtered by `inventory_quantity <= low_stock_threshold`
3. Update quantities for items sold in-store
4. Toggle `is_featured` / `just_arrived` as needed

**Tool: Astro storefront**
- Spot-check homepage and categories to verify accuracy

### When New Shipment Arrives
**Goal:** Add products quickly with minimal friction

**Tool: Directus**
1. Confirm `brand` and `category` exist (create if needed)
2. Add new `product`:
   - name, price, category, brand
   - inventory_quantity from packing slip
   - location_in_store
   - just_arrived = true
3. Upload phone photo to `image_main`
4. Paste Stripe Payment Link URL

**Tool: Stripe Dashboard**
- Create Payment Link for product (one-time per product)

### Weekly: Schedule Facebook Posts
**Goal:** Keep page active with 2-3 posts/week

**Tool: Mixpost**
1. Open calendar view
2. Create posts:
   - Product announcements with photos
   - Stock alerts ("Ammo in stock: .270, .30-06")
   - Links to Astro product/category pages
3. Schedule for evenings/weekend mornings

### Monthly: Email Newsletter
**Goal:** One "catch-up" email to subscriber list

**Tool: Listmonk**
1. Create new campaign
2. Subject: "December at WV Wild Outdoors"
3. Body: 3-5 featured products, store updates
4. Send to main list or segment

**Tool: Ghost**
- Publish supporting blog post ("Winter Boots Guide")
- Link from newsletter

---

## ASTRO PAGE STRUCTURE

### Page Map

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Hero, featured products, categories, hours |
| Category | `/category/:slug` | Product grid with filters |
| Product | `/product/:slug` | Full detail, buy button, related |
| About | `/about` | Flood story, mission |
| Contact | `/contact` | Hours, map, phone |
| Just Arrived | `/just-arrived` | New products (optional) |

### Homepage (`/`)

**Sections:**
1. Hero (from `homepage_features` or featured product)
2. Featured Products grid (`products` where `is_featured = true`)
3. Category tiles (top-level `categories`)
4. Store hours + contact (`store_info`)

**Directus queries:**
- `store_info` (singleton)
- `products` filtered by `is_featured`
- `categories` where `parent` is null

### Category Page (`/category/:slug`)

**Sections:**
1. Category header (name, description, breadcrumb)
2. Product grid with filters (brand, in-stock)
3. Low stock badges

**Directus queries:**
- `categories` by slug
- `products` filtered by category
- `brands` for filter dropdown

### Product Page (`/product/:slug`)

**Sections:**
1. Image gallery
2. Name, brand, price (sale badge if applicable)
3. Description (rich text)
4. Stock status + location
5. Buy button (Stripe link) + "Call to reserve"
6. Related products (same category/brand)

**Directus queries:**
- Single `product` by slug
- Related `products` (limit 4)
- `store_info` for phone number

### About Page (`/about`)

**Sections:**
1. Store history
2. Flood story (2016 narrative)
3. Mission/values

**Directus queries:**
- `store_info.flood_story`
- `store_info.about_short`

### Contact Page (`/contact`)

**Sections:**
1. Full address + embedded map
2. Phone + email
3. Business hours (weekday/weekend/holiday)
4. Optional contact form

**Directus queries:**
- `store_info` (all contact fields)

---

## NEXT STEPS

### Ready to Build
- [x] Stack architecture confirmed
- [x] Domain structure confirmed
- [x] Directus schema specified
- [x] Owner workflow mapped
- [x] Astro pages defined

### Build Order
1. Docker infrastructure (Postgres, Traefik)
2. Directus + apply schema
3. Ghost (SQLite)
4. Listmonk + Mixpost
5. Astro storefront
6. Stripe integration (Payment Links)
7. Deploy to VPS
8. DNS + SSL
9. Seed initial data
10. Train Kim on workflows
