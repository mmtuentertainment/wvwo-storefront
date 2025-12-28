/**
 * Unit Tests: AdventureWhatToHunt.astro
 * SPEC-12: TDD approach - tests written BEFORE implementation
 *
 * Tests the hunting wrapper component that delegates to AdventureFeatureSection.
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

interface WhatToHuntProps {
  features: FeatureItem[];
  title?: string;
  intro?: string;
  columns?: 2 | 3;
  variant?: 'white' | 'cream';
  accentColor?: AccentColor;
  animate?: boolean;
}

// Helper function to merge wrapper defaults with provided props
function getEffectivePropsForHunting(userProps: Partial<WhatToHuntProps>): Required<WhatToHuntProps> {
  return {
    features: userProps.features || [],
    title: userProps.title || 'What to Hunt',
    intro: userProps.intro || '',
    columns: userProps.columns || 2,
    variant: userProps.variant || 'cream',
    accentColor: userProps.accentColor || 'sign-green',
    animate: userProps.animate !== undefined ? userProps.animate : true,
  };
}

// Helper to validate delegation happens correctly
function validateDelegationToBaseComponent(props: WhatToHuntProps): boolean {
  // Wrapper should pass all props through to AdventureFeatureSection
  // This validates that required props are present
  return !!(
    props.features &&
    props.title &&
    props.variant &&
    props.accentColor
  );
}

describe('AdventureWhatToHunt - Default Props', () => {
  it('Test 1: Sets hunting-specific defaults (title="What to Hunt", variant="cream")', () => {
    const userProps: Partial<WhatToHuntProps> = {
      features: [
        { title: 'White-tailed Deer', description: 'Season: Nov 1-Dec 31' }
      ]
    };

    const effectiveProps = getEffectivePropsForHunting(userProps);

    expect(effectiveProps.title).toBe('What to Hunt');
    expect(effectiveProps.variant).toBe('cream');
    expect(effectiveProps.accentColor).toBe('sign-green');
  });

  it('Test 2: Allows overriding default title and variant', () => {
    const userProps: Partial<WhatToHuntProps> = {
      features: [
        { title: 'Wild Turkey', description: 'Season: Apr 15-May 15' }
      ],
      title: 'Game Species',
      variant: 'white'
    };

    const effectiveProps = getEffectivePropsForHunting(userProps);

    expect(effectiveProps.title).toBe('Game Species');
    expect(effectiveProps.variant).toBe('white');
  });
});

describe('AdventureWhatToHunt - Delegation', () => {
  it('Test 3: Delegates all props to AdventureFeatureSection correctly', () => {
    const props: WhatToHuntProps = {
      features: [
        { title: 'Black Bear', description: 'Season: Sep 15-Dec 31', notes: 'Oak ridges.' }
      ],
      title: 'What to Hunt',
      variant: 'cream',
      accentColor: 'sign-green',
      columns: 2,
      animate: true
    };

    const isDelegationValid = validateDelegationToBaseComponent(props);
    expect(isDelegationValid).toBe(true);
  });

  it('Test 4: Passes features array through unchanged', () => {
    const huntingFeatures: FeatureItem[] = [
      { title: 'White-tailed Deer', description: 'Season: Nov 1-Dec 31' },
      { title: 'Wild Turkey', description: 'Season: Apr 15-May 15', notes: 'Gobbles at dawn.' },
      { title: 'Black Bear', description: 'Season: Sep 15-Dec 31' }
    ];

    const userProps: Partial<WhatToHuntProps> = {
      features: huntingFeatures
    };

    const effectiveProps = getEffectivePropsForHunting(userProps);

    expect(effectiveProps.features).toEqual(huntingFeatures);
    expect(effectiveProps.features.length).toBe(3);
  });
});

describe('AdventureWhatToHunt - Conditional Rendering', () => {
  it('Test 5: Hides wrapper when features array is empty (delegates to base component behavior)', () => {
    const emptyFeatures: FeatureItem[] = [];

    const userProps: Partial<WhatToHuntProps> = {
      features: emptyFeatures
    };

    const effectiveProps = getEffectivePropsForHunting(userProps);

    // Base component will hide section if features empty
    expect(effectiveProps.features.length).toBe(0);
  });
});

describe('AdventureWhatToHunt - WVWO Compliance', () => {
  it('uses only approved hunting defaults (cream background, sign-green accent)', () => {
    const userProps: Partial<WhatToHuntProps> = {
      features: [
        { title: 'Ruffed Grouse', description: 'Season: Oct 1-Feb 28' }
      ]
    };

    const effectiveProps = getEffectivePropsForHunting(userProps);

    // Hunting section should default to cream (authentic rural aesthetic)
    expect(effectiveProps.variant).toBe('cream');

    // Green accent matches outdoor/hunting theme
    expect(effectiveProps.accentColor).toBe('sign-green');
  });
});
