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
        const adventuresStore = db.createObjectStore(ADVENTURES_STORE, { keyPath: 'slug' });
        console.log('[IndexedDB] Created adventures store');
      }

      // Create metadata object store
      if (!db.objectStoreNames.contains(METADATA_STORE)) {
        const metadataStore = db.createObjectStore(METADATA_STORE, { keyPath: 'key' });
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
 *
 * @param adventures Array of adventure objects
 * @returns Promise<void>
 */
export async function cacheAdventures(adventures: Adventure[]): Promise<void> {
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

    // Store each adventure
    const storePromises = adventures.map((adventure) => {
      return new Promise<void>((resolve, reject) => {
        const addRequest = adventuresStore.add(adventure);
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(new Error(`Failed to store adventure: ${adventure.slug}`));
      });
    });

    await Promise.all(storePromises);

    // Update lastSync metadata
    const metadata: CacheMetadata = {
      lastSync: Date.now(),
      version: DB_VERSION.toString(),
    };

    await new Promise<void>((resolve, reject) => {
      const putRequest = metadataStore.put({ key: 'cache', ...metadata });
      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(new Error('Failed to update metadata'));
    });

    console.log(`[IndexedDB] Cached ${adventures.length} adventures`);
    db.close();
  } catch (error) {
    console.error('[IndexedDB] Failed to cache adventures:', error);
    throw error;
  }
}

/**
 * Retrieve cached adventures from IndexedDB
 *
 * Returns null if cache is expired (>24 hours old).
 * Otherwise returns all cached adventures.
 *
 * @returns Promise<Adventure[] | null> Cached adventures or null if expired
 */
export async function getCachedAdventures(): Promise<Adventure[] | null> {
  try {
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
      return null;
    }

    // Check if cache is expired
    const cacheAge = Date.now() - metadata.lastSync;
    if (cacheAge > CACHE_DURATION_MS) {
      console.log('[IndexedDB] Cache expired (age: %d hours)', Math.floor(cacheAge / (60 * 60 * 1000)));
      db.close();
      return null;
    }

    // Retrieve all adventures
    const adventures = await new Promise<Adventure[]>((resolve, reject) => {
      const getAllRequest = adventuresStore.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(new Error('Failed to get adventures'));
    });

    console.log(`[IndexedDB] Retrieved ${adventures.length} cached adventures (age: ${Math.floor(cacheAge / 60000)} minutes)`);
    db.close();
    return adventures;
  } catch (error) {
    console.error('[IndexedDB] Failed to retrieve cached adventures:', error);
    return null;
  }
}

/**
 * Clear expired cache data
 *
 * Deletes all adventures if cache is >24 hours old.
 * Used for cleanup and forcing fresh data fetch.
 *
 * @returns Promise<boolean> True if cache was cleared, false otherwise
 */
export async function clearExpiredCache(): Promise<boolean> {
  try {
    const db = await openDB();
    const transaction = db.transaction([METADATA_STORE], 'readonly');
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
      return false;
    }

    const cacheAge = Date.now() - metadata.lastSync;

    if (cacheAge > CACHE_DURATION_MS) {
      // Clear both stores
      const writeTransaction = db.transaction([ADVENTURES_STORE, METADATA_STORE], 'readwrite');
      const adventuresStore = writeTransaction.objectStore(ADVENTURES_STORE);
      const metaStore = writeTransaction.objectStore(METADATA_STORE);

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
      return true;
    }

    db.close();
    return false;
  } catch (error) {
    console.error('[IndexedDB] Failed to clear expired cache:', error);
    return false;
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
    const adventures = await getCachedAdventures();
    return adventures !== null && adventures.length > 0;
  } catch {
    return false;
  }
}
