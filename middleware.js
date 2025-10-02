import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

// paths you want to protect
const protectedRoutes = ["/api/profile", "/api/orders"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next(); // allow request
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next(); // skip check for public routes
}

// only run middleware on these paths
export const config = {
  matcher: ["/api/:path*"],
};
