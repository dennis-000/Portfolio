import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

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
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Sanitize and generate unique filename
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext)
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();
    
    const uniqueName = `${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    // Save file
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueName}`,
      fileName: uniqueName,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload file asset" },
      { status: 500 }
    );
  }
}
