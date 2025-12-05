-- =============================================================================
-- WV Wild Outdoors - Ghost Blog Posts Seed Data
-- =============================================================================
-- Sample blog posts for local development
--
-- IMPORTANT: Current Configuration Uses SQLite
-- --------------------------------------------
-- In docker-compose.yml, Ghost is configured to use SQLite:
--   database__client: sqlite3
--   database__connection__filename: /var/lib/ghost/content/data/ghost.db
--
-- This SQL file is provided for:
--   1. Reference when configuring Ghost with PostgreSQL
--   2. Documentation of sample content structure
--   3. Future PostgreSQL migration support
--
-- RECOMMENDED: For current SQLite setup, seed Ghost via Admin API or UI:
--   - Visit http://localhost:2368/ghost/ and create posts manually
--   - Use Ghost Admin API (see scripts/dev-seed.sh for API examples)
--   - Import JSON via Ghost Admin > Settings > Labs > Import Content
--
-- TO USE POSTGRESQL WITH GHOST:
--   Update docker-compose.yml ghost service environment:
--     database__client: postgres
--     database__connection__host: postgres
--     database__connection__user: ghost_user
--     database__connection__password: ${GHOST_DB_PASSWORD}
--     database__connection__database: ghost
-- =============================================================================

-- This SQL is for PostgreSQL-configured Ghost installations
-- Ghost schema must be initialized by Ghost before running seed data

BEGIN;

-- =============================================================================
-- Check Ghost Tables Exist
-- =============================================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
        RAISE NOTICE '==============================================================';
        RAISE NOTICE 'Ghost posts table not found.';
        RAISE NOTICE '';
        RAISE NOTICE 'Current setup uses SQLite. To seed blog posts:';
        RAISE NOTICE '  1. Visit http://localhost:2368/ghost/';
        RAISE NOTICE '  2. Create posts manually in the Ghost editor';
        RAISE NOTICE '  3. Or use Ghost Admin API for programmatic seeding';
        RAISE NOTICE '';
        RAISE NOTICE 'To switch Ghost to PostgreSQL, update docker-compose.yml';
        RAISE NOTICE 'See comments at top of this file for instructions.';
        RAISE NOTICE '==============================================================';
        RETURN;
    END IF;

    -- If we get here, Ghost is using PostgreSQL
    RAISE NOTICE 'Ghost PostgreSQL tables found - proceeding with seed data';
END $$;

-- =============================================================================
-- Sample Posts (PostgreSQL-configured Ghost only)
-- =============================================================================
-- Ghost uses UUIDs for IDs and has a specific schema
-- These inserts match Ghost's expected column structure

DO $$
DECLARE
    author_id UUID;
    post_uuid UUID;
BEGIN
    -- Only run if posts table exists (PostgreSQL mode)
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
        RETURN;
    END IF;

    -- Get the first author (created during Ghost setup)
    SELECT id INTO author_id FROM users WHERE id IS NOT NULL LIMIT 1;

    IF author_id IS NULL THEN
        RAISE NOTICE 'No Ghost author found. Complete Ghost setup first at http://localhost:2368/ghost/';
        RETURN;
    END IF;

    -- Clear seed posts (identified by slug prefix)
    DELETE FROM posts WHERE slug LIKE 'wvwo-%';

    -- Insert sample blog posts
    -- Post 1: Welcome post
    INSERT INTO posts (
        id, uuid, title, slug, mobiledoc, html, plaintext,
        feature_image, featured, status, visibility,
        created_at, updated_at, published_at,
        created_by, updated_by, published_by
    ) VALUES (
        gen_random_uuid(),
        gen_random_uuid(),
        'Welcome to WV Wild Outdoors',
        'wvwo-welcome',
        '{"version":"0.3.1","atoms":[],"cards":[],"markups":[],"sections":[[1,"p",[[0,[],0,"Welcome to WV Wild Outdoors, your home base for exploring the wild and wonderful Mountain State!"]]]]}',
        '<p>Welcome to WV Wild Outdoors, your home base for exploring the wild and wonderful Mountain State!</p>',
        'Welcome to WV Wild Outdoors, your home base for exploring the wild and wonderful Mountain State!',
        NULL,
        true,
        'published',
        'public',
        NOW(),
        NOW(),
        NOW(),
        author_id,
        author_id,
        author_id
    );

    RAISE NOTICE 'Sample posts seeded successfully';

EXCEPTION
    WHEN undefined_column THEN
        RAISE NOTICE 'Ghost schema mismatch - columns may differ. Use Ghost Admin API instead.';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error seeding posts: %', SQLERRM;
END $$;

COMMIT;

-- =============================================================================
-- Sample Post Content (for manual creation or API import)
-- =============================================================================
-- Use these as reference when creating posts in Ghost Admin:
--
-- POST 1: Welcome to WV Wild Outdoors
-- ------------------------------------
-- Title: Welcome to WV Wild Outdoors
-- Slug: wvwo-welcome
-- Feature Image: (upload a WV landscape)
-- Content:
--   Welcome to WV Wild Outdoors, your home base for exploring the wild and
--   wonderful Mountain State! Based in Birch River, at the heart of West
--   Virginia, we're dedicated to helping you discover the best hunting,
--   fishing, and outdoor experiences our state has to offer.
--
--   Whether you're chasing whitetail in Braxton County, fly fishing the
--   Elk River, or hiking the rugged trails of Dolly Sods, we've got the
--   gear and local knowledge to make your adventure unforgettable.
--
-- POST 2: Fall Hunting Season Preview
-- ------------------------------------
-- Title: Fall Hunting Season Preview: What's in Store for WV Hunters
-- Slug: wvwo-fall-hunting-preview
-- Content:
--   Fall is approaching, and that means hunting season is right around
--   the corner! Here's what West Virginia hunters need to know...
--
--   DEER SEASON DATES:
--   - Archery: September 28 - December 31
--   - Crossbow: October 19 - December 31
--   - Buck Firearms: November 18 - December 1
--
--   TOP SPOTS IN BRAXTON COUNTY:
--   - Burnsville Lake Wildlife Management Area
--   - Holly River State Park borders
--   - Private land leases (contact us for availability)
--
-- POST 3: Elk River Fly Fishing Guide
-- ------------------------------------
-- Title: A Local's Guide to Fly Fishing the Elk River
-- Slug: wvwo-elk-river-fly-fishing
-- Content:
--   The Elk River is one of West Virginia's premier trout streams,
--   and lucky for us, it flows right through our backyard...
--
--   BEST ACCESS POINTS:
--   - Below Sutton Dam (stocked section)
--   - Bergoo to Centralia stretch
--   - Webster Springs downstream
--
--   HATCHES TO MATCH:
--   - March-April: Blue Quill, Hendrickson
--   - May-June: Sulphurs, Light Cahills
--   - Summer: Terrestrials, small caddis
--
--   RECOMMENDED GEAR:
--   Check out our Elk River Fly Rod Combo - specifically balanced
--   for these waters!
--
-- POST 4: Camping at Dolly Sods
-- ------------------------------------
-- Title: Surviving Dolly Sods: Tips from a Mountain State Local
-- Slug: wvwo-dolly-sods-camping
-- Content:
--   Dolly Sods Wilderness is like nowhere else on Earth - seriously.
--   The weather can change in minutes, the wind never stops, and
--   the views are absolutely worth it...
--
--   ESSENTIAL GEAR:
--   - A 4-season tent (our Dolly Sods Expedition Tent is designed for this)
--   - Layers, layers, layers
--   - Map and compass (cell service is nonexistent)
--   - Water filter (streams are plentiful but need treatment)
--
--   LEAVE NO TRACE:
--   This fragile alpine environment needs our protection.
--   Pack out everything, stay on marked trails, camp on durable surfaces.
--
-- =============================================================================
-- Ghost Admin API Example (JavaScript)
-- =============================================================================
-- For programmatic seeding, use the Ghost Admin API:
--
-- const GhostAdminAPI = require('@tryghost/admin-api');
-- const api = new GhostAdminAPI({
--     url: 'http://localhost:2368',
--     key: 'YOUR_ADMIN_API_KEY',  // Get from Ghost Admin > Settings > Integrations
--     version: 'v5.0'
-- });
--
-- await api.posts.add({
--     title: 'Welcome to WV Wild Outdoors',
--     html: '<p>Welcome content here...</p>',
--     status: 'published'
-- });
-- =============================================================================
