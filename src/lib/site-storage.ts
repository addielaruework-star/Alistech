/**
 * Site Content Cloudinary Storage Helper
 * ─────────────────────────────────────────────────────────────────────────────
 * Uploads media assets specifically for site content sections into
 * `alistech/site/{section}/` using Cloudinary's unsigned upload preset.
 *
 * NOTE: Per architectural rules, deletion is deliberately NOT supported
 * for site content assets to preserve media version history and avoid
 * accidental breakage across published or historic revisions.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const UPLOAD_ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export async function uploadSiteImage(
  section: string,
  file: File
): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary environment variables missing. Ensure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET are set."
    );
  }

  const sanitizedSection = section.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const folder = `alistech/site/${sanitizedSection}`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const res = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message ?? `Cloudinary upload failed (HTTP ${res.status})`
    );
  }

  const data = await res.json();
  return data.secure_url as string;
}
