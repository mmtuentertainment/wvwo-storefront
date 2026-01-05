/**
 * Watoga State Park - Placeholder Data File
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
 * @module data/state-parks/watoga-sp
 */

import type { StateParkTemplateProps } from '../../types/state-park-template-types';
import {
  WV_STATE_PARKS_RESERVATION_URL,
  WV_STATE_PARKS_PHONE,
  WV_STATE_PARKS_MANAGING_AGENCY,
} from './shared-constants';

export const watogaStatePark: StateParkTemplateProps = {
  // ============================================================================
  // HERO SECTION (Required)
  // ============================================================================
  hero: {
    name: 'Watoga State Park',
    heroImage: '/images/state-parks/watoga/hero-lake-lodge.jpg',
    imagePosition: 'center',
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
              day: 'monday',
              open: '00:00',
              close: '23:59',
              notes: 'Full services - all facilities open',
            },
            {
              day: 'tuesday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'wednesday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'thursday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'friday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'saturday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'sunday',
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
              day: 'monday',
              open: '00:00',
              close: '23:59',
              notes: 'Most facilities open - call for specific hours',
            },
            {
              day: 'tuesday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'wednesday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'thursday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'friday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'saturday',
              open: '00:00',
              close: '23:59',
            },
            {
              day: 'sunday',
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
      latitude: 38.1167,
      longitude: -80.1500,
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
  // FACILITIES SECTION (Resort Emphasis)
  // ============================================================================
  facilities: {
    lodging: {
      lodges: [
        {
          name: 'Watoga Lake Lodge',
          rooms: 30,
          roomTypes: [
            'Standard Room (2 double beds)',
            'King Room',
            'Accessible Room',
          ],
          amenities: [
            'Full-service restaurant',
            'Conference center',
            'Wi-Fi in lodge',
            'Daily housekeeping',
            'Mini-refrigerator',
            'Coffee maker',
            'Cable TV',
            'Climate control',
            'Private bathrooms',
            'Lake views (select rooms)',
          ],
          hasRestaurant: true,
          hasConferenceFacilities: true,
          description: 'Historic Watoga Lake Lodge offers comfortable rooms with modern amenities and stunning lake views. On-site restaurant serves breakfast, lunch, and dinner.',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
          priceRange: '$95-$150/night',
          seasonalOperation: 'Year-round',
        },
      ],
      cabins: [
        {
          cabinNumber: 'Standard Cabin 1-20',
          name: 'Standard Cabins',
          bedrooms: 2,
          bathrooms: 1,
          maxOccupancy: 6,
          kitchenType: 'full',
          hasFireplace: false,
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Cookware',
            'Private bathroom',
            'Screened porch',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$110-$165/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
        {
          cabinNumber: 'Deluxe Cabin 21-28',
          name: 'Deluxe Cabins',
          bedrooms: 3,
          bathrooms: 2,
          maxOccupancy: 8,
          kitchenType: 'full',
          hasFireplace: true,
          fireplaceType: 'gas',
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Gas fireplace',
            'Two bathrooms',
            'Electric heat',
            'Hot water',
            'Linens provided',
            'Dishwasher',
            'Microwave',
            'Large screened porch',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$135-$195/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
        {
          cabinNumber: 'Pet-Friendly Cabin 29-31',
          name: 'Pet-Friendly Cabins',
          bedrooms: 2,
          bathrooms: 1,
          maxOccupancy: 6,
          kitchenType: 'full',
          hasFireplace: false,
          petFriendly: true,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen',
            'Pet-friendly (fee applies)',
            'Fenced yard area',
            'Electric heat',
            'Hot water',
            'Linens provided',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$120-$175/night (plus $25 pet fee)',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
          description: 'Limited pet-friendly cabins available. Maximum 2 pets, additional fee applies. Pets must be leashed.',
        },
        {
          cabinNumber: 'Accessible Cabin 32-33',
          name: 'ADA Accessible Cabins',
          bedrooms: 2,
          bathrooms: 1,
          maxOccupancy: 6,
          kitchenType: 'full',
          hasFireplace: false,
          petFriendly: false,
          accessible: true,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Wheelchair ramp',
            'Wider doorways',
            'Roll-in shower',
            'Accessible kitchen',
            'Grab bars',
            'Lower light switches',
            'Visual alarms',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: '$110-$165/night',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
      ],
    },

    camping: {
      campgrounds: [
        {
          name: 'Riverside Campground',
          siteCount: 88,
          hookupTypes: ['electric', 'water', 'sewer'],
          bathhouse: true,
          dumpStation: true,
          maxRVLength: '45 feet',
          season: 'April 1 - October 31',
          amenities: [
            'Full hookups available',
            'Hot showers',
            'Flush toilets',
            'Laundry facilities',
            'Camp store',
            'Playground',
            'Picnic tables',
            'Fire rings',
          ],
          accessible: true,
          accessibleSiteCount: 6,
          fees: '$28-$38/night (full hookup), $25/night (electric only)',
          bookingUrl: WV_STATE_PARKS_RESERVATION_URL,
        },
      ],
    },

    pools: [
      {
        type: 'outdoor',
        name: 'Watoga Swimming Pool',
        depth: '3-8 feet',
        features: [
          'Olympic-size pool',
          'Diving board',
          'Lap lanes',
          'Shallow wading area',
          'Sundeck',
        ],
        lifeguard: true,
        seasonalOperation: 'Memorial Day - Labor Day',
        fees: '$5/person, $15/family',
        accessible: true,
        accessibilityFeatures: [
          'Pool lift',
          'Accessible changing rooms',
          'Nearby accessible parking',
        ],
      },
    ],

    visitorCenters: [
      {
        name: 'Brooks Memorial Arboretum Nature Center',
        type: 'nature_center',
        exhibits: [
          'Tree species identification displays',
          'Local forest ecology',
          'Wildlife dioramas',
          'Historic CCC exhibits',
          'Seasonal wildflower displays',
        ],
        programs: [
          'Guided arboretum walks',
          'Tree identification workshops',
          'Children\'s nature programs',
        ],
        staffed: true,
        giftShop: false,
        restrooms: true,
        accessibility: 'Fully accessible facility',
        contact: '304-799-4087',
        admissionFee: 'Free',
      },
    ],

    picnicAreas: [
      {
        type: 'pavilion',
        name: 'Lakeside Pavilion',
        shelterCount: 1,
        capacity: 100,
        reservable: true,
        grills: true,
        electricity: true,
        amenities: [
          'Lake views',
          'Tables for 100',
          'Nearby restrooms',
          'Playground access',
          'Beach access',
        ],
        accessible: true,
        reservationUrl: WV_STATE_PARKS_RESERVATION_URL,
        rentalFee: '$75/day',
        nearParking: true,
      },
    ],

    playgrounds: [
      {
        name: 'Campground Playground',
        ageGroups: ['2-5 years', '5-12 years'],
        equipment: [
          'Swing sets',
          'Slides',
          'Climbing structure',
          'Monkey bars',
          'Spring riders',
        ],
        surfaceType: 'rubber',
        shade: true,
        accessibility: true,
        accessibilityFeatures: [
          'Accessible play equipment',
          'Transfer platforms',
          'Sensory play elements',
        ],
        nearRestrooms: true,
        nearParking: true,
      },
    ],

    otherAmenities: [
      {
        type: 'golf_course',
        name: 'Watoga Golf Course',
        description: '18-hole championship course designed by renowned architect. Par 72, 6,200 yards.',
        fees: '$25-$45 per round (seasonal rates)',
        seasonal: true,
        season: 'April - October',
        details: {
          holes: '18',
          par: '72',
          yardage: '6,200',
          cartRental: '$15',
          clubRental: '$10',
        },
      },
      {
        type: 'equipment_rental',
        name: 'Boat Rentals',
        description: 'Paddleboat, kayak, and canoe rentals on Watoga Lake',
        fees: '$10-$25/hour',
        seasonal: true,
        season: 'May - September',
        details: {
          paddleboats: '$15/hour',
          kayaks: '$10/hour',
          canoes: '$12/hour',
        },
      },
      {
        type: 'gift_shop',
        name: 'Lodge Gift Shop',
        description: 'Local crafts, camping supplies, WV souvenirs, and snacks',
        fees: 'Varies',
        seasonal: false,
        season: 'Year-round',
      },
      {
        type: 'game_room',
        name: 'Recreation Room',
        description: 'Indoor recreation room in lodge with board games, table tennis, pool table',
        fees: 'Free for lodge guests',
      },
    ],
  },

  // ============================================================================
  // ACTIVITIES & PROGRAMS (Extensive Programming)
  // ============================================================================
  activitiesPrograms: {
    rangerPrograms: [
      {
        name: 'Arboretum Discovery Walk',
        type: 'ranger_led',
        description: 'Explore Brooks Memorial Arboretum with a naturalist. Learn to identify 350+ tree species and understand forest ecology.',
        schedule: 'Daily at 10:00 AM, May through October',
        duration: '1.5 hours',
        ageGroup: 'All ages',
        reservationRequired: false,
        accessible: true,
      },
      {
        name: 'Evening Wildlife Program',
        type: 'ranger_led',
        description: 'Learn about black bears, white-tailed deer, and other WV wildlife. Slide presentation and Q&A.',
        schedule: 'Saturday evenings at 7:30 PM, June-August',
        duration: '45 minutes',
        ageGroup: 'All ages',
        reservationRequired: false,
        accessible: true,
      },
      {
        name: 'Fly Fishing Workshop',
        type: 'educational',
        description: 'Hands-on fly fishing instruction covering casting, knots, and trout behavior. Equipment provided.',
        schedule: 'Select Saturdays in May and September',
        duration: '3 hours',
        ageGroup: '12+',
        reservationRequired: true,
        accessible: false,
        maxParticipants: 10,
      },
      {
        name: 'Birding by Ear',
        type: 'ranger_led',
        description: 'Early morning bird walk focusing on identification by song. Bring binoculars.',
        schedule: 'Sundays at 7:00 AM, May and June',
        duration: '2 hours',
        ageGroup: 'All ages',
        reservationRequired: false,
        accessible: false,
      },
    ],

    educationalPrograms: [
      {
        name: 'Nature Photography Workshop',
        topic: 'Outdoor Photography',
        description: 'Learn composition, lighting, and camera settings for landscape and wildlife photography. Bring your camera.',
        instructor: 'Professional nature photographer',
        materialsProvided: false,
        skillLevel: 'beginner',
        cost: '$40/person',
        schedule: 'Two weekends in June and September',
      },
      {
        name: 'Tree Identification Class',
        topic: 'Forest Botany',
        description: 'Classroom and field instruction on identifying trees by leaves, bark, and form. Focus on Appalachian species.',
        materialsProvided: true,
        skillLevel: 'all',
        cost: '$25/person',
        schedule: 'Monthly, April-October',
      },
    ],

    juniorRanger: {
      name: 'Junior Ranger Program',
      ageRange: '5-12 years',
      activities: [
        'Complete activity booklet',
        'Attend ranger program',
        'Arboretum scavenger hunt',
        'Wildlife observation',
        'Leave No Trace training',
        'Fishing basics (optional)',
      ],
      badgeEligibility: true,
      duration: 'Self-paced or 2-day guided program',
      cost: 'Free (self-paced), $15 (guided program)',
      description: 'Earn a Junior Ranger badge by exploring Watoga\'s forests, arboretum, and trails. Self-paced or join guided weekend program.',
    },

    specialEvents: [
      {
        name: 'Spring Wildflower Weekend',
        date: 'Late April',
        description: 'Guided wildflower hikes, photography walks, and botanical workshops celebrating Appalachian spring blooms.',
        fees: 'Free programs, some workshops $15-$25',
        registrationRequired: false,
        eventType: 'Festival',
      },
      {
        name: 'Watoga Lake Festival',
        date: 'July 4th Weekend',
        description: 'Family festival with live music, craft vendors, children\'s activities, fishing tournament, and fireworks.',
        fees: 'Free admission',
        registrationRequired: false,
        eventType: 'Festival',
      },
    ],

    recreationalActivities: [
      {
        type: 'golf',
        name: 'Championship Golf',
        description: '18-hole championship course, par 72. Cart and club rentals available.',
        fees: '$25-$45 per round',
      },
      {
        type: 'swimming',
        name: 'Olympic Pool',
        description: 'Olympic-size outdoor pool with diving board and lap lanes',
        fees: '$5/person, $15/family',
      },
      {
        type: 'boating',
        name: 'Lake Boating',
        description: 'Paddleboat, kayak, and canoe rentals on Watoga Lake',
        equipment: 'Rentals available at boat dock',
        fees: '$10-$25/hour',
      },
      {
        type: 'fishing',
        name: 'Lake and Stream Fishing',
        description: 'Trout fishing in stocked lake and streams. Bass fishing in Watoga Lake.',
        equipment: 'Bring your own or purchase at camp store',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'hiking',
        name: 'Mountain Hiking',
        description: 'Over 30 miles of trails including arboretum trails and backcountry routes',
        difficulty: 'easy-to-difficult',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'wildlife_viewing',
        name: 'Wildlife Observation',
        description: 'Black bears, deer, wild turkey, and over 200 bird species',
        season: ['spring', 'summer', 'fall', 'winter'],
      },
    ],
  },

  // ============================================================================
  // TRAIL SYSTEM
  // ============================================================================
  trails: {
    totalMileage: 32,
    trails: [
      {
        name: 'Arboretum Trail',
        slug: 'arboretum-trail',
        distance: 1.2,
        difficulty: 'easy',
        routeType: 'loop',
        elevationGain: 80,
        description: 'Paved interpretive trail through Brooks Memorial Arboretum featuring 350+ tree species with educational signage.',
        trailhead: {
          name: 'Arboretum Parking',
          coordinates: {
            latitude: 38.1175,
            longitude: -80.1485,
          },
          parking: true,
          parkingCapacity: 40,
        },
        highlights: [
          '350+ tree species',
          'Interpretive signs',
          'Paved surface',
          'Benches throughout',
        ],
        surface: 'paved',
        accessible: true,
        accessibilityInfo: {
          name: 'Arboretum Trail',
          wheelchairAccessible: true,
          surface: 'paved',
          width: 60,
          grade: '4%',
          restingIntervals: 'Benches every 200 feet',
          details: 'Fully paved, ADA-compliant trail with educational signage at accessible height',
        },
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Lake Trail',
        slug: 'lake-trail',
        distance: 3.5,
        difficulty: 'easy',
        routeType: 'loop',
        elevationGain: 120,
        description: 'Scenic loop around Watoga Lake with views, fishing access, and wildlife observation opportunities.',
        trailhead: {
          name: 'Lodge Parking',
          coordinates: {
            latitude: 38.1170,
            longitude: -80.1495,
          },
          parking: true,
          parkingCapacity: 60,
        },
        highlights: [
          'Lake views',
          'Fishing piers',
          'Wildlife viewing',
          'Gentle terrain',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Jesse\'s Cove Trail',
        slug: 'jesses-cove-trail',
        distance: 5.8,
        difficulty: 'moderate',
        routeType: 'out-and-back',
        elevationGain: 650,
        description: 'Popular trail climbing to scenic overlook with views of Greenbrier Valley.',
        trailhead: {
          name: 'Jesse\'s Cove Trailhead',
          coordinates: {
            latitude: 38.1150,
            longitude: -80.1520,
          },
          parking: true,
          parkingCapacity: 20,
        },
        highlights: [
          'Panoramic valley views',
          'Mountain laurel in June',
          'Wildlife sightings',
          'Overlook platform',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
    ],
    trailMapUrl: 'https://wvstateparks.com/park/watoga-state-park/trail-map',
  },

  // ============================================================================
  // SCENIC OVERLOOKS
  // ============================================================================
  overlooks: {
    overlooks: [
      {
        name: 'Jesse\'s Cove Overlook',
        description: 'Panoramic views of Greenbrier Valley from observation platform',
        accessible: false,
        bestTimes: ['Sunrise', 'Fall foliage (mid-October)', 'Clear winter days'],
        parkingAvailable: false,
        distanceFromParking: '2.9 mile hike',
        elevation: '3,200 feet',
      },
    ],
  },

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
      tier: 'immediate',
      priority: 1,
      contacts: [
        {
          name: 'Park Rangers',
          phone: '304-799-4087',
          available: '8:00 AM - 4:00 PM daily',
          type: 'first-responder',
        },
        {
          name: 'Pocahontas County 911',
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
          name: 'Pocahontas County Sheriff',
          phone: '304-799-4567',
          available: '24/7',
          type: 'law-enforcement',
        },
        {
          name: 'Pocahontas Memorial Hospital',
          phone: '304-799-7400',
          available: '24/7',
          type: 'hospital',
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
        '@type': 'Question',
        name: 'Does Watoga State Park have a lodge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Watoga Lake Lodge offers 30 comfortable rooms with modern amenities. The lodge features an on-site restaurant serving three meals daily, plus a gift shop and conference facilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Brooks Memorial Arboretum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brooks Memorial Arboretum is a 350+ tree species collection at Watoga State Park with paved, accessible trails and educational signage. It\'s one of the finest arboretums in West Virginia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Watoga have a golf course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Watoga features an 18-hole championship golf course (par 72, 6,200 yards) open April through October. Cart and club rentals available.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are pets allowed at Watoga State Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pets are welcome in campgrounds, on trails, and in select pet-friendly cabins (additional fee applies). Pets not allowed in lodge rooms or restaurant.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many cabins does Watoga State Park have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Watoga offers 33 rental cabins including standard, deluxe, pet-friendly, and ADA-accessible options. All cabins feature full kitchens and modern amenities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Watoga State Park accessible for wheelchairs?',
        acceptedAnswer: {
          '@type': 'Answer',
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
