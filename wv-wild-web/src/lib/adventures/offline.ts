/**
 * WVWO IndexedDB Offline Storage Utilities
 *
 * Provides offline caching for adventure data using IndexedDB.
 * Cache expires after 24 hours to ensure data freshness.
 *
 * SPEC-07 PR #5: Offline Support
 * Version: 1.0.0
 */

const DB_NAME = 'wvwo-adventures';
const DB_VERSION = 1;
const ADVENTURES_STORE = 'adventures';
const METADATA_STORE = 'metadata';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Adventure data type (matches Content Collections schema)
 */
export interface Adventure {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    type: string;
    difficulty?: string;
    elevation_gain?: number;
    seasons?: string[];
    gear?: string[];
    suitability?: string[];
    [key: string]: any;
  };
}

/**
 * Cache metadata type
 */
interface CacheMetadata {
  lastSync: number;
  version: string;
}

/**
 * Cache operation result
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

/**
 * Cache retrieval result (IDB-2)
 */
export interface CacheRetrievalResult {
  success: boolean;
  data: Adventure[] | null;
  reason: 'found' | 'not-found' | 'expired' | 'error' | 'unsupported';
  cacheAgeMinutes?: number;
  error?: string;
  userMessage: string;
}

/**
 * Cache clearing result (IDB-3)
 */
export interface ClearCacheResult {
  success: boolean;
  cleared: boolean;
  reason: 'cleared' | 'not-expired' | 'not-found' | 'error';
  cacheAgeHours?: number;
  error?: string;
  userMessage: string;
}

/**
 * Open IndexedDB connection
 *
 * Creates database with two object stores:
 * - adventures: Stores adventure data by slug
 * - metadata: Stores cache metadata (lastSync timestamp)
 *
 * @returns Promise<IDBDatabase> Database connection
 * @throws Error if IndexedDB not supported
 */
export async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // Check IndexedDB support
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported in this browser'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create adventures object store (keyed by slug)
      if (!db.objectStoreNames.contains(ADVENTURES_STORE)) {
        db.createObjectStore(ADVENTURES_STORE, { keyPath: 'slug' });
        console.log('[IndexedDB] Created adventures store');
      }

      // Create metadata object store
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        db.createObjectStore(METADATA_STORE, { keyPath: 'key' });
        console.log('[IndexedDB] Created metadata store');
      }
    };
  });
}

/**
 * Cache adventures data in IndexedDB
 *
 * Stores all adventures and updates lastSync timestamp.
 * Clears existing data before storing new data.
 * Uses Promise.allSettled to track partial write failures.
 *
 * @param adventures Array of adventure objects
 * @returns Promise<CacheResult> Result with success/failure counts and user-friendly message
 */
export async function cacheAdventures(adventures: Adventure[]): Promise<CacheResult> {
  const totalCount = adventures.length;
  const failedSlugs: string[] = [];

  try {
    const db = await openDB();
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readwrite');
    const adventuresStore = transaction.objectStore(ADVENTURES_STORE);
    const metadataStore = transaction.objectStore(METADATA_STORE);

    // Clear existing adventures
    try {
      await new Promise<void>((resolve, reject) => {
        const clearRequest = adventuresStore.clear();
        clearRequest.onsuccess = () => resolve();
        clearRequest.onerror = () => reject(new Error('Failed to clear adventures'));
      });
    } catch (error) {
      console.error('[IndexedDB] Failed to clear adventures:', error);
      db.close();
      return {
        success: false,
        totalCount,
        successCount: 0,
        failedCount: totalCount,
        failedSlugs: adventures.map((a) => a.slug),
        error: 'Failed to clear existing cache',
        userMessage: "Hmm, we couldn't save adventures for offline use. You'll need an internet connection to browse.",
      };
    }

    // Store each adventure using Promise.allSettled
    const storePromises = adventures.map((adventure) => {
      return new Promise<string>((resolve, reject) => {
        const addRequest = adventuresStore.add(adventure);
        addRequest.onsuccess = () => resolve(adventure.slug);
        addRequest.onerror = () => reject(new Error(`Failed to store adventure: ${adventure.slug}`));
      });
    });

    const results = await Promise.allSettled(storePromises);

    // Track successes and failures
    let successCount = 0;
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successCount++;
      } else {
        failedSlugs.push(adventures[index].slug);
      }
    });

    const failedCount = totalCount - successCount;

    // Update lastSync metadata only if at least one adventure succeeded
    if (successCount > 0) {
      const metadata: CacheMetadata = {
        lastSync: Date.now(),
        version: DB_VERSION.toString(),
      };

      try {
        await new Promise<void>((resolve, reject) => {
          const putRequest = metadataStore.put({ key: 'cache', ...metadata });
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(new Error('Failed to update metadata'));
        });
      } catch (error) {
        console.error('[IndexedDB] Failed to update metadata:', error);
        // Non-critical - we still cached adventures
      }
    }

    console.log(`[IndexedDB] Cached ${successCount}/${totalCount} adventures`);
    if (failedCount > 0) {
      console.warn(`[IndexedDB] Failed to cache ${failedCount} adventures:`, failedSlugs);
    }
    db.close();

    // Generate user-friendly message based on results
    let userMessage: string;
    if (successCount === totalCount) {
      // All success
      userMessage = `All ${totalCount} adventures saved for offline use. You're all set!`;
    } else if (successCount > 0) {
      // Partial success
      userMessage = `Saved ${successCount} of ${totalCount} adventures. ${failedCount} couldn't be saved, but you can still browse offline.`;
    } else {
      // All failed
      userMessage = "Hmm, we couldn't save adventures for offline use. You'll need an internet connection to browse.";
    }

    return {
      success: successCount > 0,
      totalCount,
      successCount,
      failedCount,
      failedSlugs,
      userMessage,
    };
  } catch (error) {
    console.error('[IndexedDB] Failed to cache adventures:', error);
    return {
      success: false,
      totalCount,
      successCount: 0,
      failedCount: totalCount,
      failedSlugs: adventures.map((a) => a.slug),
      error: error instanceof Error ? error.message : 'Unknown error',
      userMessage: "Hmm, we couldn't save adventures for offline use. You'll need an internet connection to browse.",
    };
  }
}

/**
 * Retrieve cached adventures from IndexedDB
 *
 * Returns typed result with success status, data, and user-friendly message.
 * Cache expires after 24 hours.
 *
 * @returns Promise<CacheRetrievalResult> Typed result with data and status
 */
export async function getCachedAdventures(): Promise<CacheRetrievalResult> {
  try {
    // Check IndexedDB support
    if (!('indexedDB' in window)) {
      return {
        success: false,
        data: null,
        reason: 'unsupported',
        userMessage: "Your browser doesn't support offline mode. You'll need an internet connection.",
      };
    }

    const db = await openDB();
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readonly');
    const adventuresStore = transaction.objectStore(ADVENTURES_STORE);
    const metadataStore = transaction.objectStore(METADATA_STORE);

    // Check cache age
    const metadata = await new Promise<CacheMetadata | null>((resolve, reject) => {
      const getRequest = metadataStore.get('cache');
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? { lastSync: result.lastSync, version: result.version } : null);
      };
      getRequest.onerror = () => reject(new Error('Failed to get metadata'));
    });

    if (!metadata) {
      console.log('[IndexedDB] No cached data found');
      db.close();
      return {
        success: false,
        data: null,
        reason: 'not-found',
        userMessage: 'No offline data saved yet. Browse with internet to cache adventures.',
      };
    }

    // Check if cache is expired
    const cacheAge = Date.now() - metadata.lastSync;
    const cacheAgeMinutes = Math.floor(cacheAge / 60000);

    if (cacheAge > CACHE_DURATION_MS) {
      console.log('[IndexedDB] Cache expired (age: %d hours)', Math.floor(cacheAge / (60 * 60 * 1000)));
      db.close();
      return {
        success: false,
        data: null,
        reason: 'expired',
        cacheAgeMinutes,
        userMessage: 'Offline data is out of date. Connect to internet to refresh.',
      };
    }

    // Retrieve all adventures
    const adventures = await new Promise<Adventure[]>((resolve, reject) => {
      const getAllRequest = adventuresStore.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(new Error('Failed to get adventures'));
    });

    console.log(`[IndexedDB] Retrieved ${adventures.length} cached adventures (age: ${cacheAgeMinutes} minutes)`);
    db.close();

    return {
      success: true,
      data: adventures,
      reason: 'found',
      cacheAgeMinutes,
      userMessage: `Showing ${adventures.length} adventures from offline cache (updated ${cacheAgeMinutes} minutes ago).`,
    };
  } catch (error) {
    console.error('[IndexedDB] Failed to retrieve cached adventures:', error);
    return {
      success: false,
      data: null,
      reason: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      userMessage: "Couldn't load offline data. Try refreshing or check your connection.",
    };
  }
}

/**
 * Clear expired cache data
 *
 * Deletes all adventures if cache is >24 hours old.
 * Used for cleanup and forcing fresh data fetch.
 *
 * @returns Promise<ClearCacheResult> Typed result with clearing status and reason
 */
export async function clearExpiredCache(): Promise<ClearCacheResult> {
  try {
    const db = await openDB();
    // Use readwrite transaction from start (optimized - single transaction)
    const transaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readwrite');
    const metadataStore = transaction.objectStore(METADATA_STORE);

    // Check cache age
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

    // Clear if expired (within same transaction - optimized)
    if (cacheAge > CACHE_DURATION_MS) {
      // Use the same transaction to clear (we already have readwrite access)
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

      console.log('[IndexedDB] Cleared expired cache');
      db.close();
      return {
        success: true,
        cleared: true,
        reason: 'cleared',
        cacheAgeHours,
        userMessage: `Cleared expired cache (${cacheAgeHours} hours old).`,
      };
    }

    db.close();
    return {
      success: true,
      cleared: false,
      reason: 'not-expired',
      cacheAgeHours,
      userMessage: `Cache is still fresh (${cacheAgeHours} hours old). No clearing needed.`,
    };
  } catch (error) {
    console.error('[IndexedDB] Failed to clear expired cache:', error);
    return {
      success: false,
      cleared: false,
      reason: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      userMessage: "Couldn't clear cache. Try refreshing the page.",
    };
  }
}

/**
 * Check if offline mode is available
 *
 * Returns true if cached data exists and is valid.
 * Used to show offline indicator UI.
 *
 * @returns Promise<boolean> True if offline mode available
 */
export async function isOfflineModeAvailable(): Promise<boolean> {
  try {
    const result = await getCachedAdventures();
    return result.success && result.data !== null && result.data.length > 0;
  } catch {
    return false;
  }
}
