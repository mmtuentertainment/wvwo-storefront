# SPEC-16: Cave Template

**Agent**: base-template-generator
**Coordinator**: hierarchical-coordinator (research → architect → generate)
**Reference Examples**: NEW (no existing page) - WebSearch for Seneca Caverns structures
**Output**: `src/components/templates/CaveTemplate.astro`

---

## MISSION

Create a reusable Astro template for West Virginia caves and caverns focused on tour information, geological formations, temperature/accessibility details, and visitor safety. Target ~450-500 lines with educational emphasis and practical visitor information.

---

## MULTI-AGENT ORCHESTRATION

### Phase 1: Pattern Research (researcher + scout-explorer)

**researcher WebSearch queries**:

```
"Seneca Caverns website structure tour information"
"cave tour website design best practices"
"cavern geological formation display"
"cave accessibility temperature information layout"

```

**scout-explorer analysis**:

```bash
# Search for educational/tour content patterns
npx agentdb@latest skill search "tour visitor education accessibility" 10

# Load similar attraction patterns
npx agentdb@latest reflexion retrieve "visitor facilities safety information" --k 10 --synthesize-context

```

**Deliverable**: Research findings on cave tour content patterns, formation presentation, accessibility information, safety guidelines

---

### Phase 2: Architecture Design (code-architect)

**Input**: Research findings + WebSearch results
**Output**: Component architecture specification

**Required Sections**:
1. **Hero**: Cave name, depth, discovery date, quick highlights
2. **Tour Information**: Duration, difficulty, group size, scheduling
3. **Formations**: Named features with descriptions and geology
4. **Temperature & Conditions**: Year-round temp, humidity, what to wear
5. **Accessibility**: Physical requirements, limitations, accommodations
6. **Pricing & Hours**: Tickets, group rates, seasonal hours
7. **Safety Guidelines**: Rules, hazards, what to bring/avoid
8. **History**: Discovery story, geological timeline, local legends

**Props Interface**:

```typescript
interface CaveTemplateProps {
  name: string;
  location: string;
  depth: number; // feet below surface
  discoveryYear?: number;
  quickHighlights: string[];
  tours: {
    name: string;
    duration: string; // e.g., "60 minutes"
    difficulty: string; // "Easy", "Moderate", "Strenuous"
    distance: string; // e.g., "0.5 miles"
    groupSize?: string;
    highlights: string[];
    seasonalNotes?: string;
  }[];
  formations: {
    name: string;
    type: string; // "Stalactite", "Stalagmite", "Column", "Flowstone", etc.
    description: string;
    ageEstimate?: string;
    funFact?: string;
  }[];
  conditions: {
    temperature: string; // e.g., "54°F year-round"
    humidity: string;
    whatToWear: string[];
    whatToBring: string[];
  };
  accessibility: {
    physicalRequirements: string[];
    limitations: string[];
    accommodations?: string[];
  };
  pricing: {
    type: string; // "Adult", "Child", "Senior", "Group"
    price: string;
    notes?: string;
  }[];
  hours: {
    season: string;
    days: string;
    times: string;
  }[];
  safety: {
    rules: string[];
    prohibited: string[];
    emergencyContact?: string;
  };
  history: {
    discovery: string;
    geologicalAge: string;
    notableEvents?: string[];
    localLegends?: string[];
  };
  heroImage: string;
  bookingUrl?: string;
}

```

---

### Phase 3: Template Generation (base-template-generator)

**Input**: Architecture spec + WebSearch research
**Output**: `src/components/templates/CaveTemplate.astro`

**Implementation Rules**:
1. **Length**: Target ~475 lines
2. **Typography**:
   - Hero: `font-display text-4xl md:text-5xl font-bold`
   - Section headers: `font-display text-3xl md:text-4xl`
   - Formation names: `font-display font-bold text-brand-brown`
3. **Colors**:
   - Tour info: `border-l-4 border-l-sign-green`
   - Safety/accessibility: `border-l-4 border-l-brand-orange`
   - Formations: `bg-brand-cream`
   - Fun facts: `font-hand` in `text-brand-brown`
4. **Layout**:
   - Desktop: 2-3 column grids for formations/tours/pricing
   - Mobile: Full-width stacked cards
5. **Voice**:
   - Educational: "These formations took 330 million years to create"
   - Practical: "Wear closed-toe shoes - the paths are damp and uneven"
   - Wonder: "The cathedral room is tall enough to fit a 5-story building"

**Sections to Build**:

#### Hero Section

```astro
<section class="relative h-[60vh] min-h-[400px]">
  <img src={heroImage} class="absolute inset-0 w-full h-full object-cover" />
  <div class="absolute inset-0 bg-brand-brown/70">
    <div class="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
      <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-6">
        {name}
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-brand-cream mb-6">
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Depth</span>
          <p class="font-display text-2xl font-bold">{depth} ft</p>
        </div>
        {discoveryYear && (
          <div class="font-body">
            <span class="text-sm uppercase tracking-wide opacity-80">Discovered</span>
            <p class="font-display text-2xl font-bold">{discoveryYear}</p>
          </div>
        )}
        <div class="font-body">
          <span class="text-sm uppercase tracking-wide opacity-80">Location</span>
          <p class="font-display text-2xl font-bold">{location}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
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

#### Tour Information Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Tours
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      {tours.map(tour => (
        <div class="border-l-4 border-l-sign-green pl-6 py-4">
          <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
            {tour.name}
          </h3>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-body text-sm text-brand-mud/80">Duration</p>
              <p class="font-body font-bold text-brand-brown">{tour.duration}</p>
            </div>
            <div>
              <p class="font-body text-sm text-brand-mud/80">Difficulty</p>
              <p class="font-body font-bold text-brand-brown">{tour.difficulty}</p>
            </div>
            <div>
              <p class="font-body text-sm text-brand-mud/80">Distance</p>
              <p class="font-body font-bold text-brand-brown">{tour.distance}</p>
            </div>
            {tour.groupSize && (
              <div>
                <p class="font-body text-sm text-brand-mud/80">Group Size</p>
                <p class="font-body font-bold text-brand-brown">{tour.groupSize}</p>
              </div>
            )}
          </div>
          <div class="mb-4">
            <p class="font-body text-sm font-bold text-brand-brown mb-2">
              Tour Highlights:
            </p>
            <ul class="space-y-1">
              {tour.highlights.map(highlight => (
                <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                  <span class="text-sign-green mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          {tour.seasonalNotes && (
            <p class="font-body text-xs text-brand-mud/80 pt-4 border-t border-brand-mud/20">
              {tour.seasonalNotes}
            </p>
          )}
        </div>
      ))}
    </div>
    {bookingUrl && (
      <div class="mt-8 text-center">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-sign-green text-white px-6 py-3 rounded-sm font-display text-lg font-bold hover:bg-sign-green/90"
        >
          Book Your Tour
        </a>
      </div>
    )}
  </div>
</section>

```

#### Formations Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Notable Formations
    </h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {formations.map(formation => (
        <div class="bg-white border-l-4 border-l-brand-brown p-6 rounded-sm">
          <h3 class="font-display text-xl font-bold text-brand-brown mb-2">
            {formation.name}
          </h3>
          <p class="font-body text-sm text-sign-green mb-3">
            {formation.type}
          </p>
          <p class="font-body text-brand-mud mb-3">
            {formation.description}
          </p>
          {formation.ageEstimate && (
            <p class="font-body text-xs text-brand-mud/80 mb-3">
              <span class="font-bold">Age:</span> {formation.ageEstimate}
            </p>
          )}
          {formation.funFact && (
            <p class="font-hand text-sm text-brand-brown pt-4 border-t border-brand-mud/20">
              Did you know? {formation.funFact}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

```

#### Conditions & What to Expect Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      What to Expect
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          Cave Conditions
        </h3>
        <p class="font-body text-brand-mud mb-2">
          <span class="font-bold">Temperature:</span> {conditions.temperature}
        </p>
        <p class="font-body text-brand-mud mb-4">
          <span class="font-bold">Humidity:</span> {conditions.humidity}
        </p>
        <div>
          <p class="font-body text-sm font-bold text-brand-brown mb-2">
            What to Wear:
          </p>
          <ul class="space-y-1">
            {conditions.whatToWear.map(item => (
              <li class="font-body text-sm text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="bg-brand-cream border-l-4 border-l-brand-brown p-6 rounded-sm">
        <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
          What to Bring
        </h3>
        <ul class="space-y-2">
          {conditions.whatToBring.map(item => (
            <li class="font-body text-brand-mud flex items-start gap-2">
              <span class="text-sign-green mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>

```

#### Accessibility Section

```astro
<section class="py-16 bg-brand-cream">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Accessibility
    </h2>
    <div class="border-l-4 border-l-brand-orange bg-white p-8 rounded-sm">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            Physical Requirements
          </h3>
          <ul class="space-y-2">
            {accessibility.physicalRequirements.map(req => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            Limitations
          </h3>
          <ul class="space-y-2">
            {accessibility.limitations.map(limit => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-brand-orange mt-1">•</span>
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {accessibility.accommodations && accessibility.accommodations.length > 0 && (
        <div class="mt-6 pt-6 border-t border-brand-mud/20">
          <h3 class="font-display text-lg font-bold text-brand-brown mb-4">
            Available Accommodations
          </h3>
          <ul class="space-y-2">
            {accessibility.accommodations.map(acc => (
              <li class="font-body text-brand-mud flex items-start gap-2">
                <span class="text-sign-green mt-1">✓</span>
                <span>{acc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</section>

```

#### Pricing & Hours Section

```astro
<section class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-12">
      Pricing & Hours
    </h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Admission
        </h3>
        <div class="space-y-4">
          {pricing.map(price => (
            <div class="flex items-center justify-between bg-brand-cream border-l-4 border-l-sign-green p-4 rounded-sm">
              <div>
                <p class="font-display font-bold text-brand-brown">
                  {price.type}
                </p>
                {price.notes && (
                  <p class="font-body text-xs text-brand-mud/80 mt-1">
                    {price.notes}
                  </p>
                )}
              </div>
              <p class="font-display text-xl font-bold text-sign-green">
                {price.price}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
          Hours
        </h3>
        <div class="space-y-4">
          {hours.map(schedule => (
            <div class="bg-brand-cream border-l-4 border-l-brand-brown p-4 rounded-sm">
              <p class="font-display font-bold text-brand-brown mb-2">
                {schedule.season}
              </p>
              <p class="font-body text-brand-mud mb-1">
                <span class="font-bold">Days:</span> {schedule.days}
              </p>
              <p class="font-body text-brand-mud">
                <span class="font-bold">Times:</span> {schedule.times}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

```

---

## VALIDATION CRITERIA

**Completeness**:
- [ ] ~475 lines
- [ ] All 8 sections implemented
- [ ] TypeScript props interface complete
- [ ] Responsive grid layouts (mobile-first)

**WVWO Aesthetic**:
- [ ] `rounded-sm` enforced
- [ ] Border-left accents (green for tours, orange for accessibility)
- [ ] Fun facts in `font-hand`
- [ ] Educational but accessible tone

**Educational Focus**:
- [ ] Formations with geological context
- [ ] Clear safety and accessibility information
- [ ] Practical visitor guidance (what to wear/bring)

---

## COORDINATION PROTOCOL

**hierarchical-coordinator** manages:
1. **researcher** (WebSearch Seneca Caverns) → Pattern research
2. **code-architect** → Architecture design
3. **base-template-generator** → Template implementation

**Memory keys**:
- `swarm/researcher/cave-patterns` - Research findings
- `swarm/architect/cave-structure` - Component architecture
- `swarm/generator/cave-template` - Final template path

**Hooks**:

```bash
npx claude-flow@alpha hooks pre-task --description "Cave template generation"
npx claude-flow@alpha hooks post-edit --file "src/components/templates/CaveTemplate.astro"
npx claude-flow@alpha hooks post-task --task-id "SPEC-16"

```

---

## SUCCESS METRICS

- Template ~475 lines with educational emphasis
- Props interface supports all cave tour content
- Clear accessibility and safety information
- WVWO aesthetic fully enforced
- Ready for Phase 4 content population
