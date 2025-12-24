/**
 * SPEC-07: Mobile Filters Sheet (Bottom Drawer)
 * PR #4: Mobile Experience
 *
 * Features:
 * - Bottom sheet drawer (shadcn Sheet component)
 * - Reuses all 5 filter components from PR #2
 * - Accordion groups for collapsible sections
 * - Active filter count badge (orange if count > 0)
 * - Sticky "Apply Filters" button at bottom
 * - Swipe-to-dismiss + visible X button
 * - WCAG 2.1 AA compliant (44×44px touch targets)
 * - WVWO aesthetic (bg-brand-cream, rounded-sm, brand colors)
 */

import React from 'react';
import { useFilters } from '@/lib/adventures/FilterContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

// Import all 5 filter components from PR #2
import { SeasonFilter } from './filters/SeasonFilter';
import { DifficultyFilter } from './filters/DifficultyFilter';
import { GearFilter } from './filters/GearFilter';
import { ElevationSlider } from './filters/ElevationSlider';
import { SuitabilityFilter } from './filters/SuitabilityFilter';

/**
 * Render a mobile bottom-sheet interface for adjusting adventure filters.
 *
 * Presents a fixed mobile trigger button (shows an active-filter count when present) that opens a bottom sheet containing collapsible filter groups (Season, Difficulty, Activities, Elevation Gain, Suitability). Includes an Apply action that closes the sheet and a Reset All action that clears all filters via the filters context when active filters exist.
 *
 * @returns The rendered React element for the mobile filters sheet.
 */
export function MobileFiltersSheet() {
  const { activeFilterCount, dispatch } = useFilters();
  const [open, setOpen] = React.useState(false);

  const handleApplyFilters = () => {
    setOpen(false); // Close drawer when Apply is clicked
  };

  const handleResetAll = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* ====================================================================
          FIXED BOTTOM TRIGGER BUTTON (visible on mobile only)
          ==================================================================== */}
      <SheetTrigger asChild>
        <Button
          variant="cta"
          size="lg"
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden min-h-[44px] shadow-lg"
          aria-label={`Filter adventures${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ''}`}
        >
          <Filter className="w-5 h-5" />
          <span className="font-display font-bold">Filter Adventures</span>
          {activeFilterCount > 0 && (
            <Badge variant="blaze" className="ml-2 min-h-[24px] px-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      {/* ====================================================================
          BOTTOM DRAWER (SheetContent side="bottom")
          ==================================================================== */}
      <SheetContent
        side="bottom"
        className="h-[90vh] overflow-y-auto bg-brand-cream border-t-2 border-brand-mud rounded-t-sm p-0"
      >
        {/* HEADER: Title + Close Button */}
        <SheetHeader className="sticky top-0 bg-brand-cream border-b-2 border-brand-mud/30 p-6 z-10">
          <SheetTitle className="font-display font-bold text-2xl text-brand-brown">
            Filter Adventures
          </SheetTitle>
          {activeFilterCount > 0 && (
            <p className="text-sm text-brand-mud/60 font-body mt-1">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
            </p>
          )}
        </SheetHeader>

        {/* ====================================================================
            ACCORDION FILTER GROUPS (Collapsible Sections)
            ==================================================================== */}
        <div className="p-6 pb-24 space-y-4">
          <Accordion type="multiple" defaultValue={['season', 'difficulty']} className="space-y-4">
            {/* GROUP 1: SEASON */}
            <AccordionItem value="season" className="border-brand-mud/30 rounded-sm">
              <AccordionTrigger className="px-4 py-3 font-display font-bold text-brand-brown hover:text-sign-green min-h-[44px]">
                Season
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <SeasonFilter />
              </AccordionContent>
            </AccordionItem>

            {/* GROUP 2: DIFFICULTY */}
            <AccordionItem value="difficulty" className="border-brand-mud/30 rounded-sm">
              <AccordionTrigger className="px-4 py-3 font-display font-bold text-brand-brown hover:text-sign-green min-h-[44px]">
                Difficulty
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <DifficultyFilter />
              </AccordionContent>
            </AccordionItem>

            {/* GROUP 3: ACTIVITIES (Gear) */}
            <AccordionItem value="gear" className="border-brand-mud/30 rounded-sm">
              <AccordionTrigger className="px-4 py-3 font-display font-bold text-brand-brown hover:text-sign-green min-h-[44px]">
                Activities
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <GearFilter />
              </AccordionContent>
            </AccordionItem>

            {/* GROUP 4: ELEVATION */}
            <AccordionItem value="elevation" className="border-brand-mud/30 rounded-sm">
              <AccordionTrigger className="px-4 py-3 font-display font-bold text-brand-brown hover:text-sign-green min-h-[44px]">
                Elevation Gain
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ElevationSlider />
              </AccordionContent>
            </AccordionItem>

            {/* GROUP 5: SUITABILITY */}
            <AccordionItem value="suitability" className="border-brand-mud/30 rounded-sm">
              <AccordionTrigger className="px-4 py-3 font-display font-bold text-brand-brown hover:text-sign-green min-h-[44px]">
                Suitability
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <SuitabilityFilter />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* ====================================================================
            STICKY BOTTOM BUTTONS (Apply + Reset)
            ==================================================================== */}
        <div className="fixed bottom-0 left-0 right-0 bg-brand-cream border-t-2 border-brand-mud/30 p-4 space-y-3 z-10">
          {/* Apply Filters Button */}
          <Button
            variant="cta"
            size="lg"
            onClick={handleApplyFilters}
            className="w-full min-h-[44px] font-display font-bold"
          >
            Apply Filters
          </Button>

          {/* Reset All Button (only show if filters active) */}
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleResetAll}
              className="w-full min-h-[44px] font-display font-medium border-2 border-brand-mud/40 text-brand-brown hover:bg-brand-orange/10 hover:border-brand-orange"
            >
              <X className="w-4 h-4" />
              Reset All Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}