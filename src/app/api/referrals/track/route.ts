import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Find the referral by code
    const referral = await (db as unknown as {
      referral?: { findUnique: (args: unknown) => Promise<unknown> };
    }).referral?.findUnique({ where: { referralCode: String(code).toUpperCase() } });

    if (!referral) {
      return NextResponse.json(
        { error: "Referral code not found" },
        { status: 404 }
      );
    }

    // Increment clicks
    const updated = await (db as unknown as {
      referral?: { update: (args: unknown) => Promise<unknown> };
    }).referral?.update({
      where: { referralCode: String(code).toUpperCase() },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.json({ success: true, referral: updated });
  } catch (error) {
    console.error("Referral click tracking failed:", error);
    return NextResponse.json(
      { error: "Failed to track referral click" },
      { status: 500 }
    );
  }
}
