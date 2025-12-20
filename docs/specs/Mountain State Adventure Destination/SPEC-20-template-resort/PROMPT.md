# SPEC-20: Adventure Resort Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for ACE Adventure Resort structure
**Output**: `src/components/templates/ResortTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia adventure resorts focused on activity menus, lodging packages, outfitter services, and booking integration. Target ~550-600 lines with action-oriented presentation and comprehensive activity showcase.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:
```
"ACE Adventure Resort website structure"
"adventure resort website design best practices"
"outdoor activity booking system layout"
"multi-activity resort guide display"
```

**scout-explorer analysis**:
```bash
# Search for activity/lodging combination patterns
npx agentdb@latest skill search "activities lodging packages booking" 10

# Load similar resort/recreation patterns
npx agentdb@latest reflexion retrieve "resort activities lodging pricing" --k 10 --synthesize-context
```

**Deliverable**: Research findings on adventure resort content patterns, activity presentation, package structures, booking integration

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: Resort name, location, signature activities, season dates
2. **Activity Menu**: Full catalog organized by category (water, land, air, winter)
3. **Guided Trips**: Outfitter-led adventures with difficulty, duration, pricing
4. **Lodging Options**: Cabins, camping, glamping, group facilities
5. **Packages**: Multi-day bundles, group rates, family deals
6. **Outfitter Services**: Rentals, shuttles, guides, instruction
7. **Facilities**: Dining, retail, event spaces
8. **Booking & Policies**: Reservations, cancellations, what's included

**Props Interface**:
```typescript
interface ResortTemplateProps {
  name: string;
  location: string;
  acreage?: number;
  season: { open: string; close: string }; // dates or "Year-round"
  signatureActivities: string[];
  quickHighlights: string[];
  activityCategories: {
    category: string; // "Water Adventures", "Land Activities", "Air Sports", "Winter"
    activities: {
      name: string;
      difficulty: string; // "Beginner", "Intermediate", "Advanced", "All Levels"
      duration: string;
      minAge?: number;
      description: string;
      highlights: string[];
      season?: string;
      priceRange?: string;
    }[];
  }[];
  guidedTrips: {
    name: string;
    category: string; // Water, Land, Air
    difficulty: string;
    duration: string;
    groupSize: string; // e.g., "4-12 people"
    includes: string[];
    pricing: { type: string; price: string }[];
    minAge?: number;
    seasonalNotes?: string;
  }[];
  lodging: {
    type: string; // "Cabins", "Camping", "Glamping", "Bunkhouse", etc.
    capacity: string; // e.g., "Sleeps 4-6"
    amenities: string[];
    priceRange: string;
    photos?: string[];
    bookingUrl?: string;
  }[];
  packages: {
    name: string;
    duration: string; // e.g., "3 days / 2 nights"
    includes: string[];
    price: string;
    audience?: string; // "Families", "Groups", "Couples", etc.
    seasonalAvailability?: string;
  }[];
  outfitterServices: {
    category: string; // "Rentals", "Shuttles", "Instruction", "Guides"
    services: {
      name: string;
      description: string;
      pricing?: string;
      booking?: string;
    }[];
  }[];
  facilities: {
    dining?: {
      name: string;
      type: string; // "Restaurant", "Cafe", "Cookout", etc.
      hours: string;
      notes?: string;
    }[];
    retail?: {
      name: string;
      offerings: string[];
      hours: string;
    }[];
    eventSpaces?: {
      name: string;
      capacity: string;
      use: string; // "Weddings", "Corporate Retreats", etc.
    }[];
    other?: {
      type: string;
      description: string;
    }[];
  };
  booking: {
    reservationUrl?: string;
    phone: string;
    email?: string;
    policies: {
      category: string; // "Cancellation", "Weather", "Age Requirements", etc.
      details: string[];
    }[];
  };
  heroImage: string;
  activityMapUrl?: string;
}
```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/ResortTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~575 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Activity names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Activities: `border-l-4 border-l-sign-green`
   - Packages: `bg-brand-cream`
   - Pricing: `text-sign-green`
   - Booking/policies: `border-l-4 border-l-brand-orange`
4. **Layout**:
   - Desktop: 3-column grids for activities
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Action-oriented: "Book your whitewater adventure today"
   - Excitement: "Class V rapids and 70-foot waterfalls in a single day"
   - Practical: "All gear included - just bring your sense of adventure"

**Sections to Build**:

#### Hero Section
```astro
<section class="relative h-[80vh] min-h-[600px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/40">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-20">
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {name}
      </h1>
      <p class="font-display text-xl md:text-2xl text-brand-cream mb-6">
        {location}
      </p>
      <div class="flex flex-wrap gap-3 mb-8">
        {signatureActivities.map(activity => (
          <span class="bg-brand-orange text-white px-5 py-3 rounded-sm font-display text-lg font-bold">
            {activity}
          </span>
        ))}
      </div>
      <div class="flex flex-wrap gap-3 mb-8">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
      <p class="font-body text-brand-cream">
        Season: {season.open} – {season.close}
      </p>
      {booking.reservationUrl && (
        <a
          href={booking.reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-block bg-brand-orange text-white px-8 py-4 rounded-sm font-display text-xl font-bold hover:bg-brand-orange/90 w-fit"
        >
          Book Your Adventure
        </a>
      )}
    </div>
  </div>
</section>
```

#### Activity Menu Section
```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Activities
    </h2>
    {activityCategories.map(category => (
      <div class="mb-16 last:mb-0">
        <h3 class="font-display text-2xl md:text-3xl font-bold text-brand-brown mb-8">
          {category.category}
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.activities.map(activity => (
            <div class="border-l-4 border-l-sign-green pl-6 py-4">
              <h4 class="font-display text-xl font-bold text-brand-brown mb-2">
                {activity.name}
              </h4>
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="bg-brand-cream text-brand-brown px-2 py-1 rounded-sm text-xs font-bold">
                  {activity.difficulty}
                </span>
                <span class="bg-brand-cream text-brand-brown px-2 py-1 rounded-sm text-xs">
                  {activity.duration}
                </span>
                {activity.minAge && (
                  <span class="bg-brand-cream text-brand-brown px-2 py-1 rounded-sm text-xs">
                    Age {activity.minAge}+
                  </span>
                )}
              </div>
              <p class="font-body text-sm text-brand-mud mb-3">
                {activity.description}
              </p>
              {activity.highlights.length > 0 && (
                <ul class="space-y-1 mb-3">
                  {activity.highlights.map(highlight => (
                    <li class="font-body text-xs text-brand-mud flex items-start gap-2">
                      <span class="text-sign-green mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activity.priceRange && (
                <p class="font-display text-lg font-bold text-sign-green">
                  {activity.priceRange}
                </p>
              )}
              {activity.season && (
                <p class="font-body text-xs text-brand-mud/80 mt-2">
                  {activity.season}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>
```

#### Guided Trips Section
```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Guided Adventures
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {guidedTrips.map(trip => (
        <div class="bg-white border-l-4 border-l-brand-orange p-6 rounded-sm">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
            {trip.name}
          </h3>
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-brand-orange text-white px-3 py-1 rounded-sm text-sm font-bold">
              {trip.category}
            </span>
            <span class="bg-brand-cream text-brand-brown px-3 py-1 rounded-sm text-sm">
              {trip.difficulty}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-body text-xs text-brand-mud/80">Duration</p>
              <p class="font-body font-bold text-brand-brown">{trip.duration}</p>
            </div>
            <div>
              <p class="font-body text-xs text-brand-mud/80">Group Size</p>
              <p class="font-body font-bold text-brand-brown">{trip.groupSize}</p>
            </div>
          </div>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Includes:
            </p>
            <ul class="space-y-1">
              {trip.includes.map(item => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div class="pt-4 border-t border-brand-mud/20">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Pricing:
            </p>
            <div class="space-y-1">
              {trip.pricing.map(price => (
                <div class="flex items-center justify-between">
                  <span class="font-body text-sm text-brand-mud">{price.type}</span>
                  <span class="font-display font-bold text-sign-green">{price.price}</span>
                </div>
              ))}
            </div>
          </div>
          {trip.seasonalNotes && (
            <p class="font-body text-xs text-brand-mud/80 mt-4">
              {trip.seasonalNotes}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Lodging Section
```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Lodging
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {lodging.map(option => (
        <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-display text-xl font-bold text-brand-brown mb-1">
                {option.type}
              </h3>
              <p class="font-body text-sm text-brand-mud">
                {option.capacity}
              </p>
            </div>
            <span class="font-display text-lg font-bold text-sign-green">
              {option.priceRange}
            </span>
          </div>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Amenities:
            </p>
            <ul class="grid grid-cols-2 gap-2">
              {option.amenities.map(amenity => (
                <li class="font-body text-xs text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          {option.bookingUrl && (
            <a
              href={option.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-sign-green text-white px-4 py-2 rounded-sm font-display text-sm font-bold hover:bg-sign-green/90 w-full text-center"
            >
              Check Availability
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Packages Section
```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Adventure Packages
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {packages.map(pkg => (
        <div class="bg-white border-l-4 border-l-brand-orange p-8 rounded-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
                {pkg.name}
              </h3>
              {pkg.audience && (
                <p class="font-body text-sm text-sign-green">
                  Perfect for {pkg.audience}
                </p>
              )}
            </div>
            <span class="font-display text-2xl font-bold text-sign-green">
              {pkg.price}
            </span>
          </div>
          <p class="font-body text-brand-mud mb-4">
            {pkg.duration}
          </p>
          <div class="mb-4">
            <p class="font-body font-bold text-brand-brown mb-2">
              Package Includes:
            </p>
            <ul class="space-y-2">
              {pkg.includes.map(item => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {pkg.seasonalAvailability && (
            <p class="font-body text-xs text-brand-mud/80 pt-4 border-t border-brand-mud/20">
              {pkg.seasonalAvailability}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Outfitter Services Section
```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Outfitter Services
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {outfitterServices.map(category => (
        <div>
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
            {category.category}
          </h3>
          <div class="space-y-4">
            {category.services.map(service => (
              <div class="border-l-4 border-l-sign-green pl-6 py-3">
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-display font-bold text-brand-brown">
                    {service.name}
                  </h4>
                  {service.pricing && (
                    <span class="font-display font-bold text-sign-green">
                      {service.pricing}
                    </span>
                  )}
                </div>
                <p class="font-body text-sm text-brand-mud mb-2">
                  {service.description}
                </p>
                {service.booking && (
                  <p class="font-body text-xs text-brand-mud/80">
                    {service.booking}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

#### Booking & Policies Section
```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Reservations & Policies
    </h2>

    {/* Contact Info */}
    <div class="bg-white border-l-4 border-l-brand-orange p-8 rounded-sm mb-8">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Book Your Adventure
      </h3>
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <p class="font-body text-sm text-brand-mud/80 mb-1">Phone</p>
          <p class="font-display text-xl font-bold text-sign-green">
            {booking.phone}
          </p>
        </div>
        {booking.email && (
          <div>
            <p class="font-body text-sm text-brand-mud/80 mb-1">Email</p>
            <a
              href={`mailto:${booking.email}`}
              class="font-body text-sign-green hover:underline"
            >
              {booking.email}
            </a>
          </div>
        )}
        {booking.reservationUrl && (
          <div>
            <a
              href={booking.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-brand-orange text-white px-6 py-3 rounded-sm font-display font-bold hover:bg-brand-orange/90 w-full text-center"
            >
              Book Online
            </a>
          </div>
        )}
      </div>
    </div>

    {/* Policies */}
    <div class="grid md:grid-cols-2 gap-6">
      {booking.policies.map(policy => (
        <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            {policy.category}
          </h3>
          <ul class="space-y-2">
            {policy.details.map(detail => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{detail}</span>
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

## VALIDATION CRITERIA

**Completeness**:
- [ ] ~575 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced
- [ ] Border-left accents (green for activities, orange for packages)
- [ ] Action-oriented CTAs
- [ ] Pricing clearly displayed

**Functionality**:
- [ ] Conditional rendering (packages, facilities, policies)
- [ ] Booking URL integration throughout
- [ ] Activity categorization clear
- [ ] Multi-tier pricing support

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** (WebSearch ACE Adventure Resort) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/resort-patterns` - Research findings
- `swarm/architect/resort-structure` - Component architecture
- `swarm/generator/resort-template` - Final template path

**Hooks**:
```bash
npx claude-flow@alpha hooks pre-task --description "Resort template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/ResortTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-20"
```

---

## SUCCESS METRICS

- Template ~575 lines with activity showcase focus
- Props interface supports all resort content needs
- Multiple booking CTAs strategically placed
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
