# Data Model: Docker Local Development Stack

**Feature**: 001-docker-dev-stack | **Date**: 2024-12-04
**Purpose**: Define service topology, data flow, and relationships in the local development environment

## Overview

This feature is infrastructure-focused, so the "data model" describes service architecture rather than application data schemas. The model shows how containers interact, persist data, and depend on each other.

---

## Service Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                         Host Machine                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              Docker Network: wvwo-dev                       │  │
│  │                                                              │  │
│  │   ┌──────────┐      ┌──────────┐                           │  │
│  │   │PostgreSQL│      │  Redis   │                           │  │
│  │   │  :5432   │      │  :6379   │                           │  │
│  │   └────┬─────┘      └────┬─────┘                           │  │
│  │        │                 │                                  │  │
│  │        ├─────────────────┼─────────────────┐               │  │
│  │        │                 │                 │               │  │
│  │   ┌────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐         │  │
│  │   │ Directus │    │   Ghost   │    │ Listmonk  │         │  │
│  │   │  :8055   │    │   :2368   │    │   :9000   │         │  │
│  │   └────┬─────┘    └───────────┘    └───────────┘         │  │
│  │        │                                                    │  │
│  │        │                 ┌──────────┐                      │  │
│  │        │                 │ Mixpost  │                      │  │
│  │        │                 │  :8080   │                      │  │
│  │        │                 └────┬─────┘                      │  │
│  │        │                      │                            │  │
│  │   ┌────▼──────────────────────▼─────┐                     │  │
│  │   │          Astro Frontend          │                     │  │
│  │   │            :3000                 │                     │  │
│  │   └──────────────────────────────────┘                     │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────── Port Mappings ────────────────┐               │
│  │  localhost:5432  → PostgreSQL                │               │
│  │  localhost:6379  → Redis                     │               │
│  │  localhost:8055  → Directus (CMS)            │               │
│  │  localhost:2368  → Ghost (Blog)              │               │
│  │  localhost:3000  → Astro (Frontend)          │               │
│  │  localhost:9000  → Listmonk (Email)          │               │
│  │  localhost:8080  → Mixpost (Social)          │               │
│  └───────────────────────────────────────────────┘               │
└───────────────────────────────────────────────────────────────────┘
```

---

## Service Entities

### Infrastructure Services

#### PostgreSQL (Database)

**Purpose**: Centralized relational database for all services

**Container Details**:
- Image: `postgres:17-alpine`
- Internal port: 5432
- Host port: 5432
- Network: `wvwo-dev`

**Databases**:
- `directus` - Directus CMS schema
- `ghost` - Ghost blog content
- `listmonk` - Email subscriber management
- `mixpost` - Social media scheduling

**Users**:
- `postgres` (superuser)
- `directus_user` (owner of `directus` DB)
- `ghost_user` (owner of `ghost` DB)
- `listmonk_user` (owner of `listmonk` DB)
- `mixpost_user` (owner of `mixpost` DB)

**Persistence**:
- Volume: `postgres-data` (named volume)
- Lifecycle: Persists across restarts, removed with `docker compose down -v`

**Health Check**: `pg_isready -U postgres`

---

#### Redis (Cache/Session Storage)

**Purpose**: In-memory cache and session store for application services

**Container Details**:
- Image: `redis:8-alpine`
- Internal port: 6379
- Host port: 6379
- Network: `wvwo-dev`

**Configuration**:
- Persistence: AOF (Append-Only File) enabled for durability
- Max memory: 256MB (with LRU eviction policy)

**Persistence**:
- Volume: `redis-data` (named volume)
- Lifecycle: Persists across restarts

**Health Check**: `redis-cli ping`

---

### Application Services

#### Directus (CMS)

**Purpose**: Headless CMS for products, categories, FAQs, store information

**Container Details**:
- Image: `directus/directus:11`
- Internal port: 8055
- Host port: 8055
- Network: `wvwo-dev`

**Dependencies**:
- PostgreSQL (database: `directus`)
- Redis (session storage, cache)

**Data Storage**:
- Database: Product catalog, categories, FAQs, pages
- Uploads volume: User-uploaded images, PDFs
- Extensions: Custom Directus modules (optional)

**Persistence**:
- Volume: `directus-uploads` (named volume)

**API Endpoints**:
- Admin UI: `http://localhost:8055/admin`
- REST API: `http://localhost:8055/items/{collection}`
- GraphQL: `http://localhost:8055/graphql`

**Health Check**: `GET /server/health`

---

#### Ghost (Blog)

**Purpose**: Blog and content publishing platform

**Container Details**:
- Image: `ghost:6-alpine`
- Internal port: 2368
- Host port: 2368
- Network: `wvwo-dev`

**Dependencies**:
- PostgreSQL (database: `ghost`)

**Data Storage**:
- Database: Posts, authors, tags, settings
- Content volume: Themes, images, uploaded files

**Persistence**:
- Volume: `ghost-content` (named volume)

**API Endpoints**:
- Admin UI: `http://localhost:2368/ghost/`
- Content API: `http://localhost:2368/ghost/api/content/`
- Admin API: `http://localhost:2368/ghost/api/admin/`

**Health Check**: `GET /ghost/api/admin/site/`

---

#### Astro (Frontend)

**Purpose**: Static site generator for public-facing website

**Container Details**:
- Image: Custom (Node.js 22 LTS + Astro dev server)
- Internal port: 3000
- Host port: 3000
- Network: `wvwo-dev`

**Dependencies**:
- Directus (fetches product/content data)
- Ghost (fetches blog posts)

**Data Storage**:
- Source code: Bind mount (`./frontend:/app`)
- No persistent data (regenerates on build)

**Build Modes**:
- Development: Hot reload dev server
- Production: Static HTML/CSS/JS output

**API Consumption**:
- Directus: `GET /items/products`, `GET /items/categories`
- Ghost: `GET /ghost/api/v3/content/posts`

**Health Check**: `GET /` (homepage)

---

#### Listmonk (Email)

**Purpose**: Newsletter and mailing list management

**Container Details**:
- Image: `listmonk/listmonk:v5.1.0`
- Internal port: 9000
- Host port: 9000
- Network: `wvwo-dev`

**Dependencies**:
- PostgreSQL (database: `listmonk`)

**Data Storage**:
- Database: Subscribers, campaigns, templates, analytics
- No file uploads

**Persistence**: Database-backed only

**API Endpoints**:
- Admin UI: `http://localhost:9000/admin`
- Public API: `http://localhost:9000/api/`

**Health Check**: `GET /api/health`

---

#### Mixpost (Social Media)

**Purpose**: Social media post scheduling and management

**Container Details**:
- Image: Custom (Laravel-based)
- Internal port: 8080
- Host port: 8080
- Network: `wvwo-dev`

**Dependencies**:
- PostgreSQL (database: `mixpost`)
- Redis (queue jobs, cache)

**Data Storage**:
- Database: Posts, social accounts, analytics
- Laravel storage: Queued jobs, session data

**Persistence**: Database-backed + Redis queue

**API Endpoints**:
- Admin UI: `http://localhost:8080/`
- API: Internal only (no public API)

**Health Check**: `GET /health`

---

## Data Flow

### Content Publishing Flow

1. **Kim creates product in Directus**:
   - Logs into Directus admin (`localhost:8055/admin`)
   - Fills product form (name, price, description, images)
   - Saves → PostgreSQL `directus.products` table

2. **Astro fetches product data**:
   - Dev server watches Directus API
   - Polls `/items/products` endpoint
   - Regenerates product pages with new data

3. **Customer views product**:
   - Visits `localhost:3000/products/{slug}`
   - Sees statically generated page (Astro output)

### Blog Publishing Flow

1. **Kim writes blog post in Ghost**:
   - Logs into Ghost editor (`localhost:2368/ghost/`)
   - Writes post, adds images
   - Publishes → PostgreSQL `ghost.posts` table

2. **Astro fetches blog data**:
   - Build process calls Ghost Content API
   - Retrieves published posts
   - Generates blog index and individual post pages

3. **Customer reads blog**:
   - Visits `localhost:3000/blog/`
   - Sees list of posts (Astro-generated)

### Email Newsletter Flow

1. **Matt collects emails**:
   - Customer emails added to Listmonk via API or CSV import
   - Stored in PostgreSQL `listmonk.subscribers` table

2. **Kim drafts newsletter**:
   - Logs into Listmonk (`localhost:9000/admin`)
   - Creates campaign, selects subscriber list
   - Previews email content

3. **Matt sends newsletter**:
   - Reviews draft, clicks "Send"
   - Listmonk processes queue, sends via SMTP

### Social Media Flow

1. **Kim schedules Facebook post**:
   - Logs into Mixpost (`localhost:8080/`)
   - Writes post, selects accounts
   - Sets publish time → PostgreSQL `mixpost.posts` table

2. **Mixpost publishes**:
   - Background worker (Redis queue) polls scheduled posts
   - Posts to social platforms via API at scheduled time

---

## State Transitions

### Service Lifecycle

1. **First Start** (empty volumes):
   - PostgreSQL: Runs init scripts, creates databases/users
   - Redis: Starts with empty dataset
   - Directus: Initializes schema, creates admin user
   - Ghost: Initializes schema, prompts for admin setup
   - Listmonk: Runs `--install` to create schema
   - Astro: Builds dev server, no initial state

2. **Normal Operation**:
   - All services running, healthy
   - Data persists in named volumes
   - Developers can modify code (Astro hot reloads)

3. **Stop** (`docker compose down`):
   - Containers stop gracefully (30s timeout)
   - Volumes remain intact
   - Network removed

4. **Restart** (`docker compose up`):
   - Containers start from existing volumes
   - Data persists (no re-initialization)
   - Services reconnect to PostgreSQL/Redis

5. **Clean** (`docker compose down -v`):
   - Containers stop
   - Volumes deleted (all data lost)
   - Next start triggers re-initialization

---

## Integration Points

### Directus ↔ Astro

- **Protocol**: HTTP REST API
- **Authentication**: Directus public API token (read-only)
- **Endpoints Used**:
  - `GET /items/products?fields=*`
  - `GET /items/categories?fields=*`
  - `GET /items/store_info?fields=*`
- **Data Format**: JSON
- **Frequency**: On-demand during Astro build

### Ghost ↔ Astro

- **Protocol**: HTTP REST API (Ghost Content API)
- **Authentication**: Ghost Content API key
- **Endpoints Used**:
  - `GET /ghost/api/content/posts/?key={key}&limit=all`
  - `GET /ghost/api/content/pages/?key={key}`
- **Data Format**: JSON
- **Frequency**: On-demand during Astro build

### Services ↔ PostgreSQL

- **Protocol**: PostgreSQL wire protocol (TCP 5432)
- **Authentication**: Username/password per service
- **Connection Pooling**: Managed by each service
- **Isolation**: Each service owns its database

### Services ↔ Redis

- **Protocol**: Redis protocol (TCP 6379)
- **Authentication**: None (local network only)
- **Key Namespacing**: `{service}:*` prefix (e.g., `directus:cache:*`)
- **Usage**: Session storage, cache, job queues

---

## Performance Characteristics

| Service | Startup Time | Memory Usage | Disk Usage (empty) | Disk Usage (with data) |
|---------|--------------|--------------|-------------------|------------------------|
| PostgreSQL | ~5s | 50MB | 200MB | 500MB - 2GB |
| Redis | ~2s | 10MB | 10MB | 50MB - 256MB |
| Directus | ~10s | 150MB | 100MB | 200MB - 1GB |
| Ghost | ~8s | 100MB | 150MB | 300MB - 1GB |
| Astro | ~15s | 200MB | 50MB | 50MB (code only) |
| Listmonk | ~5s | 50MB | 20MB | 100MB - 500MB |
| Mixpost | ~10s | 100MB | 50MB | 150MB - 500MB |
| **Total** | **~60s** | **660MB** | **580MB** | **1.4GB - 6GB** |

**Notes**:
- Startup times assume warm Docker cache (images already pulled)
- Memory usage is baseline with no active load
- Disk usage scales with number of products, posts, subscribers
- Cold start (pulling images) adds 5-10 minutes depending on network speed

---

## Validation & Testing

### Health Check Endpoints

All services expose health endpoints for container orchestration:

| Service | Health Check Command | Expected Response |
|---------|---------------------|-------------------|
| PostgreSQL | `pg_isready -U postgres` | `accepting connections` |
| Redis | `redis-cli ping` | `PONG` |
| Directus | `curl http://localhost:8055/server/health` | `200 OK` |
| Ghost | `curl http://localhost:2368/ghost/api/admin/site/` | `200 OK` |
| Astro | `curl http://localhost:3000/` | `200 OK` |
| Listmonk | `curl http://localhost:9000/api/health` | `200 OK` |
| Mixpost | `curl http://localhost:8080/health` | `200 OK` |

### Integration Tests

Test scenarios to validate service communication:

1. **Database Connectivity**:
   - Connect to PostgreSQL from host: `psql -h localhost -U postgres`
   - Verify databases exist: `\l` shows `directus`, `ghost`, `listmonk`, `mixpost`

2. **API Accessibility**:
   - Directus: `curl http://localhost:8055/server/ping` → `200 OK`
   - Ghost: `curl http://localhost:2368/` → HTML response

3. **Inter-Service Communication**:
   - Astro can fetch from Directus: Check dev server logs for API requests
   - Astro can fetch from Ghost: Blog pages render without errors

4. **Data Persistence**:
   - Create test product in Directus
   - Stop stack: `docker compose down`
   - Restart: `docker compose up -d`
   - Verify product still exists in Directus

5. **Volume Cleanup**:
   - Run `docker compose down -v`
   - Restart stack
   - Verify fresh initialization (default admin user, empty databases)

---

## Conclusion

This data model defines the service topology, dependencies, and data flows for the local development environment. All services integrate via well-defined APIs and persist data through Docker volumes. The architecture mirrors production for realistic testing while maintaining developer-friendly workflows (hot reload, seed scripts, easy cleanup).
