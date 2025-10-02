import { connectDB } from "@/lib/mongoose";
import Contact from "../../../models/Contact";

export async function POST(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    const { fullName, email, phone, topic, message } = await req.json();
    await connectDB();
    const newContact = new Contact({
      fullName,
      email,
      phone,
      topic,
      message,
    });
    await newContact.save();
    return new Response(
      JSON.stringify({ message: "Contact saved" }, { status: 200 })
    );
  } catch (error) {}
}
