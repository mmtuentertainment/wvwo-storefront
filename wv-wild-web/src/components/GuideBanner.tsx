interface GuideBannerProps {
  season?: string[];
  activity?: string[];
}

export function GuideBanner({ season = [], activity = [] }: GuideBannerProps) {
  // Buck Season: fall + hunting
  if (season.includes('fall') && activity.includes('hunting')) {
    return (
      <div className="bg-brand-brown/10 border-l-4 border-l-brand-orange p-4 mb-6 rounded-sm">
        <p className="text-brand-brown font-body">
          Preparing for buck season?{' '}
          <a
            href="/guides/buck-season"
            className="text-sign-green underline font-bold hover:text-sign-green/80"
          >
            Read our Buck Season Prep Guide
          </a>
        </p>
      </div>
    );
  }

  // Turkey Season: spring + hunting
  if (season.includes('spring') && activity.includes('hunting')) {
    return (
      <div className="bg-brand-brown/10 border-l-4 border-l-brand-orange p-4 mb-6 rounded-sm">
        <p className="text-brand-brown font-body">
          Getting ready for turkey season?{' '}
          <a
            href="/guides/turkey-season"
            className="text-sign-green underline font-bold hover:text-sign-green/80"
          >
            Check our Turkey Season Guide
          </a>
        </p>
      </div>
    );
  }

  // All other combinations: no banner
  return null;
}
