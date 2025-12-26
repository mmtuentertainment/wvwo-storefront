/**
 * SPEC-07: Adventures Hub Filter Configuration
 * Data-driven filter axes for multi-dimensional adventure discovery
 *
 * Extensibility: Adding axis 6+ requires ONLY updating this config,
 * NOT refactoring components (axis-agnostic architecture)
 */

import type { CollectionEntry } from 'astro:content';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type FilterType =
  | 'multi-select'      // Checkboxes (season, gear, suitability)
  | 'single-select'     // Radio group (difficulty)
  | 'range';            // Dual-thumb slider (elevation)

export interface FilterOption {
  value: string;
  label: string;
  icon?: string;         // lucide-react icon name (optional)
  description?: string;  // Tooltip/helper text (optional)
}

export interface FilterAxisConfig {
  id: string;                    // URL param key (e.g., "season")
  label: string;                 // Display label (e.g., "Season")
  type: FilterType;              // UI component type
  schemaField: string;           // Maps to adventure.data.[field]
  options: FilterOption[];       // Available choices
  defaultValue?: unknown;        // Default state
  ariaLabel?: string;            // Accessibility label
}

// ============================================================================
// FILTER STATE
// ============================================================================

export interface FilterState {
  season: string[];                // ['spring', 'fall']
  difficulty: string | null;       // 'moderate' or null
  gear: string[];                  // ['hunting', 'fishing']
  elevation: [number, number];     // [500, 2000] (min-max in feet)
  suitability: string[];           // ['dog-friendly', 'kid-friendly']
}

// ============================================================================
// FILTER ACTIONS
// ============================================================================

export type FilterAction =
  | { type: 'SET_MULTI_SELECT'; axis: string; values: string[] }
  | { type: 'SET_SINGLE_SELECT'; axis: string; value: string | null }
  | { type: 'SET_RANGE'; axis: string; value: [number, number] }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_FROM_URL'; state: Partial<FilterState> };

// ============================================================================
// ADVENTURE TYPE (Serializable subset for React islands)
// ============================================================================

// Full type from Astro Content Collections (for server-side use)
export type AdventureEntry = CollectionEntry<'adventures'>;

// Serializable type for passing to client components via client:only
// Stripped of non-serializable render functions and unused fields
export interface Adventure {
  id: string;
  data: {
    title: string;
    description: string;
    season: ('spring' | 'summer' | 'fall' | 'winter')[];
    difficulty: 'easy' | 'moderate' | 'challenging' | 'rugged';
    location: string;
    coordinates?: { lat: number; lng: number };  // Optional GPS coordinates
    gear?: string[];
    elevation_gain?: number;
    drive_time?: string;    // SPEC-08: Drive time from shop (e.g., "25 min")
    kim_hook?: string;      // SPEC-08: Kim's personal teaser for card display
    suitability?: ('dog-friendly' | 'kid-friendly' | 'wheelchair-accessible' | 'paved')[];
    images?: { src: string; alt: string; caption?: string }[];  // Added caption field
  };
}

// ============================================================================
// FILTER CONFIGURATION (5 AXES - SPEC-07)
// ============================================================================

export const FILTER_CONFIG: FilterAxisConfig[] = [
  // ==========================================================================
  // AXIS 1: SEASON (Multi-Select Checkboxes)
  // ==========================================================================
  {
    id: 'season',
    label: 'Season',
    type: 'multi-select',
    schemaField: 'season',
    ariaLabel: 'Filter by season',
    options: [
      { value: 'spring', label: 'Spring', icon: 'Leaf', description: 'Turkey season, spring fishing' },
      { value: 'summer', label: 'Summer', icon: 'Sun', description: 'Camping, lake activities' },
      { value: 'fall', label: 'Fall', icon: 'Trees', description: 'Peak hunting season' },
      { value: 'winter', label: 'Winter', icon: 'Snowflake', description: 'Late season, ice fishing' },
    ],
  },

  // ==========================================================================
  // AXIS 2: DIFFICULTY (Single-Select Radio Group)
  // ==========================================================================
  {
    id: 'difficulty',
    label: 'Difficulty',
    type: 'single-select',
    schemaField: 'difficulty',
    ariaLabel: 'Filter by difficulty level',
    options: [
      { value: 'easy', label: 'Easy', description: 'Level trails, minimal elevation' },
      { value: 'moderate', label: 'Moderate', description: 'Some hills, decent fitness needed' },
      { value: 'challenging', label: 'Challenging', description: 'Steep climbs, rugged terrain' },
      { value: 'rugged', label: 'Rugged', description: 'Off-trail, advanced only' },
    ],
  },

  // ==========================================================================
  // AXIS 3: GEAR (Multi-Select Checkboxes)
  // ==========================================================================
  {
    id: 'gear',
    label: 'Activities',
    type: 'multi-select',
    schemaField: 'gear',
    ariaLabel: 'Filter by activity type',
    options: [
      { value: 'turkey vest', label: 'Turkey Hunting' },
      { value: 'compound bow', label: 'Archery' },
      { value: 'fishing rod', label: 'Fishing' },
      { value: 'kayak', label: 'Kayaking' },
      { value: 'camping gear', label: 'Camping' },
      { value: 'binoculars', label: 'Wildlife Viewing' },
      { value: 'waders', label: 'Wading/Stream Fishing' },
      { value: 'backpack', label: 'Hiking/Backpacking' },
    ],
  },

  // ==========================================================================
  // AXIS 4: ELEVATION (Range Slider)
  // ==========================================================================
  {
    id: 'elevation',
    label: 'Elevation Gain',
    type: 'range',
    schemaField: 'elevation_gain',
    ariaLabel: 'Filter by elevation gain in feet',
    options: [
      { value: '0', label: '0 ft' },         // Min
      { value: '5000', label: '5,000 ft' },  // Max
    ],
    defaultValue: [0, 5000], // Full range by default
  },

  // ==========================================================================
  // AXIS 5: SUITABILITY (Multi-Select Checkboxes)
  // ==========================================================================
  {
    id: 'suitability',
    label: 'Suitability',
    type: 'multi-select',
    schemaField: 'suitability',
    ariaLabel: 'Filter by accessibility and suitability',
    options: [
      { value: 'dog-friendly', label: 'Dog-Friendly', icon: 'Dog' },
      { value: 'kid-friendly', label: 'Kid-Friendly', icon: 'Baby' },
      { value: 'wheelchair-accessible', label: 'Wheelchair Accessible', icon: 'Accessibility' },
      { value: 'paved', label: 'Paved Trail', icon: 'Route' },
    ],
  },
];

// ============================================================================
// INITIAL STATE
// ============================================================================

export const INITIAL_FILTER_STATE: FilterState = {
  season: [],
  difficulty: null,
  gear: [],
  elevation: [0, 5000], // Full range (no filter applied)
  suitability: [],
};
