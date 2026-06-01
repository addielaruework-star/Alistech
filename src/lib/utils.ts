import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts any string into a URL-safe slug.
 * Identical logic to the admin panel auto-generator.
 * Example: "Mohammed Basharat — Portfolio" → "mohammed-basharat-portfolio"
 */
export function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove non-word chars (keeps hyphens)
    .replace(/[\s_]+/g, "-")    // spaces/underscores → hyphens
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
}
