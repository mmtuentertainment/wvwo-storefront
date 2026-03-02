# WVWO Architecture Diagrams

**Visual reference for system architecture, data flow, and component hierarchies**

---

## 1. High-Level Application Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WVWO STOREFRONT (Astro 5.16)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐
│  │   ADVENTURE HUB      │  │    E-COMMERCE        │  │   CONTENT        │
│  │  (Discovery)         │  │   (Shopping)         │  │  (Information)   │
│  │                      │  │                      │  │                  │
│  │ • Filtering          │  │ • Product Catalog    │  │ • Brand Story    │
│  │ • Cross-linking      │  │ • Shopping Cart      │  │ • Guides         │
│  │ • Educational        │  │ • Checkout           │  │ • Contact Info   │
│  │ • Geographic         │  │ • Order Tracking     │  │ • FAQ            │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘
│
│  ┌─────────────────────────────────────────────────────────────────────┐
│  │                      SHARED LAYER                                    │
│  ├─────────────────────────────────────────────────────────────────────┤
│  │ • Header & Navigation                                               │
│  │ • Footer & Legal                                                    │
│  │ • Authentication (future)                                           │
│  │ • SEO & Analytics                                                   │
│  └─────────────────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────────────────┐
│  │                    REACT ISLANDS (Interactive)                       │
│  ├─────────────────────────────────────────────────────────────────────┤
│  │ • FilteredGrid          • CartDrawer          • CheckoutForm         │
│  │ • FilterBar             • AddToCartButton     • PaymentSection       │
│  │ • ElevationSlider       • HeaderCart          • Filters              │
│  │ • CategoryShowcase      • CartSummary                                │
│  └─────────────────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────────────────┐
│  │                    STATE MANAGEMENT LAYER                            │
│  ├─────────────────────────────────────────────────────────────────────┤
│  │                                                                      │
│  │  ┌──────────────────────┐  ┌──────────────────────┐               │
│  │  │  Cart Store (nanostores) │ Filter Context (React)               │
│  │  │                          │                                       │
│  │  │ • $cartItems             │ • difficulty                         │
│  │  │ • $isCartOpen            │ • season                            │
│  │  │ • $subtotal              │ • elevation                         │
│  │  │ • $summary               │ • gear                              │
│  │  │ • Actions:               │ • suitability                       │
│  │  │   - addItem              │ • URL sync                          │
│  │  │   - removeItem           │ • Memoized filtering                │
│  │  │   - updateQuantity       │                                      │
│  │  │   - clearCart            │                                      │
│  │  └──────────────────────┘  └──────────────────────┘               │
│  │                                                                      │
│  └─────────────────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────────────────┐
│  │                    PERSISTENCE LAYER                                 │
│  ├─────────────────────────────────────────────────────────────────────┤
│  │                                                                      │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────────┐  │
│  │  │   IndexedDB     │  │  Session Store  │  │  Local Storage    │  │
│  │  │                 │  │                 │  │  (Cookies)        │  │
│  │  │ • Cart (7-day)  │  │ • Session Cart  │  │ • Preferences     │  │
│  │  │ • Timestamps    │  │ • Session ID    │  │ • Theme           │  │
│  │  │ • Expiry Check  │  │                 │  │                   │  │
│  │  └─────────────────┘  └─────────────────┘  └───────────────────┘  │
│  │                                                                      │
│  └─────────────────────────────────────────────────────────────────────┘
│
│  ┌─────────────────────────────────────────────────────────────────────┐
│  │                    EXTERNAL INTEGRATIONS                             │
│  ├─────────────────────────────────────────────────────────────────────┤
│  │ • Tactical Payments (payment processing)                            │
│  │ • Schema.org (SEO markup)                                           │
│  │ • Google Analytics (future)                                         │
│  │ • Vercel Analytics (performance)                                    │
│  │ • Sitemap generation                                                │
│  └─────────────────────────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Hierarchy - Cart System

```
Header
│
├── CartIcon (badge with count)
│   └── uses: useCart()
│       └── watches: $itemCount
│
└── CartDrawer (Side panel)
    ├── SheetHeader
    │   └── "Your Cart" title
    ├── Alerts (storage errors/warnings)
    ├── ScrollableContent
    │   └── if items.length === 0
    │       └── EmptyState
    │   └── else
    │       └── CartItemRow (for each item)
    │           ├── ProductImage
    │           ├── ProductName
    │           ├── Price
    │           ├── Quantity Controls (- / number / +)
    │           └── RemoveButton
    ├── CartSummary
    │   ├── Subtotal
    │   ├── Shipping estimate
    │   └── Tax estimate
    └── Checkout Button
        └── navigates to /checkout

┌─────────────────────────────────────────┐
│ CART STATE MANAGEMENT                   │
├─────────────────────────────────────────┤
│ nanostores (framework-agnostic)         │
│                                         │
│ $cartItems → {                          │
│   'product-1': {                        │
│     productId, sku, name,               │
│     price, quantity, maxQuantity,       │
│     fulfillmentType, fflRequired        │
│   }                                     │
│ }                                       │
│                                         │
│ $isCartOpen → boolean                   │
│ $itemCount → computed                   │
│ $subtotal → computed                    │
│ $summary → CartSummaryData              │
│                                         │
│ Actions:                                │
│ • addItem(product)                      │
│ • removeItem(productId)                 │
│ • updateQuantity(productId, qty)        │
│ • clearCart()                           │
│ • openCart() / closeCart()              │
│                                         │
│ Persistence:                            │
│ → IndexedDB (7-day TTL)                 │
│ → Session Storage (fallback)            │
│ → Memory (final fallback)               │
└─────────────────────────────────────────┘
```

---

## 3. Checkout Flow Diagram

```
START: /checkout page loads
│
├─ CheckoutForm mounts
│  └─ useForm() initializes with Zod schema
│
├─ Step 1: Contact Information
│  ├─ Fields: firstName, lastName, email, phone
│  ├─ Validation: Zod schema (synchronous)
│  └─ Error display: Kim's voice messages
│
├─ Step 2: Fulfillment Choice
│  ├─ Radio buttons: "Ship" or "Pickup"
│  ├─ If "Ship":
│  │  ├─ Show address fields
│  │  ├─ Calculate shipping cost (state-based)
│  │  └─ Watch shipping state for tax calc
│  ├─ If "Pickup":
│  │  └─ Hide address fields
│  │
│  └─ Conditional validation:
│     └─ address fields ONLY required if fulfillment='ship'
│
├─ (Optional) Step 3: Firearms Agreement
│  ├─ Only shows if cart.hasFirearms
│  ├─ Checkbox: "I agree to comply with all federal and state firearms laws"
│  └─ Validation: MUST be checked if firearms present
│
├─ Step 4: Order Summary & Payment
│  ├─ Display all items
│  ├─ Calculate subtotal
│  ├─ Add shipping cost (if shipping)
│  ├─ Add tax (state-based)
│  ├─ = Total
│  ├─ Payment integration (Tactical Payments)
│  └─ Submit button
│
└─ ON SUBMIT:
   │
   ├─ Validation:
   │  ├─ checkoutSchema.parse(data) → Zod validation
   │  ├─ validateFirearmAgreement() → Custom validator
   │  ├─ validateStateRestriction() → Federal law check
   │  └─ Age verification → Cart restrictions
   │
   ├─ Calculation:
   │  ├─ calculateShipping(state) → $
   │  ├─ calculateTax(subtotal, state, fulfillment) → $
   │  └─ total = subtotal + shipping + tax
   │
   ├─ Order creation:
   │  ├─ createOrder(data, summary) → Order object
   │  ├─ storePendingOrder() → localStorage/IndexedDB
   │  └─ processPayment() → Tactical Payments
   │
   ├─ Success:
   │  ├─ Clear cart
   │  ├─ Clear localStorage
   │  └─ Redirect to /order-confirmation
   │
   └─ Error:
      ├─ Display error message
      ├─ Don't clear cart
      └─ Let user retry
```

---

## 4. Adventures Filter System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADVENTURES PAGE (Astro)                       │
│                                                                   │
│  1. Load content collection (markdown files)                    │
│  2. Pass adventures: Adventure[] to AdventuresHub               │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│          AdventuresHub.tsx (React Island)                        │
│          client:only="react"                                    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ FilterProvider (Context Wrapper)                        │   │
│  │                                                         │   │
│  │ • initializer: parseUrlParams()                        │   │
│  │ • state: FilterState (dispatch via reducer)            │   │
│  │ • filterAdventures: memoized                           │   │
│  │ • syncStateToUrl: on state change                      │   │
│  │ • cleanup: astro:before-swap listener                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│    ┌─────────┐      ┌──────────┐      ┌──────────────┐        │
│    │FilterBar│      │FilteredGrid│  │MobileFiltersSheet│     │
│    │(Desktop)│      │(Results) │  │(Mobile Btn)│    │
│    └─────────┘      └──────────┘      └──────────────┘        │
│         │                 │                  │                  │
│         ├─ DifficultyFilter          ├─ FilteredGrid │        │
│         ├─ SeasonFilter              ├─ FilterBar    │        │
│         ├─ GearFilter                └─ Sheet        │        │
│         ├─ SuitabilityFilter                         │        │
│         └─ ElevationSlider                           │        │
│                         │                             │        │
│                         ▼                             ▼        │
│                   ┌──────────────────────────────────────┐    │
│                   │   FILTER CONTEXT STATE              │    │
│                   ├──────────────────────────────────────┤    │
│                   │ difficulty: ['easy', 'moderate']     │    │
│                   │ season: ['spring', 'summer']         │    │
│                   │ elevation: [0, 2500]                 │    │
│                   │ gear: ['camping', 'fishing']         │    │
│                   │ suitability: ['dog-friendly']        │    │
│                   └──────────────────────────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│                   ┌──────────────────────────────────────┐    │
│                   │   FILTER LOGIC                       │    │
│                   ├──────────────────────────────────────┤    │
│                   │ filterAdventures(adventures, state) │    │
│                   │                                      │    │
│                   │ For each adventure:                  │    │
│                   │ • difficulty includes? ✓            │    │
│                   │ • season includes? ✓                │    │
│                   │ • elevation between? ✓              │    │
│                   │ • gear includes? ✓                  │    │
│                   │ • suitability includes? ✓           │    │
│                   │ → All AND logic                      │    │
│                   └──────────────────────────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│                   ┌──────────────────────────────────────┐    │
│                   │   FILTERED ADVENTURES               │    │
│                   │   Adventure[]                        │    │
│                   │                                      │    │
│                   │ Only adventures matching ALL filters │    │
│                   └──────────────────────────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│                   ┌──────────────────────────────────────┐    │
│                   │ FilteredGrid Component               │    │
│                   ├──────────────────────────────────────┤    │
│                   │ • ARIA live: "Showing X of Y"       │    │
│                   │ • Map filtered → AdventureCard       │    │
│                   │ • Staggered animation (100ms each)  │    │
│                   │ • Empty state if no results          │    │
│                   └──────────────────────────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│                   ┌──────────────────────────────────────┐    │
│                   │ RENDERED GRID                        │    │
│                   │                                      │    │
│                   │ ┌────────┐ ┌────────┐ ┌────────┐  │    │
│                   │ │  Card  │ │  Card  │ │  Card  │  │    │
│                   │ └────────┘ └────────┘ └────────┘  │    │
│                   │                                      │    │
│                   │ Click card → Navigate to adventure  │    │
│                   └──────────────────────────────────────┘    │
│                                                                 │
│  URL SYNC INTEGRATION:                                        │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ User adjusts difficulty filter                         │  │
│  │ → dispatch({ type: 'SET_FILTER', ... })              │  │
│  │ → state updates                                        │  │
│  │ → useEffect syncs to URL                              │  │
│  │ → URL: ?difficulty=easy,moderate&season=spring...    │  │
│  │ → User can share URL with filters applied             │  │
│  │ → Browser back button works                           │  │
│  │ → Page reload restores filters from URL params        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Loading & Cross-Linking

```
ASTRO STATIC GENERATION
│
├─ BUILD TIME: getStaticPaths()
│  │
│  ├─ Glob all lake files
│  │  └─ src/data/lakes/*.ts
│  │
│  ├─ Extract slugs from filenames
│  │  └─ stonewall-jackson.ts → stonewall-jackson
│  │
│  └─ Return paths
│     └─ [
│        { params: { slug: 'stonewall-jackson' } },
│        { params: { slug: 'burnsville' } },
│        ...
│     ]
│
├─ FOR EACH SLUG: Render static HTML
│  │
│  ├─ import lake data
│  │  └─ const data = (await import(`../data/lakes/${slug}.ts`)).default
│  │
│  ├─ Load LakeTemplate component
│  │  └─ <LakeTemplate data={data} />
│  │
│  ├─ CROSS-LINKING (in template):
│  │  │
│  │  ├─ getNearbyWMAs(coordinates, maxDistance)
│  │  │  └─ Glob all WMA files
│  │  │  └─ Calculate Haversine distance
│  │  │  └─ Filter within maxDistance (25km)
│  │  │  └─ Return top 3
│  │  │
│  │  ├─ getNearbyHistoric(coordinates, maxDistance)
│  │  │  └─ Same logic for historic sites
│  │  │
│  │  └─ Render "Nearby Destinations" section
│  │     └─ <a href="/near/wma/sutton/">Sutton WMA (8.3 km)</a>
│  │
│  ├─ SEO SCHEMA
│  │  ├─ SchemaLakeTemplate.astro
│  │  ├─ Schema.org Type: TouristAttraction
│  │  ├─ Add coordinates, description, images
│  │  └─ Add to <head>
│  │
│  └─ Generate HTML
│     └─ /near/lake/stonewall-jackson/index.html
│
└─ OUTPUT: 100+ static HTML files (zero JS for Astro components)
   │
   ├─ /near/lake/stonewall-jackson/index.html
   ├─ /near/lake/burnsville/index.html
   ├─ /near/wma/sutton/index.html
   └─ ...


HAVERSINE DISTANCE CALCULATION (Turf.js)
│
├─ Input coordinates
│  └─ Lake: { lat: 38.65, lng: -80.67 }
│  └─ WMA: { lat: 38.72, lng: -80.75 }
│
├─ Convert to GeoJSON points
│  └─ [lng, lat] format (satellite GPS standard)
│
├─ Calculate distance
│  └─ distance(point1, point2) → kilometers
│
├─ Filter by radius
│  └─ if distance < 25km → include
│
└─ Output
   └─ { slug: 'sutton', name: 'Sutton WMA', distance: 8.3 }
```

---

## 6. Deployment & Build Process

```
SOURCE CODE (Git)
│
├─ main branch
│  └─ Git push → GitHub
│
├─ GitHub Actions (Workflow)
│  │
│  ├─ On: push to main
│  │
│  ├─ Jobs:
│  │  ├─ Install dependencies (npm install)
│  │  ├─ Run typecheck (astro check)
│  │  ├─ Run tests (vitest, playwright)
│  │  ├─ Run compliance (accessibility, fonts, colors)
│  │  └─ Build (npm run build)
│  │
│  └─ If all pass:
│     └─ Upload build artifacts → Vercel
│
├─ Vercel Build
│  │
│  ├─ Install → Test → Build
│  │  └─ npm run build
│  │  └─ Outputs: dist/ directory
│  │
│  ├─ Deploy to CDN
│  │  ├─ HTML files → Edge
│  │  ├─ JS bundles → Versioned
│  │  ├─ CSS bundles → Versioned
│  │  └─ Images → Optimized
│  │
│  └─ Edge caching
│     └─ Static content: 1 year
│     └─ Dynamic: varies
│
└─ LIVE: wvwo-storefront.vercel.app
   │
   ├─ CDN serving globally
   ├─ Serverless functions (future)
   └─ Analytics tracking
```

---

## 7. File Organization (Dependency Tree)

```
src/
│
├── pages/ (Astro routes)
│   ├── index.astro (homepage)
│   ├── shop/ (e-commerce routes)
│   │   ├── index.astro
│   │   ├── [category].astro
│   │   └── [category]/[product].astro
│   ├── near/ (destination hub)
│   │   ├── index.astro
│   │   ├── lake/
│   │   │   └── [slug].astro ← Uses LakeTemplate
│   │   ├── wma/
│   │   │   └── [slug].astro ← Uses WMATemplate
│   │   └── ... (other destination types)
│   ├── checkout.astro ← Uses CheckoutForm
│   ├── adventures/
│   │   └── index.astro ← Uses AdventuresHub
│   └── ... (other pages)
│
├── components/
│   ├── adventures/ (filter system)
│   │   ├── AdventuresHub.tsx ← FilterProvider
│   │   ├── FilteredGrid.tsx
│   │   ├── FilterBar.tsx
│   │   ├── MobileFiltersSheet.tsx
│   │   ├── filters/
│   │   │   ├── DifficultyFilter.tsx
│   │   │   ├── SeasonFilter.tsx
│   │   │   ├── GearFilter.tsx
│   │   │   ├── SuitabilityFilter.tsx
│   │   │   └── ElevationSlider.tsx ← Uses react-slider
│   │   └── ... (others)
│   │
│   ├── cart/ (shopping cart)
│   │   ├── CartDrawer.tsx ← useCart()
│   │   ├── CartIcon.tsx
│   │   ├── CartItem.tsx
│   │   ├── AddToCartButton.tsx
│   │   └── ... (others)
│   │
│   ├── checkout/ (checkout system)
│   │   ├── CheckoutForm.tsx ← useForm() + Zod
│   │   ├── ContactSection.tsx
│   │   ├── FulfillmentSection.tsx
│   │   ├── PaymentSection.tsx
│   │   ├── schemas/
│   │   │   └── checkoutSchema.ts ← Zod validation
│   │   └── ... (others)
│   │
│   ├── templates/ (destination pages)
│   │   ├── LakeTemplate.astro ← Uses cross-links.ts
│   │   ├── WMATemplate.astro
│   │   ├── CampgroundTemplate.astro
│   │   ├── RiverTemplate.astro
│   │   ├── StateParkTemplate.astro
│   │   ├── BackcountryTemplate.astro
│   │   ├── HistoricTemplate.astro
│   │   └── ... (others)
│   │
│   ├── seo/ (schema markup)
│   │   ├── SchemaLakeTemplate.astro
│   │   ├── SchemaBreadcrumb.astro
│   │   └── ... (others)
│   │
│   ├── ui/ (Radix + shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── sheet.tsx ← Used by CartDrawer
│   │   └── ... (13 total)
│   │
│   ├── Header.astro ← Uses CartIcon
│   ├── Footer.astro
│   ├── Hero.astro
│   └── ... (other layout)
│
├── lib/ (Utilities & state)
│   ├── adventures/
│   │   ├── FilterContext.tsx ← Context provider
│   │   ├── filter-reducer.ts
│   │   ├── filters.config.ts
│   │   ├── filter-utils.ts
│   │   └── url-sync.ts
│   │
│   ├── payment/
│   │   └── tacticalPayments.ts
│   │
│   ├── cart-analytics.ts
│   ├── orderUtils.ts
│   ├── shipping.ts
│   ├── products.ts
│   ├── storeData.ts
│   └── validation/
│       └── river.ts
│
├── stores/ (nanostores)
│   └── cartStore.ts ← Global cart state
│
├── hooks/ (React hooks)
│   └── useCart.ts ← Wrapper around cartStore
│
├── utils/ (Helper functions)
│   ├── cross-links.ts ← Haversine distance (Turf.js)
│   ├── image-attribution.ts
│   ├── historic-slug.ts
│   └── truncate-description.ts
│
├── types/ (TypeScript definitions)
│   ├── adventure.ts
│   ├── adventure-core.ts
│   ├── adventure-shared.ts
│   ├── product.ts
│   ├── lake-template.ts
│   ├── lake-enrichment.ts
│   ├── wma.ts
│   ├── campground-template.ts
│   ├── river-template.ts
│   ├── state-park-template.ts
│   ├── backcountry-types.ts
│   ├── ski-types.ts
│   ├── cave-types.ts
│   ├── templates/
│   │   └── historic.ts
│   └── ... (33 total)
│
├── data/ (Destination data)
│   ├── lakes/
│   │   ├── stonewall-jackson.ts
│   │   ├── burnsville.ts
│   │   └── ...
│   ├── wma/
│   ├── campgrounds/
│   ├── rivers/
│   ├── historic/
│   ├── backcountry/
│   └── ... (other types)
│
├── content/ (Content collection)
│   └── adventures/
│       ├── stonewall-jackson-lake.md
│       ├── bulltown-campground.md
│       └── ... (all destinations)
│
├── styles/
│   └── globals.css ← Tailwind + WVWO theme
│
└── layouts/
    └── Layout.astro ← Shared layout wrapper
```

---

## 8. Request Flow - Cart to Checkout

```
USER JOURNEY:

1. BROWSE PRODUCTS
   ├─ Click "Add to Cart"
   └─ AddToCartButton.tsx handles click
      │
      ├─ Validate product
      │  ├─ Age restriction (18/21)?
      │  ├─ State restriction (firearms)?
      │  └─ In stock?
      │
      ├─ If valid:
      │  │
      │  ├─ addItem() → cartStore
      │  │  │
      │  │  ├─ $cartItems Record update
      │  │  ├─ $itemCount recomputed
      │  │  ├─ $subtotal recomputed
      │  │  ├─ $summary recomputed
      │  │  └─ Persist to IndexedDB (async)
      │  │
      │  ├─ useCart() hook re-renders:
      │  │  ├─ CartIcon updates badge
      │  │  └─ HeaderCart shows count
      │  │
      │  └─ Toast: "Added to cart ✓"
      │
      └─ If invalid:
         └─ Toast: "Cannot add to cart" + reason

2. VIEW CART
   ├─ Click CartIcon in header
   └─ CartDrawer opens (Sheet)
      │
      ├─ Display CartItemRow for each item
      │  ├─ Product image, name, price
      │  ├─ Quantity controls (-, qty, +)
      │  └─ Remove button
      │
      ├─ Display CartSummary
      │  ├─ Subtotal
      │  ├─ Shipping estimate (if applicable)
      │  └─ Tax estimate (if applicable)
      │
      └─ "Proceed to Checkout" button

3. CHECKOUT
   ├─ Click "Proceed to Checkout"
   └─ Navigate to /checkout
      │
      ├─ CheckoutForm mounts
      │  └─ useForm() initializes
      │     └─ Zod schema validation
      │
      ├─ Step 1: Contact Info
      │  ├─ firstName, lastName, email, phone
      │  ├─ form.register() for each field
      │  ├─ form.watch() for real-time validation
      │  └─ Display errors from form.formState.errors
      │
      ├─ Step 2: Fulfillment
      │  ├─ Radio: Ship or Pickup
      │  ├─ If Ship:
      │  │  ├─ Show address fields (street, city, state, zip)
      │  │  ├─ Watch state for shipping cost
      │  │  ├─ Watch state for tax calculation
      │  │  └─ Validate address fields (Zod)
      │  └─ If Pickup:
      │     └─ Hide address fields
      │
      ├─ Step 3: Payment Info
      │  ├─ (Optional) Firearms agreement if needed
      │  ├─ Order summary
      │  │  ├─ Items list
      │  │  ├─ Subtotal
      │  │  ├─ Shipping cost
      │  │  ├─ Tax
      │  │  └─ Total
      │  └─ Tactical Payments iframe
      │
      └─ Submit form
         │
         ├─ Client-side validation
         │  ├─ checkoutSchema.parse(data)
         │  ├─ validateFirearmAgreement()
         │  ├─ validateStateRestriction()
         │  └─ Age verification
         │
         ├─ Calculate costs
         │  ├─ calculateShipping(state)
         │  ├─ calculateTax(subtotal, state)
         │  └─ total = subtotal + shipping + tax
         │
         ├─ Create order
         │  ├─ createOrder(data, summary)
         │  ├─ storePendingOrder() → localStorage
         │  └─ Order ID returned
         │
         ├─ Process payment
         │  └─ Tactical Payments API call
         │
         ├─ If success:
         │  ├─ clearCart()
         │  ├─ Clear localStorage
         │  ├─ Toast: "Order placed! ✓"
         │  └─ Navigate to /order-confirmation
         │
         └─ If error:
            ├─ Display error message
            ├─ Keep cart intact
            └─ Allow retry
```

---

## 9. Filter State Machine

```
INITIAL STATE:
{
  difficulty: [],           // OR logic (easy OR moderate OR difficult)
  season: [],              // OR logic (spring OR summer OR fall OR winter)
  elevation: [0, 5000],    // Range (between min AND max)
  gear: [],                // OR logic
  suitability: []          // OR logic
}

ACTIONS (from FilterReducer):
│
├─ SET_FILTER(filterName, values)
│  └─ state[filterName] = values
│
├─ SET_RANGE(axis, [min, max])
│  └─ state[axis] = [min, max]
│
├─ ADD_FILTER(filterName, value)
│  └─ state[filterName].push(value)
│
├─ REMOVE_FILTER(filterName, value)
│  └─ state[filterName].remove(value)
│
└─ RESET_FILTERS()
   └─ state = INITIAL_STATE

FILTERING LOGIC:
│
├─ For each adventure:
│  │
│  ├─ Difficulty check:
│  │  └─ if (difficulty.length === 0) ✓
│  │     else if (difficulty.includes(adventure.difficulty)) ✓
│  │     else ✗
│  │
│  ├─ Season check (array):
│  │  └─ if (season.length === 0) ✓
│  │     else if (adventure.season.some(s => season.includes(s))) ✓
│  │     else ✗
│  │
│  ├─ Elevation check (range):
│  │  └─ if (adventure.elevation >= elevation[0] &&
│  │        adventure.elevation <= elevation[1]) ✓
│  │     else ✗
│  │
│  ├─ Gear check (array):
│  │  └─ if (gear.length === 0) ✓
│  │     else if (adventure.gear.some(g => gear.includes(g))) ✓
│  │     else ✗
│  │
│  ├─ Suitability check (array):
│  │  └─ if (suitability.length === 0) ✓
│  │     else if (adventure.suitability.some(s => suitability.includes(s))) ✓
│  │     else ✗
│  │
│  └─ ALL checks pass? → Include in results
│     else → Exclude
│
└─ RESULTS: filtered adventures array
   │
   ├─ Render in grid
   ├─ Announce count via ARIA live region
   └─ Show empty state if no results
```

---

## 10. TypeScript Type Hierarchy

```
ROOT TYPES:

├─ Adventure (from content collection)
│  ├─ id: string
│  ├─ slug: string
│  ├─ title: string
│  ├─ type: 'lake' | 'wma' | 'campground' | ...
│  ├─ difficulty: 'easy' | 'moderate' | 'difficult'
│  ├─ season: Season[]
│  ├─ gear: string[]
│  ├─ suitability: string[]
│  ├─ coordinates: Coordinates
│  └─ ... (more fields)
│
├─ Product
│  ├─ id: string
│  ├─ sku: string
│  ├─ name: string
│  ├─ price: number (cents)
│  ├─ fulfillmentType: FulfillmentType
│  ├─ fflRequired: boolean
│  ├─ ageRestriction?: 18 | 21
│  ├─ stateRestrictions?: string[]
│  └─ ... (more fields)
│
├─ CartItem extends Product
│  ├─ quantity: number
│  ├─ maxQuantity: number
│  └─ priceDisplay: string
│
├─ CartSummaryData
│  ├─ itemCount: number
│  ├─ subtotal: number
│  ├─ hasShippableItems: boolean
│  ├─ hasFirearms: boolean
│  └─ fulfillmentOptions: ('ship' | 'pickup')[]
│
├─ FilterState
│  ├─ difficulty: string[]
│  ├─ season: string[]
│  ├─ elevation: [number, number]
│  ├─ gear: string[]
│  └─ suitability: string[]
│
├─ CheckoutFormData
│  ├─ firstName: string
│  ├─ lastName: string
│  ├─ email: string
│  ├─ phone: string
│  ├─ fulfillment: 'ship' | 'pickup'
│  ├─ street?: string
│  ├─ city?: string
│  ├─ state?: string
│  └─ zip?: string
│
└─ Enums & Unions:
   ├─ FulfillmentType = 'ship_or_pickup' | 'pickup_only' | 'reserve_hold'
   ├─ AgeRestriction = 18 | 21
   ├─ StockLevel = 'in_stock' | 'low_stock' | 'out_of_stock'
   └─ Coordinates = { lat: number, lng: number }
```

---

This comprehensive diagram set provides visual reference for:
- System architecture and layering
- Component hierarchies
- Data flow and state management
- User journeys
- Build and deployment
- File organization
- Filter logic
- Type system

**For detailed code and implementation, refer to:**
- `CODEBASE-ARCHITECTURE.md` - Complete architectural details
- `COMPONENT-INVENTORY.md` - Component quick reference
