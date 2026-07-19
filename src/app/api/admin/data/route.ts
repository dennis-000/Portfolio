import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortfolioData } from "@/lib/data";

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

    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to retrieve portfolio config" },
      { status: 500 }
    );
  }
}
