/**
 * WVWO Offline Banner Component
 *
 * Top banner that appears when user goes offline.
 * Shows Kim's reassuring message that filters still work.
 * Auto-hides when connection returns.
 *
 * SPEC-07 PR #5: Offline Support
 * Clarification Q5: Top banner with Kim's voice, auto-hide on reconnect
 *
 * WVWO Aesthetic:
 * - bg-brand-brown text-brand-cream (warm, reassuring)
 * - rounded-sm (not rounded-md/lg)
 * - Kim's voice: "You're offline, but don't worry..."
 * - Grand love ya!
 *
 * Accessibility:
 * - role="status" for screen reader announcement
 * - aria-live="polite" for non-intrusive updates
 */

import { useEffect, useState } from 'react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check initial online status
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOffline(false);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if online
  if (!isOffline) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 bg-brand-brown text-brand-cream py-3 px-4 shadow-md border-b-2 border-brand-orange"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        {/* Signal icon (offline indicator) */}
        <svg
          className="w-5 h-5 text-brand-orange flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
          />
        </svg>

        {/* Kim's message */}
        <p className="text-sm md:text-base font-body">
          <span className="font-medium">You're offline, but don't worry</span>
          {' '}&mdash;{' '}
          filters still work.{' '}
          <span className="font-hand text-brand-orange">Grand love ya!</span>
        </p>
      </div>
    </div>
  );
}
