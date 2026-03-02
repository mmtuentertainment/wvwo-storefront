/**
 * Stonewall Resort State Park - Placeholder Data File
 * SPEC-25 Phase: Realistic placeholder data following StateParkTemplateProps schema
 *
 * [PLACEHOLDER - Real content from SPEC-25 research]
 *
 * Park Overview:
 * - Location: Roanoke, Lewis County, West Virginia
 * - Acreage: 1,736 acres
 * - Established: Part of Stonewall Jackson Lake project
 * - Signature Feature: AAA Four Diamond resort with Arnold Palmer golf course
 * - Facilities: 198 lodge rooms, 10 cottages, Briar Point campground (179 sites)
 * - Activities: Golf, marina (374 slips), spa, hiking, fishing, boating
 *
 * @module data/state-parks/stonewall-resort
 */

import type { StateParkTemplateProps } from '../../types/state-park-template-types';
import {
  WV_STATE_PARKS_RESERVATION_URL,
  WV_STATE_PARKS_PHONE,
  WV_STATE_PARKS_MANAGING_AGENCY,
} from './shared-constants';

export const stonewallResort: StateParkTemplateProps = {
  // ============================================================================
  // HERO SECTION (Required)
  // ============================================================================
  hero: {
    name: 'Stonewall Resort State Park',
    heroImage: '/images/state-parks/stonewall-resort/hero-lodge.webp',
    imagePosition: 'center',
    tagline: 'AAA Four Diamond Lakeside Resort',
    acreage: 1736,
    established: 2003,
    signatureFeature: 'Arnold Palmer Signature Golf Course',
    quickHighlights: [
      'AAA Four Diamond rated lodge',
      '18-hole Arnold Palmer golf course',
      'West Virginia\'s largest marina (374 slips)',
      'On Stonewall Jackson Lake (2,650 acres)',
      '198 lodge rooms + 10 lakeside cottages',
      'Full-service Mtn. Laurel Spa',
    ],
  },

  // ============================================================================
  // OVERVIEW SECTION (Required)
  // ============================================================================
  overview: {
    operatingHours: {
      general: 'Resort and park open year-round',
      dayUse: 'Lake access dawn to dusk',
      overnightCamping: true,
      seasonalHours: [
        {
          season: 'Year-Round Resort Operations',
          startDate: 'January 1',
          endDate: 'December 31',
          hours: [
            {
              day: 'monday',
              open: '00:00',
              close: '23:59',
              notes: 'Resort lodge open 24/7',
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
          season: 'Marina Season',
          startDate: 'April 2',
          endDate: 'Late Fall',
          hours: [
            {
              day: 'monday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'tuesday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'wednesday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'thursday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'friday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'saturday',
              open: '09:00',
              close: '17:00',
            },
            {
              day: 'sunday',
              open: '09:00',
              close: '17:00',
            },
          ],
        },
      ],
      facilityHours: {
        'Lodge Check-in': '4:00 PM',
        'Lodge Check-out': '11:00 AM',
        'Cottage Check-in': '4:00 PM',
        'Cottage Check-out': '11:00 AM',
        'TJ Muskies Restaurant': 'Breakfast, lunch, and dinner daily',
        'Golf Pro Shop': 'Daily during golf season',
        'Mtn. Laurel Spa': 'Year-round - call 304-269-7400',
      },
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'Lake access and USACE areas are free. Resort amenities and lodging require reservations and fees.',
    },

    contact: {
      phone: '304-269-7400',
      email: undefined,
      address: '940 Resort Drive, Roanoke, WV 26447',
    },

    managingAgency: WV_STATE_PARKS_MANAGING_AGENCY,

    county: 'Lewis County',
    region: 'Mountain Lakes',
    coordinates: {
      lat: 38.9850,
      lng: -80.4467,
    },
    nearestTown: 'Roanoke (3 miles)',
    distanceFromCity: '1.5 hours from Charleston, 2.5 hours from Pittsburgh',
  },

  // ============================================================================
  // REGULATIONS (Required)
  // ============================================================================
  regulations: {
    pets: {
      allowed: true,
      leashRequired: true,
      petFriendlyAreas: [
        'Briar Point Campground',
        'Hiking trails',
        'Lake shore areas',
      ],
      restrictions: [
        'NOT allowed in lodge rooms or cottages',
        'Must be leashed at all times (6-foot leash maximum)',
        'Owner responsible for waste cleanup',
        'Service animals allowed in all facilities',
      ],
    },

    dayUseFees: {
      required: false,
      amount: 'Free',
      details: 'USACE lake areas, boat ramps, and trails are free. Resort facilities require fees.',
    },

    parking: {
      available: true,
      capacity: 500,
      fees: 'Free',
      restrictions: [
        'Day-use parking at USACE boat ramps',
        'Resort guest parking at lodge',
        'Campground parking at sites',
        'Marina parking for slip renters',
      ],
    },

    alcohol: {
      allowed: false,
      restrictions: [
        'No alcohol in West Virginia state parks',
        'Resort dining areas serve alcohol (licensed premises)',
      ],
    },

    smoking: {
      allowed: false,
      designatedAreas: false,
      restrictions: [
        'Smoking prohibited in all state park facilities',
        'Resort has designated smoking areas outside buildings',
      ],
    },

    fires: {
      allowed: true,
      restrictions: [
        'Fires permitted only in designated fire rings at campground',
        'No ground fires',
        'Firewood collection prohibited - purchase on-site',
        'Fires must be attended at all times',
        'Completely extinguish before leaving',
      ],
      firePits: true,
      seasonalBans: 'Fire restrictions may be imposed during dry conditions',
    },

    specialRestrictions: [
      'No hunting within state park boundaries',
      'WV fishing license required for ages 15+',
      'Catch-and-release for black bass (Stonewall Jackson Lake regulation)',
      'Boat rentals require valid driver\'s license (21+ years old)',
      'Golf course requires proper attire and soft spikes',
      'Maximum campground stay: 14 consecutive days',
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
        // Lakeside Cottages (treated as cabins)
        {
          cabinNumber: 'Cottage 1',
          bedrooms: 2,
          bathrooms: 2,
          maxOccupancy: 8,
          kitchenType: 'full',
          hasFireplace: false,
          petFriendly: false,
          accessible: false,
          seasonalAvailability: 'Year-round',
          amenities: [
            'Full kitchen with appliances',
            'Private deck with lake views',
            'Living area with TV',
            'Washer and dryer',
            'Multiple bedrooms',
            'Modern bathrooms',
            'Wi-Fi included',
          ],
          hasPorch: true,
          hasGrill: true,
          priceRange: 'Call for rates: 304-269-7400',
          bookingUrl: 'https://www.stonewallresort.com',
          description: 'Lakeside cottage with full kitchen, private deck, and stunning lake views. Perfect for families or groups seeking a home-away-from-home experience.',
        },
      ],
      lodges: [
        {
          name: 'Stonewall Resort Lodge',
          roomCount: 198,
          roomTypes: [
            {
              type: 'Standard Lodge Room',
              capacity: 4,
              amenities: [
                'Adirondack-style architecture',
                'Lake or mountain views',
                'Flat-screen TV',
                'Mini-refrigerator',
                'Wi-Fi included',
                'Private balcony (select rooms)',
              ],
            },
          ],
          lodgeAmenities: [
            'TJ Muskies Restaurant (fine dining)',
            'Stillwaters Spa Cafe',
            'Indoor heated pool',
            'Hot tub',
            'Fitness center',
            'Conference facilities',
            'Gift shop',
            'Wedding venues',
          ],
          accessible: true,
          accessibleRoomCount: 10,
          priceRange: 'Call for rates: 304-269-7400',
          bookingUrl: 'https://www.stonewallresort.com',
          contactPhone: '304-269-7400',
          description: 'AAA Four Diamond rated Adirondack-style lodge with 198 rooms overlooking Stonewall Jackson Lake. Full-service resort amenities including fine dining, spa, and recreation facilities.',
        },
      ],
    },

    camping: {
      campgrounds: [
        {
          name: 'Briar Point Campground',
          siteCount: 179,
          hookupTypes: ['electric', 'water', 'sewer'],
          bathhouse: true,
          dumpStation: true,
          maxRVLength: '45 feet',
          season: 'Year-round (limited services in winter)',
          amenities: [
            'Full hook-ups at RV sites',
            'Lakeside locations',
            'Modern restrooms and showers',
            'Dump station',
            'Electric hook-ups',
            'Water access',
            'Boat mooring available at select sites',
          ],
          accessible: true,
          accessibleSiteCount: 8,
          fees: '$63/night peak season (Memorial Day - October), $75/night holidays',
          bookingUrl: 'https://www.recreation.gov',
        },
      ],
    },

    picnicAreas: [
      {
        type: 'pavilion',
        name: 'Lakeside Pavilion',
        shelterCount: 2,
        capacity: 150,
        reservable: true,
        grills: true,
        electricity: true,
        amenities: [
          'Lake views',
          'Tables and chairs',
          'Nearby restrooms',
          'Event-ready setup',
        ],
        accessible: true,
        reservationUrl: WV_STATE_PARKS_RESERVATION_URL,
        rentalFee: 'Call resort for pricing',
        nearParking: true,
      },
    ],

    boatLaunches: [
      {
        name: 'Stonewall Resort Marina',
        rampCount: 2,
        capacity: 374,
        fees: 'Free for public ramps (USACE); marina slip fees vary',
        parking: true,
        parkingCapacity: 200,
        accessible: true,
        amenities: [
          '374-slip marina (largest in West Virginia)',
          'Fuel dock',
          'Bait and tackle shop',
          'Boat rentals (pontoons, fishing boats, personal watercraft)',
          'Kayak, canoe, SUP rentals',
          'Boat slip rentals available',
        ],
        contact: '304-269-8895',
        season: 'April 2 - Late Fall',
        description: 'Full-service marina with West Virginia\'s largest boat slip capacity. Rentals, fuel, and supplies available.',
      },
    ],

    otherAmenities: [
      {
        type: 'golf_course',
        name: 'Arnold Palmer Signature Golf Course',
        description: '18-hole championship course designed by Arnold Palmer & Ed Seay. Par 72, 7,149 yards from championship tees. Rated #2 in America\'s Best New Courses (Golf Digest 2003) and Top 10 Palmer Courses You Can Play (Links Magazine 2011).',
        fees: 'Call pro shop for rates: 304-269-7400',
        seasonal: false,
        season: 'Year-round (weather permitting)',
      },
      {
        type: 'spa',
        name: 'Mtn. Laurel Spa',
        description: 'Full-service spa offering massage therapy, facials, body treatments, manicures, pedicures, and couples treatments.',
        fees: 'Call for spa menu: 304-269-7400',
        seasonal: false,
      },
      {
        type: 'recreation_center',
        name: 'Recreation Center',
        description: 'Indoor recreation facility with rock climbing wall, kayak/canoe/SUP rentals, fitness center, and equipment.',
        fees: 'Included for resort guests',
        seasonal: false,
      },
      {
        type: 'swimming_pool',
        name: 'Indoor Heated Pool',
        description: 'Year-round indoor heated swimming pool with adjacent hot tub.',
        fees: 'Included for resort guests',
        seasonal: false,
      },
      {
        type: 'playground',
        name: 'Outdoor Playground',
        description: 'Playground for children near lodge and campground areas.',
        fees: 'Free',
        seasonal: true,
        season: 'Year-round access (weather permitting)',
      },
      {
        type: 'gift_shop',
        name: 'Resort Gift Shop',
        description: 'West Virginia souvenirs, resort apparel, local crafts, and snacks.',
        fees: 'Varies by item',
        seasonal: false,
      },
      {
        type: 'gift_shop',
        name: 'Golf Pro Shop',
        description: 'Golf equipment, apparel, Arnold Palmer signature items, and equipment rental.',
        fees: 'Varies by item',
        seasonal: false,
      },
      {
        type: 'bait_shop',
        name: 'Marina Bait & Tackle Shop',
        description: 'Live bait, fishing tackle, lures, boating supplies, and snacks.',
        fees: 'Varies by item',
        seasonal: true,
        season: 'April - Late Fall',
      },
      {
        type: 'event_space',
        name: 'Conference Center',
        description: 'Event space for corporate retreats, meetings, and conferences. Capacity up to 200 guests.',
        fees: 'Call for event pricing',
        seasonal: false,
      },
      {
        type: 'event_space',
        name: 'Wedding Venues',
        description: 'Indoor and outdoor wedding venues with lake views. Capacity up to 150 guests.',
        fees: 'Call for wedding packages',
        seasonal: false,
      },
    ],
  },

  // ============================================================================
  // ACTIVITIES & PROGRAMS
  // ============================================================================
  activitiesPrograms: {
    rangerPrograms: [
      {
        name: 'Golf Lessons',
        type: 'educational',
        description: 'Professional PGA instruction with video swing analysis, practice balls, and personalized tips.',
        schedule: 'Year-round - call pro shop to schedule',
        duration: '30 minutes - 1 hour',
        ageGroup: 'All levels welcome',
        reservationRequired: true,
        accessible: true,
        contact: '304-269-7400',
      },
      {
        name: 'Fishing Guide Service',
        type: 'ranger_led',
        description: 'Half-day or full-day guided fishing trips on Stonewall Jackson Lake. Includes experienced local guide, boat, fishing equipment, bait, and tackle.',
        schedule: 'Available April - October (best season)',
        duration: 'Half-day or full-day',
        ageGroup: '12 years and up',
        reservationRequired: true,
        accessible: false,
        maxParticipants: 4,
        contact: '304-269-8895',
      },
    ],

    recreationalActivities: [
      {
        type: 'golf',
        name: 'Championship Golf',
        description: 'Play the Arnold Palmer Signature Course - 18 holes, par 72, featuring scenic lakeside holes and challenging elevation changes.',
        difficulty: 'easy',
        season: ['spring', 'summer', 'fall', 'winter'],
        equipment: 'Clubs and carts available for rent',
      },
      {
        type: 'fishing',
        name: 'Bass Fishing',
        description: 'Fish West Virginia\'s #1 bass lake. Stonewall Jackson Lake is known for largemouth bass, smallmouth bass, walleye, muskellunge, crappie, catfish, and bluegill. Catch-and-release program for black bass.',
        equipment: 'Fishing rod and tackle (rent at marina)',
        season: ['spring', 'summer', 'fall', 'winter'],
      },
      {
        type: 'boating',
        name: 'Boating & Marina',
        description: 'Rent pontoon boats, fishing boats, or personal watercraft from West Virginia\'s largest marina. 374 slips available for rent, plus fuel dock.',
        equipment: 'Boats available for rent at marina',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'swimming',
        name: 'Lake Swimming',
        description: 'Swim at designated lake areas with sandy beach access. No lifeguard on duty - swim at your own risk.',
        season: ['summer'],
      },
      {
        type: 'hiking',
        name: 'Hiking Trails',
        description: '16+ miles of trails ranging from easy nature walks to challenging ridge hikes. Lake overlooks, mixed hardwood forest, and wildlife viewing.',
        difficulty: 'easy',
        season: ['spring', 'summer', 'fall', 'winter'],
      },
      {
        type: 'climbing',
        name: 'Rock Climbing',
        description: 'Outdoor climbing wall and bouldering areas at recreation center. Equipment rental and professional instruction available.',
        difficulty: 'moderate',
        season: ['spring', 'summer', 'fall'],
      },
      {
        type: 'paddling',
        name: 'Kayaking & Canoeing',
        description: 'Explore 82 miles of shoreline by kayak, canoe, or stand-up paddleboard. Rentals available at recreation center and marina.',
        equipment: 'Kayaks, canoes, SUPs for rent',
        season: ['spring', 'summer', 'fall'],
      },
    ],
  },

  // ============================================================================
  // TRAIL SYSTEM
  // ============================================================================
  trails: {
    totalMileage: 16,
    trails: [
      {
        name: 'Lake View Trail',
        slug: 'lake-view-trail',
        distance: '2.5 miles',
        difficulty: 'easy',
        routeType: 'loop',
        elevationGain: '200 ft',
        description: 'Easy loop trail with scenic lake overlooks and mixed hardwood forest. Great for families and beginner hikers.',
        trailhead: {
          name: 'Resort Lodge Trailhead',
          coordinates: {
            lat: 38.9850,
            lng: -80.4467,
          },
          parking: true,
          parkingCapacity: 50,
        },
        highlights: [
          'Lake overlooks',
          'Wildlife viewing',
          'Gentle terrain',
          'Interpretive signs',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'Ridge Trail',
        slug: 'ridge-trail',
        distance: '4.2 miles',
        difficulty: 'moderate',
        routeType: 'out-and-back',
        elevationGain: '550 ft',
        description: 'Moderate ridge hike with elevation changes and panoramic lake views from summit.',
        trailhead: {
          name: 'North Parking Area',
          coordinates: {
            lat: 38.9870,
            lng: -80.4480,
          },
          parking: true,
          parkingCapacity: 20,
        },
        highlights: [
          'Panoramic lake views',
          'Ridge hiking',
          'Bird watching',
          'Wildflowers in spring',
        ],
        surface: 'natural',
        accessible: false,
        dogsAllowed: true,
        leashRequired: true,
      },
      {
        name: 'USACE Dam Trail',
        slug: 'usace-dam-trail',
        distance: '1.2 miles',
        difficulty: 'easy',
        routeType: 'out-and-back',
        elevationGain: '100 ft',
        description: 'Short trail to USACE Visitor Center and dam overlook with viewing platforms.',
        trailhead: {
          name: 'USACE Visitor Center',
          coordinates: {
            lat: 38.9800,
            lng: -80.4500,
          },
          parking: true,
          parkingCapacity: 30,
        },
        highlights: [
          'Dam overlook',
          'Visitor center',
          'Educational displays',
          'Restrooms available',
        ],
        surface: 'paved',
        accessible: true,
        accessibilityInfo: {
          name: 'USACE Dam Trail',
          wheelchairAccessible: true,
          surface: 'paved',
          width: 60,
          grade: '5%',
          obstacles: [],
          restingIntervals: 'Benches every 300 feet',
          details: 'Fully accessible paved trail to dam overlook with viewing platforms.',
        },
        dogsAllowed: true,
        leashRequired: true,
      },
    ],
  },

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================
  accessibility: {
    statement: 'Stonewall Resort State Park strives to provide accessible facilities for all visitors. AAA Four Diamond resort with comprehensive ADA-compliant amenities.',
    features: [
      'accessible_cabin',
      'accessible_campsite',
      'accessible_restroom',
      'accessible_parking',
      'accessible_trail',
      'accessible_picnic',
      'accessible_lodging',
    ],
    accessibleTrails: [
      'USACE Dam Trail (1.2 miles, paved surface)',
    ],
    accessibleFacilities: [
      '10 accessible lodge rooms',
      'Accessible cottages available',
      '8 accessible campsites at Briar Point',
      'Accessible restrooms throughout resort',
      'Accessible dining areas',
      'Accessible spa facilities',
      'Accessible golf course (cart accessible)',
    ],
    serviceAnimalPolicy: {
      allowed: true,
      restrictions: [
        'Service animals must be under handler control',
        'Handler responsible for waste cleanup',
      ],
      reliefAreas: [
        'Designated areas near parking lots',
        'Grassy areas throughout resort',
      ],
      adaCompliance: 'Stonewall Resort State Park fully complies with ADA regulations regarding service animals.',
    },
    advanceNoticeRequired: false,
    accommodationsContact: '304-269-7400',
  },

  // ============================================================================
  // RESERVATIONS
  // ============================================================================
  reservations: {
    cabins: {
      bookingUrl: 'https://www.stonewallresort.com',
      bookingWindow: 'Up to 12 months in advance',
      cancellationPolicy: 'Cottages: 7-day cancellation notice required. Holiday weekends: 14-day notice. Varies by package - confirm at booking.',
      fees: [
        {
          cabinType: 'Lakeside Cottage (2BR)',
          priceRange: 'Call for rates: 304-269-7400',
          season: 'Year-round',
        },
      ],
    },
    camping: {
      bookingUrl: 'https://www.recreation.gov',
      bookingWindow: 'Up to 6 months in advance',
      cancellationPolicy: 'Full refund if cancelled 7+ days before arrival. No refund within 7 days.',
      fees: [
        {
          siteType: 'Full Hook-up Site',
          price: '$63/night peak season (Memorial Day - October)',
          season: 'Peak: Memorial Day - October',
        },
        {
          siteType: 'Holiday Weekend',
          price: '$75/night',
          season: 'Holiday weekends year-round',
        },
      ],
    },
    groupFacilities: {
      bookingContact: '304-269-7400',
      fees: [
        {
          facilityType: 'Conference Center',
          price: 'Call for event pricing',
        },
        {
          facilityType: 'Wedding Venues',
          price: 'Call for wedding packages',
        },
        {
          facilityType: 'Lakeside Pavilion',
          price: 'Call for rental fees',
        },
      ],
    },
    generalContact: {
      phone: '304-269-7400',
      url: 'https://www.stonewallresort.com',
    },
  },

  // ============================================================================
  // EMERGENCY CONTACTS
  // ============================================================================
  emergencyContacts: [
    {
      tier: 'primary',
      priority: 1,
      contacts: [
        {
          name: 'Resort Security',
          phone: '304-269-7400',
          available: '24/7',
          type: 'first-responder',
        },
        {
          name: 'Lewis County 911',
          phone: '911',
          available: '24/7',
          type: 'emergency-services',
        },
      ],
    },
    {
      tier: 'agency',
      priority: 2,
      contacts: [
        {
          name: 'USACE Project Office (Stonewall Jackson Lake)',
          phone: '304-269-4588',
          available: 'Business hours',
          type: 'park-management',
        },
        {
          name: 'Lewis County Sheriff',
          phone: '304-269-8251',
          available: '24/7',
          type: 'law-enforcement',
        },
        {
          name: 'Stonewall Jackson Memorial Hospital',
          phone: '304-269-8000',
          available: '24/7',
          type: 'hospital',
          location: 'Weston, WV (10 miles)',
        },
      ],
    },
  ],

  // ============================================================================
  // SEO METADATA
  // ============================================================================
  seo: {
    title: 'Stonewall Resort State Park - AAA Four Diamond Resort',
    description: 'West Virginia\'s premier resort on Stonewall Jackson Lake. Arnold Palmer golf, 374-slip marina, spa, lodge, and camping. 1,736 acres in Lewis County.',
    keywords: [
      'Stonewall Resort',
      'Stonewall Jackson Lake',
      'Arnold Palmer golf course',
      'WV resort',
      'Lewis County',
      'marina West Virginia',
      'golf resort WV',
      'bass fishing',
    ],
    faqItems: [
      {
        '@type': 'Question',
        name: 'Does Stonewall Resort have an Arnold Palmer golf course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Stonewall Resort features an 18-hole Arnold Palmer Signature Golf Course designed by Palmer & Ed Seay. It was rated #2 in America\'s Best New Courses by Golf Digest in 2003 and is a par 72 course stretching 7,149 yards from championship tees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many boat slips does Stonewall Resort marina have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stonewall Resort marina has 374 boat slips, making it the largest marina in West Virginia. The marina offers boat rentals, fuel dock, bait shop, and slip rentals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I camp at Stonewall Resort State Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Briar Point Campground offers 179 tent and RV sites with full hook-ups, modern restrooms, and lakeside locations. Camping is available year-round with rates of $63/night peak season and $75/night on holidays.',
        },
      },
      {
        '@type': 'Question',
        name: 'What kind of fish are in Stonewall Jackson Lake?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stonewall Jackson Lake is West Virginia\'s #1 bass lake, featuring largemouth bass, smallmouth bass, walleye, muskellunge, crappie, catfish, and bluegill. The lake has a catch-and-release program for black bass.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Stonewall Resort have lodging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AAA Four Diamond resort offers 198 lodge rooms in Adirondack-style architecture, plus 10 lakeside cottages with full kitchens. The resort includes spa, fine dining, indoor pool, and year-round amenities.',
        },
      },
    ],
  },

  // ============================================================================
  // RELATED CONTENT
  // ============================================================================
  nearbyAttractions: [
    {
      name: 'Jackson\'s Mill Historic Area',
      type: 'Historic Site',
      distance: '12 miles',
      description: 'Boyhood home of Stonewall Jackson with historic buildings and museum',
    },
    {
      name: 'Trans-Allegheny Lunatic Asylum',
      type: 'Historic Site',
      distance: '10 miles',
      description: 'National Historic Landmark offering tours of Gothic Revival architecture',
      link: 'https://trans-alleghenylunaticasylum.com/',
    },
  ],

  relatedCategories: [
    {
      name: 'West Virginia State Parks',
      slug: 'state-parks',
      description: 'Explore all WV state parks',
    },
    {
      name: 'Bass Fishing',
      slug: 'fishing',
      description: 'Find top bass fishing lakes',
    },
    {
      name: 'Golf in West Virginia',
      slug: 'golf',
      description: 'Discover WV golf courses',
    },
  ],

  showRelatedShop: true,
};
