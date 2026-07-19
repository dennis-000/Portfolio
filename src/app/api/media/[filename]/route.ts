import { list } from "@vercel/blob";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return new Response("Blob storage token is not configured.", { status: 500 });
    }

    const { filename } = await params;

    // Find the file in Vercel Blob
    const response = await list({ token });
    const dataBlob = response.blobs.find(b => b.pathname === filename);

    if (!dataBlob) {
      return new Response("Media asset file not found.", { status: 404 });
    }

    // Fetch the private blob content securely using bearer token
    const res = await fetch(dataBlob.url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return new Response("Unauthorized file access.", { status: 403 });
    }

    // Read the binary data stream
    const blobData = await res.blob();

    return new Response(blobData, {
      headers: {
        "Content-Type": blobData.type || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
      },
    });
  } catch (error: any) {
    return new Response(error?.message || "Internal server error", { status: 500 });
  }
}
