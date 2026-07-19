import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

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

    const updatedData = await request.json();

    // Validate that we have the core sections
    if (!updatedData.PERSONAL || !updatedData.FEATURED_PROJECTS) {
      return NextResponse.json(
        { success: false, error: "Invalid data schema: Missing core properties" },
        { status: 400 }
      );
    }

    // Write to data.json
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf8");

    // Revalidate paths to clear static site generation caches
    revalidatePath("/");
    revalidatePath("/engineering");
    revalidatePath("/ai");
    revalidatePath("/creative");
    revalidatePath("/design");
    revalidatePath("/ventures");
    revalidatePath("/projects");
    revalidatePath("/resume");
    revalidatePath("/blog");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to save configuration" },
      { status: 500 }
    );
  }
}
