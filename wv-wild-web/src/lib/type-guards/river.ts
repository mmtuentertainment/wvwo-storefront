/**
 * River Type Guards
 * SPEC-14: T-012 - Type narrowing utilities for River adventures
 *
 * Type guards provide runtime type checking and enable TypeScript type narrowing.
 * Use these to safely check properties before accessing them.
 *
 * @module lib/type-guards/river
 */

import type { Rapid, RiverFishing, Outfitter, RiverTemplateProps } from '@/types/adventure';

/**
 * Checks if an adventure is a River adventure.
 * Enables conditional rendering of River-specific components.
 *
 * @param adventure - CollectionEntry from Astro Content Collections or any object
 * @returns true if adventure.data.type === 'river'
 *
 * @example
 * ```typescript
 * const adventures = await getCollection('adventures');
 * const rivers = adventures.filter(isRiverAdventure);
 * ```
 */
export function isRiverAdventure(adventure: unknown): boolean {
  return (
    typeof adventure === 'object' &&
    adventure !== null &&
    'data' in adventure &&
    typeof (adventure as { data: unknown }).data === 'object' &&
    (adventure as { data: unknown }).data !== null &&
    'type' in (adventure as { data: object }).data &&
    (adventure as { data: { type: unknown } }).data.type === 'river'
  );
}

/**
 * Type guard to check if props has rapids array with items.
 * Narrows type to include rapids: Rapid[] property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty rapids array
 *
 * @example
 * ```typescript
 * if (hasRapids(props)) {
 *   // TypeScript knows props.rapids exists and is Rapid[]
 *   const firstRapid = props.rapids[0];
 * }
 * ```
 */
export function hasRapids(props: any): props is { rapids: Rapid[] } {
  return Array.isArray(props?.rapids) && props.rapids.length > 0;
}

/**
 * Type guard to check if props has outfitters array with items.
 * Narrows type to include outfitters: Outfitter[] property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty outfitters array
 *
 * @example
 * ```typescript
 * if (hasOutfitters(props)) {
 *   // TypeScript knows props.outfitters exists and is Outfitter[]
 *   const firstOutfitter = props.outfitters[0];
 * }
 * ```
 */
export function hasOutfitters(props: any): props is { outfitters: Outfitter[] } {
  return Array.isArray(props?.outfitters) && props.outfitters.length > 0;
}

/**
 * Type guard to check if props has fishing information.
 * Narrows type to include fishing: RiverFishing property.
 *
 * @param props - River template props or partial props
 * @returns true if props has fishing object
 *
 * @example
 * ```typescript
 * if (hasFishing(props)) {
 *   // TypeScript knows props.fishing exists and is RiverFishing
 *   const species = props.fishing.species;
 * }
 * ```
 */
export function hasFishing(props: any): props is { fishing: RiverFishing } {
  return (
    props?.fishing !== null &&
    props?.fishing !== undefined &&
    typeof props.fishing === 'object' &&
    !Array.isArray(props.fishing)
  );
}

/**
 * Type guard to check if props has access points.
 * Narrows type to include accessPoints array property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty accessPoints array
 */
export function hasAccessPoints(props: any): boolean {
  return Array.isArray(props?.accessPoints) && props.accessPoints.length > 0;
}

/**
 * Type guard to check if props has safety information.
 * Narrows type to include safety array property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty safety array
 */
export function hasSafety(props: any): boolean {
  return Array.isArray(props?.safety) && props.safety.length > 0;
}

/**
 * Type guard to check if props has seasonal flow information.
 * Narrows type to include seasonalFlow array property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty seasonalFlow array
 */
export function hasSeasonalFlow(props: any): boolean {
  return Array.isArray(props?.seasonalFlow) && props.seasonalFlow.length > 0;
}

/**
 * Type guard to check if props has nearby attractions.
 * Narrows type to include nearbyAttractions array property.
 *
 * @param props - River template props or partial props
 * @returns true if props has non-empty nearbyAttractions array
 */
export function hasNearbyAttractions(props: any): boolean {
  return Array.isArray(props?.nearbyAttractions) && props.nearbyAttractions.length > 0;
}

/**
 * Comprehensive type guard to check if object is complete RiverTemplateProps.
 * Validates presence of all required properties.
 *
 * @param props - Object to check
 * @returns true if object has all required RiverTemplateProps properties
 *
 * @example
 * ```typescript
 * if (isCompleteRiverTemplate(data)) {
 *   // TypeScript knows data is RiverTemplateProps
 *   renderRiverTemplate(data);
 * }
 * ```
 */
export function isCompleteRiverTemplate(props: any): props is RiverTemplateProps {
  if (typeof props !== 'object' || props === null) {
    return false;
  }

  return (
    // Hero section
    typeof props.name === 'string' &&
    typeof props.image === 'string' &&
    typeof props.imageAlt === 'string' &&
    typeof props.tagline === 'string' &&
    typeof props.description === 'string' &&
    Array.isArray(props.stats) &&
    // River metadata
    typeof props.length === 'number' &&
    typeof props.county === 'string' &&
    typeof props.difficultyRange === 'string' &&
    Array.isArray(props.quickHighlights) &&
    // Content sections
    Array.isArray(props.rapids) &&
    props.fishing !== undefined && typeof props.fishing === 'object' &&
    Array.isArray(props.outfitters) &&
    Array.isArray(props.seasonalFlow) &&
    Array.isArray(props.accessPoints) &&
    Array.isArray(props.safety) &&
    Array.isArray(props.nearbyAttractions) &&
    Array.isArray(props.gearList) &&
    Array.isArray(props.relatedShop)
  );
}
