# SPEC-13: Lake Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Example**: summersville-lake.astro (603 lines - PERFECT length)
**Output**: `src/components/templates/LakeTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia lakes that matches the structure and depth of summersville-lake.astro (603 lines) with fishing-centric content organization, marina details, camping facilities, and seasonal activity guides.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```
"lake recreation website structure fishing camping"
"marina facility display best practices"
"seasonal lake activity guide layout"

```

**scout-explorer analysis**:

```bash
# Analyze existing lake page structure
npx agentdb@latest skill search "summersville lake fishing camping" 10

```

**Deliverable**: Research findings on lake recreation patterns, seasonal activity presentation, marina/camping amenities

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + summersville-lake.astro structure
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: Lake name, acreage, depth stats, quick highlights
2. **What to Fish**: Species guide with seasonal patterns
3. **Where to Fish**: Named coves/points with depth/structure
4. **Camping**: Campgrounds with amenities, sites, reservations
5. **Marina**: Boat launch, rentals, fuel, supplies
6. **Activities**: Swimming, kayaking, diving, hiking nearby
7. **Seasonal Guide**: Best times for each activity
8. **Safety & Regulations**: Boating rules, hazards, permits

**Props Interface**:

```typescript
interface LakeTemplateProps {
  name: string;
  acreage: number;
  maxDepth: number;
  county: string;
  quickHighlights: string[];
  fishSpecies: {
    name: string;
    season: string;
    techniques: string[];
    hotSpots?: string;
    kimsTip?: string;
  }[];
  fishingSpots: {
    name: string;
    depth: string;
    structure: string;
    species: string[];
    access: string;
  }[];
  campgrounds: {
    name: string;
    sites: number;
    amenities: string[];
    reservationUrl?: string;
    season: string;
  }[];
  marina: {
    name: string;
    services: string[];
    boatLaunch: { ramps: number; fee?: string };
    rentals?: string[];
    hours: string;
    contact: string;
  };
  activities: {
    name: string;
    description: string;
    season: string;
    difficulty?: string;
  }[];
  seasonalGuide: {
    season: string;
    highlights: string[];
    fishingFocus?: string;
  }[];
  regulations: {
    category: string;
    rules: string[];
  }[];
  heroImage: string;
  mapUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + summersville-lake.astro reference
**Output**: `src/components/templates/LakeTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~600 lines (matches summersville-lake.astro)
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Species/spot names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Fish species cards: `border-l-4 border-l-sign-green`
   - Fishing spots: `bg-white border-l-4 border-l-brand-brown`
   - Camping: `bg-brand-cream`
   - Safety/regs: `border-l-4 border-l-brand-orange`
4. **Layout**:
   - Desktop: 2-3 column grids for species/spots/activities
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Fishing focus: "Smallmouth hit topwater at dawn near the rock walls"
   - Local knowledge: "Launch at the dam end - it's deeper and less crowded"
   - Kim's tips in `font-hand` throughout

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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-brand-cream">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Acreage</span>
          <p class="font-display text-2xl font-bold">{acreage.toLocaleString()}</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Max Depth</span>
          <p class="font-display text-2xl font-bold">{maxDepth} ft</p>
        </div>
        <div class="font-body col-span-2">
          <span class="text-sm uppercase tracking-wide opacity-80">Location</span>
          <p class="font-display text-2xl font-bold">{county} County</p>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

```

#### What to Fish Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      What to Fish
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fishSpecies.map(species => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
            {species.name}
          </h3>
          <p class="font-body text-brand-mud mb-3">
            <span class="font-bold">Best Season:</span> {species.season}
          </p>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Techniques:
            </p>
            <ul class="space-y-1">
              {species.techniques.map(tech => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
          {species.hotSpots && (
            <p class="font-body text-sm text-brand-mud/80 mb-3">
              <span class="font-bold">Hot Spots:</span> {species.hotSpots}
            </p>
          )}
          {species.kimsTip && (
            <p class="font-hand text-sm text-brand-brown mt-4 pt-4 border-t border-brand-mud/20">
              Kim says: "{species.kimsTip}"
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Where to Fish Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Where to Fish
    </h2>
    <div class="space-y-6">
      {fishingSpots.map(spot => (
        <div class="bg-white border-l-4 border-l-brand-brown p-6 md:p-8 rounded-sm">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
            {spot.name}
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <p class="font-body text-brand-mud mb-2">
                <span class="font-bold">Depth:</span> {spot.depth}
              </p>
              <p class="font-body text-brand-mud mb-2">
                <span class="font-bold">Structure:</span> {spot.structure}
              </p>
              <p class="font-body text-brand-mud mb-2">
                <span class="font-bold">Access:</span> {spot.access}
              </p>
            </div>
            <div>
              <p class="font-body font-bold text-brand-brown mb-2">Target Species:</p>
              <div class="flex flex-wrap gap-2">
                {spot.species.map(s => (
                  <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Camping Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Camping
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {campgrounds.map(camp => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            {camp.name}
          </h3>
          <p class="font-body text-brand-mud mb-3">
            <span class="font-bold">{camp.sites} sites</span> • {camp.season}
          </p>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Amenities:
            </p>
            <ul class="grid grid-cols-2 gap-2">
              {camp.amenities.map(amenity => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">✓</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          {camp.reservationUrl && (
            <a
              href={camp.reservationUrl}
              class="inline-block bg-sign-green text-white px-4 py-2 rounded-sm font-display text-sm font-bold hover:bg-sign-green/90 transition-colors"
            >
              Reserve Now
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Marina Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Marina & Boat Access
    </h2>
    <div class="bg-white border-l-4 border-l-brand-brown p-8 rounded-sm">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        {marina.name}
      </h3>
      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <p class="font-body font-bold text-brand-brown mb-3">Services:</p>
          <ul class="space-y-2">
            {marina.services.map(service => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">•</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p class="font-body font-bold text-brand-brown mb-3">Boat Launch:</p>
          <p class="font-body text-brand-mud mb-2">
            {marina.boatLaunch.ramps} ramp{marina.boatLaunch.ramps > 1 ? 's' : ''}
          </p>
          {marina.boatLaunch.fee && (
            <p class="font-body text-sm text-brand-mud/80">
              Fee: {marina.boatLaunch.fee}
            </p>
          )}
          {marina.rentals && (
            <div class="mt-4">
              <p class="font-body font-bold text-brand-brown mb-2">Rentals:</p>
              <p class="font-body text-sm text-brand-mud">
                {marina.rentals.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
      <div class="pt-6 border-t border-brand-mud/20">
        <p class="font-body text-brand-mud mb-2">
          <span class="font-bold">Hours:</span> {marina.hours}
        </p>
        <p class="font-body text-brand-mud">
          <span class="font-bold">Contact:</span> {marina.contact}
        </p>
      </div>
    </div>
  </div>
</section>

```

#### Safety & Regulations Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Safety & Regulations
    </h2>
    <div class="space-y-6">
      {regulations.map(reg => (
        <div class="border-l-4 border-l-brand-orange bg-brand-cream p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
            {reg.category}
          </h3>
          <ul class="space-y-2">
            {reg.rules.map(rule => (
              <li class="font-body text-brand-mud flex items-start gap-3">
                <span class="text-brand-orange mt-1 font-bold">•</span>
                <span>{rule}</span>
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
- [ ] ~600 lines (matches summersville-lake.astro depth)
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced (not md/lg)
- [ ] Border-left accents (green for fish, brown for spots, orange for safety)
- [ ] Kim's tips in `font-hand`
- [ ] `font-display`, `font-body`, `font-hand` hierarchy

**Fishing Focus**:
- [ ] Species techniques prominently featured
- [ ] Fishing spots with depth/structure details
- [ ] Seasonal patterns emphasized
- [ ] Local knowledge (Kim's tips) throughout

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** + **scout-explorer** → Pattern research (parallel)
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/lake-patterns` - Research findings
- `swarm/architect/lake-structure` - Component architecture
- `swarm/generator/lake-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "Lake template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/LakeTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-13"

```

---

## SUCCESS METRICS

- Template matches summersville-lake.astro depth (~600 lines)
- Props interface supports all lake recreation content
- Fishing-centric organization (primary focus)
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
