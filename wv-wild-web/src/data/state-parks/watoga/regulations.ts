/**
 * Watoga State Park - Regulations Section
 * Pet policies, fees, parking, alcohol, smoking, fires, special restrictions
 *
 * @module data/state-parks/watoga/regulations
 */

export const watogaRegulations = {
  pets: {
    allowed: true,
    leashRequired: true,
    petFriendlyAreas: [
      'Campground',
      'Most hiking trails',
      'Picnic areas',
      'Designated pet-friendly cabins',
    ],
    restrictions: [
      'Not allowed in lodge rooms',
      'Not allowed in restaurant',
      'Not allowed at swimming pool',
      'Select cabins only (pet fee applies)',
      'Must be leashed at all times',
      'Maximum 6-foot leash',
    ],
  },

  dayUseFees: {
    required: false,
    amount: 'Free',
    details: 'Day-use areas are free. Activity fees: Golf ($25-$45), Pool ($5), Boat rentals ($10-$25/hour).',
  },

  parking: {
    available: true,
    capacity: 300,
    fees: 'Free',
    restrictions: [
      'Park in designated areas only',
      'RV parking at campground',
      'Overflow parking available during events',
    ],
  },

  alcohol: {
    allowed: true,
    restrictions: [
      'Permitted in lodge restaurant only',
      'Not allowed in campground or public areas',
      'Not allowed on trails',
    ],
  },

  smoking: {
    allowed: false,
    designatedAreas: true,
    restrictions: [
      'Designated smoking areas outside lodge',
      'No smoking in any buildings',
      'No smoking on trails during fire season',
    ],
  },

  fires: {
    allowed: true,
    restrictions: [
      'Fires in designated fire rings only',
      'No ground fires',
      'Firewood must be purchased on-site or certified heat-treated',
      'Completely extinguish before leaving',
      'Fire restrictions during dry periods',
    ],
    firePits: true,
    seasonalBans: 'Fire bans may be imposed - check with park office',
  },

  specialRestrictions: [
    'No hunting in park boundaries',
    'Fishing license required (15+)',
    'Golf course etiquette required',
    'Restaurant dress code: casual (no swimwear)',
    'Maximum stay: 14 consecutive days',
  ],

  quietHours: {
    enforced: true,
    start: '22:00',
    end: '07:00',
  },
};
