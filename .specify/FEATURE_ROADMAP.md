# WV Wild Outdoors - Feature Roadmap

**Spec-Driven Development Sequence**

For each feature below, run the SDD workflow:

```

/speckit.specify [Feature Description]
/speckit.plan
/speckit.tasks
/speckit.implement

```

---

## Phase 1: Foundation (Infrastructure)

These establish the base that all other features depend on.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 001 | **Docker Local Stack** | PostgreSQL 15, Redis, and base container orchestration for local development | None |
| 002 | **Directus CMS Setup** | Directus container with Products, Categories, FAQs, StoreInfo collections and API permissions | 001 |
| 003 | **Ghost Blog Setup** | Ghost container with blog categories (Hunting, Fishing, Gear, Licenses, Stories) and editor role | 001 |
| 004 | **Astro Project Scaffold** | Base Astro project with layouts, design system (colors, typography), and API client libraries | None |

---

## Phase 2: Core Pages (Kim Can See Progress)

Public-facing pages that form the storefront skeleton.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 005 | **Homepage** | Hero section, trust signals, featured categories, service highlights, newsletter signup, footer | 002, 004 |
| 006 | **About/Story Page** | Kim & Bryan's story with photo integration, resilience narrative, community connection | 004 |
| 007 | **Product Catalog** | Product listing page with category filters, search, grid display, stock indicators | 002, 004 |
| 008 | **Product Detail Page** | Individual product view with gallery, description, "Call for pricing" CTA, related products | 007 |
| 009 | **Contact Page** | Store info, hours, map embed, contact form (email to Kim), directions | 002, 004 |

---

## Phase 3: Services & Content

Business-specific functionality that differentiates WV Wild.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 010 | **FFL Transfers Page** | FFL transfer service explanation, $25 fee, compliance disclaimers, process steps | 004 |
| 011 | **License Sales Page** | WVDNR license agent info, license types, what to bring, hours | 004 |
| 012 | **FAQ Page** | Searchable FAQ from Directus, categorized by topic | 002, 004 |
| 013 | **Blog Archive** | Ghost blog integration, category filtering, post cards with excerpts | 003, 004 |
| 014 | **Blog Post Page** | Individual blog post display, author info, related posts, social sharing | 013 |

---

## Phase 4: Engagement Features

Features that build customer relationships.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 015 | **Newsletter Signup** | Email capture form, interest checkboxes (Hunting/Fishing/Boots/General), Listmonk integration | 004 |
| 016 | **Listmonk Email Setup** | Listmonk container, subscriber lists, welcome email template, blog digest automation | 001, 015 |
| 017 | **Stock Update Ticker** | "Bait & Bullet" ticker on homepage showing manual stock updates from Directus | 002, 005 |

---

## Phase 5: Admin & Owner Workflows

Features that make Kim's life easier.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 018 | **Directus Mobile View** | Custom Directus dashboard optimized for Kim's phone - quick product add, FAQ edit | 002 |
| 019 | **Ghost Mobile Publishing** | Streamlined Ghost editor workflow for Kim to publish blog posts from phone | 003 |
| 020 | **Mixpost Social Scheduler** | Mixpost container setup, Facebook page connection, scheduled posting workflow | 001 |

---

## Phase 6: Production Deployment

Moving from local to live.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 021 | **DigitalOcean VPS Setup** | Production server with Docker, firewall, SSH keys, non-root user | All Phase 1-5 |
| 022 | **Traefik Production Proxy** | HTTPS certificates, domain routing, security headers | 021 |
| 023 | **Cloudflare DNS & CDN** | Domain configuration, SSL, caching rules, DDoS protection | 022 |
| 024 | **Backblaze Backup System** | Automated daily backups of databases and uploads to B2 | 021 |

---

## Phase 7: Polish & Launch

Final touches before reveal.

| # | Feature | Description | Dependencies |
|---|---------|-------------|--------------|
| 025 | **SEO Setup** | Meta tags, Open Graph, structured data, sitemap, robots.txt | All pages |
| 026 | **Analytics Integration** | Privacy-respecting analytics (Plausible or self-hosted) | 021 |
| 027 | **Performance Optimization** | Image optimization, lazy loading, Core Web Vitals tuning | All pages |
| 028 | **Mobile Responsiveness Audit** | Final pass ensuring all pages work perfectly on Kim's phone | All pages |

---

## Quick Start Commands

**Start with Feature 001:**

```

/speckit.specify Docker local development stack with PostgreSQL 15, Redis, and container orchestration for WV Wild Outdoors services

```

**After spec is created:**

```

/speckit.plan

```

**After plan is created:**

```

/speckit.tasks

```

**Execute the tasks:**

```

/speckit.implement

```

---

## Notes

- **One feature at a time** - Complete the full SDD cycle before starting the next
- **Dependencies matter** - Don't skip ahead; later features assume earlier ones exist
- **Kim checkpoints** - After 005, 006, 007 she can see real progress
- **Constitution compliance** - Every spec will be checked against the 5 principles
- **No e-commerce** - This is a showroom, not a shopping cart

---

**Version**: 1.0.0 | **Created**: 2025-12-04
