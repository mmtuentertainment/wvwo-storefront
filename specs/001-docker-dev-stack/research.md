# Research: Docker Local Development Stack

**Feature**: 001-docker-dev-stack | **Date**: 2024-12-04
**Purpose**: Resolve technical unknowns and establish best practices for multi-service Docker orchestration

## Research Summary

This document consolidates research findings for creating a production-like local development environment using Docker Compose. Key decisions made: Docker Compose v3.8 syntax, named volumes for persistence, health-check-based dependency management, separate PostgreSQL databases per service, and cross-platform script support.

---

## 1. Docker Compose Configuration Patterns

### Decision: Docker Compose v3.8 with health check dependencies

**Rationale**:
- v3.8 supports `depends_on` with `condition: service_healthy` for proper startup ordering
- Widely supported across Docker Desktop and standalone Engine installations
- Balances modern features with backward compatibility

**Best Practices Applied**:
- **Health Checks**: Every service defines `healthcheck` with appropriate intervals
  - PostgreSQL: `pg_isready` command (interval: 10s, timeout: 5s, retries: 5)
  - Redis: `redis-cli ping` (interval: 5s, timeout: 3s, retries: 3)
  - HTTP services: `curl -f http://localhost:<port>/health` or equivalent
- **Dependency Ordering**:
  ```yaml
  depends_on:
    postgres:
      condition: service_healthy
    redis:
      condition: service_healthy
  ```
- **Restart Policy**: `restart: unless-stopped` for development (services restart after crashes but not on manual stop)
- **Resource Limits**: Optional `deploy.resources` for memory/CPU caps to prevent runaway containers

**Alternatives Considered**:
- v2 syntax: Lacks health check conditions, requires manual wait scripts
- v3.9+: Newer but less universally supported on older Docker installations
- Kubernetes-style orchestration: Overkill for local development

**References**:
- Docker Compose spec: https://docs.docker.com/compose/compose-file/compose-file-v3/
- Health check best practices: Docker official documentation

---

## 2. PostgreSQL Initialization

### Decision: Separate databases per service with Docker init scripts

**Rationale**:
- **Isolation**: Each service (Directus, Ghost, Listmonk) gets its own database, reducing coupling
- **Simplicity**: Standard PostgreSQL image supports `/docker-entrypoint-initdb.d/` for automatic initialization
- **No versioning tool**: For local dev, simple SQL init scripts suffice; production may use Flyway/Liquibase

**Implementation**:
- Mount directory: `./docker/postgres/init-scripts:/docker-entrypoint-initdb.d`
- Scripts execute alphabetically on first container start (when data volume is empty)
- Example scripts:
  - `01-create-databases.sql`: `CREATE DATABASE directus; CREATE DATABASE ghost; CREATE DATABASE listmonk;`
  - `02-create-users.sql`: Create service-specific users with appropriate permissions
  - `03-extensions.sql`: Install PostgreSQL extensions if needed (e.g., `pg_trgm` for full-text search)

**Volume Strategy**:
- **Named volume** (`postgres-data`) for persistence across restarts
- Bind mount for init scripts (developer can modify without rebuilding)
- Data survives `docker compose down` but removed with `docker compose down -v`

**User/Permission Management**:
- Superuser: `postgres` (for admin tasks via `psql`)
- Service users: `directus_user`, `ghost_user`, `listmonk_user` (limited to own database)
- Password via environment variables: `POSTGRES_PASSWORD`, `DIRECTUS_DB_PASSWORD`, etc.

**Alternatives Considered**:
- **Shared database with schemas**: More complex permission management, no additional isolation benefit
- **Flyway/Liquibase**: Overhead for local dev; better suited for production migrations
- **One PostgreSQL container per service**: Resource waste, unnecessary complexity

---

## 3. Service-Specific Configuration

### Directus (CMS)

**Image**: `directus/directus:10` (official)

**Environment Variables**:
```
KEY=<random-secret>                  # Admin token secret
SECRET=<random-secret>               # JWT secret
DB_CLIENT=postgres
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus_user
DB_PASSWORD=<from .env>
ADMIN_EMAIL=admin@localhost.dev
ADMIN_PASSWORD=<from .env>
PUBLIC_URL=http://localhost:8055
STORAGE_LOCATIONS=local              # Local file storage
```

**Volumes**:
- `directus-uploads:/directus/uploads` (user-uploaded media)
- `./docker/directus/extensions:/directus/extensions` (custom extensions)

**Health Check**: `curl -f http://localhost:8055/server/health || exit 1`

**Dependencies**: PostgreSQL, Redis

---

### Ghost (Blog)

**Image**: `ghost:5-alpine` (official, Alpine for smaller size)

**Environment Variables**:
```
database__client=postgres
database__connection__host=postgres
database__connection__user=ghost_user
database__connection__password=<from .env>
database__connection__database=ghost
url=http://localhost:2368
NODE_ENV=development
```

**Volumes**:
- `ghost-content:/var/lib/ghost/content` (posts, themes, images)

**Health Check**: `curl -f http://localhost:2368/ghost/api/v3/admin/site/ || exit 1`

**Dependencies**: PostgreSQL

---

### Astro (Frontend)

**Image**: Custom Dockerfile based on `node:18-alpine`

**Purpose**: Run Astro dev server with hot reload

**Dockerfile**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

**Environment Variables**:
```
PUBLIC_DIRECTUS_URL=http://directus:8055
PUBLIC_GHOST_URL=http://ghost:2368
```

**Volumes**:
- `./frontend:/app` (bind mount for hot reload)
- `/app/node_modules` (anonymous volume to prevent overwrite)

**Health Check**: `curl -f http://localhost:3000/ || exit 1`

**Dependencies**: Directus (for content API)

---

### Listmonk (Email)

**Image**: `listmonk/listmonk:latest` (official)

**Environment Variables**:
```
LISTMONK_app__address=0.0.0.0:9000
LISTMONK_db__host=postgres
LISTMONK_db__port=5432
LISTMONK_db__user=listmonk_user
LISTMONK_db__password=<from .env>
LISTMONK_db__database=listmonk
LISTMONK_db__ssl_mode=disable
```

**Init Command**: `./listmonk --install` (runs once to initialize schema)

**Health Check**: `curl -f http://localhost:9000/api/health || exit 1`

**Dependencies**: PostgreSQL

**SMTP Configuration**: For local testing, use MailHog or similar SMTP mock (optional separate service)

---

### Mixpost (Social Media)

**Image**: Custom or `ghcr.io/inovector/mixpost` (if available)

**Environment Variables**:
```
APP_URL=http://localhost:8080
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=mixpost
DB_USERNAME=mixpost_user
DB_PASSWORD=<from .env>
REDIS_HOST=redis
REDIS_PORT=6379
```

**Volumes**:
- Laravel storage for queued jobs, cache

**Health Check**: `curl -f http://localhost:8080/health || exit 1`

**Dependencies**: PostgreSQL, Redis

**Social Credentials**: Mock tokens for local testing (real credentials in production only)

---

## 4. Secrets Management

### Decision: `.env.example` template with `.env` excluded from Git

**Rationale**:
- Industry-standard practice for local development
- Developers copy template, fill in values, keep `.env` private
- Clear documentation of required variables without exposing secrets

**`.env.example` Structure**:
```bash
# PostgreSQL
POSTGRES_PASSWORD=devpassword123

# Directus
DIRECTUS_KEY=generate-with-openssl-rand-base64-32
DIRECTUS_SECRET=generate-with-openssl-rand-base64-32
DIRECTUS_ADMIN_EMAIL=admin@localhost.dev
DIRECTUS_ADMIN_PASSWORD=admin123
DIRECTUS_DB_PASSWORD=directuspass123

# Ghost
GHOST_DB_PASSWORD=ghostpass123

# Listmonk
LISTMONK_DB_PASSWORD=listmonkpass123

# Mixpost
MIXPOST_DB_PASSWORD=mixpostpass123
MIXPOST_APP_KEY=base64:generate-with-php-artisan-key-generate

# Optional: Seed data flag
ENABLE_SEED_DATA=false
```

**Documentation in `.env.example`**:
- Comment above each variable explaining purpose
- Example values (safe for local dev, obviously not production)
- Links to generation commands (e.g., `openssl rand -base64 32`)

**`.gitignore` Entry**:
```
.env
```

**Alternatives Considered**:
- **Hardcoded defaults in compose file**: Insecure, no flexibility
- **Docker secrets**: Overkill for local dev, intended for swarm mode
- **Vault/external secrets manager**: Too heavy for local development

---

## 5. Volume Management

### Decision: Named volumes for databases, bind mounts for code

**Rationale**:
- **Named volumes**: Better performance (especially on Windows/macOS), Docker-managed, easy to back up
- **Bind mounts**: Necessary for hot reload during development (Astro frontend, Directus extensions)

**Volume Strategy**:

| Service | Volume Type | Purpose | Persistence |
|---------|-------------|---------|-------------|
| PostgreSQL | Named (`postgres-data`) | Database files | Yes (unless `-v` flag) |
| Redis | Named (`redis-data`) | AOF/RDB files | Yes (unless `-v` flag) |
| Directus | Named (`directus-uploads`) | Media uploads | Yes |
| Ghost | Named (`ghost-content`) | Blog content | Yes |
| Astro | Bind mount (`./frontend:/app`) | Hot reload | Local filesystem |
| Listmonk | Database-only | No persistent volume | N/A |
| Mixpost | Database-only | No persistent volume | N/A |

**Performance Considerations**:
- **Windows**: WSL2 backend significantly faster than Hyper-V for bind mounts
- **macOS**: VirtioFS in Docker Desktop 4.6+ improves bind mount performance
- **Linux**: Native performance, no virtualization overhead

**Backup/Restore**:
- Export named volume: `docker run --rm -v postgres-data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data`
- Restore: `docker run --rm -v postgres-data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /`

**Alternatives Considered**:
- **All bind mounts**: Poor performance on Windows/macOS, file permission issues
- **All named volumes**: Can't hot reload code during development

---

## 6. Cross-Platform Compatibility

### Decision: Dual script support (Bash + PowerShell)

**Rationale**:
- Windows developers use PowerShell, Unix developers use Bash
- Docker Compose itself is cross-platform (YAML syntax identical)
- Scripts provide convenience wrappers but aren't strictly necessary

**Script Pairs**:

| Task | Bash Script | PowerShell Script |
|------|-------------|-------------------|
| Start | `scripts/dev-start.sh` | `scripts/dev-start.ps1` |
| Stop | `scripts/dev-stop.sh` | `scripts/dev-stop.ps1` |
| Clean | `scripts/dev-clean.sh` | `scripts/dev-clean.ps1` |
| Seed | `scripts/dev-seed.sh` | `scripts/dev-seed.ps1` |
| Logs | `scripts/dev-logs.sh` | `scripts/dev-logs.ps1` |

**Common Issues & Solutions**:

| Issue | Solution |
|-------|----------|
| Line endings (CRLF vs LF) | `.gitattributes`: `*.sh text eol=lf` |
| Path separators | Use forward slashes in Docker contexts (Docker normalizes) |
| WSL2 file access | Store project in Linux filesystem (`~/projects/`) not Windows (`/mnt/c/`) for performance |
| Docker Desktop not running | Scripts check `docker info` before proceeding, exit with friendly error |

**Documentation**:
- `quickstart.md` includes platform-specific setup steps
- README.md has OS-specific prerequisites (Docker Desktop version, WSL2 setup for Windows)

**Alternatives Considered**:
- **Bash-only with Git Bash on Windows**: Extra dependency, less natural for Windows devs
- **Make-based approach**: Not native on Windows without WSL/Cygwin
- **Node.js scripts**: Adds runtime dependency just for orchestration

---

## Conclusion

All research questions resolved. Decisions prioritize:
1. **Developer experience**: Single command to start/stop, clear error messages
2. **Cross-platform support**: Works on Windows, macOS, Linux without modification
3. **Production similarity**: Mirrors production architecture for realistic testing
4. **Simplicity**: No unnecessary abstractions or tooling overhead

Next phase: Translate these decisions into concrete Docker Compose configuration and scripts (Phase 1 deliverables).
