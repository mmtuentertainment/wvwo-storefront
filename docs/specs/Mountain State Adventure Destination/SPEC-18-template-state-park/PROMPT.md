# SPEC-18: State Park Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for Blackwater Falls, Pipestem structures
**Output**: `src/components/templates/StateParkTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia State Parks focused on facilities, trails, overlooks, visitor centers, and family-friendly recreation. Target ~500-550 lines with accessibility emphasis and diverse activity options.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```text
"Blackwater Falls State Park website structure"
"Pipestem Resort State Park guide layout"
"state park website design best practices"
"park facility amenities display"

```

**scout-explorer analysis**:

```bash
# Search for family recreation and facility patterns
npx agentdb@latest skill search "facilities trails visitor amenities" 10

# Load similar park/recreation patterns
npx agentdb@latest reflexion retrieve "recreation facilities family activities" --k 10 --synthesize-context

```typescript

**Deliverable**: Research findings on state park content patterns, facility presentation, trail information, visitor services

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:

1. **Hero**: Park name, acreage, signature feature, quick highlights
2. **Facilities**: Lodging, camping, visitor center, picnic areas, playgrounds
3. **Trails**: Hiking trails with difficulty, distance, highlights
4. **Scenic Overlooks**: Named viewpoints with accessibility, best times
5. **Activities**: Swimming, fishing, boating, winter sports, programs
6. **Visitor Center**: Hours, exhibits, ranger programs, educational resources
7. **Camping & Lodging**: Campground details, cabins, reservations
8. **Accessibility**: ADA compliance, accessible trails, facilities

**Props Interface**:

```typescript
interface StateParkTemplateProps {
  name: string;
  acreage: number;
  location: string;
  signatureFeature: string; // e.g., "62-foot waterfall"
  quickHighlights: string[];
  facilities: {
    lodging?: {
      type: string; // "Lodge", "Cabins", etc.
      count?: number;
      amenities: string[];
      reservationUrl?: string;
      priceRange?: string;
    }[];
    camping?: {
      name: string;
      sites: number;
      type: string; // "Electric", "Primitive", etc.
      amenities: string[];
      season: string;
    }[];
    picnicAreas: {
      name: string;
      shelters: number;
      capacity?: string;
      reservable: boolean;
    }[];
    other: {
      type: string; // "Playground", "Swimming Pool", "Game Courts", etc.
      description: string;
    }[];
  };
  trails: {
    name: string;
    distance: string;
    difficulty: string;
    elevationGain?: string;
    highlights: string[];
    accessible?: boolean;
  }[];
  overlooks: {
    name: string;
    description: string;
    accessibility: string; // "Wheelchair accessible", "Short walk", etc.
    bestTime: string; // "Sunrise", "Fall foliage", etc.
    parking: string;
  }[];
  activities: {
    category: string; // "Water", "Winter", "Programs", etc.
    options: {
      name: string;
      description: string;
      season?: string;
      cost?: string;
    }[];
  }[];
  visitorCenter: {
    name: string;
    hours: { season: string; times: string }[];
    exhibits: string[];
    programs?: {
      name: string;
      description: string;
      schedule: string;
    }[];
    contact: { phone: string; email?: string };
  };
  accessibility: {
    adaCompliant: string[];
    accessibleTrails: string[];
    assistiveServices: string[];
  };
  fees: {
    type: string; // "Day Use", "Camping", "Cabin", etc.
    amount: string;
    notes?: string;
  }[];
  heroImage: string;
  parkMapUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/StateParkTemplate.astro`

**Implementation Rules**:

1. **Length**: Target ~525 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Facility names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Facilities: `bg-brand-cream`
   - Trails: `border-l-4 border-l-sign-green`
   - Overlooks: `border-l-4 border-l-brand-brown`
   - Accessibility: `border-l-4 border-l-brand-orange` (high visibility)
4. **Layout**:
   - Desktop: 2-3 column grids for trails/facilities/activities
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Family-friendly: "The falls are spectacular - and just a short walk from parking"
   - Practical: "Reserve cabins early for fall foliage season"
   - Inclusive: "Accessible trails let everyone enjoy the views"

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
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-cream mb-6">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Acreage</span>
          <p class="font-display text-2xl font-bold">{acreage.toLocaleString()}</p>
        </div>
        <div class="font-body col-span-2">
          <span class="text-sm uppercase tracking-wide opacity-80">Signature Feature</span>
          <p class="font-display text-2xl font-bold">{signatureFeature}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 mb-6">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
      {parkMapUrl && (
        <a
          href={parkMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-brand-cream hover:text-white transition-colors font-body text-sm"
        >
          <span>Download Park Map →</span>
        </a>
      )}
    </div>
  </div>
</section>

```markdown

#### Trails Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Hiking Trails
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {trails.map(trail => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="font-display text-xl font-bold text-brand-brown">
              {trail.name}
            </h3>
            {trail.accessible && (
              <span class="bg-brand-orange text-white px-2 py-1 rounded-sm text-xs font-bold">
                ♿ Accessible
              </span>
            )}
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p class="font-body text-xs text-brand-mud/80">Distance</p>
              <p class="font-body font-bold text-brand-brown">{trail.distance}</p>
            </div>
            <div>
              <p class="font-body text-xs text-brand-mud/80">Difficulty</p>
              <p class="font-body font-bold text-brand-brown">{trail.difficulty}</p>
            </div>
          </div>
          {trail.elevationGain && (
            <p class="font-body text-sm text-brand-mud mb-3">
              <span class="font-bold">Elevation Gain:</span> {trail.elevationGain}
            </p>
          )}
          <div>
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Highlights:
            </p>
            <ul class="space-y-1">
              {trail.highlights.map(highlight => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Scenic Overlooks Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Scenic Overlooks
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {overlooks.map(overlook => (
        <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
            {overlook.name}
          </h3>
          <p class="font-body text-brand-mud mb-4">
            {overlook.description}
          </p>
          <div class="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p class="font-body text-xs text-brand-mud/80">Accessibility</p>
              <p class="font-body text-sm font-bold text-brand-brown">
                {overlook.accessibility}
              </p>
            </div>
            <div>
              <p class="font-body text-xs text-brand-mud/80">Best Time</p>
              <p class="font-body text-sm font-bold text-brand-brown">
                {overlook.bestTime}
              </p>
            </div>
          </div>
          <p class="font-body text-xs text-brand-mud/80">
            <span class="font-bold">Parking:</span> {overlook.parking}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

```markdown

#### Facilities Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Park Facilities
    </h2>

    {/* Lodging */}
    {facilities.lodging && facilities.lodging.length > 0 && (
      <div class="mb-12">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Lodging
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.lodging.map(lodge => (
            <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <h4 class="font-display font-bold text-brand-brown">
                    {lodge.type}
                  </h4>
                  {lodge.count && (
                    <p class="font-body text-sm text-brand-mud">
                      {lodge.count} available
                    </p>
                  )}
                </div>
                {lodge.priceRange && (
                  <span class="font-display font-bold text-sign-green">
                    {lodge.priceRange}
                  </span>
                )}
              </div>
              <ul class="space-y-1 mb-4">
                {lodge.amenities.map(amenity => (
                  <li class="font-body text-xs text-brand-mud flex items-start gap-2">
                    <span class="text-sign-green mt-1">•</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
              {lodge.reservationUrl && (
                <a
                  href={lodge.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block bg-sign-green text-white px-3 py-2 rounded-sm font-display text-sm font-bold hover:bg-sign-green/90"
                >
                  Reserve
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Camping */}
    {facilities.camping && facilities.camping.length > 0 && (
      <div class="mb-12">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Camping
        </h3>
        <div class="grid md:grid-cols-2 gap-6">
          {facilities.camping.map(camp => (
            <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
              <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
                {camp.name}
              </h4>
              <p class="font-body text-brand-mud mb-2">
                <span class="font-bold">{camp.sites} sites</span> • {camp.type}
              </p>
              <p class="font-body text-sm text-brand-mud mb-3">
                Season: {camp.season}
              </p>
              <ul class="space-y-1">
                {camp.amenities.map(amenity => (
                  <li class="font-body text-xs text-brand-mud flex items-start gap-2">
                    <span class="text-sign-green mt-1">✓</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Picnic Areas */}
    <div class="mb-12">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Picnic Areas
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        {facilities.picnicAreas.map(area => (
          <div class="border-l-4 border-l-sign-green pl-6 py-4">
            <h4 class="font-display font-bold text-brand-brown mb-2">
              {area.name}
            </h4>
            <p class="font-body text-sm text-brand-mud mb-1">
              {area.shelters} shelter{area.shelters > 1 ? 's' : ''}
            </p>
            {area.capacity && (
              <p class="font-body text-xs text-brand-mud/80 mb-2">
                Capacity: {area.capacity}
              </p>
            )}
            <p class="font-body text-xs text-brand-brown">
              {area.reservable ? '✓ Reservable' : 'First-come, first-served'}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Other Facilities */}
    {facilities.other && facilities.other.length > 0 && (
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Other Amenities
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.other.map(facility => (
            <div class="border-l-4 border-l-brand-mud pl-6 py-4">
              <h4 class="font-display font-bold text-brand-brown mb-2">
                {facility.type}
              </h4>
              <p class="font-body text-sm text-brand-mud">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

```

#### Activities Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Activities
    </h2>
    <div class="space-y-8">
      {activities.map(category => (
        <div>
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
            {category.category}
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.options.map(option => (
              <div class="bg-white border-l-4 border-l-sign-green p-6 rounded-sm">
                <h4 class="font-display font-bold text-brand-brown mb-2">
                  {option.name}
                </h4>
                <p class="font-body text-sm text-brand-mud mb-3">
                  {option.description}
                </p>
                {option.season && (
                  <p class="font-body text-xs text-brand-mud/80 mb-1">
                    <span class="font-bold">Season:</span> {option.season}
                  </p>
                )}
                {option.cost && (
                  <p class="font-body text-xs text-sign-green">
                    {option.cost}
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

```markdown

#### Accessibility Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Accessibility
    </h2>
    <div class="border-l-4 border-l-brand-orange bg-brand-cream p-8 rounded-sm">
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            ADA Compliant Facilities
          </h3>
          <ul class="space-y-2">
            {accessibility.adaCompliant.map(facility => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">✓</span>
                <span>{facility}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            Accessible Trails
          </h3>
          <ul class="space-y-2">
            {accessibility.accessibleTrails.map(trail => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">♿</span>
                <span>{trail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {accessibility.assistiveServices.length > 0 && (
        <div class="pt-6 border-t border-brand-mud/20">
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            Assistive Services Available
          </h3>
          <ul class="grid md:grid-cols-2 gap-2">
            {accessibility.assistiveServices.map(service => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</section>

```

---

## VALIDATION CRITERIA

**Completeness**:

- [ ] ~525 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:

- [ ] `rounded-sm` enforced
- [ ] Border-left accents throughout
- [ ] Accessibility prominently featured
- [ ] Family-friendly voice

**Functionality**:

- [ ] Conditional rendering (lodging, camping, programs)
- [ ] Reservation URL support
- [ ] Accessible trail indicators
- [ ] Park map download link

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:

1. **researcher** (WebSearch Blackwater Falls/Pipestem) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:

- `swarm/researcher/state-park-patterns` - Research findings
- `swarm/architect/state-park-structure` - Component architecture
- `swarm/generator/state-park-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "State Park template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/StateParkTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-18"

```typescript

---

## SUCCESS METRICS

- Template ~525 lines with facility/activity focus
- Props interface supports all state park content
- Accessibility emphasized throughout
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
