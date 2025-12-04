# Implementation Plan: Docker Local Development Stack

**Branch**: `001-docker-dev-stack` | **Date**: 2024-12-04 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-docker-dev-stack/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a Docker-based local development environment orchestrating all WV Wild Outdoors services (Directus CMS, Ghost Blog, Astro Frontend, Listmonk Email, Mixpost Social) alongside PostgreSQL 15 and Redis. Developers start the complete stack with a single command, supporting individual service management, data persistence, health monitoring, and clean teardown. Environment configuration uses `.env` template files, database initializes with empty schema, and optional seed scripts provide test data.

## Technical Context

**Language/Version**: YAML (Docker Compose v3.8+), Shell scripting (Bash/PowerShell for helpers)
**Primary Dependencies**: Docker Engine 24+, Docker Compose v2.20+
**Storage**: Named Docker volumes for PostgreSQL and Redis persistence
**Testing**: Container health checks, integration tests for service connectivity
**Target Platform**: Cross-platform (Windows, macOS, Linux with Docker Desktop/Engine)
**Project Type**: Infrastructure/DevOps - container orchestration configuration
**Performance Goals**: Cold start <3 minutes (excluding image pulls), individual service restart <30 seconds
**Constraints**: Minimum 4GB RAM available, 10GB disk space, port availability on host
**Size/Scope**: 7 services (PostgreSQL, Redis, Directus, Ghost, Astro, Listmonk, Mixpost), 3 named volumes, 1 network

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| **I. Owner-First Simplicity** | ✅ PASS | Kim never interacts with local dev stack - this is Matt's domain per Principle IV. All Kim-facing admin remains in production Directus/Ghost. |
| **II. Heart of West Virginia** | ✅ PASS | Infrastructure layer - content neutrality preserved. Seed data (when created) will reflect authentic WV Wild products/content. |
| **III. Modular Service Architecture** | ✅ PASS | Directly implements the 5-service architecture (Directus, Ghost, Astro, Listmonk, Mixpost) with independent containers and explicit network boundaries. |
| **IV. Developer-Managed Infrastructure** | ✅ PASS | This entire feature is Matt's responsibility. Clear separation: Matt manages Docker stack, Kim uses production admin panels. |
| **V. Dual-Experience Design** | ✅ PASS | Development environment mirrors production architecture. Testing both desktop (Matt's workflow) and mobile (Kim's interfaces) becomes possible locally. |
| **VI. Anti-MVP Bias** | ✅ PASS | **Internal Shipping**: (1) Works correctly ✓ (Docker stack functional), (2) Kim can use from phone N/A (Matt-only feature), (3) Data persists ✓ (named volumes), (4) User-friendly errors ✓ (clear script output), (5) Would-Kim-use-this N/A (infrastructure layer). **External Shipping**: Infrastructure foundation enables external shipping criteria - production stack in `infra/docker/` will enforce all 13 checklist items. |

**Violations**: None

## Project Structure

### Documentation (this feature)

```text
specs/001-docker-dev-stack/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (minimal - primarily service topology)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (service port mappings, volume mounts)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Infrastructure configuration at repository root
docker-compose.yml          # Main orchestration file
.env.example               # Template for developer configuration
docker/                    # Service-specific configurations
├── postgres/
│   ├── Dockerfile         # PostgreSQL 15 with extensions
│   └── init-scripts/      # Schema initialization
├── redis/
│   └── redis.conf         # Redis configuration
├── directus/
│   ├── Dockerfile         # Directus with customizations
│   └── extensions/        # Custom Directus extensions
├── ghost/
│   └── config.json        # Ghost configuration template
├── astro/
│   └── Dockerfile         # Astro development container
├── listmonk/
│   └── config.toml        # Listmonk configuration template
└── mixpost/
    └── Dockerfile         # Mixpost service container

scripts/                   # Development workflow scripts
├── dev-start.sh           # Start all services
├── dev-stop.sh            # Stop all services
├── dev-clean.sh           # Remove all containers/volumes
├── dev-seed.sh            # Load optional test data
└── dev-logs.sh            # View service logs

.gitignore                 # Exclude .env, volumes/
README.md                  # Updated with local development instructions
```

**Structure Decision**: Repository root structure chosen because this is infrastructure configuration for the entire project. Docker Compose files and service configurations sit at the top level for easy discovery. Service-specific Dockerfiles and configs live under `docker/[service-name]/` to maintain organization while keeping orchestration (`docker-compose.yml`) at the root for standard Docker practices.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All principles align with feature requirements.

## Phase 0: Outline & Research

See [research.md](./research.md) for detailed research findings.

### Research Tasks

1. **Docker Compose Configuration Patterns**
   - Best practices for multi-service orchestration
   - Health check strategies for each service type
   - Dependency ordering (depends_on with condition)
   - Network isolation vs. shared networking

2. **PostgreSQL Initialization**
   - Docker volume mount strategies for init scripts
   - Schema versioning approaches (Flyway, Liquibase, or native)
   - Multi-database setup (separate DBs per service vs. shared with schemas)
   - User/permission management for local development

3. **Service-Specific Configuration**
   - **Directus**: Database connection, file storage, admin user setup
   - **Ghost**: Database connection, content path, mail config
   - **Astro**: Build mode (dev server vs. static preview)
   - **Listmonk**: Database schema, SMTP configuration for local testing
   - **Mixpost**: Social platform credentials (mock vs. real), database setup

4. **Secrets Management**
   - `.env` file structure for Docker Compose variable substitution
   - Secure defaults for local development (non-production credentials)
   - `.env.example` documentation standards

5. **Volume Management**
   - Named volumes vs. bind mounts for persistence
   - Performance considerations on different host OSes (especially Windows)
   - Backup/restore strategies for development data

6. **Cross-Platform Compatibility**
   - Path separators (Windows vs. Unix)
   - Line ending issues (CRLF vs. LF in scripts)
   - Docker Desktop quirks (WSL2 on Windows, Hyperkit on macOS)
   - PowerShell vs. Bash script equivalents

## Phase 1: Design & Contracts

See detailed design artifacts:
- [data-model.md](./data-model.md) - Service topology and data flow
- [contracts/](./contracts/) - Port mappings, API endpoints, volume contracts
- [quickstart.md](./quickstart.md) - Developer onboarding guide

### Design Decisions

1. **Service Dependencies**:
   - PostgreSQL and Redis start first (no dependencies)
   - Application services depend on database readiness (health checks)
   - Astro depends on Directus API availability for content fetching

2. **Port Mapping Strategy**:
   - PostgreSQL: 5432 (standard)
   - Redis: 6379 (standard)
   - Directus: 8055 (CMS admin + API)
   - Ghost: 2368 (blog admin + content)
   - Astro: 3000 (dev server)
   - Listmonk: 9000 (email management)
   - Mixpost: 8080 (social scheduling)

3. **Network Architecture**:
   - Single custom bridge network (`wvwo-dev`)
   - Services reference each other by container name (DNS resolution)
   - Host access via published ports only

4. **Volume Strategy**:
   - `postgres-data`: PostgreSQL database files
   - `redis-data`: Redis persistence (AOF or RDB)
   - `directus-uploads`: User-uploaded media
   - `ghost-content`: Blog posts, themes, images
   - Astro: No persistence (regenerates from source)
   - Listmonk: Database-backed (no additional volume)
   - Mixpost: Database-backed (no additional volume)

5. **Environment Variables**:
   - Database credentials: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
   - Service URLs: `DIRECTUS_URL`, `GHOST_URL`, etc.
   - Feature flags: `ENABLE_SEED_DATA`, `LOG_LEVEL`

6. **Development Workflow Scripts**:
   - `dev-start.sh` / `dev-start.ps1`: `docker compose up -d`
   - `dev-stop.sh` / `dev-stop.ps1`: `docker compose down`
   - `dev-clean.sh` / `dev-clean.ps1`: `docker compose down -v` (removes volumes)
   - `dev-seed.sh` / `dev-seed.ps1`: Runs SQL/scripts to populate test data
   - `dev-logs.sh` / `dev-logs.ps1`: `docker compose logs -f [service]`

### API/Integration Contracts

See [contracts/service-interfaces.md](./contracts/service-interfaces.md) for detailed interface specifications.

**Inter-Service Communication**:
- Astro → Directus: HTTP REST API (port 8055, `/items/products`, `/items/categories`)
- Astro → Ghost: Content API (port 2368, `/ghost/api/v3/content/`)
- Directus → PostgreSQL: Direct connection (internal network, port 5432)
- Ghost → PostgreSQL: Direct connection (separate database or schema)
- Listmonk → PostgreSQL: Direct connection (separate database)
- All services → Redis: Cache/session storage (port 6379)

**Host Access Points**:
- Developers access all services via `localhost:<port>`
- No external ingress (Traefik) in local mode
- API testing via direct HTTP to service ports

## Next Steps

1. Run `/speckit.tasks` to generate actionable implementation tasks
2. Begin implementation starting with P1 tasks (core orchestration)
3. Test on multiple platforms (Windows, macOS, Linux)
4. Document any platform-specific gotchas in quickstart.md
