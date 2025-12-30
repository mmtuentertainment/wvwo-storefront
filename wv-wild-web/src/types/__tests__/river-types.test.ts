import { describe, it, expect } from 'vitest';
import {
  OutfitterSchema,
  RapidClassSchema,
  SeasonalFlowSchema,
  RiverAdventureSchema,
  type RiverAdventure,
} from '../river-types';
import { ZodError } from 'zod';

describe('OutfitterSchema', () => {
  it('accepts valid outfitter with phone only', () => {
    const result = OutfitterSchema.parse({
      name: 'ACE Adventure Resort',
      services: ['Rafting', 'Kayaking'],
      contact: { phone: '304-555-1234' }
    });
    expect(result).toBeDefined();
    expect(result.name).toBe('ACE Adventure Resort');
  });

  it('accepts valid outfitter with email only', () => {
    const result = OutfitterSchema.parse({
      name: 'River Expeditions',
      services: ['Rafting'],
      contact: { email: 'info@riverexp.com' }
    });
    expect(result.contact.email).toBe('info@riverexp.com');
  });

  it('accepts valid outfitter with website only', () => {
    const result = OutfitterSchema.parse({
      name: 'Adventures on the Gorge',
      services: ['Rafting', 'Ziplining'],
      contact: { website: 'https://adventuresonthegorge.com' }
    });
    expect(result.contact.website).toBe('https://adventuresonthegorge.com');
  });

  it('accepts valid outfitter with all contact methods', () => {
    const result = OutfitterSchema.parse({
      name: 'Full Contact Outfitter',
      services: ['Rafting'],
      contact: {
        phone: '304-555-1234',
        email: 'info@fullcontact.com',
        website: 'https://fullcontact.com'
      }
    });
    expect(result.contact.phone).toBe('304-555-1234');
    expect(result.contact.email).toBe('info@fullcontact.com');
    expect(result.contact.website).toBe('https://fullcontact.com');
  });

  it('rejects outfitter with no contact methods', () => {
    expect(() => OutfitterSchema.parse({
      name: 'No Contact Outfitter',
      services: ['Rafting'],
      contact: {}
    })).toThrow(ZodError);
  });

  it('rejects outfitter with invalid phone format', () => {
    expect(() => OutfitterSchema.parse({
      name: 'Bad Phone',
      services: ['Rafting'],
      contact: { phone: '123' } // Too short
    })).toThrow();
  });

  it('rejects outfitter with invalid email format', () => {
    expect(() => OutfitterSchema.parse({
      name: 'Bad Email',
      services: ['Rafting'],
      contact: { email: 'not-an-email' }
    })).toThrow();
  });

  it('rejects outfitter with invalid URL format', () => {
    expect(() => OutfitterSchema.parse({
      name: 'Bad URL',
      services: ['Rafting'],
      contact: { website: 'not-a-url' }
    })).toThrow();
  });

  it('accepts valid service types', () => {
    const result = OutfitterSchema.parse({
      name: 'Multi Service',
      services: ['Rafting', 'Kayaking', 'Fishing Guides', 'Equipment Rental'],
      contact: { phone: '304-555-1234' }
    });
    expect(result.services).toHaveLength(4);
  });

  it('rejects invalid service types', () => {
    expect(() => OutfitterSchema.parse({
      name: 'Bad Service',
      services: ['InvalidService'],
      contact: { phone: '304-555-1234' }
    })).toThrow();
  });
});

describe('RapidClassSchema', () => {
  it('accepts Class I through VI', () => {
    ['I', 'II', 'III', 'IV', 'V', 'VI'].forEach(cls => {
      const result = RapidClassSchema.parse(cls);
      expect(result).toBe(cls);
    });
  });

  it('accepts Class II+ (with plus modifier)', () => {
    const result = RapidClassSchema.parse('II+');
    expect(result).toBe('II+');
  });

  it('accepts Class III-IV (range)', () => {
    const result = RapidClassSchema.parse('III-IV');
    expect(result).toBe('III-IV');
  });

  it('rejects Class VII (invalid)', () => {
    expect(() => RapidClassSchema.parse('VII')).toThrow();
  });

  it('rejects numeric class values', () => {
    expect(() => RapidClassSchema.parse('3')).toThrow();
  });

  it('rejects Class I++ (invalid modifier)', () => {
    expect(() => RapidClassSchema.parse('I++')).toThrow();
  });

  it('rejects lowercase classes', () => {
    expect(() => RapidClassSchema.parse('iii')).toThrow();
  });

  it('rejects Class with invalid range', () => {
    expect(() => RapidClassSchema.parse('I-VI')).toThrow();
  });
});

describe('SeasonalFlowSchema', () => {
  it('accepts valid Low flow level', () => {
    const result = SeasonalFlowSchema.parse('Low');
    expect(result).toBe('Low');
  });

  it('accepts valid Medium flow level', () => {
    const result = SeasonalFlowSchema.parse('Medium');
    expect(result).toBe('Medium');
  });

  it('accepts valid High flow level', () => {
    const result = SeasonalFlowSchema.parse('High');
    expect(result).toBe('High');
  });

  it('accepts valid Flood flow level', () => {
    const result = SeasonalFlowSchema.parse('Flood');
    expect(result).toBe('Flood');
  });

  it('rejects Very Low (not in enum)', () => {
    expect(() => SeasonalFlowSchema.parse('Very Low')).toThrow();
  });

  it('rejects numeric values', () => {
    expect(() => SeasonalFlowSchema.parse(1)).toThrow();
  });

  it('rejects case-insensitive variants', () => {
    expect(() => SeasonalFlowSchema.parse('low')).toThrow();
    expect(() => SeasonalFlowSchema.parse('HIGH')).toThrow();
  });
});

describe('RiverAdventureSchema', () => {
  const validRiver = {
    name: 'Gauley River',
    slug: 'gauley-river',
    location: { county: 'Fayette', region: 'New River Gorge' },
    type: 'River',
    difficulty: 'Intermediate',
    bestSeasons: ['Fall'],
    waterLevels: {
      spring: 'High',
      summer: 'Medium',
      fall: 'High',
      winter: 'Low'
    },
    description: 'Premier whitewater rafting destination',
    featured: true,
    rapids: [],
    outfitters: [],
    access: []
  };

  it('accepts complete valid river', () => {
    const result = RiverAdventureSchema.parse(validRiver);
    expect(result.name).toBe('Gauley River');
    expect(result.slug).toBe('gauley-river');
  });

  it('accepts river with optional kimsTip', () => {
    const withTip = {
      ...validRiver,
      kimsTip: 'Book early for fall season!'
    };
    const result = RiverAdventureSchema.parse(withTip);
    expect(result.kimsTip).toBe('Book early for fall season!');
  });

  it('accepts river with optional typeNotes', () => {
    const withNotes = {
      ...validRiver,
      typeNotes: 'Dam-controlled releases'
    };
    const result = RiverAdventureSchema.parse(withNotes);
    expect(result.typeNotes).toBe('Dam-controlled releases');
  });

  it('accepts river with optional cfsRange', () => {
    const withCfs = {
      ...validRiver,
      cfsRange: { min: 1800, max: 2800, optimal: 2200 }
    };
    const result = RiverAdventureSchema.parse(withCfs);
    expect(result.cfsRange?.optimal).toBe(2200);
  });

  it('accepts river with empty arrays', () => {
    const result = RiverAdventureSchema.parse(validRiver);
    expect(result.rapids).toEqual([]);
    expect(result.outfitters).toEqual([]);
    expect(result.access).toEqual([]);
  });

  it('accepts river with multiple rapids', () => {
    const withRapids = {
      ...validRiver,
      rapids: [
        { name: 'Pillow Rock', difficulty: 'V' as const },
        { name: 'Lost Paddle', difficulty: 'IV' as const }
      ]
    };
    const result = RiverAdventureSchema.parse(withRapids);
    expect(result.rapids).toHaveLength(2);
  });

  it('accepts river with multiple outfitters', () => {
    const withOutfitters = {
      ...validRiver,
      outfitters: [
        { name: 'ACE', services: ['Rafting'], contact: { phone: '304-555-1234' } },
        { name: 'River Expeditions', services: ['Rafting'], contact: { email: 'info@river.com' } }
      ]
    };
    const result = RiverAdventureSchema.parse(withOutfitters);
    expect(result.outfitters).toHaveLength(2);
  });

  it('accepts river with multiple access points', () => {
    const withAccess = {
      ...validRiver,
      access: [
        { type: 'Public', location: 'Summersville Dam', distance: 0 },
        { type: 'Private', location: 'Peters Creek', distance: 5.2 }
      ]
    };
    const result = RiverAdventureSchema.parse(withAccess);
    expect(result.access).toHaveLength(2);
  });

  it('rejects missing required field: name', () => {
    const { name, ...incomplete } = validRiver;
    expect(() => RiverAdventureSchema.parse(incomplete)).toThrow();
  });

  it('rejects missing required field: slug', () => {
    const { slug, ...incomplete } = validRiver;
    expect(() => RiverAdventureSchema.parse(incomplete)).toThrow();
  });

  it('rejects missing required field: location', () => {
    const { location, ...incomplete } = validRiver;
    expect(() => RiverAdventureSchema.parse(incomplete)).toThrow();
  });

  it('rejects invalid rapid difficulty', () => {
    const invalid = {
      ...validRiver,
      rapids: [{ name: 'Test', difficulty: 'Class X' }]
    };
    expect(() => RiverAdventureSchema.parse(invalid)).toThrow();
  });

  it('rejects negative distance in access', () => {
    const invalid = {
      ...validRiver,
      access: [{ type: 'Public', location: 'Test', distance: -5 }]
    };
    expect(() => RiverAdventureSchema.parse(invalid)).toThrow();
  });

  it('rejects negative fishingRating', () => {
    const invalid = {
      ...validRiver,
      fishing: { species: ['Bass'], rating: -1 }
    };
    expect(() => RiverAdventureSchema.parse(invalid)).toThrow();
  });

  it('rejects fishingRating greater than 5', () => {
    const invalid = {
      ...validRiver,
      fishing: { species: ['Bass'], rating: 6 }
    };
    expect(() => RiverAdventureSchema.parse(invalid)).toThrow();
  });
});

describe('Type Guards and Utilities', () => {
  const validRiver: RiverAdventure = {
    name: 'Test River',
    slug: 'test-river',
    location: { county: 'Test', region: 'Test Region' },
    type: 'River',
    difficulty: 'Beginner',
    bestSeasons: ['Summer'],
    waterLevels: { spring: 'Medium', summer: 'Low', fall: 'Medium', winter: 'Low' },
    description: 'Test description',
    featured: false,
    rapids: [],
    outfitters: [],
    access: []
  };

  it('isRiverAdventure returns true for valid river', () => {
    const result = RiverAdventureSchema.safeParse(validRiver);
    expect(result.success).toBe(true);
  });

  it('isRiverAdventure returns false for invalid object', () => {
    const result = RiverAdventureSchema.safeParse({ invalid: 'data' });
    expect(result.success).toBe(false);
  });

  it('hasRapids helper works correctly', () => {
    const hasRapids = (river: RiverAdventure) => river.rapids.length > 0;

    expect(hasRapids(validRiver)).toBe(false);
    expect(hasRapids({
      ...validRiver,
      rapids: [{ name: 'Test', difficulty: 'III' }]
    })).toBe(true);
  });

  it('hasOutfitters helper works correctly', () => {
    const hasOutfitters = (river: RiverAdventure) => river.outfitters.length > 0;

    expect(hasOutfitters(validRiver)).toBe(false);
    expect(hasOutfitters({
      ...validRiver,
      outfitters: [{ name: 'Test', services: ['Rafting'], contact: { phone: '304-555-1234' } }]
    })).toBe(true);
  });

  it('hasAccess helper works correctly', () => {
    const hasAccess = (river: RiverAdventure) => river.access.length > 0;

    expect(hasAccess(validRiver)).toBe(false);
    expect(hasAccess({
      ...validRiver,
      access: [{ type: 'Public', location: 'Test', distance: 0 }]
    })).toBe(true);
  });
});
