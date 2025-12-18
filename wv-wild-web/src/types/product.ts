/**
 * Product Type Definitions for WVWO E-Commerce
 * Phase 3C: E-Commerce Foundation
 */

/**
 * Fulfillment options for products
 * - ship_or_pickup: Standard retail items (apparel, accessories) - can ship or pickup
 * - pickup_only: Items that cannot be shipped (ammunition) - in-store pickup required
 * - reserve_hold: Firearms requiring FFL transfer - customer reserves, completes 4473/NICS in-store
 */
export type FulfillmentType = 'ship_or_pickup' | 'pickup_only' | 'reserve_hold';

/**
 * Stock availability levels
 * - in_stock: Available for immediate purchase
 * - low_stock: Limited quantity remaining
 * - out_of_stock: Currently unavailable, may allow backorder
 * - call_for_availability: Customer should call to check (special order items)
 */
export type StockLevel = 'in_stock' | 'low_stock' | 'out_of_stock' | 'call_for_availability';

/**
 * Age restrictions for regulated products
 * 18: Firearms, ammunition
 * 21: Handguns, certain ammunition types
 */
export type AgeRestriction = 18 | 21;

/**
 * Product dimensions for shipping calculations
 * All measurements in inches
 */
export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

/**
 * Complete product model with e-commerce fields
 */
export interface Product {
  // Core identification
  id: string;
  sku: string;
  slug: string;
  categoryId: string;
  brand: string;
  name: string;
  shortName: string;
  description: string;

  // Pricing
  price: number;
  priceDisplay: string;
  priceUnit: string;
  compareAtPrice?: number;
  saleActive?: boolean;

  // Media
  images: string[];

  // Fulfillment & shipping
  shippable: boolean;
  fflRequired: boolean;
  fulfillmentType: FulfillmentType;
  weight?: number;
  dimensions?: ProductDimensions;
  hazmat?: boolean;

  // Stock & availability
  inStock: boolean;
  stockLevel?: StockLevel;
  stockQuantity?: number;
  backorderAllowed?: boolean;

  // Quantity controls
  maxQuantity?: number;
  minQuantity?: number;
  quantityStep?: number;

  // Restrictions & compliance
  ageRestriction?: AgeRestriction;
  stateRestrictions?: string[];

  // Reserve & hold (for high-value items)
  reserveExpiresAt?: string;

  // Product metadata
  specs: Record<string, string | number>;
  tags: string[];
}

/**
 * Product category
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
}

/**
 * Store data model (loaded from JSON)
 */
export interface StoreData {
  categories: Category[];
  products: Product[];
  settings?: {
    defaultMaxQuantity: number;
    firearmMaxQuantity: number;
    pickupOnlyCategories: string[];
    reserveHoldCategories: string[];
  };
}
