# Implementation Plan: SPEC-05 - Disable E-Commerce Feature Flag


## Metadata

- **Branch**: `feat/spec-05-commerce-feature-flag`
- **Date**: 2025-12-21
- **Spec**: [PROMPT.md](PROMPT.md)

## Summary

Implements a `PUBLIC_COMMERCE_ENABLED` feature flag to toggle e-commerce functionality while preserving the product catalog.

## Technical Context

**Language/Version**: Astro 5.x, TypeScript
**Primary Dependencies**: React, Tailwind CSS 4.x, shadcn/ui
**Storage**: localStorage (Cart persistence)
**Testing**: Build verification (56 pages)
**Target Platform**: Cloudflare Pages
**Project Type**: Web Application

## Requirements

- **FR-001**: Feature flag `PUBLIC_COMMERCE_ENABLED` (default: false)
- **FR-002**: Hide cart icon in header (mobile/desktop)
- **FR-003**: Replace "Add to Cart" with "Call to Order" CTA
- **FR-004**: Redirect `/checkout` to `/shop` (307)
- **FR-005**: All UI changes must follow WVWO voice and aesthetics

## Proposed Changes

### Configuration
- [x] `.env.example`: Added `PUBLIC_COMMERCE_ENABLED`

### Components & Layouts
- [x] `Layout.astro`: Conditional `CartDrawer` rendering
- [x] `Header.astro`: Conditional `HeaderCart` icon visibility

### Pages
- [x] `checkout.astro`: Added redirect guard
- [x] `[product].astro`: Three-state CTA logic (Buy / Call to Order / Out of Stock)

## Success Criteria


```text
- **SC-001**: Cart is inaccessible when disabled
- **SC-002**: Site remains navigable as a catalog
- **SC-003**: No regressions in "Call for Availability" logic
- **SC-004**: 100% reversible via environment variable
```
