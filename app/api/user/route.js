import { connectDB } from "@/lib/mongoose";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    let metadata;
    if (action === "getUserById") {
      // Get the token from search params or headers
      const token = req.headers.get("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return new Response(JSON.stringify({ error: "Token is required" }), {
          status: 401,
        });
      }

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
          status: 401,
        });
      }
      console.log("Decoded JWT:", decoded);

      // decoded will have email, userId, etc. depending on what you put in JWT
      const user = await User.findOne({ email: decoded.email }).lean();

      return new Response(JSON.stringify({ user, decoded }), {
        status: 200,
      });
    } else {
      console.log(
        "metadata in else.........................................",
        metadata
      );
      const user = await User.findOne({});
      return new Response(JSON.stringify({ user }), {
        status: 200,
      });
    }
  } catch (error) {
    console.log("error log...", error);
  }
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
