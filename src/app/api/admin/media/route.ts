import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    // Validate session
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token || token.value !== "authorized_session") {
      return NextResponse.json(
        { success: false, error: "Unauthorized session" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in form data" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique sanitized filename
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext)
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    const uniqueName = `${baseName}_${Date.now()}${ext}`;

    // 1. Check if Vercel Blob is connected
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    if (blobToken) {
      try {
        // Try uploading with public access (standard for CDN-served images)
        const blob = await put(uniqueName, buffer, {
          access: "public",
          token: blobToken,
        });

        return NextResponse.json({
          success: true,
          url: blob.url,
          fileName: uniqueName,
        });
      } catch (uploadError: any) {
        // Fallback to private access upload if the store is configured as private
        if (uploadError?.message?.includes("private") || uploadError?.message?.includes("access")) {
          const blob = await put(uniqueName, buffer, {
            access: "private",
            token: blobToken,
          });

          return NextResponse.json({
            success: true,
            url: blob.url,
            fileName: uniqueName,
            warning: "Your Vercel Blob store is configured as Private. Images might not be visible to public visitors. Please switch your Blob store settings to 'Public' in the Vercel Dashboard under Storage.",
          });
        }
        throw uploadError;
      }
    }

    // 2. Fallback to Local Disk writing for Offline/Local development
    if (process.env.NODE_ENV !== "production") {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, uniqueName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${uniqueName}`,
        fileName: uniqueName,
      });
    }

    // 3. If in production and Vercel Blob is missing
    return NextResponse.json(
      { 
        success: false, 
        error: "Vercel Blob storage is not connected. Please go to Vercel Dashboard -> Storage -> Create Database -> select 'Blob' to enable live file uploads." 
      },
      { status: 400 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload file asset" },
      { status: 500 }
    );
  }
}
