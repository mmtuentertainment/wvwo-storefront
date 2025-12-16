# Feature Specification: Highway Gateway Optimization

**Feature Branch**: `phase3a-gateway-optimization`
**Created**: 2025-12-16
**Status**: Draft
**Input**: Phase 3A Geographic SEO Foundation - I-79 Hunter Capture

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homepage I-79 Visibility (Priority: P1)

When an out-of-state hunter searches "gun shop I-79 West Virginia" or "hunting store near I-79 exit", WVWO's homepage clearly communicates its I-79 Exit 57 location.

**Why this priority**: Constitution Principle VII (Gateway Positioning) - I-79 is the primary access route for target customers.

**Independent Test**: Homepage meta description and hero section both mention "I-79 Exit 57" or "Exit 57 Frametown".

**Acceptance Scenarios**:

1. **Given** the homepage source, **When** examining meta description, **Then** text includes "I-79 Exit 57" or equivalent highway reference
2. **Given** the homepage visible content, **When** reading hero section, **Then** "Exit 57" or "I-79" is visible above the fold
3. **Given** a search for "hunting store I-79 WV", **When** WVWO appears in results, **Then** meta description snippet mentions I-79 location

---

### User Story 2 - Drive Time Context (Priority: P2)

When a hunter from Pittsburgh, Charleston, or Morgantown visits WVWO's site, they immediately understand how far they are from the shop.

**Why this priority**: Reduces friction for out-of-state visitors by answering "how far?" before they ask.

**Independent Test**: Homepage or /near/ hub displays drive times from major cities.

**Acceptance Scenarios**:

1. **Given** the homepage or contact section, **When** viewing location info, **Then** drive times from at least 2 major cities are displayed
2. **Given** drive time information, **When** examining accuracy, **Then** times are within 15 minutes of actual Google Maps estimates

---

### User Story 3 - Kim's GBP Optimization (Priority: P1)

Kim can optimize WV Wild Outdoors' Google Business Profile using a simple checklist on her phone, without technical help.

**Why this priority**: GBP is the #1 factor for local pack rankings. Kim manages it directly.

**Independent Test**: GBP-OPTIMIZATION.md exists with actionable, phone-friendly checklist.

**Acceptance Scenarios**:

1. **Given** the GBP checklist document, **When** Kim reads it, **Then** all instructions are in plain language (no technical jargon)
2. **Given** the photo section, **When** following the list, **Then** Kim knows exactly what 11+ photos to take and upload
3. **Given** the Q&A section, **When** Kim implements it, **Then** she has copy-paste answers for common questions (FFL transfers, hours, location)
4. **Given** the review response templates, **When** Kim gets a review, **Then** she has Kim-voice templates for positive and negative responses

---

### User Story 4 - Area Page Highway References (Priority: P3)

When someone reads an area page (Sutton Lake, Elk River), they see clear directions from I-79 to that destination via WVWO.

**Why this priority**: Connects area pages to the shop, encouraging stops. Lower priority as most area pages already have directions.

**Independent Test**: Area pages mention I-79 or Exit 57 in directions section.

**Acceptance Scenarios**:

1. **Given** any /near/ detail page, **When** reading directions, **Then** I-79 exit information is included
2. **Given** direction content, **When** following the route, **Then** WVWO is positioned as a waypoint ("stop by before you head out")

---

### Edge Cases

- What if GBP already has photos? → Checklist should audit existing photos, not just add new ones
- What if Kim doesn't have Facebook? → Skip Facebook-specific items; focus on GBP core
- What if drive times change? → Use approximate ranges ("about 2 hours from Pittsburgh") not exact minutes
- What if meta description is too long? → Keep under 160 characters; I-79 reference takes priority

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Homepage meta description MUST include "I-79 Exit 57" or "Exit 57" reference
- **FR-002**: Homepage hero or above-fold content MUST mention I-79 access
- **FR-003**: Homepage SHOULD display drive times from Pittsburgh, Charleston, Morgantown
- **FR-004**: System MUST create docs/GBP-OPTIMIZATION.md with Kim-friendly checklist
- **FR-005**: GBP checklist MUST include photo requirements (11+ photos with specific types)
- **FR-006**: GBP checklist MUST include pre-written Q&A responses
- **FR-007**: GBP checklist MUST include review response templates in Kim's voice
- **FR-008**: GBP checklist MUST include category recommendations (Hunting store, Ammunition supplier)
- **FR-009**: Area pages SHOULD reference I-79 in their directions sections

### Key Entities

- **Homepage Meta**: SEO-critical meta description with highway positioning
- **Hero Content**: Above-fold content establishing geographic identity
- **GBP Checklist**: Non-technical document for Kim's Google Business Profile management
- **Drive Time Display**: Optional UI element showing distances from major cities

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Homepage meta description contains "I-79" or "Exit 57" substring
- **SC-002**: Homepage meta description is under 160 characters
- **SC-003**: docs/GBP-OPTIMIZATION.md exists and contains all required sections
- **SC-004**: GBP checklist uses zero technical jargon (no "schema", "JSON-LD", "canonical")
- **SC-005**: GBP checklist includes 11+ specific photo descriptions
- **SC-006**: GBP checklist includes at least 4 pre-written Q&A pairs
- **SC-007**: GBP checklist includes at least 2 review response templates (positive/negative)
- **SC-008**: At least 3 /near/ pages mention I-79 in directions content
- **SC-009**: `npm run build` completes without errors after changes

## Notes for Implementation

### Kim's Voice Guidelines (from Constitution)

When writing GBP content, use Kim's authentic voice:
- "We handle the paperwork legally and quickly."
- "If we don't have it, you probably don't need it."
- "We aren't just a store off the highway. We are your neighbors."
- "Grand love ya"

Avoid:
- Corporate marketing speak ("solutions", "leverage", "optimize")
- Silicon Valley jargon
- Anything that sounds like it came from a marketing agency

### Drive Time References

Approximate drive times from major cities to WVWO (121 WV-82, Birch River):
- Pittsburgh, PA: ~2.5 hours
- Charleston, WV: ~1.5 hours
- Morgantown, WV: ~1.5 hours
- Columbus, OH: ~3.5 hours
- Washington, DC: ~4.5 hours

Use ranges like "about 2.5 hours" rather than exact minutes.
