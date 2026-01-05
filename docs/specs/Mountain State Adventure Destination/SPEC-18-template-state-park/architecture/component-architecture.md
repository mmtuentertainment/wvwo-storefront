# SPEC-18 State Park Template - Component Architecture Specification

**Version:** 1.0.0
**Author:** System Architecture Designer
**Date:** 2026-01-02
**Status:** DRAFT - Architecture Phase

---

## 1. Executive Summary

This document specifies the complete component architecture for the State Park Template system. State Parks represent "multi-template hybrid" destinations, combining facilities management (lodging, campgrounds), activity programming (ranger-led events, workshops), trail systems (hiking infrastructure), and accessibility features (ADA compliance, adaptive services).

**Key Architectural Decisions:**
- **Composition over Inheritance:** Reuse 5 proven components from SPEC-17 Backcountry
- **Accessibility-First:** Dedicated AccessibilitySection with WCAG 2.1 Level AA compliance
- **Schema.org Integration:** Government-specific schemas for park data
- **WVWO Brand Compliance:** All components follow rural WV aesthetic guidelines

---

## 2. System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    State Park Template System                   │
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │   Content      │  │   Schema.org   │  │   Reservation  │    │
│  │   Management   │  │   Integration  │  │   System       │    │
│  │   (Markdown)   │  │   (SEO)        │  │   (External)   │    │
│  └────────────────┘  └────────────────┘  └────────────────┘    │
│           │                  │                    │              │
│           └──────────────────┼────────────────────┘              │
│                              │                                   │
│                              ▼                                   │
│           ┌──────────────────────────────────┐                  │
│           │  StateParkTemplate.astro         │                  │
│           │  (Main Orchestrator - 1200 lines)│                  │
│           └──────────────────────────────────┘                  │
│                              │                                   │
│         ┌────────────────────┼────────────────────┐             │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│  ┌─────────────┐      ┌─────────────┐     ┌─────────────┐     │
│  │   Reused    │      │     New     │     │   Shared    │     │
│  │ Components  │      │ Components  │     │  Utilities  │     │
│  │  (SPEC-17)  │      │  (SPEC-18)  │     │             │     │
│  └─────────────┘      └─────────────┘     └─────────────┘     │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │                                   │
│                              ▼                                   │
│              ┌───────────────────────────────┐                  │
│              │  User Browser (HTML/CSS/JS)   │                  │
│              └───────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘

External Systems:
- reservations.wvstateparks.com (booking)
- wvstateparks.com (official data source)
- Weather APIs (alerts, conditions)
```

---

## 3. Component Hierarchy & Composition

### 3.1 Component Tree

```
StateParkTemplate.astro (Main)
│
├── AdventureHero.astro ················ REUSED (SPEC-17)
│   └── Props: heroImage, parkName, tagline
│
├── ParkOverviewSection.astro ·········· NEW (SPEC-18)
│   └── Props: hours, fees, contact, alerts
│
├── AdventureQuickStats.astro ·········· REUSED (SPEC-17)
│   └── Props: acreage, trailMiles, elevation
│
├── FacilitiesSection.astro ············ NEW (SPEC-18)
│   ├── LodgingCard.astro ············· Sub-component
│   ├── CampgroundCard.astro ·········· Sub-component
│   └── AmenityGrid.astro ············· Sub-component
│
├── ActivitiesSection.astro ············ NEW (SPEC-18)
│   ├── ProgramCard.astro ············· Sub-component
│   └── EventCalendarWidget.astro ····· Sub-component
│
├── TrailsSection.astro ················ REUSED (SPEC-17)
│   └── Props: trails[] with difficulty markers
│
├── AccessibilitySection.astro ········· NEW (SPEC-18)
│   ├── ADAFeaturesGrid.astro ········· Sub-component
│   └── TrailAccessInfo.astro ········· Sub-component
│
├── ScenicOverlooksSection.astro ······· REUSED (SPEC-17)
│   └── Props: viewpoints[] with coordinates
│
├── ReservationSection.astro ··········· NEW (SPEC-18)
│   ├── FeeStructureTable.astro ······· Sub-component
│   └── BookingCTA.astro ·············· Sub-component
│
└── AdventureCTA.astro ················· REUSED (SPEC-17)
    └── Props: ctaText, phoneNumber, reservationLink
```

### 3.2 Dependency Graph

```
┌─────────────────────────────────────────────────────────┐
│              External Dependencies                       │
│  - Astro 4.x (SSG framework)                            │
│  - Tailwind CSS 3.x (styling)                           │
│  - Zod 3.x (schema validation)                          │
│  - astro-seo (meta tags)                                │
│  - schema-dts (TypeScript types for Schema.org)         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│           Internal Shared Dependencies                   │
│  - schemas/state-park.ts (Zod schemas)                  │
│  - types/state-park.ts (TypeScript types)               │
│  - utils/date-formatter.ts                              │
│  - utils/schema-builder.ts (Schema.org helpers)         │
│  - utils/accessibility-helpers.ts (ARIA utilities)      │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Component Layer                             │
│  - All .astro components                                │
│  - Component-specific styles                            │
│  - Component-specific types/interfaces                  │
└─────────────────────────────────────────────────────────┘
```

---

## 4. New Components Detailed Specifications

### 4.1 FacilitiesSection.astro

**Purpose:** Display all park facilities (lodging, campgrounds, picnic areas, amenities) with reservation CTAs.

#### 4.1.1 Props Interface

```typescript
// schemas/state-park.ts
import { z } from 'zod';

export const LodgingSchema = z.object({
  type: z.enum(['cabin', 'lodge', 'cottage', 'yurt']),
  name: z.string(),
  description: z.string(),
  capacity: z.object({
    sleeps: z.number(),
    bedrooms: z.number().optional(),
  }),
  amenities: z.array(z.string()), // ['kitchen', 'fireplace', 'hot tub']
  seasonalAvailability: z.object({
    openDate: z.string(), // MM-DD format
    closeDate: z.string(),
  }),
  reservationRequired: z.boolean(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
    unit: z.enum(['night', 'week']),
  }),
  adaAccessible: z.boolean(),
  imageUrl: z.string().url(),
});

export const CampgroundSchema = z.object({
  name: z.string(),
  totalSites: z.number(),
  siteTypes: z.object({
    tent: z.number().optional(),
    rv: z.number().optional(),
    electric: z.number().optional(),
    waterElectric: z.number().optional(),
  }),
  amenities: z.array(z.string()), // ['showers', 'dump station', 'playground']
  seasonalAvailability: z.object({
    openDate: z.string(),
    closeDate: z.string(),
  }),
  reservationWindow: z.number(), // days in advance
  dailyRate: z.object({
    resident: z.number(),
    nonResident: z.number(),
  }),
  adaAccessible: z.boolean(),
});

export const AmenitySchema = z.object({
  name: z.string(),
  category: z.enum(['picnic', 'boat-launch', 'beach', 'playground', 'shelter', 'other']),
  description: z.string(),
  reservable: z.boolean(),
  feeRequired: z.boolean(),
  adaAccessible: z.boolean(),
});

export const FacilitiesSectionSchema = z.object({
  lodging: z.array(LodgingSchema).optional(),
  campgrounds: z.array(CampgroundSchema).optional(),
  amenities: z.array(AmenitySchema).optional(),
});

export type FacilitiesSectionProps = z.infer<typeof FacilitiesSectionSchema>;
```

#### 4.1.2 Component Structure (Pseudo-code)

```astro
---
// FacilitiesSection.astro
import { FacilitiesSectionSchema, type FacilitiesSectionProps } from '@/schemas/state-park';

interface Props extends FacilitiesSectionProps {
  parkName: string;
}

const { lodging, campgrounds, amenities, parkName } = Astro.props;

// Validate props
FacilitiesSectionSchema.parse({ lodging, campgrounds, amenities });

// Helper: Format price range
const formatPriceRange = (min: number, max: number, unit: string) => {
  if (min === max) return `$${min}/${unit}`;
  return `$${min}-$${max}/${unit}`;
};

// Helper: Season display
const formatSeason = (openDate: string, closeDate: string) => {
  // Convert MM-DD to readable format
  const open = new Date(`2024-${openDate}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const close = new Date(`2024-${closeDate}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${open} - ${close}`;
};
---

<section
  class="py-16 bg-brand-cream"
  aria-labelledby="facilities-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="facilities-heading"
      class="font-display text-4xl md:text-5xl font-black text-brand-brown mb-12"
    >
      Park Facilities
    </h2>

    <!-- Lodging Section -->
    {lodging && lodging.length > 0 && (
      <div class="mb-16">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
          Lodging
        </h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="Available lodging options"
        >
          {lodging.map((unit) => (
            <article
              class="bg-white rounded-sm border-2 border-brand-brown overflow-hidden hover:shadow-lg transition-shadow"
              role="listitem"
            >
              <!-- Image -->
              <div class="aspect-video overflow-hidden">
                <img
                  src={unit.imageUrl}
                  alt={`${unit.name} exterior`}
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="flex items-start justify-between mb-3">
                  <h4 class="font-display text-xl font-bold text-brand-brown">
                    {unit.name}
                  </h4>
                  {unit.adaAccessible && (
                    <span
                      class="text-sign-green text-sm font-semibold"
                      aria-label="ADA Accessible"
                    >
                      ♿ ADA
                    </span>
                  )}
                </div>

                <p class="text-sm text-brand-brown/80 mb-4 font-body">
                  {unit.description}
                </p>

                <!-- Capacity -->
                <div class="flex items-center gap-4 mb-4 text-sm text-brand-brown">
                  <span class="font-semibold">
                    Sleeps {unit.capacity.sleeps}
                  </span>
                  {unit.capacity.bedrooms && (
                    <span>
                      {unit.capacity.bedrooms} BR
                    </span>
                  )}
                </div>

                <!-- Amenities -->
                <div class="mb-4">
                  <p class="text-xs font-semibold text-brand-brown/60 mb-2">AMENITIES</p>
                  <div class="flex flex-wrap gap-2">
                    {unit.amenities.slice(0, 4).map((amenity) => (
                      <span class="text-xs bg-sign-green/10 text-sign-green px-2 py-1 rounded-sm">
                        {amenity}
                      </span>
                    ))}
                    {unit.amenities.length > 4 && (
                      <span class="text-xs text-brand-brown/60">
                        +{unit.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <!-- Season & Price -->
                <div class="border-t border-brand-brown/20 pt-4 mb-4">
                  <p class="text-sm text-brand-brown/80 mb-2">
                    <strong>Season:</strong> {formatSeason(unit.seasonalAvailability.openDate, unit.seasonalAvailability.closeDate)}
                  </p>
                  <p class="text-lg font-bold text-brand-brown">
                    {formatPriceRange(unit.priceRange.min, unit.priceRange.max, unit.priceRange.unit)}
                  </p>
                </div>

                <!-- CTA -->
                {unit.reservationRequired && (
                  <a
                    href={`https://reservations.wvstateparks.com/${parkName.toLowerCase().replace(/\s+/g, '-')}`}
                    class="block w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 px-4 rounded-sm text-center transition-colors"
                    aria-label={`Reserve ${unit.name}`}
                  >
                    Reserve Now
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    )}

    <!-- Campgrounds Section -->
    {campgrounds && campgrounds.length > 0 && (
      <div class="mb-16">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
          Campgrounds
        </h3>

        {campgrounds.map((campground) => (
          <article class="bg-white rounded-sm border-2 border-brand-brown p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <h4 class="font-display text-2xl font-bold text-brand-brown">
                {campground.name}
              </h4>
              {campground.adaAccessible && (
                <span
                  class="text-sign-green text-sm font-semibold"
                  aria-label="ADA Accessible sites available"
                >
                  ♿ ADA Sites
                </span>
              )}
            </div>

            <!-- Site Types Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {campground.siteTypes.tent && (
                <div class="text-center p-4 bg-sign-green/10 rounded-sm">
                  <p class="text-3xl font-black text-sign-green">{campground.siteTypes.tent}</p>
                  <p class="text-sm font-semibold text-brand-brown mt-1">Tent Sites</p>
                </div>
              )}
              {campground.siteTypes.rv && (
                <div class="text-center p-4 bg-sign-green/10 rounded-sm">
                  <p class="text-3xl font-black text-sign-green">{campground.siteTypes.rv}</p>
                  <p class="text-sm font-semibold text-brand-brown mt-1">RV Sites</p>
                </div>
              )}
              {campground.siteTypes.electric && (
                <div class="text-center p-4 bg-sign-green/10 rounded-sm">
                  <p class="text-3xl font-black text-sign-green">{campground.siteTypes.electric}</p>
                  <p class="text-sm font-semibold text-brand-brown mt-1">Electric</p>
                </div>
              )}
              {campground.siteTypes.waterElectric && (
                <div class="text-center p-4 bg-sign-green/10 rounded-sm">
                  <p class="text-3xl font-black text-sign-green">{campground.siteTypes.waterElectric}</p>
                  <p class="text-sm font-semibold text-brand-brown mt-1">Water/Electric</p>
                </div>
              )}
            </div>

            <!-- Amenities -->
            <div class="mb-6">
              <p class="text-sm font-semibold text-brand-brown/60 mb-3">CAMPGROUND AMENITIES</p>
              <div class="flex flex-wrap gap-3">
                {campground.amenities.map((amenity) => (
                  <span class="text-sm bg-brand-cream text-brand-brown px-3 py-1 rounded-sm border border-brand-brown/20">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <!-- Rates & Reservation Info -->
            <div class="border-t border-brand-brown/20 pt-4 grid md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm font-semibold text-brand-brown/60 mb-1">DAILY RATE (Resident)</p>
                <p class="text-xl font-bold text-brand-brown">${campground.dailyRate.resident}</p>
              </div>
              <div>
                <p class="text-sm font-semibold text-brand-brown/60 mb-1">DAILY RATE (Non-Resident)</p>
                <p class="text-xl font-bold text-brand-brown">${campground.dailyRate.nonResident}</p>
              </div>
              <div>
                <p class="text-sm font-semibold text-brand-brown/60 mb-1">RESERVATION WINDOW</p>
                <p class="text-xl font-bold text-brand-brown">{campground.reservationWindow} days</p>
              </div>
            </div>

            <!-- Season -->
            <p class="text-sm text-brand-brown/80 mt-4">
              <strong>Season:</strong> {formatSeason(campground.seasonalAvailability.openDate, campground.seasonalAvailability.closeDate)}
            </p>
          </article>
        ))}
      </div>
    )}

    <!-- Amenities Section -->
    {amenities && amenities.length > 0 && (
      <div>
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
          Additional Amenities
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <div class="bg-white rounded-sm border border-brand-brown/20 p-5">
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-display text-lg font-bold text-brand-brown">
                  {amenity.name}
                </h4>
                <div class="flex gap-2">
                  {amenity.adaAccessible && (
                    <span
                      class="text-sign-green text-xs"
                      aria-label="ADA Accessible"
                    >
                      ♿
                    </span>
                  )}
                  {amenity.reservable && (
                    <span class="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-sm">
                      Reservable
                    </span>
                  )}
                </div>
              </div>

              <p class="text-sm text-brand-brown/80 mb-3 font-body">
                {amenity.description}
              </p>

              {amenity.feeRequired && (
                <p class="text-xs text-brand-brown/60">
                  Fee required
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

<style>
  /* Morning Mist Lift Animation */
  @keyframes mist-lift {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  article {
    animation: mist-lift 0.6s ease-out forwards;
  }

  article:nth-child(2) { animation-delay: 0.1s; }
  article:nth-child(3) { animation-delay: 0.2s; }
  article:nth-child(4) { animation-delay: 0.3s; }

  @media (prefers-reduced-motion: reduce) {
    article {
      animation: none;
    }
  }
</style>
```

#### 4.1.3 Accessibility Features

- **Semantic HTML:** `<section>`, `<article>`, `role="list"`, `role="listitem"`
- **ARIA Labels:** Descriptive labels for reservation CTAs and accessibility icons
- **Keyboard Navigation:** All interactive elements focusable
- **Screen Reader Support:** Alternative text for images, icon labels
- **Color Contrast:** WCAG AA compliant (4.5:1 minimum)
- **Reduced Motion:** Respects `prefers-reduced-motion` media query

#### 4.1.4 Styling Guidelines

- **Background:** `bg-brand-cream` (section), `bg-white` (cards)
- **Borders:** `border-2 border-brand-brown` (cards), `border-l-4 border-l-sign-green` (headings)
- **Typography:** `font-display` for headings, `font-body` for descriptions
- **CTAs:** `bg-brand-orange` (primary action), limited to <5% of screen
- **Spacing:** `py-16` (section), `p-6` (card padding), `gap-8` (grid)
- **Rounded Corners:** `rounded-sm` ONLY (hardware store aesthetic)

---

### 4.2 ActivitiesSection.astro

**Purpose:** Display ranger-led programs, educational workshops, and seasonal activities with registration information.

#### 4.2.1 Props Interface

```typescript
// schemas/state-park.ts
export const ProgramSchema = z.object({
  name: z.string(),
  type: z.enum(['ranger-led', 'workshop', 'junior-ranger', 'special-event']),
  description: z.string(),
  duration: z.string(), // "2 hours", "Half-day"
  schedule: z.object({
    frequency: z.enum(['daily', 'weekly', 'seasonal', 'one-time']),
    days: z.array(z.enum(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])).optional(),
    times: z.array(z.string()).optional(), // ["10:00 AM", "2:00 PM"]
  }),
  seasonalAvailability: z.object({
    season: z.enum(['spring', 'summer', 'fall', 'winter', 'year-round']),
    dates: z.string().optional(), // "Memorial Day - Labor Day"
  }),
  registrationRequired: z.boolean(),
  capacity: z.number().optional(),
  ageRequirement: z.string().optional(), // "Ages 6-12", "All ages"
  fee: z.number().optional(),
  meetingLocation: z.string(),
});

export const ActivitiesSectionSchema = z.object({
  programs: z.array(ProgramSchema),
  juniorRangerProgram: z.object({
    available: z.boolean(),
    description: z.string().optional(),
    badgeImageUrl: z.string().url().optional(),
  }).optional(),
});

export type ActivitiesSectionProps = z.infer<typeof ActivitiesSectionSchema>;
```

#### 4.2.2 Component Structure (Pseudo-code)

```astro
---
// ActivitiesSection.astro
import { ActivitiesSectionSchema, type ActivitiesSectionProps } from '@/schemas/state-park';

interface Props extends ActivitiesSectionProps {
  parkName: string;
}

const { programs, juniorRangerProgram, parkName } = Astro.props;

ActivitiesSectionSchema.parse({ programs, juniorRangerProgram });

// Group programs by type
const groupedPrograms = programs.reduce((acc, program) => {
  if (!acc[program.type]) acc[program.type] = [];
  acc[program.type].push(program);
  return acc;
}, {} as Record<string, typeof programs>);

// Helper: Format schedule
const formatSchedule = (schedule: any) => {
  if (schedule.frequency === 'daily') return 'Daily';
  if (schedule.frequency === 'weekly' && schedule.days) {
    return schedule.days.join(', ');
  }
  return schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1);
};

// Icon mapping
const typeIcons = {
  'ranger-led': '🎒',
  'workshop': '🛠️',
  'junior-ranger': '⭐',
  'special-event': '🎉',
};
---

<section
  class="py-16 bg-white"
  aria-labelledby="activities-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="activities-heading"
      class="font-display text-4xl md:text-5xl font-black text-brand-brown mb-12"
    >
      Programs & Activities
    </h2>

    <!-- Junior Ranger Highlight -->
    {juniorRangerProgram?.available && (
      <div class="bg-gradient-to-r from-brand-orange/10 to-sign-green/10 rounded-sm border-2 border-brand-orange p-8 mb-12">
        <div class="flex items-center gap-6">
          {juniorRangerProgram.badgeImageUrl && (
            <img
              src={juniorRangerProgram.badgeImageUrl}
              alt="Junior Ranger Badge"
              class="w-24 h-24 object-contain"
            />
          )}
          <div>
            <h3 class="font-display text-2xl font-bold text-brand-brown mb-2">
              ⭐ Junior Ranger Program
            </h3>
            <p class="text-brand-brown/80 font-body mb-4">
              {juniorRangerProgram.description || 'Complete activities and earn your official Junior Ranger badge!'}
            </p>
            <a
              href="#contact"
              class="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-2 px-6 rounded-sm transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    )}

    <!-- Programs Grid -->
    {Object.entries(groupedPrograms).map(([type, programList]) => (
      <div class="mb-12">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
          {typeIcons[type as keyof typeof typeIcons]} {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Programs
        </h3>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label={`${type} programs`}
        >
          {programList.map((program) => (
            <article
              class="bg-brand-cream rounded-sm border border-brand-brown/20 p-6 hover:border-sign-green hover:shadow-md transition-all"
              role="listitem"
            >
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-display text-lg font-bold text-brand-brown">
                  {program.name}
                </h4>
                {program.registrationRequired && (
                  <span class="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-sm font-semibold">
                    Registration
                  </span>
                )}
              </div>

              <p class="text-sm text-brand-brown/80 mb-4 font-body">
                {program.description}
              </p>

              <!-- Program Details -->
              <dl class="space-y-2 text-sm text-brand-brown mb-4">
                <div class="flex justify-between">
                  <dt class="font-semibold">Duration:</dt>
                  <dd>{program.duration}</dd>
                </div>

                <div class="flex justify-between">
                  <dt class="font-semibold">Schedule:</dt>
                  <dd>{formatSchedule(program.schedule)}</dd>
                </div>

                {program.schedule.times && program.schedule.times.length > 0 && (
                  <div class="flex justify-between">
                    <dt class="font-semibold">Times:</dt>
                    <dd>{program.schedule.times.join(', ')}</dd>
                  </div>
                )}

                {program.ageRequirement && (
                  <div class="flex justify-between">
                    <dt class="font-semibold">Ages:</dt>
                    <dd>{program.ageRequirement}</dd>
                  </div>
                )}

                {program.fee !== undefined && (
                  <div class="flex justify-between">
                    <dt class="font-semibold">Fee:</dt>
                    <dd class="font-bold text-sign-green">
                      {program.fee === 0 ? 'FREE' : `$${program.fee}`}
                    </dd>
                  </div>
                )}

                {program.capacity && (
                  <div class="flex justify-between">
                    <dt class="font-semibold">Capacity:</dt>
                    <dd>{program.capacity} participants</dd>
                  </div>
                )}
              </dl>

              <!-- Season Badge -->
              <div class="mb-4">
                <span class="inline-block text-xs bg-sign-green/10 text-sign-green px-3 py-1 rounded-sm">
                  {program.seasonalAvailability.season.charAt(0).toUpperCase() + program.seasonalAvailability.season.slice(1)}
                  {program.seasonalAvailability.dates && ` (${program.seasonalAvailability.dates})`}
                </span>
              </div>

              <!-- Meeting Location -->
              <p class="text-xs text-brand-brown/60 border-t border-brand-brown/10 pt-3">
                <strong>Meeting Point:</strong> {program.meetingLocation}
              </p>
            </article>
          ))}
        </div>
      </div>
    ))}

    <!-- Contact for Programs -->
    <div class="mt-12 text-center bg-sign-green/10 rounded-sm p-8 border-l-4 border-l-sign-green">
      <p class="font-display text-xl font-bold text-brand-brown mb-3">
        Questions About Our Programs?
      </p>
      <p class="text-brand-brown/80 mb-4 font-body">
        Contact the park visitor center for program schedules, registration, and availability.
      </p>
      <a
        href="#contact"
        class="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 px-8 rounded-sm transition-colors"
      >
        Contact Visitor Center
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes mist-lift {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  article {
    animation: mist-lift 0.6s ease-out forwards;
  }

  article:nth-child(2) { animation-delay: 0.1s; }
  article:nth-child(3) { animation-delay: 0.2s; }

  @media (prefers-reduced-motion: reduce) {
    article {
      animation: none;
    }
  }
</style>
```

#### 4.2.3 Accessibility Features

- **Semantic Lists:** `role="list"` and `role="listitem"` for screen readers
- **Description Lists:** `<dl>`, `<dt>`, `<dd>` for program details
- **Focus Management:** Keyboard navigation for all interactive elements
- **ARIA Labels:** Descriptive labels for program types and registration status
- **High Contrast:** Junior Ranger section uses dual-color border for visibility

---

### 4.3 AccessibilitySection.astro

**Purpose:** Display ADA compliance features, Trail Access Information (TAI), assistive services, and equipment rental with WCAG 2.1 Level AA compliance.

#### 4.3.1 Props Interface

```typescript
// schemas/state-park.ts
export const ADAFeatureSchema = z.object({
  name: z.string(),
  category: z.enum(['parking', 'restrooms', 'trails', 'facilities', 'services', 'communication']),
  description: z.string(),
  locations: z.array(z.string()), // ["Main Visitor Center", "Campground A"]
});

export const TrailAccessInfoSchema = z.object({
  trailName: z.string(),
  surfaceType: z.enum(['paved', 'crushed-stone', 'boardwalk', 'natural', 'mixed']),
  width: z.string(), // "36 inches minimum"
  grade: z.object({
    average: z.string(), // "5%"
    maximum: z.string(), // "8%"
  }),
  crossSlope: z.string(), // "2% maximum"
  obstacles: z.array(z.string()), // ["tree roots at 0.3 miles", "water crossing at 1.2 miles"]
  restAreas: z.number(), // Number of accessible rest areas
  length: z.number(), // miles
  accessibilityRating: z.enum(['easy', 'moderate', 'difficult']),
});

export const AssistiveServiceSchema = z.object({
  name: z.string(),
  type: z.enum(['equipment-rental', 'assistance-service', 'accommodation']),
  description: z.string(),
  availability: z.string(), // "Available at Visitor Center during operating hours"
  reservationRequired: z.boolean(),
  fee: z.number().optional(),
});

export const AccessibilitySectionSchema = z.object({
  adaFeatures: z.array(ADAFeatureSchema),
  trailAccessInfo: z.array(TrailAccessInfoSchema).optional(),
  assistiveServices: z.array(AssistiveServiceSchema).optional(),
  serviceAnimalPolicy: z.string(),
  accessibilityContact: z.object({
    name: z.string().optional(),
    phone: z.string(),
    email: z.string().email().optional(),
  }),
});

export type AccessibilitySectionProps = z.infer<typeof AccessibilitySectionSchema>;
```

#### 4.3.2 Component Structure (Pseudo-code)

```astro
---
// AccessibilitySection.astro
import { AccessibilitySectionSchema, type AccessibilitySectionProps } from '@/schemas/state-park';

interface Props extends AccessibilitySectionProps {}

const {
  adaFeatures,
  trailAccessInfo,
  assistiveServices,
  serviceAnimalPolicy,
  accessibilityContact
} = Astro.props;

AccessibilitySectionSchema.parse(Astro.props);

// Group ADA features by category
const groupedFeatures = adaFeatures.reduce((acc, feature) => {
  if (!acc[feature.category]) acc[feature.category] = [];
  acc[feature.category].push(feature);
  return acc;
}, {} as Record<string, typeof adaFeatures>);

// Category icons and labels
const categoryInfo = {
  parking: { icon: '🅿️', label: 'Accessible Parking' },
  restrooms: { icon: '🚻', label: 'Accessible Restrooms' },
  trails: { icon: '🥾', label: 'Accessible Trails' },
  facilities: { icon: '🏛️', label: 'Accessible Facilities' },
  services: { icon: '🤝', label: 'Accessibility Services' },
  communication: { icon: '💬', label: 'Communication Access' },
};

// Helper: Surface type display
const surfaceTypeLabels = {
  'paved': 'Paved (Hardest surface)',
  'crushed-stone': 'Crushed Stone (Firm surface)',
  'boardwalk': 'Boardwalk (Elevated surface)',
  'natural': 'Natural Surface (Variable conditions)',
  'mixed': 'Mixed Surfaces (Varies by section)',
};
---

<section
  class="py-16 bg-white"
  aria-labelledby="accessibility-heading"
>
  <div class="container mx-auto px-4">
    <!-- High-visibility heading (orange border for accessibility section) -->
    <h2
      id="accessibility-heading"
      class="font-display text-4xl md:text-5xl font-black text-brand-brown mb-4 border-l-4 border-l-brand-orange pl-4"
    >
      ♿ Accessibility Information
    </h2>

    <p class="text-lg text-brand-brown/80 mb-12 font-body max-w-3xl">
      {parkName} is committed to providing accessible outdoor experiences for all visitors.
      Below you'll find detailed information about ADA-compliant facilities, trail access data,
      and assistive services available.
    </p>

    <!-- ADA Features Grid -->
    <div class="mb-16">
      <h3 class="font-display text-3xl font-bold text-brand-brown mb-8">
        ADA-Compliant Features
      </h3>

      {Object.entries(groupedFeatures).map(([category, features]) => (
        <div class="mb-8">
          <h4 class="font-display text-2xl font-bold text-brand-brown mb-4 flex items-center gap-3">
            <span class="text-3xl" aria-hidden="true">
              {categoryInfo[category as keyof typeof categoryInfo].icon}
            </span>
            {categoryInfo[category as keyof typeof categoryInfo].label}
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div class="bg-brand-cream rounded-sm border-l-4 border-l-brand-orange p-5">
                <h5 class="font-display text-lg font-bold text-brand-brown mb-2">
                  {feature.name}
                </h5>
                <p class="text-sm text-brand-brown/80 mb-3 font-body">
                  {feature.description}
                </p>
                <div>
                  <p class="text-xs font-semibold text-brand-brown/60 mb-1">LOCATIONS:</p>
                  <ul class="text-sm text-brand-brown space-y-1">
                    {feature.locations.map((location) => (
                      <li class="flex items-start gap-2">
                        <span class="text-sign-green mt-1">•</span>
                        <span>{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <!-- Trail Access Information (TAI) -->
    {trailAccessInfo && trailAccessInfo.length > 0 && (
      <div class="mb-16">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-4">
          Trail Access Information (TAI)
        </h3>
        <p class="text-sm text-brand-brown/70 mb-8 font-body italic">
          Detailed trail data to help you plan your visit based on your mobility needs.
        </p>

        <div class="space-y-6">
          {trailAccessInfo.map((trail) => (
            <article class="bg-white rounded-sm border-2 border-brand-brown p-6">
              <div class="flex items-start justify-between mb-4">
                <h4 class="font-display text-xl font-bold text-brand-brown">
                  {trail.trailName}
                </h4>
                <span
                  class={`
                    px-3 py-1 rounded-sm text-sm font-bold
                    ${trail.accessibilityRating === 'easy' ? 'bg-sign-green/20 text-sign-green' : ''}
                    ${trail.accessibilityRating === 'moderate' ? 'bg-yellow-500/20 text-yellow-700' : ''}
                    ${trail.accessibilityRating === 'difficult' ? 'bg-red-600/20 text-red-700' : ''}
                  `}
                >
                  {trail.accessibilityRating.charAt(0).toUpperCase() + trail.accessibilityRating.slice(1)}
                </span>
              </div>

              <!-- Trail Specifications Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p class="text-xs font-semibold text-brand-brown/60 mb-1">LENGTH</p>
                  <p class="text-lg font-bold text-brand-brown">{trail.length} mi</p>
                </div>
                <div>
                  <p class="text-xs font-semibold text-brand-brown/60 mb-1">SURFACE</p>
                  <p class="text-sm font-bold text-brand-brown">{surfaceTypeLabels[trail.surfaceType]}</p>
                </div>
                <div>
                  <p class="text-xs font-semibold text-brand-brown/60 mb-1">WIDTH</p>
                  <p class="text-sm font-bold text-brand-brown">{trail.width}</p>
                </div>
                <div>
                  <p class="text-xs font-semibold text-brand-brown/60 mb-1">REST AREAS</p>
                  <p class="text-lg font-bold text-brand-brown">{trail.restAreas}</p>
                </div>
              </div>

              <!-- Grade Information -->
              <div class="bg-brand-cream rounded-sm p-4 mb-4">
                <p class="text-sm font-semibold text-brand-brown mb-2">GRADE INFORMATION</p>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-semibold text-brand-brown/70">Average Grade:</span>
                    <span class="ml-2 font-bold text-brand-brown">{trail.grade.average}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-brand-brown/70">Maximum Grade:</span>
                    <span class="ml-2 font-bold text-brand-brown">{trail.grade.maximum}</span>
                  </div>
                </div>
                <div class="mt-2">
                  <span class="font-semibold text-brand-brown/70 text-sm">Cross Slope:</span>
                  <span class="ml-2 font-bold text-brand-brown text-sm">{trail.crossSlope}</span>
                </div>
              </div>

              <!-- Obstacles -->
              {trail.obstacles.length > 0 && (
                <div>
                  <p class="text-sm font-semibold text-brand-brown/60 mb-2">⚠️ OBSTACLES & CHALLENGES</p>
                  <ul class="space-y-1 text-sm text-brand-brown">
                    {trail.obstacles.map((obstacle) => (
                      <li class="flex items-start gap-2">
                        <span class="text-brand-orange mt-1">•</span>
                        <span>{obstacle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    )}

    <!-- Assistive Services -->
    {assistiveServices && assistiveServices.length > 0 && (
      <div class="mb-16">
        <h3 class="font-display text-3xl font-bold text-brand-brown mb-6">
          Assistive Services & Equipment
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistiveServices.map((service) => (
            <div class="bg-brand-cream rounded-sm border border-brand-brown/20 p-5">
              <div class="flex items-start justify-between mb-3">
                <h4 class="font-display text-lg font-bold text-brand-brown">
                  {service.name}
                </h4>
                {service.fee !== undefined && (
                  <span class="text-sm font-bold text-sign-green">
                    {service.fee === 0 ? 'FREE' : `$${service.fee}`}
                  </span>
                )}
              </div>

              <p class="text-sm text-brand-brown/80 mb-3 font-body">
                {service.description}
              </p>

              <p class="text-xs text-brand-brown/60 mb-2">
                {service.availability}
              </p>

              {service.reservationRequired && (
                <span class="inline-block text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-sm font-semibold">
                  Advance Reservation Required
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    <!-- Service Animal Policy -->
    <div class="mb-12 bg-sign-green/10 rounded-sm border-l-4 border-l-sign-green p-6">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-3 flex items-center gap-3">
        <span class="text-3xl" aria-hidden="true">🐕‍🦺</span>
        Service Animal Policy
      </h3>
      <p class="text-brand-brown/80 font-body">
        {serviceAnimalPolicy}
      </p>
    </div>

    <!-- Accessibility Contact -->
    <div class="bg-brand-orange/10 rounded-sm border-2 border-brand-orange p-8 text-center">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-3">
        Need Accessibility Assistance?
      </h3>
      <p class="text-brand-brown/80 mb-6 font-body">
        Our team is here to help ensure you have a great visit. Contact us for personalized assistance.
      </p>

      <div class="space-y-3">
        {accessibilityContact.name && (
          <p class="font-semibold text-brand-brown">
            {accessibilityContact.name}
          </p>
        )}
        <p class="text-xl font-bold text-brand-brown">
          <a href={`tel:${accessibilityContact.phone}`} class="hover:text-brand-orange transition-colors">
            {accessibilityContact.phone}
          </a>
        </p>
        {accessibilityContact.email && (
          <p>
            <a
              href={`mailto:${accessibilityContact.email}`}
              class="text-sign-green hover:text-sign-green/80 underline transition-colors"
            >
              {accessibilityContact.email}
            </a>
          </p>
        )}
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes mist-lift {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  article, .bg-brand-cream {
    animation: mist-lift 0.6s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    article, .bg-brand-cream {
      animation: none;
    }
  }
</style>
```

#### 4.3.3 Accessibility Features (Meta-Accessibility)

This component is itself a model of accessibility best practices:

- **WCAG 2.1 Level AA Compliance:** All color contrasts meet 4.5:1 minimum
- **High-Visibility Design:** Orange border (brand-orange) for section heading increases visibility
- **Semantic HTML:** Proper heading hierarchy (h2 → h3 → h4 → h5)
- **Screen Reader Optimization:** Icon emojis marked `aria-hidden="true"`, text labels provided
- **Keyboard Navigation:** All interactive elements (phone, email) keyboard accessible
- **Plain Language:** Descriptions use clear, jargon-free language
- **Trail Access Information (TAI):** Follows U.S. Forest Service TAI standards
- **Reduced Motion:** Respects user motion preferences

---

### 4.4 ReservationSection.astro

**Purpose:** Display fee structures, booking windows, cancellation policies, and primary reservation CTAs.

#### 4.4.1 Props Interface

```typescript
// schemas/state-park.ts
export const FeeStructureSchema = z.object({
  category: z.string(), // "Day Use", "Camping", "Lodging"
  items: z.array(z.object({
    name: z.string(),
    residentFee: z.number().optional(),
    nonResidentFee: z.number().optional(),
    flatFee: z.number().optional(), // For items without resident/non-resident split
    unit: z.enum(['per vehicle', 'per person', 'per night', 'per week', 'per season']),
    notes: z.string().optional(),
  })),
});

export const BookingWindowSchema = z.object({
  lodging: z.number(), // days in advance (e.g., 365)
  camping: z.number(), // days in advance (e.g., 90)
  picnicShelters: z.number().optional(),
});

export const CancellationPolicySchema = z.object({
  lodging: z.string(), // Full policy text
  camping: z.string(),
  general: z.string(), // Applies to other reservable items
});

export const ReservationSectionSchema = z.object({
  feeStructure: z.array(FeeStructureSchema),
  bookingWindow: BookingWindowSchema,
  cancellationPolicy: CancellationPolicySchema,
  reservationPhone: z.string(), // "1-833-WV-PARKS"
  reservationUrl: z.string().url(),
  acceptedPaymentMethods: z.array(z.string()), // ["Credit Card", "Debit Card", "West Virginia State Parks Gift Card"]
});

export type ReservationSectionProps = z.infer<typeof ReservationSectionSchema>;
```

#### 4.4.2 Component Structure (Pseudo-code)

```astro
---
// ReservationSection.astro
import { ReservationSectionSchema, type ReservationSectionProps } from '@/schemas/state-park';

interface Props extends ReservationSectionProps {
  parkName: string;
}

const {
  feeStructure,
  bookingWindow,
  cancellationPolicy,
  reservationPhone,
  reservationUrl,
  acceptedPaymentMethods,
  parkName
} = Astro.props;

ReservationSectionSchema.parse(Astro.props);
---

<section
  class="py-16 bg-brand-cream"
  aria-labelledby="reservations-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="reservations-heading"
      class="font-display text-4xl md:text-5xl font-black text-brand-brown mb-12"
    >
      Reservations & Fees
    </h2>

    <!-- Primary CTA (Above the fold) -->
    <div class="bg-brand-orange rounded-sm p-8 mb-12 text-center text-white">
      <h3 class="font-display text-3xl font-black mb-4">
        Reserve Your Adventure Today
      </h3>
      <p class="text-lg mb-6 font-body">
        Book cabins, campsites, and picnic shelters online or by phone.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href={`tel:${reservationPhone.replace(/\D/g, '')}`}
          class="bg-white hover:bg-brand-cream text-brand-orange font-black py-4 px-8 rounded-sm text-xl transition-colors"
          aria-label={`Call reservations at ${reservationPhone}`}
        >
          📞 {reservationPhone}
        </a>
        <span class="text-white font-bold">or</span>
        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="bg-brand-brown hover:bg-brand-brown/90 text-white font-bold py-4 px-8 rounded-sm text-lg transition-colors"
        >
          Book Online →
        </a>
      </div>
    </div>

    <!-- Fee Structure -->
    <div class="mb-12">
      <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
        Fee Structure
      </h3>

      {feeStructure.map((category) => (
        <div class="mb-8">
          <h4 class="font-display text-2xl font-bold text-brand-brown mb-4">
            {category.category}
          </h4>

          <div class="bg-white rounded-sm border-2 border-brand-brown overflow-hidden">
            <table class="w-full">
              <thead class="bg-sign-green/20">
                <tr>
                  <th class="text-left p-4 font-display text-brand-brown font-bold">Item</th>
                  <th class="text-right p-4 font-display text-brand-brown font-bold">WV Resident</th>
                  <th class="text-right p-4 font-display text-brand-brown font-bold">Non-Resident</th>
                  <th class="text-right p-4 font-display text-brand-brown font-bold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, index) => (
                  <tr class={index % 2 === 0 ? 'bg-white' : 'bg-brand-cream/50'}>
                    <td class="p-4 font-semibold text-brand-brown">
                      {item.name}
                      {item.notes && (
                        <span class="block text-xs text-brand-brown/60 mt-1 font-normal">
                          {item.notes}
                        </span>
                      )}
                    </td>
                    <td class="p-4 text-right text-brand-brown">
                      {item.residentFee !== undefined ? `$${item.residentFee}` :
                       item.flatFee !== undefined ? `$${item.flatFee}` : '—'}
                    </td>
                    <td class="p-4 text-right text-brand-brown">
                      {item.nonResidentFee !== undefined ? `$${item.nonResidentFee}` :
                       item.flatFee !== undefined ? `$${item.flatFee}` : '—'}
                    </td>
                    <td class="p-4 text-right text-sm text-brand-brown/70">
                      {item.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>

    <!-- Booking Windows -->
    <div class="mb-12">
      <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
        Booking Windows
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-sm border border-brand-brown/20 p-6 text-center">
          <div class="text-5xl font-black text-sign-green mb-3">
            {bookingWindow.lodging}
          </div>
          <p class="text-sm text-brand-brown/60 mb-2">DAYS IN ADVANCE</p>
          <p class="font-display text-xl font-bold text-brand-brown">
            Lodging
          </p>
          <p class="text-sm text-brand-brown/70 mt-2 font-body">
            Cabins, lodges, cottages
          </p>
        </div>

        <div class="bg-white rounded-sm border border-brand-brown/20 p-6 text-center">
          <div class="text-5xl font-black text-sign-green mb-3">
            {bookingWindow.camping}
          </div>
          <p class="text-sm text-brand-brown/60 mb-2">DAYS IN ADVANCE</p>
          <p class="font-display text-xl font-bold text-brand-brown">
            Camping
          </p>
          <p class="text-sm text-brand-brown/70 mt-2 font-body">
            All campsite types
          </p>
        </div>

        {bookingWindow.picnicShelters && (
          <div class="bg-white rounded-sm border border-brand-brown/20 p-6 text-center">
            <div class="text-5xl font-black text-sign-green mb-3">
              {bookingWindow.picnicShelters}
            </div>
            <p class="text-sm text-brand-brown/60 mb-2">DAYS IN ADVANCE</p>
            <p class="font-display text-xl font-bold text-brand-brown">
              Picnic Shelters
            </p>
            <p class="text-sm text-brand-brown/70 mt-2 font-body">
              Group reservations
            </p>
          </div>
        )}
      </div>
    </div>

    <!-- Cancellation Policy -->
    <div class="mb-12">
      <h3 class="font-display text-3xl font-bold text-brand-brown mb-6 border-l-4 border-l-sign-green pl-4">
        Cancellation Policy
      </h3>

      <div class="space-y-4">
        <div class="bg-white rounded-sm border border-brand-brown/20 p-6">
          <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
            Lodging Cancellations
          </h4>
          <p class="text-sm text-brand-brown/80 font-body">
            {cancellationPolicy.lodging}
          </p>
        </div>

        <div class="bg-white rounded-sm border border-brand-brown/20 p-6">
          <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
            Camping Cancellations
          </h4>
          <p class="text-sm text-brand-brown/80 font-body">
            {cancellationPolicy.camping}
          </p>
        </div>

        <div class="bg-white rounded-sm border border-brand-brown/20 p-6">
          <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
            General Policy
          </h4>
          <p class="text-sm text-brand-brown/80 font-body">
            {cancellationPolicy.general}
          </p>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="bg-sign-green/10 rounded-sm border-l-4 border-l-sign-green p-6">
      <h3 class="font-display text-xl font-bold text-brand-brown mb-3">
        Accepted Payment Methods
      </h3>
      <div class="flex flex-wrap gap-3">
        {acceptedPaymentMethods.map((method) => (
          <span class="bg-white text-brand-brown px-4 py-2 rounded-sm border border-brand-brown/20 text-sm font-semibold">
            {method}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>

<style>
  table {
    border-collapse: collapse;
  }

  @keyframes mist-lift {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bg-white, .bg-brand-cream {
    animation: mist-lift 0.6s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .bg-white, .bg-brand-cream {
      animation: none;
    }
  }
</style>
```

#### 4.4.3 Accessibility Features

- **Semantic Tables:** `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` for fee structure
- **ARIA Labels:** Descriptive labels for phone and URL links
- **High Contrast CTA:** Orange background with white text (WCAG AAA compliant)
- **Focus States:** Clear focus indicators for all interactive elements
- **Mobile Responsive:** Stacked layout on mobile, grid on desktop

---

### 4.5 ParkOverviewSection.astro

**Purpose:** Display operating hours, day-use fees, contact information, managing agency, and park alerts.

#### 4.5.1 Props Interface

```typescript
// schemas/state-park.ts
export const OperatingHoursSchema = z.object({
  season: z.enum(['year-round', 'seasonal']),
  schedule: z.array(z.object({
    period: z.string(), // "Memorial Day - Labor Day", "September - May"
    days: z.string(), // "Daily", "Monday - Friday"
    hours: z.string(), // "8:00 AM - 8:00 PM", "Dawn to Dusk"
  })),
});

export const ContactInfoSchema = z.object({
  visitorCenter: z.object({
    phone: z.string(),
    email: z.string().email().optional(),
    address: z.string(),
  }),
  emergencyContact: z.string().optional(), // For after-hours emergencies
});

export const ManagingAgencySchema = z.object({
  name: z.string(), // "West Virginia Division of Natural Resources"
  website: z.string().url(),
  logo: z.string().url().optional(),
});

export const ParkAlertSchema = z.object({
  type: z.enum(['closure', 'warning', 'info']),
  title: z.string(),
  message: z.string(),
  effectiveDate: z.string(), // ISO 8601 date
  expirationDate: z.string().optional(),
  url: z.string().url().optional(), // Link to full details
});

export const ParkOverviewSectionSchema = z.object({
  operatingHours: OperatingHoursSchema,
  dayUseFee: z.object({
    required: z.boolean(),
    amount: z.number().optional(),
    unit: z.string().optional(), // "per vehicle"
  }),
  contact: ContactInfoSchema,
  managingAgency: ManagingAgencySchema,
  alerts: z.array(ParkAlertSchema).optional(),
});

export type ParkOverviewSectionProps = z.infer<typeof ParkOverviewSectionSchema>;
```

#### 4.5.2 Component Structure (Pseudo-code)

```astro
---
// ParkOverviewSection.astro
import { ParkOverviewSectionSchema, type ParkOverviewSectionProps } from '@/schemas/state-park';

interface Props extends ParkOverviewSectionProps {
  parkName: string;
}

const { operatingHours, dayUseFee, contact, managingAgency, alerts, parkName } = Astro.props;

ParkOverviewSectionSchema.parse(Astro.props);

// Helper: Alert styling
const getAlertClasses = (type: string) => {
  const base = 'rounded-sm border-l-4 p-6 mb-4';
  if (type === 'closure') return `${base} bg-red-50 border-l-red-700 text-red-900`;
  if (type === 'warning') return `${base} bg-yellow-50 border-l-yellow-600 text-yellow-900`;
  return `${base} bg-blue-50 border-l-blue-600 text-blue-900`;
};

const getAlertIcon = (type: string) => {
  if (type === 'closure') return '🚫';
  if (type === 'warning') return '⚠️';
  return 'ℹ️';
};
---

<section
  class="py-16 bg-white"
  aria-labelledby="park-overview-heading"
>
  <div class="container mx-auto px-4">
    <h2
      id="park-overview-heading"
      class="font-display text-4xl md:text-5xl font-black text-brand-brown mb-12"
    >
      Plan Your Visit
    </h2>

    <!-- Park Alerts (if any) -->
    {alerts && alerts.length > 0 && (
      <div class="mb-12" role="alert" aria-live="polite">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-4">
          Current Alerts
        </h3>
        {alerts.map((alert) => (
          <div class={getAlertClasses(alert.type)}>
            <div class="flex items-start gap-3">
              <span class="text-2xl" aria-hidden="true">{getAlertIcon(alert.type)}</span>
              <div class="flex-1">
                <h4 class="font-display text-lg font-bold mb-2">
                  {alert.title}
                </h4>
                <p class="font-body mb-3">
                  {alert.message}
                </p>
                {alert.url && (
                  <a
                    href={alert.url}
                    class="text-sm font-semibold underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Details →
                  </a>
                )}
                {alert.expirationDate && (
                  <p class="text-xs mt-2 opacity-75">
                    Expires: {new Date(alert.expirationDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Operating Hours -->
      <div class="bg-brand-cream rounded-sm border-2 border-brand-brown p-6">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-4 flex items-center gap-3">
          <span class="text-3xl" aria-hidden="true">🕐</span>
          Operating Hours
        </h3>

        <div class="space-y-4">
          {operatingHours.schedule.map((period) => (
            <div>
              <p class="text-sm font-semibold text-brand-brown/60 mb-1">
                {period.period.toUpperCase()}
              </p>
              <p class="font-body text-brand-brown">
                <strong>{period.days}:</strong> {period.hours}
              </p>
            </div>
          ))}
        </div>

        {operatingHours.season === 'seasonal' && (
          <p class="text-xs text-brand-brown/60 mt-4 italic">
            Hours vary by season. Call ahead to confirm.
          </p>
        )}
      </div>

      <!-- Day Use Fee -->
      <div class="bg-brand-cream rounded-sm border-2 border-brand-brown p-6">
        <h3 class="font-display text-2xl font-bold text-brand-brown mb-4 flex items-center gap-3">
          <span class="text-3xl" aria-hidden="true">💵</span>
          Day Use Fee
        </h3>

        {dayUseFee.required ? (
          <div>
            <p class="text-5xl font-black text-sign-green mb-3">
              ${dayUseFee.amount}
            </p>
            <p class="text-brand-brown/80 font-body">
              {dayUseFee.unit}
            </p>
            <p class="text-xs text-brand-brown/60 mt-4">
              Fee collected at park entrance
            </p>
          </div>
        ) : (
          <div>
            <p class="text-3xl font-black text-sign-green mb-3">
              FREE
            </p>
            <p class="text-brand-brown/80 font-body">
              No day use fee required
            </p>
          </div>
        )}
      </div>
    </div>

    <!-- Contact Information -->
    <div class="bg-sign-green/10 rounded-sm border-l-4 border-l-sign-green p-8 mb-8">
      <h3 class="font-display text-2xl font-bold text-brand-brown mb-6">
        Contact Information
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
            Visitor Center
          </h4>
          <dl class="space-y-2 text-brand-brown">
            <div>
              <dt class="text-sm font-semibold text-brand-brown/60">Phone</dt>
              <dd class="text-xl font-bold">
                <a
                  href={`tel:${contact.visitorCenter.phone.replace(/\D/g, '')}`}
                  class="hover:text-brand-orange transition-colors"
                >
                  {contact.visitorCenter.phone}
                </a>
              </dd>
            </div>

            {contact.visitorCenter.email && (
              <div>
                <dt class="text-sm font-semibold text-brand-brown/60">Email</dt>
                <dd class="text-sm">
                  <a
                    href={`mailto:${contact.visitorCenter.email}`}
                    class="text-sign-green hover:text-sign-green/80 underline transition-colors"
                  >
                    {contact.visitorCenter.email}
                  </a>
                </dd>
              </div>
            )}

            <div>
              <dt class="text-sm font-semibold text-brand-brown/60">Address</dt>
              <dd class="text-sm font-body">
                {contact.visitorCenter.address}
              </dd>
            </div>
          </dl>
        </div>

        {contact.emergencyContact && (
          <div>
            <h4 class="font-display text-lg font-bold text-brand-brown mb-3">
              After-Hours Emergency
            </h4>
            <p class="text-xl font-bold text-brand-brown">
              <a
                href={`tel:${contact.emergencyContact.replace(/\D/g, '')}`}
                class="hover:text-brand-orange transition-colors"
              >
                {contact.emergencyContact}
              </a>
            </p>
            <p class="text-xs text-brand-brown/60 mt-2">
              For emergencies outside operating hours
            </p>
          </div>
        )}
      </div>
    </div>

    <!-- Managing Agency -->
    <div class="bg-white rounded-sm border border-brand-brown/20 p-6 flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-brand-brown/60 mb-2">MANAGED BY</p>
        <p class="font-display text-xl font-bold text-brand-brown mb-2">
          {managingAgency.name}
        </p>
        <a
          href={managingAgency.website}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-sign-green hover:text-sign-green/80 underline transition-colors"
        >
          Visit Agency Website →
        </a>
      </div>
      {managingAgency.logo && (
        <img
          src={managingAgency.logo}
          alt={`${managingAgency.name} logo`}
          class="h-16 w-auto object-contain"
        />
      )}
    </div>
  </div>
</section>

<style>
  @keyframes mist-lift {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bg-brand-cream, .bg-sign-green\/10, .bg-white {
    animation: mist-lift 0.6s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .bg-brand-cream, .bg-sign-green\/10, .bg-white {
      animation: none;
    }
  }
</style>
```

#### 4.5.3 Accessibility Features

- **ARIA Live Regions:** Alerts use `role="alert"` and `aria-live="polite"` for screen reader announcements
- **Semantic HTML:** Description lists (`<dl>`, `<dt>`, `<dd>`) for contact info
- **Focus Management:** Phone and email links keyboard accessible
- **Color-Coded Alerts:** Red (closure), Yellow (warning), Blue (info) with sufficient contrast
- **Icon + Text:** Alert icons complemented by text labels (not icon-only)

---

## 5. Main Template Architecture

### 5.1 StateParkTemplate.astro

**Purpose:** Main orchestrator component that assembles all sections into a complete State Park destination page.

#### 5.1.1 Component Structure

```astro
---
// StateParkTemplate.astro
import AdventureHero from '@/components/AdventureHero.astro';
import ParkOverviewSection from '@/components/ParkOverviewSection.astro';
import AdventureQuickStats from '@/components/AdventureQuickStats.astro';
import FacilitiesSection from '@/components/FacilitiesSection.astro';
import ActivitiesSection from '@/components/ActivitiesSection.astro';
import TrailsSection from '@/components/TrailsSection.astro';
import AccessibilitySection from '@/components/AccessibilitySection.astro';
import ScenicOverlooksSection from '@/components/ScenicOverlooksSection.astro';
import ReservationSection from '@/components/ReservationSection.astro';
import AdventureCTA from '@/components/AdventureCTA.astro';
import SchemaStateParkTemplate from '@/components/schema/SchemaStateParkTemplate.astro';
import { StateParkDataSchema, type StateParkData } from '@/schemas/state-park';

interface Props {
  data: StateParkData;
}

const { data } = Astro.props;

// Validate entire data structure
StateParkDataSchema.parse(data);

// Destructure sections
const {
  metadata,
  hero,
  overview,
  stats,
  facilities,
  activities,
  trails,
  accessibility,
  overlooks,
  reservations,
  cta,
} = data;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description}>
  <meta name="keywords" content={metadata.keywords.join(', ')}>

  <!-- Schema.org Structured Data -->
  <SchemaStateParkTemplate data={data} />

  <!-- Open Graph -->
  <meta property="og:title" content={metadata.title}>
  <meta property="og:description" content={metadata.description}>
  <meta property="og:image" content={hero.heroImage}>
  <meta property="og:type" content="website">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@700;900&family=Permanent+Marker&family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
</head>

<body class="font-body text-brand-brown bg-white">
  <!-- Skip to main content link (accessibility) -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
  >
    Skip to main content
  </a>

  <main id="main-content">
    <!-- Section 1: Hero -->
    <AdventureHero
      heroImage={hero.heroImage}
      parkName={hero.parkName}
      tagline={hero.tagline}
    />

    <!-- Section 2: Park Overview (Operating Hours, Fees, Alerts) -->
    <ParkOverviewSection
      parkName={hero.parkName}
      operatingHours={overview.operatingHours}
      dayUseFee={overview.dayUseFee}
      contact={overview.contact}
      managingAgency={overview.managingAgency}
      alerts={overview.alerts}
    />

    <!-- Section 3: Quick Stats -->
    <AdventureQuickStats
      stats={stats}
    />

    <!-- Section 4: Facilities (Lodging, Campgrounds, Amenities) -->
    {facilities && (
      <FacilitiesSection
        parkName={hero.parkName}
        lodging={facilities.lodging}
        campgrounds={facilities.campgrounds}
        amenities={facilities.amenities}
      />
    )}

    <!-- Section 5: Activities & Programs -->
    {activities && (
      <ActivitiesSection
        parkName={hero.parkName}
        programs={activities.programs}
        juniorRangerProgram={activities.juniorRangerProgram}
      />
    )}

    <!-- Section 6: Trails -->
    {trails && trails.length > 0 && (
      <TrailsSection
        trails={trails}
      />
    )}

    <!-- Section 7: Accessibility -->
    <AccessibilitySection
      parkName={hero.parkName}
      adaFeatures={accessibility.adaFeatures}
      trailAccessInfo={accessibility.trailAccessInfo}
      assistiveServices={accessibility.assistiveServices}
      serviceAnimalPolicy={accessibility.serviceAnimalPolicy}
      accessibilityContact={accessibility.accessibilityContact}
    />

    <!-- Section 8: Scenic Overlooks (Optional) -->
    {overlooks && overlooks.length > 0 && (
      <ScenicOverlooksSection
        viewpoints={overlooks}
      />
    )}

    <!-- Section 9: Reservations & Fees -->
    <ReservationSection
      parkName={hero.parkName}
      feeStructure={reservations.feeStructure}
      bookingWindow={reservations.bookingWindow}
      cancellationPolicy={reservations.cancellationPolicy}
      reservationPhone={reservations.reservationPhone}
      reservationUrl={reservations.reservationUrl}
      acceptedPaymentMethods={reservations.acceptedPaymentMethods}
    />

    <!-- Section 10: Final CTA -->
    <AdventureCTA
      ctaText={cta.ctaText}
      phoneNumber={cta.phoneNumber}
      reservationLink={cta.reservationLink}
    />
  </main>

  <!-- Footer (if applicable) -->
  <footer class="bg-brand-brown text-brand-cream py-8">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm">
        &copy; {new Date().getFullYear()} {metadata.managingAgency}. All rights reserved.
      </p>
      <p class="text-xs mt-2 opacity-75">
        Part of the <a href="/" class="underline hover:no-underline">WV Wild Outdoors</a> adventure destination network.
      </p>
    </div>
  </footer>
</body>
</html>

<style is:global>
  :root {
    --font-display: 'Bitter', serif;
    --font-hand: 'Permanent Marker', cursive;
    --font-body: 'Noto Sans', sans-serif;

    --brand-brown: #3E2723;
    --sign-green: #2E7D32;
    --brand-cream: #FFF8E1;
    --brand-orange: #FF6F00;
  }

  body {
    font-family: var(--font-body);
    color: var(--brand-brown);
    background-color: white;
  }

  .font-display {
    font-family: var(--font-display);
  }

  .font-hand {
    font-family: var(--font-hand);
  }

  .font-body {
    font-family: var(--font-body);
  }

  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .focus\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
</style>
```

#### 5.1.2 Section Ordering Rationale

1. **Hero** - Immediate visual impact, park identity
2. **Park Overview** - Critical planning info (hours, fees, alerts) upfront
3. **Quick Stats** - Fast facts for decision-making
4. **Facilities** - Primary booking motivation (where to stay)
5. **Activities** - Secondary booking motivation (what to do)
6. **Trails** - Outdoor recreation details
7. **Accessibility** - Inclusive access information (mid-page for discoverability)
8. **Scenic Overlooks** - Inspirational content (optional)
9. **Reservations** - Final conversion point (fees, booking CTA)
10. **Final CTA** - Last chance conversion

#### 5.1.3 Conditional Rendering Logic

- **Facilities:** Optional (some parks may not have lodging/campgrounds)
- **Activities:** Optional (some parks may not offer programs)
- **Trails:** Optional (some parks may be facility-focused)
- **Overlooks:** Optional (not all parks have designated viewpoints)
- **Accessibility:** REQUIRED (always show, even if minimal data)
- **Reservations:** REQUIRED (even if free entry, show fee structure)

---

## 6. Schema.org Integration

### 6.1 SchemaStateParkTemplate.astro

**Purpose:** Generate government-specific Schema.org structured data for State Parks.

```astro
---
// SchemaStateParkTemplate.astro
import type { StateParkData } from '@/schemas/state-park';

interface Props {
  data: StateParkData;
}

const { data } = Astro.props;

const schema = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": data.hero.parkName,
  "description": data.metadata.description,
  "url": data.metadata.canonicalUrl,
  "image": data.hero.heroImage,

  // Government organization managing the park
  "managedBy": {
    "@type": "GovernmentOrganization",
    "name": data.overview.managingAgency.name,
    "url": data.overview.managingAgency.website,
  },

  // Visitor center contact point
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": data.overview.contact.visitorCenter.phone,
    "email": data.overview.contact.visitorCenter.email,
    "contactType": "Visitor Services",
  },

  // Address
  "address": {
    "@type": "PostalAddress",
    "streetAddress": data.overview.contact.visitorCenter.address,
  },

  // Activities/events (ranger programs)
  "event": data.activities?.programs.map(program => ({
    "@type": "Event",
    "name": program.name,
    "description": program.description,
    "eventSchedule": {
      "@type": "Schedule",
      "repeatFrequency": program.schedule.frequency,
    },
    "offers": program.fee ? {
      "@type": "Offer",
      "price": program.fee,
      "priceCurrency": "USD",
    } : undefined,
  })) || [],

  // Trails (as tourist attractions)
  "touristAttraction": data.trails?.map(trail => ({
    "@type": "TouristAttraction",
    "name": trail.name,
    "description": trail.description,
  })) || [],

  // Alerts (special announcements)
  "specialAnnouncement": data.overview.alerts?.map(alert => ({
    "@type": "SpecialAnnouncement",
    "name": alert.title,
    "text": alert.message,
    "datePosted": alert.effectiveDate,
    "expires": alert.expirationDate,
  })) || [],
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## 7. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Layer                             │
│  - Markdown files with frontmatter                          │
│  - Zod schema validation                                    │
│  - TypeScript type safety                                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 StateParkDataSchema                          │
│  - Validate entire data structure                           │
│  - Parse frontmatter into typed objects                     │
│  - Throw errors on validation failures                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              StateParkTemplate.astro                         │
│  - Orchestrate component rendering                          │
│  - Pass validated props to sections                         │
│  - Handle conditional rendering                             │
└─────────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
    ┌─────────┐      ┌─────────┐      ┌─────────┐
    │  Reused │      │   New   │      │ Schema  │
    │Components│      │Components│      │  .org   │
    └─────────┘      └─────────┘      └─────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            ▼
               ┌────────────────────────┐
               │   Rendered HTML Page   │
               │   - Semantic markup    │
               │   - WVWO styling       │
               │   - Accessible UI      │
               │   - SEO optimized      │
               └────────────────────────┘
```

---

## 8. Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Astro 4.x | Static site generation (SSG) |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS, WVWO brand tokens |
| **Validation** | Zod 3.x | Runtime schema validation |
| **Types** | TypeScript 5.x | Compile-time type safety |
| **SEO** | astro-seo | Meta tags, Open Graph |
| **Schema** | schema-dts | TypeScript types for Schema.org |
| **Fonts** | Google Fonts | Bitter, Permanent Marker, Noto Sans |
| **Icons** | Unicode Emojis | No icon library dependency |

---

## 9. Performance Considerations

### 9.1 Optimization Strategies

1. **Image Optimization:**
   - Use Astro's `<Image>` component for automatic optimization
   - Lazy loading for below-fold images
   - WebP format with JPEG fallback
   - Responsive images with `srcset`

2. **Code Splitting:**
   - Each section as separate component (natural code split)
   - Conditional imports for optional sections

3. **CSS Optimization:**
   - Tailwind purge removes unused styles
   - Critical CSS inlined in `<head>`
   - Non-critical CSS deferred

4. **Font Loading:**
   - `font-display: swap` for FOIT prevention
   - Preconnect to Google Fonts
   - Subset fonts (Latin only)

5. **Animation Performance:**
   - CSS animations (GPU-accelerated)
   - `prefers-reduced-motion` support
   - Transform-based animations (not layout-triggering)

### 9.2 Performance Budget

| Metric | Target | Rationale |
|--------|--------|-----------|
| **First Contentful Paint (FCP)** | < 1.5s | Fast perceived load |
| **Largest Contentful Paint (LCP)** | < 2.5s | Core Web Vital threshold |
| **Total Blocking Time (TBT)** | < 200ms | Responsive interactions |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Visual stability |
| **Total Page Weight** | < 1.5MB | Rural WV internet speeds |
| **JavaScript Bundle** | < 50KB | Minimal client-side JS |

---

## 10. Accessibility Compliance Matrix

| WCAG 2.1 Criterion | Compliance Level | Implementation |
|--------------------|-----------------|----------------|
| **1.1.1 Non-text Content** | AA | Alt text for all images, `aria-label` for icons |
| **1.3.1 Info and Relationships** | AA | Semantic HTML, ARIA roles |
| **1.4.3 Contrast (Minimum)** | AA | 4.5:1 for text, 3:1 for large text |
| **2.1.1 Keyboard** | AA | All interactive elements keyboard accessible |
| **2.4.3 Focus Order** | AA | Logical tab order |
| **2.4.7 Focus Visible** | AA | Clear focus indicators |
| **3.1.1 Language of Page** | AA | `lang="en"` on `<html>` |
| **3.2.3 Consistent Navigation** | AA | Consistent section ordering |
| **4.1.2 Name, Role, Value** | AA | ARIA labels for custom components |

**Trail Access Information (TAI):** Follows U.S. Forest Service TAI standards for objective trail surface data.

---

## 11. File Structure

```
src/
├── components/
│   ├── adventure/                    # Reused from SPEC-17
│   │   ├── AdventureHero.astro
│   │   ├── AdventureQuickStats.astro
│   │   ├── TrailsSection.astro
│   │   ├── ScenicOverlooksSection.astro
│   │   └── AdventureCTA.astro
│   │
│   ├── state-park/                   # New for SPEC-18
│   │   ├── FacilitiesSection.astro
│   │   ├── ActivitiesSection.astro
│   │   ├── AccessibilitySection.astro
│   │   ├── ReservationSection.astro
│   │   └── ParkOverviewSection.astro
│   │
│   └── schema/
│       └── SchemaStateParkTemplate.astro
│
├── layouts/
│   └── StateParkTemplate.astro       # Main template
│
├── schemas/
│   └── state-park.ts                 # Zod schemas
│
├── types/
│   └── state-park.ts                 # TypeScript types
│
└── utils/
    ├── date-formatter.ts
    ├── schema-builder.ts
    └── accessibility-helpers.ts
```

---

## 12. Next Steps (Implementation Phase)

1. **Create Zod schemas** (`schemas/state-park.ts`)
2. **Build 5 new components** (FacilitiesSection, ActivitiesSection, AccessibilitySection, ReservationSection, ParkOverviewSection)
3. **Assemble main template** (StateParkTemplate.astro)
4. **Implement Schema.org integration** (SchemaStateParkTemplate.astro)
5. **Create test data** (sample State Park markdown file)
6. **Run accessibility audit** (axe DevTools, Lighthouse)
7. **Performance testing** (WebPageTest, Lighthouse)
8. **WVWO aesthetic review** (checklist compliance)

---

## 13. Architecture Decision Records (ADRs)

### ADR-001: Multi-Template Hybrid Approach

**Context:** State Parks combine features from Lake, Backcountry, Ski, and Cave templates.

**Decision:** Reuse 5 components from SPEC-17 Backcountry, create 5 new specialized components.

**Rationale:**
- Reduces duplication (DRY principle)
- Maintains consistency across adventure destination types
- Focuses new development on State Park-specific features (facilities, programs, accessibility)

**Consequences:**
- Must maintain backward compatibility with SPEC-17 components
- Changes to shared components affect multiple template types
- Clear separation of concerns between adventure elements (trails, overlooks) and park management (facilities, reservations)

---

### ADR-002: Accessibility Section as First-Class Citizen

**Context:** State Parks serve diverse audiences, including visitors with mobility challenges.

**Decision:** Make AccessibilitySection a REQUIRED component with high visual prominence (orange border).

**Rationale:**
- Government facilities have legal ADA compliance requirements
- Trail Access Information (TAI) provides objective data for trip planning
- Rural WV has aging population with higher accessibility needs
- Sets precedent for inclusive design across all WVWO templates

**Consequences:**
- All State Park data sources must include accessibility information
- Increased content creation effort (TAI data collection)
- Improved user experience for underserved demographic

---

### ADR-003: Orange CTA for Reservation System

**Context:** WVWO brand guidelines restrict orange to <5% of screen (primary CTAs only).

**Decision:** Use `bg-brand-orange` exclusively for reservation CTAs (book now, call buttons).

**Rationale:**
- Reservations are primary business goal for State Parks
- Orange creates visual hierarchy (stand-out CTAs)
- Maintains WVWO aesthetic (not SaaS startup)
- Aligns with "blaze orange" hunting culture (action, safety)

**Consequences:**
- Other CTAs (contact, learn more) use `bg-brand-brown` or `bg-sign-green`
- Design reviews must enforce orange usage limits
- High contrast ensures accessibility (WCAG AAA compliant)

---

## 14. Risk Assessment & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| **Incomplete ADA data** | High | High | Provide template defaults, phased data collection |
| **Schema.org changes** | Low | Medium | Use schema-dts for type safety, monitor updates |
| **Reservation system downtime** | Medium | High | Display phone number prominently, fallback contact |
| **Mobile performance issues** | Medium | High | Performance budget enforcement, mobile-first design |
| **Content freshness (alerts)** | High | Medium | CMS workflow for park staff, expiration dates |

---

## 15. Success Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| **Conversion Rate (Reservations)** | TBD | +15% | Google Analytics goals |
| **Avg. Session Duration** | TBD | +20% | Engagement metric |
| **Accessibility Score (Lighthouse)** | TBD | 95+ | Automated audit |
| **Core Web Vitals Pass Rate** | TBD | 100% | Chrome UX Report |
| **Schema.org Validation** | TBD | 0 errors | Google Rich Results Test |

---

## End of Component Architecture Specification

This document serves as the authoritative reference for SPEC-18 implementation. All code must adhere to these specifications to ensure consistency, accessibility, and WVWO brand compliance.
