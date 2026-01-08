/**
 * Bulltown Campground Data
 * SPEC-21-A: Campground data for CampgroundTemplate
 *
 * Extracted from verified Perplexity Pro research (100% sourced data)
 * Primary sources: USACE Official, Recreation.gov, WV DNR
 *
 * Key highlights:
 * - 204 total campsites (134 full hookup, 48 electric 50A, 22 electric 30A)
 * - Adjacent to Bulltown Historic Area (Civil War battlefield)
 * - Recreation.gov ID: 233443
 * - Season: Mid-April through late November
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Bulltown Campground
 * Ready to spread into CampgroundTemplate component
 */
export const bulltownCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Bulltown Campground',
  image: '/images/campgrounds/bulltown-campground-hero.webp',
  imageAlt: 'Bulltown Campground at Burnsville Lake with lakeside campsites and forested hills',
  tagline: '204 campsites on Burnsville Lake. Civil War history. Full hookups available.',
  description: `Bulltown Campground sits on the shore of Burnsville Lake in Braxton County, West Virginia. 204 campsites spread across multiple loops, most with views of the water. This is USACE camping at its best - clean bathhouses, playgrounds in every loop, and a boat ramp right at the campground.

What makes Bulltown different is the history. Walk from your campsite to the Bulltown Historic Area where Union soldiers held off 800 Confederates in October 1863. The Cunningham farmstead, original section of the Weston and Gauley Bridge Turnpike, and Civil War trenches are still visible. Free admission to the museum.

Full hookups on 134 sites (50 amp, water, sewer). Electric-only on 70 more sites. Reserve through Recreation.gov or show up for first-come, first-served during off-peak season. Peak season fills up - book early for summer weekends and holidays.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '204', label: 'Campsites', icon: 'area' as const },
    { value: '45 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: '134', label: 'Full Hookups', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 204,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '233443',
  county: 'Braxton County',
  nearbyLake: 'Burnsville Lake',
  quickHighlights: [
    'Full Hookups Available',
    'Civil War History',
    'Boat Ramp On-Site',
    'Swimming Beach Nearby',
    'Playgrounds',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Full Hookup (50 Amp)',
      count: 134,
      amenities: 'Water, 50 amp electric, sewer hookups. Picnic table, fire ring, lantern post.',
      fee: '$34-$46/night',
    },
    {
      name: 'Electric Only (50 Amp)',
      count: 48,
      amenities: '50 amp electric hookup. Picnic table, fire ring, lantern post.',
      fee: '$34-$40/night',
    },
    {
      name: 'Electric Only (30 Amp)',
      count: 22,
      amenities: '30 amp electric hookup. Picnic table, fire ring, lantern post.',
      fee: '$30-$36/night',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Bathhouses',
      description: 'Multiple bathhouses with restrooms and hot showers throughout campground loops.',
      available: true,
      accessibility: 'Universally accessible facilities provided',
    },
    {
      name: 'Dump Station',
      description: 'Sewage dump stations and fresh water fill-up stations available.',
      available: true,
    },
    {
      name: 'Boat Ramp',
      description: 'Concrete boat ramp located within campground. Direct lake access.',
      available: true,
    },
    {
      name: 'Playgrounds',
      description: 'Multiple playgrounds - one in each campground loop.',
      available: true,
    },
    {
      name: 'Interpretive Shelter',
      description: 'Available for reservation by campers for special occasions and gatherings.',
      available: true,
    },
    {
      name: 'Cell Service',
      description: 'No cellular coverage. AT&T, Verizon, T-Mobile all report no service.',
      available: false,
    },
    {
      name: 'WiFi',
      description: 'Mixed reports on availability. Not officially confirmed by USACE.',
      available: false,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Bulltown Historic Area',
      distance: 'Walking distance (adjacent)',
      description: 'Civil War battlefield from October 13, 1863. Cunningham farmstead, museum with exhibits, original section of Weston and Gauley Bridge Turnpike. Self-guided trails available.',
      season: 'Museum: Thu-Sun 10AM-5:30PM (Summer), Fri-Sun 10AM-5:30PM (Fall). Free admission.',
    },
    {
      name: 'Swimming Beach',
      distance: 'Approximately 1 mile',
      description: 'Beach at Bulltown Day Use Area with restrooms, change booths, and outdoor showers. No lifeguards on duty - swim at your own risk.',
      season: 'Memorial Day through Labor Day',
    },
    {
      name: 'Burnsville Docks / Marina',
      distance: 'At Riffle Run Day Use Area (dam side)',
      description: 'Pontoon boat rentals ($350/day, $200/half-day plus fuel). Seasonal boat slip rentals April 15 - October 1. Jet ski rentals available.',
      link: 'https://burnsvilledock.com',
    },
    {
      name: 'Fishing',
      distance: 'On-site (boat ramp) and shoreline',
      description: 'Burnsville Lake gamefish: largemouth bass, smallmouth bass, walleye, saugeye, crappie, muskellunge, channel catfish, flathead catfish. Trout stocked in tailwaters during spring.',
    },
    {
      name: 'Burnsville Lake WMA',
      distance: 'Adjacent (12,579 acres)',
      description: 'Public hunting land surrounding the lake. Deer, turkey, grouse, squirrel, rabbit, bear. WV hunting license required.',
      link: '/near/wma/burnsville/',
    },
    {
      name: 'Hiking/Biking Trails',
      distance: 'Access from campground',
      description: '100+ miles of trails in surrounding Wildlife Management Area. Bicycles permitted on main roads and campground areas. Contact ranger for off-road mountain biking areas.',
    },
    {
      name: 'Horseback Riding',
      distance: 'Burnsville WMA (not in campground)',
      description: 'Private horseback riding permitted on established WMA trails. Not allowed in camping or day-use areas. Riders under 15 must wear helmet (WV law).',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Reservations',
      details: 'Peak season: Reserve through Recreation.gov or call 1-877-444-6777. Off-peak season: First-come, first-served basis.',
      important: true,
    },
    {
      category: 'Check-In / Check-Out',
      details: 'Check-in: 6:00 PM. Check-out: 5:00 PM. Visiting hours end at 10:00 PM.',
      important: true,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 days in any 30-day consecutive period at Burnsville Lake.',
      important: true,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 6:00 AM. Respect your neighbors.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Pets allowed except in Loops E and F. Must be penned, caged, on leash under 6 feet, or otherwise physically restrained. Owners must clean up after pets.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in designated fire rings only. Firewood available locally.',
      important: false,
    },
    {
      category: 'Vehicles',
      details: 'Two vehicles per site maximum. Overflow parking available.',
      important: false,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Bulltown Campground Direct',
      phone: '(304) 452-8006',
      address: '1183 Bulltown Campground Road, Napier, WV 26631',
    },
    {
      type: 'Reservations (Recreation.gov)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/campgrounds/233443',
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
      type: 'Bulltown Historic Area / Visitor Center',
      phone: '(304) 452-8170',
    },
    {
      type: 'Burnsville Marina',
      phone: '(304) 853-2822',
      url: 'https://burnsvilledock.com',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Peak Season',
      dates: 'May 25 - September 3 (approximately)',
      bookingStatus: 'Reservations via Recreation.gov recommended',
    },
    {
      period: 'Off-Peak (Spring)',
      dates: 'Mid-April - May 24',
      bookingStatus: 'First-come, first-served (some loops may be closed)',
    },
    {
      period: 'Off-Peak (Fall)',
      dates: 'September 4 - late November',
      bookingStatus: 'First-come, first-served (self-service kiosks)',
    },
    {
      period: 'Winter Closure',
      dates: 'Late November - Mid-April',
      bookingStatus: 'CLOSED',
    },
  ],

  // Gear checklist
  gearList: [
    { name: 'Campsite reservation confirmation', optional: false },
    { name: 'RV hookup adapters (30A/50A)', optional: true },
    { name: 'Leveling blocks for RV', optional: true },
    { name: 'Firewood (or purchase locally)', optional: false },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Cooler with ice', optional: false },
    { name: 'Offline maps (no cell service)', optional: false },
    { name: 'Cash for firewood/ice vendors', optional: true },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Camera for Civil War history', optional: true },
  ],

  // Related shop categories
  relatedShop: [
    {
      name: 'Camping Gear',
      description: 'Tents, sleeping bags, cookware, and campsite essentials',
      href: '/shop/camping',
    },
    {
      name: 'Fishing Gear',
      description: 'Rods, tackle, and live bait for Burnsville Lake',
      href: '/shop/fishing',
    },
    {
      name: 'Hunting Licenses',
      description: 'WV licenses and stamps for Burnsville Lake WMA',
      href: '/shop/licenses',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.84543,
    lng: -80.61734,
  },
  directions: 'From I-79 Exit 67 (Flatwoods): Travel north on US-19 for 10 miles, follow signs to Bulltown Campground. From I-79 Exit 91 (Roanoke/Clarksburg): Travel south on US-19 for 28 miles.',
  cellService: 'No cellular coverage. AT&T, Verizon, T-Mobile all report no service. Download offline maps before arrival.',
  maxRvLength: '40 feet maximum',
};
