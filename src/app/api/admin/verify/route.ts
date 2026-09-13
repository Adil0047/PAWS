import { NextRequest, NextResponse } from "next/server";
import {
  generateSessionToken,
  validateSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
} from "@/lib/auth";

/**
 * GET /api/admin/verify
 *
 * Checks if the current request has a valid admin session cookie.
 * Used by the admin panel to determine if the user is already authenticated.
 */
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (validateSessionToken(cookie)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

/**
 * POST /api/admin/verify
 *
 * Validates the admin PIN server-side.
 * If correct, sets an HTTP-only cookie with a signed session token.
 * The PIN itself is NEVER stored client-side or exposed to the browser.
 *
 * Request body: { pin: string }
 * Response: { success: boolean }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin } = body;

    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      return NextResponse.json(
        { error: "Admin access is not configured. Set ADMIN_PIN environment variable." },
        { status: 503 }
      );
    }

    if (!pin || pin !== adminPin) {
      return NextResponse.json(
        { error: "Invalid PIN" },
        { status: 401 }
      );
    }

    // PIN is correct — generate a session token and set it as an HTTP-only cookie
    const token = generateSessionToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, ADMIN_COOKIE_OPTIONS);

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
