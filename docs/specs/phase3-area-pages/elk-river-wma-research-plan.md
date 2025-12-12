```
╔══════════════════════════════════════════════════════════════════════════════╗
║  PHASE 3B: Elk River WMA Content Research & Development                     ║
║  Feature: Deep historical, cultural, and ecological research for rich        ║
║           storytelling and authentic local knowledge base                    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  Model: claude-opus-4-5-20251101    Effort: HIGH (research-intensive)       ║
║  Topology: HIERARCHICAL             Thinking: EXTENDED (64K)                 ║
║  Complexity: ●●●●○ (Novel research)  Est. Output: ~45K tokens                ║
║  Parallel Cap: 10 concurrent        Checkpoint: Per-domain completion        ║
║  Dependencies: burnsville-lake.astro Blocking: elk-river.astro build         ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────────────┐
│  OPUS 4.5 OPTIMIZATION                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  thinking_budget: 64000              # Max reasoning for cultural synthesis  │
│  effort: high                        # Deep research + verification          │
│  preserve_thinking: true             # Track research patterns across docs   │
│  interleaved_scratchpads: true       # Stream reasoning during synthesis     │
│  prompt_caching: true                # Cache WV historical sources           │
│                                                                              │
│  Thinking Triggers by Research Domain:                                       │
│  ├─ HUNTING:     "think about [species behavior + habitat]"   effort: medium │
│  ├─ FISHING:     "think about [waterways + access]"           effort: medium │
│  ├─ CAMPING:     "think about [facilities + regulations]"     effort: low    │
│  ├─ LORE:        "think harder about [cultural stories]"      effort: high   │
│  ├─ LEGENDS:     "ultrathink about [myth authenticity]"       effort: high   │
│  └─ SYNTHESIS:   "ultrathink about [Kim's voice filter]"      effort: high   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  RESEARCH SCOPE: ELK RIVER WMA CULTURAL & ECOLOGICAL INTELLIGENCE            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Primary Objective:                                                          │
│  Gather authentic, verifiable information about Elk River WMA to create      │
│  rich, locally-grounded content that positions WVWO as true neighbors with   │
│  deep knowledge, not just a highway shop.                                    │
│                                                                              │
│  Research Domains (7):                                                       │
│  ├─ 1. HUNTING ECOLOGY    - Species, seasons, behavior, local patterns      │
│  ├─ 2. FISHING WATERS     - Creeks, rivers, species, access points          │
│  ├─ 3. CAMPING FACILITIES - Sites, regulations, amenities, seasons          │
│  ├─ 4. GAME BEHAVIOR      - Deer rut patterns, turkey roosts, bear activity │
│  ├─ 5. REGIONAL LORE      - Local hunting stories, old-timer wisdom         │
│  ├─ 6. URBAN LEGENDS      - Cryptids, ghost stories, unexplained events     │
│  └─ 7. NATIVE HISTORY     - Shawnee/Cherokee presence, place names, sites   │
│                                                                              │
│  Voice Filter (CRITICAL):                                                    │
│  All findings MUST pass through "Would Kim say this?" test before inclusion. │
│  Reject: Academic tone, tourist-brochure language, unverifiable claims       │
│  Accept: Conversational facts, cautious local knowledge, humble uncertainty  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  AGENT TOPOLOGY: HIERARCHICAL RESEARCH COORDINATION                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                      ┌──────────────────────────────────┐                    │
│                      │  RESEARCH ORCHESTRATOR           │                    │
│                      │  (Opus 4.5, effort: high)        │                    │
│                      │  Coordinates + verifies claims   │                    │
│                      │  Applies Kim's voice filter      │                    │
│                      └──────────────┬───────────────────┘                    │
│                                     │                                        │
│        ┌────────────────────────────┼────────────────────────────┐           │
│        │                            │                            │           │
│        ▼                            ▼                            ▼           │
│  ┌──────────────┐         ┌──────────────┐          ┌──────────────┐        │
│  │ ECOLOGICAL   │         │ CULTURAL     │          │ RECREATIONAL │        │
│  │ RESEARCHER   │         │ HISTORIAN    │          │ SPECIALIST   │        │
│  │ effort: high │         │ effort: high │          │ effort: med  │        │
│  └──────┬───────┘         └──────┬───────┘          └──────┬───────┘        │
│         │                        │                         │                │
│    ┌────┼────┐              ┌────┼────┐               ┌────┼────┐           │
│    ▼    ▼    ▼              ▼    ▼    ▼               ▼    ▼    ▼           │
│  Hunt Fish Game          Lore Legends Native       Camp Access Regs         │
│                                                                              │
│  Information Flow:                                                           │
│  Specialists → Orchestrator (verification) → Synthesized findings.md         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  DELIVERABLES (Work Breakdown Structure)                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  📁 Research Outputs                                                         │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-wma-findings.md      [NEW]     Priority: P0  │
│  │     Master document with all verified findings, organized by domain       │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-hunting.md           [NEW]     Priority: P0  │
│  │     Species profiles, seasons, behavior patterns, local strategies        │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-fishing.md           [NEW]     Priority: P1  │
│  │     Waterways, species, access points, regulations                        │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-lore.md              [NEW]     Priority: P1  │
│  │     Regional stories, hunting legends, local wisdom                       │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-native-history.md    [NEW]     Priority: P2  │
│  │     Shawnee/Cherokee presence, place name origins, historical sites       │
│  │                                                                           │
│  ├─ 📄 docs/research/elk-river-legends.md           [NEW]     Priority: P2  │
│  │     Urban legends, cryptid stories, unexplained phenomena (fact-checked)  │
│  │                                                                           │
│  └─ 📄 docs/research/elk-river-recreation.md        [NEW]     Priority: P3  │
│        Camping sites, facilities, trail access, regulations                  │
│                                                                              │
│  📁 Implementation (Phase 3C - After research complete)                      │
│  │                                                                           │
│  └─ 📄 wv-wild-web/src/pages/near/elk-river.astro  [NEW]     Priority: P0  │
│        Astro page built from verified research findings                      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  TASK DEFINITIONS                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  research_hunting_ecology:                                                   │
│    agent: researcher                                                         │
│    effort: high                                                              │
│    thinking_trigger: "think about Elk River WMA hunting ecology, species    │
│                      behavior patterns, and habitat characteristics for      │
│                      deer, turkey, bear, and small game"                     │
│    description: >                                                            │
│      Research comprehensive hunting information for Elk River WMA:           │
│      - White-tailed deer: population density, rut timing, movement patterns  │
│      - Wild turkey: gobbler concentrations, roosting areas, spring behavior  │
│      - Black bear: presence/absence data, season info, safety protocols      │
│      - Small game: Ruffed grouse, squirrel, rabbit populations & habitat     │
│      - Seasonal patterns: Early vs late season differences                   │
│      - Best hunting areas: Ridge-top vs creek-bottom strategies              │
│      Source: WV DNR reports, hunting forums, local guides, academic papers   │
│    context:                                                                  │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│      - wv-wild-web/src/pages/near/burnsville-lake.astro (cached - pattern)  │
│      - CLAUDE.md WVWO context section (cached)                               │
│    expected_output: >                                                        │
│      docs/research/elk-river-hunting.md with:                                │
│      - Species profiles (behavior, habitat, best times)                      │
│      - Seasonal calendar (archery, firearms, spring turkey, bear)            │
│      - Local strategies (ridge-top hunting, creek-bottom rutting bucks)      │
│      - Verified acreage and boundary data                                    │
│      - All claims sourced and fact-checked                                   │
│    tools: [WebSearch, WebFetch, Read, Write, Grep]                           │
│    token_budget: 8000                                                        │
│    depends_on: []                                                            │
│    runs_parallel_with: [research_fishing, research_camping]                  │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  research_fishing_waters:                                                    │
│    agent: researcher                                                         │
│    effort: medium                                                            │
│    thinking_trigger: "think about Elk River waterway systems, fish species, │
│                      and access points for anglers"                          │
│    description: >                                                            │
│      Research fishing opportunities in Elk River WMA:                        │
│      - Elk River sections: Smallmouth bass habitat, access points            │
│      - Tributary creeks: Trout stocking schedules, wild vs stocked           │
│      - Fishing regulations: Season dates, size limits, special rules         │
│      - Boat/wade access: Parking areas, ramps, wading spots                  │
│      - Best times: Spring runoff, summer low water, fall patterns            │
│      Source: WV DNR fishing reports, local fishing guides, stream maps       │
│    context:                                                                  │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│      - WVWO fishing tackle inventory patterns (cached)                       │
│    expected_output: >                                                        │
│      docs/research/elk-river-fishing.md with:                                │
│      - Waterway map descriptions (which creeks, river sections)              │
│      - Species profiles (smallmouth, trout, other game fish)                 │
│      - Access point details (GPS-level if possible)                          │
│      - Seasonal fishing calendar                                             │
│      - Tackle recommendations (match to WVWO inventory if possible)          │
│    tools: [WebSearch, WebFetch, Read, Write]                                 │
│    token_budget: 6000                                                        │
│    depends_on: []                                                            │
│    runs_parallel_with: [research_hunting_ecology, research_camping]          │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  research_camping_recreation:                                                │
│    agent: researcher                                                         │
│    effort: medium                                                            │
│    thinking_trigger: "think about camping facilities, trail access, and     │
│                      recreational regulations in Elk River WMA"              │
│    description: >                                                            │
│      Research camping and recreation infrastructure:                         │
│      - Primitive camping areas vs developed sites                            │
│      - Parking/access points for overnight camping                           │
│      - Regulations: Permits, fire restrictions, waste disposal               │
│      - Trail systems: Hiking, ATV, horseback (if allowed)                    │
│      - Seasonal closures and restrictions                                    │
│      - Nearby developed campgrounds (Sutton Lake area)                       │
│      Source: WV DNR recreation maps, USFS data, camping forums               │
│    context:                                                                  │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│    expected_output: >                                                        │
│      docs/research/elk-river-recreation.md with:                             │
│      - Camping site descriptions and access details                          │
│      - Regulation summary (permits, restrictions, fees)                      │
│      - Trail system overview (if applicable)                                 │
│      - Connection to nearby developed camping (Sutton Lake)                  │
│    tools: [WebSearch, WebFetch, Write]                                       │
│    token_budget: 5000                                                        │
│    depends_on: []                                                            │
│    runs_parallel_with: [research_hunting_ecology, research_fishing]          │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  research_regional_lore:                                                     │
│    agent: researcher                                                         │
│    effort: high                                                              │
│    thinking_trigger: "think harder about authentic Appalachian hunting      │
│                      stories, local wisdom, and cultural traditions in       │
│                      Braxton County and Elk River watershed"                 │
│    description: >                                                            │
│      Deep research into regional hunting culture and local knowledge:        │
│      - Appalachian hunting traditions specific to central WV                 │
│      - Local names for landmarks (hollers, ridges, creek forks)              │
│      - Old-timer wisdom: Weather signs, game predictions, folk knowledge     │
│      - Historical hunting camps and family traditions                        │
│      - Flood stories (2016 relevance to Elk River area?)                     │
│      - Community hunting culture (church groups, youth mentorship)           │
│      - Verification: Cross-reference multiple sources, favor primary         │
│      Source: WV historical societies, Appalachian folklore archives,         │
│              local newspapers (Nicholas Chronicle, etc.), oral histories     │
│    context:                                                                  │
│      - CLAUDE.md WVWO voice guidelines (cached)                              │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│    expected_output: >                                                        │
│      docs/research/elk-river-lore.md with:                                   │
│      - Verified local hunting stories (3-5 anecdotes)                        │
│      - Traditional knowledge (weather signs, game behavior)                  │
│      - Place name origins and local landmark names                           │
│      - Community hunting culture notes                                       │
│      - ALL CLAIMS SOURCED - no invented folklore                             │
│      - Filtered through Kim's voice (humble, authentic, verifiable)          │
│    tools: [WebSearch, WebFetch, Read, Write]                                 │
│    token_budget: 10000                                                       │
│    depends_on: [research_hunting_ecology]                                    │
│    runs_parallel_with: [research_native_history, research_urban_legends]     │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  research_urban_legends:                                                     │
│    agent: researcher                                                         │
│    effort: high                                                              │
│    thinking_trigger: "ultrathink about urban legend authenticity, source    │
│                      credibility, and appropriateness for family business    │
│                      representing Christian values"                          │
│    description: >                                                            │
│      Research local legends and unexplained phenomena with STRICT            │
│      fact-checking and appropriateness filtering:                            │
│      - Cryptid stories: Mothman connections, Braxton County Monster          │
│      - Ghost stories: Old logging camps, Civil War era, flood victims        │
│      - Unexplained events: Strange lights, sounds, encounters                │
│      - Historical mysteries: Lost mines, buried treasure, old settlements    │
│      - CRITICAL FILTERS:                                                     │
│        1. Is this verifiably documented in multiple sources?                 │
│        2. Is this appropriate for Kim's faith-forward brand?                 │
│        3. Would this make locals cringe or nod in recognition?               │
│        4. Can we present this with humble uncertainty vs sensationalism?     │
│      Source: WV folklore collections, Appalachian ghost story archives,      │
│              regional paranormal research (Fayette Tribune, etc.)            │
│    context:                                                                  │
│      - CLAUDE.md WVWO principles (cached)                                    │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│    expected_output: >                                                        │
│      docs/research/elk-river-legends.md with:                                │
│      - 2-4 verified local legends (SOURCED, fact-checked)                    │
│      - Appropriateness rating: Family-friendly, faith-compatible             │
│      - Presentation guide: How Kim would tell this story                     │
│      - REJECT PILE: Stories that failed filters (with reasons)               │
│      - Confidence levels: "Some folks say..." vs "It's well documented..."   │
│    tools: [WebSearch, WebFetch, Read, Write]                                 │
│    token_budget: 10000                                                       │
│    depends_on: []                                                            │
│    runs_parallel_with: [research_regional_lore, research_native_history]     │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  research_native_history:                                                    │
│    agent: researcher                                                         │
│    effort: high                                                              │
│    thinking_trigger: "think harder about Shawnee and Cherokee presence in   │
│                      Elk River watershed, archaeological evidence, and       │
│                      respectful presentation of indigenous history"          │
│    description: >                                                            │
│      Research Native American history with academic rigor and respect:       │
│      - Shawnee presence: Documented villages, hunting grounds, trails        │
│      - Cherokee connections: Migration patterns, territorial boundaries      │
│      - Place name etymology: "Elk River" origin, creek names, ridge names    │
│      - Archaeological sites: Documented finds, protected areas               │
│      - Historical conflicts: French & Indian War, settler displacement       │
│      - Cultural significance: Sacred sites, burial grounds (handle w/ care)  │
│      - Modern tribes: Current Shawnee/Cherokee communities in WV             │
│      RESPECTFUL PRESENTATION RULES:                                          │
│        1. No romanticization or "noble savage" tropes                        │
│        2. Acknowledge displacement and loss                                  │
│        3. Use tribal-preferred names and terminology                         │
│        4. Avoid appropriation of spiritual practices                         │
│      Source: WV archaeological society, tribal historians, academic journals │
│    context:                                                                  │
│      - CLAUDE.md WVWO principles (cached)                                    │
│      - docs/specs/phase3-area-pages/elk-river-wma.md (fresh)                 │
│    expected_output: >                                                        │
│      docs/research/elk-river-native-history.md with:                         │
│      - Verified tribal presence documentation                                │
│      - Place name etymologies (sourced)                                      │
│      - Archaeological context (if publicly documented)                       │
│      - Respectful presentation guide: How to honor this history              │
│      - What NOT to include: Unverified claims, appropriative content         │
│    tools: [WebSearch, WebFetch, Read, Write]                                 │
│    token_budget: 10000                                                       │
│    depends_on: []                                                            │
│    runs_parallel_with: [research_regional_lore, research_urban_legends]      │
│    checkpoint_before: false                                                  │
│                                                                              │
│  ──────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  verify_and_synthesize:                                                      │
│    agent: researcher                                                         │
│    effort: high                                                              │
│    thinking_trigger: "ultrathink about cross-verification, voice filtering, │
│                      and synthesizing findings into Kim's authentic style"   │
│    description: >                                                            │
│      Orchestrator task - runs AFTER all domain research completes:           │
│      - Cross-verify claims across all research documents                     │
│      - Identify conflicts and resolve with additional research               │
│      - Apply Kim's voice filter to ALL findings                              │
│      - Remove academic jargon, tourist-brochure language                     │
│      - Convert to conversational, humble, fact-based storytelling            │
│      - Flag unverifiable claims for "Some folks say..." treatment            │
│      - Create master findings document with confidence ratings               │
│      VOICE TRANSFORMATION EXAMPLES:                                          │
│        Academic: "Odocoileus virginianus exhibits crepuscular activity"     │
│        Kim's:    "Deer move most at dawn and dusk around here"              │
│                                                                              │
│        Brochure: "Discover pristine wilderness teeming with wildlife"       │
│        Kim's:    "Good deer and turkey populations in the hardwood ridges"  │
│    context:                                                                  │
│      - ALL research outputs from prior tasks (fresh)                         │
│      - CLAUDE.md WVWO voice examples (cached)                                │
│      - docs/WVWO_FRONTEND_AESTHETICS.md litmus tests (cached)                │
│    expected_output: >                                                        │
│      docs/research/elk-river-wma-findings.md with:                           │
│      - Verified facts organized by domain                                    │
│      - Confidence ratings: HIGH/MEDIUM/LOW/UNVERIFIED                        │
│      - Voice-filtered content ready for page building                        │
│      - Source citations for all major claims                                 │
│      - Reject pile: What didn't pass voice/fact checks (with reasons)        │
│    tools: [Read, Write, Grep]                                                │
│    token_budget: 12000                                                       │
│    depends_on: [research_hunting_ecology, research_fishing, research_camping,│
│                 research_regional_lore, research_urban_legends,              │
│                 research_native_history]                                     │
│    runs_parallel_with: []                                                    │
│    checkpoint_before: true                                                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  DEPENDENCY GRAPH                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PARALLEL RESEARCH (Batch 1: Ecological)                                     │
│  ┌──────────────────────┐                                                    │
│  │ research_hunting     │──┐                                                 │
│  └──────────────────────┘  │                                                 │
│  ┌──────────────────────┐  │                                                 │
│  │ research_fishing     │──┤                                                 │
│  └──────────────────────┘  │                                                 │
│  ┌──────────────────────┐  │                                                 │
│  │ research_camping     │──┤                                                 │
│  └──────────────────────┘  │                                                 │
│                            ▼                                                 │
│  PARALLEL RESEARCH (Batch 2: Cultural - waits for hunting ecology)           │
│  ┌──────────────────────┐  │                                                 │
│  │ research_lore        │──┤                                                 │
│  └──────────────────────┘  │                                                 │
│  ┌──────────────────────┐  │                                                 │
│  │ research_legends     │──┤                                                 │
│  └──────────────────────┘  │                                                 │
│  ┌──────────────────────┐  │                                                 │
│  │ research_native      │──┤                                                 │
│  └──────────────────────┘  │                                                 │
│                            │                                                 │
│                            ▼                                                 │
│              ┌──────────────────────────┐                                    │
│              │ verify_and_synthesize    │                                    │
│              │ (CHECKPOINT)             │                                    │
│              └────────────┬─────────────┘                                    │
│                           │                                                  │
│                           ▼                                                  │
│              ┌──────────────────────────┐                                    │
│              │ Master Findings Ready    │                                    │
│              │ for Page Implementation  │                                    │
│              └──────────────────────────┘                                    │
│                                                                              │
│  Legend: ──▶ sequential    (||) parallel batch                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  GOVERNANCE COMPLIANCE                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ✓ Simplicity > Complexity: Research informs, doesn't over-engineer content │
│  ✓ Authentic > Corporate: Voice filter ensures Kim's humble, real tone      │
│  ✓ Free > Expensive: Using free web research, no paid databases             │
│  ✓ Local + Highway: Content serves both neighbors and I-79 travelers        │
│  ✓ Quality > Speed: Thorough research with fact-checking, no rushing        │
│                                                                              │
│  🛑 BLOCKING GATES (must pass before page build):                            │
│     - All major claims have sources cited                                    │
│     - Voice filter applied (no academic jargon, no brochure-speak)           │
│     - Faith-compatibility check (legends/lore appropriate for Kim's brand)   │
│     - Local credibility check ("Would Bryan's hunting buddies nod or laugh?")│
│     - Verification checkpoint approved by orchestrator                       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  RESEARCH SOURCES (Prioritized)                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRIMARY (Official, highest confidence):                                     │
│  ├─ WV DNR Wildlife Resources: wvdnr.gov                                     │
│  ├─ WV DNR Fishing: wvdnr.gov/fishing                                        │
│  ├─ WV Geological & Economic Survey: wvges.wvnet.edu                         │
│  ├─ US Forest Service (Monongahela NF overlap): fs.usda.gov                  │
│  └─ Braxton County Government: braxtoncounty.wv.gov                          │
│                                                                              │
│  SECONDARY (Regional, good confidence):                                      │
│  ├─ West Virginia Archives: archives.wv.gov                                  │
│  ├─ WV Humanities Council: wvhumanities.org                                  │
│  ├─ Appalachian Regional Commission: arc.gov                                 │
│  ├─ Local newspapers: Nicholas Chronicle, Braxton Democrat                   │
│  └─ WV hunting/fishing forums: wvhuntfish.com, etc.                          │
│                                                                              │
│  TERTIARY (Cultural, verify carefully):                                      │
│  ├─ Appalachian folklore collections: jstor.org, folklore archives           │
│  ├─ Shawnee Tribe official site: shawnee-tribe.com                           │
│  ├─ Cherokee Nation historical resources: cherokee.org                       │
│  ├─ WV ghost story compilations (Susan Sheppard, etc.)                       │
│  └─ Regional cryptid research (verify vs dismiss sensationalism)             │
│                                                                              │
│  AVOID (Low confidence, sensationalized):                                    │
│  ├─ Paranormal entertainment sites                                           │
│  ├─ Unverified social media claims                                           │
│  ├─ Tourist trap "haunted WV" clickbait                                      │
│  └─ Wikipedia (use as starting point, not final source)                      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  EXECUTION COMMANDS                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  # Manual execution (Claude Code + Opus 4.5)                                 │
│                                                                              │
│  "Using Claude Opus 4.5 with extended thinking (64K budget), coordinate a    │
│   hierarchical research swarm for Elk River WMA:                             │
│                                                                              │
│   BATCH 1 (Parallel ecological research):                                    │
│   Task('Elk River hunting ecology research', '                               │
│     Think about Elk River WMA hunting ecology, species behavior patterns,    │
│     and habitat characteristics for deer, turkey, bear, and small game.      │
│     Source from WV DNR, hunting forums, and academic papers.                 │
│     Output: docs/research/elk-river-hunting.md with verified species         │
│     profiles, seasonal patterns, and local hunting strategies.               │
│   ', 'researcher')                                                           │
│                                                                              │
│   Task('Elk River fishing research', '                                       │
│     Think about Elk River waterway systems, fish species, and access points. │
│     Research smallmouth bass habitat, trout stocking, and regulations.       │
│     Output: docs/research/elk-river-fishing.md with waterway maps,           │
│     species profiles, and access details.                                    │
│   ', 'researcher')                                                           │
│                                                                              │
│   Task('Elk River camping research', '                                       │
│     Think about camping facilities, trail access, and regulations.           │
│     Research primitive vs developed sites, parking, and restrictions.        │
│     Output: docs/research/elk-river-recreation.md.                           │
│   ', 'researcher')                                                           │
│                                                                              │
│   BATCH 2 (Parallel cultural research - after ecology completes):            │
│   Task('Appalachian hunting lore research', '                                │
│     Think harder about authentic Appalachian hunting stories, local wisdom,  │
│     and cultural traditions in Braxton County. Cross-reference sources,      │
│     verify claims, filter through Kim's voice.                               │
│     Output: docs/research/elk-river-lore.md with verified local stories.     │
│   ', 'researcher')                                                           │
│                                                                              │
│   Task('Urban legends research', '                                           │
│     Ultrathink about urban legend authenticity, source credibility, and      │
│     appropriateness for faith-forward family business. Research cryptids,    │
│     ghost stories, and unexplained phenomena with strict fact-checking.      │
│     Output: docs/research/elk-river-legends.md with verified, appropriate    │
│     local legends and reject pile.                                           │
│   ', 'researcher')                                                           │
│                                                                              │
│   Task('Native American history research', '                                 │
│     Think harder about Shawnee and Cherokee presence in Elk River watershed. │
│     Research with academic rigor and cultural respect. Document tribal       │
│     presence, place names, archaeological evidence.                          │
│     Output: docs/research/elk-river-native-history.md.                       │
│   ', 'researcher')                                                           │
│                                                                              │
│   SYNTHESIS (After all research completes):                                  │
│   Task('Verify and synthesize all findings', '                               │
│     Ultrathink about cross-verification, voice filtering, and synthesizing   │
│     all research into Kim's authentic style. Cross-check all claims,         │
│     resolve conflicts, apply voice transformation, create master findings    │
│     document with confidence ratings.                                        │
│     Output: docs/research/elk-river-wma-findings.md (master doc).            │
│   ', 'researcher')                                                           │
│  "                                                                           │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  TOKEN EFFICIENCY PROJECTION                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Task                    │ Est. Output │ Effort │ Caching │                  │
│  ────────────────────────┼─────────────┼────────┼─────────┤                  │
│  research_hunting        │    ~8K      │ high   │  medium │                  │
│  research_fishing        │    ~6K      │ medium │  medium │                  │
│  research_camping        │    ~5K      │ medium │  medium │                  │
│  research_lore           │   ~10K      │ high   │  low    │                  │
│  research_legends        │   ~10K      │ high   │  low    │                  │
│  research_native         │   ~10K      │ high   │  low    │                  │
│  verify_synthesize       │   ~12K      │ high   │  low    │                  │
│  ────────────────────────┼─────────────┼────────┼─────────┤                  │
│  TOTAL                   │   ~61K      │        │         │                  │
│                                                                              │
│  Cost Estimate (Opus 4.5 at $5/$25 per MTok):                               │
│  ├─ Input:  ~180K tokens × $5/M  = $0.90 (with 90% caching on governance)   │
│  ├─ Output: ~61K tokens × $25/M  = $1.53                                    │
│  ├─ Total:  ~$2.43 for complete research phase                              │
│  └─ Value: Rich, authentic content vs generic AI slop (priceless)            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  QUALITY GATES                                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Gate 1: SOURCE VERIFICATION                                                 │
│  ├─ Every factual claim has citation                                         │
│  ├─ Primary sources (WV DNR) > secondary > tertiary                          │
│  ├─ No Wikipedia as sole source                                              │
│  └─ Cross-referenced: 2+ sources for major claims                            │
│                                                                              │
│  Gate 2: VOICE AUTHENTICITY                                                  │
│  ├─ Passes "Would Kim say this?" test                                        │
│  ├─ Zero marketing buzzwords (discover, premier, world-class)                │
│  ├─ Humble uncertainty for unverified ("Some folks say...")                  │
│  └─ Conversational, neighbor-to-neighbor tone                                │
│                                                                              │
│  Gate 3: CULTURAL RESPECT                                                    │
│  ├─ Native history: Academic rigor, tribal-preferred terminology             │
│  ├─ No appropriation of spiritual practices or sacred stories                │
│  ├─ Legends: Family-friendly, faith-compatible, no sensationalism            │
│  └─ Local credibility: Would Bryan's hunting buddies nod or cringe?          │
│                                                                              │
│  Gate 4: FAITH-FORWARD COMPATIBILITY                                         │
│  ├─ No occult content                                                        │
│  ├─ Legends presented with skepticism/folklore framing                       │
│  ├─ Aligns with "Faith • Family • Outdoors" brand values                     │
│  └─ Kim & Bryan would share this with church friends                         │
│                                                                              │
│  Gate 5: FACTUAL ACCURACY                                                    │
│  ├─ GPS coordinates verified                                                 │
│  ├─ Acreage matches official WV DNR data                                     │
│  ├─ Season dates current for 2025/2026                                       │
│  └─ Access points confirmed (not relying on old maps)                        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  RESEARCH METHODOLOGY                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  For Each Domain, Follow This Process:                                       │
│                                                                              │
│  1. PRIMARY SOURCE SCAN                                                      │
│     └─ Search official WV DNR docs, government sites                         │
│     └─ Extract verifiable facts with page/section citations                  │
│                                                                              │
│  2. SECONDARY CONTEXT                                                        │
│     └─ Search regional newspapers, historical societies                      │
│     └─ Look for local perspectives, community knowledge                      │
│                                                                              │
│  3. CULTURAL DEPTH                                                           │
│     └─ Search folklore archives, tribal resources                            │
│     └─ Cross-verify stories against historical records                       │
│                                                                              │
│  4. FACT-CHECK LOOP                                                          │
│     └─ For each claim: Find 2+ sources OR mark as unverified                 │
│     └─ Flag conflicts for additional research                                │
│                                                                              │
│  5. VOICE TRANSFORMATION                                                     │
│     └─ Convert findings into Kim's conversational style                      │
│     └─ Test: "Would Kim tell Bryan this over coffee?"                        │
│                                                                              │
│  Confidence Rating System:                                                   │
│  ├─ HIGH:       Official source (WV DNR) + corroborated                      │
│  ├─ MEDIUM:     2+ independent sources, credible                             │
│  ├─ LOW:        Single source, credible but unconfirmed                      │
│  └─ UNVERIFIED: Oral tradition, single uncorroborated claim                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  EXAMPLE VOICE TRANSFORMATIONS                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  HUNTING ECOLOGY:                                                            │
│  ❌ Academic: "Cervidae populations exhibit increased rutting activity       │
│               along riparian corridors during autumn photoperiod shifts"     │
│  ✅ Kim's:    "Come November, those bucks get active along the creek bottoms │
│               when the rut kicks in. Good time to set up near water."        │
│                                                                              │
│  FISHING:                                                                    │
│  ❌ Brochure: "Anglers will discover exceptional smallmouth bass fishing in  │
│               pristine riverine environments"                                │
│  ✅ Kim's:    "Smallmouth bass fishing is good in the Elk River sections.    │
│               Bring waders - creek fishing here."                            │
│                                                                              │
│  NATIVE HISTORY:                                                             │
│  ❌ Romantic: "The noble Shawnee once roamed these ancient hunting grounds"  │
│  ✅ Kim's:    "Elk River area was Shawnee hunting territory before European  │
│               settlement. 'Elk' likely refers to the wapiti that lived here."│
│                                                                              │
│  LEGENDS:                                                                    │
│  ❌ Sensational: "THE CURSED HOLLOW WHERE HUNTERS VANISH!!!"                 │
│  ✅ Kim's:       "Some folks talk about strange lights up on the ridge.      │
│                  Could be headlamps, could be something else. Who knows."    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  SUCCESS CRITERIA                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Research phase succeeds when:                                               │
│                                                                              │
│  ✓ 7 domain-specific markdown files created in docs/research/               │
│  ✓ Master findings document synthesized with confidence ratings              │
│  ✓ 100% of major claims have source citations                                │
│  ✓ All content passes voice authenticity test                                │
│  ✓ All content passes faith-compatibility test                               │
│  ✓ Reject pile documented (what failed filters and why)                      │
│  ✓ Geographic data verified (GPS, acreage, access points)                    │
│  ✓ Ready to build page without additional research needed                    │
│                                                                              │
│  Deliverables Checklist:                                                     │
│  [ ] docs/research/elk-river-hunting.md (8K+ tokens, sourced)                │
│  [ ] docs/research/elk-river-fishing.md (6K+ tokens, sourced)                │
│  [ ] docs/research/elk-river-recreation.md (5K+ tokens, sourced)             │
│  [ ] docs/research/elk-river-lore.md (10K+ tokens, voice-filtered)           │
│  [ ] docs/research/elk-river-legends.md (10K+ tokens, appropriateness-rated) │
│  [ ] docs/research/elk-river-native-history.md (10K+ tokens, respectful)     │
│  [ ] docs/research/elk-river-wma-findings.md (12K+ tokens, MASTER)           │
│  [ ] All gates passed (source verification, voice, cultural respect, faith)  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  ANTI-SLOP DIRECTIVES                                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AI research tends toward generic, on-distribution outputs.                  │
│  REJECT these patterns immediately:                                          │
│                                                                              │
│  🚫 "Discover pristine wilderness"                                           │
│  🚫 "World-class outdoor recreation"                                         │
│  🚫 "Experience the majesty of nature"                                       │
│  🚫 "A hunter's paradise"                                                    │
│  🚫 "Unlock the secrets of the forest"                                       │
│  🚫 Wikipedia copy-paste                                                     │
│  🚫 Invented "local sayings" that no one actually says                       │
│  🚫 Romanticized Native American content                                     │
│  🚫 Sensationalized paranormal clickbait                                     │
│                                                                              │
│  ✅ INSTEAD, USE:                                                            │
│  ✅ "Good deer population in the hardwood ridges"                            │
│  ✅ "Turkey hunting is excellent here in the spring"                         │
│  ✅ "We're about 15 minutes from the WMA - stop in for directions"           │
│  ✅ "Some folks say [legend], but who really knows"                          │
│  ✅ Specific facts: "18,396 acres", "Spring season typically late April"     │
│  ✅ Humble expertise: "We can point you to good access points"               │
│                                                                              │
│  If uncertain whether content is AI slop, run the litmus tests:              │
│  1. NEIGHBOR: Would Kim's neighbor say "That's fancy!" or "That's you"?     │
│  2. BULLETIN BOARD: Would this fit next to handwritten hunting notes?        │
│  3. VOICE: Does this sound like Kim or a marketing agency?                   │
│  4. FIVE-YEAR: Will this trend embarrass us in 2030?                         │
│  5. FREE-TIER: Does this create dependencies Kim can't maintain?             │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

```

---

## ACTIVATION COMMAND

To execute this research plan with Claude Opus 4.5:

```bash
# Set model to Opus 4.5
/model opus

# Execute research coordination
"Using Claude Opus 4.5 with extended thinking (64K budget), coordinate this
hierarchical research swarm as specified in
docs/specs/phase3-area-pages/elk-river-wma-research-plan.md.

Run the 6 parallel research tasks across 2 batches, then synthesize findings
into master document. Apply all quality gates before declaring complete."
```

---

## POST-RESEARCH: IMPLEMENTATION PHASE

Once research complete and verified:

1. Build `/near/elk-river.astro` using burnsville-lake.astro as pattern
2. Integrate findings from `elk-river-wma-findings.md`
3. Update `near/index.astro` to set `hasDetailPage: true` for Elk River
4. Add Place schema from verified GPS coordinates
5. Test build, verify mobile responsive
6. Commit with comprehensive description of sources used

---

## VERSION

**Version:** 1.0
**Created:** 2025-12-12
**Model Target:** Claude Opus 4.5 (claude-opus-4-5-20251101)
**Project:** WV Wild Outdoors Phase 3B Hunter Content Hub
**Spec Source:** docs/specs/phase3-area-pages/elk-river-wma.md
