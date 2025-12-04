# Service Interface Contracts

**Feature**: 001-docker-dev-stack | **Date**: 2024-12-04
**Purpose**: Define precise interface specifications for all services in the Docker development stack

## Overview

This document specifies the exact ports, environment variables, volume mounts, and API contracts for each service. These contracts ensure consistent configuration across developers and provide clear integration points.

---

## Docker Compose Service Contracts

### PostgreSQL Service

```yaml
Service Name: postgres
Image: postgres:15-alpine
Container Name: wvwo-postgres-dev

```

**Port Mapping**:
- Internal: `5432`
- Host: `5432`
- Protocol: TCP

**Environment Variables** (all required):

```yaml
POSTGRES_USER: postgres
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}  # from .env
POSTGRES_DB: postgres                     # default database

```

**Volume Mounts**:

```yaml
- postgres-data:/var/lib/postgresql/data          # Named volume (database files)
- ./docker/postgres/init-scripts:/docker-entrypoint-initdb.d:ro  # Init scripts (read-only)

```

**Health Check**:

```yaml
test: ["CMD-SHELL", "pg_isready -U postgres"]
interval: 10s
timeout: 5s
retries: 5

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**: None (foundation service)

**Restart Policy**: `unless-stopped`

---

### Redis Service

```yaml
Service Name: redis
Image: redis:7-alpine
Container Name: wvwo-redis-dev

```

**Port Mapping**:
- Internal: `6379`
- Host: `6379`
- Protocol: TCP

**Environment Variables**: None (default configuration)

**Volume Mounts**:

```yaml
- redis-data:/data                          # Named volume (persistence)
- ./docker/redis/redis.conf:/usr/local/etc/redis/redis.conf:ro  # Config (optional)

```

**Command Override** (if custom config):

```yaml
command: redis-server /usr/local/etc/redis/redis.conf

```

**Health Check**:

```yaml
test: ["CMD", "redis-cli", "ping"]
interval: 5s
timeout: 3s
retries: 3

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**: None (foundation service)

**Restart Policy**: `unless-stopped`

---

### Directus Service

```yaml
Service Name: directus
Image: directus/directus:10
Container Name: wvwo-directus-dev

```

**Port Mapping**:
- Internal: `8055`
- Host: `8055`
- Protocol: HTTP

**Environment Variables** (all required):

```yaml
KEY: ${DIRECTUS_KEY}                          # Admin token secret (32+ chars)
SECRET: ${DIRECTUS_SECRET}                    # JWT secret (32+ chars)
ADMIN_EMAIL: ${DIRECTUS_ADMIN_EMAIL}          # Initial admin email
ADMIN_PASSWORD: ${DIRECTUS_ADMIN_PASSWORD}    # Initial admin password

DB_CLIENT: postgres
DB_HOST: postgres                              # Service name on Docker network
DB_PORT: 5432
DB_DATABASE: directus
DB_USER: directus_user
DB_PASSWORD: ${DIRECTUS_DB_PASSWORD}

REDIS_HOST: redis                              # Service name on Docker network
REDIS_PORT: 6379

PUBLIC_URL: http://localhost:8055
STORAGE_LOCATIONS: local
CORS_ENABLED: true
CORS_ORIGIN: http://localhost:3000             # Allow Astro frontend

```

**Volume Mounts**:

```yaml
- directus-uploads:/directus/uploads           # Named volume (user uploads)
- ./docker/directus/extensions:/directus/extensions:ro  # Custom extensions (optional)

```

**Health Check**:

```yaml
test: ["CMD", "curl", "-f", "http://localhost:8055/server/health"]
interval: 15s
timeout: 10s
retries: 3
start_period: 30s                              # Allow time for DB init

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**:

```yaml
depends_on:
  postgres:
    condition: service_healthy
  redis:
    condition: service_healthy

```

**Restart Policy**: `unless-stopped`

---

### Ghost Service

```yaml
Service Name: ghost
Image: ghost:5-alpine
Container Name: wvwo-ghost-dev

```

**Port Mapping**:
- Internal: `2368`
- Host: `2368`
- Protocol: HTTP

**Environment Variables** (all required):

```yaml
database__client: postgres
database__connection__host: postgres
database__connection__port: 5432
database__connection__database: ghost
database__connection__user: ghost_user
database__connection__password: ${GHOST_DB_PASSWORD}

url: http://localhost:2368
NODE_ENV: development

```

**Volume Mounts**:

```yaml
- ghost-content:/var/lib/ghost/content         # Named volume (themes, images, posts)

```

**Health Check**:

```yaml
test: ["CMD", "curl", "-f", "http://localhost:2368/ghost/api/v3/admin/site/"]
interval: 15s
timeout: 10s
retries: 3
start_period: 30s

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**:

```yaml
depends_on:
  postgres:
    condition: service_healthy

```

**Restart Policy**: `unless-stopped`

---

### Astro Service

```yaml
Service Name: astro
Image: wvwo-astro-dev:latest                   # Custom image (built from Dockerfile)
Container Name: wvwo-astro-dev

```

**Build Context**:

```yaml
build:
  context: ./frontend
  dockerfile: Dockerfile.dev

```

**Port Mapping**:
- Internal: `3000`
- Host: `3000`
- Protocol: HTTP

**Environment Variables** (all required):

```yaml
PUBLIC_DIRECTUS_URL: http://directus:8055      # Internal Docker network URL
PUBLIC_GHOST_URL: http://ghost:2368            # Internal Docker network URL
NODE_ENV: development

```

**Volume Mounts**:

```yaml
- ./frontend:/app                              # Bind mount (hot reload)
- /app/node_modules                            # Anonymous volume (prevent overwrite)

```

**Health Check**:

```yaml
test: ["CMD", "curl", "-f", "http://localhost:3000/"]
interval: 10s
timeout: 5s
retries: 3
start_period: 20s                              # Allow time for npm install

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**:

```yaml
depends_on:
  directus:
    condition: service_healthy
  ghost:
    condition: service_healthy

```

**Restart Policy**: `unless-stopped`

---

### Listmonk Service

```yaml
Service Name: listmonk
Image: listmonk/listmonk:latest
Container Name: wvwo-listmonk-dev

```

**Port Mapping**:
- Internal: `9000`
- Host: `9000`
- Protocol: HTTP

**Environment Variables** (all required):

```yaml
LISTMONK_app__address: 0.0.0.0:9000
LISTMONK_db__host: postgres
LISTMONK_db__port: 5432
LISTMONK_db__user: listmonk_user
LISTMONK_db__password: ${LISTMONK_DB_PASSWORD}
LISTMONK_db__database: listmonk
LISTMONK_db__ssl_mode: disable

```

**Volume Mounts**: None (database-backed only)

**Init Command** (first run only):

```yaml
command: sh -c "./listmonk --install && ./listmonk"

```

**Health Check**:

```yaml
test: ["CMD", "curl", "-f", "http://localhost:9000/api/health"]
interval: 15s
timeout: 10s
retries: 3
start_period: 30s

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**:

```yaml
depends_on:
  postgres:
    condition: service_healthy

```

**Restart Policy**: `unless-stopped`

---

### Mixpost Service

```yaml
Service Name: mixpost
Image: wvwo-mixpost-dev:latest                 # Custom image
Container Name: wvwo-mixpost-dev

```

**Build Context**:

```yaml
build:
  context: ./docker/mixpost
  dockerfile: Dockerfile

```

**Port Mapping**:
- Internal: `8080`
- Host: `8080`
- Protocol: HTTP

**Environment Variables** (all required):

```yaml
APP_URL: http://localhost:8080
APP_KEY: ${MIXPOST_APP_KEY}                    # Laravel app key (base64)

DB_CONNECTION: pgsql
DB_HOST: postgres
DB_PORT: 5432
DB_DATABASE: mixpost
DB_USERNAME: mixpost_user
DB_PASSWORD: ${MIXPOST_DB_PASSWORD}

REDIS_HOST: redis
REDIS_PORT: 6379

# Social credentials (mock for local dev)
FACEBOOK_APP_ID: local-dev-mock
FACEBOOK_APP_SECRET: local-dev-mock

```

**Volume Mounts**:

```yaml
- ./docker/mixpost/storage:/var/www/html/storage  # Laravel storage (optional)

```

**Health Check**:

```yaml
test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
interval: 15s
timeout: 10s
retries: 3
start_period: 30s

```

**Network**: `wvwo-dev` (bridge)

**Dependencies**:

```yaml
depends_on:
  postgres:
    condition: service_healthy
  redis:
    condition: service_healthy

```

**Restart Policy**: `unless-stopped`

---

## Network Contract

```yaml
Name: wvwo-dev
Driver: bridge
Internal: false                                # Host can access services
IPAM:
  Driver: default
  Config:
    - Subnet: 172.28.0.0/16                    # Custom subnet (avoids conflicts)

```

**DNS Resolution**:
- Services resolve each other by service name (e.g., `postgres`, `redis`)
- Docker's embedded DNS server handles resolution
- No manual IP configuration needed

---

## Volume Contracts

### Named Volumes

```yaml
volumes:
  postgres-data:
    driver: local
    name: wvwo-postgres-data-dev

  redis-data:
    driver: local
    name: wvwo-redis-data-dev

  directus-uploads:
    driver: local
    name: wvwo-directus-uploads-dev

  ghost-content:
    driver: local
    name: wvwo-ghost-content-dev

```

**Lifecycle**:
- Created on first `docker compose up`
- Persist across `docker compose down`
- Removed with `docker compose down -v`

**Backup Command**:

```bash
docker run --rm -v wvwo-postgres-data-dev:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .

```

**Restore Command**:

```bash
docker run --rm -v wvwo-postgres-data-dev:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /data

```

---

## API Contracts

### Directus REST API

**Base URL**: `http://localhost:8055`

**Authentication**:
- Admin: Bearer token from `/auth/login`
- Public: Static token in `PUBLIC_URL` env var

**Key Endpoints**:

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/server/health` | Health check | None |
| POST | `/auth/login` | Admin login | None |
| GET | `/items/products` | List products | Public token |
| GET | `/items/products/:id` | Get product | Public token |
| GET | `/items/categories` | List categories | Public token |
| GET | `/items/store_info` | Store settings | Public token |

**Response Format**:

```json
{
  "data": [...],
  "meta": {
    "total_count": 42,
    "filter_count": 10
  }
}

```

---

### Ghost Content API

**Base URL**: `http://localhost:2368`

**Authentication**: Content API key (query parameter)

**Key Endpoints**:

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/ghost/api/v3/content/posts/` | List posts | API key |
| GET | `/ghost/api/v3/content/posts/slug/:slug/` | Get post by slug | API key |
| GET | `/ghost/api/v3/content/pages/` | List pages | API key |
| GET | `/ghost/api/v3/content/tags/` | List tags | API key |

**Query Parameters**:
- `key`: Content API key (required)
- `limit`: Number of results (default: 15, max: all)
- `include`: Related data (e.g., `authors,tags`)

**Response Format**:

```json
{
  "posts": [...],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 15,
      "pages": 3,
      "total": 42
    }
  }
}

```

---

### Listmonk API

**Base URL**: `http://localhost:9000`

**Authentication**: Basic auth or API token

**Key Endpoints**:

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/health` | Health check | None |
| GET | `/api/subscribers` | List subscribers | Admin |
| POST | `/api/subscribers` | Add subscriber | Admin |
| GET | `/api/campaigns` | List campaigns | Admin |
| POST | `/api/campaigns` | Create campaign | Admin |

**Response Format**:

```json
{
  "data": {...},
  "message": "success"
}

```

---

## Environment Variable Reference

Complete `.env.example` contract:

```bash
# =============================================================================
# WV Wild Outdoors - Local Development Environment Configuration
# =============================================================================
# Copy this file to .env and fill in real values
# DO NOT commit .env to version control
# =============================================================================

# -----------------------------------------------------------------------------
# PostgreSQL (Foundation Database)
# -----------------------------------------------------------------------------
POSTGRES_PASSWORD=devpassword123

# -----------------------------------------------------------------------------
# Directus (Headless CMS)
# -----------------------------------------------------------------------------
# Generate KEY and SECRET with: openssl rand -base64 32
DIRECTUS_KEY=REPLACE_WITH_32_CHAR_RANDOM_STRING
DIRECTUS_SECRET=REPLACE_WITH_32_CHAR_RANDOM_STRING

# Admin user (created on first start)
DIRECTUS_ADMIN_EMAIL=admin@localhost.dev
DIRECTUS_ADMIN_PASSWORD=admin123

# Database credentials
DIRECTUS_DB_PASSWORD=directuspass123

# -----------------------------------------------------------------------------
# Ghost (Blog)
# -----------------------------------------------------------------------------
GHOST_DB_PASSWORD=ghostpass123

# -----------------------------------------------------------------------------
# Listmonk (Email Newsletter)
# -----------------------------------------------------------------------------
LISTMONK_DB_PASSWORD=listmonkpass123

# -----------------------------------------------------------------------------
# Mixpost (Social Media Scheduling)
# -----------------------------------------------------------------------------
# Generate with: php artisan key:generate (or use any base64:XXX format)
MIXPOST_APP_KEY=base64:[INSERT_YOUR_LARAVEL_KEY_HERE]

# Database credentials
MIXPOST_DB_PASSWORD=mixpostpass123

# Social platform credentials (mock values for local dev)
FACEBOOK_APP_ID=local-dev-mock
FACEBOOK_APP_SECRET=local-dev-mock

# -----------------------------------------------------------------------------
# Optional Feature Flags
# -----------------------------------------------------------------------------
ENABLE_SEED_DATA=false                         # Load test data on init
LOG_LEVEL=info                                 # Logging verbosity

```

**Validation Rules**:
- All passwords: Minimum 8 characters
- `DIRECTUS_KEY` and `DIRECTUS_SECRET`: Exactly 32 characters (base64)
- `MIXPOST_APP_KEY`: Must start with `base64:`
- Email format: Valid email address

---

## Script Contracts

### dev-start.sh / dev-start.ps1

**Purpose**: Start all services

**Prerequisites**:
- Docker Engine running
- `.env` file exists

**Behavior**:
1. Validate Docker is running
2. Check `.env` exists (error if missing)
3. Run `docker compose up -d`
4. Wait for all health checks to pass
5. Display service URLs

**Exit Codes**:
- `0`: Success
- `1`: Docker not running
- `2`: `.env` missing
- `3`: Compose command failed

---

### dev-stop.sh / dev-stop.ps1

**Purpose**: Stop all services (preserve data)

**Behavior**:
1. Run `docker compose down`
2. Confirm all containers stopped

**Exit Codes**:
- `0`: Success
- `1`: Compose command failed

---

### dev-clean.sh / dev-clean.ps1

**Purpose**: Remove all containers and volumes (full reset)

**Behavior**:
1. Prompt for confirmation (destructive action)
2. Run `docker compose down -v --remove-orphans`
3. Confirm volumes removed

**Exit Codes**:
- `0`: Success
- `1`: User cancelled
- `2`: Compose command failed

---

### dev-seed.sh / dev-seed.ps1

**Purpose**: Load optional test data

**Prerequisites**:
- Services running and healthy

**Behavior**:
1. Check services are running
2. Execute SQL scripts in `docker/postgres/seed-data/`
3. Load sample products via Directus API
4. Create test blog posts via Ghost API
5. Display summary of seeded data

**Exit Codes**:
- `0`: Success
- `1`: Services not running
- `2`: Seed script failed

---

### dev-logs.sh / dev-logs.ps1

**Purpose**: View service logs

**Usage**:
- `./dev-logs.sh` - All services
- `./dev-logs.sh <service>` - Specific service

**Behavior**:
1. Validate service name (if provided)
2. Run `docker compose logs -f [service]`
3. Stream logs until Ctrl+C

**Exit Codes**:
- `0`: Success (user stopped)
- `1`: Invalid service name

---

## Conclusion

These contracts define the exact interface specifications for all services, ensuring consistency across development environments. Developers can reference this document when configuring new services, troubleshooting issues, or integrating additional tools.
