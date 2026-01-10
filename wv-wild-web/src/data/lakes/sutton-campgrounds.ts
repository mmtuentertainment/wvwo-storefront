/**
 * Sutton Lake Campgrounds Summary
 * SPEC-24: Derived from authoritative campground modules for modular design
 *
 * This file derives LakeCampground summaries from the canonical campground
 * data files to prevent data drift between lake pages and campground pages.
 *
 * Authoritative sources:
 * - src/data/campgrounds/gerald-r-freeman.ts
 * - src/data/campgrounds/bakers-run.ts
 * - src/data/campgrounds/bee-run.ts
 */

import type { LakeCampground } from '../../types/lake-enrichment';
import type { CampgroundTemplateProps } from '../../types/adventure';
import { geraldRFreemanCampgroundData } from '../campgrounds/gerald-r-freeman';
import { bakersRunCampgroundData } from '../campgrounds/bakers-run';
import { beeRunCampgroundData } from '../campgrounds/bee-run';

/**
 * Transform a CampgroundTemplateProps into a LakeCampground summary.
 * Extracts key fields and formats them for lake page display.
 */
function deriveLakeCampground(
  data: CampgroundTemplateProps,
  slug: string,
  overrides?: Partial<LakeCampground>
): LakeCampground {
  return {
    name: data.name,
    slug,
    operator: data.managingAgency.replace(' (Huntington District)', ''),
    sites: data.totalSites,
    siteTypes: data.campsites.map((c) => `${c.count} ${c.name.toLowerCase()}`),
    amenities: data.amenities.filter((a) => a.available).map((a) => a.name),
    ...overrides,
  };
}

/**
 * Sutton Lake campground summaries derived from authoritative modules.
 * Site counts and amenities automatically stay in sync with campground pages.
 */
export const suttonCampgrounds: LakeCampground[] = [
  deriveLakeCampground(geraldRFreemanCampgroundData, 'gerald-r-freeman', {
    fees: '$28-$46/night depending on site type',
    season: 'April - November (varies by year)',
    reservations: 'Recreation.gov or 1-877-444-6777',
    policies: ['14-day limit per 30-day period', 'Quiet hours 10 PM - 6 AM', 'Limited cell service', 'Pets on leash'],
    contact: '(304) 765-2816',
  }),
  deriveLakeCampground(bakersRunCampgroundData, 'bakers-run', {
    fees: '$18-$34/night depending on site type',
    season: 'May - September (varies by year)',
    reservations: 'Recreation.gov',
    policies: ['14-day limit per 30-day period', 'Pets on leash'],
    contact: '(304) 765-2816',
  }),
  deriveLakeCampground(beeRunCampgroundData, 'bee-run', {
    fees: '$10-$14/night',
    season: 'Late May - Early December',
    reservations: 'First-come, first-served (no reservations)',
    policies: ['14-day limit per 30-day period', 'Bring your own drinking water'],
    contact: '(304) 765-2816',
  }),
];
