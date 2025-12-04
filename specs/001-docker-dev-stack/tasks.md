# Tasks: Docker Local Development Stack

**Input**: Design documents from `/specs/001-docker-dev-stack/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested - focusing on integration validation through acceptance scenarios

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

This is an infrastructure project at repository root:
- `docker-compose.yml` - Main orchestration
- `docker/` - Service-specific configurations
- `scripts/` - Helper scripts (Bash + PowerShell)
- `.env.example` - Environment template

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create directory structure per plan.md at repository root
- [x] T002 [P] Create .gitignore excluding .env, volumes/, and Docker artifacts
- [x] T003 [P] Create README.md with local development overview

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Docker infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create docker-compose.yml at repository root with version 3.8, networks, and volumes definitions
- [x] T005 [P] Create .env.example at repository root with all required environment variables
- [x] T006 [P] Create docker/postgres/Dockerfile for PostgreSQL 15 with Alpine base
- [x] T007 [P] Create docker/postgres/init-scripts/01-create-databases.sql for database initialization
- [x] T008 [P] Create docker/redis/redis.conf with persistence and memory settings
- [x] T009 [P] Create docker/directus/Dockerfile based on directus/directus:10
- [x] T010 [P] Create docker/ghost/config.json template for Ghost configuration
- [x] T011 [P] Create docker/astro/Dockerfile based on node:18-alpine
- [x] T012 [P] Create docker/listmonk/config.toml template for Listmonk configuration
- [x] T013 [P] Create docker/mixpost/Dockerfile based on Laravel/PHP image

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Start Full Development Environment (Priority: P1)

**Goal**: Developers can start all 7 services (PostgreSQL, Redis, Directus, Ghost, Astro, Listmonk, Mixpost) with a single command and verify they're running

**Independent Test**: Run start command, verify all services show "Up (healthy)" in docker compose ps, access each service URL

### Implementation for User Story 1

- [x] T014 [US1] Add PostgreSQL service to docker-compose.yml with health check, ports (5432), and volume (postgres-data)
- [x] T015 [US1] Add Redis service to docker-compose.yml with health check, ports (6379), and volume (redis-data)
- [x] T016 [US1] Add Directus service to docker-compose.yml with health check, ports (8055), environment variables, and dependencies on postgres/redis
- [x] T017 [US1] Add Ghost service to docker-compose.yml with health check, ports (2368), environment variables, and dependencies on postgres
- [x] T018 [US1] Add Astro service to docker-compose.yml with health check, ports (3000), bind mounts, and dependencies on directus/ghost
- [x] T019 [US1] Add Listmonk service to docker-compose.yml with health check, ports (9000), environment variables, and dependencies on postgres
- [x] T020 [US1] Add Mixpost service to docker-compose.yml with health check, ports (8080), environment variables, and dependencies on postgres/redis
- [x] T021 [US1] Create scripts/dev-start.sh that validates Docker is running, checks .env exists, and runs docker compose up -d
- [x] T022 [P] [US1] Create scripts/dev-start.ps1 (PowerShell version) with same logic as dev-start.sh
- [x] T023 [US1] Add network configuration (wvwo-dev bridge network) to docker-compose.yml
- [x] T024 [US1] Add volume definitions (postgres-data, redis-data, directus-uploads, ghost-content) to docker-compose.yml
- [x] T025 [US1] Update .env.example with generation instructions for secrets (openssl commands)

**Checkpoint**: User Story 1 complete - developer can start full stack with single command, all services accessible

---

## Phase 4: User Story 2 - Stop and Clean Environment (Priority: P1)

**Goal**: Developers can stop all services gracefully and optionally remove all data for a clean restart

**Independent Test**: Stop services, verify containers stopped and ports released; run clean command, verify volumes removed

### Implementation for User Story 2

- [x] T026 [P] [US2] Create scripts/dev-stop.sh that runs docker compose down and confirms containers stopped
- [x] T027 [P] [US2] Create scripts/dev-stop.ps1 (PowerShell version) with same logic as dev-stop.sh
- [x] T028 [P] [US2] Create scripts/dev-clean.sh that prompts for confirmation, then runs docker compose down -v --remove-orphans
- [x] T029 [P] [US2] Create scripts/dev-clean.ps1 (PowerShell version) with confirmation prompt and cleanup logic
- [x] T030 [US2] Add graceful shutdown timeout (30s) to docker-compose.yml service stop_grace_period settings
- [x] T031 [US2] Add restart policy (unless-stopped) to all services in docker-compose.yml

**Checkpoint**: User Story 2 complete - developer can stop and clean environment, freeing all resources

---

## Phase 5: User Story 3 - Manage Individual Services (Priority: P2)

**Goal**: Developers can start, stop, or restart individual services without affecting others

**Independent Test**: Stop one service while others run, restart service with rebuild flag, verify independent operation

### Implementation for User Story 3

- [x] T032 [P] [US3] Create scripts/dev-restart.sh that accepts service name and runs docker compose restart <service>
- [x] T033 [P] [US3] Create scripts/dev-restart.ps1 (PowerShell version) with service name parameter
- [x] T034 [P] [US3] Create scripts/dev-rebuild.sh that accepts service name and runs docker compose up -d --build <service>
- [x] T035 [P] [US3] Create scripts/dev-rebuild.ps1 (PowerShell version) with rebuild logic
- [x] T036 [US3] Add usage documentation to script headers showing single-service commands
- [x] T037 [US3] Test individual service restart scenarios (database only, frontend only, etc.)

**Checkpoint**: User Story 3 complete - developer can manage individual services independently

---

## Phase 6: User Story 4 - View Service Status and Logs (Priority: P2)

**Goal**: Developers can view service status (running/stopped) and stream logs for debugging

**Independent Test**: Request status shows all services with ports; view logs for specific service streams output

### Implementation for User Story 4

- [x] T038 [P] [US4] Create scripts/dev-status.sh that runs docker compose ps and formats output with service names, status, and ports
- [x] T039 [P] [US4] Create scripts/dev-status.ps1 (PowerShell version) with formatted status display
- [x] T040 [P] [US4] Create scripts/dev-logs.sh that accepts optional service name and runs docker compose logs -f [service]
- [x] T041 [P] [US4] Create scripts/dev-logs.ps1 (PowerShell version) with service parameter
- [x] T042 [US4] Add log formatting examples to script usage (tail, grep, since time)
- [x] T043 [US4] Document common log patterns in quickstart.md troubleshooting section

**Checkpoint**: User Story 4 complete - developer can monitor service health and debug with logs

---

## Phase 7: User Story 5 - Persist Data Between Restarts (Priority: P2)

**Goal**: Database and cache data persists across normal stop/start cycles, with option to clear on demand

**Independent Test**: Create data in Directus, stop/restart, verify data intact; run clean command, verify fresh state

### Implementation for User Story 5

- [x] T044 [US5] Verify named volume persistence in docker-compose.yml (postgres-data, redis-data mapped correctly)
- [x] T045 [US5] Configure Redis persistence (AOF or RDB) in docker/redis/redis.conf
- [x] T046 [US5] Add volume mount for Directus uploads (directus-uploads) in docker-compose.yml
- [x] T047 [US5] Add volume mount for Ghost content (ghost-content) in docker-compose.yml
- [x] T048 [P] [US5] Create scripts/dev-backup.sh to export volumes to tar.gz files
- [x] T049 [P] [US5] Create scripts/dev-backup.ps1 (PowerShell version) with volume backup logic
- [x] T050 [P] [US5] Create scripts/dev-restore.sh to restore volumes from tar.gz files
- [x] T051 [P] [US5] Create scripts/dev-restore.ps1 (PowerShell version) with volume restore logic
- [x] T052 [US5] Test persistence: create data, stop/start, verify survival; run clean, verify removal

**Checkpoint**: User Story 5 complete - developer data persists across restarts with backup/restore capability

---

## Phase 8: Seed Data & Optional Features

**Goal**: Provide optional seed data script for loading test data

- [ ] T053 [P] Create docker/postgres/seed-data/01-directus-products.sql with sample WV Wild products
- [ ] T054 [P] Create docker/postgres/seed-data/02-ghost-posts.sql with sample blog posts
- [ ] T055 [P] Create scripts/dev-seed.sh that checks services are running, then loads seed SQL files
- [ ] T056 [P] Create scripts/dev-seed.ps1 (PowerShell version) with seed data loading
- [ ] T057 Create seed data documentation in quickstart.md explaining how to load test data

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, validation, and improvements affecting multiple user stories

- [ ] T058 [P] Update README.md with quick start instructions referencing quickstart.md
- [ ] T059 [P] Add troubleshooting section to quickstart.md covering common Docker issues
- [ ] T060 [P] Document platform-specific setup (WSL2 for Windows, VirtioFS for macOS) in quickstart.md
- [ ] T061 [P] Create .gitattributes to enforce LF line endings for .sh files
- [ ] T062 [P] Add health check validation to dev-start scripts (wait for all services healthy)
- [ ] T063 [P] Document port conflict resolution in quickstart.md troubleshooting
- [ ] T064 [P] Add resource requirement checks to dev-start scripts (Docker memory/disk)
- [ ] T065 Validate quickstart.md steps on Windows, macOS, and Linux
- [ ] T066 Create architecture diagram showing service dependencies for README.md
- [ ] T067 Document .env.example variable generation process with concrete commands

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order: US1 → US2 → US3 → US4 → US5
- **Seed Data (Phase 8)**: Depends on US1 completion (services must be runnable)
- **Polish (Phase 9)**: Can start after P1 completion (US1 + US2), complete after all user stories

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (stop/clean independent of start)
- **User Story 3 (P2)**: Depends on US1 (must have running services to manage individually)
- **User Story 4 (P2)**: Depends on US1 (must have running services to view logs/status)
- **User Story 5 (P2)**: Depends on US1 (must have running services to test persistence)

### Within Each User Story

- **US1**: docker-compose service definitions → scripts (dev-start.sh/ps1)
- **US2**: scripts (dev-stop.sh/ps1, dev-clean.sh/ps1) can be parallel
- **US3**: scripts (dev-restart.sh/ps1, dev-rebuild.sh/ps1) can be parallel
- **US4**: scripts (dev-status.sh/ps1, dev-logs.sh/ps1) can be parallel
- **US5**: volume configuration → persistence testing → backup/restore scripts (parallel)

### Parallel Opportunities

- **Setup tasks (T001-T003)**: All can run in parallel
- **Foundational tasks (T005-T013)**: All service-specific Dockerfiles/configs can run in parallel
- **Within US1 (T014-T020)**: All service additions to docker-compose.yml can run in parallel
- **US1 scripts (T021-T022)**: Bash and PowerShell versions can run in parallel
- **US2 scripts (T026-T029)**: All 4 scripts can run in parallel
- **US3 scripts (T032-T035)**: All 4 scripts can run in parallel
- **US4 scripts (T038-T041)**: All 4 scripts can run in parallel
- **US5 backup/restore (T048-T051)**: All 4 scripts can run in parallel
- **Seed data (T053-T056)**: SQL files and scripts can run in parallel
- **Polish tasks (T058-T064, T066-T067)**: Most documentation tasks can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all service-specific Dockerfiles in parallel (Foundational):
Task T006: "Create docker/postgres/Dockerfile"
Task T009: "Create docker/directus/Dockerfile"
Task T011: "Create docker/astro/Dockerfile"
Task T013: "Create docker/mixpost/Dockerfile"

# Launch docker-compose service definitions in parallel (US1):
Task T014: "Add PostgreSQL service to docker-compose.yml"
Task T015: "Add Redis service to docker-compose.yml"
Task T016: "Add Directus service to docker-compose.yml"
Task T017: "Add Ghost service to docker-compose.yml"
Task T018: "Add Astro service to docker-compose.yml"
Task T019: "Add Listmonk service to docker-compose.yml"
Task T020: "Add Mixpost service to docker-compose.yml"

# Launch Bash + PowerShell script creation in parallel (US1):
Task T021: "Create scripts/dev-start.sh"
Task T022: "Create scripts/dev-start.ps1"
```

---

## Parallel Example: User Story 2

```bash
# Launch all stop/clean scripts in parallel (US2):
Task T026: "Create scripts/dev-stop.sh"
Task T027: "Create scripts/dev-stop.ps1"
Task T028: "Create scripts/dev-clean.sh"
Task T029: "Create scripts/dev-clean.ps1"
```

---

## Implementation Strategy

### P1 Foundation First (User Stories 1 + 2)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T013) - CRITICAL
3. Complete Phase 3: User Story 1 (T014-T025) - Start services
4. Complete Phase 4: User Story 2 (T026-T031) - Stop/clean services
5. Test full start/stop cycle on Windows, macOS, Linux
6. P1 foundation complete and ready for use

### Incremental Delivery

1. **P1 Complete** (US1 + US2): Developers can start/stop full stack
2. **US3 Complete**: Individual service management capability
3. **US4 Complete**: Monitoring and debugging with logs/status
4. **US5 Complete**: Data persistence and backup/restore
5. **Phase 8 Complete**: Optional seed data for testing
6. **Phase 9 Complete**: Comprehensive documentation and polish

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With multiple developers:

**Option 1: Sequential (safest)**
1. All: Complete Setup + Foundational together (T001-T013)
2. Developer A: Complete US1 (T014-T025)
3. Developer B: Complete US2 (T026-T031) - can start after US1
4. Developer C: Complete US3 (T032-T037) - starts after US1 complete
5. Developer A: Complete US4 (T038-T043) - starts after US1 complete
6. Developer B: Complete US5 (T044-T052) - starts after US1 complete

**Option 2: Maximum Parallelism**
1. All: Complete Setup + Foundational together (T001-T013)
2. After Foundational:
   - Team focuses on US1 (blocking for US3-US5)
3. After US1 complete:
   - Developer A: US2 (independent)
   - Developer B: US3 (depends on US1)
   - Developer C: US4 (depends on US1)
   - Developer D: US5 (depends on US1)

---

## Task Count Summary

- **Phase 1 (Setup)**: 3 tasks
- **Phase 2 (Foundational)**: 10 tasks (BLOCKS all user stories)
- **Phase 3 (US1 - P1)**: 12 tasks
- **Phase 4 (US2 - P1)**: 6 tasks
- **Phase 5 (US3 - P2)**: 6 tasks
- **Phase 6 (US4 - P2)**: 6 tasks
- **Phase 7 (US5 - P2)**: 9 tasks
- **Phase 8 (Seed Data)**: 5 tasks
- **Phase 9 (Polish)**: 10 tasks

**Total**: 67 tasks

**P1 Scope (Core Foundation)** (US1 + US2): 31 tasks (Setup + Foundational + US1 + US2)

**Parallel Opportunities**:
- Setup: 2 parallel tasks
- Foundational: 8 parallel tasks
- US1: 9 parallel tasks (service definitions + scripts)
- US2: 4 parallel tasks (all scripts)
- US3: 4 parallel tasks (all scripts)
- US4: 4 parallel tasks (all scripts)
- US5: 6 parallel tasks (backup/restore scripts)
- Seed Data: 4 parallel tasks
- Polish: 9 parallel tasks

**Total Parallelizable**: 50 tasks (75% of all tasks can run in parallel within their phase)

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- P1 = US1 (start) + US2 (stop/clean) - foundation for all development
- Test cross-platform compatibility at P1 checkpoint before proceeding
- Avoid: modifying same file in parallel, creating inter-story dependencies that break independence
