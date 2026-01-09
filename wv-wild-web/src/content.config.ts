// SPEC-06: Astro Content Collections Schema
// Foundation for WVWO "Mountain State Adventure Destination" pivot
// Dual-use: Powers both WVWO storefront and MMTU Entertainment

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// SPEC-14: River adventure type schemas (T-033)
import {
    RapidSchema,
    RiverFishingSchema,
    OutfitterSchema,
    SeasonalFlowDetailsSchema,
    RiverAccessPointSchema,
    RiverSafetySchema,
    NearbyAttractionSchema,
    RapidClassSchema
} from './types/river-types';

// SPEC-15: Ski resort type schemas
import {
    ElevationSchema,
    SkiSeasonSchema,
    TrailsSchema,
    LiftsSchema,
    SnowConditionsSchema,
    PricingSchema,
    TerrainParkSchema,
    LodgingSchema,
    DiningSchema,
    AmenitySchema,
    SummerActivitySchema,
    ParkAffiliationSchema,
    NordicSkiingSchema,
    PassAffiliationSchema,
    SafetyInfoSchema,
    KimTipSchema,
} from './types/ski-types';

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

/** Suitability flags for accessibility and family-friendliness (SPEC-07) */
const SuitabilityEnum = z.enum(['dog-friendly', 'kid-friendly', 'wheelchair-accessible', 'paved']);

// ============================================================================
// ADVENTURES COLLECTION
// Hunting guides, trail maps, seasonal calendars
// Fields: title, description, season, difficulty, location, coordinates, gear, elevation_gain, suitability, images, body
// SPEC-12 Extension: WMA-specific fields (type, acreage, county, species, fishingWaters, facilities, accessPoints, regulations, seasonHighlights, mapUrl)
// ============================================================================

// SPEC-12: Nested Zod schemas for WMA-specific data structures
const SpeciesSchema = z.object({
    name: z.string().min(1),
    season: z.string().min(1),
    notes: z.string().optional(),
    regulationUrl: z.string().url().optional(),
});

const FishingWaterSchema = z.object({
    name: z.string().min(1),
    species: z.array(z.string().min(1)),
    access: z.string().min(1),
    notes: z.string().optional(),
});

const FacilitySchema = z.object({
    type: z.string().min(1),
    count: z.number().int().positive().optional(),
    description: z.string().min(1),
    contact: z.string().optional(),
    link: z.string().url().optional(),
    accessibility: z.string().optional(),
});

const AccessPointSchema = z.object({
    name: z.string().min(1),
    coords: z.string().optional(),
    features: z.array(z.string().min(1)),
    mapLink: z.string().url().optional(),
});

const RegulationsSchema = z.object({
    zone: z.string().optional(),
    restrictions: z.array(z.string().min(1)),
    regulationsUrl: z.string().url().optional(),
    usaceRegulationsUrl: z.string().url().optional(), // USACE federal regulations (cliff jumping, water safety)
});

const SeasonHighlightSchema = z.object({
    season: z.string().min(1),
    target: z.string().min(1),
    tips: z.string().min(1),
});

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
        elevation_gain: z.number().optional(), // SPEC-07: Elevation in feet for filtering (e.g., 1200)
        drive_time: z.string().optional(),    // SPEC-08: Drive time from shop (e.g., "25 min")
        kim_hook: z.string().optional(),      // SPEC-08: Kim's personal teaser for card display (future use)
        suitability: z.array(SuitabilityEnum).optional(), // SPEC-07: Accessibility flags
        images: z.array(ImageSchema).optional(),

        // SPEC-12: Explicit type field for adventure discrimination (Session 2025-12-27)
        // SPEC-14: Extended to include 'river' type (T-032)
        // SPEC-15: Extended to include 'ski' type for ski resort templates
        // SPEC-21-A: Extended to include 'campground' type for campground pages
        // SPEC-24: Extended to include all destination types for dual-system architecture
        type: z.enum([
            'adventure',      // Generic adventures (legacy)
            'wma',            // Wildlife Management Areas
            'lake',           // Lakes and reservoirs
            'river',          // Rivers and paddling
            'ski',            // Ski resorts
            'campground',     // Campgrounds
            'historic',       // Historic sites
            'state-park',     // State parks
            'backcountry',    // Wilderness/backcountry areas
            'cave',           // Caves and caverns
            'trail',          // Hiking/biking trails
            'climbing',       // Rock climbing areas
            'national-park',  // National parks/NPS sites
            'resort',         // Adventure resorts
        ]).optional(),

        // SPEC-12: WMA-specific optional fields (zero breaking changes)
        acreage: z.number().int().positive().optional(),
        county: z.string().optional(),
        species: z.array(SpeciesSchema).optional(),
        fishingWaters: z.array(FishingWaterSchema).optional(),
        facilities: z.array(FacilitySchema).optional(),
        accessPoints: z.array(AccessPointSchema).optional(),
        regulations: RegulationsSchema.optional(),
        seasonHighlights: z.array(SeasonHighlightSchema).optional(),
        mapUrl: z.string().url().optional(),

        // SPEC-14: River-specific optional fields (T-034, zero breaking changes)
        riverLength: z.number().positive().optional(),
        difficultyRange: z.string().optional(),
        rapids: z.array(RapidSchema).max(50).optional(),
        riverFishing: RiverFishingSchema.optional(),
        outfitters: z.array(OutfitterSchema).optional(),
        seasonalFlow: z.array(SeasonalFlowDetailsSchema).optional(),
        riverAccessPoints: z.array(RiverAccessPointSchema).optional(),
        riverSafety: z.array(RiverSafetySchema).optional(),
        nearbyAttractions: z.array(NearbyAttractionSchema).optional(),
        waterLevelUrl: z.string().url().optional(),

        // SPEC-15: Ski resort-specific optional fields (zero breaking changes)
        slug: z.string().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        tagline: z.string().optional(),
        heroImage: z.string().optional(),
        trailMapUrl: z.string().url().optional(),
        elevation: ElevationSchema.optional(),
        skiSeason: SkiSeasonSchema.optional(),
        quickStats: z.array(z.string()).optional(),
        trails: TrailsSchema.optional(),
        lifts: LiftsSchema.optional(),
        snowConditions: SnowConditionsSchema.optional(),
        pricing: PricingSchema.optional(),
        terrainParks: z.array(TerrainParkSchema).optional(),
        lodging: z.array(LodgingSchema).optional(),
        dining: z.array(DiningSchema).optional(),
        amenities: z.array(AmenitySchema).optional(),
        summerActivities: z.array(SummerActivitySchema).optional(),
        parkAffiliation: ParkAffiliationSchema.optional(),
        nordicSkiing: NordicSkiingSchema.optional(),
        passAffiliations: z.array(PassAffiliationSchema).optional(),
        gearList: z.array(z.object({
            name: z.string(),
            optional: z.boolean().default(false),
        })).optional(),
        relatedShop: z.array(z.object({
            name: z.string(),
            description: z.string().optional(),
            href: z.string(),
        })).optional(),
        safety: z.array(SafetyInfoSchema).optional(),
        kimTips: z.array(KimTipSchema).optional(),
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
