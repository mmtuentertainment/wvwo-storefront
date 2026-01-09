/**
 * Gerald R. Freeman Campground Data
 * SPEC-24: Campground data for CampgroundTemplate
 *
 * Extracted from verified Perplexity Pro research (100% sourced data)
 * Primary sources: USACE Official, Recreation.gov, WV DNR
 *
 * Key highlights:
 * - 156 total campsites
 * - Full hookups available (30/50 amp)
 * - Recreation.gov ID: 233678
 * - Season: April 18 - November 29
 * - LIMITED CELL SERVICE - critical note for visitors
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Gerald R. Freeman Campground
 * Ready to spread into CampgroundTemplate component
 */
export const geraldRFreemanCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Gerald R. Freeman Campground',
  image: '/images/campgrounds/gerald-r-freeman-hero.webp',
  imageAlt: 'Gerald R. Freeman Campground at Sutton Lake with wooded campsites and lake views',
  tagline: '156 campsites on Sutton Lake. Full hookups available. Wooded, peaceful setting.',
  description: `Gerald R. Freeman Campground sits on the eastern shore of Sutton Lake in Braxton County, West Virginia. Named after a dedicated USACE employee, this 156-site campground offers a quieter alternative to the busier recreation areas on the lake.

The campground features a mix of full hookup and electric-only sites spread through wooded loops. Most sites offer good shade and privacy. A boat ramp provides direct access to Sutton Lake's 1,440 acres of water - prime territory for bass, walleye, crappie, and catfish.

Important note: Cell service is limited at Gerald R. Freeman. Download offline maps and let folks know your plans before arrival. The road in is narrow and winding - take it slow, especially with larger RVs. A small store about 1/4 mile from the campground carries basic supplies like charcoal, milk, and camping essentials.

Reserve through Recreation.gov for peak season. First-come, first-served during off-peak periods. The 14-day stay limit (per 30-day period) applies to all Sutton Lake facilities.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '156', label: 'Campsites', icon: 'area' as const },
    { value: '50 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: '30/50A', label: 'Hookups', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 156,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '233678',
  county: 'Braxton County',
  nearbyLake: 'Sutton Lake',
  quickHighlights: [
    'Full Hookups Available',
    'Boat Ramp On-Site',
    'Wooded Sites',
    'Quiet Setting',
    'Lake Access',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Full Hookup (50 Amp)',
      count: 40,
      amenities: 'Water, 50 amp electric, sewer hookups. Picnic table, fire ring, lantern post.',
      fee: '$34-$46/night',
    },
    {
      name: 'Full Hookup (30 Amp)',
      count: 30,
      amenities: 'Water, 30 amp electric, sewer hookups. Picnic table, fire ring, lantern post.',
      fee: '$32-$42/night',
    },
    {
      name: 'Electric Only (50 Amp)',
      count: 46,
      amenities: '50 amp electric hookup. Picnic table, fire ring, lantern post.',
      fee: '$30-$38/night',
    },
    {
      name: 'Electric Only (30 Amp)',
      count: 40,
      amenities: '30 amp electric hookup. Picnic table, fire ring, lantern post.',
      fee: '$28-$36/night',
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
      description: 'Concrete boat ramp located within campground. Direct access to Sutton Lake.',
      available: true,
    },
    {
      name: 'Playground',
      description: 'Playground area for children within the campground.',
      available: true,
    },
    {
      name: 'Picnic Shelter',
      description: 'Day use picnic shelter available for gatherings.',
      available: true,
    },
    {
      name: 'Cell Service',
      description: 'LIMITED CELL SERVICE. Verizon has best coverage in Braxton County (68%). Download offline maps before arrival.',
      available: false,
    },
    {
      name: 'WiFi',
      description: 'No WiFi available. Plan accordingly for offline activities.',
      available: false,
    },
    {
      name: 'Camp Store',
      description: 'Small store approximately 1/4 mile from campground. Basic supplies: charcoal, milk, camping essentials.',
      available: true,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Sutton Lake Fishing',
      distance: 'On-site (boat ramp)',
      description: 'Sutton Lake offers excellent fishing for largemouth bass, smallmouth bass, spotted bass, walleye, saugeye, crappie, channel catfish, and flathead catfish. Trout stocked in tailwaters.',
    },
    {
      name: 'Bee Run Day Use Area',
      distance: 'Approximately 5 miles',
      description: 'Swimming beach with restrooms, change booths, and picnic facilities. No lifeguards - swim at your own risk.',
      season: 'Memorial Day through Labor Day',
    },
    {
      name: 'Sutton Lake Marina',
      distance: 'Bee Run area',
      description: 'Full-service marina with pontoon boat rentals, fishing boat rentals, kayak rentals. Bait and tackle shop, fuel dock.',
      link: 'https://suttonlakemarina.com',
    },
    {
      name: 'Bakers Run Campground',
      distance: 'Approximately 8 miles (west side)',
      description: 'Alternative USACE campground on Sutton Lake with additional camping options.',
    },
    {
      name: 'Elk River WMA',
      distance: '15 miles',
      description: 'Public hunting land with deer, turkey, grouse, squirrel, and small game. WV hunting license required.',
      link: '/near/wma/elk-river/',
    },
    {
      name: 'Sutton Dam Tailwater',
      distance: '10 miles',
      description: 'Excellent trout fishing below Sutton Dam. Spring stocking program with rainbow and brown trout.',
    },
    {
      name: 'Flatwoods Monster Museum',
      distance: '12 miles (Sutton)',
      description: 'Braxton County Visitors Center featuring local history and the famous Flatwoods Monster exhibit. Free admission.',
      season: 'Tue-Fri 9AM-5PM, Weekends 10AM-4PM. Closed Mondays.',
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
      details: 'Maximum 14 days in any 30-day consecutive period at Sutton Lake facilities.',
      important: true,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 6:00 AM. Respect your neighbors.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Pets allowed. Must be penned, caged, on leash under 6 feet, or otherwise physically restrained. Owners must clean up after pets.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in designated fire rings only. Firewood available at camp store.',
      important: false,
    },
    {
      category: 'Vehicles',
      details: 'Two vehicles per site maximum. Overflow parking available.',
      important: false,
    },
    {
      category: 'Road Access',
      details: 'Road to campground is narrow and winding. Take it slow, especially with larger RVs. GPS may not be accurate - call for directions if needed.',
      important: true,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Gerald R. Freeman Campground',
      phone: '(304) 765-7756',
      address: 'PO Box 426, Sutton, WV 26601',
    },
    {
      type: 'Alternate Phone',
      phone: '(304) 765-2816',
    },
    {
      type: 'Reservations (Recreation.gov)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/campgrounds/233678',
    },
    {
      type: 'USACE Sutton Lake Office',
      phone: '(304) 765-2267',
      address: 'PO Box 426, Sutton, WV 26601',
    },
    {
      type: 'Recorded Lake Information',
      phone: '(304) 765-2705',
    },
    {
      type: 'Sutton Lake Marina',
      phone: '(304) 765-2120',
      url: 'https://suttonlakemarina.com',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Full Season',
      dates: 'April 18 - November 29',
      bookingStatus: 'Reservations via Recreation.gov',
    },
    {
      period: 'Peak Season',
      dates: 'Memorial Day - Labor Day (approximately)',
      bookingStatus: 'Reservations highly recommended',
    },
    {
      period: 'Off-Peak (Spring)',
      dates: 'April 18 - Memorial Day',
      bookingStatus: 'First-come, first-served (some loops may be closed)',
    },
    {
      period: 'Off-Peak (Fall)',
      dates: 'Labor Day - November 29',
      bookingStatus: 'First-come, first-served',
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
    { name: 'Firewood (or purchase at camp store)', optional: false },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Cooler with ice', optional: false },
    { name: 'OFFLINE MAPS (limited cell service)', optional: false },
    { name: 'Cash for camp store', optional: true },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Flashlight/headlamp', optional: false },
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
      description: 'Rods, tackle, and live bait for Sutton Lake',
      href: '/shop/fishing',
    },
    {
      name: 'Hunting Licenses',
      description: 'WV licenses and stamps for nearby WMAs',
      href: '/shop/licenses',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.668030,
    lng: -80.561406,
  },
  directions: 'From I-79 Exit 67: Turn right on WV-4 and go 1 mile. Turn left on WV-15 and travel 12 miles. Campground is on the right. Note: Road is narrow and winding. GPS directions may not be accurate - call (304) 765-7756 for assistance.',
  cellService: 'LIMITED CELL SERVICE. Verizon has best coverage in Braxton County (68.4%). AT&T second (51%). Download offline maps before arrival. I-79 has reliable coverage but signal drops in remote areas around the lake.',
  maxRvLength: '40 feet maximum (due to narrow, winding road)',
};
