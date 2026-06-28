import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/r2-storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename to prevent collisions
    const ext = file.name.split('.').pop();
    const uniqueFilename = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    // Upload to Cloudflare R2
    const fileUrl = await uploadFile(buffer, uniqueFilename, file.type);

    return NextResponse.json({ 
      success: true, 
      url: fileUrl 
    });

  } catch (error: unknown) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
