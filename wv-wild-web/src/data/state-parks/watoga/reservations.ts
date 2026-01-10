/**
 * Watoga State Park - Reservations Section
 * Cabin, camping, group facility booking information
 *
 * @module data/state-parks/watoga/reservations
 */

import {
  WV_STATE_PARKS_RESERVATION_URL,
  WV_STATE_PARKS_PHONE,
} from '../shared-constants';

export const watogaReservations = {
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
};
