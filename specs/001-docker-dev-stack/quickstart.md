# Quickstart Guide: Docker Local Development Stack

**Feature**: 001-docker-dev-stack | **Date**: 2024-12-04
**Audience**: Developers setting up WV Wild Outdoors local environment for the first time

## Overview

This guide walks you through setting up a complete local development environment for the WV Wild Outdoors platform. You'll have all 5 services (Directus, Ghost, Astro, Listmonk, Mixpost) plus PostgreSQL and Redis running locally with a single command.

**Expected Time**: 15 minutes (first-time setup)

---

## Prerequisites

Before you begin, ensure you have:

### Required Software

| Tool | Minimum Version | Installation Check |
|------|----------------|-------------------|
| **Docker Engine** | 24.0+ | `docker --version` |
| **Docker Compose** | v2.20+ | `docker compose version` |
| **Git** | 2.30+ | `git --version` |

### Platform-Specific Setup

#### Windows

1. **Install Docker Desktop**:
   - Download from https://www.docker.com/products/docker-desktop/
   - Minimum requirements: Windows 10 64-bit (Pro, Enterprise, or Education) with Hyper-V and WSL 2
   - Enable WSL 2 backend in Docker Desktop settings

2. **Configure WSL 2**:
   ```powershell
   # In PowerShell (Admin):
   wsl --install
   wsl --set-default-version 2
   ```

3. **Clone repo in WSL filesystem** (important for performance):
   ```bash
   # Inside WSL terminal:
   cd ~/projects
   git clone <repo-url>
   ```

4. **Resource Allocation**:
   - Docker Desktop → Settings → Resources
   - Recommended: 4 GB RAM, 2 CPUs minimum
   - Increase if you have resources available

#### macOS

1. **Install Docker Desktop**:
   - Download from https://www.docker.com/products/docker-desktop/
   - Minimum requirements: macOS 11+ (Big Sur or newer)
   - For Apple Silicon (M1/M2): Rosetta 2 may be needed for some images

2. **Resource Allocation**:
   - Docker Desktop → Preferences → Resources
   - Recommended: 4 GB RAM, 2 CPUs minimum

3. **Enable VirtioFS** (for better performance):
   - Docker Desktop → Preferences → Experimental Features
   - Enable "VirtioFS accelerated directory sharing"

#### Linux

1. **Install Docker Engine**:
   ```bash
   # Ubuntu/Debian:
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   # Log out and back in for group changes
   ```

2. **Install Docker Compose Plugin**:
   ```bash
   sudo apt-get install docker-compose-plugin
   ```

3. **Verify Installation**:
   ```bash
   docker compose version  # Should show v2.20 or higher
   ```

### System Resources

Minimum hardware requirements:

- **RAM**: 4 GB available (8 GB total recommended)
- **Disk**: 10 GB free space (20 GB recommended)
- **CPU**: 2 cores minimum (4 cores recommended)

---

## Step 1: Clone Repository

```bash
# Navigate to your projects directory
cd ~/projects  # or your preferred location

# Clone the repository
git clone <repo-url> wvwo-storefront
cd wvwo-storefront

# Checkout the Docker stack branch (if not merged to main)
git checkout 001-docker-dev-stack
```

---

## Step 2: Configure Environment

### Create `.env` File

```bash
# Copy the example environment file
cp .env.example .env

# Open in your editor
# Windows: notepad .env
# macOS: open -e .env
# Linux: nano .env  (or vim, emacs, etc.)
```

### Fill Required Values

Replace the placeholder values in `.env`:

```bash
# =============================================================================
# REQUIRED: Update these values
# =============================================================================

# PostgreSQL (use a strong password)
POSTGRES_PASSWORD=yourStrongPasswordHere123

# Directus - Generate random keys:
# Run: openssl rand -base64 32
DIRECTUS_KEY=<paste-generated-key-here>
DIRECTUS_SECRET=<paste-another-generated-key-here>

# Directus Admin User
DIRECTUS_ADMIN_EMAIL=matt@wvwildoutdoors.com  # Change to your email
DIRECTUS_ADMIN_PASSWORD=ChangeMe123!            # Change this!

# Database Passwords (use different passwords for each)
DIRECTUS_DB_PASSWORD=directusSecretPass789
GHOST_DB_PASSWORD=ghostSecretPass456
LISTMONK_DB_PASSWORD=listmonkSecretPass321
MIXPOST_DB_PASSWORD=mixpostSecretPass654

# Mixpost - Laravel App Key
# If you have PHP installed: php artisan key:generate
# Otherwise, use: base64:<any-32-char-base64-string>
MIXPOST_APP_KEY=base64:YourBase64EncodedKeyHere

# Social Credentials (mock for local dev)
FACEBOOK_APP_ID=local-dev-mock
FACEBOOK_APP_SECRET=local-dev-mock
```

**Security Tips**:
- Use unique passwords for each service
- Never commit `.env` to version control (already in `.gitignore`)
- Store production credentials separately (this is for local dev only)

### Generate Secrets (Quick Commands)

```bash
# Generate Directus KEY and SECRET
openssl rand -base64 32  # Copy output to DIRECTUS_KEY
openssl rand -base64 32  # Copy output to DIRECTUS_SECRET

# If you don't have openssl, use this alternative:
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# For MIXPOST_APP_KEY, prefix with "base64:"
echo "base64:$(openssl rand -base64 32)"
```

---

## Step 3: Start the Stack

### First-Time Startup

```bash
# Pull images and start services (this takes 5-10 minutes on first run)
docker compose up -d

# Watch logs to see services starting
docker compose logs -f
# Press Ctrl+C to stop watching (services keep running)
```

**What's Happening**:
1. Docker pulls images (postgres:15-alpine, redis:7-alpine, directus/directus:10, etc.)
2. Creates custom network (`wvwo-dev`)
3. Creates named volumes for data persistence
4. Starts services in dependency order:
   - PostgreSQL and Redis first
   - Application services wait for database health checks
5. Initializes databases on first run (runs `/docker-entrypoint-initdb.d/` scripts)

### Verify Services Are Healthy

```bash
# Check service status
docker compose ps

# Expected output (all "Up (healthy)"):
# NAME                STATUS
# wvwo-postgres-dev   Up (healthy)
# wvwo-redis-dev      Up (healthy)
# wvwo-directus-dev   Up (healthy)
# wvwo-ghost-dev      Up (healthy)
# wvwo-astro-dev      Up (healthy)
# wvwo-listmonk-dev   Up (healthy)
# wvwo-mixpost-dev    Up (healthy)
```

**Troubleshooting** (if services show "unhealthy" or "restarting"):
```bash
# View logs for problematic service
docker compose logs <service-name>

# Example: Check Directus logs
docker compose logs directus

# Common issues:
# - "Connection refused": Service can't reach database (check health checks)
# - "Authentication failed": Check .env passwords match
# - "Port already in use": Another process using the port (stop it or change port in docker-compose.yml)
```

---

## Step 4: Access Services

Once all services show "Up (healthy)", access them in your browser:

| Service | URL | Credentials | Purpose |
|---------|-----|-------------|---------|
| **Directus** | http://localhost:8055/admin | Email/Password from `.env` | CMS admin panel |
| **Ghost** | http://localhost:2368/ghost/ | Setup on first visit | Blog editor |
| **Astro** | http://localhost:3000/ | None (public site) | Frontend preview |
| **Listmonk** | http://localhost:9000/admin | Setup on first visit | Email management |
| **Mixpost** | http://localhost:8080/ | Setup on first visit | Social scheduling |
| **PostgreSQL** | localhost:5432 | `postgres` / `.env password` | Database (via client) |
| **Redis** | localhost:6379 | None | Cache (via client) |

### Initial Setup for Each Service

#### Directus (CMS)

1. Navigate to http://localhost:8055/admin
2. Log in with credentials from `.env`:
   - Email: `DIRECTUS_ADMIN_EMAIL`
   - Password: `DIRECTUS_ADMIN_PASSWORD`
3. You'll see an empty CMS - collections will be created when you implement features

#### Ghost (Blog)

1. Navigate to http://localhost:2368/ghost/
2. Complete setup wizard:
   - Site title: "WV Wild Outdoors Blog"
   - Your name: Matt (or your name)
   - Email: Your email
   - Password: Choose a strong password
3. Skip newsletter integration for now (local dev)

#### Listmonk (Email)

1. Navigate to http://localhost:9000/admin
2. Complete first-time setup:
   - Admin email: Your email
   - Password: Choose a strong password
3. Configure SMTP (optional for local testing):
   - Skip or use MailHog if you add it to the stack

#### Mixpost (Social)

1. Navigate to http://localhost:8080/
2. Follow on-screen prompts to create admin account
3. Skip social platform connections (use mock credentials for local dev)

---

## Step 5: Test Integration

### Verify Database Connectivity

```bash
# Connect to PostgreSQL
docker exec -it wvwo-postgres-dev psql -U postgres

# Inside psql:
\l                      # List databases (should see: directus, ghost, listmonk, mixpost)
\c directus             # Connect to directus database
\dt                     # List tables (should see Directus schema)
\q                      # Quit

# Connect to Redis
docker exec -it wvwo-redis-dev redis-cli

# Inside redis-cli:
PING                    # Should return "PONG"
KEYS *                  # List all keys (may be empty on first run)
exit
```

### Test Astro → Directus Integration

```bash
# View Astro logs (should show API requests to Directus)
docker compose logs astro

# You should see:
# "Fetching products from http://directus:8055/items/products"

# If errors appear:
# - Check Directus is healthy: docker compose ps directus
# - Verify PUBLIC_DIRECTUS_URL in docker-compose.yml matches internal URL
```

---

## Daily Workflow

### Starting Work

```bash
# Start all services (if stopped)
docker compose up -d

# Or use helper script (once implemented):
./scripts/dev-start.sh      # Unix/macOS/Linux
./scripts/dev-start.ps1     # Windows PowerShell
```

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f directus

# Last 50 lines
docker compose logs --tail=50 astro

# Since specific time
docker compose logs --since 10m ghost
```

### Stopping Work

```bash
# Stop all services (data persists)
docker compose down

# Or use helper script:
./scripts/dev-stop.sh       # Unix/macOS/Linux
./scripts/dev-stop.ps1      # Windows PowerShell
```

**Note**: `docker compose down` stops containers but keeps volumes. Your data (database, uploads, content) remains intact for next startup.

### Restarting a Single Service

```bash
# Restart just one service (e.g., after code change)
docker compose restart astro

# Rebuild and restart (e.g., after Dockerfile change)
docker compose up -d --build astro
```

---

## Advanced Operations

### Loading Seed Data

```bash
# Load test data (products, blog posts, subscribers)
./scripts/dev-seed.sh       # Unix/macOS/Linux
./scripts/dev-seed.ps1      # Windows PowerShell

# Or manually:
docker compose exec postgres psql -U postgres -d directus -f /seed-data/01-products.sql
```

### Full Reset (Clean Slate)

**Warning**: This deletes all data (databases, uploads, content). Use only when you want to start fresh.

```bash
# Stop and remove everything
docker compose down -v --remove-orphans

# Or use helper script:
./scripts/dev-clean.sh      # Unix/macOS/Linux
./scripts/dev-clean.ps1     # Windows PowerShell

# Start again (will re-initialize databases)
docker compose up -d
```

### Backup Data

```bash
# Backup PostgreSQL (all databases)
docker exec wvwo-postgres-dev pg_dumpall -U postgres > backup-$(date +%Y%m%d).sql

# Backup specific database
docker exec wvwo-postgres-dev pg_dump -U postgres directus > directus-backup.sql

# Backup volumes (full snapshot)
docker run --rm \
  -v wvwo-postgres-data-dev:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz -C /data .
```

### Restore Data

```bash
# Restore PostgreSQL from SQL dump
cat backup-20240101.sql | docker exec -i wvwo-postgres-dev psql -U postgres

# Restore volume from snapshot
docker run --rm \
  -v wvwo-postgres-data-dev:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/postgres-backup.tar.gz -C /data
```

---

## Troubleshooting

### Services Won't Start

**Symptom**: `docker compose up` hangs or services repeatedly restart

**Solutions**:

1. **Check Docker is running**:
   ```bash
   docker info
   # If error, start Docker Desktop
   ```

2. **Check port conflicts**:
   ```bash
   # Windows:
   netstat -ano | findstr :5432  # Check if PostgreSQL port is in use

   # macOS/Linux:
   lsof -i :5432                 # Check if port 5432 is in use

   # If port is occupied, either:
   # - Stop the conflicting process
   # - Change port in docker-compose.yml
   ```

3. **Check disk space**:
   ```bash
   df -h  # Ensure you have at least 10 GB free
   ```

4. **View detailed logs**:
   ```bash
   docker compose logs <failing-service>
   ```

---

### "Permission Denied" Errors (Linux)

**Symptom**: Errors accessing volumes or files

**Solution**:
```bash
# Ensure your user is in docker group
sudo usermod -aG docker $USER

# Log out and back in, then verify:
groups  # Should show "docker"
```

---

### Slow Performance (Windows/macOS)

**Symptom**: Services take minutes to start or respond slowly

**Solutions**:

1. **Windows - Use WSL 2 filesystem**:
   - Store project in `~/projects/` inside WSL, not `/mnt/c/`
   - Verify backend: Docker Desktop → Settings → General → "Use WSL 2 based engine"

2. **macOS - Enable VirtioFS**:
   - Docker Desktop → Preferences → Experimental Features
   - Enable "VirtioFS accelerated directory sharing"

3. **Increase Docker resources**:
   - Docker Desktop → Settings → Resources
   - Allocate more RAM/CPU if available

---

### Database Connection Errors

**Symptom**: Services can't connect to PostgreSQL

**Checklist**:

1. Verify PostgreSQL is healthy:
   ```bash
   docker compose ps postgres
   # Should show "Up (healthy)"
   ```

2. Check `.env` passwords match `docker-compose.yml`:
   ```bash
   grep POSTGRES_PASSWORD .env
   # Verify value matches what services expect
   ```

3. Test connection manually:
   ```bash
   docker exec -it wvwo-postgres-dev psql -U directus_user -d directus
   # If this works, issue is in service config
   ```

4. View service logs for connection details:
   ```bash
   docker compose logs directus
   # Look for "connection refused" or "authentication failed"
   ```

---

### Astro Can't Fetch from Directus/Ghost

**Symptom**: Astro shows "Failed to fetch" errors in logs

**Solutions**:

1. Verify Directus/Ghost are healthy:
   ```bash
   docker compose ps directus ghost
   ```

2. Check Astro environment variables:
   ```bash
   docker compose exec astro env | grep PUBLIC_
   # Should show internal URLs: http://directus:8055, http://ghost:2368
   ```

3. Test connectivity from Astro container:
   ```bash
   docker compose exec astro curl -v http://directus:8055/server/health
   # Should return 200 OK
   ```

---

## Next Steps

Once your environment is running:

1. **Explore Directus**: Create collections for products, categories, FAQs
2. **Write a test blog post**: Publish content in Ghost and see it appear in Astro
3. **Add seed data**: Run seed scripts to populate with realistic test data
4. **Start implementing features**: Build out the Astro frontend to consume CMS data

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Check logs**: `docker compose logs <service-name>`
2. **Search GitHub issues**: Look for similar problems in repo issues
3. **Ask Matt**: Tag @matt in Slack/Discord with logs and error messages
4. **Update this guide**: If you solve a new issue, add it to Troubleshooting section!

---

## Appendix: Command Reference

### Quick Command Cheatsheet

```bash
# Lifecycle
docker compose up -d               # Start all services
docker compose down                # Stop all services (keep data)
docker compose down -v             # Stop and delete data
docker compose restart <service>   # Restart one service

# Monitoring
docker compose ps                  # Service status
docker compose logs -f             # Follow logs (all services)
docker compose logs -f <service>   # Follow logs (one service)
docker compose top                 # Show running processes

# Exec into containers
docker compose exec postgres psql -U postgres  # Open PostgreSQL CLI
docker compose exec redis redis-cli            # Open Redis CLI
docker compose exec directus sh                # Shell into Directus container

# Resource cleanup
docker system prune                # Remove unused images/containers
docker volume prune                # Remove unused volumes (careful!)
docker system df                   # Show Docker disk usage
```

---

**That's it!** You now have a fully functional local development environment for WV Wild Outdoors. Happy coding! 🎉
