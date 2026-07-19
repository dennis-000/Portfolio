import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const data = await getPortfolioData();

    if (!data.SUBSCRIBERS) {
      data.SUBSCRIBERS = [];
    }

    const emailNormalized = email.trim().toLowerCase();
    if (data.SUBSCRIBERS.includes(emailNormalized)) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed!" }
      );
    }

    data.SUBSCRIBERS.push(emailNormalized);
    await savePortfolioData(data);

    return NextResponse.json({ success: true, message: "Thank you for subscribing!" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process subscription." },
      { status: 500 }
    );
  }
}
