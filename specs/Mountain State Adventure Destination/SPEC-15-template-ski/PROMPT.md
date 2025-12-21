# SPEC-15: Ski Resort Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for Snowshoe, Canaan Valley structures
**Output**: `src/components/templates/SkiTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia ski resorts focused on trail information, vertical drop stats, season pass details, and lodging options. Target ~500-600 lines with winter sports emphasis, lift ticket pricing, and snow conditions.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```
"Snowshoe Mountain ski resort website structure"
"Canaan Valley ski area guide layout"
"ski resort website design best practices"
"trail map display ski difficulty ratings"

```

**scout-explorer analysis**:

```bash
# Search for any existing winter/seasonal content patterns
npx agentdb@latest skill search "seasonal activity lodging pricing" 10

# Load similar recreation facility patterns
npx agentdb@latest reflexion retrieve "recreation facilities amenities" --k 10 --synthesize-context

```

**Deliverable**: Research findings on ski resort content patterns, trail information display, pricing structures, lodging integration

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: Resort name, elevation, vertical drop, season dates, quick stats
2. **Trail Count**: Breakdown by difficulty (beginner/intermediate/expert), total acreage
3. **Lift System**: Number of lifts, types, capacity, coverage
4. **Snow Conditions**: Current conditions widget/link, average snowfall, snowmaking
5. **Pricing**: Lift tickets (day/multi-day), season passes, rentals
6. **Terrain Parks**: Features, difficulty, locations
7. **Lodging**: On-mountain options, nearby hotels, packages
8. **Dining & Amenities**: Restaurants, rentals, lessons, childcare
9. **Summer Activities**: (if applicable) mountain biking, hiking, zip lines

**Props Interface**:

```typescript
interface SkiTemplateProps {
  name: string;
  location: string;
  elevation: { base: number; summit: number; vertical: number }; // feet
  season: { open: string; close: string }; // dates
  quickStats: string[];
  trails: {
    total: number;
    beginner: number;
    intermediate: number;
    expert: number;
    acreage: number;
    longestRun?: string; // e.g., "1.5 miles"
  };
  lifts: {
    total: number;
    types: { type: string; count: number }[]; // e.g., "High-speed quad", 2
    capacity: string; // e.g., "12,000 skiers/hour"
  };
  snowConditions: {
    averageSnowfall: string; // e.g., "180 inches"
    snowmaking: string; // e.g., "100% coverage"
    conditionsUrl?: string; // Real-time snow report link
  };
  pricing: {
    liftTickets: {
      type: string; // "Adult Day", "Child Day", "Multi-Day"
      price: string;
      notes?: string;
    }[];
    seasonPass: {
      type: string;
      price: string;
      benefits?: string[];
    }[];
    rentals?: {
      package: string;
      price: string;
    }[];
  };
  terrainParks?: {
    name: string;
    difficulty: string; // "Beginner", "Intermediate", "Advanced"
    features: string[];
  }[];
  lodging: {
    name: string;
    type: string; // "On-Mountain", "Nearby Hotel", "Condo"
    distance?: string;
    amenities: string[];
    priceRange?: string;
    bookingUrl?: string;
  }[];
  dining: {
    name: string;
    type: string; // "Cafeteria", "Sit-Down", "Bar", etc.
    location: string;
    notes?: string;
  }[];
  amenities: {
    category: string; // "Rentals", "Lessons", "Childcare"
    services: string[];
  }[];
  summerActivities?: {
    name: string;
    description: string;
    season: string;
  }[];
  heroImage: string;
  trailMapUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/SkiTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~550-600 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Stats: `font-display text-2xl font-bold`
3. **Colors**:
   - Trail difficulty: Green (beginner), blue (intermediate), black (expert)
   - Pricing: `bg-brand-cream` with `border-l-4 border-l-sign-green`
   - Snow conditions: `bg-white` with `text-sign-green` emphasis
   - Safety/conditions: `border-l-4 border-l-brand-orange`
4. **Layout**:
   - Desktop: 3-column grids for trails/pricing/lodging
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Local pride: "Snowshoe's vertical drop rivals resorts twice its size"
   - Practical: "Rentals save you baggage fees and hassle"
   - Kim's touch: "Ask about local discounts at the shop"

**Sections to Build**:

#### Hero Section

```astro
<section class="relative h-[70vh] min-h-[500px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/50">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {name}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-brand-cream mb-6">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Summit</span>
          <p class="font-display text-2xl font-bold">{elevation.summit.toLocaleString()} ft</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Vertical Drop</span>
          <p class="font-display text-2xl font-bold">{elevation.vertical.toLocaleString()} ft</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Trails</span>
          <p class="font-display text-2xl font-bold">{trails.total}</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Lifts</span>
          <p class="font-display text-2xl font-bold">{lifts.total}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 mb-6">
        {quickStats.map(stat => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {stat}
          </span>
        ))}
      </div>
      <p class="font-body text-brand-cream">
        Season: {season.open} – {season.close}
      </p>
      {snowConditions.conditionsUrl && (
        <a
          href={snowConditions.conditionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center gap-2 text-brand-cream hover:text-white transition-colors font-body text-sm"
        >
          <span>Check Current Snow Conditions →</span>
        </a>
      )}
    </div>
  </div>
</section>

```

#### Trail Breakdown Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between mb-12">
      <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown">
        Trail Breakdown
      </h2>
      {trailMapUrl && (
        <a
          href={trailMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-sign-green text-white px-4 py-2 rounded-sm font-display text-sm font-bold hover:bg-sign-green/90"
        >
          View Trail Map
        </a>
      )}
    </div>
    <div class="grid md:grid-cols-3 gap-8 mb-8">
      <div class="border-l-4 border-l-green-500 pl-6 py-4">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-6 h-6 rounded-full bg-green-500"></span>
          <h3 class="font-display text-xl font-bold text-brand-brown">Beginner</h3>
        </div>
        <p class="font-display text-3xl font-bold text-sign-green">
          {trails.beginner}
        </p>
        <p class="font-body text-sm text-brand-mud mt-1">
          {Math.round((trails.beginner / trails.total) * 100)}% of trails
        </p>
      </div>
      <div class="border-l-4 border-l-blue-500 pl-6 py-4">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-6 h-6 rounded-sm bg-blue-500"></span>
          <h3 class="font-display text-xl font-bold text-brand-brown">Intermediate</h3>
        </div>
        <p class="font-display text-3xl font-bold text-sign-green">
          {trails.intermediate}
        </p>
        <p class="font-body text-sm text-brand-mud mt-1">
          {Math.round((trails.intermediate / trails.total) * 100)}% of trails
        </p>
      </div>
      <div class="border-l-4 border-l-black pl-6 py-4">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-6 h-6 rounded-sm bg-black"></span>
          <h3 class="font-display text-xl font-bold text-brand-brown">Expert</h3>
        </div>
        <p class="font-display text-3xl font-bold text-sign-green">
          {trails.expert}
        </p>
        <p class="font-body text-sm text-brand-mud mt-1">
          {Math.round((trails.expert / trails.total) * 100)}% of trails
        </p>
      </div>
    </div>
    <div class="bg-brand-cream p-6 rounded-sm">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <p class="font-body text-brand-brown">
            <span class="font-bold">Total Acreage:</span> {trails.acreage} acres
          </p>
        </div>
        {trails.longestRun && (
          <div>
            <p class="font-body text-brand-brown">
              <span class="font-bold">Longest Run:</span> {trails.longestRun}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

```

#### Pricing Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Pricing
    </h2>

    {/* Lift Tickets */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Lift Tickets
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        {pricing.liftTickets.map(ticket => (
          <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
            <h4 class="font-display font-bold text-brand-brown mb-2">
              {ticket.type}
            </h4>
            <p class="font-display text-2xl font-bold text-sign-green mb-2">
              {ticket.price}
            </p>
            {ticket.notes && (
              <p class="font-body text-sm text-brand-mud/80">
                {ticket.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Season Passes */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Season Passes
      </h3>
      <div class="grid md:grid-cols-2 gap-6">
        {pricing.seasonPass.map(pass => (
          <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
            <h4 class="font-display text-xl font-bold text-brand-brown mb-3">
              {pass.type}
            </h4>
            <p class="font-display text-3xl font-bold text-sign-green mb-4">
              {pass.price}
            </p>
            {pass.benefits && (
              <div>
                <p class="font-body text-sm font-bold text-brand-brown mb-2">
                  Includes:
                </p>
                <ul class="space-y-1">
                  {pass.benefits.map(benefit => (
                    <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                      <span class="text-sign-green mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Rentals */}
    {pricing.rentals && pricing.rentals.length > 0 && (
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Equipment Rentals
        </h3>
        <div class="grid md:grid-cols-3 gap-6">
          {pricing.rentals.map(rental => (
            <div class="bg-white border-l-4 border-l-brand-mud p-6 rounded-sm">
              <h4 class="font-display font-bold text-brand-brown mb-2">
                {rental.package}
              </h4>
              <p class="font-display text-xl font-bold text-sign-green">
                {rental.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
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
    <div class="grid md:grid-cols-2 gap-8">
      {lodging.map(lodge => (
        <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-display text-xl font-bold text-brand-brown mb-1">
                {lodge.name}
              </h3>
              <p class="font-body text-sm text-brand-mud">
                {lodge.type}
                {lodge.distance && ` • ${lodge.distance}`}
              </p>
            </div>
            {lodge.priceRange && (
              <span class="font-display font-bold text-sign-green">
                {lodge.priceRange}
              </span>
            )}
          </div>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Amenities:
            </p>
            <ul class="grid grid-cols-2 gap-2">
              {lodge.amenities.map(amenity => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          {lodge.bookingUrl && (
            <a
              href={lodge.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block bg-sign-green text-white px-4 py-2 rounded-sm font-display text-sm font-bold hover:bg-sign-green/90"
            >
              Book Now
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

```

---

## VALIDATION CRITERIA

**Completeness**:
- [ ] ~550-600 lines
- [ ] All 9 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced
- [ ] Trail difficulty color-coded (green/blue/black)
- [ ] Border-left accents throughout
- [ ] Pricing clearly displayed

**Functionality**:
- [ ] Conditional rendering (terrain parks, summer activities, rentals)
- [ ] Real-time snow conditions link integration
- [ ] Booking URL support for lodging
- [ ] Trail map link prominent

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** (WebSearch Snowshoe/Canaan Valley) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/ski-patterns` - Research findings
- `swarm/architect/ski-structure` - Component architecture
- `swarm/generator/ski-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "Ski template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/SkiTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-15"

```

---

## SUCCESS METRICS

- Template ~550-600 lines with winter sports focus
- Props interface supports all ski resort content
- Trail breakdown visually clear with color coding
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
