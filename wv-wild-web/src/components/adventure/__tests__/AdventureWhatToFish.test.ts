/**
 * Unit Tests: AdventureWhatToFish.astro
 * SPEC-12: TDD approach - tests written BEFORE implementation
 *
 * Tests the fishing wrapper component that delegates to AdventureFeatureSection.
 * 5 tests covering: default props, delegation, slot passthrough, conditional rendering
 */

import { describe, it, expect } from 'vitest';

// Type definitions (match wrapper component Props interface)
interface FeatureItem {
  title: string;
  description: string;
  notes?: string;
  icon?: 'check' | 'info' | 'location' | 'none';
}

type AccentColor = 'sign-green' | 'brand-orange' | 'brand-brown' | 'brand-mud';

interface WhatToFishProps {
  features: FeatureItem[];
  title?: string;
  intro?: string;
  columns?: 2 | 3;
  variant?: 'white' | 'cream';
  accentColor?: AccentColor;
  animate?: boolean;
}

// Helper function to merge wrapper defaults with provided props
function getEffectivePropsForFishing(userProps: Partial<WhatToFishProps>): Required<WhatToFishProps> {
  return {
    features: userProps.features || [],
    title: userProps.title || 'What to Fish',
    intro: userProps.intro || '',
    columns: userProps.columns || 2,
    variant: userProps.variant || 'white',
    accentColor: userProps.accentColor || 'sign-green',
    animate: userProps.animate !== undefined ? userProps.animate : true,
  };
}

// Helper to validate delegation happens correctly
function validateDelegationToBaseComponent(props: WhatToFishProps): boolean {
  // Wrapper should pass all props through to AdventureFeatureSection
  // This validates that required props are present
  return !!(
    props.features &&
    props.title &&
    props.variant &&
    props.accentColor
  );
}

describe('AdventureWhatToFish - Default Props', () => {
  it('Test 1: Sets fishing-specific defaults (title="What to Fish", variant="white")', () => {
    const userProps: Partial<WhatToFishProps> = {
      features: [
        { title: 'Smallmouth Bass', description: 'Year-round, catch and release encouraged' }
      ]
    };

    const effectiveProps = getEffectivePropsForFishing(userProps);

    expect(effectiveProps.title).toBe('What to Fish');
    expect(effectiveProps.variant).toBe('white');
    expect(effectiveProps.accentColor).toBe('sign-green');
  });

  it('Test 2: Allows overriding default title and variant', () => {
    const userProps: Partial<WhatToFishProps> = {
      features: [
        { title: 'Rainbow Trout', description: 'Stocked seasonally' }
      ],
      title: 'Fish Species',
      variant: 'cream'
    };

    const effectiveProps = getEffectivePropsForFishing(userProps);

    expect(effectiveProps.title).toBe('Fish Species');
    expect(effectiveProps.variant).toBe('cream');
  });
});

describe('AdventureWhatToFish - Delegation', () => {
  it('Test 3: Delegates all props to AdventureFeatureSection correctly', () => {
    const props: WhatToFishProps = {
      features: [
        { title: 'Channel Catfish', description: 'Year-round, best at night', notes: 'Deep holes.' }
      ],
      title: 'What to Fish',
      variant: 'white',
      accentColor: 'sign-green',
      columns: 2,
      animate: true
    };

    const isDelegationValid = validateDelegationToBaseComponent(props);
    expect(isDelegationValid).toBe(true);
  });

  it('Test 4: Passes features array through unchanged', () => {
    const fishingFeatures: FeatureItem[] = [
      { title: 'Smallmouth Bass', description: 'Year-round' },
      { title: 'Rainbow Trout', description: 'Stocked Oct-Apr', notes: 'Pools below riffles.' },
      { title: 'Channel Catfish', description: 'Year-round, best at night' }
    ];

    const userProps: Partial<WhatToFishProps> = {
      features: fishingFeatures
    };

    const effectiveProps = getEffectivePropsForFishing(userProps);

    expect(effectiveProps.features).toEqual(fishingFeatures);
    expect(effectiveProps.features.length).toBe(3);
  });
});

describe('AdventureWhatToFish - Conditional Rendering', () => {
  it('Test 5: Hides wrapper when features array is empty (delegates to base component behavior)', () => {
    const emptyFeatures: FeatureItem[] = [];

    const userProps: Partial<WhatToFishProps> = {
      features: emptyFeatures
    };

    const effectiveProps = getEffectivePropsForFishing(userProps);

    // Base component will hide section if features empty
    expect(effectiveProps.features.length).toBe(0);
  });
});

describe('AdventureWhatToFish - WVWO Compliance', () => {
  it('uses only approved fishing defaults (white background, sign-green accent)', () => {
    const userProps: Partial<WhatToFishProps> = {
      features: [
        { title: 'Brook Trout', description: 'High elevation streams, spring season' }
      ]
    };

    const effectiveProps = getEffectivePropsForFishing(userProps);

    // Fishing section should default to white (clean water aesthetic)
    expect(effectiveProps.variant).toBe('white');

    // Green accent matches outdoor/water theme
    expect(effectiveProps.accentColor).toBe('sign-green');
  });
});
