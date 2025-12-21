# SPEC-14: River Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for Gauley River, New River guide structures
**Output**: `src/components/templates/RiverTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia rivers focused on whitewater rafting, fishing, and seasonal flow patterns. Target ~500-600 lines with safety-first organization, rapids guide, outfitter listings, and water level information.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```
"Gauley River rafting guide website structure"
"New River Gorge whitewater guide layout"
"river outfitter website design best practices"
"whitewater rapids classification display"

```

**scout-explorer analysis**:

```bash
# Search for any existing river content patterns in codebase
npx agentdb@latest skill search "river rafting fishing flow" 10

# Load similar outdoor recreation patterns
npx agentdb@latest reflexion retrieve "lake recreation seasonal" --k 10 --synthesize-context

```

**Deliverable**: Research findings on river guide content patterns, rapids presentation, outfitter information display, safety emphasis

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: River name, total length, difficulty range, quick highlights
2. **Rapids Guide**: Named rapids with class ratings, descriptions, hazards
3. **Fishing**: Species, seasons, access points, techniques
4. **Outfitters**: Guided trips, rentals, contact info, pricing ranges
5. **Seasonal Flow**: Water levels by season, best times, dam release schedules
6. **Access Points**: Put-ins, take-outs, parking, shuttle info
7. **Safety**: Hazards, required gear, skill levels, emergency contacts
8. **Nearby Attractions**: Trails, camping, towns

**Props Interface**:

```typescript
interface RiverTemplateProps {
  name: string;
  length: number; // miles
  county: string;
  difficultyRange: string; // e.g., "Class II-V"
  quickHighlights: string[];
  rapids: {
    name: string;
    class: string; // "I", "II", "III", "IV", "V"
    description: string;
    hazards?: string[];
    runnable: string; // water level conditions
  }[];
  fishing: {
    species: string[];
    seasons: string;
    accessPoints: { name: string; description: string }[];
    techniques: string[];
    kimsTip?: string;
  };
  outfitters: {
    name: string;
    services: string[];
    contact: { phone: string; website?: string };
    priceRange?: string;
    seasonalNotes?: string;
  }[];
  seasonalFlow: {
    season: string;
    waterLevel: string; // "Low", "Medium", "High"
    bestFor: string[];
    notes: string;
  }[];
  accessPoints: {
    name: string;
    type: string; // "Put-in", "Take-out", "Both"
    facilities: string[];
    coords?: string;
    shuttleInfo?: string;
  }[];
  safety: {
    category: string; // "Required Gear", "Hazards", "Skill Level", etc.
    items: string[];
  }[];
  nearbyAttractions: {
    name: string;
    type: string; // "Camping", "Hiking", "Town", etc.
    distance: string;
    description: string;
  }[];
  heroImage: string;
  mapUrl?: string;
  waterLevelUrl?: string; // Real-time gauge link
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/RiverTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~550 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl lg:text-6xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Rapids names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Rapids cards: Color-coded by class (II-III green, IV orange, V red)
   - Safety sections: `border-l-4 border-l-brand-orange` (high visibility)
   - Outfitters: `bg-brand-cream`
   - Access points: `border-l-4 border-l-sign-green`
4. **Layout**:
   - Desktop: 2-3 column grids for rapids/outfitters
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Safety-first: "Class V rapids require expert skills - no shortcuts"
   - Local knowledge: "Upper Gauley runs only 22 days a year - book early"
   - Kim's wisdom: "The fishing's best below the rapids where fish recover"

**Sections to Build**:

#### Hero Section

```astro
<section class="relative h-[70vh] min-h-[500px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/60">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {name}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-cream mb-6">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Length</span>
          <p class="font-display text-2xl font-bold">{length} miles</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Difficulty</span>
          <p class="font-display text-2xl font-bold">{difficultyRange}</p>
        </div>
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Location</span>
          <p class="font-display text-2xl font-bold">{county} County</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        {quickHighlights.map(highlight => (
          <span class="bg-sign-green text-white px-4 py-2 rounded-sm font-body text-sm">
            {highlight}
          </span>
        ))}
      </div>
      {waterLevelUrl && (
        <a
          href={waterLevelUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-2 text-brand-cream hover:text-white transition-colors font-body text-sm"
        >
          <span>Check Real-Time Water Levels →</span>
        </a>
      )}
    </div>
  </div>
</section>

```

#### Rapids Guide Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Rapids Guide
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rapids.map(rapid => {
        // Color-code by class
        const classNum = parseInt(rapid.class);
        const borderColor = classNum <= 3 ? 'border-l-sign-green' :
                           classNum === 4 ? 'border-l-brand-orange' :
                           'border-l-red-600';
        const badgeColor = classNum <= 3 ? 'bg-sign-green' :
                          classNum === 4 ? 'bg-brand-orange' :
                          'bg-red-600';

        return (
          <div class={`border-l-4 ${borderColor} pl-6 py-4`}>
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-display text-xl font-bold text-brand-brown">
                {rapid.name}
              </h3>
              <span class={`${badgeColor} text-white px-3 py-1 rounded-sm text-sm font-bold`}>
                Class {rapid.class}
              </span>
            </div>
            <p class="font-body text-brand-mud mb-3">
              {rapid.description}
            </p>
            {rapid.hazards && rapid.hazards.length > 0 && (
              <div class="mb-3">
                <p class="font-body text-sm font-bold text-brand-orange mb-2">
                  Hazards:
                </p>
                <ul class="space-y-1">
                  {rapid.hazards.map(hazard => (
                    <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                      <span class="text-brand-orange mt-1">⚠</span>
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p class="font-body text-xs text-brand-mud/80">
              Runnable: {rapid.runnable}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

```

#### Fishing Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Fishing
    </h2>
    <div class="bg-white border-l-4 border-l-sign-green p-8 rounded-sm">
      <div class="grid md:grid-cols-2 gap-8 mb-6">
        <div>
          <p class="font-body font-bold text-brand-brown mb-3">Species:</p>
          <div class="flex flex-wrap gap-2">
            {fishing.species.map(species => (
              <span class="bg-sign-green text-white px-3 py-1 rounded-sm text-sm">
                {species}
              </span>
            ))}
          </div>
          <p class="font-body text-brand-mud mt-4">
            <span class="font-bold">Best Seasons:</span> {fishing.seasons}
          </p>
        </div>
        <div>
          <p class="font-body font-bold text-brand-brown mb-3">Techniques:</p>
          <ul class="space-y-2">
            {fishing.techniques.map(tech => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">•</span>
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="mb-6">
        <p class="font-body font-bold text-brand-brown mb-3">Access Points:</p>
        <div class="space-y-3">
          {fishing.accessPoints.map(point => (
            <div>
              <p class="font-display font-bold text-brand-brown text-sm">
                {point.name}
              </p>
              <p class="font-body text-sm text-brand-mud">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {fishing.kimsTip && (
        <p class="font-hand text-sm text-brand-brown pt-6 border-t border-brand-mud/20">
          Kim says: "{fishing.kimsTip}"
        </p>
      )}
    </div>
  </div>
</section>

```

#### Outfitters Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Guided Trips & Outfitters
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {outfitters.map(outfitter => (
        <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
            {outfitter.name}
          </h3>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Services:
            </p>
            <ul class="space-y-1">
              {outfitter.services.map(service => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
          {outfitter.priceRange && (
            <p class="font-body text-sm text-brand-mud mb-3">
              <span class="font-bold">Price Range:</span> {outfitter.priceRange}
            </p>
          )}
          <div class="pt-4 border-t border-brand-mud/20">
            <p class="font-body text-sm text-brand-mud mb-1">
              <span class="font-bold">Phone:</span> {outfitter.contact.phone}
            </p>
            {outfitter.contact.website && (
              <a
                href={outfitter.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                class="font-body text-sm text-sign-green hover:underline"
              >
                Visit Website →
              </a>
            )}
          </div>
          {outfitter.seasonalNotes && (
            <p class="font-body text-xs text-brand-mud/80 mt-4">
              {outfitter.seasonalNotes}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Safety Section (Prominent)

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Safety Information
    </h2>
    <div class="space-y-6">
      {safety.map(category => (
        <div class="border-l-4 border-l-brand-orange bg-white p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
            {category.category}
          </h3>
          <ul class="space-y-2">
            {category.items.map(item => (
              <li class="font-body text-brand-mud flex items-start gap-3">
                <span class="text-brand-orange mt-1 font-bold">•</span>
                <span>{item}</span>
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
- [ ] ~550 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced
- [ ] Color-coded rapids by class (green/orange/red)
- [ ] Border-left accents throughout
- [ ] Safety sections highly visible (orange borders)

**Safety Emphasis**:
- [ ] Hazards prominently displayed in rapids guide
- [ ] Required gear clearly listed
- [ ] Skill level warnings present
- [ ] Emergency contacts included

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** (WebSearch Gauley/New River guides) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/river-patterns` - Research findings
- `swarm/architect/river-structure` - Component architecture
- `swarm/generator/river-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "River template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/RiverTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-14"

```

---

## SUCCESS METRICS

- Template ~550 lines with safety-first organization
- Props interface supports all river content needs
- Rapids color-coded by difficulty class
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
