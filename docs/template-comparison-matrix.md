# WVWO Adventure Template Comparison Matrix

**Purpose**: Extract reusable patterns from existing templates (Backcountry, Ski, Lake, Cave, River) to identify what should carry forward to State Parks template.

**Date**: 2026-01-02
**Templates Analyzed**: BackcountryTemplate.astro, SkiTemplate.astro, LakeTemplate.astro, CaveTemplate.astro, RiverTemplate.astro
**Type Definitions Analyzed**: adventure.ts, ski-types.ts, cave-types.ts, backcountry-types.ts, navigation-types.ts, water-safety.ts

---

## 1. Section Structure Patterns

| Template | Total Sections | Hero Stats | Key Unique Sections |
|----------|---------------|------------|---------------------|
| **Backcountry** | 10 | Acreage, Trails, Designation | Navigation/Cell Coverage, AMD Water Warnings, Emergency Contacts (tiered), Leave No Trace, Wilderness Areas |
| **Ski** | 13 | Summit/Vertical/Acres | Trails (difficulty breakdown), Lifts, Snow Conditions, Pricing (dynamic), Lodging (REQUIRED), Dining, Amenities, Summer Activities |
| **Lake** | 8 | Acres, Depth, Length | Fishing Spots (structure/depth), Marina (services/fees/hours), Activities, Seasonal Fishing Guide |
| **Cave** | 13 | Depth, Temp, Discovery Year | Tours (difficulty/stairs/duration), Formations (geological), Accessibility (physical requirements), Pricing/Hours, History/Geology |
| **River** | 10 | Length, CFS Range | Rapids Guide (class-coded), Fishing (flow-dependent), Outfitters, Seasonal Flow, Access Points (put-in/take-out) |

### Common Section Order Pattern
1. **Hero** (stats grid, badges, tagline)
2. **Description** (prose on cream background)
3. **Primary Content** (2-4 sections, template-specific)
4. **Facilities/Services** (1-3 sections)
5. **Safety/Regulations** (1 section, orange accents)
6. **Seasonal/Planning** (1-2 sections)
7. **Gear Checklist** (shared component)
8. **Related Shop** (shared component)
9. **CTA** (shared component)

---

## 2. Facility Display Patterns

### Lodging Options Display

**SkiTemplate Pattern** (most comprehensive):
```astro
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {lodging.map((property) => (
    <div class="bg-brand-cream p-6 rounded-sm border-l-4 border-brand-brown">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-display text-xl">{property.name}</h3>
        <span class="bg-white px-2 py-1 rounded-sm text-xs">
          {property.type}
        </span>
      </div>
      <p class="text-sm mb-3">📍 {property.distance}</p>
      <div class="flex flex-wrap gap-1 mb-3">
        {property.amenities.slice(0, 4).map((amenity) => (
          <span class="bg-white px-2 py-1 rounded-sm text-xs">
            {amenity}
          </span>
        ))}
      </div>
      <p class="text-sm font-medium mb-3">{property.priceRange}</p>
      <a href={property.bookingUrl} class="bg-sign-green text-white px-4 py-2 rounded-sm">
        Book Now
      </a>
    </div>
  ))}
</div>
```

**Type Structure** (ski-types.ts):
```typescript
export const LodgingSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),                    // "Resort", "Cabin", "Hotel"
  distance: z.string().optional(),            // "On-mountain", "5 miles"
  amenities: z.array(z.string()).min(1).max(20),
  priceRange: z.string().optional(),          // "$150-300/night"
  bookingUrl: z.string().url().optional(),
});
```

**State Parks Application**:
- Use same card layout for cabins, campgrounds, lodges
- Show distance/location relative to main park area
- Display amenities as compact badges
- Link to reservation system (WV State Parks booking)

### Marina/Visitor Center Display

**LakeTemplate Pattern**:
```astro
<div class="space-y-6">
  {marinas.map((marina) => (
    <article class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm">
      <h3 class="font-display text-2xl">{marina.name}</h3>
      <p class="text-gray-600 mb-6 italic">{marina.type}</p>

      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <!-- Services List -->
        <div>
          <h4 class="font-bold uppercase tracking-wide text-sm mb-3">
            Services Available:
          </h4>
          <ul class="space-y-2">
            {marina.services.map((service) => (
              <li class="flex items-start">
                <span class="text-sign-green font-bold mr-2">•</span>
                {service}
              </li>
            ))}
          </ul>
        </div>

        <!-- Hours & Fees -->
        <div>
          <h4 class="font-bold uppercase tracking-wide text-sm mb-3">
            Hours & Fees:
          </h4>
          <p class="mb-2">{marina.hours}</p>
          <p><strong>Fee:</strong> {marina.fees}</p>
        </div>
      </div>

      <!-- Contact Footer -->
      <div class="border-t pt-4">
        <a href={`tel:${marina.contact}`} class="text-sign-green">
          {marina.contact}
        </a>
      </div>
    </article>
  ))}
</div>
```

**State Parks Application**:
- Visitor center: services, hours, contact
- Park office: permits, regulations, ranger info
- Nature center: programs, exhibits

---

## 3. Activity/Program Display Patterns

### Activity Cards (Grid Layout)

**LakeTemplate Pattern** (clean, reusable):
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {activities.map((activity) => (
    <article class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
      <h3 class="font-display text-xl font-bold mb-2">
        {activity.name}
      </h3>
      <p class="text-gray-700 mb-3">{activity.description}</p>
      <p class="text-sm text-gray-600 mb-2">
        <strong>Best Season:</strong> {activity.season}
      </p>
      <span class={`px-3 py-1 rounded-sm text-xs font-medium ${
        activity.difficulty.toLowerCase().includes('easy')
          ? 'bg-sign-green text-white'
          : activity.difficulty.toLowerCase().includes('moderate')
          ? 'bg-brand-orange text-white'
          : 'bg-brand-brown text-white'
      }`}>
        {activity.difficulty}
      </span>
    </article>
  ))}
</div>
```

**Type Structure** (adventure.ts):
```typescript
export const ActivitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  season: z.string().optional(),
  difficulty: z.string().optional(),
  icon: StatIconSchema.optional(),
});
```

**State Parks Application**:
- Hiking trails
- Programs (guided hikes, nature walks, campfire talks)
- Educational activities
- Seasonal events

### Tour/Program Schedule Display

**CaveTemplate Pattern** (time-sensitive programs):
```astro
{tours.map((tour) => (
  <div class="bg-brand-cream p-6 rounded-sm border-l-4 ${getTourBorderColor(tour.difficulty)}">
    <div class="flex justify-between items-start mb-4">
      <h3 class="font-display text-xl font-bold">{tour.name}</h3>
      <span class={`px-3 py-1 rounded-sm text-sm font-bold ${getTourBadgeColor(tour.difficulty)}`}>
        {getDifficultyLabel(tour.difficulty)}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div>
        <p class="text-sm text-brand-mud uppercase">Duration</p>
        <p class="font-medium">{tour.duration}</p>
      </div>
      <div>
        <p class="text-sm text-brand-mud uppercase">Group Size</p>
        <p class="font-medium">{tour.groupSize}</p>
      </div>
    </div>

    {tour.highlights && (
      <ul class="flex flex-wrap gap-2">
        {tour.highlights.map((highlight) => (
          <li class="bg-white px-2 py-1 rounded-sm text-sm">{highlight}</li>
        ))}
      </ul>
    )}

    {tour.reservationRequired && (
      <span class="text-brand-orange font-medium">Reservation Required</span>
    )}
  </div>
))}
```

**State Parks Application**:
- Ranger-led programs
- Educational workshops
- Guided nature walks
- Special events

---

## 4. Seasonal Information Display

### Seasonal Conditions Grid

**BackcountryTemplate Pattern** (4-season grid):
```astro
<div class="grid md:grid-cols-2 gap-6">
  {seasonalConditions.map((season) => (
    <div class="bg-white p-6 rounded-sm border-l-4 border-sign-green">
      <h3 class="font-display text-xl font-bold mb-4">{season.season}</h3>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-xs text-brand-mud uppercase">High</p>
          <p class="font-display text-lg font-bold">{season.avgHighTemp}</p>
        </div>
        <div>
          <p class="text-xs text-brand-mud uppercase">Low</p>
          <p class="font-display text-lg font-bold">{season.avgLowTemp}</p>
        </div>
      </div>

      <p class="text-sm mb-3">
        <strong>Precipitation:</strong> ~{season.precipitationDays} days/month
      </p>

      {season.primaryHazards.length > 0 && (
        <div class="mb-3">
          <p class="text-sm font-medium mb-1">Primary Hazards:</p>
          <div class="flex flex-wrap gap-1">
            {season.primaryHazards.map((hazard) => (
              <span class="bg-brand-cream px-2 py-0.5 rounded-sm text-xs">
                {hazard}
              </span>
            ))}
          </div>
        </div>
      )}

      {season.bestActivities.length > 0 && (
        <div>
          <p class="text-sm font-medium mb-1">Best For:</p>
          <p class="text-sm">{season.bestActivities.join(', ')}</p>
        </div>
      )}

      {season.kimNote && (
        <aside class="mt-4 pt-4 border-t">
          <p class="font-hand text-sm">{season.kimNote}</p>
        </aside>
      )}
    </div>
  ))}
</div>
```

**State Parks Application**:
- Pool/beach opening dates
- Winter trail closures
- Seasonal programs
- Weather-dependent activities

### Seasonal Guide (Fishing/Activities)

**LakeTemplate Pattern** (month-by-month):
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {seasonalGuide.map((season) => (
    <article class="bg-white p-6 rounded-sm">
      <h3 class="font-display text-xl font-bold border-b-2 border-b-sign-green pb-2 mb-4">
        {season.period}
      </h3>

      <div class="mb-4">
        <p class="font-bold text-sm uppercase mb-2">Target Species:</p>
        <ul class="space-y-1 text-sm">
          {season.targetSpecies.map((fish) => (
            <li class="flex items-start">
              <span class="text-sign-green font-bold mr-2">•</span>
              {fish}
            </li>
          ))}
        </ul>
      </div>

      <div class="mb-4">
        <p class="font-bold text-sm uppercase mb-2">Techniques:</p>
        <p class="text-sm">{season.techniques}</p>
      </div>

      {season.kimNote && (
        <div class="mt-4 pt-4 border-t">
          <p class="font-hand text-sm italic bg-brand-cream p-3 rounded-sm">
            {season.kimNote}
          </p>
        </div>
      )}
    </article>
  ))}
</div>
```

**State Parks Application**:
- Best times for different activities
- Seasonal wildlife viewing
- Peak foliage timing
- Optimal fishing/boating seasons

---

## 5. Fee Structure Display

### Tiered Pricing Cards

**SkiTemplate Pattern** (most detailed):
```astro
<div class="grid md:grid-cols-2 gap-8">
  <!-- Lift Tickets -->
  <div>
    <h3 class="font-display text-2xl font-bold mb-4">Lift Tickets</h3>
    <div class="space-y-3">
      {pricing.liftTickets.map((ticket) => (
        <div class="flex justify-between items-start bg-brand-cream p-4 rounded-sm border-l-4 border-sign-green">
          <div>
            <p class="font-body font-bold">{ticket.type}</p>
            {ticket.notes && (
              <p class="text-sm text-brand-mud">{ticket.notes}</p>
            )}
          </div>
          <p class="font-display text-xl font-bold">{ticket.price}</p>
        </div>
      ))}
    </div>
  </div>

  <!-- Season Passes -->
  <div>
    <h3 class="font-display text-2xl font-bold mb-4">Season Passes</h3>
    <div class="space-y-3">
      {pricing.seasonPass.map((pass) => (
        <div class="bg-brand-cream p-4 rounded-sm border-l-4 border-brand-orange">
          <div class="flex justify-between items-start mb-2">
            <p class="font-body font-bold">{pass.type}</p>
            <p class="font-display text-xl font-bold">{pass.price}</p>
          </div>
          {pass.benefits && (
            <ul class="list-disc list-inside text-sm">
              {pass.benefits.map((benefit) => <li>{benefit}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
```

**CaveTemplate Pattern** (simpler, single-column):
```astro
<div class="bg-brand-cream p-6 rounded-sm border-l-4 border-sign-green">
  <h3 class="font-display text-xl font-bold mb-4">Tour Pricing</h3>
  <div class="space-y-3">
    {pricing.map((priceItem) => (
      <div class="flex justify-between items-start">
        <div>
          <p class="font-body font-medium">{priceItem.tier}</p>
          {priceItem.notes && (
            <p class="text-xs text-brand-mud">{priceItem.notes}</p>
          )}
        </div>
        <p class="font-display text-lg font-bold">{priceItem.price}</p>
      </div>
    ))}
  </div>
</div>
```

**State Parks Application**:
- Day-use fees
- Camping fees (primitive vs. full hookup)
- Cabin rental rates
- Program fees
- Annual permits/passes

---

## 6. Reservation/Booking CTAs

### Booking Button Patterns

**Common Pattern**:
```astro
<!-- Primary booking CTA (orange) -->
<a
  href={bookingUrl}
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-sm font-body font-bold hover:bg-brand-orange/90 transition-colors"
>
  Book Tour on Official Site
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
</a>

<!-- Secondary contact CTA (green) -->
<a
  href={`tel:${contact.phone}`}
  class="inline-flex items-center gap-2 bg-sign-green text-white px-4 py-2 rounded-sm font-body font-bold hover:bg-sign-green/90 transition-colors"
>
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
  Call for Reservations
</a>
```

**Third-Party Disclaimer Pattern** (CaveTemplate):
```astro
<aside class="p-5 bg-brand-cream border-l-4 border-brand-orange rounded-sm" role="note">
  <div class="flex items-start gap-4">
    <svg class="w-6 h-6 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <p class="font-display text-lg font-bold">Book Directly with {name}</p>
      <p class="font-body text-sm mt-1">
        Tours and tickets are handled by {name}, not WV Wild Outdoors.
        We're here to help you find great adventures and gear up for your trip.
      </p>
      <a href={bookingUrl} class="inline-flex items-center gap-2 mt-4 bg-brand-orange text-white px-5 py-2.5 rounded-sm font-body font-bold">
        Book Tour on Official Site
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</aside>
```

**State Parks Application**:
- Link to WV State Parks reservation system
- Park office phone for questions
- Ranger station contact for programs

---

## 7. Accessibility Information Display

### Physical Requirements Section

**CaveTemplate Pattern** (upfront, detailed):
```astro
<section class="py-16 bg-brand-cream">
  <h2 class="font-display text-3xl md:text-4xl font-bold text-center mb-8">
    Accessibility & Physical Requirements
  </h2>

  <div class="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-sm border-l-4 border-brand-orange">
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Physical Requirements -->
      <div>
        <h3 class="font-display text-xl font-bold mb-4">
          Physical Requirements
        </h3>
        <ul class="space-y-2">
          {accessibility.physicalRequirements.map((req) => (
            <li class="text-sm flex items-start gap-2">
              <span class="text-brand-brown">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <!-- Limitations -->
      <div>
        <h3 class="font-display text-xl font-bold mb-4">Limitations</h3>
        <ul class="space-y-2">
          {accessibility.limitations.map((limitation) => (
            <li class="text-sm flex items-start gap-2">
              <span class="text-brand-orange">✗</span>
              {limitation}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <!-- Accommodations -->
    {accessibility.accommodations && (
      <div class="mt-8 pt-6 border-t">
        <h3 class="font-display text-lg font-bold mb-3">
          Accommodations Available
        </h3>
        <ul class="flex flex-wrap gap-3">
          {accessibility.accommodations.map((accommodation) => (
            <li class="bg-brand-cream px-3 py-1.5 rounded-sm text-sm">
              {accommodation}
            </li>
          ))}
        </ul>
      </div>
    )}

    <!-- Medical Disclaimer -->
    {accessibility.medicalDisclaimer && (
      <aside class="mt-6 p-4 bg-brand-cream rounded-sm" role="note">
        <p class="text-sm italic">
          <strong class="text-brand-brown not-italic">Medical Note:</strong>
          {accessibility.medicalDisclaimer}
        </p>
      </aside>
    )}
  </div>
</section>
```

**State Parks Application**:
- ADA-compliant facilities
- Trail accessibility ratings
- Mobility equipment availability
- Service animal policies

---

## 8. Contact Information Patterns

### Emergency Contacts (Tiered)

**BackcountryTemplate Pattern** (3-tier system):
```astro
<div class="space-y-3">
  {sortedEmergencyContacts.map((contact) => (
    <div class={`p-5 rounded-sm border-l-4 ${EMERGENCY_TIER_COLORS[contact.tier]} bg-white`}>
      <div class="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class={`px-2 py-0.5 rounded-sm text-xs font-bold ${EMERGENCY_TIER_COLORS[contact.tier]}`}>
              {EMERGENCY_TIER_LABELS[contact.tier]}
            </span>
          </div>
          <h4 class="font-body font-bold">{contact.service}</h4>
          {contact.responseTime && (
            <p class="text-xs text-brand-mud">Response: {contact.responseTime}</p>
          )}
          {contact.notes && (
            <p class="text-sm text-brand-mud mt-1">{contact.notes}</p>
          )}
        </div>
        <a
          href={`tel:${contact.phone}`}
          class="inline-flex items-center gap-2 bg-sign-green text-white px-4 py-2 rounded-sm font-body font-bold"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {formatPhoneNumber(contact.phone)}
        </a>
      </div>
      {contact.capabilities && (
        <div class="mt-3 flex flex-wrap gap-1">
          {contact.capabilities.map((cap) => (
            <span class="bg-brand-cream px-2 py-0.5 rounded-sm text-xs">
              {cap}
            </span>
          ))}
        </div>
      )}
    </div>
  ))}
</div>
```

**Type Structure** (backcountry-template-types.ts):
```typescript
export const TieredEmergencyContactSchema = z.object({
  service: z.string().min(1),
  phone: z.string().min(1),
  tier: EmergencyTierSchema,              // 'immediate' | '24x7' | 'business_hours'
  responseTime: z.string().optional(),    // "5-10 minutes" | "15-30 minutes"
  notes: z.string().optional(),
  capabilities: z.array(z.string()).optional(),
});

export const EMERGENCY_TIER_COLORS: Record<EmergencyTier, string> = {
  immediate: 'bg-red-700 text-white',
  '24x7': 'bg-brand-orange text-white',
  business_hours: 'bg-sign-green text-white',
};
```

**State Parks Application**:
- Park rangers (business hours)
- Park police (24/7)
- Emergency services (911)

### Park Office/Visitor Center Contact

**Simpler Pattern** (for non-emergency):
```astro
<div class="bg-brand-cream p-6 rounded-sm">
  <h3 class="font-display text-xl font-bold mb-4">Contact Information</h3>

  <div class="space-y-3">
    <div>
      <p class="text-sm text-brand-mud uppercase">Phone</p>
      <a href={`tel:${contact.phone}`} class="font-body font-medium text-sign-green hover:underline">
        {contact.phone}
      </a>
    </div>

    <div>
      <p class="text-sm text-brand-mud uppercase">Hours</p>
      <p class="font-body">{hours}</p>
    </div>

    <div>
      <p class="text-sm text-brand-mud uppercase">Email</p>
      <a href={`mailto:${contact.email}`} class="font-body text-sign-green hover:underline">
        {contact.email}
      </a>
    </div>

    {contact.website && (
      <div>
        <p class="text-sm text-brand-mud uppercase">Website</p>
        <a href={contact.website} target="_blank" rel="noopener noreferrer" class="font-body text-sign-green hover:underline">
          Visit Official Website →
        </a>
      </div>
    )}
  </div>
</div>
```

---

## 9. Shared Component Patterns

### AdventureGearChecklist

**All templates use identical integration**:
```astro
<AdventureGearChecklist
  items={gearList}
  title="What to Bring"
  columns={3}
  variant="white"
/>
```

**Type Structure** (adventure.ts):
```typescript
export const GearItemSchema = z.object({
  name: z.string().min(1),
  optional: z.boolean().default(false),
  icon: StatIconSchema.optional(),
});
```

### AdventureRelatedShop

**All templates use identical integration**:
```astro
<AdventureRelatedShop
  categories={relatedShop}
  title="Shop Before You Go"
/>
```

**Type Structure** (adventure.ts):
```typescript
export const RelatedCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  href: z.string().startsWith('/'),
  icon: StatIconSchema.optional(),
});
```

### AdventureCTA

**All templates use identical integration**:
```astro
<AdventureCTA
  heading={`Plan Your Trip to ${name}`}
  description="..."
  primaryText="Shop Gear"
  primaryHref="/shop/..."
  secondaryText="Contact Us"
  secondaryHref="/contact"
  variant="sign-green"
/>
```

---

## 10. Gaps & State Parks-Specific Needs

### What State Parks Need That Doesn't Exist

1. **Pool/Beach Operations**
   - Lifeguard schedules
   - Pool hours by season
   - Beach status (open/closed)
   - Water quality testing info
   - Concession stand hours

2. **Day-Use Areas**
   - Pavilion rentals (capacity, fees, booking)
   - Playground facilities
   - Picnic area maps
   - Group shelter information

3. **Educational Programs**
   - Ranger-led programs schedule
   - Junior Ranger programs
   - School group offerings
   - Nature center exhibits

4. **Boat Launch Details**
   - Ramp type (single/double/triple)
   - Trailer parking capacity
   - Launch fees
   - Restricted boat types
   - Horsepower limits

5. **Multi-Activity Integration**
   - State parks often combine: hiking, camping, boating, swimming, fishing
   - Need to balance depth across multiple activities vs. single-focus templates

### What State Parks Can Reuse As-Is

1. **Hero Section**: Stats grid, badges, tagline pattern
2. **Seasonal Info**: 4-season grid from Backcountry
3. **Lodging Display**: Ski template's card layout
4. **Activity Cards**: Lake template's grid
5. **Contact Info**: Simplified version of emergency contacts
6. **Gear Checklist**: Shared component
7. **Related Shop**: Shared component
8. **CTA Section**: Shared component

---

## 11. Recommended State Parks Template Structure

Based on analysis, here's the optimal section order:

1. **Hero** (park name, stats, badges)
2. **Description** (prose on cream)
3. **Lodging & Camping** (cabins, campgrounds) - CRITICAL for trip planning
4. **Activities** (hiking, swimming, boating, fishing) - Grid layout
5. **Facilities** (visitor center, beach, boat launch, pavilions)
6. **Programs & Events** (ranger programs, seasonal events)
7. **Seasonal Guide** (4-season grid with best activities)
8. **Regulations & Safety** (park rules, fees, emergency contacts)
9. **Gear Checklist** (shared component)
10. **Related Shop** (shared component)
11. **CTA** (shared component)

---

## 12. Type System Recommendations

### Reusable Types from Existing

```typescript
// FROM adventure.ts (REUSE AS-IS)
- GearItem
- RelatedCategory
- StatItem
- Coordinates
- Activity
- Difficulty (for trails)

// FROM ski-types.ts (ADAPT)
- Lodging (for cabins/lodges)
- Amenity (for facilities/services)

// FROM cave-types.ts (ADAPT)
- CaveHours → ParkHours (seasonal operating hours)
- CavePricing → ParkFees (tiered fee structure)

// FROM backcountry-types.ts (ADAPT)
- TieredEmergencyContact (for park rangers/police/911)
- SeasonalConditions (4-season pattern)
```

### New Types Needed for State Parks

```typescript
// Pool/Beach
export const BeachOperationsSchema = z.object({
  isOpen: z.boolean(),
  season: z.string(),                    // "Memorial Day - Labor Day"
  hours: z.string(),                     // "10am - 6pm"
  lifeguardSchedule: z.string().optional(),
  waterQuality: z.enum(['excellent', 'good', 'fair', 'closed']).optional(),
  concessions: z.array(z.string()).optional(),
});

// Day-Use Facilities
export const PavilionSchema = z.object({
  name: z.string(),
  capacity: z.number(),
  amenities: z.array(z.string()),
  rentalFee: z.string(),
  bookingRequired: z.boolean(),
  bookingUrl: z.string().url().optional(),
});

// Educational Programs
export const ParkProgramSchema = z.object({
  name: z.string(),
  description: z.string(),
  schedule: z.string(),                  // "Saturdays at 2pm" | "Daily"
  duration: z.string(),                  // "45 minutes" | "1-2 hours"
  ageGroup: z.string().optional(),       // "All ages" | "6-12" | "Adults"
  reservationRequired: z.boolean(),
  maxParticipants: z.number().optional(),
});

// Boat Launch
export const BoatLaunchSchema = z.object({
  name: z.string(),
  rampType: z.string(),                  // "Double concrete ramp"
  trailerParking: z.number(),            // 25 spaces
  fees: z.string(),                      // "Free" | "$5/day"
  restrictions: z.array(z.string()),     // "No PWC", "10hp limit"
});
```

---

## Summary

### Strongest Patterns to Carry Forward

1. **Lodging Display** (SkiTemplate) - card grid with amenities, pricing, booking CTAs
2. **Activity Cards** (LakeTemplate) - clean 3-column grid with difficulty badges
3. **Seasonal Grid** (BackcountryTemplate) - 4-season cards with temps, hazards, activities
4. **Tiered Pricing** (SkiTemplate/CaveTemplate) - 2-column or stacked cards with fees
5. **Contact Info** (BackcountryTemplate) - tiered emergency contacts with response times

### Weaknesses to Avoid

1. **Single-Activity Depth** - State parks need breadth across multiple activities
2. **Third-Party Booking Complexity** - State parks use unified WV State Parks system
3. **Seasonal Variation Complexity** - Some templates (Ski, Cave) have complex seasonal logic that's overkill for parks

### Key Insight

**State Parks are "multi-template hybrids"**: They combine elements of Lake (boating/fishing), Backcountry (hiking/camping), Ski (lodging/facilities), and Cave (programs/education). The challenge is balancing depth vs. breadth - providing enough detail for each activity without overwhelming the page.

**Recommended Approach**: Use **collapsible sections** or **tab navigation** for activities to maintain depth while keeping page length manageable.
