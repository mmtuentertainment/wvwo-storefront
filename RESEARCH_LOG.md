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

## NEXT STEPS (Pending Research)

1. Directus schema spec (exact collections, fields, relationships)
2. Owner daily workflow mapping
3. Astro page structure
