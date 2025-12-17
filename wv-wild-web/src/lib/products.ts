/**
 * Product Helper Functions
 *
 * Utility functions for product tier detection, validation, and fulfillment logic.
 * Supports WVWO's three-tier product model:
 * - Tier 1: Shippable items (ship_or_pickup)
 * - Tier 2: Pickup-only items like ammo (pickup_only)
 * - Tier 3: FFL firearms requiring reserve+transfer (reserve_hold)
 */

import type { Product, FulfillmentType } from '../types/product';

/**
 * Determines the tier level for a product based on its fulfillment requirements.
 *
 * @param product - The product to evaluate
 * @returns 1 for shippable items, 2 for pickup-only, 3 for FFL firearms
 *
 * @example
 * const tier = getProductTier(product);
 * // tier === 1 (t-shirt, shippable)
 * // tier === 2 (ammo, pickup only)
 * // tier === 3 (rifle, FFL required)
 */
export function getProductTier(product: Product): 1 | 2 | 3 {
  if (product.fulfillmentType === 'reserve_hold') return 3; // Firearms
  if (product.fulfillmentType === 'pickup_only') return 2;  // Ammo
  return 1; // Shippable items
}

/**
 * Checks if a product is a firearm requiring FFL transfer.
 *
 * @param product - The product to check
 * @returns true if the product requires FFL transfer
 *
 * @example
 * if (isFirearm(product)) {
 *   // Show FFL transfer requirements
 * }
 */
export function isFirearm(product: Product): boolean {
  return product.fulfillmentType === 'reserve_hold';
}

/**
 * Checks if a product is ammunition.
 * Ammo is pickup-only and marked as hazardous material.
 *
 * @param product - The product to check
 * @returns true if the product is ammunition
 *
 * @example
 * if (isAmmo(product)) {
 *   // Show "Pickup Only" badge
 * }
 */
export function isAmmo(product: Product): boolean {
  return product.fulfillmentType === 'pickup_only' && product.hazmat === true;
}

/**
 * Checks if a product can be shipped to customers.
 *
 * @param product - The product to check
 * @returns true if the product supports shipping
 *
 * @example
 * if (isShippable(product)) {
 *   // Show "Add to Cart" button
 * } else {
 *   // Show "Call to Order" button
 * }
 */
export function isShippable(product: Product): boolean {
  return product.fulfillmentType === 'ship_or_pickup';
}

/**
 * Gets the maximum allowed quantity for a product in a single order.
 * Firearms default to 1, other items default to 10.
 *
 * @param product - The product to check
 * @returns Maximum quantity allowed per order
 *
 * @example
 * const max = getMaxQuantity(product);
 * <input type="number" min="1" max={max} />
 */
export function getMaxQuantity(product: Product): number {
  return product.maxQuantity ?? (isFirearm(product) ? 1 : 10);
}

/**
 * Checks if a product requires age verification at checkout.
 *
 * @param product - The product to check
 * @returns true if age verification is required
 *
 * @example
 * if (requiresAgeVerification(product)) {
 *   // Show age verification checkbox in cart
 * }
 */
export function requiresAgeVerification(product: Product): boolean {
  return product.ageRestriction !== undefined;
}

/**
 * Derives the fulfillment type based on product attributes.
 * Useful for migrating legacy product data or inferring fulfillment from category.
 *
 * Logic:
 * - FFL firearms → reserve_hold
 * - Non-shippable or ammo → pickup_only
 * - Everything else → ship_or_pickup
 *
 * @param product - The product to evaluate
 * @returns The derived fulfillment type
 *
 * @example
 * const type = deriveFulfillmentType(legacyProduct);
 * // Automatically sets correct fulfillment based on attributes
 */
export function deriveFulfillmentType(product: Product): FulfillmentType {
  if (product.fflRequired && product.categoryId === 'firearms') {
    return 'reserve_hold';
  }
  if (!product.shippable || product.categoryId === 'ammo') {
    return 'pickup_only';
  }
  return 'ship_or_pickup';
}
