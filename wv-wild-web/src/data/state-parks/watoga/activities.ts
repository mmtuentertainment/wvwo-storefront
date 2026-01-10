/**
 * Watoga State Park - Activities & Programs Module
 * SPEC-18 Phase 4: Ranger programs, educational programs, events, recreational activities
 *
 * Part of watoga-sp.ts modular split (SPEC-24 compliance)
 * @module data/state-parks/watoga/activities
 */

import type { ActivitiesPrograms } from '../../../types/state-park-template-types';

export const watogaActivitiesPrograms: ActivitiesPrograms = {
  rangerPrograms: [
    {
      name: 'Arboretum Discovery Walk',
      type: 'ranger_led' as const,
      description: 'Explore Brooks Memorial Arboretum with a naturalist. Learn to identify 350+ tree species and understand forest ecology.',
      schedule: 'Daily at 10:00 AM, May through October',
      duration: '1.5 hours',
      ageGroup: 'All ages',
      reservationRequired: false,
      accessible: true,
    },
    {
      name: 'Evening Wildlife Program',
      type: 'ranger_led' as const,
      description: 'Learn about black bears, white-tailed deer, and other WV wildlife. Slide presentation and Q&A.',
      schedule: 'Saturday evenings at 7:30 PM, June-August',
      duration: '45 minutes',
      ageGroup: 'All ages',
      reservationRequired: false,
      accessible: true,
    },
    {
      name: 'Fly Fishing Workshop',
      type: 'educational' as const,
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
      type: 'ranger_led' as const,
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
      skillLevel: 'beginner' as const,
      cost: '$40/person',
      schedule: 'Two weekends in June and September',
    },
    {
      name: 'Tree Identification Class',
      topic: 'Forest Botany',
      description: 'Classroom and field instruction on identifying trees by leaves, bark, and form. Focus on Appalachian species.',
      materialsProvided: true,
      skillLevel: 'all' as const,
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
      eventType: 'Festival' as const,
    },
    {
      name: 'Watoga Lake Festival',
      date: 'July 4th Weekend',
      description: 'Family festival with live music, craft vendors, children\'s activities, fishing tournament, and fireworks.',
      fees: 'Free admission',
      registrationRequired: false,
      eventType: 'Festival' as const,
    },
  ],

  recreationalActivities: [
    {
      type: 'golf' as const,
      name: 'Championship Golf',
      description: '18-hole championship course, par 72. Cart and club rentals available.',
      fees: '$25-$45 per round',
    },
    {
      type: 'swimming' as const,
      name: 'Olympic Pool',
      description: 'Olympic-size outdoor pool with diving board and lap lanes',
      fees: '$5/person, $15/family',
    },
    {
      type: 'boating' as const,
      name: 'Lake Boating',
      description: 'Paddleboat, kayak, and canoe rentals on Watoga Lake',
      equipment: 'Rentals available at boat dock',
      fees: '$10-$25/hour',
    },
    {
      type: 'fishing' as const,
      name: 'Lake and Stream Fishing',
      description: 'Trout fishing in stocked lake and streams. Bass fishing in Watoga Lake.',
      equipment: 'Bring your own or purchase at camp store',
      season: ['spring', 'summer', 'fall'] as const,
    },
    {
      type: 'hiking' as const,
      name: 'Mountain Hiking',
      description: 'Over 30 miles of trails including arboretum trails and backcountry routes',
      difficulty: 'moderate' as const,
      season: ['spring', 'summer', 'fall'] as const,
    },
    {
      type: 'wildlife_viewing' as const,
      name: 'Wildlife Observation',
      description: 'Black bears, deer, wild turkey, and over 200 bird species',
      season: ['spring', 'summer', 'fall', 'winter'] as const,
    },
  ],
};
