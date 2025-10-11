import fs from "fs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export const config = {
  api: {
    bodyParser: false, // Required for FormData / file streams
  },
};

export async function POST(req) {
  try {
    // ✅ Verify JWT token
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Token is required" }), {
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // ✅ Get the file from FormData
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Convert file blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Prepare FormData to send to VPS
    const formForVPS = new FormData();
    formForVPS.append("file", new Blob([buffer]), file.name);

    // ✅ Send file to VPS upload endpoint
    const vpsRes = await fetch("https://neuronide.com/file-upload/upload", {
      method: "POST",
      body: formForVPS,
    });

    const vpsData = await vpsRes.json();
    if (!vpsData.success) throw new Error(vpsData.error || "VPS Upload failed");

    const fileUrl = vpsData.url;

    // ✅ Save the file URL in your DB
    await connectDB();
    await User.findOneAndUpdate(
      { email: decoded.email },
      {
        resumeLink: fileUrl,
        fileName: file.name,
      }
    );

    // ✅ Return response
    return new Response(
      JSON.stringify({ message: "Upload successful", fileUrl }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Upload failed" }),
      {
        status: 500,
      }
    );
  }
}
