/**
 * Watoga State Park - Trail System Module
 * SPEC-18 Phase 4: Trail data and scenic overlooks
 *
 * Part of watoga-sp.ts modular split (SPEC-24 compliance)
 * @module data/state-parks/watoga/trails
 */

import type { Trails, Overlooks } from '../../../types/state-park-template-types';

export const watogaTrails: Trails = {
  totalMileage: 32,
  trails: [
    {
      name: 'Arboretum Trail',
      slug: 'arboretum-trail',
      distance: '1.2 miles',
      difficulty: 'easy' as const,
      routeType: 'loop' as const,
      elevationGain: '80 ft',
      description: 'Paved interpretive trail through Brooks Memorial Arboretum featuring 350+ tree species with educational signage.',
      trailhead: {
        name: 'Arboretum Parking',
        coordinates: {
          lat: 38.1175,
          lng: -80.1485,
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
      surface: 'paved' as const,
      accessible: true,
      accessibilityInfo: {
        name: 'Arboretum Trail',
        wheelchairAccessible: true,
        surface: 'paved' as const,
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
      distance: '3.5 miles',
      difficulty: 'easy' as const,
      routeType: 'loop' as const,
      elevationGain: '120 ft',
      description: 'Scenic loop around Watoga Lake with views, fishing access, and wildlife observation opportunities.',
      trailhead: {
        name: 'Lodge Parking',
        coordinates: {
          lat: 38.1170,
          lng: -80.1495,
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
      surface: 'natural' as const,
      accessible: false,
      dogsAllowed: true,
      leashRequired: true,
    },
    {
      name: 'Jesse\'s Cove Trail',
      slug: 'jesses-cove-trail',
      distance: '5.8 miles',
      difficulty: 'moderate' as const,
      routeType: 'out-and-back' as const,
      elevationGain: '650 ft',
      description: 'Popular trail climbing to scenic overlook with views of Greenbrier Valley.',
      trailhead: {
        name: 'Jesse\'s Cove Trailhead',
        coordinates: {
          lat: 38.1150,
          lng: -80.1520,
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
      surface: 'natural' as const,
      accessible: false,
      dogsAllowed: true,
      leashRequired: true,
    },
  ],
  trailMapUrl: 'https://wvstateparks.com/park/watoga-state-park/trail-map',
};

export const watogaOverlooks: Overlooks = {
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
};
