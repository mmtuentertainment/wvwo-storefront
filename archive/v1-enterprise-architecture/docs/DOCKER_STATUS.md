# Docker Stack Status

**Last Updated**: 2025-12-05
**Testing Platform**: Windows 11 with Docker Desktop

## Service Status

| Service | Status | Port | Accessible | Notes |
|---------|--------|------|-----------|-------|
| PostgreSQL | HEALTHY | 5432 | Yes | v17-alpine, all databases and users created |
| Redis | HEALTHY | 6379 | Yes | v8-alpine, persistence configured |
| Directus | HEALTHY | 8055 | Yes | v11, admin panel loads |
| Ghost | HEALTHY | 2368 | Yes | v6-alpine, using SQLite (Ghost dropped PostgreSQL support) |
| Listmonk | HEALTHY | 9000 | Yes | v5.1.0, needs initial admin setup |
| Mixpost | DISABLED | 8080 | N/A | Commented out - requires MySQL |
| Astro | DISABLED | 3000 | N/A | Commented out - app doesn't exist yet |

## Working Services (5/7)

### Fully Functional
- **PostgreSQL 17**: Database foundation, all services connected
- **Redis 8**: Caching service operational
- **Directus 11**: CMS admin panel at http://localhost:8055/admin/login
- **Ghost 6**: Blog at http://localhost:2368 (using SQLite database)
- **Listmonk v5.1.0**: Newsletter at http://localhost:9000/admin

### Disabled Services
- **Mixpost**: Requires MySQL (not PostgreSQL), official Docker setup different from our config
- **Astro**: Frontend application hasn't been created yet

## Access URLs

| Service | URL | Notes |
|---------|-----|-------|
| Directus Admin | http://localhost:8055/admin/login | Use credentials from .env |
| Ghost Blog | http://localhost:2368 | Public site |
| Ghost Admin | http://localhost:2368/ghost | Setup required on first visit |
| Listmonk Admin | http://localhost:9000/admin | Create admin user on first visit |

## Health Check Configuration

All health checks use `wget` (not `curl`) with `127.0.0.1` (not `localhost`) for Alpine container compatibility:

```yaml
# Example health check pattern
healthcheck:
  test: ["CMD", "wget", "--spider", "-q", "http://127.0.0.1:PORT/health-endpoint"]
  interval: 15s
  timeout: 10s
  retries: 5
  start_period: 60s
```

## Fixes Applied (December 2025)

1. Updated all services to December 2025 versions:
   - PostgreSQL 15 -> 17
   - Redis 7 -> 8
   - Ghost 5 -> 6
   - Directus 10 -> 11
   - Listmonk -> v5.1.0

2. Ghost database configuration:
   - Ghost dropped PostgreSQL support in v5+
   - Configured to use SQLite (default for Ghost Docker)
   - Database stored in ghost-content volume

3. Health check fixes:
   - Changed from `curl` to `wget` (curl not installed in Alpine images)
   - Changed from `localhost` to `127.0.0.1` (localhost resolution issues in Alpine)
   - Increased `start_period` from 30s to 60s (services need more startup time)
   - Increased `retries` from 3 to 5
   - Listmonk health check uses `/api/public/lists` (auth not required)

4. Mixpost disabled:
   - Requires MySQL database (not PostgreSQL)
   - Custom Dockerfile was incomplete (PHP-FPM only, no Mixpost app)
   - Will need separate MySQL service or official Mixpost Docker setup

5. PostgreSQL volume reset:
   - Old v15 data volume incompatible with v17
   - Volume recreated with fresh initialization

## Quick Reference Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Clean restart (removes volumes)
docker compose down -v && docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f [service]

# Rebuild specific service
docker compose up -d --build [service]
```

## Next Steps

1. **Mixpost**: Decide on MySQL approach (add MySQL service or use official Mixpost Docker Compose)
2. **Astro**: Create frontend application when ready
3. **Initial Setup**: Complete first-time setup for Ghost and Listmonk admin users
