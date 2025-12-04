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
