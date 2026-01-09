/**
 * Sutton Lake Campgrounds Data
 * SPEC-24: Extracted for modular design (500-line limit)
 * NOTE: Site counts match authoritative standalone campground data files
 * See: src/data/campgrounds/gerald-r-freeman.ts, bakers-run.ts, bee-run.ts
 */

import type { LakeCampground } from '../../types/lake-enrichment';

export const suttonCampgrounds: LakeCampground[] = [
  {
    name: 'Gerald R. Freeman Campground',
    slug: 'gerald-r-freeman',
    operator: 'U.S. Army Corps of Engineers',
    sites: 156,
    siteTypes: [
      '40 full hookup (50 amp)',
      '30 full hookup (30 amp)',
      '46 electric only (50 amp)',
      '40 electric only (30 amp)',
    ],
    amenities: [
      'Bathhouses with hot showers',
      'Flush toilets',
      'Dump stations',
      'Playgrounds',
      'Basketball courts',
      'Boat ramp',
      'Accessible facilities',
    ],
    fees: '$28-$46/night depending on site type',
    season: 'April - November (varies by year)',
    reservations: 'Recreation.gov or 1-877-444-6777',
    policies: ['14-day limit per 30-day period', 'Quiet hours 10 PM - 6 AM', 'Limited cell service', 'Pets on leash'],
    contact: '(304) 765-2816',
  },
  {
    name: 'Bakers Run Campground',
    slug: 'bakers-run',
    operator: 'U.S. Army Corps of Engineers',
    sites: 77,
    siteTypes: [
      '30 electric waterfront (30/50 amp)',
      '35 electric standard (30/50 amp)',
      '12 non-electric',
    ],
    amenities: [
      'Bathhouses with hot showers',
      'Flush toilets',
      'Dump station',
      'Playground',
      'Boat ramp',
      'Basketball and volleyball courts',
      'Fire rings and picnic tables',
    ],
    fees: '$18-$34/night depending on site type',
    season: 'May - September (varies by year)',
    reservations: 'Recreation.gov',
    policies: ['14-day limit per 30-day period', 'Pets on leash'],
    contact: '(304) 765-2816',
  },
  {
    name: 'Bee Run Campground',
    slug: 'bee-run',
    operator: 'U.S. Army Corps of Engineers',
    sites: 12,
    siteTypes: ['12 primitive sites (no hookups)'],
    amenities: [
      'Vault toilets',
      'Fire rings',
      'Picnic tables',
      'NO electric hookups',
      'NO potable water',
      'NO showers',
    ],
    fees: '$10-$14/night',
    season: 'Late May - Early December',
    reservations: 'First-come, first-served (no reservations)',
    policies: ['14-day limit per 30-day period', 'Bring your own drinking water'],
    contact: '(304) 765-2816',
  },
];
