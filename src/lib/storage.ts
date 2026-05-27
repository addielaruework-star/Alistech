/**
 * Cloudinary Image Storage Library
 * ─────────────────────────────────────────────────────────────────────────────
 * Replaces Firebase Storage entirely. All uploads use Cloudinary's unsigned
 * preset directly from the browser (no server round-trip, no API secret
 * exposed). Deletions go through /api/cloudinary/delete which uses the
 * secret server-side only.
 *
 * Public API is identical to the old Firebase storage.ts — no other files
 * need to change their imports.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/**
 * Extracts the Cloudinary public_id from a secure_url.
 * e.g. "https://res.cloudinary.com/x/image/upload/v123/alistech/projects/slug/cover.jpg"
 *   →  "alistech/projects/slug/cover"
 */
export function extractPublicId(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match ? match[1] : null;
}

/**
 * Returns an auto-optimised Cloudinary URL by injecting transformation params.
 * Uses f_auto (WebP/AVIF when supported) + q_auto + width cap.
 * Safe to call with non-Cloudinary URLs — returns the original unchanged.
 */
export function getCloudinaryUrl(
  url: string,
  opts: { width?: number; quality?: string } = {}
): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  const w = opts.width ?? 1200;
  const q = opts.quality ?? "auto";
  return url.replace("/upload/", `/upload/f_auto,q_${q},w_${w},c_limit/`);
}

/* ── Core upload (client-side, unsigned preset) ───────────────────────────── */

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary env vars missing. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: formData });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message ?? `Cloudinary upload failed (HTTP ${res.status})`
    );
  }

  const data = await res.json();
  return data.secure_url as string;
}

/* ── Core delete (proxied through secure API route) ──────────────────────── */

async function deleteFromCloudinary(url: string): Promise<void> {
  if (!url || !url.includes("cloudinary.com")) return;

  const publicId = extractPublicId(url);
  if (!publicId) return;

  try {
    await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
  }
}

/* ── Public API — same signatures as old Firebase storage.ts ─────────────── */

/**
 * Uploads multiple project images to Cloudinary.
 * Stored at: alistech/projects/{slug}/
 */
export async function uploadProjectImages(
  slug: string,
  files: File[]
): Promise<string[]> {
  return Promise.all(
    files.map((f) => uploadToCloudinary(f, `alistech/projects/${slug}`))
  );
}

/**
 * Deletes a project image from Cloudinary using its secure_url.
 */
export async function deleteProjectImage(url: string): Promise<void> {
  return deleteFromCloudinary(url);
}

/**
 * Uploads a reviewer avatar image to Cloudinary.
 * Stored at: alistech/reviews/
 */
export async function uploadReviewAvatar(
  reviewId: string,
  file: File
): Promise<string> {
  return uploadToCloudinary(file, `alistech/reviews`);
}

/**
 * Generic delete — used for both project images and review avatars.
 */
export async function deleteStorageFile(url: string): Promise<void> {
  return deleteFromCloudinary(url);
}
