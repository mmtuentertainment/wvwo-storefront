-- =============================================================================
-- WV Wild Outdoors - Directus Products Seed Data
-- =============================================================================
-- Sample product catalog data for local development
-- Assumes Directus has been configured with products/categories collections
--
-- PREREQUISITES:
--   1. Directus must be running and initialized
--   2. Create these collections in Directus Admin (http://localhost:8055):
--      - categories (name: string, slug: string, description: text)
--      - products (name: string, slug: string, description: text, price: decimal,
--                  sku: string, in_stock: boolean, featured: boolean)
--      - products_categories (many-to-many junction)
--
-- USAGE:
--   ./scripts/dev-seed.sh
--   OR: docker compose exec postgres psql -U directus_user -d directus -f /seed-data/01-directus-products.sql
-- =============================================================================

-- Wrap in transaction for safety
BEGIN;

-- =============================================================================
-- Categories
-- =============================================================================
-- Check if categories table exists before inserting
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories') THEN
        -- Clear existing seed data (optional - comment out to append)
        DELETE FROM categories WHERE slug IN ('hunting', 'fishing', 'camping', 'apparel', 'accessories');

        -- Insert categories
        INSERT INTO categories (name, slug, description) VALUES
            ('Hunting', 'hunting', 'Gear and equipment for hunting in the West Virginia wilderness'),
            ('Fishing', 'fishing', 'Rods, reels, tackle, and accessories for WV''s rivers and streams'),
            ('Camping', 'camping', 'Tents, sleeping bags, and outdoor living essentials'),
            ('Apparel', 'apparel', 'Clothing and footwear for the Mountain State outdoors'),
            ('Accessories', 'accessories', 'Tools, gadgets, and essentials for any outdoor adventure');

        RAISE NOTICE 'Categories seeded successfully';
    ELSE
        RAISE NOTICE 'Skipping categories - table does not exist. Create collection in Directus first.';
    END IF;
END $$;

-- =============================================================================
-- Products
-- =============================================================================
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products') THEN
        -- Clear existing seed data
        DELETE FROM products WHERE sku LIKE 'WVWO-%';

        -- Insert sample products - WV Wild Outdoors themed
        INSERT INTO products (name, slug, description, price, sku, in_stock, featured) VALUES
            -- Hunting
            ('Appalachian Hunter''s Pack', 'appalachian-hunters-pack',
             'Rugged 45L backpack designed for West Virginia''s steep terrain. Waterproof construction with rifle/bow carrier.',
             189.99, 'WVWO-HUNT-001', true, true),

            ('WV Whitetail Deer Call', 'wv-whitetail-deer-call',
             'Hand-crafted deer call tuned for the vocal patterns of West Virginia whitetail deer.',
             34.99, 'WVWO-HUNT-002', true, false),

            ('Mountain State Hunting Blind', 'mountain-state-hunting-blind',
             'Pop-up ground blind with Appalachian forest camo pattern. Perfect for turkey and deer season.',
             149.99, 'WVWO-HUNT-003', true, true),

            -- Fishing
            ('Elk River Fly Rod Combo', 'elk-river-fly-rod-combo',
             '9ft 5-weight fly rod combo perfect for trout fishing in the Elk River and Cranberry River.',
             249.99, 'WVWO-FISH-001', true, true),

            ('New River Smallmouth Tackle Box', 'new-river-smallmouth-tackle-box',
             'Pre-loaded tackle box with lures specifically chosen for New River smallmouth bass.',
             79.99, 'WVWO-FISH-002', true, false),

            ('WV Native Trout Flies (12-pack)', 'wv-native-trout-flies',
             'Dozen hand-tied flies matching native WV hatches - perfect for Seneca Creek and Back Fork.',
             24.99, 'WVWO-FISH-003', true, false),

            -- Camping
            ('Dolly Sods Expedition Tent', 'dolly-sods-expedition-tent',
             '4-season tent rated for the harsh winds of Dolly Sods Wilderness. Sleeps 3.',
             349.99, 'WVWO-CAMP-001', true, true),

            ('Allegheny Mountain Sleeping Bag', 'allegheny-mountain-sleeping-bag',
             'Zero-degree rated mummy bag for cold Allegheny mountain nights. Down-filled comfort.',
             199.99, 'WVWO-CAMP-002', true, false),

            ('Birch River Camp Cookset', 'birch-river-camp-cookset',
             'Compact nesting cookware set. Made in Braxton County, WV - the heart of the state.',
             69.99, 'WVWO-CAMP-003', true, false),

            -- Apparel
            ('Almost Heaven Flannel Shirt', 'almost-heaven-flannel',
             'Classic red-black buffalo plaid flannel. Heavyweight cotton, made for WV winters.',
             59.99, 'WVWO-APRL-001', true, true),

            ('Mountain State Wader Boots', 'mountain-state-wader-boots',
             'Felt-sole wading boots for slippery WV river rocks. Ankle support for uneven terrain.',
             129.99, 'WVWO-APRL-002', true, false),

            ('Hillbilly Highway Hiking Socks (3-pack)', 'hillbilly-highway-socks',
             'Merino wool blend hiking socks. Named for the trails connecting WV''s small towns.',
             29.99, 'WVWO-APRL-003', true, false),

            -- Accessories
            ('Coal Country Headlamp', 'coal-country-headlamp',
             'Powerful 1000-lumen headlamp honoring WV''s mining heritage. USB rechargeable.',
             44.99, 'WVWO-ACCS-001', true, false),

            ('Gauley River Dry Bag', 'gauley-river-dry-bag',
             'Waterproof roll-top bag tested on the Gauley River rapids. 20L capacity.',
             39.99, 'WVWO-ACCS-002', true, false),

            ('Wild Wonderful Multitool', 'wild-wonderful-multitool',
             'Stainless steel multitool with WV state emblem. 18 functions for any adventure.',
             54.99, 'WVWO-ACCS-003', true, true);

        RAISE NOTICE 'Products seeded successfully (15 items)';
    ELSE
        RAISE NOTICE 'Skipping products - table does not exist. Create collection in Directus first.';
    END IF;
END $$;

-- =============================================================================
-- Product-Category Relationships (Junction Table)
-- =============================================================================
DO $$
DECLARE
    cat_hunting_id INTEGER;
    cat_fishing_id INTEGER;
    cat_camping_id INTEGER;
    cat_apparel_id INTEGER;
    cat_accessories_id INTEGER;
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products_categories')
       AND EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'products')
       AND EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories') THEN

        -- Get category IDs
        SELECT id INTO cat_hunting_id FROM categories WHERE slug = 'hunting';
        SELECT id INTO cat_fishing_id FROM categories WHERE slug = 'fishing';
        SELECT id INTO cat_camping_id FROM categories WHERE slug = 'camping';
        SELECT id INTO cat_apparel_id FROM categories WHERE slug = 'apparel';
        SELECT id INTO cat_accessories_id FROM categories WHERE slug = 'accessories';

        -- Clear existing relationships for seed products
        DELETE FROM products_categories
        WHERE products_id IN (SELECT id FROM products WHERE sku LIKE 'WVWO-%');

        -- Link hunting products
        INSERT INTO products_categories (products_id, categories_id)
        SELECT p.id, cat_hunting_id FROM products p WHERE p.sku IN ('WVWO-HUNT-001', 'WVWO-HUNT-002', 'WVWO-HUNT-003');

        -- Link fishing products
        INSERT INTO products_categories (products_id, categories_id)
        SELECT p.id, cat_fishing_id FROM products p WHERE p.sku IN ('WVWO-FISH-001', 'WVWO-FISH-002', 'WVWO-FISH-003');

        -- Link camping products
        INSERT INTO products_categories (products_id, categories_id)
        SELECT p.id, cat_camping_id FROM products p WHERE p.sku IN ('WVWO-CAMP-001', 'WVWO-CAMP-002', 'WVWO-CAMP-003');

        -- Link apparel products
        INSERT INTO products_categories (products_id, categories_id)
        SELECT p.id, cat_apparel_id FROM products p WHERE p.sku IN ('WVWO-APRL-001', 'WVWO-APRL-002', 'WVWO-APRL-003');

        -- Link accessories
        INSERT INTO products_categories (products_id, categories_id)
        SELECT p.id, cat_accessories_id FROM products p WHERE p.sku IN ('WVWO-ACCS-001', 'WVWO-ACCS-002', 'WVWO-ACCS-003');

        RAISE NOTICE 'Product-category relationships created';
    ELSE
        RAISE NOTICE 'Skipping product-category links - required tables do not exist.';
    END IF;
END $$;

COMMIT;

-- =============================================================================
-- Summary
-- =============================================================================
-- Seeded data includes:
--   - 5 categories (Hunting, Fishing, Camping, Apparel, Accessories)
--   - 15 products with WV-themed names and descriptions
--   - Product-category relationships
--
-- All products reference West Virginia locations and culture:
--   - Rivers: Elk, New, Gauley, Seneca Creek, Cranberry, Back Fork
--   - Places: Dolly Sods, Allegheny Mountains, Birch River, Braxton County
--   - Culture: "Almost Heaven", "Wild Wonderful", coal mining heritage
-- =============================================================================
