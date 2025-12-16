'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
}

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <a
          key={category.id}
          href={`/shop/${category.slug}`}
          className="block group animate-fade-in-up motion-reduce:animate-none"
          style={{
            animationDelay: `${index * 60}ms`,
            animationFillMode: 'backwards'
          }}
        >
          <Card
            className={cn(
              'h-full border-l-4 border-l-[#2E7D32] rounded-sm',
              'bg-[#FFF8E1] border-[#5D4037]/20',
              'transition-all duration-300 ease-out',
              'hover:border-l-[#FF6F00] hover:-translate-y-1 hover:shadow-md',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32]'
            )}
          >
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle
                className={cn(
                  'font-serif font-bold text-[#3E2723] text-base leading-tight',
                  'group-hover:text-[#FF6F00] transition-colors duration-200'
                )}
              >
                {category.name}
              </CardTitle>
              <p className="text-[#FF6F00] text-sm mt-1 italic">
                {category.tagline}
              </p>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <p className="text-[#5D4037] text-xs leading-relaxed line-clamp-2">
                {category.description}
              </p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default CategoryShowcase;
