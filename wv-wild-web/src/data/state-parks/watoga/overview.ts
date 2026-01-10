/**
 * Watoga State Park - Overview Section
 * Operating hours, fees, contact, location details
 *
 * @module data/state-parks/watoga/overview
 */

import { WV_STATE_PARKS_MANAGING_AGENCY } from '../shared-constants';

export const watogaOverview = {
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
};
