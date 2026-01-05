# Multi-Tier Emergency Contact System Architecture

**Document Type**: Architecture Decision Record (ADR) + Technical Specification
**Spec Reference**: SPEC-17 Backcountry Template
**Author**: System Architecture Designer
**Date**: 2025-12-31
**Status**: PROPOSED

---

## Executive Summary

This document defines a comprehensive multi-tier emergency contact system for WV backcountry destinations where:

- Cell service is absent or unreliable
- SAR (Search and Rescue) response times can be 4-8 hours
- County jurisdiction varies by location within a destination
- Satellite communication may be the only viable option
- Self-rescue expectations must be clearly communicated

The current flat array `emergencyContact: { service: string; contact: string }[]` is **insufficient** for backcountry safety requirements.

---

## Table of Contents

1. [Problem Analysis](#problem-analysis)
2. [Architecture Decision](#architecture-decision)
3. [Zod Schemas](#zod-schemas)
4. [TypeScript Types](#typescript-types)
5. [UI Component Architecture](#ui-component-architecture)
6. [Data Flow Diagram](#data-flow-diagram)
7. [Validation Rules](#validation-rules)
8. [Implementation Guide](#implementation-guide)
9. [Appendix: WV SAR Contact Database](#appendix-wv-sar-contact-database)

---

## Problem Analysis

### Current State (INSUFFICIENT)

```typescript
// Current flat structure in SPEC-17 PROMPT.md
emergencyContact: { service: string; contact: string }[];
```

**Why this fails for backcountry:**

| Scenario | Current Limitation |
|----------|-------------------|
| No cell service | No guidance on satellite SOS devices |
| Multi-county destinations | No county-specific SAR contacts |
| Remote hospital access | No trauma level or helipad info |
| Extended SAR times | No self-rescue expectation setting |
| Dam releases (rivers) | No real-time water level contacts |

### Backcountry Emergency Reality

**WV Backcountry Statistics:**

- Average SAR response time: 4-8 hours (source: WV SAR Association)
- Cell coverage in Monongahela NF: ~15% of terrain
- Nearest trauma center from Cranberry Wilderness: 90+ minutes by air
- Counties with dedicated SAR teams: Randolph, Pocahontas, Tucker, Nicholas

---

## Architecture Decision

### Decision: Multi-Tier Hierarchical Structure

**Rationale:**

1. **Primary contact** - Destination-specific (ranger station, outfitter)
2. **County SAR** - Jurisdiction-aware rescue coordination
3. **Supporting agencies** - WVDNR, Forest Service, State Police
4. **Satellite SOS** - Device recommendations for no-cell zones
5. **Medical infrastructure** - Hospital locations with trauma capabilities
6. **Self-rescue expectation** - Critical mental preparation

### Trade-offs Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Flat array (current) | Simple | Lacks structure for safety-critical info | **REJECTED** |
| Single object with arrays | Moderate structure | Limited type safety per tier | **REJECTED** |
| Multi-tier nested object | Full type safety, clear hierarchy | More complex | **SELECTED** |

---

## Zod Schemas

### File Location: `wv-wild-web/src/types/emergency-types.ts`

```typescript
/**
 * Multi-Tier Emergency Contact System
 * SPEC-17: Backcountry Template Emergency Infrastructure
 *
 * Provides comprehensive emergency contact structure for WV backcountry
 * destinations where cell service is unreliable and SAR response times
 * can extend 4-8 hours.
 *
 * @module types/emergency-types
 */

import { z } from 'astro/zod';

// ============================================================================
// PHONE NUMBER VALIDATION
// ============================================================================

/**
 * WV phone number formats:
 * - Standard: "304-555-1234"
 * - Toll-free: "800-555-1234" or "1-800-555-1234"
 * - Emergency: "911"
 * - Satellite: "+1-480-555-1234" (Iridium, etc.)
 */
export const PhoneNumberSchema = z.string()
  .regex(
    /^(911|1?-?\d{3}-?\d{3}-?\d{4}|\+1-?\d{3}-?\d{3}-?\d{4})$/,
    "Phone must be 911, 304-555-1234, 1-800-555-1234, or +1-480-555-1234 format"
  );

export type PhoneNumber = z.infer<typeof PhoneNumberSchema>;

// ============================================================================
// TIER 1: PRIMARY CONTACT (REQUIRED)
// ============================================================================

/**
 * Primary emergency contact for the destination.
 * This is the first call - ranger station, outfitter office, etc.
 * Must include availability hours for trip planning.
 */
export const PrimaryContactSchema = z.object({
  /** Contact name (e.g., "Cranberry Mountain Nature Center") */
  name: z.string().min(1, "Primary contact name required"),

  /** Phone number (validated format) */
  phone: PhoneNumberSchema,

  /** Availability hours (e.g., "24/7", "9am-5pm daily", "Seasonal: May-Oct") */
  available: z.string().min(1, "Availability hours required"),

  /** Optional secondary/after-hours number */
  afterHoursPhone: PhoneNumberSchema.optional(),

  /** Optional radio frequency for backcountry (e.g., "156.675 MHz") */
  radioFrequency: z.string().optional(),

  /** Whether this contact can coordinate SAR */
  canCoordinateSAR: z.boolean().default(false),
});

export type PrimaryContact = z.infer<typeof PrimaryContactSchema>;

// ============================================================================
// TIER 2: COUNTY SAR (REQUIRED FOR BACKCOUNTRY)
// ============================================================================

/**
 * County Search and Rescue contact.
 * WV SAR is county-based - this must match destination's primary county.
 *
 * For destinations spanning multiple counties, use agencies[] for secondary.
 */
export const CountySARSchema = z.object({
  /** WV County name (e.g., "Randolph", "Pocahontas", "Tucker") */
  county: z.string().min(1, "County name required"),

  /** SAR dispatch phone (usually county 911 or sheriff) */
  phone: PhoneNumberSchema,

  /** Typical response time expectation (e.g., "4-8 hours typical") */
  responseTime: z.string().min(1, "Response time estimate required"),

  /** SAR capabilities (optional detail) */
  capabilities: z.array(z.string()).max(10).optional(),

  /** Special notes (e.g., "Coordinates with Monongahela NF") */
  notes: z.string().optional(),
});

export type CountySAR = z.infer<typeof CountySARSchema>;

// ============================================================================
// TIER 3: SUPPORTING AGENCIES (OPTIONAL)
// ============================================================================

/**
 * Supporting emergency agencies with jurisdiction or resources.
 * Forest Service, WVDNR, State Police, neighboring county SAR, etc.
 */
export const EmergencyAgencySchema = z.object({
  /** Agency name (e.g., "Monongahela National Forest", "WV State Police") */
  name: z.string().min(1, "Agency name required"),

  /** Contact phone */
  phone: PhoneNumberSchema,

  /** Jurisdiction or role (e.g., "Federal lands", "Law enforcement", "Wildlife") */
  jurisdiction: z.string().min(1, "Jurisdiction required"),

  /** Optional 24/7 indicator */
  available24x7: z.boolean().default(false),
});

export type EmergencyAgency = z.infer<typeof EmergencyAgencySchema>;

// ============================================================================
// TIER 4: SATELLITE SOS (REQUIRED FOR BACKCOUNTRY)
// ============================================================================

/**
 * Satellite SOS device recommendations.
 * Critical for areas with no cell coverage.
 */
export const SatelliteSOSSchema = z.object({
  /** Whether satellite SOS is recommended (always true for backcountry) */
  recommended: z.boolean(),

  /** Importance level for this destination */
  importance: z.enum(['essential', 'highly-recommended', 'recommended']),

  /** Recommended device types */
  devices: z.array(z.string().min(1)).min(1).max(10),

  /** Coverage notes (e.g., "Global coverage", "Some canyon limitations") */
  coverage: z.string().min(1),

  /** Optional: Can rent at destination? */
  rentalAvailable: z.boolean().default(false),

  /** Optional: Rental location if available */
  rentalLocation: z.string().optional(),

  /** Optional: Kim's personal recommendation */
  kimNote: z.string().optional(),
});

export type SatelliteSOS = z.infer<typeof SatelliteSOSSchema>;

/**
 * Predefined satellite SOS device list (common devices).
 * Use these for consistency across destinations.
 */
export const SATELLITE_SOS_DEVICES = [
  'Garmin inReach Mini 2',
  'Garmin inReach Messenger',
  'SPOT Gen4',
  'ACR ResQLink PLB',
  'Zoleo Satellite Communicator',
  'Apple iPhone 14+ (Emergency SOS)',
  'Somewear Labs',
] as const;

// ============================================================================
// TIER 5: NEAREST HOSPITAL (REQUIRED)
// ============================================================================

/**
 * Trauma center levels per American College of Surgeons.
 * Level I = highest capability, Level III = basic trauma.
 */
export const TraumaLevelSchema = z.enum(['I', 'II', 'III']);

export type TraumaLevel = z.infer<typeof TraumaLevelSchema>;

/**
 * Nearest hospital with trauma capabilities.
 * Critical for planning - visitors need to know medical resources.
 */
export const NearestHospitalSchema = z.object({
  /** Hospital name */
  name: z.string().min(1, "Hospital name required"),

  /** Distance from destination center (e.g., "45 miles", "90 minutes by car") */
  distance: z.string().min(1, "Distance required"),

  /** Optional: Drive time (more useful than distance) */
  driveTime: z.string().optional(),

  /** Trauma center level (if designated) */
  traumaLevel: TraumaLevelSchema.optional(),

  /** Whether helipad is available for air evacuation */
  helipadAccess: z.boolean(),

  /** Hospital phone (for reference, not emergency) */
  phone: PhoneNumberSchema.optional(),

  /** City/town location */
  location: z.string().optional(),
});

export type NearestHospital = z.infer<typeof NearestHospitalSchema>;

// ============================================================================
// TIER 6: SELF-RESCUE EXPECTATION (REQUIRED FOR BACKCOUNTRY)
// ============================================================================

/**
 * Self-rescue expectation messaging.
 * Sets realistic expectations for backcountry visitors.
 */
export const SelfRescueExpectationSchema = z.object({
  /** Primary expectation message (displayed prominently) */
  message: z.string().min(1, "Self-rescue message required"),

  /** Extended guidance (optional, for detailed explanation) */
  guidance: z.array(z.string()).max(10).optional(),

  /** Whether to show prominent warning styling */
  showWarning: z.boolean().default(true),
});

export type SelfRescueExpectation = z.infer<typeof SelfRescueExpectationSchema>;

// ============================================================================
// MAIN SCHEMA: BACKCOUNTRY EMERGENCY CONTACTS
// ============================================================================

/**
 * Complete multi-tier emergency contact system for backcountry destinations.
 *
 * Required tiers for backcountry (type !== 'cave' && type !== 'ski'):
 * - primary: Always required
 * - countySAR: Required for backcountry/wilderness
 * - satelliteSOS: Required for backcountry/wilderness
 * - nearestHospital: Always required
 * - selfRescueExpectation: Required for backcountry/wilderness
 *
 * Optional:
 * - agencies: Additional contacts as needed
 */
export const BackcountryEmergencyContactsSchema = z.object({
  /** Tier 1: Primary destination contact (required) */
  primary: PrimaryContactSchema,

  /** Tier 2: County SAR contact (required for backcountry) */
  countySAR: CountySARSchema,

  /** Tier 3: Supporting agencies (optional, 0-10) */
  agencies: z.array(EmergencyAgencySchema).max(10).optional(),

  /** Tier 4: Satellite SOS recommendations (required for backcountry) */
  satelliteSOS: SatelliteSOSSchema,

  /** Tier 5: Nearest hospital with trauma info (required) */
  nearestHospital: NearestHospitalSchema,

  /** Tier 6: Self-rescue expectation (required for backcountry) */
  selfRescueExpectation: SelfRescueExpectationSchema,
});

export type BackcountryEmergencyContacts = z.infer<typeof BackcountryEmergencyContactsSchema>;

// ============================================================================
// SIMPLIFIED SCHEMA: MANAGED DESTINATIONS (CAVES, SKI RESORTS)
// ============================================================================

/**
 * Simplified emergency contacts for managed destinations.
 * Caves and ski resorts have on-site staff and 911 access.
 */
export const ManagedEmergencyContactsSchema = z.object({
  /** Primary on-site emergency contact */
  primary: z.object({
    name: z.string().min(1),
    phone: PhoneNumberSchema,
    available: z.string().min(1),
  }),

  /** Whether 911 is accessible from destination */
  has911Access: z.boolean().default(true),

  /** Nearest hospital (always useful) */
  nearestHospital: NearestHospitalSchema.optional(),

  /** Optional additional contacts */
  additionalContacts: z.array(z.object({
    service: z.string().min(1),
    contact: PhoneNumberSchema,
  })).max(5).optional(),
});

export type ManagedEmergencyContacts = z.infer<typeof ManagedEmergencyContactsSchema>;

// ============================================================================
// UNION SCHEMA: ALL DESTINATION TYPES
// ============================================================================

/**
 * Emergency contacts discriminated union based on destination type.
 * Use BackcountryEmergencyContacts for wilderness, ManagedEmergencyContacts for caves/ski.
 */
export const EmergencyContactsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('backcountry'),
    contacts: BackcountryEmergencyContactsSchema,
  }),
  z.object({
    type: z.literal('managed'),
    contacts: ManagedEmergencyContactsSchema,
  }),
]);

export type EmergencyContacts = z.infer<typeof EmergencyContactsSchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format phone number for tel: link.
 * Strips formatting for href, preserves for display.
 *
 * @param phone - Formatted phone number
 * @returns Object with href (stripped) and display (original) versions
 */
export function formatPhoneForLink(phone: string): { href: string; display: string } {
  return {
    href: `tel:${phone.replace(/[^0-9+]/g, '')}`,
    display: phone,
  };
}

/**
 * Get trauma level display label.
 *
 * @param level - Trauma level (I, II, III)
 * @returns Human-readable label with explanation
 */
export function getTraumaLevelLabel(level: TraumaLevel): string {
  const labels: Record<TraumaLevel, string> = {
    'I': 'Level I Trauma Center (highest capability)',
    'II': 'Level II Trauma Center',
    'III': 'Level III Trauma Center',
  };
  return labels[level];
}

/**
 * Get satellite SOS importance badge styling.
 *
 * @param importance - Importance level
 * @returns Tailwind classes for badge
 */
export function getSatelliteSOSBadgeClasses(importance: SatelliteSOS['importance']): string {
  const classes: Record<typeof importance, string> = {
    'essential': 'bg-red-900 text-white',
    'highly-recommended': 'bg-brand-orange text-brand-brown',
    'recommended': 'bg-sign-green text-white',
  };
  return classes[importance];
}

/**
 * Type guard to check if emergency contacts are backcountry type.
 *
 * @param contacts - Emergency contacts object
 * @returns true if contacts have full backcountry structure
 */
export function isBackcountryEmergency(
  contacts: EmergencyContacts
): contacts is { type: 'backcountry'; contacts: BackcountryEmergencyContacts } {
  return contacts.type === 'backcountry';
}
```

---

## TypeScript Types

### Complete Interface Documentation

```typescript
/**
 * BackcountryEmergencyContacts Interface
 *
 * Complete type for multi-tier emergency contact system.
 * All tiers are required for backcountry destinations.
 */
interface BackcountryEmergencyContacts {
  /**
   * TIER 1: Primary Contact
   * First point of contact for the destination.
   *
   * @example
   * {
   *   name: "Cranberry Mountain Nature Center",
   *   phone: "304-653-4826",
   *   available: "9am-5pm daily (May-October)",
   *   afterHoursPhone: "304-636-1800",
   *   canCoordinateSAR: true
   * }
   */
  primary: PrimaryContact;

  /**
   * TIER 2: County SAR
   * Search and Rescue is county-based in WV.
   *
   * @example
   * {
   *   county: "Pocahontas",
   *   phone: "911",
   *   responseTime: "4-8 hours typical",
   *   capabilities: ["Ground search", "Technical rescue"],
   *   notes: "Coordinates with Forest Service and Randolph County"
   * }
   */
  countySAR: CountySAR;

  /**
   * TIER 3: Supporting Agencies
   * Additional agencies with jurisdiction or resources.
   *
   * @example
   * [
   *   {
   *     name: "Monongahela National Forest",
   *     phone: "304-636-1800",
   *     jurisdiction: "Federal lands",
   *     available24x7: true
   *   },
   *   {
   *     name: "WV State Police - Marlinton",
   *     phone: "304-799-4101",
   *     jurisdiction: "Law enforcement",
   *     available24x7: true
   *   }
   * ]
   */
  agencies?: EmergencyAgency[];

  /**
   * TIER 4: Satellite SOS
   * Critical for no-cell-service backcountry.
   *
   * @example
   * {
   *   recommended: true,
   *   importance: "essential",
   *   devices: ["Garmin inReach Mini 2", "ACR ResQLink PLB"],
   *   coverage: "Global satellite coverage, some canyon limitations",
   *   rentalAvailable: false,
   *   kimNote: "We sell Garmin inReach at the shop - stop by before you head out."
   * }
   */
  satelliteSOS: SatelliteSOS;

  /**
   * TIER 5: Nearest Hospital
   * Medical infrastructure for evacuation planning.
   *
   * @example
   * {
   *   name: "Davis Medical Center",
   *   distance: "45 miles",
   *   driveTime: "75 minutes",
   *   traumaLevel: "III",
   *   helipadAccess: true,
   *   location: "Elkins, WV"
   * }
   */
  nearestHospital: NearestHospital;

  /**
   * TIER 6: Self-Rescue Expectation
   * Critical mental preparation for backcountry visitors.
   *
   * @example
   * {
   *   message: "Plan for 4-8 hour SAR response time. Self-rescue may be your only option.",
   *   guidance: [
   *     "Tell someone your route and expected return time",
   *     "Carry first aid supplies for self-treatment",
   *     "Know your limits and turn back early"
   *   ],
   *   showWarning: true
   * }
   */
  selfRescueExpectation: SelfRescueExpectation;
}
```

---

## UI Component Architecture

### Component Hierarchy

```
EmergencyContactSection (container)
├── EmergencyContactHeader (section title + warning banner)
├── PrimaryContactCard (Tier 1)
├── SARContactCard (Tier 2)
├── SatelliteSOSCard (Tier 4 - prominent due to importance)
├── AgenciesGrid (Tier 3 - if present)
├── NearestHospitalCard (Tier 5)
└── SelfRescueWarning (Tier 6 - always last, most prominent)
```

### Component Specifications

#### 1. EmergencyContactSection (Container)

```astro
<!-- EmergencyContactSection.astro -->
---
interface Props {
  contacts: BackcountryEmergencyContacts;
  destinationName: string;
}

const { contacts, destinationName } = Astro.props;
---

<section
  class="py-16 bg-white"
  id="emergency-contacts"
  aria-labelledby="emergency-heading"
>
  <div class="container mx-auto px-4">
    <EmergencyContactHeader destinationName={destinationName} />

    <div class="grid gap-8 mt-8">
      <!-- Tier 1 & 2: Primary + SAR (side by side on desktop) -->
      <div class="grid md:grid-cols-2 gap-6">
        <PrimaryContactCard contact={contacts.primary} />
        <SARContactCard contact={contacts.countySAR} />
      </div>

      <!-- Tier 4: Satellite SOS (full width, prominent) -->
      <SatelliteSOSCard sos={contacts.satelliteSOS} />

      <!-- Tier 3: Agencies (if present) -->
      {contacts.agencies && contacts.agencies.length > 0 && (
        <AgenciesGrid agencies={contacts.agencies} />
      )}

      <!-- Tier 5: Hospital -->
      <NearestHospitalCard hospital={contacts.nearestHospital} />

      <!-- Tier 6: Self-Rescue (always last, most prominent) -->
      <SelfRescueWarning expectation={contacts.selfRescueExpectation} />
    </div>
  </div>
</section>
```

#### 2. PrimaryContactCard (Tier 1)

```astro
<!-- PrimaryContactCard.astro -->
---
import type { PrimaryContact } from '../types/emergency-types';
import { formatPhoneForLink } from '../types/emergency-types';

interface Props {
  contact: PrimaryContact;
}

const { contact } = Astro.props;
const phoneLink = formatPhoneForLink(contact.phone);
---

<div class="bg-brand-cream border-l-4 border-l-sign-green p-6 rounded-sm">
  <h3 class="font-display text-xl font-bold text-brand-brown mb-4">
    Primary Contact
  </h3>

  <p class="font-body font-bold text-brand-brown mb-2">
    {contact.name}
  </p>

  <a
    href={phoneLink.href}
    class="inline-flex items-center gap-2 font-display text-2xl font-bold text-sign-green hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sign-green focus-visible:ring-offset-2"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
    {phoneLink.display}
  </a>

  <p class="font-body text-sm text-brand-mud mt-3">
    <span class="font-bold">Hours:</span> {contact.available}
  </p>

  {contact.afterHoursPhone && (
    <p class="font-body text-sm text-brand-mud mt-1">
      <span class="font-bold">After hours:</span> {contact.afterHoursPhone}
    </p>
  )}

  {contact.radioFrequency && (
    <p class="font-body text-sm text-brand-mud mt-1">
      <span class="font-bold">Radio:</span> {contact.radioFrequency}
    </p>
  )}
</div>
```

#### 3. SatelliteSOSCard (Tier 4 - Prominent)

```astro
<!-- SatelliteSOSCard.astro -->
---
import type { SatelliteSOS } from '../types/emergency-types';
import { getSatelliteSOSBadgeClasses } from '../types/emergency-types';

interface Props {
  sos: SatelliteSOS;
}

const { sos } = Astro.props;
const badgeClasses = getSatelliteSOSBadgeClasses(sos.importance);
---

<div class="bg-white border-l-4 border-l-brand-orange p-6 rounded-sm">
  <div class="flex items-start justify-between gap-4 mb-4">
    <h3 class="font-display text-xl font-bold text-brand-brown">
      Satellite SOS Device
    </h3>
    <span class={`px-3 py-1 rounded-sm font-body text-sm font-bold uppercase ${badgeClasses}`}>
      {sos.importance === 'essential' ? 'Essential' :
       sos.importance === 'highly-recommended' ? 'Highly Recommended' :
       'Recommended'}
    </span>
  </div>

  <div class="bg-brand-cream p-4 rounded-sm mb-4">
    <p class="font-body text-brand-brown font-bold mb-2">
      No cell service in this area. Satellite communication is your lifeline.
    </p>
    <p class="font-body text-sm text-brand-mud">
      {sos.coverage}
    </p>
  </div>

  <h4 class="font-body font-bold text-brand-brown mb-2">
    Recommended Devices:
  </h4>
  <ul class="grid md:grid-cols-2 gap-2 mb-4">
    {sos.devices.map(device => (
      <li class="font-body text-sm text-brand-mud flex items-start gap-2">
        <span class="text-sign-green mt-0.5">&#10003;</span>
        <span>{device}</span>
      </li>
    ))}
  </ul>

  {sos.rentalAvailable && sos.rentalLocation && (
    <p class="font-body text-sm text-brand-mud mb-4">
      <span class="font-bold">Rental available:</span> {sos.rentalLocation}
    </p>
  )}

  {sos.kimNote && (
    <p class="font-hand text-brand-brown text-lg mt-4 border-t border-brand-mud/20 pt-4">
      Kim says: "{sos.kimNote}"
    </p>
  )}
</div>
```

#### 4. SelfRescueWarning (Tier 6 - Most Prominent)

```astro
<!-- SelfRescueWarning.astro -->
---
import type { SelfRescueExpectation } from '../types/emergency-types';

interface Props {
  expectation: SelfRescueExpectation;
}

const { expectation } = Astro.props;
---

<div
  class="bg-brand-orange/10 border-l-4 border-l-brand-orange p-8 rounded-sm"
  role="alert"
  aria-labelledby="self-rescue-heading"
>
  <div class="flex items-center gap-3 mb-4">
    <svg class="w-8 h-8 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <h3
      id="self-rescue-heading"
      class="font-display text-2xl font-bold text-brand-brown"
    >
      Self-Rescue Expectation
    </h3>
  </div>

  <p class="font-display text-xl font-bold text-brand-brown mb-4">
    {expectation.message}
  </p>

  {expectation.guidance && expectation.guidance.length > 0 && (
    <ul class="space-y-2">
      {expectation.guidance.map(item => (
        <li class="font-body text-brand-mud flex items-start gap-2">
          <span class="text-brand-orange mt-1 font-bold">&#8226;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )}
</div>
```

### Styling Rules (WVWO Aesthetic Compliance)

| Element | Class | Rationale |
|---------|-------|-----------|
| Container | `rounded-sm` | Hardware store aesthetic |
| Primary contact border | `border-l-sign-green` | Standard contact |
| SAR border | `border-l-brand-brown` | Authority/official |
| Satellite SOS border | `border-l-brand-orange` | High visibility |
| Self-rescue warning | `border-l-brand-orange bg-brand-orange/10` | Maximum visibility |
| Phone links | `text-sign-green hover:underline` | Actionable |
| Kim notes | `font-hand` | Personal touch |

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTENT LAYER (Astro)                                │
│                                                                             │
│  adventures/cranberry-wilderness.md                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ frontmatter:                                                         │   │
│  │   emergencyContacts:                                                 │   │
│  │     type: "backcountry"                                              │   │
│  │     contacts:                                                        │   │
│  │       primary: { ... }                                               │   │
│  │       countySAR: { ... }                                             │   │
│  │       satelliteSOS: { ... }                                          │   │
│  │       nearestHospital: { ... }                                       │   │
│  │       selfRescueExpectation: { ... }                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VALIDATION LAYER (Zod)                               │
│                                                                             │
│  content.config.ts                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ adventures: defineCollection({                                       │   │
│  │   schema: z.object({                                                 │   │
│  │     // ... other fields                                              │   │
│  │     emergencyContacts: EmergencyContactsSchema.optional(),           │   │
│  │   })                                                                 │   │
│  │ })                                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ Build-time validation:                                               │   │
│  │ ✓ Phone number format                                                │   │
│  │ ✓ Required fields present                                            │   │
│  │ ✓ Array length constraints                                           │   │
│  │ ✓ Enum values valid                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TEMPLATE LAYER (Astro Component)                     │
│                                                                             │
│  BackcountryTemplate.astro                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ---                                                                  │   │
│  │ import { EmergencyContactSection } from '../components';             │   │
│  │ import { isBackcountryEmergency } from '../types/emergency-types';   │   │
│  │                                                                      │   │
│  │ const { emergencyContacts, name } = Astro.props;                     │   │
│  │ ---                                                                  │   │
│  │                                                                      │   │
│  │ {isBackcountryEmergency(emergencyContacts) && (                      │   │
│  │   <EmergencyContactSection                                           │   │
│  │     contacts={emergencyContacts.contacts}                            │   │
│  │     destinationName={name}                                           │   │
│  │   />                                                                 │   │
│  │ )}                                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RENDER LAYER (HTML Output)                           │
│                                                                             │
│  <section id="emergency-contacts">                                          │
│    <div class="grid gap-8">                                                 │
│      <PrimaryContactCard />      ← Tier 1                                   │
│      <SARContactCard />          ← Tier 2                                   │
│      <SatelliteSOSCard />        ← Tier 4 (prominent)                       │
│      <AgenciesGrid />            ← Tier 3 (if present)                      │
│      <NearestHospitalCard />     ← Tier 5                                   │
│      <SelfRescueWarning />       ← Tier 6 (always last)                     │
│    </div>                                                                   │
│  </section>                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Validation Rules

### Required Field Validation

| Tier | Field | Validation | Error Message |
|------|-------|------------|---------------|
| 1 | `primary.name` | `.min(1)` | "Primary contact name required" |
| 1 | `primary.phone` | Regex | "Phone must be 911, 304-555-1234, 1-800-555-1234, or +1-480-555-1234 format" |
| 1 | `primary.available` | `.min(1)` | "Availability hours required" |
| 2 | `countySAR.county` | `.min(1)` | "County name required" |
| 2 | `countySAR.responseTime` | `.min(1)` | "Response time estimate required" |
| 4 | `satelliteSOS.devices` | `.min(1).max(10)` | "At least one device required" |
| 4 | `satelliteSOS.coverage` | `.min(1)` | "Coverage description required" |
| 5 | `nearestHospital.name` | `.min(1)` | "Hospital name required" |
| 5 | `nearestHospital.distance` | `.min(1)` | "Distance required" |
| 6 | `selfRescueExpectation.message` | `.min(1)` | "Self-rescue message required" |

### Conditional Validation

```typescript
// Backcountry destinations MUST have all tiers
// Managed destinations (caves, ski) use simplified schema

const isBackcountryType = (type: string) =>
  ['backcountry', 'wilderness', 'trail', 'hunting'].includes(type);

// In content.config.ts:
schema: z.object({
  type: z.string(),
  emergencyContacts: z.union([
    BackcountryEmergencyContactsSchema,
    ManagedEmergencyContactsSchema,
  ]).refine(
    (contacts, ctx) => {
      if (isBackcountryType(ctx.parent.type) && !('countySAR' in contacts)) {
        return false;
      }
      return true;
    },
    { message: "Backcountry destinations require full emergency contact structure" }
  ),
});
```

---

## Implementation Guide

### Step 1: Create Type File

Create `wv-wild-web/src/types/emergency-types.ts` with the Zod schemas above.

### Step 2: Update Content Config

Modify `wv-wild-web/src/content.config.ts`:

```typescript
import { EmergencyContactsSchema } from './types/emergency-types';

const adventures = defineCollection({
  schema: z.object({
    // ... existing fields
    emergencyContacts: EmergencyContactsSchema.optional(),
  }),
});
```

### Step 3: Create UI Components

Create in `wv-wild-web/src/components/emergency/`:

- `EmergencyContactSection.astro`
- `PrimaryContactCard.astro`
- `SARContactCard.astro`
- `SatelliteSOSCard.astro`
- `AgenciesGrid.astro`
- `NearestHospitalCard.astro`
- `SelfRescueWarning.astro`

### Step 4: Integrate in BackcountryTemplate

```astro
<!-- In BackcountryTemplate.astro -->
---
import { EmergencyContactSection } from '../components/emergency';
import { isBackcountryEmergency } from '../types/emergency-types';

const { emergencyContacts, name } = Astro.props;
---

{emergencyContacts && isBackcountryEmergency(emergencyContacts) && (
  <EmergencyContactSection
    contacts={emergencyContacts.contacts}
    destinationName={name}
  />
)}
```

### Step 5: Populate Content

Example frontmatter for `cranberry-wilderness.md`:

```yaml
emergencyContacts:
  type: backcountry
  contacts:
    primary:
      name: Cranberry Mountain Nature Center
      phone: 304-653-4826
      available: 9am-5pm daily (May-October)
      afterHoursPhone: 304-636-1800
      canCoordinateSAR: true
    countySAR:
      county: Pocahontas
      phone: 911
      responseTime: 4-8 hours typical
      capabilities:
        - Ground search
        - Technical rescue
        - Helicopter coordination
      notes: Coordinates with Monongahela NF and Randolph County
    agencies:
      - name: Monongahela National Forest
        phone: 304-636-1800
        jurisdiction: Federal lands
        available24x7: true
      - name: WV State Police - Marlinton
        phone: 304-799-4101
        jurisdiction: Law enforcement
        available24x7: true
    satelliteSOS:
      recommended: true
      importance: essential
      devices:
        - Garmin inReach Mini 2
        - Garmin inReach Messenger
        - ACR ResQLink PLB
      coverage: Global satellite coverage, some canyon limitations in Cranberry River gorge
      rentalAvailable: false
      kimNote: We sell Garmin inReach at the shop - stop by before you head out.
    nearestHospital:
      name: Pocahontas Memorial Hospital
      distance: 25 miles
      driveTime: 45 minutes
      traumaLevel: III
      helipadAccess: true
      location: Buckeye, WV
    selfRescueExpectation:
      message: Plan for 4-8 hour SAR response time. Self-rescue may be your only option.
      guidance:
        - Tell someone your route and expected return time
        - Carry first aid supplies for self-treatment
        - Know your limits and turn back early
        - Carry a satellite communicator - there is NO cell service
      showWarning: true
```

---

## Appendix: WV SAR Contact Database

### County SAR Teams Reference

| County | SAR Contact | Phone | Notes |
|--------|-------------|-------|-------|
| Randolph | Randolph County SAR | 304-636-0300 | Covers Monongahela NF east |
| Pocahontas | Pocahontas County SAR | 911 | Cranberry Wilderness |
| Tucker | Tucker County SAR | 304-478-2431 | Blackwater Falls, Canaan Valley |
| Nicholas | Nicholas County SAR | 304-872-7830 | Gauley River corridor |
| Greenbrier | Greenbrier County SAR | 304-647-6634 | Greenbrier River Trail |
| Fayette | Fayette County SAR | 304-574-0621 | New River Gorge |
| Pendleton | Pendleton County SAR | 304-358-2214 | Germany Valley, Spruce Knob |
| Grant | Grant County SAR | 304-257-4111 | Northern Monongahela NF |

### National Forest Contacts

| Forest Unit | Phone | Hours |
|-------------|-------|-------|
| Monongahela NF Supervisor | 304-636-1800 | 24/7 emergency |
| Gauley Ranger District | 304-846-2695 | 8am-4:30pm |
| Greenbrier Ranger District | 304-456-3335 | 8am-4:30pm |
| Cheat-Potomac Ranger District | 304-257-4488 | 8am-4:30pm |

### State Agency Contacts

| Agency | Phone | Jurisdiction |
|--------|-------|--------------|
| WV State Police (24/7) | 304-293-5850 | Statewide law enforcement |
| WVDNR Law Enforcement | 304-558-2771 | Wildlife, hunting, fishing |
| WVDNR 24hr Hotline | 800-CALL-WVA | Poaching, violations |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-31 | System Architecture Designer | Initial comprehensive design |

---

**End of Architecture Document**
