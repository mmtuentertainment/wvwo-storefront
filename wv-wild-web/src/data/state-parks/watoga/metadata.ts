/**
 * Watoga State Park - Metadata Section
 * Accessibility, emergency contacts, SEO, nearby attractions, related categories
 *
 * @module data/state-parks/watoga/metadata
 */

export const watogaAccessibility = {
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
};

export const watogaEmergencyContacts = [
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
];

export const watogaSEO = {
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
};

export const watogaNearbyAttractions = [
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
];

export const watogaRelatedCategories = [
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
];
