import { kv } from "@vercel/kv";
import dataJson from "./data.json";

export async function getPortfolioData(): Promise<any> {
  const token = process.env.KV_REST_API_TOKEN;
  if (token) {
    try {
      const data = await kv.get("portfolio_data");
      if (data) {
        return data;
      }
      // Seed initial data if empty
      await kv.set("portfolio_data", dataJson);
      return dataJson;
    } catch (e) {
      console.error("Vercel KV Read Error, using local file fallback:", e);
    }
  }

  // Local file fallback
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (e) {
    return dataJson;
  }
}

export async function savePortfolioData(updatedData: any): Promise<boolean> {
  if (!updatedData || !updatedData.PERSONAL || !updatedData.FEATURED_PROJECTS) {
    throw new Error("Invalid data schema: Missing core properties");
  }

  const token = process.env.KV_REST_API_TOKEN;
  if (token) {
    try {
      await kv.set("portfolio_data", updatedData);
      return true;
    } catch (e: any) {
      console.error("Vercel KV Write Error:", e);
      throw new Error(`Failed to write to Vercel KV: ${e?.message || e}`);
    }
  }

  // Local fallback for offline/local development
  try {
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "src/lib/data.json");
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf8");
    return true;
  } catch (e: any) {
    console.error("Local file save error:", e);
    throw new Error(`Failed to write local database file: ${e?.message || e}`);
  }
}
