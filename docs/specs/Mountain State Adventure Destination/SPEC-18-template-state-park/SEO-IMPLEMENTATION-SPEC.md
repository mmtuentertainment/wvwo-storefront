# SPEC-18: State Park Template - SEO Implementation Specification

**Status:** Draft
**Created:** 2026-01-02
**Author:** Backend API Developer Agent
**Dependencies:** SPEC-18-FINAL.md (template requirements)

---

## Executive Summary

This specification defines the complete SEO implementation for the State Park template, addressing 20 identified gaps through structured data, meta optimization, and featured snippet targeting. Implementation targets 85%+ Rich Results eligibility and top-3 SERP positioning for "{Park Name} state park" queries.

### Key Deliverables

1. **5 Schema Components** (~770 lines total)
2. **Meta Tag Strategy** (9 templates)
3. **Featured Snippet Optimization** (3 snippet types)
4. **Technical SEO Implementation** (Core Web Vitals, sitemap)
5. **Validation Procedures** (automated testing)

---

## 1. SchemaStateParkTemplate.astro

**Location:** `wv-wild-web/src/components/schema/SchemaStateParkTemplate.astro`
**Lines:** ~400
**Purpose:** Primary @graph structured data for state park pages

### 1.1 Component Structure

```typescript
---
import type { StatePark } from '@/types/state-parks';

interface Props {
  park: StatePark;
  heroImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const { park, heroImage, breadcrumbs = [] } = Astro.props;

// Build canonical URL
const canonicalUrl = `https://www.wvwildoutdoors.com/state-parks/${park.slug}`;

// Build organization schema (WV Wild Outdoors as publisher)
const publisherOrg = {
  "@type": "Organization",
  "@id": "https://www.wvwildoutdoors.com/#organization",
  "name": "WV Wild Outdoors",
  "url": "https://www.wvwildoutdoors.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.wvwildoutdoors.com/images/wvwo-logo.png",
    "width": 600,
    "height": 60
  },
  "sameAs": [
    "https://www.facebook.com/wvwildoutdoors",
    // Add other social profiles
  ]
};

// Build managing agency schema (WV State Parks)
const managingAgency = {
  "@type": "StateGovernmentOrganization",
  "@id": "https://wvstateparks.com/#organization",
  "name": "West Virginia State Parks",
  "url": "https://wvstateparks.com",
  "telephone": "+1-304-558-2764",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Building 3, Room 714, State Capitol Complex",
    "addressLocality": "Charleston",
    "addressRegion": "WV",
    "postalCode": "25305",
    "addressCountry": "US"
  }
};

// Build seasonal opening hours
const buildOpeningHours = () => {
  if (!park.hours?.seasonal) return [];

  return park.hours.seasonal.map(season => ({
    "@type": "OpeningHoursSpecification",
    "validFrom": season.startDate,
    "validThrough": season.endDate,
    "dayOfWeek": season.daysOpen || [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": season.opens,
    "closes": season.closes
  }));
};

// Build amenity features (20+ facilities)
const buildAmenityFeatures = () => {
  const amenities = [];

  if (park.facilities.campgrounds > 0) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Camping Sites",
      "value": park.facilities.campgrounds,
      "unitText": "sites"
    });
  }

  if (park.facilities.cabins > 0) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Rental Cabins",
      "value": park.facilities.cabins,
      "unitText": "cabins"
    });
  }

  if (park.facilities.trails > 0) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Hiking Trails",
      "value": park.facilities.trails,
      "unitText": "trails"
    });

    if (park.trailMiles) {
      amenities.push({
        "@type": "LocationFeatureSpecification",
        "name": "Trail Miles",
        "value": park.trailMiles,
        "unitText": "miles"
      });
    }
  }

  if (park.facilities.boatLaunch) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Boat Launch"
    });
  }

  if (park.facilities.pool) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Swimming Pool"
    });
  }

  if (park.facilities.beach) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Beach Area"
    });
  }

  if (park.facilities.visitorCenter) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Visitor Center"
    });
  }

  if (park.facilities.picnicAreas > 0) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Picnic Areas",
      "value": park.facilities.picnicAreas,
      "unitText": "areas"
    });
  }

  if (park.facilities.playground) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Playground"
    });
  }

  if (park.activities.includes('fishing')) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Fishing Access"
    });
  }

  if (park.facilities.restrooms) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Restroom Facilities"
    });
  }

  if (park.facilities.showers) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Shower Facilities"
    });
  }

  if (park.facilities.dumpStation) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "RV Dump Station"
    });
  }

  if (park.facilities.wifi) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "WiFi Access",
      "value": park.facilities.wifiCoverage || "Limited"
    });
  }

  if (park.accessibility.wheelchairAccessible) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Wheelchair Accessible Facilities"
    });
  }

  if (park.accessibility.accessibleRestrooms) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "ADA-Compliant Restrooms"
    });
  }

  if (park.accessibility.accessibleTrails > 0) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Accessible Trails",
      "value": park.accessibility.accessibleTrails,
      "unitText": "trails"
    });
  }

  return amenities;
};

// Build PropertyValue extensions for custom metrics
const buildAdditionalProperties = () => {
  return [
    {
      "@type": "PropertyValue",
      "name": "Total Acreage",
      "value": park.acreage,
      "unitText": "acres"
    },
    park.facilities.campgrounds > 0 && {
      "@type": "PropertyValue",
      "name": "Campsite Count",
      "value": park.facilities.campgrounds
    },
    park.facilities.cabins > 0 && {
      "@type": "PropertyValue",
      "name": "Cabin Count",
      "value": park.facilities.cabins
    },
    park.trailMiles && {
      "@type": "PropertyValue",
      "name": "Trail Miles",
      "value": park.trailMiles,
      "unitText": "miles"
    },
    park.elevation && {
      "@type": "PropertyValue",
      "name": "Elevation",
      "value": park.elevation,
      "unitText": "feet"
    },
    park.waterfront && {
      "@type": "PropertyValue",
      "name": "Waterfront Access",
      "value": "Yes"
    }
  ].filter(Boolean);
};

// Build main park schema with dual @type
const parkSchema = {
  "@type": ["Park", "TouristAttraction"],
  "@id": `${canonicalUrl}#park`,
  "name": park.name,
  "description": park.description,
  "url": canonicalUrl,
  "image": heroImage ? {
    "@type": "ImageObject",
    "@id": `${canonicalUrl}#heroImage`,
    "url": heroImage.src,
    "width": heroImage.width,
    "height": heroImage.height,
    "caption": heroImage.alt
  } : undefined,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": park.address.street,
    "addressLocality": park.address.city,
    "addressRegion": "WV",
    "postalCode": park.address.zip,
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": park.coordinates.lat,
    "longitude": park.coordinates.lng
  },
  "telephone": park.contact.phone,
  "openingHoursSpecification": buildOpeningHours(),
  "amenityFeature": buildAmenityFeatures(),
  "additionalProperty": buildAdditionalProperties(),
  "petsAllowed": park.policies?.petsAllowed !== false,
  "smokingAllowed": park.policies?.smokingAllowed === true,
  "publicAccess": true,
  "isAccessibleForFree": park.fees?.dayUse === 0 || park.fees?.dayUse === undefined,
  "managedBy": {
    "@id": "https://wvstateparks.com/#organization"
  }
};

// Build Article schema for page content
const articleSchema = {
  "@type": "Article",
  "@id": `${canonicalUrl}#article`,
  "headline": `${park.name} - Complete Visitor Guide`,
  "description": park.description,
  "author": {
    "@id": "https://www.wvwildoutdoors.com/#organization"
  },
  "publisher": {
    "@id": "https://www.wvwildoutdoors.com/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": canonicalUrl
  },
  "datePublished": park.createdAt || new Date().toISOString(),
  "dateModified": park.updatedAt || new Date().toISOString(),
  "image": heroImage ? {
    "@id": `${canonicalUrl}#heroImage`
  } : undefined,
  "about": {
    "@id": `${canonicalUrl}#park`
  }
};

// Build BreadcrumbList schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${canonicalUrl}#breadcrumb`,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.wvwildoutdoors.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "State Parks",
      "item": "https://www.wvwildoutdoors.com/state-parks"
    },
    ...breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 3,
      "name": crumb.name,
      "item": crumb.url
    })),
    {
      "@type": "ListItem",
      "position": breadcrumbs.length + 3,
      "name": park.name,
      "item": canonicalUrl
    }
  ]
};

// Assemble complete @graph
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    publisherOrg,
    managingAgency,
    parkSchema,
    articleSchema,
    breadcrumbSchema
  ]
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```typescript

### 1.2 Data Integration Points

### Required Park Data Fields:

```typescript
interface StatePark {
  // Core identification
  name: string;
  slug: string;
  description: string;

  // Location
  address: {
    street: string;
    city: string;
    zip: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };

  // Contact
  contact: {
    phone: string;
    email?: string;
  };

  // Hours
  hours?: {
    seasonal: Array<{
      startDate: string; // ISO 8601
      endDate: string;
      daysOpen?: string[]; // ["Monday", "Tuesday", ...]
      opens: string; // "08:00"
      closes: string; // "20:00"
    }>;
  };

  // Facilities (20+ properties)
  facilities: {
    campgrounds: number;
    cabins: number;
    trails: number;
    picnicAreas: number;
    boatLaunch: boolean;
    pool: boolean;
    beach: boolean;
    visitorCenter: boolean;
    playground: boolean;
    restrooms: boolean;
    showers: boolean;
    dumpStation: boolean;
    wifi: boolean;
    wifiCoverage?: string;
  };

  // Activities
  activities: string[]; // ['hiking', 'fishing', 'camping', ...]

  // Accessibility
  accessibility: {
    wheelchairAccessible: boolean;
    accessibleRestrooms: boolean;
    accessibleTrails: number;
  };

  // Policies
  policies?: {
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };

  // Fees
  fees?: {
    dayUse?: number;
    camping?: {
      tent: number;
      rv: number;
    };
  };

  // Metrics
  acreage: number;
  trailMiles?: number;
  elevation?: number;
  waterfront?: boolean;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}
```

### 1.3 Validation Procedures

### Automated Testing

```typescript
// wv-wild-web/tests/schema/state-park-schema.test.ts
import { validateSchema } from '@/utils/schema-validator';
import { mockStatePark } from '@/fixtures/state-parks';

describe('SchemaStateParkTemplate', () => {
  it('generates valid @graph structure', () => {
    const result = validateSchema(mockStatePark);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('includes all required @graph entities', () => {
    const schema = generateSchema(mockStatePark);
    expect(schema['@graph']).toHaveLength(5);
    expect(schema['@graph'].map(e => e['@type'])).toContain('Organization');
    expect(schema['@graph'].map(e => e['@type'])).toContain('StateGovernmentOrganization');
  });

  it('includes 20+ amenity features', () => {
    const schema = generateSchema(mockStatePark);
    const parkEntity = schema['@graph'].find(e => e['@type'].includes('Park'));
    expect(parkEntity.amenityFeature.length).toBeGreaterThanOrEqual(20);
  });
});
```typescript

### Manual Validation:

1. Google Rich Results Test: `https://search.google.com/test/rich-results`
2. Schema.org Validator: `https://validator.schema.org/`
3. Bing Webmaster Tools: Markup Validator

---

## 2. SchemaFAQ.astro

**Location:** `wv-wild-web/src/components/schema/SchemaFAQ.astro`
**Lines:** ~120
**Purpose:** FAQPage schema for featured snippets

### 2.1 Component Structure

```typescript
---
interface FAQItem {
  question: string;
  answer: string; // 40-50 words for snippet optimization
}

interface Props {
  faqs: FAQItem[];
  pageUrl: string;
}

const { faqs, pageUrl } = Astro.props;

// Validate answer length (40-50 words optimal for snippets)
const validateAnswerLength = (answer: string): boolean => {
  const wordCount = answer.trim().split(/\s+/).length;
  return wordCount >= 35 && wordCount <= 55;
};

// Build FAQPage schema
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq, index) => ({
    "@type": "Question",
    "@id": `${pageUrl}#faq-${index}`,
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />

<!-- Also render FAQ in HTML for accessibility and indexing -->
<section class="faq-section" itemscope itemtype="https://schema.org/FAQPage">
  {faqs.map((faq, index) => (
    <div
      class="faq-item"
      itemscope
      itemprop="mainEntity"
      itemtype="https://schema.org/Question"
      id={`faq-${index}`}
    >
      <h3 class="faq-question" itemprop="name">{faq.question}</h3>
      <div
        class="faq-answer"
        itemscope
        itemprop="acceptedAnswer"
        itemtype="https://schema.org/Answer"
      >
        <div itemprop="text">
          {faq.answer}
        </div>
      </div>
    </div>
  ))}
</section>
```

### 2.2 FAQ Content Guidelines

### Optimal Question Formats

### Priority 1: Direct "is" questions (paragraph snippets)

- "Is {Park Name} State Park pet-friendly?"
- "Is camping available at {Park Name} State Park?"
- "Is {Park Name} State Park open year-round?"
- "Is there cell phone service at {Park Name}?"

### Priority 2: "How do I" questions (list snippets)

- "How do I reserve a campsite at {Park Name}?"
- "How do I get to {Park Name} State Park?"
- "What activities are available at {Park Name}?"

### Priority 3: "What" informational questions

- "What are the cabin rental rates at {Park Name}?"
- "What trails are best for beginners at {Park Name}?"
- "What amenities does {Park Name} offer?"

### Answer Structure (40-50 words)

```json
{Opening "is" statement}. {Supporting detail 1}. {Supporting detail 2}. {Supporting detail 3 or CTA}.
```

### Example

```typescript
const exampleAnswer = `
Blackwater Falls State Park is pet-friendly with leashed dogs allowed on trails and in campgrounds.
Pets must be on a 6-foot leash at all times.
Dogs are not permitted in cabins, the lodge, or swimming areas.
Pet waste stations are available throughout the park.
`; // 48 words
```typescript

### 2.3 FAQ Templates by Park Type

### Mountain Parks (Blackwater Falls, Canaan Valley):

```typescript
const mountainParkFAQs: FAQItem[] = [
  {
    question: "Is Blackwater Falls State Park open in winter?",
    answer: "Blackwater Falls State Park is open year-round with winter activities including cross-country skiing, sledding, and ice climbing. The lodge and cabins remain open during winter months. Some facilities may have reduced hours November through March. Road conditions vary, so check the park website before visiting."
  },
  {
    question: "How do I reserve a cabin at Blackwater Falls?",
    answer: "Cabin reservations are made through the West Virginia State Parks online reservation system at wvstateparks.com or by calling 1-800-CALL-WVA. Cabins can be booked up to 13 months in advance. Weekend reservations require a 2-night minimum stay. Weekday stays may be available with 1-night minimums."
  }
];
```

### Lake Parks (Tygart Lake, Stonewall Jackson)

```typescript
const lakeParkFAQs: FAQItem[] = [
  {
    question: "Is there a boat launch at Tygart Lake State Park?",
    answer: "Tygart Lake State Park has a public boat launch with multiple ramps and courtesy docks. The launch is open dawn to dusk during boating season (April-October). No launch fees are charged for day use. Trailer parking is available near the ramp area. Water levels fluctuate seasonally, so check conditions before launching."
  },
  {
    question: "What fishing species are in Tygart Lake?",
    answer: "Tygart Lake offers excellent fishing for largemouth bass, smallmouth bass, walleye, and crappie. The lake also holds muskellunge, channel catfish, and various panfish species. Bass fishing is best in spring and fall. A valid West Virginia fishing license is required. Check current size and creel limits before fishing."
  }
];
```typescript

---

## 3. SchemaEvent.astro

**Location:** `wv-wild-web/src/components/schema/SchemaEvent.astro`
**Lines:** ~150
**Purpose:** Event schema for ranger programs and park events

### 3.1 Component Structure

```typescript
---
interface ParkEvent {
  name: string;
  description: string;
  eventType: 'EducationalEvent' | 'SocialEvent' | 'FestivalEvent' | 'ChildrensEvent';
  startDate: string; // ISO 8601
  endDate?: string;
  location: {
    name: string;
    address?: string;
    parkSlug: string;
  };
  organizer: {
    name: string;
    url?: string;
  };
  offers?: {
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'SoldOut' | 'PreOrder';
    url?: string;
  };
  isAccessibleForFree: boolean;
  eventStatus: 'EventScheduled' | 'EventCancelled' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
  image?: {
    url: string;
    width: number;
    height: number;
  };
  performer?: {
    name: string;
    type: 'Person' | 'Organization';
  };
  audience?: {
    type: 'EducationalAudience';
    educationalRole?: string;
    audienceType?: string;
  };
}

interface Props {
  event: ParkEvent;
  pageUrl: string;
}

const { event, pageUrl } = Astro.props;

// Build location schema
const buildLocation = () => {
  return {
    "@type": "Place",
    "name": event.location.name,
    "address": event.location.address ? {
      "@type": "PostalAddress",
      "streetAddress": event.location.address,
      "addressRegion": "WV",
      "addressCountry": "US"
    } : undefined,
    "url": `https://www.wvwildoutdoors.com/state-parks/${event.location.parkSlug}`
  };
};

// Build offers schema
const buildOffers = () => {
  if (!event.offers) {
    return {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    };
  }

  return {
    "@type": "Offer",
    "price": event.offers.price.toFixed(2),
    "priceCurrency": event.offers.priceCurrency,
    "availability": `https://schema.org/${event.offers.availability}`,
    "url": event.offers.url,
    "validFrom": event.startDate
  };
};

// Build complete event schema
const schema = {
  "@context": "https://schema.org",
  "@type": event.eventType,
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate || event.startDate,
  "eventStatus": `https://schema.org/${event.eventStatus}`,
  "eventAttendanceMode": `https://schema.org/${event.eventAttendanceMode}`,
  "location": buildLocation(),
  "organizer": {
    "@type": "Organization",
    "name": event.organizer.name,
    "url": event.organizer.url || "https://wvstateparks.com"
  },
  "offers": buildOffers(),
  "isAccessibleForFree": event.isAccessibleForFree,
  "image": event.image,
  "performer": event.performer,
  "audience": event.audience,
  "url": pageUrl
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## 4. SchemaEventSeries.astro

**Location:** `wv-wild-web/src/components/schema/SchemaEventSeries.astro`
**Lines:** ~100
**Purpose:** EventSeries schema for recurring programs

### 4.1 Component Structure

```typescript
---
interface EventSeries {
  name: string;
  description: string;
  organizer: {
    name: string;
    url?: string;
  };
  location: {
    name: string;
    parkSlug: string;
  };
  startDate: string;
  endDate?: string;
  eventSchedule: {
    repeatFrequency: string; // ISO 8601 duration (P1W = weekly)
    repeatCount?: number;
    byDay?: string[];
    byMonth?: number[];
  };
  subEvents?: string[];
}

interface Props {
  series: EventSeries;
  pageUrl: string;
}

const { series, pageUrl } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  "name": series.name,
  "description": series.description,
  "organizer": {
    "@type": "Organization",
    "name": series.organizer.name,
    "url": series.organizer.url || "https://wvstateparks.com"
  },
  "location": {
    "@type": "Place",
    "name": series.location.name,
    "url": `https://www.wvwildoutdoors.com/state-parks/${series.location.parkSlug}`
  },
  "startDate": series.startDate,
  "endDate": series.endDate,
  "eventSchedule": {
    "@type": "Schedule",
    "repeatFrequency": series.eventSchedule.repeatFrequency,
    "repeatCount": series.eventSchedule.repeatCount,
    "byDay": series.eventSchedule.byDay,
    "byMonth": series.eventSchedule.byMonth
  },
  "subEvent": series.subEvents?.map(url => ({
    "@type": "Event",
    "@id": url
  })),
  "url": pageUrl
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```typescript

---

## 5. Meta Tag Strategy

### 5.1 Title Tag Templates

**Formula:** `{Park Name} State Park Guide | WV Wild Outdoors`
**Character Target:** 50-60 characters
**Brand Placement:** Always end with `| WV Wild Outdoors`

```typescript
// Template function
const generateTitle = (parkName: string): string => {
  const brand = "WV Wild Outdoors";
  const suffix = "State Park Guide";
  const maxParkNameLength = 23;

  const truncatedName = parkName.length > maxParkNameLength
    ? parkName.substring(0, maxParkNameLength - 3) + "..."
    : parkName;

  return `${truncatedName} ${suffix} | ${brand}`;
};

// Examples:
// "Blackwater Falls State Park Guide | WV Wild Outdoors" (59 chars)
// "Watoga State Park Guide | WV Wild Outdoors" (47 chars)
```

### 5.2 Meta Description Templates

**Formula:** `{Highlight}. {Activities}. {Feature}. {Proximity}. Plan your visit.`
**Character Target:** 150-160 characters

```typescript
const generateDescription = (params: {
  highlight: string;
  activities: string[];
  feature: string;
  proximity: string;
}): string => {
  const { highlight, activities, feature, proximity } = params;

  const s1 = highlight;
  const s2 = `Enjoy ${activities.slice(0, 3).join(", ")}`;
  const s3 = feature;
  const s4 = `Located ${proximity}`;
  const cta = "Plan your visit.";

  return `${s1}. ${s2}. ${s3}. ${s4}. ${cta}`;
};
```typescript

### 5.3 Complete Meta Tag Component

**Location:** `wv-wild-web/src/components/meta/StateParkMeta.astro`

```typescript
---
import type { StatePark } from '@/types/state-parks';

interface Props {
  park: StatePark;
  title?: string;
  description?: string;
  heroImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

const { park, title, description, heroImage } = Astro.props;

const canonicalUrl = `https://www.wvwildoutdoors.com/state-parks/${park.slug}`;
const pageTitle = title || `${park.name} State Park Guide | WV Wild Outdoors`;
const pageDescription = description || generateDescription(park);
const ogImage = heroImage?.src || `https://www.wvwildoutdoors.com/images/og/${park.slug}.jpg`;
---

<!-- Primary Meta Tags -->
<title>{pageTitle}</title>
<meta name="title" content={pageTitle} />
<meta name="description" content={pageDescription} />
<link rel="canonical" href={canonicalUrl} />
<meta name="robots" content="index, follow" />

<!-- OpenGraph Meta Tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={pageDescription} />
<meta property="og:image" content={ogImage} />
<meta property="og:site_name" content="WV Wild Outdoors" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={pageDescription} />
<meta name="twitter:image" content={ogImage} />

<!-- Geo Meta Tags -->
<meta name="geo.region" content="US-WV" />
<meta name="geo.placename" content={park.address.city} />
<meta name="geo.position" content={`${park.coordinates.lat};${park.coordinates.lng}`} />
<meta name="ICBM" content={`${park.coordinates.lat}, ${park.coordinates.lng}`} />
```

---

## 6. Structured Data Strategy

### 6.1 HowTo Schema for Reservations

```typescript
const campsiteReservationHowTo = {
  name: "How to Reserve a Campsite at West Virginia State Parks",
  description: "Step-by-step guide to booking a campsite through the online reservation system.",
  totalTime: "PT10M",
  steps: [
    {
      name: "Visit the reservation website",
      text: "Go to wvstateparks.com and click 'Reservations'. Select 'Camping' from options."
    },
    {
      name: "Choose your park and dates",
      text: "Select desired park from dropdown. Enter check-in and check-out dates."
    },
    {
      name: "Browse available campsites",
      text: "View sites on interactive map. Filter by type (tent, RV, electric hookup)."
    },
    {
      name: "Select your campsite",
      text: "Click on preferred site to view details. Add site to cart."
    },
    {
      name: "Create account or log in",
      text: "Create free account or log in. Provide name, email, phone, address."
    },
    {
      name: "Review and pay",
      text: "Review details and total. Enter payment (credit/debit accepted). Confirm reservation."
    },
    {
      name: "Save confirmation",
      text: "Save or print confirmation email with reservation number. Present at park check-in."
    }
  ]
};
```markdown

### 6.2 Table Markup for Fee Structures

```html
<table itemscope itemtype="https://schema.org/Table">
  <caption itemprop="about">Camping Fees at Blackwater Falls State Park</caption>
  <thead>
    <tr>
      <th scope="col">Campsite Type</th>
      <th scope="col">Rate (per night)</th>
      <th scope="col">Season</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tent Site</td>
      <td>$23</td>
      <td>May - October</td>
    </tr>
    <tr>
      <td>RV Site (electric)</td>
      <td>$31</td>
      <td>May - October</td>
    </tr>
    <tr>
      <td>Cabin Rental</td>
      <td>$95-$150</td>
      <td>Year-round</td>
    </tr>
  </tbody>
</table>
```

---

## 7. Voice Search Optimization

### 7.1 Question-Based Heading Strategy

```html
<!-- ✅ CORRECT: Voice search optimized -->
<h2>Is Blackwater Falls State Park Open in Winter?</h2>
<p>Yes, Blackwater Falls State Park is open year-round with winter activities...</p>

<h2>How Much Does It Cost to Camp at Blackwater Falls?</h2>
<p>Camping fees at Blackwater Falls range from $23 for tent sites...</p>

<!-- ❌ WRONG: Keyword stuffing -->
<h2>Blackwater Falls Winter Hours Open</h2>
```markdown

### 7.2 Natural Language Answer Structure

```html
<h2>What Is the Closest State Park to Charleston WV?</h2>
<p>
  <strong>Hawks Nest State Park is the closest state park to Charleston,
  located just 31 miles southeast via US-60.</strong> The drive takes
  approximately 40 minutes through scenic New River Gorge area.
</p>
```

---

## 8. Featured Snippet Optimization

### 8.1 Paragraph Snippets (40-50 words)

```html
<h2>Is Blackwater Falls State Park Dog Friendly?</h2>
<p>
  Yes, Blackwater Falls State Park is dog-friendly with leashed pets allowed
  on all trails and in campgrounds. Dogs must be on a leash no longer than
  6 feet at all times. Pets are not permitted in cabins, the lodge, or
  swimming areas. Pet waste stations are available throughout the park.
</p>
<!-- 52 words -->
```markdown

### 8.2 List Snippets (6-8 items)

```html
<h2>What Are the Top Hiking Trails at Blackwater Falls State Park?</h2>
<ol>
  <li><strong>Gentle Trail</strong> - 0.25 miles, wheelchair accessible</li>
  <li><strong>Elakala Trail</strong> - 1.5 miles, four waterfalls</li>
  <li><strong>Balanced Rock Trail</strong> - 0.3 miles, rock formation</li>
  <li><strong>Dobbin House Trail</strong> - 1.7 miles, historic cabin</li>
  <li><strong>Blackwater Canyon Trail</strong> - 2 miles, river access</li>
  <li><strong>Yellow Birch Trail</strong> - 1.4 miles, connects to Lindy Point</li>
</ol>
```

---

## 9. Technical SEO Requirements

### 9.1 Core Web Vitals Targets

```typescript
const coreWebVitalsTargets = {
  LCP: {
    target: 2.0, // seconds
    strategy: [
      "Preload hero image",
      "Use WebP format",
      "Implement srcset",
      "Lazy load below-fold images"
    ]
  },
  FID: {
    target: 50, // milliseconds
    strategy: [
      "Defer non-critical JavaScript",
      "Minimize main thread work"
    ]
  },
  CLS: {
    target: 0.05,
    strategy: [
      "Set width/height on all images",
      "Reserve space for dynamic content"
    ]
  }
};
```typescript

### 9.2 Image Optimization

```astro
---
import { Picture } from '@astrojs/image/components';
---

<Picture
  src={heroImage.src}
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  formats={['webp', 'jpg']}
  alt={heroImage.alt}
  width={1200}
  height={675}
  loading="eager"
/>
```

---

## 10. Sitemap Integration

### 10.1 Dynamic Sitemap Generation

**Location:** `wv-wild-web/src/pages/sitemap.xml.ts`

```typescript
import type { APIRoute } from 'astro';
import { getAllStateParks } from '@/lib/state-parks';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://www.wvwildoutdoors.com';
  const parks = await getAllStateParks();

  const parkUrls = parks.map(park => ({
    loc: `${siteUrl}/state-parks/${park.slug}`,
    lastmod: park.updatedAt || new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
    images: park.images.map(img => ({
      loc: `${siteUrl}${img.src}`,
      title: park.name,
      caption: img.caption
    }))
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${parkUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
```text

---

## Implementation Roadmap

### Phase 1: Core Schema (Week 1)

- [ ] Create `SchemaStateParkTemplate.astro`
- [ ] Create `StateParkMeta.astro`
- [ ] Update `StatePark` TypeScript interface
- [ ] Add schema validation tests
- [ ] Test in Rich Results Test

### Phase 2: FAQ & Events (Week 2)

- [ ] Create `SchemaFAQ.astro`
- [ ] Create `SchemaEvent.astro`
- [ ] Create `SchemaEventSeries.astro`
- [ ] Write 5-8 FAQs per park
- [ ] Test featured snippet eligibility

### Phase 3: Structured Data (Week 3)

- [ ] Create `SchemaHowTo.astro`
- [ ] Implement table markup
- [ ] Implement list markup
- [ ] Add breadcrumb microdata
- [ ] Voice search optimization

### Phase 4: Technical SEO (Week 4)

- [ ] Optimize Core Web Vitals
- [ ] Image optimization pipeline
- [ ] Responsive image components
- [ ] Update sitemap
- [ ] Configure robots.txt

### Phase 5: Validation (Ongoing)

- [ ] Automated schema validation in CI/CD
- [ ] Monitor Rich Results in Search Console
- [ ] Track featured snippets
- [ ] Monitor Core Web Vitals

---

## Success Metrics

### Target (Post-Implementation):

- Rich Results Eligibility: 85%+
- Average SERP Position: Top 3 for "{Park Name} state park"
- Organic CTR: 12%+ (vs. 8% average)
- Featured Snippets: 15+ appearances
- Voice Search Visibility: 25%+ of queries

### Technical Performance:

- LCP: <2.0s (95th percentile)
- FID: <50ms (95th percentile)
- CLS: <0.05 (95th percentile)

---

## Validation Commands

```bash
# Validate schema locally
npm run validate:schema

# Test Rich Results
npm run test:rich-results

# Check Core Web Vitals
npm run test:cwv

# Generate sitemap
npm run build:sitemap

# Full SEO audit
npm run audit:seo
```

---

## End of SEO Implementation Specification
