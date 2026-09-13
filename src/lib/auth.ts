import { createHmac } from "crypto";

/**
 * Server-side admin authentication utility.
 *
 * The ADMIN_PIN is stored as a server-only environment variable (ADMIN_PIN).
 * It is NEVER exposed to the client.
 *
 * When the admin enters the PIN in the browser, it is sent to /api/admin/verify
 * which validates it server-side and sets an HTTP-only cookie containing
 * a signed session token (HMAC of a known string using ADMIN_PIN as the key).
 *
 * This token is deterministic and can be verified on any serverless instance
 * without requiring shared session storage.
 */

const SESSION_PAYLOAD = "paws-admin-authenticated";

/**
 * Generate a session token using the ADMIN_PIN as the signing key.
 * This token is stored in an HTTP-only cookie.
 */
export function generateSessionToken(): string {
  const adminPin = process.env.ADMIN_PIN;
  if (!adminPin) {
    throw new Error("ADMIN_PIN environment variable is not set");
  }
  return createHmac("sha256", adminPin).update(SESSION_PAYLOAD).digest("hex");
}

/**
 * Validate a session token from a cookie.
 * Returns true if the token matches the expected HMAC.
 */
export function validateSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const adminPin = process.env.ADMIN_PIN;
  if (!adminPin) return false;
  const expectedToken = generateSessionToken();
  return token === expectedToken;
}

/**
 * Extract and validate the admin session from a Next.js request.
 * Works with both NextRequest (API routes) and cookies().
 */
export function isAdminAuthed(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );
  return validateSessionToken(cookies["paws_admin_session"]);
}

/**
 * Get the cookie name used for admin sessions.
 */
export const ADMIN_COOKIE_NAME = "paws_admin_session";

/**
 * Cookie options for the admin session.
 * httpOnly: cannot be read by JavaScript
 * secure: only sent over HTTPS (in production)
 * sameSite: lax prevents CSRF while allowing top-level navigation
 * path: / applies to all routes
 * maxAge: 24 hours
 */
export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24, // 24 hours
};
