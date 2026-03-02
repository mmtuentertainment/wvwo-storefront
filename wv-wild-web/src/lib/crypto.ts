/**
 * Browser Crypto Utilities
 *
 * AES-GCM encryption for PII in sessionStorage.
 * Uses Web Crypto API (requires HTTPS/secure context).
 *
 * Security notes:
 * - Key is session-scoped (regenerated per browser session)
 * - IV is unique per encryption (stored with ciphertext)
 * - AES-GCM provides authenticated encryption (integrity + confidentiality)
 *
 * Compliance:
 * - GDPR Article 32: Encryption of personal data
 * - CCPA: Security measures for consumer data
 */

// Session key storage (memory only, not persisted to disk)
let sessionKey: CryptoKey | null = null;

// Storage key for session encryption key
const SESSION_KEY_STORAGE = 'wvwo_session_key';

/**
 * Generate or retrieve session encryption key.
 * Key persists in sessionStorage for session continuity,
 * but is cleared when browser tab closes.
 */
async function getSessionKey(): Promise<CryptoKey> {
  if (sessionKey) return sessionKey;

  // Check if we have a key in sessionStorage (base64 encoded)
  const storedKeyData = sessionStorage.getItem(SESSION_KEY_STORAGE);

  if (storedKeyData) {
    // Import existing key
    const keyData = Uint8Array.from(atob(storedKeyData), (c) => c.charCodeAt(0));
    sessionKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM', length: 256 },
      false, // Not extractable after import (security)
      ['encrypt', 'decrypt']
    );
  } else {
    // Generate new 256-bit AES key
    sessionKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true, // Extractable for initial storage
      ['encrypt', 'decrypt']
    );

    // Export and store key (session-scoped via sessionStorage)
    const exportedKey = await crypto.subtle.exportKey('raw', sessionKey);
    const keyBytes = new Uint8Array(exportedKey);
    const keyBase64 = btoa(String.fromCharCode.apply(null, Array.from(keyBytes)));
    sessionStorage.setItem(SESSION_KEY_STORAGE, keyBase64);
  }

  return sessionKey;
}

/**
 * Encrypt data using AES-GCM authenticated encryption.
 *
 * @param data - Plaintext string to encrypt
 * @returns Base64 encoded string containing IV (12 bytes) + ciphertext
 *
 * @example
 * const encrypted = await encrypt(JSON.stringify(orderData));
 * sessionStorage.setItem('order', encrypted);
 */
export async function encrypt(data: string): Promise<string> {
  const key = await getSessionKey();
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);

  // Generate unique IV (12 bytes = 96 bits, optimal for AES-GCM)
  // crypto.getRandomValues provides cryptographically strong randomness
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

  // Combine IV + ciphertext for storage
  // IV is safe to store alongside ciphertext (not secret)
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  // Return as base64 for safe string storage
  return btoa(String.fromCharCode.apply(null, Array.from(combined)));
}

/**
 * Decrypt data using AES-GCM authenticated encryption.
 *
 * @param encryptedData - Base64 encoded string containing IV + ciphertext
 * @returns Decrypted plaintext string
 * @throws Error if decryption fails (wrong key, tampered data, etc.)
 *
 * @example
 * const encrypted = sessionStorage.getItem('order');
 * const orderData = JSON.parse(await decrypt(encrypted));
 */
export async function decrypt(encryptedData: string): Promise<string> {
  const key = await getSessionKey();

  // Decode base64
  const combined = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));

  // Extract IV (first 12 bytes) and ciphertext (remainder)
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  // AES-GCM decryption also verifies authenticity (tamper detection)
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Check if Web Crypto API is available.
 * Requires secure context (HTTPS or localhost).
 *
 * @returns true if encryption is available, false otherwise
 */
export function isCryptoAvailable(): boolean {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.subtle !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  );
}

/**
 * Clear the session encryption key.
 * Call this when user logs out or session should be invalidated.
 * Any encrypted data will become unrecoverable.
 */
export function clearSessionKey(): void {
  sessionKey = null;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY_STORAGE);
  }
}
