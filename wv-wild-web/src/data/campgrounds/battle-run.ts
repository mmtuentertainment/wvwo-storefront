/**
 * Battle Run Campground Data
 * SPEC-23: Campground data for CampgroundTemplate
 *
 * Extracted from verified USACE research (100% sourced data)
 * Primary sources: USACE Huntington District, Recreation.gov
 *
 * Key highlights:
 * - 117 total campsites (110 electric 30A, 7 tent-only walk-in)
 * - 1,000-foot swimming beach (no lifeguards)
 * - PETS PROHIBITED (unlike other USACE campgrounds)
 * - Season: May 1 - Columbus Day
 */

import type { CampgroundTemplateProps } from '../../types/adventure';

/**
 * Complete campground data for Battle Run Campground
 * Ready to spread into CampgroundTemplate component
 */
export const battleRunCampgroundData: CampgroundTemplateProps = {
  // Hero section
  name: 'Battle Run Campground',
  image: '/images/campgrounds/battle-run-campground-hero.webp',
  imageAlt: 'Battle Run Campground at Summersville Lake with wooded campsites and mountain views',
  tagline: '117 campsites on Summersville Lake. Swimming beach. Mountain lake views.',
  description: `Battle Run Campground sits on the shore of Summersville Lake in Nicholas County, West Virginia. 117 campsites spread across wooded loops, with 110 offering 30-amp electric hookups and 7 primitive tent-only sites tucked away 150-200 feet from parking for a more secluded experience.

What makes Battle Run special is the 1,000-foot swimming beach right at the campground. No lifeguards, but clean sand and clear mountain lake water for cooling off after a day on the trails. Three shower houses with hot water, laundry facilities, and a dump station keep the RV crowd comfortable.

Summersville Lake is the largest lake in West Virginia - 2,790 acres of deep, clear water perfect for fishing, boating, swimming, and cliff jumping (at designated areas). The campground has its own boat ramp plus kayak launch. Reserve through Recreation.gov up to 6 months in advance for peak season - this one fills up fast.

IMPORTANT: Pets are strictly prohibited at Battle Run - no dogs, no exceptions. Plan accordingly.`,

  // Quick Stats (Hero Section)
  stats: [
    { value: '117', label: 'Campsites', icon: 'area' as const },
    { value: '55 min', label: 'From Shop', icon: 'time' as const },
    { value: 'Nicholas Co.', label: 'Location', icon: 'location' as const },
    { value: '110', label: 'Electric Sites', icon: 'check' as const },
  ],

  // Campground metadata
  totalSites: 117,
  managingAgency: 'U.S. Army Corps of Engineers (Huntington District)',
  recreationGovId: '233388',
  county: 'Nicholas County',
  nearbyLake: 'Summersville Lake',
  quickHighlights: [
    '1,000-ft Swimming Beach',
    '30 Amp Electric Sites',
    'Boat Ramp On-Site',
    'Hot Showers & Laundry',
    'Kayak Launch',
  ],

  // Campsite categories
  campsites: [
    {
      name: 'Electric Only (30 Amp)',
      count: 110,
      amenities: '30 amp electric hookup. Gravel pad (up to 50ft RV). Picnic table, fire ring with grill. Water spigots in each loop.',
      fee: '$34/night',
    },
    {
      name: 'Tent-Only Walk-In',
      count: 7,
      amenities: 'Primitive sites 150-200 feet walk from parking. No hookups. Picnic table, fire ring. More secluded camping experience.',
      fee: '$24/night',
    },
  ],

  // Amenities
  amenities: [
    {
      name: 'Shower Houses',
      description: '3 shower houses with hot showers and flush toilets throughout campground.',
      available: true,
      accessibility: 'ADA accessible facilities available',
    },
    {
      name: 'Laundry',
      description: 'Coin-operated washers and dryers available at shower houses.',
      available: true,
    },
    {
      name: 'Dump Station',
      description: 'RV dump station located at front of campground.',
      available: true,
    },
    {
      name: 'Swimming Beach',
      description: '1,000-foot public swimming beach. No lifeguards - swim at your own risk. Pets and alcohol prohibited at beach.',
      available: true,
    },
    {
      name: 'Boat Ramp',
      description: 'Concrete boat ramp with direct Summersville Lake access.',
      available: true,
    },
    {
      name: 'Kayak Launch',
      description: 'Dedicated kayak and paddleboard launch ramp.',
      available: true,
    },
    {
      name: 'Fishing Pier',
      description: 'Fishing pier available for shoreline anglers.',
      available: true,
    },
    {
      name: 'Playground',
      description: 'Playground equipment for children.',
      available: true,
    },
    {
      name: 'Sports Courts',
      description: 'Basketball and volleyball courts.',
      available: true,
    },
    {
      name: 'Nature Trails',
      description: 'Hiking trails accessible from campground.',
      available: true,
    },
    {
      name: 'Firewood Sales',
      description: 'Firewood available for purchase at campground. Do not bring firewood from outside area (Emerald Ash Borer prevention).',
      available: true,
    },
  ],

  // Nearby activities
  nearbyActivities: [
    {
      name: 'Summersville Lake',
      distance: 'On-site',
      description: 'West Virginia\'s largest lake - 2,790 acres of deep, clear water. Fishing for bass, walleye, catfish, and crappie. Swimming, boating, water skiing, cliff jumping at designated areas.',
      link: '/near/lake/summersville/',
    },
    {
      name: 'Salmon Run Recreation Area',
      distance: '6-7 miles',
      description: 'Day-use area with 2-lane boat ramp, kayak launch, swimming area, and fishing pier. Open year-round. Gateway to Gauley River Gorge.',
    },
    {
      name: 'Long Point Recreation Area',
      distance: 'Approximately 5 miles',
      description: '8 primitive campsites (year-round), boat ramp, scenic overlook, and the 4-mile Long Point Trail loop.',
    },
    {
      name: 'Summersville Lake WMA',
      distance: 'Adjacent (6,000+ acres)',
      description: 'Public hunting land leased from USACE. Deer, turkey, squirrel, grouse. WV hunting license required. Managed by WV DNR.',
      link: '/near/wma/summersville/',
    },
    {
      name: 'New River Gorge National Park',
      distance: 'Approximately 20 miles',
      description: 'America\'s newest national park. World-class rock climbing, whitewater rafting, hiking, and scenic beauty.',
    },
    {
      name: 'Gauley River',
      distance: 'Accessible via Salmon Run',
      description: 'Class IV-V whitewater during fall Gauley Season (September-October). Guided trips required for most sections.',
    },
    {
      name: 'Rock Climbing',
      distance: 'Pirates Cove area (by water or trail)',
      description: 'Summersville Lake offers some of WV\'s best deep-water soloing. Traditional climbing at New River Gorge nearby.',
    },
  ],

  // Reservation policies
  policies: [
    {
      category: 'Pets',
      details: 'STRICTLY PROHIBITED. No pets or livestock allowed at Battle Run Campground. This is different from most USACE campgrounds - plan accordingly.',
      important: true,
    },
    {
      category: 'Reservations',
      details: 'Peak season (Memorial Day - Labor Day): Reserve through Recreation.gov or 1-877-444-6777 up to 6 months in advance. Off-peak: First-come, first-served.',
      important: true,
    },
    {
      category: 'Check-In / Check-Out',
      details: 'Peak season office hours: 7:00 AM - Midnight. Off-peak: 5:00 PM - 9:00 PM. Check-out by noon.',
      important: true,
    },
    {
      category: 'Stay Limit',
      details: 'Maximum 14 consecutive nights. No more than 14 days in any 30-day consecutive period.',
      important: true,
    },
    {
      category: 'Quiet Hours',
      details: '10:00 PM to 8:00 AM. Respect your neighbors.',
      important: false,
    },
    {
      category: 'Occupancy',
      details: 'Maximum 8 people per site. Maximum 3 vehicles per site.',
      important: false,
    },
    {
      category: 'RV Length',
      details: 'Maximum 50 feet. Sites accommodate various RV sizes - check Recreation.gov for site-specific details.',
      important: false,
    },
    {
      category: 'Campfires',
      details: 'Permitted in fire rings only. Do not bring firewood from home - purchase locally to prevent spread of invasive species.',
      important: false,
    },
    {
      category: 'Alcohol',
      details: 'Permitted at campsites. Prohibited at swimming beach.',
      important: false,
    },
    {
      category: 'Firearms',
      details: 'Strictly prohibited on federal property. Leave hunting rifles at home.',
      important: true,
    },
    {
      category: 'Swimming',
      details: 'Swim at your own risk. No lifeguards on duty. Cliff diving prohibited since 2007.',
      important: false,
    },
  ],

  // Contact information
  contacts: [
    {
      type: 'Battle Run Campground',
      phone: '(304) 872-3459',
      address: '2981 Summersville Lake Road, Summersville, WV 26651',
    },
    {
      type: 'Reservations (Recreation.gov)',
      phone: '1-877-444-6777',
      url: 'https://www.recreation.gov/camping/campgrounds/233388',
    },
    {
      type: 'USACE Summersville Lake Office',
      phone: '(304) 872-3412',
      address: '2981 Summersville Lake Road, Summersville, WV 26651',
    },
    {
      type: 'Email',
      url: 'mailto:pa2@usace.army.mil',
    },
    {
      type: 'Summersville Lake Marina',
      phone: '(304) 872-1331',
    },
  ],

  // Seasonal dates
  seasonalDates: [
    {
      period: 'Peak Season',
      dates: 'Memorial Day weekend - Labor Day',
      bookingStatus: 'Reservations via Recreation.gov up to 6 months in advance',
    },
    {
      period: 'Off-Peak (Spring)',
      dates: 'May 1 - Memorial Day',
      bookingStatus: 'First-come, first-served',
    },
    {
      period: 'Off-Peak (Fall)',
      dates: 'Labor Day - Columbus Day',
      bookingStatus: 'First-come, first-served',
    },
    {
      period: 'Winter Closure',
      dates: 'Columbus Day - April 30',
      bookingStatus: 'CLOSED',
    },
  ],

  // Gear checklist
  gearList: [
    { name: 'Campsite reservation confirmation', optional: false },
    { name: 'RV hookup adapter (30A only)', optional: true },
    { name: 'Leveling blocks for RV', optional: true },
    { name: 'Cash for firewood purchase', optional: false },
    { name: 'Fishing rod and WV fishing license', optional: true },
    { name: 'Boat and life jackets', optional: true },
    { name: 'Kayak or paddleboard', optional: true },
    { name: 'Swimsuit and towels', optional: false },
    { name: 'Cooler with ice', optional: false },
    { name: 'Quarters for laundry', optional: true },
    { name: 'Bug spray and sunscreen', optional: false },
    { name: 'Rain gear', optional: false },
    { name: 'Camera for lake views', optional: true },
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
      description: 'Rods, tackle, and lures for Summersville Lake bass and walleye',
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
    lat: 38.21912,
    lng: -80.89541,
  },
  directions: 'From Summersville on US-19: Take WV-129 West (Summersville Lake Road) for approximately 3 miles. Campground entrance on right. Follow signs to Battle Run Campground.',
  cellService: 'Limited cellular coverage. AT&T and Verizon have moderate signal in some areas. Download offline maps before arrival.',
  maxRvLength: '50 feet maximum',
};
