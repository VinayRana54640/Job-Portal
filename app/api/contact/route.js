import { connectDB } from "@/lib/mongoose";
import Contact from "../../../models/Contact";

export async function POST(req) {
  try {
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
