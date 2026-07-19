import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { savePortfolioData } from "@/lib/data";
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

    // Save using persistent storage provider
    await savePortfolioData(updatedData);

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
