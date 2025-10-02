import { connectDB } from "@/lib/mongoose";
import User from "../../../models/User";

export async function GET(req, res) {
  try {
    await connectDB();
    const user = await User.findOne({});
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow all origins
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {}
}

export async function POST(req, res) {
  try {
    await connectDB();
    const {
      fullName,
      email,
      phone,
      location,
      role,
      experienceYears,
      skills,
      bio,
      links,
    } = await req.json();
    console.log(
      "data,,,,,",
      location,
      role,
      experienceYears,
      skills,
      bio,
      links
    );
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        location: location,
        role: role,
        experienceYears: experienceYears,
        skills: skills,
        bio: bio,
        links: links,
      },
      { new: true }
    );
    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow all origins
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {}
}
