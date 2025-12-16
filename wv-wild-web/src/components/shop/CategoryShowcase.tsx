import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Category data structure from store.json
 */
interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
}

interface CategoryShowcaseProps {
  /** Categories to display in grid order (left-to-right, top-to-bottom) */
  categories: Category[];
}

/**
 * Error boundary to catch rendering failures and show fallback UI
 */
class CategoryShowcaseErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[CategoryShowcase] Render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-8 text-brand-mud">
          <p className="font-display">Unable to load categories.</p>
          <a href="/shop" className="text-brand-orange hover:underline text-sm mt-2 inline-block">
            Refresh page
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Category grid with staggered fade-in animation
 * Uses 60ms delay per item for smooth sequential reveal
 */
function CategoryShowcaseInner({ categories }: CategoryShowcaseProps) {
  // Guard against undefined/null/non-array
  if (!categories || !Array.isArray(categories)) {
    console.error('[CategoryShowcase] Invalid categories prop:', categories);
    return (
      <div className="text-center py-8 text-brand-mud">
        <p className="font-display">Categories unavailable.</p>
      </div>
    );
  }

  // Guard against empty array
  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-brand-mud">
        <p className="font-display italic">No categories yet - check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => {
        // Validate required fields per category
        if (!category?.id || !category?.slug || !category?.name) {
          console.error('[CategoryShowcase] Malformed category:', category);
          return null;
        }

        return (
          <a
            key={category.id}
            href={`/shop/${category.slug}`}
            aria-label={`Browse ${category.name} - ${category.tagline || ''}`}
            className="block group animate-fade-in-up motion-reduce:animate-none focus:outline-none"
            style={{
              animationDelay: `${index * 60}ms`,
              animationFillMode: 'backwards'
            }}
          >
            <Card
              className={cn(
                'h-full border-l-4 border-l-sign-green rounded-sm',
                'bg-brand-cream border-brand-mud/20',
                'transition-all duration-300 ease-out',
                'hover:border-l-brand-orange hover:-translate-y-1 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sign-green'
              )}
            >
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle
                  className={cn(
                    'font-display font-bold text-brand-brown text-base leading-tight',
                    'group-hover:text-brand-orange transition-colors duration-200'
                  )}
                >
                  {category.name}
                </CardTitle>
                <p className="text-brand-orange text-sm mt-1 italic">
                  {category.tagline || ''}
                </p>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0">
                <p className="text-brand-mud text-xs leading-relaxed line-clamp-2">
                  {category.description || ''}
                </p>
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}

/**
 * CategoryShowcase - Interactive category grid for /shop page
 *
 * Features:
 * - 4x3 responsive grid (2 cols mobile, 3 tablet, 4 desktop)
 * - Staggered fade-in animation on page load
 * - WVWO brand colors (sign-green border, brand-cream background)
 * - Error boundary for graceful failure handling
 * - Respects prefers-reduced-motion
 */
export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <CategoryShowcaseErrorBoundary>
      <CategoryShowcaseInner categories={categories} />
    </CategoryShowcaseErrorBoundary>
  );
}

export default CategoryShowcase;
