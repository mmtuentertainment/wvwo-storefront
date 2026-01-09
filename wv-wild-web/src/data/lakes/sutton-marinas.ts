/**
 * Sutton Lake Marinas Data
 * SPEC-24: Extracted for modular design (500-line limit)
 */

import type { Marina } from '../../types/lake-enrichment';

export const suttonMarinas: Marina[] = [
  {
    name: 'Sutton Lake Marina',
    type: 'Full-service marina with rentals',
    address: '1734 Bee Run Road, Sutton, WV 26601',
    services: [
      '230 boat slips (100 with water and electric)',
      'Pontoon boat rentals (full/half day)',
      'Jet ski rentals (Yamaha VX Waverunner)',
      'Kayak and paddleboard rentals',
      'Houseboat rentals (3, 4, or 7 days)',
      'Pedal boats and Craig Cats',
      'Four grades of ethanol-free marine gas',
      'Pump-out station',
      'Ship\'s store (pizza, ice cream, bait, supplies)',
      'Marine mechanic and winterization services',
      'Winter and summer boat storage',
    ],
    contact: '(304) 765-2120',
    website: 'suttonlakemarina.com',
    hours: 'Mid-April to mid-October: 9:00 AM - 6:00 PM Mon-Sat, Closed Sunday',
    fees: 'Slip rentals: $25-$40 daily, $95-$150 weekly, $295-$490 monthly',
    rentalDetails: {
      deposit: '$300 refundable damage deposit for jet skis',
      checkIn: '9:00 AM',
      returnBy: '7:00 PM',
      operatorAge: 21,
      boaterSafetyCard: 'Required for operators born after Dec 31, 1986',
      restrictions: 'No towing tubes/skiers behind rentals',
    },
  },
  {
    name: 'Bee Run Day Use Area Boat Ramp',
    type: 'Public boat launch with beach',
    address: '1734 Bee Run Road, Sutton, WV 26601',
    services: [
      'Wide concrete boat ramp',
      'Large parking for trucks and trailers',
      'Adjacent to Sutton Lake Marina',
      'Swimming beach',
      'Restrooms and showers',
      'Picnic shelters',
    ],
    hours: 'Seasonal - closes when lake drops below 917 feet',
    fees: '$3.00 day use per vehicle ($40 annual pass)',
  },
  {
    name: 'South Abutment Boat Ramp',
    type: 'Public boat launch behind dam',
    services: [
      'Boat ramp access',
      'Swimming beach',
      'Picnic shelter',
      'Fishing pier',
      'Access to tailwater fishing',
    ],
    hours: 'Seasonal',
    fees: '$3.00 day use per vehicle',
  },
  {
    name: 'Bakers Run Campground Boat Ramp',
    type: 'Campground boat launch',
    address: '441 Bakers Run Road, Sutton, WV 26601',
    services: [
      'Boat ramp with small dock',
      'Parking for boat trailers',
      'Extended no-wake zone nearby',
    ],
    hours: 'May 1 - September 30 (ramp closes below 910 feet)',
    fees: '$3.00 day use or included with campground stay',
  },
  {
    name: 'Gerald R. Freeman Campground Boat Ramp',
    type: 'Campground boat launch with marina',
    services: [
      'Accessible boat ramps',
      'Small marina with snack bar',
      'Parking area',
    ],
    hours: 'April 18 - November 29 (ramp closes below 912 feet)',
    fees: '$3.00 day use or included with campground stay',
  },
];
