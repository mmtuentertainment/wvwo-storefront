/**
 * Adventure Type Definitions
 * SPEC-09: Centralized types for AdventureHero and related components
 *
 * Single source of truth - all adventure-related types derived from
 * content collection Zod schemas where applicable.
 *
 * This file has been modularized into smaller files for SPEC-24 compliance:
 * - adventure-core.ts: Core types, schemas, and quick stats
 * - adventure-shared.ts: Shared components (gear, shop categories, WMA)
 * - river-template.ts: River-specific types and schemas
 * - lake-template.ts: Lake-specific types and schemas
 * - campground-template.ts: Campground-specific types and schemas
 *
 * All exports are re-exported from this file for backward compatibility.
 *
 * @module types/adventure
 */

// Re-export all types from modular files
export * from './adventure-core';
export * from './adventure-shared';
export * from './river-template';
export * from './lake-template';
export * from './campground-template';
