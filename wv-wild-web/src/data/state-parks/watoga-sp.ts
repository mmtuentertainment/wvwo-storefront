/**
 * Watoga State Park - Main Data File
 * SPEC-18 Phase 4: Realistic placeholder data following StateParkTemplateProps schema
 *
 * [PLACEHOLDER - Update in SPEC-66: Destination Watoga]
 *
 * This file provides realistic placeholder data for testing and development.
 * Real content will be migrated from official WV State Parks sources in SPEC-66.
 *
 * Park Overview:
 * - Location: Pocahontas County, Mountain Lakes region
 * - Acreage: 10,100 acres (largest WV state park)
 * - Established: 1937 (first WV state park)
 * - Signature Feature: Watoga Lake Lodge & Brooks Memorial Arboretum
 * - Resort Park: Lodge with restaurant, 33 cabins, 18-hole golf course
 * - Facilities: Conference center, pool, boat rentals, extensive programming
 *
 * This file has been modularized for SPEC-24 compliance:
 * - watoga/facilities.ts: Lodging, camping, pools, visitor centers
 * - watoga/activities.ts: Programs, events, recreational activities
 * - watoga/trails.ts: Trail system and overlooks
 *
 * @module data/state-parks/watoga-sp
 */

import type { StateParkTemplateProps } from '../../types/state-park-template-types';

// Import modular sections
import { watogaFacilities } from './watoga/facilities';
import { watogaActivitiesPrograms } from './watoga/activities';
import { watogaTrails, watogaOverlooks } from './watoga/trails';
import { watogaOverview } from './watoga/overview';
import { watogaRegulations } from './watoga/regulations';
import { watogaReservations } from './watoga/reservations';
import {
  watogaAccessibility,
  watogaEmergencyContacts,
  watogaSEO,
  watogaNearbyAttractions,
  watogaRelatedCategories,
} from './watoga/metadata';

export const watogaStatePark: StateParkTemplateProps = {
  // ============================================================================
  // HERO SECTION (Required)
  // ============================================================================
  hero: {
    name: 'Watoga State Park',
    heroImage: '/images/state-parks/watoga/hero-lake-lodge.jpg',
    imagePosition: 'center' as const,
    tagline: 'West Virginia\'s Flagship Resort Park',
    acreage: 10100,
    established: 1937,
    signatureFeature: 'Watoga Lake Lodge & Brooks Memorial Arboretum',
    quickHighlights: [
      'Largest state park in West Virginia',
      'Historic Watoga Lake Lodge with restaurant',
      '18-hole championship golf course',
      'Brooks Memorial Arboretum with 350+ tree species',
      '33 rental cabins plus lodge rooms',
      'Full-service resort with conference center',
      'Extensive ranger programs and workshops',
    ],
  },

  // ============================================================================
  // OVERVIEW SECTION (Imported from watoga/overview.ts)
  // ============================================================================
  overview: watogaOverview,

  // ============================================================================
  // REGULATIONS (Imported from watoga/regulations.ts)
  // ============================================================================
  regulations: watogaRegulations,

  // ============================================================================
  // FACILITIES SECTION (Imported from watoga/facilities.ts)
  // ============================================================================
  facilities: watogaFacilities,

  // ============================================================================
  // ACTIVITIES & PROGRAMS (Imported from watoga/activities.ts)
  // ============================================================================
  activitiesPrograms: watogaActivitiesPrograms,

  // ============================================================================
  // TRAIL SYSTEM (Imported from watoga/trails.ts)
  // ============================================================================
  trails: watogaTrails,

  // ============================================================================
  // SCENIC OVERLOOKS (Imported from watoga/trails.ts)
  // ============================================================================
  overlooks: watogaOverlooks,

  // ============================================================================
  // ACCESSIBILITY (Imported from watoga/metadata.ts)
  // ============================================================================
  accessibility: watogaAccessibility,

  // ============================================================================
  // RESERVATIONS (Imported from watoga/reservations.ts)
  // ============================================================================
  reservations: watogaReservations,

  // ============================================================================
  // EMERGENCY CONTACTS (Imported from watoga/metadata.ts)
  // ============================================================================
  emergencyContacts: watogaEmergencyContacts,

  // ============================================================================
  // SEO METADATA (Imported from watoga/metadata.ts)
  // ============================================================================
  seo: watogaSEO,

  // ============================================================================
  // RELATED CONTENT (Imported from watoga/metadata.ts)
  // ============================================================================
  nearbyAttractions: watogaNearbyAttractions,

  relatedCategories: watogaRelatedCategories,

  showRelatedShop: true,
};
