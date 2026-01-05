# SPEC 1: Report Data Model

## 1. SPECIFICATION

### 1.1 Objective

Define the data structure for hunting/fishing reports that can be stored as JSON and rendered on both web and email.

### 1.2 Requirements

| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Support 3 report types: hunting, fishing, restock | Must |
| R2 | Include location data (WMA, lake, tributary) | Must |
| R3 | Include species/game data | Must |
| R4 | Include conditions/tips from Kim | Must |
| R5 | Timestamp for freshness | Must |
| R6 | Optional photo attachment | Should |
| R7 | SEO-friendly slug generation | Should |

### 1.3 Constraints

- JSON storage (no database)
- Must render in Astro templates
- Must work with Buttondown markdown

---

## 2. PSEUDOCODE

```typescript
interface Report {
  // Identity
  id: string;              // "2025-01-15-elk-river-trout"
  slug: string;            // URL-friendly: "elk-river-trout-jan-2025"
  type: "hunting" | "fishing" | "restock";

  // Content
  title: string;           // "Elk River Trout Hitting Hard"
  summary: string;         // 1-2 sentence teaser for email subject
  body: string;            // Full report in markdown (Kim's voice)

  // Location
  location: {
    name: string;          // "Elk River" | "Summersville Lake" | etc.
    type: "wma" | "lake" | "river" | "shop";
    nearPage?: string;     // "/near/elk-river" for cross-linking
  };

  // Species/Game (array for multi-species reports)
  species: string[];       // ["rainbow trout", "brown trout"]

  // Conditions
  conditions?: {
    weather?: string;      // "Cold front moving in"
    water?: string;        // "Clear, 48°F"
    activity?: string;     // "Heavy morning bite"
    bestBait?: string;     // "Mepps spinners, PowerBait"
  };

  // Meta
  date: string;            // ISO date: "2025-01-15"
  author: "kim" | "bryan" | "matt";
  photo?: string;          // "/reports/photos/elk-river-jan-2025.jpg"

  // Email tracking
  emailSent: boolean;
  emailDate?: string;
}

```

---

## 3. ARCHITECTURE

```
wv-wild-web/
├── src/
│   ├── data/
│   │   └── reports.json          # All reports (append-only)
│   ├── pages/
│   │   └── reports/
│   │       ├── index.astro       # Report archive page
│   │       └── [slug].astro      # Individual report page
│   └── components/
│       └── ReportCard.astro      # Reusable report preview
└── public/
    └── reports/
        └── photos/               # Report photos

```

---

## 4. REFINEMENT

### Edge Cases

- Empty reports array → Show "No reports yet" message
- Missing optional fields → Graceful fallback in templates
- Old reports → Archive view with year filtering
- Duplicate slugs → Append date suffix

### Quality Gates

- [ ] All required fields validated before save
- [ ] Slug uniqueness enforced
- [ ] Date format validated (ISO)
- [ ] Body length minimum (50 chars)

---

## 5. COMPLETION

### Success Criteria

- [ ] TypeScript interface defined
- [ ] Sample reports.json with 3 test reports
- [ ] Schema validates against interface
- [ ] Can render in Astro template
