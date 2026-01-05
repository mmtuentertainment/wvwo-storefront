/**
 * Holly River State Park - Placeholder Data File
 * SPEC-18 Phase 4: Realistic placeholder data following StateParkTemplateProps schema
 *
 * [PLACEHOLDER - Update in SPEC-21: Holly River Content Migration]
 *
 * This file provides realistic placeholder data for testing and development.
 * Real content will be migrated from official WV State Parks sources in SPEC-21.
 *
 * Park Overview:
 * - Location: Webster County, Mountain Lakes region
 * - Acreage: 8,294 acres
 * - Established: 1954
 * - Signature Feature: 63-foot Tecumseh Falls
 * - Facilities: 9 cabins, 88 campsites, picnic areas, playground
 * - Activities: Hiking, fishing, ranger programs, Junior Ranger
 *
 * @module data/state-parks/holly-river-sp
 */

import type { StateParkTemplateProps } from '../../types/state-park-template-types';
import {
  WV_STATE_PARKS_RESERVATION_URL,
  WV_STATE_PARKS_PHONE,
  WV_STATE_PARKS_MANAGING_AGENCY,
} from './shared-constants';

export const hollyRiverStatePark: StateParkTemplateProps = {
  // ============================================================================
  // HERO SECTION (Required)
  // ============================================================================
  hero: {
    name: 'Holly River State Park',
    heroImage: '/images/state-parks/holly-river/hero-tecumseh-falls.jpg',
    imagePosition: 'center',
    tagline: 'Mountain Wilderness Retreat',
    acreage: 8294,
    established: 1954,
    signatureFeature: '63-foot Tecumseh Falls',
    quickHighlights: [
      'West Virginia\'s second-largest state park',
      'Over 40 miles of hiking trails',
      '63-foot Tecumseh Falls waterfall',
      '9 rental cabins in mountain setting',
      'Trout fishing in Holly River',
      'Remote wilderness experience',
    ],
  },

  // ============================================================================
  // OVERVIEW SECTION (Required)
  // ============================================================================
  overview: {
    operatingHours: {
      general: 'Park open year-round, 6:00 AM to 10:00 PM',
      dayUse: 'Dawn to dusk',
      overnightCamping: true,
      seasonalHours: [
        {
          season: 'Summer Season',
          startDate: 'April 1',
          endDate: 'October 31',
          hours: [
            {
              day: 'monday',
              open: '06:00',
              close: '22:00',
              notes: 'Full services available',
            },
            {
              day: 'tuesday',
              open: '06:00',
              close: '22:00',
            },
            {
              day: 'wednesday',
              open: '06:00',
              close: '22:00',
            },
            {
              day: 'thursday',
              open: '06:00',
              close: '22:00',
            },
            {
              day: 'friday',
              open: '06:00',
              close: '22:00',
            },
            {
              day: 'saturday',
              open: '06:00',
              close: '22:00',
            },
            {
              day: 'sunday',
              open: '06:00',
              close: '22:00',
            },
          ],
        },
        {
          season: 'Winter Season',
          startDate: 'November 1',
          endDate: 'March 31',
          hours: [
            {
              day: 'monday',
              open: '07:00',
              close: '20:00',
              notes: 'Limited services - call ahead',
            },
            {
              day: 'tuesday',
              open: '07:00',
              close: '20:00',
            },
            {
              day: 'wednesday',
              open: '07:00',
              close: '20:00',
            },
            {
              day: 'thursday',
              open: '07:00',
              close: '20:00',
            },
            {
              day: 'friday',
              open: '07:00',
              close: '20:00',
            },
            {
              day: 'saturday',
              open: '07:00',
              close: '20:00',
            },
            {
              day: 'sunday',
              open: '07:00',
              close: '20:00',
            },
          ],
        },
      ],
      facilityHours: {
        'Campground Check-in': '3:00 PM - 9:00 PM',
        'Cabin Check-in': '4:00 PM - 8:00 PM (Friday/Saturday), 4:00 PM - 6:00 PM (Weekdays)',
        'Ranger Station': '8:00 AM - 4:00 PM (Seasonal)',
      },
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'No day-use fees. Overnight camping and cabin rentals require reservations.',
    },

    contact: {
      phone: '304-493-6353',
      email: 'holly.river@wv.gov',
      address: 'P.O. Box 70, Hacker Valley, WV 26222',
    },

    managingAgency: WV_STATE_PARKS_MANAGING_AGENCY,

    county: 'Webster County',
    region: 'Mountain Lakes',
    coordinates: {
      latitude: 38.6861,
      longitude: -80.4103,
    },
    nearestTown: 'Hacker Valley (8 miles)',
    distanceFromCity: '2 hours from Charleston, 3.5 hours from Pittsburgh',
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
        'All hiking trails',
        'Picnic areas',
      ],
      restrictions: [
        'Not allowed in cabins',
        'Must be leashed at all times',
        'Maximum 6-foot leash',
        'Owner responsible for waste cleanup',
      ],
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'Day-use areas are free. Overnight facilities require reservations and fees.',
    },

    parking: {
      available: true,
      capacity: 120,
      fees: 'Free',
      restrictions: [
        'Vehicles must park in designated areas only',
        'No overnight parking in day-use areas',
        'Trailer parking available at campground',
      ],
    },

    alcohol: {
      allowed: false,
      restrictions: [
        'No alcohol permitted in park',
        'State law prohibits alcohol in West Virginia state parks',
      ],
    },

    smoking: {
      allowed: false,
      designatedAreas: false,
      restrictions: [
        'Smoking prohibited in all park facilities',
        'No smoking on trails during fire season',
      ],
    },

    fires: {
      allowed: true,
      restrictions: [
        'Fires permitted only in designated fire rings',
        'No ground fires',
        'Firewood collection prohibited - purchase on-site or bring approved firewood',
        'Fires must be attended at all times',
        'Completely extinguish before leaving',
      ],
      firePits: true,
      seasonalBans: 'Fire restrictions may be imposed during dry conditions - check with rangers',
    },

    specialRestrictions: [
      'No hunting within park boundaries',
      'Fishing license required for anglers 15+',
      'No ATVs or motorized vehicles on trails',
      'No collecting plants, rocks, or wildlife',
      'Maximum stay: 14 consecutive days',
    ],

    quietHours: {
      enforced: true,
      start: '22:00',
      end: '07:00',
    },
  },

  // ============================================================================
  // FACILITIES SECTION
  // ============================================================================
  facilities: {
    lodging: {
      cabins: [
        {
          cabinNumber: 'Cabin 1',
          bedrooms: 1,
          bathrooms: 1,
          maxOccupancy: 4,
          kitchenType: 'full',
          hasFireplace: true,
          fireplaceType: 'stone',
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen with refrigerator',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Pots and pans',
            'Dishes and utensils',
            'Private bathroom',
            'Stone fireplace',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$95-$135/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
          description: 'Cozy one-bedroom cabin with stone fireplace, full kitchen, and mountain views. Perfect for couples or small families.',
        },
        {
          cabinNumber: 'Cabin 2',
          bedrooms: 2,
          bathrooms: 1,
          maxOccupancy: 6,
          kitchenType: 'full',
          hasFireplace: true,
          fireplaceType: 'stone',
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Cookware included',
            'Private bathroom',
            'Stone fireplace',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$105-$150/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
        {
          cabinNumber: 'Cabin 3',
          bedrooms: 2,
          bathrooms: 1,
          maxOccupancy: 6,
          kitchenType: 'full',
          hasFireplace: true,
          fireplaceType: 'stone',
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Cookware included',
            'Private bathroom',
            'Stone fireplace',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$105-$150/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
        {
          cabinNumber: 'Cabin 4',
          bedrooms: 3,
          bathrooms: 1.5,
          maxOccupancy: 8,
          kitchenType: 'full',
          hasFireplace: true,
          fireplaceType: 'stone',
          petFriendly: false,
          accessible: true,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Cookware included',
            'ADA-compliant bathroom',
            'Stone fireplace',
            'Wheelchair ramp',
            'Wider doorways',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$120-$175/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
          description: 'ADA-accessible three-bedroom cabin with wheelchair ramp, wider doorways, and accessible bathroom.',
        },
      ],
    },

    camping: {
      campgrounds: [
        {
          name: 'Main Campground',
          siteCount: 88,
          hookupTypes: ['electric', 'none'],
          bathhouse: true,
          dumpStation: true,
          maxRVLength: '40 feet',
          season: 'April 1 - November 30',
          amenities: [
            'Hot showers',
            'Flush toilets',
            'Laundry facilities',
            'Picnic table at each site',
            'Fire ring at each site',
            'Nearby playground',
          ],
          accessible: true,
          accessibleSiteCount: 4,
          fees: '$25-$32/night (electric sites), $20/night (tent sites)',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
      ],
    },

    picnicAreas: [
      {
        type: 'pavilion',
        name: 'Riverfront Pavilion',
        shelterCount: 1,
        capacity: 50,
        reservable: true,
        grills: true,
        electricity: true,
        amenities: [
          'Tables for 50',
          'Nearby restrooms',
          'Playground access',
          'River views',
        ],
        accessible: true,
        reservationUrl: WV_STATE_PARKS_RESERVATION_URL,
        rentalFee: '$50/day',
        nearParking: true,
      },
      {
        type: 'picnic_area',
        name: 'General Day-Use Picnic Area',
        shelterCount: 8,
        capacity: 200,
        reservable: false,
        grills: true,
        electricity: false,
        amenities: [
          'First-come, first-served',
          'Scattered picnic tables',
          'Grills at most sites',
          'Restroom facilities',
        ],
        accessible: true,
        nearParking: true,
        description: 'Open picnic areas throughout the park with tables, grills, and beautiful mountain views.',
      },
    ],

    playgrounds: [
      {
        name: 'Main Playground',
        ageGroups: ['2-5 years', '5-12 years'],
        equipment: [
          'Swing set',
          'Slide',
          'Climbing structure',
          'Sandbox',
          'See-saw',
        ],
        surfaceType: 'wood_chips',
        shade: true,
        accessibility: false,
        nearRestrooms: true,
        nearParking: true,
      },
    ],

    otherAmenities: [
      {
        type: 'gift_shop',
        name: 'Park Gift Shop',
        description: 'Small gift shop with local crafts, camping supplies, and firewood',
        fees: 'Varies by item',
        seasonal: true,
        season: 'May through October',
      },
    ],
  },

  // ============================================================================
  // ACTIVITIES & PROGRAMS
  // ============================================================================
  activitiesPrograms: {
    rangerPrograms: [
      {
        name: 'Waterfall Walk',
        type: 'ranger_led',
        description: 'Join a park ranger on a guided hike to beautiful Tecumseh Falls. Learn about local geology, flora, and fauna along the way.',
        schedule: 'Saturdays at 10:00 AM, June through August',
        duration: '2 hours',
        ageGroup: 'All ages welcome',
        reservationRequired: false,
        accessible: false,
        maxParticipants: 20,
      },
      {
        name: 'Mountain Wildlife Talk',
        type: 'ranger_led',
        description: 'Discover the diverse wildlife that calls Holly River home, from black bears to songbirds. Evening program at the amphitheater.',
        schedule: 'Friday evenings at 7:00 PM, July and August',
        duration: '45 minutes',
        ageGroup: 'All ages',
        reservationRequired: false,
        accessible: true,
      },
      {
        name: 'Trout Fishing Basics',
        type: 'educational',
        description: 'Learn fly fishing techniques and trout identification from experienced anglers. Fishing license required.',
        schedule: 'Select Saturdays in May and June',
        duration: '3 hours',
        ageGroup: '10 years and up',
        reservationRequired: true,
        accessible: false,
        maxParticipants: 12,
      },
    ],

    juniorRanger: {
      name: 'Junior Ranger Program',
      ageRange: '5-12 years',
      activities: [
        'Complete activity booklet',
        'Attend ranger program',
        'Hike to Tecumseh Falls',
        'Learn Leave No Trace principles',
        'Wildlife observation',
      ],
      badgeEligibility: true,
      duration: 'Self-paced',
      cost: 'Free',
      description: 'Young visitors can earn an official Junior Ranger badge by completing activities, attending programs, and exploring the park.',
    },

    recreationalActivities: [
      {
        type: 'hiking',
        name: 'Hiking',
        description: 'Over 40 miles of trails ranging from easy nature walks to challenging backcountry treks',
        difficulty: 'easy-to-difficult',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'fishing',
        name: 'Trout Fishing',
        description: 'Holly River is stocked with trout. Valid WV fishing license required for ages 15+.',
        equipment: 'Bring your own rod or rent from nearby outfitters',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'wildlife_viewing',
        name: 'Wildlife Watching',
        description: 'Spot black bears, white-tailed deer, wild turkey, and over 100 bird species',
        season: ['spring', 'summer', 'fall', 'winter'],
      },
      {
        type: 'photography',
        name: 'Nature Photography',
        description: 'Capture stunning waterfalls, mountain vistas, and wildflower displays',
        season: ['spring', 'summer', 'fall'],
      },
    ],
  },

  // ============================================================================
  // TRAIL SYSTEM
  // ============================================================================
  trails: {
    totalMileage: 42,
    trails: [
      {
        name: 'Tecumseh Falls Trail',
        slug: 'tecumseh-falls-trail',
        distance: 1.6,
        difficulty: 'moderate',
        routeType: 'out-and-back',
        elevationGain: 320,
        description: 'Most popular trail leading to the spectacular 63-foot Tecumseh Falls. Moderate climb with stone steps and scenic overlooks.',
        trailhead: {
          name: 'Main Trailhead near Campground',
          coordinates: {
            latitude: 38.6870,
            longitude: -80.4115,
          },
          parking: true,
          parkingCapacity: 20,
        },
        highlights: [
          '63-foot waterfall',
          'Stone stairway',
          'Rhododendron groves',
          'Mountain views',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Potato Knob Trail',
        slug: 'potato-knob-trail',
        distance: 8.2,
        difficulty: 'difficult',
        routeType: 'loop',
        elevationGain: 1200,
        description: 'Challenging backcountry loop climbing to scenic overlooks. Remote wilderness experience with minimal traffic.',
        trailhead: {
          name: 'Upper Parking Area',
          coordinates: {
            latitude: 38.6850,
            longitude: -80.4080,
          },
          parking: true,
          parkingCapacity: 15,
        },
        highlights: [
          'Panoramic mountain views',
          'Old-growth forest',
          'Solitude',
          'Wildlife habitat',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Reverie Trail',
        slug: 'reverie-trail',
        distance: 2.8,
        difficulty: 'easy',
        routeType: 'loop',
        elevationGain: 150,
        description: 'Easy loop through hardwood forest along Holly River. Great for families and beginner hikers.',
        trailhead: {
          name: 'Campground Trailhead',
          coordinates: {
            latitude: 38.6865,
            longitude: -80.4100,
          },
          parking: true,
          parkingCapacity: 10,
        },
        highlights: [
          'River views',
          'Wildflowers in spring',
          'Gentle terrain',
          'Bird watching',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Nature Trail',
        slug: 'nature-trail',
        distance: 0.5,
        difficulty: 'easy',
        routeType: 'loop',
        elevationGain: 30,
        description: 'Short, accessible nature trail with interpretive signs. Suitable for all ages and abilities.',
        trailhead: {
          name: 'Visitor Parking',
          coordinates: {
            latitude: 38.6862,
            longitude: -80.4105,
          },
          parking: true,
          parkingCapacity: 30,
        },
        highlights: [
          'Interpretive signs',
          'Accessible surface',
          'Family-friendly',
          'Educational stops',
        ],
        surface: 'gravel',
        accessible: true,
        accessibilityInfo: {
          name: 'Nature Trail',
          wheelchairAccessible: true,
          surface: 'gravel',
          width: 48,
          grade: '3%',
          obstacles: ['Minor tree roots on edges'],
          restingIntervals: 'Benches every 200 feet',
          details: 'Compact gravel surface suitable for wheelchairs and strollers',
        },
        dogsAllowed: true,
        leashRequired: true,
      },
    ],
    trailMapUrl: 'https://wvstateparks.com/park/holly-river-state-park/trail-map',
  },

  // ============================================================================
  // SCENIC OVERLOOKS
  // ============================================================================
  overlooks: {
    overlooks: [
      {
        name: 'Tecumseh Falls Overlook',
        description: 'View the 63-foot waterfall from observation platform',
        accessible: false,
        bestTimes: ['Spring runoff (April-May)', 'Fall foliage (October)'],
        parkingAvailable: false,
        distanceFromParking: '0.8 mile hike from trailhead',
      },
      {
        name: 'Potato Knob Summit',
        description: 'Panoramic mountain views from highest point in park',
        accessible: false,
        bestTimes: ['Sunrise', 'Fall foliage'],
        parkingAvailable: false,
        distanceFromParking: '4.1 mile hike',
        elevation: '3,460 feet',
      },
    ],
  },

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================
  accessibility: {
    statement: 'Holly River State Park strives to provide accessible facilities for all visitors. ADA-compliant features are available throughout the park.',
    features: [
      'accessible_cabin',
      'accessible_campsite',
      'accessible_restroom',
      'accessible_parking',
      'accessible_trail',
      'accessible_picnic',
    ],
    accessibleTrails: [
      'Nature Trail (0.5 miles, gravel surface)',
    ],
    accessibleFacilities: [
      'Cabin 4 (ADA-compliant)',
      '4 accessible campsites',
      'Accessible restrooms at campground',
      'Accessible picnic areas',
    ],
    serviceAnimalPolicy: {
      allowed: true,
      restrictions: [
        'Service animals must be under handler control',
        'Handler responsible for waste cleanup',
      ],
      reliefAreas: [
        'Designated areas near parking lots',
        'Grassy areas near accessible facilities',
      ],
      adaCompliance: 'Holly River State Park complies with ADA regulations regarding service animals.',
    },
    advanceNoticeRequired: false,
    accommodationsContact: '304-493-6353',
  },

  // ============================================================================
  // RESERVATIONS
  // ============================================================================
  reservations: {
    cabins: {
      bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
      bookingWindow: 'Up to 12 months in advance',
      cancellationPolicy: 'Full refund if cancelled 14+ days before arrival. 50% refund 7-13 days. No refund within 7 days.',
      fees: [
        {
          cabinType: '1-Bedroom Cabin',
          priceRange: '$95-$135/night',
          season: 'Varies by season',
        },
        {
          cabinType: '2-Bedroom Cabin',
          priceRange: '$105-$150/night',
          season: 'Varies by season',
        },
        {
          cabinType: '3-Bedroom Cabin (ADA)',
          priceRange: '$120-$175/night',
          season: 'Varies by season',
        },
      ],
    },
    camping: {
      bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
      bookingWindow: 'Up to 6 months in advance',
      cancellationPolicy: 'Full refund if cancelled 7+ days before arrival. No refund within 7 days.',
      fees: [
        {
          siteType: 'Electric Site',
          price: '$25-$32/night',
          season: 'April 1 - November 30',
        },
        {
          siteType: 'Tent Site',
          price: '$20/night',
          season: 'April 1 - November 30',
        },
      ],
    },
    groupFacilities: {
      bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
      fees: [
        {
          facilityType: 'Riverfront Pavilion',
          price: '$50/day',
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
      tier: 'immediate',
      priority: 1,
      contacts: [
        {
          name: 'Park Rangers',
          phone: '304-493-6353',
          available: '8:00 AM - 4:00 PM daily (seasonal)',
          type: 'first-responder',
        },
        {
          name: 'Webster County 911',
          phone: '911',
          available: '24/7',
          type: 'emergency-services',
        },
      ],
    },
    {
      tier: 'local',
      priority: 2,
      contacts: [
        {
          name: 'Webster County Sheriff',
          phone: '304-847-5355',
          available: '24/7',
          type: 'law-enforcement',
        },
        {
          name: 'Stonewall Jackson Memorial Hospital',
          phone: '304-269-8000',
          available: '24/7',
          type: 'hospital',
          location: 'Weston, WV (45 miles)',
        },
      ],
    },
  ],

  // ============================================================================
  // SEO METADATA
  // ============================================================================
  seo: {
    title: 'Holly River State Park - Mountain Wilderness & Waterfalls',
    description: 'Explore 8,294 acres of WV mountain wilderness. See 63-foot Tecumseh Falls, stay in cabins, camp, and hike 40+ miles of trails in Webster County.',
    keywords: [
      'Holly River State Park',
      'Tecumseh Falls',
      'WV state parks',
      'Webster County camping',
      'mountain cabins West Virginia',
      'hiking trails',
      'waterfall hikes',
      'family camping WV',
    ],
    faqItems: [
      {
        '@type': 'Question',
        name: 'How tall is Tecumseh Falls at Holly River State Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tecumseh Falls is 63 feet tall, making it one of the most spectacular waterfalls in West Virginia state parks. The falls are accessible via a 1.6-mile moderate hiking trail.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Holly River State Park have cabins?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Holly River offers 9 rental cabins ranging from 1 to 3 bedrooms. All cabins feature full kitchens, stone fireplaces, and mountain views. One cabin is ADA-accessible.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are dogs allowed at Holly River State Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dogs are welcome on all trails and in the campground if kept on a 6-foot leash. Pets are not permitted in cabins or other overnight lodging facilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many miles of hiking trails are at Holly River?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Holly River State Park has over 40 miles of hiking trails ranging from easy 0.5-mile nature walks to challenging 8+ mile backcountry loops.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I fish at Holly River State Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Holly River is stocked with trout and offers excellent fishing opportunities. A valid West Virginia fishing license is required for anglers 15 years and older.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Holly River State Park open year-round?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The park is open year-round for day-use. Cabins are available year-round. Camping is seasonal, typically April 1 through November 30.',
        },
      },
    ],
  },

  // ============================================================================
  // RELATED CONTENT
  // ============================================================================
  nearbyAttractions: [
    {
      name: 'Kumbrabow State Forest',
      type: 'State Forest',
      distance: '12 miles',
      description: 'Primitive camping and hiking in high-elevation spruce forest',
      link: 'https://wvstateparks.com/park/kumbrabow-state-forest',
    },
    {
      name: 'Cranberry Glades Botanical Area',
      type: 'Natural Area',
      distance: '45 miles',
      description: 'Unique northern bog ecosystem with boardwalk trails',
    },
  ],

  relatedCategories: [
    {
      name: 'West Virginia State Parks',
      slug: 'state-parks',
      description: 'Explore all WV state parks',
    },
    {
      name: 'Camping in West Virginia',
      slug: 'camping',
      description: 'Find camping destinations',
    },
    {
      name: 'Waterfall Hikes',
      slug: 'waterfalls',
      description: 'Discover WV waterfalls',
    },
  ],

  showRelatedShop: true,
};
