import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "src/lib/data.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

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
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "Thank you for subscribing!" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process subscription." },
      { status: 500 }
    );
  }
}
