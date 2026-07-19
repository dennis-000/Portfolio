import { put, list } from "@vercel/blob";
import dataJson from "./data.json";

export async function getPortfolioData(): Promise<any> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    try {
      // Find data.json in the Vercel Blob store
      const response = await list({ token: blobToken });
      const dataBlob = response.blobs.find(b => b.pathname === "data.json");
      
      if (dataBlob) {
        const res = await fetch(dataBlob.url, { cache: "no-store" });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (e) {
      console.error("Vercel Blob Read Error, falling back to local:", e);
    }
  }

  // Local file fallback (local development / first time seed)
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

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    try {
      // Save data.json into Vercel Blob store
      await put("data.json", JSON.stringify(updatedData, null, 2), {
        access: "public",
        addRandomSuffix: false,
        token: blobToken,
      });
      return true;
    } catch (e: any) {
      console.error("Vercel Blob Write Error:", e);
      throw new Error(`Failed to write to Vercel Blob: ${e?.message || e}`);
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
