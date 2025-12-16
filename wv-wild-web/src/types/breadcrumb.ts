/**
 * Shared breadcrumb types used by both schema and visual components
 */

export interface BreadcrumbItem {
  /** Display name for the breadcrumb (e.g., "Hunt Near Us") */
  name: string;
  /** URL path - relative (e.g., "/near/") or absolute */
  url: string;
}
