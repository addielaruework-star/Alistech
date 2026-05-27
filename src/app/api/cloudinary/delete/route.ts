/**
 * POST /api/cloudinary/delete
 * ─────────────────────────────────────────────────────────────────────────────
 * Securely deletes a Cloudinary asset by public_id.
 * The API secret is used here on the server only — never exposed to the client.
 *
 * Body: { publicId: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const publicId: string | undefined = body?.publicId;

    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid publicId" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        { error: `Cloudinary returned: ${result.result}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, result: result.result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/cloudinary/delete] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
