# WVWO Component Inventory & Quick Reference

**Last Updated:** January 13, 2026
**Purpose:** Quick lookup for all interactive components and UI elements

---

## React Interactive Components (45+)

### 🛒 Shopping Cart (6 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **CartDrawer** | `CartDrawer.tsx` | Slide-out cart panel | `isOpen`, `setIsOpen` |
| **CartIcon** | `CartIcon.tsx` | Cart badge in header | N/A |
| **CartItem** | `CartItem.tsx` | Line item (add/remove/qty) | `item`, `onRemove`, `onUpdateQty` |
| **CartSummary** | `CartSummary.tsx` | Subtotal & shipping preview | `summary` |
| **AddToCartButton** | `AddToCartButton.tsx` | "Add to cart" CTA | `product`, `onSuccess` |
| **HeaderCart** | `HeaderCart.tsx` | Cart display in header | N/A |

**State Management:** nanostores ($cartItems, $isCartOpen, $subtotal)
**Persistence:** IndexedDB (7-day TTL) + session fallback

---

### 💳 Checkout (9 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **CheckoutForm** | `CheckoutForm.tsx` | Master checkout orchestrator | N/A |
| **CheckoutProgress** | `CheckoutProgress.tsx` | 3-step progress indicator | `currentStep` |
| **ContactSection** | `ContactSection.tsx` | Name/email/phone form | `form` |
| **FulfillmentSection** | `FulfillmentSection.tsx` | Ship vs. pickup choice | `form`, `fulfillmentOptions` |
| **OrderSummary** | `OrderSummary.tsx` | Item list + pricing | `items`, `subtotal`, `tax`, `shipping` |
| **PaymentSection** | `PaymentSection.tsx` | Payment processing | `onSubmit` |
| **FirearmAgreement** | `FirearmAgreement.tsx` | Firearms compliance checkbox | `form` |
| **OrderConfirmation** | `OrderConfirmation.tsx` | Success page | `order` |

**Validation:** Zod schemas with Kim's voice error messages
**Integration:** Tactical Payments (placeholder)

---

### 🎯 Adventure Filters (7 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **AdventuresHub** | `AdventuresHub.tsx` | Master filter container | `adventures` |
| **FilterBar** | `FilterBar.tsx` | Desktop sidebar filters | N/A |
| **FilteredGrid** | `FilteredGrid.tsx` | Results grid | N/A |
| **DifficultyFilter** | `DifficultyFilter.tsx` | Radio group (easy/moderate/difficult) | N/A |
| **SeasonFilter** | `SeasonFilter.tsx` | Multi-checkbox (spring/summer/fall/winter) | N/A |
| **GearFilter** | `GearFilter.tsx` | Equipment checkboxes | N/A |
| **SuitabilityFilter** | `SuitabilityFilter.tsx` | Accessibility checkboxes | N/A |
| **ElevationSlider** | `ElevationSlider.tsx` | Dual-thumb range (0-5000 ft) | N/A |
| **MobileFiltersSheet** | `MobileFiltersSheet.tsx` | Mobile bottom-sheet filters | N/A |
| **OfflineBanner** | `OfflineBanner.tsx` | Offline detection | N/A |
| **EmptyState** | `EmptyState.tsx` | No-results fallback | N/A |

**State Management:** React Context + useReducer
**Features:** URL sync, memoized filtering, ARIA live regions

---

### 📦 Shop Components (2 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **CategoryShowcase** | `CategoryShowcase.tsx` | Category grid with staggered animation | `categories` |
| **ProductCard** | `ProductCard.astro` | Product card (Astro) | `product` |

---

### 🎨 UI Library (13 Radix/shadcn components)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **Button** | `ui/button.tsx` | Styled button | `variant`, `size`, `disabled` |
| **Card** | `ui/card.tsx` | Card container | `className` |
| **Accordion** | `ui/accordion.tsx` | Collapsible sections | `items`, `value` |
| **Alert** | `ui/alert.tsx` | Alert box | `variant` |
| **Badge** | `ui/badge.tsx` | Tag/label | `variant` |
| **Checkbox** | `ui/checkbox.tsx` | Checkbox input | `checked`, `onChange` |
| **Input** | `ui/input.tsx` | Text input | `type`, `placeholder` |
| **Label** | `ui/label.tsx` | Form label | `htmlFor` |
| **RadioGroup** | `ui/radio-group.tsx` | Radio buttons | `value`, `onValueChange` |
| **Select** | `ui/select.tsx` | Dropdown | `options`, `value` |
| **Separator** | `ui/separator.tsx` | Divider | `orientation` |
| **Sheet** | `ui/sheet.tsx` | Slide-out panel | `open`, `onOpenChange`, `side` |
| **Sonner** | `ui/sonner.tsx` | Toast notifications | `message`, `type` |

**Styling:** Tailwind + CVA (class-variance-authority)
**Framework:** Radix UI headless components

---

### 🎬 Layout & Content (10 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **Header** | `Header.astro` | Main navigation + cart | N/A |
| **Footer** | `Footer.astro` | Site footer | N/A |
| **Hero** | `Hero.astro` | Hero banner | `title`, `subtitle`, `image` |
| **Breadcrumb** | `Breadcrumb.astro` | Breadcrumb nav | `items` |
| **Testimonials** | `Testimonials.astro` | Customer quotes | N/A |
| **StorySection** | `StorySection.astro` | Brand narrative | N/A |
| **OwnerIntro** | `OwnerIntro.astro` | Kim's intro | N/A |
| **Services** | `Services.astro` | Service listing | N/A |
| **CategoryGrid** | `CategoryGrid.astro` | Product categories | N/A |
| **InventoryGrid** | `InventoryGrid.astro` | Product listing | `products` |

---

### 📋 Forms & CTAs (4 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **QuoteForm** | `QuoteForm.astro` | Request quote form | N/A |
| **EmailCapture** | `EmailCapture.astro` | Newsletter signup | N/A |
| **GuideBanner** | `GuideBanner.tsx` | Seasonal guide callout | `guide` |
| **Visit** | `Visit.astro` | Visit planning | N/A |

---

### 🛡️ Utilities (3 files)
| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **CartErrorBoundary** | `CartErrorBoundary.tsx` | Error fallback | `children` |
| **ContactStrip** | `ContactStrip.astro` | Phone/email strip | N/A |
| **StickyPhone** | `StickyPhone.astro` | Sticky phone CTA | N/A |

---

## Astro Destination Templates (9 files)

| Template | File | Route | Data Source | Sections |
|----------|------|-------|-------------|----------|
| **Lake** | `LakeTemplate.astro` | `/near/lake/[slug]/` | `src/data/lakes/*.ts` | Hero, species, marinas, camping, nearby |
| **WMA** | `WMATemplate.astro` | `/near/wma/[slug]/` | `src/data/wma/*.ts` | Hero, species, access points, nearby |
| **Campground** | `CampgroundTemplate.astro` | `/near/campground/[slug]/` | `src/data/campgrounds/*.ts` | Hero, sites, amenities, fees, nearby |
| **River** | `RiverTemplate.astro` | `/near/river/[slug]/` | `src/data/rivers/*.ts` | Hero, rapids, put-ins, outfitters, nearby |
| **State Park** | `StateParkTemplate.astro` | `/near/state-park/[slug]/` | `src/data/state-parks/*.ts` | Overview, activities, facilities, reservations, nearby |
| **Backcountry** | `BackcountryTemplate.astro` | `/backcountry/[slug]/` | `src/data/backcountry/*.ts` | Hero, safety, water, cell coverage, emergency |
| **Historic** | `HistoricTemplate.astro` | `/historic/[slug]/` | `src/data/historic/*.ts` | Hero, context, exhibits, tours, nearby |
| **Ski** | `SkiTemplate.astro` | `/near/ski/[slug]/` | `src/data/ski/*.ts` | Hero, trails, lifts, conditions |
| **Cave** | `CaveTemplate.astro` | `/near/cave/[slug]/` | `src/data/caves/*.ts` | Hero, tours, geology |

---

## Astro Specialized Sections (24 files)

### Historic Site Sections (8)
| Component | File | Purpose |
|-----------|------|---------|
| **HistoricHero** | `historic/HistoricHero.astro` | Hero with image |
| **HistoricalContextSection** | `historic/HistoricalContextSection.astro` | Timeline & narrative |
| **ExhibitsSection** | `historic/ExhibitsSection.astro` | Museum exhibits |
| **ToursSection** | `historic/ToursSection.astro` | Tour options |
| **EducationalProgramsSection** | `historic/EducationalProgramsSection.astro` | Educational programs |
| **PreservedStructuresSection** | `historic/PreservedStructuresSection.astro` | Historic buildings |
| **VisitorInfoSection** | `historic/VisitorInfoSection.astro` | Hours, fees, contact |
| **NearbyHistorySection** | `historic/NearbyHistorySection.astro` | Related historic sites |

### State Park Sections (4)
| Component | File | Purpose |
|-----------|------|---------|
| **ParkOverviewSection** | `state-park/ParkOverviewSection.astro` | Park summary |
| **ActivitiesSection** | `state-park/ActivitiesSection.astro` | Activity listings |
| **FacilitiesSection** | `state-park/FacilitiesSection.astro` | Amenities grid |
| **ReservationSection** | `state-park/ReservationSection.astro` | Booking info |

### Adventure Sections (10)
| Component | File | Purpose |
|-----------|------|---------|
| **AdventureHero** | `adventure/AdventureHero.astro` | Hero with badge |
| **AdventureCTA** | `adventure/AdventureCTA.astro` | Shop/booking CTA |
| **AdventureFeatureSection** | `adventure/AdventureFeatureSection.astro` | Key highlights |
| **AdventureQuickStats** | `adventure/AdventureQuickStats.astro` | Quick info |
| **AdventureGettingThere** | `adventure/AdventureGettingThere.astro` | Directions & parking |
| **AdventureCampingList** | `adventure/AdventureCampingList.astro` | Campground listings |
| **AdventureAmenitiesGrid** | `adventure/AdventureAmenitiesGrid.astro` | Amenity icons |
| **AdventureGearChecklist** | `adventure/AdventureGearChecklist.astro` | "What to bring" |
| **AdventureWhatToFish** | `adventure/AdventureWhatToFish.astro` | Fish species & methods |
| **AdventureWhatToHunt** | `adventure/AdventureWhatToHunt.astro` | Game species & seasons |

### Backcountry Sections (2)
| Component | File | Purpose |
|-----------|------|---------|
| **CellCoverageSection** | `backcountry/CellCoverageSection.astro` | Signal map |
| **EmergencyContactsSection** | `backcountry/EmergencyContactsSection.astro` | SAR contacts |
| **WaterSafetySection** | `backcountry/WaterSafetySection.astro` | Water hazards |

---

## Astro SEO & Schema Components (8 files)

| Component | File | Purpose | Schema Type |
|-----------|------|---------|-------------|
| **SchemaAdventureHero** | `seo/SchemaAdventureHero.astro` | Event schema | Event |
| **SchemaBackcountryTemplate** | `seo/SchemaBackcountryTemplate.astro` | Place schema | Place |
| **SchemaBreadcrumb** | `seo/SchemaBreadcrumb.astro` | Breadcrumb markup | BreadcrumbList |
| **SchemaEvent** | `seo/SchemaEvent.astro` | Event details | Event |
| **SchemaEventSeries** | `seo/SchemaEventSeries.astro` | Event series | EventSeries |
| **SchemaFAQ** | `seo/SchemaFAQ.astro` | FAQ markup | FAQPage |
| **SchemaHistoricTemplate** | `seo/SchemaHistoricTemplate.astro` | Museum schema | Place, Museum |
| **SchemaRiverTemplate** | `seo/SchemaRiverTemplate.astro` | Place schema | Place |
| **SchemaStateParkTemplate** | `seo/SchemaStateParkTemplate.astro` | Park schema | Place, Park |

---

## Skeleton Loaders (4 files)

| Component | File | Purpose | Use Case |
|-----------|------|---------|----------|
| **TimelineSkeleton** | `skeletons/TimelineSkeleton.astro` | Timeline placeholder | Historic timeline loading |
| **EventCardsSkeleton** | `skeletons/EventCardsSkeleton.astro` | Event cards placeholder | Event list loading |
| **TourCardsSkeleton** | `skeletons/TourCardsSkeleton.astro` | Tour cards placeholder | Tour list loading |
| **StructureCardsSkeleton** | `skeletons/StructureCardsSkeleton.astro` | Building cards placeholder | Structure list loading |

---

## Routes Overview (40+)

### Dynamic Routes
```
/adventures/          → All adventures with filters
/near/               → Geographic listing
/near/lake/[slug]/   → Individual lake page
/near/wma/[slug]/    → Wildlife Management Area
/near/campground/[slug]/ → Campground details
/near/river/[slug]/  → River guide
/near/state-park/[slug]/ → State park details
/backcountry/[slug]/ → Wilderness guides
/historic/[slug]/    → Historic sites
```

### Shop Routes
```
/shop/               → Product listing
/shop/[category]/    → Category page
/shop/[category]/[product]/ → Product detail
/checkout            → Checkout page
/order-confirmation  → Success page
```

### Content Routes
```
/guides/             → Guide listing
/guides/buck-season  → Buck hunting guide
/guides/turkey-season → Turkey hunting guide
/guides/hunting-districts → District guide
/ffl-transfers       → FFL program info
/ffl-transfer-request → FFL request form
/ffl-transfer-success → FFL success page
```

### Static Pages
```
/                    → Homepage
/story               → Brand story
/contact             → Contact form
/faq                 → FAQ page
/subscribe           → Newsletter signup
/privacy             → Privacy policy
/terms               → Terms of service
/404                 → Not found
```

---

## State Management Reference

### Cart Store (nanostores)
```typescript
// Atoms
$cartItems          // Record<productId, CartItem>
$isCartOpen         // boolean
$itemCount          // number (computed)
$subtotal           // number in cents (computed)
$summary            // CartSummaryData (computed)
$persistenceMode    // 'persistent' | 'session'
$cartRestoreError   // Error message or null
$cartPersistenceWarning // Warning message or null

// Actions
addItem(product)
removeItem(productId)
updateQuantity(productId, quantity)
clearCart()
openCart() / closeCart() / toggleCart()
clearCartRestoreError()
clearCartPersistenceWarning()
```

### Filter Context (React)
```typescript
// State
interface FilterState {
  difficulty: string[]
  season: string[]
  elevation: [number, number]
  gear: string[]
  suitability: string[]
}

// Context
FilterContext provides:
- state: FilterState
- dispatch: (action) => void
- filteredAdventures: Adventure[]
- totalCount: number
- activeFilterCount: number
```

---

## Hooks Reference

### useCart()
```typescript
const {
  state: { items, itemCount, subtotal, isOpen },
  summary,
  isEmpty,
  isOpen,
  setIsOpen,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  persistenceMode,
  cartRestoreError,
  cartPersistenceWarning,
  clearCartRestoreError,
  clearCartPersistenceWarning
} = useCart();
```

### useFilters() (custom context hook)
```typescript
const {
  state: FilterState,
  dispatch: (action) => void,
  filteredAdventures: Adventure[],
  totalCount: number,
  activeFilterCount: number
} = useFilters();
```

### useForm (react-hook-form)
```typescript
const form = useForm<CheckoutFormData>({
  resolver: zodResolver(checkoutSchema),
  defaultValues: { ... }
});

// Methods
form.register(name)
form.watch(name)
form.handleSubmit(onSubmit)
form.formState.errors
form.setValue(name, value)
```

---

## Data Types Quick Reference

### Product Types
```typescript
interface Product {
  id: string
  sku: string
  name: string
  price: number // cents
  fulfillmentType: 'ship_or_pickup' | 'pickup_only' | 'reserve_hold'
  fflRequired: boolean
  ageRestriction?: 18 | 21
  stateRestrictions?: string[]
  // ... more fields
}

interface CartItem extends Product {
  quantity: number
  maxQuantity: number
  priceDisplay: string
}
```

### Adventure Types
```typescript
interface Adventure {
  id: string
  slug: string
  title: string
  description: string
  type: 'lake' | 'wma' | 'campground' | 'river' | 'historic' | ...
  difficulty: 'easy' | 'moderate' | 'difficult'
  season: ('spring' | 'summer' | 'fall' | 'winter')[]
  gear: string[]
  suitability: string[]
  coordinates: { lat: number, lng: number }
  // ... more fields
}
```

### Checkout Types
```typescript
interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  fulfillment: 'ship' | 'pickup'
  street?: string
  apt?: string
  city?: string
  state?: string
  zip?: string
  reserveAgree: boolean
}

interface CartSummaryData {
  itemCount: number
  subtotal: number
  hasShippableItems: boolean
  hasPickupOnlyItems: boolean
  hasFirearms: boolean
  requiresAgeVerification: boolean
  fulfillmentOptions: ('ship' | 'pickup')[]
}
```

---

## Component Usage Patterns

### Adding to Cart
```tsx
import { AddToCartButton } from '@/components/cart/AddToCartButton';

export function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <AddToCartButton
        product={product}
        onSuccess={() => toast.success('Added to cart')}
      />
    </div>
  );
}
```

### Using Filters
```tsx
import { AdventuresHub } from '@/components/adventures/AdventuresHub';

export function AdventuresPage({ adventures }) {
  return (
    <AdventuresHub adventures={adventures} />
  );
}
```

### Checkout Integration
```tsx
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export function CheckoutPage() {
  return <CheckoutForm />;
}
```

### Using Cart Hook
```tsx
import { useCart } from '@/hooks/useCart';

export function CartIcon() {
  const { state, setIsOpen } = useCart();
  return (
    <button onClick={() => setIsOpen(true)}>
      Cart ({state.itemCount})
    </button>
  );
}
```

---

## CSS Classes & Tailwind

### WVWO Color Classes
```
Foreground:
  text-brand-brown      #3E2723
  text-sign-green       #2E7D32
  text-brand-orange     #FF6F00

Background:
  bg-brand-cream        #FFF8E1
  bg-sign-green         #2E7D32
  bg-brand-orange       #FF6F00

Borders:
  border-brand-mud      #757575
  border-brand-brown    #3E2723
```

### WVWO Typography
```
Display (headings):  font-display (Bitter serif)
Hand (accent):       font-hand (Permanent Marker)
Body (text):         font-body (Noto Sans)
```

### WVWO Border Radius
```
Only: rounded-sm (not rounded-md, lg, xl, 3xl)
```

---

## Performance & Optimization

### Image Optimization
```tsx
import { Image } from 'astro:assets';

// Auto-optimized with srcset
<Image
  src={imageFile}
  alt="Description"
  width={800}
  height={600}
/>
```

### Code Splitting
- React components only load on client
- Astro components generate zero JS
- Per-route CSS bundling
- Dynamic imports via `import.meta.glob()`

### Caching
```typescript
// Cart persistence
IndexedDB (7-day TTL) → Session Storage → Memory

// Product data
HTTP cache (server)
Dynamic routes (pre-built static)
```

---

## Testing Quick Reference

### Unit Tests
```bash
npm run test
npm run test:run    # Single pass
npm run test:checkout # Checkout tests only
```

### E2E Tests
```bash
npm run test:e2e
npm run test:accessibility
npm run test:performance
npm run test:validation
```

### Compliance Tests
```bash
npm run test:compliance:fonts
npm run test:compliance:colors
npm run test:compliance:border
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cart not persisting | Check IndexedDB in DevTools, verify localStorage available |
| Filters not syncing URL | Verify FilterContext useEffect for syncStateToUrl |
| Product not adding to cart | Check age/state restrictions, verify product fulfillmentType |
| Checkout validation failing | Verify Zod schema, check error message in form.formState.errors |
| Image not optimizing | Run `npm run optimize-images`, verify sharp installed |
| Build failing | Run `npm run typecheck`, check for TS errors |

---

## File Structure Cheat Sheet

```
Create new destination?
├── 1. Type definition: src/types/new-type.ts
├── 2. Data file: src/data/new-type/example.ts
├── 3. Template: src/components/templates/NewTypeTemplate.astro
├── 4. Route: src/pages/near/new-type/[slug].astro
├── 5. Update AdventureCard.tsx (getAdventureUrl)
├── 6. Update content.config.ts
└── 7. Create markdown: src/content/adventures/example.md

Create new form?
├── 1. Schema: src/components/form/schemas/formSchema.ts (Zod)
├── 2. Component: src/components/form/FormComponent.tsx
├── 3. Page: src/pages/form-page.astro
└── 4. Tests: src/components/form/__tests__/FormComponent.test.ts

Create new UI component?
├── 1. Design tokens in Tailwind config
├── 2. Base component: src/components/ui/component.tsx
├── 3. Tests: src/components/ui/__tests__/component.test.ts
├── 4. Storybook (optional)
└── 5. Documentation
```

---

## Performance Benchmarks

**Target Metrics:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Core Web Vitals: All green
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

**Current Status:** Varies by page; most adventure pages 90+

---

**This inventory is auto-generated and updated regularly.**
**For detailed architecture, see CODEBASE-ARCHITECTURE.md**
