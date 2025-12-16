# Feature Specification: LocalBusiness Schema Enhancement

**Feature Branch**: `phase3a-localbusiness-schema`
**Created**: 2025-12-16
**Status**: Draft
**Input**: Phase 3A Geographic SEO Foundation - Business Entity Schema

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accurate Map Pin (Priority: P1)

When a hunter searches "gun shop near me" while driving on I-79, Google shows WVWO with the correct location pin, not 1km away.

**Why this priority**: Wrong coordinates = wrong directions = lost customers. This is the foundation for all local SEO.

**Independent Test**: Search "WV Wild Outdoors" in Google Maps and verify the pin lands exactly on 121 WV-82, Birch River, WV 26610.

**Acceptance Scenarios**:

1. **Given** a user searches "WV Wild Outdoors" on Google Maps, **When** results load, **Then** the map pin is at 38.49910, -80.75460 (within 10 meters of actual building)
2. **Given** Google's Rich Results Test tool, **When** analyzing the homepage, **Then** GeoCoordinates shows latitude 38.49910 and longitude -80.75460

---

### User Story 2 - Click-to-Call from Search (Priority: P1)

When someone finds WVWO in search results, they can tap the phone number directly from the SERP without visiting the website.

**Why this priority**: Mobile hunters on the road need instant contact. ContactPoint schema enables this.

**Independent Test**: Search "WV Wild Outdoors phone" on mobile and verify a clickable phone number appears in the knowledge panel.

**Acceptance Scenarios**:

1. **Given** a mobile user searches "WV Wild Outdoors", **When** the business card appears, **Then** phone number (304) 649-2607 is tappable
2. **Given** schema validation tool, **When** analyzing homepage, **Then** ContactPoint with telephone "+13046492607" is present

---

### User Story 3 - Service Recognition (Priority: P2)

When someone searches "FFL transfer near I-79" or "hunting license WV", Google understands WVWO offers these specific services.

**Why this priority**: Services differentiate WVWO from big-box stores. FFL transfers are a key revenue driver.

**Independent Test**: Schema validator shows Service entities for "FFL Transfer", "WV Hunting License", "WV Fishing License".

**Acceptance Scenarios**:

1. **Given** schema validation tool, **When** analyzing homepage, **Then** at least 3 Service entities exist with proper names and descriptions
2. **Given** a search for "FFL transfer Braxton County WV", **When** results load, **Then** WVWO appears in local results (may take weeks for Google to index)

---

### User Story 4 - Social Profile Linking (Priority: P3)

When Google displays WVWO's knowledge panel, it shows links to official social profiles (Facebook, Google Business).

**Why this priority**: Establishes entity authority and prevents brand confusion. Lower priority as it's enhancement, not critical.

**Independent Test**: Schema validator shows sameAs array with valid URLs.

**Acceptance Scenarios**:

1. **Given** schema validation tool, **When** analyzing homepage, **Then** sameAs contains Google Business Profile URL
2. **Given** schema validation tool, **When** analyzing homepage, **Then** sameAs contains Facebook page URL (if exists)

---

### Edge Cases

- What happens if Facebook page doesn't exist? → sameAs should only include verified profiles
- What if phone number format varies? → Use E.164 format (+13046492607) in schema, display format elsewhere
- What if coordinates are already correct? → Verify with Google Maps API, update only if drift detected

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display coordinates with 5 decimal precision (38.49910, -80.75460)
- **FR-002**: System MUST include ContactPoint schema with telephone in E.164 format (+13046492607)
- **FR-003**: System MUST include ContactPoint with contactType "customer service"
- **FR-004**: System MUST include Service schema for FFL Transfer service
- **FR-005**: System MUST include Service schema for WV Hunting License service
- **FR-006**: System MUST include Service schema for WV Fishing License service
- **FR-007**: System MUST include sameAs array with Google Business Profile URL
- **FR-008**: System SHOULD include sameAs with Facebook URL if verified profile exists

### Key Entities

- **LocalBusiness (SportingGoodsStore)**: Primary business entity with name, address, geo, telephone, hours
- **ContactPoint**: Customer service contact with phone number for click-to-call
- **Service**: Individual services offered (FFL transfers, licenses)
- **GeoCoordinates**: Precise location with 5 decimal latitude/longitude

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Google Rich Results Test shows valid LocalBusiness schema with no errors
- **SC-002**: GeoCoordinates in schema match verified location (38.49910, -80.75460) exactly
- **SC-003**: ContactPoint telephone matches SITE_CONTACT.phone value
- **SC-004**: At least 3 Service entities validate without errors
- **SC-005**: sameAs URLs return 200 status (verified as live profiles)
- **SC-006**: `npm run build` completes without errors after changes

---

## SPARC Execution Prompt

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  PHASE 3A: LocalBusiness Schema Enhancement                                  ║
║  Feature: Fix coordinates, add ContactPoint, Service, SameAs schemas         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  Model: claude-opus-4-5-20251101    Effort: ADAPTIVE                         ║
║  Topology: SEQUENTIAL               Thinking: EXTENDED                       ║
║  Complexity: ●●○○○                  Est. Output: ~15K tokens                 ║
║  Parallel Cap: 3 concurrent         Checkpoint: AUTO                         ║
║  Dependencies: None                 Blocking: 02-navigation-schema           ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────────────┐
│  PROJECT CONTEXT                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│  Business: WV Wild Outdoors - Kim & Bryan's hunting/outdoor shop             │
│  Location: 121 WV-82, Birch River, WV 26610 (I-79 Exit 57)                  │
│  Tech: Astro 5.x + Tailwind CSS 4.x                                          │
│  Coordinates: 38.49910, -80.75460 (verified)                                 │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  SPARC WORKFLOW                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [1] SPECIFICATION ──────────────────────────────────────────────────────    │
│  │   effort: LOW       thinking: "think about LocalBusiness schema"          │
│  │                                                                           │
│  ├─ Already complete - see User Stories above                                │
│  │                                                                           │
│  └─ Gate: Spec approved ──▶ [2]                                             │
│                                                                              │
│  [2] PSEUDOCODE ─────────────────────────────────────────────────────────    │
│  │   effort: MEDIUM    thinking: "think hard about schema structure"         │
│  │                                                                           │
│  ├─ Read Layout.astro lines 30-96 (existing schema)                          │
│  ├─ Read siteContact.ts (phone, address data)                                │
│  ├─ Identify insertion points for ContactPoint, Service, sameAs             │
│  │                                                                           │
│  └─ Gate: Schema structure defined ──▶ [3]                                  │
│                                                                              │
│  [3] ARCHITECTURE ───────────────────────────────────────────────────────    │
│  │   effort: MEDIUM    thinking: "think harder about schema integration"     │
│  │                                                                           │
│  ├─ Design ContactPoint object structure                                     │
│  ├─ Design Service array (FFL, licenses)                                     │
│  ├─ Design sameAs array (GBP URL, Facebook if exists)                       │
│  │                                                                           │
│  └─ Gate: Design approved ──▶ CHECKPOINT ──▶ [4]                            │
│                                                                              │
│  [4] REFINEMENT ─────────────────────────────────────────────────────────    │
│  │   effort: MEDIUM    thinking: "ultrathink about schema validation"        │
│  │                                                                           │
│  ├─ Edit Layout.astro:                                                       │
│  │   - Fix coordinates (38.4876 → 38.49910, -80.7073 → -80.75460)           │
│  │   - Add ContactPoint schema                                               │
│  │   - Add Service schemas (3 services)                                      │
│  │   - Add sameAs array                                                      │
│  │                                                                           │
│  └─ Gate: Schema validates ──▶ [5]                                          │
│                                                                              │
│  [5] COMPLETION ─────────────────────────────────────────────────────────    │
│  │   effort: LOW                                                             │
│  │                                                                           │
│  ├─ npm run build                                                            │
│  ├─ Validate at schema.org/validator                                         │
│  ├─ Google Rich Results Test                                                 │
│  │                                                                           │
│  └─ Gate: All validations pass ──▶ DONE                                     │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  DELIVERABLES                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  📄 wv-wild-web/src/layouts/Layout.astro          [EDIT]  P0                │
│     - Fix coordinates (lines 48-49, 88-89)                                   │
│     - Add ContactPoint schema                                                │
│     - Add Service schemas                                                    │
│     - Add sameAs array                                                       │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  GOVERNANCE COMPLIANCE                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ✓ I. Owner-First Simplicity: Minimal changes to existing schema             │
│  ✓ II. Heart of WV: No marketing speak in schema descriptions               │
│  ✓ VII. Gateway Positioning: Accurate coordinates for I-79 discovery        │
│                                                                              │
│  🛑 BLOCKING GATES:                                                          │
│     - npm run build passes                                                   │
│     - Schema validates at schema.org/validator                               │
│     - Coordinates exactly match 38.49910, -80.75460                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```
