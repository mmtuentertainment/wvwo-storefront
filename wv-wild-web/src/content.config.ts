// SPEC-06: Astro Content Collections Schema
// Foundation for WVWO "Mountain State Adventure Destination" pivot
// Dual-use: Powers both WVWO storefront and MMTU Entertainment

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ============================================================================
// SHARED SCHEMAS
// ============================================================================

/** Image schema with required alt text for accessibility */
const ImageSchema = z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
});

/** Season enum for hunting/fishing/recreation */
const SeasonEnum = z.enum(['spring', 'summer', 'fall', 'winter']);

/** Difficulty levels for adventures */
const DifficultyEnum = z.enum(['easy', 'moderate', 'challenging', 'rugged']);

// ============================================================================
// ADVENTURES COLLECTION
// Hunting guides, trail maps, seasonal calendars
// Fields: title, description, season, difficulty, location, coordinates, gear, images, body
// ============================================================================

const adventures = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/adventures' }),
    schema: z.object({
        title: z.string(),
        description: z.string(), // Kim's voice: authentic, direct
        season: z.array(SeasonEnum), // Can span multiple seasons
        difficulty: DifficultyEnum,
        location: z.string(), // e.g., "Burnsville Lake WMA"
        coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
        }).optional(),
        gear: z.array(z.string()).optional(), // e.g., ["turkey vest", "box call"]
        images: z.array(ImageSchema).optional(),
    }),
});

// ============================================================================
// STORIES COLLECTION
// Customer stories, hunt reports, community highlights
// Fields: title, excerpt, author, date, featured_image, category, body
// ============================================================================

const CategoryEnum = z.enum(['hunt-report', 'shop-news', 'community', 'education']);

const stories = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(), // For card previews, Kim's voice
        author: z.string().default('WV Wild Outdoors'),
        date: z.coerce.date(), // Coerce from string in frontmatter
        featured_image: ImageSchema.optional(),
        category: CategoryEnum,
    }),
});

// ============================================================================
// RESOURCES COLLECTION
// WMA maps, season dates, regulatory info
// Fields: title, type, updated_date, pdf_url, description, related_adventures
// ============================================================================

const ResourceTypeEnum = z.enum(['map', 'regulation', 'brochure', 'season-dates']);

const resources = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
    schema: z.object({
        title: z.string(),
        type: ResourceTypeEnum,
        updated_date: z.coerce.date().optional(),
        pdf_url: z.string().url().optional(),
        description: z.string().optional(),
        related_adventures: z.array(reference('adventures')).optional(), // Type-safe adventure refs
    }),
});

// ============================================================================
// LOCATIONS COLLECTION
// Trailheads, WMAs, local spots
// Fields: name, type, coordinates, directions, i79_proximity, amenities, images
// ============================================================================

const LocationTypeEnum = z.enum(['lake', 'wma', 'forest', 'state-park', 'river', 'trailhead']);

const locations = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
    schema: z.object({
        name: z.string(),
        type: LocationTypeEnum,
        coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
        }),
        directions: z.string(), // Kim's voice: "Head north on I-79..."
        i79_proximity: z.string().optional(), // e.g., "Exit 62, 10 min from shop"
        amenities: z.array(z.string()).optional(), // e.g., ["boat ramps", "camping"]
        images: z.array(ImageSchema).optional(),
    }),
});

// ============================================================================
// PRODUCTS COLLECTION (Commerce-Ready)
// Product catalog for future e-commerce integration
// Fields: title, sku, price, availability_status, commerce_enabled, specs, related_adventures
// ============================================================================

/** Availability status for products */
const AvailabilityStatusEnum = z.enum([
    'in_stock',
    'out_of_stock',
    'pre_order',
    'call_to_order', // For BOPIS items (kayaks, safes, heavy gear)
]);

/** Fulfillment type for products */
const FulfillmentTypeEnum = z.enum([
    'ship_or_pickup',  // Can be shipped or picked up
    'pickup_only',     // Heavy items, BOPIS permanent
    'reserve_hold',    // Firearms (FFL required)
]);

const products = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
    schema: z.object({
        title: z.string(),
        sku: z.string(), // Critical for future inventory syncing
        price: z.number(), // In dollars (not cents)
        availability_status: AvailabilityStatusEnum.default('call_to_order'),

        // Per-item commerce toggle (overrides global PUBLIC_COMMERCE_ENABLED)
        commerce_enabled: z.boolean().default(false),

        // Fulfillment constraints based on shipping logistics research
        fulfillment_type: FulfillmentTypeEnum.default('pickup_only'),

        // Product specifications
        specs: z.object({
            weight_lbs: z.number().optional(),
            dimensions: z.string().optional(), // e.g., "12 x 8 x 6 inches"
            brand: z.string().optional(),
            model: z.string().optional(),
        }).optional(),

        // Content-to-commerce bridge: "Best trails for this boot"
        related_adventures: z.array(reference('adventures')).optional(),

        // Images for product display
        images: z.array(ImageSchema).optional(),

        // Category for filtering/grouping
        category: z.string().optional(), // e.g., "kayaks", "hunting-gear", "apparel"

        // FFL compliance (firearms)
        ffl_required: z.boolean().default(false),

        // Age restriction (ammunition, firearms)
        age_restriction: z.number().optional(), // 18 or 21
    }),
});

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================

export const collections = {
    adventures,
    stories,
    resources,
    locations,
    products,
};
