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
        // Delete old cache versions
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
        return self.clients.claim(); // Take control of all pages
      })
      .catch((error) => {
        console.error('[Service Worker] Activation failed:', error);
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
  if (url.origin !== location.origin) {
    return;
  }

  // HTML pages: Network-first (always fresh)
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh HTML
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
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

  // Adventure data (JSON): Cache-first
  if (
    url.pathname.includes('/adventures') ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] Serving from cache:', url.pathname);
            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(request)
            .then((response) => {
              // Cache the fresh response for next time
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, responseClone);
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

    caches.delete(CACHE_NAME).then(() => {
      return self.clients.claim();
    });
  }
});
