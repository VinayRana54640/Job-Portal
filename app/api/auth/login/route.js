import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongoose";
import User from "../../../../models/User";
import OtpEmail from "../../../../emails/otpEmail";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import jwt from "jsonwebtoken";

export function generateOtp6() {
  // Generates a 6-digit string, e.g., "123456"
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export async function POST(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    const { email, action, otp } = await req.json();
    await connectDB();
    if (action == "sendOtp") {
      let otp = generateOtp6();
      const emailHtml = await render(<OtpEmail otp={otp} />);
      console.log(emailHtml);

      const transporter = nodemailer.createTransport({
        service: "gmail", // or use SMTP server
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send email
      await transporter.sendMail({
        from: `"MyApp" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your OTP Code",
        html: emailHtml,
      });
      await User.findOneAndUpdate(
        { email: email },
        { otp: otp },
        { new: true, upsert: true }
      );
      return Response.json({ message: "OTP sent to email", status: 200 });
    }

    if (action == "verifyOtp") {
      if (!otp) {
        return Response.json({ error: "OTP is required" }, { status: 400 });
      }
      let user = await User.findOne({ email: email, otp: otp });
      if (user.otp == otp) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });

        return Response.json(
          {
            message: "User loggedin successfully",
            userId: user._id,
            token: token,
          },
          { status: 201 }
        );
      } else {
        return Response.json({ error: "Invalid OTP" }, { status: 400 });
      }
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
