/**
 * Centralized store data export with proper typing.
 *
 * TypeScript infers JSON imports loosely (e.g., fulfillmentType as string
 * instead of the union type). This module provides a single typed export
 * to avoid repeating the double-cast pattern across components.
 */
import type { StoreData } from '../types/product';
import storeDataRaw from '../data/store.json';

export const storeData = storeDataRaw as unknown as StoreData;

// Re-export for convenience
export const { categories, products } = storeData;
