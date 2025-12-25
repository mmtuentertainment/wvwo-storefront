/**
 * Service Worker Notification Handler
 *
 * Listens for SW state change messages and displays toast notifications.
 * Uses Kim's voice for user-friendly messages.
 *
 * SPEC-07 PR #5: Offline Support
 */

type SWMessageType =
  | 'SW_INSTALL_FAILED'
  | 'SW_ACTIVATED'
  | 'SW_ACTIVATION_FAILED'
  | 'CACHE_REFRESH_SUCCESS'
  | 'CACHE_REFRESH_FAILED';

interface SWMessage {
  type: SWMessageType;
  message?: string;
  error?: string;
}

/**
 * Show toast notification with WVWO styling
 */
function showToast(message: string, type: 'success' | 'error' | 'info') {
  // Remove any existing toasts
  document.querySelectorAll('.sw-toast').forEach(el => el.remove());

  const toast = document.createElement('div');
  toast.className = 'sw-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  // WVWO styling (brand-cream bg, sign-green/red-600 borders)
  const borderColor = type === 'error' ? '#dc2626' : type === 'success' ? '#2E7D32' : '#3E2723';
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    max-width: 360px;
    padding: 16px 20px;
    background: #FFF8E1;
    border-left: 4px solid ${borderColor};
    border-radius: 2px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    font-family: 'Noto Sans', sans-serif;
    font-size: 14px;
    color: #3E2723;
    z-index: 9999;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
  `;

  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

/**
 * Get user-friendly message for SW event (Kim's voice)
 */
function getMessageForType(type: SWMessageType, error?: string): { message: string; toastType: 'success' | 'error' | 'info' } {
  switch (type) {
    case 'SW_ACTIVATED':
      return {
        message: "Offline mode ready - you can filter adventures even without internet. Grand love ya!",
        toastType: 'success'
      };
    case 'SW_INSTALL_FAILED':
      return {
        message: "Couldn't set up offline mode. You can still browse with internet.",
        toastType: 'error'
      };
    case 'SW_ACTIVATION_FAILED':
      return {
        message: "Offline mode had a hiccup. Try refreshing the page.",
        toastType: 'error'
      };
    case 'CACHE_REFRESH_SUCCESS':
      return {
        message: "Offline content updated with the latest adventures!",
        toastType: 'success'
      };
    case 'CACHE_REFRESH_FAILED':
      return {
        message: "Couldn't update offline content - try again when you have better signal.",
        toastType: 'error'
      };
    default:
      return {
        message: "Something happened with offline mode.",
        toastType: 'info'
      };
  }
}

// Listen for Service Worker messages
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event: MessageEvent<SWMessage>) => {
    const { type, message, error } = event.data;

    // Log for debugging
    if (error) {
      console.error(`[SW Event] ${type}:`, error);
    } else {
      console.log(`[SW Event] ${type}`);
    }

    // Show toast notification
    const { message: toastMessage, toastType } = getMessageForType(type, error);
    showToast(message || toastMessage, toastType);
  });
}

export {};
