# SPEC-06: Astro Content Collections Schema - FOUNDATION PATTERN

## 🎯 Summary

This PR implements the **foundation schema pattern** for WVWO's strategic pivot from e-commerce to an **Adventure Destination Hub**.

| Metric | Value |
|--------|-------|
| Collections | 5 (adventures, stories, resources, locations, **products**) |
| Validation Rules | 18+ |
| Example Files | 6 |
| Build Time | 13.27s |
| AgentDB Episode | #117 (reward: 1.00) |
| **Research Validated** | Strategic Validation Report (Dec 22, 2025) |

## 📋 Changes

### New Files

```
wv-wild-web/src/
├── content.config.ts          # 5 Zod-validated collection schemas
└── content/
    ├── adventures/
    │   └── spring-gobbler-burnsville.md
    ├── stories/
    │   └── opening-day-buck.md
    ├── resources/
    │   └── burnsville-wma-map.md
    ├── locations/
    │   └── sutton-lake.md
    └── products/                # NEW - Commerce-ready catalog
        ├── jackson-kayak-rockstar.md
        └── elk-river-fly-selection.md
```

## 🗃️ Collections Schema

### adventures
Hunting guides, trail maps, seasonal calendars
- `title`, `description`, `season[]`, `difficulty`, `location`, `coordinates`, `gear[]`, `images[]`
- Enums: `SeasonEnum`, `DifficultyEnum`

### stories
Customer stories, hunt reports, community highlights
- `title`, `excerpt`, `author`, `date`, `featured_image`, `category`
- Enum: `CategoryEnum`

### resources
WMA maps, season dates, regulatory info
- `title`, `type`, `updated_date`, `pdf_url`, `description`, `related_adventures[]`
- Enum: `ResourceTypeEnum`

### locations
Trailheads, WMAs, local spots
- `name`, `type`, `coordinates`, `directions`, `i79_proximity`, `amenities[]`, `images[]`
- Enum: `LocationTypeEnum`

### products ⭐ NEW - Commerce-Ready
Product catalog for future e-commerce integration
- `title`, `sku`, `price`, `availability_status`, `commerce_enabled`, `fulfillment_type`
- `specs` (weight, dimensions, brand, model)
- `related_adventures[]` (content-to-commerce bridge)
- `category`, `ffl_required`, `age_restriction`
- Enums: `AvailabilityStatusEnum`, `FulfillmentTypeEnum`

**Strategic Value**:
- Per-item commerce toggle (`commerce_enabled: true/false`)
- BOPIS enforcement for heavy items (`fulfillment_type: 'pickup_only'`)
- Inventory sync ready (`sku` field)
- Headless commerce integration ready (Snipcart/Shopify Lite)

## 🏪 WVWO-Specific Design

| Feature | Implementation |
|---------|---------------|
| **Kim's Voice** | `description`, `excerpt`, `directions` fields support authentic rural WV tone |
| **Geographic** | `coordinates` (lat/lng), `i79_proximity` (Exit + distance from shop) |
| **Seasonal** | `SeasonEnum` for hunting/fishing/recreation seasons |
| **Safety** | `DifficultyEnum`, `gear[]` for adventure planning |
| **Accessibility** | `ImageSchema` requires alt text |

## 🔀 Dual-Use Architecture

This schema is **retail-neutral** by design:

```
┌─────────────────────────────────────────────────────────┐
│   CONTENT DATABASE (this PR)                            │
│   adventures, stories, resources, locations, products   │
│   Retail-neutral foundation - reusable across brands    │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ WVWO        │ │ MMTU        │ │ Future      │
│ Templates   │ │ Templates   │ │ Retailers   │
│ + shop CTAs │ │ + media CTA │ │ + their CTA │
└─────────────┘ └─────────────┘ └─────────────┘
```

## 📊 Research Validation (Dec 22, 2025)

This implementation incorporates findings from **Strategic Validation Report**:

### ✅ Astro v5 Content Layer API
- **Issue**: Legacy Collections v2 API causes build crashes at 5k+ pages
- **Solution**: Implemented `loader: glob()` pattern (SQLite-cached, scalable)
- **Benefit**: Can update product prices without full site rebuild

### ✅ Commerce-Ready Schema (Future-Proof)
- **Issue**: Need to support "pivot back to commerce" without code rewrite
- **Solution**: Added `products` collection with commerce fields NOW (even if unused)
- **Benefit**: Flip `commerce_enabled: true` later to activate checkout per-item

### ✅ BOPIS Architecture (Shipping Economics)
- **Research Finding**: LTL freight for kayaks costs $150-300 (erodes all margin)
- **Solution**: `fulfillment_type: 'pickup_only'` for heavy items (permanent)
- **Example**: Jackson Kayak (42 lbs) = pickup only, Fly selection (0.2 lbs) = shippable

## ✅ Validation

- [x] `npm run build` - 56 pages built successfully
- [x] `npm run typecheck` - No TypeScript errors
- [x] Content sync - Collections loaded
- [x] Schema validation - No Zod errors
- [x] AgentDB stored - Episode #117 with reward 1.00

## 🔗 Related

- **Spec**: `docs/specs/Mountain State Adventure Destination/SPEC-06-astro-content-collections-schema/PROMPT.md`
- **Pivot Rationale**: `docs/specs/PIVOT_RATIONALE.md`
- **Phase**: 4 (Mountain State Adventure Destination)

## 📸 Screenshots

N/A - Schema and content files only (no UI changes)

## 🧪 How to Test

```bash
cd wv-wild-web
npm install
npm run build  # Should complete with content sync
```

## 📝 Checklist

- [x] Code follows project style guidelines
- [x] Build passes locally
- [x] Commit message follows conventional commits
- [x] Documentation updated (example content includes usage patterns)
- [x] AgentDB pattern stored for future reference
