import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET_KEY,
  });

  if (pathname.startsWith("/auth")) {
    if (!token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/auth/login?callback=${pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my/:path*",
    "/tests/:path*",
    "/welcome",
    "/results/:path*",
    "/auth/:path*",
    "/unverified",
    "/verified",
  ],
};
