/**
 * Riffle Run Campground Data
 * SPEC-21-A: Campground data for CampgroundTemplate
 *
 * Extracted from verified Perplexity Pro research (100% sourced data)
 * Primary sources: USACE Official, Recreation.gov, WV DNR
 *
 * Key highlights:
 * - 60 total campsites (54 full hookup 50A, 6 primitive)
 * - FIRST-COME, FIRST-SERVED - No advance reservations
 * - Near dam with tailwater trout fishing access
 * - Recreation.gov ID: 10234906
 * - Season: Mid-April through late November
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Riffle Run Campground
 * Ready to spread into CampgroundTemplate component
 */
export const riffleRunCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Riffle Run Campground',
  image: '/images/campgrounds/riffle-run-campground-hero.webp',
  imageAlt: 'Riffle Run Campground at Burnsville Lake near the dam with forested shoreline',
  tagline: '60 campsites on the dam side. First-come, first-served. Tailwater trout fishing.',
  description: `Riffle Run Campground sits on the dam side of Burnsville Lake in Braxton County. 60 sites - 54 with full hookups (50 amp), 6 primitive for tent camping. No reservations accepted. Show up, pick a site, pay at the self-service kiosk.

This is the quiet side of Burnsville Lake. Smaller than Bulltown, less crowded, and closer to the tailwater trout fishing below the dam. The boat ramp was dredged in March 2023 - good shape for launching. ADA-accessible fishing pier at the marina next door.

The marina rents pontoon boats and jet skis if you don't have your own rig. Burnsville Docks is right there at the day use area. Trout are stocked in the tailwaters February through April and again in October - check WV DNR stocking hotline for current schedule.

No cell service here. That's not a bug, it's a feature. Disconnect from the world, fish the lake, walk the trails. The bathhouses are clean, playgrounds keep the kids busy, and the price is right.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '60', label: 'Campsites', icon: 'area' as const },
    { value: '45 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: 'No Reservations', label: 'Walk-In Only', icon: 'info' as const },
  ],

  // Campground metadata
  totalSites: 60,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '10234906',
  county: 'Braxton County',
  nearbyLake: 'Burnsville Lake',
  quickHighlights: [
    'First-Come, First-Served',
    'Full Hookups (50 Amp)',
    'Tailwater Trout Fishing',
    'Boat Ramp Nearby',
    'ADA Fishing Pier',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Full Hookup (50 Amp)',
      count: 54,
      amenities: 'Water, 50 amp electric, sewer hookups. Picnic table, fire ring.',
      fee: '$34-$46/night',
    },
    {
      name: 'Primitive (Tent Only)',
      count: 6,
      amenities: 'No hookups. Picnic table, fire ring. Restroom access.',
      fee: '$20-$30/night',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Restrooms',
      description: 'Restroom facilities available with accessible options.',
      available: true,
      accessibility: 'Accessible facilities provided',
    },
    {
      name: 'Hot Showers',
      description: 'Hot shower facilities available within campground.',
      available: true,
    },
    {
      name: 'Laundry',
      description: 'Laundry facility available on-site.',
      available: true,
    },
    {
      name: 'Dump Station',
      description: 'Sewage dump station and fresh water fill-up available.',
      available: true,
    },
    {
      name: 'Playgrounds',
      description: 'Two playgrounds within campground for families.',
      available: true,
    },
    {
      name: 'Boat Ramp',
      description: 'Riffle Run Day Use Area boat ramp just before campground entrance. Dredged March 2023.',
      available: true,
    },
    {
      name: 'Cell Service',
      description: 'No cellular coverage. AT&T, Verizon, T-Mobile all report no service.',
      available: false,
    },
    {
      name: 'WiFi',
      description: 'Not available.',
      available: false,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Tailwater Trout Fishing',
      distance: 'Below dam (walkway access)',
      description: 'Burnsville Tailwaters stocked by WV DNR. Rainbow and brown trout. Stocking code BW: twice monthly February-April, once each week in late October.',
      season: 'Spring (Feb-April) and Fall (October)',
    },
    {
      name: 'ADA Fishing Pier',
      distance: 'At marina near dam',
      description: 'Accessible fishing pier with walkway below dam for tailwater access.',
    },
    {
      name: 'Burnsville Marina',
      distance: 'Adjacent (Riffle Run Day Use Area)',
      description: 'Pontoon rentals ($350/day, $200/half-day + fuel). Jet ski rentals. Seasonal boat slips April 15 - October 1.',
      link: 'https://burnsvilledock.com',
    },
    {
      name: 'Lake Fishing',
      distance: 'Boat ramp on-site',
      description: 'Largemouth bass, smallmouth bass, walleye, saugeye, crappie, muskellunge, channel catfish, flathead catfish. Launch from Riffle Run ramp.',
    },
    {
      name: 'Left Fork Picnic Area',
      distance: 'Just behind dam',
      description: 'Picnic shelters (#3-#4), horseshoe pits, ball field, playgrounds, restrooms, fishing areas.',
    },
    {
      name: 'Little Kanawha River Trail System',
      distance: 'Access from campground area',
      description: '100+ miles of hiking and biking trails documented at Burnsville Lake. Contact ranger for off-road mountain biking locations.',
    },
    {
      name: 'Bulltown Historic Area',
      distance: '~13 miles (via I-79 Exit 67, US-19 north)',
      description: 'Civil War battlefield, museum, historic structures. Free admission.',
      link: '/near/campground/bulltown/',
    },
    {
      name: 'Falls Mill Area',
      distance: '~10 miles (US-19 north of Flatwoods)',
      description: 'Waterfall, picnic tables, fishing, ADA restrooms.',
    },
    {
      name: 'Burnsville Lake WMA',
      distance: 'Adjacent (12,579 acres)',
      description: 'Public hunting land. Deer, turkey, grouse, squirrel. WV hunting license required.',
      link: '/near/wma/burnsville/',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Reservations',
      details: 'NO ADVANCE RESERVATIONS ACCEPTED. First-come, first-served only. Pay at self-service kiosk upon arrival.',
      important: true,
    },
    {
      category: 'Check-In / Check-Out',
      details: 'Check-in: 6:00 PM. Check-out: 5:00 PM. Visiting hours end at 10:00 PM.',
      important: true,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 consecutive nights. Maximum 14 nights in any rolling 30-day period.',
      important: true,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 6:00 AM.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Pets allowed. Must be penned, caged, on leash 6 feet or less, or physically restrained. Owners must clean up after pets.',
      important: false,
    },
    {
      category: 'Vehicles',
      details: 'Two vehicles per site maximum. Overflow parking available. No driving on grass.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in designated fire rings only.',
      important: false,
    },
    {
      category: 'Firearms',
      details: 'PROHIBITED on federal property (including campground).',
      important: true,
    },
    {
      category: 'Fireworks',
      details: 'PROHIBITED (including sparklers).',
      important: true,
    },
    {
      category: 'Electrical Safety',
      details: 'Adapters altering amperage (30A to 50A) may result in damage charges up to $5,000.',
      important: true,
    },
    {
      category: 'Federal Pass Discount',
      details: 'Available. Discount pass must be presented upon request.',
      important: false,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Riffle Run Campground Direct',
      phone: '(304) 853-2583',
      address: '3452 South Main Street, Burnsville, WV 26335',
    },
    {
      type: 'USACE Burnsville Lake Office',
      phone: '(304) 853-2371',
      address: '2550 South Main Street, Burnsville, WV 26335',
    },
    {
      type: 'Recorded Information',
      phone: '(304) 853-2398',
    },
    {
      type: 'Burnsville Marina',
      phone: '(304) 853-2822',
      url: 'https://burnsvilledock.com',
    },
    {
      type: 'WV DNR Fish Stocking Hotline',
      phone: '(304) 558-3399',
      url: 'https://wvdnr.gov/fishing/fish-stocking/',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Peak Season',
      dates: 'May 25 - September 3',
      bookingStatus: 'First-come, first-served (no reservations)',
    },
    {
      period: 'Off-Peak (Spring)',
      dates: 'April 14 - May 24',
      bookingStatus: 'First-come, first-served',
    },
    {
      period: 'Off-Peak (Fall)',
      dates: 'September 4 - November 26',
      bookingStatus: 'First-come, first-served',
    },
    {
      period: 'Winter Closure',
      dates: 'November 27 - April 13',
      bookingStatus: 'CLOSED',
    },
  ],

  // Gear checklist
  gearList: [
    { name: 'Cash for self-service kiosk', optional: false },
    { name: 'RV hookup adapters (50A service only)', optional: true },
    { name: 'Leveling blocks for RV', optional: true },
    { name: 'Tent and sleeping gear (primitive sites)', optional: true },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Trout stamp (for tailwater fishing)', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Cooler with ice', optional: false },
    { name: 'Offline maps (no cell service)', optional: false },
    { name: 'Firewood (or purchase locally)', optional: false },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
  ],

  // Related shop categories
  relatedShop: [
    {
      name: 'Camping Gear',
      description: 'Tents, sleeping bags, cookware for primitive camping',
      href: '/shop/camping',
    },
    {
      name: 'Fishing Gear',
      description: 'Rods, tackle, and trout gear for tailwater fishing',
      href: '/shop/fishing',
    },
    {
      name: 'Hunting Licenses',
      description: 'WV licenses and stamps for nearby WMA',
      href: '/shop/licenses',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'spring',
  coordinates: {
    lat: 38.8373,
    lng: -80.6175,
  },
  directions: 'From I-79 Exit 79: Turn west toward downtown Burnsville, then right at Motel 79. Proceed east approximately 3 miles via Old Route 5 to Riffle Run Day Use Area.',
  cellService: 'No cellular coverage. AT&T, Verizon, T-Mobile all report no service. Download offline maps and WV DNR stocking schedule before arrival.',
  maxRvLength: 'Up to 90 feet documented (large rigs accommodated)',
};
