import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/lib/api-response";
import { getUserFromToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

// Max file size ~2MB
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Unauthorized"),
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as string | null) || "profile"; // e.g. 'profile' | 'property'

    if (!file) {
      return NextResponse.json(
        createErrorResponse("VALIDATION_ERROR", "No file uploaded"),
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json(
        createErrorResponse("VALIDATION_ERROR", "Invalid file type"),
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        createErrorResponse("VALIDATION_ERROR", "File too large"),
        { status: 400 }
      );
    }

    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json(
      createSuccessResponse({
        message: "File uploaded successfully",
        url,
        filename,
        size: file.size,
        mimeType: file.type,
      })
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "Failed to upload file"),
      { status: 500 }
    );
  }
}

