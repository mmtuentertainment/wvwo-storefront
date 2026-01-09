/**
 * Bakers Run Campground Data
 * SPEC-24: Campground data for CampgroundTemplate
 *
 * Extracted from verified Perplexity Pro research (100% sourced data)
 * Primary sources: USACE Official, Recreation.gov, WV DNR
 *
 * Key highlights:
 * - 77 total campsites (electric and waterfront available)
 * - Located on Sutton Lake (Elk River arm)
 * - Recreation.gov ID: 10122583
 * - Season: May 1 - September 30 (shorter season than other USACE campgrounds)
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Bakers Run Campground
 * Ready to spread into CampgroundTemplate component
 */
export const bakersRunCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Bakers Run Campground',
  image: '/images/campgrounds/bakers-run-campground-hero.webp',
  imageAlt: 'Bakers Run Campground at Sutton Lake with waterfront campsites and wooded hills',
  tagline: '77 campsites on Sutton Lake. Electric hookups. Waterfront sites available.',
  description: `Bakers Run Campground sits on the Elk River arm of Sutton Lake in Braxton County, West Virginia. 77 campsites spread through a wooded setting, many with direct waterfront access. This USACE campground offers a quieter, more rustic experience compared to the larger Gerald R. Freeman Campground on the other side of the lake.

The campground features electric hookups, modern restrooms with hot showers, and a boat ramp for direct lake access. Waterfront sites are highly sought after - book early for summer weekends. The shorter season (May 1 - September 30) means concentrated demand during peak months.

Sutton Lake offers excellent fishing for bass, walleye, catfish, and crappie. The lake's 40 miles of shoreline and 1,440 surface acres provide plenty of room for boating, skiing, and swimming. Bakers Run puts you right on the water with minimal crowds.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '77', label: 'Campsites', icon: 'area' as const },
    { value: '50 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: 'Electric', label: 'Hookups', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 77,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '10122583',
  county: 'Braxton County',
  nearbyLake: 'Sutton Lake',
  quickHighlights: [
    'Waterfront Sites',
    'Electric Hookups',
    'Boat Ramp On-Site',
    'Hot Showers',
    'Fishing Access',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Electric Sites (Waterfront)',
      count: 30,
      amenities: 'Electric hookup (30/50 amp). Waterfront location. Picnic table, fire ring, lantern post.',
      fee: '$28-$34/night',
    },
    {
      name: 'Electric Sites (Standard)',
      count: 35,
      amenities: 'Electric hookup (30/50 amp). Wooded setting. Picnic table, fire ring, lantern post.',
      fee: '$24-$30/night',
    },
    {
      name: 'Non-Electric Sites',
      count: 12,
      amenities: 'No hookups. Rustic setting. Picnic table, fire ring, lantern post.',
      fee: '$18-$22/night',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Bathhouses',
      description: 'Modern bathhouses with restrooms and hot showers throughout campground.',
      available: true,
      accessibility: 'Accessible facilities provided',
    },
    {
      name: 'Dump Station',
      description: 'Sewage dump station and fresh water fill-up available.',
      available: true,
    },
    {
      name: 'Boat Ramp',
      description: 'Concrete boat ramp located within campground. Direct Sutton Lake access.',
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
      description: 'Limited coverage. Verizon and AT&T may have weak signal. Download offline maps.',
      available: false,
    },
    {
      name: 'WiFi',
      description: 'No WiFi available at campground.',
      available: false,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Sutton Lake Fishing',
      distance: 'On-site (boat ramp)',
      description: 'Sutton Lake gamefish: largemouth bass, smallmouth bass, spotted bass, walleye, saugeye, channel catfish, flathead catfish, crappie. Bank fishing and boat fishing available.',
    },
    {
      name: 'Swimming',
      distance: 'Bee Run Day Use Area (5 miles)',
      description: 'Designated swimming beach at Bee Run with restrooms and changing facilities. No lifeguards - swim at your own risk.',
      season: 'Memorial Day through Labor Day',
    },
    {
      name: 'Sutton Lake Marina',
      distance: 'Approximately 8 miles',
      description: 'Full-service marina with boat rentals, fuel, bait, and tackle. Pontoon and fishing boat rentals available.',
      link: 'https://suttonlakemarina.com',
    },
    {
      name: 'Water Skiing / Tubing',
      distance: 'On-lake (from boat ramp)',
      description: 'Sutton Lake allows water skiing, tubing, and wake sports. 1,440 surface acres with plenty of open water.',
    },
    {
      name: 'Sutton Dam Tailwater Fishing',
      distance: 'Approximately 10 miles',
      description: 'Tailwater fishing below Sutton Dam for trout (seasonally stocked), smallmouth bass, and catfish. Popular fly fishing destination.',
    },
    {
      name: 'Flatwoods Monster Museum',
      distance: 'Sutton (10 miles)',
      description: 'Local curiosity - museum dedicated to the 1952 Flatwoods Monster sighting. Also serves as Braxton County Visitors Center with local history and travel info.',
      link: 'https://braxtonwv.org/the-flatwoods-monster/',
    },
    {
      name: 'Downtown Sutton',
      distance: '10 miles',
      description: 'Historic downtown with local shops, restaurants, and cobblestone streets. Groceries and supplies available.',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Reservations',
      details: 'Reserve through Recreation.gov or call 1-877-444-6777. Walk-ups available if sites open.',
      important: true,
    },
    {
      category: 'Season Dates',
      details: 'May 1 through September 30. CLOSED October through April.',
      important: true,
    },
    {
      category: 'Check-In / Check-Out',
      details: 'Check-in: 3:00 PM. Check-out: 2:00 PM.',
      important: true,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 days in any 30-day consecutive period at Sutton Lake.',
      important: true,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 6:00 AM. Respect your neighbors.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Pets allowed. Must be on leash under 6 feet at all times. Owners must clean up after pets.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in designated fire rings only. Do not leave fires unattended.',
      important: false,
    },
    {
      category: 'Vehicles',
      details: 'Two vehicles per site maximum. Additional vehicles in overflow parking.',
      important: false,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Bakers Run Campground Direct',
      phone: '(304) 765-5631',
      address: '441 Bakers Run Road, Sutton, WV 26601',
    },
    {
      type: 'Reservations (Recreation.gov)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/campgrounds/10122583',
    },
    {
      type: 'USACE Sutton Lake Office',
      phone: '(304) 765-2816',
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
      dates: 'May 1 - September 30',
      bookingStatus: 'Reservations via Recreation.gov',
    },
    {
      period: 'Peak Season',
      dates: 'Memorial Day - Labor Day',
      bookingStatus: 'Heavy demand - book early for weekends',
    },
    {
      period: 'Winter Closure',
      dates: 'October 1 - April 30',
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
    { name: 'Offline maps (limited cell service)', optional: false },
    { name: 'Cash for firewood/ice vendors', optional: true },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Swimsuit and towels', optional: true },
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
      name: 'Boating Accessories',
      description: 'Life jackets, boat supplies, and water sports gear',
      href: '/shop/boating',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.635873,
    lng: -80.576548,
  },
  directions: 'From I-79 Exit 62 (Sutton/Gassaway): Follow Route 4 north toward Sutton, then follow signs to Bakers Run Campground on Bakers Run Road. Approximately 10 miles from I-79.',
  cellService: 'Limited coverage. Verizon and AT&T may have weak signal in some areas. Download offline maps before arrival.',
  maxRvLength: '35 feet maximum',
};
