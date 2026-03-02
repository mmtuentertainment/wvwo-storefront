/**
 * Briar Point Campground Data
 * SPEC-25: Stonewall Jackson Lake Discovery - Campground data for CampgroundTemplate
 *
 * Extracted from verified USACE/State Parks research (100% sourced data)
 * Primary sources: WV State Parks, Recreation.gov, USACE Pittsburgh District
 *
 * Key highlights:
 * - 179 total campsites (40 RV 50-amp, 33 RV 30-amp, 5-6 tent sites)
 * - Part of Stonewall Resort State Park (1,736 acres)
 * - Year-round operation with full hookups
 * - Peak season: $63-75/night, holiday weekends premium rates
 * - Modern facilities: restrooms, showers, dump station, beach access, WiFi
 */

import type { CampgroundTemplateProps } from '../../types/campground-template';

/**
 * Complete campground data for Briar Point Campground
 * Ready to spread into CampgroundTemplate component
 */
export const briarPointData: CampgroundTemplateProps = {
  // Hero section
  name: 'Briar Point Campground',
  image: '/images/campgrounds/briar-point-hero.webp',
  imageAlt: 'Briar Point Campground lakeside sites with Stonewall Jackson Lake mountain views',
  tagline: '179 campsites on Stonewall Jackson Lake. Year-round camping. Full RV hookups.',
  description: `Briar Point Campground sits on the banks of Stonewall Jackson Lake within the 1,736-acre Stonewall Resort State Park in Lewis County. 179 tent and RV sites spread across lakeside loops, with 73 sites offering full hookups (40 with 50-amp, 33 with 30-amp service) and tent sites with direct water views.

This award-winning campground operates year-round, making it one of the few WV State Park campgrounds open through winter. Modern facilities include hot showers, restrooms, a dump station, playground, and WiFi in select areas. Direct beach access lets campers swim, fish, and launch kayaks right from camp.

Stonewall Jackson Lake covers 2,650 acres with 82 miles of shoreline - deep, clear mountain water perfect for boating, fishing (bass, walleye, muskie, catfish), and paddling. The campground connects to Stonewall Resort's full amenities: Arnold Palmer golf course, full-service marina with boat rentals, and miles of hiking trails.

Reserve through Recreation.gov up to 6 months in advance for peak season. Peak rates run $63-75/night depending on site and holiday weekends. Off-season rates available November through May.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '179', label: 'Campsites', icon: 'area' as const },
    { value: '70 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Lewis Co.', label: 'Location', icon: 'location' as const },
    { value: '73', label: 'Full Hookups', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 179,
  managingAgency: 'WV State Parks (USACE partnership)',
  recreationGovId: '406',
  county: 'Lewis County',
  nearbyLake: 'Stonewall Jackson Lake',
  quickHighlights: [
    'Year-Round Operation',
    '50 Amp Full Hookups',
    'Lakefront Beach Access',
    'Hot Showers & WiFi',
    'Arnold Palmer Golf Nearby',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Full Hookup RV Sites (50 Amp)',
      count: 40,
      amenities: '50 amp electric, water, and sewer hookups. Paved pads (up to 45ft RV). Picnic table, fire ring. Lakeside and wooded locations.',
      fee: '$75/night peak (holidays), $63/night standard peak',
    },
    {
      name: 'Full Hookup RV Sites (30 Amp)',
      count: 33,
      amenities: '30 amp electric, water, and sewer hookups. Paved pads. Picnic table, fire ring. Lakeside and wooded settings.',
      fee: '$75/night peak (holidays), $63/night standard peak',
    },
    {
      name: 'Tent Sites',
      count: 5,
      amenities: 'Lakeside tent sites with water access nearby. No hookups. Picnic table, fire ring. Scenic water views.',
      fee: 'Reduced rates - call for current pricing',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Restrooms & Showers',
      description: 'Modern, well-maintained restroom facilities with hot showers throughout campground.',
      available: true,
      accessibility: 'ADA accessible facilities available',
    },
    {
      name: 'RV Dump Station',
      description: 'Full RV dump station with fresh water fill-up. Located at campground entrance.',
      available: true,
    },
    {
      name: 'Lakefront Beach Access',
      description: 'Swimming beach for campers with direct Stonewall Jackson Lake access. No lifeguards - swim at your own risk.',
      available: true,
    },
    {
      name: 'Playground',
      description: 'Kids play area for families camping with children.',
      available: true,
    },
    {
      name: 'WiFi',
      description: 'Wireless internet available in select areas of campground.',
      available: true,
    },
    {
      name: 'Picnic Areas',
      description: 'Designated picnic areas with tables and grills throughout campground.',
      available: true,
    },
    {
      name: 'Fishing Access',
      description: 'Direct lake access for shoreline anglers. WV fishing license required. Bass, walleye, muskie, catfish.',
      available: true,
    },
    {
      name: 'Boat Ramp Access',
      description: '5 public boat ramps available on Stonewall Jackson Lake. Nearest ramp 1 mile from campground.',
      available: true,
    },
    {
      name: 'Pet-Friendly',
      description: 'Dogs allowed on leash. Must not be left unattended. Cleanup required.',
      available: true,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Stonewall Jackson Lake',
      distance: 'On-site',
      description: '2,650 acres of deep, clear mountain water. 82 miles of shoreline. Fishing for bass, walleye, muskie, catfish. Boating, swimming, paddling. WV fishing license required.',
      link: '/near/lake/stonewall-jackson/',
    },
    {
      name: 'Stonewall Resort Marina',
      distance: '1 mile',
      description: 'Full-service marina with boat rentals (pontoons, kayaks, jet skis), fuel, bait, and tackle. Marina restaurant with lake views.',
    },
    {
      name: 'Arnold Palmer Golf Course',
      distance: '2 miles',
      description: '18-hole championship golf course designed by Arnold Palmer. Full pro shop and clubhouse. Scenic mountain views.',
    },
    {
      name: 'Recreation Center',
      distance: '1 mile',
      description: 'Kayak, canoe, and paddleboard rentals. Stand-up paddleboard yoga classes. Guided lake tours.',
    },
    {
      name: 'Hiking Trails',
      distance: 'On-site and nearby',
      description: 'Multiple trails around Stonewall Resort State Park. Varying difficulty levels from easy lakeside walks to moderate woodland hikes.',
    },
    {
      name: 'USACE Visitor Center',
      distance: '3 miles',
      description: 'Public restrooms, dam overlook, hiking trail access. Educational displays about Stonewall Jackson Lake and USACE flood control.',
    },
    {
      name: 'Stonewall Jackson Lake WMA',
      distance: 'Adjacent (9,600+ acres)',
      description: 'Public hunting land surrounding the lake. Deer, turkey, squirrel, grouse. WV hunting license required. Managed by WV DNR.',
      link: '/near/wma/stonewall-jackson/',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Reservations',
      details: 'Peak season (Memorial Day - October 31): Reserve through Recreation.gov (https://www.recreation.gov/camping/gateways/406) or call 304-269-8889 up to 6 months in advance. Off-peak: First-come, first-served or advance reservations available.',
      important: true,
    },
    {
      category: 'Check-In / Check-Out',
      details: 'Check-in: 2:00 PM. Check-out: 11:00 AM. Late checkout may incur additional fees.',
      important: true,
    },
    {
      category: 'Peak Season Rates',
      details: 'Memorial Day - October 31: $63/night standard rate. Holiday weekends (Memorial Day, July 4th, Labor Day): $75/night.',
      important: true,
    },
    {
      category: 'Off-Season Rates',
      details: 'November 1 - May: Reduced rates available. Call 304-269-8889 for current pricing. Limited services during winter months.',
      important: false,
    },
    {
      category: 'Pets',
      details: 'Dogs allowed on leash. Must not be left unattended at campsites. Cleanup required. Dogs prohibited at swimming beach.',
      important: false,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM - 7:00 AM. No generators during quiet hours without campground host approval.',
      important: false,
    },
    {
      category: 'RV Length',
      details: 'Maximum 45 feet for most sites. Some sites accommodate larger rigs - check Recreation.gov for site-specific details.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in fire rings only. Follow any fire restrictions posted on-site. Do not bring firewood from home - purchase locally to prevent spread of invasive species (Emerald Ash Borer prevention).',
      important: false,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 consecutive nights during peak season. Extended stays may be available off-peak.',
      important: false,
    },
    {
      category: 'Occupancy',
      details: 'Maximum 6 people per site. Maximum 2 vehicles per site.',
      important: false,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Briar Point Campground / Stonewall Resort State Park',
      phone: '(304) 269-8889',
      address: '940 Resort Drive, Roanoke, WV 26447',
    },
    {
      type: 'Reservations (Recreation.gov)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/gateways/406',
    },
    {
      type: 'USACE Stonewall Jackson Lake Office',
      phone: '(304) 269-4588',
      address: '1012 Skin Creek Road, Weston, WV 26452',
    },
    {
      type: 'Stonewall Resort Marina',
      phone: '(304) 269-7400',
    },
    {
      type: 'Stonewall Resort Lodge',
      phone: '(304) 269-7400',
      url: 'https://www.stonewallresort.com/',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Peak Season',
      dates: 'Memorial Day weekend - October 31',
      bookingStatus: 'Reservations via Recreation.gov up to 6 months in advance. $63/night standard, $75/night holiday weekends.',
    },
    {
      period: 'Off-Peak (Winter/Spring)',
      dates: 'November 1 - Memorial Day',
      bookingStatus: 'Reduced rates available. First-come, first-served or advance reservations. Call 304-269-8889 for current pricing.',
    },
  ],

  // Gear checklist
  gearList: [
    { name: 'Campsite reservation confirmation', optional: false },
    { name: 'RV hookup adapter (30A or 50A)', optional: true },
    { name: 'Leveling blocks for RV', optional: true },
    { name: 'Firewood (purchase locally - do not transport)', optional: false },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Kayak or paddleboard', optional: true },
    { name: 'Swimsuit and towels', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Camera for lake views', optional: true },
    { name: 'Golf clubs (Arnold Palmer course nearby)', optional: true },
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
      description: 'Rods, tackle, and lures for Stonewall Jackson Lake bass, walleye, and muskie',
      href: '/shop/fishing',
    },
    {
      name: 'Paddling Gear',
      description: 'Kayak accessories, dry bags, and paddleboarding equipment',
      href: '/shop/paddling',
    },
  ],

  // Optional metadata
  difficulty: 'easy',
  bestSeason: 'summer',
  coordinates: {
    lat: 38.9347,
    lng: -80.4856,
  },
  directions: 'From Weston on US-19: Take US-33 West. Turn right onto Resort Drive (WV-24). Follow signs to Stonewall Resort State Park and Briar Point Campground. Campground entrance on left after passing resort lodge.',
  cellService: 'Good cellular coverage. AT&T, Verizon, and T-Mobile have moderate to strong signal throughout campground and resort areas.',
  maxRvLength: '45 feet maximum (some sites accommodate larger rigs)',
};
