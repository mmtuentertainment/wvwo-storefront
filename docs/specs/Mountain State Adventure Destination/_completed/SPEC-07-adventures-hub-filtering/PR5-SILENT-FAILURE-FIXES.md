# PR #55 Silent Failure Fix Plan

**Version:** 1.0.0
**Created:** 2025-12-25
**PR:** feature/spec07-pr5-offline-support
**Author:** Hierarchical Swarm (Queen + 3 Specialists)
**Status:** Planning Complete → Ready for Implementation

---

## Executive Summary

Enhanced code review identified **10 silent failure issues** in PR #55 (Offline Support for Adventures Hub). These issues could cause:

- Broken offline mode without user awareness
- Cache corruption with no recovery path
- Data loss during partial write failures
- Poor UX for rural WV users on spotty connectivity

This document provides a prioritized fix plan with specific code changes, testing strategies, and rural WV edge case coverage.

**Fix Summary:**
- **1 BLOCKING** (must fix before merge)
- **4 CRITICAL** (silent failures that break core functionality)
- **3 HIGH** (reliability issues affecting rural users)
- **2 MEDIUM** (enhancement opportunities)
- **1 MINOR** (code consistency)

**Total Effort Estimate:** 10-14 hours

---

## Issue Priority Matrix

| Issue ID | Component | Severity | Description | Est. Time |
|----------|-----------|----------|-------------|-----------|
| **CACHE-0** | Service Worker | BLOCKING | SW in src/ (needs public/) | 0.5 hr |
| **SW-1** | Service Worker | BLOCKING | Install fails but skipWaiting called | 1 hr |
| **SW-3** | Service Worker | BLOCKING | REFRESH_CACHE claims clients after failure | 1 hr |
| **IDB-1** | IndexedDB | BLOCKING | Promise.all fails fast - partial writes lost | 1.5 hr |
| **IDB-4** | IndexedDB | BLOCKING | No UI for IndexedDB unsupported | 0.5 hr |
| **SW-2** | Service Worker | CRITICAL | Activate fails but claims clients anyway | 0.5 hr |
| **IDB-2** | IndexedDB | CRITICAL | getCachedAdventures null masks errors | 1 hr |
| **IDB-3** | IndexedDB | CRITICAL | clearExpiredCache false masks errors | 1 hr |
| **CACHE-2** | Service Worker | CRITICAL | No retry for rural WV connectivity | 1 hr |
| **SW-4** | Service Worker | HIGH | No retry logic for install/refresh | 0.5 hr |
| **SW-5** | Service Worker | HIGH | No user notification system | 1 hr |
| **CACHE-1** | Service Worker | HIGH | No stale-while-revalidate | 1 hr |
| **IDB-6** | IndexedDB | MEDIUM | Transaction error propagation | 0.5 hr |
| **CACHE-3** | Service Worker | MEDIUM | Silent cache write failures | 0.5 hr |
| **SW-8** | Service Worker | MINOR | Inconsistent `location.origin` vs `self.location.origin` | 0.1 hr |

---

## Fix Sequence (Implementation Order)

### Phase 1: Deployment Blockers (Must Fix First)
1. **CACHE-0**: Move Service Worker to public/ (blocks deployment)
2. **SW-1**: Fix install error propagation
3. **SW-3**: Fix REFRESH_CACHE client claiming
4. **IDB-1**: Fix Promise.all partial write handling
5. **IDB-4**: Add IndexedDB unsupported banner

### Phase 2: Core Reliability
6. **SW-2**: Fix activate error propagation
7. **IDB-2**: Add typed result for getCachedAdventures
8. **IDB-3**: Add typed result for clearExpiredCache
9. **CACHE-2**: Add retry logic with exponential backoff

### Phase 3: User Experience
10. **SW-4**: Add retry logic to install/refresh
11. **SW-5**: Add client notification system (postMessage + toasts)
12. **CACHE-1**: Implement stale-while-revalidate

### Phase 4: Enhancements (Post-Merge OK)
13. **IDB-6**: Transaction error propagation patterns
14. **CACHE-3**: Cache failure tracking metrics
15. **SW-8**: Fix `location.origin` → `self.location.origin` consistency

---

## Detailed Fix Specifications

### CACHE-0: Service Worker File Location (BLOCKING)

**Current Location:** `wv-wild-web/src/service-worker.js`
**Required Location:** `wv-wild-web/public/service-worker.js`

**Problem:**
Service Workers MUST be served from the site root for scope reasons. Astro's `src/` folder is not publicly accessible at runtime. The SW **will not register** in production.

**Fix Steps:**
1. Move file: `git mv wv-wild-web/src/service-worker.js wv-wild-web/public/service-worker.js`
2. Verify registration path in Layout.astro (already correct: `/service-worker.js`)
3. Test: Run `npm run build && npm run preview`, check DevTools → Application → Service Workers

**Verification:**
```bash
curl -I http://localhost:4321/service-worker.js
# Should return 200 OK with content-type: application/javascript
```

---

### SW-1: Install Event Error Propagation (BLOCKING)

**File:** `wv-wild-web/public/service-worker.js`
**Lines:** 26-43

**Current Behavior:**
```javascript
.catch((error) => {
  console.error('[Service Worker] Install failed:', error);
  // Error logged but not propagated - browser treats as successful install
})
```

When `cache.addAll()` fails (e.g., network timeout on rural 3G), the error is caught, logged, but the promise chain doesn't reject. The browser activates a broken service worker.

**Fix (Replace lines 26-48):**
```javascript
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing WVWO adventures cache...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching adventures hub');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Install complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Install failed:', error);

        // Notify clients of installation failure
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'SW_INSTALL_FAILED',
              message: "Offline mode unavailable - network connection too slow. You can still browse, but offline filtering won't work yet.",
              error: error.message
            });
          });
        });

        // CRITICAL: Re-throw to fail installation
        throw error;
      })
  );
});
```

**Testing:**
1. DevTools Network → Throttle to "Slow 3G"
2. Hard refresh (Ctrl+Shift+R)
3. Verify console shows "Install failed" AND SW status = "redundant"
4. Verify client receives `SW_INSTALL_FAILED` message

---

### SW-3: REFRESH_CACHE Client Claiming (BLOCKING)

**File:** `wv-wild-web/public/service-worker.js`
**Lines:** 169-186

**Current Behavior:**
```javascript
.catch((error) => {
  console.error('[Service Worker] Cache refresh failed:', error);
  return self.clients.claim(); // ❌ Still claims clients on failure!
});
```

Even when cache refresh FAILS, the SW claims all clients. Pages think offline mode works, but cache is empty/stale.

**Fix (Replace lines 169-203):**
```javascript
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'REFRESH_CACHE') {
    console.log('[Service Worker] Refreshing cache...');

    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => caches.open(CACHE_NAME))
        .then((cache) => cache.addAll(STATIC_ASSETS))
        .then(() => {
          console.log('[Service Worker] Cache refreshed successfully');
          return self.clients.claim(); // SUCCESS: Now safe to claim
        })
        .then(() => {
          return self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'CACHE_REFRESHED',
                message: 'Offline content updated - latest adventures are cached.'
              });
            });
          });
        })
        .catch((error) => {
          console.error('[Service Worker] Cache refresh failed:', error);

          // CRITICAL: Do NOT claim clients on failure
          return self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'CACHE_REFRESH_FAILED',
                message: "Couldn't update offline content - try again when you have better signal.",
                error: error.message
              });
            });
          });
        })
    );
  }
});
```

**Testing:**
1. Page sends `REFRESH_CACHE` message
2. Throttle network to "Offline"
3. Verify cache refresh fails and `clients.claim()` NOT called
4. Verify page receives `CACHE_REFRESH_FAILED` message
5. Restore network, retry → verify success path

---

### IDB-1: Promise.all Partial Write Handling (BLOCKING)

**File:** `wv-wild-web/src/lib/adventures/offline.ts`
**Lines:** 99-142

**Current Behavior:**
```typescript
await Promise.all(storePromises); // ❌ First failure aborts entire operation
```

If adventure #5 of 20 fails, adventures 1-4 are discarded, 6-20 never attempted. User sees generic error.

**Fix (Replace lines 99-142):**
```typescript
/**
 * Result type for cache operations
 */
export interface CacheResult {
  success: boolean;
  totalCount: number;
  successCount: number;
  failedCount: number;
  failedSlugs: string[];
  error?: string;
  userMessage: string;
}

export async function cacheAdventures(adventures: Adventure[]): Promise<CacheResult> {
  const result: CacheResult = {
    success: false,
    totalCount: adventures.length,
    successCount: 0,
    failedCount: 0,
    failedSlugs: [],
    userMessage: '',
  };

  try {
    const db = await openDB();
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readwrite');
    const adventuresStore = transaction.objectStore(ADVENTURES_STORE);
    const metadataStore = transaction.objectStore(METADATA_STORE);

    // Clear existing adventures
    await new Promise<void>((resolve, reject) => {
      const clearRequest = adventuresStore.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(new Error('Failed to clear adventures'));
    });

    // Store each adventure with allSettled (handles partial failures)
    const storePromises = adventures.map((adventure) => {
      return new Promise<{ slug: string; success: boolean }>((resolve) => {
        const addRequest = adventuresStore.add(adventure);
        addRequest.onsuccess = () => resolve({ slug: adventure.slug, success: true });
        addRequest.onerror = () => {
          console.error(`[IndexedDB] Failed to store: ${adventure.slug}`, addRequest.error);
          resolve({ slug: adventure.slug, success: false });
        };
      });
    });

    const results = await Promise.allSettled(storePromises);

    // Aggregate results
    results.forEach((promiseResult) => {
      if (promiseResult.status === 'fulfilled') {
        if (promiseResult.value.success) {
          result.successCount++;
        } else {
          result.failedCount++;
          result.failedSlugs.push(promiseResult.value.slug);
        }
      } else {
        result.failedCount++;
      }
    });

    // Update metadata only if at least some succeeded
    if (result.successCount > 0) {
      const metadata: CacheMetadata = {
        lastSync: Date.now(),
        version: DB_VERSION.toString(),
      };

      await new Promise<void>((resolve, reject) => {
        const putRequest = metadataStore.put({ key: 'cache', ...metadata });
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(new Error('Failed to update metadata'));
      });
    }

    db.close();

    // Determine success status and user message (Kim's voice)
    if (result.failedCount === 0) {
      result.success = true;
      result.userMessage = `All ${result.successCount} adventures saved for offline use. You're all set!`;
    } else if (result.successCount > 0) {
      result.success = true; // Partial success still allows offline mode
      result.userMessage = `Saved ${result.successCount} of ${result.totalCount} adventures. ${result.failedCount} couldn't be saved, but you can still browse offline.`;
    } else {
      result.success = false;
      result.error = 'All cache writes failed';
      result.userMessage = `Hmm, we couldn't save adventures for offline use. You'll need an internet connection to browse.`;
    }

    console.log(`[IndexedDB] Cache result: ${result.successCount} succeeded, ${result.failedCount} failed`);
    return result;

  } catch (error) {
    result.success = false;
    result.error = error instanceof Error ? error.message : String(error);

    if (error instanceof Error && error.message.includes('IndexedDB not supported')) {
      result.userMessage = `Your browser doesn't support offline mode. You'll need an internet connection to browse adventures.`;
    } else {
      result.userMessage = `We couldn't save adventures for offline browsing. Check your connection and try again.`;
    }

    console.error('[IndexedDB] Failed to cache adventures:', error);
    return result;
  }
}
```

**Testing:**
1. Simulate partial failure (duplicate slug), verify others still cache
2. Full failure: Block IndexedDB, verify user message displays
3. Success: Cache 20 adventures, verify all succeed

---

### IDB-4: IndexedDB Unsupported Banner (BLOCKING)

**New File:** `wv-wild-web/src/components/IndexedDBUnsupportedBanner.astro`

**Problem:**
Rural WV users on IE11, older Safari, or privacy mode browsers see silent failure with no notification.

**Fix (Create new component):**
```astro
---
/**
 * Banner notification for browsers without IndexedDB support
 * WCAG 2.1 AA 3.3.1 (Error Identification)
 */
---

<div
  id="indexeddb-unsupported-banner"
  class="hidden bg-brand-mud text-brand-cream px-4 py-3 rounded-sm border-l-4 border-l-brand-orange"
  role="alert"
  aria-live="polite"
>
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div class="flex-1">
      <p class="font-display font-medium text-sm">
        Your browser doesn't support offline mode
      </p>
      <p class="text-sm mt-1 text-brand-cream/80">
        You'll need an internet connection to browse adventures. For offline access, try Chrome, Firefox, or Edge.
      </p>
    </div>
    <button
      type="button"
      class="text-brand-cream/60 hover:text-brand-cream transition-colors"
      aria-label="Dismiss banner"
      onclick="this.closest('#indexeddb-unsupported-banner').remove()"
    >
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>

<script>
  if (!('indexedDB' in window)) {
    const banner = document.getElementById('indexeddb-unsupported-banner');
    if (banner) {
      banner.classList.remove('hidden');
    }
  }
</script>
```

**Usage:** Add to adventures hub page layout.

**Testing:**
1. Modern browser: Verify banner hidden
2. Mock `window.indexedDB = undefined`: Verify banner shows
3. Screen reader: Verify `role="alert"` announces

---

### CACHE-2: Retry Logic for Rural WV Connectivity (CRITICAL)

**File:** `wv-wild-web/public/service-worker.js`
**Insert after line 78**

**Problem:**
Single fetch attempt with immediate failure. Rural WV I-79/US-19 corridor has spotty cell service - intermittent connectivity is normal.

**Fix (Add retry utility):**
```javascript
/**
 * Exponential Backoff Retry for Rural Connectivity
 *
 * Retries failed fetches with increasing delays:
 * - Attempt 1: Immediate
 * - Attempt 2: 1 second delay
 * - Attempt 3: 2 second delay
 * - Attempt 4: 4 second delay
 */
async function fetchWithRetry(request, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 4000);
        console.log(`[Service Worker] Retry ${attempt}/${maxRetries} after ${delayMs}ms delay`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      // 5-second timeout per attempt
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(request, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        return response;
      }

      // Server error (5xx) - retry
      if (response.status >= 500) {
        lastError = new Error(`Server error: ${response.status}`);
        continue;
      } else {
        // Client error (4xx) - don't retry
        throw new Error(`Client error: ${response.status}`);
      }

    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;
      console.warn(`[Service Worker] Fetch attempt ${attempt + 1} failed:`, error.message);
    }
  }

  throw lastError || new Error('Fetch failed after retries');
}

/**
 * Retry caching operations with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const waitTime = delay * Math.pow(2, attempt);
        console.log(`[Service Worker] Retry ${attempt + 1}/${maxRetries} after ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}
```

**Update fetch event (line 135):**
```javascript
// OLD:
return fetch(request)

// NEW:
return fetchWithRetry(request, 3)
```

**Testing:**
1. Chrome DevTools → Network → Slow 3G with 50% packet loss
2. Verify retry attempts in console logs
3. Verify final failure after ~7 seconds (1s + 2s + 4s)
4. Test intermittent connectivity (offline → online during retry)

---

### IDB-2: Typed Result for getCachedAdventures (CRITICAL)

**File:** `wv-wild-web/src/lib/adventures/offline.ts`
**Lines:** 152-197

**Problem:**
Returns `null` for: cache doesn't exist, cache expired, read failed, IndexedDB unsupported. Caller can't show appropriate message.

**Fix (Replace lines 152-197):**
```typescript
export interface CacheRetrievalResult {
  success: boolean;
  data: Adventure[] | null;
  reason: 'found' | 'not-found' | 'expired' | 'error' | 'unsupported';
  cacheAgeMinutes?: number;
  error?: string;
  userMessage: string;
}

export async function getCachedAdventures(): Promise<CacheRetrievalResult> {
  try {
    const db = await openDB();
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readonly');
    const adventuresStore = transaction.objectStore(ADVENTURES_STORE);
    const metadataStore = transaction.objectStore(METADATA_STORE);

    const metadata = await new Promise<CacheMetadata | null>((resolve, reject) => {
      const getRequest = metadataStore.get('cache');
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? { lastSync: result.lastSync, version: result.version } : null);
      };
      getRequest.onerror = () => reject(new Error('Failed to get metadata'));
    });

    if (!metadata) {
      db.close();
      return {
        success: false,
        data: null,
        reason: 'not-found',
        userMessage: 'No offline data saved yet. Browse with internet to cache adventures.',
      };
    }

    const cacheAge = Date.now() - metadata.lastSync;
    const cacheAgeMinutes = Math.floor(cacheAge / 60000);

    if (cacheAge > CACHE_DURATION_MS) {
      db.close();
      return {
        success: false,
        data: null,
        reason: 'expired',
        cacheAgeMinutes,
        userMessage: 'Offline data is out of date. Connect to internet to refresh.',
      };
    }

    const adventures = await new Promise<Adventure[]>((resolve, reject) => {
      const getAllRequest = adventuresStore.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(new Error('Failed to get adventures'));
    });

    db.close();

    return {
      success: true,
      data: adventures,
      reason: 'found',
      cacheAgeMinutes,
      userMessage: `Showing ${adventures.length} adventures from offline cache (updated ${cacheAgeMinutes} minutes ago).`,
    };

  } catch (error) {
    if (error instanceof Error && error.message.includes('IndexedDB not supported')) {
      return {
        success: false,
        data: null,
        reason: 'unsupported',
        error: error.message,
        userMessage: "Your browser doesn't support offline mode. You'll need an internet connection.",
      };
    }

    return {
      success: false,
      data: null,
      reason: 'error',
      error: error instanceof Error ? error.message : String(error),
      userMessage: "Couldn't load offline data. Try refreshing or check your connection.",
    };
  }
}
```

**Testing:**
1. No cache: Verify `reason: 'not-found'`
2. Expired: Set lastSync to 48h ago, verify `reason: 'expired'`
3. Valid: Verify `reason: 'found'` with correct count
4. Unsupported: Mock IndexedDB undefined, verify `reason: 'unsupported'`

---

### IDB-3: Typed Result for clearExpiredCache (CRITICAL)

**File:** `wv-wild-web/src/lib/adventures/offline.ts`
**Lines:** 207-261

**Problem:**
Returns `false` for: no metadata, not expired, AND operation failed. Caller can't distinguish.

**Fix (Replace lines 207-261):**
```typescript
export interface ClearCacheResult {
  success: boolean;
  cleared: boolean;
  reason: 'cleared' | 'not-expired' | 'not-found' | 'error';
  cacheAgeHours?: number;
  error?: string;
  userMessage: string;
}

export async function clearExpiredCache(): Promise<ClearCacheResult> {
  try {
    const db = await openDB();
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readwrite');
    const metadataStore = transaction.objectStore(METADATA_STORE);

    const metadata = await new Promise<CacheMetadata | null>((resolve, reject) => {
      const getRequest = metadataStore.get('cache');
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? { lastSync: result.lastSync, version: result.version } : null);
      };
      getRequest.onerror = () => reject(new Error('Failed to get metadata'));
    });

    if (!metadata) {
      db.close();
      return {
        success: true,
        cleared: false,
        reason: 'not-found',
        userMessage: 'No cache found to clear.',
      };
    }

    const cacheAge = Date.now() - metadata.lastSync;
    const cacheAgeHours = Math.floor(cacheAge / (60 * 60 * 1000));

    if (cacheAge > CACHE_DURATION_MS) {
      const adventuresStore = transaction.objectStore(ADVENTURES_STORE);
      const metaStore = transaction.objectStore(METADATA_STORE);

      await Promise.all([
        new Promise<void>((resolve, reject) => {
          const clearAdventures = adventuresStore.clear();
          clearAdventures.onsuccess = () => resolve();
          clearAdventures.onerror = () => reject(new Error('Failed to clear adventures'));
        }),
        new Promise<void>((resolve, reject) => {
          const clearMeta = metaStore.clear();
          clearMeta.onsuccess = () => resolve();
          clearMeta.onerror = () => reject(new Error('Failed to clear metadata'));
        }),
      ]);

      db.close();

      return {
        success: true,
        cleared: true,
        reason: 'cleared',
        cacheAgeHours,
        userMessage: `Cleared old offline data (${cacheAgeHours} hours old). Refresh to cache new adventures.`,
      };
    }

    db.close();
    return {
      success: true,
      cleared: false,
      reason: 'not-expired',
      cacheAgeHours,
      userMessage: `Offline cache is still fresh (${cacheAgeHours} hours old).`,
    };

  } catch (error) {
    return {
      success: false,
      cleared: false,
      reason: 'error',
      error: error instanceof Error ? error.message : String(error),
      userMessage: "Couldn't clear old cache. It'll expire automatically in 24 hours.",
    };
  }
}
```

---

### SW-5: Client Notification System (HIGH)

**New File:** `wv-wild-web/src/scripts/sw-notifications.ts`

**Problem:**
All SW events are console-only. Users have no visibility into offline mode status.

**Fix (Create new file):**
```typescript
/**
 * Service Worker notification handler
 * Displays Kim-voiced toast messages for SW state changes
 */

type SWMessageType =
  | 'SW_INSTALL_FAILED'
  | 'SW_ACTIVATED'
  | 'CACHE_REFRESHED'
  | 'CACHE_REFRESH_FAILED';

interface SWMessage {
  type: SWMessageType;
  message: string;
  error?: string;
}

function showToast(message: string, type: 'success' | 'error' | 'info') {
  const toast = document.createElement('div');
  toast.className = `sw-toast sw-toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  // WVWO styling
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    padding: 16px 20px;
    background: #FFF8E1;
    border-left: 4px solid ${type === 'error' ? '#dc2626' : '#2E7D32'};
    border-radius: 2px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    font-family: 'Noto Sans', sans-serif;
    font-size: 14px;
    color: #3E2723;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event: MessageEvent<SWMessage>) => {
    const { type, message, error } = event.data;

    switch (type) {
      case 'SW_INSTALL_FAILED':
        showToast(message, 'error');
        console.error('[SW] Install failed:', error);
        break;

      case 'SW_ACTIVATED':
        showToast(message, 'success');
        break;

      case 'CACHE_REFRESHED':
        showToast(message, 'success');
        break;

      case 'CACHE_REFRESH_FAILED':
        showToast(message, 'error');
        console.error('[SW] Cache refresh failed:', error);
        break;
    }
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
```

**Usage:** Import in Layout.astro: `import '../scripts/sw-notifications';`

---

### CACHE-1: Stale-While-Revalidate Pattern (HIGH)

**File:** `wv-wild-web/public/service-worker.js`
**Lines:** 120-154

**Problem:**
Cache-first serves stale content for up to 24 hours with no background revalidation.

**Fix (Replace lines 120-154):**
```javascript
if (isFirstParty && isAdventureAsset) {
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Start background fetch (don't await)
        const fetchPromise = fetchWithRetry(request, 2)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              const responseClone = networkResponse.clone();

              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone))
                .then(() => {
                  return self.clients.matchAll();
                })
                .then((clients) => {
                  clients.forEach((client) => {
                    client.postMessage({
                      type: 'CACHE_UPDATED',
                      url: request.url,
                      timestamp: Date.now(),
                    });
                  });
                })
                .catch((error) => {
                  console.warn('[Service Worker] Background cache update failed:', error);
                });
            }
            return networkResponse;
          })
          .catch((error) => {
            console.warn('[Service Worker] Background fetch failed (offline?):', error);
          });

        // Serve cached immediately, network updates in background
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache (stale-while-revalidate):', url.pathname);
          return cachedResponse;
        }

        // No cache, must wait for network
        return fetchPromise
          .then((response) => {
            if (!response || response.status !== 200) {
              throw new Error(`Network request failed: ${response?.status}`);
            }
            return response;
          });
      })
  );
  return;
}
```

---

### SW-8: Inconsistent Global Scope Reference (MINOR)

**File:** `wv-wild-web/public/service-worker.js`
**Line:** 94

**Problem:**
Line 94 uses `location.origin` but line 122 correctly uses `self.location.origin`. In Service Worker context, `self` is the proper global object. While `location` might work in some browsers, it's not the standard SW pattern and could cause compatibility issues.

**Current Behavior (Line 94):**
```javascript
if (url.origin !== location.origin) {
```

**Fix (Replace line 94):**
```javascript
if (url.origin !== self.location.origin) {
```

**Verification:**
Search file for any remaining bare `location` references:
```bash
grep -n "location\." public/service-worker.js | grep -v "self.location"
```
Should return no results after fix.

**Testing:**
1. Test in Firefox (stricter about SW globals)
2. Test in Safari (historically inconsistent SW support)
3. Verify same-origin check works across browsers

---

## Rural WV Edge Cases Coverage

### Connectivity Patterns on I-79/US-19 Corridor

| Scenario | Frequency | Fix Coverage |
|----------|-----------|--------------|
| Complete signal loss (tunnels, hollows) | High | CACHE-0, CACHE-1 (serve stale) |
| Intermittent 3G drops | Very High | CACHE-2 (retry + backoff) |
| Slow 3G (100+ Kbps) | Common | SW-4 (extended timeout 5s) |
| Network toggle (cell → WiFi) | Medium | SW-5 (notification of state) |
| Browser privacy mode | Low | IDB-4 (unsupported banner) |
| Old browser (IE11, Safari 10) | Low | IDB-4 (unsupported banner) |

### Test Scenarios for Rural WV

1. **Birch River Dead Zones**
   - Location: I-79 Exit 57 to shop (~5 miles)
   - Test: Enable airplane mode, verify offline filtering works
   - Expected: Cache serves stale data, banner shows "offline" status

2. **Intermittent Cell on US-19**
   - Simulation: Network throttle + 50% packet loss
   - Test: Load adventures page, apply filters
   - Expected: Retry logic handles drops, data eventually loads

3. **Tunnel Passage (I-79 near Sutton)**
   - Simulation: Go offline during page load
   - Test: Complete offline → online → offline cycle
   - Expected: Stale-while-revalidate updates cache, offline persists

4. **Low-End Device (Older Android)**
   - Simulation: 2x CPU slowdown + Slow 3G
   - Test: Full page interaction cycle
   - Expected: All operations complete, no silent failures

---

## Testing Checklist

### Unit Tests (Vitest)

```typescript
// service-worker.test.ts
describe('Service Worker Install', () => {
  it('should retry failed cache.addAll() 3 times');
  it('should notify clients on install failure');
  it('should throw error after all retries exhausted');
});

describe('IndexedDB Offline', () => {
  it('should return partial success with Promise.allSettled');
  it('should return typed result for getCachedAdventures');
  it('should distinguish expired from not-found from error');
});
```

### Integration Tests (Playwright)

```typescript
// offline.spec.ts
test('offline mode persists after network failure', async ({ page }) => {
  await page.goto('/adventures');
  await page.waitForLoadState('networkidle');

  const swStatus = await page.evaluate(() =>
    navigator.serviceWorker.controller?.state
  );
  expect(swStatus).toBe('activated');

  await page.context().setOffline(true);
  await page.getByLabel('Difficulty').selectOption('Moderate');
  await expect(page.getByTestId('adventure-card')).toHaveCount(4);
});

test('retry logic handles intermittent connectivity', async ({ page }) => {
  // Enable request interception with 50% failure rate
  await page.route('**/*.json', async route => {
    if (Math.random() > 0.5) {
      return route.abort();
    }
    return route.continue();
  });

  await page.goto('/adventures');
  // Should eventually succeed after retries
  await expect(page.locator('.adventure-card')).toHaveCount(20, { timeout: 15000 });
});
```

### Manual Test Checklist

```
BLOCKING FIXES:
[ ] CACHE-0: Service Worker registers from public/
[ ] SW-1: Install failure shows error toast, SW not activated
[ ] SW-3: REFRESH_CACHE failure does NOT claim clients
[ ] IDB-1: Partial write reports X of Y succeeded
[ ] IDB-4: IndexedDB unsupported shows banner

CRITICAL FIXES:
[ ] SW-2: Activate failure keeps old SW active
[ ] IDB-2: Expired cache returns reason: 'expired'
[ ] IDB-3: Clear failure returns reason: 'error'
[ ] CACHE-2: Slow 3G shows 3 retry attempts in console

HIGH PRIORITY:
[ ] SW-4: Install retries with 1s, 2s, 4s delays
[ ] SW-5: Success/failure toasts display with Kim's voice
[ ] CACHE-1: Fresh data fetched in background, cached

RURAL WV SCENARIOS:
[ ] Offline filtering works after network loss
[ ] Retry handles 50% packet loss
[ ] Stale data served instantly, fresh data queued
[ ] Toast notifications visible on mobile
```

---

## Implementation Notes

### Breaking Changes

None. All fixes are backward-compatible additions.

### Migration Path

1. Update types for components consuming `getCachedAdventures()` and `clearExpiredCache()`
2. Replace `null` checks with `result.success` checks
3. Add SW notification listener to layouts

### Rollback Plan

If issues discovered post-merge:
1. Revert typed results to original returns
2. Keep file location fix (CACHE-0) as it's deployment-critical
3. Disable retry logic by setting `maxRetries = 0`

---

## Summary

**Total Fixes:** 15
**BLOCKING:** 5 (must fix before merge)
**Total Effort:** 10-14 hours
**Recommended PR Sequence:** Fix phases 1-2 in single PR, phases 3-4 in follow-up

**Grand love ya!** 🦌🏔️
