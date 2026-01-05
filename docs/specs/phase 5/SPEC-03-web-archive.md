# SPEC 3: Web Archive (/reports)

## 1. SPECIFICATION

### 1.1 Objective

Create a `/reports` section on the website to archive all field reports for SEO value and visitor reference.

### 1.2 Requirements

| Req | Description | Priority |
|-----|-------------|----------|
| R1 | Index page listing all reports | Must |
| R2 | Individual report pages with full content | Must |
| R3 | Filter by type (hunting/fishing) | Should |
| R4 | Filter by location | Should |
| R5 | Most recent first | Must |
| R6 | Article schema for SEO | Must |
| R7 | Cross-link to /near pages | Should |

### 1.3 Constraints

- Follow existing /near and /guides patterns
- Static generation (Astro)
- No client-side JavaScript required

---

## 2. PSEUDOCODE

```astro
// pages/reports/index.astro

---
import reports from '../../data/reports.json';

// Sort by date descending
const sortedReports = reports.sort((a, b) =>
  new Date(b.date) - new Date(a.date)
);

// Group by type for filtering
const huntingReports = sortedReports.filter(r => r.type === 'hunting');
const fishingReports = sortedReports.filter(r => r.type === 'fishing');
---

<Layout title="Field Reports | WV Wild Outdoors">
  <Header />

  <!-- Hero -->
  <section class="bg-brand-brown">
    <h1>Field Reports</h1>
    <p>Local hunting and fishing intel from Kim and the crew</p>
  </section>

  <!-- Filter tabs -->
  <nav>
    <button data-filter="all">All</button>
    <button data-filter="hunting">Hunting</button>
    <button data-filter="fishing">Fishing</button>
  </nav>

  <!-- Report grid -->
  <section>
    {sortedReports.map(report => (
      <ReportCard report={report} />
    ))}
  </section>

  <!-- Newsletter CTA -->
  <EmailCapture heading="Get Reports in Your Inbox" />

  <Footer />
</Layout>

```

```astro
// pages/reports/[slug].astro

---
import reports from '../../data/reports.json';

export function getStaticPaths() {
  return reports.map(report => ({
    params: { slug: report.slug },
    props: { report }
  }));
}

const { report } = Astro.props;

const articleSchema = {
  "@type": "Article",
  "headline": report.title,
  "datePublished": report.date,
  "author": { "@type": "Person", "name": report.author }
};
---

<Layout title={`${report.title} | Field Reports`}>
  <Header />

  <article>
    <h1>{report.title}</h1>
    <time>{report.date}</time>
    <p class="location">{report.location.name}</p>

    {report.photo && <img src={report.photo} />}

    <div set:html={marked(report.body)} />

    {report.conditions && (
      <aside class="conditions">
        <h3>Conditions</h3>
        <ul>
          {report.conditions.weather && <li>Weather: {report.conditions.weather}</li>}
          {report.conditions.water && <li>Water: {report.conditions.water}</li>}
          {report.conditions.bestBait && <li>What's Working: {report.conditions.bestBait}</li>}
        </ul>
      </aside>
    )}

    {report.location.nearPage && (
      <a href={report.location.nearPage}>More about {report.location.name} →</a>
    )}
  </article>

  <Footer />
</Layout>

```

---

## 3. ARCHITECTURE

```
/reports                    → Index page (all reports)
/reports/elk-river-trout-jan-2025  → Individual report
/reports?type=hunting       → Filtered view (client-side)

Cross-links:
/reports/elk-river-*  ←→  /near/elk-river
/reports/summersville-*  ←→  /near/summersville-lake

```

---

## 4. REFINEMENT

### Design Patterns

- Follow /guides hero pattern (brown + camo)
- Cards similar to /near index page
- Report detail similar to /guides/* pages

### Edge Cases

- No reports yet → "First report coming soon!" message
- Very old reports → Year headers in archive
- Broken cross-links → Check /near page exists before linking

---

## 5. COMPLETION

### Success Criteria

- [ ] /reports renders with sample data
- [ ] Individual report pages generate
- [ ] Article schema validates
- [ ] Mobile responsive
- [ ] Build passes
