/**
 * Carnifex Ferry Battlefield State Park - Historic Site Data
 * SPEC-19: Complete structured data for HistoricTemplate
 *
 * Civil War battlefield where Union forces under General Rosecrans
 * defeated Confederate troops under General Floyd on September 10, 1861.
 *
 * @module data/historic/carnifex-ferry
 */

import type { HistoricTemplateProps } from '../../types/templates/historic';

// ============================================================================
// HISTORICAL CONTEXT
// ============================================================================

export const historicalContext: HistoricTemplateProps['historicalContext'] = {
  timeline: [
    { year: '1861', event: 'Civil War begins - West Virginia remains loyal to Union' },
    { year: 'Sept 10, 1861', event: 'Battle of Carnifex Ferry fought' },
    { year: '1862', event: 'West Virginia statehood process begins' },
    { year: '1863', event: 'West Virginia becomes 35th state' },
    { year: '1935', event: 'CCC develops state park on battlefield' },
  ],
  events: [
    {
      date: 'September 10, 1861',
      title: 'Battle of Carnifex Ferry',
      description: 'Union forces under Brigadier General William Rosecrans attacked Confederate troops commanded by Brigadier General John B. Floyd at the Patterson Farm. After fierce fighting, Floyd withdrew his forces across the Gauley River under cover of darkness.',
    },
    {
      date: 'September 11, 1861',
      title: 'Confederate Retreat',
      description: 'Floyd\'s forces completed their retreat across the Gauley River, abandoning the strategic position. This victory helped secure western Virginia for the Union and contributed to West Virginia\'s eventual statehood.',
    },
  ],
  keyFigures: [
    {
      name: 'William S. Rosecrans',
      role: 'Union Brigadier General',
      bio: 'Led Union forces to victory at Carnifex Ferry. Later commanded the Army of the Cumberland and fought at Chickamauga.',
    },
    {
      name: 'John B. Floyd',
      role: 'Confederate Brigadier General',
      bio: 'Former U.S. Secretary of War who commanded Confederate forces. His retreat preserved his army but ceded strategic control of the region.',
    },
    {
      name: 'Henry Patterson',
      role: 'Local Farmer',
      bio: 'Owned the farm where the battle was fought. The Patterson House served as Floyd\'s headquarters and still stands today.',
    },
  ],
  significance: 'The Battle of Carnifex Ferry was a crucial early Civil War engagement that helped secure western Virginia for the Union. This victory, combined with other Union successes in the region, paved the way for West Virginia\'s admission to the Union as the 35th state in 1863. The battlefield represents the divided loyalties of Appalachian communities during the Civil War.',
};

// ============================================================================
// PRESERVED STRUCTURES
// ============================================================================

export const structures: HistoricTemplateProps['structures'] = [
  {
    name: 'Patterson House',
    type: 'Original Structure',
    year: '1840s',
    description: 'The two-story log house served as Confederate General Floyd\'s headquarters during the battle. One of the few surviving structures from the original farm.',
    condition: 'Restored',
    accessible: true,
    // TODO: Add image when asset available at /images/historic/carnifex-ferry/patterson-house.jpg
  },
  {
    name: 'Civil War Museum',
    type: 'Visitor Center',
    year: '1960s',
    description: 'Houses artifacts from the battle including weapons, uniforms, and personal items. Features interpretive displays explaining the battle\'s significance.',
    condition: 'Preserved',
    accessible: true,
  },
  {
    name: 'Confederate Earthworks',
    type: 'Original Fortifications',
    year: '1861',
    description: 'Remaining defensive earthworks constructed by Floyd\'s forces. Walking trails allow visitors to explore the original battle positions.',
    condition: 'Preserved',
    accessible: false,
  },
  {
    name: 'Monument to the Battle',
    type: 'Monument',
    year: '1934',
    description: 'CCC-constructed monument commemorating the battle and those who fought. Located at a scenic overlook of the Gauley River.',
    condition: 'Preserved',
    accessible: true,
  },
];

// TODO: Add site map when asset available at /maps/carnifex-ferry-battlefield-map.pdf
export const siteMapUrl: string | undefined = undefined;

// ============================================================================
// TOURS
// ============================================================================

export const tours: HistoricTemplateProps['tours'] = [
  {
    type: 'Self-Guided',
    name: 'Battlefield Walking Trail',
    duration: '45-60 minutes',
    description: 'Follow numbered markers through the battlefield, viewing Confederate earthworks, the Patterson House, and scenic overlooks. Trail guide brochures available at the museum.',
    cost: 'Free',
  },
  {
    type: 'Ranger-Led',
    name: 'Civil War History Tour',
    duration: '90 minutes',
    description: 'Park rangers lead in-depth tours covering battle tactics, soldier experiences, and the broader context of the Civil War in West Virginia.',
    schedule: 'Saturdays at 11am and 2pm, Memorial Day through Labor Day',
    cost: 'Free',
  },
  {
    type: 'Special Event',
    name: 'Battle Anniversary Reenactment',
    duration: 'All day',
    description: 'Annual living history event with battle reenactments, period camps, and historical demonstrations. Held the weekend nearest September 10th.',
    schedule: 'Second weekend of September',
    cost: '$5 adults, children free',
    reservationUrl: 'https://wvstateparks.com/events/',
  },
];

// ============================================================================
// EXHIBITS
// ============================================================================

export const exhibits: HistoricTemplateProps['exhibits'] = [
  {
    title: 'The Battle of Carnifex Ferry',
    location: 'Civil War Museum',
    description: 'Primary exhibit featuring artifacts, maps, and narratives explaining the September 10, 1861 battle and its significance.',
    interactive: true,
    featuredArtifacts: [
      'Union and Confederate uniforms',
      'Weapons recovered from the battlefield',
      'Personal items of soldiers',
      'Original battle maps',
    ],
  },
  {
    title: 'West Virginia\'s Road to Statehood',
    location: 'Civil War Museum',
    description: 'Explores how the Civil War led to West Virginia\'s separation from Virginia and admission to the Union.',
    interactive: false,
  },
  {
    title: 'Life on the Home Front',
    location: 'Patterson House',
    description: 'Seasonal exhibit depicting how civilians like the Patterson family experienced the war as it literally came to their doorstep.',
    dates: 'May through October',
    interactive: true,
  },
];

// ============================================================================
// EDUCATIONAL PROGRAMS
// ============================================================================

export const education: HistoricTemplateProps['education'] = {
  programs: [
    {
      name: 'Civil War Field Trip Program',
      type: 'School Program',
      audience: 'School Groups (Grades 4-12)',
      description: 'Standards-aligned field trip program including guided battlefield tour, museum visit, and hands-on activities exploring Civil War history.',
      duration: '3 hours',
      cost: 'Free for WV schools',
      contactForInquiry: 'carnifexferry@wvstateparks.com',
    },
    {
      name: 'Junior Historian Program',
      type: 'Family Activity',
      audience: 'Families with children ages 6-12',
      description: 'Self-guided activity booklet challenges young visitors to explore the battlefield and learn about Civil War history. Earn a Junior Historian badge!',
      duration: '1-2 hours',
      cost: 'Free',
    },
    {
      name: 'Living History Days',
      type: 'Living History',
      audience: 'All Ages',
      description: 'Experience life during the Civil War with costumed interpreters demonstrating period crafts, music, and military drills.',
      duration: 'All day events',
      cost: 'Free',
    },
  ],
  resources: [
    {
      title: 'Battle of Carnifex Ferry Teacher Guide',
      type: 'Lesson Plan',
      // TODO: Add downloadUrl when asset available at /resources/carnifex-ferry-teacher-guide.pdf
      downloadUrl: undefined,
    },
    {
      title: 'Civil War in West Virginia Timeline',
      type: 'Brochure',
      // TODO: Add downloadUrl when asset available at /resources/wv-civil-war-timeline.pdf
      downloadUrl: undefined,
    },
  ],
};

// ============================================================================
// VISITOR INFORMATION
// ============================================================================

export const visitorInfo: HistoricTemplateProps['visitorInfo'] = {
  hours: [
    { season: 'Summer (Memorial Day - Labor Day)', hours: 'Daily 10am - 6pm' },
    { season: 'Spring/Fall', hours: 'Weekends 10am - 5pm' },
    { season: 'Winter', hours: 'Grounds open dawn to dusk, museum closed' },
  ],
  fees: [
    { type: 'General Admission', amount: 'Free' },
    { type: 'Special Events', amount: 'Varies by event' },
  ],
  parking: 'Free parking available at visitor center and trailhead lots',
  facilities: [
    'Restrooms',
    'Picnic shelters',
    'Gift shop',
    'Playground',
  ],
  accessibility: [
    'Wheelchair accessible museum',
    'Accessible parking',
    'Paved paths to main overlook',
    'Accessible restrooms',
  ],
  phone: '304-872-0825',
  email: 'carnifexferry@wvstateparks.com',
};

// ============================================================================
// NEARBY HISTORY
// ============================================================================

export const nearbyHistory: HistoricTemplateProps['nearbyHistory'] = [
  {
    name: 'Rich Mountain Battlefield',
    distance: '35 miles',
    direction: 'north',
    relation: 'Site of Union victory one week before Carnifex Ferry (July 11, 1861)',
    type: 'Battlefield',
    // URL: Future SPEC - /historic/rich-mountain-battlefield
  },
  {
    name: 'Droop Mountain Battlefield',
    distance: '45 miles',
    direction: 'south',
    relation: 'Largest Civil War battle fought in West Virginia (November 6, 1863)',
    type: 'Battlefield',
    // URL: Future SPEC - /historic/droop-mountain-battlefield
  },
  {
    name: 'Summersville Lake',
    distance: '5 miles',
    direction: 'south',
    relation: 'Modern recreation on land near historic battleground',
    type: 'Recreation',
    url: '/near/summersville-lake',
  },
];

// ============================================================================
// COORDINATES (for schema/SEO)
// ============================================================================

export const coordinates = {
  lat: 38.2056,
  lng: -80.9442,
};

// ============================================================================
// MANAGING AGENCY
// ============================================================================

export const managingAgency = 'WV State Parks';
