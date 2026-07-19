import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function GET() {
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

    const filePath = path.join(process.cwd(), "src/lib/data.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to retrieve portfolio config" },
      { status: 500 }
    );
  }
}
