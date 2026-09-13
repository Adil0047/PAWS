import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_OPTIONS } from "@/lib/auth";

/**
 * POST /api/admin/logout
 *
 * Clears the admin session cookie.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...ADMIN_COOKIE_OPTIONS,
    maxAge: 0, // Immediately expire
  });
  return response;
}
