import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function generateReferralCode(name: string): string {
  const prefix = name.replace(/[^a-zA-Z]/g, "").slice(0, 4).toUpperCase() || "REF";
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Name and valid email are required" },
        { status: 400 }
      );
    }

    // Check if referral already exists for this email
    const existing = await (db as unknown as {
      referral?: { findUnique: (args: unknown) => Promise<unknown> };
    }).referral?.findUnique({ where: { referrerEmail: email.toLowerCase() } });

    if (existing) {
      return NextResponse.json({ success: true, referral: existing, existed: true });
    }

    // Generate unique code
    let code = generateReferralCode(name);
    let attempts = 0;
    while (attempts < 10) {
      const conflict = await (db as unknown as {
        referral?: { findUnique: (args: unknown) => Promise<unknown> };
      }).referral?.findUnique({ where: { referralCode: code } });
      if (!conflict) break;
      code = generateReferralCode(name);
      attempts++;
    }

    const referral = await (db as unknown as {
      referral?: { create: (args: unknown) => Promise<unknown> };
    }).referral?.create({
      data: {
        referrerName: String(name),
        referrerEmail: email.toLowerCase(),
        referralCode: code,
      },
    });

    return NextResponse.json({ success: true, referral });
  } catch (error) {
    console.error("Referral creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create referral" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      const referral = await (db as unknown as {
        referral?: { findUnique: (args: unknown) => Promise<unknown> };
      }).referral?.findUnique({ where: { referrerEmail: email.toLowerCase() } });
      return NextResponse.json({ referral });
    }

    const referrals = await (db as unknown as {
      referral?: { findMany: (args: unknown) => Promise<unknown[]> };
    }).referral?.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ referrals: referrals || [] });
  } catch (error) {
    console.error("Failed to fetch referrals:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}
