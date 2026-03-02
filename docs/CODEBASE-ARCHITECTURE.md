# WVWO Storefront - Complete Codebase Architecture

**Date:** January 13, 2026
**Scope:** Full audit of WVWO Adventure Hub & E-Commerce platform
**Status:** 2,100+ files analyzed across components, pages, utilities, types, and data systems

---

## Executive Summary

WVWO Storefront is a **hybrid Astro + React application** serving as both an Adventure Hub (discovery/education) and E-Commerce platform (shopping/checkout). The architecture uses:

- **Frontend:** Astro 5.16 (static generation) + React 19 (interactive islands)
- **State Management:** nanostores (lightweight, framework-agnostic)
- **Form Handling:** react-hook-form + Zod validation
- **Styling:** Tailwind CSS 4.1
- **UI Components:** Radix UI (headless components) + shadcn/ui patterns
- **Geospatial:** Turf.js for cross-linking calculations
- **Testing:** Vitest, Playwright (E2E), Axe Core (accessibility)
- **Data:** TypeScript-first with 50+ type definitions for destinations

---

## Architecture Overview

### 1. PROJECT STRUCTURE

```
wv-wild-web/
├── src/
│   ├── components/          # 100+ Astro & React components
│   ├── pages/               # 40+ route files (Astro dynamic routes)
│   ├── content/             # Content collection (markdown)
│   ├── data/                # Destination data files (lakes, WMAs, etc.)
│   ├── types/               # 33 TypeScript type definitions
│   ├── utils/               # Utility functions & helpers
│   ├── lib/                 # Libraries (cart, filter, payment, validation)
│   ├── hooks/               # React hooks (useCart)
│   ├── stores/              # State management (nanostores)
│   ├── layouts/             # Astro layouts
│   ├── styles/              # Global CSS
│   ├── config/              # Astro & app config
│   └── scripts/             # Build scripts
├── astro.config.ts          # Astro configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript settings
└── public/                  # Static assets
```

### 2. TECHNOLOGY STACK

#### Core Framework
- **Astro 5.16**: Static site generation with React islands
- **React 19**: Interactive UI components
- **TypeScript 5.9**: Type-safe development

#### Form & Validation
- **react-hook-form 7.68**: Form state management
- **Zod 3.25**: Runtime schema validation
- **@hookform/resolvers**: Zod integration

#### UI & Styling
- **Tailwind CSS 4.1**: Utility-first styling
- **@tailwindcss/typography**: Prose styling
- **Radix UI**: Headless component library
  - Accordion, Checkbox, Dialog, Label, Radio Group
  - Select, Separator, Slot, Sheet
- **lucide-react 0.561**: Icon library
- **class-variance-authority**: Component variants
- **tailwind-merge**: Utility conflict resolution
- **clsx**: Dynamic classname builder

#### State Management
- **nanostores 1.1**: Lightweight reactive stores
- **@nanostores/react 1.0**: React integration
- **next-themes 0.4**: Theme switching (future-proofing)

#### Geospatial & Data
- **@turf/turf 7.3**: Geospatial calculations (distance, points)
- **import.meta.glob**: Dynamic file loading for data discovery

#### Testing & Quality
- **Vitest 4.0**: Unit testing
- **@vitest/ui**: Test UI dashboard
- **@vitest/coverage-v8**: Coverage reporting
- **Playwright 1.57**: E2E testing
- **@axe-core/playwright 4.11**: Accessibility testing
- **playwright-lighthouse 4.0**: Performance testing

#### Development Tools
- **Babel Runtime 7.26**: Transpilation support
- **sharp 0.34**: Image optimization
- **pngjs 7.0**: PNG manipulation
- **to-ico 1.1**: ICO conversion
- **jsx-dom 27.3**: DOM testing

---

## Component Architecture

### Component Categories

#### 1. **ADVENTURE HUB COMPONENTS** (15 files)
Interactive discovery and educational system.

**Main Hub:**
- `AdventuresHub.tsx` - Master container with FilterProvider context
- `FilteredGrid.tsx` - Results grid with ARIA live regions
- `AdventureCard.tsx` - Card component with URL routing

**Filter Components:**
- `FilterBar.tsx` - Desktop sidebar filter controls
- `MobileFiltersSheet.tsx` - Mobile bottom-sheet filters
- `DifficultyFilter.tsx` - Radio group filter
- `SeasonFilter.tsx` - Multi-checkbox season filter
- `GearFilter.tsx` - Equipment requirement filter
- `SuitabilityFilter.tsx` - Family/accessibility filter
- `ElevationSlider.tsx` - Dual-thumb range slider (0-5000 ft)

**Utilities:**
- `OfflineBanner.tsx` - Offline detection banner
- `EmptyState.tsx` - No-results fallback UI

**Filter Infrastructure:**
- `FilterContext.tsx` - React context + useReducer for state
- `filter-reducer.ts` - Reducer actions (SET_*, RESET_*)
- `filters.config.ts` - Filter definitions & configuration
- `filter-utils.ts` - Filter matching logic
- `url-sync.ts` - URL parameter synchronization

#### 2. **DESTINATION TEMPLATES** (9 Astro components)
Template pages for different adventure types.

```
templates/
├── LakeTemplate.astro          # Fish species, marinas, camping
├── WMATemplate.astro           # Wildlife species, access points
├── CampgroundTemplate.astro    # Sites, amenities, fees
├── RiverTemplate.astro         # Rapids, put-ins, outfitters
├── StateParkTemplate.astro     # Trails, facilities, programs
├── BackcountryTemplate.astro   # Wilderness, safety, water
├── HistoricTemplate.astro      # Timeline, exhibits, tours
├── SkiTemplate.astro           # Trails, lifts, conditions
└── CaveTemplate.astro          # Tours, geology
```

**Template Features:**
- Cross-linking to nearby destinations (Haversine distance)
- Schema.org markup for SEO
- Dynamic routes via `import.meta.glob()`
- Responsive sections with Astro components

#### 3. **CART SYSTEM** (6 files)
Shopping cart with persistence and validation.

- `CartDrawer.tsx` - Slide-out cart panel (Sheet UI)
- `CartIcon.tsx` - Cart badge with item count
- `CartItem.tsx` - Individual line item
- `CartSummary.tsx` - Subtotal + shipping preview
- `AddToCartButton.tsx` - "Add to cart" with validation
- `HeaderCart.tsx` - Cart display in header
- `CartErrorBoundary.tsx` - Error fallback

**Features:**
- IndexedDB persistence (7-day retention)
- Session fallback
- Age restriction validation
- State restriction checks (firearms)
- FFL firearms reserve flow

#### 4. **CHECKOUT SYSTEM** (9 files)
Multi-step checkout with firearms compliance.

- `CheckoutForm.tsx` - Master form orchestrator
- `CheckoutProgress.tsx` - 3-step progress indicator
- `ContactSection.tsx` - Name/email/phone
- `FulfillmentSection.tsx` - Ship vs. pickup
- `OrderSummary.tsx` - Item list + pricing
- `PaymentSection.tsx` - Tactical Payments integration
- `FirearmAgreement.tsx` - Compliance checkbox
- `OrderConfirmation.tsx` - Success page
- `schemas/checkoutSchema.ts` - Zod validation

**Features:**
- Conditional shipping address (ship only)
- Shipping cost calculation by state
- Tax calculation
- Firearms agreement enforcement
- Age & state restriction validation
- Payment processing

#### 5. **UI COMPONENT LIBRARY** (13 Radix/shadcn components)

```
ui/
├── button.tsx               # Styled button component
├── card.tsx                 # Card container
├── accordion.tsx            # Collapsible sections
├── alert.tsx                # Alert box
├── badge.tsx                # Tag/label component
├── checkbox.tsx             # Checkbox input
├── input.tsx                # Text input
├── label.tsx                # Form labels
├── radio-group.tsx          # Radio button group
├── select.tsx               # Dropdown select
├── separator.tsx            # Divider line
├── sheet.tsx                # Slide-out panel
└── sonner.tsx               # Toast notifications
```

#### 6. **LAYOUT & PAGE COMPONENTS**

**Headers & Navigation:**
- `Header.astro` - Main navigation with cart integration
- `Footer.astro` - Site footer
- `Breadcrumb.astro` - Breadcrumb navigation
- `StickyPhone.astro` - Sticky phone number CTA

**Specialized Components:**
- `Hero.astro` - Hero banner with CTA
- `OwnerIntro.astro` - Kim's story section
- `StorySection.astro` - Brand narrative
- `Services.astro` - Service listing
- `Testimonials.astro` - Customer quotes
- `Ticker.astro` - Scrolling text/events
- `GuideBanner.tsx` - Seasonal guide callout
- `Visit.astro` - Visit planning section
- `QuoteForm.astro` - Request quote form
- `EmailCapture.astro` - Newsletter signup
- `ContactStrip.astro` - Phone/email strip
- `CategoryGrid.astro` - Product category grid
- `InventoryGrid.astro` - Product listing
- `CategoryShowcase.tsx` - Interactive category showcase

#### 7. **SPECIALIZED DESTINATION SECTIONS** (24 components)

**Historic Site Sections:**
- `HistoricHero.astro` - Hero with image
- `HistoricalContextSection.astro` - Timeline & narrative
- `ExhibitsSection.astro` - Museum exhibits
- `ToursSection.astro` - Tour options
- `EducationalProgramsSection.astro` - Educational offerings
- `PreservedStructuresSection.astro` - Historic buildings
- `VisitorInfoSection.astro` - Hours, fees, contact
- `NearbyHistorySection.astro` - Related historic sites

**State Park Sections:**
- `ParkOverviewSection.astro` - Park summary
- `ActivitiesSection.astro` - Activity listings
- `FacilitiesSection.astro` - Amenities grid
- `ReservationSection.astro` - Booking info

**Resort Sections:**
- `ResortHero.astro`
- `LodgingSection.astro` - Room types
- `FacilitiesSection.astro` - Amenities
- `ActivityMenuSection.astro` - Available activities
- `BookingPoliciesSection.astro` - Booking terms
- `PackagesSection.astro` - Package deals
- `GuidedTripsSection.astro` - Guided experiences
- `OutfitterServicesSection.astro` - Equipment rental

**Backcountry Sections:**
- `CellCoverageSection.astro` - Signal map
- `EmergencyContactsSection.astro` - SAR contacts
- `WaterSafetySection.astro` - Water hazards

**Adventure Sections (shared across types):**
- `AdventureHero.astro` - Hero with hero badge
- `AdventureCTA.astro` - Shop/booking CTA
- `AdventureFeatureSection.astro` - Key highlights
- `AdventureQuickStats.astro` - Quick info (distance, elevation, etc.)
- `AdventureGettingThere.astro` - Directions & parking
- `AdventureCampingList.astro` - Campground listings
- `AdventureAmenitiesGrid.astro` - Amenity icons & text
- `AdventureGearChecklist.astro` - "What to bring" list
- `AdventureWhatToFish.astro` - Fish species & methods
- `AdventureWhatToHunt.astro` - Game species & seasons
- `AdventureRelatedShop.astro` - Product recommendations

#### 8. **SEO & SCHEMA COMPONENTS** (8 files)

- `SchemaAdventureHero.astro` - Event schema
- `SchemaBackcountryTemplate.astro` - Place schema
- `SchemaBreadcrumb.astro` - Breadcrumb markup
- `SchemaEvent.astro` - Event details
- `SchemaEventSeries.astro` - Event series
- `SchemaFAQ.astro` - FAQ markup
- `SchemaHistoricTemplate.astro` - Museum schema
- `SchemaRiverTemplate.astro` - Place schema
- `SchemaStateParkTemplate.astro` - Park schema

#### 9. **SKELETON LOADERS** (4 files)

- `TimelineSkeleton.astro` - Timeline placeholder
- `EventCardsSkeleton.astro` - Event cards placeholder
- `TourCardsSkeleton.astro` - Tour cards placeholder
- `StructureCardsSkeleton.astro` - Building cards placeholder

**Purpose:** Placeholder UI during data loading for better UX

---

## State Management System

### Nanostores Architecture

**Cart Store** (`cartStore.ts`):
```typescript
// Global atoms for reactive state
$cartItems          // Record<productId, CartItem>
$isCartOpen         // boolean
$itemCount          // Computed from items
$subtotal           // Computed from items
$summary            // CartSummaryData
$persistenceMode    // 'persistent' | 'session'
$cartRestoreError   // Error message
$cartPersistenceWarning // Warning message

// Exported actions
addItem(product)
removeItem(productId)
updateQuantity(productId, quantity)
clearCart()
openCart() / closeCart() / toggleCart()
```

**Why nanostores?**
- Lightweight (works with Astro's static generation)
- Framework-agnostic (supports React, Vue, Svelte)
- Persistent storage (IndexedDB with fallback to session)
- No circular dependencies
- Reactive updates without re-renders

**Persistence Strategy:**
1. **IndexedDB** (preferred) - 7-day expiry, survives browser close
2. **Session Storage** (fallback) - Single session only
3. **Memory** (final fallback) - Lost on page reload

**Schema Version:** 1 (supports future migrations)

### Filter State (React Context)

**FilterContext.tsx**:
```typescript
// Manages adventure filter state
interface FilterState {
  difficulty: string[]        // easy, moderate, difficult
  season: string[]            // spring, summer, fall, winter
  elevation: [min, max]       // 0-5000 ft
  gear: string[]              // fishing, camping, kayaking, etc.
  suitability: string[]       // kid-friendly, dog-friendly, etc.
}

// Context provides
state: FilterState
dispatch: (action) => void
filteredAdventures: Adventure[]
activeFilterCount: number
```

**URL Synchronization:**
- Filters sync to URL params (`?difficulty=easy&season=summer`)
- Enables shareable URLs
- Restores state on page reload

---

## Pages & Routing

### Dynamic Route Files

| Route | File | Data Source | Purpose |
|-------|------|-------------|---------|
| `/adventures/` | `adventures/index.astro` | Content collection (markdown) | Browse all adventures with filters |
| `/near/` | `near/index.astro` | Hardcoded array | Geographic listing |
| `/near/lake/[slug]/` | `near/lake/[slug].astro` | `src/data/lakes/*.ts` | Individual lake page |
| `/near/wma/[slug]/` | `near/wma/[slug].astro` | `src/data/wma/*.ts` | Wildlife Management Area |
| `/near/campground/[slug]/` | `near/campground/[slug].astro` | `src/data/campgrounds/*.ts` | Campground listings |
| `/near/river/[slug]/` | `near/river/[slug].astro` | `src/data/rivers/*.ts` | River guide |
| `/near/state-park/[slug]/` | `near/state-park/[slug].astro` | `src/data/state-parks/*.ts` | State park details |
| `/backcountry/[slug]/` | `backcountry/[slug].astro` | `src/data/backcountry/*.ts` | Wilderness guides |
| `/historic/[slug]/` | `historic/[slug].astro` | `src/data/historic/*.ts` | Historic sites |

### Static Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `index.astro` | Homepage |
| `/shop/` | `shop/index.astro` | Product listing |
| `/shop/[category]/` | `shop/[category].astro` | Category page |
| `/shop/[category]/[product]/` | `shop/[category]/[product].astro` | Product detail |
| `/checkout` | `checkout.astro` | Checkout page |
| `/guides/` | `guides/index.astro` | Guide listing |
| `/guides/buck-season` | `guides/buck-season.astro` | Hunting guide |
| `/guides/turkey-season` | `guides/turkey-season.astro` | Turkey guide |
| `/guides/hunting-districts` | `guides/hunting-districts.astro` | District guide |
| `/contact` | `contact.astro` | Contact form |
| `/faq` | `faq.astro` | FAQ page |
| `/privacy` | `privacy.astro` | Privacy policy |
| `/terms` | `terms.astro` | Terms of service |
| `/story` | `story.astro` | Brand story |
| `/subscribe` | `subscribe.astro` | Newsletter |
| `/ffl-transfers` | `ffl-transfers.astro` | FFL program info |
| `/ffl-transfer-request` | `ffl-transfer-request.astro` | FFL request form |

### Dynamic Data Loading

**Pattern: `import.meta.glob()` for auto-discovery**
```typescript
// Discovers all lake files automatically
const dataModules = import.meta.glob('../../../data/lakes/*.ts', { eager: true });

// getStaticPaths extracts file names → slugs
const slugs = Object.keys(dataModules).map(path => {
  const filename = path.split('/').pop().replace('.ts', '');
  return { params: { slug: filename } };
});
```

**Benefits:**
- No hardcoded paths
- Auto-discovery of new files
- Scalable for hundreds of destinations

---

## Data System

### Content Collection Schema

**Location:** `src/content/adventures/*.md`

**Frontmatter:**
```yaml
---
title: "Destination - Subtitle"
description: "SEO description"
season: [spring, summer, fall, winter]
difficulty: easy|moderate|difficult
location: "Location, County"
coordinates:
  lat: 38.0000
  lng: -80.0000
drive_time: "45 min"
suitability: [kid-friendly, dog-friendly, wheelchair-accessible]
gear: [WV fishing license, camping gear, fishing rod]
type: lake|wma|campground|river|historic|backcountry|ski|state-park
images:
  - src: /images/{type}/{slug}-hero.webp
    alt: Descriptive text
    caption: Optional caption
kim_hook: "Kim's personal tip"
---
# Markdown content body
```

### Data File Structure

**Example:** `src/data/lakes/sutton.ts`
```typescript
import type { LakeTemplateProps } from '@/types/lake-template';

export const sutton: LakeTemplateProps = {
  // Core info
  slug: 'sutton',
  name: 'Sutton Lake',
  type: 'Lake',

  // Location & access
  county: 'Braxton',
  acreage: 1,433,
  coordinates: {
    lat: 38.6512,
    lng: -80.6789
  },

  // Fishing
  fishSpecies: ['largemouth-bass', 'walleye', 'white-crappie'],
  fishingRegulations: 'West Virginia DNR standards',

  // Facilities
  marinas: [{ name: 'Sutton Marina', phone: '304-765-5631' }],
  boatRamps: 3,
  campgrounds: ['Sutton Lake Campground'],

  // Nearby cross-links
  nearbyWMA: 'Sutton Wildlife Management Area',
  nearbyHistoric: ['Bulltown Historic Area'],
  nearbyRivers: ['Williams River'],

  // Rich content
  bestTimeToVisit: 'Spring-Fall',
  images: [...],
  safetyNotes: '...'
};
```

### Type System (33+ type definitions)

**Core Types:**
- `Adventure` - Content collection entry
- `Product` - E-commerce product
- `CartItem` - Shopping cart line item

**Template Types:**
- `LakeTemplateProps`
- `WMATemplateProps`
- `CampgroundTemplateProps`
- `RiverTemplateProps`
- `StateParkTemplateProps`
- `BackcountryTemplateProps`
- `HistoricTemplateProps`
- `SkiTemplateProps`
- `CaveTemplateProps`

**Component Types:**
- `CartSummaryData` - Cart summary info
- `CheckoutFormData` - Checkout form state
- `FilterState` - Adventure filters
- `Coordinates` - Geographic coordinates

**Validation Types:**
- `FulfillmentType` - 'ship_or_pickup' | 'pickup_only' | 'reserve_hold'
- `StockLevel` - 'in_stock' | 'low_stock' | 'out_of_stock'
- `AgeRestriction` - 18 | 21

---

## Interactive Features

### 1. Adventures Hub Filter System

**User Flow:**
1. User selects filters (difficulty, season, elevation, gear, suitability)
2. FilterContext reducer updates state
3. URL parameters sync (`?difficulty=easy&season=summer`)
4. `filterAdventures()` re-evaluates matches
5. FilteredGrid re-renders with staggered animation
6. ARIA live region announces "Showing X of Y"

**Technical Stack:**
- React Context + useReducer
- Memoized filter calculations
- URL state persistence
- Motion-safe CSS animations

**Accessibility:**
- ARIA live regions for results changes
- Keyboard-navigable radio/checkbox inputs
- Focus management in mobile sheet
- Screen reader support for all filters

### 2. Shopping Cart System

**Features:**
- Real-time item count badge
- Slide-out drawer (Sheet UI)
- Line item management (add/remove/quantity)
- Subtotal calculation
- Persistence across browser sessions (IndexedDB)
- Age restriction validation
- State restriction checks (firearms)
- FFL reserve workflow

**State Flow:**
```
User clicks "Add to Cart"
  → Validation (age, state, fulfillment)
  → addItem() → nanostores update
  → $cartItems, $itemCount, $subtotal update
  → CartIcon re-renders with count
  → CartDrawer updates subtotal
  → localStorage/IndexedDB persists
```

### 3. Multi-Step Checkout

**Steps:**
1. Contact Info (name, email, phone)
2. Fulfillment (ship vs. pickup)
3. Payment (Tactical Payments integration)
4. Confirmation

**Conditional Logic:**
- Shipping address required only if fulfillment='ship'
- Tax calculated based on ship state
- Firearms agreement required if cart has firearms
- Age verification for restricted items
- State restrictions enforced (federal law compliance)

**Validation:**
- Email format (RFC 5322)
- Phone format (flexible: (304) 555-1234, 304-555-1234, etc.)
- ZIP code (exactly 5 digits)
- Shipping address (5-100 characters)

### 4. Adventure Filtering

**Filter Types:**

| Filter | Type | Options | Default |
|--------|------|---------|---------|
| Difficulty | Checkbox | easy, moderate, difficult | All |
| Season | Checkbox | spring, summer, fall, winter | All |
| Elevation | Range Slider | 0-5000 ft (100 ft steps) | 0-5000 |
| Gear | Checkbox | fishing, camping, kayaking, biking, climbing, skiing | All |
| Suitability | Checkbox | kid-friendly, dog-friendly, wheelchair-accessible | All |

**Filter Matching:**
- OR within filter (easy OR moderate)
- AND between filters (easy AND spring AND dog-friendly)
- Elevation uses range comparison (between min AND max)

### 5. Cross-Linking System (SPEC-24)

**Purpose:** Auto-discover nearby destinations

**Implementation:**
- Turf.js Haversine distance calculation
- Geographic proximity matching
- Dynamic template sections
- Automatic URL generation

**Example:**
```typescript
// In LakeTemplate.astro
const nearbyWMAs = findNearbyDestinations(
  coordinates,
  3, // Max 3 results
  25 // Max 25 km distance
);
```

**Output:**
```html
<NearbyDestinationsSection>
  <a href="/near/wma/sutton/">Sutton WMA (8.3 km)</a>
  <a href="/near/campground/bulltown/">Bulltown Campground (12 km)</a>
</NearbyDestinationsSection>
```

---

## Form Handling & Validation

### Checkout Validation (Zod)

**Contact Schema:**
```typescript
z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(phonePattern),
})
```

**Address Schema (Conditional):**
```typescript
z.object({
  street: z.string().min(5).max(100),
  apt: z.string().optional(),
  city: z.string().min(2).max(50),
  state: z.string().length(2),
  zip: z.string().regex(zipPattern),
})
```

**Integration with react-hook-form:**
```typescript
const form = useForm<CheckoutFormData>({
  resolver: zodResolver(checkoutSchema),
  defaultValues: {...}
});

form.watch('fulfillment') // Reactive validation based on fulfillment choice
form.handleSubmit(onSubmit) // Validation before submission
```

**Custom Validators:**
- `validateFirearmAgreement()` - Requires consent for firearms
- `validateStateRestriction()` - Federal firearms law compliance
- `validateLongGunState()` - State-specific restrictions

### Filter URL Sync (Advanced)

**Encoding:**
```typescript
// Filter state
{ difficulty: ['easy', 'moderate'], season: ['spring'], elevation: [0, 2500] }

// URL parameters
?difficulty=easy,moderate&season=spring&elevation=0-2500

// Decoding on page load
const urlState = parseUrlParams();
return { ...INITIAL_STATE, ...urlState };
```

**Benefits:**
- Shareable URLs
- Back button support
- Direct-link filtering
- SEO-friendly parameters

---

## Libraries & Integrations

### External Libraries

| Package | Version | Purpose | Status |
|---------|---------|---------|--------|
| Astro | 5.16 | Static site generation | Active |
| React | 19.2 | UI components | Active |
| react-hook-form | 7.68 | Form state | Active |
| Zod | 3.25 | Validation | Active |
| Tailwind | 4.1 | Styling | Active |
| nanostores | 1.1 | State management | Active |
| Radix UI | Multiple | Headless components | Active |
| lucide-react | 0.561 | Icons | Active |
| @turf/turf | 7.3 | Geospatial | Active |
| sonner | 2.0 | Toast notifications | Active |
| react-slider | 2.0 | Range sliders | Active |

### APIs & Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| Tactical Payments | Payment processing | Integrated in PaymentSection.tsx |
| IndexedDB | Cart persistence | Primary storage |
| localStorage | Fallback persistence | Session storage fallback |
| Schema.org | SEO markup | 8 schema types implemented |

---

## Testing Architecture

### Unit Testing (Vitest)

**Coverage:**
- Filter matching logic
- Cart operations
- Cross-link calculations
- Validation schemas
- Type guards

**Example Test:**
```typescript
describe('filterAdventures', () => {
  it('filters by difficulty', () => {
    const adventures = [...];
    const state = { difficulty: ['easy'], ... };
    const result = filterAdventures(adventures, state);
    expect(result).toHaveLength(3);
  });
});
```

### E2E Testing (Playwright)

**Test Suites:**
- `/tests/e2e/` - User flow tests (navigation, checkout)
- `/tests/accessibility/` - Axe Core accessibility scans
- `/tests/performance/` - Lighthouse performance
- `/tests/validation/` - Acceptance criteria

**Example Test:**
```typescript
test('checkout flow', async ({ page }) => {
  await page.goto('/shop');
  await page.click('[data-test="add-to-cart"]');
  await page.click('[data-test="checkout"]');
  await page.fill('input[name="firstName"]', 'John');
  // ... complete checkout
  await expect(page).toHaveURL('/order-confirmation');
});
```

### Accessibility Testing (Axe)

**Automated Checks:**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA usage

**Tests:**
```bash
npm run test:accessibility
npm run test:compliance:fonts
npm run test:compliance:colors
npm run test:compliance:border
```

---

## Performance Optimizations

### Image Optimization

**Strategy:**
- WebP format with fallback
- Responsive srcsets
- Lazy loading
- BlurUpImage component for LQIP

**Script:**
```bash
npm run optimize-images  # sharp-based optimization
```

### Bundle Optimization

- React-only for interactive islands
- Astro static generation (no JS by default)
- Code splitting by route
- Tree-shaking of unused code

### Caching Strategy

- HTTP caching for assets
- Service worker ready (future)
- IndexedDB for cart (7-day TTL)
- URL param caching for filter state

---

## Data Flow Diagrams

### Adventures Hub Filter Flow

```
User Input (Difficulty, Season, Elevation, Gear, Suitability)
    ↓
FilterContext Reducer (SET_FILTER action)
    ↓
State Update
    ↓
URL Sync (querystring update)
    ↓
Memoized filterAdventures()
    ↓
FilteredGrid Re-render
    ↓
Staggered Animation (100ms per item)
    ↓
ARIA Live Announcement
```

### Cart Flow

```
Add to Cart Button Click
    ↓
Validation (Age, State, Fulfillment)
    ↓
addItem() → nanostores update
    ↓
$cartItems (Record update)
$itemCount (recomputed)
$subtotal (recomputed)
$summary (recomputed)
    ↓
IndexedDB Save (async)
    ↓
CartIcon Badge Update
CartDrawer Refresh
    ↓
Toast Notification ("Added to cart")
```

### Checkout Flow

```
CheckoutForm Component Mount
    ↓
useForm() with Zod validation
    ↓
User Fills Contact Info
    ↓
form.watch('fulfillment') triggers conditional validation
    ↓
If fulfillment='ship':
  - Show shipping address fields
  - Validate address fields
  - Calculate shipping cost
    ↓
User Agrees to Firearms (if applicable)
    ↓
Calculate Tax (based on state + fulfillment type)
    ↓
Calculate Total (subtotal + shipping + tax)
    ↓
User Submits
    ↓
createOrder() → Tactical Payments
    ↓
Order Confirmation Page
```

---

## Type Safety & TypeScript

### Strict Mode

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Guard Utilities

**Location:** `src/lib/type-guards/`

- `isAdventure(obj)` - Type guard for Adventure
- `isCartItem(obj)` - Type guard for CartItem
- `isFulfillmentType(val)` - Type guard for FulfillmentType

### Generic Component Patterns

```typescript
// Generic Adventure Section
interface AdventureSectionProps<T> {
  data: T;
  template?: (item: T) => React.ReactNode;
}

export function AdventureSection<T>({ data, template }: AdventureSectionProps<T>) {
  return (
    <section>
      {Array.isArray(data) ? data.map(template) : template(data)}
    </section>
  );
}
```

---

## Key Design Patterns

### 1. **React Context + useReducer (Filters)**
Centralized filter state with URL synchronization.

### 2. **Nanostores (Cart)**
Lightweight, framework-agnostic state management with persistence.

### 3. **React Hook Form + Zod (Checkout)**
Type-safe form validation with error messages in Kim's voice.

### 4. **Template Components (Destinations)**
Reusable Astro components for consistent destination pages.

### 5. **Dynamic Routes via import.meta.glob()**
Auto-discovery of data files without hardcoding paths.

### 6. **Error Boundaries (Cart, Categories)**
Graceful fallback UI for component failures.

### 7. **ARIA Live Regions (Filters, Cart)**
Real-time accessibility announcements for screen reader users.

### 8. **Conditional Rendering (Checkout)**
Show/hide address fields based on fulfillment choice.

---

## WVWO Aesthetic Implementation

### Typography
- **Display:** Bitter (serif, Kim's authentic voice)
- **Hand:** Permanent Marker (personal touches)
- **Body:** Noto Sans (readable, friendly)

### Colors
- **Brand Brown:** #3E2723 (rifle stocks, barn wood)
- **Sign Green:** #2E7D32 (old metal signs, forest)
- **Brand Cream:** #FFF8E1 (aged paper, deer hide)
- **Brand Orange:** #FF6F00 (blaze orange CTAs only, <5% of screen)

### Design Rules
- Sharp corners: `rounded-sm` ONLY
- Typography: Bold weights 700-900
- No marketing buzzwords ("Unlock," "Seamless," "Revolutionize")
- Authentic rural WV voice in all copy

### WVWO Components Checklist
- Zero forbidden fonts (Inter, Poppins, DM Sans)
- Zero purple/pink/neon colors
- Zero glassmorphism or backdrop-blur
- Zero rounded-lg/md/xl (only rounded-sm)
- Voice matches Kim's persona (direct, humble, faith-forward)

---

## Development Workflows

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Testing
npm run test          # Run all tests
npm run test:run      # Single run
npm run test:checkout # Checkout-specific tests

# E2E Testing
npm run test:e2e
npm run test:accessibility
npm run test:performance
npm run test:validation

# Compliance Testing
npm run test:compliance:fonts
npm run test:compliance:colors
npm run test:compliance:border

# Image optimization
npm run optimize-images
```

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Astro components | PascalCase.astro | `HistoricHero.astro` |
| React components | PascalCase.tsx | `CartDrawer.tsx` |
| Utilities | kebab-case.ts | `cross-links.ts` |
| Types | kebab-case.ts | `lake-template.ts` |
| Data files | kebab-case.ts | `stonewall-jackson.ts` |
| Tests | *.test.ts or *.spec.ts | `cross-links.test.ts` |
| Styles | Global in src/styles | `globals.css` |

### Git Workflow

```bash
# Feature branch
git checkout -b spec-25-new-feature

# Work and commit
git add .
git commit -m "feat: Add feature description"

# Push and create PR
git push origin spec-25-new-feature

# PR checklist
- Tests passing
- Type checking passing
- Accessibility compliance
- WVWO aesthetic compliance
- Documentation updated
```

---

## Scaling Considerations

### Adding a New Destination Type

1. **Create Type Definition**
   ```typescript
   // src/types/new-type.ts
   export interface NewTypeTemplateProps { ... }
   ```

2. **Create Data File**
   ```typescript
   // src/data/new-type/example.ts
   export const example: NewTypeTemplateProps = { ... }
   ```

3. **Create Template Component**
   ```astro
   <!-- src/components/templates/NewTypeTemplate.astro -->
   ```

4. **Create Dynamic Route**
   ```astro
   <!-- src/pages/near/new-type/[slug].astro -->
   ```

5. **Update AdventureCard.tsx**
   - Add case in `getAdventureUrl()` switch

6. **Update Content Collection Config**
   - Add type to `content.config.ts` enum

7. **Create Content Entry**
   ```markdown
   <!-- src/content/adventures/example.md -->
   ---
   type: new-type
   ...
   ---
   ```

### Scaling the Product Catalog

- Product data stored in separate system (referenced in types)
- Category discovery via `import.meta.glob()`
- Product grid supports pagination (future enhancement)
- Cart scales to hundreds of items (nanostores optimization)

### Performance at Scale

- **Lighthouse targets:** 90+ performance score
- **Bundling:** Esbuild for fast builds
- **Image optimization:** Sharp-based processing
- **Code splitting:** Per-route CSS & JS
- **Caching:** HTTP headers + IndexedDB for cart

---

## Known Limitations & Future Enhancements

### Current Limitations

1. **No User Accounts** - Orders stored in localStorage only
2. **No Real Payment Gateway** - Tactical Payments integration placeholder
3. **No Inventory Sync** - Manual stock updates required
4. **No Analytics Integration** - Window.trackCartEvent defined but not wired
5. **No Service Worker** - Offline support partial (OfflineBanner only)

### Planned Enhancements

1. **User Accounts** - Auth0 or similar
2. **Real-time Inventory** - Database sync
3. **Order History** - User dashboard
4. **Advanced Search** - Elasticsearch integration
5. **Recommendations** - ML-based suggestions
6. **Live Chat** - Customer support widget
7. **Analytics** - Google Analytics 4 integration
8. **A/B Testing** - Variant testing framework

---

## Summary: Complete UI Inventory

### Interactive Components: 45+
- Cart system (6)
- Checkout system (9)
- Filter system (7)
- Adventures hub (2)
- Shop components (2)
- Modals & sheets (3)
- Forms (2)
- Notifications (1)
- Sliders (1)
- Other (12)

### Astro Template Components: 80+
- Destination sections (24)
- Adventure sections (10)
- Layout (7)
- Hero/banners (3)
- Skeletons (4)
- SEO (8)
- Pages (24)

### Available Libraries
- Radix UI (13 components)
- lucide-react (100+ icons)
- react-hook-form
- Zod validation
- Turf.js geospatial
- sonner notifications
- react-slider

### Data Integration
- 50+ type definitions
- 40+ dynamic routes
- Automatic file discovery
- Geographic cross-linking
- Schema.org markup (8 types)

---

## Conclusion

WVWO Storefront is a **sophisticated hybrid platform** combining:
- **Adventure Discovery** (filtering, educational content, cross-linking)
- **E-Commerce** (shopping, checkout, compliance)
- **Brand Experience** (authentic WVWO voice, rural aesthetic)

The architecture prioritizes **type safety, accessibility, performance, and authentic storytelling** while providing a **flexible foundation for scaling** to hundreds of destinations and thousands of products.

**Total Codebase:** 2,100+ files | **Components:** 125+
**Type Definitions:** 33+ | **Routes:** 40+ | **Test Suites:** 5+
**Modern Stack:** Astro 5.16 + React 19 + TypeScript 5.9 + Tailwind 4.1
