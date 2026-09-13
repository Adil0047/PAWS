import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Upsert to avoid duplicate errors
    const existing = await db.newsletter.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    await db.newsletter.create({ data: { email } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await db.newsletter.count();
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("Failed to fetch subscriber count:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
