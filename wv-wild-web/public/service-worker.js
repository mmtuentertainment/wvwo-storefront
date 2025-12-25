/**
 * WVWO Service Worker - Offline-First Caching for Adventures Hub
 *
 * Provides offline support for rural WV spotty cell service.
 * Cache-first strategy for adventure data, network-first for HTML.
 *
 * SPEC-07 PR #5: Offline Support
 * Version: 1.0.0
 */

const CACHE_VERSION = 'wvwo-adventures-v1';
const CACHE_NAME = `adventures-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/adventures/',
  // React bundles will be cached dynamically on fetch
];

/**
 * Exponential Backoff Retry for Rural Connectivity
 *
 * Retries failed fetches with increasing delays:
 * - Attempt 1: Immediate
 * - Attempt 2: 1 second delay
 * - Attempt 3: 2 second delay
 * - Attempt 4: 4 second delay
 *
 * Critical for spotty I-79/US-19 corridor cell service.
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
        return response;
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
        console.log(`[Service Worker] Cache retry ${attempt + 1}/${maxRetries} after ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}

/**
 * Install Event - Cache static assets
 *
 * Caches the adventures hub HTML and prepares for offline mode.
 * Uses skipWaiting() to activate immediately.
 */
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
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Install failed:', error);
        // Notify clients of installation failure
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_INSTALL_FAILED',
              error: error.message
            });
          });
        });
        // Re-throw to ensure install event fails
        throw error;
      })
  );
});

/**
 * Activate Event - Clean old caches
 *
 * Removes outdated cache versions to prevent storage bloat.
 * Claims all clients to start controlling them immediately.
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('adventures-') && name !== CACHE_NAME;
            })
            .map((oldCache) => {
              console.log('[Service Worker] Deleting old cache:', oldCache);
              return caches.delete(oldCache);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
      .then(() => {
        // Notify clients of successful activation
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_ACTIVATED',
              message: 'Offline mode ready - you can filter adventures even without internet.'
            });
          });
        });
      })
      .catch((error) => {
        console.error('[Service Worker] Activation failed:', error);
        // Notify clients of failure
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_ACTIVATION_FAILED',
              error: error.message
            });
          });
        });
        // Re-throw to fail activation
        throw error;
      })
  );
});

/**
 * Fetch Event - Cache-first for adventure data, network-first for HTML
 *
 * Strategy:
 * - HTML pages: Network-first (always fresh)
 * - Adventure data (.json, API calls): Cache-first (offline support)
 * - Static assets (JS, CSS, images): Cache-first (immutable)
 *
 * Enables filtering to work offline with cached data.
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // HTML pages: Network-first (always fresh)
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh HTML (async, don't block response)
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone))
            .catch((error) => {
              console.warn('[Service Worker] Failed to cache HTML:', error);
            });
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(request);
        })
    );
    return;
  }

  // Adventure-related assets: Stale-while-revalidate (first-party only)
  // Only cache our own assets, not third-party CDN/analytics
  const isFirstParty = url.origin === self.location.origin;
  const isAdventureAsset = url.pathname.includes('/adventures');

  if (isFirstParty && isAdventureAsset) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          // Start background fetch (don't await - fire and forget)
          const fetchPromise = fetchWithRetry(request, 2)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone))
                  .then(() => {
                    // Notify clients that fresh data is available
                    self.clients.matchAll().then((clients) => {
                      clients.forEach((client) => {
                        client.postMessage({
                          type: 'CACHE_UPDATED',
                          url: request.url
                        });
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
              console.warn('[Service Worker] Background fetch failed (offline?):', error.message);
            });

          // Serve cached immediately if available (stale-while-revalidate)
          if (cachedResponse) {
            console.log('[Service Worker] Serving from cache (stale-while-revalidate):', url.pathname);
            return cachedResponse;
          }

          // No cache, must wait for network
          return fetchWithRetry(request, 3)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone))
                  .catch((error) => {
                    console.warn('[Service Worker] Failed to cache adventure data:', error);
                  });
              }
              return response;
            })
            .catch((error) => {
              console.error('[Service Worker] Fetch failed:', error);
              throw error;
            });
        })
    );
    return;
  }

  // All other requests: Network-first
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

/**
 * Message Event - Handle cache refresh requests
 *
 * Allows the app to manually trigger cache updates.
 * Used when adventure data changes.
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'REFRESH_CACHE') {
    console.log('[Service Worker] Refreshing cache...');

    caches.delete(CACHE_NAME)
      .then(() => caches.open(CACHE_NAME))
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => {
        console.log('[Service Worker] Cache refreshed successfully');
        // Only claim clients on SUCCESS
        return self.clients.claim();
      })
      .then(() => {
        // Notify clients of successful refresh
        return self.clients.matchAll();
      })
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'CACHE_REFRESH_SUCCESS'
          });
        });
      })
      .catch((error) => {
        console.error('[Service Worker] Cache refresh failed:', error);
        // Notify clients of failure (DO NOT claim on failure)
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'CACHE_REFRESH_FAILED',
              error: error.message
            });
          });
        });
      });
  }
});
