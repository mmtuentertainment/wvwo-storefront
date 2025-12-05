#!/bin/bash
# =============================================================================
# WV Wild Outdoors - Database Initialization
# Creates separate databases for each service with dedicated users
# Runs automatically on first PostgreSQL container start
#
# Environment variables required:
#   - DIRECTUS_DB_PASSWORD
#   - GHOST_DB_PASSWORD
#   - LISTMONK_DB_PASSWORD
#   - MIXPOST_DB_PASSWORD
# =============================================================================

set -e

# Use environment variables, with fallback to CHANGE_ME if not set
DIRECTUS_PASS="${DIRECTUS_DB_PASSWORD:-CHANGE_ME_DIRECTUS}"
GHOST_PASS="${GHOST_DB_PASSWORD:-CHANGE_ME_GHOST}"
LISTMONK_PASS="${LISTMONK_DB_PASSWORD:-CHANGE_ME_LISTMONK}"
MIXPOST_PASS="${MIXPOST_DB_PASSWORD:-CHANGE_ME_MIXPOST}"

echo "================================================================="
echo "WV Wild Outdoors - Initializing databases..."
echo "================================================================="

# =============================================================================
# Directus CMS Database
# =============================================================================
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE directus;
    CREATE USER directus_user WITH ENCRYPTED PASSWORD '$DIRECTUS_PASS';
    GRANT ALL PRIVILEGES ON DATABASE directus TO directus_user;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "directus" <<-EOSQL
    GRANT ALL ON SCHEMA public TO directus_user;
    ALTER DATABASE directus OWNER TO directus_user;
EOSQL

echo "✓ Directus database created"

# =============================================================================
# Ghost Blog Database
# =============================================================================
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE ghost;
    CREATE USER ghost_user WITH ENCRYPTED PASSWORD '$GHOST_PASS';
    GRANT ALL PRIVILEGES ON DATABASE ghost TO ghost_user;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "ghost" <<-EOSQL
    GRANT ALL ON SCHEMA public TO ghost_user;
    ALTER DATABASE ghost OWNER TO ghost_user;
EOSQL

echo "✓ Ghost database created"

# =============================================================================
# Listmonk Email Database
# =============================================================================
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE listmonk;
    CREATE USER listmonk_user WITH ENCRYPTED PASSWORD '$LISTMONK_PASS';
    GRANT ALL PRIVILEGES ON DATABASE listmonk TO listmonk_user;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "listmonk" <<-EOSQL
    GRANT ALL ON SCHEMA public TO listmonk_user;
    ALTER DATABASE listmonk OWNER TO listmonk_user;
EOSQL

echo "✓ Listmonk database created"

# =============================================================================
# Mixpost Social Media Database
# =============================================================================
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE mixpost;
    CREATE USER mixpost_user WITH ENCRYPTED PASSWORD '$MIXPOST_PASS';
    GRANT ALL PRIVILEGES ON DATABASE mixpost TO mixpost_user;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "mixpost" <<-EOSQL
    GRANT ALL ON SCHEMA public TO mixpost_user;
    ALTER DATABASE mixpost OWNER TO mixpost_user;
EOSQL

echo "✓ Mixpost database created"

echo "================================================================="
echo "WV Wild Outdoors database initialization complete!"
echo "Databases created: directus, ghost, listmonk, mixpost"
echo "Users created with appropriate permissions"
echo "================================================================="
