/**
 * Bee Run Campground Data
 * SPEC-24: Campground data for CampgroundTemplate
 *
 * Extracted from verified Perplexity Pro research (100% sourced data)
 * Primary sources: USACE Official, Recreation.gov, WV DNR
 *
 * Key highlights:
 * - 12 primitive campsites (NO electric, NO water, NO showers)
 * - First-come, first-served only (no reservations)
 * - Near Bee Run Day Use Area with boat ramp
 * - Recreation.gov ID: 10086085
 * - Season: Late May - Early December
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Bee Run Campground
 * Ready to spread into CampgroundTemplate component
 */
export const beeRunCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Bee Run Campground',
  image: '/images/campgrounds/bee-run-campground-hero.webp',
  imageAlt: 'Bee Run Campground at Sutton Lake with primitive tent sites nestled in wooded hills',
  tagline: '12 primitive sites on Sutton Lake. No hookups. No reservations. Just nature.',
  description: `Bee Run Campground sits on the quiet eastern shore of Sutton Lake in Braxton County, West Virginia. This is primitive camping - 12 tent sites with vault toilets, fire rings, and nothing else. No electric. No water hookups. No showers. Just you, the woods, and the lake.

What you get is solitude. While RV campers pack into the bigger campgrounds, Bee Run stays peaceful. Pull in, pick a site, pay at the self-service station. First-come, first-served means no reservations, no phone calls, no hassle. Show up before the weekend crowds and you'll have your pick.

The Bee Run Day Use Area is right there with a boat ramp for lake access. Sutton Lake offers 40 miles of shoreline, good bass and walleye fishing, and some of the clearest water in central West Virginia. Bring your own drinking water, pack out your trash, and leave the campsite better than you found it.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '12', label: 'Primitive Sites', icon: 'area' as const },
    { value: '40 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Braxton Co.', label: 'Location', icon: 'location' as const },
    { value: 'FCFS', label: 'No Reservations', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 12,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '10086085',
  county: 'Braxton County',
  nearbyLake: 'Sutton Lake',
  quickHighlights: [
    'Primitive Tent Camping',
    'First-Come, First-Served',
    'Boat Ramp Nearby',
    'Quiet & Secluded',
    'No Hookups',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Primitive Tent Sites',
      count: 12,
      amenities: 'Picnic table, fire ring, lantern post. NO electric, NO water hookups.',
      fee: '$10-$14/night',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Vault Toilets',
      description: 'Vault toilet facilities available. No flush toilets.',
      available: true,
    },
    {
      name: 'Fire Rings',
      description: 'Each site includes a fire ring for campfires. Bring your own firewood or gather deadfall.',
      available: true,
    },
    {
      name: 'Picnic Tables',
      description: 'Each site includes a picnic table.',
      available: true,
    },
    {
      name: 'Electric Hookups',
      description: 'NO electric hookups available. This is primitive camping only.',
      available: false,
    },
    {
      name: 'Water Hookups',
      description: 'NO water hookups. Bring your own drinking water.',
      available: false,
    },
    {
      name: 'Showers',
      description: 'NO showers available. Primitive camping - pack accordingly.',
      available: false,
    },
    {
      name: 'Dump Station',
      description: 'NO dump station at Bee Run. Nearest at Bakers Run Campground.',
      available: false,
    },
    {
      name: 'Cell Service',
      description: 'Limited cell coverage. Verizon has best coverage in Braxton County (68.4%). Download offline maps.',
      available: false,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Bee Run Day Use Area',
      distance: 'Adjacent',
      description: 'Boat ramp with direct Sutton Lake access. Day use fee $3 per vehicle for boat launching.',
      season: 'Year-round access',
    },
    {
      name: 'Fishing - Sutton Lake',
      distance: 'On-site (boat ramp)',
      description: 'Sutton Lake gamefish: largemouth bass, smallmouth bass, spotted bass, walleye, saugeye, channel catfish, flathead catfish. 40 miles of shoreline.',
    },
    {
      name: 'Swimming',
      distance: 'Bee Run Day Use Area',
      description: 'Swimming available at day use area. No lifeguards on duty - swim at your own risk.',
      season: 'Memorial Day through Labor Day',
    },
    {
      name: 'Bakers Run Campground',
      distance: 'Approximately 8 miles',
      description: 'Larger USACE campground with electric hookups, showers, and dump station if you need more amenities.',
      link: '/near/campground/bakers-run/',
    },
    {
      name: 'Gerald R. Freeman Campground',
      distance: 'Approximately 10 miles',
      description: 'Full-service USACE campground on Sutton Lake with electric sites and full amenities.',
      link: '/near/campground/gerald-r-freeman/',
    },
    {
      name: 'Sutton Lake Marina',
      distance: 'Approximately 5 miles',
      description: 'Private marina with boat rentals, fuel, and supplies. Call ahead for availability.',
      link: 'https://suttonlakemarina.com',
    },
    {
      name: 'Sutton Dam',
      distance: 'Approximately 4 miles',
      description: 'USACE dam with visitor information center. Good tailwater fishing below dam for trout.',
    },
    {
      name: 'Downtown Sutton',
      distance: 'Approximately 5 miles',
      description: 'Historic downtown with local shops, restaurants, and the Flatwoods Monster Museum. Gas and groceries available.',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Reservations',
      details: 'First-come, first-served ONLY. No reservations accepted. Pay at self-service station upon arrival.',
      important: true,
    },
    {
      category: 'Season',
      details: 'Open late May through early December. Exact dates vary by year - contact USACE office.',
      important: true,
    },
    {
      category: 'Payment',
      details: 'Self-service fee station. Cash or check only. Daily fee $10-$14 per night.',
      important: true,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 days in any 30-day consecutive period at Sutton Lake.',
      important: false,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 6:00 AM. Respect your neighbors.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Pets allowed. Must be on leash under 6 feet and under control at all times. Clean up after your pet.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in designated fire rings only. Check for fire restrictions during dry periods.',
      important: false,
    },
    {
      category: 'Water',
      details: 'BRING YOUR OWN DRINKING WATER. No potable water available at campground.',
      important: true,
    },
    {
      category: 'Trash',
      details: 'Pack it in, pack it out. No trash service. Leave no trace.',
      important: true,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Bee Run Campground',
      phone: '(304) 765-2816',
      address: '1734 Bee Run Road, Sutton, WV 26601',
    },
    {
      type: 'Sutton Lake Project Office',
      phone: '(304) 765-2816',
      address: 'PO Box 426, Sutton, WV 26601',
    },
    {
      type: 'Recorded Lake Information',
      phone: '(304) 765-2705',
    },
    {
      type: 'Recreation.gov (Info Only)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/campgrounds/10086085',
    },
    {
      type: 'Sutton Lake Marina (Private)',
      phone: '(304) 765-2120',
      url: 'https://suttonlakemarina.com',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Open Season',
      dates: 'Late May - Early December (approximately)',
      bookingStatus: 'First-come, first-served. No reservations.',
    },
    {
      period: 'Peak Season',
      dates: 'Memorial Day - Labor Day',
      bookingStatus: 'Arrive early on weekends - sites fill quickly.',
    },
    {
      period: 'Off-Peak (Fall)',
      dates: 'September - Early December',
      bookingStatus: 'Less crowded. Great for fall foliage.',
    },
    {
      period: 'Winter Closure',
      dates: 'Early December - Late May',
      bookingStatus: 'CLOSED',
    },
  ],

  // Gear checklist - emphasizes primitive camping needs
  gearList: [
    { name: 'Drinking water (5+ gallons)', optional: false },
    { name: 'Tent and ground tarp', optional: false },
    { name: 'Sleeping bag rated for cool nights', optional: false },
    { name: 'Camping stove and fuel', optional: false },
    { name: 'Cooler with ice (no electricity)', optional: false },
    { name: 'Headlamp/flashlight with extra batteries', optional: false },
    { name: 'Firewood (or gather deadfall)', optional: true },
    { name: 'Fire starter and matches', optional: false },
    { name: 'First aid kit', optional: false },
    { name: 'Trash bags (pack it out)', optional: false },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Offline maps (limited cell service)', optional: false },
    { name: 'Cash for self-service fee station', optional: false },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Camp chair', optional: true },
    { name: 'Biodegradable soap (pack out gray water)', optional: true },
  ],

  // Related shop categories
  relatedShop: [
    {
      name: 'Camping Gear',
      description: 'Tents, sleeping bags, cookware, and primitive camping essentials',
      href: '/shop/camping',
    },
    {
      name: 'Fishing Gear',
      description: 'Rods, tackle, and live bait for Sutton Lake',
      href: '/shop/fishing',
    },
    {
      name: 'Coolers & Storage',
      description: 'Keep food fresh without electricity',
      href: '/shop/coolers',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.655582,
    lng: -80.682071,
  },
  directions: 'From I-79 Exit 62 (Sutton/Gassaway): Head north on WV-4 toward Sutton Dam. Turn right onto Bee Run Road and follow signs to Bee Run Day Use Area and Campground.',
  cellService: 'Limited coverage. Verizon best in Braxton County (68.4%). AT&T second (51%). Download offline maps before arrival.',
};
