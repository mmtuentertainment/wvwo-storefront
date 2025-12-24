# SPEC-07 PR #5: Offline Support - Verification Checklist

**Created:** 2025-12-24
**Status:** Ready for Testing
**Total LOC:** ~370

---

## Files Created

### 1. Service Worker (`src/service-worker.js`) - 200 LOC
- [x] Cache version: `wvwo-adventures-v1`
- [x] Install event: Cache adventures hub HTML
- [x] Activate event: Clean old caches
- [x] Fetch event: Cache-first for adventure data
- [x] Message event: Manual cache refresh support
- [x] JSDoc comments for all functions

### 2. IndexedDB Utilities (`src/lib/adventures/offline.ts`) - 120 LOC
- [x] `openDB()` - Create wvwo-adventures database
- [x] `cacheAdventures()` - Store adventure data
- [x] `getCachedAdventures()` - Retrieve from IndexedDB
- [x] `clearExpiredCache()` - Remove >24hr old data
- [x] `isOfflineModeAvailable()` - Check cache status
- [x] TypeScript interfaces for Adventure and CacheMetadata

### 3. Offline Banner (`src/components/adventures/OfflineBanner.tsx`) - 50 LOC
- [x] Online/offline event listeners
- [x] Kim's voice: "You're offline, but don't worry - filters still work. Grand love ya!"
- [x] WVWO aesthetic: `bg-brand-brown text-brand-cream`
- [x] ARIA: `role="status" aria-live="polite"`
- [x] Auto-hide on reconnect
- [x] Signal icon (offline indicator)

### 4. Service Worker Registration (`src/layouts/Layout.astro`) - +16 LOC
- [x] Check `'serviceWorker' in navigator`
- [x] Register on window load event
- [x] Console logging for success/error
- [x] Graceful degradation for unsupported browsers

---

## WVWO Aesthetic Compliance

### OfflineBanner Component
- [x] **Border radius**: No borders (fixed top banner)
- [x] **Colors**: `bg-brand-brown text-brand-cream` with `border-brand-orange` accent
- [x] **Typography**: `font-body` for message, `font-hand` for "Grand love ya!"
- [x] **Voice**: Kim's authentic voice (not corporate)
- [x] **Orange usage**: Only for icon and "Grand love ya!" (<5% of screen)

### Code Quality
- [x] JSDoc comments on all Service Worker functions
- [x] TypeScript interfaces for type safety
- [x] Error handling in all async operations
- [x] Console logging for debugging

---

## Accessibility Compliance (WCAG 2.1 AA)

### OfflineBanner
- [x] `role="status"` - Identifies as status region
- [x] `aria-live="polite"` - Non-intrusive screen reader announcement
- [x] Signal icon has `aria-hidden="true"` (decorative)
- [x] Text content is descriptive and readable

---

## Functional Requirements (SPEC-07 Clarification Q5)

### Offline Indicator UI
- [x] **Placement**: Fixed top banner, below header navigation
- [x] **Message**: "You're offline, but don't worry - filters still work. Grand love ya!"
- [x] **Style**: `bg-brand-brown text-brand-cream` with subtle icon
- [x] **Behavior**: Appears on connection loss, auto-hides when connection returns
- [x] **Accessibility**: `role="status" aria-live="polite"` for screen reader announcement

### Service Worker Strategy
- [x] **HTML pages**: Network-first (always fresh)
- [x] **Adventure data**: Cache-first (offline support)
- [x] **Static assets**: Cache-first (immutable)
- [x] **Cache versioning**: Clean old caches on activate

### IndexedDB Caching
- [x] **Database**: `wvwo-adventures`
- [x] **Object stores**: `adventures` (data) + `metadata` (lastSync)
- [x] **Cache duration**: 24 hours
- [x] **Expiration**: Auto-delete >24hr old data

---

## Testing Checklist

### Manual Testing

#### 1. Service Worker Registration
```
1. Open DevTools → Application → Service Workers
2. Verify "wvwo-adventures-v1" is registered
3. Check Status: "activated and running"
4. Check Scope: "/"
```

#### 2. Offline Mode (Airplane Mode Test)
```
1. Visit /adventures/ page (future PR)
2. Apply filters
3. Enable DevTools → Network → Offline checkbox
4. Verify OfflineBanner appears at top
5. Try filtering again
6. Verify filters still work (IndexedDB data)
7. Disable offline mode
8. Verify OfflineBanner hides automatically
```

#### 3. Cache Behavior
```
1. Visit /adventures/ page
2. Open DevTools → Application → Cache Storage
3. Verify "adventures-wvwo-adventures-v1" exists
4. Check cached files (HTML, JS bundles)
5. Open IndexedDB → wvwo-adventures
6. Verify "adventures" object store has data
7. Verify "metadata" object store has lastSync timestamp
```

#### 4. Screen Reader Testing (NVDA)
```
1. Enable NVDA
2. Visit /adventures/ page
3. Enable offline mode (DevTools)
4. Verify NVDA announces: "You're offline, but don't worry..."
5. Disable offline mode
6. Verify NVDA announces when banner hides (polite update)
```

### Performance Testing

#### 5. Bundle Size Verification
```bash
# Check Service Worker file size
ls -lh dist/service-worker.js

# Should be <10 KB (plain JS, no bundling)
```

#### 6. Cache Storage Limits
```
1. Open DevTools → Application → Storage
2. Check usage: IndexedDB + Cache Storage
3. Verify <50 MB total (well under browser limits)
```

---

## Integration Points (Future PRs)

### PR #6: Page Integration
When creating `AdventuresHub.tsx`, add:

```tsx
import { OfflineBanner } from './OfflineBanner';
import { cacheAdventures } from '../../lib/adventures/offline';

export function AdventuresHub({ adventures }) {
  useEffect(() => {
    // Cache adventures on first load
    cacheAdventures(adventures).catch(console.error);
  }, []);

  return (
    <>
      <OfflineBanner />
      <FilterProvider adventures={adventures}>
        {/* Rest of component */}
      </FilterProvider>
    </>
  );
}
```

---

## Known Limitations

1. **Browser Support**: Service Workers require HTTPS (or localhost)
   - Works on `localhost` for development
   - Works on Cloudflare Pages (HTTPS)
   - Does NOT work on plain HTTP sites

2. **Cache Size**: IndexedDB has browser-specific limits
   - Chrome: ~60% of disk space
   - Firefox: ~50% of disk space
   - Safari: ~1 GB
   - 70 adventures = ~1-2 MB (well under limits)

3. **Safari Quirks**: iOS Safari may clear caches aggressively
   - Cache treated as temporary storage
   - May clear after 7 days of inactivity
   - Still better than nothing for rural WV users

---

## Build Output Verification

```
✅ Build succeeded (0 errors)
✅ Service Worker copied to dist/
✅ 56 pages generated
✅ Total build time: 17.65s
✅ All React bundles <95 KB gzipped
```

---

## Next Steps

1. **PR #6**: Integrate OfflineBanner into AdventuresHub component
2. **Testing**: Manual offline mode verification on actual device
3. **Deployment**: Cloudflare Pages (HTTPS required for Service Worker)
4. **Monitoring**: Track Service Worker registration success rate in GA4

---

## Grand love ya! 🦌🏔️

**PR #5 Complete**: Service Worker + IndexedDB + OfflineBanner ready for integration.
