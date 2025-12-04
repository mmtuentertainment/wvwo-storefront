-- WV Wild Outdoors - Database Initialization
-- Creates separate databases for each service with dedicated users
-- Runs automatically on first PostgreSQL container start

-- =============================================================================
-- Directus CMS Database
-- =============================================================================
CREATE DATABASE directus;
CREATE USER directus_user WITH ENCRYPTED PASSWORD 'directuspass123';
GRANT ALL PRIVILEGES ON DATABASE directus TO directus_user;

-- Connect to directus database and grant schema permissions
\c directus
GRANT ALL ON SCHEMA public TO directus_user;
ALTER DATABASE directus OWNER TO directus_user;

-- =============================================================================
-- Ghost Blog Database
-- =============================================================================
\c postgres
CREATE DATABASE ghost;
CREATE USER ghost_user WITH ENCRYPTED PASSWORD 'ghostpass123';
GRANT ALL PRIVILEGES ON DATABASE ghost TO ghost_user;

-- Connect to ghost database and grant schema permissions
\c ghost
GRANT ALL ON SCHEMA public TO ghost_user;
ALTER DATABASE ghost OWNER TO ghost_user;

-- =============================================================================
-- Listmonk Email Database
-- =============================================================================
\c postgres
CREATE DATABASE listmonk;
CREATE USER listmonk_user WITH ENCRYPTED PASSWORD 'listmonkpass123';
GRANT ALL PRIVILEGES ON DATABASE listmonk TO listmonk_user;

-- Connect to listmonk database and grant schema permissions
\c listmonk
GRANT ALL ON SCHEMA public TO listmonk_user;
ALTER DATABASE listmonk OWNER TO listmonk_user;

-- =============================================================================
-- Mixpost Social Media Database
-- =============================================================================
\c postgres
CREATE DATABASE mixpost;
CREATE USER mixpost_user WITH ENCRYPTED PASSWORD 'mixpostpass123';
GRANT ALL PRIVILEGES ON DATABASE mixpost TO mixpost_user;

-- Connect to mixpost database and grant schema permissions
\c mixpost
GRANT ALL ON SCHEMA public TO mixpost_user;
ALTER DATABASE mixpost OWNER TO mixpost_user;

-- =============================================================================
-- Return to postgres database
-- =============================================================================
\c postgres

-- Log completion
DO $$
BEGIN
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'WV Wild Outdoors database initialization complete!';
    RAISE NOTICE 'Databases created: directus, ghost, listmonk, mixpost';
    RAISE NOTICE 'Users created with appropriate permissions';
    RAISE NOTICE '=================================================================';
END $$;
