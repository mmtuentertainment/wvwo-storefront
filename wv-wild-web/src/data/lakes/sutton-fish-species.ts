/**
 * Sutton Lake Fish Species Data
 * SPEC-24: Extracted for modular design (500-line limit)
 */

import type { FishSpecies } from '../../types/lake-enrichment';

export const suttonFishSpecies: FishSpecies[] = [
  {
    name: 'Walleye',
    bestSeason: 'Fall and Winter',
    regulations: 'SLOT LIMIT: All walleye 20-30 inches must be released immediately. Daily limit 2, only walleye under 20" OR one over 30" may be kept.',
    tips: 'Deep jigging on points and ledges 40-60 feet. Blade baits in winter. Best fishing at dawn and dusk.',
  },
  {
    name: 'Smallmouth Bass',
    bestSeason: 'Spring and Fall',
    regulations: 'Daily limit 6 (combined with largemouth and spotted bass). No minimum size.',
    tips: 'Tube jigs on rocky structure. Finesse presentations in clear water conditions.',
  },
  {
    name: 'Largemouth Bass',
    bestSeason: 'Spring and Summer',
    regulations: 'Daily limit 6 (combined with smallmouth and spotted bass). No minimum size.',
    consumptionAdvisory: 'Limit to 1 meal per month for bass over 12 inches due to mercury content',
    tips: 'Target laydowns and brush piles in upper lake coves. Texas-rigged worms effective.',
  },
  {
    name: 'Spotted Bass',
    bestSeason: 'Spring and Fall',
    regulations: 'Daily limit 6 (combined with other bass species). No minimum size.',
  },
  {
    name: 'Muskie',
    bestSeason: 'Fall (September-November)',
    regulations: 'Minimum 30 inches. Daily limit 1.',
    tips: 'Tailwaters below dam. Large bucktails and jerkbaits. Heavy tackle required.',
  },
  {
    name: 'Channel Catfish',
    bestSeason: 'Summer',
    regulations: 'Daily limit 30 (USACE lakes). No minimum size.',
  },
  {
    name: 'Blue Catfish',
    bestSeason: 'Summer',
    regulations: 'Daily limit 2. Minimum 25 inches.',
  },
  {
    name: 'Flathead Catfish',
    bestSeason: 'Summer',
    regulations: 'Daily limit 30. No minimum size.',
  },
  {
    name: 'Crappie',
    bestSeason: 'Spring',
    regulations: 'Daily limit 30 (combined black and white). No minimum size.',
    tips: 'Spawn in shallow coves around brush piles. Small jigs and live minnows.',
  },
  {
    name: 'Trout (Tailwaters)',
    bestSeason: 'Spring (stocked Feb-April) and Fall (October)',
    regulations: 'Daily limit 6 combined species. No minimum size.',
    notes: 'Rainbow, golden rainbow, brook, brown, and tiger trout stocked in Elk River tailwaters below dam',
  },
];
