# SkiTemplate.astro - Section-by-Section Architecture

**SPEC-15 Phase 2: Architecture Design**
**Document Version:** 1.0.0
**Created:** 2025-12-30

## Overview

This document defines the complete section layout architecture for SkiTemplate.astro, including HTML structure, Tailwind classes for responsive behavior, conditional rendering logic, and component reuse mapping.

---

## 1. Hero Section

**Purpose:** Resort name, elevation stats, quick badges, season dates, trail map link

### Layout Design
- **Height:** 70vh (min-height: 500px)
- **Pattern:** Full-bleed image with dark overlay (bg-brand-brown/50)
- **Grid:** Stats grid (2-col mobile, 4-col desktop)
- **Overlay Pattern:** Camo pattern at 10% opacity (matches AdventureHero pattern)

### HTML Structure
```html
<section class="relative h-[70vh] min-h-[500px] overflow-hidden" aria-label="{name} hero section">
  <!-- Hero Image -->
  <img src={heroImage} alt={imageAlt} class="absolute inset-0 w-full h-full object-cover" loading="eager" />

  <!-- Dark Overlay -->
  <div class="absolute inset-0 bg-brand-brown/50"></div>

  <!-- Content Container -->
  <div class="relative h-full container mx-auto px-4">
    <div class="h-full flex flex-col justify-end pb-16">

      <!-- Resort Name (h1) -->
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {name}
      </h1>

      <!-- Tagline -->
      <p class="font-body text-xl md:text-2xl text-white mb-6 max-w-2xl">
        {tagline}
      </p>

      <!-- Elevation Stats Grid (4 items) -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <!-- Base Elevation -->
        <div class="bg-white/95 p-4 rounded-sm">
          <p class="font-display text-2xl font-bold text-brand-brown">{elevation.base}'</p>
          <p class="font-body text-sm text-brand-mud">Base Elevation</p>
        </div>
        <!-- Summit Elevation -->
        <div class="bg-white/95 p-4 rounded-sm">
          <p class="font-display text-2xl font-bold text-brand-brown">{elevation.summit}'</p>
          <p class="font-body text-sm text-brand-mud">Summit</p>
        </div>
        <!-- Vertical Drop -->
        <div class="bg-white/95 p-4 rounded-sm">
          <p class="font-display text-2xl font-bold text-brand-brown">{elevation.vertical}'</p>
          <p class="font-body text-sm text-brand-mud">Vertical Drop</p>
        </div>
        <!-- Total Trails -->
        <div class="bg-white/95 p-4 rounded-sm">
          <p class="font-display text-2xl font-bold text-brand-brown">{trails.total}</p>
          <p class="font-body text-sm text-brand-mud">Trails</p>
        </div>
      </div>

      <!-- Quick Stats Badges -->
      <div class="flex flex-wrap gap-2 mb-4">
        {quickStats.map((stat) => (
          <span class="bg-brand-orange text-white px-3 py-1 rounded-sm font-body text-sm font-medium">
            {stat}
          </span>
        ))}
      </div>

      <!-- Season Badge + Trail Map Link -->
      <div class="flex flex-wrap items-center gap-4">
        <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body font-medium">
          Season: {season.open} - {season.close}
        </span>
        {trailMapUrl && (
          <a href={trailMapUrl} target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-white text-brand-brown px-4 py-2 rounded-sm font-body font-medium hover:bg-brand-cream">
            <svg class="w-5 h-5" ...><!-- Map icon --></svg>
            View Trail Map
          </a>
        )}
      </div>

    </div>
  </div>
</section>
```

### Responsive Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | 2-col stats grid, stacked badges |
| Tablet (768-1023px) | 4-col stats grid, inline badges |
| Desktop (1024px+) | Full 4-col grid, larger typography |

---

## 2. Description Section

**Purpose:** Prose description of the resort
**Background:** `bg-brand-cream`

### HTML Structure
```html
<section class="bg-brand-cream py-12">
  <div class="container mx-auto px-4">
    <p class="font-body text-lg text-brand-mud leading-relaxed max-w-4xl mx-auto text-center">
      {description}
    </p>
  </div>
</section>
```

---

## 3. Trail Breakdown Section

**Purpose:** Visual display of trail counts by difficulty with color-coded shapes
**Background:** `bg-white`

### Trail Difficulty Color Mapping
| Difficulty | Background | Text | Shape |
|------------|------------|------|-------|
| Beginner | `bg-sign-green` | `text-white` | Circle |
| Intermediate | `bg-blue-700` | `text-white` | Square (Exception: industry std) |
| Advanced | `bg-brand-brown` | `text-brand-cream` | Diamond |
| Expert | `bg-red-900` | `text-white` | Double Diamond |

### HTML Structure
```html
<section class="py-16 bg-white" aria-labelledby="trails-heading">
  <div class="container mx-auto px-4">
    <h2 id="trails-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Trail Breakdown
    </h2>

    <!-- Trail Summary Stats -->
    <div class="max-w-3xl mx-auto mb-8 text-center">
      <p class="font-body text-brand-mud">
        <span class="font-bold text-brand-brown">{trails.acreage}</span> skiable acres |
        {trails.longestRun && `Longest run: ${trails.longestRun}`}
      </p>
    </div>

    <!-- Difficulty Cards Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

      <!-- Beginner Card -->
      <div class="bg-brand-cream/50 border-l-4 border-sign-green p-6 rounded-sm text-center">
        <div class="flex justify-center mb-3">
          <svg class="w-8 h-8 text-sign-green" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-bold text-brand-brown mb-1">{trails.beginner}</p>
        <p class="font-body text-sm text-brand-mud">Beginner</p>
        <span class="sr-only">Green circle difficulty</span>
      </div>

      <!-- Intermediate Card -->
      <div class="bg-brand-cream/50 border-l-4 border-blue-700 p-6 rounded-sm text-center">
        <div class="flex justify-center mb-3">
          <svg class="w-8 h-8 text-blue-700" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" fill="currentColor"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-bold text-brand-brown mb-1">{trails.intermediate}</p>
        <p class="font-body text-sm text-brand-mud">Intermediate</p>
        <span class="sr-only">Blue square difficulty</span>
      </div>

      <!-- Advanced Card -->
      <div class="bg-brand-cream/50 border-l-4 border-brand-brown p-6 rounded-sm text-center">
        <div class="flex justify-center mb-3">
          <svg class="w-8 h-8 text-brand-brown" aria-hidden="true">
            <polygon points="12,2 22,12 12,22 2,12" fill="currentColor"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-bold text-brand-brown mb-1">{trails.advanced}</p>
        <p class="font-body text-sm text-brand-mud">Advanced</p>
        <span class="sr-only">Black diamond difficulty</span>
      </div>

      <!-- Expert Card -->
      <div class="bg-brand-cream/50 border-l-4 border-red-900 p-6 rounded-sm text-center">
        <div class="flex justify-center mb-3">
          <svg class="w-10 h-8 text-red-900" aria-hidden="true">
            <!-- Double diamond icon -->
            <polygon points="8,2 14,8 8,14 2,8" fill="currentColor"/>
            <polygon points="16,2 22,8 16,14 10,8" fill="currentColor"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-bold text-brand-brown mb-1">{trails.expert}</p>
        <p class="font-body text-sm text-brand-mud">Expert</p>
        <span class="sr-only">Double black diamond difficulty</span>
      </div>

    </div>
  </div>
</section>
```

### Responsive Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | 2-col grid |
| Tablet (768-1023px) | 4-col grid |
| Desktop (1024px+) | 4-col grid, larger icons |

---

## 4. Lift System Section

**Purpose:** Display lift count, types, and capacity
**Background:** `bg-brand-cream`

### HTML Structure
```html
<section class="py-16 bg-brand-cream" aria-labelledby="lifts-heading">
  <div class="container mx-auto px-4">
    <h2 id="lifts-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Lift System
    </h2>

    <div class="max-w-4xl mx-auto">
      <!-- Total Lifts Stat -->
      <div class="text-center mb-8">
        <p class="font-display text-5xl font-bold text-brand-brown">{lifts.total}</p>
        <p class="font-body text-lg text-brand-mud">Total Lifts</p>
        {lifts.capacity && (
          <p class="font-body text-sm text-sign-green mt-2">Uphill capacity: {lifts.capacity}</p>
        )}
      </div>

      <!-- Lift Types Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {lifts.types.map((lift) => (
          <div class="bg-white border-l-4 border-sign-green p-4 rounded-sm">
            <p class="font-display text-2xl font-bold text-brand-brown">{lift.count}</p>
            <p class="font-body text-sm text-brand-mud">{lift.type}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

---

## 5. Snow Conditions Section

**Purpose:** Widget embed area + static snow stats
**Background:** `bg-white`

### HTML Structure
```html
<section class="py-16 bg-white" aria-labelledby="conditions-heading">
  <div class="container mx-auto px-4">
    <h2 id="conditions-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Snow Conditions
    </h2>

    <div class="max-w-4xl mx-auto">
      <!-- Static Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-brand-cream border-l-4 border-sign-green p-6 rounded-sm">
          <p class="font-body text-sm text-brand-mud uppercase tracking-wide mb-1">Average Snowfall</p>
          <p class="font-display text-2xl font-bold text-brand-brown">{snowConditions.averageSnowfall}</p>
        </div>
        <div class="bg-brand-cream border-l-4 border-sign-green p-6 rounded-sm">
          <p class="font-body text-sm text-brand-mud uppercase tracking-wide mb-1">Snowmaking Coverage</p>
          <p class="font-display text-2xl font-bold text-brand-brown">{snowConditions.snowmaking}</p>
        </div>
      </div>

      <!-- Widget Embed (Conditional) -->
      {snowConditions.widgetEmbed && (
        <div class="bg-brand-cream/30 p-4 rounded-sm mb-6">
          <Fragment set:html={snowConditions.widgetEmbed} />
        </div>
      )}

      <!-- Live Conditions Link (Conditional) -->
      {snowConditions.conditionsUrl && (
        <div class="text-center">
          <a href={snowConditions.conditionsUrl} target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 bg-sign-green text-white px-6 py-3 rounded-sm font-body font-medium hover:bg-sign-green/90">
            <svg class="w-5 h-5"><!-- Snow/Weather icon --></svg>
            Check Live Snow Conditions
          </a>
        </div>
      )}
    </div>
  </div>
</section>
```

---

## 6. Pricing Section

**Purpose:** 3-column grid for lift tickets, season passes, and rentals
**Background:** `bg-brand-cream`

### HTML Structure
```html
<section class="py-16 bg-brand-cream" aria-labelledby="pricing-heading">
  <div class="container mx-auto px-4">
    <h2 id="pricing-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-4 text-center">
      Pricing
    </h2>

    <!-- Dynamic Pricing Notice -->
    {pricing.isDynamic && (
      <p class="text-center font-body text-brand-mud mb-2">
        Prices shown are starting rates. Book early for best prices!
      </p>
    )}
    {pricing.lastUpdated && (
      <p class="text-center font-body text-sm text-brand-mud/70 mb-8">
        Pricing updated: {pricing.lastUpdated}
      </p>
    )}

    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Lift Tickets Column -->
      <div class="bg-white p-6 rounded-sm border-l-4 border-sign-green">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4 pb-2 border-b border-brand-brown/15">
          Lift Tickets
        </h3>
        <div class="space-y-4">
          {pricing.liftTickets.map((ticket) => (
            <div class="flex justify-between items-start">
              <div>
                <p class="font-body font-medium text-brand-brown">{ticket.type}</p>
                {ticket.notes && <p class="font-body text-xs text-brand-mud">{ticket.notes}</p>}
              </div>
              <p class="font-display text-lg font-bold text-brand-brown">{ticket.price}</p>
            </div>
          ))}
        </div>
      </div>

      <!-- Season Passes Column -->
      <div class="bg-white p-6 rounded-sm border-l-4 border-brand-orange">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4 pb-2 border-b border-brand-brown/15">
          Season Passes
        </h3>
        <div class="space-y-4">
          {pricing.seasonPass.map((pass) => (
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <p class="font-body font-medium text-brand-brown">{pass.type}</p>
                <p class="font-display text-lg font-bold text-brand-brown">{pass.price}</p>
              </div>
              {pass.benefits && (
                <ul class="list-disc list-inside text-xs text-brand-mud space-y-1">
                  {pass.benefits.map((benefit) => <li>{benefit}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <!-- Rentals Column (Conditional) -->
      {pricing.rentals && pricing.rentals.length > 0 && (
        <div class="bg-white p-6 rounded-sm border-l-4 border-brand-mud">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-4 pb-2 border-b border-brand-brown/15">
            Equipment Rentals
          </h3>
          <div class="space-y-4">
            {pricing.rentals.map((rental) => (
              <div class="flex justify-between items-center">
                <p class="font-body font-medium text-brand-brown">{rental.package}</p>
                <p class="font-display text-lg font-bold text-brand-brown">{rental.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <!-- Resort Pricing Link -->
    {pricing.pricingUrl && (
      <div class="text-center mt-8">
        <a href={pricing.pricingUrl} target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center gap-2 text-sign-green font-body font-medium hover:underline">
          View full pricing on resort website
          <svg class="w-4 h-4"><!-- External link icon --></svg>
        </a>
      </div>
    )}
  </div>
</section>
```

### Responsive Breakpoints
| Breakpoint | Behavior |
|------------|----------|
| Mobile (320-767px) | Full-width stacked columns |
| Tablet (768-1023px) | 3-col grid (may wrap to 2) |
| Desktop (1024px+) | 3-col grid side-by-side |

---

## 7. Terrain Parks Section (CONDITIONAL)

**Purpose:** Display terrain park features with difficulty ratings
**Background:** `bg-white`
**Condition:** Only renders if `terrainParks` array is populated

### HTML Structure
```html
{terrainParks && terrainParks.length > 0 && (
  <section class="py-16 bg-white" aria-labelledby="parks-heading">
    <div class="container mx-auto px-4">
      <h2 id="parks-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
        Terrain Parks
      </h2>

      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {terrainParks.map((park) => (
          <div class="bg-brand-cream border-l-4 border-sign-green p-6 rounded-sm">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-display text-xl font-bold text-brand-brown">{park.name}</h3>
              <span class={`px-3 py-1 rounded-sm font-body text-xs font-bold ${getTerrainParkDifficultyClass(park.difficulty)}`}>
                {park.difficulty}
              </span>
            </div>
            <div class="flex flex-wrap gap-2">
              {park.features.map((feature) => (
                <span class="bg-white text-brand-mud px-2 py-1 rounded-sm font-body text-xs">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

### Difficulty Color Function
```typescript
function getTerrainParkDifficultyClass(difficulty: string): string {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-sign-green text-white';
    case 'Intermediate':
      return 'bg-blue-700 text-white';
    case 'Advanced':
      return 'bg-brand-brown text-brand-cream';
    case 'Expert':
      return 'bg-red-900 text-white';
    default:
      return 'bg-brand-mud text-brand-cream';
  }
}
```

---

## 8. Lodging Section

**Purpose:** 2-column cards with amenities and booking links
**Background:** `bg-brand-cream`

### HTML Structure
```html
<section class="py-16 bg-brand-cream" aria-labelledby="lodging-heading">
  <div class="container mx-auto px-4">
    <h2 id="lodging-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Where to Stay
    </h2>

    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {lodging.map((property) => (
        <article class="bg-white border-l-4 border-sign-green p-6 rounded-sm">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-display text-xl font-bold text-brand-brown">{property.name}</h3>
              <p class="font-body text-sm text-brand-mud">{property.type}</p>
            </div>
            {property.distance && (
              <span class="bg-brand-cream text-brand-mud px-2 py-1 rounded-sm font-body text-xs whitespace-nowrap">
                {property.distance}
              </span>
            )}
          </div>

          {property.priceRange && (
            <p class="font-body text-sm text-brand-brown mb-3">
              <span class="font-bold">Price Range:</span> {property.priceRange}
            </p>
          )}

          <!-- Amenities -->
          <div class="mb-4">
            <p class="font-body text-xs text-brand-mud uppercase tracking-wide mb-2">Amenities:</p>
            <div class="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span class="bg-sign-green/10 text-sign-green px-2 py-1 rounded-sm font-body text-xs">
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {property.bookingUrl && (
            <a href={property.bookingUrl} target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sign-green font-body text-sm font-medium hover:underline">
              Book Now
              <svg class="w-4 h-4"><!-- External link icon --></svg>
            </a>
          )}
        </article>
      ))}
    </div>
  </div>
</section>
```

---

## 9. Dining Section (CONDITIONAL)

**Purpose:** Display dining options at the resort
**Background:** `bg-white`
**Condition:** Only renders if `dining` array is populated

### HTML Structure
```html
{dining && dining.length > 0 && (
  <section class="py-16 bg-white" aria-labelledby="dining-heading">
    <div class="container mx-auto px-4">
      <h2 id="dining-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
        Dining Options
      </h2>

      <div class="max-w-4xl mx-auto space-y-4">
        {dining.map((restaurant) => (
          <div class="bg-brand-cream border-l-4 border-sign-green p-4 rounded-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 class="font-display text-lg font-bold text-brand-brown">{restaurant.name}</h3>
                <p class="font-body text-sm text-brand-mud">{restaurant.type} | {restaurant.location}</p>
              </div>
              {restaurant.notes && (
                <span class="font-body text-xs text-brand-mud italic">{restaurant.notes}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
```

---

## 10. Summer Activities Section (CONDITIONAL)

**Purpose:** Card grid for off-season activities
**Background:** `bg-brand-cream`
**Condition:** Only renders if `summerActivities` array is populated

### HTML Structure
```html
{summerActivities && summerActivities.length > 0 && (
  <section class="py-16 bg-brand-cream" aria-labelledby="summer-heading">
    <div class="container mx-auto px-4">
      <h2 id="summer-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
        Summer Activities
      </h2>

      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summerActivities.map((activity) => (
          <article class="bg-white border-l-4 border-sign-green p-6 rounded-sm">
            <h3 class="font-display text-xl font-bold text-brand-brown mb-2">{activity.name}</h3>
            <p class="font-body text-brand-mud mb-3">{activity.description}</p>
            <span class="bg-brand-cream text-brand-mud px-2 py-1 rounded-sm font-body text-xs">
              {activity.season}
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
)}
```

---

## 11. Amenities Section

**Purpose:** Display resort amenities (rentals, lessons, childcare)
**Background:** `bg-white`

### HTML Structure
```html
<section class="py-16 bg-white" aria-labelledby="amenities-heading">
  <div class="container mx-auto px-4">
    <h2 id="amenities-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
      Resort Amenities
    </h2>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {amenities.map((category) => (
        <div class="bg-brand-cream p-6 rounded-sm">
          <h3 class="font-display text-lg font-bold text-brand-brown mb-3 pb-2 border-b border-brand-brown/15">
            {category.category}
          </h3>
          <ul class="space-y-2">
            {category.services.map((service) => (
              <li class="flex items-start gap-2 font-body text-brand-mud">
                <svg class="w-4 h-4 text-sign-green flex-shrink-0 mt-1" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" fill="none" stroke-width="2"/>
                </svg>
                {service}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 12. Gear Checklist Section (REUSE)

**Purpose:** Winter gear recommendations
**Background:** `bg-brand-cream`
**Component:** `AdventureGearChecklist`

### Usage
```astro
{gearList.length > 0 && (
  <section class="py-16 bg-brand-cream">
    <div class="container mx-auto px-4">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
        What to Bring
      </h2>
      <AdventureGearChecklist items={gearList} columns={2} variant="cream" />
    </div>
  </section>
)}
```

---

## 13. Related Shop Section (REUSE)

**Purpose:** Link to WVWO shop categories for ski gear
**Background:** `bg-white`
**Component:** `AdventureRelatedShop`

### Usage
```astro
{relatedShop.length > 0 && (
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <AdventureRelatedShop
        categories={relatedShop}
        title="Shop Winter Gear"
        intro="Get everything you need for the slopes at WV Wild Outdoors!"
        ctaText="Browse Winter Gear"
        ctaHref="/shop/winter"
      />
    </div>
  </section>
)}
```

---

## 14. CTA Section (REUSE)

**Purpose:** Call-to-action with dual buttons
**Background:** `bg-sign-green`
**Component:** `AdventureCTA`

### Usage
```astro
<AdventureCTA
  heading={`Ready for ${name}?`}
  description="Stop by the shop for gear, tips, and everything you need for a great day on the mountain."
  primaryText="Get Directions"
  primaryHref={`https://maps.google.com/?q=${name.replace(/\s/g, '+')},+West+Virginia`}
  secondaryText="Call the Shop"
  secondaryHref="tel:+13046134570"
  variant="sign-green"
/>
```

---

## Section Background Pattern (Alternating)

| # | Section | Background | Required |
|---|---------|------------|----------|
| 1 | Hero | Full-bleed image + overlay | YES |
| 2 | Description | `bg-brand-cream` | YES |
| 3 | Trail Breakdown | `bg-white` | YES |
| 4 | Lift System | `bg-brand-cream` | YES |
| 5 | Snow Conditions | `bg-white` | YES |
| 6 | Pricing | `bg-brand-cream` | YES |
| 7 | Terrain Parks | `bg-white` | CONDITIONAL |
| 8 | Lodging | `bg-brand-cream` | YES |
| 9 | Dining | `bg-white` | CONDITIONAL |
| 10 | Summer Activities | `bg-brand-cream` | CONDITIONAL |
| 11 | Amenities | `bg-white` | YES |
| 12 | Gear Checklist | `bg-brand-cream` | YES |
| 13 | Related Shop | `bg-white` | YES |
| 14 | CTA | `bg-sign-green` | YES |

---

## Responsive Breakpoints Summary

### Mobile (320-767px)
- All grids stack to single column or 2-col max
- Full-width cards
- Smaller typography scale (text-lg titles, text-sm body)
- Vertical badge stacking
- Reduced padding (p-4 instead of p-6)

### Tablet (768-1023px)
- 2-column grids where appropriate
- Stats grid: 4-col
- Pricing grid: 3-col (may wrap)
- Side-by-side layouts start appearing

### Desktop (1024px+)
- Full 3-column grids
- Trail cards: 4-col
- Pricing: 3-col side-by-side
- Larger typography (text-4xl headings)
- Full padding (p-6, p-8)

---

## Tailwind Class Patterns

### Section Container
```html
<section class="py-16 bg-{white|brand-cream}" aria-labelledby="section-heading">
  <div class="container mx-auto px-4">
    <h2 id="section-heading" class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 text-center">
```

### Card Pattern
```html
<div class="bg-{white|brand-cream} border-l-4 border-sign-green p-6 rounded-sm">
```

### Grid Patterns
```html
<!-- 2-col responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">

<!-- 3-col responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- 4-col responsive -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
```

### Badge Pattern
```html
<span class="bg-{color} text-{contrast} px-3 py-1 rounded-sm font-body text-sm font-medium">
```

### External Link Pattern
```html
<a href={url} target="_blank" rel="noopener noreferrer"
   class="inline-flex items-center gap-2 text-sign-green font-body font-medium hover:underline">
```

---

## Component Reuse Mapping

| Section | Reused Component | Notes |
|---------|------------------|-------|
| Gear Checklist | `AdventureGearChecklist` | Direct reuse, columns=2 |
| Related Shop | `AdventureRelatedShop` | Direct reuse with winter theme |
| CTA | `AdventureCTA` | Direct reuse with sign-green variant |

---

## Conditional Rendering Logic

```typescript
// Terrain Parks - OPTIONAL
{terrainParks && terrainParks.length > 0 && (
  <TerrainParksSection />
)}

// Dining - OPTIONAL
{dining && dining.length > 0 && (
  <DiningSection />
)}

// Summer Activities - OPTIONAL
{summerActivities && summerActivities.length > 0 && (
  <SummerActivitiesSection />
)}

// Trail Map Link - OPTIONAL
{trailMapUrl && (
  <TrailMapLink />
)}

// Snow Conditions Widget - OPTIONAL
{snowConditions.widgetEmbed && (
  <WidgetEmbed />
)}

// Rentals Column - OPTIONAL
{pricing.rentals && pricing.rentals.length > 0 && (
  <RentalsColumn />
)}
```

---

## Accessibility Requirements

1. **Trail Difficulty:** Color + Shape + Text (green circle, blue square, black diamond)
2. **Heading Hierarchy:** h1 (resort name) -> h2 (sections) -> h3 (cards)
3. **aria-labelledby:** All sections linked to their headings
4. **External Links:** `target="_blank"` + `rel="noopener noreferrer"` + sr-only text
5. **prefers-reduced-motion:** Disable animations via CSS

---

## Estimated Line Count

| Section | Est. Lines |
|---------|------------|
| Frontmatter/Imports | 50 |
| Hero | 80 |
| Description | 15 |
| Trail Breakdown | 70 |
| Lift System | 45 |
| Snow Conditions | 50 |
| Pricing | 80 |
| Terrain Parks | 40 |
| Lodging | 50 |
| Dining | 30 |
| Summer Activities | 35 |
| Amenities | 40 |
| Gear/Shop/CTA Reuse | 25 |
| Style Block | 20 |
| **TOTAL** | **~610 lines** |

Target: 550-600 lines (within spec)
