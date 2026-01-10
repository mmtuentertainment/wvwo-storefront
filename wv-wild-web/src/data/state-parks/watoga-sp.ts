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
import {
  WV_STATE_PARKS_RESERVATION_URL,
  WV_STATE_PARKS_PHONE,
  WV_STATE_PARKS_MANAGING_AGENCY,
} from './shared-constants';

// Import modular sections
import { watogaFacilities } from './watoga/facilities';
import { watogaActivitiesPrograms } from './watoga/activities';
import { watogaTrails, watogaOverlooks } from './watoga/trails';

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
  // OVERVIEW SECTION (Required)
  // ============================================================================
  overview: {
    operatingHours: {
      general: 'Park open year-round, 24 hours',
      dayUse: 'Dawn to dusk',
      overnightCamping: true,
      seasonalHours: [
        {
          season: 'Summer Season (Peak)',
          startDate: 'Memorial Day',
          endDate: 'Labor Day',
          hours: [
            {
              day: 'monday' as const,
              open: '00:00',
              close: '23:59',
              notes: 'Full services - all facilities open',
            },
            {
              day: 'tuesday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'wednesday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'thursday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'friday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'saturday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'sunday' as const,
              open: '00:00',
              close: '23:59',
            },
          ],
        },
        {
          season: 'Spring/Fall Season',
          startDate: 'April 1',
          endDate: 'October 31',
          hours: [
            {
              day: 'monday' as const,
              open: '00:00',
              close: '23:59',
              notes: 'Most facilities open - call for specific hours',
            },
            {
              day: 'tuesday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'wednesday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'thursday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'friday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'saturday' as const,
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'sunday' as const,
              open: '00:00',
              close: '23:59',
            },
          ],
        },
      ],
      facilityHours: {
        'Watoga Lake Lodge': 'Year-round (check-in 4:00 PM)',
        'Restaurant': '7:00 AM - 8:00 PM (seasonal)',
        'Golf Course': 'Dawn to dusk, April - October',
        'Swimming Pool': '10:00 AM - 7:00 PM, Memorial Day - Labor Day',
        'Arboretum': 'Dawn to dusk year-round',
        'Gift Shop': '9:00 AM - 5:00 PM (seasonal)',
      },
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'No day-use fees for park access. Fees apply for golf, pool, boat rentals, and overnight facilities.',
    },

    contact: {
      phone: '304-799-4087',
      email: 'watoga@wv.gov',
      address: 'HC 82, Box 252, Marlinton, WV 24954',
    },

    managingAgency: WV_STATE_PARKS_MANAGING_AGENCY,

    county: 'Pocahontas County',
    region: 'Mountain Lakes',
    coordinates: {
      lat: 38.1167,
      lng: -80.1500,
    },
    nearestTown: 'Marlinton (8 miles)',
    distanceFromCity: '3 hours from Charleston, 4.5 hours from Washington DC',
  },

  // ============================================================================
  // REGULATIONS (Required)
  // ============================================================================
  regulations: {
    pets: {
      allowed: true,
      leashRequired: true,
      petFriendlyAreas: [
        'Campground',
        'Most hiking trails',
        'Picnic areas',
        'Designated pet-friendly cabins',
      ],
      restrictions: [
        'Not allowed in lodge rooms',
        'Not allowed in restaurant',
        'Not allowed at swimming pool',
        'Select cabins only (pet fee applies)',
        'Must be leashed at all times',
        'Maximum 6-foot leash',
      ],
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'Day-use areas are free. Activity fees: Golf ($25-$45), Pool ($5), Boat rentals ($10-$25/hour).',
    },

    parking: {
      available: true,
      capacity: 300,
      fees: 'Free',
      restrictions: [
        'Park in designated areas only',
        'RV parking at campground',
        'Overflow parking available during events',
      ],
    },

    alcohol: {
      allowed: true,
      restrictions: [
        'Permitted in lodge restaurant only',
        'Not allowed in campground or public areas',
        'Not allowed on trails',
      ],
    },

    smoking: {
      allowed: false,
      designatedAreas: true,
      restrictions: [
        'Designated smoking areas outside lodge',
        'No smoking in any buildings',
        'No smoking on trails during fire season',
      ],
    },

    fires: {
      allowed: true,
      restrictions: [
        'Fires in designated fire rings only',
        'No ground fires',
        'Firewood must be purchased on-site or certified heat-treated',
        'Completely extinguish before leaving',
        'Fire restrictions during dry periods',
      ],
      firePits: true,
      seasonalBans: 'Fire bans may be imposed - check with park office',
    },

    specialRestrictions: [
      'No hunting in park boundaries',
      'Fishing license required (15+)',
      'Golf course etiquette required',
      'Restaurant dress code: casual (no swimwear)',
      'Maximum stay: 14 consecutive days',
    ],

    quietHours: {
      enforced: true,
      start: '22:00',
      end: '07:00',
    },
  },

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
  // ACCESSIBILITY
  // ============================================================================
  accessibility: {
    statement: 'Watoga State Park is committed to accessibility. Lodge, restaurant, pool, arboretum, and select facilities are fully ADA-compliant.',
    features: [
      'accessible_cabin',
      'accessible_campsite',
      'accessible_restroom',
      'accessible_parking',
      'accessible_trail',
      'accessible_picnic',
      'accessible_playground',
      'beach_wheelchair',
    ],
    accessibleTrails: [
      'Arboretum Trail (1.2 miles, paved)',
    ],
    accessibleFacilities: [
      'Watoga Lake Lodge (fully accessible)',
      'Restaurant (accessible)',
      'Swimming pool (pool lift available)',
      'Brooks Memorial Arboretum',
      '2 ADA-compliant cabins',
      '6 accessible campsites',
      'Conference center',
    ],
    assistiveEquipment: [
      {
        equipment: 'Beach wheelchair',
        description: 'All-terrain wheelchair for accessing lakefront',
        reservationRequired: true,
        advanceNotice: '24 hours',
      },
    ],
    serviceAnimalPolicy: {
      allowed: true,
      restrictions: [
        'Service animals allowed in all public areas',
        'Not allowed in swimming pool',
      ],
      reliefAreas: [
        'Designated areas near parking lots',
        'Grassy areas near accessible facilities',
      ],
      adaCompliance: 'Watoga State Park complies with ADA service animal regulations.',
    },
    advanceNoticeRequired: true,
    advanceNoticeDetails: 'Advance notice appreciated for assistive equipment and special accommodations',
    accommodationsContact: '304-799-4087',
  },

  // ============================================================================
  // RESERVATIONS
  // ============================================================================
  reservations: {
    cabins: {
      bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
      bookingWindow: 'Up to 12 months in advance',
      cancellationPolicy: 'Full refund 14+ days before arrival. 50% refund 7-13 days. No refund within 7 days.',
      fees: [
        {
          cabinType: 'Standard Cabin (2BR)',
          priceRange: '$110-$165/night',
          season: 'Year-round (peak rates summer/fall)',
        },
        {
          cabinType: 'Deluxe Cabin (3BR)',
          priceRange: '$135-$195/night',
          season: 'Year-round',
        },
        {
          cabinType: 'Pet-Friendly Cabin',
          priceRange: '$120-$175/night + $25 pet fee',
          season: 'Year-round',
        },
        {
          cabinType: 'ADA Cabin',
          priceRange: '$110-$165/night',
          season: 'Year-round',
        },
        {
          cabinType: 'Lodge Room',
          priceRange: '$95-$150/night',
          season: 'Year-round',
        },
      ],
    },
    camping: {
      bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
      bookingWindow: 'Up to 6 months in advance',
      cancellationPolicy: 'Full refund 7+ days before arrival. No refund within 7 days.',
      fees: [
        {
          siteType: 'Full Hookup Site',
          price: '$35-$38/night',
          season: 'April 1 - October 31',
        },
        {
          siteType: 'Electric/Water Site',
          price: '$30-$32/night',
          season: 'April 1 - October 31',
        },
        {
          siteType: 'Electric Only',
          price: '$25-$28/night',
          season: 'April 1 - October 31',
        },
      ],
    },
    groupFacilities: {
      bookingContact: '304-799-4087',
      fees: [
        {
          facilityType: 'Lakeside Pavilion',
          price: '$75/day',
        },
        {
          facilityType: 'Conference Center',
          price: 'Call for rates',
        },
      ],
    },
    generalContact: {
      phone: WV_STATE_PARKS_PHONE,
      url: WV_STATE_PARKS_RESERVATION_URL,
    },
  },

  // ============================================================================
  // EMERGENCY CONTACTS
  // ============================================================================
  emergencyContacts: [
    {
      tier: 'primary' as const,
      priority: 1,
      contacts: [
        {
          name: 'Park Rangers',
          phone: '304-799-4087',
          available: '8:00 AM - 4:00 PM daily',
          type: 'first-responder' as const,
        },
        {
          name: 'Pocahontas County 911',
          phone: '911',
          available: '24/7',
          type: 'emergency-services' as const,
        },
      ],
    },
    {
      tier: 'agency' as const,
      priority: 2,
      contacts: [
        {
          name: 'Pocahontas County Sheriff',
          phone: '304-799-4567',
          available: '24/7',
          type: 'law-enforcement' as const,
        },
        {
          name: 'Pocahontas Memorial Hospital',
          phone: '304-799-7400',
          available: '24/7',
          type: 'hospital' as const,
          location: 'Buckeye, WV (15 miles)',
        },
      ],
    },
  ],

  // ============================================================================
  // SEO METADATA
  // ============================================================================
  seo: {
    title: 'Watoga State Park - WV Resort Lodge, Golf & Cabins',
    description: 'WV\'s largest state park with historic lodge, restaurant, 18-hole golf, 33 cabins, and Brooks Arboretum. Resort amenities in Pocahontas County mountains.',
    keywords: [
      'Watoga State Park',
      'WV state park lodge',
      'Pocahontas County camping',
      'Brooks Memorial Arboretum',
      'West Virginia golf courses',
      'resort cabins WV',
      'family vacations West Virginia',
      'Marlinton attractions',
    ],
    faqItems: [
      {
        '@type': 'Question' as const,
        name: 'Does Watoga State Park have a lodge?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Yes, Watoga Lake Lodge offers 30 comfortable rooms with modern amenities. The lodge features an on-site restaurant serving three meals daily, plus a gift shop and conference facilities.',
        },
      },
      {
        '@type': 'Question' as const,
        name: 'What is Brooks Memorial Arboretum?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Brooks Memorial Arboretum is a 350+ tree species collection at Watoga State Park with paved, accessible trails and educational signage. It\'s one of the finest arboretums in West Virginia.',
        },
      },
      {
        '@type': 'Question' as const,
        name: 'Does Watoga have a golf course?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Yes, Watoga features an 18-hole championship golf course (par 72, 6,200 yards) open April through October. Cart and club rentals available.',
        },
      },
      {
        '@type': 'Question' as const,
        name: 'Are pets allowed at Watoga State Park?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Pets are welcome in campgrounds, on trails, and in select pet-friendly cabins (additional fee applies). Pets not allowed in lodge rooms or restaurant.',
        },
      },
      {
        '@type': 'Question' as const,
        name: 'How many cabins does Watoga State Park have?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Watoga offers 33 rental cabins including standard, deluxe, pet-friendly, and ADA-accessible options. All cabins feature full kitchens and modern amenities.',
        },
      },
      {
        '@type': 'Question' as const,
        name: 'Is Watoga State Park accessible for wheelchairs?',
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: 'Yes, the lodge, restaurant, arboretum trail, swimming pool, and select cabins are fully accessible. Beach wheelchairs available for lakefront access with 24-hour advance notice.',
        },
      },
    ],
  },

  // ============================================================================
  // RELATED CONTENT
  // ============================================================================
  nearbyAttractions: [
    {
      name: 'Cranberry Glades Botanical Area',
      type: 'Natural Area',
      distance: '25 miles',
      description: 'Unique northern bog ecosystem with boardwalk trails',
    },
    {
      name: 'Cass Scenic Railroad State Park',
      type: 'State Park',
      distance: '20 miles',
      description: 'Historic steam railroad excursions to Bald Knob',
      link: 'https://wvstateparks.com/park/cass-scenic-railroad-state-park',
    },
    {
      name: 'Seneca State Forest',
      type: 'State Forest',
      distance: '15 miles',
      description: 'Primitive camping and hiking in mountain forest',
    },
  ],

  relatedCategories: [
    {
      name: 'West Virginia State Parks',
      slug: 'state-parks',
      description: 'Explore all WV state parks',
    },
    {
      name: 'Resort Lodging',
      slug: 'lodging',
      description: 'WV resort accommodations',
    },
    {
      name: 'Golf in West Virginia',
      slug: 'golf',
      description: 'Mountain golf courses',
    },
  ],

  showRelatedShop: true,
};
