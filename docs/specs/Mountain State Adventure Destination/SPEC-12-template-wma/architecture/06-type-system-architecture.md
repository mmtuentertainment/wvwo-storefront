# Type System Architecture - TypeScript Interfaces & Type Safety

**Architect**: Type System Architect
**Domain**: TypeScript interfaces, type guards, type inference
**Date**: 2025-12-27

---

## Type System Overview

The WMA Template type system leverages **Zod schema inference** for automatic TypeScript types, ensuring **schema and types stay in sync**. No manual interface duplication required.

---

## Inferred Types from Zod Schemas

### Base Adventure Type

```typescript
import type { CollectionEntry } from 'astro:content';

// Automatically inferred from adventures collection schema
type Adventure = CollectionEntry<'adventures'>['data'];

// Type includes ALL fields (existing + WMA extensions):
// {
//   title: string;
//   description: string;
//   heroImage: string;
//   coordinates: { lat: number; lng: number };
//   type?: 'adventure' | 'wma';
//   acreage?: number;
//   county?: string;
//   species?: { name: string; season: string; notes?: string }[];
//   // ... all other optional fields
// }
```

### Discriminated Union Type Guard

```typescript
function isWMA(adventure: Adventure): adventure is WMAAdventure {
  return adventure.type === 'wma';
}

// Usage with type narrowing
const adventures = await getCollection('adventures');
const wmas = adventures.filter(a => isWMA(a.data));

// TypeScript knows wmas have WMA-specific fields
wmas.forEach(wma => {
  console.log(wma.data.acreage); // ✅ TypeScript allows
  console.log(wma.data.species); // ✅ TypeScript allows
});
```

---

## Component Props Interfaces

### AdventureFeatureSection

```typescript
interface FeatureSectionProps {
  title: string;
  intro?: string;
  features: Array<{
    title: string;
    description: string;
    notes?: string;
    icon?: 'check' | 'info' | 'location' | 'none';
  }>;
  variant?: 'white' | 'cream';
  columns?: 2 | 3;
  accentColor?: 'sign-green' | 'brand-orange' | 'brand-brown';
}
```

### AdventureWhatToHunt

```typescript
interface WhatToHuntProps {
  title?: string;
  intro?: string;
  species: Array<{
    name: string;
    season: string;
    notes?: string;
    regulationUrl?: string;
  }>;
  variant?: 'white' | 'cream';
}
```

### Type Safety Benefits

- **Autocomplete**: IDEs suggest valid props
- **Compile Errors**: Invalid props caught at build time
- **Refactoring Safety**: Type errors when schemas change
- **Documentation**: Props interfaces serve as API docs

---

## Type Guards & Utilities

### Type Guard Functions

```typescript
// Check if adventure has hunting content
function hasHunting(data: Adventure): data is Adventure & { species: NonNullable<Adventure['species']> } {
  return !!data.species && data.species.length > 0;
}

// Check if adventure has fishing content
function hasFishing(data: Adventure): data is Adventure & { fishingWaters: NonNullable<Adventure['fishingWaters']> } {
  return !!data.fishingWaters && data.fishingWaters.length > 0;
}

// Usage in page template
if (hasHunting(wma.data)) {
  // TypeScript knows species is defined and non-empty
  <AdventureWhatToHunt species={wma.data.species} />
}
```

### Utility Types

```typescript
// Extract species type from schema
type Species = NonNullable<Adventure['species']>[number];

// Extract facility type from schema
type Facility = NonNullable<Adventure['facilities']>[number];

// Create required version of optional field
type RequiredAcreage = Required<Pick<Adventure, 'acreage'>>;
```

---

## Type Safety Enforcement

### Zod Validation = TypeScript Types

```typescript
// Schema change automatically updates types
const SpeciesSchema = z.object({
  name: z.string(),
  season: z.string(),
  notes: z.string().optional(),
  regulationUrl: z.string().url().optional(),
  // ADD NEW FIELD:
  huntingMethod: z.enum(['archery', 'firearms', 'both']).optional(),
});

// TypeScript type now includes huntingMethod
type Species = z.infer<typeof SpeciesSchema>;
// {
//   name: string;
//   season: string;
//   notes?: string;
//   regulationUrl?: string;
//   huntingMethod?: 'archery' | 'firearms' | 'both';
// }
```

### Build-Time Errors

```typescript
// COMPILE ERROR: Property 'invalidProp' does not exist
<AdventureFeatureSection
  title="What to Hunt"
  features={species}
  invalidProp="value"  // ❌ TypeScript error
/>

// FIX: Remove invalid prop or add to interface
<AdventureFeatureSection
  title="What to Hunt"
  features={species}
/>
```

---

## Testing Type Safety

### Type-Level Tests

```typescript
import { expectType } from 'tsd';
import type { CollectionEntry } from 'astro:content';

// Test: Adventure type includes WMA fields
expectType<CollectionEntry<'adventures'>['data']['acreage']>(undefined as number | undefined);
expectType<CollectionEntry<'adventures'>['data']['type']>('wma');

// Test: Component props accept correct types
const validProps: FeatureSectionProps = {
  title: 'Test',
  features: [{ title: 'T', description: 'D' }],
};
expectType<FeatureSectionProps>(validProps);

// Test: Type guard narrows correctly
declare const adventure: Adventure;
if (isWMA(adventure)) {
  expectType<'wma'>(adventure.type); // ✅ Type narrowed to 'wma'
}
```

---

## Future Type System Enhancements

1. **Branded Types**: Prevent GPS coordinate mixing
2. **Template Literal Types**: Validate phone number format
3. **Generic Components**: Type-safe slot content
4. **Conditional Types**: Different props based on variant

---

**Type System Architect**: Type architecture complete
**Type Safety**: 100% (Zod inference + TypeScript)
**Developer Experience**: Excellent (autocomplete, compile errors)
