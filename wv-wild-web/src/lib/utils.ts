import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Builds a normalized Tailwind CSS class string from multiple class inputs.
 *
 * Accepts any `ClassValue` inputs (e.g., strings, arrays, objects, or falsy/conditional values) and combines them into a single class string. Falsy and conditional values are ignored and conflicting Tailwind utilities are resolved.
 *
 * @param inputs - Class values to combine
 * @returns The merged class string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}