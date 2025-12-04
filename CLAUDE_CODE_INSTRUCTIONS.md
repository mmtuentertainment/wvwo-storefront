# WVWO Repository Update - Claude Code Instructions

## Summary

Update the wvwo-storefront repo with:
1. Add 3 missing collections to schema.json
2. Add seed data for new collections  
3. Create Docker infrastructure files
4. Create docs/BLUEPRINT.md

---

## TASK 1: Update directus-schema/schema.json

Add these 3 collections to the `collections` array (after `homepage_features`):

```json
    {
      "collection": "announcements",
      "meta": {
        "icon": "campaign",
        "note": "Ticker messages for homepage (Bait & Bullet style)",
        "sort_field": "sort_order"
      },
      "fields": [
        { "field": "id", "type": "integer", "meta": { "hidden": true, "interface": "input", "readonly": true } },
        { "field": "status", "type": "string", "meta": { "interface": "select-dropdown", "options": { "choices": [{"text": "Published", "value": "published"}, {"text": "Draft", "value": "draft"}] }, "default": "draft", "width": "half" } },
        { "field": "message", "type": "string", "meta": { "interface": "input", "required": true, "note": "Keep under 100 chars. E.g. 'Live bait in stock!'" } },
        { "field": "type", "type": "string", "meta": { "interface": "select-dropdown", "options": { "choices": [{"text": "Info", "value": "info"}, {"text": "Alert", "value": "alert"}, {"text": "Promo", "value": "promo"}] }, "default": "info", "width": "half" } },
        { "field": "link", "type": "string", "meta": { "interface": "input", "note": "Optional click-through URL", "width": "half" } },
        { "field": "start_date", "type": "timestamp", "meta": { "interface": "datetime", "width": "half", "note": "When to start showing" } },
        { "field": "end_date", "type": "timestamp", "meta": { "interface": "datetime", "width": "half", "note": "Auto-expire after this" } },
        { "field": "sort_order", "type": "integer", "meta": { "interface": "input", "width": "half" } }
      ]
    },
    {
      "collection": "services",
      "meta": {
        "icon": "build",
        "note": "Store services (FFL transfers, licenses, etc.)",
        "sort_field": "sort_order"
      },
      "fields": [
        { "field": "id", "type": "integer", "meta": { "hidden": true, "interface": "input", "readonly": true } },
        { "field": "status", "type": "string", "meta": { "interface": "select-dropdown", "options": { "choices": [{"text": "Published", "value": "published"}, {"text": "Draft", "value": "draft"}] }, "default": "draft", "width": "half" } },
        { "field": "name", "type": "string", "meta": { "interface": "input", "required": true, "width": "half" } },
        { "field": "slug", "type": "string", "meta": { "interface": "input", "required": true, "options": { "slug": true }, "width": "half" } },
        { "field": "short_description", "type": "text", "meta": { "interface": "input-multiline", "note": "For cards (150 chars max)" } },
        { "field": "description", "type": "text", "meta": { "interface": "input-rich-text-md", "note": "Full service details" } },
        { "field": "image", "type": "uuid", "meta": { "interface": "file-image", "special": ["file"] } },
        { "field": "price_info", "type": "string", "meta": { "interface": "input", "note": "e.g. '$25 per transfer'", "width": "half" } },
        { "field": "sort_order", "type": "integer", "meta": { "interface": "input", "width": "half" } }
      ]
    },
    {
      "collection": "pages",
      "meta": {
        "icon": "article",
        "note": "Custom static pages (About, FAQ, etc.)"
      },
      "fields": [
        { "field": "id", "type": "integer", "meta": { "hidden": true, "interface": "input", "readonly": true } },
        { "field": "status", "type": "string", "meta": { "interface": "select-dropdown", "options": { "choices": [{"text": "Published", "value": "published"}, {"text": "Draft", "value": "draft"}] }, "default": "draft", "width": "half" } },
        { "field": "title", "type": "string", "meta": { "interface": "input", "required": true, "width": "half" } },
        { "field": "slug", "type": "string", "meta": { "interface": "input", "required": true, "options": { "slug": true }, "width": "half", "note": "URL path e.g. 'about'" } },
        { "field": "content", "type": "text", "meta": { "interface": "input-rich-text-md" } },
        { "field": "meta_title", "type": "string", "meta": { "interface": "input", "note": "SEO title", "width": "half" } },
        { "field": "meta_description", "type": "text", "meta": { "interface": "input-multiline", "note": "SEO description", "width": "half" } }
      ]
    }
```

---

## TASK 2: Update directus-schema/seed-data.json

Add these new keys to the existing JSON:

```json
  "services": [
    {
      "status": "published",
      "name": "FFL Transfers",
      "slug": "ffl-transfers", 
      "short_description": "Transfer firearms purchased online to our store",
      "description": "We're a licensed Type 02 FFL dealer. Bring your online firearm purchase here for legal transfer.\n\n**Process:**\n1. Buy firearm online, ship to our FFL\n2. We notify you when it arrives\n3. Complete ATF Form 4473 in-store\n4. Pass NICS background check\n5. Take your firearm home",
      "price_info": "$25 per transfer",
      "sort_order": 1
    },
    {
      "status": "published",
      "name": "Hunting & Fishing Licenses",
      "slug": "licenses",
      "short_description": "WVDNR authorized license agent",
      "description": "Skip the line at Walmart. We're an authorized WVDNR license agent.\n\n**Available:**\n- Resident/Non-resident hunting\n- Resident/Non-resident fishing\n- Combination licenses\n- Trout stamps\n- National Forest stamps",
      "price_info": "State prices + $1 processing",
      "sort_order": 2
    },
    {
      "status": "published",
      "name": "Buy/Sell/Trade Firearms",
      "slug": "buy-sell-trade",
      "short_description": "Fair prices for your used firearms",
      "description": "As a Type 02 FFL, we can buy and sell used firearms legally. Bring in your firearm for a fair cash offer or trade value. No appointment needed.",
      "price_info": "Call for quote",
      "sort_order": 3
    },
    {
      "status": "published",
      "name": "Scope Mounting & Bore Sighting",
      "slug": "scope-mounting",
      "short_description": "Professional scope installation",
      "description": "Let us mount your new scope properly. We'll bore sight it so you're ready for the range.",
      "price_info": "$20 mount + sight",
      "sort_order": 4
    }
  ],
  "announcements": [
    {
      "status": "published",
      "message": "Buck season opens Nov 25 - we have your gear!",
      "type": "promo",
      "link": "/products?category=hunting-gear",
      "sort_order": 1
    }
  ],
  "pages": [
    {
      "status": "draft",
      "title": "About Us",
      "slug": "about",
      "content": "[PLACEHOLDER: Story content - gather from Kim]",
      "meta_title": "About WV Wild Outdoors - Family Owned Since 2008",
      "meta_description": "Family-owned sporting goods store serving Braxton County since 2008."
    },
    {
      "status": "draft",
      "title": "FAQ",
      "slug": "faq",
      "content": "[PLACEHOLDER: FAQ content]",
      "meta_title": "FAQ - WV Wild Outdoors",
      "meta_description": "Common questions about FFL transfers, licenses, and more."
    }
  ]
```

---

## TASK 3: Create infra/docker/docker-compose.yml

```yaml
# WV Wild Outdoors - Production Stack
# Usage: docker compose up -d

services:
  traefik:
    image: traefik:v3.2
    container_name: traefik
    restart: unless-stopped
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--providers.docker.network=proxy"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - proxy

  postgres:
    image: postgres:15-alpine
    container_name: wvwo-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: directus
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - internal
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: wvwo-redis
    restart: unless-stopped
    networks:
      - internal

  directus:
    image: directus/directus:latest
    container_name: directus
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      KEY: ${DIRECTUS_KEY}
      SECRET: ${DIRECTUS_SECRET}
      DB_CLIENT: pg
      DB_HOST: postgres
      DB_PORT: 5432
      DB_DATABASE: directus
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      CACHE_ENABLED: "true"
      CACHE_STORE: redis
      REDIS: redis://redis:6379
      ADMIN_EMAIL: ${DIRECTUS_ADMIN_EMAIL}
      ADMIN_PASSWORD: ${DIRECTUS_ADMIN_PASSWORD}
      PUBLIC_URL: https://admin.${DOMAIN}
    volumes:
      - directus_uploads:/directus/uploads
    networks:
      - proxy
      - internal
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.directus.rule=Host(`admin.${DOMAIN}`)"
      - "traefik.http.routers.directus.entrypoints=websecure"
      - "traefik.http.routers.directus.tls.certresolver=letsencrypt"
      - "traefik.http.services.directus.loadbalancer.server.port=8055"

  ghost:
    image: ghost:5-alpine
    container_name: ghost
    restart: unless-stopped
    environment:
      url: https://blog.${DOMAIN}
      database__client: sqlite3
      database__connection__filename: /var/lib/ghost/content/data/ghost.db
    volumes:
      - ghost_content:/var/lib/ghost/content
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.ghost.rule=Host(`blog.${DOMAIN}`)"
      - "traefik.http.routers.ghost.entrypoints=websecure"
      - "traefik.http.routers.ghost.tls.certresolver=letsencrypt"
      - "traefik.http.services.ghost.loadbalancer.server.port=2368"

  listmonk:
    image: listmonk/listmonk:latest
    container_name: listmonk
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      TZ: America/New_York
    volumes:
      - ./listmonk-config.toml:/listmonk/config.toml:ro
    networks:
      - proxy
      - internal
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.listmonk.rule=Host(`mail.${DOMAIN}`)"
      - "traefik.http.routers.listmonk.entrypoints=websecure"
      - "traefik.http.routers.listmonk.tls.certresolver=letsencrypt"
      - "traefik.http.services.listmonk.loadbalancer.server.port=9000"

  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami
    restart: unless-stopped
    depends_on:
      umami-db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_DB_PASSWORD}@umami-db:5432/umami
      APP_SECRET: ${UMAMI_APP_SECRET}
    networks:
      - proxy
      - internal
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.umami.rule=Host(`analytics.${DOMAIN}`)"
      - "traefik.http.routers.umami.entrypoints=websecure"
      - "traefik.http.routers.umami.tls.certresolver=letsencrypt"
      - "traefik.http.services.umami.loadbalancer.server.port=3000"

  umami-db:
    image: postgres:15-alpine
    container_name: umami-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${UMAMI_DB_PASSWORD}
    volumes:
      - umami_db_data:/var/lib/postgresql/data
    networks:
      - internal
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  proxy:
    name: proxy
  internal:
    name: internal

volumes:
  postgres_data:
  directus_uploads:
  ghost_content:
  umami_db_data:
```

---

## TASK 4: Create infra/docker/docker-compose.local.yml

```yaml
# Local development - direct ports, no Traefik
# Usage: docker compose -f docker-compose.yml -f docker-compose.local.yml up -d

services:
  traefik:
    profiles:
      - production

  directus:
    ports:
      - "8055:8055"
    environment:
      PUBLIC_URL: http://localhost:8055
    labels: []

  ghost:
    ports:
      - "2368:2368"
    environment:
      url: http://localhost:2368
    labels: []

  listmonk:
    ports:
      - "9000:9000"
    labels: []

  umami:
    ports:
      - "3000:3000"
    labels: []
```

---

## TASK 5: Create infra/docker/.env.example

```bash
# Domain & SSL
DOMAIN=wvwildoutdoors.com
ACME_EMAIL=your-email@example.com

# Database (shared PostgreSQL)
DB_USER=wvwo_admin
DB_PASSWORD=CHANGE_ME_GENERATE_STRONG_PASSWORD

# Directus
DIRECTUS_KEY=CHANGE_ME_RUN_openssl_rand_base64_32
DIRECTUS_SECRET=CHANGE_ME_RUN_openssl_rand_base64_32
DIRECTUS_ADMIN_EMAIL=admin@wvwildoutdoors.com
DIRECTUS_ADMIN_PASSWORD=CHANGE_ME_STRONG_PASSWORD

# Umami Analytics
UMAMI_DB_PASSWORD=CHANGE_ME_GENERATE_STRONG_PASSWORD
UMAMI_APP_SECRET=CHANGE_ME_RUN_openssl_rand_base64_32
```

---

## TASK 6: Create infra/docker/init-db.sql

```sql
-- Create additional databases for services
CREATE DATABASE listmonk;
```

---

## TASK 7: Create docs directory and docs/BLUEPRINT.md

Create a `docs` directory, then create `docs/BLUEPRINT.md` with the complete blueprint content. 

The blueprint should include these sections:
1. Executive Summary (tech stack, timeline, roles)
2. Directus Schema reference (point to schema.json)
3. Ghost configuration (SQLite, not MySQL - saves 300MB RAM)
4. Newsletter integration (Listmonk is source of truth, no Directus storage)
5. Reviews strategy (use Google Business Profile, not self-hosted)
6. Infrastructure overview (local vs production routing)
7. Division of labor (Kim vs Matthew)
8. Content strategy (Facebook, Blog, Newsletter cadence)
9. Success metrics (realistic for rural business)
10. The Reveal Plan (5-hour training visit script)
11. "If Kim Says No" contingency
12. Facebook OAuth troubleshooting
13. Maintenance schedule (daily/weekly/monthly/seasonal/annual)
14. FFL compliance disclaimers

Reference the artifact I generated earlier titled "WV Wild Outdoors Digital Blueprint: Corrected Sections" for the detailed content of each section.

---

## TASK 8: Update README.md

Replace the existing README with:

```markdown
# WV Wild Outdoors Storefront

Digital ecosystem for WV Wild Outdoors LLC - a family-owned sporting goods store in Birch River, West Virginia.

## Tech Stack

| Service | Purpose | Production URL |
|---------|---------|----------------|
| Astro | Static storefront | wvwildoutdoors.com |
| Directus | Product CMS | admin.wvwildoutdoors.com |
| Ghost | Blog (SQLite) | blog.wvwildoutdoors.com |
| Listmonk | Newsletter | mail.wvwildoutdoors.com |
| Umami | Analytics | analytics.wvwildoutdoors.com |

## Quick Start (Local)

```bash
cd infra/docker
cp .env.example .env
# Edit .env with your values

docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
```

**Access:**
- Directus: http://localhost:8055
- Ghost: http://localhost:2368
- Listmonk: http://localhost:9000
- Umami: http://localhost:3000

## Documentation

- [Complete Blueprint](docs/BLUEPRINT.md)
- [Directus Schema](directus-schema/schema.json)
- [Seed Data](directus-schema/seed-data.json)

## Project Status

- [x] Schema design (8 collections)
- [x] Seed data
- [x] Docker infrastructure
- [ ] Astro storefront
- [ ] Ghost theme
- [ ] Production deployment

---

*Private project for WV Wild Outdoors LLC*
```

---

## TASK 9: Commit

```bash
git add -A
git commit -m "Add blueprint v2, infrastructure, and missing schema collections

- Add announcements, services, pages collections to schema
- Add seed data for new collections
- Create docker-compose.yml (production) and docker-compose.local.yml
- Create .env.example and init-db.sql
- Add docs/BLUEPRINT.md with complete project specification
- Update README with quick start guide"
```

---

## Verification Checklist

After all tasks:

- [ ] `directus-schema/schema.json` has 8 collections
- [ ] `directus-schema/seed-data.json` has services, announcements, pages keys
- [ ] `infra/docker/docker-compose.yml` exists
- [ ] `infra/docker/docker-compose.local.yml` exists
- [ ] `infra/docker/.env.example` exists
- [ ] `infra/docker/init-db.sql` exists
- [ ] `docs/BLUEPRINT.md` exists
- [ ] README.md updated
